/**
 * MINIMUM DAYS TO MAKE M BOUQUETS - BINARY SEARCH ON ANSWER (OPTIMAL)
 * =====================================================================
 *
 * PROBLEM:
 * bloomDay[i] = day flower i blooms. Make m bouquets, each needing k ADJACENT flowers.
 * Return minimum days to wait.
 *
 * INTUITION (Soch):
 * ─────────────────
 * Key observation — MONOTONIC property:
 *
 *   Zyada din = zyada flowers bloomed = easier to make bouquets
 *   Kam din   = kam flowers bloomed  = harder to make bouquets
 *
 * Agar day=D pe m bouquets possible hain → D+1, D+2 ... bhi possible honge!
 * Agar day=D pe possible nahi → D-1, D-2 ... bhi possible nahi honge!
 *
 * Yeh MONOTONIC pattern hai:
 *   [✗, ✗, ✗, ..., ✓, ✓, ✓, ✓]
 *                   ↑
 *             first ✓ = ANSWER (minimum day)
 *
 * Toh brute force (linear scan) ki jagah BINARY SEARCH use karo!
 *
 * SEARCH SPACE:
 * ─────────────
 * left  = min(bloomDay) → WHY: Koi bhi flower is din se pehle bloom nahi karta.
 *                              Is din se kam pe answer possible hi nahi.
 * right = max(bloomDay) → WHY: Is din tak sab flowers bloom kar lete hain.
 *                              Answer guaranteed yahan tak mil jaayega (after edge check).
 *
 * MINIMIZE pattern → Pattern 2 approach:
 *   canMakeBouquets(mid)? → right = mid - 1, save result   (try smaller)
 *   else                  → left  = mid + 1                (need more days)
 *
 * (We use Pattern 1 with result variable here for clarity)
 *
 * canMakeBouquets HELPER (Greedy):
 * ─────────────────────────────────
 * Given day D, greedily count bouquets:
 *   - Traverse left to right
 *   - Count consecutive bloomed flowers
 *   - When consecutive count = k → bouquet made! Reset count.
 *   - If flower not bloomed → chain breaks → reset count
 *
 * ALGORITHM:
 * ──────────
 * 1. m*k > n → return -1
 * 2. left=min(bloomDay), right=max(bloomDay), result=-1
 * 3. While left ≤ right:
 *    a. mid = (left+right)/2
 *    b. canMakeBouquets(mid)? → result=mid, right=mid-1
 *    c. else → left=mid+1
 * 4. return result
 *
 * TIME:  O(n × log(max-min))
 *   Binary search: O(log(max-min)) iterations
 *   Each canMakeBouquets: O(n)
 *
 * SPACE: O(1)
 *
 * @param bloomDay - Day each flower blooms
 * @param m - Number of bouquets needed
 * @param k - Adjacent flowers needed per bouquet
 * @returns Minimum days, or -1 if impossible
 */

namespace MinDaysBouquetsOptimal {
  /**
   * Greedy helper: kya 'day' tak m bouquets ban sakte hain?
   */
  function canMakeBouquets(bloomDay: number[], day: number, m: number, k: number): boolean {
    let bouquets = 0; // Kitne bouquets bane
    let flowers = 0;  // Current consecutive bloomed flowers

    for (const bloom of bloomDay) {
      if (bloom <= day) {
        // Bloom ho chuki hai → adjacent chain mein add karo
        flowers++;

        if (flowers === k) {
          // k consecutive flowers → ek bouquet ready!
          bouquets++;
          flowers = 0; // Reset for next bouquet
        }
      } else {
        // Bloom nahi hui → chain toot gayi
        flowers = 0;
      }

      if (bouquets === m) return true; // Early exit
    }

    return bouquets >= m;
  }

  function minDays(bloomDay: number[], m: number, k: number): number {
    const n = bloomDay.length;

    // Edge case: total flowers needed > available
    if (m * k > n) return -1;

    // Search space boundaries
    let left = Math.min(...bloomDay);
    let right = Math.max(...bloomDay);
    let result = -1; // Will store the minimum valid day found

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (canMakeBouquets(bloomDay, mid, m, k)) {
        // mid pe possible hai — save it, try smaller
        result = mid;
        right = mid - 1;
      } else {
        // mid pe nahi ho saka — zyada din chahiye
        left = mid + 1;
      }
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: bloomDay=[1,10,3,10,2], m=3, k=1
   *
   * Edge check: m*k=3 ≤ n=5 → proceed
   * left=min(1,10,3,10,2)=1,  right=max(...)=10,  result=-1
   *
   * Monotonic pattern over days:
   *   Day:    1    2    3    4  ...  10
   *   Valid:  ✗    ✗    ✓    ✓  ...  ✓
   *                    ↑
   *               answer = 3
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=1, right=10, mid=5                                  │
   * │ canMakeBouquets(day=5)?                                  │
   * │   bloomDay[i] ≤ 5: [1✓, 10✗, 3✓, 10✗, 2✓]             │
   * │   i=0: bloom=1≤5 → flowers=1=k → bouquet=1, reset       │
   * │   i=1: bloom=10>5 → flowers=0                           │
   * │   i=2: bloom=3≤5 → flowers=1=k → bouquet=2, reset       │
   * │   i=3: bloom=10>5 → flowers=0                           │
   * │   i=4: bloom=2≤5 → flowers=1=k → bouquet=3=m → TRUE ✅  │
   * │ → result=5, right=4                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=1, right=4, mid=2                                   │
   * │ canMakeBouquets(day=2)?                                  │
   * │   bloomDay[i] ≤ 2: [1✓, 10✗, 3✗, 10✗, 2✓]             │
   * │   i=0: bloom=1≤2 → flowers=1=k → bouquet=1, reset       │
   * │   i=1: bloom=10>2 → flowers=0                           │
   * │   i=2: bloom=3>2  → flowers=0                           │
   * │   i=3: bloom=10>2 → flowers=0                           │
   * │   i=4: bloom=2≤2 → flowers=1=k → bouquet=2, reset       │
   * │   bouquets=2 < m=3 → FALSE ✗                             │
   * │ → left=3                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=3, right=4, mid=3                                   │
   * │ canMakeBouquets(day=3)?                                  │
   * │   bloomDay[i] ≤ 3: [1✓, 10✗, 3✓, 10✗, 2✓]             │
   * │   i=0: bloom=1≤3 → flowers=1=k → bouquet=1, reset       │
   * │   i=1: bloom=10>3 → flowers=0                           │
   * │   i=2: bloom=3≤3 → flowers=1=k → bouquet=2, reset       │
   * │   i=3: bloom=10>3 → flowers=0                           │
   * │   i=4: bloom=2≤3 → flowers=1=k → bouquet=3=m → TRUE ✅  │
   * │ → result=3, right=2                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=3 > right=2 → EXIT LOOP
   * return result=3 ✅
   *
   * Search space narrowing:
   *   [1 ──────────── 10]
   *   [1 ── 4]              (day 5 valid, try smaller)
   *   [3 ── 4]              (day 2 invalid, go right)
   *   [3 == 3] → result=3   (day 3 valid, try smaller → right=2 < left=3)
   *
   * ═══════════════════════════════════════════════════════════
   * ADJACENT FLOWERS DRY RUN (k=2 example)
   * ═══════════════════════════════════════════════════════════
   *
   * bloomDay=[7,7,7,7,12,7,7], m=2, k=2
   *
   * Day 7: [7✓,7✓,7✓,7✓,12✗,7✓,7✓]
   *   i=0: flowers=1; i=1: flowers=2=k → bouquet=1, reset
   *   i=2: flowers=1; i=3: flowers=2=k → bouquet=2=m → TRUE
   *   Wait — i=3 bloom=7≤7 ✓, flowers=2=k → bouquet=2 ✅
   *   result=7, right=6
   *
   * Day 6: [7✗,7✗,7✗,7✗,12✗,7✗,7✗] (all bloom on day 7, not 6)
   *   No flowers bloom → 0 bouquets → FALSE
   *   left=7
   *
   * left=7 > right=6 → EXIT → return 7 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. m*k > n → return -1 immediately
   * 2. m=1, k=1: any single flower = bouquet → answer = min(bloomDay)
   * 3. m=1, k=n: all n flowers must be adjacent → answer = max(bloomDay)
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Min Days Bouquets - BINARY SEARCH (OPTIMAL)\n");

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
        description: "Dry run example: answer = 3",
      },
      {
        bloomDay: [1, 10, 3, 10, 2], m: 3, k: 2,
        expected: -1,
        description: "Impossible: m*k=6 > n=5",
      },
      {
        bloomDay: [7, 7, 7, 7, 12, 7, 7], m: 2, k: 3,
        expected: 12,
        description: "Needs 3 adjacent: only possible at day 12",
      },
      {
        bloomDay: [1, 1, 1, 1], m: 1, k: 1,
        expected: 1,
        description: "Single flower bouquet, all bloom on day 1",
      },
      {
        bloomDay: [1, 1, 1, 1], m: 2, k: 2,
        expected: 1,
        description: "[0,1]→b1, [2,3]→b2 at day 1",
      },
      {
        bloomDay: [1, 2, 3, 4, 5], m: 1, k: 5,
        expected: 5,
        description: "Need all 5 adjacent → wait till day 5",
      },
      {
        bloomDay: [1, 2, 3], m: 2, k: 2,
        expected: -1,
        description: "Impossible: need 4 flowers, only 3",
      },
      {
        bloomDay: [3, 3, 3, 3], m: 2, k: 2,
        expected: 3,
        description: "All same bloom: [0,1]→b1, [2,3]→b2 → day 3",
      },
      {
        bloomDay: [1, 10, 2, 9, 3, 8, 4, 7, 5, 6], m: 3, k: 2,
        expected: 5,
        description: "Interleaved bloom days: 3 pairs by day 5",
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

MinDaysBouquetsOptimal.runTests();
