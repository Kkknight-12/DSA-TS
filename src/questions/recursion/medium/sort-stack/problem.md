# Sort Stack

## Problem Samjho

Hume ek stack diya hai, aur usko recursion ki help se sort karna hai.

Yahan stack ko array form me aise represent karenge:

```txt
[4, 1, 3, 2]
 ^        ^
bottom   top
```

Matlab:

```txt
stack[0] = bottom
stack[stack.length - 1] = top
```

Sorted stack ka meaning:

```txt
smallest bottom par ho
largest top par ho
```

So sorted form:

```txt
[1, 2, 3, 4]
 ^        ^
bottom   top
```

Important restriction:

```txt
1. Core logic me loop use nahi karna
2. Extra stack / extra array use nahi karna
3. Sirf recursion aur stack operations use karni hain
4. Stack ko in-place sort karna hai
```

---

## Examples

### Example 1

```txt
Input:  [4, 1, 3, 2]
Output: [1, 2, 3, 4]
```

### Example 2

```txt
Input:  [41, 3, 32, 2, 11]
Output: [2, 3, 11, 32, 41]
```

### Example 3

```txt
Input:  [5]
Output: [5]
```

### Example 4

```txt
Input:  []
Output: []
```

---

## Key Insight

Stack ka problem yeh hai ki hum bottom ya middle directly access nahi kar sakte.

Hum sirf top se kaam kar sakte hain:

```txt
push
pop
peek
```

So sorting ke liye bhi recursion do parts me kaam karegi:

```txt
1. top element hatao
2. remaining stack ko sort karo
3. removed element ko sorted stack me correct jagah par wapas insert karo
```

Iske liye do recursive functions chahiye:

| function | job |
|---|---|
| `sortStack(stack)` | poore stack ko sort karta hai |
| `insertSorted(stack, value)` | value ko already-sorted stack me correct jagah insert karta hai |

---

## Visual Intuition

Example:

```txt
stack = [4, 1, 3, 2]
```

Expansion phase:

```txt
pop 2
pop 3
pop 1
pop 4
stack empty
```

Ab unwind phase me elements ko sorted order me insert karenge:

```txt
insert 4 -> [4]
insert 1 -> [1, 4]
insert 3 -> [1, 3, 4]
insert 2 -> [1, 2, 3, 4]
```

Yahi final sorted stack hai.

---

## Approach

### `sortStack(stack)`

Ye poore stack ko sort karta hai.

Algorithm:

```txt
1. Agar stack empty ya single element hai, return
2. Top pop karo
3. Remaining stack ko recursively sort karo
4. Removed top ko sorted stack me correct position par insert karo
```

### `insertSorted(stack, value)`

Ye helper function ek value ko already-sorted stack me sahi jagah place karta hai.

Algorithm:

```txt
1. Agar stack empty hai, value push karo
2. Agar current top <= value hai, value ko top par push karo
3. Warna top pop karo
4. value ko remaining stack me recursively insert karo
5. Removed top ko wapas push karo
```

---

## Why This Works

Suppose recursive call hume guarantee deti hai ki:

```txt
remaining smaller stack already sorted hai
```

Then current frame ka kaam simple ho jata hai:

```txt
removed top ko bas sorted order me insert kar do
```

Example:

```txt
remaining sorted stack = [1, 3, 4]
removed value = 2
```

`insertSorted` karega:

```txt
2 < 4 -> 4 hatao
2 < 3 -> 3 hatao
2 >= 1 -> 2 ko 1 ke upar rakho
phir 3 aur 4 wapas rakho
```

Result:

```txt
[1, 2, 3, 4]
```

Isi guarantee ko har frame me apply karne se poora stack sort ho jata hai.

---

## Complexity

### Time Complexity: `O(n^2)`

Reason:

```txt
sortStack har element ke liye ek baar call hota hai
aur insertSorted worst case O(n) le sakta hai
```

Recurrence intuition:

```txt
T(n) = T(n - 1) + O(n)
```

So final:

```txt
O(n^2)
```

### Space Complexity: `O(n)`

Reason:

```txt
recursion depth stack size ke proportional hoti hai
```

Koi extra stack / array use nahi ho raha.
Sirf recursion call stack use ho rahi hai.
