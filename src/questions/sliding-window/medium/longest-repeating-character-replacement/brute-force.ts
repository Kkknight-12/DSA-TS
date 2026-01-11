/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LONGEST REPEATING CHARACTER REPLACEMENT - BRUTE FORCE
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
 * Approach: Brute Force - Check ALL possible substrings
 * - For each starting position i
 * - Try all ending positions j (from i to end)
 * - Track character frequencies and maxFreq
 * - If (windowSize - maxFreq) <= k, update maxLength
 *
 * Time Complexity: O(n²) - nested loops
 * Space Complexity: O(26) = O(1) - fixed size array for char counts
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace LongestRepeatingCharReplacementBruteForce {
  /**
   * Find longest substring with at most k replacements - BRUTE FORCE
   *
   * @param s - Input string (uppercase letters only)
   * @param k - Maximum number of character replacements allowed
   * @returns Length of longest valid substring
   */
  function characterReplacement(s: string, k: number): number {
    let maxLength = 0;

    // ═══════════════════════════════════════════════════════════════
    // OUTER LOOP: Try each starting position
    // ═══════════════════════════════════════════════════════════════

    for (let i = 0; i < s.length; i++) {
      // Array to count character frequencies (A-Z = 26 chars)
      // Reset for each new starting position
      // Index 0 = 'A', Index 1 = 'B', ..., Index 25 = 'Z'
      const charCount: number[] = new Array(26).fill(0);

      // Track max frequency of any character in current window
      let maxFreq = 0;

      // ═══════════════════════════════════════════════════════════════
      // INNER LOOP: Try each ending position
      // ═══════════════════════════════════════════════════════════════

      for (let j = i; j < s.length; j++) {
        // ─────────────────────────────────────────────────────────────
        // STEP 1: Add current character to window
        // ─────────────────────────────────────────────────────────────
        // Convert char to index: 'A' → 0, 'B' → 1, etc.
        const charIndex = s.charCodeAt(j) - "A".charCodeAt(0);
        charCount[charIndex]++;

        // ─────────────────────────────────────────────────────────────
        // STEP 2: Update maxFreq
        // ─────────────────────────────────────────────────────────────
        // Track the highest frequency of any single character
        // WHY? We keep this character and change all others
        maxFreq = Math.max(maxFreq, charCount[charIndex]);

        // ─────────────────────────────────────────────────────────────
        // STEP 3: Calculate characters to change
        // ─────────────────────────────────────────────────────────────
        const windowSize = j - i + 1;
        const charsToChange = windowSize - maxFreq;

        // ─────────────────────────────────────────────────────────────
        // STEP 4: Check if window is valid
        // ─────────────────────────────────────────────────────────────
        //
        // ┌────────────────────────────────────────────────────────────┐
        // │  THE MAGIC FORMULA:                                        │
        // │                                                            │
        // │  charsToChange = windowSize - maxFreq                      │
        // │                                                            │
        // │  Example: Window "AABAB" (size = 5)                        │
        // │           Counts: A=3, B=2                                 │
        // │           maxFreq = 3 (char 'A')                           │
        // │           charsToChange = 5 - 3 = 2                        │
        // │                                                            │
        // │  We keep 3 A's, change 2 B's to A's → "AAAAA"              │
        // │  If k >= 2, this window is VALID!                          │
        // └────────────────────────────────────────────────────────────┘

        if (charsToChange <= k) {
          // Valid window! We can make all chars same with ≤k changes
          maxLength = Math.max(maxLength, windowSize);
        }

        // ─────────────────────────────────────────────────────────────
        // CAN WE BREAK EARLY? YES! (Optimization)
        // ─────────────────────────────────────────────────────────────
        //
        // Once window becomes invalid (charsToChange > k), can it
        // become valid again by adding more characters?
        //
        // Analysis: When we add a character:
        //   - windowSize increases by 1 (always)
        //   - maxFreq increases by at most 1 (if we add the max char)
        //
        // charsToChange = windowSize - maxFreq
        //
        // Case 1: Add the most frequent char
        //   windowSize: +1, maxFreq: +1 → charsToChange: unchanged
        //
        // Case 2: Add any other char
        //   windowSize: +1, maxFreq: +0 → charsToChange: +1
        //
        // CONCLUSION: charsToChange can only STAY SAME or INCREASE!
        //             It can NEVER decrease!
        //
        // Example: s = "AAABBB", k = 2
        //   j=5: "AAABBB" → maxFreq=3, change=6-3=3 > 2 ❌
        //   j=6: "AAABBBB" → maxFreq=4, change=7-4=3 > 2 ❌ (still invalid!)
        //
        // So YES, we CAN break early when window becomes invalid!
        // (But this version doesn't break - see alternatives below)
      }
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: s = "ABAB", k = 2
   *          Index: 0 1 2 3
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 0 (Start from index 0)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=0: char='A', charCount={A:1}, maxFreq=1
   *      windowSize=1, charsToChange=1-1=0, 0<=2 ✅
   *      maxLength = max(0, 1) = 1
   *      Window: [A]
   *
   * j=1: char='B', charCount={A:1, B:1}, maxFreq=1
   *      windowSize=2, charsToChange=2-1=1, 1<=2 ✅
   *      maxLength = max(1, 2) = 2
   *      Window: [AB]
   *
   * j=2: char='A', charCount={A:2, B:1}, maxFreq=2
   *      windowSize=3, charsToChange=3-2=1, 1<=2 ✅
   *      maxLength = max(2, 3) = 3
   *      Window: [ABA]
   *
   * j=3: char='B', charCount={A:2, B:2}, maxFreq=2
   *      windowSize=4, charsToChange=4-2=2, 2<=2 ✅
   *      maxLength = max(3, 4) = 4 ⭐
   *      Window: [ABAB]
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 1 (Start from index 1)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=1: charCount={B:1}, maxFreq=1, size=1, change=0 ✅ → maxLength=4
   * j=2: charCount={B:1,A:1}, maxFreq=1, size=2, change=1 ✅ → maxLength=4
   * j=3: charCount={B:2,A:1}, maxFreq=2, size=3, change=1 ✅ → maxLength=4
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 2, 3 (Similar analysis, no improvement)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * FINAL RESULT: maxLength = 4
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN 2: s = "AABABBA", k = 1
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * i = 0:
   *   j=0: "A" → maxFreq=1, change=0 ✅ → maxLength=1
   *   j=1: "AA" → maxFreq=2, change=0 ✅ → maxLength=2
   *   j=2: "AAB" → maxFreq=2, change=1 ✅ → maxLength=3
   *   j=3: "AABA" → maxFreq=3, change=1 ✅ → maxLength=4 ⭐
   *   j=4: "AABAB" → maxFreq=3, change=2 > 1 ❌
   *   j=5: "AABABB" → maxFreq=3, change=3 > 1 ❌
   *   j=6: "AABABBA" → maxFreq=4, change=3 > 1 ❌
   *
   * i = 1:
   *   j=1: "A" → change=0 ✅ → maxLength=4
   *   j=2: "AB" → change=1 ✅ → maxLength=4
   *   j=3: "ABA" → change=1 ✅ → maxLength=4
   *   j=4: "ABAB" → change=2 > 1 ❌
   *   ...
   *
   * i = 3:
   *   j=3: "A" → change=0 ✅
   *   j=4: "AB" → change=1 ✅
   *   j=5: "ABB" → change=1 ✅
   *   j=6: "ABBA" → maxFreq=2, change=2 > 1 ❌
   *
   * i = 4:
   *   j=4: "B" → change=0 ✅
   *   j=5: "BB" → change=0 ✅
   *   j=6: "BBA" → change=1 ✅ → maxLength=4
   *
   *   Actually wait, let me recalculate i=4:
   *   j=4: "B" → {B:1}, maxFreq=1, size=1, change=0 ✅
   *   j=5: "BB" → {B:2}, maxFreq=2, size=2, change=0 ✅
   *   j=6: "BBA" → {B:2,A:1}, maxFreq=2, size=3, change=1 ✅
   *
   * Hmm, we also found window of size 4 at i=0, j=3: "AABA"
   * Change 1 'B' to 'A' → "AAAA" ✅
   *
   * FINAL RESULT: maxLength = 4
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(n²)?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Outer loop: n starting positions           → O(n)
   * Inner loop: up to n ending positions each  → O(n)
   *                                            ─────────
   * Total:                                       O(n²)
   *
   * Note: We CAN break early here (see bruteForceWithObject and bruteForceWithMap)
   * Once charsToChange > k, it can never decrease - only stay same or increase!
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
  // ALTERNATIVE 1: BRUTE FORCE WITH OBJECT (with break optimization)
  // ═══════════════════════════════════════════════════════════════════════════════
  //
  // Uses JavaScript Object instead of Array for character counts
  // Includes break optimization when window becomes invalid
  //
  // WHY OBJECT?
  // - More readable: charCount['A'] vs charCount[0]
  // - Dynamic: Only stores characters that exist
  // - Slightly slower than Array (hash lookups vs direct index)
  //
  // ═══════════════════════════════════════════════════════════════════════════════

  export function bruteForceWithObject(s: string, k: number): number {
    let maxLength = 0;

    for (let i = 0; i < s.length; i++) {
      // Object to count character frequencies
      // Key = character, Value = count
      const charCount: { [key: string]: number } = {};
      let maxFreq = 0;

      for (let j = i; j < s.length; j++) {
        // Add current character to count
        // If doesn't exist, initialize to 0 first
        const char = s[j];
        charCount[char] = (charCount[char] || 0) + 1;

        // Update maxFreq
        maxFreq = Math.max(maxFreq, charCount[char]);

        // Calculate characters to change
        const windowSize = j - i + 1;
        const charsToChange = windowSize - maxFreq;

        // Check validity
        if (charsToChange <= k) {
          maxLength = Math.max(maxLength, windowSize);
        } else {
          // ─────────────────────────────────────────────────────────────
          // BREAK OPTIMIZATION
          // ─────────────────────────────────────────────────────────────
          // Once invalid, adding more chars won't help!
          //
          // Proof: charsToChange = windowSize - maxFreq
          //   - Adding char: windowSize += 1
          //   - maxFreq increases by at most 1
          //   - So charsToChange stays same or increases
          //   - It can NEVER decrease!
          //
          // Therefore, break and try next starting position
          // ─────────────────────────────────────────────────────────────
          break;
        }
      }
    }

    return maxLength;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // ALTERNATIVE 2: BRUTE FORCE WITH MAP (with break optimization)
  // ═══════════════════════════════════════════════════════════════════════════════
  //
  // Uses JavaScript Map instead of Array for character counts
  // Includes break optimization when window becomes invalid
  //
  // WHY MAP?
  // - Type-safe: Map<string, number> is explicit
  // - Methods: .get(), .set(), .has() are clear
  // - Iteration order guaranteed (insertion order)
  // - Can use any key type (not just strings)
  //
  // ═══════════════════════════════════════════════════════════════════════════════

  export function bruteForceWithMap(s: string, k: number): number {
    let maxLength = 0;

    for (let i = 0; i < s.length; i++) {
      // Map to count character frequencies
      const charCount: Map<string, number> = new Map();
      let maxFreq = 0;

      for (let j = i; j < s.length; j++) {
        // Add current character to count
        const char = s[j];
        const newCount = (charCount.get(char) || 0) + 1;
        charCount.set(char, newCount);

        // Update maxFreq
        maxFreq = Math.max(maxFreq, newCount);

        // Calculate characters to change
        const windowSize = j - i + 1;
        const charsToChange = windowSize - maxFreq;

        // Check validity
        if (charsToChange <= k) {
          maxLength = Math.max(maxLength, windowSize);
        } else {
          // BREAK: Window invalid, can't become valid by extending
          break;
        }
      }
    }

    return maxLength;
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // COMPARISON: Array vs Object vs Map
  // ═══════════════════════════════════════════════════════════════════════════════
  //
  // ┌──────────────┬────────────────────┬────────────────────┬────────────────────┐
  // │   Aspect     │      Array         │      Object        │       Map          │
  // ├──────────────┼────────────────────┼────────────────────┼────────────────────┤
  // │ Access       │ charCount[0]       │ charCount['A']     │ charCount.get('A') │
  // │ Update       │ charCount[0]++     │ charCount['A']++   │ charCount.set(...) │
  // │ Speed        │ Fastest (direct)   │ Fast (hash)        │ Fast (hash)        │
  // │ Memory       │ Fixed 26 slots     │ Dynamic            │ Dynamic            │
  // │ Readability  │ Need index calc    │ Clear keys         │ Clear methods      │
  // │ Type Safety  │ number[]           │ { [k]: number }    │ Map<string,number> │
  // └──────────────┴────────────────────┴────────────────────┴────────────────────┘
  //
  // For this problem (uppercase A-Z only):
  // - Array is slightly faster (no hashing needed)
  // - Object/Map more readable
  // - All three work fine!
  //
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Longest Repeating Char Replacement - BRUTE FORCE\n");
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
      console.log("🎉 All tests passed! Brute Force samajh aa gaya! 🚀");
      console.log("📊 Complexity: Time O(n²), Space O(26) = O(1)");
      console.log("\n💡 Key Formula: charsToChange = windowSize - maxFreq");
      console.log("⚠️  Note: Sliding Window is O(n) - more optimal!");
    }

    // ═══════════════════════════════════════════════════════════════
    // TEST ALTERNATIVE IMPLEMENTATIONS
    // ═══════════════════════════════════════════════════════════════
    console.log("\n" + "═".repeat(60));
    console.log("🧪 Testing Alternative Implementations\n");

    let allAlternativesPass = true;

    for (const testCase of testCases) {
      const { s, k, expected } = testCase;

      // Test bruteForceWithObject
      const resultObject = bruteForceWithObject(s, k);
      if (resultObject !== expected) {
        console.log(`❌ bruteForceWithObject FAIL: s="${s}", k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${resultObject}`);
        allAlternativesPass = false;
      }

      // Test bruteForceWithMap
      const resultMap = bruteForceWithMap(s, k);
      if (resultMap !== expected) {
        console.log(`❌ bruteForceWithMap FAIL: s="${s}", k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${resultMap}`);
        allAlternativesPass = false;
      }
    }

    if (allAlternativesPass) {
      console.log("✅ bruteForceWithObject: All 12 tests passed!");
      console.log("✅ bruteForceWithMap: All 12 tests passed!");
      console.log("\n🎉 All 3 implementations working correctly!");
    }
  }
}

// Execute tests
LongestRepeatingCharReplacementBruteForce.runTests();