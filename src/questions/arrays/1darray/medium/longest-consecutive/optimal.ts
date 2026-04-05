/**
 * ═══════════════════════════════════════════════════════════
 * LONGEST CONSECUTIVE SEQUENCE — OPTIMAL (HashSet)
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek unsorted integer array diya hai.
 * Longest consecutive elements sequence ki length return karo.
 *
 * Consecutive ka matlab:
 *   x, x+1, x+2, x+3 ...
 *
 * EXAMPLES:
 *   [100, 4, 200, 1, 3, 2]      → 4
 *   [0,3,7,2,5,8,4,6,0,1]       → 9
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force me har number se sequence build karne ki koshish kar sakte hain.
 * Lekin same sequence baar-baar recount ho jayegi.
 *
 * Actual key idea:
 *
 *   Sequence tabhi start hoti hai jab `num - 1` present na ho.
 *
 * Example:
 *
 *   [1, 2, 3, 4]
 *
 *   1 -> start ho sakta hai (0 nahi hai)
 *   2 -> start nahi ho sakta (1 hai)
 *   3 -> start nahi ho sakta (2 hai)
 *   4 -> start nahi ho sakta (3 hai)
 *
 * Yani:
 *   Har number se count start nahi karna.
 *   Sirf sequence ke first element se start karna.
 *
 * HashSet se `num-1` aur `num+1` check O(1) average me ho jaata hai.
 *
 * TIME:  O(n) average — har number start ya skip hota hai, streaks repeat nahi hoti
 * SPACE: O(n) — Set me values store hoti hain
 */

namespace LongestConsecutiveOptimal {
  function longestConsecutive(nums: number[]): number {
    if (nums.length === 0) return 0;

    // Set deduplicate bhi karta hai aur fast lookup bhi deta hai
    const numSet = new Set(nums);
    let maxLength = 0;

    for (const num of numSet) {
      // Agar predecessor present hai, toh yeh sequence ka beech wala element hai
      // Start point nahi hai, so yahan se count mat chalao
      if (numSet.has(num - 1)) continue;

      let currentNum = num;
      let currentLength = 1;

      // Current streak ko aage extend karo
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [100, 4, 200, 1, 3, 2]
   *
   * Set = {100, 4, 200, 1, 3, 2}
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 100                                               │
   * │ num-1 = 99 present? NO                                  │
   * │ -> start of a sequence                                  │
   * │                                                          │
   * │ 100 present -> yes                                      │
   * │ 101 present -> no                                       │
   * │ length = 1                                              │
   * │ maxLength = 1                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 4                                                 │
   * │ num-1 = 3 present? YES                                  │
   * │ -> yeh beech wala element hai, start nahi               │
   * │ -> SKIP                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 200                                               │
   * │ num-1 = 199 present? NO                                 │
   * │ -> start                                                │
   * │ 200 present -> yes                                      │
   * │ 201 present -> no                                       │
   * │ length = 1                                              │
   * │ maxLength = 1                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                 │
   * │ num-1 = 0 present? NO                                   │
   * │ -> actual streak start                                  │
   * │                                                          │
   * │ 1 present -> yes                                        │
   * │ 2 present -> yes                                        │
   * │ 3 present -> yes                                        │
   * │ 4 present -> yes                                        │
   * │ 5 present -> no                                         │
   * │ length = 4                                              │
   * │ maxLength = 4                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer: 4
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> 0
   * 2. Single element -> 1
   * 3. Duplicates: [1,2,2,3] -> 3
   * 4. Negative numbers: [-3,-2,-1] -> 3
   * 5. No consecutive neighbors: [10,30,50] -> 1
   */

  export function runTests(): void {
    console.log('🧪 Testing Longest Consecutive Sequence — OPTIMAL\n');

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [100, 4, 200, 1, 3, 2], expected: 4 },
      { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], expected: 9 },
      { nums: [], expected: 0 },
      { nums: [1], expected: 1 },
      { nums: [1, 2, 0, 1], expected: 3 },
      { nums: [-1, -2, -3, 10], expected: 3 },
      { nums: [10, 30, 20], expected: 1 },
      { nums: [-2, -1, 0, 1, 2], expected: 5 },
      { nums: [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6], expected: 7 },
      { nums: [1, 2, 3, 10, 11, 12, 13], expected: 4 },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = longestConsecutive(nums);
      const pass = result === expected;

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} → ${pass ? '✅' : '❌'}`);
    });
  }
}

LongestConsecutiveOptimal.runTests();
