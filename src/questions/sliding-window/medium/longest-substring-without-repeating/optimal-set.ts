/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS - SLIDING WINDOW + SET
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Find length of longest substring with all unique characters
 *
 * Approach: Sliding Window with HashSet
 * - Maintain window [left, right] with all unique characters
 * - EXPAND: Move right, add character to set
 * - SHRINK: If duplicate, remove from left until valid
 * - Track maximum window size
 *
 * Time Complexity: O(n) - each character added/removed at most once
 * Space Complexity: O(min(n, m)) - where m = character set size
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace LongestSubstringOptimalSet {
  /**
   * Longest substring without repeating characters using Sliding Window + Set
   *
   * @param s - Input string
   * @returns Length of longest substring with unique characters
   *
   * ALGORITHM:
   * 1. Use Set to track characters in current window
   * 2. Expand window by moving right pointer
   * 3. If duplicate found, shrink window from left until valid
   * 4. Update maxLength after each expansion
   */
  function lengthOfLongestSubstring(s: string): number {
    // Edge Case: Empty string
    // WHY: No characters means no substring
    if (s.length === 0) return 0;

    // Set to track characters in current window
    // WHY: O(1) lookup to check for duplicates
    const charSet: Set<string> = new Set();

    // Two pointers for sliding window
    // left = start of window, right = end of window
    let left = 0;

    // Track the maximum length found
    let maxLength = 0;

    // Iterate through string with right pointer
    // WHY: right pointer expands the window
    for (let right = 0; right < s.length; right++) {
      const currentChar = s[right];

      // ═══════════════════════════════════════════════════════════════
      // SHRINK PHASE: Remove characters until no duplicate
      // ═══════════════════════════════════════════════════════════════
      // WHY: If currentChar already in set, window is invalid
      // We must shrink from left until currentChar is removed
      while (charSet.has(currentChar)) {
        // Remove leftmost character from set
        charSet.delete(s[left]);
        // Move left pointer forward (shrink window)
        left++;
      }

      // ═══════════════════════════════════════════════════════════════
      // EXPAND PHASE: Add current character to window
      // ═══════════════════════════════════════════════════════════════
      // WHY: After shrinking, window is valid. Add new char.
      charSet.add(currentChar);

      // ═══════════════════════════════════════════════════════════════
      // UPDATE PHASE: Check if this is the longest window
      // ═══════════════════════════════════════════════════════════════
      // Window size = right - left + 1
      // WHY: We want the maximum valid window seen so far
      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: s = "abcabcbb"
   *              01234567
   *
   * Initial State:
   *   left = 0, maxLength = 0, charSet = {}
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION BY ITERATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * right = 0, currentChar = 'a'
   * ─────────────────────────────────────────
   *   SHRINK: 'a' in set? NO → skip while loop
   *   EXPAND: Add 'a' → set = {'a'}
   *   UPDATE: maxLength = max(0, 0-0+1) = 1
   *
   *   Window: [a]bcabcbb
   *            L
   *            R
   *
   * ─────────────────────────────────────────
   * right = 1, currentChar = 'b'
   * ─────────────────────────────────────────
   *   SHRINK: 'b' in set? NO → skip
   *   EXPAND: Add 'b' → set = {'a', 'b'}
   *   UPDATE: maxLength = max(1, 1-0+1) = 2
   *
   *   Window: [ab]cabcbb
   *            L R
   *
   * ─────────────────────────────────────────
   * right = 2, currentChar = 'c'
   * ─────────────────────────────────────────
   *   SHRINK: 'c' in set? NO → skip
   *   EXPAND: Add 'c' → set = {'a', 'b', 'c'}
   *   UPDATE: maxLength = max(2, 2-0+1) = 3 ⭐
   *
   *   Window: [abc]abcbb
   *            L  R
   *
   * ─────────────────────────────────────────
   * right = 3, currentChar = 'a'
   * ─────────────────────────────────────────
   *   SHRINK: 'a' in set? YES!
   *     → Remove s[0]='a', left=1, set = {'b', 'c'}
   *     → 'a' in set? NO → exit while
   *   EXPAND: Add 'a' → set = {'b', 'c', 'a'}
   *   UPDATE: maxLength = max(3, 3-1+1) = 3
   *
   *   Window: a[bca]bcbb
   *             L  R
   *
   * ─────────────────────────────────────────
   * right = 4, currentChar = 'b'
   * ─────────────────────────────────────────
   *   SHRINK: 'b' in set? YES!
   *     → Remove s[1]='b', left=2, set = {'c', 'a'}
   *     → 'b' in set? NO → exit while
   *   EXPAND: Add 'b' → set = {'c', 'a', 'b'}
   *   UPDATE: maxLength = max(3, 4-2+1) = 3
   *
   *   Window: ab[cab]cbb
   *              L  R
   *
   * ─────────────────────────────────────────
   * right = 5, currentChar = 'c'
   * ─────────────────────────────────────────
   *   SHRINK: 'c' in set? YES!
   *     → Remove s[2]='c', left=3, set = {'a', 'b'}
   *     → 'c' in set? NO → exit while
   *   EXPAND: Add 'c' → set = {'a', 'b', 'c'}
   *   UPDATE: maxLength = max(3, 5-3+1) = 3
   *
   *   Window: abc[abc]bb
   *               L  R
   *
   * ─────────────────────────────────────────
   * right = 6, currentChar = 'b'
   * ─────────────────────────────────────────
   *   SHRINK: 'b' in set? YES!
   *     → Remove s[3]='a', left=4, set = {'b', 'c'}
   *     → 'b' in set? YES!
   *     → Remove s[4]='b', left=5, set = {'c'}
   *     → 'b' in set? NO → exit while
   *   EXPAND: Add 'b' → set = {'c', 'b'}
   *   UPDATE: maxLength = max(3, 6-5+1) = 3
   *
   *   Window: abcab[cb]b
   *                 L R
   *
   * ─────────────────────────────────────────
   * right = 7, currentChar = 'b'
   * ─────────────────────────────────────────
   *   SHRINK: 'b' in set? YES!
   *     → Remove s[5]='c', left=6, set = {'b'}
   *     → 'b' in set? YES!
   *     → Remove s[6]='b', left=7, set = {}
   *     → 'b' in set? NO → exit while
   *   EXPAND: Add 'b' → set = {'b'}
   *   UPDATE: maxLength = max(3, 7-7+1) = 3
   *
   *   Window: abcabcb[b]
   *                  LR
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: maxLength = 3
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN 2: s = "pwwkew"
   *                012345
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * right=0, char='p': set={'p'}, window=[p], max=1
   * right=1, char='w': set={'p','w'}, window=[pw], max=2
   * right=2, char='w': 'w' duplicate!
   *   → Remove 'p', left=1, set={'w'}
   *   → 'w' still duplicate!
   *   → Remove 'w', left=2, set={}
   *   → Add 'w', set={'w'}, window=[w], max=2
   * right=3, char='k': set={'w','k'}, window=[wk], max=2
   * right=4, char='e': set={'w','k','e'}, window=[wke], max=3 ⭐
   * right=5, char='w': 'w' duplicate!
   *   → Remove 'w', left=3, set={'k','e'}
   *   → Add 'w', set={'k','e','w'}, window=[kew], max=3
   *
   * RESULT: 3
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY EACH CHARACTER IS PROCESSED AT MOST TWICE (O(n))
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Each character:
   *   - Added to set ONCE (when right pointer reaches it)
   *   - Removed from set AT MOST ONCE (when left pointer passes it)
   *
   * Total operations: 2n = O(n)
   *
   * Visual:
   *   String: a b c a b c b b
   *           ↑             ↑
   *         left moves →  right moves →
   *
   *   left never moves backward
   *   right never moves backward
   *   Both together traverse string once = O(n)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. Empty string: "" → return 0
   * 2. Single char: "a" → return 1
   * 3. All same: "aaaa" → return 1
   * 4. All unique: "abcd" → return 4
   * 5. Duplicate at end: "abcda" → return 4 ("abcd")
   * 6. Spaces: "a b c" → return 3 ("a b" or " b " or "b c")
   * 7. Special chars: "a!@#a" → return 4 ("a!@#")
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Longest Substring - SLIDING WINDOW + SET\n');
    console.log('═'.repeat(60) + '\n');

    const testCases: {
      input: string;
      expected: number;
      description: string;
    }[] = [
      // Basic examples from problem
      {
        input: 'abcabcbb',
        expected: 3,
        description: "Standard case - 'abc' is longest",
      },
      {
        input: 'bbbbb',
        expected: 1,
        description: 'All same characters',
      },
      {
        input: 'pwwkew',
        expected: 3,
        description: "'wke' is longest, not 'pwke' (that's subsequence)",
      },

      // Edge cases
      {
        input: '',
        expected: 0,
        description: 'Empty string',
      },
      {
        input: 'a',
        expected: 1,
        description: 'Single character',
      },
      {
        input: 'ab',
        expected: 2,
        description: 'Two different characters',
      },
      {
        input: 'aa',
        expected: 1,
        description: 'Two same characters',
      },

      // All unique
      {
        input: 'abcdefgh',
        expected: 8,
        description: 'All unique - entire string is answer',
      },

      // Special patterns
      {
        input: 'abba',
        expected: 2,
        description: "Palindrome pattern - 'ab' or 'ba'",
      },
      {
        input: 'dvdf',
        expected: 3,
        description: "Tricky - 'vdf' not 'dvd'",
      },

      // With spaces and special characters
      {
        input: 'a b c',
        expected: 3,
        description: "With spaces - 'a b' or ' b ' or 'b c'",
      },
      {
        input: 'a!@#$%a',
        expected: 6,
        description: "Special characters - 'a!@#$%'",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { input, expected, description } = testCases[i];
      const result = lengthOfLongestSubstring(input);
      const status = result === expected ? '✅ PASS' : '❌ FAIL';

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: "${input}"`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log('═'.repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log('🎉 All tests passed! Sliding Window samajh aa gaya! 🚀');
      console.log('📊 Complexity: Time O(n), Space O(min(n, m))');
    }
  }
}

// Execute tests
LongestSubstringOptimalSet.runTests();