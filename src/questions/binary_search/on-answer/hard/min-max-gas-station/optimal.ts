/**
 * MINIMIZE MAX DISTANCE BETWEEN GAS STATIONS - BINARY SEARCH ON ANSWER (OPTIMAL)
 * ================================================================================
 *
 * PROBLEM:
 * Sorted gas stations hain. k new stations add karo.
 * Maximum distance between any two consecutive stations minimize karo.
 *
 * INTUITION (Soch):
 * ─────────────────
 * Pehle soch — agar maximum allowed distance = D ho toh:
 * "Kya sirf k stations daake har gap ko D ya usse chhota kar sakte hain?"
 *
 * D bada ho  → har gap mein kam stations chahiye → easier → TRUE
 * D chota ho → har gap mein zyada stations chahiye → harder → FALSE
 *
 * MONOTONIC pattern:
 *   D: 0.1  0.5  1.0  1.5  2.0  2.5  3.0  ...
 *      ✗    ✗    ✗    ✗    ✓    ✓    ✓    ...
 *                          ↑
 *                 minimum valid D = ANSWER
 *
 * Toh Binary Search karo D pe!
 *
 * ⚠️ YEH PROBLEM DIFFERENT HAI — FLOATING POINT ANSWER!
 * ─────────────────────────────────────────────────────
 * Previous problems mein answer integer tha (days, speed, pages).
 * Yahan answer float hai (distance = 2.5, 0.333..., etc.)
 *
 * Isliye INTEGER binary search nahi, FLOATING POINT binary search use karenge:
 *   while (high - low > EPSILON) → tab tak chalao jab tak precision sufficient na ho
 *   No mid+1 or mid-1 — sirf mid = (low+high)/2
 *
 * SEARCH SPACE:
 * ─────────────
 * low  = 0          → WHY: 0 distance impossible (stations same position pe nahi ho sakti)
 *                          But 0 gives "impossible" → search starts here
 * high = max(gaps)  → WHY: Agar koi station na daalo, max gap = max(gaps). Answer ≤ this.
 *
 * STATIONS NEEDED FORMULA:
 * ─────────────────────────
 * Ek gap mein agar max allowed distance D hai:
 *   sections needed = ceil(gap / D)
 *   new stations to insert = sections - 1 = ceil(gap/D) - 1
 *
 * Example: gap=6, D=2
 *   ceil(6/2) = 3 sections → 3-1 = 2 new stations
 *   Positions: [1, 3, 5, 7] (original + 2 added) → max gap = 2 ✓
 *
 * Example: gap=7, D=2
 *   ceil(7/2) = 4 sections → 4-1 = 3 new stations
 *   7/4 = 1.75 ≤ 2 ✓
 *
 * ALGORITHM:
 * ──────────
 * 1. low=0, high=max(gaps)
 * 2. While (high-low) > EPSILON:
 *    a. mid = (low+high)/2
 *    b. canPlace(mid)? → high=mid  (try smaller D)
 *    c. else           → low=mid   (need larger D)
 * 3. return high
 *
 * TIME:  O(n × log(maxGap / EPSILON))
 *   ~50 iterations for EPSILON=1e-6, each O(n)
 *
 * SPACE: O(1)
 *
 * @param stations - Sorted positions of existing gas stations
 * @param k - Number of new stations to add
 * @returns Minimum possible maximum distance (float, precision 1e-6)
 */

namespace MinMaxGasStationOptimal {
  /**
   * Check: kya max distance = D rakhte hue k stations se kaam chal sakta hai?
   */
  function canPlace(stations: number[], k: number, maxDist: number): boolean {
    let stationsNeeded = 0;

    for (let i = 1; i < stations.length; i++) {
      const gap = stations[i] - stations[i - 1];

      // Kitne sections chahiye taaki har section ≤ maxDist ho?
      // Stations to insert = sections - 1 = ceil(gap/maxDist) - 1
      stationsNeeded += Math.ceil(gap / maxDist) - 1;

      // Early exit
      if (stationsNeeded > k) return false;
    }

    return stationsNeeded <= k;
  }

  function minimiseMaxDistance(stations: number[], k: number): number {
    // Search space
    let low = 0;
    let high = 0;

    // high = maximum gap in original array
    for (let i = 1; i < stations.length; i++) {
      high = Math.max(high, stations[i] - stations[i - 1]);
    }

    // Floating point binary search — converge until precision reached
    // WHY 1e-6? Problem typically asks for 10^-6 precision
    const EPSILON = 1e-6;

    while (high - low > EPSILON) {
      const mid = (low + high) / 2;

      if (canPlace(stations, k, mid)) {
        // mid distance pe possible hai — try smaller
        high = mid;
      } else {
        // mid pe nahi hota — distance badhani padegi
        low = mid;
      }
    }

    // high aur low same point pe converge kar gaye
    return high;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: stations=[1,7], k=2
   *
   * One gap of 6. low=0, high=6
   * Expected answer: 2.0 (gap of 6 ÷ 3 sections = 2 each)
   *
   * ⚠️ Floating point BS — shows first 5 iterations:
   *
   * ═══════════════════════════════════════════════════════════
   * FLOATING POINT BINARY SEARCH
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=0, high=6, mid=3.0                                   │
   * │ canPlace(D=3.0)?                                         │
   * │   gap=6: ceil(6/3)-1 = ceil(2)-1 = 1 station needed     │
   * │   1 ≤ k=2 → TRUE                                        │
   * │ → high=3.0                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=0, high=3.0, mid=1.5                                 │
   * │ canPlace(D=1.5)?                                         │
   * │   gap=6: ceil(6/1.5)-1 = ceil(4)-1 = 3 needed           │
   * │   3 > k=2 → FALSE                                       │
   * │ → low=1.5                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=1.5, high=3.0, mid=2.25                              │
   * │ canPlace(D=2.25)?                                        │
   * │   gap=6: ceil(6/2.25)-1 = ceil(2.667)-1 = 3-1 = 2       │
   * │   2 ≤ k=2 → TRUE                                        │
   * │ → high=2.25                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 4:
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=1.5, high=2.25, mid=1.875                            │
   * │ canPlace(D=1.875)?                                       │
   * │   gap=6: ceil(6/1.875)-1 = ceil(3.2)-1 = 4-1 = 3        │
   * │   3 > k=2 → FALSE                                       │
   * │ → low=1.875                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 5:
   * ┌──────────────────────────────────────────────────────────┐
   * │ low=1.875, high=2.25, mid=2.0625                         │
   * │ canPlace(D=2.0625)?                                      │
   * │   gap=6: ceil(6/2.0625)-1 = ceil(2.909)-1 = 3-1 = 2     │
   * │   2 ≤ k=2 → TRUE                                        │
   * │ → high=2.0625                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ... continues converging:
   *   [1.875 ── 2.0625]
   *   [1.96875 ── 2.0625]
   *   [1.96875 ── 2.015625]
   *   ... → converges to 2.0
   *
   * After ~50 iterations: high ≈ 2.000000 ✅
   *
   * Verification at D=2.0:
   *   stations=[1,7], gap=6
   *   Station 1 at position 3, Station 2 at position 5
   *   Gaps: [1→3]=2, [3→5]=2, [5→7]=2 → max = 2.0 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * STATIONS NEEDED FORMULA EXPLAINED
   * ═══════════════════════════════════════════════════════════
   *
   * gap=10, maxDist=3:
   *   ceil(10/3) = ceil(3.33) = 4 sections needed
   *   New stations = 4-1 = 3
   *
   *   Visualization:
   *   |────────── 10 ──────────|
   *   |──2.5──|──2.5──|──2.5──|──2.5──|
   *            ↑       ↑       ↑
   *         3 new stations, each section = 2.5 ≤ 3 ✓
   *
   * gap=6, maxDist=2:
   *   ceil(6/2) = 3 sections → 2 stations
   *   |──2──|──2──|──2──|  ← perfect equal sections ✓
   *
   * ═══════════════════════════════════════════════════════════
   * WHY FLOATING POINT BINARY SEARCH (not integer)?
   * ═══════════════════════════════════════════════════════════
   *
   * Answer is a real number: 2.0, 0.5, 2.333..., etc.
   * Integer BS would miss values between integers!
   *
   * Integer BS: checks D=1, D=2, D=3 → misses D=1.5, D=2.5, etc.
   * Float BS:   checks D=1.5, D=2.25, D=1.875... → converges to exact answer
   *
   * Stopping condition: (high - low) < 1e-6 (sufficient precision)
   * ~50 iterations needed to reach 1e-6 precision (log2(maxGap/1e-6))
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. k=0: No stations added → return max original gap
   *    low=0, high=maxGap, canPlace(anything)? only if k=0 → returns true only for D≥maxGap
   *    → converges to maxGap ✓
   *
   * 2. Very large k: Can split every gap very finely → answer approaches 0
   *
   * 3. All gaps equal: Stations distributed evenly across all gaps
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing Min-Max Gas Station - BINARY SEARCH (OPTIMAL)\n');

    const testCases: {
      stations: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      {
        stations: [1, 2, 3, 4, 5],
        k: 4,
        expected: 0.5,
        description: 'Equal gaps=1, k=4: each gap gets 1 station → 0.5',
      },
      {
        stations: [1, 7],
        k: 2,
        expected: 2.0,
        description: 'Gap=6, k=2: 3 sections of 2.0',
      },
      {
        stations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        k: 1,
        expected: 1.0,
        description: 'All gaps=1, k=1: one gap becomes 0.5 but others stay 1',
      },
      {
        stations: [1, 13, 17, 23],
        k: 5,
        expected: 3.0,
        description: 'Gap [1,13]=12: ceil(12/3)-1=3 stations → sections of 3',
      },
      {
        stations: [3, 6],
        k: 3,
        expected: 0.75,
        description:
          'Gap=3, k=3: ceil(3/0.75)-1=3 stations → 4 sections of 0.75',
      },
      {
        stations: [1, 2],
        k: 1,
        expected: 0.5,
        description: 'Gap=1, k=1: 2 sections of 0.5',
      },
      {
        stations: [1, 6, 11],
        k: 2,
        expected: 2.5,
        description: 'Gaps=[5,5], k=2: each gets 1 station → 5/2=2.5',
      },
      {
        stations: [1, 3, 5, 7],
        k: 4,
        expected: 1.0,
        description: 'All gaps=2, k=4: each gap gets 1 station → sections of 1',
      },
    ];

    let passed = 0;
    let failed = 0;
    const EPSILON = 1e-5; // slightly loose for test comparison

    for (const { stations, k, expected, description } of testCases) {
      const result = minimiseMaxDistance([...stations], k);
      const isClose = Math.abs(result - expected) < EPSILON;
      const status = isClose ? '✅' : '❌';

      if (isClose) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   stations=[${stations}], k=${k}`);
        console.log(`   Output: ${result.toFixed(6)}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   stations=[${stations}], k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${result.toFixed(6)}\n`);
      }
    }

    console.log('═'.repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('═'.repeat(60));
  }
}

MinMaxGasStationOptimal.runTests();