# Sudoku Solver

**Difficulty:** Hard
**Topics:** Backtracking, Matrix, Array
**LeetCode:** #37

[gemini-Sudoku-explanation](https://gemini.google.com/gem/9013c4cd97d5/5ed987ed954b0f4b)

[gemini-Sudoku-visualization](https://gemini.google.com/gem/9013c4cd97d5/6ae83bad8948c95c)

---

## Problem Statement

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all** of the following rules:

1. Each of the digits `1-9` must occur **exactly once** in each row
2. Each of the digits `1-9` must occur **exactly once** in each column
3. Each of the digits `1-9` must occur **exactly once** in each of the 9 `3x3` sub-boxes of the grid

The `'.'` character indicates empty cells.

---

## Examples

### Example 1:

**Input:**
```
board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
```

**Visual representation:**
```
5 3 . | . 7 . | . . .
6 . . | 1 9 5 | . . .
. 9 8 | . . . | . 6 .
------+-------+------
8 . . | . 6 . | . . 3
4 . . | 8 . 3 | . . 1
7 . . | . 2 . | . . 6
------+-------+------
. 6 . | . . . | 2 8 .
. . . | 4 1 9 | . . 5
. . . | . 8 . | . 7 9
```

**Output:**
```
board = [
  ["5","3","4","6","7","8","9","1","2"],
  ["6","7","2","1","9","5","3","4","8"],
  ["1","9","8","3","4","2","5","6","7"],
  ["8","5","9","7","6","1","4","2","3"],
  ["4","2","6","8","5","3","7","9","1"],
  ["7","1","3","9","2","4","8","5","6"],
  ["9","6","1","5","3","7","2","8","4"],
  ["2","8","7","4","1","9","6","3","5"],
  ["3","4","5","2","8","6","1","7","9"]
]
```

**Visual representation:**
```
5 3 4 | 6 7 8 | 9 1 2
6 7 2 | 1 9 5 | 3 4 8
1 9 8 | 3 4 2 | 5 6 7
------+-------+------
8 5 9 | 7 6 1 | 4 2 3
4 2 6 | 8 5 3 | 7 9 1
7 1 3 | 9 2 4 | 8 5 6
------+-------+------
9 6 1 | 5 3 7 | 2 8 4
2 8 7 | 4 1 9 | 6 3 5
3 4 5 | 2 8 6 | 1 7 9
```

---

## Constraints

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `'1'-'9'` or `'.'`
- It is guaranteed that the input board has **only one solution**

---

## Prerequisites (Agar Koi Chahiye)

**Basic concepts needed:**
- **Backtracking pattern**: Try → Check → Recurse → Undo (agar fail ho toh)
- **2D array traversal**: Row-column indexing
- **Sudoku rules**: Understanding of 3x3 box calculation

**No advanced algorithms required!** Pure backtracking hai.

---

## Approach 1: Basic Backtracking (Standard Solution)

### Intuition (Soch):

Sudoku solving ko aise socho - **Trial and Error with Intelligence**!

```
Process:
1. Find empty cell (marked with '.')
2. Try digits 1-9
3. For each digit:
   - Check if valid (row, column, 3x3 box rules)
   - Place digit
   - Recursively solve rest
   - If successful → Done!
   - If fails → Remove digit, try next
```

**Real-world analogy:**

Imagine filling a form where each answer depends on previous answers:
- Try an answer → Check if it fits rules
- Move to next question
- If you get stuck later → Come back and change previous answer
- Keep trying until all questions are answered correctly

**Visual example:**

```
Step 1: Find first empty cell
5 3 [?] | . 7 . | . . .
        ↑ Try 1, 2, 3... which is valid?

Step 2: Check validity
Row check: 5, 3 already present → Can't use
Col check: Check column for [?]
Box check: Check top-left 3x3 box

Step 3: If digit is valid
5 3 [4] | . 7 . | . . .
    ✓   → Move to next empty cell

Step 4: If later cells fail
        → Come back, try next digit
5 3 [5] | . 7 . | . . .
        → Continue...
```

**Key insight - 3x3 Box calculation:**

```
For cell (row, col):
Box start row = (row / 3) * 3
Box start col = (col / 3) * 3

Example:
Cell (4, 5):
Box row = (4 / 3) * 3 = 1 * 3 = 3
Box col = (5 / 3) * 3 = 1 * 3 = 3

So it belongs to box starting at (3, 3):
┌─────────┐
│ . . . │
│ 8[.]3 │ ← Cell (4, 5) is here
│ . . . │
└─────────┘
```

### Algorithm:

```
function solveSudoku(board):
    if solve(board, 0, 0):
        return board  // Solution found
    return null  // No solution (won't happen per constraints)

function solve(board, row, col):
    // BASE CASE 1: Reached end of current row
    if col === 9:
        return solve(board, row + 1, 0)  // Move to next row

    // BASE CASE 2: Solved entire board
    if row === 9:
        return true  // Success!

    // SKIP: If cell already filled
    if board[row][col] !== '.':
        return solve(board, row, col + 1)

    // TRY: Each digit 1-9
    for digit from '1' to '9':
        if isValid(board, row, col, digit):
            board[row][col] = digit        // PLACE

            if solve(board, row, col + 1):  // RECURSE
                return true                 // Found solution

            board[row][col] = '.'          // BACKTRACK

    return false  // No valid digit found

function isValid(board, row, col, digit):
    // Check row
    for each column in row:
        if board[row][column] === digit:
            return false

    // Check column
    for each row in column:
        if board[r][col] === digit:
            return false

    // Check 3x3 box
    boxRow = (row / 3) * 3
    boxCol = (col / 3) * 3
    for i from 0 to 2:
        for j from 0 to 2:
            if board[boxRow + i][boxCol + j] === digit:
                return false

    return true  // Valid placement
```

### Complexity Analysis:

**Time Complexity:** O(9^m) where m = number of empty cells

**Why?**
- For each empty cell, we try up to 9 digits
- In worst case with many empty cells, branches multiply
- Practical runtime is much better due to constraints and pruning
- Most invalid placements are caught early

**Detailed breakdown:**
```
Empty cells = m
Each cell can try 9 digits
But most branches fail early due to validation
Actual: Much less than 9^m due to constraint propagation
```

**Space Complexity:** O(m) for recursion stack

**Why?**
- Recursion depth = number of empty cells
- Each recursive call uses constant space
- Board is modified in-place

---

## Approach 2: Backtracking with Optimized Validation (Faster)

### Intuition (Soch):

**Problem with Approach 1:** Har baar isValid() mein pura row, column, aur box check karna padta hai (O(27) operations)

**Better approach:** Track karo ki kaunse digits already used hain!

```
Use 3 data structures:
1. rows[i] = Set of digits used in row i
2. cols[j] = Set of digits used in column j
3. boxes[k] = Set of digits used in box k

Validation becomes O(1)!
```

**Visual representation:**

```
Initial board:
5 3 . | . 7 . | . . .
6 . . | 1 9 5 | . . .

Track sets:
rows[0] = {5, 3, 7}
cols[0] = {5, 6}
boxes[0] = {5, 3, 6}  ← Top-left 3x3 box

To check if we can place '4' at (0, 2):
✓ '4' not in rows[0]
✓ '4' not in cols[2]
✓ '4' not in boxes[0]
→ Valid! Place it and add to sets
```

**Box index calculation:**

```
For cell (row, col):
boxIndex = (row / 3) * 3 + (col / 3)

Examples:
(0, 0) → box 0  (top-left)
(0, 5) → box 1  (top-middle)
(0, 8) → box 2  (top-right)
(4, 4) → box 4  (center)
(8, 8) → box 8  (bottom-right)

Visual map:
┌───┬───┬───┐
│ 0 │ 1 │ 2 │
├───┼───┼───┤
│ 3 │ 4 │ 5 │
├───┼───┼───┤
│ 6 │ 7 │ 8 │
└───┴───┴───┘
```

### Algorithm:

```
function solveSudoku(board):
    // Initialize tracking sets
    rows = Array(9).fill(0).map(() => new Set())
    cols = Array(9).fill(0).map(() => new Set())
    boxes = Array(9).fill(0).map(() => new Set())

    // Pre-fill sets with existing digits
    for i from 0 to 8:
        for j from 0 to 8:
            if board[i][j] !== '.':
                digit = board[i][j]
                boxIndex = (i / 3) * 3 + (j / 3)
                rows[i].add(digit)
                cols[j].add(digit)
                boxes[boxIndex].add(digit)

    return solve(board, 0, 0, rows, cols, boxes)

function solve(board, row, col, rows, cols, boxes):
    // Move to next row if reached end of current row
    if col === 9:
        return solve(board, row + 1, 0, rows, cols, boxes)

    // Solved entire board
    if row === 9:
        return true

    // Skip if cell already filled
    if board[row][col] !== '.':
        return solve(board, row, col + 1, rows, cols, boxes)

    boxIndex = (row / 3) * 3 + (col / 3)

    // Try each digit
    for digit from '1' to '9':
        // O(1) validation using sets!
        if (!rows[row].has(digit) &&
            !cols[col].has(digit) &&
            !boxes[boxIndex].has(digit)):

            // PLACE
            board[row][col] = digit
            rows[row].add(digit)
            cols[col].add(digit)
            boxes[boxIndex].add(digit)

            // RECURSE
            if solve(board, row, col + 1, rows, cols, boxes):
                return true

            // BACKTRACK
            board[row][col] = '.'
            rows[row].delete(digit)
            cols[col].delete(digit)
            boxes[boxIndex].delete(digit)

    return false
```

### Complexity Analysis:

**Time Complexity:** O(9^m) where m = empty cells (same worst case, but faster in practice)

**Why faster?**
- Validation is O(1) instead of O(27)
- Same branching factor but faster per node
- Practical speedup: ~5-10x faster

**Space Complexity:** O(81) = O(1) for sets + O(m) for recursion

**Why?**
- 9 sets for rows: each can have max 9 digits
- 9 sets for cols: each can have max 9 digits
- 9 sets for boxes: each can have max 9 digits
- Total: 9 × 9 × 3 = 243 numbers max (constant)
- Recursion stack: O(m)

---

## Approach 3: Backtracking with MRV Heuristic (Most Optimized)

### Intuition (Soch):

**Further optimization:** Choose cells wisely!

**Key insight:** Jo cell mein sabse **kam possibilities** hain, usko pehle fill karo.

**Why?**
- Cell with fewer options → Less branching
- Fail faster if wrong path
- Prune search tree more aggressively

```
Example:
Cell A has 5 possible digits: {1, 2, 3, 4, 5}
Cell B has 2 possible digits: {7, 9}

Which to fill first?
→ Cell B! (Minimum Remaining Values)
   - Only 2 branches to try
   - If both fail, backtrack quickly
```

**MRV (Minimum Remaining Values) Heuristic:**

```
Before each placement:
1. Find all empty cells
2. For each cell, count valid digits
3. Choose cell with minimum count
4. Try digits for that cell

This reduces branching significantly!
```

### Algorithm:

```
function solve(board, rows, cols, boxes):
    // Find cell with minimum remaining values
    minCell = null
    minCount = 10

    for i from 0 to 8:
        for j from 0 to 8:
            if board[i][j] === '.':
                count = countPossibleDigits(i, j, rows, cols, boxes)
                if count < minCount:
                    minCount = count
                    minCell = (i, j)

    // BASE CASE: No empty cells left
    if minCell === null:
        return true

    (row, col) = minCell
    boxIndex = (row / 3) * 3 + (col / 3)

    // Try each valid digit for chosen cell
    for digit from '1' to '9':
        if isValid(digit, row, col, rows, cols, boxes):
            // Place, recurse, backtrack (same as before)
            ...

    return false

function countPossibleDigits(row, col, rows, cols, boxes):
    boxIndex = (row / 3) * 3 + (col / 3)
    count = 0
    for digit from '1' to '9':
        if (!rows[row].has(digit) &&
            !cols[col].has(digit) &&
            !boxes[boxIndex].has(digit)):
            count++
    return count
```

### Complexity Analysis:

**Time Complexity:** Still O(9^m) worst case, but **much faster** in practice

**Why faster?**
- Better search space pruning
- Fails faster on wrong paths
- Can be 100x faster on hard puzzles

**Space Complexity:** O(81) + O(m)

**Trade-off:**
- More work per recursive call (find minimum cell)
- But fewer total recursive calls
- Overall: Faster for hard puzzles

---

## Approach Comparison

| Approach | Time | Space | Validation | Pros | Cons |
|----------|------|-------|------------|------|------|
| **Basic Backtracking** | O(9^m) | O(m) | O(27) per check | • Simple to understand<br>• Easy to code | • Slower validation<br>• More branches explored |
| **Optimized Validation** | O(9^m) | O(1) sets + O(m) | O(1) per check | • Fast validation<br>• 5-10x speedup | • More space<br>• Slightly complex |
| **MRV Heuristic** | O(9^m) | O(1) + O(m) | O(1) per check | • Best practical speed<br>• Smart pruning | • Most complex<br>• Overhead per call |

---

## Edge Cases to Consider

1. **Already solved board:**
   - No empty cells → Return immediately

2. **Minimal clues:**
   - Very few numbers given → More backtracking needed

3. **Single empty cell:**
   - Only one solution possible

4. **Multiple solutions possible:**
   - Problem guarantees unique solution, but algorithm finds first

5. **Invalid initial board:**
   - Problem guarantees valid input

---

## Interview Tips

**What to say:**
1. "I'll use backtracking with constraint checking"
2. "For validation, I can either check each time (simple) or use sets for O(1) checks (optimal)"
3. "The key is the 3x3 box index calculation: `(row/3)*3 + (col/3)`"
4. "I'll modify the board in-place to save space"

**Common follow-ups:**
- **Q: Can you optimize validation?**
  → Use sets to track used digits (Approach 2)

- **Q: How to make it even faster?**
  → Use MRV heuristic (Approach 3)

- **Q: What if board has no solution?**
  → Return false, but problem guarantees solution

- **Q: Space optimization?**
  → Already using O(1) space (in-place modification)

**Mistakes to avoid:**
- ❌ Forgetting to backtrack (restore '.')
- ❌ Wrong box index calculation
- ❌ Not checking all three constraints (row, col, box)
- ❌ Modifying board without checking validity first

---

## Which Approach Should You Implement?

**For interviews:**
- Start with **Approach 1** (Basic Backtracking) - Shows understanding
- Then optimize to **Approach 2** (Sets for validation) - Shows optimization skills
- Mention **Approach 3** (MRV) if asked about further optimization

**Recommended: Approach 2** - Best balance of clarity and performance!

---

## 🎯 Which approach would you like to see implemented?

1. **Approach 1: Basic Backtracking** (Clear and simple)
2. **Approach 2: Optimized with Sets** (Recommended - Fast validation)
3. **Approach 3: MRV Heuristic** (Most optimized)
4. **Multiple approaches** (For complete understanding)

Let me know and I'll create the detailed solution with comprehensive dry run! 🧩