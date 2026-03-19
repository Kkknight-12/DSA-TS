/**
 * FIND SQUARE ROOT (FLOOR) - BINARY SEARCH (OPTIMAL)
 * ====================================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Hume floor(√n) dhundhna hai — matlab sabse bada integer
 * jiska square n se zyada na ho.
 *
 * Key observation:
 * Agar mid*mid <= n hai, toh mid ek CANDIDATE answer hai.
 * Aur hum aur bada candidate dhundhne ke liye RIGHT mein jaate hain.
 * Agar mid*mid > n hai, toh mid bahut bada hai → LEFT mein jao.
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  n = 28, √28 ≈ 5.29 → answer = 5                        │
 * │                                                          │
 * │  Search space: 1 ──────────────────── 28                │
 * │                                                          │
 * │  mid=14: 14²=196 > 28 → too big, go LEFT               │
 * │  mid=7:  7²=49  > 28 → too big, go LEFT                │
 * │  mid=4:  4²=16  < 28 → candidate! go RIGHT             │
 * │  mid=6:  6²=36  > 28 → too big, go LEFT                │
 * │  mid=5:  5²=25  < 28 → candidate! go RIGHT             │
 * │  left > right → STOP                                    │
 * │                                                          │
 * │  Last candidate saved = 5 ✅                            │
 * └──────────────────────────────────────────────────────────┘
 *
 * ALGORITHM:
 * ──────────
 * 1. left=1, right=n, result=0
 * 2. Binary search:
 *    a. mid = (left + right) / 2
 *    b. mid*mid == n → exact answer, return mid
 *    c. mid*mid < n  → result=mid (candidate), left=mid+1
 *    d. mid*mid > n  → right=mid-1
 * 3. Return result (last valid candidate)
 *
 * TIME COMPLEXITY: O(log n)
 *   - Search space n se start hoti hai, har iteration mein half hoti hai
 *   - log₂(28) ≈ 5 steps for n=28
 *
 * SPACE COMPLEXITY: O(1)
 *   - Sirf 3 variables: left, right, result
 */

namespace FindSquareRootOptimal {
  /**
   * Finds floor value of square root using binary search
   *
   * @param n - Non-negative integer
   * @returns floor(√n) — largest integer whose square ≤ n
   */
  function findSquareRoot(n: number): number {
    // Edge Case: √0 = 0, √1 = 1
    // WHY: Binary search below needs left=1, right=n — won't work for 0
    if (n === 0 || n === 1) return n;

    let left = 1;
    let right = n;
    let result = 0; // Stores last valid candidate (mid where mid² ≤ n)

    while (left <= right) {
      // WHY this formula: left + (right-left)/2 avoids integer overflow
      // vs (left+right)/2 which can overflow for large n
      const mid = Math.floor(left + (right - left) / 2);

      if (mid * mid === n) {
        // Perfect square! Exact answer mil gaya
        return mid;
      }

      if (mid * mid < n) {
        // mid is a valid candidate — mid² ≤ n
        // But kya aur bada candidate mil sakta hai? → right half explore karo
        result = mid; // Save as best answer so far
        left = mid + 1;
      } else {
        // mid² > n → mid bahut bada hai, chota dhundho
        right = mid - 1;
      }
    }

    // result = last mid where mid² < n = floor(√n)
    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: n = 28
   * Expected: floor(√28) = floor(5.29) = 5
   *
   * Initial State:
   *   left=1, right=28, result=0
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────┐
   * │ left=1, right=28                             │
   * │ mid = 1 + (28-1)/2 = 14                      │
   * │ 14² = 196 > 28 → right = 13                  │
   * │ result = 0 (unchanged)                       │
   * └──────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────┐
   * │ left=1, right=13                             │
   * │ mid = 1 + (13-1)/2 = 7                       │
   * │ 7² = 49 > 28 → right = 6                     │
   * │ result = 0 (unchanged)                       │
   * └──────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────┐
   * │ left=1, right=6                              │
   * │ mid = 1 + (6-1)/2 = 3                        │
   * │ 3² = 9 < 28 → result = 3, left = 4          │
   * └──────────────────────────────────────────────┘
   *
   * Iteration 4:
   * ┌──────────────────────────────────────────────┐
   * │ left=4, right=6                              │
   * │ mid = 4 + (6-4)/2 = 5                        │
   * │ 5² = 25 < 28 → result = 5, left = 6         │
   * └──────────────────────────────────────────────┘
   *
   * Iteration 5:
   * ┌──────────────────────────────────────────────┐
   * │ left=6, right=6                              │
   * │ mid = 6 + (6-6)/2 = 6                        │
   * │ 6² = 36 > 28 → right = 5                    │
   * │ result = 5 (unchanged)                       │
   * └──────────────────────────────────────────────┘
   *
   * left=6 > right=5 → EXIT LOOP
   * Return result = 5 ✅
   *
   * ───────────────────────────────────────────────
   * Example 2: n = 25 (perfect square)
   *
   * Iteration 1: mid=13, 13²=169 > 25 → right=12
   * Iteration 2: mid=6,  6²=36   > 25 → right=5
   * Iteration 3: mid=3,  3²=9    < 25 → result=3, left=4
   * Iteration 4: mid=4,  4²=16   < 25 → result=4, left=5
   * Iteration 5: mid=5,  5²=25  == 25 → return 5 ✅ (exact!)
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. n=0  → return 0 (handled before binary search)
   * 2. n=1  → return 1 (handled before binary search)
   * 3. n=2  → floor(√2) = 1
   *    mid=1: 1²=1 < 2 → result=1, left=2
   *    left=2 > right=2? No, mid=2: 2²=4 > 2 → right=1
   *    left=2 > right=1 → return result=1 ✅
   * 4. n=4  → exact: mid=2, 2²=4 == 4 → return 2 ✅
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Find Square Root - BINARY SEARCH (OPTIMAL)\n');

    const testCases: {
      n: number;
      expected: number;
      description: string;
    }[] = [
      // Basic examples
      { n: 4, expected: 2, description: 'Perfect square: √4 = 2' },
      { n: 8, expected: 2, description: 'Non-perfect: floor(√8) = 2' },
      { n: 28, expected: 5, description: 'Non-perfect: floor(√28) = 5' },

      // Edge cases
      { n: 0, expected: 0, description: 'n = 0' },
      { n: 1, expected: 1, description: 'n = 1' },
      { n: 2, expected: 1, description: 'n = 2: floor(√2) = 1' },
      { n: 3, expected: 1, description: 'n = 3: floor(√3) = 1' },

      // Perfect squares
      { n: 9, expected: 3, description: 'Perfect square: √9 = 3' },
      { n: 25, expected: 5, description: 'Perfect square: √25 = 5' },
      { n: 100, expected: 10, description: 'Perfect square: √100 = 10' },

      // Larger numbers
      { n: 99, expected: 9, description: 'Non-perfect: floor(√99) = 9' },
      { n: 101, expected: 10, description: 'Non-perfect: floor(√101) = 10' },
    ];

    let passed = 0;
    let failed = 0;

    for (const { n, expected, description } of testCases) {
      const result = findSquareRoot(n);
      const status = result === expected ? '✅' : '❌';

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   n = ${n}, Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   n = ${n}, Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log('═'.repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('═'.repeat(60));
  }
}

// Run tests
FindSquareRootOptimal.runTests();