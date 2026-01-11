# Generate All Binary Strings

**Difficulty**: Medium
**Topics**: Recursion, Backtracking, Combinatorics
**Source**: GeeksforGeeks

---

## Problem Statement

[generate-binary-strings](https://www.geeksforgeeks.org/problems/generate-all-binary-strings/1)

Ek integer `n` diya gaya hai, tumhe **sabhi binary strings** generate karni hain jo length `n` ki hon.

**Note**: Strings ko **ascending order** (lexicographically sorted) mein return karna hai.

---

## Prerequisites (Agar Koi Chahiye)

**Optional Background Knowledge** (recursion ke baad seekh sakte ho):

**Binary Numbers:**
- Ye problem binary strings generate karti hai (strings jo sirf 0s aur 1s contain karti hain)
- Tumhe binary/base-2 number system ki deep knowledge ki zaroorat nahi
- Bas itna samjho: har position pe 0 ya 1 ho sakta hai
- Example: "101" ek string hai jisme teen characters hain: '1', '0', '1'

**Backtracking:**
- Ye ek backtracking problem pattern hai
- Agar abhi tak backtracking nahi seekhi toh koi baat nahi!
- Ye recursive approach tumhe backtracking naturally samajhne mein help karega
- Backtracking ko alag topic ke taur pe recursion master karne ke baad padh sakte ho

**Tumhe kya chahiye:**
- ✅ Basic recursion samajh (base case + recursive case)
- ✅ Decision trees samajh (har step pe choices banana)
- ✅ String building/concatenation comfortable ho

**Bottom Line**: Tum is problem ko sirf recursion knowledge se solve kar sakte ho. Binary numbers aur backtracking concepts is problem ko karte hue samajh aa jayenge!

---

### Examples:

**Example 1:**
```
Input: n = 2
Output: ["00", "01", "10", "11"]

Explanation:
n=2 ke liye, har position pe 0 ya 1 ho sakta hai.
Total combinations: 2^2 = 4

Saari possible strings:
  00 (decimal mein 0)
  01 (decimal mein 1)
  10 (decimal mein 2)
  11 (decimal mein 3)
```

**Example 2:**
```
Input: n = 3
Output: ["000", "001", "010", "011", "100", "101", "110", "111"]

Explanation:
n=3 ke liye, har position pe 0 ya 1 ho sakta hai.
Total combinations: 2^3 = 8

Saari possible strings:
  000 (decimal mein 0)
  001 (decimal mein 1)
  010 (decimal mein 2)
  011 (decimal mein 3)
  100 (decimal mein 4)
  101 (decimal mein 5)
  110 (decimal mein 6)
  111 (decimal mein 7)
```

**Example 3:**
```
Input: n = 1
Output: ["0", "1"]

Explanation: Length 1 ki sirf 2 possible strings hain
```

---

### Constraints:
- `1 ≤ n ≤ 20`
- Total strings generated: 2^n (n=20 ke liye 1,048,576 tak ho sakti hain)

---

## Intuition (Soch)

### The Pattern

Binary strings banana ek series of **choices** banane jaisa hai:

```
Position 0: 0 ya 1 choose karo
Position 1: 0 ya 1 choose karo
Position 2: 0 ya 1 choose karo
...
Position n-1: 0 ya 1 choose karo
```

Har position pe humein **2 choices** hain. `n` positions ke saath, humein **2^n** total combinations milte hain.

### Decision Tree (n=2)

```
                    ""
                  /    \
               "0"      "1"
              /  \      /  \
           "00" "01"  "10" "11"
            ✓    ✓     ✓    ✓
         (done) (done) (done) (done)
```

**Key Observations:**
1. Empty string `""` se start karo
2. Har step pe, DO choices mein branch karo: `'0'` append karo ya `'1'` append karo
3. Jab string length `n` tak pahunch jaye, toh humein complete binary string mil gayi
4. Ascending order ke liye, hamesha `'0'` ko `'1'` se **pehle** try karo

### Ye Kyun Kaam Karta Hai

**Recursive Pattern:**
```
Length n ki saari binary strings generate karne ke liye:
  1. Agar current string ki length == n → Result mein add karo (base case)
  2. Warna:
     - '0' append karke, recursively baaki generate karo
     - '1' append karke, recursively baaki generate karo
```

**Example n=2 ke liye:**
```
Start: ""

'0' try karo:
  Current: "0"
  Length < 2, continue karo

  '0' try karo:
    Current: "00"
    Length == 2 → "00" add karo ✓

  '1' try karo:
    Current: "01"
    Length == 2 → "01" add karo ✓

'1' try karo:
  Current: "1"
  Length < 2, continue karo

  '0' try karo:
    Current: "10"
    Length == 2 → "10" add karo ✓

  '1' try karo:
    Current: "11"
    Length == 2 → "11" add karo ✓

Result: ["00", "01", "10", "11"] ✓
```

---

## Approach: Recursive Backtracking

### Algorithm

```
generateBinaryStrings(n):
    result = []
    generate("", n, result)
    return result

generate(current, n, result):
    // BASE CASE: String complete ho gayi
    if current.length == n:
        result.push(current)
        return

    // RECURSIVE CASE: String ko character by character build karo
    // Pehle '0' try karo (ascending order ke liye)
    generate(current + '0', n, result)

    // Phir '1' try karo
    generate(current + '1', n, result)
```

**Ye Ascending Order Kyun Produce Karta Hai:**
- Hum hamesha `'0'` ko `'1'` se **pehle** try karte hain
- Ye naturally lexicographic ordering ensure karta hai
- `"00"`, `"01"` se pehle aata hai, jo `"10"` se pehle aata hai, etc.

---

## Complete Dry Run (n=3)

**Input**: `n = 3`

**Recursion Tree:**

```
                              ""
                            /    \
                         "0"      "1"
                        /   \     /   \
                     "00"  "01" "10"  "11"
                     / \    / \   / \   / \
                  "000" "001" "010" "011" "100" "101" "110" "111"
                   ✓     ✓     ✓     ✓     ✓     ✓     ✓     ✓
```

**Detailed Trace:**

```
┌────────────────────────────────────────────────────────────┐
│ CALL: generate("", 3, result)                              │
├────────────────────────────────────────────────────────────┤
│ current = ""                                               │
│ length = 0, n = 3 → Abhi complete nahi hua                │
│ Pehle '0' try karo:                                        │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ CALL: generate("0", 3, result)                       │ │
│   ├──────────────────────────────────────────────────────┤ │
│   │ current = "0"                                        │ │
│   │ length = 1, n = 3 → Abhi complete nahi hua         │ │
│   │ '0' try karo:                                        │ │
│   │   ┌────────────────────────────────────────────────┐ │ │
│   │   │ CALL: generate("00", 3, result)                │ │ │
│   │   ├────────────────────────────────────────────────┤ │ │
│   │   │ current = "00"                                 │ │ │
│   │   │ length = 2, n = 3 → Abhi complete nahi hua   │ │ │
│   │   │ '0' try karo:                                  │ │ │
│   │   │   ┌──────────────────────────────────────────┐ │ │ │
│   │   │   │ CALL: generate("000", 3, result)        │ │ │ │
│   │   │   ├──────────────────────────────────────────┤ │ │ │
│   │   │   │ current = "000"                          │ │ │ │
│   │   │   │ length = 3, n = 3 → BASE CASE! ✓        │ │ │ │
│   │   │   │ "000" ko result mein add karo            │ │ │ │
│   │   │   │ result = ["000"]                         │ │ │ │
│   │   │   │ Return karo                              │ │ │ │
│   │   │   └──────────────────────────────────────────┘ │ │ │
│   │   │                                                │ │ │
│   │   │ '1' try karo:                                  │ │ │
│   │   │   ┌──────────────────────────────────────────┐ │ │ │
│   │   │   │ CALL: generate("001", 3, result)        │ │ │ │
│   │   │   ├──────────────────────────────────────────┤ │ │ │
│   │   │   │ current = "001"                          │ │ │ │
│   │   │   │ length = 3, n = 3 → BASE CASE! ✓        │ │ │ │
│   │   │   │ "001" ko result mein add karo            │ │ │ │
│   │   │   │ result = ["000", "001"]                  │ │ │ │
│   │   │   │ Return karo                              │ │ │ │
│   │   │   └──────────────────────────────────────────┘ │ │ │
│   │   │                                                │ │ │
│   │   │ Return karo                                    │ │ │
│   │   └────────────────────────────────────────────────┘ │ │
│   │                                                      │ │
│   │ '1' try karo:                                        │ │
│   │   ┌────────────────────────────────────────────────┐ │ │
│   │   │ CALL: generate("01", 3, result)                │ │ │
│   │   ├────────────────────────────────────────────────┤ │ │
│   │   │ current = "01"                                 │ │ │
│   │   │ length = 2, n = 3 → Abhi complete nahi hua   │ │ │
│   │   │ '0' try karo:                                  │ │ │
│   │   │   generate("010", 3, result)                  │ │ │
│   │   │     "010" add karo → result = ["000","001","010"] │ │
│   │   │ '1' try karo:                                  │ │ │
│   │   │   generate("011", 3, result)                  │ │ │
│   │   │     "011" add → result = ["000","001","010","011"] │ │
│   │   │ Return karo                                    │ │ │
│   │   └────────────────────────────────────────────────┘ │ │
│   │                                                      │ │
│   │ Return karo                                          │ │
│   └──────────────────────────────────────────────────────┘ │
│                                                            │
│ '1' try karo:                                              │
│   ┌──────────────────────────────────────────────────────┐ │
│   │ CALL: generate("1", 3, result)                       │ │
│   ├──────────────────────────────────────────────────────┤ │
│   │ current = "1"                                        │ │
│   │ length = 1, n = 3 → Abhi complete nahi hua         │ │
│   │ '0' try karo:                                        │ │
│   │   ┌────────────────────────────────────────────────┐ │ │
│   │   │ CALL: generate("10", 3, result)                │ │ │
│   │   │ '0' try: generate("100", 3)                    │ │ │
│   │   │   "100" add → result = [...,"100"]             │ │ │
│   │   │ '1' try: generate("101", 3)                    │ │ │
│   │   │   "101" add → result = [...,"101"]             │ │ │
│   │   └────────────────────────────────────────────────┘ │ │
│   │                                                      │ │
│   │ '1' try karo:                                        │ │
│   │   ┌────────────────────────────────────────────────┐ │ │
│   │   │ CALL: generate("11", 3, result)                │ │ │
│   │   │ '0' try: generate("110", 3)                    │ │ │
│   │   │   "110" add → result = [...,"110"]             │ │ │
│   │   │ '1' try: generate("111", 3)                    │ │ │
│   │   │   "111" add → result = [...,"111"]             │ │ │
│   │   └────────────────────────────────────────────────┘ │ │
│   │                                                      │ │
│   │ Return karo                                          │ │
│   └──────────────────────────────────────────────────────┘ │
│                                                            │
│ Return karo                                                │
└────────────────────────────────────────────────────────────┘

Final Result: ["000", "001", "010", "011", "100", "101", "110", "111"]

Order: Ascending (lexicographic) ✓
Count: 2^3 = 8 strings ✓
```

---

## Order of Generation (Ascending Kyun?)

**Key**: Hum hamesha har position pe `'0'` ko `'1'` se pehle try karte hain.

```
Position 0: Pehle 0 try karo
  Position 1: Pehle 0 try karo
    Position 2: Pehle 0 try karo → "000" (1st)
    Position 2: Phir 1 try karo  → "001" (2nd)
  Position 1: Phir 1 try karo
    Position 2: Pehle 0 try karo → "010" (3rd)
    Position 2: Phir 1 try karo  → "011" (4th)
Position 0: Phir 1 try karo
  Position 1: Pehle 0 try karo
    Position 2: Pehle 0 try karo → "100" (5th)
    Position 2: Phir 1 try karo  → "101" (6th)
  Position 1: Phir 1 try karo
    Position 2: Pehle 0 try karo → "110" (7th)
    Position 2: Phir 1 try karo  → "111" (8th)
```

Ye **depth-first, left-to-right** exploration naturally ascending order produce karta hai!

---

## Time & Space Complexity

**Time Complexity: O(n × 2^n)**

**Kyun?**
- Total strings generate karni hain: **2^n**
- Har string ko build karne mein **O(n)** time lagta hai (n characters)
- Total: **O(n × 2^n)**

**Simple shabdon mein:**
Agar n=3 hai, toh 2^3 = 8 strings generate hongi, aur har string 3 characters ki hogi, toh roughly 8 × 3 = 24 operations honge.

**Detailed breakdown:**
```
n = 3 ke liye:
  - 2^3 = 8 strings generate karni hain
  - Har string mein 3 characters hain
  - Total operations: 8 × 3 = 24
```

**Space Complexity: O(n)**

**Kyun?**
- Recursion depth: **O(n)** (maximum n calls stack pe)
- String building: **O(n)** per string
- **Output count nahi karte toh**: O(n) stack space
- **Output include karte toh**: O(n × 2^n) saari strings store karne ke liye

**O(2^n) stack space kyun nahi?**
- Recursion depth n hai (2^n nahi)
- Hum n levels deep jaate hain, har level pe 2 choices banate hain
- Kisi bhi point pe, stack pe maximum n frames hote hain

---

## Edge Cases

### 1. n = 1 (Minimum)
```
Input: n = 1
Output: ["0", "1"]
Explanation: Length 1 ki sirf 2 strings hain
```

### 2. n = 20 (Maximum)
```
Input: n = 20
Output: 2^20 = 1,048,576 strings!
Explanation: Ye constraint limit hai
Time: O(n × 2^n) ke saath abhi bhi manageable hai
```

### 3. n = 4 (Medium)
```
Input: n = 4
Output: 16 strings
["0000", "0001", "0010", "0011",
 "0100", "0101", "0110", "0111",
 "1000", "1001", "1010", "1011",
 "1100", "1101", "1110", "1111"]
```

---

## Pattern Recognition: Ye Backtracking Hai!

**Backtracking Template:**
```
explore(current_state, choices_remaining):
    if is_complete(current_state):
        record_solution(current_state)
        return

    for each choice in available_choices:
        make_choice(choice)
        explore(new_state, choices_remaining - 1)
        # String immutable hai toh undo ki zaroorat nahi
```

**Binary Strings pe Apply:**
```
generate(current, n, result):
    if current.length == n:  ← is_complete
        result.push(current)   ← record_solution
        return

    for choice in ['0', '1']:  ← available_choices
        generate(current + choice, n, result)  ← explore
```

---

## Comparison with Other Problems

| Problem | Pattern | Helper Function? | Complexity |
|---------|---------|-----------------|------------|
| **Generate Binary Strings** | Backtracking | Nahi | O(n × 2^n) |
| **Sort Stack** | Combiner | Haan (`insertSorted`) | O(n²) |
| **Reverse Stack** | Combiner | Haan (`insertAtBottom`) | O(n²) |
| **Pow(x, n)** | Divide & Conquer | Nahi | O(log n) |

**Key Differences:**
- **Binary Strings**: Saari possibilities explore karta hai (complete search)
- **Stack problems**: In-place modify karta hai, unwinding ke time kaam hota hai
- **Pow(x, n)**: Single path, koi branching nahi

---

## Ye Medium Problem Kyun Hai

**Challenges**:
1. **Exponential output**: 2^n strings generate karni hain
2. **Recursion visualization**: Decision tree samajhna
3. **Base case clarity**: Kab string complete hui ye recognize karna
4. **Order maintenance**: Ascending order ensure karna (0 pehle 1 baad mein)
5. **Efficiency**: Unnecessary string copies avoid karna

**Stack Problems se Easier Kyun:**
- ✅ Single recursive function (helper ki zaroorat nahi)
- ✅ Simple base case (length check)
- ✅ Backtracking/undo ki zaroorat nahi (strings immutable hain)
- ✅ Straightforward logic (bas 0 ya 1 append karo)

**Challenging Kyun:**
- ❌ Exponential growth (2^n strings)
- ❌ Recursion tree structure samajhna
- ❌ Tree ke saare paths visualize karna

---

## Common Mistakes to Avoid

❌ **Wrong order** - '1' ko '0' se pehle try karna (descending order aa jayega)
❌ **Missing base case** - Infinite recursion ho jayega
❌ **Wrong base case** - `n == 0` check karna `current.length == n` ke bajaye
❌ **Mutating strings** - Bhool jaana ki strings immutable hain
❌ **Complexity nahi samajhna** - O(2^n) sochna O(n × 2^n) ke bajaye

✅ **Hamesha '0' ko '1' se pehle try karo** ascending order ke liye
✅ **Base case string length pe** remaining positions pe nahi
✅ **Nayi strings build karo** existing ko modify mat karo
✅ **Exponential growth samjho** bade n ke liye

---

## Interview Tips

**Interviewer ko kya bolna hai:**

*"Ye ek backtracking problem hai jisme hum har position pe binary choices bana ke saari possible combinations explore karte hain. Hum ise recursively solve kar sakte hain string ko character by character build karke. Har step pe, hum do paths mein branch karte hain: ek mein '0' append karte hain aur dusre mein '1'. Jab string ki length n tak pahunch jati hai, toh ek complete solution mil gaya. Ascending order ensure karne ke liye, hum hamesha '0' ko '1' se pehle try karte hain."*

**Follow-up Questions:**

**Q: Kya ise iteratively kar sakte ho?**
A: Haan! Hum 0 se 2^n - 1 tak loop chala ke har number ko binary string mein convert kar sakte hain. Lekin recursive solution zyada elegant hai aur backtracking understanding demonstrate karta hai.

**Q: Agar sirf aisi strings generate karni hain jisme consecutive 1s na hon?**
A: Constraint check add karo: '1' append tabhi karo agar previous character '1' nahi tha. Ye ek common variation hai.

**Q: Agar n bahut bada ho jaise 25?**
A: 2^25 = 33 million strings! Ye memory issues create kar sakta hai. Ek baar mein ek string generate aur process kar sakte ho generators/iterators use karke instead of sab ko memory mein store karne ke.

**Q: Time complexity analysis?**
A: O(n × 2^n) - hum 2^n strings generate karte hain, har ek mein O(n) operations lagte hain. 2^n dominate karta hai, lekin n factor ko ignore nahi kar sakte.

---

## Related Problems

**Similar Pattern:**
- Generate all subsets (power set)
- Generate all permutations
- Generate all parentheses combinations
- N-Queens problem
- Sudoku solver

Sabhi **backtracking** use karte hain decision trees explore karne ke liye!

---

Implementation dekhna hai? 🤔
