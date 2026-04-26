/**
 * WORD SEARCH - DFS + BACKTRACKING
 * =================================
 *
 * gemini ->
 * https://gemini.google.com/gem/9013c4cd97d5/52f5824e1d344d76
 *
 * Problem:
 * 2D board of characters aur ek string `word` diya hai.
 * Check karna hai kya board me adjacent cells use karke ye word ban sakta hai.
 *
 * Rules:
 *   1. Move sirf up, down, left, right
 *   2. Same cell current path me dobara use nahi kar sakte
 *   3. Answer sirf true/false chahiye
 *
 * Intuition:
 * Word kisi bhi cell se start ho sakta hai,
 * isliye har cell ko starting point maan kar DFS chalate hain.
 *
 * DFS state:
 *   dfs(row, col, charIndex)
 *
 * Meaning:
 *   kya `word[charIndex...]` current cell `(row, col)` se match ho sakta hai?
 *
 * Agar current cell current character se match nahi karta, path fail.
 * Agar current cell last required character se match kar gaya, path success.
 * Warna current cell ko visited mark karke 4 directions try karo.
 *
 * Algorithm:
 * 1. Agar `word` empty hai, return true.
 * 2. Agar board empty hai, return false.
 * 3. Agar word length total cells se badi hai, return false.
 * 4. Har cell `(row, col)` ko possible starting point maan kar DFS try karo.
 * 5. DFS me out of bounds, visited cell, ya mismatch mile toh false return karo.
 * 6. Agar current cell last character match kar de, true return karo.
 * 7. Current cell ko temporary visited mark karo.
 * 8. Next character ke liye 4 directions me recurse karo.
 * 9. Return se pehle original character restore karo.
 * 10. Agar koi bhi direction true de, current DFS true return karegi.
 *
 * Time Complexity:
 *   O(m * n * 4^L)
 *   m = rows, n = cols, L = word length
 *
 * Space Complexity:
 *   O(L)
 *   recursion stack depth
 */

namespace WordSearchBacktracking {
  export function exist(board: string[][], word: string): boolean {
    if (word.length === 0) {
      // Empty word ko match karne ke liye kisi character ki zaroorat nahi.
      // Isliye empty word trivially present mana ja sakta hai.
      return true;
    }

    if (board.length === 0 || board[0].length === 0) {
      // Non-empty word ko empty board me kabhi form nahi kar sakte.
      return false;
    }

    const rows = board.length;
    const cols = board[0].length;

    if (word.length > rows * cols) {
      // Total available cells se zyada letters wale word ko
      // no-reuse rule ke saath banana impossible hai.
      return false;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (dfs(row, col, 0)) {
          return true;
        }
      }
    }

    return false;

    function dfs(row: number, col: number, charIndex: number): boolean {
      if (row < 0 || row >= rows || col < 0 || col >= cols) {
        // Current path board ke bahar nikal gaya.
        // Bahar koi valid character exist nahi karta.
        return false;
      }

      if (board[row][col] === '#') {
        // `#` ka matlab ye cell current path me pehle hi use ho chuka hai.
        // Same path me cell reuse allowed nahi hai.
        return false;
      }

      if (board[row][col] !== word[charIndex]) {
        // Current board cell required character se match nahi kar raha.
        // Is direction ka path yahin fail hota hai.
        return false;
      }

      if (charIndex === word.length - 1) {
        // Current character last required character tha aur woh match bhi kar gaya.
        // Iska matlab full word successfully mil gaya.
        return true;
      }

      const originalChar = board[row][col];
      board[row][col] = '#';

      const foundWord =
        dfs(row + 1, col, charIndex + 1) ||
        dfs(row - 1, col, charIndex + 1) ||
        dfs(row, col + 1, charIndex + 1) ||
        dfs(row, col - 1, charIndex + 1);

      // Current path explore ho chuki hai.
      // Dusre branches / starting points ke liye original character restore karna mandatory hai.
      board[row][col] = originalChar;

      return foundWord;
    }
  }

  /**
   * ==========================================================
   * MENTAL MODEL
   * ==========================================================
   *
   * DFS question:
   *
   *   dfs(row, col, charIndex)
   *
   * Means:
   *
   *   kya current board cell se `word[charIndex...]` match ho sakta hai?
   *
   * Example:
   * word = "ABCCED"
   *
   *   dfs(0,0,0) -> can current cell match 'A'?
   *   dfs(0,1,1) -> can current cell match 'B'?
   *   dfs(0,2,2) -> can current cell match 'C'?
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * Example board:
   * A B C E
   * S F C S
   * A D E E
   *
   * word = "ABCCED"
   *
   * start at (0,0) = 'A'
   * │
   * ├── down  -> (1,0) = 'S' mismatch for 'B'
   * ├── up    -> out of bounds
   * ├── right -> (0,1) = 'B' match
   * │   │
   * │   ├── down  -> (1,1) = 'F' mismatch for next 'C'
   * │   ├── up    -> out of bounds
   * │   ├── right -> (0,2) = 'C' match
   * │   │   │
   * │   │   └── down -> (1,2) = 'C' match
   * │   │       │
   * │   │       └── down -> (2,2) = 'E' match
   * │   │           │
   * │   │           └── left -> (2,1) = 'D' match
   * │   │               └── success
   * │   │
   * │   └── left won't matter once right path succeeds
   * │
   * └── left -> out of bounds
   *
   * ==========================================================
   * RECURSION TREE
   * ==========================================================
   *
   * exist(board, "ABCCED")
   * │
   * ├── try start (0,0)
   * │   └── dfs(0,0,0)
   * │       └── dfs(0,1,1)
   * │           └── dfs(0,2,2)
   * │               └── dfs(1,2,3)
   * │                   └── dfs(2,2,4)
   * │                       └── dfs(2,1,5)
   * │                           └── true
   * │
   * └── because one starting point succeeded, outer loops stop
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Input:
   * board =
   *   A B C E
   *   S F C S
   *   A D E E
   *
   * word = "ABCCED"
   *
   * Initial Start Cell: (0,0)
   *
   * ┌────────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: dfs(0, 0, 0)                                                  │
   * ├────────────────────────────────────────────────────────────────────────┤
   * │ Looking for word[0] = 'A'                                              │
   * │ board[0][0] = 'A'                                                      │
   * │ Match? Haan                                                            │
   * │ Last character? 0 === 5 -> Nahi                                        │
   * │ Mark visited: board[0][0] = '#'                                        │
   * │                                                                        │
   * │ Try down  -> dfs(1, 0, 1) -> mismatch ('S' vs 'B') -> false           │
   * │ Try up    -> dfs(-1,0,1) -> out of bounds -> false                    │
   * │ Try right -> dfs(0, 1, 1)                                              │
   * │                                                                        │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: dfs(0, 1, 1)                                         │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ Looking for word[1] = 'B'                                    │     │
   * │   │ board[0][1] = 'B'                                            │     │
   * │   │ Match? Haan                                                  │     │
   * │   │ Last character? Nahi                                         │     │
   * │   │ Mark visited                                                 │     │
   * │   │                                                              │     │
   * │   │ down  -> (1,1) = 'F' mismatch                                │     │
   * │   │ up    -> out of bounds                                       │     │
   * │   │ right -> dfs(0,2,2)                                          │     │
   * │   │                                                              │     │
   * │   │   ┌────────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: dfs(0, 2, 2)                               │     │     │
   * │   │   ├────────────────────────────────────────────────────┤     │     │
   * │   │   │ Looking for word[2] = 'C'                          │     │     │
   * │   │   │ board[0][2] = 'C'                                  │     │     │
   * │   │   │ Match? Haan                                        │     │     │
   * │   │   │ Mark visited                                       │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │ down -> dfs(1,2,3)                                 │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │   ┌──────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 4: dfs(1, 2, 3)                     │     │     │     │
   * │   │   │   ├──────────────────────────────────────────┤     │     │     │
   * │   │   │   │ Looking for word[3] = 'C'                │     │     │     │
   * │   │   │   │ board[1][2] = 'C'                        │     │     │     │
   * │   │   │   │ Match? Haan                              │     │     │     │
   * │   │   │   │ Mark visited                             │     │     │     │
   * │   │   │   │                                          │     │     │     │
   * │   │   │   │ down -> dfs(2,2,4)                       │     │     │     │
   * │   │   │   │                                          │     │     │     │
   * │   │   │   │   ┌────────────────────────────────┐     │     │     │     │
   * │   │   │   │   │ CALL 5: dfs(2, 2, 4)           │     │     │     │     │
   * │   │   │   │   ├────────────────────────────────┤     │     │     │     │
   * │   │   │   │   │ Looking for word[4] = 'E'      │     │     │     │     │
   * │   │   │   │   │ board[2][2] = 'E'              │     │     │     │     │
   * │   │   │   │   │ Match? Haan                    │     │     │     │     │
   * │   │   │   │   │ Mark visited                   │     │     │     │     │
   * │   │   │   │   │                                │     │     │     │     │
   * │   │   │   │   │ left -> dfs(2,1,5)             │     │     │     │     │
   * │   │   │   │   │                                │     │     │     │     │
   * │   │   │   │   │   ┌──────────────────────┐     │     │     │     │     │
   * │   │   │   │   │   │ CALL 6: dfs(2,1,5)   │     │     │     │     │     │
   * │   │   │   │   │   ├──────────────────────┤     │     │     │     │     │
   * │   │   │   │   │   │ Looking for 'D'      │     │     │     │     │     │
   * │   │   │   │   │   │ board[2][1] = 'D'    │     │     │     │     │     │
   * │   │   │   │   │   │ Match? Haan          │     │     │     │     │     │
   * │   │   │   │   │   │ Last character? Haan │     │     │     │     │     │
   * │   │   │   │   │   │ return true          │     │     │     │     │     │
   * │   │   │   │   │   └──────────────────────┘     │     │     │     │     │
   * │   │   │   │   │                                │     │     │     │     │
   * │   │   │   │   │ restore current cell and return true             │     │
   * │   │   │   │   └──────────────────────────────────────────────────┘     │
   * │   │   │   │ restore and return true                                   │
   * │   │   │   └────────────────────────────────────────────────────────────┘
   * │   │   │ restore and return true                                        │
   * │   │   └────────────────────────────────────────────────────────────────┘
   * │   │ restore and return true                                             │
   * │   └──────────────────────────────────────────────────────────────────────┘
   * │ restore and return true                                                  │
   * └────────────────────────────────────────────────────────────────────────┘
   *
   * Final:
   *   true
   *
   * ==========================================================
   * BACKTRACKING FAILURE EXAMPLE
   * ==========================================================
   *
   * word = "ABCB"
   *
   * Path:
   *   A -> B -> C
   *
   * Now next needed char = 'B'
   * But previous B cell current path me already visited ho chuka hai.
   * So DFS उस cell ko reuse nahi karega and branch fail hogi.
   *
   * Isi wajah se backtracking + visited marking required hai.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Single cell exact match
   * 2. Single cell mismatch
   * 3. Word longer than total cells
   * 4. Diagonal-looking path should fail
   * 5. Repeated letters with valid zigzag path
   */

  function cloneBoard(board: string[][]): string[][] {
    return board.map((row) => [...row]);
  }

  function expectExist(
    board: string[][],
    word: string,
    expected: boolean
  ): void {
    const actual = exist(cloneBoard(board), word);

    if (actual !== expected) {
      throw new Error(
        `For board=${JSON.stringify(board)} and word=${JSON.stringify(
          word
        )}, expected ${expected} but got ${actual}`
      );
    }
  }

  export function runTests(): void {
    const tests: Array<{
      board: string[][];
      word: string;
      expected: boolean;
    }> = [
      {
        board: [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        word: 'ABCCED',
        expected: true,
      },
      {
        board: [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        word: 'ABCB',
        expected: false,
      },
      { board: [['A']], word: 'A', expected: true },
      { board: [['A']], word: 'B', expected: false },
      {
        board: [
          ['A', 'B'],
          ['C', 'D'],
        ],
        word: 'ABCDE',
        expected: false,
      },
      {
        board: [
          ['A', 'A', 'A'],
          ['A', 'A', 'A'],
        ],
        word: 'AAAAAA',
        expected: true,
      },
      {
        board: [
          ['A', 'B'],
          ['C', 'D'],
        ],
        word: 'XYZ',
        expected: false,
      },
      {
        board: [
          ['C', 'A', 'A'],
          ['A', 'A', 'A'],
          ['B', 'C', 'D'],
        ],
        word: 'AAB',
        expected: true,
      },
      {
        board: [
          ['A', 'B', 'C'],
          ['D', 'E', 'F'],
          ['G', 'H', 'I'],
        ],
        word: 'AEI',
        expected: false,
      },
      {
        board: [
          ['A', 'B', 'C'],
          ['S', 'F', 'C'],
          ['A', 'D', 'E'],
        ],
        word: 'ABCCE',
        expected: true,
      },
      {
        board: [
          ['A', 'B'],
          ['C', 'D'],
        ],
        word: '',
        expected: true,
      },
    ];

    tests.forEach(({ board, word, expected }) => {
      expectExist(board, word, expected);
    });

    console.log(`Passed ${tests.length}/${tests.length} tests`);
  }
}

WordSearchBacktracking.runTests();