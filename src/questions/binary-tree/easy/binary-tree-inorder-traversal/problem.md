# 94. Binary Tree Inorder Traversal

## Problem

Binary tree ka `root` diya gaya hai.
Hume uske nodes ki values **inorder traversal** order me return karni hain.

Inorder ka fixed order hai:

```txt
LEFT -> ROOT -> RIGHT
```

Meaning, har node par:

```txt
1. poori left subtree traverse karo
2. current node ko visit karo
3. poori right subtree traverse karo
```

## Sabse Pehle: Array Tree Nahi Hai

LeetCode example me:

```txt
root = [1, null, 2, 3]
```

ye array traversal function ko directly nahi milta.
Ye tree ka **level-order representation** hai.
Test helper pehle is representation se linked `TreeNode` objects banata hai,
aur traversal function ko actual root node milta hai.

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

`null` placeholder important hai: uske bina node positions change ho jayengi.

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
Output: [1, 3, 2]
```

Tree:

```txt
    1
     \
      2
     /
    3
```

Inorder walk:

```txt
1 ki left empty
visit 1
2 ki left me 3 -> visit 3
visit 2

answer = [1, 3, 2]
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
Output: [4, 2, 6, 5, 7, 1, 3, 9, 8]
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

Preorder me node ko dekhte hi visit kar sakte the.
Inorder me current node ko immediately answer me add nahi kar sakte.

Pehle uski complete left subtree finish honi chahiye:

```txt
left pending?  -> aur left jao
left complete? -> current node visit karo
then           -> right subtree start karo
```

Isliye iterative solution ko paused ancestors remember karne ke liye stack chahiye.

## Approaches

Traversal me har node ki value answer me chahiye,
so koi valid approach `O(n)` time se better nahi ho sakti.
Difference mainly recursion ko represent karne ke tareeke me hai.

| Approach      | Core idea                                                  | Prerequisite          | Time | Auxiliary space |
| ------------- | ---------------------------------------------------------- | --------------------- | ---: | --------------: |
| Recursive DFS | call stack se `left -> visit -> right` order preserve karo | Recursion, call stack | O(n) |            O(h) |
| Iterative DFS | explicit stack me paused ancestors rakho                   | Stack, LIFO           | O(n) |            O(h) |

Here `n` nodes ki count aur `h` tree ki height hai.
Balanced tree me `h = O(log n)` aur completely skewed tree me `h = O(n)`.

## Follow-up

Recursive order direct hai:

```txt
traverse left
visit current
traverse right
```

Iterative challenge ye discover karna hai ki stack me node kab push hoga,
kab pop hoga, aur value exactly kab answer me add hogi.
