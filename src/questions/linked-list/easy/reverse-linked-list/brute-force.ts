/**
 * REVERSE LINKED LIST - BRUTE FORCE
 * =================================
 *
 * Problem:
 * Singly linked list ko reverse karna hai.
 * Matlab last node ko head banana hai, aur saare `next` links opposite direction me point karne chahiye.
 *
 * Intuition:
 * Linked list me backward move directly possible nahi hota.
 * Isliye pehle saare original nodes ko array me store kar lo.
 *
 * Phir:
 *   array ke end se start karke links ulte jod do
 *
 * Example:
 *   original order in array  = [1, 2, 3, 4, 5]
 *   reversed node order      = [5, 4, 3, 2, 1]
 *
 * Algorithm:
 * 1. Agar list empty hai ya single node hai, as-is return karo.
 * 2. List traverse karke saare original nodes ko array `nodes` me store karo.
 * 3. `nodes[n - 1]` ko new head banao, kyunki original last node hi reversed list ka first node banega.
 * 4. Array me right to left chalte hue `nodes[index].next = nodes[index - 1]` set karo.
 * 5. Original head `nodes[0]` ab reversed list ka tail hai, isliye uska `next = null` karo.
 * 6. New head return karo.
 *
 * Time Complexity:
 *   O(n), ek pass store karne ke liye aur ek pass relink karne ke liye.
 *
 * Space Complexity:
 *   O(n), array me saare node references store hote hain.
 */

namespace ReverseLinkedListBruteForce {
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
      // Empty list me reverse karne ko kuch hai hi nahi.
      // Single node list me wahi node head bhi hai aur tail bhi.
      return head;
    }

    const nodes: ListNode[] = [];
    let current: ListNode | null = head;

    while (current !== null) {
      // `nodes` original left-to-right visit order ko preserve karta hai.
      // Later isi order ko ulta padhkar reverse linking karenge.
      nodes.push(current);
      current = current.next;
    }

    const newHead = nodes[nodes.length - 1];

    for (let index = nodes.length - 1; index > 0; index--) {
      // Current node reversed list me apne se pehle wale original node ko point karega.
      // Example: original ... 4,5  =>  reversed me 5.next = 4
      nodes[index].next = nodes[index - 1];
    }

    // Original first node ab reversed list ka last node ban gaya.
    // Agar iska next null na karein toh old forward connection bacha rahega aur cycle ban sakti hai.
    nodes[0].next = null;

    return newHead;
  }

  /**
   * ==========================================================
   * WHY ARRAY HELPS
   * ==========================================================
   *
   * Original linked list:
   *
   *   1 -> 2 -> 3 -> 4 -> 5 -> null
   *
   * Problem:
   *   linked list me `previous` pointer nahi hota
   *
   * So directly 5 se 4 par ya 4 se 3 par backward jana possible nahi.
   *
   * Array banane ke baad:
   *
   *   nodes = [node(1), node(2), node(3), node(4), node(5)]
   *
   * Ab hum end se start tak easily access kar sakte hain:
   *
   *   node(5), node(4), node(3), node(2), node(1)
   *
   * Isi reversed access ko actual `next` links me convert kar dete hain.
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   head = [1, 2, 3, 4]
   *
   * Original:
   *   1 -> 2 -> 3 -> 4 -> null
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Phase 1: Store original nodes                          │
   * ├────────────────────────────────────────────────────────┤
   * │ visit 1 -> nodes = [1]                                 │
   * │ visit 2 -> nodes = [1, 2]                              │
   * │ visit 3 -> nodes = [1, 2, 3]                           │
   * │ visit 4 -> nodes = [1, 2, 3, 4]                        │
   * └────────────────────────────────────────────────────────┘
   *
   * newHead = nodes[3] = node(4)
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ Phase 2: Relink backward                               │
   * ├────────────────────────────────────────────────────────┤
   * │ index = 3 -> nodes[3].next = nodes[2]  => 4 -> 3       │
   * │ index = 2 -> nodes[2].next = nodes[1]  => 3 -> 2       │
   * │ index = 1 -> nodes[1].next = nodes[0]  => 2 -> 1       │
   * │ finally nodes[0].next = null           => 1 -> null    │
   * └────────────────────────────────────────────────────────┘
   *
   * Final reversed list:
   *   4 -> 3 -> 2 -> 1 -> null
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

ReverseLinkedListBruteForce.runTests();
