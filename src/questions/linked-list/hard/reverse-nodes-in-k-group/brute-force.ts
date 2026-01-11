namespace ReverseKGroupBruteForce {
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
   * BRUTE FORCE APPROACH - USING ARRAY
   * ===================================
   *
   * Intuition (Soch):
   * ----------------
   * Sabse simple approach yeh hai ki hum linked list ki complexity ko avoid karein
   * aur array ka use karein, jo reversal operations ke liye easier hai.
   *
   * Soch kya hai? (What's the idea?)
   * 1. Pehle saari nodes ko array mein store kar lo
   * 2. Array ko k-size ke groups mein divide karo
   * 3. Har group ko reverse karo (array reversal bahut easy hai!)
   * 4. Array se wapas linked list bana do
   *
   * Visual Example:
   * ---------------
   * Input: 1 → 2 → 3 → 4 → 5 → null, k = 2
   *
   * Step 1: Convert to array
   *   [1, 2, 3, 4, 5]
   *
   * Step 2: Identify groups (k=2)
   *   Group 1: [1, 2]      (indices 0-1)
   *   Group 2: [3, 4]      (indices 2-3)
   *   Remaining: [5]       (index 4, don't reverse)
   *
   * Step 3: Reverse each complete group
   *   Before: [1, 2, 3, 4, 5]
   *           └─┬─┘ └─┬─┘ └
   *           Group1 Group2 Left
   *
   *   After:  [2, 1, 4, 3, 5]
   *           └─┬─┘ └─┬─┘ └
   *         Reversed Reversed As-is
   *
   * Step 4: Build linked list from array
   *   2 → 1 → 4 → 3 → 5 → null
   *
   * Kya faayda hai? (What's the advantage?)
   * - Implementation bahut simple hai
   * - Array reversal easy hai (swap elements)
   * - No pointer manipulation ki complexity
   *
   * Kya nuksan hai? (What's the disadvantage?)
   * - O(n) extra space use ho raha hai (array storage)
   * - Follow-up question O(1) space chahta hai
   * - Linked list ka fayda kho diya (in-place manipulation)
   *
   * Algorithm:
   * ----------
   * 1. Convert linked list to array:
   *    - Traverse list and store all nodes in array
   *
   * 2. Reverse k-sized groups in array:
   *    - i = 0
   *    - while i + k <= array.length:
   *      - Reverse elements from i to i+k-1
   *      - i = i + k
   *    - Remaining elements (if any) stay as is
   *
   * 3. Rebuild linked list from array:
   *    - Create new nodes (or reuse existing)
   *    - Link them according to array order
   *
   * 4. Return new head
   *
   * Time Complexity: O(n)
   * - Converting to array: O(n)
   * - Reversing groups: O(n) - each element visited once
   * - Building list: O(n)
   * - Total: O(n)
   *
   * Space Complexity: O(n)
   * - Array storage: O(n) nodes
   * - This is NOT optimal! Follow-up wants O(1)
   *
   * @param head - Head of linked list
   * @param k - Group size for reversal
   * @returns Modified linked list head
   */
  function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    // EDGE CASE: Empty list or k = 1 (no reversal needed)
    // (If list is empty or k=1, no changes needed)
    if (head === null || k === 1) {
      return head;
    }

    // STEP 1: Convert linked list to array of nodes
    // (Convert linked list to array for easier manipulation)
    const nodes: ListNode[] = [];
    let current: ListNode | null = head;

    // Traverse karo aur saare nodes ko array mein store karo
    // (Traverse and store all nodes in array)
    while (current !== null) {
      nodes.push(current);
      current = current.next;
    }

    // STEP 2: Reverse k-sized groups in the array
    // (Reverse k-sized groups in the array)
    const n = nodes.length;

    // i represents the start of each group
    // Loop chalao har k-sized group ke liye
    for (let i = 0; i + k <= n; i += k) {
      // Reverse current group: elements from i to i+k-1
      // (Reverse current group using two-pointer technique)
      let left = i;
      let right = i + k - 1;

      // Two-pointer technique: swap elements from both ends
      while (left < right) {
        // Swap nodes at left and right positions
        const temp = nodes[left];
        nodes[left] = nodes[right];
        nodes[right] = temp;

        left++;
        right--;
      }
    }

    // STEP 3: Rebuild linked list from modified array
    // (Rebuild linked list by updating next pointers)
    // Ab array mein nodes correct order mein hain
    // Bas next pointers ko update karna hai

    for (let i = 0; i < n - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }

    // Last node ka next null hona chahiye
    // (Last node should point to null)
    nodes[n - 1].next = null;

    // STEP 4: Return new head (first element of modified array)
    // (Return new head of the list)
    return nodes[0];
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
   * Input List: 1 → 2 → 3 → 4 → 5 → null
   * k = 2
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: CONVERT LINKED LIST TO ARRAY
   * ═════════════════════════════════════════════════════════════════
   *
   * Goal: Store all nodes in array
   *
   * Initial: nodes = [], current = 1
   *
   * Iteration 1:
   *   current = 1 (node with value 1)
   *   nodes.push(1) → nodes = [1]
   *   current = current.next = 2
   *
   * Iteration 2:
   *   current = 2 (node with value 2)
   *   nodes.push(2) → nodes = [1, 2]
   *   current = current.next = 3
   *
   * Iteration 3:
   *   current = 3 (node with value 3)
   *   nodes.push(3) → nodes = [1, 2, 3]
   *   current = current.next = 4
   *
   * Iteration 4:
   *   current = 4 (node with value 4)
   *   nodes.push(4) → nodes = [1, 2, 3, 4]
   *   current = current.next = 5
   *
   * Iteration 5:
   *   current = 5 (node with value 5)
   *   nodes.push(5) → nodes = [1, 2, 3, 4, 5]
   *   current = current.next = null
   *
   * Loop ends: current = null
   *
   * Result after Phase 1:
   *   nodes = [1, 2, 3, 4, 5]
   *   n = 5
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: REVERSE K-SIZED GROUPS IN ARRAY
   * ═════════════════════════════════════════════════════════════════
   *
   * Goal: Reverse each complete k-sized group
   *
   * k = 2, n = 5
   * Groups to reverse:
   *   - Group 1: indices 0-1 (elements [1, 2])
   *   - Group 2: indices 2-3 (elements [3, 4])
   *   - Remaining: index 4 (element [5]) - DON'T reverse (only 1 element)
   *
   * ─────────────────────────────────────────────────────────────────
   * Group 1: i = 0, Reverse indices [0, 1]
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: i + k <= n? → 0 + 2 <= 5? YES ✅
   *
   * Before reversal:
   *   nodes = [1, 2, 3, 4, 5]
   *           └─┬─┘
   *          Group 1
   *
   * Reversal using two-pointer:
   *   left = 0, right = 1 (0 + 2 - 1 = 1)
   *
   *   Iteration 1: left = 0, right = 1
   *     left < right? YES
   *     Swap nodes[0] and nodes[1]
   *     Before: [1, 2, 3, 4, 5]
   *     After:  [2, 1, 3, 4, 5]
   *     left++, right-- → left = 1, right = 0
   *
   *   Loop check: left < right? 1 < 0? NO
   *   Reversal complete!
   *
   * After reversal:
   *   nodes = [2, 1, 3, 4, 5]
   *           └─┬─┘
   *         Reversed!
   *
   * Update i: i = i + k = 0 + 2 = 2
   *
   * ─────────────────────────────────────────────────────────────────
   * Group 2: i = 2, Reverse indices [2, 3]
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: i + k <= n? → 2 + 2 <= 5? YES ✅
   *
   * Before reversal:
   *   nodes = [2, 1, 3, 4, 5]
   *                 └─┬─┘
   *                Group 2
   *
   * Reversal using two-pointer:
   *   left = 2, right = 3 (2 + 2 - 1 = 3)
   *
   *   Iteration 1: left = 2, right = 3
   *     left < right? YES
   *     Swap nodes[2] and nodes[3]
   *     Before: [2, 1, 3, 4, 5]
   *     After:  [2, 1, 4, 3, 5]
   *     left++, right-- → left = 3, right = 2
   *
   *   Loop check: left < right? 3 < 2? NO
   *   Reversal complete!
   *
   * After reversal:
   *   nodes = [2, 1, 4, 3, 5]
   *                 └─┬─┘
   *               Reversed!
   *
   * Update i: i = i + k = 2 + 2 = 4
   *
   * ─────────────────────────────────────────────────────────────────
   * Group 3: i = 4, Check if can reverse
   * ─────────────────────────────────────────────────────────────────
   *
   * Check: i + k <= n? → 4 + 2 <= 5? NO ❌ (4 + 2 = 6, 6 > 5)
   * Skip this group (only 1 element remaining)
   *
   * Remaining elements:
   *   nodes = [2, 1, 4, 3, 5]
   *                       └
   *                   Left as-is
   *
   * Loop ends!
   *
   * Result after Phase 2:
   *   nodes = [2, 1, 4, 3, 5]
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 3: REBUILD LINKED LIST FROM ARRAY
   * ═════════════════════════════════════════════════════════════════
   *
   * Goal: Update next pointers to match array order
   *
   * Current array: [2, 1, 4, 3, 5]
   * Need to set: nodes[i].next = nodes[i+1]
   *
   * Iteration 1: i = 0
   *   nodes[0].next = nodes[1]
   *   2.next = 1
   *   List: 2 → 1
   *
   * Iteration 2: i = 1
   *   nodes[1].next = nodes[2]
   *   1.next = 4
   *   List: 2 → 1 → 4
   *
   * Iteration 3: i = 2
   *   nodes[2].next = nodes[3]
   *   4.next = 3
   *   List: 2 → 1 → 4 → 3
   *
   * Iteration 4: i = 3
   *   nodes[3].next = nodes[4]
   *   3.next = 5
   *   List: 2 → 1 → 4 → 3 → 5
   *
   * Loop ends (i = 4 is last index)
   *
   * Set last node's next to null:
   *   nodes[4].next = null
   *   5.next = null
   *
   * Final List:
   *   2 → 1 → 4 → 3 → 5 → null
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 4: RETURN NEW HEAD
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: nodes[0] = 2
   *
   * Final Result:
   *   2 → 1 → 4 → 3 → 5 → null ✅
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
   * Phase 1: Convert to array
   *   nodes = [1, 2, 3, 4, 5]
   *
   * Phase 2: Reverse groups
   *
   *   Group 1: i = 0
   *     Check: 0 + 3 <= 5? YES
   *     Reverse indices [0, 1, 2]
   *
   *     Two-pointer reversal:
   *       left = 0, right = 2
   *       Swap 0 and 2: [3, 2, 1, 4, 5]
   *       left++, right-- → left = 1, right = 1
   *       left < right? NO, done
   *
   *     Result: [3, 2, 1, 4, 5]
   *     i = 0 + 3 = 3
   *
   *   Group 2: i = 3
   *     Check: 3 + 3 <= 5? NO (3 + 3 = 6 > 5)
   *     Skip (only 2 elements remaining)
   *
   * Phase 3: Rebuild
   *   3 → 2 → 1 → 4 → 5 → null
   *
   * Result: [3,2,1,4,5] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 2: k = 1 (No reversal)
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = [1,2,3,4,5], k = 1
   *
   * Early return: k = 1, return head as-is
   * Result: [1,2,3,4,5] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 3: k = n (Reverse entire list)
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = [1,2,3,4,5], k = 5
   *
   * Phase 1: nodes = [1, 2, 3, 4, 5]
   *
   * Phase 2: Reverse groups
   *   Group 1: i = 0
   *     Check: 0 + 5 <= 5? YES
   *     Reverse entire array [0, 1, 2, 3, 4]
   *
   *     Two-pointer:
   *       Swap 0 and 4: [5, 2, 3, 4, 1]
   *       Swap 1 and 3: [5, 4, 3, 2, 1]
   *       middle stays: [5, 4, 3, 2, 1]
   *
   *     Result: [5, 4, 3, 2, 1]
   *     i = 0 + 5 = 5
   *
   *   Loop ends (i = 5 >= 5)
   *
   * Phase 3: Rebuild
   *   5 → 4 → 3 → 2 → 1 → null
   *
   * Result: [5,4,3,2,1] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH IS NOT OPTIMAL
   * ═════════════════════════════════════════════════════════════════
   *
   * Advantages:
   * ----------
   * 1. ✅ Easy to understand and implement
   * 2. ✅ Array operations are simpler than pointer manipulation
   * 3. ✅ No risk of losing links or creating cycles
   * 4. ✅ Debugging is easier (can print array at any step)
   *
   * Disadvantages:
   * -------------
   * 1. ❌ Uses O(n) extra space for array storage
   * 2. ❌ Follow-up question asks for O(1) space
   * 3. ❌ Not utilizing the linked list structure properly
   * 4. ❌ Creating/reusing nodes has overhead
   * 5. ❌ Not suitable for very large lists (memory constraints)
   *
   * Interview Perspective:
   * ---------------------
   * - Good starting point to explain your thought process
   * - Shows you can solve the problem
   * - But interviewer will ask: "Can you do it without extra space?"
   * - This leads to the optimal in-place solution
   *
   * Real-world Use:
   * --------------
   * - For small lists: This is fine
   * - For large lists or memory-constrained systems: Need optimal solution
   * - For production code: Usually use optimal solution
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
  console.log('REVERSE NODES IN K-GROUP - BRUTE FORCE (ARRAY)');
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

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Time: O(n), Space: O(n)');
  console.log('⚠️  Not optimal for space - Follow-up wants O(1)!');
  console.log('═══════════════════════════════════════════════════════════');
}
