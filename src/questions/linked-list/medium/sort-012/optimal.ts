namespace SortList012Optimal {
  /**
   * ListNode class - Represents a single node in the linked list
   */
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  /**
   * OPTIMAL APPROACH: Three Pointer / Dummy Node Method
   *
   * Main function to sort a linked list containing only 0s, 1s, and 2s
   *
   * @param head - Head of the linked list
   * @returns Head of the sorted linked list
   *
   * Key Insight:
   * Instead of counting and overwriting, we build 3 separate chains
   * and then connect them together!
   *
   * Algorithm:
   * 1. Create 3 dummy nodes (zeroHead, oneHead, twoHead)
   * 2. Create 3 pointers (zero, one, two) pointing to respective dummies
   * 3. Traverse original list:
   *    - If node value is 0 → attach to zero chain
   *    - If node value is 1 → attach to one chain
   *    - If node value is 2 → attach to two chain
   * 4. Connect the 3 chains: zero → one → two
   * 5. Return zeroHead.next (skip dummy)
   *
   * Time Complexity: O(n) - Single pass
   * Space Complexity: O(1) - Only 6 pointers (3 dummies + 3 current)
   *
   * Advantages over Brute Force:
   * ✅ Single pass (not two passes)
   * ✅ Node values preserved (only pointers rearranged)
   * ✅ More elegant and interview-friendly
   */
  function sortList(head: ListNode | null): ListNode | null {
    // Edge Case: Empty list or single node
    // WHY: Agar list empty hai ya sirf ek node hai, already sorted hai
    if (head === null || head.next === null) {
      return head;
    }

    // STEP 1: Create 3 dummy nodes for 3 separate chains
    // WHY: Dummy nodes make it easy to build chains without special-casing first node
    const zeroHead = new ListNode(-1); // Dummy for 0s chain
    const oneHead = new ListNode(-1); // Dummy for 1s chain
    const twoHead = new ListNode(-1); // Dummy for 2s chain

    // STEP 2: Create 3 pointers to track current position in each chain
    // WHY: We'll attach new nodes at these positions
    let zero = zeroHead; // Points to last node in 0s chain
    let one = oneHead; // Points to last node in 1s chain
    let two = twoHead; // Points to last node in 2s chain

    // STEP 3: Traverse original list and distribute nodes to chains
    // WHY: Single pass to segregate nodes based on value
    let current: ListNode | null = head;

    while (current !== null) {
      // Save next node before we modify current.next
      // WHY: We'll be changing current.next, so save it first
      const nextNode: ListNode = current.next!;

      // Attach current node to appropriate chain based on its value
      if (current.val === 0) {
        // LOGIC: This node has value 0, add to zero chain
        zero.next = current; // Attach to zero chain
        zero = zero.next; // Move zero pointer forward
        // WHY: zero always points to last node in 0s chain
      } else if (current.val === 1) {
        // LOGIC: This node has value 1, add to one chain
        one.next = current; // Attach to one chain
        one = one.next; // Move one pointer forward
        // WHY: one always points to last node in 1s chain
      } else {
        // LOGIC: This node has value 2, add to two chain
        two.next = current; // Attach to two chain
        two = two.next; // Move two pointer forward
        // WHY: two always points to last node in 2s chain
      }

      // Move to next node in original list
      current = nextNode;
    }

    // STEP 4: Connect the 3 chains together
    // WHY: Now we have 3 separate sorted chains, need to merge them

    // End the two chain (last chain)
    // WHY: Prevent cycles - last node should point to null
    two.next = null;

    // Connect one chain to two chain
    // LOGIC: Last node of 1s → First node of 2s (skip dummy)
    one.next = twoHead.next;

    // Connect zero chain to one chain
    // LOGIC: Last node of 0s → First node of 1s (skip dummy)
    zero.next = oneHead.next;

    // STEP 5: Return the result
    // WHY: zeroHead is dummy, so return zeroHead.next (actual first node)
    // EDGE CASE: If no 0s exist, zeroHead.next will be oneHead.next, which is correct!
    return zeroHead.next;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Sort [1, 2, 0, 1, 2]
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 0 │ ●──┼──→│ 1 │ ●──┼──→│ 2 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 1-2: Create Dummy Nodes and Pointers
   * ═════════════════════════════════════════════════════════════════
   *
   * zeroHead → [-1|●→] → null    (zero points here)
   * oneHead  → [-1|●→] → null    (one points here)
   * twoHead  → [-1|●→] → null    (two points here)
   *
   * current → [1] (start of original list)
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 3: Traverse and Build Chains
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = [1]
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: current.val === 1? YES
   * Action: Attach to one chain
   *   one.next = current → attach [1] to one chain
   *   one = one.next     → move one pointer to [1]
   *
   * After Iteration 1:
   *   zeroHead → [-1|●→] → null
   *   oneHead  → [-1|●→] → [1|●→] → null
   *                        ↑
   *                       one (points here)
   *   twoHead  → [-1|●→] → null
   *
   *   current moves to next: [2]
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = [2]
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: current.val === 2? YES
   * Action: Attach to two chain
   *   two.next = current → attach [2] to two chain
   *   two = two.next     → move two pointer to [2]
   *
   * After Iteration 2:
   *   zeroHead → [-1|●→] → null
   *   oneHead  → [-1|●→] → [1|●→] → null
   *   twoHead  → [-1|●→] → [2|●→] → null
   *                        ↑
   *                       two (points here)
   *
   *   current moves to next: [0]
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = [0]
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: current.val === 0? YES
   * Action: Attach to zero chain
   *   zero.next = current → attach [0] to zero chain
   *   zero = zero.next    → move zero pointer to [0]
   *
   * After Iteration 3:
   *   zeroHead → [-1|●→] → [0|●→] → null
   *                        ↑
   *                       zero (points here)
   *   oneHead  → [-1|●→] → [1|●→] → null
   *   twoHead  → [-1|●→] → [2|●→] → null
   *
   *   current moves to next: [1]
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = [1]
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: current.val === 1? YES
   * Action: Attach to one chain
   *   one.next = current → attach [1] to one chain
   *   one = one.next     → move one pointer to [1]
   *
   * After Iteration 4:
   *   zeroHead → [-1|●→] → [0|●→] → null
   *   oneHead  → [-1|●→] → [1|●→] → [1|●→] → null
   *                                  ↑
   *                                 one (points here)
   *   twoHead  → [-1|●→] → [2|●→] → null
   *
   *   current moves to next: [2]
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: current = [2]
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: current.val === 2? YES
   * Action: Attach to two chain
   *   two.next = current → attach [2] to two chain
   *   two = two.next     → move two pointer to [2]
   *
   * After Iteration 5:
   *   zeroHead → [-1|●→] → [0|●→] → null
   *   oneHead  → [-1|●→] → [1|●→] → [1|●→] → null
   *   twoHead  → [-1|●→] → [2|●→] → [2|●→] → null
   *                                  ↑
   *                                 two (points here)
   *
   *   current moves to next: null
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 6: current = null
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: current !== null? NO
   * Loop Exit
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 4: Connect the 3 Chains
   * ═════════════════════════════════════════════════════════════════
   *
   * Current state (3 separate chains):
   *   zeroHead → [-1|●→] → [0|●→] → ???
   *                        ↑
   *                       zero
   *
   *   oneHead  → [-1|●→] → [1|●→] → [1|●→] → ???
   *                                  ↑
   *                                 one
   *
   *   twoHead  → [-1|●→] → [2|●→] → [2|●→] → ???
   *                                  ↑
   *                                 two
   *
   * ─────────────────────────────────────────────────────────────────
   * Connection Step 1: two.next = null
   * ─────────────────────────────────────────────────────────────────
   *
   * WHY: End the two chain to prevent cycles
   *
   *   twoHead  → [-1|●→] → [2|●→] → [2|●→] → null ✓
   *
   * ─────────────────────────────────────────────────────────────────
   * Connection Step 2: one.next = twoHead.next
   * ─────────────────────────────────────────────────────────────────
   *
   * WHY: Connect one chain to two chain (skip dummy)
   *
   *   oneHead  → [-1|●→] → [1|●→] → [1|●→] → [2|●→] → [2|●→] → null
   *                                  ↑
   *                                 one
   *                                          ↑
   *                                    Connected to first 2!
   *
   * ─────────────────────────────────────────────────────────────────
   * Connection Step 3: zero.next = oneHead.next
   * ─────────────────────────────────────────────────────────────────
   *
   * WHY: Connect zero chain to one chain (skip dummy)
   *
   *   zeroHead → [-1|●→] → [0|●→] → [1|●→] → [1|●→] → [2|●→] → [2|●→] → null
   *                        ↑
   *                       zero
   *                                 ↑
   *                           Connected to first 1!
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 5: Return zeroHead.next
   * ═════════════════════════════════════════════════════════════════
   *
   * Final Connected List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 0 │ ●──┼──→│ 1 │ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   return this (zeroHead.next)
   *
   * Output: 0 → 1 → 1 → 2 → 2 ✅
   *
   * Summary:
   * - Single pass: O(n) time
   * - 3 chains built simultaneously
   * - Connected together at the end
   * - Values preserved (only pointers rearranged)
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * EDGE CASE 1: No zeros (zero chain empty)
   * Input: [1, 2, 1, 2]
   *
   * After traversal:
   *   zeroHead → [-1|●→] → null (empty!)
   *   oneHead  → [-1|●→] → [1|●→] → [1|●→] → null
   *   twoHead  → [-1|●→] → [2|●→] → [2|●→] → null
   *
   * Connection:
   *   zero.next = oneHead.next → zeroHead → [-1|●→] → [1|●→] → ...
   *
   * Return: zeroHead.next = oneHead.next = [1|●→] → ... ✓
   * Output: 1 → 1 → 2 → 2 ✅
   *
   * Works! Empty chain is handled gracefully.
   */

  /**
   * EDGE CASE 2: No ones (one chain empty)
   * Input: [2, 0, 2, 0]
   *
   * After traversal:
   *   zeroHead → [-1|●→] → [0|●→] → [0|●→] → null
   *   oneHead  → [-1|●→] → null (empty!)
   *   twoHead  → [-1|●→] → [2|●→] → [2|●→] → null
   *
   * Connection:
   *   one.next = twoHead.next → oneHead → [-1|●→] → [2|●→] → ...
   *   zero.next = oneHead.next → zero → [0|●→] → [2|●→] → ...
   *
   * Output: 0 → 0 → 2 → 2 ✅
   *
   * Works! Skips empty one chain.
   */

  /**
   * EDGE CASE 3: No twos (two chain empty)
   * Input: [1, 0, 1, 0]
   *
   * After traversal:
   *   zeroHead → [-1|●→] → [0|●→] → [0|●→] → null
   *   oneHead  → [-1|●→] → [1|●→] → [1|●→] → null
   *   twoHead  → [-1|●→] → null (empty!)
   *
   * Connection:
   *   two.next = null → twoHead → [-1|●→] → null (already null)
   *   one.next = twoHead.next → one → [1|●→] → null ✓
   *
   * Output: 0 → 0 → 1 → 1 ✅
   *
   * Works! two chain is empty, one.next = null.
   */

  /**
   * EDGE CASE 4: Single node
   * Input: [1]
   *
   * After traversal:
   *   zeroHead → [-1|●→] → null
   *   oneHead  → [-1|●→] → [1|●→] → null
   *   twoHead  → [-1|●→] → null
   *
   * Connection:
   *   zero.next = oneHead.next → [1|●→] → null
   *
   * Output: 1 ✅
   */

  /**
   * EDGE CASE 5: All same value
   * Input: [2, 2, 2]
   *
   * After traversal:
   *   zeroHead → [-1|●→] → null
   *   oneHead  → [-1|●→] → null
   *   twoHead  → [-1|●→] → [2|●→] → [2|●→] → [2|●→] → null
   *
   * Connection:
   *   one.next = twoHead.next → oneHead → [-1|●→] → [2|●→] → ...
   *   zero.next = oneHead.next → zeroHead → [-1|●→] → [2|●→] → ...
   *
   * Output: 2 → 2 → 2 ✅
   */

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper function to create a linked list from an array
   *
   * @param values - Array of values (0s, 1s, 2s)
   * @returns Head of the created linked list
   */
  function createList(values: number[]): ListNode | null {
    if (values.length === 0) {
      return null;
    }

    const head = new ListNode(values[0]);
    let current = head;

    for (let i = 1; i < values.length; i++) {
      current.next = new ListNode(values[i]);
      current = current.next;
    }

    return head;
  }

  /**
   * Helper function to convert linked list to array for display
   *
   * @param head - Head of the linked list
   * @returns Array representation of the list
   */
  function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;

    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  /**
   * Helper function to print linked list
   *
   * @param head - Head of the linked list
   * @returns String representation of the list
   */
  function printList(head: ListNode | null): string {
    const values = listToArray(head);
    return values.join(' → ');
  }

  // ==================== TEST CASES ====================

  /**
   * Test function with multiple test cases
   */
  export function runTests(): void {
    console.log('🧪 Testing Sort List (0s, 1s, 2s) - OPTIMAL\n');
    console.log('Approach: Three Pointer / Dummy Node Method (1 pass)\n');
    console.log('═══════════════════════════════════════════════\n');

    // Test Case 1: Standard case with all three values
    console.log('Test Case 1: Mixed 0s, 1s, and 2s');
    const test1 = createList([1, 2, 2, 1, 2, 0, 2, 2]);
    console.log('Input:  ', printList(test1));
    const result1 = sortList(test1);
    console.log('Output: ', printList(result1));
    console.log('Expected: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2');
    const arr1 = listToArray(result1);
    const expected1 = [0, 1, 1, 2, 2, 2, 2, 2];
    const pass1 = JSON.stringify(arr1) === JSON.stringify(expected1);
    console.log(pass1 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 2: Smaller list
    console.log('Test Case 2: Smaller list');
    const test2 = createList([2, 2, 0, 1]);
    console.log('Input:  ', printList(test2));
    const result2 = sortList(test2);
    console.log('Output: ', printList(result2));
    console.log('Expected: 0 → 1 → 2 → 2');
    const arr2 = listToArray(result2);
    const expected2 = [0, 1, 2, 2];
    const pass2 = JSON.stringify(arr2) === JSON.stringify(expected2);
    console.log(pass2 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 3: No zeros
    console.log('Test Case 3: No zeros (empty zero chain)');
    const test3 = createList([1, 2, 1, 2]);
    console.log('Input:  ', printList(test3));
    const result3 = sortList(test3);
    console.log('Output: ', printList(result3));
    console.log('Expected: 1 → 1 → 2 → 2');
    const arr3 = listToArray(result3);
    const expected3 = [1, 1, 2, 2];
    const pass3 = JSON.stringify(arr3) === JSON.stringify(expected3);
    console.log(pass3 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 4: No ones
    console.log('Test Case 4: No ones (empty one chain)');
    const test4 = createList([2, 0, 2, 0]);
    console.log('Input:  ', printList(test4));
    const result4 = sortList(test4);
    console.log('Output: ', printList(result4));
    console.log('Expected: 0 → 0 → 2 → 2');
    const arr4 = listToArray(result4);
    const expected4 = [0, 0, 2, 2];
    const pass4 = JSON.stringify(arr4) === JSON.stringify(expected4);
    console.log(pass4 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 5: No twos
    console.log('Test Case 5: No twos (empty two chain)');
    const test5 = createList([1, 0, 1, 0]);
    console.log('Input:  ', printList(test5));
    const result5 = sortList(test5);
    console.log('Output: ', printList(result5));
    console.log('Expected: 0 → 0 → 1 → 1');
    const arr5 = listToArray(result5);
    const expected5 = [0, 0, 1, 1];
    const pass5 = JSON.stringify(arr5) === JSON.stringify(expected5);
    console.log(pass5 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 6: Edge case - only one type
    console.log('Test Case 6: Only 2s (no 0s or 1s)');
    const test6 = createList([2, 2, 2, 2]);
    console.log('Input:  ', printList(test6));
    const result6 = sortList(test6);
    console.log('Output: ', printList(result6));
    console.log('Expected: 2 → 2 → 2 → 2');
    const arr6 = listToArray(result6);
    const expected6 = [2, 2, 2, 2];
    const pass6 = JSON.stringify(arr6) === JSON.stringify(expected6);
    console.log(pass6 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 7: Edge case - single node
    console.log('Test Case 7: Single node');
    const test7 = createList([1]);
    console.log('Input:  ', printList(test7));
    const result7 = sortList(test7);
    console.log('Output: ', printList(result7));
    console.log('Expected: 1');
    const arr7 = listToArray(result7);
    const expected7 = [1];
    const pass7 = JSON.stringify(arr7) === JSON.stringify(expected7);
    console.log(pass7 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 8: Already sorted
    console.log('Test Case 8: Already sorted');
    const test8 = createList([0, 1, 2]);
    console.log('Input:  ', printList(test8));
    const result8 = sortList(test8);
    console.log('Output: ', printList(result8));
    console.log('Expected: 0 → 1 → 2');
    const arr8 = listToArray(result8);
    const expected8 = [0, 1, 2];
    const pass8 = JSON.stringify(arr8) === JSON.stringify(expected8);
    console.log(pass8 ? '✅ Pass\n' : '❌ Fail\n');

    console.log('═══════════════════════════════════════════════');
    console.log('All tests completed! ✨');
    console.log('\n💡 This solution uses SINGLE PASS');
    console.log('💡 Values are preserved (pointers rearranged)');
    console.log('💡 Handles all edge cases gracefully');
    console.log('💡 Interview-recommended approach! 🚀');
  }
}

// Run the tests
SortList012Optimal.runTests();