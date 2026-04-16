/**
 * LONGEST PALINDROMIC SUBSTRING - BRUTE FORCE
 * ===========================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Hume longest substring return karna hai jo palindrome ho.
 *
 * Palindrome:
 *   left se right same
 *   right se left same
 *
 * Examples:
 *   s = "babad" -> "bab" or "aba"
 *   s = "cbbd"  -> "bb"
 *
 * INTUITION (Soch):
 * -----------------
 * Brute force me hum har possible substring try kar sakte hain.
 *
 * But ek small improvement:
 *   longest length se start karo
 *   phir chhoti lengths try karo
 *
 * Isse jaise hi pehla palindrome milta hai,
 * woh definitely longest hota hai.
 *
 * Example:
 *
 *   s = "babad"
 *
 *   length 5 -> "babad" false
 *   length 4 -> "baba", "abad" false
 *   length 3 -> "bab" true
 *
 *   return "bab"
 *
 * TIME: O(n^3)
 *   - O(n^2) substrings
 *   - each palindrome check can take O(n)
 *
 * SPACE: O(1)
 *   - only pointers and indexes are used
 */

namespace LongestPalindromicSubstringBruteForce {
  function isPalindrome(s: string, left: number, right: number): boolean {
    while (left < right) {
      // Mismatch ka matlab current substring mirror-symmetric nahi hai.
      // Ek bhi unequal pair milte hi ye substring palindrome nahi ho sakta.
      if (s[left] !== s[right]) {
        return false;
      }

      // Current outer pair match ho gaya.
      // Ab palindrome property next inner pair par depend karegi.
      left++;
      right--;
    }

    return true;
  }

  function longestPalindrome(s: string): string {
    // Empty ya single character string already apni longest palindrome hoti hai.
    if (s.length < 2) {
      return s;
    }

    for (let length = s.length; length >= 1; length--) {
      // `length` descending hai.
      // Is length par palindrome milte hi answer final hoga,
      // kyunki badi lengths already fail ho chuki hain.
      for (let start = 0; start + length <= s.length; start++) {
        const end = start + length - 1;

        // Current continuous window [start..end] ko palindrome test kar rahe hain.
        // Agar true mila, this is the earliest palindrome of current longest possible length.
        if (isPalindrome(s, start, end)) {
          return s.slice(start, end + 1);
        }
      }
    }

    // Code yahan practically nahi aayega, kyunki length 1 palindrome always hota hai.
    return '';
  }

  /**
   * ==========================================================
   * DRY RUN - TRY LONGEST LENGTH FIRST
   * ==========================================================
   *
   * Example:
   * s = "babad"
   *
   * Start:
   *   n = 5
   *
   * ==========================================================
   * length = 5
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | start = 0, end = 4                                    |
   * | substring = "babad"                                   |
   * | compare s[0]='b' and s[4]='d' -> mismatch             |
   * | palindrome? false                                     |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * length = 4
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | start = 0, end = 3                                    |
   * | substring = "baba"                                    |
   * | outer pair: 'b' vs 'a' -> mismatch                    |
   * | palindrome? false                                     |
   * +--------------------------------------------------------+
   *
   * +--------------------------------------------------------+
   * | start = 1, end = 4                                    |
   * | substring = "abad"                                    |
   * | outer pair: 'a' vs 'd' -> mismatch                    |
   * | palindrome? false                                     |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * length = 3
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | start = 0, end = 2                                    |
   * | substring = "bab"                                     |
   * | compare s[0]='b' and s[2]='b' -> match                |
   * | pointers move inward                                  |
   * | left = 1, right = 1                                   |
   * | center reached -> palindrome                          |
   * | return "bab"                                          |
   * +--------------------------------------------------------+
   *
   * Final answer = "bab"
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty string:
   *    "" -> ""
   *
   * 2. Single character:
   *    "a" -> "a"
   *
   * 3. Even length palindrome:
   *    "cbbd" -> "bb"
   *
   * 4. Entire string palindrome:
   *    "racecar" -> "racecar"
   *
   * 5. No palindrome longer than 1:
   *    "abcde" -> "a"
   */

  export function runTests(): void {
    console.log('Testing Longest Palindromic Substring - BRUTE FORCE\n');

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

LongestPalindromicSubstringBruteForce.runTests();
