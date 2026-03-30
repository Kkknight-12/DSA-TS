/**
 * LOWER BOUND - BINARY SEARCH
 * ============================
 *
 * PROBLEM:
 * Sorted array hai aur ek target x diya hai.
 * Lower bound dhundho: pehla index jahan arr[i] >= x ho.
 * Agar koi element x se bada ya barabar na ho → return n (array length).
 *
 * Example:
 *   arr = [1, 3, 5, 7, 9, 11],  x = 6
 *
 *   arr:  1   3   5   7   9   11
 *   idx:  0   1   2   3   4    5
 *
 *   6 se bada ya barabar pehla element = 7, index = 3
 *   Answer = 3
 *
 * Example 2 (x exactly present):
 *   arr = [1, 3, 5, 5, 7],  x = 5
 *   Pehla 5 index 2 pe hai → Answer = 2
 *
 * Example 3 (x from all elements bada):
 *   arr = [1, 3, 5],  x = 10
 *   Koi element >= 10 nahi → Answer = 3 (= n)
 *
 * WHY LOWER BOUND IMPORTANT HAI?
 * ──────────────────────────────
 * Yeh building block hai bahut saare binary search problems ka:
 *   - Upper bound  → first index where arr[i] > x
 *   - Search insert position → lower bound hi hai!
 *   - First occurrence of x → lower bound + check
 *   - Count of x → upper_bound(x) - lower_bound(x)
 *
 * INTUITION (Soch):
 * ─────────────────
 * Hume "FIRST" element chahiye jo >= x ho.
 * Yeh ek classic "find first valid" binary search pattern hai.
 *
 * Agar arr[mid] >= x → mid valid answer ho sakta hai, par koi smaller bhi ho sakta hai.
 *                       Isliye right = mid (mid ko mat chhodo, left side explore karo).
 *
 * Agar arr[mid] < x  → mid definitely answer nahi, sab left side bhi nahi.
 *                       Isliye left = mid + 1.
 *
 * MONOTONIC pattern:
 *   arr = [1, 3, 5, 7, 9],  x = 6
 *   idx:   0  1  2  3  4
 *
 *   idx:    0    1    2    3    4
 *   val:    1    3    5    7    9
 *   >=6?:   ✗    ✗    ✗    ✓    ✓
 *                            ↑
 *                      first ✓ = index 3 = ANSWER
 *
 * Binary search karo! Pattern 2 (left < right, right=mid).
 *
 * ALGORITHM:
 * ──────────
 * 1. left=0, right=n   (right=n because n is valid return when no element found)
 * 2. While left < right:
 *    a. mid = (left+right)/2
 *    b. arr[mid] >= x? → right=mid    (valid, try finding earlier)
 *    c. else           → left=mid+1   (too small, go right)
 * 3. return left   (= right = first valid index, or n if none)
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 *
 * @param arr - Sorted array (ascending)
 * @param x - Target value
 * @returns First index where arr[i] >= x, or arr.length if none
 */

namespace LowerBoundOptimal {
  function lowerBound(arr: number[], x: number): number {
    let left = 0;
    let right = arr.length;  // WHY n not n-1: n is valid answer (not found case)

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] >= x) {
        // mid is a valid candidate — but there might be a smaller valid index
        right = mid;
      } else {
        // arr[mid] < x — mid and everything left of it is invalid
        left = mid + 1;
      }
    }

    // left === right === first index where arr[i] >= x
    // (or n if no such index exists)
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: arr=[1,3,5,7,9,11], x=6
   * n=6, left=0, right=6
   *
   * Array:
   *   idx:  0   1   2   3   4   5
   *   val:  1   3   5   7   9  11
   *              >=6?  ✗   ✗   ✗   ✓   ✓   ✓
   *                              ↑
   *                         answer=3
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=6, mid=3                                   │
   * │ arr[3]=7 >= x=6? YES ✓                                   │
   * │ → right=3                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=3, mid=1                                   │
   * │ arr[1]=3 >= x=6? NO ✗                                    │
   * │ → left=2                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=2, right=3, mid=2                                   │
   * │ arr[2]=5 >= x=6? NO ✗                                    │
   * │ → left=3                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=3 === right=3 → EXIT
   * return 3 ✅  (arr[3]=7, first element >= 6)
   *
   * Search space narrowing:
   *   [0 ────────── 6]
   *   [0 ──── 3]        arr[3]=7 >= 6, go left
   *   [2 ──── 3]        arr[1]=3 < 6, go right
   *   [3 == 3] → done!  arr[2]=5 < 6, go right
   *
   * ═══════════════════════════════════════════════════════════
   * WHY right = n (not n-1)?
   * ═══════════════════════════════════════════════════════════
   *
   * Agar x = 100 aur arr = [1, 3, 5]:
   *   Koi bhi element >= 100 nahi.
   *   Answer should be n = 3 (one past last index).
   *
   * Agar right = n-1 = 2 rakha hota:
   *   Loop never considers "not found" case properly.
   *   arr[2]=5 >= 100? NO → left=3, lekin right=2, loop nahi chalta → wrong!
   *
   * right=n rakhne se:
   *   Loop chalta hai, n itself converges to if no element qualifies → correct!
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. x <= arr[0]: Every element >= x → answer = 0
   *    arr=[3,5,7], x=1: arr[mid] always >= 1 → right shrinks to 0 ✓
   *
   * 2. x > arr[n-1]: No element >= x → answer = n
   *    arr=[1,3,5], x=10: arr[mid] always < 10 → left grows to n ✓
   *
   * 3. x exactly in array (multiple):
   *    arr=[2,2,2,2], x=2: answer = 0 (first occurrence) ✓
   *
   * 4. x exactly in array (once):
   *    arr=[1,3,5,7], x=5: answer = 2 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Lower Bound - BINARY SEARCH\n");

    const testCases: {
      arr: number[];
      x: number;
      expected: number;
      description: string;
    }[] = [
      {
        arr: [1, 3, 5, 7, 9, 11], x: 6,
        expected: 3,
        description: "x=6 not in array: first element >= 6 is 7 at index 3",
      },
      {
        arr: [1, 3, 5, 5, 7, 9], x: 5,
        expected: 2,
        description: "x=5 appears twice: first occurrence at index 2",
      },
      {
        arr: [1, 3, 5, 7], x: 1,
        expected: 0,
        description: "x <= arr[0]: answer = 0",
      },
      {
        arr: [1, 3, 5, 7], x: 10,
        expected: 4,
        description: "x > all elements: answer = n = 4",
      },
      {
        arr: [2, 2, 2, 2], x: 2,
        expected: 0,
        description: "All same, x = same: first occurrence = 0",
      },
      {
        arr: [1, 2, 3, 4, 5], x: 3,
        expected: 2,
        description: "x exactly at middle: index 2",
      },
      {
        arr: [1, 3, 5, 7, 9], x: 0,
        expected: 0,
        description: "x smaller than all: answer = 0",
      },
      {
        arr: [5], x: 5,
        expected: 0,
        description: "Single element, x equals it: index 0",
      },
      {
        arr: [5], x: 3,
        expected: 0,
        description: "Single element, x < it: index 0",
      },
      {
        arr: [5], x: 10,
        expected: 1,
        description: "Single element, x > it: answer = n = 1",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { arr, x, expected, description } of testCases) {
      const result = lowerBound([...arr], x);
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

LowerBoundOptimal.runTests();
