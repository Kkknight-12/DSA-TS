namespace IntersectionBruteForce {
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
   * BRUTE FORCE APPROACH - NESTED LOOP
   * ==================================
   *
   * Intuition (Soch):
   * ----------------
   * Sabse simple approach hai ki listA ke har node ko listB ke har node ke saath
   * compare karo aur dekho ki kya dono same reference hain (not same value, but same node).
   *
   * Algorithm:
   * ----------
   * 1. ListA ke head se start karo
   * 2. ListA ke har node ke liye:
   *    - ListB ko start se end tak traverse karo
   *    - Check karo ki kya current node of A === current node of B (same reference)
   *    - Agar same hai, toh ye intersection hai - return kar do
   * 3. Agar koi intersection nahi mila, toh null return karo
   *
   * Time Complexity: O(m × n)
   * - Har node of listA ke liye, puri listB traverse karni padti hai
   * - m = length of listA, n = length of listB
   *
   * Space Complexity: O(1)
   * - Koi extra space nahi chahiye, sirf pointers use kar rahe hain
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

    // STEP 1: ListA ka pointer banao
    // (Create pointer for listA)
    let currentA: ListNode | null = headA;

    // STEP 2: ListA ke har node ko traverse karo
    // (Traverse each node of listA)
    while (currentA !== null) {
      // STEP 3: Har node of A ke liye, listB ko start se traverse karo
      // (For each node of A, traverse listB from start)
      let currentB: ListNode | null = headB;

      // STEP 4: ListB ke har node ko check karo
      // (Check each node of listB)
      while (currentB !== null) {
        // STEP 5: Check karo ki kya dono nodes SAME REFERENCE hain
        // (Check if both nodes are SAME REFERENCE)
        // NOTE: === operator reference compare karta hai, not value
        if (currentA === currentB) {
          // INTERSECTION FOUND!
          // Ye same node hai (memory mein same location)
          return currentA; // Ya currentB, dono same hain
        }

        // STEP 6: ListB ke next node pe jao
        // (Move to next node in listB)
        currentB = currentB.next;
      }

      // STEP 7: ListA ke next node pe jao
      // (Move to next node in listA)
      currentA = currentA.next;
    }

    // STEP 8: Agar koi intersection nahi mila, toh null return karo
    // (If no intersection found, return null)
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
   *                ↑ (intersection node, reference addr: 0x300)
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null
   *                    ↑ (same node, reference addr: 0x300)
   *
   * Note: Node with value 8 in both lists is the SAME NODE (same memory address)
   *       Node with value 1 in A and B are DIFFERENT nodes (different addresses)
   *
   * Variables:
   * ---------
   * currentA = 4 (0x100)
   * currentB = 5 (0x200)
   *
   * ═════════════════════════════════════════════════════════════════
   * OUTER LOOP: Traverse ListA
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: currentA = 4 (addr: 0x100)
   * ─────────────────────────────────────────────────────────────────
   *
   *   INNER LOOP: Compare with all nodes of ListB
   *
   *   Step 1.1: currentB = 5 (addr: 0x200)
   *             currentA (0x100) === currentB (0x200)? NO
   *             Move currentB forward
   *
   *   Step 1.2: currentB = 6 (addr: 0x201)
   *             currentA (0x100) === currentB (0x201)? NO
   *             Move currentB forward
   *
   *   Step 1.3: currentB = 1 (addr: 0x202)
   *             currentA (0x100) === currentB (0x202)? NO
   *             Move currentB forward
   *
   *   Step 1.4: currentB = 8 (addr: 0x300)
   *             currentA (0x100) === currentB (0x300)? NO
   *             Move currentB forward
   *
   *   Step 1.5: currentB = 4 (addr: 0x400)
   *             currentA (0x100) === currentB (0x400)? NO
   *             Move currentB forward
   *
   *   Step 1.6: currentB = 5 (addr: 0x500)
   *             currentA (0x100) === currentB (0x500)? NO
   *             Move currentB forward
   *
   *   Step 1.7: currentB = null
   *             Inner loop ends
   *
   *   No match found for node 4 in listA
   *   Move currentA forward → currentA = 1 (addr: 0x101)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: currentA = 1 (addr: 0x101)
   * ─────────────────────────────────────────────────────────────────
   *
   *   INNER LOOP: Compare with all nodes of ListB
   *
   *   Step 2.1: currentB = 5 (addr: 0x200)
   *             currentA (0x101) === currentB (0x200)? NO
   *
   *   Step 2.2: currentB = 6 (addr: 0x201)
   *             currentA (0x101) === currentB (0x201)? NO
   *
   *   Step 2.3: currentB = 1 (addr: 0x202)
   *             currentA (0x101) === currentB (0x202)? NO
   *             ⚠️ Important: Value is same (1), but reference is DIFFERENT!
   *
   *   Step 2.4: currentB = 8 (addr: 0x300)
   *             currentA (0x101) === currentB (0x300)? NO
   *
   *   Step 2.5: currentB = 4 (addr: 0x400)
   *             currentA (0x101) === currentB (0x400)? NO
   *
   *   Step 2.6: currentB = 5 (addr: 0x500)
   *             currentA (0x101) === currentB (0x500)? NO
   *
   *   Step 2.7: currentB = null
   *             Inner loop ends
   *
   *   No match found for node 1 in listA
   *   Move currentA forward → currentA = 8 (addr: 0x300)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: currentA = 8 (addr: 0x300) ⭐ INTERSECTION NODE
   * ─────────────────────────────────────────────────────────────────
   *
   *   INNER LOOP: Compare with all nodes of ListB
   *
   *   Step 3.1: currentB = 5 (addr: 0x200)
   *             currentA (0x300) === currentB (0x200)? NO
   *
   *   Step 3.2: currentB = 6 (addr: 0x201)
   *             currentA (0x300) === currentB (0x201)? NO
   *
   *   Step 3.3: currentB = 1 (addr: 0x202)
   *             currentA (0x300) === currentB (0x202)? NO
   *
   *   Step 3.4: currentB = 8 (addr: 0x300) ⭐⭐⭐
   *             currentA (0x300) === currentB (0x300)? YES! ✅
   *
   *             🎯 INTERSECTION FOUND!
   *             Return currentA (or currentB, dono same hain)
   *
   * Final Result:
   * -------------
   * Return node with value 8 (address 0x300)
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═════════════════════════════════════════════════════════════════
   *
   * Edge Case 1: No Intersection
   * -----------------------------
   * ListA: 2 → 6 → 4 → null
   * ListB: 1 → 5 → null
   *
   * - Dono lists ko completely traverse karenge
   * - Koi bhi node match nahi hoga
   * - Return null
   *
   * Edge Case 2: Empty List
   * -----------------------
   * ListA: null
   * ListB: 1 → 2 → 3 → null
   *
   * - Pehle hi check kar lenge ki koi list empty hai
   * - Return null
   *
   * Edge Case 3: Intersection at Head
   * ----------------------------------
   * ListA: 1 → 2 → 3 → null
   *        ↑ (same node)
   * ListB: 1 → 2 → 3 → null
   *
   * - Pehli hi iteration mein match mil jayega
   * - Return head node
   *
   * Edge Case 4: Same Values but Different Nodes
   * ---------------------------------------------
   * ListA: 1 → 2 → 3 → null (all different addresses)
   * ListB: 1 → 2 → 3 → null (all different addresses)
   *
   * - Values same hain but nodes different hain
   * - Koi reference match nahi hoga
   * - Return null
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH IS SLOW
   * ═════════════════════════════════════════════════════════════════
   *
   * - Har node of listA ke liye, PURI listB traverse karni padti hai
   * - Agar listA mein m nodes hain aur listB mein n nodes hain:
   *   → Total comparisons = m × n
   *   → Example: m=1000, n=1000 → 1,000,000 comparisons! 😱
   *
   * - Better approaches exist (Hashing, Two Pointers) jo O(m+n) time mein solve kar sakte hain
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

  console.log("═══════════════════════════════════════════════════════════");
  console.log("INTERSECTION OF TWO LINKED LISTS - BRUTE FORCE");
  console.log("═══════════════════════════════════════════════════════════\n");

  // Test Case 1: Example 1 from problem
  console.log("Test Case 1: Intersection at node with value 8");
  const { headA: test1A, headB: test1B } = createIntersectingLists(
    [4, 1],
    [5, 6, 1],
    [8, 4, 5]
  );
  console.log("ListA:", listToArray(test1A));
  console.log("ListB:", listToArray(test1B));
  const result1 = getIntersectionNode(test1A, test1B);
  console.log(
    "Intersection:",
    result1 ? `Node with value ${result1.val}` : "null"
  );
  console.log("Expected: Node with value 8");
  console.log("✓ Passed\n");

  // Test Case 2: Example 2 from problem
  console.log("Test Case 2: Intersection at node with value 2");
  const { headA: test2A, headB: test2B } = createIntersectingLists(
    [1, 9, 1],
    [3],
    [2, 4]
  );
  console.log("ListA:", listToArray(test2A));
  console.log("ListB:", listToArray(test2B));
  const result2 = getIntersectionNode(test2A, test2B);
  console.log(
    "Intersection:",
    result2 ? `Node with value ${result2.val}` : "null"
  );
  console.log("Expected: Node with value 2");
  console.log("✓ Passed\n");

  // Test Case 3: No intersection
  console.log("Test Case 3: No intersection");
  const { headA: test3A, headB: test3B } = createSeparateLists(
    [2, 6, 4],
    [1, 5]
  );
  console.log("ListA:", listToArray(test3A));
  console.log("ListB:", listToArray(test3B));
  const result3 = getIntersectionNode(test3A, test3B);
  console.log("Intersection:", result3 ? `Node with value ${result3.val}` : "null");
  console.log("Expected: null");
  console.log("✓ Passed\n");

  // Test Case 4: Intersection at head
  console.log("Test Case 4: Intersection at head (both lists are same)");
  const { headA: test4A, headB: test4B } = createIntersectingLists(
    [],
    [],
    [1, 2, 3]
  );
  console.log("ListA:", listToArray(test4A));
  console.log("ListB:", listToArray(test4B));
  const result4 = getIntersectionNode(test4A, test4B);
  console.log(
    "Intersection:",
    result4 ? `Node with value ${result4.val}` : "null"
  );
  console.log("Expected: Node with value 1");
  console.log("✓ Passed\n");

  // Test Case 5: Empty listA
  console.log("Test Case 5: Empty listA");
  const result5 = getIntersectionNode(null, test1B);
  console.log("Intersection:", result5 ? `Node with value ${result5.val}` : "null");
  console.log("Expected: null");
  console.log("✓ Passed\n");

  // Test Case 6: Both lists empty
  console.log("Test Case 6: Both lists empty");
  const result6 = getIntersectionNode(null, null);
  console.log("Intersection:", result6 ? `Node with value ${result6.val}` : "null");
  console.log("Expected: null");
  console.log("✓ Passed\n");

  // Test Case 7: Single node intersection
  console.log("Test Case 7: Single node intersection");
  const { headA: test7A, headB: test7B } = createIntersectingLists(
    [1],
    [2],
    [3]
  );
  console.log("ListA:", listToArray(test7A));
  console.log("ListB:", listToArray(test7B));
  const result7 = getIntersectionNode(test7A, test7B);
  console.log(
    "Intersection:",
    result7 ? `Node with value ${result7.val}` : "null"
  );
  console.log("Expected: Node with value 3");
  console.log("✓ Passed\n");

  console.log("═══════════════════════════════════════════════════════════");
  console.log("All test cases passed! ✅");
  console.log("═══════════════════════════════════════════════════════════");
}
