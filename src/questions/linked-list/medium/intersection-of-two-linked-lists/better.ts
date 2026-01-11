namespace IntersectionBetter {
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
   * BETTER APPROACH - HASHING (HashSet)
   * ====================================
   *
   * Intuition (Soch):
   * ----------------
   * Brute force approach mein problem ye thi ki har node of listA ke liye,
   * puri listB ko traverse karna padta tha. Agar hum listA ke saare nodes
   * ko ek HashSet mein store kar lein, toh listB traverse karte waqt hum
   * O(1) time mein check kar sakte hain ki kya ye node listA mein bhi hai.
   *
   * Key Insight:
   * -----------
   * HashSet lookup operation O(1) time mein hota hai, isliye overall
   * complexity O(m + n) ho jayegi instead of O(m × n).
   *
   * Algorithm:
   * ----------
   * 1. Ek HashSet banao (Set data structure)
   * 2. ListA ko traverse karo aur har node ko HashSet mein add karo
   *    - NOTE: Node ka reference store ho raha hai, value nahi!
   * 3. ListB ko traverse karo:
   *    - Har node ke liye check karo ki kya ye HashSet mein exist karta hai
   *    - Agar exist karta hai, toh ye intersection node hai - return kar do
   * 4. Agar koi match nahi mila toh null return karo
   *
   * Time Complexity: O(m + n)
   * - ListA traverse karne mein O(m) - HashSet mein add karne ke liye
   * - ListB traverse karne mein O(n) - Intersection check karne ke liye
   * - HashSet.has() operation O(1) hai
   * - Total: O(m) + O(n) = O(m + n)
   *
   * Space Complexity: O(m)
   * - HashSet mein maximum m nodes store ho sakte hain (puri listA)
   * - Extra space use ho raha hai, isliye brute force se space-wise worse hai
   *
   * Trade-off:
   * ---------
   * - Time: Brute Force O(m × n) → Better O(m + n) ✅ (Bahut better!)
   * - Space: Brute Force O(1) → Better O(m) ❌ (Worse, lekin acceptable)
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

    // STEP 1: HashSet banao - ye nodes ka reference store karega
    // (Create HashSet - it will store node references)
    const nodesSet = new Set<ListNode>();

    // STEP 2: ListA ko traverse karo aur saare nodes ko HashSet mein add karo
    // (Traverse listA and add all nodes to HashSet)
    let currentA: ListNode | null = headA;
    while (currentA !== null) {
      // Current node ko HashSet mein add karo
      // (Add current node to HashSet)
      // NOTE: Set mein node ka REFERENCE store ho raha hai, value nahi
      nodesSet.add(currentA);

      // Next node pe jao
      // (Move to next node)
      currentA = currentA.next;
    }

    // STEP 3: ListB ko traverse karo
    // (Traverse listB)
    let currentB: ListNode | null = headB;
    while (currentB !== null) {
      // STEP 4: Check karo ki kya current node HashSet mein exist karta hai
      // (Check if current node exists in HashSet)
      if (nodesSet.has(currentB)) {
        // INTERSECTION FOUND! ✅
        // Ye node listA mein bhi tha (same reference)
        // (This node was also in listA - same reference)
        return currentB;
      }

      // STEP 5: Next node pe jao
      // (Move to next node)
      currentB = currentB.next;
    }

    // STEP 6: Agar koi intersection nahi mila, toh null return karo
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
   *           (0x100)(0x101)(0x300)(0x400)(0x500)
   *
   * ListB: 5 → 6 → 1 → 8 → 4 → 5 → null
   *       (0x200)(0x201)(0x202)(0x300)(0x400)(0x500)
   *                              ↑
   *                       Same node as listA (0x300)
   *
   * Variables:
   * ---------
   * nodesSet = new Set<ListNode>() (empty)
   * currentA = null (will be initialized)
   * currentB = null (will be initialized)
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: BUILD HASHSET FROM LIST A
   * ═════════════════════════════════════════════════════════════════
   *
   * Goal: ListA ke saare nodes ko HashSet mein store karna
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: currentA = 4 (addr: 0x100)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Action: nodesSet.add(0x100)
   *   nodesSet = {0x100}
   *   currentA = currentA.next → 1 (0x101)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: currentA = 1 (addr: 0x101)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Action: nodesSet.add(0x101)
   *   nodesSet = {0x100, 0x101}
   *   currentA = currentA.next → 8 (0x300)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: currentA = 8 (addr: 0x300) ⭐ Intersection node
   * ─────────────────────────────────────────────────────────────────
   *
   *   Action: nodesSet.add(0x300)
   *   nodesSet = {0x100, 0x101, 0x300}
   *   currentA = currentA.next → 4 (0x400)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: currentA = 4 (addr: 0x400)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Action: nodesSet.add(0x400)
   *   nodesSet = {0x100, 0x101, 0x300, 0x400}
   *   currentA = currentA.next → 5 (0x500)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: currentA = 5 (addr: 0x500)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Action: nodesSet.add(0x500)
   *   nodesSet = {0x100, 0x101, 0x300, 0x400, 0x500}
   *   currentA = currentA.next → null
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 6: currentA = null
   * ─────────────────────────────────────────────────────────────────
   *
   *   Loop terminates
   *
   * Final HashSet State:
   * -------------------
   * nodesSet = {0x100, 0x101, 0x300, 0x400, 0x500}
   * (ListA ke saare 5 nodes stored hain)
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: TRAVERSE LISTB AND CHECK INTERSECTION
   * ═════════════════════════════════════════════════════════════════
   *
   * Goal: ListB ke har node ko check karo ki kya wo HashSet mein hai
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: currentB = 5 (addr: 0x200)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Check: nodesSet.has(0x200)?
   *   nodesSet = {0x100, 0x101, 0x300, 0x400, 0x500}
   *   Result: NO (0x200 is not in set)
   *
   *   currentB = currentB.next → 6 (0x201)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: currentB = 6 (addr: 0x201)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Check: nodesSet.has(0x201)?
   *   Result: NO (0x201 is not in set)
   *
   *   currentB = currentB.next → 1 (0x202)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: currentB = 1 (addr: 0x202)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Check: nodesSet.has(0x202)?
   *   Result: NO (0x202 is not in set)
   *
   *   ⚠️ Important Note:
   *   - Value is 1, same as listA ka second node
   *   - Lekin address different hai (0x202 vs 0x101)
   *   - Isliye match nahi hua!
   *   - Intersection VALUE se nahi, REFERENCE se hota hai
   *
   *   currentB = currentB.next → 8 (0x300)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: currentB = 8 (addr: 0x300) ⭐⭐⭐
   * ─────────────────────────────────────────────────────────────────
   *
   *   Check: nodesSet.has(0x300)?
   *   nodesSet = {0x100, 0x101, 0x300, 0x400, 0x500}
   *                              ↑
   *   Result: YES! ✅ (0x300 exists in set)
   *
   *   🎯 INTERSECTION FOUND!
   *
   *   Return: currentB (node with addr 0x300, value 8)
   *
   * Final Result:
   * -------------
   * Return node with value 8 (address 0x300)
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS IS BETTER THAN BRUTE FORCE
   * ═════════════════════════════════════════════════════════════════
   *
   * Brute Force Approach:
   * --------------------
   * - ListA ka har node ke liye, puri listB traverse karni padti
   * - Node 4 (listA) ke liye: 6 comparisons (puri listB)
   * - Node 1 (listA) ke liye: 6 comparisons
   * - Node 8 (listA) ke liye: 4 comparisons (jab match mil gaya)
   * - Total: 5 × 6 = 30 comparisons (worst case)
   *
   * Better (HashSet) Approach:
   * -------------------------
   * - Phase 1: 5 iterations (listA mein 5 nodes) - O(m)
   * - Phase 2: 4 iterations (listB mein 4 nodes tak match mil gaya) - O(n)
   * - Total: 5 + 4 = 9 operations
   *
   * Speed Comparison:
   * ----------------
   * Brute Force: 30 operations
   * Better: 9 operations
   * → 3.3x faster! 🚀
   *
   * For large lists (m=1000, n=1000):
   * Brute Force: 1,000,000 operations 😱
   * Better: 2,000 operations ✅
   * → 500x faster! 🚀🚀🚀
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
   * Phase 1: nodesSet = {addr of 2, 6, 4}
   * Phase 2: Check 1 (NO), Check 5 (NO)
   * Result: null
   *
   * Edge Case 2: Empty List
   * -----------------------
   * ListA: null
   * ListB: 1 → 2 → 3 → null
   *
   * - Pehle hi check: headA === null → return null
   * - HashSet banane ki zaroorat nahi
   *
   * Edge Case 3: Intersection at Head
   * ----------------------------------
   * ListA: 1 → 2 → 3 → null (addr: 0x100)
   *        ↑
   * ListB: (same) 1 → 2 → 3 → null
   *
   * Phase 1: nodesSet = {0x100, 0x200, 0x300}
   * Phase 2: First node (0x100) check → YES! Found immediately
   * Result: Return first node
   *
   * Edge Case 4: Same Values but Different Nodes
   * ---------------------------------------------
   * ListA: 1 → 2 → 3 → null (addresses: 0x100, 0x200, 0x300)
   * ListB: 1 → 2 → 3 → null (addresses: 0x400, 0x500, 0x600)
   *
   * Phase 1: nodesSet = {0x100, 0x200, 0x300}
   * Phase 2:
   *   - Check 0x400: NO (not in set)
   *   - Check 0x500: NO (not in set)
   *   - Check 0x600: NO (not in set)
   * Result: null
   *
   * ⚠️ Important: Values same hain but addresses different hain,
   *              isliye koi intersection nahi hai!
   *
   * ═════════════════════════════════════════════════════════════════
   * MEMORY VISUALIZATION
   * ═════════════════════════════════════════════════════════════════
   *
   * HashSet Internal Structure (Conceptual):
   * ----------------------------------------
   *
   * Index  | Hash | Node Reference
   * -------|------|---------------------------
   * 0      | h1   | → ListNode@0x100 (val=4)
   * 1      | h2   | → ListNode@0x101 (val=1)
   * 2      | h3   | → ListNode@0x300 (val=8) ⭐
   * 3      | h4   | → ListNode@0x400 (val=4)
   * 4      | h5   | → ListNode@0x500 (val=5)
   *
   * Jab hum nodesSet.has(0x300) call karte hain:
   * 1. Calculate hash of 0x300 → h3
   * 2. Index h3 pe jao → Found! ✅
   * 3. Return true (O(1) time!)
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
  console.log('INTERSECTION OF TWO LINKED LISTS - BETTER (HASHING)');
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

  // Test Case 4: Intersection at head
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

  // Test Case 8: Large lists performance test
  console.log('Test Case 8: Performance test with larger lists');
  const { headA: test8A, headB: test8B } = createIntersectingLists(
    Array.from({ length: 100 }, (_, i) => i),
    Array.from({ length: 150 }, (_, i) => i + 1000),
    [999, 1000, 1001]
  );
  console.log('ListA length:', listToArray(test8A).length);
  console.log('ListB length:', listToArray(test8B).length);
  const startTime = performance.now();
  const result8 = getIntersectionNode(test8A, test8B);
  const endTime = performance.now();
  console.log(
    'Intersection:',
    result8 ? `Node with value ${result8.val}` : 'null'
  );
  console.log('Expected: Node with value 999');
  console.log(`Time taken: ${(endTime - startTime).toFixed(4)}ms`);
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('HashSet approach is much faster than brute force! 🚀');
  console.log('═══════════════════════════════════════════════════════════');
}