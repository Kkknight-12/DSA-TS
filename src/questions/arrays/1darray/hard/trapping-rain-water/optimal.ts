namespace TrappingRainWaterOptimal {
  /**
   * OPTIMAL APPROACH - TWO POINTER
   *
   * Intuition (Soch):
   * ----------------
   * Kya hum leftMax aur rightMax arrays ke BINA calculate kar sakte hain?
   *
   * Key Observation:
   * ---------------
   * Water at position i = min(leftMax, rightMax) - height[i]
   *
   * Important Insight:
   * - Agar leftMax < rightMax, toh min = leftMax
   *   → Water depends ONLY on leftMax!
   *
   * - Agar rightMax < leftMax, toh min = rightMax
   *   → Water depends ONLY on rightMax!
   *
   * Two Pointer Strategy:
   * ---------------------
   * Use two pointers: left (start) and right (end)
   * Track: leftMax and rightMax
   *
   * Move the pointer with SMALLER height:
   * - If height[left] < height[right]:
   *     → We know leftMax will be the bottleneck
   *     → Calculate water at left position
   *     → Move left++
   *
   * - If height[right] <= height[left]:
   *     → We know rightMax will be the bottleneck
   *     → Calculate water at right position
   *     → Move right--
   *
   * Visual Example:
   * --------------
   * height = [4, 2, 0, 3, 2, 5]
   *          L              R
   *
   * leftMax=4, rightMax=5
   * height[L]=4 < height[R]=5
   * → Process left side (leftMax is bottleneck)
   * → water = leftMax - height[left] = 4 - 4 = 0
   * → left++
   *
   * Continue until left >= right...
   *
   * Why This Works:
   * --------------
   * When height[left] < height[right]:
   *   - We know: rightMax >= height[right] > height[left]
   *   - So: min(leftMax, rightMax) = leftMax
   *   - We can safely calculate water at left position!
   *
   * Algorithm:
   * ----------
   * 1. Initialize left=0, right=n-1, leftMax=0, rightMax=0
   * 2. While left < right:
   *    a. If height[left] < height[right]:
   *       - Update leftMax if needed
   *       - Calculate water at left
   *       - left++
   *    b. Else:
   *       - Update rightMax if needed
   *       - Calculate water at right
   *       - right--
   * 3. Return total water
   *
   * Time Complexity: O(n)
   * - Single pass through array
   * - Each element visited exactly once
   *
   * Space Complexity: O(1)
   * - Only 4 variables: left, right, leftMax, rightMax
   * - No extra arrays needed! ✅
   *
   * Why This is OPTIMAL:
   * -------------------
   * - O(n) time - can't do better (must visit each element)
   * - O(1) space - no extra arrays
   * - Single pass - very efficient!
   * - Interview favorite! 🌟
   *
   * @param height - Array of non-negative integers
   * @returns Total water trapped
   */
  function trap(height: number[]): number {
    // EDGE CASE: Empty array or too small
    const n = height.length;
    if (n < 3) {
      return 0;
    }

    // INITIALIZE two pointers and max heights
    let left = 0;
    let right = n - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    // MAIN LOOP: Process from both ends
    while (left < right) {
      // DECISION: Which side to process?
      // (Process the side with smaller height)
      if (height[left] < height[right]) {
        // PROCESS LEFT SIDE
        // (Left side ka height chota hai, toh leftMax bottleneck hoga)

        if (height[left] >= leftMax) {
          // Update leftMax
          // (Naya maximum mil gaya)
          leftMax = height[left];
        } else {
          // Calculate water at left position
          // (Current height leftMax se choti hai, paani trap hoga)
          const water = leftMax - height[left];
          totalWater += water;
        }

        // Move left pointer forward
        left++;
      } else {
        // PROCESS RIGHT SIDE
        // (Right side ka height chota hai, toh rightMax bottleneck hoga)

        if (height[right] >= rightMax) {
          // Update rightMax
          // (Naya maximum mil gaya)
          rightMax = height[right];
        } else {
          // Calculate water at right position
          // (Current height rightMax se choti hai, paani trap hoga)
          const water = rightMax - height[right];
          totalWater += water;
        }

        // Move right pointer backward
        right--;
      }
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
   * INITIAL STATE
   * ═════════════════════════════════════════════════════════════════
   *
   * height = [4, 2, 0, 3, 2, 5]
   * index  =  0  1  2  3  4  5
   *
   * left = 0
   * right = 5
   * leftMax = 0
   * rightMax = 0
   * totalWater = 0
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 1: left=0, right=5
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   height[left] = height[0] = 4
   *   height[right] = height[5] = 5
   *
   * Comparison: height[left] < height[right]? (4 < 5) → YES
   * → Process LEFT side
   *
   * Check: height[0]=4 >= leftMax=0? YES
   * → Update leftMax = 4
   * → No water trapped (at boundary)
   *
   * Move: left++ → left = 1
   *
   * State after iteration:
   *   left = 1, right = 5
   *   leftMax = 4, rightMax = 0
   *   totalWater = 0
   *
   * Visual:
   * ┃         ┃
   * ┃         ┃
   * ┃         ┃
   * ┃         ┃
   * 4 2 0 3 2 5
   * ↑         ↑
   * L         R
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 2: left=1, right=5
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   height[left] = height[1] = 2
   *   height[right] = height[5] = 5
   *
   * Comparison: height[left] < height[right]? (2 < 5) → YES
   * → Process LEFT side
   *
   * Check: height[1]=2 >= leftMax=4? NO
   * → Water trapped!
   * → water = leftMax - height[1] = 4 - 2 = 2 ✓
   * → totalWater = 0 + 2 = 2
   *
   * Move: left++ → left = 2
   *
   * State after iteration:
   *   left = 2, right = 5
   *   leftMax = 4, rightMax = 0
   *   totalWater = 2
   *
   * Visual:
   * ┃
   * ┃~~
   * ┃~~
   * ┃~┃
   * 4 2 0 3 2 5
   *   ↑       ↑
   *   L       R
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 3: left=2, right=5
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   height[left] = height[2] = 0
   *   height[right] = height[5] = 5
   *
   * Comparison: height[left] < height[right]? (0 < 5) → YES
   * → Process LEFT side
   *
   * Check: height[2]=0 >= leftMax=4? NO
   * → Water trapped!
   * → water = leftMax - height[2] = 4 - 0 = 4 ✓
   * → totalWater = 2 + 4 = 6
   *
   * Move: left++ → left = 3
   *
   * State after iteration:
   *   left = 3, right = 5
   *   leftMax = 4, rightMax = 0
   *   totalWater = 6
   *
   * Visual:
   * ┃
   * ┃~~~
   * ┃~~~
   * ┃~┃~
   * 4 2 0 3 2 5
   *     ↑     ↑
   *     L     R
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 4: left=3, right=5
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   height[left] = height[3] = 3
   *   height[right] = height[5] = 5
   *
   * Comparison: height[left] < height[right]? (3 < 5) → YES
   * → Process LEFT side
   *
   * Check: height[3]=3 >= leftMax=4? NO
   * → Water trapped!
   * → water = leftMax - height[3] = 4 - 3 = 1 ✓
   * → totalWater = 6 + 1 = 7
   *
   * Move: left++ → left = 4
   *
   * State after iteration:
   *   left = 4, right = 5
   *   leftMax = 4, rightMax = 0
   *   totalWater = 7
   *
   * Visual:
   * ┃
   * ┃~~~┃
   * ┃~~~┃
   * ┃~┃~┃
   * 4 2 0 3 2 5
   *       ↑   ↑
   *       L   R
   *
   * ─────────────────────────────────────────────────────────────────
   * ITERATION 5: left=4, right=5
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   height[left] = height[4] = 2
   *   height[right] = height[5] = 5
   *
   * Comparison: height[left] < height[right]? (2 < 5) → YES
   * → Process LEFT side
   *
   * Check: height[4]=2 >= leftMax=4? NO
   * → Water trapped!
   * → water = leftMax - height[4] = 4 - 2 = 2 ✓
   * → totalWater = 7 + 2 = 9
   *
   * Move: left++ → left = 5
   *
   * State after iteration:
   *   left = 5, right = 5
   *   leftMax = 4, rightMax = 0
   *   totalWater = 9
   *
   * Visual:
   * ┃~~~~~~~~~┃
   * ┃~~~┃~~~┃~┃
   * ┃~~~┃~┃~┃~┃
   * ┃~┃~┃~┃~┃~┃
   * 4 2 0 3 2 5
   *         L,R
   *
   * ─────────────────────────────────────────────────────────────────
   * LOOP ENDS: left >= right (5 >= 5)
   * ─────────────────────────────────────────────────────────────────
   *
   * FINAL RESULT: totalWater = 9 ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * EXAMPLE 2: height = [0,1,0,2,1,0,1,3,2,1,2,1]
   * ═════════════════════════════════════════════════════════════════
   *
   * Initial:
   *   left = 0, right = 11
   *   leftMax = 0, rightMax = 0
   *   total = 0
   *
   * Iteration 1: left=0, right=11
   *   height[0]=0 < height[11]=1 → Process left
   *   0 >= 0? YES → leftMax = 0, no water
   *   left = 1
   *
   * Iteration 2: left=1, right=11
   *   height[1]=1 >= height[11]=1 → Process right
   *   1 >= 0? YES → rightMax = 1, no water
   *   right = 10
   *
   * Iteration 3: left=1, right=10
   *   height[1]=1 < height[10]=2 → Process left
   *   1 >= 0? YES → leftMax = 1, no water
   *   left = 2
   *
   * Iteration 4: left=2, right=10
   *   height[2]=0 < height[10]=2 → Process left
   *   0 >= 1? NO → water = 1 - 0 = 1 ✓
   *   total = 1, left = 3
   *
   * Iteration 5: left=3, right=10
   *   height[3]=2 >= height[10]=2 → Process right
   *   2 >= 1? YES → rightMax = 2, no water
   *   right = 9
   *
   * Iteration 6: left=3, right=9
   *   height[3]=2 >= height[9]=1 → Process right
   *   1 >= 2? NO → water = 2 - 1 = 1 ✓
   *   total = 2, right = 8
   *
   * Iteration 7: left=3, right=8
   *   height[3]=2 >= height[8]=2 → Process right
   *   2 >= 2? YES → rightMax = 2, no water
   *   right = 7
   *
   * Iteration 8: left=3, right=7
   *   height[3]=2 < height[7]=3 → Process left
   *   2 >= 1? YES → leftMax = 2, no water
   *   left = 4
   *
   * Iteration 9: left=4, right=7
   *   height[4]=1 < height[7]=3 → Process left
   *   1 >= 2? NO → water = 2 - 1 = 1 ✓
   *   total = 3, left = 5
   *
   * Iteration 10: left=5, right=7
   *   height[5]=0 < height[7]=3 → Process left
   *   0 >= 2? NO → water = 2 - 0 = 2 ✓
   *   total = 5, left = 6
   *
   * Iteration 11: left=6, right=7
   *   height[6]=1 < height[7]=3 → Process left
   *   1 >= 2? NO → water = 2 - 1 = 1 ✓
   *   total = 6, left = 7
   *
   * Loop ends: left >= right (7 >= 7)
   *
   * FINAL: totalWater = 6 ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY TWO POINTER WORKS - DETAILED EXPLANATION
   * ═════════════════════════════════════════════════════════════════
   *
   * Key Question:
   * ------------
   * How can we calculate water without knowing BOTH leftMax and rightMax?
   *
   * Answer:
   * -------
   * We don't need to know both! We only need to know the MINIMUM!
   *
   * Case 1: height[left] < height[right]
   * ------------------------------------
   *   Situation:
   *     left               right
   *      ↓                   ↓
   *   [... 2 ... ... ... ... 5]
   *
   *   Analysis:
   *   - height[left] = 2
   *   - height[right] = 5
   *   - We know: rightMax >= 5 > 2
   *   - So: min(leftMax, rightMax) = leftMax
   *
   *   Conclusion:
   *   - Water at left ONLY depends on leftMax!
   *   - We can safely calculate it!
   *
   * Case 2: height[right] <= height[left]
   * -------------------------------------
   *   Situation:
   *     left               right
   *      ↓                   ↓
   *   [... 5 ... ... ... ... 2]
   *
   *   Analysis:
   *   - height[left] = 5
   *   - height[right] = 2
   *   - We know: leftMax >= 5 > 2
   *   - So: min(leftMax, rightMax) = rightMax
   *
   *   Conclusion:
   *   - Water at right ONLY depends on rightMax!
   *   - We can safely calculate it!
   *
   * This is the GENIUS of two pointer approach! 💡
   *
   * ═════════════════════════════════════════════════════════════════
   * COMPARISON WITH OTHER APPROACHES
   * ═════════════════════════════════════════════════════════════════
   *
   * For array of size n = 6:
   *
   * Brute Force:
   * -----------
   * Time: O(n²) = ~36 operations
   * Space: O(1)
   * Passes: n passes (one for each element)
   *
   * Better (Pre-compute):
   * --------------------
   * Time: O(n) = ~18 operations
   * Space: O(n) - leftMax + rightMax arrays
   * Passes: 3 passes (leftMax, rightMax, calculate)
   *
   * Optimal (Two Pointer):
   * ---------------------
   * Time: O(n) = ~6 operations ✅
   * Space: O(1) ✅✅
   * Passes: 1 pass ✅✅✅
   *
   * For n = 20,000:
   * - Brute: ~400 million ops, O(1) space
   * - Better: ~60,000 ops, O(20,000) space
   * - Optimal: ~20,000 ops, O(1) space 🚀🚀🚀
   *
   * ═════════════════════════════════════════════════════════════════
   * INTERVIEW TIPS
   * ═════════════════════════════════════════════════════════════════
   *
   * How to explain in interview:
   * ---------------------------
   *
   * 1. Start with brute force (show you understand the problem)
   *    "Water at i = min(leftMax, rightMax) - height[i]"
   *
   * 2. Optimize to pre-computation (show optimization thinking)
   *    "We can pre-compute leftMax and rightMax arrays"
   *
   * 3. Arrive at two pointer (show advanced understanding)
   *    "We don't need full arrays! Process from both ends!"
   *
   * Key points to mention:
   * ---------------------
   * - "We only need to know the MINIMUM, not both maxes"
   * - "Smaller side determines the water level"
   * - "Move the pointer with smaller height"
   * - "O(n) time, O(1) space - optimal!"
   *
   * Common mistakes to avoid:
   * ------------------------
   * ❌ Moving both pointers at same time
   * ❌ Not updating leftMax/rightMax correctly
   * ❌ Forgetting to check >= before updating max
   * ❌ Edge case: array size < 3
   *
   * ✅ Move ONE pointer per iteration
   * ✅ Update max when height >= currentMax
   * ✅ Calculate water when height < currentMax
   * ✅ Handle edge cases first
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

  // ═══════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('TRAPPING RAIN WATER - OPTIMAL (TWO POINTER)');
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
  console.log('Time Complexity: O(n) - Single pass! ⚡');
  console.log('Space Complexity: O(1) - No extra arrays! 🚀');
  console.log('✅✅✅ THIS IS THE OPTIMAL SOLUTION! ✅✅✅');
  console.log('Interview recommendation: Use this approach!');
  console.log('═══════════════════════════════════════════════════════════');
}
