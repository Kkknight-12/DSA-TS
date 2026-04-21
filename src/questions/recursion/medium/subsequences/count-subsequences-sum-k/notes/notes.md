# Count Subsequences Sum K - Notes

## 1. Problem Samjho

Array `nums` aur target `k` diya hai.

Question:

```txt
Kitni non-empty subsequences ka sum exactly k hai?
```

Example:

```txt
nums = [4, 5, 1]
k = 10
```

Answer:

```txt
1
```

Because:

```txt
[4, 5, 1] ka sum = 10
```

Important:

```txt
Yahan true/false nahi chahiye.
Yahan total count chahiye.
```

---

## 2. Brute Force

Brute force me saari non-empty subsequences generate kar sakte hain.

For each element:

```txt
pick
not pick
```

For `nums = [4, 5, 1]`:

| subsequence | sum | target `10`? |
|---|---:|---|
| `[4]` | `4` | no |
| `[5]` | `5` | no |
| `[1]` | `1` | no |
| `[4, 5]` | `9` | no |
| `[4, 1]` | `5` | no |
| `[5, 1]` | `6` | no |
| `[4, 5, 1]` | `10` | yes |

Count:

```txt
1
```

Problem:

```txt
Total subsequences = 2^n
```

So brute force grows very fast.

---

## 3. Key Insight

Har element par same choice hai:

```txt
Pick current element
or
Not pick current element
```

But unlike check-subsequence problem:

```txt
Ek valid path milte hi ruk nahi sakte.
```

Why?

```txt
Because hume total count chahiye.
```

So every frame returns:

```txt
pick branch ka count + not-pick branch ka count
```

---

## 4. Why This Technique Works

Every subsequence ek unique sequence of decisions se banti hai.

Example:

```txt
nums = [4, 5, 1]
subsequence = [4, 1]
```

Choices:

| index | value | choice | sum after choice |
|---:|---:|---|---:|
| `0` | `4` | pick | `4` |
| `1` | `5` | not pick | `4` |
| `2` | `1` | pick | `5` |

So recursion tree ke each root-to-leaf path exactly one subsequence represent karta hai.

At leaf:

| leaf sum | return |
|---:|---:|
| equals `k` | `1` |
| not equal `k` | `0` |

Then parent nodes counts add karte hain.

---

## 5. Variables

| variable | meaning |
|---|---|
| `nums` | original array |
| `target` / `k` | required sum |
| `index` | abhi kis element par decision lena hai |
| `currentSum` | abhi tak picked elements ka sum |
| `pickCount` | current element pick karne wale subtree ka count |
| `notPickCount` | current element skip karne wale subtree ka count |

State example:

```txt
index = 2
currentSum = 9
nums[index] = 1
target = 10
```

Meaning:

```txt
Ab tak sum 9 bana hai.
Element 1 pick karenge toh sum 10 ban jayega.
```

---

## 6. Mental Model

Think of recursion as a counting tree.

```txt
root  (index=0, sum=0)
│
├── pick nums[0]
│   returns count from left subtree
│
└── not pick nums[0]
    returns count from right subtree
```

Parent:

```txt
left count + right count
```

Simple memory:

```txt
Check problem -> OR logic
Count problem -> ADD logic
```

Comparison:

| problem | merge logic |
|---|---|
| check if exists | `pick || notPick` |
| count all | `pickCount + notPickCount` |

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---:|---|
| single element equals target | `[5]`, `k=5` | `1` | `[5]` works |
| single element not equal | `[5]`, `k=3` | `0` | no valid subsequence |
| all elements needed | `[1,2,3]`, `k=6` | `1` | whole array works |
| repeated values | `[1,1,1]`, `k=2` | `3` | index pairs differ |
| target too large | `[1,2,3]`, `k=10` | `0` | target not possible |
| zero target | `[1,2,3]`, `k=0` | `0` | empty subsequence not counted |

---

## 8. Conditions

End condition:

```txt
index === nums.length
```

Meaning:

```txt
Saare elements ke pick/not-pick decisions complete ho gaye.
```

At this point:

```txt
currentSum === target ? 1 : 0
```

Problem language:

| condition | meaning | return |
|---|---|---:|
| `currentSum === target` | this path is one valid subsequence | `1` |
| `currentSum !== target` | this path is invalid | `0` |

Pruning condition:

```txt
currentSum > target
```

Meaning:

```txt
Sum target se aage nikal gaya.
```

Why valid here:

```txt
nums values positive hain, future picks sum ko kam nahi kar sakte.
```

---

## 9. Adjustment Logic

At every call:

| step | action | why |
|---:|---|---|
| `1` | check if `index === nums.length` | one complete subsequence path is ready |
| `2` | if `currentSum === target`, return `1` | this path is valid |
| `3` | otherwise return `0` at leaf | this path is invalid |
| `4` | try pick branch | include current element |
| `5` | try not-pick branch | skip current element |
| `6` | return `pickCount + notPickCount` | total valid paths from both sides |

Algorithm:

```txt
1. Start recursion from index 0 and currentSum 0.
2. Har element par pick branch explore karo.
3. Pick branch me currentSum + nums[index] ke saath next index par jao.
4. Har element par not-pick branch bhi explore karo.
5. Not-pick branch me currentSum same rakho and next index par jao.
6. Base case par agar currentSum target ke equal hai, return 1.
7. Base case par agar currentSum target ke equal nahi hai, return 0.
8. Current frame ka answer = pickCount + notPickCount.
```

---

## 10. Answer Formula

Recursive function:

```txt
count(index, currentSum)
```

Returns:

```txt
index se end tak valid subsequences ka count
```

Formula:

```txt
count(index, currentSum)
  = count(index + 1, currentSum + nums[index])
  + count(index + 1, currentSum)
```

In words:

```txt
Total count = pick side ke valid paths + not-pick side ke valid paths
```

---

## 11. Full Dry Run

Input:

```txt
nums = [4, 5, 1]
k = 10
```

Goal:

```txt
Count all subsequences whose sum is 10.
```

Decision tree:

```txt
root  (index=0, sum=0, next=4)
│
├── pick 4 -> (index=1, sum=4)
│   │
│   ├── pick 5 -> (index=2, sum=9)
│   │   │
│   │   ├── pick 1 -> (index=3, sum=10) -> return 1
│   │   └── not pick 1 -> (index=3, sum=9) -> return 0
│   │
│   └── not pick 5 -> (index=2, sum=4)
│       │
│       ├── pick 1 -> (index=3, sum=5) -> return 0
│       └── not pick 1 -> (index=3, sum=4) -> return 0
│
└── not pick 4 -> (index=1, sum=0)
    │
    ├── pick 5 -> (index=2, sum=5)
    │   │
    │   ├── pick 1 -> (index=3, sum=6) -> return 0
    │   └── not pick 1 -> (index=3, sum=5) -> return 0
    │
    └── not pick 5 -> (index=2, sum=0)
        │
        ├── pick 1 -> (index=3, sum=1) -> return 0
        └── not pick 1 -> (index=3, sum=0) -> return 0
```

Execution table:

| step | call / action | returned count | why |
|---:|---|---:|---|
| `1` | `count(0, 0)` | pending | decide for `4` |
| `2` | pick `4` -> `count(1, 4)` | pending | left subtree |
| `3` | pick `5` -> `count(2, 9)` | pending | sum close to target |
| `4` | pick `1` -> `count(3, 10)` | `1` | leaf sum equals target |
| `5` | not pick `1` -> `count(3, 9)` | `0` | leaf sum not target |
| `6` | back to `count(2, 9)` | `1` | `1 + 0` |
| `7` | not pick `5` subtree from `count(1, 4)` | `0` | sums `5` and `4` |
| `8` | back to `count(1, 4)` | `1` | `1 + 0` |
| `9` | not pick `4` subtree from root | `0` | no sum reaches `10` |
| `10` | back to root | `1` | `pickCount 1 + notPickCount 0` |

Final:

```txt
1
```

Count propagation:

| subtree | count |
|---|---:|
| pick `4` subtree | `1` |
| not-pick `4` subtree | `0` |
| final count | `1` |

---

## 12. Quick Reference

Pattern:

```txt
Subsequence recursion = pick / not-pick
```

State:

```txt
index, currentSum
```

Base:

```txt
if index === nums.length:
  return currentSum === target ? 1 : 0
```

Merge:

```txt
pickCount + notPickCount
```

Memory line:

```txt
Check exists me first true enough hai.
Count problem me both branches ka count add karna padta hai.
```
