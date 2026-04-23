# Letter Combinations Of A Phone Number - Notes

## 1. Problem Samjho

Input ek string `digits` hai.

Digits `2` to `9` ke beech hote hain.

Phone keypad mapping:

| digit | letters |
|---|---|
| `2` | `abc` |
| `3` | `def` |
| `4` | `ghi` |
| `5` | `jkl` |
| `6` | `mno` |
| `7` | `pqrs` |
| `8` | `tuv` |
| `9` | `wxyz` |

Question:

```txt
Har digit se ek letter choose karke saare possible combinations return karo.
```

Example:

```txt
digits = "23"
```

Output:

```txt
["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

---

## 2. Brute Force

For `digits = "23"`:

Digit `2` options:

```txt
a, b, c
```

Digit `3` options:

```txt
d, e, f
```

Manually combine:

| first letter | second letter | combination |
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

This works for small input.

But if digits length grows:

```txt
"2345" -> 3 * 3 * 3 * 3 = 81 combinations
```

Manual nested loops are not flexible because number of digits dynamic hai.

---

## 3. Key Insight

Har digit ek level banata hai.

Har level par us digit ke letters choices hote hain.

For `digits = "23"`:

```txt
level 0 -> choose from "abc"
level 1 -> choose from "def"
```

One root-to-leaf path:

```txt
choose 'a'
choose 'd'
=> "ad"
```

So recursion tree naturally all combinations generate karti hai.

---

## 4. Why This Technique Works

Every valid combination needs:

```txt
one letter from each digit
```

If input length is `n`, final string length also `n` hoti hai.

At each `index`:

```txt
digits[index] ke mapped letters try karo
```

When `index === digits.length`:

```txt
all digits processed
current complete combination
```

So base case par `current` answer me add hota hai.

---

## 5. Variables

| variable | meaning |
|---|---|
| `digits` | input digit string |
| `phoneMap` | digit to letters mapping |
| `index` | abhi kaunsa digit process ho raha hai |
| `current` | abhi tak built combination |
| `result` | all completed combinations |
| `letters` | current digit ke mapped letters |

State example:

```txt
digits = "23"
index = 1
current = "a"
letters = "def"
```

Meaning:

```txt
Digit '2' ke liye 'a' choose ho chuka hai.
Ab digit '3' ke liye d/e/f me se choose karna hai.
```

---

## 6. Mental Model

Think of this like filling blanks:

```txt
digits = "23"

_ _
```

First blank:

```txt
a / b / c
```

Second blank:

```txt
d / e / f
```

Decision tree:

```txt
root current=""
│
├── choose 'a' from digit '2' -> current="a"
│   ├── choose 'd' from digit '3' -> current="ad" -> BASE, push "ad"
│   ├── choose 'e' from digit '3' -> current="ae" -> BASE, push "ae"
│   └── choose 'f' from digit '3' -> current="af" -> BASE, push "af"
│
├── choose 'b' from digit '2' -> current="b"
│   ├── choose 'd' from digit '3' -> current="bd" -> BASE, push "bd"
│   ├── choose 'e' from digit '3' -> current="be" -> BASE, push "be"
│   └── choose 'f' from digit '3' -> current="bf" -> BASE, push "bf"
│
└── choose 'c' from digit '2' -> current="c"
    ├── choose 'd' from digit '3' -> current="cd" -> BASE, push "cd"
    ├── choose 'e' from digit '3' -> current="ce" -> BASE, push "ce"
    └── choose 'f' from digit '3' -> current="cf" -> BASE, push "cf"
```

Leaves:

```txt
ad ae af bd be bf cd ce cf
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty input | `""` | `[]` | no digit to process |
| single digit with 3 letters | `"2"` | `["a","b","c"]` | `2 -> abc` |
| single digit with 4 letters | `"7"` | `["p","q","r","s"]` | `7 -> pqrs` |
| repeated digits | `"22"` | 9 combinations | `3 * 3` |
| mixed 3 and 4 letters | `"27"` | 12 combinations | `3 * 4` |

---

## 8. Conditions

Empty input condition:

```txt
digits.length === 0
```

Meaning:

```txt
Koi digit nahi hai, so no combinations.
```

Base condition:

```txt
index === digits.length
```

Meaning:

```txt
Saare digits process ho gaye.
Current string complete combination hai.
```

Loop condition:

```txt
for each letter in phoneMap[digits[index]]
```

Meaning:

```txt
Current digit ke saare possible letters try karo.
```

---

## 9. Adjustment Logic

At every recursive call:

| step | action | why |
|---:|---|---|
| `1` | check if `index === digits.length` | complete combination ready |
| `2` | get `digit = digits[index]` | know which keypad button we are processing |
| `3` | get `letters = phoneMap[digit]` | find possible choices |
| `4` | loop each `letter` | every letter creates a branch |
| `5` | call `backtrack(index + 1, current + letter)` | choose letter and process next digit |
| `6` | after return, loop continues | original `current` unchanged |

Algorithm:

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

---

## 10. Answer Formula

If every digit has at most 4 letters:

```txt
worst total combinations = 4^n
```

If actual digits are `"23"`:

```txt
3 * 3 = 9
```

If actual digits are `"79"`:

```txt
4 * 4 = 16
```

Time:

```txt
O(4^n * n)
```

Why `* n`?

```txt
Each final combination string length n hoti hai.
```

Space excluding output:

```txt
O(n)
```

Why?

```txt
Recursion depth digits.length tak ja sakti hai.
```

Output space:

```txt
O(4^n * n)
```

Why?

```txt
Worst case me 4^n combinations ho sakte hain,
aur har combination length n ki string hoti hai.
```

---

## 11. Full Dry Run

Input:

```txt
digits = "23"
```

Initial:

```txt
result = []
backtrack(0, "")
```

Execution table:

| step | call / action | current | result |
|---:|---|---|---|
| `1` | `backtrack(0, "")`, digit `2`, letters `abc` | `""` | `[]` |
| `2` | choose `a`, call `backtrack(1, "a")` | `"a"` | `[]` |
| `3` | digit `3`, choose `d`, call `backtrack(2, "ad")` | `"ad"` | `[]` |
| `4` | base case, push `"ad"` | `"ad"` | `["ad"]` |
| `5` | back to `"a"`, choose `e`, push `"ae"` | `"ae"` | `["ad","ae"]` |
| `6` | back to `"a"`, choose `f`, push `"af"` | `"af"` | `["ad","ae","af"]` |
| `7` | back to root, choose `b`, call `backtrack(1, "b")` | `"b"` | `["ad","ae","af"]` |
| `8` | digit `3`, choose `d`, call `backtrack(2, "bd")` | `"bd"` | `["ad","ae","af"]` |
| `9` | base case, push `"bd"` | `"bd"` | `["ad","ae","af","bd"]` |
| `10` | back to `"b"`, choose `e`, call `backtrack(2, "be")` | `"be"` | `["ad","ae","af","bd"]` |
| `11` | base case, push `"be"` | `"be"` | `["ad","ae","af","bd","be"]` |
| `12` | back to `"b"`, choose `f`, call `backtrack(2, "bf")` | `"bf"` | `["ad","ae","af","bd","be"]` |
| `13` | base case, push `"bf"` | `"bf"` | `["ad","ae","af","bd","be","bf"]` |
| `14` | back to root, choose `c`, call `backtrack(1, "c")` | `"c"` | `["ad","ae","af","bd","be","bf"]` |
| `15` | digit `3`, choose `d`, call `backtrack(2, "cd")` | `"cd"` | `["ad","ae","af","bd","be","bf"]` |
| `16` | base case, push `"cd"` | `"cd"` | `["ad","ae","af","bd","be","bf","cd"]` |
| `17` | back to `"c"`, choose `e`, call `backtrack(2, "ce")` | `"ce"` | `["ad","ae","af","bd","be","bf","cd"]` |
| `18` | base case, push `"ce"` | `"ce"` | `["ad","ae","af","bd","be","bf","cd","ce"]` |
| `19` | back to `"c"`, choose `f`, call `backtrack(2, "cf")` | `"cf"` | `["ad","ae","af","bd","be","bf","cd","ce"]` |
| `20` | base case, push `"cf"` | `"cf"` | `["ad","ae","af","bd","be","bf","cd","ce","cf"]` |

Final:

```txt
["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

Why `current` stays clean:

```txt
current + letter creates a new string.
Original current mutate nahi hota.
```

---

## 12. Quick Reference

Pattern:

```txt
One digit = one recursion level
One letter = one branch
One leaf = one combination
```

Base:

```txt
if index === digits.length:
  result.push(current)
```

Recursive move:

```txt
for letter of phoneMap[digits[index]]:
  backtrack(index + 1, current + letter)
```

Memory line:

```txt
Array backtracking me push/pop hota hai.
String backtracking me current + letter new string banata hai.
```
