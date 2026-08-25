# Balanced Binary Tree - Notes

## Prerequisites / Setup

Is problem ka direct prerequisite Maximum Depth of Binary Tree hai.

Height convention:

```txt
height(null) = 0
height(leaf) = 1
height(node) = 1 + deeper child height
```

Aur ye basic ideas helpful hain:

- binary-tree node ke `left` aur `right` references
- recursive base case aur return flow
- postorder: children ka answer parent se pehle ready hota hai
- level-order array se actual tree construction

---

## 1. Problem Samjho

Tree **height-balanced** tab hai jab every real node par:

```txt
|left subtree height - right subtree height| <= 1
```

Three local possibilities:

| Height difference | Current node status |
| ----------------: | ------------------- |
|                 0 | balanced            |
|                 1 | balanced            |
|         2 or more | unbalanced          |

Important word:

```txt
EVERY NODE
```

Sirf root ka left/right difference check karna enough nahi.
Kisi bhi deeper node ka violation complete tree ko unbalanced bana deta hai.

### Balanced example

```txt
        3
       / \
      9  20
         / \
        15  7
```

Bottom-up heights:

| Node | Left height | Right height | Difference | Status   | Returned height |
| ---: | ----------: | -----------: | ---------: | -------- | --------------: |
|    9 |           0 |            0 |          0 | balanced |               1 |
|   15 |           0 |            0 |          0 | balanced |               1 |
|    7 |           0 |            0 |          0 | balanced |               1 |
|   20 |           1 |            1 |          0 | balanced |               2 |
|    3 |           1 |            2 |          1 | balanced |               3 |

Every row valid hai,
so final answer `true`.

### Unbalanced example

```txt
          1
         / \
        2   2
       / \
      3   3
     / \
    4   4
```

Root `1`:

```txt
left height  = 3
right height = 1
difference   = 2
```

Root rule fail karta hai,
so answer `false`.

### Input array actual parameter nahi hai

LeetCode representation:

```txt
[3, 9, 20, null, null, 15, 7]
```

Test helper queue se real `TreeNode` objects banata hai:

| Real parent | Left slot | Right slot | Real children added |
| ----------- | --------- | ---------- | ------------------- |
| `3`         | `9`       | `20`       | `9`, `20`           |
| `9`         | `null`    | `null`     | none                |
| `20`        | `15`      | `7`        | `15`, `7`           |

Rules:

```txt
queue me sirf real parents
left slot first, right slot second
null means no node and no enqueue
```

Algorithm ko array nahi,
actual `TreeNode | null` root milta hai.

---

## 2. Brute Force: Har Node Par Height Dobara Nikalo

First direct approach:

```txt
current node ke left subtree ki height nikalo
current node ke right subtree ki height nikalo
difference validate karo
left child par same balance check karo
right child par same balance check karo
```

Correctness issue nahi hai.
Problem repeated work hai.

Example subtree:

```txt
      2
     /
    4
   /
  6
```

Root ke balance check ke liye `maxDepth(2)` nodes `2,4,6` traverse kar sakta hai.
Later node `2` ko independently validate karte waqt `maxDepth(4)` nodes `4,6` ko
again traverse karega.

```txt
same descendants
different ancestor checks
fresh height traversal every time
```

Worst-case repeated work:

```txt
n + (n-1) + (n-2) + ...
= O(n²)
```

Ek production variant boolean checks short-circuit kar sakta hai.
Is lesson ka brute-force baseline intentionally every node validate karta hai,
isliye skewed tree par ye exact repeated sum aur `O(n²)` behavior visible hai.

---

## 3. Key Insight

Brute force ek subtree se two related facts separately pooch rahi thi:

```txt
height kya hai?
balanced hai ya nahi?
```

But current node ko balance validate karne ke liye child height already chahiye.
Same postorder traversal me dono facts combine kiye ja sakte hain.

Har subtree parent ko one report bheje:

```txt
0 or positive number -> subtree balanced; number exact height hai
-1                   -> subtree unbalanced; height use mat karo
```

Why `-1`?

```txt
node-count height valid state me always >= 0 hoti hai
```

Therefore `-1` valid height se collide nahi kar sakta.

Parent logic:

```txt
left report invalid?  -> -1 propagate
right report invalid? -> -1 propagate
height difference >1? -> current node creates -1
otherwise             -> current valid height return
```

One visit me current node ki height aur balance dono decide ho jaate hain.

---

## 4. Why This Technique Works

Helper ka exact promise:

```txt
heightOrUnbalanced(node) returns:

exact height >= 0 -> node ki entire subtree balanced hai
-1                -> subtree me at least one violating node hai
```

### Base case

```txt
node = null
```

Empty subtree me violating node nahi hai,
aur node-count height `0` hai.
So helper promise correct value `0` return karta hai.

### Child already unbalanced

If left ya right report `-1` hai,
us child subtree ke andar violation already prove ho chuki hai.

Current node ka local difference chahe jo ho:

```txt
complete current subtree balanced nahi ho sakti
```

So `-1` propagate karna correct hai.

### Both child reports valid heights

Ab hume two facts guaranteed hain:

```txt
left subtree internally balanced
right subtree internally balanced
```

Only current node ka rule remaining hai.

If difference greater than `1`:

```txt
current node violation -> return -1
```

Otherwise:

```txt
both descendants valid
current node valid
complete current subtree balanced
```

Then exact current height:

```txt
1 + max(leftHeight, rightHeight)
```

Root par non-negative report exactly tab milti hai jab complete tree ka every node
valid ho.

### Root-only proof kyun insufficient hai?

Counterexample:

```txt
          1
         / \
        2   3
       /     \
      4       5
     /         \
    6           7
```

Root child heights both `3`:

```txt
root difference=0
```

But node `2`:

```txt
left height=2
right height=0
difference=2
```

Only postorder child reports guarantee karte hain ki descendants bhi validated hain.

---

## 5. Variables

### Brute force

| Variable      | Real meaning                                             |
| ------------- | -------------------------------------------------------- |
| `root`        | current node jise locally aur recursively validate karna |
| `leftHeight`  | fresh traversal se current left subtree ki height        |
| `rightHeight` | fresh traversal se current right subtree ki height       |

Brute force height ke saath balance status return nahi karti,
so separate `isBalanced` recursion required hoti hai.

### Optimal

| Variable / value | Real meaning                                 |
| ---------------- | -------------------------------------------- |
| `node`           | current postorder frame ka subtree root      |
| `leftHeight`     | valid left height or `-1` unbalanced status  |
| `rightHeight`    | valid right height or `-1` unbalanced status |
| `UNBALANCED`     | named `-1` sentinel; actual height nahi      |

Same `number` return type me two states hain:

```txt
non-negative -> height payload
negative     -> failure status
```

Node ka `val = -1` ho sakta hai,
but collision nahi hota:

```txt
TreeNode.val - data value
helper return - height/status
```

Dono different concepts hain.

---

## 6. Mental Model

### Subtree report card

Har child parent ko report card bhejti hai.

Green report:

```txt
BALANCED
height = 2
```

Red report:

```txt
UNBALANCED
sentinel = -1
```

Parent green child reports ko combine kar sakta hai.
Red report milte hi calculation stop:

```txt
ek failed descendant ko ancestor repair nahi kar sakta
```

### Height bubble plus failure alarm

Maximum Depth me only height bubbles upward ja rahi thi:

```txt
leaf -> 1
parent -> 2
root -> 3
```

Balanced Tree me bubble two forms le sakti hai:

```txt
valid height bubble
or
failure alarm -1
```

```txt
           root
          /    \
   height 2    -1 alarm
                 ↑
          ancestor also returns -1
```

### Postorder kyun natural hai?

Current node ka difference tab tak calculate nahi ho sakta
when child heights unknown hain.

```txt
LEFT report
RIGHT report
CURRENT combine/check
```

Ye postorder dependency hai,
even though hum node values traversal output me collect nahi kar rahe.

### Balanced ka matlab kya nahi hai?

| Term      | Requirement                                                |
| --------- | ---------------------------------------------------------- |
| balanced  | every node par child-height difference at most `1`         |
| complete  | levels left-to-right filling rule follow karte hain        |
| perfect   | every internal node has two children and leaves same level |
| symmetric | left/right mirror structure                                |

Tree balanced ho sakti hai without being perfect or symmetric.

---

## 7. Boundary Cases

| Case                      | Input / shape                               | Result  | Why                                              |
| ------------------------- | ------------------------------------------- | ------- | ------------------------------------------------ |
| empty tree                | `[]`                                        | `true`  | koi violating node nahi                          |
| single node               | `[1]`                                       | `true`  | child heights `0,0`                              |
| one child                 | `[1,null,2]`                                | `true`  | root difference exactly `1`                      |
| chain of three            | `[1,2,null,3]`                              | `false` | root difference `2`                              |
| perfect tree              | `[1,2,3,4,5,6,7]`                           | `true`  | every node par equal child heights               |
| root valid, child invalid | equal root heights but internal chain       | `false` | every node rule required                         |
| duplicate values          | `[2,2,2]`                                   | `true`  | values structure ko change nahi karti            |
| value extremes            | `[-10000,-10000,10000]`                     | `true`  | balance values se independent                    |
| 5000-node complete tree   | shallow complete level-order representation | `true`  | maximum `n`, but recursion depth only about `13` |

### Very deep skewed tree

`5000` nodes ka chain recursive call stack ko `O(5000)` deep bana sakta hai.

```txt
algorithm correct
runtime stack capacity environment-dependent
```

Isliye tests full node-count constraint ko shallow complete tree se cover karte hain.
Portable worst-skew handling ke liye explicit iterative postorder stack use ki ja sakti
hai.

---

## 8. Conditions

### Empty subtree

```txt
node is null -> return 0
```

Empty tree balanced hai aur height zero hai.

### Child sentinel

```txt
left report is -1 -> return -1
right report is -1 -> return -1
```

Child status ko difference ya `max` calculation me use nahi karna.
Woh height nahi hai.

### Current-node failure

```txt
absolute(leftHeight - rightHeight) > 1
```

Why strictly `> 1`?

```txt
difference 1 allowed hai
```

Common wrong check:

```txt
difference >= 1 -> false
```

Ye valid one-level difference ko reject kar dega.

### Current valid height

Only after:

```txt
left report valid
right report valid
current difference <= 1
```

Then:

```txt
return 1 + larger child height
```

### Final boolean

```txt
root report is -1     -> false
root report is >= 0   -> true
```

Empty root report `0` hai,
so empty tree naturally `true` banti hai.

---

## 9. Adjustment Logic

### Left sentinel ke baad right call kyun skip?

If left subtree unbalanced hai,
complete current subtree already unbalanced hai.

```txt
right result final false ko change nahi kar sakta
```

So early return unnecessary right traversal avoid karta hai.

### Sentinel ko normal height kyun nahi bana sakte?

Wrong conceptual flow:

```txt
left = -1
right = 2
return 1 + max(-1,2) = 3
```

Ye failure signal ko accidentally valid height me convert kar dega.
Isliye child sentinel checks `Math.max` se before mandatory hain.

### Separate leaf condition required nahi

Leaf ke both children null:

```txt
leftHeight=0
rightHeight=0
difference=0
return 1
```

General logic leaf ko automatically handle karti hai.

### Node-count vs edge-count height

Alternative textbook convention:

```txt
empty height=-1
leaf height=0
```

Balance result same rahega because both child heights same constant shift se change
hoti hain; difference unchanged rahta hai.

But important sentinel issue:

```txt
edge convention me -1 legitimate empty height hai
```

Then `-1` ko unbalanced status bhi use nahi kar sakte.
Different sentinel ya `{height, balanced}` object required hoga.

Hum Maximum Depth ka node-count convention use kar rahe hain:

```txt
empty=0, leaf=1
```

Isliye `-1` safely reserved hai.

### Brute-force baseline intentionally exhaustive hai

Lesson baseline every node ka result independently calculate karti hai:

```txt
currentBalanced
leftBalanced
rightBalanced
combine all three
```

Production brute-force version false milte hi short-circuit kar sakti hai.
Yahan exhaustive evaluation repeated height work ko clearly expose karti hai;
optimal version meaningful early exit ko `-1` report me integrate karti hai.

---

## 10. Answer Formula And Implementations

### Brute force

```ts
function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function isBalanced(root: TreeNode | null): boolean {
  if (root === null) {
    return true;
  }

  const leftHeight = maxDepth(root.left);
  const rightHeight = maxDepth(root.right);

  const currentBalanced = Math.abs(leftHeight - rightHeight) <= 1;
  const leftBalanced = isBalanced(root.left);
  const rightBalanced = isBalanced(root.right);

  return currentBalanced && leftBalanced && rightBalanced;
}
```

### Optimal one-pass DFS

```ts
const UNBALANCED = -1;

function heightOrUnbalanced(node: TreeNode | null): number {
  if (node === null) {
    return 0;
  }

  const leftHeight = heightOrUnbalanced(node.left);

  if (leftHeight === UNBALANCED) {
    return UNBALANCED;
  }

  const rightHeight = heightOrUnbalanced(node.right);

  if (rightHeight === UNBALANCED) {
    return UNBALANCED;
  }

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return UNBALANCED;
  }

  return 1 + Math.max(leftHeight, rightHeight);
}

function isBalanced(root: TreeNode | null): boolean {
  return heightOrUnbalanced(root) !== UNBALANCED;
}
```

---

## 11. Full Dry Run

### Array construction for unbalanced example

Input:

```txt
[1, 2, 2, 3, 3, null, null, 4, 4]
```

| Parent consumed | Left slot | Right slot | Queue gets |
| --------------- | --------- | ---------- | ---------- |
| `1`             | `2`       | `2`        | `2,2`      |
| first `2`       | `3`       | `3`        | `3,3`      |
| second `2`      | `null`    | `null`     | none       |
| first `3`       | `4`       | `4`        | `4,4`      |

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

### Optimal return-flow table

| Return step | Node / branch       | Left report | Right report | Difference | Returned report |
| ----------: | ------------------- | ----------: | -----------: | ---------: | --------------: |
|           1 | each `null`         |           - |            - |          - |               0 |
|           2 | left leaf `4`       |           0 |            0 |          0 |               1 |
|           3 | right leaf `4`      |           0 |            0 |          0 |               1 |
|           4 | lower-left node `3` |           1 |            1 |          0 |               2 |
|           5 | sibling node `3`    |           0 |            0 |          0 |               1 |
|           6 | left node `2`       |           2 |            1 |          1 |               3 |
|           7 | right leaf node `2` |           0 |            0 |          0 |               1 |
|           8 | root `1`            |           3 |            1 |          2 |            `-1` |

Root report `-1`,
so final boolean `false`.

### Brute-force repeated work

Use root-locally-balanced but internally-unbalanced tree:

```txt
          1
         / \
        2   3
       /     \
      4       5
     /         \
    6           7
```

| Balance call    | Fresh height traversals                   | Local difference | Next action               |
| --------------- | ----------------------------------------- | ---------------: | ------------------------- |
| `isBalanced(1)` | left visits `2,4,6`; right visits `3,5,7` |                0 | validate both children    |
| `isBalanced(2)` | left visits `4,6` again; right is null    |                2 | still validate children   |
| `isBalanced(3)` | left is null; right visits `5,7` again    |                2 | still validate children   |
| back at root    | current true; both child results false    |                - | combine to return `false` |

Nodes `4` and `6` repeated height work demonstrate karte hain.

### Optimal early propagation on same tree

| Step | Event                                                       | Report |
| ---: | ----------------------------------------------------------- | -----: |
|    1 | node `6` valid leaf                                         |      1 |
|    2 | node `4`: left `1`, right `0`, difference `1`               |      2 |
|    3 | node `2`: left `2`, right `0`, difference `2`               |   `-1` |
|    4 | root receives left `-1`; right subtree calculate nahi karti |   `-1` |

Each visited node ka height/balance one time decide hua.

### Difference exactly one

```txt
      1
     / \
    2   3
   /
  4
```

| Node | Left height | Right height | Difference | Status   |
| ---: | ----------: | -----------: | ---------: | -------- |
|    2 |           1 |            0 |          1 | balanced |
|    1 |           2 |            1 |          1 | balanced |

`1` allowed hai,
so final answer `true`.

---

## 12. Quick Reference

Definition:

```txt
every node par |leftHeight - rightHeight| <= 1
```

Brute-force memory line:

```txt
height separately nikalo,
current node validate karo,
children ko recursively validate karo
```

Optimal memory line:

```txt
valid subtree height bhejti hai,
invalid subtree -1 alarm bhejti hai,
alarm ko immediately root tak propagate karo
```

Complexity:

| Approach    | Worst time | Auxiliary space | Main reason                               |
| ----------- | ---------: | --------------: | ----------------------------------------- |
| Brute force |      O(n²) |            O(h) | repeated height traversals                |
| Optimal DFS |       O(n) |            O(h) | height and balance in same postorder pass |

Common mistakes:

| Mistake                                          | Problem                                                   |
| ------------------------------------------------ | --------------------------------------------------------- |
| only root difference check karna                 | internal violation miss ho sakti hai                      |
| left/right heights equal require karna           | difference `1` bhi valid hai                              |
| failure check `>= 1` use karna                   | valid difference `1` reject ho jayegi                     |
| child `-1` ko `Math.max` me use karna            | failure signal valid height me convert ho sakta hai       |
| left `-1` ke baad bhi right recurse karna        | final result fixed hone ke baad unnecessary work          |
| only boolean return karke height again calculate | one-pass optimization lose ho jaati hai                   |
| recursion space always `O(log n)` claim karna    | skewed tree me `h=n`, so stack `O(n)`                     |
| node value `-1` ko sentinel se confuse karna     | data value aur returned height/status different concepts  |
| level-order array ko direct tree input samajhna  | null positions aur parent assignments wrong ho sakte hain |

Approach choice:

```txt
optimization derive karna -> brute force first
interview implementation  -> optimal one-pass DFS
very deep JS tree          -> iterative postorder alternative
```

Final optimal contract:

```txt
heightOrUnbalanced(node)

returns exact height, if entire subtree balanced
returns -1, if any node in subtree unbalanced
```
