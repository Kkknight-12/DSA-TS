# Subsets II - Notes

## 1. Problem Samjho

Hume `nums` array diya hai.
Array me duplicate values ho sakti hain.

Task:

```txt
saare unique subsets return karo
```

Important:

```txt
empty subset bhi answer ka part hai
duplicate subsets output me nahi aane chahiye
```

Example:

```txt
nums = [1,2,2]
answer = [[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 2. Brute Force

Brute force idea:

```txt
saare subsets generate karo
phir duplicates hata do
```

Problem:

```txt
extra deduplication structure chahiye
```

Example:

```txt
nums = [1,2,2]
```

Value-wise duplicate subsets ban sakte hain:

```txt
[1,2] from first 2
[1,2] from second 2
```

So better approach:

```txt
sort karo
same level duplicates skip karo
```

---

## 3. Key Insight

Sort karne se duplicate values adjacent aa jaati hain.

Example:

```txt
[2,1,2] -> [1,2,2]
```

Ab duplicate-skip condition possible hai:

```txt
i > start && nums[i] === nums[i - 1]
```

Core meaning:

```txt
current recursion level par previous same value se branch already ban chuki hai
```

---

## 4. Why This Technique Works

Har recursion level par:

```txt
for i = start to n - 1
```

Each `i` means:

```txt
current level ke next subset element ke liye is value ko choose karna
```

Agar same level par same value dobara choose karenge:

```txt
same subset duplicate ban jayega
```

But deeper level par duplicate choose karna valid ho sakta hai.

Example:

```txt
[1,2,2]
```

`[1,2,2]` valid hai because:

```txt
first 2 level-2 par choose hua
second 2 level-3 par choose hua
```

So rule:

```txt
same level duplicate skip
next level duplicate allow
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `sortedNums` | sorted copy of input |
| `start` | current level ka first allowed index |
| `i` | loop choice pointer |
| `current` | current subset being built |
| `result` | all unique subsets |

State example:

```txt
sortedNums = [1,2,2]
start = 1
i = 2
current = [1]
```

Meaning:

```txt
Hum [1] subset state par hain
is level ki choices index 1 se start hoti hain
i = 2 wala 2 same level duplicate ho sakta hai
```

---

## 6. Mental Model

Har recursive call ka first action:

```txt
current subset ko result me add karo
```

Why?

```txt
because current state khud ek valid subset hai
```

Then loop current level ki next choices try karta hai.

For:

```txt
[1,2,2]
```

Mental model:

```txt
[]         add
[1]        add
[1,2]      add
[1,2,2]    add
[2]        add
[2,2]      add
```

Recursion tree:

```txt
root  start=0, current=[]
│
├── add []
├── i=0 choose 1 -> current=[1]
│   ├── add [1]
│   ├── i=1 choose 2 -> current=[1,2]
│   │   ├── add [1,2]
│   │   └── i=2 choose 2 -> current=[1,2,2]
│   │       └── add [1,2,2]
│   └── i=2 duplicate 2 -> skip
│
├── i=1 choose 2 -> current=[2]
│   ├── add [2]
│   └── i=2 choose 2 -> current=[2,2]
│       └── add [2,2]
│
└── i=2 duplicate 2 -> skip
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty array | `[]` | `[[]]` | empty subset always present |
| single element | `[1]` | `[[], [1]]` | two subsets |
| all duplicates | `[1,1,1]` | `[[], [1], [1,1], [1,1,1]]` | same-level duplicates skipped |
| all distinct | `[1,2,3]` | `8 subsets` | normal subsets behaviour |
| mixed duplicates | `[1,1,2,2]` | unique subsets only | duplicate values grouped by sorting |

---

## 8. Conditions

### `result.push([...current])`

Meaning:

```txt
current state khud ek valid subset hai
```

Action:

```txt
copy store karo
```

### `i > start`

Meaning:

```txt
ye current level ka first option nahi hai
```

### `nums[i] === nums[i - 1]`

Meaning:

```txt
current value previous value jaisi hi hai
```

### Combined condition

```txt
i > start && nums[i] === nums[i - 1]
```

Meaning:

```txt
same level par same value ka repeated starting choice
```

Action:

```txt
skip karo
```

### Why `i > start`, not `i > 0`?

Because:

```txt
first occurrence of this level allowed hona chahiye
sirf later duplicate occurrences skip hongi
```

---

## 9. Adjustment Logic

Yahan pointer adjustment `start` aur `i` se hota hai.

| step | adjustment | why |
|---|---|---|
| current level loop | `i = start ... end` | current level ki choices explore karni hain |
| recurse after pick | `start = i + 1` | same index dobara use nahi karna |
| after recurse | `current.pop()` | current frame ki choice undo karni hai |

State adjustment:

| operation | effect |
|---|---|
| `current.push(nums[i])` | chosen value current subset me add hoti hai |
| `current.pop()` | same frame ki pick undo hoti hai |

---

## 10. Answer Formula

Direct numeric formula nahi hai,
but worst-case subset count relation important hai:

```txt
distinct elements ke liye total subsets = 2^n
```

Duplicates hone par:

```txt
actual answer size <= 2^n
```

Complexity:

```txt
Time  = O(n * 2^n)
Space = O(n)
```

---

## 11. Full Dry Run

Example:

```txt
nums = [1,2,2]
sortedNums = [1,2,2]
```

### Call Table

| call | start | current before add | subset added to result |
|---|---|---|---|
| 1 | 0 | `[]` | `[]` |
| 2 | 1 | `[1]` | `[1]` |
| 3 | 2 | `[1,2]` | `[1,2]` |
| 4 | 3 | `[1,2,2]` | `[1,2,2]` |
| 5 | 2 | `[2]` | `[2]` |
| 6 | 3 | `[2,2]` | `[2,2]` |

### Duplicate Skip Table

| level start | i | value | previous value | skip? | why |
|---|---|---|---|---|---|
| 1 | 2 | `2` | `2` | yes | `i > start` and same level duplicate |
| 0 | 2 | `2` | `2` | yes | root level par second `2` duplicate start branch banata |

### Step Flow

| step | current | action | result |
|---|---|---|---|
| 1 | `[]` | add current | `[[]]` |
| 2 | `[1]` | choose 1 and recurse | `[[], [1]]` after next call add |
| 3 | `[1,2]` | choose first 2 and recurse | add `[1,2]` |
| 4 | `[1,2,2]` | choose second 2 deeper level | add `[1,2,2]` |
| 5 | `[1]` | same-level second 2 skip | unchanged |
| 6 | `[2]` | root level first 2 choose | add `[2]` |
| 7 | `[2,2]` | deeper level second 2 choose | add `[2,2]` |
| 8 | `[]` | root level second 2 skip | final done |

Final:

```txt
[[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 12. Quick Reference

| point | summary |
|---|---|
| main trick | sort + same-level duplicate skip |
| add to result | every recursive call |
| duplicate skip | `i > start && nums[i] === nums[i - 1]` |
| next recursion | `i + 1` |
| why `i + 1` | same index reuse nahi karna |
| same level duplicate | skip |
| next level duplicate | allowed |
| time | `O(n * 2^n)` |
| space | `O(n)` |
