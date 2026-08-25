/**
 * ROTATE LIST - OPTIMAL
 * =====================
 *
 * Problem:
 * Linked list ko right side me `k` positions rotate karna hai.
 *
 * Intuition:
 * Right rotation by `k` ka matlab hai:
 *
 *   last `k` nodes ko front me laana
 *
 * Agar list ki length `n` hai, toh actual useful rotations hoti hain:
 *
 *   k % n
 *
 * Aur once effective rotations mil gayin,
 * toh new tail wo node hoga jiske baad exactly `effectiveRotations` nodes bachte hain.
 *
 * Smart trick:
 * 1. Tail ko head se jod kar list ko circular bana do
 * 2. New tail tak jao
 * 3. Wahi circle tod do
 *
 * Algorithm:
 * 1. Agar list empty hai, single node hai, ya `k = 0` hai, toh same head return karo.
 * 2. Ek pass me length aur tail dhoondo.
 * 3. `effectiveRotations = k % length` nikaalo.
 * 4. Agar effective rotations 0 hain, same head return karo.
 * 5. `tail.next = head` karke circular list banao.
 * 6. `stepsToNewTail = length - effectiveRotations - 1` nikaalo.
 * 7. Head se `stepsToNewTail` steps move karke new tail dhoondo.
 * 8. `newHead = newTail.next` lo.
 * 9. `newTail.next = null` karke circle tod do.
 * 10. `newHead` return karo.
 *
 * Time Complexity:
 *   O(n), kyunki length nikaalne aur break-point tak jaane me linear work hota hai.
 *
 * Space Complexity:
 *   O(1), sirf pointers use hote hain.
 */

namespace RotateListOptimal {
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

    let length = 1;
    let tail = head;

    while (tail.next !== null) {
      tail = tail.next;
      length++;
    }

    const effectiveRotations = k % length;

    // Agar remainder 0 hai, toh full-cycle rotations hui hain.
    // List final position me original jaisi hi rahegi.
    if (effectiveRotations === 0) {
      return head;
    }

    // Circle banane se "tail ko front me laana" pointer rewiring ke through easy ho jata hai.
    tail.next = head;

    const stepsToNewTail = length - effectiveRotations - 1;
    let newTail = head;

    for (let step = 0; step < stepsToNewTail; step++) {
      // Head se itne steps chalna padta hai
      // taaki hum us node par land karein jiske baad naya head start hoga.
      newTail = newTail.next!;
    }

    const newHead = newTail.next!;

    // New head mil chuka hai.
    // Ab circle todna zaroori hai warna list cyclic hi rahegi.
    newTail.next = null;

    return newHead;
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
   * Step 1: length and tail
   *   length = 5
   *   tail = 5
   *
   * Step 2: effective rotations
   *   effectiveRotations = 2 % 5 = 2
   *
   * Step 3: make circular
   *   5.next = 1
   *
   *   1 -> 2 -> 3 -> 4 -> 5
   *   ^                   |
   *   |___________________|
   *
   * Step 4: find new tail
   *   stepsToNewTail = 5 - 2 - 1 = 2
   *
   *   start at 1
   *   move 1 -> 2
   *   move 2 -> 3
   *
   *   newTail = 3
   *   newHead = 4
   *
   * Step 5: break
   *   3.next = null
   *
   * Final:
   *   4 -> 5 -> 1 -> 2 -> 3
   *
   * ==========================================================
   * WHY `length - effectiveRotations - 1`
   * ==========================================================
   *
   * Right rotate by `effectiveRotations` means:
   *   last `effectiveRotations` nodes front me aayenge.
   *
   * So old list me new head se pehle:
   *   length - effectiveRotations
   * nodes hone chahiye.
   *
   * New tail us block ka last node hota hai,
   * isliye 0-indexed position:
   *
   *   length - effectiveRotations - 1
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty list:
   *    answer null.
   *
   * 2. `k` very large:
   *    modulo effective rotations ko small bana deta hai.
   *
   * 3. `k % length === 0`:
   *    new head old head hi rahega.
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
      { name: 'large k with modulo collapse', input: [1, 2, 3, 4], k: 10, expected: [3, 4, 1, 2] },
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

    console.log(`RotateListOptimal: ${passedTests}/${testCases.length} tests passed`);
  }
}

RotateListOptimal.runTests();
