/**
 * 85. Maximal Rectangle - BRUTE FORCE SOLUTION
 *
 * Approach: Check Every Possible Rectangle
 * Time Complexity: O(m² × n² × m × n) = O(m³ × n³)
 * Space Complexity: O(1)
 *
 * KEY INSIGHT:
 * A rectangle is defined by:
 * - Top-left corner (r1, c1)
 * - Bottom-right corner (r2, c2)
 *
 * For each possible rectangle, check if ALL cells are '1'.
 * If yes, calculate area and track maximum.
 *
 * Simple to understand, but VERY slow!
 */

namespace MaximalRectangleBruteForce {
    /**
     * Main function - Find largest rectangle of '1's
     *
     * @param matrix - Binary matrix of '0' and '1'
     * @returns Maximum rectangle area
     */
    export function maximalRectangle(matrix: string[][]): number {
        // Edge Case: Empty matrix
        if (matrix.length === 0 || matrix[0].length === 0) return 0;

        const m = matrix.length;    // rows
        const n = matrix[0].length; // columns
        let maxArea = 0;

        // Try every possible top-left corner (r1, c1)
        // WHY: Rectangle must start somewhere!
        for (let r1 = 0; r1 < m; r1++) {
            for (let c1 = 0; c1 < n; c1++) {

                // Optimization: Skip if starting cell is '0'
                // WHY: Rectangle of '1's can't start with '0'
                if (matrix[r1][c1] === '0') continue;

                // Try every possible bottom-right corner (r2, c2)
                // WHY: r2 >= r1 and c2 >= c1 (bottom-right is below and right of top-left)
                for (let r2 = r1; r2 < m; r2++) {
                    for (let c2 = c1; c2 < n; c2++) {

                        // Check if this rectangle contains only '1's
                        if (isAllOnes(matrix, r1, c1, r2, c2)) {
                            // Calculate area
                            const height = r2 - r1 + 1;
                            const width = c2 - c1 + 1;
                            const area = height * width;

                            // Track maximum
                            maxArea = Math.max(maxArea, area);
                        }
                    }
                }
            }
        }

        return maxArea;
    }

    /**
     * Helper function - Check if rectangle contains only '1's
     *
     * @param matrix - The binary matrix
     * @param r1, c1 - Top-left corner
     * @param r2, c2 - Bottom-right corner
     * @returns true if all cells are '1'
     */
    function isAllOnes(
        matrix: string[][],
        r1: number, c1: number,
        r2: number, c2: number
    ): boolean {
        // Scan every cell in the rectangle
        for (let r = r1; r <= r2; r++) {
            for (let c = c1; c <= c2; c++) {
                if (matrix[r][c] === '0') {
                    return false; // Found a '0', not valid
                }
            }
        }
        return true; // All cells are '1'
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
     * Visual representation:
     *
     *       c0  c1  c2  c3  c4
     *     ┌───┬───┬───┬───┬───┐
     * r0  │ 1 │ 0 │ 1 │ 0 │ 0 │
     *     ├───┼───┼───┼───┼───┤
     * r1  │ 1 │ 0 │ 1 │ 1 │ 1 │
     *     ├───┼───┼───┼───┼───┤
     * r2  │ 1 │ 1 │ 1 │ 1 │ 1 │
     *     ├───┼───┼───┼───┼───┤
     * r3  │ 1 │ 0 │ 0 │ 1 │ 0 │
     *     └───┴───┴───┴───┴───┘
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * ALGORITHM FLOW
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * For each top-left corner (r1, c1):
     *   For each bottom-right corner (r2, c2):
     *     Check if rectangle is all '1's
     *     If yes, calculate area
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * SELECTED ITERATIONS (showing key rectangles found)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Top-left (0,0):
     *   (0,0) to (0,0): [1] → area = 1 ✓
     *   (0,0) to (1,0): [1,1] → area = 2 ✓
     *   (0,0) to (2,0): [1,1,1] → area = 3 ✓
     *   (0,0) to (3,0): [1,1,1,1] → area = 4 ✓
     *   (0,0) to (0,1): contains '0' ✗
     *   ... and so on
     *
     * Top-left (1,2):
     *   (1,2) to (1,2): [1] → area = 1 ✓
     *   (1,2) to (1,3): [1,1] → area = 2 ✓
     *   (1,2) to (1,4): [1,1,1] → area = 3 ✓
     *   (1,2) to (2,2): [1,1] → area = 2 ✓
     *   (1,2) to (2,3): [1,1,1,1] → area = 4 ✓
     *   (1,2) to (2,4): [1,1,1,1,1,1] → area = 6 ✓ ← Maximum!
     *
     *     ┌───┬───┬───┬───┬───┐
     * r0  │ 1 │ 0 │ 1 │ 0 │ 0 │
     *     ├───┼───┼───┼───┼───┤
     * r1  │ 1 │ 0 │╔══╤═══╤══╗│
     *     ├───┼───┼║──┼───┼──║┤
     * r2  │ 1 │ 1 │║1 │ 1 │ 1║│  ← The 2×3 rectangle
     *     ├───┼───┼╚══╧═══╧══╝┤
     * r3  │ 1 │ 0 │ 0 │ 1 │ 0 │
     *     └───┴───┴───┴───┴───┘
     *
     * Top-left (2,0):
     *   (2,0) to (2,4): [1,1,1,1,1] → area = 5 ✓
     *   ... but this is less than 6
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * WHY SO SLOW? TIME COMPLEXITY BREAKDOWN
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. Choose top-left corner (r1, c1):
     *    - r1 can be 0 to m-1 → O(m) choices
     *    - c1 can be 0 to n-1 → O(n) choices
     *    - Total: O(m × n) top-left corners
     *
     * 2. Choose bottom-right corner (r2, c2):
     *    - r2 can be r1 to m-1 → O(m) choices
     *    - c2 can be c1 to n-1 → O(n) choices
     *    - Total: O(m × n) bottom-right corners
     *
     * 3. Check if rectangle is all '1's:
     *    - Scan all cells in rectangle
     *    - Worst case: O(m × n) cells
     *
     * Total: O(m × n) × O(m × n) × O(m × n) = O(m³ × n³)
     *
     * For a 200×200 matrix:
     *   200³ × 200³ = 8×10⁶ × 8×10⁶ = 6.4×10¹³ operations!
     *   WAY too slow!
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * OPTIMIZATION ATTEMPT (Still Brute Force)
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * We can optimize isAllOnes check:
     * - If we know rectangle (r1,c1)→(r2,c2) is all '1's
     * - And we want to check (r1,c1)→(r2,c2+1)
     * - We only need to check the new column!
     *
     * But this is still O(m² × n²) which is too slow for large inputs.
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * EDGE CASES
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. Empty matrix: [] → return 0
     * 2. All zeros: [["0","0"],["0","0"]] → return 0
     * 3. All ones: [["1","1"],["1","1"]] → return 4
     * 4. Single cell '1': [["1"]] → return 1
     * 5. Single cell '0': [["0"]] → return 0
     * 6. Single row: [["1","1","0","1"]] → return 2
     * 7. Single column: [["1"],["1"],["0"],["1"]] → return 2
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Maximal Rectangle - BRUTE FORCE\n');

        const tests: Array<{ matrix: string[][]; expected: number; description: string }> = [
            {
                matrix: [
                    ["1","0","1","0","0"],
                    ["1","0","1","1","1"],
                    ["1","1","1","1","1"],
                    ["1","0","0","1","0"]
                ],
                expected: 6,
                description: "LeetCode Example 1"
            },
            {
                matrix: [["0"]],
                expected: 0,
                description: "Single zero"
            },
            {
                matrix: [["1"]],
                expected: 1,
                description: "Single one"
            },
            {
                matrix: [],
                expected: 0,
                description: "Empty matrix"
            },
            {
                matrix: [
                    ["1","1"],
                    ["1","1"]
                ],
                expected: 4,
                description: "All ones 2x2"
            },
            {
                matrix: [
                    ["0","0"],
                    ["0","0"]
                ],
                expected: 0,
                description: "All zeros"
            },
            {
                matrix: [["1","1","1","1"]],
                expected: 4,
                description: "Single row of ones"
            },
            {
                matrix: [["1"],["1"],["1"],["1"]],
                expected: 4,
                description: "Single column of ones"
            },
            {
                matrix: [
                    ["1","0","1","1","1"],
                    ["0","1","0","1","0"],
                    ["1","1","0","1","1"],
                    ["1","1","0","1","1"],
                    ["0","1","1","1","1"]
                ],
                expected: 6,
                description: "Complex pattern"
            },
            {
                matrix: [
                    ["0","1"],
                    ["1","0"]
                ],
                expected: 1,
                description: "Diagonal ones"
            },
            {
                matrix: [
                    ["1","1","1"],
                    ["1","1","1"],
                    ["1","1","1"]
                ],
                expected: 9,
                description: "All ones 3x3"
            },
            {
                matrix: [
                    ["1","0","1","0","1"],
                    ["1","0","1","0","1"],
                    ["1","0","1","0","1"]
                ],
                expected: 3,
                description: "Striped pattern (vertical)"
            }
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
            console.log(`  Matrix size: ${test.matrix.length}×${test.matrix[0]?.length || 0}`);
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
            console.log('⚠️  Note: This solution will TLE on large inputs (200×200).\n');
        }
    }
}

// Execute tests
MaximalRectangleBruteForce.runTests();