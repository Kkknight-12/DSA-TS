# Palindrome Partitioning

**Difficulty:** Medium  
**Topic:** Recursion, Backtracking  
**Pattern:** Try every cut + validate choice  
**Primary approach in this folder:** Backtracking with palindrome check

---

## 1. Problem Samjho

Ek string `s` diya hai.

Hume `s` ko aise parts me split karna hai ki:

```txt
Har part palindrome ho.
```

Return:

```txt
All possible palindrome partitions.
```

Example:

```txt
s = "aab"
```

Valid partitions:

```txt
["a", "a", "b"]
["aa", "b"]
```

Why?

```txt
"a", "a", "b" -> all single characters, so palindromes
"aa", "b"    -> "aa" palindrome, "b" palindrome
```

Invalid:

```txt
["a", "ab"]
```

Because:

```txt
"ab" is not palindrome
```

---

## 2. Examples

### Example 1

```txt
s = "aab"
```

All cut possibilities:

| partition | valid? | why |
|---|---|---|
| `["a","a","b"]` | yes | every part palindrome |
| `["a","ab"]` | no | `"ab"` not palindrome |
| `["aa","b"]` | yes | `"aa"` and `"b"` palindromes |
| `["aab"]` | no | `"aab"` not palindrome |

Output:

```txt
[["a","a","b"], ["aa","b"]]
```

### Example 2

```txt
s = "a"
```

Output:

```txt
[["a"]]
```

### Example 3

```txt
s = "aaa"
```

Output:

```txt
[["a","a","a"], ["a","aa"], ["aa","a"], ["aaa"]]
```

---

## 3. Core Observation

At any `start` index, we can choose substring endings:

```txt
end = start
end = start + 1
end = start + 2
...
```

For `s = "aab"` and `start = 0`:

| end | substring `s[start..end]` | palindrome? |
|---:|---|---|
| `0` | `"a"` | yes |
| `1` | `"aa"` | yes |
| `2` | `"aab"` | no |

Only palindrome choices are allowed to recurse.

If we choose:

```txt
s[start..end]
```

then next recursion starts at:

```txt
end + 1
```

This is the most important pointer movement.

---

## 4. Why Backtracking Fits

We build one partition step by step.

At every frame:

```txt
1. Fix start.
2. Move end from start to last index.
3. Try substring s[start..end].
4. If palindrome, pick it and recurse from end + 1.
5. After recursion returns, pop it and try next end.
```

Backtracking is needed because:

```txt
Same current partition array is reused for many branches.
```

So after one choice finishes:

```txt
current.pop()
```

undoes only that frame's chosen substring.

---

## 5. Approach 1: Backtracking

### Idea

Use:

```txt
start
current partition
result
```

At each `start`, try every possible `end`.

If substring is palindrome:

```txt
push substring
backtrack(end + 1)
pop substring
```

Base case:

```txt
start === s.length
```

Meaning:

```txt
Whole string partition ho chuki hai.
Current partition valid hai.
```

### Algorithm

```txt
1. Empty result and empty current partition initialize karo.
2. Start recursion from start index 0.
3. Har frame me end ko start se s.length - 1 tak move karo.
4. substring = s[start..end] banao.
5. Agar substring palindrome nahi hai, us branch ko skip karo.
6. Agar substring palindrome hai, current partition me push karo.
7. Remaining string ke liye backtrack(end + 1) call karo.
8. Recursive call return kare toh current.pop() karke choice undo karo.
9. Base case: start === s.length ho jaye toh current ka copy result me add karo.
10. Final result me saare valid palindrome partitions mil jayenge.
```

### Complexity

| complexity | value | why |
|---|---:|---|
| Time | `O(n * 2^n)` | many cut patterns, palindrome checks/copies cost up to `n` |
| Space | `O(n)` excluding output | recursion depth + current partition |
| Output Space | `O(n * 2^n)` | all partitions can be large |

---

## 6. Approach 2: Backtracking + Palindrome DP

### Idea

Palindrome checks repeat ho sakte hain.

We can precompute:

```txt
isPal[start][end]
```

Meaning:

```txt
s[start..end] palindrome hai ya nahi
```

Then recursion me palindrome check `O(1)` ho jata hai.

### Tradeoff

| part | cost |
|---|---:|
| DP preprocessing | `O(n^2)` |
| DP space | `O(n^2)` |
| recursion output generation | still exponential |

This is useful for optimized versions, but the current folder focuses on recursion/backtracking clarity first.

---

## 7. Approach Comparison

| approach | palindrome check | time | space excluding output | when useful |
|---|---:|---:|---:|---|
| Backtracking + two pointers | `O(length)` | `O(n * 2^n)` | `O(n)` | best first explanation |
| Backtracking + DP table | `O(1)` | `O(n^2 + output)` | `O(n^2)` | optimized repeated checks |

---

## 8. Important Edge Cases

| case | example | answer | why |
|---|---|---|---|
| single char | `"a"` | `[["a"]]` | one char palindrome |
| all same chars | `"aaa"` | 4 partitions | every substring palindrome |
| no multi-char palindrome | `"abc"` | `[["a","b","c"]]` | only single chars work |
| full string palindrome | `"aba"` | includes `["aba"]` | whole string valid |
| repeated pairs | `"aabb"` | includes `["aa","bb"]` | both groups palindrome |

---

## 9. What We Will Implement

We will implement:

```txt
Backtracking with two-pointer palindrome check.
```

Why this implementation:

- `start` and `end` movement becomes clear.
- It matches the handwritten mental model: fixed `start`, moving `end`.
- Backtracking `push -> recurse -> pop` is visible.
- DP optimization can be learned later after the recursion tree is solid.
