# 2104. Sum of Subarray Ranges

**Difficulty:** Medium
**Topics:** Stack, Monotonic Stack, Array
**LeetCode Link:** [2104. Sum of Subarray Ranges](https://leetcode.com/problems/sum-of-subarray-ranges/)

---

## Problem Statement (Simple Language Mein)

Tumhe ek integer array `nums` diya gaya hai. Har subarray ka **range** find karo, jahan:

```
Range = Maximum element - Minimum element
```

Phir sabhi subarray ranges ko add karke return karo.

### Examples:

#### Example 1:
```
Input: nums = [1, 2, 3]

Subarrays aur unke ranges:
[1]       → max=1, min=1, range = 1-1 = 0
[2]       → max=2, min=2, range = 2-2 = 0
[3]       → max=3, min=3, range = 3-3 = 0
[1,2]     → max=2, min=1, range = 2-1 = 1
[2,3]     → max=3, min=2, range = 3-2 = 1
[1,2,3]   → max=3, min=1, range = 3-1 = 2

Sum of all ranges = 0 + 0 + 0 + 1 + 1 + 2 = 4

Output: 4
```

#### Example 2:
```
Input: nums = [1, 3, 3]

Subarrays:
[1]       → range = 0
[3]       → range = 0
[3]       → range = 0
[1,3]     → range = 3-1 = 2
[3,3]     → range = 3-3 = 0
[1,3,3]   → range = 3-1 = 2

Sum = 0 + 0 + 0 + 2 + 0 + 2 = 4

Output: 4
```

### Constraints:
- `1 <= nums.length <= 1000`
- `-10^9 <= nums[i] <= 10^9`

---

## Prerequisites (Agar Koi Chahiye)

This is a **direct application** of "Sum of Subarray Minimums"! If you solved that, this will be easy.

Required:
- **Monotonic Stack** (for finding boundaries)
- **Contribution Technique** (counting element contributions)
- Understanding of PLE/NLE (Previous/Next Less Element)
- Understanding of PGE/NGE (Previous/Next Greater Element)
- **[Strict vs Non-Strict Comparison](../../../../basics/Patterns/strict-vs-non-strict-comparison.md)** - Critical for duplicate handling!

---

## Key Insight! 🔑

**Game-Changing Observation:**

```
Sum of all ranges = ?

Range = max - min

Sum of (max - min) for all subarrays
= Sum of all max - Sum of all min

So:
Sum of Ranges = (Sum of Subarray Maximums) - (Sum of Subarray Minimums)
```

**Ab problem split ho gayi do parts mein:**
1. Find sum of all subarray maximums (using contribution technique)
2. Find sum of all subarray minimums (exactly same as previous problem!)
3. Subtract: max_sum - min_sum

---

## Visual Understanding:

```
nums = [1, 2, 3]

Part 1: Sum of all maximums
[1]     → max = 1
[2]     → max = 2
[3]     → max = 3
[1,2]   → max = 2
[2,3]   → max = 3
[1,2,3] → max = 3

Sum of max = 1 + 2 + 3 + 2 + 3 + 3 = 14

Part 2: Sum of all minimums
[1]     → min = 1
[2]     → min = 2
[3]     → min = 3
[1,2]   → min = 1
[2,3]   → min = 2
[1,2,3] → min = 1

Sum of min = 1 + 2 + 3 + 1 + 2 + 1 = 10

Answer = 14 - 10 = 4 ✓
```

---

## Approach 1: Brute Force

### Intuition:
Generate all subarrays, find max and min for each, calculate range, sum them all.

### Algorithm:
```
sum = 0
for i from 0 to n-1:
    for j from i to n-1:
        max_val = max(nums[i..j])
        min_val = min(nums[i..j])
        range = max_val - min_val
        sum += range
return sum
```

### Complexity:
- **Time:** O(n³) - Two loops for subarrays, one loop to find max/min
- **Space:** O(1)

**Result:** ❌ Too slow for n=1000

---

## Approach 2: Better (Track Max/Min While Expanding)

### Intuition:
When expanding subarray from [i..j] to [i..j+1], we can update max/min incrementally.

### Algorithm:
```
sum = 0
for i from 0 to n-1:
    max_val = nums[i]
    min_val = nums[i]
    for j from i to n-1:
        max_val = max(max_val, nums[j])
        min_val = min(min_val, nums[j])
        range = max_val - min_val
        sum += range
return sum
```

### Complexity:
- **Time:** O(n²)
- **Space:** O(1)

**Result:** ✅ This works for n=1000, but can we do better?

---

## Approach 3: Optimal (Contribution Technique with Monotonic Stack)

### Prerequisites:
- Previous/Next Less Element (PLE/NLE) - for minimums
- Previous/Next Greater Element (PGE/NGE) - for maximums

### Intuition:

**Core Formula:**
```
Sum of Ranges = Sum of all (max - min)
              = Sum of all max - Sum of all min
              = sumOfMaximums - sumOfMinimums
```

**How to find Sum of Maximums?**
- Use **contribution technique** (exactly like minimums!)
- For each element, find: "In how many subarrays is it the MAXIMUM?"
- Use PGE (Previous Greater Element) and NGE (Next Greater Element)
- These define the range where element is maximum

**How to find Sum of Minimums?**
- Use **contribution technique** (we already know this!)
- Use PLE and NLE

### Visual Example:

```
nums = [1, 2, 3]
       0  1  2

─────────────────────────────────────
PART 1: Sum of Maximums
─────────────────────────────────────

For nums[0] = 1:
  PGE = -1 (no greater to left)
  NGE = 1  (nums[1]=2 is greater)

  leftCount = 0 - (-1) = 1
  rightCount = 1 - 0 = 1
  Subarrays where 1 is max: [1] (1 subarray)
  Contribution = 1 × 1 = 1

For nums[1] = 2:
  PGE = -1 (no greater to left)
  NGE = 2  (nums[2]=3 is greater)

  leftCount = 1 - (-1) = 2
  rightCount = 2 - 1 = 1
  Subarrays where 2 is max: [2], [1,2] (2 subarrays)
  Contribution = 2 × 2 = 4

For nums[2] = 3:
  PGE = -1 (no greater to left)
  NGE = 3  (no greater to right, use n)

  leftCount = 2 - (-1) = 3
  rightCount = 3 - 2 = 1
  Subarrays where 3 is max: [3], [2,3], [1,2,3] (3 subarrays)
  Contribution = 3 × 3 = 9

Sum of max = 1 + 4 + 9 = 14

─────────────────────────────────────
PART 2: Sum of Minimums
─────────────────────────────────────

For nums[0] = 1:
  PLE = -1, NLE = 3
  leftCount = 1, rightCount = 3
  Subarrays where 1 is min: [1], [1,2], [1,2,3] (3 subarrays)
  Contribution = 1 × 3 = 3

For nums[1] = 2:
  PLE = 0, NLE = 3
  leftCount = 1, rightCount = 2
  Subarrays where 2 is min: [2], [2,3] (2 subarrays)
  Contribution = 2 × 2 = 4

For nums[2] = 3:
  PLE = 1, NLE = 3
  leftCount = 1, rightCount = 1
  Subarrays where 3 is min: [3] (1 subarray)
  Contribution = 3 × 1 = 3

Sum of min = 3 + 4 + 3 = 10

─────────────────────────────────────
FINAL ANSWER
─────────────────────────────────────

Sum of Ranges = Sum of max - Sum of min
              = 14 - 10
              = 4 ✓
```

### Algorithm Steps:

1. **Find Sum of Maximums:**
   - Find PGE (Previous Greater Element) for each index
   - Find NGE (Next Greater Element) for each index
   - For each element: contribution = value × (i - PGE) × (NGE - i)
   - Sum all contributions

2. **Find Sum of Minimums:**
   - Find PLE (Previous Less Element) for each index
   - Find NLE (Next Less Element) for each index
   - For each element: contribution = value × (i - PLE) × (NLE - i)
   - Sum all contributions

3. **Return:** sumOfMax - sumOfMin

### Key Differences from "Sum of Subarray Minimums":

| Aspect | Minimums | Maximums |
|--------|----------|----------|
| **Boundary Elements** | PLE, NLE | PGE, NGE |
| **Stack Order** | Monotonic Increasing | Monotonic Decreasing |
| **Pop Condition (for PGE)** | `stack.top <= current` | `stack.top >= current` |
| **Looking for** | Smaller elements | Larger elements |

### Complexity Analysis:

**Time Complexity:** O(n)
- Finding PGE: O(n)
- Finding NGE: O(n)
- Finding PLE: O(n)
- Finding NLE: O(n)
- Calculating contributions: O(n)
- Total: O(n)

**Space Complexity:** O(n)
- Stack: O(n)
- Boundary arrays: O(n)

---

## Comparison Table

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Brute Force** | O(n³) | O(1) | TLE for large inputs |
| **Better** | O(n²) | O(1) | Works for n=1000 |
| **Optimal** | O(n) | O(n) | Uses contribution technique |

---

## Important Notes:

### Handling Duplicates: The `>=` vs `>` Mystery! 🔍

**Critical Question:** Why do we use `>=` in some places and `>` in others?

**The Pattern in Code:**

```typescript
// For MINIMUMS:
function findPreviousLessElement(nums: number[]): number[] {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
        stack.pop();  // Uses >= (pop if stack.top >= current)
    }
    // Result: Keeps elements STRICTLY LESS than current
}

function findNextLessElement(nums: number[]): number[] {
    while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
        stack.pop();  // Uses > (pop if stack.top > current)
    }
    // Result: Keeps elements LESS OR EQUAL to current
}

// For MAXIMUMS:
function findPreviousGreaterElement(nums: number[]): number[] {
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
        stack.pop();  // Uses <= (pop if stack.top <= current)
    }
    // Result: Keeps elements STRICTLY GREATER than current
}

function findNextGreaterElement(nums: number[]): number[] {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
        stack.pop();  // Uses < (pop if stack.top < current)
    }
    // Result: Keeps elements GREATER OR EQUAL to current
}
```

**The Rule:**
- **Previous boundary (PLE/PGE):** Uses **STRICT** comparison (`>=` or `<=`)
- **Next boundary (NLE/NGE):** Uses **NON-STRICT** comparison (`>` or `<`)

**Why?** To handle duplicates without double-counting!

---

### Visual Example - Duplicate Problem:

```
nums = [3, 2, 2, 3]
       0  1  2  3
```

**Focus on the duplicate 2's at indices 1 and 2.**

#### ❌ WRONG: Both Use Strict (Both use `>=` in pop)

```
If BOTH PLE and NLE use >= (both find strictly less):

PLE: pop if stack.top >= current → finds strictly less
NLE: pop if stack.top >= current → finds strictly less

For index 1 (value 2):
  PLE: All >= 2 get popped → PLE = -1
  NLE: All >= 2 get popped (including equal!)
    - nums[2]=2 is >= nums[1] → gets popped!
    - nums[3]=3 >= 2 → gets popped!
    → NLE = 4

  leftCount = 1, rightCount = 3
  Subarrays: 3
  Claims: [2], [2,2], [2,3]

For index 2 (value 2):
  PLE: nums[1]=2 is >= 2 → gets popped!
       nums[0]=3 is >= 2 → gets popped!
       → PLE = -1
  NLE: nums[3]=3 is >= 2 → gets popped!
       → NLE = 4

  leftCount = 2, rightCount = 2
  Subarrays: 4
  Claims: [2], [2,2], [2,3], [3,2]

PROBLEM: Subarray [2,2] is counted by BOTH indices! ❌
Total claimed: 3 + 4 = 7, but actual subarrays with min=2 is less!
```

#### ❌ WRONG: Both Use Non-Strict (Both use `>` in pop)

```
If BOTH PLE and NLE use > (both find less or equal):

PLE: pop if stack.top > current → finds less or equal
NLE: pop if stack.top > current → finds less or equal

For index 1 (value 2):
  PLE: Only pop if > 2
    - nums[0]=3 > 2 → pop
    → PLE = -1
  NLE: Only pop if > 2
    - nums[2]=2 is NOT > 2 → stays! NLE = 2

  leftCount = 1, rightCount = 1
  Claims: [2] only

For index 2 (value 2):
  PLE: Only pop if > 2
    - nums[1]=2 is NOT > 2 → stays! PLE = 1
  NLE: nums[3]=3 > 2 → pop
    → NLE = 4

  leftCount = 1, rightCount = 2
  Claims: [2], [2,3]

PROBLEM: Subarray [2,2] is claimed by NO ONE! ❌
Index 1 stops at NLE=2 (before [2,2])
Index 2 starts after PLE=1 (after [2,2])
```

#### ✅ CORRECT: PLE Strict (`>=`), NLE Non-Strict (`>`)

```
PLE: pop if stack.top >= current → finds strictly less
NLE: pop if stack.top > current  → finds less or equal
```

**Complete Trace for `[3, 2, 2, 3]`:**

```
PLE calculation (left to right, pop if >= current):

i=0: stack empty → PLE[0] = -1, push 0
i=1: nums[0]=3 >= 2? Yes → pop. empty → PLE[1] = -1, push 1
i=2: nums[1]=2 >= 2? Yes → pop. empty → PLE[2] = -1, push 2
i=3: nums[2]=2 >= 3? No → PLE[3] = 2, push 3

PLE = [-1, -1, -1, 2]

NLE calculation (right to left, pop if > current):

i=3: stack empty → NLE[3] = 4, push 3
i=2: nums[3]=3 > 2? Yes → pop. empty → NLE[2] = 4, push 2
i=1: nums[2]=2 > 2? No → NLE[1] = 2, push 1
i=0: nums[1]=2 > 3? No → NLE[0] = 1, push 0

NLE = [1, 2, 4, 4]
```

**Now calculate contributions:**

```
Index 0 (value 3): PLE=-1, NLE=1
  leftCount = 0-(-1) = 1
  rightCount = 1-0 = 1
  Claims: [3] at index 0

Index 1 (value 2): PLE=-1, NLE=2
  leftCount = 1-(-1) = 2
  rightCount = 2-1 = 1
  Claims: [2], [3,2]

Index 2 (value 2): PLE=-1, NLE=4
  leftCount = 2-(-1) = 3
  rightCount = 4-2 = 2
  Claims: [2], [2,2], [3,2,2], [2,3], [2,2,3], [3,2,2,3]
  Count: 3 × 2 = 6

Index 3 (value 3): PLE=2, NLE=4
  leftCount = 3-2 = 1
  rightCount = 4-3 = 1
  Claims: [3] at index 3

Total: 1 + 2 + 6 + 1 = 10 subarrays ✓
(Array of length 4 has 4+3+2+1 = 10 subarrays)

Each subarray counted exactly once! ✅
```

---

### The "Ownership Rule" for Duplicates:

**When multiple elements have the same value, who "owns" the subarray containing them?**

```
nums = [2, 2, 2]
       0  1  2

Subarray [2,2,2] has three 2's - which one claims it as minimum?
```

**Our rule:**
- **Previous boundary uses STRICT** → doesn't allow equal values to left
- **Next boundary uses NON-STRICT** → allows equal values to right

**Result:** The **RIGHTMOST** duplicate owns subarrays containing all duplicates!

```
For [2, 2, 2]:
  Index 0: Claims [2] only (stopped by NLE=1)
  Index 1: Claims [2], [2,2] from 0-1
  Index 2: Claims [2], [2,2] from 1-2, [2,2,2] ✓ (rightmost owns the longest!)

All 6 subarrays accounted for, no overlap!
```

---

### Quick Reference Table:

| Operation | Minimums | Maximums | Why |
|-----------|----------|----------|-----|
| **Previous Boundary** | `nums[stack.top] >= nums[i]` | `nums[stack.top] <= nums[i]` | STRICT - excludes equal |
| **Next Boundary** | `nums[stack.top] > nums[i]` | `nums[stack.top] < nums[i]` | NON-STRICT - includes equal |
| **Intuition** | PLE strict, NLE non-strict | PGE strict, NGE non-strict | Rightmost duplicate owns |

**Remember:**
- `>=` means "pop if greater or equal" → keeps STRICTLY LESS
- `>` means "pop if greater" → keeps LESS OR EQUAL
- **One strict, one not** → no double counting!

### Why Subtraction Works:

```
Consider subarray [2, 1, 3]:
  max = 3, min = 1, range = 3 - 1 = 2

When we calculate:
  - Element 3 contributes as maximum: +3
  - Element 1 contributes as minimum: -1
  - Net contribution to range: 3 - 1 = 2 ✓

This works for ALL subarrays!
```

---

## Related Problems:

- **907. Sum of Subarray Minimums** ✓ (Same technique!)
- **84. Largest Rectangle in Histogram** (Uses PLE/NLE)
- **496. Next Greater Element I** ✓ (NGE concept)

---

## Which Approach to Code?

- **Interview?** → Start with **Approach 2** (O(n²)), then optimize to **Approach 3**
- **Already solved Sum of Subarray Minimums?** → **Approach 3** will be straightforward!
- **Learning phase?** → Do both Approach 2 and 3 to understand the optimization

**Recommendation:** If you understood Sum of Subarray Minimums, go straight to Approach 3! It's the same logic applied twice (once for max, once for min).

---

**Konsa approach code karein? Better (O(n²)) ya Optimal (O(n))?** 🎯