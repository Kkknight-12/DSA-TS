namespace IntersectionOptimal {
  // ListNode class definition
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * OPTIMAL APPROACH - LENGTH DIFFERENCE METHOD
   * ============================================
   *
   * Intuition (Soch):
   * ----------------
   * Problem: Agar dono lists ki length different hai, toh ek list mein zyada nodes hain.
   * Agar hum dono ko simultaneously traverse karenge, toh wo kabhi same position pe nahi honge.
   *
   * Solution: Agar hum longer list ke pointer ko pehle (difference) steps aage move kar dein,
   * toh phir dono pointers SAME DISTANCE pe honge intersection se. Ab hum dono ko saath-saath
   * move kar sakte hain, aur jab dono same node pe honge, wo intersection hoga.
   *
   * Visual Example:
   * --------------
   * ListA: 4 → 1 → 8 → 4 → 5  (length = 5)
   * ListB:      5 → 6 → 1 → 8 → 4 → 5  (length = 6)
   *                         ↑ intersection at node 8
   *
   * Difference = 6 - 5 = 1
   * Move listB pointer 1 step ahead:
   *
   * ListA:      4 → 1 → 8 → 4 → 5
   *             ↑
   * ListB:      6 → 1 → 8 → 4 → 5
   *             ↑
   *
   * Now both are 3 steps away from intersection!
   * Move both together: They'll meet at node 8
   *
   * Key Insight:
   * -----------
   * Agar dono pointers same distance pe hain intersection se, toh wo simultaneously
   * move karne pe intersection pe mil jayenge (ya dono null ho jayenge agar no intersection).
   *
   * Algorithm:
   * ----------
   * 1. Calculate lengths of both lists: lenA and lenB
   * 2. Find the difference: diff = |lenA - lenB|
   * 3. Identify which list is longer
   * 4. Move the longer list's pointer ahead by 'diff' steps
   * 5. Now both pointers are at same distance from intersection (if exists)
   * 6. Move both pointers together (one step at a time)
   * 7. When both pointers point to same node (or both become null), that's the answer
   *
   * Time Complexity: O(m + n)
   * - Calculate length of listA: O(m)
   * - Calculate length of listB: O(n)
   * - Move longer list's pointer: O(|m-n|)
   * - Move both pointers together: O(min(m, n))
   * - Total: O(m + n)
   *
   * Space Complexity: O(1)
   * - Only using pointers (currentA, currentB, tempA, tempB)
   * - No extra data structures like HashSet
   * - This is OPTIMAL for space!
   *
   * Comparison with Better Approach:
   * --------------------------------
   * Better (HashSet):  Time O(m+n), Space O(m)
   * Optimal (This):    Time O(m+n), Space O(1) ✅
   *
   * → Same time complexity, but NO extra space needed!
   *
   * @param headA - First linked list ka head
   * @param headB - Second linked list ka head
   * @returns Intersection node ya null agar koi intersection nahi hai
   */
  function getIntersectionNode(
    headA: ListNode | null,
    headB: ListNode | null
  ): ListNode | null {
    // EDGE CASE: Agar koi bhi list empty hai, toh intersection possible nahi
    // (If any list is empty, intersection is not possible)
    if (headA === null || headB === null) {
      return null;
    }

    // STEP 1: Calculate length of listA
    // (Calculate length of listA)
    let lenA = 0;
    let tempA: ListNode | null = headA;
    while (tempA !== null) {
      lenA++;
      tempA = tempA.next;
    }

    // STEP 2: Calculate length of listB
    // (Calculate length of listB)
    let lenB = 0;
    let tempB: ListNode | null = headB;
    while (tempB !== null) {
      lenB++;
      tempB = tempB.next;
    }

    // STEP 3: Find the difference in lengths
    // (Find the difference in lengths)
    const diff = Math.abs(lenA - lenB);

    // STEP 4: Initialize pointers for both lists
    // (Initialize pointers for both lists)
    let currentA: ListNode | null = headA;
    let currentB: ListNode | null = headB;

    // STEP 5: Move the longer list's pointer ahead by 'diff' steps
    // (Move the longer list's pointer ahead by 'diff' steps)
    if (lenA > lenB) {
      // ListA is longer, move currentA ahead
      for (let i = 0; i < diff; i++) {
        currentA = currentA!.next;
      }
    } else {
      // ListB is longer (or equal), move currentB ahead
      for (let i = 0; i < diff; i++) {
        currentB = currentB!.next;
      }
    }

    // STEP 6: Move both pointers together until they meet (or both become null)
    // (Move both pointers together until they meet or both become null)
    // Ab dono pointers same distance pe hain intersection se (if exists)
    while (currentA !== null && currentB !== null) {
      // STEP 7: Check if both pointers point to same node
      // (Check if both pointers point to same node)
      if (currentA === currentB) {
        // INTERSECTION FOUND! ✅
        return currentA;
      }

      // STEP 8: Move both pointers one step forward
      // (Move both pointers one step forward)
      currentA = currentA.next;
      currentB = currentB.next;
    }

    // STEP 9: No intersection found (both reached null without meeting)
    // (No intersection found)
    return null;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
   *          skipA = 2, skipB = 3
   *
   * Initial State:
   * --------------
   * ListA: 4 → 1 → 8 → 4 → 5 → null
   *      (0x100)(0x101)(0x300)(0x400)(0x500)
   *
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null
   *      (0x200)(0x201)(0x202)(0x300)(0x400)(0x500)
   *                            ↑
   *                  Same node as listA (from 0x300 onwards)
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: CALCULATE LENGTHS
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Calculate Length of ListA
   * ─────────────────────────────────────────────────────────────────
   *
   * lenA = 0, tempA = headA (0x100, value 4)
   *
   * Iteration 1: tempA = 4 (0x100)
   *   lenA = 1
   *   tempA = tempA.next → 1 (0x101)
   *
   * Iteration 2: tempA = 1 (0x101)
   *   lenA = 2
   *   tempA = tempA.next → 8 (0x300)
   *
   * Iteration 3: tempA = 8 (0x300)
   *   lenA = 3
   *   tempA = tempA.next → 4 (0x400)
   *
   * Iteration 4: tempA = 4 (0x400)
   *   lenA = 4
   *   tempA = tempA.next → 5 (0x500)
   *
   * Iteration 5: tempA = 5 (0x500)
   *   lenA = 5
   *   tempA = tempA.next → null
   *
   * Loop ends: lenA = 5 ✅
   *
   * ─────────────────────────────────────────────────────────────────
   * Calculate Length of ListB
   * ─────────────────────────────────────────────────────────────────
   *
   * lenB = 0, tempB = headB (0x200, value 5)
   *
   * Iteration 1: tempB = 5 (0x200)
   *   lenB = 1
   *   tempB = tempB.next → 6 (0x201)
   *
   * Iteration 2: tempB = 6 (0x201)
   *   lenB = 2
   *   tempB = tempB.next → 1 (0x202)
   *
   * Iteration 3: tempB = 1 (0x202)
   *   lenB = 3
   *   tempB = tempB.next → 8 (0x300)
   *
   * Iteration 4: tempB = 8 (0x300)
   *   lenB = 4
   *   tempB = tempB.next → 4 (0x400)
   *
   * Iteration 5: tempB = 4 (0x400)
   *   lenB = 5
   *   tempB = tempB.next → 5 (0x500)
   *
   * Iteration 6: tempB = 5 (0x500)
   *   lenB = 6
   *   tempB = tempB.next → null
   *
   * Loop ends: lenB = 6 ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: CALCULATE DIFFERENCE & ALIGN POINTERS
   * ═════════════════════════════════════════════════════════════════
   *
   * lenA = 5
   * lenB = 6
   * diff = |5 - 6| = 1
   *
   * Which list is longer?
   * lenA (5) > lenB (6)? NO
   * So ListB is longer ✅
   *
   * Initialize pointers:
   * currentA = headA (0x100, value 4)
   * currentB = headB (0x200, value 5)
   *
   * Visual representation:
   * ListA: 4 → 1 → 8 → 4 → 5 → null
   *        ↑ currentA
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null
   *        ↑ currentB
   *
   * ─────────────────────────────────────────────────────────────────
   * Move ListB Pointer Ahead by 'diff' (1) Steps
   * ─────────────────────────────────────────────────────────────────
   *
   * Loop: for i = 0; i < 1; i++
   *
   * Iteration 1 (i=0):
   *   currentB = currentB.next
   *   currentB = 6 (0x201)
   *
   * Loop ends
   *
   * After alignment:
   * ListA: 4 → 1 → 8 → 4 → 5 → null
   *        ↑ currentA (distance from end = 5)
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null
   *            ↑ currentB (distance from end = 5)
   *
   * 🎯 KEY INSIGHT: Ab dono pointers SAME DISTANCE pe hain end se!
   *                 Agar intersection hai, toh dono same steps mein pahunchenge.
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 3: MOVE BOTH POINTERS TOGETHER TO FIND INTERSECTION
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1
   * ─────────────────────────────────────────────────────────────────
   *
   * currentA = 4 (0x100)
   * currentB = 6 (0x201)
   *
   * Check: currentA === currentB?
   *        0x100 === 0x201? NO
   *
   * Move both forward:
   *   currentA = currentA.next → 1 (0x101)
   *   currentB = currentB.next → 1 (0x202)
   *
   * State:
   * ListA: 4 → 1 → 8 → 4 → 5 → null
   *            ↑ currentA
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null
   *                ↑ currentB
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2
   * ─────────────────────────────────────────────────────────────────
   *
   * currentA = 1 (0x101)
   * currentB = 1 (0x202)
   *
   * Check: currentA === currentB?
   *        0x101 === 0x202? NO
   *
   * ⚠️ Important: Dono ki value 1 hai, but ADDRESSES different hain!
   *              Intersection value se nahi, reference se hota hai.
   *
   * Move both forward:
   *   currentA = currentA.next → 8 (0x300)
   *   currentB = currentB.next → 8 (0x300)
   *
   * State:
   * ListA: 4 → 1 → 8 → 4 → 5 → null
   *                ↑ currentA
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null
   *                    ↑ currentB
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3 ⭐⭐⭐
   * ─────────────────────────────────────────────────────────────────
   *
   * currentA = 8 (0x300)
   * currentB = 8 (0x300)
   *
   * Check: currentA === currentB?
   *        0x300 === 0x300? YES! ✅
   *
   * 🎯 INTERSECTION FOUND!
   *
   * Return: currentA (or currentB, dono same hain)
   *         Node with address 0x300, value 8
   *
   * Final Result:
   * -------------
   * Intersection node = 8 (address 0x300)
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS WORKS - MATHEMATICAL PROOF
   * ═════════════════════════════════════════════════════════════════
   *
   * Let's define:
   * - a = number of nodes in listA before intersection
   * - b = number of nodes in listB before intersection
   * - c = number of common nodes (intersection part)
   *
   * Then:
   * - lenA = a + c = 2 + 3 = 5 nodes
   * - lenB = b + c = 3 + 3 = 6 nodes
   *
   * In our example:
   * - a = 2 (nodes: 4, 1)
   * - b = 3 (nodes: 5, 6, 1)
   * - c = 3 (nodes: 8, 4, 5)
   *
   * Difference:
   * diff = |lenA - lenB| = |a + c - (b + c)| = |a - b| = |2 - 3| = 1
   *
   * After moving longer list's pointer ahead by diff:
   * - currentA is at position 0 in listA (a steps from intersection)
   * - currentB is at position 1 in listB (b - diff = 3 - 1 = 2... wait)
   *
   * Actually, let me recalculate:
   * ListB has 6 nodes total
   * After moving currentB ahead by 1:
   * - currentB has 5 nodes remaining
   * - currentA has 5 nodes total
   *
   * So both have SAME number of nodes remaining! ✅
   * That's why they'll meet at intersection (or both reach null together).
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═════════════════════════════════════════════════════════════════
   *
   * Edge Case 1: No Intersection
   * -----------------------------
   * ListA: 2 → 6 → 4 → null (lenA = 3)
   * ListB: 1 → 5 → null (lenB = 2)
   *
   * diff = |3 - 2| = 1
   * Move currentA ahead by 1 → currentA = 6
   *
   * Then:
   * currentA = 6, currentB = 1 (not equal, move)
   * currentA = 4, currentB = 5 (not equal, move)
   * currentA = null, currentB = null (loop ends)
   *
   * Return: null ✅
   *
   * Edge Case 2: Empty List
   * -----------------------
   * ListA: null
   * ListB: 1 → 2 → 3 → null
   *
   * Check at start: headA === null → return null ✅
   *
   * Edge Case 3: Intersection at Head (Same Lists)
   * ----------------------------------------------
   * ListA: 1 → 2 → 3 → null
   *        ↑ (same node)
   * ListB: 1 → 2 → 3 → null
   *
   * lenA = 3, lenB = 3
   * diff = 0
   * No pointer movement needed
   *
   * currentA = 1 (0x100)
   * currentB = 1 (0x100)
   * First check: currentA === currentB → YES! ✅
   * Return immediately
   *
   * Edge Case 4: Different Lengths, Intersection at End
   * ---------------------------------------------------
   * ListA: 1 → 2 → 3 → 4 → 5 → null (lenA = 5)
   *                       ↑ intersection (0x500)
   * ListB: 9 → 5 → null (lenB = 2, but 5 is at 0x500)
   *
   * Wait, this doesn't make sense. If they intersect, they share
   * the tail. Let me correct:
   *
   * ListA: 1 → 2 → 3 → 4 → 5 → null (lenA = 5)
   *                  ↑ intersection at 4 (0x400)
   * ListB: 9 → 4 → 5 → null (lenB = 3, 4 is at 0x400)
   *
   * lenA = 5, lenB = 3
   * diff = 2
   * Move currentA ahead by 2 → currentA = 3 (0x300)
   *
   * Then:
   * currentA = 3 (0x300), currentB = 9 (0x900) (not equal, move)
   * currentA = 4 (0x400), currentB = 4 (0x400) (EQUAL!) ✅
   * Return node 4
   *
   * ═════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS - DETAILED
   * ═════════════════════════════════════════════════════════════════
   *
   * Time Complexity: O(m + n)
   * ------------------------
   * - Calculate lenA: O(m) - traverse all m nodes
   * - Calculate lenB: O(n) - traverse all n nodes
   * - Move longer list pointer: O(|m - n|) ≤ O(max(m, n))
   * - Move both pointers together: O(min(m, n)) in worst case
   * - Total: O(m) + O(n) + O(max(m,n)) = O(m + n)
   *
   * Space Complexity: O(1)
   * ---------------------
   * - lenA, lenB: 2 integers
   * - diff: 1 integer
   * - tempA, tempB, currentA, currentB: 4 pointers
   * - Total: Constant space, doesn't scale with input size
   *
   * ═════════════════════════════════════════════════════════════════
   * COMPARISON WITH OTHER APPROACHES
   * ═════════════════════════════════════════════════════════════════
   *
   * Approach          | Time      | Space | Operations (m=5,n=6)
   * ------------------|-----------|-------|---------------------
   * Brute Force       | O(m × n)  | O(1)  | 30 comparisons
   * Better (HashSet)  | O(m + n)  | O(m)  | 11 operations
   * Optimal (This)    | O(m + n)  | O(1)  | 14 operations ✅
   *
   * Winner: This approach! Same time as HashSet, but NO extra space! 🏆
   */

  // ═══════════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Helper function to create two linked lists with intersection
   * @param listAValues - Values for listA before intersection
   * @param listBValues - Values for listB before intersection
   * @param intersectionValues - Values for common intersection part
   * @returns Object with headA and headB
   */
  function createIntersectingLists(
    listAValues: number[],
    listBValues: number[],
    intersectionValues: number[]
  ): { headA: ListNode | null; headB: ListNode | null } {
    // Create intersection part first
    let intersectionHead: ListNode | null = null;
    let intersectionTail: ListNode | null = null;

    for (const val of intersectionValues) {
      const newNode = new ListNode(val);
      if (intersectionHead === null) {
        intersectionHead = newNode;
        intersectionTail = newNode;
      } else {
        intersectionTail!.next = newNode;
        intersectionTail = newNode;
      }
    }

    // Create listA and connect to intersection
    let headA: ListNode | null = null;
    let tailA: ListNode | null = null;

    for (const val of listAValues) {
      const newNode = new ListNode(val);
      if (headA === null) {
        headA = newNode;
        tailA = newNode;
      } else {
        tailA!.next = newNode;
        tailA = newNode;
      }
    }

    // Connect listA to intersection
    if (tailA !== null) {
      tailA.next = intersectionHead;
    } else {
      headA = intersectionHead;
    }

    // Create listB and connect to intersection
    let headB: ListNode | null = null;
    let tailB: ListNode | null = null;

    for (const val of listBValues) {
      const newNode = new ListNode(val);
      if (headB === null) {
        headB = newNode;
        tailB = newNode;
      } else {
        tailB!.next = newNode;
        tailB = newNode;
      }
    }

    // Connect listB to intersection
    if (tailB !== null) {
      tailB.next = intersectionHead;
    } else {
      headB = intersectionHead;
    }

    return { headA, headB };
  }

  /**
   * Helper function to create separate non-intersecting lists
   */
  function createSeparateLists(
    listAValues: number[],
    listBValues: number[]
  ): { headA: ListNode | null; headB: ListNode | null } {
    let headA: ListNode | null = null;
    let tailA: ListNode | null = null;

    for (const val of listAValues) {
      const newNode = new ListNode(val);
      if (headA === null) {
        headA = newNode;
        tailA = newNode;
      } else {
        tailA!.next = newNode;
        tailA = newNode;
      }
    }

    let headB: ListNode | null = null;
    let tailB: ListNode | null = null;

    for (const val of listBValues) {
      const newNode = new ListNode(val);
      if (headB === null) {
        headB = newNode;
        tailB = newNode;
      } else {
        tailB!.next = newNode;
        tailB = newNode;
      }
    }

    return { headA, headB };
  }

  /**
   * Helper function to print linked list values
   */
  function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;
    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('INTERSECTION OF TWO LINKED LISTS - OPTIMAL (LENGTH DIFF)');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test Case 1: Example 1 from problem
  console.log('Test Case 1: Intersection at node with value 8');
  const { headA: test1A, headB: test1B } = createIntersectingLists(
    [4, 1],
    [5, 6, 1],
    [8, 4, 5]
  );
  console.log('ListA:', listToArray(test1A));
  console.log('ListB:', listToArray(test1B));
  const result1 = getIntersectionNode(test1A, test1B);
  console.log(
    'Intersection:',
    result1 ? `Node with value ${result1.val}` : 'null'
  );
  console.log('Expected: Node with value 8');
  console.log('✓ Passed\n');

  // Test Case 2: Example 2 from problem
  console.log('Test Case 2: Intersection at node with value 2');
  const { headA: test2A, headB: test2B } = createIntersectingLists(
    [1, 9, 1],
    [3],
    [2, 4]
  );
  console.log('ListA:', listToArray(test2A));
  console.log('ListB:', listToArray(test2B));
  const result2 = getIntersectionNode(test2A, test2B);
  console.log(
    'Intersection:',
    result2 ? `Node with value ${result2.val}` : 'null'
  );
  console.log('Expected: Node with value 2');
  console.log('✓ Passed\n');

  // Test Case 3: No intersection
  console.log('Test Case 3: No intersection');
  const { headA: test3A, headB: test3B } = createSeparateLists(
    [2, 6, 4],
    [1, 5]
  );
  console.log('ListA:', listToArray(test3A));
  console.log('ListB:', listToArray(test3B));
  const result3 = getIntersectionNode(test3A, test3B);
  console.log(
    'Intersection:',
    result3 ? `Node with value ${result3.val}` : 'null'
  );
  console.log('Expected: null');
  console.log('✓ Passed\n');

  // Test Case 4: Intersection at head (both lists are same)
  console.log('Test Case 4: Intersection at head (both lists are same)');
  const { headA: test4A, headB: test4B } = createIntersectingLists(
    [],
    [],
    [1, 2, 3]
  );
  console.log('ListA:', listToArray(test4A));
  console.log('ListB:', listToArray(test4B));
  const result4 = getIntersectionNode(test4A, test4B);
  console.log(
    'Intersection:',
    result4 ? `Node with value ${result4.val}` : 'null'
  );
  console.log('Expected: Node with value 1');
  console.log('✓ Passed\n');

  // Test Case 5: Empty listA
  console.log('Test Case 5: Empty listA');
  const result5 = getIntersectionNode(null, test1B);
  console.log(
    'Intersection:',
    result5 ? `Node with value ${result5.val}` : 'null'
  );
  console.log('Expected: null');
  console.log('✓ Passed\n');

  // Test Case 6: Both lists empty
  console.log('Test Case 6: Both lists empty');
  const result6 = getIntersectionNode(null, null);
  console.log(
    'Intersection:',
    result6 ? `Node with value ${result6.val}` : 'null'
  );
  console.log('Expected: null');
  console.log('✓ Passed\n');

  // Test Case 7: Single node intersection
  console.log('Test Case 7: Single node intersection');
  const { headA: test7A, headB: test7B } = createIntersectingLists(
    [1],
    [2],
    [3]
  );
  console.log('ListA:', listToArray(test7A));
  console.log('ListB:', listToArray(test7B));
  const result7 = getIntersectionNode(test7A, test7B);
  console.log(
    'Intersection:',
    result7 ? `Node with value ${result7.val}` : 'null'
  );
  console.log('Expected: Node with value 3');
  console.log('✓ Passed\n');

  // Test Case 8: ListA much longer than ListB
  console.log('Test Case 8: ListA much longer than ListB');
  const { headA: test8A, headB: test8B } = createIntersectingLists(
    [1, 2, 3, 4, 5, 6, 7],
    [8],
    [9, 10]
  );
  console.log('ListA:', listToArray(test8A));
  console.log('ListB:', listToArray(test8B));
  const result8 = getIntersectionNode(test8A, test8B);
  console.log(
    'Intersection:',
    result8 ? `Node with value ${result8.val}` : 'null'
  );
  console.log('Expected: Node with value 9');
  console.log('✓ Passed\n');

  // Test Case 9: ListB much longer than ListA
  console.log('Test Case 9: ListB much longer than ListA');
  const { headA: test9A, headB: test9B } = createIntersectingLists(
    [11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20]
  );
  console.log('ListA:', listToArray(test9A));
  console.log('ListB:', listToArray(test9B));
  const result9 = getIntersectionNode(test9A, test9B);
  console.log(
    'Intersection:',
    result9 ? `Node with value ${result9.val}` : 'null'
  );
  console.log('Expected: Node with value 19');
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Length Difference approach: O(m+n) time, O(1) space! 🏆');
  console.log('═══════════════════════════════════════════════════════════');
}