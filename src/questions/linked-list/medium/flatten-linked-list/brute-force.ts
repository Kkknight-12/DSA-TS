namespace FlattenLinkedListBruteForce {
  /**
   * Node class - Represents a node with next (horizontal) and bottom (vertical) pointers
   */
  class Node {
    data: number;
    next: Node | null;
    bottom: Node | null;

    constructor(
      data: number = 0,
      next: Node | null = null,
      bottom: Node | null = null
    ) {
      this.data = data;
      this.next = next;
      this.bottom = bottom;
    }
  }

  /**
   * BRUTE FORCE APPROACH - COLLECT & SORT
   * ======================================
   *
   * Intuition (Soch):
   * ----------------
   * Sabse seedha approach: Saare nodes ki values ko ek array mein collect kar lo,
   * array ko sort kar lo, aur phir nayi sorted linked list bana lo!
   *
   * Simple 3 steps:
   * 1. Collect all values in array
   * 2. Sort the array
   * 3. Build new linked list from sorted array
   *
   * Agar complexity ki chinta nahi hai, toh yeh sabse easy approach hai! 😊
   *
   * Key Insight: 💡
   * Hum 2D structure ko temporarily 1D array mein convert kar rahe hain,
   * sort kar rahe hain, aur phir wapas 1D linked list bana rahe hain.
   *
   * Visual Example:
   * ---------------
   * Input: 2D Linked List
   *
   * 5 → 10 → 19 → 28
   * ↓    ↓    ↓    ↓
   * 7    20   22   40
   * ↓
   * 8
   * ↓
   * 30
   *
   * Step 1: Collect all values in array
   *   Traverse horizontally (next pointer):
   *     Start with 5: collect [5, 7, 8, 30] (vertical chain)
   *     Move to 10: collect [10, 20] (vertical chain)
   *     Move to 19: collect [19, 22] (vertical chain)
   *     Move to 28: collect [28, 40] (vertical chain)
   *
   *   Array after collection: [5, 7, 8, 30, 10, 20, 19, 22, 28, 40]
   *
   * Step 2: Sort the array
   *   [5, 7, 8, 10, 19, 20, 22, 28, 30, 40]
   *
   * Step 3: Create new linked list using bottom pointers
   *   5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40 → null
   *   (All connections via bottom pointer)
   *
   * Result: Flattened sorted list ✅
   *
   * Algorithm:
   * ----------
   * 1. Create an empty array to store all node values
   * 2. Traverse the 2D linked list:
   *    a. Start from head (horizontal)
   *    b. For each horizontal node:
   *       - Traverse its vertical chain (bottom pointer)
   *       - Collect all values in array
   *    c. Move to next horizontal node
   * 3. Sort the array in ascending order
   * 4. Create new linked list from sorted array:
   *    a. Create nodes with sorted values
   *    b. Connect them using bottom pointers
   *    c. Set next pointers to null
   * 5. Return head of new list
   *
   * Time Complexity: O(N log N)
   * - Step 1 (Collect values): O(N) where N = total nodes
   *   - We visit each node exactly once
   * - Step 2 (Sort array): O(N log N)
   *   - JavaScript sort uses Timsort: O(N log N)
   * - Step 3 (Create new list): O(N)
   *   - Create N nodes and link them
   * - Total: O(N) + O(N log N) + O(N) = O(N log N)
   *
   * Space Complexity: O(N)
   * - Array to store all values: O(N)
   * - New linked list nodes: O(N)
   * - Total extra space: O(N)
   *
   * Why This Works But Not Optimal:
   * --------------------------------
   * ✅ Very simple and straightforward
   * ✅ Easy to implement and understand
   * ✅ No complex pointer manipulation
   * ❌ Uses O(N) extra space for array
   * ❌ Doesn't utilize the fact that lists are already sorted
   * ❌ Creates new nodes instead of reusing existing ones
   *
   * @param head - Head of the 2D linked list
   * @returns Head of flattened 1D sorted linked list
   */
  function flatten(head: Node | null): Node | null {
    // EDGE CASE: Empty list
    // WHY: If no nodes exist, nothing to flatten
    if (head === null) {
      return null;
    }

    // STEP 1: Collect all values in array
    // WHY: Need all values to sort them
    const values: number[] = [];

    // Traverse horizontally using next pointer
    // WHY: Need to visit each vertical chain
    let horizontal: Node | null = head;

    while (horizontal !== null) {
      // For each horizontal node, traverse its vertical chain
      // WHY: Each horizontal node has a vertical sub-list
      let vertical: Node | null = horizontal;

      while (vertical !== null) {
        // Collect the data value
        // EXAMPLE: If vertical.data is 5, push 5 to array
        values.push(vertical.data);

        // Move down the vertical chain
        vertical = vertical.bottom;
      }

      // Move to next horizontal node
      horizontal = horizontal.next;
    }

    // STEP 2: Sort the collected values
    // WHY: Final list must be sorted in ascending order
    // LOGIC: JavaScript sort with compare function for numbers
    values.sort((a, b) => a - b);

    // STEP 3: Create new linked list from sorted values
    // WHY: Need to build the flattened structure

    // Create dummy node to simplify list building
    // WHY: Avoids special case handling for first node
    const dummy = new Node(0);
    let current = dummy;

    // Iterate through sorted values and create nodes
    for (let i = 0; i < values.length; i++) {
      // Create new node with current value
      // WHY: Building the flattened list
      const newNode = new Node(values[i]);

      // Connect via bottom pointer (not next!)
      // WHY: Problem requires result to use bottom pointers
      current.bottom = newNode;

      // Set next to null (single vertical chain)
      // WHY: Flattened list has no horizontal branching
      newNode.next = null;

      // Move current pointer forward
      current = newNode;
    }

    // STEP 4: Return the flattened list
    // WHY: dummy.bottom points to first actual node
    // (Skip the dummy node we created)
    return dummy.bottom;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example Input:
   *
   * 5 → 10 → 19 → 28
   * ↓    ↓    ↓    ↓
   * 7    20   22   40
   * ↓
   * 8
   * ↓
   * 30
   *
   * Initial State:
   * head → Node(5)
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: COLLECT ALL VALUES
   * ═════════════════════════════════════════════════════════════════
   *
   * Horizontal Traversal (using next pointer):
   *
   * Iteration 1: horizontal = Node(5)
   * ─────────────────────────────────────────────────────────────────
   *   Vertical Traversal (using bottom pointer):
   *
   *   - vertical = Node(5), values = [5]
   *   - vertical = Node(7), values = [5, 7]
   *   - vertical = Node(8), values = [5, 7, 8]
   *   - vertical = Node(30), values = [5, 7, 8, 30]
   *   - vertical = null, exit vertical loop
   *
   *   Move horizontal: horizontal = Node(10)
   *
   * Iteration 2: horizontal = Node(10)
   * ─────────────────────────────────────────────────────────────────
   *   Vertical Traversal:
   *
   *   - vertical = Node(10), values = [5, 7, 8, 30, 10]
   *   - vertical = Node(20), values = [5, 7, 8, 30, 10, 20]
   *   - vertical = null, exit vertical loop
   *
   *   Move horizontal: horizontal = Node(19)
   *
   * Iteration 3: horizontal = Node(19)
   * ─────────────────────────────────────────────────────────────────
   *   Vertical Traversal:
   *
   *   - vertical = Node(19), values = [5, 7, 8, 30, 10, 20, 19]
   *   - vertical = Node(22), values = [5, 7, 8, 30, 10, 20, 19, 22]
   *   - vertical = null, exit vertical loop
   *
   *   Move horizontal: horizontal = Node(28)
   *
   * Iteration 4: horizontal = Node(28)
   * ─────────────────────────────────────────────────────────────────
   *   Vertical Traversal:
   *
   *   - vertical = Node(28), values = [5, 7, 8, 30, 10, 20, 19, 22, 28]
   *   - vertical = Node(40), values = [5, 7, 8, 30, 10, 20, 19, 22, 28, 40]
   *   - vertical = null, exit vertical loop
   *
   *   Move horizontal: horizontal = null, exit horizontal loop
   *
   * After Phase 1:
   * values = [5, 7, 8, 30, 10, 20, 19, 22, 28, 40]
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: SORT THE ARRAY
   * ═════════════════════════════════════════════════════════════════
   *
   * Before sorting: [5, 7, 8, 30, 10, 20, 19, 22, 28, 40]
   * After sorting:  [5, 7, 8, 10, 19, 20, 22, 28, 30, 40]
   *
   * Sorting using: values.sort((a, b) => a - b)
   * Time taken: O(N log N)
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 3: BUILD NEW LINKED LIST
   * ═════════════════════════════════════════════════════════════════
   *
   * Initial: dummy → [0]
   *          current → dummy
   *
   * Iteration 1: Create Node(5)
   * ─────────────────────────────────────────────────────────────────
   *   dummy.bottom = Node(5)
   *   current = Node(5)
   *
   *   Structure: dummy → [0]
   *                       ↓
   *                      [5]
   *
   * Iteration 2: Create Node(7)
   * ─────────────────────────────────────────────────────────────────
   *   current.bottom = Node(7)  // Node(5).bottom = Node(7)
   *   current = Node(7)
   *
   *   Structure: dummy → [0]
   *                       ↓
   *                      [5]
   *                       ↓
   *                      [7]
   *
   * Iteration 3: Create Node(8)
   * ─────────────────────────────────────────────────────────────────
   *   current.bottom = Node(8)
   *   current = Node(8)
   *
   *   Structure: dummy → [0]
   *                       ↓
   *                      [5] → [7] → [8]
   *                       ↓     ↓     ↓
   *
   * ... continuing for remaining values ...
   *
   * Final Structure After All Iterations:
   * ─────────────────────────────────────────────────────────────────
   *
   * dummy → [0]
   *          ↓
   *         [5]
   *          ↓
   *         [7]
   *          ↓
   *         [8]
   *          ↓
   *        [10]
   *          ↓
   *        [19]
   *          ↓
   *        [20]
   *          ↓
   *        [22]
   *          ↓
   *        [28]
   *          ↓
   *        [30]
   *          ↓
   *        [40]
   *          ↓
   *        null
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: dummy.bottom → Node(5)
   *
   * Flattened List: 5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40 → null
   * (All connected via bottom pointers)
   *
   * ✅ Successfully flattened and sorted!
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASES HANDLED
   * ═════════════════════════════════════════════════════════════════
   *
   * 1. Empty List (head = null):
   *    - Return null immediately
   *    - No processing needed
   *
   * 2. Single Node (no next, no bottom):
   *    - values = [node.data]
   *    - After sorting: [node.data]
   *    - Create single node and return
   *
   * 3. Only Horizontal List (no bottom chains):
   *    - Collect horizontal values
   *    - Sort them
   *    - Build vertical chain
   *
   * 4. Only Vertical List (no next pointer):
   *    - Collect vertical values
   *    - Already sorted, but we sort anyway
   *    - Build same vertical chain
   *
   * 5. Duplicate Values:
   *    - All duplicates collected
   *    - Sort maintains all values
   *    - Result includes all duplicates in sorted order
   */

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper function to create a 2D linked list from array representation
   * Used for testing
   *
   * @param arr - 2D array where each sub-array is a vertical chain
   * @returns Head of the 2D linked list
   */
  function create2DList(arr: number[][]): Node | null {
    if (arr.length === 0) return null;

    let head: Node | null = null;
    let prevHorizontal: Node | null = null;

    // Create horizontal chain
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length === 0) continue;

      // Create vertical chain for this horizontal node
      let verticalHead: Node | null = null;
      let prevVertical: Node | null = null;

      for (let j = 0; j < arr[i].length; j++) {
        const node = new Node(arr[i][j]);

        if (verticalHead === null) {
          verticalHead = node;
        }

        if (prevVertical !== null) {
          prevVertical.bottom = node;
        }

        prevVertical = node;
      }

      // Link horizontally
      if (head === null) {
        head = verticalHead;
      }

      if (prevHorizontal !== null) {
        prevHorizontal.next = verticalHead;
      }

      prevHorizontal = verticalHead;
    }

    return head;
  }

  /**
   * Helper function to convert flattened list to array
   * Used for testing and verification
   *
   * @param head - Head of flattened list
   * @returns Array of values in the list
   */
  function listToArray(head: Node | null): number[] {
    const result: number[] = [];
    let current = head;

    while (current !== null) {
      result.push(current.data);
      current = current.bottom; // Use bottom pointer for flattened list
    }

    return result;
  }

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log("🧪 Testing Flatten Linked List - BRUTE FORCE\n");

    // Test Case 1: Example from problem
    console.log("Test 1: Standard 2D list");
    const input1 = [
      [5, 7, 8, 30],
      [10, 20],
      [19, 22],
      [28, 40],
    ];
    const list1 = create2DList(input1);
    const result1 = flatten(list1);
    const output1 = listToArray(result1);
    console.log("Input:", input1);
    console.log("Output:", output1);
    console.log("Expected: [5, 7, 8, 10, 19, 20, 22, 28, 30, 40]");
    console.log(
      "✅ Pass:",
      JSON.stringify(output1) ===
        JSON.stringify([5, 7, 8, 10, 19, 20, 22, 28, 30, 40]),
      "\n"
    );

    // Test Case 2: Empty list
    console.log("Test 2: Empty list");
    const list2 = null;
    const result2 = flatten(list2);
    const output2 = listToArray(result2);
    console.log("Input: null");
    console.log("Output:", output2);
    console.log("Expected: []");
    console.log("✅ Pass:", output2.length === 0, "\n");

    // Test Case 3: Single node
    console.log("Test 3: Single node");
    const input3 = [[5]];
    const list3 = create2DList(input3);
    const result3 = flatten(list3);
    const output3 = listToArray(result3);
    console.log("Input:", input3);
    console.log("Output:", output3);
    console.log("Expected: [5]");
    console.log("✅ Pass:", JSON.stringify(output3) === JSON.stringify([5]), "\n");

    // Test Case 4: Only horizontal list (no bottom chains)
    console.log("Test 4: Only horizontal list");
    const input4 = [[5], [10], [15], [20]];
    const list4 = create2DList(input4);
    const result4 = flatten(list4);
    const output4 = listToArray(result4);
    console.log("Input:", input4);
    console.log("Output:", output4);
    console.log("Expected: [5, 10, 15, 20]");
    console.log(
      "✅ Pass:",
      JSON.stringify(output4) === JSON.stringify([5, 10, 15, 20]),
      "\n"
    );

    // Test Case 5: Only vertical list (single horizontal node)
    console.log("Test 5: Only vertical list");
    const input5 = [[5, 10, 15, 20]];
    const list5 = create2DList(input5);
    const result5 = flatten(list5);
    const output5 = listToArray(result5);
    console.log("Input:", input5);
    console.log("Output:", output5);
    console.log("Expected: [5, 10, 15, 20]");
    console.log(
      "✅ Pass:",
      JSON.stringify(output5) === JSON.stringify([5, 10, 15, 20]),
      "\n"
    );

    // Test Case 6: Duplicate values
    console.log("Test 6: Duplicate values");
    const input6 = [
      [5, 5, 10],
      [5, 10],
      [10, 20],
    ];
    const list6 = create2DList(input6);
    const result6 = flatten(list6);
    const output6 = listToArray(result6);
    console.log("Input:", input6);
    console.log("Output:", output6);
    console.log("Expected: [5, 5, 5, 10, 10, 10, 20]");
    console.log(
      "✅ Pass:",
      JSON.stringify(output6) === JSON.stringify([5, 5, 5, 10, 10, 10, 20]),
      "\n"
    );

    // Test Case 7: Large numbers
    console.log("Test 7: Large numbers");
    const input7 = [
      [100, 200, 300],
      [150, 250],
      [175, 275, 375],
    ];
    const list7 = create2DList(input7);
    const result7 = flatten(list7);
    const output7 = listToArray(result7);
    console.log("Input:", input7);
    console.log("Output:", output7);
    console.log("Expected: [100, 150, 175, 200, 250, 275, 300, 375]");
    console.log(
      "✅ Pass:",
      JSON.stringify(output7) ===
        JSON.stringify([100, 150, 175, 200, 250, 275, 300, 375]),
      "\n"
    );

    // Test Case 8: Reverse sorted (testing sort works)
    console.log("Test 8: Values need sorting");
    const input8 = [[30, 40], [20, 25], [10, 15], [5]];
    const list8 = create2DList(input8);
    const result8 = flatten(list8);
    const output8 = listToArray(result8);
    console.log("Input:", input8);
    console.log("Output:", output8);
    console.log("Expected: [5, 10, 15, 20, 25, 30, 40]");
    console.log(
      "✅ Pass:",
      JSON.stringify(output8) === JSON.stringify([5, 10, 15, 20, 25, 30, 40]),
      "\n"
    );

    console.log("✨ All tests completed!");
  }
}

// Execute tests
FlattenLinkedListBruteForce.runTests();
