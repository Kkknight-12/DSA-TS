/**
 * 2104. Sum of Subarray Ranges - OPTIMAL SOLUTION
 *
 * Approach: Contribution Technique with Monotonic Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * KEY INSIGHT:
 * Sum of Ranges = Sum of (max - min) for all subarrays
 *               = Sum of all max - Sum of all min
 *               = sumOfMaximums() - sumOfMinimums()
 *
 * We apply contribution technique TWICE:
 * 1. Find sum of maximums using PGE/NGE
 * 2. Find sum of minimums using PLE/NLE
 * 3. Subtract!
 */

namespace SumOfSubarrayRangesOptimal {
    /**
     * Main function - Calculate sum of all subarray ranges
     */
    export function subArrayRanges(nums: number[]): number {
        const n = nums.length;

        // Edge Case: Single element has range 0
        // WHY: max - min = nums[0] - nums[0] = 0
        if (n === 1) return 0;

        // Calculate sum of maximums across all subarrays
        // WHY: We need this to calculate range = max - min
        const sumMax = sumOfMaximums(nums);

        // Calculate sum of minimums across all subarrays
        // WHY: We need this to calculate range = max - min
        const sumMin = sumOfMinimums(nums);

        // Sum of ranges = Sum of (max - min) = Sum of max - Sum of min
        // EXAMPLE: [1,2,3] → sumMax=14, sumMin=10 → 14-10=4
        return sumMax - sumMin;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * PART 1: SUM OF MAXIMUMS
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * For each element, find: "In how many subarrays is it the MAXIMUM?"
     *
     * Boundaries:
     * - PGE (Previous Greater Element) - left boundary
     * - NGE (Next Greater Element) - right boundary
     *
     * Key Difference from minimums:
     * - Use MONOTONIC DECREASING stack (instead of increasing)
     * - Look for GREATER elements (instead of smaller)
     */
    function sumOfMaximums(nums: number[]): number {
        const n = nums.length;

        // Find PGE (Previous Greater Element) for each index
        // WHY: Defines left boundary where element stops being maximum
        const pge = findPreviousGreaterElement(nums);

        // Find NGE (Next Greater Element) for each index
        // WHY: Defines right boundary where element stops being maximum
        const nge = findNextGreaterElement(nums);

        let sum = 0;

        // Calculate contribution of each element as maximum
        for (let i = 0; i < n; i++) {
            // How many positions can start the subarray (to left of i)?
            // WHY: Can start from any index AFTER PGE up to i
            // EXAMPLE: If PGE=-1 and i=2, leftCount = 2-(-1) = 3 (indices 0,1,2)
            const leftCount = i - pge[i];

            // How many positions can end the subarray (to right of i)?
            // WHY: Can end at i or any index BEFORE NGE
            // EXAMPLE: If NGE=4 and i=1, rightCount = 4-1 = 3 (indices 1,2,3)
            const rightCount = nge[i] - i;

            // Total subarrays where nums[i] is maximum
            const subarrayCount = leftCount * rightCount;

            // Contribution = value × count
            // EXAMPLE: nums[i]=5, count=6 → contribution = 30
            sum += nums[i] * subarrayCount;
        }

        return sum;
    }

    /**
     * Find Previous Greater Element (PGE) for each index
     *
     * CONCEPT: For nums[i], find closest index j (j < i) where nums[j] > nums[i]
     *
     * POP CONDITION: pop if stack.top <= current
     * RESULT: Finds STRICTLY GREATER elements (excludes equal)
     *
     * WHY <= ? Because we want to exclude equal elements.
     * If nums[j] == nums[i], we pop it (don't consider equal as "greater")
     */
    function findPreviousGreaterElement(nums: number[]): number[] {
        const n = nums.length;
        const pge: number[] = new Array(n);
        const stack: number[] = []; // Stores INDICES (monotonic decreasing by value)

        // Traverse LEFT to RIGHT
        for (let i = 0; i < n; i++) {
            // Pop elements that are <= current
            // POP if <=  →  KEEP only >  →  Result: STRICTLY GREATER
            // This handles duplicates - equal elements get popped!
            while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
                stack.pop();
            }

            // If stack empty → no previous greater element
            // WHY: All elements to left are <= nums[i]
            pge[i] = stack.length === 0 ? -1 : stack[stack.length - 1];

            // Push current index
            // WHY: Might be PGE for future elements
            stack.push(i);
        }

        return pge;
    }

    /**
     * Find Next Greater Element (NGE) for each index
     *
     * CONCEPT: For nums[i], find closest index j (j > i) where nums[j] >= nums[i]
     *
     * POP CONDITION: pop if stack.top < current
     * RESULT: Finds GREATER OR EQUAL elements (includes equal)
     *
     * DUPLICATE HANDLING:
     * - PGE uses <= (excludes equal) → STRICT
     * - NGE uses <  (includes equal) → NON-STRICT
     * - This ensures rightmost duplicate owns subarrays with all duplicates
     */
    function findNextGreaterElement(nums: number[]): number[] {
        const n = nums.length;
        const nge: number[] = new Array(n);
        const stack: number[] = []; // Stores INDICES (monotonic decreasing by value)

        // Traverse RIGHT to LEFT
        for (let i = n - 1; i >= 0; i--) {
            // Pop elements that are < current
            // POP if <  →  KEEP >=  →  Result: GREATER OR EQUAL
            // Equal elements stay in stack (not popped)
            while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
                stack.pop();
            }

            // If stack empty → no next greater or equal element
            nge[i] = stack.length === 0 ? n : stack[stack.length - 1];

            // Push current index
            stack.push(i);
        }

        return nge;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * PART 2: SUM OF MINIMUMS
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * This is EXACTLY the same as "Sum of Subarray Minimums" problem!
     *
     * For each element, find: "In how many subarrays is it the MINIMUM?"
     *
     * Boundaries:
     * - PLE (Previous Less Element) - left boundary
     * - NLE (Next Less Element) - right boundary
     */
    function sumOfMinimums(nums: number[]): number {
        const n = nums.length;

        // Find PLE (Previous Less Element)
        const ple = findPreviousLessElement(nums);

        // Find NLE (Next Less Element)
        const nle = findNextLessElement(nums);

        let sum = 0;

        // Calculate contribution of each element as minimum
        for (let i = 0; i < n; i++) {
            const leftCount = i - ple[i];
            const rightCount = nle[i] - i;
            const subarrayCount = leftCount * rightCount;

            sum += nums[i] * subarrayCount;
        }

        return sum;
    }

    /**
     * Find Previous Less Element (PLE)
     *
     * POP CONDITION: pop if stack.top >= current
     * RESULT: Finds STRICTLY LESS elements (excludes equal)
     *
     * WHY >= ? Because we want to exclude equal elements.
     * POP if >=  →  KEEP only <  →  Result: STRICTLY LESS
     */
    function findPreviousLessElement(nums: number[]): number[] {
        const n = nums.length;
        const ple: number[] = new Array(n);
        const stack: number[] = []; // Monotonic increasing

        for (let i = 0; i < n; i++) {
            // POP if >=  →  KEEP only <  →  Result: STRICTLY LESS
            // Equal elements get popped (excluded)
            while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
                stack.pop();
            }

            ple[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
            stack.push(i);
        }

        return ple;
    }

    /**
     * Find Next Less Element (NLE)
     *
     * POP CONDITION: pop if stack.top > current
     * RESULT: Finds LESS OR EQUAL elements (includes equal)
     *
     * DUPLICATE HANDLING:
     * - PLE uses >= (excludes equal) → STRICT
     * - NLE uses >  (includes equal) → NON-STRICT
     * - This ensures rightmost duplicate owns subarrays with all duplicates
     */
    function findNextLessElement(nums: number[]): number[] {
        const n = nums.length;
        const nle: number[] = new Array(n);
        const stack: number[] = []; // Monotonic increasing

        for (let i = n - 1; i >= 0; i--) {
            // POP if >  →  KEEP <=  →  Result: LESS OR EQUAL
            // Equal elements stay in stack (not popped)
            while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
                stack.pop();
            }

            nle[i] = stack.length === 0 ? n : stack[stack.length - 1];
            stack.push(i);
        }

        return nle;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example: nums = [1, 2, 3]
     *                 0  1  2
     *
     * Expected Output: 4
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * STEP 1: CALCULATE SUM OF MAXIMUMS
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Find PGE (Previous Greater Element):
     * ────────────────────────────────────
     * i=0, nums[0]=1: No greater to left → PGE = -1
     * i=1, nums[1]=2: No greater to left (1 < 2) → PGE = -1
     * i=2, nums[2]=3: No greater to left (2 < 3) → PGE = -1
     *
     * PGE = [-1, -1, -1]
     *
     * Find NGE (Next Greater Element):
     * ────────────────────────────────────
     * i=2, nums[2]=3: No greater to right → NGE = 3
     * i=1, nums[1]=2: nums[2]=3 > 2 → NGE = 2
     * i=0, nums[0]=1: nums[1]=2 > 1 → NGE = 1
     *
     * NGE = [1, 2, 3]
     *
     * Calculate Contributions:
     * ────────────────────────────────────
     * i=0, nums[0]=1:
     *   PGE=-1, NGE=1
     *   leftCount = 0-(-1) = 1 (can start from index 0)
     *   rightCount = 1-0 = 1 (can end at index 0)
     *   Subarrays where 1 is max: [1]
     *   contribution = 1 × 1 × 1 = 1
     *
     * i=1, nums[1]=2:
     *   PGE=-1, NGE=2
     *   leftCount = 1-(-1) = 2 (can start from index 0 or 1)
     *   rightCount = 2-1 = 1 (can end at index 1)
     *   Subarrays where 2 is max: [2], [1,2]
     *   contribution = 2 × 2 × 1 = 4
     *
     * i=2, nums[2]=3:
     *   PGE=-1, NGE=3
     *   leftCount = 2-(-1) = 3 (can start from index 0, 1, or 2)
     *   rightCount = 3-2 = 1 (can end at index 2)
     *   Subarrays where 3 is max: [3], [2,3], [1,2,3]
     *   contribution = 3 × 3 × 1 = 9
     *
     * Sum of Maximums = 1 + 4 + 9 = 14
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * STEP 2: CALCULATE SUM OF MINIMUMS
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Find PLE (Previous Less Element):
     * ────────────────────────────────────
     * i=0, nums[0]=1: No less to left → PLE = -1
     * i=1, nums[1]=2: nums[0]=1 < 2 → PLE = 0
     * i=2, nums[2]=3: nums[1]=2 < 3 → PLE = 1
     *
     * PLE = [-1, 0, 1]
     *
     * Find NLE (Next Less Element):
     * ────────────────────────────────────
     * i=2, nums[2]=3: No less to right → NLE = 3
     * i=1, nums[1]=2: No less to right → NLE = 3
     * i=0, nums[0]=1: No less to right → NLE = 3
     *
     * NLE = [3, 3, 3]
     *
     * Calculate Contributions:
     * ────────────────────────────────────
     * i=0, nums[0]=1:
     *   PLE=-1, NLE=3
     *   leftCount = 0-(-1) = 1
     *   rightCount = 3-0 = 3
     *   Subarrays where 1 is min: [1], [1,2], [1,2,3]
     *   contribution = 1 × 1 × 3 = 3
     *
     * i=1, nums[1]=2:
     *   PLE=0, NLE=3
     *   leftCount = 1-0 = 1
     *   rightCount = 3-1 = 2
     *   Subarrays where 2 is min: [2], [2,3]
     *   contribution = 2 × 1 × 2 = 4
     *
     * i=2, nums[2]=3:
     *   PLE=1, NLE=3
     *   leftCount = 2-1 = 1
     *   rightCount = 3-2 = 1
     *   Subarrays where 3 is min: [3]
     *   contribution = 3 × 1 × 1 = 3
     *
     * Sum of Minimums = 3 + 4 + 3 = 10
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * STEP 3: CALCULATE FINAL ANSWER
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Sum of Ranges = Sum of Maximums - Sum of Minimums
     *               = 14 - 10
     *               = 4 ✓
     *
     * Verification:
     * ────────────────────────────────────
     * [1]     → max=1, min=1, range = 0
     * [2]     → max=2, min=2, range = 0
     * [3]     → max=3, min=3, range = 0
     * [1,2]   → max=2, min=1, range = 1
     * [2,3]   → max=3, min=2, range = 1
     * [1,2,3] → max=3, min=1, range = 2
     *
     * Sum = 0 + 0 + 0 + 1 + 1 + 2 = 4 ✓
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Sum of Subarray Ranges - OPTIMAL (Contribution Technique)\n');

        const tests: Array<{nums: number[], expected: number, description: string}> = [
            {
                nums: [1, 2, 3],
                expected: 4,
                description: 'Example 1 - Increasing array'
            },
            {
                nums: [1, 3, 3],
                expected: 4,
                description: 'Example 2 - With duplicates'
            },
            {
                nums: [4, -2, -3, 4, 1],
                expected: 59,
                description: 'With negative numbers'
            },
            {
                nums: [1],
                expected: 0,
                description: 'Single element - range is 0'
            },
            {
                nums: [5, 5, 5],
                expected: 0,
                description: 'All equal - all ranges are 0'
            },
            {
                nums: [3, 2, 1],
                expected: 4,
                description: 'Decreasing array'
            },
            {
                nums: [1, 4, 2, 5, 3],
                expected: 30,
                description: 'Random order'
            },
            {
                nums: [-5, -3, -1],
                expected: 8,
                description: 'All negative, increasing'
            }
        ];

        let passed = 0;
        let failed = 0;

        tests.forEach((test, index) => {
            const result = subArrayRanges(test.nums);
            const status = result === test.expected ? '✅ PASS' : '❌ FAIL';

            if (result === test.expected) {
                passed++;
            } else {
                failed++;
            }

            console.log(`Test ${index + 1}: ${status}`);
            console.log(`  Description: ${test.description}`);
            console.log(`  Input:       [${test.nums.join(', ')}]`);
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
            console.log('🎉 All tests passed! Contribution technique fully mastered! 🚀\n');
        }
    }
}

// Execute tests
SumOfSubarrayRangesOptimal.runTests();