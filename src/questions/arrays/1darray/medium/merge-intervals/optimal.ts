/**
 * ═══════════════════════════════════════════════════════════
 * MERGE INTERVALS — OPTIMAL
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
 * Sort karne ke baad real simplification aata hai.
 *
 * Sorted intervals me:
 *   agar current interval overlap karega,
 *   toh woh last merged interval se hi karega
 *
 * Hume poore result se compare karne ki zarurat nahi.
 * Bas last merged interval dekhna enough hai.
 *
 * Example after sort:
 *   [1,3], [2,6], [8,10], [15,18]
 *
 * Process:
 *   - [1,3] se start
 *   - [2,6] overlaps -> [1,6]
 *   - [8,10] no overlap -> new interval
 *   - [15,18] no overlap -> new interval
 *
 * TIME:  O(n log n) — sorting dominant hai
 * SPACE: O(n) — output / sorted copy
 */

namespace MergeIntervalsOptimal {
  function merge(intervals: number[][]): number[][] {
    if (intervals.length === 0) return [];

    // Pehle start time ke basis par sort karte hain.
    // WHY:
    // overlap checking ko local bana deta hai.
    const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);

    // First interval ko merged list me seedha daal do.
    // Aage ke intervals isi ke against process honge.
    const merged: number[][] = [[...sortedIntervals[0]]];

    for (let i = 1; i < sortedIntervals.length; i++) {
      const current = sortedIntervals[i];
      const lastMerged = merged[merged.length - 1];

      // Sorted order me bas ye check enough hai:
      // current start last merged end ke andar aa raha hai ya nahi.
      if (current[0] <= lastMerged[1]) {
        // Overlap hai, so right boundary ko jitna bada chahiye utna extend karo.
        lastMerged[1] = Math.max(lastMerged[1], current[1]);
      } else {
        // No overlap:
        // current interval ek naya independent block start karta hai.
        merged.push([...current]);
      }
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
   *   merged = [[1,3]]
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ current = [2,6]                                          │
   * │ lastMerged = [1,3]                                       │
   * │ current[0] <= lastMerged[1] ?                            │
   * │ 2 <= 3 ? yes                                             │
   * │ overlap hai                                              │
   * │ lastMerged[1] = max(3, 6) = 6                            │
   * │ merged = [[1,6]]                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ current = [8,10]                                         │
   * │ lastMerged = [1,6]                                       │
   * │ 8 <= 6 ? no                                              │
   * │ no overlap                                               │
   * │ action: push new interval                                │
   * │ merged = [[1,6],[8,10]]                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 3
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ current = [15,18]                                        │
   * │ lastMerged = [8,10]                                      │
   * │ 15 <= 10 ? no                                            │
   * │ no overlap                                               │
   * │ action: push new interval                                │
   * │ merged = [[1,6],[8,10],[15,18]]                          │
   * └──────────────────────────────────────────────────────────┘
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
    console.log("🧪 Testing Merge Intervals — OPTIMAL\n");

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

MergeIntervalsOptimal.runTests();
