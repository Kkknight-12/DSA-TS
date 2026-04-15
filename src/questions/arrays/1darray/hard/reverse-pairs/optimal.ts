/**
 * ═══════════════════════════════════════════════════════════
 * REVERSE PAIRS - OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Count pairs `(i, j)` where:
 *
 *   i < j
 *   nums[i] > 2 * nums[j]
 *
 * Example:
 *   [1, 3, 2, 3, 1] -> 2
 *
 * Valid pairs:
 *   (1, 4): 3 > 2 * 1
 *   (3, 4): 3 > 2 * 1
 *
 * PREREQUISITES (Pehle Ye Aana Chahiye):
 *   1. Merge Sort
 *      WHY: solution array ko recursively split karke sorted halves banata hai.
 *
 *   2. Two pointers on sorted arrays
 *      WHY: sorted left/right halves ke cross pairs fast count karne hain.
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force har pair check karta hai: O(n^2).
 *
 * Better soch:
 *   Agar left half sorted hai
 *   aur right half sorted hai,
 *   toh cross pairs ko two pointers se count kar sakte hain.
 *
 * Merge sort naturally hume sorted halves deta hai.
 *
 * Har recursive segment ke liye:
 *   1. left half ke pairs count karo
 *   2. right half ke pairs count karo
 *   3. left half vs right half cross pairs count karo
 *   4. segment ko sorted merge karo
 *
 * Cross pairs merge se PEHLE count karte hain.
 * WHY:
 *   merge ke baad left/right half identity mix ho jaati hai.
 *   Counting ke time hume i left half me aur j right half me chahiye.
 *
 * TIME:  O(n log n)
 * SPACE: O(n)
 */

namespace ReversePairsOptimal {
  function reversePairs(nums: number[]): number {
    if (nums.length < 2) return 0;

    return mergeSortAndCount(nums, 0, nums.length - 1);
  }

  function mergeSortAndCount(
    nums: number[],
    left: number,
    right: number
  ): number {
    // Single element segment me pair ban hi nahi sakta.
    if (left >= right) return 0;

    const mid = Math.floor(left + (right - left) / 2);

    // Pehle dono halves ke andar ke reverse pairs count karo.
    const leftPairs = mergeSortAndCount(nums, left, mid);
    const rightPairs = mergeSortAndCount(nums, mid + 1, right);

    // Ab dono sorted halves ke beech wale reverse pairs count karo.
    const crossPairs = countCrossPairs(nums, left, mid, right);

    // Count karne ke baad merge karo, so parent call ko sorted segment mile.
    merge(nums, left, mid, right);

    return leftPairs + rightPairs + crossPairs;
  }

  function countCrossPairs(
    nums: number[],
    left: number,
    mid: number,
    right: number
  ): number {
    let count = 0;
    let rightPointer = mid + 1;

    for (let leftPointer = left; leftPointer <= mid; leftPointer++) {
      // rightPointer ko tab tak aage badhao jab tak condition true hai.
      // WHY: right half sorted hai, so smaller right values pehle aate hain.
      while (
        rightPointer <= right &&
        nums[leftPointer] > 2 * nums[rightPointer]
      ) {
        rightPointer++;
      }

      // mid+1 se rightPointer-1 tak ke saare right values valid hain.
      count += rightPointer - (mid + 1);

      // Important: rightPointer reset nahi hota.
      // WHY: left half sorted hai. Next left value same ya bigger hogi,
      // so jo right values previous left ke liye valid the, woh next left
      // ke liye bhi valid rahenge.
    }

    return count;
  }

  function merge(
    nums: number[],
    left: number,
    mid: number,
    right: number
  ): void {
    const sorted: number[] = [];
    let leftPointer = left;
    let rightPointer = mid + 1;

    while (leftPointer <= mid && rightPointer <= right) {
      if (nums[leftPointer] <= nums[rightPointer]) {
        sorted.push(nums[leftPointer]);
        leftPointer++;
      } else {
        sorted.push(nums[rightPointer]);
        rightPointer++;
      }
    }

    while (leftPointer <= mid) {
      sorted.push(nums[leftPointer]);
      leftPointer++;
    }

    while (rightPointer <= right) {
      sorted.push(nums[rightPointer]);
      rightPointer++;
    }

    // Sorted segment ko original array me copy karo.
    // WHY: parent recursive call ko sorted left/right halves chahiye.
    for (let i = 0; i < sorted.length; i++) {
      nums[left + i] = sorted[i];
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - FULL CODE FLOW
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * nums = [2, 4, 3, 5, 1]
   *
   * Expected reverse pairs:
   *   (4, 1): 4 > 2 * 1
   *   (3, 1): 3 > 2 * 1
   *   (5, 1): 5 > 2 * 1
   *
   * Answer = 3
   *
   * ═══════════════════════════════════════════════════════════
   * RECURSIVE SPLIT TREE
   * ═══════════════════════════════════════════════════════════
   *
   * mergeSort(0, 4) -> [2, 4, 3, 5, 1]
   *   mergeSort(0, 2) -> [2, 4, 3]
   *     mergeSort(0, 1) -> [2, 4]
   *       mergeSort(0, 0) -> single element -> 0
   *       mergeSort(1, 1) -> single element -> 0
   *       countCrossPairs([2], [4]) -> 0
   *       merge -> [2, 4]
   *
   *     mergeSort(2, 2) -> single element -> 0
   *     countCrossPairs([2, 4], [3]) -> 0
   *     merge -> [2, 3, 4]
   *
   *   mergeSort(3, 4) -> [5, 1]
   *     mergeSort(3, 3) -> single element -> 0
   *     mergeSort(4, 4) -> single element -> 0
   *     countCrossPairs([5], [1]) -> 1
   *       5 > 2 * 1 -> true
   *     merge -> [1, 5]
   *
   *   Now parent has:
   *     left sorted half  = [2, 3, 4]
   *     right sorted half = [1, 5]
   *
   * ═══════════════════════════════════════════════════════════
   * FINAL CROSS COUNT: [2, 3, 4] vs [1, 5]
   * ═══════════════════════════════════════════════════════════
   *
   * Original segment:
   *   left half indices:  0..2 -> [2, 3, 4]
   *   right half indices: 3..4 -> [1, 5]
   *
   * Start:
   *   rightPointer = 3
   *   count = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ leftPointer = 0, nums[leftPointer] = 2                  │
   * │ rightPointer = 3, nums[rightPointer] = 1                │
   * │ Check: 2 > 2 * 1 ? 2 > 2 -> false                       │
   * │ rightPointer stays 3                                    │
   * │ Add: 3 - 3 = 0                                          │
   * │ cross count = 0                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ leftPointer = 1, nums[leftPointer] = 3                  │
   * │ rightPointer = 3, nums[rightPointer] = 1                │
   * │ Check: 3 > 2 * 1 ? 3 > 2 -> true                        │
   * │ rightPointer++ -> 4                                     │
   * │ Check: 3 > 2 * 5 ? 3 > 10 -> false                      │
   * │ Add: 4 - 3 = 1                                          │
   * │ Valid right values: [1]                                 │
   * │ cross count = 1                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ leftPointer = 2, nums[leftPointer] = 4                  │
   * │ rightPointer = 4, nums[rightPointer] = 5                │
   * │ Check: 4 > 2 * 5 ? 4 > 10 -> false                      │
   * │ rightPointer stays 4                                    │
   * │ Add: 4 - 3 = 1                                          │
   * │ WHY still add 1?                                        │
   * │   right value [1] was already crossed earlier.          │
   * │   Since 4 is bigger than 3, [1] is still valid.         │
   * │ cross count = 2                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * Total:
   *   left half pairs  = 0
   *   right half pairs = 1
   *   cross pairs      = 2
   *   answer           = 3
   *
   * Final merge:
   *   [2, 3, 4] + [1, 5] -> [1, 2, 3, 4, 5]
   *
   * EDGE CASES:
   * 1. [] -> 0
   * 2. [1] -> 0
   * 3. sorted increasing -> 0
   * 4. negative values still work because condition uses actual numeric compare
   */

  export function runTests(): void {
    console.log('🧪 Testing Reverse Pairs - OPTIMAL\n');

    const tests: Array<{ nums: number[]; expected: number }> = [
      { nums: [1, 3, 2, 3, 1], expected: 2 },
      { nums: [2, 4, 3, 5, 1], expected: 3 },
      { nums: [], expected: 0 },
      { nums: [1], expected: 0 },
      { nums: [1, 2, 3, 4, 5], expected: 0 },
      { nums: [5, 4, 3, 2, 1], expected: 4 },
      { nums: [1, 1, 1, 1], expected: 0 },
      { nums: [10, 5, 2, 1], expected: 4 },
      { nums: [-5, -5], expected: 1 },
      {
        nums: [2147483647, 2147483647, -2147483648, -2147483648],
        expected: 5,
      },
    ];

    tests.forEach(({ nums, expected }, index) => {
      // reversePairs sorts internally, so pass a copy to keep test output clear.
      const result = reversePairs([...nums]);
      const pass = result === expected;

      console.log(`Test ${index + 1}: nums=[${nums}]`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} -> ${pass ? '✅' : '❌'}`);
    });
  }
}

ReversePairsOptimal.runTests();