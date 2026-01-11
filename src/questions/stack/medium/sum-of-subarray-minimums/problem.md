# 907. Sum of Subarray Minimums

**Difficulty:** Medium
**Topics:** Stack, Monotonic Stack, Array, Dynamic Programming
**LeetCode Link:** [907. Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/)


[visualizer](http://gemini.google.com/app/83115fb503bc83d5)

---

## Problem Statement (Simple Language Mein)

Tumhe ek integer array `arr` diya gaya hai. Tumhe **har possible contiguous subarray ka minimum** nikalna hai, aur phir sabhi minimums ko add karke return karna hai.

**Dhyan do:** Answer bahut bada ho sakta hai, isliye answer ko `modulo 10^9 + 7` return karo.

### Example 1:
```
Input: arr = [3,1,2,4]
Output: 17

Explanation:
All Subarrays aur unke minimums:
[3]           → min = 3
[1]           → min = 1
[2]           → min = 4
[4]           → min = 4
[3,1]         → min = 1
[1,2]         → min = 1
[2,4]         → min = 2
[3,1,2]       → min = 1
[1,2,4]       → min = 1
[3,1,2,4]     → min = 1

Sum = 3+1+2+4+1+1+2+1+1+1 = 17
```

### Example 2:
```
Input: arr = [11,81,94,43,3]
Output: 444
```

### Constraints:
- `1 <= arr.length <= 3 * 10^4`
- `1 <= arr[i] <= 3 * 10^4`

---

## Prerequisites (Agar Koi Chahiye)

This problem doesn't require any advanced prerequisites for brute force approaches, but the optimal solution builds on:
- **Monotonic Stack** (covered in Next Greater Element problem)
- **Contribution Technique** (counting how many times an element contributes to answer)

---

## Approach 1: Brute Force (Generate All Subarrays)

### Prerequisites (Agar Koi Chahiye):
None - Simple nested loops

### Intuition (Soch):

**Simple idea:** Literally do what the problem says!
1. Generate har possible subarray
2. Har subarray ka minimum find karo
3. Sabhi minimums ko add karo

**Kaise?**
- Pehle loop: Starting index (i)
- Dusra loop: Ending index (j)
- Tisra loop: i se j tak traverse karke minimum find karo

**Example:** `arr = [3,1,2,4]`
```
i=0: [3], [3,1], [3,1,2], [3,1,2,4]
i=1: [1], [1,2], [1,2,4]
i=2: [2], [2,4]
i=3: [4]
```

### Algorithm Steps:
1. Initialize `sum = 0`
2. For each starting index `i` (0 to n-1):
   - For each ending index `j` (i to n-1):
     - Find minimum from `arr[i]` to `arr[j]`
     - Add minimum to sum
3. Return `sum % (10^9 + 7)`

### Complexity Analysis:

**Time Complexity:** O(n³)
- Outer loop: O(n)
- Middle loop: O(n)
- Inner loop to find minimum: O(n)
- Total: O(n × n × n) = O(n³)

**Agar 30,000 elements hain:** ~27 trillion operations 💀 (TLE guaranteed!)

**Space Complexity:** O(1)
- Koi extra data structure nahi use kar rahe

### Drawback:
❌ **Too slow!** For n=30,000, this will get Time Limit Exceeded (TLE)

---

## Approach 2: Better (Optimized Brute Force - Track Minimum While Expanding)

### Prerequisites (Agar Koi Chahiye):
None - Simple optimization

### Intuition (Soch):

**Key Insight:** Agar hum already `arr[i..j]` ka minimum jaante hain, toh `arr[i..j+1]` ka minimum kya hoga?

```
min(arr[i..j+1]) = min(min(arr[i..j]), arr[j+1])
```

Yani har baar subarray expand karte waqt, hume pura traverse nahi karna padega!

**Example:** `arr = [3,1,2,4]`
```
Starting from i=0:
  j=0: [3]         → min = 3
  j=1: [3,1]       → min = min(3, 1) = 1
  j=2: [3,1,2]     → min = min(1, 2) = 1
  j=3: [3,1,2,4]   → min = min(1, 4) = 1

Starting from i=1:
  j=1: [1]         → min = 1
  j=2: [1,2]       → min = min(1, 2) = 1
  j=3: [1,2,4]     → min = min(1, 4) = 1
```

**Benefit:** Inner loop eliminate ho gaya! Minimum track karte jao jaise jaise expand karte ho.

### Algorithm Steps:
1. Initialize `sum = 0`
2. For each starting index `i` (0 to n-1):
   - Initialize `currentMin = arr[i]`
   - For each ending index `j` (i to n-1):
     - Update `currentMin = min(currentMin, arr[j])`
     - Add `currentMin` to sum
3. Return `sum % (10^9 + 7)`

### Complexity Analysis:

**Time Complexity:** O(n²)
- Outer loop: O(n)
- Inner loop: O(n)
- No extra loop for finding minimum!
- Total: O(n × n) = O(n²)

**Agar 30,000 elements hain:** ~900 million operations (Still might TLE for strict time limits)

**Space Complexity:** O(1)
- Bas ek `currentMin` variable use kar rahe

### Improvement:
✅ Much better than brute force!
❌ But still not optimal enough for n=30,000

---

## Approach 3: Optimal (Monotonic Stack - Contribution Technique)

### Prerequisites (Agar Koi Chahiye):

**Required Concepts:**

1. **Monotonic Stack** (from Next Greater Element problem)
   - Stack maintaining increasing/decreasing order
   - Used to find previous/next smaller elements

2. **Contribution Technique** (NEW CONCEPT!)
   - Instead of iterating all subarrays, think: "How many subarrays does each element contribute to as minimum?"
   - For each element, count its contribution separately
   - Total sum = Sum of (element × count of subarrays where it's minimum)

3. **Previous Less Element (PLE) & Next Less Element (NLE)**
   - PLE: Closest element to the left that is smaller
   - NLE: Closest element to the right that is smaller
   - These define the "range" where current element is minimum

### Intuition (Soch):

**Game-Changing Insight! 🚀**

Instead of thinking "Let me generate all subarrays and find minimums", think:

**"For each element arr[i], in HOW MANY subarrays is it the minimum?"**

If we know this count, then:
```
Contribution of arr[i] = arr[i] × (count of subarrays where arr[i] is minimum)
Total answer = Sum of all contributions
```

**Question:** Kaise pata karein ki arr[i] kitne subarrays mein minimum hai?

**Answer:** Find the **range** where arr[i] is the smallest!

### Visual Understanding:

```
arr = [3, 1, 2, 4]
       0  1  2  3

Let's analyze element arr[1] = 1:

     PLE        element        NLE
      ↓            ↓            ↓
    (none)        [1]         (none)

Kyunki left mein koi smaller nahi, aur right mein bhi koi smaller nahi,
toh element 1 is minimum in ENTIRE RANGE!

Left boundary:  -1 (no PLE, so start from beginning)
Right boundary:  4 (no NLE, so go till end)

How many subarrays can we form where arr[1]=1 is included and is minimum?

Left choices:  Can start from index 0 or 1  → 2 choices
Right choices: Can end at index 1, 2, or 3  → 3 choices

Total subarrays = left choices × right choices = 2 × 3 = 6

Verify:
[1], [1,2], [1,2,4], [3,1], [3,1,2], [3,1,2,4] ✓ (6 subarrays!)

Contribution of arr[1] = 1 × 6 = 6
```

### Formula:

For element at index `i`:
```
leftCount  = i - index_of_PLE
rightCount = index_of_NLE - i

Total subarrays where arr[i] is minimum = leftCount × rightCount
Contribution = arr[i] × leftCount × rightCount
```

**Edge cases:**
- If no PLE exists → leftCount = i - (-1) = i + 1
- If no NLE exists → rightCount = n - i

### Visual Example - Complete Walkthrough:

```
arr = [3, 1, 2, 4]
       0  1  2  3

Step 1: Find PLE (Previous Less Element) for each element
Use monotonic INCREASING stack (left to right)

Element 3 (i=0): No smaller element to left → PLE = -1
Element 1 (i=1): No smaller element to left → PLE = -1
Element 2 (i=2): Smaller element 1 at index 1 → PLE = 1
Element 4 (i=3): Smaller element 2 at index 2 → PLE = 2

PLE = [-1, -1, 1, 2]

Step 2: Find NLE (Next Less Element) for each element
Use monotonic INCREASING stack (right to left)

Element 4 (i=3): No smaller element to right → NLE = 4
Element 2 (i=2): No smaller element to right → NLE = 4
Element 1 (i=1): No smaller element to right → NLE = 4
Element 3 (i=0): Smaller element 1 at index 1 → NLE = 1

NLE = [1, 4, 4, 4]

Step 3: Calculate contributions

i=0, arr[0]=3:
  leftCount  = 0 - (-1) = 1  (can start from index 0)
  rightCount = 1 - 0    = 1  (can end at index 0)
  subarrays  = 1 × 1 = 1     → [3]
  contribution = 3 × 1 = 3

i=1, arr[1]=1:
  leftCount  = 1 - (-1) = 2  (can start from index 0, 1)
  rightCount = 4 - 1    = 3  (can end at index 1, 2, 3)
  subarrays  = 2 × 3 = 6     → [1], [1,2], [1,2,4], [3,1], [3,1,2], [3,1,2,4]
  contribution = 1 × 6 = 6

i=2, arr[2]=2:
  leftCount  = 2 - 1 = 1     (can start from index 2)
  rightCount = 4 - 2 = 2     (can end at index 2, 3)
  subarrays  = 1 × 2 = 2     → [2], [2,4]
  contribution = 2 × 2 = 4

i=3, arr[3]=4:
  leftCount  = 3 - 2 = 1     (can start from index 3)
  rightCount = 4 - 3 = 1     (can end at index 3)
  subarrays  = 1 × 1 = 1     → [4]
  contribution = 4 × 1 = 4

Total = 3 + 6 + 4 + 4 = 17 ✓
```

### Critical Concept: Understanding PLE/NLE Boundaries

**Common Doubt:** Why do we use `-1` for no PLE and `n` for no NLE?

**Answer:** PLE and NLE are **BOUNDARIES (walls)**, not starting/ending points!

---

#### Doubt 1: When no PLE/NLE exists, why use -1 and n?

```
arr = [5, 4, 3, 2, 1]   length n = 5
       0  1  2  3  4    last valid index = 4

For arr[4] = 1:
  NLE = 5 (NOT a valid index! It's a SENTINEL value = n)

  rightCount = NLE - i = 5 - 4 = 1

  This correctly gives us: only 1 ending position (index 4 itself)
```

**Why use n (not n-1)?**
- `n` is a dummy boundary that means "no wall on right side"
- The formula `rightCount = NLE - i` needs this to give correct COUNT
- Similarly, `-1` for no PLE means "no wall on left side"

```
Valid indices:    0  1  2  3  4
                  ↑              ↑
PLE boundary:    -1              NLE boundary: 5 (n)
(before start)                   (after end)
```

---

#### Doubt 2: Why don't we START from PLE index?

**Key Insight:** PLE is a **WALL/BOUNDARY**, not a starting point!

```
arr = [3, 1, 5, 4, 2, 4]
       0  1  2  3  4  5

For arr[4] = 2:
  Looking left: 4 > 2, 5 > 2, 1 < 2 → PLE found at index 1!
  Looking right: 4 > 2, no smaller → NLE = 6 (n)

  PLE is at index 1 (value = 1)

  Question: Can we include index 1 (the PLE) in our subarray?

  Let's try subarrays that CROSS the PLE:
    [1, 5, 4, 2]        → min = 1 (NOT 2!) ❌
    [1, 5, 4, 2, 4]     → min = 1 (NOT 2!) ❌
    [3, 1, 5, 4, 2]     → min = 1 (NOT 2!) ❌
    [3, 1, 5, 4, 2, 4]  → min = 1 (NOT 2!) ❌

  The element at PLE (value 1) is SMALLER than our element (value 2)!
  If we include PLE in subarray, PLE becomes the minimum, not our element!

  But what about elements BETWEEN PLE and our element?

  Elements at indices 2, 3 (values 5, 4) are LARGER than 2!
  We CAN include them - they won't steal the minimum!

    [5, 4, 2]     → min = 2 ✓ (5 and 4 are larger, 2 is still minimum)
    [5, 4, 2, 4]  → min = 2 ✓
    [4, 2]        → min = 2 ✓
    [4, 2, 4]     → min = 2 ✓
    [2]           → min = 2 ✓
    [2, 4]        → min = 2 ✓

  Therefore: We can start from any index AFTER PLE (indices 2, 3, or 4)

  leftCount = i - PLE = 4 - 1 = 3 (can start from index 2, 3, or 4)
  rightCount = NLE - i = 6 - 4 = 2 (can end at index 4 or 5)

  Total subarrays = 3 × 2 = 6 ✓
```

**Visual - Think of PLE as a WALL:**

```
arr = [3, 1, 5, 4, 2, 4]
       0  1  2  3  4  5
          ↑
         WALL (PLE for element at index 4)

       ←─── FORBIDDEN ───→←── ALLOWED ──→

"I am smaller than you!
 If you cross me (include me in subarray),
 I become the minimum, not you!

 But elements after me (5, 4) are larger than you,
 so you can include them - you'll still be the minimum!"

Valid starting positions: index 2, 3, or 4 (all AFTER the wall)
Invalid: index 0 or 1 (would cross the wall)
```

**Key Realization:**
- Elements BETWEEN PLE and current element are all **LARGER** than current element
- (Otherwise one of them would have been the PLE!)
- So we can safely include them in the subarray

---

#### Why the formula works:

```
PLE[i] = index of EXCLUSIVE left boundary (wall)
NLE[i] = index of EXCLUSIVE right boundary (wall)

leftCount = i - PLE[i]
          = positions AFTER the wall, up to and including i

rightCount = NLE[i] - i
           = positions from i up to BEFORE the wall
```

**Example:**

```
arr = [3, 1, 2, 4]
       0  1  2  3

For arr[1] = 1:
  PLE = -1 (no wall on left)
  NLE = 4  (no wall on right, use n)

  leftCount = 1 - (-1) = 2
    Valid starting indices: 0, 1 (2 positions)

  rightCount = 4 - 1 = 3
    Valid ending indices: 1, 2, 3 (3 positions)

  Total subarrays = 2 × 3 = 6

  Verify:
  Start=0, End=1: [3,1]       min=1 ✓
  Start=0, End=2: [3,1,2]     min=1 ✓
  Start=0, End=3: [3,1,2,4]   min=1 ✓
  Start=1, End=1: [1]         min=1 ✓
  Start=1, End=2: [1,2]       min=1 ✓
  Start=1, End=3: [1,2,4]     min=1 ✓

  6 subarrays! ✓
```

---

#### Summary Table:

| Scenario | Value | Meaning |
|----------|-------|---------|
| **No PLE** | -1 | No wall on left → can start from index 0 |
| **PLE exists** | actual index | Wall at this index → start AFTER it |
| **No NLE** | n (array length) | No wall on right → can end at index n-1 |
| **NLE exists** | actual index | Wall at this index → end BEFORE it |

**Remember:** PLE and NLE are **EXCLUSIVE boundaries**. We count positions BETWEEN them, not including them!

---

### Important Edge Case - Duplicates:

**Problem:** Agar duplicate values hain toh kya hoga?

```
arr = [2, 2]
       0  1

Agar dono elements apne aap ko minimum consider karein:
Element at i=0: Claims [2], [2,2] → contribution = 2×2 = 4
Element at i=1: Claims [2], [2,2] → contribution = 2×2 = 4
Total = 8 ❌ (WRONG!)

Correct answer:
[2]    → min = 2
[2]    → min = 2
[2,2]  → min = 2
Total = 2+2+2 = 6 ✓
```

**Solution:** Use `<=` for PLE and `<` for NLE (or vice versa) to avoid double counting!

When values are equal:
- For PLE: Use `<` (strictly less than)
- For NLE: Use `<=` (less than or equal)

This ensures only one of the equal elements claims the subarray.

### Algorithm Steps:

1. **Find PLE (Previous Less Element) for each index:**
   - Use monotonic increasing stack
   - Traverse left to right
   - Pop elements >= current (strictly less for PLE)
   - If stack empty → PLE = -1, else PLE = stack.top()

2. **Find NLE (Next Less Element) for each index:**
   - Use monotonic increasing stack
   - Traverse right to left
   - Pop elements > current (less than or equal for NLE)
   - If stack empty → NLE = n, else NLE = stack.top()

3. **Calculate contribution for each element:**
   ```
   leftCount = i - PLE[i]
   rightCount = NLE[i] - i
   contribution = arr[i] × leftCount × rightCount
   ```

4. **Sum all contributions and return modulo 10^9 + 7**

### Complexity Analysis:

**Time Complexity:** O(n)
- Finding PLE: O(n) - each element pushed/popped at most once
- Finding NLE: O(n) - each element pushed/popped at most once
- Calculating contributions: O(n)
- Total: O(n)

**Agar 30,000 elements hain:** ~30,000 operations! 🚀 (Super fast!)

**Space Complexity:** O(n)
- Stack: O(n) worst case
- PLE array: O(n)
- NLE array: O(n)
- Total: O(n)

---

## Comparison Table

| Approach | Time Complexity | Space Complexity | Prerequisites | Passes All Tests? |
|----------|----------------|------------------|---------------|-------------------|
| **Brute Force** | O(n³) | O(1) | None | ❌ TLE for large inputs |
| **Better (Track Min)** | O(n²) | O(1) | None | ⚠️ Might TLE |
| **Optimal (Monotonic Stack)** | O(n) | O(n) | Monotonic Stack, Contribution Technique | ✅ Yes |

---

## Which Solution Should I Code?

- **Learning phase?** → Start with Approach 2 (Better) to understand optimization
- **Interview?** → **Approach 3 (Optimal)** is expected for Medium problems
- **Want to understand contribution technique?** → **Approach 3** is a must-learn pattern!

**Recommendation:** Go straight to **Approach 3** since you already know Monotonic Stack from NGE problem! This teaches a powerful new pattern: **Contribution Technique**.

---

## Key Patterns to Remember:

1. **When you see "sum of all subarrays"** → Think Contribution Technique!
2. **When you need "closest smaller element"** → Think Monotonic Stack!
3. **PLE + NLE defines the range** where an element is minimum
4. **Handle duplicates carefully** using `<` vs `<=`

---

## Related Problems:

After mastering this, you can solve:
- **496. Next Greater Element I** ✓ (Already done!)
- **503. Next Greater Element II** (Circular array)
- **84. Largest Rectangle in Histogram** (Uses PLE + NLE)
- **85. Maximal Rectangle** (2D version)
- **1856. Maximum Subarray Min-Product** (Similar contribution technique)

---

# ✅ SOLUTION - Approach 3: Optimal (Monotonic Stack + Contribution Technique)

## Complete Code Walkthrough

### Step 1: Find Previous Less Element (PLE)

```typescript
function findPreviousLessElement(arr: number[]): number[] {
    const n = arr.length;
    const ple: number[] = new Array(n);
    const stack: number[] = []; // Stores INDICES

    for (let i = 0; i < n; i++) {
        // Pop elements >= current (STRICTLY LESS for PLE)
        // WHY: Handles duplicates - avoids double counting
        while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
            stack.pop();
        }

        // If stack empty, no previous less element exists
        ple[i] = stack.length === 0 ? -1 : stack[stack.length - 1];

        // Push current index (might be PLE for future elements)
        stack.push(i);
    }

    return ple;
}
```

**Key Points:**
- Traverse **LEFT to RIGHT** (looking for "previous" elements)
- Use **STRICTLY LESS** (`>=` in pop condition) to avoid double counting duplicates
- Stack maintains **monotonic increasing order** by values
- If stack empty → PLE = -1 (no smaller element to left)

### Step 2: Find Next Less Element (NLE)

```typescript
function findNextLessElement(arr: number[]): number[] {
    const n = arr.length;
    const nle: number[] = new Array(n);
    const stack: number[] = []; // Stores INDICES

    for (let i = n - 1; i >= 0; i--) {
        // Pop elements > current (LESS THAN OR EQUAL for NLE)
        // WHY: Different from PLE - ensures only one element claims duplicates
        while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
            stack.pop();
        }

        // If stack empty, no next less element exists
        nle[i] = stack.length === 0 ? n : stack[stack.length - 1];

        // Push current index (might be NLE for future elements)
        stack.push(i);
    }

    return nle;
}
```

**Key Points:**
- Traverse **RIGHT to LEFT** (looking for "next" elements)
- Use **LESS THAN OR EQUAL** (`>` in pop condition, not `>=`)
- This is CRITICAL: Combined with PLE's strictly less, ensures no double counting
- If stack empty → NLE = n (no smaller element to right)

### Step 3: Calculate Contributions

```typescript
export function sumSubarrayMins(arr: number[]): number {
    const MOD = 1_000_000_007;
    const n = arr.length;

    const ple = findPreviousLessElement(arr);
    const nle = findNextLessElement(arr);

    let totalSum = 0;

    for (let i = 0; i < n; i++) {
        const leftCount = i - ple[i];      // How many starting positions
        const rightCount = nle[i] - i;     // How many ending positions
        const subarrayCount = leftCount * rightCount;

        const contribution = (arr[i] * subarrayCount) % MOD;
        totalSum = (totalSum + contribution) % MOD;
    }

    return totalSum;
}
```

**Formula Breakdown:**
```
leftCount  = i - PLE[i]           ← Positions where subarray can START
rightCount = NLE[i] - i           ← Positions where subarray can END
subarrayCount = leftCount × rightCount
contribution = arr[i] × subarrayCount
```

---

## Dry Run Example

**Input:** `arr = [3, 1, 2, 4]`

### Phase 1: Find PLE

| i | arr[i] | Stack Before | Pop? | PLE[i] | Stack After |
|---|--------|--------------|------|--------|-------------|
| 0 | 3 | [] | - | -1 | [0] |
| 1 | 1 | [0] (val 3) | Yes, pop 0 | -1 | [1] |
| 2 | 2 | [1] (val 1) | No | 1 | [1,2] |
| 3 | 4 | [1,2] (val 1,2) | No | 2 | [1,2,3] |

**Result:** `PLE = [-1, -1, 1, 2]`

### Phase 2: Find NLE

| i | arr[i] | Stack Before | Pop? | NLE[i] | Stack After |
|---|--------|--------------|------|--------|-------------|
| 3 | 4 | [] | - | 4 | [3] |
| 2 | 2 | [3] (val 4) | Yes, pop 3 | 4 | [2] |
| 1 | 1 | [2] (val 2) | Yes, pop 2 | 4 | [1] |
| 0 | 3 | [1] (val 1) | No | 1 | [1,0] |

**Result:** `NLE = [1, 4, 4, 4]`

### Phase 3: Calculate Contributions

| i | arr[i] | PLE | NLE | leftCount | rightCount | subarrays | contribution |
|---|--------|-----|-----|-----------|------------|-----------|--------------|
| 0 | 3 | -1 | 1 | 0-(-1)=1 | 1-0=1 | 1×1=1 | 3×1=**3** |
| 1 | 1 | -1 | 4 | 1-(-1)=2 | 4-1=3 | 2×3=6 | 1×6=**6** |
| 2 | 2 | 1 | 4 | 2-1=1 | 4-2=2 | 1×2=2 | 2×2=**4** |
| 3 | 4 | 2 | 4 | 3-2=1 | 4-3=1 | 1×1=1 | 4×1=**4** |

**Total Sum:** 3 + 6 + 4 + 4 = **17** ✓

---

## Edge Cases Handled

### 1. Single Element
```
Input: arr = [5]
PLE = [-1], NLE = [1]
leftCount = 0-(-1) = 1, rightCount = 1-0 = 1
contribution = 5 × 1 × 1 = 5 ✓
```

### 2. Duplicate Values
```
Input: arr = [2, 2, 2]

Using PLE with < and NLE with <=:
PLE = [-1, -1, -1]  ← No strictly less element to left
NLE = [1, 2, 3]     ← Equal values act as boundaries

i=0: leftCount=1, rightCount=1 → 2×1=2
i=1: leftCount=1, rightCount=1 → 2×1=2
i=2: leftCount=1, rightCount=1 → 2×1=2
Plus overlapping subarrays...
Total = 12 ✓ (No double counting!)
```

### 3. Increasing Array
```
Input: arr = [1, 2, 3, 4]
First element 1 dominates - it's minimum in all subarrays starting from index 0
PLE = [-1, 0, 1, 2]
NLE = [4, 4, 4, 4]
Element 1 contributes: 1 × (1-(-1)) × (4-0) = 1×1×4 = 4... wait let me recalculate
Actually: leftCount=1, rightCount=4, contribution = 1×1×4 = 4
Others contribute less
Total = 20 ✓
```

### 4. Decreasing Array
```
Input: arr = [4, 3, 2, 1]
Last element 1 dominates - it's minimum in all subarrays ending at index 3
Symmetric to increasing case
Total = 20 ✓
```

---

## Interview Tips 🎤

### What to Say:

**"I'll use the Contribution Technique with Monotonic Stack."**

1. **Explain the insight:**
   > "Instead of generating all O(n²) subarrays, I'll calculate how many times each element contributes as a minimum. For each element, I'll find its 'dominance range' using Previous Less Element and Next Less Element."

2. **Explain duplicate handling:**
   > "For duplicates, I'll use strictly less for PLE and less-than-or-equal for NLE. This ensures each subarray is counted exactly once, even when elements are equal."

3. **Walk through time complexity:**
   > "Each element is pushed and popped from the stack at most once, giving us O(n) for finding PLE and NLE. The contribution calculation is also O(n), so total is O(n)."

### Common Follow-ups:

**Q: Why not use `<` for both PLE and NLE?**
> If we use `<` for both, duplicate elements would both try to claim the same subarray, causing double counting. By using `<` for one and `<=` for the other, we break the tie consistently.

**Q: Can you do this in one pass?**
> We could combine PLE and NLE finding using indices cleverly, but it makes code harder to understand. The current approach with two passes is clearer and still O(n).

**Q: What if we want maximum instead of minimum?**
> Flip the logic! Use Previous Greater Element (PGE) and Next Greater Element (NGE). The contribution technique remains the same.

**Q: How does this relate to other problems?**
> This is the SAME pattern as "Largest Rectangle in Histogram" where we find contribution of each bar's height.

### Mistakes to Avoid:

❌ **Don't** forget modulo at EVERY step - overflow can happen!
❌ **Don't** use same comparison (`<` or `<=`) for both PLE and NLE - duplicates will break
❌ **Don't** confuse index with value when working with stack
❌ **Don't** think this is greedy - it's contribution counting, different concept!

### Bonus Points:

✅ Mention this pattern works for: "Sum of Subarray Ranges", "Largest Rectangle", "Maximal Rectangle"
✅ Explain the trade-off: O(n) space for O(n²) time improvement is excellent
✅ Note that this is **amortized O(1)** per element for stack operations

---

## Summary

🎯 **Key Takeaways:**

1. **Contribution Technique** is powerful for subarray problems
2. **Monotonic Stack** helps find boundaries efficiently
3. **Duplicate handling** requires careful `<` vs `<=` choice
4. Formula: `contribution = value × (i - PLE) × (NLE - i)`
5. Time: **O(n)**, Space: **O(n)**

**Pattern Recognition:** When problem asks for "sum over all subarrays" of some property, think **Contribution Technique**!

**Next Level:** Try "Largest Rectangle in Histogram" - uses EXACT same pattern! 🚀

---