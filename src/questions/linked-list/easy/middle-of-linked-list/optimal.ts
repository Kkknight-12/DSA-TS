// import { ListNode } from '../../../../basics/Linear-Data-Structure/linkedList/Code/singlyLinkedList';
// https://www.notion.so/Floyd-s-Cycle-Detection-Algorithm-Tortoise-and-Hare-29aa2680896880e9ad94fd8245f3f52e
/**
 * OPTIMAL APPROACH: Fast & Slow Pointer (Tortoise & Hare Algorithm)
 *
 * PROBLEM: Find the middle node of a singly linked list.
 * If two middle nodes exist, return the second one.
 *
 * TECHNIQUE: Two-pointer technique
 * - Slow pointer: Moves 1 step at a time (🐢)
 * - Fast pointer: Moves 2 steps at a time (🐰)
 *
 * KEY INSIGHT: When fast reaches the end, slow will be at the middle!
 *
 * Time Complexity: O(n) - Single pass through the list
 * Space Complexity: O(1) - Only using two pointers
 *
 * ADVANTAGES over Brute Force:
 * ✅ Single pass (vs two passes)
 * ✅ More elegant solution
 * ✅ Interview-preferred approach
 */

namespace MiddleNodeOptimal {
  // Definition for singly-linked list node
  class ListNode_OMLL {
    val: number; // Node ki value
    next: ListNode_OMLL | null; // Agla node ka reference

    constructor(val?: number, next?: ListNode_OMLL | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  function middleNode(head: ListNode_OMLL | null): ListNode_OMLL | null {
    // Edge Case: Agar list empty hai ya sirf ek node hai
    // WHY: Empty list ka middle nahi hota, single node khud middle hai
    if (head === null || head.next === null) {
      return head;
    }

    // ==================== INITIALIZE TWO POINTERS ====================

    // Step 1: Slow pointer ko head par set karo
    // WHY: Ye turtle ki tarah slow chalega (1 step per iteration)
    let slow: ListNode_OMLL | null = head;

    // Step 2: Fast pointer ko bhi head par set karo
    // WHY: Ye rabbit ki tarah fast chalega (2 steps per iteration)
    let fast: ListNode_OMLL | null = head;

    // ==================== TRAVERSE WITH TWO SPEEDS ====================

    // Step 3: Loop chalao jab tak fast end tak na pahunch jaye
    // WHY:
    // - fast !== null: Fast pointer khud null na ho (odd nodes case)
    // - fast.next !== null: Fast ka next null na ho (even nodes case)
    //
    // LOOP TERMINATION CONDITIONS:
    // Odd nodes (e.g., 5 nodes): fast last node par hoga, fast.next = null
    // Even nodes (e.g., 6 nodes): fast null hoga (list ke bahar)
    while (fast !== null && fast.next !== null) {
      // Step 4: Slow pointer ko 1 step aage badhao
      // WHY: Turtle ki speed - slow and steady
      // Slow travels: n/2 distance in total
      slow = slow!.next; // Non-null assertion kyunki hum jaante hain slow valid hai

      // Step 5: Fast pointer ko 2 steps aage badhao
      // WHY: Rabbit ki speed - double the pace
      // Fast travels: n distance in total (2x speed)
      //
      // IMPORTANT: fast.next.next le rahe hain, matlab 2 nodes jump kar rahe hain
      fast = fast.next.next;

      // VISUALIZATION of one iteration:
      // Before: slow → node1, fast → node1
      // After:  slow → node2, fast → node3 (2 steps ahead)
    }

    // ==================== RETURN MIDDLE NODE ====================

    // Step 6: Loop khatam hone par slow middle par hoga
    // WHY:
    // Fast ne poori list traverse kar li (n steps in n/2 iterations)
    // Slow ne half list traverse kari (n/2 steps in n/2 iterations)
    // Therefore, slow = middle position
    //
    // For odd nodes: slow exactly middle par hai
    // For even nodes: slow second middle par hai (jo humein chahiye)
    return slow;
  }

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper: Array se Linked List create karo
   * WHY: Testing aur examples ke liye
   */
  function createLinkedList(arr: number[]): ListNode_OMLL | null {
    // Empty array ke liye null return karo
    if (arr.length === 0) return null;

    // First node create karo (head)
    const head = new ListNode_OMLL(arr[0]);
    let current = head;

    // Baaki nodes ko chain karo
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode_OMLL(arr[i]);
      current = current.next;
    }

    return head;
  }

  /**
   * Helper: Linked List ko array mein convert karo
   * WHY: Output ko readable format mein print karne ke liye
   */
  function linkedListToArray(head: ListNode_OMLL | null): number[] {
    const result: number[] = [];
    let current = head;

    // Traverse karke saari values collect karo
    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  // ==================== TEST CASES WITH DETAILED OUTPUT ====================

  export function runTests(): void {
    console.log('========== OPTIMAL SOLUTION: FAST & SLOW POINTER ==========\n');

    // Test Case 1: Odd nodes - [1, 2, 3, 4, 5]
    console.log('Test Case 1: Odd Nodes');
    const list1 = createLinkedList([1, 2, 3, 4, 5]);
    const middle1 = middleNode(list1);
    console.log('Input:  [1, 2, 3, 4, 5]');
    console.log('Output:', linkedListToArray(middle1)); // Expected: [3, 4, 5]
    console.log('Middle Node Value:', middle1?.val); // Expected: 3
    console.log('✅ Correct! Middle at position 2 (0-indexed)\n');

    // Test Case 2: Even nodes - [1, 2, 3, 4, 5, 6]
    console.log('Test Case 2: Even Nodes');
    const list2 = createLinkedList([1, 2, 3, 4, 5, 6]);
    const middle2 = middleNode(list2);
    console.log('Input:  [1, 2, 3, 4, 5, 6]');
    console.log('Output:', linkedListToArray(middle2)); // Expected: [4, 5, 6]
    console.log('Middle Node Value:', middle2?.val); // Expected: 4
    console.log('✅ Correct! Second middle at position 3 (0-indexed)\n');

    // Test Case 3: Single node - [1]
    console.log('Test Case 3: Single Node');
    const list3 = createLinkedList([1]);
    const middle3 = middleNode(list3);
    console.log('Input:  [1]');
    console.log('Output:', linkedListToArray(middle3)); // Expected: [1]
    console.log('Middle Node Value:', middle3?.val); // Expected: 1
    console.log('✅ Correct! Single node is itself middle\n');

    // Test Case 4: Two nodes - [1, 2]
    console.log('Test Case 4: Two Nodes');
    const list4 = createLinkedList([1, 2]);
    const middle4 = middleNode(list4);
    console.log('Input:  [1, 2]');
    console.log('Output:', linkedListToArray(middle4)); // Expected: [2]
    console.log('Middle Node Value:', middle4?.val); // Expected: 2
    console.log('✅ Correct! Second middle returned\n');

    // Test Case 5: Large odd list - [1, 2, 3, 4, 5, 6, 7]
    console.log('Test Case 5: Large Odd List');
    const list5 = createLinkedList([1, 2, 3, 4, 5, 6, 7]);
    const middle5 = middleNode(list5);
    console.log('Input:  [1, 2, 3, 4, 5, 6, 7]');
    console.log('Output:', linkedListToArray(middle5)); // Expected: [4, 5, 6, 7]
    console.log('Middle Node Value:', middle5?.val); // Expected: 4
    console.log('✅ Correct! Middle at position 3 (0-indexed)\n');
  }
}

// Run tests
MiddleNodeOptimal.runTests();