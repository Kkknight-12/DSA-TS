/**
 * VALID ANAGRAM - OPTIMAL
 * =======================
 *
 * PROBLEM:
 * Do strings `s` and `t` diye hain.
 * Return `true` agar `t`, `s` ka anagram hai.
 *
 * OPTIMAL IDEA:
 * Agar input lowercase English letters `a-z` tak limited hai,
 * toh hash map ki jagah fixed 26-size array use kar sakte hain.
 *
 * NOTE:
 * Is repo version me comparison case-insensitive rakha hai,
 * so pehle lowercase normalize karte hain.
 * Fixed array approach English letters `a-z` ke liye hai.
 *
 * INTUITION (Soch):
 * -----------------
 * Frequency map me keys dynamic hoti hain.
 * But lowercase English alphabet fixed hai:
 *
 *   a -> index 0
 *   b -> index 1
 *   ...
 *   z -> index 25
 *
 * Ek balance array rakho:
 *
 *   s ka character  -> +1
 *   t ka character  -> -1
 *
 * Agar dono strings anagram hain,
 * toh every +1 kisi matching -1 se cancel ho jayega.
 *
 * Final array all zero -> true
 *
 * TIME:  O(n)
 *   - one pass over both strings, then fixed 26-count check
 *
 * SPACE: O(1)
 *   - array size always 26
 */

namespace ValidAnagramOptimal {
  const ALPHABET_SIZE = 26;
  const A_CHAR_CODE = 'a'.charCodeAt(0);

  function normalize(text: string): string {
    // Same-case conversion ke baad fixed array me "C" and "c" same slot use karte hain.
    return text.toLowerCase();
  }

  function getLetterIndex(char: string): number {
    // Relative index banana important hai:
    // 'a'.charCode - 'a'.charCode = 0
    // 'b'.charCode - 'a'.charCode = 1
    // ...
    return char.charCodeAt(0) - A_CHAR_CODE;
  }

  function isValidLowercaseLetterIndex(index: number): boolean {
    // Fixed 26-slot array sirf a-z ko represent karta hai.
    // Index outside range means input optimal approach ke alphabet contract se bahar hai.
    return index >= 0 && index < ALPHABET_SIZE;
  }

  function isAnagram(s: string, t: string): boolean {
    // Length mismatch ka matlab total characters equal nahi hain.
    // Equal frequency possible hi nahi, so early false.
    if (s.length !== t.length) {
      return false;
    }

    const source = normalize(s);
    const target = normalize(t);
    const balance = new Array<number>(ALPHABET_SIZE).fill(0);

    for (let i = 0; i < source.length; i++) {
      const sourceIndex = getLetterIndex(source[i]);
      const targetIndex = getLetterIndex(target[i]);

      if (
        !isValidLowercaseLetterIndex(sourceIndex) ||
        !isValidLowercaseLetterIndex(targetIndex)
      ) {
        return false;
      }

      // `balance[index]` net difference track karta hai.
      // Positive value means source me ye letter extra hai.
      balance[sourceIndex]++;

      // Target ka same letter source inventory ko cancel/consume karta hai.
      // Negative value means target ne ye letter source se zyada baar use kiya.
      balance[targetIndex]--;
    }

    // Har slot zero hona chahiye.
    // Non-zero slot ka matlab us letter ki frequency dono strings me different hai.
    return balance.every((count) => count === 0);
  }

  /**
   * ==========================================================
   * DRY RUN - 26 SLOT BALANCE ARRAY
   * ==========================================================
   *
   * Example:
   * s = "aabb", t = "bbaa"
   *
   * Initial:
   *
   * +--------------------------------------------------------+
   * | balance[a] = 0                                        |
   * | balance[b] = 0                                        |
   * +--------------------------------------------------------+
   *
   * One pass:
   *
   * +---+------+--------+------+--------+--------------------+
   * | i | s[i] | action | t[i] | action | important state    |
   * +---+------+--------+------+--------+--------------------+
   * | 0 | a    | a + 1  | b    | b - 1  | a=1, b=-1          |
   * | 1 | a    | a + 1  | b    | b - 1  | a=2, b=-2          |
   * | 2 | b    | b + 1  | a    | a - 1  | a=1, b=-1          |
   * | 3 | b    | b + 1  | a    | a - 1  | a=0, b=0           |
   * +---+------+--------+------+--------+--------------------+
   *
   * Final check:
   *   every slot is 0
   *
   * Final answer = true
   *
   * ----------------------------------------------------------
   * Negative example:
   * s = "aacc", t = "ccac"
   *
   * Net effect:
   *   a: +2 from source, -1 from target = +1
   *   c: +2 from source, -3 from target = -1
   *
   * Some slots non-zero.
   * Final answer = false
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Different lengths:
   *    "a", "ab" -> false
   *
   * 2. Same letters with repeated counts:
   *    "aabb", "bbaa" -> true
   *
   * 3. Same length but count mismatch:
   *    "aacc", "ccac" -> false
   *
   * 4. Empty strings:
   *    "", "" -> true
   *
   * 5. Case-insensitive repo behavior:
   *    "CAT", "ACT" -> true
   */

  export function runTests(): void {
    console.log('Testing Valid Anagram - OPTIMAL\n');

    const tests: Array<{
      s: string;
      t: string;
      expected: boolean;
      description: string;
    }> = [
      {
        s: 'anagram',
        t: 'nagaram',
        expected: true,
        description: 'Classic valid anagram',
      },
      {
        s: 'rat',
        t: 'car',
        expected: false,
        description: 'Same length but different characters',
      },
      {
        s: 'CAT',
        t: 'ACT',
        expected: true,
        description: 'Case-insensitive repo behavior',
      },
      {
        s: 'rules',
        t: 'lesrt',
        expected: false,
        description: 'One character frequency mismatch',
      },
      {
        s: 'listen',
        t: 'silent',
        expected: true,
        description: 'Different order, same inventory',
      },
      {
        s: 'a',
        t: 'ab',
        expected: false,
        description: 'Length mismatch',
      },
      {
        s: '',
        t: '',
        expected: true,
        description: 'Both strings empty',
      },
      {
        s: 'aabb',
        t: 'bbaa',
        expected: true,
        description: 'Repeated characters balanced',
      },
      {
        s: 'aacc',
        t: 'ccac',
        expected: false,
        description: 'Same length but count mismatch',
      },
    ];

    let passed = 0;

    tests.forEach(({ s, t, expected, description }, index) => {
      const result = isAnagram(s, t);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  s="${s}", t="${t}"`);
      console.log(
        `  Expected: ${expected} | Got: ${result} -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

ValidAnagramOptimal.runTests();
