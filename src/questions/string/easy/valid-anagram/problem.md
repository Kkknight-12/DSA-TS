# Valid Anagram

## Problem

Do strings `s` and `t` diye hain.
Return `true` agar `t`, `s` ka anagram hai.
Otherwise return `false`.

Anagram ka matlab:

```txt
same characters
same frequency
order different ho sakta hai
```

Examples:

```txt
s = "anagram", t = "nagaram"
answer = true

s = "rat", t = "car"
answer = false
```

## Repo Assumption

Is folder ki implementations comparison ko case-insensitive rakhti hain.
So:

```txt
s = "CAT", t = "ACT"
answer = true
```

Optimal fixed-array solution English letters `a-z` ke liye written hai after lowercase normalization.

## Constraints

Typical LeetCode version:

```txt
1 <= s.length, t.length <= 5 * 10^4
s and t consist of lowercase English letters
```

Repo tests additionally include:

```txt
empty strings -> true
uppercase English letters -> normalized before compare
```

## What We Need To Check

Length same honi chahiye.

```txt
"a" and "ab" -> false
```

Har character ki frequency same honi chahiye.

```txt
"aabb" and "bbaa" -> true
"aacc" and "ccac" -> false
```

Order matter nahi karta.

```txt
"listen" and "silent" -> true
```

## Approach Comparison

| Approach | Main idea | Time | Space | Best for |
|---|---|---:|---:|---|
| Brute force | Sort both strings and compare | O(n log n) | O(n) | Simple first intuition |
| Better | Frequency map inventory | O(n) | O(k) | General character support |
| Optimal | Fixed 26-slot balance array | O(n) | O(1) | Lowercase English letters |

## Core Insight

Anagram problem order ka problem nahi hai.
Ye frequency matching ka problem hai.

Short memory:

```txt
anagram = same inventory of characters
```
