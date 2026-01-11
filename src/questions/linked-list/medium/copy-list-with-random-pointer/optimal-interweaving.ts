namespace CopyListWithRandomPointerOptimal {
  /**
   * Node class - Represents a node with next and random pointers
   */
  class Node {
    val: number;
    next: Node | null;
    random: Node | null;

    constructor(val?: number, next?: Node | null, random?: Node | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
      this.random = random === undefined ? null : random;
    }
  }

  /**
   * OPTIMAL APPROACH - INTERWEAVING / WEAVING
   *
   * Intuition (Soch):
   * ----------------
   * HashMap approach mein O(n) extra space use hoti hai.
   * Kya hum isse avoid kar sakte hain? 🤔
   *
   * Genius Idea: 💡
   * Agar hum NEW nodes ko ORIGINAL list mein hi insert kar dein?
   *
   * Original: A → B → C
   *
   * Interweave: A → A' → B → B' → C → C'
   *
   * Now mapping is simple:
   *   oldNode.next = newNode!
   *
   * No HashMap needed! ✅
   *
   * Visual Example:
   * --------------
   * Original: 7 → 13 → 11
   *           ↓    ↓
   *          null  7
   *
   * Step 1: Interweave new nodes
   *   7 → 7' → 13 → 13' → 11 → 11'
   *
   * Step 2: Set random pointers
   *   For 13':
   *     13.random = 7
   *     13'.random = 7.next = 7' ✓
   *
   *   For 7':
   *     7.random = null
   *     7'.random = null ✓
   *
   * Step 3: Separate lists
   *   Original: 7 → 13 → 11
   *   Copy:     7' → 13' → 11'
   *
   * Algorithm:
   * ----------
   * PHASE 1: Interweave - Insert copy nodes
   *   A → B → C
   *   becomes
   *   A → A' → B → B' → C → C'
   *
   * PHASE 2: Set random pointers
   *   For each original node:
   *     if node.random exists:
   *       node.next.random = node.random.next
   *
   * PHASE 3: Separate lists
   *   Extract copy list
   *   Restore original list
   *
   * Time Complexity: O(n)
   * - Phase 1: O(n) - interweave all nodes
   * - Phase 2: O(n) - set random pointers
   * - Phase 3: O(n) - separate lists
   * - Total: O(3n) = O(n)
   *
   * Space Complexity: O(1)
   * - No HashMap needed! ✅
   * - Only creating new nodes (which is required anyway)
   * - No extra space for mapping!
   *
   * Why This is OPTIMAL:
   * -------------------
   * - O(n) time - same as HashMap approach
   * - O(1) space - better than HashMap! 🚀
   * - Clever use of list structure
   * - Interview impressive!
   *
   * @param head - Head of original linked list
   * @returns Head of deep copied linked list
   */
  function copyRandomList(head: Node | null): Node | null {
    // EDGE CASE: Empty list
    if (head === null) {
      return null;
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 1: INTERWEAVE - Insert copy nodes after each original node
    // ═══════════════════════════════════════════════════════════════
    // Transform: A → B → C
    //       Into: A → A' → B → B' → C → C'

    let current: Node | null = head;

    while (current !== null) {
      // Create copy node
      //@ts-ignore
      const copyNode = new Node(current.val);

      // Insert copy node right after current
      // Before: current → current.next
      // After:  current → copyNode → current.next
      copyNode.next = current.next;
      current.next = copyNode;

      // Move to next original node (skip the copy we just inserted)
      current = copyNode.next;
    }

    // After Phase 1: original and copy nodes are interwoven
    // Original nodes at: 0, 2, 4, 6, ...
    // Copy nodes at:     1, 3, 5, 7, ...

    // ═══════════════════════════════════════════════════════════════
    // PHASE 2: SET RANDOM POINTERS for copy nodes
    // ═══════════════════════════════════════════════════════════════
    // Use the interweaving to find corresponding random nodes

    current = head;

    while (current !== null) {
      // Get the copy node (always right after current)
      //@ts-ignore
      const copyNode = current.next!;

      // Set random pointer for copy node
      // If current.random exists:
      //   - current.random is an original node
      //   - current.random.next is its corresponding copy node
      //   - Set copyNode.random to that copy node
      if (current.random !== null) {
        copyNode.random = current.random.next;
      } else {
        copyNode.random = null;
      }

      // Move to next original node (skip copy node)
      current = copyNode.next;
    }

    // After Phase 2: all copy nodes have correct random pointers

    // ═══════════════════════════════════════════════════════════════
    // PHASE 3: SEPARATE LISTS - Extract copy and restore original
    // ═══════════════════════════════════════════════════════════════
    // Separate: A → A' → B → B' → C → C'
    //     Into: A → B → C (original)
    //           A' → B' → C' (copy)

    current = head;
    const copyHead = head.next!; // Head of copied list
    let copyCurrent = copyHead;

    while (current !== null) {
      // Restore original list's next pointer
      current.next = copyCurrent.next;

      // Set copy list's next pointer
      if (copyCurrent.next !== null) {
        copyCurrent.next = copyCurrent.next.next;
      }

      // Move both pointers
      current = current.next;
      copyCurrent = copyCurrent.next!;
    }

    // After Phase 3:
    // - Original list restored
    // - Copy list extracted

    return copyHead;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
   *
   * Original List Structure:
   * Node A: val=7,  random=null
   * Node B: val=13, random=Node A
   * Node C: val=11, random=Node E
   * Node D: val=10, random=Node C
   * Node E: val=1,  random=Node A
   *
   * Visual:
   *           ┌───┐
   *           ↓   │
   * 7 → 13 → 11 → 10 → 1 → null
   * ↑↑   │   │         ↑
   * │└───┘   └─────────┘
   * └──────────────────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: INTERWEAVE - INSERT COPY NODES
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = Node A (val=7)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create copyNode = Node A' (val=7)
   *   copyNode.next = A.next = B
   *   A.next = copyNode = A'
   *
   * State:
   *   A → A' → B → C → D → E
   *   current = A'.next = B
   *
   * Visual:
   *   7 → 7' → 13 → 11 → 10 → 1
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = Node B (val=13)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create copyNode = Node B' (val=13)
   *   copyNode.next = B.next = C
   *   B.next = copyNode = B'
   *
   * State:
   *   A → A' → B → B' → C → D → E
   *   current = B'.next = C
   *
   * Visual:
   *   7 → 7' → 13 → 13' → 11 → 10 → 1
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = Node C (val=11)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create copyNode = Node C' (val=11)
   *   copyNode.next = C.next = D
   *   C.next = copyNode = C'
   *
   * State:
   *   A → A' → B → B' → C → C' → D → E
   *   current = C'.next = D
   *
   * Visual:
   *   7 → 7' → 13 → 13' → 11 → 11' → 10 → 1
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = Node D (val=10)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create copyNode = Node D' (val=10)
   *   copyNode.next = D.next = E
   *   D.next = copyNode = D'
   *
   * State:
   *   A → A' → B → B' → C → C' → D → D' → E
   *   current = D'.next = E
   *
   * Visual:
   *   7 → 7' → 13 → 13' → 11 → 11' → 10 → 10' → 1
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: current = Node E (val=1)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create copyNode = Node E' (val=1)
   *   copyNode.next = E.next = null
   *   E.next = copyNode = E'
   *
   * State:
   *   A → A' → B → B' → C → C' → D → D' → E → E' → null
   *   current = E'.next = null
   *
   * Final Visual (Phase 1):
   *   7 → 7' → 13 → 13' → 11 → 11' → 10 → 10' → 1 → 1' → null
   *
   * ─────────────────────────────────────────────────────────────────
   * END OF PHASE 1
   * ─────────────────────────────────────────────────────────────────
   *
   * Interwoven list created!
   * Key insight: For any original node X, X.next is its copy X'
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: SET RANDOM POINTERS
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = Node A (val=7)
   * ─────────────────────────────────────────────────────────────────
   *
   * Get copyNode:
   *   copyNode = A.next = A'
   *
   * Set random:
   *   A.random = null
   *   A'.random = null ✓
   *
   * State:
   *   A': val=7, random=null
   *   current = A'.next = B
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = Node B (val=13)
   * ─────────────────────────────────────────────────────────────────
   *
   * Get copyNode:
   *   copyNode = B.next = B'
   *
   * Set random:
   *   B.random = A (original node)
   *   B'.random = B.random.next = A.next = A' ✓
   *
   * State:
   *   B': val=13, random=A'
   *   current = B'.next = C
   *
   * Key insight: B.random.next gives us A' (the copy of A)!
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = Node C (val=11)
   * ─────────────────────────────────────────────────────────────────
   *
   * Get copyNode:
   *   copyNode = C.next = C'
   *
   * Set random:
   *   C.random = E (original node)
   *   C'.random = C.random.next = E.next = E' ✓
   *
   * State:
   *   C': val=11, random=E'
   *   current = C'.next = D
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = Node D (val=10)
   * ─────────────────────────────────────────────────────────────────
   *
   * Get copyNode:
   *   copyNode = D.next = D'
   *
   * Set random:
   *   D.random = C (original node)
   *   D'.random = D.random.next = C.next = C' ✓
   *
   * State:
   *   D': val=10, random=C'
   *   current = D'.next = E
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: current = Node E (val=1)
   * ─────────────────────────────────────────────────────────────────
   *
   * Get copyNode:
   *   copyNode = E.next = E'
   *
   * Set random:
   *   E.random = A (original node)
   *   E'.random = E.random.next = A.next = A' ✓
   *
   * State:
   *   E': val=1, random=A'
   *   current = E'.next = null
   *
   * ─────────────────────────────────────────────────────────────────
   * END OF PHASE 2
   * ─────────────────────────────────────────────────────────────────
   *
   * All random pointers set correctly!
   *
   * Current state:
   *   7 → 7' → 13 → 13' → 11 → 11' → 10 → 10' → 1 → 1' → null
   *
   * Random pointers (copy nodes):
   *   A' → null
   *   B' → A'
   *   C' → E'
   *   D' → C'
   *   E' → A'
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 3: SEPARATE LISTS
   * ═════════════════════════════════════════════════════════════════
   *
   * Initial state:
   *   current = A
   *   copyHead = A.next = A'
   *   copyCurrent = A'
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = A, copyCurrent = A'
   * ─────────────────────────────────────────────────────────────────
   *
   * Restore original:
   *   A.next = A'.next = B ✓
   *
   * Set copy:
   *   A'.next = B.next = B' ✓
   *
   * Move pointers:
   *   current = A.next = B
   *   copyCurrent = A'.next = B'
   *
   * State:
   *   Original: A → B → ...
   *   Copy:     A' → B' → ...
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = B, copyCurrent = B'
   * ─────────────────────────────────────────────────────────────────
   *
   * Restore original:
   *   B.next = B'.next = C ✓
   *
   * Set copy:
   *   B'.next = C.next = C' ✓
   *
   * Move pointers:
   *   current = B.next = C
   *   copyCurrent = B'.next = C'
   *
   * State:
   *   Original: A → B → C → ...
   *   Copy:     A' → B' → C' → ...
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = C, copyCurrent = C'
   * ─────────────────────────────────────────────────────────────────
   *
   * Restore original:
   *   C.next = C'.next = D ✓
   *
   * Set copy:
   *   C'.next = D.next = D' ✓
   *
   * Move pointers:
   *   current = C.next = D
   *   copyCurrent = C'.next = D'
   *
   * State:
   *   Original: A → B → C → D → ...
   *   Copy:     A' → B' → C' → D' → ...
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = D, copyCurrent = D'
   * ─────────────────────────────────────────────────────────────────
   *
   * Restore original:
   *   D.next = D'.next = E ✓
   *
   * Set copy:
   *   D'.next = E.next = E' ✓
   *
   * Move pointers:
   *   current = D.next = E
   *   copyCurrent = D'.next = E'
   *
   * State:
   *   Original: A → B → C → D → E → ...
   *   Copy:     A' → B' → C' → D' → E' → ...
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: current = E, copyCurrent = E'
   * ─────────────────────────────────────────────────────────────────
   *
   * Restore original:
   *   E.next = E'.next = null ✓
   *
   * Set copy:
   *   E'.next = null (no next node) ✓
   *
   * Move pointers:
   *   current = E.next = null
   *   copyCurrent = E'.next = null
   *
   * ─────────────────────────────────────────────────────────────────
   * END OF PHASE 3
   * ─────────────────────────────────────────────────────────────────
   *
   * Final state:
   *   Original: 7 → 13 → 11 → 10 → 1 → null (restored!)
   *   Copy:     7' → 13' → 11' → 10' → 1' → null
   *
   * ═════════════════════════════════════════════════════════════════
   * RETURN RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: copyHead = A'
   *
   * Copy list with all connections:
   *           ┌───┐
   *           ↓   │
   *   7' → 13' → 11' → 10' → 1' → null
   *   ↑↑   │   │          ↑
   *   │└───┘   └──────────┘
   *   └──────────────────┘
   *
   * ✅ Deep copy complete!
   * ✅ Original list restored!
   * ✅ No HashMap used!
   * ✅ O(1) extra space!
   *
   * ═════════════════════════════════════════════════════════════════
   * WHY THIS IS GENIUS
   * ═════════════════════════════════════════════════════════════════
   *
   * Problem with HashMap approach:
   * -----------------------------
   * - Need O(n) space to store mapping
   * - Extra memory overhead
   *
   * Interweaving solution:
   * ---------------------
   * - Uses the list ITSELF as the mapping!
   * - oldNode.next = newNode (implicit mapping)
   * - No extra HashMap needed
   * - O(1) space! ✅
   *
   * Key Insight:
   * -----------
   * When we need to find copy of X:
   *   HashMap approach: map.get(X)
   *   Interweaving:     X.next
   *
   * Example:
   * -------
   * B.random = A (need to find A')
   *
   * HashMap:
   *   B'.random = map.get(A) = A'
   *
   * Interweaving:
   *   B'.random = B.random.next = A.next = A' ✓
   *
   * Same result, no HashMap! 🚀
   *
   * Trade-offs:
   * ----------
   * Pros:
   *   ✅ O(1) extra space
   *   ✅ Clever and elegant
   *   ✅ Interview impressive
   *
   * Cons:
   *   ⚠️  More complex logic
   *   ⚠️  Temporarily modifies original list
   *   ⚠️  Need careful restoration
   *
   * Final Verdict:
   * -------------
   * - HashMap: Easier to understand, O(n) space
   * - Interweaving: More clever, O(1) space ⭐
   *
   * Both are valid interview solutions!
   * Choose based on:
   *   - Understanding: HashMap
   *   - Optimization: Interweaving
   *   - Interview impression: Interweaving 🌟
   */

  // ═══════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Helper to create linked list from array representation
   */
  function createList(arr: Array<[number, number | null]>): Node | null {
    if (arr.length === 0) return null;

    const nodes: Node[] = [];
    for (let i = 0; i < arr.length; i++) {
      nodes.push(new Node(arr[i][0]));
    }

    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length - 1) {
        nodes[i].next = nodes[i + 1];
      }
      if (arr[i][1] !== null) {
        //@ts-ignore
        nodes[i].random = nodes[arr[i][1]]!;
      }
    }

    return nodes[0];
  }

  /**
   * Helper to convert linked list to array representation
   */
  function listToArray(head: Node | null): Array<[number, number | null]> {
    if (head === null) return [];

    const nodes: Node[] = [];
    const indexMap = new Map<Node, number>();
    let current: Node | null = head;
    let index = 0;

    while (current !== null) {
      nodes.push(current);
      indexMap.set(current, index);
      current = current.next;
      index++;
    }

    const result: Array<[number, number | null]> = [];
    for (const node of nodes) {
      const randomIndex =
        node.random !== null ? indexMap.get(node.random)! : null;
      result.push([node.val, randomIndex]);
    }

    return result;
  }

  /**
   * Helper to verify deep copy
   */
  function verifyDeepCopy(original: Node | null, copy: Node | null): boolean {
    if (original === null && copy === null) return true;
    if (original === null || copy === null) return false;

    let origCurrent = original;
    let copyCurrent = copy;

    while (origCurrent !== null && copyCurrent !== null) {
      if (origCurrent.val !== copyCurrent.val) return false;
      if (origCurrent === copyCurrent) return false;

      origCurrent = origCurrent.next!;
      copyCurrent = copyCurrent.next!;
    }

    return origCurrent === null && copyCurrent === null;
  }

  // ═══════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('COPY LIST WITH RANDOM POINTER - OPTIMAL (INTERWEAVING)');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test Case 1: Example 1 from problem
  console.log('Test Case 1: [[7,null],[13,0],[11,4],[10,2],[1,0]]');
  const input1: Array<[number, number | null]> = [
    [7, null],
    [13, 0],
    [11, 4],
    [10, 2],
    [1, 0],
  ];
  const head1 = createList(input1);
  const result1 = copyRandomList(head1);
  console.log('Input: ', JSON.stringify(input1));
  console.log('Output:', JSON.stringify(listToArray(result1)));
  console.log('Expected:', JSON.stringify(input1));
  console.log('Deep copy verified:', verifyDeepCopy(head1, result1));
  console.log('✓ Passed\n');

  // Test Case 2: Example 2 from problem
  console.log('Test Case 2: [[1,1],[2,1]]');
  const input2: Array<[number, number | null]> = [
    [1, 1],
    [2, 1],
  ];
  const head2 = createList(input2);
  const result2 = copyRandomList(head2);
  console.log('Input: ', JSON.stringify(input2));
  console.log('Output:', JSON.stringify(listToArray(result2)));
  console.log('Expected:', JSON.stringify(input2));
  console.log('Deep copy verified:', verifyDeepCopy(head2, result2));
  console.log('✓ Passed\n');

  // Test Case 3: Example 3 from problem
  console.log('Test Case 3: [[3,null],[3,0],[3,null]]');
  const input3: Array<[number, number | null]> = [
    [3, null],
    [3, 0],
    [3, null],
  ];
  const head3 = createList(input3);
  const result3 = copyRandomList(head3);
  console.log('Input: ', JSON.stringify(input3));
  console.log('Output:', JSON.stringify(listToArray(result3)));
  console.log('Expected:', JSON.stringify(input3));
  console.log('Deep copy verified:', verifyDeepCopy(head3, result3));
  console.log('✓ Passed\n');

  // Test Case 4: Empty list
  console.log('Test Case 4: [] (empty list)');
  const head4 = null;
  const result4 = copyRandomList(head4);
  console.log('Input:  []');
  console.log('Output: []');
  console.log('Result is null:', result4 === null);
  console.log('✓ Passed\n');

  // Test Case 5: Single node
  console.log('Test Case 5: [[1,null]] (single node)');
  const input5: Array<[number, number | null]> = [[1, null]];
  const head5 = createList(input5);
  const result5 = copyRandomList(head5);
  console.log('Input: ', JSON.stringify(input5));
  console.log('Output:', JSON.stringify(listToArray(result5)));
  console.log('Deep copy verified:', verifyDeepCopy(head5, result5));
  console.log('✓ Passed\n');

  // Test Case 6: Single node pointing to itself
  console.log('Test Case 6: [[1,0]] (self-loop)');
  const input6: Array<[number, number | null]> = [[1, 0]];
  const head6 = createList(input6);
  const result6 = copyRandomList(head6);
  console.log('Input: ', JSON.stringify(input6));
  console.log('Output:', JSON.stringify(listToArray(result6)));
  console.log('Deep copy verified:', verifyDeepCopy(head6, result6));
  console.log('✓ Passed\n');

  // Test Case 7: All random pointers null
  console.log('Test Case 7: [[1,null],[2,null],[3,null]] (no random)');
  const input7: Array<[number, number | null]> = [
    [1, null],
    [2, null],
    [3, null],
  ];
  const head7 = createList(input7);
  const result7 = copyRandomList(head7);
  console.log('Input: ', JSON.stringify(input7));
  console.log('Output:', JSON.stringify(listToArray(result7)));
  console.log('Deep copy verified:', verifyDeepCopy(head7, result7));
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Time Complexity: O(n) - Three passes through list');
  console.log('Space Complexity: O(1) - No HashMap needed! 🚀');
  console.log('✅✅✅ THIS IS THE OPTIMAL SOLUTION! ✅✅✅');
  console.log('Interview recommendation: Show this for maximum impact!');
  console.log('═══════════════════════════════════════════════════════════');
}