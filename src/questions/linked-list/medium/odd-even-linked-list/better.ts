/**
 * Odd Even Linked List - Better Approach (Dummy Nodes)
 *
 * Problem: Group all nodes at odd indices together followed by nodes at even indices.
 *
 * Approach: Use dummy nodes to build two separate lists while traversing
 *
 * Time Complexity: O(n) - single pass through list
 * Space Complexity: O(1) - only constant extra pointers (dummy nodes don't count as they're sentinels)
 *
 * Where n = number of nodes in linked list
 *
 * ✅ This approach SATISFIES the O(1) space constraint!
 * ✅ Cleaner than direct pointer manipulation (uses dummy nodes to avoid edge cases)
 */

namespace OddEvenLinkedListBetter {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Rearrange list using dummy nodes
   *
   * Key Insight:
   * Instead of storing in arrays, we build two SEPARATE linked lists
   * while traversing the original list, then connect them!
   *
   * Strategy:
   * 1. Create two dummy nodes (sentinels) for odd and even lists
   * 2. Traverse original list and attach nodes to appropriate list
   * 3. Connect odd list's tail to even list's head
   * 4. Return odd list's head (skip dummy)
   *
   * WHY Dummy Nodes?
   * - Eliminates edge cases (empty lists, single node)
   * - No need to track if list is empty
   * - Cleaner code, fewer conditionals
   */
  function oddEvenList(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list
    if (head === null) {
      return null;
    }

    // STEP 1: Create dummy nodes (sentinels)
    // WHY: Dummy nodes act as placeholder heads for our two lists
    // This eliminates the need to handle "empty list" edge cases
    const oddDummy = new ListNode(0); // Dummy for odd positions
    const evenDummy = new ListNode(0); // Dummy for even positions

    // STEP 2: Create current pointers for building lists
    // These will move as we add nodes to each list
    let oddCurrent = oddDummy; // Points to last node in odd list
    let evenCurrent = evenDummy; // Points to last node in even list

    // STEP 3: Traverse original list
    let current: ListNode | null = head;
    let index = 1; // 1-indexed (first node is position 1 = odd)

    // WHY 1-indexed: Makes code cleaner
    // Position 1 = odd, Position 2 = even, Position 3 = odd...

    while (current !== null) {
      // CHECK: Is this an odd position or even position?
      if (index % 2 === 1) {
        // ODD POSITION (1, 3, 5, 7...)
        // Add this node to odd list

        // Attach current node to odd list
        oddCurrent.next = current;

        // Move odd pointer forward
        oddCurrent = oddCurrent.next;
      } else {
        // EVEN POSITION (2, 4, 6, 8...)
        // Add this node to even list

        // Attach current node to even list
        evenCurrent.next = current;

        // Move even pointer forward
        evenCurrent = evenCurrent.next;
      }

      // Move to next node in original list
      current = current.next;

      // Increment position counter
      index++;
    }

    // STEP 4: Finalize the lists

    // IMPORTANT: Break the even list
    // WHY: Last even node might still point to an odd node from original list
    // We need to terminate the even list properly
    evenCurrent.next = null;

    // STEP 5: Connect odd list to even list
    // oddCurrent is at the last odd node
    // evenDummy.next is the head of even list (skip dummy)
    oddCurrent.next = evenDummy.next;

    // STEP 6: Return the result
    // oddDummy.next is the head of odd list (skip dummy)
    return oddDummy.next;
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
   * Create dummy nodes:
   *   oddDummy = node(0)  → Dummy for odd list
   *   evenDummy = node(0) → Dummy for even list
   *
   * Initialize pointers:
   *   oddCurrent = oddDummy
   *   evenCurrent = evenDummy
   *   current = head (node 1)
   *   index = 1
   *
   * Visual:
   * Odd List:  [dummy(0)]
   *                ↑
   *           oddCurrent
   *
   * Even List: [dummy(0)]
   *                ↑
   *           evenCurrent
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 1: current = node(1), index = 1
   * ═════════════════════════════════════════════════════════════════
   *
   * Check: index % 2 === 1? 1 % 2 === 1? YES! (ODD position)
   *
   * Action:
   *   oddCurrent.next = current → dummy(0).next = node(1)
   *   oddCurrent = oddCurrent.next → oddCurrent = node(1)
   *
   * Odd List State:
   * ┌───────┬────┐   ┌───┬────┐
   * │dummy 0│ ●──┼──→│ 1 │ ...│
   * └───────┴────┘   └───┴────┘
   *                     ↑
   *                 oddCurrent
   *
   * Even List: [dummy(0)] (unchanged)
   *
   * Move:
   *   current = node(2)
   *   index = 2
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 2: current = node(2), index = 2
   * ═════════════════════════════════════════════════════════════════
   *
   * Check: index % 2 === 1? 2 % 2 === 1? NO! (EVEN position)
   *
   * Action:
   *   evenCurrent.next = current → dummy(0).next = node(2)
   *   evenCurrent = evenCurrent.next → evenCurrent = node(2)
   *
   * Even List State:
   * ┌───────┬────┐   ┌───┬────┐
   * │dummy 0│ ●──┼──→│ 2 │ ...│
   * └───────┴────┘   └───┴────┘
   *                     ↑
   *                 evenCurrent
   *
   * Odd List: [dummy(0) → 1] (unchanged)
   *
   * Move:
   *   current = node(3)
   *   index = 3
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 3: current = node(3), index = 3
   * ═════════════════════════════════════════════════════════════════
   *
   * Check: index % 2 === 1? 3 % 2 === 1? YES! (ODD position)
   *
   * Action:
   *   oddCurrent.next = current → node(1).next = node(3)
   *   oddCurrent = oddCurrent.next → oddCurrent = node(3)
   *
   * Odd List State:
   * ┌───────┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy 0│ ●──┼──→│ 1 │ ●──┼──→│ 3 │ ...│
   * └───────┴────┘   └───┴────┘   └───┴────┘
   *                                   ↑
   *                               oddCurrent
   *
   * Even List: [dummy(0) → 2] (unchanged)
   *
   * Move:
   *   current = node(4)
   *   index = 4
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 4: current = node(4), index = 4
   * ═════════════════════════════════════════════════════════════════
   *
   * Check: index % 2 === 1? 4 % 2 === 1? NO! (EVEN position)
   *
   * Action:
   *   evenCurrent.next = current → node(2).next = node(4)
   *   evenCurrent = evenCurrent.next → evenCurrent = node(4)
   *
   * Even List State:
   * ┌───────┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy 0│ ●──┼──→│ 2 │ ●──┼──→│ 4 │ ...│
   * └───────┴────┘   └───┴────┘   └───┴────┘
   *                                   ↑
   *                               evenCurrent
   *
   * Odd List: [dummy(0) → 1 → 3] (unchanged)
   *
   * Move:
   *   current = node(5)
   *   index = 5
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 5: current = node(5), index = 5
   * ═════════════════════════════════════════════════════════════════
   *
   * Check: index % 2 === 1? 5 % 2 === 1? YES! (ODD position)
   *
   * Action:
   *   oddCurrent.next = current → node(3).next = node(5)
   *   oddCurrent = oddCurrent.next → oddCurrent = node(5)
   *
   * Odd List State:
   * ┌───────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy 0│ ●──┼──→│ 1 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │ ...│
   * └───────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                                 ↑
   *                                             oddCurrent
   *
   * Even List: [dummy(0) → 2 → 4] (unchanged)
   *
   * Move:
   *   current = null
   *   index = 6
   *
   * ═════════════════════════════════════════════════════════════════
   * Loop Check: current === null? YES! Loop ends
   * ═════════════════════════════════════════════════════════════════
   *
   * State before finalization:
   *
   * Odd List:  dummy → 1 → 3 → 5 → (still points to original next)
   * Even List: dummy → 2 → 4 → (still points to original next)
   *
   * ═════════════════════════════════════════════════════════════════
   * FINALIZATION
   * ═════════════════════════════════════════════════════════════════
   *
   * Step 1: evenCurrent.next = null
   * WHY: Terminate even list properly (node 4 might still point to node 5)
   *
   * Even List: dummy → 2 → 4 → null ✅
   *
   * Step 2: oddCurrent.next = evenDummy.next
   * WHY: Connect odd list to even list
   *
   * oddCurrent = node(5)
   * evenDummy.next = node(2)
   * node(5).next = node(2)
   *
   * Combined: dummy → 1 → 3 → 5 → 2 → 4 → null
   *
   * Step 3: Return oddDummy.next (skip dummy)
   * Return: node(1)
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │ ●──┼──→│ 2 │ ●──┼──→│ 4 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *  result
   *
   * Output: [1, 3, 5, 2, 4] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * ITERATION TABLE
   * ════════════════════════════════════════════════════════════════
   */
  /*
   * Input: [1, 2, 3, 4, 5]
   *
   * | Iteration | current | index | Odd/Even | Action              | Odd List        | Even List      |
   * |-----------|---------|-------|----------|---------------------|-----------------|----------------|
   * | Setup     | 1       | 1     | -        | Initialize dummies  | [dummy]         | [dummy]        |
   * | 1         | 1       | 1     | Odd      | Add to odd list     | [dummy→1]       | [dummy]        |
   * | 2         | 2       | 2     | Even     | Add to even list    | [dummy→1]       | [dummy→2]      |
   * | 3         | 3       | 3     | Odd      | Add to odd list     | [dummy→1→3]     | [dummy→2]      |
   * | 4         | 4       | 4     | Even     | Add to even list    | [dummy→1→3]     | [dummy→2→4]    |
   * | 5         | 5       | 5     | Odd      | Add to odd list     | [dummy→1→3→5]   | [dummy→2→4]    |
   * | End       | null    | 6     | -        | Terminate           | dummy→1→3→5     | dummy→2→4→null |
   * | Connect   | -       | -     | -        | odd.tail→even.head  | 1→3→5→2→4→null  | -              |
   *
   * Final Result: [1, 3, 5, 2, 4]
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY DUMMY NODES ARE POWERFUL
   * ════════════════════════════════════════════════════════════════
   *
   * Without Dummy Nodes (Complex):
   * ```typescript
   * let oddHead = null;
   * let oddTail = null;
   * let evenHead = null;
   * let evenTail = null;
   *
   * // Add first odd node
   * if (oddHead === null) {
   *   oddHead = current;
   *   oddTail = current;
   * } else {
   *   oddTail.next = current;
   *   oddTail = current;
   * }
   * // Lots of edge case handling!
   * ```
   *
   * With Dummy Nodes (Clean):
   * ```typescript
   * const oddDummy = new ListNode(0);
   * let oddCurrent = oddDummy;
   *
   * // Add any node - no edge cases!
   * oddCurrent.next = current;
   * oddCurrent = oddCurrent.next;
   * ```
   *
   * Benefits:
   * 1. No need to check if list is empty
   * 2. No special handling for first node
   * 3. Uniform logic for all nodes
   * 4. Cleaner, more readable code
   * 5. Fewer bugs!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY evenCurrent.next = null IS CRITICAL
   * ════════════════════════════════════════════════════════════════
   *
   * Consider: [1, 2, 3, 4, 5]
   *
   * After building lists:
   *   Odd: 1 → 3 → 5 → ?
   *   Even: 2 → 4 → ?
   *
   * Problem: Node 4 still has .next pointing to original node 5!
   *
   * Before evenCurrent.next = null:
   *   2 → 4 → 5 (WRONG! 5 is in odd list, creates confusion)
   *
   * After evenCurrent.next = null:
   *   2 → 4 → null ✅ (Clean termination)
   *
   * Then when we connect:
   *   1 → 3 → 5 → 2 → 4 → null ✅ (Correct!)
   *
   * Without this line, we'd have:
   *   1 → 3 → 5 → 2 → 4 → 5 → ... (CYCLE or wrong structure!)
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
   * Iteration 1:
   *   index=1 (odd) → add to odd list
   *   Odd: dummy → 1
   *   Even: dummy (empty)
   *
   * Finalization:
   *   evenCurrent.next = null (evenCurrent = dummy)
   *   oddCurrent.next = evenDummy.next = null
   *
   * Result: 1 → null ✅
   */

  /**
   * EDGE CASE 3: Two nodes
   * Input: [1, 2]
   *
   * Odd: dummy → 1
   * Even: dummy → 2
   *
   * After connection: 1 → 2 → null ✅
   */

  /**
   * EDGE CASE 4: Even length [1,2,3,4]
   *
   * Odd: dummy → 1 → 3
   * Even: dummy → 2 → 4
   *
   * Result: 1 → 3 → 2 → 4 → null ✅
   */

  /**
   * EDGE CASE 5: Odd length [1,2,3,4,5]
   *
   * Odd: dummy → 1 → 3 → 5
   * Even: dummy → 2 → 4
   *
   * Result: 1 → 3 → 5 → 2 → 4 → null ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * PROS AND CONS
   * ════════════════════════════════════════════════════════════════
   *
   * ✅ Advantages:
   * 1. O(1) space - satisfies constraint! ⭐
   * 2. Cleaner than direct pointer manipulation
   * 3. Dummy nodes eliminate edge cases
   * 4. Single pass through list
   * 5. Easy to understand and implement
   * 6. Less error-prone than optimal in-place solution
   * 7. Interview-friendly (shows knowledge of dummy node pattern)
   *
   * ❌ Disadvantages:
   * 1. Creates two extra dummy nodes (though they're constant space)
   * 2. Slightly more memory than pure in-place (but still O(1))
   * 3. Some might argue it's not "pure" O(1) due to dummies
   *
   * Comparison:
   * | Aspect           | Brute Force | Better (Dummy) | Optimal (In-place) |
   * |------------------|-------------|----------------|---------------------|
   * | Space            | O(n)        | O(1) ✅        | O(1) ✅             |
   * | Dummy Nodes      | No          | Yes            | No                  |
   * | Code Clarity     | Good        | Excellent ✅   | Medium              |
   * | Edge Case Handle | Manual      | Automatic ✅   | Manual              |
   * | Interview        | ❌ No       | ✅ Yes         | ✅ Yes              |
   *
   * This approach is often PREFERRED in interviews because:
   * - Still O(1) space (dummies are constant)
   * - Much cleaner code
   * - Shows understanding of sentinel nodes pattern
   * - Easier to explain without mistakes
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMMON MISTAKES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * MISTAKE 1: Not terminating even list
   *
   * ❌ WRONG:
   * oddCurrent.next = evenDummy.next;
   * return oddDummy.next;
   * // Forgot: evenCurrent.next = null
   *
   * Problem: Even list's last node still points to original next!
   * Creates cycle or wrong structure
   *
   * ✅ CORRECT:
   * evenCurrent.next = null;  // Terminate first!
   * oddCurrent.next = evenDummy.next;
   */

  /**
   * MISTAKE 2: Returning wrong head
   *
   * ❌ WRONG:
   * return oddDummy;  // Returns dummy node!
   *
   * Problem: Dummy node has value 0 (or undefined)
   *
   * ✅ CORRECT:
   * return oddDummy.next;  // Skip dummy, return actual head
   */

  /**
   * MISTAKE 3: Using 0-indexing instead of 1-indexing
   *
   * ❌ CONFUSING:
   * let index = 0;
   * if (index % 2 === 0) {  // 0 is "even" but represents odd position!
   *   oddCurrent.next = current;
   * }
   *
   * ✅ CLEARER:
   * let index = 1;
   * if (index % 2 === 1) {  // 1 is odd and represents odd position!
   *   oddCurrent.next = current;
   * }
   */

  /**
   * MISTAKE 4: Not moving current pointers
   *
   * ❌ WRONG:
   * oddCurrent.next = current;
   * // Forgot: oddCurrent = oddCurrent.next
   *
   * Problem: oddCurrent stays at dummy, keeps overwriting!
   *
   * ✅ CORRECT:
   * oddCurrent.next = current;
   * oddCurrent = oddCurrent.next;  // MOVE IT!
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log(
      '=== Odd Even Linked List - Better Approach (Dummy Nodes) ===\n'
    );
    console.log('✅ This solution uses O(1) space - Constraint satisfied!\n');

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
    console.log('💡 This approach uses dummy nodes for cleaner code');
    console.log('💡 O(1) space complexity - Interview acceptable! ⭐');
  }
}

/**
 * ════════════════════════════════════════════════════════════════
 * COMMON DOUBT: How Does oddDummy.next Return All Nodes?
 * ════════════════════════════════════════════════════════════════
 *
 * The Confusion:
 * --------------
 * We create a reference:
 *   let oddCurrent = oddDummy;
 *
 * Then in the loop we keep moving it:
 *   oddCurrent = oddCurrent.next;
 *
 * So doesn't this "remove" old nodes?
 * How come oddDummy.next still has all the nodes?
 *
 * The Answer:
 * -----------
 * In JavaScript, objects are stored by REFERENCE, not by value!
 *
 * When you do: let oddCurrent = oddDummy
 * You're NOT copying the object.
 * You're creating a POINTER that points to the SAME object!
 *
 * ════════════════════════════════════════════════════════════════
 * EXPLANATION WITH MEMORY DIAGRAMS
 * ════════════════════════════════════════════════════════════════
 *
 * Let's trace through with [1, 2, 3] where we take odd positions [1, 3]:
 *
 * ─────────────────────────────────────────────────────────────────
 * SETUP:
 * ─────────────────────────────────────────────────────────────────
 *
 * Code:
 *   const oddDummy = new ListNode(0);
 *   let oddCurrent = oddDummy;
 *
 * Memory State:
 *
 *   Variables              Heap Memory (Objects)
 *   ─────────              ────────────────────
 *
 *   oddDummy ──────┐
 *                   ├────→ { val: 0, next: null }
 *   oddCurrent ────┘
 *
 * Both variables point to THE SAME OBJECT in memory!
 * There's only ONE object, not two copies.
 *
 * ─────────────────────────────────────────────────────────────────
 * ITERATION 1: Processing node(1) - Odd position
 * ─────────────────────────────────────────────────────────────────
 *
 * Code:
 *   oddCurrent.next = current;  // current is node(1)
 *
 * Memory State AFTER this line:
 *
 *   Variables              Heap Memory (Objects)
 *   ─────────              ────────────────────
 *
 *   oddDummy ──────┐                              ┌─ { val: 1, next: null }
 *                   ├────→ { val: 0, next: ●─ } ──┘
 *   oddCurrent ────┘
 *
 * Key Point: We MODIFIED the object that both point to!
 * The dummy object now has its .next pointing to node(1)!
 *
 * Code:
 *   oddCurrent = oddCurrent.next;  // Move pointer
 *
 * Memory State AFTER this line:
 *
 *   Variables              Heap Memory (Objects)
 *   ─────────              ────────────────────
 *
 *   oddDummy ──────────→ { val: 0, next: ●─ } ──→ { val: 1, next: null }
 *                                          │                      ↑
 *                                          └────────────────────┘
 *                                                                 │
 *   oddCurrent ───────────────────────────────────────────────┘
 *
 * Key Point: oddCurrent MOVED to point to node(1)
 * But oddDummy STILL points to the dummy node!
 * The CHAIN is preserved through the .next property!
 *
 * ─────────────────────────────────────────────────────────────────
 * ITERATION 3: Processing node(3) - Odd position
 * ─────────────────────────────────────────────────────────────────
 *
 * Code:
 *   oddCurrent.next = current;  // current is node(3)
 *
 * Memory State AFTER this line:
 *
 *   Variables              Heap Memory (Objects)
 *   ─────────             ────────────────────
 *
 *                                                                   ┌─ { val: 3, next: null }
 *                                                                   │
 *   oddDummy ──────────→ { val: 0, next: ●─ } ──→ { val: 1, next: ●─ }
 *                                                              ↑
 *   oddCurrent ────────────────────────────────────────────┘
 *
 * Key Point: We used oddCurrent to modify node(1)'s .next property!
 * Now the chain is: dummy → 1 → 3
 *
 * Code:
 *   oddCurrent = oddCurrent.next;  // Move pointer
 *
 * Memory State AFTER this line:
 *
 *   Variables              Heap Memory (Objects)
 *   ─────────              ────────────────────
 *
 *   oddDummy ──────────→ { val: 0, next: ●─ } ──→ { val: 1, next: ●─ } ──→ { val: 3, next: null }
 *                                                                                ↑
 *   oddCurrent ─────────────────────────────────────────────────────────────────┘
 *
 * ─────────────────────────────────────────────────────────────────
 * FINAL RETURN:
 * ─────────────────────────────────────────────────────────────────
 *
 * Code:
 *   return oddDummy.next;
 *
 * What happens:
 *   oddDummy points to: { val: 0, next: ●─ }
 *                                      │
 *   oddDummy.next follows pointer: ───┘
 *   Returns: { val: 1, next: ●─ } ──→ { val: 3, next: null }
 *
 * We get the ENTIRE CHAIN! [1 → 3]
 *
 * Why? Because the chain exists through .next PROPERTIES of the objects,
 * not through the oddCurrent VARIABLE!
 *
 * ════════════════════════════════════════════════════════════════
 * SIMPLE JAVASCRIPT OBJECT EXAMPLE
 * ════════════════════════════════════════════════════════════════
 *
 * Let's understand this with plain JavaScript objects:
 */

function demonstrateReferences() {
  console.log('\n=== Understanding References vs Objects ===\n');

  // Type definitions for demonstration
  type PersonNode = {
    name: string;
    next: PersonNode | null;
  };

  type NumberNode = {
    val: number;
    next: NumberNode | null;
  };

  type StringNode = {
    val: string;
    next: StringNode | null;
  };

  // Example 1: Reference vs Copy
  console.log('--- Example 1: Creating References ---');

  const person: PersonNode = { name: 'Alice', next: null };
  const pointer1 = person; // Reference, not copy!
  const pointer2 = person; // Another reference to SAME object

  console.log('Initial:');
  console.log('person:', person); // { name: 'Alice', next: null }
  console.log('pointer1:', pointer1); // { name: 'Alice', next: null }
  console.log('pointer2:', pointer2); // { name: 'Alice', next: null }

  // Modify through pointer1
  pointer1.next = { name: 'Bob', next: null };

  console.log('\nAfter modifying pointer1.next:');
  console.log('person:', person); // { name: 'Alice', next: { name: 'Bob', ... } }
  console.log('pointer1:', pointer1); // { name: 'Alice', next: { name: 'Bob', ... } }
  console.log('pointer2:', pointer2); // { name: 'Alice', next: { name: 'Bob', ... } }

  console.log(
    '\n✅ All three show the change! They point to the SAME object!\n'
  );

  // Example 2: Building a Chain (Like our algorithm)
  console.log('--- Example 2: Building a Chain ---');

  const head: NumberNode = { val: 0, next: null }; // Dummy
  let current: NumberNode = head; // Reference to head

  console.log('Setup: head and current both point to:', head);

  // Add first node
  current.next = { val: 1, next: null };
  console.log('\nAfter adding node 1:');
  console.log('head:', head); // { val: 0, next: { val: 1, next: null } }

  // Move current
  current = current.next;
  console.log('After moving current:');
  console.log('current now points to:', current); // { val: 1, next: null }
  console.log('head STILL points to:', head); // { val: 0, next: { val: 1, next: null } }

  // Add second node
  current.next = { val: 2, next: null };
  console.log('\nAfter adding node 2:');
  console.log('head:', head); // { val: 0, next: { val: 1, next: { val: 2, next: null } } }

  // Move current again
  current = current.next;
  console.log('After moving current:');
  console.log('current now points to:', current); // { val: 2, next: null }
  console.log('head STILL has full chain:', head); // { val: 0, next: { val: 1, next: { val: 2, next: null } } }

  console.log('\n✅ The chain is preserved! head.next gives us:', head.next);

  // Example 3: The Key Insight
  console.log("\n--- Example 3: Why Moving Pointer Doesn't Break Chain ---");

  const chainStart: StringNode = { val: 'A', next: null };
  let builder: StringNode = chainStart;

  // Build chain: A → B → C
  builder.next = { val: 'B', next: null };
  builder = builder.next; // Move

  builder.next = { val: 'C', next: null };
  builder = builder.next; // Move

  console.log('Builder now points to:', builder); // { val: 'C', next: null }
  console.log('But chainStart has full chain:', chainStart);
  // { val: 'A', next: { val: 'B', next: { val: 'C', next: null } } }

  console.log('\n✅ Moving "builder" only moved the VARIABLE!');
  console.log('✅ The OBJECTS and their .next connections stayed intact!\n');
}

/**
 * ════════════════════════════════════════════════════════════════
 * KEY TAKEAWAYS
 * ════════════════════════════════════════════════════════════════
 *
 * 1. Variables store REFERENCES (memory addresses), not objects themselves
 *
 * 2. When you do: let x = object;
 *    x is a POINTER to the object, not a copy
 *
 * 3. Multiple variables can point to the SAME object:
 *    const obj = { a: 1 };
 *    const ref1 = obj;
 *    const ref2 = obj;
 *    // All three point to the same object!
 *
 * 4. Modifying through any reference modifies the SAME object:
 *    ref1.a = 2;
 *    console.log(obj.a); // 2 (changed!)
 *    console.log(ref2.a); // 2 (changed!)
 *
 * 5. Moving a variable (x = something_else) only changes what that
 *    variable points to. It doesn't affect:
 *    - The object it was pointing to
 *    - Other variables pointing to that object
 *    - The .next chain built through object properties
 *
 * 6. In our algorithm:
 *    oddCurrent = oddCurrent.next;
 *    ↑ This moves the VARIABLE
 *    ↑ Doesn't affect the CHAIN built through .next properties
 *    ↑ oddDummy still points to start of chain!
 *
 * 7. The chain exists in the OBJECTS (through .next properties),
 *    not in the VARIABLES!
 *
 * ════════════════════════════════════════════════════════════════
 * ANALOGY: People and Houses
 * ════════════════════════════════════════════════════════════════
 *
 * Objects = Houses (have addresses)
 * Variables = People (know the addresses)
 * .next = Door to next house
 *
 * Scenario:
 *   const house1 = new House(); // Build a house
 *   let person = house1;        // Person knows house1's address
 *
 * Person enters house1 and builds a door to house2:
 *   person.next = new House(); // Add door to house2
 *
 * Person walks through the door:
 *   person = person.next; // Person now at house2
 *
 * Question: Does house1 still have the door to house2?
 * Answer: YES! The door is part of HOUSE1, not the PERSON!
 *
 * Even though the person moved to house2, house1 still has the door.
 * Similarly, even though oddCurrent moved, the .next chain remains!
 *
 * ════════════════════════════════════════════════════════════════
 * VISUALIZING MEMORY
 * ════════════════════════════════════════════════════════════════
 *
 * Think of memory as a street of houses:
 *
 * Memory Address    Object Contents
 * ──────────────    ───────────────
 * 0x1000      →     { val: 0, next: 0x2000 }  ← oddDummy points here
 * 0x2000      →     { val: 1, next: 0x3000 }
 * 0x3000      →     { val: 3, next: 0x4000 }
 * 0x4000      →     { val: 5, next: null }     ← oddCurrent points here
 *
 * oddDummy = 0x1000
 * oddCurrent = 0x4000
 *
 * When we return oddDummy.next:
 * 1. Go to address 0x1000 (oddDummy)
 * 2. Read its .next property: 0x2000
 * 3. That gives us the chain starting at 0x2000!
 *
 * The chain is intact because the .next properties at each address
 * still point to the next address in the chain!
 *
 * Moving oddCurrent to 0x4000 didn't change the .next properties
 * at 0x1000, 0x2000, or 0x3000!
 */

// Uncomment to run the demonstration:
// demonstrateReferences();

// Run the tests
OddEvenLinkedListBetter.runTests();