# 110. Balanced Binary Tree

## Problem

Binary tree ka `root` diya gaya hai.
Hume determine karna hai ki tree **height-balanced** hai ya nahi.

Tree tab height-balanced hoti hai jab **har real node** par:

```txt
absolute(left subtree height - right subtree height) <= 1
```

Allowed difference:

```txt
0 or 1 -> balanced at this node
2+     -> unbalanced at this node
```

Final answer `true` tabhi hoga jab ye condition complete tree ke every node par true
ho.

## Maximum Depth Se Connection

Previous problem me subtree ki height / maximum depth calculate ki thi:

```txt
height(null) = 0
height(node) = 1 + max(height(left), height(right))
```

Balanced Binary Tree me har node ko wahi two child heights chahiye,
but ab unke difference ko bhi validate karna hai.

```txt
height calculate karo
+ balance condition check karo
```

## Sabse Pehle: Input Array Aur Actual Tree

LeetCode example:

```txt
root = [3, 9, 20, null, null, 15, 7]
```

Ye array `isBalanced` function ko directly nahi milti.
Ye tree ki **level-order representation** hai.

Test helper real parent nodes ko queue me rakhta hai,
aur har parent ke liye next left then right array slots consume karta hai:

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

`null` child create nahi hota aur parent queue me enqueue nahi hota.
Finally algorithm ko actual `TreeNode | null` root milta hai.

## Example 1

```txt
Input:  root = [3, 9, 20, null, null, 15, 7]
Output: true
```

Bottom-up heights:

```txt
9, 15, 7 are leaves -> height 1
20 -> left=1, right=1, difference=0, height=2
3  -> left=1, right=2, difference=1, height=3
```

Every node par difference `<= 1` hai,
so complete tree balanced hai.

## Example 2

```txt
Input:  root = [1, 2, 2, 3, 3, null, null, 4, 4]
Output: false
```

Actual tree:

```txt
          1
         / \
        2   2
       / \
      3   3
     / \
    4   4
```

Root `1` par:

```txt
left subtree height  = 3
right subtree height = 1
difference           = 2
```

`2 > 1`, so root unbalanced hai aur final answer `false` hai.

## Example 3

```txt
Input:  root = []
Output: true
```

Empty tree me koi violating node nahi hai,
so woh balanced consider hoti hai.

## Constraints

```txt
0 <= number of nodes <= 5000
-10^4 <= Node.val <= 10^4
```

Node values balance ko affect nahi karti.
Only left/right structure aur subtree heights matter karte hain.

## Main Challenge: Sirf Root Check Karna Enough Nahi

Tree:

```txt
          1
         / \
        2   3
       /     \
      4       5
     /         \
    6           7
```

Root `1` ke left aur right subtree heights both `3` hain:

```txt
root difference = |3 - 3| = 0
```

Root locally balanced lagta hai.
But node `2` par:

```txt
left height=2, right height=0, difference=2
```

Node `2` unbalanced hai,
so complete tree bhi unbalanced hai.

Therefore:

```txt
root check only        -> insufficient
every node check       -> required
```

## Approaches

| Approach                       | Core idea                                                                    | Prerequisite                   | Worst time | Auxiliary space |
| ------------------------------ | ---------------------------------------------------------------------------- | ------------------------------ | ---------: | --------------: |
| Repeated height calculation    | har node par child heights separately calculate karo, then children validate | Maximum Depth, recursion       |      O(n²) |            O(h) |
| One-pass height + status DFS   | subtree se valid height ya unbalanced signal bottom-up return karo           | Postorder DFS, return contract |       O(n) |            O(h) |
| Iterative postorder (optional) | explicit frames aur stored child heights se same bottom-up combine karo      | Stack, Map, postorder events   |       O(n) |            O(n) |

Here:

```txt
n = number of nodes
h = tree height
```

## Approach 1: Repeated Height Calculation

Har node par three separate questions answer karo:

```txt
1. left subtree ki height kya hai?
2. right subtree ki height kya hai?
3. left aur right subtrees themselves balanced hain?
```

Correct hai,
but height traversal same nodes ko ancestors ke liye repeatedly visit kar sakti hai.

Worst case work pattern:

```txt
root ke liye large subtree height
child ke liye almost same subtree height again
grandchild ke liye large part again
...
```

Is repeated work ki wajah se worst-case time `O(n²)` ho sakta hai.

## Approach 2: One-Pass Height + Unbalanced Signal

Main optimization:

```txt
height aur balance ko separate traversals me mat calculate karo
```

Har subtree ek combined report parent ko return kare:

```txt
valid non-negative height -> subtree balanced hai
-1                        -> subtree unbalanced hai
```

Why `-1` safe signal hai?

```txt
valid tree height kabhi negative nahi hoti
```

Parent flow:

```txt
left report lo
if left unbalanced -> immediately propagate -1

right report lo
if right unbalanced -> immediately propagate -1

if child-height difference > 1 -> return -1
otherwise -> return current valid height
```

Har node ka height aur balance same visit me decide hota hai,
so total time `O(n)` ho jaata hai.

## Chosen Learning Path

Hum dono recursive approaches implement karenge:

```txt
brute-force.ts -> repeated `maxDepth` calls; why O(n²) samjho
optimal.ts     -> one postorder pass with `-1` unbalanced sentinel
```

The optimal solution interview target hai,
but brute force contrast se optimization ka reason obvious hota hai.

## Practical JavaScript Note

Both chosen solutions recursive hain.
Constraint `5000` nodes tak jaati hai,
so completely skewed tree call-stack limit ke close ya beyond ja sakti hai.

Algorithmically:

```txt
brute force -> O(h) recursion stack
optimal     -> O(h) recursion stack
```

Operationally very deep JavaScript tree ke liye iterative postorder alternative stack
overflow avoid kar sakta hai.
