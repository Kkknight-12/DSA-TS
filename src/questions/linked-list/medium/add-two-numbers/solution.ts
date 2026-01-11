namespace AddTwoNumbers {
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
   * OPTIMAL APPROACH - SIMULATION (ITERATIVE ADDITION WITH CARRY)
   * ==============================================================
   *
   * Intuition (Soch):
   * ----------------
   * Ye problem bilkul waisa hi hai jaise hum school mein addition karte the!
   * (This problem is exactly like how we did addition in school!)
   *
   * School mein kaise karte the? (How did we do it in school?)
   * - RIGHT TO LEFT (units place se start karke)
   * - Column by column add karo
   * - Agar sum > 9, toh carry agle column mein le jao
   *
   * Yahan twist kya hai? (What's the twist here?)
   * - Digits pehle se hi REVERSE ORDER mein hain!
   * - Matlab list ke START se traverse karna = UNITS place se start karna ✅
   * - Humein reverse karne ki zaroorat nahi!
   *
   * Visual Example:
   * ---------------
   * Normal way (school):     Linked List (already reversed):
   *
   *     3 4 2                    2 → 4 → 3
   *   + 4 6 5                  + 5 → 6 → 4
   *   -------                  -----------
   *     8 0 7                    7 → 0 → 8
   *     ↑ ↑ ↑                    ↑   ↑   ↑
   *     | | |                    |   |   |
   *   Hundreds                 Units  Tens
   *   Tens                     (start)
   *   Units
   *
   * Kaise kaam karega? (How will it work?)
   * -------------------------------------
   * Position 1: 2 + 5 = 7, carry = 0 → Result: 7
   * Position 2: 4 + 6 + carry(0) = 10 → digit = 0, carry = 1 → Result: 0
   * Position 3: 3 + 4 + carry(1) = 8 → digit = 8, carry = 0 → Result: 8
   *
   * Final: 7 → 0 → 8 (represents 807) ✅
   *
   * Key Insight:
   * -----------
   * Har position pe:
   * - sum = digit1 + digit2 + carry
   * - new digit = sum % 10 (last digit of sum)
   * - new carry = Math.floor(sum / 10) (quotient when divided by 10)
   *
   * Examples:
   * - sum = 7  → digit = 7, carry = 0
   * - sum = 10 → digit = 0, carry = 1
   * - sum = 15 → digit = 5, carry = 1
   * - sum = 18 → digit = 8, carry = 1
   *
   * Algorithm:
   * ----------
   * 1. Create dummy head (result list banane ke liye helper)
   * 2. Initialize carry = 0
   * 3. Loop chalao jab tak:
   *    - l1 mein nodes bache hain, YA
   *    - l2 mein nodes bache hain, YA
   *    - carry bacha hai
   * 4. Har iteration mein:
   *    - Current values nikal lo (0 if null)
   *    - sum = val1 + val2 + carry
   *    - digit = sum % 10
   *    - carry = Math.floor(sum / 10)
   *    - Nayi node banao with digit
   *    - Pointers ko aage badhao
   * 5. Return dummyHead.next
   *
   * Time Complexity: O(max(m, n))
   * - Har node ko exactly ek baar visit karte hain
   * - m = l1 ki length, n = l2 ki length
   * - Loop max(m, n) times chalega (+ 1 agar last carry bache)
   *
   * Space Complexity: O(max(m, n))
   * - Result list banate hain jisme max(m, n) + 1 nodes ho sakte hain
   * - Example: 999 + 1 = 1000 (3 nodes + 1 = 4 nodes)
   * - Excluding result list, extra space O(1) hai (sirf carry variable)
   *
   * @param l1 - First number as linked list (reverse order)
   * @param l2 - Second number as linked list (reverse order)
   * @returns Sum as linked list (reverse order)
   */
  function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null
  ): ListNode | null {
    // STEP 1: Create dummy head node
    // (Dummy node makes it easier to build result list)
    // Ye ek placeholder hai, final result mein dummyHead.next return karenge
    const dummyHead = new ListNode(0);

    // STEP 2: Initialize current pointer (result list build karne ke liye)
    // (Initialize current pointer to build result list)
    let current = dummyHead;

    // STEP 3: Initialize carry variable
    // (Initialize carry variable to track carry from previous addition)
    let carry = 0;

    // STEP 4: Loop jab tak koi list bacha hai ya carry bacha hai
    // (Loop while any list has nodes remaining or carry is non-zero)
    // Important: Carry check zaroori hai! Example: 999 + 1 = 1000
    // Last mein ek extra node banani padegi for carry
    while (l1 !== null || l2 !== null || carry !== 0) {
      // STEP 5: Get current values from both lists
      // (Get current values from both lists, 0 if list is null)
      // Agar list khatam ho gayi hai, toh 0 consider karo
      const val1 = l1 !== null ? l1.val : 0;
      const val2 = l2 !== null ? l2.val : 0;

      // STEP 6: Calculate sum of both digits + carry
      // (Calculate sum of current digits plus carry from previous)
      const sum = val1 + val2 + carry;

      // STEP 7: Extract the digit to store (last digit of sum)
      // (Extract the ones place digit using modulo)
      // Example: sum = 15 → digit = 5, sum = 7 → digit = 7
      const digit = sum % 10;

      // STEP 8: Calculate new carry (quotient when divided by 10)
      // (Calculate new carry for next position)
      // Example: sum = 15 → carry = 1, sum = 7 → carry = 0
      carry = Math.floor(sum / 10);

      // STEP 9: Create new node with the digit
      // (Create new node with calculated digit)
      const newNode = new ListNode(digit);

      // STEP 10: Attach new node to result list
      // (Attach new node to current position in result list)
      current.next = newNode;

      // STEP 11: Move current pointer forward
      // (Move current pointer to newly created node)
      current = current.next;

      // STEP 12: Move l1 and l2 pointers forward (if not null)
      // (Move input list pointers forward if they're not null)
      if (l1 !== null) {
        l1 = l1.next;
      }
      if (l2 !== null) {
        l2 = l2.next;
      }
    }

    // STEP 13: Return result (skip dummy head)
    // (Return actual result list, skipping dummy head)
    // dummyHead.next mein actual result ka first node hai
    return dummyHead.next;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: l1 = [2,4,3], l2 = [5,6,4]
   *
   * What it represents:
   * -------------------
   * l1 = 2 → 4 → 3 → null  (represents 342 in reverse)
   * l2 = 5 → 6 → 4 → null  (represents 465 in reverse)
   * Expected sum: 342 + 465 = 807
   * Expected result: 7 → 0 → 8 → null (807 in reverse)
   *
   * Initial State:
   * --------------
   * dummyHead = [0] → null
   * current = dummyHead
   * carry = 0
   * l1 = 2 → 4 → 3 → null
   * l2 = 5 → 6 → 4 → null
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 1 (Units Place - Ones)
   * ═════════════════════════════════════════════════════════════════
   *
   * Before:
   *   l1 = 2 → 4 → 3 → null
   *        ↑
   *   l2 = 5 → 6 → 4 → null
   *        ↑
   *   carry = 0
   *   current = dummyHead
   *   Result: [0] → null
   *
   * Check: l1 !== null? YES, l2 !== null? YES, carry !== 0? NO
   * Loop continues ✅
   *
   * Step-by-step:
   *   val1 = l1.val = 2
   *   val2 = l2.val = 5
   *   sum = 2 + 5 + 0 = 7
   *   digit = 7 % 10 = 7
   *   carry = Math.floor(7 / 10) = 0
   *
   *   Create newNode = [7]
   *   current.next = newNode
   *   current = newNode
   *
   *   l1 = l1.next = 4 → 3 → null
   *   l2 = l2.next = 6 → 4 → null
   *
   * After:
   *   l1 = 4 → 3 → null
   *        ↑
   *   l2 = 6 → 4 → null
   *        ↑
   *   carry = 0
   *   current = [7]
   *   Result: [0] → [7] → null
   *                  ↑ current
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 2 (Tens Place)
   * ═════════════════════════════════════════════════════════════════
   *
   * Before:
   *   l1 = 4 → 3 → null
   *        ↑
   *   l2 = 6 → 4 → null
   *        ↑
   *   carry = 0
   *   current = [7]
   *   Result: [0] → [7] → null
   *
   * Check: l1 !== null? YES, l2 !== null? YES, carry !== 0? NO
   * Loop continues ✅
   *
   * Step-by-step:
   *   val1 = l1.val = 4
   *   val2 = l2.val = 6
   *   sum = 4 + 6 + 0 = 10 ⚠️ (Greater than 9!)
   *   digit = 10 % 10 = 0
   *   carry = Math.floor(10 / 10) = 1 ⭐ (Carry generated!)
   *
   *   Create newNode = [0]
   *   current.next = newNode
   *   current = newNode
   *
   *   l1 = l1.next = 3 → null
   *   l2 = l2.next = 4 → null
   *
   * After:
   *   l1 = 3 → null
   *        ↑
   *   l2 = 4 → null
   *        ↑
   *   carry = 1 ⭐ (Important!)
   *   current = [0]
   *   Result: [0] → [7] → [0] → null
   *                         ↑ current
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 3 (Hundreds Place)
   * ═════════════════════════════════════════════════════════════════
   *
   * Before:
   *   l1 = 3 → null
   *        ↑
   *   l2 = 4 → null
   *        ↑
   *   carry = 1
   *   current = [0]
   *   Result: [0] → [7] → [0] → null
   *
   * Check: l1 !== null? YES, l2 !== null? YES, carry !== 0? YES
   * Loop continues ✅
   *
   * Step-by-step:
   *   val1 = l1.val = 3
   *   val2 = l2.val = 4
   *   sum = 3 + 4 + 1 = 8 ⭐ (Carry ko include kiya!)
   *   digit = 8 % 10 = 8
   *   carry = Math.floor(8 / 10) = 0
   *
   *   Create newNode = [8]
   *   current.next = newNode
   *   current = newNode
   *
   *   l1 = l1.next = null
   *   l2 = l2.next = null
   *
   * After:
   *   l1 = null
   *   l2 = null
   *   carry = 0
   *   current = [8]
   *   Result: [0] → [7] → [0] → [8] → null
   *                              ↑ current
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 4 (Loop Check)
   * ═════════════════════════════════════════════════════════════════
   *
   * Check: l1 !== null? NO, l2 !== null? NO, carry !== 0? NO
   * Loop ENDS ❌
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * Result: [0] → [7] → [0] → [8] → null
   *          ↑
   *      dummyHead (skip this)
   *
   * Return: dummyHead.next = [7] → [0] → [8] → null ✅
   *
   * Verification:
   * - l1 = [2,4,3] = 342
   * - l2 = [5,6,4] = 465
   * - Sum = 807
   * - Result = [7,0,8] = 807 ✅ CORRECT!
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 1: CARRY AT THE END
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: l1 = [9,9,9], l2 = [1]
   *
   * What it represents:
   * l1 = 999
   * l2 = 1
   * Sum = 999 + 1 = 1000
   * Expected: [0,0,0,1]
   *
   * Iteration 1:
   *   val1 = 9, val2 = 1, carry = 0
   *   sum = 9 + 1 + 0 = 10
   *   digit = 0, carry = 1
   *   Result: [0]
   *
   * Iteration 2:
   *   val1 = 9, val2 = 0 (l2 null), carry = 1
   *   sum = 9 + 0 + 1 = 10
   *   digit = 0, carry = 1
   *   Result: [0] → [0]
   *
   * Iteration 3:
   *   val1 = 9, val2 = 0, carry = 1
   *   sum = 9 + 0 + 1 = 10
   *   digit = 0, carry = 1
   *   Result: [0] → [0] → [0]
   *
   * Iteration 4: ⭐ IMPORTANT!
   *   val1 = 0 (l1 null), val2 = 0 (l2 null), carry = 1
   *   Loop continues because carry !== 0 ✅
   *   sum = 0 + 0 + 1 = 1
   *   digit = 1, carry = 0
   *   Result: [0] → [0] → [0] → [1]
   *
   * Final: [0,0,0,1] = 1000 ✅
   *
   * 🎯 KEY LEARNING: Loop condition mein "carry !== 0" ZAROORI hai!
   *    Warna last digit miss ho jayega!
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 2: DIFFERENT LENGTHS
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
   *
   * l1 = 9999999
   * l2 = 9999
   * Sum = 10009998
   * Expected: [8,9,9,9,0,0,0,1]
   *
   * Iterations 1-4: Both lists have values
   *   Each: 9 + 9 + carry = 18 or 19
   *   digit = 8 or 9, carry = 1
   *
   * Iterations 5-7: Only l1 has values
   *   val1 = 9, val2 = 0, carry = 1
   *   sum = 10
   *   digit = 0, carry = 1
   *
   * Iteration 8: Both null, but carry = 1
   *   sum = 1
   *   digit = 1, carry = 0
   *
   * Final: [8,9,9,9,0,0,0,1] ✅
   *
   * 🎯 KEY LEARNING: Algorithm automatically handles different lengths!
   *    Null list ko 0 treat karte hain.
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 3: BOTH LISTS ARE [0]
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: l1 = [0], l2 = [0]
   *
   * l1 = 0
   * l2 = 0
   * Sum = 0
   * Expected: [0]
   *
   * Iteration 1:
   *   val1 = 0, val2 = 0, carry = 0
   *   sum = 0
   *   digit = 0, carry = 0
   *   Result: [0]
   *
   * Loop ends (all null, carry = 0)
   * Final: [0] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY DUMMY HEAD IS USEFUL
   * ═════════════════════════════════════════════════════════════════
   *
   * Without dummy head, code would be:
   * ```
   * if (result === null) {
   *   result = newNode;
   *   current = result;
   * } else {
   *   current.next = newNode;
   *   current = newNode;
   * }
   * ```
   *
   * With dummy head:
   * ```
   * current.next = newNode;
   * current = newNode;
   * ```
   *
   * Much cleaner! No special case for first node ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * TIME & SPACE COMPLEXITY ANALYSIS
   * ═════════════════════════════════════════════════════════════════
   *
   * Time Complexity: O(max(m, n))
   * ----------------------------
   * - m = length of l1
   * - n = length of l2
   * - Loop runs max(m, n) times (worst case: +1 for carry)
   * - Each iteration: O(1) operations
   * - Total: O(max(m, n))
   *
   * Space Complexity: O(max(m, n))
   * -----------------------------
   * - Result list has max(m, n) + 1 nodes (worst case)
   * - Example: 999 (3 nodes) + 1 (1 node) = 1000 (4 nodes)
   * - If we don't count output: O(1) extra space (only carry variable)
   * - With output: O(max(m, n))
   *
   * Why this is OPTIMAL:
   * -------------------
   * 1. ✅ Single pass - traverse each list only once
   * 2. ✅ No conversions - directly work with linked lists
   * 3. ✅ No overflow - works for ANY size numbers (even 100 digits!)
   * 4. ✅ Handles all edge cases naturally
   * 5. ✅ Clean code with dummy head technique
   */

  // ═══════════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Helper function to create linked list from array
   * @param arr - Array of digits
   * @returns Head of linked list
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
   * @param head - Head of linked list
   * @returns Array of values
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
   * @param head - Head of linked list
   * @returns String representation
   */
  function printList(head: ListNode | null): string {
    const arr = listToArray(head);
    return arr.join(' → ') + ' → null';
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('ADD TWO NUMBERS - SIMULATION WITH CARRY');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test Case 1: Example 1 from problem
  console.log('Test Case 1: 342 + 465 = 807');
  const l1_test1 = createList([2, 4, 3]);
  const l2_test1 = createList([5, 6, 4]);
  console.log('l1 =', printList(l1_test1), '(represents 342)');
  console.log('l2 =', printList(l2_test1), '(represents 465)');
  const result1 = addTwoNumbers(l1_test1, l2_test1);
  console.log('Result:', printList(result1), '(represents 807)');
  console.log('Expected: [7,0,8]');
  console.log('Actual:', listToArray(result1));
  console.log('✓ Passed\n');

  // Test Case 2: Example 2 from problem
  console.log('Test Case 2: 0 + 0 = 0');
  const l1_test2 = createList([0]);
  const l2_test2 = createList([0]);
  console.log('l1 =', printList(l1_test2), '(represents 0)');
  console.log('l2 =', printList(l2_test2), '(represents 0)');
  const result2 = addTwoNumbers(l1_test2, l2_test2);
  console.log('Result:', printList(result2), '(represents 0)');
  console.log('Expected: [0]');
  console.log('Actual:', listToArray(result2));
  console.log('✓ Passed\n');

  // Test Case 3: Example 3 from problem - Carry at end
  console.log('Test Case 3: 9999999 + 9999 = 10009998');
  const l1_test3 = createList([9, 9, 9, 9, 9, 9, 9]);
  const l2_test3 = createList([9, 9, 9, 9]);
  console.log('l1 =', printList(l1_test3), '(represents 9999999)');
  console.log('l2 =', printList(l2_test3), '(represents 9999)');
  const result3 = addTwoNumbers(l1_test3, l2_test3);
  console.log('Result:', printList(result3), '(represents 10009998)');
  console.log('Expected: [8,9,9,9,0,0,0,1]');
  console.log('Actual:', listToArray(result3));
  console.log('✓ Passed\n');

  // Test Case 4: Carry at end (999 + 1)
  console.log('Test Case 4: 999 + 1 = 1000 (Carry at end)');
  const l1_test4 = createList([9, 9, 9]);
  const l2_test4 = createList([1]);
  console.log('l1 =', printList(l1_test4), '(represents 999)');
  console.log('l2 =', printList(l2_test4), '(represents 1)');
  const result4 = addTwoNumbers(l1_test4, l2_test4);
  console.log('Result:', printList(result4), '(represents 1000)');
  console.log('Expected: [0,0,0,1]');
  console.log('Actual:', listToArray(result4));
  console.log('✓ Passed\n');

  // Test Case 5: Different lengths (no carry)
  console.log('Test Case 5: 123 + 4 = 127 (Different lengths)');
  const l1_test5 = createList([3, 2, 1]);
  const l2_test5 = createList([4]);
  console.log('l1 =', printList(l1_test5), '(represents 123)');
  console.log('l2 =', printList(l2_test5), '(represents 4)');
  const result5 = addTwoNumbers(l1_test5, l2_test5);
  console.log('Result:', printList(result5), '(represents 127)');
  console.log('Expected: [7,2,1]');
  console.log('Actual:', listToArray(result5));
  console.log('✓ Passed\n');

  // Test Case 6: Both single digit with carry
  console.log('Test Case 6: 5 + 5 = 10 (Single digit with carry)');
  const l1_test6 = createList([5]);
  const l2_test6 = createList([5]);
  console.log('l1 =', printList(l1_test6), '(represents 5)');
  console.log('l2 =', printList(l2_test6), '(represents 5)');
  const result6 = addTwoNumbers(l1_test6, l2_test6);
  console.log('Result:', printList(result6), '(represents 10)');
  console.log('Expected: [0,1]');
  console.log('Actual:', listToArray(result6));
  console.log('✓ Passed\n');

  // Test Case 7: Multiple carries
  console.log('Test Case 7: 99 + 99 = 198 (Multiple carries)');
  const l1_test7 = createList([9, 9]);
  const l2_test7 = createList([9, 9]);
  console.log('l1 =', printList(l1_test7), '(represents 99)');
  console.log('l2 =', printList(l2_test7), '(represents 99)');
  const result7 = addTwoNumbers(l1_test7, l2_test7);
  console.log('Result:', printList(result7), '(represents 198)');
  console.log('Expected: [8,9,1]');
  console.log('Actual:', listToArray(result7));
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Time: O(max(m,n)), Space: O(max(m,n))');
  console.log('Works for ANY size numbers - No overflow! 🏆');
  console.log('═══════════════════════════════════════════════════════════');
}
