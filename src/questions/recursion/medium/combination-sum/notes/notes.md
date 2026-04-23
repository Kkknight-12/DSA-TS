# Combination Sum - Notes

## 1. Problem Samjho

`candidates` array diya hai aur ek `target` diya hai.

Hume saare unique combinations find karne hain jinka sum exactly `target` ho.

Important:

```txt
Same candidate unlimited times use kar sakte hain.
```

Example:

```txt
candidates = [2, 3, 6, 7]
target = 7
```

Valid:

```txt
[2, 2, 3] -> 7
[7]       -> 7
```

Answer:

```txt
[[2,2,3], [7]]
```

Order matter nahi karta:

```txt
[2,2,3] and [2,3,2] same combination hain.
```

---

## 2. Brute Force

Brute force soch:

```txt
Har possible ordered sequence generate karo.
Jiska sum target ho, usko keep karo.
```

Problem:

```txt
[2,2,3]
[2,3,2]
[3,2,2]
```

Ye teeno same combination represent karte hain, but sequence brute force inhe alag-alag generate kar sakta hai.

So hume aisa recursion structure chahiye jo:

```txt
all valid combinations explore kare
but duplicate permutations avoid kare
```

---

## 3. Key Insight

Har candidate ke liye two choices:

```txt
PICK
SKIP
```

But `Combination Sum` ka special rule:

```txt
PICK -> same index par raho
SKIP -> next index par jao
```

Why?

| choice | index move | reason |
|---|---|---|
| pick | same index | same candidate unlimited times reuse allowed hai |
| skip | index + 1 | candidate ko current path ke liye permanently chhod diya |

Example:

```txt
candidates = [2, 3]
target = 5
```

If `2` pick:

```txt
current = [2]
remaining = 3
index still 0
```

Index same means:

```txt
2 dobara pick kar sakte hain.
```

If `2` skip:

```txt
index = 1
```

Now current path me:

```txt
2 wapas nahi aayega.
```

---

## 4. Why This Technique Works

Every combination can be represented as:

```txt
take candidate 0 some number of times
take candidate 1 some number of times
take candidate 2 some number of times
...
```

This left-to-right structure avoids permutations.

For `[2, 3]`:

```txt
[2,3] possible hai
```

But:

```txt
[3,2] generate nahi hota
```

Why?

If recursion moves from `2` to `3`, it never goes back to `2`.

So same combination duplicate order me repeat nahi hota.

---

## 5. Variables

| variable | meaning |
|---|---|
| `candidates` | available numbers |
| `target` | required total sum |
| `index` | abhi kis candidate par decision chal raha hai |
| `remaining` | target ka kitna part abhi bhi banana baaki hai |
| `current` | current combination being built |
| `result` | all valid completed combinations |
| `candidate` | `candidates[index]` |

State example:

```txt
candidates = [2, 3]
target = 5
index = 0
remaining = 3
current = [2]
```

Meaning:

```txt
2 already choose ho chuka hai.
Ab remaining target 3 hai.
Index 0 par hi hain, so 2 dobara choose kar sakte hain.
```

---

## 6. Mental Model

Think in terms of remaining target:

```txt
remaining = target - sum(current)
```

If:

```txt
remaining === 0
```

Then:

```txt
current valid combination hai.
```

If:

```txt
remaining < 0
```

Then:

```txt
current sum target se zyada ho gaya.
```

Decision tree:

```txt
root  index=0, remaining=5, current=[]
│
├── PICK 2 -> index=0, remaining=3, current=[2]
│   ├── PICK 2 -> index=0, remaining=1, current=[2,2]
│   │   ├── PICK 2 -> remaining=-1 -> invalid
│   │   └── SKIP 2 -> index=1, remaining=1
│   └── SKIP 2 -> index=1, remaining=3, current=[2]
│       ├── PICK 3 -> remaining=0, current=[2,3] -> valid
│       └── SKIP 3 -> no candidates left
│
└── SKIP 2 -> index=1, remaining=5, current=[]
    ├── PICK 3 -> remaining=2, current=[3]
    └── SKIP 3 -> no candidates left
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| no candidate works | `[2]`, target `1` | `[]` | 2 se 1 nahi ban sakta |
| single direct match | `[7]`, target `7` | `[[7]]` | candidate itself target hai |
| same value repeated | `[3]`, target `12` | `[[3,3,3,3]]` | same candidate reuse allowed |
| empty candidates | `[]`, target `7` | `[]` | positive target impossible |
| zero target | `[1]`, target `0` | `[[]]` | no pick needed |

---

## 8. Conditions

### `remaining === 0`

Meaning:

```txt
current ka sum exactly target ho gaya.
```

Action:

```txt
result.push(copy of current)
```

### `remaining < 0`

Meaning:

```txt
current ka sum target se zyada ho gaya.
```

Action:

```txt
return
```

Why:

```txt
Candidates positive hain, so aage pick karne se sum aur badhega.
```

### `index === candidates.length`

Meaning:

```txt
Saare candidates decide ho chuke hain.
```

If remaining zero nahi hai:

```txt
valid combination nahi mila.
```

### Pick branch

```txt
explore(index, remaining - candidates[index])
```

Index same because:

```txt
same candidate reuse karna allowed hai.
```

### Skip branch

```txt
explore(index + 1, remaining)
```

Index next because:

```txt
current candidate current path ke liye permanently skipped hai.
```

---

## 9. Adjustment Logic

At each recursion frame:

| step | action | why |
|---:|---|---|
| `1` | check `remaining === 0` | valid combination complete |
| `2` | check `remaining < 0` | sum target se exceed ho gaya |
| `3` | check `index === candidates.length` | no candidate left |
| `4` | push current candidate | pick branch start |
| `5` | recurse with same index | unlimited repetition allow karna |
| `6` | pop current candidate | pick choice undo karna |
| `7` | recurse with `index + 1` | skip branch explore karna |

Algorithm:

```txt
1. result and current initialize karo.
2. Start explore(index=0, remaining=target).
3. Agar remaining 0 hai, current ka copy result me add karo.
4. Agar remaining negative hai, path invalid hai.
5. Agar index array length tak pahuch gaya, path invalid hai.
6. Pick: candidates[index] ko current me add karo.
7. Pick ke baad same index par recurse karo.
8. Return ke baad pop karke choice undo karo.
9. Skip: current candidate ko chhod kar index + 1 par recurse karo.
10. End me result return karo.
```

---

## 10. Answer Formula

State relation:

```txt
sum(current) + remaining = target
```

When:

```txt
remaining === 0
```

Then:

```txt
sum(current) = target
```

So:

```txt
current is a valid answer.
```

Time:

```txt
O(2^t)
```

Where:

```txt
t = target / min(candidates)
```

Space excluding output:

```txt
O(t)
```

Why:

```txt
Worst recursion depth tab hoti hai jab smallest candidate repeatedly pick hota hai.
```

Output space:

```txt
O(number of combinations * average combination length)
```

---

## 11. Full Dry Run

Input:

```txt
candidates = [2, 3]
target = 5
```

Initial:

```txt
result = []
current = []
explore(0, 5)
```

Execution table:

| step | call / action | current | remaining | result |
|---:|---|---|---:|---|
| `1` | `explore(0, 5)`, candidate `2` | `[]` | `5` | `[]` |
| `2` | pick `2`, call `explore(0, 3)` | `[2]` | `3` | `[]` |
| `3` | pick `2`, call `explore(0, 1)` | `[2,2]` | `1` | `[]` |
| `4` | pick `2`, call `explore(0, -1)` | `[2,2,2]` | `-1` | `[]` |
| `5` | remaining negative, return | `[2,2,2]` | `-1` | `[]` |
| `6` | backtrack pop `2` | `[2,2]` | `1` | `[]` |
| `7` | skip `2`, call `explore(1, 1)` | `[2,2]` | `1` | `[]` |
| `8` | pick `3`, call `explore(1, -2)` | `[2,2,3]` | `-2` | `[]` |
| `9` | remaining negative, return and pop `3` | `[2,2]` | `1` | `[]` |
| `10` | skip `3`, no candidates left | `[2,2]` | `1` | `[]` |
| `11` | return to `[2]`, skip `2`, call `explore(1, 3)` | `[2]` | `3` | `[]` |
| `12` | pick `3`, call `explore(1, 0)` | `[2,3]` | `0` | `[]` |
| `13` | remaining zero, push `[2,3]` | `[2,3]` | `0` | `[[2,3]]` |
| `14` | backtrack pop `3`, skip `3` | `[2]` | `3` | `[[2,3]]` |
| `15` | return to root, pop `2` | `[]` | `5` | `[[2,3]]` |
| `16` | root skip `2`, call `explore(1, 5)` | `[]` | `5` | `[[2,3]]` |
| `17` | pick `3`, call `explore(1, 2)` | `[3]` | `2` | `[[2,3]]` |
| `18` | pick `3`, call `explore(1, -1)` | `[3,3]` | `-1` | `[[2,3]]` |
| `19` | remaining negative, return and pop `3` | `[3]` | `2` | `[[2,3]]` |
| `20` | skip `3`, no candidates left | `[3]` | `2` | `[[2,3]]` |

Final:

```txt
[[2,3]]
```

Why no `[3,2]`?

```txt
Root ne jab 2 skip kiya, recursion index 1 par chali gayi.
Index 1 se 2 wapas available nahi hai.
```

---

## 12. Quick Reference

Pattern:

```txt
Pick current -> same index
Skip current -> index + 1
```

Base:

```txt
if remaining === 0:
  result.push([...current])
```

Invalid:

```txt
if remaining < 0:
  return

if index === candidates.length:
  return
```

Backtracking:

```txt
current.push(candidate)
explore(index, remaining - candidate)
current.pop()

explore(index + 1, remaining)
```

Memory line:

```txt
Pick means "aur le sakte hain", so same index.
Skip means "ab ye nahi lena", so next index.
```
