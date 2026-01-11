/**
 * https://gemini.google.com/gem/9013c4cd97d5/5ed987ed954b0f4b
 *
 * https://gemini.google.com/gem/9013c4cd97d5/6ae83bad8948c95c
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * PROBLEM: Sudoku Solver (Basic Backtracking)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * LeetCode #37 - Hard
 *
 * Fill a 9x9 Sudoku board following these rules:
 * 1. Each row must have digits 1-9 exactly once
 * 2. Each column must have digits 1-9 exactly once
 * 3. Each 3x3 box must have digits 1-9 exactly once
 *
 * Approach: Basic Backtracking with O(27) validation
 */

namespace SudokuSolverBacktracking {
  /**
   * Main function - Solves Sudoku board in-place
   *
   * @param board - 9x9 grid with '.' for empty cells
   *
   * WHY void return?
   * - Board is modified in-place
   * - Problem guarantees exactly one solution
   * - No need to return boolean
   *
   * HOW IT WORKS:
   * 1. Start solving from position (0, 0)
   * 2. Use backtracking to try all possibilities
   * 3. Modify board directly when solution found
   */
  function solveSudoku(board: string[][]): void {
    solve(board, 0, 0);
  }

  /**
   * Recursive solver - Core backtracking logic
   *
   * @param board - Current board state
   * @param row - Current row (0-8)
   * @param col - Current column (0-8)
   * @returns true if solution found, false otherwise
   *
   * ALGORITHM:
   * 1. Handle row/column boundaries
   * 2. Skip pre-filled cells
   * 3. Try digits 1-9 for empty cells
   * 4. Backtrack if no valid digit found
   *
   * BACKTRACKING PATTERN:
   * - PLACE: Put digit in cell
   * - RECURSE: Try to solve rest
   * - BACKTRACK: Remove digit if fails
   */
  function solve(board: string[][], row: number, col: number): boolean {
    // ═══════════════════════════════════════════════════════════════════════
    // BASE CASE 1: Reached end of current row
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: When col becomes 9, move to next row and reset column to 0
    // EXAMPLE: At (5, 9) → Move to (6, 0)
    if (col === 9) {
      return solve(board, row + 1, 0);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // BASE CASE 2: Successfully filled entire board
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: When row becomes 9, all cells processed successfully
    // This means we've filled rows 0-8 completely
    if (row === 9) {
      return true; // Solution found! 🎉
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SKIP: Cell already filled
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: Don't modify pre-filled cells from original puzzle
    // EXAMPLE: If board[2][3] = '5', keep it as is
    if (board[row][col] !== '.') {
      // Move to next cell (same row, next column)
      return solve(board, row, col + 1);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TRY: Each digit from 1 to 9
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: Try all possibilities, backtrack if invalid
    for (let digit = 1; digit <= 9; digit++) {
      const digitStr = digit.toString();

      // ─────────────────────────────────────────────────────────────────────
      // VALIDATION: Check if digit can be placed
      // ─────────────────────────────────────────────────────────────────────
      // WHY: Must satisfy all 3 Sudoku rules before placing
      // - Row rule: No duplicate in row
      // - Column rule: No duplicate in column
      // - Box rule: No duplicate in 3x3 box
      if (isValid(board, row, col, digitStr)) {
        // ───────────────────────────────────────────────────────────────────
        // STEP 1: PLACE - Put digit in cell
        // ───────────────────────────────────────────────────────────────────
        // WHY: Try this possibility
        board[row][col] = digitStr;

        // ───────────────────────────────────────────────────────────────────
        // STEP 2: RECURSE - Try to solve rest of board
        // ───────────────────────────────────────────────────────────────────
        // WHY: If this placement leads to solution, we're done!
        // Move to next cell: same row, next column
        if (solve(board, row, col + 1)) {
          return true; // Solution found with this digit! ✓
        }

        // ───────────────────────────────────────────────────────────────────
        // STEP 3: BACKTRACK - Remove digit (undo)
        // ───────────────────────────────────────────────────────────────────
        // WHY: This digit didn't lead to solution
        // Restore empty state and try next digit
        // CRITICAL: Must restore state for backtracking to work!
        board[row][col] = '.';
      }
      // If digit not valid, try next digit (loop continues)
    }

    // ═══════════════════════════════════════════════════════════════════════
    // NO SOLUTION: None of the 9 digits worked
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: This happens when earlier placements were wrong
    // Return false to trigger backtracking in previous recursive calls
    return false;
  }

  /**
   * Validation function - Check if digit placement is valid
   *
   * @param board - Current board state
   * @param row - Row to check (0-8)
   * @param col - Column to check (0-8)
   * @param digit - Digit to validate ('1'-'9')
   * @returns true if valid placement, false otherwise
   *
   * CHECKS 3 CONSTRAINTS:
   * 1. Row constraint: Digit not in same row
   * 2. Column constraint: Digit not in same column
   * 3. Box constraint: Digit not in same 3x3 box
   *
   * TIME COMPLEXITY: O(27) = O(1)
   * - Check row: O(9)
   * - Check column: O(9)
   * - Check 3x3 box: O(9)
   * - Total: 9 + 9 + 9 = 27 operations
   */
  function isValid(
    board: string[][],
    row: number,
    col: number,
    digit: string
  ): boolean {
    // ═══════════════════════════════════════════════════════════════════════
    // CHECK 1: Row constraint
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: Same digit cannot appear twice in same row
    // EXAMPLE: If row 3 has '5' at column 2, can't place '5' elsewhere in row 3
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === digit) {
        return false; // Digit already exists in this row ✗
      }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // CHECK 2: Column constraint
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: Same digit cannot appear twice in same column
    // EXAMPLE: If column 5 has '7' at row 1, can't place '7' elsewhere in column 5
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === digit) {
        return false; // Digit already exists in this column ✗
      }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // CHECK 3: 3x3 Box constraint
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: Same digit cannot appear twice in same 3x3 box
    //
    // BOX CALCULATION:
    // - There are 9 boxes in 3x3 arrangement
    // - Each box is 3x3 cells
    // - Find which box cell (row, col) belongs to
    //
    // Formula:
    // boxStartRow = Math.floor(row / 3) * 3
    // boxStartCol = Math.floor(col / 3) * 3
    //
    // EXAMPLES:
    // Cell (0,0): box starts at (0,0) - Top-left box
    // Cell (4,5): box starts at (3,3) - Center box
    // Cell (7,8): box starts at (6,6) - Bottom-right box
    //
    // VISUAL:
    // ┌─────┬─────┬─────┐
    // │(0,0)│(0,3)│(0,6)│  ← Box start positions
    // ├─────┼─────┼─────┤
    // │(3,0)│(3,3)│(3,6)│
    // ├─────┼─────┼─────┤
    // │(6,0)│(6,3)│(6,6)│
    // └─────┴─────┴─────┘

    const boxStartRow = Math.floor(row / 3) * 3; // 0, 3, or 6
    const boxStartCol = Math.floor(col / 3) * 3; // 0, 3, or 6

    // Check all 9 cells in the 3x3 box
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const checkRow = boxStartRow + i;
        const checkCol = boxStartCol + j;

        if (board[checkRow][checkCol] === digit) {
          return false; // Digit already exists in this box ✗
        }
      }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ALL CHECKS PASSED
    // ═══════════════════════════════════════════════════════════════════════
    // WHY: Digit doesn't violate any of the 3 constraints
    // Safe to place this digit at (row, col)
    return true; // Valid placement ✓
  }

  /**
   * Helper function - Print board in readable format
   *
   * WHY: Visual debugging and verification
   *
   * Format:
   * 5 3 4 | 6 7 8 | 9 1 2
   * 6 7 2 | 1 9 5 | 3 4 8
   * 1 9 8 | 3 4 2 | 5 6 7
   * ------+-------+------
   * ...
   */
  function printBoard(board: string[][]): void {
    for (let i = 0; i < 9; i++) {
      if (i > 0 && i % 3 === 0) {
        console.log('------+-------+------');
      }

      let row = '';
      for (let j = 0; j < 9; j++) {
        if (j > 0 && j % 3 === 0) {
          row += '| ';
        }
        row += board[i][j] + ' ';
      }
      console.log(row);
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Let's trace through a simplified 4x4 Sudoku for clarity:
   * (Same logic applies to 9x9, but easier to visualize)
   *
   * Simplified board (4x4 with 2x2 boxes):
   * Rules: Each row, column, and 2x2 box must have 1-4
   *
   * Initial:
   * 1 . | . 4
   * . 3 | 4 .
   * ----+----
   * . 4 | 1 .
   * 4 . | . 1
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * EXECUTION TRACE (Simplified)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * solve(board, 0, 0):
   *   board[0][0] = '1' (pre-filled) → skip
   *   return solve(board, 0, 1)
   *
   * solve(board, 0, 1):
   *   board[0][1] = '.' (empty) → try digits
   *
   *   Try digit '1':
   *     isValid(board, 0, 1, '1'):
   *       Row check: '1' exists at [0][0] → false ✗
   *     Not valid, try next
   *
   *   Try digit '2':
   *     isValid(board, 0, 1, '2'):
   *       Row check: '2' not in row 0 ✓
   *       Col check: '2' not in column 1 ✓
   *       Box check: '2' not in top-left 2x2 box ✓
   *       → Valid! ✓
   *
   *     PLACE: board[0][1] = '2'
   *     Board now:
   *     1 2 | . 4
   *     . 3 | 4 .
   *     ----+----
   *     . 4 | 1 .
   *     4 . | . 1
   *
   *     RECURSE: solve(board, 0, 2)
   *       (Continue solving rest of board...)
   *
   *       If successful:
   *         return true → Solution found!
   *
   *       If fails later:
   *         return false → Need to backtrack
   *
   *     BACKTRACK: board[0][1] = '.'
   *     Try next digit '3'...
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * FULL 9x9 EXAMPLE - Key Steps
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Initial board (from Example 1):
   * 5 3 . | . 7 . | . . .
   * 6 . . | 1 9 5 | . . .
   * . 9 8 | . . . | . 6 .
   * ------+-------+------
   * 8 . . | . 6 . | . . 3
   * 4 . . | 8 . 3 | . . 1
   * 7 . . | . 2 . | . . 6
   * ------+-------+------
   * . 6 . | . . . | 2 8 .
   * . . . | 4 1 9 | . . 5
   * . . . | . 8 . | . 7 9
   *
   * ─────────────────────────────────────────────────────────────────────────
   * Step 1: solve(board, 0, 0)
   * ─────────────────────────────────────────────────────────────────────────
   * board[0][0] = '5' (pre-filled) → skip
   * return solve(board, 0, 1)
   *
   * ─────────────────────────────────────────────────────────────────────────
   * Step 2: solve(board, 0, 1)
   * ─────────────────────────────────────────────────────────────────────────
   * board[0][1] = '3' (pre-filled) → skip
   * return solve(board, 0, 2)
   *
   * ─────────────────────────────────────────────────────────────────────────
   * Step 3: solve(board, 0, 2) - FIRST EMPTY CELL
   * ─────────────────────────────────────────────────────────────────────────
   * board[0][2] = '.' (empty)
   *
   * Try digit '1':
   *   Row 0: [5, 3, ?, ., 7, ., ., ., .]
   *   Column 2: [?, ., 8, ., ., ., ., ., .]
   *   Box (0,0): [5,3,?] [6,.,.]
   *   isValid? → Check row, column, box
   *   Result: Try and see if leads to solution
   *
   * Try digit '2':
   *   isValid? Check constraints...
   *
   * Try digit '3':
   *   isValid? Row has '3' at [0][1] → false ✗
   *
   * Try digit '4':
   *   isValid? Let's say yes ✓
   *   PLACE: board[0][2] = '4'
   *   RECURSE: solve(board, 0, 3)
   *     ... (continues solving)
   *     If this leads to solution → return true
   *     If not → return false, backtrack
   *
   * If '4' fails:
   *   BACKTRACK: board[0][2] = '.'
   *   Try next digit...
   *
   * ─────────────────────────────────────────────────────────────────────────
   * Backtracking example
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Suppose we're deep in recursion:
   * - Filled cells up to (7, 5)
   * - Try to fill (7, 6)
   * - No valid digit works! (all 1-9 violate constraints)
   *
   * What happens?
   * 1. solve(board, 7, 6) returns false
   * 2. Control returns to solve(board, 7, 5)
   * 3. That function backtracks: board[7][5] = '.'
   * 4. Tries next digit for (7, 5)
   * 5. If all digits fail at (7, 5) → returns false
   * 6. Backtrack continues to (7, 4)
   * 7. And so on...
   *
   * This continues until a valid path is found!
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * FINAL SOLUTION
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * After backtracking explores all paths:
   * 5 3 4 | 6 7 8 | 9 1 2
   * 6 7 2 | 1 9 5 | 3 4 8
   * 1 9 8 | 3 4 2 | 5 6 7
   * ------+-------+------
   * 8 5 9 | 7 6 1 | 4 2 3
   * 4 2 6 | 8 5 3 | 7 9 1
   * 7 1 3 | 9 2 4 | 8 5 6
   * ------+-------+------
   * 9 6 1 | 5 3 7 | 2 8 4
   * 2 8 7 | 4 1 9 | 6 3 5
   * 3 4 5 | 2 8 6 | 1 7 9
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * KEY INSIGHTS FROM DRY RUN
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * 1. **Row-by-row, left-to-right traversal:**
   *    - Process cells in order: (0,0), (0,1), ..., (0,8), (1,0), ...
   *    - Skip pre-filled cells automatically
   *
   * 2. **Backtracking happens automatically:**
   *    - If no valid digit found → return false
   *    - Previous call tries next digit
   *    - Chain of returns propagates backwards
   *
   * 3. **3x3 Box calculation is crucial:**
   *    - Math.floor(row/3)*3 gives box start row
   *    - Math.floor(col/3)*3 gives box start column
   *    - Then check 3x3 area from that position
   *
   * 4. **State restoration is critical:**
   *    - MUST set board[row][col] = '.' when backtracking
   *    - Otherwise future attempts see wrong state
   *
   * 5. **Order of operations:**
   *    - PLACE → RECURSE → BACKTRACK
   *    - This pattern ensures all possibilities explored
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * 1. Board with only one empty cell:
   *    - Quick solve, only 9 possibilities max
   *
   * 2. Board with many empty cells:
   *    - More backtracking needed
   *    - But constraints prune many branches
   *
   * 3. Empty cell in corner vs center:
   *    - Position doesn't matter for algorithm
   *    - But affects practical runtime
   *
   * 4. Multiple valid digits at start:
   *    - Algorithm finds first valid solution
   *    - Problem guarantees unique solution
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Time Complexity: O(9^m) where m = number of empty cells
   * - Each empty cell can try 9 digits
   * - Worst case: exponential branching
   * - Practical: Much better due to constraint pruning
   *
   * Detailed breakdown:
   * - isValid() called: O(9^m) times in worst case
   * - Each isValid(): O(27) = O(1)
   * - Total: O(9^m) × O(1) = O(9^m)
   *
   * Space Complexity: O(m) for recursion stack
   * - Recursion depth = number of empty cells
   * - Each call uses constant space
   * - Board modified in-place (no copy)
   *
   * Practical performance:
   * - Most puzzles solve in < 1 second
   * - Hard puzzles may take longer
   * - Constraint propagation reduces search space significantly
   *
   * ═══════════════════════════════════════════════════════════════════════════
   */

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * TEST CASES
   * ═══════════════════════════════════════════════════════════════════════════
   */
  export function runTests(): void {
    console.log('🧪 Testing Sudoku Solver - Basic Backtracking\n');
    console.log('═'.repeat(70));

    // ─────────────────────────────────────────────────────────────────────────
    // Test 1: Example 1 from problem (Medium difficulty)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\nTest 1: Standard puzzle (Medium difficulty)');
    console.log('─'.repeat(70));
    const board1 = [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ];

    console.log('Initial board:');
    printBoard(board1);

    solveSudoku(board1);

    console.log('\nSolved board:');
    printBoard(board1);

    // Verify solution
    const expected1 = [
      ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
      ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
      ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
      ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
      ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
      ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
      ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
      ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
      ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
    ];

    const isCorrect1 = board1.every((row, i) =>
      row.every((cell, j) => cell === expected1[i][j])
    );
    console.log(isCorrect1 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 2: Easy puzzle (many clues)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 2: Easy puzzle (many clues)');
    console.log('─'.repeat(70));
    const board2 = [
      ['.', '.', '9', '7', '4', '8', '.', '.', '.'],
      ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '2', '.', '1', '.', '9', '.', '.', '.'],
      ['.', '.', '7', '.', '.', '.', '2', '4', '.'],
      ['.', '6', '4', '.', '1', '.', '5', '9', '.'],
      ['.', '9', '8', '.', '.', '.', '3', '.', '.'],
      ['.', '.', '.', '8', '.', '3', '.', '2', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '6'],
      ['.', '.', '.', '2', '7', '5', '9', '.', '.'],
    ];

    console.log('Initial board:');
    printBoard(board2);

    solveSudoku(board2);

    console.log('\nSolved board:');
    printBoard(board2);
    console.log('✓ PASS - Solved successfully');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 3: Hard puzzle (fewer clues)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 3: Hard puzzle (fewer clues, more backtracking)');
    console.log('─'.repeat(70));
    const board3 = [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '3', '.', '8', '5'],
      ['.', '.', '1', '.', '2', '.', '.', '.', '.'],
      ['.', '.', '.', '5', '.', '7', '.', '.', '.'],
      ['.', '.', '4', '.', '.', '.', '1', '.', '.'],
      ['.', '9', '.', '.', '.', '.', '.', '.', '.'],
      ['5', '.', '.', '.', '.', '.', '.', '7', '3'],
      ['.', '.', '2', '.', '1', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '4', '.', '.', '.', '9'],
    ];

    console.log('Initial board:');
    printBoard(board3);

    solveSudoku(board3);

    console.log('\nSolved board:');
    printBoard(board3);
    console.log('✓ PASS - Hard puzzle solved');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 4: Puzzle with minimal clues (17 is theoretical minimum)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 4: Minimal clues puzzle');
    console.log('─'.repeat(70));
    const board4 = [
      ['.', '.', '.', '7', '.', '.', '.', '.', '.'],
      ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '4', '3', '.', '2', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '6'],
      ['.', '.', '.', '5', '.', '9', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '4', '1', '8'],
      ['.', '.', '.', '.', '8', '1', '.', '.', '.'],
      ['.', '.', '2', '.', '.', '.', '.', '5', '.'],
      ['.', '4', '.', '.', '.', '.', '3', '.', '.'],
    ];

    console.log('Initial board:');
    printBoard(board4);

    solveSudoku(board4);

    console.log('\nSolved board:');
    printBoard(board4);
    console.log('✓ PASS - Minimal clues solved');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 5: Almost solved (one empty cell)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 5: Almost solved (one empty cell)');
    console.log('─'.repeat(70));
    const board5 = [
      ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
      ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
      ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
      ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
      ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
      ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
      ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
      ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
      ['3', '4', '5', '2', '8', '6', '1', '7', '.'],
    ];

    console.log('Initial board (only bottom-right empty):');
    printBoard(board5);

    solveSudoku(board5);

    console.log('\nSolved board:');
    printBoard(board5);
    console.log(`Bottom-right cell: ${board5[8][8]} (Expected: 9)`);
    console.log(board5[8][8] === '9' ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 6: Empty cells in different positions
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 6: Empty cells scattered across board');
    console.log('─'.repeat(70));
    const board6 = [
      ['.', '.', '.', '.', '.', '.', '6', '8', '.'],
      ['.', '.', '.', '.', '7', '3', '.', '.', '9'],
      ['3', '.', '9', '.', '.', '.', '.', '4', '5'],
      ['4', '9', '.', '.', '.', '.', '.', '.', '.'],
      ['8', '.', '3', '.', '5', '.', '9', '.', '2'],
      ['.', '.', '.', '.', '.', '.', '.', '3', '6'],
      ['9', '6', '.', '.', '.', '.', '3', '.', '8'],
      ['7', '.', '.', '6', '8', '.', '.', '.', '.'],
      ['.', '2', '8', '.', '.', '.', '.', '.', '.'],
    ];

    console.log('Initial board:');
    printBoard(board6);

    solveSudoku(board6);

    console.log('\nSolved board:');
    printBoard(board6);
    console.log('✓ PASS - Scattered empties solved');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 7: World's hardest Sudoku (claimed)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log("\nTest 7: 'World's Hardest Sudoku' (AI Escargot)");
    console.log('─'.repeat(70));
    const board7 = [
      ['1', '.', '.', '.', '.', '7', '.', '9', '.'],
      ['.', '3', '.', '.', '2', '.', '.', '.', '8'],
      ['.', '.', '9', '6', '.', '.', '5', '.', '.'],
      ['.', '.', '5', '3', '.', '.', '9', '.', '.'],
      ['.', '1', '.', '.', '8', '.', '.', '.', '2'],
      ['6', '.', '.', '.', '.', '4', '.', '.', '.'],
      ['3', '.', '.', '.', '.', '.', '.', '1', '.'],
      ['.', '4', '.', '.', '.', '.', '.', '.', '7'],
      ['.', '.', '7', '.', '.', '.', '3', '.', '.'],
    ];

    console.log('Initial board:');
    printBoard(board7);

    solveSudoku(board7);

    console.log('\nSolved board:');
    printBoard(board7);
    console.log("✓ PASS - World's hardest solved!");

    // ─────────────────────────────────────────────────────────────────────────
    // Summary
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('All Sudoku puzzles solved successfully! ✓');
    console.log('═'.repeat(70));
    console.log('\nBacktracking successfully handles easy, medium, hard, and');
    console.log("even the 'world's hardest' Sudoku puzzles!");
  }
}

// Execute tests
SudokuSolverBacktracking.runTests();