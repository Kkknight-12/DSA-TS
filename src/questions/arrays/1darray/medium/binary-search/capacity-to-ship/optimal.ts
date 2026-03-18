/**
 * CAPACITY TO SHIP PACKAGES WITHIN D DAYS - BINARY SEARCH (OPTIMAL)
 * ===================================================================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Problem ko seedha socho:
 * - Ship ki capacity jitni ZYADA hogi, utne KAM din lagengy
 * - Ship ki capacity jitni KAM hogi, utne ZYADA din lagengy
 * - Yeh ek MONOTONIC relationship hai!
 *
 * Toh agar hum capacity ke upar binary search karein:
 * - "Kya capacity X se D days mein ship ho sakta hai?"
 * - Agar YES → aur kam capacity try karo (left half)
 * - Agar NO  → zyada capacity chahiye (right half)
 *
 * SEARCH SPACE KYA HAI?
 * ──────────────────────
 * Minimum capacity = max(weights)
 *   → Kyunki ek bhi package ship nahi hoga agar capacity
 *     sabse bhaari package se kam hai
 *
 * Maximum capacity = sum(weights)
 *   → Kyunki ek hi din mein sab ship karna = sab load karna
 *
 * ┌────────────────────────────────────────────────────────────────────┐
 * │                                                                    │
 * │  weights = [1,2,3,4,5,6,7,8,9,10], days = 5                       │
 * │                                                                    │
 * │  min capacity = max(weights) = 10                                  │
 * │  max capacity = sum(weights) = 55                                  │
 * │                                                                    │
 * │  Search Space:                                                     │
 * │  10 ──────────────────────────────── 55                           │
 * │  [too few days ←──────────── too many days]                       │
 * │                                                                    │
 * │  Binary search finds the LEFTMOST capacity where days <= D        │
 * │                                                                    │
 * │  10  15  20  25  30  35  40  45  50  55                           │
 * │   ✗   ✗   ✗   ✗   ✓   ✓   ✓   ✓   ✓   ✓                         │
 * │                      ↑                                            │
 * │                   answer = 15 (actual answer for this example)    │
 * │                                                                    │
 * └────────────────────────────────────────────────────────────────────┘
 *
 * ALGORITHM:
 * ──────────
 * 1. Set left = max(weights), right = sum(weights)
 * 2. Binary search on capacity:
 *    a. mid = (left + right) / 2
 *    b. Check: kya mid capacity se `days` din mein ship ho sakta hai?
 *    c. YES → right = mid (smaller capacity try karo)
 *    d. NO  → left = mid + 1 (capacity badhao)
 * 3. left = minimum valid capacity
 *
 * TIME COMPLEXITY: O(n × log(sum - max))
 *   - Binary search: O(log(sum - max)) iterations
 *   - Each canShip check: O(n) — traverse all weights
 *   - Total: O(n × log(sum))
 *
 * SPACE COMPLEXITY: O(1)
 *   - Sirf kuch variables, koi extra data structure nahi
 */

namespace CapacityToShipOptimal {
  /**
   * Main function - finds minimum ship capacity to ship all packages in D days
   *
   * @param weights - Package weights in conveyor belt order (order must be maintained!)
   * @param days - Maximum days allowed
   * @returns Minimum ship capacity required
   */
  function shipWithinDays(weights: number[], days: number): number {
    // Search space define karo
    // WHY max: Agar capacity < max weight, toh heaviest package kabhi ship nahi hoga
    let left = Math.max(...weights);

    // WHY sum: Agar capacity = sum, ek hi din mein sab kuch ship ho jaata hai
    let right = weights.reduce((sum, w) => sum + w, 0);

    // Binary search on the answer
    while (left < right) {
      // Mid capacity try karo
      // WHY floor: Integer capacity chahiye
      const mid = Math.floor((left + right) / 2);

      if (canShip(weights, mid, days)) {
        // Mid capacity se kaam chal gaya!
        // Aur KAM capacity possible hai kya? → left half explore karo
        // WHY right = mid (not mid-1): mid khud ek valid answer ho sakta hai
        right = mid;
      } else {
        // Mid capacity se nahi hua, zyada chahiye
        // WHY left = mid + 1: mid toh invalid hai, usse bada try karo
        left = mid + 1;
      }
    }

    // left == right at this point — yahi minimum valid capacity hai
    return left;
  }

  /**
   * Helper: Check if we can ship all packages within `days` days with given capacity
   *
   * Greedy approach: Har din jitna load kar sako karo, jab exceed ho toh next day
   *
   * @param weights - Package weights
   * @param capacity - Ship capacity to test
   * @param days - Days limit
   * @returns true if possible, false otherwise
   */
  function canShip(weights: number[], capacity: number, days: number): boolean {
    let daysNeeded = 1; // Pehle din se shuru
    let currentLoad = 0; // Aaj ka current load

    for (const weight of weights) {
      if (currentLoad + weight > capacity) {
        // Yeh package aaj nahi aayega — naya din shuru karo
        // WHY: Order maintain karna zaroori hai (conveyor belt!)
        daysNeeded++;
        currentLoad = weight; // Kal ka load is package se start
      } else {
        // Package fit ho gaya, aaj hi load karo
        currentLoad += weight;
      }
    }

    // Agar required days <= allowed days, toh possible hai
    return daysNeeded <= days;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════
   *
   * Example: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
   *
   * Initial State:
   *   left  = max(weights) = 10
   *   right = sum(weights) = 55
   *
   * ═══════════════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════════════
   *
   * Iteration 1:
   *   left=10, right=55
   *   mid = floor((10+55)/2) = 32
   *   canShip(capacity=32)?
   *     Day 1: 1+2+3+4+5+6+7 = 28 ✓, +8 = 36 > 32 ✗ → new day
   *     Day 2: 8+9 = 17 ✓, +10 = 27 ✓ → done
   *     daysNeeded = 2 ≤ 5 → TRUE
   *   → Try smaller: right = 32
   *
   * Iteration 2:
   *   left=10, right=32
   *   mid = floor((10+32)/2) = 21
   *   canShip(capacity=21)?
   *     Day 1: 1+2+3+4+5+6 = 21 ✓, +7 = 28 > 21 ✗ → new day
   *     Day 2: 7+8 = 15 ✓, +9 = 24 > 21 ✗ → new day
   *     Day 3: 9+10 = 19 ✓ → done
   *     daysNeeded = 3 ≤ 5 → TRUE
   *   → Try smaller: right = 21
   *
   * Iteration 3:
   *   left=10, right=21
   *   mid = floor((10+21)/2) = 15
   *   canShip(capacity=15)?
   *     Day 1: 1+2+3+4+5 = 15 ✓, +6 = 21 > 15 ✗ → new day
   *     Day 2: 6+7 = 13 ✓, +8 = 21 > 15 ✗ → new day
   *     Day 3: 8 ✓, +9 = 17 > 15 ✗ → new day
   *     Day 4: 9 ✓, +10 = 19 > 15 ✗ → new day
   *     Day 5: 10 ✓ → done
   *     daysNeeded = 5 ≤ 5 → TRUE
   *   → Try smaller: right = 15
   *
   * Iteration 4:
   *   left=10, right=15
   *   mid = floor((10+15)/2) = 12
   *   canShip(capacity=12)?
   *     Day 1: 1+2+3+4 = 10 ✓, +5 = 15 > 12 ✗ → new day
   *     Day 2: 5+6 = 11 ✓, +7 = 18 > 12 ✗ → new day
   *     Day 3: 7 ✓, +8 = 15 > 12 ✗ → new day
   *     Day 4: 8 ✓, +9 = 17 > 12 ✗ → new day
   *     Day 5: 9 ✓, +10 = 19 > 12 ✗ → new day
   *     Day 6: 10 ✓ → done
   *     daysNeeded = 6 > 5 → FALSE
   *   → Need more capacity: left = 13
   *
   * Iteration 5:
   *   left=13, right=15
   *   mid = floor((13+15)/2) = 14
   *   canShip(capacity=14)?
   *     Day 1: 1+2+3+4 = 10 ✓, +5 = 15 > 14 ✗ → new day
   *     Day 2: 5+6 = 11 ✓, +7 = 18 > 14 ✗ → new day
   *     Day 3: 7 ✓, +8 = 15 > 14 ✗ → new day
   *     Day 4: 8+9 = 17 > 14 ✗ → wait, 8 alone ✓, +9 > 14 → new day
   *     Day 5: 9 ✓, +10 = 19 > 14 ✗ → new day
   *     Day 6: 10 ✓ → done
   *     daysNeeded = 6 > 5 → FALSE
   *   → Need more: left = 15
   *
   * Iteration 6:
   *   left=15, right=15 → EXIT LOOP (left == right)
   *
   * ═══════════════════════════════════════════════════════════════════
   * RESULT: left = 15 ✅
   * ═══════════════════════════════════════════════════════════════════
   *
   * Search space progression:
   *   [10 ──────────────────── 55]
   *   [10 ────────── 32]
   *   [10 ──── 21]
   *   [10 ── 15]
   *   [13 ── 15]
   *   [15 ── 15] ← answer!
   *
   * ═══════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════
   *
   * 1. days = 1 (ek hi din mein sab):
   *    left = max, right = sum
   *    Answer = sum (sab ek saath load karo)
   *
   * 2. days = n (har package alag din):
   *    Answer = max(weights) (ek ek package roz)
   *
   * 3. Single package [5], days = 1:
   *    left = right = 5, no iterations needed
   *    Answer = 5
   *
   * 4. All same weights [3,3,3], days = 2:
   *    left = 3, right = 9
   *    Answer = 6 (2 packages day 1, 1 package day 2)
   */

  // ═══════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      '🧪 Testing Capacity To Ship Within Days - BINARY SEARCH (OPTIMAL)\n'
    );

    const testCases: {
      weights: number[];
      days: number;
      expected: number;
      description: string;
    }[] = [
      // Basic examples from problem
      {
        weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        days: 5,
        expected: 15,
        description: 'Example 1: Classic case',
      },
      {
        weights: [3, 2, 2, 4, 1, 4],
        days: 3,
        expected: 6,
        description: 'Example 2: LeetCode example 2',
      },
      {
        weights: [1, 2, 3, 1, 1],
        days: 4,
        expected: 3,
        description: 'Example 3: LeetCode example 3',
      },

      // Edge cases
      {
        weights: [5],
        days: 1,
        expected: 5,
        description: 'Single package',
      },
      {
        weights: [1, 2],
        days: 1,
        expected: 3,
        description: 'Two packages, 1 day → must carry both',
      },
      {
        weights: [1, 2],
        days: 2,
        expected: 2,
        description: 'Two packages, 2 days → carry heaviest per day',
      },
      {
        weights: [10, 10, 10, 10],
        days: 4,
        expected: 10,
        description: 'All same weights, days = n',
      },
      {
        weights: [10, 10, 10, 10],
        days: 1,
        expected: 40,
        description: 'All same weights, 1 day → carry all',
      },

      // Boundary conditions
      {
        weights: [1],
        days: 1,
        expected: 1,
        description: 'Minimum possible input',
      },
      {
        weights: [100, 200, 300],
        days: 2,
        expected: 300,
        description: 'Must split: [100,200] and [300] → capacity = 300',
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { weights, days, expected, description } of testCases) {
      const result = shipWithinDays(weights, days);
      const status = result === expected ? '✅' : '❌';

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   weights = [${weights}], days = ${days}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   weights = [${weights}], days = ${days}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log('═'.repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('═'.repeat(60));
  }
}

// Run tests
CapacityToShipOptimal.runTests();