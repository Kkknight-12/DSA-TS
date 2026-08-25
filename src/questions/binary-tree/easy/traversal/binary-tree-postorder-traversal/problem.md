# 145. Binary Tree Postorder Traversal

## Problem

Binary tree ka `root` diya gaya hai.
Hume uske nodes ki values **postorder traversal** order me return karni hain.

Postorder ka fixed order hai:

```txt
LEFT -> RIGHT -> ROOT
```

Meaning, har node par:

```txt
1. poori left subtree traverse karo
2. poori right subtree traverse karo
3. current node ko visit karo
```

## Sabse Pehle: Array Tree Nahi Hai

LeetCode example:

```txt
root = [1, null, 2, 3]
```

Ye array traversal function ko directly nahi milta.
Ye tree ka **level-order representation** hai.
Test helper pehle is representation se linked `TreeNode` objects banata hai,
phir traversal function ko actual root node deta hai.

Construction:

| Parent | Next left slot          | Next right slot                 |
| ------ | ----------------------- | ------------------------------- |
| `1`    | `null` -> no left child | `2` -> right child              |
| `2`    | `3` -> left child       | value missing -> no right child |

Actual tree:

```txt
    1
     \
      2
     /
    3
```

`null` placeholder position preserve karta hai.
Uske bina `2` ko galti se `1` ka left child samjha ja sakta tha.

## Binary Tree Node

Har real node ke paas three fields hote hain:

```txt
value
left child reference
right child reference
```

Agar child exist nahi karta,
uska reference `null` hota hai.

## Example 1

```txt
Input:  root = [1, null, 2, 3]
Output: [3, 2, 1]
```

Tree:

```txt
    1
     \
      2
     /
    3
```

Postorder walk:

```txt
3 ke children empty -> visit 3
2 ki left complete, right empty -> visit 2
1 ki left empty, right complete -> visit 1

answer = [3, 2, 1]
```

## Example 2

```txt
Input:
root = [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]
```

Tree:

```txt
        1
      /   \
     2     3
    / \     \
   4   5     8
      / \   /
     6   7 9
```

```txt
Output: [4, 6, 7, 5, 2, 9, 8, 3, 1]
```

## Example 3

```txt
Input:  root = []
Output: []
```

## Example 4

```txt
Input:  root = [1]
Output: [1]
```

## Constraints

```txt
0 <= number of nodes <= 100
-100 <= Node.val <= 100
```

## Main Challenge

Postorder me current node sabse last visit hota hai.

```txt
left complete?
right complete?
dono complete? -> ab current node visit karo
```

Recursive call stack automatically yaad rakhta hai ki parent ko dono child calls ke
baad resume karna hai.

Iterative solution me sirf node store karna enough nahi lagta,
kyunki pop karte waqt hume ye bhi pata hona chahiye:

```txt
is node ke children abhi schedule karne hain?
ya children complete ho chuke hain aur ab node visit karna hai?
```

## Approaches

Har node output me exactly once aata hai,
so sab correct approaches ko at least `O(n)` time chahiye.

| Approach                       | Core idea                                                             | Prerequisite          | Time | Auxiliary space |
| ------------------------------ | --------------------------------------------------------------------- | --------------------- | ---: | --------------: |
| Recursive DFS                  | call stack se `left -> right -> visit` preserve karo                  | Recursion, call stack | O(n) |            O(h) |
| Iterative with two stacks      | `root -> right -> left` banao, phir order reverse karo                | Stack, reversal       | O(n) |            O(n) |
| Iterative with one frame stack | har node ke liye `expand` aur `visit` phases explicitly schedule karo | Stack, LIFO           | O(n) |            O(h) |

Here `n` nodes ki count aur `h` tree ki height hai.
Balanced tree me `h = O(log n)` aur completely skewed tree me `h = O(n)`.

## Chosen Learning Path

Hum do files banayenge:

```txt
recursive.ts -> natural LEFT, RIGHT, ROOT call order
iterative.ts -> one stack + explicit expand/visit phase
```

One-stack frame approach recursion ko closely simulate karti hai:

```txt
EXPAND frame -> children ka work schedule karo
VISIT frame  -> pop hone tak children complete; then value add karo
```

## Follow-up

Recursive solution direct hai:

```txt
traverse left
traverse right
visit current
```

Iterative challenge ye ensure karna hai ki current node ka `VISIT` event
uski left aur right subtrees ke baad hi stack top par aaye.
