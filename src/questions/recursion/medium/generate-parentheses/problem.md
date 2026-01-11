# Generate Parentheses

**Difficulty**: Medium
**Topics**: Recursion, Backtracking, String
**Source**: LeetCode

---

## Problem Statement

[generate-parentheses](https://leetcode.com/problems/generate-parentheses/)

`n` pairs of parentheses diye gaye hain, tumhe sabhi **well-formed (valid)** parentheses combinations generate karne hain.

**Well-formed** matlab:
- Har opening bracket `(` ke liye ek closing bracket `)` hona chahiye
- Har point pe closing brackets ki count opening se zyada nahi honi chahiye
- Example: `"(())"` valid hai, `"())("` invalid hai

---

## Prerequisites (Agar Koi Chahiye)

**Optional Background Knowledge** (recursion ke baad seekh sakte ho):

**Backtracking:**
- Ye ek classic backtracking problem hai
- Agar abhi tak backtracking nahi seekhi toh koi baat nahi!
- Is problem ko solve karte hue backtracking naturally samajh aa jayega

**Tumhe kya chahiye:**
- ✅ Basic recursion samajh (base case + recursive case)
- ✅ String building/concatenation comfortable ho
- ✅ Decision making at each step (choices banana)

**Bottom Line**: Sirf recursion knowledge se solve ho jayega. Backtracking concept apne aap clear ho jayega!

---

### Examples:

**Example 1:**
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Explanation:
3 pairs matlab 3 opening aur 3 closing brackets.
Total 6 characters, but sirf valid combinations chahiye.

Valid combinations:
  ((()))  - nested
  (()())  - mixed
  (())()  - mixed
  ()(())  - mixed
  ()()()  - sequential

Invalid (ye nahi chahiye):
  ((()   - closing kam hai
  ())(   - closing pehle aa gaya
  ))(((  - wrong order
```

**Example 2:**
```
Input: n = 1
Output: ["()"]

Explanation:
1 pair matlab sirf ek hi valid combination: "()"
```

**Example 3:**
```
Input: n = 2
Output: ["(())","()()"]

Explanation:
2 pairs ke sirf 2 valid combinations hain:
  (())  - nested
  ()()  - sequential
```

---

### Constraints:
- `1 ≤ n ≤ 8`
- Output mein sirf valid parentheses combinations honi chahiye

---

## Intuition (Soch)

### The Challenge

Binary strings mein humne `'0'` ya `'1'` add kiye - koi restriction nahi tha.

**Yahan problem hai:**
- Hum `'('` ya `')'` freely add nahi kar sakte
- Agar galat order mein add kiye toh invalid combination ban jayega

**Example:**
```
"((("  ← Invalid (closing nahi hai)
"())"  ← Invalid (closing zyada ho gaye)
"()"   ← Valid ✓
```

### The Key Insight

**Kab '(' add kar sakte hain?**
- Jab tak humne saare `n` opening brackets use nahi kiye

**Kab ')' add kar sakte hain?**
- Jab **closing count < opening count** ho
- Matlab pehle opening aana chahiye, tabhi closing valid hoga

**Visual Example (n=2):**

```
Start: ""
Opening count = 0, Closing count = 0

Can add '(' ? → Yes (0 < 2)
  Current: "("
  Opening = 1, Closing = 0

  Can add '(' ? → Yes (1 < 2)
    Current: "(("
    Opening = 2, Closing = 0

    Can add '(' ? → No (2 == 2, limit reached)
    Can add ')' ? → Yes (0 < 2)
      Current: "(()"
      Opening = 2, Closing = 1

      Can add ')' ? → Yes (1 < 2)
        Current: "(())"  ← Complete! ✓
        Opening = 2, Closing = 2

  Can add ')' ? → Yes (0 < 1)
    Current: "()"
    Opening = 1, Closing = 1

    Can add '(' ? → Yes (1 < 2)
      Current: "()("
      Opening = 2, Closing = 1

      Can add ')' ? → Yes (1 < 2)
        Current: "()()"  ← Complete! ✓
        Opening = 2, Closing = 2
```

### Decision Tree (n=2)

```
                          ""
                         /
                      "("
                    /    \
                 "(("    "()"
                  |       |
               "(()"    "()("
                  |       |
              "((()))"  "()()"
                 ✓        ✓
```

**Dhyan do:** Har node pe hum decision lete hain:
1. `'('` add kar sakte hain? (agar opening < n)
2. `')'` add kar sakte hain? (agar closing < opening)

---

## Approach: Recursive Backtracking with Constraints

### Algorithm

```
generateParenthesis(n):
    result = []
    generate("", 0, 0, n, result)
    return result

generate(current, open, close, n, result):
    // BASE CASE: String complete ho gayi
    // Jab dono open aur close n ke equal ho jayein
    if open == n AND close == n:
        result.push(current)
        return

    // RECURSIVE CASE 1: Try adding '(' agar allowed hai
    if open < n:
        generate(current + '(', open + 1, close, n, result)

    // RECURSIVE CASE 2: Try adding ')' agar allowed hai
    if close < open:
        generate(current + ')', open, close + 1, n, result)
```

**Key Parameters:**
- `current`: Current string jo build ho rahi hai
- `open`: Kitne opening brackets use ho chuke
- `close`: Kitne closing brackets use ho chuke
- `n`: Total pairs
- `result`: Valid combinations store karne ke liye

**Constraints:**
1. `open < n` → Tab hi `'('` add kar sakte hain
2. `close < open` → Tab hi `')'` add kar sakte hain (validity ensure karta hai)

---

## Complete Dry Run (n=2)

**Input**: `n = 2`

**Expected Output**: `["(())", "()()"]`

### Decision Tree with Counters:

```
                    "" (open=0, close=0)
                    |
                    ↓ Add '(' (allowed: 0<2)
                  "(" (open=1, close=0)
                 /                    \
    Add '(' (1<2)                    Add ')' (0<1)
               /                        \
         "((" (2,0)                    "()" (1,1)
              |                          |
      Add ')' (0<2)                Add '(' (1<2)
              |                          |
        "(()" (2,1)                  "()(" (2,1)
              |                          |
      Add ')' (1<2)                Add ')' (1<2)
              |                          |
        "(())" (2,2)               "()()" (2,2)
           ✓                           ✓
```

### Detailed Trace:

```
┌──────────────────────────────────────────────────────────────────┐
│ CALL 1: generate("", 0, 0, 2, result)                            │
├──────────────────────────────────────────────────────────────────┤
│ current = ""                                                     │
│ open = 0, close = 0, n = 2                                      │
│ Base case? 0==2 AND 0==2 → Nahi                                │
│                                                                  │
│ Try '(' : open < n? 0 < 2 → Haan! ✓                            │
│   ┌────────────────────────────────────────────────────────┐   │
│   │ CALL 2: generate("(", 1, 0, 2, result)                 │   │
│   ├────────────────────────────────────────────────────────┤   │
│   │ current = "("                                          │   │
│   │ open = 1, close = 0, n = 2                            │   │
│   │ Base case? 1==2 AND 0==2 → Nahi                       │   │
│   │                                                        │   │
│   │ Try '(': open < n? 1 < 2 → Haan! ✓                   │   │
│   │   ┌──────────────────────────────────────────────┐   │   │
│   │   │ CALL 3: generate("((", 2, 0, 2, result)      │   │   │
│   │   ├──────────────────────────────────────────────┤   │   │
│   │   │ current = "(("                               │   │   │
│   │   │ open = 2, close = 0, n = 2                  │   │   │
│   │   │ Base case? 2==2 AND 0==2 → Nahi             │   │   │
│   │   │                                              │   │   │
│   │   │ Try '(': open < n? 2 < 2 → Nahi ✗          │   │   │
│   │   │ (Saare opening use ho gaye!)                │   │   │
│   │   │                                              │   │   │
│   │   │ Try ')': close < open? 0 < 2 → Haan! ✓     │   │   │
│   │   │   ┌────────────────────────────────────┐   │   │   │
│   │   │   │ CALL 4: generate("(()", 2, 1, 2)   │   │   │   │
│   │   │   ├────────────────────────────────────┤   │   │   │
│   │   │   │ current = "(()"                    │   │   │   │
│   │   │   │ open = 2, close = 1, n = 2        │   │   │   │
│   │   │   │ Base case? 2==2 AND 1==2 → Nahi   │   │   │   │
│   │   │   │                                    │   │   │   │
│   │   │   │ Try '(': 2 < 2 → Nahi ✗          │   │   │   │
│   │   │   │ Try ')': 1 < 2 → Haan! ✓         │   │   │   │
│   │   │   │   ┌──────────────────────────┐   │   │   │   │
│   │   │   │   │ CALL 5: generate("(()")  │   │   │   │   │
│   │   │   │   │         2, 2, 2)         │   │   │   │   │
│   │   │   │   ├──────────────────────────┤   │   │   │   │
│   │   │   │   │ current = "(())"         │   │   │   │   │
│   │   │   │   │ open = 2, close = 2      │   │   │   │   │
│   │   │   │   │ Base case? 2==2 AND 2==2 │   │   │   │   │
│   │   │   │   │ → Haan! BASE CASE! ✓    │   │   │   │   │
│   │   │   │   │                          │   │   │   │   │
│   │   │   │   │ result.push("(())")      │   │   │   │   │
│   │   │   │   │ result = ["(())"]        │   │   │   │   │
│   │   │   │   │ Return                   │   │   │   │   │
│   │   │   │   └──────────────────────────┘   │   │   │   │
│   │   │   │ Return                             │   │   │   │
│   │   │   └────────────────────────────────────┘   │   │   │
│   │   │ Return                                      │   │   │
│   │   └──────────────────────────────────────────────┘   │   │
│   │                                                        │   │
│   │ Try ')': close < open? 0 < 1 → Haan! ✓              │   │
│   │   ┌──────────────────────────────────────────────┐   │   │
│   │   │ CALL 6: generate("()", 1, 1, 2, result)      │   │   │
│   │   ├──────────────────────────────────────────────┤   │   │
│   │   │ current = "()"                               │   │   │
│   │   │ open = 1, close = 1, n = 2                  │   │   │
│   │   │ Base case? 1==2 AND 1==2 → Nahi             │   │   │
│   │   │                                              │   │   │
│   │   │ Try '(': 1 < 2 → Haan! ✓                   │   │   │
│   │   │   ┌────────────────────────────────────┐   │   │   │
│   │   │   │ CALL 7: generate("()(", 2, 1, 2)   │   │   │   │
│   │   │   ├────────────────────────────────────┤   │   │   │
│   │   │   │ current = "()("                    │   │   │   │
│   │   │   │ open = 2, close = 1, n = 2        │   │   │   │
│   │   │   │ Base case? 2==2 AND 1==2 → Nahi   │   │   │   │
│   │   │   │                                    │   │   │   │
│   │   │   │ Try '(': 2 < 2 → Nahi ✗          │   │   │   │
│   │   │   │ Try ')': 1 < 2 → Haan! ✓         │   │   │   │
│   │   │   │   ┌──────────────────────────┐   │   │   │   │
│   │   │   │   │ CALL 8: generate("()()")  │   │   │   │   │
│   │   │   │   │         2, 2, 2)         │   │   │   │   │
│   │   │   │   ├──────────────────────────┤   │   │   │   │
│   │   │   │   │ current = "()()"         │   │   │   │   │
│   │   │   │   │ open = 2, close = 2      │   │   │   │   │
│   │   │   │   │ Base case? 2==2 AND 2==2 │   │   │   │   │
│   │   │   │   │ → Haan! BASE CASE! ✓    │   │   │   │   │
│   │   │   │   │                          │   │   │   │   │
│   │   │   │   │ result.push("()()")      │   │   │   │   │
│   │   │   │   │ result = ["(())","()()"] │   │   │   │   │
│   │   │   │   │ Return                   │   │   │   │   │
│   │   │   │   └──────────────────────────┘   │   │   │   │
│   │   │   │ Return                             │   │   │   │
│   │   │   └────────────────────────────────────┘   │   │   │
│   │   │                                              │   │   │
│   │   │ Try ')': 1 < 1 → Nahi ✗                    │   │   │
│   │   │ (close already equal to open hai)           │   │   │
│   │   │ Return                                       │   │   │
│   │   └──────────────────────────────────────────────┘   │   │
│   │ Return                                                 │   │
│   └────────────────────────────────────────────────────────┘   │
│                                                                  │
│ Try ')': close < open? 0 < 0 → Nahi ✗                         │
│ (Empty string mein closing nahi aa sakta)                      │
│ Return                                                          │
└──────────────────────────────────────────────────────────────────┘

Final Result: ["(())", "()()"]

Verification:
✓ Total combinations = Catalan number C(2) = 2
✓ Dono valid hain
✓ Koi invalid combination nahi
```

---

## Why Constraints Work (Validity Kaise Ensure Hoti Hai)

### Constraint 1: `open < n`

**Matlab:** Opening brackets tabhi add karo jab limit se kam ho.

**Example:**
```
n = 2
"(("  ← open = 2 (limit reached)
"(((" ← Invalid! open > n
```

### Constraint 2: `close < open`

**Matlab:** Closing bracket tabhi add karo jab opening se kam ho.

**Ye ensure karta hai:**
1. Pehle opening aaye, phir closing
2. Kabhi bhi closing zyada na ho

**Example:**
```
"("   → open=1, close=0 → Can add ')'? 0<1 ✓
"()"  → open=1, close=1 → Can add ')'? 1<1 ✗

"())" → Invalid! (agar ye add hota)
```

**Visual:**
```
       (  )  )  ← Invalid
open:  1  1  1
close: 0  1  2  ← close > open ✗

       (  (  )
open:  1  2  2
close: 0  0  1  ← close < open ✓
```

---

## Time & Space Complexity

**Time Complexity: O(4^n / √n)**

**Kyun?**

Ye actually **Catalan Number** hai!

**Catalan Number Formula:**
```
C(n) = (2n)! / ((n+1)! × n!)
     ≈ 4^n / (n^(3/2) × √π)
```

**Simple shabdon mein:**
- n=1: 1 combination
- n=2: 2 combinations
- n=3: 5 combinations
- n=4: 14 combinations
- n=8: 1430 combinations

**Why not 2^(2n)?**
- Binary strings mein sabhi combinations valid thi
- Yahan constraints ki wajah se bahut kam combinations valid hain

**Space Complexity: O(n)**

**Kyun?**
- Recursion depth: Maximum **2n** (har level pe ek character add hota hai)
- Actually O(n) hi hai kyunki n pairs = 2n characters
- Stack space: O(n)
- **Output space:** O(4^n / √n) to store all valid combinations

---

## Edge Cases

### 1. n = 1 (Minimum)
```
Input: n = 1
Output: ["()"]
Explanation: Sirf ek valid combination
```

### 2. n = 8 (Maximum)
```
Input: n = 8
Output: 1430 combinations!
Explanation: Constraint limit hai, but abhi bhi manageable
```

### 3. n = 3 (Common case)
```
Input: n = 3
Output: 5 combinations
["((()))","(()())","(())()","()(())","()()()"]
```

---

## Catalan Number Pattern

Ye problem **Catalan Number sequence** follow karta hai:

```
n | Valid Combinations | Catalan C(n)
--|-------------------|-------------
1 |        1          |      1
2 |        2          |      2
3 |        5          |      5
4 |       14          |     14
5 |       42          |     42
6 |      132          |    132
7 |      429          |    429
8 |     1430          |   1430
```

**Formula:**
```
C(0) = 1
C(n) = C(0)×C(n-1) + C(1)×C(n-2) + ... + C(n-1)×C(0)
```

**Other problems using Catalan Numbers:**
- Unique Binary Search Trees
- Ways to triangulate a polygon
- Number of paths in a grid (without crossing diagonal)

---

## Pattern Recognition: Constrained Backtracking

**Normal Backtracking (Binary Strings):**
```
generate(current, n):
    if length == n:
        add to result

    try '0'  ← Always allowed
    try '1'  ← Always allowed
```

**Constrained Backtracking (Parentheses):**
```
generate(current, open, close, n):
    if open == n AND close == n:
        add to result

    if open < n:      ← Conditional!
        try '('

    if close < open:  ← Conditional!
        try ')'
```

**Key Difference:** Constraints decide kab kya choice valid hai!

---

## Comparison with Other Problems

| Problem | Constraint | Total Combinations | Valid Combinations |
|---------|-----------|-------------------|-------------------|
| **Binary Strings (n=3)** | None | 2^3 = 8 | 8 (all valid) |
| **Generate Parentheses (n=3)** | close < open | 2^6 = 64 | 5 (Catalan) |

**Dhyan do:** Constraints ki wajah se 64 mein se sirf 5 valid hain!

---

## Common Mistakes to Avoid

❌ **Base case galat** - Sirf `current.length == 2n` check karna
   - `open==n AND close==n` dono check karo

❌ **Constraints bhoolna** - `'('` aur `')'` freely add karna
   - Hamesha `open < n` aur `close < open` check karo

❌ **Order galat** - Pehle closing try karna
   - Doesn't matter technically, but pehle opening try karna cleaner hai

❌ **Counter update bhoolna** - Recursion mein open/close increment nahi karna
   - Har recursive call mein sahi values pass karo

✅ **Dono constraints check karo** validity ke liye
✅ **Base case mein dono counters check karo**
✅ **Counters ko sahi update karo** recursive calls mein
✅ **Catalan number samajho** expected output ke liye

---

## Interview Tips

**Interviewer ko kya bolna hai:**

*"Ye ek constrained backtracking problem hai jisme hum valid parentheses combinations generate karte hain. Hum recursively string build karte hain, lekin har step pe constraints check karte hain. Opening bracket tabhi add kar sakte hain jab abhi tak n se kam use ho chuke hon. Closing bracket tabhi add kar sakte hain jab closing count opening se kam ho - ye ensure karta hai ki har point pe string valid rahe. Base case tab hit hoti hai jab dono counters n ke equal ho jayein."*

**Follow-up Questions:**

**Q: Kitne valid combinations honge n pairs ke liye?**
A: Catalan Number C(n) = (2n)! / ((n+1)! × n!). Approximately 4^n / √n.

**Q: Kya iteratively kar sakte ho?**
A: Haan, stack use karke, lekin recursive solution zyada natural aur readable hai is problem ke liye.

**Q: Agar balanced nahi chahiye, sirf distinct combinations?**
A: Toh constraint 2 hatao (`close < open`). Lekin phir invalid combinations bhi aa jayengi.

**Q: Time complexity analysis?**
A: O(4^n / √n) - Catalan number ke proportional. Har valid string build karne mein O(n) lagta hai.

**Q: Space optimize kar sakte ho?**
A: Recursion depth O(2n) = O(n) hi hai. String immutability ki wajah se extra space lagta hai, but StringBuilder use kar sakte ho.

---

## Related Problems

**Similar Pattern (Catalan Numbers):**
- Unique Binary Search Trees (n nodes se kitne BST ban sakte hain)
- Different Ways to Add Parentheses
- Valid Parenthesis String (with wildcards)

**Similar Pattern (Constrained Backtracking):**
- Letter Combinations of Phone Number
- Combination Sum
- Sudoku Solver
- N-Queens

Sabhi mein constraints ke saath choices banani padti hain!

---

Implementation dekhna hai? 🤔
