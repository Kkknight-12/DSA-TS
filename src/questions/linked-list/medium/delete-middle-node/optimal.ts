/**
 * Delete Middle Node of Linked List - OPTIMAL (Fast & Slow Pointers)
 *
 * Problem: Delete the middle node where middle = ⌊n/2⌋ (0-based indexing)
 *
 * Approach: Fast and Slow pointers (one-pass)
 * - Slow pointer moves 1 step
 * - Fast pointer moves 2 steps
 * - When fast reaches end, slow is at node BEFORE middle
 * - Use dummy node to handle edge cases
 *
 * Time Complexity: O(n) - single pass! ✅
 * Space Complexity: O(1) - only constant extra space
 *
 * Where n = number of nodes in linked list
 *
 * ✅ Most elegant and optimal solution!
 * ✅ Single pass through list
 * ✅ Handles all edge cases with dummy node
 */

namespace DeleteMiddleNodeOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Delete middle node using fast/slow pointers
   *
   * Key Insight:
   * If slow moves 1 step and fast moves 2 steps,
   * when fast reaches the end, slow will be at the middle!
   *
   * BUT: We need slow to be at node BEFORE middle (for deletion)
   *
   * Solution: Use dummy node!
   * - Start both pointers at dummy (before head)
   * - When fast reaches end, slow is at node BEFORE middle!
   *
   * Strategy:
   * 1. Create dummy node pointing to head
   * 2. Set both slow and fast to dummy
   * 3. Move fast 2 steps, slow 1 step
   * 4. Stop when fast can't move 2 more steps
   * 5. slow is now at node BEFORE middle
   * 6. Remove middle: slow.next = slow.next.next
   * 7. Return dummy.next (handles single node case)
   */
  function deleteMiddle(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list (shouldn't happen per constraints)
    if (head === null) {
      return null;
    }

    // SPECIAL CASE: Single node
    // If only one node, removing it makes list empty
    // Check before creating dummy to save operations
    if (head.next === null) {
      return null;
    }

    // STEP 1: Create dummy node
    // WHY: So slow will be at node BEFORE middle when loop ends
    const dummy = new ListNode(0);
    dummy.next = head;

    // STEP 2: Initialize both pointers at dummy
    let slow: ListNode | null = dummy;
    let fast: ListNode | null = dummy;

    // STEP 3: Move pointers
    // - slow moves 1 step
    // - fast moves 2 steps
    //
    // CRITICAL: Loop while fast can move 2 MORE steps
    // This ensures slow ends up at node BEFORE middle!
    while (fast.next !== null && fast.next.next !== null) {
      // Move slow 1 step
      slow = slow.next!;

      // Move fast 2 steps
      fast = fast.next.next;
    }

    // STEP 4: Remove middle node
    // slow is now at the node BEFORE middle
    // slow.next is the middle node (to be removed)
    slow!.next = slow!.next!.next;

    // STEP 5: Return new head
    // dummy.next always points to correct head
    return dummy.next;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Delete middle in [1, 2, 3, 4, 5]
   * Middle position = ⌊5/2⌋ = 2 (node 3)
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
   * EDGE CASE CHECK
   * ═════════════════════════════════════════════════════════════════
   *
   * Check 1: head === null? NO
   * Check 2: head.next === null? NO (has more than 1 node)
   * Continue with algorithm...
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
   *
   * Position: -1    0     1     2     3     4
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 2: Initialize Pointers
   * ═════════════════════════════════════════════════════════════════
   *
   * Code:
   *   let slow = dummy;
   *   let fast = dummy;
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *  slow, fast (both at dummy, position -1)
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 3: Move Pointers (Loop Iterations)
   * ═════════════════════════════════════════════════════════════════
   *
   * Loop condition: while (fast.next && fast.next.next)
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 1
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: slow = dummy, fast = dummy
   *
   * Check:
   *   fast.next !== null? dummy.next = node(1) ✓
   *   fast.next.next !== null? node(1).next = node(2) ✓
   *   Continue!
   *
   * Action:
   *   slow = slow.next → slow = node(1) (position 0)
   *   fast = fast.next.next → fast = node(2) (position 1)
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                   ↑              ↑
   *                 slow(0)        fast(1)
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: slow = node(1), fast = node(2)
   *
   * Check:
   *   fast.next !== null? node(2).next = node(3) ✓
   *   fast.next.next !== null? node(3).next = node(4) ✓
   *   Continue!
   *
   * Action:
   *   slow = slow.next → slow = node(2) (position 1)
   *   fast = fast.next.next → fast = node(4) (position 3)
   *
   * Visual:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                  ↑                            ↑
   *                                slow(1)                      fast(3)
   *
   * ─────────────────────────────────────────────────────────────────
   * LOOP CHECK
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: slow = node(2), fast = node(4)
   *
   * Check:
   *   fast.next !== null? node(4).next = node(5) ✓
   *   fast.next.next !== null? node(5).next = null ✗
   *   STOP! Exit loop
   *
   * Final State:
   *   slow = node(2) at position 1 ← Node BEFORE middle! ✅
   *   fast = node(4) at position 3
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 4: Remove Middle Node
   * ═════════════════════════════════════════════════════════════════
   *
   * Current:
   *   slow = node(2) at position 1
   *   slow.next = node(3) at position 2 ← Middle (to remove)
   *   slow.next.next = node(4) at position 3
   *
   * Action: slow.next = slow.next.next
   *
   * Before:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 3  │ ●──┼──→│ 4 │ ...│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑            ↑
   *  slow        middle
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 4 │ ...│
   * └───┴────┘   └───┴────┘
   *    ↑
   *  slow
   *
   * Node 3 is now disconnected! ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 5: Return New Head
   * ═════════════════════════════════════════════════════════════════
   *
   * Code: return dummy.next
   *
   * Final List:
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                   ↑
   *              dummy.next (returned)
   *
   * Output: [1, 2, 4, 5] ✅
   *
   * Total Passes: 1 ⭐⭐
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY THIS WORKS: The Mathematics
   * ════════════════════════════════════════════════════════════════
   *
   * Key Principle: Fast moves 2x speed of slow
   *
   * Starting Position:
   * ─────────────────
   * Both at dummy (position -1)
   *
   * After k iterations:
   * ──────────────────
   * - slow position: -1 + k
   * - fast position: -1 + 2k
   *
   * Loop ends when:
   * ───────────────
   * fast.next.next === null
   * This means fast is 2 positions before end
   *
   * For n=5 (positions 0 to 4):
   * ───────────────────────────
   * - Last position = 4
   * - fast is at position 3 (two before end)
   * - fast position: -1 + 2k = 3
   * - Solve: 2k = 4, k = 2
   * - slow position: -1 + k = -1 + 2 = 1
   *
   * Position 1 is node(2), which is BEFORE middle node(3) at position 2! ✅
   *
   * General Formula:
   * ────────────────
   * - Middle position = ⌊n/2⌋
   * - slow ends at position ⌊n/2⌋ - 1
   * - This is exactly the node BEFORE middle! ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EXAMPLE: Even Length (n = 4)
   * ════════════════════════════════════════════════════════════════
   *
   * Input: [1, 2, 3, 4]
   * Middle position = ⌊4/2⌋ = 2 (node 3)
   *
   * ─────────────────────────────────────────────────────────────────
   * Setup:
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → 1 → 2 → 3 → 4 → null
   *   ↑
   * slow, fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1:
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → 1 → 2 → 3 → 4 → null
   *          ↑       ↑
   *        slow    fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check:
   * ─────────────────────────────────────────────────────────────────
   *
   * fast.next = node(3) ✓
   * fast.next.next = node(4) ✓
   * Continue!
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2:
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → 1 → 2 → 3 → 4 → null
   *                ↑           ↑
   *              slow        fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check:
   * ─────────────────────────────────────────────────────────────────
   *
   * fast.next = null ✗
   * STOP!
   *
   * ─────────────────────────────────────────────────────────────────
   * Remove:
   * ─────────────────────────────────────────────────────────────────
   *
   * slow = node(2) at position 1
   * slow.next = node(3) ← Middle
   *
   * Remove: slow.next = slow.next.next = node(4)
   *
   * Result: [1, 2, 4] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASE: Single Node
   * ════════════════════════════════════════════════════════════════
   *
   * Input: [1]
   *
   * Check: head.next === null? YES!
   * Return: null (immediately, before creating dummy)
   *
   * Output: [] ✅
   *
   * WHY early return?
   * ─────────────────
   * - Single node IS the middle
   * - Removing it makes list empty
   * - Early return is more efficient
   * - Avoids unnecessary dummy node creation
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASE: Two Nodes
   * ════════════════════════════════════════════════════════════════
   *
   * Input: [1, 2]
   * Middle position = ⌊2/2⌋ = 1 (node 2)
   *
   * ─────────────────────────────────────────────────────────────────
   * Setup:
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → 1 → 2 → null
   *   ↑
   * slow, fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check:
   * ─────────────────────────────────────────────────────────────────
   *
   * fast.next = node(1) ✓
   * fast.next.next = node(2) ✓
   * Continue!
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1:
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → 1 → 2 → null
   *          ↑       ↑
   *        slow    fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check:
   * ─────────────────────────────────────────────────────────────────
   *
   * fast.next = null ✗
   * STOP!
   *
   * ─────────────────────────────────────────────────────────────────
   * Remove:
   * ─────────────────────────────────────────────────────────────────
   *
   * slow = node(1) at position 0
   * slow.next = node(2) at position 1 ← Middle
   *
   * Remove: slow.next = null
   *
   * Result: [1] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY DUMMY NODE IS CRITICAL
   * ════════════════════════════════════════════════════════════════
   *
   * Without Dummy (Problematic):
   * ────────────────────────────
   *
   * If we start slow and fast at head:
   *
   * For n=5:
   *   After loop, slow would be at position 2 (middle itself!)
   *   Can't remove node from itself!
   *
   * Would need complex logic to track previous node.
   *
   * With Dummy (Clean):
   * ───────────────────
   *
   * Starting at dummy (position -1):
   *   After loop, slow is at position 1 (before middle)
   *   Perfect for removal! ✅
   *
   * Benefits:
   * ─────────
   * 1. slow automatically ends at node BEFORE middle
   * 2. No need to track previous node separately
   * 3. Clean, uniform logic for all cases
   * 4. Always correct with dummy.next return
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * LOOP CONDITION EXPLAINED
   * ════════════════════════════════════════════════════════════════
   *
   * Condition: while (fast.next && fast.next.next)
   *
   * Why this condition?
   * ───────────────────
   *
   * We need to check if fast CAN move 2 more steps!
   *
   * fast.next !== null:
   *   - Ensures fast can move 1 step
   *
   * fast.next.next !== null:
   *   - Ensures fast can move 2 steps (complete iteration)
   *
   * Loop stops when:
   * ────────────────
   *
   * Case 1: Odd length (n=5)
   *   fast reaches position 3
   *   fast.next = node(4) ✓
   *   fast.next.next = null ✗
   *   STOP!
   *
   * Case 2: Even length (n=4)
   *   fast reaches position 3
   *   fast.next = null ✗
   *   STOP!
   *
   * In both cases, slow is at correct position! ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMPARISON: Optimal vs Brute Force
   * ════════════════════════════════════════════════════════════════
   *
   * | Aspect           | Optimal (This) | Brute Force    |
   * |------------------|----------------|----------------|
   * | Time Complexity  | O(n) ⭐        | O(2n) = O(n)   |
   * | Space Complexity | O(1) ✅        | O(1) ✅        |
   * | Traversals       | 1 ⭐⭐         | 2              |
   * | Code Elegance    | High ⭐⭐      | Medium         |
   * | Dummy Node       | Yes ✅         | No             |
   * | Edge Cases       | Automatic ✅   | Manual         |
   * | Interview        | Best ⭐⭐      | Good           |
   *
   * Verdict:
   * ────────
   * Fast/slow pointer is the OPTIMAL and PREFERRED solution! ⭐⭐
   * More elegant, single pass, demonstrates understanding of patterns!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMMON MISTAKES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * MISTAKE 1: Starting pointers at head instead of dummy
   *
   * ❌ WRONG:
   * let slow = head;
   * let fast = head;
   *
   * Problem: slow ends AT middle, not BEFORE middle
   * Can't remove node from itself!
   *
   * ✅ CORRECT:
   * const dummy = new ListNode(0);
   * dummy.next = head;
   * let slow = dummy;
   * let fast = dummy;
   */

  /**
   * MISTAKE 2: Wrong loop condition
   *
   * ❌ WRONG:
   * while (fast && fast.next) {
   *   slow = slow.next;
   *   fast = fast.next.next; // Might crash if fast.next is last node!
   * }
   *
   * Problem: Might try to access null.next
   *
   * ✅ CORRECT:
   * while (fast.next && fast.next.next) {
   *   slow = slow.next;
   *   fast = fast.next.next;
   * }
   */

  /**
   * MISTAKE 3: Not handling single node
   *
   * ❌ WRONG:
   * // No check for single node
   * // Creates dummy unnecessarily
   *
   * Problem: Inefficient, though it would work
   *
   * ✅ CORRECT:
   * if (head.next === null) return null; // Early return
   */

  /**
   * MISTAKE 4: Forgetting to return dummy.next
   *
   * ❌ WRONG:
   * return head; // Might not be correct if we removed head
   *
   * Problem: Wrong if middle was close to head
   *
   * ✅ CORRECT:
   * return dummy.next; // Always correct
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * ALTERNATIVE APPROACH: Without Dummy Node
   * ════════════════════════════════════════════════════════════════
   *
   * Instead of using dummy node, we can start fast pointer
   * TWO STEPS AHEAD from the beginning!
   *
   * This achieves the same result: slow ends at node BEFORE middle
   *
   * Key Difference:
   * ───────────────
   * - slow starts at head
   * - fast starts at head.next.next (2 positions ahead!)
   * - Same loop condition and movement
   * - No dummy node needed!
   *
   * Why it works:
   * ─────────────
   * Starting fast 2 steps ahead creates the same gap as
   * starting both at dummy and moving in the loop.
   *
   * Example with n=5: [1,2,3,4,5]
   * ──────────────────────────────
   *
   * Initial:
   * 1 → 2 → 3 → 4 → 5 → null
   * ↑       ↑
   * slow   fast (started 2 ahead!)
   *
   * After iteration 1:
   * 1 → 2 → 3 → 4 → 5 → null
   *     ↑           ↑
   *   slow        fast
   *
   * Loop check: fast.next = null ✗
   * STOP!
   *
   * slow = node(2) at position 1 ← BEFORE middle! ✅
   */
  // @ts-ignore
  function deleteMiddleAlternative(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list
    if (head === null) {
      return null;
    }

    // SPECIAL CASE: Single node
    if (head.next === null) {
      return null;
    }

    // STEP 1: Initialize pointers
    // slow starts at head
    // fast starts TWO steps ahead!
    let slow: ListNode = head;
    let fast: ListNode | null = head.next?.next ?? null;

    // STEP 2: Move pointers
    // Same loop condition as dummy approach
    while (fast !== null && fast.next !== null) {
      slow = slow.next!;
      fast = fast.next.next;
    }

    // STEP 3: Remove middle node
    // slow is at node BEFORE middle
    slow.next = slow.next!.next;

    // STEP 4: Return head
    // Head never changes with this approach
    return head;
  }

  /**
   * Comparison: Dummy vs No Dummy
   * ══════════════════════════════
   *
   * | Aspect         | With Dummy | Without Dummy |
   * |----------------|------------|---------------|
   * | Extra Node     | Yes (1)    | No ✅         |
   * | Initial Setup  | More code  | Less code ✅  |
   * | Edge Cases     | Automatic  | Manual check  |
   * | Clarity        | More clear | Clever ⭐     |
   * | Performance    | Same O(n)  | Same O(n)     |
   *
   * Both are correct and optimal!
   * Choose based on preference:
   * - Dummy: More intuitive, handles all cases uniformly
   * - No dummy: Cleaner, slightly less memory
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Delete Middle Node - OPTIMAL (Fast & Slow) ===\n');
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

    // Test 7: Six nodes (even length)
    console.log('Test 7: Delete middle in [1,2,3,4,5,6]');
    const list7 = createList([1, 2, 3, 4, 5, 6]);
    const result7 = deleteMiddle(list7);
    const output7 = listToArray(result7);
    console.log('Expected: [1,2,3,5,6]');
    console.log('Got:', output7);
    console.log('Test Pass:', arraysEqual(output7, [1, 2, 3, 5, 6]));
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('💡 This is the OPTIMAL solution');
    console.log('💡 Single pass using fast & slow pointers ⭐⭐');
    console.log('💡 Dummy node ensures slow ends at node BEFORE middle!');
    console.log('💡 Most elegant and interview-preferred approach!');
  }
}

// Run the tests
DeleteMiddleNodeOptimal.runTests();