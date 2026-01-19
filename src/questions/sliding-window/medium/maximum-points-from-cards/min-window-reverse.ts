/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAXIMUM POINTS FROM CARDS - MINIMUM WINDOW (REVERSE THINKING)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Pick exactly k cards from either end, maximize total score
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * THE BRILLIANT REVERSE THINKING (Soch)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │  DIRECT THINKING:                                                          │
 * │  "Pick k cards from ends to MAXIMIZE sum"                                  │
 * │                                                                            │
 * │  REVERSE THINKING:                                                         │
 * │  "Leave (n-k) cards in middle to MINIMIZE unpicked sum"                    │
 * │                                                                            │
 * │  WHY does this work?                                                       │
 * │  ───────────────────────────────────────────────────────────────────────   │
 * │                                                                            │
 * │  When we pick from ENDS only, the cards we DON'T pick must form a          │
 * │  CONTIGUOUS subarray in the middle!                                        │
 * │                                                                            │
 * │  Visual proof:                                                             │
 * │                                                                            │
 * │    [5, 4, 1, 8, 7, 1, 3]     k=3, n=7, leave (n-k)=4 cards                 │
 * │                                                                            │
 * │    If we pick [5,4] from left and [3] from right:                          │
 * │    Picked:  [5, 4, _, _, _, _, 3]                                          │
 * │    Left:    [_, _, 1, 8, 7, 1, _]  ← CONTIGUOUS middle!                    │
 * │                                                                            │
 * │    We CAN'T have gaps in the unpicked cards because:                       │
 * │    - We can only pick from ENDS                                            │
 * │    - Once we stop picking from left, all remaining left cards stay         │
 * │    - Once we stop picking from right, all remaining right cards stay       │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * THE FORMULA
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │   MAXIMIZE(picked k cards) = TotalSum - MINIMIZE(unpicked n-k cards)       │
 * │                                                                            │
 * │   Since unpicked cards form CONTIGUOUS window of size (n-k):               │
 * │                                                                            │
 * │   Answer = TotalSum - MinWindowSum(size = n-k)                             │
 * │                                                                            │
 * │   This converts to: "Find minimum sum subarray of fixed size"              │
 * │   → Standard sliding window problem!                                       │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * VISUAL EXAMPLE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 *   cardScore = [5, 4, 1, 8, 7, 1, 3]    k=3, n=7
 *
 *   TotalSum = 5+4+1+8+7+1+3 = 29
 *   WindowSize = n - k = 7 - 3 = 4
 *
 *   Find minimum sum window of size 4:
 *
 *   ┌─────────────────────────────────────────────────────────────────────────┐
 *   │                                                                         │
 *   │  Window [0..3]: [5, 4, 1, 8, _, _, _] = 5+4+1+8 = 18                    │
 *   │  Window [1..4]: [_, 4, 1, 8, 7, _, _] = 4+1+8+7 = 20                    │
 *   │  Window [2..5]: [_, _, 1, 8, 7, 1, _] = 1+8+7+1 = 17 ← MINIMUM!        │
 *   │  Window [3..6]: [_, _, _, 8, 7, 1, 3] = 8+7+1+3 = 19                    │
 *   │                                                                         │
 *   └─────────────────────────────────────────────────────────────────────────┘
 *
 *   MinWindowSum = 17 (leaving cards [1, 8, 7, 1])
 *
 *   Answer = TotalSum - MinWindowSum = 29 - 17 = 12 ✅
 *
 *   Verification: We pick [5, 4] from left + [3] from right = 5+4+3 = 12 ✅
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Time Complexity: O(n) - single pass through entire array
 * Space Complexity: O(1) - only using a few variables
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace MaximumPointsFromCardsMinWindowReverse {
  /**
   * Pick k cards from ends, maximize score - MINIMUM WINDOW REVERSE THINKING
   *
   * @param cardScore - Array of card scores
   * @param k - Number of cards to pick
   * @returns Maximum score achievable
   */
  function maxScore(cardScore: number[], k: number): number {
    const n = cardScore.length;

    // ═══════════════════════════════════════════════════════════════
    // EDGE CASE: k = n (pick all cards)
    // ═══════════════════════════════════════════════════════════════
    //
    // If we need to pick all cards, window size = 0
    // No cards to leave, so answer = sum of all cards

    if (k === n) {
      return cardScore.reduce((sum, card) => sum + card, 0);
    }

    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Calculate total sum of all cards
    // ═══════════════════════════════════════════════════════════════
    //
    // We'll use this to convert:
    // MAXIMIZE(picked) = TotalSum - MINIMIZE(unpicked)

    let totalSum = 0;
    for (let i = 0; i < n; i++) {
      totalSum += cardScore[i];
    }

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Window size = cards we LEAVE (don't pick)
    // ═══════════════════════════════════════════════════════════════
    //
    // We pick k cards, so we leave (n - k) cards
    // These (n - k) cards form a contiguous window in the middle

    const windowSize = n - k;

    // ═══════════════════════════════════════════════════════════════
    // STEP 3: Calculate sum of first window
    // ═══════════════════════════════════════════════════════════════
    //
    // First window: indices [0, 1, 2, ..., windowSize-1]
    //
    // Visual:
    // [5, 4, 1, 8, 7, 1, 3]   windowSize = 4
    //  ←─────────────
    //  first window [0..3]

    let windowSum = 0;
    for (let i = 0; i < windowSize; i++) {
      windowSum += cardScore[i];
    }

    // This is our first candidate for minimum
    let minWindowSum = windowSum;

    // ═══════════════════════════════════════════════════════════════
    // STEP 4: Slide window and find minimum sum
    // ═══════════════════════════════════════════════════════════════
    //
    // ┌────────────────────────────────────────────────────────────┐
    // │  Standard fixed-size sliding window:                       │
    // │                                                            │
    // │  For each new position:                                    │
    // │  - Add element entering window (from right)                │
    // │  - Remove element leaving window (from left)               │
    // │  - Update minimum if current is smaller                    │
    // │                                                            │
    // │  Window slides from [0..windowSize-1] to [n-windowSize..n-1] │
    // └────────────────────────────────────────────────────────────┘
    //
    // Visual:
    // [5, 4, 1, 8, 7, 1, 3]
    //  [─────────]           Window 0: [5,4,1,8]
    //     [─────────]        Window 1: [4,1,8,7]
    //        [─────────]     Window 2: [1,8,7,1] ← min
    //           [─────────]  Window 3: [8,7,1,3]

    for (let i = windowSize; i < n; i++) {
      // ─────────────────────────────────────────────────────────────
      // Add element entering window (new right element)
      // ─────────────────────────────────────────────────────────────
      windowSum += cardScore[i];

      // ─────────────────────────────────────────────────────────────
      // Remove element leaving window (old left element)
      // ─────────────────────────────────────────────────────────────
      // The element leaving is at index (i - windowSize)
      // When i = windowSize, we remove index 0
      // When i = windowSize + 1, we remove index 1
      // etc.

      windowSum -= cardScore[i - windowSize];

      // ─────────────────────────────────────────────────────────────
      // Update minimum
      // ─────────────────────────────────────────────────────────────
      minWindowSum = Math.min(minWindowSum, windowSum);
    }

    // ═══════════════════════════════════════════════════════════════
    // STEP 5: Answer = Total - Minimum Window
    // ═══════════════════════════════════════════════════════════════
    //
    // MAXIMIZE(picked) = TotalSum - MINIMIZE(unpicked window)

    return totalSum - minWindowSum;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: cardScore = [5, 4, 1, 8, 7, 1, 3], k = 3, n = 7
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * STEP 1: Calculate total sum
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   totalSum = 5 + 4 + 1 + 8 + 7 + 1 + 3 = 29
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * STEP 2: Calculate window size
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   windowSize = n - k = 7 - 3 = 4
   *   (We leave 4 cards, pick 3 cards)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * STEP 3: First window sum
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   Window [0..3]: [5, 4, 1, 8]
   *   windowSum = 5 + 4 + 1 + 8 = 18
   *   minWindowSum = 18
   *
   *   ┌─────────────────────────────────────────────────────────────────────────┐
   *   │  [5, 4, 1, 8, 7, 1, 3]                                                  │
   *   │   ←─────────────                                                        │
   *   │   window [0..3] = 18                                                    │
   *   │                                                                         │
   *   │   If we leave this window:                                              │
   *   │   Pick: [_, _, _, _, 7, 1, 3] = 7+1+3 = 11                              │
   *   │   Or: totalSum - windowSum = 29 - 18 = 11                               │
   *   └─────────────────────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * STEP 4: Slide window
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i = 4 (Window [1..4])                                                      │
   * ├─────────────────────────────────────────────────────────────────────────────┤
   * │                                                                             │
   * │   Add cardScore[4] = 7                                                      │
   * │   Remove cardScore[4-4] = cardScore[0] = 5                                  │
   * │                                                                             │
   * │   windowSum = 18 + 7 - 5 = 20                                               │
   * │   minWindowSum = min(18, 20) = 18                                           │
   * │                                                                             │
   * │   [5, 4, 1, 8, 7, 1, 3]                                                     │
   * │       ←─────────────                                                        │
   * │       window [1..4] = 20                                                    │
   * │                                                                             │
   * │   If we leave this: pick = 29 - 20 = 9                                      │
   * │                                                                             │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i = 5 (Window [2..5])                                                      │
   * ├─────────────────────────────────────────────────────────────────────────────┤
   * │                                                                             │
   * │   Add cardScore[5] = 1                                                      │
   * │   Remove cardScore[5-4] = cardScore[1] = 4                                  │
   * │                                                                             │
   * │   windowSum = 20 + 1 - 4 = 17                                               │
   * │   minWindowSum = min(18, 17) = 17 ✅ NEW MIN!                               │
   * │                                                                             │
   * │   [5, 4, 1, 8, 7, 1, 3]                                                     │
   * │          ←─────────────                                                     │
   * │          window [2..5] = 17                                                 │
   * │                                                                             │
   * │   If we leave this: pick = 29 - 17 = 12 ✅                                  │
   * │   Picked cards: [5, 4] + [3] = 12                                           │
   * │                                                                             │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ┌─────────────────────────────────────────────────────────────────────────────┐
   * │ i = 6 (Window [3..6])                                                      │
   * ├─────────────────────────────────────────────────────────────────────────────┤
   * │                                                                             │
   * │   Add cardScore[6] = 3                                                      │
   * │   Remove cardScore[6-4] = cardScore[2] = 1                                  │
   * │                                                                             │
   * │   windowSum = 17 + 3 - 1 = 19                                               │
   * │   minWindowSum = min(17, 19) = 17                                           │
   * │                                                                             │
   * │   [5, 4, 1, 8, 7, 1, 3]                                                     │
   * │             ←─────────────                                                  │
   * │             window [3..6] = 19                                              │
   * │                                                                             │
   * │   If we leave this: pick = 29 - 19 = 10                                     │
   * │                                                                             │
   * └─────────────────────────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * STEP 5: Calculate answer
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   minWindowSum = 17 (window [2..5] = [1, 8, 7, 1])
   *   Answer = totalSum - minWindowSum = 29 - 17 = 12 ✅
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * SUMMARY TABLE
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   ┌──────────┬────────────────────┬────────────┬─────────────┬───────────────┐
   *   │ Window   │ Cards Left         │ Window Sum │ Cards Pick  │ Pick Sum      │
   *   ├──────────┼────────────────────┼────────────┼─────────────┼───────────────┤
   *   │ [0..3]   │ [5, 4, 1, 8]       │ 18         │ [7, 1, 3]   │ 29-18 = 11    │
   *   │ [1..4]   │ [4, 1, 8, 7]       │ 20         │ [5, 1, 3]   │ 29-20 = 9     │
   *   │ [2..5]   │ [1, 8, 7, 1]       │ 17 ✅ MIN  │ [5, 4, 3]   │ 29-17 = 12 ✅ │
   *   │ [3..6]   │ [8, 7, 1, 3]       │ 19         │ [5, 4, 1]   │ 29-19 = 10    │
   *   └──────────┴────────────────────┴────────────┴─────────────┴───────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH IS ELEGANT
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌────────────────────────────────────────────────────────────────────────────┐
   * │                                                                            │
   * │  1. REVERSE THINKING transforms the problem:                               │
   * │     - Original: "Maximize picked from ends" (complex)                      │
   * │     - Transformed: "Minimize contiguous middle" (standard!)                │
   * │                                                                            │
   * │  2. Standard sliding window for fixed-size minimum sum                     │
   * │     - No special handling for "two ends"                                   │
   * │     - Just find minimum window of size (n-k)                               │
   * │                                                                            │
   * │  3. Conceptually cleaner:                                                  │
   * │     - One formula: Answer = Total - MinWindow                              │
   * │     - Easier to understand and remember                                    │
   * │                                                                            │
   * └────────────────────────────────────────────────────────────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * TIME COMPLEXITY: O(n) vs O(k)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   *   This approach: O(n) - scan entire array
   *   Two-End approach: O(k) - only k iterations
   *
   *   Which is better?
   *   - If k is small: O(k) is better
   *   - If k is close to n: Both are similar
   *   - Both are optimal (linear time)
   *
   *   Example:
   *   - n = 1000, k = 10: O(k)=10, O(n)=1000 → Two-End wins
   *   - n = 1000, k = 990: O(k)=990, O(n)=1000 → Similar
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. k = n (pick all):
   *    - Window size = 0
   *    - No window to leave
   *    - Answer = sum of all cards
   *    - Handled separately at the start
   *
   * 2. k = 1:
   *    - Window size = n - 1
   *    - Leave (n-1) cards, pick 1
   *    - Answer = Total - min(sum of n-1 consecutive cards)
   *    - = max(first card, last card)
   *
   * 3. All same values:
   *    - All windows have same sum
   *    - Answer = k × value
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      '🧪 Testing Maximum Points from Cards - MIN WINDOW (REVERSE THINKING)\n'
    );
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
        description: 'Example 3 - take all cards (k=n)',
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
        description: '5+4=9 from left',
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

      // Reverse thinking specific tests
      {
        cardScore: [11, 49, 100, 20, 86, 29, 72],
        k: 4,
        expected: 232,
        description: 'Mix selection',
      },
      {
        cardScore: [1, 2, 3, 4, 5, 6, 1],
        k: 3,
        expected: 12,
        description: 'Last element smaller',
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
      console.log('🎉 All tests passed! Reverse Thinking samajh aa gaya! 🚀');
      console.log('📊 Complexity: Time O(n), Space O(1)');
      console.log('\n💡 Key Insight: MAXIMIZE picked = Total - MINIMIZE unpicked');
      console.log('💡 Transform: "Pick from ends" → "Leave contiguous middle"');
      console.log('⭐ This is the most ELEGANT conceptual approach!');
    }
  }
}

// Execute tests
MaximumPointsFromCardsMinWindowReverse.runTests();