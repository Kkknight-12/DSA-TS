/**
 * AGGRESSIVE COWS - BINARY SEARCH ON ANSWER (OPTIMAL)
 * =====================================================
 *
 * PROBLEM:
 * N stalls aur C cows hain. Cows ko stalls mein place karo
 * is tarah se ki koi bhi do cows ke beech MINIMUM DISTANCE
 * maximum ho. Woh maximum minimum distance dhundho.
 *
 * INTUITION (Soch):
 * ─────────────────
 * "Maximum minimum distance" — yeh sunne mein confusing lagta hai.
 * Seedha socho:
 *
 * Hum answer pe binary search karenge:
 * "Kya minimum distance = D possible hai?"
 *
 * Agar D possible hai → D aur bada try karo (maximize!)
 * Agar D possible nahi → D chota karo
 *
 * Yeh MONOTONIC hai:
 * - Agar D=3 possible hai → D=2, D=1 bhi possible honge
 * - Agar D=5 possible nahi → D=6, D=7 bhi possible nahi honge
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  stalls = [1, 2, 4, 8, 9], cows = 3                      │
 * │                                                          │
 * │  Sorted: [1, 2, 4, 8, 9]                                │
 * │  Search space: [1 .. 9-1] = [1..8]                      │
 * │                                                          │
 * │  D=1: Place at 1,2,4 ✓  (distance 1 between first two)  │
 * │  D=2: Place at 1,4,8 ✓  (gaps: 3,4 ≥ 2)                │
 * │  D=3: Place at 1,4,8 ✓  (gaps: 3,4 ≥ 3)                │
 * │  D=4: Place at 1,8,? → need one more ≥4 from 8          │
 * │        9-8=1 < 4 ✗  can't place 3rd cow                 │
 * │                                                          │
 * │  [✓, ✓, ✓, ✗, ✗, ✗, ✗, ✗]                              │
 * │              ↑                                           │
 * │         max valid = 3 ✅                                 │
 * └──────────────────────────────────────────────────────────┘
 *
 * GREEDY PLACEMENT (isPossible helper):
 * ──────────────────────────────────────
 * Pehli cow pehle stall pe rakho.
 * Aage badhte jao — jab bhi distance >= D milta hai, cow rakho.
 * Agar saari cows place ho gayi → D possible hai!
 *
 * WHY greedy works: Pehle available stall pe rakhne se baaki cows
 * ke liye zyada space bachti hai. Greedy optimal hai yahan.
 *
 * SEARCH SPACE:
 * ─────────────
 * left  = 1               → minimum distance (adjacent stalls)
 * right = max - min       → maximum possible distance (2 cows at extremes)
 *
 * ALGORITHM:
 * ──────────
 * 1. Sort stalls
 * 2. left=1, right=stalls[n-1]-stalls[0], result=-1
 * 3. Binary search (MAXIMIZE → Pattern 1 with result variable):
 *    a. mid = (left+right)/2
 *    b. isPossible(mid)? → result=mid, left=mid+1 (try bigger)
 *    c. else             → right=mid-1 (try smaller)
 * 4. return result
 *
 * TIME COMPLEXITY: O(n log n + n log(max-min))
 *   - Sorting: O(n log n)
 *   - Binary search: O(log(max-min)) iterations
 *   - Each isPossible: O(n)
 *   - Total: O(n log n + n log(max-min))
 *
 * SPACE COMPLEXITY: O(1) after sorting
 */

namespace AggressiveCowsOptimal {
  /**
   * Helper: checks if minimum distance D is achievable with given cows
   * Greedy approach — place each cow at the earliest valid stall
   */
  function isPossible(stalls: number[], cows: number, minDist: number): boolean {
    // Pehli cow pehle stall pe — always optimal starting point
    let cowsPlaced = 1;
    let lastPos = stalls[0];

    for (let i = 1; i < stalls.length; i++) {
      // Kya yeh stall last placed cow se kaafi door hai?
      if (stalls[i] - lastPos >= minDist) {
        // Haan! Yahan cow rakho
        cowsPlaced++;
        lastPos = stalls[i];

        // Saari cows place ho gayi → D possible hai!
        if (cowsPlaced === cows) return true;
      }
    }

    // Saari cows place nahi ho payi
    return false;
  }

  /**
   * Finds the largest minimum distance between cows
   *
   * @param stalls - Array of stall positions (unsorted ok)
   * @param cows - Number of cows to place
   * @returns Maximum possible minimum distance between any two cows
   */
  function aggressiveCows(stalls: number[], cows: number): number {
    // Sort karna zaroori hai — distance calculate karne ke liye
    stalls.sort((a, b) => a - b);

    const n = stalls.length;

    // Search space: [1 .. max_possible_distance]
    // WHY left=1: minimum distance between any 2 cows = 1
    // WHY right=stalls[n-1]-stalls[0]: 2 cows at extreme ends
    let left = 1;
    let right = stalls[n - 1] - stalls[0];
    let result = -1;

    // MAXIMIZE pattern: Pattern 1 (left <= right)
    // WHY not Pattern 2: We want MAXIMUM valid value, so save result & go right
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (isPossible(stalls, cows, mid)) {
        // mid distance possible hai! Save karo aur bada try karo
        result = mid;
        left = mid + 1;
      } else {
        // mid distance possible nahi → chota try karo
        right = mid - 1;
      }
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: stalls = [1, 2, 4, 8, 9], cows = 3
   *
   * After sort: [1, 2, 4, 8, 9]
   * left=1, right=9-1=8, result=-1
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=1, right=8, mid=4                                 │
   * │ isPossible(minDist=4)?                                  │
   * │   Cow 1 → stall[0]=1, lastPos=1, cowsPlaced=1         │
   * │   stall[1]=2: 2-1=1 < 4 → skip                        │
   * │   stall[2]=4: 4-1=3 < 4 → skip                        │
   * │   stall[3]=8: 8-1=7 ≥ 4 → Cow 2 at 8, cowsPlaced=2   │
   * │   stall[4]=9: 9-8=1 < 4 → skip                        │
   * │   Loop ends, cowsPlaced=2 < 3 → FALSE                  │
   * │ → right = 3                                            │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=1, right=3, mid=2                                 │
   * │ isPossible(minDist=2)?                                  │
   * │   Cow 1 → stall[0]=1, lastPos=1, cowsPlaced=1         │
   * │   stall[1]=2: 2-1=1 < 2 → skip                        │
   * │   stall[2]=4: 4-1=3 ≥ 2 → Cow 2 at 4, cowsPlaced=2   │
   * │   stall[3]=8: 8-4=4 ≥ 2 → Cow 3 at 8, cowsPlaced=3   │
   * │   cowsPlaced=3 = cows → TRUE ✓                        │
   * │ → result=2, left=3                                     │
   * └────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌────────────────────────────────────────────────────────┐
   * │ left=3, right=3, mid=3                                 │
   * │ isPossible(minDist=3)?                                  │
   * │   Cow 1 → stall[0]=1, lastPos=1, cowsPlaced=1         │
   * │   stall[1]=2: 2-1=1 < 3 → skip                        │
   * │   stall[2]=4: 4-1=3 ≥ 3 → Cow 2 at 4, cowsPlaced=2   │
   * │   stall[3]=8: 8-4=4 ≥ 3 → Cow 3 at 8, cowsPlaced=3   │
   * │   cowsPlaced=3 = cows → TRUE ✓                        │
   * │ → result=3, left=4                                     │
   * └────────────────────────────────────────────────────────┘
   *
   * left=4 > right=3 → EXIT LOOP
   * return result = 3 ✅
   *
   * Placement visualization for D=3:
   *   Stalls: [1,  2,  4,  8,  9]
   *            🐄      🐄  🐄
   *            1       4   8
   *            ←  3  →← 4 →   (all gaps ≥ 3 ✓)
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. cows = 2:
   *    Always answer = stalls[n-1] - stalls[0] (place at extremes)
   *
   * 2. cows = n (one cow per stall):
   *    answer = minimum gap between adjacent stalls
   *
   * 3. All stalls same position [5,5,5], cows=2:
   *    right = 5-5 = 0 → search space empty
   *    result = -1 (impossible — but problem guarantees valid input)
   *
   * 4. Unsorted input [5,1,8]:
   *    After sort: [1,5,8] → works correctly
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Aggressive Cows - BINARY SEARCH ON ANSWER (OPTIMAL)\n");

    const testCases: {
      stalls: number[];
      cows: number;
      expected: number;
      description: string;
    }[] = [
      // Basic examples
      {
        stalls: [1, 2, 4, 8, 9],
        cows: 3,
        expected: 3,
        description: "Classic example: place at 1,4,8",
      },
      {
        stalls: [1, 2, 8, 4, 9],
        cows: 3,
        expected: 3,
        description: "Unsorted input: same answer after sort",
      },
      {
        stalls: [0, 3, 4, 7, 10, 9],
        cows: 4,
        expected: 3,
        description: "4 cows: place at 0,3,7,10",
      },

      // Edge cases
      {
        stalls: [1, 2],
        cows: 2,
        expected: 1,
        description: "Only 2 stalls, 2 cows → distance = 1",
      },
      {
        stalls: [1, 100],
        cows: 2,
        expected: 99,
        description: "2 stalls far apart, 2 cows → max distance",
      },
      {
        stalls: [1, 2, 3, 4, 5],
        cows: 2,
        expected: 4,
        description: "2 cows → always extremes: 5-1=4",
      },
      {
        stalls: [1, 2, 3, 4, 5],
        cows: 5,
        expected: 1,
        description: "5 cows in 5 stalls → min adjacent gap = 1",
      },

      // Larger examples
      {
        stalls: [1, 3, 5, 10, 20],
        cows: 3,
        expected: 9,
        description: "Place at 1,10,20: gaps 9,10 ≥ 9",
      },
      {
        stalls: [2, 12, 11, 3, 26, 7],
        cows: 3,
        expected: 9,
        description: "Sorted: [2,3,7,11,12,26], place at 2,11,26",
      },
      {
        stalls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        cows: 3,
        expected: 4,
        description: "10 stalls: place at 1,5,9 → gaps of 4",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { stalls, cows, expected, description } of testCases) {
      const result = aggressiveCows([...stalls], cows); // spread to avoid mutating original
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   stalls=[${stalls}], cows=${cows}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   stalls=[${stalls}], cows=${cows}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
AggressiveCowsOptimal.runTests();
