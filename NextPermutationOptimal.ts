/**
 * ============================================================================
 * LEETCODE 31: NEXT PERMUTATION (OPTIMAL IN-PLACE 3-STEP PIVOT ALGORITHM)
 * ============================================================================
 * 
 * 🧠 Core DSA Intuition ("WHY Rule"):
 * -----------------------------------
 * Lexicographically next permutation matlab humein sabse CHHOTA change karna hai
 * jo array ki numerical value ko thoda sa badha de.
 * 
 * 1. Right side (least significant digits) se sweep karke pehla aisa breakpoint `i`
 *    dhoondte hain jahan `nums[i] < nums[i+1]`. Iska matlab right suffix `[i+1...n-1]`
 *    strictly non-increasing (peak descending) order me hai.
 * 
 * 2. Breakpoint `i` ko suffix me se sabse pehle us element `j` se swap karte hain
 *    jo `nums[i]` se STRICTLY BADA ho (`nums[j] > nums[i]`).
 * 
 * 3. Swap karne ke baad right suffix `[i+1...n-1]` abhi bhi descending order me hota hai.
 *    Isko smallest ascending sequence banane ke liye hum pure suffix ko REVERSE kar dete hain!
 * 
 * ----------------------------------------------------------------------------
 * ⏱️ Time Complexity:  O(N) — Max 3 linear passes (Find i + Find j + Reverse suffix).
 * 💾 Space Complexity: O(1) — In-place array mutation without extra allocation.
 * ============================================================================
 */

export namespace NextPermutationOptimal {
  /**
   * Modifies nums in-place to produce the next lexicographical permutation.
   * @param nums Input array of integers
   */
  export function nextPermutation(nums: number[]): void {
    const n = nums.length;
    if (n <= 1) return;

    // STEP 1: Find the rightmost breakpoint index `i` such that nums[i] < nums[i + 1]
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
      i--;
    }

    // STEP 2: If a valid breakpoint `i` was found (i.e. array is NOT entirely descending)
    if (i >= 0) {
      // Find the rightmost element `j` such that nums[j] > nums[i]
      let j = n - 1;
      while (j > i && nums[j] <= nums[i]) {
        j--;
      }
      // Swap elements at index i and index j
      swap(nums, i, j);
    }

    // STEP 3: Reverse the right suffix starting from index (i + 1) to (n - 1)
    reverse(nums, i + 1, n - 1);
  }

  /**
   * Helper utility to swap two elements in array in-place.
   */
  function swap(nums: number[], a: number, b: number): void {
    const temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
  }

  /**
   * Helper utility to reverse subarray from start index to end index in-place.
   */
  function reverse(nums: number[], start: number, end: number): void {
    let left = start;
    let right = end;
    while (left < right) {
      swap(nums, left, right);
      left++;
      right--;
    }
  }

  /**
   * ============================================================================
   * 🧪 COMPREHENSIVE TEST CASES & DRY RUN EXECUTION
   * ============================================================================
   */
  export function runTests(): void {
    console.log("=================================================");
    console.log("🧪 RUNNING NEXT PERMUTATION OPTIMAL TEST SUITE");
    console.log("=================================================\n");

    const testCases: { name: string; input: number[]; expected: number[] }[] = [
      {
        name: "Test 1: Standard Mixed Array [1, 3, 5, 4, 2]",
        input: [1, 3, 5, 4, 2],
        expected: [1, 4, 2, 3, 5],
      },
      {
        name: "Test 2: Basic Ascending Array [1, 2, 3]",
        input: [1, 2, 3],
        expected: [1, 3, 2],
      },
      {
        name: "Test 3: Entirely Descending Array (Edge Case) [3, 2, 1]",
        input: [3, 2, 1],
        expected: [1, 2, 3],
      },
      {
        name: "Test 4: Array with Duplicates [1, 1, 5]",
        input: [1, 1, 5],
        expected: [1, 5, 1],
      },
      {
        name: "Test 5: Single Element Array [1]",
        input: [1],
        expected: [1],
      },
      {
        name: "Test 6: Two Element Swap [1, 5]",
        input: [1, 5],
        expected: [5, 1],
      },
      {
        name: "Test 7: Complex Multi-Digit [2, 3, 1, 3, 3]",
        input: [2, 3, 1, 3, 3],
        expected: [2, 3, 3, 1, 3],
      },
    ];

    let passedCount = 0;

    for (const test of testCases) {
      const arrCopy = [...test.input];
      nextPermutation(arrCopy);
      const passed = JSON.stringify(arrCopy) === JSON.stringify(test.expected);
      if (passed) passedCount++;

      console.log(`📌 ${test.name}`);
      console.log(`   Input:    [${test.input.join(", ")}]`);
      console.log(`   Result:   [${arrCopy.join(", ")}]`);
      console.log(`   Expected: [${test.expected.join(", ")}]`);
      console.log(`   Status:   ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
    }

    console.log(`✨ TEST SUMMARY: ${passedCount}/${testCases.length} Passed.`);
  }
}

// Execute tests if executed directly
if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
  NextPermutationOptimal.runTests();
}
