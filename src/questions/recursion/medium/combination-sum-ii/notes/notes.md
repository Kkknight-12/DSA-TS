# Combination Sum II - Notes

## 1. Problem Samjho

`candidates` array diya hai aur ek `target` diya hai.

Hume saare unique combinations return karne hain jinka sum target ho.

Important rules:

```txt
Har element sirf ek baar use ho sakta hai.
Input array me duplicate values ho sakti hain.
Output me duplicate combinations nahi chahiye.
```

Example:

```txt
candidates = [10,1,2,7,6,1,5]
target = 8
```

Answer:

```txt
[[1,1,6], [1,2,5], [1,7], [2,6]]
```

---

## 2. Brute Force

Brute force idea:

```txt
Saare subsets generate karo.
Jiska sum target ho, answer me rakho.
```

Problem:

```txt
candidates = [1, 1, 2]
target = 3
```

Possible duplicate outputs:

```txt
[1(first), 2]
[1(second), 2]
```

Value-wise dono:

```txt
[1,2]
```

So brute force ko extra set/deduplication chahiye.

Better approach:

```txt
Sort karo, aur recursion ke same level par duplicate starting choices skip karo.
```

---

## 3. Key Insight

Sort karne se duplicates adjacent aa jaate hain.

Example:

```txt
[10,1,2,7,6,1,5]
```

After sorting:

```txt
[1,1,2,5,6,7,10]
```

Now duplicate skip condition possible hai:

```txt
if (i > start && candidates[i] === candidates[i - 1]) continue
```

Core meaning:

```txt
Same recursion level par same value se branch already ban chuki hai.
```

---

## 4. Why This Technique Works

At each recursion level:

```txt
for i = start to n - 1
```

Each `i` means:

```txt
Is value ko current position ke liye choose karna.
```

If same level me same value dobara choose karenge:

```txt
same combination duplicate ho jayegi.
```

But next level me duplicate choose karna valid ho sakta hai.

Example:

```txt
[1,1,6]
```

Yahan dono `1` use hue, but different recursion levels par.

That is why:

```txt
same level duplicate skip
next level duplicate allow
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `candidates` | original input array |
| `sortedCandidates` | sorted copy used for recursion |
| `target` | required sum |
| `start` | current level ka first allowed index |
| `i` | loop pointer, candidate choice for this level |
| `remaining` | target ka kitna part abhi banana baaki hai |
| `current` | current combination being built |
| `result` | all valid unique combinations |

State example:

```txt
sortedCandidates = [1,1,2,5]
start = 1
i = 1
remaining = 6
current = [1]
```

Meaning:

```txt
First 1 choose ho chuka hai.
Ab next level par index 1 se choices try kar rahe hain.
Index 1 wala second 1 allowed hai because i === start.
```

---

## 6. Mental Model

Think of `start` as:

```txt
Is level par choices yahan se start hongi.
```

Think of `i > start` as:

```txt
Ye level ka first option nahi hai.
```

So condition:

```txt
i > start && candidates[i] === candidates[i - 1]
```

Means:

```txt
Ye same level ka repeated value hai.
Skip karo.
```

Decision tree for `[1,1,2,5]`, target `7`:

```txt
root  start=0, remaining=7, current=[]
│
├── i=0 choose 1 -> start=1, remaining=6, current=[1]
│   ├── i=1 choose 1 -> start=2, remaining=5, current=[1,1]
│   │   ├── i=2 choose 2 -> remaining=3, no valid path
│   │   └── i=3 choose 5 -> remaining=0, push [1,1,5]
│   │
│   ├── i=2 choose 2 -> start=3, remaining=4, current=[1,2]
│   │   └── i=3 value 5 > remaining 4, break
│   │
│   └── i=3 choose 5 -> start=4, remaining=1, current=[1,5]
│
├── i=1 value 1 -> skip same-level duplicate
│
├── i=2 choose 2 -> start=3, remaining=5, current=[2]
│   └── i=3 choose 5 -> remaining=0, push [2,5]
│
└── i=3 choose 5 -> start=4, remaining=2, no valid path
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| all duplicates | `[1,1,1,1]`, target `2` | `[[1,1]]` | output duplicate nahi chahiye |
| no solution | `[2,3,5]`, target `1` | `[]` | all values target se bade |
| direct candidate | `[1,2,3,4,5]`, target `5` | includes `[5]` | single value target bana sakti hai |
| multiple duplicate group | `[2,2,2,2]`, target `4` | `[[2,2]]` | enough indices exist, but output one combo |
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

### `i > start`

Meaning:

```txt
Current index same recursion level ka later choice hai.
```

### `candidates[i] === candidates[i - 1]`

Meaning:

```txt
Current value previous value jaisi hai.
```

### Combined duplicate condition

```txt
i > start && candidates[i] === candidates[i - 1]
```

Meaning:

```txt
Same level par same value already process ho chuki hai.
```

Action:

```txt
continue
```

### `candidate > remaining`

Meaning:

```txt
Current value hi remaining target se badi hai.
```

Action:

```txt
break
```

Why break, not continue?

```txt
Array sorted hai.
Aage ke values bhi current candidate se bade/equal honge.
```

---

## 9. Adjustment Logic

At each recursion frame:

| step | action | why |
|---:|---|---|
| `1` | check `remaining === 0` | valid combination complete |
| `2` | loop from `start` to end | current level ke choices try karna |
| `3` | skip same-level duplicate | duplicate output avoid karna |
| `4` | break if candidate > remaining | sorted array me further values useless |
| `5` | push candidate | choice pick karna |
| `6` | recurse with `i + 1` | each element max once use karna |
| `7` | pop candidate | current choice undo karna |

Algorithm:

```txt
1. Candidates ko sort karo.
2. result and current initialize karo.
3. Start explore(start=0, remaining=target).
4. Agar remaining 0 hai, current ka copy result me add karo.
5. Current level par i=start se end tak loop chalao.
6. Agar same level duplicate mile, skip karo.
7. Agar candidate remaining se bada ho, break karo.
8. Candidate pick karo.
9. i + 1 se recurse karo because element once use ho sakta hai.
10. Return ke baad pop karke choice undo karo.
11. End me result return karo.
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

So current is valid.

Time:

```txt
O(2^n)
```

Why:

```txt
Worst case me every element pick/not-pick style possibilities create kar sakta hai.
```

Auxiliary space:

```txt
O(n)
```

Why:

```txt
Recursion stack and current path max n length tak ja sakte hain.
```

Output space:

```txt
O(number of combinations * average combination length)
```

---

## 11. Full Dry Run

Input:

```txt
candidates = [1,1,2,5]
target = 7
```

Initial:

```txt
sortedCandidates = [1,1,2,5]
result = []
current = []
explore(0, 7)
```

Execution table:

| step | call / action | current | remaining | result |
|---:|---|---|---:|---|
| `1` | `explore(0, 7)` starts, loop from `i=0` | `[]` | `7` | `[]` |
| `2` | `i=0`, choose `1`, call `explore(1, 6)` | `[1]` | `6` | `[]` |
| `3` | `i=1`, choose second `1`, call `explore(2, 5)` | `[1,1]` | `5` | `[]` |
| `4` | `i=2`, choose `2`, call `explore(3, 3)` | `[1,1,2]` | `3` | `[]` |
| `5` | `i=3`, candidate `5 > 3`, break | `[1,1,2]` | `3` | `[]` |
| `6` | pop `2`, back to `current=[1,1]` | `[1,1]` | `5` | `[]` |
| `7` | `i=3`, choose `5`, call `explore(4, 0)` | `[1,1,5]` | `0` | `[]` |
| `8` | remaining zero, push `[1,1,5]` | `[1,1,5]` | `0` | `[[1,1,5]]` |
| `9` | pop `5`, return to level with `current=[1]` | `[1]` | `6` | `[[1,1,5]]` |
| `10` | `i=2`, choose `2`, call `explore(3, 4)` | `[1,2]` | `4` | `[[1,1,5]]` |
| `11` | `i=3`, candidate `5 > 4`, break | `[1,2]` | `4` | `[[1,1,5]]` |
| `12` | pop `2`, `i=3`, choose `5`, call `explore(4, 1)` | `[1,5]` | `1` | `[[1,1,5]]` |
| `13` | no candidates left, return and pop `5` | `[1]` | `1` | `[[1,1,5]]` |
| `14` | back to root, pop first `1` | `[]` | `7` | `[[1,1,5]]` |
| `15` | root `i=1`, value `1`, skip duplicate | `[]` | `7` | `[[1,1,5]]` |
| `16` | root `i=2`, choose `2`, call `explore(3, 5)` | `[2]` | `5` | `[[1,1,5]]` |
| `17` | `i=3`, choose `5`, call `explore(4, 0)` | `[2,5]` | `0` | `[[1,1,5]]` |
| `18` | remaining zero, push `[2,5]` | `[2,5]` | `0` | `[[1,1,5],[2,5]]` |
| `19` | root `i=3`, choose `5`, no valid continuation | `[5]` | `2` | `[[1,1,5],[2,5]]` |

Final:

```txt
[[1,1,5], [2,5]]
```

Why root `i=1` skipped?

```txt
At root level, i=0 already created all branches starting with value 1.
If i=1 also creates branches starting with value 1,
same combinations duplicate ho jayengi.
```

Why level `start=1`, `i=1` was allowed?

```txt
Because first 1 already current me hai.
Second 1 is the first choice of the next level,
so [1,1,5] valid ban sakta hai.
```

---

## 12. Quick Reference

Pattern:

```txt
Sort first.
Loop from start.
Skip same-level duplicates.
Recurse with i + 1.
```

Duplicate skip:

```txt
if (i > start && candidates[i] === candidates[i - 1]) continue
```

Base:

```txt
if remaining === 0:
  result.push([...current])
```

Pick:

```txt
current.push(candidates[i])
explore(i + 1, remaining - candidates[i])
current.pop()
```

Memory line:

```txt
Same level duplicate skip.
Next level duplicate allow.
```
