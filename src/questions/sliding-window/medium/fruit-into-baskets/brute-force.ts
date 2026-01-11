/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FRUIT INTO BASKETS - BRUTE FORCE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Pick maximum fruits with 2 baskets (each basket holds only 1 type)
 *
 * Key Insight: REFRAME THE PROBLEM!
 * ─────────────────────────────────────────────────────────────────────────────
 * DON'T think: "Pick fruits with 2 baskets"
 * DO think:    "Find longest subarray with at most 2 DISTINCT types"
 *
 * WHY? 2 baskets = 2 types allowed!
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Approach: Brute Force - Check ALL possible subarrays
 * - For each starting position i
 * - Try all ending positions j (from i to end)
 * - Track fruit types using Set
 * - If types <= 2, update maxLength
 * - If types > 2, break (no point extending further)
 *
 * Time Complexity: O(n²) - nested loops
 * Space Complexity: O(1) - Set has at most 3 elements
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace FruitIntoBasketsBruteForce {
  /**
   * Find maximum fruits that can be collected with 2 baskets - BRUTE FORCE
   *
   * @param fruits - Array where fruits[i] = type of fruit at tree i
   * @returns Maximum number of fruits that can be picked
   */
  function totalFruit(fruits: number[]): number {
    let maxFruits = 0;

    // ═══════════════════════════════════════════════════════════════
    // OUTER LOOP: Try each starting position
    // ═══════════════════════════════════════════════════════════════
    // i = starting index of our subarray
    // WHY: We need to check subarrays starting at every position

    for (let i = 0; i < fruits.length; i++) {
      // Set to track distinct fruit types in current subarray
      // Reset for each new starting position
      // WHY Set? We only care about DISTINCT types, not counts
      const basket: Set<number> = new Set();

      // ═══════════════════════════════════════════════════════════════
      // INNER LOOP: Try each ending position
      // ═══════════════════════════════════════════════════════════════
      // j = ending index of our subarray
      //
      // IMPORTANT: j goes from i to END OF ARRAY (fruits.length - 1)
      //
      // WHY? We want to find the LONGEST valid subarray starting at i
      //      The limit is 2 types, not a fixed window size!

      for (let j = i; j < fruits.length; j++) {
        // ─────────────────────────────────────────────────────────────
        // STEP 1: Add current fruit type to basket
        // ─────────────────────────────────────────────────────────────
        // Set automatically handles duplicates
        // If fruit type already exists, Set size won't change
        basket.add(fruits[j]);

        // ─────────────────────────────────────────────────────────────
        // STEP 2: Check if subarray is valid (at most 2 types)
        // ─────────────────────────────────────────────────────────────
        if (basket.size <= 2) {
          // Valid subarray! At most 2 types means we can use 2 baskets
          // Update maxFruits if this subarray is longer
          // Subarray length = j - i + 1
          maxFruits = Math.max(maxFruits, j - i + 1);
        } else {
          // ─────────────────────────────────────────────────────────────
          // STEP 3: Too many types - OPTIMIZATION
          // ─────────────────────────────────────────────────────────────
          // If we have 3+ types, extending further won't help
          // Adding more elements can only add MORE types (or keep same)
          //
          // WHY break works:
          // If [i...j] has 3 types, then [i...j+1], [i...j+2]...
          // will also have at least 3 types (can only increase or stay)
          break;
        }
      }
    }

    return maxFruits;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: fruits = [1, 2, 3, 2, 2]
   *          Index:    0  1  2  3  4
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 0 (Start from index 0)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=0: basket.add(1) → basket = {1}, size = 1 ≤ 2 ✅
   *      maxFruits = max(0, 0-0+1) = 1
   *      Subarray: [1]
   *
   * j=1: basket.add(2) → basket = {1, 2}, size = 2 ≤ 2 ✅
   *      maxFruits = max(1, 1-0+1) = 2
   *      Subarray: [1, 2]
   *
   * j=2: basket.add(3) → basket = {1, 2, 3}, size = 3 > 2 ❌
   *      BREAK! Can't extend further from i=0
   *      Subarray: [1, 2, 3] has too many types
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 1 (Start from index 1)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=1: basket = {2}, size = 1 ✅ → maxFruits = max(2, 1) = 2
   * j=2: basket = {2, 3}, size = 2 ✅ → maxFruits = max(2, 2) = 2
   * j=3: basket = {2, 3}, size = 2 ✅ → maxFruits = max(2, 3) = 3
   *      (2 was already in set, so size didn't increase)
   * j=4: basket = {2, 3}, size = 2 ✅ → maxFruits = max(3, 4) = 4 ⭐
   *
   * Best window so far: [2, 3, 2, 2] = 4 fruits
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 2 (Start from index 2)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=2: basket = {3}, size = 1 ✅ → maxFruits = 4
   * j=3: basket = {3, 2}, size = 2 ✅ → maxFruits = 4
   * j=4: basket = {3, 2}, size = 2 ✅ → maxFruits = 4
   *
   * Window [3, 2, 2] = 3 fruits (not better than 4)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 3 (Start from index 3)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=3: basket = {2}, size = 1 ✅ → maxFruits = 4
   * j=4: basket = {2}, size = 1 ✅ → maxFruits = 4
   *
   * Window [2, 2] = 2 fruits
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 4 (Start from index 4)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=4: basket = {2}, size = 1 ✅ → maxFruits = 4
   *
   * Window [2] = 1 fruit
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: maxFruits = 4
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Best subarray: [2, 3, 2, 2] at indices 1-4
   * Basket 1: Type 2 (3 fruits)
   * Basket 2: Type 3 (1 fruit)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(n²)?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Outer loop: n starting positions           → O(n)
   * Inner loop: up to n ending positions each  → O(n)
   *                                            ─────────
   * Total:                                       O(n²)
   *
   * Note: The break optimization helps in practice, but worst case
   * (like all same type) still requires checking all pairs → O(n²)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY SET WORKS HERE (vs HashMap in Optimal)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * In BRUTE FORCE:
   *   - We start fresh for each starting position i
   *   - Set is reset: basket = new Set()
   *   - We only ADD elements, never remove
   *   - Just need to check: "Do we have ≤2 types?"
   *   - Set.size tells us exactly that!
   *
   * In OPTIMAL (Sliding Window):
   *   - We need to SHRINK window (remove elements from left)
   *   - Need to know: "Is this type completely gone from window?"
   *   - Set doesn't track counts!
   *   - HashMap with counts needed: fruitType → count
   *
   * ┌─────────────────────────────────────────────────────────────┐
   * │  BRUTE FORCE: Only ADD → Set works                         │
   * │  SLIDING WINDOW: ADD and REMOVE → Need HashMap with count  │
   * └─────────────────────────────────────────────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. Single element: [5] → Answer = 1
   * 2. All same type: [1,1,1,1] → Answer = 4
   * 3. Exactly 2 types: [1,2,1,2] → Answer = 4
   * 4. All different: [1,2,3,4] → Answer = 2 (any adjacent pair)
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Fruit Into Baskets - BRUTE FORCE\n");
    console.log("═".repeat(60) + "\n");

    const testCases: {
      fruits: number[];
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        fruits: [1, 2, 1],
        expected: 3,
        description: "Example 1 - all 3 fruits",
      },
      {
        fruits: [1, 2, 3, 2, 2],
        expected: 4,
        description: "Example 2 - [2,3,2,2]",
      },
      {
        fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4],
        expected: 5,
        description: "Example 3 - [1,2,1,1,2]",
      },

      // Edge cases
      {
        fruits: [1],
        expected: 1,
        description: "Single element",
      },
      {
        fruits: [1, 1],
        expected: 2,
        description: "Two same elements",
      },
      {
        fruits: [1, 2],
        expected: 2,
        description: "Two different elements",
      },

      // All same type
      {
        fruits: [1, 1, 1, 1, 1],
        expected: 5,
        description: "All same type",
      },

      // Exactly 2 types
      {
        fruits: [1, 2, 1, 2, 1, 2],
        expected: 6,
        description: "Alternating 2 types - entire array",
      },

      // Scattered elements
      {
        fruits: [1, 2, 1, 2, 1, 3],
        expected: 5,
        description: "Scattered types - [1,2,1,2,1]",
      },

      // Multiple 3+ type transitions
      {
        fruits: [1, 1, 2, 2, 3, 3, 4, 4],
        expected: 4,
        description: "Sequential pairs",
      },

      // Best window in middle
      {
        fruits: [3, 1, 2, 2, 2, 2, 1, 4],
        expected: 6,
        description: "Best window [1,2,2,2,2,1] in middle",
      },

      // Long sequence of same type
      {
        fruits: [1, 1, 1, 1, 2, 3],
        expected: 5,
        description: "Long same type then others - [1,1,1,1,2]",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { fruits, expected, description } = testCases[i];
      const result = totalFruit(fruits);
      const status = result === expected ? "✅ PASS" : "❌ FAIL";

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: fruits = [${fruits}]`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log("═".repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log("🎉 All tests passed! Brute Force samajh aa gaya! 🚀");
      console.log("📊 Complexity: Time O(n²), Space O(1)");
      console.log("\n⚠️  Note: Sliding Window is O(n) - more optimal!");
    }
  }
}

// Execute tests
FruitIntoBasketsBruteForce.runTests();