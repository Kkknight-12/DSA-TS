/**
 * BALANCED BINARY TREE - OPTIMAL ONE-PASS DFS
 * =============================================
 *
 * Prerequisite:
 * Maximum Depth recurrence, postorder DFS, recursion return values,
 * aur sentinel/status value ka idea.
 *
 * Problem:
 * Tree tab balanced hai jab har node par left aur right subtree heights ka
 * absolute difference at most `1` ho.
 *
 * Intuition:
 * Brute force height aur balance ko separately calculate karti hai,
 * so same descendants repeatedly visit ho sakte hain.
 *
 * Optimal approach me har subtree parent ko one combined report deti hai:
 *
 *   0 or positive height -> subtree balanced hai; ye uski real height hai
 *   -1                   -> subtree already unbalanced hai
 *
 * `-1` safe sentinel hai because valid node-count height kabhi negative nahi hoti.
 * Child report unbalanced ho to parent immediately same signal propagate kar sakta hai.
 * Otherwise parent child heights compare karke apni valid height return karta hai.
 *
 * Algorithm:
 * 1. Root par `heightOrUnbalanced` postorder helper start karo.
 * 2. Agar node `null` hai, valid height `0` return karo.
 * 3. Left subtree ka report calculate karo.
 * 4. Agar left report `-1` hai, immediately `-1` return karo; answer already fixed hai.
 * 5. Right subtree ka report calculate karo.
 * 6. Agar right report `-1` hai, immediately `-1` return karo.
 * 7. Agar absolute child-height difference `1` se greater hai, `-1` return karo.
 * 8. Otherwise current valid height `1 + max(leftHeight, rightHeight)` return karo.
 * 9. Final root report `-1` nahi hai to `true`, otherwise `false` return karo.
 *
 * Time Complexity:
 *   O(n), kyunki har visited node par height aur balance same call me decide hote hain.
 *   Early return kuch branches skip kar sakta hai, but worst case every node once visit hota hai.
 *
 * Space Complexity:
 *   O(h) auxiliary call stack, jahan `h` tree ki height hai.
 *   Balanced tree me O(log n), skewed tree me O(n).
 *
 * Practical JavaScript note:
 *   5000-node completely skewed tree recursion-stack limit cross kar sakti hai.
 *   Recurrence correct rahegi; stack-safe execution ke liye explicit postorder stack
 *   alternative use ki ja sakti hai.
 */

namespace BalancedBinaryTreeOptimal {
  const UNBALANCED = -1;

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

  function isBalanced(root: TreeNode | null): boolean {
    // Valid empty/tree height is always >= 0.
    // Only the sentinel means some node violated the balance rule.
    return heightOrUnbalanced(root) !== UNBALANCED;
  }

  function heightOrUnbalanced(node: TreeNode | null): number {
    if (node === null) {
      // Empty subtree balanced hai aur uski node-count height zero hai.
      return 0;
    }

    // Postorder: current node ko decide karne se pehle left report required hai.
    const leftHeight = heightOrUnbalanced(node.left);

    if (leftHeight === UNBALANCED) {
      // Left subtree me exact violating node kaun tha, parent ko dobara inspect nahi karna.
      // Ek false subtree complete ancestor chain ko false banati hai.
      return UNBALANCED;
    }

    const rightHeight = heightOrUnbalanced(node.right);

    if (rightHeight === UNBALANCED) {
      return UNBALANCED;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      // Both child reports valid heights the, but current node locally violates rule.
      return UNBALANCED;
    }

    // Current subtree balanced prove ho chuki hai.
    // Ab parent ko exactly wahi height return karo jo Maximum Depth me use hoti hai.
    return 1 + Math.max(leftHeight, rightHeight);
  }

  /**
   * ═════════════════════════════════════════════════════════════════════
   * RETURN CONTRACT
   * ═════════════════════════════════════════════════════════════════════
   *
   * heightOrUnbalanced(node) returns:
   *
   *   0  -> empty subtree, balanced
   *   1+ -> real subtree height, balanced
   *  -1  -> unbalanced signal; ye real height nahi hai
   *
   * Parent ko separate `{height, balanced}` object ki zarurat nahi.
   * One number dono possible states encode karta hai because valid heights
   * never negative hoti hain.
   *
   * ═════════════════════════════════════════════════════════════════════
   * BALANCED EXAMPLE - BOTTOM-UP REPORTS
   * ═════════════════════════════════════════════════════════════════════
   *
   *         3
   *        / \
   *       9  20
   *          / \
   *         15  7
   *
   * root  heightOrUnbalanced(3)
   * ├── LEFT: node 9
   * │   ├── null -> 0
   * │   ├── null -> 0
   * │   └── difference 0 -> return height 1
   * └── RIGHT: node 20
   *     ├── node 15 -> return height 1
   *     ├── node 7  -> return height 1
   *     └── difference 0 -> return height 2
   *
   * Root:
   *   leftHeight=1
   *   rightHeight=2
   *   difference=1 -> valid
   *   return height 3
   *
   * `3 !== -1`, so isBalanced returns true.
   *
   * ═════════════════════════════════════════════════════════════════════
   * UNBALANCED SIGNAL AND EARLY PROPAGATION
   * ═════════════════════════════════════════════════════════════════════
   *
   *           1
   *          / \
   *         2   3
   *        /     \
   *       4       5
   *      /         \
   *     6           7
   *
   * Initial Call: heightOrUnbalanced(node=1)
   *
   * ┌────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: heightOrUnbalanced(node=1)                               │
   * ├────────────────────────────────────────────────────────────────────┤
   * │ Left report ke liye node 2 solve karo                            │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: heightOrUnbalanced(node=2)                        │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ node 4 -> node 6 ke through valid height 2               │   │
   * │   │ right null -> valid height 0                              │   │
   * │   │ difference=|2-0|=2                                      │   │
   * │   │ current node violates rule -> return -1                  │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ Resume CALL 1: leftHeight=-1                                     │
   * │ Left subtree already unbalanced                                  │
   * │ Right subtree node 3 calculate karne ki need nahi                │
   * │ return -1 immediately                                            │
   * └────────────────────────────────────────────────────────────────────┘
   *
   * isBalanced:
   *   root report=-1
   *   -1 !== -1 is false
   *   return false
   *
   * ═════════════════════════════════════════════════════════════════════
   * LEETCODE EXAMPLE 2 RETURN FLOW
   * ═════════════════════════════════════════════════════════════════════
   *
   *           1
   *          / \
   *         2   2
   *        / \
   *       3   3
   *      / \
   *     4   4
   *
   * leaf 4 reports: 1, 1
   * lower-left node 3: left=1, right=1 -> reports 2
   * sibling node 3: reports 1
   * left node 2: left=2, right=1 -> reports 3
   * right node 2: reports 1
   * root 1: difference=|3-1|=2 -> reports -1
   * final boolean: false
   *
   * EDGE CASES:
   * 1. null root -> helper returns 0 -> true
   * 2. leaf -> child reports 0,0 -> height 1 -> true
   * 3. difference exactly 1 -> valid height return
   * 4. difference greater than 1 -> -1
   * 5. descendant returns -1 -> ancestor immediately propagates -1
   * 6. node values -> ignored; only structure and heights matter
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

    // Test serialization queue aur optimal DFS helper separate jobs perform karte hain.
    // Ye queue only array slots ko linked TreeNode structure me convert karti hai.
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
      expected: boolean;
    }> = [
      {
        name: 'given example 1 - balanced',
        input: [3, 9, 20, null, null, 15, 7],
        expected: true,
      },
      {
        name: 'given example 2 - root height difference is two',
        input: [1, 2, 2, 3, 3, null, null, 4, 4],
        expected: false,
      },
      { name: 'given example 3 - empty tree', input: [], expected: true },
      { name: 'single node', input: [1], expected: true },
      { name: 'two nodes', input: [1, null, 2], expected: true },
      {
        name: 'difference exactly one remains balanced',
        input: [1, 2, 3, 4],
        expected: true,
      },
      {
        name: 'left-skewed difference two is unbalanced',
        input: [1, 2, null, 3],
        expected: false,
      },
      {
        name: 'root balanced but internal nodes unbalanced',
        input: [1, 2, 3, 4, null, null, 5, 6, null, null, 7],
        expected: false,
      },
      {
        name: 'uneven shape with every difference at most one',
        input: [1, 2, 3, 4, null, null, 5],
        expected: true,
      },
      {
        name: 'constraint extremes do not affect balance',
        input: [-10_000, -10_000, 10_000, null, 0],
        expected: true,
      },
      {
        name: 'maximum node count in a shallow complete tree',
        input: Array<number>(5000).fill(1),
        expected: true,
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const root = buildTree(testCase.input);
      const result = isBalanced(root);

      if (result === testCase.expected) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected:', testCase.expected);
        console.error('Received:', result);
      }
    }

    console.log(
      `BalancedBinaryTreeOptimal: ${passedTests}/${testCases.length} tests passed`
    );

    if (passedTests !== testCases.length) {
      throw new Error('BalancedBinaryTreeOptimal test suite failed');
    }
  }
}

BalancedBinaryTreeOptimal.runTests();
