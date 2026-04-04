/**
 * ═══════════════════════════════════════════════════════════
 * PEAK ELEMENT — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array mein koi bhi aisa index return karo jahan element apne neighbors se bada ho.
 *
 * Peak ki definition:
 *   nums[i] > nums[i - 1]  AND  nums[i] > nums[i + 1]
 *
 * Edge elements ke liye problem yeh assume karti hai:
 *   nums[-1] = -∞
 *   nums[n]  = -∞
 *
 * Isliye first ya last element bhi peak ho sakta hai.
 *
 * EXAMPLES:
 *   [1, 2, 3, 1]             → peak index = 2
 *   [1, 2, 1, 3, 5, 6, 4]    → peak index = 1 ya 5
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Pehle slope samjho.
 *
 * Example 1:
 *   [1, 2, 3, 4, 3, 2]
 *             m  m+1
 *
 *   nums[mid] < nums[mid+1]
 *   3 < 4
 *
 * Yani hum ascending slope pe khade hain.
 *
 * Ab do hi possibilities hain:
 * 1. Array aage bhi chadhti rahe
 *    → last element peak ban jayega, kyunki right boundary ke baad -∞ hai
 *
 * 2. Array kahin aage jaake neeche gire
 *    → jahan rise se fall aayega, wahan peak mil jayega
 *
 * Dono cases mein ek peak RIGHT side mein zaroor hai.
 *
 * Example 2:
 *   [6, 5, 4, 3, 2]
 *    m  m+1
 *
 *   nums[mid] > nums[mid+1]
 *   6 > 5
 *
 * Yani hum descending slope pe hain.
 *
 * Is case mein:
 * - ya mid khud peak hai
 * - ya left side mein koi peak hai
 *
 * Isliye binary search mein bas slope direction dekhni hai:
 *
 *   nums[mid] < nums[mid + 1]
 *     → rising slope
 *     → peak RIGHT mein hai
 *     → left = mid + 1
 *
 *   nums[mid] > nums[mid + 1]
 *     → falling slope / mid peak
 *     → peak LEFT mein hai ya mid pe hai
 *     → right = mid
 *
 * WHY compare with nums[mid + 1]?
 *
 * Alternative versions exist:
 * - nums[mid] vs nums[mid - 1]
 * - both neighbors check karke direct peak detect karo
 *
 * Yeh version cleaner hai kyunki:
 * - while (left < right) mein hamesha mid < right hota hai
 * - isliye nums[mid + 1] safely in-bounds hota hai
 * - ek comparison se slope direction mil jaati hai
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 *
 * PATTERN:
 *   while (left < right)
 *   converge to any one valid peak index
 */

namespace PeakElementOptimal {

  function findPeakElement(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    // Jab tak window mein 2 ya usse zyada elements hain,
    // slope dekh ke us half ko rakho jahan peak guaranteed hai.
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] < nums[mid + 1]) {
        // Rising slope:
        // peak mid ke right mein zaroor milega.
        left = mid + 1;
      } else {
        // Falling slope ya mid khud peak:
        // peak mid pe ya left side mein hai, isliye mid include karo.
        right = mid;
      }
    }

    // left === right → search window ek hi index pe converge kar gayi
    // aur wahi koi valid peak hai.
    return left;
  }

  function isPeak(nums: number[], index: number): boolean {
    const leftNeighbor = index > 0 ? nums[index - 1] : Number.NEGATIVE_INFINITY;
    const rightNeighbor =
      index < nums.length - 1 ? nums[index + 1] : Number.NEGATIVE_INFINITY;

    return nums[index] > leftNeighbor && nums[index] > rightNeighbor;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Multiple possible peaks ───────────────────
   * nums = [1, 2, 1, 3, 5, 6, 4]
   *
   * idx:   0   1   2   3   4   5   6
   * val:   1   2   1   3   5   6   4
   *                               ↑
   *                          one valid peak
   *
   * Peak indices yahan 1 aur 5 dono ho sakte hain.
   * Yeh algorithm index 5 tak converge karega.
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=3, nums[4]=5                                  │
   * │   3 < 5? YES → rising slope                             │
   * │   peak RIGHT mein guaranteed hai                        │
   * │   → left = mid+1 = 4                                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=4, right=6, mid=5                          │
   * │   nums[5]=6, nums[6]=4                                  │
   * │   6 < 4? NO → falling slope / mid may be peak           │
   * │   peak LEFT side mein ya mid pe hai                     │
   * │   → right = mid = 5                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=4, right=5, mid=4                          │
   * │   nums[4]=5, nums[5]=6                                  │
   * │   5 < 6? YES → rising slope                             │
   * │   peak RIGHT mein guaranteed hai                        │
   * │   → left = mid+1 = 5                                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=5 === right=5 → return index 5 ✅
   *
   * ── Example 2: Strictly increasing array ─────────────────
   * nums = [1, 2, 3, 4]
   *
   * idx:   0   1   2   3
   * val:   1   2   3   4
   *                    ↑
   *               peak at boundary
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=3, mid=1                          │
   * │   nums[1]=2, nums[2]=3                                  │
   * │   2 < 3? YES → rising slope                             │
   * │   → left = 2                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=2, right=3, mid=2                          │
   * │   nums[2]=3, nums[3]=4                                  │
   * │   3 < 4? YES → rising slope                             │
   * │   → left = 3                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=3 === right=3 → return index 3 ✅
   *
   * Kyun valid hai?
   *   nums[3] = 4
   *   right neighbor imaginary hai = -∞
   *   4 > 3 and 4 > -∞ → peak ✓
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single element: [5]
   *    left=right=0 from start → 0 is peak
   *
   * 2. Strictly decreasing: [9,7,5,3]
   *    first element peak hoga
   *
   * 3. Strictly increasing: [1,3,5,7]
   *    last element peak hoga
   *
   * 4. Multiple peaks:
   *    [1,3,2,4,1] → 1 ya 3 dono valid answers
   */

  export function runTests(): void {
    console.log('🧪 Testing Peak Element — OPTIMAL\n');

    const tests: number[][] = [
      [1, 2, 3, 1],
      [1, 2, 1, 3, 5, 6, 4],
      [1],
      [1, 2],
      [2, 1],
      [1, 2, 3, 4, 5],
      [9, 7, 5, 3],
      [1, 3, 2, 4, 1],
      [1, 3, 5, 4, 2],
      [2, 5, 3, 6, 4, 7, 1],
    ];

    tests.forEach((nums, i) => {
      const peakIndex = findPeakElement(nums);
      const pass =
        peakIndex >= 0 && peakIndex < nums.length && isPeak(nums, peakIndex);

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(
        `  Returned index: ${peakIndex}, value: ${nums[peakIndex]} → ${pass ? '✅ valid peak' : '❌ invalid peak'}`
      );
    });
  }
}

PeakElementOptimal.runTests();
