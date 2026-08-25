/**
 * BINARY TREE PREORDER TRAVERSAL - ITERATIVE
 * ===========================================
 *
 * Prerequisite:
 * Stack ka LIFO behavior: last pushed node sabse pehle pop hota hai.
 *
 * Problem:
 * Binary tree ki values preorder order me return karni hain.
 *
 * Preorder:
 *   ROOT -> LEFT -> RIGHT
 *
 * Intuition:
 * Recursive solution me function call stack future subtrees remember karta hai.
 * Iterative solution me hum explicit array-based stack use karte hain.
 *
 * Current node pop karke visit hota hai.
 * Preorder me left pehle chahiye, but stack LIFO hai.
 * Isliye right child ko pehle push karte hain aur left ko baad me.
 * Left last push hoga, so left first pop hoga.
 *
 * Algorithm:
 * 1. Agar root null hai, empty array return karo.
 * 2. Empty result aur root-containing stack banao.
 * 3. Jab tak stack empty nahi hota, top node pop karo.
 * 4. Popped node ki value result me add karo; preorder root-first hota hai.
 * 5. Right child exist kare toh use pehle push karo.
 * 6. Left child exist kare toh use baad me push karo, taaki woh next pop ho.
 * 7. Stack empty hone par result return karo.
 *
 * Time Complexity:
 *   O(n), har node once push aur once pop hota hai.
 *
 * Space Complexity:
 *   O(h) typical traversal frontier, worst case O(n).
 */

namespace BinaryTreePreorderTraversalIterative {
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
    if (root === null) {
      return [];
    }

    const result: number[] = [];
    const stack: TreeNode[] = [root];

    while (stack.length > 0) {
      const current = stack.pop()!;

      // Pop hote hi node visit hota hai,
      // because preorder me root apne children se pehle aata hai.
      result.push(current.val);

      if (current.right !== null) {
        // Right subtree baad me process chahiye,
        // isliye LIFO stack me ise pehle push karte hain.
        stack.push(current.right);
      }

      if (current.left !== null) {
        // Left ko last push karne se woh stack top par aata hai
        // aur next iteration me right se pehle pop hota hai.
        stack.push(current.left);
      }
    }

    return result;
  }

  /**
   * ==========================================================
   * WHY RIGHT IS PUSHED BEFORE LEFT
   * ==========================================================
   *
   * Tree:
   *
   *       1
   *      / \
   *     2   3
   *
   * Desired preorder:
   *   1, 2, 3
   *
   * Stack is LIFO.
   * After visiting 1:
   *
   *   push right 3 -> stack=[3]
   *   push left 2  -> stack=[3,2]
   *                             ^ top
   *
   * Next pop gives 2.
   *
   * ==========================================================
   * DRY RUN - STACK CHANGES AT EVERY ITERATION
   * ==========================================================
   *
   * Tree:
   *
   *         1
   *        / \
   *       2   3
   *      / \
   *     4   5
   *
   * Stack notation:
   *   [bottom ... top]
   *
   * Initial:
   *   stack=[1]
   *   result=[]
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ ITERATION 1                                             │
   * ├────────────────────────────────────────────────────────┤
   * │ pop 1                                                   │
   * │ result=[1]                                              │
   * │ push right 3 -> [3]                                    │
   * │ push left 2  -> [3,2]                                  │
   * │ next pop will be 2                                     │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ ITERATION 2                                             │
   * ├────────────────────────────────────────────────────────┤
   * │ pop 2 from [3,2]                                       │
   * │ result=[1,2]                                            │
   * │ push right 5 -> [3,5]                                  │
   * │ push left 4  -> [3,5,4]                                │
   * │ next pop will be 4                                     │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ ITERATION 3                                             │
   * ├────────────────────────────────────────────────────────┤
   * │ pop 4 from [3,5,4]                                     │
   * │ result=[1,2,4]                                          │
   * │ no children -> stack=[3,5]                             │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ ITERATION 4                                             │
   * ├────────────────────────────────────────────────────────┤
   * │ pop 5 from [3,5]                                       │
   * │ result=[1,2,4,5]                                        │
   * │ no children -> stack=[3]                               │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ ITERATION 5                                             │
   * ├────────────────────────────────────────────────────────┤
   * │ pop 3                                                   │
   * │ result=[1,2,4,5,3]                                      │
   * │ stack=[]                                                │
   * └────────────────────────────────────────────────────────┘
   *
   * Final preorder:
   *   [1, 2, 4, 5, 3]
   *
   * EDGE CASES:
   * 1. null root -> []
   * 2. single node -> [value]
   * 3. skewed tree -> stack still preserves preorder
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
      `BinaryTreePreorderTraversalIterative: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

BinaryTreePreorderTraversalIterative.runTests();
