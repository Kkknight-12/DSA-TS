/**
 * 84. Largest Rectangle in Histogram - OPTIMAL SOLUTION (Two Pass)
 *
 * Approach: Monotonic Stack with PLE/NLE
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * KEY INSIGHT:
 * For each bar, find how far it can extend left and right.
 * The bar can extend as long as neighboring bars are >= its height.
 *
 * This means we need:
 * - PLE (Previous Less Element): Left boundary (first shorter bar to left)
 * - NLE (Next Less Element): Right boundary (first shorter bar to right)
 *
 * Formula:
 *   width = NLE[i] - PLE[i] - 1
 *   area = heights[i] × width
 */

namespace LargestRectangleOptimal {
    /**
     * Main function - Find largest rectangle area in histogram
     *
     * @param heights - Array of bar heights
     * @returns Maximum rectangle area
     */
    export function largestRectangleArea(heights: number[]): number {
        const n = heights.length;

        // Edge Case: Single bar
        // WHY: Area is just the height itself
        if (n === 1) return heights[0];

        // Step 1: Find PLE (Previous Less Element) for each bar
        // WHY: PLE defines the left boundary where bar can extend
        const ple = findPreviousLessElement(heights);

        // Step 2: Find NLE (Next Less Element) for each bar
        // WHY: NLE defines the right boundary where bar can extend
        const nle = findNextLessElement(heights);

        // Step 3: Calculate maximum area
        // WHY: For each bar, compute width using PLE/NLE, then area
        let maxArea = 0;

        for (let i = 0; i < n; i++) {
            // Width = distance between boundaries (exclusive)
            // WHY: PLE and NLE are walls, we can't include them
            // EXAMPLE: PLE=1, NLE=4 → width = 4-1-1 = 2 (indices 2 and 3)
            const width = nle[i] - ple[i] - 1;

            // Area = height × width
            const area = heights[i] * width;

            // Track maximum
            maxArea = Math.max(maxArea, area);
        }

        return maxArea;
    }

    /**
     * Find Previous Less Element (PLE) for each index
     *
     * POP CONDITION: heights[stack.top] >= heights[i]
     * RESULT: Finds STRICTLY LESS element to the left
     *
     * WHY >= ? To handle duplicates correctly.
     * Equal heights should not block each other.
     */
    function findPreviousLessElement(heights: number[]): number[] {
        const n = heights.length;
        const ple: number[] = new Array(n);
        const stack: number[] = []; // Monotonic increasing stack (stores indices)

        // Traverse LEFT to RIGHT
        for (let i = 0; i < n; i++) {
            // Pop elements that are >= current
            // POP if >= → KEEP only < → Result: STRICTLY LESS
            // Equal elements get popped (they don't block us)
            while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
                stack.pop();
            }

            // If stack empty → no shorter bar to left → PLE = -1
            // Otherwise → stack top is the PLE
            ple[i] = stack.length === 0 ? -1 : stack[stack.length - 1];

            // Push current index
            stack.push(i);
        }

        return ple;
    }

    /**
     * Find Next Less Element (NLE) for each index
     *
     * POP CONDITION: heights[stack.top] > heights[i]
     * RESULT: Finds LESS OR EQUAL element to the right
     *
     * DUPLICATE HANDLING:
     * - PLE uses >= (excludes equal) → STRICT
     * - NLE uses >  (includes equal) → NON-STRICT
     * - This ensures each rectangle is counted exactly once
     */
    function findNextLessElement(heights: number[]): number[] {
        const n = heights.length;
        const nle: number[] = new Array(n);
        const stack: number[] = []; // Monotonic increasing stack (stores indices)

        // Traverse RIGHT to LEFT
        for (let i = n - 1; i >= 0; i--) {
            // Pop elements that are > current
            // POP if > → KEEP <= → Result: LESS OR EQUAL
            // Equal elements stay in stack
            while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
                stack.pop();
            }

            // If stack empty → no shorter bar to right → NLE = n
            // Otherwise → stack top is the NLE
            nle[i] = stack.length === 0 ? n : stack[stack.length - 1];

            // Push current index
            stack.push(i);
        }

        return nle;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example: heights = [2, 1, 5, 6, 2, 3]
     *                     0  1  2  3  4  5
     *
     * Histogram:
     *         ┌───┐
     *         │ 6 │
     *     ┌───┤   │
     *     │ 5 │   │       ┌───┐
     * ┌───┤   │   │   ┌───┤ 3 │
     * │ 2 │   │   │   │ 2 │   │
     * │   │ 1 │   │   │   │   │
     * └───┴───┴───┴───┴───┴───┘
     *   0   1   2   3   4   5
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * STEP 1: FIND PLE (Previous Less Element)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Pop condition: heights[stack.top] >= heights[i]
     *
     * ┌──────┬────────┬───────────────┬──────────────────────┬─────────────┬────────┐
     * │  i   │ height │ Stack Before  │       Action         │ Stack After │ PLE[i] │
     * ├──────┼────────┼───────────────┼──────────────────────┼─────────────┼────────┤
     * │  0   │   2    │ []            │ push 0               │ [0]         │   -1   │
     * │  1   │   1    │ [0]           │ 2>=1, pop 0, push 1  │ [1]         │   -1   │
     * │  2   │   5    │ [1]           │ 1<5, push 2          │ [1,2]       │    1   │
     * │  3   │   6    │ [1,2]         │ 5<6, push 3          │ [1,2,3]     │    2   │
     * │  4   │   2    │ [1,2,3]       │ 6>=2, pop 3          │ [1,2]       │        │
     * │      │        │ [1,2]         │ 5>=2, pop 2          │ [1]         │        │
     * │      │        │ [1]           │ 1<2, push 4          │ [1,4]       │    1   │
     * │  5   │   3    │ [1,4]         │ 2<3, push 5          │ [1,4,5]     │    4   │
     * └──────┴────────┴───────────────┴──────────────────────┴─────────────┴────────┘
     *
     * PLE = [-1, -1, 1, 2, 1, 4]
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * STEP 2: FIND NLE (Next Less Element)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Pop condition: heights[stack.top] > heights[i]
     *
     * ┌──────┬────────┬───────────────┬──────────────────────┬─────────────┬────────┐
     * │  i   │ height │ Stack Before  │       Action         │ Stack After │ NLE[i] │
     * ├──────┼────────┼───────────────┼──────────────────────┼─────────────┼────────┤
     * │  5   │   3    │ []            │ push 5               │ [5]         │    6   │
     * │  4   │   2    │ [5]           │ 3>2, pop 5, push 4   │ [4]         │    6   │
     * │  3   │   6    │ [4]           │ 2<6, push 3          │ [4,3]       │    4   │
     * │  2   │   5    │ [4,3]         │ 6>5, pop 3           │ [4]         │        │
     * │      │        │ [4]           │ 2<5, push 2          │ [4,2]       │    4   │
     * │  1   │   1    │ [4,2]         │ 5>1, pop 2           │ [4]         │        │
     * │      │        │ [4]           │ 2>1, pop 4           │ []          │        │
     * │      │        │ []            │ push 1               │ [1]         │    6   │
     * │  0   │   2    │ [1]           │ 1<2, push 0          │ [1,0]       │    1   │
     * └──────┴────────┴───────────────┴──────────────────────┴─────────────┴────────┘
     *
     * NLE = [1, 6, 4, 4, 6, 6]
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * STEP 3: CALCULATE AREAS
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Formula: width = NLE[i] - PLE[i] - 1, area = heights[i] × width
     *
     * ┌──────┬────────┬────────┬────────┬───────────────────┬────────┬────────┐
     * │  i   │ height │ PLE[i] │ NLE[i] │      Width        │  Area  │  Max   │
     * ├──────┼────────┼────────┼────────┼───────────────────┼────────┼────────┤
     * │  0   │   2    │   -1   │   1    │ 1-(-1)-1 = 1      │  2×1=2 │    2   │
     * │  1   │   1    │   -1   │   6    │ 6-(-1)-1 = 6      │  1×6=6 │    6   │
     * │  2   │   5    │    1   │   4    │ 4-1-1 = 2         │ 5×2=10 │   10   │
     * │  3   │   6    │    2   │   4    │ 4-2-1 = 1         │  6×1=6 │   10   │
     * │  4   │   2    │    1   │   6    │ 6-1-1 = 4         │  2×4=8 │   10   │
     * │  5   │   3    │    4   │   6    │ 6-4-1 = 1         │  3×1=3 │   10   │
     * └──────┴────────┴────────┴────────┴───────────────────┴────────┴────────┘
     *
     * Maximum Area = 10 ✓
     *
     * Visual of largest rectangle (height=5, width=2):
     *
     *         ┌───┐
     *         │   │
     *     ╔═══╬═══╗
     *     ║ 5 ║ 6 ║       ┌───┐
     * ┌───╫───╫───╫───╫───┤   │
     * │   ║   ║   ║   ║   │   │
     * │ 2 ║ 1 ║   ║   ║ 2 │ 3 │
     * └───╨───╨═══╨═══╨───┴───┘
     *   0   1   2   3   4   5
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * EDGE CASES
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. Single bar: [5] → Area = 5
     * 2. All same height: [3,3,3] → Area = 3×3 = 9
     * 3. Ascending: [1,2,3] → Widths are 3,2,1, Max = 3×1 or 2×2 = 4
     * 4. Descending: [3,2,1] → Widths are 1,2,3, Max = 3×1 or 2×2 = 4
     * 5. Valley shape: [2,1,2] → Middle bar extends full width = 1×3 = 3
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Largest Rectangle in Histogram - OPTIMAL (Two Pass PLE/NLE)\n');

        const tests: Array<{ heights: number[]; expected: number; description: string }> = [
            {
                heights: [2, 1, 5, 6, 2, 3],
                expected: 10,
                description: "LeetCode Example 1"
            },
            {
                heights: [2, 4],
                expected: 4,
                description: "LeetCode Example 2"
            },
            {
                heights: [5],
                expected: 5,
                description: "Single bar"
            },
            {
                heights: [3, 3, 3],
                expected: 9,
                description: "All same height"
            },
            {
                heights: [1, 2, 3, 4, 5],
                expected: 9,
                description: "Ascending - max at height 3, width 3"
            },
            {
                heights: [5, 4, 3, 2, 1],
                expected: 9,
                description: "Descending - max at height 3, width 3"
            },
            {
                heights: [2, 1, 2],
                expected: 3,
                description: "Valley shape - middle extends full"
            },
            {
                heights: [1, 2, 3, 2, 1],
                expected: 6,
                description: "Mountain shape"
            },
            {
                heights: [0, 9],
                expected: 9,
                description: "Zero height bar"
            },
            {
                heights: [4, 2, 0, 3, 2, 5],
                expected: 6,
                description: "With zero in middle"
            },
            {
                heights: [2, 2, 2, 2],
                expected: 8,
                description: "All equal - 2×4=8"
            },
            {
                heights: [6, 2, 5, 4, 5, 1, 6],
                expected: 12,
                description: "Complex case"
            }
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

        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`Total Tests: ${tests.length}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log('═══════════════════════════════════════════════════════════════\n');

        if (failed === 0) {
            console.log('🎉 All tests passed! Largest Rectangle mastered! 🚀\n');
        }
    }
}

// Execute tests
LargestRectangleOptimal.runTests();