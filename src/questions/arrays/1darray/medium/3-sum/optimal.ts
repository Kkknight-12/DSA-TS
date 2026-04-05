/**
 * ═══════════════════════════════════════════════════════════
 * 3 SUM — OPTIMAL (Sort + Two Pointers)
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
 * Better approach me HashSet use kiya O(n) extra space ke saath.
 * Kya bina extra space ke kar sakte hain?
 *
 * Key insight: Agar array SORTED hai, toh two pointer chalega!
 *
 * Sorted array:
 *
 *   [-4, -1, -1, 0, 1, 2]
 *     i   L            R
 *
 * Fix `i` as first element.
 * Remaining array me two pointers: left (i+1) and right (end).
 *
 *   sum = nums[i] + nums[left] + nums[right]
 *
 *   sum < 0  → sum chhota hai → left++ (bigger value chahiye)
 *   sum > 0  → sum bada hai  → right-- (smaller value chahiye)
 *   sum = 0  → triplet found!
 *
 * Duplicates kaise skip karein?
 *
 *   1. i ke liye: agar nums[i] === nums[i-1], skip
 *   2. Triplet milne ke baad:
 *      - left++ jab tak nums[left] === nums[left-1]
 *      - right-- jab tak nums[right] === nums[right+1]
 *
 * No HashSet needed. No JSON.stringify.
 * Clean duplicate handling through sorted order.
 *
 * TIME:  O(n^2) — outer loop O(n), two pointer O(n) each
 * SPACE: O(1) — ignoring result array (no extra data structures)
 */

namespace ThreeSumOptimal {

  function threeSum(nums: number[]): number[][] {
    const n = nums.length;
    // Edge case: 3 se kam elements me triplet possible nahi
    if (n < 3) return [];

    // Step 1: Sort the array
    // WHY: sorting se two pointer technique use kar sakte hain
    // aur duplicates skip karna easy ho jaata hai
    nums.sort((a, b) => a - b);

    const result: number[][] = [];

    // Step 2: Fix first element with i
    for (let i = 0; i < n - 2; i++) {
      // Skip duplicates for i
      // WHY: same value se same triplets dobara generate honge
      // EXAMPLE: [-1, -1, 0, 1] → i=0 and i=1 dono nums[i]=-1
      //          dono same triplets denge, so i=1 skip
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      // Early termination: agar smallest three elements ka sum > 0
      // toh aage koi bhi triplet sum = 0 nahi de sakta
      // WHY: array sorted hai, aage sab bade numbers hain
      if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;

      // Early skip: agar nums[i] + two largest < 0
      // toh is i ke saath koi triplet possible nahi
      if (nums[i] + nums[n - 2] + nums[n - 1] < 0) continue;

      // Step 3: Two pointers for remaining two elements
      let left = i + 1;
      let right = n - 1;

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];

        if (sum < 0) {
          // Sum chhota hai → bigger value chahiye → left aage badhao
          left++;
        } else if (sum > 0) {
          // Sum bada hai → smaller value chahiye → right peeche lao
          right--;
        } else {
          // sum === 0 → Triplet found!
          result.push([nums[i], nums[left], nums[right]]);

          // Skip duplicate lefts
          // WHY: same left value se same triplet dobara milega
          // EXAMPLE: [-1, 0, 0, 1] → left pointing to first 0
          //          after found, skip second 0
          while (left < right && nums[left] === nums[left + 1]) left++;

          // Skip duplicate rights
          while (left < right && nums[right] === nums[right - 1]) right--;

          // Move both pointers inward
          // WHY: current pair done, naye pair try karo
          left++;
          right--;
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
   * After sort: [-4, -1, -1, 0, 1, 2]
   *              0    1    2  3  4  5
   *
   * ═══════════════════════════════════════════════════════════
   * i = 0, nums[i] = -4
   * ═══════════════════════════════════════════════════════════
   *
   * Early skip check: -4 + 1 + 2 = -1 < 0 → CONTINUE (skip this i)
   *
   * ═══════════════════════════════════════════════════════════
   * i = 1, nums[i] = -1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=2, right=5                                         │
   * │ sum = -1 + (-1) + 2 = 0  → FOUND!                      │
   * │ triplet: [-1, -1, 2]                                    │
   * │ Skip dup left: nums[2]=-1, nums[3]=0 → no dup          │
   * │ Skip dup right: nums[5]=2, nums[4]=1 → no dup          │
   * │ left=3, right=4                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=3, right=4                                         │
   * │ sum = -1 + 0 + 1 = 0  → FOUND!                         │
   * │ triplet: [-1, 0, 1]                                     │
   * │ left=4, right=3 → left >= right → STOP                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 2, nums[i] = -1
   * ═══════════════════════════════════════════════════════════
   *
   * nums[2] === nums[1]? -1 === -1? YES → SKIP (duplicate i)
   *
   * ═══════════════════════════════════════════════════════════
   * i = 3, nums[i] = 0
   * ═══════════════════════════════════════════════════════════
   *
   * Early break: 0 + 1 + 2 = 3 > 0 → BREAK
   *
   * Final result: [[-1, -1, 2], [-1, 0, 1]]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. All zeros: [0,0,0] → [[0,0,0]]
   * 2. Empty array: [] → []
   * 3. No valid triplet: [1,2,3] → []
   * 4. Many duplicates: [-1,-1,-1,0,1,1,1] → [[-1,0,1]]
   * 5. All negative: [-3,-2,-1] → []
   */

  export function runTests(): void {
    console.log('🧪 Testing 3 Sum — OPTIMAL (Sort + Two Pointers)\n');

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

ThreeSumOptimal.runTests();