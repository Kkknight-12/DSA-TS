/**
 * BINARY TREE INORDER TRAVERSAL - RECURSIVE
 * ==========================================
 *
 * Prerequisite:
 * Basic recursion, base case, and function call stack.
 *
 * Problem:
 * Binary tree ki values inorder order me return karni hain.
 *
 * Inorder:
 *   LEFT -> ROOT -> RIGHT
 *
 * Intuition:
 * Har recursive call ek subtree ko handle karti hai.
 * Current node ko dekhte hi result me add nahi karte.
 * Pehle left call ko completely return hone dete hain,
 * tab current node visit hota hai, aur uske baad right call start hoti hai.
 *
 * Algorithm:
 * 1. Empty `result` array banao.
 * 2. Root ke liye recursive helper call karo.
 * 3. Agar current node `null` hai, return karo; branch empty hai.
 * 4. Current node ki complete left subtree recursively traverse karo.
 * 5. Left call return hone ke baad current node ki value result me add karo.
 * 6. Current node ki complete right subtree recursively traverse karo.
 * 7. Saari calls complete hone par `result` return karo.
 *
 * Time Complexity:
 *   O(n), kyunki har real node exactly ek baar visit hota hai.
 *
 * Space Complexity:
 *   O(h) auxiliary call stack, jahan `h` tree ki height hai.
 *   Balanced tree me O(log n), skewed tree me O(n).
 */

namespace BinaryTreeInorderTraversalRecursive {
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

  function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    traverse(root, result);

    return result;
  }

  function traverse(node: TreeNode | null, result: number[]): void {
    if (node === null) {
      // Empty branch inorder sequence me kuch contribute nahi karti.
      // Caller par return karke us frame ki next inorder event continue hoti hai.
      return;
    }

    // Current node tab tak pending rahega jab tak uski poori left subtree finish nahi hoti.
    traverse(node.left, result);

    // Left call return ho gayi: ab LEFT -> ROOT order me ROOT ka exact turn hai.
    result.push(node.val);

    // Root visit ho chuka hai; ab inorder ka final part, RIGHT subtree, process hota hai.
    traverse(node.right, result);
  }

  /**
   * ==========================================================
   * FIRST EXAMPLE: REPRESENTATION TO TREE
   * ==========================================================
   *
   * Input representation:
   *   [1, null, 2, 3]
   *
   * Actual tree passed to inorderTraversal:
   *
   *       1
   *        \
   *         2
   *        /
   *       3
   *
   * Inorder events:
   *
   * root  (traverse node=1, result=[])
   * ├── LEFT: traverse(null) -> BASE CASE, return
   * ├── VISIT 1 -> result=[1]
   * └── RIGHT: traverse(2)
   *     ├── LEFT: traverse(3)
   *     │   ├── LEFT: traverse(null) -> BASE CASE, return
   *     │   ├── VISIT 3 -> result=[1,3]
   *     │   └── RIGHT: traverse(null) -> BASE CASE, return
   *     ├── VISIT 2 -> result=[1,3,2]
   *     └── RIGHT: traverse(null) -> BASE CASE, return
   *
   * Final result: [1, 3, 2]
   *
   * ==========================================================
   * NESTED CALL-FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: inorderTraversal(root=1)
   * - result = []
   * - Start: traverse(1, result)
   *
   * ┌────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: traverse(node=1, result=[])                               │
   * ├────────────────────────────────────────────────────────────────────┤
   * │ node is null? Nahi                                                │
   * │                                                                    │
   * │ LEFT CALL: traverse(null)                                         │
   * │ -> BASE CASE, return                                              │
   * │                                                                    │
   * │ Resume CALL 1 after left return                                   │
   * │ VISIT 1 -> result=[1]                                             │
   * │                                                                    │
   * │ RIGHT CALL: traverse(2, result)                                   │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: traverse(node=2, result=[1])                       │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ node is null? Nahi                                        │   │
   * │   │                                                            │   │
   * │   │ LEFT CALL: traverse(3, result)                            │   │
   * │   │                                                            │   │
   * │   │   ┌────────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 3: traverse(node=3, result=[1])               │   │   │
   * │   │   ├────────────────────────────────────────────────────┤   │   │
   * │   │   │ LEFT CALL: null -> BASE CASE, return              │   │   │
   * │   │   │ VISIT 3 -> result=[1,3]                            │   │   │
   * │   │   │ RIGHT CALL: null -> BASE CASE, return             │   │   │
   * │   │   │ CALL 3 complete -> return to CALL 2               │   │   │
   * │   │   └────────────────────────────────────────────────────┘   │   │
   * │   │                                                            │   │
   * │   │ Resume CALL 2 after left subtree                          │   │
   * │   │ VISIT 2 -> result=[1,3,2]                                │   │
   * │   │ RIGHT CALL: null -> BASE CASE, return                     │   │
   * │   │ CALL 2 complete -> return to CALL 1                       │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ CALL 1 complete                                                   │
   * └────────────────────────────────────────────────────────────────────┘
   *
   * Final result:
   *   [1, 3, 2]
   *
   * EDGE CASES:
   * 1. null root -> []
   * 2. single node -> [value]
   * 3. left-skewed tree -> bottom node se root tak values
   * 4. right-skewed tree -> root se bottom node tak values
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

    // Array sirf level-order test representation hai.
    // Queue ke har real parent ko next left aur right slots assign hote hain.
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
        expected: [1, 3, 2],
      },
      {
        name: 'given example 2',
        input: [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9],
        expected: [4, 2, 6, 5, 7, 1, 3, 9, 8],
      },
      { name: 'empty tree', input: [], expected: [] },
      { name: 'single node', input: [1], expected: [1] },
      {
        name: 'left-skewed tree',
        input: [1, 2, null, 3, null, 4],
        expected: [4, 3, 2, 1],
      },
      {
        name: 'right-skewed tree',
        input: [1, null, 2, null, 3, null, 4],
        expected: [1, 2, 3, 4],
      },
      {
        name: 'negative values',
        input: [-1, -2, -3],
        expected: [-2, -1, -3],
      },
      {
        name: 'complete tree',
        input: [1, 2, 3, 4, 5, 6, 7],
        expected: [4, 2, 5, 1, 6, 3, 7],
      },
      {
        name: 'duplicate values remain separate nodes',
        input: [2, 2, 2],
        expected: [2, 2, 2],
      },
      {
        name: 'constraint boundary values',
        input: [100, -100, null],
        expected: [-100, 100],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const root = buildTree(testCase.input);
      const result = inorderTraversal(root);

      if (arraysEqual(result, testCase.expected)) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected:', testCase.expected);
        console.error('Received:', result);
      }
    }

    console.log(
      `BinaryTreeInorderTraversalRecursive: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

BinaryTreeInorderTraversalRecursive.runTests();
