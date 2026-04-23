# Reverse Stack

## Problem Samjho

Hume ek stack diya hai, aur usko recursion se reverse karna hai.

Important:

```txt
Stack ka top last side par hota hai.
Array representation me:

[4, 1, 3, 2]
 ^        ^
bottom   top
```

Reverse karne ke baad:

```txt
[2, 3, 1, 4]
 ^        ^
bottom   top
```

Matlab:

```txt
jo pehle top tha, woh ab bottom banega
jo pehle bottom tha, woh ab top banega
```

Rules:

```txt
1. Core logic me loop use nahi karna
2. Extra array / extra stack use nahi karna
3. Sirf recursion + stack operations use karni hain
4. Stack ko in-place modify karna hai
```

---

## Examples

### Example 1

```txt
Input:  [4, 1, 3, 2]
Output: [2, 3, 1, 4]
```

### Example 2

```txt
Input:  [10, 20, -5, 7, 15]
Output: [15, 7, -5, 20, 10]
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

Normal reverse me hum extra array ya loop use karte.

Yahan wo allowed nahi hai.

So recursion ka use karke stack ke top elements temporarily call stack me rakhte hain.

Phir unwind hote time unko bottom me daalte hain.

Iske liye do recursive functions milkar kaam karte hain:

```txt
1. reverseStack(stack)
   - top nikaalo
   - baaki stack reverse karo
   - nikala hua top bottom me daalo

2. insertAtBottom(stack, value)
   - stack ke saare top elements temporarily hatao
   - empty hote hi value push karo
   - removed elements same order me wapas daalo
```

---

## Visual Intuition

Example:

```txt
stack = [4, 1, 3, 2]
```

Top se elements nikalte jao:

```txt
remove 2
remove 3
remove 1
remove 4
stack empty
```

Ab unwind hoga:

```txt
put 4 at bottom -> [4]
put 1 at bottom -> [1, 4]
put 3 at bottom -> [3, 1, 4]
put 2 at bottom -> [2, 3, 1, 4]
```

Yahi reversed stack hai.

---

## Approach

### `reverseStack(stack)`

Ye poore stack ko reverse karta hai.

Algorithm:

```txt
1. Agar stack empty hai, return
2. Top element pop karo
3. Remaining stack ko recursively reverse karo
4. Popped element ko bottom me insert karo
```

### `insertAtBottom(stack, value)`

Ye helper function ek element ko stack ke bilkul bottom me daalta hai.

Algorithm:

```txt
1. Agar stack empty hai, value push karo
2. Warna top pop karo
3. value ko remaining stack ke bottom me recursively insert karo
4. Popped top ko wapas push karo
```

---

## Why This Works

Sabse important baat:

```txt
reverseStack khud bottom tak direct nahi pahunch sakta
kyunki stack me access sirf top ka hota hai
```

So pehle hum top elements remove karke smaller problem solve karte hain.

Phir unwind phase me helper use karke removed element ko bottom me place karte hain.

Har frame exactly yahi guarantee deta hai:

```txt
remaining smaller stack reverse ho chuki hai
ab current removed top ko us reversed stack ke bottom me rakh do
```

Isi guarantee ko repeatedly apply karne se poora stack reverse ho jata hai.

---

## Complexity

### Time Complexity: `O(n^2)`

Reason:

```txt
reverseStack har element ke liye ek baar call hota hai
aur har unwind step par insertAtBottom worst case O(n) le sakta hai
```

Recurrence intuition:

```txt
T(n) = T(n - 1) + O(n)
```

So total:

```txt
O(n^2)
```

### Space Complexity: `O(n)`

Reason:

```txt
Recursion depth stack size ke proportional hai
```

Extra output structure nahi ban raha.
Sirf call stack use ho raha hai.
