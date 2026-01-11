/**
 * OPTIMAL RECURSIVE SOLUTION: Reverse Linked List
 *
 * Purpose: Reverse a singly linked list using recursion
 * Approach: Divide and conquer - recursively reverse rest, then attach current
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(n) - due to recursive call stack
 *
 * This approach is elegant but uses stack space!
 */

namespace ReverseLinkedListRecursive {
  /**
   * ListNode class - Represents a single node in the linked list
   */
  class ListNode {
    val: number; // Node ki value
    next: ListNode | null; // Agle node ka reference (null if last node)

    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main recursive function to reverse the linked list
   *
   * Algorithm: Divide and Conquer
   * ==============================
   *
   * INTUITION:
   * - Agar main puri list reverse kar sakta hoon,
   * - Toh pehle baaki list reverse karo (recursively)
   * - Phir current node ko end mein attach kar do
   *
   * RECURSIVE FORMULA:
   * reverse(head) = reverse(head.next) + attach head at end
   *
   * DETAILED STEPS:
   * 1. BASE CASE: Agar list empty ya single node → return as-is
   * 2. RECURSIVE CALL: Baaki list ko reverse karo (head.next se start)
   * 3. ATTACH CURRENT: Current node ko reversed list ke end mein lagao
   *    - head.next.next = head  (next node ka next current pe point karo)
   *    - head.next = null       (current ka next null kar do)
   * 4. RETURN: Reversed list ka head return karo (jo recursive call se mila)
   *
   * EXAMPLE TRACE:
   * reverse(1 → 2 → 3)
   *   = reverse(2 → 3) + attach 1
   *   = (reverse(3) + attach 2) + attach 1
   *   = (3 + attach 2) + attach 1
   *   = (3 → 2) + attach 1
   *   = 3 → 2 → 1 ✅
   *
   * @param head - Head of the original linked list
   * @returns Head of the reversed linked list
   */
  function reverseList(head: ListNode | null): ListNode | null {
    // BASE CASE 1: Empty list
    // Agar list hi empty hai toh null return kar do
    if (head === null) {
      return null;
    }

    // BASE CASE 2: Single node (last node reached)
    // Agar sirf ek node hai (ya recursion ka deepest point hai)
    // Toh isko reverse karne ki zaroorat nahi, as-is return kar do
    if (head.next === null) {
      return head; // Ye hi reversed list ka head ban jayega
    }

    // RECURSIVE STEP 1: Baaki list ko reverse karo
    // head.next se shuru hone wali poori list ko reverse kar do
    // Ye recursive call tab tak chalti rahegi jab tak base case na aa jaye
    const newHead = reverseList(head.next);

    // Ab is point pe: head.next se aage wali saari list reverse ho chuki hai
    // Aur newHead us reversed list ka head hai

    // RECURSIVE STEP 2: Current node ko reversed list ke end mein attach karo

    // Samajhne ke liye example: head = 1, head.next = 2
    // Recursive call ne 2 → 3 → 4 → 5 ko reverse kar diya
    // Ab list hai: 5 → 4 → 3 → 2 (aur 1 ka connection abhi bhi 2 pe hai)

    // Step 2a: head.next (jo 2 hai) ka next ko head (1) pe point karo
    // Matlab: 2.next = 1
    // Isse 2 ab 1 ko point karega (connection reverse!)
    head.next.next = head;

    // Step 2b: Current node (head) ka next null kar do
    // Kyunki current node ab list ka last node ban gaya hai
    // Agar ye nahi karenge toh circular reference ban jayega!
    head.next = null;

    // Visual explanation of above two steps:
    // Before: 1 → 2    and reversed part: 5 → 4 → 3 → 2
    // After:  1.next.next = 1  →  2.next = 1
    //         1.next = null     →  5 → 4 → 3 → 2 → 1 → null ✅

    // RECURSIVE STEP 3: Return the new head
    // Jo newHead recursive call se mila tha wo hi return karo
    // Ye head change nahi hoga - jo last node thi wo hi head rahegi
    return newHead;
  }

  /**
   * Helper function: Create a linked list from an array
   * Test cases ke liye useful
   *
   * @param arr - Array of numbers
   * @returns Head of the created linked list
   */
  function createLinkedList(arr: number[]): ListNode | null {
    // Empty array ke liye null return karo
    if (arr.length === 0) return null;

    // Pehla node banao
    const head = new ListNode(arr[0]);
    let current = head;

    // Baaki nodes banao aur link karo
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }

    return head;
  }

  /**
   * Helper function: Convert linked list to array
   * Output ko easily print karne ke liye
   *
   * @param head - Head of the linked list
   * @returns Array representation of the list
   */
  function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;

    // List ko traverse karke saari values array mein daalo
    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  /**
   * Helper function: Print list with arrow notation
   */
  function printList(head: ListNode | null, label: string): void {
    const arr = listToArray(head);
    console.log(
      `${label}: [${arr.join(' → ')}]${arr.length > 0 ? ' → null' : ''}`
    );
  }

  /**
   * Recursive depth tracker - for visualization
   * Ye function recursion depth track karta hai (optional, learning ke liye)
   */
  function reverseListWithDepth(
    head: ListNode | null,
    depth: number = 0
  ): ListNode | null {
    // Recursion depth print karo (debugging ke liye)
    const indent = '  '.repeat(depth);
    console.log(
      `${indent}→ reverse(${head?.val || 'null'}) called at depth ${depth}`
    );

    // Base cases
    if (head === null || head.next === null) {
      console.log(
        `${indent}← BASE CASE reached, returning ${head?.val || 'null'}`
      );
      return head;
    }

    // Recursive call
    console.log(`${indent}  Calling reverse(${head.next.val})...`);
    const newHead = reverseListWithDepth(head.next, depth + 1);

    // Processing after recursive call
    console.log(
      `${indent}  Processing node ${head.val}: ${head.val}.next.next = ${head.val}, ${head.val}.next = null`
    );
    head.next.next = head;
    head.next = null;

    console.log(`${indent}← Returning newHead = ${newHead?.val}`);
    return newHead;
  }

  /**
   * Test function: Multiple test cases with detailed output
   */
  export function runTests(): void {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🧪 Testing Reverse Linked List - RECURSIVE APPROACH');
    console.log('   (Elegant but O(n) Stack Space)');
    console.log('═══════════════════════════════════════════════════════\n');

    // Test Case 1: Normal list with multiple nodes
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Case 1: Multiple nodes [1,2,3,4,5]');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    let head1 = createLinkedList([1, 2, 3, 4, 5]);
    printList(head1, 'Input ');
    let reversed1 = reverseList(head1);
    printList(reversed1, 'Output');
    console.log('Expected: [5 → 4 → 3 → 2 → 1] → null');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed1)) === JSON.stringify([5, 4, 3, 2, 1])
    );
    console.log();

    // Test Case 2: List with two nodes
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Case 2: Two nodes [1,2]');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    let head2 = createLinkedList([1, 2]);
    printList(head2, 'Input ');
    let reversed2 = reverseList(head2);
    printList(reversed2, 'Output');
    console.log('Expected: [2 → 1] → null');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed2)) === JSON.stringify([2, 1])
    );
    console.log();

    // Test Case 3: Empty list
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Case 3: Empty list []');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    let head3 = createLinkedList([]);
    printList(head3, 'Input ');
    let reversed3 = reverseList(head3);
    printList(reversed3, 'Output');
    console.log('Expected: []');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed3)) === JSON.stringify([])
    );
    console.log();

    // Test Case 4: Single node
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Case 4: Single node [1]');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    let head4 = createLinkedList([1]);
    printList(head4, 'Input ');
    let reversed4 = reverseList(head4);
    printList(reversed4, 'Output');
    console.log('Expected: [1] → null');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed4)) === JSON.stringify([1])
    );
    console.log();

    // Test Case 5: Larger list
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Case 5: Larger list [10,20,30,40,50,60]');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    let head5 = createLinkedList([10, 20, 30, 40, 50, 60]);
    printList(head5, 'Input ');
    let reversed5 = reverseList(head5);
    printList(reversed5, 'Output');
    console.log('Expected: [60 → 50 → 40 → 30 → 20 → 10] → null');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed5)) ===
        JSON.stringify([60, 50, 40, 30, 20, 10])
    );
    console.log();

    // Test Case 6: Visualize recursion depth (simple example)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Case 6: Recursion Visualization [1,2,3]');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Showing call stack depth and order:\n');
    let head6 = createLinkedList([1, 2, 3]);
    let reversed6 = reverseListWithDepth(head6);
    console.log('\nFinal result:', listToArray(reversed6));

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ All tests completed!');
    console.log('═══════════════════════════════════════════════════════');
  }
}

// Namespace ke bahar se test function call karo
ReverseLinkedListRecursive.runTests();