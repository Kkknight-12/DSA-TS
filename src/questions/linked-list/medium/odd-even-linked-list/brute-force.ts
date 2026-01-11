/**
 * Odd Even Linked List - Brute Force Approach
 *
 * Problem: Group all nodes at odd indices together followed by nodes at even indices.
 *          Maintain relative order within both groups.
 *
 * Approach: Store nodes in separate arrays, then rebuild list
 *
 * Time Complexity: O(n) - traverse list once + rebuild once
 * Space Complexity: O(n) - two arrays store n node references
 *
 * Where n = number of nodes in linked list
 *
 * ⚠️ WARNING: This approach does NOT satisfy the O(1) space constraint!
 * It's shown here for learning purposes only.
 */

namespace OddEvenLinkedListBruteForce {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Rearrange list using arrays
   *
   * Logic:
   * 1. Create two arrays: oddNodes and evenNodes
   * 2. Traverse list and separate nodes by INDEX (not value!)
   *    - Index 0, 2, 4, 6... (odd positions) → oddNodes
   *    - Index 1, 3, 5, 7... (even positions) → evenNodes
   * 3. Rebuild list: first all odd nodes, then all even nodes
   * 4. Return new head
   *
   * IMPORTANT: We're separating by INDEX position, not by node VALUES!
   */
  function oddEvenList(head: ListNode | null): ListNode | null {
    // EDGE CASE 1: Empty list
    // No nodes to rearrange
    if (head === null) {
      return null;
    }

    // EDGE CASE 2: Single node
    // Only one node = odd position, nothing to rearrange
    if (head.next === null) {
      return head;
    }

    // STEP 1: Create arrays to store nodes by position
    // WHY: Arrays give us easy way to collect and rebuild
    const oddNodes: ListNode[] = []; // Nodes at indices 0, 2, 4, 6...
    const evenNodes: ListNode[] = []; // Nodes at indices 1, 3, 5, 7...

    // STEP 2: Traverse list and separate by index
    let current: ListNode | null = head;
    let index = 0; // Track position (0-indexed)

    while (current !== null) {
      // CHECK: Is current index an odd position or even position?
      // NOTE: In 0-indexed: 0 = odd position, 1 = even position
      // WHY: 0 is first (1st position = odd), 1 is second (2nd position = even)
      if (index % 2 === 0) {
        // Index is even number (0, 2, 4, 6...)
        // This represents ODD POSITIONS (1st, 3rd, 5th, 7th...)
        oddNodes.push(current);
      } else {
        // Index is odd number (1, 3, 5, 7...)
        // This represents EVEN POSITIONS (2nd, 4th, 6th, 8th...)
        evenNodes.push(current);
      }

      // Move to next node
      current = current.next;
      index++;
    }

    // STEP 3: Rebuild the list
    // Connect: oddNodes → evenNodes

    // Start with odd nodes
    for (let i = 0; i < oddNodes.length - 1; i++) {
      // Connect current odd node to next odd node
      oddNodes[i].next = oddNodes[i + 1];
    }

    // Connect last odd node to first even node
    // WHY: Odd group should be followed by even group
    if (oddNodes.length > 0 && evenNodes.length > 0) {
      oddNodes[oddNodes.length - 1].next = evenNodes[0];
    } else if (oddNodes.length > 0) {
      // No even nodes, last odd should point to null
      oddNodes[oddNodes.length - 1].next = null;
    }

    // Connect even nodes among themselves
    for (let i = 0; i < evenNodes.length - 1; i++) {
      evenNodes[i].next = evenNodes[i + 1];
    }

    // Last even node should point to null
    if (evenNodes.length > 0) {
      evenNodes[evenNodes.length - 1].next = null;
    }

    // STEP 4: Return the head (first odd node)
    return head; // Head is already the first odd node (index 0)
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Input: [1, 2, 3, 4, 5]
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   * idx 0        idx 1        idx 2        idx 3        idx 4
   * ODD pos      EVEN pos     ODD pos      EVEN pos     ODD pos
   * (1st)        (2nd)        (3rd)        (4th)        (5th)
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 1 & 2: TRAVERSE AND SEPARATE
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = node(1), index = 0
   * ─────────────────────────────────────────────────────────────────
   * Check: index % 2 === 0? 0 % 2 === 0? YES!
   * Action: Add to oddNodes
   *
   * State:
   *   oddNodes = [node(1)]
   *   evenNodes = []
   *
   * Move: current = node(2), index = 1
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = node(2), index = 1
   * ─────────────────────────────────────────────────────────────────
   * Check: index % 2 === 0? 1 % 2 === 0? NO!
   * Action: Add to evenNodes
   *
   * State:
   *   oddNodes = [node(1)]
   *   evenNodes = [node(2)]
   *
   * Move: current = node(3), index = 2
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = node(3), index = 2
   * ─────────────────────────────────────────────────────────────────
   * Check: index % 2 === 0? 2 % 2 === 0? YES!
   * Action: Add to oddNodes
   *
   * State:
   *   oddNodes = [node(1), node(3)]
   *   evenNodes = [node(2)]
   *
   * Move: current = node(4), index = 3
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = node(4), index = 3
   * ─────────────────────────────────────────────────────────────────
   * Check: index % 2 === 0? 3 % 2 === 0? NO!
   * Action: Add to evenNodes
   *
   * State:
   *   oddNodes = [node(1), node(3)]
   *   evenNodes = [node(2), node(4)]
   *
   * Move: current = node(5), index = 4
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: current = node(5), index = 4
   * ─────────────────────────────────────────────────────────────────
   * Check: index % 2 === 0? 4 % 2 === 0? YES!
   * Action: Add to oddNodes
   *
   * State:
   *   oddNodes = [node(1), node(3), node(5)]
   *   evenNodes = [node(2), node(4)]
   *
   * Move: current = null, index = 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check: current === null? YES! Loop ends
   * ─────────────────────────────────────────────────────────────────
   *
   * Final arrays:
   *   oddNodes = [node(1), node(3), node(5)]  // Values: [1, 3, 5]
   *   evenNodes = [node(2), node(4)]          // Values: [2, 4]
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 3: REBUILD LIST
   * ═════════════════════════════════════════════════════════════════
   *
   * Phase 1: Connect odd nodes
   * ─────────────────────────────────────────────────────────────────
   * Loop: i = 0 to oddNodes.length - 2 (0 to 1)
   *
   * i = 0:
   *   oddNodes[0].next = oddNodes[1]
   *   node(1).next = node(3)
   *
   * i = 1:
   *   oddNodes[1].next = oddNodes[2]
   *   node(3).next = node(5)
   *
   * Current state: 1 → 3 → 5
   *
   * Phase 2: Connect last odd to first even
   * ─────────────────────────────────────────────────────────────────
   * oddNodes[2].next = evenNodes[0]
   * node(5).next = node(2)
   *
   * Current state: 1 → 3 → 5 → 2
   *
   * Phase 3: Connect even nodes
   * ─────────────────────────────────────────────────────────────────
   * Loop: i = 0 to evenNodes.length - 2 (0 to 0)
   *
   * i = 0:
   *   evenNodes[0].next = evenNodes[1]
   *   node(2).next = node(4)
   *
   * Current state: 1 → 3 → 5 → 2 → 4
   *
   * Phase 4: Set last even to null
   * ─────────────────────────────────────────────────────────────────
   * evenNodes[1].next = null
   * node(4).next = null
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │ ●──┼──→│ 2 │ ●──┼──→│ 4 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * Output: [1, 3, 5, 2, 4] ✅
   *
   * Verification:
   * - Odd positions (0,2,4): 1, 3, 5 → in order ✅
   * - Even positions (1,3): 2, 4 → in order ✅
   * - Odd group before even group ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - EVEN LENGTH EXAMPLE
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Input: [2, 1, 3, 5, 6, 4]
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 1 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │ ●──┼──→│ 6 │ ●──┼──→│ 4 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   * idx 0        idx 1        idx 2        idx 3        idx 4        idx 5
   * ODD          EVEN         ODD          EVEN         ODD          EVEN
   *
   * After separation:
   *   oddNodes = [node(2), node(3), node(6)]  // Indices 0, 2, 4
   *   evenNodes = [node(1), node(5), node(4)] // Indices 1, 3, 5
   *
   * After rebuild:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 6 │ ●──┼──→│ 1 │ ●──┼──→│ 5 │ ●──┼──→│ 4 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *
   * Output: [2, 3, 6, 1, 5, 4] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * ITERATION TABLE
   * ════════════════════════════════════════════════════════════════
   */
  /*
   * Input: [1, 2, 3, 4, 5]
   *
   * PHASE 1: SEPARATION
   * | Iteration | current | index | index%2 | Add to      | oddNodes        | evenNodes      |
   * |-----------|---------|-------|---------|-------------|-----------------|----------------|
   * | 1         | node(1) | 0     | 0 (even)| oddNodes    | [1]             | []             |
   * | 2         | node(2) | 1     | 1 (odd) | evenNodes   | [1]             | [2]            |
   * | 3         | node(3) | 2     | 0 (even)| oddNodes    | [1,3]           | [2]            |
   * | 4         | node(4) | 3     | 1 (odd) | evenNodes   | [1,3]           | [2,4]          |
   * | 5         | node(5) | 4     | 0 (even)| oddNodes    | [1,3,5]         | [2,4]          |
   * | -         | null    | 5     | -       | Stop        | [1,3,5]         | [2,4]          |
   *
   * ─────────────────────────────────────────────────────────────────────────────────────────
   *
   * PHASE 2: REBUILD
   * | Step | Action                    | Description                      | Result       |
   * |------|---------------------------|----------------------------------|--------------|
   * | 1    | Connect odd nodes         | 1→3, 3→5                         | 1→3→5        |
   * | 2    | Last odd to first even    | 5→2                              | 1→3→5→2      |
   * | 3    | Connect even nodes        | 2→4                              | 1→3→5→2→4    |
   * | 4    | Last even to null         | 4→null                           | 1→3→5→2→4→X  |
   *
   * Final: [1, 3, 5, 2, 4]
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH WORKS
   * ════════════════════════════════════════════════════════════════
   *
   * Key Insight:
   * - Arrays give us random access and easy rebuilding
   * - We can collect nodes in separate groups
   * - Then reconnect them in desired order
   *
   * Process:
   * 1. Separate by INDEX (not value!)
   *    - Index 0, 2, 4... → odd positions
   *    - Index 1, 3, 5... → even positions
   *
   * 2. Arrays maintain insertion order
   *    - First odd node added → first in oddNodes
   *    - This preserves relative order automatically
   *
   * 3. Rebuilding is straightforward
   *    - Connect within each group
   *    - Connect groups together
   *
   * Visual:
   * Original: 1 → 2 → 3 → 4 → 5
   *           ↓   ↓   ↓   ↓   ↓
   * Separate: [1,3,5] [2,4]
   *           ↓
   * Rebuild:  1 → 3 → 5 → 2 → 4 ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * EDGE CASE 1: Empty list
   * Input: null
   *
   * Return: null immediately
   */

  /**
   * EDGE CASE 2: Single node
   * Input: [1]
   *
   * ┌───┬────┐
   * │ 1 │null│
   * └───┴────┘
   * idx 0 = odd position
   *
   * oddNodes = [node(1)]
   * evenNodes = []
   *
   * No even nodes to append
   * Result: [1] (unchanged)
   */

  /**
   * EDGE CASE 3: Two nodes
   * Input: [1, 2]
   *
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │null│
   * └───┴────┘   └───┴────┘
   * idx 0        idx 1
   * odd          even
   *
   * oddNodes = [node(1)]
   * evenNodes = [node(2)]
   *
   * Result: [1, 2] (already in correct order!)
   */

  /**
   * EDGE CASE 4: All same values
   * Input: [5, 5, 5, 5]
   *
   * Remember: Separating by INDEX, not value!
   *
   * oddNodes = [node(5) at idx 0, node(5) at idx 2]
   * evenNodes = [node(5) at idx 1, node(5) at idx 3]
   *
   * Result: [5, 5, 5, 5] (positions rearranged, values look same)
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * PROS AND CONS
   * ════════════════════════════════════════════════════════════════
   *
   * ✅ Advantages:
   * 1. Very simple to understand and implement
   * 2. Clear separation of concerns (collect → rebuild)
   * 3. Easy to debug (can inspect arrays)
   * 4. Relative order automatically maintained
   * 5. Good for learning the problem concept
   *
   * ❌ Disadvantages:
   * 1. O(n) space complexity - stores all nodes in arrays
   * 2. Does NOT satisfy problem constraint (O(1) space required) ⚠️
   * 3. Not acceptable in interviews for this problem
   * 4. Two-pass solution (traverse + rebuild)
   * 5. Extra memory allocation overhead
   *
   * When to use:
   * - ✅ For learning and understanding the problem
   * - ✅ When space is not a constraint
   * - ❌ NOT for this specific problem (requires O(1) space)
   * - ❌ NOT acceptable in interviews
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY THIS DOESN'T SATISFY CONSTRAINTS
   * ════════════════════════════════════════════════════════════════
   *
   * Problem Requirement: O(1) extra space
   *
   * This approach uses: O(n) space
   * - oddNodes array: stores n/2 nodes → O(n/2)
   * - evenNodes array: stores n/2 nodes → O(n/2)
   * - Total: O(n/2 + n/2) = O(n) ❌
   *
   * Interview verdict: ❌ NOT ACCEPTABLE
   *
   * For O(1) space solution: See optimal.ts (two-pointer approach)
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMMON MISTAKES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * MISTAKE 1: Separating by node VALUE instead of INDEX
   *
   * ❌ WRONG:
   * if (current.val % 2 === 0) {
   *   evenNodes.push(current);  // Separating by value!
   * }
   *
   * Problem: [2,4,6,8] all even values but need to separate by position!
   *
   * ✅ CORRECT:
   * if (index % 2 === 0) {
   *   oddNodes.push(current);  // Separating by index!
   * }
   */

  /**
   * MISTAKE 2: Not handling empty arrays
   *
   * ❌ WRONG:
   * oddNodes[oddNodes.length - 1].next = evenNodes[0];
   * // Crashes if evenNodes is empty!
   *
   * ✅ CORRECT:
   * if (evenNodes.length > 0) {
   *   oddNodes[oddNodes.length - 1].next = evenNodes[0];
   * }
   */

  /**
   * MISTAKE 3: Forgetting to set last node to null
   *
   * ❌ WRONG:
   * // Rebuild connections but don't set last.next = null
   *
   * Problem: Creates a cycle or points to old connections
   *
   * ✅ CORRECT:
   * if (evenNodes.length > 0) {
   *   evenNodes[evenNodes.length - 1].next = null;
   * }
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Odd Even Linked List - Brute Force ===\n');
    console.log('⚠️  WARNING: This solution uses O(n) space');
    console.log('⚠️  Does NOT satisfy the O(1) space constraint!\n');

    // Helper function to create linked list from array
    function createList(arr: number[]): ListNode | null {
      if (arr.length === 0) return null;

      const head = new ListNode(arr[0]);
      let current = head;

      for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
      }

      return head;
    }

    // Helper function to convert list to array
    function listToArray(head: ListNode | null): number[] {
      const result: number[] = [];
      let current = head;

      while (current !== null) {
        result.push(current.val);
        current = current.next;
      }

      return result;
    }

    // Helper function to compare arrays
    function arraysEqual(a: number[], b: number[]): boolean {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    // Test 1: Example 1 - Odd length
    console.log('Test 1: Odd length [1,2,3,4,5]');
    const list1 = createList([1, 2, 3, 4, 5]);
    const result1 = oddEvenList(list1);
    const output1 = listToArray(result1);
    console.log('Expected: [1,3,5,2,4]');
    console.log('Got:', output1);
    console.log('Test Pass:', arraysEqual(output1, [1, 3, 5, 2, 4]));
    console.log('---\n');

    // Test 2: Example 2 - Even length
    console.log('Test 2: Even length [2,1,3,5,6,4,7]');
    const list2 = createList([2, 1, 3, 5, 6, 4, 7]);
    const result2 = oddEvenList(list2);
    const output2 = listToArray(result2);
    console.log('Expected: [2,3,6,7,1,5,4]');
    console.log('Got:', output2);
    console.log('Test Pass:', arraysEqual(output2, [2, 3, 6, 7, 1, 5, 4]));
    console.log('---\n');

    // Test 3: Empty list
    console.log('Test 3: Empty list []');
    const list3 = createList([]);
    const result3 = oddEvenList(list3);
    const output3 = listToArray(result3);
    console.log('Expected: []');
    console.log('Got:', output3);
    console.log('Test Pass:', arraysEqual(output3, []));
    console.log('---\n');

    // Test 4: Single node
    console.log('Test 4: Single node [1]');
    const list4 = createList([1]);
    const result4 = oddEvenList(list4);
    const output4 = listToArray(result4);
    console.log('Expected: [1]');
    console.log('Got:', output4);
    console.log('Test Pass:', arraysEqual(output4, [1]));
    console.log('---\n');

    // Test 5: Two nodes
    console.log('Test 5: Two nodes [1,2]');
    const list5 = createList([1, 2]);
    const result5 = oddEvenList(list5);
    const output5 = listToArray(result5);
    console.log('Expected: [1,2]');
    console.log('Got:', output5);
    console.log('Test Pass:', arraysEqual(output5, [1, 2]));
    console.log('---\n');

    // Test 6: Three nodes
    console.log('Test 6: Three nodes [1,2,3]');
    const list6 = createList([1, 2, 3]);
    const result6 = oddEvenList(list6);
    const output6 = listToArray(result6);
    console.log('Expected: [1,3,2]');
    console.log('Got:', output6);
    console.log('Test Pass:', arraysEqual(output6, [1, 3, 2]));
    console.log('---\n');

    // Test 7: Four nodes
    console.log('Test 7: Four nodes [1,2,3,4]');
    const list7 = createList([1, 2, 3, 4]);
    const result7 = oddEvenList(list7);
    const output7 = listToArray(result7);
    console.log('Expected: [1,3,2,4]');
    console.log('Got:', output7);
    console.log('Test Pass:', arraysEqual(output7, [1, 3, 2, 4]));
    console.log('---\n');

    // Test 8: All same values (position-based, not value!)
    console.log('Test 8: All same values [5,5,5,5]');
    const list8 = createList([5, 5, 5, 5]);
    const result8 = oddEvenList(list8);
    const output8 = listToArray(result8);
    console.log('Expected: [5,5,5,5] (rearranged by position)');
    console.log('Got:', output8);
    console.log('Test Pass:', arraysEqual(output8, [5, 5, 5, 5]));
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('💡 Remember: This approach uses O(n) space');
    console.log('💡 For O(1) space solution, see optimal.ts');
  }
}

// Run the tests
OddEvenLinkedListBruteForce.runTests();