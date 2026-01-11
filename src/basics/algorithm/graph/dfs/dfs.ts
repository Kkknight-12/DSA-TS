/**
 * DFS (Depth First Search) Implementation
 *
 * Concept:
 * DFS graph ko traverse karta hai "depth-wise". Matlab ye ek path pakad kar
 * last tak jaata hai, phir wapas aata hai (backtrack) aur dusra path explore karta hai.
 *
 * Data Structures used:
 * 1. Adjacency List: Graph ko represent karne ke liye.
 * 2. Visited Set/Array: Ye track rakhne ke liye ki kaunsa node visit ho chuka hai taaki loops mein na fasein.
 * 3. Stack (Implicit in Recursion, Explicit in Iteration): Backtracking manage karne ke liye.
 */

namespace DFSAlgorithm {

    // Graph represented as an Adjacency List
    // Key: Node, Value: List of neighbors
    type Graph = { [key: number]: number[] };

    /**
     * Recursive DFS Approach
     * Sabse common aur easy tareeka.
     * System ka internal call stack use karta hai.
     */
    export function dfsRecursive(graph: Graph, startNode: number): number[] {
        const visited = new Set<number>();
        const result: number[] = [];

        // Helper function jo recursion sambhalega
        function traverse(node: number) {
            // Step 1: Current node ko visited mark karo aur result me daalo
            visited.add(node);
            result.push(node);
            
            console.log(`Visiting: ${node}`);

            // Step 2: Current node ke neighbors dekho
            const neighbors = graph[node] || [];

            for (const neighbor of neighbors) {
                // Step 3: Agar neighbor visited nahi hai, toh uspe traverse call karo (Recursive Step)
                if (!visited.has(neighbor)) {
                    console.log(`Going deeper from ${node} to ${neighbor}`);
                    traverse(neighbor);
                }
            }
            // Step 4: Jab yahan pahunche, matlab saare neighbors visit ho gaye.
            // Automatically backtrack hoga pichle function call par.
        }

        traverse(startNode);
        return result;
    }

    /**
     * Iterative DFS Approach
     * Stack data structure ka explicitly use karte hain.
     * Ye approach tab useful hai jab recursion depth limit hit hone ka dar ho (Stack Overflow).
     */
    export function dfsIterative(graph: Graph, startNode: number): number[] {
        const visited = new Set<number>();
        const result: number[] = [];
        const stack: number[] = [startNode]; // Stack mein start node daal kar shuru karo

        while (stack.length > 0) {
            // Step 1: Stack se element pop karo (LIFO - Last In First Out)
            const currentNode = stack.pop()!;

            // Step 2: Agar node pehle visit nahi hua hai, tabhi process karo
            if (!visited.has(currentNode)) {
                visited.add(currentNode);
                result.push(currentNode);
                console.log(`Visiting (Iterative): ${currentNode}`);

                // Step 3: Neighbors ko stack mein daalo.
                // Note: Hum neighbors ko reverse order mein daal sakte hain taaki
                // jab pop karein toh wo original order (e.g., left to right) mein nikle.
                // Lekin DFS mein order strict nahi hota, bas connectivity matter karti hai.
                const neighbors = graph[currentNode] || [];
                
                // Reverse karke daal rahe hain taaki pehla neighbor pehle process ho (Stack LIFO hai)
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const neighbor = neighbors[i];
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }

        return result;
    }

    // --- DRY RUN Example (Recursive) ---
    /*
      ═══════════════════════════════════════════════════════════════════
      COMPLETE DRY RUN WITH CONTROL FLOW BOXES
      ═══════════════════════════════════════════════════════════════════

      Graph:
          1
         / \
        2   3
       / \
      4   5

      Adjacency List: { 1: [2, 3], 2: [4, 5], 3: [], 4: [], 5: [] }

      Call dfsRecursive(graph, 1):

      ═══════════════════════════════════════════════════════════════════
      CALL 1: traverse(1)
      ─────────────────────────────────────────────────────────────────
      Action:
        - Mark visited: {1}
        - Add to result: [1]
        - Neighbors of 1: [2, 3]
        - Check neighbor 2: Not visited → Call traverse(2)

      ═══════════════════════════════════════════════════════════════════
      CALL 2: traverse(2)
      ─────────────────────────────────────────────────────────────────
      Action:
        - Mark visited: {1, 2}
        - Add to result: [1, 2]
        - Neighbors of 2: [4, 5]
        - Check neighbor 4: Not visited → Call traverse(4)

      ═══════════════════════════════════════════════════════════════════
      CALL 3: traverse(4)
      ─────────────────────────────────────────────────────────────────
      Action:
        - Mark visited: {1, 2, 4}
        - Add to result: [1, 2, 4]
        - Neighbors of 4: []
        - No neighbors → return

      ┌─────────────────────────────────────────────────────────────────┐
      │ CONTROL FLOW - AFTER traverse(4) RETURNS:                      │
      │                                                                 │
      │ Returns to: traverse(2)                                         │
      │ Where: Inside for loop (line 40)                              │
      │ Current loop state:                                            │
      │   - neighbors = [4, 5]                                         │
      │   - Just processed: neighbor = 4                               │
      │   - Loop continues to next iteration                           │
      │   - Next neighbor: 5                                           │
      └─────────────────────────────────────────────────────────────────┘

      ═══════════════════════════════════════════════════════════════════
      Back in CALL 2: traverse(2)
      ─────────────────────────────────────────────────────────────────
      Action:
        - Check neighbor 5: Not visited → Call traverse(5)

      ═══════════════════════════════════════════════════════════════════
      CALL 4: traverse(5)
      ─────────────────────────────────────────────────────────────────
      Action:
        - Mark visited: {1, 2, 4, 5}
        - Add to result: [1, 2, 4, 5]
        - Neighbors of 5: []
        - No neighbors → return

      ┌─────────────────────────────────────────────────────────────────┐
      │ CONTROL FLOW - AFTER traverse(5) RETURNS:                      │
      │                                                                 │
      │ Returns to: traverse(2)                                         │
      │ Where: Inside for loop (line 40)                              │
      │ Current loop state:                                            │
      │   - neighbors = [4, 5]                                         │
      │   - Just processed: neighbor = 5                               │
      │   - Loop check: Are there more neighbors?                      │
      │   - Answer: NO (processed all: [4, 5])                         │
      │   - Loop ENDS                                                   │
      │   - traverse(2) function returns                               │
      └─────────────────────────────────────────────────────────────────┘

      ┌─────────────────────────────────────────────────────────────────┐
      │ CONTROL FLOW - AFTER traverse(2) RETURNS:                      │
      │                                                                 │
      │ Returns to: traverse(1)                                         │
      │ Where: Inside for loop (line 40)                              │
      │ Current loop state:                                            │
      │   - neighbors = [2, 3]                                         │
      │   - Just processed: neighbor = 2                               │
      │   - Loop continues to next iteration                           │
      │   - Next neighbor: 3                                           │
      └─────────────────────────────────────────────────────────────────┘

      ═══════════════════════════════════════════════════════════════════
      Back in CALL 1: traverse(1)
      ─────────────────────────────────────────────────────────────────
      Action:
        - Check neighbor 3: Not visited → Call traverse(3)

      ═══════════════════════════════════════════════════════════════════
      CALL 5: traverse(3)
      ─────────────────────────────────────────────────────────────────
      Action:
        - Mark visited: {1, 2, 4, 5, 3}
        - Add to result: [1, 2, 4, 5, 3]
        - Neighbors of 3: []
        - No neighbors → return

      ┌─────────────────────────────────────────────────────────────────┐
      │ CONTROL FLOW - AFTER traverse(3) RETURNS:                      │
      │                                                                 │
      │ Returns to: traverse(1)                                         │
      │ Where: Inside for loop (line 40)                              │
      │ Current loop state:                                            │
      │   - neighbors = [2, 3]                                         │
      │   - Just processed: neighbor = 3                               │
      │   - Loop check: Are there more neighbors?                      │
      │   - Answer: NO (processed all: [2, 3])                         │
      │   - Loop ENDS                                                   │
      │   - traverse(1) function returns                               │
      └─────────────────────────────────────────────────────────────────┘

      ═══════════════════════════════════════════════════════════════════
      DFS COMPLETE!
      ─────────────────────────────────────────────────────────────────
      Final Result: [1, 2, 4, 5, 3] ✓

      Call Stack Timeline:
      traverse(1) called
        ├─ traverse(2) called
        │   ├─ traverse(4) called
        │   │   └─ traverse(4) returns (no neighbors)
        │   ├─ traverse(5) called
        │   │   └─ traverse(5) returns (no neighbors)
        │   └─ traverse(2) returns (all neighbors [4,5] processed)
        ├─ traverse(3) called
        │   └─ traverse(3) returns (no neighbors)
        └─ traverse(1) returns (all neighbors [2,3] processed)

      ═══════════════════════════════════════════════════════════════════
    */
}

// --- Tests ---

const testGraph = {
    1: [2, 3],
    2: [4, 5],
    3: [],
    4: [],
    5: []
};

console.log("--- Testing Recursive DFS ---");
const recursiveResult = DFSAlgorithm.dfsRecursive(testGraph, 1);
console.log("Recursive Result:", recursiveResult);
// Expected: [1, 2, 4, 5, 3]

console.log("\n--- Testing Iterative DFS ---");
const iterativeResult = DFSAlgorithm.dfsIterative(testGraph, 1);
console.log("Iterative Result:", iterativeResult);
// Expected: [1, 2, 4, 5, 3] (Order depends on stack push order, but logic holds)

// Simple assertion
function arraysEqual(a: number[], b: number[]) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

if (arraysEqual(recursiveResult, [1, 2, 4, 5, 3])) {
    console.log("✅ Recursive Test Passed");
} else {
    console.error("❌ Recursive Test Failed");
}

if (arraysEqual(iterativeResult, [1, 2, 4, 5, 3])) {
    console.log("✅ Iterative Test Passed");
} else {
    console.error("❌ Iterative Test Failed");
}
