/**
 * ═══════════════════════════════════════════════════════════
 * SINGLE ELEMENT IN A SORTED ARRAY — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Sorted array diya hai.
 * Har element exactly 2 baar aata hai, sirf ek element ko chhodkar.
 * Hume wahi single element dhoondhna hai.
 *
 * EXAMPLES:
 *   [1, 1, 2, 3, 3, 4, 4, 8, 8]  →  2
 *   [3, 3, 7, 7, 10, 11, 11]     →  10
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Pehle perfect pair pattern dekho:
 *
 *   [1, 1, 2, 2, 3, 3, 4, 4]
 *    0  1  2  3  4  5  6  7
 *
 * Yahan har pair even index se start ho raha hai:
 *   (0,1), (2,3), (4,5), (6,7)
 *
 * Ab single element beech mein daal do:
 *
 *   [1, 1, 2, 3, 3, 4, 4, 8, 8]
 *    0  1  2  3  4  5  6  7  8
 *
 * Single = 2 at index 2
 *
 * Single ke LEFT mein pair pattern normal hai:
 *   (0,1)
 *
 * Single ke RIGHT mein pair pattern shift ho gaya:
 *   (3,4), (5,6), (7,8)
 *
 * Yani:
 * - single se pehle pairs even index se start hote hain
 * - single ke baad pairs odd index se start hote hain
 *
 * Isi pattern break ko binary search se dhoondhna hai.
 *
 * WHY mid ko even banate hain?
 *
 * Kyunki hume pair ko standard form mein dekhna hai:
 *   (mid, mid+1)
 *
 * Agar mid odd hua, toh pair ulta ho jayega:
 *   (mid-1, mid)
 *
 * Isliye:
 *   if (mid % 2 === 1) mid--;
 *
 * Ab har baar compare kar sakte hain:
 *
 *   nums[mid] === nums[mid + 1]
 *     → pair pattern yahan tak normal hai
 *     → single RIGHT side mein hai
 *     → left = mid + 2
 *
 *   nums[mid] !== nums[mid + 1]
 *     → pattern yahin break ho gaya
 *     → single LEFT side mein hai ya mid pe hai
 *     → right = mid
 *
 * Alternative version bhi hota hai:
 *   partnerIndex = mid ^ 1
 *
 * Woh bhi valid hai.
 * Yeh even-normalization wala version bas zyada visual aur easy-to-remember hai.
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 *
 * PATTERN:
 *   while (left < right)
 *   converge to the single element index
 */

namespace SingleElementOptimal {

  function singleNonDuplicate(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    // Search window mein jab tak 2 ya usse zyada elements hain,
    // pair pattern dekh ke decide karo single kis side mein hai.
    while (left < right) {
      let mid = Math.floor((left + right) / 2);

      // Pair ko standard shape (mid, mid+1) mein lane ke liye
      // mid ko even index pe normalize karte hain.
      if (mid % 2 === 1) {
        mid--;
      }

      if (nums[mid] === nums[mid + 1]) {
        // Pair pattern yahan tak normal hai:
        // single is pair ke RIGHT mein hi hoga.
        left = mid + 2;
      } else {
        // Pattern yahin break hua:
        // single mid pe ho sakta hai ya left side mein.
        right = mid;
      }
    }

    // left === right → wahi single element ka index hai.
    return nums[left];
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Single in left half ───────────────────────
   * nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
   *
   * idx:   0   1   2   3   4   5   6   7   8
   * val:   1   1   2   3   3   4   4   8   8
   *                ↑
   *             single
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=8, mid=4                          │
   * │   mid even hai, same rakho                              │
   * │   nums[4]=3, nums[5]=4                                  │
   * │   3 == 4? NO → pattern break ho gaya                    │
   * │   single LEFT mein ya mid pe hai                        │
   * │   → right = mid = 4                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=0, right=4, mid=2                          │
   * │   mid even hai, same rakho                              │
   * │   nums[2]=2, nums[3]=3                                  │
   * │   2 == 3? NO → pattern yahin break hai                  │
   * │   single LEFT mein ya mid pe hai                        │
   * │   → right = mid = 2                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=0, right=2, mid=1                          │
   * │   mid odd hai → even banao: mid = 0                     │
   * │   nums[0]=1, nums[1]=1                                  │
   * │   1 == 1? YES → pair pattern normal hai                 │
   * │   single RIGHT mein hai                                 │
   * │   → left = mid + 2 = 2                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=2 === right=2 → return nums[2] = 2 ✅
   *
   * ── Example 2: Single in middle-right ────────────────────
   * nums = [3, 3, 7, 7, 10, 11, 11]
   *
   * idx:   0   1   2   3   4   5   6
   * val:   3   3   7   7   10  11  11
   *                        ↑
   *                     single
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   mid odd hai → even banao: mid = 2                     │
   * │   nums[2]=7, nums[3]=7                                  │
   * │   7 == 7? YES → pattern normal hai                      │
   * │   single RIGHT mein hai                                 │
   * │   → left = mid + 2 = 4                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=4, right=6, mid=5                          │
   * │   mid odd hai → even banao: mid = 4                     │
   * │   nums[4]=10, nums[5]=11                                │
   * │   10 == 11? NO → pattern break ho gaya                  │
   * │   single LEFT mein ya mid pe hai                        │
   * │   → right = mid = 4                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=4 === right=4 → return nums[4] = 10 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single element only:
   *    [7] → return 7
   *
   * 2. Single at start:
   *    [2,3,3,4,4,5,5] → return 2
   *
   * 3. Single at end:
   *    [1,1,2,2,3,3,9] → return 9
   *
   * 4. Single in exact middle:
   *    [1,1,2,3,3] → return 2
   */

  export function runTests(): void {
    console.log('🧪 Testing Single Element in Sorted Array — OPTIMAL\n');

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [1, 1, 2, 3, 3, 4, 4, 8, 8], expected: 2 },
      { nums: [3, 3, 7, 7, 10, 11, 11], expected: 10 },
      { nums: [7], expected: 7 },
      { nums: [2, 3, 3, 4, 4, 5, 5], expected: 2 },
      { nums: [1, 1, 2, 2, 3, 3, 9], expected: 9 },
      { nums: [1, 1, 2, 3, 3], expected: 2 },
      { nums: [0, 1, 1, 2, 2], expected: 0 },
      { nums: [1, 1, 5, 6, 6, 7, 7], expected: 5 },
      { nums: [4, 4, 6, 6, 8, 9, 9], expected: 8 },
      { nums: [11, 11, 13, 13, 17, 19, 19], expected: 17 },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = singleNonDuplicate(nums);
      const pass = result === expected;

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${expected} | Got: ${result} → ${pass ? '✅' : '❌'}`);
    });
  }
}

SingleElementOptimal.runTests();
