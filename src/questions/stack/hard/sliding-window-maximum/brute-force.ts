/**
 * 239. Sliding Window Maximum - BRUTE FORCE SOLUTION
 *
 * Approach: For each window, scan all k elements to find max
 * Time Complexity: O(n × k)
 * Space Complexity: O(1) - excluding output array
 *
 * KEY INSIGHT:
 * Simple approach - for each window position:
 * 1. Look at all k elements in the window
 * 2. Find the maximum
 * 3. Add to result
 *
 * Easy to understand, but slow for large k!
 */

namespace SlidingWindowMaxBruteForce {
    /**
     * Main function - Find maximum in each sliding window
     *
     * @param nums - Array of integers
     * @param k - Window size
     * @returns Array of maximum values for each window position
     */
    export function maxSlidingWindow(nums: number[], k: number): number[] {
        const n = nums.length;
        const result: number[] = [];

        // Edge Case: Array smaller than window (shouldn't happen per constraints)
        if (n === 0 || k === 0) return result;

        // Number of windows = n - k + 1
        // WHY: First window starts at 0, last window starts at n-k
        // EXAMPLE: n=8, k=3 → windows start at 0,1,2,3,4,5 → 6 windows
        const numWindows = n - k + 1;

        // Process each window
        for (let i = 0; i < numWindows; i++) {
            // Find maximum in current window [i, i+k-1]
            // WHY: Window starts at index i and contains k elements
            let windowMax = nums[i];

            // Scan all k elements in the window
            for (let j = i; j < i + k; j++) {
                windowMax = Math.max(windowMax, nums[j]);
            }

            // Add maximum to result
            result.push(windowMax);
        }

        return result;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
     *
     * n = 8, numWindows = 8 - 3 + 1 = 6
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * WINDOW BY WINDOW
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Window 0 (i=0): indices [0, 1, 2]
     *   ┌───────────────┐
     *   │[1   3  -1] -3   5   3   6   7
     *   └───────────────┘
     *   Elements: 1, 3, -1
     *   Max: 3 ✓
     *   Result: [3]
     *
     * Window 1 (i=1): indices [1, 2, 3]
     *       ┌───────────────┐
     *    1  │[3  -1  -3]  5   3   6   7
     *       └───────────────┘
     *   Elements: 3, -1, -3
     *   Max: 3 ✓
     *   Result: [3, 3]
     *
     * Window 2 (i=2): indices [2, 3, 4]
     *           ┌───────────────┐
     *    1   3  │[-1  -3   5]  3   6   7
     *           └───────────────┘
     *   Elements: -1, -3, 5
     *   Max: 5 ✓
     *   Result: [3, 3, 5]
     *
     * Window 3 (i=3): indices [3, 4, 5]
     *               ┌───────────────┐
     *    1   3  -1  │[-3   5   3]  6   7
     *               └───────────────┘
     *   Elements: -3, 5, 3
     *   Max: 5 ✓
     *   Result: [3, 3, 5, 5]
     *
     * Window 4 (i=4): indices [4, 5, 6]
     *                   ┌───────────────┐
     *    1   3  -1  -3  │[5   3   6]  7
     *                   └───────────────┘
     *   Elements: 5, 3, 6
     *   Max: 6 ✓
     *   Result: [3, 3, 5, 5, 6]
     *
     * Window 5 (i=5): indices [5, 6, 7]
     *                       ┌───────────────┐
     *    1   3  -1  -3   5  │[3   6   7]
     *                       └───────────────┘
     *   Elements: 3, 6, 7
     *   Max: 7 ✓
     *   Result: [3, 3, 5, 5, 6, 7]
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * SUMMARY TABLE
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * ┌─────────┬─────────────────┬─────────────────┬─────────┐
     * │ Window  │    Indices      │    Elements     │   Max   │
     * ├─────────┼─────────────────┼─────────────────┼─────────┤
     * │    0    │    [0, 1, 2]    │   [1, 3, -1]    │    3    │
     * │    1    │    [1, 2, 3]    │   [3, -1, -3]   │    3    │
     * │    2    │    [2, 3, 4]    │   [-1, -3, 5]   │    5    │
     * │    3    │    [3, 4, 5]    │   [-3, 5, 3]    │    5    │
     * │    4    │    [4, 5, 6]    │   [5, 3, 6]     │    6    │
     * │    5    │    [5, 6, 7]    │   [3, 6, 7]     │    7    │
     * └─────────┴─────────────────┴─────────────────┴─────────┘
     *
     * Final Result: [3, 3, 5, 5, 6, 7] ✓
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * WHY O(n × k)?
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * - Number of windows: O(n - k + 1) ≈ O(n)
     * - For each window: scan k elements → O(k)
     * - Total: O(n × k)
     *
     * For n = 10^5, k = 10^4:
     *   Operations ≈ 10^5 × 10^4 = 10^9
     *   Too slow! TLE!
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * THE PROBLEM WITH BRUTE FORCE
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Window slides by 1 position, but we rescan ALL k elements:
     *
     *   Window 1: [3, -1, -3] → scan all 3, max = 3
     *   Window 2: [-1, -3, 5] → scan all 3, max = 5
     *
     * We already know -1 and -3 from previous window!
     * We're doing redundant work.
     *
     * Optimal solution remembers "potential maximums" to avoid rescanning.
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * EDGE CASES
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. k = 1: Each element is its own max
     *    nums = [1, 3, -1] → [1, 3, -1]
     *
     * 2. k = n: Single window containing all elements
     *    nums = [1, 3, -1], k = 3 → [3]
     *
     * 3. Strictly decreasing: [5, 4, 3, 2, 1], k = 2
     *    → [5, 4, 3, 2] (first element of each window is max)
     *
     * 4. Strictly increasing: [1, 2, 3, 4, 5], k = 2
     *    → [2, 3, 4, 5] (last element of each window is max)
     *
     * 5. All same: [3, 3, 3, 3], k = 2
     *    → [3, 3, 3]
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Sliding Window Maximum - BRUTE FORCE\n');

        const tests: Array<{ nums: number[]; k: number; expected: number[]; description: string }> = [
            {
                nums: [1, 3, -1, -3, 5, 3, 6, 7],
                k: 3,
                expected: [3, 3, 5, 5, 6, 7],
                description: "LeetCode Example 1"
            },
            {
                nums: [1],
                k: 1,
                expected: [1],
                description: "Single element"
            },
            {
                nums: [9, 11],
                k: 2,
                expected: [11],
                description: "Two elements, window = 2"
            },
            {
                nums: [4, 3, 2, 1],
                k: 2,
                expected: [4, 3, 2],
                description: "Strictly decreasing"
            },
            {
                nums: [1, 2, 3, 4],
                k: 2,
                expected: [2, 3, 4],
                description: "Strictly increasing"
            },
            {
                nums: [3, 3, 3, 3],
                k: 2,
                expected: [3, 3, 3],
                description: "All same elements"
            },
            {
                nums: [1, 3, 1, 2, 0, 5],
                k: 3,
                expected: [3, 3, 2, 5],
                description: "Mixed values"
            },
            {
                nums: [7, 2, 4],
                k: 2,
                expected: [7, 4],
                description: "Peak at start"
            },
            {
                nums: [1, -1],
                k: 1,
                expected: [1, -1],
                description: "Window size 1"
            },
            {
                nums: [5, 4, 3, 2, 1],
                k: 5,
                expected: [5],
                description: "Window = array length"
            },
            {
                nums: [-7, -8, 7, 5, 7, 1, 6, 0],
                k: 4,
                expected: [7, 7, 7, 7, 7],
                description: "Negative and positive"
            },
            {
                nums: [1, 3, -1, -3, 5, 3, 6, 7],
                k: 1,
                expected: [1, 3, -1, -3, 5, 3, 6, 7],
                description: "k=1 returns original array"
            }
        ];

        let passed = 0;
        let failed = 0;

        tests.forEach((test, index) => {
            const result = maxSlidingWindow(test.nums, test.k);
            const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);
            const status = isEqual ? '✅ PASS' : '❌ FAIL';

            if (isEqual) {
                passed++;
            } else {
                failed++;
            }

            console.log(`Test ${index + 1}: ${status}`);
            console.log(`  Description: ${test.description}`);
            console.log(`  Input:       nums = [${test.nums.join(', ')}], k = ${test.k}`);
            console.log(`  Expected:    [${test.expected.join(', ')}]`);
            console.log(`  Got:         [${result.join(', ')}]`);
            console.log();
        });

        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`Total Tests: ${tests.length}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log('═══════════════════════════════════════════════════════════════\n');

        if (failed === 0) {
            console.log('🎉 All tests passed! Brute Force understood! 🚀\n');
            console.log('⚠️  Note: This solution will TLE for large inputs (n=10^5, k=10^4).\n');
        }
    }
}

// Execute tests
SlidingWindowMaxBruteForce.runTests();