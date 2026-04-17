/**
 * REVERSE WORDS IN A STRING - OPTIMAL CONCEPT
 * ===========================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Words ka order reverse karna hai and spaces normalize karne hain.
 *
 * IMPORTANT JS NOTE:
 * JavaScript/TypeScript strings immutable hoti hain.
 * True in-place O(1) string mutation possible nahi hoti.
 *
 * Ye file optimal mutable-array concept explain karti hai:
 *   1. spaces normalize
 *   2. whole string reverse
 *   3. each word reverse
 *
 * Mutable languages like C++ me ye O(1) extra space concept hota hai.
 * TypeScript me char array banegi, so practical space O(n) hai.
 *
 * INTUITION (Soch):
 * -----------------
 * Agar whole string reverse kar do:
 *
 *   "hello world" -> "dlrow olleh"
 *
 * Word order correct ho gaya:
 *
 *   world before hello
 *
 * But characters ulte ho gaye.
 * So har word ko individually reverse karo:
 *
 *   "dlrow olleh" -> "world hello"
 *
 * TIME: O(n)
 *   - normalize, full reverse, word reverse all linear passes
 *
 * SPACE:
 *   - O(1) in mutable string/char-array languages if input mutable
 *   - O(n) in TypeScript because string -> array conversion needed
 */

namespace ReverseWordsStringOptimalConcept {
  function normalizeSpaces(s: string): string[] {
    const chars: string[] = [];
    let index = 0;

    while (index < s.length) {
      while (index < s.length && s[index] === ' ') {
        // Multiple/leading spaces final normalized string ka part nahi hain.
        // Skip karke next real word tak ja rahe hain.
        index++;
      }

      if (index >= s.length) {
        break;
      }

      if (chars.length > 0) {
        // Pehle se ek word output me hai.
        // Next word se pehle exactly one space chahiye.
        chars.push(' ');
      }

      while (index < s.length && s[index] !== ' ') {
        // Current word ke characters order preserve karte hue normalized array me copy ho rahe hain.
        chars.push(s[index]);
        index++;
      }
    }

    return chars;
  }

  function reverseRange(chars: string[], left: number, right: number): void {
    while (left < right) {
      [chars[left], chars[right]] = [chars[right], chars[left]];

      // Current outer pair swap ho chuka.
      // Ab remaining inner range reverse karne ke liye pointers center ki taraf move karte hain.
      left++;
      right--;
    }
  }

  function reverseEachWord(chars: string[]): void {
    let wordStart = 0;

    for (let index = 0; index <= chars.length; index++) {
      if (index === chars.length || chars[index] === ' ') {
        // index current word ke baad wali boundary par hai.
        // Word ka inclusive end index - 1 hota hai.
        reverseRange(chars, wordStart, index - 1);

        // Next word space ke baad start hoga.
        wordStart = index + 1;
      }
    }
  }

  function reverseWords(s: string): string {
    const chars = normalizeSpaces(s);

    if (chars.length < 2) {
      return chars.join('');
    }

    // Whole reverse se word order correct ho jata hai,
    // but har word ke characters ulte ho jate hain.
    reverseRange(chars, 0, chars.length - 1);

    // Har word reverse karne se characters readable order me wapas aa jate hain.
    reverseEachWord(chars);

    return chars.join('');
  }

  /**
   * ==========================================================
   * DRY RUN - REVERSE WHOLE, THEN EACH WORD
   * ==========================================================
   *
   * Example:
   * s = "  hello   world  "
   *
   * Step 1: normalize spaces
   *
   * +--------------------------------------------------------+
   * | chars = ['h','e','l','l','o',' ','w','o','r','l','d'] |
   * | string = "hello world"                                |
   * +--------------------------------------------------------+
   *
   * Step 2: reverse whole array
   *
   * +--------------------------------------------------------+
   * | "hello world" -> "dlrow olleh"                        |
   * +--------------------------------------------------------+
   *
   * Word order is now correct:
   *
   * +--------------------------------------------------------+
   * | "world" side is before "hello" side                    |
   * | but characters inside words are reversed               |
   * +--------------------------------------------------------+
   *
   * Step 3: reverse each word
   *
   * +--------------------------------------------------------+
   * | first word:  "dlrow" -> "world"                       |
   * | second word: "olleh" -> "hello"                       |
   * +--------------------------------------------------------+
   *
   * Final answer:
   *
   * +--------------------------------------------------------+
   * | "world hello"                                         |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Leading/trailing spaces:
   *    "  hello world  " -> "world hello"
   *
   * 2. Multiple spaces:
   *    "a good   example" -> "example good a"
   *
   * 3. Only spaces:
   *    "   " -> ""
   *
   * 4. Single word:
   *    "single" -> "single"
   *
   * 5. Empty string:
   *    "" -> ""
   */

  export function runTests(): void {
    console.log('Testing Reverse Words In A String - OPTIMAL CONCEPT\n');

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

ReverseWordsStringOptimalConcept.runTests();
