/**
 * 735. Asteroid Collision - OPTIMAL SOLUTION
 *
 * Approach: Stack Simulation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * KEY INSIGHT:
 * Collision only happens when POSITIVE asteroid is followed by NEGATIVE asteroid
 * [+ve, -ve] → ← They're moving towards each other!
 *
 * Stack stores asteroids that are "waiting" for potential collision
 */

namespace AsteroidCollisionOptimal {
    /**
     * Main function to simulate asteroid collisions
     *
     * STRATEGY:
     * 1. Positive asteroids → Push to stack (waiting for collision)
     * 2. Negative asteroids → Resolve collisions with stack
     *
     * COLLISION RULES:
     * - Bigger wins, smaller explodes
     * - Equal size → Both explode
     * - Same direction → No collision
     */
    export function asteroidCollision(asteroids: number[]): number[] {
        // Stack stores surviving asteroids
        // WHY stack? Last positive asteroid collides first with incoming negative
        const stack: number[] = [];

        // Process each asteroid one by one
        // WHY left to right? Simulates real-time movement
        for (const asteroid of asteroids) {
            // Flag to track if current asteroid survives
            // WHY? Negative asteroid might survive after destroying multiple positives
            let survives = true;

            // COLLISION CASE: Current is negative AND stack top is positive
            // WHY this condition? Only [+ve, -ve] pattern causes collision
            // [-ve, +ve] means they're moving AWAY from each other
            while (
                survives &&                        // Current asteroid still alive
                stack.length > 0 &&                // There's someone to collide with
                stack[stack.length - 1] > 0 &&     // Stack top is positive (moving right)
                asteroid < 0                        // Current is negative (moving left)
            ) {
                const top = stack[stack.length - 1];
                const currentSize = Math.abs(asteroid);
                const topSize = Math.abs(top);

                if (topSize < currentSize) {
                    // Case 1: Negative asteroid wins
                    // WHY: Current asteroid is bigger, destroys stack top
                    // EXAMPLE: stack = [5], asteroid = -10 → pop 5, -10 continues
                    stack.pop();
                    // survives stays true, continue checking next stack element
                } else if (topSize === currentSize) {
                    // Case 2: Both same size - Both explode
                    // WHY: Equal forces cancel out
                    // EXAMPLE: stack = [5], asteroid = -5 → pop 5, -5 also dies
                    stack.pop();
                    survives = false; // Current asteroid also dies
                } else {
                    // Case 3: Positive asteroid wins (topSize > currentSize)
                    // WHY: Stack top is bigger, current asteroid explodes
                    // EXAMPLE: stack = [10], asteroid = -5 → -5 dies, 10 stays
                    survives = false; // Current asteroid dies
                }
            }

            // Push asteroid to stack if it survived
            // CASES when we push:
            // 1. Positive asteroid (always pushed, waiting for collision)
            // 2. Negative asteroid that survived all battles
            // 3. Negative asteroid with empty stack
            // 4. Negative asteroid when stack top is also negative (no collision)
            if (survives) {
                stack.push(asteroid);
            }
        }

        // Stack contains all surviving asteroids in order
        return stack;
    }

    /**
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN - COMPLETE VISUALIZATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Example Input: asteroids = [10, 2, -5]
     *
     * Expected Output: [10]
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * STEP-BY-STEP SIMULATION
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Initial State:
     * asteroids = [10, 2, -5]
     * stack = []
     *
     * ───────────────────────────────────────────────────────────────────────────────
     * Iteration 1: asteroid = 10 (positive, moving right →)
     * ───────────────────────────────────────────────────────────────────────────────
     *
     *   Visual:  10→
     *
     *   survives = true
     *
     *   Check collision conditions:
     *   - stack.length > 0? NO (stack is empty)
     *   → No collision possible
     *
     *   survives = true → Push 10 to stack
     *
     *   stack = [10]
     *
     *   Visual state:  [10→]
     *
     * ───────────────────────────────────────────────────────────────────────────────
     * Iteration 2: asteroid = 2 (positive, moving right →)
     * ───────────────────────────────────────────────────────────────────────────────
     *
     *   Visual:  10→  2→
     *
     *   survives = true
     *
     *   Check collision conditions:
     *   - stack.length > 0? YES
     *   - stack.top (10) > 0? YES
     *   - asteroid (2) < 0? NO ← Condition fails!
     *   → No collision (both moving same direction)
     *
     *   survives = true → Push 2 to stack
     *
     *   stack = [10, 2]
     *
     *   Visual state:  [10→  2→]
     *
     * ───────────────────────────────────────────────────────────────────────────────
     * Iteration 3: asteroid = -5 (negative, moving left ←)
     * ───────────────────────────────────────────────────────────────────────────────
     *
     *   Visual:  10→  2→  ←5
     *
     *   survives = true
     *
     *   ┌─────────────────────────────────────────────────────────────────┐
     *   │ COLLISION LOOP - First Iteration                               │
     *   └─────────────────────────────────────────────────────────────────┘
     *
     *   Check collision conditions:
     *   - survives? YES
     *   - stack.length > 0? YES
     *   - stack.top (2) > 0? YES
     *   - asteroid (-5) < 0? YES
     *   → All conditions met! COLLISION!
     *
     *   Compare sizes:
     *   - topSize = |2| = 2
     *   - currentSize = |-5| = 5
     *   - 2 < 5? YES → Negative wins!
     *
     *   Action: Pop 2 from stack (2 explodes)
     *   survives = true (keep going)
     *
     *   stack = [10]
     *
     *   Visual:  10→  💥  ←5
     *            (2 exploded)
     *
     *   ┌─────────────────────────────────────────────────────────────────┐
     *   │ COLLISION LOOP - Second Iteration                              │
     *   └─────────────────────────────────────────────────────────────────┘
     *
     *   Check collision conditions:
     *   - survives? YES
     *   - stack.length > 0? YES
     *   - stack.top (10) > 0? YES
     *   - asteroid (-5) < 0? YES
     *   → All conditions met! COLLISION!
     *
     *   Compare sizes:
     *   - topSize = |10| = 10
     *   - currentSize = |-5| = 5
     *   - 10 < 5? NO
     *   - 10 == 5? NO
     *   - 10 > 5? YES → Positive wins!
     *
     *   Action: survives = false (-5 explodes)
     *
     *   stack = [10] (unchanged)
     *
     *   Visual:  10→  💥
     *            (-5 exploded)
     *
     *   ┌─────────────────────────────────────────────────────────────────┐
     *   │ COLLISION LOOP - Exit                                          │
     *   └─────────────────────────────────────────────────────────────────┘
     *
     *   survives = false → Loop condition fails, exit
     *
     *   survives = false → Don't push -5
     *
     *   stack = [10]
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * FINAL RESULT: [10] ✓
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * DRY RUN 2: Complex Example [3, 5, -6, 2, -1, 4]
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * Step 1: asteroid = 3
     *   3 > 0 → Push
     *   stack = [3]
     *
     * Step 2: asteroid = 5
     *   5 > 0 → Push
     *   stack = [3, 5]
     *
     * Step 3: asteroid = -6
     *   -6 < 0, stack.top = 5 > 0 → Collision!
     *
     *   Loop 1: |5| vs |6| → 5 < 6 → Pop 5
     *   stack = [3]
     *
     *   Loop 2: |3| vs |6| → 3 < 6 → Pop 3
     *   stack = []
     *
     *   Loop exit: stack empty
     *   survives = true → Push -6
     *   stack = [-6]
     *
     * Step 4: asteroid = 2
     *   2 > 0 → Push (no collision with -6, moving away)
     *   stack = [-6, 2]
     *
     * Step 5: asteroid = -1
     *   -1 < 0, stack.top = 2 > 0 → Collision!
     *
     *   |2| vs |1| → 2 > 1 → Positive wins
     *   survives = false
     *   stack = [-6, 2] (unchanged)
     *
     * Step 6: asteroid = 4
     *   4 > 0 → Push
     *   stack = [-6, 2, 4]
     *
     * FINAL: [-6, 2, 4] ✓
     *
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     * EDGE CASES
     * ═══════════════════════════════════════════════════════════════════════════════
     *
     * 1. All positive: [1, 2, 3]
     *    No collisions, all pushed
     *    Result: [1, 2, 3]
     *
     * 2. All negative: [-1, -2, -3]
     *    No collisions (same direction)
     *    Result: [-1, -2, -3]
     *
     * 3. Negative then positive: [-5, 10]
     *    No collision! They're moving AWAY from each other
     *    Result: [-5, 10]
     *
     * 4. Equal size: [5, -5]
     *    Both explode
     *    Result: []
     *
     * 5. Chain destruction: [1, 2, 3, -10]
     *    -10 destroys all
     *    Result: [-10]
     *
     * 6. Large negative first: [-10, 5, 3]
     *    No collisions (5 and 3 are moving away from -10)
     *    Result: [-10, 5, 3]
     *
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST CASES
    // ═══════════════════════════════════════════════════════════════════════════════

    export function runTests(): void {
        console.log('🧪 Testing Asteroid Collision - OPTIMAL (Stack Simulation)\n');

        const tests: Array<{
            asteroids: number[];
            expected: number[];
            description: string;
        }> = [
            {
                asteroids: [5, 10, -5],
                expected: [5, 10],
                description: 'Example 1 - Bigger positive wins'
            },
            {
                asteroids: [8, -8],
                expected: [],
                description: 'Example 2 - Equal size, both explode'
            },
            {
                asteroids: [10, 2, -5],
                expected: [10],
                description: 'Example 3 - Chain collision'
            },
            {
                asteroids: [3, 5, -6, 2, -1, 4],
                expected: [-6, 2, 4],
                description: 'Example 4 - Complex multiple collisions'
            },
            {
                asteroids: [1, 2, 3, 4],
                expected: [1, 2, 3, 4],
                description: 'Edge Case - All positive (no collision)'
            },
            {
                asteroids: [-1, -2, -3, -4],
                expected: [-1, -2, -3, -4],
                description: 'Edge Case - All negative (no collision)'
            },
            {
                asteroids: [-5, 10],
                expected: [-5, 10],
                description: 'Edge Case - Moving away (no collision)'
            },
            {
                asteroids: [1, 2, 3, -10],
                expected: [-10],
                description: 'Chain destruction - Negative destroys all'
            },
            {
                asteroids: [-2, -1, 1, 2],
                expected: [-2, -1, 1, 2],
                description: 'Split - Negatives left, positives right'
            },
            {
                asteroids: [1, -1, 1, -1],
                expected: [],
                description: 'Alternating equal - All explode'
            }
        ];

        let passed = 0;
        let failed = 0;

        tests.forEach((test, index) => {
            const result = asteroidCollision(test.asteroids);
            const isEqual =
                result.length === test.expected.length &&
                result.every((val, i) => val === test.expected[i]);

            const status = isEqual ? '✅ PASS' : '❌ FAIL';

            if (isEqual) {
                passed++;
            } else {
                failed++;
            }

            console.log(`Test ${index + 1}: ${status}`);
            console.log(`  Description: ${test.description}`);
            console.log(`  Input:       [${test.asteroids.join(', ')}]`);
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
            console.log('🎉 All tests passed! Stack simulation mastered! 🚀\n');
        }
    }
}

// Execute tests
AsteroidCollisionOptimal.runTests();