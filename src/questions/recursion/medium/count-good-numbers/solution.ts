/**
 * COUNT GOOD NUMBERS - COUNTING + RECURSIVE FAST POWER
 * ====================================================
 *
 * PROBLEM:
 * Length `n` ka digit string good tab hota hai jab:
 * - even index par even digit ho
 * - odd index par prime digit ho
 *
 * Choices:
 * - even index digits: 0, 2, 4, 6, 8 -> 5 choices
 * - odd index digits: 2, 3, 5, 7 -> 4 choices
 *
 * PREREQUISITE:
 * Ye direct application hai `pow(x, n)` / binary exponentiation ka,
 * bas yahan modular arithmetic bhi add hoti hai.
 *
 * INTUITION (Soch):
 * -----------------
 * Hume actual strings generate nahi karni.
 * Hume sirf count chahiye.
 *
 * Har even index independent hai:
 *
 *   5 choices
 *
 * Har odd index independent hai:
 *
 *   4 choices
 *
 * So total answer:
 *
 *   5^(evenCount) * 4^(oddCount)
 *
 * Problem sirf itna hai ki `n` bahut bada ho sakta hai.
 * Isliye powers ko normal loop se nahi, fast power se calculate karna padega.
 *
 * Algorithm:
 * ----------
 * 1. Even indices aur odd indices ka count nikalo.
 * 2. Even positions ke total ways = `5^evenCount`.
 * 3. Odd positions ke total ways = `4^oddCount`.
 * 4. Dono ko modulo ke saath multiply karo.
 * 5. Power calculate karne ke liye recursive binary exponentiation use karo.
 * 6. Base case: exponent 0 ho toh answer 1 hota hai.
 * 7. Recursive case: half exponent ka answer nikalo.
 * 8. Half answer ko square karo.
 * 9. Agar exponent odd hai toh ek extra base aur multiply karo.
 * 10. Har multiplication ke baad modulo lo.
 *
 * TIME: O(log n)
 * SPACE: O(log n) because recursive fast power depth log n hoti hai
 */

namespace CountGoodNumbersRecursion {
  const MOD = 1000000007n;
  const EVEN_INDEX_CHOICES = 5n;
  const ODD_INDEX_CHOICES = 4n;

  export function countGoodNumbers(n: number): number {
    if (n === 0) {
      // Length 0 ka sirf empty string hota hai.
      // Empty string mathematically one valid way count hoti hai.
      return 1;
    }

    // Indexing 0 se start hoti hai, so extra slot agar bachta hai toh woh even side ko milta hai.
    // Example:
    // n = 5 -> indices 0,1,2,3,4 -> even indices = 0,2,4 (3 slots)
    const evenCount = Math.ceil(n / 2);
    const oddCount = Math.floor(n / 2);

    // Even index positions me 5 allowed digits hain.
    const evenWays = modPow(EVEN_INDEX_CHOICES, evenCount);

    // Odd index positions me 4 allowed prime digits hain.
    const oddWays = modPow(ODD_INDEX_CHOICES, oddCount);

    // Final total independent choices ka multiplication hai.
    // BigInt use kar rahe hain because modulo multiplication number range se bahar ja sakti hai.
    return Number((evenWays * oddWays) % MOD);
  }

  function modPow(base: bigint, exponent: number): bigint {
    if (exponent === 0) {
      // `base^0 = 1`.
      // Ye recursive build-up ka stopping point hai.
      return 1n;
    }

    const normalizedBase = base % MOD;
    const halfExponent = Math.floor(exponent / 2);

    // Same half power ko ek baar calculate karke reuse karte hain.
    // Agar do baar call kiya toh same recursion subtree duplicate ho jayega.
    const halfPower = modPow(normalizedBase, halfExponent);

    // Half answer ko square karke exponent ke do equal halves combine karte hain.
    const squaredHalf = (halfPower * halfPower) % MOD;

    if (exponent % 2 === 0) {
      // Even exponent:
      // base^6 = base^3 * base^3
      return squaredHalf;
    }

    // Odd exponent:
    // base^7 = base^3 * base^3 * base
    return (squaredHalf * normalizedBase) % MOD;
  }

  /**
   * ==========================================================
   * DRY RUN - COUNT FIRST, POWER LATER
   * ==========================================================
   *
   * Example:
   * n = 4
   *
   * Expected:
   * 400
   *
   * ==========================================================
   * STEP 1: COUNT POSITIONS
   * ==========================================================
   *
   * indices: 0  1  2  3
   * type:    E  O  E  O
   *
   * evenCount = 2
   * oddCount = 2
   *
   * So answer becomes:
   *
   *   5^2 * 4^2
   *
   * ==========================================================
   * STEP 2: RECURSION TREE FOR modPow(5, 2)
   * ==========================================================
   *
   * root  modPow(5, 2)
   * │
   * └── need modPow(5, 1)
   *     │
   *     └── need modPow(5, 0)
   *         BASE CASE: return 1
   *     exponent=1 odd
   *     return 1 * 1 * 5 = 5
   * exponent=2 even
   * return 5 * 5 = 25
   *
   * So:
   *
   *   modPow(5, 2) = 25
   *
   * Same pattern:
   *
   *   modPow(4, 2) = 16
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME
   * ==========================================================
   *
   * Initial Call: countGoodNumbers(4)
   * - evenCount = 2
   * - oddCount = 2
   * - evenWays = modPow(5, 2)
   * - oddWays = modPow(4, 2)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: modPow(5, 2)                                                 │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ exponent = 2                                                         │
   * │ Base case? exponent === 0 -> Nahi                                    │
   * │                                                                      │
   * │ halfExponent = floor(2 / 2) = 1                                      │
   * │ Need halfPower = modPow(5, 1)                                        │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: modPow(5, 1)                                       │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ exponent = 1                                               │   │
   * │   │ Base case? exponent === 0 -> Nahi                          │   │
   * │   │                                                            │   │
   * │   │ halfExponent = floor(1 / 2) = 0                            │   │
   * │   │ Need halfPower = modPow(5, 0)                              │   │
   * │   │                                                            │   │
   * │   │   ┌──────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 3: modPow(5, 0)                             │   │   │
   * │   │   ├──────────────────────────────────────────────────┤   │   │
   * │   │   │ exponent === 0 -> Haan                            │   │   │
   * │   │   │ Return 1                                          │   │   │
   * │   │   └──────────────────────────────────────────────────┘   │   │
   * │   │                                                            │   │
   * │   │ halfPower = 1                                              │   │
   * │   │ squaredHalf = 1 * 1 = 1                                    │   │
   * │   │ exponent 1 odd hai                                          │   │
   * │   │ Return 1 * 5 = 5                                            │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ halfPower = 5                                                        │
   * │ squaredHalf = 5 * 5 = 25                                             │
   * │ exponent 2 even hai                                                  │
   * │ Return 25                                                            │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final:
   *
   *   evenWays = 25
   *   oddWays = 16
   *   answer = 25 * 16 = 400
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. n = 1 -> 5
   * 2. n = 2 -> 20
   * 3. n = 5 -> 2000
   * 4. n = 50 -> 564908303
   * 5. n = 0 -> 1 (extra mathematical handling)
   */

  type TestCase = {
    n: number;
    expected: number;
    label: string;
  };

  export function runTests(): void {
    const tests: TestCase[] = [
      { n: 0, expected: 1, label: "zero length edge case" },
      { n: 1, expected: 5, label: "single digit" },
      { n: 2, expected: 20, label: "two digits" },
      { n: 3, expected: 100, label: "odd length small case" },
      { n: 4, expected: 400, label: "example case" },
      { n: 5, expected: 2000, label: "odd length with extra even slot" },
      { n: 50, expected: 564908303, label: "large sample from problem" },
      { n: 100, expected: 564490093, label: "larger power test" },
    ];

    let passed = 0;

    console.log("Count Good Numbers - Recursion");
    console.log("====================================");

    for (const test of tests) {
      const actual = countGoodNumbers(test.n);
      const ok = actual === test.expected;

      if (ok) {
        passed++;
      }

      console.log(`${ok ? "PASS" : "FAIL"} | ${test.label}`);
      console.log(`  input: n=${test.n}`);
      console.log(`  expected: ${test.expected}`);
      console.log(`  actual:   ${actual}`);
    }

    console.log("====================================");
    console.log(`Passed ${passed}/${tests.length} tests`);
  }
}

CountGoodNumbersRecursion.runTests();

export { CountGoodNumbersRecursion };
