/**
 * ROTATE STRING - OPTIMAL KMP
 * ===========================
 *
 * PROBLEM:
 * Do strings `s` and `goal` diye hain.
 * Return `true` agar `goal`, `s` ki rotation ban sakta hai.
 *
 * INTUITION (Soch):
 * ─────────────────
 * Double string trick same rahega:
 *
 *   goal should appear inside s + s
 *
 * Difference:
 *   built-in `includes` ke instead hum KMP substring search use karenge.
 *
 * KMP ka core idea:
 *   mismatch hone par pattern ko zero se restart nahi karte
 *   LPS table batata hai kitna matched prefix reuse ho sakta hai
 *
 * Example:
 *
 *   s = "abcde"
 *   goal = "cdeab"
 *   text = s + s = "abcdeabcde"
 *
 * KMP check karega ki pattern "cdeab" text me present hai ya nahi.
 *
 * TIME:  O(n)
 *   - LPS build O(n)
 *   - KMP search O(n)
 *
 * SPACE: O(n)
 *   - LPS array and doubled text
 */

namespace RotateStringOptimalKMP {
  function buildLps(pattern: string): number[] {
    const lps = new Array(pattern.length).fill(0);

    // prefixLength means: current index se pehle tak ka longest prefix length
    // jo suffix bhi hai. Mismatch par isi state ko reuse karte hain.
    let prefixLength = 0;
    let index = 1;

    while (index < pattern.length) {
      if (pattern[index] === pattern[prefixLength]) {
        prefixLength++;
        lps[index] = prefixLength;
        index++;
      } else if (prefixLength > 0) {
        // Mismatch ke baad pattern ko zero se restart nahi karna.
        // LPS batata hai ki kaunsa smaller prefix ab bhi candidate ho sakta hai.
        prefixLength = lps[prefixLength - 1];
      } else {
        // Koi reusable prefix nahi bacha, so current index ka LPS 0 rahega.
        lps[index] = 0;
        index++;
      }
    }

    return lps;
  }

  function kmpSearch(text: string, pattern: string): boolean {
    if (pattern.length === 0) {
      return true;
    }

    const lps = buildLps(pattern);
    let textIndex = 0;
    let patternIndex = 0;

    while (textIndex < text.length) {
      if (text[textIndex] === pattern[patternIndex]) {
        textIndex++;
        patternIndex++;

        // patternIndex pattern length tak pahunch gaya,
        // matlab full goal doubled string ke andar match ho gaya.
        if (patternIndex === pattern.length) {
          return true;
        }
      } else if (patternIndex > 0) {
        // Text index ko peeche nahi le jaate.
        // Pattern index ko LPS ke through reusable matched prefix par shift karte hain.
        patternIndex = lps[patternIndex - 1];
      } else {
        // Pattern ka first char bhi match nahi hua,
        // so next text character se fresh match try karo.
        textIndex++;
      }
    }

    return false;
  }

  function isRotation(s: string, goal: string): boolean {
    // KMP search tabhi meaningful hai jab dono strings same length ke hon.
    // Rotation operation length preserve karta hai.
    if (s.length !== goal.length) {
      return false;
    }

    // Empty strings are rotations of each other.
    if (s.length === 0) {
      return true;
    }

    // Circular rotation problem ko linear substring search me convert kar rahe hain.
    const doubledString = s + s;

    return kmpSearch(doubledString, goal);
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - KMP SEARCH ON DOUBLED STRING
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "abcde", goal = "cdeab"
   *
   * Step 1:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Lengths same -> possible rotation                       │
   * │ doubledString = "abcdeabcde"                            │
   * │ pattern = "cdeab"                                       │
   * └──────────────────────────────────────────────────────────┘
   *
   * Step 2: Build LPS for "cdeab"
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Pattern has no repeated prefix/suffix overlap here       │
   * │ lps = [0, 0, 0, 0, 0]                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * Step 3: Search pattern in doubledString
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ text[0] = 'a' vs pattern[0] = 'c' -> mismatch           │
   * │ text[1] = 'b' vs pattern[0] = 'c' -> mismatch           │
   * │ text[2] = 'c' vs pattern[0] = 'c' -> match              │
   * │ text[3] = 'd' vs pattern[1] = 'd' -> match              │
   * │ text[4] = 'e' vs pattern[2] = 'e' -> match              │
   * │ text[5] = 'a' vs pattern[3] = 'a' -> match              │
   * │ text[6] = 'b' vs pattern[4] = 'b' -> match              │
   * │ patternIndex == pattern.length -> return true           │
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
    console.log('Testing Rotate String - OPTIMAL KMP\n');

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

RotateStringOptimalKMP.runTests();
