# 84. Largest Rectangle in Histogram

**Difficulty:** Hard
**Topics:** Stack, Monotonic Stack, Array
**LeetCode Link:** [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

---

## Problem Statement (Simple Language Mein)

Tumhe ek histogram diya hai jahan har bar ki width 1 hai aur height array mein di gayi hai.

**Task:** Histogram mein largest rectangle ka area find karo.

---

## Examples:

### Example 1:
```
heights = [2, 1, 5, 6, 2, 3]

Histogram Visualization:

        ┌───┐
        │   │
    ┌───┤   │
    │   │   │       ┌───┐
┌───┤   │   │   ┌───┤   │
│   │   │   │   │   │   │
│ 2 │ 1 │ 5 │ 6 │ 2 │ 3 │
└───┴───┴───┴───┴───┴───┘
  0   1   2   3   4   5

Largest Rectangle (height=5, width=2 at indices 2-3):
        ┌───┐
        │   │
    ╔═══╬═══╗
    ║   ║   ║       ┌───┐
┌───╫───╫───╫───╫───┤   │
│   ║   ║   ║   ║   │   │
│ 2 ║ 1 ║ 5 ║ 6 ║ 2 │ 3 │
└───╨───╨───╨───╨───┘───┘

Area = 5 × 2 = 10 ✓

Output: 10
```

### Example 2:
```
heights = [2, 4]

┌───┐
│   │
│ 4 │
├───┤
│ 2 │
└───┘
  0   1

Option 1: Take bar 0 alone → Area = 2 × 1 = 2
Option 2: Take bar 1 alone → Area = 4 × 1 = 4 ✓
Option 3: Take both (min height = 2) → Area = 2 × 2 = 4 ✓

Output: 4
```

### Example 3:
```
heights = [2, 1, 2]

    ┌───┐       ┌───┐
    │   │       │   │
┌───┤ 2 ├───┬───┤ 2 │
│ 2 │   │ 1 │   │   │
└───┴───┴───┴───┴───┘
  0   1   2

For bar at index 0 (height=2):
  - Can't extend right (heights[1]=1 < 2)
  - Width = 1, Area = 2

For bar at index 1 (height=1):
  - Can extend left to 0, right to 2
  - Width = 3, Area = 1 × 3 = 3 ✓

For bar at index 2 (height=2):
  - Can't extend left (heights[1]=1 < 2)
  - Width = 1, Area = 2

Output: 3
```

---

## Constraints:
- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

---

## Key Insight! 🔑

**Core Question for Each Bar:**
> "If I use this bar's height, how wide can the rectangle be?"

**Answer:**
- Extend LEFT until you hit a **shorter bar** (or boundary)
- Extend RIGHT until you hit a **shorter bar** (or boundary)
- Width = right_boundary - left_boundary - 1

**This is exactly PLE and NLE!**
- **PLE (Previous Less Element):** Left boundary (first shorter bar to the left)
- **NLE (Next Less Element):** Right boundary (first shorter bar to the right)

```
heights = [2, 1, 5, 6, 2, 3]
                   ↑
               index 3 (height=6)

PLE[3] = 2 (heights[2]=5 < 6)
NLE[3] = 4 (heights[4]=2 < 6)

Width = 4 - 2 - 1 = 1
Area = 6 × 1 = 6
```

---

## Prerequisites

- **[Strict vs Non-Strict Comparison](../../../../basics/Patterns/strict-vs-non-strict-comparison.md)** - For duplicate handling
- **Monotonic Stack** - For finding PLE/NLE
- Understanding of boundaries (PLE/NLE are EXCLUSIVE walls)

---

## Approach 1: Brute Force

### Intuition:
For each bar, expand left and right to find maximum width.

### Algorithm:
```
maxArea = 0
for each bar i:
    height = heights[i]

    # Expand left
    left = i
    while left > 0 and heights[left-1] >= height:
        left--

    # Expand right
    right = i
    while right < n-1 and heights[right+1] >= height:
        right++

    width = right - left + 1
    area = height × width
    maxArea = max(maxArea, area)

return maxArea
```

### Complexity:
- **Time:** O(n²) - For each bar, potentially scan entire array
- **Space:** O(1)

**Result:** ❌ TLE for large inputs

---

## Approach 2: Optimal (Monotonic Stack with PLE/NLE)

### Intuition:

**For each bar, we need:**
1. **PLE index** - Where can we extend left?
2. **NLE index** - Where can we extend right?

**Formula:**
```
width = NLE[i] - PLE[i] - 1
area = heights[i] × width
```

### Visual Example:

```
heights = [2, 1, 5, 6, 2, 3]
indices    0  1  2  3  4  5

Step 1: Find PLE (Previous Less Element)
─────────────────────────────────────────
For each bar, find index of first shorter bar to LEFT

i=0, height=2: No bar to left → PLE = -1
i=1, height=1: No shorter bar to left → PLE = -1
i=2, height=5: heights[1]=1 < 5 → PLE = 1
i=3, height=6: heights[2]=5 < 6 → PLE = 2
i=4, height=2: heights[1]=1 < 2 → PLE = 1
i=5, height=3: heights[4]=2 < 3 → PLE = 4

PLE = [-1, -1, 1, 2, 1, 4]

Step 2: Find NLE (Next Less Element)
─────────────────────────────────────────
For each bar, find index of first shorter bar to RIGHT

i=0, height=2: heights[1]=1 < 2 → NLE = 1
i=1, height=1: No shorter bar to right → NLE = 6 (n)
i=2, height=5: heights[4]=2 < 5 → NLE = 4
i=3, height=6: heights[4]=2 < 6 → NLE = 4
i=4, height=2: No shorter bar to right → NLE = 6 (n)
i=5, height=3: No shorter bar to right → NLE = 6 (n)

NLE = [1, 6, 4, 4, 6, 6]

Step 3: Calculate Areas
─────────────────────────────────────────
For each bar:
  width = NLE[i] - PLE[i] - 1
  area = heights[i] × width

i=0: width = 1 - (-1) - 1 = 1, area = 2 × 1 = 2
i=1: width = 6 - (-1) - 1 = 6, area = 1 × 6 = 6
i=2: width = 4 - 1 - 1 = 2, area = 5 × 2 = 10 ✓
i=3: width = 4 - 2 - 1 = 1, area = 6 × 1 = 6
i=4: width = 6 - 1 - 1 = 4, area = 2 × 4 = 8
i=5: width = 6 - 4 - 1 = 1, area = 3 × 1 = 3

Maximum Area = 10 ✓
```

### Why PLE/NLE Work Here:

```
For bar at index 2 (height=5):

heights = [2, 1, 5, 6, 2, 3]
           0  1  2  3  4  5
              ↑     ↑
             PLE   NLE
             =1    =4

The bar can extend from index 2 to index 3.
Why not include index 1? Because heights[1]=1 < 5 (it's the PLE!)
Why not include index 4? Because heights[4]=2 < 5 (it's the NLE!)

Width = 4 - 1 - 1 = 2 (indices 2 and 3)
Area = 5 × 2 = 10
```

### Handling Duplicates:

**Important:** For equal heights, we need consistent boundary rules.

```
heights = [2, 2, 2]

If we use strict < for both PLE and NLE:
- Each bar would claim area for all three!
- Double counting!

Solution (same as Sum of Subarray Minimums):
- PLE: Use < (strictly less) - pop if >=
- NLE: Use <= (less or equal) - pop if >

This ensures each rectangle is counted exactly once!
```

### Algorithm:

```typescript
function largestRectangleArea(heights: number[]): number {
    const n = heights.length;

    // Find PLE (Previous Less Element)
    const ple = findPLE(heights);

    // Find NLE (Next Less Element)
    const nle = findNLE(heights);

    // Calculate max area
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        const width = nle[i] - ple[i] - 1;
        const area = heights[i] * width;
        maxArea = Math.max(maxArea, area);
    }

    return maxArea;
}
```

### Complexity:

**Time Complexity:** O(n)
- Finding PLE: O(n)
- Finding NLE: O(n)
- Calculating areas: O(n)
- Total: O(n)

**Space Complexity:** O(n)
- Stack: O(n)
- PLE/NLE arrays: O(n)

---

## Approach 3: Single Pass (Advanced)

### Intuition:
Instead of pre-computing PLE/NLE, calculate area when we pop from stack.

When we pop an element:
- The **current index** is its NLE (first smaller to right)
- The **new stack top** is its PLE (first smaller to left)
- Calculate area immediately!

### Algorithm:
```typescript
function largestRectangleArea(heights: number[]): number {
    const stack: number[] = [];
    let maxArea = 0;

    for (let i = 0; i <= heights.length; i++) {
        // Use 0 as sentinel for the end (forces all pops)
        const currentHeight = i === heights.length ? 0 : heights[i];

        while (stack.length > 0 && heights[stack[stack.length - 1]] > currentHeight) {
            const height = heights[stack.pop()!];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}
```

### Complexity:
- **Time:** O(n)
- **Space:** O(n) for stack only (no PLE/NLE arrays)

---

## Comparison Table

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Brute Force** | O(n²) | O(1) | TLE for large inputs |
| **Two Pass (PLE/NLE)** | O(n) | O(n) | Clearer logic, easier to understand |
| **Single Pass** | O(n) | O(n) | More efficient, less memory |

---

## Connection to Previous Problems

This problem directly uses concepts from:

1. **Sum of Subarray Minimums:**
   - Same PLE/NLE finding technique
   - Same duplicate handling (< for PLE, <= for NLE)

2. **Next Greater Element:**
   - Same stack technique but looking for smaller elements

**The pattern:**
```
┌─────────────────────────────────────────────────────────────┐
│  Finding PLE (Previous Less Element):                       │
│                                                             │
│  Pop Condition: heights[stack.top] >= heights[i]            │
│  Result: Finds strictly less element to the left            │
│                                                             │
│  Finding NLE (Next Less Element):                           │
│                                                             │
│  Pop Condition: heights[stack.top] > heights[i]             │
│  Result: Finds less or equal element to the right           │
└─────────────────────────────────────────────────────────────┘
```

---

## Related Problems:

- **85. Maximal Rectangle** (Hard) - 2D version of this problem
- **907. Sum of Subarray Minimums** (Medium) - Same PLE/NLE technique
- **42. Trapping Rain Water** (Hard) - Similar stack approach

---

**Konsa approach code karein? Two Pass (PLE/NLE) ya Single Pass?** 🎯