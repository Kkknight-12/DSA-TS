# Combination Sum II

## Problem Statement (Hinglish mein)

**Kya karna hai?**
- Tumhe ek array `candidates` diya gaya hai (may contain duplicates!)
- Ek target sum `target` diya gaya hai
- Find karo **sabhi unique combinations** jo target sum banate hain
- **Important Differences from Combination Sum I:**
  1. ❌ Unlimited repetition **NAHI** - Har element **sirf ek baar** use kar sakte ho
  2. ⚠️ Array mein **duplicates** ho sakte hain
  3. ✅ **Duplicate combinations** nahi chahiye

**Example:**
```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6], [1,2,5], [1,7], [2,6]]

Explanation:
- [1,1,6]: Dono 1's different positions se hain (index 1 and 5)
- [1,2,5]: Valid combination
- [1,7]: Valid combination
- [2,6]: Valid combination

Dhyan do: [1,7] sirf ek baar hai, chahe array mein do 1's hain!
```

**Key Points:**
1. Har element **maximum ek baar** use kar sakte ho
2. Array mein duplicates allowed hain
3. Result mein duplicate combinations **nahi** chahiye
4. Order matter nahi karta (internally sorted rakhenge)

---

## Comparison: Combination Sum I vs II

```
┌────────────────────────────────────────────────────────────────────┐
│                   COMBINATION SUM I vs II                          │
├─────────────────────┬──────────────────────┬──────────────────────┤
│ Feature             │ Sum I                │ Sum II               │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ Repetition          │ Unlimited ✅         │ Once only ❌         │
│ Array duplicates    │ No (distinct)        │ Yes (allowed)        │
│ Duplicate combos    │ N/A                  │ Must avoid!          │
│ Pick decision       │ Stay at same index   │ Move to next index   │
│ Skip decision       │ Move to next index   │ Skip all duplicates  │
│ Sorting needed?     │ Optional             │ Mandatory!           │
│ Example input       │ [2,3,5], target=8    │ [2,2,5], target=5    │
│ Example output      │ [[2,2,2,2],[2,3,3],  │ [[5],[2,2,1]]        │
│                     │  [3,5]]              │                      │
└─────────────────────┴──────────────────────┴──────────────────────┘
```

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Decision explore karo, undo karo
- **Sorting**: Duplicates ko handle karne ke liye
- **Duplicate Skipping**: Same level pe duplicate elements ko skip karna

**Ye problem ke liye specific:**
- **Level-wise duplicate handling**: Same recursion level pe duplicates skip
- **Index management**: Har element sirf ek baar use ho

---

## Intuition (Soch) 🤔

### Main Challenge: Duplicates!

**Problem:**
```
Input: [1, 1, 2], target = 3
```

**Without duplicate handling (WRONG ❌):**
```
Combinations:
[1, 2] - using first 1
[1, 2] - using second 1  ← DUPLICATE!
[2, 1] - different order   ← DUPLICATE!
```

**With duplicate handling (CORRECT ✅):**
```
Combinations:
[1, 2] - only once
```

### The Solution: Sort + Skip Duplicates

**Step 1: Sort the array**
```
Before: [10, 1, 2, 7, 6, 1, 5]
After:  [1, 1, 2, 5, 6, 7, 10]
         ↑  ↑
      duplicates together!
```

**Step 2: Skip duplicates at same level**
```
When at index i:
  if (i > start && candidates[i] === candidates[i-1])
    skip!  // Already explored this value
```

### Visual Example

```
candidates = [1, 1, 2], target = 3 (sorted)

                    start(0, sum=0, [])
                    /                \
              Pick 1 (idx 0)     Skip 1 (idx 0)
                   /                    \
            (1, sum=1, [1])         start(1, sum=0, [])
              /         \                /          \
        Pick 1        Skip 1       Pick 1        Skip 1
       (idx 1)       (idx 1)      (idx 1)       (idx 1)
          /             \              |             |
    (2,sum=2,[1,1])  (2,sum=1,[1])    |             |
       /    \           /    \         |             |
   Pick 2  Skip 2   Pick 2  Skip 2    |             |
     /        \       /       \        |             |
  [1,1,2]    END   [1,2]✓   END       |             |
  sum=4❌          sum=3✓              |             |
                                       |             |
                                  Skip kiya!         |
                        WHY? i=1, i > start=1? NO   |
                             BUT wait...             |
                                                     |
                Actually at level 1:                |
                First call: start=1, i=1 → Pick 1   |
                Second call: start=1, i=2 → Pick 2  |
                                                     |
                At start(1):                        |
                  i=1: Process 1                    |
                  i=2: Skip 1 if candidates[2]==candidates[1]
                       BUT candidates[2]=2 ≠ 1
                       So don't skip
```

**Better visualization:**

```
candidates = [1, 1, 2], target = 3

Level 0 (start=0):
  i=0: Pick 1[0] → recurse with start=1
  i=1: Skip! (i > start && candidates[1] == candidates[0])
  i=2: Pick 2 → recurse with start=3 (out of bounds)

From i=0 (picked 1[0], sum=1, start=1):
  Level 1 (start=1):
    i=1: Pick 1[1] → sum=2, recurse with start=2
    i=2: Pick 2 → sum=3 ✓ Found! [1, 2]

  From i=1 (picked 1[1], sum=2, start=2):
    Level 2 (start=2):
      i=2: Pick 2 → sum=4 ❌ Exceeds target

Result: [[1, 2]] - only ONE combination, no duplicates!
```

### Key Insight 💡

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  PICK decision:   index + 1 (move to next)                    │
│                   → Element sirf ek baar use                   │
│                                                                 │
│  SKIP duplicates: if (i > start && arr[i] == arr[i-1])        │
│                   → Same level pe duplicate skip               │
│                                                                 │
│  SORTING:         Mandatory!                                   │
│                   → Duplicates ko group karta hai              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Approach: Backtracking with Duplicate Skipping

### Algorithm (Step by Step)

```
Function combinationSum2(candidates, target):
  1. Sort candidates array (IMPORTANT!)
  2. result = []
  3. current = []
  4. Start backtracking: backtrack(0, 0, current, result)
  5. Return result

Function backtrack(start, currentSum, current, result):
  BASE CASES:

  1. If currentSum == target:
     → Valid combination mil gaya! ✓
     → current ko result mein add karo (COPY!)
     → return

  2. If currentSum > target:
     → Sum exceed, invalid path
     → return

  RECURSIVE CASE:

  Loop from i = start to n-1:
    // Skip duplicates at same level!
    if (i > start && candidates[i] == candidates[i-1]):
      continue  // Skip this duplicate

    // PICK current element
    current.push(candidates[i])
    backtrack(i + 1, currentSum + candidates[i], current, result)
                ↑
             i + 1! (not i, like Combination Sum I)

    // BACKTRACK
    current.pop()
```

### Why `i > start` condition?

**Example:** `candidates = [1, 1, 2]`

```
At start=0:
  i=0: Pick 1[0] ✓ (i > start? 0 > 0? NO, so don't skip)
  i=1: Skip 1[1] ✓ (i > start? 1 > 0? YES, and arr[1]==arr[0], so SKIP)
  i=2: Pick 2 ✓

At start=1 (after picking 1[0]):
  i=1: Pick 1[1] ✓ (i > start? 1 > 1? NO, so don't skip)
       This allows [1, 1, ...] combinations!
  i=2: Pick 2 ✓

Key Point: `i > start` ensures we CAN pick duplicates
           when they're at the START of current level,
           but SKIP them if they appear LATER in the same level.
```

---

## Complexity Analysis

### Time Complexity: **O(2^n)**

**Why?**
- Worst case: Sabhi elements distinct aur sabhi valid
- Har element ke liye 2 choices (pick ya skip)
- Total paths ≈ 2^n

**With duplicates:**
- Duplicates skip karne se paths reduce hote hain
- But worst case still O(2^n)

**In simple terms:**
```
Agar n=10 distinct elements:
  → 2^10 = 1024 possible combinations

Agar duplicates hain:
  → Kuch paths skip honge
  → But still worst case 2^n consider karo
```

### Space Complexity: **O(n)**

**Why?**
1. **Recursion Stack**: O(n)
   - Maximum depth = n (array length)

2. **Current Array**: O(n)
   - Maximum n elements in combination

3. **Sorting**: O(1) if in-place, O(n) if extra space

4. **Result Array**: Not counted (it's output)

**In simple terms:**
```
Recursion depth = maximum n
Current combination = maximum n elements
Total auxiliary space = O(n)
```

---

## Dry Run Example

**Input:** `candidates = [1, 1, 2, 5], target = 7` (already sorted)

```
Initial Call: combinationSum2([1,1,2,5], 7)
  After sorting: [1, 1, 2, 5] (already sorted)
  result = []
  current = []
  backtrack(0, 0, [], result)

┌──────────────────────────────────────────────────────────────────┐
│ LEVEL 0: backtrack(start=0, sum=0, current=[], result=[])      │
├──────────────────────────────────────────────────────────────────┤
│ Loop: i from 0 to 3                                             │
│                                                                  │
│ i=0: candidates[0] = 1                                          │
│   Skip check: i > start? 0 > 0? NO → Don't skip               │
│   Pick 1[0]                                                     │
│   current.push(1) → current = [1]                              │
│   backtrack(1, 1, [1], result) ──────────┐                     │
│                                            ↓                     │
│   ┌────────────────────────────────────────────────────────┐   │
│   │ LEVEL 1: backtrack(start=1, sum=1, current=[1])       │   │
│   ├────────────────────────────────────────────────────────┤   │
│   │ Loop: i from 1 to 3                                    │   │
│   │                                                         │   │
│   │ i=1: candidates[1] = 1                                │   │
│   │   Skip? i > start? 1 > 1? NO → Don't skip            │   │
│   │   Pick 1[1]                                           │   │
│   │   current = [1, 1]                                    │   │
│   │   backtrack(2, 2, [1,1], result) ──────┐             │   │
│   │                                          ↓             │   │
│   │   ┌──────────────────────────────────────────────┐   │   │
│   │   │ LEVEL 2: backtrack(start=2, sum=2, [1,1])  │   │   │
│   │   ├──────────────────────────────────────────────┤   │   │
│   │   │ Loop: i from 2 to 3                         │   │   │
│   │   │                                              │   │   │
│   │   │ i=2: candidates[2] = 2                     │   │   │
│   │   │   Skip? 2 > 2? NO                          │   │   │
│   │   │   Pick 2                                    │   │   │
│   │   │   current = [1, 1, 2]                      │   │   │
│   │   │   backtrack(3, 4, [1,1,2], result)         │   │   │
│   │   │     i=3: Pick 5 → sum=9 > 7 ❌            │   │   │
│   │   │   current.pop() → [1, 1]                   │   │   │
│   │   │                                              │   │   │
│   │   │ i=3: candidates[3] = 5                     │   │   │
│   │   │   Pick 5                                    │   │   │
│   │   │   current = [1, 1, 5]                      │   │   │
│   │   │   backtrack(4, 7, [1,1,5], result)         │   │   │
│   │   │     sum == target! ✓✓✓                     │   │   │
│   │   │     result.push([1,1,5])                   │   │   │
│   │   │     result = [[1,1,5]]                     │   │   │
│   │   │   current.pop() → [1, 1]                   │   │   │
│   │   └──────────────────────────────────────────────┘   │   │
│   │   current.pop() → [1]                                 │   │
│   │                                                         │   │
│   │ i=2: candidates[2] = 2                                │   │
│   │   Skip? i > start? 2 > 1? YES                        │   │
│   │   candidates[2] == candidates[1]? 2 == 1? NO         │   │
│   │   Don't skip!                                          │   │
│   │   Pick 2                                              │   │
│   │   current = [1, 2]                                    │   │
│   │   backtrack(3, 3, [1,2], result)                     │   │
│   │     i=3: Pick 5 → sum=8 > 7 ❌                       │   │
│   │   current.pop() → [1]                                 │   │
│   │                                                         │   │
│   │ i=3: candidates[3] = 5                                │   │
│   │   Pick 5                                              │   │
│   │   current = [1, 5]                                    │   │
│   │   backtrack(4, 6, [1,5], result)                     │   │
│   │     Out of bounds, return                             │   │
│   │   current.pop() → [1]                                 │   │
│   └────────────────────────────────────────────────────────┘   │
│   current.pop() → []                                           │
│                                                                  │
│ i=1: candidates[1] = 1                                          │
│   Skip check: i > start? 1 > 0? YES                           │
│   candidates[1] == candidates[0]? 1 == 1? YES → SKIP! ✓       │
│   (This prevents duplicate combinations starting with 1)       │
│                                                                  │
│ i=2: candidates[2] = 2                                          │
│   Skip? i > start? 2 > 0? YES                                 │
│   candidates[2] == candidates[1]? 2 == 1? NO → Don't skip    │
│   Pick 2                                                        │
│   current = [2]                                                │
│   backtrack(3, 2, [2], result)                                │
│     i=3: Pick 5 → sum=7 ✓✓✓                                   │
│     result.push([2, 5])                                        │
│     result = [[1,1,5], [2,5]]                                 │
│   current.pop() → []                                           │
│                                                                  │
│ i=3: candidates[3] = 5                                          │
│   Pick 5                                                        │
│   current = [5]                                                │
│   backtrack(4, 5, [5], result)                                │
│     Out of bounds                                               │
│   current.pop() → []                                           │
└──────────────────────────────────────────────────────────────────┘

Final Result: [[1,1,5], [2,5]]
```

**Summary:**
- Found 2 valid combinations
- Skipped duplicate 1 at level 0 (i=1) to avoid duplicate combinations
- Each element used maximum once (i+1 in recursion)

---

## Edge Cases

```typescript
// 1. All duplicates, one valid combination
candidates = [1, 1, 1, 1], target = 2
Output: [[1, 1]]

// 2. No solution
candidates = [2, 3, 5], target = 1
Output: []

// 3. Single element matches
candidates = [1, 2, 3], target = 3
Output: [[3]]

// 4. Multiple duplicates
candidates = [2, 2, 2, 2], target = 4
Output: [[2, 2]]

// 5. Mix of duplicates and unique
candidates = [10, 1, 2, 7, 6, 1, 5], target = 8
Output: [[1,1,6], [1,2,5], [1,7], [2,6]]

// 6. Large numbers
candidates = [40, 30, 20, 10], target = 50
Output: [[10,40], [20,30]]
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Sorting karna bhool gaye

```typescript
// WRONG!
function combinationSum2(candidates, target) {
  // No sorting!
  backtrack(0, 0, [], candidates, target, result);
}
// Problem: Duplicates ko handle nahi kar paoge
```

✅ **Correct:**
```typescript
function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b); // Sort first!
  backtrack(0, 0, [], candidates, target, result);
}
```

### ❌ Mistake 2: Wrong skip condition

```typescript
// WRONG!
if (candidates[i] === candidates[i-1]) continue;
// Problem: Ye first duplicate ko bhi skip kar dega!
```

✅ **Correct:**
```typescript
if (i > start && candidates[i] === candidates[i-1]) continue;
// i > start ensures first occurrence is processed
```

### ❌ Mistake 3: Index management wrong

```typescript
// WRONG!
backtrack(i, sum + candidates[i], ...);
// Problem: Element ko unlimited times use kar sakte honge!
```

✅ **Correct:**
```typescript
backtrack(i + 1, sum + candidates[i], ...);
// i + 1 ensures each element used max once
```

---

## Interview Tips 💡

### Clarification Questions

Interviewer se pehle ye poochho:
1. **"Can candidates have duplicates?"**
   → Haan! This problem specifically has duplicates

2. **"Can I use the same element multiple times?"**
   → Nahi! Each element max once

3. **"Should I avoid duplicate combinations in output?"**
   → Haan! Very important

4. **"Can I sort the input array?"**
   → Haan! Actually mandatory for this approach

### Approach Explanation

```
"I'll use backtracking with these key strategies:

1. SORT the array first
   → Groups duplicates together

2. SKIP duplicates at same recursion level
   → Use condition: i > start && arr[i] == arr[i-1]

3. Move to NEXT index after picking
   → Each element used max once (not unlimited like Sum I)

4. BACKTRACK after exploring
   → Try all valid paths

This ensures unique combinations without duplicates."
```

### Follow-up Questions

**Q1:** "What if we CAN use elements multiple times?"
**A1:** "That becomes Combination Sum I - we'd stay at same index after picking instead of moving to i+1"

**Q2:** "How to optimize further?"
**A2:** "We can add pruning - if current sum > target, skip remaining elements (since array is sorted)"

**Q3:** "What if array is very large?"
**A3:** "We can add early termination - if current element > remaining sum, break the loop"

### Bonus Optimizations 🌟

```typescript
// Optimization 1: Early break
for (let i = start; i < n; i++) {
  if (candidates[i] > target - currentSum) break;
  // Remaining elements will also be > target
  // (since array is sorted)
}

// Optimization 2: Pruning before recursion
if (currentSum + candidates[i] > target) continue;
```

---

## Summary

**Problem Type**: Backtracking with Duplicate Handling

**Core Pattern**:
```typescript
// Sort first!
candidates.sort((a, b) => a - b);

// Skip duplicates at same level
if (i > start && candidates[i] === candidates[i-1]) continue;

// Pick: move to next index (not same!)
backtrack(i + 1, sum + candidates[i], ...);
```

**Key Differences from Sum I**:
- ✅ Sorting mandatory
- ✅ Duplicate skipping needed
- ✅ Each element max once (i+1, not i)

**Complexity**:
- Time: O(2^n)
- Space: O(n)

**Next Steps**: Ready for implementation! 🚀

Ab solution.ts banana chahoge? 😊