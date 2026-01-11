# Strict vs Non-Strict Comparison in Monotonic Stack

## Pehle Basic Samjho: Comparison Operators

```
>   : Greater than (strictly)
>=  : Greater than OR equal
<   : Less than (strictly)
<=  : Less than OR equal
```

**Simple examples:**
```
5 > 5   → false  (5 is NOT greater than 5)
5 >= 5  → true   (5 IS greater than or equal to 5)

3 < 3   → false  (3 is NOT less than 3)
3 <= 3  → true   (3 IS less than or equal to 3)
```

---

## The Confusion: What Do We Mean by "Strict"?

Jab hum monotonic stack problems mein "strict" bolte hain, do different cheezein hain:

1. **Comparison operator mein strict** (like `>` without `=`)
2. **Result mein strict** (what type of element we find)

**These are OPPOSITE!**

| Pop Condition | What it means | What REMAINS in stack |
|---------------|---------------|----------------------|
| Pop if `stack.top >= current` | Pop when greater OR equal | Only **strictly less** elements remain |
| Pop if `stack.top > current` | Pop when only greater | **Less or equal** elements remain |

---

## Ek Simple Analogy

Imagine a door with a height restriction:

**Door 1: "No one 170cm or taller allowed"** (>= 170)
- 175cm person: BLOCKED (175 >= 170 ✓)
- 170cm person: BLOCKED (170 >= 170 ✓)
- 165cm person: ALLOWED (165 >= 170 ✗)
- Result: Only people **strictly less than 170cm** enter

**Door 2: "No one taller than 170cm allowed"** (> 170)
- 175cm person: BLOCKED (175 > 170 ✓)
- 170cm person: ALLOWED (170 > 170 ✗) ← Equal is allowed!
- 165cm person: ALLOWED (165 > 170 ✗)
- Result: People **170cm or less** enter (equal allowed)

---

## In Code: PLE Example

### Finding Previous Less Element (PLE)

**Question:** For each element, find the nearest element to its LEFT that is SMALLER.

```typescript
function findPLE(nums: number[]): number[] {
    const n = nums.length;
    const ple: number[] = new Array(n);
    const stack: number[] = []; // Stores indices

    for (let i = 0; i < n; i++) {
        // QUESTION: Should we use >= or > ?
        while (stack.length > 0 && nums[stack[stack.length - 1]] ??? nums[i]) {
            stack.pop();
        }

        ple[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
        stack.push(i);
    }

    return ple;
}
```

### Option 1: Using `>=` (Pop if stack.top >= current)

```typescript
while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
    stack.pop();
}
```

**What this does:**
- Pop elements that are **greater than OR equal to** current
- What remains? Only elements **strictly less than** current
- Equal elements get POPPED (removed)

**Dry Run:** `nums = [3, 2, 2, 1]`

```
i=0, nums[0]=3:
  Stack empty → PLE[0] = -1
  Push 0 → Stack: [0]

i=1, nums[1]=2:
  Stack top: nums[0]=3
  Is 3 >= 2? YES → Pop!
  Stack empty → PLE[1] = -1
  Push 1 → Stack: [1]

i=2, nums[2]=2:
  Stack top: nums[1]=2
  Is 2 >= 2? YES → Pop! ← EQUAL gets popped!
  Stack empty → PLE[2] = -1  ← No PLE found!
  Push 2 → Stack: [2]

i=3, nums[3]=1:
  Stack top: nums[2]=2
  Is 2 >= 1? YES → Pop!
  Stack empty → PLE[3] = -1
  Push 3 → Stack: [3]

Result: PLE = [-1, -1, -1, -1]
```

**Key observation:** For index 2 (value 2), the equal element at index 1 was **NOT** considered as PLE. We found **strictly less** elements only.

### Option 2: Using `>` (Pop if stack.top > current)

```typescript
while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
    stack.pop();
}
```

**What this does:**
- Pop elements that are **only greater than** current
- What remains? Elements **less than or equal to** current
- Equal elements are KEPT (not removed)

**Dry Run:** `nums = [3, 2, 2, 1]`

```
i=0, nums[0]=3:
  Stack empty → PLE[0] = -1
  Push 0 → Stack: [0]

i=1, nums[1]=2:
  Stack top: nums[0]=3
  Is 3 > 2? YES → Pop!
  Stack empty → PLE[1] = -1
  Push 1 → Stack: [1]

i=2, nums[2]=2:
  Stack top: nums[1]=2
  Is 2 > 2? NO → Don't pop! ← EQUAL stays!
  PLE[2] = 1  ← Found index 1 as "PLE" (but it's equal!)
  Push 2 → Stack: [1, 2]

i=3, nums[3]=1:
  Stack top: nums[2]=2
  Is 2 > 1? YES → Pop!
  Stack top: nums[1]=2
  Is 2 > 1? YES → Pop!
  Stack empty → PLE[3] = -1
  Push 3 → Stack: [3]

Result: PLE = [-1, -1, 1, -1]
```

**Key observation:** For index 2 (value 2), we found index 1 (also value 2) as "PLE" even though it's **equal**, not strictly less!

---

## Summary Table: What Each Comparison Gives

| Pop Condition | What Gets Popped | What Remains | Result Type |
|---------------|------------------|--------------|-------------|
| `nums[stack.top] >= nums[i]` | Greater AND Equal | **Strictly Less** | STRICT |
| `nums[stack.top] > nums[i]` | Only Greater | **Less or Equal** | NON-STRICT |
| `nums[stack.top] <= nums[i]` | Less AND Equal | **Strictly Greater** | STRICT |
| `nums[stack.top] < nums[i]` | Only Less | **Greater or Equal** | NON-STRICT |

**Remember:**
- `>=` or `<=` in pop → **Strict result** (excludes equal)
- `>` or `<` in pop → **Non-strict result** (includes equal)

---

## Why Does This Matter? THE DUPLICATE PROBLEM!

### The Scenario

```
nums = [2, 2, 2]
       0  1  2
```

**Question:** Element 2 appears 3 times. When we calculate "sum of subarray minimums", which index should claim which subarrays?

**All subarrays:**
```
[2] starting at 0           → min = 2
[2] starting at 1           → min = 2
[2] starting at 2           → min = 2
[2,2] from index 0-1        → min = 2
[2,2] from index 1-2        → min = 2
[2,2,2] from index 0-2      → min = 2

Total: 6 subarrays, each with min = 2
Sum of minimums = 2 × 6 = 12
```

**The problem:** When three elements have same value, who "claims" which subarray as minimum?

---

## Three Scenarios: What Can Go Wrong

### Scenario 1: Both PLE and NLE Use Strict (`>=` and `>=`)

```
nums = [2, 2, 2]

PLE (using >=):
  Each 2 pops the equal 2 to its left
  PLE = [-1, -1, -1]  (no strictly less element anywhere)

NLE (using >=):
  Each 2 pops the equal 2 to its right
  NLE = [3, 3, 3]  (no strictly less element anywhere)
```

**Contribution calculation:**
```
Index 0: leftCount = 0-(-1) = 1, rightCount = 3-0 = 3
         Subarrays: 1 × 3 = 3
         Claims: [2], [2,2], [2,2,2]

Index 1: leftCount = 1-(-1) = 2, rightCount = 3-1 = 2
         Subarrays: 2 × 2 = 4
         Claims: [2], [2,2] (left), [2,2] (right), [2,2,2]

Index 2: leftCount = 2-(-1) = 3, rightCount = 3-2 = 1
         Subarrays: 3 × 1 = 3
         Claims: [2], [2,2], [2,2,2]

Total subarrays claimed: 3 + 4 + 3 = 10
```

❌ **WRONG!** We only have 6 subarrays, but we counted 10!
The subarray `[2,2,2]` was counted 3 times (once by each index)!

---

### Scenario 2: Both PLE and NLE Use Non-Strict (`>` and `>`)

```
nums = [2, 2, 2]

PLE (using >):
  Equal elements are kept
  PLE = [-1, 0, 1]  (each finds the previous equal element)

NLE (using >):
  Equal elements are kept
  NLE = [1, 2, 3]  (each finds the next equal element)
```

**Contribution calculation:**
```
Index 0: leftCount = 0-(-1) = 1, rightCount = 1-0 = 1
         Subarrays: 1 × 1 = 1
         Claims: [2] at index 0 only

Index 1: leftCount = 1-0 = 1, rightCount = 2-1 = 1
         Subarrays: 1 × 1 = 1
         Claims: [2] at index 1 only

Index 2: leftCount = 2-1 = 1, rightCount = 3-2 = 1
         Subarrays: 1 × 1 = 1
         Claims: [2] at index 2 only

Total subarrays claimed: 1 + 1 + 1 = 3
```

❌ **WRONG!** We have 6 subarrays, but we only counted 3!
Subarrays `[2,2]` and `[2,2,2]` were claimed by NO ONE!

---

### Scenario 3: PLE Strict, NLE Non-Strict (`>=` and `>`) ✅

```
nums = [2, 2, 2]

PLE (using >=):
  Equal elements get popped
  PLE = [-1, -1, -1]

NLE (using >):
  Equal elements are kept
  NLE = [1, 2, 3]
```

**NLE Trace (right to left):**

```
i=2, nums[2]=2:
  Stack empty → NLE[2] = 3
  Push 2 → Stack: [2]

i=1, nums[1]=2:
  Stack top: nums[2]=2
  Is 2 > 2? NO → Don't pop (equal stays!)
  NLE[1] = 2  ← The equal element at index 2
  Push 1 → Stack: [2, 1]

i=0, nums[0]=2:
  Stack top: nums[1]=2
  Is 2 > 2? NO → Don't pop
  NLE[0] = 1  ← The equal element at index 1
  Push 0 → Stack: [2, 1, 0]

NLE = [1, 2, 3]
```

**Contribution calculation:**
```
Index 0: leftCount = 0-(-1) = 1, rightCount = 1-0 = 1
         Subarrays: 1 × 1 = 1
         Claims: [2] at index 0

Index 1: leftCount = 1-(-1) = 2, rightCount = 2-1 = 1
         Subarrays: 2 × 1 = 2
         Claims: [2] at index 1, [2,2] from 0-1

Index 2: leftCount = 2-(-1) = 3, rightCount = 3-2 = 1
         Subarrays: 3 × 1 = 3
         Claims: [2] at index 2, [2,2] from 1-2, [2,2,2] from 0-2

Total subarrays claimed: 1 + 2 + 3 = 6 ✅
```

**Perfect!** Each subarray is claimed exactly once!

---

## The Visual Understanding

```
nums = [2, 2, 2]
       0  1  2

With PLE strict (>=) and NLE non-strict (>):

Index 0:
  PLE = -1 (nothing to left)
  NLE = 1  (first equal/less element to right)
  Range: Can only start at 0, must end before index 1
  Claims: [2] at index 0
          ┌─┐
          │2│ 2  2
          └─┘

Index 1:
  PLE = -1 (equal element at 0 was excluded)
  NLE = 2  (first equal/less element to right)
  Range: Can start at 0 or 1, must end before index 2
  Claims: [2] at index 1, [2,2] from 0-1
          ┌───────┐
           2 │ 2 │ 2
              └───┘
          ┌─┐
           2  2  2
          └─┘

Index 2:
  PLE = -1 (all equal elements excluded)
  NLE = 3  (nothing to right)
  Range: Can start at 0, 1, or 2, end at 2
  Claims: [2] at index 2, [2,2] from 1-2, [2,2,2]
                    ┌─┐
           2   2  │2│
                  └─┘
               ┌────┐
           2  │ 2  2│
              └────┘
          ┌─────────┐
          │ 2  2  2 │
          └─────────┘
```

**The Rule:** The **rightmost** duplicate extends its range to include all duplicates!

---

## The Golden Rule 🏆

**For handling duplicates correctly:**

| Finding | Use This Pop Condition | Result |
|---------|------------------------|--------|
| **Previous Less Element (PLE)** | `nums[stack.top] >= nums[i]` | Strictly less |
| **Next Less Element (NLE)** | `nums[stack.top] > nums[i]` | Less or equal |
| **Previous Greater Element (PGE)** | `nums[stack.top] <= nums[i]` | Strictly greater |
| **Next Greater Element (NGE)** | `nums[stack.top] < nums[i]` | Greater or equal |

**Pattern:**
- **Previous** boundary: Use INCLUSIVE comparison (`>=` or `<=`) → excludes equals from result
- **Next** boundary: Use EXCLUSIVE comparison (`>` or `<`) → includes equals in result

**Why this specific combination?**
- The **rightmost** duplicate among equals gets to extend its range leftward
- This ensures every subarray is counted exactly ONCE
- No double counting, no missing subarrays!

---

## One More Example: Mixed Values

```
nums = [3, 1, 2, 1, 3]
       0  1  2  3  4
```

**Focus on the duplicate 1's at indices 1 and 3.**

**With correct approach (PLE strict, NLE non-strict):**

```
For index 1 (value 1):
  PLE: Look left for strictly less
    nums[0]=3 is not less → PLE = -1
  NLE: Look right for less or equal
    nums[2]=2 is not <= 1
    nums[3]=1 is <= 1 → NLE = 3

  leftCount = 1 - (-1) = 2
  rightCount = 3 - 1 = 2
  Subarrays: 2 × 2 = 4
  Claims: [1], [3,1], [1,2], [3,1,2]

For index 3 (value 1):
  PLE: Look left for strictly less
    nums[2]=2 not less
    nums[1]=1 not strictly less (equal!)
    nums[0]=3 not less → PLE = -1
  NLE: Look right for less or equal
    nums[4]=3 not less → NLE = 5

  leftCount = 3 - (-1) = 4
  rightCount = 5 - 3 = 2
  Subarrays: 4 × 2 = 8
  Claims: [1], [2,1], [1,2,1], [3,1,2,1], [1,3], [2,1,3], [1,2,1,3], [3,1,2,1,3]
```

Index 1 claims subarrays where 1 is minimum and don't extend to index 3.
Index 3 claims subarrays where 1 is minimum and include index 3.

No overlap! Each subarray with minimum 1 is counted exactly once!

---

## Summary: The Cheat Sheet

```
┌─────────────────────────────────────────────────────────────┐
│                  DUPLICATE HANDLING RULE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   For MINIMUMS:                                             │
│   ┌─────────────┬────────────────┬─────────────────────┐   │
│   │ PLE         │ pop if >= curr │ finds strictly less │   │
│   │ NLE         │ pop if > curr  │ finds less or equal │   │
│   └─────────────┴────────────────┴─────────────────────┘   │
│                                                             │
│   For MAXIMUMS:                                             │
│   ┌─────────────┬────────────────┬─────────────────────────┐│
│   │ PGE         │ pop if <= curr │ finds strictly greater  ││
│   │ NGE         │ pop if < curr  │ finds greater or equal  ││
│   └─────────────┴────────────────┴─────────────────────────┘│
│                                                             │
│   KEY INSIGHT:                                              │
│   - "Previous" uses INCLUSIVE pop (includes = in pop)       │
│   - "Next" uses EXCLUSIVE pop (excludes = from pop)         │
│   - This makes rightmost duplicate own shared subarrays     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Memory Trick:**
- **P**revious = **P**op equals (use >=)
- **N**ext = **N**o pop for equals (use >)

---

## Related Problems

- **907. Sum of Subarray Minimums** - Direct application
- **2104. Sum of Subarray Ranges** - Apply twice (for max and min)
- **84. Largest Rectangle in Histogram** - Uses same boundary concept

---

*Ab samajh aaya? The key is: one boundary excludes equals, one includes equals, so duplicates are handled correctly!* 🎯