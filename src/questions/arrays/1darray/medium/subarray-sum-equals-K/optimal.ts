/**
 * ═══════════════════════════════════════════════════════════
 * SUBARRAY SUM EQUALS K — OPTIMAL (Prefix Sum + HashMap)
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek integer array `nums` aur integer `k` diya hai.
 * Hume count return karna hai:
 *   kitni contiguous subarrays ka sum exactly `k` hai
 *
 * EXAMPLES:
 *   nums = [1,1,1], k = 2   -> 2
 *   nums = [1,2,3], k = 3   -> 2
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Prefix sum ka idea:
 *
 *   currentSum = start se current index tak total sum
 *
 * Agar current index pe:
 *
 *   currentSum - oldPrefixSum = k
 *
 * then:
 *
 *   oldPrefixSum = currentSum - k
 *
 * Yani agar pehle kabhi prefix sum `(currentSum - k)` mila tha,
 * toh uske next index se current index tak ek valid subarray ban gayi.
 *
 * Most important difference from "longest subarray sum zero" type problems:
 *
 *   yahan hume longest nahi chahiye
 *   yahan hume total count chahiye
 *
 * Isliye HashMap me prefix sum ka first index nahi,
 * prefix sum ki frequency store karte hain.
 *
 * Example:
 *   nums = [0,0,0], k = 0
 *
 * Prefix sum `0` baar-baar repeat hota hai.
 * Har repeat multiple new subarrays create karta hai.
 *
 * TIME:  O(n)
 * SPACE: O(n)
 */

namespace SubarraySumEqualsKOptimal {
  function subarraySum(nums: number[], k: number): number {
    const prefixSumFrequency = new Map<number, number>();

    let currentSum = 0;
    let count = 0;

    // Prefix sum 0 ko ek baar pehle se seen maante hain.
    // WHY:
    // agar kisi index pe currentSum hi k ban gaya,
    // toh start se current index tak wali subarray count ho sake.
    prefixSumFrequency.set(0, 1);

    for (let i = 0; i < nums.length; i++) {
      currentSum += nums[i];

      const neededPrefixSum = currentSum - k;

      // Agar needed prefix sum pehle f baar mila hai,
      // toh current index pe f new subarrays banengi.
      if (prefixSumFrequency.has(neededPrefixSum)) {
        count += prefixSumFrequency.get(neededPrefixSum)!;
      }

      // Current prefix sum ki frequency update karo.
      prefixSumFrequency.set(
        currentSum,
        (prefixSumFrequency.get(currentSum) || 0) + 1
      );
    }

    return count;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [1, 1, 1], k = 2
   *
   * Start:
   *   prefixSumFrequency = { 0 -> 1 }
   *   currentSum = 0
   *   count = 0
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 0
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 1                                              │
   * │ currentSum = 0 + 1 = 1                                   │
   * │ neededPrefixSum = currentSum - k = 1 - 2 = -1            │
   * │ map has -1 ? no                                           │
   * │ count stays 0                                             │
   * │                                                          │
   * │ update frequency of currentSum = 1                        │
   * │ map becomes { 0 -> 1, 1 -> 1 }                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 1                                              │
   * │ currentSum = 1 + 1 = 2                                   │
   * │ neededPrefixSum = 2 - 2 = 0                              │
   * │ map has 0 ? yes, frequency = 1                           │
   * │ count += 1                                               │
   * │ count = 1                                                │
   * │                                                          │
   * │ Meaning: subarray 0..1 => [1,1] has sum 2               │
   * │                                                          │
   * │ update frequency of currentSum = 2                       │
   * │ map becomes { 0 -> 1, 1 -> 1, 2 -> 1 }                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ nums[i] = 1                                              │
   * │ currentSum = 2 + 1 = 3                                   │
   * │ neededPrefixSum = 3 - 2 = 1                              │
   * │ map has 1 ? yes, frequency = 1                           │
   * │ count += 1                                               │
   * │ count = 2                                                │
   * │                                                          │
   * │ Meaning: subarray 1..2 => [1,1] has sum 2               │
   * │                                                          │
   * │ update frequency of currentSum = 3                       │
   * │ map becomes { 0 -> 1, 1 -> 1, 2 -> 1, 3 -> 1 }           │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   count = 2
   *
   * Important observation:
   *   Har current index pe hum pooch rahe hain:
   *   "kitne previous prefix sums aise the jinke saath difference k ban raha hai?"
   *
   * EDGE CASES:
   * 1. Empty array -> 0
   * 2. Negative numbers hone par bhi kaam karta hai
   * 3. Zeros multiple answers generate kar sakte hain
   * 4. `0 -> 1` initialization start se valid subarray handle karta hai
   */

  export function runTests(): void {
    console.log("🧪 Testing Subarray Sum Equals K — OPTIMAL\n");

    const tests: Array<{ nums: number[]; k: number; expected: number }> = [
      { nums: [1, 1, 1], k: 2, expected: 2 },
      { nums: [1, 2, 3], k: 3, expected: 2 },
      { nums: [1], k: 1, expected: 1 },
      { nums: [1], k: 2, expected: 0 },
      { nums: [0, 0, 0], k: 0, expected: 6 },
      { nums: [1, -1, 0], k: 0, expected: 3 },
      { nums: [3, 4, 7, 2, -3, 1, 4, 2], k: 7, expected: 4 },
      { nums: [-1, -1, 1], k: 0, expected: 1 },
      { nums: [2, -2, 2, -2], k: 0, expected: 4 },
      { nums: [], k: 0, expected: 0 },
    ];

    tests.forEach(({ nums, k, expected }, i) => {
      const result = subarraySum(nums, k);
      const pass = result === expected;

      console.log(`Test ${i + 1}: nums=[${nums}], k=${k}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} -> ${pass ? "✅" : "❌"}`);
    });
  }
}

SubarraySumEqualsKOptimal.runTests();
