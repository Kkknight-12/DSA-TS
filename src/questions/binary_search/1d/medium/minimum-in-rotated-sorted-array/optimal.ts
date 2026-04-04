/**
 * ═══════════════════════════════════════════════════════════
 * MINIMUM IN ROTATED SORTED ARRAY — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Sorted array ko kisi point pe rotate kiya gaya hai.
 * Minimum element dhundo.
 * No duplicates.
 *
 * EXAMPLE:
 *   [4, 5, 6, 7, 0, 1, 2]  →  0
 *   [3, 4, 5, 1, 2]         →  1
 *   [1, 2, 3, 4, 5]         →  1  (no rotation)
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch):
 * ─────────────────────────────────────────────────────────
 *
 * Ek rotated sorted array aisa dikhta hai:
 *
 *   [4, 5, 6, 7, | 0, 1, 2]
 *    ─────────────  ───────
 *    high side       low side
 *         ↑
 *       DROP (7 → 0)
 *
 * Minimum wahi hai jahan DROP hota hai — yani low side ka pehla element.
 *
 * Binary search ka invariant:
 *   "Ek half ko tab eliminate karo jab PROVE ho sake ki minimum wahan NAHI hai."
 *
 * nums[mid] ko nums[right] se compare karo:
 *
 *   nums[mid] > nums[right]
 *     → suffix [mid..right] sorted NAHI hai (sorted hoti toh first <= last)
 *     → drop point is suffix ke andar hai
 *     → minimum strictly mid ke RIGHT mein hai
 *     → left = mid + 1  (mid safely exclude)
 *
 *   nums[mid] <= nums[right]
 *     → suffix [mid..right] sorted hai
 *     → sorted suffix ka minimum = nums[mid] (pehla element)
 *     → minimum mid pe hai ya mid ke LEFT mein — (mid+1..right] mein NAHI
 *     → right = mid  (mid include, mid-1 nahi)
 *
 * WHY nums[right]? nums[left] se kya dikkat hai?
 *
 *   nums[mid] > nums[left] sirf yeh prove karta hai ki [left..mid] sorted hai.
 *   Lekin sorted [left..mid] ka minimum = nums[left] — jo global minimum bhi ho sakta hai.
 *   Toh "go right" bolna GALAT hoga.
 *
 *   Example: [1, 2, 3, 4, 5]
 *     left=0, mid=2: nums[mid]=3 > nums[left]=1 → "go right"?
 *     → WRONG — minimum index 0 pe hai!
 *
 *   nums[left] se kaam kiya ja sakta hai, lekin alag logic chahiye:
 *     pehle check: if (nums[left] < nums[right]) return nums[left]  ← sorted case handle karo
 *     phir: nums[mid] >= nums[left] → left = mid + 1
 *   Yeh extra line zaroori hai, warna galat answer aata hai.
 *
 *   nums[right] se yeh extra check ki zaroorat nahi —
 *   suffix [mid..right] ka sorted/unsorted check ek hi comparison mein poora decision deta hai.
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 *
 * PATTERN: Pattern 2 (while left < right) — "find first valid"
 *   Convergence pe left === right === minimum ka index
 */

namespace MinimumRotatedSortedOptimal {

  function findMin(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    // Pattern 2: left < right (strict)
    // Jab single element bachta hai → wahi answer hai
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] > nums[right]) {
        // suffix [mid..right] sorted NAHI hai → drop point is suffix mein hai
        // minimum strictly mid ke right mein hai → mid safely exclude
        left = mid + 1;
      } else {
        // suffix [mid..right] sorted hai → minimum is suffix ka pehla element = nums[mid]
        // minimum mid pe ya left mein hai → mid include karo
        right = mid;
      }
    }

    // left === right → minimum element
    return nums[left];
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Standard rotation ─────────────────────────
   * nums = [4, 5, 6, 7, 0, 1, 2]
   *
   * idx:   0   1   2   3   4   5   6
   * val:   4   5   6   7   0   1   2
   *                        ↑
   *                     minimum (idx 4)
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=7, nums[6]=2                                  │
   * │   7 > 2? YES → mid on HIGH side → left = mid+1 = 4      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=4, right=6, mid=5                          │
   * │   nums[5]=1, nums[6]=2                                  │
   * │   1 > 2? NO → mid on LOW side → right = mid = 5         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=4, right=5, mid=4                          │
   * │   nums[4]=0, nums[5]=1                                  │
   * │   0 > 1? NO → mid on LOW side → right = mid = 4         │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=4 === right=4 → EXIT → nums[4] = 0 ✅
   *
   * ── Example 2: Rotation at second position ───────────────
   * nums = [3, 4, 5, 1, 2]
   *
   * idx:   0   1   2   3   4
   * val:   3   4   5   1   2
   *                    ↑
   *                 minimum (idx 3)
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=4, mid=2                          │
   * │   nums[2]=5, nums[4]=2                                  │
   * │   5 > 2? YES → HIGH side → left = mid+1 = 3             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=3, right=4, mid=3                          │
   * │   nums[3]=1, nums[4]=2                                  │
   * │   1 > 2? NO → LOW side → right = mid = 3                │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=3 === right=3 → EXIT → nums[3] = 1 ✅
   *
   * ── Example 3: No rotation (already sorted) ──────────────
   * nums = [1, 2, 3, 4, 5]
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=4, mid=2                          │
   * │   nums[2]=3, nums[4]=5                                  │
   * │   3 > 5? NO → right = mid = 2                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=0, right=2, mid=1                          │
   * │   nums[1]=2, nums[2]=3                                  │
   * │   2 > 3? NO → right = mid = 1                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=0, right=1, mid=0                          │
   * │   nums[0]=1, nums[1]=2                                  │
   * │   1 > 2? NO → right = mid = 0                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=0 === right=0 → EXIT → nums[0] = 1 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single element: [5] → left=right=0 → loop never runs → nums[0]=5 ✓
   * 2. Two elements rotated: [2,1] → mid=0, nums[0]=2>nums[1]=1 → left=1 → nums[1]=1 ✓
   * 3. Two elements sorted: [1,2] → mid=0, nums[0]=1<=nums[1]=2 → right=0 → nums[0]=1 ✓
   * 4. Rotated by 1: [2,3,4,5,1] → minimum at last position
   * 5. Rotated by n-1: [5,1,2,3,4] → minimum at second position
   */

  export function runTests(): void {
    console.log('🧪 Testing Minimum in Rotated Sorted Array — OPTIMAL\n');

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [4, 5, 6, 7, 0, 1, 2], expected: 0 },   // standard rotation
      { nums: [3, 4, 5, 1, 2],       expected: 1 },   // rotation in middle
      { nums: [1, 2, 3, 4, 5],       expected: 1 },   // no rotation
      { nums: [2, 1],                 expected: 1 },   // two elements rotated
      { nums: [1, 2],                 expected: 1 },   // two elements sorted
      { nums: [5],                    expected: 5 },   // single element
      { nums: [2, 3, 4, 5, 1],       expected: 1 },   // minimum at last
      { nums: [5, 1, 2, 3, 4],       expected: 1 },   // minimum at second
      { nums: [11, 13, 15, 17],      expected: 11 },  // no rotation, larger values
      { nums: [3, 1, 2],             expected: 1 },   // rotation, minimum in middle
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = findMin(nums);
      const pass = result === expected;
      console.log(`Test ${i + 1}: [${nums}]`);
      console.log(`  Expected: ${expected} | Got: ${result} → ${pass ? '✅' : '❌'}`);
    });
  }
}

MinimumRotatedSortedOptimal.runTests();