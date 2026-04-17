# Next Greater Element II

## Problem

Circular integer array `nums` diya hai.
Har index ke liye uska next greater element return karo.

Next greater element ka matlab:

```txt
current index ke baad clockwise direction me
pehla element jo current value se strictly greater ho
```

Agar aisa element nahi milta, answer `-1`.

Circular array ka matlab:

```txt
last index ke baad search wapas index 0 se continue ho sakti hai
```

Example:

```txt
nums = [1, 2, 1]
answer = [2, -1, 2]
```

Why:

```txt
index 0 value 1 -> next greater 2
index 1 value 2 -> no greater element
index 2 value 1 -> circularly next greater 2 at index 1
```

## Important Details

Greater means strictly greater:

```txt
2 is not greater than 2
```

Circular does not mean infinite loop.
Each element only needs to look at at most `n - 1` next elements.

## Approach 1: Brute Force

For every index `i`, scan next `n - 1` positions using modulo.

```txt
nextIndex = (i + distance) % n
```

If `nums[nextIndex] > nums[i]`, answer found.

Prerequisite:

```txt
modulo for circular indexing
nested loops
```

## Approach 2: Optimal - Monotonic Stack

Use stack as a waiting list.

Stack stores indices whose next greater element is not found yet.

When current value is greater than stack top value:

```txt
current value is the answer for stack top index
```

Then pop and keep resolving while current value is greater.

Circular handling:

```txt
loop from 0 to 2*n - 1
actual index = i % n
```

Push only during first pass:

```txt
if i < n, push index
```

Second pass exists only to give unresolved first-pass elements a circular chance.

Prerequisite:

```txt
monotonic stack
circular indexing with modulo
next greater element pattern
```

## Complexity Comparison

| Approach | Idea | Time | Space | Notes |
|---|---|---:|---:|---|
| Brute Force | For each index scan circularly | O(n^2) | O(1) extra | Simple but slow |
| Optimal | Waiting-list stack + 2 passes | O(n) | O(n) | Each index pushed/popped at most once |

Result array space is required for the answer.

## Core Insight

Stack holds unresolved indices.

Short memory:

```txt
current greater value resolves smaller waiting values
second pass resolves circular leftovers
```
