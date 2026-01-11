/**
 * Remove Nth Node From End - OPTIMAL Solution (One-Pass Two Pointers)
 *
 * Problem: Remove the nth node from the END of a linked list
 *
 * Approach: Two-pointer with dummy node (one-pass)
 * - Use dummy node to handle edge cases
 * - Maintain gap of n between two pointers
 * - When fast reaches end, slow is at node before target
 *
 * Time Complexity: O(n) - single pass! ✅
 * Space Complexity: O(1) - only constant extra space
 *
 * Where n = number of nodes in linked list
 *
 * ✅ Answers the follow-up question (one-pass)!
 * ✅ Handles all edge cases cleanly with dummy node
 * ✅ Most optimal solution possible!
 */

namespace RemoveNthFromEndOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Remove nth node from end using one-pass two-pointer
   *
   * Key Insight:
   * If we maintain a gap of n nodes between two pointers,
   * when the first pointer reaches the end,
   * the second pointer will be at the node BEFORE the target!
   *
   * Strategy:
   * 1. Create dummy node pointing to head (handles edge case of removing head)
   * 2. Set both pointers to dummy
   * 3. Move fast pointer n steps ahead (creating gap)
   * 4. Move both pointers until fast reaches end
   * 5. slow is now at node BEFORE target
   * 6. Remove target: slow.next = slow.next.next
   * 7. Return dummy.next (new head)
   *
   * WHY Dummy Node?
   * - Handles removing head elegantly (no special case!)
   * - Always have a node before target
   * - Clean, uniform code
   */
  function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // STEP 1: Create dummy node
    // WHY: Handles edge case where we remove the head
    // Without dummy, we'd need special case handling
    const dummy = new ListNode(0);
    dummy.next = head;

    // STEP 2: Initialize two pointers
    // Both start at dummy (before head)
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    // STEP 3: Move fast pointer n steps ahead
    // This creates a gap of exactly n nodes between pointers
    // WHY: When fast reaches end, slow will be n nodes behind (at correct position!)
    for (let i = 0; i < n; i++) {
      fast = fast.next!;
    }

    // STEP 4: Move both pointers together
    // Stop when fast reaches the LAST node
    // WHY: slow will then be at the node BEFORE target
    while (fast!.next !== null) {
      fast = fast.next;
      slow = slow.next!;
    }

    // STEP 5: Remove the target node
    // slow is at node BEFORE target
    // slow.next is the target node
    // Skip it by connecting to node after target
    slow!.next = slow!.next!.next;

    // STEP 6: Return new head
    // Could be different if we removed original head
    // dummy.next always points to correct head
    return dummy.next;
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
   * Input: n = 2 (remove node 4)
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 1: Create Dummy Node
   * ═════════════════════════════════════════════════════════════════
   *
   * Create: dummy = new ListNode(0)
   * Connect: dummy.next = head
   *
   * Result:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * │  0  │    │   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   * └─────┴────┘
   *    ↑
   *  dummy
   *
   * WHY: Dummy node allows us to handle removing head uniformly
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 2: Initialize Pointers
   * ═════════════════════════════════════════════════════════════════
   *
   * Code:
   *   let fast = dummy;
   *   let slow = dummy;
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *  fast, slow (both at dummy)
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 3: Move Fast Pointer n (2) Steps Ahead
   * ═════════════════════════════════════════════════════════════════
   *
   * Loop: for (i = 0; i < 2; i++)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: i = 0
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: fast = dummy
   * Action: fast = fast.next
   * After: fast = node(1)
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑              ↑
   *  slow           fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: i = 1
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: fast = node(1)
   * Action: fast = fast.next
   * After: fast = node(2)
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑                            ↑
   *  slow                         fast
   *
   * Gap created: 2 nodes between slow and fast! ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 4: Move Both Pointers Until fast.next is null
   * ═════════════════════════════════════════════════════════════════
   *
   * Loop: while (fast.next !== null)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: fast.next !== null?
   *   fast = node(2), fast.next = node(3) ✓
   *   Continue!
   *
   * Action:
   *   fast = fast.next → fast = node(3)
   *   slow = slow.next → slow = node(1)
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                   ↑                            ↑
   *                 slow                         fast
   *
   * Gap maintained: 2 nodes! ✅
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: fast.next !== null?
   *   fast = node(3), fast.next = node(4) ✓
   *   Continue!
   *
   * Action:
   *   fast = fast.next → fast = node(4)
   *   slow = slow.next → slow = node(2)
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                  ↑                            ↑
   *                                slow                         fast
   *
   * Gap maintained: 2 nodes! ✅
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: fast.next !== null?
   *   fast = node(4), fast.next = node(5) ✓
   *   Continue!
   *
   * Action:
   *   fast = fast.next → fast = node(5)
   *   slow = slow.next → slow = node(3)
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                                 ↑                            ↑
   *                                               slow                         fast
   *
   * Gap maintained: 2 nodes! ✅
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: fast.next !== null?
   *   fast = node(5), fast.next = null ✗
   *   STOP! Exit loop
   *
   * Final State:
   *   slow = node(3) ← Node BEFORE target!
   *   fast = node(5) ← Last node
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 5: Remove Target Node
   * ═════════════════════════════════════════════════════════════════
   *
   * Current:
   *   slow = node(3)
   *   slow.next = node(4) ← Target to remove
   *   slow.next.next = node(5)
   *
   * Action: slow.next = slow.next.next
   *
   * Before:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑            ↑
   *  slow        target
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘
   *    ↑
   *  slow
   *
   * Node 4 is now disconnected! ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 6: Return New Head
   * ═════════════════════════════════════════════════════════════════
   *
   * Code: return dummy.next
   *
   * Final List:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                   ↑
   *              dummy.next (returned)
   *
   * Output: [1, 2, 3, 5] ✅
   *
   * Total Passes: 1 ⭐
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY THIS WORKS: The Gap Principle
   * ════════════════════════════════════════════════════════════════
   *
   * The Magic: Maintaining gap of n nodes between pointers!
   *
   * Setup: Move fast n steps ahead
   * ──────────────────────────────────
   *
   * dummy → 1 → 2 → 3 → 4 → 5 → null
   *   ↑             ↑
   * slow          fast
   *
   * Gap = 2 nodes (nodes 1 and 2 between them)
   *
   * Move Together:
   * ──────────────
   *
   * When fast moves to end:
   * dummy → 1 → 2 → 3 → 4 → 5 → null
   *                 ↑           ↑
   *               slow        fast
   *
   * Gap still = 2 nodes (nodes 4 and 5)
   *
   * Result:
   * ───────
   * slow is exactly 2 nodes before fast
   * = slow is at node BEFORE the 2nd from end
   * = slow is at the node we need to remove from!
   *
   * This is WHY we can do it in one pass! ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASE: Removing Head
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Remove 3rd from end in [1, 2, 3]
   * (3rd from end = head)
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 1: Create dummy
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → 1 → 2 → 3 → null
   *   ↑
   * fast, slow
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 2: Move fast 3 steps ahead
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → 1 → 2 → 3 → null
   *   ↑             ↑
   * slow          fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 3: Loop check
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: fast.next !== null?
   *   fast = node(3), fast.next = null ✗
   *   Don't enter loop!
   *
   * Result: slow is still at dummy!
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 4: Remove
   * ─────────────────────────────────────────────────────────────────
   *
   * Action: slow.next = slow.next.next
   *         dummy.next = node(1).next
   *         dummy.next = node(2)
   *
   * Before:
   * dummy → 1 → 2 → 3 → null
   *   ↑     ↑
   * slow  target
   *
   * After:
   * dummy → 2 → 3 → null
   *   ↑
   * slow
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 5: Return
   * ─────────────────────────────────────────────────────────────────
   *
   * Return: dummy.next = node(2)
   * Output: [2, 3] ✅
   *
   * No special case needed! Dummy node handles it! ⭐
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY DUMMY NODE IS CRITICAL
   * ════════════════════════════════════════════════════════════════
   *
   * Without Dummy (Messy):
   * ──────────────────────
   *
   * function removeNthFromEnd(head, n) {
   *   // Special case for removing head
   *   if (n === length) {
   *     return head.next;  // Special handling!
   *   }
   *
   *   // Regular case
   *   let slow = head;
   *   // ... rest of logic
   * }
   *
   * With Dummy (Clean):
   * ───────────────────
   *
   * function removeNthFromEnd(head, n) {
   *   const dummy = new ListNode(0);
   *   dummy.next = head;
   *
   *   // Uniform logic for ALL cases!
   *   // No special handling needed!
   *
   *   return dummy.next;  // Works even if head changed!
   * }
   *
   * Benefits:
   * ─────────
   * 1. No special case for removing head
   * 2. Always have a node before target
   * 3. Can always return dummy.next (correct head)
   * 4. Cleaner, more maintainable code
   * 5. Less error-prone
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
   * Setup: dummy → 1 → null
   * After fast moves 1: slow=dummy, fast=node(1)
   * Loop check: fast.next=null, skip loop
   * Remove: dummy.next = node(1).next = null
   * Return: dummy.next = null
   * Output: [] ✅
   */

  /**
   * EDGE CASE 2: Two nodes, remove head
   * Input: [1, 2], n = 2
   *
   * Setup: dummy → 1 → 2 → null
   * After fast moves 2: slow=dummy, fast=node(2)
   * Loop check: fast.next=null, skip loop
   * Remove: dummy.next = node(1).next = node(2)
   * Return: dummy.next = node(2)
   * Output: [2] ✅
   */

  /**
   * EDGE CASE 3: Two nodes, remove tail
   * Input: [1, 2], n = 1
   *
   * Setup: dummy → 1 → 2 → null
   * After fast moves 1: slow=dummy, fast=node(1)
   * Loop iteration: slow=node(1), fast=node(2)
   * Loop check: fast.next=null, exit
   * Remove: node(1).next = node(2).next = null
   * Return: dummy.next = node(1)
   * Output: [1] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMPARISON: One-Pass vs Two-Pass
   * ════════════════════════════════════════════════════════════════
   *
   * | Aspect           | One-Pass (This) | Two-Pass       |
   * |------------------|-----------------|----------------|
   * | Time Complexity  | O(n) ⭐         | O(2n) = O(n)   |
   * | Space Complexity | O(1) ✅         | O(1) ✅        |
   * | Traversals       | 1 ⭐⭐          | 2              |
   * | Code Complexity  | Medium          | Easy           |
   * | Dummy Node       | Yes ✅          | Optional       |
   * | Edge Cases       | Automatic ✅    | Manual         |
   * | Follow-up Answer | Yes ⭐⭐        | No             |
   * | Interview        | Best ⭐⭐       | Good           |
   *
   * Verdict:
   * ────────
   * One-pass is more elegant and answers the follow-up!
   * This is the OPTIMAL and PREFERRED solution! ⭐⭐
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMMON MISTAKES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * MISTAKE 1: Wrong gap size
   *
   * ❌ WRONG:
   * for (let i = 0; i < n - 1; i++) {  // Off by one!
   *   fast = fast.next;
   * }
   *
   * Problem: Gap will be (n-1), not n!
   * slow won't be at correct position
   *
   * ✅ CORRECT:
   * for (let i = 0; i < n; i++) {  // Exactly n!
   *   fast = fast.next;
   * }
   */

  /**
   * MISTAKE 2: Wrong loop condition
   *
   * ❌ WRONG:
   * while (fast !== null) {
   *   fast = fast.next;
   *   slow = slow.next;
   * }
   *
   * Problem: When fast is null, slow has moved one too far!
   *
   * ✅ CORRECT:
   * while (fast.next !== null) {
   *   fast = fast.next;
   *   slow = slow.next;
   * }
   *
   * Reason: Stop when fast is at LAST node, not after it
   */

  /**
   * MISTAKE 3: Not using dummy node
   *
   * ❌ WRONG:
   * let slow = head;
   * let fast = head;
   * // Special case needed for removing head!
   *
   * Problem: Removing head requires special handling
   *
   * ✅ CORRECT:
   * const dummy = new ListNode(0);
   * dummy.next = head;
   * let slow = dummy;
   * let fast = dummy;
   * // No special case needed!
   */

  /**
   * MISTAKE 4: Forgetting to return dummy.next
   *
   * ❌ WRONG:
   * return head;  // Old head might be removed!
   *
   * Problem: If we removed head, this returns wrong node
   *
   * ✅ CORRECT:
   * return dummy.next;  // Always correct head!
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Remove Nth Node From End - OPTIMAL (One-Pass) ===\n');
    console.log('✅ Single pass through list! ⭐⭐\n');

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

    // Test 7: Longer list
    console.log('Test 7: Remove 4th from end in [1,2,3,4,5,6,7]');
    const list7 = createList([1, 2, 3, 4, 5, 6, 7]);
    const result7 = removeNthFromEnd(list7, 4);
    const output7 = listToArray(result7);
    console.log('Expected: [1,2,3,5,6,7]');
    console.log('Got:', output7);
    console.log('Test Pass:', arraysEqual(output7, [1, 2, 3, 5, 6, 7]));
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('💡 This is the OPTIMAL solution');
    console.log('💡 Single pass through list ⭐⭐');
    console.log('💡 Answers the follow-up question!');
    console.log('💡 Dummy node handles all edge cases cleanly!');
  }
}

// Run the tests
RemoveNthFromEndOptimal.runTests();