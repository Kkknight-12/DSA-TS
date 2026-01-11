# Depth First Search (DFS): A Complete Guide

We'll break down **Depth First Search (DFS)** step-by-step, using simple language and analogies to build a strong understanding of this fundamental graph traversal algorithm.

---

## Let's Start with the Big Picture

Imagine you're exploring a vast maze. You have two strategies:
1. **Explore one path completely** before trying another (go deep first)
2. **Check all nearby paths** before going deeper (go wide first)

**DFS chooses strategy #1** - it goes as deep as possible down one path before backtracking.

**Real-World Analogy:**

Think of exploring a library with many sections and subsections:

```
Library
├── Fiction
│   ├── Mystery
│   │   ├── Classic Mystery
│   │   └── Modern Mystery
│   └── Romance
└── Non-Fiction
    └── History
```

**DFS Exploration:**
1. Enter Library
2. Go to Fiction (first section)
3. Go to Mystery (first subsection)
4. Go to Classic Mystery (deepest level available)
5. **Backtrack** to Mystery
6. Go to Modern Mystery
7. **Backtrack** to Fiction
8. Go to Romance
9. **Backtrack** to Library
10. Go to Non-Fiction
11. Continue...

**Notice the pattern:** Go deep → Hit dead end → Backtrack → Go deep again.

---

## Problem Statement

**Given:**
- A graph represented as an adjacency list
- A starting node

**Task:**
- Visit all reachable nodes exactly once
- Traverse in a depth-first manner
- Avoid cycles (infinite loops)

**Input Example:**
```typescript
Graph (Adjacency List):
{
    1: [2, 3],
    2: [4, 5],
    3: [],
    4: [],
    5: []
}

Visualization:
    1
   / \
  2   3
 / \
4   5

Start Node: 1
```

**Expected Output:**
```
Traversal Order: [1, 2, 4, 5, 3]

Path Explanation:
- Start at 1
- Go deep left: 1 → 2 → 4 (dead end)
- Backtrack to 2, try next: 2 → 5 (dead end)
- Backtrack to 1, try next: 1 → 3 (dead end)
- Complete!
```

---

## Step 1: The Naive Approach

**Simple Idea:**
"Just visit each node and explore its neighbors!"

```typescript
function naiveTraversal(graph, start) {
    visit(start);
    for (neighbor of graph[start]) {
        naiveTraversal(graph, neighbor);
    }
}
```

**Seems simple, right?**

### The Problem with the Naive Approach:

**Problem 1: Infinite Loops with Cycles**

```
Graph with cycle:
1 ↔ 2 ↔ 3
    ↕
    4

Without tracking:
visit(1) → visit(2) → visit(1) → visit(2) → visit(1) → ...
INFINITE LOOP! 💥
```

**Problem 2: Visiting Same Node Multiple Times**

```
Diamond Graph:
    1
   / \
  2   3
   \ /
    4

Without tracking:
Path 1→2→4: marks 4 as visited
Path 1→3→4: tries to visit 4 again!
Redundant work!
```

**Problem 3: No Systematic Exploration**

- Which neighbor do we visit first?
- How do we know when we're done?
- How do we backtrack properly?

### Key Realization:

We need three things:
1. **Visited Tracking** - Remember which nodes we've seen
2. **Systematic Order** - Follow a consistent pattern (depth-first)
3. **Backtracking Mechanism** - Return to previous nodes when stuck

---

## Step 2: The Challenge

### Challenge 1: Avoiding Cycles

```
Cyclic Graph:
1 → 2
↑   ↓
4 ← 3

Question: How do we prevent 1→2→3→4→1→2→3... ?
Solution: Mark nodes as visited!
```

### Challenge 2: Managing Backtracking

```
After exploring deep:
    1
   / \
  2   3
 /
4

At node 4: Dead end. How do we get back to 2, then to 1, then to 3?
Solution: Use a stack (call stack or explicit stack)
```

### Challenge 3: Ensuring Complete Exploration

```
Disconnected Graph:
1 - 2    5 - 6
    |        |
    3        7

Starting from 1 only explores {1, 2, 3}
Nodes {5, 6, 7} are never visited!
Solution: Try DFS from all unvisited nodes
```

---

## Step 3: The "Aha!" Moment 💡

**The core idea: Combine Stack + Visited Set**

### Key Insight #1: Stack Ensures Depth-First Order

```
Stack Property: LIFO (Last In, First Out)

Example:
Visit 1, push neighbors [2, 3]
Stack: [2, 3]

Pop 2 (last in), push its neighbors [4, 5]
Stack: [3, 4, 5]

Pop 5 (last in, deepest)
This naturally creates depth-first exploration!
```

### Key Insight #2: Visited Set Prevents Cycles

```
Before visiting node:
    if (visited.has(node)) return;  // Skip
    visited.add(node);              // Mark

This simple check eliminates all cycle problems!
```

### Key Insight #3: Recursion = Implicit Stack

```
Recursive calls automatically use the call stack:

dfs(1)
  └─ dfs(2)
      └─ dfs(4)  ← Stack: [dfs(1), dfs(2), dfs(4)]
          returns ← Stack: [dfs(1), dfs(2)]
      dfs(5)     ← Stack: [dfs(1), dfs(2), dfs(5)]
          returns ← Stack: [dfs(1), dfs(2)]
      returns    ← Stack: [dfs(1)]

Backtracking happens automatically when functions return!
```

### Visual Transformation:

**Before (Naive):**
```
Random exploration → Cycles → Redundant visits → Confusion
```

**After (DFS with Stack + Visited):**
```
Systematic → Go Deep → Backtrack → Go Deep → Complete ✓
```

---

## Step 4: The Magic Tool - Stack & Visited Set

### Component 1: The Visited Set

**Purpose:** Track which nodes have been explored

**Implementation:**
```typescript
const visited = new Set<number>();
// or
const visited: boolean[] = new Array(n).fill(false);
```

**Why It's Crucial:**
- **Prevents infinite loops** in cyclic graphs
- **Avoids redundant work** in graphs with multiple paths to same node
- **Ensures O(V) time** - each node visited exactly once

### Component 2: The Stack

**Purpose:** Manage which node to explore next (LIFO order)

**Two Implementations:**

**Implicit Stack (Recursion):**
```typescript
function dfs(node) {
    // Current call is on the stack
    visited.add(node);

    for (neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            dfs(neighbor);  // Adds new call to stack
        }
    }
    // Returns → pops from stack
}
```

**Explicit Stack (Iterative):**
```typescript
function dfs(start) {
    const stack = [start];

    while (stack.length > 0) {
        const node = stack.pop();  // LIFO
        if (!visited.has(node)) {
            visited.add(node);
            stack.push(...graph[node]);  // Add neighbors
        }
    }
}
```

### Component 3: The Adjacency List

**Purpose:** Efficiently store graph connections

```typescript
type Graph = {
    [node: number]: number[]  // node → list of neighbors
};

const graph = {
    1: [2, 3],
    2: [4, 5],
    3: [],
    4: [],
    5: []
};
```

**Why Adjacency List?**
- **O(1) neighbor lookup** - direct array access
- **Space efficient** - only stores actual edges
- **Easy iteration** - natural for loop over neighbors

---

## The Optimization Formula

### Time Complexity: O(V + E)

**Derivation:**

```
Let:
- V = number of vertices (nodes)
- E = number of edges

For each vertex v:
    1. Mark as visited: O(1)
    2. Iterate through all edges from v: O(degree(v))

    where degree(v) = number of neighbors of v

Total Time:
    T = Σ (for all vertices v) [O(1) + O(degree(v))]

    T = Σ O(1) + Σ O(degree(v))

    T = O(V) + O(Σ degree(v))

Key Mathematical Fact (Handshaking Lemma):
    Σ degree(v) = 2E  (for undirected graph)
    Σ degree(v) = E   (for directed graph)

Why? Each edge is counted twice in undirected graphs
(once from each endpoint)

Therefore:
    T = O(V) + O(E)
    T = O(V + E)
```

**Concrete Example:**
```
Linear Chain: 1-2-3-4-5
V = 5 vertices
E = 4 edges

Operations:
Node 1: 1 visit + 1 edge check = 2
Node 2: 1 visit + 2 edge checks = 3
Node 3: 1 visit + 2 edge checks = 3
Node 4: 1 visit + 2 edge checks = 3
Node 5: 1 visit + 1 edge check = 2

Total: 2+3+3+3+2 = 13 operations
V + 2E = 5 + 8 = 13 ✓
```

### Space Complexity: O(V)

**Components:**

1. **Visited Set:** O(V)
   - One entry per vertex

2. **Recursion Stack (Worst Case):** O(V)
   - Linear chain: all V nodes on stack simultaneously
   ```
   1→2→3→...→V
   Stack depth = V
   ```

3. **Result Array:** O(V)
   - Store all V vertices

**Total: O(V) + O(V) + O(V) = O(V)**

**Note:** Adjacency list storage O(V + E) is input, not counted in algorithm space complexity.

---

## Step 5: Putting It All Together

### The Complete Algorithm

**Recursive Approach:**

```typescript
function depthFirstSearch(graph: Graph, start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];

    function traverse(node: number): void {
        // Base case: Already visited
        if (visited.has(node)) return;

        // Mark as visited
        visited.add(node);
        result.push(node);

        // Explore all neighbors
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                traverse(neighbor);  // Recursive DFS
            }
        }
        // Backtrack automatically when function returns
    }

    traverse(start);
    return result;
}
```

**Iterative Approach:**

```typescript
function depthFirstSearchIterative(graph: Graph, start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];
    const stack: number[] = [start];

    while (stack.length > 0) {
        const node = stack.pop()!;

        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);

            // Push neighbors in reverse order for consistent left-to-right traversal
            const neighbors = graph[node] || [];
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

### Detailed Walkthrough

**Example:** Graph = { 1: [2, 3], 2: [4, 5], 3: [], 4: [], 5: [] }

```
       1
      / \
     2   3
    / \
   4   5
```

**Step-by-Step Execution:**

```
INITIALIZATION:
├─ visited = {}
├─ result = []
└─ Call traverse(1)

STEP 1: traverse(1)
├─ Check: 1 in visited? No
├─ Mark: visited = {1}
├─ Add: result = [1]
├─ Neighbors: [2, 3]
├─ Try 2: Not visited
└─ Call traverse(2)
    │
    STEP 2: traverse(2)
    ├─ Check: 2 in visited? No
    ├─ Mark: visited = {1, 2}
    ├─ Add: result = [1, 2]
    ├─ Neighbors: [4, 5]
    ├─ Try 4: Not visited
    └─ Call traverse(4)
        │
        STEP 3: traverse(4)
        ├─ Check: 4 in visited? No
        ├─ Mark: visited = {1, 2, 4}
        ├─ Add: result = [1, 2, 4]
        ├─ Neighbors: []
        ├─ No neighbors to explore
        └─ Return to traverse(2)

    STEP 4: Back in traverse(2)
    ├─ Loop continues
    ├─ Try 5: Not visited
    └─ Call traverse(5)
        │
        STEP 5: traverse(5)
        ├─ Check: 5 in visited? No
        ├─ Mark: visited = {1, 2, 4, 5}
        ├─ Add: result = [1, 2, 4, 5]
        ├─ Neighbors: []
        └─ Return to traverse(2)

    STEP 6: Back in traverse(2)
    ├─ All neighbors [4, 5] explored
    └─ Return to traverse(1)

STEP 7: Back in traverse(1)
├─ Loop continues
├─ Try 3: Not visited
└─ Call traverse(3)
    │
    STEP 8: traverse(3)
    ├─ Check: 3 in visited? No
    ├─ Mark: visited = {1, 2, 4, 5, 3}
    ├─ Add: result = [1, 2, 4, 5, 3]
    ├─ Neighbors: []
    └─ Return to traverse(1)

STEP 9: Back in traverse(1)
├─ All neighbors [2, 3] explored
└─ Return from traverse(1)

FINAL RESULT: [1, 2, 4, 5, 3] ✓
```

### Call Stack Visualization

```
traverse(1) called
  │
  ├─ traverse(2) called
  │   │
  │   ├─ traverse(4) called
  │   │   └─ returns (no neighbors) ← Stack: [traverse(1), traverse(2)]
  │   │
  │   ├─ traverse(5) called
  │   │   └─ returns (no neighbors) ← Stack: [traverse(1), traverse(2)]
  │   │
  │   └─ returns (all neighbors done) ← Stack: [traverse(1)]
  │
  ├─ traverse(3) called
  │   └─ returns (no neighbors) ← Stack: [traverse(1)]
  │
  └─ returns (all neighbors done) ← Stack: []

Timeline:
[1] → [1,2] → [1,2,4] → [1,2,4,5] → [1,2,4,5,3]
```

---

## Summary and Analogy

### The Maze Explorer

**Naive Explorer (No Strategy):**
- Wanders randomly through the maze
- Revisits same rooms multiple times
- Gets stuck in cycles
- Never completes the maze efficiently

**DFS Explorer (Smart Strategy):**
- **Marks visited rooms** with chalk (visited set)
- **Always goes deeper first** until hitting a dead end
- **Backtracks systematically** to last junction with unexplored paths
- **Guarantees** finding all reachable rooms exactly once
- **Efficient** - each path explored only once

**The DFS Explorer's Rules:**
1. Mark current room as visited
2. If there's an unvisited path, take it (go deep)
3. If stuck (no unvisited paths), backtrack to previous junction
4. Repeat until all reachable rooms visited

---

## Complexity Analysis

### Time Complexity: **O(V + E)**

**Why?**
- **Visit each vertex once:** O(V)
  - Each node marked visited exactly once
  - Adding to result array: O(1) per node

- **Explore each edge once:** O(E)
  - For directed graph: each edge checked once
  - For undirected graph: each edge checked twice (from both ends)
  - Still O(E) overall

**Real-World Examples:**

```
Example 1: Sparse Graph (Tree)
- 1000 nodes
- 999 edges (tree has V-1 edges)
- Time: O(1000 + 999) ≈ O(2000) operations

Example 2: Dense Graph (Complete Graph)
- 100 nodes
- ~4950 edges (V*(V-1)/2)
- Time: O(100 + 4950) ≈ O(5000) operations
  Note: This becomes O(V²) for dense graphs
```

### Space Complexity: **O(V)**

**Components:**

1. **Visited Set:** O(V)
   ```typescript
   const visited = new Set();  // Stores up to V nodes
   ```

2. **Recursion Stack:** O(V) worst case
   ```
   Worst case: Linear chain 1→2→3→...→V
   All V calls on stack simultaneously

   Best case: Complete binary tree
   Only O(log V) depth
   ```

3. **Result Array:** O(V)
   ```typescript
   const result = [];  // Stores all V nodes
   ```

**Comparison:**

| Graph Type | Vertices | Edges | Time | Space |
|------------|----------|-------|------|-------|
| Tree | V | V-1 | O(V) | O(V) |
| Sparse Graph | V | ≈V | O(V) | O(V) |
| Dense Graph | V | ≈V² | O(V²) | O(V) |
| Complete Graph | V | V(V-1)/2 | O(V²) | O(V) |

---

## Code Section

Complete TypeScript implementation with both recursive and iterative approaches, detailed comments, and comprehensive examples.

---

## Code Implementation

### Complete TypeScript Code

```typescript
/**
 * Graph representation as an adjacency list
 * Key: node identifier
 * Value: array of neighboring nodes
 */
type Graph = {
    [key: number]: number[];
};

/**
 * DFS Recursive Implementation
 *
 * Uses the call stack implicitly for backtracking
 * Cleaner code, but limited by stack size
 *
 * @param graph - Adjacency list representation
 * @param start - Starting node
 * @returns Array of nodes in DFS order
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function dfsRecursive(graph: Graph, start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];

    function traverse(node: number): void {
        // Mark current node as visited
        // WHY: Prevents cycles and duplicate visits
        visited.add(node);
        result.push(node);

        // Get neighbors for current node
        // WHY: Need to know which nodes to explore next
        const neighbors = graph[node] || [];

        // Explore each unvisited neighbor
        // WHY: Depth-first means we go deep immediately
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                traverse(neighbor);  // Recursive call - go deeper
            }
        }
        // When loop ends, automatically backtrack (function returns)
    }

    traverse(start);
    return result;
}

/**
 * DFS Iterative Implementation
 *
 * Uses explicit stack for backtracking
 * No recursion limit, but slightly more complex code
 *
 * @param graph - Adjacency list representation
 * @param start - Starting node
 * @returns Array of nodes in DFS order
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function dfsIterative(graph: Graph, start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];
    const stack: number[] = [start];  // Initialize with start node

    while (stack.length > 0) {
        // Pop from stack (LIFO - Last In First Out)
        // WHY: LIFO ensures depth-first exploration
        const node = stack.pop()!;

        // Only process if not visited
        // WHY: Prevents cycles and duplicate work
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);

            // Push neighbors to stack
            // WHY: Reverse order ensures left-to-right traversal
            // EXAMPLE: neighbors [2,3] → push 3, then 2
            //          → pop 2 first (left child explored first)
            const neighbors = graph[node] || [];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i])) {
                    stack.push(neighbors[i]);
                }
            }
        }
    }

    return result;
}

/**
 * DFS for Disconnected Graphs
 *
 * Handles graphs with multiple components
 * Ensures all nodes are visited even if not connected
 *
 * @param graph - Adjacency list representation
 * @returns Array of components, each component is array of nodes
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function dfsAllComponents(graph: Graph): number[][] {
    const visited = new Set<number>();
    const allComponents: number[][] = [];

    // Helper function for DFS on single component
    function dfs(node: number, component: number[]): void {
        visited.add(node);
        component.push(node);

        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, component);
            }
        }
    }

    // Try DFS from each unvisited node
    // WHY: Ensures we find all disconnected components
    const allNodes = Object.keys(graph).map(Number);
    for (const node of allNodes) {
        if (!visited.has(node)) {
            const component: number[] = [];
            dfs(node, component);
            allComponents.push(component);
        }
    }

    return allComponents;
}

/**
 * DFS with Path Finding
 *
 * Finds a path from start to target node
 * Returns path if found, null otherwise
 *
 * @param graph - Adjacency list representation
 * @param start - Starting node
 * @param target - Target node to find
 * @returns Path from start to target, or null
 */
function dfsPathFinding(
    graph: Graph,
    start: number,
    target: number
): number[] | null {
    const visited = new Set<number>();

    function dfs(node: number, path: number[]): number[] | null {
        // Add current node to path
        visited.add(node);
        path.push(node);

        // Found target!
        if (node === target) {
            return path;
        }

        // Try each neighbor
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                const result = dfs(neighbor, path);
                if (result) return result;  // Path found
            }
        }

        // No path through this node, backtrack
        path.pop();
        return null;
    }

    return dfs(start, []);
}

/**
 * DFS Cycle Detection
 *
 * Detects if graph contains a cycle
 * Uses "currently in path" set to identify back edges
 *
 * @param graph - Adjacency list representation
 * @returns true if cycle exists, false otherwise
 */
function hasCycleDFS(graph: Graph): boolean {
    const visited = new Set<number>();
    const inPath = new Set<number>();  // Nodes in current DFS path

    function dfs(node: number): boolean {
        // If node in current path, we found a back edge (cycle!)
        if (inPath.has(node)) return true;

        // Already fully explored this node
        if (visited.has(node)) return false;

        // Mark as visited and in current path
        visited.add(node);
        inPath.add(node);

        // Check all neighbors
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            if (dfs(neighbor)) return true;  // Cycle found
        }

        // Backtrack: remove from current path
        inPath.delete(node);
        return false;
    }

    // Check all components
    const allNodes = Object.keys(graph).map(Number);
    for (const node of allNodes) {
        if (!visited.has(node)) {
            if (dfs(node)) return true;
        }
    }

    return false;
}

// Example Usage
const exampleGraph: Graph = {
    1: [2, 3],
    2: [4, 5],
    3: [],
    4: [],
    5: []
};

console.log("DFS Recursive:", dfsRecursive(exampleGraph, 1));
// Output: [1, 2, 4, 5, 3]

console.log("DFS Iterative:", dfsIterative(exampleGraph, 1));
// Output: [1, 2, 4, 5, 3]

const disconnectedGraph: Graph = {
    1: [2],
    2: [3],
    3: [],
    4: [5],
    5: []
};

console.log("All Components:", dfsAllComponents(disconnectedGraph));
// Output: [[1, 2, 3], [4, 5]]

console.log("Path 1→5:", dfsPathFinding(exampleGraph, 1, 5));
// Output: [1, 2, 5]

const cyclicGraph: Graph = {
    1: [2],
    2: [3],
    3: [1]
};

console.log("Has Cycle:", hasCycleDFS(cyclicGraph));
// Output: true
```

---

## Code Explanation

### 1. Recursive DFS Core Logic

```typescript
function traverse(node: number): void {
    visited.add(node);          // ← Mark visited FIRST
    result.push(node);

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            traverse(neighbor);  // ← Go deeper
        }
    }
    // ← Automatic backtrack when function returns
}
```

**Why this works:**
- **Visited set prevents cycles:** Once marked, never revisit
- **Recursion creates stack:** Each call pushes to call stack
- **Loop explores all paths:** Systematically tries each neighbor
- **Return backtracks:** When no more neighbors, automatically go back

### 2. Iterative DFS Stack Management

```typescript
const stack: number[] = [start];

while (stack.length > 0) {
    const node = stack.pop()!;   // ← LIFO removal

    if (!visited.has(node)) {
        visited.add(node);

        // Push in reverse order
        for (let i = neighbors.length - 1; i >= 0; i--) {
            stack.push(neighbors[i]);
        }
    }
}
```

**Why reverse order?**
```
neighbors = [2, 3]
Push order: 3, then 2
Stack: [3, 2]
Pop order: 2, then 3  ← Left-to-right traversal!
```

### 3. Cycle Detection Mechanism

```typescript
const inPath = new Set<number>();  // Crucial!

function dfs(node: number): boolean {
    if (inPath.has(node)) return true;  // ← Back edge found!

    inPath.add(node);      // ← Add to current path
    // ... explore neighbors ...
    inPath.delete(node);   // ← Remove from path (backtrack)
}
```

**Why separate `inPath` set?**
```
Graph: 1→2→3, 1→3

Exploring 1→2→3: inPath = {1, 2, 3}
Backtrack to 1: inPath = {1}
Explore 1→3: 3 is visited but NOT in current path
           → Not a cycle, just reconvergence!
```

---

## Dry Run

### Example: Complete DFS Traversal

**Input:**
```
Graph:
    1
   / \
  2   3
 / \
4   5

Adjacency List: { 1: [2,3], 2: [4,5], 3: [], 4: [], 5: [] }
```

**Execution Table:**

| Step | Current Node | Action | Visited Set | Result Array | Stack State | Notes |
|------|--------------|--------|-------------|--------------|-------------|-------|
| 0 | - | Initialize | {} | [] | [] | Start DFS from 1 |
| 1 | 1 | Visit | {1} | [1] | [traverse(1)] | Mark 1, check neighbors [2,3] |
| 2 | 1 | Call DFS(2) | {1} | [1] | [traverse(1), traverse(2)] | Explore left child |
| 3 | 2 | Visit | {1,2} | [1,2] | [traverse(1), traverse(2)] | Mark 2, check neighbors [4,5] |
| 4 | 2 | Call DFS(4) | {1,2} | [1,2] | [traverse(1), traverse(2), traverse(4)] | Explore left child |
| 5 | 4 | Visit | {1,2,4} | [1,2,4] | [traverse(1), traverse(2), traverse(4)] | Mark 4, no neighbors |
| 6 | 4 | Return | {1,2,4} | [1,2,4] | [traverse(1), traverse(2)] | Backtrack to 2 |
| 7 | 2 | Call DFS(5) | {1,2,4} | [1,2,4] | [traverse(1), traverse(2), traverse(5)] | Try next neighbor |
| 8 | 5 | Visit | {1,2,4,5} | [1,2,4,5] | [traverse(1), traverse(2), traverse(5)] | Mark 5, no neighbors |
| 9 | 5 | Return | {1,2,4,5} | [1,2,4,5] | [traverse(1), traverse(2)] | Backtrack to 2 |
| 10 | 2 | Return | {1,2,4,5} | [1,2,4,5] | [traverse(1)] | All neighbors done, backtrack to 1 |
| 11 | 1 | Call DFS(3) | {1,2,4,5} | [1,2,4,5] | [traverse(1), traverse(3)] | Try next neighbor |
| 12 | 3 | Visit | {1,2,4,5,3} | [1,2,4,5,3] | [traverse(1), traverse(3)] | Mark 3, no neighbors |
| 13 | 3 | Return | {1,2,4,5,3} | [1,2,4,5,3] | [traverse(1)] | Backtrack to 1 |
| 14 | 1 | Return | {1,2,4,5,3} | [1,2,4,5,3] | [] | All neighbors done, DFS complete |

**Final Result:** `[1, 2, 4, 5, 3]`

### Path Visualization:

```
Exploration Order:
1 (start)
├─→ 2 (first neighbor)
│   ├─→ 4 (first neighbor of 2)
│   │   └─ Dead end → Backtrack to 2
│   │
│   └─→ 5 (second neighbor of 2)
│       └─ Dead end → Backtrack to 2
│           └─ All neighbors done → Backtrack to 1
│
└─→ 3 (second neighbor of 1)
    └─ Dead end → Backtrack to 1
        └─ All neighbors done → DFS Complete!
```

---

## Doubts (FAQ)

### Q1: What's the difference between DFS and recursion?

**A:** DFS is an algorithm, recursion is a technique.

- **DFS** = What to do (traverse graph depth-first)
- **Recursion** = How to do it (function calling itself)

**You can implement DFS both ways:**
```
DFS Recursive  → Uses call stack (implicit)
DFS Iterative  → Uses explicit stack
Both are still DFS!
```

**Why does recursion work so well for DFS?**
- Recursive calls naturally create a stack
- Function returns = automatic backtracking
- Clean, intuitive code

---

### Q2: When should I mark a node as visited - before or after exploring its neighbors?

**A:** **BEFORE exploring neighbors!** This is crucial.

**❌ Wrong:**
```typescript
function dfs(node) {
    for (neighbor of graph[node]) {
        dfs(neighbor);
    }
    visited.add(node);  // Too late!
}
```

**Why this fails:**
```
Graph: 1 ↔ 2 (bidirectional)

dfs(1) → dfs(2) → dfs(1) → dfs(2) → ... INFINITE LOOP!
```

**✓ Correct:**
```typescript
function dfs(node) {
    visited.add(node);  // Mark IMMEDIATELY
    for (neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            dfs(neighbor);
        }
    }
}
```

**Why this works:**
```
Graph: 1 ↔ 2

dfs(1): mark 1 → try dfs(2)
dfs(2): mark 2 → try dfs(1) → 1 already visited ✓ Stop
```

---

### Q3: Why is DFS complexity O(V + E) and not O(V × E)?

**A:** Because we visit each vertex once and check each edge once.

**Detailed Derivation:**

```
For each vertex v:
    - Mark visited: O(1)
    - Loop through neighbors: O(degree(v))

Total work:
    Σ [O(1) + O(degree(v))] for all v

    = O(V) + Σ O(degree(v))

Key insight: What is Σ degree(v)?

In undirected graph:
    Each edge contributes to degree of both endpoints
    Edge (1,2) adds 1 to degree(1) AND 1 to degree(2)
    So Σ degree(v) = 2E

In directed graph:
    Each edge contributes to degree of only source
    So Σ degree(v) = E

Therefore:
    Time = O(V) + O(E) = O(V + E)
```

**Concrete Example:**
```
Graph: 1-2-3-4 (linear chain)
V = 4, E = 3

Node 1: Visit + 1 edge check = 2 ops
Node 2: Visit + 2 edge checks = 3 ops
Node 3: Visit + 2 edge checks = 3 ops
Node 4: Visit + 1 edge check = 2 ops

Total: 10 operations
V + 2E = 4 + 6 = 10 ✓ Matches!
```

**Why NOT O(V × E)?**
```
That would be if we checked ALL edges for EVERY vertex
But we only check edges from each vertex once!
```

---

### Q4: How does DFS handle disconnected graphs?

**A:** Single DFS call only explores one connected component!

**Example:**
```
Graph:
1 - 2    5 - 6
    |        |
    3        7

dfsRecursive(graph, 1) → [1, 2, 3]
Nodes {5, 6, 7} never visited!
```

**Solution: DFS from all unvisited nodes**

```typescript
function dfsAll(graph: Graph): number[][] {
    const visited = new Set();
    const components: number[][] = [];

    function dfs(node: number, component: number[]) {
        visited.add(node);
        component.push(node);
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, component);
            }
        }
    }

    for (const node of allNodes) {
        if (!visited.has(node)) {  // Start new component
            const component: number[] = [];
            dfs(node, component);
            components.push(component);
        }
    }

    return components;
}

// Result: [[1, 2, 3], [5, 6, 7]]
```

**Time Complexity Still O(V + E):**
- Visit each vertex once
- Check each edge once
- Outer loop has O(V) iterations, but inner DFS collectively does O(V+E) work

---

## When to Use DFS

### ✓ Use DFS When:

1. **Path Finding**
   ```
   "Is there a path from A to B?"
   "Find any path between two nodes"
   ```

2. **Cycle Detection**
   ```
   "Does this graph have a cycle?"
   "Find circular dependencies"
   ```

3. **Topological Sorting**
   ```
   "Order tasks with dependencies"
   "Build system dependency resolution"
   ```

4. **Connected Components**
   ```
   "How many separate groups exist?"
   "Find network clusters"
   ```

5. **Tree Traversals**
   ```
   Pre-order, In-order, Post-order
   All are DFS variants!
   ```

6. **Backtracking Problems**
   ```
   Sudoku solver, N-Queens, Maze solving
   DFS naturally supports backtracking
   ```

### ❌ Don't Use DFS When:

1. **Shortest Path (Unweighted Graphs)**
   ```
   Use BFS instead!
   BFS guarantees shortest path in unweighted graphs
   ```

2. **Level-Order Traversal**
   ```
   Use BFS instead!
   DFS doesn't process by levels
   ```

3. **Minimum Spanning Tree**
   ```
   Use Prim's or Kruskal's algorithm
   DFS doesn't optimize for minimum weight
   ```

4. **Very Deep Graphs with Recursion**
   ```
   Risk of stack overflow!
   Use iterative DFS with explicit stack
   ```

---

## Comparison: DFS vs BFS

| Aspect | DFS | BFS |
|--------|-----|-----|
| **Data Structure** | Stack (LIFO) | Queue (FIFO) |
| **Exploration** | Depth-first (go deep) | Breadth-first (go wide) |
| **Path Found** | Any path | Shortest path (unweighted) |
| **Memory** | O(height) - better for wide graphs | O(width) - better for deep graphs |
| **Implementation** | Recursive or iterative | Usually iterative |
| **Use Cases** | Cycle detection, topological sort, backtracking | Shortest path, level-order |
| **Complete?** | Yes (finds all reachable) | Yes (finds all reachable) |
| **Optimal?** | No (path may not be shortest) | Yes (for unweighted graphs) |

**Visual Comparison:**

```
        1
       /|\
      2 3 4
     /|
    5 6

DFS Order: 1 → 2 → 5 → 6 → 3 → 4 (deep first)
BFS Order: 1 → 2 → 3 → 4 → 5 → 6 (level by level)
```

---

## Summary

### Key Takeaways

1. **DFS explores depth-first** - Go as deep as possible before backtracking
2. **Uses Stack (LIFO)** - Recursive (implicit) or iterative (explicit)
3. **Visited set prevents cycles** - Mark nodes before exploring
4. **Time: O(V + E)** - Visit each vertex, check each edge once
5. **Space: O(V)** - Visited set + stack depth
6. **Natural backtracking** - Perfect for path finding, cycle detection
7. **Works on any graph** - Directed, undirected, disconnected
8. **Mark visited FIRST** - Critical for correctness

### Implementation Checklist

When implementing DFS, ensure:
- [ ] Visited set/array to track explored nodes
- [ ] Mark node as visited BEFORE exploring neighbors
- [ ] Check if neighbor is visited before recursing
- [ ] Handle disconnected graphs (iterate through all nodes)
- [ ] Consider iterative approach for very deep graphs
- [ ] Use adjacency list for O(1) neighbor lookup

### Practice Problems

Master DFS with these problem types:
1. Basic graph traversal
2. Cycle detection in directed/undirected graphs
3. Path finding between two nodes
4. Connected components counting
5. Island counting in 2D grid
6. Topological sorting
7. Strongly connected components
8. Backtracking: N-Queens, Sudoku, Maze solving

---

**Further Reading:**
- Graph Theory Fundamentals
- Tree Traversal Algorithms (Pre/In/Post-order)
- Breadth First Search (BFS)
- Backtracking Algorithms
- Topological Sorting

---

*Happy Coding! 🚀*