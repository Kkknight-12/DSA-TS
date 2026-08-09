# Binary Tree Postorder Traversal - Notes

## 1. Problem Samjho

Binary tree ka root diya hai.
Har node ki value postorder sequence me collect karni hai.

LeetCode input:

```txt
root = [1, null, 2, 3]
```

### Array se actual tree kaise banta hai?

Ye traversal algorithm ko directly milne wali array nahi hai.
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
is tree ka `TreeNode | null` root milta hai.

### Pehle manually walk karo

Postorder me parent tab tak wait karta hai
jab tak uske dono child subtrees complete na hon.

```txt
node 3:
  left empty
  right empty
  visit 3

node 2:
  left subtree 3 complete
  right empty
  visit 2

node 1:
  left empty
  right subtree 2 complete
  visit 1
```

Answer:

```txt
[3, 2, 1]
```

Simulation se order emerge hota hai:

```txt
LEFT -> RIGHT -> ROOT
```

---

## 2. Recursive Approach

Har node ko ek subtree ka root samjho.
Us subtree ke three ordered jobs hain:

```txt
1. left subtree ka postorder complete karo
2. right subtree ka postorder complete karo
3. current node visit karo
```

Base case:

```txt
node === null
```

Null branch actual node contain nahi karti,
so empty sequence contribute karke caller ko return karti hai.

### Kya separate brute force chahiye?

Nahi. Answer me har node exactly once chahiye,
so kisi bhi correct approach ko all `n` nodes process karne padenge.

```txt
minimum required time = O(n)
```

Recursive DFS already time-optimal hai.
Iterative follow-up time improve nahi karta;
woh hidden recursive state ko explicit stack state me convert karta hai.

---

## 3. Key Insight

Postorder ka most important rule:

```txt
CURRENT NODE NEEDS TWO RETURNS
```

Tree:

```txt
      1
     / \
    2   3
```

Node `1` ko dekhte hi visit karna allowed nahi hai.

```txt
1 pending
left 2 complete
1 still pending
right 3 complete
now visit 1
```

Result:

```txt
[2, 3, 1]
```

Traversal names ka real difference `visit` event ki position hai:

```txt
PREORDER                 INORDER                  POSTORDER
visit node               traverse left           traverse left
traverse left            visit node              traverse right
traverse right           traverse right           visit node
```

Postorder me visit line last hai,
isliye iterative version ko sabse zyada delayed state remember karni padti hai.

---

## 4. Why This Technique Works

Recursive helper ka promise:

```txt
traverse(node)
node ki complete subtree ko postorder me result me append karega
```

Promise fulfill hota hai because helper:

```txt
left subtree ka complete postorder append karta hai
right subtree ka complete postorder append karta hai
then node.val append karta hai
```

### Iterative version same promise kaise rakhti hai?

Har node ke liye two stack events bante hain:

| Event    | Meaning                                                                        |
| -------- | ------------------------------------------------------------------------------ |
| `expand` | node first time mila; children ka work schedule karna baaki hai                |
| `visit`  | marker pop hone tak scheduled children finish; tab node answer me ja sakta hai |

`visit` marker ko children ke neeche park karte hain.
Children ka complete work marker ke upar hota hai,
so LIFO stack marker ko tab tak pop nahi kar sakta jab tak children finish na ho jayen.

This gives an invariant:

```txt
result me sirf wahi node aata hai
jiski left aur right subtree already complete hain
```

---

## 5. Variables

### Recursive

| Variable | Real meaning                                      |
| -------- | ------------------------------------------------- |
| `root`   | complete tree ka entry node                       |
| `node`   | current recursive call ki subtree ka root         |
| `result` | already postorder-visited values ka shared output |

### Iterative

| Variable      | Real meaning                                 |
| ------------- | -------------------------------------------- |
| `stack`       | future `expand` aur delayed `visit` events   |
| `frame.node`  | event kis real tree node se belong karta hai |
| `frame.phase` | event ka current job: `expand` ya `visit`    |
| `current`     | abhi popped frame ka node                    |
| `result`      | nodes whose `visit` event has executed       |

Important distinction:

```txt
same node ke liye two separate stack events process hote hain
aur dono events ka job different hota hai
```

Example:

```txt
1:expand -> children schedule karo
1:visit  -> ye marker pop ho toh children done, value add karo
```

---

## 6. Mental Model

### Recursive: parent waits for two reports

Har node ko manager samjho:

```txt
left child se "done" report chahiye
right child se "done" report chahiye
dono reports ke baad manager apna naam likhta hai
```

```txt
┌──────────────────────────────┐
│ frame: node                  │
│                              │
│ 1. wait for LEFT            │
│ 2. wait for RIGHT           │
│ 3. VISIT node               │
└──────────────────────────────┘
```

### Iterative: event planner

Stack ko sirf nodes ki list mat samjho.
Ye future events ka planner hai.

Node first time mile:

```txt
abhi visit mat karo
uska VISIT task neeche park karo
phir children ka work uske upar rakho
```

Example tree:

```txt
      1
     / \
    2   3
```

Desired execution:

```txt
2 subtree -> 3 subtree -> visit 1
```

Stack reverse schedule:

```txt
push 1:visit
push 3:expand
push 2:expand

stack = [1:visit, 3:expand, 2:expand]
                                      ^ top
```

LIFO actual execution:

```txt
2 first
3 second
1:visit last
```

---

## 7. Boundary Cases

| Case                | Input shape  | Output behavior       | Why                                             |
| ------------------- | ------------ | --------------------- | ----------------------------------------------- |
| empty tree          | `root=null`  | `[]`                  | koi frame create nahi hota                      |
| single node         | `[1]`        | `[1]`                 | leaf ka expand apna visit schedule karta hai    |
| only left children  | left-skewed  | deepest to root       | har ancestor child ke complete hone tak waits   |
| only right children | right-skewed | deepest to root       | same delayed-parent rule apply hota hai         |
| duplicate values    | `[2,2,2]`    | `[2,2,2]`             | values same, but nodes and frames separate hain |
| negative values     | `[-1,-2,-3]` | structure-based order | sign traversal order affect nahi karta          |

Dhyan do: left-skewed aur right-skewed dono ka output bottom-to-top ho sakta hai.
Isliye child ordering verify karne ke liye branching tree test bhi necessary hai.

---

## 8. Conditions

### Recursive base case

```txt
node === null
```

Meaning:

```txt
branch empty hai; parent frame ka next checkpoint resume karo
```

### Iterative empty-root check

```txt
root === null
```

No real root means no event schedule karna hai,
so directly `[]` return hota hai.

### Iterative loop

```txt
stack.length > 0
```

Meaning:

```txt
abhi expand ya visit event execute hona baaki hai
```

### Phase check

| Phase    | Required action                           | Value abhi add hogi? |
| -------- | ----------------------------------------- | -------------------- |
| `expand` | visit marker aur child work schedule karo | no                   |
| `visit`  | node ki value result me add karo          | yes                  |

### Child checks

```txt
current.right !== null
current.left !== null
```

Only real children ka `expand` event create hota hai.
Null ke liye unnecessary frame nahi banta.

---

## 9. Adjustment Logic

Iterative postorder ka heart **reverse scheduling** hai.

Desired execution:

```txt
LEFT -> RIGHT -> ROOT-VISIT
```

Stack LIFO hai,
so push order exact reverse hoga:

```txt
ROOT-VISIT -> RIGHT-EXPAND -> LEFT-EXPAND
```

| Push step | Stack after push                          | Why this position?                            |
| --------: | ----------------------------------------- | --------------------------------------------- |
|         1 | `[root:visit]`                            | root sabse last execute hona chahiye          |
|         2 | `[root:visit, right:expand]`              | right root se pehle, but left ke baad chahiye |
|         3 | `[root:visit, right:expand, left:expand]` | left top par aakar first execute hoga         |

### Common mistakes

#### Mistake 1: first pop par value add karna

```txt
pop root:expand -> result.push(root)
```

Ye root ko children se pehle visit karega,
so behavior preorder jaisa ho jayega.

#### Mistake 2: left before right push karna

```txt
push root:visit
push left
push right
```

Right top par aayega,
so execution `RIGHT -> LEFT -> ROOT` ho jayegi.

#### Mistake 3: visit marker last push karna

Marker top par aakar immediately execute ho jayega,
before either child.

Best memory line:

```txt
desired pop order ka reverse push karo
```

---

## 10. Answer Formula

Ab manual simulation aur delayed-visit rule clear hai,
so formula naturally follow karta hai:

```txt
POSTORDER(node)
= POSTORDER(node.left)
+ POSTORDER(node.right)
+ [node.val]
```

Null subtree contributes:

```txt
[]
```

Example:

```txt
      1
     / \
    2   3
```

```txt
POSTORDER(1)
= POSTORDER(2) + POSTORDER(3) + [1]
= [2] + [3] + [1]
= [2,3,1]
```

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

| Step | Active event                                             | Result after event |
| ---: | -------------------------------------------------------- | ------------------ |
|    1 | `traverse(1)` starts; left `null` returns                | `[]`               |
|    2 | node `1` starts right call `traverse(2)`                 | `[]`               |
|    3 | node `2` starts left call `traverse(3)`                  | `[]`               |
|    4 | node `3` left and right null calls return                | `[]`               |
|    5 | both children of `3` done; visit `3` and return to `2`   | `[3]`              |
|    6 | node `2` right null returns; visit `2` and return to `1` | `[3,2]`            |
|    7 | both children of `1` done; visit `1`                     | `[3,2,1]`          |

### Iterative event-stack execution

Stack notation:

```txt
[bottom ... top]
E = expand
V = visit
```

| Iteration | Popped event | Work scheduled / performed    | Stack after     | Result    |
| --------: | ------------ | ----------------------------- | --------------- | --------- |
|     start | -            | root expand scheduled         | `[1:E]`         | `[]`      |
|         1 | `1:E`        | push `1:V`, then right `2:E`  | `[1:V,2:E]`     | `[]`      |
|         2 | `2:E`        | push `2:V`, then left `3:E`   | `[1:V,2:V,3:E]` | `[]`      |
|         3 | `3:E`        | push `3:V`; no real children  | `[1:V,2:V,3:V]` | `[]`      |
|         4 | `3:V`        | visit `3`                     | `[1:V,2:V]`     | `[3]`     |
|         5 | `2:V`        | visit `2` after child `3`     | `[1:V]`         | `[3,2]`   |
|         6 | `1:V`        | visit `1` after right subtree | `[]`            | `[3,2,1]` |

Stack empty means all expand and delayed visit events complete hain.

---

## 12. Quick Reference

Order:

```txt
LEFT -> RIGHT -> ROOT
```

Recursive:

```txt
recurse left
recurse right
visit node
```

Iterative one-stack frames:

```txt
start with root:expand

pop visit:
  add node value

pop expand:
  push node:visit
  push right:expand
  push left:expand
```

Why push reverse?

```txt
push: ROOT, RIGHT, LEFT
pop:  LEFT, RIGHT, ROOT
```

Complexity:

| Approach              | Time |      Auxiliary space |
| --------------------- | ---: | -------------------: |
| Recursive             | O(n) |      O(h) call stack |
| Iterative event stack | O(n) | O(h) explicit frames |

Final memory line:

```txt
node first time mile toh visit mat karo
uska VISIT task neeche park karo
children complete hone ke baad marker wapas top par aayega
```
