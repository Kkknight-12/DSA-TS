/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LEETCODE - COMBINATION SUM III (Medium)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Problem: Find all valid combinations of k numbers that sum up to n where:
 *          - Only numbers 1 through 9 are used
 *          - Each number is used at most once
 *
 * Example:
 *   Input: k = 3, n = 9
 *   Output: [[1,2,6],[1,3,5],[2,3,4]]
 *
 * Approach: Backtracking with Two-Condition Checking
 * Time Complexity: O(C(9,k)) where C(9,k) = 9!/(k!×(9-k)!)
 * Space Complexity: O(k) - recursion depth
 *
 * Key Points:
 * - Fixed range: 1 to 9 only
 * - Each number used at most once
 * - Must have exactly k numbers
 * - Must sum to exactly n
 * - Prune when sum > n or size > k
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace CombinationSumIII {
  /**
   * Main function to find all valid k-number combinations that sum to n
   * @param k - Number of elements in combination (exactly)
   * @param n - Target sum
   * @returns All valid combinations
   */
  function combinationSum3(k: number, n: number): number[][] {
    // Edge Case 1: Sum too large
    // WHY: Maximum possible sum with 9 numbers = 1+2+...+9 = 45
    // EXAMPLE: If n = 100, impossible! Max is 45
    if (n > 45) {
      return [];
    }

    // Edge Case 2: Sum too small for k numbers
    // WHY: Minimum sum with k numbers = 1+2+...+k = k*(k+1)/2
    // EXAMPLE: k=4, minimum sum = 1+2+3+4 = 10
    //          If n=5, impossible! We need at least 10
    const minSum = (k * (k + 1)) / 2;
    if (n < minSum) {
      return [];
    }

    // Edge Case 3: k is larger than 9
    // WHY: Only 9 numbers available (1-9)
    // EXAMPLE: k=10, impossible! Can't pick 10 numbers
    if (k > 9) {
      return [];
    }

    // STEP 1: Initialize result array
    const result: number[][] = [];

    // STEP 2: Initialize current combination array
    const current: number[] = [];

    // STEP 3: Start backtracking from 1 with sum = 0
    // WHY: Numbers start from 1 (not 0), initial sum is 0
    backtrack(1, 0, current, k, n, result);

    // STEP 4: Return all valid combinations
    return result;
  }

  /**
   * Recursive backtracking function
   *
   * @param start - Starting number to consider (1-9)
   * @param currentSum - Current sum of numbers in combination
   * @param current - Current combination being built
   * @param k - Target size of combination
   * @param n - Target sum
   * @param result - All valid combinations collected
   *
   * Pattern: Try each number 1-9, check both conditions (size + sum)
   */
  function backtrack(
    start: number,
    currentSum: number,
    current: number[],
    k: number,
    n: number,
    result: number[][]
  ): void {
    // BASE CASE 1: Success - Both conditions satisfied! ✓
    // WHY: We need EXACTLY k numbers AND sum must equal n
    // EXAMPLE: k=3, n=9, current=[1,2,6]
    //          current.length = 3 = k ✓
    //          currentSum = 9 = n ✓
    //          Valid combination!
    if (current.length === k && currentSum === n) {
      result.push([...current]); // Copy array to avoid reference issues
      return; // Stop this path, we found a valid combination
    }

    // PRUNING 1: Too many numbers
    // WHY: If we already have more than k numbers, invalid!
    // EXAMPLE: k=3, but current = [1,2,3,4] (4 numbers)
    //          No point continuing
    if (current.length > k) {
      return;
    }

    // PRUNING 2: Sum exceeded
    // WHY: If sum already > n, adding more will only increase it
    // EXAMPLE: n=9, currentSum=10
    //          Even if we add nothing, sum is too large
    //          Can't reduce sum by adding positive numbers!
    if (currentSum > n) {
      return;
    }

    // PRUNING 3: Reached k numbers but wrong sum
    // WHY: We have exactly k numbers but sum ≠ n, invalid!
    // EXAMPLE: k=3, n=9, current=[1,2,3]
    //          size=3✓ but sum=6≠9
    //          No point continuing (we can't change current combo)
    if (current.length === k && currentSum !== n) {
      return;
    }

    // RECURSIVE CASE: Try each number from start to 9
    // WHY: We explore all possibilities
    // EXAMPLE: If start=2, try 2,3,4,5,6,7,8,9
    for (let i = start; i <= 9; i++) {
      // PICK: Add current number i to combination
      // WHY: We're exploring the path with this number
      // EXAMPLE: If current=[1,2], add 6 → current=[1,2,6]
      current.push(i);

      // Update sum
      // EXAMPLE: currentSum=3, i=6 → newSum=9
      const newSum = currentSum + i;

      // RECURSE: Try next numbers (i+1 to 9)
      // WHY: Each number used at most once, so start from i+1
      // IMPORTANT: We pass i+1 (not i) to avoid reusing same number
      // EXAMPLE: After picking 6, next try starts from 7
      backtrack(i + 1, newSum, current, k, n, result);

      // BACKTRACK: Remove the number we just added
      // WHY: To try other numbers at this position
      // EXAMPLE: After exploring [1,2,6] path, remove 6
      //          current becomes [1,2] again
      //          Next iteration: try 7 → [1,2,7]
      current.pop();
    }

    // After loop, we've tried all numbers from start to 9
    // Return to previous recursion level
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input: k = 3, n = 9
   *
   * ═══════════════════════════════════════════════════════════════════════
   * INITIAL SETUP
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Input: k = 3, n = 9
   *
   * Edge cases check:
   * - n > 45? 9 > 45? NO ✓
   * - minSum = 3*(3+1)/2 = 6
   * - n < minSum? 9 < 6? NO ✓
   * - k > 9? 3 > 9? NO ✓
   *
   * Variables:
   * - result = []
   * - current = []
   * - start = 1
   * - currentSum = 0
   *
   * Start: backtrack(1, 0, [], 3, 9, result)
   *
   * ═══════════════════════════════════════════════════════════════════════
   * CALL 1: backtrack(start=1, sum=0, current=[])
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Base cases:
   * - length === k && sum === n? 0 === 3 && 0 === 9? NO
   * - length > k? 0 > 3? NO
   * - sum > n? 0 > 9? NO
   * - length === k && sum ≠ n? 0 === 3? NO
   *
   * Loop from i=1 to 9
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=1: Pick number 1
   * ├────────────────────────────────────────────────────────────────────
   * │ current.push(1) → current = [1]
   * │ newSum = 0 + 1 = 1
   * │ Recurse: backtrack(2, 1, [1], 3, 9, result)
   * │   ↓
   * │   ┌────────────────────────────────────────────────────────────────
   * │   │ CALL 2: backtrack(start=2, sum=1, current=[1])
   * │   ├────────────────────────────────────────────────────────────────
   * │   │ Base cases: All NO
   * │   │
   * │   │ Loop from i=2 to 9
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=2: Pick number 2
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ current.push(2) → current = [1, 2]
   * │   │ │ newSum = 1 + 2 = 3
   * │   │ │ Recurse: backtrack(3, 3, [1,2], 3, 9, result)
   * │   │ │   ↓
   * │   │ │   ┌──────────────────────────────────────────────────
   * │   │ │   │ CALL 3: backtrack(start=3, sum=3, current=[1,2])
   * │   │ │   ├──────────────────────────────────────────────────
   * │   │ │   │ Base cases: All NO
   * │   │ │   │
   * │   │ │   │ Loop from i=3 to 9
   * │   │ │   │
   * │   │ │   │ ┌── i=3: Pick 3 ────────────────────────┐
   * │   │ │   │ │ current = [1,2,3], sum = 6           │
   * │   │ │   │ │ Recurse: backtrack(4, 6, [1,2,3])   │
   * │   │ │   │ │   Base case check:                    │
   * │   │ │   │ │   length===k && sum===n? 3===3 && 6===9? NO
   * │   │ │   │ │   length===k && sum≠n? 3===3 && 6≠9? YES!
   * │   │ │   │ │   → PRUNE! Return ❌                  │
   * │   │ │   │ │ Back to CALL 3                        │
   * │   │ │   │ │ current.pop() → [1, 2]               │
   * │   │ │   │ └───────────────────────────────────────┘
   * │   │ │   │
   * │   │ │   │ ┌── i=4: Pick 4 ────────────────────────┐
   * │   │ │   │ │ current = [1,2,4], sum = 7           │
   * │   │ │   │ │ Recurse: backtrack(5, 7, [1,2,4])   │
   * │   │ │   │ │   length===k && sum≠n? 3===3 && 7≠9? YES!
   * │   │ │   │ │   → PRUNE! Return ❌                  │
   * │   │ │   │ │ current.pop() → [1, 2]               │
   * │   │ │   │ └───────────────────────────────────────┘
   * │   │ │   │
   * │   │ │   │ ┌── i=5: Pick 5 ────────────────────────┐
   * │   │ │   │ │ current = [1,2,5], sum = 8           │
   * │   │ │   │ │ Recurse: backtrack(6, 8, [1,2,5])   │
   * │   │ │   │ │   length===k && sum≠n? 3===3 && 8≠9? YES!
   * │   │ │   │ │   → PRUNE! Return ❌                  │
   * │   │ │   │ │ current.pop() → [1, 2]               │
   * │   │ │   │ └───────────────────────────────────────┘
   * │   │ │   │
   * │   │ │   │ ┌── i=6: Pick 6 ────────────────────────┐
   * │   │ │   │ │ current = [1,2,6], sum = 9           │
   * │   │ │   │ │ Recurse: backtrack(7, 9, [1,2,6])   │
   * │   │ │   │ │   Base case check:                    │
   * │   │ │   │ │   length===k && sum===n?             │
   * │   │ │   │ │   3===3 && 9===9? YES! ✓             │
   * │   │ │   │ │   result.push([1,2,6])               │
   * │   │ │   │ │   result = [[1,2,6]]  ✓              │
   * │   │ │   │ │   Return                              │
   * │   │ │   │ │ Back to CALL 3                        │
   * │   │ │   │ │ current.pop() → [1, 2]               │
   * │   │ │   │ └───────────────────────────────────────┘
   * │   │ │   │
   * │   │ │   │ ┌── i=7: Pick 7 ────────────────────────┐
   * │   │ │   │ │ current = [1,2,7], sum = 10          │
   * │   │ │   │ │ Recurse: backtrack(8, 10, [1,2,7])  │
   * │   │ │   │ │   sum > n? 10 > 9? YES!              │
   * │   │ │   │ │   → PRUNE! Return ❌                  │
   * │   │ │   │ │ current.pop() → [1, 2]               │
   * │   │ │   │ └───────────────────────────────────────┘
   * │   │ │   │
   * │   │ │   │ i=8, i=9: sum will be even larger
   * │   │ │   │           → All pruned ❌
   * │   │ │   │
   * │   │ │   │ Loop done, return to CALL 2
   * │   │ │   └──────────────────────────────────────────────────
   * │   │ │
   * │   │ │ Back to CALL 2
   * │   │ │ current.pop() → current = [1]
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=3: Pick number 3
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ current.push(3) → current = [1, 3]
   * │   │ │ newSum = 1 + 3 = 4
   * │   │ │ Recurse: backtrack(4, 4, [1,3], 3, 9, result)
   * │   │ │   ↓
   * │   │ │   Loop from i=4 to 9
   * │   │ │
   * │   │ │   i=4: [1,3,4] sum=8, length=3
   * │   │ │         length===k && sum≠n? YES → PRUNE ❌
   * │   │ │
   * │   │ │   i=5: [1,3,5] sum=9, length=3
   * │   │ │         length===k && sum===n? YES! ✓
   * │   │ │         result.push([1,3,5])
   * │   │ │         result = [[1,2,6], [1,3,5]]  ✓
   * │   │ │
   * │   │ │   i=6: [1,3,6] sum=10 > 9 → PRUNE ❌
   * │   │ │   i=7,8,9: All sums > 9 → PRUNE ❌
   * │   │ │
   * │   │ │ current.pop() → [1]
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ i=4,5,6,7,8,9: Similar process
   * │   │               But sums will be larger, won't find k=3
   * │   │
   * │   │ Loop done, return to CALL 1
   * │   └────────────────────────────────────────────────────────────────
   * │
   * │ Back to CALL 1
   * │ current.pop() → current = []
   * └────────────────────────────────────────────────────────────────────
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=2: Pick number 2
   * ├────────────────────────────────────────────────────────────────────
   * │ current.push(2) → current = [2]
   * │ newSum = 0 + 2 = 2
   * │ Recurse: backtrack(3, 2, [2], 3, 9, result)
   * │   ↓
   * │   CALL: backtrack(start=3, sum=2, current=[2])
   * │   Loop from i=3 to 9
   * │
   * │   i=3: current=[2,3], sum=5
   * │         Recurse from 4 to 9
   * │
   * │         i=4: [2,3,4] sum=9, length=3 ✓
   * │              result.push([2,3,4])
   * │              result = [[1,2,6],[1,3,5],[2,3,4]]  ✓
   * │
   * │         i=5: [2,3,5] sum=10 > 9 → PRUNE ❌
   * │         i=6,7,8,9: All > 9 → PRUNE ❌
   * │
   * │   i=4,5,6...: Sums too large, no valid k=3 found
   * │
   * │ current.pop() → []
   * └────────────────────────────────────────────────────────────────────
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=3 onwards
   * ├────────────────────────────────────────────────────────────────────
   * │ i=3: [3], need 2 more with sum=6
   * │      Min sum from [4,5] = 9, already > 6
   * │      No valid combinations
   * │
   * │ i=4 onwards: Even larger, no valid k=3 with sum=9
   * └────────────────────────────────────────────────────────────────────
   *
   * ═══════════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═══════════════════════════════════════════════════════════════════════
   *
   * result = [[1,2,6], [1,3,5], [2,3,4]]
   *
   * Total: 3 valid combinations
   *
   * Verification:
   * ✓ [1,2,6]: 1+2+6 = 9, length = 3
   * ✓ [1,3,5]: 1+3+5 = 9, length = 3
   * ✓ [2,3,4]: 2+3+4 = 9, length = 3
   *
   * Key Observations:
   * ✓ Two conditions checked: size = k AND sum = n
   * ✓ Pruning saved many calls (sum > n stopped early)
   * ✓ No duplicates (each number used once, start from i+1)
   * ✓ Ordered combinations ([1,2,6] not [6,2,1])
   *
   * ═══════════════════════════════════════════════════════════════════════
   * PRUNING EFFECTIVENESS
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Without pruning: Would check ALL paths
   * With pruning: Stop early when:
   *   - sum > n (can't reduce by adding positive numbers)
   *   - size > k (already too many numbers)
   *   - size = k but sum ≠ n (can't change this combo)
   *
   * Example pruning saves:
   *   [1,2,7]: sum=10 > 9 → Stopped! ✓
   *   [1,2,8]: Would be checked without pruning ❌
   *   [1,2,9]: Would be checked without pruning ❌
   *   Saved 2 unnecessary calls!
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Case 1: Impossible - sum too large
   *   k=2, n=100
   *   Max sum = 8+9 = 17 < 100
   *   Edge case caught at start! Return []
   *
   * Case 2: Impossible - sum too small
   *   k=4, n=1
   *   Min sum = 1+2+3+4 = 10 > 1
   *   Edge case caught at start! Return []
   *
   * Case 3: Only one solution
   *   k=9, n=45
   *   Only way: [1,2,3,4,5,6,7,8,9]
   *   Sum = 45, all numbers used
   *
   * Case 4: No solution
   *   k=3, n=6
   *   Min sum = 1+2+3 = 6 ✓
   *   Only combination: [1,2,3] sum=6 ✓
   *   Output: [[1,2,3]]
   */

  /**
   * Test runner with comprehensive test cases
   */
  export function runTests(): void {
    console.log('🧪 Testing Combination Sum III - Backtracking\n');

    // Test Case 1: Basic example from problem
    console.log('Test 1: Basic example k=3, n=7');
    const test1 = combinationSum3(3, 7);
    console.log('Input: k=3, n=7');
    console.log('Output:', test1);
    console.log('Expected: [[1,2,4]]');
    console.log(
      'Result:',
      test1.length === 1 &&
        JSON.stringify(test1[0]) === JSON.stringify([1, 2, 4])
        ? '✅ PASS'
        : '❌ FAIL'
    );
    console.log();

    // Test Case 2: Multiple solutions
    console.log('Test 2: Multiple solutions k=3, n=9');
    const test2 = combinationSum3(3, 9);
    console.log('Input: k=3, n=9');
    console.log('Output:', test2);
    console.log('Expected: [[1,2,6],[1,3,5],[2,3,4]]');
    console.log('Result:', test2.length === 3 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 3: Impossible - sum too small
    console.log('Test 3: Impossible k=4, n=1');
    const test3 = combinationSum3(4, 1);
    console.log('Input: k=4, n=1');
    console.log('Output:', test3);
    console.log('Expected: []');
    console.log('Result:', test3.length === 0 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 4: Single number
    console.log('Test 4: Single number k=1, n=5');
    const test4 = combinationSum3(1, 5);
    console.log('Input: k=1, n=5');
    console.log('Output:', test4);
    console.log('Expected: [[5]]');
    console.log(
      'Result:',
      test4.length === 1 && test4[0][0] === 5 ? '✅ PASS' : '❌ FAIL'
    );
    console.log();

    // Test Case 5: Use all numbers
    console.log('Test 5: Use all numbers k=9, n=45');
    const test5 = combinationSum3(9, 45);
    console.log('Input: k=9, n=45');
    console.log('Output:', test5);
    console.log('Expected: [[1,2,3,4,5,6,7,8,9]]');
    console.log(
      'Result:',
      test5.length === 1 && test5[0].length === 9 ? '✅ PASS' : '❌ FAIL'
    );
    console.log();

    // Test Case 6: Two numbers
    console.log('Test 6: Two numbers k=2, n=5');
    const test6 = combinationSum3(2, 5);
    console.log('Input: k=2, n=5');
    console.log('Output:', test6);
    console.log('Expected: [[1,4],[2,3]]');
    console.log('Result:', test6.length === 2 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 7: Impossible - sum too large
    console.log('Test 7: Impossible k=2, n=100');
    const test7 = combinationSum3(2, 100);
    console.log('Input: k=2, n=100');
    console.log('Output:', test7);
    console.log('Expected: []');
    console.log('Result:', test7.length === 0 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 8: Minimum sum for k
    console.log('Test 8: Minimum sum k=3, n=6');
    const test8 = combinationSum3(3, 6);
    console.log('Input: k=3, n=6');
    console.log('Output:', test8);
    console.log('Expected: [[1,2,3]]');
    console.log(
      'Result:',
      test8.length === 1 &&
        JSON.stringify(test8[0]) === JSON.stringify([1, 2, 3])
        ? '✅ PASS'
        : '❌ FAIL'
    );
    console.log();

    // Test Case 9: Larger k
    console.log('Test 9: Larger k k=4, n=10');
    const test9 = combinationSum3(4, 10);
    console.log('Input: k=4, n=10');
    console.log('Output:', test9);
    console.log('Expected: [[1,2,3,4]]');
    console.log(
      'Result:',
      test9.length === 1 &&
        JSON.stringify(test9[0]) === JSON.stringify([1, 2, 3, 4])
        ? '✅ PASS'
        : '❌ FAIL'
    );
    console.log();

    // Test Case 10: Multiple solutions with k=2
    console.log('Test 10: Multiple k=2, n=10');
    const test10 = combinationSum3(2, 10);
    console.log('Input: k=2, n=10');
    console.log('Output:', test10);
    console.log('Expected: [[1,9],[2,8],[3,7],[4,6]]');
    console.log('Result:', test10.length === 4 ? '✅ PASS' : '❌ FAIL');
    console.log();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('✨ All tests completed!');
    console.log('═══════════════════════════════════════════════════════════');
  }
}

// Execute all tests
CombinationSumIII.runTests();