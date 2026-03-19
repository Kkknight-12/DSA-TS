/**
 * SMALLEST DIVISOR - BINARY SEARCH ON ANSWER (OPTIMAL)
 * ======================================================
 *
 * PROBLEM:
 * Ek array aur threshold diya gaya hai.
 * Sabse chota divisor dhundho jisse:
 *   sum of ceil(num / divisor) for all nums  <=  threshold
 *
 * INTUITION (Soch):
 * ─────────────────
 * Divisor aur sum ka INVERSE relationship hai:
 * - Divisor BADA karo → sum CHOTA hota hai (zyada divide hoga)
 * - Divisor CHOTA karo → sum BADA hota hai (kam divide hoga)
 *
 * Yeh MONOTONIC hai! Ek point ke baad sab valid:
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  nums = [1,2,5,9], threshold = 6                         │
 * │                                                          │
 * │  divisor=1: ceil(1/1)+ceil(2/1)+ceil(5/1)+ceil(9/1)     │
 * │           = 1+2+5+9 = 17 > 6 ✗                         │
 * │  divisor=3: ceil(1/3)+ceil(2/3)+ceil(5/3)+ceil(9/3)     │
 * │           = 1+1+2+3 = 7  > 6 ✗                         │
 * │  divisor=5: ceil(1/5)+ceil(2/5)+ceil(5/5)+ceil(9/5)     │
 * │           = 1+1+1+2 = 5 <= 6 ✓                         │
 * │  divisor=9: ceil(1/9)+ceil(2/9)+ceil(5/9)+ceil(9/9)     │
 * │           = 1+1+1+1 = 4 <= 6 ✓                         │
 * │                                                          │
 * │  [✗, ✗, ✗, ✗, ✓, ✓, ✓, ✓, ✓]                          │
 * │                  ↑                                       │
 * │              answer = 5 (smallest valid divisor)        │
 * └──────────────────────────────────────────────────────────┘
 *
 * Binary search on answer space [1..max(nums)]!
 *
 * SEARCH SPACE:
 * ─────────────
 * left  = 1          → minimum divisor (har num by 1 = sum of nums, largest possible)
 * right = max(nums)  → WHY: agar divisor = max, toh ceil(max/max)=1
 *                      Aur bade divisors se sum aur kam hoga, but unnecessary
 *
 * ALGORITHM:
 * ──────────
 * 1. left=1, right=max(nums)
 * 2. Binary search (left < right, Pattern 2 — minimize):
 *    a. mid = (left+right)/2
 *    b. isValid(mid)? → right=mid (keep as candidate, try smaller)
 *    c. else          → left=mid+1 (too small, need bigger divisor)
 * 3. return left
 *
 * TIME COMPLEXITY: O(n × log(max(nums)))
 *   - Binary search: O(log(max(nums))) iterations
 *   - isValid check: O(n) per iteration
 *
 * SPACE COMPLEXITY: O(1)
 */

namespace SmallestDivisorOptimal {
  /**
   * Helper: checks if sum of ceil(num/divisor) <= threshold
   *
   * @param nums - Input array
   * @param divisor - Divisor to test
   * @param threshold - Max allowed sum
   */
  function isValid(nums: number[], divisor: number, threshold: number): boolean {
    let sum = 0;

    for (const num of nums) {
      // ceil division: 9/5 = 1.8 → ceil = 2
      // WHY ceil: problem explicitly says ceiling division
      sum += Math.ceil(num / divisor);

      // Early exit: agar threshold exceed ho gaya toh aage calculate karna bekar
      if (sum > threshold) return false;
    }

    return true;
  }

  /**
   * Finds smallest divisor such that sum of ceil(num/divisor) <= threshold
   *
   * @param nums - Array of positive integers
   * @param threshold - Maximum allowed sum
   * @returns Smallest valid divisor
   */
  function smallestDivisor(nums: number[], threshold: number): number {
    // Search space: [1 .. max(nums)]
    // WHY left=1: divisor kam se kam 1 hoga
    // WHY right=max: max se bada divisor unnecessary — sum sirf 1 per element hoga
    let left = 1;
    let right = Math.max(...nums);

    // Pattern 2: left < right, minimize karna hai
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (isValid(nums, mid, threshold)) {
        // mid valid hai, but chota bhi ho sakta hai → right=mid (keep candidate)
        right = mid;
      } else {
        // mid se sum zyada aaya, divisor bada karo → left=mid+1 (skip mid)
        left = mid + 1;
      }
    }

    // left === right → minimum valid divisor
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: nums = [1, 2, 5, 9], threshold = 6
   *
   * Search space: [1 .. 9]
   * left=1, right=9
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=1, right=9                                        │
   * │ mid = (1+9)/2 = 5                                      │
   * │ isValid(divisor=5)?                                    │
   * │   ceil(1/5)=1, ceil(2/5)=1, ceil(5/5)=1, ceil(9/5)=2 │
   * │   sum = 1+1+1+2 = 5 <= 6 → TRUE                       │
   * │ → right = 5 (5 is valid, try smaller)                  │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=1, right=5                                        │
   * │ mid = (1+5)/2 = 3                                      │
   * │ isValid(divisor=3)?                                    │
   * │   ceil(1/3)=1, ceil(2/3)=1, ceil(5/3)=2, ceil(9/3)=3 │
   * │   sum = 1+1+2+3 = 7 > 6 → FALSE                       │
   * │ → left = 4 (3 too small, need bigger)                  │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=4, right=5                                        │
   * │ mid = (4+5)/2 = 4                                      │
   * │ isValid(divisor=4)?                                    │
   * │   ceil(1/4)=1, ceil(2/4)=1, ceil(5/4)=2, ceil(9/4)=3 │
   * │   sum = 1+1+2+3 = 7 > 6 → FALSE                       │
   * │ → left = 5                                             │
   * └────────────────────────────────────────────────────────┘
   *
   * left=5 === right=5 → EXIT LOOP
   * return 5 ✅
   *
   * Search space narrowing:
   *   [1 ──────── 9]
   *   [1 ──── 5]      (5 valid, try smaller)
   *   [4 ── 5]        (3 invalid, go right)
   *   [5 == 5]        (4 invalid, go right) → answer!
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. threshold = nums.length:
   *    Each element must divide to exactly 1 → divisor = max(nums)
   *    ceil(any/max) = 1, sum = n = threshold ✓
   *
   * 2. threshold = sum(nums):
   *    divisor = 1 works! ceil(num/1) = num, sum = sum(nums) = threshold
   *    answer = 1
   *
   * 3. Single element [5], threshold=1:
   *    Need ceil(5/d) <= 1 → d >= 5 → answer = 5
   *    left=1, right=5 → mid=3: ceil(5/3)=2>1 → left=4
   *    mid=4: ceil(5/4)=2>1 → left=5
   *    left=right=5 → return 5 ✅
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Smallest Divisor - BINARY SEARCH ON ANSWER (OPTIMAL)\n");

    const testCases: {
      nums: number[];
      threshold: number;
      expected: number;
      description: string;
    }[] = [
      // Basic examples from problem
      {
        nums: [1, 2, 5, 9],
        threshold: 6,
        expected: 5,
        description: "Example 1: Classic case",
      },
      {
        nums: [44, 22, 33, 11, 1],
        threshold: 5,
        expected: 44,
        description: "Example 2: Large values",
      },

      // Edge cases
      {
        nums: [1, 2, 3],
        threshold: 6,
        expected: 1,
        description: "Threshold = sum(nums) → divisor=1 works",
      },
      {
        nums: [5],
        threshold: 1,
        expected: 5,
        description: "Single element, must divide to 1",
      },
      {
        nums: [2, 3, 5, 7, 11],
        threshold: 5,
        expected: 11,
        description: "Each element must ceil to 1 → divisor=max",
      },

      // Larger cases
      {
        nums: [1, 2, 3, 4, 5],
        threshold: 8,
        expected: 2,
        description: "Small divisor works",
      },
      {
        nums: [10, 10, 10],
        threshold: 6,
        expected: 5,
        description: "All same elements: ceil(10/5)=2, 2*3=6",
      },
      {
        nums: [1000000],
        threshold: 1,
        expected: 1000000,
        description: "Max value single element",
      },
      {
        nums: [1, 1, 1, 1],
        threshold: 4,
        expected: 1,
        description: "All ones, threshold=n",
      },
      {
        nums: [7, 14, 21],
        threshold: 4,
        expected: 7,
        description: "Multiples: ceil(7/7)+ceil(14/7)+ceil(21/7)=1+2+3=6>4, try 14: 1+1+2=4 ✓",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { nums, threshold, expected, description } of testCases) {
      const result = smallestDivisor(nums, threshold);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   nums=[${nums}], threshold=${threshold}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   nums=[${nums}], threshold=${threshold}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
SmallestDivisorOptimal.runTests();
