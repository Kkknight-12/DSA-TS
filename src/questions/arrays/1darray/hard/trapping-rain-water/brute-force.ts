namespace TrappingRainWaterBruteForce {
  /**
   * BRUTE FORCE APPROACH
   *
   * Intuition (Soch):
   * ----------------
   * Har position par paani kitna trap hoga?
   *
   * Simple observation:
   * - Paani ka level = min(leftMax, rightMax)
   * - Trapped water = paani ka level - current height
   *
   * Example:
   *      ┃           ┃
   *      ┃     ┃     ┃
   *  ┃   ┃ ┃   ┃ ┃   ┃
   *  3 0 2 0 4 1 2 0 5
   *      ↑
   *   position i=1
   *
   * At position 1 (height=0):
   *   Left side: [3] → leftMax = 3
   *   Right side: [2, 0, 4, 1, 2, 0, 5] → rightMax = 5
   *   Water level = min(3, 5) = 3
   *   Trapped water = 3 - 0 = 3 ✓
   *
   * Algorithm:
   * ----------
   * For each position i:
   *   1. Find maximum height on left side (0 to i)
   *   2. Find maximum height on right side (i to n-1)
   *   3. Water at i = min(leftMax, rightMax) - height[i]
   *   4. Add to total (if positive)
   *
   * Time Complexity: O(n²)
   * - For each position: O(n)
   * - Find leftMax and rightMax: O(n) each
   * - Total: n × n = O(n²)
   *
   * Space Complexity: O(1)
   * - Only using variables
   *
   * Drawback:
   * - Very slow for large arrays
   * - Repeated calculations (har baar max dhundna padta hai)
   *
   * @param height - Array of non-negative integers
   * @returns Total water trapped
   */
  function trap(height: number[]): number {
    // EDGE CASE: Empty array or single element
    // (Paani trap karne ke liye at least 3 elements chahiye)
    if (height.length < 3) {
      return 0;
    }

    const n = height.length;
    let totalWater = 0;

    // MAIN LOGIC: Process each position
    // (Har position ke liye leftMax aur rightMax find karo)
    for (let i = 0; i < n; i++) {
      // STEP 1: Find maximum height on LEFT side
      // (Position 0 se i tak sabse badi height kya hai?)
      let leftMax = 0;
      for (let j = 0; j <= i; j++) {
        leftMax = Math.max(leftMax, height[j]);
      }

      // STEP 2: Find maximum height on RIGHT side
      // (Position i se n-1 tak sabse badi height kya hai?)
      let rightMax = 0;
      for (let j = i; j < n; j++) {
        rightMax = Math.max(rightMax, height[j]);
      }

      // STEP 3: Calculate water at current position
      // (Paani ka level = minimum of leftMax and rightMax)
      const waterLevel = Math.min(leftMax, rightMax);

      // STEP 4: Trapped water = water level - current height
      // (Agar water level current height se zyada hai, toh paani trap hoga)
      const trappedWater = waterLevel - height[i];

      // Add to total (only if positive)
      if (trappedWater > 0) {
        totalWater += trappedWater;
      }
    }

    return totalWater;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example 1: height = [4, 2, 0, 3, 2, 5]
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
   * ITERATION BY ITERATION BREAKDOWN
   * ═════════════════════════════════════════════════════════════════
   *
   * Initial state:
   *   totalWater = 0
   *   n = 6
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: i = 0 (height[0] = 4)
   * ─────────────────────────────────────────────────────────────────
   *
   * Find leftMax:
   *   j = 0: leftMax = max(0, 4) = 4
   *   Result: leftMax = 4
   *
   * Find rightMax:
   *   j = 0: rightMax = max(0, 4) = 4
   *   j = 1: rightMax = max(4, 2) = 4
   *   j = 2: rightMax = max(4, 0) = 4
   *   j = 3: rightMax = max(4, 3) = 4
   *   j = 4: rightMax = max(4, 2) = 4
   *   j = 5: rightMax = max(4, 5) = 5
   *   Result: rightMax = 5
   *
   * Calculate water:
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 4 = 0
   *
   * Update:
   *   totalWater = 0 + 0 = 0
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: i = 1 (height[1] = 2)
   * ─────────────────────────────────────────────────────────────────
   *
   * Find leftMax:
   *   j = 0: leftMax = max(0, 4) = 4
   *   j = 1: leftMax = max(4, 2) = 4
   *   Result: leftMax = 4
   *
   * Find rightMax:
   *   j = 1: rightMax = max(0, 2) = 2
   *   j = 2: rightMax = max(2, 0) = 2
   *   j = 3: rightMax = max(2, 3) = 3
   *   j = 4: rightMax = max(3, 2) = 3
   *   j = 5: rightMax = max(3, 5) = 5
   *   Result: rightMax = 5
   *
   * Calculate water:
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 2 = 2 ✓
   *
   * Update:
   *   totalWater = 0 + 2 = 2
   *
   * Visual:
   * ┃
   * ┃~~
   * ┃~~
   * ┃~┃
   * 4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: i = 2 (height[2] = 0)
   * ─────────────────────────────────────────────────────────────────
   *
   * Find leftMax:
   *   j = 0: leftMax = max(0, 4) = 4
   *   j = 1: leftMax = max(4, 2) = 4
   *   j = 2: leftMax = max(4, 0) = 4
   *   Result: leftMax = 4
   *
   * Find rightMax:
   *   j = 2: rightMax = max(0, 0) = 0
   *   j = 3: rightMax = max(0, 3) = 3
   *   j = 4: rightMax = max(3, 2) = 3
   *   j = 5: rightMax = max(3, 5) = 5
   *   Result: rightMax = 5
   *
   * Calculate water:
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 0 = 4 ✓
   *
   * Update:
   *   totalWater = 2 + 4 = 6
   *
   * Visual:
   * ┃
   * ┃~~~
   * ┃~~~
   * ┃~┃~
   * 4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: i = 3 (height[3] = 3)
   * ─────────────────────────────────────────────────────────────────
   *
   * Find leftMax:
   *   j = 0: leftMax = max(0, 4) = 4
   *   j = 1: leftMax = max(4, 2) = 4
   *   j = 2: leftMax = max(4, 0) = 4
   *   j = 3: leftMax = max(4, 3) = 4
   *   Result: leftMax = 4
   *
   * Find rightMax:
   *   j = 3: rightMax = max(0, 3) = 3
   *   j = 4: rightMax = max(3, 2) = 3
   *   j = 5: rightMax = max(3, 5) = 5
   *   Result: rightMax = 5
   *
   * Calculate water:
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 3 = 1 ✓
   *
   * Update:
   *   totalWater = 6 + 1 = 7
   *
   * Visual:
   * ┃
   * ┃~~~┃
   * ┃~~~┃
   * ┃~┃~┃
   * 4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: i = 4 (height[4] = 2)
   * ─────────────────────────────────────────────────────────────────
   *
   * Find leftMax:
   *   j = 0: leftMax = max(0, 4) = 4
   *   j = 1: leftMax = max(4, 2) = 4
   *   j = 2: leftMax = max(4, 0) = 4
   *   j = 3: leftMax = max(4, 3) = 4
   *   j = 4: leftMax = max(4, 2) = 4
   *   Result: leftMax = 4
   *
   * Find rightMax:
   *   j = 4: rightMax = max(0, 2) = 2
   *   j = 5: rightMax = max(2, 5) = 5
   *   Result: rightMax = 5
   *
   * Calculate water:
   *   waterLevel = min(4, 5) = 4
   *   trappedWater = 4 - 2 = 2 ✓
   *
   * Update:
   *   totalWater = 7 + 2 = 9
   *
   * Visual:
   * ┃
   * ┃~~~┃~~~
   * ┃~~~┃~┃~
   * ┃~┃~┃~┃~
   * 4 2 0 3 2 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 6: i = 5 (height[5] = 5)
   * ─────────────────────────────────────────────────────────────────
   *
   * Find leftMax:
   *   j = 0 to 5: leftMax = 5
   *   Result: leftMax = 5
   *
   * Find rightMax:
   *   j = 5: rightMax = max(0, 5) = 5
   *   Result: rightMax = 5
   *
   * Calculate water:
   *   waterLevel = min(5, 5) = 5
   *   trappedWater = 5 - 5 = 0
   *
   * Update:
   *   totalWater = 9 + 0 = 9
   *
   * Final:
   * ┃~~~~~~~~~┃
   * ┃~~~┃~~~┃~┃
   * ┃~~~┃~┃~┃~┃
   * ┃~┃~┃~┃~┃~┃
   * 4 2 0 3 2 5
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
   * Visual:
   *          ┃
   *     ┃~~~~┃
   *     ┃~┃~~┃~~┃
   *   ┃~┃~┃~~┃~~┃~┃
   *   ┃~┃~┃┃~┃┃~┃~┃
   * ┃ ┃ ┃~┃ ┃ ┃┃ ┃ ┃
   * 0 1 0 2 1 0 1 3 2 1 2 1
   *
   * Processing each position:
   *
   * i=0: leftMax=0, rightMax=3, water = min(0,3) - 0 = 0
   * i=1: leftMax=1, rightMax=3, water = min(1,3) - 1 = 0
   * i=2: leftMax=1, rightMax=3, water = min(1,3) - 0 = 1 ✓
   * i=3: leftMax=2, rightMax=3, water = min(2,3) - 2 = 0
   * i=4: leftMax=2, rightMax=3, water = min(2,3) - 1 = 1 ✓
   * i=5: leftMax=2, rightMax=3, water = min(2,3) - 0 = 2 ✓
   * i=6: leftMax=2, rightMax=3, water = min(2,3) - 1 = 1 ✓
   * i=7: leftMax=3, rightMax=3, water = min(3,3) - 3 = 0
   * i=8: leftMax=3, rightMax=2, water = min(3,2) - 2 = 0
   * i=9: leftMax=3, rightMax=2, water = min(3,2) - 1 = 1 ✓
   * i=10: leftMax=3, rightMax=2, water = min(3,2) - 2 = 0
   * i=11: leftMax=3, rightMax=1, water = min(3,1) - 1 = 0
   *
   * Total: 1 + 1 + 2 + 1 + 1 = 6 ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * TIME COMPLEXITY ANALYSIS
   * ═════════════════════════════════════════════════════════════════
   *
   * For array of size n = 6:
   *
   * Position 0:
   *   - Find leftMax: 1 comparison
   *   - Find rightMax: 6 comparisons
   *   - Total: 7 operations
   *
   * Position 1:
   *   - Find leftMax: 2 comparisons
   *   - Find rightMax: 5 comparisons
   *   - Total: 7 operations
   *
   * Position 2:
   *   - Find leftMax: 3 comparisons
   *   - Find rightMax: 4 comparisons
   *   - Total: 7 operations
   *
   * ... and so on
   *
   * Total operations ≈ n × n = n²
   * For n = 6: ≈ 36 operations
   * For n = 1000: ≈ 1,000,000 operations 😱
   * For n = 20,000 (constraint): ≈ 400,000,000 operations 😱😱
   *
   * This is why brute force is SLOW for large inputs!
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS IS NOT OPTIMAL
   * ═════════════════════════════════════════════════════════════════
   *
   * Problem: Repeated Calculations
   * -------------------------------
   *
   * At position 3:
   *   - Calculate leftMax from [4, 2, 0, 3]
   *
   * At position 4:
   *   - Calculate leftMax from [4, 2, 0, 3, 2]
   *
   * Notice: We're recalculating max of [4, 2, 0, 3] again!
   *
   * Same for rightMax - we calculate it fresh every time.
   *
   * Solution: Pre-compute leftMax and rightMax arrays! 💡
   * (This is the "Better" approach)
   *
   * ═════════════════════════════════════════════════════════════════
   * KEY LEARNING
   * ═════════════════════════════════════════════════════════════════
   *
   * Brute Force teaches us:
   * 1. ✅ The core logic: water = min(leftMax, rightMax) - height[i]
   * 2. ✅ How to think about the problem
   * 3. ❌ But it's inefficient due to repeated calculations
   *
   * Next step: Optimize by pre-computing leftMax and rightMax!
   */

  // ═══════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Helper to visualize the elevation map
   */
  function visualize(height: number[]): void {
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

  // ═══════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('TRAPPING RAIN WATER - BRUTE FORCE');
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
  console.log('Time Complexity: O(n²) - Very slow for large inputs!');
  console.log('Space Complexity: O(1) - No extra space used');
  console.log('⚠️  This approach is NOT recommended for interviews!');
  console.log('✅ Next: See "better.ts" for O(n) time with pre-computation');
  console.log('═══════════════════════════════════════════════════════════');
}
