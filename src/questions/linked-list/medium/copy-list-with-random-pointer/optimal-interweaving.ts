/**
 * COPY LIST WITH RANDOM POINTER - OPTIMAL INTERWEAVING
 * ===================================================
 *
 * Problem:
 * Ek linked list di hui hai jisme har node ke paas `next` aur `random` pointers hain.
 * Hume deep copy banani hai bina original nodes reuse kiye.
 *
 * Intuition:
 * HashMap approach ka main benefit tha:
 *
 *   original node -> copied node
 *
 * mapping mil jaati thi.
 *
 * Optimal trick ye hai ki alag se map store hi na karein.
 * Hum copied node ko uske original node ke turant baad insert kar dete hain.
 *
 * Example:
 *
 *   original:  A -> B -> C
 *   weaving:   A -> A' -> B -> B' -> C -> C'
 *
 * Ab kisi bhi original node ka copy hamesha:
 *
 *   original.next
 *
 * par mil jayega.
 *
 * Is ek relation se `random` bhi set ho jata hai:
 *
 *   copy.random = original.random?.next
 *
 * Algorithm:
 * 1. Agar `head` null ho toh null return karo.
 * 2. First pass me har original node ke turant baad uska copied node insert karo.
 * 3. Second pass me har copied node ka `random` set karo using `current.random?.next`.
 * 4. Third pass me woven list ko do alag lists me split karo.
 * 5. Original list ke `next` pointers restore karo.
 * 6. Copied list ke `next` pointers connect karo.
 * 7. Copied list ka head return karo.
 *
 * Time Complexity:
 *   O(n), kyunki teen linear passes hain.
 *
 * Space Complexity:
 *   O(1) auxiliary, kyunki extra map nahi use kar rahe.
 */

namespace CopyListWithRandomPointerOptimal {
  class Node {
    val: number;
    next: Node | null;
    random: Node | null;

    constructor(val = 0, next: Node | null = null, random: Node | null = null) {
      this.val = val;
      this.next = next;
      this.random = random;
    }
  }

  type InputNode = [number, number | null];

  function copyRandomList(head: Node | null): Node | null {
    if (head === null) {
      return null;
    }

    let current: Node | null = head;

    while (current !== null) {
      const nextOriginal: Node | null = current.next;
      const copyNode: Node = new Node(current.val);

      // Copy node ko original ke turant baad insert karne se
      // `current.next` hi original ka copied version ban jata hai.
      current.next = copyNode;
      copyNode.next = nextOriginal;

      // Abhi current original node process ho chuka hai.
      // Isliye skip karke agle original node par jaana padta hai.
      current = nextOriginal;
    }

    current = head;

    while (current !== null) {
      const copyNode: Node = current.next!;

      // `current.random` agar kisi original node ko point karta hai,
      // toh us original node ka copy exactly uske just baad hoga.
      copyNode.random =
        current.random !== null ? current.random.next : null;

      // `copyNode.next` abhi agle original node ko point kar raha hai.
      // Wahi next original node hamara next processing target bhi hai.
      current = copyNode.next;
    }

    current = head;
    const copiedHead = head.next!;

    while (current !== null) {
      const copyNode: Node = current.next!;
      const nextOriginal: Node | null = copyNode.next;

      // Original list ko wapas exactly waise hi restore karna hai jaise input me thi.
      // Isliye original node ka `next` agle original node par reset karte hain.
      current.next = nextOriginal;

      // Copied list me current copy ke baad agla copy aana chahiye.
      // `nextOriginal?.next` se hume agle original ka copied version mil jata hai.
      copyNode.next = nextOriginal !== null ? nextOriginal.next : null;

      // Ek full original-copy pair separate ho chuka hai.
      // Ab agle original pair par move karte hain.
      current = nextOriginal;
    }

    return copiedHead;
  }

  /**
   * ==========================================================
   * WHY INTERWEAVING WORKS
   * ==========================================================
   *
   * Suppose:
   *   13.random -> 7
   *
   * Weaving ke baad structure ban jata hai:
   *
   *   7 -> 7' -> 13 -> 13' -> ...
   *
   * Ab:
   *   13.random      = 7
   *   13.random.next = 7'
   *
   * Yahi exactly copied target chahiye tha.
   *
   * Isliye:
   *
   *   13'.random = 13.random.next
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   [[7, null], [13, 0], [11, 1]]
   *
   * Original:
   *   7 -> 13 -> 11 -> null
   *
   * Random:
   *   7.random  -> null
   *   13.random -> 7
   *   11.random -> 13
   *
   * ----------------------------------------------------------
   * PHASE 1: weaving copied nodes
   * ----------------------------------------------------------
   *
   * Step 1: current = 7
   *   insert 7' after 7
   *   list: 7 -> 7' -> 13 -> 11
   *
   * Step 2: current = 13
   *   insert 13' after 13
   *   list: 7 -> 7' -> 13 -> 13' -> 11
   *
   * Step 3: current = 11
   *   insert 11' after 11
   *   list: 7 -> 7' -> 13 -> 13' -> 11 -> 11'
   *
   * ----------------------------------------------------------
   * PHASE 2: copied random set karna
   * ----------------------------------------------------------
   *
   * current = 7
   *   copyNode = 7'
   *   7.random = null
   *   7'.random = null
   *
   * current = 13
   *   copyNode = 13'
   *   13.random = 7
   *   13'.random = 7.next = 7'
   *
   * current = 11
   *   copyNode = 11'
   *   11.random = 13
   *   11'.random = 13.next = 13'
   *
   * ----------------------------------------------------------
   * PHASE 3: separate and restore
   * ----------------------------------------------------------
   *
   * Before split:
   *   7 -> 7' -> 13 -> 13' -> 11 -> 11' -> null
   *
   * After first separation step:
   *   original: 7 -> 13 -> 13' -> 11 -> 11'
   *   copy:     7' -> 13' -> 11 -> 11'
   *
   * After complete separation:
   *   original: 7 -> 13 -> 11 -> null
   *   copy:     7' -> 13' -> 11' -> null
   *
   * Copied random:
   *   7'.random  -> null
   *   13'.random -> 7'
   *   11'.random -> 13'
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty list
   *    null -> null
   *
   * 2. Single node self-random
   *    5.random = 5
   *    weaving ke baad 5'.random = 5.next = 5'
   *
   * 3. All random null
   *    random assignment phase me sab copied random bhi null hi rahenge.
   */

  function createList(nodes: InputNode[]): Node | null {
    if (nodes.length === 0) {
      return null;
    }

    const createdNodes = nodes.map(([value]) => new Node(value));

    for (let index = 0; index < createdNodes.length; index++) {
      if (index + 1 < createdNodes.length) {
        createdNodes[index].next = createdNodes[index + 1];
      }
    }

    for (let index = 0; index < createdNodes.length; index++) {
      const randomIndex = nodes[index][1];
      createdNodes[index].random =
        randomIndex === null ? null : createdNodes[randomIndex];
    }

    return createdNodes[0];
  }

  function serializeList(head: Node | null): InputNode[] {
    const nodesInOrder: Node[] = [];
    const nodeToIndex = new Map<Node, number>();
    let current = head;

    while (current !== null) {
      nodeToIndex.set(current, nodesInOrder.length);
      nodesInOrder.push(current);
      current = current.next;
    }

    return nodesInOrder.map((node) => [
      node.val,
      node.random === null ? null : nodeToIndex.get(node.random)!,
    ]);
  }

  function hasOnlyCopiedNodes(
    originalHead: Node | null,
    copiedHead: Node | null
  ): boolean {
    const originalNodes = new Set<Node>();
    let currentOriginal = originalHead;

    while (currentOriginal !== null) {
      originalNodes.add(currentOriginal);
      currentOriginal = currentOriginal.next;
    }

    let currentCopy = copiedHead;

    while (currentCopy !== null) {
      if (originalNodes.has(currentCopy)) {
        return false;
      }

      if (currentCopy.random !== null && originalNodes.has(currentCopy.random)) {
        return false;
      }

      currentCopy = currentCopy.next;
    }

    return true;
  }

  function arraysEqual(first: InputNode[], second: InputNode[]): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  }

  export function runTests(): void {
    const testCases: Array<{
      name: string;
      input: InputNode[];
      expected: InputNode[];
    }> = [
      {
        name: 'empty list',
        input: [],
        expected: [],
      },
      {
        name: 'single node without random',
        input: [[5, null]],
        expected: [[5, null]],
      },
      {
        name: 'single node self random',
        input: [[9, 0]],
        expected: [[9, 0]],
      },
      {
        name: 'forward random pointers',
        input: [[1, 2], [2, null], [3, 1]],
        expected: [[1, 2], [2, null], [3, 1]],
      },
      {
        name: 'classic example',
        input: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
        expected: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
      },
      {
        name: 'duplicate values with different random targets',
        input: [[3, null], [3, 0], [3, 1]],
        expected: [[3, null], [3, 0], [3, 1]],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const original = createList(testCase.input);
      const originalSnapshotBeforeCopy = serializeList(original);
      const copied = copyRandomList(original);
      const copiedSnapshot = serializeList(copied);
      const originalSnapshotAfterCopy = serializeList(original);

      const structureMatches = arraysEqual(copiedSnapshot, testCase.expected);
      const originalRestored = arraysEqual(
        originalSnapshotBeforeCopy,
        originalSnapshotAfterCopy
      );
      const deepCopyValid = hasOnlyCopiedNodes(original, copied);

      const passed = structureMatches && originalRestored && deepCopyValid;

      if (passed) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected copy:', JSON.stringify(testCase.expected));
        console.error('Actual copy  :', JSON.stringify(copiedSnapshot));
        console.error('Original ok  :', originalRestored);
        console.error('Deep copy ok :', deepCopyValid);
      }
    }

    console.log(
      `CopyListWithRandomPointerOptimal: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

CopyListWithRandomPointerOptimal.runTests();
