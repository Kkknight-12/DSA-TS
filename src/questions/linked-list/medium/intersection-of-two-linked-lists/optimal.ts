/**
 * INTERSECTION OF TWO LINKED LISTS - OPTIMAL LENGTH ALIGNMENT
 * ===========================================================
 *
 * Problem:
 * Do linked lists ke first shared reference node ko dhoondhna hai.
 *
 * Intuition:
 * Intersection se pehle dono lists ke private prefix alag-alag length ke ho sakte hain.
 * Agar longer list ke pointer ko pehle extra nodes cross karwa dein,
 * toh dono pointers same remaining distance par aa jayenge.
 *
 * Algorithm:
 * 1. Agar `headA` ya `headB` null ho, toh null return karo.
 * 2. Dono lists ki lengths nikaalo.
 * 3. Difference `abs(lenA - lenB)` nikaalo.
 * 4. Jo list longer hai, uske pointer ko `difference` steps aage move karo.
 * 5. Ab dono pointers same remaining distance par hain.
 * 6. Dono pointers ko saath-saath move karo.
 * 7. Jaise hi dono same reference par mil jayein, wahi intersection return karo.
 * 8. Agar dono null tak pahunch jayein, toh answer null hai.
 *
 * Time Complexity:
 *   O(m + n), lengths nikaalne aur aligned traversal dono linear hain.
 *
 * Space Complexity:
 *   O(1), sirf constant pointers use ho rahe hain.
 */

namespace IntersectionOfTwoLinkedListsOptimal {
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

    const lengthA = getLength(headA);
    const lengthB = getLength(headB);
    const difference = Math.abs(lengthA - lengthB);

    let currentA: ListNode | null = headA;
    let currentB: ListNode | null = headB;

    if (lengthA > lengthB) {
      for (let step = 0; step < difference; step++) {
        // ListA ka private prefix zyada lamba hai.
        // Isliye currentA ko pehle aage bhej kar same remaining distance banate hain.
        currentA = currentA!.next;
      }
    } else {
      for (let step = 0; step < difference; step++) {
        // ListB ka extra prefix consume karna zaroori hai,
        // tabhi dono pointers shared tail se barabar distance par aayenge.
        currentB = currentB!.next;
      }
    }

    while (currentA !== null && currentB !== null) {
      // Alignment ke baad agar dono pointers same node par milte hain,
      // toh yahi first possible shared node hai.
      if (currentA === currentB) {
        return currentA;
      }

      // Current aligned pair match nahi hua,
      // isliye dono ko saath-saath move karna safe hai.
      currentA = currentA.next;
      currentB = currentB.next;
    }

    return null;
  }

  function getLength(head: ListNode | null): number {
    let length = 0;
    let current = head;

    while (current !== null) {
      length++;
      current = current.next;
    }

    return length;
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
   * lengthA = 5
   * lengthB = 6
   * difference = 1
   *
   * Since listB is longer:
   *   move currentB one step
   *
   * Aligned state:
   *   currentA = 4 -> 1 -> 8 -> 4 -> 5
   *   currentB = 6 -> 1 -> 8 -> 4 -> 5
   *
   * Now remaining distance from both pointers to shared tail is same.
   *
   * Step 1:
   *   4 !== 6
   *   move both
   *
   * Step 2:
   *   1 !== 1 by reference
   *   move both
   *
   * Step 3:
   *   8 === 8 by reference
   *   return shared node 8
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Equal lengths but no intersection:
   *    alignment skip hoga, direct parallel scan null tak jayega.
   *
   * 2. One list already shorter by many nodes:
   *    longer list ka extra prefix pehle consume hoga.
   *
   * 3. Same head:
   *    alignment ke baad first comparison me hi match mil jayega.
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
      `IntersectionOfTwoLinkedListsOptimal: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

IntersectionOfTwoLinkedListsOptimal.runTests();
