/**
 * ═══════════════════════════════════════════════════════════
 * MAJORITY ELEMENT - OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array me ek aisa element diya gaya hai jo `n / 2` se zyada baar aata hai.
 * Hume us majority element ko return karna hai.
 *
 * GUARANTEE:
 * Majority element hamesha exist karta hai.
 *
 * EXAMPLES:
 *   [3, 2, 3]                -> 3
 *   [2, 2, 1, 1, 1, 2, 2]    -> 2
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Pehle brute force socho:
 *
 *   har value ka exact count nikaalo
 *
 * Better approach:
 *
 *   frequency map use karo
 *
 * Lekin optimal me ek aur deeper pattern hai.
 *
 * Example:
 *   nums = [2, 2, 1, 1, 1, 2, 2]
 *
 * Isko pair-cancel karke socho:
 *
 *   2 with 1 -> cancel
 *   2 with 1 -> cancel
 *
 * Phir bhi `2` bachta hai.
 *
 * Kyun?
 * Kyunki majority element baaki sab elements milkar bhi completely
 * usko cancel nahi kar sakte.
 *
 * Isi observation par Boyer-Moore based hai.
 *
 * Hume bas 2 cheezein maintain karni hain:
 *   candidate -> abhi kis value ko majority contender maan rahe hain
 *   count     -> current balance kitna hai
 *
 * Rule:
 *   same value mile -> count badhao
 *   different value mile -> count ghatao
 *   count 0 ho jaye -> next value naya candidate ban sakti hai
 *
 * NOTE:
 * Agar problem me majority guaranteed na hoti,
 * toh end me candidate verify karne ke liye second pass chahiye hota.
 *
 * Current problem me guarantee hai,
 * isliye end ka candidate hi final answer hai.
 *
 * TIME:  O(n)
 * SPACE: O(1)
 */

namespace MajorityElementOptimal {

  function majorityElement(nums: number[]): number {
    let candidate = 0;
    let count = 0;

    for (const num of nums) {
      // Balance zero ka matlab pichhla candidate fully cancel ho chuka hai.
      if (count === 0) {
        candidate = num;
      }

      // Same value current candidate ko support karti hai.
      // Different value ek support cancel kar deti hai.
      count += num === candidate ? 1 : -1;
    }

    return candidate;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Standard majority case ────────────────────
   * nums = [2, 2, 1, 1, 1, 2, 2]
   *
   * Start:
   *   candidate = 0
   *   count = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ count == 0 -> candidate = 2                              │
   * │ num === candidate -> count = 1                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ num === candidate -> count = 2                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ num !== candidate -> count = 1                           │
   * │ Ek `2` aur ek `1` cancel socho                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ num !== candidate -> count = 0                           │
   * │ Ab current candidate ka balance khatam ho gaya           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 1                                                  │
   * │ count == 0 -> candidate = 1                              │
   * │ num === candidate -> count = 1                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ num !== candidate -> count = 0                           │
   * │ Ek `1` aur ek `2` cancel                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ num = 2                                                  │
   * │ count == 0 -> candidate = 2                              │
   * │ num === candidate -> count = 1                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final candidate = 2 -> answer
   *
   * ── Example 2: Single element ─────────────────────────────
   * nums = [9]
   *
   * First element pe count 0 hota hai,
   * isliye candidate = 9 banega
   * aur count = 1 ho jayega.
   *
   * Final answer = 9
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single element: [5]
   *    First element hi candidate banega -> answer 5
   *
   * 2. All same values: [7,7,7,7]
   *    Candidate kabhi change hi nahi hoga
   *
   * 3. Majority appears late: [1,2,2,3,2,2,2]
   *    Early candidates cancel ho sakte hain,
   *    final majority phir bhi bachti hai
   *
   * 4. Negative values: [-1,-1,-1,2,3]
   *    Comparison normal tarah se kaam karega -> answer -1
   */

  export function runTests(): void {
    console.log('Testing Majority Element - OPTIMAL\n');

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [3, 2, 3], expected: 3 },
      { nums: [2, 2, 1, 1, 1, 2, 2], expected: 2 },
      { nums: [1], expected: 1 },
      { nums: [7, 7, 7, 7], expected: 7 },
      { nums: [1, 2, 2], expected: 2 },
      { nums: [-1, -1, -1, 2, 3], expected: -1 },
      { nums: [6, 5, 5, 5, 6, 5, 5], expected: 5 },
      { nums: [9, 9, 1, 2, 9, 3, 9, 4, 9], expected: 9 },
      { nums: [4, 4, 4, 2, 2], expected: 4 },
      { nums: [8, 1, 8, 2, 8, 3, 8], expected: 8 },
    ];

    tests.forEach(({ nums, expected }, i) => {
      const result = majorityElement(nums);
      const pass = result === expected;

      console.log(`Test ${i + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${expected} | Got: ${result} -> ${pass ? 'PASS' : 'FAIL'}`);
    });
  }
}

MajorityElementOptimal.runTests();
