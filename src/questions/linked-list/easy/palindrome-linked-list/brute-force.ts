/**
 * Palindrome Linked List - Brute Force Approach
 *
 * Problem: Check if a singly linked list is a palindrome.
 *          A palindrome reads the same forwards and backwards.
 *
 * Approach: Copy linked list values to array, then use two-pointer technique
 *
 * Time Complexity: O(n) - traverse list once + check array once
 * Space Complexity: O(n) - array stores all n values
 *
 * Where n = number of nodes in linked list
 */

namespace PalindromeLinkedListBruteForce {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Check if linked list is palindrome using array
   *
   * Logic:
   * 1. Copy all values from linked list to array
   * 2. Use two pointers (left, right) to check if array is palindrome
   * 3. Left starts at beginning, right starts at end
   * 4. Compare values and move towards center
   * 5. If any mismatch → not palindrome
   * 6. If all match → palindrome!
   */
  function isPalindrome(head: ListNode | null): boolean {
    // EDGE CASE 1: Empty list
    // Empty list is considered palindrome (vacuous truth)
    if (head === null) {
      return true;
    }

    // EDGE CASE 2: Single node
    // Single element is always palindrome (reads same forward and backward)
    if (head.next === null) {
      return true;
    }

    // STEP 1: Copy linked list values to array
    // WHY: Array gives us random access (we can access from both ends)
    // Linked list only allows forward traversal
    const values: number[] = [];

    // Traverse the linked list and collect all values
    let current: ListNode | null = head;
    while (current !== null) {
      // Add current node's value to array
      values.push(current.val);

      // Move to next node
      current = current.next;
    }

    // STEP 2: Check if array is palindrome using two-pointer technique
    // Left pointer starts at beginning
    let left = 0;

    // Right pointer starts at end
    let right = values.length - 1;

    // Compare elements from both ends moving towards center
    // WHY: Palindrome means symmetric around center
    while (left < right) {
      // CHECK: Do values at left and right positions match?
      if (values[left] !== values[right]) {
        // Mismatch found! Not a palindrome
        return false;
      }

      // Values match, move pointers towards center
      // Left moves forward
      left++;

      // Right moves backward
      right--;
    }

    // If we reached here, all comparisons matched
    // List is a palindrome!
    return true;
  }

  /**
   * ================================
   * DRY RUN - COMPLETE VISUALIZATION
   * ================================
   *
   * Example 1: Input: [1, 2, 2, 1] (Even length palindrome)
   *
   * List structure:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2  │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null │
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 1: COPY TO ARRAY
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = node(1)
   * ─────────────────────────────────────────────────────────────────
   * Action: Push 1 to array
   * values = [1]
   * Move: current = node(2)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = node(2)
   * ─────────────────────────────────────────────────────────────────
   * Action: Push 2 to array
   * values = [1, 2]
   * Move: current = node(2) (second occurrence)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = node(2)
   * ─────────────────────────────────────────────────────────────────
   * Action: Push 2 to array
   * values = [1, 2, 2]
   * Move: current = node(1) (second occurrence)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = node(1)
   * ─────────────────────────────────────────────────────────────────
   * Action: Push 1 to array
   * values = [1, 2, 2, 1]
   * Move: current = null
   *
   * Loop ends (current === null)
   * Final array: [1, 2, 2, 1]
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 2: TWO-POINTER PALINDROME CHECK
   * ═════════════════════════════════════════════════════════════════
   *
   * Array: [1, 2, 2, 1]
   * Indices: 0  1  2  3
   *
   * Initial:
   *   left = 0 (points to index 0)
   *   right = 3 (points to index 3)
   *
   * ─────────────────────────────────────────────────────────────────
   * Comparison 1: left = 0, right = 3
   * ─────────────────────────────────────────────────────────────────
   * Values:
   *   values[left] = values[0] = 1
   *   values[right] = values[3] = 1
   *
   * Check: 1 === 1? YES! ✅
   *
   * Visual:
   *   [1, 2, 2, 1]
   *    ↑        ↑
   *   left    right
   *    1   ==   1  ✅
   *
   * Action: Move pointers
   *   left = 1
   *   right = 2
   *
   * Continue loop (left < right: 1 < 2? Yes)
   *
   * ─────────────────────────────────────────────────────────────────
   * Comparison 2: left = 1, right = 2
   * ─────────────────────────────────────────────────────────────────
   * Values:
   *   values[left] = values[1] = 2
   *   values[right] = values[2] = 2
   *
   * Check: 2 === 2? YES! ✅
   *
   * Visual:
   *   [1, 2, 2, 1]
   *       ↑  ↑
   *      left right
   *       2 == 2  ✅
   *
   * Action: Move pointers
   *   left = 2
   *   right = 1
   *
   * Check loop condition: left < right? 2 < 1? NO!
   * Loop ends
   *
   * ─────────────────────────────────────────────────────────────────
   * RESULT: All comparisons passed! Return true ✅
   * ─────────────────────────────────────────────────────────────────
   * The list [1, 2, 2, 1] is a PALINDROME!
   */

  /**
   * ================================
   * DRY RUN - EXAMPLE 2 (ODD LENGTH)
   * ================================
   *
   * Input: [1, 2, 3, 2, 1] (Odd length palindrome)
   *
   * List structure:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *
   * STEP 1: Copy to array
   * After traversal: values = [1, 2, 3, 2, 1]
   *
   * STEP 2: Two-pointer check
   * Array: [1, 2, 3, 2, 1]
   * Indices: 0  1  2  3  4
   *
   * Comparison 1: left=0, right=4
   *   values[0] = 1, values[4] = 1
   *   1 === 1? YES! ✅
   *   Move: left=1, right=3
   *
   * Comparison 2: left=1, right=3
   *   values[1] = 2, values[3] = 2
   *   2 === 2? YES! ✅
   *   Move: left=2, right=2
   *
   * Check condition: left < right? 2 < 2? NO!
   * Loop ends (left reached right at middle element)
   *
   * Note: Middle element (3) doesn't need comparison
   * It automatically matches with itself!
   *
   * Result: true ✅ PALINDROME!
   */

  /**
   * ================================
   * DRY RUN - EXAMPLE 3 (NOT PALINDROME)
   * ================================
   *
   * Input: [1, 2, 3] (Not palindrome)
   *
   * List structure:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *
   * STEP 1: Copy to array
   * After traversal: values = [1, 2, 3]
   *
   * STEP 2: Two-pointer check
   * Array: [1, 2, 3]
   * Indices: 0  1  2
   *
   * Comparison 1: left=0, right=2
   *   values[0] = 1, values[2] = 3
   *   1 === 3? NO! ❌
   *
   * Visual:
   *   [1, 2, 3]
   *    ↑     ↑
   *   left  right
   *    1  ≠  3  ❌
   *
   * Mismatch found! Immediately return false
   *
   * Result: false ❌ NOT PALINDROME!
   */

  /**
   * ================================
   * ITERATION TABLE - EXAMPLE 1
   * ================================
   */
  /*
   * Input: [1, 2, 2, 1]
   *
   * PHASE 1: BUILD ARRAY
   * | Iteration | current node | current.val | values array | Action       |
   * |-----------|--------------|-------------|--------------|--------------|
   * | 1         | node(1)      | 1           | []           | Push 1       |
   * | 2         | node(2)      | 2           | [1]          | Push 2       |
   * | 3         | node(2)      | 2           | [1,2]        | Push 2       |
   * | 4         | node(1)      | 1           | [1,2,2]      | Push 1       |
   * | 5         | null         | -           | [1,2,2,1]    | Stop         |
   *
   * Final array: [1, 2, 2, 1]
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * PHASE 2: CHECK PALINDROME
   * | Comparison | left | right | values[left] | values[right] | Match? | Action          |
   * |------------|------|-------|--------------|---------------|--------|-----------------|
   * | 1          | 0    | 3     | 1            | 1             | ✅ Yes | Move pointers   |
   * | 2          | 1    | 2     | 2            | 2             | ✅ Yes | Move pointers   |
   * | -          | 2    | 1     | -            | -             | -      | left >= right, stop |
   *
   * Result: true (all comparisons matched)
   */

  /**
   * ================================
   * ITERATION TABLE - EXAMPLE 3 (NOT PALINDROME)
   * ================================
   */
  /*
   * Input: [1, 2]
   *
   * PHASE 1: BUILD ARRAY
   * | Iteration | current node | current.val | values array | Action       |
   * |-----------|--------------|-------------|--------------|--------------|
   * | 1         | node(1)      | 1           | []           | Push 1       |
   * | 2         | node(2)      | 2           | [1]          | Push 2       |
   * | 3         | null         | -           | [1,2]        | Stop         |
   *
   * Final array: [1, 2]
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * PHASE 2: CHECK PALINDROME
   * | Comparison | left | right | values[left] | values[right] | Match? | Action          |
   * |------------|------|-------|--------------|---------------|--------|-----------------|
   * | 1          | 0    | 1     | 1            | 2             | ❌ No  | Return false    |
   *
   * Result: false (mismatch found immediately)
   */

  /**
   * ================================
   * WHY THIS APPROACH WORKS
   * ================================
   *
   * Key Insight:
   * - Palindrome means symmetric: reads same forward and backward
   * - Linked list: Can only traverse forward
   * - Array: Can access from both ends simultaneously!
   *
   * Solution:
   * 1. Convert linked list to array (gives us backward access)
   * 2. Use two-pointer technique:
   *    - One pointer from start (left)
   *    - One pointer from end (right)
   *    - Compare and move towards center
   *
   * Example visualization:
   *
   * Array: [1, 2, 3, 2, 1]
   *
   * Step 1: Compare ends
   *   [1, 2, 3, 2, 1]
   *    ↑           ↑
   *    1    ==     1  ✅
   *
   * Step 2: Move inward
   *   [1, 2, 3, 2, 1]
   *       ↑     ↑
   *       2  == 2  ✅
   *
   * Step 3: Reached center (or crossed)
   *   Middle element (3) doesn't need check
   *   (It matches with itself!)
   *
   * Result: Palindrome! ✅
   */

  /**
   * ================================
   * EDGE CASES
   * ================================
   */

  /**
   * EDGE CASE 1: Empty list
   * Input: null
   *
   * No nodes to check
   * Considered palindrome (vacuous truth)
   *
   * Return: true
   */

  /**
   * EDGE CASE 2: Single node
   * Input: [1]
   *
   * ┌───┬────┐
   * │ 1 │null│
   * └───┴────┘
   *
   * Array: [1]
   * left = 0, right = 0
   * Condition: left < right? 0 < 0? NO
   * Loop doesn't execute
   *
   * Return: true (single element is always palindrome)
   */

  /**
   * EDGE CASE 3: Two nodes - palindrome
   * Input: [1, 1]
   *
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 1 │null│
   * └───┴────┘   └───┴────┘
   *
   * Array: [1, 1]
   * Comparison: values[0] === values[1]? 1 === 1? YES ✅
   *
   * Return: true
   */

  /**
   * EDGE CASE 4: Two nodes - not palindrome
   * Input: [1, 2]
   *
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │null│
   * └───┴────┘   └───┴────┘
   *
   * Array: [1, 2]
   * Comparison: values[0] === values[1]? 1 === 2? NO ❌
   *
   * Return: false
   */

  /**
   * EDGE CASE 5: All same values
   * Input: [5, 5, 5, 5]
   *
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 5 │ ●──┼──→│ 5 │ ●──┼──→│ 5 │ ●──┼──→│ 5 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *
   * Array: [5, 5, 5, 5]
   * All comparisons: 5 === 5? Always YES ✅
   *
   * Return: true (all same values = automatic palindrome)
   */

  /**
   * EDGE CASE 6: Long even palindrome
   * Input: [1, 2, 3, 4, 4, 3, 2, 1]
   *
   * Array: [1, 2, 3, 4, 4, 3, 2, 1]
   *
   * Comparisons:
   *   1 === 1 ✅
   *   2 === 2 ✅
   *   3 === 3 ✅
   *   4 === 4 ✅
   *
   * Return: true
   */

  /**
   * EDGE CASE 7: Long odd palindrome
   * Input: [1, 2, 3, 4, 5, 4, 3, 2, 1]
   *
   * Array: [1, 2, 3, 4, 5, 4, 3, 2, 1]
   * Middle element: 5 (index 4)
   *
   * Comparisons:
   *   1 === 1 ✅
   *   2 === 2 ✅
   *   3 === 3 ✅
   *   4 === 4 ✅
   *   (Middle 5 not compared)
   *
   * Return: true
   */

  /**
   * ================================
   * PROS AND CONS
   * ================================
   *
   * ✅ Advantages:
   * 1. Very simple to understand and implement
   * 2. Original list not modified (read-only operation)
   * 3. Easy to debug (can see array contents)
   * 4. Two-pointer technique is straightforward
   * 5. Works for all cases (even, odd, single, empty)
   *
   * ❌ Disadvantages:
   * 1. O(n) space complexity - stores all values in array
   * 2. Doesn't satisfy follow-up requirement (O(1) space needed)
   * 3. Extra memory allocation overhead
   * 4. Two-pass solution (traverse list + check array)
   *
   * When to use:
   * - ✅ Need simple, easy-to-understand solution
   * - ✅ Space is not a constraint
   * - ✅ Original list must not be modified
   * - ❌ Space-constrained environment (use optimal approach)
   * - ❌ Interview asks for O(1) space (use reverse half approach)
   */

  /**
   * ================================
   * COMPARISON: BRUTE FORCE VS OPTIMAL
   * ================================
   *
   * | Metric              | Brute Force (Array) | Optimal (Reverse Half) |
   * |---------------------|---------------------|------------------------|
   * | Time Complexity     | O(n)                | O(n)                   |
   * | Space Complexity    | O(n)                | O(1) ✅                |
   * | Modifies List       | No                  | Yes (temporarily)      |
   * | Ease of Coding      | Easy ✅             | Medium                 |
   * | Interview Score     | Good                | Excellent ✅           |
   * | Follow-up Satisfied | ❌ No               | ✅ Yes                 |
   *
   * Key Difference:
   * - Brute Force: Trade space for simplicity
   * - Optimal: Use clever pointer manipulation to save space
   */

  /**
   * ================================
   * COMMON MISTAKES
   * ================================
   */

  /**
   * MISTAKE 1: Forgetting to handle empty list
   *
   * ❌ WRONG:
   * function isPalindrome(head: ListNode | null): boolean {
   *   const values: number[] = [];
   *   let current = head;
   *   while (current !== null) {  // If head is null, loop doesn't run
   *     values.push(current.val);
   *     current = current.next;
   *   }
   *   // ... rest of code
   * }
   *
   * Problem: Works, but explicit check is clearer
   *
   * ✅ CORRECT:
   * if (head === null) return true;  // Explicit edge case
   */

  /**
   * MISTAKE 2: Wrong loop condition in comparison
   *
   * ❌ WRONG:
   * while (left <= right) {  // Wrong! Will compare middle twice in odd length
   *   if (values[left] !== values[right]) return false;
   *   left++;
   *   right--;
   * }
   *
   * Problem: For odd length [1,2,3,2,1], will compare 3 with itself unnecessarily
   *
   * ✅ CORRECT:
   * while (left < right) {  // Stops before or at middle
   *   if (values[left] !== values[right]) return false;
   *   left++;
   *   right--;
   * }
   */

  /**
   * MISTAKE 3: Not initializing right pointer correctly
   *
   * ❌ WRONG:
   * let right = values.length;  // Out of bounds!
   *
   * Problem: values.length is one past the last valid index
   * For array [1,2,3], length is 3 but last index is 2
   *
   * ✅ CORRECT:
   * let right = values.length - 1;  // Last valid index
   */

  /**
   * MISTAKE 4: Comparing indices instead of values
   *
   * ❌ WRONG:
   * if (left !== right) return false;  // Comparing indices!
   *
   * Problem: Indices will never be equal (one goes up, one goes down)
   *
   * ✅ CORRECT:
   * if (values[left] !== values[right]) return false;  // Compare values!
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Palindrome Linked List - Brute Force ===\n');

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

    // Helper function to print list
    // function printList(head: ListNode | null): string {
    //   if (head === null) return '[]';
    //
    //   const values: number[] = [];
    //   let current: ListNode | null = head;
    //
    //   while (current !== null) {
    //     values.push(current.val);
    //     current = current.next;
    //   }
    //
    //   return `[${values.join(',')}]`;
    // }

    // Test 1: Even length palindrome
    console.log('Test 1: Even length palindrome');
    console.log('Input: [1,2,2,1]');
    const list1 = createList([1, 2, 2, 1]);
    const result1 = isPalindrome(list1);
    console.log('Expected: true');
    console.log('Got:', result1);
    console.log('Test Pass:', result1 === true);
    console.log('---\n');

    // Test 2: Not palindrome
    console.log('Test 2: Not palindrome');
    console.log('Input: [1,2]');
    const list2 = createList([1, 2]);
    const result2 = isPalindrome(list2);
    console.log('Expected: false');
    console.log('Got:', result2);
    console.log('Test Pass:', result2 === false);
    console.log('---\n');

    // Test 3: Single node
    console.log('Test 3: Single node');
    console.log('Input: [1]');
    const list3 = createList([1]);
    const result3 = isPalindrome(list3);
    console.log('Expected: true');
    console.log('Got:', result3);
    console.log('Test Pass:', result3 === true);
    console.log('---\n');

    // Test 4: Empty list
    console.log('Test 4: Empty list');
    console.log('Input: []');
    const list4 = createList([]);
    const result4 = isPalindrome(list4);
    console.log('Expected: true');
    console.log('Got:', result4);
    console.log('Test Pass:', result4 === true);
    console.log('---\n');

    // Test 5: Odd length palindrome
    console.log('Test 5: Odd length palindrome');
    console.log('Input: [1,2,3,2,1]');
    const list5 = createList([1, 2, 3, 2, 1]);
    const result5 = isPalindrome(list5);
    console.log('Expected: true');
    console.log('Got:', result5);
    console.log('Test Pass:', result5 === true);
    console.log('---\n');

    // Test 6: All same values
    console.log('Test 6: All same values');
    console.log('Input: [5,5,5,5]');
    const list6 = createList([5, 5, 5, 5]);
    const result6 = isPalindrome(list6);
    console.log('Expected: true');
    console.log('Got:', result6);
    console.log('Test Pass:', result6 === true);
    console.log('---\n');

    // Test 7: Two nodes palindrome
    console.log('Test 7: Two nodes palindrome');
    console.log('Input: [1,1]');
    const list7 = createList([1, 1]);
    const result7 = isPalindrome(list7);
    console.log('Expected: true');
    console.log('Got:', result7);
    console.log('Test Pass:', result7 === true);
    console.log('---\n');

    // Test 8: Long palindrome
    console.log('Test 8: Long palindrome');
    console.log('Input: [1,2,3,4,4,3,2,1]');
    const list8 = createList([1, 2, 3, 4, 4, 3, 2, 1]);
    const result8 = isPalindrome(list8);
    console.log('Expected: true');
    console.log('Got:', result8);
    console.log('Test Pass:', result8 === true);
    console.log('---\n');

    // Test 9: Not palindrome (different at end)
    console.log('Test 9: Not palindrome (different at end)');
    console.log('Input: [1,2,3,4,5]');
    const list9 = createList([1, 2, 3, 4, 5]);
    const result9 = isPalindrome(list9);
    console.log('Expected: false');
    console.log('Got:', result9);
    console.log('Test Pass:', result9 === false);
    console.log('---\n');

    // Test 10: Not palindrome (different in middle)
    console.log('Test 10: Not palindrome (different in middle)');
    console.log('Input: [1,2,4,2,1]');
    const list10 = createList([1, 2, 4, 2, 1]);
    const result10 = isPalindrome(list10);
    console.log('Expected: false');
    console.log('Got:', result10);
    console.log('Test Pass:', result10 === false);
    console.log('---\n');

    console.log('✅ All tests completed!');
  }
}

// Run the tests
PalindromeLinkedListBruteForce.runTests();