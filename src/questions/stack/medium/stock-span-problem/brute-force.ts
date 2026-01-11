/**
 * Stock Span Problem - BRUTE FORCE SOLUTION
 *
 * Approach: For each day, look back and count consecutive smaller/equal days
 * Time Complexity: O(n²)
 * Space Complexity: O(1) - excluding output array
 *
 * KEY INSIGHT:
 * For each day i:
 * - Start from day i-1 and go backwards
 * - Count consecutive days where price <= current day's price
 * - Stop when you find a day with higher price (or reach beginning)
 *
 * Simple but slow!
 */

namespace StockSpanBruteForce {
    /**
     * Main function - Calculate stock span for each day
     *
     * @param arr - Array of stock prices
     * @returns Array of spans for each day
     */
    export function stockSpan(arr: number[]): number[] {
        const n = arr.length;
        const span: number[] = [];

        // For each day, calculate its span
        for (let i = 0; i < n; i++) {
            // Start with count = 1 (current day is always included)
            let count = 1;

            // Look back at previous days
            // WHY j = i - 1? Start from the day just before current
            let j = i - 1;

            // Count consecutive days with price <= current price
            // WHY <=? Because span includes days with smaller OR EQUAL price
            while (j >= 0 && arr[j] <= arr[i]) {
                count++;
                j--;
            }

            // Store span for day i
            span.push(count);
        }

        return span;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example: arr = [120, 100, 60, 80, 90, 110, 115]
     *                   0    1   2   3   4    5    6
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * DAY BY DAY ANALYSIS
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Day 0, price = 120:
     *   count = 1 (current day)
     *   j = -1 (no previous days)
     *   While loop doesn't run
     *   span[0] = 1
     *
     *   Visual:
     *   [120]
     *     ↑
     *   span=1
     *
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * Day 1, price = 100:
     *   count = 1
     *   j = 0: arr[0]=120 <= 100? NO (120 > 100)
     *   While loop stops immediately
     *   span[1] = 1
     *
     *   Visual:
     *   [120, 100]
     *     ×    ↑
     *   blocked span=1
     *
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * Day 2, price = 60:
     *   count = 1
     *   j = 1: arr[1]=100 <= 60? NO (100 > 60)
     *   While loop stops immediately
     *   span[2] = 1
     *
     *   Visual:
     *   [120, 100, 60]
     *          ×   ↑
     *      blocked span=1
     *
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * Day 3, price = 80:
     *   count = 1
     *   j = 2: arr[2]=60 <= 80? YES! count=2, j=1
     *   j = 1: arr[1]=100 <= 80? NO (100 > 80)
     *   While loop stops
     *   span[3] = 2
     *
     *   Visual:
     *   [120, 100, 60, 80]
     *          ×   ✓   ↑
     *      blocked    span=2
     *
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * Day 4, price = 90:
     *   count = 1
     *   j = 3: arr[3]=80 <= 90? YES! count=2, j=2
     *   j = 2: arr[2]=60 <= 90? YES! count=3, j=1
     *   j = 1: arr[1]=100 <= 90? NO (100 > 90)
     *   While loop stops
     *   span[4] = 3
     *
     *   Visual:
     *   [120, 100, 60, 80, 90]
     *          ×   ✓   ✓   ↑
     *      blocked        span=3
     *
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * Day 5, price = 110:
     *   count = 1
     *   j = 4: arr[4]=90 <= 110? YES! count=2, j=3
     *   j = 3: arr[3]=80 <= 110? YES! count=3, j=2
     *   j = 2: arr[2]=60 <= 110? YES! count=4, j=1
     *   j = 1: arr[1]=100 <= 110? YES! count=5, j=0
     *   j = 0: arr[0]=120 <= 110? NO (120 > 110)
     *   While loop stops
     *   span[5] = 5
     *
     *   Visual:
     *   [120, 100, 60, 80, 90, 110]
     *     ×    ✓   ✓   ✓   ✓    ↑
     *  blocked                span=5
     *
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * Day 6, price = 115:
     *   count = 1
     *   j = 5: arr[5]=110 <= 115? YES! count=2, j=4
     *   j = 4: arr[4]=90 <= 115? YES! count=3, j=3
     *   j = 3: arr[3]=80 <= 115? YES! count=4, j=2
     *   j = 2: arr[2]=60 <= 115? YES! count=5, j=1
     *   j = 1: arr[1]=100 <= 115? YES! count=6, j=0
     *   j = 0: arr[0]=120 <= 115? NO (120 > 115)
     *   While loop stops
     *   span[6] = 6
     *
     *   Visual:
     *   [120, 100, 60, 80, 90, 110, 115]
     *     ×    ✓   ✓   ✓   ✓    ✓    ↑
     *  blocked                     span=6
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * FINAL OUTPUT: [1, 1, 1, 2, 3, 5, 6] ✓
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * WHY O(n²)?
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Worst case: Strictly increasing array [1, 2, 3, 4, 5]
     *
     * Day 0: Look back 0 times
     * Day 1: Look back 1 time
     * Day 2: Look back 2 times
     * Day 3: Look back 3 times
     * Day 4: Look back 4 times
     *
     * Total: 0 + 1 + 2 + 3 + 4 = n(n-1)/2 = O(n²)
     *
     * For n = 10^5: ~5 × 10^9 operations → TLE!
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * EDGE CASES
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. All increasing: [1, 2, 3, 4, 5]
     *    Each day looks back to all previous days
     *    span = [1, 2, 3, 4, 5]
     *
     * 2. All decreasing: [5, 4, 3, 2, 1]
     *    Each day is blocked by previous day
     *    span = [1, 1, 1, 1, 1]
     *
     * 3. All same: [3, 3, 3, 3]
     *    Each day can look back to all previous (<=)
     *    span = [1, 2, 3, 4]
     *
     * 4. Single element: [10]
     *    span = [1]
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Stock Span Problem - BRUTE FORCE\n');

        const tests: Array<{ arr: number[]; expected: number[]; description: string }> = [
            {
                arr: [120, 100, 60, 80, 90, 110, 115],
                expected: [1, 1, 1, 2, 3, 5, 6],
                description: "Example 1"
            },
            {
                arr: [15, 13, 12, 14, 16, 20],
                expected: [1, 1, 1, 3, 5, 6],
                description: "Example 2"
            },
            {
                arr: [10],
                expected: [1],
                description: "Single element"
            },
            {
                arr: [5, 10],
                expected: [1, 2],
                description: "Two elements - increasing"
            },
            {
                arr: [10, 5],
                expected: [1, 1],
                description: "Two elements - decreasing"
            },
            {
                arr: [1, 2, 3, 4, 5],
                expected: [1, 2, 3, 4, 5],
                description: "Strictly increasing"
            },
            {
                arr: [5, 4, 3, 2, 1],
                expected: [1, 1, 1, 1, 1],
                description: "Strictly decreasing"
            },
            {
                arr: [3, 3, 3, 3],
                expected: [1, 2, 3, 4],
                description: "All same elements"
            },
            {
                arr: [100, 80, 60, 70, 60, 75, 85],
                expected: [1, 1, 1, 2, 1, 4, 6],
                description: "Mixed pattern"
            },
            {
                arr: [10, 4, 5, 90, 120, 80],
                expected: [1, 1, 2, 4, 5, 1],
                description: "Peak in middle"
            },
            {
                arr: [31, 27, 14, 21, 30, 22],
                expected: [1, 1, 1, 2, 4, 1],
                description: "Another pattern"
            },
            {
                arr: [50, 50, 50, 50, 50],
                expected: [1, 2, 3, 4, 5],
                description: "All equal (tests <=)"
            }
        ];

        let passed = 0;
        let failed = 0;

        tests.forEach((test, index) => {
            const result = stockSpan(test.arr);
            const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);
            const status = isEqual ? '✅ PASS' : '❌ FAIL';

            if (isEqual) {
                passed++;
            } else {
                failed++;
            }

            console.log(`Test ${index + 1}: ${status}`);
            console.log(`  Description: ${test.description}`);
            console.log(`  Input:       [${test.arr.join(', ')}]`);
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
            console.log('⚠️  Note: This solution will TLE for large inputs.\n');
        }
    }
}

// Execute tests
StockSpanBruteForce.runTests();