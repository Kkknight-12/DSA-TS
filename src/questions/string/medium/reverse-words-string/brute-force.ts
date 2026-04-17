/**
 * REVERSE WORDS IN A STRING - BRUTE FORCE
 * =======================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Hume words ka order reverse karna hai.
 *
 * Rules:
 *   leading spaces remove
 *   trailing spaces remove
 *   multiple spaces between words -> single space
 *   word ke characters same order me rehne chahiye
 *
 * Example:
 *   s = "  hello   world  "
 *   answer = "world hello"
 *
 * INTUITION (Soch):
 * -----------------
 * JavaScript built-ins se problem directly express ho sakti hai:
 *
 *   split words
 *   empty strings remove
 *   words reverse
 *   single space se join
 *
 * Example:
 *
 *   "  hello   world  "
 *   split(' ') -> ["", "", "hello", "", "", "world", "", ""]
 *   filter     -> ["hello", "world"]
 *   reverse    -> ["world", "hello"]
 *   join       -> "world hello"
 *
 * TIME: O(n)
 *   - string/word array multiple passes se process hota hai
 *
 * SPACE: O(n)
 *   - words array and result string store hote hain
 */

namespace ReverseWordsStringBruteForce {
  function reverseWords(s: string): string {
    const parts = s.split(' ');

    // split(' ') multiple spaces ko empty strings me convert karta hai.
    // Empty strings real words nahi hain, so final answer me nahi aani chahiye.
    const words = parts.filter((word) => word.length > 0);

    // Words ke characters untouched rehte hain.
    // Sirf word array ka order reverse hota hai.
    const reversedWords = words.reverse();

    // Problem final output me words ke beech exactly single space chahta hai.
    return reversedWords.join(' ');
  }

  /**
   * ==========================================================
   * DRY RUN - SPLIT, FILTER, REVERSE, JOIN
   * ==========================================================
   *
   * Example:
   * s = "  hello   world  "
   *
   * Step 1: split by single space
   *
   * +--------------------------------------------------------+
   * | parts = ["", "", "hello", "", "", "world", "", ""]  |
   * +--------------------------------------------------------+
   *
   * Step 2: remove empty strings
   *
   * +--------------------------------------------------------+
   * | words = ["hello", "world"]                            |
   * +--------------------------------------------------------+
   *
   * Step 3: reverse word order
   *
   * +--------------------------------------------------------+
   * | reversedWords = ["world", "hello"]                    |
   * +--------------------------------------------------------+
   *
   * Step 4: join with single space
   *
   * +--------------------------------------------------------+
   * | result = "world hello"                                |
   * +--------------------------------------------------------+
   *
   * Final answer = "world hello"
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Normal sentence:
   *    "the sky is blue" -> "blue is sky the"
   *
   * 2. Leading/trailing spaces:
   *    "  hello world  " -> "world hello"
   *
   * 3. Multiple spaces:
   *    "a good   example" -> "example good a"
   *
   * 4. Single word:
   *    "single" -> "single"
   *
   * 5. Only spaces:
   *    "   " -> ""
   */

  export function runTests(): void {
    console.log('Testing Reverse Words In A String - BRUTE FORCE\n');

    const tests: Array<{
      s: string;
      expected: string;
      description: string;
    }> = [
      {
        s: 'the sky is blue',
        expected: 'blue is sky the',
        description: 'Normal sentence',
      },
      {
        s: '  hello world  ',
        expected: 'world hello',
        description: 'Leading and trailing spaces',
      },
      {
        s: 'a good   example',
        expected: 'example good a',
        description: 'Multiple spaces between words',
      },
      {
        s: 'single',
        expected: 'single',
        description: 'Single word',
      },
      {
        s: '   ',
        expected: '',
        description: 'Only spaces',
      },
      {
        s: '  Bob    Loves  Alice   ',
        expected: 'Alice Loves Bob',
        description: 'Mixed spacing with capitalized words',
      },
      {
        s: 'a',
        expected: 'a',
        description: 'Single character word',
      },
      {
        s: 'example      good a',
        expected: 'a good example',
        description: 'Large gap between words',
      },
    ];

    let passed = 0;

    tests.forEach(({ s, expected, description }, index) => {
      const result = reverseWords(s);
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

ReverseWordsStringBruteForce.runTests();
