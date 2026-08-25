# Maximum Depth of Binary Tree - Notes

## Prerequisites / Setup

Is problem se pehle bas ye ideas clear hone chahiye:

- binary-tree node ke `left` aur `right` references
- recursive call ka base case aur return flow
- queue ka FIFO behavior
- LeetCode ki level-order input representation

Hum same answer ko do viewpoints se samjhenge:

```txt
DFS -> deepest child ka answer bottom-up return karo
BFS -> complete levels top-down count karo
```

---

## 1. Problem Samjho

Binary tree ka `root` diya hai.
Hume root se farthest leaf tak longest downward path me real nodes count karne hain.

Example:

```txt
        3
       / \
      9  20
         / \
        15  7
```

Possible root-to-leaf paths:

| Path            | Real nodes | Length |
| --------------- | ---------- | -----: |
| `3 -> 9`        | `3, 9`     |      2 |
| `3 -> 20 -> 15` | `3,20,15`  |      3 |
| `3 -> 20 -> 7`  | `3,20,7`   |      3 |

Maximum length `3` hai,
so answer `3` hai.

### Depth nodes me count hoti hai, edges me nahi

Is LeetCode problem ki definition:

```txt
empty tree  -> 0
leaf node   -> 1
root + child -> 2
```

Kuch textbooks height ko edges me define karte hain,
jahan leaf height `0` ho sakti hai.
Woh ek different convention hai.

Is question me wording explicitly **number of nodes** bolti hai,
so hum `null -> 0` aur `leaf -> 1` use karenge.

### Input array se actual tree kaise banta hai?

LeetCode input:

```txt
[3, 9, 20, null, null, 15, 7]
```

Ye `maxDepth` ka direct parameter nahi hai.
Test helper level-order slots consume karke linked nodes banata hai:

| Current real parent | Left slot | Right slot | Parent queue me kya add hua |
| ------------------- | --------- | ---------- | --------------------------- |
| `3`                 | `9`       | `20`       | nodes `9`, `20`             |
| `9`                 | `null`    | `null`     | kuch nahi                   |
| `20`                | `15`      | `7`        | nodes `15`, `7`             |

Rules:

```txt
1. queue me sirf real parent nodes jaate hain
2. har real parent next left, then next right slot consume karta hai
3. null child create nahi hota aur queue me nahi jaata
```

Finally solution ko actual `TreeNode | null` root milta hai.

---

## 2. Brute Force: Har Path Length Store Karna

First thought ho sakti hai:

```txt
har root-to-leaf path walk karo
har path ki length array me save karo
end me maximum length return karo
```

Example:

```txt
pathLengths = [2, 3, 3]
answer = max(pathLengths) = 3
```

Ye logically correct hai,
but final answer ke liye hume saari path lengths store karne ki zarurat nahi.

Current subtree ko bas ek number chahiye:

```txt
meri deepest branch kitni deep hai?
```

So extra path-length collection avoid karke har child se directly best depth return
karwa sakte hain.

Important observation:

```txt
har correct method worst case me saare n nodes dekhegi
```

Isliye `O(n)` traversal itself brute nahi hai.
Unnecessary part saari path lengths store karna hai.

---

## 3. Key Insight

### Recursive DFS insight

Har node ke paas exactly two possible downward directions hain:

```txt
left subtree
right subtree
```

Root-to-leaf path current node ke baad ek hi side choose kar sakta hai.
Woh left aur right dono branches ko ek path me join nahi kar sakta.

So current node ka deepest path:

```txt
current node
+ deeper of left/right child paths
```

Bottom-up example:

```txt
leaf 15 -> children depths 0,0 -> returns 1
leaf 7  -> children depths 0,0 -> returns 1
node 20 -> children depths 1,1 -> returns 2
node 9  -> children depths 0,0 -> returns 1
root 3  -> children depths 1,2 -> returns 3
```

### Iterative BFS insight

Same tree ko horizontal layers me dekho:

```txt
Level 1:        3
Level 2:      9   20
Level 3:         15  7
```

Har completed level root-to-node path me ek aur real node represent karta hai.

```txt
number of completed non-empty levels = maximum depth
```

---

## 4. Why These Techniques Work

### Recursive helper ka promise

Promise define karo:

```txt
maxDepth(node)
= node se start hone wale longest downward path ki real-node count
```

#### Base case promise

```txt
node === null -> 0
```

Empty subtree me koi path node nahi hai,
so `0` exact answer hai.

#### Real node promise

Every downward path current node ko count karega,
then left ya right subtree me continue karega.

Children apne correct depths return kar dete hain,
so longer child choose karke current node ka `1` add karna exact best path deta hai.

```txt
1 + max(leftDepth, rightDepth)
```

Ye postorder-style aggregation hai:

```txt
LEFT answer -> RIGHT answer -> CURRENT answer
```

### BFS invariant

Har outer-loop start par:

```txt
queue[head ... end]
= current depth ke all and only real nodes
```

Us pending suffix ki count freeze karte hain:

```txt
levelSize = queue.length - head
```

Exactly `levelSize` nodes process karte waqt unke children queue ke end me add hote
hain. Woh children next depth ke nodes hain.

Frozen count current aur next level ko mix hone se rokta hai.
Inner loop complete hone par exactly one real level finish hua,
so `depth++` correct hai.

---

## 5. Variables

### Recursive DFS

| Variable     | Real meaning                                         |
| ------------ | ---------------------------------------------------- |
| `root`       | current recursive call ki subtree ka root            |
| `leftDepth`  | current node ke left child se deepest downward path  |
| `rightDepth` | current node ke right child se deepest downward path |

No shared counter required hai.
Har frame apna local answer calculate karke parent ko return karti hai.

### Iterative BFS

| Variable    | Real meaning                                                   |
| ----------- | -------------------------------------------------------------- |
| `queue`     | tree nodes; `head` se end tak entries abhi pending hain        |
| `head`      | next node consume karne ka index                               |
| `levelSize` | current outer iteration me process hone wali frozen node count |
| `processed` | current frozen level me kitne nodes consume ho chuke hain      |
| `depth`     | ab tak kitne complete non-empty levels finish ho chuke hain    |

`queue.length` alone pending count nahi hai,
because processed entries array me retained rehti hain.

```txt
pending count = queue.length - head
```

---

## 6. Mental Model

### DFS: depth bubbles

Imagine karo har leaf parent ko ek bubble bhej rahi hai:

```txt
"meri depth 1 hai"
```

Parent dono child bubbles dekhta hai:

```txt
left bubble  = 1
right bubble = 1
my bubble    = 1 + max(1,1) = 2
```

Depth answer leaves se root ki taraf **bubble up** hota hai.

```txt
             3 -> returns 3
            / \
returns 1 <- 9   20 -> returns 2
                /  \
     returns 1 <- 15  7 -> returns 1
```

### BFS: horizontal ruler

BFS ko horizontal ruler samjho:

```txt
first completed row  -> depth 1
second completed row -> depth 2
third completed row  -> depth 3
```

Ruler per node nahi badhta.
Woh complete horizontal row ke baad ek step badhta hai.

### DFS vs BFS relation

```txt
DFS asks: deepest child ne kitna answer return kiya?
BFS asks: total kitni non-empty rows complete hui?
```

Dono same structural quantity measure kar rahe hain.

---

## 7. Boundary Cases

| Case                  | Shape / input                   | Answer | Why                                             |
| --------------------- | ------------------------------- | -----: | ----------------------------------------------- |
| empty tree            | `[]` / `root=null`              |      0 | koi real node ya level nahi                     |
| single node           | `[1]`                           |      1 | root itself one-node path hai                   |
| only right child      | `[1,null,2]`                    |      2 | path `1 -> 2` me two nodes                      |
| left-skewed           | `1 ->left 2 ->left 3`           |      3 | only one path, but every real node counts       |
| complete tree         | 3 non-empty levels              |      3 | maximum depth total levels ke equal             |
| duplicate values      | `[2,2,2]`                       |      2 | values same, node references separate           |
| negative values       | `[-100,-50,-25]`                |      2 | value sign structure/depth ko affect nahi karta |
| deepest leaf one side | left depth `4`, right depth `2` |      5 | current node plus deeper child path             |

### Maximum constraint and recursion

`n = 10^4` ka completely skewed tree possible hai:

```txt
1
 \
  2
   \
    3
     \
      ... 10,000 nodes
```

Recursive formula correct rahegi,
but JavaScript call stack itne frames handle na kare to runtime stack overflow ho sakta
hai.

Iterative BFS explicit queue use karti hai,
so is shape ke liye safer implementation hai.

---

## 8. Conditions

### Recursive base condition

```ts
root === null;
```

Problem meaning:

```txt
current branch me real node nahi hai -> depth contribution 0
```

Separate leaf condition required nahi:

```txt
leaf.left  -> null -> 0
leaf.right -> null -> 0
leaf answer = 1 + max(0,0) = 1
```

### Deeper child selection

```ts
Math.max(leftDepth, rightDepth);
```

`Math.min` shortest path dega.
`leftDepth + rightDepth` dono branches combine karega,
but one root-to-leaf path current node ke baad both directions nahi le sakta.

### BFS empty-root condition

```ts
root === null -> return 0
```

Is check ke baad hi root queue me add hota hai.
Null enqueue karenge to phantom level count ho sakta hai.

### BFS outer-loop condition

```ts
head < queue.length;
```

Meaning:

```txt
at least one unprocessed real node still exists
```

### BFS inner-loop condition

```ts
processed < levelSize;
```

Growing `queue.length` ko live bound mat banao.
Otherwise current nodes ke appended children same iteration me process ho jayenge,
aur multiple depths ek level me mix ho jayengi.

---

## 9. Adjustment Logic

### Recursive: `+1` kahan aur kyun?

Children sirf apni subtrees count karte hain.
Current frame apne current real node ki responsibility leti hai:

```txt
child contribution + current node
max(leftDepth, rightDepth) + 1
```

`+1` forget karenge to leaf `0` return karegi aur complete answer one short hoga.

### BFS: depth kab badhegi?

Wrong timing:

```txt
har node consume hote hi depth++
```

Wide level me multiple nodes hain,
but woh depth ko multiple times increase nahi karte.

Correct timing:

```txt
exactly levelSize nodes complete
then depth++ once
```

### BFS: children ka order

Left child first, right child second enqueue karna standard left-to-right BFS order
preserve karta hai.

Maximum-depth answer sirf level count hai,
so reversing sibling order numerical answer ko change nahi karega.
Phir bhi left-first consistent tree traversal mental model rakhta hai.

Ye difference yaad rakho:

```txt
frozen level boundary -> correctness constraint
left before right      -> traversal-order convention for this scalar answer
```

### `shift()` kyun avoid kar rahe hain?

JavaScript array ka first item remove karne par remaining indices reindex ho sakte hain.
Repeated `shift()` unnecessary extra work create kar sakta hai.

Moving head:

```txt
current = queue[head]
head++
```

Front item physically remove kiye bina constant-time indexed consumption deta hai.

---

## 10. Answer Formula And Implementations

Ab concrete simulation se formula naturally emerge hota hai:

```txt
DEPTH(null) = 0

DEPTH(node)
= 1 + max(DEPTH(node.left), DEPTH(node.right))
```

### Recursive DFS

```ts
function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}
```

### Iterative BFS

```ts
function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  const queue: TreeNode[] = [root];
  let head = 0;
  let depth = 0;

  while (head < queue.length) {
    const levelSize = queue.length - head;

    for (let processed = 0; processed < levelSize; processed++) {
      const current = queue[head++];

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    depth++;
  }

  return depth;
}
```

---

## 11. Full Dry Run

Input representation:

```txt
[3, 9, 20, null, null, 15, 7]
```

Actual tree:

```txt
        3
       / \
      9  20
         / \
        15  7
```

### Recursive return flow

| Step | Active calculation                      | Returned depth | Why                       |
| ---: | --------------------------------------- | -------------: | ------------------------- |
|    1 | `maxDepth(9.left=null)`                 |              0 | empty branch              |
|    2 | `maxDepth(9.right=null)`                |              0 | empty branch              |
|    3 | `maxDepth(9)`                           |              1 | `1 + max(0,0)`            |
|    4 | `maxDepth(15)` after both null children |              1 | leaf counts itself        |
|    5 | `maxDepth(7)` after both null children  |              1 | leaf counts itself        |
|    6 | `maxDepth(20)`                          |              2 | `1 + max(1,1)`            |
|    7 | `maxDepth(3)`                           |              3 | `1 + max(left=1,right=2)` |

Notice execution direction:

```txt
calls root se leaves ki taraf jaati hain
answers leaves se root ki taraf return hote hain
```

### Iterative BFS queue flow

Queue notation:

```txt
[already processed | pending]
```

| Outer iteration | Pending at start | Frozen `levelSize` | Nodes consumed | Children appended | Depth after level |
| --------------: | ---------------- | -----------------: | -------------- | ----------------- | ----------------: |
|               1 | `[3]`            |                  1 | `3`            | `9, 20`           |                 1 |
|               2 | `[9,20]`         |                  2 | `9, 20`        | `15, 7`           |                 2 |
|               3 | `[15,7]`         |                  2 | `15, 7`        | none              |                 3 |

Final queue/head state:

```txt
queue = [3,9,20,15,7]
head = 5
queue.length = 5
```

No pending node remains,
so loop ends and answer `3` return hota hai.

### Example 2: null placeholder ko skip mat karo

```txt
input = [1, null, 2]
```

Construction:

| Parent | Left slot | Right slot | Result           |
| ------ | --------- | ---------- | ---------------- |
| `1`    | `null`    | `2`        | only right child |

Tree:

```txt
1
 \
  2
```

```txt
DFS: node 2 returns 1; node 1 returns 1 + max(0,1) = 2
BFS: level [1] then level [2] -> 2 completed levels
```

---

## 12. Quick Reference

Definition:

```txt
maximum depth = root-to-farthest-leaf path ki node count
```

Base values:

```txt
empty tree = 0
leaf       = 1
```

Recursive memory line:

```txt
children se depths lo,
deeper child choose karo,
current node ka 1 add karo
```

BFS memory line:

```txt
current pending level ki size freeze karo,
exactly utne nodes process karo,
completed level ke baad depth ek baar badhao
```

Complexity:

| Approach      | Time |                                     Auxiliary space | Practical note                            |
| ------------- | ---: | --------------------------------------------------: | ----------------------------------------- |
| Recursive DFS | O(n) |                                     O(h) call stack | simplest; deep skew can overflow JS stack |
| Iterative BFS | O(n) | O(n) concrete retained queue, logical frontier O(w) | stack-safe for 10^4-deep skew             |

Common mistakes:

| Mistake                              | Problem                                               |
| ------------------------------------ | ----------------------------------------------------- |
| `null` depth `1` return karna        | empty tree/leaf answer one extra ho jayega            |
| `Math.min(left,right)`               | minimum depth calculate hogi                          |
| `leftDepth + rightDepth`             | two branches join hongi; one root-to-leaf path nahi   |
| current node ka `+1` bhoolna         | every answer one short hoga                           |
| BFS me per node `depth++`            | wide level ko multiple depths count karega            |
| growing `queue.length` inner bound   | current aur next levels mix honge                     |
| `levelSize = queue.length` with head | processed prefix bhi current-level count me aa jayega |
| `null` children enqueue karna        | phantom work/levels create ho sakte hain              |
| node values se depth infer karna     | depth sirf structure par depend karti hai             |

Approach choice:

```txt
clarity and interview recurrence -> Recursive DFS
very deep JavaScript tree         -> Iterative BFS
```

Final formula:

```txt
maxDepth(node) = node === null
  ? 0
  : 1 + max(maxDepth(node.left), maxDepth(node.right))
```
