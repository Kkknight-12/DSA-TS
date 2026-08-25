/**
 * INTERSECTION OF TWO LINKED LISTS - BETTER HASHSET
 * =================================================
 *
 * Problem:
 * Do linked lists me first shared node dhoondhna hai.
 * Shared ka matlab same reference, not same value.
 *
 * Intuition:
 * Agar listA ke saare nodes ko `Set` me store kar dein,
 * toh listB traverse karte waqt turant pata chal jayega ki current node pehle listA me aaya tha ya nahi.
 *
 * Algorithm:
 * 1. Agar `headA` ya `headB` me se koi bhi null ho, toh null return karo.
 * 2. Ek `Set<ListNode>` banao.
 * 3. ListA traverse karke har node reference ko set me store karo.
 * 4. ListB traverse karo.
 * 5. Jaise hi koi node set me mil jaye, wahi intersection hai.
 * 6. Agar listB khatam ho jaye aur koi match na mile, toh null return karo.
 *
 * Time Complexity:
 *   O(m + n), kyunki ek pass listA aur ek pass listB par lagta hai.
 *
 * Space Complexity:
 *   O(m), kyunki listA ke references set me store hote hain.
 */

namespace IntersectionOfTwoLinkedListsBetter {
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  function getIntersectionNode(
    headA: ListNode | null,
    headB: ListNode | null
  ): ListNode | null {
    if (headA === null || headB === null) {
      return null;
    }

    const seenNodes = new Set<ListNode>();
    let currentA: ListNode | null = headA;

    while (currentA !== null) {
      // Set value nahi, poora node reference store karta hai.
      // Isi wajah se same value wale different nodes galat intersection nahi banenge.
      seenNodes.add(currentA);
      currentA = currentA.next;
    }

    let currentB: ListNode | null = headB;

    while (currentB !== null) {
      // Agar listB ka current node pehle listA me same object reference ke saath store hua tha,
      // toh yahi first shared node hai.
      if (seenNodes.has(currentB)) {
        return currentB;
      }

      // Current B node ko check kar liya,
      // ab agle candidate par move karte hain.
      currentB = currentB.next;
    }

    return null;
  }

  /**
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Example:
   *   ListA = 4 -> 1 -> 8 -> 4 -> 5
   *   ListB = 5 -> 6 -> 1 -> 8 -> 4 -> 5
   *
   * Phase 1: store listA references
   *   set = {4A, 1A, 8, 4, 5}
   *
   * Phase 2: scan listB
   *   5B -> not in set
   *   6B -> not in set
   *   1B -> not in set
   *   8  -> yes, because this is same shared node reference
   *
   * Return shared node 8.
   *
   * Why same value wali node match nahi hoti?
   *   because `Set.has()` object identity check karta hai.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty list:
   *    set build ya scan karne ka fayda nahi, answer null.
   *
   * 2. Same head:
   *    first node of listB hi set me mil jayega.
   *
   * 3. No intersection:
   *    poori listB scan hogi, koi hit nahi milega.
   */

  function buildLinearList(values: number[]): ListNode | null {
    if (values.length === 0) {
      return null;
    }

    const head = new ListNode(values[0]);
    let current = head;

    for (let index = 1; index < values.length; index++) {
      current.next = new ListNode(values[index]);
      current = current.next;
    }

    return head;
  }

  function buildIntersectionCase(
    prefixA: number[],
    prefixB: number[],
    shared: number[]
  ): {
    headA: ListNode | null;
    headB: ListNode | null;
    intersection: ListNode | null;
  } {
    const sharedHead = buildLinearList(shared);
    const headA = attachSharedTail(prefixA, sharedHead);
    const headB = attachSharedTail(prefixB, sharedHead);

    return {
      headA,
      headB,
      intersection: sharedHead,
    };
  }

  function attachSharedTail(
    prefixValues: number[],
    sharedHead: ListNode | null
  ): ListNode | null {
    if (prefixValues.length === 0) {
      return sharedHead;
    }

    const head = buildLinearList(prefixValues)!;
    let tail = head;

    while (tail.next !== null) {
      tail = tail.next;
    }

    tail.next = sharedHead;
    return head;
  }

  function describeNode(node: ListNode | null): string {
    return node === null ? 'null' : `Node(${node.val})`;
  }

  export function runTests(): void {
    const typical = buildIntersectionCase([4, 1], [5, 6, 1], [8, 4, 5]);
    const noIntersection = {
      headA: buildLinearList([2, 6, 4]),
      headB: buildLinearList([1, 5]),
      intersection: null,
    };
    const sameHead = {
      headA: buildLinearList([3, 7, 9]),
      headB: null as ListNode | null,
      intersection: null as ListNode | null,
    };
    sameHead.headB = sameHead.headA;
    sameHead.intersection = sameHead.headA;

    const oneEmpty = {
      headA: null,
      headB: buildLinearList([1, 2, 3]),
      intersection: null,
    };
    const sharedSingleNode = buildIntersectionCase([], [10, 20], [30]);
    const sameValuesDifferentNodes = {
      headA: buildLinearList([1, 2, 3]),
      headB: buildLinearList([1, 2, 3]),
      intersection: null,
    };
    const longDifferentPrefixes = buildIntersectionCase(
      [9, 8, 7, 6],
      [5],
      [4, 3, 2]
    );

    const testCases = [
      { name: 'typical intersection', ...typical },
      { name: 'no intersection', ...noIntersection },
      { name: 'same head', ...sameHead },
      { name: 'one empty list', ...oneEmpty },
      { name: 'shared single tail node', ...sharedSingleNode },
      { name: 'same values but different nodes', ...sameValuesDifferentNodes },
      { name: 'longer prefix before intersection', ...longDifferentPrefixes },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const result = getIntersectionNode(testCase.headA, testCase.headB);
      const passed = result === testCase.intersection;

      if (passed) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error(`Expected: ${describeNode(testCase.intersection)}`);
        console.error(`Received: ${describeNode(result)}`);
      }
    }

    console.log(
      `IntersectionOfTwoLinkedListsBetter: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

IntersectionOfTwoLinkedListsBetter.runTests();
