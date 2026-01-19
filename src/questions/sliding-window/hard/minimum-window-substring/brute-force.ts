/**
 * MINIMUM WINDOW SUBSTRING - BRUTE FORCE
 * =======================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Sabse simple approach: Try ALL possible substrings of s!
 * - Har substring ke liye check karo ki t ke saare characters present hain ya nahi
 * - Jo valid hai aur sabse chhota hai, woh answer hai
 *
 * ALGORITHM:
 * ──────────
 * 1. For each starting index i (0 to m-1)
 * 2. For each ending index j (i to m-1)
 * 3. Check if substring s[i..j] contains all chars of t (with frequencies)
 * 4. If valid AND smaller than current minimum → update answer
 *
 * OPTIMIZATION:
 * ─────────────
 * - Maintain running frequency map as we expand j
 * - Break early if we found a valid window (no need to expand further for this i)
 *
 * TIME COMPLEXITY: O(m² × n) worst case
 *   - m² substrings to check
 *   - Each validity check can be O(n) in worst case
 *
 * SPACE COMPLEXITY: O(m + n)
 *   - O(n) for required frequency map
 *   - O(m) for window frequency map (at most m unique chars)
 */

namespace MinWindowSubstringBruteForce {
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

    // Edge Case: If t is longer than s, impossible to find valid window
    // WHY: Can't fit more characters than s has
    if (n > m) return "";

    // Edge Case: Empty t means any char is valid (but typically return "")
    if (n === 0) return "";

    // STEP 1: Build frequency map for t
    // This tells us WHAT we need and HOW MANY of each
    // EXAMPLE: t = "ABC" → required = {A:1, B:1, C:1}
    // EXAMPLE: t = "AABC" → required = {A:2, B:1, C:1}
    const required: Map<string, number> = new Map();
    for (const char of t) {
      required.set(char, (required.get(char) || 0) + 1);
    }

    // Track the minimum window found
    let minLength = Infinity;
    let minStart = 0;

    // STEP 2: Try ALL possible substrings
    // Outer loop: starting position
    for (let i = 0; i < m; i++) {
      // Fresh frequency map for each starting position
      // This tracks what we have in current window s[i..j]
      const windowCounts: Map<string, number> = new Map();

      // Inner loop: ending position (expand window)
      for (let j = i; j < m; j++) {
        const char = s[j];

        // Add current character to window
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

        // STEP 3: Check if current window is valid
        // Valid = contains ALL characters of t with ENOUGH frequency
        if (isValidWindow(windowCounts, required)) {
          // Calculate current window length
          const windowLength = j - i + 1;

          // Update minimum if this is smaller
          if (windowLength < minLength) {
            minLength = windowLength;
            minStart = i;
          }

          // OPTIMIZATION: Once we found a valid window starting at i,
          // no need to expand further (it will only get longer)
          // Move to next starting position
          break;
        }
      }
    }

    // STEP 4: Return result
    // If minLength is still Infinity, no valid window was found
    if (minLength === Infinity) {
      return "";
    }

    return s.substring(minStart, minStart + minLength);
  }

  /**
   * Helper function - checks if window contains all required characters
   *
   * @param windowCounts - Frequency map of current window
   * @param required - Frequency map of required characters (from t)
   * @returns true if window is valid, false otherwise
   */
  function isValidWindow(
    windowCounts: Map<string, number>,
    required: Map<string, number>
  ): boolean {
    // Check each required character
    for (const [char, count] of required) {
      // If window doesn't have enough of this character, invalid
      const windowCount = windowCounts.get(char) || 0;
      if (windowCount < count) {
        return false;
      }
    }
    // All characters satisfied
    return true;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: s = "ADOBECODEBANC", t = "ABC"
   *
   * STEP 1: Build required map
   * ──────────────────────────
   * t = "ABC"
   * required = {A:1, B:1, C:1}
   *
   * STEP 2: Try all starting positions
   * ──────────────────────────────────
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=0: Start at 'A'                                                          │
   * │                                                                             │
   * │ j=0: window = "A"                                                          │
   * │   windowCounts = {A:1}                                                     │
   * │   Check: A:1>=1 ✅, B:0>=1 ❌ → INVALID                                    │
   * │                                                                             │
   * │ j=1: window = "AD"                                                         │
   * │   windowCounts = {A:1, D:1}                                                │
   * │   Check: A:1>=1 ✅, B:0>=1 ❌ → INVALID                                    │
   * │                                                                             │
   * │ j=2: window = "ADO"                                                        │
   * │   windowCounts = {A:1, D:1, O:1}                                           │
   * │   Check: A:1>=1 ✅, B:0>=1 ❌ → INVALID                                    │
   * │                                                                             │
   * │ j=3: window = "ADOB"                                                       │
   * │   windowCounts = {A:1, D:1, O:1, B:1}                                      │
   * │   Check: A:1>=1 ✅, B:1>=1 ✅, C:0>=1 ❌ → INVALID                         │
   * │                                                                             │
   * │ j=4: window = "ADOBE"                                                      │
   * │   windowCounts = {A:1, D:1, O:1, B:1, E:1}                                 │
   * │   Check: C:0>=1 ❌ → INVALID                                               │
   * │                                                                             │
   * │ j=5: window = "ADOBEC"                                                     │
   * │   windowCounts = {A:1, D:1, O:1, B:1, E:1, C:1}                            │
   * │   Check: A:1>=1 ✅, B:1>=1 ✅, C:1>=1 ✅ → VALID! ✅                       │
   * │   Length = 6, Update: minLength=6, minStart=0                              │
   * │   BREAK (no need to expand further for i=0)                                │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=1: Start at 'D'                                                          │
   * │                                                                             │
   * │ j=1 to j=5: window = "D", "DO", "DOB", "DOBE", "DOBEC"                     │
   * │   All missing 'A' → INVALID                                                │
   * │                                                                             │
   * │ j=6: window = "DOBECO"                                                     │
   * │   Still missing 'A' → INVALID                                              │
   * │   ... continues until we find 'A' at index 10                              │
   * │                                                                             │
   * │ j=10: window = "DOBECODEBA"                                                │
   * │   windowCounts has A:1, B:2, C:1                                           │
   * │   VALID! Length = 10                                                       │
   * │   10 > 6 (current min) → don't update                                      │
   * │   BREAK                                                                    │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ... (similar process for i=2, 3, 4, ...)
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=9: Start at 'B'                                                          │
   * │                                                                             │
   * │ j=9: window = "B" → missing A, C                                           │
   * │ j=10: window = "BA" → missing C                                            │
   * │ j=11: window = "BAN" → missing C                                           │
   * │ j=12: window = "BANC"                                                      │
   * │   windowCounts = {B:1, A:1, N:1, C:1}                                      │
   * │   Check: A:1>=1 ✅, B:1>=1 ✅, C:1>=1 ✅ → VALID! ✅                       │
   * │   Length = 4                                                               │
   * │   4 < 6 (current min) → UPDATE! minLength=4, minStart=9                    │
   * │   BREAK                                                                    │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ... (i=10, 11, 12 won't find better)
   *
   * RESULT: s.substring(9, 9+4) = "BANC" ✅
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY BRUTE FORCE IS SLOW
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * For each of m starting positions:
   *   - We may expand up to m positions
   *   - Each validity check compares with required (size up to n unique chars)
   *
   * Worst case: O(m² × n)
   *
   * With optimization (break on first valid):
   *   - Still O(m²) in worst case if valid windows are near the end
   *   - Better in practice when valid windows are found early
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. t longer than s: s="a", t="aa"
   *    → Return "" (impossible to fit)
   *
   * 2. No valid window: s="xyz", t="abc"
   *    → Return "" (chars not present)
   *
   * 3. Exact match: s="abc", t="abc"
   *    → Return "abc" (entire string)
   *
   * 4. Single char: s="a", t="a"
   *    → Return "a"
   *
   * 5. Duplicates in t: s="aa", t="aa"
   *    → Return "aa" (need BOTH a's)
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Minimum Window Substring - BRUTE FORCE\n");

    const testCases: { s: string; t: string; expected: string; description: string }[] = [
      // Basic examples from problem
      {
        s: "ADOBECODEBANC",
        t: "ABC",
        expected: "BANC",
        description: "Example 1: Classic case",
      },
      {
        s: "a",
        t: "a",
        expected: "a",
        description: "Example 2: Single char match",
      },
      {
        s: "a",
        t: "aa",
        expected: "",
        description: "Example 3: Not enough chars",
      },

      // Edge cases
      {
        s: "abc",
        t: "abc",
        expected: "abc",
        description: "Exact match",
      },
      {
        s: "abc",
        t: "cba",
        expected: "abc",
        description: "Same chars different order",
      },
      {
        s: "xyz",
        t: "abc",
        expected: "",
        description: "No matching chars",
      },

      // Duplicates
      {
        s: "aa",
        t: "aa",
        expected: "aa",
        description: "Duplicate chars in t",
      },
      {
        s: "aab",
        t: "aab",
        expected: "aab",
        description: "Mixed duplicates",
      },

      // Longer strings
      {
        s: "ADOBECODEBANC",
        t: "AABC",
        expected: "ADOBECODEBA",
        description: "Need 2 A's",
      },
      {
        s: "cabwefgewcwaefgcf",
        t: "cae",
        expected: "cwae",
        description: "Multiple valid windows",
      },

      // Window at different positions
      {
        s: "bba",
        t: "ab",
        expected: "ba",
        description: "Window at end",
      },
      {
        s: "abc",
        t: "b",
        expected: "b",
        description: "Single char in middle",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { s, t, expected, description } of testCases) {
      const result = minWindow(s, t);
      const status = result === expected ? "✅" : "❌";

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

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
MinWindowSubstringBruteForce.runTests();