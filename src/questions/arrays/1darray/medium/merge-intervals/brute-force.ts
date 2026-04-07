/**
 * ═══════════════════════════════════════════════════════════
 * MERGE INTERVALS — BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Intervals diye gaye hain, jahan har interval `[start, end]` form me hai.
 * Hume saare overlapping intervals ko merge karke final interval list return karni hai.
 *
 * Important:
 *   intervals touching at boundary bhi merge hote hain
 *   example: [1,4] and [4,5] -> [1,5]
 *
 * EXAMPLES:
 *   [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]
 *   [[1,4],[4,5]]                -> [[1,5]]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force me:
 *   pehle intervals ko start ke basis par sort karo
 *   phir har interval se dekhte jao ki woh kitna aage tak merge ho sakta hai
 *
 * Current interval `[start, end]` ke liye:
 *   future me jitne intervals overlap karte rahenge,
 *   un sab ko absorb karte jao
 *
 * Lekin brute part ye hai:
 *   har interval ke liye aage ka scan dobara chalta hai
 *
 * TIME:  O(n^2) — har interval ke liye future scan ho sakta hai
 * SPACE: O(n) — sorted copy + result
 */

namespace MergeIntervalsBruteForce {
  function merge(intervals: number[][]): number[][] {
    if (intervals.length === 0) return [];

    const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);
    const merged: number[][] = [];

    for (let i = 0; i < sortedIntervals.length; i++) {
      const start = sortedIntervals[i][0];
      let end = sortedIntervals[i][1];

      // Agar current interval ka start previous merged interval ke andar aa raha hai,
      // toh ye interval already kisi pehle merge cluster me absorb ho chuka hai.
      if (merged.length > 0 && start <= merged[merged.length - 1][1]) {
        continue;
      }

      // Ab current interval ko base maan kar dekho ki aage kitna extend ho sakta hai.
      for (let j = i + 1; j < sortedIntervals.length; j++) {
        const nextStart = sortedIntervals[j][0];
        const nextEnd = sortedIntervals[j][1];

        // Sort hone ki wajah se bas itna check enough hai:
        // next interval ka start current end ke andar aa raha hai ya nahi.
        if (nextStart <= end) {
          // Overlap hai, so merged interval ko aur right tak bada do.
          end = Math.max(end, nextEnd);
        } else {
          // Sorted order me iske baad ke starts aur bade hi honge,
          // so ab aur koi overlap possible nahi.
          break;
        }
      }

      merged.push([start, end]);
    }

    return merged;
  }

  function normalize(intervals: number[][]): number[][] {
    return [...intervals]
      .map((interval) => [...interval])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * intervals = [[1,3],[2,6],[8,10],[15,18]]
   *
   * After sorting:
   *   [[1,3],[2,6],[8,10],[15,18]]
   *
   * Start:
   *   merged = []
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 0
   * ═══════════════════════════════════════════════════════════
   *
   * Current base interval:
   *   start = 1
   *   end = 3
   *
   * `merged.length > 0` ? no
   * so skip condition nahi lagegi
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 1 -> next interval = [2,6]                          │
   * │ nextStart = 2, current end = 3                          │
   * │ 2 <= 3 ? yes                                             │
   * │ overlap hai                                              │
   * │ end = max(3, 6) = 6                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 2 -> next interval = [8,10]                         │
   * │ nextStart = 8, current end = 6                          │
   * │ 8 <= 6 ? no                                              │
   * │ overlap nahi hai                                         │
   * │ break                                                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * Push:
   *   merged = [[1,6]]
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * Current interval:
   *   [2,6]
   *
   * Skip check:
   *   start = 2
   *   last merged end = 6
   *   2 <= 6 ? yes
   *
   * Meaning:
   *   [2,6] already previous merged interval [1,6] me absorb ho chuka hai
   *
   * Action:
   *   continue
   *
   * merged still:
   *   [[1,6]]
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * Current base interval:
   *   start = 8
   *   end = 10
   *
   * Skip check:
   *   8 <= last merged end(6) ? no
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ j = 3 -> next interval = [15,18]                        │
   * │ nextStart = 15, current end = 10                        │
   * │ 15 <= 10 ? no                                            │
   * │ break                                                    │
   * └──────────────────────────────────────────────────────────┘
   *
   * Push:
   *   merged = [[1,6],[8,10]]
   *
   * ═══════════════════════════════════════════════════════════
   * OUTER LOOP: i = 3
   * ═══════════════════════════════════════════════════════════
   *
   * Current base interval:
   *   start = 15
   *   end = 18
   *
   * Skip check:
   *   15 <= last merged end(10) ? no
   *
   * Inner loop chalega hi nahi, because future interval hai hi nahi.
   *
   * Push:
   *   merged = [[1,6],[8,10],[15,18]]
   *
   * Final answer:
   *   [[1,6],[8,10],[15,18]]
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty input -> []
   * 2. Single interval -> same interval
   * 3. Already non-overlapping -> same order after sort
   * 4. Fully nested intervals -> one large interval
   * 5. Touching boundaries also merge: [1,4] and [4,5] -> [1,5]
   */

  export function runTests(): void {
    console.log("🧪 Testing Merge Intervals — BRUTE FORCE\n");

    const tests: Array<{ intervals: number[][]; expected: number[][] }> = [
      {
        intervals: [
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ],
        expected: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
      },
      {
        intervals: [
          [1, 4],
          [4, 5],
        ],
        expected: [[1, 5]],
      },
      {
        intervals: [
          [1, 4],
          [2, 3],
        ],
        expected: [[1, 4]],
      },
      {
        intervals: [
          [6, 8],
          [1, 9],
          [2, 4],
          [4, 7],
        ],
        expected: [[1, 9]],
      },
      {
        intervals: [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        expected: [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
      },
      { intervals: [], expected: [] },
      { intervals: [[5, 7]], expected: [[5, 7]] },
      {
        intervals: [
          [1, 10],
          [2, 3],
          [4, 8],
          [9, 10],
        ],
        expected: [[1, 10]],
      },
      {
        intervals: [
          [2, 3],
          [4, 5],
          [6, 7],
          [8, 9],
          [1, 10],
        ],
        expected: [[1, 10]],
      },
      {
        intervals: [
          [1, 4],
          [0, 0],
        ],
        expected: [
          [0, 0],
          [1, 4],
        ],
      },
    ];

    tests.forEach(({ intervals, expected }, i) => {
      const result = merge(intervals);
      const pass =
        JSON.stringify(normalize(result)) === JSON.stringify(normalize(expected));

      console.log(`Test ${i + 1}: intervals=${JSON.stringify(intervals)}`);
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got:      ${JSON.stringify(result)} -> ${pass ? "✅" : "❌"}`);
    });
  }
}

MergeIntervalsBruteForce.runTests();
