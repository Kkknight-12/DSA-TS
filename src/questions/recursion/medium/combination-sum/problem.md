# Combination Sum

## Problem Samjho

`candidates` array diya hai aur ek `target` diya hai.

Hume saare unique combinations return karne hain jinka sum `target` ke equal ho.

Important rule:

```txt
Same candidate ko unlimited times use kar sakte hain.
```

Example:

```txt
candidates = [2, 3, 6, 7]
target = 7
```

Valid combinations:

```txt
[2, 2, 3] -> 2 + 2 + 3 = 7
[7]       -> 7 = 7
```

Answer:

```txt
[[2, 2, 3], [7]]
```

---

## Key Rules

| rule | meaning |
|---|---|
| Candidates are distinct | input me duplicate values nahi hain |
| Same value reusable | `2` ko multiple times pick kar sakte hain |
| Combination order does not matter | `[2,2,3]` and `[2,3,2]` same combination maane jayenge |
| Need unique combinations | duplicate permutations generate nahi karni |

---

## Examples

### Example 1

```txt
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
```

### Example 2

```txt
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

### Example 3

```txt
Input: candidates = [2], target = 1
Output: []
```

---

## Approach 1: Brute Force Generate Everything

### Prerequisites

| concept | why needed |
|---|---|
| Recursion | choices repeatedly explore karni hain |
| Sum tracking | current path target tak pahucha ya nahi dekhna hai |

### Intuition

Ek naive thought:

```txt
Har possible sequence generate karo,
phir jiska sum target ho usko answer me rakho.
```

Problem:

```txt
[2,3,2] and [2,2,3] same combination hain,
but brute force sequence approach dono generate kar sakta hai.
```

So brute force me duplicate handling messy ho jata hai.

---

## Approach 2: Backtracking With Pick / Skip

### Prerequisites

| concept | why needed |
|---|---|
| Pick / skip recursion | har candidate ke liye do choices leni hain |
| Backtracking | current path me value add karke baad me undo karni hai |
| Recursion tree | same index vs next index clearly dekhna hai |

### Intuition

Har index par two decisions:

```txt
PICK current candidate
SKIP current candidate
```

But yahan important twist hai:

```txt
PICK -> same index par raho
SKIP -> next index par jao
```

Why same index on pick?

```txt
Same element unlimited times use kar sakte hain.
```

Why next index on skip?

```txt
Ek baar candidate skip kar diya, toh us value ko current path me dobara nahi laayenge.
Isse permutations/duplicates avoid hote hain.
```

---

## Visual Mental Model

For:

```txt
candidates = [2, 3]
target = 5
```

```txt
root  index=0, remaining=5, current=[]
│
├── PICK 2 -> stay index=0, remaining=3, current=[2]
│   │
│   ├── PICK 2 -> stay index=0, remaining=1, current=[2,2]
│   │   ├── PICK 2 -> remaining=-1 -> invalid
│   │   └── SKIP 2 -> index=1, remaining=1 -> no valid path
│   │
│   └── SKIP 2 -> index=1, remaining=3, current=[2]
│       ├── PICK 3 -> remaining=0, current=[2,3] -> valid
│       └── SKIP 3 -> end
│
└── SKIP 2 -> index=1, remaining=5, current=[]
    ├── PICK 3 -> remaining=2, current=[3]
    └── SKIP 3 -> end
```

Answer:

```txt
[[2,3]]
```

---

## Why This Avoids Duplicates

We always move left to right.

If current path skips `2`, then it moves to `3`.

After that:

```txt
2 cannot come back later.
```

So:

```txt
[2,3] generate ho sakta hai
[3,2] generate nahi hoga
```

This is exactly what we want because combination order does not matter.

---

## Approach Comparison

| approach | idea | duplicate risk | time | space | use? |
|---|---|---|---:|---:|---|
| Generate all sequences | try every possible ordered sequence | high | exponential | exponential | not preferred |
| Pick / skip backtracking | same index on pick, next index on skip | controlled | exponential | O(target / min) excluding output | preferred |

---

## Complexity

Let:

```txt
t = target / min(candidates)
```

Time:

```txt
O(2^t)
```

Why:

```txt
Worst case me recursion depth target/min tak ja sakti hai,
aur har frame pick/skip branches create kar sakta hai.
```

Auxiliary space:

```txt
O(t)
```

Why:

```txt
Recursion depth + current path max target/min size tak ja sakte hain.
```

Output space:

```txt
O(number of combinations * average combination length)
```

---

## Final Recommendation

Use:

```txt
Backtracking with Pick / Skip
```

Most important line to remember:

```txt
Pick -> same index
Skip -> next index
```
