/**
 * MINIMIZE MAX DISTANCE BETWEEN GAS STATIONS - BRUTE FORCE
 * ==========================================================
 *
 * PROBLEM:
 * Ek road pe n gas stations hain — sorted positions mein.
 * Tumhe k NEW gas stations add karni hain (kisi bhi position pe, between existing ones).
 * Goal: Maximum distance between any two consecutive stations MINIMIZE karo.
 *
 * Example:
 *   stations = [1, 2, 3, 4, 5],  k = 4
 *
 *   Gaps between stations: [1, 1, 1, 1]
 *   Add 1 station in each gap → each gap splits into 2 sections of 0.5
 *   Max distance = 0.5
 *
 * INTUITION (Soch):
 * ─────────────────
 * Greedy approach: Ek ek station place karo.
 * Har baar SABSE BADI SECTION (current max distance wali) mein station daalo.
 * WHY? Kyunki sabse badi section ko tod dena sabse zyada fayda deta hai.
 *
 * Track karte hain: howMany[i] = section i mein kitne extra stations daale.
 * Section i ki current length = (arr[i+1]-arr[i]) / (howMany[i]+1)
 *
 * TIME:  O(k × n) — k stations place karne hain, har baar n sections scan
 * SPACE: O(n) — howMany array
 *
 * WHY NOT OPTIMAL:
 * Agar k = 10^9 → 10^9 iterations — way too slow!
 *
 * @param arr - Sorted positions of existing gas stations
 * @param k   - Number of new stations to add
 * @returns Minimum possible maximum distance (floating point)
 */

namespace MinMaxGasStationBruteForce {
  function minimiseMaxDistance(arr: number[], k: number): number {
    const n = arr.length;

    // howMany[i] = extra stations placed in gap between arr[i] and arr[i+1]
    // Initially 0 extra stations in every section
    const howMany = new Array(n - 1).fill(0);

    // Place k stations one by one, always in the largest current section
    for (let station = 1; station <= k; station++) {
      let maxSection = -1;
      let maxIdx = -1;

      // Find the section with maximum current length
      for (let i = 0; i < n - 1; i++) {
        const gap = arr[i + 1] - arr[i];

        // Current length of section i
        // WHY +1: agar howMany[i]=2, toh 3 subsections hain (2 stations divide gap into 3 parts)
        const sectionLen = gap / (howMany[i] + 1);

        if (sectionLen > maxSection) {
          maxSection = sectionLen;
          maxIdx = i;
        }
      }

      // Place station in the largest section
      howMany[maxIdx]++;
    }

    // Find the maximum section length after placing all stations
    let maxDist = -1;

    for (let i = 0; i < n - 1; i++) {
      const gap = arr[i + 1] - arr[i];
      const sectionLen = gap / (howMany[i] + 1);
      maxDist = Math.max(maxDist, sectionLen);
    }

    return maxDist;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: stations=[1,2,3,4,5], k=4
   *
   * Sections: [1→2, 2→3, 3→4, 4→5]
   * All gaps = 1
   * howMany = [0, 0, 0, 0]
   *
   * ═══════════════════════════════════════════════════════════
   * PLACING 4 STATIONS ONE BY ONE
   * ═══════════════════════════════════════════════════════════
   *
   * Station 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ Section lengths: 1/(0+1)=1, 1/(0+1)=1, 1/(0+1)=1, 1/(0+1)=1 │
   * │ All equal = 1 → pick section 0 (first max)              │
   * │ howMany = [1, 0, 0, 0]                                   │
   * │                                                          │
   * │ Road: 1---*---2---3---4---5                              │
   * │             ↑ new station at 1.5                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * Station 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ Section lengths: 1/(1+1)=0.5, 1, 1, 1                   │
   * │ Max = 1 → pick section 1                                 │
   * │ howMany = [1, 1, 0, 0]                                   │
   * │                                                          │
   * │ Road: 1---*---2---*---3---4---5                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * Station 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ Section lengths: 0.5, 0.5, 1, 1                         │
   * │ Max = 1 → pick section 2                                 │
   * │ howMany = [1, 1, 1, 0]                                   │
   * │                                                          │
   * │ Road: 1---*---2---*---3---*---4---5                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * Station 4:
   * ┌──────────────────────────────────────────────────────────┐
   * │ Section lengths: 0.5, 0.5, 0.5, 1                       │
   * │ Max = 1 → pick section 3                                 │
   * │ howMany = [1, 1, 1, 1]                                   │
   * │                                                          │
   * │ Road: 1---*---2---*---3---*---4---*---5                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final max distance:
   *   All sections: 1/(1+1) = 0.5
   *   return 0.5 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * LARGER GAP EXAMPLE: stations=[1,7], k=2
   * ═══════════════════════════════════════════════════════════
   *
   * One gap of 6. howMany=[0]
   *
   * Station 1: len=6/(0+1)=6 → howMany=[1]
   *   Road: 1---*---*---7  (station placed at 3)
   *         Wait — howMany just counts, doesn't specify exact position
   *         Section: 6/(1+1) = 3
   *
   * Station 2: len=6/(1+1)=3 → howMany=[2]
   *   6/(2+1) = 2
   *
   * Max = 6/(2+1) = 2.0 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. k=0: No stations added → max = largest original gap
   * 2. Large k: Every gap gets many stations → answer approaches 0
   * 3. All gaps equal: stations placed evenly across all gaps
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Min-Max Gas Station - BRUTE FORCE\n");

    const testCases: {
      stations: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      {
        stations: [1, 2, 3, 4, 5], k: 4,
        expected: 0.5,
        description: "Equal gaps: 1 station per gap → 0.5",
      },
      {
        stations: [1, 7], k: 2,
        expected: 2,
        description: "Single gap of 6, 2 stations → 3 sections of 2",
      },
      {
        stations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 1,
        expected: 1,
        description: "All gaps=1, k=1: one gap gets split to 0.5 but max stays 1",
      },
      {
        stations: [1, 13, 17, 23], k: 5,
        expected: 3,
        description: "Unequal gaps: largest gap [1,13]=12 gets most stations",
      },
      {
        stations: [3, 6], k: 3,
        expected: 0.75,
        description: "Gap=3, k=3: 4 sections of 0.75",
      },
      {
        stations: [1, 2], k: 1,
        expected: 0.5,
        description: "Gap=1, k=1: 2 sections of 0.5",
      },
      {
        stations: [1, 3, 5, 7], k: 4,
        expected: 0.5,
        description: "All gaps=2, k=4: 1 station each gap → sections of 1... wait: 2/2=1",
      },
      {
        stations: [1, 6, 11], k: 2,
        expected: 2.5,
        description: "Gaps=[5,5], k=2: each gets 1 station → 5/2=2.5",
      },
    ];

    let passed = 0;
    let failed = 0;
    const EPSILON = 1e-6;

    for (const { stations, k, expected, description } of testCases) {
      const result = minimiseMaxDistance([...stations], k);
      const isClose = Math.abs(result - expected) < EPSILON;
      const status = isClose ? "✅" : "❌";

      if (isClose) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   stations=[${stations}], k=${k}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   stations=[${stations}], k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

MinMaxGasStationBruteForce.runTests();
