# Check if there exists a Subsequence with Sum K

**Difficulty**: Medium
**Topics**: Recursion, Dynamic Programming, Backtracking
**Pattern**: Subsequences (Pick/Not Pick)

---

## Problem Statement

[check-if-there-exists-a-subsequence-with-sum-k](https://www.geeksforgeeks.org/problems/check-if-there-exists-a-subsequence-with-sum-k/1)

Ek array `arr` aur target sum `k` diya gaya hai. Check karo ki **koi subsequence exists karti hai ya nahi** jiska sum exactly `k` ke equal ho.

**Return:**
- **true** - Agar koi bhi subsequence ka sum = k
- **false** - Agar koi subsequence ka sum = k nahi

**Important:**
- Sirf **existence check** karna hai (true/false return)
- Ek bhi valid mil gaya toh **turant return true**
- Sabhi subsequences check karne ki zaroorat nahi
- Empty subsequence nahi count hota

---

## Examples

### Example 1:
```
Input: arr = [10, 1, 2, 7, 6, 1, 5], k = 8
Output: true

Explanation:
Valid subsequences with sum = 8:
  [2, 6]  → 2 + 6 = 8 ✓
  [1, 7]  → 1 + 7 = 8 ✓
  [1, 1, 6] → 1 + 1 + 6 = 8 ✓

Koi ek bhi mil gaya, toh true!
```

### Example 2:
```
Input: arr = [2, 3, 5, 7, 9], k = 100
Output: false

Explanation:
Maximum possible sum = 2+3+5+7+9 = 26
26 < 100, toh koi subsequence sum = 100 nahi ban sakta
```

### Example 3:
```
Input: arr = [1, 2, 3], k = 6
Output: true

Explanation:
[1, 2, 3] → 1 + 2 + 3 = 6 ✓
```

### Example 4:
```
Input: arr = [5, 10, 15], k = 8
Output: false

Explanation:
Possible sums: 5, 10, 15, 15, 20, 25, 30
8 is not achievable
```

---

## Constraints

- `1 ≤ arr.length ≤ 2000`
- `1 ≤ arr[i] ≤ 1000`
- `1 ≤ k ≤ 2000`

---

## Intuition (Soch)

### The Challenge

**Count problem** mein humne sabhi valid subsequences count kiye the.

**Yahan different hai:**
- Sirf **check** karna hai - exists ya nahi
- **Ek bhi mil gaya** toh true return kar do
- Aage explore karne ki zaroorat nahi!

### The Key Insight

**Har element ke liye 2 choices:**
1. **Pick** - Element ko include karo, sum mein add karo
2. **Not Pick** - Element ko skip karo, sum same rahe

**Base case:**
- Agar `sum == k` → Return **true** (found!)
- Agar saare elements process ho gaye aur sum != k → Return **false**

**Early Return Optimization:**
```
Agar Pick path se true mila → turant return true
Agar Not Pick path se true mila → turant return true
Dono se false → tab false return
```

### Visual Example: [1, 2, 5], k = 3

```
                    check(0, 0)
                    /          \
              Pick 1            Not Pick 1
                 /                  \
          check(1, 1)           check(1, 0)
            /      \              /      \
        Pick 2   Skip 2       Pick 2   Skip 2
          /         \           /         \
    check(2,3)  check(2,1)  check(2,2)  check(2,0)
      /    \      /    \      /    \      /    \
   Pick5 Skip5 Pick5 Skip5 Pick5 Skip5 Pick5 Skip5
     |     |     |     |     |     |     |     |
    8     3✓    6     1     7     2     5     0
    ✗     ✓     ✗     ✗     ✗     ✗     ✗     ✗

Found at: [1, 2] with sum = 3 → Return true!
```

**Early return example:**
```
check(2, 1):
  Skip 5 → sum = 1 (base case, not equal k=3) → return false

check(2, 3):
  Skip 5 → sum = 3 (base case, equals k=3!) → return true ✓
  Ye true propagate hoga upar tak
  Aur jaldi return ho jayega!
```

---

## Approach 1: Pure Recursion

### Algorithm

```
checkSubsequenceSum(arr, k):
    return check(0, 0, arr, k)

check(index, currentSum, arr, k):
    // BASE CASE 1: Sum mil gaya!
    if currentSum == k:
        return true  // Early return!

    // BASE CASE 2: Saare elements process ho gaye, sum nahi mila
    if index == arr.length:
        return false

    // OPTIMIZATION: Agar sum already k se zyada
    if currentSum > k:
        return false  // Aage ka koi fayda nahi

    // RECURSIVE CASE 1: Pick current element
    if check(index + 1, currentSum + arr[index], arr, k):
        return true  // Mil gaya! Aage check nahi karna

    // RECURSIVE CASE 2: Not Pick (agar pick se nahi mila)
    return check(index + 1, currentSum, arr, k)
```

**Key Points:**
- Base case mein **early check** for sum == k
- Pick path se true mila toh turant return
- Not pick sirf tab explore jab pick se false aaya

**Time Complexity: O(2^n)** - worst case sabhi paths
**Space Complexity: O(n)** - recursion depth

---

## Approach 2: Dynamic Programming (Memoization)

### Why DP?

Agar same `(index, currentSum)` state baar baar aa raha hai, toh result cache kar sakte hain!

### Algorithm

```
checkSubsequenceSum(arr, k):
    memo = new Map()  // (index, sum) → boolean
    return check(0, 0, arr, k, memo)

check(index, sum, arr, k, memo):
    // Base cases same
    if sum == k:
        return true
    if index == arr.length:
        return false

    // Memoization check
    key = (index, sum)
    if memo.has(key):
        return memo.get(key)  // Cached result

    // Recursion
    result = check(index + 1, sum + arr[index], arr, k, memo) ||
             check(index + 1, sum, arr, k, memo)

    memo.set(key, result)  // Cache karo
    return result
```

**Time Complexity: O(n × k)** - har (index, sum) pair ek baar
**Space Complexity: O(n × k)** - memoization table + recursion stack

---

## Approach 3: Bottom-Up DP (Tabulation)

### Algorithm

```
checkSubsequenceSum(arr, k):
    n = arr.length
    dp = Array(n+1).fill(false).map(() => Array(k+1).fill(false))

    // Base case: sum = 0 hamesha possible (empty subsequence)
    for i = 0 to n:
        dp[i][0] = true

    // Fill table
    for i = 1 to n:
        for sum = 0 to k:
            // Not pick arr[i-1]
            dp[i][sum] = dp[i-1][sum]

            // Pick arr[i-1] (agar possible)
            if sum >= arr[i-1]:
                dp[i][sum] = dp[i][sum] || dp[i-1][sum - arr[i-1]]

    return dp[n][k]
```

**DP Table Meaning:**
- `dp[i][s]` = Kya first i elements se sum s possible hai?

**Time Complexity: O(n × k)**
**Space Complexity: O(n × k)** - DP table

---

## Complete Dry Run: arr = [1, 2, 5], k = 3

**Input**: `arr = [1, 2, 5]`, `k = 3`

**Expected Output**: `true` (subsequence [1, 2])

### Recursion Tree (with early returns):

```
                    check(0, 0, k=3)
                    /              \
              Pick 1                Not Pick 1
                 /                      \
          check(1, 1)               check(1, 0)
            /      \                  /      \
        Pick 2   Skip 2           Pick 2   Skip 2
          /         \               /         \
    check(2,3)  check(2,1)    check(2,2)  check(2,0)
       |
    sum==3! ✓
    return true

Early return होगा, बाकी paths explore नहीं होंगे!
```

### Detailed Trace:

```
┌──────────────────────────────────────────────────────────────────────┐
│ CALL 1: check(0, 0, [1,2,5], 3)                                     │
├──────────────────────────────────────────────────────────────────────┤
│ index = 0, sum = 0, k = 3                                           │
│ Base case? sum == 3 → Nahi (0 != 3)                                │
│ Base case? index == 3 → Nahi (0 != 3)                              │
│                                                                      │
│ CHOICE 1: Pick arr[0] = 1                                          │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │ CALL 2: check(1, 1, [1,2,5], 3)                          │   │
│   ├────────────────────────────────────────────────────────────┤   │
│   │ index = 1, sum = 1, k = 3                                 │   │
│   │ Base case? sum == 3 → Nahi (1 != 3)                       │   │
│   │                                                            │   │
│   │ CHOICE 1: Pick arr[1] = 2                                 │   │
│   │   ┌──────────────────────────────────────────────────┐   │   │
│   │   │ CALL 3: check(2, 3, [1,2,5], 3)                 │   │   │
│   │   ├──────────────────────────────────────────────────┤   │   │
│   │   │ index = 2, sum = 3, k = 3                       │   │   │
│   │   │ Base case? sum == 3 → HAAN! ✓✓✓                │   │   │
│   │   │                                                  │   │   │
│   │   │ RETURN TRUE                                      │   │   │
│   │   │ ← Found: [1, 2] with sum = 3                   │   │   │
│   │   └──────────────────────────────────────────────────┘   │   │
│   │   Pick returned: true                                     │   │
│   │                                                            │   │
│   │ if (true) return true ← EARLY RETURN!                     │   │
│   │ (Skip path explore nahi hoga)                             │   │
│   │                                                            │   │
│   │ RETURN TRUE                                                │   │
│   └────────────────────────────────────────────────────────────┘   │
│   Pick returned: true                                              │
│                                                                      │
│ if (true) return true ← EARLY RETURN!                              │
│ (Not Pick path explore nahi hoga)                                  │
│                                                                      │
│ RETURN TRUE                                                         │
└──────────────────────────────────────────────────────────────────────┘

Final Result: true

Valid subsequence found: [1, 2]
Total calls made: 3 (early return ki wajah se)
Calls avoided: 5 (optimization!)
```

### Without Early Return (for comparison):

```
Agar early return nahi hota:
  Total calls: 2^3 = 8 leaf nodes + internal = 15 calls

With early return:
  Total calls: 3 (jaise hi mila, ruk gaye!)

Optimization: 15 - 3 = 12 calls saved! 🎯
```

---

## DP Table Example: arr = [1, 2, 5], k = 3

```
dp[i][s] = Kya first i elements se sum s possible hai?

        s→  0    1    2    3
      ┌─────┬────┬────┬────┬
i=0   │  T  │ F  │ F  │ F  │ (no elements)
(no)  ├─────┼────┼────┼────┤
i=1   │  T  │ T  │ F  │ F  │ (element: 1)
([1]) ├─────┼────┼────┼────┤ sum 1 possible
i=2   │  T  │ T  │ T  │ T  │ (elements: 1,2)
([1,2])├────┼────┼────┼────┤ sum 3 = 1+2 ✓
i=3   │  T  │ T  │ T  │ T  │ (elements: 1,2,5)
([1,2,5])└──┴────┴────┴────┘

Answer: dp[3][3] = true ✓
```

**Filling logic:**
```
dp[i][s] = dp[i-1][s]  (not pick)
           ||
           dp[i-1][s - arr[i-1]]  (pick, if s >= arr[i-1])
```

---

## Comparison of Approaches

| Approach | Time | Space | When to Use |
|----------|------|-------|-------------|
| **Pure Recursion** | O(2^n) | O(n) | Small n (≤ 20) |
| **Recursion + Memo** | O(n × k) | O(n × k) | Medium n, k |
| **DP Tabulation** | O(n × k) | O(n × k) | Optimal solution |

**Trade-offs:**
- **Recursion:** Simple code, exponential time
- **Memoization:** Optimize repeated states
- **DP:** Most efficient, but more complex code

---

## Time & Space Complexity

### Approach 1: Pure Recursion

**Time Complexity: O(2^n)**

**Kyun?**
- Worst case: Saare paths explore karne padenge
- Har element ke liye 2 choices
- Early return se best case improve ho sakta hai

**Best case:** O(log n) - agar pehle hi path mein mil gaya
**Worst case:** O(2^n) - koi valid nahi, ya last mein mila

**Space Complexity: O(n)**
- Recursion depth maximum n

### Approach 2 & 3: DP

**Time Complexity: O(n × k)**

**Kyun?**
- Har (index, sum) pair ek baar process
- Total pairs: n × k
- Har pair pe constant work

**Simple shabdon mein:**
```
n = 100 elements, k = 1000
Pure recursion: 2^100 = huge! (impractical)
DP: 100 × 1000 = 100,000 (manageable!)
```

**Space Complexity: O(n × k)**
- DP table: n × k
- Recursion stack (memoization): O(n)
- Total: O(n × k)

---

## Edge Cases

### 1. Single element equals k
```
Input: arr = [5], k = 5
Output: true

Explanation: [5] itself
```

### 2. Impossible sum
```
Input: arr = [1, 2, 3], k = 10
Output: false

Explanation: Max sum = 6 < 10
```

### 3. Zero sum
```
Input: arr = [1, 2, 3], k = 0
Output: false

Explanation: Empty subsequence not counted
Note: Agar empty count hota toh true (sum=0)
```

### 4. All elements needed
```
Input: arr = [1, 2, 3], k = 6
Output: true

Explanation: [1, 2, 3] all needed
```

### 5. Multiple ways possible
```
Input: arr = [1, 1, 1, 1], k = 2
Output: true

Explanation: [1, 1] multiple ways, but just need to confirm exists
```

---

## Optimization Techniques

### 1. **Early Return**
```typescript
// As soon as sum == k
if (sum === k) return true;
```

### 2. **Pruning**
```typescript
// Agar sum already k se zyada (sabhi positive numbers)
if (sum > k) return false;
```

### 3. **Pre-check**
```typescript
// Total sum check
const totalSum = arr.reduce((a, b) => a + b, 0);
if (totalSum < k) return false;  // Impossible!
```

### 4. **Sorting (for pruning)**
```typescript
// Sort in descending order
// Bade elements pehle try karo
// Jaldi k tak pahunch sakte ho
```

---

## Common Mistakes to Avoid

❌ **Empty subsequence count karna**
```javascript
// WRONG
if (index === n) {
  return sum === k; // Empty bhi true ho jayega agar k=0
}

// CORRECT
if (sum === k && index > 0) return true; // At least one picked
```

❌ **Early return nahi karna**
```javascript
// WRONG (inefficient)
const pick = check(...);
const notPick = check(...);
return pick || notPick; // Dono explore honge!

// CORRECT (efficient)
if (check(...)) return true; // Mil gaya toh ruk jao!
return check(...); // Nahi toh dusra try karo
```

❌ **DP base case galat**
```javascript
// WRONG
dp[0][0] = false; // Empty sum 0 hai!

// CORRECT
dp[0][0] = true; // Empty subsequence ka sum 0 hai
```

❌ **Memoization key galat**
```javascript
// WRONG
key = `${index}` // Sum missing!

// CORRECT
key = `${index},${sum}` // Both needed
```

✅ **Early return use karo** for optimization
✅ **Base case: Check sum == k first**
✅ **DP for large inputs** (n × k)
✅ **Pruning** if sum > k

---

## Interview Tips

**Interviewer ko kya bolna hai:**

*"Ye ek classic subset sum problem hai jisme hum check karna hai ki koi subsequence ka sum k ke equal hai ya nahi. Main Pick/Not Pick pattern use karunga - har element ko include ya exclude. Important optimization hai early return - jaise hi ek valid subsequence mil jaye, turant true return kar dunga. Time complexity pure recursion mein O(2^n) hai, lekin agar n aur k dono large hain toh Dynamic Programming use kar sakte hain jo O(n×k) mein solve karega. DP mein ek table banate hain jisme dp[i][s] represent karta hai ki kya first i elements se sum s possible hai."*

**Follow-up Questions:**

**Q: Kya actually subsequence print kar sakte ho?**
A: Haan, backtracking use karke path track kar sakte hain. Jab true return ho, wahan se backtrack karke elements collect karo.

**Q: Negative numbers hon toh?**
A: Tab pruning (sum > k) kaam nahi karega kyunki sum decrease bhi ho sakta hai. DP tricky ho jayega - unbounded sums possible.

**Q: Space optimize kar sakte ho DP mein?**
A: Haan, agar sirf existence check hai (not path), toh 1D DP array sufficient hai. Space O(k) ho jayega instead of O(n×k).

**Q: Recursion vs DP kab use karein?**
A: Small n (≤20): Recursion simple hai. Large n, k: DP efficient hai. Constraints dekh ke decide karo.

---

## Related Problems

**Similar Pattern:**
- **Subset Sum** - Exactly ye problem
- **Partition Equal Subset Sum** - Sum ko half karna
- **Count Subsets with Sum K** - Count return (ye already kiya!)
- **Target Sum** - +/- signs add karke
- **0/1 Knapsack** - Value maximize with weight limit

**Same Pick/Not Pick, different goals!** 🎯

---

## Key Takeaways

1. **Boolean Return**
   - true/false return, not count

2. **Early Return Optimization**
   - Ek mil gaya? Ruk jao!
   - Best case: O(log n)

3. **DP for Large Inputs**
   - n × k feasible
   - Better than 2^n

4. **Base Case Order Matters**
   - Pehle sum == k check
   - Phir index bounds

5. **Trade-offs**
   - Recursion: Simple, exponential
   - DP: Complex, polynomial

Implementation ready? Solution.ts banau with both approaches? 🚀