/**
 * ═══════════════════════════════════════════════════════════
 * NEXT PERMUTATION — BRUTE FORCE
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
 * Brute force me:
 *   saari unique permutations generate karo
 *   unhe lexicographic order me rakho
 *   current permutation ka index dhoondo
 *   uske next wali permutation array me copy kar do
 *
 * Ye bilkul seedha idea hai,
 * lekin practical nahi hai because permutations bahut zyada hoti hain.
 *
 * TIME:  O(n! * n) ya usse bhi zyada practical cost
 * SPACE: O(n! * n) — saari permutations store hoti hain
 */

namespace NextPermutationBruteForce {
  function nextPermutation(nums: number[]): void {
    if (nums.length <= 1) return;

    const original = [...nums];

    // Sorted values se generation start karne ka fayda:
    // backtracking naturally lexicographic order me unique permutations de deta hai.
    const sortedValues = [...nums].sort((a, b) => a - b);
    const used = new Array(sortedValues.length).fill(false);
    const path: number[] = [];
    const permutations: number[][] = [];

    function generatePermutations(): void {
      if (path.length === sortedValues.length) {
        permutations.push([...path]);
        return;
      }

      for (let i = 0; i < sortedValues.length; i++) {
        if (used[i]) continue;

        // Duplicate values ko same tree level par dobara choose nahi karte.
        // WHY:
        // warna same permutation multiple baar generate ho jayegi.
        if (i > 0 && sortedValues[i] === sortedValues[i - 1] && !used[i - 1]) {
          continue;
        }

        used[i] = true;
        path.push(sortedValues[i]);

        generatePermutations();

        // Recursive call ke baad yahan wapas aate hain.
        // Current choice ko undo karke loop ka next option try karte hain.
        path.pop();
        used[i] = false;
      }
    }

    generatePermutations();

    let currentIndex = -1;

    for (let i = 0; i < permutations.length; i++) {
      if (isSamePermutation(permutations[i], original)) {
        currentIndex = i;
        break;
      }
    }

    const nextIndex = (currentIndex + 1) % permutations.length;
    const next = permutations[nextIndex];

    for (let i = 0; i < nums.length; i++) {
      nums[i] = next[i];
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
   * nums = [1, 2]
   *
   * Start:
   *   original = [1, 2]
   *   sortedValues = [1, 2]
   *   used = [false, false]
   *   path = []
   *   permutations = []
   *
   * ═══════════════════════════════════════════════════════════
   * FIRST generatePermutations() CALL
   * ═══════════════════════════════════════════════════════════
   *
   * path.length = 0, so base case nahi lagega.
   * Loop starts:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Loop choice: i = 0                                       │
   * │ used[0] ? false                                          │
   * │ duplicate skip ? no                                      │
   * │ action: choose sortedValues[0] = 1                       │
   * │ used = [true, false]                                     │
   * │ path = [1]                                               │
   * │ recursive call generatePermutations()                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * SECOND generatePermutations() CALL
   * ═══════════════════════════════════════════════════════════
   *
   * Current state:
   *   used = [true, false]
   *   path = [1]
   *
   * path.length = 1, still base case nahi.
   * Loop:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i = 0                                                    │
   * │ used[0] ? true                                           │
   * │ action: continue                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i = 1                                                    │
   * │ used[1] ? false                                          │
   * │ duplicate skip ? no                                      │
   * │ action: choose 2                                         │
   * │ used = [true, true]                                      │
   * │ path = [1, 2]                                            │
   * │ recursive call generatePermutations()                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * THIRD generatePermutations() CALL
   * ═══════════════════════════════════════════════════════════
   *
   * Current state:
   *   path = [1, 2]
   *
   * path.length === sortedValues.length
   * base case hit:
   *   permutations.push([1, 2])
   *
   * return to previous call
   *
   * ═══════════════════════════════════════════════════════════
   * BACKTRACK AFTER RETURN
   * ═══════════════════════════════════════════════════════════
   *
   * Resume second call after recursive line:
   *   path.pop()  -> path = [1]
   *   used[1] = false -> used = [true, false]
   *
   * Loop finished in second call.
   * Return to first call.
   *
   * Resume first call after recursive line for i = 0:
   *   path.pop()  -> path = []
   *   used[0] = false -> used = [false, false]
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Loop choice: i = 1                                       │
   * │ used[1] ? false                                          │
   * │ duplicate skip ? no                                      │
   * │ action: choose 2                                         │
   * │ used = [false, true]                                     │
   * │ path = [2]                                               │
   * │ recursive call generatePermutations()                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * Next recursive branch same way generate karega:
   *   [2, 1]
   *
   * Final permutations:
   *   [[1, 2], [2, 1]]
   *
   * ═══════════════════════════════════════════════════════════
   * FIND CURRENT + NEXT
   * ═══════════════════════════════════════════════════════════
   *
   * currentIndex of original [1, 2] = 0
   * nextIndex = (0 + 1) % 2 = 1
   * next = [2, 1]
   *
   * Copy back into nums:
   *   nums becomes [2, 1]
   *
   * Final answer:
   *   [2, 1]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single element -> same array
   * 2. Last permutation -> wrap to first
   * 3. Duplicates -> unique permutations hi generate honi chahiye
   * 4. Already smallest permutation -> next lexicographic order wali lo
   */

  export function runTests(): void {
    console.log('🧪 Testing Next Permutation — BRUTE FORCE\n');

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
      console.log(`  Got:      [${nums}] -> ${pass ? '✅' : '❌'}`);
    });
  }
}

NextPermutationBruteForce.runTests();