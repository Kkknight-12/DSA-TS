/**
 * MINIMUM DAYS TO MAKE M BOUQUETS - BRUTE FORCE
 * ===============================================
 *
 * PROBLEM:
 * Ek garden mein n flowers hain. bloomDay[i] = woh din jab i-th flower bloom karega.
 * Tumhe m bouquets banana hai. Har bouquet ke liye k ADJACENT (side-by-side) bloomed flowers chahiye.
 * Minimum kitne din wait karna padega?
 *
 * Example:
 *   bloomDay = [1, 10, 3, 10, 2],  m=3,  k=1
 *
 *   Day 1: only flower[0] bloomed → 1 bouquet (need 3) → NO
 *   Day 2: flower[0], flower[4] bloomed → 2 bouquets → NO
 *   Day 3: flower[0], flower[2], flower[4] bloomed → 3 bouquets → YES! return 3
 *
 * INTUITION (Soch):
 * ─────────────────
 * Zyada din wait karo → zyada flowers bloom honge → easier to make bouquets.
 * Toh hum pehle din se shuru karke har din check karte hain:
 * "Kya aaj tak itne bouquets ban sakte hain?"
 * Pehla din jahan answer YES ho — woh hamara answer hai!
 *
 * canMakeBouquets helper (Greedy):
 * Har flower ko left se right traverse karo.
 * Agar flower bloom ho chuki hai → adjacent count badhao.
 * Jab adjacent count = k → ek bouquet ready! Count reset karo.
 * Agar koi flower bloom nahi hui → adjacent chain toot gayi → reset.
 *
 * WHY THIS IS NOT OPTIMAL:
 * Linear scan: minDay se maxDay tak every day check karo → O((max-min) × n)
 * Agar bloomDay = [1, 10^9] toh 10^9 iterations! Too slow.
 *
 * ALGORITHM:
 * ──────────
 * 1. Edge case: m*k > n → impossible (not enough flowers total)
 * 2. Find minDay and maxDay of bloomDay
 * 3. For each day from minDay to maxDay:
 *    a. Check if canMakeBouquets(day) → if YES, return day
 * 4. Return -1 (should not reach here after edge case check)
 *
 * TIME:  O((max-min) × n) — for each of (max-min) days, scan n flowers
 * SPACE: O(1)
 *
 * @param bloomDay - Day each flower blooms
 * @param m - Number of bouquets needed
 * @param k - Adjacent flowers needed per bouquet
 * @returns Minimum days, or -1 if impossible
 */

namespace MinDaysBouquetsBruteForce {
  /**
   * Greedy helper: kya 'day' ke baad m bouquets ban sakte hain?
   */
  function canMakeBouquets(bloomDay: number[], day: number, m: number, k: number): boolean {
    let bouquets = 0;  // Kitne bouquets bane abhi tak
    let flowers = 0;   // Current adjacent bloomed flowers ki chain

    for (const bloom of bloomDay) {
      if (bloom <= day) {
        // Yeh flower bloom ho chuki hai → chain mein add karo
        flowers++;

        if (flowers === k) {
          // k adjacent flowers mil gaye → ek bouquet ready!
          bouquets++;
          flowers = 0; // Chain reset — nayi bouquet ke liye shuru karo
        }
      } else {
        // Yeh flower abhi bloom nahi hui → adjacent chain toot gayi
        flowers = 0;
      }

      // Early exit: agar m bouquets ban gaye toh aur check ki zaroorat nahi
      if (bouquets === m) return true;
    }

    return bouquets >= m;
  }

  function minDays(bloomDay: number[], m: number, k: number): number {
    const n = bloomDay.length;

    // Edge case: total flowers needed = m*k, agar available se zyada → impossible
    // WHY: Har ek bouquet ko k flowers chahiye, m bouquets ke liye m*k total flowers
    if (m * k > n) return -1;

    // Search space: minDay se maxDay tak
    // WHY minDay: koi bhi din pehle bloom nahi karta — from here answer starts
    // WHY maxDay: iss din sab bloom ho jaate hain — answer guaranteed by here
    let minDay = Math.min(...bloomDay);
    let maxDay = Math.max(...bloomDay);

    // Har din linearly check karo
    for (let day = minDay; day <= maxDay; day++) {
      if (canMakeBouquets(bloomDay, day, m, k)) {
        // Pehla valid day mil gaya — yahi minimum hai
        return day;
      }
    }

    return -1;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: bloomDay=[1,10,3,10,2], m=3, k=1
   *
   * Edge check: m*k = 3*1 = 3 ≤ n=5 → proceed
   * minDay=1, maxDay=10
   *
   * Garden visualization:
   *   Index:   0    1    2    3    4
   *   Blooms: [1,  10,   3,  10,   2]
   *
   * ═══════════════════════════════════════════════════════════
   * LINEAR SCAN
   * ═══════════════════════════════════════════════════════════
   *
   * Day = 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ Which flowers bloomed? bloomDay[i] ≤ 1                   │
   * │   [✓,  ✗,  ✗,  ✗,  ✗]  (only flower 0)                 │
   * │                                                          │
   * │ canMakeBouquets scan:                                    │
   * │   i=0: bloom=1≤1 → flowers=1=k → bouquet=1, reset       │
   * │   i=1: bloom=10>1 → flowers=0                           │
   * │   i=2: bloom=3>1  → flowers=0                           │
   * │   i=3: bloom=10>1 → flowers=0                           │
   * │   i=4: bloom=2>1  → flowers=0                           │
   * │   bouquets=1 < m=3 → FALSE                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Day = 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ Which flowers bloomed? bloomDay[i] ≤ 2                   │
   * │   [✓,  ✗,  ✗,  ✗,  ✓]  (flowers 0 and 4)               │
   * │                                                          │
   * │ canMakeBouquets scan:                                    │
   * │   i=0: bloom=1≤2 → flowers=1=k → bouquet=1, reset       │
   * │   i=1: bloom=10>2 → flowers=0                           │
   * │   i=2: bloom=3>2  → flowers=0                           │
   * │   i=3: bloom=10>2 → flowers=0                           │
   * │   i=4: bloom=2≤2 → flowers=1=k → bouquet=2, reset       │
   * │   bouquets=2 < m=3 → FALSE                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Day = 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ Which flowers bloomed? bloomDay[i] ≤ 3                   │
   * │   [✓,  ✗,  ✓,  ✗,  ✓]  (flowers 0, 2, 4)               │
   * │                                                          │
   * │ canMakeBouquets scan:                                    │
   * │   i=0: bloom=1≤3 → flowers=1=k → bouquet=1, reset       │
   * │   i=1: bloom=10>3 → flowers=0                           │
   * │   i=2: bloom=3≤3 → flowers=1=k → bouquet=2, reset       │
   * │   i=3: bloom=10>3 → flowers=0                           │
   * │   i=4: bloom=2≤3 → flowers=1=k → bouquet=3=m → TRUE! ✅ │
   * └──────────────────────────────────────────────────────────┘
   *
   * return 3 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. m*k > n → -1 immediately
   *    bloomDay=[1,2,3], m=2, k=2 → need 4 flowers, only 3 → -1
   *
   * 2. k=1: every single bloomed flower is a bouquet
   *    bloomDay=[5,5,5], m=3, k=1 → day 5 all bloom → 3 bouquets → return 5
   *
   * 3. All same bloom days:
   *    bloomDay=[3,3,3,3], m=2, k=2 → day 3: all bloom, [0,1]→bouquet1, [2,3]→bouquet2 → return 3
   *
   * 4. Need ALL flowers adjacent:
   *    bloomDay=[1,2,3,4,5], m=1, k=5 → all 5 must bloom → day 5 → return 5
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Min Days Bouquets - BRUTE FORCE\n");

    const testCases: {
      bloomDay: number[];
      m: number;
      k: number;
      expected: number;
      description: string;
    }[] = [
      {
        bloomDay: [1, 10, 3, 10, 2], m: 3, k: 1,
        expected: 3,
        description: "Dry run example: each bouquet needs 1 flower",
      },
      {
        bloomDay: [1, 10, 3, 10, 2], m: 3, k: 2,
        expected: -1,
        description: "Impossible: m*k=6 > n=5",
      },
      {
        bloomDay: [7, 7, 7, 7, 12, 7, 7], m: 2, k: 3,
        expected: 12,
        description: "Need 3 adjacent: [0,1,2]→b1 then [3,4,5]→b2 only at day 12",
      },
      {
        bloomDay: [1, 1, 1, 1], m: 1, k: 1,
        expected: 1,
        description: "Any single flower → bouquet, min bloom = 1",
      },
      {
        bloomDay: [1, 1, 1, 1], m: 2, k: 2,
        expected: 1,
        description: "Day 1: all bloom, [0,1]→b1, [2,3]→b2 → return 1",
      },
      {
        bloomDay: [1, 2, 3, 4, 5], m: 1, k: 5,
        expected: 5,
        description: "Need all 5 adjacent → wait till all bloom (day 5)",
      },
      {
        bloomDay: [1, 2, 3], m: 2, k: 2,
        expected: -1,
        description: "Impossible: need 4 flowers, only 3 exist",
      },
      {
        bloomDay: [3, 3, 3, 3], m: 2, k: 2,
        expected: 3,
        description: "All same bloom day: [0,1]→b1, [2,3]→b2 → return 3",
      },
      {
        bloomDay: [1, 10, 2, 9, 3, 8, 4, 7, 5, 6], m: 3, k: 2,
        expected: 5,
        description: "Interleaved bloom days: 3 pairs of adjacent by day 5",
      },
      {
        bloomDay: [1000000000], m: 1, k: 1,
        expected: 1000000000,
        description: "Large single bloom day",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { bloomDay, m, k, expected, description } of testCases) {
      const result = minDays([...bloomDay], m, k);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   bloomDay=[${bloomDay}], m=${m}, k=${k}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   bloomDay=[${bloomDay}], m=${m}, k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

MinDaysBouquetsBruteForce.runTests();
