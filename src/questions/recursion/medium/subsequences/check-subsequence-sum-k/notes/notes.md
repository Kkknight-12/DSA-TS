# Check Subsequence Sum K - Notes

## 1. Problem Samjho

Array `arr` aur target `k` diya hai.

Question:

```txt
Kya koi non-empty subsequence exist karti hai
jiska sum exactly k ho?
```

Example:

```txt
arr = [5, 1, 2]
k = 3
```

Answer:

```txt
true
```

Because:

```txt
[1, 2] ka sum = 3
```

Important point:

```txt
Hume count nahi karna.
Sirf yes/no answer chahiye.
```

---

## 2. Brute Force

Brute force me saari subsequences generate kar sakte hain.

For each element:

```txt
pick
not pick
```

For `arr = [5, 1, 2]`, possible non-empty subsequences:

| subsequence | sum | target `3`? |
|---|---:|---|
| `[5]` | `5` | no |
| `[1]` | `1` | no |
| `[2]` | `2` | no |
| `[5, 1]` | `6` | no |
| `[5, 2]` | `7` | no |
| `[1, 2]` | `3` | yes |
| `[5, 1, 2]` | `8` | no |

Answer:

```txt
true
```

Problem:

```txt
Saari subsequences generate karna expensive hai.
```

Number of subsequences:

```txt
2^n
```

---

## 3. Key Insight

Har index par same decision repeat hota hai:

```txt
Current element ko pick karu?
Ya skip karu?
```

State:

```txt
index
currentSum
```

Meaning:

```txt
index      -> abhi kis element par decision lena hai
currentSum -> abhi tak picked elements ka sum
```

Jab `currentSum === k` ho jaye:

```txt
answer true
```

Kyunki ek valid subsequence mil chuki hai.

---

## 4. Why This Technique Works

Subsequence ka matlab hai:

```txt
Har element ke liye ya toh include karo, ya exclude karo.
```

So every possible subsequence ek pick/not-pick path se represent ho sakti hai.

Example:

```txt
arr = [5, 1, 2]
subsequence [1, 2]
```

Choices:

| index | value | choice | sum after choice |
|---:|---:|---|---:|
| `0` | `5` | not pick | `0` |
| `1` | `1` | pick | `1` |
| `2` | `2` | pick | `3` |

Sum target ban gaya, so answer `true`.

Early return valid hai because problem existence check hai:

```txt
At least one valid subsequence milte hi final answer true.
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `arr` | original array |
| `target` / `k` | required sum |
| `index` | current element ka index |
| `currentSum` | abhi tak picked elements ka sum |
| `pickedCurrent` | pick branch ka boolean result |

State example:

```txt
index = 2
currentSum = 1
arr[index] = 2
target = 3
```

Meaning:

```txt
Ab tak sum 1 bana hai.
Element 2 ko pick karenge toh sum 3 ban jayega.
```

---

## 6. Mental Model

Think of recursion as a decision tree.

```txt
root  (index=0, sum=0, next=5)
│
├── pick 5
│   sum becomes 5
│
└── not pick 5
    sum stays 0
```

Each node asks:

```txt
Abhi wale element ko subsequence me lena hai ya nahi?
```

Each branch means:

| branch | sum change | index change |
|---|---:|---:|
| pick | add `arr[index]` | `index + 1` |
| not pick | no change | `index + 1` |

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| single element equals target | `[5]`, `k=5` | `true` | `[5]` works |
| single element not equal | `[5]`, `k=3` | `false` | no valid non-empty subsequence |
| all elements needed | `[1,2,3]`, `k=6` | `true` | whole array works |
| repeated values | `[1,1,1,1]`, `k=2` | `true` | any two `1`s work |
| target too large | `[1,2,3]`, `k=10` | `false` | total sum is smaller |
| zero target | `[1,2,3]`, `k=0` | `false` | empty subsequence not counted |

---

## 8. Conditions

Success condition:

```txt
currentSum === target
```

Meaning:

```txt
Picked elements ka sum target ban gaya.
```

End condition:

```txt
index === arr.length
```

Meaning:

```txt
Saare elements ke decisions ho gaye.
Ab target nahi bana toh ye branch fail.
```

Pruning condition:

```txt
currentSum > target
```

Meaning:

```txt
Sum target se aage nikal gaya.
```

Why this pruning is valid here:

```txt
Array values positive hain.
Future picks sum ko kam nahi kar sakte.
```

Pick branch:

```txt
currentSum + arr[index]
```

Not-pick branch:

```txt
currentSum
```

---

## 9. Adjustment Logic

At every call:

| step | action | why |
|---:|---|---|
| `1` | check if `currentSum === target` | success milte hi answer true |
| `2` | check if `index === arr.length` | array khatam ho gayi |
| `3` | check if `currentSum > target` | positive values ke saath aage useful nahi |
| `4` | try pick branch | current element include karke dekhna |
| `5` | if pick gives true, return true | existence problem me early return valid |
| `6` | otherwise try not-pick branch | current element skip karke possibility check |

Algorithm:

```txt
1. Start recursion from index 0 and currentSum 0.
2. Har element par pehle pick choice try karo.
3. Pick: currentSum me arr[index] add karo, next index par jao.
4. Agar pick branch true de, turant true return karo.
5. Pick false ho tab not-pick branch try karo.
6. Not-pick: currentSum same rakho, next index par jao.
7. currentSum target ban jaye toh true.
8. array end ho jaye aur target na bane toh false.
```

---

## 10. Answer Formula

Recursive answer:

```txt
exists(index, currentSum)
```

Returns:

```txt
true  -> index se aage koi path target bana sakta hai
false -> index se aage koi path target nahi bana sakta
```

Boolean relation:

```txt
answer = pick branch OR not-pick branch
```

But implementation me:

```txt
pick true mila toh not-pick run karne ki zaroorat nahi.
```

So execution order:

```txt
pick
if pick true -> return true
else -> not pick
```

---

## 11. Full Dry Run

Input:

```txt
arr = [5, 1, 2]
k = 3
```

Goal:

```txt
Find whether any subsequence sum is 3.
```

Decision tree:

```txt
root  (index=0, sum=0, next=5)
│
├── pick 5 -> (index=1, sum=5)
│   └── prune: 5 > 3 -> false
│
└── not pick 5 -> (index=1, sum=0, next=1)
    │
    ├── pick 1 -> (index=2, sum=1, next=2)
    │   │
    │   ├── pick 2 -> (index=3, sum=3)
    │   │   └── success: sum === target -> true
    │   │
    │   └── not pick 2 -> skipped because pick 2 returned true
    │
    └── not pick 1 -> skipped because pick 1 subtree returned true
```

Execution table:

| step | call / action | condition result | returned value | why |
|---:|---|---|---|---|
| `1` | `exists(0, 0)` | sum not target, index valid | pending | decide for `5` |
| `2` | pick `5` -> `exists(1, 5)` | `5 > 3` | `false` | positive values cannot reduce sum |
| `3` | back to `exists(0, 0)` | pick failed | pending | now try not-pick |
| `4` | not pick `5` -> `exists(1, 0)` | sum not target, index valid | pending | decide for `1` |
| `5` | pick `1` -> `exists(2, 1)` | sum not target, index valid | pending | decide for `2` |
| `6` | pick `2` -> `exists(3, 3)` | `3 === 3` | `true` | valid subsequence found |
| `7` | back to `exists(2, 1)` | pick returned true | `true` | skip not-pick `2` |
| `8` | back to `exists(1, 0)` | pick returned true | `true` | skip not-pick `1` |
| `9` | back to `exists(0, 0)` | not-pick returned true | `true` | final answer found |

Result:

```txt
true
```

Valid subsequence:

```txt
[1, 2]
```

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

Success:

```txt
currentSum === target
```

Failure:

```txt
index === arr.length
```

Positive-number pruning:

```txt
currentSum > target
```

Early return:

```txt
if pick branch returns true,
return true immediately.
```

Memory line:

```txt
Count problem me saare paths chahiye.
Check problem me first true enough hai.
```
