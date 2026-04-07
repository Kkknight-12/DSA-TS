/**
 * ═══════════════════════════════════════════════════════════
 * MAJORITY ELEMENT II — BRUTE FORCE
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
 * Brute force me:
 *   har element ko candidate maan lo
 *   poore array me uski frequency count karo
 *
 * Agar:
 *
 *   count > floor(n / 3)
 *
 * toh woh answer ka part hai.
 *
 * Same majority value ko baar-baar push na karne ke liye
 * result me already present ho toh us candidate ko skip kar dete hain.
 *
 * TIME:  O(n^2) — har candidate ke liye poore array me count
 * SPACE: O(1)  — output ko chhodkar extra structure nahi
 */

namespace MajorityElementIIBruteForce {
  function majorityElement(nums: number[]): number[] {
    const n = nums.length;
    const threshold = Math.floor(n / 3);
    const result: number[] = [];

    for (let i = 0; i < n; i++) {
      // Agar ye value already answer me aa chuki hai,
      // toh isko dobara count karne ka koi fayda nahi.
      if (result.includes(nums[i])) continue;

      let count = 0;

      for (let j = 0; j < n; j++) {
        // Current candidate ki exact frequency count kar rahe hain.
        if (nums[j] === nums[i]) {
          count++;
        }
      }

      // Strictly greater than n/3 hi chahiye.
      if (count > threshold) {
        result.push(nums[i]);
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
   * nums = [3, 2, 3]
   *
   * Start:
   *   n = 3
   *   threshold = floor(3 / 3) = 1
   *   result = []
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 0
   * ═══════════════════════════════════════════════════════════
   *
   * Current candidate:
   *   nums[i] = 3
   *
   * result.includes(3) ? no
   * so ab iski full frequency count karenge
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 0, nums[j] = 3                                      │
   * │ nums[j] === nums[i] ? yes                               │
   * │ count = 1                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 1, nums[j] = 2                                      │
   * │ nums[j] === nums[i] ? no                                │
   * │ count stays 1                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 2, nums[j] = 3                                      │
   * │ nums[j] === nums[i] ? yes                               │
   * │ count = 2                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final count for candidate 3:
   *   count = 2
   *   2 > threshold(1) ? yes
   *   result = [3]
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * Current candidate:
   *   nums[i] = 2
   *
   * result.includes(2) ? no
   * so iski bhi full frequency count karenge
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 0, nums[j] = 3                                      │
   * │ nums[j] === nums[i] ? no                                │
   * │ count = 0                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 1, nums[j] = 2                                      │
   * │ nums[j] === nums[i] ? yes                               │
   * │ count = 1                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 2, nums[j] = 3                                      │
   * │ nums[j] === nums[i] ? no                                │
   * │ count stays 1                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final count for candidate 2:
   *   count = 1
   *   1 > threshold(1) ? no
   *   result stays [3]
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * Current candidate:
   *   nums[i] = 3
   *
   * result.includes(3) ? yes
   * so isko skip kar diya
   *
   * Final answer:
   *   [3]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> []
   * 2. Single element -> [that element]
   * 3. Two elements -> dono aa sakte hain, because threshold 0 hota hai
   * 4. No majority > n/3 -> []
   * 5. Do valid majority elements ho sakte hain
   */

  export function runTests(): void {
    console.log('🧪 Testing Majority Element II — BRUTE FORCE\n');

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

MajorityElementIIBruteForce.runTests();
