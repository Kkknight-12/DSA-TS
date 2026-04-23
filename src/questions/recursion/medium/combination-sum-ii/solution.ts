/**
 * COMBINATION SUM II - SORT + BACKTRACKING + DUPLICATE SKIP
 * ==========================================================
 *
 * PROBLEM:
 * `candidates` array aur `target` diya hai.
 * Saare unique combinations return karne hain jinka sum target ho.
 *
 * Important:
 * - Har element sirf ek baar use ho sakta hai.
 * - Input me duplicate values ho sakti hain.
 * - Output me duplicate combinations nahi chahiye.
 *
 * Example:
 *   candidates = [10, 1, 2, 7, 6, 1, 5], target = 8
 *   answer = [[1,1,6], [1,2,5], [1,7], [2,6]]
 *
 * INTUITION (Soch):
 * -----------------
 * Duplicate values ko handle karne ke liye pehle sort karte hain.
 *
 *   [10,1,2,7,6,1,5] -> [1,1,2,5,6,7,10]
 *
 * Ab same values adjacent hain.
 *
 * Har recursion level par hum loop chalate hain:
 *
 *   for i = start to end
 *
 * Same level par agar same value dobara dikhe, toh skip karte hain:
 *
 *   i > start && candidates[i] === candidates[i - 1]
 *
 * Why same level?
 *
 *   Same level ka duplicate same starting choice banayega,
 *   jisse duplicate combination generate hoga.
 *
 * Why next level par duplicate allowed?
 *
 *   Agar first 1 already pick ho chuka hai,
 *   next level par second 1 pick karna valid hai for [1,1,6].
 *
 * Algorithm:
 * ----------
 * 1. Agar target `0` hai, `[[]]` return karo.
 * 2. Candidates ka sorted copy banao so duplicates adjacent ho jayein.
 * 3. `result` and `current` initialize karo.
 * 4. Recursion `start = 0` and `remaining = target` se start karo.
 * 5. Base case: `remaining === 0`, current ka copy result me push karo.
 * 6. Loop `i = start` se sorted array ke end tak chalao.
 * 7. Agar `i > start` and current value previous value ke equal hai, skip karo.
 * 8. Agar current value remaining se badi hai, break karo because array sorted hai.
 * 9. Current value pick karo and `current.push(value)` karo.
 * 10. Recurse with `i + 1`, because each element sirf ek baar use ho sakta hai.
 * 11. Recursive call return kare toh `current.pop()` karke choice undo karo.
 * 12. Final result return karo.
 *
 * TIME: O(2^n)
 * SPACE: O(n) excluding output
 */

namespace CombinationSumIIBacktracking {
  export function combinationSum2(
    candidates: number[],
    target: number
  ): number[][] {
    if (target === 0) {
      // Zero target already empty combination se ban jata hai.
      return [[]];
    }

    if (candidates.length === 0) {
      // Koi candidate nahi hai, so positive target possible nahi.
      return [];
    }

    // Sorted copy use karte hain taaki input array mutate na ho.
    // Sorting duplicate values ko adjacent laati hai, which makes skip logic possible.
    const sortedCandidates = [...candidates].sort((a, b) => a - b);
    const result: number[][] = [];
    const current: number[] = [];

    explore(0, target, current, sortedCandidates, result);

    return result;
  }

  function explore(
    start: number,
    remaining: number,
    current: number[],
    candidates: number[],
    result: number[][]
  ): void {
    if (remaining === 0) {
      // Current path ka sum exactly target ho gaya.
      // Copy push karte hain because current future branches me mutate hota rahega.
      result.push([...current]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) {
        // Same recursion level par same value already branch bana chuki hai.
        // Is later duplicate ko process karenge toh same combination repeat ho jayegi.
        continue;
      }

      const candidate = candidates[i];

      if (candidate > remaining) {
        // Array sorted hai.
        // Current candidate remaining se bada hai, toh aage wale candidates bhi bade/equal honge.
        break;
      }

      // Pick current candidate for this path.
      current.push(candidate);

      // `i + 1` because each index sirf ek baar use ho sakta hai.
      // This is the main difference from Combination Sum I.
      explore(i + 1, remaining - candidate, current, candidates, result);

      // Current frame ki pick choice undo karte hain,
      // taaki same level ke next candidate se fresh branch ban sake.
      current.pop();
    }
  }

  /**
   * ==========================================================
   * DRY RUN - DUPLICATE SKIP MENTAL MODEL
   * ==========================================================
   *
   * Example:
   * candidates = [1, 1, 2, 5], target = 7
   *
   * Expected:
   * [[1,1,5], [2,5]]
   *
   * ==========================================================
   * WHY SORT?
   * ==========================================================
   *
   * Sorted candidates:
   *
   *   index:      0   1   2   3
   *   value:      1   1   2   5
   *               └───┘
   *             duplicates adjacent
   *
   * Duplicate skip condition:
   *
   *   i > start && candidates[i] === candidates[i - 1]
   *
   * Meaning:
   *
   *   "Same level par previous value jaisi value already process ho chuki hai."
   *
   * ==========================================================
   * HIGH-LEVEL RECURSION TREE
   * ==========================================================
   *
   * root  (start=0, remaining=7, current=[])
   * │
   * ├── i=0 choose 1 -> current=[1], start=1, remaining=6
   * │   │
   * │   ├── i=1 choose 1 -> current=[1,1], start=2, remaining=5
   * │   │   ├── i=2 choose 2 -> remaining=3, no valid continuation
   * │   │   └── i=3 choose 5 -> remaining=0, push [1,1,5]
   * │   │
   * │   ├── i=2 choose 2 -> current=[1,2], remaining=4
   * │   │   └── i=3 value 5 > remaining 4, break
   * │   │
   * │   └── i=3 choose 5 -> current=[1,5], remaining=1
   * │
   * ├── i=1 value 1 -> SKIP
   * │   reason: i > start and candidates[1] === candidates[0]
   * │
   * ├── i=2 choose 2 -> current=[2], start=3, remaining=5
   * │   └── i=3 choose 5 -> remaining=0, push [2,5]
   * │
   * └── i=3 choose 5 -> current=[5], remaining=2
   *
   * Output:
   * [[1,1,5], [2,5]]
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME
   * ==========================================================
   *
   * Initial Call: combinationSum2([1,1,2,5], 7)
   * - sortedCandidates = [1,1,2,5]
   * - result = []
   * - current = []
   * - Start: explore(0, 7, [], sortedCandidates, result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: explore(start=0, remaining=7, current=[])                   │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ Loop i from 0 to 3                                                   │
   * │                                                                      │
   * │ i=0, candidate=1                                                     │
   * │ Duplicate skip? i > start -> 0 > 0 -> Nahi                          │
   * │ Pick 1, current=[1]                                                  │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: explore(start=1, remaining=6, current=[1])         │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ Loop i from 1 to 3                                         │   │
   * │   │                                                            │   │
   * │   │ i=1, candidate=1                                           │   │
   * │   │ Duplicate skip? i > start -> 1 > 1 -> Nahi                │   │
   * │   │ Why allowed? This is first value of this new level.        │   │
   * │   │ Pick 1, current=[1,1]                                      │   │
   * │   │                                                            │   │
   * │   │   ┌──────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 3: explore(start=2, remaining=5,             │   │   │
   * │   │   │                 current=[1,1])                    │   │   │
   * │   │   ├──────────────────────────────────────────────────┤   │   │
   * │   │   │ i=2, candidate=2 -> pick                          │   │   │
   * │   │   │ explore(start=3, remaining=3, current=[1,1,2])   │   │   │
   * │   │   │ no valid continuation, return and pop 2           │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ i=3, candidate=5 -> pick                          │   │   │
   * │   │   │ current=[1,1,5], remaining becomes 0              │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │   ┌────────────────────────────────────────┐   │   │   │
   * │   │   │   │ CALL 4: explore(start=4, remaining=0,  │   │   │   │
   * │   │   │   │                 current=[1,1,5])       │   │   │   │
   * │   │   │   ├────────────────────────────────────────┤   │   │   │
   * │   │   │   │ remaining === 0 -> Haan                │   │   │   │
   * │   │   │   │ result.push([1,1,5])                   │   │   │   │
   * │   │   │   │ result = [[1,1,5]]                     │   │   │   │
   * │   │   │   │ Return                                 │   │   │   │
   * │   │   │   └────────────────────────────────────────┘   │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ Backtrack: pop 5 -> current=[1,1]              │   │   │
   * │   │   │ Return to CALL 2                               │   │   │
   * │   │   └──────────────────────────────────────────────────┘   │   │
   * │   │                                                            │   │
   * │   │ Backtrack: pop 1 -> current=[1]                            │   │
   * │   │                                                            │   │
   * │   │ i=2, candidate=2 -> pick, current=[1,2]                    │   │
   * │   │ next candidate 5 is bigger than remaining 4, break         │   │
   * │   │ Backtrack: pop 2 -> current=[1]                            │   │
   * │   │                                                            │   │
   * │   │ i=3, candidate=5 -> pick, current=[1,5]                    │   │
   * │   │ remaining=1, no valid continuation                         │   │
   * │   │ Backtrack: pop 5 -> current=[1]                            │   │
   * │   │ Return to CALL 1                                           │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ Backtrack: pop 1 -> current=[]                                       │
   * │                                                                      │
   * │ i=1, candidate=1                                                     │
   * │ Duplicate skip? 1 > 0 and candidates[1] === candidates[0] -> Haan   │
   * │ Skip this branch because root-level 1 already explored.              │
   * │                                                                      │
   * │ i=2, candidate=2 -> pick, current=[2]                                │
   * │ explore(start=3, remaining=5, current=[2])                           │
   * │ picks 5 -> remaining 0 -> push [2,5]                                 │
   * │                                                                      │
   * │ i=3, candidate=5 -> pick, remaining=2, no valid continuation         │
   * │ Return                                                               │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final result:
   * [[1,1,5], [2,5]]
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. candidates = [1,1,1,1], target = 2 -> [[1,1]]
   * 2. candidates = [2,3,5], target = 1 -> []
   * 3. candidates = [1,2,3,4,5], target = 5 -> [[1,4], [2,3], [5]]
   * 4. candidates = [2,2,2,2,2], target = 6 -> [[2,2,2]]
   * 5. candidates = [], target = 7 -> []
   */

  type TestCase = {
    candidates: number[];
    target: number;
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
      {
        candidates: [10, 1, 2, 7, 6, 1, 5],
        target: 8,
        expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]],
        label: "LeetCode example with duplicate ones",
      },
      {
        candidates: [2, 5, 2, 1, 2],
        target: 5,
        expected: [[1, 2, 2], [5]],
        label: "multiple duplicate twos",
      },
      {
        candidates: [2, 3, 5],
        target: 1,
        expected: [],
        label: "no solution because all values too large",
      },
      {
        candidates: [1, 1, 1, 1],
        target: 2,
        expected: [[1, 1]],
        label: "all duplicates collapse to one output",
      },
      {
        candidates: [1, 2, 3, 4, 5],
        target: 5,
        expected: [[1, 4], [2, 3], [5]],
        label: "distinct candidates",
      },
      {
        candidates: [2, 2, 2, 2, 2],
        target: 6,
        expected: [[2, 2, 2]],
        label: "same value can appear if there are enough indices",
      },
      {
        candidates: [1, 1, 2, 2, 3],
        target: 5,
        expected: [[1, 1, 3], [1, 2, 2], [2, 3]],
        label: "mixed duplicate groups",
      },
      {
        candidates: [],
        target: 7,
        expected: [],
        label: "empty candidates",
      },
      {
        candidates: [1],
        target: 0,
        expected: [[]],
        label: "zero target edge case",
      },
    ];

    let passed = 0;

    console.log("Combination Sum II - Backtracking");
    console.log("====================================");

    for (const test of tests) {
      const originalInput = [...test.candidates];
      const actual = combinationSum2(test.candidates, test.target);
      const ok = canonicalize(actual) === canonicalize(test.expected);
      const inputNotMutated =
        JSON.stringify(test.candidates) === JSON.stringify(originalInput);

      if (ok && inputNotMutated) {
        passed++;
      }

      console.log(`${ok && inputNotMutated ? "PASS" : "FAIL"} | ${test.label}`);
      console.log(
        `  input: candidates=${JSON.stringify(test.candidates)}, target=${test.target}`
      );
      console.log(`  expected: ${JSON.stringify(test.expected)}`);
      console.log(`  actual:   ${JSON.stringify(actual)}`);
      console.log(`  input unchanged: ${inputNotMutated}`);
    }

    console.log("====================================");
    console.log(`Passed ${passed}/${tests.length} tests`);
  }
}

CombinationSumIIBacktracking.runTests();

export { CombinationSumIIBacktracking };
