/**
 * Count Good Numbers - OPTIMAL SOLUTION
 * ======================================
 *
 * Problem: Count good digit strings of length n where:
 * - Digits at EVEN indices (0, 2, 4, ...) are EVEN (0, 2, 4, 6, 8) - 5 choices
 * - Digits at ODD indices (1, 3, 5, ...) are PRIME (2, 3, 5, 7) - 4 choices
 *
 * Approach: Binary Exponentiation with Modular Arithmetic
 * - evenCount = ⌈n/2⌉ positions with 5 choices each
 * - oddCount = ⌊n/2⌋ positions with 4 choices each
 * - Answer = 5^evenCount × 4^oddCount mod (10^9 + 7)
 *
 * Time Complexity: O(log n) - Binary exponentiation
 * Space Complexity: O(1) - Iterative approach
 *
 * Key Insight:
 * This is a DIRECT APPLICATION of Pow(x, n) with modular arithmetic!
 * We need to calculate: (5^a × 4^b) % MOD efficiently
 */

namespace CountGoodNumbers {
  const MOD = 1000000007; // 10^9 + 7

  /**
   * Count good numbers of length n
   *
   * @param n - Length of the digit string (1 <= n <= 10^15)
   * @returns Count of good numbers modulo 10^9 + 7
   *
   * @complexity
   * Time: O(log n) - Two binary exponentiations
   * Space: O(1) - Constant space
   *
   * @example
   * countGoodNumbers(1) → 5
   * countGoodNumbers(4) → 400
   * countGoodNumbers(50) → 564908303
   */
  function countGoodNumbers(n: number): number {
    // ═══════════════════════════════════════════════════════════
    // STEP 1: Calculate count of even and odd positions
    // ═══════════════════════════════════════════════════════════
    // For n digits with indices [0, 1, 2, ..., n-1]:
    //   Even indices: 0, 2, 4, 6, ...
    //   Odd indices:  1, 3, 5, 7, ...
    //
    // Examples:
    //   n=1: [0]           → 1 even, 0 odd
    //   n=2: [0,1]         → 1 even, 1 odd
    //   n=3: [0,1,2]       → 2 even, 1 odd
    //   n=4: [0,1,2,3]     → 2 even, 2 odd
    //   n=5: [0,1,2,3,4]   → 3 even, 2 odd
    //
    // Pattern:
    //   evenCount = ceiling(n/2) = (n + 1) / 2
    //   oddCount = floor(n/2) = n / 2

    const evenCount = Math.ceil(n / 2); // Positions at even indices
    const oddCount = Math.floor(n / 2); // Positions at odd indices

    // ═══════════════════════════════════════════════════════════
    // STEP 2: Calculate powers using Binary Exponentiation
    // ═══════════════════════════════════════════════════════════
    // WHY: n can be up to 10^15, so we MUST use O(log n) algorithm
    //
    // evenPower: 5^evenCount % MOD
    // - Each even position has 5 choices (0, 2, 4, 6, 8)
    //
    // oddPower: 4^oddCount % MOD
    // - Each odd position has 4 choices (2, 3, 5, 7)

    const evenPower = modPow(5, evenCount, MOD);
    const oddPower = modPow(4, oddCount, MOD);

    // ═══════════════════════════════════════════════════════════
    // STEP 3: Multiply and return with modulo
    // ═══════════════════════════════════════════════════════════
    // Total combinations = evenPower × oddPower
    // IMPORTANT: Apply modulo to avoid overflow
    //
    // Modular multiplication: (a × b) % m = ((a % m) × (b % m)) % m
    //
    // JAVASCRIPT PRECISION FIX:
    // When multiplying two large numbers close to 10^9, the product can
    // exceed JavaScript's safe integer range (2^53 - 1).
    // Use BigInt to ensure correct multiplication, then convert back.

    return Number((BigInt(evenPower) * BigInt(oddPower)) % BigInt(MOD));
  }

  /**
   * Modular Exponentiation using Binary Exponentiation
   *
   * Calculate (base^exp) % mod efficiently
   *
   * @param base - Base number
   * @param exp - Exponent (can be very large, up to 10^15)
   * @param mod - Modulo value
   * @returns (base^exp) % mod
   *
   * @complexity
   * Time: O(log exp) - Halve exponent each iteration
   * Space: O(1) - Constant space
   *
   * WHY MODULAR ARITHMETIC?
   * Without modulo: 5^(5×10^14) would overflow any data type!
   * With modulo: Numbers stay small (< 10^9 + 7) at each step
   *
   * PROPERTY: (a × b) % m = ((a % m) × (b % m)) % m
   * This allows us to apply modulo at each multiplication
   */
  function modPow(base: number, exp: number, mod: number): number {
    // BASE CASE: Anything^0 = 1
    if (exp === 0) {
      return 1;
    }

    // Ensure base is within modulo range
    // WHY: Prevents overflow in first multiplication
    base = base % mod;

    // Initialize result
    let result = 1;

    // ═══════════════════════════════════════════════════════════
    // BINARY EXPONENTIATION LOOP
    // ═══════════════════════════════════════════════════════════
    // Process each bit of exp from right to left
    // Multiply result when bit is 1 (exp is odd)
    //
    // INVARIANT: result × base^exp ≡ original_base^original_exp (mod m)
    //
    // Example: 5^13 % 1000000007 where 13 = 1101₂
    //   Bit 0: 1 → multiply by 5^1
    //   Bit 1: 0 → skip 5^2
    //   Bit 2: 1 → multiply by 5^4
    //   Bit 3: 1 → multiply by 5^8
    //   Result: 5^(1+4+8) = 5^13 ✓

    while (exp > 0) {
      // Check if current bit is 1 (exp is odd)
      if (exp % 2 === 1) {
        // Multiply result by current base
        // IMPORTANT: Apply modulo to prevent overflow
        // Use BigInt for JavaScript precision safety
        result = Number((BigInt(result) * BigInt(base)) % BigInt(mod));
      }

      // Square the base for next bit
      // IMPORTANT: Apply modulo to prevent overflow
      // Use BigInt for JavaScript precision safety
      base = Number((BigInt(base) * BigInt(base)) % BigInt(mod));

      // Move to next bit (divide exp by 2)
      exp = Math.floor(exp / 2);
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example 1: n = 4
   * ═══════════════════════════════════════════════════════════
   *
   * Input: n = 4
   *
   * ───────────────────────────────────────────────────────────
   * STEP 1: Count Positions
   * ───────────────────────────────────────────────────────────
   * Indices: [0, 1, 2, 3]
   *
   * Even indices (0, 2):
   *   Index 0: Can be 0, 2, 4, 6, or 8 → 5 choices
   *   Index 2: Can be 0, 2, 4, 6, or 8 → 5 choices
   *   evenCount = 2
   *
   * Odd indices (1, 3):
   *   Index 1: Can be 2, 3, 5, or 7 → 4 choices
   *   Index 3: Can be 2, 3, 5, or 7 → 4 choices
   *   oddCount = 2
   *
   * Calculation:
   *   evenCount = Math.ceil(4 / 2) = 2 ✓
   *   oddCount = Math.floor(4 / 2) = 2 ✓
   *
   * ───────────────────────────────────────────────────────────
   * STEP 2: Calculate Powers
   * ───────────────────────────────────────────────────────────
   *
   * evenPower = modPow(5, 2, 1000000007)
   *
   * Binary Exponentiation for 5^2:
   *   Initial: result = 1, base = 5, exp = 2
   *
   *   Iteration 1:
   *     exp = 2 (binary: 10)
   *     2 % 2 = 0 → EVEN → Skip multiplication
   *     base = (5 × 5) % MOD = 25
   *     exp = 2 / 2 = 1
   *
   *   Iteration 2:
   *     exp = 1 (binary: 1)
   *     1 % 2 = 1 → ODD → Multiply
   *     result = (1 × 25) % MOD = 25
   *     base = (25 × 25) % MOD = 625
   *     exp = 1 / 2 = 0 → DONE
   *
   *   evenPower = 25 ✓
   *
   * oddPower = modPow(4, 2, 1000000007)
   *
   * Binary Exponentiation for 4^2:
   *   Initial: result = 1, base = 4, exp = 2
   *
   *   Iteration 1:
   *     exp = 2 (binary: 10)
   *     2 % 2 = 0 → EVEN → Skip multiplication
   *     base = (4 × 4) % MOD = 16
   *     exp = 2 / 2 = 1
   *
   *   Iteration 2:
   *     exp = 1 (binary: 1)
   *     1 % 2 = 1 → ODD → Multiply
   *     result = (1 × 16) % MOD = 16
   *     base = (16 × 16) % MOD = 256
   *     exp = 1 / 2 = 0 → DONE
   *
   *   oddPower = 16 ✓
   *
   * ───────────────────────────────────────────────────────────
   * STEP 3: Multiply and Return
   * ───────────────────────────────────────────────────────────
   * result = (evenPower × oddPower) % MOD
   *        = (25 × 16) % 1000000007
   *        = 400 % 1000000007
   *        = 400 ✓
   *
   * Final Answer: 400
   * Expected: 400 ✓
   *
   * Verification:
   *   Total good 4-digit strings = 5^2 × 4^2 = 25 × 16 = 400 ✓
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 2: n = 1
   * ═══════════════════════════════════════════════════════════
   *
   * Input: n = 1
   *
   * ───────────────────────────────────────────────────────────
   * STEP 1: Count Positions
   * ───────────────────────────────────────────────────────────
   * Indices: [0]
   *
   * Even indices (0): evenCount = 1
   * Odd indices: (none) oddCount = 0
   *
   * Calculation:
   *   evenCount = Math.ceil(1 / 2) = 1 ✓
   *   oddCount = Math.floor(1 / 2) = 0 ✓
   *
   * ───────────────────────────────────────────────────────────
   * STEP 2: Calculate Powers
   * ───────────────────────────────────────────────────────────
   * evenPower = modPow(5, 1, MOD) = 5
   * oddPower = modPow(4, 0, MOD) = 1 (anything^0 = 1)
   *
   * ───────────────────────────────────────────────────────────
   * STEP 3: Multiply
   * ───────────────────────────────────────────────────────────
   * result = (5 × 1) % MOD = 5 ✓
   *
   * Final Answer: 5
   * Expected: 5 ✓
   *
   * Good numbers: "0", "2", "4", "6", "8" (all even digits)
   *
   *
   * ═══════════════════════════════════════════════════════════
   * Example 3: n = 50
   * ═══════════════════════════════════════════════════════════
   *
   * Input: n = 50
   *
   * ───────────────────────────────────────────────────────────
   * STEP 1: Count Positions
   * ───────────────────────────────────────────────────────────
   * evenCount = Math.ceil(50 / 2) = 25
   * oddCount = Math.floor(50 / 2) = 25
   *
   * ───────────────────────────────────────────────────────────
   * STEP 2: Calculate Powers
   * ───────────────────────────────────────────────────────────
   * evenPower = modPow(5, 25, MOD)
   *   5^25 is HUGE without modulo!
   *   5^25 = 298023223876953125
   *   With modulo at each step: result stays < 10^9 + 7
   *   Binary exp takes only log₂(25) ≈ 5 iterations!
   *
   * oddPower = modPow(4, 25, MOD)
   *   4^25 is also HUGE!
   *   4^25 = 1125899906842624
   *   With modulo: result stays manageable
   *
   * ───────────────────────────────────────────────────────────
   * STEP 3: Multiply
   * ───────────────────────────────────────────────────────────
   * result = (evenPower × oddPower) % MOD
   *        = 564908303
   *
   * Final Answer: 564908303 ✓
   *
   *
   * ═══════════════════════════════════════════════════════════
   * WHY BINARY EXPONENTIATION IS ESSENTIAL
   * ═══════════════════════════════════════════════════════════
   *
   * For n = 10^15 (maximum constraint):
   *
   * evenCount ≈ 5 × 10^14
   * oddCount ≈ 5 × 10^14
   *
   * Brute Force Approach:
   *   Time: O(evenCount) = O(5 × 10^14) multiplications
   *   Result: TLE (Time Limit Exceeded) ❌
   *   Even at 1 billion ops/sec, would take ~500 seconds!
   *
   * Binary Exponentiation Approach:
   *   Time: O(log(5 × 10^14)) ≈ O(50) multiplications
   *   Result: Completes in microseconds ✅
   *
   * Speedup: 10,000,000,000,000× faster! 🚀
   *
   * This is why we MUST use Binary Exponentiation for this problem!
   */

  // ==================== TEST CASES ====================

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("Testing Count Good Numbers");
    console.log("═══════════════════════════════════════════════════════════\n");

    // Test 1: Single digit
    console.log("Test 1: Single Digit (n = 1)");
    console.log("  Input: n = 1");
    console.log("  Output:", countGoodNumbers(1));
    console.log("  Expected: 5");
    console.log("  Good numbers: 0, 2, 4, 6, 8");
    console.log("  Result:", countGoodNumbers(1) === 5 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 2: Four digits
    console.log("Test 2: Four Digits (n = 4)");
    console.log("  Input: n = 4");
    console.log("  Output:", countGoodNumbers(4));
    console.log("  Expected: 400");
    console.log("  Calculation: 5^2 × 4^2 = 25 × 16 = 400");
    console.log("  Result:", countGoodNumbers(4) === 400 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 3: Fifty digits
    console.log("Test 3: Fifty Digits (n = 50)");
    console.log("  Input: n = 50");
    console.log("  Output:", countGoodNumbers(50));
    console.log("  Expected: 564908303");
    console.log("  Note: Result after modulo 10^9 + 7");
    console.log(
      "  Result:",
      countGoodNumbers(50) === 564908303 ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 4: Two digits
    console.log("Test 4: Two Digits (n = 2)");
    console.log("  Input: n = 2");
    console.log("  Output:", countGoodNumbers(2));
    console.log("  Expected: 20");
    console.log("  Calculation: 5^1 × 4^1 = 5 × 4 = 20");
    console.log("  Result:", countGoodNumbers(2) === 20 ? "✓ PASS" : "✗ FAIL");
    console.log();

    // Test 5: Odd length
    console.log("Test 5: Odd Length (n = 5)");
    console.log("  Input: n = 5");
    console.log("  Output:", countGoodNumbers(5));
    console.log("  Expected: 2000");
    console.log("  evenCount = 3, oddCount = 2");
    console.log("  Calculation: 5^3 × 4^2 = 125 × 16 = 2000");
    console.log(
      "  Result:",
      countGoodNumbers(5) === 2000 ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 6: Large number
    console.log("Test 6: Large Number (n = 100)");
    console.log("  Input: n = 100");
    const start = Date.now();
    const result = countGoodNumbers(100);
    const time = Date.now() - start;
    console.log("  Output:", result);
    console.log("  Time taken:", time, "ms (should be < 1ms)");
    console.log("  Note: Binary exp makes this instant!");
    console.log();

    // Performance Note
    console.log("═══════════════════════════════════════════════════════════");
    console.log("WHY BINARY EXPONENTIATION IS ESSENTIAL:");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("For n = 10^15 (maximum constraint):");
    console.log("  Brute Force: ~5 × 10^14 operations → TLE ❌");
    console.log("  Binary Exp:  ~50 operations → PASS ✅");
    console.log("");
    console.log("Speedup: 10 TRILLION times faster! 🚀");
    console.log("═══════════════════════════════════════════════════════════\n");
  }
}

// Run tests
CountGoodNumbers.runTests();
