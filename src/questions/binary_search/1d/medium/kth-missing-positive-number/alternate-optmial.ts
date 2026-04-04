/**
 * ═══════════════════════════════════════════════════════════
 * KTH MISSING POSITIVE NUMBER — ALTERNATE OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Strictly increasing positive sorted array diya hai.
 * Hume kth missing positive number return karna hai.
 *
 * Yeh file same binary search ko ek alternate answer-derivation ke saath likhti hai.
 *
 * MAIN IDEA:
 *   missingCount(i) = arr[i] - (i + 1)
 *
 * Hum binary search se last index dhoondhte hain jahan:
 *
 *   missingCount < k
 *
 * Yani:
 * - right = last index jahan abhi kth missing tak nahi pahunche
 * - answer uske just baad start hota hai
 *
 * Example:
 *   arr = [2,3,4,7,11], k = 5
 *   missingCount = [1,1,1,3,6]
 *
 * Last index jahan missingCount < 5:
 *   right = 3  (missingCount = 3)
 *
 * arr[3] = 7 tak 3 missing numbers mil chuke.
 * Hume aur 2 missing chahiye.
 * Toh answer = 7 + 2 = 9
 *
 * Formula:
 *
 *   missingTillRight = arr[right] - (right + 1)
 *   remaining = k - missingTillRight
 *   answer = arr[right] + remaining
 *
 * Edge case:
 *   Agar right = -1 ho jaye,
 *   matlab kth missing number arr[0] se pehle hi hai
 *   → answer = k
 *
 * Alternative cleaner final formula:
 *   answer = left + k
 *
 * Woh main `optimal.ts` file me diya gaya hai.
 * Dono valid hain. Yeh version "last safe index" mental model deta hai.
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 */

namespace KthMissingPositiveNumberAlternateOptimal {

  function getMissingCount(arr: number[], index: number): number {
    return arr[index] - (index + 1);
  }

  function findKthPositive(arr: number[], k: number): number {
    let left = 0;
    let right = arr.length - 1;

    // Last index dhoondho jahan missingCount < k ho.
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const missingCount = getMissingCount(arr, mid);

      if (missingCount < k) {
        // Abhi kth missing tak nahi pahunche.
        // Last safe index aur right mein ho sakta hai.
        left = mid + 1;
      } else {
        // Yahan k ya usse zyada missing ho gaye.
        // Last safe index left side mein hoga.
        right = mid - 1;
      }
    }

    // right = last index jahan missingCount < k
    if (right === -1) {
      return k;
    }

    const missingTillRight = getMissingCount(arr, right);
    const remaining = k - missingTillRight;

    return arr[right] + remaining;
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
   * Hume last index chahiye jahan missing < 5 ho.
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=4, mid=2                          │
   * │   missingCount=4-(2+1)=1                                │
   * │   1 < 5? YES → right side mein jao                      │
   * │   → left = 3                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=3, right=4, mid=3                          │
   * │   missingCount=7-(3+1)=3                                │
   * │   3 < 5? YES → aur right mein jao                       │
   * │   → left = 4                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=4, right=4, mid=4                          │
   * │   missingCount=11-(4+1)=6                               │
   * │   6 < 5? NO → last safe index left mein hai             │
   * │   → right = 3                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * Loop end:
   *   right = 3
   *
   * missingTillRight = 3
   * remaining = 5 - 3 = 2
   * answer = arr[3] + 2 = 7 + 2 = 9 ✅
   *
   * ── Example 2: Answer arr[0] se pehle hai ────────────────
   * arr = [5, 6, 7], k = 3
   *
   * idx:      0  1  2
   * arr:      5  6  7
   * ideal:    1  2  3
   * missing:  4  4  4
   *
   * Har index pe missingCount already >= 3 hai.
   * Isliye right eventually -1 ho jayega.
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=2, mid=1                          │
   * │   missingCount=6-(1+1)=4                                │
   * │   4 < 3? NO → right = 0                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=0, right=0, mid=0                          │
   * │   missingCount=5-(0+1)=4                                │
   * │   4 < 3? NO → right = -1                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * right = -1 → answer = k = 3 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. kth missing before arr[0]:
   *    arr=[5,6,7], k=3 → 3
   *
   * 2. kth missing after whole array:
   *    arr=[1,2,3,4], k=2 → 6
   *
   * 3. Single element array:
   *    arr=[2], k=1 → 1
   *
   * 4. Standard boundary in middle:
   *    arr=[2,3,4,7,11], k=5 → 9
   */

  export function runTests(): void {
    console.log('🧪 Testing Kth Missing Positive Number — ALTERNATE OPTIMAL\n');

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

KthMissingPositiveNumberAlternateOptimal.runTests();
