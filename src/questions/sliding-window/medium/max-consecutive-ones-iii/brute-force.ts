/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAX CONSECUTIVE ONES III - BRUTE FORCE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Find max consecutive 1s if you can flip at most k zeros
 *
 * Key Insight: REFRAME THE PROBLEM!
 * ─────────────────────────────────────────────────────────────────────────────
 * DON'T think: "Flip k zeros to 1s"
 * DO think:    "Find longest subarray with at most k zeros"
 *
 * WHY? If subarray has ≤k zeros, we CAN flip them all to 1s!
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Approach: Brute Force - Check ALL possible subarrays
 * - For each starting position i
 * - Try all ending positions j (from i to end)
 * - Count zeros in subarray [i...j]
 * - If zeros <= k, update maxLength
 * - If zeros > k, no point extending further (break)
 *
 * Time Complexity: O(n²) - nested loops
 * Space Complexity: O(1) - only using a few variables
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace MaxConsecutiveOnesIIIBruteForce {
  /**
   * Find maximum consecutive 1s with at most k flips - BRUTE FORCE
   *
   * @param nums - Binary array (only 0s and 1s)
   * @param k - Maximum number of 0s we can flip to 1s
   * @returns Maximum length of consecutive 1s achievable
   */
  function longestOnes(nums: number[], k: number): number {
    let maxLength = 0;

    // ═══════════════════════════════════════════════════════════════
    // OUTER LOOP: Try each starting position
    // ═══════════════════════════════════════════════════════════════
    // i = starting index of our subarray
    // WHY: We need to check subarrays starting at every position

    for (let i = 0; i < nums.length; i++) {
      // Count of zeros in current subarray [i...j]
      // Reset for each new starting position
      let zeroCount = 0;

      // ═══════════════════════════════════════════════════════════════
      // INNER LOOP: Try each ending position
      // ═══════════════════════════════════════════════════════════════
      // j = ending index of our subarray
      //
      // IMPORTANT: j goes from i to END OF ARRAY (nums.length - 1)
      // NOT from i to i+k!
      //
      // WHY? k is the max zeros allowed, NOT the window size!
      //      Window can be any size, but must have ≤k zeros.

      for (let j = i; j < nums.length; j++) {
        // ─────────────────────────────────────────────────────────────
        // STEP 1: Count zeros in current subarray
        // ─────────────────────────────────────────────────────────────
        // If current element is 0, increment zero count
        // WHY: We're building subarray [i...j], need to track zeros
        if (nums[j] === 0) {
          zeroCount++;
        }

        // ─────────────────────────────────────────────────────────────
        // STEP 2: Check if subarray is valid
        // ─────────────────────────────────────────────────────────────
        if (zeroCount <= k) {
          // Valid subarray! Zeros <= k means we can flip all to 1s
          // Update maxLength if this subarray is longer
          // Subarray length = j - i + 1
          maxLength = Math.max(maxLength, j - i + 1);
        } else {
          // ─────────────────────────────────────────────────────────────
          // STEP 3: Too many zeros - OPTIMIZATION
          // ─────────────────────────────────────────────────────────────
          // If zeros > k, extending further will only add more elements
          // (possibly more zeros), so no point continuing with this start
          //
          // WHY break works:
          // If [i...j] has too many zeros, then [i...j+1], [i...j+2]...
          // will also have at least that many zeros (can only increase)
          break;
        }
      }
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
   *          Index:  0 1 2 3 4 5 6 7 8 9 10
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 0 (Start from index 0)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=0: nums[0]=1, zeros=0, 0<=2 ✅ → maxLen = max(0, 0-0+1) = 1
   *      Subarray: [1]
   *
   * j=1: nums[1]=1, zeros=0, 0<=2 ✅ → maxLen = max(1, 1-0+1) = 2
   *      Subarray: [1,1]
   *
   * j=2: nums[2]=1, zeros=0, 0<=2 ✅ → maxLen = max(2, 2-0+1) = 3
   *      Subarray: [1,1,1]
   *
   * j=3: nums[3]=0, zeros=1, 1<=2 ✅ → maxLen = max(3, 3-0+1) = 4
   *      Subarray: [1,1,1,0]
   *
   * j=4: nums[4]=0, zeros=2, 2<=2 ✅ → maxLen = max(4, 4-0+1) = 5
   *      Subarray: [1,1,1,0,0]
   *
   * j=5: nums[5]=0, zeros=3, 3>2 ❌ → BREAK!
   *      Subarray: [1,1,1,0,0,0] has too many zeros
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 1 (Start from index 1)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=1: nums[1]=1, zeros=0 ✅ → maxLen = max(5, 1) = 5
   * j=2: nums[2]=1, zeros=0 ✅ → maxLen = max(5, 2) = 5
   * j=3: nums[3]=0, zeros=1 ✅ → maxLen = max(5, 3) = 5
   * j=4: nums[4]=0, zeros=2 ✅ → maxLen = max(5, 4) = 5
   * j=5: nums[5]=0, zeros=3 ❌ → BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 2 (Start from index 2)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=2: nums[2]=1, zeros=0 ✅ → maxLen = 5
   * j=3: nums[3]=0, zeros=1 ✅ → maxLen = 5
   * j=4: nums[4]=0, zeros=2 ✅ → maxLen = 5
   * j=5: nums[5]=0, zeros=3 ❌ → BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 3 (Start from index 3)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=3: nums[3]=0, zeros=1 ✅ → maxLen = 5
   * j=4: nums[4]=0, zeros=2 ✅ → maxLen = 5
   * j=5: nums[5]=0, zeros=3 ❌ → BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 4 (Start from index 4) ⭐ IMPORTANT - Best window starts here!
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=4: nums[4]=0, zeros=1 ✅ → maxLen = 5
   *      Subarray: [0]
   *
   * j=5: nums[5]=0, zeros=2 ✅ → maxLen = 5
   *      Subarray: [0,0]
   *
   * j=6: nums[6]=1, zeros=2 ✅ → maxLen = 5
   *      Subarray: [0,0,1]
   *
   * j=7: nums[7]=1, zeros=2 ✅ → maxLen = 5
   *      Subarray: [0,0,1,1]
   *
   * j=8: nums[8]=1, zeros=2 ✅ → maxLen = 5
   *      Subarray: [0,0,1,1,1]
   *
   * j=9: nums[9]=1, zeros=2 ✅ → maxLen = max(5, 9-4+1) = 6 ⭐
   *      Subarray: [0,0,1,1,1,1] - This is our answer!
   *
   * j=10: nums[10]=0, zeros=3 ❌ → BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 5, 6, 7, 8, 9, 10 (Continue...)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * None of these find a longer valid subarray.
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: maxLength = 6
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Best subarray: [0,0,1,1,1,1] at indices 4-9
   * Flip 2 zeros → [1,1,1,1,1,1] = 6 consecutive 1s!
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
   * Note: The break optimization helps in practice, but worst case
   * (like all 1s) still requires checking all pairs → O(n²)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * COMMON MISTAKE: j < i + k
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * WRONG: for (let j = i; j < i + k; j++)
   *
   * This limits window to size k, but k is NOT the window size!
   * k is the MAX ZEROS allowed.
   *
   * Example: nums = [1,1,1,1,1], k = 2
   *   Wrong code: Only checks windows of size 2
   *   Correct: Should return 5 (entire array has 0 zeros, which is <= 2)
   *
   * CORRECT: for (let j = i; j < nums.length; j++)
   *
   * Window can be ANY size, as long as zeros <= k!
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Max Consecutive Ones III - BRUTE FORCE\n");
    console.log("═".repeat(60) + "\n");

    const testCases: {
      nums: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        k: 2,
        expected: 6,
        description: "Example 1 - flip 2 zeros",
      },
      {
        nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
        k: 3,
        expected: 10,
        description: "Example 2 - flip 3 zeros",
      },

      // Edge cases
      {
        nums: [1, 1, 1, 1],
        k: 2,
        expected: 4,
        description: "All 1s - no flips needed",
      },
      {
        nums: [0, 0, 0, 0],
        k: 2,
        expected: 2,
        description: "All 0s - can only flip k",
      },
      {
        nums: [0, 0, 0, 0],
        k: 4,
        expected: 4,
        description: "All 0s - k equals length",
      },
      {
        nums: [1, 0, 1, 1, 0, 1],
        k: 0,
        expected: 2,
        description: "k=0 - find longest consecutive 1s",
      },
      {
        nums: [1, 0, 1, 0, 1],
        k: 5,
        expected: 5,
        description: "k >= zeros - entire array",
      },

      // Single element
      {
        nums: [1],
        k: 1,
        expected: 1,
        description: "Single 1",
      },
      {
        nums: [0],
        k: 1,
        expected: 1,
        description: "Single 0 with k=1 - flip it",
      },
      {
        nums: [0],
        k: 0,
        expected: 0,
        description: "Single 0 with k=0 - can't flip",
      },

      // More complex cases
      {
        nums: [1, 1, 0, 0, 1, 1, 1, 0, 1],
        k: 1,
        expected: 5,
        description: "Optimal window in middle",
      },
      {
        nums: [0, 1, 1, 1, 0],
        k: 1,
        expected: 4,
        description: "Window at start or end",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { nums, k, expected, description } = testCases[i];
      const result = longestOnes(nums, k);
      const status = result === expected ? "✅ PASS" : "❌ FAIL";

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: nums = [${nums}], k = ${k}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log("═".repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log("🎉 All tests passed! Brute Force samajh aa gaya! 🚀");
      console.log("📊 Complexity: Time O(n²), Space O(1)");
      console.log("\n⚠️  Note: Sliding Window is O(n) - more optimal!");
    }
  }
}

// Execute tests
MaxConsecutiveOnesIIIBruteForce.runTests();