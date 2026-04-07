/**
 * ═══════════════════════════════════════════════════════════
 * LONGEST SUBARRAY WITH SUM ZERO — OPTIMAL (Prefix Sum + HashMap)
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek integer array `nums` diya hai.
 * Longest contiguous subarray ki length return karni hai
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
 * Prefix sum ka core idea:
 *
 *   agar same prefix sum do alag indices pe dubara milta hai,
 *   toh unke beech wali subarray ka sum zero hota hai
 *
 * Example:
 *   nums        = [1, -1, 3, -3]
 *   prefix sums = [1,  0, 3,  0]
 *
 * Yahan prefix sum `0` do jagah mila:
 *   index 1 pe
 *   index 3 pe
 *
 * Iska matlab:
 *   index 2..3 ke beech jo add hua, uska net effect zero hai
 *
 * Aur agar prefix sum khud `0` ho jaye,
 * toh start se current index tak ka sum zero hai.
 *
 * HashMap me har prefix sum ka FIRST occurrence rakhte hain.
 * WHY:
 *   same sum dubara mila toh earliest index se length sabse badi milegi
 *
 * TIME:  O(n) — array ek baar traverse hota hai
 * SPACE: O(n) — prefix sums map me store hote hain
 */

namespace LongestSubarraySumZeroOptimal {
  function longestSubarrayWithZeroSum(nums: number[]): number {
    // key   = prefix sum
    // value = is prefix sum ka first occurrence index
    const prefixSumToFirstIndex = new Map<number, number>();

    let currentSum = 0;
    let maxLen = 0;

    // Prefix sum 0 ko index -1 pe imagine karte hain.
    // WHY:
    // agar currentSum index i pe 0 ho gaya,
    // toh subarray 0..i ki length i - (-1) = i + 1 mil jaaye.
    prefixSumToFirstIndex.set(0, -1);

    for (let i = 0; i < nums.length; i++) {
      // Current element ko include karke prefix sum update karo.
      currentSum += nums[i];

      if (prefixSumToFirstIndex.has(currentSum)) {
        // Same prefix sum pehle mil chuka hai,
        // toh un dono occurrences ke beech ka sum zero hoga.
        const firstIndex = prefixSumToFirstIndex.get(currentSum)!;
        const currentLength = i - firstIndex;
        maxLen = Math.max(maxLen, currentLength);
      } else {
        // Sirf first occurrence hi store karte hain.
        // WHY:
        // earliest index future me longest distance dega.
        prefixSumToFirstIndex.set(currentSum, i);
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
   *   prefixSumToFirstIndex = { 0 -> -1 }
   *   currentSum = 0
   *   maxLen = 0
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 0
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 1                                              │
   * │ currentSum before = 0                                    │
   * │ currentSum after  = 0 + 1 = 1                            │
   * │ map has 1 ? no                                           │
   * │ action: store first occurrence of 1 at index 0           │
   * │ map becomes { 0 -> -1, 1 -> 0 }                          │
   * │ maxLen stays 0                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = -1                                             │
   * │ currentSum before = 1                                    │
   * │ currentSum after  = 1 + (-1) = 0                         │
   * │ map has 0 ? yes                                          │
   * │ firstIndex = -1                                          │
   * │ currentLength = i - firstIndex = 1 - (-1) = 2            │
   * │ maxLen = max(0, 2) = 2                                   │
   * │                                                          │
   * │ Meaning: subarray 0..1 => [1, -1] has sum 0             │
   * │ map unchanged = { 0 -> -1, 1 -> 0 }                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 3                                              │
   * │ currentSum before = 0                                    │
   * │ currentSum after  = 0 + 3 = 3                            │
   * │ map has 3 ? no                                           │
   * │ action: store first occurrence of 3 at index 2           │
   * │ map becomes { 0 -> -1, 1 -> 0, 3 -> 2 }                  │
   * │ maxLen stays 2                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 3
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = -3                                             │
   * │ currentSum before = 3                                    │
   * │ currentSum after  = 3 + (-3) = 0                         │
   * │ map has 0 ? yes                                          │
   * │ firstIndex = -1                                          │
   * │ currentLength = i - firstIndex = 3 - (-1) = 4            │
   * │ maxLen = max(2, 4) = 4                                   │
   * │                                                          │
   * │ Meaning: subarray 0..3 => [1, -1, 3, -3] has sum 0      │
   * │ map unchanged = { 0 -> -1, 1 -> 0, 3 -> 2 }              │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   maxLen = 4
   *
   * Important observation:
   *   jab prefix sum repeat hota hai,
   *   tab repeat ke beech ka total contribution zero hota hai
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> 0
   * 2. Single zero -> 1
   * 3. Single non-zero -> 0
   * 4. Start se zero-sum subarray -> `0 -> -1` initialization handle karta hai
   * 5. Same prefix sum multiple times -> first occurrence longest length deta hai
   */

  export function runTests(): void {
    console.log('🧪 Testing Longest Subarray With Sum Zero — OPTIMAL\n');

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

LongestSubarraySumZeroOptimal.runTests();
