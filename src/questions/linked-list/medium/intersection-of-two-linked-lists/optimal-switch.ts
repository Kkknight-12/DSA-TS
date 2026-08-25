/**
 * INTERSECTION OF TWO LINKED LISTS - OPTIMAL SWITCH POINTERS
 * ==========================================================
 *
 * Problem:
 * Do linked lists ke first shared node reference ko return karna hai.
 *
 * Intuition:
 * Har pointer ko pehle apni list traverse karne do.
 * Jis pointer ki list khatam ho jaye, use doosri list ke head par bhej do.
 * Isse dono pointers total same distance travel karenge.
 *
 * Algorithm:
 * 1. Agar `headA` ya `headB` null ho, toh null return karo.
 * 2. `pointerA = headA` aur `pointerB = headB` se start karo.
 * 3. Jab tak dono equal nahi hote, loop chalao.
 * 4. Agar `pointerA` null ho jaye, usse `headB` par switch karo, warna `pointerA.next` par move karo.
 * 5. Agar `pointerB` null ho jaye, usse `headA` par switch karo, warna `pointerB.next` par move karo.
 * 6. Loop terminate hote hi dono ya toh intersection node par honge ya dono null honge.
 * 7. `pointerA` return karo.
 *
 * Time Complexity:
 *   O(m + n), kyunki har pointer max dono lists ko ek-ek baar cover karta hai.
 *
 * Space Complexity:
 *   O(1), sirf do pointers use hote hain.
 */

namespace IntersectionOfTwoLinkedListsOptimalSwitch {
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

    let pointerA: ListNode | null = headA;
    let pointerB: ListNode | null = headB;

    while (pointerA !== pointerB) {
      // Agar pointerA apni list ka private prefix finish kar chuka hai,
      // toh use listB ke start se wahi extra distance cover karwana hai jo pointerB ne pehle cover kiya tha.
      pointerA = pointerA === null ? headB : pointerA.next;

      // Same balancing idea pointerB par bhi apply hota hai.
      // Dono eventually equal total distance travel karte hain.
      pointerB = pointerB === null ? headA : pointerB.next;
    }

    return pointerA;
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
   * Start:
   *   pointerA = 4
   *   pointerB = 5
   *
   * Round 1:
   *   pointerA -> 1
   *   pointerB -> 6
   *
   * Round 2:
   *   pointerA -> 8
   *   pointerB -> 1
   *
   * Round 3:
   *   pointerA -> 4
   *   pointerB -> 8
   *
   * ...
   *
   * Eventually:
   *   pointerA finishes listA, switches to headB
   *   pointerB finishes listB, switches to headA
   *
   * Ab dono ne:
   *   lenA + lenB
   * distance cover kar li hoti hai.
   *
   * Is equalized travel ke baad dono same shared node 8 par milte hain.
   *
   * If no intersection:
   *   dono final me null par milenge.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. No intersection:
   *    dono pointers second pass ke end me null par equal honge.
   *
   * 2. Same head:
   *    loop start hi nahi hoga, direct head return hoga.
   *
   * 3. Unequal prefixes:
   *    switch step hi un prefixes ko automatically balance karta hai.
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
      `IntersectionOfTwoLinkedListsOptimalSwitch: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

IntersectionOfTwoLinkedListsOptimalSwitch.runTests();
