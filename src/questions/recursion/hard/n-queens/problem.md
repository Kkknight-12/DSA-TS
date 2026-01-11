# N-Queens

## Problem Statement (Hinglish mein)

[leetcode-n-queens](https://leetcode.com/problems/n-queens/)

[gemini-1](https://gemini.google.com/gem/9013c4cd97d5/720384d4c1c88a25)

[gemini-2](https://gemini.google.com/gem/9013c4cd97d5/6ff7f80941d42c9f)

**Kya karna hai?**
- Tumhe ek **n × n chessboard** diya gaya hai
- Uspe **n Queens** rakhni hain
- **Constraint**: Koi bhi 2 queens ek dusre ko **attack nahi kar sakti**
- Return **ALL distinct solutions** (sabhi unique configurations)

**Queen kaise attack karti hai?**
```
Queens can attack in 8 directions:
- Horizontal (left-right)
- Vertical (up-down)
- Diagonal (both directions)

Example: Queen at (r, c)
  ↖  ↑  ↗
  ←  Q  →
  ↙  ↓  ↘

All positions in these 8 directions are under attack!
```

**Example:**
```
Input: n = 4
Output: 2 solutions

Solution 1:          Solution 2:
. Q . .              . . Q .
. . . Q              Q . . .
Q . . .              . . . Q
. . Q .              . Q . .

Why valid?
- Each row has exactly 1 queen ✓
- Each column has exactly 1 queen ✓
- No two queens on same diagonal ✓
```

**Visual Attack Pattern:**
```
Board with Queen at (1, 1):

  0 1 2 3
0 X Q X X  ← Row 1: All attacked
1 X Q X X
2 X Q X X
3 X Q X X
  ↑
Column 1: All attacked

Also diagonals:
(0,0), (2,2), (3,3) - main diagonal
(0,2), (2,0) - anti-diagonal

Legend:
Q = Queen
X = Under attack (can't place another queen)
. = Safe (can place queen)
```

**Key Points:**
1. **n Queens for n×n board**: Exactly n queens must be placed
2. **No attacks**: No two queens can attack each other
3. **All solutions**: Find ALL distinct valid configurations
4. **Board representation**: 'Q' for queen, '.' for empty

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Try → Check → Recurse → Undo (backtrack)
- **Recursion**: Solving problem row by row
- **Constraint Checking**: Validating queen placement
- **State Management**: Tracking which positions are attacked

---

## Intuition (Soch) 🤔

### The Challenge: Place n Queens Safely

**Example: n = 4**
```
Step 1: Place first queen in row 0
  Try column 0:
  Q . . .
  . . . .
  . . . .
  . . . .

Step 2: Place second queen in row 1
  Can we place at (1,0)? NO! Same column as (0,0)
  Can we place at (1,1)? NO! Diagonal attack from (0,0)
  Can we place at (1,2)? YES! ✓

  Q . . .
  . . Q .
  . . . .
  . . . .

Step 3: Place third queen in row 2
  Can we place at (2,0)? NO! Same column as (0,0)
  Can we place at (2,1)? NO! Same column as (1,2)? NO, but diagonal!
  Can we place at (2,2)? NO! Same column as (1,2)
  Can we place at (2,3)? NO! Diagonal from (1,2)

  NO POSITION WORKS! ❌

  → BACKTRACK to row 1
  → Try different position for second queen
```

### The Pattern: Row-by-Row Placement

**Core Insight:**
```
Place queens ONE ROW AT A TIME (row by row approach)

Why?
- Guarantees: Each row has exactly 1 queen
- Simplifies: Only need to check column and diagonal conflicts
- Reduces: Search space significantly

For each row:
  Try each column (0 to n-1)
    If position is safe:
      Place queen
      Recurse to next row
      If recursion succeeds → found solution!
      If recursion fails → backtrack (remove queen, try next column)
```

**Visual Decision Tree:**
```
n = 4

Row 0:
  Try col 0 → Q...
              ├─ Row 1: Try all columns...
              │    Try col 2 → Q...
              │                ..Q.
              │                ├─ Row 2: No safe position!
              │                └─ BACKTRACK
              │    Try col 3 → Q...
              │                ...Q
              │                ├─ Row 2: Try col 1 → Q...
              │                                      ...Q
              │                                      .Q..
              │                                      ├─ Row 3: Try col 2
              │                                      └─ SOLUTION FOUND! ✓
```

**Why Backtracking?**
```
We don't know in advance which positions will work!
Need to:
1. Try a position
2. See if it leads to complete solution
3. If not, undo and try different position
4. Systematically explore all possibilities
```

---

## Approach 1: Backtracking (Optimal)

### Prerequisites (Agar Koi Chahiye):
- **Backtracking basics**: Try → Recurse → Undo
- **Safety checking**: Determining if position is under attack
- **2D array manipulation**: Board representation

### Intuition (Soch):

**Core Idea:**
```
backtrack(row):
  if row === n:
    Found complete solution! Add to results
    return

  for col in 0 to n-1:
    if isSafe(row, col):
      Place queen at (row, col)
      backtrack(row + 1)  // Try next row
      Remove queen at (row, col)  // Backtrack
```

**Safety Check Logic:**
```
isSafe(row, col):
  // Check column (all previous rows)
  for i from 0 to row-1:
    if board[i][col] === 'Q':
      return false  // Column occupied!

  // Check main diagonal (↖ direction)
  for i from row-1, j from col-1 down to 0:
    if board[i][j] === 'Q':
      return false  // Diagonal occupied!

  // Check anti-diagonal (↗ direction)
  for i from row-1, j from col+1 while valid:
    if board[i][j] === 'Q':
      return false  // Diagonal occupied!

  return true  // Safe! ✓
```

### Visual Example (n = 4):

```
═══════════════════════════════════════════════════════════════
FINDING FIRST SOLUTION
═══════════════════════════════════════════════════════════════

Initial board:
. . . .
. . . .
. . . .
. . . .

backtrack(row=0):
  Try col=0:
    isSafe(0,0)? YES ✓ (first queen)
    Place:
    Q . . .
    . . . .
    . . . .
    . . . .

    backtrack(row=1):
      Try col=0:
        isSafe(1,0)? NO ❌ (column attack from (0,0))
      Try col=1:
        isSafe(1,1)? NO ❌ (diagonal attack from (0,0))
      Try col=2:
        isSafe(1,2)? YES ✓
        Place:
        Q . . .
        . . Q .
        . . . .
        . . . .

        backtrack(row=2):
          Try col=0:
            isSafe(2,0)? NO ❌ (column attack)
          Try col=1:
            isSafe(2,1)? NO ❌ (diagonal attack)
          Try col=2:
            isSafe(2,2)? NO ❌ (column attack)
          Try col=3:
            isSafe(2,3)? NO ❌ (diagonal attack)

          All columns tried, none safe!
          return (backtrack to row 1)

      Remove queen from (1,2):
      Q . . .
      . . . .
      . . . .
      . . . .

      Try col=3:
        isSafe(1,3)? YES ✓
        Place:
        Q . . .
        . . . Q
        . . . .
        . . . .

        backtrack(row=2):
          Try col=0:
            isSafe(2,0)? NO ❌
          Try col=1:
            isSafe(2,1)? YES ✓
            Place:
            Q . . .
            . . . Q
            . Q . .
            . . . .

            backtrack(row=3):
              Try col=0:
                isSafe(3,0)? NO ❌
              Try col=1:
                isSafe(3,1)? NO ❌
              Try col=2:
                isSafe(3,2)? YES ✓
                Place:
                Q . . .
                . . . Q
                . Q . .
                . . Q .

                backtrack(row=4):
                  row === n? YES! ✓
                  SOLUTION FOUND!
                  Add to results: [".Q..","...Q","Q...","..Q."]

Continue backtracking to find ALL solutions...
```

### Algorithm (Step by Step):

```
Function solveNQueens(n):
  board = n×n array filled with '.'
  results = []

  backtrack(0)
  return results

Function backtrack(row):
  BASE CASE:
  if row === n:
    // Placed all n queens successfully!
    results.push(copy of current board)
    return

  RECURSIVE CASE:
  for col from 0 to n-1:
    if isSafe(row, col):
      // Place queen
      board[row][col] = 'Q'

      // Recurse to next row
      backtrack(row + 1)

      // Backtrack: Remove queen
      board[row][col] = '.'

Function isSafe(row, col):
  // Check column
  for i from 0 to row-1:
    if board[i][col] === 'Q':
      return false

  // Check main diagonal (↖)
  i = row - 1, j = col - 1
  while i >= 0 && j >= 0:
    if board[i][j] === 'Q':
      return false
    i--, j--

  // Check anti-diagonal (↗)
  i = row - 1, j = col + 1
  while i >= 0 && j < n:
    if board[i][j] === 'Q':
      return false
    i--, j++

  return true
```

### Why This Works?

**Row-by-Row Guarantee:**
```typescript
// We place ONE queen per row
backtrack(row) {
  for (let col = 0; col < n; col++) {
    // Try each column in this row
  }
}

Result: Each row has exactly 1 queen ✓
```

**Safety Checks Prevent Attacks:**
```typescript
isSafe(row, col) {
  // Check column: ↑
  // Check diagonal: ↖
  // Check anti-diagonal: ↗
}

No need to check ↓ ↙ ↘ because we haven't placed queens there yet!
```

**Backtracking Explores All Possibilities:**
```typescript
for (let col = 0; col < n; col++) {
  if (isSafe(row, col)) {
    board[row][col] = 'Q';     // Try
    backtrack(row + 1);         // Recurse
    board[row][col] = '.';      // Undo (backtrack)
  }
}

Every possible configuration explored!
```

### Complexity Analysis

**Time Complexity: O(n!)**

**Why?**
```
Row 0: n choices (any column)
Row 1: ≤ n-1 choices (some columns blocked)
Row 2: ≤ n-2 choices (more blocked)
...
Row n-1: ≤ 1 choice

Worst case: n × (n-1) × (n-2) × ... × 1 = n!

With pruning (isSafe checks):
  - Many branches cut early
  - Actual complexity much better
  - Still O(n!) in worst case
```

**Detailed:**
```
For n=4:
Maximum attempts: 4! = 24 configurations
With pruning: Much fewer actually tried

For n=8:
Maximum attempts: 8! = 40,320 configurations
But most branches pruned early!
```

**Space Complexity: O(n²)**

**Why?**
1. **Board storage**: O(n²) - n×n grid
2. **Recursion depth**: O(n) - maximum n levels
3. **Results storage**: O(solutions × n²)
   - Each solution is n×n board

**Total: O(n²)**

**In simple terms:**
```
For n=8 (standard chessboard):
Time: Try up to 8! = 40,320 configurations (with pruning: much less)
Space: 8×8 board + recursion depth 8 + results
```

---

## Approach 2: Optimized Backtracking (Better Constants)

### Prerequisites (Agar Koi Chahiye):
- **Set data structure**: O(1) lookup
- **Diagonal indexing**: Understanding row-col relationships

### Intuition (Soch):

**Problem with Basic Approach:**
```
isSafe() checks take O(n) time:
  - Loop through all previous rows for column check
  - Loop for diagonal checks

Can we make it O(1)?
YES! Use Sets to track occupied columns/diagonals
```

**Key Insight: Diagonal Indexing**
```
Main Diagonal (↖ to ↘):
  All cells on same diagonal have: row - col = constant

  Example (4×4 board):
  (0,0): 0-0 = 0
  (1,1): 1-1 = 0  } Same diagonal!
  (2,2): 2-2 = 0
  (3,3): 3-3 = 0

  (0,1): 0-1 = -1
  (1,2): 1-2 = -1  } Same diagonal!

Anti-Diagonal (↗ to ↙):
  All cells on same diagonal have: row + col = constant

  Example:
  (0,3): 0+3 = 3
  (1,2): 1+2 = 3  } Same anti-diagonal!
  (2,1): 2+1 = 3
  (3,0): 3+0 = 3
```

**Optimization:**
```typescript
// Track occupied positions using Sets
const cols = new Set();           // Occupied columns
const diag1 = new Set();          // Main diagonals (row - col)
const diag2 = new Set();          // Anti-diagonals (row + col)

function isSafe(row, col):
  // O(1) checks!
  if (cols.has(col)) return false;
  if (diag1.has(row - col)) return false;
  if (diag2.has(row + col)) return false;
  return true;

function placeQueen(row, col):
  cols.add(col);
  diag1.add(row - col);
  diag2.add(row + col);

function removeQueen(row, col):
  cols.delete(col);
  diag1.delete(row - col);
  diag2.delete(row + col);
```

### Algorithm (Step by Step):

```
Function solveNQueens(n):
  board = n×n array filled with '.'
  results = []
  cols = new Set()
  diag1 = new Set()  // row - col
  diag2 = new Set()  // row + col

  backtrack(0)
  return results

Function backtrack(row):
  BASE CASE:
  if row === n:
    results.push(copy of board)
    return

  RECURSIVE CASE:
  for col from 0 to n-1:
    // O(1) safety check!
    if (!cols.has(col) &&
        !diag1.has(row - col) &&
        !diag2.has(row + col)):

      // Place queen
      board[row][col] = 'Q'
      cols.add(col)
      diag1.add(row - col)
      diag2.add(row + col)

      // Recurse
      backtrack(row + 1)

      // Backtrack
      board[row][col] = '.'
      cols.delete(col)
      diag1.delete(row - col)
      diag2.delete(row + col)
```

### Visual Example (Optimization):

```
n = 4, placing queen at (1, 2)

Board:
. . . .
. . Q .  ← Row 1, Col 2
. . . .
. . . .

Updates to Sets:
cols.add(2)              → cols = {2}
diag1.add(1 - 2)        → diag1 = {-1}
diag2.add(1 + 2)        → diag2 = {3}

Now checking (2, 1):
  cols.has(1)? NO ✓
  diag1.has(2 - 1)? diag1.has(1)? NO ✓
  diag2.has(2 + 1)? diag2.has(3)? YES! ❌

  Position (2,1) is NOT safe (anti-diagonal conflict)

Checking (2, 3):
  cols.has(3)? NO ✓
  diag1.has(2 - 3)? diag1.has(-1)? YES! ❌

  Position (2,3) is NOT safe (main diagonal conflict)

All checks done in O(1)! ✓
```

### Complexity Analysis

**Time Complexity: O(n!)**

Same as basic approach, but:
- **Better constants**: O(1) safety checks vs O(n)
- **Faster in practice**: Significant speedup

**Space Complexity: O(n)**

**Why?**
1. **Board**: O(n²)
2. **Sets**: O(n) each × 3 = O(n)
3. **Recursion**: O(n)

**Total: O(n²)** (board dominates)

**Performance Improvement:**
```
Basic approach:
  isSafe() = O(n) per check
  Total checks = O(n!) × O(n) = O(n! × n)

Optimized:
  isSafe() = O(1) per check
  Total checks = O(n!) × O(1) = O(n!)

Practical speedup: ~10-100x faster for larger n!
```

---

## Comparison Table

| Approach | Time | Space | isSafe() | Pros | Cons |
|----------|------|-------|----------|------|------|
| **Basic Backtracking** | O(n!) | O(n²) | O(n) | Simple, easy to understand | Slower safety checks |
| **Optimized Backtracking** | O(n!) | O(n²) | O(1) | Much faster in practice | Slightly more complex |

---

## Edge Cases

```typescript
// 1. n = 1 (trivial)
Input: n = 1
Output: [["Q"]]
Reason: Single queen, no conflicts

// 2. n = 2 (impossible)
Input: n = 2
Output: []
Reason: Cannot place 2 queens on 2×2 board without attacks

// 3. n = 3 (impossible)
Input: n = 3
Output: []
Reason: Cannot place 3 queens on 3×3 board

// 4. n = 4 (2 solutions)
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

// 5. n = 8 (92 solutions!)
Input: n = 8
Output: 92 distinct solutions
Reason: Classic 8-queens problem has 92 solutions
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Not backtracking properly

```typescript
// WRONG!
for (let col = 0; col < n; col++) {
  if (isSafe(row, col)) {
    board[row][col] = 'Q';
    backtrack(row + 1);
    // Missing: board[row][col] = '.'
  }
}
// Problem: Board state not restored, affects other branches
```

✅ **Correct:**
```typescript
for (let col = 0; col < n; col++) {
  if (isSafe(row, col)) {
    board[row][col] = 'Q';
    backtrack(row + 1);
    board[row][col] = '.';  // Restore! (Backtrack)
  }
}
```

### ❌ Mistake 2: Checking unnecessary directions

```typescript
// WRONG!
function isSafe(row, col) {
  // Check all 8 directions
  for (let i = 0; i < n; i++) {
    // Check down ↓ (not needed!)
    if (board[row + i][col] === 'Q') return false;
  }
}
```

✅ **Correct:**
```typescript
function isSafe(row, col) {
  // Only check UP, UP-LEFT, UP-RIGHT
  // WHY: We place row by row from top to bottom
  //      So no queens below current row yet!

  for (let i = 0; i < row; i++) {
    if (board[i][col] === 'Q') return false;
  }
  // Only check upward diagonals...
}
```

### ❌ Mistake 3: Wrong diagonal calculation

```typescript
// WRONG!
diag1.add(row + col);  // This is anti-diagonal!
diag2.add(row - col);  // This is main diagonal!

// Swapped!
```

✅ **Correct:**
```typescript
diag1.add(row - col);  // Main diagonal (↖ to ↘)
diag2.add(row + col);  // Anti-diagonal (↗ to ↙)
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Do we need to return all solutions or just count?"**
   → Return all distinct board configurations

2. **"What format for output?"**
   → Array of arrays, each inner array is one row as string

3. **"Can n be 0?"**
   → Usually n ≥ 1, but handle edge cases

4. **"Is there always a solution?"**
   → No! n=2 and n=3 have no solutions

### Approach Explanation

```
"I'll solve this using backtracking:

1. Place queens row by row (one queen per row)
2. For each row, try each column
3. Check if position is safe:
   - No queen in same column
   - No queen on main diagonal (row-col constant)
   - No queen on anti-diagonal (row+col constant)
4. If safe:
   - Place queen
   - Recurse to next row
   - Backtrack by removing queen
5. When all n rows filled → found solution

Optimization: Use Sets for O(1) safety checks

Time: O(n!)
Space: O(n²)"
```

### Follow-up Questions

**Q1:** "How many solutions for n=8?"

**A1:** "92 distinct solutions. This is the famous 8-queens problem!"

**Q2:** "Can you count solutions without storing them?"

**A2:**
```typescript
let count = 0;
function backtrack(row) {
  if (row === n) {
    count++;  // Instead of storing board
    return;
  }
  // ... rest same
}
```

**Q3:** "What if we want just ONE solution, not all?"

**A3:**
```typescript
function backtrack(row) {
  if (row === n) {
    return true;  // Found one, stop!
  }
  for (let col = 0; col < n; col++) {
    if (isSafe(row, col)) {
      board[row][col] = 'Q';
      if (backtrack(row + 1)) return true;  // Stop on first success
      board[row][col] = '.';
    }
  }
  return false;
}
```

---

## Summary

**Problem Type**: Backtracking / Constraint Satisfaction

**Core Pattern**:
```typescript
backtrack(row) {
  if (row === n):
    solution found!

  for col in 0 to n-1:
    if isSafe(row, col):
      place queen
      backtrack(row + 1)
      remove queen  // CRITICAL: Backtrack!
}
```

**Key Points:**
- Place queens row by row
- Check column and diagonal conflicts
- Backtrack by removing queen after recursion
- Explore all possibilities to find ALL solutions
- Optimization: Use Sets for O(1) safety checks

**Complexity:**
- Time: O(n!) with pruning
- Space: O(n²)

**Next Steps**: Ready for solution.ts! 🚀

Kaunsa approach dekhna hai? Basic Backtracking ya Optimized with Sets?