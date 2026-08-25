# Tree Data Structure — Beginner-Friendly JavaScript Notes

> **Starting point:** You already know linear structures such as arrays, linked lists, stacks, and queues. A tree is your first major **non-linear** structure.
>
> These notes use Chapter 8, **Trees**, from *Data Structures and Algorithms in Java, 6th Edition* as the conceptual base. The code has been rewritten in JavaScript, and several beginner explanations and JavaScript-specific implementation notes have been added.

---

## 1. The main idea

A tree stores values in a **hierarchy**.

In an array, values are arranged one after another:

```text
10 → 20 → 30 → 40
```

There is one straight route through the values.

In a tree, one value can lead to several other values:

```text
                 A
              /  |  \
             B   C   D
                / \
               E   F
```

From `A`, the structure branches toward `B`, `C`, and `D`. That branching is why a tree is called **non-linear**.

### Simple definition

A **tree** is a collection of connected nodes arranged from top to bottom.

- The top node is the **root**.
- Every other node has exactly one parent.
- A node may have zero or more children.
- There is only one route from the root to any particular node.

### Real examples

Trees appear wherever information has levels:

- folders and files;
- HTML DOM elements;
- company departments;
- comments and replies;
- categories and subcategories;
- family relationships;
- menus and nested navigation;
- decisions in a game or questionnaire.

A tree is not automatically a search tree. It is first of all a way to represent **parent-child relationships**.

---

## 2. Why trees are useful

Suppose a website has this navigation:

```text
Home
Products
    Laptops
    Phones
        Android
        iPhone
Support
```

A flat array can store these labels, but the array alone does not clearly show which item belongs under which section.

A tree preserves the relationships:

```text
Website
├── Home
├── Products
│   ├── Laptops
│   └── Phones
│       ├── Android
│       └── iPhone
└── Support
```

The benefit is not merely storing values. The benefit is storing **how the values are related**.

---

## 3. Anatomy of a tree

Use this tree for the terminology below:

```text
                    A
                 /  |  \
                B   C   D
                   / \
                  E   F
                     / \
                    G   H
```

### 3.1 Node

Each box or value in the tree is a **node**.

The nodes above are `A, B, C, D, E, F, G, H`.

A node normally stores:

1. some value;
2. references to its children;
3. optionally, a reference to its parent.

### 3.2 Edge

A line connecting a parent and child is an **edge**.

Examples:

```text
A — B
A — C
C — F
F — G
```

If a tree has `n` nodes, it has `n - 1` edges.

Why? Every node except the root has exactly one connection coming from its parent.

### 3.3 Root

The topmost node is the **root**.

In the example:

```text
Root = A
```

The root has no parent.

A tree has only one root. An empty tree has no root.

### 3.4 Parent and child

If one node is directly above another node:

- the upper node is the **parent**;
- the lower node is the **child**.

Examples:

- `A` is the parent of `B`, `C`, and `D`.
- `B`, `C`, and `D` are children of `A`.
- `F` is the parent of `G` and `H`.

The word **directly** matters. `A` is related to `G`, but `A` is not the direct parent of `G`.

### 3.5 Siblings

Nodes with the same parent are **siblings**.

Examples:

- `B`, `C`, and `D` are siblings.
- `E` and `F` are siblings.
- `G` and `H` are siblings.

### 3.6 Leaf node

A node with no children is a **leaf**.

The book also calls it an **external node**.

In the example:

```text
Leaves = B, D, E, G, H
```

A leaf is not “a node at the bottom of the drawing.” It is any node with zero children.

### 3.7 Internal node

A node with at least one child is an **internal node**.

In the example:

```text
Internal nodes = A, C, F
```

### 3.8 Ancestor

An **ancestor** is a node found above another node on the route toward the root.

Ancestors of `G` are:

```text
F, C, A
```

Some formal definitions also include the node itself. In normal explanation, it is often clearer to say **proper ancestors** when excluding the node itself.

### 3.9 Descendant

A **descendant** is a node found below another node.

Descendants of `C` are:

```text
E, F, G, H
```

### 3.10 Subtree

Pick any node and include that node plus everything below it. The result is a **subtree**.

The subtree rooted at `F` is:

```text
          F
         / \
        G   H
```

This idea is extremely important because recursive tree algorithms treat every child branch as a smaller tree.

### 3.11 Path

A **path** is a sequence of connected nodes.

The path from `A` to `H` is:

```text
A → C → F → H
```

Its length is normally counted by edges, not nodes.

This path contains:

- four nodes;
- three edges;
- path length `3`.

### 3.12 Number of children

The number of direct children of a node is sometimes called its **degree**.

To avoid unnecessary terminology, simply ask:

> How many children does this node have?

Examples:

```text
A has 3 children.
C has 2 children.
F has 2 children.
B has 0 children.
```

---

## 4. Depth, level, and height

These words are easy to mix up. Keep one direction in mind:

```text
Depth:  root → node
Height: node → deepest leaf
```

Use the same tree:

```text
                    A
                 /  |  \
                B   C   D
                   / \
                  E   F
                     / \
                    G   H
```

### 4.1 Depth of a node

The **depth** of a node is the number of edges from the root to that node.

```text
Depth of A = 0
Depth of B = 1
Depth of C = 1
Depth of F = 2
Depth of G = 3
```

The root always has depth `0`.

A recursive definition is:

```text
depth(root) = 0
depth(node) = 1 + depth(node's parent)
```

### 4.2 Level

Nodes with the same depth are on the same **level**.

```text
Level 0: A
Level 1: B, C, D
Level 2: E, F
Level 3: G, H
```

Many tutorials use `level` and `depth` in the same way. Some sources count the root as level `1`. Always check the convention being used.

In these notes:

```text
root depth = 0
root level = 0
```

### 4.3 Height of a node

The **height** of a node is the number of edges on the longest downward path from that node to a leaf.

```text
Height of G = 0
Height of H = 0
Height of F = 1
Height of C = 2
Height of A = 3
```

Every leaf has height `0`.

A recursive definition is:

```text
height(leaf) = 0
height(node) = 1 + maximum height among its children
```

### 4.4 Height of the entire tree

The height of the tree is the height of its root.

It is also the greatest depth found in the tree.

For the example:

```text
Tree height = 3
Maximum node depth = 3
```

### Memory trick

```text
Depth asks: How far did I come down from the root?
Height asks: How far can I still go down?
```

---

## 5. General tree

A **general tree** allows a node to have any number of children.

```text
                A
            /   |   |   \
           B    C   D    E
               /|\
              F G H
```

`A` has four children. `C` has three children. This is valid in a general tree.

### JavaScript node for a general tree

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}
```

Create a small tree:

```js
const root = new TreeNode("A");
const nodeB = new TreeNode("B");
const nodeC = new TreeNode("C");
const nodeD = new TreeNode("D");

root.addChild(nodeB);
root.addChild(nodeC);
root.addChild(nodeD);

nodeC.addChild(new TreeNode("E"));
nodeC.addChild(new TreeNode("F"));
```

The structure is:

```text
        A
      / | \
     B  C  D
       / \
      E   F
```

### What is actually stored?

The nodes are separate objects. The `children` array stores references to other node objects.

Conceptually:

```js
root.children === [nodeB, nodeC, nodeD];
```

The tree shape comes from those references.

---

## 6. Ordered and unordered trees

In an **ordered tree**, the position of children matters.

```text
Menu
├── Home
├── Products
└── Contact
```

Changing the order changes the menu users see.

In an **unordered tree**, sibling order has no built-in meaning.

For example, a company chart may care that several teams report to one manager but may not care whether Design is drawn before Engineering.

In JavaScript, `children` is an array, so the program naturally stores children in an order. Whether that order has meaning depends on the problem.

---

## 7. Binary tree

A **binary tree** is a special ordered tree where every node has at most two children.

Those children have separate roles:

```text
left child
right child
```

Example:

```text
          A
         / \
        B   C
       /   / \
      D   E   F
```

Every node has `0`, `1`, or `2` children.

### Three important rules

1. A node cannot have more than two children.
2. A child is identified as left or right.
3. Left and right are not interchangeable positions.

This is a valid binary tree:

```text
      A
       \
        B
```

`B` is specifically the right child of `A`.

This is a different binary tree:

```text
      A
     /
    B
```

The values are the same, but the structure is different.

### JavaScript node for a binary tree

```js
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

Create a tree:

```js
const root = new BinaryTreeNode("A");

root.left = new BinaryTreeNode("B");
root.right = new BinaryTreeNode("C");

root.left.left = new BinaryTreeNode("D");
root.right.left = new BinaryTreeNode("E");
root.right.right = new BinaryTreeNode("F");
```

Result:

```text
          A
         / \
        B   C
       /   / \
      D   E   F
```

### General tree vs binary tree

| Question | General tree | Binary tree |
|---|---|---|
| Maximum children | No fixed maximum | Two |
| Child storage | Usually an array | `left` and `right` |
| Does child position matter? | Depends on the tree | Yes |
| Can a node have three children? | Yes | No |

---

## 8. Common shapes of binary trees

These names describe the shape of a binary tree. They do not automatically describe how values are ordered.

### 8.1 Full or proper binary tree

Every node has either:

- zero children, or
- exactly two children.

```text
          A
         / \
        B   C
           / \
          D   E
```

This is full/proper.

This is not:

```text
          A
         /
        B
```

`A` has exactly one child.

> Naming warning: books and websites do not always use “full,” “complete,” and “perfect” consistently. The uploaded book uses **proper** and also notes **full** for the zero-or-two rule.

### 8.2 Perfect binary tree

Every internal node has two children, and every leaf is at the same depth.

```text
          A
        /   \
       B     C
      / \   / \
     D   E F   G
```

At height `h`, a perfect binary tree contains:

```text
2^(h + 1) - 1 nodes
```

For height `2`:

```text
2^(2 + 1) - 1 = 7 nodes
```

### 8.3 Complete binary tree

Every level is full except possibly the last level. Nodes on the last level are filled from left to right.

```text
          A
        /   \
       B     C
      / \   /
     D   E F
```

This shape is important for heaps because it can be stored efficiently in an array.

### 8.4 Balanced binary tree

A balanced tree avoids branches becoming dramatically deeper than the others.

```text
          A
        /   \
       B     C
      / \   / \
     D  E  F  G
```

“Balanced” can have a precise rule for a specific tree type. For now, understand the broad idea:

> The tree keeps its height relatively small compared with its number of nodes.

### 8.5 Skewed binary tree

Each node continues mainly in one direction.

```text
A
 \
  B
   \
    C
     \
      D
```

This is still a valid binary tree, but it behaves much like a linked list.

A skewed tree with `n` nodes can have height `n - 1`.

---

## 9. Binary tree is not the same as binary search tree

This distinction is essential.

### Binary tree

A binary tree only promises:

```text
Each node has at most two children.
```

Values can appear in any arrangement:

```text
          40
         /  \
       100   3
```

This is a valid binary tree.

### Binary search tree

A **binary search tree**, or BST, adds an ordering rule:

```text
values smaller than a node go left
values greater than a node go right
```

Example:

```text
          40
         /  \
       20    70
      / \    / \
     10 30  50 90
```

Every BST is a binary tree.

Not every binary tree is a BST.

```text
Binary tree = shape restriction
BST = shape restriction + value-ordering rule
```

Duplicate-value rules are a design decision. A BST implementation must clearly decide whether duplicates are rejected, counted, or consistently placed on one side.

---

## 10. Tree operations as ideas

The book describes a tree through operations such as:

```text
root()             get the root
parent(node)       get a node's parent
children(node)     get a node's children
numChildren(node)  count a node's children
isRoot(node)       check whether it is the root
isLeaf(node)       check whether it has no children
size()             count all nodes
isEmpty()          check whether the tree has no nodes
```

Java uses interfaces and position objects to define these operations formally. In JavaScript, you can begin with plain node objects and methods. The important part is the behavior, not copying Java’s class structure.

A simple wrapper could be:

```js
class Tree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  isEmpty() {
    return this.root === null;
  }
}
```

For a first implementation, do not over-engineer the class. Learn the structure and algorithms before building a large framework around it.

---

## 11. Recursion and trees

Trees fit recursion naturally because every subtree is itself a tree.

Suppose you are processing this tree:

```text
          A
         / \
        B   C
           / \
          D   E
```

You can think:

1. deal with `A`;
2. solve the smaller tree rooted at `B`;
3. solve the smaller tree rooted at `C`.

The smaller call follows exactly the same rules.

### Basic recursive pattern

```js
function processTree(node) {
  if (node === null) {
    return;
  }

  // Work before recursive calls, between them, or after them.

  processTree(node.left);
  processTree(node.right);
}
```

### Why the `null` check matters

A leaf has no left or right child:

```js
leaf.left === null;
leaf.right === null;
```

The recursive calls eventually receive `null`. That is where the function must stop.

This stopping condition is called the **base case**. In simple words:

> It is the condition that prevents recursion from continuing forever.

---

## 12. Tree traversal

A tree has no automatic “next item” like an array index. We must choose an order for visiting nodes.

Visiting every node is called **tree traversal**.

Use this binary tree:

```text
          A
         / \
        B   C
       / \   \
      D   E   F
```

There are four common orders.

### 12.1 Preorder

```text
Node → Left → Right
```

Result:

```text
A, B, D, E, C, F
```

JavaScript:

```js
function preorder(node, result = []) {
  if (node === null) {
    return result;
  }

  result.push(node.value);
  preorder(node.left, result);
  preorder(node.right, result);

  return result;
}
```

The current node is processed **before** its child subtrees.

Useful mental meaning:

> Process a parent before its contents.

### 12.2 Inorder

```text
Left → Node → Right
```

Result:

```text
D, B, E, A, C, F
```

JavaScript:

```js
function inorder(node, result = []) {
  if (node === null) {
    return result;
  }

  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);

  return result;
}
```

Inorder is specifically defined for a binary tree because it depends on separate left and right subtrees.

For a binary search tree, inorder returns values in sorted order.

### 12.3 Postorder

```text
Left → Right → Node
```

Result:

```text
D, E, B, F, C, A
```

JavaScript:

```js
function postorder(node, result = []) {
  if (node === null) {
    return result;
  }

  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.value);

  return result;
}
```

The current node is processed **after** its child subtrees.

Useful mental meaning:

> Finish the contents before finishing the parent.

### 12.4 Level-order or breadth-first traversal

Visit nodes one level at a time:

```text
A, B, C, D, E, F
```

This traversal uses a queue.

JavaScript implementation:

```js
function levelOrder(root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const queue = [root];
  let front = 0;

  while (front < queue.length) {
    const node = queue[front];
    front += 1;

    result.push(node.value);

    if (node.left !== null) {
      queue.push(node.left);
    }

    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return result;
}
```

Why use `front` instead of repeatedly calling `queue.shift()`?

`shift()` moves the remaining array items forward each time. A moving index avoids that repeated work.

### Traversal comparison

| Traversal | Order | Main idea |
|---|---|---|
| Preorder | Node, Left, Right | Parent first |
| Inorder | Left, Node, Right | Node between left and right |
| Postorder | Left, Right, Node | Parent last |
| Level-order | Level by level | Nearby depths first |

All four visit each node once, so their running time is:

```text
O(n)
```

Here, `n` is the number of nodes.

That simply means the work grows in direct proportion to the number of nodes visited.

---

## 13. Calculating tree height in JavaScript

For a binary tree:

```js
function getHeight(node) {
  if (node === null) {
    return -1;
  }

  const leftHeight = getHeight(node.left);
  const rightHeight = getHeight(node.right);

  return 1 + Math.max(leftHeight, rightHeight);
}
```

Why return `-1` for an empty subtree?

Because these notes count height by edges:

```text
empty subtree height = -1
leaf height = 1 + max(-1, -1) = 0
```

Example:

```text
      A
     / \
    B   C
```

`B` and `C` have height `0`, and `A` has height `1`.

### Alternative convention

Some code counts height by nodes instead of edges:

```js
function getHeightInNodes(node) {
  if (node === null) {
    return 0;
  }

  return 1 + Math.max(
    getHeightInNodes(node.left),
    getHeightInNodes(node.right)
  );
}
```

Then:

```text
empty tree height = 0
leaf height = 1
```

Neither convention is universally wrong. The problem statement must tell you which one it expects.

---

## 14. Counting nodes and leaves

### Count every node

```js
function countNodes(node) {
  if (node === null) {
    return 0;
  }

  return 1 + countNodes(node.left) + countNodes(node.right);
}
```

Meaning:

```text
1 for the current node
+ nodes in the left subtree
+ nodes in the right subtree
```

### Count leaves

```js
function countLeaves(node) {
  if (node === null) {
    return 0;
  }

  const isLeaf = node.left === null && node.right === null;

  if (isLeaf) {
    return 1;
  }

  return countLeaves(node.left) + countLeaves(node.right);
}
```

### Find whether a value exists in an ordinary binary tree

```js
function contains(node, target) {
  if (node === null) {
    return false;
  }

  if (node.value === target) {
    return true;
  }

  return contains(node.left, target) || contains(node.right, target);
}
```

Because an ordinary binary tree has no sorting rule, the value might be anywhere. In the worst case, every node must be checked.

---

## 15. Time and space costs

Do not memorize complexity without connecting it to the work being done.

### Traversing an ordinary tree

To visit every node:

```text
Time: O(n)
```

Every node is processed once.

### Searching an ordinary binary tree

Without an ordering rule:

```text
Worst-case time: O(n)
```

You may need to inspect all nodes.

### Recursive call memory

Recursive functions keep unfinished calls in memory.

The amount depends on tree height `h`:

```text
Extra call memory: O(h)
```

Balanced tree:

```text
h is roughly log n
```

Skewed tree:

```text
h can be n - 1
```

That is why tree shape matters.

### Breadth-first queue memory

Level-order traversal stores nodes waiting to be processed.

Its queue can grow as large as the widest level of the tree.

---

## 16. Useful binary-tree facts

For a binary tree:

### Maximum nodes at depth `d`

```text
2^d
```

Examples:

```text
Depth 0: at most 1 node
Depth 1: at most 2 nodes
Depth 2: at most 4 nodes
Depth 3: at most 8 nodes
```

### Maximum nodes in a tree of height `h`

```text
2^(h + 1) - 1
```

This maximum occurs when every level is completely full.

### Minimum nodes for height `h`

```text
h + 1
```

This occurs in a single chain:

```text
A
 \
  B
   \
    C
```

### Proper/full binary tree relationship

In a non-empty proper binary tree:

```text
number of leaves = number of internal nodes + 1
```

Example:

```text
          A          internal nodes: A, C = 2
         / \
        B   C         leaves: B, D, E = 3
           / \
          D   E
```

```text
3 = 2 + 1
```

Do not force these formulas into every beginner problem. First understand the tree shape; use formulas when the question asks about limits or counts.

---

## 17. Where Java and JavaScript differ

The uploaded book uses Java, so its implementations include:

- interfaces;
- abstract base classes;
- generic type parameters such as `<E>`;
- position objects;
- checked method structure;
- Java collections and iterators.

Those are Java design choices, not tree rules.

In JavaScript, a first tree can be represented with:

```js
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

The algorithmic ideas remain the same:

- nodes contain values;
- references connect nodes;
- recursive calls process subtrees;
- a queue supports level-order traversal;
- tree height affects performance.

Translate the **idea**, not the Java syntax line by line.

---

## 18. Common beginner mistakes

### Mistake 1: Treating every binary tree as a BST

Wrong assumption:

```text
left is always smaller and right is always larger
```

That is true only when the structure is specifically a binary search tree.

### Mistake 2: Counting nodes instead of edges for depth

For this path:

```text
A → C → F → H
```

There are four nodes but three edges.

Using the edge convention:

```text
Depth of H = 3
```

### Mistake 3: Thinking a leaf must be on the lowest level

A node is a leaf whenever it has no children, even when other branches continue deeper.

### Mistake 4: Forgetting that left and right are different

```text
A with left child B
```

is structurally different from:

```text
A with right child B
```

### Mistake 5: Missing the recursive stopping condition

Without this:

```js
if (node === null) return;
```

recursive traversal cannot safely stop at missing children.

### Mistake 6: Returning the wrong empty-tree height

Decide whether the problem counts:

- edges, or
- nodes.

Then keep the convention consistent.

### Mistake 7: Using `shift()` carelessly in large JavaScript queues

It works correctly, but a front index is usually a cleaner efficient approach for algorithm practice.

### Mistake 8: Memorizing traversal letters without tracing calls

Do not memorize only:

```text
NLR, LNR, LRN
```

Trace where the `result.push(node.value)` line occurs relative to the recursive calls.

---

## 19. One complete JavaScript example

```js
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const root = new BinaryTreeNode("A");
root.left = new BinaryTreeNode("B");
root.right = new BinaryTreeNode("C");
root.left.left = new BinaryTreeNode("D");
root.left.right = new BinaryTreeNode("E");
root.right.right = new BinaryTreeNode("F");

function preorder(node, result = []) {
  if (node === null) return result;

  result.push(node.value);
  preorder(node.left, result);
  preorder(node.right, result);

  return result;
}

function inorder(node, result = []) {
  if (node === null) return result;

  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);

  return result;
}

function postorder(node, result = []) {
  if (node === null) return result;

  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.value);

  return result;
}

function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];
  let front = 0;

  while (front < queue.length) {
    const node = queue[front];
    front += 1;

    result.push(node.value);

    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  return result;
}

function getHeight(node) {
  if (node === null) return -1;

  return 1 + Math.max(
    getHeight(node.left),
    getHeight(node.right)
  );
}

function countNodes(node) {
  if (node === null) return 0;

  return 1 + countNodes(node.left) + countNodes(node.right);
}

console.log(preorder(root));
// ["A", "B", "D", "E", "C", "F"]

console.log(inorder(root));
// ["D", "B", "E", "A", "C", "F"]

console.log(postorder(root));
// ["D", "E", "B", "F", "C", "A"]

console.log(levelOrder(root));
// ["A", "B", "C", "D", "E", "F"]

console.log(getHeight(root));
// 2

console.log(countNodes(root));
// 6
```

Tree used:

```text
          A
         / \
        B   C
       / \   \
      D   E   F
```

---

## 20. How to trace recursive tree code

When confused, draw a call box for one node.

For preorder:

```js
function preorder(node) {
  if (node === null) return;

  visit(node);
  preorder(node.left);
  preorder(node.right);
}
```

At node `B`, translate it into plain language:

```text
1. Visit B.
2. Completely process B's left subtree.
3. Completely process B's right subtree.
4. Return to B's caller.
```

For inorder:

```text
1. Completely process B's left subtree.
2. Visit B.
3. Completely process B's right subtree.
4. Return.
```

For postorder:

```text
1. Completely process B's left subtree.
2. Completely process B's right subtree.
3. Visit B.
4. Return.
```

The code changes only the position of the visit step. That one placement changes the full output order.

---

## 21. Practice set

Use this tree:

```text
                10
               /  \
              5    18
             / \   /
            2   7 15
                 \
                  9
```

### Questions

1. What is the root?
2. What are the children of `5`?
3. What is the parent of `15`?
4. Which nodes are siblings?
5. Which nodes are leaves?
6. Which nodes are internal nodes?
7. What are the ancestors of `9`?
8. What is the depth of `9`?
9. What is the height of node `5`?
10. What is the height of the tree?
11. Is this a binary tree?
12. Is it a proper/full binary tree?
13. Is it a binary search tree?
14. Write its preorder result.
15. Write its inorder result.
16. Write its postorder result.
17. Write its level-order result.

### Answers

1. `10`
2. `2` and `7`
3. `18`
4. `5` and `18`; `2` and `7`
5. `2`, `9`, and `15`
6. `10`, `5`, `7`, and `18`
7. `7`, `5`, and `10`
8. `3`
9. `2`
10. `3`
11. Yes
12. No; nodes `7` and `18` each have only one child
13. Yes
14. `10, 5, 2, 7, 9, 18, 15`
15. `2, 5, 7, 9, 10, 15, 18`
16. `2, 9, 7, 5, 15, 18, 10`
17. `10, 5, 18, 2, 7, 15, 9`

---

## 22. Recommended learning order

Do not learn every named tree at once. Use this sequence:

### Stage 1 — Tree foundation

- hierarchy and non-linear structure;
- node relationships;
- depth and height;
- general tree vs binary tree;
- recursive thinking.

### Stage 2 — Traversal

- preorder;
- inorder;
- postorder;
- level-order;
- recursive and iterative tracing.

### Stage 3 — Binary search tree

- ordering rule;
- search;
- insertion;
- deletion;
- minimum and maximum;
- successor and predecessor;
- balanced vs skewed behavior.

### Stage 4 — Heap

- complete binary-tree shape;
- min-heap and max-heap rules;
- array representation;
- insert and remove;
- priority queue.

### Stage 5 — Balanced search trees

- why ordinary BSTs can become skewed;
- rotations;
- AVL trees;
- red-black trees.

### Stage 6 — Trees for special jobs

- trie for prefixes and words;
- expression tree;
- syntax tree;
- decision tree;
- B-tree for large storage systems.

Learn the reason for each tree before learning its implementation.

---

## 23. Final mental model

A tree is not mainly a drawing. It is a collection of node objects connected through references.

```text
Tree structure = values + parent-child connections
```

For every tree problem, ask these questions:

1. What does each node store?
2. How many children may a node have?
3. Does the order of children matter?
4. Is there a value-ordering rule?
5. What should happen at the current node?
6. In what order should child subtrees be processed?
7. What is the stopping condition?
8. How can tree height affect performance?

Once these are clear, the tree stops looking like a mysterious non-linear structure. It becomes a set of small, repeated parent-child decisions.

---

## Source basis

- Michael T. Goodrich, Roberto Tamassia, and Michael H. Goldwasser, *Data Structures and Algorithms in Java*, 6th Edition.
- Primary source sections used: Chapter 8 — General Trees, Tree Definitions and Properties, Computing Depth and Height, Binary Trees, Properties of Binary Trees, Implementing Trees, and Tree Traversal Algorithms.
- JavaScript code and JavaScript-specific queue guidance are adaptations written for these notes rather than copied Java implementations.
