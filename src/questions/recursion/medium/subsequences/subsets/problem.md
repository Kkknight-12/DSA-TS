# Subsets (Power Set)

**Difficulty**: Medium
**Topics**: Recursion, Backtracking, Array, Bit Manipulation
**Source**: LeetCode

---

## Problem Statement

[subsets](https://leetcode.com/problems/subsets/)

Ek integer array `nums` diya gaya hai jisme **unique elements** hain. Tumhe sabhi possible **subsets** (power set) return karni hain.

**Note**:
- Solution set mein duplicate subsets nahi hone chahiye
- Kisi bhi order mein return kar sakte ho

**Power Set kya hai?**
Power set ek set ke saare possible subsets ka collection hai, including empty set.

---

## Prerequisites (Agar Koi Chahiye)

**Optional Background Knowledge:**

**Backtracking:**
- Ye ek classic backtracking problem hai
- "Include/Exclude" pattern use hota hai
- Har element ke liye decision banana: include karu ya skip karu

**Tumhe kya chahiye:**
- ✅ Basic recursion samajh (base case + recursive case)
- ✅ Arrays ke saath comfortable ho
- ✅ Decision making at each step

**Bottom Line**: Recursion samajhte ho toh ye problem solve ho jayega. Include/Exclude pattern naturally samajh aa jayega!

---

### Examples:

**Example 1:**
```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Explanation:
3 elements hain, toh 2^3 = 8 subsets possible hain:
  []        - empty subset (koi element nahi)
  [1]       - sirf 1
  [2]       - sirf 2
  [1,2]     - 1 aur 2
  [3]       - sirf 3
  [1,3]     - 1 aur 3
  [2,3]     - 2 aur 3
  [1,2,3]   - sabhi elements

Note: Order matter nahi karta
  [1,2,3] same as [3,2,1]
```

**Example 2:**
```
Input: nums = [0]
Output: [[],[0]]

Explanation:
1 element hai, toh 2^1 = 2 subsets:
  []   - empty
  [0]  - sirf 0
```

**Example 3:**
```
Input: nums = [1,2]
Output: [[],[1],[2],[1,2]]

Explanation:
2 elements hain, toh 2^2 = 4 subsets:
  []     - koi nahi
  [1]    - sirf 1
  [2]    - sirf 2
  [1,2]  - dono
```

---

### Constraints:
- `1 ≤ nums.length ≤ 10`
- `-10 ≤ nums[i] ≤ 10`
- Saare numbers **unique** hain (duplicates nahi)

---

## Intuition (Soch)

### The Pattern: Include/Exclude

Har element ke liye sirf **2 choices** hain:
1. **Include** - Current subset mein element add karo
2. **Exclude** - Current subset mein element skip karo

**Example [1,2,3]:**

```
Start with empty []

Element 1 pe decision:
  Include 1?
    Yes → [1]
    No  → []

Element 2 pe decision (har existing subset ke liye):
  [1] + Include 2? → [1,2] ya [1]
  []  + Include 2? → [2] ya []

Element 3 pe decision:
  [1,2] + Include 3? → [1,2,3] ya [1,2]
  [1]   + Include 3? → [1,3] ya [1]
  [2]   + Include 3? → [2,3] ya [2]
  []    + Include 3? → [3] ya []
```

### Decision Tree (nums = [1,2])

```
                          []
                        /    \
              Include 1        Skip 1
                   /              \
                [1]                []
               /   \              /   \
        Inc 2       Skip 2   Inc 2    Skip 2
           /          \        /         \
        [1,2]        [1]     [2]         []
          ✓           ✓       ✓          ✓
```

**Result:** `[[1,2], [1], [2], []]`

**Key Observations:**
1. Har level pe ek element consider karte hain
2. Har node pe 2 choices: Include ya Exclude
3. Tree ki depth = n (elements ki count)
4. Leaf nodes = 2^n (total subsets)

### Why This Works

**Recursive Pattern:**
```
subsets(nums, index, current, result):
    // BASE CASE: Saare elements process ho gaye
    if index == nums.length:
        result.push(copy of current)
        return

    // CHOICE 1: Include current element
    current.push(nums[index])
    subsets(nums, index + 1, current, result)
    current.pop()  // Backtrack!

    // CHOICE 2: Skip current element
    subsets(nums, index + 1, current, result)
```

**Example for [1,2]:**
```
Start: index=0, current=[]

Include 1:
  current = [1]
  index = 1

  Include 2:
    current = [1,2]
    index = 2 → BASE CASE! Add [1,2] ✓
    Backtrack: current = [1]

  Skip 2:
    current = [1]
    index = 2 → BASE CASE! Add [1] ✓
    Backtrack: current = []

Skip 1:
  current = []
  index = 1

  Include 2:
    current = [2]
    index = 2 → BASE CASE! Add [2] ✓
    Backtrack: current = []

  Skip 2:
    current = []
    index = 2 → BASE CASE! Add [] ✓

Result: [[1,2], [1], [2], []]
```

---

## Approach: Backtracking (Include/Exclude Pattern)

### Algorithm

```
subsets(nums):
    result = []
    generate(nums, 0, [], result)
    return result

generate(nums, index, current, result):
    // BASE CASE: Saare elements dekh liye
    if index == nums.length:
        result.push([...current])  // Current subset add karo
        return

    // RECURSIVE CASE 1: Current element ko INCLUDE karo
    current.push(nums[index])
    generate(nums, index + 1, current, result)
    current.pop()  // Backtrack (undo karo)

    // RECURSIVE CASE 2: Current element ko SKIP karo
    generate(nums, index + 1, current, result)
```

**Key Parameters:**
- `nums`: Original array
- `index`: Current position (which element we're deciding on)
- `current`: Current subset being built
- `result`: Sabhi subsets store karne ke liye

**Important - Backtracking:**
- Include karne ke baad recursive call
- Wapas aaye toh `pop()` karke undo karo
- Tab skip wala path explore karo

---

## Complete Dry Run (nums = [1,2])

**Input**: `nums = [1,2]`

**Expected Output**: `[[1,2], [1], [2], []]` (kisi bhi order mein)

### Decision Tree with State:

```
                    index=0, current=[]
                          |
              ┌──────────┴──────────┐
              │                     │
        Include 1               Skip 1
              │                     │
       index=1, [1]          index=1, []
              |                     |
        ┌─────┴─────┐         ┌─────┴─────┐
        │           │         │           │
    Include 2   Skip 2    Include 2   Skip 2
        │           │         │           │
    index=2     index=2   index=2     index=2
    [1,2]       [1]       [2]         []
      ✓          ✓         ✓           ✓
```

### Detailed Trace:

```
┌──────────────────────────────────────────────────────────────────┐
│ CALL 1: generate([1,2], 0, [], result)                          │
├──────────────────────────────────────────────────────────────────┤
│ index = 0, current = [], nums.length = 2                        │
│ Base case? 0 == 2 → Nahi                                        │
│                                                                  │
│ CHOICE 1: Include nums[0] = 1                                   │
│   current.push(1) → current = [1]                               │
│   ┌────────────────────────────────────────────────────────┐   │
│   │ CALL 2: generate([1,2], 1, [1], result)               │   │
│   ├────────────────────────────────────────────────────────┤   │
│   │ index = 1, current = [1], nums.length = 2             │   │
│   │ Base case? 1 == 2 → Nahi                              │   │
│   │                                                        │   │
│   │ CHOICE 1: Include nums[1] = 2                         │   │
│   │   current.push(2) → current = [1,2]                   │   │
│   │   ┌──────────────────────────────────────────────┐   │   │
│   │   │ CALL 3: generate([1,2], 2, [1,2], result)   │   │   │
│   │   ├──────────────────────────────────────────────┤   │   │
│   │   │ index = 2, current = [1,2]                  │   │   │
│   │   │ Base case? 2 == 2 → Haan! ✓                │   │   │
│   │   │                                              │   │   │
│   │   │ result.push([1,2])                          │   │   │
│   │   │ result = [[1,2]]                            │   │   │
│   │   │ Return                                       │   │   │
│   │   └──────────────────────────────────────────────┘   │   │
│   │   BACKTRACK: current.pop() → current = [1]            │   │
│   │                                                        │   │
│   │ CHOICE 2: Skip nums[1] = 2                            │   │
│   │   current = [1] (no change)                           │   │
│   │   ┌──────────────────────────────────────────────┐   │   │
│   │   │ CALL 4: generate([1,2], 2, [1], result)     │   │   │
│   │   ├──────────────────────────────────────────────┤   │   │
│   │   │ index = 2, current = [1]                    │   │   │
│   │   │ Base case? 2 == 2 → Haan! ✓                │   │   │
│   │   │                                              │   │   │
│   │   │ result.push([1])                            │   │   │
│   │   │ result = [[1,2], [1]]                       │   │   │
│   │   │ Return                                       │   │   │
│   │   └──────────────────────────────────────────────┘   │   │
│   │ Return                                                 │   │
│   └────────────────────────────────────────────────────────┘   │
│   BACKTRACK: current.pop() → current = []                      │
│                                                                  │
│ CHOICE 2: Skip nums[0] = 1                                     │
│   current = [] (no change)                                     │
│   ┌────────────────────────────────────────────────────────┐   │
│   │ CALL 5: generate([1,2], 1, [], result)                │   │
│   ├────────────────────────────────────────────────────────┤   │
│   │ index = 1, current = [], nums.length = 2              │   │
│   │ Base case? 1 == 2 → Nahi                              │   │
│   │                                                        │   │
│   │ CHOICE 1: Include nums[1] = 2                         │   │
│   │   current.push(2) → current = [2]                     │   │
│   │   ┌──────────────────────────────────────────────┐   │   │
│   │   │ CALL 6: generate([1,2], 2, [2], result)     │   │   │
│   │   ├──────────────────────────────────────────────┤   │   │
│   │   │ index = 2, current = [2]                    │   │   │
│   │   │ Base case? 2 == 2 → Haan! ✓                │   │   │
│   │   │                                              │   │   │
│   │   │ result.push([2])                            │   │   │
│   │   │ result = [[1,2], [1], [2]]                  │   │   │
│   │   │ Return                                       │   │   │
│   │   └──────────────────────────────────────────────┘   │   │
│   │   BACKTRACK: current.pop() → current = []             │   │
│   │                                                        │   │
│   │ CHOICE 2: Skip nums[1] = 2                            │   │
│   │   current = [] (no change)                            │   │
│   │   ┌──────────────────────────────────────────────┐   │   │
│   │   │ CALL 7: generate([1,2], 2, [], result)      │   │   │
│   │   ├──────────────────────────────────────────────┤   │   │
│   │   │ index = 2, current = []                     │   │   │
│   │   │ Base case? 2 == 2 → Haan! ✓                │   │   │
│   │   │                                              │   │   │
│   │   │ result.push([])                             │   │   │
│   │   │ result = [[1,2], [1], [2], []]              │   │   │
│   │   │ Return                                       │   │   │
│   │   └──────────────────────────────────────────────┘   │   │
│   │ Return                                                 │   │
│   └────────────────────────────────────────────────────────┘   │
│ Return                                                          │
└──────────────────────────────────────────────────────────────────┘

Final Result: [[1,2], [1], [2], []]

Verification:
✓ Total subsets = 2^2 = 4
✓ Empty subset included
✓ Saare combinations present hain
✓ Koi duplicates nahi
```

---

## Backtracking Kyun Zaroori Hai?

**Backtracking ka matlab:** Changes ko undo karna taaki dusra path explore kar sakein.

**Example:**
```
current = []

// Include 1
current.push(1) → [1]
  // Explore path with 1

  current.pop()   // ← BACKTRACK!

current = []  // Wapas original state

// Skip 1 path
  // Explore path without 1
```

**Agar backtracking nahi karte:**
```
current = []
current.push(1) → [1]
  current.push(2) → [1,2]  ✓
  // Skip 2 path explore karna hai
  // Lekin current abhi bhi [1,2] hai!
  // [1] path miss ho jayega ✗
```

**With backtracking:**
```
current = []
current.push(1) → [1]
  current.push(2) → [1,2]  ✓
  current.pop()    → [1]   // Backtrack!
  // Ab [1] path explore kar sakte hain ✓
```

**Visual:**
```
           []
          /
        [1]  ← Yahan aaye
        /
     [1,2]  ← Include 2, base case, add to result
       ↓
      [1]   ← pop() se wapas aaye (BACKTRACK)
       ↓
      [1]   ← Skip 2, base case, add to result
       ↓
      []    ← pop() se wapas aaye (BACKTRACK)
       ↓
      []    ← Ab skip 1 path explore karo
```

---

## Time & Space Complexity

**Time Complexity: O(n × 2^n)**

**Kyun?**
- Total subsets: **2^n**
- Har subset ko copy karne mein: **O(n)** worst case (jab saare elements include hon)
- Total: **O(n × 2^n)**

**Detailed breakdown:**
```
n = 3 ke liye:
  - Total subsets = 2^3 = 8
  - Largest subset size = 3
  - Worst case: 8 × 3 = 24 operations
```

**Simple shabdon mein:**
Agar array mein 10 elements hain, toh 2^10 = 1024 subsets generate hongi. Har subset ko copy karne mein average O(5) operations (average subset size n/2 hai), toh roughly 1024 × 5 = 5000 operations.

**Space Complexity: O(n)**

**Kyun?**
- Recursion depth: **O(n)** (maximum n levels deep)
- Current subset array: **O(n)** (maximum n elements)
- **Output space:** O(n × 2^n) to store all subsets (ye count nahi karte usually)

**Recursion stack:**
```
Level 0: index=0
Level 1: index=1
Level 2: index=2
...
Level n: index=n (base case)

Maximum depth = n
```

---

## Edge Cases

### 1. Single element
```
Input: nums = [1]
Output: [[], [1]]
Explanation: 2^1 = 2 subsets
```

### 2. Maximum size (10 elements)
```
Input: nums = [1,2,3,4,5,6,7,8,9,10]
Output: 2^10 = 1024 subsets!
Explanation: Still manageable
```

### 3. Negative numbers
```
Input: nums = [-1, 0, 1]
Output: [[], [-1], [0], [-1,0], [1], [-1,1], [0,1], [-1,0,1]]
Explanation: Negative numbers bhi same way handle hote hain
```

### 4. Empty result subset
```
Empty subset [] hamesha result mein hota hai
Kyunki: Jab sab elements skip karte hain, toh [] milta hai
```

---

## Alternative Approach: Iterative (Cascading)

Recursive ke alawa, iterative bhi kar sakte ho:

```
subsets(nums):
    result = [[]]  // Empty subset se start

    for num in nums:
        newSubsets = []
        for subset in result:
            newSubsets.push([...subset, num])
        result = result.concat(newSubsets)

    return result
```

**Example [1,2]:**
```
Start: result = [[]]

Process 1:
  Existing: [[]]
  Add 1 to each: [[1]]
  result = [[], [1]]

Process 2:
  Existing: [[], [1]]
  Add 2 to each: [[2], [1,2]]
  result = [[], [1], [2], [1,2]]
```

**Trade-offs:**
- Iterative: Easier to understand, no recursion overhead
- Recursive: More elegant, natural backtracking pattern

---

## Pattern Recognition: Power Set Pattern

**Formula:** For n unique elements, total subsets = **2^n**

**Why?**
Har element ke liye 2 choices (include/exclude):
```
Element 1: 2 choices
Element 2: 2 choices
Element 3: 2 choices
...
Total: 2 × 2 × 2 × ... (n times) = 2^n
```

**Comparison with Other Problems:**

| Problem | Pattern | Choices per Element | Total Combinations |
|---------|---------|--------------------|--------------------|
| **Binary Strings (n=3)** | Include '0' or '1' | 2 | 2^3 = 8 |
| **Subsets (n=3)** | Include or Skip | 2 | 2^3 = 8 |
| **Parentheses (n=3)** | '(' or ')' with constraints | 2 (conditional) | 5 (Catalan) |

**Dhyan do:**
- Binary strings aur Subsets mein same count hai (2^n)
- Lekin Parentheses mein constraints ki wajah se kam (Catalan number)

---

## Common Mistakes to Avoid

❌ **Backtracking bhoolna** - `pop()` nahi kiya
```javascript
// WRONG
current.push(nums[index]);
generate(index + 1, current);
// current.pop() bhool gaye! ✗
generate(index + 1, current);
```

❌ **Reference copy karna** - Array reference add kar diya instead of copy
```javascript
// WRONG
result.push(current);  // Reference add ho gaya ✗

// CORRECT
result.push([...current]);  // Copy add karo ✓
```

❌ **Base case galat** - Index bounds check nahi kiya
```javascript
// WRONG
if (current.length === n) // ✗

// CORRECT
if (index === nums.length) // ✓
```

❌ **Empty subset bhoolna** - Empty subset ko handle nahi kiya
```javascript
// Agar sab elements skip karte hain, [] result mein aana chahiye
```

✅ **Hamesha backtrack karo** (`pop()`) recursive call ke baad
✅ **Array ka copy add karo** result mein, reference nahi
✅ **Index-based base case** use karo
✅ **Empty subset automatic hai** - sab skip karoge toh milega

---

## Interview Tips

**Interviewer ko kya bolna hai:**

*"Ye ek power set generation problem hai jisme hum backtracking use karte hain. Har element ke liye do choices hain: use include karu current subset mein ya skip karu. Hum recursively har element ko process karte hain. Base case tab hit hoti hai jab saare elements process ho chuke hon - tab current subset ko result mein add kar dete hain. Important part hai backtracking - include karne ke baad recursive call se wapas aaye toh element ko pop karke undo karna padta hai, taaki skip wala path bhi explore kar sakein. Total 2^n subsets generate hote hain."*

**Follow-up Questions:**

**Q: Kitne subsets honge n elements ke liye?**
A: 2^n subsets. Har element ke liye 2 choices hain (include/exclude), toh total 2^n combinations.

**Q: Kya iteratively kar sakte ho?**
A: Haan! Cascading approach - empty set se start karo, har element ke liye existing subsets ki copy banake nayi element add karo. Time complexity same rahegi O(n × 2^n).

**Q: Agar duplicates hon array mein?**
A: Tab pehle sort karo, phir backtracking mein check karo - agar current element previous ke equal hai aur previous skip kiya tha, toh current ko bhi skip karo (duplicate subsets avoid karne ke liye).

**Q: Space optimize kar sakte ho?**
A: Recursion depth toh O(n) hi rahega. Current array ki jagah StringBuilder ya index tracking use kar sakte ho, but overall complexity same rahega.

**Q: Bit manipulation se kar sakte ho?**
A: Haan! 0 se 2^n-1 tak iterate karo. Har number ka binary representation ek subset represent karta hai. Agar i-th bit set hai toh i-th element include karo.

---

## Related Problems

**Similar Pattern (Include/Exclude Backtracking):**
- Combination Sum
- Permutations
- Letter Case Permutation
- Subsets II (with duplicates)

**Similar Pattern (Power Set):**
- Generate all binary strings
- All possible combinations of k elements

Sabhi mein har element ke liye choices banani padti hain!

---

Implementation dekhna hai? 🤔