/**
 * COPY LIST WITH RANDOM POINTER - HASHMAP APPROACH
 * ================================================
 *
 * Problem:
 * Ek linked list di hui hai jisme har node ke paas `next` aur `random` dono pointers hain.
 * Hume bilkul nayi nodes use karke same structure wali deep copy banani hai.
 *
 * Intuition:
 * Sabse bada challenge values copy karna nahi hai.
 * Real challenge ye hai ki kisi original node ka `random` jis old node ko point kar raha hai,
 * copy node ka `random` us corresponding new node ko point kare.
 *
 * Isliye hume ek relation store karna padega:
 *
 *   original node -> copied node
 *
 * Ye relation mil gaya toh:
 *
 *   copy.next   = oldToNew.get(original.next)
 *   copy.random = oldToNew.get(original.random)
 *
 * bas direct set ho jayega.
 *
 * Algorithm:
 * 1. Agar `head` null ho toh null return karo.
 * 2. `oldToNew` map banao jo har original node ka copied version store karega.
 * 3. First pass me har original node ke liye same value wali new node banao aur map me store karo.
 * 4. Second pass me same original list traverse karo.
 * 5. Har original node ke corresponding copied node ko map se nikaalo.
 * 6. Copied node ka `next` us original ke `next` ke copied version par set karo.
 * 7. Copied node ka `random` us original ke `random` ke copied version par set karo.
 * 8. Original head ke copied version ko return karo.
 *
 * Time Complexity:
 *   O(n), kyunki do linear passes chalte hain.
 *
 * Space Complexity:
 *   O(n), kyunki `oldToNew` map har original node ke liye entry store karta hai.
 */

namespace CopyListWithRandomPointerHashMap {
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

    const oldToNew = new Map<Node, Node>();
    let current: Node | null = head;

    while (current !== null) {
      oldToNew.set(current, new Node(current.val));

      // First pass me sirf copied nodes create kar rahe hain.
      // `current` ko aage move karna isliye zaroori hai taaki saari original nodes map me aa jayein.
      current = current.next;
    }

    current = head;

    while (current !== null) {
      const copiedNode = oldToNew.get(current)!;

      // `copiedNode` exactly usi original node ka clone represent karta hai.
      // Isliye `next` ko original ke `next` ke clone se connect karna same chain rebuild karta hai.
      copiedNode.next =
        current.next !== null ? oldToNew.get(current.next)! : null;

      // `random` pointer original structure ka arbitrary jump hota hai.
      // Map use karke hum old target ko uske new target me translate kar dete hain.
      copiedNode.random =
        current.random !== null ? oldToNew.get(current.random)! : null;

      // Is original node ke clone ke saare outgoing links set ho chuke hain.
      // Ab next original node par jaa kar uska clone wire karte hain.
      current = current.next;
    }

    return oldToNew.get(head)!;
  }

  /**
   * ==========================================================
   * WHY MAP NEEDED
   * ==========================================================
   *
   * Example:
   *   7 -> 13 -> 11
   *         random -> 7
   *
   * Jab hum 13 ka copy banayenge,
   * hume ye bhi set karna hai:
   *
   *   13'.random = 7'
   *
   * Problem:
   * Original pointer ke paas sirf `7` ka address hai, `7'` ka nahi.
   *
   * Map ye gap fill karta hai:
   *
   *   oldToNew.get(7) => 7'
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   [[7, null], [13, 0], [11, 1]]
   *
   * Meaning:
   *   node0 = 7,  random = null
   *   node1 = 13, random = node0
   *   node2 = 11, random = node1
   *
   * Original chain:
   *   7 -> 13 -> 11 -> null
   *
   * Random links:
   *   7.random  -> null
   *   13.random -> 7
   *   11.random -> 13
   *
   * ----------------------------------------------------------
   * PASS 1: copied nodes banana
   * ----------------------------------------------------------
   *
   * Iteration 1:
   *   current = 7
   *   oldToNew[7] = 7'
   *
   * Iteration 2:
   *   current = 13
   *   oldToNew[13] = 13'
   *
   * Iteration 3:
   *   current = 11
   *   oldToNew[11] = 11'
   *
   * Map state:
   *   7  -> 7'
   *   13 -> 13'
   *   11 -> 11'
   *
   * Abhi copied nodes isolated hain:
   *   7'   13'   11'
   *
   * ----------------------------------------------------------
   * PASS 2: next aur random set karna
   * ----------------------------------------------------------
   *
   * Iteration 1: current = 7
   *   copiedNode = 7'
   *   copiedNode.next = oldToNew[13] = 13'
   *   copiedNode.random = null
   *
   * Iteration 2: current = 13
   *   copiedNode = 13'
   *   copiedNode.next = oldToNew[11] = 11'
   *   copiedNode.random = oldToNew[7] = 7'
   *
   * Iteration 3: current = 11
   *   copiedNode = 11'
   *   copiedNode.next = null
   *   copiedNode.random = oldToNew[13] = 13'
   *
   * Final copied list:
   *   7' -> 13' -> 11' -> null
   *
   * Random links:
   *   7'.random  -> null
   *   13'.random -> 7'
   *   11'.random -> 13'
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty list
   *    head = null
   *    Answer bhi null hi hoga.
   *
   * 2. Single node with self-random
   *    [5, 0]
   *    Copy node ka random usi copy node par aana chahiye, original par nahi.
   *
   * 3. Multiple nodes same value ke saath
   *    Value same hone se kuch farq nahi padta.
   *    Map node identity se kaam karta hai, value se nahi.
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
      const originalUnchanged = arraysEqual(
        originalSnapshotBeforeCopy,
        originalSnapshotAfterCopy
      );
      const deepCopyValid = hasOnlyCopiedNodes(original, copied);

      const passed = structureMatches && originalUnchanged && deepCopyValid;

      if (passed) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error('Expected copy:', JSON.stringify(testCase.expected));
        console.error('Actual copy  :', JSON.stringify(copiedSnapshot));
        console.error('Original safe:', originalUnchanged);
        console.error('Deep copy ok :', deepCopyValid);
      }
    }

    console.log(
      `CopyListWithRandomPointerHashMap: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

CopyListWithRandomPointerHashMap.runTests();
