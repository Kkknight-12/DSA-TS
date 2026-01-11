# Word Search

## Problem Statement (Hinglish mein)

[gemini](https://gemini.google.com/gem/9013c4cd97d5/52f5824e1d344d76)

**Kya karna hai?**

- Tumhe ek **m × n grid** diya gaya hai (2D board of characters)
- Ek **word** (string) diya gaya hai
- Check karo: Kya ye word grid mein exist karta hai?
- Word ban sakta hai **sequentially adjacent cells** se
- **Adjacent** = horizontally or vertically neighboring (not diagonal!)
- **Same cell ko ek baar hi use kar sakte ho** (no reuse in same path)

**Example:**
```
Board:
A B C E
S F C S
A D E E

Word: "ABCCED"
Output: true

Path:
A → B → C → C → E → D
(0,0)→(0,1)→(0,2)→(1,2)→(2,2)→(2,1)
```

**Key Points:**
1. **2D Grid**: Not 1D array, we have rows and columns
2. **4 Directions**: Up, Down, Left, Right (NOT diagonal)
3. **No Reuse**: Same cell can't be used twice in one path
4. **Return Boolean**: Just true/false (not the path itself)

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Explore paths, mark visited, backtrack to unmark
- **DFS (Depth First Search)**: Go deep in one direction first
- **2D Grid Traversal**: Navigate in 4 directions
- **Visited Tracking**: Mark cells to avoid reuse

---

## Intuition (Soch) 🤔

### The Challenge: Find Word in 2D Grid

**Example:**
```
Board:
A B C E
S F C S
A D E E

Word: "ABCCED"

Start from 'A' at (0,0):
  'A' matches word[0] ✓
  Move to neighbors: Right→B, Down→S

  Try Right (0,1) = 'B':
    'B' matches word[1] ✓
    Mark (0,0) as visited (can't reuse!)
    Move to neighbors of (0,1)...

    Try Right (0,2) = 'C':
      'C' matches word[2] ✓
      Mark (0,1) as visited
      Continue...

      Eventually find complete path: A→B→C→C→E→D ✓
      Return true!
```

### The Pattern: DFS + Backtracking

**Key Insight:**
```
1. Try starting from EVERY cell in grid
2. For each start, use DFS:
   - Check if current cell matches current character
   - Mark cell as visited (temporarily)
   - Explore 4 neighbors recursively
   - If path fails, unmark cell (backtrack)
3. If any starting point finds complete word → return true
4. If all attempts fail → return false
```

**Why Backtracking?**
```
Board:
A A
A B

Word: "AAB"

Start from (0,0) = 'A':
  Match word[0] ✓
  Mark (0,0) visited

  Try (0,1) = 'A':
    Match word[1] ✓
    Mark (0,1) visited

    Try (1,1) = 'B':
      Match word[2] ✓
      Found! Return true

But if we tried (1,0) first:
  (0,0)→(1,0) = "AA" ✓
  From (1,0), no valid next move
  BACKTRACK: Unmark (1,0)
  Try different path: (0,0)→(0,1)→(1,1) ✓
```

---

## Approach: DFS + Backtracking (Optimal)

### Prerequisites (Agar Koi Chahiye):
- **DFS Pattern**: Depth-first exploration
- **Backtracking**: Mark/unmark visited cells
- **4-Direction Navigation**: Moving in grid

### Intuition (Soch):

**Core Idea:**
```
For each cell (i, j) in board:
  if (cell matches first character of word):
    Start DFS from this cell
    if (DFS finds complete word):
      return true

return false // No starting point worked
```

**DFS Logic:**
```
dfs(i, j, index):
  // index = current position in word

  Base case 1: Found complete word
  if (index === word.length):
    return true

  Base case 2: Out of bounds or mismatch
  if (out of bounds OR visited OR board[i][j] !== word[index]):
    return false

  // Mark as visited (temporarily)
  mark board[i][j] as visited

  // Try all 4 directions
  found = dfs(i+1,j) OR dfs(i-1,j) OR dfs(i,j+1) OR dfs(i,j-1)

  // Backtrack: Unmark
  unmark board[i][j]

  return found
```

### Visual Example

```
Board:
A B C E
S F C S
A D E E

Word: "ABCCED"

Start from each cell, try DFS:

Starting from (0,0) = 'A':
  A matches word[0] ✓
  Mark (0,0) as '#'

  Board now:
  # B C E
  S F C S
  A D E E

  Try 4 directions from (0,0):
    Up: out of bounds ❌
    Down: (1,0)='S', word[1]='B' ❌
    Left: out of bounds ❌
    Right: (0,1)='B', word[1]='B' ✓

  Continue Right to (0,1):
    Board:
    # # C E
    S F C S
    A D E E

    Try 4 directions from (0,1):
      Right: (0,2)='C', word[2]='C' ✓

    Continue to (0,2):
      Board:
      # # # E
      S F C S
      A D E E

      Try 4 directions:
        Down: (1,2)='C', word[3]='C' ✓

      Continue to (1,2):
        Board:
        # # # E
        S F # S
        A D E E

        Down: (2,2)='E', word[4]='E' ✓

      Continue to (2,2):
        Board:
        # # # E
        S F # S
        A D # E

        Left: (2,1)='D', word[5]='D' ✓

      Complete! index=6 === word.length
      Return true ✓
```

### Algorithm (Step by Step)

```
Function exist(board, word):
  m = board.length (rows)
  n = board[0].length (columns)

  // Try starting from every cell
  for i from 0 to m-1:
    for j from 0 to n-1:
      if (dfs(board, word, i, j, 0)):
        return true  // Found!

  return false  // Not found from any starting point

Function dfs(board, word, i, j, index):
  BASE CASE 1: Success
  if (index === word.length):
    return true  // Found complete word!

  BASE CASE 2: Invalid
  if (i < 0 OR i >= m OR j < 0 OR j >= n):
    return false  // Out of bounds

  if (board[i][j] === '#'):
    return false  // Already visited

  if (board[i][j] !== word[index]):
    return false  // Character mismatch

  RECURSIVE CASE:
  // Save current character
  temp = board[i][j]

  // Mark as visited
  board[i][j] = '#'

  // Try all 4 directions
  found = dfs(board, word, i+1, j, index+1) OR  // Down
          dfs(board, word, i-1, j, index+1) OR  // Up
          dfs(board, word, i, j+1, index+1) OR  // Right
          dfs(board, word, i, j-1, index+1)     // Left

  // BACKTRACK: Restore character
  board[i][j] = temp

  return found
```

### Why This Works?

**Complete Exploration:**
```typescript
// We try EVERY cell as starting point
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (dfs(board, word, i, j, 0)) {
      return true;  // Found from this start
    }
  }
}
```

**Path Exploration:**
```typescript
// From each cell, try all 4 directions
const found =
  dfs(i+1, j, index+1) ||  // Down
  dfs(i-1, j, index+1) ||  // Up
  dfs(i, j+1, index+1) ||  // Right
  dfs(i, j-1, index+1);    // Left
```

**No Reuse:**
```typescript
// Mark visited temporarily
board[i][j] = '#';

// Explore...

// Unmark (backtrack) for other paths
board[i][j] = temp;
```

### Complexity Analysis

**Time Complexity: O(m × n × 4^L)**

**Why?**
- Starting points: m × n cells
- From each cell: DFS exploration
- Each DFS call: 4 directions (4 branches)
- Maximum depth: L (word length)
- Total: m × n × 4^L

**With pruning:**
- Early termination when word found
- Skip cells that don't match first character
- Actual performance much better than worst case

**In simple terms:**
```
For a 3×3 board and word of length 4:
- 9 possible starting points
- Each tries at most 4^4 = 256 paths
- But many paths pruned early (wrong character)
```

**Space Complexity: O(L)**

**Why?**
1. **Recursion Stack**: O(L)
   - Maximum depth = word length
2. **No Extra Space**: We modify board in-place for visited tracking

**In simple terms:**
```
Recursion depth = word length (maximum)
No additional data structures needed
```

---

## Optimizations (Pruning)

### 1. Character Frequency Check
```typescript
// Before starting DFS, check if board has all characters
const boardChars = new Map();
const wordChars = new Map();

// If word has more 'A's than board, impossible!
if (wordChars.get('A') > boardChars.get('A')) {
  return false;  // Early exit
}
```

### 2. Start from Rarer Character
```typescript
// If word = "AAAB", start search from 'B' (rarer)
// Then match backwards: B→A→A→A
// Fewer starting points to try!
```

### 3. Direction Optimization
```typescript
// Try most promising direction first
// Based on heuristics or board layout
```

---

## Edge Cases

```typescript
// 1. Word longer than total cells
board = [["A","B"],["C","D"]]
word = "ABCDE"
Output: false
Reason: Only 4 cells, word needs 5

// 2. Single cell board
board = [["A"]]
word = "A"
Output: true

// 3. Word with repeated characters
board = [["A","A","A"],["A","A","A"]]
word = "AAAAAA"
Output: true
Reason: Can zigzag through grid

// 4. No matching start character
board = [["A","B"],["C","D"]]
word = "XYZ"
Output: false
Reason: 'X' not in board

// 5. Path requires backtracking
board = [["A","B"],["C","A"]]
word = "ABAC"
Output: false
Reason: A→B→A→C impossible (A already used)
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Not restoring cell after backtrack

```typescript
// WRONG!
function dfs(i, j, index) {
  temp = board[i][j];
  board[i][j] = '#';  // Mark visited

  const found = /* explore 4 directions */;

  // Missing restore!
  return found;
}
// Problem: Cell remains marked for other paths!
```

✅ **Correct:**
```typescript
function dfs(i, j, index) {
  temp = board[i][j];
  board[i][j] = '#';

  const found = /* explore */;

  board[i][j] = temp;  // Restore! (Backtrack)
  return found;
}
```

### ❌ Mistake 2: Using extra visited array when not needed

```typescript
// WRONG! (Wastes space)
const visited = Array(m).fill(0).map(() => Array(n).fill(false));

function dfs(i, j, index) {
  visited[i][j] = true;
  // ...
  visited[i][j] = false;
}
```

✅ **Correct:**
```typescript
// Use board itself! Mark with special character
function dfs(i, j, index) {
  const temp = board[i][j];
  board[i][j] = '#';  // In-place marking
  // ...
  board[i][j] = temp;  // Restore
}
```

### ❌ Mistake 3: Wrong base case order

```typescript
// WRONG!
function dfs(i, j, index) {
  // Check bounds AFTER accessing board[i][j]
  if (board[i][j] !== word[index]) return false;  // Crash if out of bounds!

  if (i < 0 || i >= m) return false;
}
```

✅ **Correct:**
```typescript
function dfs(i, j, index) {
  // Check bounds FIRST!
  if (i < 0 || i >= m || j < 0 || j >= n) return false;

  if (board[i][j] !== word[index]) return false;
}
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Can the word use diagonal cells?"**
   → No, only horizontal and vertical (4 directions)

2. **"Can I reuse the same cell?"**
   → No, each cell used at most once per path

3. **"What if word is empty?"**
   → Usually return true (empty word exists)

4. **"Is the board guaranteed to be non-empty?"**
   → Yes, per constraints

### Approach Explanation

```
"I'll use DFS with backtracking:

1. Try starting from each cell in the board
2. For each start, use DFS:
   - Check if current cell matches current character
   - Mark cell as visited (modify in-place)
   - Try all 4 directions recursively
   - Backtrack: restore cell value
3. If any path finds complete word → return true

Time: O(m×n×4^L) where L is word length
Space: O(L) for recursion stack

Key optimization: Mark cells in-place (no extra space)
Can add pruning: check character frequency first."
```

### Follow-up Questions

**Q1:** "How would you optimize for larger boards?"
**A1:**
```
1. Character frequency check first (early exit)
2. Start from rarer character if word has one
3. Prune based on remaining characters needed
4. Use trie for multiple word searches
```

**Q2:** "What if you need to find multiple words?"**
**A2:** "Use a Trie data structure. Build trie from all words, then DFS once on board, checking trie at each step. This is 'Word Search II' problem."

**Q3:** "Can you find the actual path, not just boolean?"**
**A3:** "Yes! Keep a path array during DFS. When word found, return path copy. Slightly more space but same approach."

---

## Summary

**Problem Type**: 2D Grid Backtracking / DFS

**Core Pattern**:
```typescript
function exist(board, word) {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(board, word, i, j, 0)) {
        return true;
      }
    }
  }
  return false;
}

function dfs(board, word, i, j, index) {
  // Base cases
  if (index === word.length) return true;
  if (out of bounds or visited or mismatch) return false;

  // Mark visited
  const temp = board[i][j];
  board[i][j] = '#';

  // Try 4 directions
  const found = dfs(i+1,j,index+1) || dfs(i-1,j,index+1) ||
                dfs(i,j+1,index+1) || dfs(i,j-1,index+1);

  // Backtrack
  board[i][j] = temp;

  return found;
}
```

**Key Points:**
- Try every cell as starting point
- DFS in 4 directions (not diagonal)
- Mark visited in-place (use special character)
- Backtrack: restore cell value
- Early termination when word found

**Complexity:**
- Time: O(m × n × 4^L)
- Space: O(L) - recursion depth

**Next Steps**: Ready for solution.ts! 🚀

Solution.ts mein DFS + Backtracking implement karein?