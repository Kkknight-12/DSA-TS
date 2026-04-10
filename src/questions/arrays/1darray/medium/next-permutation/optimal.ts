/**
 * ═══════════════════════════════════════════════════════════
 * NEXT PERMUTATION — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array `nums` ko in-place next lexicographically greater permutation me convert karo.
 *
 * Agar current arrangement already last permutation hai,
 * toh array ko smallest permutation me convert kar do.
 *
 * Important:
 *   function in-place kaam kare
 *   answer return karna zaruri nahi
 *   duplicate values ho sakti hain
 *
 * EXAMPLES:
 *   [1,2,3] -> [1,3,2]
 *   [3,2,1] -> [1,2,3]
 *   [1,1,5] -> [1,5,1]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Goal ye nahi hai ki "bas koi larger arrangement" mile.
 * Hume:
 *
 *   current arrangement se just next larger arrangement chahiye
 *
 * Isliye right se search karte hain.
 *
 * Soch:
 *   - right side pe jo suffix descending hai, woh already sabse bada arrangement hai
 *   - is suffix ke andar rehkar next larger permutation possible nahi
 *   - first jagah jahan increase possible ho, wahi pivot milega
 *
 * Phir:
 *   1. pivot se just bada number right side me dhoondo
 *   2. swap karo
 *   3. suffix ko smallest possible order me le aao
 *
 * TIME:  O(n) — max 3 linear scans
 * SPACE: O(1) — in-place
 */

namespace NextPermutationOptimal {
  function nextPermutation(nums: number[]): void {
    if (nums.length <= 1) return;

    // Step 1:
    // Right se pehla aisa index dhoondo jahan ascending break mile:
    // nums[pivot] < nums[pivot + 1]
    //
    // WHY:
    // iske right ka pura part non-increasing suffix hoga,
    // jo already sabse bada arrangement hai.
    let pivot = nums.length - 2;
    while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) {
      pivot--;
    }

    if (pivot >= 0) {
      // Step 2:
      // Right se pehla aisa element dhoondo jo pivot value se bada ho.
      //
      // WHY right se?
      // suffix descending hai, so rightmost greater element hi
      // pivot se just bada candidate hoga.
      let successor = nums.length - 1;
      while (nums[successor] <= nums[pivot]) {
        successor--;
      }

      swap(nums, pivot, successor);
    }

    // Step 3:
    // Pivot ke right ka suffix reverse karo.
    //
    // WHY:
    // swap ke baad suffix abhi bhi descending order me hota hai.
    // Next permutation chahiye, isliye suffix ka smallest possible arrangement banana hoga.
    reverse(nums, pivot + 1, nums.length - 1);
  }

  function swap(nums: number[], i: number, j: number): void {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  function reverse(nums: number[], left: number, right: number): void {
    while (left < right) {
      swap(nums, left, right);
      left++;
      right--;
    }
  }

  function isSamePermutation(a: number[], b: number[]): boolean {
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
   * nums = [1, 3, 2]
   *
   * Goal:
   *   current se just next larger permutation chahiye
   *
   * Start:
   *   pivot = nums.length - 2 = 1
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 1: FIND PIVOT
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ pivot = 1                                                │
   * │ nums[pivot] = 3                                          │
   * │ nums[pivot + 1] = 2                                      │
   * │ 3 >= 2 ? yes                                             │
   * │ action: pivot-- -> pivot = 0                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ pivot = 0                                                │
   * │ nums[pivot] = 1                                          │
   * │ nums[pivot + 1] = 3                                      │
   * │ 1 >= 3 ? no                                              │
   * │ stop                                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * Pivot found:
   *   pivot = 0
   *   pivot value = 1
   *
   * Meaning:
   *   right side [3,2] non-increasing suffix hai
   *   is suffix ke andar rehkar next larger permutation nahi ban sakti
   *   change yahi pivot position par karna padega
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 2: FIND SUCCESSOR
   * ═══════════════════════════════════════════════════════════
   *
   * Start:
   *   successor = 2
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ successor = 2                                            │
   * │ nums[successor] = 2                                      │
   * │ nums[pivot] = 1                                          │
   * │ 2 <= 1 ? no                                              │
   * │ stop                                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * Successor found:
   *   index = 2
   *   value = 2
   *
   * Swap pivot and successor:
   *
   * before swap:
   *   [1, 3, 2]
   *
   * after swap:
   *   [2, 3, 1]
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 3: REVERSE SUFFIX
   * ═══════════════════════════════════════════════════════════
   *
   * Reverse from pivot + 1 = 1 to end = 2
   *
   * Current suffix:
   *   [3, 1]
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left = 1, right = 2                                      │
   * │ swap nums[1] and nums[2]                                 │
   * │ array becomes [2, 1, 3]                                  │
   * │ left++ -> 2                                              │
   * │ right-- -> 1                                             │
   * │ left < right ? no                                        │
   * │ reverse done                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   [2, 1, 3]
   *
   * ═══════════════════════════════════════════════════════════
   * SPECIAL CASE: NO PIVOT
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   *   [3, 2, 1]
   *
   * Right se scan karoge toh koi pivot nahi milega.
   * Matlab pura array already largest permutation hai.
   *
   * Then:
   *   pivot = -1
   *   reverse from 0 to end
   *
   * Result:
   *   [1, 2, 3]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single element -> same array
   * 2. Already last permutation -> reverse whole array
   * 3. Duplicates -> still same pivot/successor logic works
   * 4. Smallest permutation -> next one directly milti hai
   */

  export function runTests(): void {
    console.log("🧪 Testing Next Permutation — OPTIMAL\n");

    const tests: Array<{ input: number[]; expected: number[] }> = [
      { input: [1, 2, 3], expected: [1, 3, 2] },
      { input: [3, 2, 1], expected: [1, 2, 3] },
      { input: [1, 1, 5], expected: [1, 5, 1] },
      { input: [1, 3, 2], expected: [2, 1, 3] },
      { input: [2, 3, 1], expected: [3, 1, 2] },
      { input: [1], expected: [1] },
      { input: [1, 5, 1], expected: [5, 1, 1] },
      { input: [2, 2, 0, 4, 3, 1], expected: [2, 2, 1, 0, 3, 4] },
      { input: [1, 2], expected: [2, 1] },
      { input: [2, 1], expected: [1, 2] },
    ];

    tests.forEach(({ input, expected }, i) => {
      const nums = [...input];
      nextPermutation(nums);
      const pass = isSamePermutation(nums, expected);

      console.log(`Test ${i + 1}: input=[${input}]`);
      console.log(`  Expected: [${expected}]`);
      console.log(`  Got:      [${nums}] -> ${pass ? "✅" : "❌"}`);
    });
  }
}

NextPermutationOptimal.runTests();
