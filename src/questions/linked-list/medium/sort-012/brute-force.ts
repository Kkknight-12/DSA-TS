namespace SortList012BruteForce {
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
   * BRUTE FORCE APPROACH: Counting Method
   *
   * Main function to sort a linked list containing only 0s, 1s, and 2s
   *
   * @param head - Head of the linked list
   * @returns Head of the sorted linked list
   *
   * Algorithm:
   * 1. PASS 1: Count occurrences of 0s, 1s, and 2s
   * 2. PASS 2: Overwrite node values in sorted order
   *
   * Time Complexity: O(2n) = O(n)
   * Space Complexity: O(1)
   */
  function sortList(head: ListNode | null): ListNode | null {
    // Edge Case: Empty list or single node
    // WHY: Agar list empty hai ya sirf ek node hai, already sorted hai
    if (head === null || head.next === null) {
      return head;
    }

    // STEP 1: Initialize counters for 0s, 1s, and 2s
    // WHY: Hume track karna hai ki kitne 0s, 1s, aur 2s hain
    let count0 = 0; // Count of zeros
    let count1 = 0; // Count of ones
    let count2 = 0; // Count of twos

    // STEP 2: First Pass - Count all occurrences
    // WHY: Pehle count karenge, phir overwrite karenge
    let current: ListNode | null = head;

    // LOGIC: List ko traverse karo aur har value ko count karo
    while (current !== null) {
      if (current.val === 0) {
        count0++; // Found a 0
      } else if (current.val === 1) {
        count1++; // Found a 1
      } else if (current.val === 2) {
        count2++; // Found a 2
      }

      // Move to next node
      current = current.next;
    }

    // STEP 3: Second Pass - Overwrite values in sorted order
    // WHY: Ab hume list ko modify karna hai counts ke basis par
    current = head; // Reset current pointer to head

    // PHASE 1: Fill all 0s
    // LOGIC: Pehle count0 nodes ko 0 set kar do
    // EXAMPLE: Agar count0 = 2, toh pehle 2 nodes ko 0 bana do
    while (count0 > 0) {
      current!.val = 0; // Set current node value to 0
      current = current!.next; // Move to next node
      count0--; // Decrease count
    }

    // PHASE 2: Fill all 1s
    // LOGIC: Phir count1 nodes ko 1 set kar do
    // EXAMPLE: Agar count1 = 3, toh next 3 nodes ko 1 bana do
    while (count1 > 0) {
      current!.val = 1; // Set current node value to 1
      current = current!.next; // Move to next node
      count1--; // Decrease count
    }

    // PHASE 3: Fill all 2s
    // LOGIC: Last mein count2 nodes ko 2 set kar do
    // EXAMPLE: Agar count2 = 5, toh remaining nodes ko 2 bana do
    while (count2 > 0) {
      current!.val = 2; // Set current node value to 2
      current = current!.next; // Move to next node
      count2--; // Decrease count
    }

    // STEP 4: Return the head
    // WHY: List ab sorted hai, head return kar do
    return head;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Sort [1, 2, 2, 1, 0]
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │ ●──┼──→│ 0 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 1: Count Occurrences
   * ═════════════════════════════════════════════════════════════════
   *
   * Initialize: count0 = 0, count1 = 0, count2 = 0
   *
   * Iteration 1: current = node(1), val = 1
   *   Check: val === 1? YES → count1++
   *   Result: count0=0, count1=1, count2=0
   *
   * Iteration 2: current = node(2), val = 2
   *   Check: val === 2? YES → count2++
   *   Result: count0=0, count1=1, count2=1
   *
   * Iteration 3: current = node(2), val = 2
   *   Check: val === 2? YES → count2++
   *   Result: count0=0, count1=1, count2=2
   *
   * Iteration 4: current = node(1), val = 1
   *   Check: val === 1? YES → count1++
   *   Result: count0=0, count1=2, count2=2
   *
   * Iteration 5: current = node(0), val = 0
   *   Check: val === 0? YES → count0++
   *   Result: count0=1, count1=2, count2=2
   *
   * Iteration 6: current = null
   *   Loop Exit
   *
   * Final Counts:
   * ┌──────────────────────┐
   * │ count0 = 1           │
   * │ count1 = 2           │
   * │ count2 = 2           │
   * └──────────────────────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 2: Overwrite Values in Sorted Order
   * ═════════════════════════════════════════════════════════════════
   *
   * Reset: current = head (back to first node)
   *
   * ─────────────────────────────────────────────────────────────────
   * PHASE 1: Fill 0s (count0 = 1)
   * ─────────────────────────────────────────────────────────────────
   *
   * Loop: while (count0 > 0)
   *
   * Iteration 1:
   *   Check: count0 > 0? 1 > 0? YES
   *   Action: current.val = 0 (node 1 becomes 0)
   *   Move: current = current.next
   *   Decrement: count0-- (count0 = 0)
   *
   * Iteration 2:
   *   Check: count0 > 0? 0 > 0? NO
   *   Loop Exit
   *
   * After Phase 1:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 0 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │ ●──┼──→│ 0 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                 ↑
   *              current (at node 2)
   *
   * ─────────────────────────────────────────────────────────────────
   * PHASE 2: Fill 1s (count1 = 2)
   * ─────────────────────────────────────────────────────────────────
   *
   * Loop: while (count1 > 0)
   *
   * Iteration 1:
   *   Check: count1 > 0? 2 > 0? YES
   *   Action: current.val = 1 (node 2 becomes 1)
   *   Move: current = current.next
   *   Decrement: count1-- (count1 = 1)
   *
   * Iteration 2:
   *   Check: count1 > 0? 1 > 0? YES
   *   Action: current.val = 1 (node 2 becomes 1)
   *   Move: current = current.next
   *   Decrement: count1-- (count1 = 0)
   *
   * Iteration 3:
   *   Check: count1 > 0? 0 > 0? NO
   *   Loop Exit
   *
   * After Phase 2:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 0 │ ●──┼──→│ 1 │ ●──┼──→│ 1 │ ●──┼──→│ 1 │ ●──┼──→│ 0 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                            ↑
   *                                        current (at node 1)
   *
   * ─────────────────────────────────────────────────────────────────
   * PHASE 3: Fill 2s (count2 = 2)
   * ─────────────────────────────────────────────────────────────────
   *
   * Loop: while (count2 > 0)
   *
   * Iteration 1:
   *   Check: count2 > 0? 2 > 0? YES
   *   Action: current.val = 2 (node 1 becomes 2)
   *   Move: current = current.next
   *   Decrement: count2-- (count2 = 1)
   *
   * Iteration 2:
   *   Check: count2 > 0? 1 > 0? YES
   *   Action: current.val = 2 (node 0 becomes 2)
   *   Move: current = current.next
   *   Decrement: count2-- (count2 = 0)
   *
   * Iteration 3:
   *   Check: count2 > 0? 0 > 0? NO
   *   Loop Exit
   *
   * After Phase 3:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 0 │ ●──┼──→│ 1 │ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                                          ↑
   *                                                      current (at end)
   *
   * ═════════════════════════════════════════════════════════════════
   * RETURN: Head
   * ═════════════════════════════════════════════════════════════════
   *
   * Final List (Sorted):
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 0 │ ●──┼──→│ 1 │ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * Output: 0 → 1 → 1 → 2 → 2 ✅
   *
   * Summary:
   * - Pass 1: Counted 1 zero, 2 ones, 2 twos
   * - Pass 2: Overwritten in order: 0, then 1s, then 2s
   * - Total operations: 2n (n for counting + n for overwriting)
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
   * Pass 1: count1 = 1, count0 = 0, count2 = 0
   * Pass 2: Fill 1 one → value stays 1
   * Output: [1] ✅
   */

  /**
   * EDGE CASE 2: All same value
   * Input: [2, 2, 2, 2]
   *
   * Pass 1: count2 = 4, count0 = 0, count1 = 0
   * Pass 2: Fill 4 twos → all stay 2
   * Output: [2, 2, 2, 2] ✅
   */

  /**
   * EDGE CASE 3: Already sorted
   * Input: [0, 1, 2]
   *
   * Pass 1: count0 = 1, count1 = 1, count2 = 1
   * Pass 2: Overwrite in same order → no change
   * Output: [0, 1, 2] ✅
   */

  /**
   * EDGE CASE 4: Reverse sorted
   * Input: [2, 1, 0]
   *
   * Pass 1: count0 = 1, count1 = 1, count2 = 1
   * Pass 2: Overwrite → 0, 1, 2
   * Output: [0, 1, 2] ✅
   */

  /**
   * EDGE CASE 5: No zeros
   * Input: [1, 2, 1, 2]
   *
   * Pass 1: count0 = 0, count1 = 2, count2 = 2
   * Pass 2: Skip filling 0s, fill 1s then 2s
   * Output: [1, 1, 2, 2] ✅
   */

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper function to create a linked list from an array
   *
   * @param values - Array of values (0s, 1s, 2s)
   * @returns Head of the created linked list
   */
  function createList(values: number[]): ListNode | null {
    // Edge case: Empty array
    if (values.length === 0) {
      return null;
    }

    // Create head node
    const head = new ListNode(values[0]);
    let current = head;

    // Create remaining nodes
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
    console.log('🧪 Testing Sort List (0s, 1s, 2s) - BRUTE FORCE\n');
    console.log('Approach: Counting Method (2 passes)\n');
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

    // Test Case 3: Already sorted
    console.log('Test Case 3: Already sorted list');
    const test3 = createList([0, 0, 1, 1, 2, 2]);
    console.log('Input:  ', printList(test3));
    const result3 = sortList(test3);
    console.log('Output: ', printList(result3));
    console.log('Expected: 0 → 0 → 1 → 1 → 2 → 2');
    const arr3 = listToArray(result3);
    const expected3 = [0, 0, 1, 1, 2, 2];
    const pass3 = JSON.stringify(arr3) === JSON.stringify(expected3);
    console.log(pass3 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 4: Reverse sorted
    console.log('Test Case 4: Reverse sorted list');
    const test4 = createList([2, 2, 2, 1, 1, 0]);
    console.log('Input:  ', printList(test4));
    const result4 = sortList(test4);
    console.log('Output: ', printList(result4));
    console.log('Expected: 0 → 1 → 1 → 2 → 2 → 2');
    const arr4 = listToArray(result4);
    const expected4 = [0, 1, 1, 2, 2, 2];
    const pass4 = JSON.stringify(arr4) === JSON.stringify(expected4);
    console.log(pass4 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 5: Edge case - only one type
    console.log('Test Case 5: Only 2s (no 0s or 1s)');
    const test5 = createList([2, 2, 2, 2]);
    console.log('Input:  ', printList(test5));
    const result5 = sortList(test5);
    console.log('Output: ', printList(result5));
    console.log('Expected: 2 → 2 → 2 → 2');
    const arr5 = listToArray(result5);
    const expected5 = [2, 2, 2, 2];
    const pass5 = JSON.stringify(arr5) === JSON.stringify(expected5);
    console.log(pass5 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 6: Edge case - single node
    console.log('Test Case 6: Single node');
    const test6 = createList([1]);
    console.log('Input:  ', printList(test6));
    const result6 = sortList(test6);
    console.log('Output: ', printList(result6));
    console.log('Expected: 1');
    const arr6 = listToArray(result6);
    const expected6 = [1];
    const pass6 = JSON.stringify(arr6) === JSON.stringify(expected6);
    console.log(pass6 ? '✅ Pass\n' : '❌ Fail\n');

    // Test Case 7: All three values mixed
    console.log('Test Case 7: All three values equal count');
    const test7 = createList([1, 2, 0, 2, 1, 0]);
    console.log('Input:  ', printList(test7));
    const result7 = sortList(test7);
    console.log('Output: ', printList(result7));
    console.log('Expected: 0 → 0 → 1 → 1 → 2 → 2');
    const arr7 = listToArray(result7);
    const expected7 = [0, 0, 1, 1, 2, 2];
    const pass7 = JSON.stringify(arr7) === JSON.stringify(expected7);
    console.log(pass7 ? '✅ Pass\n' : '❌ Fail\n');

    console.log('═══════════════════════════════════════════════');
    console.log('All tests completed! ✨');
  }
}

// Run the tests
SortList012BruteForce.runTests();
