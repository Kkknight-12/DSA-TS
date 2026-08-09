/**
 * BINARY TREE POSTORDER TRAVERSAL - RECURSIVE
 * ============================================
 *
 * Prerequisite:
 * Basic recursion, base case, and function call stack.
 *
 * Problem:
 * Binary tree ki values postorder order me return karni hain.
 *
 * Postorder:
 *   LEFT -> RIGHT -> ROOT
 *
 * Intuition:
 * Har recursive call ek complete subtree handle karti hai.
 * Current node ko tab tak result me add nahi karte jab tak
 * uski left aur right dono recursive calls return nahi ho jati.
 *
 * Algorithm:
 * 1. Empty `result` array banao.
 * 2. Root ke saath recursive helper start karo.
 * 3. Agar current node `null` hai, return karo; branch empty hai.
 * 4. Current node ki complete left subtree recursively traverse karo.
 * 5. Left return ke baad complete right subtree recursively traverse karo.
 * 6. Dono child calls return hone ke baad current node ki value result me add karo.
 * 7. Saari calls complete hone par `result` return karo.
 *
 * Time Complexity:
 *   O(n), kyunki har real node exactly ek baar visit hota hai.
 *
 * Space Complexity:
 *   O(h) auxiliary call stack, jahan `h` tree ki height hai.
 *   Balanced tree me O(log n), skewed tree me O(n).
 */

namespace BinaryTreePostorderTraversalRecursive {
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

  function postorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];

    traverse(root, result);

    return result;
  }

  function traverse(node: TreeNode | null, result: number[]): void {
    if (node === null) {
      // Empty branch postorder sequence me kuch contribute nahi karti.
      // Caller par return karke us frame ka next pending event resume hota hai.
      return;
    }

    // Parent ko visit karna abhi allowed nahi hai;
    // pehle uski complete left subtree finish honi chahiye.
    traverse(node.left, result);

    // Left done hai, but parent abhi bhi pending hai;
    // postorder me right subtree bhi parent se pehle aati hai.
    traverse(node.right, result);

    // LEFT aur RIGHT dono return ho gaye.
    // Ab ROOT ka exact postorder turn hai.
    result.push(node.val);
  }

  /**
   * ==========================================================
   * FIRST EXAMPLE: REPRESENTATION TO TREE
   * ==========================================================
   *
   * Input representation:
   *   [1, null, 2, 3]
   *
   * Actual tree passed to postorderTraversal:
   *
   *       1
   *        \
   *         2
   *        /
   *       3
   *
   * Recursive events:
   *
   * root  (traverse node=1, result=[])
   * ├── LEFT: traverse(null) -> BASE CASE, return
   * ├── RIGHT: traverse(2)
   * │   ├── LEFT: traverse(3)
   * │   │   ├── LEFT: traverse(null) -> BASE CASE, return
   * │   │   ├── RIGHT: traverse(null) -> BASE CASE, return
   * │   │   └── VISIT 3 -> result=[3], return
   * │   ├── RIGHT: traverse(null) -> BASE CASE, return
   * │   └── VISIT 2 -> result=[3,2], return
   * └── VISIT 1 -> result=[3,2,1]
   *
   * Final result: [3, 2, 1]
   *
   * ==========================================================
   * NESTED CALL-FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: postorderTraversal(root=1)
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
   * │ RIGHT CALL: traverse(2, result)                                   │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: traverse(node=2, result=[])                        │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ node is null? Nahi                                        │   │
   * │   │                                                            │   │
   * │   │ LEFT CALL: traverse(3, result)                            │   │
   * │   │                                                            │   │
   * │   │   ┌────────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 3: traverse(node=3, result=[])                │   │   │
   * │   │   ├────────────────────────────────────────────────────┤   │   │
   * │   │   │ LEFT CALL: null -> BASE CASE, return              │   │   │
   * │   │   │ RIGHT CALL: null -> BASE CASE, return             │   │   │
   * │   │   │ Both children done                                │   │   │
   * │   │   │ VISIT 3 -> result=[3]                             │   │   │
   * │   │   │ CALL 3 complete -> return to CALL 2               │   │   │
   * │   │   └────────────────────────────────────────────────────┘   │   │
   * │   │                                                            │   │
   * │   │ Resume CALL 2 after left return                           │   │
   * │   │ RIGHT CALL: null -> BASE CASE, return                     │   │
   * │   │ Both children done                                        │   │
   * │   │ VISIT 2 -> result=[3,2]                                  │   │
   * │   │ CALL 2 complete -> return to CALL 1                       │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ Resume CALL 1 after right return                                  │
   * │ Both children done                                                │
   * │ VISIT 1 -> result=[3,2,1]                                        │
   * │ CALL 1 complete                                                   │
   * └────────────────────────────────────────────────────────────────────┘
   *
   * EDGE CASES:
   * 1. null root -> []
   * 2. single node -> [value]
   * 3. skewed tree -> deepest node se root tak values
   * 4. duplicate values remain separate tree nodes
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
        expected: [3, 2, 1],
      },
      {
        name: 'given example 2',
        input: [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9],
        expected: [4, 6, 7, 5, 2, 9, 8, 3, 1],
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
        expected: [4, 3, 2, 1],
      },
      {
        name: 'negative values',
        input: [-1, -2, -3],
        expected: [-2, -3, -1],
      },
      {
        name: 'complete tree',
        input: [1, 2, 3, 4, 5, 6, 7],
        expected: [4, 5, 2, 6, 7, 3, 1],
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
      const result = postorderTraversal(root);

      if (arraysEqual(result, testCase.expected)) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected:', testCase.expected);
        console.error('Received:', result);
      }
    }

    console.log(
      `BinaryTreePostorderTraversalRecursive: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

BinaryTreePostorderTraversalRecursive.runTests();
