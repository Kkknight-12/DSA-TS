/**
 * PAINTER'S PARTITION - BINARY SEARCH ON ANSWER (OPTIMAL)
 * =========================================================
 *
 * PROBLEM:
 * n boards, k painters (parallel). Har painter contiguous boards le sakta hai.
 * Minimize maximum time kisi ek painter ko lagega.
 *
 * 💡 YEH BOOK ALLOCATION JAISI HAI!
 * ───────────────────────────────────
 *   Book Allocation  →  minimize max PAGES  per student
 *   Painter Partition →  minimize max BOARDS per painter
 *
 *   Same algorithm. Same pattern. Sirf theme alag hai!
 *
 * INTUITION (Soch):
 * ─────────────────
 * Zyada time allow karo → painter zyada boards le sakta hai → kam painters chahiye → easy
 * Kam time allow karo   → painter kam boards le sakta hai   → zyada painters chahiye → hard
 *
 * MONOTONIC pattern:
 *   time: 40  50  60  70  80  ... 100
 *   valid: ✗   ✗   ✓   ✓   ✓  ...  ✓
 *                  ↑
 *           first ✓ = ANSWER = 60
 *
 * Binary search karo time pe! MINIMIZE → Pattern 2 (left < right, right=mid).
 *
 * SEARCH SPACE:
 * ─────────────
 * left  = max(boards) → WHY: Koi ek board hi itna bada ho sakta hai.
 *                            Is se kam time mein koi bhi painter woh board paint nahi kar sakta.
 * right = sum(boards) → WHY: Ek painter sab boards le le → time = sum.
 *
 * canPaint HELPER (Greedy):
 * ─────────────────────────
 * Given maxTime, greedily assign boards:
 *   Current painter boards lete rehta hai jab tak total ≤ maxTime.
 *   Total cross ho → next painter.
 *   Count painters needed. Agar ≤ k → possible!
 *
 * ALGORITHM:
 * ──────────
 * 1. left=max(boards), right=sum(boards)
 * 2. While left < right:
 *    a. mid = (left+right)/2
 *    b. canPaint(mid)? → right=mid    (possible, try smaller time)
 *    c. else           → left=mid+1   (need more time)
 * 3. return left
 *
 * TIME:  O(n × log(sum-max))
 * SPACE: O(1)
 *
 * @param boards - Array of board lengths
 * @param k - Number of painters (work in parallel)
 * @returns Minimum possible maximum time for any painter
 */

namespace PainterPartitionOptimal {
  /**
   * Greedy helper: kya maxTime mein k painters se saare boards paint ho sakte hain?
   */
  function canPaint(boards: number[], k: number, maxTime: number): boolean {
    let painters = 1;    // Pehle painter se shuru
    let currentWork = 0; // Current painter ka accumulated work

    for (const board of boards) {
      if (currentWork + board <= maxTime) {
        // Current painter yeh board le sakta hai
        currentWork += board;
      } else {
        // Nahi le sakta → next painter ko assign karo
        painters++;
        currentWork = board;

        // Early exit: painters limit exceed ho gayi
        if (painters > k) return false;
      }
    }

    return true;
  }

  function minTime(boards: number[], k: number): number {
    // Search space
    let left = Math.max(...boards);
    let right = boards.reduce((sum, b) => sum + b, 0);

    // MINIMIZE pattern: Pattern 2 (left < right, right = mid)
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (canPaint(boards, k, mid)) {
        // mid time pe ho sakta hai — try smaller
        right = mid;
      } else {
        // mid time pe nahi hota — zyada time chahiye
        left = mid + 1;
      }
    }

    // left === right → minimum valid time
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: boards=[10,20,30,40], k=2
   * left=40, right=100
   *
   * Monotonic pattern:
   *   time: 40  50  55  60  65  70 ... 100
   *   valid:  ✗   ✗   ✗   ✓   ✓   ✓ ...  ✓
   *                       ↑
   *                  answer=60
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=40, right=100, mid=70                               │
   * │ canPaint(time=70)?                                       │
   * │   board=10: 0+10=10 ≤ 70 → work=10                      │
   * │   board=20: 10+20=30 ≤ 70 → work=30                     │
   * │   board=30: 30+30=60 ≤ 70 → work=60                     │
   * │   board=40: 60+40=100 > 70 → painters=2, work=40        │
   * │   painters=2 ≤ k=2 → TRUE ✅                             │
   * │ → right=70                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=40, right=70, mid=55                                │
   * │ canPaint(time=55)?                                       │
   * │   board=10: work=10                                      │
   * │   board=20: work=30                                      │
   * │   board=30: 30+30=60 > 55 → painters=2, work=30         │
   * │   board=40: 30+40=70 > 55 → painters=3 > k=2 → FALSE ✗  │
   * │ → left=56                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=56, right=70, mid=63                                │
   * │ canPaint(time=63)?                                       │
   * │   board=10: work=10                                      │
   * │   board=20: work=30                                      │
   * │   board=30: 30+30=60 ≤ 63 → work=60                     │
   * │   board=40: 60+40=100 > 63 → painters=2, work=40        │
   * │   painters=2 ≤ k=2 → TRUE ✅                             │
   * │ → right=63                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 4:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=56, right=63, mid=59                                │
   * │ canPaint(time=59)?                                       │
   * │   board=10: work=10                                      │
   * │   board=20: work=30                                      │
   * │   board=30: 30+30=60 > 59 → painters=2, work=30         │
   * │   board=40: 30+40=70 > 59 → painters=3 > k=2 → FALSE ✗  │
   * │ → left=60                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 5:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=60, right=63, mid=61                                │
   * │ canPaint(time=61)?                                       │
   * │   board=10: work=10                                      │
   * │   board=20: work=30                                      │
   * │   board=30: 30+30=60 ≤ 61 → work=60                     │
   * │   board=40: 60+40=100 > 61 → painters=2, work=40        │
   * │   TRUE ✅ → right=61                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 6:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=60, right=61, mid=60                                │
   * │ canPaint(time=60)?                                       │
   * │   board=10: work=10                                      │
   * │   board=20: work=30                                      │
   * │   board=30: 30+30=60 ≤ 60 → work=60                     │
   * │   board=40: 60+40=100 > 60 → painters=2, work=40        │
   * │   TRUE ✅ → right=60                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=60 === right=60 → EXIT
   * return 60 ✅
   *
   * Search space narrowing:
   *   [40 ──────────── 100]
   *   [40 ────── 70]          time 70 valid, go left
   *   [56 ────── 70]          time 55 invalid, go right
   *   [56 ──── 63]            time 63 valid, go left
   *   [60 ──── 63]            time 59 invalid, go right
   *   [60 ── 61]              time 61 valid, go left
   *   [60 == 60] → answer!    time 60 valid, go left → done
   *
   * Final allocation:
   *   Painter 1: boards [10,20,30] = 60 units ← exactly at limit
   *   Painter 2: boards [40]       = 40 units ← under limit
   *   Max time = 60 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * COMPARISON WITH BOOK ALLOCATION
   * ═══════════════════════════════════════════════════════════
   *
   * Book Allocation                  Painter Partition
   * ─────────────────────────────────────────────────
   * arr = book pages                 boards = board lengths
   * m   = students                   k      = painters
   * max pages per student            max time per painter
   * MINIMIZE max pages               MINIMIZE max time
   * left = max(arr)                  left = max(boards)
   * right = sum(arr)                 right = sum(boards)
   * isPossible(maxPages)             canPaint(maxTime)
   *
   * Algorithm: IDENTICAL! 🎯
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. k ≥ n: left=max, canPaint(max) always true → return max
   * 2. k=1: left keeps moving right until sum → return sum
   * 3. All equal boards [5,5,5,5], k=2: [5,5]|[5,5] → answer=10
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Painter's Partition - BINARY SEARCH (OPTIMAL)\n");

    const testCases: {
      boards: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      {
        boards: [10, 20, 30, 40], k: 2,
        expected: 60,
        description: "Classic 6-iteration dry run: answer=60",
      },
      {
        boards: [5, 5, 5, 5], k: 2,
        expected: 10,
        description: "Equal boards: [5,5]|[5,5] → max=10",
      },
      {
        boards: [10, 20, 30, 40], k: 4,
        expected: 40,
        description: "k=n: each painter 1 board → answer=max(boards)=40",
      },
      {
        boards: [10, 20, 30, 40], k: 1,
        expected: 100,
        description: "k=1: one painter all boards → answer=sum=100",
      },
      {
        boards: [1, 2, 3, 4, 5], k: 3,
        expected: 6,
        description: "k=3: [1,2,3]=6 | [4]=4 | [5]=5 → max=6",
      },
      {
        boards: [48, 90], k: 2,
        expected: 90,
        description: "2 boards 2 painters: each gets 1 → max=90",
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
      {
        boards: [1, 8, 11, 3], k: 2,
        expected: 14,
        description: "[1,8]=9 | [11,3]=14... or [1,8,11]=20 | [3]? → [1,8]|[11,3]=14 ✓",
      },
      {
        boards: [10, 10, 10, 10, 10], k: 5,
        expected: 10,
        description: "5 equal boards 5 painters: each gets 1 → max=10",
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

PainterPartitionOptimal.runTests();
