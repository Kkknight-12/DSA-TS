/**
 * REVERSE LINKED LIST - OPTIMAL ITERATIVE
 * =======================================
 *
 * Problem:
 * Singly linked list ko reverse karna hai.
 * Har node ka `next` link opposite direction me point karega.
 *
 * Intuition:
 * Reversal ka real kaam sirf ek hi hai:
 *
 *   current.next ko aage ki jagah peeche point karwana
 *
 * Lekin agar seedha `current.next = prev` kar diya,
 * toh aage wali list ka address kho sakte hain.
 *
 * Isliye 3 pointers chahiye:
 *   `prev`    -> reversed part ka head
 *   `current` -> jis node ko abhi process kar rahe hain
 *   `nextNode`-> original forward direction ka backup
 *
 * Algorithm:
 * 1. `prev = null`, `current = head` se start karo.
 * 2. Jab tak `current` null nahi hota, loop chalao.
 * 3. `nextNode = current.next` me aage ka backup save karo.
 * 4. `current.next = prev` karke current link ko reverse karo.
 * 5. `prev = current` karke reversed part ko ek node bada do.
 * 6. `current = nextNode` karke original list ke next node par move karo.
 * 7. Loop ke baad `prev` new head ban jata hai, usko return karo.
 *
 * Time Complexity:
 *   O(n), har node exactly ek baar process hota hai.
 *
 * Space Complexity:
 *   O(1), sirf constant extra pointers use hote hain.
 */

namespace ReverseLinkedListOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;

    while (current !== null) {
      const nextNode = current.next;

      // `prev` reversed portion ka current front represent karta hai.
      // Current node ko isi reversed portion ke aage jodna reversal ka main step hai.
      current.next = prev;

      // Ab current node successfully reversed side me aa chuka hai,
      // isliye `prev` ko isi node par shift karte hain.
      prev = current;

      // Original forward traversal continue rakhne ke liye backup `nextNode` par move karna padta hai.
      current = nextNode;
    }

    // Loop khatam hone par `current` null hota hai,
    // aur `prev` last processed node yani new head ko point kar raha hota hai.
    return prev;
  }

  /**
   * ==========================================================
   * WHY 3 POINTERS NEEDED
   * ==========================================================
   *
   * Current situation:
   *
   *   prev <- current -> nextNode -> ...
   *
   * Hume `current.next = prev` karna hai.
   *
   * Agar `nextNode` pehle save na karein,
   * toh `current.next` change karte hi original forward path ka address kho denge.
   *
   * So safe order hamesha ye rahega:
   *
   *   1. backup next
   *   2. reverse current link
   *   3. move prev
   *   4. move current
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   1 -> 2 -> 3 -> 4 -> null
   *
   * Initial:
   *   prev = null
   *   current = 1
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Iteration 1                                            │
   * ├────────────────────────────────────────────────────────┤
   * │ nextNode = 2                                           │
   * │ current.next = prev   => 1 -> null                     │
   * │ prev = 1                                                │
   * │ current = 2                                             │
   * │                                                        │
   * │ reversed part: 1 -> null                               │
   * │ remaining    : 2 -> 3 -> 4 -> null                     │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Iteration 2                                            │
   * ├────────────────────────────────────────────────────────┤
   * │ nextNode = 3                                           │
   * │ current.next = prev   => 2 -> 1 -> null               │
   * │ prev = 2                                                │
   * │ current = 3                                             │
   * │                                                        │
   * │ reversed part: 2 -> 1 -> null                          │
   * │ remaining    : 3 -> 4 -> null                          │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Iteration 3                                            │
   * ├────────────────────────────────────────────────────────┤
   * │ nextNode = 4                                           │
   * │ current.next = prev   => 3 -> 2 -> 1 -> null          │
   * │ prev = 3                                                │
   * │ current = 4                                             │
   * └────────────────────────────────────────────────────────┘
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Iteration 4                                            │
   * ├────────────────────────────────────────────────────────┤
   * │ nextNode = null                                        │
   * │ current.next = prev   => 4 -> 3 -> 2 -> 1 -> null     │
   * │ prev = 4                                                │
   * │ current = null                                          │
   * └────────────────────────────────────────────────────────┘
   *
   * Answer:
   *   prev = 4 -> 3 -> 2 -> 1 -> null
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
      {
        name: 'multiple nodes',
        input: [1, 2, 3, 4, 5],
        expected: [5, 4, 3, 2, 1],
      },
      {
        name: 'two nodes',
        input: [1, 2],
        expected: [2, 1],
      },
      {
        name: 'single node',
        input: [7],
        expected: [7],
      },
      {
        name: 'empty list',
        input: [],
        expected: [],
      },
      {
        name: 'negative values',
        input: [-3, -2, -1],
        expected: [-1, -2, -3],
      },
      {
        name: 'mixed values',
        input: [10, 20, 30, 40],
        expected: [40, 30, 20, 10],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const head = createLinkedList(testCase.input);
      const reversedHead = reverseList(head);
      const actual = listToArray(reversedHead);
      const passed = arraysEqual(actual, testCase.expected);

      if (passed) {
        passedTests++;
      }

      console.log(`Test: ${testCase.name}`);
      console.log(`Input: [${testCase.input.join(', ')}]`);
      console.log(`Expected: [${testCase.expected.join(', ')}]`);
      console.log(`Actual: [${actual.join(', ')}]`);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
      console.log('--------------------------------------------------');
    }

    console.log(`Passed ${passedTests}/${testCases.length} tests`);
  }
}

ReverseLinkedListOptimal.runTests();
