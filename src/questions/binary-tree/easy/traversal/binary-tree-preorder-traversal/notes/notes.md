# Binary Tree Preorder Traversal - Notes

## 1. Problem Samjho

Binary tree ka root diya hai.
Har node ki value preorder sequence me collect karni hai.

Preorder ka order:

```txt
ROOT -> LEFT -> RIGHT
```

Example:

```txt
      1
     / \
    2   3
   / \
  4   5
```

Preorder:

```txt
1, 2, 4, 5, 3
```

Tree array input level-order representation hai.
`null` ka matlab us position par child absent hai.

---

## 2. Recursive Approach

Current node par same three-step rule lagao:

```txt
visit current
traverse left
traverse right
```

Har recursive call ek subtree ka root receive karti hai.

Base case:

```txt
node === null
```

Null branch me visit karne ko kuch nahi,
so caller par return karte hain.

---

## 3. Key Insight

Preorder ka naam yaad karne se zyada useful hai event order samajhna.

At every node:

```txt
value immediately record hoti hai
left child call uske baad hoti hai
right child call left ke complete return ke baad hoti hai
```

Iterative solution me exact same order preserve karna hai,
bas hidden call stack ko explicit stack se replace karna hai.

---

## 4. Why This Technique Works

Recursive call `traverse(node)` ye promise karti hai:

```txt
main node ki poori subtree ko preorder me result me add karungi
```

It fulfills that promise in order:

```txt
node
node.left ki complete preorder
node.right ki complete preorder
```

Iterative stack future work remember karta hai.
Right child pehle push aur left child baad me push karne se LIFO order left ko pehle nikalta hai.

---

## 5. Variables

### Recursive

| Variable | Meaning                                 |
| -------- | --------------------------------------- |
| `root`   | complete tree ka entry node             |
| `node`   | current recursive frame ka subtree root |
| `result` | preorder values ka shared output array  |

### Iterative

| Variable  | Meaning                                     |
| --------- | ------------------------------------------- |
| `stack`   | future me visit hone wale nodes; end is top |
| `current` | stack se abhi pop hua node                  |
| `result`  | already visited nodes ki values             |

---

## 6. Mental Model

Recursive mental model:

```txt
har node bolta hai:
pehle mujhe likho
phir meri left family
phir meri right family
```

Iterative mental model:

```txt
stack ek pending-work list hai
top wala task next execute hota hai
```

Visual:

```txt
desired: left before right
LIFO: last pushed comes first

therefore:
push right
push left
```

---

## 7. Boundary Cases

| Case                | Input shape  | Output             | Why                                 |
| ------------------- | ------------ | ------------------ | ----------------------------------- |
| empty tree          | `root=null`  | `[]`               | visit karne ko node nahi            |
| single node         | `[1]`        | `[1]`              | root visit, both children null      |
| only left children  | left-skewed  | top-to-bottom      | right branches empty                |
| only right children | right-skewed | top-to-bottom      | left branches empty                 |
| negative values     | `[-1,-2,-3]` | same preorder rule | sign traversal ko affect nahi karta |

---

## 8. Conditions

### Recursive base case

```txt
node === null
```

Meaning:

```txt
current branch me actual tree node nahi hai
```

### Iterative loop

```txt
stack.length > 0
```

Meaning:

```txt
abhi pending nodes visit karne baaki hain
```

### Child checks

```txt
current.right !== null
current.left !== null
```

Only real children stack me push hote hain.

---

## 9. Adjustment Logic

Recursive solution me adjustment call stack automatically karta hai.

```txt
left call start
left subtree complete
return to parent
parent ki next line se right call start
```

Iterative solution me order manually adjust hota hai:

```txt
right push first
left push second
```

Example:

```txt
stack=[]
push right 3 -> [3]
push left 2  -> [3,2]
```

Top `2` hai,
so left subtree first process hogi.

---

## 10. Answer Formula

Preorder ko formula ki jagah sequence rule samjho:

```txt
PREORDER(node)
= [node.val]
+ PREORDER(node.left)
+ PREORDER(node.right)
```

Null subtree contributes:

```txt
[]
```

So empty root ka answer naturally empty array hota hai.

---

## 11. Full Dry Run

Tree:

```txt
        1
       / \
      2   3
     / \
    4   5
```

### Recursive execution order

| Step | Event                                        | Result after event |
| ---: | -------------------------------------------- | ------------------ |
|    1 | visit `1`                                    | `[1]`              |
|    2 | call left `2`, visit `2`                     | `[1,2]`            |
|    3 | call left `4`, visit `4`                     | `[1,2,4]`          |
|    4 | `4.left=null`, return                        | `[1,2,4]`          |
|    5 | `4.right=null`, return to `2`                | `[1,2,4]`          |
|    6 | resume `2`, call right `5`, visit `5`        | `[1,2,4,5]`        |
|    7 | `5` children return, then `2` returns to `1` | `[1,2,4,5]`        |
|    8 | resume `1`, call right `3`, visit `3`        | `[1,2,4,5,3]`      |
|    9 | `3` children return; traversal complete      | `[1,2,4,5,3]`      |

### Iterative stack execution

Stack notation:

```txt
[bottom ... top]
```

| Iteration | Pop | Result        | Push order          | Stack after |
| --------: | --: | ------------- | ------------------- | ----------- |
|     start |   - | `[]`          | root `1`            | `[1]`       |
|         1 | `1` | `[1]`         | right `3`, left `2` | `[3,2]`     |
|         2 | `2` | `[1,2]`       | right `5`, left `4` | `[3,5,4]`   |
|         3 | `4` | `[1,2,4]`     | none                | `[3,5]`     |
|         4 | `5` | `[1,2,4,5]`   | none                | `[3]`       |
|         5 | `3` | `[1,2,4,5,3]` | none                | `[]`        |

---

## 12. Quick Reference

Order:

```txt
ROOT -> LEFT -> RIGHT
```

Recursive:

```txt
visit node
recurse left
recurse right
```

Iterative:

```txt
pop and visit
push right
push left
```

Complexity:

| Approach  | Time |                 Auxiliary space |
| --------- | ---: | ------------------------------: |
| Recursive | O(n) |                 O(h) call stack |
| Iterative | O(n) | O(h), worst O(n) explicit stack |

Best memory line:

```txt
left ko pehle process karna hai
isliye stack me left ko last push karo
```
