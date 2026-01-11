/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS - SLIDING WINDOW + HASHMAP
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Find length of longest substring with all unique characters
 *
 * Approach: Sliding Window with HashMap (Jump Optimization)
 * - HashMap stores: character → last seen INDEX
 * - When duplicate found, JUMP left pointer directly (no while loop needed!)
 * - Key insight: We can skip all characters before the duplicate
 *
 * Time Complexity: O(n) - single pass through string
 * Space Complexity: O(min(n, m)) - where m = character set size
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace LongestSubstringOptimalHashMap {
  /**
   * Longest substring without repeating characters using Sliding Window + HashMap
   *
   * @param s - Input string
   * @returns Length of longest substring with unique characters
   *
   * ALGORITHM:
   * 1. HashMap stores each character's last seen index
   * 2. When we see a character again:
   *    - Check if it's within current window (index >= left)
   *    - If yes, JUMP left to (previous index + 1)
   * 3. Update character's index in map
   * 4. Update maxLength
   *
   * KEY DIFFERENCE FROM SET APPROACH:
   * ─────────────────────────────────────────────────────────────────
   * Set:     while (set.has(char)) { remove s[left]; left++; }
   *          → Removes one by one until valid
   *
   * HashMap: if (map.get(char) >= left) { left = map.get(char) + 1; }
   *          → Jumps directly past the duplicate!
   * ─────────────────────────────────────────────────────────────────
   */
  function lengthOfLongestSubstring(s: string): number {
    // Edge Case: Empty string
    // WHY: No characters means no substring
    if (s.length === 0) return 0;

    // ═══════════════════════════════════════════════════════════════
    // HASHMAP: What does it store?
    // ═══════════════════════════════════════════════════════════════
    //
    // Map stores: character → LAST SEEN INDEX
    //
    // CRITICAL DIFFERENCE FROM SET:
    // ┌────────────────────────────────────────────────────────────┐
    // │  SET:     Stores ONLY characters in current window         │
    // │           When we shrink, we REMOVE characters from set    │
    // │           set.has(char) tells us if char is in window      │
    // │                                                            │
    // │  HASHMAP: Stores ALL characters ever seen (never removes!) │
    // │           Map just stores "last time I saw this char"      │
    // │           We use "index >= left" to check if in window     │
    // └────────────────────────────────────────────────────────────┘
    //
    // WHY never remove from HashMap?
    // → We don't need to! The ">= left" check tells us if relevant
    // → Simpler code, no while loop needed
    //
    const charIndexMap: Map<string, number> = new Map();

    // Left pointer of sliding window
    let left = 0;

    // Track the maximum length found
    let maxLength = 0;

    // Iterate through string with right pointer
    for (let right = 0; right < s.length; right++) {
      const currentChar = s[right];

      // ═══════════════════════════════════════════════════════════════
      // CHECK FOR DUPLICATE IN CURRENT WINDOW
      // ═══════════════════════════════════════════════════════════════
      //
      // Two conditions must be true for duplicate:
      // 1. Character exists in map (we've seen it before)
      // 2. Its index >= left (it's within current window)
      //
      // WHY condition 2? (>= left check)
      // ─────────────────────────────────────────────────────────────
      //
      // HashMap stores ALL characters ever seen, NOT just window chars!
      // So we need to check: "Is this old occurrence inside my window?"
      //
      // Example: "abba"
      //           0123
      //
      // right=0, char='a':
      //   'a' not in map → just add
      //   map = {'a': 0}, left = 0
      //   Window: [a]bba
      //
      // right=1, char='b':
      //   'b' not in map → just add
      //   map = {'a': 0, 'b': 1}, left = 0
      //   Window: [ab]ba
      //
      // right=2, char='b':
      //   'b' in map at index 1
      //   Is 1 >= left(0)? YES → duplicate IN window!
      //   JUMP: left = 1 + 1 = 2 (move past the old 'b')
      //   Update: map = {'a': 0, 'b': 2}  ← Note: 'a' still in map!
      //   Window: ab[b]a
      //              L
      //              R
      //
      // right=3, char='a':
      //   'a' in map at index 0
      //   Is 0 >= left(2)? NO! (0 < 2)
      //
      //   ┌────────────────────────────────────────────────────────┐
      //   │  The old 'a' at index 0 is OUTSIDE our window!        │
      //   │  Our window starts at index 2.                        │
      //   │                                                       │
      //   │  String: a  b  b  a                                   │
      //   │  Index:  0  1  2  3                                   │
      //   │          ↑     └──┘                                   │
      //   │       old 'a'  window                                 │
      //   │       (outside)                                       │
      //   │                                                       │
      //   │  So this 'a' is NOT a real duplicate for us!          │
      //   │  We DON'T move left, just update map.                 │
      //   └────────────────────────────────────────────────────────┘
      //
      //   Update: map = {'a': 3, 'b': 2}
      //   Window: ab[ba] → length = 2
      //
      // ─────────────────────────────────────────────────────────────

      if (charIndexMap.has(currentChar)) {
        const lastSeenIndex = charIndexMap.get(currentChar)!;

        // Only jump if the duplicate is WITHIN current window
        // WHY: If it's outside window (lastSeenIndex < left),
        //      it's not a real duplicate for current window
        if (lastSeenIndex >= left) {
          // JUMP: Move left pointer past the duplicate
          // WHY: All characters from old left to lastSeenIndex
          //      are now excluded from window
          left = lastSeenIndex + 1;
        }
      }

      // ═══════════════════════════════════════════════════════════════
      // UPDATE CHARACTER'S INDEX IN MAP
      // ═══════════════════════════════════════════════════════════════
      // WHY: Even if char was outside window, update to current position
      // This ensures we always have the LATEST index
      charIndexMap.set(currentChar, right);

      // ═══════════════════════════════════════════════════════════════
      // UPDATE MAXIMUM LENGTH
      // ═══════════════════════════════════════════════════════════════
      // Window size = right - left + 1
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
   *   left = 0, maxLength = 0, map = {}
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION BY ITERATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────
   * right = 0, currentChar = 'a'
   * ─────────────────────────────────────────
   *   'a' not in map → no jump needed
   *   map.set('a', 0) → map = {'a': 0}
   *   maxLength = max(0, 0-0+1) = 1
   *
   *   Window: [a]bcabcbb
   *            L
   *            R
   *   Map: {'a': 0}
   *
   * ─────────────────────────────────────────
   * right = 1, currentChar = 'b'
   * ─────────────────────────────────────────
   *   'b' not in map → no jump
   *   map = {'a': 0, 'b': 1}
   *   maxLength = max(1, 1-0+1) = 2
   *
   *   Window: [ab]cabcbb
   *            L R
   *
   * ─────────────────────────────────────────
   * right = 2, currentChar = 'c'
   * ─────────────────────────────────────────
   *   'c' not in map → no jump
   *   map = {'a': 0, 'b': 1, 'c': 2}
   *   maxLength = max(2, 2-0+1) = 3 ⭐
   *
   *   Window: [abc]abcbb
   *            L  R
   *
   * ─────────────────────────────────────────
   * right = 3, currentChar = 'a'
   * ─────────────────────────────────────────
   *   'a' in map at index 0
   *   Is 0 >= left(0)? YES → DUPLICATE!
   *   JUMP: left = 0 + 1 = 1
   *
   *   map.set('a', 3) → map = {'a': 3, 'b': 1, 'c': 2}
   *   maxLength = max(3, 3-1+1) = 3
   *
   *   Window: a[bca]bcbb
   *             L  R
   *
   *   ┌─────────────────────────────────────────────┐
   *   │ JUMP OPTIMIZATION:                          │
   *   │ Set approach: while loop removes 'a'        │
   *   │ HashMap: Direct jump to index 1!            │
   *   └─────────────────────────────────────────────┘
   *
   * ─────────────────────────────────────────
   * right = 4, currentChar = 'b'
   * ─────────────────────────────────────────
   *   'b' in map at index 1
   *   Is 1 >= left(1)? YES → DUPLICATE!
   *   JUMP: left = 1 + 1 = 2
   *
   *   map.set('b', 4) → map = {'a': 3, 'b': 4, 'c': 2}
   *   maxLength = max(3, 4-2+1) = 3
   *
   *   Window: ab[cab]cbb
   *              L  R
   *
   * ─────────────────────────────────────────
   * right = 5, currentChar = 'c'
   * ─────────────────────────────────────────
   *   'c' in map at index 2
   *   Is 2 >= left(2)? YES → DUPLICATE!
   *   JUMP: left = 2 + 1 = 3
   *
   *   map.set('c', 5) → map = {'a': 3, 'b': 4, 'c': 5}
   *   maxLength = max(3, 5-3+1) = 3
   *
   *   Window: abc[abc]bb
   *               L  R
   *
   * ─────────────────────────────────────────
   * right = 6, currentChar = 'b'
   * ─────────────────────────────────────────
   *   'b' in map at index 4
   *   Is 4 >= left(3)? YES → DUPLICATE!
   *   JUMP: left = 4 + 1 = 5
   *
   *   map.set('b', 6) → map = {'a': 3, 'b': 6, 'c': 5}
   *   maxLength = max(3, 6-5+1) = 3
   *
   *   Window: abcab[cb]b
   *                 L R
   *
   * ─────────────────────────────────────────
   * right = 7, currentChar = 'b'
   * ─────────────────────────────────────────
   *   'b' in map at index 6
   *   Is 6 >= left(5)? YES → DUPLICATE!
   *   JUMP: left = 6 + 1 = 7
   *
   *   map.set('b', 7) → map = {'a': 3, 'b': 7, 'c': 5}
   *   maxLength = max(3, 7-7+1) = 3
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
   * CRITICAL EDGE CASE: "abba"
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * This example shows why we need: lastSeenIndex >= left
   *
   * String: "abba"
   *          0123
   *
   * ─────────────────────────────────────────
   * right = 0, char = 'a'
   *   Not in map
   *   map = {'a': 0}, left = 0
   *   Window: [a]bba, max = 1
   *
   * ─────────────────────────────────────────
   * right = 1, char = 'b'
   *   Not in map
   *   map = {'a': 0, 'b': 1}, left = 0
   *   Window: [ab]ba, max = 2
   *
   * ─────────────────────────────────────────
   * right = 2, char = 'b'
   *   'b' in map at index 1
   *   Is 1 >= left(0)? YES → DUPLICATE!
   *   JUMP: left = 1 + 1 = 2
   *   map = {'a': 0, 'b': 2}
   *   Window: ab[b]a, max = 2
   *
   * ─────────────────────────────────────────
   * right = 3, char = 'a'
   *   'a' in map at index 0
   *   Is 0 >= left(2)? NO! → NOT a duplicate (outside window)
   *
   *   ┌─────────────────────────────────────────────────────────┐
   *   │ CRUCIAL INSIGHT:                                        │
   *   │                                                         │
   *   │ 'a' is at index 0, but our window starts at index 2    │
   *   │ The old 'a' is OUTSIDE our current window!             │
   *   │                                                         │
   *   │ Visual:                                                 │
   *   │   a  b  b  a                                           │
   *   │   0  1  2  3                                           │
   *   │   ↑        ↑                                           │
   *   │   old 'a'  new 'a'                                     │
   *   │   (outside) (current)                                  │
   *   │      [window]                                          │
   *   │                                                         │
   *   │ We should NOT jump left!                               │
   *   └─────────────────────────────────────────────────────────┘
   *
   *   map.set('a', 3) → map = {'a': 3, 'b': 2}
   *   Window: ab[ba], max = max(2, 3-2+1) = 2
   *
   * RESULT: 2 ("ab" or "ba")
   *
   * WITHOUT the >= left check, we would incorrectly jump and get wrong answer!
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * SET vs HASHMAP COMPARISON
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * String: "abcdefga"
   *          01234567
   *
   * When we see 'a' at index 7:
   *
   * SET APPROACH:
   *   while (set.has('a')):
   *     remove 'a', left = 1 → set = {b,c,d,e,f,g}
   *     'a' not in set anymore → exit
   *   → 1 iteration of while loop
   *
   * HASHMAP APPROACH:
   *   'a' at index 0, 0 >= left(0)? YES
   *   left = 0 + 1 = 1
   *   → Direct jump, no loop!
   *
   * In this case, both do same work. But conceptually:
   * - Set: "Remove until valid"
   * - HashMap: "Jump directly"
   *
   * Both are O(n) overall, but HashMap code is often cleaner.
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. Empty string: "" → return 0
   * 2. Single char: "a" → return 1
   * 3. All same: "aaaa" → return 1 (every char causes jump)
   * 4. All unique: "abcd" → return 4 (no jumps needed)
   * 5. "abba" pattern: → return 2 (tests >= left condition)
   * 6. Spaces/special: "a b a" → return 3 ("a b" or " b " or "b a")
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Longest Substring - SLIDING WINDOW + HASHMAP\n');
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
        description: "'wke' is longest",
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

      // Critical test case for >= left condition
      {
        input: 'abba',
        expected: 2,
        description: 'CRITICAL: Tests >= left condition',
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
        description: 'With spaces',
      },
      {
        input: 'a!@#$%a',
        expected: 6,
        description: 'Special characters',
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
      console.log('🎉 All tests passed! HashMap approach samajh aa gaya! 🚀');
      console.log('📊 Complexity: Time O(n), Space O(min(n, m))');
      console.log('\n💡 Key insight: Direct JUMP instead of while loop!');
    }
  }
}

// Execute tests
LongestSubstringOptimalHashMap.runTests();