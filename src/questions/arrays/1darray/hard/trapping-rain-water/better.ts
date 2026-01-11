namespace TrappingRainWaterBetter {
  /**
   * BETTER APPROACH - PRE-COMPUTATION
   *
   * Intuition (Soch):
   * ----------------
   * Brute force mein problem kya thi?
   * → Har position ke liye leftMax aur rightMax DOBARA calculate kar rahe the
   *
   * Solution kya hai?
   * → Pehle hi saare leftMax aur rightMax calculate karke STORE kar lo!
   *
   * Example:
   * height = [4, 2, 0, 3, 2, 5]
   *
   * Step 1: Build leftMax array (left to right)
   *   leftMax[0] = 4 (max of [4])
   *   leftMax[1] = 4 (max of [4, 2])
   *   leftMax[2] = 4 (max of [4, 2, 0])
   *   leftMax[3] = 4 (max of [4, 2, 0, 3])
   *   leftMax[4] = 4 (max of [4, 2, 0, 3, 2])
   *   leftMax[5] = 5 (max of [4, 2, 0, 3, 2, 5])
   *   Result: [4, 4, 4, 4, 4, 5]
   *
   * Step 2: Build rightMax array (right to left)
   *   rightMax[5] = 5 (max of [5])
   *   rightMax[4] = 5 (max of [2, 5])
   *   rightMax[3] = 5 (max of [3, 2, 5])
   *   rightMax[2] = 5 (max of [0, 3, 2, 5])
   *   rightMax[1] = 5 (max of [2, 0, 3, 2, 5])
   *   rightMax[0] = 5 (max of [4, 2, 0, 3, 2, 5])
   *   Result: [5, 5, 5, 5, 5, 5]
   *
   * Step 3: Calculate water at each position
   *   i=0: min(4,5) - 4 = 0
   *   i=1: min(4,5) - 2 = 2
   *   i=2: min(4,5) - 0 = 4
   *   i=3: min(4,5) - 3 = 1
   *   i=4: min(4,5) - 2 = 2
   *   i=5: min(5,5) - 5 = 0
   *   Total: 2 + 4 + 1 + 2 = 9 ✓
   *
   * Algorithm:
   * ----------
   * 1. Create leftMax array (O(n))
   * 2. Create rightMax array (O(n))
   * 3. Calculate water using both arrays (O(n))
   * Total: O(3n) = O(n)
   *
   * Time Complexity: O(n)
   * - Build leftMax: O(n)
   * - Build rightMax: O(n)
   * - Calculate water: O(n)
   * - Total: O(3n) = O(n) ✅
   *
   * Space Complexity: O(n)
   * - leftMax array: O(n)
   * - rightMax array: O(n)
   * - Total: O(2n) = O(n)
   *
   * Advantage:
   * - Much faster than brute force!
   * - No repeated calculations
   * - Easy to understand and implement
   *
   * @param height - Array of non-negative integers
   * @returns Total water trapped
   */
  function trap(height: number[]): number {
    // EDGE CASE: Empty array or too small
    // (Paani trap karne ke liye at least 3 elements chahiye)
    const n = height.length;
    if (n < 3) {
      return 0;
    }

    // STEP 1: Build leftMax array
    // (leftMax[i] = maximum height from index 0 to i)
    const leftMax: number[] = new Array(n);
    leftMax[0] = height[0]; // First element ka max = khud

    for (let i = 1; i < n; i++) {
      // Current position ka leftMax = max(previous leftMax, current height)
      leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // STEP 2: Build rightMax array
    // (rightMax[i] = maximum height from index i to n-1)
    const rightMax: number[] = new Array(n);
    rightMax[n - 1] = height[n - 1]; // Last element ka max = khud

    for (let i = n - 2; i >= 0; i--) {
      // Current position ka rightMax = max(next rightMax, current height)
      rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    // STEP 3: Calculate total water
    // (water[i] = min(leftMax[i], rightMax[i]) - height[i])
    let totalWater = 0;

    for (let i = 0; i < n; i++) {
      // Paani ka level = minimum of leftMax and rightMax
      const waterLevel = Math.min(leftMax[i], rightMax[i]);

      // Trapped water = water level - current height
      const trappedWater = waterLevel - height[i];

      // Add to total
      totalWater += trappedWater;
    }

    return totalWater;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: height = [4, 2, 0, 3, 2, 5]
   *
   * Visual representation:
   * ┃~~~~~~~~~┃
   * ┃~~~┃~~~┃~┃
   * ┃~~~┃~┃~┃~┃
   * ┃~┃~┃~┃~┃~┃
   * 4 2 0 3 2 5
   *
   * Expected output: 9
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 1: BUILD leftMax ARRAY
   * ═════════════════════════════════════════════════════════════════
   *
   * leftMax[i] = maximum height from index 0 to i
   *
   * Initial:
   *   height  = [4, 2, 0, 3, 2, 5]
   *   leftMax = [_, _, _, _, _, _]
   *
   * i = 0:
   *   leftMax[0] = height[0] = 4
   *   leftMax = [4, _, _, _, _, _]
   *
   * i = 1:
   *   leftMax[1] = max(leftMax[0], height[1])
   *              = max(4, 2)
   *              = 4
   *   leftMax = [4, 4, _, _, _, _]
   *
   * i = 2:
   *   leftMax[2] = max(leftMax[1], height[2])
   *              = max(4, 0)
   *              = 4
   *   leftMax = [4, 4, 4, _, _, _]
   *
   * i = 3:
   *   leftMax[3] = max(leftMax[2], height[3])
   *              = max(4, 3)
   *              = 4
   *   leftMax = [4, 4, 4, 4, _, _]
   *
   * i = 4:
   *   leftMax[4] = max(leftMax[3], height[4])
   *              = max(4, 2)
   *              = 4
   *   leftMax = [4, 4, 4, 4, 4, _]
   *
   * i = 5:
   *   leftMax[5] = max(leftMax[4], height[5])
   *              = max(4, 5)
   *              = 5
   *   leftMax = [4, 4, 4, 4, 4, 5]
   *
   * Final leftMax array: [4, 4, 4, 4, 4, 5] ✓
   *
   * Meaning:
   *   - At index 0, max height on left = 4
   *   - At index 1, max height on left = 4
   *   - At index 2, max height on left = 4
   *   - ... and so on
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 2: BUILD rightMax ARRAY
   * ═════════════════════════════════════════════════════════════════
   *
   * rightMax[i] = maximum height from index i to n-1
   *
   * Initial:
   *   height   = [4, 2, 0, 3, 2, 5]
   *   rightMax = [_, _, _, _, _, _]
   *
   * i = 5 (n-1):
   *   rightMax[5] = height[5] = 5
   *   rightMax = [_, _, _, _, _, 5]
   *
   * i = 4:
   *   rightMax[4] = max(rightMax[5], height[4])
   *               = max(5, 2)
   *               = 5
   *   rightMax = [_, _, _, _, 5, 5]
   *
   * i = 3:
   *   rightMax[3] = max(rightMax[4], height[3])
   *               = max(5, 3)
   *               = 5
   *   rightMax = [_, _, _, 5, 5, 5]
   *
   * i = 2:
   *   rightMax[2] = max(rightMax[3], height[2])
   *               = max(5, 0)
   *               = 5
   *   rightMax = [_, _, 5, 5, 5, 5]
   *
   * i = 1:
   *   rightMax[1] = max(rightMax[2], height[1])
   *               = max(5, 2)
   *               = 5
   *   rightMax = [_, 5, 5, 5, 5, 5]
   *
   * i = 0:
   *   rightMax[0] = max(rightMax[1], height[0])
   *               = max(5, 4)
   *               = 5
   *   rightMax = [5, 5, 5, 5, 5, 5]
   *
   * Final rightMax array: [5, 5, 5, 5, 5, 5] ✓
   *
   * Meaning:
   *   - At index 0, max height on right = 5
   *   - At index 1, max height on right = 5
   *   - ... and so on
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 3: CALCULATE WATER AT EACH POSITION
   * ═════════════════════════════════════════════════════════════════
   *
   * Formula: water[i] = min(leftMax[i], rightMax[i]) - height[i]
   *
   * Arrays we have:
   *   height   = [4, 2, 0, 3, 2, 5]
   *   leftMax  = [4, 4, 4, 4, 4, 5]
   *   rightMax = [5, 5, 5, 5, 5, 5]
   *
   * ─────────────────────────────────────────────────────────────────
   * Position 0:
   * ─────────────────────────────────────────────────────────────────
   *   height[0] = 4
   *   leftMax[0] = 4
   *   rightMax[0] = 5
   *
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 4 = 0
   *
   *   totalWater = 0 + 0 = 0
   *
   * ─────────────────────────────────────────────────────────────────
   * Position 1:
   * ─────────────────────────────────────────────────────────────────
   *   height[1] = 2
   *   leftMax[1] = 4
   *   rightMax[1] = 5
   *
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 2 = 2 ✓
   *
   *   totalWater = 0 + 2 = 2
   *
   *   Visual:
   *   ┃
   *   ┃~~
   *   ┃~~
   *   ┃~┃
   *   4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Position 2:
   * ─────────────────────────────────────────────────────────────────
   *   height[2] = 0
   *   leftMax[2] = 4
   *   rightMax[2] = 5
   *
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 0 = 4 ✓
   *
   *   totalWater = 2 + 4 = 6
   *
   *   Visual:
   *   ┃
   *   ┃~~~
   *   ┃~~~
   *   ┃~┃~
   *   4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Position 3:
   * ─────────────────────────────────────────────────────────────────
   *   height[3] = 3
   *   leftMax[3] = 4
   *   rightMax[3] = 5
   *
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 3 = 1 ✓
   *
   *   totalWater = 6 + 1 = 7
   *
   *   Visual:
   *   ┃
   *   ┃~~~┃
   *   ┃~~~┃
   *   ┃~┃~┃
   *   4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Position 4:
   * ─────────────────────────────────────────────────────────────────
   *   height[4] = 2
   *   leftMax[4] = 4
   *   rightMax[4] = 5
   *
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 2 = 2 ✓
   *
   *   totalWater = 7 + 2 = 9
   *
   *   Visual:
   *   ┃
   *   ┃~~~┃~~~
   *   ┃~~~┃~┃~
   *   ┃~┃~┃~┃~
   *   4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Position 5:
   * ─────────────────────────────────────────────────────────────────
   *   height[5] = 5
   *   leftMax[5] = 5
   *   rightMax[5] = 5
   *
   *   waterLevel = min(5, 5) = 5
   *   trappedWater = 5 - 5 = 0
   *
   *   totalWater = 9 + 0 = 9
   *
   *   Final Visual:
   *   ┃~~~~~~~~~┃
   *   ┃~~~┃~~~┃~┃
   *   ┃~~~┃~┃~┃~┃
   *   ┃~┃~┃~┃~┃~┃
   *   4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * FINAL RESULT
   * ─────────────────────────────────────────────────────────────────
   *
   * Return: totalWater = 9 ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * EXAMPLE 2: height = [0,1,0,2,1,0,1,3,2,1,2,1]
   * ═════════════════════════════════════════════════════════════════
   *
   * Step 1: Build leftMax
   *   height  = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
   *   leftMax = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]
   *
   * Step 2: Build rightMax
   *   rightMax = [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]
   *
   * Step 3: Calculate water
   *   i=0:  min(0,3) - 0 = 0
   *   i=1:  min(1,3) - 1 = 0
   *   i=2:  min(1,3) - 0 = 1 ✓
   *   i=3:  min(2,3) - 2 = 0
   *   i=4:  min(2,3) - 1 = 1 ✓
   *   i=5:  min(2,3) - 0 = 2 ✓
   *   i=6:  min(2,3) - 1 = 1 ✓
   *   i=7:  min(3,3) - 3 = 0
   *   i=8:  min(3,2) - 2 = 0
   *   i=9:  min(3,2) - 1 = 1 ✓
   *   i=10: min(3,2) - 2 = 0
   *   i=11: min(3,1) - 1 = 0
   *
   * Total: 1 + 1 + 2 + 1 + 1 = 6 ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * COMPLEXITY COMPARISON
   * ═════════════════════════════════════════════════════════════════
   *
   * For array of size n = 6:
   *
   * Brute Force:
   * ------------
   * - For each position: find leftMax (O(n)) + find rightMax (O(n))
   * - Total: O(n²) = O(36) operations
   *
   * Better (This Approach):
   * -----------------------
   * - Build leftMax array: O(n) = 6 operations
   * - Build rightMax array: O(n) = 6 operations
   * - Calculate water: O(n) = 6 operations
   * - Total: O(3n) = O(18) operations
   *
   * Improvement: 2× faster! 🚀
   *
   * For n = 20,000 (constraint):
   * - Brute Force: ~400 million operations 😱
   * - Better: ~60,000 operations ✅
   * - Improvement: 6,666× faster! 🚀🚀🚀
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS IS BETTER THAN BRUTE FORCE
   * ═════════════════════════════════════════════════════════════════
   *
   * Brute Force Problem:
   * -------------------
   * At position 3:
   *   - Calculate leftMax from [4, 2, 0, 3] → 4
   *
   * At position 4:
   *   - Calculate leftMax from [4, 2, 0, 3, 2] → 4
   *   - Recalculating max of [4, 2, 0, 3] AGAIN! ❌
   *
   * Better Approach Solution:
   * ------------------------
   * - Calculate leftMax ONCE for all positions
   * - Store in array
   * - Reuse whenever needed ✓
   *
   * Key Insight:
   * -----------
   * leftMax[i] = max(leftMax[i-1], height[i])
   *
   * We're using PREVIOUS result to calculate NEXT result!
   * This is called "Dynamic Programming" concept! 💡
   *
   * ═════════════════════════════════════════════════════════════════
   * CAN WE DO BETTER?
   * ═════════════════════════════════════════════════════════════════
   *
   * Current: O(n) time, O(n) space
   *
   * Question: Can we reduce space to O(1)?
   *
   * Answer: YES! Using Two Pointer approach! 🚀
   *
   * The optimal solution uses two pointers (left, right) and calculates
   * water WITHOUT storing leftMax and rightMax arrays!
   *
   * See optimal.ts for the best solution!
   */

  // ═══════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Helper to visualize the elevation map
   */
  function visualize(height: number[]): void {
    if (height.length === 0) return;

    const maxHeight = Math.max(...height);
    console.log('\nElevation Map:');

    for (let level = maxHeight; level > 0; level--) {
      let line = '';
      for (let i = 0; i < height.length; i++) {
        line += height[i] >= level ? '┃ ' : '  ';
      }
      console.log(line);
    }

    // Print indices
    console.log(height.map((_, i) => i).join(' '));
    console.log(height.join(' '));
  }

  /**
   * Helper to show arrays side by side
   */
  // function showArrays(
  //   height: number[],
  //   leftMax: number[],
  //   rightMax: number[]
  // ): void {
  //   console.log('\nArrays:');
  //   console.log('Index:   ', height.map((_, i) => i).join('  '));
  //   console.log('height:  ', height.join('  '));
  //   console.log('leftMax: ', leftMax.join('  '));
  //   console.log('rightMax:', rightMax.join('  '));
  // }

  // ═══════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('TRAPPING RAIN WATER - BETTER (PRE-COMPUTATION)');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test Case 1: Example 1 from problem
  console.log('Test Case 1: [0,1,0,2,1,0,1,3,2,1,2,1]');
  const height1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  visualize(height1);
  const result1 = trap(height1);
  console.log('Output:', result1);
  console.log('Expected: 6');
  console.log(result1 === 6 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 2: Example 2 from problem
  console.log('Test Case 2: [4,2,0,3,2,5]');
  const height2 = [4, 2, 0, 3, 2, 5];
  visualize(height2);
  const result2 = trap(height2);
  console.log('Output:', result2);
  console.log('Expected: 9');
  console.log(result2 === 9 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 3: Flat surface
  console.log('Test Case 3: [3,3,3,3] (flat surface)');
  const height3 = [3, 3, 3, 3];
  visualize(height3);
  const result3 = trap(height3);
  console.log('Output:', result3);
  console.log('Expected: 0 (no water trapped)');
  console.log(result3 === 0 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 4: Ascending
  console.log('Test Case 4: [1,2,3,4,5] (ascending)');
  const height4 = [1, 2, 3, 4, 5];
  visualize(height4);
  const result4 = trap(height4);
  console.log('Output:', result4);
  console.log('Expected: 0 (no water trapped)');
  console.log(result4 === 0 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 5: Descending
  console.log('Test Case 5: [5,4,3,2,1] (descending)');
  const height5 = [5, 4, 3, 2, 1];
  visualize(height5);
  const result5 = trap(height5);
  console.log('Output:', result5);
  console.log('Expected: 0 (no water trapped)');
  console.log(result5 === 0 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 6: Single valley
  console.log('Test Case 6: [3,0,3] (single valley)');
  const height6 = [3, 0, 3];
  visualize(height6);
  const result6 = trap(height6);
  console.log('Output:', result6);
  console.log('Expected: 3');
  console.log(result6 === 3 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 7: Two elements
  console.log('Test Case 7: [2,1] (only two elements)');
  const height7 = [2, 1];
  const result7 = trap(height7);
  console.log('Output:', result7);
  console.log('Expected: 0 (need at least 3 elements)');
  console.log(result7 === 0 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 8: Empty array
  console.log('Test Case 8: [] (empty array)');
  const height8: number[] = [];
  const result8 = trap(height8);
  console.log('Output:', result8);
  console.log('Expected: 0');
  console.log(result8 === 0 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 9: Complex pattern
  console.log('Test Case 9: [5,2,1,2,1,5] (complex valley)');
  const height9 = [5, 2, 1, 2, 1, 5];
  visualize(height9);
  const result9 = trap(height9);
  console.log('Output:', result9);
  console.log('Expected: 14');
  console.log(result9 === 14 ? '✓ Passed' : '✗ Failed');
  console.log();

  // Test Case 10: Multiple valleys
  console.log('Test Case 10: [3,0,2,0,4] (multiple valleys)');
  const height10 = [3, 0, 2, 0, 4];
  visualize(height10);
  const result10 = trap(height10);
  console.log('Output:', result10);
  console.log('Expected: 7');
  console.log(result10 === 7 ? '✓ Passed' : '✗ Failed');
  console.log();

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases completed!');
  console.log('Time Complexity: O(n) - Much faster than brute force!');
  console.log('Space Complexity: O(n) - Uses two extra arrays');
  console.log('✅ This approach is GOOD for interviews!');
  console.log('🚀 Next: See "optimal.ts" for O(1) space solution!');
  console.log('═══════════════════════════════════════════════════════════');
}