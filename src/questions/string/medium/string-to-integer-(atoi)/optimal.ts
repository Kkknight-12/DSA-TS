/**
 * STRING TO INTEGER (ATOI) - OPTIMAL
 * ==================================
 *
 * PROBLEM:
 * String `s` ko 32-bit signed integer me convert karna hai.
 *
 * OPTIMAL IDEA:
 * Single pass parser with pre-operation overflow guard.
 *
 * INTUITION (Soch):
 * -----------------
 * Atoi ek controlled parser hai.
 * Har character ko tabhi consume karte hain jab woh current phase ke rule se match kare.
 *
 * Phases:
 *
 *   skip leading spaces
 *   consume optional sign
 *   consume digits
 *   stop at first invalid character
 *
 * Overflow ka core idea:
 *
 *   result = result * 10 + digit
 *
 * Ye operation karne se pehle check karo:
 *
 *   result > 214748364
 *   or result == 214748364 and digit too large
 *
 * Positive limit:
 *   2147483647 -> last allowed digit 7
 *
 * Negative limit:
 *   -2147483648 -> absolute last allowed digit 8
 *
 * TIME: O(n)
 *   - parser string ko left-to-right read karta hai until stop
 *
 * SPACE: O(1)
 *   - fixed variables only
 */

namespace StringToIntegerAtoiOptimal {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  const MAX_DIV_10 = Math.floor(INT_MAX / 10);

  function isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  function getDigit(char: string): number {
    return char.charCodeAt(0) - '0'.charCodeAt(0);
  }

  function clampValueForSign(sign: number): number {
    return sign === 1 ? INT_MAX : INT_MIN;
  }

  function crossesBoundary(result: number, digit: number, sign: number): boolean {
    if (result > MAX_DIV_10) {
      return true;
    }

    if (result < MAX_DIV_10) {
      return false;
    }

    const lastAllowedDigit = sign === 1 ? 7 : 8;

    // result already boundary prefix 214748364 hai.
    // Ab current digit decide karega final number valid rahega ya clamp hoga.
    return digit > lastAllowedDigit;
  }

  function myAtoi(s: string): number {
    let index = 0;
    let sign = 1;
    let result = 0;

    while (index < s.length && s[index] === ' ') {
      // Only leading spaces ignore hote hain.
      // Digit parsing start hone ke baad space non-digit ki tarah stop karega.
      index++;
    }

    if (index < s.length) {
      const possibleSign = s[index];

      if (possibleSign === '+' || possibleSign === '-') {
        // Sign token consume karne ke baad next character digit hona chahiye,
        // warna digit loop run nahi karega and result 0 rahega.
        sign = possibleSign === '-' ? -1 : 1;
        index++;
      }
    }

    while (index < s.length && isDigit(s[index])) {
      const digit = getDigit(s[index]);

      if (crossesBoundary(result, digit, sign)) {
        return clampValueForSign(sign);
      }

      // Safe append:
      // old digits left shift by one decimal place, current digit rightmost place par add hota hai.
      result = result * 10 + digit;
      index++;
    }

    return result * sign;
  }

  /**
   * ==========================================================
   * DRY RUN - SINGLE PASS WITH OVERFLOW GUARD
   * ==========================================================
   *
   * Example:
   * s = "-91283472332"
   *
   * Start:
   *   index = 0
   *   sign = 1
   *   result = 0
   *
   * ==========================================================
   * Phase 1: Sign
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | s[0] = '-'                                            |
   * | sign = -1                                             |
   * | index = 1                                             |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * Phase 2: Build number
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | read '9' -> result = 9                                |
   * | read '1' -> result = 91                               |
   * | read '2' -> result = 912                              |
   * | read '8' -> result = 9128                             |
   * | ...                                                   |
   * | result grows digit by digit                           |
   * +--------------------------------------------------------+
   *
   * Critical boundary moment:
   *
   * +--------------------------------------------------------+
   * | result = 912834723                                    |
   * | MAX_DIV_10 = 214748364                                |
   * | result > MAX_DIV_10                                   |
   * | next multiplication by 10 will definitely overflow     |
   * | sign = -1, so return INT_MIN                          |
   * +--------------------------------------------------------+
   *
   * Final answer = -2147483648
   *
   * ----------------------------------------------------------
   * Boundary exact example:
   * s = "-2147483648"
   *
   * +--------------------------------------------------------+
   * | before last digit: result = 214748364                  |
   * | digit = 8                                              |
   * | sign = -1                                              |
   * | lastAllowedDigit = 8                                   |
   * | digit > 8 ? false                                      |
   * | safe, result becomes 2147483648                        |
   * | final = -2147483648                                    |
   * +--------------------------------------------------------+
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty / only spaces:
   *    "" or "   " -> 0
   *
   * 2. Sign only:
   *    "-" -> 0
   *
   * 3. Sign then space:
   *    "+ 1" -> 0
   *
   * 4. Digits then letters:
   *    "4193 with words" -> 4193
   *
   * 5. Overflow:
   *    "2147483648" -> 2147483647
   */

  export function runTests(): void {
    console.log('Testing String To Integer (atoi) - OPTIMAL\n');

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

StringToIntegerAtoiOptimal.runTests();
