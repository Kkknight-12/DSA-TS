# Rotate String - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Do strings `s` and `goal` diye hain.
Hume check karna hai ki `goal`, `s` ki rotation ban sakta hai ya nahi.

Rotation ka matlab:

```txt
string ka kuch prefix end me chala gaya
aur baaki suffix front me aa gaya
```

Example:

```txt
s = "abcde"
```

Rotation at index `2`:

```txt
prefix = "ab"
suffix = "cde"

rotation = suffix + prefix
         = "cde" + "ab"
         = "cdeab"
```

So:

```txt
goal = "cdeab" -> true
```

Important:

- rotation character count preserve karti hai
- length mismatch ho toh answer immediately `false`
- same string bhi valid rotation hoti hai

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
s ki saari rotations banao
aur goal se compare karo
```

Example:

```txt
s = "abcde"
```

| Start index | Rotation |
|---:|---|
| 0 | `"abcde"` |
| 1 | `"bcdea"` |
| 2 | `"cdeab"` |
| 3 | `"deabc"` |
| 4 | `"eabcd"` |

`goal = "cdeab"` index `2` wali rotation hai.

So answer:

```txt
true
```

Brute force correct hai,
but repeated string creation hoti hai.

Time:

```txt
O(n^2)
```

Kyunki `n` rotations,
aur har rotation build/compare karne me `O(n)`.

---

## STEP 3: Key Insight

Rotation ko manually generate karne ki zarurat nahi.

Main observation:

```txt
s + s ke andar s ki saari rotations continuous substring ke form me hoti hain
```

Example:

```txt
s = "abcde"
s + s = "abcdeabcde"
```

Ab rotations dekho:

```txt
abcdeabcde
abcde
 bcdea
  cdeab
   deabc
    eabcd
```

So:

```txt
goal is rotation
iff
goal exists inside s + s
```

---

## STEP 4: Why This Technique Works

Rotation me string split hoti hai:

```txt
s = prefix + suffix
```

Rotation ban jaati hai:

```txt
goal = suffix + prefix
```

Ab doubled string:

```txt
s + s = prefix + suffix + prefix + suffix
```

Iske beech me:

```txt
suffix + prefix
```

continuous form me present hota hai.

That is exactly rotated string.

So doubled-string trick mathematically valid hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `s` | original string |
| `goal` | target rotation |
| `startIndex` | brute force me new start position |
| `doubledString` | `s + s`, jisme saari rotations visible hoti hain |
| `text` | KMP me doubled string |
| `pattern` | KMP me `goal` |
| `lps` | KMP prefix reuse table |
| `textIndex` | text me current position |
| `patternIndex` | pattern me current matched position |

Short memory:

```txt
rotation problem = substring search inside s+s
```

---

## STEP 6: Mental Model

Soch:

```txt
main circle ko line me unfold kar raha hoon
```

String as circle:

```txt
a -> b -> c -> d -> e -> back to a
```

Line me unfold:

```txt
abcdeabcde
```

Ab kisi bhi point se length `n` ka segment lo,
wo ek rotation hoti hai.

Example:

```txt
abcdeabcde
  cdeab
```

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Same string | `"abc", "abc"` | `true` | zero rotation valid hai |
| Valid rotation | `"abcde", "cdeab"` | `true` | goal `s+s` me present hai |
| Same length but impossible | `"abcde", "abced"` | `false` | `s+s` me present nahi |
| Length mismatch | `"abc", "ab"` | `false` | rotation length preserve karti hai |
| Empty strings | `"", ""` | `true` | dono same empty rotation hain |
| Repeated pattern | `"abab", "baba"` | `true` | repeated chars ke saath bhi trick works |

---

## STEP 8: Conditions

Main condition:

```txt
s.length === goal.length
```

If false:

```txt
return false
```

Then doubled-string check:

```txt
(s + s).includes(goal)
```

KMP version me same condition:

```txt
kmpSearch(s + s, goal)
```

---

## STEP 9: Adjustment Logic

### Brute Force

| Step | Meaning |
|---|---|
| `startIndex++` | next possible rotation start try karo |
| `s.slice(startIndex)` | new front suffix |
| `s.slice(0, startIndex)` | end me jaane wala prefix |

### Double String

No pointer adjustment manually needed.
Built-in substring search handles it.

### KMP

| Situation | Adjustment | Kyun |
|---|---|---|
| chars match | `textIndex++`, `patternIndex++` | current matched prefix grow hua |
| mismatch and `patternIndex > 0` | `patternIndex = lps[patternIndex - 1]` | matched prefix ka reusable part bacha sakte hain |
| mismatch at pattern start | `textIndex++` | current text char se match possible nahi |

---

## STEP 10: Answer Formula

Most useful formula:

```txt
isRotation(s, goal)
= s.length === goal.length
  and
  goal is substring of (s + s)
```

Brute force formula:

```txt
rotation at i = s.slice(i) + s.slice(0, i)
```

KMP formula:

```txt
search pattern = goal
inside text = s + s
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "abcde"
goal = "cdeab"
```

### Brute force dry run

| `startIndex` | `s.slice(startIndex)` | `s.slice(0, startIndex)` | Rotation | Match? |
|---:|---|---|---|---|
| 0 | `"abcde"` | `""` | `"abcde"` | no |
| 1 | `"bcde"` | `"a"` | `"bcdea"` | no |
| 2 | `"cde"` | `"ab"` | `"cdeab"` | yes |

Answer:

```txt
true
```

### Double-string dry run

```txt
doubledString = "abcdeabcde"
goal = "cdeab"
```

| Check | Result |
|---|---|
| `"abcdeabcde".includes("cdeab")` | `true` |

### KMP dry run

For this pattern:

```txt
pattern = "cdeab"
lps = [0, 0, 0, 0, 0]
```

Search table:

| Text char | Pattern char | Result |
|---|---|---|
| `a` | `c` | mismatch, move text |
| `b` | `c` | mismatch, move text |
| `c` | `c` | match |
| `d` | `d` | match |
| `e` | `e` | match |
| `a` | `a` | match |
| `b` | `b` | full pattern matched |

Answer:

```txt
true
```

---

## STEP 12: Quick Reference

```txt
Rotation preserves length

Brute force:
try every start index
rotation = suffix + prefix

Key insight:
s+s contains all rotations of s

Clean solution:
same length and (s+s).includes(goal)

Strict algorithmic search:
use KMP to search goal inside s+s
```
