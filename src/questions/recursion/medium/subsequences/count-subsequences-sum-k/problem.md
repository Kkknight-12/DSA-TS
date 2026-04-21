# Count All Subsequences With Sum K

**Difficulty:** Medium  
**Topic:** Recursion  
**Pattern:** Pick / Not Pick subsequences  
**Primary approach in this folder:** Pure recursion returning count

---

## 1. Problem Samjho

Ek array `nums` aur target `k` diya hai.

Hume count return karna hai:

```txt
Kitni non-empty subsequences ka sum exactly k hai?
```

Return:

| condition | return |
|---|---:|
| valid subsequences exist karti hain | count of all valid subsequences |
| koi valid subsequence nahi hai | `0` |

Important:

- Subsequence me order same rehta hai.
- Elements continuous hona zaroori nahi.
- Different indices different subsequences count hote hain.
- Is problem me sirf `true/false` nahi, total count chahiye.

---

## 2. Examples

### Example 1

```txt
nums = [4, 9, 2, 5, 1]
k = 10
```

Valid subsequences:

| subsequence | sum |
|---|---:|
| `[9, 1]` | `10` |
| `[4, 5, 1]` | `10` |

Answer:

```txt
2
```

### Example 2

```txt
nums = [4, 2, 10, 5, 1, 3]
k = 5
```

Valid subsequences:

| subsequence | sum |
|---|---:|
| `[4, 1]` | `5` |
| `[2, 3]` | `5` |
| `[5]` | `5` |

Answer:

```txt
3
```

### Example 3

```txt
nums = [1, 1, 1]
k = 2
```

Valid subsequences by indices:

| indices | values | sum |
|---|---|---:|
| `(0, 1)` | `[1, 1]` | `2` |
| `(0, 2)` | `[1, 1]` | `2` |
| `(1, 2)` | `[1, 1]` | `2` |

Answer:

```txt
3
```

Even though values same dikh rahi hain, indices different hain, so subsequences different count hoti hain.

---

## 3. Core Observation

Har element ke paas 2 choices hoti hain:

```txt
1. Pick     -> current element ko subsequence me include karo
2. Not Pick -> current element ko skip karo
```

Example:

```txt
nums = [4, 5, 1]
k = 10
```

At index `0`, value `4`:

| choice | new sum |
|---|---:|
| pick `4` | `4` |
| not pick `4` | `0` |

At index `1`, value `5`:

| choice | if previous sum was `4` |
|---|---:|
| pick `5` | `9` |
| not pick `5` | `4` |

This naturally forms a recursion tree.

---

## 4. Why We Cannot Early Return

Previous check problem asked:

```txt
Kya koi ek subsequence target banati hai?
```

There, first `true` enough tha.

This problem asks:

```txt
Kitni subsequences target banati hain?
```

So agar ek valid subsequence mil bhi jaye:

```txt
baaki branches explore karna zaroori hai
```

Because they may contain more valid subsequences.

---

## 5. Approach 1: Pure Recursion

### Idea

Recursion integer count return karegi.

At each node:

```txt
count = pick branch count + not-pick branch count
```

Base case:

```txt
index === nums.length
```

Then:

| condition | return |
|---|---:|
| `currentSum === k` | `1` |
| otherwise | `0` |

### Algorithm

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

### Why This Works

Every possible subsequence ek unique pick/not-pick decision path se banti hai.

When a branch reaches array end:

```txt
that one path represents exactly one subsequence
```

If that path ka sum `k` hai, count `1`.

If not, count `0`.

Parent frame dono child counts add karke total valid subsequences batata hai.

### Complexity

| complexity | value | why |
|---|---:|---|
| Time | `O(2^n)` worst case | har element ke 2 choices |
| Space | `O(n)` | recursion stack depth |

---

## 6. Approach 2: Recursion + Memoization

### Idea

Same state repeat ho sakti hai:

```txt
(index, currentSum)
```

If hum kisi state ka count already calculate kar chuke hain, cache se return kar sakte hain.

### Complexity

| complexity | value | why |
|---|---:|---|
| Time | `O(n * k)` | each state once |
| Space | `O(n * k)` | memo table |

This is useful when constraints larger ho.

---

## 7. Approach 3: Bottom-Up DP

### Idea

DP table:

```txt
dp[i][sum]
```

Meaning:

```txt
First i elements se sum banane ke kitne ways hain?
```

Then pick / not-pick relation:

```txt
dp[i][sum] = not-pick ways + pick ways
```

### Complexity

| complexity | value |
|---|---:|
| Time | `O(n * k)` |
| Space | `O(n * k)` |

---

## 8. Approach Comparison

| approach | time | space | prerequisite | when useful |
|---|---:|---:|---|---|
| Pure recursion | `O(2^n)` | `O(n)` | recursion tree | learning count merge |
| Memoization | `O(n * k)` | `O(n * k)` | recursion + cache | repeated states |
| Tabulation | `O(n * k)` | `O(n * k)` | DP table | optimized count |

---

## 9. Important Edge Cases

| case | example | answer | why |
|---|---|---:|---|
| one valid subsequence | `[4,5,1]`, `k=10` | `1` | `[4,5,1]` |
| multiple valid subsequences | `[4,9,2,5,1]`, `k=10` | `2` | `[9,1]`, `[4,5,1]` |
| repeated values | `[1,1,1]`, `k=2` | `3` | index pairs differ |
| no valid subsequence | `[1,2,3]`, `k=10` | `0` | target not possible |
| single element equals target | `[5]`, `k=5` | `1` | `[5]` |
| zero target in this setup | `[1,2,3]`, `k=0` | `0` | empty subsequence not counted |

---

## 10. What We Will Implement

We will implement:

```txt
Pure recursion returning count.
```

Why this implementation first:

- Pick/not-pick count merge clearly visible hota hai.
- It directly contrasts with `check-subsequence-sum-k`.
- It builds the base for memoization and DP later.
