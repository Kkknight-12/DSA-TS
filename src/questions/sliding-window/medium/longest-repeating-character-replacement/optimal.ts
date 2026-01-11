/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LONGEST REPEATING CHARACTER REPLACEMENT - SLIDING WINDOW (OPTIMAL)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Find longest substring where you can change at most k chars
 *          to make all characters the same.
 *
 * Key Insight: THE MAGIC FORMULA!
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   Characters to change = WindowSize - MaxFreqCount
 *
 *   If (WindowSize - MaxFreqCount) <= k → VALID window!
 *
 *   WHY? We keep the most frequent character and change all others.
 *        If "others" count <= k, we can make all chars same!
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Sliding Window Approach:
 * - Expand window by moving right pointer
 * - Track character frequencies and maxFreq
 * - If (windowSize - maxFreq) > k, shrink from left
 * - Track maximum valid window size
 *
 * Time Complexity: O(n) - each element visited at most twice
 * Space Complexity: O(26) = O(1) - fixed size array for char counts
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace LongestRepeatingCharReplacementOptimal {
  /**
   * Find longest substring with at most k replacements - SLIDING WINDOW
   *
   * @param s - Input string (uppercase letters only)
   * @param k - Maximum number of character replacements allowed
   * @returns Length of longest valid substring
   */
  function characterReplacement(s: string, k: number): number {
    // Array to count character frequencies (A-Z = 26 chars)
    // Index 0 = 'A', Index 1 = 'B', ..., Index 25 = 'Z'
    const charCount: number[] = new Array(26).fill(0);

    let left = 0; // Left pointer of sliding window
    let maxFreq = 0; // Max frequency of any single character in window
    let maxLength = 0; // Result: longest valid window

    // ═══════════════════════════════════════════════════════════════
    // SLIDING WINDOW: Expand with right pointer
    // ═══════════════════════════════════════════════════════════════

    for (let right = 0; right < s.length; right++) {
      // ─────────────────────────────────────────────────────────────
      // STEP 1: EXPAND - Add current character to window
      // ─────────────────────────────────────────────────────────────
      const charIndex = s.charCodeAt(right) - "A".charCodeAt(0);
      charCount[charIndex]++;

      // ─────────────────────────────────────────────────────────────
      // STEP 2: Update maxFreq
      // ─────────────────────────────────────────────────────────────
      // Track the highest frequency of any single character
      // WHY? We keep this character and change all others
      maxFreq = Math.max(maxFreq, charCount[charIndex]);

      // ─────────────────────────────────────────────────────────────
      // STEP 3: Calculate window validity
      // ─────────────────────────────────────────────────────────────
      const windowSize = right - left + 1;
      const charsToChange = windowSize - maxFreq;

      // ─────────────────────────────────────────────────────────────
      // STEP 4: SHRINK if window is invalid
      // ─────────────────────────────────────────────────────────────
      //
      // ┌────────────────────────────────────────────────────────────┐
      // │  IMPORTANT: We use IF, not WHILE!                          │
      // │                                                            │
      // │  WHY? Because of the maxFreq optimization (explained below)│
      // │  We only shrink by 1 to maintain window size               │
      // └────────────────────────────────────────────────────────────┘

      if (charsToChange > k) {
        // Remove left character from window
        const leftCharIndex = s.charCodeAt(left) - "A".charCodeAt(0);
        charCount[leftCharIndex]--;
        left++;

        // ─────────────────────────────────────────────────────────────
        // CRITICAL: We do NOT recalculate maxFreq!
        // ─────────────────────────────────────────────────────────────
        //
        // ┌────────────────────────────────────────────────────────────┐
        // │  THE MAXFREQ OPTIMIZATION                                  │
        // │                                                            │
        // │  Q: When we remove a character, shouldn't maxFreq decrease?│
        // │                                                            │
        // │  A: We DON'T recalculate maxFreq, and here's why:          │
        // │                                                            │
        // │  1. We only care about finding LONGER windows              │
        // │                                                            │
        // │  2. To find a longer window, we need a HIGHER maxFreq      │
        // │     (since windowSize - maxFreq <= k must hold)            │
        // │                                                            │
        // │  3. If actual maxFreq decreases, we WON'T find longer      │
        // │     window anyway! So no point recalculating.              │
        // │                                                            │
        // │  4. By keeping maxFreq as "max ever seen", we might        │
        // │     temporarily have invalid windows, but we never         │
        // │     update maxLength unless we find something better.      │
        // │                                                            │
        // │  This keeps time complexity O(n) instead of O(26n)!        │
        // └────────────────────────────────────────────────────────────┘
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 5: Update maximum length
      // ─────────────────────────────────────────────────────────────
      // Current window size is always valid or just became valid
      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * ALTERNATIVE: Using WHILE loop (more intuitive but same result)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * This version uses WHILE to shrink until valid.
   * It's more intuitive but functionally equivalent.
   *
   * With the maxFreq optimization, we typically only shrink once anyway,
   * so IF and WHILE behave the same in practice.
   */
  function characterReplacementWithWhile(s: string, k: number): number {
    const charCount: number[] = new Array(26).fill(0);
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
      // EXPAND: Add current character
      const charIndex = s.charCodeAt(right) - "A".charCodeAt(0);
      charCount[charIndex]++;
      maxFreq = Math.max(maxFreq, charCount[charIndex]);

      // SHRINK: While window is invalid
      // (In practice, this runs at most once due to maxFreq optimization)
      while (right - left + 1 - maxFreq > k) {
        const leftCharIndex = s.charCodeAt(left) - "A".charCodeAt(0);
        charCount[leftCharIndex]--;
        left++;
      }

      // UPDATE: Track maximum
      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * ALTERNATIVE: Using Map (more readable)
   * ═══════════════════════════════════════════════════════════════════════════════
   */
  function characterReplacementWithMap(s: string, k: number): number {
    const charCount: Map<string, number> = new Map();
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
      // EXPAND: Add current character
      const char = s[right];
      const newCount = (charCount.get(char) || 0) + 1;
      charCount.set(char, newCount);
      maxFreq = Math.max(maxFreq, newCount);

      // SHRINK: If window is invalid
      if (right - left + 1 - maxFreq > k) {
        const leftChar = s[left];
        charCount.set(leftChar, charCount.get(leftChar)! - 1);
        left++;
      }

      // UPDATE: Track maximum
      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: s = "AABABBA", k = 1
   *          Index: 0 1 2 3 4 5 6
   *
   * Initial: left = 0, maxFreq = 0, maxLength = 0, charCount = {}
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * right = 0, char = 'A'
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   EXPAND: charCount = {A: 1}
   *   maxFreq = max(0, 1) = 1
   *   windowSize = 0 - 0 + 1 = 1
   *   charsToChange = 1 - 1 = 0 ≤ k(1) ✅ No shrink needed
   *   maxLength = max(0, 1) = 1
   *
   *   Window: [A]ABABBA
   *            L
   *            R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * right = 1, char = 'A'
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   EXPAND: charCount = {A: 2}
   *   maxFreq = max(1, 2) = 2
   *   windowSize = 2
   *   charsToChange = 2 - 2 = 0 ≤ 1 ✅
   *   maxLength = max(1, 2) = 2
   *
   *   Window: [AA]BABBA
   *            L R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * right = 2, char = 'B'
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   EXPAND: charCount = {A: 2, B: 1}
   *   maxFreq = max(2, 1) = 2
   *   windowSize = 3
   *   charsToChange = 3 - 2 = 1 ≤ 1 ✅
   *   maxLength = max(2, 3) = 3
   *
   *   Window: [AAB]ABBA
   *            L  R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * right = 3, char = 'A'
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   EXPAND: charCount = {A: 3, B: 1}
   *   maxFreq = max(2, 3) = 3
   *   windowSize = 4
   *   charsToChange = 4 - 3 = 1 ≤ 1 ✅
   *   maxLength = max(3, 4) = 4 ⭐
   *
   *   Window: [AABA]BBA
   *            L   R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * right = 4, char = 'B'
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   EXPAND: charCount = {A: 3, B: 2}
   *   maxFreq = max(3, 2) = 3
   *   windowSize = 5
   *   charsToChange = 5 - 3 = 2 > 1 ❌ Must shrink!
   *
   *   SHRINK:
   *     Remove s[left=0] = 'A': charCount = {A: 2, B: 2}
   *     left = 1
   *     windowSize = 4
   *
   *     ┌────────────────────────────────────────────────────────────┐
   *     │  NOTE: maxFreq stays 3!                                    │
   *     │  We DON'T recalculate it.                                  │
   *     │  The actual maxFreq in window is now 2, but we keep 3.     │
   *     │  This is the optimization - we only care about finding     │
   *     │  LONGER windows, which need HIGHER maxFreq anyway.         │
   *     └────────────────────────────────────────────────────────────┘
   *
   *   maxLength = max(4, 4) = 4
   *
   *   Window: A[ABAB]BA
   *             L   R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * right = 5, char = 'B'
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   EXPAND: charCount = {A: 2, B: 3}
   *   maxFreq = max(3, 3) = 3
   *   windowSize = 5
   *   charsToChange = 5 - 3 = 2 > 1 ❌ Must shrink!
   *
   *   SHRINK:
   *     Remove s[left=1] = 'A': charCount = {A: 1, B: 3}
   *     left = 2
   *     windowSize = 4
   *
   *   maxLength = max(4, 4) = 4
   *
   *   Window: AA[BABB]A
   *              L   R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * right = 6, char = 'A'
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   EXPAND: charCount = {A: 2, B: 3}
   *   maxFreq = max(3, 2) = 3
   *   windowSize = 5
   *   charsToChange = 5 - 3 = 2 > 1 ❌ Must shrink!
   *
   *   SHRINK:
   *     Remove s[left=2] = 'B': charCount = {A: 2, B: 2}
   *     left = 3
   *     windowSize = 4
   *
   *   maxLength = max(4, 4) = 4
   *
   *   Window: AAB[ABBA]
   *               L   R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DONE! Answer: 4
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Best window found: "AABA" at indices 0-3
   * With k=1, change 1 'B' to 'A' → "AAAA"
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(n)?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * - Right pointer: moves from 0 to n-1 → O(n)
   * - Left pointer: moves from 0 to at most n-1 → O(n)
   * - Each pointer moves forward only, never backward
   * - Total work: O(n) + O(n) = O(n)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY IF INSTEAD OF WHILE?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Because of maxFreq optimization:
   *
   * 1. We never decrease maxFreq when shrinking
   * 2. So if window was invalid (windowSize - maxFreq > k)
   * 3. After removing ONE element: windowSize decreases by 1
   * 4. charsToChange = (windowSize-1) - maxFreq = original - 1
   * 5. If original was k+1, now it's k → VALID!
   *
   * So we only ever need to shrink by 1 element at a time.
   * WHILE would work too, but IF is sufficient and clearer.
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * COMPARISON WITH BRUTE FORCE
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌─────────────────┬──────────────────────┬──────────────────────┐
   * │    Aspect       │     Brute Force      │   Sliding Window     │
   * ├─────────────────┼──────────────────────┼──────────────────────┤
   * │ Time            │ O(n²)                │ O(n)                 │
   * │ Space           │ O(26) = O(1)         │ O(26) = O(1)         │
   * │ Approach        │ Try all substrings   │ Expand/Shrink window │
   * │ Recalculation   │ New counts each i    │ Incremental update   │
   * └─────────────────┴──────────────────────┴──────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. All same chars: "AAAA", k=2 → Answer = 4 (no changes needed)
   * 2. k = 0: "ABAB", k=0 → Answer = 1 (longest repeating without changes)
   * 3. k >= length: "ABCD", k=4 → Answer = 4 (can change all)
   * 4. Single char: "A", k=1 → Answer = 1
   * 5. Two chars: "AB", k=1 → Answer = 2 (change one to match other)
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      "🧪 Testing Longest Repeating Char Replacement - SLIDING WINDOW\n"
    );
    console.log("═".repeat(60) + "\n");

    const testCases: {
      s: string;
      k: number;
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        s: "ABAB",
        k: 2,
        expected: 4,
        description: "Example 1 - change 2 chars",
      },
      {
        s: "AABABBA",
        k: 1,
        expected: 4,
        description: "Example 2 - 'AABA' or 'BBBB' after change",
      },

      // Edge cases
      {
        s: "A",
        k: 0,
        expected: 1,
        description: "Single character",
      },
      {
        s: "A",
        k: 1,
        expected: 1,
        description: "Single character with k=1",
      },
      {
        s: "AB",
        k: 1,
        expected: 2,
        description: "Two different chars, k=1",
      },
      {
        s: "AB",
        k: 0,
        expected: 1,
        description: "Two different chars, k=0",
      },

      // All same characters
      {
        s: "AAAA",
        k: 2,
        expected: 4,
        description: "All same chars - no changes needed",
      },
      {
        s: "AAAA",
        k: 0,
        expected: 4,
        description: "All same chars with k=0",
      },

      // k = 0 cases
      {
        s: "AABBBCC",
        k: 0,
        expected: 3,
        description: "k=0 - find longest repeating (BBB)",
      },

      // k >= length
      {
        s: "ABCD",
        k: 4,
        expected: 4,
        description: "k >= length - can change all",
      },

      // More complex cases
      {
        s: "ABBB",
        k: 2,
        expected: 4,
        description: "Change A to B → BBBB",
      },
      {
        s: "BAAAB",
        k: 2,
        expected: 5,
        description: "Change 2 B's to A's → AAAAA",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { s, k, expected, description } = testCases[i];
      const result = characterReplacement(s, k);
      const status = result === expected ? "✅ PASS" : "❌ FAIL";

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: s = "${s}", k = ${k}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log("═".repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log("🎉 All tests passed! Sliding Window samajh aa gaya! 🚀");
      console.log("📊 Complexity: Time O(n), Space O(26) = O(1)");
      console.log("\n💡 Key Formula: charsToChange = windowSize - maxFreq");
      console.log("💡 Key Optimization: Don't recalculate maxFreq when shrinking!");
    }

    // ═══════════════════════════════════════════════════════════════
    // TEST ALTERNATIVE IMPLEMENTATIONS
    // ═══════════════════════════════════════════════════════════════
    console.log("\n" + "═".repeat(60));
    console.log("🧪 Testing Alternative Implementations\n");

    let allAlternativesPass = true;

    for (const testCase of testCases) {
      const { s, k, expected } = testCase;

      // Test characterReplacementWithWhile
      const resultWhile = characterReplacementWithWhile(s, k);
      if (resultWhile !== expected) {
        console.log(`❌ characterReplacementWithWhile FAIL: s="${s}", k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${resultWhile}`);
        allAlternativesPass = false;
      }

      // Test characterReplacementWithMap
      const resultMap = characterReplacementWithMap(s, k);
      if (resultMap !== expected) {
        console.log(`❌ characterReplacementWithMap FAIL: s="${s}", k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${resultMap}`);
        allAlternativesPass = false;
      }
    }

    if (allAlternativesPass) {
      console.log("✅ characterReplacementWithWhile: All 12 tests passed!");
      console.log("✅ characterReplacementWithMap: All 12 tests passed!");
      console.log("\n🎉 All 3 implementations working correctly!");
    }
  }
}

// Execute tests
LongestRepeatingCharReplacementOptimal.runTests();