/**
 * KOKO EATING BANANAS - BRUTE FORCE (LINEAR SCAN)
 * =================================================
 *
 * PROBLEM:
 * Koko ek monkey hai. Usके paas n piles of bananas hain. Guards h hours mein wapas aayenge.
 * Koko har ghante mein ek pile se k bananas khaa sakti hai.
 *
 * RULES:
 *   - Ek ghante mein sirf EK PILE se khaa sakti hai
 *   - Agar pile mein k se kam bananas hain → woh poori pile kha leti hai aur RUK JAATI HAI
 *     (bacha hua time next pile ke liye use NAHI hota)
 *   - Hours needed for one pile = ceil(pile / k)
 *
 * GOAL: Minimum eating speed k nikalo jis pe h ghanton mein saari bananas kha sake.
 *
 * Example:
 *   piles = [3, 6, 7, 11],  h = 8
 *
 *   speed=3: ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 > 8 ✗
 *   speed=4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 =  8 ≤ 8 ✓
 *   Answer = 4
 *
 * INTUITION (Soch):
 * ─────────────────
 * Speed 1 se start karo. Har speed pe check karo: "Kya is speed pe h ghanton mein kha sakti hai?"
 * Pehla speed jahan YES milta hai — wahi minimum speed hai!
 *
 * WHY ceil(pile/speed)?
 *   pile=7, speed=4:
 *   Hour 1: 4 khaye, 3 bacha
 *   Hour 2: 3 khaye (pile khatam), rest of hour WASTED (can't start next pile)
 *   Total = 2 hours = ceil(7/4) = ceil(1.75) = 2 ✓
 *
 * WHY BRUTE FORCE IS SLOW:
 * Linear scan speed 1 → max(piles). If max pile = 10^9 → 10^9 iterations!
 *
 * TIME:  O(maxPile × n) — for each of maxPile speeds, scan n piles
 * SPACE: O(1)
 *
 * @param piles - Array of banana pile sizes
 * @param h - Hours available before guards return
 * @returns Minimum eating speed
 */

namespace KokoEatingBananasBruteForce {
  function minEatingSpeed(piles: number[], h: number): number {
    // Maximum speed needed = max pile size
    // WHY: At this speed, every pile finishes in ≤1 hour → total hours = n ≤ h
    const maxPile = Math.max(...piles);

    // Try every speed from 1 upward — first valid one is the answer
    for (let speed = 1; speed <= maxPile; speed++) {
      let totalHours = 0;

      for (const pile of piles) {
        // ceil kyunki partial hour bhi full hour count hoti hai
        // EXAMPLE: pile=7, speed=4 → 7/4=1.75 → ceil=2 hours
        totalHours += Math.ceil(pile / speed);
      }

      // Pehla speed jahan total hours ≤ h → minimum speed!
      if (totalHours <= h) {
        return speed;
      }
    }

    return maxPile; // Should never reach here given valid input
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: piles=[3,6,7,11], h=8
   * maxPile = 11
   *
   * Pile visualization:
   *   Pile 0: 🍌🍌🍌           (3 bananas)
   *   Pile 1: 🍌🍌🍌🍌🍌🍌     (6 bananas)
   *   Pile 2: 🍌🍌🍌🍌🍌🍌🍌   (7 bananas)
   *   Pile 3: 🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌 (11 bananas)
   *
   * ═══════════════════════════════════════════════════════════
   * LINEAR SCAN
   * ═══════════════════════════════════════════════════════════
   *
   * speed=1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ ceil(3/1)+ceil(6/1)+ceil(7/1)+ceil(11/1)               │
   * │ = 3 + 6 + 7 + 11 = 27 > h=8 ✗                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * speed=2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ ceil(3/2)+ceil(6/2)+ceil(7/2)+ceil(11/2)               │
   * │ = 2 + 3 + 4 + 6 = 15 > h=8 ✗                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * speed=3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3)               │
   * │ = 1 + 2 + 3 + 4 = 10 > h=8 ✗                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * speed=4:
   * ┌──────────────────────────────────────────────────────────┐
   * │ ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4)               │
   * │ = 1  +  2  +  2  +  3  = 8 ≤ h=8 ✓ → return 4!        │
   * │                                                          │
   * │ Breakdown:                                               │
   * │   Pile 0 (3): 3/4=0.75 → ceil=1 hour                   │
   * │   Pile 1 (6): 6/4=1.5  → ceil=2 hours                  │
   * │   Pile 2 (7): 7/4=1.75 → ceil=2 hours                  │
   * │   Pile 3 (11): 11/4=2.75 → ceil=3 hours                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * return 4 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. h = n (tight): each pile must be eaten in exactly 1 hour
   *    → speed = max(piles) (fastest possible)
   *
   * 2. h >> n: lots of extra hours → very slow speed works
   *    piles=[1,1,1,1], h=100 → speed=1 works!
   *
   * 3. Single pile: piles=[10^9], h=2 → speed = ceil(10^9/2) = 5*10^8
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Koko Eating Bananas - BRUTE FORCE\n");

    const testCases: {
      piles: number[];
      h: number;
      expected: number;
      description: string;
    }[] = [
      {
        piles: [3, 6, 7, 11], h: 8,
        expected: 4,
        description: "LeetCode classic: speed=4 gives exactly 8 hours",
      },
      {
        piles: [30, 11, 23, 4, 20], h: 5,
        expected: 30,
        description: "h=n: must eat each pile in 1 hour → speed=max=30",
      },
      {
        piles: [30, 11, 23, 4, 20], h: 6,
        expected: 23,
        description: "One extra hour: speed=23 works (total=6)",
      },
      {
        piles: [1, 1, 1, 1], h: 4,
        expected: 1,
        description: "All piles=1: minimum speed=1 always works",
      },
      {
        piles: [1, 1, 1, 1], h: 10,
        expected: 1,
        description: "Extra hours: still speed=1, can't go below 1",
      },
      {
        piles: [2, 2, 2, 2], h: 8,
        expected: 1,
        description: "speed=1: each pile takes 2h, total=8=h ✓",
      },
      {
        piles: [10, 10, 10], h: 6,
        expected: 5,
        description: "speed=5: ceil(10/5)=2, 3*2=6=h ✓",
      },
      {
        piles: [3, 6, 7, 11], h: 4,
        expected: 11,
        description: "h=n: must eat each in 1 hour → speed=max(piles)=11",
      },
      {
        piles: [312884470], h: 312884469,
        expected: 2,
        description: "Large pile with h=pile-1: need speed=2",
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
        console.log(`   piles=[${h}], h=${h}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

KokoEatingBananasBruteForce.runTests();
