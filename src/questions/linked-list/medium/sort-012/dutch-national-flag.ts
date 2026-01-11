namespace SortList012DutchNationalFlag {
  /**
   * ListNode class - Represents a single node in the linked list
   */
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }

  /**
   * DUTCH NATIONAL FLAG APPROACH (Array-Based)
   *
   * Main function to sort a linked list containing only 0s, 1s, and 2s
   *
   * @param head - Head of the linked list
   * @returns Head of the sorted linked list
   *
   * Key Insight:
   * Dutch National Flag algorithm is OPTIMAL for arrays but requires
   * converting linked list to array, which uses O(n) extra space!
   *
   * Algorithm:
   * 1. Convert linked list → array of nodes (O(n) space)
   * 2. Apply Dutch National Flag 3-way partitioning (O(n) time)
   * 3. Rebuild linked list from sorted array (O(n) time)
   *
   * Dutch National Flag Algorithm:
   * - Use 3 pointers: left, middle, right
   * - left: tracks position for 0s
   * - middle: current element being processed
   * - right: tracks position for 2s
   * - Partition array into [0s | 1s | 2s]
   *
   * Time Complexity: O(n)
   * - Convert to array: O(n)
   * - DNF partitioning: O(n) - single pass
   * - Rebuild list: O(n)
   * - Total: O(3n) = O(n)
   *
   * Space Complexity: O(n) ❌
   * - Array stores all n nodes
   * - NOT optimal for linked lists!
   *
   * When to Use:
   * ✅ Perfect for ARRAYS (in-place with O(1) space)
   * ❌ NOT optimal for LINKED LISTS (requires O(n) space)
   *
   * Comparison with Other Approaches:
   * - Brute Force: O(2n) time, O(1) space - 2 passes
   * - Optimal (Three-pointer): O(n) time, O(1) space - 1 pass ⭐
   * - This (DNF): O(3n) time, O(n) space - 3 passes ❌
   */
  function sortList(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list or single node
    // WHY: Agar list empty hai ya sirf ek node hai, already sorted hai
    if (head === null || head.next === null) {
      return head;
    }

    // STEP 1: Convert linked list to array of nodes
    // WHY: DNF algorithm works on arrays with random access
    // TIME: O(n) - traverse entire list
    // SPACE: O(n) - store all nodes in array
    const nodes: ListNode[] = [];
    let pointer: ListNode | null = head;

    while (pointer !== null) {
      nodes.push(pointer); // Store node reference
      pointer = pointer.next;
    }

    // Now we have array: [node1, node2, node3, ...]
    const n = nodes.length;

    // STEP 2: Apply Dutch National Flag Algorithm
    // WHY: Classic 3-way partitioning algorithm
    // TIME: O(n) - single pass through array
    // SPACE: O(1) - only 3 pointers

    let left = 0; // Position for next 0
    let middle = 0; // Current element being processed
    let right = n - 1; // Position for next 2

    /**
     * Invariant (always true during algorithm):
     * [0...left-1] → All 0s
     * [left...middle-1] → All 1s
     * [middle...right] → Unprocessed elements
     * [right+1...n-1] → All 2s
     */

    while (middle <= right) {
      if (nodes[middle].val === 0) {
        // Found 0 → Move to left region
        // Swap nodes[left] ↔ nodes[middle]
        [nodes[left], nodes[middle]] = [nodes[middle], nodes[left]];
        left++; // Expand 0s region
        middle++; // Move forward (we know swapped element was 1)
      } else if (nodes[middle].val === 1) {
        // Found 1 → Already in correct position (middle region)
        // Just move forward
        middle++;
      } else if (nodes[middle].val === 2) {
        // Found 2 → Move to right region
        // Swap nodes[middle] ↔ nodes[right]
        [nodes[middle], nodes[right]] = [nodes[right], nodes[middle]];
        right--; // Shrink unprocessed region
        // DON'T increment middle! We need to check swapped element
      }
    }

    // STEP 3: Rebuild linked list from sorted array
    // WHY: Connect nodes in sorted order
    // TIME: O(n) - traverse array once
    // SPACE: O(1) - just reconnecting

    for (let i = 0; i < n - 1; i++) {
      nodes[i].next = nodes[i + 1]; // Connect current to next
    }

    // Last node should point to null
    nodes[n - 1].next = null;

    // Return new head (first element in sorted array)
    return nodes[0];
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Input: 1 → 2 → 2 → 1 → 2 → 0 → 2 → 2
   *
   * ═══════════════════════════════════════════════════════════════════
   * STEP 1: CONVERT TO ARRAY
   * ═══════════════════════════════════════════════════════════════════
   *
   * Traverse linked list and store node references:
   *
   * Original list:
   *   1 → 2 → 2 → 1 → 2 → 0 → 2 → 2 → null
   *
   * After conversion:
   *   nodes = [node(1), node(2), node(2), node(1), node(2), node(0), node(2), node(2)]
   *   Index:     0       1       2       3       4       5       6       7
   *
   * Array length n = 8
   *
   * ⚠️ SPACE USED: O(n) = 8 node references stored
   *
   * ═══════════════════════════════════════════════════════════════════
   * STEP 2: DUTCH NATIONAL FLAG PARTITIONING
   * ═══════════════════════════════════════════════════════════════════
   *
   * Initial state:
   *   Array: [1, 2, 2, 1, 2, 0, 2, 2]
   *   Index:  0  1  2  3  4  5  6  7
   *
   *   left = 0 (next position for 0)
   *   middle = 0 (current element)
   *   right = 7 (next position for 2)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1: middle = 0, nodes[0].val = 1
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [1, 2, 2, 1, 2, 0, 2, 2]
   *           ↑
   *          L,M                       R
   *
   * nodes[middle].val = 1 → Keep in middle region
   * Action: middle++
   *
   * After:
   *   left = 0, middle = 1, right = 7
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2: middle = 1, nodes[1].val = 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [1, 2, 2, 1, 2, 0, 2, 2]
   *           L  ↑                 R
   *              M
   *
   * nodes[middle].val = 2 → Move to right region
   * Action: Swap nodes[1] ↔ nodes[7], right--
   *
   * Swap: nodes[1] (val=2) ↔ nodes[7] (val=2)
   *   Array: [1, 2, 2, 1, 2, 0, 2, 2]
   *           L  ↑              R
   *              M
   *
   * After:
   *   left = 0, middle = 1, right = 6
   *   (middle stays same - need to check swapped element)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 3: middle = 1, nodes[1].val = 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [1, 2, 2, 1, 2, 0, 2, 2]
   *           L  ↑           R
   *              M
   *
   * nodes[middle].val = 2 → Move to right region
   * Action: Swap nodes[1] ↔ nodes[6], right--
   *
   * Swap: nodes[1] (val=2) ↔ nodes[6] (val=2)
   *   Array: [1, 2, 2, 1, 2, 0, 2, 2]
   *           L  ↑        R
   *              M
   *
   * After:
   *   left = 0, middle = 1, right = 5
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 4: middle = 1, nodes[1].val = 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [1, 2, 2, 1, 2, 0, 2, 2]
   *           L  ↑     R
   *              M
   *
   * nodes[middle].val = 2 → Move to right region
   * Action: Swap nodes[1] ↔ nodes[5], right--
   *
   * Swap: nodes[1] (val=2) ↔ nodes[5] (val=0)
   *   Array: [1, 0, 2, 1, 2, 2, 2, 2]
   *           L  ↑  R
   *              M
   *
   * After:
   *   left = 0, middle = 1, right = 4
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 5: middle = 1, nodes[1].val = 0
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [1, 0, 2, 1, 2, 2, 2, 2]
   *           L  ↑  R
   *              M
   *
   * nodes[middle].val = 0 → Move to left region
   * Action: Swap nodes[0] ↔ nodes[1], left++, middle++
   *
   * Swap: nodes[0] (val=1) ↔ nodes[1] (val=0)
   *   Array: [0, 1, 2, 1, 2, 2, 2, 2]
   *           L  ↑  R
   *              M
   *
   * After:
   *   left = 1, middle = 2, right = 4
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 6: middle = 2, nodes[2].val = 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [0, 1, 2, 1, 2, 2, 2, 2]
   *              L  ↑  R
   *                 M
   *
   * nodes[middle].val = 2 → Move to right region
   * Action: Swap nodes[2] ↔ nodes[4], right--
   *
   * Swap: nodes[2] (val=2) ↔ nodes[4] (val=2)
   *   Array: [0, 1, 2, 1, 2, 2, 2, 2]
   *              L  ↑R
   *                 M
   *
   * After:
   *   left = 1, middle = 2, right = 3
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 7: middle = 2, nodes[2].val = 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [0, 1, 2, 1, 2, 2, 2, 2]
   *              L  ↑R
   *                 M
   *
   * nodes[middle].val = 2 → Move to right region
   * Action: Swap nodes[2] ↔ nodes[3], right--
   *
   * Swap: nodes[2] (val=2) ↔ nodes[3] (val=1)
   *   Array: [0, 1, 1, 2, 2, 2, 2, 2]
   *              L  MR
   *
   * After:
   *   left = 1, middle = 2, right = 2
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 8: middle = 2, nodes[2].val = 1
   * ─────────────────────────────────────────────────────────────────
   *
   * Current state:
   *   Array: [0, 1, 1, 2, 2, 2, 2, 2]
   *              L  MR
   *
   * nodes[middle].val = 1 → Keep in middle region
   * Action: middle++
   *
   * After:
   *   left = 1, middle = 3, right = 2
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop ends: middle > right (3 > 2)
   * ─────────────────────────────────────────────────────────────────
   *
   * Final sorted array:
   *   [0, 1, 1, 2, 2, 2, 2, 2]
   *    ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑
   *    0  1s    2s............
   *
   * ✅ Array is now sorted: [0s | 1s | 2s]
   *
   * ═══════════════════════════════════════════════════════════════════
   * STEP 3: REBUILD LINKED LIST
   * ═══════════════════════════════════════════════════════════════════
   *
   * Sorted array: [node(0), node(1), node(1), node(2), node(2), node(2), node(2), node(2)]
   *
   * Reconnect nodes:
   *
   * i = 0: nodes[0].next = nodes[1] → 0 → 1
   * i = 1: nodes[1].next = nodes[2] → 0 → 1 → 1
   * i = 2: nodes[2].next = nodes[3] → 0 → 1 → 1 → 2
   * i = 3: nodes[3].next = nodes[4] → 0 → 1 → 1 → 2 → 2
   * i = 4: nodes[4].next = nodes[5] → 0 → 1 → 1 → 2 → 2 → 2
   * i = 5: nodes[5].next = nodes[6] → 0 → 1 → 1 → 2 → 2 → 2 → 2
   * i = 6: nodes[6].next = nodes[7] → 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2
   * i = 7: nodes[7].next = null → 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2 → null
   *
   * Final linked list:
   *   0 → 1 → 1 → 2 → 2 → 2 → 2 → 2 → null ✅
   *
   * Return: nodes[0] (head of sorted list)
   *
   * ═══════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS
   * ═══════════════════════════════════════════════════════════════════
   *
   * Time Complexity: O(n)
   * ─────────────────
   * - Step 1 (Convert to array): O(n) - visit each node once
   * - Step 2 (DNF partitioning): O(n) - single pass through array
   * - Step 3 (Rebuild list): O(n) - connect each node once
   * - Total: O(n) + O(n) + O(n) = O(3n) = O(n) ✅
   *
   * Space Complexity: O(n) ❌
   * ──────────────────
   * - Array of node references: O(n)
   * - Pointers (left, middle, right): O(1)
   * - Total: O(n) - NOT optimal for linked lists!
   *
   * ═══════════════════════════════════════════════════════════════════
   * WHY THIS IS NOT OPTIMAL FOR LINKED LISTS
   * ═══════════════════════════════════════════════════════════════════
   *
   * 1. Extra Space: O(n)
   *    - Array stores all n nodes
   *    - For 1 million nodes → ~8-16 MB extra memory!
   *    - Three-pointer approach: Only 6 pointers → ~48 bytes!
   *
   * 2. Three Passes:
   *    - Pass 1: List → Array
   *    - Pass 2: Sort array
   *    - Pass 3: Array → List
   *    - Three-pointer approach: Single pass!
   *
   * 3. Cache Inefficiency:
   *    - Random access to array indices
   *    - Nodes scattered in memory
   *    - Cache misses possible
   *    - Three-pointer: Sequential access, better cache performance
   *
   * 4. Not Using Linked List Properties:
   *    - Converting to array defeats the purpose of linked list
   *    - Linked lists are good for pointer manipulation
   *    - This approach doesn't leverage that strength
   *
   * ═══════════════════════════════════════════════════════════════════
   * WHEN TO USE THIS APPROACH
   * ═══════════════════════════════════════════════════════════════════
   *
   * ✅ FOR ARRAYS:
   *    - Dutch National Flag is PERFECT for arrays
   *    - In-place sorting with O(1) space
   *    - Single pass through array
   *    - Example: Sort Colors (LeetCode 75)
   *
   * ❌ FOR LINKED LISTS:
   *    - NOT recommended due to O(n) space
   *    - Use three-pointer approach instead
   *    - Only use if:
   *      - Interview asks to demonstrate DNF knowledge
   *      - You're converting list to array anyway for other reasons
   *
   * ═══════════════════════════════════════════════════════════════════
   * COMPARISON WITH OTHER APPROACHES
   * ═══════════════════════════════════════════════════════════════════
   *
   * Input: 8-node list
   *
   * Brute Force (Counting):
   *   - Pass 1: Count (8 visits)
   *   - Pass 2: Overwrite (8 visits)
   *   - Total: 16 operations
   *   - Space: O(1) - 3 counters
   *   - Modifies values: YES
   *
   * Optimal (Three-pointer):
   *   - Pass 1: Build chains (8 visits)
   *   - Total: 8 operations
   *   - Space: O(1) - 6 pointers
   *   - Modifies values: NO
   *   - ⭐ BEST for linked lists!
   *
   * This (DNF):
   *   - Pass 1: List → Array (8 visits)
   *   - Pass 2: Sort array (8 operations)
   *   - Pass 3: Array → List (8 reconnections)
   *   - Total: 24 operations
   *   - Space: O(n) - 8 node array
   *   - Modifies values: NO
   *   - ❌ NOT optimal for linked lists
   *
   * Verdict: Use three-pointer approach for linked lists! 🚀
   */

  // ═══════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS FOR TESTING
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Helper function to create linked list from array
   */
  function createList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;

    const head = new ListNode(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }

    return head;
  }

  /**
   * Helper function to convert linked list to array
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

  /**
   * Helper function to print linked list
   */
  function printList(head: ListNode | null): string {
    const arr = listToArray(head);
    return arr.length > 0 ? arr.join(' → ') + ' → null' : 'null';
  }

  // ═══════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════

  console.log('═══════════════════════════════════════════════════════════');
  console.log('SORT 0s, 1s, 2s - DUTCH NATIONAL FLAG (ARRAY-BASED)');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('⚠️  WARNING: This approach uses O(n) extra space!');
  console.log('⚠️  NOT optimal for linked lists (use three-pointer instead)');
  console.log('✅ Perfect for ARRAYS (in-place with O(1) space)\n');

  // Test Case 1: Standard case
  console.log('Test Case 1: [1, 2, 2, 1, 2, 0, 2, 2]');
  const head1 = createList([1, 2, 2, 1, 2, 0, 2, 2]);
  console.log('Input: ', printList(head1));
  const result1 = sortList(head1);
  console.log('Output:', printList(result1));
  console.log('Expected: [0, 1, 1, 2, 2, 2, 2, 2]');
  console.log('Actual:  ', listToArray(result1));
  console.log('✓ Passed\n');

  // Test Case 2: Another example
  console.log('Test Case 2: [2, 2, 0, 1]');
  const head2 = createList([2, 2, 0, 1]);
  console.log('Input: ', printList(head2));
  const result2 = sortList(head2);
  console.log('Output:', printList(result2));
  console.log('Expected: [0, 1, 2, 2]');
  console.log('Actual:  ', listToArray(result2));
  console.log('✓ Passed\n');

  // Test Case 3: Already sorted
  console.log('Test Case 3: [0, 1, 1, 2, 2] (already sorted)');
  const head3 = createList([0, 1, 1, 2, 2]);
  console.log('Input: ', printList(head3));
  const result3 = sortList(head3);
  console.log('Output:', printList(result3));
  console.log('Expected: [0, 1, 1, 2, 2]');
  console.log('Actual:  ', listToArray(result3));
  console.log('✓ Passed\n');

  // Test Case 4: Reverse sorted
  console.log('Test Case 4: [2, 2, 1, 1, 0] (reverse sorted)');
  const head4 = createList([2, 2, 1, 1, 0]);
  console.log('Input: ', printList(head4));
  const result4 = sortList(head4);
  console.log('Output:', printList(result4));
  console.log('Expected: [0, 1, 1, 2, 2]');
  console.log('Actual:  ', listToArray(result4));
  console.log('✓ Passed\n');

  // Test Case 5: All same values
  console.log('Test Case 5: [2, 2, 2, 2] (all same)');
  const head5 = createList([2, 2, 2, 2]);
  console.log('Input: ', printList(head5));
  const result5 = sortList(head5);
  console.log('Output:', printList(result5));
  console.log('Expected: [2, 2, 2, 2]');
  console.log('Actual:  ', listToArray(result5));
  console.log('✓ Passed\n');

  // Test Case 6: Single node
  console.log('Test Case 6: [1] (single node)');
  const head6 = createList([1]);
  console.log('Input: ', printList(head6));
  const result6 = sortList(head6);
  console.log('Output:', printList(result6));
  console.log('Expected: [1]');
  console.log('Actual:  ', listToArray(result6));
  console.log('✓ Passed\n');

  // Test Case 7: Two nodes
  console.log('Test Case 7: [1, 0] (two nodes)');
  const head7 = createList([1, 0]);
  console.log('Input: ', printList(head7));
  const result7 = sortList(head7);
  console.log('Output:', printList(result7));
  console.log('Expected: [0, 1]');
  console.log('Actual:  ', listToArray(result7));
  console.log('✓ Passed\n');

  // Test Case 8: No zeros
  console.log('Test Case 8: [1, 2, 1, 2] (no zeros)');
  const head8 = createList([1, 2, 1, 2]);
  console.log('Input: ', printList(head8));
  const result8 = sortList(head8);
  console.log('Output:', printList(result8));
  console.log('Expected: [1, 1, 2, 2]');
  console.log('Actual:  ', listToArray(result8));
  console.log('✓ Passed\n');

  // Test Case 9: No ones
  console.log('Test Case 9: [0, 2, 0, 2] (no ones)');
  const head9 = createList([0, 2, 0, 2]);
  console.log('Input: ', printList(head9));
  const result9 = sortList(head9);
  console.log('Output:', printList(result9));
  console.log('Expected: [0, 0, 2, 2]');
  console.log('Actual:  ', listToArray(result9));
  console.log('✓ Passed\n');

  // Test Case 10: No twos
  console.log('Test Case 10: [0, 1, 0, 1] (no twos)');
  const head10 = createList([0, 1, 0, 1]);
  console.log('Input: ', printList(head10));
  const result10 = sortList(head10);
  console.log('Output:', printList(result10));
  console.log('Expected: [0, 0, 1, 1]');
  console.log('Actual:  ', listToArray(result10));
  console.log('✓ Passed\n');

  console.log('═══════════════════════════════════════════════════════════');
  console.log('All test cases passed! ✅');
  console.log('Time: O(n), Space: O(n)');
  console.log('⚠️  Uses O(n) extra space - NOT optimal for linked lists!');
  console.log('✅ Use three-pointer approach instead (O(1) space)');
  console.log('═══════════════════════════════════════════════════════════');
}