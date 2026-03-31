/**
 * NUMBER OF OCCURRENCES - BINARY SEARCH
 * =======================================
 *
 * PROBLEM:
 * Sorted array mein target kitni baar aata hai?
 *
 * Example:
 *   arr = [1, 1, 2, 2, 2, 2, 3],  target = 2
 *   2 aata hai → index 2, 3, 4, 5 → count = 4
 *
 * 💡 YEH UPPER BOUND - LOWER BOUND HAI!
 * ───────────────────────────────────────
 * Tune upper bound ke notes mein yeh trick padhI thi:
 *
 *   count of x = upperBound(x) - lowerBound(x)
 *
 * arr = [1, 1, 2, 2, 2, 2, 3],  target = 2
 *
 *   idx:  0   1   2   3   4   5   6
 *   val:  1   1   2   2   2   2   3
 *
 *   lowerBound(2) → first index where arr[i] >= 2 = index 2
 *   upperBound(2) → first index where arr[i] >  2 = index 6
 *
 *   count = UB - LB = 6 - 2 = 4 ✓
 *
 * Visual:
 *   [1,  1,  2,  2,  2,  2,  3]
 *            ↑               ↑
 *          LB=2            UB=6
 *           |←── 4 twos ───→|
 *
 * INTUITION (Soch):
 * ─────────────────
 * LowerBound → target shuru kahan hota hai
 * UpperBound → target khatam kahan hota hai (exclusive)
 * UB - LB    → kitni jagah target hai
 *
 * ALGORITHM:
 * ──────────
 * 1. lb = lowerBound(target)  → first index where arr[i] >= target
 * 2. ub = upperBound(target)  → first index where arr[i] >  target
 * 3. Agar lb == n ya arr[lb] != target → target nahi hai → return 0
 * 4. return ub - lb
 *
 * TIME:  O(log n) — two binary searches
 * SPACE: O(1)
 *
 * @param arr - Sorted array
 * @param target - Value to count
 * @returns Number of occurrences of target
 */

namespace NumberOfOccurrenceOptimal {
  /** Lower Bound: first index where arr[i] >= x */
  function lowerBound(arr: number[], x: number): number {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] >= x) right = mid;
      else left = mid + 1;
    }

    return left;
  }

  /** Upper Bound: first index where arr[i] > x */
  function upperBound(arr: number[], x: number): number {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] > x) right = mid;
      else left = mid + 1;
    }

    return left;
  }

  function countOccurrences(arr: number[], target: number): number {
    const lb = lowerBound(arr, target);

    // Target exists check: lb pe target nahi → zero occurrences
    if (lb === arr.length || arr[lb] !== target) return 0;

    const ub = upperBound(arr, target);

    return ub - lb;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: arr=[1,1,2,2,2,2,3], target=2
   *
   *   idx:  0   1   2   3   4   5   6
   *   val:  1   1   2   2   2   2   3
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 1: lowerBound(2) → first index where arr[i] >= 2
   * ═══════════════════════════════════════════════════════════
   *
   *   >=2?  ✗   ✗   ✓   ✓   ✓   ✓   ✓
   *                 ↑
   *            first ✓ = index 2
   *
   * left=0, right=7
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=7, mid=3                           │
   * │ arr[3]=2 >= 2? YES → right=3                             │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=0, right=3, mid=1                           │
   * │ arr[1]=1 >= 2? NO  → left=2                              │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=2, right=3, mid=2                           │
   * │ arr[2]=2 >= 2? YES → right=2                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * lb = 2  (arr[2]=2 == target → target exists ✓)
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 2: upperBound(2) → first index where arr[i] > 2
   * ═══════════════════════════════════════════════════════════
   *
   *   > 2?  ✗   ✗   ✗   ✗   ✗   ✗   ✓
   *                                   ↑
   *                              first ✓ = index 6
   *
   * left=0, right=7
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=7, mid=3                           │
   * │ arr[3]=2 > 2? NO  → left=4                               │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=4, right=7, mid=5                           │
   * │ arr[5]=2 > 2? NO  → left=6                               │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=6, right=7, mid=6                           │
   * │ arr[6]=3 > 2? YES → right=6                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ub = 6
   *
   * ═══════════════════════════════════════════════════════════
   * STEP 3: count = ub - lb = 6 - 2 = 4 ✅
   * ═══════════════════════════════════════════════════════════
   *
   *   [1,  1,  2,  2,  2,  2,  3]
   *            ↑               ↑
   *          lb=2            ub=6
   *           |←── 4 twos ───→|
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. target not in array:
   *    arr=[1,2,3], target=5
   *    lb=3 (=n) → return 0 ✓
   *
   * 2. target not in array (middle):
   *    arr=[1,3,5], target=2
   *    lb=1, arr[1]=3 != 2 → return 0 ✓
   *
   * 3. target appears once:
   *    arr=[1,2,3], target=2 → lb=1, ub=2 → count=1 ✓
   *
   * 4. All elements same:
   *    arr=[5,5,5,5], target=5 → lb=0, ub=4 → count=4 ✓
   *
   * 5. target at boundaries:
   *    arr=[2,2,3,4], target=2 → lb=0, ub=2 → count=2 ✓
   *    arr=[1,2,3,3], target=3 → lb=2, ub=4 → count=2 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Number of Occurrences - BINARY SEARCH\n");

    const testCases: {
      arr: number[];
      target: number;
      expected: number;
      description: string;
    }[] = [
      {
        arr: [1, 1, 2, 2, 2, 2, 3], target: 2,
        expected: 4,
        description: "Classic: 2 appears 4 times, UB(6)-LB(2)=4",
      },
      {
        arr: [1, 1, 2, 2, 2, 2, 3], target: 4,
        expected: 0,
        description: "Target not in array → 0",
      },
      {
        arr: [8, 9, 10, 12, 12, 12], target: 12,
        expected: 3,
        description: "12 appears 3 times at end",
      },
      {
        arr: [1, 1, 1, 1, 1], target: 1,
        expected: 5,
        description: "All same: count = n = 5",
      },
      {
        arr: [1, 2, 3, 4, 5], target: 3,
        expected: 1,
        description: "All distinct, target exists once",
      },
      {
        arr: [1, 2, 3, 4, 5], target: 6,
        expected: 0,
        description: "Target > all elements → 0",
      },
      {
        arr: [2, 2, 3, 4], target: 2,
        expected: 2,
        description: "Target at beginning: count=2",
      },
      {
        arr: [1, 2, 3, 3], target: 3,
        expected: 2,
        description: "Target at end: count=2",
      },
      {
        arr: [5], target: 5,
        expected: 1,
        description: "Single element matches: count=1",
      },
      {
        arr: [5], target: 3,
        expected: 0,
        description: "Single element no match: count=0",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { arr, target, expected, description } of testCases) {
      const result = countOccurrences([...arr], target);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}], target=${target}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}], target=${target}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

NumberOfOccurrenceOptimal.runTests();
