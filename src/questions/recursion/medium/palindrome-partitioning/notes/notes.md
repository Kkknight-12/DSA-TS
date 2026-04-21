# Palindrome Partitioning - Notes

## 1. Problem Samjho

String `s` diya hai.

Hume string ko parts me split karna hai.

Condition:

```txt
Har part palindrome hona chahiye.
```

Example:

```txt
s = "aab"
```

Valid:

```txt
["a", "a", "b"]
["aa", "b"]
```

Invalid:

```txt
["a", "ab"]
```

Because:

```txt
"ab" palindrome nahi hai.
```

---

## 2. Brute Force

Brute force me saare possible cuts try kar sakte hain.

For `s = "aab"`:

| partition | valid? | why |
|---|---|---|
| `["a","a","b"]` | yes | all parts palindrome |
| `["a","ab"]` | no | `"ab"` not palindrome |
| `["aa","b"]` | yes | `"aa"` and `"b"` palindrome |
| `["aab"]` | no | `"aab"` not palindrome |

Answer:

```txt
[["a","a","b"], ["aa","b"]]
```

Problem:

```txt
Cut choices bahut grow kar sakti hain.
```

So recursion/backtracking naturally fit hota hai.

---

## 3. Key Insight

At every recursion frame:

```txt
start fixed hota hai
end move hota hai
```

Example:

```txt
s = "aab"
start = 0
```

Try:

| end | substring `s[start..end]` | palindrome? |
|---:|---|---|
| `0` | `"a"` | yes |
| `1` | `"aa"` | yes |
| `2` | `"aab"` | no |

If substring is palindrome:

```txt
pick it
recurse from end + 1
```

---

## 4. Why This Technique Works

Every partition is a sequence of cuts.

Example:

```txt
["aa", "b"]
```

Means:

```txt
Take s[0..1] = "aa"
Then take s[2..2] = "b"
```

At each `start`, trying every possible `end` means:

```txt
Every possible next cut is explored.
```

Filtering with palindrome check means:

```txt
Only valid palindrome pieces enter current partition.
```

When `start === s.length`:

```txt
Whole string consumed.
Current partition is valid.
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `s` | original string |
| `start` | next substring ka starting index |
| `end` | current substring ka ending index |
| `current` | current partition being built |
| `result` | all valid partitions |

State example:

```txt
s = "aab"
start = 1
end = 2
current = ["a"]
```

Meaning:

```txt
"a" already choose ho chuka hai.
Ab index 1 se possible substring try ho rahi hai: "ab".
```

---

## 6. Mental Model

Handwritten-note style:

```txt
start fixed
i/end moves
```

For each frame:

```txt
for end = start; end < s.length; end++
```

Try:

```txt
s[start..end]
```

If chosen:

```txt
next start = end + 1
```

Important:

```txt
next start is end + 1, not always start + 1
```

Why?

If `s = "aab"`:

```txt
start = 0
end = 1
substring = "aa"
```

After choosing `"aa"`, consumed indices `0` and `1`.

Next start must be:

```txt
2
```

That is:

```txt
end + 1
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| single char | `"a"` | `[["a"]]` | one char palindrome |
| all same chars | `"aaa"` | 4 partitions | every substring palindrome |
| no multi-char palindrome | `"abc"` | `[["a","b","c"]]` | only single chars work |
| full string palindrome | `"aba"` | includes `["aba"]` | whole string valid |
| repeated groups | `"aabb"` | includes `["aa","bb"]` | groups are palindromes |

---

## 8. Conditions

Base condition:

```txt
start === s.length
```

Meaning:

```txt
Whole string consume ho chuki hai.
Current partition complete hai.
```

Palindrome condition:

```txt
isPalindromeRange(s, start, end)
```

Meaning:

```txt
s[start..end] mirror same hai.
```

Skip condition:

```txt
not palindrome
```

Meaning:

```txt
Is substring ko current partition me add nahi kar sakte.
```

Backtrack:

```txt
current.pop()
```

Meaning:

```txt
Current frame ki chosen substring undo karo,
taki next end value try ho sake.
```

---

## 9. Adjustment Logic

At every call:

| step | action | why |
|---:|---|---|
| `1` | check `start === s.length` | complete valid partition mil gaya |
| `2` | loop `end` from `start` to last index | all possible next pieces try karne hain |
| `3` | check `s[start..end]` palindrome hai ya nahi | only valid pieces allowed |
| `4` | if not palindrome, skip | invalid partition branch avoid hoti hai |
| `5` | if palindrome, push substring | current choice accept |
| `6` | recurse with `end + 1` | chosen substring consume ho gayi |
| `7` | pop substring after return | same frame ki choice undo |

Algorithm:

```txt
1. Empty result and empty current partition initialize karo.
2. Start recursion from start index 0.
3. Har frame me end ko start se s.length - 1 tak move karo.
4. substring = s[start..end] banao.
5. Agar substring palindrome nahi hai, us branch ko skip karo.
6. Agar substring palindrome hai, current partition me push karo.
7. Remaining string ke liye backtrack(end + 1) call karo.
8. Recursive call return kare toh current.pop() karke choice undo karo.
9. Base case: start === s.length ho jaye toh current ka copy result me add karo.
10. Final result me saare valid palindrome partitions mil jayenge.
```

---

## 10. Answer Formula

Recursive state:

```txt
backtrack(start)
```

Meaning:

```txt
Index start se end tak string ko valid palindrome partitions me split karo.
```

Choice:

```txt
for every end from start to s.length - 1
```

Valid move:

```txt
if s[start..end] palindrome:
  choose it
  backtrack(end + 1)
```

Final answer:

```txt
All base-case current partitions collected in result.
```

---

## 11. Full Dry Run

Input:

```txt
s = "aab"
```

Decision tree:

```txt
root  (start=0, current=[])
│
├── end=0 -> "a" palindrome -> choose
│   │
│   └── start=1, current=["a"]
│       │
│       ├── end=1 -> "a" palindrome -> choose
│       │   │
│       │   └── start=2, current=["a","a"]
│       │       │
│       │       └── end=2 -> "b" palindrome -> choose
│       │           │
│       │           └── start=3 -> push ["a","a","b"]
│       │
│       └── end=2 -> "ab" not palindrome -> skip
│
├── end=1 -> "aa" palindrome -> choose
│   │
│   └── start=2, current=["aa"]
│       │
│       └── end=2 -> "b" palindrome -> choose
│           │
│           └── start=3 -> push ["aa","b"]
│
└── end=2 -> "aab" not palindrome -> skip
```

Execution table:

| step | call / action | current | result |
|---:|---|---|---|
| `1` | `backtrack(0)` | `[]` | `[]` |
| `2` | choose `"a"` from `0..0` | `["a"]` | `[]` |
| `3` | `backtrack(1)` choose `"a"` from `1..1` | `["a","a"]` | `[]` |
| `4` | `backtrack(2)` choose `"b"` from `2..2` | `["a","a","b"]` | `[]` |
| `5` | `backtrack(3)` base push | `["a","a","b"]` | `[["a","a","b"]]` |
| `6` | pop `"b"`, return to start `2` | `["a","a"]` | `[["a","a","b"]]` |
| `7` | pop second `"a"`, try `"ab"` | `["a"]` | `[["a","a","b"]]` |
| `8` | `"ab"` not palindrome, skip | `["a"]` | `[["a","a","b"]]` |
| `9` | pop first `"a"`, choose `"aa"` from `0..1` | `["aa"]` | `[["a","a","b"]]` |
| `10` | choose `"b"`, base push | `["aa","b"]` | `[["a","a","b"], ["aa","b"]]` |
| `11` | `"aab"` not palindrome, skip | `[]` | `[["a","a","b"], ["aa","b"]]` |

Final:

```txt
[["a","a","b"], ["aa","b"]]
```

---

## 12. Quick Reference

Pattern:

```txt
Fixed start, moving end.
```

Base:

```txt
if start === s.length:
  result.push([...current])
```

Loop:

```txt
for end = start to s.length - 1
```

Valid choice:

```txt
if s[start..end] is palindrome
```

Next recursion:

```txt
backtrack(end + 1)
```

Memory line:

```txt
start batata hai next piece kahan se start hoga.
end batata hai current piece kahan tak jayega.
end + 1 next unprocessed index hota hai.
```
