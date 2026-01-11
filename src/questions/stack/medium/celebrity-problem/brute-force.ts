/**
 * Celebrity Problem - BRUTE FORCE SOLUTION
 *
 * Approach: Check each person - does he/she satisfy both celebrity conditions?
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * KEY INSIGHT:
 * Celebrity ki 2 conditions hain:
 * 1. Celebrity kisi ko nahi jaanta (Row should be all 0s)
 * 2. Sab celebrity ko jaante hain (Column should be all 1s except diagonal)
 *
 * Brute Force mein:
 * - Har person ko check karo
 * - Dono conditions verify karo
 * - Agar koi satisfy kare toh wahi celebrity hai
 */

namespace CelebrityBruteForce {
    /**
     * Main function - Find the celebrity
     *
     * @param M - N×N matrix where M[i][j] = 1 means i knows j
     * @returns Celebrity's index or -1 if no celebrity
     */
    export function findCelebrity(M: number[][]): number {
        const n = M.length;

        // Edge Case: Less than 2 people
        // WHY: Celebrity concept needs at least 2 people
        if (n < 2) return -1;

        // Check each person - could they be the celebrity?
        for (let candidate = 0; candidate < n; candidate++) {
            // Assume this person is celebrity until proven otherwise
            let isCelebrity = true;

            // ═══════════════════════════════════════════════════════════════
            // CHECK 1: Celebrity should NOT know anyone (Row check)
            // ═══════════════════════════════════════════════════════════════
            // If candidate knows anyone, they can't be celebrity
            // Check: M[candidate][j] should be 0 for all j (except j = candidate)

            for (let j = 0; j < n; j++) {
                // Skip self (M[i][i] is always 0 anyway)
                if (j === candidate) continue;

                // If candidate knows person j, candidate is NOT celebrity
                if (M[candidate][j] === 1) {
                    isCelebrity = false;
                    break; // No need to check further
                }
            }

            // If failed row check, try next candidate
            if (!isCelebrity) continue;

            // ═══════════════════════════════════════════════════════════════
            // CHECK 2: Everyone should know the celebrity (Column check)
            // ═══════════════════════════════════════════════════════════════
            // If anyone doesn't know candidate, candidate is not celebrity
            // Check: M[i][candidate] should be 1 for all i (except i = candidate)

            for (let i = 0; i < n; i++) {
                // Skip self
                if (i === candidate) continue;

                // If person i doesn't know candidate, candidate is NOT celebrity
                if (M[i][candidate] === 0) {
                    isCelebrity = false;
                    break; // No need to check further
                }
            }

            // If both checks passed, we found the celebrity!
            if (isCelebrity) {
                return candidate;
            }
        }

        // No celebrity found
        return -1;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example:
     * M = [
     *   [0, 1, 1, 0],   // Person 0 knows: 1, 2
     *   [0, 0, 0, 0],   // Person 1 knows: nobody ← CELEBRITY!
     *   [1, 1, 0, 0],   // Person 2 knows: 0, 1
     *   [0, 1, 1, 0]    // Person 3 knows: 1, 2
     * ]
     *
     * Visual Matrix:
     *         Knows →
     *         0  1  2  3
     *       ┌───────────┐
     *     0 │ 0  1  1  0 │
     *     1 │ 0  0  0  0 │  ← Row 1 is all 0s
     *     2 │ 1  1  0  0 │
     *     3 │ 0  1  1  0 │
     *       └───────────┘
     *            ↑
     *       Column 1 (except [1][1]) is all 1s
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * CHECKING EACH CANDIDATE
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * ───────────────────────────────────────────────────────────────────────────────
     * Candidate 0:
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * CHECK 1: Row check (Does 0 know anyone?)
     *   Row 0 = [0, 1, 1, 0]
     *   M[0][1] = 1 → 0 knows 1 ❌
     *   → Person 0 knows someone!
     *   → Person 0 is NOT a celebrity
     *
     * Skip to next candidate (early exit)
     *
     * ───────────────────────────────────────────────────────────────────────────────
     * Candidate 1:
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * CHECK 1: Row check (Does 1 know anyone?)
     *   Row 1 = [0, 0, 0, 0]
     *   M[1][0] = 0 ✓
     *   M[1][2] = 0 ✓
     *   M[1][3] = 0 ✓
     *   → Person 1 knows NOBODY ✓
     *
     * CHECK 2: Column check (Does everyone know 1?)
     *   Column 1 = [1, 0, 1, 1] (reading M[i][1])
     *   M[0][1] = 1 → Person 0 knows 1 ✓
     *   M[2][1] = 1 → Person 2 knows 1 ✓
     *   M[3][1] = 1 → Person 3 knows 1 ✓
     *   → Everyone knows person 1 ✓
     *
     * Both checks passed! Person 1 is CELEBRITY!
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * RESULT: 1 ✓
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN 2: NO CELEBRITY CASE
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * M = [
     *   [0, 1],   // Person 0 knows: 1
     *   [1, 0]    // Person 1 knows: 0
     * ]
     *
     * ───────────────────────────────────────────────────────────────────────────────
     * Candidate 0:
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * CHECK 1: Row check
     *   M[0][1] = 1 → 0 knows 1 ❌
     *   → Not a celebrity
     *
     * ───────────────────────────────────────────────────────────────────────────────
     * Candidate 1:
     * ───────────────────────────────────────────────────────────────────────────────
     *
     * CHECK 1: Row check
     *   M[1][0] = 1 → 1 knows 0 ❌
     *   → Not a celebrity
     *
     * All candidates checked, none passed.
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * RESULT: -1 (No celebrity) ✓
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * WHY O(n²)?
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Worst Case: Celebrity is last person (index n-1)
     *
     * - We check n candidates
     * - For each candidate, we check n-1 people in row
     * - Then check n-1 people in column
     * - Total: n × (n-1 + n-1) = n × 2(n-1) ≈ 2n² = O(n²)
     *
     * For n = 1000: ~2 million operations
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * EDGE CASES
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. Two people, both know each other: [0,1], [1,0] → -1
     *    Dono ek dusre ko jaante hain, koi celebrity nahi
     *
     * 2. Two people, neither knows the other: [0,0], [0,0] → -1
     *    Koi kisi ko nahi jaanta, toh celebrity ko bhi koi nahi jaanta!
     *
     * 3. Celebrity at index 0:
     *    [0,0,0], [1,0,0], [1,0,0] → 0
     *    Person 0 knows nobody, everyone knows person 0
     *
     * 4. Celebrity at last index:
     *    [0,0,1], [0,0,1], [0,0,0] → 2
     *    Person 2 knows nobody, everyone knows person 2
     *
     * 5. Everyone knows everyone except diagonal:
     *    [0,1,1], [1,0,1], [1,1,0] → -1
     *    Sab ek dusre ko jaante hain, koi celebrity nahi
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Celebrity Problem - BRUTE FORCE\n');

        const tests: Array<{ M: number[][]; expected: number; description: string }> = [
            {
                M: [
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 1, 0]
                ],
                expected: 1,
                description: "Example 1 - Person 1 is celebrity"
            },
            {
                M: [
                    [0, 1],
                    [1, 0]
                ],
                expected: -1,
                description: "Both know each other - No celebrity"
            },
            {
                M: [
                    [0, 0, 1],
                    [0, 0, 1],
                    [0, 0, 0]
                ],
                expected: 2,
                description: "Example 3 - Person 2 is celebrity"
            },
            {
                M: [
                    [0, 0],
                    [0, 0]
                ],
                expected: -1,
                description: "Neither knows the other - No celebrity"
            },
            {
                M: [
                    [0, 0],
                    [1, 0]
                ],
                expected: 0,
                description: "Person 0 is celebrity (2 people)"
            },
            {
                M: [
                    [0, 1],
                    [0, 0]
                ],
                expected: 1,
                description: "Person 1 is celebrity (2 people)"
            },
            {
                M: [
                    [0, 0, 0],
                    [1, 0, 0],
                    [1, 0, 0]
                ],
                expected: 0,
                description: "Celebrity at index 0"
            },
            {
                M: [
                    [0, 1, 1],
                    [1, 0, 1],
                    [1, 1, 0]
                ],
                expected: -1,
                description: "Everyone knows everyone - No celebrity"
            },
            {
                M: [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 1, 0]
                ],
                expected: 2,
                description: "Celebrity in middle (index 2)"
            },
            {
                M: [
                    [0, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0]
                ],
                expected: 1,
                description: "5 people - Person 1 is celebrity"
            },
            {
                M: [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                expected: -1,
                description: "Nobody knows anyone - No celebrity"
            },
            {
                M: [
                    [0, 1, 0, 1],
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
                expected: 1,
                description: "Complex case - Person 1 is celebrity"
            }
        ];

        let passed = 0;
        let failed = 0;

        tests.forEach((test, index) => {
            const result = findCelebrity(test.M);
            const isEqual = result === test.expected;
            const status = isEqual ? '✅ PASS' : '❌ FAIL';

            if (isEqual) {
                passed++;
            } else {
                failed++;
            }

            console.log(`Test ${index + 1}: ${status}`);
            console.log(`  Description: ${test.description}`);
            console.log(`  Matrix (${test.M.length}x${test.M.length}):`);
            test.M.forEach((row, i) => {
                console.log(`    [${row.join(', ')}]${i === result ? ' ← found' : ''}`);
            });
            console.log(`  Expected: ${test.expected}`);
            console.log(`  Got:      ${result}`);
            console.log();
        });

        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`Total Tests: ${tests.length}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log('═══════════════════════════════════════════════════════════════\n');

        if (failed === 0) {
            console.log('🎉 All tests passed! Brute Force understood! 🚀\n');
            console.log('⚠️  Note: This solution is O(n²). Stack/Two Pointers can do O(n).\n');
        }
    }
}

// Execute tests
CelebrityBruteForce.runTests();