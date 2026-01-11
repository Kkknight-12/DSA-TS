function mergeOverlappingIntervals_optimal(intervals: number[][]) {
  if (intervals.length === 0) return [];

  // [ [ 1, 3 ], [ 2, 6 ], [ 8, 10 ], [ 15, 18 ] ]
  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [sortedIntervals[0]]; // [ 1, 3 ]

  for (let i = 1; i < sortedIntervals.length; i++) {
    const last = merged[merged.length - 1]; // [ 1, 3 ]
    const current = sortedIntervals[i]; // [ 2, 6 ]

    // 2 <= 3
    if (current[0] <= last[1]) {
      // [1, 3] => [1, 6]
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

const ans = mergeOverlappingIntervals_optimal([
  [1, 3],
  [8, 10],
  [2, 6],
  [15, 18],
]);
console.log(ans); // [[1, 6], [8, 10], [15, 18]]
