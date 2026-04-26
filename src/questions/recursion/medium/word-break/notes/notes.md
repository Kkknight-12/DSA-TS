# Word Break - Notes

## 1. Problem Samjho

Hume ek string `s` aur dictionary `wordDict` di gayi hai.

Check karna hai:

```txt
kya string ko dictionary ke words me completely tod sakte hain?
```

Important rules:

```txt
puri string cover honi chahiye
same word multiple times use ho sakta hai
answer sirf true/false hai
```

Example:

```txt
s = "leetcode"
wordDict = ["leet", "code"]
```

Answer:

```txt
true
```

Because:

```txt
"leetcode" = "leet" + "code"
```

---

## 2. Brute Force

Brute-force recursion:

```txt
har start index par dictionary ke saare words try karo
jo word match kare uske baad remaining suffix recursively solve karo
```

Problem:

```txt
same suffix baar-baar solve hota hai
```

Example:

```txt
s = "catsandog"
```

`"og"` suffix multiple paths se aa sakta hai.

Toh brute-force same `start = 7` ko repeat solve karega.

---

## 3. Key Insight

Problem ko suffix question me convert karo:

```txt
canBreakFrom(start)
```

Meaning:

```txt
kya suffix s[start...] dictionary se segment ho sakta hai?
```

Ab memo ka role clear ho jata hai:

```txt
memo[start] = canBreakFrom(start) ka cached answer
```

---

## 4. Why This Technique Works

Agar current `start` par koi word match karta hai:

```txt
s.startsWith(word, start)
```

Then:

```txt
current word prefix consume kar deta hai
remaining problem nextStart = start + word.length ban jaati hai
```

So recursion naturally smaller suffix solve karti hai.

If any one matching word remaining suffix ko solve kar de:

```txt
current start bhi solvable hai
```

If no matching word works:

```txt
current start unsolvable hai
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `s` | input string |
| `wordDict` | dictionary words |
| `start` | current unresolved index |
| `word` | current dictionary word being tried |
| `nextStart` | current word consume karne ke baad next index |
| `memo[start]` | suffix `s[start...]` ka cached boolean answer |

State example:

```txt
s = "leetcode"
start = 4
suffix = "code"
```

Meaning:

```txt
prefix "leet" already solve ho chuka hai
ab hume "code" suffix ko break karna hai
```

---

## 6. Mental Model

Is problem ko tree ke bajaye suffix-chain ke roop me bhi soch sakte ho:

```txt
start = 0 -> try words
successful match -> jump to nextStart
```

For:

```txt
s = "leetcode"
wordDict = ["leet", "code", "lee", "to"]
```

State flow:

```txt
canBreakFrom(0)
  try "leet" -> canBreakFrom(4)
  try "code" at start 4 -> canBreakFrom(8)
  start 8 -> success
```

For failure + memo:

```txt
s = "catsandog"
```

Two branches same suffix `start = 7` par mil sakti hain.
Wahi memoization ka main benefit hai.

Decision tree:

```txt
canBreakFrom(0)
│
├── "cat"  -> canBreakFrom(3)
│   └── "sand" -> canBreakFrom(7) -> false
│
└── "cats" -> canBreakFrom(4)
    └── "and"  -> canBreakFrom(7) -> memo false
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty string | `""` | `true` | kuch consume karna hi nahi |
| empty dict with non-empty string | `"a", []` | `false` | koi word available nahi |
| exact single word | `"leet", ["leet"]` | `true` | poori string ek hi word se cover |
| repeated word use | `"applepenapple"` | `true` | same word reuse allowed |
| impossible suffix | `"catsandog"` | `false` | final leftover valid word nahi banta |

---

## 8. Conditions

### `start === s.length`

Meaning:

```txt
puri string exactly consume ho chuki hai
```

Action:

```txt
return true
```

### `memo[start] !== undefined`

Meaning:

```txt
is suffix ka answer already known hai
```

Action:

```txt
cached result return karo
```

### `!s.startsWith(word, start)`

Meaning:

```txt
current word current suffix ka prefix nahi hai
```

Action:

```txt
ye branch start hi nahi ho sakti, next word try karo
```

### `remainingCanBreak`

Meaning:

```txt
current word choose karne ke baad baaki suffix successfully solve ho gayi
```

Action:

```txt
memo[start] = true
return true
```

---

## 9. Adjustment Logic

Yahan main adjustment `start` index ka hota hai.

| step | adjustment | why |
|---|---|---|
| word match hua | `nextStart = start + word.length` | consumed prefix ke baad remaining suffix solve karni hai |
| recursive success | current frame return true | dusre words try karna waste hai |
| sab fail | `memo[start] = false` | same suffix future me direct fail hogi |

---

## 10. Answer Formula

Direct numeric formula nahi hai.

Important recurrence:

```txt
canBreakFrom(start) = true
if there exists a word such that:
  s.startsWith(word, start)
  and canBreakFrom(start + word.length) = true
```

Complexity:

```txt
Time  = O(n * d * L)
Space = O(n)
```

where:

```txt
n = string length
d = dictionary size
L = average word length
```

---

## 11. Full Dry Run

Example:

```txt
s = "leetcode"
wordDict = ["leet", "code", "lee", "to"]
```

### Call Table

| call | start | suffix | matching word tried | nextStart | result |
|---|---|---|---|---|---|
| 1 | `0` | `"leetcode"` | `"leet"` | `4` | waits |
| 2 | `4` | `"code"` | `"code"` | `8` | waits |
| 3 | `8` | `""` | - | - | `true` |

### Unwinding Table

| returning to call | received result | action |
|---|---|---|
| call 2 (`start=4`) | `true` from `start=8` | `memo[4] = true`, return true |
| call 1 (`start=0`) | `true` from `start=4` | `memo[0] = true`, return true |

Final:

```txt
true
```

### Memoization Failure Example

For:

```txt
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

| call path | reached start | suffix | result |
|---|---|---|---|
| `"cat"` + `"sand"` | `7` | `"og"` | false |
| `"cats"` + `"and"` | `7` | `"og"` | memo false reused |

This is the repeated-work saving.

---

## 12. Quick Reference

| point | summary |
|---|---|
| recursion state | `start` index |
| question | can suffix `s[start...]` break? |
| success base case | `start === s.length` |
| memo meaning | `memo[start]` = cached suffix answer |
| next index | `start + word.length` |
| early return | first successful word par true |
| time | `O(n * d * L)` |
| space | `O(n)` |
