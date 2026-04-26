# Subsets II

## Problem Samjho

Hume ek array `nums` diya hai.
Array me duplicate values ho sakti hain.

Task:

```txt
saare possible subsets return karo
but output me duplicate subsets nahi aane chahiye
```

Important:

```txt
empty subset bhi include karna hai
har element apne index ke hisaab se at most ek baar use hota hai
same values ki wajah se duplicate subsets ban sakte hain
unhe avoid karna hai
```

Example:

```txt
nums = [1, 2, 2]
answer = [[], [1], [1,2], [1,2,2], [2], [2,2]]
```

Duplicate subsets allowed nahi:

```txt
[1,2] do baar nahi aana chahiye
sirf isliye kyunki second 2 bhi available tha
```

---

## Key Insight

Duplicate handling ka main trick:

```txt
1. Array ko sort karo
2. Same recursion level par duplicate starting choices skip karo
```

Sorting se duplicates adjacent aa jaate hain:

```txt
[2,1,2] -> [1,2,2]
```

Ab same-level duplicate skip condition possible ho jaati hai:

```txt
i > start && nums[i] === nums[i - 1]
```

Meaning:

```txt
current recursion level par previous same value se branch already ban chuki hai
toh is duplicate se same subset dobara banega
```

---

## Approach

Backtracking with loop-based recursion use karte hain.

Important difference from plain `subsets`:

```txt
plain subsets me include/exclude binary choices the
subsets II me duplicate-skip logic loop-based recursion me zyada natural hai
```

Flow:

```txt
1. current subset ko result me add karo
2. loop chalao from start to end
3. same-level duplicate ho toh skip karo
4. current value pick karo
5. next recursion i + 1 se chalao
6. backtrack karke current value hatao
```

Why `i + 1`?

```txt
same index ko dobara use nahi karna
```

Why every call pe add karte hain?

```txt
because current state khud ek valid subset hoti hai
```

---

## Why This Works

Suppose sorted array:

```txt
[1,2,2]
```

Root level par:

```txt
i=1 pe pehla 2 choose karna valid hai
i=2 pe second 2 se same level start karna duplicate banayega
```

So root level par second `2` skip hota hai.

But `[1]` choose karne ke baad next level par:

```txt
first 2 choose karna valid
uske baad next level par second 2 bhi choose karna valid
```

Because:

```txt
wo same level duplicate nahi hai
wo deeper level ka choice hai
```

Isi se `[1,2,2]` jaisa valid subset banta hai,
but duplicate `[1,2]` repeated branch nahi banta.

---

## Complexity

### Time Complexity: `O(n * 2^n)`

Reason:

```txt
worst case me distinct elements ke liye lagbhag 2^n subsets bante hain
har subset ko copy karne me O(n) lag sakta hai
```

### Space Complexity: `O(n)`

Reason:

```txt
recursion stack + current subset depth
```

Output space alag se:

```txt
O(n * 2^n)
```
