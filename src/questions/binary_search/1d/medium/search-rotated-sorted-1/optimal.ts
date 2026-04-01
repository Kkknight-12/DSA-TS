/**
 * ═══════════════════════════════════════════════════════════
 * SEARCH IN ROTATED SORTED ARRAY (NO DUPLICATES) — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Sorted array ko kisi point pe rotate kar diya gaya hai.
 * Array mein koi duplicates nahi hain.
 * Target ka index dhundho, nahi mila toh -1 return karo.
 *
 * EXAMPLE:
 *   Original: [0, 1, 2, 4, 5, 6, 7]
 *   Rotated:  [4, 5, 6, 7, 0, 1, 2]  ← 4 jagah se rotate hua
 *
 *   target=0 → return 4
 *   target=3 → return -1
 *
 * KEY INSIGHT:
 * Rotated array ko mid se kato — EK HALF HAMESHA SORTED RAHEGA!
 *
 * Kyun? Kyunki rotation sirf EK break point create karta hai.
 * Mid ya toh break ke left mein hai, ya right mein.
 * Jis side mein break nahi, woh side SORTED hai.
 *
 *   [4, 5, 6, 7, 0, 1, 2]
 *                ↑ break point
 *
 *   mid=3 (val=7): left=[4,5,6,7] sorted ✓, right=[0,1,2] unsorted (has break)
 *   mid=5 (val=1): left=[0,1]  sorted ✓ (no break in left from that point)
 *
 * APPROACH:
 * 1. Find which half is sorted
 * 2. Check if target falls in the sorted half's range
 * 3. If YES → go there. If NO → go to other half.
 *
 * TIME:  O(log n) — binary search
 * SPACE: O(1)
 */

namespace SearchRotatedSorted1Optimal {
  function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // Exact match!
      if (nums[mid] === target) return mid;

      // ─────────────────────────────────────────────────────
      // STEP 1: Kaunsa half sorted hai?
      //
      // Compare nums[left] with nums[mid]:
      //   nums[left] <= nums[mid] → left half is sorted (no break in it)
      //   nums[left] >  nums[mid] → right half is sorted (break is in left)
      // ─────────────────────────────────────────────────────

      if (nums[left] <= nums[mid]) {
        // LEFT HALF IS SORTED: nums[left..mid] is ascending
        //
        // Check if target is inside this sorted range: [nums[left], nums[mid])
        // WHY open on right? We already checked nums[mid] === target above.
        if (nums[left] <= target && target < nums[mid]) {
          right = mid - 1; // target is in sorted left half → go left
        } else {
          left = mid + 1; // target not in left half → must be in right
        }
      } else {
        // RIGHT HALF IS SORTED: nums[mid..right] is ascending
        //
        // Check if target is inside this sorted range: (nums[mid], nums[right]]
        // WHY open on left? We already checked nums[mid] === target above.
        if (nums[mid] < target && target <= nums[right]) {
          left = mid + 1; // target is in sorted right half → go right
        } else {
          right = mid - 1; // target not in right half → must be in left
        }
      }
    }

    return -1; // target not found
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * nums = [4, 5, 6, 7, 0, 1, 2],  target = 0
   *
   * idx:    0   1   2   3   4   5   6
   * val:    4   5   6   7   0   1   2
   *
   * Two sorted segments:
   *   Left segment:  [4, 5, 6, 7]   (indices 0-3)
   *   Right segment: [0, 1, 2]      (indices 4-6)
   *   Break point between index 3 and 4
   *
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3] = 7 == 0? NO                                  │
   * │   nums[0]=4 <= nums[3]=7? YES → LEFT HALF SORTED        │
   * │   Left half: [4, 5, 6, 7]  range = [4, 7)              │
   * │   4 <= 0 < 7? NO → target NOT in left half              │
   * │   → left = mid+1 = 4                                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=4, right=6, mid=5                          │
   * │   nums[5] = 1 == 0? NO                                  │
   * │   nums[4]=0 <= nums[5]=1? YES → LEFT HALF SORTED        │
   * │   Left half: [0, 1]  range = [0, 1)                    │
   * │   0 <= 0 < 1? YES → target IN left half                 │
   * │   → right = mid-1 = 4                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=4, right=4, mid=4                          │
   * │   nums[4] = 0 == 0? YES → return 4 ✅                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * DRY RUN 2 — Target not found
   * ═══════════════════════════════════════════════════════════
   *
   * nums = [4, 5, 6, 7, 0, 1, 2],  target = 3
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=7 == 3? NO                                    │
   * │   nums[0]=4 <= nums[3]=7? YES → LEFT HALF SORTED        │
   * │   4 <= 3 < 7? NO → left = 4                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=4, right=6, mid=5                          │
   * │   nums[5]=1 == 3? NO                                    │
   * │   nums[4]=0 <= nums[5]=1? YES → LEFT HALF SORTED        │
   * │   0 <= 3 < 1? NO → left = 6                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=6, right=6, mid=6                          │
   * │   nums[6]=2 == 3? NO                                    │
   * │   nums[6]=2 <= nums[6]=2? YES → LEFT HALF SORTED        │
   * │   2 <= 3 < 2? NO → left = 7                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=7 > right=6 → EXIT → return -1 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. No rotation: [1,2,3,4,5], target=3
   *    Normal binary search works — left half always sorted
   *
   * 2. Single element: [5], target=5 → 0 | target=3 → -1
   *
   * 3. Target at rotation point:
   *    [4,5,6,7,0,1,2], target=4 → 0  (leftmost element)
   *    [4,5,6,7,0,1,2], target=2 → 6  (rightmost element)
   *
   * 4. Two elements: [3,1], target=1 → 1 | target=3 → 0
   */

  export function runTests(): void {
    console.log('🧪 Testing Search Rotated Sorted 1 — OPTIMAL\n');

    const tests: Array<{ nums: number[]; target: number; expected: number }> = [
      { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 }, // basic: target in right seg
      { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 }, // target missing
      { nums: [1], target: 0, expected: -1 }, // single element, not found
      { nums: [1], target: 1, expected: 0 }, // single element, found
      { nums: [3, 1], target: 1, expected: 1 }, // two elements
      { nums: [3, 1], target: 3, expected: 0 }, // two elements, left
      { nums: [1, 2, 3, 4, 5], target: 3, expected: 2 }, // no rotation
      { nums: [5, 1, 2, 3, 4], target: 5, expected: 0 }, // target at rotation point
      { nums: [2, 3, 4, 5, 1], target: 1, expected: 4 }, // target at end
      { nums: [6, 7, 0, 1, 2, 4, 5], target: 6, expected: 0 }, // target at start
    ];

    tests.forEach(({ nums, target, expected }, i) => {
      const result = search(nums, target);
      const pass = result === expected;
      console.log(`Test ${i + 1}: nums=[${nums}], target=${target}`);
      console.log(
        `  Expected: ${expected} | Got: ${result} → ${pass ? '✅' : '❌'}`
      );
    });
  }
}

SearchRotatedSorted1Optimal.runTests();