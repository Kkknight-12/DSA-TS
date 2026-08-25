# Reverse Linked List

## Problem

Singly linked list ka `head` diya hai.
Hume linked list ko reverse karke naya head return karna hai.

Reverse ka matlab:

```txt
1 -> 2 -> 3 -> null
```

ban jayega:

```txt
3 -> 2 -> 1 -> null
```

## Example 1

```txt
Input:
head = [1, 2, 3, 4, 5]

Output:
[5, 4, 3, 2, 1]
```

## Example 2

```txt
Input:
head = [1, 2]

Output:
[2, 1]
```

## Example 3

```txt
Input:
head = []

Output:
[]
```

## Constraints

```txt
Number of nodes: 0 to n
Node values: any integer
```

## Important Point

Linked list reverse karte waqt asli challenge value order nahi hai.
Asli challenge `next` pointers ki direction badalna hai.

```txt
current.next ko aage ki jagah peeche point karna hota hai
```

## Approaches

| Approach | Idea | Time | Space |
|---|---|---:|---:|
| Brute force | Nodes ko array me store karke backward relink karo | O(n) | O(n) |
| Optimal iterative | `prev`, `current`, `nextNode` se in-place reverse | O(n) | O(1) |
| Recursion | Chhoti sublist reverse karo, phir current ko end me attach karo | O(n) | O(n) |

## Interview Angle

Most preferred solution:

```txt
iterative 3-pointer solution
```

Kyunki:

```txt
same nodes reuse karta hai
in-place reverse karta hai
extra space constant hoti hai
```

