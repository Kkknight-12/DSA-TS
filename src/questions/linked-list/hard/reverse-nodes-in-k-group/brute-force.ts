/**
 * REVERSE NODES IN K-GROUP - BRUTE FORCE
 * ======================================
 *
 * Problem:
 * Singly linked list aur integer `k` diya hai.
 * Hume list ko k-k size ke groups me reverse karna hai.
 *
 * Rule:
 * - Sirf complete groups reverse honge
 * - Agar last me `k` se chhota group bacha, usko as-is chhod dena hai
 *
 * Intuition:
 * Linked list me random access nahi hota.
 * K-group reversal ko directly pointers par karna thoda tricky hota hai.
 *
 * Brute force soch:
 * 1. Saare original nodes ko array me store kar lo
 * 2. Array me har complete k-sized block ko reverse kar lo
 * 3. Final array order ke hisaab se `next` pointers dobara jod do
 *
 * Example:
 *   list = 1 -> 2 -> 3 -> 4 -> 5, k = 2
 *
 *   stored nodes order: [1, 2, 3, 4, 5]
 *   reverse groups    : [2, 1, 4, 3, 5]
 *   rebuilt list      : 2 -> 1 -> 4 -> 3 -> 5
 *
 * Algorithm:
 * 1. Agar list empty hai ya `k <= 1` hai, as-is return karo.
 * 2. Linked list traverse karke saare original node references array `nodes` me store karo.
 * 3. Har group start index ke liye check karo ki `groupStart + k <= nodes.length`.
 * 4. Agar complete group exist karta hai, two pointers se us block ko array me reverse karo.
 * 5. Saare groups process hone ke baad array order ke hisaab se `nodes[i].next = nodes[i + 1]` set karo.
 * 6. Last node ka `next = null` karo, kyunki rebuilt list ka tail wahi hoga.
 * 7. `nodes[0]` new head hoga, usko return karo.
 *
 * Time Complexity:
 *   O(n), storing + group reversal + relinking sab linear hai.
 *
 * Space Complexity:
 *   O(n), array me saare node references store hote hain.
 */

namespace ReverseKGroupBruteForce {
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
      // Empty list me reverse karne ko kuch nahi hota.
      // `k = 1` ka matlab har group already same shape me rahega.
      return head;
    }

    const nodes: ListNode[] = [];
    let current: ListNode | null = head;

    while (current !== null) {
      // `nodes` original left-to-right node order ko preserve karta hai.
      // Baad me isi array me blocks reverse karke final node order decide karenge.
      nodes.push(current);
      current = current.next;
    }

    for (
      let groupStart = 0;
      groupStart + k <= nodes.length;
      groupStart += k
    ) {
      let left = groupStart;
      let right = groupStart + k - 1;

      while (left < right) {
        // Current k-sized block ke sirf order ko reverse karna hai.
        // Array swap karne se pointer juggling se pehle safe order mil jata hai.
        const temp = nodes[left];
        nodes[left] = nodes[right];
        nodes[right] = temp;

        left++;
        right--;
      }
    }

    for (let index = 0; index < nodes.length - 1; index++) {
      // Array reversal ke baad jo adjacent nodes hain,
      // linked list me bhi unko isi order me jodna hai.
      nodes[index].next = nodes[index + 1];
    }

    // Final node rebuilt list ka tail hoga.
    // Agar isko null na karein toh old next pointer se wrong connection bach sakta hai.
    nodes[nodes.length - 1].next = null;

    return nodes[0];
  }

  /**
   * ==========================================================
   * WHY ARRAY APPROACH WORKS
   * ==========================================================
   *
   * Original list:
   *
   *   1 -> 2 -> 3 -> 4 -> 5 -> null
   *
   * `k = 2`
   *
   * Linked list par directly block reverse karna tough lag sakta hai because:
   *
   *   current node se peeche randomly jump nahi kar sakte
   *
   * Array banane ke baad:
   *
   *   nodes = [1, 2, 3, 4, 5]
   *
   * Ab complete groups easy ho jate hain:
   *
   *   [1, 2] -> [2, 1]
   *   [3, 4] -> [4, 3]
   *   [5]    -> incomplete, as-is
   *
   * Final array:
   *
   *   [2, 1, 4, 3, 5]
   *
   * Phir bas next pointers ko isi final array order ke according jod dete hain.
   *
   * ==========================================================
   * DRY RUN
   * ==========================================================
   *
   * Input:
   *   head = [1, 2, 3, 4, 5]
   *   k = 2
   *
   * Original list:
   *   1 -> 2 -> 3 -> 4 -> 5 -> null
   *
   * ----------------------------------------------------------
   * Phase 1: Store nodes
   * ----------------------------------------------------------
   * visit 1 -> nodes = [1]
   * visit 2 -> nodes = [1, 2]
   * visit 3 -> nodes = [1, 2, 3]
   * visit 4 -> nodes = [1, 2, 3, 4]
   * visit 5 -> nodes = [1, 2, 3, 4, 5]
   *
   * ----------------------------------------------------------
   * Phase 2: Reverse complete groups
   * ----------------------------------------------------------
   *
   * groupStart = 0
   * complete group? 0 + 2 <= 5 -> yes
   *
   * group before: [1, 2]
   * swap nodes[0] and nodes[1]
   * array becomes: [2, 1, 3, 4, 5]
   *
   * groupStart = 2
   * complete group? 2 + 2 <= 5 -> yes
   *
   * group before: [3, 4]
   * swap nodes[2] and nodes[3]
   * array becomes: [2, 1, 4, 3, 5]
   *
   * groupStart = 4
   * complete group? 4 + 2 <= 5 -> no
   * remaining [5] stays as-is
   *
   * ----------------------------------------------------------
   * Phase 3: Relink according to final array
   * ----------------------------------------------------------
   *
   * 2.next = 1
   * 1.next = 4
   * 4.next = 3
   * 3.next = 5
   * 5.next = null
   *
   * Final answer:
   *   2 -> 1 -> 4 -> 3 -> 5 -> null
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. head = null
   *    return null
   *
   * 2. k = 1
   *    har group size 1 hai, so list same rahegi
   *
   * 3. k > list length
   *    koi complete group hi nahi banega, so list same rahegi
   *
   * 4. last incomplete block
   *    usko reverse nahi karna
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

ReverseKGroupBruteForce.runTests();
