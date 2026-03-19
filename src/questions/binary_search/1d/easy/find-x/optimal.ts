/**
 * FIND X IN SORTED ARRAY - BINARY SEARCH (OPTIMAL)
 * ==================================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Array SORTED hai — yeh ek powerful property hai!
 *
 * Agar hum middle element dekhein:
 * - arr[mid] === target → mil gaya!
 * - arr[mid] < target  → target right half mein hoga (left side chodo)
 * - arr[mid] > target  → target left half mein hoga (right side chodo)
 *
 * Har step mein HALF array eliminate ho jaata hai!
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  arr = [3, 7, 12, 19, 25, 40], target = 19              │
 * │         0  1   2   3   4   5                             │
 * │                                                          │
 * │  Step 1: L=0, R=5, mid=2, arr[2]=12 < 19               │
 * │          → Target right mein hai, L = mid+1 = 3         │
 * │                                                          │
 * │  [_, _, _, 19, 25, 40]                                  │
 * │             L       R                                    │
 * │                                                          │
 * │  Step 2: L=3, R=5, mid=4, arr[4]=25 > 19               │
 * │          → Target left mein hai, R = mid-1 = 3          │
 * │                                                          │
 * │  [_, _, _, 19, _, _]                                    │
 * │             L=R=3                                        │
 * │                                                          │
 * │  Step 3: L=3, R=3, mid=3, arr[3]=19 = 19 → return 3 ✅ │
 * └──────────────────────────────────────────────────────────┘
 *
 * Brute force: 4 steps  →  Binary search: 3 steps
 * For n=1000000: Brute = 1M steps, Binary = 20 steps!
 *
 * ALGORITHM:
 * ──────────
 * 1. left=0, right=n-1
 * 2. While left <= right:
 *    a. mid = left + (right-left)/2
 *    b. arr[mid] === target → return mid
 *    c. arr[mid] < target  → left = mid+1 (right half)
 *    d. arr[mid] > target  → right = mid-1 (left half)
 * 3. Return -1 (not found)
 *
 * TIME COMPLEXITY: O(log n)
 *   - Har iteration mein search space HALF hoti hai
 *   - n=40 → max ~6 steps, n=1M → max ~20 steps
 *
 * SPACE COMPLEXITY: O(1)
 *   - Sirf 3 variables: left, right, mid
 */

namespace FindXOptimal {
  /**
   * Finds target in sorted array using binary search
   *
   * @param arr - Sorted array of integers (no duplicates)
   * @param target - Value to search for
   * @returns Index of target if found, -1 otherwise
   */
  function findX(arr: number[], target: number): number {
    // Edge case: empty array
    if (arr.length === 0) return -1;

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      // WHY this formula: prevents integer overflow vs (left+right)/2
      const mid = Math.floor(left + (right - left) / 2);

      if (arr[mid] === target) {
        // Exact match! Index return karo
        return mid;
      }

      if (arr[mid] < target) {
        // mid se chota hai, target right half mein hoga
        // WHY mid+1: mid already check ho gaya, skip karo
        left = mid + 1;
      } else {
        // mid se bada hai, target left half mein hoga
        // WHY mid-1: mid already check ho gaya, skip karo
        right = mid - 1;
      }
    }

    // left > right — poori valid range check ho gayi, target nahi mila
    return -1;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: arr = [3, 7, 12, 19, 25, 40], target = 19
   *
   * Initial:
   *   arr = [3,  7,  12, 19, 25, 40]
   *          0   1   2   3   4   5
   *   left=0, right=5
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌────────────────────────────────────────────────────┐
   * │ left=0, right=5                                    │
   * │ mid = 0 + (5-0)/2 = 2                              │
   * │ arr[2] = 12 < 19 → left = mid+1 = 3               │
   * │                                                    │
   * │ [3,  7,  12, 19, 25, 40]                           │
   * │  ✗   ✗   ✗   L        R   ← left half eliminated  │
   * └────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌────────────────────────────────────────────────────┐
   * │ left=3, right=5                                    │
   * │ mid = 3 + (5-3)/2 = 4                              │
   * │ arr[4] = 25 > 19 → right = mid-1 = 3              │
   * │                                                    │
   * │ [3,  7,  12, 19, 25, 40]                           │
   * │  ✗   ✗   ✗   LR  ✗   ✗   ← right half eliminated │
   * └────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌────────────────────────────────────────────────────┐
   * │ left=3, right=3                                    │
   * │ mid = 3 + (3-3)/2 = 3                              │
   * │ arr[3] = 19 === 19 → return 3 ✅                   │
   * └────────────────────────────────────────────────────┘
   *
   * ───────────────────────────────────────────────────────
   * Example 2: target = 10 (not in array)
   *
   * arr = [3, 7, 12, 19, 25, 40], left=0, right=5
   *
   * Iter 1: mid=2, arr[2]=12 > 10 → right=1
   * Iter 2: mid=0, arr[0]=3  < 10 → left=1
   * Iter 3: mid=1, arr[1]=7  < 10 → left=2
   *
   * left=2 > right=1 → EXIT LOOP
   * return -1 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array []:
   *    Handled before loop → return -1
   *
   * 2. Single element [5], target=5:
   *    left=0, right=0, mid=0
   *    arr[0]=5 === 5 → return 0 ✅
   *
   * 3. Target at first position:
   *    mid keeps moving left until left=0
   *
   * 4. Target at last position:
   *    mid keeps moving right until right=n-1
   *    Both cases still O(log n), not O(n) like brute force!
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Find X in Sorted Array - BINARY SEARCH (OPTIMAL)\n");

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
        description: "Target at end",
      },

      // Not found cases
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 100,
        expected: -1,
        description: "Target larger than all elements",
      },
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 1,
        expected: -1,
        description: "Target smaller than all elements",
      },
      {
        arr: [3, 7, 12, 19, 25, 40],
        target: 10,
        expected: -1,
        description: "Target in gap between elements",
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
      {
        arr: [2, 4],
        target: 4,
        expected: 1,
        description: "Two elements — found at right",
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
FindXOptimal.runTests();
