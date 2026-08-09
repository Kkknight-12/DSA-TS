/**
 * BINARY TREE POSTORDER TRAVERSAL - ITERATIVE
 * ============================================
 *
 * Prerequisite:
 * Stack ka LIFO behavior aur postorder ka LEFT -> RIGHT -> ROOT order.
 *
 * Problem:
 * Binary tree ki values postorder order me return karni hain.
 *
 * Postorder:
 *   LEFT -> RIGHT -> ROOT
 *
 * Intuition:
 * Preorder me node pop hote hi visit ho sakta tha.
 * Postorder me node ko tab tak wait karna hai jab tak dono subtrees complete na hon.
 *
 * Isliye stack frame me node ke saath ek phase store karte hain:
 *
 *   expand -> children ka work abhi schedule karna hai
 *   visit  -> jab ye frame pop hoga, children finish honge; tab node answer me jayega
 *
 * Stack LIFO hai, so desired execution LEFT, RIGHT, ROOT ko reverse order me
 * schedule karte hain: ROOT-visit marker, RIGHT-expand, then LEFT-expand.
 * Left top par hoga, isliye sabse pehle execute hoga.
 *
 * Algorithm:
 * 1. Agar root `null` hai, empty array return karo.
 * 2. Empty result aur root ka `expand` frame containing stack banao.
 * 3. Stack se top frame pop karo.
 * 4. Agar phase `visit` hai, node ki value result me add karo.
 * 5. Agar phase `expand` hai, same node ka `visit` frame pehle push karo.
 * 6. Phir real right child ka `expand` frame push karo.
 * 7. Phir real left child ka `expand` frame push karo, taaki LIFO me left first aaye.
 * 8. Stack empty hone tak repeat karo, then result return karo.
 *
 * Time Complexity:
 *   O(n), har node ka ek expand aur ek visit frame process hota hai.
 *
 * Space Complexity:
 *   O(h) auxiliary stack, jahan `h` tree ki height hai.
 *   Stack ek active root-to-leaf path ke postponed visit/right work ko hold karta hai.
 *   Balanced tree me O(log n), skewed tree me O(n).
 */

namespace BinaryTreePostorderTraversalIterative {
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

  type TraversalPhase = 'expand' | 'visit';

  interface TraversalFrame {
    node: TreeNode;
    phase: TraversalPhase;
  }

  function postorderTraversal(root: TreeNode | null): number[] {
    if (root === null) {
      return [];
    }

    const result: number[] = [];
    const stack: TraversalFrame[] = [{ node: root, phase: 'expand' }];

    while (stack.length > 0) {
      const frame = stack.pop()!;
      const current = frame.node;

      if (frame.phase === 'visit') {
        // Ye marker children ke neeche push hua tha.
        // Ab marker top par wapas aaya, meaning left aur right work complete hai.
        result.push(current.val);
        continue;
      }

      // Desired execution LEFT -> RIGHT -> ROOT hai.
      // Stack LIFO hone ki wajah se work reverse order me schedule hota hai.

      // Root visit sabse last chahiye, so iska marker sabse pehle/bottom push hota hai.
      stack.push({ node: current, phase: 'visit' });

      if (current.right !== null) {
        // Right left ke baad execute chahiye, so right ko left se pehle push karte hain.
        stack.push({ node: current.right, phase: 'expand' });
      }

      if (current.left !== null) {
        // Left last push hokar stack top par aata hai,
        // isliye current node ka next executed subtree left hoga.
        stack.push({ node: current.left, phase: 'expand' });
      }
    }

    return result;
  }

  /**
   * ==========================================================
   * WHY A PHASE IS NEEDED
   * ==========================================================
   *
   * Tree:
   *
   *       1
   *      / \
   *     2   3
   *
   * Agar `1` ko normal stack se pop karke immediately visit karein:
   *
   *   result=[1]
   *
   * Ye preorder behavior hai, postorder nahi.
   * Postorder me `1` ko do different moments par represent karna hai:
   *
   *   1:expand -> "mere children pehle schedule karo"
   *   1:visit  -> "mere children done; ab mujhe answer me add karo"
   *
   * ==========================================================
   * REVERSE SCHEDULING RULE
   * ==========================================================
   *
   * Desired execution:
   *
   *   LEFT -> RIGHT -> ROOT-VISIT
   *
   * Stack LIFO hai, so push reverse me:
   *
   *   push ROOT-VISIT
   *   push RIGHT-EXPAND
   *   push LEFT-EXPAND
   *
   * Stack:
   *
   *   [1:visit, 3:expand, 2:expand]
   *                                ^ top
   *
   * Pop order becomes:
   *
   *   2:expand -> complete left subtree
   *   3:expand -> complete right subtree
   *   1:visit  -> visit root last
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
   *   E = expand, V = visit
   *
   * Initial:
   *   stack=[1:E]
   *   result=[]
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ ITERATION 1                                                  │
   * ├──────────────────────────────────────────────────────────────┤
   * │ pop 1:E                                                     │
   * │ push 1:V                                                    │
   * │ right child 2 -> push 2:E                                  │
   * │ left child absent                                           │
   * │ stack=[1:V,2:E]                                             │
   * │ result=[]                                                    │
   * └──────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ ITERATION 2                                                  │
   * ├──────────────────────────────────────────────────────────────┤
   * │ pop 2:E                                                     │
   * │ push 2:V                                                    │
   * │ right child absent                                          │
   * │ left child 3 -> push 3:E                                   │
   * │ stack=[1:V,2:V,3:E]                                         │
   * │ result=[]                                                    │
   * └──────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ ITERATION 3                                                  │
   * ├──────────────────────────────────────────────────────────────┤
   * │ pop 3:E                                                     │
   * │ push 3:V                                                    │
   * │ no real children                                            │
   * │ stack=[1:V,2:V,3:V]                                         │
   * │ result=[]                                                    │
   * └──────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ ITERATION 4                                                  │
   * ├──────────────────────────────────────────────────────────────┤
   * │ pop 3:V -> both children done, visit 3                      │
   * │ stack=[1:V,2:V]                                             │
   * │ result=[3]                                                   │
   * └──────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ ITERATION 5                                                  │
   * ├──────────────────────────────────────────────────────────────┤
   * │ pop 2:V -> its subtree child 3 is done, visit 2             │
   * │ stack=[1:V]                                                  │
   * │ result=[3,2]                                                 │
   * └──────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────┐
   * │ ITERATION 6                                                  │
   * ├──────────────────────────────────────────────────────────────┤
   * │ pop 1:V -> its right subtree is done, visit 1               │
   * │ stack=[]                                                     │
   * │ result=[3,2,1]                                               │
   * └──────────────────────────────────────────────────────────────┘
   *
   * EDGE CASES:
   * 1. null root -> []
   * 2. single node -> expand frame schedules its own visit frame
   * 3. leaf visit marker immediately follows its expand frame
   * 4. skewed tree still delays every ancestor until its child completes
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
      `BinaryTreePostorderTraversalIterative: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

BinaryTreePostorderTraversalIterative.runTests();
