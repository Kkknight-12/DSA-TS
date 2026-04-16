/**
 * ROTATE STRING - OPTIMAL
 * =======================
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
 * Rotation ka meaning:
 *
 *   suffix front me aa gaya
 *   prefix end me chala gaya
 *
 * Agar hum `s + s` banate hain,
 * toh `s` ki saari rotations us doubled string ke andar continuous substring
 * ke form me milti hain.
 *
 * Example:
 *
 *   s = "abcde"
 *   s + s = "abcdeabcde"
 *
 * All rotations inside this:
 *
 *   abcde
 *    bcdea
 *     cdeab
 *      deabc
 *       eabcd
 *
 * So:
 *
 *   goal is rotation iff goal is inside s + s
 *
 * TIME: library-dependent substring search
 *   - code level par one doubled string banti hai
 *   - `includes` implementation engine par depend kar sakta hai
 *
 * SPACE: O(n)
 *   - doubled string length 2n hoti hai
 */

namespace RotateStringOptimal {
  function isRotation(s: string, goal: string): boolean {
    // Rotation me same characters same count ke saath rehte hain.
    // Different lengths means no rotation can ever match.
    if (s.length !== goal.length) {
      return false;
    }

    // s+s circular behavior ko linear string me convert karta hai.
    // Agar goal rotation hai, toh woh kisi start position se yahan contiguous milega.
    const doubledString = s + s;

    return doubledString.includes(goal);
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - DOUBLE STRING TRICK
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "abcde", goal = "cdeab"
   *
   * Length check:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ s.length = 5                                             │
   * │ goal.length = 5                                          │
   * │ same length -> rotation possible                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * Build doubled string:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ doubledString = s + s                                    │
   * │               = "abcde" + "abcde"                        │
   * │               = "abcdeabcde"                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * Search:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "abcdeabcde".includes("cdeab") -> true                   │
   * │ So "cdeab" is a rotation of "abcde"                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = true
   *
   * ───────────────────────────────────────────────────────────
   * Negative example:
   * s = "abcde", goal = "abced"
   *
   * doubledString = "abcdeabcde"
   * "abced" is not present inside doubledString
   *
   * Final answer = false
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Same string:
   *    "abc", "abc" -> true
   *
   * 2. Empty strings:
   *    "", "" -> true
   *
   * 3. Different lengths:
   *    "abc", "ab" -> false
   *
   * 4. Repeated pattern:
   *    "abab", "baba" -> true
   */

  export function runTests(): void {
    console.log('Testing Rotate String - OPTIMAL\n');

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

RotateStringOptimal.runTests();
