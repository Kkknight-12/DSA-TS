/**
 * MIDDLE OF LINKED LIST - BRUTE FORCE
 * ===================================
 *
 * Problem:
 * Singly linked list ka middle node return karna hai.
 * Agar even length me 2 middle nodes ho, toh second middle return karna hai.
 *
 * Intuition:
 * Linked list me direct index access nahi hota.
 * Isliye pehle nodes count karenge, phir head se middle index tak dobara chalenge.
 *
 * Middle index:
 *   total nodes = 5 -> Math.floor(5 / 2) = 2 -> node at index 2
 *   total nodes = 6 -> Math.floor(6 / 2) = 3 -> node at index 3 (second middle)
 *
 * Algorithm:
 * 1. Agar `head` null hai, return null.
 * 2. `current` ko head se start karo aur total nodes count karo.
 * 3. `middleIndex = Math.floor(count / 2)` calculate karo.
 * 4. `current` ko dobara head par reset karo.
 * 5. `middleIndex` steps tak current ko aage move karo.
 * 6. Loop ke baad current middle node par hoga, usko return karo.
 *
 * Time Complexity:
 *   O(n), list ko two passes me traverse karte hain.
 *
 * Space Complexity:
 *   O(1), sirf pointers/counters use hote hain.
 */

namespace MiddleOfLinkedListBruteForce {
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
      // Empty list me koi node exist hi nahi karta,
      // isliye middle node bhi null hoga.
      return null;
    }

    let totalNodes = 0;
    let current: ListNode | null = head;

    while (current !== null) {
      // `totalNodes` ab tak visit kiye gaye nodes ka count represent karta hai.
      totalNodes++;

      // Linked list sirf forward direction me accessible hai,
      // isliye next node par move karke counting continue karte hain.
      current = current.next;
    }

    const middleIndex = Math.floor(totalNodes / 2);

    current = head;

    for (let stepsTaken = 0; stepsTaken < middleIndex; stepsTaken++) {
      // `stepsTaken` batata hai head se kitne edges cross ho chuke hain.
      // Middle index tak pahunchne ke liye exactly `middleIndex` moves chahiye.
      current = current!.next;
    }

    return current;
  }

  /**
   * ==========================================================
   * WHY `Math.floor(totalNodes / 2)`?
   * ==========================================================
   *
   * Linked list positions 0-indexed socho:
   *
   * Odd length:
   *   values: [1, 2, 3, 4, 5]
   *   index:   0  1  2  3  4
   *   middle index = 2
   *
   * Even length:
   *   values: [1, 2, 3, 4, 5, 6]
   *   index:   0  1  2  3  4  5
   *   middle nodes = index 2 and index 3
   *   required answer = second middle = index 3
   *
   * Formula:
   *   Math.floor(5 / 2) = 2
   *   Math.floor(6 / 2) = 3
   *
   * Isliye same formula odd aur even dono cases cover karta hai.
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   head = [1, 2, 3, 4, 5, 6]
   *
   * Linked list:
   *
   *   1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ PASS 1: Count total nodes                              │
   * ├────────────────────────────────────────────────────────┤
   * │ current = 1, totalNodes = 1                            │
   * │ current = 2, totalNodes = 2                            │
   * │ current = 3, totalNodes = 3                            │
   * │ current = 4, totalNodes = 4                            │
   * │ current = 5, totalNodes = 5                            │
   * │ current = 6, totalNodes = 6                            │
   * │ current = null -> counting stop                        │
   * └────────────────────────────────────────────────────────┘
   *
   * middleIndex = Math.floor(6 / 2) = 3
   *
   * ┌────────────────────────────────────────────────────────┐
   * │ PASS 2: Move 3 steps from head                         │
   * ├────────────────────────────────────────────────────────┤
   * │ start: current = 1                                     │
   * │ step 1: current = 2                                    │
   * │ step 2: current = 3                                    │
   * │ step 3: current = 4                                    │
   * └────────────────────────────────────────────────────────┘
   *
   * Answer:
   *   current = node(4)
   *   return [4, 5, 6]
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

MiddleOfLinkedListBruteForce.runTests();
