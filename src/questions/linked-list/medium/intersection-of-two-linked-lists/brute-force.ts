/**
 * INTERSECTION OF TWO LINKED LISTS - BRUTE FORCE
 * ==============================================
 *
 * Problem:
 * Do linked lists diye gaye hain.
 * Hume wo node dhoondhna hai jahan dono lists same reference par milti hain.
 *
 * Intuition:
 * Sabse seedha idea ye hai ki listA ke har node ko listB ke har node ke saath compare karo.
 * Jaise hi same object reference mil jaye, wahi intersection hai.
 *
 * Algorithm:
 * 1. Agar `headA` ya `headB` me se koi bhi null ho, toh null return karo.
 * 2. `currentA` ko listA ke head par rakho.
 * 3. Jab tak `currentA` null nahi hota, listB ko start se scan karo.
 * 4. Har `currentB` ke liye check karo ki `currentA === currentB` hai ya nahi.
 * 5. Agar same reference mil jaye, wahi node return karo.
 * 6. Agar currentA ke liye listB me koi match nahi mila, toh `currentA` ko aage badhao.
 * 7. Agar poori search ke baad bhi match nahi mila, toh null return karo.
 *
 * Time Complexity:
 *   O(m * n), kyunki har node of listA ke liye poori listB scan hoti hai.
 *
 * Space Complexity:
 *   O(1), sirf pointers use ho rahe hain.
 */

namespace IntersectionOfTwoLinkedListsBruteForce {
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

    let currentA: ListNode | null = headA;

    while (currentA !== null) {
      let currentB: ListNode | null = headB;

      while (currentB !== null) {
        // Intersection value se nahi, same node identity se define hota hai.
        // Isliye `===` exactly ye check karta hai ki dono pointers same object ko point kar rahe hain ya nahi.
        if (currentA === currentB) {
          return currentA;
        }

        // Current B node compare ho chuka hai,
        // isliye listB ke agle candidate par move karte hain.
        currentB = currentB.next;
      }

      // `currentA` ko listB ke har node ke saath compare kar liya.
      // Ab listA ke next node ko base candidate bana kar dobara full scan karna hoga.
      currentA = currentA.next;
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
   *   Intersection = same node 8
   *
   * Outer candidate = 4 (from listA)
   *   Compare with 5, 6, 1, 8, 4, 5 from listB -> no reference match
   *
   * Outer candidate = 1 (from listA)
   *   Compare with 5, 6, 1, 8, 4, 5 from listB -> still no reference match
   *   Important:
   *   listA wala 1 aur listB wala 1 same value rakhte hain,
   *   lekin same node nahi hain.
   *
   * Outer candidate = 8 (from listA)
   *   Compare with 5 -> no
   *   Compare with 6 -> no
   *   Compare with 1 -> no
   *   Compare with 8 -> yes
   *
   * Return shared node 8.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. No intersection:
   *    poori comparison ke baad bhi koi reference match nahi milega.
   *
   * 2. Same head:
   *    first comparison me hi `headA === headB` true ho jayega.
   *
   * 3. Same values but different nodes:
   *    answer null hi rahega.
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
      `IntersectionOfTwoLinkedListsBruteForce: ${passedTests}/${testCases.length} tests passed`
    );
  }
}

IntersectionOfTwoLinkedListsBruteForce.runTests();
