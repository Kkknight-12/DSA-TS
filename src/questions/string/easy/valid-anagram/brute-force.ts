/**
 * VALID ANAGRAM - BRUTE FORCE
 * ===========================
 *
 * PROBLEM:
 * Do strings `s` and `t` diye hain.
 * Return `true` agar `t`, `s` ka anagram hai.
 *
 * Anagram ka matlab:
 *   same characters
 *   same frequency
 *   order different ho sakta hai
 *
 * Examples:
 *   s = "anagram", t = "nagaram" -> true
 *   s = "rat",     t = "car"     -> false
 *
 * NOTE:
 * Is repo version me comparison case-insensitive rakha hai.
 * So "CAT" and "ACT" ko anagram maana jayega.
 *
 * INTUITION (Soch):
 * -----------------
 * Anagram me order matter nahi karta, bas character counts matter karte hain.
 *
 * Agar dono strings ko sort kar do,
 * toh same characters same frequency ke saath same order me aa jayenge.
 *
 * Example:
 *
 *   "anagram" -> sort -> "aaagmnr"
 *   "nagaram" -> sort -> "aaagmnr"
 *
 * Sorted form same hai, so original strings anagram hain.
 *
 * TIME:  O(n log n)
 *   - sorting dominates
 *
 * SPACE: O(n)
 *   - split/sort/join ke liye extra character array/string banti hai
 */

namespace ValidAnagramBruteForce {
  function normalize(text: string): string {
    // Case-insensitive comparison ke liye dono inputs ko same case me la rahe hain.
    // Isse "CAT" aur "act" same character inventory represent karte hain.
    return text.toLowerCase();
  }

  function sortedCharacters(text: string): string {
    // Sorting order ko fixed bana deti hai.
    // Agar frequency same hai, sorted signature bhi same banega.
    return normalize(text).split('').sort().join('');
  }

  function isAnagram(s: string, t: string): boolean {
    // Anagram me characters add/remove nahi hote.
    // Length mismatch means kisi na kisi character ki count definitely different hai.
    if (s.length !== t.length) {
      return false;
    }

    const sortedS = sortedCharacters(s);
    const sortedT = sortedCharacters(t);

    // Sorted strings same hain toh har character same count ke saath present hai.
    // Sorted strings different hain toh at least one character/count mismatch hai.
    return sortedS === sortedT;
  }

  /**
   * ==========================================================
   * DRY RUN - SORT AND COMPARE
   * ==========================================================
   *
   * Example:
   * s = "anagram", t = "nagaram"
   *
   * Start:
   *   s.length = 7
   *   t.length = 7
   *   same length -> possible
   *
   * Step 1: normalize
   *
   * +--------------------------------------------------------+
   * | s = "anagram"                                         |
   * | t = "nagaram"                                         |
   * +--------------------------------------------------------+
   *
   * Step 2: sort both strings
   *
   * +--------------------------------------------------------+
   * | sortedS = "aaagmnr"                                   |
   * | sortedT = "aaagmnr"                                   |
   * +--------------------------------------------------------+
   *
   * Step 3: compare signatures
   *
   * +--------------------------------------------------------+
   * | "aaagmnr" === "aaagmnr" -> true                       |
   * +--------------------------------------------------------+
   *
   * Final answer = true
   *
   * ----------------------------------------------------------
   * Negative example:
   * s = "rat", t = "car"
   *
   * sortedS = "art"
   * sortedT = "acr"
   *
   * "art" !== "acr"
   * Final answer = false
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Different lengths:
   *    "a", "ab" -> false
   *
   * 2. Same characters, different order:
   *    "listen", "silent" -> true
   *
   * 3. Case-insensitive repo behavior:
   *    "CAT", "ACT" -> true
   *
   * 4. Empty strings:
   *    "", "" -> true
   *
   * 5. Same length but wrong frequency:
   *    "aacc", "ccac" -> false
   */

  export function runTests(): void {
    console.log('Testing Valid Anagram - BRUTE FORCE\n');

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

ValidAnagramBruteForce.runTests();
