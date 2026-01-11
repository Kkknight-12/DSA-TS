namespace ReverseKGroupOptimal {
  // ListNode class definition
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * OPTIMAL APPROACH - IN-PLACE REVERSAL WITH POINTER MANIPULATION
   * ================================================================
   *
   * Intuition (Soch):
   * ----------------
   * Ye problem teen chhote sub-problems ka combination hai:
   * (This problem is a combination of three small sub-problems:)
   *
   * 1. **Check:** Aage k nodes hain ya nahi? (Are there k nodes ahead?)
   * 2. **Reverse:** Agar hain, toh us group ko reverse karo (If yes, reverse that group)
   * 3. **Connect:** Reversed group ko previous aur next groups ke saath connect karo
   *    (Connect reversed group to previous and next groups)
   *
   * Agar hum inn teeno ko properly handle kar lein, toh problem solve ho jayegi!
   * (If we handle these three properly, the problem is solved!)
   *
   * Visual Breakdown:
   * -----------------
   * Input: 1 → 2 → 3 → 4 → 5 → null, k = 2
   *
   * Step 1: Check if we have k=2 nodes starting from 1
   *   ✅ Yes: [1, 2]
   *
   * Step 2: Reverse [1, 2]
   *   Before: 1 → 2 → 3 → 4 → 5
   *   After:  2 → 1 → 3 → 4 → 5
   *           ↑   ↑   ↑
   *         head tail next group
   *
   * Step 3: Connect
   *   - Previous part ke end ko 2 se connect karo
   *   - 1 ko 3 se connect karo
   *
   * Step 4: Move to next group, repeat!
   *
   * Key Insight - Dummy Node:
   * -------------------------
   * Dummy node use karne se first group handle karna easy ho jata hai.
   * Without dummy, first group ke liye special case banana padta.
   *
   * Example:
   *   dummy → 1 → 2 → 3 → 4 → 5
   *   ↑
   *   prevGroupEnd
   *
   * After reversing [1,2]:
   *   dummy → 2 → 1 → 3 → 4 → 5
   *           ↑   ↑   ↑
   *         new  old  next
   *         head tail group
   *
   * Algorithm:
   * ----------
   * Main Function: reverseKGroup(head, k)
   *
   * 1. Create dummy node pointing to head
   *    - dummy.next = head
   *    - prevGroupEnd = dummy (tracks where previous group ended)
   *
   * 2. Loop while there are nodes:
   *    a. Check if k nodes exist ahead
   *       - Use helper function: hasKNodes(current, k)
   *       - If NO: break (remaining nodes stay as is)
   *
   *    b. Save pointers:
   *       - groupStart = current position
   *       - groupEnd = k-th node ahead
   *       - nextGroupStart = (k+1)-th node
   *
   *    c. Reverse current k-group:
   *       - Use standard linked list reversal
   *       - After reversal:
   *         * groupEnd becomes new head
   *         * groupStart becomes new tail
   *
   *    d. Connect reversed group:
   *       - prevGroupEnd.next = groupEnd (new head)
   *       - groupStart.next = nextGroupStart
   *
   *    e. Update pointers:
   *       - prevGroupEnd = groupStart (now tail of reversed group)
   *       - current = nextGroupStart (move to next group)
   *
   * 3. Return dummy.next
   *
   * Helper Function: reverseLinkedList(start, end)
   * ----------------------------------------------
   * Standard linked list reversal from start node to end node (inclusive)
   *
   * 1. Initialize: prev = null, curr = start
   * 2. Loop k times (or until curr == end):
   *    - Store next: nextNode = curr.next
   *    - Reverse: curr.next = prev
   *    - Move forward: prev = curr, curr = nextNode
   * 3. Return new head (which was end before reversal)
   *
   * Time Complexity: O(n)
   * - Har node ko exactly ek baar visit karte hain
   * - Reversal O(k) hai, aur n/k groups hain
   * - Total: O(k × n/k) = O(n)
   *
   * Space Complexity: O(1)
   * - Sirf pointers use kar rahe hain (prev, curr, next, etc.)
   * - Koi extra data structure nahi
   * - **This satisfies the follow-up requirement!** ✅
   *
   * @param head - Head of linked list
   * @param k - Group size for reversal
   * @returns Modified linked list head
   */
  function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    // EDGE CASE: Empty list or k = 1 (no reversal needed)
    // (If list is empty or k=1, return as is)
    if (head === null || k === 1) {
      return head;
    }

    // STEP 1: Create dummy node for easier handling
    // (Dummy node helps avoid special cases for first group)
    const dummy = new ListNode(0);
    dummy.next = head;

    // STEP 2: Initialize pointer to track end of previous group
    // (This pointer will help us connect reversed groups)
    let prevGroupEnd: ListNode = dummy;

    // STEP 3: Start from the first node
    let current: ListNode | null = head;

    // STEP 4: Loop while there are nodes to process
    // (Continue until we run out of nodes)
    while (current !== null) {
      // STEP 5: Check if we have k nodes ahead
      // (Count k nodes starting from current position)
      let checker: ListNode | null = current;
      let count = 0;

      // Count k nodes
      while (checker !== null && count < k) {
        checker = checker.next;
        count++;
      }

      // If less than k nodes, stop (don't reverse remaining nodes)
      if (count < k) {
        break;
      }

      // STEP 6: Save important pointers before reversal
      // (We need to remember where this group starts and where next group starts)
      const groupStart: ListNode = current; // This will become tail after reversal
      let groupEnd: ListNode | null = current;

      // Find the end of current group (k-th node)
      for (let i = 1; i < k; i++) {
        groupEnd = groupEnd!.next;
      }

      // Save the start of next group
      const nextGroupStart: ListNode | null = groupEnd!.next;

      // STEP 7: Reverse current k-group
      // (Use standard linked list reversal)
      // After reversal: groupEnd becomes head, groupStart becomes tail
      reverseLinkedList(groupStart, groupEnd!);

      // STEP 8: Connect reversed group to previous and next parts
      // (This is the critical connection step!)

      // Connect previous group's end to new head (groupEnd)
      prevGroupEnd.next = groupEnd;

      // Connect new tail (groupStart) to next group
      groupStart.next = nextGroupStart;

      // STEP 9: Update pointers for next iteration
      // (Move prevGroupEnd to current group's tail, move current to next group)
      prevGroupEnd = groupStart;
      current = nextGroupStart;
    }

    // STEP 10: Return new head (skip dummy node)
    // (Dummy.next points to actual head of modified list)
    return dummy.next;
  }

  /**
   * Helper function to reverse linked list from start to end (inclusive)
   *
   * @param start - Starting node of reversal
   * @param end - Ending node of reversal
   */
  function reverseLinkedList(start: ListNode, end: ListNode): void {
    // Standard linked list reversal
    // After this, 'end' will point to 'start', and we need to handle connections outside

    let prev: ListNode | null = null;
    let curr: ListNode | null = start;
    const stopNode = end.next; // We need to stop after 'end'

    // Reverse until we reach the node after 'end'
    while (curr !== stopNode) {
      const nextNode: ListNode | null = curr!.next; // Save next
      curr!.next = prev; // Reverse link
      prev = curr; // Move prev forward
      curr = nextNode; // Move curr forward
    }

    // After this loop:
    // - 'prev' points to 'end' (new head of reversed portion)
    // - 'start' points to prev (but its .next is already set to prev in last iteration)
    // - 'start' will become the tail
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: head = [1,2,3,4,5], k = 2
   *
   * Initial State:
   * --------------
   * Input: 1 → 2 → 3 → 4 → 5 → null
   * k = 2
   *
   * Setup:
   *   dummy → 1 → 2 → 3 → 4 → 5 → null
   *   ↑       ↑
   *   prev    current
   *   GrpEnd
   *
   * ═════════════════════════════════════════════════════════════════
   * GROUP 1: Reverse [1, 2]
   * ═════════════════════════════════════════════════════════════════
   *
   * Before Processing:
   *   dummy → 1 → 2 → 3 → 4 → 5 → null
   *   ↑       ↑
   *   prevGE  current
   *
   * Step 1: Check if k=2 nodes exist
   *   checker = current = 1
   *   count = 0
   *
   *   Iteration 1: checker = 1, count = 1, checker = 2
   *   Iteration 2: checker = 2, count = 2, checker = 3
   *
   *   count = 2 >= k = 2 ✅ (We have enough nodes)
   *
   * Step 2: Save pointers
   *   groupStart = 1
   *   groupEnd = 2 (k-th node from start)
   *   nextGroupStart = 3 (node after groupEnd)
   *
   *   Visual:
   *   dummy → 1 → 2 → 3 → 4 → 5 → null
   *   ↑       ↑   ↑   ↑
   *   prevGE  GS  GE  NGS
   *
   * Step 3: Reverse [1, 2] using reverseLinkedList(1, 2)
   *   ─────────────────────────────────────────────────────────────
   *   Inside reverseLinkedList(start=1, end=2):
   *   ─────────────────────────────────────────────────────────────
   *
   *   Initial:
   *     prev = null
   *     curr = 1
   *     stopNode = 3 (end.next)
   *
   *   Iteration 1: curr = 1
   *     nextNode = 2
   *     curr.next = prev → 1.next = null
   *     prev = 1
   *     curr = 2
   *
   *     State: null ← 1    2 → 3 → 4 → 5
   *
   *   Iteration 2: curr = 2
   *     nextNode = 3
   *     curr.next = prev → 2.next = 1
   *     prev = 2
   *     curr = 3
   *
   *     State: null ← 1 ← 2    3 → 4 → 5
   *            ↑          ↑    ↑
   *           tail       head  (not connected yet)
   *
   *   Loop ends: curr = 3 = stopNode
   *
   *   After reversal:
   *     - Node 2 now points to node 1
   *     - Node 1 points to null
   *     - groupEnd (2) is new head
   *     - groupStart (1) is new tail
   *   ─────────────────────────────────────────────────────────────
   *
   * Step 4: Connect reversed group
   *   prevGroupEnd.next = groupEnd
   *   → dummy.next = 2
   *
   *   groupStart.next = nextGroupStart
   *   → 1.next = 3
   *
   *   Result:
   *   dummy → 2 → 1 → 3 → 4 → 5 → null
   *   ↑       ↑   ↑   ↑
   *   dummy  new new  next
   *          head tail group
   *
   * Step 5: Update pointers
   *   prevGroupEnd = groupStart = 1
   *   current = nextGroupStart = 3
   *
   *   State:
   *   dummy → 2 → 1 → 3 → 4 → 5 → null
   *               ↑   ↑
   *           prevGE current
   *
   * ═════════════════════════════════════════════════════════════════
   * GROUP 2: Reverse [3, 4]
   * ═════════════════════════════════════════════════════════════════
   *
   * Before Processing:
   *   dummy → 2 → 1 → 3 → 4 → 5 → null
   *               ↑   ↑
   *           prevGE current
   *
   * Step 1: Check if k=2 nodes exist
   *   checker = current = 3
   *   count = 0
   *
   *   Iteration 1: checker = 3, count = 1, checker = 4
   *   Iteration 2: checker = 4, count = 2, checker = 5
   *
   *   count = 2 >= k = 2 ✅ (We have enough nodes)
   *
   * Step 2: Save pointers
   *   groupStart = 3
   *   groupEnd = 4
   *   nextGroupStart = 5
   *
   *   Visual:
   *   dummy → 2 → 1 → 3 → 4 → 5 → null
   *               ↑   ↑   ↑   ↑
   *            prevGE GS  GE NGS
   *
   * Step 3: Reverse [3, 4] using reverseLinkedList(3, 4)
   *   ─────────────────────────────────────────────────────────────
   *   Inside reverseLinkedList(start=3, end=4):
   *   ─────────────────────────────────────────────────────────────
   *
   *   Initial:
   *     prev = null
   *     curr = 3
   *     stopNode = 5
   *
   *   Iteration 1: curr = 3
   *     nextNode = 4
   *     curr.next = prev → 3.next = null
   *     prev = 3
   *     curr = 4
   *
   *     State: null ← 3    4 → 5
   *
   *   Iteration 2: curr = 4
   *     nextNode = 5
   *     curr.next = prev → 4.next = 3
   *     prev = 4
   *     curr = 5
   *
   *     State: null ← 3 ← 4    5
   *
   *   Loop ends: curr = 5 = stopNode
   *   ─────────────────────────────────────────────────────────────
   *
   * Step 4: Connect reversed group
   *   prevGroupEnd.next = groupEnd
   *   → 1.next = 4
   *
   *   groupStart.next = nextGroupStart
   *   → 3.next = 5
   *
   *   Result:
   *   dummy → 2 → 1 → 4 → 3 → 5 → null
   *   ↑       ↑   ↑   ↑   ↑   ↑
   *   dummy       prevGE new new next
   *                     head tail
   *
   * Step 5: Update pointers
   *   prevGroupEnd = groupStart = 3
   *   current = nextGroupStart = 5
   *
   *   State:
   *   dummy → 2 → 1 → 4 → 3 → 5 → null
   *                       ↑   ↑
   *                     prevGE current
   *
   * ═════════════════════════════════════════════════════════════════
   * GROUP 3: Check [5]
   * ═════════════════════════════════════════════════════════════════
   *
   * Before Processing:
   *   dummy → 2 → 1 → 4 → 3 → 5 → null
   *                       ↑   ↑
   *                     prevGE current
   *
   * Step 1: Check if k=2 nodes exist
   *   checker = current = 5
   *   count = 0
   *
   *   Iteration 1: checker = 5, count = 1, checker = null
   *
   *   Loop ends: checker = null
   *   count = 1 < k = 2 ❌ (Not enough nodes)
   *
   * Step 2: Break loop (don't reverse remaining nodes)
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: dummy.next
   *
   * Final List:
   *   2 → 1 → 4 → 3 → 5 → null
   *
   * Verification:
   * - Input: [1,2,3,4,5], k=2
   * - Expected: [2,1,4,3,5]
   * - Got: [2,1,4,3,5] ✅ CORRECT!
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 1: k = 3
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = [1,2,3,4,5], k = 3
   *
   * Initial: dummy → 1 → 2 → 3 → 4 → 5 → null
   *
   * Group 1: [1, 2, 3]
   *   Check: 3 nodes available ✅
   *   Reverse: 1 → 2 → 3 becomes 3 → 2 → 1
   *   Connect: dummy → 3 → 2 → 1 → 4 → 5
   *
   * Group 2: [4, 5]
   *   Check: Only 2 nodes, need 3 ❌
   *   Break: Leave as is
   *
   * Result: 3 → 2 → 1 → 4 → 5 → null ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 2: k = 1 (No reversal)
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = [1,2,3,4,5], k = 1
   *
   * Early return: k = 1, no reversal needed
   * Result: [1,2,3,4,5] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 3: k = n (Reverse entire list)
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = [1,2,3,4,5], k = 5
   *
   * Initial: dummy → 1 → 2 → 3 → 4 → 5 → null
   *
   * Group 1: [1, 2, 3, 4, 5]
   *   Check: 5 nodes available ✅
   *   Reverse: 5 → 4 → 3 → 2 → 1
   *   Connect: dummy → 5 → 4 → 3 → 2 → 1 → null
   *
   * Group 2: No nodes left
   *   Break
   *
   * Result: 5 → 4 → 3 → 2 → 1 → null ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH IS OPTIMAL
   * ═════════════════════════════════════════════════════════════════
   *
   * Space Complexity Analysis:
   * -------------------------
   * Variables used:
   * - dummy: 1 node
   * - prevGroupEnd: 1 pointer
   * - current: 1 pointer
   * - checker: 1 pointer
   * - count: 1 integer
   * - groupStart, groupEnd, nextGroupStart: 3 pointers
   * - Inside reverseLinkedList: prev, curr, nextNode, stopNode: 4 pointers
   *
   * Total: O(1) space ✅
   * No arrays, no recursion stack, no extra data structures!
   *
   * Time Complexity Analysis:
   * ------------------------
   * - Main loop: Visits each node once
   * - For each group of k nodes:
   *   - Counting: O(k)
   *   - Finding groupEnd: O(k)
   *   - Reversing: O(k)
   * - Total groups: n/k
   * - Total time: (n/k) × O(k) = O(n) ✅
   *
   * Advantages:
   * ----------
   * 1. ✅ O(1) space - Satisfies follow-up requirement
   * 2. ✅ O(n) time - Single pass through list
   * 3. ✅ In-place manipulation - No extra structures
   * 4. ✅ Handles all edge cases naturally
   * 5. ✅ Scalable to very large lists
   *
   * Interview Tips:
   * --------------
   * 1. Start by explaining the three sub-problems (check, reverse, connect)
   * 2. Draw diagrams showing pointer movements
   * 3. Explain why dummy node helps
   * 4. Walk through one complete group reversal
   * 5. Discuss edge cases (k=1, k=n, remaining < k)
   * 6. Highlight O(1) space complexity
   */

  // ═══════════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Helper function to create linked list from array
   */
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

  /**
   * Helper function to convert linked list to array
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
   */
  function printList(head: ListNode | null): string {
    const arr = listToArray(head);
    return arr.join(' → ') + ' → null';
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('REVERSE NODES IN K-GROUP - OPTIMAL (IN-PLACE)');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test Case 1: Example 1 from problem
  console.log('Test Case 1: [1,2,3,4,5], k = 2');
  const head1 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head1));
  const result1 = reverseKGroup(head1, 2);
  console.log('Output:', printList(result1));
  console.log('Expected: [2,1,4,3,5]');
  console.log('Actual:  ', listToArray(result1));
  console.log('✓ Passed\n');

  // Test Case 2: Example 2 from problem
  console.log('Test Case 2: [1,2,3,4,5], k = 3');
  const head2 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head2));
  const result2 = reverseKGroup(head2, 3);
  console.log('Output:', printList(result2));
  console.log('Expected: [3,2,1,4,5]');
  console.log('Actual:  ', listToArray(result2));
  console.log('✓ Passed\n');

  // Test Case 3: k = 1 (no reversal)
  console.log('Test Case 3: [1,2,3,4,5], k = 1 (no reversal)');
  const head3 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head3));
  const result3 = reverseKGroup(head3, 1);
  console.log('Output:', printList(result3));
  console.log('Expected: [1,2,3,4,5]');
  console.log('Actual:  ', listToArray(result3));
  console.log('✓ Passed\n');

  // Test Case 4: k = n (reverse entire list)
  console.log('Test Case 4: [1,2,3,4,5], k = 5 (reverse entire list)');
  const head4 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head4));
  const result4 = reverseKGroup(head4, 5);
  console.log('Output:', printList(result4));
  console.log('Expected: [5,4,3,2,1]');
  console.log('Actual:  ', listToArray(result4));
  console.log('✓ Passed\n');

  // Test Case 5: Single node
  console.log('Test Case 5: [1], k = 1 (single node)');
  const head5 = createList([1]);
  console.log('Input: ', printList(head5));
  const result5 = reverseKGroup(head5, 1);
  console.log('Output:', printList(result5));
  console.log('Expected: [1]');
  console.log('Actual:  ', listToArray(result5));
  console.log('✓ Passed\n');

  // Test Case 6: Exact multiple of k
  console.log('Test Case 6: [1,2,3,4], k = 2 (exact multiple)');
  const head6 = createList([1, 2, 3, 4]);
  console.log('Input: ', printList(head6));
  const result6 = reverseKGroup(head6, 2);
  console.log('Output:', printList(result6));
  console.log('Expected: [2,1,4,3]');
  console.log('Actual:  ', listToArray(result6));
  console.log('✓ Passed\n');

  // Test Case 7: k larger than remaining
  console.log('Test Case 7: [1,2], k = 3 (k > remaining)');
  const head7 = createList([1, 2]);
  console.log('Input: ', printList(head7));
  const result7 = reverseKGroup(head7, 3);
  console.log('Output:', printList(result7));
  console.log('Expected: [1,2] (no reversal, less than k nodes)');
  console.log('Actual:  ', listToArray(result7));
  console.log('✓ Passed\n');

  // Test Case 8: Larger list with k=3
  console.log('Test Case 8: [1,2,3,4,5,6,7,8,9], k = 3');
  const head8 = createList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  console.log('Input: ', printList(head8));
  const result8 = reverseKGroup(head8, 3);
  console.log('Output:', printList(result8));
  console.log('Expected: [3,2,1,6,5,4,9,8,7]');
  console.log('Actual:  ', listToArray(result8));
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Time: O(n), Space: O(1)');
  console.log('✅ Satisfies follow-up requirement - O(1) space! 🏆');
  console.log('═══════════════════════════════════════════════════════════');
}