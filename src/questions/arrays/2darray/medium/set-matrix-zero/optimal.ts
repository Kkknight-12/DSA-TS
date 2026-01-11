function setZeroes_optimal(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;

  // Step 1: Check if first row and column contain zero
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Check first row
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // Check first column
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // Step 2: Use first row and column as markers
  // Mark 0s on first row and column
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // Mark the first column
        matrix[0][j] = 0; // Mark the first row
      }
    }
  }

  // Step 3: Use marks to set zeros
  // Update cells based on the first row and column
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // Step 4: Set first row and column if needed
  // Handle first row
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // Handle first column
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
}

// Example usage:
const matrix_setZeroes_optimal = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

console.log('Original Matrix:');
console.log(matrix_setZeroes_optimal);
setZeroes_optimal(matrix_setZeroes_optimal);
console.log('\nAfter setting zeroes:');
console.log(matrix_setZeroes_optimal);
