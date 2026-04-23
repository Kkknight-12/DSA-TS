# Combination Sum III

## Problem Samjho

Hume numbers `1` se `9` tak me se kuch numbers choose karne hain.

Conditions:

```txt
1. Exactly k numbers choose karne hain
2. Unka total sum n hona chahiye
3. Har number sirf ek baar use ho sakta hai
```

Example:

```txt
k = 3
n = 7
```

Valid:

```txt
[1,2,4] -> 1 + 2 + 4 = 7
```

Invalid:

```txt
[1,3,3] -> 3 repeat ho gaya
[1,6]   -> sirf 2 numbers hain, need exactly 3
```

---

## Key Rules

| rule | meaning |
|---|---|
| numbers fixed hain | only `1` to `9` |
| each number once | same number repeat nahi kar sakte |
| exact size | combination length exactly `k` honi chahiye |
| exact sum | total exactly `n` hona chahiye |

---

## Examples

### Example 1

```txt
Input: k = 3, n = 7
Output: [[1,2,4]]
```

### Example 2

```txt
Input: k = 3, n = 9
Output: [[1,2,6], [1,3,5], [2,3,4]]
```

### Example 3

```txt
Input: k = 4, n = 1
Output: []
```

Why impossible?

```txt
4 different smallest numbers ka minimum sum = 1 + 2 + 3 + 4 = 10
Target 1 usse bahut chhota hai.
```

---

## Approach 1: Brute Force Subsets Of 1 To 9

### Prerequisites

| concept | why needed |
|---|---|
| Subset generation | `1..9` me se possibilities try karni hain |
| Count and sum check | har subset validate karna hai |

### Intuition

Naive idea:

```txt
1 se 9 tak ka har subset generate karo.
Jis subset ka size k ho aur sum n ho, usko answer me rakho.
```

Since numbers only `1..9` hain, total search space infinite nahi hai.

But:

```txt
Har branch ko end tak explore karna waste ho sakta hai.
```

Example:

```txt
current = [1,2,7]
sum = 10
target = 9
```

Ab aage explore karne ka koi fayda nahi, because sum already exceed kar gaya.

---

## Approach 2: Backtracking With Pruning

### Prerequisites

| concept | why needed |
|---|---|
| Backtracking | current combination build and undo karna hai |
| Increasing start | same number reuse aur duplicate order avoid karna hai |
| Pruning | impossible branches jaldi stop karni hain |

### Intuition

Har recursion level par hum decide karte hain:

```txt
Ab next kaunsa number try karein?
```

If current number `i` pick kiya:

```txt
next recursion i + 1 se start hogi
```

Why `i + 1`?

```txt
Har number sirf ek baar use ho sakta hai.
```

Two things simultaneously track karni hain:

```txt
1. current.length   -> kitne numbers choose ho chuke
2. currentSum       -> ab tak ka total kya hai
```

Valid combination tabhi milega jab:

```txt
current.length === k
AND
currentSum === n
```

---

## Visual Mental Model

For:

```txt
k = 3, n = 9
```

```txt
root  start=1, current=[], sum=0
│
├── choose 1 -> current=[1], sum=1, next start=2
│   ├── choose 2 -> current=[1,2], sum=3, next start=3
│   │   ├── choose 3 -> [1,2,3], sum=6 -> size full but wrong sum
│   │   ├── choose 4 -> [1,2,4], sum=7 -> wrong sum
│   │   ├── choose 5 -> [1,2,5], sum=8 -> wrong sum
│   │   ├── choose 6 -> [1,2,6], sum=9 -> valid
│   │   └── choose 7 -> sum=10 -> prune
│   │
│   ├── choose 3 -> current=[1,3], sum=4
│   │   ├── choose 4 -> [1,3,4], sum=8 -> wrong sum
│   │   ├── choose 5 -> [1,3,5], sum=9 -> valid
│   │   └── choose 6 -> sum=10 -> prune
│   │
│   └── ...
│
├── choose 2 -> current=[2], sum=2
│   ├── choose 3 -> current=[2,3], sum=5
│   │   ├── choose 4 -> [2,3,4], sum=9 -> valid
│   │   └── choose 5 -> sum=10 -> prune
│   └── ...
│
└── choose 3 and above
    no more valid 3-number combinations for sum 9
```

---

## Why This Works

We always move in increasing order:

```txt
1 -> 2 -> 6
```

That means:

```txt
[1,2,6] possible hai
[2,1,6] jaisa reorder generate nahi hota
```

So duplicate order issue naturally avoid ho jata hai.

Pruning helps because:

```txt
if sum > n -> aage numbers positive hi hain, so branch useless
if length > k -> already too many numbers
if length === k but sum !== n -> size full ho gayi, branch useless
```

---

## Approach Comparison

| approach | idea | pruning | time | space | use? |
|---|---|---|---:|---:|---|
| Generate all subsets | all possibilities banao, baad me filter karo | weak | exponential | O(9) | okay for thinking |
| Backtracking with pruning | build only valid-looking paths | strong | about `C(9, k)` style search | O(k) | preferred |

---

## Complexity

Time:

```txt
O(C(9, k))
```

Why:

```txt
Hum 1..9 me se k numbers choose karne jaisa search kar rahe hain.
Pruning actual work ko aur reduce karti hai.
```

Auxiliary space:

```txt
O(k)
```

Why:

```txt
Current path aur recursion depth max k tak jaati hai.
```

Output space:

```txt
O(number of valid combinations * k)
```

---

## Final Recommendation

Use:

```txt
Backtracking with pruning
```

Most important memory line:

```txt
Need exact size AND exact sum.
```
