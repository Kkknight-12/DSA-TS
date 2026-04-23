/**
 * POW(X, N) - BRUTE FORCE
 * =======================
 *
 * PROBLEM:
 * `x^n` calculate karna hai.
 *
 * Example:
 *   x = 2, n = 5
 *   answer = 32
 *
 * INTUITION (Soch):
 * -----------------
 * Power ka most basic meaning repeated multiplication hota hai.
 *
 *   2^5 = 2 * 2 * 2 * 2 * 2
 *
 * Hum `result = 1` se start karte hain, because multiplication me
 * `1` neutral value hoti hai.
 *
 * Negative exponent ke liye:
 *
 *   2^-3 = 1 / 2^3 = (1/2)^3
 *
 * So negative exponent ko positive banane se pehle base ko reciprocal
 * bana sakte hain.
 *
 * Algorithm:
 * ----------
 * 1. Agar `n === 0`, answer `1` return karo.
 * 2. Agar `n < 0`, base ko `1 / x` me convert karo.
 * 3. Negative exponent ko positive count me convert karo.
 * 4. `result = 1` initialize karo.
 * 5. Loop ko `exponent` times chalao.
 * 6. Har iteration me current base ko result me multiply karo.
 * 7. Loop ke baad result return karo.
 *
 * TIME: O(|n|)
 * SPACE: O(1)
 *
 * NOTE:
 * Ye approach understanding ke liye useful hai, but large `n` par slow hai.
 */

namespace PowXNBruteForce {
  export function myPow(x: number, n: number): number {
    if (n === 0) {
      // `x^0` ka matlab zero copies of x multiply karna.
      // Empty multiplication ka neutral result 1 hota hai.
      return 1;
    }

    if (x === 1) {
      // 1 ko kitni bhi baar multiply karo, value 1 hi rahegi.
      return 1;
    }

    if (x === -1) {
      // -1 ka sign exponent parity par depend karta hai.
      // Even exponent me pairs ban jaate hain: (-1 * -1) = 1.
      return n % 2 === 0 ? 1 : -1;
    }

    let base = x;
    let exponent = n;

    if (exponent < 0) {
      // Negative power reciprocal form hoti hai.
      // 2^-3 ko directly handle karne ke bajay (1/2)^3 calculate karte hain.
      base = 1 / base;
      exponent = -exponent;
    }

    let result = 1;

    for (let count = 1; count <= exponent; count++) {
      // `count` batata hai ki ab tak base ki kitni copies result me aa chuki hain.
      // Is step ke baad result = base^count ho jata hai.
      result *= base;
    }

    return result;
  }

  /**
   * ==========================================================
   * DRY RUN - REPEATED MULTIPLICATION
   * ==========================================================
   *
   * Example 1:
   * x = 2, n = 5
   *
   * Initial:
   *
   * ┌──────────────────────────────────────────────┐
   * │ base = 2                                     │
   * │ exponent = 5                                 │
   * │ result = 1                                   │
   * └──────────────────────────────────────────────┘
   *
   * Why result starts from 1?
   *
   *   1 * 2 = 2
   *
   * If we started from 0, every multiplication would remain 0.
   *
   * Iterations:
   *
   * ┌─────────┬──────────────────────┬──────────────────────┐
   * │ count   │ operation            │ meaning              │
   * ├─────────┼──────────────────────┼──────────────────────┤
   * │ 1       │ 1 * 2 = 2            │ result = 2^1         │
   * │ 2       │ 2 * 2 = 4            │ result = 2^2         │
   * │ 3       │ 4 * 2 = 8            │ result = 2^3         │
   * │ 4       │ 8 * 2 = 16           │ result = 2^4         │
   * │ 5       │ 16 * 2 = 32          │ result = 2^5         │
   * └─────────┴──────────────────────┴──────────────────────┘
   *
   * Final:
   * result = 32
   *
   * ==========================================================
   * NEGATIVE EXPONENT DRY RUN
   * ==========================================================
   *
   * Example:
   * x = 2, n = -3
   *
   * Negative exponent means:
   *
   *   2^-3 = 1 / 2^3
   *
   * Instead of calculating `2^3` and dividing later, we convert:
   *
   * ┌──────────────────────────────────────────────┐
   * │ base = 1 / 2 = 0.5                           │
   * │ exponent = 3                                 │
   * │ result = 1                                   │
   * └──────────────────────────────────────────────┘
   *
   * Iterations:
   *
   * ┌─────────┬────────────────────────┬────────────────────┐
   * │ count   │ operation              │ meaning            │
   * ├─────────┼────────────────────────┼────────────────────┤
   * │ 1       │ 1 * 0.5 = 0.5          │ (1/2)^1            │
   * │ 2       │ 0.5 * 0.5 = 0.25       │ (1/2)^2            │
   * │ 3       │ 0.25 * 0.5 = 0.125     │ (1/2)^3            │
   * └─────────┴────────────────────────┴────────────────────┘
   *
   * Final:
   * result = 0.125
   *
   * ==========================================================
   * WHY THIS IS NOT ENOUGH
   * ==========================================================
   *
   * If n = 1,000,000,000:
   *
   *   loop runs 1,000,000,000 times
   *
   * That is why binary exponentiation is needed.
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
      { x: 3.5, n: 1, expected: 3.5, label: "single multiplication" },
      { x: -2, n: 5, expected: -32, label: "negative base odd exponent" },
      { x: -2, n: 4, expected: 16, label: "negative base even exponent" },
      { x: 0.5, n: 2, expected: 0.25, label: "fraction base" },
      { x: 1, n: 1000000, expected: 1, label: "base one shortcut" },
      { x: -1, n: 11, expected: -1, label: "minus one odd exponent" },
    ];

    let passed = 0;

    console.log("Pow(x, n) - Brute Force");
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

PowXNBruteForce.runTests();

export { PowXNBruteForce };
