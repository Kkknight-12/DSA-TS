/**
 * 84. Largest Rectangle in Histogram - SINGLE PASS SOLUTION
 *
 * visualiser - https://gemini.google.com/gem/9013c4cd97d5/053344cfb4f9bb67
 *
 * Approach: Calculate area at pop moment (no separate PLE/NLE arrays)
 * Time Complexity: O(n)
 * Space Complexity: O(n) - only stack, no extra arrays
 *
 * KEY INSIGHT:
 * When we pop an element from the stack:
 * - Current index (i) = NLE (first smaller element to the right)
 * - New stack top = PLE (first smaller element to the left)
 * - Calculate area immediately!
 *
 * This eliminates the need for separate PLE/NLE arrays.
 */

namespace LargestRectangleSinglePass {
  /**
   * Main function - Find largest rectangle area in histogram
   *
   * @param heights - Array of bar heights
   * @returns Maximum rectangle area
   */
  export function largestRectangleArea(heights: number[]): number {
    const n = heights.length;
    const stack: number[] = []; // Monotonic increasing stack (stores indices)
    let maxArea = 0;

    // Process all bars + one extra iteration with height 0
    // WHY extra iteration? To force-pop all remaining elements from stack
    for (let i = 0; i <= n; i++) {
      // Use height 0 as sentinel for the last iteration
      // WHY: Height 0 is smaller than any bar, so all bars will be popped
      const currentHeight = i === n ? 0 : heights[i];

      // Pop bars that are TALLER than current
      // WHY: When we see a shorter bar, taller bars can't extend further right
      // The current index becomes their NLE (right boundary)
      while (
        stack.length > 0 &&
        heights[stack[stack.length - 1]] > currentHeight
      ) {
        // Pop the bar - this is the bar whose area we'll calculate
        const poppedIndex = stack.pop()!;
        const height = heights[poppedIndex];

        // Calculate width:
        // - Right boundary (NLE) = current index i
        // - Left boundary (PLE) = new stack top (or -1 if stack empty)
        //
        // If stack is empty after pop:
        //   No bar to the left is shorter → can extend all the way to index 0
        //   Width = i (from 0 to i-1, total i bars)
        //
        // If stack is not empty:
        //   Stack top is PLE (first shorter bar to left)
        //   Width = i - stack.top - 1
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

        // Calculate area and update max
        const area = height * width;
        maxArea = Math.max(maxArea, area);
      }

      // Push current index to stack
      // WHY: This bar might be part of future rectangles
      stack.push(i);
    }

    return maxArea;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example: heights = [2, 1, 5, 6, 2, 3]
   *                     0  1  2  3  4  5
   *
   * We iterate i = 0, 1, 2, 3, 4, 5, 6 (6 is sentinel with height 0)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * ITERATION BY ITERATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * i=0, currentHeight=2:
   *   Stack: []
   *   No pops needed (stack empty)
   *   Push 0 → Stack: [0]
   *   maxArea = 0
   *
   * i=1, currentHeight=1:
   *   Stack: [0]
   *   heights[0]=2 > 1? YES → Pop!
   *     poppedIndex = 0, height = 2
   *     Stack after pop: []
   *     width = i = 1 (stack empty, extends to start)
   *     area = 2 × 1 = 2
   *     maxArea = 2
   *   Push 1 → Stack: [1]
   *
   * i=2, currentHeight=5:
   *   Stack: [1]
   *   heights[1]=1 > 5? NO
   *   Push 2 → Stack: [1, 2]
   *   maxArea = 2
   *
   * i=3, currentHeight=6:
   *   Stack: [1, 2]
   *   heights[2]=5 > 6? NO
   *   Push 3 → Stack: [1, 2, 3]
   *   maxArea = 2
   *
   * i=4, currentHeight=2:
   *   Stack: [1, 2, 3]
   *   heights[3]=6 > 2? YES → Pop!
   *     poppedIndex = 3, height = 6
   *     Stack after pop: [1, 2]
   *     width = 4 - 2 - 1 = 1
   *     area = 6 × 1 = 6
   *     maxArea = 6
   *   Stack: [1, 2]
   *   heights[2]=5 > 2? YES → Pop!
   *     poppedIndex = 2, height = 5
   *     Stack after pop: [1]
   *     width = 4 - 1 - 1 = 2
   *     area = 5 × 2 = 10 ✓
   *     maxArea = 10
   *   Stack: [1]
   *   heights[1]=1 > 2? NO
   *   Push 4 → Stack: [1, 4]
   *
   * i=5, currentHeight=3:
   *   Stack: [1, 4]
   *   heights[4]=2 > 3? NO
   *   Push 5 → Stack: [1, 4, 5]
   *   maxArea = 10
   *
   * i=6, currentHeight=0 (SENTINEL):
   *   Stack: [1, 4, 5]
   *   heights[5]=3 > 0? YES → Pop!
   *     poppedIndex = 5, height = 3
   *     Stack after pop: [1, 4]
   *     width = 6 - 4 - 1 = 1
   *     area = 3 × 1 = 3
   *     maxArea = 10
   *   Stack: [1, 4]
   *   heights[4]=2 > 0? YES → Pop!
   *     poppedIndex = 4, height = 2
   *     Stack after pop: [1]
   *     width = 6 - 1 - 1 = 4
   *     area = 2 × 4 = 8
   *     maxArea = 10
   *   Stack: [1]
   *   heights[1]=1 > 0? YES → Pop!
   *     poppedIndex = 1, height = 1
   *     Stack after pop: []
   *     width = 6 (stack empty)
   *     area = 1 × 6 = 6
   *     maxArea = 10
   *   Push 6 → Stack: [6]
   *
   * Final maxArea = 10 ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * SUMMARY TABLE
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * ┌─────────┬────────┬─────────────┬────────────────────────────────────────────┐
   * │ Popped  │ Height │    When     │            Width Calculation               │
   * │  Index  │        │   Popped    │                                            │
   * ├─────────┼────────┼─────────────┼────────────────────────────────────────────┤
   * │    0    │   2    │   i=1       │ stack empty → width=1, area=2              │
   * │    3    │   6    │   i=4       │ 4-2-1=1, area=6                            │
   * │    2    │   5    │   i=4       │ 4-1-1=2, area=10 ✓                         │
   * │    5    │   3    │   i=6       │ 6-4-1=1, area=3                            │
   * │    4    │   2    │   i=6       │ 6-1-1=4, area=8                            │
   * │    1    │   1    │   i=6       │ stack empty → width=6, area=6              │
   * └─────────┴────────┴─────────────┴────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * WHY SINGLE PASS WORKS
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * When we pop index `poppedIndex` at iteration `i`:
   *
   * 1. NLE (Right Boundary):
   *    - Current index `i` is the first index where height < popped height
   *    - So `i` is the NLE for poppedIndex
   *
   * 2. PLE (Left Boundary):
   *    - After popping, the new stack top is the first index to the LEFT
   *      with smaller height (that's why it stayed in stack!)
   *    - So new stack top is the PLE for poppedIndex
   *    - If stack empty → PLE = -1 (no smaller bar to left)
   *
   * 3. Width Formula:
   *    - If stack empty: width = i (can extend from 0 to i-1)
   *    - If stack not empty: width = i - stack.top - 1
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. Single bar: [5] → Pop at sentinel → width=1, area=5
   * 2. Ascending: [1,2,3] → All popped at sentinel
   * 3. Descending: [3,2,1] → Each bar pops the previous
   * 4. All same: [2,2,2] → Last one extends full width
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Largest Rectangle in Histogram - SINGLE PASS\n');

    const tests: Array<{
      heights: number[];
      expected: number;
      description: string;
    }> = [
      {
        heights: [2, 1, 5, 6, 2, 3],
        expected: 10,
        description: 'LeetCode Example 1',
      },
      {
        heights: [2, 4],
        expected: 4,
        description: 'LeetCode Example 2',
      },
      {
        heights: [5],
        expected: 5,
        description: 'Single bar',
      },
      {
        heights: [3, 3, 3],
        expected: 9,
        description: 'All same height',
      },
      {
        heights: [1, 2, 3, 4, 5],
        expected: 9,
        description: 'Ascending',
      },
      {
        heights: [5, 4, 3, 2, 1],
        expected: 9,
        description: 'Descending',
      },
      {
        heights: [2, 1, 2],
        expected: 3,
        description: 'Valley shape',
      },
      {
        heights: [1, 2, 3, 2, 1],
        expected: 6,
        description: 'Mountain shape',
      },
      {
        heights: [0, 9],
        expected: 9,
        description: 'Zero height bar',
      },
      {
        heights: [4, 2, 0, 3, 2, 5],
        expected: 6,
        description: 'With zero in middle',
      },
      {
        heights: [2, 2, 2, 2],
        expected: 8,
        description: 'All equal',
      },
      {
        heights: [6, 2, 5, 4, 5, 1, 6],
        expected: 12,
        description: 'Complex case',
      },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
      const result = largestRectangleArea(test.heights);
      const status = result === test.expected ? '✅ PASS' : '❌ FAIL';

      if (result === test.expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Description: ${test.description}`);
      console.log(`  Input:       [${test.heights.join(', ')}]`);
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
      console.log('🎉 All tests passed! Single Pass mastered! 🚀\n');
    }
  }
}

// Execute tests
LargestRectangleSinglePass.runTests();