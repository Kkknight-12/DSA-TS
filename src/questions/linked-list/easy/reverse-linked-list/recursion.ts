/**
 * REVERSE LINKED LIST - RECURSION
 * ===============================
 *
 * Problem:
 * Singly linked list ko recursively reverse karna hai.
 *
 * Intuition:
 * Recursive thought ye hai:
 *
 *   "Agar baaki chhoti list reverse ho jaaye,
 *    toh current node ko us reversed part ke end me jod sakte hain."
 *
 * Example:
 *   1 -> 2 -> 3 -> null
 *
 * Socho:
 *   reverse(1 -> 2 -> 3)
 * = reverse(2 -> 3) + attach 1 at end
 *
 * Algorithm:
 * 1. Agar list empty hai ya single node hai, wahi reversed answer hai.
 * 2. `head.next` se start hone wali baaki list ko recursively reverse karo.
 * 3. Recursive call ke baad `head.next` original next node ko point karega.
 * 4. `head.next.next = head` karke next node se current node ki taraf reverse link banao.
 * 5. `head.next = null` karke current node ko tail finalize karo.
 * 6. Recursive call se mila `newHead` hi final reversed list ka head hota hai, usko return karo.
 *
 * Time Complexity:
 *   O(n), har node ek baar process hota hai.
 *
 * Space Complexity:
 *   O(n), recursion call stack ki wajah se.
 */

namespace ReverseLinkedListRecursive {
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  function reverseList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
      // Empty list me kuch reverse nahi karna.
      // Single node apne aap me already reversed hota hai.
      return head;
    }

    const newHead = reverseList(head.next);

    // Recursive call ke baad `head.next` wali sublist reverse ho chuki hoti hai.
    // Ab original next node ko current node ki taraf point karake direction ulat dete hain.
    head.next.next = head;

    // Current node ab reversed chain ka tail ban raha hai.
    // Old forward link todna mandatory hai, warna cycle ban jayegi.
    head.next = null;

    return newHead;
  }

  /**
   * ==========================================================
   * RECURSION TREE
   * ==========================================================
   *
   * Example:
   *   reverse(1 -> 2 -> 3 -> 4)
   *
   * Single-branch recursion tree:
   *
   *   reverse(1)
   *     -> reverse(2)
   *          -> reverse(3)
   *               -> reverse(4)
   *                    -> base case
   *
   * Then unwind:
   *
   *   4 becomes head
   *   4 <- 3
   *   4 <- 3 <- 2
   *   4 <- 3 <- 2 <- 1
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Input:
   *   1 -> 2 -> 3 -> null
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: reverseList(1 -> 2 -> 3)                                     │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ head = 1                                                              │
   * │ Base case? head.next === null -> Nahi                                 │
   * │ Recursive call: reverseList(2 -> 3)                                   │
   * │                                                                      │
   * │   ┌──────────────────────────────────────────────────────────────┐   │
   * │   │ CALL 2: reverseList(2 -> 3)                                  │   │
   * │   ├──────────────────────────────────────────────────────────────┤   │
   * │   │ head = 2                                                      │   │
   * │   │ Base case? head.next === null -> Nahi                         │   │
   * │   │ Recursive call: reverseList(3)                                │   │
   * │   │                                                                │   │
   * │   │   ┌────────────────────────────────────────────────────────┐   │   │
   * │   │   │ CALL 3: reverseList(3)                                │   │   │
   * │   │   ├────────────────────────────────────────────────────────┤   │   │
   * │   │   │ head = 3                                                │   │   │
   * │   │   │ Base case? head.next === null -> Haan                   │   │   │
   * │   │   │ Return node(3) as newHead                               │   │   │
   * │   │   └────────────────────────────────────────────────────────┘   │   │
   * │   │                                                                │   │
   * │   │ Back to CALL 2                                                 │   │
   * │   │ newHead = 3                                                    │   │
   * │   │ head.next is node(3)                                           │   │
   * │   │ Do: head.next.next = head   => 3.next = 2                      │   │
   * │   │ Do: head.next = null       => 2.next = null                    │   │
   * │   │ Current reversed part: 3 -> 2 -> null                          │   │
   * │   │ Return newHead = 3                                              │   │
   * │   └──────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ Back to CALL 1                                                       │
   * │ newHead = 3                                                          │
   * │ head.next is node(2)                                                 │
   * │ Do: head.next.next = head   => 2.next = 1                            │
   * │ Do: head.next = null       => 1.next = null                          │
   * │ Current reversed part: 3 -> 2 -> 1 -> null                           │
   * │ Return newHead = 3                                                   │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   3 -> 2 -> 1 -> null
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

ReverseLinkedListRecursive.runTests();
