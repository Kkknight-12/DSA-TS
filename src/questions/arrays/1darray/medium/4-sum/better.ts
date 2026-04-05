/**
 * ═══════════════════════════════════════════════════════════
 * 4 SUM — BETTER (HashSet)
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek array `nums` aur ek `target` diya hai.
 * Saare unique quadruplets [a, b, c, d] return karo
 * jahan:
 *
 *   a + b + c + d = target
 *
 * EXAMPLES:
 *   nums = [1, 0, -1, 0, -2, 2], target = 0
 *   → [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force me 4 loops the.
 * Ek loop hata sakte hain.
 *
 * Equation:
 *
 *   a + b + c + d = target
 *
 * Agar `a`, `b`, aur `c` fix hain, toh:
 *
 *   d = target - (a + b + c)
 *
 * Yani fourth value already decided hai.
 *
 * Soch:
 *   - `i` se first number fix karo
 *   - `j` se second number fix karo
 *   - inner loop me `k` chalao
 *   - check karo required fourth value pehle dekhi hai ya nahi
 *
 * Iske liye inner HashSet use karte hain.
 * Duplicates ko sorted array + uniqueSet se control karte hain.
 *
 * TIME:  O(n^3) — i loop, j loop, then k loop with O(1) HashSet lookup
 * SPACE: O(n) — inner seen set + unique result tracking
 */

namespace FourSumBetter {
  function fourSum(nums: number[], target: number): number[][] {
    const n = nums.length;
    if (n < 4) return [];

    nums.sort((a, b) => a - b);

    const result: number[][] = [];
    const uniqueSet = new Set<string>();

    // First number fix karo
    for (let i = 0; i < n - 3; i++) {
      // Same first value se same quadruplet families dobara mil sakti hain
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      // Second number fix karo
      for (let j = i + 1; j < n - 2; j++) {
        // Same second value se same sub-family repeat ho sakti hai
        if (j > i + 1 && nums[j] === nums[j - 1]) continue;

        // Seen set current (i, j) ke liye third/fourth pairing track karega
        const seen = new Set<number>();

        for (let k = j + 1; k < n; k++) {
          const fourth = target - (nums[i] + nums[j] + nums[k]);

          // Agar required fourth pehle inner loop me dekha tha, quadruplet mil gaya
          if (seen.has(fourth)) {
            const quadruplet = [nums[i], nums[j], fourth, nums[k]];
            const key = JSON.stringify(quadruplet);

            if (!uniqueSet.has(key)) {
              uniqueSet.add(key);
              result.push(quadruplet);
            }
          }

          // Current nums[k] future iterations ke liye candidate fourth ban sakta hai
          seen.add(nums[k]);
        }
      }
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums   = [1, 0, -1, 0, -2, 2]
   * target = 0
   *
   * After sort:
   * [-2, -1, 0, 0, 1, 2]
   *
   * ═══════════════════════════════════════════════════════════
   * i = 0, nums[i] = -2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 1, nums[j] = -1                                     │
   * │ seen = {}                                               │
   * │                                                          │
   * │ k = 2, nums[k] = 0                                      │
   * │ fourth = 0 - (-2 + -1 + 0) = 3                         │
   * │ seen has 3? NO                                           │
   * │ seen = {0}                                               │
   * │                                                          │
   * │ k = 3, nums[k] = 0                                      │
   * │ fourth = 3                                              │
   * │ seen has 3? NO                                           │
   * │ seen = {0}                                               │
   * │                                                          │
   * │ k = 4, nums[k] = 1                                      │
   * │ fourth = 2                                              │
   * │ seen has 2? NO                                           │
   * │ seen = {0, 1}                                            │
   * │                                                          │
   * │ k = 5, nums[k] = 2                                      │
   * │ fourth = 1                                              │
   * │ seen has 1? YES → FOUND [-2, -1, 1, 2]                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 2, nums[j] = 0                                      │
   * │ seen = {}                                               │
   * │                                                          │
   * │ k = 3, nums[k] = 0 -> fourth = 2, not found            │
   * │ seen = {0}                                               │
   * │                                                          │
   * │ k = 4, nums[k] = 1 -> fourth = 1, not found            │
   * │ seen = {0, 1}                                            │
   * │                                                          │
   * │ k = 5, nums[k] = 2 -> fourth = 0, found                │
   * │ quadruplet = [-2, 0, 0, 2]                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * i = 1, j = 2 se finally [-1, 0, 0, 1] milta hai.
   *
   * Final result:
   * [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Less than 4 elements -> []
   * 2. All same values: [2,2,2,2,2], target=8 -> [[2,2,2,2]]
   * 3. All zeros: [0,0,0,0,0], target=0 -> [[0,0,0,0]]
   * 4. No valid quadruplet -> []
   */

  function normalize(list: number[][]): string[] {
    return list.map((quad) => JSON.stringify(quad)).sort();
  }

  export function runTests(): void {
    console.log('🧪 Testing 4 Sum — BETTER (HashSet)\n');

    const tests: Array<{
      nums: number[];
      target: number;
      expected: number[][];
    }> = [
      {
        nums: [1, 0, -1, 0, -2, 2],
        target: 0,
        expected: [
          [-2, -1, 1, 2],
          [-2, 0, 0, 2],
          [-1, 0, 0, 1],
        ],
      },
      {
        nums: [2, 2, 2, 2, 2],
        target: 8,
        expected: [[2, 2, 2, 2]],
      },
      {
        nums: [0, 0, 0, 0, 0],
        target: 0,
        expected: [[0, 0, 0, 0]],
      },
      {
        nums: [-3, -1, 0, 2, 4, 5],
        target: 2,
        expected: [[-3, -1, 2, 4]],
      },
      {
        nums: [-2, -1, -1, 1, 1, 2, 2],
        target: 0,
        expected: [
          [-2, -1, 1, 2],
          [-1, -1, 1, 1],
        ],
      },
      { nums: [1, 2, 3], target: 6, expected: [] },
      { nums: [1, 2, 3, 4], target: 100, expected: [] },
      {
        nums: [-5, -4, -3, -2, -1],
        target: -10,
        expected: [[-4, -3, -2, -1]],
      },
      {
        nums: [1000000000, 1000000000, 1000000000, 1000000000],
        target: 4000000000,
        expected: [[1000000000, 1000000000, 1000000000, 1000000000]],
      },
      {
        nums: [-4, -3, -2, -1, 0, 0, 1, 2, 3, 4],
        target: 0,
        expected: [
          [-4, -3, 3, 4],
          [-4, -2, 2, 4],
          [-4, -1, 1, 4],
          [-4, -1, 2, 3],
          [-4, 0, 0, 4],
          [-4, 0, 1, 3],
          [-3, -2, 1, 4],
          [-3, -2, 2, 3],
          [-3, -1, 0, 4],
          [-3, -1, 1, 3],
          [-3, 0, 0, 3],
          [-3, 0, 1, 2],
          [-2, -1, 0, 3],
          [-2, -1, 1, 2],
          [-2, 0, 0, 2],
          [-1, 0, 0, 1],
        ],
      },
    ];

    tests.forEach(({ nums, target, expected }, i) => {
      const result = fourSum([...nums], target);
      const pass =
        JSON.stringify(normalize(result)) === JSON.stringify(normalize(expected));

      console.log(`Test ${i + 1}: nums=[${nums}], target=${target}`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got:      ${JSON.stringify(result)} → ${pass ? '✅' : '❌'}`);
    });
  }
}

FourSumBetter.runTests();
