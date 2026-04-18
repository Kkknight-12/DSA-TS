# Next Smaller Element

## Problem Samjho

Ek array `arr` diya hai.

Har index ke liye uske right side me pehla strictly smaller element find karna hai.

```txt
arr = [4, 8, 5, 2, 25]

index 0 value 4  -> right side me pehla smaller 2
index 1 value 8  -> right side me pehla smaller 5
index 2 value 5  -> right side me pehla smaller 2
index 3 value 2  -> right side me koi smaller nahi
index 4 value 25 -> right side me koi element nahi

answer = [2, 5, 2, -1, -1]
```

Important:

```txt
Smaller means strictly smaller.
Equal value answer nahi hoti.
```

This is a linear array problem.

```txt
Last index ke baad array wapas start nahi hota.
Circular behavior yahan nahi hai.
```

---

## Examples

### Example 1

```txt
Input:  arr = [4, 8, 5, 2, 25]
Output: [2, 5, 2, -1, -1]
```

Why:

| index | value | right side | next smaller |
|---:|---:|---|---:|
| 0 | 4 | `[8, 5, 2, 25]` | 2 |
| 1 | 8 | `[5, 2, 25]` | 5 |
| 2 | 5 | `[2, 25]` | 2 |
| 3 | 2 | `[25]` | -1 |
| 4 | 25 | `[]` | -1 |

### Example 2

```txt
Input:  arr = [10, 9, 8, 7]
Output: [9, 8, 7, -1]
```

Every next element is smaller.

### Example 3

```txt
Input:  arr = [1, 2, 3, 4]
Output: [-1, -1, -1, -1]
```

Array increasing hai, so right side me smaller value kabhi nahi milti.

---

## Constraints

```txt
1 <= arr.length <= 100000
0 <= arr[i] <= 1000000000
```

---

## Prerequisites

| Approach | Prerequisite |
|---|---|
| Brute force | loops, array indexing |
| Optimal stack | stack, monotonic stack, stack of indices |

Helpful basics notes:

```txt
src/basics/Linear-Data-Structure/stack/notes.md
src/basics/Linear-Data-Structure/stack/stack-in-javascript.md
```

---

## Approach 1: Brute Force

### Intuition

Sabse direct soch:

```txt
Har element ke liye right side scan karo.
Jo pehla smaller mile, wahi answer.
Agar kuch nahi mila, answer -1.
```

Example:

```txt
arr = [4, 8, 5, 2, 25]

i = 0, value = 4
  check 8 -> not smaller
  check 5 -> not smaller
  check 2 -> smaller, answer 2

i = 1, value = 8
  check 5 -> smaller, answer 5

i = 2, value = 5
  check 2 -> smaller, answer 2

i = 3, value = 2
  check 25 -> not smaller, answer -1

i = 4, value = 25
  right side empty, answer -1
```

### Complexity

```txt
Time: O(n^2)
Space: O(1) extra, output array alag hai
```

---

## Approach 2: Optimal Monotonic Stack Of Indices

### Intuition

Left to right traverse karte hue stack ko waiting list samjho.

```txt
Stack me woh indices hote hain jinka next smaller abhi nahi mila.
```

Jab current value aati hai, woh puchti hai:

```txt
Main stack ke top wale pending index ka answer ban sakti hoon kya?
```

Agar current value stack top value se choti hai:

```txt
current value us pending index ka next smaller hai
```

Why?

```txt
Stack top index current ke left side me hai.
Current value uske baad aa rahi hai.
Aur current value strictly smaller hai.
So pending index ka answer mil gaya.
```

Pop karte raho jab tak current value pending bigger values ko resolve kar sakti hai.

Then current index ko push karo because current index ka answer future me milega.

---

## Why This Is Same Pattern As Next Greater

Next Greater Element me condition thi:

```txt
currentValue > arr[stackTop]
```

Next Smaller Element me condition flip ho jaati hai:

```txt
currentValue < arr[stackTop]
```

Mental model same hai:

```txt
Stack = unresolved indices ki waiting list.
Current value checks whether it can resolve stack top.
```

Difference:

```txt
NGE me current value bada answer dhundti hai.
NSE me current value chota answer dhundti hai.
```

---

## Why Store Indices?

Values se comparison ho sakta hai, but answer update karne ke liye exact position chahiye.

```txt
stack top index = j
value = arr[j]
answer[j] = currentValue
```

Duplicates me indices safer hote hain.

```txt
arr = [5, 5, 2]

Value 5 do jagah hai.
Index batata hai exactly kaunsa 5 wait kar raha tha.
```

---

## Complexity

```txt
Time: O(n)
Space: O(n)
```

Why O(n)?

```txt
Har index stack me at most ek baar push hota hai.
Har index stack se at most ek baar pop hota hai.
```

Even though `while` loop `for` ke andar hai, total pops across whole run at most `n` hi hote hain.

---

## Approach Comparison

| Approach | Direction | Stack stores | Time | Space | Notes |
|---|---|---|---|---|---|
| Brute force | left to right scan per index | none | O(n^2) | O(1) extra | easiest to simulate |
| Optimal monotonic stack | left to right | indices | O(n) | O(n) | waiting-list mental model |

---

## Key Difference From Next Greater Element

```txt
Next Greater:
  resolve when currentValue > arr[stackTop]

Next Smaller:
  resolve when currentValue < arr[stackTop]
```

Everything else is almost the same:

```txt
result starts with -1
stack stores unresolved indices
pop means answer found
push means answer may come in future
```
