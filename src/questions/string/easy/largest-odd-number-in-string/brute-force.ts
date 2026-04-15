/**
 * LARGEST ODD NUMBER IN STRING - BRUTE FORCE
 * ==========================================
 *
 * PROBLEM:
 * Ek numeric string `num` di hai.
 * Aisi non-empty substring return karo jo odd number ho aur value me sabse badi ho.
 * Agar koi odd substring possible nahi hai, toh empty string return karo.
 *
 * Example:
 *   "52"    -> "5"
 *   "4206"  -> ""
 *   "35427" -> "35427"
 *
 * INTUITION (Soch):
 * ─────────────────
 * Odd number identify karne ka simplest rule:
 *
 *   Last digit odd hai -> poora number odd hai.
 *
 * Brute force approach:
 * - Har possible substring generate karo
 * - Jiski last digit odd ho, woh valid candidate hai
 * - Sab valid candidates me largest numeric string choose karo
 *
 * IMPORTANT:
 * `Number(substring)` use nahi karenge, kyunki input bahut bada ho sakta hai.
 * Isliye numeric strings compare karenge:
 * - Pehle leading zeros ignore karke length compare
 * - Same length ho toh lexicographic compare
 *
 * Visual:
 *
 *   num = "35427"
 *
 *   substrings ending at odd digit:
 *
 *   end=0 ('3'):  "3"
 *   end=2 ('4'):  skip, even
 *   end=4 ('7'):  "35427", "5427", "427", "27", "7"
 *
 *   Largest among all odd substrings = "35427"
 *
 * TIME:  O(n^3)
 *   - O(n^2) substrings
 *   - slicing/comparing a substring can take O(n)
 *
 * SPACE: O(n)
 *   - current substring + best answer storage
 */

namespace LargestOddNumberBruteForce {
  function isOddDigit(digit: string): boolean {
    return Number(digit) % 2 === 1;
  }

  function normalizeNumberString(value: string): string {
    const normalized = value.replace(/^0+/, '');
    return normalized === '' ? '0' : normalized;
  }

  function isGreaterNumericString(
    candidate: string,
    currentBest: string
  ): boolean {
    const normalizedCandidate = normalizeNumberString(candidate);
    const normalizedBest = normalizeNumberString(currentBest);

    if (normalizedCandidate.length !== normalizedBest.length) {
      return normalizedCandidate.length > normalizedBest.length;
    }

    if (normalizedCandidate !== normalizedBest) {
      return normalizedCandidate > normalizedBest;
    }

    // Same numeric value. Prefer the longer original substring for consistency.
    return candidate.length > currentBest.length;
  }

  function largestOddNumber(num: string): string {
    let best = '';

    for (let start = 0; start < num.length; start++) {
      for (let end = start; end < num.length; end++) {
        if (!isOddDigit(num[end])) {
          continue;
        }

        const substring = num.slice(start, end + 1);

        if (best === '' || isGreaterNumericString(substring, best)) {
          best = substring;
        }
      }
    }

    return best;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: num = "52"
   *
   * All substrings:
   *
   * start=0:
   * ┌──────────────────────────────────────────────────────────┐
   * │ end=0 -> substring="5"                                   │
   * │ last digit 5 is odd                                      │
   * │ best = "5"                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ end=1 -> substring="52"                                  │
   * │ last digit 2 is even -> skip                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * start=1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ end=1 -> substring="2"                                   │
   * │ last digit 2 is even -> skip                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = "5"
   *
   * ───────────────────────────────────────────────────────────
   * Example: num = "35427"
   *
   * Valid odd candidates include:
   *   "3", "35", "35427", "5", "5427", "427", "27", "7"
   *
   * Largest numeric string:
   *   "35427"
   *
   * Return "35427"
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. No odd digit:
   *    "4206" -> ""
   *
   * 2. Last digit already odd:
   *    "35427" -> whole string
   *
   * 3. Only one digit:
   *    "7" -> "7"
   *    "8" -> ""
   *
   * 4. Odd digit appears before trailing evens:
   *    "123456" -> "12345"
   */

  export function runTests(): void {
    console.log('Testing Largest Odd Number in String - BRUTE FORCE\n');

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

LargestOddNumberBruteForce.runTests();
