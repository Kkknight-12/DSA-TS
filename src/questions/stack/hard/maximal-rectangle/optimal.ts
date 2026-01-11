/**
 * 85. Maximal Rectangle - OPTIMAL SOLUTION
 *
 * visualiser -> https://gemini.google.com/gem/9013c4cd97d5/1cb70b42a795bc65
 * LeetCode -> https://leetcode.com/problems/maximal-rectangle/
 *
 * Approach: Convert to Histogram Problem (Row by Row)
 * Time Complexity: O(m × n)
 * Space Complexity: O(n)
 *
 * KEY INSIGHT:
 * 2D problem ko 1D problem mein convert karo!
 *
 * For each row:
 * 1. Build a histogram (heights of consecutive '1's from top)
 * 2. Apply "Largest Rectangle in Histogram" algorithm
 * 3. Track maximum area across all rows
 *
 * This reuses our previous solution brilliantly!
 */

namespace MaximalRectangleOptimal {
  /**
   * Main function - Find largest rectangle of '1's
   *
   * @param matrix - Binary matrix of '0' and '1'
   * @returns Maximum rectangle area
   */
  export function maximalRectangle(matrix: string[][]): number {
    // Edge Case: Empty matrix
    if (matrix.length === 0 || matrix[0].length === 0) return 0;

    const m = matrix.length; // rows
    const n = matrix[0].length; // columns

    // Heights array - represents histogram for current row
    // WHY: We build histogram row by row, reusing this array
    const heights: number[] = new Array(n).fill(0);

    let maxArea = 0;

    // Process each row
    // WHY: Each row gives us a different histogram to analyze
    for (let row = 0; row < m; row++) {
      // Step 1: Update heights for current row
      // WHY: Build histogram based on consecutive '1's from top
      for (let col = 0; col < n; col++) {
        if (matrix[row][col] === '1') {
          // Increment height (consecutive '1's)
          // WHY: '1' means we can extend the bar upward
          heights[col] += 1;
        } else {
          // Reset height to 0
          // WHY: '0' breaks the chain, can't build rectangle through '0'
          heights[col] = 0;
        }
      }

      // Step 2: Find largest rectangle in this histogram
      // WHY: This histogram represents all possible rectangles
      //      with their bottom edge at current row
      const areaInThisRow = largestRectangleInHistogram(heights);

      // Step 3: Update global maximum
      maxArea = Math.max(maxArea, areaInThisRow);
    }

    return maxArea;
  }

  /**
   * Helper function - Largest Rectangle in Histogram (Single Pass)
   *
   * This is the same algorithm from LeetCode 84!
   * Using monotonic stack with sentinel value.
   *
   * @param heights - Array of bar heights
   * @returns Maximum rectangle area
   */
  function largestRectangleInHistogram(heights: number[]): number {
    const n = heights.length;
    const stack: number[] = []; // Monotonic increasing stack (indices)
    let maxArea = 0;

    // Process all bars + sentinel (height 0)
    for (let i = 0; i <= n; i++) {
      // Sentinel: Use height 0 to force pop all remaining bars
      const currentHeight = i === n ? 0 : heights[i];

      // Pop bars taller than current
      // WHY: Current index is NLE for popped bar
      while (
        stack.length > 0 &&
        heights[stack[stack.length - 1]] > currentHeight
      ) {
        const poppedIndex = stack.pop()!;
        const height = heights[poppedIndex];

        // Width calculation:
        // - Right boundary (NLE) = i
        // - Left boundary (PLE) = stack top (or -1 if empty)
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

        const area = height * width;
        maxArea = Math.max(maxArea, area);
      }

      stack.push(i);
    }

    return maxArea;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: matrix = [
   *   ["1","0","1","0","0"],
   *   ["1","0","1","1","1"],
   *   ["1","1","1","1","1"],
   *   ["1","0","0","1","0"]
   * ]
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * BUILDING HISTOGRAMS ROW BY ROW
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Initial heights = [0, 0, 0, 0, 0]
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * ROW 0: ["1","0","1","0","0"]
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * Update heights:
   *   col 0: '1' → heights[0] = 0 + 1 = 1
   *   col 1: '0' → heights[1] = 0 (reset)
   *   col 2: '1' → heights[2] = 0 + 1 = 1
   *   col 3: '0' → heights[3] = 0 (reset)
   *   col 4: '0' → heights[4] = 0 (reset)
   *
   * heights = [1, 0, 1, 0, 0]
   *
   * Histogram:
   *     ┌───┐   ┌───┐
   *     │ 1 │   │ 1 │
   *     └───┴───┴───┴───┴───┘
   *       0   1   2   3   4
   *
   * Largest rectangle in this histogram = 1
   * maxArea = 1
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * ROW 1: ["1","0","1","1","1"]
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * Update heights (building on previous):
   *   col 0: '1' → heights[0] = 1 + 1 = 2
   *   col 1: '0' → heights[1] = 0 (reset)
   *   col 2: '1' → heights[2] = 1 + 1 = 2
   *   col 3: '1' → heights[3] = 0 + 1 = 1
   *   col 4: '1' → heights[4] = 0 + 1 = 1
   *
   * heights = [2, 0, 2, 1, 1]
   *
   * Histogram:
   *     ┌───┐   ┌───┐
   *     │ 2 │   │ 2 │┌───┬───┐
   *     │   │   │   ││ 1 │ 1 │
   *     └───┴───┴───┴┴───┴───┘
   *       0   1   2   3   4
   *
   * Largest rectangle = max(2×1, 2×1, 1×3) = 3
   * maxArea = max(1, 3) = 3
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * ROW 2: ["1","1","1","1","1"]
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * Update heights:
   *   col 0: '1' → heights[0] = 2 + 1 = 3
   *   col 1: '1' → heights[1] = 0 + 1 = 1
   *   col 2: '1' → heights[2] = 2 + 1 = 3
   *   col 3: '1' → heights[3] = 1 + 1 = 2
   *   col 4: '1' → heights[4] = 1 + 1 = 2
   *
   * heights = [3, 1, 3, 2, 2]
   *
   * Histogram:
   *     ┌───┐   ┌───┐
   *     │   │   │   │┌───┬───┐
   *     │ 3 │┌──┤ 3 ││ 2 │ 2 │
   *     │   ││1 │   │└───┴───┘
   *     └───┴┴──┴───┴────────┘
   *       0   1   2   3   4
   *
   * Applying histogram algorithm:
   *
   *   ┌───────┬────────┬──────┬───────┬───────┬────────┐
   *   │ Index │ Height │ PLE  │  NLE  │ Width │  Area  │
   *   ├───────┼────────┼──────┼───────┼───────┼────────┤
   *   │   0   │   3    │  -1  │   1   │   1   │    3   │
   *   │   1   │   1    │  -1  │   5   │   5   │    5   │
   *   │   2   │   3    │   1  │   3   │   1   │    3   │
   *   │   3   │   2    │   1  │   5   │   3   │    6 ✓ │
   *   │   4   │   2    │   1  │   5   │   3   │    6 ✓ │
   *   └───────┴────────┴──────┴───────┴───────┴────────┘
   *
   * Largest rectangle = 6 (height=2, width=3 at indices 2,3,4)
   *
   * Visual of the 2×3 rectangle:
   *     ┌───┐   ┌───┐
   *     │   │   │   │╔═══╤═══╗
   *     │ 3 │┌──┤ 3 │║ 2 │ 2 ║
   *     │   ││1 │   │╚═══╧═══╝
   *     └───┴┴──┴───┴────────┘
   *       0   1   2   3   4
   *
   * maxArea = max(3, 6) = 6
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * ROW 3: ["1","0","0","1","0"]
   * ───────────────────────────────────────────────────────────────────────────────
   *
   * Update heights:
   *   col 0: '1' → heights[0] = 3 + 1 = 4
   *   col 1: '0' → heights[1] = 0 (reset!)
   *   col 2: '0' → heights[2] = 0 (reset!)
   *   col 3: '1' → heights[3] = 2 + 1 = 3
   *   col 4: '0' → heights[4] = 0 (reset!)
   *
   * heights = [4, 0, 0, 3, 0]
   *
   * Histogram:
   *     ┌───┐
   *     │   │       ┌───┐
   *     │ 4 │       │ 3 │
   *     │   │       │   │
   *     └───┴───────┴───┴───┘
   *       0   1   2   3   4
   *
   * Largest rectangle = max(4×1, 3×1) = 4
   * maxArea = max(6, 4) = 6
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Maximum area found = 6 ✓
   *
   * This corresponds to the 2×3 rectangle in rows 1-2, columns 2-4:
   *
   *       c0  c1  c2  c3  c4
   *     ┌───┬───┬───┬───┬───┐
   * r0  │ 1 │ 0 │ 1 │ 0 │ 0 │
   *     ├───┼───┼───┼───┼───┤
   * r1  │ 1 │ 0 │╔══╤═══╤══╗│
   *     ├───┼───┼║──┼───┼──║┤
   * r2  │ 1 │ 1 │║1 │ 1 │ 1║│
   *     ├───┼───┼╚══╧═══╧══╝┤
   * r3  │ 1 │ 0 │ 0 │ 1 │ 0 │
   *     └───┴───┴───┴───┴───┘
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY RESETTING TO 0 IS CRUCIAL
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * When we see '0' in matrix, we MUST reset height to 0:
   *
   *     matrix[2][1] = '1'    matrix[3][1] = '0'
   *           ↓                     ↓
   *     heights[1] = 1       heights[1] = 0 (reset!)
   *
   * WHY? Because a rectangle cannot pass through a '0'.
   *
   * If we didn't reset:
   *     Wrong heights at row 3: [4, 2, 1, 3, 1]
   *                                 ↑
   *                           This is WRONG!
   *
   * The '0' at (3,1) breaks the vertical chain.
   * Any rectangle using height 2 at column 1 would include the '0'.
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * SUMMARY: ROW-BY-ROW HISTOGRAM HEIGHTS
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌─────────┬─────────────────────┬───────────────────┬──────────┐
   * │   Row   │      Matrix Row     │      Heights      │ Max Area │
   * ├─────────┼─────────────────────┼───────────────────┼──────────┤
   * │    0    │ ["1","0","1","0","0"]│ [1, 0, 1, 0, 0]  │    1     │
   * │    1    │ ["1","0","1","1","1"]│ [2, 0, 2, 1, 1]  │    3     │
   * │    2    │ ["1","1","1","1","1"]│ [3, 1, 3, 2, 2]  │    6 ✓   │
   * │    3    │ ["1","0","0","1","0"]│ [4, 0, 0, 3, 0]  │    4     │
   * └─────────┴─────────────────────┴───────────────────┴──────────┘
   *
   * Global Maximum = 6
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * TIME & SPACE COMPLEXITY
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Time Complexity: O(m × n)
   *   - For each of m rows:
   *     - Update heights: O(n)
   *     - Histogram algorithm: O(n)
   *   - Total: O(m × n)
   *
   * Space Complexity: O(n)
   *   - Heights array: O(n)
   *   - Stack in histogram: O(n)
   *
   * Compare to Brute Force:
   *   Brute Force: O(m³ × n³) time, O(1) space
   *   Optimal:     O(m × n) time, O(n) space
   *
   *   For 200×200 matrix:
   *   Brute Force: ~6.4×10¹³ operations
   *   Optimal:     ~40,000 operations
   *
   *   That's 160 BILLION times faster!
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Maximal Rectangle - OPTIMAL (Histogram)\n');

    const tests: Array<{
      matrix: string[][];
      expected: number;
      description: string;
    }> = [
      {
        matrix: [
          ['1', '0', '1', '0', '0'],
          ['1', '0', '1', '1', '1'],
          ['1', '1', '1', '1', '1'],
          ['1', '0', '0', '1', '0'],
        ],
        expected: 6,
        description: 'LeetCode Example 1',
      },
      {
        matrix: [['0']],
        expected: 0,
        description: 'Single zero',
      },
      {
        matrix: [['1']],
        expected: 1,
        description: 'Single one',
      },
      {
        matrix: [],
        expected: 0,
        description: 'Empty matrix',
      },
      {
        matrix: [
          ['1', '1'],
          ['1', '1'],
        ],
        expected: 4,
        description: 'All ones 2x2',
      },
      {
        matrix: [
          ['0', '0'],
          ['0', '0'],
        ],
        expected: 0,
        description: 'All zeros',
      },
      {
        matrix: [['1', '1', '1', '1']],
        expected: 4,
        description: 'Single row of ones',
      },
      {
        matrix: [['1'], ['1'], ['1'], ['1']],
        expected: 4,
        description: 'Single column of ones',
      },
      {
        matrix: [
          ['1', '0', '1', '1', '1'],
          ['0', '1', '0', '1', '0'],
          ['1', '1', '0', '1', '1'],
          ['1', '1', '0', '1', '1'],
          ['0', '1', '1', '1', '1'],
        ],
        expected: 6,
        description: 'Complex pattern',
      },
      {
        matrix: [
          ['0', '1'],
          ['1', '0'],
        ],
        expected: 1,
        description: 'Diagonal ones',
      },
      {
        matrix: [
          ['1', '1', '1'],
          ['1', '1', '1'],
          ['1', '1', '1'],
        ],
        expected: 9,
        description: 'All ones 3x3',
      },
      {
        matrix: [
          ['1', '0', '1', '0', '1'],
          ['1', '0', '1', '0', '1'],
          ['1', '0', '1', '0', '1'],
        ],
        expected: 3,
        description: 'Striped pattern (vertical)',
      },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
      const result = maximalRectangle(test.matrix);
      const status = result === test.expected ? '✅ PASS' : '❌ FAIL';

      if (result === test.expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Description: ${test.description}`);
      console.log(
        `  Matrix size: ${test.matrix.length}×${test.matrix[0]?.length || 0}`
      );
      console.log(`  Expected:    ${test.expected}`);
      console.log(`  Got:         ${result}`);
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
      console.log('🎉 All tests passed! Histogram approach mastered! 🚀\n');
    }
  }
}

// Execute tests
MaximalRectangleOptimal.runTests();