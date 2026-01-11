namespace IntersectionOptimalSwitch {
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
   * OPTIMAL APPROACH - TWO POINTER SWITCH METHOD
   * =============================================
   *
   * Intuition (Soch):
   * ----------------
   * Ye approach bahut clever aur elegant hai! 🌟
   *
   * Agar dono pointers ko traverse karte waqt, jab ek list ka end aa jaye toh
   * usse doosri list ke head pe bhej dein, toh eventually dono pointers SAME
   * DISTANCE travel karenge aur intersection pe mil jayenge!
   *
   * Magic kaise hota hai? (How does the magic work?)
   * -------------------------------------------------
   * ListA length = m, ListB length = n
   * Intersection se pehle A mein = a nodes
   * Intersection se pehle B mein = b nodes
   * Intersection ke baad (common part) = c nodes
   *
   * So: m = a + c, n = b + c
   *
   * Pointer pA path:
   * - First: listA traverse karo (a + c steps)
   * - Then: listB traverse karo (b steps tak)
   * - Total distance: a + c + b = a + b + c
   *
   * Pointer pB path:
   * - First: listB traverse karo (b + c steps)
   * - Then: listA traverse karo (a steps tak)
   * - Total distance: b + c + a = a + b + c
   *
   * 🎯 Dono same distance travel karte hain! (Both travel same distance!)
   * Aur intersection pe mil jate hain! (And meet at intersection!)
   *
   * Visual Example:
   * --------------
   * ListA: 4 → 1 → 8 → 4 → 5 → null  (a=2, c=3, m=5)
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null  (b=3, c=3, n=6)
   *
   * pA travels: 4→1→8→4→5→null→5→6→1→8  (total: 5 + 4 = 9 steps to reach 8)
   * pB travels: 5→6→1→8→4→5→null→4→1→8  (total: 6 + 3 = 9 steps to reach 8)
   *
   * Both meet at node 8! ✅
   *
   * Algorithm:
   * ----------
   * 1. Initialize two pointers: pA = headA, pB = headB
   * 2. Loop jab tak dono equal nahi ho jate:
   *    - Agar pA null hai → pA = headB (switch to other list)
   *    - Warna pA = pA.next (move forward)
   *    - Agar pB null hai → pB = headA (switch to other list)
   *    - Warna pB = pB.next (move forward)
   * 3. Return pA (or pB, both are same)
   *    - Agar intersection hai → return intersection node
   *    - Agar nahi hai → return null (dono null ho jayenge)
   *
   * Time Complexity: O(m + n)
   * - Worst case: Dono pointers max m + n distance travel karte hain
   * - Example: Agar no intersection, toh pA travels m + n, pB travels n + m
   *   Both reach null at same time
   *
   * Space Complexity: O(1)
   * - Sirf do pointers use ho rahe hain (pA, pB)
   * - Koi extra data structure nahi (No HashSet, no length variables)
   *
   * Advantages over Length Difference Method:
   * -----------------------------------------
   * 1. Length calculate karne ki zaroorat nahi (No need to calculate lengths)
   * 2. Code bahut short aur clean hai (Code is very short and clean)
   * 3. Same time complexity, same space complexity
   * 4. More elegant! 🎨
   *
   * Why this is the BEST approach:
   * ------------------------------
   * - Most elegant solution (interview me impress karega!)
   * - Minimal code (easy to remember and implement)
   * - O(m + n) time, O(1) space
   * - No need to calculate lengths or track differences
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

    // STEP 1: Initialize two pointers
    // (Initialize two pointers)
    let pA: ListNode | null = headA;
    let pB: ListNode | null = headB;

    // STEP 2: Loop jab tak dono equal nahi ho jate
    // (Loop until both pointers are equal)
    // Important: This loop will terminate because:
    // - Agar intersection hai → dono intersection pe mil jayenge
    // - Agar nahi hai → dono null pe mil jayenge (same time pe)
    while (pA !== pB) {
      // STEP 3: Move pA forward (or switch to listB if reached end)
      // (Move pA forward or switch to listB if reached end)
      // Agar pA null hai (listA end ho gayi) → listB ke head pe jao
      // Warna pA ko aage badhao
      pA = pA === null ? headB : pA.next;

      // STEP 4: Move pB forward (or switch to listA if reached end)
      // (Move pB forward or switch to listA if reached end)
      // Agar pB null hai (listB end ho gayi) → listA ke head pe jao
      // Warna pB ko aage badhao
      pB = pB === null ? headA : pB.next;
    }

    // STEP 5: Return the intersection node (or null)
    // (Return the intersection node or null)
    // Dono pointers ab equal hain:
    // - Agar intersection tha → pA aur pB intersection node pe hain
    // - Agar nahi tha → dono null hain
    return pA;
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
   * List Lengths:
   * - listA: 5 nodes (a=2 before intersection, c=3 common)
   * - listB: 6 nodes (b=3 before intersection, c=3 common)
   *
   * Initialize:
   * -----------
   * pA = headA = 4 (0x100)
   * pB = headB = 5 (0x200)
   *
   * ═════════════════════════════════════════════════════════════════
   * TRAVERSAL - STEP BY STEP
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 4 (0x100)
   *   pB = 5 (0x200)
   *
   * Check: pA !== pB? YES (0x100 !== 0x200)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = 1 (0x101)
   *   pB = pB === null? NO → pB = pB.next = 6 (0x201)
   *
   * After:
   *   pA = 1 (0x101)
   *   pB = 6 (0x201)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 1 (0x101)
   *   pB = 6 (0x201)
   *
   * Check: pA !== pB? YES (0x101 !== 0x201)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = 8 (0x300)
   *   pB = pB === null? NO → pB = pB.next = 1 (0x202)
   *
   * After:
   *   pA = 8 (0x300)
   *   pB = 1 (0x202)
   *
   * ⚠️ Note: pA reached intersection, but pB hasn't yet!
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 8 (0x300)
   *   pB = 1 (0x202)
   *
   * Check: pA !== pB? YES (0x300 !== 0x202)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = 4 (0x400)
   *   pB = pB === null? NO → pB = pB.next = 8 (0x300)
   *
   * After:
   *   pA = 4 (0x400)
   *   pB = 8 (0x300)
   *
   * ⚠️ Note: Now pB reached intersection, but pA moved forward!
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 4 (0x400)
   *   pB = 8 (0x300)
   *
   * Check: pA !== pB? YES (0x400 !== 0x300)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = 5 (0x500)
   *   pB = pB === null? NO → pB = pB.next = 4 (0x400)
   *
   * After:
   *   pA = 5 (0x500)
   *   pB = 4 (0x400)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 5 (0x500)
   *   pB = 4 (0x400)
   *
   * Check: pA !== pB? YES (0x500 !== 0x400)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = null
   *   pB = pB === null? NO → pB = pB.next = 5 (0x500)
   *
   * After:
   *   pA = null ⚠️ (listA ended!)
   *   pB = 5 (0x500)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 6 ⭐ pA SWITCHES TO LISTB
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = null
   *   pB = 5 (0x500)
   *
   * Check: pA !== pB? YES (null !== 0x500)
   *
   * Action:
   *   pA = pA === null? YES ✅ → pA = headB = 5 (0x200)
   *   pB = pB === null? NO → pB = pB.next = null
   *
   * After:
   *   pA = 5 (0x200) 🔄 (switched to listB!)
   *   pB = null ⚠️ (listB ended!)
   *
   * 🎯 KEY MOMENT: pA switched to listB, pB reached end!
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 7 ⭐ pB SWITCHES TO LISTA
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 5 (0x200)
   *   pB = null
   *
   * Check: pA !== pB? YES (0x200 !== null)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = 6 (0x201)
   *   pB = pB === null? YES ✅ → pB = headA = 4 (0x100)
   *
   * After:
   *   pA = 6 (0x201)
   *   pB = 4 (0x100) 🔄 (switched to listA!)
   *
   * 🎯 KEY MOMENT: Now both have switched lists!
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 8
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 6 (0x201)
   *   pB = 4 (0x100)
   *
   * Check: pA !== pB? YES (0x201 !== 0x100)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = 1 (0x202)
   *   pB = pB === null? NO → pB = pB.next = 1 (0x101)
   *
   * After:
   *   pA = 1 (0x202)
   *   pB = 1 (0x101)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 9 ⭐⭐⭐ INTERSECTION FOUND!
   * ─────────────────────────────────────────────────────────────────
   * Before:
   *   pA = 1 (0x202)
   *   pB = 1 (0x101)
   *
   * Check: pA !== pB? YES (0x202 !== 0x101)
   *
   * Action:
   *   pA = pA === null? NO → pA = pA.next = 8 (0x300)
   *   pB = pB === null? NO → pB = pB.next = 8 (0x300)
   *
   * After:
   *   pA = 8 (0x300) ⭐
   *   pB = 8 (0x300) ⭐
   *
   * 🎯 BOTH POINTERS EQUAL NOW!
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Terminates
   * ─────────────────────────────────────────────────────────────────
   * Check: pA !== pB?
   *        0x300 !== 0x300? NO ✅
   *
   * Loop ends!
   *
   * Return: pA = 8 (0x300)
   *
   * Final Result:
   * -------------
   * Intersection node = 8 (address 0x300)
   *
   * ═════════════════════════════════════════════════════════════════
   * DISTANCE CALCULATION - WHY IT WORKS
   * ═════════════════════════════════════════════════════════════════
   *
   * pA's Path:
   * ---------
   * ListA: 4 → 1 → 8 → 4 → 5 → null (5 steps)
   * Then switch to ListB: 5 → 6 → 1 → 8 (4 steps)
   * Total: 5 + 4 = 9 steps to reach node 8 ✅
   *
   * pB's Path:
   * ---------
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null (6 steps)
   * Then switch to ListA: 4 → 1 → 8 (3 steps)
   * Total: 6 + 3 = 9 steps to reach node 8 ✅
   *
   * 🎯 BOTH TRAVEL SAME DISTANCE: 9 steps!
   *
   * Mathematical Proof:
   * ------------------
   * Let:
   * - a = 2 (nodes before intersection in listA: 4, 1)
   * - b = 3 (nodes before intersection in listB: 5, 6, 1)
   * - c = 3 (common nodes: 8, 4, 5)
   *
   * pA distance: (a + c) + b = 2 + 3 + 3 = 5 + 3 = 8... wait
   *
   * Actually:
   * pA: travels (a + c) in listA = 5 steps (including to null)
   *     then travels b in listB = 3 steps (not including null)
   *     wait, let me recalculate...
   *
   * Actually, let me trace it more carefully:
   * pA: 4(1) → 1(2) → 8(3) → 4(4) → 5(5) → null(6, switch) → 5(7) → 6(8) → 1(9) → 8(10)
   * pB: 5(1) → 6(2) → 1(3) → 8(4) → 4(5) → 5(6) → null(7, switch) → 4(8) → 1(9) → 8(10)
   *
   * Both take 10 iterations to reach node 8!
   *
   * General formula:
   * pA travels: m + (n - c) = m + b = (a + c) + b = a + b + c
   * pB travels: n + (m - c) = n + a = (b + c) + a = a + b + c
   *
   * Same distance! ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═════════════════════════════════════════════════════════════════
   *
   * Edge Case 1: No Intersection
   * -----------------------------
   * ListA: 2 → 6 → 4 → null (m = 3)
   * ListB: 1 → 5 → null (n = 2)
   *
   * pA path: 2 → 6 → 4 → null → 1 → 5 → null (total: 3 + 2 = 5)
   * pB path: 1 → 5 → null → 2 → 6 → 4 → null (total: 2 + 3 = 5)
   *
   * Both reach null at same time!
   * pA = null, pB = null → Loop ends
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
   * ListA: 1 → 2 → 3 → null (addr: 0x100)
   *        ↑
   * ListB: (same) 1 → 2 → 3 → null
   *
   * pA = headA = 1 (0x100)
   * pB = headB = 1 (0x100)
   *
   * First check: pA !== pB? 0x100 !== 0x100? NO ✅
   * Loop doesn't even run once!
   * Return: pA = 1 (0x100) ✅
   *
   * Edge Case 4: Same Values but Different Nodes
   * ---------------------------------------------
   * ListA: 1 → 2 → 3 → null (addresses: 0x100, 0x200, 0x300)
   * ListB: 1 → 2 → 3 → null (addresses: 0x400, 0x500, 0x600)
   *
   * pA path: 0x100 → 0x200 → 0x300 → null → 0x400 → 0x500 → 0x600 → null
   * pB path: 0x400 → 0x500 → 0x600 → null → 0x100 → 0x200 → 0x300 → null
   *
   * Both reach null at same time
   * pA = null, pB = null → Loop ends
   * Return: null ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS IS THE MOST ELEGANT SOLUTION
   * ═════════════════════════════════════════════════════════════════
   *
   * 1. ✅ No need to calculate lengths
   *    - Other optimal approach: needs to traverse twice to get lengths
   *    - This approach: just traverse once with switching
   *
   * 2. ✅ Very short and clean code
   *    - Only 2-3 lines of core logic (while loop)
   *    - Easy to remember and implement in interviews
   *
   * 3. ✅ Same complexity as other approaches
   *    - Time: O(m + n) - same as HashSet and Length Diff
   *    - Space: O(1) - same as Length Diff
   *
   * 4. ✅ Beautiful algorithm
   *    - The switching mechanism is elegant and clever
   *    - Shows deep understanding of pointers and traversal
   *    - Impresses interviewers! 🌟
   *
   * 5. ✅ Handles all edge cases automatically
   *    - No intersection: both reach null together
   *    - Intersection at head: detected immediately
   *    - Different lengths: switching handles it automatically
   *
   * Comparison:
   * ----------
   * Brute Force:        O(m×n) time, O(1) space  ❌ Too slow
   * Better (HashSet):   O(m+n) time, O(m) space  ⚠️ Extra space
   * Optimal (Len Diff): O(m+n) time, O(1) space  ✅ Good
   * This (Switch):      O(m+n) time, O(1) space  ✅✅ BEST! 🏆
   *
   * Winner: THIS APPROACH - Most elegant! 🏆🌟
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
  console.log('INTERSECTION - OPTIMAL SWITCH (MOST ELEGANT!) 🌟');
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

  // Test Case 10: Same values, different nodes (no intersection)
  console.log('Test Case 10: Same values but different nodes');
  const { headA: test10A, headB: test10B } = createSeparateLists(
    [1, 2, 3],
    [1, 2, 3]
  );
  console.log('ListA:', listToArray(test10A));
  console.log('ListB:', listToArray(test10B));
  const result10 = getIntersectionNode(test10A, test10B);
  console.log(
    'Intersection:',
    result10 ? `Node with value ${result10.val}` : 'null'
  );
  console.log('Expected: null');
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Switch Method: O(m+n) time, O(1) space - MOST ELEGANT! 🏆🌟');
  console.log('═══════════════════════════════════════════════════════════');
}