/**
 * KOKO EATING BANANAS - BINARY SEARCH ON ANSWER (OPTIMAL)
 * =========================================================
 *
 * PROBLEM:
 * piles[i] = number of bananas in pile i. Koko has h hours.
 * She eats k bananas/hour from ONE pile. Leftover time in an hour is WASTED.
 * Find minimum k to finish all bananas in h hours.
 *
 * INTUITION (Soch):
 * ─────────────────
 * Zyada speed → kam hours lagenge → easier to finish in h hours.
 * Kam speed  → zyada hours lagenge → harder to finish.
 *
 * MONOTONIC pattern:
 *   speed:  1   2   3   4   5  ...  maxPile
 *   valid:  ✗   ✗   ✗   ✓   ✓  ...  ✓
 *                       ↑
 *                  minimum valid speed = ANSWER
 *
 * Brute force: try every speed 1 → maxPile (linear scan — too slow for large piles!)
 * Optimal: Binary search on speed!
 *
 * SEARCH SPACE:
 * ─────────────
 * left  = 1          → WHY: Speed 0 nahi ho sakta. Minimum meaningful speed = 1.
 * right = max(piles) → WHY: Is speed pe har pile 1 ghante mein khatam → total = n ≤ h.
 *                           Is se zyada speed ka koi faida nahi (ek pile ek ghante mein hi khatam).
 *
 * MINIMIZE pattern → find first valid speed:
 *   canFinish(mid)? → result=mid, right=mid-1   (valid hai, chota try karo)
 *   else            → left=mid+1                (bahut slow, speed badhao)
 *
 * canFinish HELPER:
 * ─────────────────
 * Total hours = sum of ceil(pile / speed) for all piles.
 * Agar total ≤ h → YES, finish kar sakti hai.
 *
 * WHY ceil? Partial hour bhi full hour count hoti hai.
 *   pile=7, speed=4: hour1=4 eat, hour2=3 eat+wait → 2 hours = ceil(7/4)
 *
 * ALGORITHM:
 * ──────────
 * 1. left=1, right=max(piles), result=right
 * 2. While left ≤ right:
 *    a. mid = (left+right)/2
 *    b. canFinish(mid)? → result=mid, right=mid-1
 *    c. else → left=mid+1
 * 3. return result
 *
 * TIME:  O(n × log(maxPile))
 *   Binary search: O(log(maxPile)) iterations
 *   Each canFinish: O(n)
 *
 * SPACE: O(1)
 *
 * @param piles - Array of banana pile sizes
 * @param h - Hours available
 * @returns Minimum eating speed
 */

namespace KokoEatingBananasOptimal {
  function canFinish(piles: number[], speed: number, h: number): boolean {
    let totalHours = 0;

    for (const pile of piles) {
      // ceil kyunki partial hour bhi full count hoti hai
      totalHours += Math.ceil(pile / speed);

      // Early exit: already exceeded h → no need to check remaining piles
      if (totalHours > h) return false;
    }

    return totalHours <= h;
  }

  function minEatingSpeed(piles: number[], h: number): number {
    let left = 1;
    let right = Math.max(...piles); // Max speed needed
    let result = right;             // Default: max speed always works

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (canFinish(piles, mid, h)) {
        // mid speed pe ho sakta hai — save karo, chota try karo
        result = mid;
        right = mid - 1;
      } else {
        // mid speed pe nahi hota — speed badhao
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
   * Example: piles=[3,6,7,11], h=8
   *
   * left=1, right=max(3,6,7,11)=11, result=11
   *
   * Monotonic pattern:
   *   speed: 1  2  3  4  5  6  7  8  9  10  11
   *   valid: ✗  ✗  ✗  ✓  ✓  ✓  ✓  ✓  ✓  ✓   ✓
   *                    ↑
   *               answer = 4
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=1, right=11, mid=6                                  │
   * │ canFinish(speed=6)?                                      │
   * │   ceil(3/6)=1, ceil(6/6)=1, ceil(7/6)=2, ceil(11/6)=2  │
   * │   total = 1+1+2+2 = 6 ≤ h=8 → TRUE ✅                   │
   * │ → result=6, right=5                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=1, right=5, mid=3                                   │
   * │ canFinish(speed=3)?                                      │
   * │   ceil(3/3)=1, ceil(6/3)=2, ceil(7/3)=3, ceil(11/3)=4  │
   * │   total = 1+2+3+4 = 10 > h=8 → FALSE ✗                  │
   * │ → left=4                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=4, right=5, mid=4                                   │
   * │ canFinish(speed=4)?                                      │
   * │   ceil(3/4)=1, ceil(6/4)=2, ceil(7/4)=2, ceil(11/4)=3  │
   * │   total = 1+2+2+3 = 8 ≤ h=8 → TRUE ✅                   │
   * │ → result=4, right=3                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=4 > right=3 → EXIT LOOP
   * return result=4 ✅
   *
   * Search space narrowing:
   *   [1 ─────────── 11]
   *   [1 ──── 5]          speed 6 valid, try smaller
   *   [4 ──── 5]          speed 3 invalid, go right
   *   [4 == 4] → result=4 speed 4 valid, try smaller → done!
   *
   * Hour-by-hour at speed=4:
   *   Hour 1: Pile[0](3) → eat 3 → done in 1h  (ceil(3/4)=1)
   *   Hour 2: Pile[1](6) → eat 4, 2 left
   *   Hour 3: Pile[1](2) → eat 2 → done         (ceil(6/4)=2)
   *   Hour 4: Pile[2](7) → eat 4, 3 left
   *   Hour 5: Pile[2](3) → eat 3 → done         (ceil(7/4)=2)
   *   Hour 6: Pile[3](11) → eat 4, 7 left
   *   Hour 7: Pile[3](7)  → eat 4, 3 left
   *   Hour 8: Pile[3](3)  → eat 3 → done        (ceil(11/4)=3)
   *   Total = 8 hours = h ✅ (exactly fits!)
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. h = n (tight):
   *    Each pile must be eaten in exactly 1 hour → need speed ≥ max(piles)
   *    Binary search converges to max(piles)
   *
   * 2. h >> n (lots of time):
   *    Can eat very slowly → speed = 1 if sum(piles) ≤ h
   *
   * 3. Single large pile: piles=[10^9], h=2
   *    speed = ceil(10^9/2) = 5*10^8
   *    Binary search: log(10^9) ≈ 30 iterations — very fast!
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Koko Eating Bananas - BINARY SEARCH (OPTIMAL)\n");

    const testCases: {
      piles: number[];
      h: number;
      expected: number;
      description: string;
    }[] = [
      {
        piles: [3, 6, 7, 11], h: 8,
        expected: 4,
        description: "LeetCode classic: 3-iteration dry run example",
      },
      {
        piles: [30, 11, 23, 4, 20], h: 5,
        expected: 30,
        description: "h=n: must eat each pile in 1 hour → speed=max=30",
      },
      {
        piles: [30, 11, 23, 4, 20], h: 6,
        expected: 23,
        description: "One extra hour: speed=23 works (total=6h)",
      },
      {
        piles: [1, 1, 1, 1], h: 4,
        expected: 1,
        description: "All piles=1: minimum speed=1 always works",
      },
      {
        piles: [1, 1, 1, 1], h: 10,
        expected: 1,
        description: "Extra hours: speed can't go below 1",
      },
      {
        piles: [2, 2, 2, 2], h: 8,
        expected: 1,
        description: "speed=1: each pile=2h, total=8=h ✓",
      },
      {
        piles: [10, 10, 10], h: 6,
        expected: 5,
        description: "speed=5: ceil(10/5)=2, 3*2=6=h ✓",
      },
      {
        piles: [3, 6, 7, 11], h: 4,
        expected: 11,
        description: "h=n=4: each pile in 1 hour → speed=max(piles)=11",
      },
      {
        piles: [312884470], h: 312884469,
        expected: 2,
        description: "Large single pile, h=pile-1 → need speed=2",
      },
      {
        piles: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], h: 10,
        expected: 1,
        description: "10 piles of 1, h=10: speed=1 works perfectly",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { piles, h, expected, description } of testCases) {
      const result = minEatingSpeed([...piles], h);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   piles=[${piles}], h=${h}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   piles=[${piles}], h=${h}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

KokoEatingBananasOptimal.runTests();
