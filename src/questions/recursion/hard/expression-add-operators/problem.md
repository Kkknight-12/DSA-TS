# Expression Add Operators

## Problem Statement (Hinglish mein)

[leetcode-expression-add-operators](https://leetcode.com/problems/expression-add-operators/)

[gemini-explanation](https://gemini.google.com/gem/9013c4cd97d5/757b19b2ba9f1dcd)

[gemini-visulizer](https://gemini.google.com/gem/9013c4cd97d5/04ee0700b203ab8c)

[gpt-5](https://chatgpt.com/g/g-p-690b183fda608191a882804e321568e5-dsa/c/692bd8ab-a744-8320-b97b-c3e2f9a7cb48)

[gemini-dry-run](https://gemini.google.com/gem/9013c4cd97d5/ef5eacb608f83751)

**Kya karna hai?**
- Tumhe ek **string of digits** diya gaya hai (e.g., "123")
- Ek **target value** diya gaya hai (e.g., 6)
- Find **ALL possible expressions** jo target ko evaluate karte hain
- **Operators**: Sirf `+`, `-`, `*` use kar sakte ho
- **Multi-digit numbers**: Ek number mein multiple digits ho sakte hain
- **No leading zeros**: "05" invalid hai, "5" valid hai

**Example:**
```
Input: num = "123", target = 6
Output: ["1*2*3", "1+2+3"]

Explanation:
"1*2*3" = 1 × 2 × 3 = 6 ✓
"1+2+3" = 1 + 2 + 3 = 6 ✓

Input: num = "232", target = 8
Output: ["2*3+2", "2+3*2"]

Explanation:
"2*3+2" = 6 + 2 = 8 ✓
"2+3*2" = 2 + 6 = 8 ✓ (multiplication first!)

Input: num = "105", target = 5
Output: ["1*0+5", "10-5"]

Explanation:
"1*0+5" = 0 + 5 = 5 ✓
"10-5" = 10 - 5 = 5 ✓ (multi-digit "10")
```

**Key Points:**
1. **Operator Precedence**: `*` has higher precedence than `+` and `-`
2. **Multi-digit Numbers**: Can use "12" as single number, not just "1" and "2"
3. **No Leading Zeros**: "05" is invalid, but "5" and "50" are valid
4. **All Solutions**: Find ALL possible valid expressions

---

## Prerequisites (Agar Koi Chahiye)

**Core Concepts:**
- **Backtracking**: Try different operator placements
- **Expression Evaluation**: Understanding operator precedence
- **String Manipulation**: Building expressions dynamically
- **Handling Multiplication**: Special tracking needed for precedence

**Key Challenge:**
```
How to handle multiplication without re-evaluating entire expression?

Example: "2+3*4"
Without tracking: Need to evaluate whole expression
With tracking: Remember previous operand, handle * specially

Current: 2 + 3 = 5
See *4: Need to undo +3, then do 3*4, then add to 2
Result: 2 + (3*4) = 2 + 12 = 14
```

---

## Intuition (Soch) 🤔

### The Challenge: Place Operators Between Digits

**Example: num = "123", target = 6**
```
We can place operators between any two digits:

Position after '1':
  1 + 23
  1 - 23
  1 * 23
  12 (no operator, multi-digit)

Position after '2' (if we chose '1' alone):
  1 + 2 + 3
  1 + 2 - 3
  1 + 2 * 3
  1 + 23

And so on...

Decision tree:
         "123"
      /    |    \
    1+    1-    1*    (or continue to 12)
   / | \  / | \ / | \
  +  -  * +  - * ...
```

**Why Backtracking?**
```
We need to try ALL possible combinations:
- For each position, try: +, -, *, or no operator (multi-digit)
- Build expression incrementally
- Check if final result matches target
- Systematically explore all possibilities
```

### The Pattern: Build Expression Step by Step

**Core Insight:**
```
At each index i:
  1. Try different operator placements
  2. Track current evaluation value
  3. Handle multiplication with special care
  4. If reached end and value = target → valid expression!
  5. Backtrack and try different operators
```

**Special Case: Multiplication**
```
Problem: "2+3*4" should evaluate to 14, not 20

Why?
Standard evaluation: 2+3=5, 5*4=20 ❌
Correct evaluation: 2+(3*4)=2+12=14 ✓

Solution: Track previous operand!
When we see *, undo previous operation, multiply, then add back

Example:
current = 2, previous = 0
Add 3: current = 2+3 = 5, previous = 3
Multiply 4:
  Undo: current = 5-3 = 2
  Multiply: 3*4 = 12
  Add: current = 2+12 = 14 ✓
  Update previous = 12
```

---

## Approach: Backtracking with Evaluation Tracking (Optimal)

### Prerequisites (Agar Koi Chahiye):
- **Backtracking**: Building solution incrementally
- **Operator precedence**: Understanding `*` comes before `+/-`
- **State tracking**: Remembering current value and previous operand

### Intuition (Soch):

**Core Idea:**
```
backtrack(index, currentExpression, currentValue, lastOperand):
  Base case:
    if index === num.length:
      if currentValue === target:
        Add currentExpression to results
      return

  Recursive case:
    For each possible number from current index:
      For each operator (+, -, *):
        Build new expression
        Calculate new value (handle * specially)
        Recurse with updated state
```

**Key Variables:**
```typescript
currentValue: Current evaluation of expression so far
  Example: "2+3" → currentValue = 5

lastOperand: Previous number added/subtracted
  Example: "2+3" → lastOperand = 3
  Why needed? To handle multiplication!

For "2+3*4":
  After "2+3": currentValue = 5, lastOperand = 3
  See *4:
    Undo +3: 5 - 3 = 2
    Do 3*4: 3 * 4 = 12
    Add: 2 + 12 = 14
    New lastOperand = 12
```

### Visual Example (num = "123", target = 6):

```
═══════════════════════════════════════════════════════════════
DECISION TREE
═══════════════════════════════════════════════════════════════

Start: num = "123", target = 6

Index 0: Choose first number
  Option 1: "1" (single digit)
    ├─ Index 1: Choose operator and next number
    │   ├─ "+2"
    │   │   ├─ Index 2: Choose operator and next number
    │   │   │   ├─ "+3" → "1+2+3" = 6 ✓ SOLUTION!
    │   │   │   ├─ "-3" → "1+2-3" = 0 ❌
    │   │   │   └─ "*3" → "1+2*3" = 1+(2*3) = 7 ❌
    │   │   └─ "23" → "1+23" = 24 ❌
    │   ├─ "-2"
    │   │   ├─ "+3" → "1-2+3" = 2 ❌
    │   │   └─ ...
    │   └─ "*2"
    │       ├─ "+3" → "1*2+3" = 2+3 = 5 ❌
    │       ├─ "-3" → "1*2-3" = 2-3 = -1 ❌
    │       └─ "*3" → "1*2*3" = 6 ✓ SOLUTION!
    └─ "12" (multi-digit)
        ├─ "+3" → "12+3" = 15 ❌
        └─ ...

  Option 2: "12" (multi-digit)
    └─ Index 2: Choose operator and next number
        ├─ "+3" → "12+3" = 15 ❌
        ├─ "-3" → "12-3" = 9 ❌
        └─ "*3" → "12*3" = 36 ❌

  Option 3: "123" (entire number)
    No more digits → "123" = 123 ❌
```

``` 
DRY RUN EXAMPLE (num = "123"):

├── numStr : 1  index: 0  i: 0           [ rec call ]                                   [ for loop i = index, i++, index=0 ]
│    │                                        │                            
│    ├── numStr : 2  index: 1  i: 1      ────┘  [ rec call ]   [ for loop i = index, i++, index=1 ]      │ 
│    │                                              │                       │                             │ 
│    │   └── numStr : 3  index: 2  i: 2 ───────────┘                       │                             │ 
│    │       (leaf)                                                         │                             │ 
│    │                                                                       │                            │ 
│    └── numStr : 23  index: 1  i: 2  ───────────────────────[ for loop index = 1, i = 2 ]              │ 
│        (leaf)                                                                                           │ 
│                                                                                                         │ 
├── numStr : 12  index: 0  i: 1  ─────────────────────────────────────────────────────────────── [ for loop index = 0, i 1 ] 
│    │                                                                                                    │ 
│    └── numStr : 3  index: 2  i: 2                                                                       │ 
│        (leaf)                                                                                           │ 
│                                                                                                         │ 
├── numStr : 123  index: 0  i: 2     ────────────────────────────────────────────────────────── [ for loop index = 0, i 2 ]
│   (leaf)
```

``` 
Decision Tree Representation:

ROOT CALL: solve(index: 0, Input: "123")
│
├── [Loop i = 0] ➜ Pick Substr "1"
│   │
│   └── RECURSE (index: 1) -> Remaining: "23"
│       │
│       ├── [Loop i = 1] ➜ Pick Substr "2"
│       │   │
│       │   └── RECURSE (index: 2) -> Remaining: "3"
│       │       │
│       │       └── [Loop i = 2] ➜ Pick Substr "3"
│       │           │
│       │           └── ✅ LEAF REACHED (Base Case)
│       │               Result: ["1", "2", "3"]
│       │
│       └── [Loop i = 2] ➜ Pick Substr "23"
│           │
│           └── ✅ LEAF REACHED (Base Case)
│               Result: ["1", "23"]
│
├── [Loop i = 1] ➜ Pick Substr "12"
│   │
│   └── RECURSE (index: 2) -> Remaining: "3"
│       │
│       └── [Loop i = 2] ➜ Pick Substr "3"
│           │
│           └── ✅ LEAF REACHED (Base Case)
│               Result: ["12", "3"]
│
└── [Loop i = 2] ➜ Pick Substr "123"
│
└── ✅ LEAF REACHED (Base Case)
Result: ["123"]
```

### Algorithm (Step by Step):

```
Function addOperators(num, target):
  if num is empty:
    return []

  results = []
  backtrack(num, target, 0, "", 0, 0, results)
  return results

Function backtrack(num, target, index, expression, currentValue, lastOperand, results):
  Parameters:
    num: Input digit string
    target: Target value to reach
    index: Current position in num
    expression: Expression built so far (e.g., "1+2*3")
    currentValue: Current evaluation result
    lastOperand: Last operand added/subtracted (for * handling)
    results: Array to collect valid expressions

  BASE CASE:
  if index === num.length:
    if currentValue === target:
      results.push(expression)
    return

  RECURSIVE CASE:
  // Try all possible numbers starting from current index
  for endIndex from index to num.length-1:
    // Extract number from index to endIndex
    numberStr = num.substring(index, endIndex + 1)

    // Skip if leading zero (invalid!)
    if numberStr.length > 1 && numberStr[0] === '0':
      break  // "01", "012" etc. are invalid

    number = parseInt(numberStr)

    if index === 0:
      // First number: no operator before it
      backtrack(num, target, endIndex + 1, numberStr, number, number, results)
    else:
      // Try + operator
      backtrack(
        num, target, endIndex + 1,
        expression + "+" + numberStr,
        currentValue + number,
        number,  // lastOperand is current number
        results
      )

      // Try - operator
      backtrack(
        num, target, endIndex + 1,
        expression + "-" + numberStr,
        currentValue - number,
        -number,  // lastOperand is negative
        results
      )

      // Try * operator (special handling!)
      backtrack(
        num, target, endIndex + 1,
        expression + "*" + numberStr,
        currentValue - lastOperand + lastOperand * number,
        lastOperand * number,  // new lastOperand
        results
      )
```

### Why Multiplication Handling Works:

```
Expression: "2+3*4"

Step 1: Process "2"
  currentValue = 2
  lastOperand = 2

Step 2: Process "+3"
  currentValue = 2 + 3 = 5
  lastOperand = 3

Step 3: Process "*4"
  Problem: We already added 3, but now need 3*4
  Solution:
    1. Undo the +3: currentValue - lastOperand = 5 - 3 = 2
    2. Add 3*4: 2 + (3*4) = 2 + 12 = 14
    3. New lastOperand = 3*4 = 12

  Formula: currentValue - lastOperand + lastOperand * number
           = 5 - 3 + 3*4
           = 5 - 3 + 12
           = 14 ✓

  If we later see "+5":
    currentValue = 14 + 5 = 19
    lastOperand = 5
```

### Handling Leading Zeros:

```typescript
// Invalid cases:
"05"  → Skip! Leading zero
"012" → Skip! Leading zero

// Valid cases:
"0"   → OK! Single zero
"50"  → OK! No leading zero
"105" → Can use "10" and "5" separately

Implementation:
if (numberStr.length > 1 && numberStr[0] === '0') {
  break;  // Stop trying longer numbers with leading zero
}
```

### Complete Dry Run (num = "232", target = 8):

```
═══════════════════════════════════════════════════════════════
FINDING "2*3+2"
═══════════════════════════════════════════════════════════════

backtrack(index=0, expr="", val=0, last=0)
  Try number "2" (index 0 to 0):
    First number: no operator
    backtrack(index=1, expr="2", val=2, last=2)

      Try number "3" (index 1 to 1):
        Try operator "*":
          newVal = 2 - 2 + 2*3 = 0 + 6 = 6
          newLast = 2*3 = 6
          backtrack(index=2, expr="2*3", val=6, last=6)

            Try number "2" (index 2 to 2):
              Try operator "+":
                newVal = 6 + 2 = 8 ✓
                newLast = 2
                backtrack(index=3, expr="2*3+2", val=8, last=2)

                  BASE CASE: index=3 === length=3
                  currentValue=8 === target=8? YES! ✓
                  results.push("2*3+2")

═══════════════════════════════════════════════════════════════
FINDING "2+3*2"
═══════════════════════════════════════════════════════════════

backtrack(index=0, expr="", val=0, last=0)
  Try number "2":
    backtrack(index=1, expr="2", val=2, last=2)

      Try number "3":
        Try operator "+":
          newVal = 2 + 3 = 5
          newLast = 3
          backtrack(index=2, expr="2+3", val=5, last=3)

            Try number "2":
              Try operator "*":
                newVal = 5 - 3 + 3*2 = 2 + 6 = 8 ✓
                newLast = 3*2 = 6
                backtrack(index=3, expr="2+3*2", val=8, last=6)

                  BASE CASE: index=3 === length=3
                  currentValue=8 === target=8? YES! ✓
                  results.push("2+3*2")
```

### Complexity Analysis

**Time Complexity: O(4^n)**

**Why?**
```
At each position, we have ~4 choices:
  1. Use current digit alone with +
  2. Use current digit alone with -
  3. Use current digit alone with *
  4. Combine with next digit (multi-digit number)

For n digits: 4^n possible expressions (roughly)

With pruning:
  - Leading zero check reduces branches
  - Target mismatch stops exploration
  - Actual complexity much better in practice
```

**Space Complexity: O(n)**

**Why?**
1. **Recursion depth**: O(n) - maximum n levels
2. **Expression string**: O(n) during construction
3. **Results storage**: O(number of solutions × n)

**In simple terms:**
```
For num = "123" (3 digits):
  Maximum paths to explore: ~4^3 = 64
  With pruning: much fewer actually explored
```

---

## Edge Cases

```typescript
// 1. Single digit
num = "1", target = 1
Output: ["1"]
Reason: No operators needed

// 2. All same operators work
num = "123", target = 6
Output: ["1+2+3", "1*2*3"]
Both evaluate to 6

// 3. Leading zeros
num = "105", target = 5
Output: ["1*0+5", "10-5"]
Note: "1*05" is invalid (leading zero in 05)

// 4. No solution exists
num = "123", target = 100
Output: []
Reason: Maximum value is 123, can't reach 100

// 5. Negative result needed
num = "12", target = -12
Output: ["-12"]  (or "1-2-11" if multi-digit allowed differently)

// 6. Zero in middle
num = "000", target = 0
Output: ["0+0+0", "0-0-0", "0*0+0", "0+0*0", "0*0*0", "0*0-0", "0-0*0"]
Many ways to get 0

// 7. Large number
num = "3456237490", target = 9191
Output: []
Too many combinations, likely no solution

// 8. Multi-digit numbers only
num = "123", target = 123
Output: ["123"]
Use entire number
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Not handling multiplication precedence

```typescript
// WRONG!
function backtrack(...) {
  // Just add, subtract, or multiply to currentValue
  if (operator === '*') {
    newValue = currentValue * number;  // ❌ Wrong!
  }
}

// Problem: "2+3*4" would compute (2+3)*4 = 20
// Correct should be 2+(3*4) = 14
```

✅ **Correct:**
```typescript
if (operator === '*') {
  // Undo last operation, then multiply
  newValue = currentValue - lastOperand + lastOperand * number;
  newLast = lastOperand * number;
}
```

### ❌ Mistake 2: Allowing leading zeros

```typescript
// WRONG!
for (let i = index; i < num.length; i++) {
  const numStr = num.substring(index, i + 1);
  const number = parseInt(numStr);
  // ... continue with this number
}

// Problem: Accepts "05", "012" etc.
```

✅ **Correct:**
```typescript
for (let i = index; i < num.length; i++) {
  const numStr = num.substring(index, i + 1);

  // Skip if leading zero
  if (numStr.length > 1 && numStr[0] === '0') {
    break;  // Don't try longer numbers
  }

  const number = parseInt(numStr);
  // ... continue
}
```

### ❌ Mistake 3: Wrong lastOperand tracking

```typescript
// WRONG!
if (operator === '+') {
  backtrack(..., currentValue + number, number, ...);  // ✓ Correct
}
if (operator === '-') {
  backtrack(..., currentValue - number, number, ...);  // ❌ Wrong!
  // Should be -number, not number!
}
```

✅ **Correct:**
```typescript
if (operator === '-') {
  backtrack(..., currentValue - number, -number, ...);
  // lastOperand should be negative for subtraction!
}
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Can operands have leading zeros?"**
   → No, "05" is invalid, but "5" and "0" are valid

2. **"Do we need to use all digits?"**
   → Yes, entire input string must be used

3. **"What about negative results?"**
   → Target can be negative, handle accordingly

4. **"Order of results matter?"**
   → No, any order is fine

### Approach Explanation

```
"I'll solve this using backtracking:

1. Try all possible ways to split digits into numbers
2. For each split, try all operators (+, -, *)
3. Track current value and last operand
4. Handle multiplication specially:
   - Undo last operation
   - Multiply last operand by new number
   - Add back to current value
5. Avoid leading zeros in multi-digit numbers
6. When expression complete, check if value = target

Time: O(4^n) with pruning
Space: O(n) for recursion

Key challenge: Handling * without re-evaluating entire expression"
```

### Follow-up Questions

**Q1:** "How would you count solutions instead of storing them?"

**A1:**
```typescript
let count = 0;
function backtrack(...) {
  if (index === num.length) {
    if (currentValue === target) count++;
    return;
  }
  // ... rest same, don't push to results
}
```

**Q2:** "What if we only allow + and -, not *?"

**A2:** "Much simpler! No need to track lastOperand. Just maintain currentValue."

**Q3:** "How to optimize for large inputs?"**

**A3:**
```
1. Early pruning: If currentValue already > target and all remaining are positive
2. Memoization: Cache (index, currentValue) states
3. Limit recursion depth
4. Set bounds on number size
```

---

## Summary

**Problem Type**: Backtracking / Expression Building

**Core Pattern**:
```typescript
backtrack(index, expr, currentVal, lastOp) {
  if (index === n) {
    if (currentVal === target) add to results
    return
  }

  for each possible number from index:
    Skip if leading zero

    if first number:
      recurse with this number
    else:
      Try +:  recurse(val + num, num)
      Try -:  recurse(val - num, -num)
      Try *:  recurse(val - lastOp + lastOp*num, lastOp*num)
}
```

**Key Points:**
- Handle multiplication with special formula
- Track lastOperand for proper precedence
- Avoid leading zeros in multi-digit numbers
- Try all possible number groupings
- Build expression string as we go

**Complexity:**
- Time: O(4^n)
- Space: O(n)

**Next Steps**: Ready for solution.ts! 🚀

Kya solution.ts dekhna hai? Yeh thoda complex hai but bahut interesting! 🎯