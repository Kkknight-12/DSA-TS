/**
 * Remove Nth Node From End - Brute Force (Two-Pass)
 *
 * Problem: Remove the nth node from the END of a linked list
 *
 * Approach: Two-pass solution
 * - First pass: Count total nodes
 * - Second pass: Navigate to node before target and remove
 *
 * Time Complexity: O(2n) = O(n) - two passes through list
 * Space Complexity: O(1) - only constant extra space
 *
 * Where n = number of nodes in linked list
 *
 * ✅ Satisfies space constraint
 * ❌ Requires two passes (doesn't answer follow-up)
 */

namespace RemoveNthFromEndBruteForce {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Remove nth node from end using two-pass approach
   *
   * Key Insight:
   * If list has L nodes and we want to remove nth from end,
   * we need to remove the (L - n + 1)th node from beginning!
   *
   * BUT: We need the node BEFORE it to do the removal
   * So we navigate to position (L - n)
   *
   * Strategy:
   * 1. First pass: Count total nodes (L)
   * 2. Calculate: position = L - n (node BEFORE target)
   * 3. Second pass: Navigate to that position
   * 4. Remove next node
   * 5. Handle special case: removing head
   */
  function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // EDGE CASE: Empty list (shouldn't happen per constraints)
    if (head === null) {
      return null;
    }

    // ═════════════════════════════════════════════════════════════
    // PASS 1: Count total nodes
    // ═════════════════════════════════════════════════════════════

    let length = 0;
    let current: ListNode | null = head;

    while (current !== null) {
      length++;
      current = current.next;
    }

    // ═════════════════════════════════════════════════════════════
    // SPECIAL CASE: Remove head (nth from end is head)
    // ═════════════════════════════════════════════════════════════

    // If n equals length, we're removing the head
    // Example: [1,2,3], n=3 means remove 3rd from end (which is 1st from start)
    if (n === length) {
      return head.next; // New head is the second node
    }

    // ═════════════════════════════════════════════════════════════
    // PASS 2: Navigate to node BEFORE target
    // ═════════════════════════════════════════════════════════════

    // Calculate position of node BEFORE the one to remove
    // If removing 2nd from end in a 5-node list:
    // - Target is at position 4 from start (5 - 2 + 1 = 4)
    // - We need position 3 (one before target)
    // - Formula: length - n
    const positionBefore = length - n;

    // Navigate to that position
    current = head;
    for (let i = 1; i < positionBefore; i++) {
      current = current!.next;
    }

    // ═════════════════════════════════════════════════════════════
    // REMOVE: Skip the target node
    // ═════════════════════════════════════════════════════════════

    // current is now at the node BEFORE target
    // current.next is the target node
    // current.next.next is the node AFTER target

    // Skip the target node
    current!.next = current!.next!.next;

    return head;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Remove 2nd from end in [1, 2, 3, 4, 5]
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * Input: n = 2 (remove 2nd from end, which is node 4)
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 1: Count Nodes
   * ═════════════════════════════════════════════════════════════════
   *
   * Iteration 1: current = 1, length = 1
   * Iteration 2: current = 2, length = 2
   * Iteration 3: current = 3, length = 3
   * Iteration 4: current = 4, length = 4
   * Iteration 5: current = 5, length = 5
   * Iteration 6: current = null, exit loop
   *
   * Result: length = 5
   *
   * ═════════════════════════════════════════════════════════════════
   * CHECK: Is n === length? (Removing head?)
   * ═════════════════════════════════════════════════════════════════
   *
   * Is n (2) === length (5)? NO!
   * Not removing head, continue...
   *
   * ═════════════════════════════════════════════════════════════════
   * CALCULATE: Position of node BEFORE target
   * ═════════════════════════════════════════════════════════════════
   *
   * Formula: positionBefore = length - n
   * positionBefore = 5 - 2 = 3
   *
   * Explanation:
   * - 2nd from end = 4th from beginning (position 4)
   * - We need position 3 (one before position 4)
   * - Formula works: 5 - 2 = 3 ✓
   *
   * Positions:
   * 1 → 2 → 3 → 4 → 5
   * ↑   ↑   ↑   ↑   ↑
   * 1   2   3   4   5  (position from start)
   * 5   4   3   2   1  (position from end)
   *
   * Target: 2nd from end = 4th from start (node 4)
   * Need: 3rd from start (node 3) to remove node 4
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 2: Navigate to Position 3
   * ═════════════════════════════════════════════════════════════════
   *
   * Start: current = head (node 1)
   *
   * Loop: for (i = 1; i < 3; i++)
   *
   * Iteration 1: i = 1
   *   current = current.next = node(2)
   *
   * Iteration 2: i = 2
   *   current = current.next = node(3)
   *
   * Loop ends (i = 3, not less than 3)
   *
   * Result: current = node(3)
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                              ↑
   *                           current (position 3)
   *
   * ═════════════════════════════════════════════════════════════════
   * REMOVE: Skip target node
   * ═════════════════════════════════════════════════════════════════
   *
   * Current state:
   *   current = node(3)
   *   current.next = node(4) ← Target to remove
   *   current.next.next = node(5)
   *
   * Action: current.next = current.next.next
   *
   * Before:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑            ↑
   * current      target
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘
   *    ↑
   * current
   *
   * Node 4 is now disconnected (garbage collected)
   *
   * ═════════════════════════════════════════════════════════════════
   * RETURN: Original head
   * ═════════════════════════════════════════════════════════════════
   *
   * Final List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head (returned)
   *
   * Output: [1, 2, 3, 5] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * SPECIAL CASE: Removing the Head
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Remove 3rd from end in [1, 2, 3]
   *
   * Input: n = 3, length = 3
   *
   * Check: n === length? 3 === 3? YES!
   *
   * This means we're removing the head!
   * - 3rd from end in a 3-node list is the 1st from start (head)
   *
   * Action: return head.next
   *
   * Before:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head (remove this)
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 3 │null│
   * └───┴────┘   └───┴────┘
   *    ↑
   *  new head (head.next)
   *
   * Output: [2, 3] ✅
   *
   * Why special case?
   * ─────────────────
   * - Can't navigate to "node before head" (doesn't exist!)
   * - Need to return a NEW head
   * - Must handle separately
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * EDGE CASE 1: Single node
   * Input: [1], n = 1
   *
   * Pass 1: length = 1
   * Check: n === length? 1 === 1? YES! (removing head)
   * Return: head.next = null
   * Output: [] ✅
   */

  /**
   * EDGE CASE 2: Two nodes, remove head
   * Input: [1, 2], n = 2
   *
   * Pass 1: length = 2
   * Check: n === length? 2 === 2? YES! (removing head)
   * Return: head.next = node(2)
   * Output: [2] ✅
   */

  /**
   * EDGE CASE 3: Two nodes, remove tail
   * Input: [1, 2], n = 1
   *
   * Pass 1: length = 2
   * Check: n === length? 1 === 2? NO
   * Pass 2: positionBefore = 2 - 1 = 1
   * Navigate to position 1 (node 1)
   * Remove: node(1).next = node(2).next = null
   * Output: [1] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY TWO PASSES?
   * ════════════════════════════════════════════════════════════════
   *
   * Problem: We don't know the total length initially!
   *
   * To remove nth from end, we need to:
   * 1. Know how many nodes there are (L)
   * 2. Calculate position from start: (L - n)
   * 3. Navigate to that position
   *
   * Without knowing L, we can't calculate where to go!
   *
   * Solutions:
   * ──────────
   * A. Two passes (this approach)
   *    - Simple and intuitive
   *    - But requires traversing twice
   *
   * B. One pass with two pointers (optimal)
   *    - More clever
   *    - Maintains gap of n between pointers
   *    - Single traversal
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * PROS AND CONS
   * ════════════════════════════════════════════════════════════════
   *
   * ✅ Advantages:
   * 1. Simple and intuitive
   * 2. Easy to understand
   * 3. O(1) space - satisfies constraint
   * 4. Clear logic flow
   * 5. Easy to implement correctly
   *
   * ❌ Disadvantages:
   * 1. Two passes required (O(2n))
   * 2. Doesn't answer follow-up (one-pass?)
   * 3. Special case handling for head removal is messy
   * 4. More code than optimal solution
   *
   * Interview Verdict:
   * ──────────────────
   * - Good as first approach to show understanding
   * - But mention that one-pass is possible
   * - Then implement optimal solution
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Remove Nth Node From End - Brute Force (Two-Pass) ===\n');
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

    // Test 1: Example 1 - Remove 2nd from end
    console.log('Test 1: Remove 2nd from end in [1,2,3,4,5]');
    const list1 = createList([1, 2, 3, 4, 5]);
    const result1 = removeNthFromEnd(list1, 2);
    const output1 = listToArray(result1);
    console.log('Expected: [1,2,3,5]');
    console.log('Got:', output1);
    console.log('Test Pass:', arraysEqual(output1, [1, 2, 3, 5]));
    console.log('---\n');

    // Test 2: Example 2 - Single node
    console.log('Test 2: Remove 1st from end in [1]');
    const list2 = createList([1]);
    const result2 = removeNthFromEnd(list2, 1);
    const output2 = listToArray(result2);
    console.log('Expected: []');
    console.log('Got:', output2);
    console.log('Test Pass:', arraysEqual(output2, []));
    console.log('---\n');

    // Test 3: Example 3 - Remove last node
    console.log('Test 3: Remove 1st from end in [1,2]');
    const list3 = createList([1, 2]);
    const result3 = removeNthFromEnd(list3, 1);
    const output3 = listToArray(result3);
    console.log('Expected: [1]');
    console.log('Got:', output3);
    console.log('Test Pass:', arraysEqual(output3, [1]));
    console.log('---\n');

    // Test 4: Remove head
    console.log('Test 4: Remove 3rd from end in [1,2,3] (head)');
    const list4 = createList([1, 2, 3]);
    const result4 = removeNthFromEnd(list4, 3);
    const output4 = listToArray(result4);
    console.log('Expected: [2,3]');
    console.log('Got:', output4);
    console.log('Test Pass:', arraysEqual(output4, [2, 3]));
    console.log('---\n');

    // Test 5: Remove middle node
    console.log('Test 5: Remove 2nd from end in [1,2,3]');
    const list5 = createList([1, 2, 3]);
    const result5 = removeNthFromEnd(list5, 2);
    const output5 = listToArray(result5);
    console.log('Expected: [1,3]');
    console.log('Got:', output5);
    console.log('Test Pass:', arraysEqual(output5, [1, 3]));
    console.log('---\n');

    // Test 6: Two nodes, remove head
    console.log('Test 6: Remove 2nd from end in [1,2] (head)');
    const list6 = createList([1, 2]);
    const result6 = removeNthFromEnd(list6, 2);
    const output6 = listToArray(result6);
    console.log('Expected: [2]');
    console.log('Got:', output6);
    console.log('Test Pass:', arraysEqual(output6, [2]));
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('💡 This approach uses TWO passes');
    console.log('💡 Simple but not optimal for follow-up question');
    console.log('💡 Check optimal.ts for one-pass solution!');
  }
}

// Run the tests
RemoveNthFromEndBruteForce.runTests();
