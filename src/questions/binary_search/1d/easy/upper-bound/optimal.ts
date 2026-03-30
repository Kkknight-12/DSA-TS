/**
 * UPPER BOUND - BINARY SEARCH
 * ============================
 *
 * PROBLEM:
 * Sorted array hai aur ek target x diya hai.
 * Upper bound dhundho: pehla index jahan arr[i] > x ho (strictly greater).
 * Agar koi element x se strictly bada na ho → return n (array length).
 *
 * Example:
 *   arr = [1, 3, 5, 5, 7, 9],  x = 5
 *
 *   arr:  1   3   5   5   7   9
 *   idx:  0   1   2   3   4   5
 *
 *   5 se strictly bada pehla element = 7, index = 4
 *   Answer = 4
 *
 * Example 2 (x not in array):
 *   arr = [1, 3, 5, 7],  x = 4
 *   4 se bada pehla element = 5, index = 2
 *   Answer = 2
 *
 * Example 3 (x se bada koi nahi):
 *   arr = [1, 3, 5],  x = 10
 *   Koi element > 10 nahi → Answer = 3 (= n)
 *
 * LOWER BOUND vs UPPER BOUND:
 * ───────────────────────────
 *   Lower Bound → first index where arr[i] >= x  (greater than OR equal)
 *   Upper Bound → first index where arr[i] >  x  (strictly greater)
 *
 *   arr = [1, 3, 5, 5, 7, 9],  x = 5
 *   Lower Bound = index 2  (arr[2]=5, first element >= 5)
 *   Upper Bound = index 4  (arr[4]=7, first element >  5)
 *
 *   Upper Bound - Lower Bound = count of x in array!
 *   4 - 2 = 2  (5 appears twice) ✓
 *
 * INTUITION (Soch):
 * ─────────────────
 * Yeh lower bound jaisi hi problem hai — sirf condition thodi si alag hai:
 *
 *   Lower Bound: arr[mid] >= x? → right=mid
 *   Upper Bound: arr[mid] >  x? → right=mid
 *
 * MONOTONIC pattern:
 *   arr = [1, 3, 5, 5, 7, 9],  x = 5
 *   idx:   0  1  2  3  4  5
 *
 *   idx:    0    1    2    3    4    5
 *   val:    1    3    5    5    7    9
 *   > 5?:   ✗    ✗    ✗    ✗    ✓    ✓
 *                              ↑
 *                        first ✓ = index 4 = ANSWER
 *
 * Binary search karo! Pattern 2 (left < right, right=mid).
 *
 * ALGORITHM:
 * ──────────
 * 1. left=0, right=n
 * 2. While left < right:
 *    a. mid = (left+right)/2
 *    b. arr[mid] > x? → right=mid    (valid, try finding earlier)
 *    c. else          → left=mid+1   (not strictly greater, go right)
 * 3. return left
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 *
 * @param arr - Sorted array (ascending)
 * @param x - Target value
 * @returns First index where arr[i] > x, or arr.length if none
 */

namespace UpperBoundOptimal {
  function upperBound(arr: number[], x: number): number {
    let left = 0;
    let right = arr.length;  // WHY n not n-1: n is valid return (not found case)

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] > x) {
        // mid is a valid candidate — but there might be a smaller valid index
        right = mid;
      } else {
        // arr[mid] <= x — mid and everything left of it is invalid
        left = mid + 1;
      }
    }

    // left === right === first index where arr[i] > x
    // (or n if no such index exists)
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: arr=[1,3,5,5,7,9], x=5
   * n=6, left=0, right=6
   *
   * Array:
   *   idx:  0   1   2   3   4   5
   *   val:  1   3   5   5   7   9
   *   > 5?  ✗   ✗   ✗   ✗   ✓   ✓
   *                         ↑
   *                    answer=4
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=6, mid=3                                   │
   * │ arr[3]=5 > x=5? NO (equal nahi hai strictly greater)     │
   * │ → left=4                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=4, right=6, mid=5                                   │
   * │ arr[5]=9 > x=5? YES ✓                                    │
   * │ → right=5                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=4, right=5, mid=4                                   │
   * │ arr[4]=7 > x=5? YES ✓                                    │
   * │ → right=4                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=4 === right=4 → EXIT
   * return 4 ✅  (arr[4]=7, first element > 5)
   *
   * Search space narrowing:
   *   [0 ────────── 6]
   *   [4 ────────── 6]    arr[3]=5 not > 5, go right
   *   [4 ──── 5]          arr[5]=9 > 5, go left
   *   [4 == 4] → done!    arr[4]=7 > 5, go left → done
   *
   * ═══════════════════════════════════════════════════════════
   * LOWER BOUND vs UPPER BOUND — SIDE BY SIDE
   * ═══════════════════════════════════════════════════════════
   *
   * arr = [1, 3, 5, 5, 7, 9],  x = 5
   *
   *         LB condition    UB condition
   *         arr[mid] >= x   arr[mid] > x
   * idx=0:  1 >= 5? ✗       1 > 5? ✗
   * idx=1:  3 >= 5? ✗       3 > 5? ✗
   * idx=2:  5 >= 5? ✓ ←LB   5 > 5? ✗
   * idx=3:  5 >= 5? ✓        5 > 5? ✗
   * idx=4:  7 >= 5? ✓        7 > 5? ✓ ←UB
   * idx=5:  9 >= 5? ✓        9 > 5? ✓
   *
   * Lower Bound = 2, Upper Bound = 4
   * Count of 5 = UB - LB = 4 - 2 = 2 ✓ (5 appears at idx 2,3)
   *
   * ═══════════════════════════════════════════════════════════
   * KEY TRICK: upperBound(x) = lowerBound(x+1) for integers
   * ═══════════════════════════════════════════════════════════
   *
   * "First index > x" = "First index >= x+1" (for integers)
   *
   * upperBound(5) using lowerBound logic with x+1=6:
   *   arr=[1,3,5,5,7,9], find first index where arr[i] >= 6
   *   → arr[4]=7 is first >= 6 → index 4 ✓ (same answer!)
   *
   * This works ONLY for integers — for floats, use the actual > condition.
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. x < arr[0]: Every element > x → answer = 0
   *    arr=[3,5,7], x=1: arr[mid] always > 1 → right shrinks to 0 ✓
   *
   * 2. x >= arr[n-1]: No element > x → answer = n
   *    arr=[1,3,5], x=5: arr[mid] never > 5 → left grows to n ✓
   *
   * 3. All same elements:
   *    arr=[5,5,5,5], x=5: no element > 5 → answer = n = 4 ✓
   *    arr=[5,5,5,5], x=3: all > 3 → answer = 0 ✓
   *
   * 4. x exactly at last position:
   *    arr=[1,3,5,7], x=7: no element > 7 → answer = n = 4 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Upper Bound - BINARY SEARCH\n");

    const testCases: {
      arr: number[];
      x: number;
      expected: number;
      description: string;
    }[] = [
      {
        arr: [1, 3, 5, 5, 7, 9], x: 5,
        expected: 4,
        description: "x=5 appears twice: first element > 5 is 7 at index 4",
      },
      {
        arr: [1, 3, 5, 7], x: 4,
        expected: 2,
        description: "x=4 not in array: first element > 4 is 5 at index 2",
      },
      {
        arr: [1, 3, 5, 7], x: 0,
        expected: 0,
        description: "x < all elements: answer = 0",
      },
      {
        arr: [1, 3, 5, 7], x: 7,
        expected: 4,
        description: "x = last element: no element > 7 → answer = n = 4",
      },
      {
        arr: [1, 3, 5, 7], x: 10,
        expected: 4,
        description: "x > all elements: answer = n = 4",
      },
      {
        arr: [5, 5, 5, 5], x: 5,
        expected: 4,
        description: "All same, x = same: no element > 5 → answer = n = 4",
      },
      {
        arr: [5, 5, 5, 5], x: 3,
        expected: 0,
        description: "All same, x < them: all > 3 → answer = 0",
      },
      {
        arr: [1, 2, 3, 4, 5], x: 3,
        expected: 3,
        description: "x at middle: first element > 3 is 4 at index 3",
      },
      {
        arr: [5], x: 5,
        expected: 1,
        description: "Single element equals x: no element > 5 → answer = n = 1",
      },
      {
        arr: [5], x: 3,
        expected: 0,
        description: "Single element > x: answer = 0",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { arr, x, expected, description } of testCases) {
      const result = upperBound([...arr], x);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}], x=${x}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}], x=${x}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

UpperBoundOptimal.runTests();
