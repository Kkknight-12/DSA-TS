# Depth First Search (DFS) - Gehrai mein Jaana 🌊

## Introduction

Hum **DFS (Depth First Search)** ko step-by-step samjhenge, simple language aur analogies use karke. Yeh ek graph/tree traversal algorithm hai jo programming interviews aur real-world applications mein bahut common hai.

## The Big Picture 🎯

DFS ka core concept iska naam mein hi hai: **Depth First**.

**Analogy - Bhool Bhulaiya (Maze):**

Imagine karo tum ek maze mein ho:
1. Tum ek raasta choose karte ho
2. Us raaste par chalte jaate ho **jab tak dead end na aa jaye**
3. Dead end par, tum **wapas** (backtrack) aate ho pichle junction tak
4. Wahan se **dusra unexplored raasta** try karte ho
5. Yeh process tab tak repeat hota hai jab tak **saare raaste explore nahi ho jaate**

```
Maze Example:
Entry → [Path 1] → [Path 1.1] → [Dead End] ❌
        ↓                          ↑
    Backtrack ←─────────────────────┘
        ↓
     [Path 1.2] → [Exit] ✓
```

**Yahi DFS hai!** Hum ek path ko **maximum depth** tak follow karte hain, phir backtrack karke dusre paths explore karte hain.

---

## Problem Statement

**Kya karna hai?**
- Ek graph ya tree ko traverse (visit) karna hai
- **Depth-wise** traverse karna hai (pehle gehrai mein jaao, breadth mein nahi)
- Har node ko exactly **ek baar** visit karna hai
- Cycles se bachna hai (infinite loops avoid karna)

**Input:**
- Graph (as Adjacency List)
- Starting node

**Output:**
- Order mein nodes jo visit hue (DFS traversal order)

**Example:**
```
Graph:
    1
   / \
  2   3
 / \
4   5

Adjacency List: { 1: [2, 3], 2: [4, 5], 3: [], 4: [], 5: [] }
Start: 1

Expected Output: [1, 2, 4, 5, 3]
(Pehle 1, phir left subtree [2,4,5], phir right subtree [3])
```

---

## Step 1: Naive Approach (Simple Thinking)

**Socho:** Agar humein sirf graph traverse karna hai, toh simplest kya hoga?

**Naive Idea:**
- Har node par jaao
- Uske neighbors check karo
- Neighbors ko bhi visit karo

**Problem kya hai?**
```
Graph with Cycle:
1 ↔ 2 ↔ 3
    ↕
    4

Without tracking:
Visit 1 → Visit 2 → Visit 1 → Visit 2 → Visit 1... (Infinite loop! 💥)
```

**The Problem with Naive Approach:**
1. **Cycles cause infinite loops** - Agar visited tracking nahi hai, toh same nodes baar-baar visit honge
2. **No order guarantee** - Kaunsa neighbor pehle? Random choice can give different results
3. **Redundant work** - Same node multiple paths se visit ho sakta hai

**Realization:** Humein chahiye:
- **Visited tracking** - Konsa node dekh chuke hain
- **Systematic exploration** - Clear order (depth-first)
- **Backtracking mechanism** - Explored path se wapas aana

---

## Step 2: The Challenge

**Multiple Challenges:**

### Challenge 1: Cycles
```
1 → 2
↑   ↓
4 ← 3

Without visited set: 1→2→3→4→1→2→3... (Infinite!)
```

### Challenge 2: Choice of Path
```
    1
   /|\
  2 3 4

Which neighbor first? 2, 3, ya 4?
DFS mein consistency chahiye!
```

### Challenge 3: Backtracking
```
    1
   / \
  2   3
 /
4

After visiting 4, how to come back to 2, then to 1, then to 3?
Need: Call Stack mechanism!
```

---

## Step 3: The "Aha!" Moment 💡

**The core idea:**

1. **Use Stack (LIFO)** - Last In, First Out
   - Recursive call stack (automatic) ya manual stack
   - Ensures depth-first exploration

2. **Track Visited Nodes** - Set ya boolean array
   - Prevents infinite loops
   - Ensures each node visited once

3. **Systematic Neighbor Exploration**
   - For each node, try ALL neighbors
   - Skip already visited neighbors
   - Recursion naturally handles backtracking

**Visual Transformation:**
```
Before (Naive):
Random exploration → Cycles → Confusion

After (DFS with Stack + Visited):
Start → Go Deep → Backtrack → Go Deep → ... → Complete! ✓
```

**Why This Works:**
- **Stack ensures depth-first:** Newest node gets explored first (LIFO)
- **Visited prevents cycles:** Once marked, never revisit
- **Recursion handles backtracking:** When function returns, automatically go back to caller

---

## Step 4: The Magic Tool - Stack & Visited Set

### Key Components:

**1. Visited Set/Array**
```typescript
const visited = new Set<number>();
// or
const visited = new Array(n).fill(false);
```
- **Purpose:** Track kaunse nodes explore ho chuke hain
- **Why needed:** Cycles aur duplicate visits avoid karne ke liye

**2. Stack (Implicit in Recursion)**
```typescript
function dfs(node) {
    // Current call on stack
    visited.add(node);

    for (neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            dfs(neighbor); // Adds new call to stack
        }
    }
    // Returns → pops from stack
}
```
- **Purpose:** Backtracking manage karna
- **LIFO property:** Ensures depth-first exploration

**3. Adjacency List**
```typescript
const graph = {
    1: [2, 3],
    2: [4, 5],
    ...
};
```
- **Purpose:** Graph representation
- **Why:** O(1) neighbor lookup

### The Optimization Formula:

**Time Complexity:**
```
T(n) = O(V + E)

Where:
- V = Number of vertices (nodes)
- E = Number of edges

Why?
- Visit each vertex once: O(V)
- Check each edge once: O(E)
- Total: O(V + E)
```

**Derivation:**
```
For each vertex v:
    Mark visited: O(1)
    Check all edges from v: O(degree(v))

Sum over all vertices:
    Σ O(1) + Σ O(degree(v))
    = O(V) + O(sum of all degrees)
    = O(V) + O(2E)    [Each edge counted twice in undirected graph]
    = O(V + E)
```

**Space Complexity:**
```
S(n) = O(V)

Why?
- Visited set: O(V)
- Recursion stack (worst case): O(V) for a linear chain
- Adjacency list: O(V + E) but that's input, not counted
```

---

## Step 5: Putting It All Together - Algorithm

### Recursive DFS Algorithm:

```typescript
function dfs(graph, startNode):
    visited = new Set()
    result = []

    function traverse(node):
        // Base case: Already visited
        if (visited.has(node)):
            return

        // Mark visited
        visited.add(node)
        result.push(node)

        // Explore neighbors
        for each neighbor in graph[node]:
            if (!visited.has(neighbor)):
                traverse(neighbor)  // Recursive call

        // Backtrack automatically when function returns

    traverse(startNode)
    return result
```

### Detailed Walkthrough:

**Example:** Graph = { 1: [2, 3], 2: [4, 5], 3: [], 4: [], 5: [] }

```
Step 1: Initialize
    visited = {}
    result = []
    Call traverse(1)

Step 2: Process Node 1
    visited = {1}
    result = [1]
    Neighbors: [2, 3]
    → Try neighbor 2 (not visited)
    → Call traverse(2)

Step 3: Process Node 2
    visited = {1, 2}
    result = [1, 2]
    Neighbors: [4, 5]
    → Try neighbor 4 (not visited)
    → Call traverse(4)

Step 4: Process Node 4
    visited = {1, 2, 4}
    result = [1, 2, 4]
    Neighbors: []
    → No neighbors
    → Return to traverse(2)

Step 5: Back to Node 2
    ┌─────────────────────────────────────────────┐
    │ CONTROL FLOW:                                │
    │ traverse(4) returned                         │
    │ We're in: for loop of traverse(2)           │
    │ Previous neighbor: 4 (processed)            │
    │ Next neighbor: 5                             │
    │ Loop continues...                            │
    └─────────────────────────────────────────────┘

    → Try neighbor 5 (not visited)
    → Call traverse(5)

Step 6: Process Node 5
    visited = {1, 2, 4, 5}
    result = [1, 2, 4, 5]
    Neighbors: []
    → Return to traverse(2)

Step 7: Back to Node 2 (Again)
    ┌─────────────────────────────────────────────┐
    │ CONTROL FLOW:                                │
    │ traverse(5) returned                         │
    │ for loop: all neighbors [4, 5] processed    │
    │ Loop ends                                    │
    │ → Return to traverse(1)                      │
    └─────────────────────────────────────────────┘

Step 8: Back to Node 1
    ┌─────────────────────────────────────────────┐
    │ CONTROL FLOW:                                │
    │ traverse(2) returned                         │
    │ We're in: for loop of traverse(1)           │
    │ Previous neighbor: 2 (processed)            │
    │ Next neighbor: 3                             │
    │ Loop continues...                            │
    └─────────────────────────────────────────────┘

    → Try neighbor 3 (not visited)
    → Call traverse(3)

Step 9: Process Node 3
    visited = {1, 2, 4, 5, 3}
    result = [1, 2, 4, 5, 3]
    Neighbors: []
    → Return to traverse(1)

Step 10: Back to Node 1 (Final)
    ┌─────────────────────────────────────────────┐
    │ CONTROL FLOW:                                │
    │ traverse(3) returned                         │
    │ for loop: all neighbors [2, 3] processed    │
    │ Loop ends                                    │
    │ → traverse(1) returns                        │
    │ → DFS complete!                              │
    └─────────────────────────────────────────────┘

Final Result: [1, 2, 4, 5, 3] ✓
```

### Call Stack Visualization:

```
traverse(1) called
  ├─ traverse(2) called
  │   ├─ traverse(4) called
  │   │   └─ traverse(4) returns (no neighbors)
  │   ├─ traverse(5) called
  │   │   └─ traverse(5) returns (no neighbors)
  │   └─ traverse(2) returns (all neighbors done)
  ├─ traverse(3) called
  │   └─ traverse(3) returns (no neighbors)
  └─ traverse(1) returns (all neighbors done)

Result: [1, 2, 4, 5, 3]
```

---

## Summary and Analogy 📚

### Maze Explorer vs. Floor-by-Floor Explorer

**Naive Approach (No Strategy):**
> Ek explorer jo randomly maze mein ghoomta hai, koi tracking nahi, baar-baar same rooms mein ja sakta hai, kabhi complete nahi kar paata.

**DFS (Depth First):**
> Smart explorer jo:
> - Ek raasta pakadta hai aur end tak jaata hai (depth-first)
> - Visited rooms ko mark karta hai (visited set)
> - Dead end par wapas aata hai (backtrack via stack)
> - Systematically har raasta explore karta hai
> - Guarantee: Saare connected rooms mil jayenge!

---

## Complexity Analysis ⏱️

### Time Complexity: **O(V + E)**

**Why?**
- **Visit each vertex once:** O(V)
  - Har node ko mark karte hain visited mein
  - Exactly ek baar process karte hain

- **Explore each edge once:** O(E)
  - Har edge ko adjacency list se check karte hain
  - Undirected graph mein har edge 2 baar (dono directions se)
  - Total: O(E)

**Total: O(V + E)**

**Example:**
```
Graph: 5 nodes, 4 edges
Time: O(5 + 4) = O(9) operations

Graph: 100 nodes, 200 edges
Time: O(100 + 200) = O(300) operations
```

### Space Complexity: **O(V)**

**Why?**
1. **Visited set:** O(V)
   - Har node ke liye ek entry

2. **Recursion stack (worst case):** O(V)
   - Linear chain: 1→2→3→...→V
   - Stack depth = V

3. **Result array:** O(V)
   - Sabhi nodes store karne ke liye

**Total: O(V)**

**In simple terms:**
```
Agar 1000 nodes hain:
- Visited set: 1000 entries
- Stack (worst): 1000 calls deep
- Memory: ~3000 units (still O(V))
```

### Comparison Table:

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Random Search** | O(∞) | O(V) | Can loop forever! |
| **BFS** | O(V + E) | O(V) | Uses queue, level-by-level |
| **DFS Recursive** | O(V + E) | O(V) | Clean code, stack depth limit |
| **DFS Iterative** | O(V + E) | O(V) | No recursion limit |

---

## When to Use DFS? 🎯

### Best Use Cases:

1. **Path Finding**
   ```
   Maze solving, puzzle solutions
   "Is there a path from A to B?"
   ```

2. **Cycle Detection**
   ```
   Detect loops in graph
   "Does this graph have a cycle?"
   ```

3. **Topological Sorting**
   ```
   Task scheduling with dependencies
   "In what order should tasks be done?"
   ```

4. **Connected Components**
   ```
   Find separate groups in network
   "How many disconnected parts?"
   ```

5. **Tree Traversals**
   ```
   In-order, Pre-order, Post-order
   All are DFS variants!
   ```

### When NOT to Use DFS:

❌ **Shortest Path (Unweighted)** → Use BFS
❌ **Level-order Traversal** → Use BFS
❌ **Minimum spanning tree** → Use Prim's/Kruskal's

---

## Complete Dry Run Table 📊

**Example:** Graph = { 1: [2, 3], 2: [4, 5], 3: [], 4: [], 5: [] }

| Step | Current Node | Action | Visited | Result | Stack State | Next Step |
|------|--------------|--------|---------|--------|-------------|-----------|
| 1 | 1 | Mark visited | {1} | [1] | [traverse(1)] | Explore neighbors [2,3] |
| 2 | 1 | Try neighbor 2 | {1} | [1] | [traverse(1)] | Call traverse(2) |
| 3 | 2 | Mark visited | {1,2} | [1,2] | [traverse(1), traverse(2)] | Explore neighbors [4,5] |
| 4 | 2 | Try neighbor 4 | {1,2} | [1,2] | [traverse(1), traverse(2)] | Call traverse(4) |
| 5 | 4 | Mark visited | {1,2,4} | [1,2,4] | [traverse(1), traverse(2), traverse(4)] | Check neighbors [] |
| 6 | 4 | No neighbors | {1,2,4} | [1,2,4] | [traverse(1), traverse(2), traverse(4)] | Return |
| 7 | 4 | **Backtrack** | {1,2,4} | [1,2,4] | [traverse(1), traverse(2)] ← popped | Back to node 2 |
| 8 | 2 | Try neighbor 5 | {1,2,4} | [1,2,4] | [traverse(1), traverse(2)] | Call traverse(5) |
| 9 | 5 | Mark visited | {1,2,4,5} | [1,2,4,5] | [traverse(1), traverse(2), traverse(5)] | Check neighbors [] |
| 10 | 5 | No neighbors | {1,2,4,5} | [1,2,4,5] | [traverse(1), traverse(2), traverse(5)] | Return |
| 11 | 5 | **Backtrack** | {1,2,4,5} | [1,2,4,5] | [traverse(1), traverse(2)] ← popped | Back to node 2 |
| 12 | 2 | All neighbors done | {1,2,4,5} | [1,2,4,5] | [traverse(1), traverse(2)] | Return |
| 13 | 2 | **Backtrack** | {1,2,4,5} | [1,2,4,5] | [traverse(1)] ← popped | Back to node 1 |
| 14 | 1 | Try neighbor 3 | {1,2,4,5} | [1,2,4,5] | [traverse(1)] | Call traverse(3) |
| 15 | 3 | Mark visited | {1,2,4,5,3} | [1,2,4,5,3] | [traverse(1), traverse(3)] | Check neighbors [] |
| 16 | 3 | No neighbors | {1,2,4,5,3} | [1,2,4,5,3] | [traverse(1), traverse(3)] | Return |
| 17 | 3 | **Backtrack** | {1,2,4,5,3} | [1,2,4,5,3] | [traverse(1)] ← popped | Back to node 1 |
| 18 | 1 | All neighbors done | {1,2,4,5,3} | [1,2,4,5,3] | [traverse(1)] | Return |
| 19 | 1 | **Complete!** | {1,2,4,5,3} | [1,2,4,5,3] | [] ← empty | DFS finished ✓ |

**Final Result:** [1, 2, 4, 5, 3]

**Path Visualization:**
```
1 (start)
├─→ 2 (left child)
│   ├─→ 4 (left child of 2) [dead end, backtrack]
│   └─→ 5 (right child of 2) [dead end, backtrack]
└─→ 3 (right child) [dead end, complete!]
```

---

## Interview Tips 💼

### What to Say to Interviewer:

> "I'll use DFS to explore the graph depth-first. I'll maintain a visited set to track explored nodes and use recursion for natural backtracking. This ensures we visit each node exactly once while avoiding cycles."

### Follow-up Questions & Answers:

**Q1: "Why DFS over BFS for this problem?"**

**A:**
```
DFS is better when:
✓ We need to explore all paths (backtracking problems)
✓ Memory is limited (BFS uses more space for wide graphs)
✓ Solution is likely to be deep in the tree

BFS is better when:
✓ We need shortest path (unweighted)
✓ Solution is likely to be near the root
✓ Level-order traversal required
```

**Q2: "What if the graph is very deep? Stack overflow risk?"**

**A:**
```
Good question! For very deep graphs:
1. Use iterative DFS with explicit stack (no recursion limit)
2. Increase stack size (not always possible)
3. Consider BFS as alternative

Example: LinkedIn has 1 billion users, recursion won't work!
→ Use iterative approach
```

**Q3: "How do you detect cycles using DFS?"**

**A:**
```typescript
// Add a "in_path" set for current recursion path
const in_path = new Set();

function hasCycle(node) {
    if (in_path.has(node)) return true; // Cycle detected!
    if (visited.has(node)) return false; // Already explored

    visited.add(node);
    in_path.add(node);  // Mark as in current path

    for (neighbor of graph[node]) {
        if (hasCycle(neighbor)) return true;
    }

    in_path.delete(node);  // Remove from path (backtrack)
    return false;
}
```

**Q4: "Time complexity worst case kab hota hai?"**

**A:**
```
Worst case: O(V + E)
- Dense graph: E ≈ V²  → O(V²)
- Sparse graph: E ≈ V  → O(V)

Example worst case:
Complete graph (har node har dusre se connected):
V = 100 nodes
E = 100 × 99 / 2 = 4,950 edges
Time: O(100 + 4950) ≈ O(V²)
```

### Common Mistakes to Avoid:

❌ **Mistake 1:** Forgetting to mark node as visited BEFORE exploring neighbors
```typescript
// WRONG!
for (neighbor of neighbors) {
    dfs(neighbor);
}
visited.add(node);  // Too late! Cycles can occur

// CORRECT!
visited.add(node);  // Mark FIRST
for (neighbor of neighbors) {
    if (!visited.has(neighbor)) {
        dfs(neighbor);
    }
}
```

❌ **Mistake 2:** Not checking if neighbor is visited
```typescript
// WRONG!
for (neighbor of neighbors) {
    dfs(neighbor);  // Will revisit nodes!
}

// CORRECT!
for (neighbor of neighbors) {
    if (!visited.has(neighbor)) {  // Check first
        dfs(neighbor);
    }
}
```

❌ **Mistake 3:** Modifying graph during traversal
```typescript
// WRONG!
function dfs(node) {
    visited.add(node);
    for (neighbor of graph[node]) {
        graph[node].remove(neighbor);  // Don't modify!
        dfs(neighbor);
    }
}
```

### Bonus Points to Mention:

✓ "I can implement both recursive and iterative versions"
✓ "DFS uses O(V) space vs BFS which can use O(V) in worst case too"
✓ "For trees, DFS is pre-order, in-order, or post-order traversal"
✓ "Can optimize with early termination if target found"

---

## Common Variations 🔄

### 1. DFS with Path Tracking
```typescript
function dfsWithPath(node, target, path = []) {
    visited.add(node);
    path.push(node);

    if (node === target) {
        return path;  // Found path!
    }

    for (neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            const result = dfsWithPath(neighbor, target, path);
            if (result) return result;
        }
    }

    path.pop();  // Backtrack
    return null;
}
```

### 2. DFS on Matrix (2D Grid)
```typescript
function dfsMatrix(matrix, i, j) {
    if (out of bounds || visited[i][j]) return;

    visited[i][j] = true;

    // 4 directions: up, down, left, right
    dfsMatrix(matrix, i-1, j);  // Up
    dfsMatrix(matrix, i+1, j);  // Down
    dfsMatrix(matrix, i, j-1);  // Left
    dfsMatrix(matrix, i, j+1);  // Right
}
```

### 3. DFS with Iterative Approach
```typescript
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];

    while (stack.length > 0) {
        const node = stack.pop();  // LIFO

        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);

            // Push neighbors in reverse order
            const neighbors = graph[node];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i])) {
                    stack.push(neighbors[i]);
                }
            }
        }
    }

    return result;
}
```

---

## Doubts / FAQ ❓

### Q1: DFS aur Recursion mein kya farak hai?

**A:** DFS ek algorithm hai, Recursion ek technique hai.

```
DFS = Algorithm (What to do)
- Graph ko depth-first traverse karo

Recursion = Technique (How to do)
- Function khud ko call kare

Hum DFS ko recursion SE implement karte hain, but DFS itself is the algorithm.

Example:
- DFS recursively: Uses call stack
- DFS iteratively: Uses explicit stack
- Both are DFS! Different implementations.
```

### Q2: Visited set kab add karna chahiye - before ya after recursive calls?

**A:** **BEFORE recursive calls!** Bahut important!

```typescript
// ❌ WRONG - Can cause infinite loop
function dfs(node) {
    for (neighbor of graph[node]) {
        dfs(neighbor);
    }
    visited.add(node);  // Too late!
}

// ✓ CORRECT
function dfs(node) {
    visited.add(node);  // Add IMMEDIATELY
    for (neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            dfs(neighbor);
        }
    }
}

Why?
Graph: 1 ↔ 2
Without early marking:
- dfs(1) calls dfs(2)
- dfs(2) calls dfs(1) (1 not in visited yet!)
- dfs(1) calls dfs(2)... infinite loop!

With early marking:
- dfs(1), add 1 to visited
- dfs(1) calls dfs(2)
- dfs(2), add 2 to visited
- dfs(2) checks 1: already visited! ✓ Stop
```

### Q3: DFS mein O(V+E) complexity kaise aati hai? Detailed derivation?

**A:** Step-by-step derivation:

```
Given:
- V vertices (nodes)
- E edges
- Adjacency list representation

For each vertex v:
    1. Mark visited: O(1)
    2. Iterate through neighbors: O(degree(v))
       where degree(v) = number of edges from v

Total time:
    T = Σ (for all vertices v) [ O(1) + O(degree(v)) ]

    T = Σ O(1) + Σ O(degree(v))

    T = O(V) + O(Σ degree(v))

Key insight: Σ degree(v) = ?

For undirected graph:
    Each edge counted twice (once from each endpoint)
    Σ degree(v) = 2E

For directed graph:
    Each edge counted once
    Σ degree(v) = E

Therefore:
    T = O(V) + O(E)
    T = O(V + E)

Example:
    Graph: 1-2, 2-3, 3-4, 4-5 (linear chain)
    V = 5, E = 4

    Node 1: 1 operation (visit) + 1 (check edge to 2) = 2
    Node 2: 1 operation (visit) + 2 (edges to 1,3) = 3
    Node 3: 1 operation (visit) + 2 (edges to 2,4) = 3
    Node 4: 1 operation (visit) + 2 (edges to 3,5) = 3
    Node 5: 1 operation (visit) + 1 (edge to 4) = 2

    Total: 2+3+3+3+2 = 13 operations
    V + 2E = 5 + 8 = 13 ✓ Matches!
```

### Q4: Agar graph disconnected hai (multiple components), tab kya hoga?

**A:** DFS sirf **connected component** traverse karega jahan se start kiya!

```
Graph:
1 - 2 - 3    5 - 6
    |        |
    4        7

Start from 1:
DFS Result: [1, 2, 3, 4]
(5, 6, 7 never visited!)

Solution: Try DFS from all unvisited nodes

function dfsAll(graph) {
    const visited = new Set();
    const allComponents = [];

    for (node of all_nodes) {
        if (!visited.has(node)) {
            const component = [];
            dfs(node, visited, component);
            allComponents.push(component);
        }
    }

    return allComponents;
}

Result: [[1,2,3,4], [5,6,7]]
Two separate components found!

Time Complexity: Still O(V + E)
- Visit each vertex once: O(V)
- Check each edge once: O(E)
```

---

## Code Implementation

Implementation details aur complete dry run ke liye, dekho:
**`dfs.ts`** file mein complete TypeScript code hai with:
- Recursive approach
- Iterative approach
- Detailed comments
- Test cases
- Working examples

---

## Summary Checklist ✓

Tumhe DFS ke baare mein yeh cheezein yaad rakhni chahiye:

- [ ] DFS = Depth First Search = Pehle gehrai mein jaao
- [ ] Stack use hota hai (recursive ya explicit)
- [ ] Visited set zaruri hai (cycles avoid karne ke liye)
- [ ] Time: O(V + E), Space: O(V)
- [ ] Best for: path finding, cycle detection, topological sort
- [ ] Backtracking naturally hoti hai recursion se
- [ ] Mark visited BEFORE exploring neighbors
- [ ] Works on both directed and undirected graphs
- [ ] For disconnected graphs, call DFS from all unvisited nodes

**Next Steps:** Practice DFS on:
- Tree traversals (pre-order, in-order, post-order)
- Graph problems (cycle detection, path finding)
- Matrix problems (island counting, flood fill)
- Backtracking problems (N-Queens, Sudoku solver)

---

*Happy Coding! 🚀*