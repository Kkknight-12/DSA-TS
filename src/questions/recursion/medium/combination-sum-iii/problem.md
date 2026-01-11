# Combination Sum III

## Problem Statement (Hinglish mein)

**Kya karna hai?**
- Find karo **all valid combinations** of **exactly k numbers** that sum up to **n**
- **Numbers:** Only 1 through 9 use kar sakte ho
- **Each number** at most **ek baar** use ho sakta hai
- Return combinations in any order

**Key Constraints:**
```
1. Numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9  (fixed range!)
2. Each number used maximum ONCE
3. Combination size = exactly k numbers
4. Sum must equal n
```

**Example:**
```
Input: k = 3, n = 7
Output: [[1,2,4]]

Explanation:
1 + 2 + 4 = 7  ✓
- Has exactly 3 numbers ✓
- All numbers from 1-9 ✓
- Each number used once ✓

Why not [1,3,3]? → 3 is used twice! ❌
Why not [1,6]? → Only 2 numbers, need 3! ❌
```

**Example 2:**
```
Input: k = 3, n = 9
Output: [[1,2,6], [1,3,5], [2,3,4]]

Explanation:
1 + 2 + 6 = 9  ✓ (3 numbers)
1 + 3 + 5 = 9  ✓ (3 numbers)
2 + 3 + 4 = 9  ✓ (3 numbers)
```

**Example 3:**
```
Input: k = 4, n = 1
Output: []

Explanation:
Minimum sum with 4 different numbers: 1+2+3+4 = 10
Since 10 > 1, impossible to get sum = 1
```

---

## Comparison: Combination Sum Series

```
┌────────────────────┬──────────────┬──────────────┬──────────────┐
│ Feature            │ Sum I        │ Sum II       │ Sum III      │
├────────────────────┼──────────────┼──────────────┼──────────────┤
│ Input              │ Given array  │ Given array  │ Fixed 1-9    │
│ Repetition         │ Unlimited    │ Once only    │ Once only    │
│ Duplicates in arr  │ No           │ Yes          │ No (1-9)     │
│ Target             │ sum = target │ sum = target │ sum = n      │
│ Size constraint    │ None         │ None         │ Exactly k    │
│ Sort needed?       │ Optional     │ Mandatory    │ Not needed   │
│ Skip logic         │ None         │ Yes          │ None needed  │
└────────────────────┴──────────────┴──────────────┴──────────────┘
```

**Key Difference:**
- **Sum I**: Unlimited repetition, any size
- **Sum II**: Each element once, array has duplicates, any size
- **Sum III**: Each number (1-9) once, exactly k numbers

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Build solution incrementally, explore all paths
- **Pruning**: Stop early when conditions can't be met
- **Combination generation**: Choose k items from n items

---

## Intuition (Soch) 🤔

### The Challenge: Two Conditions Simultaneously

**Need to satisfy BOTH:**
1. **Sum = n** (target sum)
2. **Size = k** (exact count)

**Example:**
```
k = 3, n = 9

Valid: [1,2,6] → sum=9 ✓, size=3 ✓
Invalid: [1,8] → sum=9 ✓, size=2 ❌
Invalid: [1,2,3] → sum=6 ❌, size=3 ✓
```

### Why Only 1-9?

**Limited Options:**
```
Available numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9
Total: Only 9 numbers!

Maximum possible sum: 1+2+3+4+5+6+7+8+9 = 45
Minimum sum with k numbers: 1+2+...+k

If n > 45? → Impossible!
If n < k*(k+1)/2? → Impossible!
```

### The Pattern: Backtracking with Pruning

```
Input: k=3, n=9

Start with empty combination: []

Try 1:
  [1] → need 2 more numbers, sum = 8
    Try 2:
      [1,2] → need 1 more, sum = 6
        Try 3: [1,2,3] → sum=6 ❌ (need 9)
        Try 4: [1,2,4] → sum=7 ❌
        Try 5: [1,2,5] → sum=8 ❌
        Try 6: [1,2,6] → sum=9 ✓ Found!
        Try 7: [1,2,7] → sum=10 > 9, stop!
    Try 3:
      [1,3] → need 1 more, sum = 5
        Try 4: [1,3,4] → sum=8 ❌
        Try 5: [1,3,5] → sum=9 ✓ Found!
        Try 6: [1,3,6] → sum=10 > 9, stop!

Try 2:
  [2] → need 2 more, sum = 7
    Try 3:
      [2,3] → need 1 more, sum = 4
        Try 4: [2,3,4] → sum=9 ✓ Found!
        Try 5: [2,3,5] → sum=10 > 9, stop!

...

Result: [[1,2,6], [1,3,5], [2,3,4]]
```

---

## Approach: Backtracking with Pruning (Optimal)

### Prerequisites (Agar Koi Chahiye):
- **Backtracking Pattern**: Build solution incrementally
- **Pruning**: Early termination when impossible
- **Two conditions tracking**: Count and sum simultaneously

### Intuition (Soch):

**Key Insights:**
1. **Fixed range**: Only try numbers 1-9
2. **No duplicates**: Start next search from (current + 1)
3. **Two base cases**:
   - Success: size = k AND sum = n
   - Failure: size > k OR sum > n (prune!)

### Visual Tree

```
Input: k=3, n=9

                    backtrack(start=1, current=[], sum=0)
                              /    |    \
                          Pick 1  Pick 2  Pick 3...
                            /        |
             backtrack(2,[1],1)  backtrack(3,[2],2)
                    /    \              /     \
              Pick 2   Pick 3      Pick 3   Pick 4
                 /         \          /         \
      backtrack(3,[1,2],3) ...   backtrack(4,[2,3],5)
            /    |    \                  /    \
      Pick 3  Pick 4  Pick 6        Pick 4  Pick 5
        /       |        \              /      \
      [1,2,3] [1,2,4]  [1,2,6]      [2,3,4]  [2,3,5]
      sum=6❌ sum=7❌  sum=9✓      sum=9✓   sum=10❌
                       k=3✓         k=3✓    sum>n!

Pruning:
- If sum > n → stop (can't reduce)
- If size > k → stop (too many numbers)
- If sum = n but size ≠ k → invalid
- If size = k but sum ≠ n → invalid
```

### Algorithm (Step by Step)

```
Function combinationSum3(k, n):
  1. Edge cases:
     - If n > 45 → return [] (impossible)
     - If n < k*(k+1)/2 → return [] (min sum too large)

  2. result = []
  3. current = []
  4. Start backtracking: backtrack(1, 0, current, result)
  5. Return result

Function backtrack(start, currentSum, current, result):
  BASE CASES:
  1. Success case:
     if (current.length === k && currentSum === n):
       result.push([...current])
       return

  2. Failure cases (PRUNING):
     if (current.length > k):
       return  // Too many numbers

     if (currentSum > n):
       return  // Sum exceeded

     if (current.length === k && currentSum !== n):
       return  // Wrong sum with k numbers

  RECURSIVE CASE:
  Loop from i = start to 9:
    // PICK current number i
    current.push(i)
    currentSum += i

    // RECURSE for next number (i+1, not i - each used once!)
    backtrack(i + 1, currentSum, current, result)

    // BACKTRACK
    current.pop()
    currentSum -= i
```

### Why This Works?

**Two-condition tracking:**
```typescript
// We track BOTH conditions:
if (current.length === k && currentSum === n) {
  // Both satisfied! Valid combination
  result.push([...current]);
}

// Prune early:
if (currentSum > n) return;  // Can't reduce sum
if (current.length > k) return;  // Too many numbers
```

**No duplicate combinations:**
```typescript
// We start from (i + 1) in next recursion
// This ensures we never use same number twice
// And we explore in increasing order
backtrack(i + 1, currentSum + i, ...);
```

### Complexity Analysis

**Time Complexity: O(C(9, k))** approximately

**Why?**
- We're choosing k numbers from 9 numbers
- C(9, k) = 9!/(k! × (9-k)!)
- For k=3: C(9,3) = 84 maximum combinations
- With pruning, actual checks are much less

**In simple terms:**
```
For k=3, n=9:
- Maximum combinations to check: C(9,3) = 84
- With pruning (sum > n), much faster!

For k=5, n=20:
- Maximum: C(9,5) = 126
- But many paths pruned early
```

**Space Complexity: O(k)**

**Why?**
1. **Recursion Stack**: O(k)
   - Maximum depth = k (we pick k numbers)
2. **Current Array**: O(k)
3. **Result**: Not counted (output)

---

## Approach 2: Optimized Pruning

### Additional Optimizations:

```typescript
// 1. Early termination - if remaining numbers can't reach target
if (currentSum + (10 - start) * (k - current.length) / 2 < n) {
  return;  // Even with largest remaining numbers, can't reach n
}

// 2. Skip impossible branches
if (start > 9) return;  // No more numbers to try

// 3. Early sum check
if (currentSum === n && current.length < k) {
  return;  // Sum reached but not enough numbers
}
```

---

## Dry Run Example

**Input:** `k = 3, n = 9`

```
Initial: result = [], current = [], sum = 0

┌──────────────────────────────────────────────────────────────────┐
│ CALL 1: backtrack(start=1, sum=0, current=[])                   │
├──────────────────────────────────────────────────────────────────┤
│ Base cases:                                                      │
│   length === k? 0 === 3? NO                                     │
│   sum > n? 0 > 9? NO                                            │
│                                                                  │
│ Loop from i=1 to 9                                              │
│                                                                  │
│ ┌─ i=1: Pick 1 ─────────────────────────────────────────┐      │
│ │ current.push(1) → current = [1]                        │      │
│ │ sum = 0 + 1 = 1                                        │      │
│ │ Recurse: backtrack(2, 1, [1], result)                 │      │
│ │   ↓                                                     │      │
│ │   CALL 2: backtrack(start=2, sum=1, current=[1])      │      │
│ │   Base cases: NO                                       │      │
│ │                                                         │      │
│ │   Loop from i=2 to 9                                   │      │
│ │   ┌─ i=2: Pick 2 ───────────────────────────┐        │      │
│ │   │ current = [1,2], sum = 3                 │        │      │
│ │   │ Recurse: backtrack(3, 3, [1,2], result) │        │      │
│ │   │   ↓                                       │        │      │
│ │   │   CALL 3: backtrack(3, 3, [1,2])        │        │      │
│ │   │   Loop from i=3 to 9                     │        │      │
│ │   │                                           │        │      │
│ │   │   i=3: current=[1,2,3], sum=6           │        │      │
│ │   │         length=3✓, sum≠9❌               │        │      │
│ │   │         Return (invalid)                 │        │      │
│ │   │                                           │        │      │
│ │   │   i=4: current=[1,2,4], sum=7           │        │      │
│ │   │         length=3✓, sum≠9❌               │        │      │
│ │   │         Return (invalid)                 │        │      │
│ │   │                                           │        │      │
│ │   │   i=5: current=[1,2,5], sum=8           │        │      │
│ │   │         length=3✓, sum≠9❌               │        │      │
│ │   │         Return (invalid)                 │        │      │
│ │   │                                           │        │      │
│ │   │   i=6: current=[1,2,6], sum=9           │        │      │
│ │   │         length=3✓, sum=9✓               │        │      │
│ │   │         result.push([1,2,6]) ✓          │        │      │
│ │   │         result = [[1,2,6]]               │        │      │
│ │   │         Return                            │        │      │
│ │   │                                           │        │      │
│ │   │   i=7: current=[1,2,7], sum=10          │        │      │
│ │   │         sum > n? 10 > 9? YES             │        │      │
│ │   │         PRUNE! Return                    │        │      │
│ │   │                                           │        │      │
│ │   │   (No need to check i=8,9)              │        │      │
│ │   └───────────────────────────────────────────┘        │      │
│ │   Back to CALL 2, current.pop() → [1]                 │      │
│ │                                                         │      │
│ │   ┌─ i=3: Pick 3 ───────────────────────────┐        │      │
│ │   │ current = [1,3], sum = 4                 │        │      │
│ │   │ Recurse: backtrack(4, 4, [1,3], result) │        │      │
│ │   │   ...similar process...                  │        │      │
│ │   │   i=4: [1,3,4] sum=8 ❌                 │        │      │
│ │   │   i=5: [1,3,5] sum=9 ✓                  │        │      │
│ │   │         result = [[1,2,6],[1,3,5]]      │        │      │
│ │   │   i=6: [1,3,6] sum=10 > 9, PRUNE!       │        │      │
│ │   └───────────────────────────────────────────┘        │      │
│ │   Back to CALL 2                                       │      │
│ │                                                         │      │
│ │   Continue with i=4,5,6... (but sums will be too high)│      │
│ └─────────────────────────────────────────────────────────┘      │
│ Back to CALL 1, current.pop() → []                              │
│                                                                  │
│ ┌─ i=2: Pick 2 ─────────────────────────────────────────┐      │
│ │ current = [2], sum = 2                                 │      │
│ │ Recurse: backtrack(3, 2, [2], result)                 │      │
│ │   ↓                                                     │      │
│ │   CALL 4: backtrack(3, 2, [2])                        │      │
│ │   Loop from i=3 to 9                                   │      │
│ │   ┌─ i=3: Pick 3 ───────────────────────────┐        │      │
│ │   │ current = [2,3], sum = 5                 │        │      │
│ │   │ Recurse: backtrack(4, 5, [2,3], result) │        │      │
│ │   │   ↓                                       │        │      │
│ │   │   i=4: [2,3,4] sum=9 ✓                  │        │      │
│ │   │         result = [[1,2,6],[1,3,5],[2,3,4]]      │      │
│ │   │   i=5: [2,3,5] sum=10 > 9, PRUNE!       │        │      │
│ │   └───────────────────────────────────────────┘        │      │
│ │   Continue with i=4,5,6... (sums too high)           │      │
│ └─────────────────────────────────────────────────────────┘      │
│                                                                  │
│ ┌─ i=3 onwards: sums will be >= 12, all pruned ─────────┐      │
│ │ Why? 3+4+5 = 12 > 9                                    │      │
│ └─────────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────────┘

Final Result: [[1,2,6], [1,3,5], [2,3,4]]
Total: 3 valid combinations
```

---

## Edge Cases

```typescript
// 1. Impossible - sum too large
k = 2, n = 100
Output: []
Reason: Max sum with 2 numbers = 8+9 = 17 < 100

// 2. Impossible - sum too small
k = 4, n = 1
Output: []
Reason: Min sum with 4 numbers = 1+2+3+4 = 10 > 1

// 3. Maximum k
k = 9, n = 45
Output: [[1,2,3,4,5,6,7,8,9]]
Reason: Only one way - use all 9 numbers

// 4. Minimum k
k = 1, n = 5
Output: [[5]]
Reason: Single number 5

// 5. No solution
k = 3, n = 100
Output: []
Reason: Max sum with 3 numbers = 7+8+9 = 24 < 100

// 6. Multiple solutions
k = 2, n = 5
Output: [[1,4], [2,3]]
Reason: Two ways to make 5 with 2 numbers
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Forgetting both conditions

```typescript
// WRONG!
if (currentSum === n) {
  result.push([...current]);  // May not have k numbers!
}
```

✅ **Correct:**
```typescript
if (current.length === k && currentSum === n) {
  result.push([...current]);  // Both conditions checked
}
```

### ❌ Mistake 2: Wrong pruning

```typescript
// WRONG!
if (current.length >= k) return;  // Should be >
// This stops exactly at k, missing valid combinations!
```

✅ **Correct:**
```typescript
if (current.length > k) return;  // Only stop when exceeds
// Or check both conditions:
if (current.length === k) {
  if (currentSum === n) result.push([...current]);
  return;
}
```

### ❌ Mistake 3: Starting from 0

```typescript
// WRONG!
for (let i = start; i <= 9; i++) {
  // But start could be 0!
}
```

✅ **Correct:**
```typescript
// Start from 1 initially
backtrack(1, 0, [], result);

// In loop:
for (let i = start; i <= 9; i++) {
  // i starts from 1, goes to 9
}
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Can I use 0?"**
   → No, only 1-9

2. **"Can numbers repeat?"**
   → No, each number at most once

3. **"Does order matter?"**
   → No, [1,2,6] and [6,2,1] are same

4. **"What if k > 9?"**
   → Impossible! Return []

### Approach Explanation

```
"I'll use backtracking with two-condition checking:

1. Track both count and sum
2. Try numbers 1-9 in order
3. Base case: size=k AND sum=n → valid!
4. Pruning: sum>n OR size>k → stop early
5. No duplicates: start from (current+1)

Time: O(C(9,k)) - combinations of 9 choose k
Space: O(k) - recursion depth

The key is pruning early when impossible."
```

### Follow-up Questions

**Q1:** "What if range was 1-100 instead of 1-9?"
**A1:** "Time complexity becomes O(C(100,k)). For large ranges, we'd need better pruning strategies."

**Q2:** "Can you calculate minimum sum for k numbers?"
**A2:** "Yes! Sum = 1+2+...+k = k*(k+1)/2. If target < this, impossible."

**Q3:** "What if we want combinations that sum to AT MOST n?"
**A3:** "Remove exact sum check, just check if sum <= n when size = k."

---

## Summary

**Problem Type**: Backtracking with Two Conditions (Count + Sum)

**Core Pattern**:
```typescript
function backtrack(start, currentSum, current, result) {
  // Both conditions satisfied
  if (current.length === k && currentSum === n) {
    result.push([...current]);
    return;
  }

  // Pruning
  if (current.length > k || currentSum > n) return;

  // Try each number from start to 9
  for (let i = start; i <= 9; i++) {
    current.push(i);
    backtrack(i + 1, currentSum + i, current, result);
    current.pop();
  }
}
```

**Key Differences from Other Combination Sum:**
- Fixed range (1-9) not given array
- Exactly k numbers needed
- Each number used once
- No duplicates in input

**Complexity:**
- Time: O(C(9, k))
- Space: O(k)

**Next Steps**: Ready for solution.ts! 🚀

Solution.ts mein backtracking implement karein?