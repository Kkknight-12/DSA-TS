/**
 * REVERSE WORDS IN A STRING - BETTER
 * ==================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Words ka order reverse karke return karna hai, spaces normalize karke.
 *
 * BETTER IDEA:
 * String ko right se left scan karo.
 *
 * INTUITION (Soch):
 * -----------------
 * Answer me last word first aata hai.
 *
 * So agar hum right side se words extract karte hain,
 * toh naturally reverse order milta jayega.
 *
 * Example:
 *
 *   s = "  hello   world  "
 *
 *   right se first real word = "world"
 *   next real word           = "hello"
 *
 *   result = ["world", "hello"]
 *   join   = "world hello"
 *
 * TIME: O(n)
 *   - every character pointer se at most once cross hota hai
 *
 * SPACE: O(n)
 *   - extracted words/result store karne ke liye
 */

namespace ReverseWordsStringBetter {
  function reverseWords(s: string): string {
    const words: string[] = [];
    let index = s.length - 1;

    while (index >= 0) {
      while (index >= 0 && s[index] === ' ') {
        // Space answer ka word nahi hai.
        // Right se left parse karte waqt spaces skip karna means next real word tak jaana.
        index--;
      }

      if (index < 0) {
        break;
      }

      // Space skip ke baad index current word ke last character par hota hai.
      // Is boundary ko save karte hain, kyunki index ab word start dhundhne ke liye left move karega.
      const wordEnd = index;

      while (index >= 0 && s[index] !== ' ') {
        // Current word ke characters consume ho rahe hain.
        // Loop rukte hi index word ke pehle space par ya -1 par hoga.
        index--;
      }

      const wordStart = index + 1;

      // substring ka end exclusive hota hai.
      // wordEnd inclusive last char hai, so extract karne ke liye wordEnd + 1 use hota hai.
      const word = s.substring(wordStart, wordEnd + 1);

      // Right-to-left traversal ki wajah se first pushed word final answer ka first word hai.
      words.push(word);
    }

    return words.join(' ');
  }

  /**
   * ==========================================================
   * DRY RUN - MANUAL RIGHT TO LEFT PARSING
   * ==========================================================
   *
   * Example:
   * s = "  hello   world  "
   *
   * Index map:
   *
   * +--------------------------------------------------------+
   * | index: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15          |
   * | char:    _ _ h e l l o _ _ _ w  o  r  l  d  _         |
   * | plus index 16 is final trailing space                  |
   * +--------------------------------------------------------+
   *
   * Start:
   *   index = 16
   *   words = []
   *
   * ==========================================================
   * Iteration 1 - find "world"
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | index = 16, s[16] = space -> skip                     |
   * | index = 15, s[15] = space -> skip                     |
   * | index = 14, s[14] = 'd'                               |
   * | wordEnd = 14                                          |
   * | move left until space: d,l,r,o,w consumed             |
   * | index stops at 9                                      |
   * | wordStart = 10                                        |
   * | substring(10, 15) = "world"                           |
   * | words = ["world"]                                     |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * Iteration 2 - find "hello"
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | index = 9,8,7 are spaces -> skip                      |
   * | index = 6, s[6] = 'o'                                 |
   * | wordEnd = 6                                           |
   * | move left until space: o,l,l,e,h consumed             |
   * | index stops at 1                                      |
   * | wordStart = 2                                         |
   * | substring(2, 7) = "hello"                             |
   * | words = ["world", "hello"]                            |
   * +--------------------------------------------------------+
   *
   * Remaining:
   *
   * +--------------------------------------------------------+
   * | index = 1,0 are spaces -> skip                        |
   * | index becomes -1                                      |
   * | loop ends                                             |
   * +--------------------------------------------------------+
   *
   * Final:
   *   words.join(" ") = "world hello"
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Normal sentence:
   *    "the sky is blue" -> "blue is sky the"
   *
   * 2. Multiple spaces:
   *    "a good   example" -> "example good a"
   *
   * 3. Only spaces:
   *    "   " -> ""
   *
   * 4. Single word:
   *    "single" -> "single"
   */

  export function runTests(): void {
    console.log('Testing Reverse Words In A String - BETTER\n');

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

ReverseWordsStringBetter.runTests();
