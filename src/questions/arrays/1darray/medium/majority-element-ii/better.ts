/**
 * ═══════════════════════════════════════════════════════════
 * MAJORITY ELEMENT II — BETTER (HashMap)
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
 * Brute force me har candidate ko dobara-dobara count kar rahe the.
 *
 * Better idea:
 *   ek pass me frequency map banao
 *   phir map se dekho kaun threshold cross kar raha hai
 *
 * Yahan HashMap perfect fit hai:
 *   key   -> number
 *   value -> us number ki frequency
 *
 * TIME:  O(n) — ek pass build, ek pass scan
 * SPACE: O(n) — map me distinct values store hoti hain
 */

namespace MajorityElementIIBetter {
  function majorityElement(nums: number[]): number[] {
    const threshold = Math.floor(nums.length / 3);
    const countMap = new Map<number, number>();

    for (const num of nums) {
      // Current number ki running frequency update karo.
      countMap.set(num, (countMap.get(num) ?? 0) + 1);
    }

    const result: number[] = [];

    for (const [num, count] of countMap) {
      // Strictly greater than n/3 hi answer me jaayega.
      if (count > threshold) {
        result.push(num);
      }
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
   *   n = 7
   *   threshold = floor(7 / 3) = 2
   *   countMap = {}
   *
   * ═══════════════════════════════════════════════════════════
   * FIRST LOOP: build frequency map
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ old count = 0                                            │
   * │ new count = 1                                            │
   * │ countMap = { 1: 1 }                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ old count = 0                                            │
   * │ new count = 1                                            │
   * │ countMap = { 1: 1, 2: 1 }                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 3                                                  │
   * │ old count = 0                                            │
   * │ new count = 1                                            │
   * │ countMap = { 1: 1, 2: 1, 3: 1 }                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ old count = 1                                            │
   * │ new count = 2                                            │
   * │ countMap = { 1: 2, 2: 1, 3: 1 }                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ old count = 1                                            │
   * │ new count = 2                                            │
   * │ countMap = { 1: 2, 2: 2, 3: 1 }                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ old count = 2                                            │
   * │ new count = 3                                            │
   * │ countMap = { 1: 3, 2: 2, 3: 1 }                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ old count = 2                                            │
   * │ new count = 3                                            │
   * │ countMap = { 1: 3, 2: 3, 3: 1 }                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * SECOND LOOP: scan map
   * ═══════════════════════════════════════════════════════════
   *
   * Start:
   *   result = []
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Entry: num = 1, count = 3                               │
   * │ 3 > threshold(2) ? yes                                  │
   * │ result = [1]                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Entry: num = 2, count = 3                               │
   * │ 3 > threshold(2) ? yes                                  │
   * │ result = [1, 2]                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Entry: num = 3, count = 1                               │
   * │ 1 > threshold(2) ? no                                   │
   * │ result stays [1, 2]                                      │
   * └──────────────────────────────────────────────────────────┘
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
   * 3. Threshold 0 case (n < 3) -> all distinct elements bhi answer ho sakte hain
   * 4. No count > n/3 -> []
   * 5. Maximum 2 answers hi aa sakte hain
   */

  export function runTests(): void {
    console.log('🧪 Testing Majority Element II — BETTER (HashMap)\n');

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

MajorityElementIIBetter.runTests();
