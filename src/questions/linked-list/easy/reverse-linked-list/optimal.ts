/**
 * OPTIMAL ITERATIVE SOLUTION: Reverse Linked List
 *
 * Purpose: Reverse a singly linked list in-place using constant space
 * Approach: Three pointers technique (prev, curr, next)
 * Time Complexity: O(n) - single pass through the list
 * Space Complexity: O(1) - only using 3 pointers (constant space)
 *
 * This is the MOST PREFERRED approach for interviews!
 */

namespace ReverseLinkedListOptimal {
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
   * Main function to reverse the linked list using optimal iterative approach
   *
   * Algorithm: Three Pointers Technique
   * =====================================
   * Core Idea: Har node ke next pointer ko reverse karte jao
   *
   * WHY 3 pointers?
   * - prev: Track karne ke liye ki previous node kaunsi thi (reverse connection ke liye)
   * - curr: Current node jisko hum reverse kar rahe hain
   * - next: Backup rakhne ke liye aage wali node ka (taaki connection na toote)
   *
   * Steps in each iteration:
   * 1. next = curr.next     → Aage wale node ko save karo (backup)
   * 2. curr.next = prev     → Current ke next ko prev se jodo (REVERSAL!)
   * 3. prev = curr          → prev ko ek step aage badhao
   * 4. curr = next          → curr ko ek step aage badhao
   *
   * @param head - Head of the original linked list
   * @returns Head of the reversed linked list
   */
  function reverseList(head: ListNode | null): ListNode | null {
    // Edge Case: Agar list empty hai ya sirf ek node hai
    // Toh reverse karne ki zaroorat nahi, as-is return kar do
    if (head === null || head.next === null) {
      return head;
    }

    // Step 1: Initialize three pointers
    let prev: ListNode | null = null; // Initially, pehle node ke peeche kuch nahi
    let curr: ListNode | null = head; // Current pointer head se start hota hai
    let next: ListNode | null = null; // Next pointer ko baad mein use karenge

    // Step 2: Traverse the list and reverse each connection
    // Jab tak current null nahi ho jata, tab tak loop chalao
    while (curr !== null) {
      // Step 2a: Backup the next node
      // Kyunki hum curr.next ko change kar denge, toh pehle usse save karo
      // Ye bahut important hai, warna aage ka connection kho jayega!
      next = curr.next;

      // Step 2b: Reverse the current node's pointer
      // Current node ko previous node se jodo
      // Ye hi main REVERSAL step hai! 🔄
      curr.next = prev;

      // Step 2c: Move prev pointer one step forward
      // Ab current node hi next iteration ka previous ban jayega
      prev = curr;

      // Step 2d: Move curr pointer one step forward
      // Next node pe move karo (jo humne backup mein save kiya tha)
      curr = next;
    }

    // Step 3: Return the new head
    // Loop end hone ke baad, prev pointer reversed list ke head pe hoga
    // Kyunki curr null ho gaya hai, aur prev last valid node hai
    return prev;
  }

  /**
   * Helper function: Create a linked list from an array
   * Test cases ke liye useful hai
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
   * Helper function: Print list with detailed visualization
   * Debugging ke liye helpful
   */
  function printList(head: ListNode | null, label: string): void {
    const arr = listToArray(head);
    console.log(
      `${label}: [${arr.join(' → ')}]${arr.length > 0 ? ' → null' : ''}`
    );
  }

  /**
   * Test function: Multiple test cases with detailed output
   */
  export function runTests(): void {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🧪 Testing Reverse Linked List - OPTIMAL APPROACH');
    console.log('   (Three Pointers Technique - O(1) Space)');
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

    // Test Case 6: Negative numbers
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Case 6: Negative numbers [-5,-4,-3,-2,-1]');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    let head6 = createLinkedList([-5, -4, -3, -2, -1]);
    printList(head6, 'Input ');
    let reversed6 = reverseList(head6);
    printList(reversed6, 'Output');
    console.log('Expected: [-1 → -2 → -3 → -4 → -5] → null');
    console.log(
      '✅ Pass:',
      JSON.stringify(listToArray(reversed6)) ===
        JSON.stringify([-1, -2, -3, -4, -5])
    );

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ All tests completed!');
    console.log('═══════════════════════════════════════════════════════');
  }
}

// Namespace ke bahar se test function call karo
ReverseLinkedListOptimal.runTests();