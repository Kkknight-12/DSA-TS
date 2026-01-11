/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * COUNT NUMBER OF NICE SUBARRAYS - BRUTE FORCE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Problem: Count subarrays with exactly k odd numbers
 *
 * Key Insight: THIS IS "BINARY SUBARRAYS WITH SUM" IN DISGUISE!
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   ┌────────────────────────────────────────────────────────────────────────┐
 *   │  TRANSFORMATION:                                                       │
 *   │                                                                        │
 *   │  Odd number  → treat as 1                                              │
 *   │  Even number → treat as 0                                              │
 *   │                                                                        │
 *   │  "Count subarrays with k odd numbers"                                  │
 *   │  = "Count subarrays with sum = k" (in binary form)                     │
 *   │                                                                        │
 *   │  We don't actually need to create new array!                           │
 *   │  Just use (num % 2) to check if odd: 1 if odd, 0 if even               │
 *   └────────────────────────────────────────────────────────────────────────┘
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Approach: Brute Force - Check ALL possible subarrays
 * - For each starting position i
 * - Try all ending positions j (from i to end)
 * - Track running count of odd numbers
 * - If oddCount == k, increment result
 * - If oddCount > k, break (optimization)
 *
 * Time Complexity: O(n²) - nested loops
 * Space Complexity: O(1) - only using variables
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

namespace CountNiceSubarraysBruteForce {
  /**
   * Count nice subarrays (subarrays with exactly k odd numbers) - BRUTE FORCE
   *
   * @param nums - Array of integers
   * @param k - Target number of odd numbers
   * @returns Number of nice subarrays
   */
  function numberOfSubarrays(nums: number[], k: number): number {
    let count = 0;

    // ═══════════════════════════════════════════════════════════════
    // OUTER LOOP: Try each starting position
    // ═══════════════════════════════════════════════════════════════

    for (let i = 0; i < nums.length; i++) {
      // Track running count of odd numbers for current starting position
      // Reset for each new starting position
      let oddCount = 0;

      // ═══════════════════════════════════════════════════════════════
      // INNER LOOP: Try each ending position
      // ═══════════════════════════════════════════════════════════════

      for (let j = i; j < nums.length; j++) {
        // ─────────────────────────────────────────────────────────────
        // STEP 1: Check if current element is odd
        // ─────────────────────────────────────────────────────────────
        //
        // ┌────────────────────────────────────────────────────────────┐
        // │  HOW TO CHECK ODD?                                         │
        // │                                                            │
        // │  Method 1: num % 2 === 1  (remainder when divided by 2)    │
        // │  Method 2: num & 1 === 1  (bitwise AND - faster)           │
        // │                                                            │
        // │  Both work! We'll use % 2 for clarity.                     │
        // │                                                            │
        // │  Examples:                                                 │
        // │    5 % 2 = 1 (odd)                                         │
        // │    4 % 2 = 0 (even)                                        │
        // │    7 % 2 = 1 (odd)                                         │
        // │    10 % 2 = 0 (even)                                       │
        // └────────────────────────────────────────────────────────────┘

        if (nums[j] % 2 === 1) {
          oddCount++;
        }

        // ─────────────────────────────────────────────────────────────
        // STEP 2: Check if oddCount equals k
        // ─────────────────────────────────────────────────────────────
        if (oddCount === k) {
          // Found a nice subarray! Increment count
          count++;
        }

        // ─────────────────────────────────────────────────────────────
        // STEP 3: Optimization - Break if oddCount exceeds k
        // ─────────────────────────────────────────────────────────────
        //
        // ┌────────────────────────────────────────────────────────────┐
        // │  WHY CAN WE BREAK?                                         │
        // │                                                            │
        // │  If oddCount > k:                                          │
        // │  - Adding more elements can only ADD odd numbers           │
        // │  - oddCount can only INCREASE or STAY SAME                 │
        // │  - It can NEVER decrease back to k!                        │
        // │                                                            │
        // │  So we can safely break and try next starting position.    │
        // │                                                            │
        // │  IMPORTANT: We do NOT break when oddCount === k!           │
        // │  WHY? Because there might be even numbers ahead!           │
        // │                                                            │
        // │  Example: nums = [1,2,2,1], k = 1                          │
        // │    i=0, j=0: oddCount=1 ✅ count++                         │
        // │    i=0, j=1: oddCount=1 ✅ count++ (added even, no change!)│
        // │    i=0, j=2: oddCount=1 ✅ count++ (added even, no change!)│
        // │    i=0, j=3: oddCount=2 > 1, NOW break                     │
        // │                                                            │
        // │  Even numbers let us extend subarray while keeping same k! │
        // └────────────────────────────────────────────────────────────┘

        if (oddCount > k) {
          break;
        }
      }
    }

    return count;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example 1: nums = [1, 1, 2, 1, 1], k = 3
   *            Index:  0  1  2  3  4
   *            Odd?:   ✓  ✓  ✗  ✓  ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 0 (Start from index 0)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=0: nums[0]=1 (odd), oddCount = 1, oddCount != 3, continue
   *      Subarray: [1]
   *
   * j=1: nums[1]=1 (odd), oddCount = 2, oddCount != 3, continue
   *      Subarray: [1, 1]
   *
   * j=2: nums[2]=2 (even), oddCount = 2, oddCount != 3, continue
   *      Subarray: [1, 1, 2]
   *
   * j=3: nums[3]=1 (odd), oddCount = 3, oddCount == 3 ✅ count = 1
   *      Subarray: [1, 1, 2, 1] ← Found!
   *
   * j=4: nums[4]=1 (odd), oddCount = 4, oddCount > 3, BREAK!
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 1 (Start from index 1)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=1: nums[1]=1 (odd), oddCount = 1, oddCount != 3, continue
   * j=2: nums[2]=2 (even), oddCount = 1, oddCount != 3, continue
   * j=3: nums[3]=1 (odd), oddCount = 2, oddCount != 3, continue
   * j=4: nums[4]=1 (odd), oddCount = 3, oddCount == 3 ✅ count = 2
   *      Subarray: [1, 2, 1, 1] ← Found!
   *      (end of array)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 2 (Start from index 2)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * j=2: nums[2]=2 (even), oddCount = 0, continue
   * j=3: nums[3]=1 (odd), oddCount = 1, continue
   * j=4: nums[4]=1 (odd), oddCount = 2, continue
   * (end of array, only 2 odd numbers from index 2)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * i = 3, 4 (Not enough elements for 3 odd numbers)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * FINAL RESULT: count = 2
   *
   * The 2 nice subarrays with 3 odd numbers:
   * 1. [1, 1, 2, 1] indices 0-3
   * 2. [1, 2, 1, 1] indices 1-4
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN 2: nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2], k = 2
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Index: 0  1  2  3  4  5  6  7  8  9
   * Odd?:  ✗  ✗  ✗  ✓  ✗  ✗  ✓  ✗  ✗  ✗
   *
   * Odd numbers are at indices 3 and 6.
   *
   * For a valid subarray with k=2 odd numbers:
   * - MUST include both indices 3 and 6
   * - Can start anywhere from 0 to 3 (4 choices: 0,1,2,3)
   * - Can end anywhere from 6 to 9 (4 choices: 6,7,8,9)
   *
   * Let's trace some key iterations:
   *
   * i=0: Can extend right through even numbers
   *   j=3: oddCount=1
   *   j=6: oddCount=2 ✅ count++
   *   j=7: oddCount=2 ✅ count++ (7 is even!)
   *   j=8: oddCount=2 ✅ count++
   *   j=9: oddCount=2 ✅ count++
   *   → 4 subarrays starting at i=0
   *
   * i=1: Same pattern
   *   → 4 subarrays starting at i=1
   *
   * i=2: Same pattern
   *   → 4 subarrays starting at i=2
   *
   * i=3: Same pattern
   *   → 4 subarrays starting at i=3
   *
   * Total = 4 + 4 + 4 + 4 = 16 ✅
   *
   * ┌────────────────────────────────────────────────────────────────┐
   * │  PATTERN INSIGHT:                                              │
   * │                                                                │
   * │  For k=2, we need exactly 2 odd numbers.                       │
   * │  Odd numbers are at positions 3 and 6.                         │
   * │                                                                │
   * │  Left boundary: Can be 0, 1, 2, or 3 (4 positions)             │
   * │  Right boundary: Can be 6, 7, 8, or 9 (4 positions)            │
   * │                                                                │
   * │  Total = leftChoices × rightChoices = 4 × 4 = 16               │
   * │                                                                │
   * │  This is the "multiplication principle"!                       │
   * └────────────────────────────────────────────────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN 3: nums = [2, 4, 6], k = 1
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * All numbers are even! No odd numbers at all.
   *
   * i=0: oddCount never reaches 1
   * i=1: oddCount never reaches 1
   * i=2: oddCount never reaches 1
   *
   * FINAL: count = 0 ✅
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY O(n²)?
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Outer loop: n starting positions           → O(n)
   * Inner loop: up to n ending positions each  → O(n)
   *                                            ─────────
   * Total:                                       O(n²)
   *
   * The break optimization helps in practice but worst case
   * (like all odd numbers with large k) still requires checking many pairs.
   *
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * CONNECTION TO BINARY SUBARRAYS WITH SUM
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌────────────────────────────────────────────────────────────────┐
   * │  Binary Subarrays:     Nice Subarrays:                        │
   * │  ─────────────────     ─────────────────                      │
   * │  nums has 0s and 1s    nums has any integers                  │
   * │  count sum = goal      count odd numbers = k                   │
   * │                                                                │
   * │  SAME LOGIC:                                                   │
   * │  Binary: sum += nums[j]     (adds 0 or 1)                      │
   * │  Nice:   oddCount += (nums[j] % 2)  (adds 0 or 1)             │
   * │                                                                │
   * │  Both are counting "1s" in different forms!                    │
   * └────────────────────────────────────────────────────────────────┘
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Count Nice Subarrays - BRUTE FORCE\n');
    console.log('═'.repeat(60) + '\n');

    const testCases: {
      nums: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      // Examples from problem
      {
        nums: [1, 1, 2, 1, 1],
        k: 3,
        expected: 2,
        description: 'Example 1 - basic case',
      },
      {
        nums: [2, 4, 6],
        k: 1,
        expected: 0,
        description: 'Example 2 - all even numbers',
      },
      {
        nums: [2, 2, 2, 1, 2, 2, 1, 2, 2, 2],
        k: 2,
        expected: 16,
        description: 'Example 3 - evens padding both sides',
      },

      // Edge cases
      {
        nums: [1],
        k: 1,
        expected: 1,
        description: 'Single odd element',
      },
      {
        nums: [2],
        k: 1,
        expected: 0,
        description: 'Single even element',
      },
      {
        nums: [1, 1, 1],
        k: 1,
        expected: 3,
        description: 'All odd, k=1',
      },
      {
        nums: [1, 1, 1],
        k: 2,
        expected: 2,
        description: 'All odd, k=2',
      },
      {
        nums: [1, 1, 1],
        k: 3,
        expected: 1,
        description: 'All odd, k=3',
      },

      // Even numbers extending
      {
        nums: [2, 1, 2],
        k: 1,
        expected: 4,
        description: 'One odd with even padding (2×2=4)',
      },
      {
        nums: [2, 2, 1, 2, 2],
        k: 1,
        expected: 9,
        description: 'One odd, many evens (3×3=9)',
      },

      // Mixed cases
      {
        nums: [1, 2, 1, 2, 1],
        k: 2,
        expected: 4,
        description: 'Alternating odd-even',
      },
      {
        nums: [2, 1, 2, 1, 2],
        k: 2,
        expected: 4,
        description: 'Evens around two odds',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { nums, k, expected, description } = testCases[i];
      const result = numberOfSubarrays(nums, k);
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
      console.log('🎉 All tests passed! Brute Force samajh aa gaya! 🚀');
      console.log('📊 Complexity: Time O(n²), Space O(1)');
      console.log('\n💡 Key Insight: Same as Binary Subarrays With Sum!');
      console.log('💡 Odd number → 1, Even number → 0');
      console.log('⚠️  Note: Sliding Window is O(n) - more optimal!');
    }
  }
}

// Execute tests
CountNiceSubarraysBruteForce.runTests();