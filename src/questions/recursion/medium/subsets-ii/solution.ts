/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LEETCODE - SUBSETS II (Medium)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Problem: Given an integer array nums that may contain duplicates,
 *          return all possible subsets (the power set).
 *          The solution set must NOT contain duplicate subsets.
 *
 * Example:
 *   Input: nums = [1,2,2]
 *   Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 *
 * Approach: Backtracking with Duplicate Skipping
 * Time Complexity: O(n × 2^n)
 * Space Complexity: O(n)
 *
 * Key Points:
 * - SORT array first (mandatory!)
 * - Add subset at EVERY recursive call
 * - Skip duplicates at same level: i > start && nums[i] == nums[i-1]
 * - Each element used maximum once
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace SubsetsII {
  /**
   * Main function to generate all unique subsets
   * @param nums - Input array (may contain duplicates)
   * @returns All unique subsets
   */
  function subsetsWithDup(nums: number[]): number[][] {
    // STEP 1: Sort array (MANDATORY!)
    // WHY: To group duplicate elements together
    // EXAMPLE: [2,1,2] → [1,2,2]
    //          Duplicates are now adjacent ↑↑
    nums.sort((a, b) => a - b);

    // STEP 2: Initialize result and current arrays
    const result: number[][] = [];
    const current: number[] = [];

    // STEP 3: Start backtracking from index 0
    backtrack(0, current, nums, result);

    // STEP 4: Return all unique subsets
    return result;
  }

  /**
   * Recursive backtracking function
   *
   * @param start - Starting index for current iteration
   * @param current - Current subset being built
   * @param nums - Sorted input array
   * @param result - All subsets collected so far
   *
   * Pattern: Loop-based recursion (NOT binary Pick/Skip tree!)
   */
  function backtrack(
    start: number,
    current: number[],
    nums: number[],
    result: number[][]
  ): void {
    // STEP 1: Add current subset to result (har call pe!)
    // WHY: Every state is a valid subset!
    // EXAMPLE: If current = [1], we add [1] as a subset
    // NOTE: We copy the array using [...current] to avoid reference issues
    result.push([...current]);

    // BASE CASE (Implicit):
    // Jab start >= nums.length, loop nahi chalega → automatic return
    // Explicit base case ki zaroorat nahi!

    // STEP 2: Try adding each remaining element
    // Loop se sare elements ko explore karte hain
    for (let i = start; i < nums.length; i++) {
      // SKIP DUPLICATES at same level
      // WHY: To avoid duplicate subsets
      // CONDITION: i > start && nums[i] === nums[i-1]
      //
      // EXPLANATION:
      // - i > start: We're not at the first element of this level
      // - nums[i] === nums[i-1]: Current element is same as previous
      //
      // EXAMPLE: nums = [1, 2, 2]
      //          When i=2 (second 2) at same level as i=1 (first 2)
      //          We skip to avoid duplicate subsets like [1,2] twice
      //
      // WHY i > start (not i > 0)?
      // - start ke baad wale duplicates hi skip karne hain
      // - Pehla occurrence use karna allowed hai
      if (i > start && nums[i] === nums[i - 1]) {
        continue; // Skip this duplicate element
      }

      // PICK: Add current element to subset
      // EXAMPLE: If nums[i] = 2, current = [1] → current = [1, 2]
      current.push(nums[i]);

      // RECURSE: Explore subsets including this element
      // WHY i + 1: Each element can be used maximum ONCE
      // EXAMPLE: After picking nums[1], we start from nums[2] onwards
      backtrack(i + 1, current, nums, result);

      // BACKTRACK: Remove element to try other possibilities
      // WHY: Restore state before this iteration
      // EXAMPLE: current = [1, 2] → current = [1]
      //          Now we can try adding next element instead
      current.pop();
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input: nums = [1, 2, 2]
   *
   * ═══════════════════════════════════════════════════════════════════════
   * INITIAL SETUP
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Input: nums = [1, 2, 2]
   * After sorting: [1, 2, 2]  ← Already sorted!
   *
   * Variables:
   * - result = []
   * - current = []
   * - start = 0
   *
   * Start: backtrack(0, [], [1,2,2], result)
   *
   * ═══════════════════════════════════════════════════════════════════════
   * CALL 1: backtrack(start=0, current=[])
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Step 1: Add current to result
   *   result.push([...[]]) → result.push([])
   *   result = [[]]  ← Empty subset added! ✓
   *
   * Step 2: Loop from i=0 to 2
   *
   * ┌─────────────────────────────────────────────────────────────────────
   * │ Iteration i=0: nums[0] = 1
   * ├─────────────────────────────────────────────────────────────────────
   * │ Skip check: i > start? → 0 > 0? NO
   * │   → Don't skip
   * │
   * │ Pick: current.push(1) → current = [1]
   * │
   * │ Recurse: backtrack(1, [1], [1,2,2], result)
   * │   ↓
   * │   ┌─────────────────────────────────────────────────────────────────
   * │   │ CALL 2: backtrack(start=1, current=[1])
   * │   ├─────────────────────────────────────────────────────────────────
   * │   │ Step 1: Add current to result
   * │   │   result.push([1])
   * │   │   result = [[], [1]]  ✓
   * │   │
   * │   │ Step 2: Loop from i=1 to 2
   * │   │
   * │   │ ┌───────────────────────────────────────────────────────────
   * │   │ │ Iteration i=1: nums[1] = 2
   * │   │ ├───────────────────────────────────────────────────────────
   * │   │ │ Skip check: i > start? → 1 > 1? NO
   * │   │ │   → Don't skip
   * │   │ │
   * │   │ │ Pick: current.push(2) → current = [1, 2]
   * │   │ │
   * │   │ │ Recurse: backtrack(2, [1,2], [1,2,2], result)
   * │   │ │   ↓
   * │   │ │   ┌─────────────────────────────────────────────────────
   * │   │ │   │ CALL 3: backtrack(start=2, current=[1,2])
   * │   │ │   ├─────────────────────────────────────────────────────
   * │   │ │   │ Step 1: Add current to result
   * │   │ │   │   result.push([1,2])
   * │   │ │   │   result = [[], [1], [1,2]]  ✓
   * │   │ │   │
   * │   │ │   │ Step 2: Loop from i=2 to 2
   * │   │ │   │
   * │   │ │   │ Iteration i=2: nums[2] = 2
   * │   │ │   │   Skip check: i > start? → 2 > 2? NO
   * │   │ │   │     → Don't skip
   * │   │ │   │
   * │   │ │   │   Pick: current.push(2) → current = [1, 2, 2]
   * │   │ │   │
   * │   │ │   │   Recurse: backtrack(3, [1,2,2], [1,2,2], result)
   * │   │ │   │     ↓
   * │   │ │   │     CALL 4: backtrack(start=3, current=[1,2,2])
   * │   │ │   │       Step 1: result.push([1,2,2])
   * │   │ │   │       result = [[], [1], [1,2], [1,2,2]]  ✓
   * │   │ │   │
   * │   │ │   │       Step 2: Loop from i=3 to 2
   * │   │ │   │         → Loop empty! (i=3 > 2)
   * │   │ │   │         → Return
   * │   │ │   │
   * │   │ │   │   Backtrack: current.pop() → current = [1, 2]
   * │   │ │   │
   * │   │ │   │ Loop done, return
   * │   │ │   └─────────────────────────────────────────────────────
   * │   │ │
   * │   │ │ Backtrack: current.pop() → current = [1]
   * │   │ │
   * │   │ ├───────────────────────────────────────────────────────────
   * │   │ │ Iteration i=2: nums[2] = 2
   * │   │ ├───────────────────────────────────────────────────────────
   * │   │ │ Skip check: i > start? → 2 > 1? YES
   * │   │ │             nums[2] === nums[1]? → 2 === 2? YES
   * │   │ │   → SKIP! ✓
   * │   │ │
   * │   │ │ WHY SKIP: Agar hum yahan se 2 pick karte,
   * │   │ │           toh [1,2] phir se ban jata (duplicate!)
   * │   │ │           Pehle hi i=1 pe [1,2] bana liya tha
   * │   │ └───────────────────────────────────────────────────────────
   * │   │
   * │   │ Loop done, return
   * │   └─────────────────────────────────────────────────────────────────
   * │
   * │ Backtrack: current.pop() → current = []
   * │
   * ├─────────────────────────────────────────────────────────────────────
   * │ Iteration i=1: nums[1] = 2
   * ├─────────────────────────────────────────────────────────────────────
   * │ Skip check: i > start? → 1 > 0? YES
   * │             nums[1] === nums[0]? → 2 === 1? NO
   * │   → Don't skip (values are different)
   * │
   * │ Pick: current.push(2) → current = [2]
   * │
   * │ Recurse: backtrack(2, [2], [1,2,2], result)
   * │   ↓
   * │   ┌─────────────────────────────────────────────────────────────────
   * │   │ CALL 5: backtrack(start=2, current=[2])
   * │   ├─────────────────────────────────────────────────────────────────
   * │   │ Step 1: Add current to result
   * │   │   result.push([2])
   * │   │   result = [[], [1], [1,2], [1,2,2], [2]]  ✓
   * │   │
   * │   │ Step 2: Loop from i=2 to 2
   * │   │
   * │   │ Iteration i=2: nums[2] = 2
   * │   │   Skip check: i > start? → 2 > 2? NO
   * │   │     → Don't skip
   * │   │
   * │   │   Pick: current.push(2) → current = [2, 2]
   * │   │
   * │   │   Recurse: backtrack(3, [2,2], [1,2,2], result)
   * │   │     ↓
   * │   │     CALL 6: backtrack(start=3, current=[2,2])
   * │   │       Step 1: result.push([2,2])
   * │   │       result = [[], [1], [1,2], [1,2,2], [2], [2,2]]  ✓
   * │   │
   * │   │       Step 2: Loop from i=3 to 2
   * │   │         → Loop empty! Return
   * │   │
   * │   │   Backtrack: current.pop() → current = [2]
   * │   │
   * │   │ Loop done, return
   * │   └─────────────────────────────────────────────────────────────────
   * │
   * │ Backtrack: current.pop() → current = []
   * │
   * ├─────────────────────────────────────────────────────────────────────
   * │ Iteration i=2: nums[2] = 2
   * ├─────────────────────────────────────────────────────────────────────
   * │ Skip check: i > start? → 2 > 0? YES
   * │             nums[2] === nums[1]? → 2 === 2? YES
   * │   → SKIP! ✓
   * │
   * │ WHY SKIP: Agar hum yahan se 2 se start karte,
   * │           toh [2] aur [2,2] phir se ban jate (duplicates!)
   * │           Already i=1 pe ban chuke hain
   * └─────────────────────────────────────────────────────────────────────
   *
   * Loop done, return
   *
   * ═══════════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═══════════════════════════════════════════════════════════════════════
   *
   * result = [[], [1], [1,2], [1,2,2], [2], [2,2]]
   *
   * Total subsets: 6 (NOT 2^3 = 8, because duplicates avoided)
   *
   * Key Observations:
   * ✓ Empty subset added at first call
   * ✓ Each recursive call adds its current state
   * ✓ Duplicates skipped at same level (i > start check)
   * ✓ Each element used maximum once (i+1 in recursion)
   * ✓ Backtracking restores state for next iteration
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Case 1: Single element
   *   Input: [1]
   *   Output: [[], [1]]
   *   Why: 2^1 = 2 subsets
   *
   * Case 2: All duplicates
   *   Input: [1,1,1]
   *   After sort: [1,1,1]
   *   Output: [[], [1], [1,1], [1,1,1]]
   *   Why: Only 4 subsets (not 2^3 = 8)
   *        We skip duplicates at same level
   *
   * Case 3: All distinct
   *   Input: [1,2,3]
   *   Output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
   *   Why: 2^3 = 8 subsets (no duplicates to skip)
   *
   * Case 4: Two pairs
   *   Input: [1,1,2,2]
   *   Output: [[], [1], [1,1], [1,1,2], [1,1,2,2], [1,2], [1,2,2],
   *            [2], [2,2]]
   *   Why: 9 subsets (not 2^4 = 16)
   */

  /**
   * Test runner with comprehensive test cases
   */
  export function runTests(): void {
    console.log("🧪 Testing Subsets II - Pure Recursion\n");

    // Test Case 1: Basic example from problem
    console.log("Test 1: Basic example [1,2,2]");
    const test1 = subsetsWithDup([1, 2, 2]);
    console.log("Input: [1,2,2]");
    console.log("Output:", JSON.stringify(test1));
    console.log("Expected: [[],[1],[1,2],[1,2,2],[2],[2,2]]");
    console.log(
      "Result:",
      test1.length === 6 &&
        JSON.stringify(test1.sort()) ===
          JSON.stringify([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]].sort())
        ? "✅ PASS"
        : "❌ FAIL"
    );
    console.log();

    // Test Case 2: Empty array
    console.log("Test 2: Empty array");
    const test2 = subsetsWithDup([]);
    console.log("Input: []");
    console.log("Output:", JSON.stringify(test2));
    console.log("Expected: [[]]");
    console.log("Result:", test2.length === 1 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 3: Single element
    console.log("Test 3: Single element [1]");
    const test3 = subsetsWithDup([1]);
    console.log("Input: [1]");
    console.log("Output:", JSON.stringify(test3));
    console.log("Expected: [[],[1]]");
    console.log("Result:", test3.length === 2 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 4: All duplicates
    console.log("Test 4: All duplicates [1,1,1]");
    const test4 = subsetsWithDup([1, 1, 1]);
    console.log("Input: [1,1,1]");
    console.log("Output:", JSON.stringify(test4));
    console.log("Expected: [[],[1],[1,1],[1,1,1]]");
    console.log("Result:", test4.length === 4 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 5: All distinct elements
    console.log("Test 5: All distinct [1,2,3]");
    const test5 = subsetsWithDup([1, 2, 3]);
    console.log("Input: [1,2,3]");
    console.log("Output:", JSON.stringify(test5));
    console.log("Expected: 2^3 = 8 subsets");
    console.log("Result:", test5.length === 8 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 6: Unsorted with duplicates
    console.log("Test 6: Unsorted array [2,1,2]");
    const test6 = subsetsWithDup([2, 1, 2]);
    console.log("Input: [2,1,2]");
    console.log("Output:", JSON.stringify(test6));
    console.log("Expected: [[],[1],[1,2],[1,2,2],[2],[2,2]]");
    console.log("Result:", test6.length === 6 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 7: Two pairs of duplicates
    console.log("Test 7: Two pairs [1,1,2,2]");
    const test7 = subsetsWithDup([1, 1, 2, 2]);
    console.log("Input: [1,1,2,2]");
    console.log("Output:", JSON.stringify(test7));
    console.log("Expected: 9 subsets");
    console.log("Result:", test7.length === 9 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 8: Negative numbers
    console.log("Test 8: Negative numbers [-1,0,1]");
    const test8 = subsetsWithDup([-1, 0, 1]);
    console.log("Input: [-1,0,1]");
    console.log("Output:", JSON.stringify(test8));
    console.log("Expected: 2^3 = 8 subsets");
    console.log("Result:", test8.length === 8 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 9: Large number of duplicates
    console.log("Test 9: Many duplicates [4,4,4,1,4]");
    const test9 = subsetsWithDup([4, 4, 4, 1, 4]);
    console.log("Input: [4,4,4,1,4]");
    console.log("Output:", JSON.stringify(test9));
    console.log("Expected: 10 subsets (4 fours + 1 one)");
    console.log("Result:", test9.length === 10 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 10: Two elements with duplicates
    console.log("Test 10: Two elements [0,0]");
    const test10 = subsetsWithDup([0, 0]);
    console.log("Input: [0,0]");
    console.log("Output:", JSON.stringify(test10));
    console.log("Expected: [[],[0],[0,0]]");
    console.log("Result:", test10.length === 3 ? "✅ PASS" : "❌ FAIL");
    console.log();

    console.log("═══════════════════════════════════════════════════════════");
    console.log("✨ All tests completed!");
    console.log("═══════════════════════════════════════════════════════════");
  }
}

// Execute all tests
SubsetsII.runTests();
