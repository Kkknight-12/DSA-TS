# Check If There Exists A Subsequence With Sum K

**Difficulty:** Medium  
**Topic:** Recursion  
**Pattern:** Pick / Not Pick subsequences  
**Primary approach in this folder:** Pure recursion with early return

---

## 1. Problem Samjho

Ek integer array `arr` aur ek target `k` diya hai.

Hume check karna hai:

```txt
Kya arr ki koi non-empty subsequence exist karti hai
jiska sum exactly k ke equal ho?
```

Return:

| condition | return |
|---|---|
| koi subsequence ka sum `k` ban gaya | `true` |
| koi bhi subsequence `k` nahi bana payi | `false` |

Important:

- Subsequence me order same rehta hai.
- Elements continuous hona zaroori nahi.
- Sirf existence check karna hai.
- Ek valid subsequence milte hi answer `true` hai.

---

## 2. Examples

### Example 1

```txt
arr = [10, 1, 2, 7, 6, 1, 5]
k = 8
```

Valid subsequences:

| subsequence | sum |
|---|---:|
| `[1, 7]` | `8` |
| `[2, 6]` | `8` |
| `[1, 2, 5]` | `8` |

Answer:

```txt
true
```

Kyunki ek bhi valid subsequence milna enough hai.

### Example 2

```txt
arr = [2, 3, 5, 7, 9]
k = 100
```

Total sum:

```txt
2 + 3 + 5 + 7 + 9 = 26
```

`100` banana possible hi nahi.

Answer:

```txt
false
```

### Example 3

```txt
arr = [1, 2, 3]
k = 6
```

Subsequence:

```txt
[1, 2, 3] -> 6
```

Answer:

```txt
true
```

---

## 3. Core Observation

Har element ke paas 2 choices hoti hain:

```txt
1. Pick     -> current element ko subsequence me include karo
2. Not Pick -> current element ko skip karo
```

Example:

```txt
arr = [5, 1, 2]
k = 3
```

At index `0`, element `5`:

| choice | new state |
|---|---|
| pick `5` | sum becomes `5` |
| skip `5` | sum stays `0` |

At index `1`, element `1`:

| choice | new state |
|---|---|
| pick `1` | sum becomes `1` |
| skip `1` | sum stays `0` |

This is why this problem naturally becomes a recursion tree.

---

## 4. Why Early Return Matters

This is not a counting problem.

We are not asking:

```txt
How many subsequences have sum k?
```

We are asking:

```txt
Does at least one subsequence have sum k?
```

So jaise hi one valid path milta hai:

```txt
return true
```

Baaki branches explore karna waste hai.

---

## 5. Approach 1: Pure Recursion

### Idea

Index `0` se start karo and current sum `0` rakho.

Har index par:

```txt
pick current element
or
skip current element
```

If any branch returns `true`, final answer `true`.

### Algorithm

```txt
1. Start from index 0 and currentSum 0.
2. Har element par pehle pick choice try karo.
3. Pick karne par currentSum me arr[index] add hota hai.
4. Agar pick branch true de, turant true return karo.
5. Pick fail ho jaye, tab not-pick branch try karo.
6. Not-pick me index move hota hai but currentSum same rehta hai.
7. Agar currentSum target ke equal ho gaya, true return karo.
8. Agar array end ho gaya aur target nahi bana, false return karo.
```

### Why This Works

Every subsequence can be represented by a sequence of choices:

```txt
pick / not-pick / pick / ...
```

Recursion ye saari choice combinations naturally cover karti hai.

Because answer boolean hai, recursion ko saare paths finish karne ki zaroorat nahi. First successful path enough hai.

### Complexity

| complexity | value | why |
|---|---:|---|
| Time | `O(2^n)` worst case | har element ke 2 choices |
| Space | `O(n)` | recursion stack depth |

---

## 6. Approach 2: Recursion + Memoization

### Idea

Same state baar baar aa sakti hai:

```txt
(index, currentSum)
```

If hum already know kar chuke hain ki kisi state se answer possible hai ya nahi, toh us state ko cache kar sakte hain.

### State

| state part | meaning |
|---|---|
| `index` | abhi kis element par khade hain |
| `currentSum` | abhi tak picked elements ka sum |

### Complexity

| complexity | value | why |
|---|---:|---|
| Time | `O(n * k)` | each `(index, sum)` state once |
| Space | `O(n * k)` | memo table |

This is better for larger constraints, but this folder currently focuses on recursion flow first.

---

## 7. Approach 3: Bottom-Up DP

### Idea

Table banate hain:

```txt
dp[i][sum]
```

Meaning:

```txt
Kya first i elements se sum possible hai?
```

Then pick / not-pick relation se table fill hoti hai.

### Complexity

| complexity | value |
|---|---:|
| Time | `O(n * k)` |
| Space | `O(n * k)` |

DP is efficient, but recursion is the best first explanation for subsequence choice-tree thinking.

---

## 8. Approach Comparison

| approach | time | space | prerequisite | when useful |
|---|---:|---:|---|---|
| Pure recursion | `O(2^n)` | `O(n)` | recursion tree | learning pick/not-pick |
| Memoization | `O(n * k)` | `O(n * k)` | recursion + cache | repeated states |
| Tabulation | `O(n * k)` | `O(n * k)` | DP table | optimized implementation |

---

## 9. Important Edge Cases

| case | example | answer | why |
|---|---|---|---|
| single element equals target | `[5]`, `k=5` | `true` | `[5]` works |
| target too large | `[1,2,3]`, `k=10` | `false` | total sum also smaller |
| repeated values | `[1,1,1,1]`, `k=2` | `true` | any two `1`s work |
| all elements needed | `[1,2,3]`, `k=6` | `true` | whole array works |
| zero target in this setup | `[1,2,3]`, `k=0` | `false` | empty subsequence not counted |

---

## 10. What We Will Implement

We will implement:

```txt
Pure recursion with pick / not-pick and early return.
```

Why this implementation first:

- Recursion tree clearly visible hota hai.
- Existence problem ka early return naturally samajh aata hai.
- Count-subsequence problem ke comparison ke liye strong base banega.
