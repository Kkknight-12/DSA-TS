// https://www.notion.so/Largest-Odd-Number-in-a-String-281a2680896880758575f26e0b8fc9e2

/**
 * LARGEST ODD NUMBER IN STRING - OPTIMAL
 * ======================================
 *
 * PROBLEM:
 * Ek numeric string `num` di hai.
 * Largest-valued odd integer substring return karni hai.
 * Agar koi odd integer substring nahi hai, toh empty string return karo.
 *
 * Examples:
 *   "52"     -> "5"
 *   "4206"   -> ""
 *   "35427"  -> "35427"
 *   "123456" -> "12345"
 *
 * INTUITION (Soch):
 * ─────────────────
 * Odd number ka rule simple hai:
 *
 *   Last digit odd hona chahiye.
 *
 * Ab maan lo koi odd substring `num[l...r]` answer ho sakti hai.
 * Uska last digit `num[r]` odd hoga.
 *
 * Lekin agar hum same end index `r` ke saath prefix `num[0...r]` le lein,
 * toh number aur bada ya equal ho jayega, kyunki left side ke more significant
 * digits bhi include ho jaate hain.
 *
 * Isliye answer hamesha:
 *
 *   start index 0 se rightmost odd digit tak ka prefix
 *
 * Visual:
 *
 *   num = "123456"
 *
 *   idx:    0  1  2  3  4  5
 *   digit:  1  2  3  4  5  6
 *                       ↑  ↑
 *                       │  even, skip
 *                rightmost odd digit
 *
 *   Answer = num.slice(0, 4 + 1) = "12345"
 *
 * ALGORITHM:
 * ──────────
 * 1. Right se left traverse karo.
 * 2. Pehla odd digit milte hi:
 *    - return num.slice(0, i + 1)
 * 3. Agar koi odd digit nahi mila:
 *    - return ""
 *
 * TIME:  O(n)
 *   - String ko at most ek baar right se left scan karte hain
 *
 * SPACE: O(1)
 *   - Output substring ko ignore karein toh extra space constant hai
 */

namespace LargestOddNumberOptimal {
  function isOddDigit(digit: string): boolean {
    return (digit.charCodeAt(0) - '0'.charCodeAt(0)) % 2 === 1;
  }

  function largestOddNumber(num: string): string {
    for (let i = num.length - 1; i >= 0; i--) {
      if (isOddDigit(num[i])) {
        return num.slice(0, i + 1);
      }
    }

    return '';
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: num = "123456"
   *
   * Initial:
   *
   *   idx:    0  1  2  3  4  5
   *   digit:  1  2  3  4  5  6
   *
   * Traverse from right:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i = 5, digit = "6"                                      │
   * │ 6 is even                                               │
   * │ Continue left                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i = 4, digit = "5"                                      │
   * │ 5 is odd                                                │
   * │ Return num.slice(0, 4 + 1) = "12345"                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = "12345"
   *
   * ───────────────────────────────────────────────────────────
   * Example: num = "4206"
   *
   *   i=3 -> "6" even
   *   i=2 -> "0" even
   *   i=1 -> "2" even
   *   i=0 -> "4" even
   *
   * No odd digit found -> return ""
   *
   * ═══════════════════════════════════════════════════════════
   * WHY RIGHTMOST ODD DIGIT WORKS
   * ═══════════════════════════════════════════════════════════
   *
   * For any valid odd substring:
   *
   *   num = "35427"
   *          └─ "5427" is odd
   *
   * Prefix ending at the same odd digit:
   *
   *   "35427"
   *
   * This prefix has extra digits on the left, so it is larger.
   * Therefore, once we find the rightmost odd digit, taking the full prefix
   * gives the largest possible odd number.
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Last digit odd:
   *    "35427" -> "35427"
   *
   * 2. No odd digit:
   *    "4206" -> ""
   *
   * 3. Only one digit:
   *    "7" -> "7"
   *    "8" -> ""
   *
   * 4. Long input:
   *    Works in O(n), no number conversion needed
   */

  export function runTests(): void {
    console.log('Testing Largest Odd Number in String - OPTIMAL\n');

    const tests: Array<{ num: string; expected: string; description: string }> =
      [
        {
          num: '52',
          expected: '5',
          description: 'Example 1: odd prefix before trailing even',
        },
        {
          num: '4206',
          expected: '',
          description: 'Example 2: no odd digit exists',
        },
        {
          num: '35427',
          expected: '35427',
          description: 'Example 3: full string is already odd',
        },
        {
          num: '10133',
          expected: '10133',
          description: 'Multiple odd digits, rightmost is at end',
        },
        {
          num: '123456',
          expected: '12345',
          description: 'Rightmost odd digit before final even digit',
        },
        {
          num: '8',
          expected: '',
          description: 'Single even digit',
        },
        {
          num: '7',
          expected: '7',
          description: 'Single odd digit',
        },
      ];

    let passed = 0;

    tests.forEach(({ num, expected, description }, index) => {
      const result = largestOddNumber(num);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  num="${num}"`);
      console.log(
        `  Expected: "${expected}" | Got: "${result}" -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

LargestOddNumberOptimal.runTests();