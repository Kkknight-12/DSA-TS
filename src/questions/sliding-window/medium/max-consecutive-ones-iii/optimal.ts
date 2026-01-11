/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MAX CONSECUTIVE ONES III - SLIDING WINDOW
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Find max consecutive 1s if you can flip at most k zeros
 *
 * Key Insight: REFRAME THE PROBLEM!
 * ─────────────────────────────────────────────────────────────────────────────
 * DON'T think: "Flip k zeros to 1s"
 * DO think:    "Find longest window with at most k zeros"
 *
 * WHY? If window has ≤k zeros, we CAN flip them all to 1s!
 * So window length = max consecutive 1s possible
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Approach: Sliding Window
 * - Expand window by moving right pointer
 * - Count zeros in window
 * - If zeros > k, shrink from left until valid
 * - Track maximum window size
 *
 * Time Complexity: O(n) - each element visited at most twice
 * Space Complexity: O(1) - only using a few variables
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace MaxConsecutiveOnesIII {
  /**
   * Find maximum consecutive 1s with at most k flips
   *
   * @param nums - Binary array (only 0s and 1s)
   * @param k - Maximum number of 0s we can flip to 1s
   * @returns Maximum length of consecutive 1s achievable
   */
  function longestOnes(nums: number[], k: number): number {
    // ═══════════════════════════════════════════════════════════════
    // VARIABLES
    // ═══════════════════════════════════════════════════════════════

    // Left pointer of sliding window
    let left = 0;

    // Count of zeros in current window
    // WHY track zeros? Window is valid only if zeros <= k
    let zeroCount = 0;

    // Track maximum valid window length
    let maxLength = 0;

    // ═══════════════════════════════════════════════════════════════
    // SLIDING WINDOW: Iterate with right pointer
    // ═══════════════════════════════════════════════════════════════

    for (let right = 0; right < nums.length; right++) {
      // ─────────────────────────────────────────────────────────────
      // STEP 1: EXPAND - Add current element to window
      // ─────────────────────────────────────────────────────────────
      // If current element is 0, increment zero count
      // WHY: We need to track how many zeros are in our window
      if (nums[right] === 0) {
        zeroCount++;
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 2: SHRINK - Remove elements until window is valid
      // ─────────────────────────────────────────────────────────────
      // While we have more zeros than allowed (k), shrink window
      // WHY: Window with >k zeros is invalid (can't flip all to 1s)
      while (zeroCount > k) {
        // If element being removed is a zero, decrement count
        if (nums[left] === 0) {
          zeroCount--;
        }
        // Move left pointer forward (shrink window)
        left++;
      }

      // ─────────────────────────────────────────────────────────────
      // STEP 3: UPDATE - Track maximum valid window size
      // ─────────────────────────────────────────────────────────────
      // Window size = right - left + 1
      // WHY: This window has ≤k zeros, so we can flip all to 1s
      //      Window length = max consecutive 1s possible here
      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
   *          Index:  0 1 2 3 4 5 6 7 8 9 10
   *
   * Initial: left = 0, zeroCount = 0, maxLength = 0
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION BY ITERATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────
   * right = 0, nums[0] = 1
   * ─────────────────────────────────────────
   *   EXPAND: nums[0]=1, not a zero → zeroCount = 0
   *   SHRINK: zeroCount(0) <= k(2) ✅ No shrink needed
   *   UPDATE: maxLength = max(0, 0-0+1) = 1
   *
   *   Window: [1] 1 1 0 0 0 1 1 1 1 0
   *            L
   *            R
   *   Zeros in window: 0
   *
   * ─────────────────────────────────────────
   * right = 1, nums[1] = 1
   * ─────────────────────────────────────────
   *   EXPAND: nums[1]=1 → zeroCount = 0
   *   SHRINK: 0 <= 2 ✅
   *   UPDATE: maxLength = max(1, 1-0+1) = 2
   *
   *   Window: [1 1] 1 0 0 0 1 1 1 1 0
   *            L R
   *
   * ─────────────────────────────────────────
   * right = 2, nums[2] = 1
   * ─────────────────────────────────────────
   *   EXPAND: nums[2]=1 → zeroCount = 0
   *   SHRINK: 0 <= 2 ✅
   *   UPDATE: maxLength = max(2, 2-0+1) = 3
   *
   *   Window: [1 1 1] 0 0 0 1 1 1 1 0
   *            L   R
   *
   * ─────────────────────────────────────────
   * right = 3, nums[3] = 0 ← First zero!
   * ─────────────────────────────────────────
   *   EXPAND: nums[3]=0 → zeroCount = 1
   *   SHRINK: 1 <= 2 ✅
   *   UPDATE: maxLength = max(3, 3-0+1) = 4
   *
   *   Window: [1 1 1 0] 0 0 1 1 1 1 0
   *            L     R
   *   Zeros in window: 1 (can flip this one)
   *
   * ─────────────────────────────────────────
   * right = 4, nums[4] = 0 ← Second zero
   * ─────────────────────────────────────────
   *   EXPAND: nums[4]=0 → zeroCount = 2
   *   SHRINK: 2 <= 2 ✅
   *   UPDATE: maxLength = max(4, 4-0+1) = 5
   *
   *   Window: [1 1 1 0 0] 0 1 1 1 1 0
   *            L       R
   *   Zeros in window: 2 (can flip both!)
   *
   * ─────────────────────────────────────────
   * right = 5, nums[5] = 0 ← Third zero! TOO MANY!
   * ─────────────────────────────────────────
   *   EXPAND: nums[5]=0 → zeroCount = 3
   *   SHRINK: 3 > 2 ❌ Must shrink!
   *
   *   ┌─────────────────────────────────────────────┐
   *   │ SHRINKING PROCESS:                          │
   *   │                                             │
   *   │ Iteration 1:                                │
   *   │   nums[left=0] = 1 (not a zero)            │
   *   │   zeroCount stays 3                         │
   *   │   left = 1                                  │
   *   │   3 > 2? YES, continue shrinking           │
   *   │                                             │
   *   │ Iteration 2:                                │
   *   │   nums[left=1] = 1 (not a zero)            │
   *   │   zeroCount stays 3                         │
   *   │   left = 2                                  │
   *   │   3 > 2? YES, continue shrinking           │
   *   │                                             │
   *   │ Iteration 3:                                │
   *   │   nums[left=2] = 1 (not a zero)            │
   *   │   zeroCount stays 3                         │
   *   │   left = 3                                  │
   *   │   3 > 2? YES, continue shrinking           │
   *   │                                             │
   *   │ Iteration 4:                                │
   *   │   nums[left=3] = 0 (IT'S A ZERO!)          │
   *   │   zeroCount = 3 - 1 = 2                     │
   *   │   left = 4                                  │
   *   │   2 > 2? NO, stop shrinking ✅              │
   *   └─────────────────────────────────────────────┘
   *
   *   UPDATE: maxLength = max(5, 5-4+1) = 5
   *
   *   Window: 1 1 1 0 [0 0] 1 1 1 1 0
   *                    L R
   *   Zeros in window: 2
   *
   * ─────────────────────────────────────────
   * right = 6, nums[6] = 1
   * ─────────────────────────────────────────
   *   EXPAND: nums[6]=1 → zeroCount = 2
   *   SHRINK: 2 <= 2 ✅
   *   UPDATE: maxLength = max(5, 6-4+1) = 5
   *
   *   Window: 1 1 1 0 [0 0 1] 1 1 1 0
   *                    L   R
   *
   * ─────────────────────────────────────────
   * right = 7, nums[7] = 1
   * ─────────────────────────────────────────
   *   EXPAND: nums[7]=1 → zeroCount = 2
   *   SHRINK: 2 <= 2 ✅
   *   UPDATE: maxLength = max(5, 7-4+1) = 5
   *
   *   Window: 1 1 1 0 [0 0 1 1] 1 1 0
   *                    L     R
   *
   * ─────────────────────────────────────────
   * right = 8, nums[8] = 1
   * ─────────────────────────────────────────
   *   EXPAND: nums[8]=1 → zeroCount = 2
   *   SHRINK: 2 <= 2 ✅
   *   UPDATE: maxLength = max(5, 8-4+1) = 5
   *
   *   Window: 1 1 1 0 [0 0 1 1 1] 1 0
   *                    L       R
   *
   * ─────────────────────────────────────────
   * right = 9, nums[9] = 1
   * ─────────────────────────────────────────
   *   EXPAND: nums[9]=1 → zeroCount = 2
   *   SHRINK: 2 <= 2 ✅
   *   UPDATE: maxLength = max(5, 9-4+1) = 6 ⭐
   *
   *   Window: 1 1 1 0 [0 0 1 1 1 1] 0
   *                    L         R
   *   This is our best window! 6 elements with 2 zeros.
   *   Flip both zeros → 6 consecutive 1s!
   *
   * ─────────────────────────────────────────
   * right = 10, nums[10] = 0 ← Another zero!
   * ─────────────────────────────────────────
   *   EXPAND: nums[10]=0 → zeroCount = 3
   *   SHRINK: 3 > 2 ❌ Must shrink!
   *
   *   nums[left=4] = 0 (it's a zero!)
   *   zeroCount = 3 - 1 = 2
   *   left = 5
   *   2 > 2? NO ✅
   *
   *   UPDATE: maxLength = max(6, 10-5+1) = 6
   *
   *   Window: 1 1 1 0 0 [0 1 1 1 1 0]
   *                      L         R
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT: maxLength = 6
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Best window found: [0 0 1 1 1 1] at indices 4-9
   * Flip the 2 zeros → [1 1 1 1 1 1] = 6 consecutive 1s!
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. All 1s: [1,1,1,1], k=2
   *    → Answer = 4 (entire array, no flips needed)
   *
   * 2. All 0s: [0,0,0,0], k=2
   *    → Answer = 2 (can only flip k zeros)
   *
   * 3. k = 0: [1,0,1,1,0,1], k=0
   *    → Answer = 2 (longest consecutive 1s without flipping)
   *
   * 4. k >= number of zeros: [1,0,1,0,1], k=5
   *    → Answer = 5 (can flip all zeros, entire array becomes 1s)
   *
   * 5. Single element: [1], k=1 → Answer = 1
   *                    [0], k=1 → Answer = 1 (flip it)
   *                    [0], k=0 → Answer = 0 (can't flip)
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(n) TIME COMPLEXITY?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Each element is processed at most TWICE:
   *   - Once when right pointer reaches it (expand)
   *   - Once when left pointer passes it (shrink)
   *
   * Left pointer never moves backward!
   * Right pointer never moves backward!
   *
   * Total operations: 2n = O(n)
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Max Consecutive Ones III - SLIDING WINDOW\n');
    console.log('═'.repeat(60) + '\n');

    const testCases: {
      nums: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        k: 2,
        expected: 6,
        description: 'Example 1 - flip 2 zeros',
      },
      {
        nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
        k: 3,
        expected: 10,
        description: 'Example 2 - flip 3 zeros',
      },

      // Edge cases
      {
        nums: [1, 1, 1, 1],
        k: 2,
        expected: 4,
        description: 'All 1s - no flips needed',
      },
      {
        nums: [0, 0, 0, 0],
        k: 2,
        expected: 2,
        description: 'All 0s - can only flip k',
      },
      {
        nums: [0, 0, 0, 0],
        k: 4,
        expected: 4,
        description: 'All 0s - k equals length',
      },
      {
        nums: [1, 0, 1, 1, 0, 1],
        k: 0,
        expected: 2,
        description: 'k=0 - find longest consecutive 1s',
      },
      {
        nums: [1, 0, 1, 0, 1],
        k: 5,
        expected: 5,
        description: 'k >= zeros - entire array',
      },

      // Single element
      {
        nums: [1],
        k: 1,
        expected: 1,
        description: 'Single 1',
      },
      {
        nums: [0],
        k: 1,
        expected: 1,
        description: 'Single 0 with k=1 - flip it',
      },
      {
        nums: [0],
        k: 0,
        expected: 0,
        description: "Single 0 with k=0 - can't flip",
      },

      // More complex cases
      {
        nums: [1, 1, 0, 0, 1, 1, 1, 0, 1],
        k: 1,
        expected: 5,
        description: 'Optimal window in middle',
      },
      {
        nums: [0, 1, 1, 1, 0],
        k: 1,
        expected: 4,
        description: 'Window at start or end',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { nums, k, expected, description } = testCases[i];
      const result = longestOnes(nums, k);
      const status = result === expected ? '✅ PASS' : '❌ FAIL';

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${i + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: nums = [${nums}], k = ${k}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    }

    console.log('═'.repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log(
        '🎉 All tests passed! Sliding Window pattern samajh aa gaya! 🚀'
      );
      console.log('📊 Complexity: Time O(n), Space O(1)');
      console.log(
        '\n💡 Key insight: Find longest window with at most k zeros!'
      );
    }
  }
}

// Execute tests
MaxConsecutiveOnesIII.runTests();