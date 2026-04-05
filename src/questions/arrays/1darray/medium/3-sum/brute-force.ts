/**
 * ═══════════════════════════════════════════════════════════
 * 3 SUM — BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek array diya hai, find all unique triplets [a, b, c]
 * jahan a + b + c = 0.
 *
 * EXAMPLES:
 *   [-1, 0, 1, 2, -1, -4]  →  [[-1,-1,2], [-1,0,1]]
 *   [0, 1, 1]               →  []
 *   [0, 0, 0]               →  [[0,0,0]]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Sabse seedha approach:
 *
 *   Har possible triplet (i, j, k) try karo.
 *   Agar sum = 0 hai, toh answer me daalo.
 *
 * Lekin duplicates ka problem hai:
 *
 *   [-1, 0, 1, 2, -1, -4]
 *
 *   i=0, j=1, k=2 → values [-1, 0, 1] → sorted [-1, 0, 1]
 *   i=1, j=2, k=4 → values [0, 1, -1] → sorted [-1, 0, 1]  ← SAME!
 *
 * Toh duplicate remove karne ke liye:
 *   - Har triplet ko sort karo
 *   - Set me daalo (JSON.stringify se)
 *
 * TIME:  O(n^3) — triple loop dominates; each found triplet sort is only size 3, so constant work
 * SPACE: O(number of unique triplets)
 */

namespace ThreeSumBruteForce {
  function threeSum(nums: number[]): number[][] {
    const n = nums.length;
    // Set to track unique triplets (as JSON strings)
    // WHY: same triplet different order se aa sakta hai, so sort + stringify
    const uniqueSet = new Set<string>();
    const result: number[][] = [];

    // Try all possible triplets (i, j, k)
    // i < j < k ensures we don't repeat same indices
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          // Check: kya teeno ka sum 0 hai?
          if (nums[i] + nums[j] + nums[k] === 0) {
            // Sort the triplet so [-1,0,1] and [1,-1,0] both become [-1,0,1]
            const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);

            const key = JSON.stringify(triplet);

            // Agar pehle nahi dekha, toh add karo
            if (!uniqueSet.has(key)) {
              uniqueSet.add(key);
              result.push(triplet);
            }
          }
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
   * Example: nums = [-1, 0, 1, 2, -1, -4]
   *
   * All triplet combinations jahan sum = 0:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=0, j=1, k=2: nums[0]+nums[1]+nums[2] = -1+0+1 = 0   │
   * │   triplet sorted: [-1, 0, 1]                            │
   * │   Set me nahi hai → ADD                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=0, j=3, k=4: nums[0]+nums[3]+nums[4] = -1+2+(-1) = 0│
   * │   triplet sorted: [-1, -1, 2]                           │
   * │   Set me nahi hai → ADD                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=1, j=2, k=4: nums[1]+nums[2]+nums[4] = 0+1+(-1) = 0 │
   * │   triplet sorted: [-1, 0, 1]                            │
   * │   Set me ALREADY hai → SKIP (duplicate)                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final result: [[-1, 0, 1], [-1, -1, 2]]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. All zeros: [0,0,0] → [[0,0,0]]
   * 2. No valid triplet: [1,2,3] → []
   * 3. Less than 3 elements: [1,2] → []
   * 4. Multiple duplicates: [-1,-1,0,1,1] → [[-1,0,1]]
   */

  export function runTests(): void {
    console.log('🧪 Testing 3 Sum — BRUTE FORCE\n');

    const tests: Array<{ nums: number[]; expected: number[][] }> = [
      {
        nums: [-1, 0, 1, 2, -1, -4],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
      },
      { nums: [0, 1, 1], expected: [] },
      { nums: [0, 0, 0], expected: [[0, 0, 0]] },
      {
        nums: [1, 2, -3, 4, -2, -1],
        expected: [
          [-3, -1, 4],
          [-3, 1, 2],
        ],
      },
      { nums: [-1, -1, 0, 1, 1], expected: [[-1, 0, 1]] },
      { nums: [1, 2, 3], expected: [] },
      {
        nums: [-2, 0, 1, 1, 2],
        expected: [
          [-2, 0, 2],
          [-2, 1, 1],
        ],
      },
      { nums: [0, 0, 0, 0], expected: [[0, 0, 0]] },
      {
        nums: [-4, -2, -1, 0, 1, 2, 3],
        expected: [
          [-4, 1, 3],
          [-2, -1, 3],
          [-2, 0, 2],
          [-1, 0, 1],
        ],
      },
      { nums: [], expected: [] },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = threeSum([...nums]);
      // Sort both for comparison
      const sortResult = result.map((t) => JSON.stringify(t)).sort();
      const sortExpected = expected.map((t) => JSON.stringify(t)).sort();
      const pass = JSON.stringify(sortResult) === JSON.stringify(sortExpected);

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(
        `  Got:      ${JSON.stringify(result)} → ${pass ? '✅' : '❌'}`
      );
    });
  }
}

ThreeSumBruteForce.runTests();
