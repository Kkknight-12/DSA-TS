/**
 * Sort List - Recursive Merge Sort Approach
 *
 * Problem: Linked list ko ascending order mein sort karna hai
 *
 * Approach: Classic Merge Sort (Divide and Conquer)
 * - Divide: List ko middle se tod ke 2 halves banao
 * - Conquer: Har half ko recursively sort karo
 * - Combine: Dono sorted halves ko merge karo
 *
 * Time Complexity: O(n log n)
 * - Tree depth: log n (har level pe half karte hain)
 * - Per level work: O(n) (merge + find middle)
 * - Total: O(n log n) ✅
 *
 * Space Complexity: O(log n)
 * - Recursion stack: log n depth tak jaata hai
 * - Follow-up constraint violate! ❌ (O(1) nahi)
 *
 * Where n = number of nodes in linked list
 *
 * ✅ Standard and elegant approach
 * ✅ No extra array needed
 * ✅ Uses divide and conquer
 * ❌ Recursion stack space O(log n)
 */

namespace SortListRecursive {
  /**
   * ListNode class definition
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
   * Main function: Sort using recursive merge sort
   *
   * Intuition:
   * - Merge sort perfect hai linked lists ke liye
   * - Arrays jaisa random access nahi chahiye
   * - Sequential operations naturally fit karte hain
   *
   * Strategy:
   * 1. Base case: 0 ya 1 node toh already sorted
   * 2. Find middle using fast/slow pointers
   * 3. Split list into two halves
   * 4. Recursively sort both halves
   * 5. Merge the two sorted halves
   *
   * @param head - Linked list ka head node
   * @returns Sorted linked list ka head
   */
  function sortList(head: ListNode | null): ListNode | null {
    // BASE CASE 1: Empty list
    // WHY: Khali list already sorted hai
    if (head === null) {
      return null;
    }

    // BASE CASE 2: Single node
    // WHY: Ek node already sorted hai, sorting ki zaroorat nahi
    if (head.next === null) {
      return head;
    }

    // ═════════════════════════════════════════════════════════════
    // STEP 1: Find the middle of the list
    // ═════════════════════════════════════════════════════════════

    // Middle nikalne ke liye fast/slow pointer technique use karo
    // LOGIC: slow 1 step, fast 2 steps chalega
    // Jab fast end pe pahunchega, slow middle pe hoga!
    const middle = findMiddle(head);

    // ═════════════════════════════════════════════════════════════
    // STEP 2: Split the list into two halves
    // ═════════════════════════════════════════════════════════════

    // Second half ka head middle.next se start hota hai
    const secondHalf = middle.next;

    // First half ko second half se disconnect karo
    // WHY: Dono halves independent hone chahiye sorting ke liye
    middle.next = null;

    // Ab do separate lists hain:
    // - First half: head se middle tak
    // - Second half: secondHalf se end tak

    // ═════════════════════════════════════════════════════════════
    // STEP 3: Recursively sort both halves
    // ═════════════════════════════════════════════════════════════

    // Left half ko recursively sort karo
    // RECURSIVE CALL: Ye function khud ko call karega
    // Base case pe pahunch ke wapas aayega with sorted list
    const sortedLeft = sortList(head);

    // Right half ko recursively sort karo
    // RECURSIVE CALL: Same process right half ke liye
    const sortedRight = sortList(secondHalf);

    // DEBUG: Ab dono halves sorted hain
    // Example: If input was [4,2,1,3]
    // sortedLeft might be [2,4]
    // sortedRight might be [1,3]

    // ═════════════════════════════════════════════════════════════
    // STEP 4: Merge the two sorted halves
    // ═════════════════════════════════════════════════════════════

    // Do sorted lists ko ek sorted list mein merge karo
    // LOGIC: Dono lists ko compare karte jao, chota element pehle daalo
    return mergeTwoSortedLists(sortedLeft, sortedRight);
  }

  /**
   * Helper Function: Find the middle of linked list
   *
   * Technique: Fast and Slow Pointers (Floyd's Algorithm)
   *
   * Key Concept:
   * - Slow pointer: 1 step per iteration
   * - Fast pointer: 2 steps per iteration
   * - Jab fast end pe pahunchega, slow middle pe hoga!
   *
   * WHY this works:
   * - Fast double speed pe chalta hai
   * - Jab fast n distance cover karega, slow n/2 cover karega
   * - n/2 = middle position!
   *
   * @param head - List ka head
   * @returns Middle node (for odd length) or node before middle (for even)
   */
  function findMiddle(head: ListNode): ListNode {
    // Slow pointer: ek-ek step chalega
    let slow: ListNode | null = head;

    // Fast pointer: do-do steps chalega
    let fast: ListNode | null = head.next;

    // CRITICAL: fast.next check kyun?
    // WHY: Ensure karna hai ki fast do steps chal sake
    // Agar fast.next null hai toh fast.next.next crash karega!
    while (fast !== null && fast.next !== null) {
      // Slow ko ek step aage badhao
      // EXAMPLE: slow: 1→2→3, next step pe slow = 2
      slow = slow!.next;

      // Fast ko do steps aage badhao
      // EXAMPLE: fast: 1→2→3→4→5, next step pe fast = 3
      fast = fast.next.next;
    }

    // Loop end hone ke baad:
    // - Fast end pe ya near-end pe hoga
    // - Slow middle pe hoga!

    // EXAMPLE for [1,2,3,4,5]:
    // Initial: slow=1, fast=2
    // Iter 1:  slow=2, fast=4
    // Iter 2:  slow=3, fast=null (exit)
    // Return: node(3) - middle! ✅

    return slow!;
  }

  /**
   * Helper Function: Merge two sorted linked lists
   *
   * Given: Two sorted lists list1 and list2
   * Goal: Merge them into one sorted list
   *
   * Technique: Dummy node + comparison
   *
   * Algorithm:
   * 1. Create dummy node as placeholder
   * 2. Compare nodes from both lists
   * 3. Attach smaller node to result
   * 4. Move that list's pointer forward
   * 5. Repeat until one list is exhausted
   * 6. Attach remaining list
   *
   * @param list1 - First sorted list
   * @param list2 - Second sorted list
   * @returns Merged sorted list
   */
  function mergeTwoSortedLists(
    list1: ListNode | null,
    list2: ListNode | null
  ): ListNode | null {
    // EDGE CASE 1: Agar pehli list khali hai
    // WHY: Toh result sirf dusri list hai
    if (list1 === null) {
      return list2;
    }

    // EDGE CASE 2: Agar dusri list khali hai
    // WHY: Toh result sirf pehli list hai
    if (list2 === null) {
      return list1;
    }

    // ═════════════════════════════════════════════════════════════
    // SETUP: Dummy node for easy list building
    // ═════════════════════════════════════════════════════════════

    // Dummy node banao (placeholder head)
    // WHY: List banate waqt edge cases handle karne mein easy
    const dummy = new ListNode(0);

    // Current pointer se naye nodes add karte jayenge
    let current = dummy;

    // ═════════════════════════════════════════════════════════════
    // MERGE: Compare and attach smaller nodes
    // ═════════════════════════════════════════════════════════════

    // Jab tak dono lists mein nodes hain
    while (list1 !== null && list2 !== null) {
      // COMPARISON: Kon sa value chota hai?
      if (list1.val <= list2.val) {
        // List1 ka node chota hai
        // WHY: Use current.next mein attach karo
        current.next = list1;

        // List1 ko aage badhao
        // LOGIC: Ye node use ho gaya, next node pe jao
        list1 = list1.next;
      } else {
        // List2 ka node chota hai
        // WHY: Use current.next mein attach karo
        current.next = list2;

        // List2 ko aage badhao
        list2 = list2.next;
      }

      // Current ko bhi aage badhao
      // WHY: Next node attach karne ke liye ready ho jao
      current = current.next;
    }

    // ═════════════════════════════════════════════════════════════
    // ATTACH REMAINING: Jo bhi list bachi hai, use attach karo
    // ═════════════════════════════════════════════════════════════

    // Agar list1 mein kuch nodes bache hain
    // WHY: Wo already sorted hain, directly attach kar do
    if (list1 !== null) {
      current.next = list1;
    }

    // Agar list2 mein kuch nodes bache hain
    // WHY: Wo already sorted hain, directly attach kar do
    if (list2 !== null) {
      current.next = list2;
    }

    // ═════════════════════════════════════════════════════════════
    // RETURN: Dummy ko skip karke result return karo
    // ═════════════════════════════════════════════════════════════

    // Dummy.next se actual sorted list start hoti hai
    return dummy.next;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE RECURSIVE EXECUTION
   * ════════════════════════════════════════════════════════════════
   *
   * Example Input: 4 → 2 → 1 → 3 → null
   *
   * Goal: Sort in ascending order
   * Expected Output: 1 → 2 → 3 → 4 → null
   *
   * ═════════════════════════════════════════════════════════════════
   * RECURSION TREE VISUALIZATION
   * ═════════════════════════════════════════════════════════════════
   *
   *                    sortList([4,2,1,3])
   *                            │
   *                    Find Middle: 2
   *                            │
   *                    Split: [4,2] | [1,3]
   *                            │
   *              ┌────────────┴────────────┐
   *              ▼                           ▼
   *       sortList([4,2])           sortList([1,3])
   *              │                          │
   *         Middle: 4                  Middle: 1
   *              │                          │
   *       Split: [4] | [2]          Split: [1] | [3]
   *              │                          │
   *        ┌─────┴─────┐            ┌─────┴─────┐
   *        ▼            ▼            ▼            ▼
   *    [4] (base)   [2] (base)    [1] (base)   [3] (base)
   *        │            │            │            │
   *        └─────┬─────┘            └─────┬─────┘
   *              ▼                        ▼
   *         merge([4],[2])          merge([1],[3])
   *              │                        │
   *           [2,4]                     [1,3]
   *              │                         │
   *              └────────┬──────────────┘
   *                       ▼
   *                merge([2,4],[1,3])
   *                       │
   *                   [1,2,3,4] ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * DETAILED STEP-BY-STEP EXECUTION
   * ═════════════════════════════════════════════════════════════════
   *
   * CALL 1: sortList([4,2,1,3])
   * ────────────────────────────
   *
   * Input: 4 → 2 → 1 → 3 → null
   *
   * Step 1: Check base cases
   *   - head === null? NO
   *   - head.next === null? NO
   *   Continue...
   *
   * Step 2: Find middle
   *   Initial: slow=4, fast=2
   *
   *   | Iteration | slow | fast | Action                    |
   *   |-----------|------|------|---------------------------|
   *   | Initial   | 4    | 2    | Start                     |
   *   | Check     | 4    | 2    | fast!=null, fast.next!=null ✓ |
   *   | Move      | 2    | null | slow→2, fast→1→3→null     |
   *   | Check     | 2    | null | fast===null ✗, EXIT       |
   *
   *   Result: middle = node(2)
   *
   * Step 3: Split list
   *   secondHalf = middle.next = node(1)
   *   middle.next = null
   *
   *   After split:
   *   First half:  4 → 2 → null
   *   Second half: 1 → 3 → null
   *
   * Step 4: Recursive calls
   *   sortedLeft = sortList([4,2])  → Will return [2,4]
   *   sortedRight = sortList([1,3]) → Will return [1,3]
   *
   * Step 5: Merge
   *   result = merge([2,4], [1,3]) → [1,2,3,4]
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * CALL 2: sortList([4,2]) (Left subtree)
   * ───────────────────────
   *
   * Input: 4 → 2 → null
   *
   * Step 1: Base cases? NO (2 nodes)
   *
   * Step 2: Find middle
   *   Initial: slow=4, fast=2
   *
   *   | Iteration | slow | fast | Check                     |
   *   |-----------|------|------|---------------------------|
   *   | Initial   | 4    | 2    | fast.next = null          |
   *   | Exit      | 4    | 2    | Loop doesn't run          |
   *
   *   Result: middle = node(4)
   *
   * Step 3: Split
   *   secondHalf = node(2)
   *   middle.next = null
   *
   *   After split:
   *   First:  4 → null
   *   Second: 2 → null
   *
   * Step 4: Recursive calls
   *   sortedLeft = sortList([4])  → Returns [4] (base case)
   *   sortedRight = sortList([2]) → Returns [2] (base case)
   *
   * Step 5: Merge [4] and [2]
   *   compare: 4 vs 2
   *   Result: 2 → 4 → null ✅
   *
   * Returns: [2,4]
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * CALL 3: sortList([1,3]) (Right subtree)
   * ───────────────────────
   *
   * Input: 1 → 3 → null
   *
   * Following same process as CALL 2:
   *
   * Middle: node(1)
   * Split: [1] | [3]
   * Recursive: [1] (base) | [3] (base)
   * Merge: [1,3] ✅
   *
   * Returns: [1,3]
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * BACK TO CALL 1: Final Merge
   * ───────────────────────────
   *
   * Now we have:
   *   sortedLeft = [2,4]
   *   sortedRight = [1,3]
   *
   * Merge Process:
   *
   * | Step | list1 | list2 | Compare | Attach | Result So Far |
   * |------|-------|-------|---------|--------|---------------|
   * | 1    | 2     | 1     | 2>1     | 1      | [1]           |
   * | 2    | 2     | 3     | 2<3     | 2      | [1,2]         |
   * | 3    | 4     | 3     | 4>3     | 3      | [1,2,3]       |
   * | 4    | 4     | null  | -       | 4      | [1,2,3,4]     |
   *
   * Final Result: 1 → 2 → 3 → 4 → null ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * MERGE DETAILED VISUALIZATION
   * ═════════════════════════════════════════════════════════════════
   *
   * Merging [2,4] and [1,3]:
   *
   * Initial State:
   * list1: 2 → 4 → null
   * list2: 1 → 3 → null
   * dummy: 0 → null
   *
   * Iteration 1: Compare 2 vs 1
   * ────────────────────────────
   * 1 < 2, so attach 1
   *
   * dummy → 1 → null
   *         ↑
   *      current
   *
   * list1: 2 → 4
   * list2: 3 → null
   *
   * Iteration 2: Compare 2 vs 3
   * ────────────────────────────
   * 2 < 3, so attach 2
   *
   * dummy → 1 → 2 → null
   *              ↑
   *           current
   *
   * list1: 4 → null
   * list2: 3 → null
   *
   * Iteration 3: Compare 4 vs 3
   * ────────────────────────────
   * 3 < 4, so attach 3
   *
   * dummy → 1 → 2 → 3 → null
   *                  ↑
   *               current
   *
   * list1: 4 → null
   * list2: null
   *
   * Iteration 4: list2 is null
   * ────────────────────────────
   * Exit loop, attach remaining list1
   *
   * dummy → 1 → 2 → 3 → 4 → null
   *
   * Return: dummy.next = [1,2,3,4] ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * RECURSION DEPTH ANALYSIS
   * ════════════════════════════════════════════════════════════════
   *
   * For n = 4 nodes:
   *
   * Level 0: [4,2,1,3]           (1 call)
   * Level 1: [4,2], [1,3]        (2 calls)
   * Level 2: [4], [2], [1], [3]  (4 calls - base cases)
   *
   * Tree Depth = log₂(4) = 2
   *
   * For n = 8 nodes:
   * Level 0: 1 call  (8 nodes)
   * Level 1: 2 calls (4 nodes each)
   * Level 2: 4 calls (2 nodes each)
   * Level 3: 8 calls (1 node each - base)
   *
   * Tree Depth = log₂(8) = 3
   *
   * General: Depth = log₂(n) = log n
   *
   * Stack Space = O(log n) ⚠️
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ════════════════════════════════════════════════════════════════
   */

  /**
   * EDGE CASE 1: Empty List
   * Input: null
   *
   * Execution:
   *   if (head === null) return null
   *
   * Output: null ✅
   * WHY: Base case immediately handles it
   */

  /**
   * EDGE CASE 2: Single Node
   * Input: [5]
   *
   * Execution:
   *   if (head.next === null) return head
   *
   * Output: [5] ✅
   * WHY: Single node already sorted
   */

  /**
   * EDGE CASE 3: Two Nodes (Already Sorted)
   * Input: [1,2]
   *
   * Process:
   *   Middle = 1, Split: [1] | [2]
   *   Recursive: [1], [2] (base cases)
   *   Merge: [1,2]
   *
   * Output: [1,2] ✅
   */

  /**
   * EDGE CASE 4: Two Nodes (Reverse)
   * Input: [2,1]
   *
   * Process:
   *   Middle = 2, Split: [2] | [1]
   *   Recursive: [2], [1]
   *   Merge: Compare 2 vs 1 → [1,2]
   *
   * Output: [1,2] ✅
   */

  /**
   * EDGE CASE 5: All Same Values
   * Input: [3,3,3,3]
   *
   * Process:
   *   Recursively splits and merges
   *   Merge maintains stability
   *
   * Output: [3,3,3,3] ✅
   */

  /**
   * EDGE CASE 6: Large List
   * Input: 50,000 nodes
   *
   * Depth: log₂(50000) ≈ 15-16 levels
   * Stack space: O(16) ≈ O(log n) ✅
   * No stack overflow!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY MERGE SORT FOR LINKED LISTS?
   * ════════════════════════════════════════════════════════════════
   *
   * Advantages over other sorts:
   * ────────────────────────────
   *
   * 1. QUICK SORT:
   *    ❌ Needs random access for pivot
   *    ❌ Partition operation complex in linked list
   *    ❌ Worst case O(n²) if bad pivots
   *
   * 2. HEAP SORT:
   *    ❌ Needs random access to build heap
   *    ❌ Hard to implement with linked lists
   *
   * 3. BUBBLE/INSERTION SORT:
   *    ❌ O(n²) time complexity
   *    ❌ Too slow for large inputs
   *
   * 4. MERGE SORT:
   *    ✅ Only sequential access needed
   *    ✅ Natural fit for linked lists
   *    ✅ Stable sort (maintains relative order)
   *    ✅ Guaranteed O(n log n)
   *    ✅ Divide operation simple (find middle)
   *    ✅ Merge operation natural for lists
   *
   * Perfect match! 🎯
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS
   * ════════════════════════════════════════════════════════════════
   *
   * TIME COMPLEXITY: O(n log n)
   * ───────────────────────────
   *
   * Breakdown:
   * 1. Tree has log n levels (binary split)
   * 2. Each level processes all n nodes
   *
   * Per level work:
   * - Finding middle: O(n/2^level) per call
   * - Merging: O(n/2^level) per call
   * - Number of calls at level: 2^level
   * - Total per level: 2^level × O(n/2^level) = O(n)
   *
   * Total: O(n) × log n levels = O(n log n) ✅
   *
   * Example for n=8:
   * Level 0: 1 call  × 8 work  = 8
   * Level 1: 2 calls × 4 work  = 8
   * Level 2: 4 calls × 2 work  = 8
   * Level 3: 8 calls × 1 work  = 8
   * Total: 8 × 4 levels = 32 ≈ 8 log 8 = 8 × 3 = 24
   *
   * SPACE COMPLEXITY: O(log n)
   * ──────────────────────────
   *
   * Breakdown:
   * 1. Recursion stack: log n depth
   * 2. Each call uses O(1) variables
   * 3. No extra arrays or data structures
   *
   * Total: O(log n) ⚠️
   *
   * Follow-up issue:
   * - Question asks for O(1) space
   * - This uses O(log n) for call stack
   * - Not optimal for follow-up!
   * - Need iterative approach for O(1)
   */

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Helper: Create linked list from array
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
    console.log('🧪 Testing Sort List - RECURSIVE MERGE SORT\n');
    console.log('⚠️  Uses O(log n) recursion stack space\n');

    // Test Case 1: Standard unsorted
    console.log('Test 1: Unsorted [4,2,1,3]');
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

    // Test Case 2: With negatives
    console.log('Test 2: With negatives [-1,5,3,4,0]');
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

    // Test Case 3: Empty
    console.log('Test 3: Empty []');
    const list3 = createList([]);
    const result3 = sortList(list3);
    const output3 = listToArray(result3);
    console.log('Input:    []');
    console.log('Expected: []');
    console.log('Got:      ', output3);
    console.log('✅ Pass:', JSON.stringify(output3) === JSON.stringify([]));
    console.log('---\n');

    // Test Case 4: Single node
    console.log('Test 4: Single [1]');
    const list4 = createList([1]);
    const result4 = sortList(list4);
    const output4 = listToArray(result4);
    console.log('Input:    [1]');
    console.log('Expected: [1]');
    console.log('Got:      ', output4);
    console.log('✅ Pass:', JSON.stringify(output4) === JSON.stringify([1]));
    console.log('---\n');

    // Test Case 5: Two nodes
    console.log('Test 5: Two nodes [2,1]');
    const list5 = createList([2, 1]);
    const result5 = sortList(list5);
    const output5 = listToArray(result5);
    console.log('Input:    [2,1]');
    console.log('Expected: [1,2]');
    console.log('Got:      ', output5);
    console.log('✅ Pass:', JSON.stringify(output5) === JSON.stringify([1, 2]));
    console.log('---\n');

    // Test Case 6: Already sorted
    console.log('Test 6: Already sorted [1,2,3,4,5]');
    const list6 = createList([1, 2, 3, 4, 5]);
    const result6 = sortList(list6);
    const output6 = listToArray(result6);
    console.log('Input:    [1,2,3,4,5]');
    console.log('Expected: [1,2,3,4,5]');
    console.log('Got:      ', output6);
    console.log(
      '✅ Pass:',
      JSON.stringify(output6) === JSON.stringify([1, 2, 3, 4, 5])
    );
    console.log('---\n');

    // Test Case 7: Duplicates
    console.log('Test 7: Duplicates [3,1,3,2,1]');
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
    console.log('   - Approach: Recursive Merge Sort');
    console.log('   - Time Complexity: O(n log n) ✅');
    console.log('   - Space Complexity: O(log n) ⚠️');
    console.log('   - Follow-up: Not satisfied (needs O(1) space)');
    console.log('\n💡 This is the standard approach for linked list sorting!');
    console.log('💡 For O(1) space, check iterative merge sort!');
  }
}

// Run the tests
SortListRecursive.runTests();