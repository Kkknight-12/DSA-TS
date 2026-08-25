/**
 * ============================================================================
 * LEETCODE 15: 3SUM (OPTIMAL SORTING + DUAL POINTER SCANNING WITH PRUNING)
 * ============================================================================
 * 
 * 🧠 Core DSA Intuition ("WHY Rule"):
 * -----------------------------------
 * Problem asks us to find all unique triplets [nums[i], nums[j], nums[k]] such that
 * nums[i] + nums[j] + nums[k] === 0, without any duplicate triplet arrays.
 * 
 * 1. Sorting the array beforehand (`nums.sort((a, b) => a - b)`):
 *    - Puts duplicate values adjacent to each other for O(1) duplicate skipping.
 *    - Enables 2-pointer two-sum scanning in O(N) per anchor.
 * 
 * 2. Elite Pruning Optimizations:
 *    - Early Termination: `nums[i] + nums[i+1] + nums[i+2] > 0` → If smallest 3 elements sum > 0,
 *      no 3 numbers after `i` can ever sum to 0. Instant BREAK!
 *    - Early Anchor Skip: `nums[i] + nums[n-2] + nums[n-1] < 0` → If `nums[i]` plus the TWO LARGEST
 *      elements in the entire array is still < 0, this anchor `i` can NEVER reach 0. Instant CONTINUE!
 * 
 * 3. Two Pointers (`left = i + 1`, `right = n - 1`):
 *    - `sum < 0` → `left++` (Need bigger number)
 *    - `sum > 0` → `right--` (Need smaller number)
 *    - `sum === 0` → Record triplet, skip identical `left` & `right` values, then move both inward (`left++`, `right--`).
 * 
 * ----------------------------------------------------------------------------
 * ⏱️ Time Complexity:  O(N log N + N^2) = O(N^2)
 * 💾 Space Complexity: O(1) auxiliary space (excluding returned result array).
 * ============================================================================
 */

export namespace ThreeSumOptimal {
  /**
   * Finds all unique triplets in the array which give the sum of zero.
   * @param nums Input array of integers
   * @returns Array of unique triplet arrays
   */
  export function threeSum(nums: number[]): number[][] {
    const n = nums.length;
    // Edge case: 3 se kam elements me triplet possible nahi
    if (n < 3) return [];

    // Step 1: Sort the array in ascending order
    nums.sort((a, b) => a - b);

    const result: number[][] = [];

    // Step 2: Fix first element with i
    for (let i = 0; i < n - 2; i++) {
      // Skip duplicates for i
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      // Early termination: agar smallest three elements ka sum > 0
      // toh aage koi bhi triplet sum = 0 nahi de sakta
      if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;

      // Early skip: agar nums[i] + two largest < 0
      // toh is i ke saath koi triplet possible nahi
      if (nums[i] + nums[n - 2] + nums[n - 1] < 0) continue;

      // Step 3: Two pointers for remaining two elements
      let left = i + 1;
      let right = n - 1;

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];

        if (sum < 0) {
          // Sum chhota hai → bigger value chahiye → left aage badhao
          left++;
        } else if (sum > 0) {
          // Sum bada hai → smaller value chahiye → right peeche lao
          right--;
        } else {
          // sum === 0 → Triplet found!
          result.push([nums[i], nums[left], nums[right]]);

          // Skip duplicate lefts
          while (left < right && nums[left] === nums[left + 1]) left++;

          // Skip duplicate rights
          while (left < right && nums[right] === nums[right - 1]) right--;

          // Move both pointers inward
          left++;
          right--;
        }
      }
    }

    return result;
  }
}

// ============================================================================
// 🧪 COMPREHENSIVE TEST SUITE & DRY RUNS
// ============================================================================

function runThreeSumTests() {
  console.log('=================================================');
  console.log('🧪 RUNNING LEETCODE 15: 3SUM OPTIMAL TEST SUITE');
  console.log('=================================================\n');

  interface TestCase {
    name: string;
    nums: number[];
    expected: number[][];
  }

  const testCases: TestCase[] = [
    {
      name: 'Standard Mixed Array [-1, 0, 1, 2, -1, -4]',
      nums: [-1, 0, 1, 2, -1, -4],
      expected: [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
    },
    {
      name: 'All Zeros [0, 0, 0]',
      nums: [0, 0, 0],
      expected: [[0, 0, 0]],
    },
    {
      name: 'No Triplet Sums to Zero [0, 1, 1]',
      nums: [0, 1, 1],
      expected: [],
    },
    {
      name: 'All Negative Elements [-5, -4, -3, -2, -1]',
      nums: [-5, -4, -3, -2, -1],
      expected: [],
    },
    {
      name: 'All Positive Elements [1, 2, 3, 4, 5]',
      nums: [1, 2, 3, 4, 5],
      expected: [],
    },
    {
      name: 'Duplicates Heavy [-2, 0, 0, 2, 2]',
      nums: [-2, 0, 0, 2, 2],
      expected: [[-2, 0, 2]],
    },
    {
      name: 'Multiple Zero Quadruplets [0, 0, 0, 0]',
      nums: [0, 0, 0, 0],
      expected: [[0, 0, 0]],
    },
  ];

  let passed = 0;

  testCases.forEach((tc, idx) => {
    // Clone array to avoid mutating original test cases
    const inputCopy = [...tc.nums];
    const actual = ThreeSumOptimal.threeSum(inputCopy);

    const actualNormalized = actual.map((t) => [...t].sort((a, b) => a - b)).sort();
    const expectedNormalized = tc.expected.map((t) => [...t].sort((a, b) => a - b)).sort();

    const isMatch = JSON.stringify(actualNormalized) === JSON.stringify(expectedNormalized);

    console.log(`📌 Test ${idx + 1}: ${tc.name}`);
    console.log(`   Input:    [${tc.nums.join(', ')}]`);
    console.log(`   Result:   ${JSON.stringify(actual)}`);
    console.log(`   Expected: ${JSON.stringify(tc.expected)}`);
    console.log(`   Status:   ${isMatch ? '✅ PASSED' : '❌ FAILED'}\n`);

    if (isMatch) passed++;
  });

  console.log(`✨ TEST SUMMARY: ${passed}/${testCases.length} Passed.\n`);
}

// Execute test suite when run directly
runThreeSumTests();
