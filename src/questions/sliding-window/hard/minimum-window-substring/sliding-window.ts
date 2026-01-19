/**
 * MINIMUM WINDOW SUBSTRING - SLIDING WINDOW (OPTIMAL)
 * ====================================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Brute force mein problem kya hai? Har substring check karna padta hai!
 *
 * SMART OBSERVATION:
 * - Agar window valid hai, toh LEFT shrink karo (minimum dhundho)
 * - Agar window invalid hai, toh RIGHT expand karo (valid banao)
 * - Ye EXPAND-SHRINK pattern O(n) mein solve kar deta hai!
 *
 * THE "FORMED" COUNTER TRICK:
 * ───────────────────────────
 * Har baar 2 maps compare karna expensive hai O(26)
 *
 * Instead, track karo:
 * - required: kitne unique chars chahiye aur kitne kitne
 * - formed: kitne unique chars ka count SATISFY ho gaya
 *
 * Jab formed == required.size → WINDOW IS VALID! O(1) check!
 *
 * ALGORITHM:
 * ──────────
 * 1. Build "required" frequency map from t
 * 2. Expand RIGHT until window is VALID (formed == required.size)
 * 3. Shrink LEFT while window stays VALID → track minimum
 * 4. Repeat until right reaches end
 *
 * TIME COMPLEXITY: O(m + n)
 *   - O(n) to build required map
 *   - O(m) for sliding window (each char visited at most twice)
 *
 * SPACE COMPLEXITY: O(m + n)
 *   - O(n) for required map (at most n unique chars from t)
 *   - O(m) for window map (at most m unique chars from s)
 */

namespace MinWindowSubstringSlidingWindow {
  /**
   * Main function - finds minimum window containing all chars of t
   *
   * @param s - Source string to search in
   * @param t - Target string (all chars must be in window)
   * @returns Minimum window substring, or "" if not found
   */
  function minWindow(s: string, t: string): string {
    const m = s.length;
    const n = t.length;

    // Edge Case: If t is longer than s, impossible
    if (n > m) return '';

    // Edge Case: Empty t
    if (n === 0) return '';

    // ═══════════════════════════════════════════════════════════════════
    // STEP 1: Build "required" frequency map from t
    // ═══════════════════════════════════════════════════════════════════
    //
    // This tells us WHAT chars we need and HOW MANY of each
    // EXAMPLE: t = "ABC" → required = {A:1, B:1, C:1}
    // EXAMPLE: t = "AABC" → required = {A:2, B:1, C:1}
    const required: Map<string, number> = new Map();

    for (const char of t) {
      required.set(char, (required.get(char) || 0) + 1);
    }

    // requiredSize = number of UNIQUE characters we need to satisfy
    // EXAMPLE: t = "ABC" → requiredSize = 3
    // EXAMPLE: t = "AABC" → requiredSize = 3 (still 3 unique: A, B, C)
    const requiredSize = required.size;

    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: Initialize sliding window variables
    // ═══════════════════════════════════════════════════════════════════

    // Frequency map for current window
    const windowCounts: Map<string, number> = new Map();

    // "formed" = how many unique chars in window have ENOUGH count
    // When formed == requiredSize → window is VALID!
    //
    // EXAMPLE: required = {A:2, B:1, C:1}
    //   Window has {A:1} → A not satisfied → formed = 0
    //   Window has {A:2} → A satisfied! → formed = 1
    //   Window has {A:2, B:1} → A,B satisfied → formed = 2
    //   Window has {A:2, B:1, C:1} → all satisfied → formed = 3 ✅
    let formed = 0;

    // Two pointers for sliding window
    let left = 0;
    let right = 0;

    // Track the minimum window found
    // [windowLength, startIndex, endIndex]
    let minWindow: [number, number, number] = [Infinity, 0, 0];

    // ═══════════════════════════════════════════════════════════════════
    // STEP 3: Sliding Window - EXPAND and SHRINK
    // ═══════════════════════════════════════════════════════════════════

    while (right < m) {
      // ─────────────────────────────────────────────────────────────────
      // PHASE 1: EXPAND - Add character from right
      // ─────────────────────────────────────────────────────────────────
      const charRight = s[right];

      // Add to window frequency map
      windowCounts.set(charRight, (windowCounts.get(charRight) || 0) + 1);

      // Check if this char is REQUIRED and now has ENOUGH count
      // If so, increment "formed"
      //
      // WHY check equality?
      // - If windowCounts[char] == required[char], we JUST satisfied this char
      // - If windowCounts[char] > required[char], we already counted it before
      if (
        required.has(charRight) &&
        windowCounts.get(charRight) === required.get(charRight)
      ) {
        formed++;
      }

      // ─────────────────────────────────────────────────────────────────
      // PHASE 2: SHRINK - Contract window while valid
      // ─────────────────────────────────────────────────────────────────
      //
      // While window is valid, try to minimize it by moving left pointer
      while (left <= right && formed === requiredSize) {
        const charLeft = s[left];

        // Update minimum window if current is smaller
        const currentLength = right - left + 1;
        if (currentLength < minWindow[0]) {
          minWindow = [currentLength, left, right];
        }

        // Remove left character from window
        const newCount = windowCounts.get(charLeft)! - 1;

        // ┌─────────────────────────────────────────────────────────────────┐
        // │ IMPORTANT: Should we DELETE when count becomes 0?              │
        // ├─────────────────────────────────────────────────────────────────┤
        // │                                                                 │
        // │ In THIS problem: NOT strictly necessary                        │
        // │ - We use "formed" counter for validity, NOT map.size           │
        // │ - Keeping zero-count keys doesn't affect correctness           │
        // │                                                                 │
        // │ In "Subarrays with K Distinct" / "At Most K Distinct":         │
        // │ - We use map.size to count distinct elements                   │
        // │ - We MUST delete when count=0, otherwise size is WRONG!        │
        // │                                                                 │
        // │ COMPARISON:                                                     │
        // │ ┌────────────────────────────┬─────────────────┬─────────────┐ │
        // │ │ Problem                    │ Validity Check  │ Must Delete?│ │
        // │ ├────────────────────────────┼─────────────────┼─────────────┤ │
        // │ │ Subarrays with K Distinct  │ map.size == k   │ YES!        │ │
        // │ │ At Most K Distinct         │ map.size <= k   │ YES!        │ │
        // │ │ Minimum Window Substring   │ formed == size  │ No*         │ │
        // │ └────────────────────────────┴─────────────────┴─────────────┘ │
        // │                                                                 │
        // │ *But deleting is CLEANER and saves memory for long strings!   │
        // │                                                                 │
        // │ Without delete: windowCounts = {A:0, D:0, B:1, C:1} ← Cluttered│
        // │ With delete:    windowCounts = {B:1, C:1}           ← Clean!  │
        // │                                                                 │
        // └─────────────────────────────────────────────────────────────────┘

        if (newCount === 0) {
          windowCounts.delete(charLeft); // Clean up - good practice!
        } else {
          windowCounts.set(charLeft, newCount);
        }

        // Check if removing this char makes us UNSATISFIED
        // If we now have LESS than required, decrement formed
        //
        // WHY check this condition?
        // - required.has(charLeft): only care about chars in t
        // - newCount < required: we now have LESS than needed
        if (required.has(charLeft) && newCount < required.get(charLeft)!) {
          formed--;
        }

        // Move left pointer forward (shrink window)
        left++;
      }

      // Move right pointer forward (expand window)
      right++;
    }

    // ═══════════════════════════════════════════════════════════════════
    // STEP 4: Return result
    // ═══════════════════════════════════════════════════════════════════

    // If no valid window found, return empty string
    if (minWindow[0] === Infinity) {
      return '';
    }

    // Extract the minimum window substring
    return s.substring(minWindow[1], minWindow[2] + 1);
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: s = "ADOBECODEBANC", t = "ABC"
   *
   * SETUP:
   * ──────
   * required = {A:1, B:1, C:1}
   * requiredSize = 3
   * windowCounts = {}
   * formed = 0
   * left = 0, right = 0
   * minWindow = [Infinity, 0, 0]
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * MAIN LOOP: Expand and Shrink
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=0: char='A'                                                          │
   * │   windowCounts = {A:1}                                                     │
   * │   A is required, windowCounts[A]=1 == required[A]=1 → formed = 1          │
   * │   formed(1) != requiredSize(3) → no shrink                                │
   * │   Window: [A]DOBECODEBANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=1: char='D'                                                          │
   * │   windowCounts = {A:1, D:1}                                                │
   * │   D not in required → formed stays 1                                       │
   * │   formed(1) != requiredSize(3) → no shrink                                │
   * │   Window: [AD]OBECODEBANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=2: char='O'                                                          │
   * │   windowCounts = {A:1, D:1, O:1}                                           │
   * │   O not in required → formed stays 1                                       │
   * │   Window: [ADO]BECODEBANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=3: char='B'                                                          │
   * │   windowCounts = {A:1, D:1, O:1, B:1}                                      │
   * │   B is required, windowCounts[B]=1 == required[B]=1 → formed = 2          │
   * │   formed(2) != requiredSize(3) → no shrink                                │
   * │   Window: [ADOB]ECODEBANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=4: char='E'                                                          │
   * │   windowCounts = {A:1, D:1, O:1, B:1, E:1}                                 │
   * │   E not in required → formed stays 2                                       │
   * │   Window: [ADOBE]CODEBANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=5: char='C'                                                          │
   * │   windowCounts = {A:1, D:1, O:1, B:1, E:1, C:1}                            │
   * │   C is required, windowCounts[C]=1 == required[C]=1 → formed = 3          │
   * │   formed(3) == requiredSize(3) → VALID! START SHRINKING                   │
   * │   Window: [ADOBEC]ODEBANC                                                  │
   * │                                                                            │
   * │   ┌─────────────────────────────────────────────────────────────────────┐  │
   * │   │ SHRINK LOOP:                                                        │  │
   * │   │                                                                     │  │
   * │   │ left=0: length=6 < Infinity → minWindow = [6, 0, 5]                │  │
   * │   │   Remove 'A': windowCounts[A] = 0                                  │  │
   * │   │   0 < required[A]=1 → formed = 2                                   │  │
   * │   │   formed(2) != 3 → EXIT shrink loop                                │  │
   * │   │   left = 1                                                          │  │
   * │   └─────────────────────────────────────────────────────────────────────┘  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=6: char='O'                                                          │
   * │   windowCounts[O] = 2                                                      │
   * │   O not in required → formed stays 2                                       │
   * │   Window: A[DOBECO]DEBANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=7: char='D'                                                          │
   * │   windowCounts[D] = 2                                                      │
   * │   D not in required → formed stays 2                                       │
   * │   Window: A[DOBECOD]EBANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=8: char='E'                                                          │
   * │   windowCounts[E] = 2                                                      │
   * │   E not in required → formed stays 2                                       │
   * │   Window: A[DOBECODE]BANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=9: char='B'                                                          │
   * │   windowCounts[B] = 2                                                      │
   * │   B is required, but 2 > 1 (already satisfied) → formed stays 2           │
   * │   Window: A[DOBECODEB]ANC                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=10: char='A'                                                         │
   * │   windowCounts[A] = 1                                                      │
   * │   A is required, windowCounts[A]=1 == required[A]=1 → formed = 3          │
   * │   formed(3) == requiredSize(3) → VALID! START SHRINKING                   │
   * │   Window: A[DOBECODEBA]NC                                                  │
   * │                                                                            │
   * │   ┌─────────────────────────────────────────────────────────────────────┐  │
   * │   │ SHRINK LOOP:                                                        │  │
   * │   │                                                                     │  │
   * │   │ left=1: length=10 > 6 → don't update minWindow                     │  │
   * │   │   Remove 'D': windowCounts[D] = 1                                  │  │
   * │   │   D not in required → formed stays 3                               │  │
   * │   │   Still valid! left = 2                                            │  │
   * │   │                                                                     │  │
   * │   │ left=2: length=9 > 6 → don't update                                │  │
   * │   │   Remove 'O': windowCounts[O] = 1                                  │  │
   * │   │   O not in required → formed stays 3                               │  │
   * │   │   Still valid! left = 3                                            │  │
   * │   │                                                                     │  │
   * │   │ left=3: length=8 > 6 → don't update                                │  │
   * │   │   Remove 'B': windowCounts[B] = 1                                  │  │
   * │   │   B is required, 1 >= 1 → formed stays 3                           │  │
   * │   │   Still valid! left = 4                                            │  │
   * │   │                                                                     │  │
   * │   │ left=4: length=7 > 6 → don't update                                │  │
   * │   │   Remove 'E': windowCounts[E] = 1                                  │  │
   * │   │   E not in required → formed stays 3                               │  │
   * │   │   Still valid! left = 5                                            │  │
   * │   │                                                                     │  │
   * │   │ left=5: length=6 == 6 → don't update (not smaller)                 │  │
   * │   │   Remove 'C': windowCounts[C] = 0                                  │  │
   * │   │   C is required, 0 < 1 → formed = 2                                │  │
   * │   │   INVALID! EXIT shrink loop, left = 6                              │  │
   * │   └─────────────────────────────────────────────────────────────────────┘  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=11: char='N'                                                         │
   * │   windowCounts[N] = 1                                                      │
   * │   N not in required → formed stays 2                                       │
   * │   Window: ADOBEC[ODEBAN]C                                                  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ right=12: char='C'                                                         │
   * │   windowCounts[C] = 1                                                      │
   * │   C is required, windowCounts[C]=1 == required[C]=1 → formed = 3          │
   * │   formed(3) == requiredSize(3) → VALID! START SHRINKING                   │
   * │   Window: ADOBEC[ODEBANC]                                                  │
   * │                                                                            │
   * │   ┌─────────────────────────────────────────────────────────────────────┐  │
   * │   │ SHRINK LOOP:                                                        │  │
   * │   │                                                                     │  │
   * │   │ left=6: length=7 > 6 → don't update                                │  │
   * │   │   Remove 'O': windowCounts[O] = 0                                  │  │
   * │   │   O not in required → formed stays 3                               │  │
   * │   │   Still valid! left = 7                                            │  │
   * │   │                                                                     │  │
   * │   │ left=7: length=6 == 6 → don't update                               │  │
   * │   │   Remove 'D': windowCounts[D] = 0                                  │  │
   * │   │   D not in required → formed stays 3                               │  │
   * │   │   Still valid! left = 8                                            │  │
   * │   │                                                                     │  │
   * │   │ left=8: length=5 < 6 → minWindow = [5, 8, 12]                      │  │
   * │   │   Remove 'E': windowCounts[E] = 0                                  │  │
   * │   │   E not in required → formed stays 3                               │  │
   * │   │   Still valid! left = 9                                            │  │
   * │   │                                                                     │  │
   * │   │ left=9: length=4 < 5 → minWindow = [4, 9, 12] ⭐                   │  │
   * │   │   Remove 'B': windowCounts[B] = 0                                  │  │
   * │   │   B is required, 0 < 1 → formed = 2                                │  │
   * │   │   INVALID! EXIT shrink loop, left = 10                             │  │
   * │   └─────────────────────────────────────────────────────────────────────┘  │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * RESULT
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * minWindow = [4, 9, 12]
   * Answer = s.substring(9, 13) = "BANC" ✅
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(m + n)?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * - Building required map: O(n)
   * - Each character in s is visited AT MOST TWICE:
   *   - Once when right pointer expands
   *   - Once when left pointer shrinks
   * - Total: O(m + n)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * THE "FORMED" COUNTER MAGIC
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Without formed counter:
   *   - Need to compare 2 hashmaps every time
   *   - O(26) or O(52) per comparison
   *   - Total: O(m × 26) extra
   *
   * With formed counter:
   *   - Just check: formed == requiredSize
   *   - O(1) per check!
   *
   * HOW formed UPDATES:
   *   - INCREMENT when: windowCounts[char] BECOMES equal to required[char]
   *   - DECREMENT when: windowCounts[char] BECOMES less than required[char]
   *   - This tracks the TRANSITION, not the state!
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      '🧪 Testing Minimum Window Substring - SLIDING WINDOW (OPTIMAL)\n'
    );

    const testCases: {
      s: string;
      t: string;
      expected: string;
      description: string;
    }[] = [
      // Basic examples from problem
      {
        s: 'ADOBECODEBANC',
        t: 'ABC',
        expected: 'BANC',
        description: 'Example 1: Classic case',
      },
      {
        s: 'a',
        t: 'a',
        expected: 'a',
        description: 'Example 2: Single char match',
      },
      {
        s: 'a',
        t: 'aa',
        expected: '',
        description: 'Example 3: Not enough chars',
      },

      // Edge cases
      {
        s: 'abc',
        t: 'abc',
        expected: 'abc',
        description: 'Exact match',
      },
      {
        s: 'abc',
        t: 'cba',
        expected: 'abc',
        description: 'Same chars different order',
      },
      {
        s: 'xyz',
        t: 'abc',
        expected: '',
        description: 'No matching chars',
      },

      // Duplicates
      {
        s: 'aa',
        t: 'aa',
        expected: 'aa',
        description: 'Duplicate chars in t',
      },
      {
        s: 'aab',
        t: 'aab',
        expected: 'aab',
        description: 'Mixed duplicates',
      },

      // Longer strings
      {
        s: 'ADOBECODEBANC',
        t: 'AABC',
        expected: 'ADOBECODEBA',
        description: "Need 2 A's",
      },
      {
        s: 'cabwefgewcwaefgcf',
        t: 'cae',
        expected: 'cwae',
        description: 'Multiple valid windows',
      },

      // Window at different positions
      {
        s: 'bba',
        t: 'ab',
        expected: 'ba',
        description: 'Window at end',
      },
      {
        s: 'abc',
        t: 'b',
        expected: 'b',
        description: 'Single char in middle',
      },

      // Additional edge cases
      {
        s: 'ab',
        t: 'b',
        expected: 'b',
        description: 'Target at end',
      },
      {
        s: 'bdab',
        t: 'ab',
        expected: 'ab',
        description: 'Multiple valid, pick shortest',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { s, t, expected, description } of testCases) {
      const result = minWindow(s, t);
      const status = result === expected ? '✅' : '❌';

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   s = "${s}", t = "${t}"`);
        console.log(`   Output: "${result}"\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   s = "${s}", t = "${t}"`);
        console.log(`   Expected: "${expected}", Got: "${result}"\n`);
      }
    }

    console.log('═'.repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('═'.repeat(60));
  }
}

// Run tests
MinWindowSubstringSlidingWindow.runTests();