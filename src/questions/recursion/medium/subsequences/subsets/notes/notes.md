# Subsets - Notes

## 1. Problem Samjho

Array `nums` diya hai.

Hume saare possible subsets return karne hain.

Example:

```txt
nums = [1, 2]
```

Output:

```txt
[[1,2], [1], [2], []]
```

Subset ka meaning:

```txt
Original array ke elements me se kuch elements choose karo.
Kuch bhi choose kar sakte hain, including kuch bhi nahi.
```

So empty subset `[]` bhi answer ka part hota hai.

---

## 2. Brute Force

Brute force me har possible combination manually generate kar sakte hain.

For each element:

```txt
include
exclude
```

For `nums = [1, 2]`:

| choice for `1` | choice for `2` | subset |
|---|---|---|
| include | include | `[1,2]` |
| include | exclude | `[1]` |
| exclude | include | `[2]` |
| exclude | exclude | `[]` |

Total:

```txt
2 * 2 = 4 subsets
```

For `n` elements:

```txt
2^n subsets
```

---

## 3. Key Insight

Har element ke paas exactly 2 choices hain:

```txt
1. Include current element
2. Exclude current element
```

This is the same subsequence family pattern:

```txt
pick / not-pick
```

Difference:

```txt
Yahan hume saare final paths store karne hain.
```

So every leaf of recursion tree becomes one subset.

---

## 4. Why This Technique Works

Every subset can be represented by a decision path.

Example:

```txt
nums = [1, 2]
subset = [1]
```

Decision path:

| index | value | choice |
|---:|---:|---|
| `0` | `1` | include |
| `1` | `2` | exclude |

Subset `[2]`:

| index | value | choice |
|---:|---:|---|
| `0` | `1` | exclude |
| `1` | `2` | include |

So recursion tree ke all root-to-leaf paths cover karne se all subsets mil jaate hain.

---

## 5. Variables

| variable | meaning |
|---|---|
| `nums` | original array |
| `index` | abhi kis element par decision lena hai |
| `current` | abhi tak built subset |
| `result` | saare completed subsets |

State example:

```txt
index = 1
current = [1]
nums[index] = 2
```

Meaning:

```txt
1 include ho chuka hai.
Ab 2 ko include ya exclude karna hai.
```

---

## 6. Mental Model

Think of each recursion frame as a question:

```txt
Kya nums[index] ko current subset me include karna hai?
```

Two branches:

| branch | action |
|---|---|
| include | `current.push(nums[index])` |
| exclude | no push |

Backtracking step:

```txt
include branch complete hone ke baad current.pop()
```

Meaning:

```txt
Current frame ki include choice undo karo,
taki exclude branch clean state se start ho.
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty input | `[]` | `[[]]` | empty array ka empty subset |
| one element | `[0]` | `[[0], []]` | include or exclude |
| two elements | `[1,2]` | 4 subsets | `2^2` |
| negative values | `[-1,0,1]` | 8 subsets | value sign does not matter |
| unique values | `[1,2,3]` | 8 subsets | no duplicate input values |

---

## 8. Conditions

Base condition:

```txt
index === nums.length
```

Meaning:

```txt
Saare elements ke include/exclude decisions complete ho gaye.
```

At base:

```txt
result.push([...current])
```

Why copy?

```txt
current backtracking ke saath mutate hota hai.
Result me snapshot store karna hai, live reference nahi.
```

Include condition:

```txt
current.push(nums[index])
```

Meaning:

```txt
Current element is subset ka part hai.
```

Exclude condition:

```txt
push ke bina next index par recurse
```

Meaning:

```txt
Current element is subset ka part nahi hai.
```

---

## 9. Adjustment Logic

At every call:

| step | action | why |
|---:|---|---|
| `1` | check base case | if all decisions done, store subset |
| `2` | push current element | include branch banana hai |
| `3` | recurse to next index | next element ka decision |
| `4` | pop current element | include choice undo karni hai |
| `5` | recurse without push | exclude branch banana hai |

Algorithm:

```txt
1. Start with empty result and empty current subset.
2. Start recursion from index 0.
3. Har index par pehle nums[index] ko current me include karo.
4. Include branch ke liye next index par recurse karo.
5. Include branch return kare toh current.pop() karke choice undo karo.
6. Ab same frame me nums[index] ko skip karne wali branch recurse karo.
7. Base case: index nums.length ke equal ho jaye toh current ka copy result me add karo.
8. Final result me saare leaf paths ke subsets mil jayenge.
```

---

## 10. Answer Formula

Number of subsets:

```txt
2^n
```

Why?

```txt
Har element ke 2 choices.
n elements ke liye 2 * 2 * ... * 2 = 2^n.
```

Recursive relation:

```txt
subsets(index)
  = include nums[index] branch
  + exclude nums[index] branch
```

Output:

```txt
All leaf paths stored in result.
```

---

## 11. Full Dry Run

Input:

```txt
nums = [1, 2]
```

Goal:

```txt
Generate all subsets.
```

Decision tree:

```txt
root  (index=0, current=[], result=[])
│
├── include 1 -> current=[1]
│   │
│   ├── include 2 -> current=[1,2]
│   │   └── base: push [1,2]
│   │
│   ├── backtrack: pop 2 -> current=[1]
│   │
│   └── exclude 2 -> current=[1]
│       └── base: push [1]
│
├── backtrack: pop 1 -> current=[]
│
└── exclude 1 -> current=[]
    │
    ├── include 2 -> current=[2]
    │   └── base: push [2]
    │
    ├── backtrack: pop 2 -> current=[]
    │
    └── exclude 2 -> current=[]
        └── base: push []
```

Execution table:

| step | call / action | current | result |
|---:|---|---|---|
| `1` | start `build(0)` | `[]` | `[]` |
| `2` | include `1` | `[1]` | `[]` |
| `3` | include `2` | `[1,2]` | `[]` |
| `4` | base case, push copy | `[1,2]` | `[[1,2]]` |
| `5` | backtrack pop `2` | `[1]` | `[[1,2]]` |
| `6` | exclude `2`, base push | `[1]` | `[[1,2], [1]]` |
| `7` | backtrack pop `1` | `[]` | `[[1,2], [1]]` |
| `8` | exclude `1`, include `2` | `[2]` | `[[1,2], [1]]` |
| `9` | base case, push copy | `[2]` | `[[1,2], [1], [2]]` |
| `10` | backtrack pop `2` | `[]` | `[[1,2], [1], [2]]` |
| `11` | exclude `2`, base push | `[]` | `[[1,2], [1], [2], []]` |

Final:

```txt
[[1,2], [1], [2], []]
```

---

## 12. Quick Reference

Pattern:

```txt
Subsets = include / exclude every element
```

Base:

```txt
if index === nums.length:
  result.push([...current])
```

Include:

```txt
current.push(nums[index])
build(index + 1)
```

Backtrack:

```txt
current.pop()
```

Exclude:

```txt
build(index + 1)
```

Memory line:

```txt
Push choice banata hai.
Pop usi frame ki choice undo karta hai.
Copy result me snapshot save karta hai.
```
