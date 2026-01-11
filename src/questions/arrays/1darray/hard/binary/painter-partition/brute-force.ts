function countPainters_brute_force(boards: number[], time: number) {
  let n = boards.length; // size of array
  let painters = 1;
  let boardsPainter = 0;
  for (let i = 0; i < n; i++) {
    if (boardsPainter + boards[i] <= time) {
      // allocate board to current painter
      boardsPainter += boards[i];
    } else {
      // allocate board to next painter
      painters++;
      boardsPainter = boards[i];
    }
  }
  return painters;
}

function findLargestMinDistance_brute_force(boards: number[], k: number) {
  let low = Math.max(...boards);
  let high = boards.reduce((a, b) => a + b, 0);

  for (let time = low; time <= high; time++) {
    if (countPainters_brute_force(boards, time) <= k) {
      return time;
    }
  }
  return low;
}

let boards = [10, 20, 30, 40];
let k = 2;
console.log(findLargestMinDistance_brute_force(boards, k));

// Output: The answer is: 60