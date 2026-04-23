/**
 * POW(X, N) - OPTIMAL ITERATIVE BINARY EXPONENTIATION
 * ===================================================
 *
 * PROBLEM:
 * `x^n` calculate karna hai, but recursion stack use nahi karna.
 *
 * INTUITION (Soch):
 * -----------------
 * Recursive binary exponentiation exponent ko half karta hai.
 * Iterative version bhi same kaam karta hai, bas loop ke through.
 *
 * Key idea:
 *
 *   exponent odd hai  -> current base answer me include hoga
 *   exponent even hai -> current base skip hoga
 *
 * Phir har step par:
 *
 *   base = base * base
 *   exponent = floor(exponent / 2)
 *
 * Example:
 *
 *   10 = 8 + 2
 *   2^10 = 2^8 * 2^2
 *
 * Loop me base values:
 *
 *   2^1, 2^2, 2^4, 2^8
 *
 * Hum sirf `2^2` aur `2^8` multiply karenge.
 *
 * Algorithm:
 * ----------
 * 1. Agar `n === 0`, return `1`.
 * 2. `exponent = abs(n)` store karo.
 * 3. `base = x` and `result = 1` initialize karo.
 * 4. Jab tak `exponent > 0`, loop chalao.
 * 5. Agar `exponent` odd hai, current `base` ko result me multiply karo.
 * 6. `base` ko square karo, because next bit double power represent karega.
 * 7. `exponent = floor(exponent / 2)` karo, because current bit consume ho gayi.
 * 8. Agar original `n` negative tha, return `1 / result`.
 * 9. Otherwise result return karo.
 *
 * TIME: O(log |n|)
 * SPACE: O(1)
 */

namespace PowXNOptimalIterative {
  export function myPow(x: number, n: number): number {
    if (n === 0) {
      // Zero exponent me koi base copy multiply nahi hoti.
      // Multiplication identity 1 hi final answer hota hai.
      return 1;
    }

    let exponent = Math.abs(n);
    let base = x;
    let result = 1;

    while (exponent > 0) {
      if (exponent % 2 === 1) {
        // Odd exponent ka matlab current binary bit 1 hai.
        // Current base answer ka required power hai, so result me include karte hain.
        result *= base;
      }

      // Current bit process ho chuki hai.
      // Next bit double power represent karegi, so base square hota hai:
      // x^1 -> x^2 -> x^4 -> x^8.
      base *= base;

      // Exponent ko half karna binary right shift jaisa hai.
      // Isse current least-significant bit consume ho jati hai.
      exponent = Math.floor(exponent / 2);
    }

    if (n < 0) {
      // Original exponent negative tha, so positive power ka reciprocal answer hai.
      return 1 / result;
    }

    return result;
  }

  /**
   * ==========================================================
   * DRY RUN - ITERATIVE BINARY EXPONENTIATION
   * ==========================================================
   *
   * Example:
   * x = 2, n = 10
   *
   * Meaning:
   *
   *   10 = 8 + 2
   *   2^10 = 2^8 * 2^2
   *
   * Initial:
   *
   * ┌──────────────────────────────────────────────┐
   * │ result = 1                                   │
   * │ base = 2                                     │
   * │ exponent = 10                                │
   * └──────────────────────────────────────────────┘
   *
   * Iterations:
   *
   * ┌──────┬──────────┬──────────────┬──────────────┬──────────────┐
   * │ step │ exponent │ odd?         │ result       │ next base    │
   * ├──────┼──────────┼──────────────┼──────────────┼──────────────┤
   * │ 1    │ 10       │ no, skip     │ 1            │ 2^2 = 4      │
   * │ 2    │ 5        │ yes, include │ 1 * 4 = 4    │ 2^4 = 16     │
   * │ 3    │ 2        │ no, skip     │ 4            │ 2^8 = 256    │
   * │ 4    │ 1        │ yes, include │ 4 * 256=1024 │ 2^16         │
   * └──────┴──────────┴──────────────┴──────────────┴──────────────┘
   *
   * Final:
   * result = 1024
   *
   * ==========================================================
   * WHY ODD ME MULTIPLY KARTE HAIN?
   * ==========================================================
   *
   * Suppose exponent = 13.
   *
   *   13 = 8 + 4 + 1
   *
   * So:
   *
   *   x^13 = x^8 * x^4 * x^1
   *
   * Loop right side se bits consume karta hai:
   *
   * ┌──────────┬──────────────┬──────────────────────────────┐
   * │ exponent │ odd/even     │ meaning                      │
   * ├──────────┼──────────────┼──────────────────────────────┤
   * │ 13       │ odd          │ include x^1                  │
   * │ 6        │ even         │ skip x^2                     │
   * │ 3        │ odd          │ include x^4                  │
   * │ 1        │ odd          │ include x^8                  │
   * └──────────┴──────────────┴──────────────────────────────┘
   *
   * Included powers:
   *
   *   x^1 * x^4 * x^8 = x^13
   *
   * ==========================================================
   * NEGATIVE EXPONENT FLOW
   * ==========================================================
   *
   * myPow(2, -3)
   *
   * ┌──────────────────────────────────────────────┐
   * │ exponent = abs(-3) = 3                       │
   * │ result builds 2^3 = 8                        │
   * │ original n < 0, so return 1 / 8 = 0.125      │
   * └──────────────────────────────────────────────┘
   *
   * ==========================================================
   * STATE INVARIANT
   * ==========================================================
   *
   * During loop, we are preserving the same final meaning:
   *
   *   result * base^exponent = original x^abs(n)
   *
   * If exponent is odd:
   *
   *   one copy of base cannot be paired into square,
   *   so we move it into result.
   *
   * Then base squares and exponent halves.
   */

  type TestCase = {
    x: number;
    n: number;
    expected: number;
    label: string;
  };

  function nearlyEqual(actual: number, expected: number): boolean {
    return Math.abs(actual - expected) < 0.00001;
  }

  export function runTests(): void {
    const tests: TestCase[] = [
      { x: 2, n: 10, expected: 1024, label: "basic positive exponent" },
      { x: 2.1, n: 3, expected: 9.261, label: "decimal base" },
      { x: 2, n: -2, expected: 0.25, label: "negative exponent" },
      { x: 5, n: 0, expected: 1, label: "zero exponent" },
      { x: 3.5, n: 1, expected: 3.5, label: "exponent one" },
      { x: 2, n: 13, expected: 8192, label: "odd exponent binary pattern" },
      { x: 2, n: 30, expected: 1073741824, label: "large exponent" },
      { x: -2, n: 5, expected: -32, label: "negative base odd exponent" },
      { x: -2, n: 4, expected: 16, label: "negative base even exponent" },
      { x: 1, n: -2147483648, expected: 1, label: "minimum exponent with base one" },
      { x: -1, n: -2147483648, expected: 1, label: "minimum exponent with minus one" },
    ];

    let passed = 0;

    console.log("Pow(x, n) - Optimal Iterative");
    console.log("====================================");

    for (const test of tests) {
      const actual = myPow(test.x, test.n);
      const ok = nearlyEqual(actual, test.expected);

      if (ok) {
        passed++;
      }

      console.log(`${ok ? "PASS" : "FAIL"} | ${test.label}`);
      console.log(
        `  input: x=${test.x}, n=${test.n}, expected=${test.expected}, actual=${actual}`
      );
    }

    console.log("====================================");
    console.log(`Passed ${passed}/${tests.length} tests`);
  }
}

PowXNOptimalIterative.runTests();

export { PowXNOptimalIterative };
