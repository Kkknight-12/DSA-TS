/**
 * ADD TWO NUMBERS - SOLUTION
 * ==========================
 *
 * Problem:
 * Do linked lists reverse order me digits store karti hain.
 * Hume un dono numbers ka sum nikal kar result bhi reverse-order linked list me return karna hai.
 *
 * Intuition:
 * Ye bilkul school addition jaisa hai:
 *
 *   units place add karo
 *   carry banao
 *   next place par jao
 *
 * Difference sirf itna hai:
 *
 *   linked list already reverse order me hai
 *
 * Matlab:
 *
 *   head hi units place represent karta hai
 *
 * So hum left-to-right traverse karke actually right-to-left addition simulate kar lete hain.
 *
 * Algorithm:
 * 1. Dummy head banao aur `current` ko dummy par rakho.
 * 2. `carry = 0` se start karo.
 * 3. Jab tak `l1`, `l2`, ya `carry` me kuch bacha hai, loop chalao.
 * 4. Har iteration me `digit1` aur `digit2` nikaalo; agar list khatam ho chuki ho toh us digit ko 0 treat karo.
 * 5. `sum = digit1 + digit2 + carry` calculate karo.
 * 6. `digitToStore = sum % 10` nikaalo, ye current result node ka digit hoga.
 * 7. `carry = Math.floor(sum / 10)` update karo, ye next place ke liye bachega.
 * 8. `digitToStore` wali new node result list me append karo.
 * 9. `l1`, `l2`, aur `current` ko aage move karo.
 * 10. Loop ke baad `dummy.next` return karo.
 *
 * Time Complexity:
 *   O(max(m, n)), jahan m aur n dono lists ki lengths hain.
 *
 * Space Complexity:
 *   O(max(m, n)) output list ke liye.
 *   Auxiliary extra space O(1) hai.
 */

namespace AddTwoNumbersSolution {
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null
  ): ListNode | null {
    const dummyHead = new ListNode(0);
    let current: ListNode = dummyHead;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
      const digit1 = l1 !== null ? l1.val : 0;
      const digit2 = l2 !== null ? l2.val : 0;
      const sum = digit1 + digit2 + carry;
      const digitToStore = sum % 10;

      // `carry` next decimal place ka unresolved part represent karta hai.
      // Agar sum 10 ya usse bada hai, toh tens place ko next iteration me le jaana padega.
      carry = Math.floor(sum / 10);

      current.next = new ListNode(digitToStore);

      // `current` result list ke last built node ko track karta hai.
      // New node append ho gayi, isliye tail pointer ko aage shift karna zaroori hai.
      current = current.next;

      if (l1 !== null) {
        // Current digit consume ho chuka hai,
        // isliye first number ke next place par move karte hain.
        l1 = l1.next;
      }

      if (l2 !== null) {
        // Current digit consume ho chuka hai,
        // isliye second number ke next place par move karte hain.
        l2 = l2.next;
      }
    }

    return dummyHead.next;
  }

  /**
   * ==========================================================
   * WHY `carry !== 0` LOOP CONDITION ME CHAHIYE
   * ==========================================================
   *
   * Example:
   *   l1 = [9, 9, 9]
   *   l2 = [1]
   *
   * Addition:
   *   999 + 1 = 1000
   *
   * Last iteration ke baad dono lists null ho sakti hain,
   * but carry abhi bhi `1` bach sakta hai.
   *
   * Agar loop condition me `carry !== 0` nahi hota,
   * toh final `1` result list me add hi nahi hota.
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   l1 = [2, 4, 3]
   *   l2 = [5, 6, 4]
   *
   * Meaning:
   *   l1 represents 342
   *   l2 represents 465
   *
   * Initial:
   *   dummyHead -> null
   *   current = dummyHead
   *   carry = 0
   *
   * ----------------------------------------------------------
   * Iteration 1
   * ----------------------------------------------------------
   * digit1 = 2
   * digit2 = 5
   * carry before = 0
   *
   * sum = 2 + 5 + 0 = 7
   * digitToStore = 7
   * carry after = 0
   *
   * result list:
   *   dummyHead -> 7
   *
   * move:
   *   l1 -> 4
   *   l2 -> 6
   *   current -> 7
   *
   * ----------------------------------------------------------
   * Iteration 2
   * ----------------------------------------------------------
   * digit1 = 4
   * digit2 = 6
   * carry before = 0
   *
   * sum = 4 + 6 + 0 = 10
   * digitToStore = 0
   * carry after = 1
   *
   * result list:
   *   dummyHead -> 7 -> 0
   *
   * move:
   *   l1 -> 3
   *   l2 -> 4
   *   current -> 0
   *
   * ----------------------------------------------------------
   * Iteration 3
   * ----------------------------------------------------------
   * digit1 = 3
   * digit2 = 4
   * carry before = 1
   *
   * sum = 3 + 4 + 1 = 8
   * digitToStore = 8
   * carry after = 0
   *
   * result list:
   *   dummyHead -> 7 -> 0 -> 8
   *
   * move:
   *   l1 -> null
   *   l2 -> null
   *   current -> 8
   *
   * Final answer:
   *   dummyHead.next = 7 -> 0 -> 8 -> null
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Different lengths
   *    Example: [9,9,9,9,9,9,9] + [9,9,9,9]
   *    Shorter list khatam hone ke baad uski digit value 0 treat karenge.
   *
   * 2. Final carry
   *    Example: [9,9,9] + [1]
   *    Result me extra node [1] add karni padegi.
   *
   * 3. Zero + zero
   *    Example: [0] + [0]
   *    Answer [0] hi rahega.
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
        name: 'basic example with no final carry',
        l1: [2, 4, 3],
        l2: [5, 6, 4],
        expected: [7, 0, 8],
      },
      {
        name: 'zero plus zero',
        l1: [0],
        l2: [0],
        expected: [0],
      },
      {
        name: 'final carry creates extra node',
        l1: [9, 9, 9],
        l2: [1],
        expected: [0, 0, 0, 1],
      },
      {
        name: 'different lengths',
        l1: [9, 9, 9, 9, 9, 9, 9],
        l2: [9, 9, 9, 9],
        expected: [8, 9, 9, 9, 0, 0, 0, 1],
      },
      {
        name: 'carry in middle but not at end',
        l1: [5],
        l2: [5],
        expected: [0, 1],
      },
      {
        name: 'one list much longer',
        l1: [1, 0, 0, 0, 0, 0, 1],
        l2: [5, 6, 4],
        expected: [6, 6, 4, 0, 0, 0, 1],
      },
    ];

    let passedTests = 0;

    for (const testCase of testCases) {
      const l1 = createLinkedList(testCase.l1);
      const l2 = createLinkedList(testCase.l2);
      const result = addTwoNumbers(l1, l2);
      const actual = listToArray(result);
      const passed = arraysEqual(actual, testCase.expected);

      if (passed) {
        passedTests++;
      }

      console.log(`Test: ${testCase.name}`);
      console.log(`l1: [${testCase.l1.join(', ')}]`);
      console.log(`l2: [${testCase.l2.join(', ')}]`);
      console.log(`Expected: [${testCase.expected.join(', ')}]`);
      console.log(`Actual: [${actual.join(', ')}]`);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
      console.log('--------------------------------------------------');
    }

    console.log(`Passed ${passedTests}/${testCases.length} tests`);
  }
}

AddTwoNumbersSolution.runTests();
