/**
 * 84. Largest Rectangle in Histogram - BRUTE FORCE SOLUTION
 *
 * Approach: Expand Left and Right for Each Bar
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * KEY INSIGHT:
 * For each bar, treat it as the HEIGHT of a rectangle.
 * Then find how far LEFT and RIGHT it can extend.
 * The bar can extend as long as neighboring bars are >= its height.
 *
 * Simple but slow - TLE on large inputs!
 */

namespace LargestRectangleBruteForce {
    /**
     * Main function - Find largest rectangle area in histogram
     *
     * @param heights - Array of bar heights
     * @returns Maximum rectangle area
     */
    export function largestRectangleArea(heights: number[]): number {
        const n = heights.length;
        let maxArea = 0;

        // For each bar, calculate the maximum rectangle with that bar's height
        // WHY: Every possible rectangle has SOME bar as its minimum height
        // By checking each bar, we cover all possibilities
        for (let i = 0; i < n; i++) {
            const height = heights[i];

            // Expand LEFT: Find how far left we can extend
            // WHY: We can include bars that are >= current height
            // STOP: When we hit a shorter bar or boundary
            let left = i;
            while (left > 0 && heights[left - 1] >= height) {
                left--;
            }

            // Expand RIGHT: Find how far right we can extend
            // WHY: We can include bars that are >= current height
            // STOP: When we hit a shorter bar or boundary
            let right = i;
            while (right < n - 1 && heights[right + 1] >= height) {
                right++;
            }

            // Calculate width and area
            // WHY: Width = number of bars from left to right (inclusive)
            // EXAMPLE: left=2, right=4 → width = 4-2+1 = 3 bars
            const width = right - left + 1;
            const area = height * width;

            // Track maximum
            maxArea = Math.max(maxArea, area);
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
     * ITERATION BY ITERATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * i=0, height=2:
     *   Expand LEFT:
     *     left=0, check left-1=-1 → boundary, stop
     *     left = 0
     *   Expand RIGHT:
     *     right=0, check heights[1]=1 >= 2? NO → stop
     *     right = 0
     *   Width = 0 - 0 + 1 = 1
     *   Area = 2 × 1 = 2
     *   maxArea = 2
     *
     * i=1, height=1:
     *   Expand LEFT:
     *     left=1, check heights[0]=2 >= 1? YES → left=0
     *     left=0, check left-1=-1 → boundary, stop
     *     left = 0
     *   Expand RIGHT:
     *     right=1, check heights[2]=5 >= 1? YES → right=2
     *     right=2, check heights[3]=6 >= 1? YES → right=3
     *     right=3, check heights[4]=2 >= 1? YES → right=4
     *     right=4, check heights[5]=3 >= 1? YES → right=5
     *     right=5, check right+1=6 → boundary, stop
     *     right = 5
     *   Width = 5 - 0 + 1 = 6
     *   Area = 1 × 6 = 6
     *   maxArea = 6
     *
     * i=2, height=5:
     *   Expand LEFT:
     *     left=2, check heights[1]=1 >= 5? NO → stop
     *     left = 2
     *   Expand RIGHT:
     *     right=2, check heights[3]=6 >= 5? YES → right=3
     *     right=3, check heights[4]=2 >= 5? NO → stop
     *     right = 3
     *   Width = 3 - 2 + 1 = 2
     *   Area = 5 × 2 = 10 ✓
     *   maxArea = 10
     *
     * i=3, height=6:
     *   Expand LEFT:
     *     left=3, check heights[2]=5 >= 6? NO → stop
     *     left = 3
     *   Expand RIGHT:
     *     right=3, check heights[4]=2 >= 6? NO → stop
     *     right = 3
     *   Width = 3 - 3 + 1 = 1
     *   Area = 6 × 1 = 6
     *   maxArea = 10
     *
     * i=4, height=2:
     *   Expand LEFT:
     *     left=4, check heights[3]=6 >= 2? YES → left=3
     *     left=3, check heights[2]=5 >= 2? YES → left=2
     *     left=2, check heights[1]=1 >= 2? NO → stop
     *     left = 2
     *   Expand RIGHT:
     *     right=4, check heights[5]=3 >= 2? YES → right=5
     *     right=5, check right+1=6 → boundary, stop
     *     right = 5
     *   Width = 5 - 2 + 1 = 4
     *   Area = 2 × 4 = 8
     *   maxArea = 10
     *
     * i=5, height=3:
     *   Expand LEFT:
     *     left=5, check heights[4]=2 >= 3? NO → stop
     *     left = 5
     *   Expand RIGHT:
     *     right=5, check right+1=6 → boundary, stop
     *     right = 5
     *   Width = 5 - 5 + 1 = 1
     *   Area = 3 × 1 = 3
     *   maxArea = 10
     *
     * Final maxArea = 10 ✓
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * SUMMARY TABLE
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * ┌───────┬────────┬──────┬───────┬───────┬──────┬─────────┐
     * │   i   │ height │ left │ right │ width │ area │ maxArea │
     * ├───────┼────────┼──────┼───────┼───────┼──────┼─────────┤
     * │   0   │   2    │  0   │   0   │   1   │   2  │    2    │
     * │   1   │   1    │  0   │   5   │   6   │   6  │    6    │
     * │   2   │   5    │  2   │   3   │   2   │  10  │   10    │
     * │   3   │   6    │  3   │   3   │   1   │   6  │   10    │
     * │   4   │   2    │  2   │   5   │   4   │   8  │   10    │
     * │   5   │   3    │  5   │   5   │   1   │   3  │   10    │
     * └───────┴────────┴──────┴───────┴───────┴──────┴─────────┘
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * WHY O(n²)?
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * For each bar (n bars), we potentially scan all other bars:
     * - Left expansion: Up to i elements
     * - Right expansion: Up to (n-i-1) elements
     *
     * Worst case (all same height):
     *   heights = [3, 3, 3, 3, 3]
     *   Every bar expands to full width!
     *   Each iteration: O(n) work
     *   Total: O(n) × O(n) = O(n²)
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * EDGE CASES
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. Single bar: [5] → left=0, right=0, area=5
     * 2. All same: [3,3,3] → Each bar expands fully, area=9
     * 3. Ascending: [1,2,3] → Largest is at end or middle extension
     * 4. Descending: [3,2,1] → Largest is at start or middle extension
     * 5. Valley: [2,1,2] → Middle bar extends full width
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Largest Rectangle in Histogram - BRUTE FORCE\n');

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
                description: "Ascending"
            },
            {
                heights: [5, 4, 3, 2, 1],
                expected: 9,
                description: "Descending"
            },
            {
                heights: [2, 1, 2],
                expected: 3,
                description: "Valley shape"
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
                description: "All equal"
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
            console.log('🎉 All tests passed! Brute Force understood! 🚀\n');
        }
    }
}

// Execute tests
LargestRectangleBruteForce.runTests();