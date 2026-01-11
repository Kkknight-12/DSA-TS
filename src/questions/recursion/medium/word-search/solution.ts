/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WORD SEARCH - DFS + BACKTRACKING
 * ═══════════════════════════════════════════════════════════════════════════
 * Gemini -> https://gemini.google.com/gem/9013c4cd97d5/52f5824e1d344d76
 *
 * Problem: Given an m x n grid of characters board and a string word,
 *          return true if word exists in the grid.
 *
 * Pattern: 2D Grid Backtracking with DFS
 *
 * Approach:
 * - Try starting from every cell in the board
 * - Use DFS to explore all 4 directions (up, down, left, right)
 * - Mark cells as visited in-place (modify board to '#')
 * - Backtrack: restore cell value after exploring
 * - Early termination when word found
 *
 * Time Complexity: O(m × n × 4^L)
 * - m × n: Try each cell as starting point
 * - 4^L: Each DFS call tries 4 directions, max depth L (word length)
 * - With pruning: Much better in practice
 *
 * Space Complexity: O(L)
 * - Recursion stack depth = word length
 * - In-place marking (no extra space)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace WordSearchBacktracking {
  /**
   * Main function: Check if word exists in board
   *
   * @param board - m × n grid of characters
   * @param word - target word to find
   * @returns true if word exists, false otherwise
   */
  function exist(board: string[][], word: string): boolean {
    // Edge Case: Empty board or word
    // WHY: Cannot find anything in empty input
    if (!board || board.length === 0 || !word) return false;

    const m = board.length; // rows
    const n = board[0].length; // columns

    // Edge Case: Word longer than total cells
    // WHY: Impossible to form word longer than board size
    // EXAMPLE: 2×2 board (4 cells), word length 5 → impossible
    if (word.length > m * n) return false;

    // Step 1: Try starting from EVERY cell in board
    // WHY: Word can start from any position
    // EXAMPLE: Word "ABC" could start from (0,0), (0,1), (1,0), etc.
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        // If DFS finds complete word from this cell, return true!
        if (dfs(board, word, i, j, 0)) {
          return true;
        }
      }
    }

    // Step 2: No starting point worked
    // WHY: Tried all cells, none could form the word
    return false;
  }

  /**
   * DFS Helper: Recursively search for word starting from (i, j)
   *
   * @param board - Grid of characters
   * @param word - Target word
   * @param i - Current row
   * @param j - Current column
   * @param index - Current position in word (which character we're looking for)
   * @returns true if word can be formed from this path
   */
  function dfs(
    board: string[][],
    word: string,
    i: number,
    j: number,
    index: number
  ): boolean {
    const m = board.length;
    const n = board[0].length;

    // BASE CASE 1: Found complete word! ✓
    // WHY: We've matched all characters of word
    // EXAMPLE: word = "ABC", index = 3 → matched all 3 chars
    if (index === word.length) {
      return true;
    }

    // BASE CASE 2: Out of bounds
    // WHY: Can't access cells outside grid
    // EXAMPLE: i = -1 or i = m → invalid position
    // CHECK THIS FIRST before accessing board[i][j]!
    if (i < 0 || i >= m || j < 0 || j >= n) {
      return false;
    }

    // BASE CASE 3: Already visited cell
    // WHY: Marked with '#' during exploration, can't reuse
    // EXAMPLE: board[i][j] = '#' → this cell is in current path
    if (board[i][j] === '#') {
      return false;
    }

    // BASE CASE 4: Character mismatch
    // WHY: Current cell doesn't match current character in word
    // EXAMPLE: board[i][j] = 'A', word[index] = 'B' → path fails
    if (board[i][j] !== word[index]) {
      return false;
    }

    // RECURSIVE CASE: Current cell matches! Explore further

    // Step 1: Save current character (for backtracking)
    // WHY: We'll modify board[i][j], need to restore later
    // EXAMPLE: temp = 'A'
    const temp = board[i][j];

    // Step 2: Mark current cell as visited
    // WHY: Prevent reusing same cell in current path
    // EXAMPLE: board[i][j] changes from 'A' to '#'
    board[i][j] = '#';

    // Step 3: Try all 4 directions (DFS exploration)
    // WHY: Word can continue in any of 4 directions
    // IMPORTANT: We use OR (||) - if ANY direction succeeds, we're done!
    //
    // Direction order:
    // 1. Down:  (i+1, j) - move to row below
    // 2. Up:    (i-1, j) - move to row above
    // 3. Right: (i, j+1) - move to column right
    // 4. Left:  (i, j-1) - move to column left
    //
    // EXAMPLE: From (1,1), try (2,1), (0,1), (1,2), (1,0)
    const found =
      dfs(board, word, i + 1, j, index + 1) || // Down
      dfs(board, word, i - 1, j, index + 1) || // Up
      dfs(board, word, i, j + 1, index + 1) || // Right
      dfs(board, word, i, j - 1, index + 1); // Left

    // Step 4: BACKTRACK - Restore original character
    // WHY: Other paths from parent might need this cell
    // EXAMPLE: board[i][j] changes back from '#' to 'A'
    // CRITICAL: This allows other starting points to use this cell!
    board[i][j] = temp;

    // Step 5: Return result of exploration
    return found;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input:
   * board = [
   *   ['A', 'B', 'C', 'E'],
   *   ['S', 'F', 'C', 'S'],
   *   ['A', 'D', 'E', 'E']
   * ]
   * word = "ABCCED"
   *
   * Initial Board State:
   * Row 0: A B C E
   * Row 1: S F C S
   * Row 2: A D E E
   *
   * ═══════════════════════════════════════════════════════════════════════
   * MAIN LOOP: Try each cell as starting point
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Iteration (0,0): Try starting from 'A' at (0,0)
   *   dfs(board, "ABCCED", 0, 0, 0)
   *   → This will find the word! Let's trace it...
   *
   * ═══════════════════════════════════════════════════════════════════════
   * DFS TREE FROM (0,0)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * CALL 1: dfs(0, 0, 0)
   * ────────────────────────────────────────────────────────────────────
   * Looking for: word[0] = 'A'
   * Current cell: board[0][0] = 'A'
   *
   * Checks:
   *   index === word.length? 0 === 6? NO
   *   Out of bounds? NO (0,0 is valid)
   *   Already visited? board[0][0] === '#'? NO (it's 'A')
   *   Character match? 'A' === 'A'? YES! ✓
   *
   * Actions:
   *   temp = 'A'
   *   board[0][0] = '#'  (mark visited)
   *
   * Board after marking:
   *   Row 0: # B C E
   *   Row 1: S F C S
   *   Row 2: A D E E
   *
   * Try 4 directions (looking for word[1] = 'B'):
   *   1. Down (1,0):  board[1][0] = 'S' ≠ 'B' → returns false
   *   2. Up (-1,0):   out of bounds → returns false
   *   3. Right (0,1): board[0][1] = 'B' === 'B' ✓ → continue...
   *   4. Left (0,-1): won't try (already found in Right)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ Direction 3 (Right) succeeds! Calling dfs(0, 1, 1)...          │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * CALL 2: dfs(0, 1, 1)
   * ────────────────────────────────────────────────────────────────────
   * Looking for: word[1] = 'B'
   * Current cell: board[0][1] = 'B'
   *
   * Checks:
   *   index === word.length? 1 === 6? NO
   *   Out of bounds? NO
   *   Already visited? 'B' === '#'? NO
   *   Character match? 'B' === 'B'? YES! ✓
   *
   * Actions:
   *   temp = 'B'
   *   board[0][1] = '#'
   *
   * Board after marking:
   *   Row 0: # # C E
   *   Row 1: S F C S
   *   Row 2: A D E E
   *
   * Try 4 directions (looking for word[2] = 'C'):
   *   1. Down (1,1):  board[1][1] = 'F' ≠ 'C' → returns false
   *   2. Up (-1,1):   out of bounds → returns false
   *   3. Right (0,2): board[0][2] = 'C' === 'C' ✓ → continue...
   *
   *
   * CALL 3: dfs(0, 2, 2)
   * ────────────────────────────────────────────────────────────────────
   * Looking for: word[2] = 'C'
   * Current cell: board[0][2] = 'C'
   *
   * Actions:
   *   temp = 'C'
   *   board[0][2] = '#'
   *
   * Board after marking:
   *   Row 0: # # # E
   *   Row 1: S F C S
   *   Row 2: A D E E
   *
   * Try 4 directions (looking for word[3] = 'C'):
   *   1. Down (1,2):  board[1][2] = 'C' === 'C' ✓ → continue...
   *
   *
   * CALL 4: dfs(1, 2, 3)
   * ────────────────────────────────────────────────────────────────────
   * Looking for: word[3] = 'C'
   * Current cell: board[1][2] = 'C'
   *
   * Actions:
   *   temp = 'C'
   *   board[1][2] = '#'
   *
   * Board after marking:
   *   Row 0: # # # E
   *   Row 1: S F # S
   *   Row 2: A D E E
   *
   * Try 4 directions (looking for word[4] = 'E'):
   *   1. Down (2,2):  board[2][2] = 'E' === 'E' ✓ → continue...
   *
   *
   * CALL 5: dfs(2, 2, 4)
   * ────────────────────────────────────────────────────────────────────
   * Looking for: word[4] = 'E'
   * Current cell: board[2][2] = 'E'
   *
   * Actions:
   *   temp = 'E'
   *   board[2][2] = '#'
   *
   * Board after marking:
   *   Row 0: # # # E
   *   Row 1: S F # S
   *   Row 2: A D # E
   *
   * Try 4 directions (looking for word[5] = 'D'):
   *   1. Down (3,2):  out of bounds → returns false
   *   2. Up (1,2):    board[1][2] = '#' (visited) → returns false
   *   3. Right (2,3): board[2][3] = 'E' ≠ 'D' → returns false
   *   4. Left (2,1):  board[2][1] = 'D' === 'D' ✓ → continue...
   *
   *
   * CALL 6: dfs(2, 1, 5)
   * ────────────────────────────────────────────────────────────────────
   * Looking for: word[5] = 'D'
   * Current cell: board[2][1] = 'D'
   *
   * Actions:
   *   temp = 'D'
   *   board[2][1] = '#'
   *
   * Board after marking:
   *   Row 0: # # # E
   *   Row 1: S F # S
   *   Row 2: A # # E
   *
   * Try 4 directions (looking for word[6]):
   *   Wait! index + 1 = 6, which equals word.length!
   *   Let's trace what happens...
   *
   *   1. Down (3,1):  dfs(3, 1, 6)
   *      → index === word.length? 6 === 6? YES! ✓
   *      → return true (BASE CASE 1)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ SUCCESS! Found complete word!                                   │
   * │ Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)→(2,1)                     │
   * │       A    → B    → C    → C    → E    → D                     │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * BACKTRACKING PHASE (UNWINDING RECURSION)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * CALL 6: dfs(2, 1, 5) receives true
   * ────────────────────────────────────────────────────────────────────
   * found = true (from Down direction)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ CONTROL FLOW:                                                   │
   * │ We're in: dfs() call trying 4 directions                       │
   * │ Down direction returned true                                    │
   * │ Because of OR (||), we SHORT-CIRCUIT                           │
   * │ → Don't try Up, Right, Left                                    │
   * │ → found = true immediately                                      │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Backtrack: board[2][1] = 'D'  (restore)
   * return true
   *
   *
   * CALL 5: dfs(2, 2, 4) receives true
   * ────────────────────────────────────────────────────────────────────
   * Left direction returned true
   * found = true (short-circuit)
   * Backtrack: board[2][2] = 'E'  (restore)
   * return true
   *
   *
   * CALL 4: dfs(1, 2, 3) receives true
   * ────────────────────────────────────────────────────────────────────
   * Down direction returned true
   * found = true
   * Backtrack: board[1][2] = 'C'  (restore)
   * return true
   *
   *
   * CALL 3: dfs(0, 2, 2) receives true
   * ────────────────────────────────────────────────────────────────────
   * Down direction returned true
   * found = true
   * Backtrack: board[0][2] = 'C'  (restore)
   * return true
   *
   *
   * CALL 2: dfs(0, 1, 1) receives true
   * ────────────────────────────────────────────────────────────────────
   * Right direction returned true
   * found = true
   * Backtrack: board[0][1] = 'B'  (restore)
   * return true
   *
   *
   * CALL 1: dfs(0, 0, 0) receives true
   * ────────────────────────────────────────────────────────────────────
   * Right direction returned true
   * found = true
   * Backtrack: board[0][0] = 'A'  (restore)
   * return true
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ CONTROL FLOW IN exist() FUNCTION:                              │
   * │ We're in nested for loops:                                      │
   * │   for (let i = 0; i < m; i++)                                  │
   * │     for (let j = 0; j < n; j++)                                │
   * │                                                                 │
   * │ Current position: i=0, j=0                                      │
   * │ dfs(0, 0, 0) returned true                                      │
   * │ → return true immediately (early termination!)                  │
   * │ → Don't try other starting positions                           │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Final Board State (fully restored):
   *   Row 0: A B C E
   *   Row 1: S F C S
   *   Row 2: A D E E
   *
   * Result: true ✓
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EXAMPLE 2: WORD NOT FOUND (Showing Backtracking)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * board = [['A','B'],['C','D']]
   * word = "ABDC"
   *
   * Initial:
   *   A B
   *   C D
   *
   * Try (0,0): 'A' matches word[0] ✓
   *   Mark: # B
   *         C D
   *
   *   Try Right (0,1): 'B' matches word[1] ✓
   *     Mark: # #
   *           C D
   *
   *     Try Down (1,1): 'D' matches word[2] ✓
   *       Mark: # #
   *             C #
   *
   *       Try 4 directions for word[3]='C':
   *         Down: out of bounds → false
   *         Up: visited '#' → false
   *         Right: out of bounds → false
   *         Left (1,0): 'C' matches word[3] ✓
   *
   *           Try 4 directions for word[4]:
   *             But index=4 === word.length? 4 === 4? YES!
   *             Wait... word = "ABDC" has length 4
   *             We found: A→B→D→C ✓
   *             This would return true!
   *
   * Actually, for "ABDC" the path exists: (0,0)→(0,1)→(1,1)→(1,0)
   *
   * Let me show a word that DOESN'T exist: "ABCD"
   *
   * board = [['A','B'],['C','D']]
   * word = "ABCD"
   *
   * Try (0,0): A matches ✓ → Try (0,1): B matches ✓
   *   Try (1,1): C ≠ D → false
   *   Try (1,0): C matches ✓
   *     Try (1,1): D matches ✓
   *       Try directions for word[4]:
   *         index=4, but word.length=4
   *         index === word.length? YES! ✓
   *         return true
   *
   * Hmm, this also works! The path: A→B→C→D via (0,0)→(0,1)→(1,0)→(1,1)
   * But wait, (0,1) and (1,0) are not adjacent!
   *
   * Let me trace more carefully:
   * From (0,1) 'B', neighbors are:
   *   Down (1,1) = 'D' ≠ 'C' (word[2])
   *   Up (-1,1) = out of bounds
   *   Right (0,2) = out of bounds
   *   Left (0,0) = '#' (visited)
   *
   * So from 'B' we can't reach 'C'. This path fails!
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ BACKTRACKING DEMONSTRATION:                                     │
   * │                                                                 │
   * │ dfs(0,1,1) tries all 4 directions, all return false            │
   * │ found = false || false || false || false = false               │
   * │ Backtrack: board[0][1] = 'B' (restore)                         │
   * │ return false                                                    │
   * │                                                                 │
   * │ ┌───────────────────────────────────────────────────────────┐ │
   * │ │ CONTROL FLOW AFTER RETURN:                                │ │
   * │ │ Returns to: dfs(0,0,0)                                     │ │
   * │ │ Where were we? In the middle of trying 4 directions        │ │
   * │ │ Right direction returned false                             │ │
   * │ │ Next: Try Left direction                                   │ │
   * │ └───────────────────────────────────────────────────────────┘ │
   * │                                                                 │
   * │ Continue trying other directions from (0,0)...                 │
   * │   Left (0,-1): out of bounds → false                           │
   * │                                                                 │
   * │ found = false || false || false || false = false               │
   * │ Backtrack: board[0][0] = 'A' (restore)                         │
   * │ return false                                                    │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Main loop continues: try (0,1), (1,0), (1,1)... all fail
   * Final result: false
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════
   *
   * 1. Single Cell Board:
   *    board = [['A']], word = "A"
   *    → dfs(0,0,0): 'A'==='A' ✓, index+1=1===length ✓
   *    → return true
   *
   * 2. Word Longer Than Board:
   *    board = [['A','B']], word = "ABCDE"
   *    → Early exit: 5 > 2 cells
   *    → return false (before trying DFS)
   *
   * 3. No Matching Start:
   *    board = [['A','B'],['C','D']], word = "XYZ"
   *    → All cells: 'A','B','C','D' ≠ 'X' (word[0])
   *    → All dfs() calls fail at character mismatch
   *    → return false
   *
   * 4. Word with Repeated Characters:
   *    board = [['A','A','A'],['A','A','A']], word = "AAAAAA"
   *    → Can zigzag: (0,0)→(0,1)→(0,2)→(1,2)→(1,1)→(1,0)
   *    → Path exists! return true
   *
   * 5. Path Requires Backtracking Multiple Times:
   *    board = [['A','B'],['C','A']], word = "ABAC"
   *    → A→B→A→C requires using 'A' twice
   *    → First 'A' at (0,0), second 'A' at (1,1)
   *    → Path: (0,0)→(0,1)→(1,1)... but (0,1) and (1,1) not adjacent!
   *    → Backtrack and try other paths... no valid path exists
   *    → return false
   *
   */

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Helper: Print board in readable format
   */
  function printBoard(board: string[][]): void {
    board.forEach((row) => console.log('  ' + row.join(' ')));
  }

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log('🧪 Testing Word Search - DFS + Backtracking\n');

    // Test 1: Basic example - word exists
    console.log('Test 1: Basic example (word exists)');
    const board1 = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ];
    const word1 = 'ABCCED';
    printBoard(board1);
    const result1 = exist(board1, word1);
    console.log(`Word: "${word1}"`);
    console.log(`Result: ${result1}`);
    console.log(`Expected: true`);
    console.log(`✓ ${result1 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 2: Word does not exist
    console.log('Test 2: Word does not exist');
    const board2 = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ];
    const word2 = 'ABCB';
    printBoard(board2);
    const result2 = exist(board2, word2);
    console.log(`Word: "${word2}"`);
    console.log(`Result: ${result2}`);
    console.log(`Expected: false (can't reuse 'B')`);
    console.log(`✓ ${result2 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 3: Single cell - match
    console.log('Test 3: Single cell - match');
    const board3 = [['A']];
    const word3 = 'A';
    printBoard(board3);
    const result3 = exist(board3, word3);
    console.log(`Word: "${word3}"`);
    console.log(`Result: ${result3}`);
    console.log(`Expected: true`);
    console.log(`✓ ${result3 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 4: Single cell - no match
    console.log('Test 4: Single cell - no match');
    const board4 = [['A']];
    const word4 = 'B';
    printBoard(board4);
    const result4 = exist(board4, word4);
    console.log(`Word: "${word4}"`);
    console.log(`Result: ${result4}`);
    console.log(`Expected: false`);
    console.log(`✓ ${result4 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 5: Word longer than board
    console.log('Test 5: Word longer than board');
    const board5 = [
      ['A', 'B'],
      ['C', 'D'],
    ];
    const word5 = 'ABCDE';
    printBoard(board5);
    const result5 = exist(board5, word5);
    console.log(`Word: "${word5}"`);
    console.log(`Result: ${result5}`);
    console.log(`Expected: false (5 chars > 4 cells)`);
    console.log(`✓ ${result5 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 6: All same characters
    console.log('Test 6: Zigzag path with repeated characters');
    const board6 = [
      ['A', 'A', 'A'],
      ['A', 'A', 'A'],
    ];
    const word6 = 'AAAAAA';
    printBoard(board6);
    const result6 = exist(board6, word6);
    console.log(`Word: "${word6}"`);
    console.log(`Result: ${result6}`);
    console.log(`Expected: true (zigzag through all cells)`);
    console.log(`✓ ${result6 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 7: Word with no matching start
    console.log('Test 7: No matching start character');
    const board7 = [
      ['A', 'B'],
      ['C', 'D'],
    ];
    const word7 = 'XYZ';
    printBoard(board7);
    const result7 = exist(board7, word7);
    console.log(`Word: "${word7}"`);
    console.log(`Result: ${result7}`);
    console.log(`Expected: false ('X' not in board)`);
    console.log(`✓ ${result7 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 8: Complex path requiring backtracking
    console.log('Test 8: Complex path');
    const board8 = [
      ['C', 'A', 'A'],
      ['A', 'A', 'A'],
      ['B', 'C', 'D'],
    ];
    const word8 = 'AAB';
    printBoard(board8);
    const result8 = exist(board8, word8);
    console.log(`Word: "${word8}"`);
    console.log(`Result: ${result8}`);
    console.log(`Expected: true`);
    console.log(`✓ ${result8 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 9: Vertical word
    console.log('Test 9: Vertical word');
    const board9 = [
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
      ['G', 'H', 'I'],
    ];
    const word9 = 'AEI';
    printBoard(board9);
    const result9 = exist(board9, word9);
    console.log(`Word: "${word9}"`);
    console.log(`Result: ${result9}`);
    console.log(`Expected: false (diagonal not allowed)`);
    console.log(`✓ ${result9 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 10: L-shaped path
    console.log('Test 10: L-shaped path');
    const board10 = [
      ['A', 'B', 'C'],
      ['S', 'F', 'C'],
      ['A', 'D', 'E'],
    ];
    const word10 = 'ABCCE';
    printBoard(board10);
    const result10 = exist(board10, word10);
    console.log(`Word: "${word10}"`);
    console.log(`Result: ${result10}`);
    console.log(`Expected: true (path: A→B→C→C→E)`);
    console.log(`✓ ${result10 === true ? 'PASS' : 'FAIL'}\n`);

    console.log('═══════════════════════════════════════');
    console.log('All tests completed! ✓');
    console.log('═══════════════════════════════════════');
  }
}

// Execute tests
WordSearchBacktracking.runTests();