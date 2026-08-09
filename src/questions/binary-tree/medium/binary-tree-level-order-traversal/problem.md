# 102. Binary Tree Level Order Traversal

## Problem

Binary tree ka `root` diya gaya hai.
Hume node values ko **level by level**, aur har level ke andar **left to right**
return karna hai.

Output flat array nahi hai.
Har tree level ka apna inner array hoga:

```txt
[
  [level 0 values],
  [level 1 values],
  [level 2 values]
]
```

## Sabse Pehle: Input Array Aur Output Levels Alag Cheezein Hain

Example input:

```txt
root = [3, 9, 20, null, null, 15, 7]
```

Ye traversal function ko directly milne wali array nahi hai.
Ye tree ki **level-order serialization** hai.
Test helper is representation se pehle linked `TreeNode` objects banata hai.

Construction queue trace:

| Parent | Next left slot | Next right slot | Real children added        |
| ------ | -------------- | --------------- | -------------------------- |
| `3`    | `9`            | `20`            | `3.left=9`, `3.right=20`   |
| `9`    | `null`         | `null`          | no children                |
| `20`   | `15`           | `7`             | `20.left=15`, `20.right=7` |

Actual tree:

```txt
        3
       / \
      9  20
         / \
        15  7
```

Traversal algorithm ko is tree ka `TreeNode | null` root milta hai.
Uske baad solution ek separate BFS queue use karke output levels banati hai.

```txt
buildTree queue -> serialization ko real tree me convert karti hai
levelOrder queue -> ready tree ko level by level visit karti hai
```

Same data structure hai, but dono queues ka job different hai.

## Example 1

```txt
Input:  root = [3, 9, 20, null, null, 15, 7]
Output: [[3], [9, 20], [15, 7]]
```

Level view:

```txt
Level 0:        3          -> [3]

Level 1:      9   20       -> [9,20]

Level 2:         15  7     -> [15,7]
```

## Example 2

```txt
Input:  root = [1]
Output: [[1]]
```

## Example 3

```txt
Input:  root = []
Output: []
```

## Constraints

```txt
0 <= number of nodes <= 2000
-1000 <= Node.val <= 1000
```

## Main Challenge

Sirf BFS order me values collect karna enough nahi hai.

Normal BFS flat output de sakta hai:

```txt
[3, 9, 20, 15, 7]
```

Problem ko grouped output chahiye:

```txt
[[3], [9, 20], [15, 7]]
```

Isliye har outer iteration ke start par hume current level ki boundary freeze karni
hogi.

```txt
levelSize = queue me abhi pending nodes ki count
```

Then exactly `levelSize` nodes process karte hain.
Unke children queue ke end me add hote hain,
but woh current level me nahi—next level me belong karte hain.

## Approaches

Level-order ka natural technique BFS hai,
but ek recursive depth-grouping alternative bhi valid hai.

`BFS` means **Breadth-First Search**:

```txt
pehle current depth/level ke saare nodes
phir next deeper level ke nodes
```

| Approach              | Core idea                                                      | Prerequisite              |              Time |                   Auxiliary space |
| --------------------- | -------------------------------------------------------------- | ------------------------- | ----------------: | --------------------------------: |
| Recursive DFS + depth | `result[depth]` me value add karke left/right recurse karo     | Recursion, depth indexing |              O(n) |                   O(h) call stack |
| BFS with `shift()`    | queue front remove karke level-size batches process karo       | Queue, BFS                | worst O(n²) in JS |                              O(n) |
| BFS with head index   | front removal ki jagah index move karo; level size snapshot lo | Queue, BFS, indices       |              O(n) | O(n) in this array implementation |

Why `shift()` warning?

JavaScript array se first item remove karne par remaining elements reindex ho sakte
hain. Repeated `shift()` large input par unnecessary extra work create kar sakta hai.

Head index approach me:

```txt
dequeue = queue[head]
head++
```

Har node constant-time index access se process hota hai.

## Chosen Learning Path

Hum `optimal.ts` me **iterative BFS with queue + head index** implement karenge.

Ye problem ke words ko directly model karta hai:

```txt
left to right
level by level
```

Important implementation detail:

```txt
levelSize ko inner loop ke start se pehle capture karo
```

Inner loop ke andar children enqueue honge aur queue length grow hogi.
Frozen `levelSize` hi current aur next level ko mix hone se rokta hai.

## Complexity Note

Conceptually live BFS frontier tree ki maximum width `w` tak hota hai.
Is standalone JavaScript implementation me processed entries array ke andar retained
rehte hain because hum `shift()` nahi karte, so concrete queue array worst case `O(n)`
space leti hai.

Required output itself bhi all `n` values store karta hai.
