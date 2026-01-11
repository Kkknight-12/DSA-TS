# Count All Subsequences with Sum K

**Difficulty**: Medium
**Topics**: Recursion, Backtracking, Dynamic Programming
**Pattern**: Subsequences (Pick/Not Pick)

---

(count-all-subsequences-with-sum-k)[https://takeuforward.org/data-structure/count-all-subsequences-with-sum-k]

## Problem Statement

Ek array `nums` aur ek integer `k` diye gaye hain. Tumhe **count** return karna hai ki kitne **non-empty subsequences** hain jinka sum **exactly k** ke equal hai.

**Important:**
- Empty subsequence count nahi karna
- Duplicates allowed hain array mein
- Order matter nahi karta (subsequence ki property)
- Sirf **count** chahiye, subsequences store nahi karne

---

## Examples

### Example 1:
```
Input: nums = [4, 9, 2, 5, 1], k = 10
Output: 2

Explanation:
Subsequences with sum = 10:
  [9, 1]     → 9 + 1 = 10 ✓
  [4, 5, 1]  → 4 + 5 + 1 = 10 ✓

Total count: 2
```

### Example 2:
```
Input: nums = [4, 2, 10, 5, 1, 3], k = 5
Output: 3

Explanation:
Subsequences with sum = 5:
  [4, 1]  → 4 + 1 = 5 ✓
  [2, 3]  → 2 + 3 = 5 ✓
  [5]     → 5 = 5 ✓

Total count: 3
```

### Example 3:
```
Input: nums = [1, 2, 3], k = 6
Output: 1

Explanation:
Subsequences with sum = 6:
  [1, 2, 3]  → 1 + 2 + 3 = 6 ✓

Total count: 1
```

### Example 4:
```
Input: nums = [1, 1, 1], k = 2
Output: 3

Explanation:
Subsequences with sum = 2:
  [1, 1] (index 0, 1)  → 1 + 1 = 2 ✓
  [1, 1] (index 0, 2)  → 1 + 1 = 2 ✓
  [1, 1] (index 1, 2)  → 1 + 1 = 2 ✓

Total count: 3
(Dhyan do: Different indices = different subsequences)
```

---

## Constraints

- `1 ≤ nums.length ≤ 20`
- `1 ≤ nums[i] ≤ 100`
- `1 ≤ k ≤ 1000`

---

## Intuition (Soch)

### The Challenge

**Generate All Subsets** mein humne sabhi subsets store kiye the.

**Yahan different hai:**
- Subsets store nahi karne, sirf **count** chahiye
- Woh bhi sirf jinki **sum = k**

### The Key Insight

**Har element ke liye 2 choices:**
1. **Pick** - Element ko include karo, sum mein add karo
2. **Not Pick** - Element ko skip karo, sum same rahe

**Jab saare elements process ho jayein:**
- Agar `sum == k` → Return **1** (found one valid subsequence!)
- Agar `sum != k` → Return **0** (invalid)

**Final count:**
```
Total = (count from pick path) + (count from not pick path)
```

### Visual Example: [4, 5, 1], k = 10

```
                    index=0, sum=0
                        /          \
                   Pick 4          Not Pick 4
                      /                \
              index=1, sum=4       index=1, sum=0
                  /      \             /      \
            Pick 5    Not Pick 5   Pick 5   Not Pick 5
               /          \          /          \
          sum=9        sum=4      sum=5       sum=0
            /  \        /  \       /  \        /  \
        Pick 1  Skip  Pick 1 Skip Pick 1 Skip Pick 1 Skip
          /      \      /     \    /     \     /      \
       sum=10  sum=9 sum=5  sum=4 sum=6 sum=5 sum=1  sum=0
        ✓1      ✗0    ✗0    ✗0    ✗0    ✗0    ✗0     ✗0

Result: 1 valid subsequence [4, 5, 1]
```

**Count propagation:**
```
Pick 4, Pick 5, Pick 1 → sum=10 → return 1
Pick 4, Pick 5, Skip 1 → sum=9  → return 0
Pick 4, Skip 5, Pick 1 → sum=5  → return 0
Pick 4, Skip 5, Skip 1 → sum=4  → return 0
Skip 4, Pick 5, Pick 1 → sum=6  → return 0
Skip 4, Pick 5, Skip 1 → sum=5  → return 0
Skip 4, Skip 5, Pick 1 → sum=1  → return 0
Skip 4, Skip 5, Skip 1 → sum=0  → return 0

Total: 1 + 0 + 0 + 0 + 0 + 0 + 0 + 0 = 1
```

---

## Approach: Recursion with Count Return

### Algorithm

```
countSubsequences(nums, k):
    return count(0, 0, nums, k)

count(index, currentSum, nums, k):
    // BASE CASE: Saare elements process ho gaye
    if index == nums.length:
        if currentSum == k:
            return 1  // Found one valid subsequence!
        else:
            return 0  // Invalid subsequence

    // RECURSIVE CASE 1: Pick current element
    pickCount = count(index + 1, currentSum + nums[index], nums, k)

    // RECURSIVE CASE 2: Not Pick current element
    notPickCount = count(index + 1, currentSum, nums, k)

    // Return total count
    return pickCount + notPickCount
```

**Key Parameters:**
- `index`: Current position in array
- `currentSum`: Sum so far of picked elements
- `nums`: Original array
- `k`: Target sum

**Return Value:**
- **Integer count** of valid subsequences (not array!)

---

## Complete Dry Run: nums = [4, 5, 1], k = 10

**Input**: `nums = [4, 5, 1]`, `k = 10`

**Expected Output**: `1` (only [4, 5, 1])

### Decision Tree with Sum Tracking:

```
                    count(0, 0)
                    /          \
              Pick 4            Not Pick 4
                 /                  \
          count(1, 4)           count(1, 0)
            /      \              /      \
        Pick 5   Skip 5       Pick 5   Skip 5
          /         \           /         \
    count(2,9)  count(2,4)  count(2,5)  count(2,0)
      /    \      /    \      /    \      /    \
   Pick1 Skip1 Pick1 Skip1 Pick1 Skip1 Pick1 Skip1
     |     |     |     |     |     |     |     |
   (3,10)(3,9)(3,5)(3,4)(3,6)(3,5)(3,1)(3,0)
    ✓1    ✗0   ✗0   ✗0   ✗0   ✗0   ✗0   ✗0
```

### Detailed Trace:

```
┌──────────────────────────────────────────────────────────────────────┐
│ CALL 1: count(0, 0, [4,5,1], 10)                                    │
├──────────────────────────────────────────────────────────────────────┤
│ index = 0, sum = 0, k = 10                                          │
│ Base case? 0 == 3 → Nahi                                            │
│                                                                      │
│ CHOICE 1: Pick nums[0] = 4                                          │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │ CALL 2: count(1, 4, [4,5,1], 10)                          │   │
│   ├────────────────────────────────────────────────────────────┤   │
│   │ index = 1, sum = 4, k = 10                                │   │
│   │ Base case? 1 == 3 → Nahi                                  │   │
│   │                                                            │   │
│   │ CHOICE 1: Pick nums[1] = 5                                │   │
│   │   ┌──────────────────────────────────────────────────┐   │   │
│   │   │ CALL 3: count(2, 9, [4,5,1], 10)                │   │   │
│   │   ├──────────────────────────────────────────────────┤   │   │
│   │   │ index = 2, sum = 9, k = 10                      │   │   │
│   │   │ Base case? 2 == 3 → Nahi                        │   │   │
│   │   │                                                  │   │   │
│   │   │ CHOICE 1: Pick nums[2] = 1                      │   │   │
│   │   │   ┌────────────────────────────────────────┐   │   │   │
│   │   │   │ CALL 4: count(3, 10, [4,5,1], 10)     │   │   │   │
│   │   │   ├────────────────────────────────────────┤   │   │   │
│   │   │   │ index = 3, sum = 10, k = 10           │   │   │   │
│   │   │   │ Base case? 3 == 3 → Haan! ✓           │   │   │   │
│   │   │   │ sum == k? 10 == 10 → Haan! ✓          │   │   │   │
│   │   │   │ Return 1 (Found valid subsequence!)   │   │   │   │
│   │   │   └────────────────────────────────────────┘   │   │   │
│   │   │   pickCount = 1                                 │   │   │
│   │   │                                                  │   │   │
│   │   │ CHOICE 2: Not Pick nums[2] = 1                  │   │   │
│   │   │   ┌────────────────────────────────────────┐   │   │   │
│   │   │   │ CALL 5: count(3, 9, [4,5,1], 10)      │   │   │   │
│   │   │   ├────────────────────────────────────────┤   │   │   │
│   │   │   │ index = 3, sum = 9, k = 10            │   │   │   │
│   │   │   │ Base case? 3 == 3 → Haan! ✓           │   │   │   │
│   │   │   │ sum == k? 9 == 10 → Nahi ✗            │   │   │   │
│   │   │   │ Return 0 (Invalid, sum not equal)     │   │   │   │
│   │   │   └────────────────────────────────────────┘   │   │   │
│   │   │   notPickCount = 0                              │   │   │
│   │   │                                                  │   │   │
│   │   │ Return pickCount + notPickCount = 1 + 0 = 1    │   │   │
│   │   └──────────────────────────────────────────────────┘   │   │
│   │   pickCount (from Pick 5) = 1                             │   │
│   │                                                            │   │
│   │ CHOICE 2: Not Pick nums[1] = 5                            │   │
│   │   ┌──────────────────────────────────────────────────┐   │   │
│   │   │ CALL 6: count(2, 4, [4,5,1], 10)                │   │   │
│   │   ├──────────────────────────────────────────────────┤   │   │
│   │   │ index = 2, sum = 4, k = 10                      │   │   │
│   │   │                                                  │   │   │
│   │   │ Pick 1: count(3, 5, ...) → sum != k → return 0  │   │   │
│   │   │ Skip 1: count(3, 4, ...) → sum != k → return 0  │   │   │
│   │   │                                                  │   │   │
│   │   │ Return 0 + 0 = 0                                 │   │   │
│   │   └──────────────────────────────────────────────────┘   │   │
│   │   notPickCount (from Skip 5) = 0                          │   │
│   │                                                            │   │
│   │ Return pickCount + notPickCount = 1 + 0 = 1               │   │
│   └────────────────────────────────────────────────────────────┘   │
│   pickCount (from Pick 4) = 1                                      │
│                                                                      │
│ CHOICE 2: Not Pick nums[0] = 4                                     │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │ CALL 7: count(1, 0, [4,5,1], 10)                          │   │
│   ├────────────────────────────────────────────────────────────┤   │
│   │ index = 1, sum = 0, k = 10                                │   │
│   │                                                            │   │
│   │ Pick 5:                                                    │   │
│   │   count(2, 5, ...)                                         │   │
│   │     Pick 1: count(3, 6, ...) → 6 != 10 → return 0         │   │
│   │     Skip 1: count(3, 5, ...) → 5 != 10 → return 0         │   │
│   │   Returns: 0 + 0 = 0                                       │   │
│   │                                                            │   │
│   │ Skip 5:                                                    │   │
│   │   count(2, 0, ...)                                         │   │
│   │     Pick 1: count(3, 1, ...) → 1 != 10 → return 0         │   │
│   │     Skip 1: count(3, 0, ...) → 0 != 10 → return 0         │   │
│   │   Returns: 0 + 0 = 0                                       │   │
│   │                                                            │   │
│   │ Return 0 + 0 = 0                                           │   │
│   └────────────────────────────────────────────────────────────┘   │
│   notPickCount (from Skip 4) = 0                                   │
│                                                                      │
│ Return pickCount + notPickCount = 1 + 0 = 1                        │
└──────────────────────────────────────────────────────────────────────┘

Final Result: 1

Valid subsequence found: [4, 5, 1] (sum = 10)
```

---

## Count Propagation (Bottom-up)

Recursion tree ke **leaf nodes** (base cases) se count **propagate** hota hai:

```
Level 3 (Base cases):
  sum=10 → return 1 ✓
  sum=9  → return 0
  sum=5  → return 0
  sum=4  → return 0
  sum=6  → return 0
  sum=5  → return 0
  sum=1  → return 0
  sum=0  → return 0

Level 2 (Merge):
  count(2,9):  1 + 0 = 1
  count(2,4):  0 + 0 = 0
  count(2,5):  0 + 0 = 0
  count(2,0):  0 + 0 = 0

Level 1 (Merge):
  count(1,4):  1 + 0 = 1
  count(1,0):  0 + 0 = 0

Level 0 (Final):
  count(0,0):  1 + 0 = 1 ← Final answer!
```

---

## Time & Space Complexity

**Time Complexity: O(2^n)**

**Kyun?**
- Har element ke liye 2 choices: Pick ya Not Pick
- Total paths: 2^n
- Har path explore karna padta hai

**Detailed:**
```
n = 3 elements:
  - Total recursive calls: 2^3 = 8 (leaf nodes)
  - Plus internal nodes: 2^4 - 1 = 15 total calls
  - But work per call: O(1)
  - Total: O(2^n)
```

**Simple shabdon mein:**
Agar array mein 20 elements hain, toh 2^20 = 1,048,576 paths explore karne padenge. That's why constraint n ≤ 20 hai.

**Space Complexity: O(n)**

**Kyun?**
- Recursion depth: **O(n)** (maximum n levels)
- Har level pe constant space (sirf index aur sum variables)
- Koi extra data structure nahi (arrays store nahi kar rahe)

**Stack space:**
```
Level 0: count(0, sum)
Level 1: count(1, sum)
Level 2: count(2, sum)
...
Level n: count(n, sum) → Base case

Maximum depth = n
```

---

## Edge Cases

### 1. No valid subsequence
```
Input: nums = [1, 2, 3], k = 10
Output: 0

Explanation: Maximum sum = 1+2+3 = 6, k=10 impossible
```

### 2. Single element equals k
```
Input: nums = [5], k = 5
Output: 1

Explanation: [5] hi ek valid subsequence
```

### 3. Multiple ways with duplicates
```
Input: nums = [1, 1, 1, 1], k = 2
Output: 6

Explanation: Har pair of 1s ek subsequence
  [1,1] at indices (0,1), (0,2), (0,3), (1,2), (1,3), (2,3)
  Total: C(4,2) = 6
```

### 4. All elements needed
```
Input: nums = [2, 3, 5], k = 10
Output: 1

Explanation: [2, 3, 5] sabhi chahiye
```

### 5. Zero sum
```
Input: nums = [1, 2, 3], k = 0
Output: 0

Explanation: Empty subsequence not counted, koi valid nahi
```

---

## Optimization: Dynamic Programming

Agar same `(index, sum)` pair baar baar aa raha hai, toh **memoization** use kar sakte ho:

```
Memoization Table:
  memo[index][sum] = count of subsequences from index onwards with remaining sum

Time: O(n × sum)  ← Much better than O(2^n) for large sums!
Space: O(n × sum)
```

**Trade-off:**
- Small k: DP better (O(n × k))
- Large k: Recursion simple (O(2^n))

---

## Common Mistakes to Avoid

❌ **Empty subsequence count karna**
```javascript
// WRONG
if (index === n) {
  return sum === k ? 1 : 0; // Empty bhi count ho jayega
}

// CORRECT - Empty avoid karne ke liye
// Option 1: Problem mein explicitly bola "non-empty"
// Option 2: Check karo ki kuch picked hai ya nahi
```

❌ **Count store karna instead of return**
```javascript
// WRONG
let count = 0;
if (sum === k) count++; // Global variable, galat result

// CORRECT
return (sum === k) ? 1 : 0; // Return karo
```

❌ **Subsequences store karna**
```javascript
// WRONG (unnecessary for counting)
result.push([...current]); // Sirf count chahiye tha!

// CORRECT
return 1; // Just return count
```

❌ **Sum overflow check bhoolna**
```javascript
// Agar elements bade hain, sum overflow ho sakta hai
// Check karo: if (currentSum > k) return 0; (optimization)
```

✅ **Return count from both paths**
✅ **Base case: Check sum == k**
✅ **No need to store subsequences**
✅ **Optimization: Prune if sum > k already**

---

## Interview Tips

**Interviewer ko kya bolna hai:**

*"Ye ek subsequence counting problem hai jisme hum Pick/Not Pick pattern use karenge. Har element pe decide karna hai ki use include karu (sum mein add karu) ya skip karu. Jab saare elements process ho jayein aur sum exactly k ke equal ho, toh return 1 (found one valid). Otherwise return 0. Final count dono paths (pick aur not pick) se aane wali counts ka sum hoga. Time complexity O(2^n) hai kyunki har element ke liye 2 choices hain. Agar k chhota hai, toh memoization se optimize kar sakte hain O(n×k) mein."*

**Follow-up Questions:**

**Q: Kya store kar sakte ho subsequences bhi?**
A: Haan, current array maintain karo aur base case mein sum==k ho toh result mein add karo. Lekin sirf count ke liye ye unnecessary overhead hai.

**Q: Optimize kar sakte ho?**
A: Haan, memoization use karo. Agar (index, sum) repeat ho raha hai toh cache se return karo. Time complexity O(n × k) ho jayega.

**Q: Agar negative numbers hon?**
A: Tab optimization tricky ho jayega kyunki sum decrease bhi ho sakta hai. Basic recursion same rahega, but pruning nahi kar sakte.

**Q: Kya iteratively kar sakte ho?**
A: Haan, DP table bana sakte ho. dp[i][s] = count of subsequences from first i elements with sum s. But recursion zyada intuitive hai.

---

## Related Problems

**Similar Pattern:**
- **Subset Sum** - Boolean return (exists or not)
- **Count Subsets with Sum K** - Exactly ye problem!
- **Partition Equal Subset Sum** - Sum ko half karna
- **Target Sum** - +/- signs add karke target banana
- **Combination Sum** - Repetition allowed

**Same Pick/Not Pick pattern, different constraints!** 🎯

---

## Key Takeaways

1. **Counting ≠ Generating**
   - Store nahi karna, sirf count return karna

2. **Return 1 or 0**
   - Valid subsequence → return 1
   - Invalid → return 0

3. **Merge counts**
   - Total = pickCount + notPickCount

4. **Optimization possible**
   - Memoization if (index, sum) repeats
   - Pruning if sum > k

5. **Pick/Not Pick Pattern**
   - Same as subsets, but return type different

Implementation ready? Solution.ts banau? 🚀