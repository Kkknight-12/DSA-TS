# Rotate List

## Problem

Ek singly linked list ka `head` aur integer `k` diya gaya hai.
Hume list ko right side me `k` positions rotate karna hai.

Right rotation ka matlab:

```txt
last ke kuch nodes ko front me le aana
```

Example:

```txt
Input:
1 -> 2 -> 3 -> 4 -> 5
k = 2

Output:
4 -> 5 -> 1 -> 2 -> 3
```

Why:

```txt
right rotation by 2 means
last 2 nodes [4,5] front me aa jayenge
```

## Example 2

```txt
Input:
0 -> 1 -> 2
k = 4

Output:
2 -> 0 -> 1
```

Because:

```txt
length = 3
4 rotations same hain 1 rotation ke
since 4 % 3 = 1
```

## Constraints

```txt
list empty ho sakti hai
k bahut bada ho sakta hai
list structure ko final answer me proper linked list hi rehna chahiye
```

## Main Challenge

Do real challenges hain:

```txt
1. k list length se bahut bada ho sakta hai
2. linked list me random access nahi hota
```

So hume samajhna hota hai:

```txt
actual effective rotations kitni hain
aur kis node ke baad list ko todna hai
```

## Approaches

| Approach | Idea | Time | Space |
|---|---|---:|---:|
| Brute Force | ek-ek karke right rotation repeat karo | O(n * (k % n)) | O(1) |
| Optimal | list ko circular banao, phir sahi break point par tod do | O(n) | O(1) |

## Key Insight

Full length `n` ki list par:

```txt
n right rotations ke baad list wapas same ho jati hai
```

Isliye:

```txt
effective rotations = k % n
```

Aur right rotate by `k` ka break point hota hai:

```txt
new tail after (n - k) nodes
new head = new tail.next
```
