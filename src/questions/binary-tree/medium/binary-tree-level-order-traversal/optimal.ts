/**
 * BINARY TREE LEVEL ORDER TRAVERSAL - OPTIMAL BFS
 * =================================================
 *
 * Prerequisite:
 * Queue ka FIFO behavior, basic BFS, aur level-order tree representation.
 *
 * Problem:
 * Binary tree ki values left-to-right, level-by-level groups me return karni hain.
 *
 * Example output:
 *   [[3], [9, 20], [15, 7]]
 *
 * Intuition:
 * Queue hamesha next visit hone wale nodes ko left-to-right order me hold karti hai.
 * Outer loop ke start par pending queue suffix exactly current level hota hai.
 *
 * Current level process karte waqt children queue me add honge,
 * but woh next level ke nodes hain. Isliye queue grow hone se pehle
 * `levelSize = queue.length - head` capture karte hain.
 * Exactly itne nodes current level array me jayenge.
 *
 * Algorithm:
 * 1. Agar root `null` hai, empty outer array return karo.
 * 2. Empty `result`, root-containing `queue`, aur `head = 0` initialize karo.
 * 3. Jab tak `head < queue.length`, ek new level start karo.
 * 4. `levelSize = queue.length - head` snapshot lo; ye current level ki frozen count hai.
 * 5. Empty `currentLevel` array banao.
 * 6. Exactly `levelSize` nodes ko `queue[head]` se consume karo aur `head` move karo.
 * 7. Har consumed node ki value `currentLevel` me add karo.
 * 8. Real left child ko pehle aur real right child ko baad me enqueue karo.
 * 9. Inner loop ke baad completed `currentLevel` ko result me add karo.
 * 10. Queue ke saare pending nodes consume hone par result return karo.
 *
 * Time Complexity:
 *   O(n), har real node exactly once enqueue, consume, aur output me append hota hai.
 *   `shift()` use nahi hota, so front removal ke liye array reindexing nahi hoti.
 *
 * Space Complexity:
 *   O(n) auxiliary space for this concrete growing-array queue implementation.
 *   Logically unprocessed BFS frontier maximum tree width `w` tak hota hai,
 *   but processed array slots function end tak retained rehte hain.
 *   Required output bhi O(n) values store karta hai.
 */

namespace BinaryTreeLevelOrderTraversalOptimal {
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

  function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) {
      // Empty tree me ek bhi level nahi hota,
      // so `[[]]` nahi, directly `[]` return hota hai.
      return [];
    }

    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    let head = 0;

    // `head` se queue end tak ka suffix abhi unprocessed nodes ko represent karta hai.
    while (head < queue.length) {
      // Snapshot mandatory hai: inner loop children append karega aur queue grow hogi,
      // but appended children next level ke hain, current level ke nahi.
      const levelSize = queue.length - head;
      const currentLevel: number[] = [];

      for (let processed = 0; processed < levelSize; processed++) {
        const current = queue[head++];

        // Current level ke nodes FIFO order me consume ho rahe hain,
        // so values automatically left-to-right append hoti hain.
        currentLevel.push(current.val);

        if (current.left !== null) {
          // Parent left-to-right consume hote hain aur each parent ka left child first
          // enqueue hota hai; together ye next level ka left-to-right order preserve karta hai.
          queue.push(current.left);
        }

        if (current.right !== null) {
          queue.push(current.right);
        }
      }

      // Exactly frozen `levelSize` nodes complete hue,
      // so ye array ek whole level represent karti hai.
      result.push(currentLevel);
    }

    return result;
  }

  /**
   * ═════════════════════════════════════════════════════════════════════
   * WHY LEVEL SIZE MUST BE FROZEN
   * ═════════════════════════════════════════════════════════════════════
   *
   * Tree:
   *
   *       3
   *      / \
   *     9  20
   *
   * Level 0 start:
   *
   *   queue=[3]
   *   head=0
   *   pending count=1
   *
   * Processing `3` appends `9` and `20`:
   *
   *   queue=[3,9,20]
   *   head=1
   *
   * Queue length ab 3 hai, but current level me still sirf node `3` tha.
   * Frozen `levelSize=1` inner loop ko yahin stop karta hai.
   * Pending suffix `[9,20]` next outer iteration ka level hai.
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
   *   result=[]
   *   queue=[3]
   *   head=0
   *
   * ┌──────────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 1 - LEVEL 0                                     │
   * ├──────────────────────────────────────────────────────────────────┤
   * │ Start: queue=[3], head=0                                        │
   * │ Freeze levelSize=1                                              │
   * │ currentLevel=[]                                                  │
   * │                                                                  │
   * │ Inner 1/1: consume queue[0] = 3, head becomes 1                 │
   * │   currentLevel=[3]                                               │
   * │   enqueue left 9, then right 20                                 │
   * │   queue=[3 | 9,20]                                               │
   * │                                                                  │
   * │ One frozen node processed -> stop this level                    │
   * │ result=[[3]]                                                     │
   * └──────────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 2 - LEVEL 1                                     │
   * ├──────────────────────────────────────────────────────────────────┤
   * │ Start: queue=[3 | 9,20], head=1                                 │
   * │ Freeze levelSize=3-1=2                                          │
   * │ currentLevel=[]                                                  │
   * │                                                                  │
   * │ Inner 1/2: consume 9, head=2                                    │
   * │   currentLevel=[9]                                               │
   * │   no real children                                               │
   * │                                                                  │
   * │ Inner 2/2: consume 20, head=3                                   │
   * │   currentLevel=[9,20]                                            │
   * │   enqueue left 15, then right 7                                 │
   * │   queue=[3,9,20 | 15,7]                                         │
   * │                                                                  │
   * │ Two frozen nodes processed -> stop this level                   │
   * │ result=[[3],[9,20]]                                              │
   * └──────────────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────────────┐
   * │ OUTER ITERATION 3 - LEVEL 2                                     │
   * ├──────────────────────────────────────────────────────────────────┤
   * │ Start: queue=[3,9,20 | 15,7], head=3                            │
   * │ Freeze levelSize=5-3=2                                          │
   * │                                                                  │
   * │ Inner 1/2: consume 15 -> currentLevel=[15], no children         │
   * │ Inner 2/2: consume 7  -> currentLevel=[15,7], no children       │
   * │ head=5                                                           │
   * │                                                                  │
   * │ result=[[3],[9,20],[15,7]]                                      │
   * └──────────────────────────────────────────────────────────────────┘
   *
   * End condition:
   *   head=5, queue.length=5
   *   no pending nodes remain
   *
   * EDGE CASES:
   * 1. null root -> []
   * 2. single node -> [[value]]
   * 3. skewed tree -> every level has exactly one value
   * 4. sparse tree -> null children are never enqueued
   * 5. duplicate values remain separate node references in the queue
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

    // Ye queue sirf test serialization ko real tree me convert karti hai.
    // Solution ke `levelOrder` queue se iska purpose separate hai.
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

  function nestedArraysEqual(first: number[][], second: number[][]): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  }

  export function runTests(): void {
    const testCases: Array<{
      name: string;
      input: Array<number | null>;
      expected: number[][];
    }> = [
      {
        name: 'given example',
        input: [3, 9, 20, null, null, 15, 7],
        expected: [[3], [9, 20], [15, 7]],
      },
      { name: 'empty tree', input: [], expected: [] },
      { name: 'single node', input: [1], expected: [[1]] },
      {
        name: 'complete tree',
        input: [1, 2, 3, 4, 5, 6, 7],
        expected: [[1], [2, 3], [4, 5, 6, 7]],
      },
      {
        name: 'left-skewed tree',
        input: [1, 2, null, 3, null, 4],
        expected: [[1], [2], [3], [4]],
      },
      {
        name: 'right-skewed tree',
        input: [1, null, 2, null, 3, null, 4],
        expected: [[1], [2], [3], [4]],
      },
      {
        name: 'familiar null gap',
        input: [1, null, 2, 3],
        expected: [[1], [2], [3]],
      },
      {
        name: 'uneven wide tree',
        input: [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9],
        expected: [[1], [2, 3], [4, 5, 8], [6, 7, 9]],
      },
      {
        name: 'constraint extremes and duplicates',
        input: [1000, -1000, -1000, null, 0, 0, null],
        expected: [[1000], [-1000, -1000], [0, 0]],
      },
      {
        name: 'irregular gaps',
        input: [1, 2, 3, null, 4, null, 5, 6, null, null, 7],
        expected: [[1], [2, 3], [4, 5], [6, 7]],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const root = buildTree(testCase.input);
      const result = levelOrder(root);

      if (nestedArraysEqual(result, testCase.expected)) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected:', testCase.expected);
        console.error('Received:', result);
      }
    }

    console.log(
      `BinaryTreeLevelOrderTraversalOptimal: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

BinaryTreeLevelOrderTraversalOptimal.runTests();
