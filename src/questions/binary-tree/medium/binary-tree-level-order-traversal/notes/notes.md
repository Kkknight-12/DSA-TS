# Binary Tree Level Order Traversal - Notes

## 1. Problem Samjho

Binary tree ka root diya hai.
Values ko ek flat traversal me nahi,
**left-to-right aur level-by-level groups** me return karna hai.

Example:

```txt
        3
       / \
      9  20
         / \
        15  7
```

Expected result:

```txt
[
  [3],
  [9, 20],
  [15, 7]
]
```

### Prerequisite Setup: Queue Ka FIFO Rule

`BFS` means **Breadth-First Search**.
Breadth-first ka simple meaning:

```txt
ek poora level finish karo
uske baad next deeper level par jao
```

Queue is order ko naturally preserve karti hai.
Stack latest discovered branch ko pehle process karke depth me le jata,
but queue oldest waiting node ko pehle process karke same level complete karti hai.

Queue ka order:

```txt
FIRST IN -> FIRST OUT
```

Jo node pehle enqueue hota hai,
woh pehle process hota hai.

```txt
enqueue 9
enqueue 20

queue front -> 9, then 20
```

Isi wajah se left child ko right child se pehle enqueue karne par
har level left-to-right process hota hai.

### Input Array Actual Tree Nahi Hai

```txt
root = [3, 9, 20, null, null, 15, 7]
```

Ye tree ki level-order serialization hai.
Test helper pehle isse real linked nodes banata hai:

| Parent | Left slot | Right slot | Assignment            |
| ------ | --------- | ---------- | --------------------- |
| `3`    | `9`       | `20`       | children `9` and `20` |
| `9`    | `null`    | `null`     | no children           |
| `20`   | `15`      | `7`        | children `15` and `7` |

Traversal function ko array nahi,
ready tree ka `TreeNode | null` root milta hai.

Do queues ko confuse mat karo:

```txt
buildTree queue -> input serialization se tree banati hai
solution queue  -> ready tree ko BFS me visit karti hai
```

---

## 2. Brute Force / First Attempt

### Attempt 1: Normal flat BFS

Queue se nodes left-to-right process karke ek array me add kar dein:

```txt
[3, 9, 20, 15, 7]
```

Traversal order correct hai,
but level boundaries lost ho gayi:

```txt
required = [[3], [9,20], [15,7]]
```

So flat BFS incomplete solution hai.

### Attempt 2: Queue me separator marker

Har level ke baad `null` marker enqueue karke boundary detect kar sakte hain.
Ye valid design hai, but extra marker rules chahiye:

```txt
marker kab add hoga?
last marker ke baad loop kab stop hoga?
real null children aur separator ko kaise distinguish karenge?
```

Cleaner preference: marker ki jagah current pending-node count snapshot karo.

### JavaScript `shift()` Attempt

`queue.shift()` logically correct dequeue hai,
but JS array ke remaining elements reindex ho sakte hain.
Repeated front removal worst case me unnecessary `O(n²)` work create kar sakta hai.

Moving head index cleaner hai:

```txt
current = queue[head]
head++
```

---

## 3. Key Insight

Tree:

```txt
        3
       / \
      9  20
```

Level 0 start par queue:

```txt
[3]
```

Current level size:

```txt
levelSize = 1
```

Node `3` process karte waqt children add hote hain:

```txt
queue becomes [3, 9, 20]
```

Queue grow hui,
but `9` aur `20` current level ke nodes nahi hain.
Woh next level hain.

Isliye key insight:

```txt
LEVEL START PAR PENDING COUNT FREEZE KARO
```

```txt
levelSize = queue.length - head
```

Then exactly `levelSize` nodes process karo.

Best memory line:

```txt
Outer loop = one level
Inner loop = level start par already waiting nodes only
Ab enqueue hue children = next outer loop ka work
```

---

## 4. Why This Technique Works

Har outer iteration ke start ka invariant:

```txt
queue[head ... end] me exactly current level ke nodes hain,
left-to-right order me
```

### Base level

Initially pending queue me sirf root hai:

```txt
[root]
```

Root hi level 0 hai,
so invariant true hai.

### Ek level process karne ke baad

Exactly frozen `levelSize` parents process hote hain.

Har parent ke liye:

```txt
left child first enqueue
right child second enqueue
```

Parents khud left-to-right consume hote hain,
so unke children bhi combined next level me left-to-right append hote hain.

After inner loop:

```txt
old current-level nodes consumed
pending suffix = exactly next-level nodes
```

Isliye next outer iteration par same invariant dobara true hai.

---

## 5. Variables

| Variable       | Real meaning                                                       |
| -------------- | ------------------------------------------------------------------ |
| `root`         | ready binary tree ka entry node                                    |
| `result`       | completed level arrays                                             |
| `queue`        | all enqueued node references; `head` ke baad wala part pending hai |
| `head`         | next node consume karne ka index                                   |
| `levelSize`    | current level start par pending nodes ki frozen count              |
| `currentLevel` | sirf current outer iteration ki values                             |
| `processed`    | current level me kitne nodes consume ho chuke                      |
| `current`      | queue se abhi consumed node                                        |

Queue ka useful visual split:

```txt
[processed entries | pending entries]
                    ^ head
```

Example:

```txt
queue = [3, 9, 20, 15, 7]
head = 3

[3,9,20 | 15,7]
          ^ pending current level
```

---

## 6. Mental Model

Queue ko school pickup line samjho.

Har round ke start par waiting students ki photo lete hain:

```txt
photo count = levelSize
```

Us photo me jitne students hain,
sirf wahi current round me process honge.

Processing ke time naye students line ke end me join kar sakte hain,
but woh old photo ka part nahi the:

```txt
old photo students -> current level
newly joined students -> next level
```

Tree language me:

```txt
current parents -> currentLevel
their children  -> next outer iteration
```

Frozen count ek hard boundary create karti hai
without inserting any separator marker.

---

## 7. Boundary Cases

| Case             | Input               | Output                  | Why                                                       |
| ---------------- | ------------------- | ----------------------- | --------------------------------------------------------- |
| empty tree       | `[]`                | `[]`                    | root nahi, so koi level nahi                              |
| single node      | `[1]`               | `[[1]]`                 | exactly one level                                         |
| left-skewed      | `[1,2,null,3]`      | `[[1],[2],[3]]`         | each level width one                                      |
| right-skewed     | `[1,null,2,null,3]` | `[[1],[2],[3]]`         | each level width one                                      |
| complete tree    | `[1,2,3,4,5,6,7]`   | `[[1],[2,3],[4,5,6,7]]` | level widths double                                       |
| sparse tree      | missing children    | only real values        | null children enqueue nahi hote                           |
| duplicate values | repeated values     | repeats preserved       | queue node references store karti hai, unique values nahi |
| extreme values   | `-1000`, `1000`     | normal grouping         | value range structure affect nahi karti                   |

Important empty-tree distinction:

```txt
[]   = no levels
[[]] = one empty level
```

Problem ka correct empty answer `[]` hai.

---

## 8. Conditions

### Empty-root guard

```txt
root === null
```

Meaning:

```txt
tree me ek bhi real level nahi hai
```

### Outer loop

```txt
head < queue.length
```

Meaning:

```txt
queue me at least one unprocessed node pending hai
```

### Inner loop

```txt
processed < levelSize
```

Meaning:

```txt
current level ke frozen nodes abhi complete nahi hue
```

Dhyan do:

```txt
processed < queue.length
```

use nahi karna.
Queue length children enqueue hone par grow hoti rahegi,
so next levels current inner loop me mix ho sakte hain.

### Child checks

```txt
current.left !== null
current.right !== null
```

Only real nodes queue me jate hain.
Null placeholder tree construction me position batata hai,
but traversal queue ka node nahi banta.

---

## 9. Adjustment Logic

### Why `queue.length - head`?

Queue array processed entries remove nahi karti.

Example:

```txt
queue = [3, 9, 20]
head = 1
```

`queue.length` is `3`,
but pending nodes sirf indices `1` and `2` par hain:

```txt
pending count = 3 - 1 = 2
```

So:

```txt
levelSize = queue.length - head
```

### Why left child first?

Required order same level ke andar left-to-right hai.

```txt
enqueue left
enqueue right
```

FIFO later left ko right se pehle consume karega.

### Why fresh `currentLevel` every outer loop?

Har inner array exactly one level represent karti hai.
Same array reuse karenge toh values different levels me mix ho jayengi.

### Why result push inner loop ke baad?

Tab frozen level ke saare nodes complete ho chuke hote hain.
Inner loop ke andar push karna partial levels create karega.

---

## 10. Answer Formula

Manual simulation ke baad grouping rule:

```txt
CURRENT_LEVEL
= values of all nodes pending at outer-loop start
```

Next level:

```txt
NEXT_LEVEL
= non-null left and right children
   of every CURRENT_LEVEL node
```

Final answer:

```txt
RESULT
= CURRENT_LEVEL_0
+ CURRENT_LEVEL_1
+ CURRENT_LEVEL_2
+ ...
```

Yahan `+` concatenation/order represent karta hai,
numeric addition nahi.

---

## 11. Full Dry Run

Tree:

```txt
        3
       / \
      9  20
         / \
        15  7
```

Queue notation:

```txt
[processed | pending]
```

### Level summary

| Outer iteration | Pending at level start | Frozen `levelSize` | Completed `currentLevel` | Children appended | Result after level    |
| --------------: | ---------------------- | -----------------: | ------------------------ | ----------------- | --------------------- |
|               1 | `[3]`                  |                  1 | `[3]`                    | `9,20`            | `[[3]]`               |
|               2 | `[9,20]`               |                  2 | `[9,20]`                 | `15,7`            | `[[3],[9,20]]`        |
|               3 | `[15,7]`               |                  2 | `[15,7]`                 | none              | `[[3],[9,20],[15,7]]` |

### Exact queue state changes

|              Step | Consumed node | `head` after consume | Value array | Enqueued children        | Full queue after step |
| ----------------: | ------------: | -------------------: | ----------- | ------------------------ | --------------------- |
|             start |             - |                    0 | `[]`        | root `3` already present | `[3]`                 |
| level 0, node 1/1 |           `3` |                    1 | `[3]`       | `9,20`                   | `[3 \| 9,20]`         |
| level 1, node 1/2 |           `9` |                    2 | `[9]`       | none                     | `[3,9 \| 20]`         |
| level 1, node 2/2 |          `20` |                    3 | `[9,20]`    | `15,7`                   | `[3,9,20 \| 15,7]`    |
| level 2, node 1/2 |          `15` |                    4 | `[15]`      | none                     | `[3,9,20,15 \| 7]`    |
| level 2, node 2/2 |           `7` |                    5 | `[15,7]`    | none                     | `[3,9,20,15,7 \|]`    |

End:

```txt
head === queue.length === 5
```

No pending nodes remain,
so traversal complete hai.

---

## 12. Quick Reference

Technique:

```txt
BFS + FIFO queue + frozen level size
```

Core flow:

```txt
if root null -> []

queue=[root], head=0

while pending nodes exist:
  levelSize = pending count snapshot
  currentLevel = []

  process exactly levelSize nodes:
    consume queue[head]
    head++
    add value
    enqueue left
    enqueue right

  append completed currentLevel
```

Invariants:

```txt
outer loop start -> pending suffix is exactly one level
inner loop        -> consumes only frozen current-level nodes
new children      -> next level
```

Complexity:

| Measure              | Complexity | Why                                              |
| -------------------- | ---------: | ------------------------------------------------ |
| Time                 |       O(n) | each node once enqueue and once consume hota hai |
| Live frontier        |       O(w) | at most maximum tree width pending hoti hai      |
| Concrete queue array |       O(n) | processed slots retained rehte hain              |
| Required output      |       O(n) | every node value answer me stored hai            |

Final memory line:

```txt
level start ki waiting line ka size freeze karo;
children ab join honge, but unki turn next round me hai
```
