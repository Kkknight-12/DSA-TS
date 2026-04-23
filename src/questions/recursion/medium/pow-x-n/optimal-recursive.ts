/**
 * POW(X, N) - OPTIMAL RECURSIVE BINARY EXPONENTIATION
 * ===================================================
 *
 * PROBLEM:
 * `x^n` calculate karna hai.
 *
 * INTUITION (Soch):
 * -----------------
 * Brute force `x` ko `n` times multiply karta hai.
 *
 * But power me ek repeat pattern hota hai:
 *
 *   2^10 = 2^5 * 2^5
 *
 * Matlab agar `2^5` ek baar mil gaya, toh `2^10` simply square hai.
 *
 * Even exponent:
 *
 *   x^n = x^(n/2) * x^(n/2)
 *
 * Odd exponent:
 *
 *   x^n = x^(floor(n/2)) * x^(floor(n/2)) * x
 *
 * Why odd me extra x?
 *
 *   5 = 2 + 2 + 1
 *   x^5 = x^2 * x^2 * x
 *
 * Algorithm:
 * ----------
 * 1. Agar `n === 0`, return `1`.
 * 2. Agar `n` negative hai, pehle positive exponent ka answer nikalo.
 * 3. Negative case me final answer ka reciprocal return karo.
 * 4. Positive helper me exponent ko half karo.
 * 5. Recursively `halfPower = x^floor(exponent / 2)` calculate karo.
 * 6. Agar exponent even hai, return `halfPower * halfPower`.
 * 7. Agar exponent odd hai, return `halfPower * halfPower * x`.
 *
 * TIME: O(log |n|)
 * SPACE: O(log |n|) because recursion stack depth log n hoti hai.
 */

namespace PowXNOptimalRecursive {
  export function myPow(x: number, n: number): number {
    if (n === 0) {
      // Power zero ka answer 1 hota hai.
      // Ye outer function ka quick exit bhi hai aur helper ka base case bhi.
      return 1;
    }

    const exponent = Math.abs(n);
    const positivePower = powerPositive(x, exponent);

    if (n < 0) {
      // Negative exponent reciprocal hota hai.
      // Example: 2^-3 = 1 / 2^3.
      return 1 / positivePower;
    }

    return positivePower;
  }

  function powerPositive(base: number, exponent: number): number {
    if (exponent === 0) {
      // Recursion yahin stop hoti hai.
      // `base^0 = 1`, so return side par square/multiply build hoga.
      return 1;
    }

    const halfExponent = Math.floor(exponent / 2);

    // Half power ko ek baar calculate karke reuse karte hain.
    // Agar yahan do recursive calls kar diye, toh same work repeat ho jayega.
    const halfPower = powerPositive(base, halfExponent);

    if (exponent % 2 === 0) {
      // Even exponent exactly two equal halves me split hota hai.
      // Example: x^10 = x^5 * x^5.
      return halfPower * halfPower;
    }

    // Odd exponent me two equal halves ke baad ek extra base bachta hai.
    // Example: x^5 = x^2 * x^2 * x.
    return halfPower * halfPower * base;
  }

  /**
   * ==========================================================
   * DRY RUN - RECURSION TREE
   * ==========================================================
   *
   * Example:
   * x = 2, n = 10
   *
   * High-level tree:
   *
   * root  powerPositive(2, 10)
   * │
   * └── need half exponent floor(10 / 2) = 5
   *     powerPositive(2, 5)
   *     │
   *     └── need half exponent floor(5 / 2) = 2
   *         powerPositive(2, 2)
   *         │
   *         └── need half exponent floor(2 / 2) = 1
   *             powerPositive(2, 1)
   *             │
   *             └── need half exponent floor(1 / 2) = 0
   *                 powerPositive(2, 0)
   *                 BASE CASE: return 1
   *             return 1 * 1 * 2 = 2
   *         return 2 * 2 = 4
   *     return 4 * 4 * 2 = 32
   * return 32 * 32 = 1024
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME
   * ==========================================================
   *
   * Initial Call: myPow(2, 10)
   * - n is positive, so answer = powerPositive(2, 10)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: powerPositive(2, 10)                                         │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ base = 2, exponent = 10                                              │
   * │ Base case? exponent === 0 -> Nahi                                    │
   * │                                                                      │
   * │ halfExponent = floor(10 / 2) = 5                                     │
   * │ Need halfPower = powerPositive(2, 5)                                 │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: powerPositive(2, 5)                                │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ base = 2, exponent = 5                                     │   │
   * │   │ Base case? exponent === 0 -> Nahi                          │   │
   * │   │                                                            │   │
   * │   │ halfExponent = floor(5 / 2) = 2                            │   │
   * │   │ Need halfPower = powerPositive(2, 2)                       │   │
   * │   │                                                            │   │
   * │   │   ┌──────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 3: powerPositive(2, 2)                      │   │   │
   * │   │   ├──────────────────────────────────────────────────┤   │   │
   * │   │   │ base = 2, exponent = 2                           │   │   │
   * │   │   │ Base case? exponent === 0 -> Nahi                 │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ halfExponent = floor(2 / 2) = 1                  │   │   │
   * │   │   │ Need halfPower = powerPositive(2, 1)             │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │   ┌────────────────────────────────────────┐   │   │   │
   * │   │   │   │ CALL 4: powerPositive(2, 1)            │   │   │   │
   * │   │   │   ├────────────────────────────────────────┤   │   │   │
   * │   │   │   │ base = 2, exponent = 1                 │   │   │   │
   * │   │   │   │ Base case? exponent === 0 -> Nahi      │   │   │   │
   * │   │   │   │                                        │   │   │   │
   * │   │   │   │ halfExponent = floor(1 / 2) = 0        │   │   │   │
   * │   │   │   │ Need halfPower = powerPositive(2, 0)   │   │   │   │
   * │   │   │   │                                        │   │   │   │
   * │   │   │   │   ┌──────────────────────────────┐   │   │   │   │
   * │   │   │   │   │ CALL 5: powerPositive(2, 0)  │   │   │   │   │
   * │   │   │   │   ├──────────────────────────────┤   │   │   │   │
   * │   │   │   │   │ exponent === 0 -> Haan       │   │   │   │   │
   * │   │   │   │   │ Return 1                     │   │   │   │   │
   * │   │   │   │   └──────────────────────────────┘   │   │   │   │
   * │   │   │   │                                        │   │   │   │
   * │   │   │   │ halfPower = 1                          │   │   │   │
   * │   │   │   │ exponent = 1 is odd                    │   │   │   │
   * │   │   │   │ Return 1 * 1 * 2 = 2                   │   │   │   │
   * │   │   │   └────────────────────────────────────────┘   │   │   │
   * │   │   │                                                  │   │   │
   * │   │   │ halfPower = 2                                    │   │   │
   * │   │   │ exponent = 2 is even                             │   │   │
   * │   │   │ Return 2 * 2 = 4                                  │   │   │
   * │   │   └──────────────────────────────────────────────────┘   │   │
   * │   │                                                            │   │
   * │   │ halfPower = 4                                              │   │
   * │   │ exponent = 5 is odd                                        │   │
   * │   │ Return 4 * 4 * 2 = 32                                      │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ halfPower = 32                                                       │
   * │ exponent = 10 is even                                                │
   * │ Return 32 * 32 = 1024                                                │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * ==========================================================
   * NEGATIVE EXPONENT FLOW
   * ==========================================================
   *
   * myPow(2, -3)
   *
   * ┌──────────────────────────────────────────────┐
   * │ exponent = abs(-3) = 3                       │
   * │ positivePower = powerPositive(2, 3) = 8      │
   * │ n < 0, so return 1 / 8 = 0.125               │
   * └──────────────────────────────────────────────┘
   *
   * Important:
   * JavaScript numbers can safely hold 2147483648 for this problem.
   * In Java/C++ fixed-width int languages, convert `n` to long first.
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
      { x: 2, n: 11, expected: 2048, label: "odd exponent" },
      { x: 2, n: 30, expected: 1073741824, label: "large exponent" },
      { x: -2, n: 5, expected: -32, label: "negative base odd exponent" },
      { x: -2, n: 4, expected: 16, label: "negative base even exponent" },
      { x: 1, n: -2147483648, expected: 1, label: "minimum exponent with base one" },
      { x: -1, n: -2147483648, expected: 1, label: "minimum exponent with minus one" },
    ];

    let passed = 0;

    console.log("Pow(x, n) - Optimal Recursive");
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

PowXNOptimalRecursive.runTests();

export { PowXNOptimalRecursive };
