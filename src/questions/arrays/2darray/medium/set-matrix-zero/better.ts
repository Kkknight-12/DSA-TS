function setZeroes(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;

  // Step 1: Create two arrays to mark which rows and columns should be set to zero
  const rowsToZero: boolean[] = new Array(m).fill(false);
  const colsToZero: boolean[] = new Array(n).fill(false);

  // Step 2: Mark the rows and columns that need to be set to zero
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        rowsToZero[i] = true; // Mark this row
        colsToZero[j] = true; // Mark this column
      }
    }
  }

  // Step 3: Set marked rows to zero
  for (let i = 0; i < m; i++) {
    if (rowsToZero[i]) {
      for (let j = 0; j < n; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  // Step 4: Set marked columns to zero
  for (let j = 0; j < n; j++) {
    if (colsToZero[j]) {
      for (let i = 0; i < m; i++) {
        matrix[i][j] = 0;
      }
    }
  }
}

// Example usage:
const matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

console.log('Original Matrix:');
console.log(matrix);
setZeroes(matrix);
console.log('\nAfter setting zeroes:');
console.log(matrix);
