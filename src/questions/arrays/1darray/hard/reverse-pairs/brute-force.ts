/**
 * ═══════════════════════════════════════════════════════════
 * REVERSE PAIRS - BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Count pairs `(i, j)` where:
 *
 *   i < j
 *   nums[i] > 2 * nums[j]
 *
 * Example:
 *   [1, 3, 2, 3, 1] -> 2
 *
 * Valid pairs:
 *   (1, 4): 3 > 2 * 1
 *   (3, 4): 3 > 2 * 1
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force me hum definition ko directly code karte hain.
 *
 * Definition kya bolti hai?
 *
 *   i < j
 *   nums[i] > 2 * nums[j]
 *
 * So:
 *   har `i` ke liye
 *   uske baad wale har `j` ko check karo
 *
 * WHY `j = i + 1` se start hota hai?
 *   because condition me `i < j` mandatory hai.
 *   Pair me right element hamesha current `i` ke baad aana chahiye.
 *
 * TIME:  O(n^2)
 * SPACE: O(1)
 */

namespace ReversePairsBruteForce {
  function reversePairs(nums: number[]): number {
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
      // `j` hamesha `i` ke baad start hota hai.
      // WHY: reverse pair me index order must be `i < j`.
      for (let j = i + 1; j < nums.length; j++) {
        // This is the exact condition from the problem.
        // Agar true hai, current `(i, j)` ek valid reverse pair hai.
        if (nums[i] > 2 * nums[j]) {
          count++;
        }
      }
    }

    return count;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [1, 3, 2, 3, 1]
   *
   * Start:
   *   count = 0
   *
   * Pair condition:
   *   nums[i] > 2 * nums[j]
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 0
   * ═══════════════════════════════════════════════════════════
   *
   * nums[i] = 1
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j=1: nums[j]=3 -> 1 > 2*3 ? 1 > 6  -> false            │
   * │ j=2: nums[j]=2 -> 1 > 2*2 ? 1 > 4  -> false            │
   * │ j=3: nums[j]=3 -> 1 > 2*3 ? 1 > 6  -> false            │
   * │ j=4: nums[j]=1 -> 1 > 2*1 ? 1 > 2  -> false            │
   * │ count stays 0                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * nums[i] = 3
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j=2: nums[j]=2 -> 3 > 2*2 ? 3 > 4  -> false            │
   * │ j=3: nums[j]=3 -> 3 > 2*3 ? 3 > 6  -> false            │
   * │ j=4: nums[j]=1 -> 3 > 2*1 ? 3 > 2  -> true             │
   * │        count++ -> 1                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * nums[i] = 2
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j=3: nums[j]=3 -> 2 > 2*3 ? 2 > 6  -> false            │
   * │ j=4: nums[j]=1 -> 2 > 2*1 ? 2 > 2  -> false            │
   * │                                                          │
   * │ Important: condition is strict `>`                      │
   * │ 2 > 2 is false, so this is NOT a reverse pair.          │
   * │ count stays 1                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 3
   * ═══════════════════════════════════════════════════════════
   *
   * nums[i] = 3
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j=4: nums[j]=1 -> 3 > 2*1 ? 3 > 2 -> true              │
   * │        count++ -> 2                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 4
   * ═══════════════════════════════════════════════════════════
   *
   * nums[i] = 1
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j starts from i+1 = 5                                   │
   * │ j < nums.length ? 5 < 5 -> false                        │
   * │ Inner loop does not run.                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   count = 2
   *
   * EDGE CASES:
   * 1. [] -> 0
   * 2. [1] -> 0
   * 3. increasing array -> 0
   * 4. strict comparison matters: [2, 1] -> 0 because 2 > 2 is false
   * 5. negative values can form pairs: [-5, -5] -> 1 because -5 > -10
   */

  export function runTests(): void {
    console.log("🧪 Testing Reverse Pairs - BRUTE FORCE\n");

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [1, 3, 2, 3, 1], expected: 2 },
      { nums: [2, 4, 3, 5, 1], expected: 3 },
      { nums: [], expected: 0 },
      { nums: [1], expected: 0 },
      { nums: [1, 2, 3, 4, 5], expected: 0 },
      { nums: [5, 4, 3, 2, 1], expected: 4 },
      { nums: [1, 1, 1, 1], expected: 0 },
      { nums: [10, 5, 2, 1], expected: 4 },
      { nums: [-5, -5], expected: 1 },
      {
        nums: [2147483647, 2147483647, -2147483648, -2147483648],
        expected: 5,
      },
    ];

    tests.forEach(({ nums, expected }, index) => {
      const result = reversePairs(nums);
      const pass = result === expected;

      console.log(`Test ${index + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} -> ${pass ? "✅" : "❌"}`);
    });
  }
}

ReversePairsBruteForce.runTests();
