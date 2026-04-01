/**
 * ═══════════════════════════════════════════════════════════
 * FIRST AND LAST POSITION OF ELEMENT IN SORTED ARRAY — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Sorted array mein target ki FIRST aur LAST position dhundho.
 * Agar target exist nahi karta → return [-1, -1]
 *
 * EXAMPLE:
 *   nums = [5, 7, 7, 8, 8, 10],  target = 8
 *
 *   idx:   0   1   2   3   4   5
 *   val:   5   7   7   8   8  10
 *                      ↑   ↑
 *               first=3   last=4
 *
 *   return [3, 4]
 *
 * KEY INSIGHT — LB aur UB already padh chuke ho!
 *
 *   First position = lowerBound(target)     → first index where nums[i] >= target
 *   Last  position = upperBound(target) - 1 → upperBound = first index where nums[i] > target
 *                                              toh us se ek peeche = last occurrence of target
 *
 *   Visual:
 *   [5,  7,  7,  8,  8, 10]
 *                ↑       ↑
 *              LB=3     UB=5
 *              |←─ 2 ─→|
 *            first=3  last=UB-1=4
 *
 *   Count = UB - LB = 5 - 3 = 2  (number-of-occurrence wali trick bhi yahi thi!)
 *
 * TIME:  O(log n) — two binary searches
 * SPACE: O(1)
 */

namespace FirstLastPositionOptimal {

  // ─────────────────────────────────────────────────────────
  // HELPER: lowerBound
  // ─────────────────────────────────────────────────────────
  // First index where nums[i] >= target
  // Pattern 2: [✗,✗,...,✓,✓] → find first ✓
  //
  function lowerBound(nums: number[], n: number, target: number): number {
    let left = 0;
    let right = n; // n = "not found" case

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] >= target) {
        right = mid; // valid, but smaller might exist on left
      } else {
        left = mid + 1; // invalid, go right
      }
    }

    return left; // left === n means "no element >= target"
  }

  // ─────────────────────────────────────────────────────────
  // HELPER: upperBound
  // ─────────────────────────────────────────────────────────
  // First index where nums[i] > target
  // Pattern 2: [✗,✗,...,✓,✓] → find first ✓
  //
  function upperBound(nums: number[], n: number, target: number): number {
    let left = 0;
    let right = n; // n = "not found" case

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] > target) {
        right = mid; // valid, but smaller might exist on left
      } else {
        left = mid + 1; // invalid (equal or less), go right
      }
    }

    return left; // left === n means "no element > target"
  }

  // ─────────────────────────────────────────────────────────
  // MAIN FUNCTION
  // ─────────────────────────────────────────────────────────
  function searchRange(nums: number[], target: number): [number, number] {
    const n = nums.length;

    // Step 1: Find lower bound = first position where nums[i] >= target
    const lb = lowerBound(nums, n, target);

    // Step 2: Check if target actually exists
    // WHY: lb points to first element >= target, but target ho bhi sakta hai, nahi bhi
    //   lb === n        → no element >= target → target nahi hai
    //   nums[lb] != target → lb points to something bigger → target nahi hai
    if (lb === n || nums[lb] !== target) {
      return [-1, -1];
    }

    // Step 3: Find upper bound = first position where nums[i] > target
    // Last occurrence = ub - 1
    // WHY ub - 1?  ub = first element STRICTLY > target
    //              toh ub-1 = last element that is <= target = last occurrence of target
    const ub = upperBound(nums, n, target);

    return [lb, ub - 1];
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * nums = [5, 7, 7, 8, 8, 10],  n=6,  target=8
   *
   * idx:    0   1   2   3   4   5
   * val:    5   7   7   8   8  10
   *
   * ═══════════════════════════════════════════════════════════
   * PART 1: lowerBound(nums, 6, 8)
   * Pattern: nums[i] >= 8?
   *  ✗   ✗   ✗   ✓   ✓   ✓
   *  5   7   7   8   8  10
   * First ✓ = index 3
   * ═══════════════════════════════════════════════════════════
   *
   * left=0, right=6
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=8 >= 8? YES → right=3                         │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=0, right=3, mid=1                          │
   * │   nums[1]=7 >= 8? NO  → left=2                          │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=2, right=3, mid=2                          │
   * │   nums[2]=7 >= 8? NO  → left=3                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=3 === right=3 → EXIT
   * lb = 3
   *
   * Check: lb(3) !== n(6) AND nums[3]=8 === target=8 → target exists ✓
   *
   * ═══════════════════════════════════════════════════════════
   * PART 2: upperBound(nums, 6, 8)
   * Pattern: nums[i] > 8?
   *  ✗   ✗   ✗   ✗   ✗   ✓
   *  5   7   7   8   8  10
   * First ✓ = index 5
   * ═══════════════════════════════════════════════════════════
   *
   * left=0, right=6
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=8 > 8? NO   → left=4                          │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=4, right=6, mid=5                          │
   * │   nums[5]=10 > 8? YES → right=5                         │
   * └──────────────────────────────────────────────────────────┘
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=4, right=5, mid=4                          │
   * │   nums[4]=8 > 8? NO   → left=5                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=5 === right=5 → EXIT
   * ub = 5
   *
   * ═══════════════════════════════════════════════════════════
   * RESULT: [lb, ub-1] = [3, 4] ✅
   * ═══════════════════════════════════════════════════════════
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Target not in array:
   *    nums=[5,7,9], target=8
   *    lb=2, nums[2]=9 ≠ 8 → return [-1,-1]
   *
   * 2. Target appears once:
   *    nums=[5,7,8,9], target=8
   *    lb=2, ub=3 → [2, 2]
   *
   * 3. All elements are target:
   *    nums=[3,3,3,3], target=3
   *    lb=0, ub=4 → [0, 3]
   *
   * 4. Target at start:
   *    nums=[8,8,9,10], target=8
   *    lb=0, ub=2 → [0, 1]
   *
   * 5. Target at end:
   *    nums=[5,7,8,8], target=8
   *    lb=2, ub=4 → [2, 3]
   */

  export function runTests(): void {
    console.log('🧪 Testing First and Last Position — OPTIMAL\n');

    const tests: Array<{ nums: number[]; target: number; expected: [number, number] }> = [
      { nums: [5, 7, 7, 8, 8, 10], target: 8,  expected: [3, 4] },  // basic case
      { nums: [5, 7, 7, 8, 8, 10], target: 6,  expected: [-1, -1] },// target missing
      { nums: [],                   target: 0,  expected: [-1, -1] },// empty array
      { nums: [3, 3, 3, 3],         target: 3,  expected: [0, 3] },  // all same
      { nums: [1],                  target: 1,  expected: [0, 0] },  // single element found
      { nums: [1],                  target: 2,  expected: [-1, -1] },// single element not found
      { nums: [8, 8, 9, 10],        target: 8,  expected: [0, 1] },  // target at start
      { nums: [5, 7, 8, 8],         target: 8,  expected: [2, 3] },  // target at end
      { nums: [1, 2, 3, 4, 5],      target: 3,  expected: [2, 2] },  // target appears once
      { nums: [1, 1, 2, 2, 3, 3],   target: 2,  expected: [2, 3] },  // pairs
    ];

    tests.forEach(({ nums, target, expected }, i) => {
      const result = searchRange(nums, target);
      const pass = result[0] === expected[0] && result[1] === expected[1];
      console.log(`Test ${i + 1}: nums=[${nums}], target=${target}`);
      console.log(`  Expected: [${expected}] | Got: [${result}] → ${pass ? '✅' : '❌'}`);
    });
  }
}

FirstLastPositionOptimal.runTests();