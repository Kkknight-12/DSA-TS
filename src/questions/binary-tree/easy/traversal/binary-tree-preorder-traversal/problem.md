# Binary Tree Preorder Traversal

## Problem

Binary tree ka `root` diya gaya hai.
Hume nodes ki values preorder traversal order me return karni hain.

Preorder ka fixed order hai:

```txt
ROOT -> LEFT -> RIGHT
```

Meaning:

```txt
1. current node ko visit karo
2. poori left subtree traverse karo
3. poori right subtree traverse karo
```

## Binary Tree Node

Har node ke paas three fields hote hain:

```txt
value
left child reference
right child reference
```

Agar child exist nahi karta,
uska reference `null` hota hai.

## Example 1

```txt
Input:
root = [1, null, 2, 3]
```

Tree:

```txt
    1
     \
      2
     /
    3
```

Preorder:

```txt
visit 1
left of 1 is empty
visit right subtree: 2, then 3
```

```txt
Output: [1, 2, 3]
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
Output: [1, 2, 4, 5, 6, 7, 3, 8, 9]
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

Tree linear structure nahi hai.
Har node se do possible directions nikalti hain:

```txt
left
right
```

Hume ensure karna hai ki:

```txt
current node left subtree se pehle aaye
left subtree right subtree se pehle aaye
```

## Approaches

| Approach      | Core idea                                                      | Prerequisite          | Time |  Auxiliary space |
| ------------- | -------------------------------------------------------------- | --------------------- | ---: | ---------------: |
| Recursive DFS | function call stack left aur right subtrees remember karta hai | Recursion, call stack | O(n) |             O(h) |
| Iterative DFS | explicit stack se future nodes remember karo                   | Stack, LIFO           | O(n) | O(h), worst O(n) |

Here `h` tree ki height hai.

## Follow-up

Recursive traversal direct hai.
Iterative solution me recursion ke hidden call stack ko explicit array-based stack se replace karna hai.
