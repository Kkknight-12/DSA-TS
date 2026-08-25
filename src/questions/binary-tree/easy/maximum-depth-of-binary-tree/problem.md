# 104. Maximum Depth of Binary Tree

## Problem

Binary tree ka `root` diya gaya hai.
Hume tree ki **maximum depth** return karni hai.

Maximum depth means:

```txt
root se kisi farthest leaf tak longest path me kitne nodes hain
```

Is problem me depth **nodes me count** hoti hai:

```txt
empty tree  -> depth 0
single node -> depth 1
```

## Sabse Pehle: Input Array Aur Actual Tree

LeetCode example:

```txt
root = [3, 9, 20, null, null, 15, 7]
```

Ye array `maxDepth` function ko directly nahi milti.
Ye tree ki **level-order representation** hai.

Test helper is representation ko real linked `TreeNode` objects me convert karta hai:

| Queue se parent | Next left slot | Next right slot | Real children                  |
| --------------- | -------------- | --------------- | ------------------------------ |
| `3`             | `9`            | `20`            | `3.left = 9`, `3.right = 20`   |
| `9`             | `null`         | `null`          | no children                    |
| `20`            | `15`           | `7`             | `20.left = 15`, `20.right = 7` |

Actual tree:

```txt
        3
       / \
      9  20
         / \
        15  7
```

Traversal solution ko array nahi,
is tree ka `TreeNode | null` root milta hai.

## Depth Ko Paths Se Samjho

Example tree ke root-to-leaf paths:

```txt
3 -> 9       = 2 nodes
3 -> 20 -> 15 = 3 nodes
3 -> 20 -> 7  = 3 nodes
```

Longest path me `3` nodes hain,
so maximum depth `3` hai.

Important:

```txt
hum longest path ke nodes count kar rahe hain,
node values ko add nahi kar rahe
```

## Example 1

```txt
Input:  root = [3, 9, 20, null, null, 15, 7]
Output: 3
```

```txt
        3          depth 1
       / \
      9  20        depth 2
         / \
        15  7      depth 3
```

## Example 2

```txt
Input:  root = [1, null, 2]
Output: 2
```

Actual tree:

```txt
1          depth 1
 \
  2        depth 2
```

## Constraints

```txt
0 <= number of nodes <= 10^4
-100 <= Node.val <= 100
```

## Main Challenge

Root par khade hokar hume immediately nahi pata hota ki deepest leaf left side me
hai ya right side me.

Example:

```txt
      root
      /  \
 left    right
 depth?  depth?
```

Current node ki maximum depth decide karne ke liye:

```txt
1. left subtree ki depth pata karo
2. right subtree ki depth pata karo
3. deeper side choose karo
4. current node ke liye 1 add karo
```

Alternative view:

```txt
BFS me ek complete level finish = depth me 1 add
```

## Approaches

Har correct approach ko worst case me saare nodes inspect karne pad sakte hain,
so `O(n)` time optimal hai.

| Approach                | Core idea                                                      | Prerequisite          | Time |                      Auxiliary space |
| ----------------------- | -------------------------------------------------------------- | --------------------- | ---: | -----------------------------------: |
| Store every path length | har root-to-leaf path ki length save karke maximum nikalo      | DFS, arrays           | O(n) | O(h) stack + up to O(leaves) lengths |
| Recursive DFS           | `1 + max(leftDepth, rightDepth)` bottom-up return karo         | Recursion, call stack | O(n) |                      O(h) call stack |
| Iterative BFS           | nodes ko level-size batches me process karke levels count karo | Queue, BFS            | O(n) |    O(n) concrete growing-array queue |

Here:

```txt
n = number of nodes
h = tree height / maximum depth
```

Recursive DFS extra path-length list avoid karti hai,
isliye natural optimal recurrence hai.

## Chosen Learning Path

Hum dono useful implementations banayenge:

```txt
recursive.ts -> bottom-up DFS recurrence
iterative.ts -> level-by-level BFS counting
```

### Recursive DFS kyun pehle?

Problem ki definition directly recurrence ban jaati hai:

```txt
empty subtree depth = 0
real node depth = 1 + deeper child depth
```

### Iterative BFS kyun bhi seekhenge?

Constraint `10^4` nodes tak jaati hai.
Completely skewed tree me recursive call stack bhi `10^4` deep ho sakta hai,
jo JavaScript runtime me stack overflow risk create kar sakta hai.

BFS explicit queue use karti hai,
so call-stack depth par depend nahi karti.

## Complexity Note

### Recursive DFS

```txt
Time:  O(n)
Space: O(h) call stack
```

Balanced tree me `h = O(log n)`.
Skewed tree me `h = O(n)`.

### Iterative BFS

Conceptually live BFS frontier maximum tree width `w` tak hota hai.
Hamari JavaScript implementation repeated `shift()` avoid karne ke liye moving `head`
use karegi. Processed entries same array me retained rahengi,
so concrete queue storage worst case `O(n)` hai.
