/**
 * COMBINATION SUM III - BACKTRACKING WITH EXACT COUNT AND EXACT SUM
 * =================================================================
 *
 * PROBLEM:
 * Numbers `1` to `9` me se combinations choose karni hain.
 *
 * Conditions:
 * - exactly `k` numbers hone chahiye
 * - unka sum exactly `n` hona chahiye
 * - har number sirf ek baar use ho sakta hai
 *
 * Example:
 *   k = 3, n = 9
 *   answer = [[1,2,6], [1,3,5], [2,3,4]]
 *
 * INTUITION (Soch):
 * -----------------
 * Is problem me do constraints ek saath chal rahi hain:
 *
 *   1. aur kitne numbers chahiye?
 *   2. aur kitna sum banana baaki hai?
 *
 * Isliye `remainingCount` aur `remainingSum` track karna natural lagta hai.
 *
 * If we choose number `i`:
 *
 *   remainingCount decreases by 1
 *   remainingSum decreases by i
 *
 * Aur next recursion `i + 1` se start hoti hai because same number dobara use nahi kar sakte.
 *
 * Algorithm:
 * ----------
 * 1. Agar `k` invalid hai, empty answer return karo.
 * 2. Minimum possible sum aur maximum possible sum check karo.
 * 3. `result` aur `current` initialize karo.
 * 4. Recursion `start = 1`, `remainingCount = k`, `remainingSum = n` se start karo.
 * 5. Base case: `remainingCount === 0` and `remainingSum === 0`, current ka copy result me push karo.
 * 6. Agar `remainingCount === 0` but sum baaki hai, branch invalid hai.
 * 7. Agar `remainingSum <= 0`, branch invalid hai.
 * 8. Agar `start > 9`, no more numbers left, return karo.
 * 9. Loop `i = start` se `9` tak chalao.
 * 10. Agar `i > remainingSum`, break karo because larger values aur bhi useless honge.
 * 11. Pick `i`, recurse with `i + 1`, `remainingCount - 1`, `remainingSum - i`.
 * 12. Return ke baad `pop()` karke choice undo karo.
 *
 * TIME: O(C(9, k))
 * SPACE: O(k) excluding output
 */

namespace CombinationSumIIIBacktracking {
  export function combinationSum3(k: number, n: number): number[][] {
    if (k < 0 || k > 9) {
      // Sirf 1..9 numbers available hain.
      // 9 se zyada slots bhare hi nahi ja sakte.
      return [];
    }

    if (k === 0) {
      // Zero numbers tabhi valid hain jab required sum bhi zero ho.
      return n === 0 ? [[]] : [];
    }

    // Minimum possible sum tab milega jab hum smallest k unique numbers choose karein:
    //   1 + 2 + 3 + ... + k
    //
    // Is arithmetic series ka closed form hota hai:
    //   k * (first + last) / 2
    // = k * (1 + k) / 2
    //
    // Example:
    //   k = 4
    //   minimum sum = 1 + 2 + 3 + 4 = 10
    const minimumPossible = (k * (k + 1)) / 2;

    // Maximum possible sum tab milega jab hum largest k unique numbers choose karein:
    //   9 + 8 + 7 + ... + (10 - k)
    //
    // Yahan:
    //   first term = 10 - k
    //   last term = 9
    //   total terms = k
    //
    // Arithmetic series formula:
    //   k * (first + last) / 2
    // = k * ((10 - k) + 9) / 2
    // = k * (19 - k) / 2
    //
    // Example:
    //   k = 4
    //   largest 4 numbers = 6 + 7 + 8 + 9 = 30
    //   formula = 4 * (19 - 4) / 2 = 4 * 15 / 2 = 30
    const maximumPossible = (k * (19 - k)) / 2;

    if (n < minimumPossible || n > maximumPossible) {
      // Even best possible smallest/largest k-number sums se target cover nahi hota.
      // Isliye recursion start karna bhi waste hai.
      return [];
    }

    const result: number[][] = [];
    const current: number[] = [];

    explore(1, k, n, current, result);

    return result;
  }

  function explore(
    start: number,
    remainingCount: number,
    remainingSum: number,
    current: number[],
    result: number[][]
  ): void {
    if (remainingCount === 0 && remainingSum === 0) {
      // Exact number of slots fill ho gaye aur exact sum bhi ban gaya.
      // Current ek valid combination hai.
      result.push([...current]);
      return;
    }

    if (remainingCount === 0) {
      // Numbers ki required count complete ho gayi, but sum exact nahi bana.
      // Ab aur numbers add nahi kar sakte, so branch invalid hai.
      return;
    }

    if (remainingSum <= 0) {
      // Sum already exact zero nahi tha, ya negative ho gaya.
      // Positive numbers add karke is branch ko valid nahi bana sakte.
      return;
    }

    if (start > 9) {
      // 1..9 range finish ho gayi.
      return;
    }

    if (10 - start < remainingCount) {
      // `start..9` range me jitne numbers bache hain, woh required slots se kam hain.
      // Example: start=8, remainingCount=3 -> only [8,9] bache, impossible.
      return;
    }

    for (let number = start; number <= 9; number++) {
      if (number > remainingSum) {
        // Numbers increasing order me try ho rahe hain.
        // Current number hi remainingSum se bada hai, so next numbers bhi bade honge.
        break;
      }

      current.push(number);

      // `number + 1` because same value dobara use nahi karna.
      // One slot fill ho gaya, aur required sum me se current number consume ho gaya.
      explore(
        number + 1,
        remainingCount - 1,
        remainingSum - number,
        current,
        result
      );

      // Current frame ki choice undo karte hain taaki next number try ho sake.
      current.pop();
    }
  }

  /**
   * ==========================================================
   * DRY RUN - TWO REMAINING VALUES MODEL
   * ==========================================================
   *
   * Example:
   * k = 3, n = 7
   *
   * Expected:
   * [[1,2,4]]
   *
   * ==========================================================
   * HIGH-LEVEL RECURSION TREE
   * ==========================================================
   *
   * root  start=1, remainingCount=3, remainingSum=7, current=[]
   * │
   * ├── choose 1 -> start=2, remainingCount=2, remainingSum=6, current=[1]
   * │   │
   * │   ├── choose 2 -> start=3, remainingCount=1, remainingSum=4, current=[1,2]
   * │   │   ├── choose 3 -> remainingCount=0, remainingSum=1 -> invalid
   * │   │   ├── choose 4 -> remainingCount=0, remainingSum=0 -> push [1,2,4]
   * │   │   └── choose 5 -> number > remainingSum 4, break
   * │   │
   * │   ├── choose 3 -> start=4, remainingCount=1, remainingSum=3, current=[1,3]
   * │   │   └── choose 4 -> number > remainingSum 3, break
   * │   │
   * │   └── choose 4 -> start=5, remainingCount=1, remainingSum=2, current=[1,4]
   * │       └── choose 5 -> number > remainingSum 2, break
   * │
   * ├── choose 2 -> start=3, remainingCount=2, remainingSum=5, current=[2]
   * │   ├── choose 3 -> start=4, remainingCount=1, remainingSum=2
   * │   │   └── choose 4 -> number > remainingSum 2, break
   * │   └── choose 4 -> start=5, remainingCount=1, remainingSum=1
   * │       └── choose 5 -> number > remainingSum 1, break
   * │
   * └── choose 3 and above
   *     no valid 3-number path can make 7
   *
   * Output:
   * [[1,2,4]]
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME
   * ==========================================================
   *
   * Initial Call: combinationSum3(3, 7)
   * - result = []
   * - current = []
   * - Start: explore(1, 3, 7, current, result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: explore(start=1, remainingCount=3, remainingSum=7, current=[]) │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ Need 3 numbers more, need total 7 more                                 │
   * │ Base case? remainingCount===0 && remainingSum===0 -> Nahi              │
   * │ Invalid? No                                                             │
   * │                                                                          │
   * │ Try number 1: pick 1                                                     │
   * │ current = [1]                                                            │
   * │                                                                          │
   * │   ┌────────────────────────────────────────────────────────────┐       │
   * │   │ CALL 2: explore(start=2, remainingCount=2,                  │       │
   * │   │                 remainingSum=6, current=[1])                │       │
   * │   ├────────────────────────────────────────────────────────────┤       │
   * │   │ Need 2 numbers more, need total 6 more                     │       │
   * │   │                                                            │       │
   * │   │ Try number 2: pick 2                                       │       │
   * │   │ current = [1,2]                                            │       │
   * │   │                                                            │       │
   * │   │   ┌──────────────────────────────────────────────────┐   │       │
   * │   │   │ CALL 3: explore(start=3, remainingCount=1,        │   │       │
   * │   │   │                 remainingSum=4, current=[1,2])    │   │       │
   * │   │   ├──────────────────────────────────────────────────┤   │       │
   * │   │   │ Need 1 number more, need total 4 more             │   │       │
   * │   │   │                                                  │   │       │
   * │   │   │ Try number 3: pick 3                              │   │       │
   * │   │   │ current = [1,2,3]                                 │   │       │
   * │   │   │                                                  │   │       │
   * │   │   │   ┌────────────────────────────────────────┐   │   │       │
   * │   │   │   │ CALL 4: explore(start=4, remainingCount=0, │   │       │
   * │   │   │   │                 remainingSum=1,            │   │       │
   * │   │   │   │                 current=[1,2,3])           │   │       │
   * │   │   │   ├────────────────────────────────────────┤   │   │       │
   * │   │   │   │ remainingCount === 0 but remainingSum=1     │   │       │
   * │   │   │   │ Invalid branch, return                      │   │       │
   * │   │   │   └────────────────────────────────────────┘   │   │       │
   * │   │   │                                                  │   │       │
   * │   │   │ Backtrack: pop 3 -> current=[1,2]                │   │       │
   * │   │   │                                                  │   │       │
   * │   │   │ Try number 4: pick 4                              │   │       │
   * │   │   │ current = [1,2,4]                                 │   │       │
   * │   │   │                                                  │   │       │
   * │   │   │   ┌────────────────────────────────────────┐   │   │       │
   * │   │   │   │ CALL 5: explore(start=5, remainingCount=0, │   │       │
   * │   │   │   │                 remainingSum=0,            │   │       │
   * │   │   │   │                 current=[1,2,4])           │   │       │
   * │   │   │   ├────────────────────────────────────────┤   │   │       │
   * │   │   │   │ remainingCount === 0 and remainingSum === 0 │   │       │
   * │   │   │   │ result.push([1,2,4])                        │   │       │
   * │   │   │   │ result = [[1,2,4]]                          │   │       │
   * │   │   │   │ Return                                      │   │       │
   * │   │   │   └────────────────────────────────────────┘   │   │       │
   * │   │   │                                                  │   │       │
   * │   │   │ Backtrack: pop 4 -> current=[1,2]                │   │       │
   * │   │   │                                                  │   │       │
   * │   │   │ Try number 5: 5 > remainingSum 4 -> break        │   │       │
   * │   │   └──────────────────────────────────────────────────┘   │       │
   * │   │                                                            │       │
   * │   │ Backtrack: pop 2 -> current=[1]                            │       │
   * │   │                                                            │       │
   * │   │ Try number 3: pick 3 -> current=[1,3], remainingSum=3      │       │
   * │   │ Next start=4, but 4 > remainingSum 3, so no valid branch   │       │
   * │   │                                                            │       │
   * │   │ Try number 4: pick 4 -> current=[1,4], remainingSum=2      │       │
   * │   │ Next start=5, but 5 > remainingSum 2, so no valid branch   │       │
   * │   └────────────────────────────────────────────────────────────┘       │
   * │                                                                          │
   * │ Backtrack: pop 1 -> current=[]                                           │
   * │                                                                          │
   * │ Try number 2: current=[2], need 2 numbers more, need sum 5               │
   * │ No valid path                                                              │
   * │                                                                          │
   * │ Try number 3 and above                                                    │
   * │ No valid path                                                              │
   * │ Return                                                                    │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final result:
   * [[1,2,4]]
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. k=4, n=1 -> []
   * 2. k=1, n=5 -> [[5]]
   * 3. k=9, n=45 -> [[1,2,3,4,5,6,7,8,9]]
   * 4. k=2, n=100 -> []
   * 5. k=0, n=0 -> [[]]
   */

  type TestCase = {
    k: number;
    n: number;
    expected: number[][];
    label: string;
  };

  function canonicalize(combinations: number[][]): string {
    return JSON.stringify(
      combinations
        .map((combination) => [...combination].sort((a, b) => a - b))
        .sort((a, b) => {
          const left = a.join(",");
          const right = b.join(",");
          return left.localeCompare(right);
        })
    );
  }

  export function runTests(): void {
    const tests: TestCase[] = [
      { k: 3, n: 7, expected: [[1, 2, 4]], label: "basic example" },
      {
        k: 3,
        n: 9,
        expected: [[1, 2, 6], [1, 3, 5], [2, 3, 4]],
        label: "multiple valid combinations",
      },
      { k: 4, n: 1, expected: [], label: "target smaller than minimum possible sum" },
      { k: 1, n: 5, expected: [[5]], label: "single number answer" },
      {
        k: 9,
        n: 45,
        expected: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
        label: "all numbers used",
      },
      { k: 2, n: 5, expected: [[1, 4], [2, 3]], label: "two-number combinations" },
      { k: 2, n: 100, expected: [], label: "target larger than maximum possible sum" },
      { k: 3, n: 6, expected: [[1, 2, 3]], label: "minimum valid 3-number sum" },
      { k: 4, n: 10, expected: [[1, 2, 3, 4]], label: "minimum valid 4-number sum" },
      { k: 0, n: 0, expected: [[]], label: "zero slots zero sum edge case" },
    ];

    let passed = 0;

    console.log("Combination Sum III - Backtracking");
    console.log("====================================");

    for (const test of tests) {
      const actual = combinationSum3(test.k, test.n);
      const ok = canonicalize(actual) === canonicalize(test.expected);

      if (ok) {
        passed++;
      }

      console.log(`${ok ? "PASS" : "FAIL"} | ${test.label}`);
      console.log(`  input: k=${test.k}, n=${test.n}`);
      console.log(`  expected: ${JSON.stringify(test.expected)}`);
      console.log(`  actual:   ${JSON.stringify(actual)}`);
    }

    console.log("====================================");
    console.log(`Passed ${passed}/${tests.length} tests`);
  }
}

CombinationSumIIIBacktracking.runTests();

export { CombinationSumIIIBacktracking };
