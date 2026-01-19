/**
 * MINIMUM WINDOW SUBSEQUENCE - FORWARD-BACKWARD TWO POINTER (OPTIMAL)
 * ====================================================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Brute force mein problem kya hai?
 * - Har starting position try karte hain
 * - But same ending position ke liye multiple starts check karte hain
 *
 * SMART OBSERVATION:
 * ──────────────────
 * Forward scan sirf KISI BHI valid window ka END dhundta hai
 * Backward scan us END ke liye CLOSEST start dhundta hai!
 *
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │  PHASE 1 - FORWARD SCAN: Find where window ENDS                           │
 * │  ─────────────────────────────────────────────────                        │
 * │  s1 = "abcdebdde", s2 = "bde"                                             │
 * │                                                                            │
 * │  a  b  c  d  e  b  d  d  e                                                │
 * │     ↑     ↑  ↑                                                            │
 * │     b     d  e  → Found! Window ENDS at index 4                           │
 * │                                                                            │
 * │  But wait! This found "bcde" starting at b(1)                             │
 * │  What if there's a CLOSER 'b' to this 'e'?                                │
 * │                                                                            │
 * │  PHASE 2 - BACKWARD SCAN: Find CLOSEST start                              │
 * │  ────────────────────────────────────────────                             │
 * │  From end (index 4), go BACKWARD matching s2 in reverse (e→d→b)          │
 * │                                                                            │
 * │  a  b  c  d  e  ← Start from here                                        │
 * │     ↑     ↑  ↑                                                            │
 * │     b     d  e  → Start at index 1                                        │
 * │                                                                            │
 * │  Window = s1[1..4] = "bcde" (length 4)                                    │
 * │                                                                            │
 * │  WHY BACKWARD?                                                             │
 * │  Going backward from END finds the RIGHTMOST (closest) matching START!   │
 * │  This automatically gives MINIMUM window for that end position.          │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 *
 * ALGORITHM:
 * ──────────
 * 1. FORWARD: Match s2 chars in order, find END of valid window
 * 2. BACKWARD: From END, match s2 chars in REVERSE order, find START
 * 3. Calculate window length, update minimum
 * 4. Continue FORWARD from START+1 (not END+1, to find overlapping windows)
 *
 * TIME COMPLEXITY: O(m × n) worst case
 *   - Forward pass: O(m)
 *   - Each backward pass: O(n)
 *   - Number of backward passes: at most O(m/n)
 *   - But in practice much faster than brute force
 *
 * SPACE COMPLEXITY: O(1)
 */

namespace MinWindowSubsequenceOptimal {
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
    if (n > m) return "";

    // Edge Case: Empty s2
    if (n === 0) return "";

    // Track minimum window
    let minLength = Infinity;
    let minStart = 0;

    // Pointer for s1 (we'll iterate through it)
    let i = 0;

    // ═══════════════════════════════════════════════════════════════════
    // MAIN LOOP: Find all valid windows using forward-backward
    // ═══════════════════════════════════════════════════════════════════

    while (i < m) {
      // ─────────────────────────────────────────────────────────────────
      // PHASE 1: FORWARD SCAN - Find where window ENDS
      // ─────────────────────────────────────────────────────────────────
      //
      // Match s2 characters in order
      // When j reaches n, we found a complete subsequence ending at i-1

      let j = 0; // Pointer for s2

      while (i < m && j < n) {
        if (s1[i] === s2[j]) {
          j++; // Match! Move s2 pointer
        }
        i++; // Always move s1 pointer
      }

      // If we didn't match all of s2, no more valid windows possible
      if (j < n) {
        break;
      }

      // We found a valid window ending at i-1
      // (i moved past the last match)
      let end = i - 1;

      // ─────────────────────────────────────────────────────────────────
      // PHASE 2: BACKWARD SCAN - Find CLOSEST start
      // ─────────────────────────────────────────────────────────────────
      //
      // From 'end', go backward matching s2 in REVERSE order
      // This finds the RIGHTMOST (closest) start for this end
      //
      // WHY THIS WORKS:
      // - Forward found ANY valid window ending at 'end'
      // - Backward finds the MINIMUM window ending at 'end'
      // - Going backward, each match we find is the LATEST occurrence

      j = n - 1; // Start from end of s2
      let k = end; // Start from end of window in s1

      while (j >= 0) {
        if (s1[k] === s2[j]) {
          j--; // Match! Move s2 pointer backward
        }
        k--; // Always move s1 pointer backward
      }

      // k moved past the first match, so start = k + 1
      let start = k + 1;

      // ─────────────────────────────────────────────────────────────────
      // Update minimum window
      // ─────────────────────────────────────────────────────────────────

      const windowLength = end - start + 1;

      if (windowLength < minLength) {
        minLength = windowLength;
        minStart = start;
      }

      // ─────────────────────────────────────────────────────────────────
      // Continue from START + 1 (not END + 1)
      // ─────────────────────────────────────────────────────────────────
      //
      // WHY START + 1?
      // We might find a SMALLER window that starts AFTER this start
      // but ends BEFORE or AT the same end
      //
      // Example: s1 = "abab", s2 = "ab"
      // First window: a(0)→b(1), start=0, end=1
      // If we continue from end+1=2, we'd find a(2)→b(3)
      // But we want to also check if there's a shorter window starting at 1
      //
      // Actually in this case, continuing from start+1 = 1 would find:
      // No 'a' at position 1, so we'd eventually get to 'a' at 2

      i = start + 1;
    }

    // Return result
    if (minLength === Infinity) {
      return "";
    }

    return s1.substring(minStart, minStart + minLength);
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
   * ITERATION 1: i starts at 0
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * PHASE 1 - FORWARD SCAN:
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=0, j=0: s1[0]='a' != s2[0]='b' → i=1                                    │
   * │ i=1, j=0: s1[1]='b' == s2[0]='b' → j=1, i=2                               │
   * │ i=2, j=1: s1[2]='c' != s2[1]='d' → i=3                                    │
   * │ i=3, j=1: s1[3]='d' == s2[1]='d' → j=2, i=4                               │
   * │ i=4, j=2: s1[4]='e' == s2[2]='e' → j=3, i=5                               │
   * │                                                                            │
   * │ j=3 == n=3 → COMPLETE! Window ends at end = i-1 = 4                       │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * Visual:
   *   a  b  c  d  e  b  d  d  e
   *      ↑     ↑  ↑
   *      b     d  e    → end = 4
   *
   * PHASE 2 - BACKWARD SCAN from end=4:
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ k=4, j=2: s1[4]='e' == s2[2]='e' → j=1, k=3                               │
   * │ k=3, j=1: s1[3]='d' == s2[1]='d' → j=0, k=2                               │
   * │ k=2, j=0: s1[2]='c' != s2[0]='b' → k=1                                    │
   * │ k=1, j=0: s1[1]='b' == s2[0]='b' → j=-1, k=0                              │
   * │                                                                            │
   * │ j=-1 < 0 → DONE! Start = k+1 = 1                                          │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * Visual:
   *   a  b  c  d  e  ← going backward
   *      ↑     ↑  ↑
   *      b     d  e    → start = 1
   *
   * Window: s1[1..4] = "bcde", length = 4
   * minLength = 4, minStart = 1
   *
   * Continue from: i = start + 1 = 2
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION 2: i starts at 2
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * PHASE 1 - FORWARD SCAN:
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=2, j=0: s1[2]='c' != s2[0]='b' → i=3                                    │
   * │ i=3, j=0: s1[3]='d' != s2[0]='b' → i=4                                    │
   * │ i=4, j=0: s1[4]='e' != s2[0]='b' → i=5                                    │
   * │ i=5, j=0: s1[5]='b' == s2[0]='b' → j=1, i=6                               │
   * │ i=6, j=1: s1[6]='d' == s2[1]='d' → j=2, i=7                               │
   * │ i=7, j=2: s1[7]='d' != s2[2]='e' → i=8                                    │
   * │ i=8, j=2: s1[8]='e' == s2[2]='e' → j=3, i=9                               │
   * │                                                                            │
   * │ j=3 == n=3 → COMPLETE! Window ends at end = i-1 = 8                       │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * PHASE 2 - BACKWARD SCAN from end=8:
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ k=8, j=2: s1[8]='e' == s2[2]='e' → j=1, k=7                               │
   * │ k=7, j=1: s1[7]='d' == s2[1]='d' → j=0, k=6                               │
   * │ k=6, j=0: s1[6]='d' != s2[0]='b' → k=5                                    │
   * │ k=5, j=0: s1[5]='b' == s2[0]='b' → j=-1, k=4                              │
   * │                                                                            │
   * │ j=-1 < 0 → DONE! Start = k+1 = 5                                          │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * Window: s1[5..8] = "bdde", length = 4
   * 4 is NOT < 4 → don't update (keep leftmost)
   *
   * Continue from: i = start + 1 = 6
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION 3: i starts at 6
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * PHASE 1 - FORWARD SCAN:
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i=6, j=0: s1[6]='d' != s2[0]='b' → i=7                                    │
   * │ i=7, j=0: s1[7]='d' != s2[0]='b' → i=8                                    │
   * │ i=8, j=0: s1[8]='e' != s2[0]='b' → i=9                                    │
   * │                                                                            │
   * │ i=9 >= m=9 → EXIT LOOP                                                    │
   * │ j=0 < n=3 → Couldn't complete s2, BREAK outer loop                        │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * RESULT
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * minLength = 4, minStart = 1
   * Answer = s1.substring(1, 5) = "bcde" ✅
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY BACKWARD SCAN FINDS MINIMUM
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Consider: s1 = "axxbxxaxxb", s2 = "ab"
   *
   * FORWARD finds: a(0) → b(3), end = 3
   *
   * BACKWARD from end=3:
   *   s1[3]='b' matches s2[1]='b' → j=0, k=2
   *   s1[2]='x' no match → k=1
   *   s1[1]='x' no match → k=0
   *   s1[0]='a' matches s2[0]='a' → j=-1, k=-1
   *   start = 0
   *
   * Window = "axxb" (length 4)
   *
   * But what if we had: s1 = "axxaxxb", s2 = "ab"
   *
   * FORWARD finds: a(0) → b(6), end = 6
   *
   * BACKWARD from end=6:
   *   s1[6]='b' matches 'b' → j=0, k=5
   *   s1[5]='x' no match → k=4
   *   s1[4]='x' no match → k=3
   *   s1[3]='a' matches 'a' → j=-1, k=2  ← Found CLOSER 'a'!
   *   start = 3
   *
   * Window = "axxb" (length 4) instead of "axxaxxb" (length 7)!
   *
   * THE MAGIC: Backward scan finds the RIGHTMOST match for each char,
   * which gives the CLOSEST start to the end, hence MINIMUM window!
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      "🧪 Testing Minimum Window Subsequence - FORWARD-BACKWARD (OPTIMAL)\n"
    );

    const testCases: {
      s1: string;
      s2: string;
      expected: string;
      description: string;
    }[] = [
      // Basic examples from problem
      {
        s1: "abcdebdde",
        s2: "bde",
        expected: "bcde",
        description: "Example 1: Classic case",
      },
      {
        s1: "jmeqsiwvaovvnbstl",
        s2: "u",
        expected: "",
        description: "Example 2: Char not found",
      },
      {
        s1: "fhhjkeejkdjjs",
        s2: "jkj",
        expected: "jkdj",
        description: "Example 3: Quiz question",
      },

      // Edge cases
      {
        s1: "a",
        s2: "a",
        expected: "a",
        description: "Single char match",
      },
      {
        s1: "a",
        s2: "b",
        expected: "",
        description: "Single char no match",
      },
      {
        s1: "abc",
        s2: "abc",
        expected: "abc",
        description: "Exact match",
      },

      // Subsequence order matters
      {
        s1: "xyz",
        s2: "zyx",
        expected: "",
        description: "Wrong order - not subsequence",
      },
      {
        s1: "abcabc",
        s2: "abc",
        expected: "abc",
        description: "Multiple matches, pick leftmost",
      },

      // Longer examples
      {
        s1: "cnhczmccqouqadqtmjjzl",
        s2: "cm",
        expected: "czm",
        description: "Find cm subsequence",
      },
      {
        s1: "abcdeafbdgc",
        s2: "abc",
        expected: "abc",
        description: "Optimal at start",
      },

      // No valid window
      {
        s1: "aaa",
        s2: "ab",
        expected: "",
        description: "Missing character",
      },

      // Same length windows
      {
        s1: "abab",
        s2: "ab",
        expected: "ab",
        description: "Multiple same-length, pick first",
      },

      // Backward optimization cases
      {
        s1: "axxaxxb",
        s2: "ab",
        expected: "axxb",
        description: "Backward finds closer start",
      },
      {
        s1: "abcadbec",
        s2: "abc",
        expected: "abc",
        description: "First occurrence is optimal",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { s1, s2, expected, description } of testCases) {
      const result = minWindow(s1, s2);
      const status = result === expected ? "✅" : "❌";

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

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
MinWindowSubsequenceOptimal.runTests();