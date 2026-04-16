/**
 * ROMAN TO INTEGER - OPTIMAL
 * ==========================
 *
 * PROBLEM:
 * Roman numeral string `s` diya hai.
 * Hume usko integer me convert karna hai.
 *
 * Examples:
 *   "III"     -> 3
 *   "LVIII"   -> 58
 *   "MCMXCIV" -> 1994
 *
 * INTUITION (Soch):
 * ─────────────────
 * Left-to-right approach me hum next character ko dekh rahe the.
 * Right-to-left approach me next dekhne ki bhi need nahi.
 *
 * Bas ek question:
 *
 *   current value right side wale previous value se chhoti hai ya nahi?
 *
 * Rule:
 *
 *   current >= previousRightValue -> add
 *   current < previousRightValue  -> subtract
 *
 * Why this works:
 * Agar current symbol right side ke symbol se chhota hai,
 * matlab original numeral me wo kisi bade symbol se pehle tha,
 * so subtraction role me hai.
 *
 * Example:
 *
 *   s = "MCMXCIV"
 *
 *   right to left:
 *   V add
 *   I subtract
 *   C add
 *   X subtract
 *   M add
 *   C subtract
 *   M add
 *
 *   total = 1994
 *
 * TIME:  O(n)
 *   - string ek baar traverse hoti hai
 *
 * SPACE: O(1)
 *   - bas result aur previous value track hota hai
 */

namespace RomanToIntegerOptimal {
  // Roman symbol lookup fixed-size hai, so extra space constant maana jata hai.
  const ROMAN_VALUES: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  function romanToInt(s: string): number {
    let result = 0;

    // Right-to-left traversal me ye "current ke just right wale symbol ki value"
    // represent karta hai. Starting 0 isliye, kyunki rightmost ke right me kuch nahi.
    let previousRightValue = 0;

    for (let i = s.length - 1; i >= 0; i--) {
      const currentValue = ROMAN_VALUES[s[i]];

      // Right-to-left version of the same rule:
      // agar current apne right wale symbol se chhota hai,
      // toh original string me current bade symbol se pehle tha.
      // That means current subtractive role me hai.
      if (currentValue < previousRightValue) {
        result -= currentValue;
      } else {
        // Current right wale symbol se bada/equal hai,
        // so ye normal additive contribution deta hai.
        result += currentValue;
      }

      // Next iteration left wale symbol par jayegi.
      // Uske liye current symbol hi immediate-right reference banega.
      previousRightValue = currentValue;
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - RIGHT TO LEFT FLOW
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "MCMXCIV"
   *
   * Start:
   *   result = 0
   *   previousRightValue = 0
   *
   * ═══════════════════════════════════════════════════════════
   * i = 6, current = 'V'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 5                                         │
   * │ previousRightValue = 0                                   │
   * │ 5 < 0 ? no                                               │
   * │ add 5                                                    │
   * │ result = 5                                               │
   * │ previousRightValue = 5                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 5, current = 'I'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 1                                         │
   * │ previousRightValue = 5                                   │
   * │ 1 < 5 ? yes                                              │
   * │ subtract 1                                               │
   * │ result = 4                                               │
   * │ previousRightValue = 1                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 4, current = 'C'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 100                                       │
   * │ previousRightValue = 1                                   │
   * │ 100 < 1 ? no                                             │
   * │ add 100                                                  │
   * │ result = 104                                             │
   * │ previousRightValue = 100                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 3, current = 'X'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 10                                        │
   * │ previousRightValue = 100                                 │
   * │ 10 < 100 ? yes                                           │
   * │ subtract 10                                              │
   * │ result = 94                                              │
   * │ previousRightValue = 10                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 2, current = 'M'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 1000                                      │
   * │ previousRightValue = 10                                  │
   * │ add 1000                                                 │
   * │ result = 1094                                            │
   * │ previousRightValue = 1000                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 1, current = 'C'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 100                                       │
   * │ previousRightValue = 1000                                │
   * │ subtract 100                                             │
   * │ result = 994                                             │
   * │ previousRightValue = 100                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 0, current = 'M'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 1000                                      │
   * │ previousRightValue = 100                                 │
   * │ add 1000                                                 │
   * │ result = 1994                                            │
   * │ previousRightValue = 1000                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = 1994
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Pure additions:
   *    "III" -> 3
   *
   * 2. One subtraction pair:
   *    "IV" -> 4
   *
   * 3. Many mixed cases:
   *    "MCMXCIV" -> 1994
   *
   * 4. Rightmost character always add hota hai:
   *    because previousRightValue initially 0 hota hai
   */

  export function runTests(): void {
    console.log('Testing Roman To Integer - OPTIMAL\n');

    const tests: Array<{
      s: string;
      expected: number;
      description: string;
    }> = [
      { s: 'III', expected: 3, description: 'Only repeated additions' },
      { s: 'LVIII', expected: 58, description: 'Mixed additive symbols' },
      {
        s: 'MCMXCIV',
        expected: 1994,
        description: 'Classic mixed subtraction example',
      },
      { s: 'IV', expected: 4, description: 'Smallest subtraction pair' },
      { s: 'IX', expected: 9, description: 'Subtraction with ten' },
      { s: 'XL', expected: 40, description: 'Subtraction in tens place' },
      { s: 'CDXLIV', expected: 444, description: 'Multiple special-looking spots' },
      { s: 'MMXXIV', expected: 2024, description: 'Modern year style numeral' },
      { s: 'XLIX', expected: 49, description: 'Two subtraction pairs in one numeral' },
    ];

    let passed = 0;

    tests.forEach(({ s, expected, description }, index) => {
      const result = romanToInt(s);
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

RomanToIntegerOptimal.runTests();
