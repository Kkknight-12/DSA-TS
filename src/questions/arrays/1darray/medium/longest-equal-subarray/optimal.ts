/**
 * ═══════════════════════════════════════════════════════════
 * LONGEST EQUAL SUBARRAY — OPTIMAL (Indices + Sliding Window)
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
 * Equal subarray banane ke liye final answer me sirf ek hi value bachegi.
 *
 * Soch:
 *   pehle ek value choose karo, maan lo `3`
 *   phir dekho array me `3` kin indices pe aata hai
 *
 * Example:
 *   nums = [1, 3, 2, 3, 1, 3]
 *   3 ke indices = [1, 3, 5]
 *
 * Ab agar hum indices [1, 3, 5] ko ek window me lete hain:
 *
 *   total span = 5 - 1 = 4
 *   total 3's   = 3
 *   gaps        = 4 - (3 - 1) = 2
 *
 * Yeh 2 gaps wahi extra elements hain jo delete karne padenge.
 *
 * General formula:
 *
 *   deletionsNeeded = indices[right] - indices[left] - (right - left)
 *
 * Agar deletionsNeeded <= k hai,
 * toh current value ki itni occurrences ko saath me rakh sakte hain.
 *
 * TIME:  O(n) average — each index-list pe sliding window linear chalta hai
 * SPACE: O(n) — index map store karte hain
 */

namespace LongestEqualSubarrayOptimal {
  function longestEqualSubarray(nums: number[], k: number): number {
    const n = nums.length;
    // Empty array me equal subarray possible hi nahi
    if (n === 0) return 0;

    // Har distinct value ke saare indices ek jagah collect kar lo.
    // WHY: ek baar value choose kar li, toh bas us value ki positions matter karti hain.
    const indexMap = new Map<number, number[]>();

    nums.forEach((num, index) => {
      if (!indexMap.has(num)) {
        indexMap.set(num, []);
      }

      // Current value future me apni index-list ke through process hogi
      indexMap.get(num)!.push(index);
    });

    let maxLen = 0;

    // Har value ko independently answer candidate maan ke dekhte hain
    for (const indices of indexMap.values()) {
      // `left` aur `right` original array pe nahi,
      // current value ki index-list pe move kar rahe hain
      let left = 0;

      for (let right = 0; right < indices.length; right++) {
        // Current chosen value ki occurrences ko ek window me rakh rahe hain.
        // Inke beech ke extra numbers delete karne padenge.
        //
        // indices[right] - indices[left] = total span
        // right - left                   = chosen value ke internal jumps
        // difference                     = beech ke non-equal elements
        while (indices[right] - indices[left] - (right - left) > k) {
          // Agar required deletions zyada ho gayi,
          // toh leftmost occurrence ko chhod do aur window shrink karo
          left++;
        }

        // Current valid window me chosen value ki jitni occurrences hain,
        // utni hi final equal subarray ki length hogi
        maxLen = Math.max(maxLen, right - left + 1);
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
   *   indexMap = {}
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 1: BUILD INDEX MAP
   * ═══════════════════════════════════════════════════════════
   *
   * nums.forEach((num, index) => ...)
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ index = 0, num = 1                                      │
   * │ indexMap before = {}                                    │
   * │ 1 not present, so create []                             │
   * │ push 0                                                  │
   * │ indexMap after  = { 1: [0] }                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ index = 1, num = 2                                      │
   * │ indexMap before = { 1: [0] }                            │
   * │ 2 not present, so create []                             │
   * │ push 1                                                  │
   * │ indexMap after  = { 1: [0], 2: [1] }                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ index = 2, num = 1                                      │
   * │ indexMap before = { 1: [0], 2: [1] }                    │
   * │ 1 already present                                       │
   * │ push 2                                                  │
   * │ indexMap after  = { 1: [0, 2], 2: [1] }                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ index = 3, num = 2                                      │
   * │ indexMap before = { 1: [0, 2], 2: [1] }                 │
   * │ 2 already present                                       │
   * │ push 3                                                  │
   * │ indexMap after  = { 1: [0, 2], 2: [1, 3] }              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ index = 4, num = 1                                      │
   * │ indexMap before = { 1: [0, 2], 2: [1, 3] }              │
   * │ 1 already present                                       │
   * │ push 4                                                  │
   * │ indexMap after  = { 1: [0, 2, 4], 2: [1, 3] }           │
   * └──────────────────────────────────────────────────────────┘
   *
   * Ab har value ke indices alag-alag mil gaye:
   *   1 -> [0, 2, 4]
   *   2 -> [1, 3]
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 2: PROCESS INDICES = [0, 2, 4]  (value = 1)
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state for this value:
   *   left = 0
   *
   * Dhyan do:
   *   left/right original nums pe move nahi kar rahe
   *   yeh [0, 2, 4] wali index-list pe move kar rahe hain
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 0                                                │
   * │ chosen occurrences = [0]                                │
   * │ deletionsNeeded = indices[0] - indices[0] - (0 - 0)     │
   * │                 = 0 - 0 - 0 = 0                         │
   * │ while check: 0 > 1 ? no                                 │
   * │ valid window length = right - left + 1 = 1              │
   * │ maxLen = max(0, 1) = 1                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 1                                                │
   * │ chosen occurrences = [0, 2]                             │
   * │ deletionsNeeded = indices[1] - indices[0] - (1 - 0)     │
   * │                 = 2 - 0 - 1 = 1                         │
   * │ while check: 1 > 1 ? no                                 │
   * │ valid window length = right - left + 1 = 2              │
   * │ maxLen = max(1, 2) = 2                                  │
   * │                                                          │
   * │ Actual meaning:                                          │
   * │ positions 0..2 span me [1, 2, 1] hai                    │
   * │ beech ka one extra element delete karke [1, 1] banega   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 2                                                │
   * │ chosen occurrences = [0, 2, 4]                          │
   * │ deletionsNeeded = indices[2] - indices[0] - (2 - 0)     │
   * │                 = 4 - 0 - 2 = 2                         │
   * │ while check: 2 > 1 ? yes                                │
   * │                                                          │
   * │ while iteration 1:                                       │
   * │   left++                                                 │
   * │   left becomes 1                                         │
   * │                                                          │
   * │ Recompute with new left:                                 │
   * │ deletionsNeeded = indices[2] - indices[1] - (2 - 1)     │
   * │                 = 4 - 2 - 1 = 1                         │
   * │ while check: 1 > 1 ? no                                 │
   * │                                                          │
   * │ Current valid window length = right - left + 1          │
   * │                           = 2 - 1 + 1 = 2               │
   * │ maxLen = max(2, 2) = 2                                  │
   * │                                                          │
   * │ Actual meaning:                                          │
   * │ [0, 2, 4] ko saath rakhne ke liye 2 deletions chahiye   │
   * │ but k = 1 hai, so leftmost 1 ko drop kiya               │
   * │ ab chosen occurrences [2, 4] hain                       │
   * │ positions 2..4 me [1, 2, 1] se [1, 1] banta hai         │
   * └──────────────────────────────────────────────────────────┘
   *
   * Value 1 ke liye best length = 2
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 3: PROCESS INDICES = [1, 3]  (value = 2)
   * ═══════════════════════════════════════════════════════════
   *
   * Fresh state for this value:
   *   left = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 0                                                │
   * │ chosen occurrences = [1]                                │
   * │ deletionsNeeded = 1 - 1 - 0 = 0                         │
   * │ while check: 0 > 1 ? no                                 │
   * │ valid window length = 1                                 │
   * │ maxLen = max(2, 1) = 2                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ right = 1                                                │
   * │ chosen occurrences = [1, 3]                             │
   * │ deletionsNeeded = indices[1] - indices[0] - (1 - 0)     │
   * │                 = 3 - 1 - 1 = 1                         │
   * │ while check: 1 > 1 ? no                                 │
   * │ valid window length = 2                                 │
   * │ maxLen = max(2, 2) = 2                                  │
   * │                                                          │
   * │ Actual meaning:                                          │
   * │ positions 1..3 me [2, 1, 2] hai                         │
   * │ middle ka 1 delete karke [2, 2] banta hai               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Value 2 ke liye best length = 2
   *
   * Final answer:
   *   maxLen = 2
   *
   * Dhyan do:
   *   algorithm actual subarray return nahi karta
   *   sirf best possible length track karta hai
   *   is example me [1, 1] bhi valid hai aur [2, 2] bhi valid hai
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array -> 0
   * 2. Single element -> 1
   * 3. All equal -> whole array length
   * 4. k = 0 -> only already-adjacent equal streaks matter
   * 5. Duplicates spread out -> gaps formula decide karega
   */

  export function runTests(): void {
    console.log('🧪 Testing Longest Equal Subarray — OPTIMAL\n');

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

LongestEqualSubarrayOptimal.runTests();
