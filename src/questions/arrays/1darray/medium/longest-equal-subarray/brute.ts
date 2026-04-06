/**
 * ═══════════════════════════════════════════════════════════
 * LONGEST EQUAL SUBARRAY — BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Ek integer array `nums` aur integer `k` diya hai.
 * Hum kisi subarray ke andar se at most `k` elements delete kar sakte hain.
 * Delete karne ke baad bache hue saare elements equal hone chahiye.
 *
 * Hume longest possible equal subarray ki length return karni hai.
 *
 * EXAMPLES:
 *   nums = [1, 3, 2, 3, 1, 3], k = 3  → 3
 *   nums = [1, 1, 2, 2, 1, 1], k = 2  → 4
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force me:
 *   har subarray try karo
 *   us subarray me dekho kaunsa number sabse zyada baar aaya
 *
 * Agar kisi window me:
 *
 *   windowSize = total elements
 *   maxFreq    = most frequent value ka count
 *
 * toh equal banane ke liye बाकी sab delete karne padenge:
 *
 *   deletionsNeeded = windowSize - maxFreq
 *
 * Agar:
 *
 *   deletionsNeeded <= k
 *
 * toh yeh window valid hai,
 * aur final equal subarray ki length `maxFreq` hogi.
 *
 * TIME:  O(n^2) — har start se sab end points try karte hain
 * SPACE: O(n) — current window frequencies
 */

namespace LongestEqualSubarrayBrute {
  function longestEqualSubarray(nums: number[], k: number): number {
    const n = nums.length;
    if (n === 0) return 0;

    let maxLen = 0;

    for (let left = 0; left < n; left++) {
      const freq = new Map<number, number>();
      let maxFreq = 0;

      for (let right = left; right < n; right++) {
        const currentCount = (freq.get(nums[right]) ?? 0) + 1;
        freq.set(nums[right], currentCount);
        maxFreq = Math.max(maxFreq, currentCount);

        const windowSize = right - left + 1;
        const deletionsNeeded = windowSize - maxFreq;

        // Agar maxFreq wali value rakhein aur baaki delete karein,
        // toh equal subarray ban jayegi
        if (deletionsNeeded <= k) {
          maxLen = Math.max(maxLen, maxFreq);
        }
      }
    }

    return maxLen;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [1, 2, 1, 2, 1], k = 1
   *
   * Start:
   *   n = 5
   *   maxLen = 0
   *
   * Har `left` ke liye:
   *   freq map fresh banega
   *   maxFreq fresh start hoga
   *   phir `right` ko left se aage badha ke har window try karenge
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 0
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   freq = {}
   *   maxFreq = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 0, nums[right] = 1                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 1: 1 }                              │
   * │ maxFreq         = 1                                     │
   * │ window          = [1]                                   │
   * │ windowSize      = 1                                     │
   * │ deletionsNeeded = 1 - 1 = 0                             │
   * │ valid           = yes                                   │
   * │ maxLen          = max(0, 1) = 1                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 1, nums[right] = 2                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 1: 1, 2: 1 }                        │
   * │ maxFreq         = 1                                     │
   * │ window          = [1, 2]                                │
   * │ windowSize      = 2                                     │
   * │ deletionsNeeded = 2 - 1 = 1                             │
   * │ valid           = yes                                   │
   * │ maxLen          = max(1, 1) = 1                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 2, nums[right] = 1                              │
   * │ currentCount    = 2                                     │
   * │ freq            = { 1: 2, 2: 1 }                        │
   * │ maxFreq         = 2                                     │
   * │ window          = [1, 2, 1]                             │
   * │ windowSize      = 3                                     │
   * │ deletionsNeeded = 3 - 2 = 1                             │
   * │ valid           = yes                                   │
   * │ maxLen          = max(1, 2) = 2                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = 2                              │
   * │ currentCount    = 2                                     │
   * │ freq            = { 1: 2, 2: 2 }                        │
   * │ maxFreq         = 2                                     │
   * │ window          = [1, 2, 1, 2]                          │
   * │ windowSize      = 4                                     │
   * │ deletionsNeeded = 4 - 2 = 2                             │
   * │ valid           = no                                    │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 4, nums[right] = 1                              │
   * │ currentCount    = 3                                     │
   * │ freq            = { 1: 3, 2: 2 }                        │
   * │ maxFreq         = 3                                     │
   * │ window          = [1, 2, 1, 2, 1]                       │
   * │ windowSize      = 5                                     │
   * │ deletionsNeeded = 5 - 3 = 2                             │
   * │ valid           = no                                    │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 1
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   freq = {}
   *   maxFreq = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 1, nums[right] = 2                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 2: 1 }                              │
   * │ maxFreq         = 1                                     │
   * │ window          = [2]                                   │
   * │ windowSize      = 1                                     │
   * │ deletionsNeeded = 1 - 1 = 0                             │
   * │ valid           = yes                                   │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 2, nums[right] = 1                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 2: 1, 1: 1 }                        │
   * │ maxFreq         = 1                                     │
   * │ window          = [2, 1]                                │
   * │ windowSize      = 2                                     │
   * │ deletionsNeeded = 2 - 1 = 1                             │
   * │ valid           = yes                                   │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = 2                              │
   * │ currentCount    = 2                                     │
   * │ freq            = { 2: 2, 1: 1 }                        │
   * │ maxFreq         = 2                                     │
   * │ window          = [2, 1, 2]                             │
   * │ windowSize      = 3                                     │
   * │ deletionsNeeded = 3 - 2 = 1                             │
   * │ valid           = yes                                   │
   * │ maxLen          = max(2, 2) = 2                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 4, nums[right] = 1                              │
   * │ currentCount    = 2                                     │
   * │ freq            = { 2: 2, 1: 2 }                        │
   * │ maxFreq         = 2                                     │
   * │ window          = [2, 1, 2, 1]                          │
   * │ windowSize      = 4                                     │
   * │ deletionsNeeded = 4 - 2 = 2                             │
   * │ valid           = no                                    │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 2
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   freq = {}
   *   maxFreq = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 2, nums[right] = 1                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 1: 1 }                              │
   * │ maxFreq         = 1                                     │
   * │ window          = [1]                                   │
   * │ windowSize      = 1                                     │
   * │ deletionsNeeded = 1 - 1 = 0                             │
   * │ valid           = yes                                   │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = 2                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 1: 1, 2: 1 }                        │
   * │ maxFreq         = 1                                     │
   * │ window          = [1, 2]                                │
   * │ windowSize      = 2                                     │
   * │ deletionsNeeded = 2 - 1 = 1                             │
   * │ valid           = yes                                   │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 4, nums[right] = 1                              │
   * │ currentCount    = 2                                     │
   * │ freq            = { 1: 2, 2: 1 }                        │
   * │ maxFreq         = 2                                     │
   * │ window          = [1, 2, 1]                             │
   * │ windowSize      = 3                                     │
   * │ deletionsNeeded = 3 - 2 = 1                             │
   * │ valid           = yes                                   │
   * │ maxLen          = max(2, 2) = 2                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 3
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   freq = {}
   *   maxFreq = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 3, nums[right] = 2                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 2: 1 }                              │
   * │ maxFreq         = 1                                     │
   * │ window          = [2]                                   │
   * │ windowSize      = 1                                     │
   * │ deletionsNeeded = 1 - 1 = 0                             │
   * │ valid           = yes                                   │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 4, nums[right] = 1                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 2: 1, 1: 1 }                        │
   * │ maxFreq         = 1                                     │
   * │ window          = [2, 1]                                │
   * │ windowSize      = 2                                     │
   * │ deletionsNeeded = 2 - 1 = 1                             │
   * │ valid           = yes                                   │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: left = 4
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state:
   *   freq = {}
   *   maxFreq = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 4, nums[right] = 1                              │
   * │ currentCount    = 1                                     │
   * │ freq            = { 1: 1 }                              │
   * │ maxFreq         = 1                                     │
   * │ window          = [1]                                   │
   * │ windowSize      = 1                                     │
   * │ deletionsNeeded = 1 - 1 = 0                             │
   * │ valid           = yes                                   │
   * │ maxLen          = stays 2                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   maxLen = 2
   *
   * Valid windows jahan answer 2 mila:
   *   [1, 2, 1] -> delete middle 2 -> [1, 1]
   *   [2, 1, 2] -> delete middle 1 -> [2, 2]
   *   [1, 2, 1] starting at left = 2 -> delete middle 2 -> [1, 1]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> 0
   * 2. Single element -> 1
   * 3. All equal -> whole array length
   * 4. k = 0 -> only already-equal subarrays valid
   * 5. All distinct with small k -> often answer 1
   */

  export function runTests(): void {
    console.log('🧪 Testing Longest Equal Subarray — BRUTE FORCE\n');

    const tests: Array<{
      nums: number[];
      k: number;
      expected: number;
    }> = [
      { nums: [1, 3, 2, 3, 1, 3], k: 3, expected: 3 },
      { nums: [1, 1, 2, 2, 1, 1], k: 2, expected: 4 },
      { nums: [], k: 5, expected: 0 },
      { nums: [7], k: 0, expected: 1 },
      { nums: [5, 5, 5, 5], k: 1, expected: 4 },
      { nums: [1, 2, 3, 4], k: 0, expected: 1 },
      { nums: [1, 2, 1, 2, 1], k: 1, expected: 2 },
      { nums: [1, 2, 1, 2, 1], k: 2, expected: 3 },
      { nums: [4, 4, 1, 4, 2, 4], k: 2, expected: 4 },
      { nums: [8, 8, 9, 8, 8, 8], k: 1, expected: 5 },
    ];

    tests.forEach(({ nums, k, expected }, i) => {
      const result = longestEqualSubarray(nums, k);
      const pass = result === expected;

      console.log(`Test ${i + 1}: nums=[${nums}], k=${k}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} → ${pass ? '✅' : '❌'}`);
    });
  }
}

LongestEqualSubarrayBrute.runTests();
