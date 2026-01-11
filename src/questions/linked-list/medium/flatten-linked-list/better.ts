namespace FlattenLinkedListBetter {
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
   * BETTER APPROACH - ITERATIVE MERGE
   * ==================================
   *
   * Intuition (Soch):
   * ----------------
   * Brute force mein humne sorted property ko ignore kar diya tha.
   * Lekin yahan ek KEY INSIGHT hai: Har vertical list ALREADY SORTED hai! 🎯
   *
   * Agar lists sorted hain, toh hum "Merge Two Sorted Lists" algorithm use kar sakte hain!
   *
   * Main Idea: 💡
   * Ek-ek karke sab vertical lists ko merge karte jao:
   * 1. First list + Second list = Merged Result
   * 2. Merged Result + Third list = New Merged Result
   * 3. New Merged Result + Fourth list = Final Result
   * ... and so on
   *
   * Yeh approach "Merge K Sorted Lists" problem ke similar hai!
   *
   * Key Insight:
   * -----------
   * Agar hum do sorted lists ko merge kar sakte hain O(n+m) mein,
   * toh saari lists ko ek-ek karke merge kar sakte hain!
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
   * Step 1: Merge first two vertical lists
   * ─────────────────────────────────────
   * List1: 5 → 7 → 8 → 30
   * List2: 10 → 20
   *
   * Merge process:
   *   Compare 5 vs 10: Pick 5
   *   Compare 7 vs 10: Pick 7
   *   Compare 8 vs 10: Pick 8
   *   Compare 30 vs 10: Pick 10
   *   Compare 30 vs 20: Pick 20
   *   Remaining: 30
   *
   * Result: 5 → 7 → 8 → 10 → 20 → 30
   *
   * Step 2: Merge result with third list
   * ─────────────────────────────────────
   * Current: 5 → 7 → 8 → 10 → 20 → 30
   * List3: 19 → 22
   *
   * Merge process:
   *   Compare 5 vs 19: Pick 5
   *   Compare 7 vs 19: Pick 7
   *   Compare 8 vs 19: Pick 8
   *   Compare 10 vs 19: Pick 10
   *   Compare 20 vs 19: Pick 19
   *   Compare 20 vs 22: Pick 20
   *   Compare 30 vs 22: Pick 22
   *   Remaining: 30
   *
   * Result: 5 → 7 → 8 → 10 → 19 → 20 → 22 → 30
   *
   * Step 3: Merge result with fourth list
   * ─────────────────────────────────────
   * Current: 5 → 7 → 8 → 10 → 19 → 20 → 22 → 30
   * List4: 28 → 40
   *
   * Merge process:
   *   Compare values and merge...
   *
   * Final Result: 5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40 ✅
   *
   * Algorithm:
   * ----------
   * 1. Handle edge case: if head is null, return null
   *
   * 2. Start with first vertical list as result
   *
   * 3. Traverse horizontally (using next pointer):
   *    - For each next horizontal node:
   *      a. Merge current result with this vertical list
   *      b. Update result to merged list
   *
   * 4. Helper function: mergeTwoLists(a, b)
   *    - Compare heads of both lists
   *    - Pick smaller one
   *    - Recursively merge rest
   *    - Connect using bottom pointers
   *
   * 5. Return final merged result
   *
   * Time Complexity: O(N * K)
   * Where N = total nodes, K = number of vertical lists
   *
   * Why O(N * K)?
   * - First merge: Process (N/K) + (N/K) = 2N/K nodes
   * - Second merge: Process (2N/K) + (N/K) = 3N/K nodes
   * - Third merge: Process (3N/K) + (N/K) = 4N/K nodes
   * - ...
   * - Last merge: Process ((K-1)N/K) + (N/K) = N nodes
   * - Total work: 2N/K + 3N/K + 4N/K + ... + N
   *              = (N/K) * (2 + 3 + 4 + ... + K)
   *              = (N/K) * K(K+1)/2
   *              = N * K/2
   *              = O(N * K)
   *
   * EXAMPLE: If N = 12 nodes, K = 3 lists:
   * - First merge: 4 + 4 = 8 operations
   * - Second merge: 8 + 4 = 12 operations
   * - Total: 20 operations ≈ O(12 * 3) = O(36)
   *
   * Space Complexity: O(1)
   * - Only using pointers for merging
   * - No extra arrays or data structures
   * - In-place merging using existing nodes ✅
   * - Much better than brute force!
   *
   * Why This is Better than Brute Force:
   * -------------------------------------
   * ✅ No extra space for storing values (O(1) vs O(N))
   * ✅ Utilizes the sorted property of lists
   * ✅ In-place merging - reuses existing nodes
   * ✅ More elegant solution
   * ❌ Still O(N * K) time (not optimal when K is large)
   * ❌ Repeated traversals of merged lists
   *
   * @param head - Head of the 2D linked list
   * @returns Head of flattened 1D sorted linked list
   */
  function flatten(head: Node | null): Node | null {
    // EDGE CASE: Empty list
    // WHY: Nothing to flatten
    if (head === null) {
      return null;
    }

    // EDGE CASE: Only one vertical list (no next pointer)
    // WHY: Already flattened, just return it
    if (head.next === null) {
      return head;
    }

    // STEP 1: Start with first vertical list as result
    // WHY: This will be our accumulator for merged lists
    let result: Node | null = head;

    // STEP 2: Move to next horizontal node
    // WHY: We'll merge each subsequent list with our result
    let current: Node | null = head.next;

    // STEP 3: Traverse all horizontal nodes
    // WHY: Need to merge all vertical lists
    while (current !== null) {
      // Save next horizontal node before merging
      // WHY: During merge, we'll lose the next pointer
      const nextHorizontal: Node | null = current.next;

      // CORE OPERATION: Merge current result with this vertical list
      // WHY: This is where the magic happens!
      // LOGIC: mergeTwoLists takes two sorted lists and returns merged sorted list
      result = mergeTwoLists(result, current);

      // Move to next horizontal node
      current = nextHorizontal;
    }

    // STEP 4: Return the final merged result
    // WHY: This contains all nodes in sorted order
    return result;
  }

  /**
   * Helper function to merge two sorted linked lists
   * Uses bottom pointers for connections
   *
   * Intuition:
   * ---------
   * Classic "Merge Two Sorted Lists" problem!
   * Compare heads, pick smaller, recursively merge rest.
   *
   * Visual:
   * -------
   * a: 5 → 7 → 10
   * b: 3 → 8 → 12
   *
   * Step 1: Compare 5 vs 3 → Pick 3
   *   3 → merge(5→7→10, 8→12)
   *
   * Step 2: Compare 5 vs 8 → Pick 5
   *   3 → 5 → merge(7→10, 8→12)
   *
   * Step 3: Compare 7 vs 8 → Pick 7
   *   3 → 5 → 7 → merge(10, 8→12)
   *
   * ... and so on
   *
   * Result: 3 → 5 → 7 → 8 → 10 → 12
   *
   * @param a - First sorted list
   * @param b - Second sorted list
   * @returns Merged sorted list
   */
  function mergeTwoLists(a: Node | null, b: Node | null): Node | null {
    // BASE CASE 1: If first list is empty
    // WHY: Return second list (remaining sorted portion)
    if (a === null) {
      return b;
    }

    // BASE CASE 2: If second list is empty
    // WHY: Return first list (remaining sorted portion)
    if (b === null) {
      return a;
    }

    // RECURSIVE CASE: Compare data values
    let result: Node | null = null;

    if (a.data < b.data) {
      // LOGIC: a's value is smaller, so a becomes head
      // WHY: We want sorted order, smaller comes first
      result = a;

      // Recursively merge a's remaining list with b
      // WHY: Need to merge rest of both lists
      // EXAMPLE: If a = [5, 10] and b = [7, 12]
      //          Pick 5, then merge [10] with [7, 12]
      result.bottom = mergeTwoLists(a.bottom, b);
    } else {
      // LOGIC: b's value is smaller or equal, so b becomes head
      // WHY: We want sorted order, smaller comes first
      result = b;

      // Recursively merge a with b's remaining list
      // WHY: Need to merge rest of both lists
      // EXAMPLE: If a = [10] and b = [5, 12]
      //          Pick 5, then merge [10] with [12]
      result.bottom = mergeTwoLists(a, b.bottom);
    }

    // IMPORTANT: Set next pointer to null
    // WHY: Result should be single vertical chain (no horizontal branching)
    result.next = null;

    return result;
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
   * Lists to merge:
   *   List1: 5 → 7 → 8 → 30
   *   List2: 10 → 20
   *   List3: 19 → 22
   *   List4: 28 → 40
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 1: Merge List1 with List2
   * ═════════════════════════════════════════════════════════════════
   *
   * Before:
   *   result = Node(5) → 7 → 8 → 30
   *   current = Node(10) → 20
   *
   * Merge Process: mergeTwoLists(5→7→8→30, 10→20)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Step 1: Compare 5 vs 10
   *     → 5 < 10, pick 5
   *     → 5.bottom = mergeTwoLists(7→8→30, 10→20)
   *
   *   Step 2: Compare 7 vs 10
   *     → 7 < 10, pick 7
   *     → 7.bottom = mergeTwoLists(8→30, 10→20)
   *
   *   Step 3: Compare 8 vs 10
   *     → 8 < 10, pick 8
   *     → 8.bottom = mergeTwoLists(30, 10→20)
   *
   *   Step 4: Compare 30 vs 10
   *     → 10 < 30, pick 10
   *     → 10.bottom = mergeTwoLists(30, 20)
   *
   *   Step 5: Compare 30 vs 20
   *     → 20 < 30, pick 20
   *     → 20.bottom = mergeTwoLists(30, null)
   *
   *   Step 6: mergeTwoLists(30, null)
   *     → Return 30
   *
   * After Iteration 1:
   *   result = 5 → 7 → 8 → 10 → 20 → 30
   *   current = Node(19)
   *
   * ┌──────────────────────────────────────────────┐
   * │ Merged List After Iteration 1:               │
   * │ 5 → 7 → 8 → 10 → 20 → 30                     │
   * └──────────────────────────────────────────────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 2: Merge Result with List3
   * ═════════════════════════════════════════════════════════════════
   *
   * Before:
   *   result = 5 → 7 → 8 → 10 → 20 → 30
   *   current = Node(19) → 22
   *
   * Merge Process: mergeTwoLists(5→7→8→10→20→30, 19→22)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Step 1: Compare 5 vs 19 → Pick 5
   *   Step 2: Compare 7 vs 19 → Pick 7
   *   Step 3: Compare 8 vs 19 → Pick 8
   *   Step 4: Compare 10 vs 19 → Pick 10
   *   Step 5: Compare 20 vs 19 → Pick 19
   *   Step 6: Compare 20 vs 22 → Pick 20
   *   Step 7: Compare 30 vs 22 → Pick 22
   *   Step 8: Compare 30 vs null → Pick 30
   *
   * After Iteration 2:
   *   result = 5 → 7 → 8 → 10 → 19 → 20 → 22 → 30
   *   current = Node(28)
   *
   * ┌──────────────────────────────────────────────┐
   * │ Merged List After Iteration 2:               │
   * │ 5 → 7 → 8 → 10 → 19 → 20 → 22 → 30           │
   * └──────────────────────────────────────────────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * ITERATION 3: Merge Result with List4
   * ═════════════════════════════════════════════════════════════════
   *
   * Before:
   *   result = 5 → 7 → 8 → 10 → 19 → 20 → 22 → 30
   *   current = Node(28) → 40
   *
   * Merge Process: mergeTwoLists(5→7→...→30, 28→40)
   * ─────────────────────────────────────────────────────────────────
   *
   *   Step 1-6: Compare and pick 5, 7, 8, 10, 19, 20
   *   Step 7: Compare 22 vs 28 → Pick 22
   *   Step 8: Compare 30 vs 28 → Pick 28
   *   Step 9: Compare 30 vs 40 → Pick 30
   *   Step 10: Compare null vs 40 → Pick 40
   *
   * After Iteration 3:
   *   result = 5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40
   *   current = null (no more horizontal nodes)
   *
   * ┌──────────────────────────────────────────────┐
   * │ Final Merged List:                           │
   * │ 5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40 │
   * └──────────────────────────────────────────────┘
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: Node(5) → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40 → null
   *
   * ✅ Successfully flattened and sorted!
   * ✅ All connections via bottom pointers
   * ✅ No extra space used (in-place merging)
   *
   * ═════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS WITH EXAMPLE
   * ═════════════════════════════════════════════════════════════════
   *
   * Total nodes: N = 10
   * Number of lists: K = 4
   *
   * Work done in each iteration:
   * - Iteration 1: Process 4 + 2 = 6 nodes
   * - Iteration 2: Process 6 + 2 = 8 nodes
   * - Iteration 3: Process 8 + 2 = 10 nodes
   * - Total: 6 + 8 + 10 = 24 operations
   *
   * Expected: O(N * K) = O(10 * 4) = O(40) ≈ 24 operations ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * EDGE CASES HANDLED
   * ═════════════════════════════════════════════════════════════════
   *
   * 1. Empty List (head = null):
   *    - Return null immediately
   *
   * 2. Single Vertical List (head.next = null):
   *    - Return head (already flattened)
   *
   * 3. Lists of Different Lengths:
   *    - mergeTwoLists handles null gracefully
   *    - Remaining nodes appended automatically
   *
   * 4. Duplicate Values:
   *    - Merge maintains all duplicates
   *    - Stable merge (equal values maintain relative order)
   *
   * 5. Already Sorted Lists:
   *    - Merge correctly handles pre-sorted input
   *    - Maintains sorted property
   */

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper function to create a 2D linked list from array representation
   * Used for testing
   */
  function create2DList(arr: number[][]): Node | null {
    if (arr.length === 0) return null;

    let head: Node | null = null;
    let prevHorizontal: Node | null = null;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length === 0) continue;

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
   */
  function listToArray(head: Node | null): number[] {
    const result: number[] = [];
    let current = head;

    while (current !== null) {
      result.push(current.data);
      current = current.bottom;
    }

    return result;
  }

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log("🧪 Testing Flatten Linked List - BETTER (ITERATIVE MERGE)\n");

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

    // Test Case 4: Only horizontal list
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

    // Test Case 5: Only vertical list
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

    // Test Case 8: Two lists only
    console.log("Test 8: Two lists (minimal merge)");
    const input8 = [[5, 10, 15], [3, 12, 20]];
    const list8 = create2DList(input8);
    const result8 = flatten(list8);
    const output8 = listToArray(result8);
    console.log("Input:", input8);
    console.log("Output:", output8);
    console.log("Expected: [3, 5, 10, 12, 15, 20]");
    console.log(
      "✅ Pass:",
      JSON.stringify(output8) === JSON.stringify([3, 5, 10, 12, 15, 20]),
      "\n"
    );

    console.log("✨ All tests completed!");
    console.log("\n📊 Complexity Summary:");
    console.log("Time: O(N * K) - where N = total nodes, K = number of lists");
    console.log("Space: O(1) - in-place merging, no extra space!");
  }
}

// Execute tests
FlattenLinkedListBetter.runTests();
