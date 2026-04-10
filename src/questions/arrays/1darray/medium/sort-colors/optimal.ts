/**
 * ═══════════════════════════════════════════════════════════
 * SORT COLORS — OPTIMAL (Dutch National Flag)
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array `nums` me sirf `0`, `1`, `2` diye hain.
 * Hume array ko in-place sort karna hai.
 *
 * Meaning:
 *   0 -> red
 *   1 -> white
 *   2 -> blue
 *
 * EXAMPLES:
 *   [2,0,2,1,1,0] -> [0,0,1,1,2,2]
 *   [2,0,1]       -> [0,1,2]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Normal sorting sochne ki zarurat hi nahi hai,
 * kyunki values sirf 3 types ki hain.
 *
 * Hum array ko 4 regions me sochte hain:
 *
 *   [0 ... low-1]    -> already sorted 0s
 *   [low ... mid-1]  -> already sorted 1s
 *   [mid ... high]   -> unknown region
 *   [high+1 ... n-1] -> already sorted 2s
 *
 * Kaam bas itna hai:
 *   unknown region ko dheere dheere consume karo.
 *
 * Rules:
 *   if nums[mid] == 0 -> left side bhejo
 *   if nums[mid] == 1 -> beech me rehne do
 *   if nums[mid] == 2 -> right side bhejo
 *
 * Sabse important subtle point:
 *   jab 2 ko `high` ke saath swap karte hain,
 *   tab `mid` ko immediately aage nahi badhate.
 *
 * WHY:
 *   kyunki `high` se jo naya element `mid` par aaya hai,
 *   woh abhi unknown hai.
 *   Usko phir se inspect karna padega.
 *
 * TIME:  O(n)
 * SPACE: O(1)
 */

namespace SortColorsOptimal {
  function sortColors(nums: number[]): void {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
      if (nums[mid] === 0) {
        // 0 ko left sorted region me bhejna hai.
        // Swap ke baad:
        // - low par correct 0 aa gaya
        // - old low value mid par aa sakti hai, lekin woh 1 hi hogi
        //   because [low ... mid-1] region already 1s ka region hai
        [nums[low], nums[mid]] = [nums[mid], nums[low]];
        low++;
        mid++;
      } else if (nums[mid] === 1) {
        // 1 already middle region ka correct value hai.
        // Isko wahi chhod kar unknown region ko chhota karo.
        mid++;
      } else {
        // nums[mid] == 2
        // 2 ko right sorted region me bhejna hai.
        [nums[mid], nums[high]] = [nums[high], nums[mid]];
        high--;

        // Dhyan do:
        // yahan mid++ NAHI karte.
        // WHY:
        // right side se jo element aaya hai, woh 0/1/2 kuch bhi ho sakta hai.
        // Isliye current mid ko dobara process karna zaruri hai.
      }
    }
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
   * nums = [2, 0, 2, 1, 1, 0]
   *
   * Start:
   *   low = 0
   *   mid = 0
   *   high = 5
   *
   * Region meaning:
   *   [0 ... low-1]    -> 0s
   *   [low ... mid-1]  -> 1s
   *   [mid ... high]   -> unknown
   *   [high+1 ... n-1] -> 2s
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=0, mid=0, high=5                                    │
   * │ nums[mid] = 2                                           │
   * │ action: swap nums[mid] and nums[high]                   │
   * │                                                          │
   * │ before: [2, 0, 2, 1, 1, 0]                              │
   * │ after:  [0, 0, 2, 1, 1, 2]                              │
   * │                                                          │
   * │ high-- -> 4                                              │
   * │ mid same rahega -> 0                                     │
   * │ क्यों? because new nums[mid] abhi unknown hai            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=0, mid=0, high=4                                    │
   * │ nums[mid] = 0                                           │
   * │ action: swap nums[low] and nums[mid]                    │
   * │                                                          │
   * │ before: [0, 0, 2, 1, 1, 2]                              │
   * │ after:  [0, 0, 2, 1, 1, 2]                              │
   * │                                                          │
   * │ low++ -> 1                                               │
   * │ mid++ -> 1                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 3
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=1, mid=1, high=4                                    │
   * │ nums[mid] = 0                                           │
   * │ action: swap nums[low] and nums[mid]                    │
   * │                                                          │
   * │ before: [0, 0, 2, 1, 1, 2]                              │
   * │ after:  [0, 0, 2, 1, 1, 2]                              │
   * │                                                          │
   * │ low++ -> 2                                               │
   * │ mid++ -> 2                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 4
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=2, mid=2, high=4                                    │
   * │ nums[mid] = 2                                           │
   * │ action: swap nums[mid] and nums[high]                   │
   * │                                                          │
   * │ before: [0, 0, 2, 1, 1, 2]                              │
   * │ after:  [0, 0, 1, 1, 2, 2]                              │
   * │                                                          │
   * │ high-- -> 3                                              │
   * │ mid same -> 2                                            │
   * │ kyunki naya nums[mid] = 1 abhi inspect karna hai         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 5
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=2, mid=2, high=3                                    │
   * │ nums[mid] = 1                                           │
   * │ action: mid++                                            │
   * │ array same rahegi: [0, 0, 1, 1, 2, 2]                   │
   * │ mid -> 3                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 6
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=2, mid=3, high=3                                    │
   * │ nums[mid] = 1                                           │
   * │ action: mid++                                            │
   * │ array same: [0, 0, 1, 1, 2, 2]                          │
   * │ mid -> 4                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Loop stop:
   *   mid = 4, high = 3
   *   mid > high
   *
   * Meaning:
   *   unknown region empty ho gaya
   *
   * Final answer:
   *   [0, 0, 1, 1, 2, 2]
   *
   * EDGE CASES:
   * 1. [0] -> same
   * 2. [2,0,1] -> one of each
   * 3. already sorted array
   * 4. all same value
   */

  export function runTests(): void {
    console.log("🧪 Testing Sort Colors — OPTIMAL\n");

    const tests: Array<{ nums: number[]; expected: number[] }> = [
      { nums: [2, 0, 2, 1, 1, 0], expected: [0, 0, 1, 1, 2, 2] },
      { nums: [2, 0, 1], expected: [0, 1, 2] },
      { nums: [0], expected: [0] },
      { nums: [1], expected: [1] },
      { nums: [2], expected: [2] },
      { nums: [0, 0, 0], expected: [0, 0, 0] },
      { nums: [1, 1, 1], expected: [1, 1, 1] },
      { nums: [2, 2, 2], expected: [2, 2, 2] },
      { nums: [1, 0, 2, 1, 0, 2], expected: [0, 0, 1, 1, 2, 2] },
      { nums: [2, 2, 1, 0, 0, 1], expected: [0, 0, 1, 1, 2, 2] },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const arr = [...nums];
      sortColors(arr);
      const pass = arraysEqual(arr, expected);

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: [${expected}]`);
      console.log(`  Got:      [${arr}] -> ${pass ? "✅" : "❌"}`);
    });
  }
}

SortColorsOptimal.runTests();
