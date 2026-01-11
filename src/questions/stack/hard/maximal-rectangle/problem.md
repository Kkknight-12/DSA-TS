# 85. Maximal Rectangle

**Difficulty:** Hard
**Topics:** Stack, Dynamic Programming, Matrix, Monotonic Stack
**LeetCode Link:** [85. Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)

[Visualizer](https://gemini.google.com/gem/9013c4cd97d5/1cb70b42a795bc65)

---

## Problem Statement (Simple Language Mein)

Tumhe ek `m × n` binary matrix diya hai jismein sirf `'0'` aur `'1'` hain.

**Task:** Matrix mein largest rectangle ka area find karo jo sirf `'1'` se bana ho.

---

## Examples:

### Example 1:
```
matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]

Visual:
┌───┬───┬───┬───┬───┐
│ 1 │ 0 │ 1 │ 0 │ 0 │  Row 0
├───┼───┼───┼───┼───┤
│ 1 │ 0 │ 1 │ 1 │ 1 │  Row 1
├───┼───┼───┼───┼───┤
│ 1 │ 1 │ 1 │ 1 │ 1 │  Row 2
├───┼───┼───┼───┼───┤
│ 1 │ 0 │ 0 │ 1 │ 0 │  Row 3
└───┴───┴───┴───┴───┘

Largest Rectangle (highlighted):
┌───┬───┬───┬───┬───┐
│ 1 │ 0 │ 1 │ 0 │ 0 │
├───┼───┼───┼───┼───┤
│ 1 │ 0 │ ╔═══════╗ │
├───┼───┼─║─┼───┼─║─┤
│ 1 │ 1 │ ║1│ 1 │1║ │  ← Height = 2
├───┼───┼─╚═══════╝─┤
│ 1 │ 0 │ 0 │ 1 │ 0 │
└───┴───┴───┴───┴───┘
         ↑───────↑
         Width = 3

Area = 2 × 3 = 6 ✓

Output: 6
```

### Example 2:
```
matrix = [["0"]]

Output: 0 (No '1' exists)
```

### Example 3:
```
matrix = [["1"]]

Output: 1 (Single '1')
```

### Example 4:
```
matrix = [
  ["1","1"],
  ["1","1"]
]

┌───┬───┐
│ 1 │ 1 │
├───┼───┤
│ 1 │ 1 │
└───┴───┘

Output: 4 (entire 2×2 matrix)
```

---

## Constraints:
- `rows == matrix.length`
- `cols == matrix[0].length`
- `1 <= rows, cols <= 200`
- `matrix[i][j]` is `'0'` or `'1'`

---

## Key Insight! 🔑

**Yeh problem "Largest Rectangle in Histogram" ka 2D version hai!**

### The Connection:

```
matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]

Har row ke liye, upar se '1' count karo (jab tak '0' na mile):

Row 0 as histogram:
Heights: [1, 0, 1, 0, 0]

     ┌───┐   ┌───┐
     │ 1 │   │ 1 │
     └───┴───┴───┴───┴───┘

Row 1 as histogram (build on top of Row 0):
Heights: [2, 0, 2, 1, 1]

     ┌───┐   ┌───┐
     │   │   │   │┌───┬───┐
     │ 2 │   │ 2 ││ 1 │ 1 │
     └───┴───┴───┴┴───┴───┘

Row 2 as histogram:
Heights: [3, 1, 3, 2, 2]

     ┌───┐   ┌───┐
     │   │   │   │┌───┬───┐
     │ 3 │┌──┤ 3 ││ 2 │ 2 │
     │   ││1 │   │└───┴───┘
     └───┴┴──┴───┴────────┘

Row 3 as histogram:
Heights: [4, 0, 0, 3, 0]  (reset to 0 where '0' appears)

     ┌───┐       ┌───┐
     │   │       │   │
     │ 4 │       │ 3 │
     │   │       │   │
     └───┴───────┴───┴───┘
```

**For each row's histogram, apply "Largest Rectangle in Histogram" algorithm!**

---

## Prerequisites

- **[Largest Rectangle in Histogram](../largest-rectangle-in-histogram/problem.md)** - Must understand this first!
- Monotonic Stack for PLE/NLE

---

## Approach 1: Brute Force

### Intuition:
Check every possible rectangle in the matrix.

### Algorithm:
```
for each cell (i, j) as top-left corner:
    for each cell (x, y) as bottom-right corner:
        check if rectangle contains only '1's
        update max area
```

### Complexity:
- **Time:** O((m×n)² × m×n) = O(m³×n³) - Very slow!
- **Space:** O(1)

**Result:** ❌ TLE

---

## Approach 2: Optimal (Using Histogram)

### Intuition:

**Convert 2D problem to 1D:**
1. Build a histogram for each row
2. For each row, apply "Largest Rectangle in Histogram"
3. Track maximum across all rows

### Building Heights Array:

```
Rule:
- If matrix[row][col] == '1': heights[col] += 1
- If matrix[row][col] == '0': heights[col] = 0 (reset!)

Why reset? Kyunki '0' ke neeche rectangle nahi ban sakta!
```

### Visual Example:

```
matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]

Row 0: heights = [1, 0, 1, 0, 0]
       Apply histogram algo → max area from this row

Row 1: heights = [2, 0, 2, 1, 1]  (build on previous)
       Apply histogram algo → max area from this row

Row 2: heights = [3, 1, 3, 2, 2]
       Apply histogram algo → max area from this row = 6 ✓

Row 3: heights = [4, 0, 0, 3, 0]  (reset where '0')
       Apply histogram algo → max area from this row

Return global maximum = 6
```

### Detailed Dry Run for Row 2:

```
Heights = [3, 1, 3, 2, 2]

     ┌───┐   ┌───┐
     │   │   │   │┌───┬───┐
     │ 3 │┌──┤ 3 ││ 2 │ 2 │
     │   ││1 │   │└───┴───┘
     └───┴┴──┴───┴────────┘
       0   1   2   3   4

Using histogram algorithm:

For height[0]=3: PLE=-1, NLE=1 → width=1, area=3
For height[1]=1: PLE=-1, NLE=5 → width=5, area=5
For height[2]=3: PLE=1, NLE=3 → width=1, area=3
For height[3]=2: PLE=1, NLE=5 → width=3, area=6 ✓
For height[4]=2: PLE=1, NLE=5 → width=3, area=6 ✓

Max from this row = 6
```

### Algorithm:

```typescript
function maximalRectangle(matrix: string[][]): number {
    if (matrix.length === 0) return 0;

    const m = matrix.length;
    const n = matrix[0].length;
    const heights = new Array(n).fill(0);
    let maxArea = 0;

    for (let row = 0; row < m; row++) {
        // Update heights for current row
        for (let col = 0; col < n; col++) {
            if (matrix[row][col] === '1') {
                heights[col] += 1;
            } else {
                heights[col] = 0;  // Reset!
            }
        }

        // Apply largest rectangle in histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}
```

### Complexity:

**Time Complexity:** O(m × n)
- For each of m rows: O(n) to update heights + O(n) for histogram algo
- Total: O(m × n)

**Space Complexity:** O(n)
- Heights array: O(n)
- Stack for histogram: O(n)

---

## Why This Works?

```
Think about it:

For any rectangle of '1's in the matrix:
- It has some HEIGHT (number of consecutive '1's vertically)
- It has some WIDTH (how far it extends horizontally)

By building histograms row by row:
- We capture all possible heights
- The histogram algorithm finds the best width for each height

Every possible rectangle is considered at exactly one row
(the bottom row of that rectangle).
```

---

## Edge Cases

1. **Empty matrix:** Return 0
2. **All zeros:** Return 0
3. **All ones:** Return m × n
4. **Single row:** Just run histogram once
5. **Single column:** Height of tallest consecutive '1's
6. **Scattered ones:** Each '1' is its own rectangle (area = 1)

---

## Comparison Table

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Brute Force** | O(m³×n³) | O(1) | Check all rectangles |
| **Histogram (Optimal)** | O(m×n) | O(n) | Reduce to 1D problem |

---

## Connection to Previous Problems

```
Maximal Rectangle = Building Histograms + Largest Rectangle in Histogram

For each row:
1. Build histogram (O(n))
2. Find largest rectangle in that histogram (O(n))
3. Track maximum

Total: O(m × n)
```

---

## Related Problems:

- **84. Largest Rectangle in Histogram** (Hard) - Prerequisite!
- **221. Maximal Square** (Medium) - Similar DP approach
- **1504. Count Submatrices With All Ones** (Medium) - Related concept

---

**Ready to see the optimal solution code?** 🎯