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

function setZeroes_bruteforce(matrix: number[][]): void {
  // Edge case - if matrix is empty
  if (matrix.length === 0 || matrix[0].length === 0) return;

  const m = matrix.length; // number of rows
  const n = matrix[0].length; // number of columns

  // Step 1: Create a copy of the original matrix
  const copy: number[][] = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));

  // Copy all elements from original matrix
  // i is row
  // j is column
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      copy[i][j] = matrix[i][j];
    }
  }

  // Step 2: Find zeros and set entire row and column to zero
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        // Set entire row to zero
        for (let col = 0; col < n; col++) {
          copy[i][col] = 0;
        }
        // Set entire column to zero
        for (let row = 0; row < m; row++) {
          copy[row][j] = 0;
        }
      }
    }
  }

  // Step 3: Copy back to original matrix
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = copy[i][j];
    }
  }
}

// Example usage:
const matrix1 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

console.log('Original Matrix:');
console.log(matrix1);
setZeroes_bruteforce(matrix1);
console.log('After setting zeroes:');
console.log(matrix1);

/* 
Let's break down the brute force solution:

1. **Understanding the Approach:**
   - Create a copy of the original matrix to store our modifications
   - For each 0 found in original matrix, set entire row and column to 0 in copy
   - Copy back the results to original matrix

2. **Time Complexity Analysis:**
   - Creating copy matrix: O(mn)
   - Finding zeros and setting rows/columns: O(mn * (m+n))
   - Copying back: O(mn)
   - Total: O(mn * (m+n)) where m is number of rows and n is number of columns

3. **Space Complexity:**
   - Extra matrix of size m×n: O(mn)

4. **Advantages:**
   - Simple to understand and implement
   - Preserves original matrix until all modifications are done
   - Good for learning/understanding the problem

5. **Disadvantages:**
   - High space complexity O(mn)
   - Not optimal time complexity
   - Not suitable for large matrices

**Interview Notes 📝:**
1. Always mention you know this isn't the optimal solution
2. Explain why you're starting with this (easier to understand, stepping stone to optimal)
3. Identify the bottlenecks (space complexity in this case)
4. Be ready to optimize further
*/
