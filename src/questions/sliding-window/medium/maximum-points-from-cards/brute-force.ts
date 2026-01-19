/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAXIMUM POINTS FROM CARDS - BRUTE FORCE (RECURSION)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Pick exactly k cards from either end, maximize total score
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * BRUTE FORCE INTUITION (Soch)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │  At each step, we have 2 CHOICES:                                          │
 * │  1. Pick card from LEFT (beginning)                                        │
 * │  2. Pick card from RIGHT (end)                                             │
 * │                                                                            │
 * │  We need to make k choices total.                                          │
 * │                                                                            │
 * │  BRUTE FORCE: Try ALL possible combinations!                               │
 * │  - Use recursion to explore both options at each step                      │
 * │  - Return the maximum sum we can achieve                                   │
 * │                                                                            │
 * │  Total combinations = 2^k (exponential!)                                   │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * RECURSION TREE VISUALIZATION
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 *   cardScore = [5, 4, 1, 3]    k = 2
 *
 *                          solve(0, 3, 2)
 *                         /              \
 *                pick left=5            pick right=3
 *                       /                      \
 *              solve(1, 3, 1)            solve(0, 2, 1)
 *              /          \              /          \
 *         pick 4      pick 3        pick 5      pick 1
 *            |            |            |            |
 *       solve(2,3,0) solve(1,2,0) solve(1,2,0) solve(0,1,0)
 *           =0          =0          =0          =0
 *
 *   Results:
 *   - 5 + 4 = 9
 *   - 5 + 3 = 8
 *   - 3 + 5 = 8
 *   - 3 + 1 = 4
 *
 *   Maximum = 9 ✅
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * UNDERSTANDING THE 3 PARAMETERS: solve(left, right, remaining)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 *   left      → Index of FIRST available card (leftmost we can pick)
 *   right     → Index of LAST available card (rightmost we can pick)
 *   remaining → How many cards we STILL need to pick
 *
 *   ┌────────────────────────────────────────────────────────────────────────┐
 *   │                                                                        │
 *   │  PICK FROM LEFT:                                                       │
 *   │  ────────────────                                                      │
 *   │  Before: [5, 4, 1, 3]     solve(0, 3, 2)                               │
 *   │           ↑        ↑                                                   │
 *   │          L=0     R=3                                                   │
 *   │                                                                        │
 *   │  Pick cards[0] = 5                                                     │
 *   │                                                                        │
 *   │  After:  [_, 4, 1, 3]     solve(1, 3, 1)                               │
 *   │              ↑     ↑                                                   │
 *   │            L=1   R=3      ← left moves RIGHT (0 → 1)                   │
 *   │                           ← right stays same                           │
 *   │                                                                        │
 *   ├────────────────────────────────────────────────────────────────────────┤
 *   │                                                                        │
 *   │  PICK FROM RIGHT:                                                      │
 *   │  ─────────────────                                                     │
 *   │  Before: [5, 4, 1, 3]     solve(0, 3, 2)                               │
 *   │           ↑        ↑                                                   │
 *   │          L=0     R=3                                                   │
 *   │                                                                        │
 *   │  Pick cards[3] = 3                                                     │
 *   │                                                                        │
 *   │  After:  [5, 4, 1, _]     solve(0, 2, 1)                               │
 *   │           ↑     ↑                                                      │
 *   │          L=0  R=2         ← left stays same                            │
 *   │                           ← right moves LEFT (3 → 2)                   │
 *   │                                                                        │
 *   └────────────────────────────────────────────────────────────────────────┘
 *
 *   Summary Table:
 *   ┌─────────────┬───────────┬─────────────┬───────────────┐
 *   │ Action      │ left      │ right       │ remaining     │
 *   ├─────────────┼───────────┼─────────────┼───────────────┤
 *   │ Initial     │ 0         │ n-1         │ k             │
 *   │ Pick LEFT   │ left + 1  │ right (same)│ remaining - 1 │
 *   │ Pick RIGHT  │ left (same)│ right - 1  │ remaining - 1 │
 *   └─────────────┴───────────┴─────────────┴───────────────┘
 *
 *   left and right are like boundaries that shrink inward as we pick cards!
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Time Complexity: O(2^k) - exponential, each step branches into 2
 * Space Complexity: O(k) - recursion stack depth
 *
 * ⚠️  WARNING: This approach will TLE (Time Limit Exceeded) for large k!
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace MaximumPointsFromCardsBruteForce {
  /**
   * Main function - Pick k cards from ends, maximize score
   *
   * @param cardScore - Array of card scores
   * @param k - Number of cards to pick
   * @returns Maximum score achievable
   */
  function maxScore(cardScore: number[], k: number): number {
    // Start recursion with full array and k picks remaining
    return solve(cardScore, 0, cardScore.length - 1, k);
  }

  /**
   * Recursive helper function
   *
   * @param cards - The card scores array
   * @param left - Current left boundary (first available card)
   * @param right - Current right boundary (last available card)
   * @param remaining - Number of cards still to pick
   * @returns Maximum score from this state
   */
  function solve(
    cards: number[],
    left: number,
    right: number,
    remaining: number
  ): number {
    // ═══════════════════════════════════════════════════════════════
    // BASE CASE: No more cards to pick
    // ═══════════════════════════════════════════════════════════════
    //
    // WHY: When remaining = 0, we've picked all k cards
    //      Return 0 (no more score to add)

    if (remaining === 0) {
      return 0;
    }

    // ═══════════════════════════════════════════════════════════════
    // RECURSIVE CASE: Try both options and take maximum
    // ═══════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────────────────────────
    // OPTION 1: Pick card from LEFT
    // ─────────────────────────────────────────────────────────────
    //
    // - Add cards[left] to our score
    // - Move left boundary forward (left + 1)
    // - Decrease remaining picks by 1
    //
    // Visual:
    //   [5, 4, 1, 8, 7, 1, 3]
    //    ↑                     Pick this card (5)
    //    left
    //
    //   After picking:
    //   [_, 4, 1, 8, 7, 1, 3]
    //       ↑                  New left boundary
    //       left+1

    const pickLeft = cards[left] + solve(cards, left + 1, right, remaining - 1);

    // ─────────────────────────────────────────────────────────────
    // OPTION 2: Pick card from RIGHT
    // ─────────────────────────────────────────────────────────────
    //
    // - Add cards[right] to our score
    // - Move right boundary backward (right - 1)
    // - Decrease remaining picks by 1
    //
    // Visual:
    //   [5, 4, 1, 8, 7, 1, 3]
    //                      ↑   Pick this card (3)
    //                    right
    //
    //   After picking:
    //   [5, 4, 1, 8, 7, 1, _]
    //                   ↑      New right boundary
    //                 right-1

    const pickRight =
      cards[right] + solve(cards, left, right - 1, remaining - 1);

    // ─────────────────────────────────────────────────────────────
    // RETURN: Maximum of both options
    // ─────────────────────────────────────────────────────────────
    //
    // WHY: We want to maximize total score
    //      So we take whichever choice gives better result

    return Math.max(pickLeft, pickRight);
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: cardScore = [5, 4, 1, 3], k = 2
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * RECURSION TREE
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *                              solve(0, 3, 2)
   *                             cards = [5,4,1,3]
   *                            /                  \
   *                   pick 5 (left)          pick 3 (right)
   *                         /                        \
   *               solve(1, 3, 1)                solve(0, 2, 1)
   *              cards = [_,4,1,3]              cards = [5,4,1,_]
   *              /            \                /            \
   *        pick 4          pick 3        pick 5          pick 1
   *           |               |             |               |
   *    solve(2,3,0)    solve(1,2,0)   solve(1,2,0)    solve(0,1,0)
   *        = 0             = 0            = 0             = 0
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * STEP-BY-STEP EXECUTION (DFS Order)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Call 1: solve(0, 3, 2)
   *         cards = [5, 4, 1, 3]
   *         remaining = 2 (not 0, so continue)
   *         Try pickLeft first...
   *
   *   Call 2: solve(1, 3, 1)  ← picked 5 from left
   *           cards = [_, 4, 1, 3]
   *           remaining = 1 (not 0, so continue)
   *           Try pickLeft first...
   *
   *     Call 3: solve(2, 3, 0)  ← picked 4 from left
   *             remaining = 0 → BASE CASE, return 0
   *
   *     Back to Call 2:
   *       pickLeft = 4 + 0 = 4
   *       Now try pickRight...
   *
   *     Call 4: solve(1, 2, 0)  ← picked 3 from right
   *             remaining = 0 → BASE CASE, return 0
   *
   *     Back to Call 2:
   *       pickRight = 3 + 0 = 3
   *       return max(4, 3) = 4
   *
   *   Back to Call 1:
   *     pickLeft = 5 + 4 = 9
   *     Now try pickRight...
   *
   *   Call 5: solve(0, 2, 1)  ← picked 3 from right
   *           cards = [5, 4, 1, _]
   *           remaining = 1 (not 0, so continue)
   *
   *     Call 6: solve(1, 2, 0)  ← picked 5 from left
   *             remaining = 0 → BASE CASE, return 0
   *
   *     Back to Call 5:
   *       pickLeft = 5 + 0 = 5
   *
   *     Call 7: solve(0, 1, 0)  ← picked 1 from right
   *             remaining = 0 → BASE CASE, return 0
   *
   *     Back to Call 5:
   *       pickRight = 1 + 0 = 1
   *       return max(5, 1) = 5
   *
   *   Back to Call 1:
   *     pickRight = 3 + 5 = 8
   *     return max(9, 8) = 9
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: 9
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Best path: Pick 5 (left) → Pick 4 (left) = 5 + 4 = 9
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(2^k) TIME COMPLEXITY?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   At each level of recursion:
   *   - Level 0: 1 call
   *   - Level 1: 2 calls (pick left OR pick right)
   *   - Level 2: 4 calls
   *   - Level 3: 8 calls
   *   - ...
   *   - Level k: 2^k calls
   *
   *   Total = 1 + 2 + 4 + ... + 2^k = 2^(k+1) - 1 ≈ O(2^k)
   *
   *   For k = 20: 2^20 = 1,048,576 calls
   *   For k = 30: 2^30 = 1,073,741,824 calls → TLE!
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. k = 1: Only pick one card, return max(first, last)
   *
   * 2. k = n: Pick all cards, return sum of all
   *
   * 3. All same values: Any combination gives same result
   *
   * 4. Optimal is all from one side: [1,2,3,4,5,6], k=3 → 4+5+6=15
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Maximum Points from Cards - BRUTE FORCE\n');
    console.log('═'.repeat(60) + '\n');

    const testCases: {
      cardScore: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        cardScore: [1, 2, 3, 4, 5, 6],
        k: 3,
        expected: 15,
        description: 'Example 1 - all from right',
      },
      {
        cardScore: [5, 4, 1, 8, 7, 1, 3],
        k: 3,
        expected: 12,
        description: 'Example 2 - mix of left and right',
      },
      {
        cardScore: [9, 7, 7, 9, 7, 7, 9],
        k: 7,
        expected: 55,
        description: 'Example 3 - take all cards',
      },

      // Edge cases
      {
        cardScore: [100, 40, 17, 9, 73, 75],
        k: 3,
        expected: 248,
        description: '1 from left, 2 from right',
      },
      {
        cardScore: [1, 1000, 1],
        k: 1,
        expected: 1,
        description: 'k=1, cant reach middle',
      },
      {
        cardScore: [10, 20],
        k: 2,
        expected: 30,
        description: 'k=n, take all',
      },
      {
        cardScore: [5],
        k: 1,
        expected: 5,
        description: 'Single card',
      },

      // More test cases
      {
        cardScore: [5, 4, 1, 3],
        k: 2,
        expected: 9,
        description: 'Dry run example - 5+4=9',
      },
      {
        cardScore: [1, 79, 80, 1, 1, 1, 200, 1],
        k: 3,
        expected: 202,
        description: 'Edge cards better than middle',
      },
      {
        cardScore: [96, 90, 41, 82, 39, 74, 64, 50, 30],
        k: 8,
        expected: 536,
        description: 'Larger example',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { cardScore, k, expected, description } = testCases[i];
      const result = maxScore(cardScore, k);
      const status = result === expected ? '✅ PASS' : '❌ FAIL';

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: cardScore = [${cardScore.join(', ')}], k = ${k}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log('═'.repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log('🎉 All tests passed! Brute Force samajh aa gaya! 🚀');
      console.log('📊 Complexity: Time O(2^k), Space O(k)');
      console.log('\n💡 Key Idea: Try all 2^k combinations using recursion');
      console.log(
        '⚠️  Warning: This will TLE for large k! Use Sliding Window instead.'
      );
      console.log('\n🔜 Next: See optimal O(k) or O(n) solution!');
    }
  }
}

// Execute tests
MaximumPointsFromCardsBruteForce.runTests();