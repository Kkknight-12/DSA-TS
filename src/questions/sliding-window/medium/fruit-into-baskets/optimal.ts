/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FRUIT INTO BASKETS - SLIDING WINDOW + HASHMAP
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Pick maximum fruits with 2 baskets (each basket holds only 1 type)
 *
 * Key Insight: REFRAME THE PROBLEM!
 * ─────────────────────────────────────────────────────────────────────────────
 * DON'T think: "Pick fruits with 2 baskets"
 * DO think:    "Find longest subarray with at most 2 DISTINCT types"
 *
 * WHY? 2 baskets = 2 types allowed in our window!
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Approach: Sliding Window with HashMap
 * - HashMap stores: fruitType → count in current window
 * - Expand window by moving right pointer
 * - If types > 2, shrink from left until valid
 * - Track maximum window size
 *
 * Time Complexity: O(n) - each element visited at most twice
 * Space Complexity: O(1) - map has at most 3 entries at any time
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace FruitIntoBasketsOptimal {
  /**
   * Find maximum fruits that can be collected with 2 baskets
   *
   * @param fruits - Array where fruits[i] = type of fruit at tree i
   * @returns Maximum number of fruits that can be picked
   */
  function totalFruit(fruits: number[]): number {
    // ═══════════════════════════════════════════════════════════════
    // HASHMAP: What does it store?
    // ═══════════════════════════════════════════════════════════════
    //
    // Map stores: fruitType → COUNT of that type in current window
    //
    // WHY count and not just presence?
    // ┌────────────────────────────────────────────────────────────┐
    // │  Same fruit type can appear MULTIPLE times in window!     │
    // │                                                           │
    // │  Window: [1, 2, 1, 2, 1]                                  │
    // │  map = {1: 3, 2: 2}                                       │
    // │                                                           │
    // │  When shrinking, we decrement count.                      │
    // │  Only DELETE from map when count becomes 0.               │
    // │  (meaning ALL occurrences of that type are removed)       │
    // └────────────────────────────────────────────────────────────┘
    //
    const fruitCount: Map<number, number> = new Map();

    // Left pointer of sliding window
    let left = 0;

    // Track maximum valid window length
    let maxLength = 0;

    // ═══════════════════════════════════════════════════════════════
    // SLIDING WINDOW: Iterate with right pointer
    // ═══════════════════════════════════════════════════════════════

    for (let right = 0; right < fruits.length; right++) {
      const currentFruit = fruits[right];

      // ─────────────────────────────────────────────────────────────
      // STEP 1: EXPAND - Add current fruit to window
      // ─────────────────────────────────────────────────────────────
      // Increment count of this fruit type in map
      // WHY: We're adding this fruit to our window
      fruitCount.set(currentFruit, (fruitCount.get(currentFruit) || 0) + 1);

      // ─────────────────────────────────────────────────────────────
      // STEP 2: SHRINK - Remove elements until valid (≤2 types)
      // ─────────────────────────────────────────────────────────────
      //
      // ┌────────────────────────────────────────────────────────────┐
      // │  WHY do we shrink ONE-BY-ONE (not jump by count)?         │
      // │                                                           │
      // │  Because elements of same type are NOT contiguous!        │
      // │                                                           │
      // │  Example: fruits = [1, 2, 1, 2, 1, 3]                     │
      // │           map = {1: 3, 2: 2, 3: 1}                        │
      // │                                                           │
      // │  WRONG: "Type 1 has count 3, so skip 3 elements"         │
      // │         left += 3 → Window [2, 1, 3]                      │
      // │         But '1' at index 4 is still in window! ❌         │
      // │                                                           │
      // │  The '1's are scattered at indices 0, 2, 4 (not grouped!) │
      // │                                                           │
      // │  ┌─────────────────────────────────────────────────────┐  │
      // │  │  Count tells us HOW MANY, not WHERE they are!       │  │
      // │  │  We must shrink one-by-one from left.               │  │
      // │  └─────────────────────────────────────────────────────┘  │
      // └────────────────────────────────────────────────────────────┘
      //
      // WHY while loop (not if)?
      // ─────────────────────────────────────────────────────────────
      // We might need to remove MULTIPLE elements before one type
      // is completely gone from the window.
      //
      // Example: [1, 1, 1, 2, 3] at right=4
      //   map = {1: 3, 2: 1, 3: 1}, size = 3
      //   Need to remove THREE '1's before map.size becomes 2!

      while (fruitCount.size > 2) {
        const leftFruit = fruits[left];

        // Decrement count of fruit being removed
        fruitCount.set(leftFruit, fruitCount.get(leftFruit)! - 1);

        // If count becomes 0, this type is completely out of window
        // NOW we can delete it from map
        if (fruitCount.get(leftFruit) === 0) {
          fruitCount.delete(leftFruit);
        }

        // Move left pointer forward (shrink window)
        left++;
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 3: UPDATE - Track maximum valid window size
      // ─────────────────────────────────────────────────────────────
      // Window size = right - left + 1
      // This window has ≤2 types, so we can pick all these fruits!
      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: fruits = [1, 2, 3, 2, 2]
   *          Index:    0  1  2  3  4
   *
   * Initial: left = 0, maxLength = 0, map = {}
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION BY ITERATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────
   * right = 0, fruits[0] = 1
   * ─────────────────────────────────────────
   *   EXPAND: map.set(1, 1) → map = {1: 1}
   *   SHRINK: map.size = 1 ≤ 2 ✅ No shrink needed
   *   UPDATE: maxLength = max(0, 0-0+1) = 1
   *
   *   Window: [1] 2 3 2 2
   *            L
   *            R
   *   Map: {1: 1} (1 type)
   *
   * ─────────────────────────────────────────
   * right = 1, fruits[1] = 2
   * ─────────────────────────────────────────
   *   EXPAND: map.set(2, 1) → map = {1: 1, 2: 1}
   *   SHRINK: map.size = 2 ≤ 2 ✅
   *   UPDATE: maxLength = max(1, 1-0+1) = 2
   *
   *   Window: [1 2] 3 2 2
   *            L R
   *   Map: {1: 1, 2: 1} (2 types)
   *
   * ─────────────────────────────────────────
   * right = 2, fruits[2] = 3
   * ─────────────────────────────────────────
   *   EXPAND: map.set(3, 1) → map = {1: 1, 2: 1, 3: 1}
   *   SHRINK: map.size = 3 > 2 ❌ Must shrink!
   *
   *   ┌─────────────────────────────────────────────┐
   *   │ SHRINKING PROCESS:                          │
   *   │                                             │
   *   │ Iteration 1:                                │
   *   │   leftFruit = fruits[0] = 1                │
   *   │   map[1] = 1 - 1 = 0 → DELETE from map     │
   *   │   map = {2: 1, 3: 1}                        │
   *   │   left = 1                                  │
   *   │   map.size = 2 ≤ 2? YES ✅ Stop!           │
   *   └─────────────────────────────────────────────┘
   *
   *   UPDATE: maxLength = max(2, 2-1+1) = 2
   *
   *   Window: 1 [2 3] 2 2
   *              L R
   *   Map: {2: 1, 3: 1} (2 types)
   *
   * ─────────────────────────────────────────
   * right = 3, fruits[3] = 2
   * ─────────────────────────────────────────
   *   EXPAND: map.set(2, 2) → map = {2: 2, 3: 1}
   *   SHRINK: map.size = 2 ≤ 2 ✅
   *   UPDATE: maxLength = max(2, 3-1+1) = 3
   *
   *   Window: 1 [2 3 2] 2
   *              L   R
   *   Map: {2: 2, 3: 1} (2 types)
   *
   * ─────────────────────────────────────────
   * right = 4, fruits[4] = 2
   * ─────────────────────────────────────────
   *   EXPAND: map.set(2, 3) → map = {2: 3, 3: 1}
   *   SHRINK: map.size = 2 ≤ 2 ✅
   *   UPDATE: maxLength = max(3, 4-1+1) = 4 ⭐
   *
   *   Window: 1 [2 3 2 2]
   *              L     R
   *   Map: {2: 3, 3: 1} (2 types)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: maxLength = 4
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Best window: [2, 3, 2, 2] = 4 fruits
   * Basket 1: Type 2 (3 fruits)
   * Basket 2: Type 3 (1 fruit)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN 2: WHY ONE-BY-ONE SHRINKING IS NECESSARY
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: fruits = [1, 2, 1, 2, 1, 3]
   *          Index:    0  1  2  3  4  5
   *
   * At right = 5 (adding '3'):
   *   Window: [1, 2, 1, 2, 1, 3]
   *   map = {1: 3, 2: 2, 3: 1}
   *   map.size = 3 > 2 ❌
   *
   * ─────────────────────────────────────────
   * WRONG APPROACH: "Type 1 has count 3, skip 3 elements"
   * ─────────────────────────────────────────
   *
   *   left += 3 → left = 3
   *   Window: [2, 1, 3] (indices 3, 4, 5)
   *
   *   But this window still has type '1' at index 4!
   *   The '1's are at indices 0, 2, 4 (SCATTERED, not grouped!)
   *
   *   ❌ FAILS because count tells HOW MANY, not WHERE!
   *
   * ─────────────────────────────────────────
   * CORRECT APPROACH: Shrink one-by-one
   * ─────────────────────────────────────────
   *
   *   Iteration 1: Remove fruits[0] = 1
   *     map[1] = 3 - 1 = 2
   *     map = {1: 2, 2: 2, 3: 1}, size = 3 > 2 ❌ Continue!
   *     left = 1
   *
   *   Iteration 2: Remove fruits[1] = 2
   *     map[2] = 2 - 1 = 1
   *     map = {1: 2, 2: 1, 3: 1}, size = 3 > 2 ❌ Continue!
   *     left = 2
   *
   *   Iteration 3: Remove fruits[2] = 1
   *     map[1] = 2 - 1 = 1
   *     map = {1: 1, 2: 1, 3: 1}, size = 3 > 2 ❌ Continue!
   *     left = 3
   *
   *   Iteration 4: Remove fruits[3] = 2
   *     map[2] = 1 - 1 = 0 → DELETE!
   *     map = {1: 1, 3: 1}, size = 2 ≤ 2 ✅ Stop!
   *     left = 4
   *
   *   Window: [1, 3] (indices 4, 5)
   *   Correctly has only 2 types!
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * KEY INSIGHTS SUMMARY
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. WHY HashMap with counts (not just Set)?
   *    → Same type appears multiple times
   *    → Need to know when a type is COMPLETELY gone (count = 0)
   *
   * 2. WHY shrink one-by-one (not jump by count)?
   *    → Elements of same type are SCATTERED, not contiguous
   *    → Count tells HOW MANY, not WHERE they are
   *    → Must process each element to correctly update counts
   *
   * 3. WHY while loop (not if)?
   *    → Might need to remove many elements before one type is gone
   *    → Example: [1,1,1,2,3] needs to remove three 1's
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. All same type: [1,1,1,1] → Answer = 4 (only 1 type)
   * 2. Two types: [1,2,1,2] → Answer = 4 (exactly 2 types)
   * 3. Single element: [5] → Answer = 1
   * 4. Alternating: [1,2,1,2,3,3] → Answer = 4 ([1,2,1,2] or [2,3,3])
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Fruit Into Baskets - SLIDING WINDOW + HASHMAP\n");
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

      // Scattered elements (tests one-by-one shrinking)
      {
        fruits: [1, 2, 1, 2, 1, 3],
        expected: 5,
        description: "Scattered types - [2,1,2,1,3] or [1,2,1,2,1]",
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
      console.log("🎉 All tests passed! Sliding Window + HashMap samajh aa gaya! 🚀");
      console.log("📊 Complexity: Time O(n), Space O(1)");
      console.log("\n💡 Key insight: Longest subarray with at most 2 distinct types!");
      console.log("💡 Remember: Shrink one-by-one because elements are scattered!");
    }
  }
}

// Execute tests
FruitIntoBasketsOptimal.runTests();