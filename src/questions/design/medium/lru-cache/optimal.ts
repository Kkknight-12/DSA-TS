/**
 * LRU Cache - OPTIMAL SOLUTION
 *
 * Approach: HashMap + Doubly Linked List
 * Time Complexity: O(1) for both get() and put()
 * Space Complexity: O(capacity)
 *
 * KEY INSIGHT:
 * - HashMap: O(1) lookup by key
 * - Doubly Linked List: O(1) insert/delete anywhere
 * - Together: O(1) for everything!
 *
 * Structure:
 * - HEAD (dummy) ⇄ [LRU] ⇄ ... ⇄ [MRU] ⇄ TAIL (dummy)
 * - HashMap: key → DLLNode
 */

namespace LRUCacheOptimal {
    /**
     * Doubly Linked List Node
     *
     * WHY store key in node?
     * - Jab eviction hota hai, HashMap se bhi delete karna hai
     * - Node se key nikaalke HashMap.delete(key) karte hain
     */
    class DLLNode {
        key: number;
        value: number;
        prev: DLLNode | null;
        next: DLLNode | null;

        constructor(key: number, value: number) {
            this.key = key;
            this.value = value;
            this.prev = null;
            this.next = null;
        }
    }

    /**
     * LRU Cache Implementation
     */
    export class LRUCache {
        private capacity: number;
        private cache: Map<number, DLLNode>; // HashMap: key → node
        private head: DLLNode; // Dummy head (LRU side)
        private tail: DLLNode; // Dummy tail (MRU side)

        /**
         * Initialize LRU Cache with given capacity
         *
         * @param capacity - Maximum number of items cache can hold
         */
        constructor(capacity: number) {
            this.capacity = capacity;
            this.cache = new Map();

            // ═══════════════════════════════════════════════════════════════
            // Initialize dummy HEAD and TAIL
            // ═══════════════════════════════════════════════════════════════
            // WHY dummy nodes?
            // - No special handling for empty list
            // - No special handling for single element
            // - All insert/delete operations become uniform!

            this.head = new DLLNode(0, 0); // Dummy head
            this.tail = new DLLNode(0, 0); // Dummy tail

            // Connect head and tail
            // Initially: HEAD ⇄ TAIL (empty cache)
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }

        /**
         * Get value for a key
         *
         * @param key - Key to look up
         * @returns Value if key exists, -1 otherwise
         *
         * Time: O(1)
         */
        get(key: number): number {
            // Step 1: Check if key exists in HashMap
            if (!this.cache.has(key)) {
                return -1; // Key not found
            }

            // Step 2: Get the node from HashMap
            const node = this.cache.get(key)!;

            // Step 3: Move node to MRU position (most recently used)
            // WHY? Because accessing a key means it was "used"
            // So it becomes the most recently used item
            this.moveToEnd(node);

            // Step 4: Return the value
            return node.value;
        }

        /**
         * Put key-value pair into cache
         *
         * @param key - Key to insert/update
         * @param value - Value to store
         *
         * Time: O(1)
         */
        put(key: number, value: number): void {
            // ═══════════════════════════════════════════════════════════════
            // Case 1: Key already exists → Update value and move to MRU
            // ═══════════════════════════════════════════════════════════════
            if (this.cache.has(key)) {
                const node = this.cache.get(key)!;
                node.value = value; // Update value
                this.moveToEnd(node); // Move to MRU position
                return;
            }

            // ═══════════════════════════════════════════════════════════════
            // Case 2: Key doesn't exist → Add new node
            // ═══════════════════════════════════════════════════════════════

            // Step 1: Create new node
            const newNode = new DLLNode(key, value);

            // Step 2: Add to HashMap
            this.cache.set(key, newNode);

            // Step 3: Insert at MRU position (before TAIL)
            this.insertBeforeTail(newNode);

            // Step 4: Check if we exceeded capacity
            // WHY > and not >=? Because we just added, so check after adding
            if (this.cache.size > this.capacity) {
                // Need to evict LRU item (HEAD.next)
                this.evictLRU();
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // HELPER FUNCTIONS
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Remove a node from its current position in DLL
         *
         * Before: ... ⇄ [prev] ⇄ [node] ⇄ [next] ⇄ ...
         * After:  ... ⇄ [prev] ⇄ [next] ⇄ ...
         *
         * WHY this works in O(1)?
         * - We have direct reference to node
         * - Doubly linked, so we know prev and next
         * - Just update 2 pointers!
         *
         * @param node - Node to remove
         */
        private removeNode(node: DLLNode): void {
            // Get prev and next nodes
            const prevNode = node.prev!;
            const nextNode = node.next!;

            // Connect prev to next, bypassing current node
            prevNode.next = nextNode;
            nextNode.prev = prevNode;

            // Clear node's pointers (optional, but clean)
            node.prev = null;
            node.next = null;
        }

        /**
         * Insert node just before TAIL (MRU position)
         *
         * Before: ... ⇄ [lastNode] ⇄ TAIL
         * After:  ... ⇄ [lastNode] ⇄ [node] ⇄ TAIL
         *
         * WHY before TAIL?
         * - TAIL is dummy, real MRU is TAIL.prev
         * - New MRU should be just before TAIL
         *
         * @param node - Node to insert
         */
        private insertBeforeTail(node: DLLNode): void {
            // Get the current last real node (before tail)
            const lastNode = this.tail.prev!;

            // Insert new node between lastNode and tail
            //
            // Step 1: Set new node's pointers
            node.prev = lastNode;
            node.next = this.tail;

            // Step 2: Update lastNode's next pointer
            lastNode.next = node;

            // Step 3: Update tail's prev pointer
            this.tail.prev = node;

            // Visual:
            // Before: [lastNode] ⇄ TAIL
            //         ↓           ↓
            // After:  [lastNode] ⇄ [node] ⇄ TAIL
        }

        /**
         * Move existing node to MRU position (end of list)
         *
         * This is called when:
         * - get(key) is called (key was accessed)
         * - put(key, value) updates existing key
         *
         * @param node - Node to move to end
         */
        private moveToEnd(node: DLLNode): void {
            // Step 1: Remove from current position
            this.removeNode(node);

            // Step 2: Insert at MRU position (before tail)
            this.insertBeforeTail(node);
        }

        /**
         * Evict the Least Recently Used item
         *
         * LRU item is always HEAD.next (first real node after dummy head)
         *
         * Called when cache exceeds capacity after adding new item
         */
        private evictLRU(): void {
            // LRU node is right after HEAD
            const lruNode = this.head.next!;

            // Step 1: Remove from DLL
            this.removeNode(lruNode);

            // Step 2: Remove from HashMap
            // WHY we stored key in node: Need key to delete from HashMap!
            this.cache.delete(lruNode.key);
        }

        /**
         * Get current cache size (for testing)
         */
        getSize(): number {
            return this.cache.size;
        }

        /**
         * Get cache contents as string (for debugging)
         */
        toString(): string {
            const items: string[] = [];
            let current = this.head.next;

            while (current !== this.tail) {
                items.push(`${current!.key}=${current!.value}`);
                current = current!.next;
            }

            return `[${items.join(' ⇄ ')}] (LRU → MRU)`;
        }
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example: LRUCache(2)
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * INITIALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * capacity = 2
     * cache = new Map()
     *
     * DLL:
     *   HEAD ⇄ TAIL
     *   (empty cache)
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(1, 1)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 1 not in cache → Create new node
     *
     * 1. Create: newNode = DLLNode(1, 1)
     *
     * 2. Add to HashMap:
     *    cache.set(1, newNode)
     *    cache = {1 → Node(1,1)}
     *
     * 3. insertBeforeTail(newNode):
     *    Before: HEAD ⇄ TAIL
     *
     *    lastNode = TAIL.prev = HEAD
     *    newNode.prev = HEAD
     *    newNode.next = TAIL
     *    HEAD.next = newNode
     *    TAIL.prev = newNode
     *
     *    After: HEAD ⇄ [1:1] ⇄ TAIL
     *
     * 4. Size check: 1 > 2? NO → No eviction
     *
     * State:
     *   DLL: HEAD ⇄ [1:1] ⇄ TAIL
     *   Map: {1 → Node(1,1)}
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(2, 2)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 2 not in cache → Create new node
     *
     * 1. Create: newNode = DLLNode(2, 2)
     *
     * 2. Add to HashMap:
     *    cache = {1 → Node(1,1), 2 → Node(2,2)}
     *
     * 3. insertBeforeTail(newNode):
     *    Before: HEAD ⇄ [1:1] ⇄ TAIL
     *
     *    lastNode = TAIL.prev = Node(1,1)
     *    newNode.prev = Node(1,1)
     *    newNode.next = TAIL
     *    Node(1,1).next = newNode
     *    TAIL.prev = newNode
     *
     *    After: HEAD ⇄ [1:1] ⇄ [2:2] ⇄ TAIL
     *                  LRU      MRU
     *
     * 4. Size check: 2 > 2? NO → No eviction
     *
     * State:
     *   DLL: HEAD ⇄ [1:1] ⇄ [2:2] ⇄ TAIL
     *   Map: {1 → Node(1,1), 2 → Node(2,2)}
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(1) → returns 1
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 1 in cache? YES
     *
     * 1. Get node: node = cache.get(1) = Node(1,1)
     *
     * 2. moveToEnd(node):
     *
     *    removeNode(Node(1,1)):
     *      Before: HEAD ⇄ [1:1] ⇄ [2:2] ⇄ TAIL
     *      HEAD.next = Node(2,2)
     *      Node(2,2).prev = HEAD
     *      After:  HEAD ⇄ [2:2] ⇄ TAIL
     *              [1:1] disconnected
     *
     *    insertBeforeTail(Node(1,1)):
     *      Before: HEAD ⇄ [2:2] ⇄ TAIL
     *      lastNode = Node(2,2)
     *      Node(1,1).prev = Node(2,2)
     *      Node(1,1).next = TAIL
     *      Node(2,2).next = Node(1,1)
     *      TAIL.prev = Node(1,1)
     *      After:  HEAD ⇄ [2:2] ⇄ [1:1] ⇄ TAIL
     *                     LRU      MRU
     *
     * 3. Return node.value = 1
     *
     * State:
     *   DLL: HEAD ⇄ [2:2] ⇄ [1:1] ⇄ TAIL
     *               LRU      MRU
     *   Map: {1 → Node(1,1), 2 → Node(2,2)}
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(3, 3)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 3 not in cache → Create new node
     *
     * 1. Create: newNode = DLLNode(3, 3)
     *
     * 2. Add to HashMap:
     *    cache = {1 → Node(1,1), 2 → Node(2,2), 3 → Node(3,3)}
     *
     * 3. insertBeforeTail(newNode):
     *    Before: HEAD ⇄ [2:2] ⇄ [1:1] ⇄ TAIL
     *    After:  HEAD ⇄ [2:2] ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
     *
     * 4. Size check: 3 > 2? YES → Need eviction!
     *
     *    evictLRU():
     *      lruNode = HEAD.next = Node(2,2)
     *
     *      removeNode(Node(2,2)):
     *        Before: HEAD ⇄ [2:2] ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
     *        After:  HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
     *
     *      cache.delete(2):
     *        cache = {1 → Node(1,1), 3 → Node(3,3)}
     *
     * State:
     *   DLL: HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
     *               LRU      MRU
     *   Map: {1 → Node(1,1), 3 → Node(3,3)}
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(2) → returns -1
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 2 in cache? NO (was evicted)
     * Return -1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(4, 4)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 4 not in cache → Create new node, add, evict LRU
     *
     * Before: HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
     *                LRU
     *
     * After adding [4:4]:
     *         HEAD ⇄ [1:1] ⇄ [3:3] ⇄ [4:4] ⇄ TAIL
     *
     * Evict LRU (key 1):
     *         HEAD ⇄ [3:3] ⇄ [4:4] ⇄ TAIL
     *                LRU      MRU
     *
     * State:
     *   DLL: HEAD ⇄ [3:3] ⇄ [4:4] ⇄ TAIL
     *   Map: {3 → Node(3,3), 4 → Node(4,4)}
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(1) → returns -1
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 1 in cache? NO (was evicted)
     * Return -1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(3) → returns 3
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 3 in cache? YES
     * Move to MRU, return 3
     *
     * Before: HEAD ⇄ [3:3] ⇄ [4:4] ⇄ TAIL
     * After:  HEAD ⇄ [4:4] ⇄ [3:3] ⇄ TAIL
     *                LRU      MRU
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(4) → returns 4
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 4 in cache? YES
     * Move to MRU, return 4
     *
     * Before: HEAD ⇄ [4:4] ⇄ [3:3] ⇄ TAIL
     * After:  HEAD ⇄ [3:3] ⇄ [4:4] ⇄ TAIL
     *                LRU      MRU
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * FINAL OUTPUT: [null, null, null, 1, null, -1, null, -1, 3, 4] ✓
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing LRU Cache - OPTIMAL (HashMap + DLL)\n');

        let passed = 0;
        let failed = 0;

        // Helper function to run test
        function test(
            description: string,
            operations: string[],
            inputs: any[][],
            expected: (number | null)[]
        ): void {
            const results: (number | null)[] = [];
            let cache: LRUCache | null = null;

            for (let i = 0; i < operations.length; i++) {
                const op = operations[i];
                const input = inputs[i];

                switch (op) {
                    case 'LRUCache':
                        cache = new LRUCache(input[0]);
                        results.push(null);
                        break;
                    case 'put':
                        cache!.put(input[0], input[1]);
                        results.push(null);
                        break;
                    case 'get':
                        results.push(cache!.get(input[0]));
                        break;
                }
            }

            const isEqual = JSON.stringify(results) === JSON.stringify(expected);
            const status = isEqual ? '✅ PASS' : '❌ FAIL';

            if (isEqual) {
                passed++;
            } else {
                failed++;
            }

            console.log(`${status}: ${description}`);
            console.log(`  Operations: ${operations.join(', ')}`);
            console.log(`  Expected: [${expected.join(', ')}]`);
            console.log(`  Got:      [${results.join(', ')}]`);
            console.log();
        }

        // Test 1: Example 1 from problem
        test(
            'Example 1 - Capacity 2',
            ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
            [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
            [null, null, null, 1, null, -1, null, -1, 3, 4]
        );

        // Test 2: Example 2 - Capacity 1
        test(
            'Example 2 - Capacity 1',
            ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get'],
            [[1], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [3]],
            [null, null, null, -1, null, -1, null, -1]
        );

        // Test 3: Update existing key
        test(
            'Update existing key',
            ['LRUCache', 'put', 'put', 'put', 'get', 'get'],
            [[2], [1, 1], [2, 2], [1, 10], [1], [2]],
            [null, null, null, null, 10, 2]
        );

        // Test 4: Get non-existent key
        test(
            'Get non-existent key',
            ['LRUCache', 'get', 'put', 'get', 'get'],
            [[2], [1], [1, 1], [1], [2]],
            [null, -1, null, 1, -1]
        );

        // Test 5: Multiple gets on same key
        test(
            'Multiple gets on same key',
            ['LRUCache', 'put', 'put', 'get', 'get', 'get', 'put', 'get'],
            [[2], [1, 1], [2, 2], [1], [1], [1], [3, 3], [2]],
            [null, null, null, 1, 1, 1, null, -1]
        );

        // Test 6: Large capacity
        test(
            'Capacity 3 - No eviction needed',
            ['LRUCache', 'put', 'put', 'put', 'get', 'get', 'get'],
            [[3], [1, 1], [2, 2], [3, 3], [1], [2], [3]],
            [null, null, null, null, 1, 2, 3]
        );

        // Test 7: Update makes key MRU
        test(
            'Update makes key MRU (prevents eviction)',
            ['LRUCache', 'put', 'put', 'put', 'put', 'get'],
            [[2], [1, 1], [2, 2], [1, 10], [3, 3], [1]],
            [null, null, null, null, null, 10]
        );

        // Test 8: Sequence of evictions
        test(
            'Sequence of evictions',
            ['LRUCache', 'put', 'put', 'put', 'put', 'put', 'get', 'get', 'get'],
            [[2], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [3], [4], [5]],
            [null, null, null, null, null, null, -1, 4, 5]
        );

        // Test 9: Get updates order
        test(
            'Get updates LRU order',
            ['LRUCache', 'put', 'put', 'get', 'put', 'get'],
            [[2], [1, 1], [2, 2], [1], [3, 3], [1]],
            [null, null, null, 1, null, 1]
        );

        // Test 10: Put same key multiple times
        test(
            'Put same key multiple times',
            ['LRUCache', 'put', 'put', 'put', 'get'],
            [[1], [1, 1], [1, 2], [1, 3], [1]],
            [null, null, null, null, 3]
        );

        // Test 11: Alternating put and get
        test(
            'Alternating put and get',
            ['LRUCache', 'put', 'get', 'put', 'get', 'put', 'get'],
            [[2], [1, 1], [1], [2, 2], [2], [3, 3], [1]],
            [null, null, 1, null, 2, null, -1]
        );

        // Test 12: Edge case - immediate eviction
        test(
            'Immediate eviction with capacity 1',
            ['LRUCache', 'put', 'put', 'put', 'get', 'get', 'get'],
            [[1], [1, 1], [2, 2], [3, 3], [1], [2], [3]],
            [null, null, null, null, -1, -1, 3]
        );

        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`Total Tests: ${passed + failed}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log('═══════════════════════════════════════════════════════════════\n');

        if (failed === 0) {
            console.log('🎉 All tests passed! LRU Cache understood! 🚀\n');
            console.log('📊 Complexity: Time O(1), Space O(capacity)\n');
        }
    }

    // Demo function to show cache state
    export function runDemo(): void {
        console.log('🎬 LRU Cache Demo\n');
        console.log('Creating LRUCache with capacity = 2\n');

        const cache = new LRUCache(2);
        console.log(`Initial: ${cache.toString()}\n`);

        const operations = [
            { op: 'put', args: [1, 1] },
            { op: 'put', args: [2, 2] },
            { op: 'get', args: [1] },
            { op: 'put', args: [3, 3] },
            { op: 'get', args: [2] },
            { op: 'put', args: [4, 4] },
            { op: 'get', args: [1] },
            { op: 'get', args: [3] },
            { op: 'get', args: [4] },
        ];

        for (const { op, args } of operations) {
            let result: number | null = null;

            if (op === 'put') {
                cache.put(args[0], args[1]);
                console.log(`put(${args[0]}, ${args[1]})`);
            } else {
                result = cache.get(args[0]);
                console.log(`get(${args[0]}) → ${result}`);
            }

            console.log(`  Cache: ${cache.toString()}`);
            console.log();
        }
    }
}

// Execute tests
LRUCacheOptimal.runTests();

// Uncomment to run demo
// LRUCacheOptimal.runDemo();