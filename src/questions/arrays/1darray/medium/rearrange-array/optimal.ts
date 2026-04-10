/**
 * ═══════════════════════════════════════════════════════════
 * REARRANGE ARRAY ELEMENTS BY SIGN — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array `nums` diya hai jisme positives aur negatives equal count me hain.
 * Hume answer aisa banana hai:
 *   positive, negative, positive, negative...
 *
 * Rules:
 *   - answer positive se start kare
 *   - positives ka relative order preserve ho
 *   - negatives ka relative order preserve ho
 *
 * EXAMPLES:
 *   [3, 1, -2, -5, 2, -4] -> [3, -2, 1, -5, 2, -4]
 *   [-1, 1]               -> [1, -1]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Final answer ka pattern pehle se fixed hai:
 *
 *   even index  -> positive
 *   odd index   -> negative
 *
 * Example:
 *   answer = [+, -, +, -, +, -]
 *            0  1  2  3  4  5
 *
 * Toh hume positives aur negatives ko alag arrays me store karne ki zarurat nahi.
 * Jaisa hi koi positive mile, usko next even position me daal do.
 * Jaisa hi koi negative mile, usko next odd position me daal do.
 *
 * Main improvement:
 *   brute me 2 helper arrays banti thi
 *   optimal me direct final answer fill hota hai
 *
 * TIME:  O(n)
 * SPACE: O(n) for returned result array
 * AUXILIARY SPACE (excluding answer): O(1)
 */

namespace RearrangeArrayOptimal {
  function rearrangeArray(nums: number[]): number[] {
    const result = new Array<number>(nums.length);

    // Positives hamesha even indices par jayenge: 0, 2, 4, ...
    // Negatives hamesha odd indices par jayenge: 1, 3, 5, ...
    let positiveIndex = 0;
    let negativeIndex = 1;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) {
        result[positiveIndex] = nums[i];
        positiveIndex += 2;
      } else {
        result[negativeIndex] = nums[i];
        negativeIndex += 2;
      }
    }

    return result;
  }

  function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [3, 1, -2, -5, 2, -4]
   *
   * Start:
   *   result = [_, _, _, _, _, _]
   *   positiveIndex = 0
   *   negativeIndex = 1
   *
   * i = 0, nums[i] = 3
   *   positive hai
   *   result[0] = 3
   *   result = [3, _, _, _, _, _]
   *   positiveIndex = 2
   *
   * i = 1, nums[i] = 1
   *   positive hai
   *   result[2] = 1
   *   result = [3, _, 1, _, _, _]
   *   positiveIndex = 4
   *
   * i = 2, nums[i] = -2
   *   negative hai
   *   result[1] = -2
   *   result = [3, -2, 1, _, _, _]
   *   negativeIndex = 3
   *
   * i = 3, nums[i] = -5
   *   negative hai
   *   result[3] = -5
   *   result = [3, -2, 1, -5, _, _]
   *   negativeIndex = 5
   *
   * i = 4, nums[i] = 2
   *   positive hai
   *   result[4] = 2
   *   result = [3, -2, 1, -5, 2, _]
   *   positiveIndex = 6
   *
   * i = 5, nums[i] = -4
   *   negative hai
   *   result[5] = -4
   *   result = [3, -2, 1, -5, 2, -4]
   *   negativeIndex = 7
   *
   * Final answer:
   *   [3, -2, 1, -5, 2, -4]
   *
   * Most important observation:
   *   Humne separate positiveNumbers / negativeNumbers arrays banayi hi nahi.
   *   Direct final slots fill kar diye.
   *
   * EDGE CASES:
   * 1. Smallest valid input: [1, -1] -> [1, -1]
   * 2. Input negative se start ho sakta hai, answer fir bhi positive se start karega
   * 3. Relative order preserve hota hai because scan left-to-right ho raha hai
   */

  export function runTests(): void {
    console.log("🧪 Testing Rearrange Array by Sign — OPTIMAL\n");

    const tests: Array<{ nums: number[]; expected: number[] }> = [
      { nums: [3, 1, -2, -5, 2, -4], expected: [3, -2, 1, -5, 2, -4] },
      { nums: [1, -1], expected: [1, -1] },
      { nums: [-1, 1], expected: [1, -1] },
      { nums: [2, 4, 5, -1, -3, -4], expected: [2, -1, 4, -3, 5, -4] },
      { nums: [-2, -4, 1, 3], expected: [1, -2, 3, -4] },
      { nums: [1, 2, -3, -1], expected: [1, -3, 2, -1] },
      { nums: [5, -4, 3, -2, 1, -1], expected: [5, -4, 3, -2, 1, -1] },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = rearrangeArray(nums);
      const pass = arraysEqual(result, expected);

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: [${expected}]`);
      console.log(`  Got:      [${result}] -> ${pass ? "✅" : "❌"}`);
    });
  }
}

RearrangeArrayOptimal.runTests();
