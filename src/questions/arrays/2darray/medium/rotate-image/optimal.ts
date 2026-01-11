function rotateMatrix_optimal(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Step 1: Transpose the matrix
  for (let i = 0; i < rows; i++) {
    for (let j = i; j < cols; j++) {
      // Swap matrix[i][j] with matrix[j][i]
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols / 2; j++) {
      // Swap matrix[i][j] with matrix[i][cols - 1 - j]
      [matrix[i][j], matrix[i][cols - 1 - j]] = [
        matrix[i][cols - 1 - j],
        matrix[i][j],
      ];
    }
  }
}
