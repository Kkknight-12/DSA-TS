/**
 * https://gemini.google.com/gem/9013c4cd97d5/720384d4c1c88a25
 *
 * https://gemini.google.com/gem/9013c4cd97d5/6ff7f80941d42c9f
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * N-QUEENS - BASIC BACKTRACKING
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Problem: Place n queens on n×n chessboard such that no two queens attack
 *          each other. Return all distinct solutions.
 *
 * Pattern: Backtracking (Row-by-Row Placement)
 *
 * Approach:
 * - Place queens one row at a time (top to bottom)
 * - For each row, try each column
 * - Check if position is safe (no attacks)
 * - If safe: place queen, recurse to next row
 * - Backtrack: remove queen and try next position
 *
 * Time Complexity: O(n!)
 * - At most n! configurations to try
 * - Heavy pruning reduces actual attempts
 *
 * Space Complexity: O(n²)
 * - Board storage: O(n²)
 * - Recursion depth: O(n)
 * - Results storage: O(solutions × n²)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace NQueensBacktracking {
  /**
   * Main function: Find all solutions to n-queens puzzle
   *
   * @param n - Size of chessboard (n×n) and number of queens
   * @returns Array of solutions, each solution is array of row strings
   */
  function solveNQueens(n: number): string[][] {
    // Edge Case: Invalid input
    // WHY: Need at least 1×1 board
    if (n <= 0) return [];

    // Edge Case: n = 2 or n = 3 have no solutions
    // WHY: Impossible to place queens without attacks
    // FACT: n=1 has 1 solution, n=2,3 have 0, n≥4 have solutions
    if (n === 2 || n === 3) return [];

    // Step 1: Initialize board with all empty cells
    // WHY: Start with clean board, will place queens during backtracking
    // REPRESENTATION: '.' = empty, 'Q' = queen
    // EXAMPLE: For n=4, create [[".",".",".","."], [...], [...], [...]]
    const board: string[][] = Array(n)
      .fill(null)
      .map(() => Array(n).fill('.'));

    // Step 2: Array to store all valid solutions
    // WHY: Need to collect ALL distinct configurations
    const results: string[][] = [];

    // Step 3: Start backtracking from row 0
    // WHY: Place queens row by row, starting from top
    backtrack(board, 0, n, results);

    // Step 4: Return all found solutions
    return results;
  }

  /**
   * Backtracking helper: Try to place queens starting from given row
   *
   * @param board - Current state of chessboard
   * @param row - Current row to place queen in
   * @param n - Board size
   * @param results - Array to collect solutions
   */
  function backtrack(
    board: string[][],
    row: number,
    n: number,
    results: string[][]
  ): void {
    // BASE CASE: Placed all n queens successfully!
    // WHY: If we've processed all n rows, we have a valid solution
    // EXAMPLE: row=4 for n=4 means all 4 queens placed ✓
    if (row === n) {
      // Convert 2D board to array of row strings
      // WHY: Output format requires array of strings
      // EXAMPLE: [[".",".","Q","."], ...] → ["..Q.", ...]
      const solution = board.map((r) => r.join(''));
      results.push(solution);
      return;
    }

    // RECURSIVE CASE: Try placing queen in each column of current row
    // WHY: Need to explore all possible positions
    // PATTERN: Try → Check → Recurse → Undo (Backtrack)

    for (let col = 0; col < n; col++) {
      // Step 1: Check if this position is safe
      // WHY: Can only place queen if not under attack
      // CHECKS: Column, main diagonal, anti-diagonal
      if (isSafe(board, row, col, n)) {
        // Step 2: PLACE queen (make choice)
        // WHY: Try this position
        board[row][col] = 'Q';

        // Step 3: RECURSE to next row
        // WHY: Try to place remaining queens
        // CRITICAL: This explores the subtree with queen at (row, col)
        backtrack(board, row + 1, n, results);

        // Step 4: BACKTRACK - Remove queen (undo choice)
        // WHY: Try other positions in this row
        // CRITICAL: Restore board state for next iteration!
        board[row][col] = '.';
      }
      // If position not safe, skip to next column (implicit backtrack)
    }

    // After trying all columns in this row, return to previous row
    // (implicit backtrack to previous recursive call)
  }

  /**
   * Safety check: Can we place queen at (row, col) without attacks?
   *
   * @param board - Current board state
   * @param row - Row to check
   * @param col - Column to check
   * @param n - Board size
   * @returns true if position is safe, false otherwise
   */
  function isSafe(
    board: string[][],
    row: number,
    col: number,
    n: number
  ): boolean {
    // CHECK 1: Column attack (vertical)
    // WHY: Check if any queen in same column in previous rows
    // NOTE: Don't check below current row (no queens placed yet!)
    //
    // Visual:
    //   ?   ← row 0 (check)
    //   ?   ← row 1 (check)
    //   ?   ← row 2 (check)
    //   X   ← row 3 (current position)
    //   ↑
    //  col
    //
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') {
        return false; // Column occupied!
      }
    }

    // CHECK 2: Main diagonal attack (↖ direction)
    // WHY: Check if any queen on same main diagonal above
    // PATTERN: Move up-left (row--, col--)
    //
    // Visual:
    //   Q . . .  ← (0,0) diagonal
    //   . ? . .
    //   . . ? .
    //   . . . X  ← current (3,3)
    //
    // Same diagonal: row - col = constant
    // Example: (0,0), (1,1), (2,2), (3,3) all have row-col = 0
    //
    let i = row - 1;
    let j = col - 1;
    while (i >= 0 && j >= 0) {
      if (board[i][j] === 'Q') {
        return false; // Diagonal occupied!
      }
      i--;
      j--;
    }

    // CHECK 3: Anti-diagonal attack (↗ direction)
    // WHY: Check if any queen on same anti-diagonal above
    // PATTERN: Move up-right (row--, col++)
    //
    // Visual:
    //   . . . Q  ← (0,3) anti-diagonal
    //   . . ? .
    //   . ? . .
    //   X . . .  ← current (3,0)
    //
    // Same anti-diagonal: row + col = constant
    // Example: (0,3), (1,2), (2,1), (3,0) all have row+col = 3
    //
    i = row - 1;
    j = col + 1;
    while (i >= 0 && j < n) {
      if (board[i][j] === 'Q') {
        return false; // Anti-diagonal occupied!
      }
      i--;
      j++;
    }

    // All checks passed!
    // WHY: No queen attacks this position
    return true;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input: n = 4
   *
   * Initial State:
   * board = [
   *   [".", ".", ".", "."],
   *   [".", ".", ".", "."],
   *   [".", ".", ".", "."],
   *   [".", ".", ".", "."]
   * ]
   * row = 0
   * results = []
   *
   * ═══════════════════════════════════════════════════════════════════════
   * FINDING FIRST SOLUTION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * CALL 1: backtrack(board, row=0, n=4, results)
   * ────────────────────────────────────────────────────────────────────
   * Check: row === n? 0 === 4? NO
   *
   * Try placing queen in row 0:
   *
   * Loop iteration: col = 0
   *   isSafe(board, 0, 0, 4)?
   *     Check column: No previous rows → Safe ✓
   *     Check diagonals: No previous rows → Safe ✓
   *     → return true
   *
   *   Position (0,0) is SAFE!
   *   Action: board[0][0] = 'Q'
   *
   *   Board state:
   *   Q . . .
   *   . . . .
   *   . . . .
   *   . . . .
   *
   *   → Recurse: backtrack(board, row=1, ...)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ RECURSIVE CALL:                                                 │
   * │ From: backtrack(row=0, col=0)                                   │
   * │ To: backtrack(row=1)                                            │
   * │ Reason: Placed queen at (0,0), try next row                    │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * CALL 2: backtrack(board, row=1, n=4, results)
   * ────────────────────────────────────────────────────────────────────
   * Check: row === n? 1 === 4? NO
   *
   * Try placing queen in row 1:
   *
   * Loop iteration: col = 0
   *   isSafe(board, 1, 0, 4)?
   *     Check column 0: board[0][0] = 'Q' → UNSAFE ❌
   *     → return false
   *
   *   Position (1,0) is NOT SAFE, skip!
   *
   * Loop iteration: col = 1
   *   isSafe(board, 1, 1, 4)?
   *     Check column 1: board[0][1] = '.' → Safe ✓
   *     Check main diagonal: (0,0) has 'Q', 0-0=0, 1-1=0 → Same diagonal! ❌
   *     → return false
   *
   *   Position (1,1) is NOT SAFE, skip!
   *
   * Loop iteration: col = 2
   *   isSafe(board, 1, 2, 4)?
   *     Check column 2: Safe ✓
   *     Check main diagonal: Start from (0,1), has '.', continue...all safe ✓
   *     Check anti-diagonal: Start from (0,3), out of bounds, safe ✓
   *     → return true
   *
   *   Position (1,2) is SAFE!
   *   Action: board[1][2] = 'Q'
   *
   *   Board state:
   *   Q . . .
   *   . . Q .
   *   . . . .
   *   . . . .
   *
   *   → Recurse: backtrack(board, row=2, ...)
   *
   *
   * CALL 3: backtrack(board, row=2, n=4, results)
   * ────────────────────────────────────────────────────────────────────
   * Check: row === n? 2 === 4? NO
   *
   * Try placing queen in row 2:
   *
   * Loop iteration: col = 0
   *   isSafe(board, 2, 0, 4)?
   *     Check column 0: board[0][0] = 'Q' → UNSAFE ❌
   *
   * Loop iteration: col = 1
   *   isSafe(board, 2, 1, 4)?
   *     Check column 1: Safe ✓
   *     Check main diagonal: Check (1,0), has '.', safe ✓
   *     Check anti-diagonal: Check (1,2), has 'Q' → UNSAFE! ❌
   *     (1+2=3, 2+1=3, same anti-diagonal!)
   *
   * Loop iteration: col = 2
   *   isSafe(board, 2, 2, 4)?
   *     Check column 2: board[1][2] = 'Q' → UNSAFE ❌
   *
   * Loop iteration: col = 3
   *   isSafe(board, 2, 3, 4)?
   *     Check column 3: Safe ✓
   *     Check main diagonal: Check (1,2), has 'Q'
   *     1-2=-1, 2-3=-1, same diagonal! → UNSAFE ❌
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ NO SAFE POSITION IN ROW 2!                                      │
   * │ All 4 columns tried, none work                                  │
   * │ → Return to CALL 2 (backtrack)                                  │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * BACK TO CALL 2: backtrack(row=1)
   * ────────────────────────────────────────────────────────────────────
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ CONTROL FLOW - AFTER backtrack(row=2) RETURNS:                 │
   * │                                                                 │
   * │ We're in: for loop at col=2                                     │
   * │ Just tried: backtrack(row=2) after placing queen at (1,2)      │
   * │ Result: Failed (no solution found)                              │
   * │ Next action: BACKTRACK - Remove queen from (1,2)               │
   * │ Then: Continue loop to col=3                                    │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Action: board[1][2] = '.' (BACKTRACK!)
   *
   * Board state restored:
   * Q . . .
   * . . . .
   * . . . .
   * . . . .
   *
   * Loop iteration: col = 3
   *   isSafe(board, 1, 3, 4)?
   *     Check column 3: Safe ✓
   *     Check main diagonal: Safe ✓
   *     Check anti-diagonal: Check (0,2), has '.', safe ✓
   *     → return true
   *
   *   Position (1,3) is SAFE!
   *   Action: board[1][3] = 'Q'
   *
   *   Board state:
   *   Q . . .
   *   . . . Q
   *   . . . .
   *   . . . .
   *
   *   → Recurse: backtrack(board, row=2, ...)
   *
   *
   * CALL 4: backtrack(board, row=2, n=4, results)
   * ────────────────────────────────────────────────────────────────────
   *
   * Try placing queen in row 2:
   *
   * Loop iteration: col = 0
   *   isSafe(board, 2, 0, 4)? Column occupied → NO
   *
   * Loop iteration: col = 1
   *   isSafe(board, 2, 1, 4)?
   *     Column safe, diagonals safe ✓
   *     → return true
   *
   *   Position (2,1) is SAFE!
   *   Action: board[2][1] = 'Q'
   *
   *   Board state:
   *   Q . . .
   *   . . . Q
   *   . Q . .
   *   . . . .
   *
   *   → Recurse: backtrack(board, row=3, ...)
   *
   *
   * CALL 5: backtrack(board, row=3, n=4, results)
   * ────────────────────────────────────────────────────────────────────
   *
   * Try placing queen in row 3:
   *
   * Loop iteration: col = 0
   *   isSafe(board, 3, 0, 4)? Column occupied → NO
   *
   * Loop iteration: col = 1
   *   isSafe(board, 3, 1, 4)? Column occupied → NO
   *
   * Loop iteration: col = 2
   *   isSafe(board, 3, 2, 4)?
   *     Column safe ✓
   *     Main diagonal safe ✓
   *     Anti-diagonal safe ✓
   *     → return true
   *
   *   Position (3,2) is SAFE!
   *   Action: board[3][2] = 'Q'
   *
   *   Board state:
   *   Q . . .
   *   . . . Q
   *   . Q . .
   *   . . Q .
   *
   *   → Recurse: backtrack(board, row=4, ...)
   *
   *
   * CALL 6: backtrack(board, row=4, n=4, results)
   * ────────────────────────────────────────────────────────────────────
   * Check: row === n? 4 === 4? YES! ✓
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ BASE CASE HIT!                                                  │
   * │ Successfully placed all 4 queens!                               │
   * │ Solution found: [".Q..","...Q","Q...","..Q."]                  │
   * │ Add to results                                                  │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Action:
   *   solution = ["Q...", "...Q", ".Q..", "..Q."]
   *   results.push(solution)
   *   return
   *
   * results = [["Q...","...Q",".Q..","..Q."]]
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * BACKTRACKING TO FIND MORE SOLUTIONS
   * ═══════════════════════════════════════════════════════════════════════
   *
   * BACK TO CALL 5: backtrack(row=3)
   * ────────────────────────────────────────────────────────────────────
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ CONTROL FLOW:                                                   │
   * │ backtrack(row=4) returned                                       │
   * │ We're in: for loop at col=2                                     │
   * │ Action: BACKTRACK - board[3][2] = '.'                          │
   * │ Loop continues: try col=3                                       │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Action: board[3][2] = '.'
   *
   * Loop iteration: col = 3
   *   isSafe(board, 3, 3, 4)?
   *     Check anti-diagonal: (1,3) has 'Q', 1+3=4, 3+3=6, different! Safe ✓
   *     But check main diagonal: (2,2) would be checked...
   *     Wait, (2,1) not (2,2), let me recalculate...
   *     Actually checking properly: Column 3 occupied by (1,3) → UNSAFE ❌
   *
   * No more columns, return to CALL 4
   *
   * This pattern continues, backtracking through all possibilities...
   *
   * Eventually finds second solution:
   * . . Q .
   * Q . . .
   * . . . Q
   * . Q . .
   *
   * Final results: [
   *   [".Q..","...Q","Q...","..Q."],
   *   ["..Q.","Q...","...Q",".Q.."]
   * ]
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * KEY OBSERVATIONS
   * ═══════════════════════════════════════════════════════════════════════
   *
   * 1. Backtracking Pattern:
   *    - Place queen (board[row][col] = 'Q')
   *    - Recurse to next row
   *    - Remove queen (board[row][col] = '.') ← CRITICAL!
   *
   * 2. Loop Continuation After Return:
   *    - When recursive call returns, loop continues
   *    - Tries remaining columns in current row
   *    - This explores ALL possible placements
   *
   * 3. Pruning:
   *    - isSafe() prevents exploring invalid branches
   *    - If position unsafe, skip immediately
   *    - Huge reduction in search space!
   *
   * 4. Complete Exploration:
   *    - Every possible valid configuration found
   *    - Backtracking ensures nothing missed
   *
   */

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Helper: Print board in readable format
   */
  function printBoard(solution: string[]): void {
    solution.forEach((row) => console.log('  ' + row));
  }

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log('🧪 Testing N-Queens - Basic Backtracking\n');

    // Test 1: n = 1 (trivial case)
    console.log('Test 1: n = 1 (Single queen)');
    const result1 = solveNQueens(1);
    console.log(`n = 1`);
    console.log(`Solutions found: ${result1.length}`);
    result1.forEach((sol, i) => {
      console.log(`  Solution ${i + 1}:`);
      printBoard(sol);
    });
    console.log(`Expected: 1 solution`);
    console.log(`✓ ${result1.length === 1 ? 'PASS' : 'FAIL'}\n`);

    // Test 2: n = 2 (impossible)
    console.log('Test 2: n = 2 (Impossible)');
    const result2 = solveNQueens(2);
    console.log(`n = 2`);
    console.log(`Solutions found: ${result2.length}`);
    console.log(`Expected: 0 solutions (impossible)`);
    console.log(`✓ ${result2.length === 0 ? 'PASS' : 'FAIL'}\n`);

    // Test 3: n = 3 (impossible)
    console.log('Test 3: n = 3 (Impossible)');
    const result3 = solveNQueens(3);
    console.log(`n = 3`);
    console.log(`Solutions found: ${result3.length}`);
    console.log(`Expected: 0 solutions (impossible)`);
    console.log(`✓ ${result3.length === 0 ? 'PASS' : 'FAIL'}\n`);

    // Test 4: n = 4 (2 solutions)
    console.log('Test 4: n = 4');
    const result4 = solveNQueens(4);
    console.log(`n = 4`);
    console.log(`Solutions found: ${result4.length}`);
    result4.forEach((sol, i) => {
      console.log(`  Solution ${i + 1}:`);
      printBoard(sol);
      console.log();
    });
    console.log(`Expected: 2 solutions`);
    console.log(`✓ ${result4.length === 2 ? 'PASS' : 'FAIL'}\n`);

    // Test 5: n = 5 (10 solutions)
    console.log('Test 5: n = 5');
    const result5 = solveNQueens(5);
    console.log(`n = 5`);
    console.log(`Solutions found: ${result5.length}`);
    console.log(`Expected: 10 solutions`);
    console.log(`✓ ${result5.length === 10 ? 'PASS' : 'FAIL'}\n`);

    // Test 6: n = 6 (4 solutions)
    console.log('Test 6: n = 6');
    const result6 = solveNQueens(6);
    console.log(`n = 6`);
    console.log(`Solutions found: ${result6.length}`);
    console.log(`Expected: 4 solutions`);
    console.log(`✓ ${result6.length === 4 ? 'PASS' : 'FAIL'}\n`);

    // Test 7: n = 7 (40 solutions)
    console.log('Test 7: n = 7');
    const result7 = solveNQueens(7);
    console.log(`n = 7`);
    console.log(`Solutions found: ${result7.length}`);
    console.log(`Expected: 40 solutions`);
    console.log(`✓ ${result7.length === 40 ? 'PASS' : 'FAIL'}\n`);

    // Test 8: n = 8 (92 solutions - famous!)
    console.log('Test 8: n = 8 (Classic 8-Queens)');
    const result8 = solveNQueens(8);
    console.log(`n = 8`);
    console.log(`Solutions found: ${result8.length}`);
    console.log(`Expected: 92 solutions (classic problem!)`);
    console.log(`✓ ${result8.length === 92 ? 'PASS' : 'FAIL'}\n`);

    // Test 9: Edge case - n = 0
    console.log('Test 9: n = 0 (Edge case)');
    const result9 = solveNQueens(0);
    console.log(`n = 0`);
    console.log(`Solutions found: ${result9.length}`);
    console.log(`Expected: 0 solutions (invalid input)`);
    console.log(`✓ ${result9.length === 0 ? 'PASS' : 'FAIL'}\n`);

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('Known Solutions Count:');
    console.log('n=1: 1 solution');
    console.log('n=2: 0 solutions');
    console.log('n=3: 0 solutions');
    console.log('n=4: 2 solutions');
    console.log('n=5: 10 solutions');
    console.log('n=6: 4 solutions');
    console.log('n=7: 40 solutions');
    console.log('n=8: 92 solutions');
    console.log('n=9: 352 solutions');
    console.log('n=10: 724 solutions');
    console.log('═══════════════════════════════════════');
    console.log('All tests completed! ✓');
    console.log('═══════════════════════════════════════');
  }
}

// Execute tests
NQueensBacktracking.runTests();