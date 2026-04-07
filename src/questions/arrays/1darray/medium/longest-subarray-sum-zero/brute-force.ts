/**
 * ═══════════════════════════════════════════════════════════
 * LONGEST SUBARRAY WITH SUM ZERO — BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek integer array `nums` diya hai.
 * Hume longest contiguous subarray ki length return karni hai
 * jiska sum exactly `0` ho.
 *
 * Agar koi zero-sum subarray exist hi nahi karti,
 * toh answer `0` hoga.
 *
 * EXAMPLES:
 *   [1, -1, 3, -3]              -> 4
 *   [9, -3, 3, -1, 6, -5]       -> 5
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force me:
 *   har possible start index choose karo
 *   phir us start se har possible end index try karo
 *   running sum maintain karo
 *
 * Agar current window ka sum `0` ho gaya,
 * toh yeh valid zero-sum subarray hai.
 *
 * Important detail:
 *   sum ko har baar scratch se recompute nahi kar rahe
 *   current `left` ke liye `right` badhate hue running sum le ja rahe hain
 *
 * Isliye time:
 *   O(n^2)
 * na ki O(n^3)
 *
 * TIME:  O(n^2) — har `left` se sab `right` try karte hain
 * SPACE: O(1)  — extra data structure nahi chahiye
 */

namespace LongestSubarraySumZeroBruteForce {
  function longestSubarrayWithZeroSum(nums: number[]): number {
    const n = nums.length;
    let maxLen = 0;

    for (let left = 0; left < n; left++) {
      // Current `left` ke liye running sum fresh start hota hai.
      // WHY: ab nayi subarray family try kar rahe hain.
      let currentSum = 0;

      for (let right = left; right < n; right++) {
        // Current element ko include karke window [left..right] ka sum banao.
        currentSum += nums[right];

        // Agar ab tak ka sum zero hai,
        // toh current contiguous window valid zero-sum subarray hai.
        if (currentSum === 0) {
          const currentLength = right - left + 1;
          maxLen = Math.max(maxLen, currentLength);
        }
      }
    }

    return maxLen;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [1, -1, 3, -3]
   *
   * Start:
   *   n = 4
   *   maxLen = 0
   *
   * Har `left` ke liye `currentSum = 0` se restart hoga.
   * Phir `right` ko left se aage badha ke har possible window try karenge.
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 0
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   currentSum = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 0, nums[right] = 1                              │
   * │ current window = [1]                                    │
   * │ currentSum = 0 + 1 = 1                                  │
   * │ currentSum === 0 ? no                                   │
   * │ maxLen stays 0                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 1, nums[right] = -1                             │
   * │ current window = [1, -1]                                │
   * │ currentSum = 1 + (-1) = 0                               │
   * │ currentSum === 0 ? yes                                  │
   * │ currentLength = right - left + 1 = 1 - 0 + 1 = 2        │
   * │ maxLen = max(0, 2) = 2                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 2, nums[right] = 3                              │
   * │ current window = [1, -1, 3]                             │
   * │ currentSum = 0 + 3 = 3                                  │
   * │ currentSum === 0 ? no                                   │
   * │ maxLen stays 2                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = -3                             │
   * │ current window = [1, -1, 3, -3]                         │
   * │ currentSum = 3 + (-3) = 0                               │
   * │ currentSum === 0 ? yes                                  │
   * │ currentLength = 3 - 0 + 1 = 4                           │
   * │ maxLen = max(2, 4) = 4                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 1
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   currentSum = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 1, nums[right] = -1                             │
   * │ current window = [-1]                                   │
   * │ currentSum = 0 + (-1) = -1                              │
   * │ currentSum === 0 ? no                                   │
   * │ maxLen stays 4                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 2, nums[right] = 3                              │
   * │ current window = [-1, 3]                                │
   * │ currentSum = -1 + 3 = 2                                 │
   * │ currentSum === 0 ? no                                   │
   * │ maxLen stays 4                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = -3                             │
   * │ current window = [-1, 3, -3]                            │
   * │ currentSum = 2 + (-3) = -1                              │
   * │ currentSum === 0 ? no                                   │
   * │ maxLen stays 4                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 2
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   currentSum = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 2, nums[right] = 3                              │
   * │ current window = [3]                                    │
   * │ currentSum = 0 + 3 = 3                                  │
   * │ currentSum === 0 ? no                                   │
   * │ maxLen stays 4                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = -3                             │
   * │ current window = [3, -3]                                │
   * │ currentSum = 3 + (-3) = 0                               │
   * │ currentSum === 0 ? yes                                  │
   * │ currentLength = 3 - 2 + 1 = 2                           │
   * │ maxLen = max(4, 2) = 4                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 3
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   currentSum = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = -3                             │
   * │ current window = [-3]                                   │
   * │ currentSum = 0 + (-3) = -3                              │
   * │ currentSum === 0 ? no                                   │
   * │ maxLen stays 4                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   maxLen = 4
   *
   * Longest zero-sum subarray:
   *   [1, -1, 3, -3]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> 0
   * 2. Single zero -> 1
   * 3. Single non-zero -> 0
   * 4. Entire array sum zero -> whole length
   * 5. Kayi zero-sum windows ho sakti hain -> longest choose karni hai
   */

  export function runTests(): void {
    console.log('🧪 Testing Longest Subarray With Sum Zero — BRUTE FORCE\n');

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [1, -1, 3, -3], expected: 4 },
      { nums: [9, -3, 3, -1, 6, -5], expected: 5 },
      { nums: [6, -2, 2, -8, 1, 7, 4, -10], expected: 8 },
      { nums: [], expected: 0 },
      { nums: [0], expected: 1 },
      { nums: [5], expected: 0 },
      { nums: [0, 0, 0], expected: 3 },
      { nums: [1, 2, 3], expected: 0 },
      { nums: [1, 2, -3, 3, -3], expected: 5 },
      { nums: [-1, 1, -1, 1], expected: 4 },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = longestSubarrayWithZeroSum(nums);
      const pass = result === expected;

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} -> ${pass ? '✅' : '❌'}`);
    });
  }
}

LongestSubarraySumZeroBruteForce.runTests();
