# Middle of the Linked List

## Problem

Singly linked list ka `head` diya hai.
Hume linked list ka middle node return karna hai.

Agar list me 2 middle nodes hain, toh second middle node return karna hai.

## Example 1

```txt
Input:
head = [1, 2, 3, 4, 5]

Output:
[3, 4, 5]
```

Explanation:

```txt
Middle node value = 3
Return node(3), so returned linked list suffix is [3, 4, 5]
```

## Example 2

```txt
Input:
head = [1, 2, 3, 4, 5, 6]

Output:
[4, 5, 6]
```

Explanation:

```txt
Middle nodes are 3 and 4.
Question asks for second middle.
So return node(4).
```

## Constraints

```txt
Number of nodes: 0 to n
Node values: any number
```

LeetCode version usually gives non-empty list, but our implementation also handles empty list safely.

## Important Point

Linked list me array jaisa direct index access nahi hota.

```txt
arr[3] possible hai
linkedList[3] direct possible nahi hai
```

Isliye middle tak pahunchne ke liye traversal chahiye.

## Approaches

| Approach | Idea | Time | Space |
|---|---|---:|---:|
| Brute force | Count nodes, then move to middle index | O(n) | O(1) |
| Optimal | Slow-fast pointer in one pass | O(n) | O(1) |

