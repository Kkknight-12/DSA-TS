/**
 * Brute Force Approach to find the middle of a Linked List
 *
 * PROBLEM: Given a singly linked list, find and return the middle node.
 * If there are two middle nodes, return the second one.
 *
 * APPROACH: Two-pass method
 * Pass 1: Count total nodes in the list
 * Pass 2: Traverse to the middle position
 *
 * Time Complexity: O(n) - Two passes through the list
 * Space Complexity: O(1) - Only using constant extra space
 */

namespace MiddleNodeBruteForce {
  // Definition for singly-linked list node
  class ListNode_Middle {
    val: number; // Node ka value
    next: ListNode_Middle | null; // Agla node ka reference (null if last node)

    constructor(val?: number, next?: ListNode_Middle | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  function middleNode_brute(
    head: ListNode_Middle | null
  ): ListNode_Middle | null {
    // Edge Case: Agar list empty hai toh null return karo
    // WHY: Empty list ka middle nahi ho sakta
    if (head === null) {
      return null;
    }

    // ==================== PASS 1: COUNT NODES ====================

    // Step 1: Current pointer ko head par set karo
    // WHY: List traverse karne ke liye starting point chahiye
    let current: ListNode_Middle | null = head;

    // Step 2: Counter initialize karo
    // WHY: Total nodes count karne ke liye
    let count: number = 0;

    // Step 3: Poori list ko traverse karo aur count karo
    // WHY: Middle position calculate karne ke liye total nodes chahiye
    while (current !== null) {
      count++; // Har node par count badhao
      current = current.next; // Agla node par jao
    }
    // Loop khatam hone par: count = total nodes in list

    // ==================== CALCULATE MIDDLE POSITION ====================

    // Step 4: Middle position calculate karo
    // WHY: Odd nodes: middle = count/2 (e.g., 5/2 = 2)
    //      Even nodes: second middle = count/2 (e.g., 6/2 = 3)
    // Math.floor ensures integer division (TypeScript automatically does this for integers)
    const middlePosition: number = Math.floor(count / 2);

    // ==================== PASS 2: FIND MIDDLE NODE ====================

    // Step 5: Current pointer ko phir se head par reset karo
    // WHY: Ab hume shuru se middle position tak traverse karna hai
    current = head;

    // Step 6: Middle position tak traverse karo
    // WHY: Hume exactly middle node tak pahunchna hai
    // Loop middlePosition times chalega (0 se middlePosition-1 tak)
    for (let i = 0; i < middlePosition; i++) {
      // Type safety: TypeScript ko batao ki current null nahi hai
      // WHY: Humne already count kiya hai, toh guaranteed hai ki nodes exist karti hain
      if (current !== null) {
        current = current.next; // Agla node par move karo
      }
    }

    // Step 7: Middle node return karo (current ab middle par hai)
    // WHY: Loop khatam hone par current middle position par hoga
    return current;
  }

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper function: Array se Linked List banao
   * WHY: Testing ke liye array ko linked list mein convert karna
   */
  function createLinkedList(arr: number[]): ListNode_Middle | null {
    if (arr.length === 0) return null;

    const head = new ListNode_Middle(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode_Middle(arr[i]);
      current = current.next;
    }

    return head;
  }

  /**
   * Helper function: Linked List ko array mein convert karo
   * WHY: Output ko readable format mein print karne ke liye
   */
  function linkedListToArray(head: ListNode_Middle | null): number[] {
    const result: number[] = [];
    let current = head;

    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  // ==================== TEST CASES ====================

  export function runTests(): void {
    // Test Case 1: Odd number of nodes
    const list1 = createLinkedList([1, 2, 3, 4, 5]);
    const middle1 = middleNode_brute(list1);
    console.log('Input: [1,2,3,4,5]');
    console.log('Output:', linkedListToArray(middle1)); // [3,4,5]

    // Test Case 2: Even number of nodes
    const list2 = createLinkedList([1, 2, 3, 4, 5, 6]);
    const middle2 = middleNode_brute(list2);
    console.log('\nInput: [1,2,3,4,5,6]');
    console.log('Output:', linkedListToArray(middle2)); // [4,5,6]

    // Test Case 3: Single node
    const list3 = createLinkedList([1]);
    const middle3 = middleNode_brute(list3);
    console.log('\nInput: [1]');
    console.log('Output:', linkedListToArray(middle3)); // [1]
  }
}

// Run tests
MiddleNodeBruteForce.runTests();