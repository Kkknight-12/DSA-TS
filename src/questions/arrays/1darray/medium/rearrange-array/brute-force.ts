/**
 * ═══════════════════════════════════════════════════════════
 * REARRANGE ARRAY ELEMENTS BY SIGN — BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek integer array `nums` diya hai jisme:
 *   - positives aur negatives ki count equal hai
 *   - hume answer me positive, negative, positive, negative... order banana hai
 *   - answer positive se start hona chahiye
 *   - positives ka relative order preserve hona chahiye
 *   - negatives ka relative order bhi preserve hona chahiye
 *
 * EXAMPLES:
 *   [3, 1, -2, -5, 2, -4] -> [3, -2, 1, -5, 2, -4]
 *   [-1, 1]               -> [1, -1]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Sabse seedha idea:
 *   1. saare positives alag collect karo
 *   2. saare negatives alag collect karo
 *   3. dono arrays ko alternate karke final answer banao
 *
 * Relative order preserve karna hai,
 * isliye positives aur negatives ko collect karte time push order maintain karna important hai.
 *
 * Note:
 *   is problem me "brute force" ka matlab exponential search nahi hai.
 *   Yahan brute ka matlab simple extra-storage approach hai.
 *
 * TIME:  O(n)
 * SPACE: O(n) extra
 * WHY SPACE O(n):
 *   positives array + negatives array alag store ho rahe hain.
 */

namespace RearrangeArrayBruteForce {
  function rearrangeArray(nums: number[]): number[] {
    const positiveNumbers: number[] = [];
    const negativeNumbers: number[] = [];

    // Pehle signs ko alag buckets me daal do.
    // WHY:
    // final alternating answer banate time hume order-preserved positives
    // aur order-preserved negatives ready mil jayenge.
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) {
        positiveNumbers.push(nums[i]);
      } else {
        negativeNumbers.push(nums[i]);
      }
    }

    const result = new Array<number>(nums.length);
    let resultIndex = 0;

    // Problem guarantee karti hai ki positives aur negatives count equal hai.
    // Isliye har positive ke saath exactly ek negative pair kar sakte hain.
    for (let i = 0; i < positiveNumbers.length; i++) {
      result[resultIndex] = positiveNumbers[i];
      resultIndex++;

      result[resultIndex] = negativeNumbers[i];
      resultIndex++;
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
   *   positiveNumbers = []
   *   negativeNumbers = []
   *
   * First loop: positives aur negatives separate karo
   *
   * i = 0, nums[i] = 3
   *   3 > 0
   *   positiveNumbers = [3]
   *   negativeNumbers = []
   *
   * i = 1, nums[i] = 1
   *   1 > 0
   *   positiveNumbers = [3, 1]
   *   negativeNumbers = []
   *
   * i = 2, nums[i] = -2
   *   -2 negative hai
   *   positiveNumbers = [3, 1]
   *   negativeNumbers = [-2]
   *
   * i = 3, nums[i] = -5
   *   negative
   *   positiveNumbers = [3, 1]
   *   negativeNumbers = [-2, -5]
   *
   * i = 4, nums[i] = 2
   *   positive
   *   positiveNumbers = [3, 1, 2]
   *   negativeNumbers = [-2, -5]
   *
   * i = 5, nums[i] = -4
   *   negative
   *   positiveNumbers = [3, 1, 2]
   *   negativeNumbers = [-2, -5, -4]
   *
   * Ab:
   *   positiveNumbers = [3, 1, 2]
   *   negativeNumbers = [-2, -5, -4]
   *
   * Second loop: alternate karke result banao
   *
   * Start:
   *   result = [_, _, _, _, _, _]
   *   resultIndex = 0
   *
   * i = 0
   *   result[0] = positiveNumbers[0] = 3
   *   result = [3, _, _, _, _, _]
   *   resultIndex = 1
   *
   *   result[1] = negativeNumbers[0] = -2
   *   result = [3, -2, _, _, _, _]
   *   resultIndex = 2
   *
   * i = 1
   *   result[2] = positiveNumbers[1] = 1
   *   result = [3, -2, 1, _, _, _]
   *   resultIndex = 3
   *
   *   result[3] = negativeNumbers[1] = -5
   *   result = [3, -2, 1, -5, _, _]
   *   resultIndex = 4
   *
   * i = 2
   *   result[4] = positiveNumbers[2] = 2
   *   result = [3, -2, 1, -5, 2, _]
   *   resultIndex = 5
   *
   *   result[5] = negativeNumbers[2] = -4
   *   result = [3, -2, 1, -5, 2, -4]
   *   resultIndex = 6
   *
   * Final answer:
   *   [3, -2, 1, -5, 2, -4]
   *
   * EDGE CASES:
   * 1. [1, -1] -> already alternating
   * 2. [-1, 1] -> answer still [1, -1], kyunki output positive se start karega
   * 3. Relative order preserve hona hi chahiye, sorting allowed nahi hai
   */

  export function runTests(): void {
    console.log("🧪 Testing Rearrange Array by Sign — BRUTE FORCE\n");

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

RearrangeArrayBruteForce.runTests();
