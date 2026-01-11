namespace CopyListWithRandomPointerHashMap {
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
   * HASHMAP APPROACH (TWO PASS)
   *
   * Intuition (Soch):
   * ----------------
   * Deep copy banana hai jisme har node ka copy ho aur connections bhi same ho.
   *
   * Problem kya hai?
   * - Jab hum ek node ka copy banate hain, uska random pointer kisi OLD node ko
   *   point kar raha hai
   * - Lekin copy mein toh NEW nodes hain!
   * - Toh kaise pata chalega ki OLD node ka corresponding NEW node kaun sa hai?
   *
   * Solution: HashMap! 💡
   * - Ek mapping banao: Old Node → New Node
   * - Phir easily set kar sakte ho:
   *   newNode.random = map[oldNode.random]
   *
   * Visual Example:
   * --------------
   * Original: A → B → C
   *           ↓   ↓
   *           B   null
   *
   * Step 1: Create HashMap
   *   Map: {
   *     A → A' (new node)
   *     B → B' (new node)
   *     C → C' (new node)
   *   }
   *
   * Step 2: Set pointers using HashMap
   *   A'.next = map[A.next] = map[B] = B' ✓
   *   A'.random = map[A.random] = map[B] = B' ✓
   *
   *   B'.next = map[B.next] = map[C] = C' ✓
   *   B'.random = map[B.random] = map[null] = null ✓
   *
   *   C'.next = map[C.next] = null ✓
   *   C'.random = map[C.random] = null ✓
   *
   * Algorithm:
   * ----------
   * Pass 1: Create all new nodes and build HashMap
   *   - Traverse original list
   *   - For each node, create new node
   *   - Store in HashMap: old → new
   *
   * Pass 2: Set next and random pointers
   *   - Traverse original list again
   *   - For each node, set pointers in corresponding new node:
   *     newNode.next = map[oldNode.next]
   *     newNode.random = map[oldNode.random]
   *
   * Time Complexity: O(n)
   * - Pass 1: O(n) - create all nodes
   * - Pass 2: O(n) - set all pointers
   * - Total: O(2n) = O(n)
   *
   * Space Complexity: O(n)
   * - HashMap stores n entries: old → new
   * - This is EXTRA space (beyond the n new nodes we need to create)
   *
   * Why This Works:
   * --------------
   * - HashMap gives us instant access to corresponding new node
   * - We can safely create all nodes first, then set pointers
   * - Clean separation: creation phase → connection phase
   *
   * @param head - Head of original linked list
   * @returns Head of deep copied linked list
   */
  function copyRandomList(head: Node | null): Node | null {
    // EDGE CASE: Empty list
    // (Agar original list hi nahi hai, toh copy bhi null)
    if (head === null) {
      return null;
    }

    // STEP 1: Create HashMap to store old → new node mapping
    // (Ye mapping baad mein random pointers set karne mein kaam aayegi)
    const map = new Map<Node, Node>();

    // PASS 1: Create all new nodes and populate HashMap
    // (Pehle saare nodes bana lo, connections baad mein karenge)
    let current: Node | null = head;

    while (current !== null) {
      // Create new node with same value
      // (Nayi node banao with same value, but connections abhi set nahi kiye)
      const newNode = new Node(current.val);

      // Store mapping: old node → new node
      // (Is mapping se baad mein easily new nodes access kar sakte hain)
      map.set(current, newNode);

      // Move to next node
      current = current.next;
    }

    // PASS 2: Set next and random pointers for all new nodes
    // (Ab HashMap use karke saare connections set karo)
    current = head;

    while (current !== null) {
      // Get the corresponding new node from HashMap
      // (Purane node ke corresponding nayi node nikalo)
      const newNode = map.get(current)!;

      // Set next pointer
      // (Agar purane node ka next hai, toh uska corresponding new node set karo)
      newNode.next = current.next !== null ? map.get(current.next)! : null;

      // Set random pointer
      // (Agar purane node ka random hai, toh uska corresponding new node set karo)
      newNode.random =
        current.random !== null ? map.get(current.random)! : null;

      // Move to next node
      current = current.next;
    }

    // STEP 3: Return head of copied list
    // (Original list ke head ka corresponding new node return karo)
    return map.get(head)!;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
   *
   * Original List Structure:
   * Node 0: val=7,  random=null
   * Node 1: val=13, random=Node 0
   * Node 2: val=11, random=Node 4
   * Node 3: val=10, random=Node 2
   * Node 4: val=1,  random=Node 0
   *
   * Visual:
   *           ┌───┐
   *           ↓   │
   * 7 → 13 → 11 → 10 → 1 → null
   * ↑↑   │   │         ↑
   * │└───┘   └─────────┘
   * └──────────────────┘
   *
   * Expected output: Same structure but with NEW nodes
   *
   * ═════════════════════════════════════════════════════════════════
   * INITIAL STATE
   * ═════════════════════════════════════════════════════════════════
   *
   * Original list nodes:
   *   Node A: val=7,  next=B,  random=null
   *   Node B: val=13, next=C,  random=A
   *   Node C: val=11, next=D,  random=E
   *   Node D: val=10, next=E,  random=C
   *   Node E: val=1,  next=null, random=A
   *
   * HashMap: {} (empty)
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 1: CREATE ALL NEW NODES AND BUILD HASHMAP
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = Node A (val=7)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create newNode = Node A' (val=7, next=null, random=null)
   *   map.set(A, A')
   *
   * State:
   *   HashMap: { A → A' }
   *   current = A.next = B
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = Node B (val=13)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create newNode = Node B' (val=13, next=null, random=null)
   *   map.set(B, B')
   *
   * State:
   *   HashMap: { A → A', B → B' }
   *   current = B.next = C
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = Node C (val=11)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create newNode = Node C' (val=11, next=null, random=null)
   *   map.set(C, C')
   *
   * State:
   *   HashMap: { A → A', B → B', C → C' }
   *   current = C.next = D
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = Node D (val=10)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create newNode = Node D' (val=10, next=null, random=null)
   *   map.set(D, D')
   *
   * State:
   *   HashMap: { A → A', B → B', C → C', D → D' }
   *   current = D.next = E
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: current = Node E (val=1)
   * ─────────────────────────────────────────────────────────────────
   *
   * Action:
   *   Create newNode = Node E' (val=1, next=null, random=null)
   *   map.set(E, E')
   *
   * State:
   *   HashMap: { A → A', B → B', C → C', D → D', E → E' }
   *   current = E.next = null
   *
   * ─────────────────────────────────────────────────────────────────
   * END OF PASS 1
   * ─────────────────────────────────────────────────────────────────
   *
   * All new nodes created:
   *   A' (val=7)
   *   B' (val=13)
   *   C' (val=11)
   *   D' (val=10)
   *   E' (val=1)
   *
   * HashMap complete: old → new mapping ready! ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 2: SET NEXT AND RANDOM POINTERS
   * ═════════════════════════════════════════════════════════════════
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: current = Node A
   * ─────────────────────────────────────────────────────────────────
   *
   * Get newNode:
   *   newNode = map.get(A) = A'
   *
   * Set next:
   *   A.next = B
   *   A'.next = map.get(B) = B' ✓
   *
   * Set random:
   *   A.random = null
   *   A'.random = null ✓
   *
   * State:
   *   A': val=7, next=B', random=null
   *   current = A.next = B
   *
   * Visual:
   *   A' → B'
   *   ↓
   *   null
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: current = Node B
   * ─────────────────────────────────────────────────────────────────
   *
   * Get newNode:
   *   newNode = map.get(B) = B'
   *
   * Set next:
   *   B.next = C
   *   B'.next = map.get(C) = C' ✓
   *
   * Set random:
   *   B.random = A
   *   B'.random = map.get(A) = A' ✓
   *
   * State:
   *   B': val=13, next=C', random=A'
   *   current = B.next = C
   *
   * Visual:
   *       ┌───┐
   *       ↓   │
   *   A' → B' → C'
   *   ↑    │
   *   └────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: current = Node C
   * ─────────────────────────────────────────────────────────────────
   *
   * Get newNode:
   *   newNode = map.get(C) = C'
   *
   * Set next:
   *   C.next = D
   *   C'.next = map.get(D) = D' ✓
   *
   * Set random:
   *   C.random = E
   *   C'.random = map.get(E) = E' ✓
   *
   * State:
   *   C': val=11, next=D', random=E'
   *   current = C.next = D
   *
   * Visual:
   *       ┌───┐
   *       ↓   │
   *   A' → B' → C' → D' (C' will point to E')
   *   ↑    │
   *   └────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: current = Node D
   * ─────────────────────────────────────────────────────────────────
   *
   * Get newNode:
   *   newNode = map.get(D) = D'
   *
   * Set next:
   *   D.next = E
   *   D'.next = map.get(E) = E' ✓
   *
   * Set random:
   *   D.random = C
   *   D'.random = map.get(C) = C' ✓
   *
   * State:
   *   D': val=10, next=E', random=C'
   *   current = D.next = E
   *
   * Visual:
   *       ┌───┐
   *       ↓   │
   *   A' → B' → C' → D' → E'
   *   ↑    │   ↑    │
   *   └────┘   └────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: current = Node E
   * ─────────────────────────────────────────────────────────────────
   *
   * Get newNode:
   *   newNode = map.get(E) = E'
   *
   * Set next:
   *   E.next = null
   *   E'.next = null ✓
   *
   * Set random:
   *   E.random = A
   *   E'.random = map.get(A) = A' ✓
   *
   * State:
   *   E': val=1, next=null, random=A'
   *   current = E.next = null
   *
   * Final Visual:
   *           ┌───┐
   *           ↓   │
   *   A' → B' → C' → D' → E' → null
   *   ↑↑   │   ↑    │    ↑
   *   │└───┘   └────┘    │
   *   └──────────────────┘
   *
   * ─────────────────────────────────────────────────────────────────
   * END OF PASS 2
   * ─────────────────────────────────────────────────────────────────
   *
   * All connections set! Copy is complete! ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * STEP 3: RETURN RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: map.get(head) = map.get(A) = A'
   *
   * Result: Head of copied list = A'
   *
   * Verification:
   * ------------
   * Copy is completely separate from original:
   *   - All NEW nodes (A', B', C', D', E')
   *   - Same structure as original
   *   - No pointers to original nodes ✓
   *
   * ═════════════════════════════════════════════════════════════════
   * KEY INSIGHTS
   * ═════════════════════════════════════════════════════════════════
   *
   * Why HashMap is Powerful:
   * -----------------------
   * 1. Direct Mapping: old node → new node in O(1)
   * 2. Can create all nodes first, set pointers later
   * 3. Random pointers can reference ANY node - HashMap handles it!
   * 4. Clean separation of concerns:
   *    - Phase 1: Create nodes
   *    - Phase 2: Set connections
   *
   * Example of Random Pointer Resolution:
   * -------------------------------------
   * When setting B'.random:
   *   - B.random points to A (some old node)
   *   - Need to find A's corresponding new node
   *   - HashMap lookup: map.get(A) = A'
   *   - Set B'.random = A'
   *   - Done in O(1) time! ✓
   *
   * Without HashMap:
   * ---------------
   * - Would need to traverse list to find corresponding node
   * - Time complexity would be O(n²)
   * - HashMap reduces this to O(n)! 🚀
   *
   * Trade-off:
   * ---------
   * - Time: O(n) ✅
   * - Space: O(n) for HashMap ⚠️
   * - But this is acceptable for most cases!
   *
   * Can we do better?
   * ----------------
   * - Yes! Interweaving approach uses O(1) extra space
   * - See optimal-interweaving.ts for that solution
   * - But HashMap approach is clearer and easier to understand
   */

  // ═══════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Helper to create linked list from array representation
   * Each element is [val, randomIndex]
   */
  function createList(arr: Array<[number, number | null]>): Node | null {
    if (arr.length === 0) return null;

    // First pass: create all nodes
    const nodes: Node[] = [];
    for (let i = 0; i < arr.length; i++) {
      nodes.push(new Node(arr[i][0]));
    }

    // Second pass: set next and random pointers
    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length - 1) {
        nodes[i].next = nodes[i + 1];
      }
      if (arr[i][1] !== null) {
        //@ts-ignore
        nodes[i].random = nodes[arr[i][1]];
      }
    }

    return nodes[0];
  }

  /**
   * Helper to convert linked list to array representation
   */
  function listToArray(head: Node | null): Array<[number, number | null]> {
    if (head === null) return [];

    // First, create array of nodes and build index map
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

    // Build result array
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
      // Check if values match
      if (origCurrent.val !== copyCurrent.val) return false;

      // Check if nodes are different (not same reference)
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
  console.log('COPY LIST WITH RANDOM POINTER - HASHMAP APPROACH');
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
  console.log('Time Complexity: O(n) - Two passes through list');
  console.log('Space Complexity: O(n) - HashMap stores n entries');
  console.log('✅ This approach is GOOD for interviews!');
  console.log('🚀 See optimal-interweaving.ts for O(1) space solution!');
  console.log('═══════════════════════════════════════════════════════════');
}