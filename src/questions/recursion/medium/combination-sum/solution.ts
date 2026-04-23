/**
 * COMBINATION SUM - BACKTRACKING WITH UNLIMITED REPETITION
 * ========================================================
 *
 * PROBLEM:
 * `candidates` array aur `target` diya hai.
 * Saare unique combinations return karne hain jinka sum target ke equal ho.
 *
 * Important:
 * Same candidate ko unlimited times use kar sakte hain.
 *
 * Example:
 *   candidates = [2, 3, 6, 7], target = 7
 *   answer = [[2, 2, 3], [7]]
 *
 * INTUITION (Soch):
 * -----------------
 * Har candidate ke paas two choices hain:
 *
 *   1. PICK current candidate
 *   2. SKIP current candidate
 *
 * Main trick:
 *
 *   PICK -> same index par raho
 *   SKIP -> next index par jao
 *
 * Why same index after pick?
 *
 *   Same element unlimited times use allowed hai.
 *   Agar 2 pick kiya, toh next call me 2 dobara pick kar sakte hain.
 *
 * Why next index after skip?
 *
 *   Agar 2 ko skip kar diya, toh current path me 2 wapas nahi aayega.
 *   Isse [2,3] and [3,2] jaise duplicate permutations avoid hote hain.
 *
 * Algorithm:
 * ----------
 * 1. Agar target `0` hai, empty combination `[[]]` return karo.
 * 2. Agar candidates empty hain, `[]` return karo.
 * 3. `result` aur `current` arrays initialize karo.
 * 4. Recursion `index = 0` and `remaining = target` se start karo.
 * 5. Base case: `remaining === 0`, current ka copy result me push karo.
 * 6. Invalid case: `remaining < 0`, path target se aage nikal gaya, return karo.
 * 7. Invalid case: `index === candidates.length`, no candidates left, return karo.
 * 8. Pick branch: candidates[index] ko current me push karo.
 * 9. Pick ke baad same `index` par recurse karo, because same value reuse allowed hai.
 * 10. Recursive call return kare toh `pop()` karke pick choice undo karo.
 * 11. Skip branch: current candidate ko chhod kar `index + 1` par recurse karo.
 * 12. Final result me saare valid unique combinations mil jayenge.
 *
 * TIME: O(2^t), where t = target / min(candidates)
 * SPACE: O(t) excluding output
 */

namespace CombinationSumBacktracking {
  export function combinationSum(
    candidates: number[],
    target: number
  ): number[][] {
    if (target === 0) {
      // Zero target ka matlab kuch bhi pick karne ki zaroorat nahi.
      // Empty combination already target 0 banati hai.
      return [[]];
    }

    if (candidates.length === 0) {
      // Koi candidate hi nahi hai, so positive target ban nahi sakta.
      return [];
    }

    const result: number[][] = [];
    const current: number[] = [];

    explore(0, target, current, candidates, result);

    return result;
  }

  function explore(
    index: number,
    remaining: number,
    current: number[],
    candidates: number[],
    result: number[][]
  ): void {
    if (remaining === 0) {
      // Remaining zero means current path ka sum exactly target ban gaya.
      // Copy push karna zaroori hai because current array future branches me mutate hogi.
      result.push([...current]);
      return;
    }

    if (remaining < 0) {
      // Candidates positive hain.
      // Remaining negative hone ka matlab sum target se aage nikal gaya.
      return;
    }

    if (index === candidates.length) {
      // Saare candidates decide ho chuke hain.
      // Remaining zero nahi hai, so ye path valid combination nahi bana sakta.
      return;
    }

    const candidate = candidates[index];

    // PICK branch:
    // Current candidate answer ka part ban raha hai, so path me add karte hain.
    current.push(candidate);

    // Same index par rukte hain because candidate unlimited times pick ho sakta hai.
    // Remaining target candidate value se reduce hota hai.
    explore(index, remaining - candidate, current, candidates, result);

    // Pick branch complete ho gayi.
    // Sirf iss frame ki choice undo hoti hai, parent choices current me preserved rehti hain.
    current.pop();

    // SKIP branch:
    // Current candidate ko is path ke liye permanently chhod rahe hain.
    // Isliye next index par move karte hain, sum/remaining same rehta hai.
    explore(index + 1, remaining, current, candidates, result);
  }

  /**
   * ==========================================================
   * DRY RUN - DECISION TREE + CALL FRAMES
   * ==========================================================
   *
   * Example:
   * candidates = [2, 3], target = 5
   *
   * Expected:
   * [[2, 3]]
   *
   * ==========================================================
   * HIGH-LEVEL DECISION TREE
   * ==========================================================
   *
   * root  (index=0, remaining=5, current=[])
   * │
   * ├── PICK 2 -> stay index=0, remaining=3, current=[2]
   * │   │
   * │   ├── PICK 2 -> stay index=0, remaining=1, current=[2,2]
   * │   │   │
   * │   │   ├── PICK 2 -> remaining=-1, current=[2,2,2]
   * │   │   │   INVALID: remaining < 0, return
   * │   │   │
   * │   │   └── SKIP 2 -> index=1, remaining=1, current=[2,2]
   * │   │       ├── PICK 3 -> remaining=-2, invalid
   * │   │       └── SKIP 3 -> index=2, no candidates left
   * │   │
   * │   └── SKIP 2 -> index=1, remaining=3, current=[2]
   * │       │
   * │       ├── PICK 3 -> stay index=1, remaining=0, current=[2,3]
   * │       │   BASE CASE: push [2,3]
   * │       │
   * │       └── SKIP 3 -> index=2, remaining=3, no candidates left
   * │
   * └── SKIP 2 -> index=1, remaining=5, current=[]
   *     │
   *     ├── PICK 3 -> stay index=1, remaining=2, current=[3]
   *     │   ├── PICK 3 -> remaining=-1, invalid
   *     │   └── SKIP 3 -> index=2, no candidates left
   *     │
   *     └── SKIP 3 -> index=2, no candidates left
   *
   * Output:
   * [[2,3]]
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME
   * ==========================================================
   *
   * Initial Call: combinationSum([2, 3], 5)
   * - result = []
   * - current = []
   * - Start: explore(0, 5, [], [2,3], result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: explore(index=0, remaining=5, current=[])                   │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ candidate = 2                                                       │
   * │ Base case? remaining === 0 -> Nahi                                  │
   * │ Invalid? remaining < 0 or index end -> Nahi                         │
   * │                                                                      │
   * │ Try PICK 2: push 2, same index because reuse allowed                 │
   * │ current = [2]                                                        │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: explore(index=0, remaining=3, current=[2])         │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ candidate = 2                                              │   │
   * │   │                                                            │   │
   * │   │ Try PICK 2 again: same index                               │   │
   * │   │ current = [2, 2]                                           │   │
   * │   │                                                            │   │
   * │   │   ┌──────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 3: explore(index=0, remaining=1,             │   │   │
   * │   │   │                 current=[2,2])                    │   │   │
   * │   │   ├──────────────────────────────────────────────────┤   │   │
   * │   │   │ candidate = 2                                     │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ Try PICK 2 -> remaining becomes -1               │   │   │
   * │   │   │ Return because remaining < 0                     │   │   │
   * │   │   │ Backtrack: pop 2 -> current=[2,2]                │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ Try SKIP 2 -> move index to 1                    │   │   │
   * │   │   │ explore(index=1, remaining=1, current=[2,2])     │   │   │
   * │   │   │ No valid path, return                            │   │   │
   * │   │   └──────────────────────────────────────────────────┘   │   │
   * │   │                                                            │   │
   * │   │ Backtrack: pop 2 -> current=[2]                            │   │
   * │   │                                                            │   │
   * │   │ Try SKIP 2 -> move index to 1                              │   │
   * │   │                                                            │   │
   * │   │   ┌──────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 4: explore(index=1, remaining=3,             │   │   │
   * │   │   │                 current=[2])                      │   │   │
   * │   │   ├──────────────────────────────────────────────────┤   │   │
   * │   │   │ candidate = 3                                     │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ Try PICK 3 -> current=[2,3], remaining=0         │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │   ┌────────────────────────────────────────┐   │   │   │
   * │   │   │   │ CALL 5: explore(index=1, remaining=0,  │   │   │   │
   * │   │   │   │                 current=[2,3])         │   │   │   │
   * │   │   │   ├────────────────────────────────────────┤   │   │   │
   * │   │   │   │ remaining === 0 -> Haan                │   │   │   │
   * │   │   │   │ result.push([2,3])                     │   │   │   │
   * │   │   │   │ result = [[2,3]]                       │   │   │   │
   * │   │   │   │ Return                                 │   │   │   │
   * │   │   │   └────────────────────────────────────────┘   │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ Backtrack: pop 3 -> current=[2]                 │   │   │
   * │   │   │ Try SKIP 3 -> index=2, no candidates left       │   │   │
   * │   │   │ Return                                          │   │   │
   * │   │   └──────────────────────────────────────────────────┘   │   │
   * │   │                                                            │   │
   * │   │ Return to CALL 1                                           │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ Backtrack: pop 2 -> current=[]                                       │
   * │                                                                      │
   * │ Try SKIP 2 -> move index to 1                                        │
   * │ Branch cannot make 5 using only 3s, so no new result                 │
   * │ Return                                                               │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final result:
   * [[2,3]]
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. candidates = [2], target = 1 -> []
   * 2. candidates = [7], target = 7 -> [[7]]
   * 3. candidates = [3], target = 12 -> [[3,3,3,3]]
   * 4. candidates = [], target = 7 -> []
   * 5. candidates = [1], target = 0 -> [[]]
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
        candidates: [2, 3, 6, 7],
        target: 7,
        expected: [[2, 2, 3], [7]],
        label: "LeetCode example with direct candidate",
      },
      {
        candidates: [2, 3, 5],
        target: 8,
        expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
        label: "multiple valid combinations",
      },
      {
        candidates: [2],
        target: 1,
        expected: [],
        label: "no solution",
      },
      {
        candidates: [7],
        target: 7,
        expected: [[7]],
        label: "single candidate exact match",
      },
      {
        candidates: [3],
        target: 12,
        expected: [[3, 3, 3, 3]],
        label: "single candidate repeated",
      },
      {
        candidates: [2, 5],
        target: 10,
        expected: [[2, 2, 2, 2, 2], [5, 5]],
        label: "two different repetition paths",
      },
      {
        candidates: [1, 2, 3],
        target: 4,
        expected: [[1, 1, 1, 1], [1, 1, 2], [1, 3], [2, 2]],
        label: "candidate one creates deeper recursion",
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
      {
        candidates: [3, 2],
        target: 5,
        expected: [[3, 2]],
        label: "input order does not affect validity",
      },
    ];

    let passed = 0;

    console.log("Combination Sum - Backtracking");
    console.log("====================================");

    for (const test of tests) {
      const actual = combinationSum(test.candidates, test.target);
      const ok = canonicalize(actual) === canonicalize(test.expected);

      if (ok) {
        passed++;
      }

      console.log(`${ok ? "PASS" : "FAIL"} | ${test.label}`);
      console.log(
        `  input: candidates=${JSON.stringify(test.candidates)}, target=${test.target}`
      );
      console.log(`  expected: ${JSON.stringify(test.expected)}`);
      console.log(`  actual:   ${JSON.stringify(actual)}`);
    }

    console.log("====================================");
    console.log(`Passed ${passed}/${tests.length} tests`);
  }
}

CombinationSumBacktracking.runTests();

export { CombinationSumBacktracking };
