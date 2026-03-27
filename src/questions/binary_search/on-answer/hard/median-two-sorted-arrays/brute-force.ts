/**
 * MEDIAN OF TWO SORTED ARRAYS - BRUTE FORCE (MERGE + FIND)
 * =========================================================
 *
 * PROBLEM:
 * Do sorted arrays nums1 aur nums2 diye hain.
 * Dono ko milake jo combined sorted array banta hai, uska MEDIAN nikalo.
 *
 * Median kya hota hai?
 *   - Sorted array ka MIDDLE element
 *   - Odd length: exactly ek middle element
 *   - Even length: do middle elements ka average
 *
 * Example 1 (Odd total):
 *   nums1 = [1, 3]
 *   nums2 = [2]
 *   Merged = [1, 2, 3]   ← n=3, odd
 *   Median = 2  (middle element at index 1)
 *
 * Example 2 (Even total):
 *   nums1 = [1, 2]
 *   nums2 = [3, 4]
 *   Merged = [1, 2, 3, 4]   ← n=4, even
 *   Median = (2 + 3) / 2 = 2.5
 *
 * INTUITION (Soch):
 * ─────────────────
 * Seedha approach: Dono arrays ko ek sorted array mein merge karo.
 * Merge sort ka wahi "merge" step use karenge!
 *
 * Phir middle index pe median nikalo.
 *
 * Agar total elements = n:
 *   Odd:  index n/2       → directly return merged[n/2]
 *   Even: index n/2-1 aur n/2 → return (merged[n/2-1] + merged[n/2]) / 2
 *
 * VISUAL EXAMPLE:
 * ─────────────────
 * nums1 = [1, 3],  nums2 = [2, 4]
 *
 * Merge process (two pointers):
 *   i→[1, 3]    j→[2, 4]
 *
 *   1 < 2 → take 1, i++    merged=[1]
 *   3 > 2 → take 2, j++    merged=[1,2]
 *   3 < 4 → take 3, i++    merged=[1,2,3]
 *   i done → take 4, j++   merged=[1,2,3,4]
 *
 *   n=4 (even):
 *   Indices: 0  1  2  3
 *   Values:  1  2  3  4
 *               ↑  ↑
 *           n/2-1=1  n/2=2
 *   Median = (2 + 3) / 2 = 2.5 ✅
 *
 * ALGORITHM:
 * ──────────
 * 1. Two pointers i=0 (nums1) and j=0 (nums2)
 * 2. Compare nums1[i] vs nums2[j], push smaller → advance that pointer
 * 3. Push remaining elements from whichever array is not exhausted
 * 4. Calculate median based on odd/even total length
 *
 * TIME COMPLEXITY:  O(m + n)
 *   - Merge step traverses both arrays once
 *   - m = nums1.length, n = nums2.length
 *
 * SPACE COMPLEXITY: O(m + n)
 *   - Extra merged array of size m+n
 *
 * WHY THIS IS NOT OPTIMAL:
 * ─────────────────────────
 * - O(m+n) space for merged array — wasteful
 * - Optimal approach uses Binary Search: O(log(min(m,n))) time, O(1) space
 * - For interview: always mention optimal exists even if starting with brute force
 *
 * @param nums1 - First sorted array
 * @param nums2 - Second sorted array
 * @returns Median value (float)
 */

namespace MedianTwoSortedArraysBruteForce {
  function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Merged array store karne ke liye — O(m+n) space
    const merged: number[] = [];

    // Two pointers: i for nums1, j for nums2
    let i = 0;
    let j = 0;

    // STEP 1: Compare and merge while both have elements
    // WHY: Merge sort ka same idea — chota element pehle jaata hai
    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] <= nums2[j]) {
        // nums1 ka element chota ya equal hai → usse pehle lo
        merged.push(nums1[i]);
        i++;
      } else {
        // nums2 ka element chota hai → usse pehle lo
        merged.push(nums2[j]);
        j++;
      }
    }

    // STEP 2: nums2 khatam ho gayi, bacha hua nums1 push karo
    // WHY: Yeh elements already sorted hain aur nums2 ke sabse bade se bhi bade hain
    while (i < nums1.length) {
      merged.push(nums1[i]);
      i++;
    }

    // STEP 3: nums1 khatam ho gayi, bacha hua nums2 push karo
    while (j < nums2.length) {
      merged.push(nums2[j]);
      j++;
    }

    // STEP 4: Median nikalo
    const n = merged.length;

    if (n % 2 === 0) {
      // Even: do middle elements ka average
      // EXAMPLE: [1,2,3,4] → (merged[1]+merged[2])/2 = (2+3)/2 = 2.5
      return (merged[n / 2 - 1] + merged[n / 2]) / 2.0;
    } else {
      // Odd: exactly ek middle element
      // EXAMPLE: [1,2,3] → merged[1] = 2
      return merged[Math.floor(n / 2)];
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: nums1=[1,3], nums2=[2,4]
   *
   * Initial State:
   *   i=0 → nums1=[1, 3]
   *   j=0 → nums2=[2, 4]
   *   merged=[]
   *
   * ═══════════════════════════════════════════════════════════
   * PHASE 1: Main Merge Loop (while i<2 && j<2)
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=0, j=0                                                 │
   * │ Compare: nums1[0]=1 vs nums2[0]=2                        │
   * │ 1 ≤ 2 → take from nums1                                  │
   * │ merged=[1], i=1                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=1, j=0                                                 │
   * │ Compare: nums1[1]=3 vs nums2[0]=2                        │
   * │ 3 > 2 → take from nums2                                  │
   * │ merged=[1,2], j=1                                        │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=1, j=1                                                 │
   * │ Compare: nums1[1]=3 vs nums2[1]=4                        │
   * │ 3 ≤ 4 → take from nums1                                  │
   * │ merged=[1,2,3], i=2                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * i=2 (i < nums1.length=2? NO) → Phase 1 ends
   *
   * ═══════════════════════════════════════════════════════════
   * PHASE 2: Remaining from nums2 (j=1, nums2=[2,4])
   * ═══════════════════════════════════════════════════════════
   *
   * j=1 < nums2.length=2 → push nums2[1]=4, j=2
   * merged=[1,2,3,4]
   * j=2 < 2? NO → done
   *
   * ═══════════════════════════════════════════════════════════
   * PHASE 3: Median Calculation
   * ═══════════════════════════════════════════════════════════
   *
   * merged = [1, 2, 3, 4]
   *           0  1  2  3
   * n = 4 (even)
   *
   *      ↓   ↓
   *  n/2-1=1  n/2=2
   *    val=2   val=3
   *
   * median = (2 + 3) / 2 = 2.5 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * ODD LENGTH EXAMPLE: nums1=[1,3,5,7,9], nums2=[2,4,6,8]
   * ═══════════════════════════════════════════════════════════
   *
   * Merged = [1,2,3,4,5,6,7,8,9]
   *           0 1 2 3 4 5 6 7 8
   * n = 9 (odd)
   *
   * median index = floor(9/2) = 4
   * merged[4] = 5
   * median = 5.0 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. One empty array: nums1=[], nums2=[1]
   *    Phase 1 skipped (i=0, not < 0)
   *    Phase 3: push nums2[0]=1
   *    merged=[1], n=1 (odd) → median=merged[0]=1 ✓
   *
   * 2. Both single element: nums1=[1], nums2=[2]
   *    merged=[1,2], n=2 (even) → (1+2)/2 = 1.5 ✓
   *
   * 3. Negative numbers: nums1=[-1,0], nums2=[0,1]
   *    merged=[-1,0,0,1], n=4 (even) → (0+0)/2 = 0.0 ✓
   *
   * 4. Large value difference: nums1=[100000], nums2=[-100000]
   *    merged=[-100000,100000], n=2 → (-100000+100000)/2 = 0 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      "🧪 Testing Median of Two Sorted Arrays - BRUTE FORCE\n"
    );

    const testCases: {
      nums1: number[];
      nums2: number[];
      expected: number;
      description: string;
    }[] = [
      // LeetCode examples
      {
        nums1: [1, 3],
        nums2: [2],
        expected: 2.0,
        description: "Odd total: merged=[1,2,3] → median=2",
      },
      {
        nums1: [1, 2],
        nums2: [3, 4],
        expected: 2.5,
        description: "Even total: merged=[1,2,3,4] → median=2.5",
      },

      // Classic examples
      {
        nums1: [1, 3, 5, 7, 9],
        nums2: [2, 4, 6, 8],
        expected: 5.0,
        description: "Odd total 9: merged middle = 5",
      },
      {
        nums1: [1, 3, 5],
        nums2: [2, 4, 6],
        expected: 3.5,
        description: "Even total 6: (3+4)/2 = 3.5",
      },

      // Edge cases
      {
        nums1: [],
        nums2: [1],
        expected: 1.0,
        description: "Empty nums1: median of [1] = 1",
      },
      {
        nums1: [2],
        nums2: [],
        expected: 2.0,
        description: "Empty nums2: median of [2] = 2",
      },
      {
        nums1: [1],
        nums2: [2],
        expected: 1.5,
        description: "Single elements: merged=[1,2] → 1.5",
      },
      {
        nums1: [1, 2],
        nums2: [1, 2],
        expected: 1.5,
        description: "Duplicate values: merged=[1,1,2,2] → (1+2)/2 = 1.5",
      },

      // Negative numbers
      {
        nums1: [-1, 0],
        nums2: [0, 1],
        expected: 0.0,
        description: "Negatives: merged=[-1,0,0,1] → (0+0)/2 = 0",
      },
      {
        nums1: [100000],
        nums2: [-100000],
        expected: 0.0,
        description: "Large range: (-100000+100000)/2 = 0",
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
MedianTwoSortedArraysBruteForce.runTests();