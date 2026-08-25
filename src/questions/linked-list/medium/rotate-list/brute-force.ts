/**
 * ROTATE LIST - BRUTE FORCE
 * =========================
 *
 * Problem:
 * Linked list ko right side me `k` baar rotate karna hai.
 *
 * Intuition:
 * Sabse direct idea ye hai ki ek baar me ek right rotation karo.
 * Ek single right rotation ka matlab hota hai:
 *
 *   last node ko naya head bana do
 *
 * baaki list uske peeche jod do.
 *
 * Algorithm:
 * 1. Agar list empty hai, single node hai, ya `k = 0` hai, toh same head return karo.
 * 2. List ki length nikaalo.
 * 3. `effectiveRotations = k % length` nikaalo.
 * 4. Agar effective rotations 0 hain, toh same head return karo.
 * 5. `effectiveRotations` baar `rotateOnce` helper chalao.
 * 6. Har `rotateOnce` me second-last aur last node dhoondo.
 * 7. Last node ko front me lao, aur second-last ko new tail banao.
 * 8. Final head return karo.
 *
 * Time Complexity:
 *   O(n * (k % n)), kyunki har single rotation me list scan hoti hai.
 *
 * Space Complexity:
 *   O(1), sirf pointers use ho rahe hain.
 */

namespace RotateListBruteForce {
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (head === null || head.next === null || k === 0) {
      return head;
    }

    const length = getLength(head);
    const effectiveRotations = k % length;

    // Full cycle rotations list ko wapas same position par le aati hain.
    // Isliye sirf remainder rotations hi actual work karti hain.
    if (effectiveRotations === 0) {
      return head;
    }

    let rotatedHead = head;

    for (let rotation = 0; rotation < effectiveRotations; rotation++) {
      rotatedHead = rotateOnce(rotatedHead);
    }

    return rotatedHead;
  }

  function rotateOnce(head: ListNode): ListNode {
    let secondLast = head;
    let last = head.next!;

    while (last.next !== null) {
      // `secondLast` ko exactly `last` ke peeche rakhna hai,
      // taaki final me old tail ko detach karte waqt new tail mil chuke.
      secondLast = last;
      last = last.next;
    }

    // Old tail ko front me laane ke liye use purane head se jodte hain.
    last.next = head;

    // Second-last ab new tail banega.
    // Is link ko todna zaroori hai warna cycle ban jayegi.
    secondLast.next = null;

    return last;
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
   *   1 -> 2 -> 3 -> 4 -> 5
   *   k = 2
   *
   * length = 5
   * effectiveRotations = 2 % 5 = 2
   *
   * Rotation 1:
   *   secondLast = 4
   *   last = 5
   *   5.next = 1
   *   4.next = null
   *   result = 5 -> 1 -> 2 -> 3 -> 4
   *
   * Rotation 2:
   *   secondLast = 3
   *   last = 4
   *   4.next = 5
   *   3.next = null
   *   result = 4 -> 5 -> 1 -> 2 -> 3
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty list:
   *    answer null.
   *
   * 2. Single node:
   *    rotation se kuch change nahi hota.
   *
   * 3. `k % length === 0`:
   *    list wapas same ban jati hai.
   */

  function createLinkedList(values: number[]): ListNode | null {
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

  function listToArray(head: ListNode | null): number[] {
    const values: number[] = [];
    let current = head;

    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }

    return values;
  }

  function arraysEqual(first: number[], second: number[]): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  }

  export function runTests(): void {
    const testCases = [
      { name: 'basic rotation', input: [1, 2, 3, 4, 5], k: 2, expected: [4, 5, 1, 2, 3] },
      { name: 'k larger than length', input: [0, 1, 2], k: 4, expected: [2, 0, 1] },
      { name: 'k equals zero', input: [1, 2, 3], k: 0, expected: [1, 2, 3] },
      { name: 'single node', input: [7], k: 100, expected: [7] },
      { name: 'empty list', input: [], k: 3, expected: [] },
      { name: 'full cycle', input: [9, 8, 7], k: 3, expected: [9, 8, 7] },
      { name: 'rotate by one', input: [1, 2], k: 1, expected: [2, 1] },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const head = createLinkedList(testCase.input);
      const result = rotateRight(head, testCase.k);
      const actual = listToArray(result);
      const passed = arraysEqual(actual, testCase.expected);

      if (passed) {
        passedTests++;
      } else {
        console.error(`Test failed: ${testCase.name}`);
        console.error(`Expected: ${JSON.stringify(testCase.expected)}`);
        console.error(`Received: ${JSON.stringify(actual)}`);
      }
    }

    console.log(`RotateListBruteForce: ${passedTests}/${testCases.length} tests passed`);
  }
}

RotateListBruteForce.runTests();
