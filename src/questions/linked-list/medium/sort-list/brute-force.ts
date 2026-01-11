/**
 * Sort List - Brute Force Approach (Array Use Karke)
 *
 * Problem: Linked list ko ascending order mein sort karna hai
 *
 * Approach: Array mein values daal ke sort karo, phir naya list banao
 * - Step 1: List traverse karke values array mein store karo
 * - Step 2: Array ko built-in sort function se sort karo
 * - Step 3: Sorted array se naya linked list construct karo
 *
 * Time Complexity: O(n log n)
 * - List traverse: O(n)
 * - Array sort: O(n log n)
 * - New list build: O(n)
 * - Total: O(n log n) ✅
 *
 * Space Complexity: O(n)
 * - Array storage: O(n)
 * - Follow-up constraint violate! ❌
 *
 * Where n = number of nodes in linked list
 *
 * ✅ Simple and easy to understand
 * ❌ Uses extra O(n) space
 * ❌ Doesn't satisfy follow-up question
 */

namespace SortListBruteForce {
  /**
   * ListNode class definition
   * Ye basic linked list node hai jo value aur next pointer store karta hai
   */
  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Sort the linked list using array
   *
   * Intuition:
   * - Linked list mein direct sorting mushkil hai (no random access)
   * - Array mein sorting easy hai (built-in functions available)
   * - Strategy: List → Array → Sort → New List
   *
   * @param head - Linked list ka head node
   * @returns Sorted linked list ka head
   */
  function sortList(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list ya single node
    // WHY: Agar koi node nahi ya ek hi node hai, toh already sorted hai!
    if (head === null || head.next === null) {
      return head;
    }

    // ═════════════════════════════════════════════════════════════
    // STEP 1: Linked list ki values ko array mein store karo
    // ═════════════════════════════════════════════════════════════

    // Array banao values store karne ke liye
    const values: number[] = [];

    // Current pointer se list traverse karo
    // WHY: Har node ki value array mein daalte jaao
    let current: ListNode | null = head;

    while (current !== null) {
      // Current node ki value array mein push karo
      // EXAMPLE: Agar current.val = 4 hai, toh values = [4]
      values.push(current.val);

      // Next node pe move karo
      current = current.next;
    }

    // DEBUG: Ab values array mein saari unsorted values hain
    // EXAMPLE: Input [4→2→1→3] ke liye values = [4, 2, 1, 3]

    // ═════════════════════════════════════════════════════════════
    // STEP 2: Array ko sort karo
    // ═════════════════════════════════════════════════════════════

    // Built-in sort function use karo
    // WHY: JavaScript ka sort by default string comparison karta hai
    // CRITICAL: Numbers ke liye custom comparator chahiye!
    values.sort((a, b) => a - b);

    // LOGIC: (a - b) comparison:
    // - If a < b: negative (a pehle aayega) → ascending order
    // - If a > b: positive (b pehle aayega)
    // - If a === b: zero (order same rahega)

    // DEBUG: Ab values sorted hain
    // EXAMPLE: values = [1, 2, 3, 4]

    // ═════════════════════════════════════════════════════════════
    // STEP 3: Sorted array se naya linked list banao
    // ═════════════════════════════════════════════════════════════

    // Dummy node banao (helper node for easy list construction)
    // WHY: Dummy node se list banane mein edge cases handle karne easy hota hai
    const dummy = new ListNode(0);

    // Current pointer dummy se start karo
    // WHY: Ye pointer naye nodes add karne ke liye use hoga
    current = dummy;

    // Sorted array ko traverse karo
    // LOGIC: Har value ke liye naya node banao aur list mein add karo
    for (let i = 0; i < values.length; i++) {
      // Naya node banao current value ke saath
      // EXAMPLE: Agar values[i] = 1 hai, toh node(1) banega
      const newNode = new ListNode(values[i]);

      // Current ke next mein naya node attach karo
      current.next = newNode;

      // Current ko aage move karo (naye node pe)
      // WHY: Taaki next iteration mein waha se continue kar sake
      current = current.next;
    }

    // DEBUG: Ab dummy.next se puri sorted list ready hai
    // EXAMPLE: dummy → 1 → 2 → 3 → 4 → null

    // ═════════════════════════════════════════════════════════════
    // STEP 4: Return sorted list (dummy ko skip karke)
    // ═════════════════════════════════════════════════════════════

    // Dummy node skip karo aur actual sorted list return karo
    // WHY: Dummy toh sirf helper tha, actual list dummy.next se start hoti hai
    return dummy.next;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE STEP-BY-STEP EXECUTION
   * ════════════════════════════════════════════════════════════════
   *
   * Example Input: 4 → 2 → 1 → 3 → null
   *
   * Initial State:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 4 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │ ●──┼──→│ 3 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: Array Mein Values Store Karo
   * ═════════════════════════════════════════════════════════════════
   *
   * Initialize: values = [], current = head (node 4)
   *
   * Iteration Table:
   * | Iteration | current | current.val | Action           | values Array |
   * |-----------|---------|-------------|------------------|--------------|
   * | Initial   | node(4) | 4           | -                | []           |
   * | 1         | node(4) | 4           | Push 4           | [4]          |
   * | -         | node(2) | -           | Move to next     | [4]          |
   * | 2         | node(2) | 2           | Push 2           | [4, 2]       |
   * | -         | node(1) | -           | Move to next     | [4, 2]       |
   * | 3         | node(1) | 1           | Push 1           | [4, 2, 1]    |
   * | -         | node(3) | -           | Move to next     | [4, 2, 1]    |
   * | 4         | node(3) | 3           | Push 3           | [4, 2, 1, 3] |
   * | -         | null    | -           | Exit loop        | [4, 2, 1, 3] |
   *
   * Result After Phase 1:
   * values = [4, 2, 1, 3] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: Array Ko Sort Karo
   * ═════════════════════════════════════════════════════════════════
   *
   * Before Sort: [4, 2, 1, 3]
   *
   * Sort Process (using built-in sort with comparator):
   * values.sort((a, b) => a - b)
   *
   * Internal Sorting Steps:
   * | Step | Comparison | a-b | Action              | Array State  |
   * |------|------------|-----|---------------------|--------------|
   * | 1    | 4 vs 2     | 2   | 2 comes first       | [2, 4, 1, 3] |
   * | 2    | 4 vs 1     | 3   | 1 comes first       | [2, 1, 4, 3] |
   * | 3    | 2 vs 1     | 1   | 1 comes first       | [1, 2, 4, 3] |
   * | 4    | 4 vs 3     | 1   | 3 comes first       | [1, 2, 3, 4] |
   * | 5    | 2 vs 3     | -1  | Order correct       | [1, 2, 3, 4] |
   *
   * Result After Phase 2:
   * values = [1, 2, 3, 4] ✅ (Sorted!)
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 3: Naya Linked List Banao
   * ═════════════════════════════════════════════════════════════════
   *
   * Initialize:
   * - dummy = node(0)
   * - current = dummy
   * - Loop through sorted array
   *
   * List Construction Table:
   * | i | values[i] | New Node | Current Position | List State            |
   * |---|-----------|----------|------------------|-----------------------|
   * | 0 | 1         | node(1)  | dummy            | dummy → 1             |
   * | - | -         | -        | node(1)          | dummy → 1             |
   * | 1 | 2         | node(2)  | node(1)          | dummy → 1 → 2         |
   * | - | -         | -        | node(2)          | dummy → 1 → 2         |
   * | 2 | 3         | node(3)  | node(2)          | dummy → 1 → 2 → 3     |
   * | - | -         | -        | node(3)          | dummy → 1 → 2 → 3     |
   * | 3 | 4         | node(4)  | node(3)          | dummy → 1 → 2 → 3 → 4 |
   * | - | -         | -        | node(4)          | Final list complete!  |
   *
   * Visual Representation After Each Step:
   *
   * Step 0 (i=0, value=1):
   * ┌─────┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │null│
   * │  0  │    │   └───┴────┘
   * └─────┴────┘      ↑
   *                current
   *
   * Step 1 (i=1, value=2):
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘
   *                                  ↑
   *                               current
   *
   * Step 2 (i=2, value=3):
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                                ↑
   *                                             current
   *
   * Step 3 (i=3, value=4):
   * ┌─────┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │dummy│ ●──┼──→│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │null│
   * └─────┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                                                              ↑
   *                                                           current
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 4: Return Result
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: dummy.next
   *
   * Final Sorted List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *  returned (dummy.next)
   *
   * Output: 1 → 2 → 3 → 4 ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASES HANDLED
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * EDGE CASE 1: Empty List
   * Input: null
   *
   * Check: if (head === null)
   * Action: Return null immediately
   * Output: null ✅
   *
   * WHY: Empty list already sorted hai!
   */

  /**
   * EDGE CASE 2: Single Node
   * Input: 5 → null
   *
   * Check: if (head.next === null)
   * Action: Return head as-is
   * Output: 5 → null ✅
   *
   * WHY: Ek node already sorted hai!
   */

  /**
   * EDGE CASE 3: Already Sorted
   * Input: 1 → 2 → 3 → 4 → null
   *
   * Process:
   * - Phase 1: values = [1, 2, 3, 4]
   * - Phase 2: sort → [1, 2, 3, 4] (same!)
   * - Phase 3: Rebuild list
   * Output: 1 → 2 → 3 → 4 ✅
   *
   * WHY: Algorithm works correctly even for sorted input
   */

  /**
   * EDGE CASE 4: Reverse Sorted
   * Input: 4 → 3 → 2 → 1 → null
   *
   * Process:
   * - Phase 1: values = [4, 3, 2, 1]
   * - Phase 2: sort → [1, 2, 3, 4]
   * - Phase 3: Rebuild list
   * Output: 1 → 2 → 3 → 4 ✅
   */

  /**
   * EDGE CASE 5: Duplicate Values
   * Input: 3 → 1 → 3 → 2 → 1 → null
   *
   * Process:
   * - Phase 1: values = [3, 1, 3, 2, 1]
   * - Phase 2: sort → [1, 1, 2, 3, 3]
   * - Phase 3: Rebuild list
   * Output: 1 → 1 → 2 → 3 → 3 ✅
   *
   * WHY: Duplicates bhi sahi se handle hote hain
   */

  /**
   * EDGE CASE 6: Negative Numbers
   * Input: -1 → 5 → 3 → 4 → 0 → null
   *
   * Process:
   * - Phase 1: values = [-1, 5, 3, 4, 0]
   * - Phase 2: sort → [-1, 0, 3, 4, 5]
   * - Phase 3: Rebuild list
   * Output: -1 → 0 → 3 → 4 → 5 ✅
   *
   * WHY: Negative numbers bhi correctly sort hote hain
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY THIS APPROACH WORKS
   * ════════════════════════════════════════════════════════════════
   *
   * Key Insights:
   * ─────────────
   *
   * 1. SEPARATION OF CONCERNS:
   *    - Linked list traversal (simple)
   *    - Array sorting (built-in, tested)
   *    - List construction (straightforward)
   *    Each phase independent aur easy to understand!
   *
   * 2. LEVERAGING BUILT-IN SORT:
   *    - Array sorting highly optimized hai
   *    - JavaScript engine mein fast implementation
   *    - No need to reinvent the wheel!
   *
   * 3. DUMMY NODE PATTERN:
   *    - List construction simplified
   *    - No edge case handling for first node
   *    - Clean, uniform code
   *
   * Trade-offs:
   * ───────────
   *
   * ✅ PROS:
   * - Bahut simple aur readable code
   * - Built-in sort ka faayda
   * - Easy to debug
   * - No complex pointer manipulation
   *
   * ❌ CONS:
   * - Extra O(n) space for array
   * - Follow-up constraint violate (O(1) space nahi)
   * - Two extra passes (to array, from array)
   * - Not using linked list properties
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS
   * ════════════════════════════════════════════════════════════════
   *
   * TIME COMPLEXITY: O(n log n)
   * ──────────────────────────
   *
   * Breakdown:
   * 1. Phase 1 (Array mein store): O(n)
   *    - Har node ko ek baar visit: n operations
   *
   * 2. Phase 2 (Array sort): O(n log n)
   *    - Built-in sort typically uses Timsort or similar
   *    - Average case: O(n log n)
   *    - Worst case: O(n log n)
   *
   * 3. Phase 3 (List rebuild): O(n)
   *    - Array traverse aur nodes create: n operations
   *
   * Total: O(n) + O(n log n) + O(n) = O(n log n) ✅
   *
   * Dominant term: O(n log n) (sorting phase)
   *
   * SPACE COMPLEXITY: O(n)
   * ──────────────────────
   *
   * Breakdown:
   * 1. Values array: O(n)
   *    - N elements store karne ke liye
   *
   * 2. New list nodes: O(n)
   *    - But these replace original list
   *    - So not counted as "extra" space
   *
   * 3. Variables (current, dummy): O(1)
   *    - Constant space
   *
   * Total Extra Space: O(n) ❌
   *
   * Follow-up violation:
   * - Question maangta hai O(1) space
   * - Ye approach O(n) space use karta hai
   * - Better/Optimal approach needed for follow-up!
   */

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper: Create linked list from array
   * Ye testing ke liye helpful hai
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
   * Helper: Convert linked list to array
   * Ye verification ke liye useful hai
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

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('🧪 Testing Sort List - BRUTE FORCE APPROACH\n');
    console.log('⚠️  Uses O(n) extra space (array)\n');

    // Test Case 1: Example 1 - Unsorted list
    console.log('Test 1: Unsorted list [4,2,1,3]');
    const list1 = createList([4, 2, 1, 3]);
    const result1 = sortList(list1);
    const output1 = listToArray(result1);
    console.log('Input:    [4,2,1,3]');
    console.log('Expected: [1,2,3,4]');
    console.log('Got:      ', output1);
    console.log(
      '✅ Pass:',
      JSON.stringify(output1) === JSON.stringify([1, 2, 3, 4])
    );
    console.log('---\n');

    // Test Case 2: Example 2 - With negative numbers
    console.log('Test 2: With negative numbers [-1,5,3,4,0]');
    const list2 = createList([-1, 5, 3, 4, 0]);
    const result2 = sortList(list2);
    const output2 = listToArray(result2);
    console.log('Input:    [-1,5,3,4,0]');
    console.log('Expected: [-1,0,3,4,5]');
    console.log('Got:      ', output2);
    console.log(
      '✅ Pass:',
      JSON.stringify(output2) === JSON.stringify([-1, 0, 3, 4, 5])
    );
    console.log('---\n');

    // Test Case 3: Empty list
    console.log('Test 3: Empty list []');
    const list3 = createList([]);
    const result3 = sortList(list3);
    const output3 = listToArray(result3);
    console.log('Input:    []');
    console.log('Expected: []');
    console.log('Got:      ', output3);
    console.log('✅ Pass:', JSON.stringify(output3) === JSON.stringify([]));
    console.log('---\n');

    // Test Case 4: Single node
    console.log('Test 4: Single node [1]');
    const list4 = createList([1]);
    const result4 = sortList(list4);
    const output4 = listToArray(result4);
    console.log('Input:    [1]');
    console.log('Expected: [1]');
    console.log('Got:      ', output4);
    console.log('✅ Pass:', JSON.stringify(output4) === JSON.stringify([1]));
    console.log('---\n');

    // Test Case 5: Already sorted
    console.log('Test 5: Already sorted [1,2,3,4,5]');
    const list5 = createList([1, 2, 3, 4, 5]);
    const result5 = sortList(list5);
    const output5 = listToArray(result5);
    console.log('Input:    [1,2,3,4,5]');
    console.log('Expected: [1,2,3,4,5]');
    console.log('Got:      ', output5);
    console.log(
      '✅ Pass:',
      JSON.stringify(output5) === JSON.stringify([1, 2, 3, 4, 5])
    );
    console.log('---\n');

    // Test Case 6: Reverse sorted
    console.log('Test 6: Reverse sorted [5,4,3,2,1]');
    const list6 = createList([5, 4, 3, 2, 1]);
    const result6 = sortList(list6);
    const output6 = listToArray(result6);
    console.log('Input:    [5,4,3,2,1]');
    console.log('Expected: [1,2,3,4,5]');
    console.log('Got:      ', output6);
    console.log(
      '✅ Pass:',
      JSON.stringify(output6) === JSON.stringify([1, 2, 3, 4, 5])
    );
    console.log('---\n');

    // Test Case 7: Duplicates
    console.log('Test 7: With duplicates [3,1,3,2,1]');
    const list7 = createList([3, 1, 3, 2, 1]);
    const result7 = sortList(list7);
    const output7 = listToArray(result7);
    console.log('Input:    [3,1,3,2,1]');
    console.log('Expected: [1,1,2,3,3]');
    console.log('Got:      ', output7);
    console.log(
      '✅ Pass:',
      JSON.stringify(output7) === JSON.stringify([1, 1, 2, 3, 3])
    );
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('📝 Summary:');
    console.log('   - Approach: Array-based sorting');
    console.log('   - Time Complexity: O(n log n) ✅');
    console.log('   - Space Complexity: O(n) ❌');
    console.log('   - Follow-up: Not satisfied (needs O(1) space)');
    console.log('\n💡 Next: Try recursive or iterative merge sort for O(1) space!');
  }
}

// Run the tests
SortListBruteForce.runTests();
