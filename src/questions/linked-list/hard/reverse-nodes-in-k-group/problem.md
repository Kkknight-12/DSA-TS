# Reverse Nodes in k-Group

## Problem

Singly linked list ka `head` aur integer `k` diya hai.
Hume linked list ko `k` size ke groups me reverse karna hai.

Rules:

```txt
sirf complete groups reverse honge
last incomplete group as-is rahega
node values change nahi kar sakte
sirf nodes ke links change karne hain
```

## Example 1

```txt
Input:
head = [1, 2, 3, 4, 5]
k = 2

Output:
[2, 1, 4, 3, 5]
```

Explanation:

```txt
[1, 2] reverse -> [2, 1]
[3, 4] reverse -> [4, 3]
[5] incomplete group hai, so same rahega
```

## Example 2

```txt
Input:
head = [1, 2, 3, 4, 5]
k = 3

Output:
[3, 2, 1, 4, 5]
```

Explanation:

```txt
[1, 2, 3] reverse -> [3, 2, 1]
[4, 5] complete group nahi hai, so same rahega
```

## Constraints

```txt
1 <= k <= number of nodes
node values can be any integer
```

## Important Point

Ye normal reverse linked list se thoda harder hai because:

```txt
poori list reverse nahi karni
sirf fixed-size blocks reverse karne hain
aur har reversed block ko baaki list se correctly reconnect bhi karna hai
```

## Approaches

| Approach | Idea | Time | Space |
|---|---|---:|---:|
| Brute force | Nodes ko array me store karke k-sized blocks reverse karo | O(n) | O(n) |
| Optimal | Dummy node + block boundary detection + in-place reversal | O(n) | O(1) |

## Follow-up

Most important interview expectation:

```txt
solve it in O(1) extra space
```

Isliye brute force samajhne ke liye useful hai,
but final interview-ready solution optimal pointer-based approach hota hai.

