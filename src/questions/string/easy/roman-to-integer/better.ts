/**
 * ROMAN TO INTEGER - BETTER
 * =========================
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
 * Roman numerals me subtraction ka real rule ye hai:
 *
 *   agar current symbol ki value next symbol se chhoti hai,
 *   toh current subtract hoga
 *
 * Warna current add hoga.
 *
 * So explicit special pairs yaad rakhne ki need nahi.
 * Bas current aur next value compare kar lo.
 *
 * Examples:
 *
 *   "IV"
 *   I(1) < V(5)
 *   so I subtract hoga, V add hoga
 *   => -1 + 5 = 4
 *
 *   "VI"
 *   V(5) > I(1)
 *   so V add hoga, I add hoga
 *   => 5 + 1 = 6
 *
 * TIME:  O(n)
 *   - har character ko ek baar process karte hain
 *
 * SPACE: O(1)
 *   - fixed-size Roman map use hota hai
 */

namespace RomanToIntegerBetter {
  // Same fixed lookup as brute force.
  // Difference: yahan separate special-pair map nahi chahiye.
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

    for (let i = 0; i < s.length; i++) {
      // Current symbol ka contribution add hoga ya subtract,
      // ye right wale next symbol se decide hoga.
      const currentValue = ROMAN_VALUES[s[i]];

      // Last character ke right me kuch nahi hota, so nextValue = 0.
      // Isse last character naturally add ho jata hai.
      const nextValue = i + 1 < s.length ? ROMAN_VALUES[s[i + 1]] : 0;

      // Core Roman rule:
      // smaller-before-larger means subtraction.
      // Example: IV me I(1) < V(5), so I result se minus hoga.
      if (currentValue < nextValue) {
        result -= currentValue;
      } else {
        // Normal Roman flow: value same ya bigger ho toh additive role.
        // Example: VI me V(5) > I(1), so V add hoga.
        result += currentValue;
      }
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - LEFT TO RIGHT COMPARISON
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "MCMXCIV"
   *
   * Start:
   *   result = 0
   *
   * ═══════════════════════════════════════════════════════════
   * i = 0, current = 'M'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 1000                                      │
   * │ nextValue    = 100   (C)                                 │
   * │ 1000 < 100 ? no                                          │
   * │ so add 1000                                              │
   * │ result = 1000                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 1, current = 'C'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 100                                       │
   * │ nextValue    = 1000  (M)                                 │
   * │ 100 < 1000 ? yes                                         │
   * │ so subtract 100                                          │
   * │ result = 900                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 2, current = 'M'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 1000                                      │
   * │ nextValue    = 10   (X)                                  │
   * │ add 1000                                                 │
   * │ result = 1900                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 3, current = 'X'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 10                                        │
   * │ nextValue    = 100  (C)                                  │
   * │ 10 < 100 ? yes                                           │
   * │ subtract 10                                              │
   * │ result = 1890                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 4, current = 'C'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 100                                       │
   * │ nextValue    = 1   (I)                                   │
   * │ add 100                                                  │
   * │ result = 1990                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 5, current = 'I'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 1                                         │
   * │ nextValue    = 5   (V)                                   │
   * │ 1 < 5 ? yes                                              │
   * │ subtract 1                                               │
   * │ result = 1989                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 6, current = 'V'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentValue = 5                                         │
   * │ nextValue    = 0   (no next character)                   │
   * │ add 5                                                    │
   * │ result = 1994                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = 1994
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Pure additions:
   *    "VIII" -> 8
   *
   * 2. One subtraction pair:
   *    "IV" -> 4
   *
   * 3. Multiple subtraction spots:
   *    "MCMXCIV" -> 1994
   *
   * 4. Last character always naturally add hota hai:
   *    "VI" -> 6
   */

  export function runTests(): void {
    console.log('Testing Roman To Integer - BETTER\n');

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

RomanToIntegerBetter.runTests();
