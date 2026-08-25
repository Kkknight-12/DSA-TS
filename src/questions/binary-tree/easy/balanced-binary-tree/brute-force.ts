/**
 * BALANCED BINARY TREE - BRUTE FORCE
 * ====================================
 *
 * Prerequisite:
 * Maximum Depth recurrence, recursive DFS, aur function call stack.
 *
 * Problem:
 * Tree tab balanced hai jab har node par left aur right subtree heights ka
 * absolute difference at most `1` ho.
 *
 * Intuition:
 * Har node ko independently verify karo:
 * 1. left subtree ki height calculate karo
 * 2. right subtree ki height calculate karo
 * 3. current height difference check karo
 * 4. left aur right children par same balance check recursively repeat karo
 *
 * Ye correct hai, but `maxDepth` same descendants ko different ancestors ke liye
 * repeatedly traverse kar sakta hai. Isi repeated height work ki wajah se worst-case
 * time O(n²) hota hai.
 *
 * Algorithm:
 * 1. `isBalanced(root)` se current subtree validate karna start karo.
 * 2. Agar current root `null` hai, `true` return karo; koi violating node nahi hai.
 * 3. `maxDepth(root.left)` se left subtree height separately calculate karo.
 * 4. `maxDepth(root.right)` se right subtree height separately calculate karo.
 * 5. Current node ka local balance result store karo.
 * 6. Left subtree ka balance result recursively calculate karo.
 * 7. Right subtree ka balance result recursively calculate karo.
 * 8. Current aur both child subtrees valid hain tabhi `true` return karo.
 *
 * Time Complexity:
 *   Worst case O(n²), kyunki `isBalanced` ke many calls apni subtrees par fresh
 *   `maxDepth` traversals start kar sakti hain.
 *
 * Space Complexity:
 *   O(h) auxiliary recursion stack, jahan `h` tree ki height hai.
 *   Active balance frames aur active height frames ek root-to-leaf path ke andar
 *   bounded rehte hain, so peak auxiliary depth O(h) hi hai.
 */

namespace BalancedBinaryTreeBruteForce {
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
    if (root === null) {
      // Empty subtree me koi node balance rule violate nahi kar sakta.
      return true;
    }

    // In heights ko current node ke liye fresh calculate kiya ja raha hai.
    // Ancestor ne same descendants ki height pehle calculate ki ho sakti hai,
    // but brute-force version woh result reuse nahi karta.
    const leftHeight = maxDepth(root.left);
    const rightHeight = maxDepth(root.right);

    const currentBalanced = Math.abs(leftHeight - rightHeight) <= 1;

    // Teaching baseline intentionally both subtrees ko validate karti hai.
    // Isse repeated height work aur skewed-tree O(n²) behavior directly visible hai.
    const leftBalanced = isBalanced(root.left);
    const rightBalanced = isBalanced(root.right);

    // Root ka local difference valid hona insufficient hai.
    // Every descendant node ko bhi same rule pass karna hoga.
    return currentBalanced && leftBalanced && rightBalanced;
  }

  function maxDepth(root: TreeNode | null): number {
    if (root === null) {
      return 0;
    }

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
  }

  /**
   * ═════════════════════════════════════════════════════════════════════
   * WHY ROOT-ONLY CHECK FAILS
   * ═════════════════════════════════════════════════════════════════════
   *
   * Tree:
   *
   *           1
   *          / \
   *         2   3
   *        /     \
   *       4       5
   *      /         \
   *     6           7
   *
   * Root heights:
   *   leftHeight=3
   *   rightHeight=3
   *   difference=0 -> root locally balanced
   *
   * But node 2:
   *   leftHeight=2
   *   rightHeight=0
   *   difference=2 -> unbalanced
   *
   * Therefore complete tree false hai.
   *
   * ═════════════════════════════════════════════════════════════════════
   * REPEATED-WORK DRY RUN
   * ═════════════════════════════════════════════════════════════════════
   *
   * Initial Call: isBalanced(node=1)
   *
   * ┌────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: isBalanced(node=1)                                       │
   * ├────────────────────────────────────────────────────────────────────┤
   * │ maxDepth(1.left=node 2) traverses nodes 2,4,6 -> returns 3       │
   * │ maxDepth(1.right=node 3) traverses nodes 3,5,7 -> returns 3      │
   * │ difference=|3-3|=0 -> current node valid                         │
   * │                                                                    │
   * │ Now call isBalanced(node=2)                                      │
   * │                                                                    │
   * │   ┌────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: isBalanced(node=2)                               │   │
   * │   ├────────────────────────────────────────────────────────────┤   │
   * │   │ maxDepth(node 4) traverses nodes 4,6 AGAIN -> returns 2  │   │
   * │   │ maxDepth(null) -> 0                                      │   │
   * │   │ difference=|2-0|=2 -> currentBalanced=false             │   │
   * │   │ baseline still validates nodes 4 and 6                  │   │
   * │   │ return false after combining all three results          │   │
   * │   └────────────────────────────────────────────────────────────┘   │
   * │                                                                    │
   * │ Baseline right subtree node 3 ko bhi validate karti hai           │
   * │ current=true, left=false, right=false                             │
   * │ combine karke return false                                        │
   * └────────────────────────────────────────────────────────────────────┘
   *
   * Repeated work:
   *   nodes 4 and 6 root ki left-height calculation me visit hue,
   *   phir node 2 ki height calculation me dobara visit hue.
   *
   * ═════════════════════════════════════════════════════════════════════
   * LEETCODE EXAMPLE 2
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
   * At root:
   *   leftHeight=3
   *   rightHeight=1
   *   difference=2
   *
   * Root `currentBalanced=false` store karta hai, both children bhi check
   * karta hai, phir three boolean results combine karke false return karta hai.
   *
   * EDGE CASES:
   * 1. null root -> true
   * 2. single node -> child heights 0,0 -> true
   * 3. exact difference 1 -> still balanced
   * 4. difference 2 -> unbalanced
   * 5. root valid but internal node invalid -> false
   * 6. negative/duplicate values -> no effect; structure matters
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

    // Level-order array sirf test representation hai.
    // Queue me real parents hi jaate hain; null placeholder enqueue nahi hota.
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
      `BalancedBinaryTreeBruteForce: ${passedTests}/${testCases.length} tests passed`
    );

    if (passedTests !== testCases.length) {
      throw new Error('BalancedBinaryTreeBruteForce test suite failed');
    }
  }
}

BalancedBinaryTreeBruteForce.runTests();
