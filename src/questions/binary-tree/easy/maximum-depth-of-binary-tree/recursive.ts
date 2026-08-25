/**
 * MAXIMUM DEPTH OF BINARY TREE - RECURSIVE DFS
 * =================================================
 *
 * Prerequisite:
 * Basic recursion, base case, binary-tree nodes, aur function call stack.
 *
 * Problem:
 * Root se farthest leaf tak longest path me jitne nodes hain,
 * utni tree ki maximum depth return karni hai.
 *
 * Intuition:
 * Har node ko apni complete subtree ka answer return karna hai.
 * Current node tab tak final depth decide nahi kar sakta
 * jab tak left aur right child apni depths return nahi kar dete.
 *
 * Dono child depths milne ke baad:
 * - deeper child ka path choose karo
 * - current node ko count karne ke liye `1` add karo
 *
 * Formula:
 *   depth(node) = 1 + max(depth(node.left), depth(node.right))
 *
 * Base case:
 *   depth(null) = 0
 *
 * Algorithm:
 * 1. `maxDepth(root)` se current subtree ki recursive calculation start karo.
 * 2. Agar current root `null` hai, `0` return karo; empty branch me node nahi hai.
 * 3. Left child ki maximum depth recursively calculate karo.
 * 4. Right child ki maximum depth recursively calculate karo.
 * 5. `Math.max(leftDepth, rightDepth)` se longer child path choose karo.
 * 6. Current real node ko count karne ke liye chosen depth me `1` add karo.
 * 7. Calculated depth caller ko return karo; root call ka return final answer hai.
 *
 * Time Complexity:
 *   O(n), kyunki har real node exactly ek baar solve hota hai.
 *
 * Space Complexity:
 *   O(h) auxiliary call stack, jahan `h` tree ki maximum depth hai.
 *   Balanced tree me O(log n), completely skewed tree me O(n).
 *
 * Practical JavaScript note:
 *   Constraint 10^4 nodes tak hai. Extremely skewed tree me recursion depth bhi
 *   10^4 ho sakti hai, jo runtime call-stack limit cross kar sakti hai.
 *   `iterative.ts` ka BFS version is practical risk ko avoid karta hai.
 */

namespace MaximumDepthOfBinaryTreeRecursive {
  class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(
      val = 0,
      left: TreeNode | null = null,
      right: TreeNode | null = null
    ) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }

  function maxDepth(root: TreeNode | null): number {
    if (root === null) {
      // Empty branch longest path me koi real node contribute nahi karti.
      // Isliye parent ko neutral depth `0` milti hai.
      return 0;
    }

    // Current node ka answer bottom-up hai: pehle dono children apni subtree
    // depths return karenge, tab hum deeper path choose kar sakte hain.
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    // Math.max longer child path choose karta hai; `+ 1` current real node ko
    // count karta hai. Node value depth calculation ko affect nahi karti.
    return 1 + Math.max(leftDepth, rightDepth);
  }

  /**
   * ═════════════════════════════════════════════════════════════════════
   * REPRESENTATION TO TREE
   * ═════════════════════════════════════════════════════════════════════
   *
   * Input representation:
   *   [3,9,20,null,null,15,7]
   *
   * Test helper se actual tree:
   *
   *         3
   *        / \
   *       9  20
   *          / \
   *         15  7
   *
   * `maxDepth` ko upar wali array nahi,
   * actual `TreeNode` object `3` milta hai.
   *
   * ═════════════════════════════════════════════════════════════════════
   * BOTTOM-UP CALCULATION TREE
   * ═════════════════════════════════════════════════════════════════════
   *
   * root  maxDepth(3)
   * ├── LEFT: maxDepth(9)
   * │   ├── LEFT:  maxDepth(null) -> 0
   * │   ├── RIGHT: maxDepth(null) -> 0
   * │   └── RETURN: 1 + max(0,0) = 1
   * └── RIGHT: maxDepth(20)
   *     ├── LEFT: maxDepth(15)
   *     │   ├── children null -> 0,0
   *     │   └── RETURN: 1 + max(0,0) = 1
   *     ├── RIGHT: maxDepth(7)
   *     │   ├── children null -> 0,0
   *     │   └── RETURN: 1 + max(0,0) = 1
   *     └── RETURN: 1 + max(1,1) = 2
   *
   * Root calculation:
   *   leftDepth=1
   *   rightDepth=2
   *   return 1 + max(1,2) = 3
   *
   * ═════════════════════════════════════════════════════════════════════
   * NESTED CALL-FRAME DRY RUN
   * ═════════════════════════════════════════════════════════════════════
   *
   * Initial Call: maxDepth(root=3)
   * - Start: solve left and right subtree depths
   * - Final answer is returned by CALL 1
   *
   * ┌────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: maxDepth(node=3)                                         │
   * ├────────────────────────────────────────────────────────────────────┤
   * │ node is null? Nahi                                                │
   * │ leftDepth ke liye maxDepth(9)                                    │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: maxDepth(node=9)                                  │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ left null  -> 0                                           │   │
   * │   │ right null -> 0                                           │   │
   * │   │ return 1 + max(0,0) = 1                                  │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ Resume CALL 1: leftDepth=1                                       │
   * │ rightDepth ke liye maxDepth(20)                                  │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 3: maxDepth(node=20)                                 │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ maxDepth(15) -> 1                                         │   │
   * │   │ maxDepth(7)  -> 1                                         │   │
   * │   │ return 1 + max(1,1) = 2                                  │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ Resume CALL 1: rightDepth=2                                      │
   * │ choose max(1,2)=2                                                │
   * │ count current node: 1+2=3                                       │
   * │ return 3                                                         │
   * └────────────────────────────────────────────────────────────────────┘
   *
   * Final answer: 3
   *
   * EDGE CASES:
   * 1. null root -> 0
   * 2. single node -> 1 + max(0,0) = 1
   * 3. left-skewed tree -> every call waits for one deeper left call
   * 4. right-skewed tree -> every call waits for one deeper right call
   * 5. negative or duplicate values -> no effect; only structure matters
   */

  function buildTree(values: Array<number | null>): TreeNode | null {
    const rootValue = values[0];

    if (rootValue === null || rootValue === undefined) {
      return null;
    }

    const root = new TreeNode(rootValue);
    const queue: TreeNode[] = [root];
    let queueIndex = 0;
    let valueIndex = 1;

    // Ye queue sirf level-order test representation ko real tree me convert karti hai.
    // Sirf real nodes parent queue me jaate hain; `null` placeholder enqueue nahi hota.
    while (queueIndex < queue.length && valueIndex < values.length) {
      const current = queue[queueIndex++];
      const leftValue = values[valueIndex++];

      if (leftValue !== null && leftValue !== undefined) {
        current.left = new TreeNode(leftValue);
        queue.push(current.left);
      }

      if (valueIndex >= values.length) {
        break;
      }

      const rightValue = values[valueIndex++];

      if (rightValue !== null && rightValue !== undefined) {
        current.right = new TreeNode(rightValue);
        queue.push(current.right);
      }
    }

    return root;
  }

  export function runTests(): void {
    const testCases: Array<{
      name: string;
      input: Array<number | null>;
      expected: number;
    }> = [
      {
        name: 'given example 1',
        input: [3, 9, 20, null, null, 15, 7],
        expected: 3,
      },
      { name: 'given example 2', input: [1, null, 2], expected: 2 },
      { name: 'empty tree', input: [], expected: 0 },
      { name: 'single node', input: [1], expected: 1 },
      {
        name: 'complete three-level tree',
        input: [1, 2, 3, 4, 5, 6, 7],
        expected: 3,
      },
      {
        name: 'left-skewed tree',
        input: [1, 2, null, 3, null, 4],
        expected: 4,
      },
      {
        name: 'right-skewed tree',
        input: [1, null, 2, null, 3, null, 4, null, 5],
        expected: 5,
      },
      {
        name: 'familiar null gap',
        input: [1, null, 2, 3],
        expected: 3,
      },
      {
        name: 'negative and duplicate values',
        input: [0, -1, -1, null, -1],
        expected: 3,
      },
      {
        name: 'deepest leaf appears in an uneven branch',
        input: [1, 2, 3, 4, null, null, 5, 6],
        expected: 4,
      },
      {
        name: 'maximum node count in a shallow complete tree',
        input: Array<number>(10_000).fill(1),
        expected: 14,
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const root = buildTree(testCase.input);
      const result = maxDepth(root);

      if (result === testCase.expected) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected:', testCase.expected);
        console.error('Received:', result);
      }
    }

    console.log(
      `MaximumDepthOfBinaryTreeRecursive: ${passedTests}/${testCases.length} tests passed`
    );

    if (passedTests !== testCases.length) {
      throw new Error('MaximumDepthOfBinaryTreeRecursive test suite failed');
    }
  }
}

MaximumDepthOfBinaryTreeRecursive.runTests();
