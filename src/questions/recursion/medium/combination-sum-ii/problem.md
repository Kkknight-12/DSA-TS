# Combination Sum II

## Problem Samjho

`candidates` array diya hai aur ek `target` diya hai.

Hume saare unique combinations return karne hain jinka sum `target` ho.

Important differences from `Combination Sum I`:

```txt
Each element sirf ek baar use ho sakta hai.
Input array me duplicate values ho sakti hain.
Output me duplicate combinations nahi chahiye.
```

Example:

```txt
candidates = [10, 1, 2, 7, 6, 1, 5]
target = 8
```

Valid answer:

```txt
[[1,1,6], [1,2,5], [1,7], [2,6]]
```

---

## Key Rules

| rule | meaning |
|---|---|
| Each element once | same index ko dobara use nahi kar sakte |
| Duplicates in input allowed | `[1,1,2]` possible hai |
| Duplicate output not allowed | `[1,2]` answer me ek baar hi aana chahiye |
| Order of combination does not matter | `[1,7]` and `[7,1]` same hain |

---

## Examples

### Example 1

```txt
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
```

### Example 2

```txt
Input: candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],[5]]
```

### Example 3

```txt
Input: candidates = [2], target = 1
Output: []
```

---

## Approach 1: Brute Force Subsets

### Prerequisites

| concept | why needed |
|---|---|
| Subsets | each element pick/skip ho sakta hai |
| Duplicate filtering | same combination repeat ho sakti hai |

### Intuition

Ek naive approach:

```txt
Saare subsets generate karo.
Jinka sum target ho, unko answer me rakho.
```

Problem:

```txt
candidates = [1, 1, 2]
target = 3
```

Subsets se duplicate answer aa sakta hai:

```txt
[1(first), 2]
[1(second), 2]
```

Value-wise dono:

```txt
[1, 2]
```

So brute force needs extra set/deduplication.

---

## Approach 2: Sort + Backtracking + Same-Level Duplicate Skip

### Prerequisites

| concept | why needed |
|---|---|
| Sorting | duplicate values adjacent ho jaati hain |
| Backtracking | current path build and undo karna hai |
| Same-level duplicate skip | duplicate output avoid karna hai |

### Intuition

Sort first:

```txt
[10,1,2,7,6,1,5]
```

Becomes:

```txt
[1,1,2,5,6,7,10]
```

Now duplicate `1`s side by side hain.

At each recursion level:

```txt
for i = start to n - 1
```

If:

```txt
i > start && candidates[i] === candidates[i - 1]
```

Then skip.

Why?

```txt
Same recursion level par same value se branch already ban chuki hai.
Second same value se branch banayenge toh duplicate combinations banenge.
```

---

## Most Important Condition

```ts
if (i > start && candidates[i] === candidates[i - 1]) {
  continue;
}
```

Meaning:

| part | meaning |
|---|---|
| `candidates[i] === candidates[i - 1]` | current value previous value jaisi hai |
| `i > start` | current value same recursion level ka later duplicate hai |

Why `i > start` needed?

```txt
First duplicate ko skip nahi karna.
Sirf same level me later duplicate ko skip karna.
```

Example:

```txt
candidates = [1,1,2]
```

At level `start = 0`:

| i | value | skip? | why |
|---:|---:|---|---|
| `0` | `1` | no | first `1` at this level |
| `1` | `1` | yes | same level duplicate |
| `2` | `2` | no | different value |

After picking first `1`, next level `start = 1`:

| i | value | skip? | why |
|---:|---:|---|---|
| `1` | `1` | no | first value at this new level |
| `2` | `2` | no | different value |

This allows valid combination:

```txt
[1,1]
```

But prevents duplicate starting branches.

---

## Difference From Combination Sum I

| feature | Combination Sum I | Combination Sum II |
|---|---|---|
| reuse same element | yes | no |
| input duplicates | no | yes |
| after pick | same index | `i + 1` |
| duplicate handling | not needed | same-level skip needed |
| sorting | optional | needed for clean duplicate skip |

---

## Complexity

Time:

```txt
O(2^n)
```

Why:

```txt
Worst case me every element ke paas pick/not-pick style choice hoti hai.
```

Auxiliary space:

```txt
O(n)
```

Why:

```txt
Recursion depth and current path max n elements tak ja sakte hain.
```

Output space:

```txt
O(number of combinations * average combination length)
```

---

## Final Recommendation

Use:

```txt
Sort + loop-based backtracking + same-level duplicate skip.
```

Memory line:

```txt
Same level duplicate skip karo.
Next level duplicate allow karo.
```
