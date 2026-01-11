/**
 * Linked List Cycle II - Brute Force Approach
 *
 * Problem: Given the head of a linked list, return the node where the cycle begins.
 *          If there is no cycle, return null.
 *
 * Approach: HashSet to track visited nodes
 *
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(n) - store all nodes in Set
 *
 * Where n = number of nodes in linked list
 */

namespace LinkedListCycleIIBruteForce {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Detect cycle start using HashSet
   *
   * Logic:
   * 1. Ek Set banao jo visited nodes ko track kare
   * 2. List traverse karo node by node
   * 3. Har node check karo: "Kya ye pehle visit ho chuka hai?"
   * 4. Agar haan → yahi cycle ka start point hai!
   * 5. Agar null mil gaya → no cycle
   */
  function detectCycle(head: ListNode | null): ListNode | null {
    // BASE CASE: Agar list empty hai
    // Toh cycle ho hi nahi sakta
    if (head === null) {
      return null;
    }

    // Set banao jo visited nodes ko track karega
    // Set mein hum actual node reference store karenge (not values)
    // Kyunki do nodes ki value same ho sakti hai, but reference unique hoga
    const visited = new Set<ListNode>();

    // Current pointer se list traverse karo
    let current: ListNode | null = head;

    // Jab tak list khatam nahi hoti (null nahi milta)
    while (current !== null) {
      // CHECK: Kya ye node pehle visit ho chuka hai?
      // Agar haan, matlab yahi cycle ka start point hai
      if (visited.has(current)) {
        return current; // Cycle start node return kar do
      }

      // Nahi toh is node ko visited Set mein add kar do
      // Taaki agar dobara mile toh pata chal sake
      visited.add(current);

      // Next node pe move karo
      current = current.next;
    }

    // Agar loop se bahar aa gaye (current === null)
    // Matlab poori list traverse ho gayi, koi cycle nahi mili
    return null;
  }

  /**
   * ================================
   * DRY RUN - COMPLETE VISUALIZATION
   * ================================
   *
   * Input: head = [3, 2, 0, -4], pos = 1
   *
   * List structure:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *                   ↑                              │
   *                   └───────────────────────────┘
   *
   * Node 2 pe cycle hai (pos = 1)
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 1: current = 3
   * ─────────────────────────────────────────────────────────────────
   * visited Set: {}
   *
   * Check: Is 3 in visited?
   *   → No! Set is empty
   *
   * Action: Add 3 to visited
   *   visited Set: {3}
   *
   * Move: current = current.next
   *   current = 2
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
   * └─●─┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
   *   ↑ visited      ↑                               │
   *               current                            │
   *               ←───────────────────────────────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 2: current = 2
   * ─────────────────────────────────────────────────────────────────
   * visited Set: {3}
   *
   * Check: Is 2 in visited?
   *   → No! Only 3 is in set
   *
   * Action: Add 2 to visited
   *   visited Set: {3, 2}
   *
   * Move: current = current.next
   *   current = 0
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3  │ ●──┼──→│ 2 │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●   │
   * └─●─┴────┘   └─●─┴────┘   └───┴────┘   └───┴─┬──┘
   *   ↑            ↑              ↑                 │
   * visited     visited        current              │
   *                              ←─────────────────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 3: current = 0
   * ─────────────────────────────────────────────────────────────────
   * visited Set: {3, 2}
   *
   * Check: Is 0 in visited?
   *   → No! Only 3 and 2 are in set
   *
   * Action: Add 0 to visited
   *   visited Set: {3, 2, 0}
   *
   * Move: current = current.next
   *   current = -4
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3  │ ●──┼──→│ 2 │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
   * └─●─┴────┘   └─●─┴────┘   └─●─┴────┘   └───┴─┬──┘
   *   ↑            ↑            ↑              ↑    │
   * visited     visited       visited      current  │
   *                                          ←─────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 4: current = -4
   * ─────────────────────────────────────────────────────────────────
   * visited Set: {3, 2, 0}
   *
   * Check: Is -4 in visited?
   *   → No! Only 3, 2, and 0 are in set
   *
   * Action: Add -4 to visited
   *   visited Set: {3, 2, 0, -4}
   *
   * Move: current = current.next
   *   current = 2 (because -4.next points back to 2!)
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│  2 │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
   * └─●─┴────┘   └───┴────┘   └─●─┴────┘   └─●─┴─┬──┘
   *   ↑              ↑          ↑            ↑      │
   * visited       current    visited      visited   │
   *                  ↑                              │
   *                  └───────────────────────────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 5: current = 2
   * ─────────────────────────────────────────────────────────────────
   * visited Set: {3, 2, 0, -4}
   *
   * Check: Is 2 in visited?
   *   → YES! ✅ 2 is already in the set!
   *   → This means we've seen this node before
   *   → This is the CYCLE START POINT!
   *
   * Action: Return 2
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3  │ ●──┼──→│ 2 │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●   │
   * └─●─┴────┘   └─●─┴────┘   └─●─┴────┘   └─●─┴─┬──┘
   *   ↑            ↑ ↑          ↑            ↑      │
   * visited    FOUND! ←      visited      visited   │
   *            CYCLE START                          │
   *                  ↑                              │
   *                  └───────────────────────────┘
   *
   * Final Answer: Node 2 (index 1)
   */

  /**
   * ================================
   * ITERATION TABLE
   * ================================
   */
  /*
   * | Iteration | current | current.val | visited Set       | Is current in visited? | Action                | Return |
   * |-----------|---------|-------------|-------------------|------------------------|----------------------|--------|
   * | 1         | node@3  | 3           | {}                | No                     | Add 3 to set         | -      |
   * | 2         | node@2  | 2           | {3}               | No                     | Add 2 to set         | -      |
   * | 3         | node@0  | 0           | {3, 2}            | No                     | Add 0 to set         | -      |
   * | 4         | node@-4 | -4          | {3, 2, 0}         | No                     | Add -4 to set        | -      |
   * | 5         | node@2  | 2           | {3, 2, 0, -4}     | **Yes** ✅             | Cycle detected!      | node@2 |
   *
   * Note: node@X means the actual node object (reference), not just the value
   */

  /**
   * ================================
   * WHY THIS APPROACH WORKS
   * ================================
   *
   * Key Insight:
   * - Agar list mein cycle hai, toh hum ek node ko dobara visit karenge
   * - Set hume bata deta hai ki "ye node pehle dekh chuka hai"
   * - Jo pehli baar repeat ho, wahi cycle ka start hai!
   *
   * Example:
   * Path: 3 → 2 → 0 → -4 → 2 (repeat!)
   *                         ↑
   *                    Cycle start!
   *
   * Set stores actual node references, not values:
   * - Agar do nodes ki value same ho (eg: two nodes with value 5)
   * - Toh bhi Set unhe alag identify karega (different object references)
   * - Isliye algorithm correctly work karega
   */

  /**
   * ================================
   * EDGE CASES
   * ================================
   */

  /**
   * EDGE CASE 1: Empty list
   * Input: head = null
   *
   * ┌─────┐
   * │null │
   * └─────┘
   *
   * Action: Return null immediately (no cycle possible)
   */

  /**
   * EDGE CASE 2: Single node, no cycle
   * Input: head = [1], pos = -1
   *
   * ┌───┬────┐
   * │ 1 │null│
   * └───┴────┘
   *
   * Iteration 1:
   *   - visited: {}
   *   - Check 1: Not in set
   *   - Add 1 to set
   *   - current = current.next = null
   *
   * Loop ends (current === null)
   * Return: null (no cycle)
   */

  /**
   * EDGE CASE 3: Single node with self-loop
   * Input: head = [1], pos = 0
   *
   * ┌───┬────┐
   * │ 1 │ ●──┼──┐
   * └───┴─┬──┘  │
   *        └─────┘
   *
   * Iteration 1:
   *   - visited: {}
   *   - Check 1: Not in set
   *   - Add 1 to set
   *   - current = current.next = 1 (same node!)
   *
   * Iteration 2:
   *   - visited: {1}
   *   - Check 1: YES! Already in set ✅
   *   - Return: node 1
   *
   * Return: Node 1 (cycle starts at itself)
   */

  /**
   * EDGE CASE 4: All nodes in cycle
   * Input: head = [1, 2], pos = 0
   *
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●  │
   * └───┴────┘   └───┴─┬──┘
   *      ↑              │
   *      └──────────────┘
   *
   * Iteration 1: Add 1
   * Iteration 2: Add 2
   * Iteration 3: current = 1 (back to head), already in set ✅
   *
   * Return: Node 1 (cycle starts at head)
   */

  /**
   * ================================
   * PROS AND CONS
   * ================================
   *
   * ✅ Advantages:
   * 1. Simple to understand - straight forward logic
   * 2. Easy to implement - just one while loop
   * 3. Guaranteed to work for all cases
   * 4. O(n) time complexity
   *
   * ❌ Disadvantages:
   * 1. O(n) space complexity - Set mein sare nodes store karne pad sakte hain
   * 2. Follow-up requirement: O(1) space - yeh approach satisfy nahi karti
   * 3. Extra memory overhead due to Set
   *
   * Follow-up asks: Can you solve it using O(1) space?
   * Answer: Yes! Floyd's Cycle Detection Algorithm (see optimal solution)
   */

  /**
   * ================================
   * COMMON MISTAKES
   * ================================
   */

  /**
   * MISTAKE 1: Storing values instead of references
   *
   * ❌ WRONG:
   * const visited = new Set<number>();
   * visited.add(current.val);  // Storing value
   *
   * Problem: Agar do nodes ki value same ho:
   *   List: 1 → 2 → 3 → 2 → null (no cycle, different nodes with value 2)
   *   Algorithm will incorrectly detect cycle!
   *
   * ✅ CORRECT:
   * const visited = new Set<ListNode>();
   * visited.add(current);  // Storing reference
   *
   * This correctly compares object references, not values
   */

  /**
   * MISTAKE 2: Not handling empty list
   *
   * ❌ WRONG:
   * function detectCycle(head: ListNode | null): ListNode | null {
   *   const visited = new Set<ListNode>();
   *   let current = head;
   *   while (current !== null) {  // If head is null, this still works
   *     ...
   *   }
   * }
   *
   * Actually this isn't wrong! But explicit check is clearer:
   *
   * ✅ BETTER:
   * if (head === null) return null;
   */

  /**
   * MISTAKE 3: Returning null when cycle is found
   *
   * ❌ WRONG:
   * if (visited.has(current)) {
   *   return null;  // Wrong! Should return the node
   * }
   *
   * ✅ CORRECT:
   * if (visited.has(current)) {
   *   return current;  // Return the cycle start node
   * }
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Linked List Cycle II - Brute Force ===\n');

    // Test 1: Cycle exists at index 1
    console.log('Test 1: Cycle at index 1 (Example 1)');
    console.log('Input: [3,2,0,-4], pos = 1');

    const node1 = new ListNode(3);
    const node2 = new ListNode(2);
    const node3 = new ListNode(0);
    const node4 = new ListNode(-4);

    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node2; // Cycle to node2

    const result1 = detectCycle(node1);
    console.log('Expected: Node with value 2');
    console.log('Got:', result1?.val);
    console.log('Test Pass:', result1 === node2 && result1?.val === 2);
    console.log('---\n');

    // Test 2: Cycle at index 0 (all nodes in cycle)
    console.log('Test 2: Cycle at index 0 (Example 2)');
    console.log('Input: [1,2], pos = 0');

    const a = new ListNode(1);
    const b = new ListNode(2);
    a.next = b;
    b.next = a; // Cycle to a

    const result2 = detectCycle(a);
    console.log('Expected: Node with value 1');
    console.log('Got:', result2?.val);
    console.log('Test Pass:', result2 === a && result2?.val === 1);
    console.log('---\n');

    // Test 3: No cycle
    console.log('Test 3: No cycle (Example 3)');
    console.log('Input: [1], pos = -1');

    const x = new ListNode(1);

    const result3 = detectCycle(x);
    console.log('Expected: null');
    console.log('Got:', result3);
    console.log('Test Pass:', result3 === null);
    console.log('---\n');

    // Test 4: Empty list
    console.log('Test 4: Empty list');
    console.log('Input: [], pos = -1');

    const result4 = detectCycle(null);
    console.log('Expected: null');
    console.log('Got:', result4);
    console.log('Test Pass:', result4 === null);
    console.log('---\n');

    // Test 5: Single node with self-loop
    console.log('Test 5: Single node with self-loop');
    console.log('Input: [1], pos = 0');

    const single = new ListNode(1);
    single.next = single; // Self loop

    const result5 = detectCycle(single);
    console.log('Expected: Node with value 1');
    console.log('Got:', result5?.val);
    console.log('Test Pass:', result5 === single && result5?.val === 1);
    console.log('---\n');

    // Test 6: Two nodes, no cycle
    console.log('Test 6: Two nodes, no cycle');
    console.log('Input: [1,2], pos = -1');

    const p = new ListNode(1);
    const q = new ListNode(2);
    p.next = q;

    const result6 = detectCycle(p);
    console.log('Expected: null');
    console.log('Got:', result6);
    console.log('Test Pass:', result6 === null);
    console.log('---\n');

    // Test 7: Multiple nodes with duplicate values
    console.log('Test 7: Duplicate values, cycle at end');
    console.log('Input: [1,2,2,3], pos = 2 (cycle to 3rd node with value 2)');

    const m1 = new ListNode(1);
    const m2 = new ListNode(2);
    const m3 = new ListNode(2); // Duplicate value
    const m4 = new ListNode(3);

    m1.next = m2;
    m2.next = m3;
    m3.next = m4;
    m4.next = m3; // Cycle to m3 (not m2!)

    const result7 = detectCycle(m1);
    console.log('Expected: 3rd node (2nd occurrence of value 2)');
    console.log('Got:', result7?.val);
    console.log('Test Pass:', result7 === m3);
    console.log('Correctly identified 3rd node, not 2nd:', result7 !== m2);
    console.log('---\n');
  }
}

// Run the tests
LinkedListCycleIIBruteForce.runTests();