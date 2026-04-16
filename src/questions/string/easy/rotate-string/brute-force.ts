/**
 * ROTATE STRING - BRUTE FORCE
 * ===========================
 *
 * PROBLEM:
 * Do strings `s` and `goal` diye hain.
 * Return `true` agar `goal`, `s` ki rotation ban sakta hai.
 *
 * Examples:
 *   s = "abcde", goal = "cdeab" -> true
 *   s = "abcde", goal = "abced" -> false
 *
 * INTUITION (Soch):
 * ─────────────────
 * Rotation ka matlab start point change ho gaya,
 * but character order circular way me same rehta hai.
 *
 * Brute force me:
 *   har index ko possible new start maan lo
 *   us index se rotation banao
 *   goal ke saath compare karo
 *
 * Visual:
 *
 *   s = "abcde"
 *
 *   split at index 2:
 *   prefix = "ab"
 *   suffix = "cde"
 *
 *   rotation = suffix + prefix
 *            = "cde" + "ab"
 *            = "cdeab"
 *
 * TIME:  O(n^2)
 *   - n possible rotations try hoti hain
 *   - har rotation banane/comparison me O(n) lag sakta hai
 *
 * SPACE: O(n)
 *   - har generated rotation length n ki hoti hai
 */

namespace RotateStringBruteForce {
  function rotateFromIndex(s: string, startIndex: number): string {
    // startIndex ko new first character maan rahe hain.
    // Isliye suffix front me aata hai and prefix end me chala jata hai.
    return s.slice(startIndex) + s.slice(0, startIndex);
  }

  function isRotation(s: string, goal: string): boolean {
    // Rotation me characters add/remove nahi hote.
    // Length mismatch ka matlab answer impossible hai.
    if (s.length !== goal.length) {
      return false;
    }

    for (let startIndex = 0; startIndex < s.length; startIndex++) {
      const rotated = rotateFromIndex(s, startIndex);

      // Agar kisi startIndex se exact goal ban gaya,
      // toh goal valid rotation hai. Aage rotations check karne ki zarurat nahi.
      if (rotated === goal) {
        return true;
      }
    }

    // Empty string case me loop run nahi hota.
    // Dono empty hain toh they are rotations of each other.
    return s.length === 0 && goal.length === 0;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - GENERATE EVERY ROTATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "abcde", goal = "cdeab"
   *
   * Start:
   *   length same hai -> possible
   *
   * ═══════════════════════════════════════════════════════════
   * startIndex = 0
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ suffix = s.slice(0) = "abcde"                           │
   * │ prefix = s.slice(0, 0) = ""                              │
   * │ rotated = "abcde"                                       │
   * │ "abcde" === "cdeab" ? false                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * startIndex = 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ suffix = "bcde"                                         │
   * │ prefix = "a"                                            │
   * │ rotated = "bcdea"                                       │
   * │ "bcdea" === "cdeab" ? false                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * startIndex = 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ suffix = "cde"                                          │
   * │ prefix = "ab"                                           │
   * │ rotated = "cdeab"                                       │
   * │ "cdeab" === "cdeab" ? true                              │
   * │ return true                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = true
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Same string:
   *    "abc", "abc" -> true
   *
   * 2. Different lengths:
   *    "abc", "ab" -> false
   *
   * 3. Empty strings:
   *    "", "" -> true
   *
   * 4. Repeated characters:
   *    "abab", "baba" -> true
   *
   * 5. Same length but impossible:
   *    "abcde", "abced" -> false
   */

  export function runTests(): void {
    console.log('Testing Rotate String - BRUTE FORCE\n');

    const tests: Array<{
      s: string;
      goal: string;
      expected: boolean;
      description: string;
    }> = [
      {
        s: 'abcde',
        goal: 'cdeab',
        expected: true,
        description: 'Standard valid rotation',
      },
      {
        s: 'abcde',
        goal: 'abced',
        expected: false,
        description: 'Same length but not a rotation',
      },
      {
        s: 'abc',
        goal: 'abc',
        expected: true,
        description: 'Zero-rotation case',
      },
      {
        s: '',
        goal: '',
        expected: true,
        description: 'Both strings empty',
      },
      {
        s: 'abc',
        goal: 'ab',
        expected: false,
        description: 'Length mismatch',
      },
      {
        s: 'a',
        goal: 'a',
        expected: true,
        description: 'Single same character',
      },
      {
        s: 'a',
        goal: 'b',
        expected: false,
        description: 'Single different character',
      },
      {
        s: 'abab',
        goal: 'baba',
        expected: true,
        description: 'Repeated pattern valid rotation',
      },
      {
        s: 'aaaa',
        goal: 'aaaa',
        expected: true,
        description: 'All same characters',
      },
    ];

    let passed = 0;

    tests.forEach(({ s, goal, expected, description }, index) => {
      const result = isRotation(s, goal);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  s="${s}", goal="${goal}"`);
      console.log(
        `  Expected: ${expected} | Got: ${result} -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

RotateStringBruteForce.runTests();
