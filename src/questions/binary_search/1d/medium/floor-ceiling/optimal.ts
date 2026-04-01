/**
 * ═══════════════════════════════════════════════════════════
 * FLOOR AND CEILING IN SORTED ARRAY — OPTIMAL SOLUTION
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Sorted array mein x ka floor aur ceiling dhundho.
 *
 * Floor   = largest element in arr that is <= x
 * Ceiling = smallest element in arr that is >= x
 *
 * Agar exist nahi karta → return -1
 *
 * EXAMPLE:
 *   arr = [3, 4, 7, 8, 8, 10],  x = 5
 *   Floor   = 4  (4 <= 5, aur 4 se bada koi element <= 5 nahi hai)
 *   Ceiling = 7  (7 >= 5, aur 7 se chota koi element >= 5 nahi hai)
 *
 * TIME:  O(log n) — two separate binary searches, each O(log n)
 * SPACE: O(1)     — no extra data structures
 */

namespace FloorCeilingOptimal {

  // ─────────────────────────────────────────────────────────
  // HELPER 1: findFloor
  // ─────────────────────────────────────────────────────────
  // Floor = LAST element where arr[i] <= x
  //
  // Pattern: [✓, ✓, ✓, ✗, ✗]   ← last ✓ chahiye
  //           0   1   2   3   4
  //           3   4   7   8  10     x=5
  //          <=5 <=5  NO  NO  NO
  //               ↑
  //           last ✓ = index 1 → arr[1] = 4 = floor
  //
  // Approach: Pattern 1 with result saving
  //   - result = -1 (default: not found)
  //   - if arr[mid] <= x → valid, save result=arr[mid], go right (mid+1)
  //   - if arr[mid] >  x → invalid, go left (mid-1)
  //
  function findFloor(arr: number[], n: number, x: number): number {
    let left = 0;
    let right = n - 1;
    let result = -1; // Default: no floor exists

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] <= x) {
        // arr[mid] is a valid floor candidate — save it, then look for bigger one on right
        // WHY go right? arr mein aur bade elements hain jo still <= x ho sakte hain
        result = arr[mid];
        left = mid + 1;
      } else {
        // arr[mid] > x → yeh floor nahi ho sakta, left mein chota dhundho
        right = mid - 1;
      }
    }

    return result; // largest element <= x, or -1 if none
  }

  // ─────────────────────────────────────────────────────────
  // HELPER 2: findCeiling
  // ─────────────────────────────────────────────────────────
  // Ceiling = FIRST element where arr[i] >= x
  //         = Lower Bound of x (but return value, not index!)
  //
  // Pattern: [✗, ✗, ✓, ✓, ✓]   ← first ✓ chahiye
  //           0   1   2   3   4
  //           3   4   7   8  10     x=5
  //          NO  NO  >=5 >=5 >=5
  //                   ↑
  //           first ✓ = index 2 → arr[2] = 7 = ceiling
  //
  // Approach: Pattern 2 (find first valid)
  //   - right = n (not n-1) to handle "no ceiling" case
  //   - if arr[mid] >= x → valid, right = mid
  //   - else             → left = mid + 1
  //   - return: left === n means no ceiling → -1
  //             else arr[left] is ceiling
  //
  function findCeiling(arr: number[], n: number, x: number): number {
    let left = 0;
    let right = n; // n = "no ceiling exists" case

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] >= x) {
        // arr[mid] is a valid ceiling candidate — but smaller one might exist on left
        right = mid;
      } else {
        // arr[mid] < x → invalid, go right
        left = mid + 1;
      }
    }

    // left === n means no element >= x found
    return left === n ? -1 : arr[left];
  }

  // ─────────────────────────────────────────────────────────
  // MAIN FUNCTION
  // ─────────────────────────────────────────────────────────
  function floorAndCeiling(arr: number[], n: number, x: number): [number, number] {
    const floor   = findFloor(arr, n, x);
    const ceiling = findCeiling(arr, n, x);
    return [floor, ceiling];
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * arr = [3, 4, 7, 8, 8, 10],  n=6,  x=5
   *
   * idx:   0   1   2   3   4   5
   * val:   3   4   7   8   8  10
   *
   * ═══════════════════════════════════════════════════════════
   * PART 1: findFloor(arr, 6, 5)
   * Pattern: arr[i] <= 5?
   * ✓   ✓   ✗   ✗   ✗   ✗
   *  3   4   7   8   8  10
   * Last ✓ = index 1 = arr[1] = 4
   * ═══════════════════════════════════════════════════════════
   *
   * left=0, right=5, result=-1
   *
   * | Iter | left | right | mid | arr[mid] | <=5? | result | Action    |
   * |------|------|-------|-----|----------|------|--------|-----------|
   * |  1   |  0   |   5   |  2  |    7     |  ✗   |  -1    | right=1   |
   * |  2   |  0   |   1   |  0  |    3     |  ✓   |   3    | left=1    |
   * |  3   |  1   |   1   |  1  |    4     |  ✓   |   4    | left=2    |
   *
   * left=2 > right=1 → EXIT
   * return result = 4 ✅  (largest element <= 5)
   *
   * ═══════════════════════════════════════════════════════════
   * PART 2: findCeiling(arr, 6, 5)
   * Pattern: arr[i] >= 5?
   * ✗   ✗   ✓   ✓   ✓   ✓
   *  3   4   7   8   8  10
   * First ✓ = index 2 = arr[2] = 7
   * ═══════════════════════════════════════════════════════════
   *
   * left=0, right=6
   *
   * | Iter | left | right | mid | arr[mid] | >=5? | Action   |
   * |------|------|-------|-----|----------|------|----------|
   * |  1   |  0   |   6   |  3  |    8     |  ✓   | right=3  |
   * |  2   |  0   |   3   |  1  |    4     |  ✗   | left=2   |
   * |  3   |  2   |   3   |  2  |    7     |  ✓   | right=2  |
   *
   * left=2 === right=2 → EXIT
   * left(2) !== n(6) → return arr[2] = 7 ✅  (smallest element >= 5)
   *
   * ═══════════════════════════════════════════════════════════
   * RESULT: [floor=4, ceiling=7]
   * ═══════════════════════════════════════════════════════════
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. x exists in array:
   *    arr=[3,4,5,7,10], x=5
   *    Floor=5, Ceiling=5  (x khud dono hai)
   *
   * 2. x smaller than all elements:
   *    arr=[5,7,9], x=2
   *    Floor=-1 (koi element <= 2 nahi), Ceiling=5
   *
   * 3. x larger than all elements:
   *    arr=[3,5,7], x=10
   *    Floor=7, Ceiling=-1 (koi element >= 10 nahi)
   *
   * 4. Duplicates in array:
   *    arr=[3,4,4,7,8], x=4
   *    Floor=4 (4 <= 4, last one), Ceiling=4 (4 >= 4, first one)
   *
   * 5. Single element:
   *    arr=[5], x=5 → Floor=5, Ceiling=5
   *    arr=[5], x=3 → Floor=-1, Ceiling=5
   *    arr=[5], x=7 → Floor=5, Ceiling=-1
   */

  export function runTests(): void {
    console.log('🧪 Testing Floor and Ceiling — OPTIMAL\n');

    const tests = [
      // [arr, x, expectedFloor, expectedCeiling]
      { arr: [3, 4, 7, 8, 8, 10], x: 5, ef: 4, ec: 7 },          // basic case
      { arr: [3, 4, 5, 7, 10],    x: 5, ef: 5, ec: 5 },           // x exists in array
      { arr: [5, 7, 9],           x: 2, ef: -1, ec: 5 },          // x < all elements
      { arr: [3, 5, 7],           x: 10, ef: 7, ec: -1 },         // x > all elements
      { arr: [3, 4, 4, 7, 8],     x: 4, ef: 4, ec: 4 },           // duplicates
      { arr: [5],                 x: 5, ef: 5, ec: 5 },           // single element, exact
      { arr: [5],                 x: 3, ef: -1, ec: 5 },          // single element, x < arr[0]
      { arr: [5],                 x: 7, ef: 5, ec: -1 },          // single element, x > arr[0]
      { arr: [1, 2, 8, 10, 11, 12, 19], x: 5, ef: 2, ec: 8 },    // larger example
      { arr: [1, 2, 3, 4, 5],     x: 3, ef: 3, ec: 3 },           // x exists, middle
    ];

    tests.forEach(({ arr, x, ef, ec }, i) => {
      const [floor, ceiling] = floorAndCeiling(arr, arr.length, x);
      const pass = floor === ef && ceiling === ec;
      console.log(`Test ${i + 1}: arr=[${arr}], x=${x}`);
      console.log(`  Expected: [${ef}, ${ec}] | Got: [${floor}, ${ceiling}] → ${pass ? '✅' : '❌'}`);
    });
  }
}

FloorCeilingOptimal.runTests();
