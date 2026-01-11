/**
 * 907. Sum of Subarray Minimums - SINGLE PASS OPTIMIZATION
 *
 * Approach: Monotonic Stack (Single Pass)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * KEY DIFFERENCE FROM TWO-PASS:
 * Instead of finding PLE and NLE separately, we find both at the MOMENT we pop!
 *
 * CORE INSIGHT:
 * When we pop element from stack, we've found its RIGHT boundary (current index)
 * The stack top AFTER popping gives us its LEFT boundary
 */

namespace SumSubarrayMinsSinglePass {
  const MOD = 1_000_000_007;

  /**
   * Single Pass Solution - Calculate contribution while finding boundaries
   *
   * MAGIC MOMENT - When do we pop?
   * We pop element when we find someone SMALLER to its right
   * At that exact moment:
   *   - Current index `i` = RIGHT boundary (NLE)
   *   - Stack top after pop = LEFT boundary (PLE)
   *   - We can calculate contribution immediately!
   */
  export function sumSubarrayMins(arr: number[]): number {
    const stack: number[] = []; // Stores INDICES
    let ans = 0;

    // CRITICAL: Loop goes from 0 to arr.length (INCLUSIVE)
    // WHY? The extra iteration (i = arr.length) forces remaining elements to pop
    // Think of it as adding a virtual element "-Infinity" at the end
    for (let i = 0; i <= arr.length; i++) {
      // Pop condition: Current element is smaller OR we reached the end
      // WHY two conditions?
      // 1. arr[stack.top] > arr[i] → found smaller element (normal case)
      // 2. i === arr.length → end of array, force pop remaining (cleanup)
      while (
        stack.length > 0 &&
        (arr[stack[stack.length - 1]] > arr[i] || i === arr.length)
      ) {
        // THE MAGIC MOMENT - We're popping an element!
        // This element has found its boundaries:

        // mid = the element we're calculating contribution for
        // WHY called "mid"? It's in the MIDDLE of its range [left...mid...right]
        const mid = stack.pop()!;

        // Left boundary = Previous Less Element (PLE)
        // WHY? After popping mid, the stack top is the closest smaller element to LEFT
        // If stack empty → no smaller element to left → boundary is -1
        // EXAMPLE: stack = [1, 3, 5], pop 5 → stack.top = 3 is left boundary
        const leftBoundary = stack.length > 0 ? stack[stack.length - 1] : -1;

        // Right boundary = Next Less Element (NLE)
        // WHY? Current index `i` is the element that caused the pop
        //      (it's smaller than mid, that's why we're popping!)
        // EXAMPLE: i = 7, arr[7] = 2 caused pop of arr[5] = 5
        //          So 7 is the right boundary for element at index 5
        const rightBoundary = i;

        // Calculate contribution using the SAME formula as two-pass
        // leftCount = how many positions can START the subarray
        // rightCount = how many positions can END the subarray
        const leftCount = mid - leftBoundary;
        const rightCount = rightBoundary - mid;
        const count = leftCount * rightCount;

        // Add contribution
        const contribution = (arr[mid] * count) % MOD;
        ans = (ans + contribution) % MOD;
      }

      // Push current index to stack
      // WHY? It might be the left boundary for future elements
      // EDGE CASE: When i === arr.length, don't push (out of bounds)
      if (i < arr.length) {
        stack.push(i);
      }
    }

    return ans;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DETAILED EXPLANATION - WHY THIS WORKS
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Question: How does popping give us BOTH boundaries?
   *
   * Answer: Let's think step by step:
   *
   * 1. Stack maintains INCREASING order (monotonic increasing stack)
   *    Example: stack = [1, 3, 5, 7] (indices with increasing values)
   *
   * 2. We pop when we see a SMALLER element
   *    Example: Current element arr[8] = 2
   *             Stack top arr[7] = 7 > 2 → POP!
   *
   * 3. At the moment of popping index 7:
   *    - WHY are we popping? Because arr[8] = 2 is SMALLER
   *      → So index 8 is the RIGHT boundary (first smaller element to right)
   *      → This is our NLE!
   *
   *    - What's on stack after popping? Index 5 (value arr[5] = 5)
   *      → Index 5 is SMALLER than arr[7] (that's why it's still in stack)
   *      → So index 5 is the LEFT boundary (closest smaller element to left)
   *      → This is our PLE!
   *
   * 4. Range where arr[7] is minimum: from index 5 (exclusive) to 8 (exclusive)
   *    Subarrays: start from 6 or 7, end at 7
   *    leftCount = 7 - 5 = 2, rightCount = 8 - 7 = 1
   *    Total = 2 × 1 = 2 subarrays
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - VISUAL STEP BY STEP
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: arr = [3, 1, 2, 4]
   *                 0  1  2  3
   *
   * Expected Output: 17
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i = 0, arr[0] = 3
   * ───────────────────────────────────────────────────────────────────────────────
   *
   *   Current state:
   *   arr[0] = 3
   *   stack = []
   *   ans = 0
   *
   *   While condition: stack.length > 0? NO
   *   → Skip while loop
   *
   *   Push 0 to stack
   *
   *   After:
   *   stack = [0]  (represents value 3)
   *   ans = 0
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i = 1, arr[1] = 1
   * ───────────────────────────────────────────────────────────────────────────────
   *
   *   Current state:
   *   arr[1] = 1
   *   stack = [0]  (value 3)
   *   ans = 0
   *
   *   While condition:
   *   - stack.length > 0? YES
   *   - arr[stack.top] > arr[i]? arr[0]=3 > arr[1]=1? YES
   *   → Enter while loop
   *
   *   ┌─────────────────────────────────────────────────────────────────┐
   *   │ POP ELEMENT AT INDEX 0 (value = 3)                             │
   *   └─────────────────────────────────────────────────────────────────┘
   *
   *   mid = 0 (popped element)
   *
   *   leftBoundary:
   *   - stack.length > 0? NO (stack is now empty after pop)
   *   - leftBoundary = -1
   *
   *   rightBoundary:
   *   - rightBoundary = i = 1
   *   - WHY? Because arr[1]=1 is smaller, it caused the pop!
   *
   *   Calculate counts:
   *   leftCount = mid - leftBoundary = 0 - (-1) = 1
   *   rightCount = rightBoundary - mid = 1 - 0 = 1
   *   count = 1 × 1 = 1
   *
   *   Which subarrays?
   *   - Start from index 0 (1 choice)
   *   - End at index 0 (1 choice)
   *   - Subarray: [3]  min = 3 ✓
   *
   *   contribution = arr[0] × 1 = 3 × 1 = 3
   *   ans = 0 + 3 = 3
   *
   *   After:
   *   stack = []
   *   ans = 3
   *
   *   Push 1 to stack
   *   stack = [1]  (represents value 1)
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i = 2, arr[2] = 2
   * ───────────────────────────────────────────────────────────────────────────────
   *
   *   Current state:
   *   arr[2] = 2
   *   stack = [1]  (value 1)
   *   ans = 3
   *
   *   While condition:
   *   - stack.length > 0? YES
   *   - arr[stack.top] > arr[i]? arr[1]=1 > arr[2]=2? NO
   *   → Skip while loop (no pop needed)
   *
   *   Push 2 to stack
   *
   *   After:
   *   stack = [1, 2]  (values: 1, 2 - increasing order!)
   *   ans = 3
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i = 3, arr[3] = 4
   * ───────────────────────────────────────────────────────────────────────────────
   *
   *   Current state:
   *   arr[3] = 4
   *   stack = [1, 2]  (values: 1, 2)
   *   ans = 3
   *
   *   While condition:
   *   - stack.length > 0? YES
   *   - arr[stack.top] > arr[i]? arr[2]=2 > arr[3]=4? NO
   *   → Skip while loop (no pop needed)
   *
   *   Push 3 to stack
   *
   *   After:
   *   stack = [1, 2, 3]  (values: 1, 2, 4 - increasing order!)
   *   ans = 3
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i = 4 (CRITICAL - This is arr.length, out of bounds!)
   * ───────────────────────────────────────────────────────────────────────────────
   *
   *   Current state:
   *   i = 4 = arr.length (end of array)
   *   arr[4] = undefined
   *   stack = [1, 2, 3]  (values: 1, 2, 4)
   *   ans = 3
   *
   *   While condition:
   *   - stack.length > 0? YES
   *   - i === arr.length? YES! → TRUE
   *   → Enter while loop (force pop all remaining elements)
   *
   *   ┌─────────────────────────────────────────────────────────────────┐
   *   │ POP #1: Element at index 3 (value = 4)                         │
   *   └─────────────────────────────────────────────────────────────────┘
   *
   *   mid = 3
   *
   *   leftBoundary:
   *   - stack after pop = [1, 2]
   *   - stack.top = 2
   *   - leftBoundary = 2
   *
   *   rightBoundary:
   *   - rightBoundary = i = 4
   *   - WHY 4? We're at the end, so boundary is array length
   *
   *   Calculate:
   *   leftCount = 3 - 2 = 1
   *   rightCount = 4 - 3 = 1
   *   count = 1 × 1 = 1
   *
   *   Which subarrays?
   *   - Start from index 3 (1 choice)
   *   - End at index 3 (1 choice)
   *   - Subarray: [4]  min = 4 ✓
   *
   *   contribution = 4 × 1 = 4
   *   ans = 3 + 4 = 7
   *
   *   After:
   *   stack = [1, 2]
   *   ans = 7
   *
   *   ┌─────────────────────────────────────────────────────────────────┐
   *   │ POP #2: Element at index 2 (value = 2)                         │
   *   └─────────────────────────────────────────────────────────────────┘
   *
   *   mid = 2
   *
   *   leftBoundary:
   *   - stack after pop = [1]
   *   - stack.top = 1
   *   - leftBoundary = 1
   *
   *   rightBoundary:
   *   - rightBoundary = i = 4
   *
   *   Calculate:
   *   leftCount = 2 - 1 = 1
   *   rightCount = 4 - 2 = 2
   *   count = 1 × 2 = 2
   *
   *   Which subarrays?
   *   - Start from index 2 (1 choice)
   *   - End at index 2 or 3 (2 choices)
   *   - Subarrays: [2], [2,4]  both have min = 2 ✓
   *
   *   contribution = 2 × 2 = 4
   *   ans = 7 + 4 = 11
   *
   *   After:
   *   stack = [1]
   *   ans = 11
   *
   *   ┌─────────────────────────────────────────────────────────────────┐
   *   │ POP #3: Element at index 1 (value = 1)                         │
   *   └─────────────────────────────────────────────────────────────────┘
   *
   *   mid = 1
   *
   *   leftBoundary:
   *   - stack after pop = []
   *   - stack is empty
   *   - leftBoundary = -1
   *
   *   rightBoundary:
   *   - rightBoundary = i = 4
   *
   *   Calculate:
   *   leftCount = 1 - (-1) = 2
   *   rightCount = 4 - 1 = 3
   *   count = 2 × 3 = 6
   *
   *   Which subarrays?
   *   - Start from index 0 or 1 (2 choices)
   *   - End at index 1, 2, or 3 (3 choices)
   *   - Subarrays:
   *     [3,1], [3,1,2], [3,1,2,4],
   *     [1], [1,2], [1,2,4]
   *     All 6 have min = 1 ✓
   *
   *   contribution = 1 × 6 = 6
   *   ans = 11 + 6 = 17
   *
   *   After:
   *   stack = []
   *   ans = 17
   *
   *   While condition:
   *   - stack.length > 0? NO
   *   → Exit while loop
   *
   *   Don't push (i >= arr.length)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL ANSWER: 17 ✓
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * KEY INSIGHTS - WHY i <= arr.length?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Problem: What about elements that NEVER get popped during normal iteration?
   *
   * Example: arr = [3, 1, 2, 4]
   *          After i=3, stack = [1, 2, 3]
   *          These elements are in increasing order, so they never pop each other!
   *
   * Solution: Add one extra iteration where i = arr.length
   *           The condition `i === arr.length` becomes TRUE
   *           This forces ALL remaining elements to pop
   *
   * Think of it as: Pretending there's a virtual element "-Infinity" at the end
   *                 This element is smaller than everything, so it forces all pops
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * COMPARISON WITH TWO-PASS
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Two-Pass Approach:
   * 1. First pass: Find PLE for all elements → store in array
   * 2. Second pass: Find NLE for all elements → store in array
   * 3. Third pass: Calculate contributions using PLE and NLE arrays
   *
   * Single-Pass Approach:
   * 1. One pass: At moment of popping:
   *    - Right boundary (NLE) = current index i
   *    - Left boundary (PLE) = stack.top after pop
   *    - Calculate contribution immediately
   *
   * Advantage of Single-Pass:
   * ✅ More elegant
   * ✅ Slightly better constant factor (one loop vs three)
   * ✅ No need for extra PLE/NLE arrays
   *
   * Advantage of Two-Pass:
   * ✅ Easier to understand
   * ✅ Easier to debug
   * ✅ Clearer separation of concerns
   *
   * Both are O(n) time and O(n) space!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Sum of Subarray Minimums - SINGLE PASS\n');

    const tests: Array<{
      arr: number[];
      expected: number;
      description: string;
    }> = [
      {
        arr: [3, 1, 2, 4],
        expected: 17,
        description: 'Example 1 - Basic test',
      },
      {
        arr: [11, 81, 94, 43, 3],
        expected: 444,
        description: 'Example 2 - Larger array',
      },
      {
        arr: [5],
        expected: 5,
        description: 'Single element',
      },
      {
        arr: [1, 2, 3, 4],
        expected: 20,
        description: 'Increasing array',
      },
      {
        arr: [4, 3, 2, 1],
        expected: 20,
        description: 'Decreasing array',
      },
      {
        arr: [2, 2, 2],
        expected: 12,
        description: 'All equal values',
      },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
      const result = sumSubarrayMins(test.arr);
      const status = result === test.expected ? '✅ PASS' : '❌ FAIL';

      if (result === test.expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Description: ${test.description}`);
      console.log(`  Input:       [${test.arr.join(', ')}]`);
      console.log(`  Expected:    ${test.expected}`);
      console.log(`  Got:         ${result}`);
      console.log();
    });

    console.log('═══════════════════════════════════════════════════════');
    console.log(`Total Tests: ${tests.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log('═══════════════════════════════════════════════════════\n');

    if (failed === 0) {
      console.log('🎉 Single-pass approach mastered! 🚀\n');
    }
  }
}

// Execute tests
SumSubarrayMinsSinglePass.runTests();