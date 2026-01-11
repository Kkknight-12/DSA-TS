/**
 * LFU Cache - OPTIMAL SOLUTION
 *
 * Approach: 2 HashMaps + Multiple Doubly Linked Lists
 * Time Complexity: O(1) for both get() and put()
 * Space Complexity: O(capacity)
 *
 * KEY INSIGHT:
 * - keyToNode: key → Node (O(1) lookup)
 * - freqToList: frequency → DoublyLinkedList (each freq has its own LRU list)
 * - minFreq: Track minimum frequency for O(1) eviction
 *
 * Structure:
 *   freq=1: HEAD ⇄ [LRU] ⇄ ... ⇄ [MRU] ⇄ TAIL
 *   freq=2: HEAD ⇄ [LRU] ⇄ ... ⇄ [MRU] ⇄ TAIL
 *   freq=3: HEAD ⇄ [LRU] ⇄ ... ⇄ [MRU] ⇄ TAIL
 *
 * Eviction: Go to freqToList[minFreq], remove HEAD.next (LRU in that freq)
 */

namespace LFUCacheOptimal {
    /**
     * Node for Doubly Linked List
     *
     * WHY store freq in node?
     * - Need to know current frequency to remove from correct list
     * - When frequency increases, remove from old list, add to new list
     */
    class LFUNode {
        key: number;
        value: number;
        freq: number;
        prev: LFUNode | null;
        next: LFUNode | null;

        constructor(key: number, value: number) {
            this.key = key;
            this.value = value;
            this.freq = 1; // New nodes start with frequency 1
            this.prev = null;
            this.next = null;
        }
    }

    /**
     * Doubly Linked List for each frequency
     *
     * Each frequency has its own DLL that maintains LRU order
     * HEAD.next = LRU (least recently used in this frequency)
     * TAIL.prev = MRU (most recently used in this frequency)
     */
    class DoublyLinkedList {
        head: LFUNode;
        tail: LFUNode;
        size: number;

        constructor() {
            // Dummy head and tail for easy operations
            this.head = new LFUNode(0, 0);
            this.tail = new LFUNode(0, 0);
            this.head.next = this.tail;
            this.tail.prev = this.head;
            this.size = 0;
        }

        /**
         * Add node at MRU position (before tail)
         */
        addToEnd(node: LFUNode): void {
            const lastNode = this.tail.prev!;

            node.prev = lastNode;
            node.next = this.tail;
            lastNode.next = node;
            this.tail.prev = node;

            this.size++;
        }

        /**
         * Remove a specific node from this list
         */
        removeNode(node: LFUNode): void {
            const prevNode = node.prev!;
            const nextNode = node.next!;

            prevNode.next = nextNode;
            nextNode.prev = prevNode;

            node.prev = null;
            node.next = null;

            this.size--;
        }

        /**
         * Remove and return the LRU node (HEAD.next)
         */
        removeLRU(): LFUNode | null {
            if (this.size === 0) return null;

            const lruNode = this.head.next!;
            this.removeNode(lruNode);
            return lruNode;
        }

        /**
         * Check if list is empty
         */
        isEmpty(): boolean {
            return this.size === 0;
        }
    }

    /**
     * LFU Cache Implementation
     */
    export class LFUCache {
        private capacity: number;
        private keyToNode: Map<number, LFUNode>;      // key → node
        private freqToList: Map<number, DoublyLinkedList>; // freq → DLL
        private minFreq: number;                       // minimum frequency in cache

        /**
         * Initialize LFU Cache with given capacity
         *
         * @param capacity - Maximum number of items cache can hold
         */
        constructor(capacity: number) {
            this.capacity = capacity;
            this.keyToNode = new Map();
            this.freqToList = new Map();
            this.minFreq = 0;
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
            // Edge case: capacity is 0
            if (this.capacity === 0) return -1;

            // Step 1: Check if key exists
            if (!this.keyToNode.has(key)) {
                return -1;
            }

            // Step 2: Get the node
            const node = this.keyToNode.get(key)!;

            // Step 3: Update frequency (accessing = using)
            this.updateFrequency(node);

            // Step 4: Return value
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
            // Edge case: capacity is 0
            if (this.capacity === 0) return;

            // ═══════════════════════════════════════════════════════════════
            // Case 1: Key already exists → Update value and frequency
            // ═══════════════════════════════════════════════════════════════
            if (this.keyToNode.has(key)) {
                const node = this.keyToNode.get(key)!;
                node.value = value;          // Update value
                this.updateFrequency(node);  // Update frequency
                return;
            }

            // ═══════════════════════════════════════════════════════════════
            // Case 2: Key doesn't exist → Add new node
            // ═══════════════════════════════════════════════════════════════

            // Step 1: Check if we need to evict
            if (this.keyToNode.size >= this.capacity) {
                this.evictLFU();
            }

            // Step 2: Create new node (freq = 1)
            const newNode = new LFUNode(key, value);

            // Step 3: Add to keyToNode map
            this.keyToNode.set(key, newNode);

            // Step 4: Add to freqToList[1]
            // Create list for freq=1 if doesn't exist
            if (!this.freqToList.has(1)) {
                this.freqToList.set(1, new DoublyLinkedList());
            }
            this.freqToList.get(1)!.addToEnd(newNode);

            // Step 5: Update minFreq
            // New node always has freq=1, so minFreq becomes 1
            this.minFreq = 1;
        }

        /**
         * Update frequency of a node
         *
         * Called when node is accessed (get or put on existing key)
         *
         * Steps:
         * 1. Remove from current frequency list
         * 2. Update minFreq if needed
         * 3. Increment node's frequency
         * 4. Add to new frequency list
         *
         * @param node - Node to update
         */
        private updateFrequency(node: LFUNode): void {
            const oldFreq = node.freq;

            // Step 1: Remove from old frequency list
            const oldList = this.freqToList.get(oldFreq)!;
            oldList.removeNode(node);

            // Step 2: Update minFreq if needed
            // If old list is now empty AND it was the minFreq list
            // Then minFreq must be incremented
            // WHY oldFreq + 1? Because we're moving this node to oldFreq + 1
            // So there's at least one node at oldFreq + 1 (this node)
            if (oldList.isEmpty() && oldFreq === this.minFreq) {
                this.minFreq++;

                // Optionally clean up empty list
                // this.freqToList.delete(oldFreq);
            }

            // Step 3: Increment node's frequency
            node.freq++;
            const newFreq = node.freq;

            // Step 4: Add to new frequency list
            // Create list if doesn't exist
            if (!this.freqToList.has(newFreq)) {
                this.freqToList.set(newFreq, new DoublyLinkedList());
            }
            this.freqToList.get(newFreq)!.addToEnd(node);
        }

        /**
         * Evict the Least Frequently Used item
         *
         * 1. Go to freqToList[minFreq]
         * 2. Remove HEAD.next (LRU in that frequency)
         * 3. Delete from keyToNode
         */
        private evictLFU(): void {
            // Get the list with minimum frequency
            const minFreqList = this.freqToList.get(this.minFreq)!;

            // Remove LRU node from that list
            const lruNode = minFreqList.removeLRU()!;

            // Remove from keyToNode
            this.keyToNode.delete(lruNode.key);

            // Note: We don't update minFreq here
            // It will be set to 1 when new node is added
        }

        /**
         * Get current cache size (for testing)
         */
        getSize(): number {
            return this.keyToNode.size;
        }
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example: LFUCache(2)
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * INITIALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * capacity = 2
     * keyToNode = {}
     * freqToList = {}
     * minFreq = 0
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(1, 1)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 1 not in cache → New item
     *
     * 1. No eviction needed (size=0 < capacity=2)
     *
     * 2. Create node: LFUNode(key=1, val=1, freq=1)
     *
     * 3. Add to keyToNode:
     *    keyToNode = {1 → Node(1,1,freq=1)}
     *
     * 4. Add to freqToList[1]:
     *    Create new list for freq=1
     *    freq=1: HEAD ⇄ [1:1] ⇄ TAIL
     *
     * 5. minFreq = 1
     *
     * State:
     *   keyToNode = {1 → Node}
     *   freqToList:
     *     freq=1: [1:1]
     *   minFreq = 1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(2, 2)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 2 not in cache → New item
     *
     * 1. No eviction (size=1 < capacity=2)
     *
     * 2. Create node: LFUNode(key=2, val=2, freq=1)
     *
     * 3. Add to keyToNode:
     *    keyToNode = {1 → Node, 2 → Node}
     *
     * 4. Add to freqToList[1]:
     *    freq=1: HEAD ⇄ [1:1] ⇄ [2:2] ⇄ TAIL
     *                   LRU      MRU
     *
     * 5. minFreq = 1
     *
     * State:
     *   keyToNode = {1 → Node(freq=1), 2 → Node(freq=1)}
     *   freqToList:
     *     freq=1: [1:1, 2:2]
     *   minFreq = 1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(1) → returns 1
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 1 exists → Update frequency
     *
     * updateFrequency(Node(1)):
     *
     *   1. Remove from freqToList[1]:
     *      freq=1: HEAD ⇄ [2:2] ⇄ TAIL
     *
     *   2. Is freq=1 list empty? NO (has node 2)
     *      minFreq stays 1
     *
     *   3. node.freq = 1 → 2
     *
     *   4. Add to freqToList[2]:
     *      Create new list for freq=2
     *      freq=2: HEAD ⇄ [1:1] ⇄ TAIL
     *
     * Return 1
     *
     * State:
     *   keyToNode = {1 → Node(freq=2), 2 → Node(freq=1)}
     *   freqToList:
     *     freq=1: [2:2]
     *     freq=2: [1:1]
     *   minFreq = 1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(3, 3)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 3 not in cache, size=2 == capacity → Need eviction!
     *
     * evictLFU():
     *   1. Go to freqToList[minFreq] = freqToList[1]
     *      freq=1: HEAD ⇄ [2:2] ⇄ TAIL
     *
     *   2. Remove LRU = Node(2,2)
     *      freq=1: HEAD ⇄ TAIL (empty)
     *
     *   3. Delete key 2 from keyToNode
     *      keyToNode = {1 → Node}
     *
     * Now add new node:
     *   1. Create LFUNode(key=3, val=3, freq=1)
     *   2. Add to keyToNode
     *   3. Add to freqToList[1]:
     *      freq=1: HEAD ⇄ [3:3] ⇄ TAIL
     *   4. minFreq = 1
     *
     * State:
     *   keyToNode = {1 → Node(freq=2), 3 → Node(freq=1)}
     *   freqToList:
     *     freq=1: [3:3]
     *     freq=2: [1:1]
     *   minFreq = 1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(2) → returns -1
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 2 not in keyToNode (was evicted)
     * Return -1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(3) → returns 3
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 3 exists → Update frequency
     *
     * updateFrequency(Node(3)):
     *
     *   1. Remove from freqToList[1]:
     *      freq=1: HEAD ⇄ TAIL (empty!)
     *
     *   2. Is freq=1 list empty AND freq=1 == minFreq? YES!
     *      minFreq = 1 → 2
     *
     *   3. node.freq = 1 → 2
     *
     *   4. Add to freqToList[2]:
     *      freq=2: HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
     *                     LRU      MRU
     *
     * Return 3
     *
     * State:
     *   keyToNode = {1 → Node(freq=2), 3 → Node(freq=2)}
     *   freqToList:
     *     freq=2: [1:1, 3:3]
     *   minFreq = 2
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * put(4, 4)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Key 4 not in cache, size=2 == capacity → Need eviction!
     *
     * evictLFU():
     *   1. Go to freqToList[minFreq] = freqToList[2]
     *      freq=2: HEAD ⇄ [1:1] ⇄ [3:3] ⇄ TAIL
     *                     LRU
     *
     *   2. Remove LRU = Node(1,1) ← Both have freq=2, so evict LRU
     *      freq=2: HEAD ⇄ [3:3] ⇄ TAIL
     *
     *   3. Delete key 1 from keyToNode
     *
     * Now add new node:
     *   1. Create LFUNode(key=4, val=4, freq=1)
     *   2. Add to keyToNode
     *   3. Add to freqToList[1]:
     *      freq=1: HEAD ⇄ [4:4] ⇄ TAIL
     *   4. minFreq = 1
     *
     * State:
     *   keyToNode = {3 → Node(freq=2), 4 → Node(freq=1)}
     *   freqToList:
     *     freq=1: [4:4]
     *     freq=2: [3:3]
     *   minFreq = 1
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * get(1) → returns -1 (was evicted)
     * get(3) → returns 3, freq becomes 3
     * get(4) → returns 4, freq becomes 2
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * FINAL OUTPUT: [null, null, null, 1, null, -1, 3, null, -1, 3, 4] ✓
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing LFU Cache - OPTIMAL (2 HashMaps + Multiple DLLs)\n');

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
            let cache: LFUCache | null = null;

            for (let i = 0; i < operations.length; i++) {
                const op = operations[i];
                const input = inputs[i];

                switch (op) {
                    case 'LFUCache':
                        cache = new LFUCache(input[0]);
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
            console.log(`  Expected: [${expected.map(x => x === null ? 'null' : x).join(', ')}]`);
            console.log(`  Got:      [${results.map(x => x === null ? 'null' : x).join(', ')}]`);
            console.log();
        }

        // Test 1: Example 1 from problem
        test(
            'Example 1 - Basic LFU operations',
            ['LFUCache', 'put', 'put', 'get', 'put', 'get', 'get', 'put', 'get', 'get', 'get'],
            [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]],
            [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
        );

        // Test 2: Example 2 from problem
        test(
            'Example 2 - Capacity 3',
            ['LFUCache', 'put', 'put', 'put', 'put', 'put', 'get', 'get', 'get', 'get', 'get'],
            [[3], [5, 7], [4, 6], [3, 5], [2, 4], [1, 3], [1], [2], [3], [4], [5]],
            [null, null, null, null, null, null, 3, 4, 5, -1, -1]
        );

        // Test 3: Capacity 0
        test(
            'Capacity 0 - All operations should fail/do nothing',
            ['LFUCache', 'put', 'get'],
            [[0], [1, 1], [1]],
            [null, null, -1]
        );

        // Test 4: Capacity 1
        test(
            'Capacity 1 - Every new put evicts',
            ['LFUCache', 'put', 'get', 'put', 'get', 'get'],
            [[1], [1, 1], [1], [2, 2], [1], [2]],
            [null, null, 1, null, -1, 2]
        );

        // Test 5: Update existing key
        test(
            'Update existing key - Value changes, freq increases',
            ['LFUCache', 'put', 'put', 'put', 'get', 'get'],
            [[2], [1, 1], [2, 2], [1, 10], [1], [2]],
            [null, null, null, null, 10, 2]
        );

        // Test 6: Same frequency, evict LRU
        // put(1,1), put(2,2): both freq=1, capacity full
        // put(3,3): evict key 1 (LRU among freq=1), cache={2,3}
        // get(2): returns 2 (still there)
        test(
            'Same frequency tie - Evict LRU',
            ['LFUCache', 'put', 'put', 'put', 'get', 'get'],
            [[2], [1, 1], [2, 2], [3, 3], [2], [3]],
            [null, null, null, null, 2, 3]
        );

        // Test 7: Frequency increases correctly
        test(
            'Frequency increases - Higher freq survives',
            ['LFUCache', 'put', 'put', 'get', 'get', 'put', 'get'],
            [[2], [1, 1], [2, 2], [1], [1], [3, 3], [1]],
            [null, null, null, 1, 1, null, 1]
        );

        // Test 8: Get non-existent key
        test(
            'Get non-existent key',
            ['LFUCache', 'get', 'put', 'get', 'get'],
            [[2], [1], [1, 1], [1], [2]],
            [null, -1, null, 1, -1]
        );

        // Test 9: Complex frequency scenario
        // After get(1), get(2), get(3): all have freq=2, order in freq=2 list is [1,2,3]
        // put(4,4): evict LRU from freq=2, which is key 1
        // get(1): -1 (was evicted)
        test(
            'Complex frequency scenario',
            ['LFUCache', 'put', 'put', 'put', 'get', 'get', 'get', 'put', 'get', 'get', 'get'],
            [[3], [1, 1], [2, 2], [3, 3], [1], [2], [3], [4, 4], [1], [2], [4]],
            [null, null, null, null, 1, 2, 3, null, -1, 2, 4]
        );

        // Test 10: Update increases frequency
        test(
            'Update prevents eviction',
            ['LFUCache', 'put', 'put', 'put', 'put', 'get'],
            [[2], [1, 1], [2, 2], [1, 10], [3, 3], [1]],
            [null, null, null, null, null, 10]
        );

        // Test 11: All same frequency
        test(
            'All same frequency - LRU eviction',
            ['LFUCache', 'put', 'put', 'put', 'put', 'get', 'get'],
            [[2], [1, 1], [2, 2], [3, 3], [4, 4], [3], [4]],
            [null, null, null, null, null, 3, 4]
        );

        // Test 12: Single item multiple access
        test(
            'Single item multiple access',
            ['LFUCache', 'put', 'get', 'get', 'get', 'put', 'get'],
            [[2], [1, 1], [1], [1], [1], [2, 2], [1]],
            [null, null, 1, 1, 1, null, 1]
        );

        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`Total Tests: ${passed + failed}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log('═══════════════════════════════════════════════════════════════\n');

        if (failed === 0) {
            console.log('🎉 All tests passed! LFU Cache understood! 🚀\n');
            console.log('📊 Complexity: Time O(1), Space O(capacity)\n');
        }
    }
}

// Execute tests
LFUCacheOptimal.runTests();