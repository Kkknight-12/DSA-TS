# Generate Parentheses

## Problem Samjho

Ek integer `n` diya hai.

`n` pairs of parentheses se saare valid combinations generate karne hain.

Valid / well-formed parentheses ka matlab:

```txt
1. Har '(' ka matching ')' hona chahiye.
2. Kisi bhi point par ')' ki count '(' se zyada nahi honi chahiye.
```

Example:

```txt
n = 2

valid:
(())
()()

invalid:
())(
))((
```

Why `())(` invalid hai?

```txt
Left to right scan karte waqt third character par closing count opening se zyada ho jaata hai.
```

---

## Examples

### Example 1

```txt
Input: n = 1
Output: ["()"]
```

Sirf ek pair hai, so one valid answer.

### Example 2

```txt
Input: n = 2
Output: ["(())", "()()"]
```

Meaning:

| combination | style |
|---|---|
| `(())` | nested |
| `()()` | sequential |

### Example 3

```txt
Input: n = 3
Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

There are 5 valid combinations for 3 pairs.

---

## Constraints

```txt
1 <= n <= 8
```

Number of valid answers follows Catalan numbers:

| n | valid combinations |
|---:|---:|
| 1 | 1 |
| 2 | 2 |
| 3 | 5 |
| 4 | 14 |
| 5 | 42 |
| 8 | 1430 |

---

## Prerequisites

| Concept | Why needed |
|---|---|
| recursion | same choice process repeat hota hai |
| base case | jab string complete ho jaye |
| decision tree | har node par choices dikhte hain |
| backtracking idea | choose -> recurse -> return -> next choice |
| counters | open/close count track karna |

Backtracking ko heavy theory ki tarah mat lo.

Simple meaning:

```txt
Ek valid choice lo, recursion me jao, wapas aao, next valid choice try karo.
```

---

## Approach 1: Brute Force Generate All Strings

### Intuition

Length `2n` ki har possible string generate karo using `'('` and `')'`.

Then har string validate karo.

For `n = 2`, length `4` ki total strings:

```txt
((((
((()
(()(
(())
()((
()()
())(
()))
...
```

Inme se valid sirf:

```txt
(())
()()
```

### Complexity

```txt
Total candidates = 2^(2n)
Each validation = O(2n)

Time: O(n * 4^n)
Space: O(n) validation stack/count, excluding output
```

Problem:

```txt
Bahut saari invalid strings generate hoti hain.
```

---

## Approach 2: Recursive Backtracking With Constraints

### Intuition

Invalid strings generate hi mat karo.

Har step par do possible choices hain:

```txt
add '('
add ')'
```

But dono choices hamesha allowed nahi hoti.

---

## When Can We Add '('?

`(` tab add kar sakte hain jab abhi tak `n` opening brackets use nahi hue.

```txt
openCount < n
```

Example for `n = 2`:

```txt
current = "(("
openCount = 2

openCount < n
2 < 2 -> false

Ab aur '(' add nahi kar sakte.
```

---

## When Can We Add ')'?

`)` tab add kar sakte hain jab close count, open count se kam ho.

```txt
closeCount < openCount
```

Why?

```txt
Closing bracket tabhi valid hai jab uske liye pehle se unmatched opening bracket available ho.
```

Example:

```txt
current = "("
openCount = 1
closeCount = 0

0 < 1 -> true
So ')' add kar sakte hain.
```

Invalid example:

```txt
current = ""
openCount = 0
closeCount = 0

0 < 0 -> false
Empty string me ')' add nahi kar sakte.
```

---

## Decision Tree For n = 2

```txt
                            "" (open=0, close=0)
                             |
                    add '(' allowed
                             |
                         "(" (1,0)
                       /           \
          add '(' allowed           add ')' allowed
                   /                 \
              "((" (2,0)             "()" (1,1)
                  |                    |
          add ')' allowed       add '(' allowed
                  |                    |
              "(()" (2,1)          "()(" (2,1)
                  |                    |
          add ')' allowed       add ')' allowed
                  |                    |
              "(())" (2,2)        "()()" (2,2)
                  add                 add
```

---

## Approach Comparison

| Approach | Idea | Time | Space excluding output | Notes |
|---|---|---|---|---|
| brute force | generate all length `2n` strings and validate | O(n * 4^n) | O(n) | many invalid strings |
| constrained recursion | only generate valid prefixes | O(Catalan(n) * n) | O(n) | selected approach |

Output space:

```txt
O(Catalan(n) * 2n)
```

Because:

```txt
Catalan(n) valid strings
each string length 2n
```

---

## Selected Approach

Use constrained recursion.

Reason:

```txt
Problem choices clearly depend on open/close counters.
Recursion naturally represents the decision tree.
Constraints prevent invalid branches early.
```

Implementation file:

```txt
solution.ts
```
