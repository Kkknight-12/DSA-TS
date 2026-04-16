/**
 * LONGEST PALINDROMIC SUBSTRING - BETTER
 * ======================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Hume longest substring return karna hai jo palindrome ho.
 *
 * BETTER IDEA:
 * Har substring generate karne ki jagah,
 * har possible center se palindrome expand karo.
 *
 * INTUITION (Soch):
 * -----------------
 * Palindrome center ke around symmetric hota hai.
 *
 * Odd length:
 *
 *   "bab"
 *     ^
 *     one character center
 *
 * Even length:
 *
 *   "bb"
 *    ^^
 *    two-character / gap center
 *
 * Har index par dono cases check karo:
 *   1. odd center  -> expand(i, i)
 *   2. even center -> expand(i, i + 1)
 *
 * Jo expansion longest palindrome de,
 * uska start/end remember kar lo.
 *
 * TIME: O(n^2)
 *   - n centers
 *   - each center can expand O(n) in worst case
 *
 * SPACE: O(1)
 *   - only pointers and best range are stored
 */

namespace LongestPalindromicSubstringBetter {
  type PalindromeRange = {
    start: number;
    end: number;
    length: number;
  };

  function expandAroundCenter(s: string, left: number, right: number): PalindromeRange {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      // Current outer pair match karta hai.
      // Ab palindrome ko bigger banane ke liye boundary bahar ki taraf grow karti hai.
      left--;
      right++;
    }

    // Loop mismatch ya boundary cross hone ke baad stop hota hai.
    // Last valid palindrome ek step andar tha: [left + 1, right - 1].
    const start = left + 1;
    const end = right - 1;

    return {
      start,
      end,
      length: end - start + 1,
    };
  }

  function longestPalindrome(s: string): string {
    // Empty/single char me koi expansion decision needed nahi hota.
    if (s.length < 2) {
      return s;
    }

    let bestStart = 0;
    let bestEnd = 0;

    for (let center = 0; center < s.length; center++) {
      // Odd palindrome me current character exact center hota hai.
      const odd = expandAroundCenter(s, center, center);

      // Even palindrome me center do characters ke beech hota hai.
      // Isliye right pointer center + 1 se start karta hai.
      const even = expandAroundCenter(s, center, center + 1);

      const currentBest = odd.length >= even.length ? odd : even;
      const bestLength = bestEnd - bestStart + 1;

      // Strictly longer result milne par hi update karte hain.
      // Tie me earlier palindrome stable rehta hai, which keeps output deterministic.
      if (currentBest.length > bestLength) {
        bestStart = currentBest.start;
        bestEnd = currentBest.end;
      }
    }

    return s.slice(bestStart, bestEnd + 1);
  }

  /**
   * ==========================================================
   * DRY RUN - EXPAND AROUND CENTER
   * ==========================================================
   *
   * Example:
   * s = "cbbd"
   *
   * Start:
   *   bestStart = 0
   *   bestEnd = 0
   *   best = "c"
   *
   * ==========================================================
   * center = 0
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | odd expand(0, 0):                                     |
   * | s[0] = 'c' matches itself                             |
   * | left -> -1, right -> 1                                |
   * | boundary crossed, valid range [0, 0] = "c"            |
   * +--------------------------------------------------------+
   *
   * +--------------------------------------------------------+
   * | even expand(0, 1):                                    |
   * | s[0] = 'c', s[1] = 'b' mismatch                       |
   * | valid range empty, length 0                           |
   * +--------------------------------------------------------+
   *
   * best remains "c"
   *
   * ==========================================================
   * center = 1
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | odd expand(1, 1):                                     |
   * | "b" only, length 1                                    |
   * +--------------------------------------------------------+
   *
   * +--------------------------------------------------------+
   * | even expand(1, 2):                                    |
   * | s[1] = 'b', s[2] = 'b' -> match                       |
   * | left -> 0, right -> 3                                 |
   * | s[0] = 'c', s[3] = 'd' -> mismatch                    |
   * | last valid range [1, 2] = "bb"                        |
   * +--------------------------------------------------------+
   *
   * "bb" length 2 > best length 1
   * best becomes "bb"
   *
   * ==========================================================
   * center = 2 and center = 3
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | no expansion longer than "bb" appears                  |
   * +--------------------------------------------------------+
   *
   * Final answer = "bb"
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
   * 4. Whole string palindrome:
   *    "racecar" -> "racecar"
   *
   * 5. Repeated characters:
   *    "aaaa" -> "aaaa"
   */

  export function runTests(): void {
    console.log('Testing Longest Palindromic Substring - BETTER\n');

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

LongestPalindromicSubstringBetter.runTests();
