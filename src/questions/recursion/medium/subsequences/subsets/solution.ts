/**
 * SUBSETS / POWER SET - RECURSION + BACKTRACKING
 * =================================================
 *
 * PROBLEM:
 * Unique integers ka array `nums` diya hai.
 * Saare possible subsets return karne hain.
 *
 * Example:
 *   nums = [1, 2]
 *   answer = [[1, 2], [1], [2], []]
 *
 * INTUITION (Soch):
 * -----------------
 * Har element ke paas 2 choices hoti hain:
 *
 *   1. Include karo -> current subset me nums[index] add hoga
 *   2. Exclude karo -> current subset same rahega
 *
 * Jab saare elements ke decisions complete ho jaate hain,
 * current subset ek final subset ban chuka hota hai.
 *
 * Backtracking ka role:
 *   Include branch ke baad `pop()` se current frame ki choice undo karo,
 *   taki same frame ka exclude branch clean state se start ho.
 *
 * Algorithm:
 * ----------
 * 1. Start with empty result and empty current subset.
 * 2. Start recursion from index 0.
 * 3. Har index par pehle nums[index] ko current me include karo.
 * 4. Include branch ke liye next index par recurse karo.
 * 5. Include branch return kare toh current.pop() karke choice undo karo.
 * 6. Ab same frame me nums[index] ko skip karne wali branch recurse karo.
 * 7. Base case: index nums.length ke equal ho jaye toh current ka copy result me add karo.
 * 8. Final result me saare leaf paths ke subsets mil jayenge.
 *
 * TIME: O(n * 2^n)
 *   - total subsets 2^n
 *   - each subset copy karne me worst case O(n)
 *
 * SPACE: O(n) excluding output
 *   - recursion stack + current subset
 *
 * OUTPUT SPACE: O(n * 2^n)
 */

namespace SubsetsRecursion {
  export function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    const current: number[] = [];

    buildSubsets(0, nums, current, result);

    return result;
  }

  function buildSubsets(
    index: number,
    nums: number[],
    current: number[],
    result: number[][]
  ): void {
    if (index === nums.length) {
      // Saare elements ke include/exclude decisions complete ho gaye.
      // `current` mutate hota rahega, isliye result me copy store karni zaroori hai.
      result.push([...current]);
      return;
    }

    current.push(nums[index]);
    // Include branch: current element is subset ka part ban chuka hai.
    buildSubsets(index + 1, nums, current, result);

    // Backtrack sirf is frame ki include choice undo karta hai.
    // Parent frame ke choices current me preserved rehte hain.
    current.pop();

    // Exclude branch: same index ka element skip hua, so current unchanged state me aage badhta hai.
    buildSubsets(index + 1, nums, current, result);
  }

  /**
   * ==========================================================
   * DRY RUN - RECURSION TREE + CALL FRAMES
   * ==========================================================
   *
   * Example:
   * nums = [1, 2]
   *
   * Expected:
   * [[1, 2], [1], [2], []]
   *
   * ==========================================================
   * HIGH-LEVEL DECISION TREE
   * ==========================================================
   *
   * Is tree ka goal sirf choices dikhana hai:
   *   include current element
   *   exclude current element
   *
   *                             []  (start)
   *                              |
   *                    Decide for nums[0] = 1
   *                    /                         \
   *             include 1                       exclude 1
   *                 |                              |
   *                [1]                            []
   *                 |                              |
   *        Decide for nums[1] = 2        Decide for nums[1] = 2
   *          /              \              /              \
   *   include 2          exclude 2   include 2          exclude 2
   *       |                  |           |                  |
   *     [1,2]              [1]         [2]                 []
   *       |                  |           |                  |
   *      add                add         add                add
   *
   * Final order with include-first recursion:
   *   [[1,2], [1], [2], []]
   *
   * ==========================================================
   * FULL RECURSION TREE - WITH RETURNS + BACKTRACKING
   * ==========================================================
   *
   * Each node stores:
   *   index
   *   current subset
   *
   * root  (index=0, current=[], result=[])
   * │
   * ├── INCLUDE 1 -> current=[1]
   * │   │
   * │   ├── INCLUDE 2 -> current=[1,2]
   * │   │   └── BASE CASE: push copy [1,2]
   * │   │       result=[[1,2]]
   * │   │       return to current=[1,2]
   * │   │
   * │   ├── BACKTRACK after INCLUDE 2 -> pop 2
   * │   │   current=[1]
   * │   │
   * │   └── EXCLUDE 2 -> current=[1]
   * │       └── BASE CASE: push copy [1]
   * │           result=[[1,2], [1]]
   * │           return to current=[1]
   * │
   * ├── BACKTRACK after INCLUDE 1 -> pop 1
   * │   current=[]
   * │
   * └── EXCLUDE 1 -> current=[]
   *     │
   *     ├── INCLUDE 2 -> current=[2]
   *     │   └── BASE CASE: push copy [2]
   *     │       result=[[1,2], [1], [2]]
   *     │       return to current=[2]
   *     │
   *     ├── BACKTRACK after INCLUDE 2 -> pop 2
   *     │   current=[]
   *     │
   *     └── EXCLUDE 2 -> current=[]
   *         └── BASE CASE: push copy []
   *             result=[[1,2], [1], [2], []]
   *
   * root ke dono branches complete.
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: subsets([1, 2])
   * - result = []
   * - current = []
   * - Start: buildSubsets(0, [1,2], [], result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: buildSubsets(0, [1,2], [], result)                           │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ index = 0                                                            │
   * │ current = []                                                         │
   * │ result = []                                                          │
   * │ Base case? index === nums.length? 0 === 2 -> Nahi                   │
   * │                                                                      │
   * │ Try INCLUDE nums[0] = 1                                              │
   * │ current.push(1) -> current = [1]                                     │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: buildSubsets(1, [1,2], [1], result)                │     │
   * │   ├────────────────────────────────────────────────────────────┤     │
   * │   │ index = 1                                                  │     │
   * │   │ current = [1]                                              │     │
   * │   │ result = []                                                │     │
   * │   │ Base case? 1 === 2 -> Nahi                                 │     │
   * │   │                                                            │     │
   * │   │ Try INCLUDE nums[1] = 2                                    │     │
   * │   │ current.push(2) -> current = [1,2]                         │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: buildSubsets(2, [1,2], [1,2], result)    │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 2                                        │     │     │
   * │   │   │ current = [1,2]                                  │     │     │
   * │   │   │ Base case? 2 === 2 -> Haan                       │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ result.push([...current])                        │     │     │
   * │   │   │ result.push([1,2])                               │     │     │
   * │   │   │ result = [[1,2]]                                 │     │     │
   * │   │   │ Return                                           │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ Return to CALL 2                                           │     │
   * │   │ current is still [1,2]                                     │     │
   * │   │                                                            │     │
   * │   │ BACKTRACK: current.pop() removes 2                         │     │
   * │   │ current = [1]                                              │     │
   * │   │ Reason: Ab skip-2 branch ko [1] state se run karna hai.    │     │
   * │   │                                                            │     │
   * │   │ Try EXCLUDE nums[1] = 2                                    │     │
   * │   │ current stays [1]                                          │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 4: buildSubsets(2, [1,2], [1], result)      │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 2                                        │     │     │
   * │   │   │ current = [1]                                    │     │     │
   * │   │   │ Base case? 2 === 2 -> Haan                       │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ result.push([...current])                        │     │     │
   * │   │   │ result.push([1])                                 │     │     │
   * │   │   │ result = [[1,2], [1]]                            │     │     │
   * │   │   │ Return                                           │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ Return                                                     │     │
   * │   └────────────────────────────────────────────────────────────┘     │
   * │                                                                      │
   * │ Return to CALL 1                                                     │
   * │ current is still [1]                                                 │
   * │                                                                      │
   * │ BACKTRACK: current.pop() removes 1                                   │
   * │ current = []                                                         │
   * │ Reason: Ab skip-1 branch ko empty state se run karna hai.            │
   * │                                                                      │
   * │ Try EXCLUDE nums[0] = 1                                              │
   * │ current stays []                                                     │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 5: buildSubsets(1, [1,2], [], result)                 │     │
   * │   ├────────────────────────────────────────────────────────────┤     │
   * │   │ index = 1                                                  │     │
   * │   │ current = []                                               │     │
   * │   │ result = [[1,2], [1]]                                      │     │
   * │   │ Base case? 1 === 2 -> Nahi                                 │     │
   * │   │                                                            │     │
   * │   │ Try INCLUDE nums[1] = 2                                    │     │
   * │   │ current.push(2) -> current = [2]                           │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 6: buildSubsets(2, [1,2], [2], result)      │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 2                                        │     │     │
   * │   │   │ current = [2]                                    │     │     │
   * │   │   │ Base case? 2 === 2 -> Haan                       │     │     │
   * │   │   │ result.push([2])                                 │     │     │
   * │   │   │ result = [[1,2], [1], [2]]                       │     │     │
   * │   │   │ Return                                           │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ BACKTRACK: current.pop() removes 2                         │     │
   * │   │ current = []                                               │     │
   * │   │                                                            │     │
   * │   │ Try EXCLUDE nums[1] = 2                                    │     │
   * │   │ current stays []                                           │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 7: buildSubsets(2, [1,2], [], result)       │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 2                                        │     │     │
   * │   │   │ current = []                                     │     │     │
   * │   │   │ Base case? 2 === 2 -> Haan                       │     │     │
   * │   │   │ result.push([])                                  │     │     │
   * │   │   │ result = [[1,2], [1], [2], []]                   │     │     │
   * │   │   │ Return                                           │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ Return                                                     │     │
   * │   └────────────────────────────────────────────────────────────┘     │
   * │                                                                      │
   * │ Return                                                               │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   [[1,2], [1], [2], []]
   *
   * ==========================================================
   * WHY COPY IS REQUIRED
   * ==========================================================
   *
   * Wrong:
   *   result.push(current)
   *
   * Why wrong?
   *   `current` same array reference hai.
   *   Backtracking pop/push ke saath mutate hota rahega.
   *
   * Correct:
   *   result.push([...current])
   *
   * Why correct?
   *   Har base case par current ka snapshot store hota hai.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. nums = []
   *    Output: [[]]
   *
   * 2. nums = [0]
   *    Output: [[0], []]
   *
   * 3. nums = [1, 2]
   *    Output count: 4
   *
   * 4. nums = [-1, 0, 1]
   *    Output count: 8
   */

  export function runTests(): void {
    type TestCase = {
      nums: number[];
      expectedCount: number;
      expectedSubsets?: number[][];
      description: string;
    };

    const tests: TestCase[] = [
      {
        nums: [],
        expectedCount: 1,
        expectedSubsets: [[]],
        description: 'empty input has one subset',
      },
      {
        nums: [0],
        expectedCount: 2,
        expectedSubsets: [[0], []],
        description: 'single zero',
      },
      {
        nums: [1, 2],
        expectedCount: 4,
        expectedSubsets: [[1, 2], [1], [2], []],
        description: 'two elements exact order',
      },
      {
        nums: [1, 2, 3],
        expectedCount: 8,
        description: 'three positive numbers',
      },
      {
        nums: [-1, 0, 1],
        expectedCount: 8,
        description: 'negative, zero, positive values',
      },
      {
        nums: [5, 6, 7, 8],
        expectedCount: 16,
        description: 'four elements count check',
      },
    ];

    let passed = 0;

    console.log('Testing Subsets - Recursion + Backtracking\n');

    tests.forEach(
      ({ nums, expectedCount, expectedSubsets, description }, index) => {
        const result = subsets(nums);
        const countOk = result.length === expectedCount;
        const expectedPowerSetCount = result.length === 2 ** nums.length;
        const emptyIncluded = result.some((subset) => subset.length === 0);
        const fullIncluded = hasSubset(result, nums);
        const allValid = result.every((subset) =>
          subset.every((value) => nums.includes(value))
        );
        const noDuplicates =
          new Set(result.map(toSubsetSignature)).size === result.length;
        const exactMatch = expectedSubsets
          ? sameSubsetCollection(result, expectedSubsets)
          : true;

        const pass =
          countOk &&
          expectedPowerSetCount &&
          emptyIncluded &&
          fullIncluded &&
          allValid &&
          noDuplicates &&
          exactMatch;

        if (pass) {
          passed++;
        }

        console.log(`Test ${index + 1}: ${description}`);
        console.log(`  nums=[${nums.join(', ')}]`);
        console.log(`  Expected count: ${expectedCount}`);
        console.log(`  Got count:      ${result.length}`);
        console.log(
          `  Checks -> count=${countOk}, powerSet=${expectedPowerSetCount}, empty=${emptyIncluded}, full=${fullIncluded}, valid=${allValid}, unique=${noDuplicates}, exact=${exactMatch}`
        );
        console.log(`  Result: ${pass ? 'PASS' : 'FAIL'}`);
      }
    );

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }

  function hasSubset(allSubsets: number[][], targetSubset: number[]): boolean {
    const targetSignature = toSubsetSignature(targetSubset);
    return allSubsets.some(
      (subset) => toSubsetSignature(subset) === targetSignature
    );
  }

  function sameSubsetCollection(
    actual: number[][],
    expected: number[][]
  ): boolean {
    if (actual.length !== expected.length) {
      return false;
    }

    const actualSignatures = actual.map(toSubsetSignature).sort();
    const expectedSignatures = expected.map(toSubsetSignature).sort();

    return actualSignatures.every(
      (signature, index) => signature === expectedSignatures[index]
    );
  }

  function toSubsetSignature(subset: number[]): string {
    return JSON.stringify([...subset].sort((left, right) => left - right));
  }
}

const subsets = SubsetsRecursion.subsets;

SubsetsRecursion.runTests();

export { subsets, SubsetsRecursion };