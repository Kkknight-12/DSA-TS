# Subsets II

## Problem Statement (Hinglish mein)

**Kya karna hai?**
- Tumhe ek array `nums` diya gaya hai (may contain duplicates!)
- Find karo **sabhi possible subsets** (power set)
- **Important**: Result mein **duplicate subsets** nahi chahiye
- Order matter nahi karta

**Example:**
```
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

Explanation:
- [] - Empty subset (always included)
- [1] - Single element
- [1,2] - Using first 2
- [1,2,2] - Using both 2's
- [2] - Using one 2
- [2,2] - Using both 2's without 1

Total: 6 subsets (NOT 2^3 = 8, because duplicates avoid kiye)
```

**Key Points:**
1. Array mein **duplicates** ho sakte hain
2. **Empty subset** bhi include karna hai
3. **Duplicate subsets** avoid karne hain
4. Har element **maximum ek baar** use kar sakte ho

---

## Comparison: Subsets I vs Subsets II

```
┌────────────────────────────────────────────────────────────────────┐
│                   SUBSETS I vs SUBSETS II                          │
├─────────────────────┬──────────────────────┬──────────────────────┤
│ Feature             │ Subsets I            │ Subsets II           │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ Array duplicates    │ No (distinct)        │ Yes (allowed)        │
│ Duplicate subsets   │ N/A                  │ Must avoid!          │
│ Total subsets       │ Always 2^n           │ ≤ 2^n (due to dups) │
│ Sorting needed?     │ Optional             │ Mandatory!           │
│ Skip logic          │ None                 │ Skip duplicates      │
│ Empty subset        │ Yes                  │ Yes                  │
│ Example input       │ [1,2,3]              │ [1,2,2]              │
│ Example count       │ 8 subsets            │ 6 subsets            │
│ Complexity          │ O(2^n)               │ O(2^n)               │
└─────────────────────┴──────────────────────┴──────────────────────┘
```

---

## Comparison: Combination Sum II vs Subsets II

```
┌────────────────────────────────────────────────────────────────────┐
│              COMBINATION SUM II vs SUBSETS II                      │
├─────────────────────┬──────────────────────┬──────────────────────┤
│ Feature             │ Combination Sum II   │ Subsets II           │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ Goal                │ Sum = target         │ All subsets          │
│ Empty subset        │ Only if target=0     │ Always include!      │
│ Base case           │ sum == target        │ Every recursive call │
│ Sorting needed?     │ Yes                  │ Yes                  │
│ Skip duplicates     │ Yes (same logic!)    │ Yes (same logic!)    │
│ Pattern             │ Same backtracking!   │ Same backtracking!   │
└─────────────────────┴──────────────────────┴──────────────────────┘
```

**Key Insight:** Subsets II aur Combination Sum II mein **duplicate skipping logic bilkul same hai!** Bas base case different hai.

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Explore + Undo pattern
- **Power Set**: All possible subsets (2^n total for distinct elements)
- **Sorting**: To group duplicates together
- **Duplicate Skipping**: Same level pe duplicates avoid karna

---

## Intuition (Soch) 🤔

### Main Challenge: Duplicate Subsets Avoid Karna

**Problem:**
```
Input: [1, 2, 2]

WITHOUT duplicate handling (WRONG ❌):
Subsets: [], [1], [2], [2], [1,2], [1,2], [2,2], [1,2,2]
         Duplicates! ↑  ↑        ↑    ↑
```

**WITH duplicate handling (CORRECT ✅):**
```
Input: [1, 2, 2]
After sorting: [1, 2, 2]

Subsets: [], [1], [2], [1,2], [2,2], [1,2,2]
         6 unique subsets only!
```

### The Solution: Same as Combination Sum II!

**Step 1: Sort the array**
```
Before: [2, 1, 2]
After:  [1, 2, 2]
         ↑  ↑
      duplicates together!
```

**Step 2: Skip duplicates at same level**
```
for (let i = start; i < n; i++) {
  if (i > start && nums[i] === nums[i-1]) {
    continue;  // Skip duplicate at same level
  }
  // Process...
}
```

**Step 3: Add subset at EVERY recursive call**
```
function backtrack(start, current) {
  result.push([...current]);  // Add current subset!

  for (let i = start; i < n; i++) {
    // Pick/Skip logic...
  }
}
```

### Visual Example

```
nums = [1, 2, 2], sorted

                         backtrack(0, [])
                    ┌─── result.push([]) ───┐
                    │    result = [[]] ✓    │
                    /                        \
              Pick 1[0]                   Skip 1[0] (for loop)
                   /                            \
            backtrack(1,[1])                backtrack(1,[])
        ┌─ result.push([1]) ─┐          This doesn't happen!
        │  result = [[],[1]] │          WHY? Loop starts at i=1
              /         \                so we only process i=1,2
        Pick 2[1]    Skip 2[1]           (No "skip 1" branch!)
           /             \
    backtrack(2,[1,2])  backtrack(2,[1])
  ┌─ push([1,2]) ─┐         SKIPPED!
  │ [[],[1],[1,2]]│     WHY? i=2, start=1
       /    \            i > start ✓
   Pick 2[2] Skip       nums[2]==nums[1] ✓
      /        \         → continue (skip!)
  backtrack  backtrack
  (3,[1,2,2]) (3,[1,2])
  ┌─push─┐   This doesn't
  │[1,2,2]│   happen (skipped)
  │  ✓   │

After backtracking to backtrack(0,[]):

              Pick 2[1] (i=1)
                   /
            backtrack(2,[2])
        ┌─ result.push([2]) ─┐
        │  result = [...,[2]]│
              /
        Pick 2[2]
           /
    backtrack(3,[2,2])
  ┌─ push([2,2]) ─┐
  │   [[...,[2,2]]│
  │       ✓      │

              Pick 2[2] (i=2) - SKIPPED!
              WHY? i=2, start=0
              i > start ✓
              nums[2]==nums[1] ✓
              → continue (skip duplicate!)

Final Result: [[], [1], [1,2], [1,2,2], [2], [2,2]]

Key Points:
✓ result.push([...current]) at EVERY backtrack call
✓ Each recursive call has different current array (no duplicate subsets)
✓ "Skip" branches are NOT explicit - they're handled by loop continuation
✓ Duplicate skipping: if (i > start && nums[i] === nums[i-1]) continue
```

### Key Insight 💡

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Add to result: At EVERY recursive call                        │
│                 result.push([...current])                       │
│                                                                 │
│  Skip duplicates: if (i > start && nums[i] == nums[i-1])      │
│                   continue                                      │
│                                                                 │
│  Pick decision: backtrack(i + 1, ...)                          │
│                 Element used max once                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Approach: Backtracking with Duplicate Skipping

### Algorithm (Step by Step)

```
Function subsetsWithDup(nums):
  1. Sort nums array (MANDATORY!)
  2. result = []
  3. current = []
  4. Start backtracking: backtrack(0, current, result)
  5. Return result

Function backtrack(start, current, result):
  STEP 1: Add current subset to result (har call pe!)
  result.push([...current])  // Every call adds a subset!

  BASE CASE (Implicit):
  // Loop khud handle kar leta hai!
  // Jab start >= n, loop nahi chalega → automatic return
  // Explicit base case ki zaroorat nahi!

  RECURSIVE CASE:
  Loop from i = start to n-1:
    // Skip duplicates at same level
    if (i > start && nums[i] == nums[i-1]):
      continue  // Same level pe duplicate avoid karo

    // PICK current element
    current.push(nums[i])
    backtrack(i + 1, current, result)  // i+1, not i

    // BACKTRACK (undo the pick)
    current.pop()
```

### Why Add at Every Call?

**Combination Sum II:**
```typescript
function backtrack(...) {
  if (sum === target) {
    result.push([...current]);  // Only when sum matches
    return;
  }
  // Recursive logic...
}
```

**Subsets II:**
```typescript
function backtrack(start, current, result) {
  result.push([...current]);  // ALWAYS! Every subset is valid

  // Recursive logic...
}
```

**Why?**
- Combination Sum: Specific condition (sum = target)
- Subsets: Every state is a valid subset!

---

## Complexity Analysis

### Time Complexity: **O(n × 2^n)**

**Why?**
- Total subsets: At most 2^n
- Copying each subset: O(n) time
- Total: O(n × 2^n)

**With duplicates:**
- Actual subsets < 2^n
- But worst case still O(n × 2^n)

**In simple terms:**
```
For n=3 distinct elements: 2^3 = 8 subsets
For n=3 with duplicates: ≤ 8 subsets

Each subset copy takes O(n) time
Total: O(n × 2^n)
```

### Space Complexity: **O(n)**

**Why?**
1. **Recursion Stack**: O(n)
   - Maximum depth = n

2. **Current Array**: O(n)
   - Maximum n elements

3. **Result Array**: Not counted (it's output)

**In simple terms:**
```
Recursion depth = n
Current subset = maximum n elements
Total auxiliary space = O(n)
```

---

## Dry Run Example

**Input:** `nums = [1, 2, 2]` (already sorted)

```
Initial Call: subsetsWithDup([1,2,2])
  After sorting: [1, 2, 2]
  result = []
  current = []
  backtrack(0, [], result)

┌──────────────────────────────────────────────────────────────────┐
│ CALL 1: backtrack(start=0, current=[])                          │
├──────────────────────────────────────────────────────────────────┤
│ Step 1: Add current subset                                      │
│   result.push([...[]]) → result.push([])                        │
│   result = [[]]  ← Empty subset added! ✓                       │
│                                                                  │
│ Step 2: Loop i from 0 to 2                                      │
│                                                                  │
│ i=0: nums[0] = 1                                                │
│   Skip check: i > start? 0 > 0? NO                             │
│   Pick 1                                                         │
│   current.push(1) → current = [1]                               │
│   backtrack(1, [1], result) ──────────────┐                     │
│                                             ↓                     │
│   ┌─────────────────────────────────────────────────────┐       │
│   │ CALL 2: backtrack(start=1, current=[1])            │       │
│   ├─────────────────────────────────────────────────────┤       │
│   │ Step 1: Add current subset                         │       │
│   │   result.push([1])                                 │       │
│   │   result = [[], [1]]  ✓                           │       │
│   │                                                     │       │
│   │ Step 2: Loop i from 1 to 2                         │       │
│   │                                                     │       │
│   │ i=1: nums[1] = 2                                  │       │
│   │   Skip? i > start? 1 > 1? NO                      │       │
│   │   Pick 2[1]                                        │       │
│   │   current = [1, 2]                                 │       │
│   │   backtrack(2, [1,2], result) ─────┐              │       │
│   │                                      ↓              │       │
│   │   CALL 3: backtrack(start=2, [1,2])               │       │
│   │     Add: result.push([1,2])                        │       │
│   │     result = [[], [1], [1,2]]  ✓                  │       │
│   │                                                     │       │
│   │     Loop i from 2 to 2:                            │       │
│   │     i=2: nums[2] = 2                              │       │
│   │       Pick 2[2]                                    │       │
│   │       current = [1, 2, 2]                         │       │
│   │       backtrack(3, [1,2,2], result)               │       │
│   │         Add: result.push([1,2,2])                 │       │
│   │         result = [[], [1], [1,2], [1,2,2]]  ✓    │       │
│   │         Loop: i from 3 to 2 → Empty, return       │       │
│   │       current.pop() → [1, 2]                      │       │
│   │   current.pop() → [1]                              │       │
│   │                                                     │       │
│   │ i=2: nums[2] = 2                                  │       │
│   │   Skip? i > start? 2 > 1? YES                     │       │
│   │   nums[2] == nums[1]? 2 == 2? YES                │       │
│   │   → SKIP! ✓ (Avoids duplicate [1,2] subset)      │       │
│   └─────────────────────────────────────────────────────┘       │
│   current.pop() → []                                            │
│                                                                  │
│ i=1: nums[1] = 2                                                │
│   Skip? i > start? 1 > 0? YES                                  │
│   nums[1] == nums[0]? 2 == 1? NO → Don't skip                 │
│   Pick 2[1]                                                     │
│   current = [2]                                                │
│   backtrack(2, [2], result) ──────────────┐                    │
│                                             ↓                    │
│   CALL 4: backtrack(start=2, [2])                              │
│     Add: result.push([2])                                       │
│     result = [[], [1], [1,2], [1,2,2], [2]]  ✓                │
│                                                                  │
│     Loop i from 2 to 2:                                         │
│     i=2: Pick 2[2]                                             │
│       current = [2, 2]                                         │
│       backtrack(3, [2,2], result)                              │
│         Add: result.push([2,2])                                │
│         result = [[], [1], [1,2], [1,2,2], [2], [2,2]]  ✓    │
│       current.pop() → [2]                                      │
│   current.pop() → []                                            │
│                                                                  │
│ i=2: nums[2] = 2                                                │
│   Skip? i > start? 2 > 0? YES                                  │
│   nums[2] == nums[1]? 2 == 2? YES → SKIP! ✓                   │
│   (Avoids starting another branch with 2)                       │
└──────────────────────────────────────────────────────────────────┘

Final Result: [[], [1], [1,2], [1,2,2], [2], [2,2]]

Total: 6 unique subsets
```

**Summary:**
- Empty subset added at first call
- Each recursive call adds its current state as a subset
- Duplicate 2's skipped at same level to avoid duplicate subsets
- Total 6 subsets (not 2^3=8 due to duplicates)

---

## Edge Cases

```typescript
// 1. Single element
nums = [1]
Output: [[], [1]]

// 2. All duplicates
nums = [1, 1, 1]
Output: [[], [1], [1,1], [1,1,1]]

// 3. All distinct
nums = [1, 2, 3]
Output: [[], [1], [1,2], [1,2,3], [2], [2,3], [3]]
// Total: 2^3 = 8 subsets

// 4. Mix of duplicates
nums = [4, 4, 4, 1, 4]
Output: Multiple subsets with different counts of 4

// 5. Negative numbers
nums = [-1, 0, 1]
Output: [[], [-1], [-1,0], [-1,0,1], [-1,1], [0], [0,1], [1]]

// 6. Two pairs of duplicates
nums = [1, 1, 2, 2]
Output: [[], [1], [1,1], [1,1,2], [1,1,2,2], [1,2], [1,2,2], [2], [2,2]]
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Empty subset add karna bhool gaye

```typescript
// WRONG!
function backtrack(start, current, result) {
  if (current.length > 0) {  // ❌ Ye condition mat lagao!
    result.push([...current]);
  }
}
// Problem: Empty subset nahi milega
```

✅ **Correct:**
```typescript
function backtrack(start, current, result) {
  result.push([...current]);  // Always add, even if empty!
}
```

### ❌ Mistake 2: Base case laga diya (not needed!)

```typescript
// WRONG!
function backtrack(start, current, result) {
  if (start === n) {  // ❌ Ye base case zaroori nahi!
    result.push([...current]);
    return;
  }
}
// Problem: Subsets miss ho jayenge
```

✅ **Correct:**
```typescript
function backtrack(start, current, result) {
  result.push([...current]);  // No explicit base case needed!

  for (let i = start; i < n; i++) {
    // Loop naturally handles end condition
  }
}
```

### ❌ Mistake 3: Sorting bhool gaye

```typescript
// WRONG!
function subsetsWithDup(nums) {
  // No sorting!
  backtrack(0, [], result);
}
// Problem: Duplicate skipping logic fail hoga
```

✅ **Correct:**
```typescript
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);  // Sort first!
  backtrack(0, [], result);
}
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Should I include the empty subset?"**
   → Haan! Empty subset bhi power set ka part hai

2. **"Can the array have duplicates?"**
   → Haan! This is the main challenge

3. **"Should I avoid duplicate subsets in output?"**
   → Haan! Very important

4. **"Can I sort the input array?"**
   → Haan! Mandatory for duplicate handling

### Approach Explanation

```
"I'll use backtracking with these key points:

1. SORT array first
   → Groups duplicates together

2. Add subset at EVERY recursive call
   → Every state is a valid subset

3. SKIP duplicates at same level
   → Use: i > start && nums[i] == nums[i-1]

4. Pick and move to next index
   → Each element used max once

This generates all unique subsets efficiently."
```

### Follow-up Questions

**Q1:** "What if we CAN'T sort the array?"
**A1:** "We'd need to use a Set to track seen subsets, which would be O(2^n) space - not optimal."

**Q2:** "How many total subsets for n elements with duplicates?"
**A2:** "At most 2^n, but actual count depends on duplicate distribution. For all same elements, only n+1 subsets."

**Q3:** "Can we generate subsets iteratively (no recursion)?"
**A3:** "Yes! We can use the 'cascading' approach - for each element, add it to all existing subsets. Need to handle duplicates carefully."

---

## Summary

**Problem Type**: Backtracking with Duplicate Skipping (Power Set with Duplicates)

**Core Pattern**:
```typescript
// Sort first!
nums.sort((a, b) => a - b);

function backtrack(start, current, result) {
  // Add at every call!
  result.push([...current]);

  for (let i = start; i < n; i++) {
    // Skip duplicates at same level
    if (i > start && nums[i] === nums[i-1]) continue;

    // Pick and recurse
    current.push(nums[i]);
    backtrack(i + 1, current, result);
    current.pop();
  }
}
```

**Key Difference from Combination Sum II**:
- Combination Sum II: Add only when sum == target
- Subsets II: Add at EVERY recursive call

**Complexity**:
- Time: O(n × 2^n)
- Space: O(n)

**Next Steps**: Ready for solution.ts! 🚀

Ab solution dekhna chahoge? 😊
