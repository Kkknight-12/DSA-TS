/**
 * NTH ROOT OF A NUMBER - BINARY SEARCH ON ANSWER (OPTIMAL)
 * ==========================================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Problem: "Kya koi integer x exist karta hai jiska n-th power = m hai?"
 *
 * Yeh BINARY SEARCH ON ANSWER ka classic example hai.
 * Hum actual array pe search nahi kar rahe —
 * hum POSSIBLE ANSWERS [1..m] pe binary search kar rahe hain!
 *
 * Key observation:
 * Agar x^n < m  → x chota hai, bada try karo (right half)
 * Agar x^n > m  → x bada hai, chota try karo (left half)
 * Agar x^n = m  → ANSWER mil gaya!
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  n=3, m=27 → find x where x³ = 27                       │
 * │                                                          │
 * │  Search space (possible answers): [1, 2, 3, ... 27]     │
 * │                                    L              R      │
 * │                                                          │
 * │  mid=14: 14³=2744 > 27 → R=13                          │
 * │  mid=7:  7³=343  > 27 → R=6                            │
 * │  mid=3:  3³=27   = 27 → return 3 ✅                    │
 * └──────────────────────────────────────────────────────────┘
 *
 * WHY NOT just use Math.pow()?
 * Large numbers mein floating point errors aate hain.
 * Binary search integer answer dhundta hai accurately.
 *
 * ALGORITHM:
 * ──────────
 * 1. left=1, right=m (possible answer range)
 * 2. mid = (left+right)/2
 * 3. Calculate mid^n (overflow-safe way)
 *    - mid^n < m → left = mid+1
 *    - mid^n > m → right = mid-1
 *    - mid^n = m → return mid
 * 4. Loop ends without finding → return -1 (no integer root)
 *
 * TIME COMPLEXITY: O(log(m) × n)
 *   - Binary search: O(log m) iterations
 *   - Each power calculation: O(n) — loop n times
 *   - Total: O(n × log m)
 *
 * SPACE COMPLEXITY: O(1)
 */

namespace NthRootOptimal {
  /**
   * Helper: calculates mid^n safely, stops early if result exceeds m
   *
   * WHY needed: mid^n for large numbers can overflow JavaScript's safe integer limit
   * Returns: -1 if mid^n < m, 0 if mid^n === m, 1 if mid^n > m
   */
  function calculatePower(mid: number, n: number, m: number): number {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= mid;

      // Early exit: agar m se bada ho gaya toh aage multiply karne ki zaroorat nahi
      // WHY: Overflow prevent karta hai + time bachata hai
      if (result > m) return 1;
    }

    if (result === m) return 0;
    return -1;
  }

  /**
   * Finds nth root of m using binary search on answer space
   *
   * @param n - The root degree (e.g., 2 for square root, 3 for cube root)
   * @param m - The number to find root of
   * @returns Integer nth root if exists, -1 otherwise
   */
  function findNthRoot(n: number, m: number): number {
    // Edge cases:
    // n=1 → any number ka 1st root woh khud hota hai
    // m=1 → any root of 1 is 1
    if (n === 1) return m;
    if (m === 1) return 1;

    // Search space: possible answers [1..m]
    // WHY right=m: m^1 = m, toh answer kabhi m se bada nahi ho sakta
    let left = 1;
    let right = m;

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);
      const power = calculatePower(mid, n, m);

      if (power === 0) {
        // mid^n === m → exact integer root mil gaya!
        return mid;
      } else if (power === -1) {
        // mid^n < m → mid chota hai, bada try karo
        left = mid + 1;
      } else {
        // mid^n > m → mid bada hai, chota try karo
        right = mid - 1;
      }
    }

    // Koi integer nth root exist nahi karta
    return -1;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: n=3, m=27 → cube root of 27
   *
   * Search space: [1, 2, 3, 4, 5, ... 27]
   * left=1, right=27
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ON ANSWER SPACE
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌────────────────────────────────────────────────┐
   * │ left=1, right=27                               │
   * │ mid = 1 + (27-1)/2 = 14                        │
   * │ 14³ = 2744 > 27 → power=1 → right = 13        │
   * └────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌────────────────────────────────────────────────┐
   * │ left=1, right=13                               │
   * │ mid = 1 + (13-1)/2 = 7                         │
   * │ 7³ = 343 > 27 → power=1 → right = 6           │
   * └────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌────────────────────────────────────────────────┐
   * │ left=1, right=6                                │
   * │ mid = 1 + (6-1)/2 = 3                          │
   * │ 3³ = 27 = 27 → power=0 → return 3 ✅          │
   * └────────────────────────────────────────────────┘
   *
   * ───────────────────────────────────────────────────
   * Example 2: n=3, m=9 (no integer cube root)
   *
   * left=1, right=9
   * Iter 1: mid=5, 5³=125 > 9 → right=4
   * Iter 2: mid=2, 2³=8   < 9 → left=3
   * Iter 3: mid=3, 3³=27  > 9 → right=2
   *
   * left=3 > right=2 → EXIT
   * return -1 ✅ (cube root of 9 is ~2.08, not integer)
   *
   * ───────────────────────────────────────────────────
   * WHY calculatePower returns -1/0/1 instead of actual value?
   *
   * Mid^n for large numbers can be HUGE:
   * e.g., mid=1000, n=5 → 10^15 → exceeds safe integer!
   *
   * By stopping early when result > m, we:
   * 1. Prevent overflow
   * 2. Save computation time
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. n=1, m=14 → return 14 (14^1 = 14)
   * 2. m=1, any n → return 1 (1^n = 1 always)
   * 3. m=1000000000, n=9 → 10^9 → return 10 (10⁹ = 10^9) ✅
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Nth Root of Number - BINARY SEARCH ON ANSWER (OPTIMAL)\n");

    const testCases: {
      n: number;
      m: number;
      expected: number;
      description: string;
    }[] = [
      // Perfect roots
      { n: 2, m: 9,          expected: 3,  description: "Square root: √9 = 3" },
      { n: 3, m: 27,         expected: 3,  description: "Cube root: ∛27 = 3" },
      { n: 2, m: 25,         expected: 5,  description: "Square root: √25 = 5" },
      { n: 4, m: 16,         expected: 2,  description: "4th root: ⁴√16 = 2" },

      // No integer root
      { n: 3, m: 9,          expected: -1, description: "No integer cube root of 9" },
      { n: 2, m: 8,          expected: -1, description: "No integer square root of 8" },
      { n: 3, m: 26,         expected: -1, description: "No integer cube root of 26" },

      // Edge cases
      { n: 1, m: 14,         expected: 14, description: "1st root = number itself" },
      { n: 1, m: 1,          expected: 1,  description: "1st root of 1" },
      { n: 5, m: 1,          expected: 1,  description: "Any root of 1 = 1" },
      { n: 2, m: 1,          expected: 1,  description: "Square root of 1" },

      // Large numbers
      { n: 9, m: 1000000000, expected: 10, description: "9th root of 10^9 = 10" },
    ];

    let passed = 0;
    let failed = 0;

    for (const { n, m, expected, description } of testCases) {
      const result = findNthRoot(n, m);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   n=${n}, m=${m} → Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   n=${n}, m=${m} → Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
NthRootOptimal.runTests();
