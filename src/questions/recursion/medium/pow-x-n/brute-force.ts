/**
 * Pow(x, n) - BRUTE FORCE APPROACH
 * ==================================
 *
 * Problem: Calculate x raised to the power n (x^n)
 *
 * Approach: Iterative Multiplication
 * - Multiply x repeatedly n times
 * - Handle negative exponents by computing x^(|n|) and returning 1/result
 *
 * Time Complexity: O(n) - Loop runs n times
 * Space Complexity: O(1) - Only using constant extra space
 *
 * Why this is NOT optimal:
 * - For n = 1,000,000,000 → 1 billion multiplications!
 * - Takes several seconds to compute
 * - Will likely TLE (Time Limit Exceeded) on LeetCode
 *
 * Educational purpose: Shows why we need a better approach (Binary Exponentiation)
 */

namespace PowXNBruteForce {
  /**
   * Calculate x^n using iterative multiplication (Brute Force)
   *
   * @param x - Base number (can be negative, decimal, or integer)
   * @param n - Exponent (integer, can be negative or positive)
   * @returns x raised to the power n
   *
   * @complexity
   * Time: O(n) - Multiplies x exactly n times
   * Space: O(1) - Only uses one variable
   *
   * @example
   * myPow(2, 10) → 1024
   * myPow(2, -2) → 0.25
   * myPow(2.1, 3) → 9.261
   */
  function myPow(x: number, n: number): number {
    // EDGE CASE 1: Any number to power 0 is 1
    // WHY: x^0 = 1 by mathematical definition
    // EXAMPLE: 5^0 = 1, (-3)^0 = 1, 0.5^0 = 1
    if (n === 0) {
      return 1;
    }

    // EDGE CASE 2: Optimization - x = 1
    // WHY: 1 raised to any power is always 1
    // EXAMPLE: 1^1000000000 = 1 (no need to loop!)
    if (x === 1) {
      return 1;
    }

    // EDGE CASE 3: Optimization - x = -1
    // WHY: (-1)^even = 1, (-1)^odd = -1
    // EXAMPLE: (-1)^10 = 1, (-1)^11 = -1
    if (x === -1) {
      return n % 2 === 0 ? 1 : -1;
    }

    // STEP 1: Handle negative exponent
    // WHY: x^(-n) = 1 / (x^n)
    // EXAMPLE: 2^(-3) = 1 / (2^3) = 1/8 = 0.125
    // STRATEGY: Convert to positive exponent and invert x
    if (n < 0) {
      // Convert x to 1/x (e.g., 2 becomes 0.5)
      x = 1 / x;
      // Convert n to positive (e.g., -3 becomes 3)
      // EDGE CASE: n might be -2147483648 (minimum int)
      // -(-2147483648) causes overflow in 32-bit int!
      // But in JavaScript/TypeScript, numbers are 64-bit floats, so it's safe
      n = -n;
    }

    // STEP 2: Initialize result
    // WHY: Start with 1, then multiply by x repeatedly
    // EXAMPLE: 2^5 = 1 × 2 × 2 × 2 × 2 × 2
    let result = 1;

    // STEP 3: Multiply x exactly n times
    // WHY: x^n = x × x × x × ... (n times)
    // LOOP INVARIANT: After i iterations, result = x^i
    // EXAMPLE: x=2, n=5
    //   i=1: result = 1 × 2 = 2    (2^1)
    //   i=2: result = 2 × 2 = 4    (2^2)
    //   i=3: result = 4 × 2 = 8    (2^3)
    //   i=4: result = 8 × 2 = 16   (2^4)
    //   i=5: result = 16 × 2 = 32  (2^5) ✓
    for (let i = 0; i < n; i++) {
      result *= x;
    }

    // STEP 4: Return final result
    // NOTE: If original n was negative, we already converted x to 1/x
    //       So result is already the correct answer
    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example 1: Calculate 2^5 (Positive Exponent)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = 5
   *
   * Initial State:
   *   x = 2
   *   n = 5 (positive, no conversion needed)
   *   result = 1
   *
   * ───────────────────────────────────────────────────────────
   * LOOP ITERATIONS:
   * ───────────────────────────────────────────────────────────
   *
   * i = 0:
   *   result = 1 × 2 = 2
   *   Current power: 2^1
   *
   * i = 1:
   *   result = 2 × 2 = 4
   *   Current power: 2^2
   *
   * i = 2:
   *   result = 4 × 2 = 8
   *   Current power: 2^3
   *
   * i = 3:
   *   result = 8 × 2 = 16
   *   Current power: 2^4
   *
   * i = 4:
   *   result = 16 × 2 = 32
   *   Current power: 2^5 ✓
   *
   * i = 5: Loop exits (i < n is false)
   *
   * Final Result: 32
   * Expected: 2^5 = 32 ✓
   *
   * Total Operations: 5 multiplications
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 2: Calculate 2^(-3) (Negative Exponent)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = -3
   *
   * Initial State:
   *   x = 2
   *   n = -3 (negative!)
   *
   * STEP 1: Handle Negative Exponent
   *   x = 1 / 2 = 0.5
   *   n = -(-3) = 3
   *
   * After conversion:
   *   x = 0.5
   *   n = 3
   *   result = 1
   *
   * ───────────────────────────────────────────────────────────
   * LOOP ITERATIONS:
   * ───────────────────────────────────────────────────────────
   *
   * i = 0:
   *   result = 1 × 0.5 = 0.5
   *   Current: (0.5)^1
   *
   * i = 1:
   *   result = 0.5 × 0.5 = 0.25
   *   Current: (0.5)^2
   *
   * i = 2:
   *   result = 0.25 × 0.5 = 0.125
   *   Current: (0.5)^3 ✓
   *
   * i = 3: Loop exits
   *
   * Final Result: 0.125
   * Expected: 2^(-3) = 1/(2^3) = 1/8 = 0.125 ✓
   *
   * Note: By converting x to 1/x, we compute (1/2)^3 directly
   *       which equals 2^(-3)!
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 3: Calculate 2.1^3 (Decimal Base)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2.1, n = 3
   *
   * Initial State:
   *   x = 2.1
   *   n = 3 (positive, no conversion needed)
   *   result = 1
   *
   * ───────────────────────────────────────────────────────────
   * LOOP ITERATIONS:
   * ───────────────────────────────────────────────────────────
   *
   * i = 0:
   *   result = 1 × 2.1 = 2.1
   *
   * i = 1:
   *   result = 2.1 × 2.1 = 4.41
   *
   * i = 2:
   *   result = 4.41 × 2.1 = 9.261
   *
   * i = 3: Loop exits
   *
   * Final Result: 9.261
   * Expected: 2.1^3 = 9.261 ✓
   *
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Zero Exponent:
   *    Input: x = 5, n = 0
   *    Output: 1
   *    Why: Any number^0 = 1 (handled before loop)
   *
   * 2. Exponent = 1:
   *    Input: x = 3.5, n = 1
   *    Loop runs once: result = 1 × 3.5 = 3.5
   *    Output: 3.5 ✓
   *
   * 3. x = 1:
   *    Input: x = 1, n = 1000000000
   *    Early return: 1 (optimization - no loop needed!)
   *
   * 4. x = -1 (Even exponent):
   *    Input: x = -1, n = 10
   *    Early return: 1
   *    Why: (-1)^10 = 1 (even exponent → positive)
   *
   * 5. x = -1 (Odd exponent):
   *    Input: x = -1, n = 11
   *    Early return: -1
   *    Why: (-1)^11 = -1 (odd exponent → negative)
   *
   * 6. Minimum Integer:
   *    Input: x = 2, n = -2147483648
   *    x = 1/2 = 0.5
   *    n = 2147483648 (works in JS - 64-bit float)
   *    Loops 2147483648 times (VERY SLOW! 😱)
   *    This is why brute force fails!
   *
   *
   * ═══════════════════════════════════════════════════════════
   * WHY BRUTE FORCE FAILS FOR LARGE n
   * ═══════════════════════════════════════════════════════════
   *
   * For n = 1,000,000,000:
   *   - Loop runs 1 billion times
   *   - 1 billion multiplications
   *   - Takes ~10-30 seconds on modern CPU
   *   - LeetCode has 2-second time limit
   *   - Result: TLE (Time Limit Exceeded) ❌
   *
   * We need O(log n) solution (Binary Exponentiation)!
   * That reduces 1 billion operations to just ~30 operations! 🚀
   */

  // ==================== TEST CASES ====================

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("Testing Pow(x, n) - BRUTE FORCE");
    console.log("═══════════════════════════════════════════════════════════\n");

    // Test 1: Basic positive exponent
    console.log("Test 1: Basic Positive Exponent");
    console.log("  Input: x = 2, n = 10");
    console.log("  Output:", myPow(2, 10));
    console.log("  Expected: 1024");
    console.log("  Result:", myPow(2, 10) === 1024 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 2: Decimal base
    console.log("Test 2: Decimal Base");
    console.log("  Input: x = 2.1, n = 3");
    console.log("  Output:", myPow(2.1, 3));
    console.log("  Expected: 9.261");
    console.log(
      "  Result:",
      Math.abs(myPow(2.1, 3) - 9.261) < 0.00001 ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 3: Negative exponent
    console.log("Test 3: Negative Exponent");
    console.log("  Input: x = 2, n = -2");
    console.log("  Output:", myPow(2, -2));
    console.log("  Expected: 0.25");
    console.log("  Result:", myPow(2, -2) === 0.25 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 4: Zero exponent
    console.log("Test 4: Zero Exponent");
    console.log("  Input: x = 5, n = 0");
    console.log("  Output:", myPow(5, 0));
    console.log("  Expected: 1");
    console.log("  Result:", myPow(5, 0) === 1 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 5: Exponent = 1
    console.log("Test 5: Exponent = 1");
    console.log("  Input: x = 3.5, n = 1");
    console.log("  Output:", myPow(3.5, 1));
    console.log("  Expected: 3.5");
    console.log("  Result:", myPow(3.5, 1) === 3.5 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 6: x = 1 (optimization)
    console.log("Test 6: x = 1 (Edge Case Optimization)");
    console.log("  Input: x = 1, n = 100000");
    console.log("  Output:", myPow(1, 100000));
    console.log("  Expected: 1");
    console.log("  Result:", myPow(1, 100000) === 1 ? "✓ PASS" : "✗ FAIL");
    console.log("  Note: Early return - no loop needed!");
    console.log();

    // Test 7: x = -1 (even exponent)
    console.log("Test 7: x = -1 (Even Exponent)");
    console.log("  Input: x = -1, n = 10");
    console.log("  Output:", myPow(-1, 10));
    console.log("  Expected: 1");
    console.log("  Result:", myPow(-1, 10) === 1 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 8: x = -1 (odd exponent)
    console.log("Test 8: x = -1 (Odd Exponent)");
    console.log("  Input: x = -1, n = 11");
    console.log("  Output:", myPow(-1, 11));
    console.log("  Expected: -1");
    console.log("  Result:", myPow(-1, 11) === -1 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 9: Negative base with positive exponent
    console.log("Test 9: Negative Base, Positive Exponent");
    console.log("  Input: x = -2, n = 5");
    console.log("  Output:", myPow(-2, 5));
    console.log("  Expected: -32");
    console.log("  Result:", myPow(-2, 5) === -32 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 10: Small positive exponent
    console.log("Test 10: Small Calculation");
    console.log("  Input: x = 0.5, n = 2");
    console.log("  Output:", myPow(0.5, 2));
    console.log("  Expected: 0.25");
    console.log("  Result:", myPow(0.5, 2) === 0.25 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Performance Note
    console.log("═══════════════════════════════════════════════════════════");
    console.log("PERFORMANCE NOTE:");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("⚠️  Brute Force is O(n) - VERY SLOW for large n!");
    console.log("⚠️  For n = 1,000,000,000 → 1 billion operations!");
    console.log("⚠️  Will cause TLE (Time Limit Exceeded) on LeetCode");
    console.log("");
    console.log("✅  Use Binary Exponentiation (O(log n)) instead!");
    console.log("✅  Reduces 1 billion operations to ~30 operations!");
    console.log("═══════════════════════════════════════════════════════════\n");
  }
}

// Run tests
PowXNBruteForce.runTests();
