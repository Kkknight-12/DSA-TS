/**
 * BINARY TREE INORDER TRAVERSAL - ITERATIVE
 * ==========================================
 *
 * Prerequisite:
 * Stack ka LIFO behavior aur recursive inorder ka LEFT -> ROOT -> RIGHT order.
 *
 * Problem:
 * Binary tree ki values inorder order me return karni hain.
 *
 * Inorder:
 *   LEFT -> ROOT -> RIGHT
 *
 * Intuition:
 * Inorder me current node ko immediately visit nahi kar sakte,
 * kyunki pehle uski complete left subtree process honi chahiye.
 *
 * Jab hum left ki taraf move karte hain,
 * har ancestor ko stack me pause kar dete hain.
 * Null left milne par nearest paused node pop hota hai:
 * uski left subtree complete hai, so ab us node ko visit karne ka exact turn hai.
 * Visit ke baad uski right subtree par same process repeat hota hai.
 *
 * Algorithm:
 * 1. Empty `result`, empty `stack`, aur `current = root` initialize karo.
 * 2. Jab tak `current` real node hai ya stack me paused node hai, continue karo.
 * 3. `current` se repeatedly left jao; har real node ko move se pehle stack me push karo.
 * 4. Null left milne par stack ka top pop karo; wahi nearest unfinished ancestor hai.
 * 5. Popped node ki value result me add karo, kyunki uski left subtree complete ho chuki hai.
 * 6. `current` ko popped node ke right child par move karo.
 * 7. Step 2 se repeat karo; loop end hone par result return karo.
 *
 * Time Complexity:
 *   O(n), har node exactly once push, pop, aur visit hota hai.
 *
 * Space Complexity:
 *   O(h) explicit stack, jahan `h` tree ki height hai.
 *   Balanced tree me O(log n), skewed tree me O(n).
 */

namespace BinaryTreeInorderTraversalIterative {
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
    const stack: TreeNode[] = [];
    let current = root;

    // `current` active subtree ko represent karta hai.
    // Stack un ancestors ko hold karta hai jinki left side explore ho rahi hai,
    // but jinhe abhi visit aur right-process karna baaki hai.
    while (current !== null || stack.length > 0) {
      while (current !== null) {
        // Node ko pause karna zaroori hai: left se return hone ke baad
        // isi node ko visit karke iski right subtree start karni hai.
        stack.push(current);
        current = current.left;
      }

      // Inner loop sirf null left boundary par rukta hai.
      // Stack top nearest paused ancestor hai, so uski left subtree complete hai.
      current = stack.pop()!;
      result.push(current.val);

      // LEFT aur ROOT done hain; ab isi node ka RIGHT inorder sequence pending hai.
      current = current.right;
    }

    return result;
  }

  /**
   * ==========================================================
   * STACK KA REAL MEANING
   * ==========================================================
   *
   * Tree:
   *
   *         1
   *        / \
   *       2   3
   *      /
   *     4
   *
   * Left descent:
   *
   *   push 1 -> stack=[1]       // 1 waits for its left subtree
   *   push 2 -> stack=[1,2]     // 2 waits for its left subtree
   *   push 4 -> stack=[1,2,4]   // 4 waits for its left subtree
   *   move left -> null
   *
   * Stack top `4` nearest unfinished ancestor hai.
   * `4.left` complete hai, so pop ke moment par `4` visit hoga.
   *
   * Important:
   * Stack "nodes to visit in reverse order" ki random list nahi hai.
   * Har entry ek paused call frame hai.
   *
   * ==========================================================
   * FULL DRY RUN - GIVEN EXAMPLE 1
   * ==========================================================
   *
   * Tree:
   *
   *       1
   *        \
   *         2
   *        /
   *       3
   *
   * Stack notation:
   *   [bottom ... top]
   *
   * Initial:
   *   current=1
   *   stack=[]
   *   result=[]
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 1                                            │
   * ├──────────────────────────────────────────────────────────────┤
   * │ Left descent:                                                │
   * │   push 1 -> stack=[1]                                       │
   * │   current=1.left=null                                       │
   * │                                                              │
   * │ Pop 1: its left subtree is complete                         │
   * │ Visit 1 -> result=[1]                                       │
   * │ Move right -> current=2                                     │
   * └──────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 2                                            │
   * ├──────────────────────────────────────────────────────────────┤
   * │ Left descent:                                                │
   * │   push 2 -> stack=[2], current=3                            │
   * │   push 3 -> stack=[2,3], current=null                       │
   * │                                                              │
   * │ Pop 3: its left subtree is complete                         │
   * │ Visit 3 -> result=[1,3]                                     │
   * │ Move right -> current=null                                  │
   * └──────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 3                                            │
   * ├──────────────────────────────────────────────────────────────┤
   * │ current=null, so left-descent loop skip                      │
   * │ stack still has [2], so outer loop continues                │
   * │                                                              │
   * │ Pop 2: its left subtree (node 3) is complete                │
   * │ Visit 2 -> result=[1,3,2]                                   │
   * │ Move right -> current=null                                  │
   * └──────────────────────────────────────────────────────────────┘
   *
   * End:
   *   current=null and stack=[]
   *   result=[1,3,2]
   *
   * EDGE CASES:
   * 1. null root -> outer loop never runs -> []
   * 2. single node -> push, pop, visit -> [value]
   * 3. left-skewed tree -> all nodes stack me, deepest node first visit
   * 4. right-skewed tree -> each node immediately pop, then right move
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

    // Level-order array se actual linked nodes sirf test setup ke liye bante hain.
    // Traversal function ko ye array nahi, returned root node receive hota hai.
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
      `BinaryTreeInorderTraversalIterative: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

BinaryTreeInorderTraversalIterative.runTests();
