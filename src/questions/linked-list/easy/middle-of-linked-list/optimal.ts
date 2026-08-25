/**
 * MIDDLE OF LINKED LIST - OPTIMAL
 * ===============================
 *
 * Problem:
 * Singly linked list ka middle node return karna hai.
 * Agar even length me 2 middle nodes ho, toh second middle return karna hai.
 *
 * Intuition:
 * Agar ek pointer 1 step chale aur dusra pointer 2 steps chale,
 * toh fast pointer jab end tak pahunchta hai, slow pointer half distance cover kar chuka hota hai.
 *
 * Ye same idea race jaisa hai:
 *   fast = double speed
 *   slow = half distance
 *
 * Algorithm:
 * 1. Agar `head` null hai, return null.
 * 2. `slow` aur `fast` dono ko head par start karo.
 * 3. Jab tak `fast` aur `fast.next` exist karte hain, loop chalao.
 * 4. Har iteration me `slow` ko 1 step aage move karo.
 * 5. Har iteration me `fast` ko 2 steps aage move karo.
 * 6. Jab fast end cross kare ya last node par ruk jaaye, slow middle par hota hai.
 * 7. `slow` return karo.
 *
 * Time Complexity:
 *   O(n), list ek hi pass me traverse hoti hai.
 *
 * Space Complexity:
 *   O(1), sirf two pointers use hote hain.
 */

namespace MiddleOfLinkedListOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  function middleNode(head: ListNode | null): ListNode | null {
    if (head === null) {
      // Empty list me koi node nahi hota,
      // isliye middle answer bhi null hi hoga.
      return null;
    }

    let slow: ListNode = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
      // `slow` answer candidate represent karta hai.
      // Fast double speed se chal raha hai, isliye slow ko sirf 1 step move karte hain.
      slow = slow.next as ListNode;

      // `fast.next !== null` condition ensure karti hai ki 2-step jump safe hai.
      // Fast ka kaam list ka end detect karna hai.
      fast = fast.next.next;
    }

    // Odd length: fast last node par rukta hai.
    // Even length: fast null ho jata hai.
    // Dono cases me slow required middle/second-middle par hota hai.
    return slow;
  }

  /**
   * ==========================================================
   * WHY SLOW-FAST POINTER WORKS
   * ==========================================================
   *
   * Example:
   *
   *   1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
   *
   * Start:
   *
   *   slow = 1
   *   fast = 1
   *
   * Every loop:
   *
   *   slow moves 1 node
   *   fast moves 2 nodes
   *
   * So when fast has travelled full list distance,
   * slow has travelled half list distance.
   *
   * ==========================================================
   * WHY EVEN LENGTH RETURNS SECOND MIDDLE
   * ==========================================================
   *
   * For 6 nodes:
   *
   *   index:  0  1  2  3  4  5
   *   value:  1  2  3  4  5  6
   *
   * Middle nodes are:
   *   index 2 -> value 3
   *   index 3 -> value 4
   *
   * We need second middle.
   *
   * Because slow moves while `fast.next` exists,
   * slow gets one final move from index 2 to index 3 before fast becomes null.
   *
   * ==========================================================
   * DRY RUN - EVEN LENGTH
   * ==========================================================
   *
   * Input:
   *   head = [1, 2, 3, 4, 5, 6]
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Initial                                                │
   * ├────────────────────────────────────────────────────────┤
   * │ 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null                     │
   * │ S/F                                                    │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Iteration 1                                            │
   * ├────────────────────────────────────────────────────────┤
   * │ before: slow = 1, fast = 1                             │
   * │ move slow 1 step -> slow = 2                           │
   * │ move fast 2 steps -> fast = 3                          │
   * │                                                        │
   * │ 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null                     │
   * │      S    F                                            │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Iteration 2                                            │
   * ├────────────────────────────────────────────────────────┤
   * │ before: slow = 2, fast = 3                             │
   * │ move slow 1 step -> slow = 3                           │
   * │ move fast 2 steps -> fast = 5                          │
   * │                                                        │
   * │ 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null                     │
   * │           S         F                                  │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Iteration 3                                            │
   * ├────────────────────────────────────────────────────────┤
   * │ before: slow = 3, fast = 5                             │
   * │ fast.next exists, so one more loop is allowed          │
   * │ move slow 1 step -> slow = 4                           │
   * │ move fast 2 steps -> fast = null                       │
   * │                                                        │
   * │ 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null                     │
   * │                S                     F                 │
   * └────────────────────────────────────────────────────────┘
   *
   * Loop stops because fast is null.
   * Return slow = node(4), suffix [4, 5, 6].
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

  function linkedListToArray(head: ListNode | null): number[] {
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
      {
        name: 'odd length list returns exact middle',
        input: [1, 2, 3, 4, 5],
        expectedSuffix: [3, 4, 5],
      },
      {
        name: 'even length list returns second middle',
        input: [1, 2, 3, 4, 5, 6],
        expectedSuffix: [4, 5, 6],
      },
      {
        name: 'single node list returns same node',
        input: [10],
        expectedSuffix: [10],
      },
      {
        name: 'two node list returns second node',
        input: [7, 9],
        expectedSuffix: [9],
      },
      {
        name: 'empty list returns null',
        input: [],
        expectedSuffix: [],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const head = createLinkedList(testCase.input);
      const middle = middleNode(head);
      const actualSuffix = linkedListToArray(middle);
      const passed = arraysEqual(actualSuffix, testCase.expectedSuffix);

      if (passed) {
        passedTests++;
      }

      console.log(`Test: ${testCase.name}`);
      console.log(`Input: [${testCase.input.join(', ')}]`);
      console.log(`Expected suffix: [${testCase.expectedSuffix.join(', ')}]`);
      console.log(`Actual suffix: [${actualSuffix.join(', ')}]`);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
      console.log('--------------------------------------------------');
    }

    console.log(`Passed ${passedTests}/${testCases.length} tests`);
  }
}

MiddleOfLinkedListOptimal.runTests();
