const matrix_rotate_image = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

/* 
When we rotate an image by 90 degrees clockwise:
  1. The first row becomes the last column
  2. The second row becomes the second-to-last column

Original element at position (i,j) will go to position (j, n-1-i) after 90-degree rotation
*/

function rotateMatrix_Bruteforce(matrix: number[][]): void {
  const n = matrix.length;
  // Create a new matrix of same size
  const rotated: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  // Fill the new matrix according to rotation pattern
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - 1 - i] = matrix[i][j];
    }
  }

  // Copy back to original matrix since we need to modify in-place
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = rotated[i][j];
    }
  }
}

rotateMatrix_Bruteforce(matrix_rotate_image);

console.log('rotated matrix ', JSON.stringify(matrix_rotate_image, null, 2));

// i -> j
// j -> ( n-1 ) - i

/*
 *        | Column 0 | Column 1 | Column 2 |
 * ------------------------------------------
 * Row 0 |  [0][0]  |  [0][1]  |  [0][2]  |
 * ------------------------------------------
 * Row 1 |  [1][0]  |  [1][1]  |  [1][2]  |
 * -----------------------------------------
 * Row 2 |  [2][0]  |  [2][1]  |  [2][2]  |
 * ------------------------------------------
 *
 * arr[row][column]
 *
 * */