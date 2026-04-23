# Combination Sum III - Notes

## 1. Problem Samjho

Hume numbers `1` se `9` tak me se kuch numbers choose karne hain.

Conditions:

```txt
Exactly k numbers chahiye
Exact total sum n chahiye
Har number sirf ek baar use ho sakta hai
```

Example:

```txt
k = 3
n = 9
```

Valid:

```txt
[1,2,6]
[1,3,5]
[2,3,4]
```

Invalid:

```txt
[1,8]   -> sum sahi hai but size 2 hai
[1,3,3] -> size sahi hai but 3 repeat ho gaya
```

So problem me do conditions ek saath satisfy honi chahiye:

```txt
size bhi exact
sum bhi exact
```

---

## 2. Brute Force

Brute force idea:

```txt
1 se 9 tak ke saare subsets generate karo.
Fir un subsets ko filter karo:
  size == k
  sum == n
```

This works conceptually because range fixed hai:

```txt
Only 9 numbers
```

But brute force me har branch ko end tak explore karna pad sakta hai, even when branch already impossible ho.

Example:

```txt
current = [1,2,7]
sum = 10
target = 9
```

Ab aage explore karna useless hai.

So pruning ke saath backtracking better hai.

---

## 3. Key Insight

Is problem ko easiest tarike se samajhne ka way:

Track:

```txt
remainingCount = aur kitne numbers chahiye
remainingSum   = aur kitna sum banana baaki hai
```

If current number `i` choose kiya:

| quantity | update |
|---|---|
| `remainingCount` | `remainingCount - 1` |
| `remainingSum` | `remainingSum - i` |

This immediately batata hai:

```txt
branch valid lag rahi hai ya already impossible ho chuki hai
```

---

## 4. Why This Technique Works

Every valid combination is an increasing sequence from `1..9`.

Why increasing?

```txt
Because once we choose i, next recursion starts from i + 1.
```

This gives two benefits:

| benefit | why |
|---|---|
| same number repeat nahi hota | next start always bigger hai |
| duplicate order nahi banta | `[1,2,6]` generate hoga, `[2,1,6]` nahi |

So recursion naturally unique combinations hi banati hai.

---

## 5. Variables

| variable | meaning |
|---|---|
| `k` | final combination me total kitne numbers chahiye |
| `n` | final required sum |
| `start` | next number yahan se try hoga |
| `remainingCount` | aur kitne slots fill karne baaki hain |
| `remainingSum` | aur kitna sum banana baaki hai |
| `current` | current combination |
| `result` | all valid combinations |

State example:

```txt
start = 3
remainingCount = 1
remainingSum = 4
current = [1,2]
```

Meaning:

```txt
Ab hume sirf 1 number aur chahiye
Aur us ek number se 4 ka sum banana hai
So obvious valid next choice 4 hi hai
```

---

## 6. Mental Model

Think like:

```txt
How many slots left?
How much sum left?
```

For `k = 3, n = 7`:

```txt
start=1, remainingCount=3, remainingSum=7
```

If choose `1`:

```txt
current = [1]
remainingCount = 2
remainingSum = 6
```

If then choose `2`:

```txt
current = [1,2]
remainingCount = 1
remainingSum = 4
```

Now last slot me:

```txt
4 hi chahiye
```

Decision tree:

```txt
root  start=1, remainingCount=3, remainingSum=7, current=[]
│
├── choose 1 -> start=2, remainingCount=2, remainingSum=6, current=[1]
│   ├── choose 2 -> start=3, remainingCount=1, remainingSum=4, current=[1,2]
│   │   ├── choose 3 -> remainingCount=0, remainingSum=1 -> invalid
│   │   ├── choose 4 -> remainingCount=0, remainingSum=0 -> valid
│   │   └── choose 5 -> bigger than remainingSum -> stop
│   ├── choose 3 -> remainingCount=1, remainingSum=3
│   └── choose 4 -> remainingCount=1, remainingSum=2
│
├── choose 2 -> start=3, remainingCount=2, remainingSum=5, current=[2]
└── choose 3 and above -> no valid path
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| target too small | `k=4, n=1` | `[]` | minimum 4-number sum is 10 |
| target too large | `k=2, n=100` | `[]` | maximum 2-number sum is 17 |
| single slot | `k=1, n=5` | `[[5]]` | one valid number |
| all numbers needed | `k=9, n=45` | `[[1..9]]` | only one way |
| zero slots zero sum | `k=0, n=0` | `[[]]` | empty combination valid |

---

## 8. Conditions

### `remainingCount === 0 && remainingSum === 0`

Meaning:

```txt
Exact number of elements bhi mil gaye
Exact sum bhi mil gaya
```

Action:

```txt
current is valid
```

### `remainingCount === 0`

Meaning:

```txt
Slots khatam ho gaye
```

If `remainingSum` zero nahi hai:

```txt
sum exact nahi bana
```

### `remainingSum <= 0`

Meaning:

```txt
Either sum exact zero already nahi bana,
ya sum negative ho gaya
```

Because numbers positive hain:

```txt
Branch recover nahi ho sakti
```

### `start > 9`

Meaning:

```txt
1..9 range khatam ho gayi
```

### `number > remainingSum`

Meaning:

```txt
Current number hi remaining sum se bada hai
```

Since numbers increasing order me try hote hain:

```txt
next numbers bhi useless honge
```

So:

```txt
break
```

---

## 9. Adjustment Logic

At each recursion frame:

| step | action | why |
|---:|---|---|
| `1` | success base case check | exact count and exact sum dono mile kya |
| `2` | failure base case check | branch impossible ho gayi kya |
| `3` | loop from `start` to `9` | next possible numbers try karna |
| `4` | break if number > remainingSum | larger numbers aur bhi useless honge |
| `5` | push current number | choice lena |
| `6` | recurse with `start = number + 1` | same number dobara use nahi karna |
| `7` | pop current number | next branch ke liye undo |

Algorithm:

```txt
1. Invalid k or impossible sum range ko early return karo.
2. result and current initialize karo.
3. Start explore(1, k, n).
4. If remainingCount and remainingSum both zero hain, answer mil gaya.
5. If slots khatam ho gaye ya sum impossible ho gaya, return.
6. start se 9 tak loop chalao.
7. Current number choose karo.
8. remainingCount aur remainingSum ko reduce karke recurse karo.
9. Return ke baad pop karke choice undo karo.
10. End me result return karo.
```

---

## 10. Answer Formula

State relation:

```txt
sum(current) + remainingSum = n
```

And:

```txt
current.length + remainingCount = k
```

When both become:

```txt
remainingSum = 0
remainingCount = 0
```

Then:

```txt
current is exactly a valid answer
```

Time:

```txt
O(C(9, k))
```

Why:

```txt
Hum 1..9 me se k numbers choose karne jaisa search kar rahe hain.
Pruning many branches early stop kar deti hai.
```

Space excluding output:

```txt
O(k)
```

Why:

```txt
Current path and recursion depth max k tak hi ja sakte hain.
```

Output space:

```txt
O(number of valid combinations * k)
```

---

## 11. Full Dry Run

Input:

```txt
k = 3
n = 7
```

Initial:

```txt
result = []
current = []
explore(1, 3, 7)
```

Execution table:

| step | call / action | current | remainingCount | remainingSum | result |
|---:|---|---|---:|---:|---|
| `1` | `explore(1,3,7)` starts | `[]` | `3` | `7` | `[]` |
| `2` | choose `1`, call `explore(2,2,6)` | `[1]` | `2` | `6` | `[]` |
| `3` | choose `2`, call `explore(3,1,4)` | `[1,2]` | `1` | `4` | `[]` |
| `4` | choose `3`, call `explore(4,0,1)` | `[1,2,3]` | `0` | `1` | `[]` |
| `5` | slots full but sum not zero, return | `[1,2,3]` | `0` | `1` | `[]` |
| `6` | backtrack pop `3` | `[1,2]` | `1` | `4` | `[]` |
| `7` | choose `4`, call `explore(5,0,0)` | `[1,2,4]` | `0` | `0` | `[]` |
| `8` | exact count and exact sum, push `[1,2,4]` | `[1,2,4]` | `0` | `0` | `[[1,2,4]]` |
| `9` | backtrack pop `4` | `[1,2]` | `1` | `4` | `[[1,2,4]]` |
| `10` | next number `5 > remainingSum 4`, break | `[1,2]` | `1` | `4` | `[[1,2,4]]` |
| `11` | backtrack to `[1]`, choose `3`, call `explore(4,1,3)` | `[1,3]` | `1` | `3` | `[[1,2,4]]` |
| `12` | next number `4 > remainingSum 3`, break | `[1,3]` | `1` | `3` | `[[1,2,4]]` |
| `13` | backtrack to `[1]`, choose `4`, call `explore(5,1,2)` | `[1,4]` | `1` | `2` | `[[1,2,4]]` |
| `14` | next number `5 > remainingSum 2`, break | `[1,4]` | `1` | `2` | `[[1,2,4]]` |
| `15` | backtrack to root, choose `2`, call `explore(3,2,5)` | `[2]` | `2` | `5` | `[[1,2,4]]` |
| `16` | choose `3`, call `explore(4,1,2)` | `[2,3]` | `1` | `2` | `[[1,2,4]]` |
| `17` | next number `4 > remainingSum 2`, break | `[2,3]` | `1` | `2` | `[[1,2,4]]` |
| `18` | choose `4`, call `explore(5,1,1)` | `[2,4]` | `1` | `1` | `[[1,2,4]]` |
| `19` | next number `5 > remainingSum 1`, break | `[2,4]` | `1` | `1` | `[[1,2,4]]` |
| `20` | choose `3` at root, no valid path | `[3]` | `2` | `4` | `[[1,2,4]]` |

Final:

```txt
[[1,2,4]]
```

Why `[1,6]` invalid?

```txt
Sum 7 ban raha hai,
but remainingCount zero nahi hua because only 2 numbers use hue.
```

---

## 12. Quick Reference

Pattern:

```txt
Track remainingCount and remainingSum.
Pick next increasing number.
```

Base:

```txt
if remainingCount === 0 && remainingSum === 0:
  result.push([...current])
```

Invalid:

```txt
if remainingCount === 0:
  return

if remainingSum <= 0:
  return

if start > 9:
  return
```

Recursive move:

```txt
for number = start to 9:
  if number > remainingSum:
    break

  current.push(number)
  explore(number + 1, remainingCount - 1, remainingSum - number)
  current.pop()
```

Memory line:

```txt
Need exact slots left and exact sum left.
```
