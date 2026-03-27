/**
 * MEDIAN OF TWO SORTED ARRAYS - BINARY SEARCH ON PARTITION (OPTIMAL)
 * ===================================================================
 *
 * PROBLEM:
 * Do sorted arrays nums1 aur nums2 ka median nikalo — bina merge kiye!
 *
 * BRUTE FORCE mein hum merge karte the: O(m+n) time aur O(m+n) space.
 * OPTIMAL mein hum Binary Search se DIRECTLY partition dhundenge: O(log(min(m,n))).
 *
 * INTUITION (Soch):
 * ─────────────────
 * Median ka matlab hai: array ko do equal halves mein divide karo.
 * Left half ke sab elements ≤ Right half ke sab elements.
 *
 * Hum DONO arrays ko simultaneously partition karenge:
 *
 *   arr1: [  left_part1  |  right_part1  ]
 *   arr2: [  left_part2  |  right_part2  ]
 *          ↑─────────────↑─────────────↑
 *             Combined       Combined
 *             LEFT HALF      RIGHT HALF
 *
 * CONDITION for VALID PARTITION:
 *   1. |left_part1| + |left_part2| = (m+n+1)/2   (equal halves)
 *   2. leftMax1 ≤ rightMin2   (arr1 left ≤ arr2 right)
 *   3. leftMax2 ≤ rightMin1   (arr2 left ≤ arr1 right)
 *
 * Jab yeh conditions satisfy hoon, left half ke sab elements ≤ right half!
 *
 * BINARY SEARCH ON WHAT?
 * ──────────────────────
 * Hum arr1 pe binary search karte hain: "Arr1 se KITNE elements left half mein?"
 *
 * Agar arr1 se p1 elements left mein hain → arr2 se automatically p2 = leftHalfSize - p1
 *
 * p1 ki range: [0 .. n1]  (0 = none from arr1, n1 = all from arr1)
 *
 * ADJUSTMENT LOGIC:
 * ─────────────────
 * leftMax1 > rightMin2:
 *   arr1 left mein ZYADA elements hain — woh arr2 right mein ghus rahe hain
 *   → high = p1 - 1  (arr1 se kam lo)
 *
 * leftMax2 > rightMin1:
 *   arr2 left mein ZYADA elements hain — arr1 se ZYADA lena padega
 *   → low = p1 + 1  (arr1 se zyada lo)
 *
 * VISUAL EXAMPLE:
 * ───────────────
 * arr1 = [2, 3, 6],  arr2 = [1, 4, 5]
 * merged (sorted) = [1, 2, 3, 4, 5, 6]
 * median = (3+4)/2 = 3.5
 *
 * n1=3, n2=3, total=6, leftHalfSize = (6+1)/2 = 3
 *
 * GOAL: Find partition of arr1 and arr2 such that:
 *   - left part has 3 elements total
 *   - all left ≤ all right
 *
 * Try p1=2, p2=1:
 *   arr1: [2, 3  |  6]
 *   arr2: [1     |  4, 5]
 *          leftMax2=1   rightMin2=4
 *          leftMax1=3   rightMin1=6
 *
 *   Check: 3 ≤ 4? YES ✓   1 ≤ 6? YES ✓ → VALID!
 *
 *   Combined left  = {2,3,1} → max = 3
 *   Combined right = {6,4,5} → min = 4
 *   Median = (3+4)/2 = 3.5 ✅
 *
 * MEDIAN FORMULA:
 * ───────────────
 * Once valid partition found:
 *   leftMax  = max(leftMax1, leftMax2)
 *   rightMin = min(rightMin1, rightMin2)
 *
 *   Odd total:  median = leftMax          (extra element in left)
 *   Even total: median = (leftMax + rightMin) / 2
 *
 * WHY BINARY SEARCH ON SMALLER ARRAY?
 * ─────────────────────────────────────
 * O(log(min(m,n))) — always search on smaller array for efficiency.
 * Swap if needed so arr1 is always the smaller one.
 *
 * TIME COMPLEXITY:  O(log(min(m, n)))
 *   Binary search on smaller array (size = min(m,n))
 *
 * SPACE COMPLEXITY: O(1)
 *   Only a few variables — no extra array!
 *
 * @param nums1 - First sorted array
 * @param nums2 - Second sorted array
 * @returns Median value (float)
 */

namespace MedianTwoSortedArraysOptimal {
  function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const n1 = nums1.length;
    const n2 = nums2.length;

    // Always binary search on the SMALLER array
    // WHY: O(log(min)) — fewer iterations
    if (n1 > n2) {
      return findMedianSortedArrays(nums2, nums1);
    }

    const totalLength = n1 + n2;

    // Left half mein kitne elements chahiye?
    // WHY +1: Odd case mein extra element left mein jaata hai (floor division)
    // Example: total=9 → leftHalfSize=5, rightHalfSize=4
    const leftHalfSize = Math.floor((totalLength + 1) / 2);

    // Binary search: arr1 se kitne elements left mein? Range: [0..n1]
    let low = 0;
    let high = n1;

    while (low <= high) {
      // p1 = arr1 se left mein lenge elements (the partition point)
      const p1 = Math.floor((low + high) / 2);

      // p2 = arr2 se left mein kitne (automatically determined)
      const p2 = leftHalfSize - p1;

      // Boundary elements — use infinity for out-of-bound cases
      // WHY -Infinity for leftMax: empty left partition acts as "no constraint"
      // WHY +Infinity for rightMin: empty right partition acts as "no constraint"
      const leftMax1 = p1 > 0 ? nums1[p1 - 1] : -Infinity;
      const leftMax2 = p2 > 0 ? nums2[p2 - 1] : -Infinity;
      const rightMin1 = p1 < n1 ? nums1[p1] : Infinity;
      const rightMin2 = p2 < n2 ? nums2[p2] : Infinity;

      // Check valid partition condition
      if (leftMax1 <= rightMin2 && leftMax2 <= rightMin1) {
        // PERFECT PARTITION FOUND!

        if (totalLength % 2 === 1) {
          // Odd: left mein ek extra element hai → woh hi median hai
          return Math.max(leftMax1, leftMax2);
        } else {
          // Even: do middles ka average
          const leftMax = Math.max(leftMax1, leftMax2);
          const rightMin = Math.min(rightMin1, rightMin2);
          return (leftMax + rightMin) / 2;
        }
      } else if (leftMax1 > rightMin2) {
        // arr1 ka left part bada ho gaya — rightMin2 se cross kar gaya
        // arr1 se KAM elements lo → move left
        high = p1 - 1;
      } else {
        // leftMax2 > rightMin1 — arr2 ka left zyada bada hai
        // arr1 se ZYADA elements lo → move right
        low = p1 + 1;
      }
    }

    // Yahan kabhi nahi aana chahiye agar input valid hai
    return 0;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: nums1=[2,3,6], nums2=[1,4,5]
   *
   * n1=3, n2=3, totalLength=6
   * leftHalfSize = floor((6+1)/2) = 3
   * low=0, high=3
   *
   * Expected: merged=[1,2,3,4,5,6] → median=(3+4)/2=3.5
   *
   * Initial partition picture:
   *   arr1: [2, 3, 6]
   *   arr2: [1, 4, 5]
   *   We need 3 elements total in left half.
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 1
   * ═══════════════════════════════════════════════════════════
   *
   * low=0, high=3
   * p1 = floor((0+3)/2) = 1
   * p2 = 3 - 1 = 2
   *
   *   arr1: [2  |  3, 6]         ← partition after index 0 (p1=1)
   *   arr2: [1, 4  |  5]         ← partition after index 1 (p2=2)
   *
   *   leftMax1  = nums1[0] = 2
   *   leftMax2  = nums2[1] = 4
   *   rightMin1 = nums1[1] = 3
   *   rightMin2 = nums2[2] = 5
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Check: leftMax1 ≤ rightMin2?  2 ≤ 5? YES ✓              │
   * │ Check: leftMax2 ≤ rightMin1?  4 ≤ 3? NO ✗               │
   * │ → leftMax2 > rightMin1: arr2 left too big                │
   * │ → arr1 se MORE elements lo                               │
   * │ → low = p1 + 1 = 2                                       │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 2
   * ═══════════════════════════════════════════════════════════
   *
   * low=2, high=3
   * p1 = floor((2+3)/2) = 2
   * p2 = 3 - 2 = 1
   *
   *   arr1: [2, 3  |  6]         ← partition after index 1 (p1=2)
   *   arr2: [1     |  4, 5]      ← partition after index 0 (p2=1)
   *
   *   leftMax1  = nums1[1] = 3
   *   leftMax2  = nums2[0] = 1
   *   rightMin1 = nums1[2] = 6
   *   rightMin2 = nums2[1] = 4
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Check: leftMax1 ≤ rightMin2?  3 ≤ 4? YES ✓              │
   * │ Check: leftMax2 ≤ rightMin1?  1 ≤ 6? YES ✓              │
   * │ → VALID PARTITION FOUND! 🎉                              │
   * └──────────────────────────────────────────────────────────┘
   *
   *   Combined left  = {2,3} ∪ {1} = {1,2,3}  → max = max(3,1) = 3
   *   Combined right = {6}   ∪ {4,5} = {4,5,6} → min = min(6,4) = 4
   *
   *   totalLength=6 (even):
   *   median = (leftMax + rightMin) / 2 = (3+4)/2 = 3.5 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * ODD TOTAL EXAMPLE: nums1=[1,4,7,10,12], nums2=[2,3,6,15]
   * ═══════════════════════════════════════════════════════════
   *
   * n1=5, n2=4 (n1>n2, so no swap needed since n1=5 is used)
   * Actually n1=5 > n2=4 → SWAP → nums1=[2,3,6,15], nums2=[1,4,7,10,12]
   * n1=4, n2=5, totalLength=9, leftHalfSize=5
   * low=0, high=4
   *
   * Iteration 1: p1=2, p2=3
   *   nums1: [2,3 | 6,15]
   *   nums2: [1,4,7 | 10,12]
   *   leftMax1=3, leftMax2=7, rightMin1=6, rightMin2=10
   *   3 ≤ 10? YES. 7 ≤ 6? NO → low=3
   *
   * Iteration 2: p1=3, p2=2
   *   nums1: [2,3,6 | 15]
   *   nums2: [1,4 | 7,10,12]
   *   leftMax1=6, leftMax2=4, rightMin1=15, rightMin2=7
   *   6 ≤ 7? YES. 4 ≤ 15? YES → VALID!
   *
   *   totalLength=9 (odd):
   *   median = max(leftMax1, leftMax2) = max(6,4) = 6 ✅
   *
   *   (The extra left-half element IS the median in odd case!)
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array: nums1=[], nums2=[1]
   *    n1=0, p1=0, p2=1
   *    leftMax1=-Infinity (empty left), rightMin1=+Infinity (empty right)
   *    leftMax2=nums2[0]=1, rightMin2=+Infinity (p2=n2=1, out of bounds)
   *    -Infinity ≤ +Infinity ✓, 1 ≤ +Infinity ✓ → VALID
   *    odd → max(-Infinity, 1) = 1 ✅
   *
   * 2. Single elements: nums1=[3], nums2=[1]
   *    Swap → nums1=[1], nums2=[3]
   *    p1=0 or p1=1 found quickly → median = 2.0 ✅
   *
   * 3. All elements same: nums1=[5,5], nums2=[5,5]
   *    Any partition works → median = (5+5)/2 = 5.0 ✅
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      "🧪 Testing Median of Two Sorted Arrays - BINARY SEARCH (OPTIMAL)\n"
    );

    const testCases: {
      nums1: number[];
      nums2: number[];
      expected: number;
      description: string;
    }[] = [
      // LeetCode classic
      {
        nums1: [1, 3],
        nums2: [2],
        expected: 2.0,
        description: "Odd total 3: merged=[1,2,3] → median=2",
      },
      {
        nums1: [1, 2],
        nums2: [3, 4],
        expected: 2.5,
        description: "Even total 4: merged=[1,2,3,4] → (2+3)/2=2.5",
      },

      // Dry run example
      {
        nums1: [2, 3, 6],
        nums2: [1, 4, 5],
        expected: 3.5,
        description: "Even total 6: merged=[1,2,3,4,5,6] → (3+4)/2=3.5",
      },
      {
        nums1: [1, 4, 7, 10, 12],
        nums2: [2, 3, 6, 15],
        expected: 6.0,
        description: "Odd total 9: median=6 (middle element)",
      },

      // Edge: empty array
      {
        nums1: [],
        nums2: [1],
        expected: 1.0,
        description: "Empty nums1: median=[1] → 1",
      },
      {
        nums1: [2],
        nums2: [],
        expected: 2.0,
        description: "Empty nums2: median=[2] → 2",
      },

      // Edge: single elements
      {
        nums1: [1],
        nums2: [2],
        expected: 1.5,
        description: "Two singles: merged=[1,2] → 1.5",
      },
      {
        nums1: [3],
        nums2: [1],
        expected: 2.0,
        description: "Swap needed (n1>n2): merged=[1,3] → 2.0",
      },

      // Negative numbers
      {
        nums1: [2, 3, 6],
        nums2: [-5, -4, -3, -2, -1, 0],
        expected: 0.5,
        description: "Mixed pos/neg: find mid of 9 elements",
      },
      {
        nums1: [-5, -3, -1],
        nums2: [-4, -2, 0],
        expected: -2.5,
        description: "All negatives: merged=[-5,-4,-3,-2,-1,0] → (-3-2)/2=-2.5",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { nums1, nums2, expected, description } of testCases) {
      const result = findMedianSortedArrays([...nums1], [...nums2]);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   nums1=[${nums1}], nums2=[${nums2}]`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   nums1=[${nums1}], nums2=[${nums2}]`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
MedianTwoSortedArraysOptimal.runTests();