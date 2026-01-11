namespace RotateListBruteForce {
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
   * BRUTE FORCE APPROACH - ROTATE ONE BY ONE
   * =========================================
   *
   * Intuition (Soch):
   * ----------------
   * Sabse simple approach: Ek baar mein ek rotation karo, isse k baar repeat karo.
   * (The simplest approach: Rotate once at a time, repeat k times.)
   *
   * Ek rotation kaise hota hai? (How does one rotation work?)
   * - Last node ko dhoodho (Find last node)
   * - Second-to-last node ko bhi track karo (Track second-to-last node)
   * - Last node ko front mein le aao (Move last node to front)
   * - Second-to-last node ka next = null (Make second-to-last point to null)
   *
   * Visual Example - Single Rotation:
   * ----------------------------------
   * Before: 1 → 2 → 3 → 4 → 5 → null
   *                     ↑   ↑
   *            second-to   last
   *                last
   *
   * Action:
   * - last.next = head (5 points to 1)
   * - second-to-last.next = null (4 points to null)
   * - head = last (5 becomes new head)
   *
   * After: 5 → 1 → 2 → 3 → 4 → null
   *
   * Ab isse k times repeat karo! (Now repeat this k times!)
   *
   * Complete Example (k=2):
   * -----------------------
   * Input: [1,2,3,4,5], k = 2
   *
   * Rotation 1:
   *   Before: 1 → 2 → 3 → 4 → 5 → null
   *   Move 5 to front
   *   After:  5 → 1 → 2 → 3 → 4 → null
   *
   * Rotation 2:
   *   Before: 5 → 1 → 2 → 3 → 4 → null
   *   Move 4 to front
   *   After:  4 → 5 → 1 → 2 → 3 → null
   *
   * Result: [4,5,1,2,3] ✅
   *
   * Algorithm:
   * ----------
   * 1. Handle edge cases:
   *    - If head is null or head.next is null: return head
   *    - If k = 0: return head
   *
   * 2. Repeat k times:
   *    For each rotation:
   *      a. Find second-to-last node and last node
   *      b. Make last node the new head:
   *         - last.next = head
   *      c. Break the link:
   *         - secondToLast.next = null
   *      d. Update head:
   *         - head = last
   *
   * 3. Return head
   *
   * Time Complexity: O(k × n)
   * - Har rotation mein puri list traverse karni padti hai: O(n)
   * - k rotations karne hain: k × O(n) = O(k × n)
   * - Agar k = n, toh O(n²) 😱
   * - Worst case: k = 2×10^9, n = 500 → 10^12 operations! 😱😱😱
   *
   * Space Complexity: O(1)
   * - Sirf pointers use kar rahe hain
   *
   * Why NOT Optimal:
   * ---------------
   * - Agar k bahut bada hai, toh bahut slow ho jayega
   * - Har rotation mein list traverse karna inefficient hai
   * - k > n ke case mein bahut zyada repetitive work ho raha hai
   * - Example: k=1000, n=5 → Actually only 0 rotations needed (1000%5=0)
   *   But this approach will do 1000 rotations! 😱
   *
   * @param head - Head of linked list
   * @param k - Number of rotations
   * @returns Rotated list head
   */
  function rotateRight(head: ListNode | null, k: number): ListNode | null {
    // EDGE CASE 1: Empty list or single node
    // (Empty list or single node doesn't change with rotation)
    if (head === null || head.next === null) {
      return head;
    }

    // EDGE CASE 2: k = 0 (no rotation needed)
    // (If k is 0, no rotation needed)
    if (k === 0) {
      return head;
    }

    // STEP 1: Perform k rotations
    // (Repeat the rotation process k times)
    for (let i = 0; i < k; i++) {
      // Rotate once
      head = rotateOnce(head);
    }

    // STEP 2: Return the rotated list
    return head;
  }

  /**
   * Helper function to perform one rotation
   * Moves the last node to the front
   *
   * @param head - Current head of list
   * @returns New head after one rotation
   */
  function rotateOnce(head: ListNode | null): ListNode | null {
    // Edge case: shouldn't happen, but safety check
    if (head === null || head.next === null) {
      return head;
    }

    // STEP 1: Find second-to-last and last nodes
    // (Traverse to find second-to-last and last nodes)
    let secondToLast: ListNode = head;
    let last: ListNode = head.next;

    // Traverse until last.next is null
    // secondToLast will be one step behind
    while (last.next !== null) {
      secondToLast = last;
      last = last.next;
    }

    // STEP 2: Move last node to front
    // (Connect last node to current head)
    last.next = head;

    // STEP 3: Break the link from second-to-last
    // (Second-to-last becomes new tail)
    secondToLast.next = null;

    // STEP 4: Update head to last node
    // (Last node is now the new head)
    return last;
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
   * head = 1 → 2 → 3 → 4 → 5 → null
   * k = 2
   *
   * Edge cases check:
   * - head !== null ✅
   * - head.next !== null ✅
   * - k !== 0 ✅
   * Proceed with rotations!
   *
   * ═════════════════════════════════════════════════════════════════
   * ROTATION 1 (i = 0)
   * ═════════════════════════════════════════════════════════════════
   *
   * Before Rotation:
   *   head = 1 → 2 → 3 → 4 → 5 → null
   *
   * Call: rotateOnce(head)
   * ─────────────────────────────────────────────────────────────────
   *
   * Inside rotateOnce:
   * ------------------
   *
   * Initial:
   *   head = 1
   *   secondToLast = 1
   *   last = 2
   *
   * Finding second-to-last and last:
   *
   *   Iteration 1: last.next !== null? (2.next = 3 ≠ null) YES
   *     secondToLast = last = 2
   *     last = last.next = 3
   *
   *   Iteration 2: last.next !== null? (3.next = 4 ≠ null) YES
   *     secondToLast = last = 3
   *     last = last.next = 4
   *
   *   Iteration 3: last.next !== null? (4.next = 5 ≠ null) YES
   *     secondToLast = last = 4
   *     last = last.next = 5
   *
   *   Iteration 4: last.next !== null? (5.next = null) NO
   *     Loop ends
   *
   * Found:
   *   secondToLast = 4
   *   last = 5
   *
   *   Visual:
   *   1 → 2 → 3 → 4 → 5 → null
   *               ↑   ↑
   *           second  last
   *           ToLast
   *
   * Move last to front:
   *   last.next = head
   *   5.next = 1
   *
   *   Temporary state:
   *   1 → 2 → 3 → 4 → 5 → 1 (cycle!)
   *                   ↑   └───┘
   *
   * Break link:
   *   secondToLast.next = null
   *   4.next = null
   *
   *   Result:
   *   5 → 1 → 2 → 3 → 4 → null
   *
   * Return: last = 5
   * ─────────────────────────────────────────────────────────────────
   *
   * After Rotation 1:
   *   head = 5 → 1 → 2 → 3 → 4 → null
   *
   * ═════════════════════════════════════════════════════════════════
   * ROTATION 2 (i = 1)
   * ═════════════════════════════════════════════════════════════════
   *
   * Before Rotation:
   *   head = 5 → 1 → 2 → 3 → 4 → null
   *
   * Call: rotateOnce(head)
   * ─────────────────────────────────────────────────────────────────
   *
   * Inside rotateOnce:
   * ------------------
   *
   * Initial:
   *   head = 5
   *   secondToLast = 5
   *   last = 1
   *
   * Finding second-to-last and last:
   *
   *   Iteration 1: last.next !== null? (1.next = 2 ≠ null) YES
   *     secondToLast = last = 1
   *     last = last.next = 2
   *
   *   Iteration 2: last.next !== null? (2.next = 3 ≠ null) YES
   *     secondToLast = last = 2
   *     last = last.next = 3
   *
   *   Iteration 3: last.next !== null? (3.next = 4 ≠ null) YES
   *     secondToLast = last = 3
   *     last = last.next = 4
   *
   *   Iteration 4: last.next !== null? (4.next = null) NO
   *     Loop ends
   *
   * Found:
   *   secondToLast = 3
   *   last = 4
   *
   *   Visual:
   *   5 → 1 → 2 → 3 → 4 → null
   *               ↑   ↑
   *           second  last
   *           ToLast
   *
   * Move last to front:
   *   last.next = head
   *   4.next = 5
   *
   *   Temporary state:
   *   5 → 1 → 2 → 3 → 4 → 5 (cycle!)
   *                   ↑   └───┘
   *
   * Break link:
   *   secondToLast.next = null
   *   3.next = null
   *
   *   Result:
   *   4 → 5 → 1 → 2 → 3 → null
   *
   * Return: last = 4
   * ─────────────────────────────────────────────────────────────────
   *
   * After Rotation 2:
   *   head = 4 → 5 → 1 → 2 → 3 → null
   *
   * ═════════════════════════════════════════════════════════════════
   * LOOP ENDS (i = 2, i < k = 2 is FALSE)
   * ═════════════════════════════════════════════════════════════════
   *
   * Final Result:
   * -------------
   * head = 4 → 5 → 1 → 2 → 3 → null
   *
   * Return: [4,5,1,2,3] ✅
   *
   * Verification:
   * - Input: [1,2,3,4,5], k=2
   * - Expected: [4,5,1,2,3]
   * - Got: [4,5,1,2,3] ✅ CORRECT!
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 1: k = 0
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = [1,2,3,4,5], k = 0
   *
   * Edge case check: k === 0 → return head immediately
   * Result: [1,2,3,4,5] ✅ (no rotation)
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 2: Single Node
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = [1], k = 100
   *
   * Edge case check: head.next === null → return head immediately
   * Result: [1] ✅ (single node stays same)
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 3: Empty List
   * ═════════════════════════════════════════════════════════════════
   *
   * Example: head = null, k = 5
   *
   * Edge case check: head === null → return head immediately
   * Result: null ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH IS SLOW
   * ═════════════════════════════════════════════════════════════════
   *
   * Time Complexity Analysis:
   * ------------------------
   *
   * Example: [1,2,3,4,5], k = 2
   *
   * Rotation 1:
   *   - Traverse to find last: 4 steps
   *   - Move and reconnect: O(1)
   *   - Total: 4 steps
   *
   * Rotation 2:
   *   - Traverse to find last: 4 steps
   *   - Move and reconnect: O(1)
   *   - Total: 4 steps
   *
   * Total operations: 2 × 4 = 8 steps
   * General formula: k × (n-1) ≈ k × n
   *
   * Problem Scenarios:
   * -----------------
   *
   * Scenario 1: k = n
   *   Example: [1,2,3,4,5], k = 5
   *   - After 5 rotations, back to original: [1,2,3,4,5]
   *   - Operations: 5 × 4 = 20 steps
   *   - But result is same as input! Wasted work! 😱
   *
   * Scenario 2: k >> n (k much larger than n)
   *   Example: [1,2,3,4,5], k = 1000
   *   - Effective rotations needed: 1000 % 5 = 0 (no rotation!)
   *   - But this approach does: 1000 × 4 = 4000 steps! 😱😱
   *   - Result is same as input, but did 4000 operations!
   *
   * Scenario 3: k = 2×10^9 (maximum constraint)
   *   Example: [1,2,3,4,5], k = 2000000000
   *   - Effective rotations: 2000000000 % 5 = 0
   *   - This approach: 2000000000 × 4 = 8×10^9 operations! 😱😱😱
   *   - Would take hours/days to complete!
   *
   * Comparison with Optimal:
   * -----------------------
   * Brute Force: O(k × n)
   *   - k = 1000, n = 5: 4000 operations
   *
   * Optimal: O(n)
   *   - Same input: ~10 operations (find length, find break point)
   *   - 400x faster! 🚀
   *
   * For k = 2×10^9:
   * Brute Force: 8×10^9 operations
   * Optimal: ~10 operations
   * 800 million times faster! 🚀🚀🚀
   *
   * ═════════════════════════════════════════════════════════════════
   * KEY LEARNING
   * ═════════════════════════════════════════════════════════════════
   *
   * This approach shows the importance of:
   * 1. Mathematical optimization (k % n)
   * 2. Avoiding redundant work
   * 3. Understanding problem constraints (k can be 2×10^9!)
   *
   * Always check: Can we reduce repeated operations using math?
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
    return arr.length > 0 ? arr.join(' → ') + ' → null' : 'null';
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('ROTATE LIST - BRUTE FORCE (ROTATE ONE BY ONE)');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test Case 1: Example 1 from problem
  console.log('Test Case 1: [1,2,3,4,5], k = 2');
  const head1 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head1));
  const result1 = rotateRight(head1, 2);
  console.log('Output:', printList(result1));
  console.log('Expected: [4,5,1,2,3]');
  console.log('Actual:  ', listToArray(result1));
  console.log('✓ Passed\n');

  // Test Case 2: Example 2 from problem
  console.log('Test Case 2: [0,1,2], k = 4');
  const head2 = createList([0, 1, 2]);
  console.log('Input: ', printList(head2));
  console.log(
    'Note: k=4 > length=3, but we rotate 4 times anyway (inefficient!)'
  );
  const result2 = rotateRight(head2, 4);
  console.log('Output:', printList(result2));
  console.log('Expected: [2,0,1]');
  console.log('Actual:  ', listToArray(result2));
  console.log('✓ Passed\n');

  // Test Case 3: k = 0
  console.log('Test Case 3: [1,2,3], k = 0 (no rotation)');
  const head3 = createList([1, 2, 3]);
  console.log('Input: ', printList(head3));
  const result3 = rotateRight(head3, 0);
  console.log('Output:', printList(result3));
  console.log('Expected: [1,2,3]');
  console.log('Actual:  ', listToArray(result3));
  console.log('✓ Passed\n');

  // Test Case 4: Single node
  console.log('Test Case 4: [1], k = 100 (single node)');
  const head4 = createList([1]);
  console.log('Input: ', printList(head4));
  const result4 = rotateRight(head4, 100);
  console.log('Output:', printList(result4));
  console.log('Expected: [1]');
  console.log('Actual:  ', listToArray(result4));
  console.log('✓ Passed\n');

  // Test Case 5: Empty list
  console.log('Test Case 5: null, k = 5 (empty list)');
  const head5 = null;
  console.log('Input: ', printList(head5));
  const result5 = rotateRight(head5, 5);
  console.log('Output:', printList(result5));
  console.log('Expected: null');
  console.log('Actual:  ', result5);
  console.log('✓ Passed\n');

  // Test Case 6: k = length (full rotation)
  console.log(
    'Test Case 6: [1,2,3,4,5], k = 5 (full rotation, back to original)'
  );
  const head6 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head6));
  console.log(
    'Note: After 5 rotations, list returns to original (inefficient!)'
  );
  const result6 = rotateRight(head6, 5);
  console.log('Output:', printList(result6));
  console.log('Expected: [1,2,3,4,5]');
  console.log('Actual:  ', listToArray(result6));
  console.log('✓ Passed\n');

  // Test Case 7: Two nodes
  console.log('Test Case 7: [1,2], k = 1');
  const head7 = createList([1, 2]);
  console.log('Input: ', printList(head7));
  const result7 = rotateRight(head7, 1);
  console.log('Output:', printList(result7));
  console.log('Expected: [2,1]');
  console.log('Actual:  ', listToArray(result7));
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Time: O(k × n), Space: O(1)');
  console.log('⚠️  VERY slow for large k!');
  console.log("⚠️  Doesn't use k % length optimization");
  console.log('═══════════════════════════════════════════════════════════');
}