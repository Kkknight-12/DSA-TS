/**
 * FIND X IN SORTED ARRAY - LINEAR SEARCH (BRUTE FORCE)
 * =====================================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Sabse seedha approach — array ko ek ek karke check karo.
 * Agar koi element target ke barabar mila, uska index return karo.
 * Poora array scan karna padega worst case mein.
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  arr = [3, 7, 12, 19, 25, 40], target = 19              │
 * │                                                          │
 * │  i=0: arr[0]=3  ≠ 19 → skip                            │
 * │  i=1: arr[1]=7  ≠ 19 → skip                            │
 * │  i=2: arr[2]=12 ≠ 19 → skip                            │
 * │  i=3: arr[3]=19 = 19 → return 3 ✅                     │
 * └──────────────────────────────────────────────────────────┘
 *
 * Note: Array sorted hai, but linear search sorted property
 * ka koi fayda nahi uthata — isliye yeh brute force hai.
 *
 * ALGORITHM:
 * ──────────
 * 1. Har element check karo left se right
 * 2. Agar arr[i] === target → return i
 * 3. Loop khatam → target nahi mila → return -1
 *
 * TIME COMPLEXITY: O(n)
 *   - Worst case: target last element hai ya exist nahi karta
 *   - Poora array traverse karna padta hai
 *
 * SPACE COMPLEXITY: O(1)
 *   - Sirf loop variable, koi extra memory nahi
 */

namespace FindXBruteForce {
  /**
   * Finds target in sorted array using linear search
   *
   * @param arr - Sorted array of integers (no duplicates)
   * @param target - Value to search for
   * @returns Index of target if found, -1 otherwise
   */
  function findX(arr: number[], target: number): number {
    // Har element ek ek check karo
    // WHY: Brute force — sorted property ka fayda nahi uthate yahan
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        // Mil gaya! Index return karo
        return i;
      }
    }

    // Poora array check ho gaya, target nahi mila
    return -1;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: arr = [3, 7, 12, 19, 25, 40], target = 19
   *
   * Initial State:
   *   arr = [3, 7, 12, 19, 25, 40]
   *          0  1   2   3   4   5
   *
   * ═══════════════════════════════════════════════════════════
   * TRAVERSAL
   * ═══════════════════════════════════════════════════════════
   *
   * ┌────────────────────────────────────┐
   * │ i=0: arr[0]=3  ≠ 19 → continue    │
   * │ i=1: arr[1]=7  ≠ 19 → continue    │
   * │ i=2: arr[2]=12 ≠ 19 → continue    │
   * │ i=3: arr[3]=19 = 19 → return 3 ✅ │
   * └────────────────────────────────────┘
   *
   * ───────────────────────────────────────
   * Example 2: target = 100 (not in array)
   *
   * i=0: 3  ≠ 100
   * i=1: 7  ≠ 100
   * i=2: 12 ≠ 100
   * i=3: 19 ≠ 100
   * i=4: 25 ≠ 100
   * i=5: 40 ≠ 100
   * Loop ends → return -1 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array []:
   *    Loop never runs → return -1
   *
   * 2. Single element [5], target=5:
   *    i=0: arr[0]=5 = 5 → return 0 ✅
   *
   * 3. Target at last position:
   *    Full array traversal → O(n) worst case
   *
   * WHY BRUTE FORCE IS NOT OPTIMAL HERE:
   * We're not using the fact that array is SORTED.
   * Binary search would find same answer in O(log n).
   * See optimal.ts for the better approach.
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Find X in Sorted Array - LINEAR SEARCH (BRUTE FORCE)\n");

    const testCases: {
      arr: number[];
      target: number;
      expected: number;
      description: string;
    }[] = [
      // Basic examples
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 19,
        expected: 3,
        description: "Target in middle",
      },
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 3,
        expected: 0,
        description: "Target at start",
      },
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 40,
        expected: 5,
        description: "Target at end (worst case)",
      },

      // Not found cases
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 100,
        expected: -1,
        description: "Target not in array (larger)",
      },
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 1,
        expected: -1,
        description: "Target not in array (smaller)",
      },
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 10,
        expected: -1,
        description: "Target not in array (gap between elements)",
      },

      // Edge cases
      {
        arr: [],
        target: 5,
        expected: -1,
        description: "Empty array",
      },
      {
        arr: [5],
        target: 5,
        expected: 0,
        description: "Single element — found",
      },
      {
        arr: [5],
        target: 3,
        expected: -1,
        description: "Single element — not found",
      },

      // Larger array
      {
        arr: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        target: 13,
        expected: 6,
        description: "Larger array, target in middle",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { arr, target, expected, description } of testCases) {
      const result = findX(arr, target);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   arr = [${arr}], target = ${target}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   arr = [${arr}], target = ${target}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
FindXBruteForce.runTests();
