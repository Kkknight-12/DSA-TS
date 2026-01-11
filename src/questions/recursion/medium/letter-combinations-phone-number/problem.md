# Letter Combinations of a Phone Number

## Problem Statement (Hinglish mein)

**Kya karna hai?**
- Tumhe ek string diya gaya hai jisme **digits** hain (2-9)
- Find karo **sabhi possible letter combinations** jo ye digits represent kar sakte hain
- Phone keypad ki tarah (jaise purane phones mein tha!)
- Order matter nahi karta

**Phone Keypad Mapping:**
```
┌─────┬─────┬─────┐
│  2  │  3  │  4  │
│ abc │ def │ ghi │
├─────┼─────┼─────┤
│  5  │  6  │  7  │
│ jkl │ mno │pqrs │
├─────┼─────┼─────┤
│  8  │  9  │     │
│ tuv │wxyz │     │
└─────┴─────┴─────┘

Note: 1 maps to nothing!
```

**Example:**
```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Explanation:
Digit '2' → 'a', 'b', 'c'
Digit '3' → 'd', 'e', 'f'

All combinations:
- 'a' + 'd' = "ad"
- 'a' + 'e' = "ae"
- 'a' + 'f' = "af"
- 'b' + 'd' = "bd"
- 'b' + 'e' = "be"
- 'b' + 'f' = "bf"
- 'c' + 'd' = "cd"
- 'c' + 'e' = "ce"
- 'c' + 'f' = "cf"

Total: 3 × 3 = 9 combinations
```

**Key Points:**
1. Har digit **multiple letters** ko represent karta hai (2-4 letters)
2. **All combinations** generate karne hain
3. **Empty input** → empty array return karo
4. Digits ka order matter karta hai (sequential processing)

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Explore all paths, build solution incrementally
- **Recursion**: Process one digit at a time
- **String Building**: Build combination character by character
- **Hash Map / Object**: Digit to letters mapping

---

## Intuition (Soch) 🤔

### The Challenge: Generate All Combinations

**Example:**
```
Input: "23"

Digit '2' has: ['a', 'b', 'c']
Digit '3' has: ['d', 'e', 'f']

Think of it as a tree:
                    ""
           /        |        \
          a         b         c     (Pick from '2')
        / | \     / | \     / | \
       d  e  f   d  e  f   d  e  f  (Pick from '3')

Leaves: ad, ae, af, bd, be, bf, cd, ce, cf
Total: 9 combinations
```

### The Pattern: Decision Tree

**At each digit:**
1. **Choose** ek letter from current digit ke options
2. **Explore** next digit ke saath
3. **Backtrack** to try other letters

**Example Walkthrough:**
```
digits = "23"
current = ""

Step 1: Process digit '2'
  Options: ['a', 'b', 'c']

  Try 'a': current = "a"
    Step 2: Process digit '3'
      Options: ['d', 'e', 'f']

      Try 'd': current = "ad" ✓ (Complete!)
      Try 'e': current = "ae" ✓ (Complete!)
      Try 'f': current = "af" ✓ (Complete!)
    Backtrack to "a"

  Try 'b': current = "b"
    ... same for 'b'

  Try 'c': current = "c"
    ... same for 'c'
```

---

## Approach 1: Backtracking (Optimal)

### Prerequisites (Agar Koi Chahiye):
- **Backtracking Pattern**: Build solution incrementally, explore all paths
- **String Manipulation**: Build strings character by character
- **Recursion**: Process digits one at a time

### Intuition (Soch):

**Key Insight:**
```
For each digit position:
  - Try each possible letter
  - Recurse for remaining digits
  - Backtrack to try next letter

Total combinations = product of all digit options
Example: "23" → 3 × 3 = 9 combinations
         "234" → 3 × 3 × 3 = 27 combinations
```

### Visual Tree

```
Input: digits = "23"

                        backtrack(index=0, current="")
                              Process digit '2'
                    /              |              \
              Pick 'a'         Pick 'b'        Pick 'c'
                   /                |                \
    backtrack(1,"a")      backtrack(1,"b")    backtrack(1,"c")
    Process digit '3'      Process digit '3'   Process digit '3'
      /    |    \            /    |    \         /    |    \
     d     e     f          d     e     f       d     e     f
     |     |     |          |     |     |       |     |     |
   "ad"  "ae"  "af"       "bd"  "be"  "bf"    "cd"  "ce"  "cf"
    ✓     ✓     ✓          ✓     ✓     ✓       ✓     ✓     ✓

Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Algorithm (Step by Step)

```
Function letterCombinations(digits):
  1. Edge case: if digits is empty → return []

  2. Create phone mapping:
     map = {
       '2': 'abc', '3': 'def', '4': 'ghi',
       '5': 'jkl', '6': 'mno', '7': 'pqrs',
       '8': 'tuv', '9': 'wxyz'
     }

  3. result = []
  4. Start backtracking: backtrack(0, "", result)
  5. Return result

Function backtrack(index, current, result):
  BASE CASE:
  if (index === digits.length):
    // We've processed all digits
    result.push(current)
    return

  RECURSIVE CASE:
  1. Get current digit: digit = digits[index]
  2. Get letters for this digit: letters = map[digit]
  3. Loop through each letter:
     - Add letter to current: current + letter
     - Recurse: backtrack(index + 1, current + letter, result)
     - (Automatic backtrack - using current + letter, not modifying current)
```

### Why This Works?

**No Explicit Backtracking Needed:**
```typescript
// We pass current + letter (new string)
// Instead of modifying current
backtrack(index + 1, current + letter, result);

// This is implicit backtracking!
// current remains unchanged for next iteration
```

**Alternative (Explicit Backtracking):**
```typescript
// If we modify current array
current.push(letter);
backtrack(index + 1, current, result);
current.pop();  // Explicit backtrack
```

### Complexity Analysis

**Time Complexity: O(4^n × n)**

**Why?**
- Each digit has at most 4 letters (7→pqrs, 9→wxyz)
- Total combinations: 4^n (worst case)
- Building each string: O(n)
- Total: O(4^n × n)

**In simple terms:**
```
For "79" (worst case):
- '7' has 4 letters: p,q,r,s
- '9' has 4 letters: w,x,y,z
- Total combinations: 4 × 4 = 16

For "7999":
- 4 × 4 × 4 × 4 = 256 combinations
```

**Space Complexity: O(n)**

**Why?**
1. **Recursion Stack**: O(n)
   - Maximum depth = number of digits
2. **Current String**: O(n)
3. **Result Array**: O(4^n × n) - but this is output, not counted

**In simple terms:**
```
Recursion depth = number of digits
Current string = maximum n characters
Auxiliary space = O(n)
```

---

## Approach 2: Iterative (Queue/BFS-style)

### Prerequisites (Agar Koi Chahiye):
- **Queue/Array operations**: Build combinations iteratively
- **String concatenation**: Append characters to existing strings

### Intuition (Soch):

**Idea:** Build combinations level by level

```
Input: "23"

Level 0: [""]
         Process digit '2' (abc)

Level 1: ["a", "b", "c"]
         Process digit '3' (def)

Level 2: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
         Done!
```

### Algorithm (Step by Step)

```
Function letterCombinations(digits):
  1. if digits is empty → return []

  2. Create phone mapping (same as before)

  3. result = [""]  // Start with empty string

  4. For each digit in digits:
     a. Get letters for current digit
     b. temp = []
     c. For each existing combination in result:
        - For each letter of current digit:
          - temp.push(combination + letter)
     d. result = temp

  5. Return result
```

### Complexity Analysis

**Time Complexity: O(4^n × n)**
- Same as backtracking

**Space Complexity: O(4^n × n)**
- Store all intermediate combinations

---

## Comparison of Approaches

```
┌──────────────────┬────────────────┬──────────────────┬─────────────┐
│ Approach         │ Time           │ Space            │ Difficulty  │
├──────────────────┼────────────────┼──────────────────┼─────────────┤
│ Backtracking     │ O(4^n × n)     │ O(n)             │ Medium      │
│ Iterative (BFS)  │ O(4^n × n)     │ O(4^n × n)       │ Easy        │
└──────────────────┴────────────────┴──────────────────┴─────────────┘
```

**Recommendation:** Backtracking is better due to O(n) space complexity!

---

## Dry Run Example

**Input:** `digits = "23"`

```
Phone Mapping:
'2' → "abc"
'3' → "def"

Initial Call: backtrack(0, "", result)
result = []

┌──────────────────────────────────────────────────────────────────┐
│ CALL 1: backtrack(index=0, current="")                          │
├──────────────────────────────────────────────────────────────────┤
│ Base case? index === 2? NO (0 !== 2)                            │
│                                                                  │
│ digit = digits[0] = '2'                                         │
│ letters = map['2'] = "abc"                                      │
│                                                                  │
│ Loop through letters: 'a', 'b', 'c'                             │
│                                                                  │
│ ┌─ i=0: letter = 'a' ─────────────────────────────────────┐    │
│ │ Recurse: backtrack(1, "a", result)                       │    │
│ │   ↓                                                       │    │
│ │   CALL 2: backtrack(index=1, current="a")               │    │
│ │   Base case? 1 === 2? NO                                │    │
│ │                                                           │    │
│ │   digit = digits[1] = '3'                               │    │
│ │   letters = map['3'] = "def"                            │    │
│ │                                                           │    │
│ │   Loop through letters: 'd', 'e', 'f'                   │    │
│ │                                                           │    │
│ │   ┌─ i=0: letter = 'd' ──────────────────────┐         │    │
│ │   │ Recurse: backtrack(2, "ad", result)       │         │    │
│ │   │   ↓                                        │         │    │
│ │   │   CALL 3: backtrack(index=2, current="ad")│         │    │
│ │   │   Base case? 2 === 2? YES!               │         │    │
│ │   │   result.push("ad")                        │         │    │
│ │   │   result = ["ad"]  ✓                      │         │    │
│ │   │   return                                   │         │    │
│ │   └────────────────────────────────────────────┘         │    │
│ │                                                           │    │
│ │   ┌─ i=1: letter = 'e' ──────────────────────┐         │    │
│ │   │ Recurse: backtrack(2, "ae", result)       │         │    │
│ │   │   Base case? 2 === 2? YES!               │         │    │
│ │   │   result.push("ae")                        │         │    │
│ │   │   result = ["ad", "ae"]  ✓               │         │    │
│ │   └────────────────────────────────────────────┘         │    │
│ │                                                           │    │
│ │   ┌─ i=2: letter = 'f' ──────────────────────┐         │    │
│ │   │ Recurse: backtrack(2, "af", result)       │         │    │
│ │   │   Base case? 2 === 2? YES!               │         │    │
│ │   │   result.push("af")                        │         │    │
│ │   │   result = ["ad", "ae", "af"]  ✓         │         │    │
│ │   └────────────────────────────────────────────┘         │    │
│ │                                                           │    │
│ │   return                                                 │    │
│ └───────────────────────────────────────────────────────────┘    │
│                                                                  │
│ ┌─ i=1: letter = 'b' ─────────────────────────────────────┐    │
│ │ Recurse: backtrack(1, "b", result)                       │    │
│ │   Process digit '3' again with "b"                      │    │
│ │   result.push("bd"), result.push("be"), result.push("bf")│    │
│ │   result = ["ad","ae","af","bd","be","bf"]  ✓           │    │
│ └───────────────────────────────────────────────────────────┘    │
│                                                                  │
│ ┌─ i=2: letter = 'c' ─────────────────────────────────────┐    │
│ │ Recurse: backtrack(1, "c", result)                       │    │
│ │   Process digit '3' again with "c"                      │    │
│ │   result.push("cd"), result.push("ce"), result.push("cf")│    │
│ │   result = ["ad","ae","af","bd","be","bf","cd","ce","cf"]│    │
│ │             ✓ Complete!                                  │    │
│ └───────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘

Final Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Total: 9 combinations (3 × 3)
```

---

## Edge Cases

```typescript
// 1. Empty string
digits = ""
Output: []
Reason: No digits to process

// 2. Single digit
digits = "2"
Output: ["a", "b", "c"]
Reason: Just the letters of '2'

// 3. Digit with 4 letters
digits = "7"
Output: ["p", "q", "r", "s"]
Reason: '7' maps to 4 letters

// 4. Maximum length (4 digits)
digits = "2222"
Output: 81 combinations (3^4)
Reason: Each '2' has 3 options

// 5. Worst case (4 letters each)
digits = "79"
Output: 16 combinations (4 × 4)
Reason: Both have 4 letters each
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Modifying current string incorrectly

```typescript
// WRONG!
function backtrack(index, current, result) {
  current += letter;  // Modifying reference!
  backtrack(index + 1, current, result);
  // current still has letter appended!
}
```

✅ **Correct:**
```typescript
function backtrack(index, current, result) {
  // Pass new string, don't modify current
  backtrack(index + 1, current + letter, result);
}
```

### ❌ Mistake 2: Forgetting edge case

```typescript
// WRONG!
function letterCombinations(digits) {
  // No check for empty string
  const result = [];
  backtrack(0, "", result);
  return result;  // Returns [""] for empty input!
}
```

✅ **Correct:**
```typescript
function letterCombinations(digits) {
  if (digits.length === 0) return [];  // Edge case!
  // ... rest of code
}
```

### ❌ Mistake 3: Wrong base case

```typescript
// WRONG!
function backtrack(index, current, result) {
  if (index > digits.length) {  // Too late!
    result.push(current);
  }
}
```

✅ **Correct:**
```typescript
function backtrack(index, current, result) {
  if (index === digits.length) {  // Exactly at end
    result.push(current);
    return;
  }
}
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Can the input be empty?"**
   → Haan! Return empty array

2. **"Should I handle digit '1' or '0'?"**
   → No, constraints say digits are 2-9 only

3. **"Does order matter in output?"**
   → No, any order is fine

4. **"What's the maximum input length?"**
   → 4 digits maximum

### Approach Explanation

```
"I'll use backtracking to explore all combinations:

1. Base case: When we've processed all digits, add to result

2. For current digit:
   - Get its letter options from mapping
   - Try each letter
   - Recurse for next digit

3. Time: O(4^n × n) - at most 4^n combinations
   Space: O(n) - recursion depth

This naturally explores all paths like a decision tree."
```

### Follow-up Questions

**Q1:** "Can you do this iteratively?"
**A1:** "Yes! Build combinations level by level. For each digit, expand all existing combinations with that digit's letters. Space becomes O(4^n × n)."

**Q2:** "What if we had more letters per digit?"
**A2:** "Time complexity would be O(k^n × n) where k is max letters per digit. The backtracking pattern remains same."

**Q3:** "How would you handle digit '1' which has no mapping?"
**A3:** "Skip it in recursion - just move to next digit without adding anything to current string."

---

## Summary

**Problem Type**: Backtracking / Combination Generation

**Core Pattern**:
```typescript
const phoneMap = {
  '2': 'abc', '3': 'def', '4': 'ghi',
  '5': 'jkl', '6': 'mno', '7': 'pqrs',
  '8': 'tuv', '9': 'wxyz'
};

function backtrack(index, current, result) {
  // Base case
  if (index === digits.length) {
    result.push(current);
    return;
  }

  // Try each letter for current digit
  const letters = phoneMap[digits[index]];
  for (const letter of letters) {
    backtrack(index + 1, current + letter, result);
  }
}
```

**Key Points:**
- Process digits sequentially (index-based)
- Try all letters for each digit
- Build string incrementally
- Implicit backtracking (pass current + letter)

**Complexity:**
- Time: O(4^n × n)
- Space: O(n)

**Next Steps**: Ready for solution.ts! 🚀

Kaunsa approach implement karna hai? Backtracking (recommended) ya Iterative?
