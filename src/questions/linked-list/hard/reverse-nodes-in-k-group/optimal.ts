/**
 * REVERSE NODES IN K-GROUP - OPTIMAL
 * ==================================
 *
 * Problem:
 * Singly linked list ko k-k size ke complete groups me reverse karna hai.
 * Jo last block `k` se chhota bache, usko reverse nahi karna.
 *
 * Important:
 * Node values change nahi kar sakte.
 * Sirf original nodes ke `next` pointers ko manipulate karna hai.
 *
 * Intuition:
 * Har iteration me hume 3 cheezein handle karni hain:
 *
 * 1. Check karo ki current position se complete k-group exist karta hai ya nahi
 * 2. Agar group complete hai, toh us group ko in-place reverse karo
 * 3. Reversed group ko previous aur next part ke saath correctly reconnect karo
 *
 * Sabse useful pointers:
 * - `groupPrev` : current group ke just pehle wala node
 * - `kthNode`   : current group ka last node
 * - `groupNext` : current group ke turant baad ka node
 *
 * Algorithm:
 * 1. Agar list empty hai ya `k <= 1` hai, as-is return karo.
 * 2. Dummy node banao jo `head` ko point kare, aur `groupPrev = dummy` rakho.
 * 3. Helper se current `groupPrev` ke baad ka k-th node find karo.
 * 4. Agar k-th node nahi mila, matlab complete group hi nahi hai, loop stop karo.
 * 5. `groupNext = kthNode.next` save karo, ye current group ke baad ka boundary node hai.
 * 6. Current group ko reverse karo by starting `prev = groupNext` and `current = groupPrev.next`.
 * 7. Reversal ke baad `groupPrev.next = kthNode` set karo, kyunki k-th node ab group ka new head ban chuka hoga.
 * 8. Original group start ab tail ban chuka hota hai, isliye `groupPrev` ko us tail par shift karo.
 * 9. Agla group process karne ke liye same steps repeat karo.
 * 10. Final answer `dummy.next` hoga.
 *
 * Time Complexity:
 *   O(n), har node constant number of times visit hota hai.
 *
 * Space Complexity:
 *   O(1), sirf pointers use hote hain.
 */

namespace ReverseKGroupOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (head === null || k <= 1) {
      // Empty list me kuch process karna nahi hota.
      // `k = 1` ka matlab har group already same shape me rahega.
      return head;
    }

    const dummy = new ListNode(0, head);
    let groupPrev: ListNode = dummy;

    while (true) {
      const kthNode = getKthNode(groupPrev, k);

      if (kthNode === null) {
        // `groupPrev` ke baad complete k nodes exist nahi karte.
        // Isliye remaining nodes ko as-is chhodna problem ka rule hai.
        break;
      }

      const groupNext = kthNode.next;

      // `groupPrev.next` current group ka original first node hai.
      // Reversal ke baad yehi node current group ka tail banega.
      const originalGroupStart = groupPrev.next as ListNode;

      let prev: ListNode | null = groupNext;
      let current: ListNode | null = originalGroupStart;

      while (current !== groupNext) {
        const nextNode: ListNode | null = current!.next;

        // `prev` reversed portion ka current front represent karta hai.
        // Current node ko isi front ke aage jodna actual reversal step hai.
        current!.next = prev;

        prev = current;
        current = nextNode;
      }

      // Reversal ke baad `kthNode` current group ka new head hai.
      // Previous already-processed part ko isi new head se reconnect karna padta hai.
      groupPrev.next = kthNode;

      // Original group start ab tail ban chuka hai.
      // Agle group ke just pehle wala node ab wahi hoga.
      groupPrev = originalGroupStart;
    }

    return dummy.next;
  }

  function getKthNode(
    startBeforeGroup: ListNode | null,
    k: number
  ): ListNode | null {
    let current = startBeforeGroup;

    while (current !== null && k > 0) {
      current = current.next;
      k--;
    }

    return current;
  }

  /**
   * ==========================================================
   * WHY `prev = groupNext` SE REVERSAL START KARTE HAIN
   * ==========================================================
   *
   * Suppose current group hai:
   *
   *   1 -> 2 -> 3 -> 4 -> 5
   *        current group
   *        [2, 3]
   *
   * Yahan:
   *   groupPrev = 1
   *   kthNode   = 3
   *   groupNext = 4
   *
   * Agar reversal ke pehle:
   *   prev = groupNext = 4
   *
   * Then:
   *   2.next = 4
   *   3.next = 2
   *
   * Final reversed group automatically ban jata hai:
   *
   *   3 -> 2 -> 4
   *
   * Is trick ki wajah se tail ko next part se alag se baad me connect karne ki
   * zaroorat nahi padti. Reversal ke dauraan hi correct tail connection ban jata hai.
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   head = [1, 2, 3, 4, 5]
   *   k = 2
   *
   * Initial:
   *   dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
   *   groupPrev = dummy
   *
   * ----------------------------------------------------------
   * Group 1
   * ----------------------------------------------------------
   *
   * getKthNode(dummy, 2) = node(2)
   *
   * groupPrev = dummy
   * kthNode   = 2
   * groupNext = 3
   * originalGroupStart = 1
   *
   * Reversal setup:
   *   prev = 3
   *   current = 1
   *
   * Iteration 1:
   *   nextNode = 2
   *   1.next = 3
   *   prev = 1
   *   current = 2
   *
   * Iteration 2:
   *   nextNode = 3
   *   2.next = 1
   *   prev = 2
   *   current = 3
   *
   * current === groupNext, stop
   *
   * Reconnect:
   *   groupPrev.next = kthNode
   *   dummy.next = 2
   *
   * List becomes:
   *   dummy -> 2 -> 1 -> 3 -> 4 -> 5 -> null
   *
   * Move:
   *   groupPrev = originalGroupStart = 1
   *
   * ----------------------------------------------------------
   * Group 2
   * ----------------------------------------------------------
   *
   * getKthNode(node(1), 2) = node(4)
   *
   * groupPrev = 1
   * kthNode   = 4
   * groupNext = 5
   * originalGroupStart = 3
   *
   * Reversal setup:
   *   prev = 5
   *   current = 3
   *
   * Iteration 1:
   *   nextNode = 4
   *   3.next = 5
   *   prev = 3
   *   current = 4
   *
   * Iteration 2:
   *   nextNode = 5
   *   4.next = 3
   *   prev = 4
   *   current = 5
   *
   * Reconnect:
   *   groupPrev.next = kthNode
   *   1.next = 4
   *
   * List becomes:
   *   dummy -> 2 -> 1 -> 4 -> 3 -> 5 -> null
   *
   * Move:
   *   groupPrev = 3
   *
   * ----------------------------------------------------------
   * Group 3
   * ----------------------------------------------------------
   *
   * getKthNode(node(3), 2) = null
   *
   * Complete group exist nahi karta,
   * so remaining [5] as-is chhod denge.
   *
   * Final answer:
   *   2 -> 1 -> 4 -> 3 -> 5 -> null
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. `k = 1`
   *    Har node apne aap me group hai, so no change.
   *
   * 2. `k > length`
   *    Ek bhi complete group nahi milega, so list same rahegi.
   *
   * 3. Last incomplete block
   *    Problem ke rule ke hisaab se usko reverse nahi karna.
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
        name: 'reverse every pair when k = 2',
        input: [1, 2, 3, 4, 5],
        k: 2,
        expected: [2, 1, 4, 3, 5],
      },
      {
        name: 'reverse complete triples when k = 3',
        input: [1, 2, 3, 4, 5],
        k: 3,
        expected: [3, 2, 1, 4, 5],
      },
      {
        name: 'k = 1 keeps list same',
        input: [1, 2, 3],
        k: 1,
        expected: [1, 2, 3],
      },
      {
        name: 'k larger than length keeps list same',
        input: [1, 2],
        k: 5,
        expected: [1, 2],
      },
      {
        name: 'exact multiple of k',
        input: [1, 2, 3, 4, 5, 6],
        k: 3,
        expected: [3, 2, 1, 6, 5, 4],
      },
      {
        name: 'single full group',
        input: [8, 9, 10],
        k: 3,
        expected: [10, 9, 8],
      },
      {
        name: 'empty list',
        input: [],
        k: 4,
        expected: [],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const head = createLinkedList(testCase.input);
      const reversedHead = reverseKGroup(head, testCase.k);
      const actual = listToArray(reversedHead);
      const passed = arraysEqual(actual, testCase.expected);

      if (passed) {
        passedTests++;
      }

      console.log(`Test: ${testCase.name}`);
      console.log(`Input: [${testCase.input.join(', ')}], k = ${testCase.k}`);
      console.log(`Expected: [${testCase.expected.join(', ')}]`);
      console.log(`Actual: [${actual.join(', ')}]`);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
      console.log('--------------------------------------------------');
    }

    console.log(`Passed ${passedTests}/${testCases.length} tests`);
  }
}

ReverseKGroupOptimal.runTests();
