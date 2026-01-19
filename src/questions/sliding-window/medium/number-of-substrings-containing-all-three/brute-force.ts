/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NUMBER OF SUBSTRINGS CONTAINING ALL THREE CHARACTERS - BRUTE FORCE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Count substrings containing at least one 'a', 'b', and 'c'
 *
 * Key Insight: "AT LEAST" IS EASIER THAN "EXACTLY"!
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   ┌────────────────────────────────────────────────────────────────────────┐
 *   │  Once we have a valid substring (contains a, b, c),                    │
 *   │  ALL extensions to the right are ALSO valid!                           │
 *   │                                                                        │
 *   │  Example: s = "abcabc"                                                 │
 *   │  If "abc" is valid, then "abca", "abcab", "abcabc" are ALL valid!      │
 *   │                                                                        │
 *   │  This means: Once valid, we can count ALL remaining extensions         │
 *   │              count += (n - j) where j is first valid ending position   │
 *   └────────────────────────────────────────────────────────────────────────┘
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Approach: Brute Force - Check ALL possible substrings
 * - For each starting position i
 * - Expand ending position j until we have all three characters
 * - Once valid, all further extensions are valid too!
 *
 * Time Complexity: O(n²) - nested loops (with optimization)
 * Space Complexity: O(1) - only using a few variables
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace NumberOfSubstringsContainingAllThreeBruteForce {
  /**
   * Count substrings containing at least one 'a', 'b', and 'c' - BRUTE FORCE
   *
   * @param s - String containing only 'a', 'b', 'c'
   * @returns Number of valid substrings
   */
  function numberOfSubstrings(s: string): number {
    const n = s.length;
    let count = 0;

    // ═══════════════════════════════════════════════════════════════
    // OUTER LOOP: Try each starting position
    // ═══════════════════════════════════════════════════════════════

    for (let i = 0; i < n; i++) {
      // Track frequency of each character in current window
      // Index 0 = 'a', Index 1 = 'b', Index 2 = 'c'
      const freq = [0, 0, 0];

      // ═══════════════════════════════════════════════════════════════
      // INNER LOOP: Try each ending position
      // ═══════════════════════════════════════════════════════════════

      for (let j = i; j < n; j++) {
        // ─────────────────────────────────────────────────────────────
        // STEP 1: Add current character to frequency
        // ─────────────────────────────────────────────────────────────
        // Convert 'a'/'b'/'c' to index 0/1/2
        // 'a'.charCodeAt(0) = 97, so 'a' - 'a' = 0, 'b' - 'a' = 1, 'c' - 'a' = 2
        const charIndex = s.charCodeAt(j) - 97; // 97 is 'a'.charCodeAt(0)
        freq[charIndex]++;

        // ─────────────────────────────────────────────────────────────
        // STEP 2: Check if we have all three characters
        // ─────────────────────────────────────────────────────────────
        if (freq[0] >= 1 && freq[1] >= 1 && freq[2] >= 1) {
          // ─────────────────────────────────────────────────────────────
          // OPTIMIZATION: Once valid, ALL extensions are valid!
          // ─────────────────────────────────────────────────────────────
          //
          // ┌────────────────────────────────────────────────────────────┐
          // │  WHY CAN WE ADD (n - j) AND BREAK?                         │
          // │                                                            │
          // │  Current substring s[i..j] is valid (has a, b, c)          │
          // │                                                            │
          // │  Extensions: s[i..j+1], s[i..j+2], ..., s[i..n-1]          │
          // │  All these ALSO have a, b, c (we're only adding chars!)    │
          // │                                                            │
          // │  How many valid substrings starting at i?                  │
          // │  - s[i..j]   (1 substring)                                 │
          // │  - s[i..j+1] (1 substring)                                 │
          // │  - ...                                                     │
          // │  - s[i..n-1] (1 substring)                                 │
          // │                                                            │
          // │  Total = (n-1) - j + 1 = n - j substrings                  │
          // │                                                            │
          // │  Example: s = "abcde", i = 0, j = 2 (first valid at "abc") │
          // │  Valid: "abc", "abcd", "abcde" = 5 - 2 = 3 substrings      │
          // └────────────────────────────────────────────────────────────┘

          count += n - j;
          break; // No need to check further for this starting position
        }
      }
    }

    return count;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example 1: s = "abcba"
   *            Index: 0 1 2 3 4
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 0 (Start from index 0)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=0: s[0]='a', freq=[1,0,0]
   *      Has all 3? NO (missing b, c)
   *
   * j=1: s[1]='b', freq=[1,1,0]
   *      Has all 3? NO (missing c)
   *
   * j=2: s[2]='c', freq=[1,1,1]
   *      Has all 3? YES! ✅
   *      count += (5 - 2) = 3
   *      Valid substrings: "abc", "abcb", "abcba"
   *      BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 1 (Start from index 1)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=1: s[1]='b', freq=[0,1,0]
   *      Has all 3? NO
   *
   * j=2: s[2]='c', freq=[0,1,1]
   *      Has all 3? NO (missing a)
   *
   * j=3: s[3]='b', freq=[0,2,1]
   *      Has all 3? NO (missing a)
   *
   * j=4: s[4]='a', freq=[1,2,1]
   *      Has all 3? YES! ✅
   *      count += (5 - 4) = 1
   *      Valid substring: "bcba"
   *      BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 2 (Start from index 2)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=2: s[2]='c', freq=[0,0,1]
   *      Has all 3? NO
   *
   * j=3: s[3]='b', freq=[0,1,1]
   *      Has all 3? NO (missing a)
   *
   * j=4: s[4]='a', freq=[1,1,1]
   *      Has all 3? YES! ✅
   *      count += (5 - 4) = 1
   *      Valid substring: "cba"
   *      BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 3 (Start from index 3)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=3: s[3]='b', freq=[0,1,0]
   *      Has all 3? NO
   *
   * j=4: s[4]='a', freq=[1,1,0]
   *      Has all 3? NO (missing c)
   *      End of string, no valid substring starting at i=3
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 4 (Start from index 4)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=4: s[4]='a', freq=[1,0,0]
   *      Has all 3? NO
   *      End of string, no valid substring starting at i=4
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: count = 3 + 1 + 1 = 5
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * The 5 valid substrings:
   * From i=0: "abc", "abcb", "abcba" (3)
   * From i=1: "bcba" (1)
   * From i=2: "cba" (1)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN 2: s = "abcabc"
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * i=0: First valid at j=2 ("abc")
   *      count += (6-2) = 4
   *      Valid: "abc", "abca", "abcab", "abcabc"
   *
   * i=1: First valid at j=4 ("bcab" - wait, let me recalculate)
   *      j=1: 'b' → [0,1,0] ❌
   *      j=2: 'c' → [0,1,1] ❌
   *      j=3: 'a' → [1,1,1] ✅
   *      count += (6-3) = 3
   *      Valid: "bca", "bcab", "bcabc"
   *
   * i=2: j=2: 'c' → [0,0,1] ❌
   *      j=3: 'a' → [1,0,1] ❌
   *      j=4: 'b' → [1,1,1] ✅
   *      count += (6-4) = 2
   *      Valid: "cab", "cabc"
   *
   * i=3: j=3: 'a' → [1,0,0] ❌
   *      j=4: 'b' → [1,1,0] ❌
   *      j=5: 'c' → [1,1,1] ✅
   *      count += (6-5) = 1
   *      Valid: "abc"
   *
   * i=4: j=4: 'b' → [0,1,0] ❌
   *      j=5: 'c' → [0,1,1] ❌
   *      No valid substring
   *
   * i=5: j=5: 'c' → [0,0,1] ❌
   *      No valid substring
   *
   * Total = 4 + 3 + 2 + 1 = 10 ✅
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY THE OPTIMIZATION WORKS
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌────────────────────────────────────────────────────────────────┐
   * │  "AT LEAST" property:                                          │
   * │                                                                │
   * │  If substring s[i..j] contains 'a', 'b', 'c'                   │
   * │  Then s[i..j+1], s[i..j+2], ..., s[i..n-1] ALSO contain them   │
   * │                                                                │
   * │  We're only ADDING characters, never removing!                 │
   * │  Once valid, always valid for extensions.                      │
   * │                                                                │
   * │  This is why we can:                                           │
   * │  1. Find first valid j                                         │
   * │  2. Add (n - j) to count                                       │
   * │  3. Break and move to next starting position                   │
   * │                                                                │
   * │  Without this: We'd count each substring individually O(n²)    │
   * │  With this: Still O(n²) worst case, but fewer operations       │
   * └────────────────────────────────────────────────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * TIME COMPLEXITY ANALYSIS
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Outer loop: n starting positions           → O(n)
   * Inner loop: up to n ending positions each  → O(n)
   *                                            ─────────
   * Total:                                       O(n²)
   *
   * With optimization:
   * - We break early when valid, but worst case (like "aaaa...bc")
   *   still requires O(n) inner iterations for first starting position
   * - Still O(n²) in worst case
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. s = "abc" → Only one valid substring → 1
   * 2. s = "aaa" → No valid substring (missing b, c) → 0
   * 3. s = "aabbcc" → Valid starts when all 3 present
   * 4. s = "cba" → "cba" is valid → 1
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      '🧪 Testing Number of Substrings Containing All Three - BRUTE FORCE\n'
    );
    console.log('═'.repeat(60) + '\n');

    const testCases: {
      s: string;
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        s: 'abcabc',
        expected: 10,
        description: 'Example 1 - repeated pattern',
      },
      {
        s: 'aaacb',
        expected: 3,
        description: 'Example 2 - multiple a\'s at start',
      },
      {
        s: 'abc',
        expected: 1,
        description: 'Example 3 - minimum valid string',
      },

      // Given examples
      {
        s: 'abcba',
        expected: 5,
        description: 'Palindrome-like',
      },
      {
        s: 'ccabcc',
        expected: 8,
        description: 'c\'s on both ends',
      },

      // Edge cases
      {
        s: 'aaa',
        expected: 0,
        description: 'Only one character type',
      },
      {
        s: 'aabb',
        expected: 0,
        description: 'Missing c',
      },
      {
        s: 'cba',
        expected: 1,
        description: 'Reverse order',
      },
      {
        s: 'cab',
        expected: 1,
        description: 'Different order',
      },

      // More complex
      {
        s: 'abcabcabc',
        expected: 28,
        description: 'Three repetitions',
      },
      {
        s: 'aaabbbccc',
        expected: 9,
        description: 'Grouped characters',
      },
      {
        s: 'abccba',
        expected: 7,
        description: 'Palindrome',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { s, expected, description } = testCases[i];
      const result = numberOfSubstrings(s);
      const status = result === expected ? '✅ PASS' : '❌ FAIL';

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: s = "${s}"`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log('═'.repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log('🎉 All tests passed! Brute Force samajh aa gaya! 🚀');
      console.log('📊 Complexity: Time O(n²), Space O(1)');
      console.log('\n💡 Key Insight: Once valid, ALL extensions are valid!');
      console.log('💡 Optimization: count += (n - j) and break');
      console.log('⚠️  Note: Sliding Window / Last Index is O(n) - more optimal!');
    }
  }
}

// Execute tests
NumberOfSubstringsContainingAllThreeBruteForce.runTests();