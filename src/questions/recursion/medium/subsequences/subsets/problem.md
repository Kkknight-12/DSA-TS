# Subsets / Power Set

**Difficulty:** Medium  
**Topic:** Recursion, Backtracking  
**Pattern:** Include / Exclude  
**Primary approach in this folder:** Backtracking with pick / not-pick choices

---

## 1. Problem Samjho

Ek array `nums` diya hai jisme unique elements hain.

Hume saare possible subsets return karne hain.

Power set ka meaning:

```txt
Original set ke saare possible subsets ka collection.
```

Example:

```txt
nums = [1, 2]
```

Subsets:

```txt
[[1, 2], [1], [2], []]
```

Order kisi bhi valid order me ho sakta hai.

Important:

- Empty subset `[]` bhi include hota hai.
- Full subset `[1, 2]` bhi include hota hai.
- Elements unique hain, so duplicate subsets ka issue nahi.

---

## 2. Examples

### Example 1

```txt
nums = [1, 2, 3]
```

Total subsets:

```txt
2^3 = 8
```

One valid output:

```txt
[[1,2,3], [1,2], [1,3], [1], [2,3], [2], [3], []]
```

### Example 2

```txt
nums = [0]
```

Total subsets:

```txt
2^1 = 2
```

Output:

```txt
[[0], []]
```

### Example 3

```txt
nums = []
```

Total subsets:

```txt
2^0 = 1
```

Output:

```txt
[[]]
```

Even empty array ka bhi one subset hota hai:

```txt
empty subset
```

---

## 3. Core Observation

Har element ke paas 2 choices hoti hain:

```txt
1. Include -> current subset me element add karo
2. Exclude -> current subset me element skip karo
```

For `nums = [1, 2]`:

At element `1`:

| choice | current subset |
|---|---|
| include `1` | `[1]` |
| exclude `1` | `[]` |

At element `2`, each current subset again has 2 choices:

| starting subset | include `2` | exclude `2` |
|---|---|---|
| `[1]` | `[1,2]` | `[1]` |
| `[]` | `[2]` | `[]` |

Final:

```txt
[[1,2], [1], [2], []]
```

---

## 4. Why Backtracking Is Needed

We use one `current` array while exploring branches.

When we include an element:

```txt
current.push(nums[index])
```

After that include branch finishes, we must undo:

```txt
current.pop()
```

Why?

Because next branch is the exclude branch.

If we do not pop, exclude branch will still carry the included element.

Example:

```txt
current = []
push 1 -> [1]
push 2 -> [1,2]
save [1,2]
```

Now to explore “skip 2”, current should be:

```txt
[1]
```

So we pop:

```txt
[1,2] -> [1]
```

This is backtracking:

```txt
Undo only the current frame's choice before trying the next choice.
```

---

## 5. Approach 1: Backtracking Recursion

### Idea

Start at index `0` with empty current subset.

At every index:

```txt
include nums[index]
then
exclude nums[index]
```

When index reaches end:

```txt
current subset complete hai
copy karke result me add karo
```

### Algorithm

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

### Why Copy Is Required

At base case:

```txt
result.push([...current])
```

Why not:

```txt
result.push(current)
```

Because `current` same array reference hai.

Backtracking me `current` mutate hota rahega.

If reference store kar diya, result ke andar stored subsets bhi mutate ho jayenge.

So:

```txt
copy store karo, reference nahi
```

### Complexity

| complexity | value | why |
|---|---:|---|
| Time | `O(n * 2^n)` | `2^n` subsets, each copy can cost `O(n)` |
| Space | `O(n)` excluding output | recursion stack + current subset |
| Output Space | `O(n * 2^n)` | all subsets stored |

---

## 6. Approach 2: Bit Manipulation

### Idea

For `n` elements, total masks:

```txt
0 to 2^n - 1
```

Each bit decides whether an element is included.

Example:

```txt
nums = [1, 2]
```

| mask | subset |
|---|---|
| `00` | `[]` |
| `01` | `[1]` |
| `10` | `[2]` |
| `11` | `[1,2]` |

This is iterative and also valid, but recursion explains the include/exclude decision tree more clearly.

---

## 7. Approach Comparison

| approach | time | space excluding output | prerequisite | when useful |
|---|---:|---:|---|---|
| Backtracking recursion | `O(n * 2^n)` | `O(n)` | recursion tree, backtracking | learning include/exclude |
| Bit manipulation | `O(n * 2^n)` | `O(1)` | binary masks | compact iterative solution |

---

## 8. Important Edge Cases

| case | example | answer | why |
|---|---|---|---|
| empty input | `[]` | `[[]]` | empty set has one subset |
| one element | `[0]` | `[[0], []]` | include or exclude |
| two elements | `[1,2]` | 4 subsets | `2^2` |
| negative values | `[-1,0,1]` | 8 subsets | value sign does not matter |
| unique values | `[1,2,3]` | no duplicate subsets | input has no duplicates |

---

## 9. What We Will Implement

We will implement:

```txt
Backtracking recursion with include / exclude.
```

Why this implementation:

- Recursion tree clearly visible hota hai.
- Backtracking ka `push -> recurse -> pop` pattern strongly samajh aata hai.
- Ye subsequence family ke next problems ke liye foundation hai.
