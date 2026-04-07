/**
 * ═══════════════════════════════════════════════════════════
 * MAXIMUM SUBARRAY — OPTIMAL (Kadane's Algorithm)
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek integer array `nums` diya hai.
 * Hume contiguous subarray ka maximum possible sum return karna hai.
 *
 * Important:
 *   subarray contiguous honi chahiye
 *   sirf sum chahiye, actual subarray nahi
 *
 * EXAMPLES:
 *   [-2,1,-3,4,-1,2,1,-5,4]  -> 6
 *   [5,4,-1,7,8]             -> 23
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Main idea:
 *
 *   agar running sum negative ho gayi,
 *   toh us negative baggage ko future subarray me carry karna bekaar hai
 *
 * Example:
 *   currentSum = -5
 *   next num = 4
 *
 * Do options:
 *   1. carry karo   -> -5 + 4 = -1
 *   2. fresh start  -> 4
 *
 * Clearly fresh start better hai.
 *
 * Soch:
 *   - currentSum = current running window ka sum
 *   - maxSum     = ab tak ka best answer
 *   - currentSum negative ho jaye, toh usko reset kar do
 *
 * TIME:  O(n) — array ek baar traverse hota hai
 * SPACE: O(1) — sirf 2 variables
 */

namespace MaximumSubarrayOptimal {
  function maxSubArray(nums: number[]): number {
    // Original problem usually non-empty array deta hai,
    // but safe handling ke liye empty case me 0 return kar dete hain.
    if (nums.length === 0) return 0;

    // `maxSum` global best answer track karega.
    // `-Infinity` se start isliye:
    // all-negative array me bhi largest negative value capture ho sake.
    let maxSum = -Infinity;

    // `currentSum` current running window ka sum hai.
    // Ye future me reset ho sakta hai jab carrying harmful ho jaaye.
    let currentSum = 0;

    for (let i = 0; i < nums.length; i++) {
      // Current element ko running window me include karo.
      currentSum += nums[i];

      // Global answer ko reset se pehle update karna zaruri hai.
      // WHY:
      // all-negative case me currentSum negative hoga,
      // but wahi largest answer ho sakta hai.
      maxSum = Math.max(maxSum, currentSum);

      // Agar running sum negative ho gayi,
      // toh isko future me carry karna nuksan hai.
      // Next subarray ko clean start dena better hai.
      if (currentSum < 0) {
        currentSum = 0;
      }
    }

    return maxSum;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [-2, 1, -3, 4, -1, 2, 1]
   *
   * Start:
   *   maxSum = -Infinity
   *   currentSum = 0
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 0
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = -2                                             │
   * │ currentSum before = 0                                    │
   * │ currentSum after add = 0 + (-2) = -2                     │
   * │ maxSum = max(-Infinity, -2) = -2                         │
   * │ currentSum < 0 ? yes                                     │
   * │ action: currentSum = 0                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 1                                              │
   * │ currentSum before = 0                                    │
   * │ currentSum after add = 0 + 1 = 1                         │
   * │ maxSum = max(-2, 1) = 1                                  │
   * │ currentSum < 0 ? no                                      │
   * │ action: keep carrying currentSum = 1                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = -3                                             │
   * │ currentSum before = 1                                    │
   * │ currentSum after add = 1 + (-3) = -2                     │
   * │ maxSum = max(1, -2) = 1                                  │
   * │ currentSum < 0 ? yes                                     │
   * │ action: currentSum = 0                                   │
   * │                                                          │
   * │ Meaning: [1, -3] ko carry karna future ke liye harmful   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 3
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 4                                              │
   * │ currentSum before = 0                                    │
   * │ currentSum after add = 0 + 4 = 4                         │
   * │ maxSum = max(1, 4) = 4                                   │
   * │ currentSum < 0 ? no                                      │
   * │ action: keep carrying currentSum = 4                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 4
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = -1                                             │
   * │ currentSum before = 4                                    │
   * │ currentSum after add = 4 + (-1) = 3                      │
   * │ maxSum = max(4, 3) = 4                                   │
   * │ currentSum < 0 ? no                                      │
   * │ action: keep carrying currentSum = 3                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 5
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 2                                              │
   * │ currentSum before = 3                                    │
   * │ currentSum after add = 3 + 2 = 5                         │
   * │ maxSum = max(4, 5) = 5                                   │
   * │ currentSum < 0 ? no                                      │
   * │ action: keep carrying currentSum = 5                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 6
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 1                                              │
   * │ currentSum before = 5                                    │
   * │ currentSum after add = 5 + 1 = 6                         │
   * │ maxSum = max(5, 6) = 6                                   │
   * │ currentSum < 0 ? no                                      │
   * │ action: keep carrying currentSum = 6                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   maxSum = 6
   *
   * Winning subarray:
   *   [4, -1, 2, 1]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> 0 (safe handling)
   * 2. Single positive -> same value
   * 3. Single negative -> same value
   * 4. All negative -> largest negative value answer hoti hai
   * 5. All positive -> whole array answer hoti hai
   */

  export function runTests(): void {
    console.log("🧪 Testing Maximum Subarray — OPTIMAL\n");

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected: 6 },
      { nums: [1], expected: 1 },
      { nums: [5, 4, -1, 7, 8], expected: 23 },
      { nums: [-1, -2, -3], expected: -1 },
      { nums: [0, 0, 0], expected: 0 },
      { nums: [-2, -1], expected: -1 },
      { nums: [4, -1, 2, 1], expected: 6 },
      { nums: [1, -1, 1, -1, 1], expected: 1 },
      { nums: [8, -19, 5, -4, 20], expected: 21 },
      { nums: [], expected: 0 },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = maxSubArray(nums);
      const pass = result === expected;

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} -> ${pass ? "✅" : "❌"}`);
    });
  }
}

MaximumSubarrayOptimal.runTests();
