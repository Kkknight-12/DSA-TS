/**
 * Pow(x, n) - OPTIMAL APPROACH (BINARY EXPONENTIATION)
 * =====================================================
 *
 * Problem: Calculate x raised to the power n (x^n)
 *
 * Approach: Binary Exponentiation using Divide & Conquer (Recursive)
 * - Split the exponent in half recursively
 * - x^n = (x^(n/2))^2 for even n
 * - x^n = (x^(n/2))^2 × x for odd n
 *
 * Time Complexity: O(log n) - Exponentially faster than O(n)!
 * Space Complexity: O(log n) - Recursion stack depth
 *
 * Why this is OPTIMAL:
 * - For n = 1,000,000,000 → Only ~30 multiplications!
 * - Passes all LeetCode test cases
 * - Classic example of Divide & Conquer paradigm
 *
 * Key Insight:
 * Instead of: 2^10 = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 (10 mults)
 * We do:      2^10 = (2^5)^2 = ((2^2)^2 × 2)^2 (only 4 mults!)
 */

namespace PowXNOptimal {
  /**
   * Calculate x^n using Binary Exponentiation (Divide & Conquer)
   *
   * @param x - Base number (can be negative, decimal, or integer)
   * @param n - Exponent (integer, can be negative or positive)
   * @returns x raised to the power n
   *
   * @complexity
   * Time: O(log n) - Halves exponent each recursion
   * Space: O(log n) - Recursion stack depth
   *
   * @example
   * myPow(2, 10) → 1024 (only 4 multiplications!)
   * myPow(2, -2) → 0.25
   * myPow(2.1, 3) → 9.261
   */
  function myPow(x: number, n: number): number {
    // ═══════════════════════════════════════════════════════════
    // BASE CASE: x^0 = 1
    // ═══════════════════════════════════════════════════════════
    // WHY: Any number raised to power 0 equals 1 (mathematical definition)
    // EXAMPLE: 5^0 = 1, (-3)^0 = 1, 0.5^0 = 1
    // RECURSION: This is our ONLY stopping condition
    // NOTE: We don't need n === 1 base case - it will naturally compute via:
    //       myPow(x, 1) → halfPower = myPow(x, 0) = 1
    //                   → return 1 × 1 × x = x ✓
    if (n === 0) {
      return 1;
    }

    // ═══════════════════════════════════════════════════════════
    // EDGE CASE: Negative Exponent
    // ═══════════════════════════════════════════════════════════
    // WHY: x^(-n) = 1 / (x^n)
    // EXAMPLE: 2^(-3) = 1 / (2^3) = 1/8 = 0.125
    // STRATEGY: Convert to positive exponent problem
    //
    // CRITICAL EDGE CASE: n = -2147483648 (minimum 32-bit integer)
    // Problem: -(-2147483648) = 2147483648 (overflows 32-bit int!)
    // Solution: Handle separately before recursion
    if (n === -2147483648) {
      // x^(-2147483648) = 1 / (x^2147483648)
      // Break it down: x^2147483648 = (x^2)^1073741824
      // WHY: Avoid overflow by reducing base instead of flipping n
      return myPow(1 / (x * x), 1073741824);
    }

    // For other negative exponents, convert to positive
    if (n < 0) {
      // Convert x^(-n) to (1/x)^n
      // EXAMPLE: 2^(-5) becomes (0.5)^5
      return myPow(1 / x, -n);
    }

    // ═══════════════════════════════════════════════════════════
    // DIVIDE STEP: Calculate half power
    // ═══════════════════════════════════════════════════════════
    // WHY: Key insight of Binary Exponentiation!
    //      x^n can be computed from x^(n/2)
    //
    // DIVIDE: Split exponent in half
    // EXAMPLE: x^10 → calculate x^5, then square it
    //
    // IMPORTANT: Store result in variable to avoid recalculating!
    // BAD:  return myPow(x, n/2) * myPow(x, n/2)  ← Calculates twice!
    // GOOD: const halfPower = myPow(x, n/2)       ← Calculate once, reuse!
    const halfPower = myPow(x, Math.floor(n / 2));

    // ═══════════════════════════════════════════════════════════
    // COMBINE STEP: Square the half power (and multiply x if odd)
    // ═══════════════════════════════════════════════════════════
    // WHY: This is where the magic happens!
    //
    // For EVEN exponent:
    //   x^n = (x^(n/2)) × (x^(n/2)) = (x^(n/2))^2
    //   EXAMPLE: 2^10 = (2^5)^2 = 32^2 = 1024
    //
    // For ODD exponent:
    //   x^n = (x^(n/2)) × (x^(n/2)) × x = (x^(n/2))^2 × x
    //   EXAMPLE: 2^9 = (2^4)^2 × 2 = 16^2 × 2 = 256 × 2 = 512
    //
    // WHY n/2? Because we're splitting the exponent
    //   2^10 = 2^(5+5) = 2^5 × 2^5
    //   2^9 = 2^(4+4+1) = 2^4 × 2^4 × 2^1

    if (n % 2 === 0) {
      // EVEN: Just square the half power
      // EXAMPLE: 2^10 → halfPower = 2^5 = 32 → return 32 × 32 = 1024
      return halfPower * halfPower;
    } else {
      // ODD: Square the half power and multiply by x once more
      // EXAMPLE: 2^9 → halfPower = 2^4 = 16 → return 16 × 16 × 2 = 512
      return halfPower * halfPower * x;
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example 1: Calculate 2^10 (Even Exponent)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = 10
   *
   * Call Stack (grows DOWN, returns UP):
   *
   * ┌─────────────────────────────────────────────────────────┐
   * │ CALL 1: myPow(2, 10)                                    │
   * ├─────────────────────────────────────────────────────────┤
   * │ n = 10 (even)                                           │
   * │ Not base case, calculate halfPower:                     │
   * │   halfPower = myPow(2, 5) → Recursive call             │
   * │                                                         │
   * │   ┌───────────────────────────────────────────────────┐ │
   * │   │ CALL 2: myPow(2, 5)                               │ │
   * │   ├───────────────────────────────────────────────────┤ │
   * │   │ n = 5 (odd)                                       │ │
   * │   │ Not base case, calculate halfPower:               │ │
   * │   │   halfPower = myPow(2, 2) → Recursive call       │ │
   * │   │                                                   │ │
   * │   │   ┌─────────────────────────────────────────────┐ │ │
   * │   │   │ CALL 3: myPow(2, 2)                         │ │ │
   * │   │   ├─────────────────────────────────────────────┤ │ │
   * │   │   │ n = 2 (even)                                │ │ │
   * │   │   │ Not base case, calculate halfPower:         │ │ │
   * │   │   │   halfPower = myPow(2, 1) → Recursive call │ │ │
   * │   │   │                                             │ │ │
   * │   │   │   ┌───────────────────────────────────────┐ │ │ │
   * │   │   │   │ CALL 4: myPow(2, 1)                   │ │ │ │
   * │   │   │   ├───────────────────────────────────────┤ │ │ │
   * │   │   │   │ n = 1 (odd)                           │ │ │ │
   * │   │   │   │ halfPower = myPow(2, 0) → Recursive  │ │ │ │
   * │   │   │   │                                       │ │ │ │
   * │   │   │   │   ┌─────────────────────────────────┐ │ │ │ │
   * │   │   │   │   │ CALL 5: myPow(2, 0)             │ │ │ │ │
   * │   │   │   │   ├─────────────────────────────────┤ │ │ │ │
   * │   │   │   │   │ n = 0 → BASE CASE!              │ │ │ │ │
   * │   │   │   │   │ Return: 1                       │ │ │ │ │
   * │   │   │   │   └─────────────────────────────────┘ │ │ │ │
   * │   │   │   │                                       │ │ │ │
   * │   │   │   │ halfPower = 1                         │ │ │ │
   * │   │   │   │ n is odd (1 % 2 == 1)                │ │ │ │
   * │   │   │   │ Return: 1 × 1 × 2 = 2                │ │ │ │
   * │   │   │   └───────────────────────────────────────┘ │ │ │
   * │   │   │                                             │ │ │
   * │   │   │ halfPower = 2                               │ │ │
   * │   │   │ n is even (2 % 2 == 0)                      │ │ │
   * │   │   │ Return: 2 × 2 = 4                           │ │ │
   * │   │   └─────────────────────────────────────────────┘ │ │
   * │   │                                                   │ │
   * │   │ halfPower = 4                                     │ │
   * │   │ n is odd (5 % 2 == 1)                            │ │
   * │   │ Return: 4 × 4 × 2 = 32                           │ │
   * │   └───────────────────────────────────────────────────┘ │
   * │                                                         │
   * │ halfPower = 32                                          │
   * │ n is even (10 % 2 == 0)                                │
   * │ Return: 32 × 32 = 1024 ✓                               │
   * └─────────────────────────────────────────────────────────┘
   *
   * Final Result: 1024
   * Expected: 2^10 = 1024 ✓
   *
   * Recursion Depth: 5 levels
   * Multiplications: Only 4 (vs 10 in brute force!)
   *
   * Trace of calculations:
   *   2^0 = 1                  (base case)
   *   2^1 = 1 × 1 × 2 = 2      (square 2^0, multiply x)
   *   2^2 = 2 × 2 = 4          (square 2^1)
   *   2^5 = 4 × 4 × 2 = 32     (square 2^2, multiply x)
   *   2^10 = 32 × 32 = 1024    (square 2^5)
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 2: Calculate 2^(-3) (Negative Exponent)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = -3
   *
   * ┌─────────────────────────────────────────────────────────┐
   * │ CALL 1: myPow(2, -3)                                    │
   * ├─────────────────────────────────────────────────────────┤
   * │ n = -3 (negative!)                                      │
   * │ Hit negative exponent case:                             │
   * │   Convert to: myPow(1/x, -n) = myPow(0.5, 3)           │
   * │                                                         │
   * │   ┌───────────────────────────────────────────────────┐ │
   * │   │ CALL 2: myPow(0.5, 3)                             │ │
   * │   ├───────────────────────────────────────────────────┤ │
   * │   │ n = 3 (odd)                                       │ │
   * │   │ halfPower = myPow(0.5, 1) → Recursive call       │ │
   * │   │                                                   │ │
   * │   │   ┌─────────────────────────────────────────────┐ │ │
   * │   │   │ CALL 3: myPow(0.5, 1)                       │ │ │
   * │   │   ├─────────────────────────────────────────────┤ │ │
   * │   │   │ n = 1 (odd)                                 │ │ │
   * │   │   │ halfPower = myPow(0.5, 0) → Recursive      │ │ │
   * │   │   │                                             │ │ │
   * │   │   │   ┌───────────────────────────────────────┐ │ │ │
   * │   │   │   │ CALL 4: myPow(0.5, 0)                 │ │ │ │
   * │   │   │   ├───────────────────────────────────────┤ │ │ │
   * │   │   │   │ n = 0 → BASE CASE!                    │ │ │ │
   * │   │   │   │ Return: 1                             │ │ │ │
   * │   │   │   └───────────────────────────────────────┘ │ │ │
   * │   │   │                                             │ │ │
   * │   │   │ halfPower = 1                               │ │ │
   * │   │   │ n is odd (1 % 2 == 1)                      │ │ │
   * │   │   │ Return: 1 × 1 × 0.5 = 0.5                  │ │ │
   * │   │   └─────────────────────────────────────────────┘ │ │
   * │   │                                                   │ │
   * │   │ halfPower = 0.5                                   │ │
   * │   │ n is odd (3 % 2 == 1)                            │ │
   * │   │ Return: 0.5 × 0.5 × 0.5 = 0.125                  │ │
   * │   └───────────────────────────────────────────────────┘ │
   * │                                                         │
   * │ Return: 0.125                                           │
   * └─────────────────────────────────────────────────────────┘
   *
   * Final Result: 0.125
   * Expected: 2^(-3) = 1/(2^3) = 1/8 = 0.125 ✓
   *
   * Note: By converting x to 1/x and n to positive,
   *       we compute (1/2)^3 = 0.125 directly!
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 3: Calculate 2^11 (Odd Exponent)
   * ═══════════════════════════════════════════════════════════
   *
   * Input: x = 2, n = 11
   *
   * ┌─────────────────────────────────────────────────────────┐
   * │ CALL 1: myPow(2, 11)                                    │
   * ├─────────────────────────────────────────────────────────┤
   * │ n = 11 (odd)                                            │
   * │ halfPower = myPow(2, 5)                                │
   * │   → (recursive calls... returns 32)                     │
   * │ halfPower = 32                                          │
   * │ n is odd (11 % 2 == 1)                                 │
   * │ Return: 32 × 32 × 2 = 2048 ✓                           │
   * └─────────────────────────────────────────────────────────┘
   *
   * Key Pattern for Odd Exponents:
   *   We need to multiply by x ONE extra time!
   *   2^11 = 2^(5+5+1) = 2^5 × 2^5 × 2
   *
   *
   * ═══════════════════════════════════════════════════════════
   * RECURSION TREE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * For myPow(2, 10):
   *
   *                 2^10 (n=10, even)
   *                        |
   *                 [Calculate 2^5]
   *                        |
   *                  2^5 (n=5, odd)
   *                        |
   *                 [Calculate 2^2]
   *                        |
   *                 2^2 (n=2, even)
   *                        |
   *                 [Calculate 2^1]
   *                        |
   *                  2^1 (n=1, odd)
   *                        |
   *                 [Calculate 2^0]
   *                        |
   *                 2^0 (n=0, BASE!)
   *                        ↓
   *                    return 1
   *                        ↑
   *                 [1 × 1 × 2 = 2]
   *                        ↑
   *                  [2 × 2 = 4]
   *                        ↑
   *                 [4 × 4 × 2 = 32]
   *                        ↑
   *                 [32 × 32 = 1024]
   *
   * Depth: 5 levels = log₂(10) ≈ 3.3 → ⌈3.3⌉ = 4, +1 for n=1→0
   * Operations: 4 multiplications total
   *
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Zero Exponent:
   *    Input: x = 100, n = 0
   *    Output: 1 (base case, immediate return)
   *
   * 2. Exponent = 1:
   *    Input: x = 7.5, n = 1
   *    Output: 7.5 (base case, immediate return)
   *
   * 3. Large Negative (Minimum Integer):
   *    Input: x = 2, n = -2147483648
   *    Special handling: myPow(1/(2×2), 1073741824)
   *    Avoids overflow by reducing base instead of flipping n
   *
   * 4. x = 1:
   *    Input: x = 1, n = 1000000000
   *    Works perfectly! 1^anything = 1
   *    Recursion still happens but very fast
   *
   * 5. x = -1 (Alternating sign):
   *    Input: x = -1, n = 10 (even)
   *    Output: 1 (negative squared even times = positive)
   *
   *    Input: x = -1, n = 11 (odd)
   *    Output: -1 (negative squared odd times = negative)
   *
   *
   * ═══════════════════════════════════════════════════════════
   * WHY BINARY EXPONENTIATION IS BRILLIANT
   * ═══════════════════════════════════════════════════════════
   *
   * Comparison for n = 1,000,000,000:
   *
   * Brute Force (O(n)):
   *   - 1,000,000,000 multiplications
   *   - Takes ~10-30 seconds
   *   - TLE (Time Limit Exceeded) ❌
   *
   * Binary Exponentiation (O(log n)):
   *   - log₂(1,000,000,000) ≈ 30 multiplications
   *   - Takes microseconds
   *   - Passes all test cases ✅
   *
   * Speedup: 33,333,333× faster! 🚀
   *
   * This is the power of Divide & Conquer!
   */

  // ==================== TEST CASES ====================

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Testing Pow(x, n) - OPTIMAL (Binary Exponentiation)');
    console.log(
      '═══════════════════════════════════════════════════════════\n'
    );

    // Test 1: Basic positive exponent
    console.log('Test 1: Basic Positive Exponent');
    console.log('  Input: x = 2, n = 10');
    console.log('  Output:', myPow(2, 10));
    console.log('  Expected: 1024');
    console.log('  Result:', myPow(2, 10) === 1024 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 2: Decimal base
    console.log('Test 2: Decimal Base');
    console.log('  Input: x = 2.1, n = 3');
    console.log('  Output:', myPow(2.1, 3));
    console.log('  Expected: 9.261');
    console.log(
      '  Result:',
      Math.abs(myPow(2.1, 3) - 9.261) < 0.00001 ? '✓ PASS' : '✗ FAIL'
    );
    console.log();

    // Test 3: Negative exponent
    console.log('Test 3: Negative Exponent');
    console.log('  Input: x = 2, n = -2');
    console.log('  Output:', myPow(2, -2));
    console.log('  Expected: 0.25');
    console.log('  Result:', myPow(2, -2) === 0.25 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 4: Zero exponent
    console.log('Test 4: Zero Exponent');
    console.log('  Input: x = 5, n = 0');
    console.log('  Output:', myPow(5, 0));
    console.log('  Expected: 1');
    console.log('  Result:', myPow(5, 0) === 1 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 5: Exponent = 1
    console.log('Test 5: Exponent = 1');
    console.log('  Input: x = 3.5, n = 1');
    console.log('  Output:', myPow(3.5, 1));
    console.log('  Expected: 3.5');
    console.log('  Result:', myPow(3.5, 1) === 3.5 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 6: Large exponent (performance test)
    console.log('Test 6: Large Exponent (Performance Test)');
    console.log('  Input: x = 2, n = 30');
    const start = Date.now();
    const result6 = myPow(2, 30);
    const elapsed = Date.now() - start;
    console.log('  Output:', result6);
    console.log('  Expected: 1073741824');
    console.log('  Time taken:', elapsed, 'ms (should be < 1ms)');
    console.log(
      '  Result:',
      result6 === 1073741824 && elapsed < 10 ? '✓ PASS' : '✗ FAIL'
    );
    console.log();

    // Test 7: x = 1 (any power)
    console.log('Test 7: x = 1 (Any Power)');
    console.log('  Input: x = 1, n = 1000000');
    console.log('  Output:', myPow(1, 1000000));
    console.log('  Expected: 1');
    console.log('  Result:', myPow(1, 1000000) === 1 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 8: x = -1 (even exponent)
    console.log('Test 8: x = -1 (Even Exponent)');
    console.log('  Input: x = -1, n = 10');
    console.log('  Output:', myPow(-1, 10));
    console.log('  Expected: 1');
    console.log('  Result:', myPow(-1, 10) === 1 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 9: x = -1 (odd exponent)
    console.log('Test 9: x = -1 (Odd Exponent)');
    console.log('  Input: x = -1, n = 11');
    console.log('  Output:', myPow(-1, 11));
    console.log('  Expected: -1');
    console.log('  Result:', myPow(-1, 11) === -1 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 10: Minimum integer edge case
    console.log('Test 10: Minimum Integer Edge Case');
    console.log('  Input: x = 1, n = -2147483648');
    console.log('  Output:', myPow(1, -2147483648));
    console.log('  Expected: 1');
    console.log('  Result:', myPow(1, -2147483648) === 1 ? '✓ PASS' : '✗ FAIL');
    console.log('  Note: Handles minimum integer without overflow!');
    console.log();

    // Test 11: Odd exponent
    console.log('Test 11: Odd Exponent');
    console.log('  Input: x = 2, n = 11');
    console.log('  Output:', myPow(2, 11));
    console.log('  Expected: 2048');
    console.log('  Result:', myPow(2, 11) === 2048 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Test 12: Negative base with odd exponent
    console.log('Test 12: Negative Base, Odd Exponent');
    console.log('  Input: x = -2, n = 5');
    console.log('  Output:', myPow(-2, 5));
    console.log('  Expected: -32');
    console.log('  Result:', myPow(-2, 5) === -32 ? '✓ PASS' : '✗ FAIL');
    console.log();

    // Performance Comparison
    console.log('═══════════════════════════════════════════════════════════');
    console.log('PERFORMANCE COMPARISON:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('For n = 1,000,000,000:');
    console.log('  Brute Force: ~1 billion operations (TLE ❌)');
    console.log('  Binary Exp:  ~30 operations (PASS ✅)');
    console.log('');
    console.log('Speedup: 33,333,333× faster! 🚀');
    console.log('');
    console.log('This is the power of Divide & Conquer!');
    console.log(
      '═══════════════════════════════════════════════════════════\n'
    );
  }
}

// Run tests
PowXNOptimal.runTests();