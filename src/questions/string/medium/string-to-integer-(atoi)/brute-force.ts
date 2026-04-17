/**
 * STRING TO INTEGER (ATOI) - BRUTE FORCE
 * ======================================
 *
 * PROBLEM:
 * String `s` ko 32-bit signed integer me convert karna hai.
 *
 * Parsing rules:
 *   1. leading spaces skip karo
 *   2. optional sign read karo
 *   3. digits read karo
 *   4. first non-digit par stop karo
 *   5. overflow/underflow ko clamp karo
 *
 * Examples:
 *   "42"             -> 42
 *   "   -42"         -> -42
 *   "4193 with words" -> 4193
 *   "words and 987" -> 0
 *
 * INTUITION (Soch):
 * -----------------
 * Ye direct `parseInt` problem nahi hai.
 * Hume parser ke rules manually follow karne hain.
 *
 * So hum phases me sochenge:
 *
 *   spaces -> sign -> digits -> stop
 *
 * Number build karte waqt:
 *
 *   result = result * 10 + digit
 *
 * Example:
 *
 *   "123"
 *   result = 0
 *   read 1 -> 0 * 10 + 1 = 1
 *   read 2 -> 1 * 10 + 2 = 12
 *   read 3 -> 12 * 10 + 3 = 123
 *
 * TIME: O(n)
 *   - each character at most once read hota hai
 *
 * SPACE: O(1)
 *   - sirf variables use hote hain
 */

namespace StringToIntegerAtoiBruteForce {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  const MAX_DIV_10 = Math.floor(INT_MAX / 10);

  function isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  function charToDigit(char: string): number {
    return char.charCodeAt(0) - '0'.charCodeAt(0);
  }

  function wouldOverflow(result: number, digit: number, sign: number): boolean {
    if (result > MAX_DIV_10) {
      return true;
    }

    if (result === MAX_DIV_10) {
      // Positive upper boundary: 2147483647, last allowed digit = 7.
      // Negative lower boundary: -2147483648, absolute last allowed digit = 8.
      return sign === 1 ? digit > 7 : digit > 8;
    }

    return false;
  }

  function myAtoi(s: string): number {
    let index = 0;
    let sign = 1;
    let result = 0;

    while (index < s.length && s[index] === ' ') {
      // Leading spaces number ka part nahi hote.
      // Atoi rules ke according unhe ignore karke first meaningful char tak jaana hai.
      index++;
    }

    if (index < s.length && (s[index] === '+' || s[index] === '-')) {
      // Sign sirf spaces ke baad first meaningful position par valid hai.
      // Is sign ko consume karte hi digit parsing next character se start hogi.
      sign = s[index] === '-' ? -1 : 1;
      index++;
    }

    while (index < s.length) {
      const char = s[index];

      if (!isDigit(char)) {
        // First non-digit parsing ko stop karta hai.
        // Uske baad ke characters answer ko affect nahi karte.
        break;
      }

      const digit = charToDigit(char);

      if (wouldOverflow(result, digit, sign)) {
        return sign === 1 ? INT_MAX : INT_MIN;
      }

      // Current digit ko number ke right side append kar rahe hain.
      // Previous result one decimal place left shift hota hai via * 10.
      result = result * 10 + digit;
      index++;
    }

    return result * sign;
  }

  /**
   * ==========================================================
   * DRY RUN - MANUAL PARSER
   * ==========================================================
   *
   * Example:
   * s = "   -42 with words"
   *
   * Start:
   *   index = 0
   *   sign = 1
   *   result = 0
   *
   * ==========================================================
   * Phase 1: Skip spaces
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | index 0 = space -> skip                               |
   * | index 1 = space -> skip                               |
   * | index 2 = space -> skip                               |
   * | index 3 = '-'                                         |
   * | first meaningful char found                           |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * Phase 2: Read sign
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | s[3] = '-'                                            |
   * | sign = -1                                             |
   * | index moves to 4                                      |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * Phase 3: Parse digits
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | index = 4, char = '4'                                 |
   * | digit = 4                                             |
   * | result = 0 * 10 + 4 = 4                               |
   * +--------------------------------------------------------+
   *
   * +--------------------------------------------------------+
   * | index = 5, char = '2'                                 |
   * | digit = 2                                             |
   * | result = 4 * 10 + 2 = 42                              |
   * +--------------------------------------------------------+
   *
   * +--------------------------------------------------------+
   * | index = 6, char = space                               |
   * | non-digit found -> stop parsing                       |
   * +--------------------------------------------------------+
   *
   * Final:
   *   result * sign = 42 * -1 = -42
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. No digits:
   *    "words and 987" -> 0
   *
   * 2. Sign without digits:
   *    "+" -> 0
   *
   * 3. Invalid sign pattern:
   *    "+-12" -> 0
   *
   * 4. Stop after digits:
   *    "4193 with words" -> 4193
   *
   * 5. Overflow:
   *    "91283472332" -> 2147483647
   *
   * 6. Underflow:
   *    "-91283472332" -> -2147483648
   */

  export function runTests(): void {
    console.log('Testing String To Integer (atoi) - BRUTE FORCE\n');

    const tests: Array<{
      s: string;
      expected: number;
      description: string;
    }> = [
      { s: '42', expected: 42, description: 'Simple positive number' },
      { s: '   -42', expected: -42, description: 'Leading spaces and negative sign' },
      { s: '4193 with words', expected: 4193, description: 'Stop at first non-digit' },
      { s: 'words and 987', expected: 0, description: 'Starts with non-digit' },
      { s: '-91283472332', expected: INT_MIN, description: 'Negative underflow clamp' },
      { s: '91283472332', expected: INT_MAX, description: 'Positive overflow clamp' },
      { s: '+1', expected: 1, description: 'Explicit positive sign' },
      { s: '+-12', expected: 0, description: 'Invalid sign sequence' },
      { s: '00000-42a1234', expected: 0, description: 'Zeros then stop at minus' },
      { s: '2147483648', expected: INT_MAX, description: 'Just above INT_MAX' },
      { s: '-2147483648', expected: INT_MIN, description: 'Exact INT_MIN allowed' },
      { s: '   +0 123', expected: 0, description: 'Stop after zero before space' },
    ];

    let passed = 0;

    tests.forEach(({ s, expected, description }, index) => {
      const result = myAtoi(s);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  s="${s}"`);
      console.log(
        `  Expected: ${expected} | Got: ${result} -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

StringToIntegerAtoiBruteForce.runTests();
