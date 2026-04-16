/**
 * VALID ANAGRAM - BETTER APPROACH
 * ===============================
 *
 * PROBLEM:
 * Do strings `s` and `t` diye hain.
 * Return `true` agar `t`, `s` ka anagram hai.
 *
 * BETTER IDEA:
 * Sorting avoid karo.
 * Direct frequency count maintain karo.
 *
 * INTUITION (Soch):
 * -----------------
 * Anagram ka real condition ye hai:
 *
 *   har character ki count dono strings me same honi chahiye
 *
 * So:
 *   1. `s` se inventory banao
 *   2. `t` ke characters us inventory se consume karo
 *   3. agar consume karte waqt count missing/zero ho gaya, answer false
 *
 * Example:
 *
 *   s = "aabb"
 *   inventory = { a: 2, b: 2 }
 *
 *   t = "bbaa"
 *   b consume -> { a: 2, b: 1 }
 *   b consume -> { a: 2, b: 0 }
 *   a consume -> { a: 1, b: 0 }
 *   a consume -> { a: 0, b: 0 }
 *
 * All zero -> true
 *
 * TIME:  O(n)
 *   - each string one pass, plus unique-character check
 *
 * SPACE: O(k)
 *   - k = unique characters stored in the frequency map
 */

namespace ValidAnagramBetterApproach {
  function normalize(text: string): string {
    // Same-case conversion comparison ko fair banata hai.
    // Warna "C" aur "c" different keys ban jate.
    return text.toLowerCase();
  }

  function isAnagram(s: string, t: string): boolean {
    // Different length ka matlab total available characters hi different hain.
    // Aisi state me frequency map build karna waste hai.
    if (s.length !== t.length) {
      return false;
    }

    const source = normalize(s);
    const target = normalize(t);
    const frequency = new Map<string, number>();

    for (const char of source) {
      const previousCount = frequency.get(char) ?? 0;

      // `frequency` source string ka inventory map hai.
      // Source me character mila, so uski available count badh rahi hai.
      frequency.set(char, previousCount + 1);
    }

    for (const char of target) {
      const availableCount = frequency.get(char) ?? 0;

      // Target ka character source inventory se consume hona chahiye.
      // Count 0 ka matlab ya toh character source me tha hi nahi,
      // ya target us character ko source se zyada baar use kar raha hai.
      if (availableCount === 0) {
        return false;
      }

      // Current target character ke liye ek matching source character use ho gaya.
      // Isliye available inventory one count kam hoti hai.
      frequency.set(char, availableCount - 1);
    }

    for (const remainingCount of frequency.values()) {
      // Agar koi positive count bacha hai,
      // source ka character target me enough baar consume nahi hua.
      if (remainingCount !== 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * ==========================================================
   * DRY RUN - FREQUENCY MAP
   * ==========================================================
   *
   * Example:
   * s = "aabb", t = "bbaa"
   *
   * Build inventory from `s`:
   *
   * +------+-----------------------------+
   * | char | frequency map               |
   * +------+-----------------------------+
   * | a    | { a: 1 }                    |
   * | a    | { a: 2 }                    |
   * | b    | { a: 2, b: 1 }              |
   * | b    | { a: 2, b: 2 }              |
   * +------+-----------------------------+
   *
   * Consume using `t`:
   *
   * +------+-----------------------------+
   * | char | frequency map               |
   * +------+-----------------------------+
   * | b    | { a: 2, b: 1 }              |
   * | b    | { a: 2, b: 0 }              |
   * | a    | { a: 1, b: 0 }              |
   * | a    | { a: 0, b: 0 }              |
   * +------+-----------------------------+
   *
   * Final check:
   *   all counts are 0
   *
   * Final answer = true
   *
   * ----------------------------------------------------------
   * Negative example:
   * s = "aacc", t = "ccac"
   *
   * Source inventory:
   *   { a: 2, c: 2 }
   *
   * Target consumes:
   *   c -> ok
   *   c -> ok
   *   a -> ok
   *   c -> count already 0, so false
   *
   * Final answer = false
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Different lengths:
   *    "a", "ab" -> false
   *
   * 2. Repeated characters:
   *    "aabb", "bbaa" -> true
   *
   * 3. Character overused by target:
   *    "aacc", "ccac" -> false
   *
   * 4. Empty strings:
   *    "", "" -> true
   *
   * 5. Case-insensitive repo behavior:
   *    "CAT", "ACT" -> true
   */

  export function runTests(): void {
    console.log('Testing Valid Anagram - BETTER APPROACH\n');

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

ValidAnagramBetterApproach.runTests();
