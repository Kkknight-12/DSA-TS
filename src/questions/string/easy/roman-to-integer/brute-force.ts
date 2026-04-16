/**
 * ROMAN TO INTEGER - BRUTE FORCE
 * ==============================
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
 * Roman symbols:
 *   I=1, V=5, X=10, L=50, C=100, D=500, M=1000
 *
 * Special subtraction pairs:
 *   IV=4, IX=9, XL=40, XC=90, CD=400, CM=900
 *
 * INTUITION (Soch):
 * ─────────────────
 * Brute force soch:
 * Roman numerals ke 6 subtraction pairs explicitly yaad rakho.
 *
 * Fir left se right traverse karke:
 *
 *   current + next ko pair ke roop me check karo
 *   agar wo special pair hai, uski direct value add karo
 *   warna single symbol ki value add karo
 *
 * Visual:
 *
 *   s = "MCMXCIV"
 *
 *   tokens as seen by brute force:
 *   "M"  "CM"  "XC"  "IV"
 *
 *   values:
 *   1000 + 900 + 90 + 4 = 1994
 *
 * TIME:  O(n)
 *   - string ek baar traverse hoti hai
 *   - har step par constant-time map lookup hota hai
 *
 * SPACE: O(1)
 *   - maps fixed-size hain
 *
 * Why brute force?
 *   Kyunki subtraction rule derive nahi kar rahe.
 *   Hum special cases ko explicitly list karke solve kar rahe hain.
 */

namespace RomanToIntegerBruteForce {
  // Fixed Roman symbol lookup.
  // WHY: input valid Roman numeral hai, so every character must be one of these.
  const ROMAN_VALUES: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Brute-force identity: subtraction cases ko explicitly list kar rahe hain.
  // Better/optimal files ye same behavior comparison rule se derive karte hain.
  const SPECIAL_PAIR_VALUES: Record<string, number> = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  };

  function romanToInt(s: string): number {
    let result = 0;

    // Manual index isliye use kar rahe hain kyunki kabhi ek symbol consume hoga
    // aur kabhi special pair milne par do symbols ek saath consume honge.
    let index = 0;

    while (index < s.length) {
      // Special pair banane ke liye current ke saath next character bhi chahiye.
      // Last character par ye check skip hoga, warna out-of-bounds read hota.
      if (index + 1 < s.length) {
        const possiblePair = s[index] + s[index + 1];

        // Agar pair special map me mil gaya, toh current aur next alag-alag
        // process nahi honge. Dono milkar ek numeric token banate hain.
        // Example: "CM" ko C + M nahi, direct 900 treat karna hai.
        if (SPECIAL_PAIR_VALUES[possiblePair] !== undefined) {
          result += SPECIAL_PAIR_VALUES[possiblePair];

          // Pair ke dono symbols consume ho chuke hain, isliye 2-step jump.
          // Agar sirf index++ karenge toh second symbol dobara count ho jayega.
          index += 2;
          continue;
        }
      }

      // Agar special pair nahi bana, current symbol standalone additive token hai.
      // Example: "M" in "MC..." contributes 1000 by itself.
      result += ROMAN_VALUES[s[index]];

      // Single symbol consume hua, so one-step move.
      index++;
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - TOKEN BY TOKEN
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "MCMXCIV"
   *
   * Start:
   *   result = 0
   *   index = 0
   *
   * ═══════════════════════════════════════════════════════════
   * index = 0
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ possiblePair = "MC"                                      │
   * │ "MC" special pair nahi hai                               │
   * │ so single "M" lo -> 1000                                 │
   * │ result = 1000                                            │
   * │ index = 1                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * index = 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ possiblePair = "CM"                                      │
   * │ "CM" special pair hai -> 900                             │
   * │ result = 1000 + 900 = 1900                               │
   * │ index += 2 -> 3                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * index = 3
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ possiblePair = "XC"                                      │
   * │ "XC" special pair hai -> 90                              │
   * │ result = 1900 + 90 = 1990                                │
   * │ index += 2 -> 5                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * index = 5
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ possiblePair = "IV"                                      │
   * │ "IV" special pair hai -> 4                               │
   * │ result = 1990 + 4 = 1994                                 │
   * │ index += 2 -> 7                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * index == s.length
   * Final answer = 1994
   *
   * ───────────────────────────────────────────────────────────
   * Small example:
   * s = "III"
   *
   *   "II" special pair nahi
   *   add I -> 1
   *   next I -> 2
   *   next I -> 3
   *
   * Final answer = 3
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Only normal additions:
   *    "VIII" -> 8
   *
   * 2. Single subtraction pair:
   *    "IV" -> 4
   *
   * 3. Mixed normal + subtraction:
   *    "LVIII" -> 58
   *
   * 4. Multiple subtraction pairs:
   *    "MCMXCIV" -> 1994
   */

  export function runTests(): void {
    console.log('Testing Roman To Integer - BRUTE FORCE\n');

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
      { s: 'CDXLIV', expected: 444, description: 'Multiple special pairs' },
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

RomanToIntegerBruteForce.runTests();
