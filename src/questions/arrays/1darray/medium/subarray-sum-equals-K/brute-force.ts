/**
 * ═══════════════════════════════════════════════════════════
 * SUBARRAY SUM EQUALS K — BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek integer array `nums` aur ek integer `k` diya hai.
 * Hume count return karna hai:
 *   kitni contiguous subarrays ka sum exactly `k` hai
 *
 * EXAMPLES:
 *   nums = [1,1,1], k = 2        -> 2
 *   nums = [1,2,3], k = 3        -> 2
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Sabse seedha idea:
 *   har possible start index try karo
 *   us start se har possible end index tak extend karo
 *   running sum maintain karo
 *   jab bhi sum == k ho, count++ kar do
 *
 * Important:
 *   Ye brute force O(n^2) hai, O(n^3) nahi.
 *
 * WHY:
 *   fixed start ke liye har baar sum scratch se calculate nahi kar rahe.
 *   `end` ko badhate hue running sum carry kar rahe hain.
 *
 * TIME:  O(n^2)
 * SPACE: O(1)
 */

namespace SubarraySumEqualsKBruteForce {
  function subarraySum(nums: number[], k: number): number {
    let count = 0;

    for (let start = 0; start < nums.length; start++) {
      let currentSum = 0;

      // Same start se right side ko expand karte jao.
      // Running sum use karne se inner loop me repeated addition bach jaati hai.
      for (let end = start; end < nums.length; end++) {
        currentSum += nums[end];

        if (currentSum === k) {
          count++;
        }
      }
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
   *   count = 0
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: start = 0
   * ═══════════════════════════════════════════════════════════
   *
   * currentSum = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ end = 0                                                  │
   * │ currentSum = 0 + 1 = 1                                   │
   * │ 1 === 2 ? no                                             │
   * │ count stays 0                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ end = 1                                                  │
   * │ currentSum = 1 + 1 = 2                                   │
   * │ 2 === 2 ? yes                                            │
   * │ count = 1                                                │
   * │ valid subarray = nums[0..1] = [1,1]                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ end = 2                                                  │
   * │ currentSum = 2 + 1 = 3                                   │
   * │ 3 === 2 ? no                                             │
   * │ count stays 1                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: start = 1
   * ═══════════════════════════════════════════════════════════
   *
   * currentSum = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ end = 1                                                  │
   * │ currentSum = 0 + 1 = 1                                   │
   * │ 1 === 2 ? no                                             │
   * │ count stays 1                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ end = 2                                                  │
   * │ currentSum = 1 + 1 = 2                                   │
   * │ 2 === 2 ? yes                                            │
   * │ count = 2                                                │
   * │ valid subarray = nums[1..2] = [1,1]                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: start = 2
   * ═══════════════════════════════════════════════════════════
   *
   * currentSum = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ end = 2                                                  │
   * │ currentSum = 0 + 1 = 1                                   │
   * │ 1 === 2 ? no                                             │
   * │ count stays 2                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   count = 2
   *
   * EDGE CASES:
   * 1. Empty array -> 0
   * 2. Negative numbers ho sakte hain
   * 3. Zeros ki wajah se same prefix patterns multiple baar count ho sakte hain
   */

  export function runTests(): void {
    console.log("🧪 Testing Subarray Sum Equals K — BRUTE FORCE\n");

    const tests: Array<{ nums: number[]; k: number; expected: number }> = [
      { nums: [1, 1, 1], k: 2, expected: 2 },
      { nums: [1, 2, 3], k: 3, expected: 2 },
      { nums: [1], k: 1, expected: 1 },
      { nums: [1], k: 2, expected: 0 },
      { nums: [0, 0, 0], k: 0, expected: 6 },
      { nums: [1, -1, 0], k: 0, expected: 3 },
      { nums: [3, 4, 7, 2, -3, 1, 4, 2], k: 7, expected: 4 },
      { nums: [-1, -1, 1], k: 0, expected: 1 },
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

SubarraySumEqualsKBruteForce.runTests();
