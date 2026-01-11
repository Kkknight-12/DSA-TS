# Combination Sum

## Problem Statement (Hinglish mein)

**Kya karna hai?**
- Tumhe ek array `candidates` diya gaya hai (distinct integers)
- Ek target sum `target` diya gaya hai
- Find karo **sabhi unique combinations** jo target sum banate hain
- **Important**: Ek hi number ko **unlimited times** use kar sakte ho!
- Combinations ki order matter nahi karti (i.e., [2,2,3] aur [2,3,2] same hain)

**Example:**
```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3], [7]]

Explanation:
- 2 + 2 + 3 = 7 ✓ (2 ko teen baar use kiya!)
- 7 = 7 ✓ (sirf 7 ko ek baar)
- Ye hi do combinations possible hain
```

**Key Points:**
1. Same number ko **unlimited times** pick kar sakte ho
2. Combinations **unique** hone chahiye (no duplicates like [2,3,2] and [2,2,3])
3. Order matter nahi karta (internally hum sorted rakhenge to avoid duplicates)

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Decision explore karo, agar wrong path mila toh wapas aao (undo)
- **Recursion Tree**: Visualize karo kaise decisions branch out hote hain
- **Pick/Skip Pattern**: Har element pe 2 choices - pick ya skip

**Ye problem ke liye specific:**
- **Unlimited Repetition**: Ek element ko baar baar pick karne ki concept
- **Avoiding Duplicates**: Index management se duplicates avoid karna

---

## Intuition (Soch) 🤔

### Ye Problem Subsequence se Kaise Different Hai?

**Previous Problem (Subsequence):**
```
Array: [1, 2, 3], Target: 3
- Har element: Pick ya Skip
- Pick kiya → next index pe jao
- Har element MAX ek baar use
```

**This Problem (Combination Sum):**
```
Array: [2, 3, 5], Target: 8
- Har element: Pick (UNLIMITED) ya Skip
- Pick kiya → SAME index pe raho (phir se pick kar sakte ho!)
- Skip kiya → next index pe jao (ab ye element kabhi nahi milega)
```

### Decision Tree Example

```
candidates = [2, 3], target = 5

                        start(0, sum=0, [])
                        /                \
                   Pick 2                Skip 2
                  (stay at 0)          (move to 1)
                     /                      \
            (0, sum=2, [2])           (1, sum=0, [])
              /         \                /        \
          Pick 2      Skip 2         Pick 3     Skip 3
        (stay 0)    (move 1)       (stay 1)   (move 2)
           /            \             /           \
    (0,sum=4,[2,2])  (1,sum=2,[2])  (1,sum=3,[3])  END
       /      \         /      \       /      \
   Pick 2  Skip 2  Pick 3  Skip 3  Pick 3  Skip 3
     /         \      /       \       /        \
  (0,6,[2,2,2]) ...  (1,5,[2,3]) ... (1,6,[3,3]) ...
   (sum>5)           ✓ FOUND!        (sum>5)

Result: [[2,3]] (order: [2,2,2,2] sum=8 nahi hai, [2,3] sum=5 hai ✓)
```

### Key Insight 💡

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  PICK decision:   index SAME rehta hai                         │
│                   → Element ko dobara pick kar sakte ho        │
│                                                                 │
│  SKIP decision:   index AAGE badh jata hai                     │
│                   → Is element ko ab kabhi pick nahi karenge   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Why No Duplicates?**
- Hum hamesha **left to right** process karte hain
- Agar element skip kar diya, toh wapas nahi jate
- Example: [2,3] process karte waqt, agar 2 skip kiya, toh [3,2] kabhi nahi banega
- Isliye [2,2,3] aur [2,3,2] mein se sirf [2,2,3] hi generate hoga

---

## Approach: Backtracking with Unlimited Repetition

### Algorithm (Step by Step)

```
Function combinationSum(candidates, target):
  1. result = [] (sabhi valid combinations store karne ke liye)
  2. current = [] (current combination track karne ke liye)
  3. Start recursion: backtrack(0, 0, current, result)
  4. Return result

Function backtrack(index, currentSum, current, result):
  BASE CASES:

  1. If currentSum == target:
     → Valid combination mil gaya! ✓
     → current ko result mein add karo (COPY banana zaroori!)
     → return

  2. If currentSum > target:
     → Sum exceed ho gaya, ye path invalid
     → return (prune this branch)

  3. If index == candidates.length:
     → Saare elements process ho gaye, kuch nahi mila
     → return

  RECURSIVE CASES:

  Choice 1: PICK current element
    → current mein add karo: candidates[index]
    → Recurse: backtrack(index, currentSum + candidates[index], current, result)
                            ↑
                         SAME index! (unlimited repetition)
    → Backtrack: current se remove karo (pop)

  Choice 2: SKIP current element
    → Recurse: backtrack(index + 1, currentSum, current, result)
                            ↑
                         NEXT index! (ab ye element nahi lenge)
```

### Visual Example (Detailed)

```
candidates = [2, 3, 6, 7], target = 7

                    backtrack(0, 0, [])
                    /                  \
              Pick 2                    Skip 2
           (index=0)                  (index=1)
                /                          \
        (0, 2, [2])                    (1, 0, [])
          /      \                      /      \
      Pick 2   Skip 2              Pick 3    Skip 3
      (i=0)    (i=1)              (i=1)      (i=2)
        /         \                 /           \
  (0,4,[2,2])  (1,2,[2])      (1,3,[3])     (2,0,[])
    /    \       /    \         /    \         /    \
Pick 2  Skip  Pick 3  Skip   Pick 3  Skip   Pick 6  Skip 6
  ...    ...    ...    ...     ...    ...     ...    ...

                (1,5,[2,3])
                  /      \
              Pick 3    Skip 3
              (i=1)     (i=2)
                /          \
          (1,8,[2,3,3])  (2,5,[2,3])
           (sum>7)         /      \
            ❌         Pick 6    Skip 6
                      (i=2)      (i=3)
                        /           \
                  (2,11,[2,3,6])  (3,5,[2,3])
                    (sum>7)         /      \
                     ❌         Pick 7    END
                               (i=3)    (no more)
                                 /         \
                           (3,12,[2,3,7])  ...
                            (sum>7)
                             ❌

Similar branches will find:
- [2,2,3] with sum=7 ✓
- [7] with sum=7 ✓

Result: [[2,2,3], [7]]
```

---

## Complexity Analysis

### Time Complexity: **O(2^t)** where t = target/min(candidates)

**Why?**
- Worst case: Sabse chhota element repeatedly pick karte hain
- Example: candidates=[1], target=10
  - Depth of tree = 10 (har level pe 1 add hota hai)
  - Har node pe 2 choices (pick ya skip)
  - Total combinations ≈ 2^10

**In simple terms:**
```
Agar target bada hai aur candidates chhote hain,
toh bahut saare combinations possible hain.

Example:
- candidates=[2], target=100
- Depth ≈ 50 (100/2)
- Combinations ≈ 2^50 (exponential!)
```

**Note**: Problem statement guarantees < 150 unique combinations

### Space Complexity: **O(target/min)**

**Why?**
1. **Recursion Stack**: O(target/min)
   - Maximum depth = target / smallest_element
   - Example: target=40, min=2 → depth=20

2. **Current Array**: O(target/min)
   - Stores current combination
   - Maximum elements = target / smallest_element

3. **Result Array**: O(number of combinations × average combination size)
   - But this is for output, not auxiliary space

**In simple terms:**
```
Recursion kitna deep jayega?
→ Jab tak sum = target nahi ho jata
→ Worst case: smallest element ko repeatedly pick karo
→ Depth = target / min_element
```

---

## Dry Run Example

**Input:** `candidates = [2, 3, 5], target = 8`

```
Initial Call: combinationSum([2,3,5], 8)
  result = []
  current = []
  backtrack(0, 0, [], result)

┌──────────────────────────────────────────────────────────────────┐
│ CALL 1: backtrack(0, 0, [], result)                            │
├──────────────────────────────────────────────────────────────────┤
│ index=0 (element=2), sum=0, target=8, current=[]               │
│ Base checks: sum==target? NO, sum>target? NO, index>=n? NO     │
│                                                                  │
│ CHOICE 1: Pick 2                                               │
│   current.push(2) → current = [2]                              │
│   backtrack(0, 2, [2], result) ─────────────────┐              │
│                                                   ↓              │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ CALL 2: backtrack(0, 2, [2], result)                   │  │
│   │ index=0, sum=2, target=8, current=[2]                  │  │
│   │ Base checks: sum==8? NO, sum>8? NO, index>=3? NO       │  │
│   │                                                          │  │
│   │ CHOICE 1: Pick 2 (again!)                              │  │
│   │   current.push(2) → current = [2,2]                    │  │
│   │   backtrack(0, 4, [2,2], result) ───────────┐          │  │
│   │                                               ↓          │  │
│   │   ┌─────────────────────────────────────────────────┐  │  │
│   │   │ CALL 3: backtrack(0, 4, [2,2], result)        │  │  │
│   │   │ sum=4, current=[2,2]                          │  │  │
│   │   │                                                │  │  │
│   │   │ CHOICE 1: Pick 2                             │  │  │
│   │   │   backtrack(0, 6, [2,2,2], result)           │  │  │
│   │   │     CHOICE 1: Pick 2                         │  │  │
│   │   │       backtrack(0, 8, [2,2,2,2], result)     │  │  │
│   │   │       sum==target! ✓✓✓                       │  │  │
│   │   │       result.push([2,2,2,2])                 │  │  │
│   │   │       return                                  │  │  │
│   │   │     Backtrack: current.pop() → [2,2,2]       │  │  │
│   │   │                                                │  │  │
│   │   │     CHOICE 2: Skip 2                         │  │  │
│   │   │       backtrack(1, 6, [2,2,2], result)       │  │  │
│   │   │         Pick 3: sum=9 > 8 ❌ return          │  │  │
│   │   │         Skip 3: Pick 5: sum=11 > 8 ❌        │  │  │
│   │   │       return                                  │  │  │
│   │   │                                                │  │  │
│   │   │   Backtrack: current.pop() → [2,2]           │  │  │
│   │   │                                                │  │  │
│   │   │ CHOICE 2: Skip 2 (move to index 1)           │  │  │
│   │   │   backtrack(1, 4, [2,2], result)             │  │  │
│   │   │     CHOICE 1: Pick 3                         │  │  │
│   │   │       backtrack(1, 7, [2,2,3], result)       │  │  │
│   │   │         Pick 3: sum=10 > 8 ❌                │  │  │
│   │   │         Skip 3:                               │  │  │
│   │   │           backtrack(2, 7, [2,2,3], result)   │  │  │
│   │   │             Pick 5: sum=12 > 8 ❌            │  │  │
│   │   │             Skip 5: index=3, return           │  │  │
│   │   │       return                                  │  │  │
│   │   │     Backtrack: current.pop() → [2,2]         │  │  │
│   │   │                                                │  │  │
│   │   │     CHOICE 2: Skip 3                         │  │  │
│   │   │       backtrack(2, 4, [2,2], result)         │  │  │
│   │   │         (explores [2,2,5] paths...)          │  │  │
│   │   └─────────────────────────────────────────────────┘  │  │
│   │                                                          │  │
│   │   Backtrack: current.pop() → [2]                        │  │
│   │                                                          │  │
│   │ CHOICE 2: Skip 2 (move to index 1)                     │  │
│   │   backtrack(1, 2, [2], result)                         │  │
│   │     CHOICE 1: Pick 3                                   │  │
│   │       backtrack(1, 5, [2,3], result)                   │  │
│   │         Pick 3: backtrack(1, 8, [2,3,3], result)       │  │
│   │                 sum==target! ✓✓✓                       │  │
│   │                 result.push([2,3,3])                   │  │
│   │         (continues...)                                  │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│   Backtrack: current.pop() → []                                │
│                                                                  │
│ CHOICE 2: Skip 2 (move to index 1)                             │
│   backtrack(1, 0, [], result)                                  │
│     (explores paths starting with 3 and 5...)                  │
│     Will find: [3,5] with sum=8 ✓                             │
└──────────────────────────────────────────────────────────────────┘

Final Result: [[2,2,2,2], [2,3,3], [3,5]]
```

**Summary of Paths:**
- Path 1: Pick 2 → Pick 2 → Pick 2 → Pick 2 = [2,2,2,2] sum=8 ✓
- Path 2: Pick 2 → Pick 2 → Skip 2 → Pick 3 → Pick 3 = [2,3,3] sum=8 ✓
- Path 3: Skip 2 → Pick 3 → Skip 3 → Pick 5 = [3,5] sum=8 ✓

---

## Edge Cases

```typescript
// 1. Single element, exact match
candidates = [7], target = 7
Output: [[7]]

// 2. Single element, multiple times needed
candidates = [2], target = 8
Output: [[2,2,2,2]]

// 3. No solution possible
candidates = [2], target = 1
Output: []

// 4. Target = 0 (edge case)
candidates = [1], target = 0
Output: [[]] // Empty combination

// 5. Multiple elements, only one works
candidates = [2,3,6,7], target = 7
Output: [[2,2,3], [7]]

// 6. Large target with small candidates
candidates = [2,3,5], target = 8
Output: [[2,2,2,2], [2,3,3], [3,5]]
```

---

## Key Differences: Previous Problems vs This Problem

```
┌──────────────────────────────────────────────────────────────────────┐
│                    COMPARISON TABLE                                  │
├─────────────────────┬────────────────────────┬──────────────────────┤
│ Feature             │ Subsequence Sum K      │ Combination Sum      │
├─────────────────────┼────────────────────────┼──────────────────────┤
│ Repetition          │ NO (each element once) │ YES (unlimited)      │
│ Index after Pick    │ index + 1              │ SAME index           │
│ Index after Skip    │ index + 1              │ index + 1            │
│ Return Type         │ boolean/count          │ array of arrays      │
│ Backtracking needed?│ YES (for generation)   │ YES (mandatory)      │
│ Array modification  │ push + pop             │ push + pop           │
│ Example             │ [1,2,3], k=3 → [1,2]   │ [2,3], t=8 → [2,2,.. │
│                     │ (each max once)        │ (2 multiple times)   │
└─────────────────────┴────────────────────────┴──────────────────────┘
```

---

## Interview Tips 💡

### Pehle Baat Karo (Before Coding)

Interviewer se ye clarify karo:
1. **"Can I use the same element multiple times?"**
   → Haan! Unlimited repetition allowed hai

2. **"Should the output be in any specific order?"**
   → Nahi, any order mein return kar sakte ho

3. **"Can candidates have duplicates?"**
   → Nahi, problem says "distinct integers"

4. **"What if no solution exists?"**
   → Empty array return karo

### Approach Explain Karo

```
"I'll use backtracking with two key decisions:

1. PICK: Include current element and stay at same index
   → This allows unlimited repetition

2. SKIP: Move to next index without including current element
   → This ensures we don't revisit this element later

This way, we explore all combinations without duplicates,
because we always process left to right and never go back."
```

### Common Mistakes (Galtiyan)

❌ **Mistake 1**: Pick karne ke baad index + 1 kar dena
```typescript
// WRONG!
backtrack(index + 1, sum + candidates[index], current)
// Problem: Element sirf ek baar pick hoga, unlimited nahi
```

✅ **Correct**:
```typescript
backtrack(index, sum + candidates[index], current)
// Element dobara pick kar sakte hain
```

❌ **Mistake 2**: Backtrack karna bhool jana
```typescript
// WRONG!
current.push(candidates[index]);
backtrack(...);
// current.pop() missing!
```

✅ **Correct**:
```typescript
current.push(candidates[index]);
backtrack(...);
current.pop(); // BACKTRACK!
```

❌ **Mistake 3**: Array ka reference copy karna instead of values
```typescript
// WRONG!
result.push(current); // Reference copy! ❌
```

✅ **Correct**:
```typescript
result.push([...current]); // Value copy! ✓
```

### Follow-up Questions

**Q1:** "What if candidates can have duplicates?"
**A1:** "We'd need to sort first and skip duplicate elements to avoid duplicate combinations. Example: [1,1,2] ke liye skip logic add karna padega."

**Q2:** "Can we optimize space?"
**A2:** "Recursion stack depth is O(target/min), which can't be avoided for backtracking. But we can avoid storing intermediate combinations if we only need count."

**Q3:** "What if we can use each element only once?"
**A3:** "Then it becomes the standard subset sum problem - after picking, we'd move to index+1, not stay at same index."

### Bonus Points Mention Karo 🌟

1. **"We can add pruning"**
   ```typescript
   if (currentSum > target) return; // No point continuing
   ```

2. **"We can sort candidates first"**
   ```typescript
   // Smaller elements pehle try karenge
   // Larger elements se jaldi prune ho jayega
   ```

3. **"Time complexity is bounded by problem constraint"**
   ```typescript
   // Problem guarantees < 150 combinations
   // So practical performance is good
   ```

---

## Summary

**Problem Type**: Backtracking with Unlimited Repetition

**Core Pattern**:
```typescript
Pick: backtrack(SAME_INDEX, sum + element, [...current, element])
Skip: backtrack(NEXT_INDEX, sum, current)
```

**Key Insight**: Index management se duplicates avoid karte hain aur unlimited repetition allow karte hain

**Complexity**:
- Time: O(2^t) where t = target/min
- Space: O(target/min) for recursion depth

**Next Steps**: Ready for implementation! 🚀

Ab bataiye, solution.ts dekhna chahoge? 😊