// INITIALIZATION
// In JavaScript, we can create 2D arrays in multiple ways

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


// Method 1: Using Array constructor
const rows = 3;
const columns = 4;
const my2DArray = Array(rows)
  .fill(undefined)
  .map(() => Array(columns).fill(0));

// Method 2: Using Array.from()
const my2DArray1 = Array.from({ length: rows }, () => Array(columns).fill(0));

// Method 3: Using array literals (more common in JavaScript)
const my2DArray2 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// ADDING ELEMENTS TO 2D ARRAY
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    my2DArray[i][j] = i + j;
    // Print in console
    process.stdout.write(my2DArray[i][j] + ' '); // In browser, use console.log
  }
  console.log(); // New line
}

/* 
0 1 2 3 
1 2 3 4 
2 3 4 5 
 */

// UPDATING ELEMENT of 2D ARRAY
console.log('Before update ', my2DArray[0][0]); // Before update
my2DArray[0][0] = 10;
console.log('Before update ', my2DArray[0][0]); // After update

// Pretty print the entire 2D array
console.log(JSON.stringify(my2DArray, null, 2));

// Getting lengths
const rowLen = my2DArray.length;
const colLen = my2DArray[0].length;

//
console.log('row len:', rowLen); // 3
console.log('col len:', colLen); // 4

/* Two Dimensional Array is an array of arrays in JavaScript.
 * These arrays are preferably used if you want to put together data items in a table or
 * matrix-like structure. Matrices are widely used in the field of Game Development, where
 * you are required to store and update the location of the player at each second.
 *
 * INTERVIEW IMPORTANT NOTES:
 * 1. Common Pattern Questions:
 *    - Matrix Traversal: Different ways to traverse (row-wise, column-wise, diagonal)
 *    - Spiral Matrix
 *    - Matrix Rotation
 *    - Island Problems (counting islands, max area)
 *    - Path Finding Problems
 *
 * 2. Key JavaScript Methods for 2D Arrays:
 *    - map(): Transform elements
 *    - reduce(): Combine elements
 *    - flat(): Flatten nested arrays
 *    - Array.from(): Create 2D arrays
 *
 * 3. Time Complexity for Common Operations:
 *    - Accessing Element: O(1)
 *    - Row Traversal: O(n), where n is number of columns
 *    - Column Traversal: O(m), where m is number of rows
 *    - Matrix Traversal: O(m*n)
 *
 * 4. Memory Usage:
 *    - Space Complexity: O(m*n)
 *    - In-place operations are preferred in interviews
 *
 * 5. Common Tricks:
 *    - Use directions array for neighbors:
 *      const dirs = [[0,1], [1,0], [0,-1], [-1,0]]; // right, down, left, up
 *    - Matrix boundaries check:
 *      row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length
 *
 * 6. JavaScript Specific:
 *    - Initialize 2D array: Array(m).fill().map(() => Array(n).fill(0))
 *    - Deep copy: JSON.parse(JSON.stringify(matrix))
 *    - Get dimensions: matrix.length (rows) and matrix[0].length (columns)
 */

/*
 *       | Column 0  | Column 1  | Column 2  |
 * ------------------------------------------
 * Row 0 | x [0][0]  | x [0][1]  | x [0][2]  |
 * ------------------------------------------
 * Row 1 | x [1][0]  | x [1][1]  | x [1][2]  |
 * ------------------------------------------
 * Row 2 | x [2][0]  | x [2][1]  | x [2][2]  |
 * ------------------------------------------
 *
 * arr[row][column]
 *
 * */

/* Common Edge Cases to Consider in Interviews:
 * 1. Empty matrix: matrix.length === 0 || matrix[0].length === 0
 * 2. Single row or column matrix
 * 3. Square vs. Rectangle matrix
 * 4. Matrix with negative numbers (when sum is involved)
 * 5. Matrix boundaries
 * 6. Null/undefined values
 */
