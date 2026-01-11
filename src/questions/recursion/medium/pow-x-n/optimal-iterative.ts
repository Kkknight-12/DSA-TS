/**
 * Pow(x, n) - OPTIMAL ITERATIVE APPROACH (BINARY EXPONENTIATION)
 * ==============================================================
 *
 * Problem: Calculate x raised to the power n (x^n)
 *
 * Approach: Binary Exponentiation using Bit Manipulation (Iterative)
 * - Use loop to process each bit of the exponent
 * - Square x at each iteration
 * - Multiply result when current bit is 1
 *
 * Time Complexity: O(log n) - Same as recursive
 * Space Complexity: O(1) - Better than recursive O(log n)!
 *
 * Why this is BETTER than recursive:
 * - No recursion stack overhead
 * - O(1) space instead of O(log n)
 * - Slightly faster in practice
 * - Same time complexity
 *
 * Key Insight:
 * Instead of recursion, we process each bit of n from right to left:
 *   10 in binary = 1010
 *   2^10 = 2^(8+2) = 2^8 × 2^2
 *   We multiply result by x^(power) only when bit is 1
 *
 * ═══════════════════════════════════════════════════════════
 * WHY MULTIPLY ONLY WHEN EXPONENT IS ODD? (Bit Manipulation)
 * ═══════════════════════════════════════════════════════════
 *
 * CORE INSIGHT: Checking (exponent % 2 === 1) is the SAME as checking
 *               if the rightmost bit is 1 in binary!
 *
 * Even numbers have bit 0 = 0:  10 = 1010₂  (last bit = 0)
 * Odd numbers have bit 0 = 1:   13 = 1101₂  (last bit = 1)
 *
 * WHY DOES THIS MATTER?
 * Every integer is a SUM of powers of 2 based on its binary representation:
 *
 * Example: 13 = 1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰
 *             = 8 + 4 + 0 + 1
 *             = 8 + 4 + 1  (only add where bit = 1)
 *
 * Therefore: x^13 = x^(8+4+1) = x^8 × x^4 × x^1
 * We ONLY multiply by powers where the bit is 1!
 *
 * HOW THE ALGORITHM WORKS:
 * 1. Start with base = x (represents x^1)
 * 2. Check if exponent is odd (bit = 1):
 *    - YES → Multiply result by base (include this power)
 *    - NO  → Skip (don't include this power)
 * 3. Square base (x^1 → x^2 → x^4 → x^8 → x^16...)
 * 4. Divide exponent by 2 (shift right: process next bit)
 * 5. Repeat until exponent = 0
 *
 * EXAMPLE: Calculate 2^13 where 13 = 1101₂
 *
 * Initial: result = 1, base = 2, exponent = 13
 *
 * Iteration 1: exponent = 13 (1101₂)
 *   13 % 2 = 1 → ODD → Bit 0 = 1 ✓
 *   result = 1 × 2 = 2        (include 2^1)
 *   base = 2 × 2 = 4          (now represents 2^2)
 *   exponent = 13 / 2 = 6     (shift: 1101 → 110)
 *
 * Iteration 2: exponent = 6 (110₂)
 *   6 % 2 = 0 → EVEN → Bit 0 = 0 ✗
 *   result = 2                (skip, don't include 2^2)
 *   base = 4 × 4 = 16         (now represents 2^4)
 *   exponent = 6 / 2 = 3      (shift: 110 → 11)
 *
 * Iteration 3: exponent = 3 (11₂)
 *   3 % 2 = 1 → ODD → Bit 0 = 1 ✓
 *   result = 2 × 16 = 32      (include 2^4)
 *   base = 16 × 16 = 256      (now represents 2^8)
 *   exponent = 3 / 2 = 1      (shift: 11 → 1)
 *
 * Iteration 4: exponent = 1 (1₂)
 *   1 % 2 = 1 → ODD → Bit 0 = 1 ✓
 *   result = 32 × 256 = 8192  (include 2^8)
 *   exponent = 1 / 2 = 0      → DONE
 *
 * Final: 2^13 = 2^1 × 2^4 × 2^8 = 2 × 16 × 256 = 8192 ✓
 * (We included powers where bits were 1, skipped where bit was 0!)
 *
 * LOOP INVARIANT (Always True):
 * result × base^exponent = x^n  (constant throughout!)
 *
 * This is why the algorithm works correctly!
 */

namespace PowXNIterative {
  /**
   * Calculate x^n using Binary Exponentiation (Iterative)
   *
   * @param x - Base number (can be negative, decimal, or integer)
   * @param n - Exponent (integer, can be negative or positive)
   * @returns x raised to the power n
   *
   * @complexity
   * Time: O(log n) - Process each bit of n
   * Space: O(1) - Only using constant variables
   *
   * @example
   * myPow(2, 10) → 1024
   * myPow(2, -2) → 0.25
   * myPow(2.1, 3) → 9.261
   */
  function myPow(x: number, n: number): number {
    // ═══════════════════════════════════════════════════════════
    // EDGE CASE: n = 0
    // ═══════════════════════════════════════════════════════════
    // WHY: Any number raised to power 0 equals 1
    // EXAMPLE: 5^0 = 1, (-3)^0 = 1
    if (n === 0) {
      return 1;
    }

    // ═══════════════════════════════════════════════════════════
    // STEP 1: Handle negative exponent
    // ═══════════════════════════════════════════════════════════
    // WHY: x^(-n) = 1 / (x^n)
    // EXAMPLE: 2^(-3) = 1 / (2^3) = 1/8 = 0.125
    // STRATEGY: Convert to positive exponent and track with flag
    let isNegative = false;
    if (n < 0) {
      isNegative = true;
      n = -n;
      // EDGE CASE: n = -2147483648 (minimum int32)
      // -(-2147483648) = 2147483648 (overflows int32 but OK in JS)
    }

    // ═══════════════════════════════════════════════════════════
    // STEP 2: Initialize variables
    // ═══════════════════════════════════════════════════════════
    // result: Accumulates the final answer
    // base: Current power of x (x^1, x^2, x^4, x^8, ...)
    // exponent: Remaining exponent to process
    let result = 1; // Start with 1 (multiplicative identity)
    let base = x; // Start with x^1
    let exponent = n; // Copy of n to modify

    // ═══════════════════════════════════════════════════════════
    // STEP 3: Binary Exponentiation Loop
    // ═══════════════════════════════════════════════════════════
    // IDEA: Process each bit of the exponent from right to left
    // INVARIANT: result × base^exponent = x^n (constant throughout)
    //
    // Example: 2^10 where 10 = 1010₂
    // Bit 0 (rightmost): 0 → Skip (don't multiply)
    // Bit 1: 1 → Multiply by 2^2 = 4
    // Bit 2: 0 → Skip
    // Bit 3: 1 → Multiply by 2^8 = 256
    // Result: 4 × 256 = 1024 ✓
    while (exponent > 0) {
      // Check if current bit is 1 (odd exponent)
      // WHY: If exponent is odd, we need to include current base power
      // EXAMPLE: exponent = 5 (binary: 101)
      //          5 % 2 = 1 → bit is 1 → multiply result by base
      if (exponent % 2 === 1) {
        result *= base; // Include this power of x
      }

      // Square the base for next bit position
      // WHY: Each bit represents double the power
      // EXAMPLE: x^1 → x^2 → x^4 → x^8 → x^16 ...
      base *= base;

      // Right shift exponent by 1 bit (divide by 2)
      // WHY: Move to next bit position
      // EXAMPLE: 10 (1010₂) → 5 (101₂) → 2 (10₂) → 1 (1₂) → 0
      exponent = Math.floor(exponent / 2);
    }

    // ═══════════════════════════════════════════════════════════
    // STEP 4: Handle negative exponent result
    // ═══════════════════════════════════════════════════════════
    // WHY: If original n was negative, return 1/result
    // EXAMPLE: 2^(-3) → result = 8 → return 1/8 = 0.125
    if (isNegative) {
      return 1 / result;
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example 1: Calculate 2^10 (Binary: 1010)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = 10
   *
   * Initial State:
   *   result = 1
   *   base = 2
   *   exponent = 10 (binary: 1010)
   *
   * Binary representation of 10: 1010
   * We process bits from right to left
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 1:
   * ───────────────────────────────────────────────────────────
   * exponent = 10 (binary: 1010)
   * Check bit: 10 % 2 = 0 (bit is 0 - EVEN)
   * Action: Skip (don't multiply result)
   *
   * Current state:
   *   result = 1 (unchanged)
   *   base = 2 × 2 = 4 (squared)
   *   exponent = 10 / 2 = 5 (shift right: 1010 → 101)
   *
   * Meaning: We have base = 2^2 = 4
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 2:
   * ───────────────────────────────────────────────────────────
   * exponent = 5 (binary: 101)
   * Check bit: 5 % 2 = 1 (bit is 1 - ODD)
   * Action: Multiply result by base
   *
   * Current state:
   *   result = 1 × 4 = 4 (multiplied!)
   *   base = 4 × 4 = 16 (squared)
   *   exponent = 5 / 2 = 2 (shift right: 101 → 10)
   *
   * Meaning: We included 2^2, now have base = 2^4 = 16
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 3:
   * ───────────────────────────────────────────────────────────
   * exponent = 2 (binary: 10)
   * Check bit: 2 % 2 = 0 (bit is 0 - EVEN)
   * Action: Skip (don't multiply result)
   *
   * Current state:
   *   result = 4 (unchanged)
   *   base = 16 × 16 = 256 (squared)
   *   exponent = 2 / 2 = 1 (shift right: 10 → 1)
   *
   * Meaning: We have base = 2^8 = 256
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 4:
   * ───────────────────────────────────────────────────────────
   * exponent = 1 (binary: 1)
   * Check bit: 1 % 2 = 1 (bit is 1 - ODD)
   * Action: Multiply result by base
   *
   * Current state:
   *   result = 4 × 256 = 1024 (multiplied!)
   *   base = 256 × 256 = 65536 (squared, not used)
   *   exponent = 1 / 2 = 0 (shift right: 1 → 0)
   *
   * Meaning: We included 2^8
   *
   * ───────────────────────────────────────────────────────────
   * LOOP EXITS: exponent = 0
   * ───────────────────────────────────────────────────────────
   *
   * Final Result: 1024
   * Expected: 2^10 = 1024 ✓
   *
   * Verification: 2^10 = 2^(2+8) = 2^2 × 2^8 = 4 × 256 = 1024 ✓
   * Binary: 1010₂ = 1×2^3 + 0×2^2 + 1×2^1 + 0×2^0 = 8 + 2 = 10 ✓
   *
   * Total Iterations: 4 (log₂(10) ≈ 3.3 → ⌈3.3⌉ = 4)
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 2: Calculate 2^(-3) (Negative Exponent)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = -3
   *
   * Initial State:
   *   isNegative = true (n < 0)
   *   n = 3 (converted to positive)
   *   result = 1
   *   base = 2
   *   exponent = 3 (binary: 11)
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 1:
   * ───────────────────────────────────────────────────────────
   * exponent = 3 (binary: 11)
   * Check bit: 3 % 2 = 1 (ODD)
   * Action: result = 1 × 2 = 2
   *
   * Current state:
   *   result = 2
   *   base = 2 × 2 = 4
   *   exponent = 3 / 2 = 1 (binary: 1)
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 2:
   * ───────────────────────────────────────────────────────────
   * exponent = 1 (binary: 1)
   * Check bit: 1 % 2 = 1 (ODD)
   * Action: result = 2 × 4 = 8
   *
   * Current state:
   *   result = 8
   *   base = 4 × 4 = 16 (not used)
   *   exponent = 1 / 2 = 0
   *
   * ───────────────────────────────────────────────────────────
   * LOOP EXITS: exponent = 0
   * ───────────────────────────────────────────────────────────
   *
   * result = 8 (this is 2^3)
   * isNegative = true → return 1/8 = 0.125
   *
   * Final Result: 0.125
   * Expected: 2^(-3) = 1/(2^3) = 1/8 = 0.125 ✓
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 3: Calculate 2^13 (Binary: 1101)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = 13
   *
   * Binary: 13 = 1101₂ = 8 + 4 + 1 = 2^3 + 2^2 + 2^0
   * Expected: 2^13 = 2^(1+4+8) = 2 × 16 × 256 = 8192
   *
   * Initial State:
   *   result = 1
   *   base = 2
   *   exponent = 13 (binary: 1101)
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 1: Process bit 0 (rightmost)
   * ───────────────────────────────────────────────────────────
   * exponent = 13 (1101₂)
   * Bit 0 = 1 (13 % 2 = 1) → ODD
   * result = 1 × 2 = 2         (include 2^1)
   * base = 2 × 2 = 4           (now represents 2^2)
   * exponent = 6 (110₂)
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 2: Process bit 1
   * ───────────────────────────────────────────────────────────
   * exponent = 6 (110₂)
   * Bit 1 = 0 (6 % 2 = 0) → EVEN
   * result = 2              (unchanged)
   * base = 4 × 4 = 16       (now represents 2^4)
   * exponent = 3 (11₂)
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 3: Process bit 2
   * ───────────────────────────────────────────────────────────
   * exponent = 3 (11₂)
   * Bit 2 = 1 (3 % 2 = 1) → ODD
   * result = 2 × 16 = 32    (include 2^4)
   * base = 16 × 16 = 256    (now represents 2^8)
   * exponent = 1 (1₂)
   *
   * ───────────────────────────────────────────────────────────
   * ITERATION 4: Process bit 3
   * ───────────────────────────────────────────────────────────
   * exponent = 1 (1₂)
   * Bit 3 = 1 (1 % 2 = 1) → ODD
   * result = 32 × 256 = 8192 (include 2^8)
   * base = 256 × 256 = 65536 (not used)
   * exponent = 0
   *
   * ───────────────────────────────────────────────────────────
   * LOOP EXITS
   * ───────────────────────────────────────────────────────────
   *
   * Final Result: 8192
   * Expected: 2^13 = 8192 ✓
   * Verification: 2^1 × 2^4 × 2^8 = 2 × 16 × 256 = 8192 ✓
   *
   *
   * ═══════════════════════════════════════════════════════════
   * HOW BIT MANIPULATION WORKS
   * ═══════════════════════════════════════════════════════════
   *
   * Key Insight: Every integer can be represented as sum of powers of 2
   *
   * Example: 10 = 8 + 2 = 2^3 + 2^1
   * Binary: 10 = 1010₂
   *   Bit 0 (2^0 = 1): 0 → Don't include
   *   Bit 1 (2^1 = 2): 1 → Include 2^2
   *   Bit 2 (2^2 = 4): 0 → Don't include
   *   Bit 3 (2^3 = 8): 1 → Include 2^8
   *
   * Therefore: x^10 = x^(2+8) = x^2 × x^8
   *
   * Algorithm:
   * 1. Start with result = 1, base = x
   * 2. For each bit of n (right to left):
   *    - If bit is 1: multiply result by current base
   *    - Square base (for next bit position)
   *    - Shift n right by 1 bit
   * 3. Return result
   *
   * Why it works:
   * - We build up powers: x^1, x^2, x^4, x^8, x^16...
   * - We only multiply when bit is 1
   * - This gives us exactly the sum of needed powers!
   *
   *
   * ═══════════════════════════════════════════════════════════
   * RECURSIVE vs ITERATIVE COMPARISON
   * ═══════════════════════════════════════════════════════════
   *
   * Recursive Approach:
   * ✓ More intuitive (divide & conquer)
   * ✓ Easier to understand
   * ✗ Uses O(log n) stack space
   * ✗ Function call overhead
   *
   * Iterative Approach:
   * ✓ O(1) space - no stack needed
   * ✓ Slightly faster (no function calls)
   * ✓ No risk of stack overflow
   * ✗ Bit manipulation less intuitive
   *
   * Both have O(log n) time complexity!
   */

  // ==================== TEST CASES ====================

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("Testing Pow(x, n) - OPTIMAL ITERATIVE");
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

    // Test 6: Large exponent (performance test)
    console.log("Test 6: Large Exponent (Performance Test)");
    console.log("  Input: x = 2, n = 30");
    const start = Date.now();
    const result = myPow(2, 30);
    const time = Date.now() - start;
    console.log("  Output:", result);
    console.log("  Expected: 1073741824");
    console.log("  Time taken:", time, "ms (should be < 1ms)");
    console.log("  Result:", result === 1073741824 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 7: x = 1 (any power)
    console.log("Test 7: x = 1 (Any Power)");
    console.log("  Input: x = 1, n = 1000000");
    console.log("  Output:", myPow(1, 1000000));
    console.log("  Expected: 1");
    console.log("  Result:", myPow(1, 1000000) === 1 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 8: x = -1 (even exponent)
    console.log("Test 8: x = -1 (Even Exponent)");
    console.log("  Input: x = -1, n = 10");
    console.log("  Output:", myPow(-1, 10));
    console.log("  Expected: 1");
    console.log("  Result:", myPow(-1, 10) === 1 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 9: x = -1 (odd exponent)
    console.log("Test 9: x = -1 (Odd Exponent)");
    console.log("  Input: x = -1, n = 11");
    console.log("  Output:", myPow(-1, 11));
    console.log("  Expected: -1");
    console.log("  Result:", myPow(-1, 11) === -1 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 10: Minimum integer edge case
    console.log("Test 10: Minimum Integer Edge Case");
    console.log("  Input: x = 1, n = -2147483648");
    console.log("  Output:", myPow(1, -2147483648));
    console.log("  Expected: 1");
    console.log(
      "  Result:",
      myPow(1, -2147483648) === 1 ? "✓ PASS" : "✗ FAIL"
    );
    console.log("  Note: Handles minimum integer without overflow!");
    console.log();

    // Test 11: Odd exponent
    console.log("Test 11: Odd Exponent");
    console.log("  Input: x = 2, n = 13");
    console.log("  Output:", myPow(2, 13));
    console.log("  Expected: 8192");
    console.log("  Result:", myPow(2, 13) === 8192 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 12: Negative base, odd exponent
    console.log("Test 12: Negative Base, Odd Exponent");
    console.log("  Input: x = -2, n = 5");
    console.log("  Output:", myPow(-2, 5));
    console.log("  Expected: -32");
    console.log("  Result:", myPow(-2, 5) === -32 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Performance Comparison
    console.log("═══════════════════════════════════════════════════════════");
    console.log("SPACE COMPLEXITY ADVANTAGE:");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("Recursive: O(log n) - uses call stack");
    console.log("Iterative: O(1) - only uses 3 variables!");
    console.log("");
    console.log("For n = 1,000,000,000:");
    console.log("  Recursive: ~30 stack frames");
    console.log("  Iterative: 0 stack frames! ✅");
    console.log("═══════════════════════════════════════════════════════════\n");
  }
}

// Run tests
PowXNIterative.runTests();
