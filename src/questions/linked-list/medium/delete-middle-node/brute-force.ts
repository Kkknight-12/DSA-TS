/**
 * Delete Middle Node of Linked List - Brute Force (Two-Pass)
 *
 * Problem: Delete the middle node where middle = ⌊n/2⌋ (0-based indexing)
 *
 * Approach: Two-pass solution
 * - First pass: Count total nodes
 * - Second pass: Navigate to node before middle and remove
 *
 * Time Complexity: O(n) - two passes through list
 * Space Complexity: O(1) - only constant extra space
 *
 * Where n = number of nodes in linked list
 *
 * ✅ Satisfies space constraint
 * ⚠️  Requires two passes
 */

namespace DeleteMiddleNodeBruteForce {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Delete middle node using two-pass approach
   *
   * Key Insight:
   * Middle position = ⌊n/2⌋ (0-based)
   * We need to navigate to position (⌊n/2⌋ - 1) to remove middle
   *
   * Strategy:
   * 1. First pass: Count total nodes (n)
   * 2. Calculate middle position: mid = Math.floor(n / 2)
   * 3. Handle special case: single node (return null)
   * 4. Second pass: Navigate to position (mid - 1)
   * 5. Remove middle node: current.next = current.next.next
   */
  function deleteMiddle(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list (shouldn't happen per constraints)
    if (head === null) {
      return null;
    }

    // ═════════════════════════════════════════════════════════════
    // PASS 1: Count total nodes
    // ═════════════════════════════════════════════════════════════

    let count = 0;
    let current: ListNode | null = head;

    while (current !== null) {
      count++;
      current = current.next;
    }

    // ═════════════════════════════════════════════════════════════
    // SPECIAL CASE: Single node (n = 1)
    // ═════════════════════════════════════════════════════════════

    // If only one node, it IS the middle
    // Removing it makes list empty
    if (count === 1) {
      return null;
    }

    // ═════════════════════════════════════════════════════════════
    // CALCULATE: Middle position
    // ═════════════════════════════════════════════════════════════

    // Middle position using 0-based indexing
    // Examples:
    // n=2: mid = 2/2 = 1
    // n=3: mid = 3/2 = 1 (floor)
    // n=4: mid = 4/2 = 2
    // n=5: mid = 5/2 = 2 (floor)
    const middlePosition = Math.floor(count / 2);

    // Position of node BEFORE middle
    // We need this to remove the middle node
    const positionBefore = middlePosition - 1;

    // ═════════════════════════════════════════════════════════════
    // PASS 2: Navigate to node BEFORE middle
    // ═════════════════════════════════════════════════════════════

    current = head;

    // Move to position (middlePosition - 1)
    // This is the node RIGHT BEFORE middle
    for (let i = 0; i < positionBefore; i++) {
      current = current!.next;
    }

    // ═════════════════════════════════════════════════════════════
    // REMOVE: Skip the middle node
    // ═════════════════════════════════════════════════════════════

    // current is now at the node BEFORE middle
    // current.next is the middle node (to be removed)
    // current.next.next is the node AFTER middle

    // Skip the middle node
    current!.next = current!.next!.next;

    return head;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Delete middle in [1, 2, 3, 4, 5]
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * Positions: 0     1     2     3     4
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 1: Count Nodes
   * ═════════════════════════════════════════════════════════════════
   *
   * Iteration 1: current = 1, count = 1
   * Iteration 2: current = 2, count = 2
   * Iteration 3: current = 3, count = 3
   * Iteration 4: current = 4, count = 4
   * Iteration 5: current = 5, count = 5
   * Iteration 6: current = null, exit loop
   *
   * Result: count = 5
   *
   * ═════════════════════════════════════════════════════════════════
   * CHECK: Single node?
   * ═════════════════════════════════════════════════════════════════
   *
   * Is count === 1? 5 === 1? NO!
   * Not a single node, continue...
   *
   * ═════════════════════════════════════════════════════════════════
   * CALCULATE: Middle position and position before
   * ═════════════════════════════════════════════════════════════════
   *
   * middlePosition = Math.floor(count / 2)
   *                = Math.floor(5 / 2)
   *                = Math.floor(2.5)
   *                = 2
   *
   * Middle is at position 2 (node 3) ✓
   *
   * positionBefore = middlePosition - 1
   *                = 2 - 1
   *                = 1
   *
   * We need to navigate to position 1 (node 2)
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 2: Navigate to Position 1 (node before middle)
   * ═════════════════════════════════════════════════════════════════
   *
   * Start: current = head (node 1, position 0)
   *
   * Loop: for (i = 0; i < 1; i++)
   *
   * Iteration 1: i = 0
   *   current = current.next = node(2)
   *
   * Loop ends (i = 1, not less than 1)
   *
   * Result: current = node(2) at position 1
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                 ↑
   *              current (position 1)
   *
   * ═════════════════════════════════════════════════════════════════
   * REMOVE: Skip middle node
   * ═════════════════════════════════════════════════════════════════
   *
   * Current state:
   *   current = node(2) at position 1
   *   current.next = node(3) at position 2 ← Middle (to remove)
   *   current.next.next = node(4) at position 3
   *
   * Action: current.next = current.next.next
   *
   * Before:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ...│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑            ↑
   * current      middle
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 4 │ ...│
   * └───┴────┘   └───┴────┘
   *    ↑
   * current
   *
   * Node 3 is now disconnected (garbage collected)
   *
   * ═════════════════════════════════════════════════════════════════
   * RETURN: Original head
   * ═════════════════════════════════════════════════════════════════
   *
   * Final List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head (returned)
   *
   * Output: [1, 2, 4, 5] ✅
   *
   * Middle node (3) successfully removed!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * DETAILED EXAMPLE: n = 7
   * ════════════════════════════════════════════════════════════════
   *
   * Input: [1, 3, 4, 7, 1, 2, 6]
   *
   * Pass 1: count = 7
   *
   * Calculate:
   *   middlePosition = ⌊7/2⌋ = 3
   *   positionBefore = 3 - 1 = 2
   *
   * Positions: 0  1  2  3  4  5  6
   * Values:   [1, 3, 4, 7, 1, 2, 6]
   *                 ↑  ↑
   *              before middle
   *
   * Pass 2: Navigate to position 2 (value 4)
   *
   * Remove: node(4).next = node(7).next
   *         node(4).next = node(1)
   *
   * Result: [1, 3, 4, 1, 2, 6] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * EDGE CASE 1: Single node
   * Input: [1]
   *
   * Pass 1: count = 1
   * Check: count === 1? YES!
   * Return: null
   * Output: [] ✅
   *
   * Explanation: Only node is middle, list becomes empty
   */

  /**
   * EDGE CASE 2: Two nodes
   * Input: [1, 2]
   *
   * Pass 1: count = 2
   * Calculate:
   *   middlePosition = ⌊2/2⌋ = 1
   *   positionBefore = 1 - 1 = 0
   *
   * Pass 2: Navigate to position 0 (node 1)
   * Remove: node(1).next = node(2).next = null
   * Output: [1] ✅
   */

  /**
   * EDGE CASE 3: Three nodes
   * Input: [1, 2, 3]
   *
   * Pass 1: count = 3
   * Calculate:
   *   middlePosition = ⌊3/2⌋ = 1
   *   positionBefore = 1 - 1 = 0
   *
   * Pass 2: Navigate to position 0 (node 1)
   * Remove: node(1).next = node(2).next = node(3)
   * Output: [1, 3] ✅
   */

  /**
   * EDGE CASE 4: Even length (n = 4)
   * Input: [1, 2, 3, 4]
   *
   * Pass 1: count = 4
   * Calculate:
   *   middlePosition = ⌊4/2⌋ = 2
   *   positionBefore = 2 - 1 = 1
   *
   * Pass 2: Navigate to position 1 (node 2)
   * Remove: node(2).next = node(3).next = node(4)
   * Output: [1, 2, 4] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * MIDDLE POSITION REFERENCE TABLE
   * ════════════════════════════════════════════════════════════════
   *
   * | n | ⌊n/2⌋ | Middle Position | Position Before | List Example |
   * |---|-------|-----------------|-----------------|--------------|
   * | 1 | 0     | 0 (only node)   | -1 (none)       | [A]          |
   * | 2 | 1     | 1 (2nd node)    | 0               | [A,B]        |
   * | 3 | 1     | 1 (2nd node)    | 0               | [A,B,C]      |
   * | 4 | 2     | 2 (3rd node)    | 1               | [A,B,C,D]    |
   * | 5 | 2     | 2 (3rd node)    | 1               | [A,B,C,D,E]  |
   * | 6 | 3     | 3 (4th node)    | 2               | [A,B,C,D,E,F]|
   * | 7 | 3     | 3 (4th node)    | 2               | [1,3,4,7,1,2,6]|
   *
   * Pattern:
   * - For odd n: Middle is exactly at center
   * - For even n: Middle is the second of the two center nodes
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY TWO PASSES?
   * ════════════════════════════════════════════════════════════════
   *
   * Problem: We don't know total length initially!
   *
   * To find middle position ⌊n/2⌋, we need to know n!
   *
   * Solutions:
   * ──────────
   * A. Two passes (this approach)
   *    - First: Count nodes to get n
   *    - Second: Navigate to position ⌊n/2⌋ - 1
   *    - Simple and clear
   *
   * B. One pass with fast/slow pointers (optimal)
   *    - Fast moves 2x speed of slow
   *    - When fast reaches end, slow is at middle
   *    - More elegant
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * PROS AND CONS
   * ════════════════════════════════════════════════════════════════
   *
   * ✅ Advantages:
   * 1. Simple and intuitive
   * 2. Easy to understand the logic
   * 3. O(1) space - satisfies constraint
   * 4. Clear step-by-step process
   * 5. Easy to debug
   *
   * ❌ Disadvantages:
   * 1. Two passes required (O(2n))
   * 2. Not as elegant as fast/slow pointer
   * 3. More code than optimal solution
   * 4. Special case for single node
   *
   * Interview Verdict:
   * ──────────────────
   * - Good as initial approach
   * - Shows understanding of the problem
   * - But mention that one-pass is possible
   * - Then implement optimal fast/slow solution
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Delete Middle Node - Brute Force (Two-Pass) ===\n');
    console.log('⚠️  This solution requires TWO passes\n');

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

    // Test 1: Example 1 - Seven nodes
    console.log('Test 1: Delete middle in [1,3,4,7,1,2,6]');
    const list1 = createList([1, 3, 4, 7, 1, 2, 6]);
    const result1 = deleteMiddle(list1);
    const output1 = listToArray(result1);
    console.log('Expected: [1,3,4,1,2,6]');
    console.log('Got:', output1);
    console.log('Test Pass:', arraysEqual(output1, [1, 3, 4, 1, 2, 6]));
    console.log('---\n');

    // Test 2: Example 2 - Four nodes
    console.log('Test 2: Delete middle in [1,2,3,4]');
    const list2 = createList([1, 2, 3, 4]);
    const result2 = deleteMiddle(list2);
    const output2 = listToArray(result2);
    console.log('Expected: [1,2,4]');
    console.log('Got:', output2);
    console.log('Test Pass:', arraysEqual(output2, [1, 2, 4]));
    console.log('---\n');

    // Test 3: Example 3 - Two nodes
    console.log('Test 3: Delete middle in [2,1]');
    const list3 = createList([2, 1]);
    const result3 = deleteMiddle(list3);
    const output3 = listToArray(result3);
    console.log('Expected: [2]');
    console.log('Got:', output3);
    console.log('Test Pass:', arraysEqual(output3, [2]));
    console.log('---\n');

    // Test 4: Single node
    console.log('Test 4: Delete middle in [1]');
    const list4 = createList([1]);
    const result4 = deleteMiddle(list4);
    const output4 = listToArray(result4);
    console.log('Expected: []');
    console.log('Got:', output4);
    console.log('Test Pass:', arraysEqual(output4, []));
    console.log('---\n');

    // Test 5: Three nodes
    console.log('Test 5: Delete middle in [1,2,3]');
    const list5 = createList([1, 2, 3]);
    const result5 = deleteMiddle(list5);
    const output5 = listToArray(result5);
    console.log('Expected: [1,3]');
    console.log('Got:', output5);
    console.log('Test Pass:', arraysEqual(output5, [1, 3]));
    console.log('---\n');

    // Test 6: Five nodes (odd length)
    console.log('Test 6: Delete middle in [1,2,3,4,5]');
    const list6 = createList([1, 2, 3, 4, 5]);
    const result6 = deleteMiddle(list6);
    const output6 = listToArray(result6);
    console.log('Expected: [1,2,4,5]');
    console.log('Got:', output6);
    console.log('Test Pass:', arraysEqual(output6, [1, 2, 4, 5]));
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('💡 This approach uses TWO passes');
    console.log('💡 Simple but not optimal');
    console.log('💡 Check optimal.ts for one-pass fast/slow solution!');
  }
}

// Run the tests
DeleteMiddleNodeBruteForce.runTests();
