/**
 * ═══════════════════════════════════════════════════════════
 * KTH MISSING POSITIVE NUMBER — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Strictly increasing positive sorted array diya hai.
 * Hume kth missing positive number dhoondhna hai.
 *
 * EXAMPLES:
 *   arr = [2, 3, 4, 7, 11], k = 5  →  9
 *   arr = [1, 2, 3, 4],     k = 2  →  6
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Pehle perfect array imagine karo:
 *
 *   idx:    0  1  2  3  4
 *   ideal: [1, 2, 3, 4, 5]
 *
 * Ab actual array dekho:
 *
 *   arr =  [2, 3, 4, 7, 11]
 *
 * Har index pe kitne numbers missing ho chuke hain?
 *
 *   idx=0:
 *     ideal value = 1
 *     actual value = 2
 *     missing till here = 2 - 1 = 1
 *
 *   idx=3:
 *     ideal value = 4
 *     actual value = 7
 *     missing till here = 7 - 4 = 3
 *
 * Isi se formula naturally nikalta hai:
 *
 *   missingCount(i) = arr[i] - (i + 1)
 *
 * Kyun?
 *   Agar kuch missing na hota, toh index i pe value i+1 aati.
 *   Actual value agar usse badi hai, toh difference hi missing numbers ka count hai.
 *
 * Ab binary search ka real target:
 *
 *   "first index jahan missingCount >= k ho jaye"
 *
 * Example:
 *   arr = [2,3,4,7,11], k = 5
 *   missingCount = [1,1,1,3,6]
 *
 * Pehla index jahan missingCount 5 ya usse zyada hua = 4
 *
 * Iska matlab:
 * - index 4 se pehle abhi k missing numbers complete nahi hue the
 * - index 4 pe ya uske pehle answer boundary cross ho gayi
 *
 * Final answer ka neat formula:
 *
 *   answer = left + k
 *
 * Kyun?
 *   Binary search ke end pe left = kitne actual numbers answer se chhote ya equal side me present hain.
 *   Toh first (left + k) positive numbers me:
 *   - left numbers present hain
 *   - k numbers missing hain
 *
 *   Isliye kth missing = left + k
 *
 * Alternative derivation bhi hoti hai:
 *   answer = arr[right] + (k - missingTillRight)
 *
 * Woh alternate file me hai.
 * Dono valid hain. Yeh version bas cleaner memory hook deta hai.
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 */

namespace KthMissingPositiveNumberOptimal {

  function findKthPositive(arr: number[], k: number): number {
    let left = 0;
    let right = arr.length - 1;

    // First index dhoondho jahan missingCount >= k ho.
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const missingCount = arr[mid] - (mid + 1);

      if (missingCount < k) {
        // Abhi tak enough missing numbers complete nahi hue.
        // Boundary right side mein hogi.
        left = mid + 1;
      } else {
        // Yahan k ya usse zyada missing numbers ho chuke hain.
        // First valid boundary left side mein ya yahin ho sakti hai.
        right = mid - 1;
      }
    }

    // left = first index jahan missingCount >= k
    // final kth missing number = left + k
    return left + k;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Standard case ─────────────────────────────
   * arr = [2, 3, 4, 7, 11], k = 5
   *
   * idx:      0   1   2   3    4
   * arr:      2   3   4   7   11
   * ideal:    1   2   3   4    5
   * missing:  1   1   1   3    6
   *
   * First index jahan missing >= 5 ho gaya = index 4
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=4, mid=2                          │
   * │   arr[2]=4, missingCount=4-(2+1)=1                      │
   * │   1 < 5? YES → boundary right mein hai                  │
   * │   → left = 3                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=3, right=4, mid=3                          │
   * │   arr[3]=7, missingCount=7-(3+1)=3                      │
   * │   3 < 5? YES → boundary aur right mein hai              │
   * │   → left = 4                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=4, right=4, mid=4                          │
   * │   arr[4]=11, missingCount=11-(4+1)=6                    │
   * │   6 < 5? NO → first valid boundary yahin ya left mein   │
   * │   → right = 3                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * Loop end:
   *   left = 4, right = 3
   *
   * Answer = left + k = 4 + 5 = 9 ✅
   *
   * ── Example 2: Answer array ke baad hai ──────────────────
   * arr = [1, 2, 3, 4], k = 2
   *
   * idx:      0  1  2  3
   * arr:      1  2  3  4
   * ideal:    1  2  3  4
   * missing:  0  0  0  0
   *
   * Yahan array ke andar kahin bhi missingCount >= 2 nahi milta.
   * Isliye left end me n pe pahunch jayega.
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=3, mid=1                          │
   * │   arr[1]=2, missingCount=2-(1+1)=0                      │
   * │   0 < 2? YES → left = 2                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=2, right=3, mid=2                          │
   * │   arr[2]=3, missingCount=3-(2+1)=0                      │
   * │   0 < 2? YES → left = 3                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=3, right=3, mid=3                          │
   * │   arr[3]=4, missingCount=4-(3+1)=0                      │
   * │   0 < 2? YES → left = 4                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Loop end:
   *   left = 4, right = 3
   *
   * Answer = left + k = 4 + 2 = 6 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Missing numbers start before arr[0]:
   *    arr=[5,6,7], k=3 → answer 3
   *
   * 2. No missing inside array prefix:
   *    arr=[1,2,3,4], k=2 → answer 6
   *
   * 3. Single element array:
   *    arr=[2], k=1 → answer 1
   *
   * 4. Boundary exactly at first valid index:
   *    arr=[2,3,4,7,11], k=5 → index 4
   */

  export function runTests(): void {
    console.log('🧪 Testing Kth Missing Positive Number — OPTIMAL\n');

    const tests: Array<{ arr: number[]; k: number; expected: number }> = [
      { arr: [2, 3, 4, 7, 11], k: 5, expected: 9 },
      { arr: [1, 2, 3, 4], k: 2, expected: 6 },
      { arr: [2], k: 1, expected: 1 },
      { arr: [5, 6, 7], k: 3, expected: 3 },
      { arr: [1, 3], k: 1, expected: 2 },
      { arr: [1, 3], k: 2, expected: 4 },
      { arr: [2, 4, 7, 10], k: 5, expected: 8 },
      { arr: [4, 5, 6, 9], k: 4, expected: 7 },
      { arr: [1, 2, 4], k: 3, expected: 6 },
      { arr: [10, 11, 12], k: 7, expected: 7 },
    ];

    tests.forEach(({ arr, k, expected }, i) => {
      const result = findKthPositive(arr, k);
      const pass = result === expected;

      console.log(`Test ${i + 1}: arr=[${arr}], k=${k}`);
      console.log(`  Expected: ${expected} | Got: ${result} → ${pass ? '✅' : '❌'}`);
    });
  }
}

KthMissingPositiveNumberOptimal.runTests();
