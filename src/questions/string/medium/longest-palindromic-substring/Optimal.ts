/**
 * LONGEST PALINDROMIC SUBSTRING - OPTIMAL
 * =======================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Hume longest substring return karna hai jo palindrome ho.
 *
 * OPTIMAL IDEA:
 * Manacher's Algorithm use karo.
 *
 * PREREQUISITE:
 * Pehle expand-around-center clear hona chahiye.
 * Manacher usi idea ko optimize karta hai by reusing mirror information.
 *
 * INTUITION (Soch):
 * -----------------
 * Normal center expansion har center se fresh start karta hai.
 * Manacher poochta hai:
 *
 *   kya current index kisi already-known palindrome ke andar hai?
 *
 * Agar haan, toh current index ka mirror index known palindrome ke left side
 * par hota hai. Mirror radius se hume ek safe starting radius mil sakta hai.
 *
 * Transform kyun?
 *
 *   original: "abba"
 *   transformed: "#a#b#b#a#"
 *
 * Ab odd/even dono palindrome transformed string me odd-center jaise behave karte hain.
 *
 * Variables ka short meaning:
 *
 *   radius[i]      -> transformed center i se kitna left/right expand ho sakta hai
 *   center         -> rightmost known palindrome ka center
 *   rightBoundary  -> us rightmost known palindrome ka right edge
 *
 * TIME: O(n)
 *   - mirror reuse ki wajah se repeated expansion avoid hoti hai
 *
 * SPACE: O(n)
 *   - transformed string and radius array
 */

namespace LongestPalindromicSubstringOptimal {
  function transformString(s: string): string {
    const transformed: string[] = ['#'];

    for (const char of s) {
      transformed.push(char, '#');
    }

    return transformed.join('');
  }

  function longestPalindrome(s: string): string {
    if (s.length < 2) {
      return s;
    }

    const transformed = transformString(s);
    const radius = new Array<number>(transformed.length).fill(0);

    // `center` and `rightBoundary` rightmost known palindrome represent karte hain.
    // Future indexes jab is boundary ke andar aate hain, tab mirror reuse possible hota hai.
    let center = 0;
    let rightBoundary = 0;

    let bestCenter = 0;
    let bestLength = 0;

    for (let i = 0; i < transformed.length; i++) {
      if (i < rightBoundary) {
        const mirror = 2 * center - i;

        // Current index known palindrome ke andar hai.
        // Mirror radius reuse kar sakte hain, but rightBoundary ke bahar guarantee nahi hoti.
        // Isliye safe starting radius = min(mirror radius, distance to rightBoundary).
        radius[i] = Math.min(radius[mirror], rightBoundary - i);
      }

      while (
        i - radius[i] - 1 >= 0 &&
        i + radius[i] + 1 < transformed.length &&
        transformed[i - radius[i] - 1] === transformed[i + radius[i] + 1]
      ) {
        // Boundary ke just bahar ka pair match kar raha hai.
        // Is match ko consume karke current palindrome radius one step grow hoti hai.
        radius[i]++;
      }

      // Agar current palindrome previous rightmost boundary se aage chala gaya,
      // toh future mirror calculations ke liye yahi best reference banega.
      if (i + radius[i] > rightBoundary) {
        center = i;
        rightBoundary = i + radius[i];
      }

      // radius[i] transformed representation me original palindrome length ke barabar hota hai.
      // Example: "#b#a#b#" has radius 3 around 'a', original palindrome "bab" length 3.
      if (radius[i] > bestLength) {
        bestLength = radius[i];
        bestCenter = i;
      }
    }

    // transformed start = bestCenter - bestLength.
    // Har original character transformed me 2-step spacing par hota hai,
    // so divide by 2 to map back to original index.
    const start = Math.floor((bestCenter - bestLength) / 2);

    return s.slice(start, start + bestLength);
  }

  /**
   * ==========================================================
   * DRY RUN - MANACHER'S ALGORITHM
   * ==========================================================
   *
   * Example:
   * s = "babad"
   *
   * Transform:
   *
   * +--------------------------------------------------------+
   * | original    =  b  a  b  a  d                          |
   * | transformed = #b#a#b#a#d#                              |
   * | indexes     = 01234567890                              |
   * +--------------------------------------------------------+
   *
   * Start:
   *   center = 0
   *   rightBoundary = 0
   *   bestLength = 0
   *
   * ==========================================================
   * i = 1, transformed[i] = 'b'
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | i is not inside rightBoundary                          |
   * | radius[1] starts at 0                                  |
   * | compare transformed[0] and transformed[2]               |
   * | '#' === '#' -> radius[1] becomes 1                     |
   * | next left is -1, stop                                  |
   * | palindrome in original = "b"                           |
   * +--------------------------------------------------------+
   *
   * Update:
   *   center = 1
   *   rightBoundary = 2
   *   bestLength = 1
   *
   * ==========================================================
   * i = 3, transformed[i] = 'a'
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | expand fresh around 'a'                                |
   * | compare # and # -> radius 1                            |
   * | compare b and b -> radius 2                            |
   * | compare # and # -> radius 3                            |
   * | next left is -1, stop                                  |
   * | transformed palindrome = "#b#a#b#"                     |
   * | original palindrome = "bab"                            |
   * +--------------------------------------------------------+
   *
   * Update:
   *   center = 3
   *   rightBoundary = 6
   *   bestLength = 3
   *   bestCenter = 3
   *
   * ==========================================================
   * i = 4, transformed[i] = '#'
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | i is inside rightBoundary                              |
   * | mirror = 2 * center - i = 2 * 3 - 4 = 2                |
   * | radius[mirror] = radius[2] = 0                         |
   * | distance to rightBoundary = 6 - 4 = 2                  |
   * | safe radius = min(0, 2) = 0                            |
   * | expansion tries outside safe area, but chars mismatch  |
   * +--------------------------------------------------------+
   *
   * Meaning:
   *   mirror says no guaranteed palindrome at this center.
   *
   * ==========================================================
   * i = 5, transformed[i] = 'b'
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | i is inside rightBoundary                              |
   * | mirror = 2 * 3 - 5 = 1                                 |
   * | radius[mirror] = 1                                     |
   * | distance to rightBoundary = 1                          |
   * | safe radius = 1                                        |
   * | expand beyond boundary: compare a and a -> radius 2    |
   * | compare # and # -> radius 3                            |
   * | compare b and d -> mismatch                            |
   * | original palindrome = "aba"                            |
   * +--------------------------------------------------------+
   *
   * bestLength remains 3 because "aba" ties with earlier "bab".
   *
   * Final answer = "bab"
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Odd length palindrome:
   *    "babad" -> "bab"
   *
   * 2. Even length palindrome:
   *    "cbbd" -> "bb"
   *
   * 3. Single character:
   *    "a" -> "a"
   *
   * 4. All same characters:
   *    "aaaa" -> "aaaa"
   *
   * 5. Whole string palindrome:
   *    "racecar" -> "racecar"
   */

  export function runTests(): void {
    console.log('Testing Longest Palindromic Substring - OPTIMAL\n');

    const tests: Array<{
      s: string;
      expected: string;
      description: string;
    }> = [
      { s: 'babad', expected: 'bab', description: 'Odd palindrome with tie' },
      { s: 'cbbd', expected: 'bb', description: 'Even length palindrome' },
      { s: 'a', expected: 'a', description: 'Single character' },
      { s: '', expected: '', description: 'Empty string' },
      { s: 'aaaa', expected: 'aaaa', description: 'All same characters' },
      { s: 'racecar', expected: 'racecar', description: 'Whole string palindrome' },
      { s: 'abcde', expected: 'a', description: 'Only single-char palindromes' },
      { s: 'bananas', expected: 'anana', description: 'Long palindrome in middle' },
      { s: 'forgeeksskeegfor', expected: 'geeksskeeg', description: 'Long even palindrome' },
    ];

    let passed = 0;

    tests.forEach(({ s, expected, description }, index) => {
      const result = longestPalindrome(s);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  s="${s}"`);
      console.log(
        `  Expected: "${expected}" | Got: "${result}" -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

LongestPalindromicSubstringOptimal.runTests();
