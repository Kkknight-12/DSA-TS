/**
 * Odd Even Linked List - OPTIMAL Solution (Pure In-Place)
 *
 * Problem: Group all nodes at odd indices together followed by nodes at even indices.
 *
 * Approach: Pure in-place pointer manipulation without dummy nodes
 *
 * Time Complexity: O(n) - single pass through list
 * Space Complexity: O(1) - truly optimal, no extra nodes at all!
 *
 * Where n = number of nodes in linked list
 *
 * ✅ This is the MOST OPTIMAL approach!
 * ✅ No dummy nodes, pure pointer manipulation
 * ✅ Minimum space usage
 */

namespace OddEvenLinkedListOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Rearrange list using pure in-place manipulation
   *
   * Key Insight:
   * Instead of using dummy nodes, we directly manipulate the original nodes
   * by maintaining two pointers (odd and even) and reconnecting them!
   *
   * Strategy:
   * 1. Start with odd = head (first node, odd position)
   * 2. Start with even = head.next (second node, even position)
   * 3. Save evenHead to reconnect at the end
   * 4. In each iteration:
   *    - Skip one node in odd chain (odd.next = even.next)
   *    - Skip one node in even chain (even.next = odd.next)
   * 5. Connect odd chain's tail to evenHead
   *
   * WHY No Dummy Nodes?
   * - Saves memory (no extra nodes)
   * - More efficient (fewer operations)
   * - "Pure" O(1) space
   * - BUT: Slightly more complex to understand
   */
  function oddEvenList(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list or single node
    // If head is null or only one node, return as is
    if (head === null) {
      return null;
    }

    // STEP 1: Initialize pointers
    // odd points to first node (position 1 = odd)
    let odd = head;

    // even points to second node (position 2 = even)
    let even = head.next;

    // IMPORTANT: Save the head of even list
    // We'll need this to connect at the end!
    const evenHead = even;

    // STEP 2: Rearrange nodes
    // Loop while even and even.next exist
    // WHY check even AND even.next?
    // - If even is null, we're done (odd length list)
    // - If even.next is null, we're done (even length list)
    while (even !== null && even.next !== null) {
      // OPERATION 1: Connect odd to next odd node
      // Current: odd → even → even.next
      // After: odd → even.next (skip the even node)
      odd.next = even.next;

      // OPERATION 2: Move odd pointer forward
      // Now odd points to the node we just connected
      odd = odd.next;

      // OPERATION 3: Connect even to next even node
      // Current: even → odd (new position) → odd.next
      // After: even → odd.next (skip the odd node)
      even.next = odd.next;

      // OPERATION 4: Move even pointer forward
      // Now even points to the node we just connected (or null)
      even = even.next;
    }

    // STEP 3: Connect odd chain to even chain
    // odd is now at the last odd node
    // evenHead is the first even node
    odd.next = evenHead;

    // STEP 4: Return result
    // head is still the first odd node
    return head;
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
   *    ↑
   *   head
   *
   * ═════════════════════════════════════════════════════════════════
   * SETUP
   * ═════════════════════════════════════════════════════════════════
   *
   * Code:
   *   let odd = head;           // node(1)
   *   let even = head.next;     // node(2)
   *   const evenHead = even;    // node(2) - SAVED!
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑            ↑
   *   odd        even
   *              evenHead
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 1
   * ═════════════════════════════════════════════════════════════════
   *
   * Loop Condition: even !== null && even.next !== null?
   *   even = node(2) ✓
   *   even.next = node(3) ✓
   *   Continue!
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 1: odd.next = even.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ...│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   odd
   *
   * Action: odd.next = even.next = node(3)
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 3 │ ...│
   * └───┴────┘   └───┴────┘
   *    ↑
   *   odd
   *
   * Explanation: We "skip" node(2) in the odd chain!
   * Node 1 now points directly to node 3
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 2: odd = odd.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: odd = node(1)
   * Action: odd = odd.next = node(3)
   * After: odd = node(3)
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 3 │ ...│
   * └───┴────┘   └───┴────┘
   *                 ↑
   *                odd
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 3: even.next = odd.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before:
   * even = node(2)
   * odd = node(3)
   * odd.next = node(4)
   *
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ...│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *  even
   *
   * Action: even.next = odd.next = node(4)
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 2 │ ●──┼──→│ 4 │ ...│
   * └───┴────┘   └───┴────┘
   *    ↑
   *  even
   *
   * Explanation: We "skip" node(3) in the even chain!
   * Node 2 now points directly to node 4
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 4: even = even.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: even = node(2)
   * Action: even = even.next = node(4)
   * After: even = node(4)
   *
   * Current State After Iteration 1:
   * ═════════════════════════════════════════════════════════════════
   *
   * Odd chain: 1 → 3 → (still connected to 4, will fix later)
   * Even chain: 2 → 4 → (still connected to 5, will fix later)
   *
   * Pointers:
   *   odd = node(3)
   *   even = node(4)
   *   evenHead = node(2) (unchanged)
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 2
   * ═════════════════════════════════════════════════════════════════
   *
   * Loop Condition: even !== null && even.next !== null?
   *   even = node(4) ✓
   *   even.next = node(5) ✓
   *   Continue!
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 1: odd.next = even.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before:
   * odd = node(3)
   * even = node(4)
   * even.next = node(5)
   *
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   odd
   *
   * Action: odd.next = even.next = node(5)
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐
   * │ 3 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘
   *    ↑
   *   odd
   *
   * Explanation: Node 3 now points to node 5 (skip node 4)
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 2: odd = odd.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: odd = node(3)
   * Action: odd = odd.next = node(5)
   * After: odd = node(5)
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 3: even.next = odd.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before:
   * even = node(4)
   * odd = node(5)
   * odd.next = null
   *
   * Action: even.next = odd.next = null
   *
   * After:
   * ┌───┬────┐
   * │ 4 │null│
   * └───┴────┘
   *    ↑
   *  even
   *
   * Explanation: Node 4's next is now null (end of even chain)
   *
   * ─────────────────────────────────────────────────────────────────
   * Step 4: even = even.next
   * ─────────────────────────────────────────────────────────────────
   *
   * Before: even = node(4)
   * Action: even = even.next = null
   * After: even = null
   *
   * ═════════════════════════════════════════════════════════════════
   * LOOP CHECK
   * ═════════════════════════════════════════════════════════════════
   *
   * Loop Condition: even !== null && even.next !== null?
   *   even = null ✗
   *   STOP! Exit loop
   *
   * Current State After Loop:
   * ═════════════════════════════════════════════════════════════════
   *
   * Odd chain: 1 → 3 → 5 → null ✅
   * Even chain: 2 → 4 → null ✅
   *
   * Pointers:
   *   odd = node(5) (last odd node)
   *   even = null
   *   evenHead = node(2) (first even node)
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL CONNECTION
   * ═════════════════════════════════════════════════════════════════
   *
   * Code:
   *   odd.next = evenHead;
   *
   * Before:
   * Odd: 1 → 3 → 5 → null
   * Even: 2 → 4 → null
   *
   * Action: Connect node(5).next to node(2)
   *
   * After:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │ ●──┼──→│ 2 │ ●──┼──→│ 4 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *  head (return this)
   *
   * ═════════════════════════════════════════════════════════════════
   * RETURN
   * ═════════════════════════════════════════════════════════════════
   *
   * Code:
   *   return head;
   *
   * Result: [1, 3, 5, 2, 4] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * ITERATION TABLE
   * ════════════════════════════════════════════════════════════════
   */
  /*
   * Input: [1, 2, 3, 4, 5]
   *
   * | Iteration | odd  | even | even.next | Action                | Odd Chain | Even Chain |
   * |-----------|------|------|-----------|------------------------|-----------|------------|
   * | Setup     | 1    | 2    | 3         | Initialize pointers    | 1→2→...   | 2→3→...    |
   * | 1         | 1    | 2    | 3         | odd.next = 3           | 1→3→...   | 2→3→...    |
   * | 1         | 3    | 2    | 3         | odd = 3                | 1→3→...   | 2→3→...    |
   * | 1         | 3    | 2    | 3         | even.next = 4          | 1→3→...   | 2→4→...    |
   * | 1         | 3    | 4    | 5         | even = 4               | 1→3→...   | 2→4→...    |
   * | 2         | 3    | 4    | 5         | odd.next = 5           | 1→3→5→... | 2→4→...    |
   * | 2         | 5    | 4    | 5         | odd = 5                | 1→3→5→... | 2→4→...    |
   * | 2         | 5    | 4    | null      | even.next = null       | 1→3→5→... | 2→4→null   |
   * | 2         | 5    | null | -         | even = null, exit loop | 1→3→5→... | 2→4→null   |
   * | Connect   | 5    | null | -         | odd.next = evenHead    | 1→3→5→2→4 | -          |
   *
   * Final Result: [1, 3, 5, 2, 4]
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY CHECK "even && even.next" IN LOOP?
   * ════════════════════════════════════════════════════════════════
   *
   * The loop condition is: while (even !== null && even.next !== null)
   *
   * Why both conditions?
   * ───────────────────
   *
   * Case 1: Odd Length List [1, 2, 3, 4, 5]
   * ────────────────────────────────────────
   *
   * After processing all pairs:
   *   odd = node(5) - last node
   *   even = null - because even.next was null in previous iteration
   *
   * Loop stops when: even === null ✓
   *
   * Case 2: Even Length List [1, 2, 3, 4]
   * ───────────────────────────────────────
   *
   * After processing all pairs:
   *   odd = node(3) - second last node
   *   even = node(4) - last node
   *   even.next = null - no more nodes
   *
   * Loop stops when: even.next === null ✓
   *
   * Why we need BOTH checks:
   * ────────────────────────
   *
   * - Check "even !== null": Handles odd length lists
   * - Check "even.next !== null": Handles even length lists
   *
   * If we only checked "even !== null":
   *   Problem: In even length lists, even points to last node
   *   We'd try to access even.next.next and get null pointer error!
   *
   * If we only checked "even.next !== null":
   *   Problem: In odd length lists, even is null
   *   We'd get null pointer error trying to access even.next!
   *
   * Both checks together = Safe for all cases! ✅
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
   * Handled at start: return null immediately
   */

  /**
   * EDGE CASE 2: Single node
   * Input: [1]
   *
   * Setup:
   *   odd = node(1)
   *   even = null (head.next is null)
   *   evenHead = null
   *
   * Loop condition: even !== null? NO! (even is null)
   * Skip loop
   *
   * Final connection:
   *   odd.next = evenHead = null
   *
   * Result: 1 → null ✅
   */

  /**
   * EDGE CASE 3: Two nodes
   * Input: [1, 2]
   *
   * Setup:
   *   odd = node(1)
   *   even = node(2)
   *   evenHead = node(2)
   *
   * Loop condition: even !== null? YES! even.next !== null? NO! (null)
   * Skip loop
   *
   * Final connection:
   *   odd.next = evenHead = node(2)
   *
   * Result: 1 → 2 → null ✅
   */

  /**
   * EDGE CASE 4: Three nodes
   * Input: [1, 2, 3]
   *
   * Setup: odd=1, even=2, evenHead=2
   *
   * Iteration 1:
   *   odd.next = 3, odd = 3
   *   even.next = null, even = null
   *
   * Loop ends (even is null)
   *
   * Final: 1 → 3 → 2 → null ✅
   */

  /**
   * EDGE CASE 5: Four nodes (even length)
   * Input: [1, 2, 3, 4]
   *
   * Setup: odd=1, even=2, evenHead=2
   *
   * Iteration 1:
   *   odd.next = 3, odd = 3
   *   even.next = 4, even = 4
   *
   * Loop check: even=4 ✓, even.next=null ✗
   * Loop ends
   *
   * Final: 1 → 3 → 2 → 4 → null ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMPARISON: Optimal vs Better (Dummy Nodes)
   * ════════════════════════════════════════════════════════════════
   *
   * | Aspect              | Optimal (This) | Better (Dummy) |
   * |---------------------|----------------|----------------|
   * | Space Complexity    | O(1) Pure ✅   | O(1) ✅        |
   * | Extra Nodes         | 0 ⭐⭐         | 2 dummies      |
   * | Code Complexity     | Medium         | Easy ✅        |
   * | Edge Cases          | Manual         | Automatic ✅   |
   * | Variables Needed    | 3 (odd,even,h) | 5 (2 dummy, 2 current, 1 temp) |
   * | Memory Efficiency   | Best ⭐⭐      | Good           |
   * | Interview Friendly  | Good           | Better ✅      |
   * | Understanding       | Harder         | Easier ✅      |
   *
   * When to use Optimal:
   * ────────────────────
   * - Memory is critical
   * - You're confident with pointers
   * - You want the "purest" solution
   * - Interview allows extra time for explanation
   *
   * When to use Better (Dummy):
   * ───────────────────────────
   * - Clarity is priority
   * - Time-constrained interview
   * - Want to avoid mistakes
   * - Demonstrating sentinel node pattern knowledge
   *
   * Verdict:
   * ────────
   * Both are O(1) space and interview-acceptable!
   * Optimal is more memory efficient.
   * Dummy is clearer and less error-prone.
   * Choose based on interview context and personal comfort!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMMON MISTAKES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * MISTAKE 1: Wrong loop condition
   *
   * ❌ WRONG:
   * while (odd && odd.next) { ... }
   *
   * Problem: We're rearranging based on even nodes!
   * If we check odd, we might miss the last even node
   *
   * ✅ CORRECT:
   * while (even && even.next) { ... }
   *
   * Reason: even determines when we're done
   */

  /**
   * MISTAKE 2: Not saving evenHead
   *
   * ❌ WRONG:
   * let odd = head;
   * let even = head.next;
   * // Forgot: const evenHead = even;
   *
   * ... rearrange nodes ...
   *
   * odd.next = even; // BUG! even has moved!
   *
   * Problem: even pointer moves during loop!
   * We lose reference to the first even node
   *
   * ✅ CORRECT:
   * const evenHead = even; // Save it!
   * ... rearrange ...
   * odd.next = evenHead; // Use saved reference
   */

  /**
   * MISTAKE 3: Wrong order of operations
   *
   * ❌ WRONG:
   * odd = odd.next;        // Move first
   * odd.next = even.next;  // Then connect - BUG!
   *
   * Problem: We moved odd first, so we're connecting wrong node!
   *
   * ✅ CORRECT:
   * odd.next = even.next;  // Connect first
   * odd = odd.next;        // Then move
   */

  /**
   * MISTAKE 4: Forgetting to connect chains
   *
   * ❌ WRONG:
   * while (even && even.next) {
   *   // rearrange nodes...
   * }
   * return head; // Forgot to connect!
   *
   * Problem: Odd and even chains are separate!
   * They're not connected together
   *
   * ✅ CORRECT:
   * while (even && even.next) { ... }
   * odd.next = evenHead; // Connect chains!
   * return head;
   */

  /**
   * MISTAKE 5: Checking only "even" in loop
   *
   * ❌ WRONG:
   * while (even) {
   *   odd.next = even.next; // Null pointer if even is last node!
   * }
   *
   * Problem: If even is the last node, even.next is null
   * We'd try to access even.next.next and crash!
   *
   * ✅ CORRECT:
   * while (even && even.next) {
   *   // Safe to access even.next now!
   * }
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Odd Even Linked List - OPTIMAL Solution ===\n');
    console.log('✅ Pure O(1) space - No dummy nodes! ⭐⭐\n');

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

    // Test 7: Four nodes (even length)
    console.log('Test 7: Four nodes [1,2,3,4]');
    const list7 = createList([1, 2, 3, 4]);
    const result7 = oddEvenList(list7);
    const output7 = listToArray(result7);
    console.log('Expected: [1,3,2,4]');
    console.log('Got:', output7);
    console.log('Test Pass:', arraysEqual(output7, [1, 3, 2, 4]));
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('💡 This is the MOST OPTIMAL solution');
    console.log('💡 Pure O(1) space - Zero extra nodes! ⭐⭐');
    console.log('💡 Best memory efficiency possible!');
  }
}

// Run the tests
OddEvenLinkedListOptimal.runTests();
