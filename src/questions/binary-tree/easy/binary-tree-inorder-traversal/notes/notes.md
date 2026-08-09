# Binary Tree Inorder Traversal - Notes

## 1. Problem Samjho

Binary tree ka root diya hai.
Har node ki value inorder sequence me collect karni hai.

LeetCode input:

```txt
root = [1, null, 2, 3]
```

### Array se actual tree kaise banta hai?

Ye array traversal algorithm ka direct input nahi hai.
Ye **level-order representation** hai jisse test helper linked nodes banata hai.

| Queue se parent | Left array slot        | Right array slot        | Queue after assignment |
| --------------- | ---------------------- | ----------------------- | ---------------------- |
| `1`             | `null` -> child nahi   | `2` -> real right child | `[2]`                  |
| `2`             | `3` -> real left child | slot nahi -> child nahi | `[3]`                  |

Actual tree:

```txt
    1
     \
      2
     /
    3
```

Traversal function ko array nahi,
is tree ka `TreeNode` root milta hai.

### Pehle manually walk karo

Root `1` se start:

```txt
1 ka left empty hai -> visit 1
1 ke right me 2 hai
2 ke left me 3 hai
3 ka left empty hai -> visit 3
3 ka right empty hai -> return to 2
ab visit 2
```

Answer:

```txt
[1, 3, 2]
```

Is simulation se order emerge hota hai:

```txt
LEFT -> ROOT -> RIGHT
```

---

## 2. Recursive Approach

Har node ko ek chhoti subtree ka root samjho.
Us subtree ke liye same three jobs hain:

```txt
1. left subtree ka inorder complete karo
2. current node visit karo
3. right subtree ka inorder complete karo
```

Base case:

```txt
node === null
```

Null branch me actual node nahi hai,
so woh empty sequence contribute karke caller ko return karti hai.

### Kya is problem me separate brute force hai?

Nahi, har answer me har node ki value chahiye.
Isliye kisi bhi correct traversal ko saare `n` nodes visit karne padenge.

```txt
minimum required work = O(n)
```

Recursive DFS already time-optimal hai.
Iterative approach time improve nahi karti;
woh hidden call stack ko explicit stack se replace karti hai.

---

## 3. Key Insight

Inorder ka most important event hai:

```txt
VISIT CURRENT NODE ONLY AFTER LEFT RETURNS
```

Tree:

```txt
      2
     /
    3
```

Jab `2` dikha,
tab `2` ko answer me add karna abhi allowed nahi hai.

```txt
2 pending
go left to 3
3 complete
return to 2
now visit 2
```

Isliye sequence `[3, 2]` hai, `[2, 3]` nahi.

Preorder aur inorder code me main difference sirf `visit` line ki position hai:

```txt
PREORDER                 INORDER
visit node               traverse left
traverse left            visit node
traverse right           traverse right
```

---

## 4. Why This Technique Works

Recursive helper ka promise define karo:

```txt
traverse(node)
node ki complete subtree ko inorder me result me append karega
```

Promise fulfill karne ke liye helper:

```txt
left subtree ka complete inorder append karta hai
then node.val append karta hai
then right subtree ka complete inorder append karta hai
```

Har subtree same promise follow karti hai,
isliye complete root bhi correct inorder produce karta hai.

Iterative solution same execution ko manually reproduce karti hai:

| Recursive event    | Iterative equivalent          |
| ------------------ | ----------------------------- |
| node ki call start | node stack me push            |
| left call start    | `current = current.left`      |
| left call return   | nearest ancestor stack se pop |
| current node visit | popped value result me push   |
| right call start   | `current = current.right`     |

Approach change hoti hai,
inorder events ka order change nahi hota.

---

## 5. Variables

### Recursive

| Variable | Real meaning                            |
| -------- | --------------------------------------- |
| `root`   | complete tree ka entry node             |
| `node`   | current call ki subtree ka root         |
| `result` | already visited values ka shared output |

### Iterative

| Variable  | Real meaning                                        |
| --------- | --------------------------------------------------- |
| `current` | abhi actively explore ho rahi subtree ka root       |
| `stack`   | paused ancestors; left ke baad inhe visit karna hai |
| `result`  | jinka inorder visit event ho chuka hai              |

`stack` me stored node completed node nahi hai.
Woh pending node hai:

```txt
left subtree chal rahi hai
current visit pending hai
right subtree pending hai
```

---

## 6. Mental Model

### Recursive: three-event frame

Har call frame ke andar three checkpoints imagine karo:

```txt
┌──────────────────────────────┐
│ frame: node                  │
│                              │
│ 1. wait for LEFT            │
│ 2. VISIT node               │
│ 3. wait for RIGHT           │
└──────────────────────────────┘
```

### Iterative: paused bookmarks

Stack ko bookmark stack samjho.

Jab left ja rahe ho:

```txt
"is node par baad me wapas aana hai"
```

so node push hota hai.

Jab null left milta hai:

```txt
"aur left nahi ja sakte; nearest bookmark resume karo"
```

so top node pop aur visit hota hai.

Example:

```txt
      1
     /
    2
   /
  4
```

Left descent:

```txt
push 1 -> [1]
push 2 -> [1,2]
push 4 -> [1,2,4]
4.left = null
```

Top `4` nearest paused node hai,
so visit order `4`, then `2`, then `1` emerge hota hai.

---

## 7. Boundary Cases

| Case                | Input shape  | Output behavior       | Why                                          |
| ------------------- | ------------ | --------------------- | -------------------------------------------- |
| empty tree          | `root=null`  | `[]`                  | koi real node nahi                           |
| single node         | `[1]`        | `[1]`                 | left empty, visit root, right empty          |
| only left children  | left-skewed  | bottom to top         | deepest left node sabse pehle ready hota hai |
| only right children | right-skewed | top to bottom         | har node ka left already empty hota hai      |
| duplicate values    | `[2,2,2]`    | `[2,2,2]`             | same values bhi separate node objects hain   |
| negative values     | `[-1,-2,-3]` | structure-based order | value sign traversal ko affect nahi karta    |

---

## 8. Conditions

### Recursive base case

```txt
node === null
```

Meaning:

```txt
current branch empty hai; caller ka next checkpoint resume karo
```

### Iterative outer loop

```txt
current !== null OR stack.length > 0
```

Dono sides important hain:

| State                               | Meaning                            | Continue kyun?                           |
| ----------------------------------- | ---------------------------------- | ---------------------------------------- |
| `current !== null`                  | nayi subtree explore karni hai     | uski left boundary find karni hai        |
| `current === null`, stack non-empty | ancestors paused hain              | unhe visit/right-process karna baaki hai |
| `current === null`, stack empty     | active aur paused work dono khatam | traversal complete                       |

Sirf `current !== null` condition use karenge,
to left boundary par loop jaldi stop ho jayega aur stack ke ancestors lose ho jayenge.

### Inner left-descent loop

```txt
while current is a real node:
  save current
  move left
```

Ye inner loop null boundary tak complete left path prepare karta hai.

---

## 9. Adjustment Logic

Iterative solution ka central state transition:

```txt
PUSH -> GO LEFT -> POP/VISIT -> GO RIGHT
```

### Push kab?

Current node ki left subtree explore karne se pehle.

Why:

```txt
left se return hone ke baad isi node par wapas aana hai
```

### Pop aur visit kab?

Jab `current` null ho jaye.

Why:

```txt
stack top ki left subtree ab complete hai
```

### Right kab?

Pop/visit ke immediately baad.

Why:

```txt
LEFT done -> ROOT done -> ab RIGHT ka turn
```

Common mistake:

```txt
push karte hi result me value add kar dena
```

Ye node ko left subtree se pehle visit kar dega,
jo inorder nahi hai.

---

## 10. Answer Formula

Ab simulation aur event order clear hone ke baad formula natural lagta hai:

```txt
INORDER(node)
= INORDER(node.left)
+ [node.val]
+ INORDER(node.right)
```

Null subtree contributes:

```txt
[]
```

Example:

```txt
      2
     / \
    1   3
```

```txt
INORDER(2)
= INORDER(1) + [2] + INORDER(3)
= [1] + [2] + [3]
= [1,2,3]
```

Important: binary search tree me inorder sorted output de sakta hai,
but is problem ka input general binary tree hai.
General binary tree me sorted output guaranteed nahi hai.

---

## 11. Full Dry Run

Given tree:

```txt
    1
     \
      2
     /
    3
```

### Recursive execution order

| Step | Active event                                               | Result after event |
| ---: | ---------------------------------------------------------- | ------------------ |
|    1 | `traverse(1)` starts; call `traverse(1.left=null)`         | `[]`               |
|    2 | null returns; resume node `1`; visit `1`                   | `[1]`              |
|    3 | call `traverse(2)`; before visiting `2`, call its left `3` | `[1]`              |
|    4 | `traverse(3.left=null)` returns; visit `3`                 | `[1,3]`            |
|    5 | `traverse(3.right=null)` returns; node `3` frame completes | `[1,3]`            |
|    6 | resume node `2` after left return; visit `2`               | `[1,3,2]`          |
|    7 | `traverse(2.right=null)` returns; all frames complete      | `[1,3,2]`          |

### Iterative stack execution

Stack notation:

```txt
[bottom ... top]
```

| Outer iteration | Left descent                            | Pop / visit   | Move right     | State after iteration                |
| --------------: | --------------------------------------- | ------------- | -------------- | ------------------------------------ |
|           start | -                                       | -             | -              | `current=1`, `stack=[]`, `result=[]` |
|               1 | push `1`, then `current=null`           | pop/visit `1` | `current=2`    | `stack=[]`, `result=[1]`             |
|               2 | push `2`, push `3`, then `current=null` | pop/visit `3` | `current=null` | `stack=[2]`, `result=[1,3]`          |
|               3 | skipped because `current=null`          | pop/visit `2` | `current=null` | `stack=[]`, `result=[1,3,2]`         |

Termination check:

```txt
current === null
stack.length === 0
```

Active subtree bhi nahi aur paused ancestor bhi nahi,
so final answer `[1,3,2]` hai.

---

## 12. Quick Reference

Order:

```txt
LEFT -> ROOT -> RIGHT
```

Recursive:

```txt
recurse left
visit node
recurse right
```

Iterative:

```txt
while current or stack:
  push complete left path
  pop and visit nearest ancestor
  move to its right subtree
```

Complexity:

| Approach  | Time |     Auxiliary space |
| --------- | ---: | ------------------: |
| Recursive | O(n) |     O(h) call stack |
| Iterative | O(n) | O(h) explicit stack |

Best memory line:

```txt
left complete hone tak node pending rakho;
left return hote hi node visit karo;
phir right jao
```
