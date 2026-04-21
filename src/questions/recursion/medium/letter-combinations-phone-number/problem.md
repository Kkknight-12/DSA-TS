# Letter Combinations Of A Phone Number

**Difficulty:** Medium  
**Topic:** Recursion, Backtracking  
**Pattern:** Choose one option per digit  
**Primary approach in this folder:** Backtracking with implicit string backtracking

---

## 1. Problem Samjho

Ek string `digits` diya hai.

Digits only `2` to `9` ke beech hote hain.

Har digit phone keypad ke kuch letters represent karta hai:

```txt
2 -> abc
3 -> def
4 -> ghi
5 -> jkl
6 -> mno
7 -> pqrs
8 -> tuv
9 -> wxyz
```

Hume saare possible letter combinations return karne hain.

Example:

```txt
digits = "23"
```

Digit `2` se:

```txt
a, b, c
```

Digit `3` se:

```txt
d, e, f
```

Answer:

```txt
["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

---

## 2. Examples

### Example 1

```txt
digits = "23"
```

Combinations:

| first digit `2` | second digit `3` | combination |
|---|---|---|
| `a` | `d` | `ad` |
| `a` | `e` | `ae` |
| `a` | `f` | `af` |
| `b` | `d` | `bd` |
| `b` | `e` | `be` |
| `b` | `f` | `bf` |
| `c` | `d` | `cd` |
| `c` | `e` | `ce` |
| `c` | `f` | `cf` |

Output:

```txt
["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Example 2

```txt
digits = ""
```

Output:

```txt
[]
```

No digit means no combination.

### Example 3

```txt
digits = "7"
```

Digit `7` maps to:

```txt
pqrs
```

Output:

```txt
["p","q","r","s"]
```

---

## 3. Core Observation

Har digit ke paas multiple letter options hote hain.

At every index:

```txt
current digit ke letters me se ek letter choose karo
```

For `digits = "23"`:

| index | digit | options |
|---:|---|---|
| `0` | `2` | `a`, `b`, `c` |
| `1` | `3` | `d`, `e`, `f` |

Har path me:

```txt
digit 2 se one letter
digit 3 se one letter
```

That path becomes one final combination.

---

## 4. Why Recursion Fits

This problem naturally forms a tree.

```txt
Start: ""
```

First digit `2`:

```txt
a, b, c
```

Second digit `3`:

```txt
from "a" -> ad, ae, af
from "b" -> bd, be, bf
from "c" -> cd, ce, cf
```

Each recursion level handles one digit.

Each branch chooses one letter from that digit.

Leaf node means:

```txt
all digits processed
current string complete
```

---

## 5. Approach 1: Backtracking

### Idea

Use recursion with:

```txt
index
current
result
```

At current index:

1. Get current digit.
2. Get letters mapped to that digit.
3. Try each letter one by one.
4. Recurse to next digit with `current + letter`.

### Algorithm

```txt
1. If digits string empty hai, return [] because koi digit process nahi karna.
2. Phone keypad mapping banao: '2' -> "abc", '3' -> "def", and so on.
3. Empty result array initialize karo.
4. Recursion index 0 aur current string "" se start karo.
5. Current digit ke mapped letters nikalo.
6. Har mapped letter ko current ke saath append karke next index par recurse karo.
7. Base case: index digits.length ke equal ho jaye toh current complete combination hai.
8. Complete current string ko result me push karo and return.
9. Strings immutable hain, so current + letter new string banata hai; explicit pop/backtrack needed nahi.
```

### Why This Works

Every final combination needs one letter from each digit.

Recursion tree exactly ye karti hai:

```txt
level 0 -> choose letter for first digit
level 1 -> choose letter for second digit
level 2 -> choose letter for third digit
...
```

When `index === digits.length`, one complete path ready hai.

---

## 6. Why Explicit Backtracking Is Not Needed

Array backtracking me hum usually karte hain:

```txt
push
recurse
pop
```

But yahan `current` string hai.

We call:

```txt
backtrack(index + 1, current + letter)
```

`current + letter` ek new string banata hai.

Original `current` unchanged rehta hai.

So loop ke next iteration me same clean `current` available hota hai.

This is implicit backtracking.

---

## 7. Approach 2: Iterative BFS-Style

### Idea

Start:

```txt
result = [""]
```

For each digit:

```txt
existing combinations ke saath current digit ke letters append karo
```

For `digits = "23"`:

| step | result |
|---|---|
| start | `[""]` |
| after `2` | `["a","b","c"]` |
| after `3` | `["ad","ae","af","bd","be","bf","cd","ce","cf"]` |

This also works, but recursion tree is clearer for learning.

---

## 8. Approach Comparison

| approach | time | auxiliary space | prerequisite | when useful |
|---|---:|---:|---|---|
| Backtracking recursion | `O(4^n * n)` | `O(n)` | recursion tree | best for learning choices |
| Iterative BFS-style | `O(4^n * n)` | `O(4^n * n)` | queue/result expansion | compact iterative thinking |

Output space is `O(4^n * n)` because worst case every digit has 4 letters.

---

## 9. Important Edge Cases

| case | example | answer | why |
|---|---|---|---|
| empty input | `""` | `[]` | no digits to process |
| one 3-letter digit | `"2"` | `["a","b","c"]` | `2 -> abc` |
| one 4-letter digit | `"7"` | `["p","q","r","s"]` | `7 -> pqrs` |
| repeated digits | `"22"` | 9 combinations | `3 * 3` |
| worst two digits | `"79"` | 16 combinations | `4 * 4` |

---

## 10. What We Will Implement

We will implement:

```txt
Backtracking recursion with implicit string backtracking.
```

Why this implementation:

- One recursion level = one digit.
- One branch = one letter choice.
- `current + letter` keeps the state clean without manual `pop`.
- It connects directly to recursion tree understanding.
