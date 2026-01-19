/**
 * MINIMUM WINDOW SUBSEQUENCE - BRUTE FORCE
 * =========================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Sabse simple approach: Har starting position se try karo!
 * - Each index i se start karo
 * - Wahan se s2 ko subsequence ke roop mein dhundho
 * - Agar mil gaya, toh window length note karo
 * - Minimum track karo
 *
 * KEY DIFFERENCE FROM "MINIMUM WINDOW SUBSTRING":
 * ───────────────────────────────────────────────
 * - Substring: All chars present (ORDER DOESN'T MATTER)
 * - Subsequence: Chars must appear IN ORDER!
 *
 * Example: s1 = "abcdebdde", s2 = "bde"
 * - "bcde" → b...d...e in order ✅
 * - "deb" → d,e,b NOT in order ❌
 *
 * ALGORITHM:
 * ──────────
 * 1. For each starting index i in s1
 * 2. Try to match s2 as subsequence (forward scan)
 * 3. If complete match found, record window [i, endIndex]
 * 4. Track minimum length window
 *
 * TIME COMPLEXITY: O(m × n)
 *   - m starting positions
 *   - For each, scan up to m chars to find subsequence
 *
 * SPACE COMPLEXITY: O(1)
 */

namespace MinWindowSubsequenceBruteForce {
  /**
   * Main function - finds minimum window containing s2 as subsequence
   *
   * @param s1 - Source string to search in
   * @param s2 - Target string (must be subsequence of window)
   * @returns Minimum window substring, or "" if not found
   */
  function minWindow(s1: string, s2: string): string {
    const m = s1.length;
    const n = s2.length;

    // Edge Case: If s2 is longer than s1, impossible
    if (n > m) return '';

    // Edge Case: Empty s2
    if (n === 0) return '';

    // Track minimum window: [length, startIndex]
    let minLength = Infinity;
    let minStart = 0;

    // ═══════════════════════════════════════════════════════════════════
    // Try each starting position in s1
    // ═══════════════════════════════════════════════════════════════════

    for (let start = 0; start < m; start++) {
      // OPTIMIZATION: Only start where first char of s2 matches
      // WHY: If s1[start] != s2[0], we can't possibly start a valid window here
      if (s1[start] !== s2[0]) {
        continue;
      }

      // Try to find s2 as subsequence starting from 'start'
      const endIndex = findSubsequenceEnd(s1, s2, start);

      // If valid window found
      if (endIndex !== -1) {
        const windowLength = endIndex - start + 1;

        // Update minimum if this is smaller
        // Note: We want leftmost if same length, so use < not <=
        if (windowLength < minLength) {
          minLength = windowLength;
          minStart = start;
        }
      }
    }

    // Return result
    if (minLength === Infinity) {
      return '';
    }

    return s1.substring(minStart, minStart + minLength);
  }

  /**
   * Helper function - finds where subsequence ends starting from given index
   *
   * @param s1 - Source string
   * @param s2 - Target subsequence
   * @param start - Starting index in s1
   * @returns End index if subsequence found, -1 otherwise
   */
  function findSubsequenceEnd(s1: string, s2: string, start: number): number {
    const m = s1.length;
    const n = s2.length;

    let i = start; // Pointer for s1
    let j = 0; // Pointer for s2

    // Scan forward, matching s2 characters in order
    while (i < m && j < n) {
      if (s1[i] === s2[j]) {
        // Match found, move both pointers
        j++;
      }
      // Always move s1 pointer (we can skip chars in s1)
      i++;
    }

    // If we matched all of s2, return the end index
    // Note: i is now one past the last match, so end = i - 1
    if (j === n) {
      return i - 1;
    }

    // Couldn't find complete subsequence
    return -1;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: s1 = "abcdebdde", s2 = "bde"
   *
   * s1 indices: a  b  c  d  e  b  d  d  e
   *             0  1  2  3  4  5  6  7  8
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION 1: start = 0
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * s1[0] = 'a' != s2[0] = 'b' → SKIP (optimization)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION 2: start = 1
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * s1[1] = 'b' == s2[0] = 'b' → TRY!
   *
   * findSubsequenceEnd(s1, "bde", start=1):
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=1, j=0: s1[1]='b' == s2[0]='b' → j=1, i=2                               │
   * │ i=2, j=1: s1[2]='c' != s2[1]='d' → i=3                                    │
   * │ i=3, j=1: s1[3]='d' == s2[1]='d' → j=2, i=4                               │
   * │ i=4, j=2: s1[4]='e' == s2[2]='e' → j=3, i=5                               │
   * │                                                                            │
   * │ j=3 == n=3 → COMPLETE! Return endIndex = 5-1 = 4                          │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * Window: s1[1..4] = "bcde", length = 4
   * minLength = 4, minStart = 1
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION 3: start = 2, 3, 4
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * s1[2] = 'c' != 'b' → SKIP
   * s1[3] = 'd' != 'b' → SKIP
   * s1[4] = 'e' != 'b' → SKIP
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION 4: start = 5
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * s1[5] = 'b' == s2[0] = 'b' → TRY!
   *
   * findSubsequenceEnd(s1, "bde", start=5):
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=5, j=0: s1[5]='b' == s2[0]='b' → j=1, i=6                               │
   * │ i=6, j=1: s1[6]='d' == s2[1]='d' → j=2, i=7                               │
   * │ i=7, j=2: s1[7]='d' != s2[2]='e' → i=8                                    │
   * │ i=8, j=2: s1[8]='e' == s2[2]='e' → j=3, i=9                               │
   * │                                                                            │
   * │ j=3 == n=3 → COMPLETE! Return endIndex = 9-1 = 8                          │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * Window: s1[5..8] = "bdde", length = 4
   * 4 is NOT < 4 → don't update (same length, keep leftmost)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION 5: start = 6, 7, 8
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * s1[6] = 'd' != 'b' → SKIP
   * s1[7] = 'd' != 'b' → SKIP
   * s1[8] = 'e' != 'b' → SKIP
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * RESULT
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * minLength = 4, minStart = 1
   * Answer = s1.substring(1, 5) = "bcde" ✅
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ANOTHER EXAMPLE: s1 = "fhhjkeejkdjjs", s2 = "jkj"
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * s1: f  h  h  j  k  e  e  j  k  d  j  j  s
   *     0  1  2  3  4  5  6  7  8  9  10 11 12
   *
   * start=3: s1[3]='j' == 'j' → TRY!
   *   Find: j(3) → k(4) → j(7)
   *   Window: s1[3..7] = "jkeej", length = 5
   *   minLength = 5, minStart = 3
   *
   * start=7: s1[7]='j' == 'j' → TRY!
   *   Find: j(7) → k(8) → j(10)
   *   Window: s1[7..10] = "jkdj", length = 4
   *   4 < 5 → UPDATE! minLength = 4, minStart = 7
   *
   * start=10: s1[10]='j' == 'j' → TRY!
   *   Find: j(10) → k? (no k after 10)
   *   Return -1 → no valid window
   *
   * start=11: s1[11]='j' == 'j' → TRY!
   *   Find: j(11) → k? (no k after 11)
   *   Return -1 → no valid window
   *
   * Answer = s1.substring(7, 11) = "jkdj" ✅
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Minimum Window Subsequence - BRUTE FORCE\n');

    const testCases: {
      s1: string;
      s2: string;
      expected: string;
      description: string;
    }[] = [
      // Basic examples from problem
      {
        s1: 'abcdebdde',
        s2: 'bde',
        expected: 'bcde',
        description: 'Example 1: Classic case',
      },
      {
        s1: 'jmeqsiwvaovvnbstl',
        s2: 'u',
        expected: '',
        description: 'Example 2: Char not found',
      },
      {
        s1: 'fhhjkeejkdjjs',
        s2: 'jkj',
        expected: 'jkdj',
        description: 'Example 3: Quiz question',
      },

      // Edge cases
      {
        s1: 'a',
        s2: 'a',
        expected: 'a',
        description: 'Single char match',
      },
      {
        s1: 'a',
        s2: 'b',
        expected: '',
        description: 'Single char no match',
      },
      {
        s1: 'abc',
        s2: 'abc',
        expected: 'abc',
        description: 'Exact match',
      },

      // Subsequence order matters
      {
        s1: 'xyz',
        s2: 'zyx',
        expected: '',
        description: 'Wrong order - not subsequence',
      },
      {
        s1: 'abcabc',
        s2: 'abc',
        expected: 'abc',
        description: 'Multiple matches, pick leftmost',
      },

      // Longer examples
      {
        s1: 'cnhczmccqouqadqtmjjzl',
        s2: 'cm',
        expected: 'czm',
        description: 'Find cm subsequence',
      },
      {
        s1: 'abcdeafbdgc',
        s2: 'abc',
        expected: 'abc',
        description: 'Optimal at start',
      },

      // No valid window
      {
        s1: 'aaa',
        s2: 'ab',
        expected: '',
        description: 'Missing character',
      },

      // Same length windows
      {
        s1: 'abab',
        s2: 'ab',
        expected: 'ab',
        description: 'Multiple same-length, pick first',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { s1, s2, expected, description } of testCases) {
      const result = minWindow(s1, s2);
      const status = result === expected ? '✅' : '❌';

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   s1 = "${s1}", s2 = "${s2}"`);
        console.log(`   Output: "${result}"\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   s1 = "${s1}", s2 = "${s2}"`);
        console.log(`   Expected: "${expected}", Got: "${result}"\n`);
      }
    }

    console.log('═'.repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('═'.repeat(60));
  }
}

// Run tests
MinWindowSubsequenceBruteForce.runTests();