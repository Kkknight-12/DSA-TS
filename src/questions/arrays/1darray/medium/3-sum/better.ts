/**
 * ═══════════════════════════════════════════════════════════
 * 3 SUM — BETTER (HashSet)
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
 * Brute force mein teeno loops the: O(n^3).
 * Ek loop hata sakte hain agar teesra number directly dhoondh lein.
 *
 * Soch:
 *   a + b + c = 0
 *   c = -(a + b)
 *
 * Toh agar `a` fix karo (loop i), `b` fix karo (loop j),
 * toh `c` ka value pata hai: -(a + b).
 *
 * Ab bas check karo ki `c` pehle dekha hai ya nahi → HashSet!
 *
 * Approach:
 *   - Pehle array sort karo (duplicate skip karne ke liye)
 *   - Fix i, then iterate j from i+1
 *   - Har j ke liye check: -(nums[i] + nums[j]) HashSet me hai?
 *   - Agar hai → triplet found
 *   - nums[j] ko set me daalo for future j iterations
 *
 * Duplicates still JSON.stringify + Set se handle.
 *
 * TIME:  O(n^2) — two nested loops, HashSet lookup O(1)
 * SPACE: O(n) — HashSet + result storage
 */

namespace ThreeSumBetter {

  function threeSum(nums: number[]): number[][] {
    const n = nums.length;

    // Sort to make duplicate handling easier
    // WHY: sorted array me same triplet same order me aayega
    nums.sort((a, b) => a - b);

    const result: number[][] = [];
    // Track unique triplets
    const uniqueSet = new Set<string>();

    for (let i = 0; i < n; i++) {
      // Skip duplicate values for i
      // WHY: agar nums[i] === nums[i-1], toh same triplets phir se generate honge
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      // HashSet to store numbers seen so far in inner loop
      const seen = new Set<number>();

      for (let j = i + 1; j < n; j++) {
        // c = -(a + b)
        // WHY: a + b + c = 0 → c = -(a + b)
        const third = -(nums[i] + nums[j]);

        // Kya yeh third value pehle dekhi hai?
        if (seen.has(third)) {
          const triplet = [nums[i], third, nums[j]].sort((a, b) => a - b);
          const key = JSON.stringify(triplet);

          if (!uniqueSet.has(key)) {
            uniqueSet.add(key);
            result.push(triplet);
          }
        }

        // Current nums[j] ko set me daalo
        // WHY: future iterations me yeh third ban sakta hai
        seen.add(nums[j]);
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
   * After sort: [-4, -1, -1, 0, 1, 2]
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=0, nums[i]=-4                                         │
   * │   seen = {}                                              │
   * │                                                          │
   * │   j=1: third = -(-4 + -1) = 5                           │
   * │     5 in seen? NO. seen = {-1}                          │
   * │   j=2: third = -(-4 + -1) = 5                           │
   * │     5 in seen? NO. seen = {-1}                          │
   * │   j=3: third = -(-4 + 0) = 4                            │
   * │     4 in seen? NO. seen = {-1, 0}                       │
   * │   j=4: third = -(-4 + 1) = 3                            │
   * │     3 in seen? NO. seen = {-1, 0, 1}                   │
   * │   j=5: third = -(-4 + 2) = 2                            │
   * │     2 in seen? NO. seen = {-1, 0, 1, 2}                │
   * │   → No triplets with -4                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=1, nums[i]=-1                                         │
   * │   seen = {}                                              │
   * │                                                          │
   * │   j=2: third = -(-1 + -1) = 2                           │
   * │     2 in seen? NO. seen = {-1}                          │
   * │   j=3: third = -(-1 + 0) = 1                            │
   * │     1 in seen? NO. seen = {-1, 0}                       │
   * │   j=4: third = -(-1 + 1) = 0                            │
   * │     0 in seen? YES! → triplet [-1, 0, 1] ✅             │
   * │     seen = {-1, 0, 1}                                   │
   * │   j=5: third = -(-1 + 2) = -1                           │
   * │     -1 in seen? YES! → triplet [-1, -1, 2] ✅           │
   * │     seen = {-1, 0, 1, 2}                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=2, nums[i]=-1                                         │
   * │   nums[2] === nums[1]? YES → SKIP (duplicate)           │
   * └──────────────────────────────────────────────────────────┘
   *
   * Remaining i=3,4,5 yield no new triplets.
   *
   * Final result: [[-1, 0, 1], [-1, -1, 2]]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. All zeros: [0,0,0] → [[0,0,0]]
   * 2. Less than 3 elements: [] → []
   * 3. No valid triplet: [1,2,3] → []
   * 4. Duplicates in input: [-1,-1,0,1,1] → [[-1,0,1]]
   */

  export function runTests(): void {
    console.log('🧪 Testing 3 Sum — BETTER (HashSet)\n');

    const tests: Array<{ nums: number[]; expected: number[][] }> = [
      { nums: [-1, 0, 1, 2, -1, -4], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { nums: [0, 1, 1], expected: [] },
      { nums: [0, 0, 0], expected: [[0, 0, 0]] },
      { nums: [1, 2, -3, 4, -2, -1], expected: [[-3, -1, 4], [-3, 1, 2]] },
      { nums: [-1, -1, 0, 1, 1], expected: [[-1, 0, 1]] },
      { nums: [1, 2, 3], expected: [] },
      { nums: [-2, 0, 1, 1, 2], expected: [[-2, 0, 2], [-2, 1, 1]] },
      { nums: [0, 0, 0, 0], expected: [[0, 0, 0]] },
      { nums: [-4, -2, -1, 0, 1, 2, 3], expected: [[-4, 1, 3], [-2, -1, 3], [-2, 0, 2], [-1, 0, 1]] },
      { nums: [], expected: [] },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = threeSum([...nums]);
      const sortResult = result.map(t => JSON.stringify(t)).sort();
      const sortExpected = expected.map(t => JSON.stringify(t)).sort();
      const pass = JSON.stringify(sortResult) === JSON.stringify(sortExpected);

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got:      ${JSON.stringify(result)} → ${pass ? '✅' : '❌'}`);
    });
  }
}

ThreeSumBetter.runTests();