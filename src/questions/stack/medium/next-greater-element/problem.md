# Next Greater Element

## Problem Samjho

Ek array `arr` diya hai.

Har index ke liye uske right side me pehla strictly greater element find karna hai.

```txt
arr = [1, 3, 2, 4]

index 0 value 1 -> right side me pehla greater 3
index 1 value 3 -> right side me pehla greater 4
index 2 value 2 -> right side me pehla greater 4
index 3 value 4 -> right side me koi greater nahi

answer = [3, 4, 4, -1]
```

Important:

```txt
Greater means strictly greater.
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
Input:  arr = [1, 3, 2, 4]
Output: [3, 4, 4, -1]
```

Why:

| index | value | right side | next greater |
|---:|---:|---|---:|
| 0 | 1 | `[3, 2, 4]` | 3 |
| 1 | 3 | `[2, 4]` | 4 |
| 2 | 2 | `[4]` | 4 |
| 3 | 4 | `[]` | -1 |

### Example 2

```txt
Input:  arr = [6, 8, 0, 1, 3]
Output: [8, -1, 1, 3, -1]
```

Why:

| index | value | first greater on right |
|---:|---:|---:|
| 0 | 6 | 8 |
| 1 | 8 | -1 |
| 2 | 0 | 1 |
| 3 | 1 | 3 |
| 4 | 3 | -1 |

### Example 3

```txt
Input:  arr = [4, 3, 2, 1]
Output: [-1, -1, -1, -1]
```

Array decreasing hai, so kisi bhi element ke right side me greater value nahi milti.

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
| Better / optimal stack | stack, monotonic stack, stack of indices |

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
Jo pehla greater mile, wahi answer.
Agar kuch nahi mila, answer -1.
```

Example:

```txt
arr = [1, 3, 2, 4]

i = 0, value = 1
  check 3 -> greater, answer 3

i = 1, value = 3
  check 2 -> not greater
  check 4 -> greater, answer 4

i = 2, value = 2
  check 4 -> greater, answer 4

i = 3, value = 4
  right side empty, answer -1
```

### Complexity

```txt
Time: O(n^2)
Space: O(1) extra, output array alag hai
```

Worst case me har element ke liye almost pura right side scan karna pad sakta hai.

---

## Approach 2: Right-To-Left Monotonic Stack

### Intuition

Right se left jaate hue current element ke right side wale elements already process ho chuke hote hain.

Stack me possible next greater candidates rakh sakte hain.

```txt
Current element se chote ya equal stack values useless ho jaate hain,
kyunki current value unhe hide kar deti hai.
```

This approach can store values directly.

### Complexity

```txt
Time: O(n)
Space: O(n)
```

Implementation already exists as:

```txt
solution-right-to-left.ts
```

---

## Approach 3: Left-To-Right Monotonic Stack Of Indices

### Intuition

Left to right approach me stack ko waiting list samjho.

```txt
Stack me woh indices hote hain jinka next greater abhi nahi mila.
```

Jab current value aati hai, woh puchti hai:

```txt
Main stack ke top wale pending index ka answer ban sakti hoon kya?
```

Agar current value stack top value se badi hai:

```txt
current value us pending index ka next greater hai
```

Why?

```txt
Stack top index current ke left side me hai.
Current value uske baad aa rahi hai.
Aur current value strictly greater hai.
So pending index ka answer mil gaya.
```

Pop karte raho jab tak current value pending smaller values ko resolve kar sakti hai.

Then current index ko push karo because current index ka answer future me milega.

### Why store indices?

Values se comparison ho sakta hai, but answer update karne ke liye exact position chahiye.

```txt
stack top index = j
value = arr[j]
answer[j] = currentValue
```

Duplicates me indices aur bhi important ho jaate hain.

```txt
arr = [2, 2, 3]

Do value 2 hain.
Index batata hai exactly kaunsa 2 wait kar raha tha.
```

### Complexity

```txt
Time: O(n)
Space: O(n)
```

Why O(n)?

```txt
Har index stack me at most ek baar push hota hai.
Har index stack se at most ek baar pop hota hai.
```

This is the tracked solution for the current update:

```txt
solution-left-to-right.ts
```

---

## Approach Comparison

| Approach | Direction | Stack stores | Time | Space | Notes |
|---|---|---|---|---|---|
| Brute force | left to right scan per index | none | O(n^2) | O(1) extra | easiest to understand |
| Right-to-left stack | right to left | usually values | O(n) | O(n) | answers current index immediately |
| Left-to-right stack | left to right | indices | O(n) | O(n) | waiting-list mental model, tracked solution |

---

## Key Difference From Next Greater Element II

This problem is not circular.

```txt
Next Greater Element:
  traverse once
  no modulo
  right side ends at n - 1

Next Greater Element II:
  circular array
  traverse 2n times
  use index = step % n
```

For this problem:

```txt
for i from 0 to n - 1
```

No second pass is needed.
