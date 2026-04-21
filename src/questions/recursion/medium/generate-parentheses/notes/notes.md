# Generate Parentheses - Notes

## 1. Problem Samjho

`n` pairs of parentheses diye hain.

Hume saare valid combinations generate karne hain.

Example:

```txt
n = 2
answer = ["(())", "()()"]
```

Valid ka meaning:

```txt
Har '(' ka matching ')' hona chahiye.
Kisi bhi prefix me ')' count '(' count se zyada nahi ho sakta.
```

Example:

| string | valid? | why |
|---|---|---|
| `(())` | yes | balanced and correct order |
| `()()` | yes | balanced and correct order |
| `())(` | no | prefix `())` me close zyada ho gaya |
| `))((` | no | closing se start ho raha hai |

---

## 2. Brute Force

Length `2n` ki saari possible strings generate kar sakte hain using:

```txt
(
)
```

Then har string validate karo.

For `n = 2`, length `4`:

| candidate | valid? |
|---|---|
| `((()` | no |
| `(())` | yes |
| `()()` | yes |
| `())(` | no |
| `)(()` | no |

Problem:

```txt
Invalid strings bahut zyada generate hoti hain.
```

Complexity:

```txt
Time: O(n * 4^n)
```

Why?

```txt
Length 2n hai.
Har position pe 2 choices.
Total candidates = 2^(2n) = 4^n.
Validate each in O(n).
```

---

## 3. Key Insight

Invalid prefix kabhi build hi mat karo.

At every step:

```txt
'(' add karna hai?
')' add karna hai?
```

But conditions ke saath:

```txt
'(' allowed if openCount < n
')' allowed if closeCount < openCount
```

This means recursion sirf valid prefixes banayegi.

---

## 4. Why This Technique Works

Valid parentheses ka sabse important rule:

```txt
closing count can never exceed opening count at any prefix.
```

So `')'` tabhi add karna safe hai jab:

```txt
closeCount < openCount
```

This means:

```txt
Koi unmatched '(' already available hai.
```

`'('` tab tak add kar sakte hain jab tak opening quota bacha hai:

```txt
openCount < n
```

Base case:

```txt
openCount === n && closeCount === n
```

Meaning:

```txt
Saare n opening and n closing brackets use ho gaye.
Current string complete valid answer hai.
```

---

## 5. Variables

| Variable | Meaning |
|---|---|
| `n` / `totalPairs` | total parentheses pairs required |
| `current` | current partial parentheses string |
| `openCount` | kitne `'('` use ho chuke |
| `closeCount` | kitne `')'` use ho chuke |
| `result` | valid complete combinations |

State example:

```txt
current = "(()"
openCount = 2
closeCount = 1
n = 2
```

Meaning:

```txt
Opening quota complete hai.
Ek closing bracket add karna baaki hai.
```

---

## 6. Mental Model

Think of this as filling a string of length `2n`.

For `n = 2`:

```txt
_ _ _ _
```

At every blank:

```txt
Can I place '('?
Can I place ')'?
```

Decision tree node:

```txt
"()" (open=1, close=1)
```

Meaning:

```txt
One pair balanced ho chuka hai.
Abhi ek aur pair build karna baaki hai.
```

---

## 7. Boundary Cases

| Case | Output | Why |
|---|---|---|
| `n = 0` | `[""]` | one empty valid string |
| `n = 1` | `["()"]` | one pair only |
| `n = 2` | `["(())", "()()"]` | nested and sequential |
| `n = 3` | 5 strings | Catalan(3) = 5 |

Constraints usually start at `n = 1`, but recursion naturally handles `n = 0`.

---

## 8. Conditions

Base condition:

```txt
openCount === totalPairs && closeCount === totalPairs
```

Problem language:

```txt
String complete hai. Answer me add karo.
```

Open condition:

```txt
openCount < totalPairs
```

Problem language:

```txt
Abhi opening bracket quota bacha hai.
```

Close condition:

```txt
closeCount < openCount
```

Problem language:

```txt
Koi unmatched '(' available hai, so ')' add karna safe hai.
```

---

## 9. Adjustment Logic

Algorithm:

```txt
result = []

build(current, openCount, closeCount):
  if openCount === n and closeCount === n:
    result.push(current)
    return

  if openCount < n:
    build(current + "(", openCount + 1, closeCount)

  if closeCount < openCount:
    build(current + ")", openCount, closeCount + 1)
```

Return flow:

```txt
Child call complete hone ke baad parent call frame me control wapas aata hai.
Phir parent apni next allowed branch try karta hai.
```

Manual `pop` kyun nahi?

```txt
current + "(" new string banata hai.
Original current mutate nahi hota.
So manual undo needed nahi.
```

---

## 10. Answer Formula

Number of valid combinations:

```txt
Catalan(n)
```

Values:

| n | Catalan(n) |
|---:|---:|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 5 |
| 4 | 14 |
| 5 | 42 |

Time:

```txt
O(Catalan(n) * n)
```

Why?

```txt
Catalan(n) valid strings.
Each string length 2n.
```

Space excluding output:

```txt
O(n)
```

Why?

```txt
Maximum recursion depth 2n hoti hai.
2n simplifies to O(n).
```

---

## 11. Full Dry Run

Example:

```txt
n = 2
```

Decision tree:

```txt
                            "" (0,0)
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
```

Execution table:

| step | frame / condition | result after |
|---:|---|---|
| 1 | `build("",0,0)`, base false, `'('` allowed, `')'` skipped | `[]` |
| 2 | `build("(",1,0)`, `'('` allowed | `[]` |
| 3 | `build("((",2,0)`, `'('` skipped, `')'` allowed | `[]` |
| 4 | `build("(()",2,1)`, `')'` allowed | `[]` |
| 5 | `build("(())",2,2)`, base add | `["(())"]` |
| 6 | return to `"("`, now `')'` branch allowed | `["(())"]` |
| 7 | `build("()",1,1)`, `'('` allowed, `')'` skipped | `["(())"]` |
| 8 | `build("()(",2,1)`, `')'` allowed | `["(())"]` |
| 9 | `build("()()",2,2)`, base add | `["(())", "()()"]` |

Nested box-heavy call-frame view:

```txt
Initial Call: generateParenthesis(2)
- result = []
- Start: buildParentheses("", 0, 0, 2, result)

┌──────────────────────────────────────────────────────────────────────┐
│ CALL 1: buildParentheses("", 0, 0, 2, result)                        │
├──────────────────────────────────────────────────────────────────────┤
│ current = ""                                                         │
│ openCount = 0, closeCount = 0, totalPairs = 2                       │
│ Base case? 0==2 AND 0==2 -> Nahi                                    │
│                                                                      │
│ Try '(': openCount < totalPairs? 0 < 2 -> Haan                      │
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐     │
│   │ CALL 2: buildParentheses("(", 1, 0, 2, result)             │     │
│   ├────────────────────────────────────────────────────────────┤     │
│   │ current = "("                                              │     │
│   │ openCount = 1, closeCount = 0, totalPairs = 2             │     │
│   │ Base case? 1==2 AND 0==2 -> Nahi                          │     │
│   │                                                            │     │
│   │ Try '(': openCount < totalPairs? 1 < 2 -> Haan            │     │
│   │                                                            │     │
│   │   ┌──────────────────────────────────────────────────┐     │     │
│   │   │ CALL 3: buildParentheses("((", 2, 0, 2, result)  │     │     │
│   │   ├──────────────────────────────────────────────────┤     │     │
│   │   │ current = "(("                                   │     │     │
│   │   │ openCount = 2, closeCount = 0, totalPairs = 2    │     │     │
│   │   │ Base case? 2==2 AND 0==2 -> Nahi                 │     │     │
│   │   │                                                  │     │     │
│   │   │ Try '(': 2 < 2 -> Nahi                           │     │     │
│   │   │ Reason: Saare opening brackets use ho gaye.      │     │     │
│   │   │                                                  │     │     │
│   │   │ Try ')': closeCount < openCount? 0 < 2 -> Haan   │     │     │
│   │   │                                                  │     │     │
│   │   │   ┌────────────────────────────────────────┐     │     │     │
│   │   │   │ CALL 4: buildParentheses("(()",        │     │     │     │
│   │   │   │         2, 1, 2, result)               │     │     │     │
│   │   │   ├────────────────────────────────────────┤     │     │     │
│   │   │   │ current = "(()"                        │     │     │     │
│   │   │   │ openCount = 2, closeCount = 1          │     │     │     │
│   │   │   │ Base case? 2==2 AND 1==2 -> Nahi       │     │     │     │
│   │   │   │                                        │     │     │     │
│   │   │   │ Try '(': 2 < 2 -> Nahi                 │     │     │     │
│   │   │   │ Try ')': 1 < 2 -> Haan                 │     │     │     │
│   │   │   │                                        │     │     │     │
│   │   │   │   ┌──────────────────────────────┐     │     │     │     │
│   │   │   │   │ CALL 5: buildParentheses(    │     │     │     │     │
│   │   │   │   │         "(())", 2, 2, 2)     │     │     │     │     │
│   │   │   │   ├──────────────────────────────┤     │     │     │     │
│   │   │   │   │ current = "(())"             │     │     │     │     │
│   │   │   │   │ openCount = 2, closeCount = 2│     │     │     │     │
│   │   │   │   │ Base case? 2==2 AND 2==2     │     │     │     │     │
│   │   │   │   │ -> Haan, BASE CASE           │     │     │     │     │
│   │   │   │   │                              │     │     │     │     │
│   │   │   │   │ result.push("(())")          │     │     │     │     │
│   │   │   │   │ result = ["(())"]            │     │     │     │     │
│   │   │   │   │ Return                       │     │     │     │     │
│   │   │   │   └──────────────────────────────┘     │     │     │     │
│   │   │   │                                        │     │     │     │
│   │   │   │ Return                                 │     │     │     │
│   │   │   └────────────────────────────────────────┘     │     │     │
│   │   │                                                  │     │     │
│   │   │ Return                                           │     │     │
│   │   └──────────────────────────────────────────────────┘     │     │
│   │                                                            │     │
│   │ Try ')': closeCount < openCount? 0 < 1 -> Haan            │     │
│   │                                                            │     │
│   │   ┌──────────────────────────────────────────────────┐     │     │
│   │   │ CALL 6: buildParentheses("()", 1, 1, 2, result)  │     │     │
│   │   ├──────────────────────────────────────────────────┤     │     │
│   │   │ current = "()"                                   │     │     │
│   │   │ openCount = 1, closeCount = 1                    │     │     │
│   │   │ Base case? 1==2 AND 1==2 -> Nahi                 │     │     │
│   │   │                                                  │     │     │
│   │   │ Try '(': openCount < totalPairs? 1 < 2 -> Haan   │     │     │
│   │   │                                                  │     │     │
│   │   │   ┌────────────────────────────────────────┐     │     │     │
│   │   │   │ CALL 7: buildParentheses("()(",        │     │     │     │
│   │   │   │         2, 1, 2, result)               │     │     │     │
│   │   │   ├────────────────────────────────────────┤     │     │     │
│   │   │   │ current = "()("                        │     │     │     │
│   │   │   │ openCount = 2, closeCount = 1          │     │     │     │
│   │   │   │ Base case? 2==2 AND 1==2 -> Nahi       │     │     │     │
│   │   │   │                                        │     │     │     │
│   │   │   │ Try '(': 2 < 2 -> Nahi                 │     │     │     │
│   │   │   │ Try ')': 1 < 2 -> Haan                 │     │     │     │
│   │   │   │                                        │     │     │     │
│   │   │   │   ┌──────────────────────────────┐     │     │     │     │
│   │   │   │   │ CALL 8: buildParentheses(    │     │     │     │     │
│   │   │   │   │         "()()", 2, 2, 2)     │     │     │     │     │
│   │   │   │   ├──────────────────────────────┤     │     │     │     │
│   │   │   │   │ current = "()()"             │     │     │     │     │
│   │   │   │   │ openCount = 2, closeCount = 2│     │     │     │     │
│   │   │   │   │ Base case? 2==2 AND 2==2     │     │     │     │     │
│   │   │   │   │ -> Haan, BASE CASE           │     │     │     │     │
│   │   │   │   │                              │     │     │     │     │
│   │   │   │   │ result.push("()()")          │     │     │     │     │
│   │   │   │   │ result = ["(())", "()()"]    │     │     │     │     │
│   │   │   │   │ Return                       │     │     │     │     │
│   │   │   │   └──────────────────────────────┘     │     │     │     │
│   │   │   │                                        │     │     │     │
│   │   │   │ Return                                 │     │     │     │
│   │   │   └────────────────────────────────────────┘     │     │     │
│   │   │                                                  │     │     │
│   │   │ Try ')': closeCount < openCount? 1 < 1 -> Nahi   │     │     │
│   │   │ Reason: close already open ke equal hai.         │     │     │
│   │   │                                                  │     │     │
│   │   │ Return                                           │     │     │
│   │   └──────────────────────────────────────────────────┘     │     │
│   │                                                            │     │
│   │ Return                                                     │     │
│   └────────────────────────────────────────────────────────────┘     │
│                                                                      │
│ Try ')': closeCount < openCount? 0 < 0 -> Nahi                      │
│ Reason: Empty string me closing bracket add nahi kar sakte.         │
│                                                                      │
│ Return                                                               │
└──────────────────────────────────────────────────────────────────────┘
```

Final:

```txt
["(())", "()()"]
```

---

## 12. Quick Reference

Template:

```txt
function build(current, openCount, closeCount):
  if openCount === n and closeCount === n:
    result.push(current)
    return

  if openCount < n:
    build(current + "(", openCount + 1, closeCount)

  if closeCount < openCount:
    build(current + ")", openCount, closeCount + 1)
```

Memory lines:

```txt
'(' adds possibility.
')' closes an existing unmatched '('.
openCount < n means opening quota bacha hai.
closeCount < openCount means closing safe hai.
Base case means all pairs complete.
```
