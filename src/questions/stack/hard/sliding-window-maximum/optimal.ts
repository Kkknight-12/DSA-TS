/**
 * 239. Sliding Window Maximum - OPTIMAL SOLUTION
 *
 * Approach: Monotonic Decreasing Deque
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 *
 * KEY INSIGHT:
 * We don't need to rescan all k elements for each window!
 *
 * Observations:
 * 1. Smaller elements before a larger element will NEVER be the max
 *    (as long as the larger element is in the window)
 * 2. Keep elements in DECREASING order → front is always the max
 * 3. Store INDICES to check if element is still in window
 *
 * Deque maintains: indices whose values are in DECREASING order
 * Front of deque = index of current maximum
 */

namespace SlidingWindowMaxOptimal {
  /**
   * Main function - Find maximum in each sliding window
   *
   * @param nums - Array of integers
   * @param k - Window size
   * @returns Array of maximum values for each window position
   */
  export function maxSlidingWindow(nums: number[], k: number): number[] {
    const n = nums.length;
    const result: number[] = [];

    // Deque stores INDICES (not values!)
    // WHY indices? To check if element is still within window bounds
    // Values at these indices are in DECREASING order
    const deque: number[] = [];

    for (let i = 0; i < n; i++) {
      // ═══════════════════════════════════════════════════════════════
      // STEP 1: Remove indices that are OUT of current window
      // ═══════════════════════════════════════════════════════════════
      // Window bounds: [i - k + 1, i]
      // If front index < i - k + 1, it's outside window
      //
      // WHY check front only?
      // Because front has the oldest index (we add to back)
      // If front is out, remove it. Next front might also be out.
      while (deque.length > 0 && deque[0] < i - k + 1) {
        deque.shift(); // Remove from front
      }

      // ═══════════════════════════════════════════════════════════════
      // STEP 2: Remove SMALLER elements from back
      // ═══════════════════════════════════════════════════════════════
      // If nums[i] > nums[back of deque], remove back
      //
      // WHY? These smaller elements will NEVER be the maximum
      // as long as nums[i] is in the window!
      //
      // EXAMPLE: deque has [5, 3, 2], new element is 4
      //   4 > 2 → remove 2
      //   4 > 3 → remove 3
      //   4 < 5 → stop
      //   deque becomes [5, 4]
      while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
        deque.pop(); // Remove from back
      }

      // ═══════════════════════════════════════════════════════════════
      // STEP 3: Add current index to deque
      // ═══════════════════════════════════════════════════════════════
      // This element might be the max for future windows
      deque.push(i);

      // ═══════════════════════════════════════════════════════════════
      // STEP 4: Record maximum for complete windows
      // ═══════════════════════════════════════════════════════════════
      // First complete window is when i = k - 1
      // After that, every position gives a new window
      //
      // Front of deque = index of maximum element
      if (i >= k - 1) {
        result.push(nums[deque[0]]);
      }
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
   *
   * Deque stores INDICES
   * Values at indices are maintained in DECREASING order
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION BY ITERATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * i=0, nums[0]=1:
   *   Window bounds: [0-3+1, 0] = [-2, 0] → effectively [0, 0]
   *
   *   Step 1: Check front out of bounds
   *     Deque empty, skip
   *
   *   Step 2: Remove smaller from back
   *     Deque empty, skip
   *
   *   Step 3: Push index 0
   *     Deque: [0]  (values: [1])
   *
   *   Step 4: i=0 >= k-1=2? NO
   *     Window not complete yet
   *
   *   Visual:
   *     nums:  [1]  3  -1  -3   5   3   6   7
   *            ───
   *     Deque: [0] → values: [1]
   *
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * i=1, nums[1]=3:
   *   Window bounds: [1-3+1, 1] = [-1, 1] → effectively [0, 1]
   *
   *   Step 1: Check front out of bounds
   *     deque[0]=0 < -1? NO, keep it
   *
   *   Step 2: Remove smaller from back
   *     nums[deque[0]]=nums[0]=1 < nums[1]=3? YES!
   *     Pop 0 → Deque: []
   *     Deque empty, stop
   *
   *   Step 3: Push index 1
   *     Deque: [1]  (values: [3])
   *
   *   Step 4: i=1 >= k-1=2? NO
   *     Window not complete yet
   *
   *   Visual:
   *     nums:  [1   3] -1  -3   5   3   6   7
   *            ───────
   *     Deque: [1] → values: [3]
   *     (1 was removed because 3 > 1)
   *
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * i=2, nums[2]=-1:
   *   Window bounds: [2-3+1, 2] = [0, 2]
   *
   *   Step 1: Check front out of bounds
   *     deque[0]=1 < 0? NO, keep it
   *
   *   Step 2: Remove smaller from back
   *     nums[deque[0]]=nums[1]=3 < nums[2]=-1? NO
   *     Stop (3 > -1)
   *
   *   Step 3: Push index 2
   *     Deque: [1, 2]  (values: [3, -1])
   *
   *   Step 4: i=2 >= k-1=2? YES!
   *     First complete window!
   *     max = nums[deque[0]] = nums[1] = 3 ✓
   *     Result: [3]
   *
   *   Visual:
   *     nums:  [1   3  -1] -3   5   3   6   7
   *            ──────────
   *     Deque: [1, 2] → values: [3, -1]
   *     Front = 3 (maximum)
   *
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * i=3, nums[3]=-3:
   *   Window bounds: [3-3+1, 3] = [1, 3]
   *
   *   Step 1: Check front out of bounds
   *     deque[0]=1 < 1? NO, keep it (index 1 is still valid!)
   *
   *   Step 2: Remove smaller from back
   *     nums[deque[1]]=nums[2]=-1 < nums[3]=-3? NO
   *     Stop (-1 > -3)
   *
   *   Step 3: Push index 3
   *     Deque: [1, 2, 3]  (values: [3, -1, -3])
   *
   *   Step 4: i=3 >= 2? YES
   *     max = nums[deque[0]] = nums[1] = 3 ✓
   *     Result: [3, 3]
   *
   *   Visual:
   *     nums:   1  [3  -1  -3]  5   3   6   7
   *               ────────────
   *     Deque: [1, 2, 3] → values: [3, -1, -3]
   *     Front = 3 (maximum)
   *
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * i=4, nums[4]=5:
   *   Window bounds: [4-3+1, 4] = [2, 4]
   *
   *   Step 1: Check front out of bounds
   *     deque[0]=1 < 2? YES! Remove it!
   *     Deque: [2, 3]
   *     deque[0]=2 < 2? NO, keep it
   *
   *   Step 2: Remove smaller from back
   *     nums[deque[1]]=nums[3]=-3 < nums[4]=5? YES! Pop 3
   *     Deque: [2]
   *     nums[deque[0]]=nums[2]=-1 < nums[4]=5? YES! Pop 2
   *     Deque: []
   *     Empty, stop
   *
   *   Step 3: Push index 4
   *     Deque: [4]  (values: [5])
   *
   *   Step 4: i=4 >= 2? YES
   *     max = nums[deque[0]] = nums[4] = 5 ✓
   *     Result: [3, 3, 5]
   *
   *   Visual:
   *     nums:   1   3  [-1  -3   5]  3   6   7
   *                   ─────────────
   *     Deque: [4] → values: [5]
   *     (All previous elements < 5 were removed!)
   *
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * i=5, nums[5]=3:
   *   Window bounds: [5-3+1, 5] = [3, 5]
   *
   *   Step 1: Check front out of bounds
   *     deque[0]=4 < 3? NO, keep it
   *
   *   Step 2: Remove smaller from back
   *     nums[deque[0]]=nums[4]=5 < nums[5]=3? NO
   *     Stop (5 > 3)
   *
   *   Step 3: Push index 5
   *     Deque: [4, 5]  (values: [5, 3])
   *
   *   Step 4: i=5 >= 2? YES
   *     max = nums[deque[0]] = nums[4] = 5 ✓
   *     Result: [3, 3, 5, 5]
   *
   *   Visual:
   *     nums:   1   3  -1  [-3   5   3]  6   7
   *                      ──────────────
   *     Deque: [4, 5] → values: [5, 3]
   *     3 is kept as "backup max" in case 5 slides out
   *
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * i=6, nums[6]=6:
   *   Window bounds: [6-3+1, 6] = [4, 6]
   *
   *   Step 1: Check front out of bounds
   *     deque[0]=4 < 4? NO, keep it
   *
   *   Step 2: Remove smaller from back
   *     nums[deque[1]]=nums[5]=3 < nums[6]=6? YES! Pop 5
   *     Deque: [4]
   *     nums[deque[0]]=nums[4]=5 < nums[6]=6? YES! Pop 4
   *     Deque: []
   *     Empty, stop
   *
   *   Step 3: Push index 6
   *     Deque: [6]  (values: [6])
   *
   *   Step 4: i=6 >= 2? YES
   *     max = nums[deque[0]] = nums[6] = 6 ✓
   *     Result: [3, 3, 5, 5, 6]
   *
   *   Visual:
   *     nums:   1   3  -1  -3  [5   3   6]  7
   *                           ────────────
   *     Deque: [6] → values: [6]
   *
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * i=7, nums[7]=7:
   *   Window bounds: [7-3+1, 7] = [5, 7]
   *
   *   Step 1: Check front out of bounds
   *     deque[0]=6 < 5? NO, keep it
   *
   *   Step 2: Remove smaller from back
   *     nums[deque[0]]=nums[6]=6 < nums[7]=7? YES! Pop 6
   *     Deque: []
   *     Empty, stop
   *
   *   Step 3: Push index 7
   *     Deque: [7]  (values: [7])
   *
   *   Step 4: i=7 >= 2? YES
   *     max = nums[deque[0]] = nums[7] = 7 ✓
   *     Result: [3, 3, 5, 5, 6, 7]
   *
   *   Visual:
   *     nums:   1   3  -1  -3   5  [3   6   7]
   *                              ────────────
   *     Deque: [7] → values: [7]
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: [3, 3, 5, 5, 6, 7] ✓
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(n) TIME?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Even though we have while loops inside the for loop:
   *
   * - Each element is PUSHED to deque exactly ONCE
   * - Each element is POPPED from deque at most ONCE
   * - Each element is SHIFTED from deque at most ONCE
   *
   * Total operations across ALL iterations:
   *   Pushes:  n
   *   Pops:    ≤ n
   *   Shifts:  ≤ n
   *   Total:   ≤ 3n = O(n)
   *
   * This is called "amortized O(1)" per operation!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY MONOTONIC DECREASING?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * We want MAXIMUM, so largest should be at FRONT.
   *
   * Deque: [5, 3, 2]  (decreasing order)
   *         ↑
   *       Front = Maximum
   *
   * If 5 slides out of window, 3 becomes the new maximum.
   * We have "backup maximums" ready!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY STORE INDICES?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * We need to check if maximum is still INSIDE the window!
   *
   * Window: [2, 3, 4] (indices 2 to 4)
   *
   * If deque front has index 1, it's OUTSIDE window!
   * Must remove it, even if it has the largest value.
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DEQUE OPERATIONS SUMMARY
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌──────────────────┬─────────────────────┬─────────────────────────────┐
   * │    Operation     │        When         │            Why              │
   * ├──────────────────┼─────────────────────┼─────────────────────────────┤
   * │  shift()         │ Front index < i-k+1 │ Element out of window       │
   * │  (remove front)  │                     │                             │
   * ├──────────────────┼─────────────────────┼─────────────────────────────┤
   * │  pop()           │ Back value < new    │ Smaller elements will       │
   * │  (remove back)   │ element value       │ never be maximum            │
   * ├──────────────────┼─────────────────────┼─────────────────────────────┤
   * │  push()          │ Always (after pops) │ New element might be        │
   * │  (add to back)   │                     │ future maximum              │
   * ├──────────────────┼─────────────────────┼─────────────────────────────┤
   * │  deque[0]        │ When i >= k-1       │ Front always has current    │
   * │  (read front)    │ (complete window)   │ maximum                     │
   * └──────────────────┴─────────────────────┴─────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. k = 1: Each element is its own window
   *    Every element goes in and out, no removals for "smaller"
   *
   * 2. Strictly decreasing [5,4,3,2,1], k=3:
   *    Deque fills up, front keeps sliding out
   *    Each window's max is the first element
   *
   * 3. Strictly increasing [1,2,3,4,5], k=3:
   *    Each new element removes all previous
   *    Deque always has single element
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      '🧪 Testing Sliding Window Maximum - OPTIMAL (Monotonic Deque)\n'
    );

    const tests: Array<{
      nums: number[];
      k: number;
      expected: number[];
      description: string;
    }> = [
      {
        nums: [1, 3, -1, -3, 5, 3, 6, 7],
        k: 3,
        expected: [3, 3, 5, 5, 6, 7],
        description: 'LeetCode Example 1',
      },
      {
        nums: [1],
        k: 1,
        expected: [1],
        description: 'Single element',
      },
      {
        nums: [9, 11],
        k: 2,
        expected: [11],
        description: 'Two elements, window = 2',
      },
      {
        nums: [4, 3, 2, 1],
        k: 2,
        expected: [4, 3, 2],
        description: 'Strictly decreasing',
      },
      {
        nums: [1, 2, 3, 4],
        k: 2,
        expected: [2, 3, 4],
        description: 'Strictly increasing',
      },
      {
        nums: [3, 3, 3, 3],
        k: 2,
        expected: [3, 3, 3],
        description: 'All same elements',
      },
      {
        nums: [1, 3, 1, 2, 0, 5],
        k: 3,
        expected: [3, 3, 2, 5],
        description: 'Mixed values',
      },
      {
        nums: [7, 2, 4],
        k: 2,
        expected: [7, 4],
        description: 'Peak at start',
      },
      {
        nums: [1, -1],
        k: 1,
        expected: [1, -1],
        description: 'Window size 1',
      },
      {
        nums: [5, 4, 3, 2, 1],
        k: 5,
        expected: [5],
        description: 'Window = array length',
      },
      {
        nums: [-7, -8, 7, 5, 7, 1, 6, 0],
        k: 4,
        expected: [7, 7, 7, 7, 7],
        description: 'Negative and positive',
      },
      {
        nums: [1, 3, -1, -3, 5, 3, 6, 7],
        k: 1,
        expected: [1, 3, -1, -3, 5, 3, 6, 7],
        description: 'k=1 returns original array',
      },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
      const result = maxSlidingWindow(test.nums, test.k);
      const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);
      const status = isEqual ? '✅ PASS' : '❌ FAIL';

      if (isEqual) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Description: ${test.description}`);
      console.log(
        `  Input:       nums = [${test.nums.join(', ')}], k = ${test.k}`
      );
      console.log(`  Expected:    [${test.expected.join(', ')}]`);
      console.log(`  Got:         [${result.join(', ')}]`);
      console.log();
    });

    console.log(
      '═══════════════════════════════════════════════════════════════'
    );
    console.log(`Total Tests: ${tests.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(
      '═══════════════════════════════════════════════════════════════\n'
    );

    if (failed === 0) {
      console.log('🎉 All tests passed! Monotonic Deque mastered! 🚀\n');
    }
  }
}

// Execute tests
SlidingWindowMaxOptimal.runTests();