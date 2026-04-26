/**
 * SUBSETS II - SORT + BACKTRACKING + DUPLICATE SKIP
 * =================================================
 *
 * PROBLEM:
 * Array `nums` diya hai jisme duplicate values ho sakti hain.
 * Saare possible unique subsets return karne hain.
 *
 * Example:
 *   nums = [1, 2, 2]
 *   answer = [[], [1], [1,2], [1,2,2], [2], [2,2]]
 *
 * Intuition:
 * Plain subsets problem me include/exclude binary tree kaafi hota tha.
 * But duplicates aane par same-level duplicate choices ko skip karna padta hai.
 *
 * Isliye yahan loop-based recursion zyada natural hai:
 *   1. current subset ko result me add karo
 *   2. current level par start se end tak choices try karo
 *   3. same-level duplicate choice ko skip karo
 *   4. chosen value ko current me add karo
 *   5. next level ke liye recurse karo
 *   6. backtrack karke choice undo karo
 *
 * Algorithm:
 * 1. Input ka sorted copy banao taaki duplicate values adjacent aa jaayein.
 * 2. Empty `result` aur empty `current` initialize karo.
 * 3. Recursion `start = 0` se begin karo.
 * 4. Har recursive call ke start me current subset ka copy result me add karo.
 * 5. Loop `i = start` se array end tak chalao.
 * 6. Agar `i > start` and current value previous value ke equal ho, same-level duplicate ko skip karo.
 * 7. Current value ko `current.push(...)` se pick karo.
 * 8. Recurse with `i + 1`, because same index dobara use nahi karna.
 * 9. Recursive call ke baad `current.pop()` karke current frame ki choice undo karo.
 * 10. Loop complete hone par call return karegi.
 *
 * Time Complexity:
 *   O(n * 2^n)
 *   Worst case me distinct elements ke liye 2^n subsets aur copy cost O(n).
 *
 * Space Complexity:
 *   O(n)
 *   Recursion stack + current subset depth.
 */

namespace SubsetsIIBacktracking {
  export function subsetsWithDup(nums: number[]): number[][] {
    const sortedNums = [...nums].sort((a, b) => a - b);
    const result: number[][] = [];
    const current: number[] = [];

    buildSubsets(0, sortedNums, current, result);

    return result;
  }

  function buildSubsets(
    start: number,
    nums: number[],
    current: number[],
    result: number[][]
  ): void {
    // Current recursion state khud ek valid subset represent karti hai.
    // Isliye har call ke start me current ka copy result me store hota hai.
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) {
        // Same recursion level par previous same value already branch bana chuki hai.
        // Is later duplicate ko choose karenge toh same subset structure dobara banega.
        continue;
      }

      current.push(nums[i]);

      // `i + 1` ka matlab current index consume ho chuka hai.
      // Agli recursion sirf remaining right-side elements se subsets banayegi.
      buildSubsets(i + 1, nums, current, result);

      // Current frame ki pick choice undo karte hain
      // taaki same level ke next candidate ke saath fresh branch ban sake.
      current.pop();
    }
  }

  /**
   * ==========================================================
   * MENTAL MODEL
   * ==========================================================
   *
   * Sorted nums = [1, 2, 2]
   *
   * start ka meaning:
   *   current recursion level par choices yahan se start hongi
   *
   * i ka meaning:
   *   current level ke liye kaunsa next value choose kar rahe hain
   *
   * Duplicate skip condition:
   *
   *   i > start && nums[i] === nums[i - 1]
   *
   * Meaning:
   *   "Same level par same value se branch already ban chuki hai."
   *
   * ==========================================================
   * HIGH-LEVEL RECURSION TREE
   * ==========================================================
   *
   * root  (start=0, current=[])
   * │
   * ├── add [] to result
   * │
   * ├── i=0 choose 1 -> current=[1]
   * │   │
   * │   ├── add [1] to result
   * │   ├── i=1 choose 2 -> current=[1,2]
   * │   │   │
   * │   │   ├── add [1,2] to result
   * │   │   ├── i=2 choose 2 -> current=[1,2,2]
   * │   │   │   └── add [1,2,2] to result
   * │   │   └── return and pop
   * │   │
   * │   └── i=2 value 2 -> skip
   * │       reason: same level duplicate
   * │
   * ├── i=1 choose 2 -> current=[2]
   * │   │
   * │   ├── add [2] to result
   * │   ├── i=2 choose 2 -> current=[2,2]
   * │   │   └── add [2,2] to result
   * │   └── return and pop
   * │
   * └── i=2 value 2 -> skip
   *     reason: root level par pehle 2 se branch already ban chuki hai
   *
   * Output:
   *   [[], [1], [1,2], [1,2,2], [2], [2,2]]
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   *                                   []
   *                         /                    \
   *                   choose 1                 choose 2
   *                      |                       |
   *                    [1]                     [2]
   *                  /     \                     |
   *          choose 2     skip dup 2         choose 2
   *             |                               |
   *           [1,2]                           [2,2]
   *             |
   *         choose 2
   *             |
   *          [1,2,2]
   *
   * Root level second 2 skip hota hai.
   * [1] level par second 2 skip hota hai.
   * [1,2] level par second 2 allowed hai because i === start there.
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Input: [1, 2, 2]
   * sortedNums = [1, 2, 2]
   *
   * Initial Call: buildSubsets(0, [1,2,2], [], result)
   *
   * ┌────────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: buildSubsets(0, [1,2,2], [], result)                          │
   * ├────────────────────────────────────────────────────────────────────────┤
   * │ start = 0                                                             │
   * │ current = []                                                          │
   * │ result.push([])                                                       │
   * │ result = [[]]                                                         │
   * │                                                                       │
   * │ Loop i from 0 to 2                                                    │
   * │                                                                       │
   * │ i = 0, nums[0] = 1                                                    │
   * │ duplicate skip? 0 > 0 -> Nahi                                         │
   * │ current.push(1) -> [1]                                                │
   * │ recurse: buildSubsets(1, [1,2,2], [1], result)                        │
   * │                                                                       │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: buildSubsets(1, [1,2,2], [1], result)                │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ start = 1                                                    │     │
   * │   │ current = [1]                                                │     │
   * │   │ result.push([1])                                             │     │
   * │   │ result = [[], [1]]                                           │     │
   * │   │                                                              │     │
   * │   │ Loop i from 1 to 2                                           │     │
   * │   │                                                              │     │
   * │   │ i = 1, nums[1] = 2                                           │     │
   * │   │ duplicate skip? 1 > 1 -> Nahi                                │     │
   * │   │ current.push(2) -> [1,2]                                     │     │
   * │   │ recurse: buildSubsets(2, [1,2,2], [1,2], result)             │     │
   * │   │                                                              │     │
   * │   │   ┌────────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: buildSubsets(2, [1,2,2], [1,2], result)    │     │     │
   * │   │   ├────────────────────────────────────────────────────┤     │     │
   * │   │   │ start = 2                                          │     │     │
   * │   │   │ current = [1,2]                                    │     │     │
   * │   │   │ result.push([1,2])                                 │     │     │
   * │   │   │ result = [[], [1], [1,2]]                          │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │ i = 2, nums[2] = 2                                 │     │     │
   * │   │   │ duplicate skip? 2 > 2 -> Nahi                      │     │     │
   * │   │   │ current.push(2) -> [1,2,2]                         │     │     │
   * │   │   │ recurse: buildSubsets(3, [1,2,2], [1,2,2], result) │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │   ┌──────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 4: buildSubsets(3, [1,2,2],         │     │     │     │
   * │   │   │   │                 [1,2,2], result)         │     │     │     │
   * │   │   │   ├──────────────────────────────────────────┤     │     │     │
   * │   │   │   │ start = 3                                 │     │     │     │
   * │   │   │   │ current = [1,2,2]                         │     │     │     │
   * │   │   │   │ result.push([1,2,2])                      │     │     │     │
   * │   │   │   │ result = [[], [1], [1,2], [1,2,2]]       │     │     │     │
   * │   │   │   │ loop empty -> return                      │     │     │     │
   * │   │   │   └──────────────────────────────────────────┘     │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │ backtrack: pop 2 -> current = [1,2]               │     │     │
   * │   │   │ loop complete -> return                            │     │     │
   * │   │   └────────────────────────────────────────────────────┘     │     │
   * │   │                                                              │     │
   * │   │ backtrack: pop 2 -> current = [1]                            │     │
   * │   │                                                              │     │
   * │   │ i = 2, nums[2] = 2                                           │     │
   * │   │ duplicate skip? 2 > 1 -> Haan and nums[2] === nums[1]        │     │
   * │   │ same level duplicate -> skip                                 │     │
   * │   │ return                                                        │     │
   * │   └──────────────────────────────────────────────────────────────┘     │
   * │                                                                       │
   * │ backtrack: pop 1 -> current = []                                      │
   * │                                                                       │
   * │ i = 1, nums[1] = 2                                                    │
   * │ duplicate skip? 1 > 0 and nums[1] === nums[0] ? Nahi                  │
   * │ current.push(2) -> [2]                                                │
   * │ recurse: buildSubsets(2, [1,2,2], [2], result)                        │
   * │                                                                       │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 5: buildSubsets(2, [1,2,2], [2], result)                │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ start = 2                                                    │     │
   * │   │ current = [2]                                                │     │
   * │   │ result.push([2])                                             │     │
   * │   │ result = [[], [1], [1,2], [1,2,2], [2]]                      │     │
   * │   │                                                              │     │
   * │   │ i = 2, nums[2] = 2                                           │     │
   * │   │ duplicate skip? 2 > 2 -> Nahi                                │     │
   * │   │ current.push(2) -> [2,2]                                     │     │
   * │   │ recurse -> add [2,2]                                         │     │
   * │   │ result = [[], [1], [1,2], [1,2,2], [2], [2,2]]               │     │
   * │   │ backtrack: pop 2 -> [2]                                      │     │
   * │   │ return                                                        │     │
   * │   └──────────────────────────────────────────────────────────────┘     │
   * │                                                                       │
   * │ backtrack: pop 2 -> current = []                                      │
   * │                                                                       │
   * │ i = 2, nums[2] = 2                                                    │
   * │ duplicate skip? 2 > 0 and nums[2] === nums[1] -> Haan                 │
   * │ root level duplicate -> skip                                          │
   * │ return                                                                 │
   * └────────────────────────────────────────────────────────────────────────┘
   *
   * Final result:
   *   [[], [1], [1,2], [1,2,2], [2], [2,2]]
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. [] -> [[]]
   * 2. [1] -> [[], [1]]
   * 3. [1,1,1] -> [[], [1], [1,1], [1,1,1]]
   * 4. Distinct values me normal subsets jaise 2^n outputs
   */

  function normalize(result: number[][]): string[] {
    return result
      .map((subset) => JSON.stringify(subset))
      .sort();
  }

  function expectSubsets(input: number[], expected: number[][]): void {
    const actual = subsetsWithDup(input);
    const actualNormalized = JSON.stringify(normalize(actual));
    const expectedNormalized = JSON.stringify(normalize(expected));

    if (actualNormalized !== expectedNormalized) {
      throw new Error(
        `For input ${JSON.stringify(input)}, expected ${expectedNormalized} but got ${actualNormalized}`
      );
    }
  }

  export function runTests(): void {
    const tests: Array<{ input: number[]; expected: number[][] }> = [
      { input: [1, 2, 2], expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
      { input: [], expected: [[]] },
      { input: [1], expected: [[], [1]] },
      { input: [1, 1, 1], expected: [[], [1], [1, 1], [1, 1, 1]] },
      {
        input: [1, 2, 3],
        expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
      },
      { input: [2, 1, 2], expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
      {
        input: [1, 1, 2, 2],
        expected: [[], [1], [1, 1], [1, 1, 2], [1, 1, 2, 2], [1, 2], [1, 2, 2], [2], [2, 2]],
      },
      {
        input: [-1, 0, 1],
        expected: [[], [-1], [-1, 0], [-1, 0, 1], [-1, 1], [0], [0, 1], [1]],
      },
      {
        input: [4, 4, 4, 1, 4],
        expected: [
          [],
          [1],
          [1, 4],
          [1, 4, 4],
          [1, 4, 4, 4],
          [1, 4, 4, 4, 4],
          [4],
          [4, 4],
          [4, 4, 4],
          [4, 4, 4, 4],
        ],
      },
      { input: [0, 0], expected: [[], [0], [0, 0]] },
    ];

    tests.forEach(({ input, expected }) => {
      expectSubsets(input, expected);
    });

    console.log(`Passed ${tests.length}/${tests.length} tests`);
  }
}

SubsetsIIBacktracking.runTests();
