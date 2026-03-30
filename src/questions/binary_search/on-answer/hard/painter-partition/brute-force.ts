/**
 * PAINTER'S PARTITION - BRUTE FORCE (LINEAR SCAN)
 * =================================================
 *
 * PROBLEM:
 * n boards hain, har board[i] = uski length (paint karne mein time lagega).
 * k painters hain — sab PARALLEL kaam karte hain.
 * Har painter sirf CONTIGUOUS boards paint kar sakta hai.
 * Minimize karo: maximum time jo kisi bhi ek painter ko lagega.
 *
 * Example:
 *   boards = [10, 20, 30, 40],  k = 2
 *
 *   Option A: Painter1=[10,20,30]=60,  Painter2=[40]=40   → max = 60 ✓
 *   Option B: Painter1=[10,20]=30,     Painter2=[30,40]=70 → max = 70 ✗
 *   Option C: Painter1=[10]=10,        Painter2=[20,30,40]=90 → max = 90 ✗
 *
 *   Answer = 60
 *
 * 💡 YEH BOOK ALLOCATION JAISI HAI!
 * ───────────────────────────────────
 * Book Allocation: students ko books (pages minimize)
 * Painter Partition: painters ko boards (time minimize)
 * Algorithm EXACTLY same hai — sirf variable names alag hain!
 *
 * INTUITION (Soch):
 * ─────────────────
 * Search space: possible "max time" values = [max(boards) .. sum(boards)]
 *
 * left  = max(boards) → WHY: Sabse bada board minimum time set karta hai.
 *                            Koi bhi painter is se kam time mein finish nahi kar sakta.
 * right = sum(boards) → WHY: 1 painter sab boards le le → total time = sum.
 *
 * Brute force: har possible time try karo left se right tak.
 * Pehla time jahan k painters se kaam ho jaaye → woh answer hai!
 *
 * countPainters helper (Greedy):
 * Greedy assignment — current painter ko boards do jab tak time limit cross na ho.
 * Cross hone pe next painter. Count karo kitne painters lage.
 *
 * TIME:  O((sum-max) × n) — linear scan × greedy check
 * SPACE: O(1)
 *
 * @param boards - Array of board lengths
 * @param k - Number of painters
 * @returns Minimum possible maximum time
 */

namespace PainterPartitionBruteForce {
  /**
   * Greedy helper: given maxTime limit, kitne painters lagte hain?
   */
  function countPainters(boards: number[], maxTime: number): number {
    let painters = 1;      // Pehle painter se shuru
    let currentWork = 0;   // Current painter ka kaam

    for (const board of boards) {
      if (currentWork + board <= maxTime) {
        // Current painter yeh board le sakta hai
        currentWork += board;
      } else {
        // Nahi le sakta → next painter
        painters++;
        currentWork = board;
      }
    }

    return painters;
  }

  function minTime(boards: number[], k: number): number {
    // Search space: max(boards) to sum(boards)
    let left = Math.max(...boards);
    let right = boards.reduce((sum, b) => sum + b, 0);

    // Har possible time try karo — pehla valid time = answer
    for (let time = left; time <= right; time++) {
      if (countPainters(boards, time) <= k) {
        return time;
      }
    }

    return right; // Should never reach here
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: boards=[10,20,30,40], k=2
   * left=40, right=100
   *
   * Boards visualization:
   *   [██████████] [████████████████████] [██████████████████████████████] [████████████████████████████████████████]
   *      10              20                          30                                   40
   *
   * ═══════════════════════════════════════════════════════════
   * LINEAR SCAN
   * ═══════════════════════════════════════════════════════════
   *
   * time=40:
   * ┌──────────────────────────────────────────────────────────┐
   * │ countPainters(40)?                                       │
   * │   board=10: 0+10=10 ≤ 40 → work=10                      │
   * │   board=20: 10+20=30 ≤ 40 → work=30                     │
   * │   board=30: 30+30=60 > 40 → painters=2, work=30         │
   * │   board=40: 30+40=70 > 40 → painters=3 > k=2 ✗          │
   * │ painters=3 > k=2 → FALSE                                 │
   * └──────────────────────────────────────────────────────────┘
   * ... (same for 41..59)
   *
   * time=60:
   * ┌──────────────────────────────────────────────────────────┐
   * │ countPainters(60)?                                       │
   * │   board=10: 0+10=10 ≤ 60 → work=10                      │
   * │   board=20: 10+20=30 ≤ 60 → work=30                     │
   * │   board=30: 30+30=60 ≤ 60 → work=60                     │
   * │   board=40: 60+40=100 > 60 → painters=2, work=40        │
   * │ painters=2 ≤ k=2 → TRUE ✅                               │
   * │                                                          │
   * │ Painter 1: [10, 20, 30] = 60 units                       │
   * │ Painter 2: [40]         = 40 units                       │
   * │ Max time  = 60  ✅                                        │
   * └──────────────────────────────────────────────────────────┘
   *
   * return 60 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. k ≥ n: Each painter gets 1 board → answer = max(boards)
   *    left=max, time=max, countPainters(max)=n ≤ k → return max ✓
   *
   * 2. k=1: One painter paints all → answer = sum(boards)
   *    Only time=sum works for 1 painter → return sum ✓
   *
   * 3. All boards equal: [5,5,5,5], k=2
   *    Painter1=[5,5]=10, Painter2=[5,5]=10 → answer=10 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Painter's Partition - BRUTE FORCE\n");

    const testCases: {
      boards: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      {
        boards: [10, 20, 30, 40], k: 2,
        expected: 60,
        description: "Classic: [10,20,30]|[40] → max=60",
      },
      {
        boards: [5, 5, 5, 5], k: 2,
        expected: 10,
        description: "Equal boards: [5,5]|[5,5] → max=10",
      },
      {
        boards: [10, 20, 30, 40], k: 4,
        expected: 40,
        description: "k=n: each painter 1 board → max=max(boards)=40",
      },
      {
        boards: [10, 20, 30, 40], k: 1,
        expected: 100,
        description: "k=1: one painter all boards → sum=100",
      },
      {
        boards: [1, 2, 3, 4, 5], k: 3,
        expected: 6,
        description: "[1,2,3]|[4]|[5] → max=6... or [1,2]|[3,4]? Wait [1,5]|[2,4]|[3]? No contiguous. [1,2,3]=6, [4]=4, [5]=5 → max=6",
      },
      {
        boards: [48, 90], k: 2,
        expected: 90,
        description: "2 boards 2 painters → each gets 1 → max=90",
      },
      {
        boards: [2, 2, 2, 2], k: 4,
        expected: 2,
        description: "k=n: each painter 1 board of length 2",
      },
      {
        boards: [100], k: 1,
        expected: 100,
        description: "Single board single painter → 100",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { boards, k, expected, description } of testCases) {
      const result = minTime([...boards], k);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   boards=[${boards}], k=${k}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   boards=[${boards}], k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

PainterPartitionBruteForce.runTests();
