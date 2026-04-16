# Valid Anagram - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Do strings `s` and `t` diye hain.
Hume check karna hai ki `t`, `s` ka anagram hai ya nahi.

Anagram ka matlab:

```txt
same characters
same frequency
order different ho sakta hai
```

Example:

```txt
s = "anagram"
t = "nagaram"

answer = true
```

Kyunki dono me:

```txt
a -> 3
n -> 1
g -> 1
r -> 1
m -> 1
```

Important:

- length different ho toh directly `false`
- order matter nahi karta
- character count matter karta hai
- repo version comparison ko case-insensitive rakhta hai

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
dono strings sort karo
phir sorted strings compare karo
```

Why?

Sorting same characters ko same order me arrange kar deti hai.

Example:

```txt
s = "anagram" -> "aaagmnr"
t = "nagaram" -> "aaagmnr"
```

Sorted strings same hain, so answer:

```txt
true
```

Negative example:

```txt
s = "rat" -> "art"
t = "car" -> "acr"
```

Sorted strings different hain, so answer:

```txt
false
```

Time:

```txt
O(n log n)
```

Space:

```txt
O(n)
```

---

## STEP 3: Key Insight

Anagram me order ka koi role nahi hai.

Main condition:

```txt
har character ki frequency dono strings me same honi chahiye
```

So sorting necessary nahi hai.
Hum direct count compare kar sakte hain.

Example:

```txt
s = "aabb"
t = "bbaa"
```

Counts:

| Character | s count | t count |
|---|---:|---:|
| a | 2 | 2 |
| b | 2 | 2 |

Counts same, so anagram.

---

## STEP 4: Why Frequency Technique Works

Socho `s` ek inventory hai.

Example:

```txt
s = "aabb"
inventory = { a: 2, b: 2 }
```

Ab `t` ke characters inventory se consume karo:

```txt
t = "bbaa"
```

| Target char | Meaning | Inventory after consume |
|---|---|---|
| b | one `b` used | `{ a: 2, b: 1 }` |
| b | one `b` used | `{ a: 2, b: 0 }` |
| a | one `a` used | `{ a: 1, b: 0 }` |
| a | one `a` used | `{ a: 0, b: 0 }` |

All counts zero means target ne source inventory perfectly use kar li.

If kisi character ka count 0 hote hue bhi target use karna chahe,
matlab target me woh character extra hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `s` | source string |
| `t` | target string |
| `source` | lowercase normalized `s` |
| `target` | lowercase normalized `t` |
| `frequency` | map storing available characters from source |
| `availableCount` | current target char ke liye source inventory me bachi count |
| `balance` | fixed 26-size net frequency difference array |
| `sourceIndex` | source character ka `a-z` index |
| `targetIndex` | target character ka `a-z` index |

Short memory:

```txt
frequency = available inventory
balance = source count minus target count
```

---

## STEP 6: Mental Model

Is problem ko characters ki shopping inventory samjho.

```txt
s = store inventory
t = shopping list
```

Har target character bolta hai:

```txt
mujhe ye character chahiye
```

If source inventory me available hai:

```txt
consume one count
```

If available nahi hai:

```txt
not an anagram
```

At end:

```txt
inventory exactly empty -> true
inventory me kuch bacha -> false
```

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---:|---|
| Different lengths | `"a"`, `"ab"` | false | total characters different |
| Same string | `"abc"`, `"abc"` | true | exact same inventory |
| Different order | `"listen"`, `"silent"` | true | order does not matter |
| Repeated balanced | `"aabb"`, `"bbaa"` | true | counts match |
| Repeated mismatch | `"aacc"`, `"ccac"` | false | `c` extra in target |
| Empty strings | `""`, `""` | true | both inventories empty |
| Case-insensitive | `"CAT"`, `"ACT"` | true | both normalize to lowercase |

---

## STEP 8: Conditions

Important checks:

```txt
if s.length !== t.length -> false
```

Why?

```txt
anagram me same number of characters hote hain
```

Frequency map condition:

```txt
if availableCount === 0 -> false
```

Why?

```txt
target current character ko source se zyada baar use kar raha hai
ya source me woh character present hi nahi tha
```

Optimal array condition:

```txt
if any balance slot !== 0 -> false
```

Why?

```txt
that letter ki source aur target frequency different hai
```

---

## STEP 9: Adjustment Logic

Better approach:

```txt
source char mila -> frequency[char]++
target char mila -> frequency[char]--
```

Meaning:

```txt
++ means source inventory me one item add hua
-- means target ne one item consume kiya
```

Optimal approach:

```txt
balance[sourceIndex]++
balance[targetIndex]--
```

Meaning:

```txt
positive balance -> source has extra
negative balance -> target has extra
zero balance     -> perfectly matched
```

---

## STEP 10: Answer Formula

Brute force:

```txt
sort(s) === sort(t)
```

Better approach:

```txt
length same
and target consumes every source count cleanly
and all remaining counts are 0
```

Optimal approach:

```txt
length same
and every balance slot is 0
```

Short answer:

```txt
same inventory -> true
different inventory -> false
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "aabb"
t = "bbaa"
```

### Better Approach Dry Run

Build source inventory:

| Step | char from `s` | frequency |
|---:|---|---|
| 1 | a | `{ a: 1 }` |
| 2 | a | `{ a: 2 }` |
| 3 | b | `{ a: 2, b: 1 }` |
| 4 | b | `{ a: 2, b: 2 }` |

Consume target:

| Step | char from `t` | frequency after consume |
|---:|---|---|
| 1 | b | `{ a: 2, b: 1 }` |
| 2 | b | `{ a: 2, b: 0 }` |
| 3 | a | `{ a: 1, b: 0 }` |
| 4 | a | `{ a: 0, b: 0 }` |

Final:

```txt
all counts 0 -> true
```

### Optimal Approach Dry Run

Balance array important slots:

| i | s[i] | source action | t[i] | target action | a balance | b balance |
|---:|---|---|---|---|---:|---:|
| 0 | a | a + 1 | b | b - 1 | 1 | -1 |
| 1 | a | a + 1 | b | b - 1 | 2 | -2 |
| 2 | b | b + 1 | a | a - 1 | 1 | -1 |
| 3 | b | b + 1 | a | a - 1 | 0 | 0 |

Final:

```txt
all slots 0 -> true
```

Negative dry run:

```txt
s = "aacc"
t = "ccac"
```

Net balance:

| Character | Source count | Target count | Balance |
|---|---:|---:|---:|
| a | 2 | 1 | +1 |
| c | 2 | 3 | -1 |

Some balances non-zero:

```txt
answer = false
```

---

## STEP 12: Quick Reference

Brute:

```txt
sort both and compare
```

Better:

```txt
count source
consume target
all zero means true
```

Optimal:

```txt
26-slot balance array
s char -> +1
t char -> -1
all zero -> true
```

Most important line:

```txt
anagram = same character inventory
```
