// Define a function to print the matrix in a spiral order
function spiralOrder(matrix: number[][]): number[] {
  // Handle edge case
  if (!matrix.length) return [];

  const result: number[] = [];

  // Initialize boundaries
  let top: number = 0;
  let bottom: number = matrix.length - 1;
  let left: number = 0;
  let right: number = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse right: fixed row (top), varying column
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top++;

    // Traverse down: fixed column (right), varying row
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--;

    // Ensure we still have rows to traverse
    if (top <= bottom) {
      // Traverse left: fixed row (bottom), varying column
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--;
    }

    // Ensure we still have columns to traverse
    if (left <= right) {
      // Traverse up: fixed column (left), varying row
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++;
    }
  }

  return result;
}
