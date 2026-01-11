function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  // Function to check if two intervals overlap
  function isOverlapping(int1: number[], int2: number[]): boolean {
    // int1[0]------------int1[1]
    //            int2[0]------------int2[1]
    return int1[0] <= int2[1] && int2[0] <= int1[1];
  }

  // Function to merge two overlapping intervals
  function mergeTwoIntervals(int1: number[], int2: number[]): number[] {
    return [Math.min(int1[0], int2[0]), Math.max(int1[1], int2[1])];
  }

  let result: number[][] = [...intervals];
  let merged = true;

  while (merged) {
    merged = false;

    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        // If intervals overlap
        if (isOverlapping(result[i], result[j])) {
          // Merge intervals
          result[i] = mergeTwoIntervals(result[i], result[j]);
          // Remove the merged interval
          result.splice(j, 1);
          merged = true;
          j--; // Adjust j since we removed an element
        }
      }
    }
  }

  return result;
}

console.log(
  mergeIntervals([
    [1, 4],
    [0, 0],
  ])
); // [[1, 6], [8, 10], [15, 18]]
