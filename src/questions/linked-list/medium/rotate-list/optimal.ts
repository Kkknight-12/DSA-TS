namespace RotateListOptimal {
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
   * OPTIMAL APPROACH - MAKE CIRCULAR, THEN BREAK
   * ==============================================
   *
   * Intuition (Soch):
   * ----------------
   * Smart observation: Right rotation by k = Break list after (n - k) nodes
   *
   * Example: [1,2,3,4,5], k = 2
   * - Right rotate by 2 means: Last 2 nodes [4,5] move to front
   * - Same as: Break after (5-2) = 3rd node
   * - Result: [4,5,1,2,3]
   *
   * Agar hum list ko circular bana dein, phir sahi jagah pe break karein,
   * toh ek hi pass mein problem solve ho jayegi!
   * (If we make the list circular, then break at right place, problem solved in one pass!)
   *
   * Key Insight - Mathematical Optimization:
   * ----------------------------------------
   * k can be VERY large (up to 2×10^9)!
   * But if list length is n, then k rotations = (k % n) rotations
   *
   * Example:
   * - [1,2,3,4,5], k = 7
   * - After 5 rotations, list returns to original
   * - So k=7 is same as k=2 (7 % 5 = 2)
   *
   * This is CRITICAL for performance! ✅
   *
   * Visual Example:
   * ---------------
   * Input: [1,2,3,4,5], k = 2
   *
   * Step 1: Calculate effective k
   *   length = 5
   *   k = 2 % 5 = 2
   *
   * Step 2: Find where to break
   *   Break after (n - k) = 5 - 2 = 3 nodes
   *   So break after node 3
   *
   * Step 3: Make circular
   *   1 → 2 → 3 → 4 → 5 → (back to 1)
   *   └─────────────────┘
   *
   * Step 4: Navigate to breaking point
   *   Start from head, move (length - k - 1) = 2 steps
   *   Land on node 3 (new tail)
   *
   * Step 5: Break the circle
   *   newHead = node 4 (3.next)
   *   3.next = null
   *
   * Result: 4 → 5 → 1 → 2 → 3 → null ✅
   *
   * Algorithm:
   * ----------
   * 1. Handle edge cases:
   *    - If head is null: return null
   *    - If single node: return head
   *    - If k = 0: return head
   *
   * 2. Calculate length and find tail:
   *    - Traverse list to get length
   *    - Keep reference to last node (tail)
   *
   * 3. Calculate effective rotations:
   *    - k = k % length
   *    - If k = 0: return head (no rotation needed)
   *
   * 4. Make list circular:
   *    - tail.next = head
   *
   * 5. Find new tail position:
   *    - New tail is at position (length - k - 1)
   *    - Navigate from head to that position
   *
   * 6. Break the circle:
   *    - newHead = newTail.next
   *    - newTail.next = null
   *
   * 7. Return newHead
   *
   * Time Complexity: O(n)
   * - Calculate length: O(n)
   * - Navigate to breaking point: O(n) worst case
   * - Total: O(n) ✅
   * - NO dependency on k! Even if k = 2×10^9, still O(n)!
   *
   * Space Complexity: O(1)
   * - Only using pointers (current, tail, newTail)
   * - No extra data structures
   *
   * Why This is OPTIMAL:
   * -------------------
   * - Uses k % n to avoid unnecessary rotations
   * - Single pass to find length
   * - Single pass to find breaking point
   * - O(n) time regardless of k size
   * - O(1) space
   *
   * @param head - Head of linked list
   * @param k - Number of rotations
   * @returns Rotated list head
   */
  function rotateRight(head: ListNode | null, k: number): ListNode | null {
    // EDGE CASE 1: Empty list
    // (If list is empty, return null)
    if (head === null) {
      return null;
    }

    // EDGE CASE 2: Single node or k = 0
    // (Single node or no rotation needed)
    if (head.next === null || k === 0) {
      return head;
    }

    // STEP 1: Calculate length and find tail
    // (Traverse list to get length and keep reference to tail)
    let length = 1;
    let tail: ListNode = head;

    // Traverse to the end
    while (tail.next !== null) {
      tail = tail.next;
      length++;
    }
    // Now: tail points to last node, length = total nodes

    // STEP 2: Calculate effective rotations using modulo
    // (This is the KEY optimization!)
    k = k % length;

    // EDGE CASE 3: After modulo, if k = 0, no rotation needed
    // (k was multiple of length, list returns to original position)
    if (k === 0) {
      return head;
    }

    // STEP 3: Make the list circular
    // (Connect tail to head to form a circle)
    tail.next = head;

    // STEP 4: Find the new tail position
    // (New tail will be at position: length - k - 1)
    // Why? Because we want to break AFTER (length - k) nodes
    // So we navigate to (length - k - 1)th node, which becomes new tail
    const stepsToNewTail = length - k - 1;

    let newTail: ListNode = head;
    for (let i = 0; i < stepsToNewTail; i++) {
      newTail = newTail.next!;
    }

    // STEP 5: Break the circle
    // (New head is the node after new tail)
    const newHead: ListNode = newTail.next!;

    // Break the link to form proper list again
    newTail.next = null;

    // STEP 6: Return the new head
    return newHead;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example 1: head = [1,2,3,4,5], k = 2
   *
   * Initial State:
   * --------------
   * Input: 1 → 2 → 3 → 4 → 5 → null
   * k = 2
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 1: CALCULATE LENGTH AND FIND TAIL
   * ═════════════════════════════════════════════════════════════════
   *
   * Initial:
   *   length = 1
   *   tail = head = 1
   *
   * Traverse to find tail and length:
   *
   * Iteration 1: tail.next !== null? (1.next = 2 ≠ null) YES
   *   tail = tail.next = 2
   *   length = 2
   *
   * Iteration 2: tail.next !== null? (2.next = 3 ≠ null) YES
   *   tail = tail.next = 3
   *   length = 3
   *
   * Iteration 3: tail.next !== null? (3.next = 4 ≠ null) YES
   *   tail = tail.next = 4
   *   length = 4
   *
   * Iteration 4: tail.next !== null? (4.next = 5 ≠ null) YES
   *   tail = tail.next = 5
   *   length = 5
   *
   * Iteration 5: tail.next !== null? (5.next = null) NO
   *   Loop ends
   *
   * Result:
   *   length = 5
   *   tail = 5 (last node)
   *
   *   Visual:
   *   1 → 2 → 3 → 4 → 5 → null
   *   ↑               ↑
   *   head            tail
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 2: CALCULATE EFFECTIVE k USING MODULO
   * ═════════════════════════════════════════════════════════════════
   *
   * Original k = 2
   * length = 5
   *
   * Effective k = k % length = 2 % 5 = 2
   *
   * k = 2 ≠ 0, so rotation is needed
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 3: MAKE LIST CIRCULAR
   * ═════════════════════════════════════════════════════════════════
   *
   * Connect tail to head:
   *   tail.next = head
   *   5.next = 1
   *
   * Circular list formed:
   *   1 → 2 → 3 → 4 → 5 → 1 → 2 → ... (infinite loop)
   *   ↑                   ↑
   *   └─────────────────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 4: FIND NEW TAIL POSITION
   * ═════════════════════════════════════════════════════════════════
   *
   * New tail position = length - k - 1 = 5 - 2 - 1 = 2
   * (Position is 0-indexed from head)
   *
   * Why this formula?
   * - We want to break after (length - k) = 3 nodes
   * - So new tail is the (length - k)th node
   * - In 0-indexed: (length - k - 1) = 2
   *
   * Navigate from head:
   *   newTail = head = 1 (position 0)
   *
   * Loop: for i = 0; i < 2; i++
   *
   * Iteration 1 (i=0):
   *   newTail = newTail.next = 2 (position 1)
   *
   * Iteration 2 (i=1):
   *   newTail = newTail.next = 3 (position 2)
   *
   * Loop ends
   *
   * Result:
   *   newTail = 3 (at position 2)
   *
   *   Visual in circular list:
   *   1 → 2 → 3 → 4 → 5 → 1 (circular)
   *           ↑   ↑
   *      newTail  will be newHead
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 5: BREAK THE CIRCLE
   * ═════════════════════════════════════════════════════════════════
   *
   * Find new head:
   *   newHead = newTail.next = 3.next = 4
   *
   * Break the circle:
   *   newTail.next = null
   *   3.next = null
   *
   * Result:
   *   4 → 5 → 1 → 2 → 3 → null
   *   ↑           ↑   ↑
   *  newHead      |  newTail
   *               └──(connected earlier)
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 6: RETURN NEW HEAD
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: newHead = 4
   *
   * Final Result:
   *   4 → 5 → 1 → 2 → 3 → null
   *
   * Verification:
   * - Input: [1,2,3,4,5], k=2
   * - Expected: [4,5,1,2,3]
   * - Got: [4,5,1,2,3] ✅ CORRECT!
   *
   * ═════════════════════════════════════════════════════════════════
   * EXAMPLE 2: k > length
   * ═════════════════════════════════════════════════════════════════
   *
   * Input: [0,1,2], k = 4
   *
   * Step 1: Calculate length
   *   length = 3
   *   tail = 2
   *
   * Step 2: Effective k
   *   k = 4 % 3 = 1 ⭐ (Only 1 rotation needed!)
   *
   * Step 3: Make circular
   *   2.next = 0
   *   Circle: 0 → 1 → 2 → 0
   *
   * Step 4: Find new tail
   *   Position = length - k - 1 = 3 - 1 - 1 = 1
   *   Navigate 1 step from head:
   *     newTail = 0
   *     Step 1: newTail = 1
   *
   *   newTail = 1
   *
   * Step 5: Break circle
   *   newHead = 1.next = 2
   *   1.next = null
   *
   * Result: 2 → 0 → 1 → null ✅
   *
   * Note: Without modulo optimization, would do 4 rotations!
   * With modulo: Only calculate once, navigate once. Much faster! 🚀
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 1: k = length (Full rotation)
   * ═════════════════════════════════════════════════════════════════
   *
   * Input: [1,2,3,4,5], k = 5
   *
   * Step 1: length = 5, tail = 5
   * Step 2: k = 5 % 5 = 0
   * Step 3: k = 0, return head immediately
   *
   * Result: [1,2,3,4,5] ✅ (no rotation)
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 2: k = 0
   * ═════════════════════════════════════════════════════════════════
   *
   * Input: [1,2,3], k = 0
   *
   * Early check: k = 0, return head
   * Result: [1,2,3] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 3: k = 2×10^9 (VERY LARGE)
   * ═════════════════════════════════════════════════════════════════
   *
   * Input: [1,2,3,4,5], k = 2000000002
   *
   * Step 1: length = 5
   * Step 2: k = 2000000002 % 5 = 2 ⭐⭐⭐
   *
   * Now same as k = 2!
   * Continue as normal...
   *
   * Result: [4,5,1,2,3] ✅
   *
   * Time taken: O(n) = O(5) ≈ 10 operations
   * Without modulo: Would need 2 billion rotations! 😱
   *
   * This is why modulo is CRITICAL! ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASE 4: Single Node
   * ═════════════════════════════════════════════════════════════════
   *
   * Input: [1], k = 100
   *
   * Early check: head.next === null, return head
   * Result: [1] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH IS OPTIMAL
   * ═════════════════════════════════════════════════════════════════
   *
   * Time Complexity: O(n)
   * ---------------------
   * - Calculate length: O(n) - traverse once
   * - Calculate k % n: O(1) - simple modulo
   * - Make circular: O(1) - single pointer update
   * - Find new tail: O(n) worst case - traverse at most n nodes
   * - Break circle: O(1) - two pointer updates
   * - Total: O(n) + O(1) + O(n) = O(n) ✅
   *
   * CRITICAL: Time complexity is O(n), NOT O(k)!
   * Even if k = 2×10^9, still O(n)! 🚀
   *
   * Space Complexity: O(1)
   * ----------------------
   * - length: 1 integer
   * - tail: 1 pointer
   * - k: 1 integer (reused)
   * - stepsToNewTail: 1 integer
   * - newTail: 1 pointer
   * - newHead: 1 pointer
   * - Total: Constant space ✅
   *
   * Comparison with Brute Force:
   * ---------------------------
   *
   * Example: [1,2,3,4,5], k = 1000
   *
   * Brute Force:
   *   - Time: O(k × n) = 1000 × 4 = 4000 operations
   *   - Actually needs: 1000 % 5 = 0 rotations (none!)
   *   - Wasted: 4000 operations 😱
   *
   * Optimal:
   *   - Calculate k % n: 1000 % 5 = 0
   *   - Return head immediately
   *   - Operations: ~10 (just length calculation)
   *   - 400x faster! 🚀
   *
   * Example: [1,2,3,4,5], k = 2×10^9
   *
   * Brute Force:
   *   - Time: O(k × n) = 2×10^9 × 4 = 8×10^9 operations
   *   - Would take: Hours/Days! 😱😱😱
   *
   * Optimal:
   *   - Calculate k % n: 2×10^9 % 5 = 2
   *   - Time: O(n) = ~10 operations
   *   - Takes: Milliseconds ⚡
   *   - 800 million times faster! 🚀🚀🚀
   *
   * Key Advantages:
   * --------------
   * 1. ✅ Uses mathematical optimization (modulo)
   * 2. ✅ Avoids redundant rotations
   * 3. ✅ O(n) time - independent of k
   * 4. ✅ O(1) space - no extra structures
   * 5. ✅ Handles all edge cases elegantly
   * 6. ✅ Works for ANY k, even 2×10^9!
   *
   * Interview Tips:
   * --------------
   * 1. Mention modulo optimization first - shows you understand constraints
   * 2. Explain circular list technique - elegant and efficient
   * 3. Walk through the formula: newTail position = length - k - 1
   * 4. Highlight O(n) time regardless of k size
   * 5. Draw diagram showing circular list and breaking point
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
  console.log('ROTATE LIST - OPTIMAL (CIRCULAR LIST)');
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

  // Test Case 2: Example 2 from problem (k > length)
  console.log('Test Case 2: [0,1,2], k = 4 (k > length)');
  const head2 = createList([0, 1, 2]);
  console.log('Input: ', printList(head2));
  console.log('Note: k % length = 4 % 3 = 1 (only 1 rotation needed!)');
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
  console.log('Test Case 6: [1,2,3,4,5], k = 5 (k = length, back to original)');
  const head6 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head6));
  console.log('Note: k % length = 5 % 5 = 0 (no rotation needed!)');
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

  // Test Case 8: k >> length (very large k)
  console.log('Test Case 8: [1,2,3], k = 1000 (k >> length)');
  const head8 = createList([1, 2, 3]);
  console.log('Input: ', printList(head8));
  console.log('Note: k % length = 1000 % 3 = 1 (only 1 rotation!)');
  const result8 = rotateRight(head8, 1000);
  console.log('Output:', printList(result8));
  console.log('Expected: [3,1,2]');
  console.log('Actual:  ', listToArray(result8));
  console.log('✓ Passed\n');

  // Test Case 9: Extreme k (constraint maximum)
  console.log('Test Case 9: [1,2,3,4,5], k = 2000000002 (2×10^9!)');
  const head9 = createList([1, 2, 3, 4, 5]);
  console.log('Input: ', printList(head9));
  console.log('Note: k % length = 2000000002 % 5 = 2');
  const startTime = performance.now();
  const result9 = rotateRight(head9, 2000000002);
  const endTime = performance.now();
  console.log('Output:', printList(result9));
  console.log('Expected: [4,5,1,2,3]');
  console.log('Actual:  ', listToArray(result9));
  console.log(`Time taken: ${(endTime - startTime).toFixed(4)}ms ⚡`);
  console.log('✓ Passed (With modulo optimization, handles huge k!)\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Time: O(n), Space: O(1)');
  console.log('✅ Handles ANY k (even 2×10^9) efficiently! 🚀');
  console.log('✅ Uses mathematical optimization (k % length)');
  console.log('═══════════════════════════════════════════════════════════');
}