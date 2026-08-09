/**
 * BINARY TREE PREORDER TRAVERSAL - RECURSIVE
 * ===========================================
 *
 * Prerequisite:
 * Basic recursion, base case, and function call stack.
 *
 * Problem:
 * Binary tree ki values preorder order me return karni hain.
 *
 * Preorder:
 *   ROOT -> LEFT -> RIGHT
 *
 * Intuition:
 * Current function call ek node represent karta hai.
 * Pehle current node ko answer me add karte hain.
 * Fir same kaam left child aur right child ke liye recursively karte hain.
 *
 * Algorithm:
 * 1. Empty `result` array banao.
 * 2. Helper ko root ke saath call karo.
 * 3. Agar current node `null` hai, turant return karo; is branch me visit karne ko kuch nahi.
 * 4. Current node ki value result me add karo, kyunki preorder root-first hota hai.
 * 5. Left child par recurse karo, kyunki left subtree right se pehle aati hai.
 * 6. Left call return hone ke baad right child par recurse karo.
 * 7. Saari calls complete hone par result return karo.
 *
 * Time Complexity:
 *   O(n), har non-null node exactly ek baar visit hota hai.
 *
 * Space Complexity:
 *   O(h) auxiliary call stack, jahan h tree height hai.
 *   Skewed tree me h = n, balanced tree me h = log n.
 */

namespace BinaryTreePreorderTraversalRecursive {
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

  function preorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    traverse(root, result);

    return result;
  }

  function traverse(node: TreeNode | null, result: number[]): void {
    if (node === null) {
      // Null child ka matlab current branch yahin end ho gayi.
      // Is frame ko return karke caller ki next branch continue karte hain.
      return;
    }

    // Preorder me current node ko children se pehle visit karna mandatory hai.
    result.push(node.val);

    // Left subtree ko pehle fully complete karte hain.
    // Is call ke return hone ke baad hi current frame right subtree start karega.
    traverse(node.left, result);

    // Left branch consume ho chuki hai; ab same parent ki right branch explore hoti hai.
    traverse(node.right, result);
  }

  /**
   * ==========================================================
   * RECURSION TREE
   * ==========================================================
   *
   * Example tree:
   *
   *       1
   *      / \
   *     2   3
   *
   * root  (traverse node=1, result=[])
   * ├── VISIT 1 -> result=[1]
   * ├── LEFT: traverse(2)
   * │   ├── VISIT 2 -> result=[1,2]
   * │   ├── LEFT: traverse(null) -> BASE CASE, return
   * │   ├── RIGHT: traverse(null) -> BASE CASE, return
   * │   └── return to traverse(1)
   * ├── RIGHT: traverse(3)
   * │   ├── VISIT 3 -> result=[1,2,3]
   * │   ├── LEFT: traverse(null) -> BASE CASE, return
   * │   ├── RIGHT: traverse(null) -> BASE CASE, return
   * │   └── return to traverse(1)
   * └── traversal complete
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: preorderTraversal(root=1)
   * - result = []
   * - Start: traverse(1, result)
   *
   * ┌────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: traverse(node=1, result=[])                               │
   * ├────────────────────────────────────────────────────────────────────┤
   * │ node is null? Nahi                                                │
   * │ result.push(1) -> result=[1]                                      │
   * │                                                                    │
   * │ LEFT CALL: traverse(2, result)                                    │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: traverse(node=2, result=[1])                       │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ node is null? Nahi                                        │   │
   * │   │ result.push(2) -> result=[1,2]                            │   │
   * │   │                                                            │   │
   * │   │ LEFT CALL: traverse(null)                                 │   │
   * │   │ -> BASE CASE, return                                      │   │
   * │   │                                                            │   │
   * │   │ Resume CALL 2 after left return                           │   │
   * │   │ RIGHT CALL: traverse(null)                                │   │
   * │   │ -> BASE CASE, return                                      │   │
   * │   │                                                            │   │
   * │   │ CALL 2 complete -> return to CALL 1                       │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ Resume CALL 1 after left subtree                                 │
   * │ RIGHT CALL: traverse(3, result)                                   │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 3: traverse(node=3, result=[1,2])                     │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ node is null? Nahi                                        │   │
   * │   │ result.push(3) -> result=[1,2,3]                          │   │
   * │   │ LEFT CALL: null -> return                                 │   │
   * │   │ RIGHT CALL: null -> return                                │   │
   * │   │ CALL 3 complete -> return to CALL 1                       │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ CALL 1 complete                                                   │
   * └────────────────────────────────────────────────────────────────────┘
   *
   * Final result:
   *   [1, 2, 3]
   *
   * EDGE CASES:
   * 1. null root -> []
   * 2. single node -> [value]
   * 3. only-left / only-right trees still follow root-left-right
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

  function arraysEqual(first: number[], second: number[]): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  }

  export function runTests(): void {
    const testCases: Array<{
      name: string;
      input: Array<number | null>;
      expected: number[];
    }> = [
      {
        name: 'given example 1',
        input: [1, null, 2, 3],
        expected: [1, 2, 3],
      },
      {
        name: 'given example 2',
        input: [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9],
        expected: [1, 2, 4, 5, 6, 7, 3, 8, 9],
      },
      { name: 'empty tree', input: [], expected: [] },
      { name: 'single node', input: [1], expected: [1] },
      {
        name: 'left-skewed tree',
        input: [1, 2, null, 3, null, 4],
        expected: [1, 2, 3, 4],
      },
      {
        name: 'right-skewed tree',
        input: [1, null, 2, null, 3, null, 4],
        expected: [1, 2, 3, 4],
      },
      {
        name: 'negative values',
        input: [-1, -2, -3],
        expected: [-1, -2, -3],
      },
      {
        name: 'complete tree',
        input: [1, 2, 3, 4, 5, 6, 7],
        expected: [1, 2, 4, 5, 3, 6, 7],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const root = buildTree(testCase.input);
      const result = preorderTraversal(root);

      if (arraysEqual(result, testCase.expected)) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected:', testCase.expected);
        console.error('Received:', result);
      }
    }

    console.log(
      `BinaryTreePreorderTraversalRecursive: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

BinaryTreePreorderTraversalRecursive.runTests();
