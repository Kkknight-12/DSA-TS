/**
 * MAXIMUM DEPTH OF BINARY TREE - ITERATIVE BFS
 * ==============================================
 *
 * Prerequisite:
 * Queue ka FIFO behavior, BFS, aur level-order tree representation.
 *
 * Problem:
 * Root se farthest leaf tak longest path me jitne nodes hain,
 * utni tree ki maximum depth return karni hai.
 *
 * Intuition:
 * Tree ka har horizontal level root se ek aur node-distance represent karta hai.
 * Agar BFS se complete levels count kar lein,
 * to processed levels ki total count hi maximum depth ban jaati hai.
 *
 * Queue ke pending suffix ko current level maanenge.
 * Inner loop children append karega, so level start par pending node count freeze karna
 * mandatory hai:
 *
 *   levelSize = queue.length - head
 *
 * Exactly itne nodes process hone ke baad ek complete level finish hota hai,
 * aur tab `depth` exactly ek baar increment hoti hai.
 *
 * Algorithm:
 * 1. Agar root `null` hai, `0` return karo; empty tree ka koi level nahi hai.
 * 2. Root-containing `queue`, moving `head = 0`, aur `depth = 0` initialize karo.
 * 3. Jab tak `head < queue.length`, current level process karna start karo.
 * 4. `levelSize = queue.length - head` snapshot lo; ye frozen current-level count hai.
 * 5. Exactly `levelSize` nodes `queue[head]` se consume karo aur `head` move karo.
 * 6. Har real left child ko pehle aur right child ko baad me enqueue karo.
 * 7. Frozen level ke saare nodes complete hone ke baad `depth++` karo.
 * 8. Pending queue empty hone par `depth` return karo.
 *
 * Time Complexity:
 *   O(n), kyunki har real node exactly once enqueue aur consume hota hai.
 *   `shift()` use nahi hota, so repeated front-removal reindexing avoid hoti hai.
 *
 * Space Complexity:
 *   O(n) auxiliary space for this concrete growing-array queue implementation.
 *   Logically pending BFS frontier maximum tree width `w` tak hota hai,
 *   but processed entries queue array me function end tak retained rehte hain.
 */

namespace MaximumDepthOfBinaryTreeIterative {
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
      // Empty tree me ek bhi real level nahi hai.
      return 0;
    }

    const queue: TreeNode[] = [root];
    let head = 0;
    let depth = 0;

    // `head` se queue end tak ka suffix abhi unprocessed nodes ko represent karta hai.
    while (head < queue.length) {
      // Previous level ke saare nodes already consume ho chuke hain,
      // so current pending suffix exactly ek complete level hai.
      // Snapshot inner loop se pehle lo because children queue ko grow karenge.
      const levelSize = queue.length - head;

      for (let processed = 0; processed < levelSize; processed++) {
        const current = queue[head++];

        if (current.left !== null) {
          // Sirf real child enqueue hota hai; null phantom level create nahi karta.
          // Left first rakhna conventional left-to-right BFS order preserve karta hai.
          queue.push(current.left);
        }

        if (current.right !== null) {
          queue.push(current.right);
        }
      }

      // Per node increment nahi karna: exactly one frozen level complete hua hai,
      // isliye maximum root-to-current-level node count sirf ek badhta hai.
      depth++;
    }

    return depth;
  }

  /**
   * ═════════════════════════════════════════════════════════════════════
   * WHY `levelSize` MUST BE FROZEN
   * ═════════════════════════════════════════════════════════════════════
   *
   * Tree:
   *
   *       3
   *      / \
   *     9  20
   *
   * Level 1 start:
   *   queue=[3]
   *   head=0
   *   levelSize=1
   *
   * Node `3` process karte waqt `9` aur `20` append hote hain:
   *   queue=[3 | 9,20]
   *   head=1
   *
   * Queue grow ho gayi, but current level me sirf `3` tha.
   * Frozen `levelSize=1` inner loop ko stop karta hai.
   * Pending `[9,20]` next outer iteration ka level hai.
   *
   * ═════════════════════════════════════════════════════════════════════
   * FULL CODE-FLOW DRY RUN
   * ═════════════════════════════════════════════════════════════════════
   *
   * Input representation:
   *   [3,9,20,null,null,15,7]
   *
   * Actual tree:
   *
   *         3
   *        / \
   *       9  20
   *          / \
   *         15  7
   *
   * Queue notation:
   *   processed entries | pending suffix
   *
   * Initial:
   *   queue=[3]
   *   head=0
   *   depth=0
   *
   * ┌──────────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 1 - PROCESS ROOT LEVEL                          │
   * ├──────────────────────────────────────────────────────────────────┤
   * │ Start pending suffix=[3]                                       │
   * │ Freeze levelSize=1                                             │
   * │ Consume 3; enqueue left 9, then right 20                       │
   * │ queue=[3 | 9,20], head=1                                      │
   * │ One complete level finished -> depth=1                         │
   * └──────────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 2 - PROCESS NODES 9 AND 20                     │
   * ├──────────────────────────────────────────────────────────────────┤
   * │ Start pending suffix=[9,20]                                    │
   * │ Freeze levelSize=queue.length-head=3-1=2                       │
   * │ Consume 9; no real children                                    │
   * │ Consume 20; enqueue left 15, then right 7                      │
   * │ queue=[3,9,20 | 15,7], head=3                                 │
   * │ One more complete level finished -> depth=2                    │
   * └──────────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 3 - PROCESS NODES 15 AND 7                     │
   * ├──────────────────────────────────────────────────────────────────┤
   * │ Start pending suffix=[15,7]                                    │
   * │ Freeze levelSize=5-3=2                                         │
   * │ Consume 15; no children                                        │
   * │ Consume 7; no children                                         │
   * │ queue=[3,9,20,15,7 | ], head=5                                │
   * │ Third complete level finished -> depth=3                       │
   * └──────────────────────────────────────────────────────────────────┘
   *
   * End:
   *   head === queue.length
   *   no unprocessed nodes remain
   *   return depth=3
   *
   * EDGE CASES:
   * 1. null root -> 0 before queue creation
   * 2. single node -> one frozen level -> 1
   * 3. skewed tree -> every level has exactly one pending node
   * 4. wide tree -> a level can have many nodes, but depth increments once
   * 5. negative or duplicate values -> no effect; queue stores node references
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

    // Ye construction queue serialization ko tree me convert karti hai.
    // Solution queue ka job different hai: ready tree ke levels count karna.
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

  function buildRightSkewedTree(nodeCount: number): TreeNode | null {
    if (nodeCount === 0) {
      return null;
    }

    const root = new TreeNode(0);
    let current = root;

    for (let index = 1; index < nodeCount; index++) {
      // Values constraint ke andar cycle hoti hain; depth structure se aati hai,
      // value magnitude se nahi.
      current.right = new TreeNode((index % 201) - 100);
      current = current.right;
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
        name: 'constraint extreme and duplicate values',
        input: [-100, -100, 100, null, 0],
        expected: 3,
      },
      {
        name: 'deepest leaf appears in an uneven branch',
        input: [1, 2, 3, 4, null, null, 5, 6],
        expected: 4,
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

    // Recursive version par ye stress case intentionally nahi chalate:
    // 10^4-deep call stack JavaScript runtime limit cross kar sakti hai.
    const maximumConstraintDepth = 10_000;
    const deepRoot = buildRightSkewedTree(maximumConstraintDepth);
    const deepResult = maxDepth(deepRoot);

    if (deepResult === maximumConstraintDepth) {
      passedTests++;
    } else {
      console.error('Test failed: 10,000-node right-skewed stress tree');
      console.error('Expected:', maximumConstraintDepth);
      console.error('Received:', deepResult);
    }

    const totalTests = testCases.length + 1;

    console.log(
      `MaximumDepthOfBinaryTreeIterative: ${passedTests}/${totalTests} tests passed`
    );

    if (passedTests !== totalTests) {
      throw new Error('MaximumDepthOfBinaryTreeIterative test suite failed');
    }
  }
}

MaximumDepthOfBinaryTreeIterative.runTests();
