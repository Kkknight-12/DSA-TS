/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * BINARY SUBARRAYS WITH SUM - BRUTE FORCE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Count number of subarrays with sum exactly equal to goal
 *          (Binary array - only 0s and 1s)
 *
 * Key Insight: COUNTING problem, not FINDING longest/shortest
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   Unlike previous sliding window problems:
 *   - We need to COUNT subarrays, not find max length
 *   - We need EXACTLY goal, not "at most" goal
 *
 *   This makes it a different type of problem!
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Approach: Brute Force - Check ALL possible subarrays
 * - For each starting position i
 * - Try all ending positions j (from i to end)
 * - Track running sum
 * - If sum == goal, increment count
 * - If sum > goal, break (optimization for binary array)
 *
 * Time Complexity: O(n²) - nested loops
 * Space Complexity: O(1) - only using variables
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace BinarySubarraysWithSumBruteForce {
  /**
   * Count subarrays with sum exactly equal to goal - BRUTE FORCE
   *
   * @param nums - Binary array (only 0s and 1s)
   * @param goal - Target sum
   * @returns Number of subarrays with sum = goal
   */
  function numSubarraysWithSum(nums: number[], goal: number): number {
    let count = 0;

    // ═══════════════════════════════════════════════════════════════
    // OUTER LOOP: Try each starting position
    // ═══════════════════════════════════════════════════════════════

    for (let i = 0; i < nums.length; i++) {
      // Track running sum for current starting position
      // Reset for each new starting position
      let sum = 0;

      // ═══════════════════════════════════════════════════════════════
      // INNER LOOP: Try each ending position
      // ═══════════════════════════════════════════════════════════════

      for (let j = i; j < nums.length; j++) {
        // ─────────────────────────────────────────────────────────────
        // STEP 1: Add current element to sum
        // ─────────────────────────────────────────────────────────────
        sum += nums[j];

        // ─────────────────────────────────────────────────────────────
        // STEP 2: Check if sum equals goal
        // ─────────────────────────────────────────────────────────────
        if (sum === goal) {
          // Found a valid subarray! Increment count
          count++;
        }

        // ─────────────────────────────────────────────────────────────
        // STEP 3: Optimization - Break if sum exceeds goal
        // ─────────────────────────────────────────────────────────────
        //
        // ┌────────────────────────────────────────────────────────────┐
        // │  WHY CAN WE BREAK?                                         │
        // │                                                            │
        // │  This is a BINARY array (only 0s and 1s)!                  │
        // │                                                            │
        // │  If sum > goal:                                            │
        // │  - Adding more elements can only ADD 0 or 1                │
        // │  - Sum can only INCREASE or STAY SAME                      │
        // │  - It can NEVER decrease back to goal!                     │
        // │                                                            │
        // │  So we can safely break and try next starting position.    │
        // │                                                            │
        // │  NOTE: This works for binary arrays only!                  │
        // │        For arrays with negative numbers, can't break.      │
        // └────────────────────────────────────────────────────────────┘
        //
        // IMPORTANT: We do NOT break when sum === goal!
        // WHY? Because there might be zeros ahead!
        //
        // Example: nums = [1,0,0,1], goal = 1
        //   i=0, j=0: sum=1 ✅ count++
        //   i=0, j=1: sum=1 ✅ count++ (added 0, sum unchanged!)
        //   i=0, j=2: sum=1 ✅ count++ (added 0, sum unchanged!)
        //   i=0, j=3: sum=2 > 1, NOW break
        //
        // The zeros let us extend the subarray while keeping sum = goal!

        if (sum > goal) {
          break;
        }
      }
    }

    return count;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example 1: nums = [1, 0, 1, 0, 1], goal = 2
   *            Index:  0  1  2  3  4
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 0 (Start from index 0)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=0: sum = 0 + 1 = 1, sum != 2, continue
   *      Subarray: [1]
   *
   * j=1: sum = 1 + 0 = 1, sum != 2, continue
   *      Subarray: [1, 0]
   *
   * j=2: sum = 1 + 1 = 2, sum == 2 ✅ count = 1
   *      Subarray: [1, 0, 1] ← Found!
   *
   * j=3: sum = 2 + 0 = 2, sum == 2 ✅ count = 2
   *      Subarray: [1, 0, 1, 0] ← Found! (trailing 0 doesn't change sum)
   *
   * j=4: sum = 2 + 1 = 3, sum > 2, BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 1 (Start from index 1)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=1: sum = 0, sum != 2, continue
   *      Subarray: [0]
   *
   * j=2: sum = 0 + 1 = 1, sum != 2, continue
   *      Subarray: [0, 1]
   *
   * j=3: sum = 1 + 0 = 1, sum != 2, continue
   *      Subarray: [0, 1, 0]
   *
   * j=4: sum = 1 + 1 = 2, sum == 2 ✅ count = 3
   *      Subarray: [0, 1, 0, 1] ← Found!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 2 (Start from index 2)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=2: sum = 1, sum != 2, continue
   *      Subarray: [1]
   *
   * j=3: sum = 1 + 0 = 1, sum != 2, continue
   *      Subarray: [1, 0]
   *
   * j=4: sum = 1 + 1 = 2, sum == 2 ✅ count = 4
   *      Subarray: [1, 0, 1] ← Found!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 3 (Start from index 3)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=3: sum = 0, sum != 2, continue
   * j=4: sum = 0 + 1 = 1, sum != 2, continue
   * (end of array)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 4 (Start from index 4)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=4: sum = 1, sum != 2, continue
   * (end of array)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: count = 4
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * The 4 subarrays with sum = 2:
   * 1. [1, 0, 1]    indices 0-2
   * 2. [1, 0, 1, 0] indices 0-3
   * 3. [0, 1, 0, 1] indices 1-4
   * 4. [1, 0, 1]    indices 2-4
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN 2: nums = [0, 0, 0, 0, 0], goal = 0
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Every subarray has sum = 0!
   *
   * i=0: j=0,1,2,3,4 → all have sum=0 ✅ → 5 subarrays
   * i=1: j=1,2,3,4   → all have sum=0 ✅ → 4 subarrays
   * i=2: j=2,3,4     → all have sum=0 ✅ → 3 subarrays
   * i=3: j=3,4       → all have sum=0 ✅ → 2 subarrays
   * i=4: j=4         → sum=0 ✅ → 1 subarray
   *
   * Total = 5 + 4 + 3 + 2 + 1 = 15 subarrays
   *
   * Formula: n*(n+1)/2 = 5*6/2 = 15 ✅
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(n²)?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Outer loop: n starting positions           → O(n)
   * Inner loop: up to n ending positions each  → O(n)
   *                                            ─────────
   * Total:                                       O(n²)
   *
   * The break optimization helps in practice but worst case
   * (like all zeros with goal=0) still requires checking all pairs.
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * IMPORTANT: Why NOT break on sum === goal?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌────────────────────────────────────────────────────────────────┐
   * │  WRONG: break when sum === goal                               │
   * │                                                                │
   * │  nums = [1, 0, 0, 1], goal = 1                                 │
   * │                                                                │
   * │  i=0:                                                          │
   * │    j=0: sum=1 ✅ count++ (WRONG: if we break here...)          │
   * │    j=1: sum=1 ✅ count++ (we miss this!)                       │
   * │    j=2: sum=1 ✅ count++ (and this!)                           │
   * │    j=3: sum=2 > 1, break                                       │
   * │                                                                │
   * │  Zeros don't change sum! So same sum continues.               │
   * │  Only break when sum EXCEEDS goal.                            │
   * └────────────────────────────────────────────────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. goal = 0, all zeros: Every subarray is valid
   * 2. goal = 0, has 1s: Only subarrays with all zeros are valid
   * 3. goal > n: Impossible, return 0
   * 4. Single element: Check if nums[0] === goal
   * 5. All ones: Only subarrays of length = goal are valid
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Binary Subarrays With Sum - BRUTE FORCE\n");
    console.log("═".repeat(60) + "\n");

    const testCases: {
      nums: number[];
      goal: number;
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        nums: [1, 0, 1, 0, 1],
        goal: 2,
        expected: 4,
        description: "Example 1 - mixed array",
      },
      {
        nums: [0, 0, 0, 0, 0],
        goal: 0,
        expected: 15,
        description: "Example 2 - all zeros, goal=0",
      },

      // Edge cases
      {
        nums: [1],
        goal: 1,
        expected: 1,
        description: "Single element = goal",
      },
      {
        nums: [1],
        goal: 0,
        expected: 0,
        description: "Single element != goal",
      },
      {
        nums: [0],
        goal: 0,
        expected: 1,
        description: "Single zero, goal=0",
      },

      // Goal = 0 cases
      {
        nums: [0, 0, 0],
        goal: 0,
        expected: 6,
        description: "All zeros - n*(n+1)/2 = 6",
      },
      {
        nums: [1, 0, 0, 1],
        goal: 0,
        expected: 3,
        description: "Zeros between ones",
      },

      // All ones
      {
        nums: [1, 1, 1, 1],
        goal: 2,
        expected: 3,
        description: "All ones, goal=2 → 3 pairs",
      },
      {
        nums: [1, 1, 1, 1, 1],
        goal: 3,
        expected: 3,
        description: "All ones, goal=3 → 3 triplets",
      },

      // Trailing zeros matter
      {
        nums: [1, 0, 0, 0],
        goal: 1,
        expected: 4,
        description: "Trailing zeros extend valid subarrays",
      },

      // Leading zeros matter
      {
        nums: [0, 0, 0, 1],
        goal: 1,
        expected: 4,
        description: "Leading zeros create more starting points",
      },

      // Complex case
      {
        nums: [0, 1, 1, 0, 1],
        goal: 2,
        expected: 5,
        description: "Complex mixed case",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { nums, goal, expected, description } = testCases[i];
      const result = numSubarraysWithSum(nums, goal);
      const status = result === expected ? "✅ PASS" : "❌ FAIL";

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: nums = [${nums}], goal = ${goal}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log("═".repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log("🎉 All tests passed! Brute Force samajh aa gaya! 🚀");
      console.log("📊 Complexity: Time O(n²), Space O(1)");
      console.log("\n💡 Key Insight: Don't break on sum === goal (zeros ahead!)");
      console.log("⚠️  Note: Sliding Window is O(n) - more optimal!");
    }
  }
}

// Execute tests
BinarySubarraysWithSumBruteForce.runTests();