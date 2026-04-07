/**
 * ═══════════════════════════════════════════════════════════
 * MAJORITY ELEMENT II — OPTIMAL (Boyer-Moore Voting)
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array `nums` me saare aise elements return karo
 * jo `floor(n / 3)` se zyada baar aate hain.
 *
 * Important:
 *   answer me 0, 1, ya 2 elements ho sakte hain
 *   output order matter nahi karta
 *
 * EXAMPLES:
 *   [3, 2, 3]                -> [3]
 *   [1, 2, 3, 1, 2, 1, 2]    -> [1, 2]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Pehla deep observation:
 *
 *   `n / 3` se zyada baar aane wale elements
 *   maximum 2 hi ho sakte hain
 *
 * Kyun?
 * Agar 3 alag elements each `n/3` se zyada baar aayen,
 * toh total count `n` se zyada ho jayega, jo impossible hai.
 *
 * Isi wajah se hume sirf 2 candidate slots chahiye:
 *   candidate1, count1
 *   candidate2, count2
 *
 * Cancellation idea:
 *   - same candidate mile -> uska count badhao
 *   - empty slot mile -> new candidate banao
 *   - current num dono candidates se different ho
 *     aur dono counts positive hon -> dono counts ghatao
 *
 * Yeh "dono counts ghatao" step aise samjho:
 *   ek current outsider number aaya
 *   usne candidate1 ka ek support aur candidate2 ka ek support cancel kar diya
 *
 * First pass ke baad hume sirf possible answers milte hain.
 * Final exact answer ke liye verification second pass mandatory hai.
 *
 * TIME:  O(n) — first pass candidate selection + second pass verification
 * SPACE: O(1) — sirf 2 candidates aur 2 counts
 */

namespace MajorityElementIIOptimal {
  function majorityElement(nums: number[]): number[] {
    let candidate1 = 0;
    let candidate2 = 0;
    let count1 = 0;
    let count2 = 0;

    for (const num of nums) {
      // Match checks pehle aayenge.
      // WHY:
      // agar current num already kisi candidate jaisa hai,
      // toh hume usi candidate ka count badhana hai.
      if (num === candidate1) {
        count1++;
      } else if (num === candidate2) {
        count2++;
      } else if (count1 === 0) {
        // Candidate1 slot empty hai, so current num yahan claim kar sakta hai.
        candidate1 = num;
        count1 = 1;
      } else if (count2 === 0) {
        // Candidate2 slot empty hai, so current num second contender ban sakta hai.
        candidate2 = num;
        count2 = 1;
      } else {
        // Current num dono candidates se different hai
        // aur dono candidates ke paas support bhi hai.
        // So ek-ek support cancel karo.
        count1--;
        count2--;
      }
    }

    // First pass ke baad candidates sirf possible answers hain.
    // Isliye actual frequencies dubara count karni padengi.
    count1 = 0;
    count2 = 0;

    for (const num of nums) {
      if (num === candidate1) {
        count1++;
      } else if (num === candidate2) {
        count2++;
      }
    }

    const threshold = Math.floor(nums.length / 3);
    const result: number[] = [];

    if (count1 > threshold) {
      result.push(candidate1);
    }

    if (count2 > threshold) {
      result.push(candidate2);
    }

    return result;
  }

  function normalize(nums: number[]): number[] {
    return [...nums].sort((a, b) => a - b);
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [1, 2, 3, 1, 2, 1, 2]
   *
   * Start:
   *   candidate1 = 0, count1 = 0
   *   candidate2 = 0, count2 = 0
   *
   * ═══════════════════════════════════════════════════════════
   * FIRST PASS: possible candidates find karo
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ num === candidate1 ? no                                  │
   * │ num === candidate2 ? no                                  │
   * │ count1 === 0 ? yes                                       │
   * │ action: candidate1 = 1, count1 = 1                       │
   * │ state: c1=1, count1=1 | c2=0, count2=0                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ num === candidate1 ? no                                  │
   * │ num === candidate2 ? no                                  │
   * │ count1 === 0 ? no                                        │
   * │ count2 === 0 ? yes                                       │
   * │ action: candidate2 = 2, count2 = 1                       │
   * │ state: c1=1, count1=1 | c2=2, count2=1                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 3                                                  │
   * │ num matches neither candidate                            │
   * │ count1 and count2 both positive                          │
   * │ action: count1--, count2--                               │
   * │ state: c1=1, count1=0 | c2=2, count2=0                   │
   * │                                                          │
   * │ Meaning: 1, 2, 3 ek cancellation group ki tarah socho    │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ num === candidate1 ? yes                                 │
   * │ action: count1++                                         │
   * │ state: c1=1, count1=1 | c2=2, count2=0                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ num === candidate1 ? no                                  │
   * │ num === candidate2 ? yes                                 │
   * │ action: count2++                                         │
   * │ state: c1=1, count1=1 | c2=2, count2=1                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ num === candidate1 ? yes                                 │
   * │ action: count1++                                         │
   * │ state: c1=1, count1=2 | c2=2, count2=1                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ num === candidate1 ? no                                  │
   * │ num === candidate2 ? yes                                 │
   * │ action: count2++                                         │
   * │ state: c1=1, count1=2 | c2=2, count2=2                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * First pass end:
   *   possible candidates = 1 and 2
   *
   * Dhyan do:
   *   abhi answer final nahi mana ja sakta
   *   verification second pass abhi bhi chahiye
   *
   * ═══════════════════════════════════════════════════════════
   * SECOND PASS: actual counts verify karo
   * ═══════════════════════════════════════════════════════════
   *
   * Reset:
   *   count1 = 0
   *   count2 = 0
   *   threshold = floor(7 / 3) = 2
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1 -> count1 = 1                                    │
   * │ num = 2 -> count2 = 1                                    │
   * │ num = 3 -> no change                                     │
   * │ num = 1 -> count1 = 2                                    │
   * │ num = 2 -> count2 = 2                                    │
   * │ num = 1 -> count1 = 3                                    │
   * │ num = 2 -> count2 = 3                                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final verification:
   *   count1 = 3 -> 3 > 2 ? yes -> push 1
   *   count2 = 3 -> 3 > 2 ? yes -> push 2
   *
   * Final answer:
   *   [1, 2]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> []
   * 2. Single element -> [that element]
   * 3. No valid answer -> verification pass empty result de sakta hai
   * 4. One valid answer -> result size 1
   * 5. Two valid answers -> result size 2
   */

  export function runTests(): void {
    console.log('🧪 Testing Majority Element II — OPTIMAL (Boyer-Moore)\n');

    const tests: Array<{ nums: number[]; expected: number[] }> = [
      { nums: [3, 2, 3], expected: [3] },
      { nums: [1], expected: [1] },
      { nums: [1, 2], expected: [1, 2] },
      { nums: [1, 2, 3], expected: [] },
      { nums: [1, 2, 3, 1, 2, 1, 2], expected: [1, 2] },
      { nums: [2, 2], expected: [2] },
      { nums: [0, 0, 0], expected: [0] },
      { nums: [-1, -1, -1, 2, 2, 2, 3], expected: [-1, 2] },
      { nums: [4, 4, 4, 4, 2, 2, 2], expected: [2, 4] },
      { nums: [5, 6, 7, 8], expected: [] },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = majorityElement(nums);
      const pass =
        JSON.stringify(normalize(result)) === JSON.stringify(normalize(expected));

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: [${normalize(expected)}]`);
      console.log(`  Got:      [${normalize(result)}] -> ${pass ? '✅' : '❌'}`);
    });
  }
}

MajorityElementIIOptimal.runTests();
