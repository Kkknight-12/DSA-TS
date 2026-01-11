/**
 * Sort List - OPTIMAL: Iterative Merge Sort (Bottom-Up)
 *
 * Problem: Linked list ko ascending order mein sort karna hai
 *
 * Approach: Bottom-up Merge Sort (NO RECURSION!)
 * - Start from smallest size (1)
 * - Merge adjacent pairs of that size
 * - Double the size and repeat
 * - Continue until entire list is sorted
 *
 * Time Complexity: O(n log n)
 * - Passes: log n (size doubles: 1→2→4→8...)
 * - Per pass: O(n) work (merge all sublists)
 * - Total: O(n log n) ✅
 *
 * Space Complexity: O(1) ⭐⭐
 * - No recursion stack!
 * - Only pointers (constant space)
 * - Follow-up SATISFIED! ✅✅
 *
 * Where n = number of nodes in linked list
 *
 * ✅ Optimal time: O(n log n)
 * ✅ Optimal space: O(1) ⭐⭐
 * ✅ Answers follow-up question!
 * ⚠️  Implementation complex (pointer heavy)
 */

namespace SortListOptimal {
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
   * Main function: Sort using iterative merge sort (bottom-up)
   *
   * Intuition:
   * - Recursive approach: Top-down (break full list → singles → merge up)
   * - Iterative approach: Bottom-up (start with singles → merge up to full)
   *
   * Key Difference:
   * - Recursive uses call stack (O(log n) space)
   * - Iterative uses loops (O(1) space) ⭐
   *
   * Strategy:
   * 1. Calculate list length
   * 2. Start with size = 1
   * 3. While size < length:
   *    a. Merge all adjacent pairs of given size
   *    b. Double the size
   * 4. Return sorted list
   *
   * Example Flow for [4,2,1,3]:
   * - Pass 1 (size=1): Merge (4,2) and (1,3) → [2,4,1,3]
   * - Pass 2 (size=2): Merge (2,4) and (1,3) → [1,2,3,4] ✅
   *
   * @param head - Linked list ka head node
   * @returns Sorted linked list ka head
   */
  function sortList(head: ListNode | null): ListNode | null {
    // EDGE CASE: Empty list ya single node
    // WHY: Already sorted hai!
    if (head === null || head.next === null) {
      return head;
    }

    // ═════════════════════════════════════════════════════════════
    // STEP 1: Calculate total length of list
    // ═════════════════════════════════════════════════════════════

    // List ki length nikalo
    // WHY: Hume pata hona chahiye kitni baar merge karna hai
    let length = 0;
    let current: ListNode | null = head;

    while (current !== null) {
      length++;
      current = current.next;
    }

    // DEBUG: Length calculated
    // EXAMPLE: For [4,2,1,3], length = 4

    // ═════════════════════════════════════════════════════════════
    // STEP 2: Create dummy node (helper for list manipulation)
    // ═════════════════════════════════════════════════════════════

    // Dummy node banao
    // WHY: List ke start ko track karna easy hota hai
    const dummy = new ListNode(0);
    dummy.next = head;

    // ═════════════════════════════════════════════════════════════
    // STEP 3: Bottom-up merge sort (main loop)
    // ═════════════════════════════════════════════════════════════

    // Size se start karo: 1, 2, 4, 8, 16...
    // WHY: Bottom-up approach - chote se bade ki taraf jao
    for (let size = 1; size < length; size *= 2) {
      // LOGIC: Har pass mein size double hota hai
      // Pass 1: size=1 (singles merge)
      // Pass 2: size=2 (pairs merge)
      // Pass 3: size=4 (quads merge)
      // ... until size >= length

      // Current position track karo
      let tail = dummy; // Sorted portion ka last node
      current = dummy.next; // Unsorted portion ka start

      // ═══════════════════════════════════════════════════════════
      // STEP 3a: Merge all adjacent pairs of current size
      // ═══════════════════════════════════════════════════════════

      while (current !== null) {
        // LEFT sublist: size nodes starting from current
        // WHY: Ye pehla group hai jo merge karna hai
        const left = current;

        // RIGHT sublist: next size nodes
        // WHY: Ye dusra group hai jo merge karna hai
        const right = split(left, size);

        // NEXT sublist: remaining list after right
        // WHY: Baaki ka list save karo for next iteration
        current = split(right, size);

        // MERGE: left aur right ko merge karo
        // RESULT: tail ke next mein sorted sublist attach ho jayega
        tail = merge(left, right, tail);

        // LOGIC: Ab tail sorted portion ke end pe hai
        // Next iteration mein usi se continue karenge
      }
    }

    // ═════════════════════════════════════════════════════════════
    // STEP 4: Return sorted list
    // ═════════════════════════════════════════════════════════════

    // Dummy.next se actual sorted list start hoti hai
    return dummy.next;
  }

  /**
   * Helper Function: Split list after 'size' nodes
   *
   * Purpose: List ko tod ke do parts mein divide karna
   *
   * Algorithm:
   * 1. Start se size-1 nodes traverse karo
   * 2. Size-th node pe next ko null kar do (disconnect)
   * 3. Original next return karo (second part ka head)
   *
   * Example:
   * Input: 1→2→3→4→5, size=2
   * After:  1→2→null (first part)
   * Return: 3→4→5 (second part)
   *
   * @param head - List ka head jise split karna hai
   * @param size - Kitne nodes pehle part mein chahiye
   * @returns Second part ka head (ya null)
   */
  function split(head: ListNode | null, size: number): ListNode | null {
    // EDGE CASE: Agar head null hai
    // WHY: Kuch split karne ko nahi
    if (head === null) {
      return null;
    }

    // Size-1 steps chalao (size nodes tak pohochne ke liye)
    // WHY: size-th node ke baad split karna hai
    for (let i = 1; i < size && head.next !== null; i++) {
      head = head.next;
    }

    // CRITICAL: Check if we can split
    // WHY: Agar list choti hai toh split nahi kar sakte
    if (head.next === null) {
      return null; // List khatam, second part nahi
    }

    // Second part ka head save karo
    const secondPart = head.next;

    // Connection tod do (disconnect)
    // WHY: First part independent hona chahiye
    head.next = null;

    // Second part return karo
    return secondPart;
  }

  /**
   * Helper Function: Merge two sorted lists
   *
   * Purpose: Do sorted lists ko ek sorted list mein combine karna
   *
   * Special Feature:
   * - Takes a 'tail' parameter (existing sorted portion ka end)
   * - Merged result ko tail ke baad attach karta hai
   * - New tail return karta hai
   *
   * Algorithm:
   * 1. Compare nodes from both lists
   * 2. Attach smaller one to tail
   * 3. Move pointers accordingly
   * 4. Attach remaining list
   * 5. Return new tail position
   *
   * @param l1 - First sorted list
   * @param l2 - Second sorted list
   * @param tail - Existing sorted list ka tail
   * @returns New tail after merging
   */
  function merge(
    l1: ListNode | null,
    l2: ListNode | null,
    tail: ListNode
  ): ListNode {
    // Current tail position
    // WHY: Yaha se naye nodes attach karte jayenge
    let current = tail;

    // ═════════════════════════════════════════════════════════════
    // MERGE: Compare and attach smaller nodes
    // ═════════════════════════════════════════════════════════════

    // Jab tak dono lists mein nodes hain
    while (l1 !== null && l2 !== null) {
      // COMPARISON: Kon chota hai?
      if (l1.val <= l2.val) {
        // L1 ka node chota hai
        // WHY: Use attach karo
        current.next = l1;

        // L1 ko aage badhao
        l1 = l1.next;
      } else {
        // L2 ka node chota hai
        // WHY: Use attach karo
        current.next = l2;

        // L2 ko aage badhao
        l2 = l2.next;
      }

      // Current ko aage badhao (jo node attach kiya waha)
      current = current.next;
    }

    // ═════════════════════════════════════════════════════════════
    // ATTACH REMAINING: Jo bhi list bachi hai
    // ═════════════════════════════════════════════════════════════

    // Agar l1 mein nodes bache hain
    // WHY: Already sorted hain, directly attach
    if (l1 !== null) {
      current.next = l1;
    }

    // Agar l2 mein nodes bache hain
    // WHY: Already sorted hain, directly attach
    if (l2 !== null) {
      current.next = l2;
    }

    // ═════════════════════════════════════════════════════════════
    // FIND NEW TAIL: Merged list ka last node
    // ═════════════════════════════════════════════════════════════

    // Current se last node tak jao
    // WHY: Ye new tail hoga next merge ke liye
    while (current.next !== null) {
      current = current.next;
    }

    // New tail return karo
    return current;
  }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE BOTTOM-UP EXECUTION
   * ════════════════════════════════════════════════════════════════
   *
   * Example Input: 4 → 2 → 1 → 3 → null
   *
   * Goal: Sort in ascending order
   * Expected Output: 1 → 2 → 3 → 4 → null
   *
   * ═════════════════════════════════════════════════════════════════
   * INITIALIZATION
   * ═════════════════════════════════════════════════════════════════
   *
   * Step 1: Calculate length
   *   Traverse: 4 → 2 → 1 → 3 → null
   *   Count: 4 nodes
   *   Result: length = 4
   *
   * Step 2: Create dummy
   *   dummy(0) → 4 → 2 → 1 → 3 → null
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 1: SIZE = 1
   * ═════════════════════════════════════════════════════════════════
   *
   * Goal: Merge every 2 adjacent singles
   *
   * Initial State:
   * dummy → 4 → 2 → 1 → 3 → null
   *
   * Variables:
   *   size = 1
   *   tail = dummy
   *   current = 4
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1.1: Merge first pair (4, 2)
   * ─────────────────────────────────────────────────────────────────
   *
   * Step 1: Get sublists
   *   left = split(4, 1) = 4 → null
   *   right = split(2, 1) = 2 → null
   *   current = split(1, 1) = 1 → 3 → null
   *
   * State after splits:
   *   left:    4 → null
   *   right:   2 → null
   *   remaining: 1 → 3 → null
   *
   * Step 2: Merge left and right
   *   Compare: 4 vs 2
   *   Result: 2 → 4 → null
   *
   * Step 3: Attach to tail
   *   dummy → 2 → 4 → ...
   *               ↑
   *              tail
   *
   * Step 4: Update tail
   *   tail = 4 (last node of merged result)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1.2: Merge second pair (1, 3)
   * ─────────────────────────────────────────────────────────────────
   *
   * Step 1: Get sublists
   *   left = split(1, 1) = 1 → null
   *   right = split(3, 1) = 3 → null
   *   current = split(null, 1) = null
   *
   * State:
   *   left:  1 → null
   *   right: 3 → null
   *
   * Step 2: Merge
   *   Compare: 1 vs 3
   *   Result: 1 → 3 → null
   *
   * Step 3: Attach to tail
   *   dummy → 2 → 4 → 1 → 3 → null
   *                       ↑
   *                     tail
   *
   * Step 4: current = null, exit while loop
   *
   * ─────────────────────────────────────────────────────────────────
   * After Pass 1:
   * ─────────────────────────────────────────────────────────────────
   *
   * List: dummy → 2 → 4 → 1 → 3 → null
   *
   * Explanation:
   * - Pairs of size 1 merged:
   *   - (4,2) → [2,4]
   *   - (1,3) → [1,3]
   * - But overall not sorted yet!
   *
   * ═════════════════════════════════════════════════════════════════
   * PASS 2: SIZE = 2
   * ═════════════════════════════════════════════════════════════════
   *
   * Goal: Merge every 2 adjacent pairs (size 2 each)
   *
   * Initial State:
   * dummy → 2 → 4 → 1 → 3 → null
   *
   * Variables:
   *   size = 2 (doubled from 1)
   *   tail = dummy
   *   current = 2
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2.1: Merge ([2,4], [1,3])
   * ─────────────────────────────────────────────────────────────────
   *
   * Step 1: Get sublists
   *   left = split(2, 2) = 2 → 4 → null
   *   right = split(1, 2) = 1 → 3 → null
   *   current = split(null, 2) = null
   *
   * State:
   *   left:  2 → 4 → null
   *   right: 1 → 3 → null
   *
   * Step 2: Merge process (detailed)
   *
   * | Step | l1  | l2  | Compare | Attach | Result    |
   * |------|-----|-----|---------|--------|-----------|
   * | 1    | 2   | 1   | 2 > 1   | 1      | 1         |
   * | 2    | 2   | 3   | 2 < 3   | 2      | 1→2       |
   * | 3    | 4   | 3   | 4 > 3   | 3      | 1→2→3     |
   * | 4    | 4   | null| -       | 4      | 1→2→3→4   |
   *
   * Result: 1 → 2 → 3 → 4 → null ✅
   *
   * Step 3: Attach to tail
   *   dummy → 1 → 2 → 3 → 4 → null
   *                       ↑
   *                      tail
   * Step 4: current = null, exit while loop
   *
   * ─────────────────────────────────────────────────────────────────
   * After Pass 2:
   * ─────────────────────────────────────────────────────────────────
   *
   * List: dummy → 1 → 2 → 3 → 4 → null
   *
   * Fully sorted! ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * LOOP CHECK: SIZE = 4
   * ═════════════════════════════════════════════════════════════════
   *
   * Check: size < length?
   *   4 < 4? NO!
   *   Exit for loop
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RETURN
   * ═════════════════════════════════════════════════════════════════
   *
   * Return: dummy.next = 1 → 2 → 3 → 4 → null ✅
   *
   * ═════════════════════════════════════════════════════════════════
   * SUMMARY TABLE: ALL PASSES
   * ═════════════════════════════════════════════════════════════════
   *
   * | Pass | Size | Input           | Merges        | Output          |
   * |------|------|-----------------|---------------|-----------------|
   * | 0    | -    | [4,2,1,3]       | -             | [4,2,1,3]       |
   * | 1    | 1    | [4,2,1,3]       | (4,2), (1,3)  | [2,4,1,3]       |
   * | 2    | 2    | [2,4,1,3]       | ([2,4],[1,3]) | [1,2,3,4] ✅    |
   * | 3    | 4    | [1,2,3,4]       | Loop exit     | -               |
   *
   * Total Passes: 2 = log₂(4) ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * ANOTHER EXAMPLE: 5 NODES
   * ════════════════════════════════════════════════════════════════
   *
   * Input: 5 → 3 → 1 → 4 → 2 → null
   * Length: 5
   *
   * ─────────────────────────────────────────────────────────────────
   * PASS 1: SIZE = 1
   * ─────────────────────────────────────────────────────────────────
   *
   * Merges:
   * - (5,3) → [3,5]
   * - (1,4) → [1,4]
   * - (2) alone → [2]
   *
   * Result: [3,5,1,4,2]
   *
   * ─────────────────────────────────────────────────────────────────
   * PASS 2: SIZE = 2
   * ─────────────────────────────────────────────────────────────────
   *
   * Merges:
   * - ([3,5],[1,4]) → [1,3,4,5]
   * - ([2]) alone → [2]
   *
   * Result: [1,3,4,5,2]
   *
   * ─────────────────────────────────────────────────────────────────
   * PASS 3: SIZE = 4
   * ─────────────────────────────────────────────────────────────────
   *
   * Merges:
   * - ([1,3,4,5],[2]) → [1,2,3,4,5] ✅
   *
   * Result: [1,2,3,4,5] ✅
   *
   * Total Passes: 3 = ⌈log₂(5)⌉ ✅
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
   * Check: if (head === null) return null
   * Output: null ✅
   */

  /**
   * EDGE CASE 2: Single Node
   * Input: [5]
   *
   * Check: if (head.next === null) return head
   * Output: [5] ✅
   */

  /**
   * EDGE CASE 3: Two Nodes
   * Input: [2,1]
   *
   * Length: 2
   * Pass 1 (size=1): Merge (2,1) → [1,2]
   * Pass 2 (size=2): Exit (size >= length)
   * Output: [1,2] ✅
   */

  /**
   * EDGE CASE 4: Already Sorted
   * Input: [1,2,3,4]
   *
   * Pass 1: (1,2)→[1,2], (3,4)→[3,4]
   * Pass 2: ([1,2],[3,4])→[1,2,3,4]
   * Output: [1,2,3,4] ✅ (No extra work!)
   */

  /**
   * EDGE CASE 5: Power of 2 Length
   * Input: n = 8
   *
   * Passes: log₂(8) = 3
   * - Size 1: 4 merges
   * - Size 2: 2 merges
   * - Size 4: 1 merge
   * Perfect binary divisions! ✅
   */

  /**
   * EDGE CASE 6: Non-Power of 2 Length
   * Input: n = 7
   *
   * Passes: ⌈log₂(7)⌉ = 3
   * - Size 1: 3 merges + 1 alone
   * - Size 2: 1 merge + 1 alone
   * - Size 4: 1 merge
   * Handles odd groups correctly! ✅
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY BOTTOM-UP IS O(1) SPACE
   * ════════════════════════════════════════════════════════════════
   *
   * Comparison with Recursive:
   * ──────────────────────────
   *
   * RECURSIVE (Top-Down):
   * - Uses function call stack
   * - Each recursive call adds to stack
   * - Max depth = log n
   * - Space: O(log n) ❌
   *
   * Example call stack for n=4:
   * ```
   * sortList([4,2,1,3])
   *   sortList([4,2])
   *     sortList([4])    ← Stack depth 3
   *   ...
   * ```
   *
   * ITERATIVE (Bottom-Up):
   * - Uses loops instead of recursion
   * - No call stack!
   * - Only variables: size, tail, current, etc.
   * - Space: O(1) ✅✅
   *
   * Example with same n=4:
   * ```
   * for (size = 1; size < 4; size *= 2)  ← Just a loop!
   *   // Merge operations
   * ```
   *
   * Key Difference:
   * ───────────────
   * Bottom-up "simulates" recursion with loops
   * but doesn't actually recurse!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * WHY SIZE DOUBLES?
   * ════════════════════════════════════════════════════════════════
   *
   * Binary Tree Structure:
   * ──────────────────────
   *
   * Recursive creates implicit binary tree:
   *
   *        [8 nodes]
   *       /        \
   *    [4]          [4]      ← Level 1 (size 4)
   *   /  \         /  \
   * [2]  [2]     [2]  [2]    ← Level 2 (size 2)
   * / \  / \     / \  / \
   *[1][1][1][1] [1][1][1][1] ← Level 3 (size 1)
   *
   * Iterative does SAME work, but bottom-up:
   *
   * Pass 1 (size=1): Merge all [1][1] pairs
   * Pass 2 (size=2): Merge all [2][2] pairs
   * Pass 3 (size=4): Merge all [4][4] pairs
   *
   * Number of passes = tree height = log n ✅
   *
   * Size doubling ensures we cover all levels!
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
   * 1. Number of passes: log n
   *    - Size: 1, 2, 4, 8, ..., n
   *    - Doubles each time
   *    - Total: log₂(n) passes
   *
   * 2. Work per pass: O(n)
   *    - Each node visited once per pass
   *    - Split: O(n) total
   *    - Merge: O(n) total
   *
   * 3. Total: O(n) × log n = O(n log n) ✅
   *
   * Example for n=8:
   * Pass 1: 8 nodes processed
   * Pass 2: 8 nodes processed
   * Pass 3: 8 nodes processed
   * Total: 8 × 3 = 24 = 8 log 8 ✅
   *
   * SPACE COMPLEXITY: O(1) ⭐⭐
   * ──────────────────────────
   *
   * Variables used:
   * 1. length: O(1)
   * 2. dummy: O(1)
   * 3. size: O(1)
   * 4. tail, current: O(1)
   * 5. In split/merge: left, right pointers: O(1)
   *
   * Total Extra Space: O(1) ✅✅
   *
   * No recursion, no arrays, no extra lists!
   * Pure pointer manipulation! ⭐
   *
   * Follow-up SATISFIED! ✅✅✅
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
    console.log('🧪 Testing Sort List - OPTIMAL (Iterative Bottom-Up)\n');
    console.log('⭐⭐ Uses O(1) space - Follow-up SATISFIED!\n');

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

    // Test Case 6: Five nodes (odd length)
    console.log('Test 6: Five nodes [5,3,1,4,2]');
    const list6 = createList([5, 3, 1, 4, 2]);
    const result6 = sortList(list6);
    const output6 = listToArray(result6);
    console.log('Input:    [5,3,1,4,2]');
    console.log('Expected: [1,2,3,4,5]');
    console.log('Got:      ', output6);
    console.log(
      '✅ Pass:',
      JSON.stringify(output6) === JSON.stringify([1, 2, 3, 4, 5])
    );
    console.log('---\n');

    // Test Case 7: Already sorted
    console.log('Test 7: Already sorted [1,2,3,4,5]');
    const list7 = createList([1, 2, 3, 4, 5]);
    const result7 = sortList(list7);
    const output7 = listToArray(result7);
    console.log('Input:    [1,2,3,4,5]');
    console.log('Expected: [1,2,3,4,5]');
    console.log('Got:      ', output7);
    console.log(
      '✅ Pass:',
      JSON.stringify(output7) === JSON.stringify([1, 2, 3, 4, 5])
    );
    console.log('---\n');

    // Test Case 8: Duplicates
    console.log('Test 8: Duplicates [3,1,3,2,1]');
    const list8 = createList([3, 1, 3, 2, 1]);
    const result8 = sortList(list8);
    const output8 = listToArray(result8);
    console.log('Input:    [3,1,3,2,1]');
    console.log('Expected: [1,1,2,3,3]');
    console.log('Got:      ', output8);
    console.log(
      '✅ Pass:',
      JSON.stringify(output8) === JSON.stringify([1, 1, 2, 3, 3])
    );
    console.log('---\n');

    console.log('✅ All tests completed!\n');
    console.log('📝 Summary:');
    console.log('   - Approach: Iterative Bottom-Up Merge Sort');
    console.log('   - Time Complexity: O(n log n) ✅');
    console.log('   - Space Complexity: O(1) ⭐⭐');
    console.log('   - Follow-up: SATISFIED! ✅✅');
    console.log('\n🎯 This is the OPTIMAL solution!');
    console.log('💡 No recursion, pure pointer manipulation!');
    console.log('💡 Perfect answer for interview follow-up question!');
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * 🔥 CRITICAL CONCEPT: Pointer/Reference Mechanics in Linked Lists
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Agar aap iterative merge sort ko samajhna chahte ho, toh sabse pehle
   * ye samajhna BOHOT ZAROORI hai ki JavaScript/TypeScript mein pointers
   * (references) kaise kaam karte hain!
   *
   * ─────────────────────────────────────────────────────────────────────
   * 📌 Concept 1: Objects Are Stored by Reference (Not by Value)
   * ─────────────────────────────────────────────────────────────────────
   *
   * JavaScript mein jab hum object create karte hain, toh variable mein
   * actual object nahi, balki us object ka REFERENCE (address) store hota hai.
   *
   * Example:
   * ```typescript
   * const node1 = new ListNode(1);  // Memory address: 0x001
   * const node2 = new ListNode(2);  // Memory address: 0x002
   *
   * node1.next = node2;  // node1 ke next mein node2 ka ADDRESS store hua
   * ```
   *
   * Memory Diagram:
   * ```
   * Variables:                Memory (Heap):
   * ┌─────────────┐          ┌──────────────────┐
   * │ node1: 0x001│ ────────>│ [val: 1]         │ (Address: 0x001)
   * └─────────────┘          │ [next: 0x002] ───┼───┐
   *                          └──────────────────┘   │
   * ┌─────────────┐                                  │
   * │ node2: 0x002│ ───────────────────────────────┘
   * └─────────────┘        ┌──────────────────┐
   *                          │ [val: 2]         │ (Address: 0x002)
   *                          │ [next: null]     │
   *                          └──────────────────┘
   * ```
   *
   * 🔑 Key Point: Jab hum `let tail = dummy` likhte hain, toh:
   * - tail mein dummy ka COPY nahi banta
   * - tail mein dummy ka REFERENCE copy hota hai
   * - Dono SAME object ko point karte hain!
   *
   * ─────────────────────────────────────────────────────────────────────
   * 📌 Concept 2: Modifying Through References
   * ─────────────────────────────────────────────────────────────────────
   *
   * Jab hum kisi reference ke through object modify karte hain,
   * toh actual object change hota hai (sab references ko dikhega)!
   *
   * Example:
   * ```typescript
   * const dummy = new ListNode(0);
   * let tail = dummy;  // tail and dummy point to SAME object
   *
   * tail.next = new ListNode(5);  // Modifying through tail
   *
   * console.log(dummy.next.val);  // Output: 5
   * // Kyunki dummy aur tail SAME object ko point kar rahe hain!
   * ```
   *
   * Memory Diagram:
   * ```
   * Initial:
   * ┌─────────────┐
   * │ dummy: 0x100│ ────┐
   * └─────────────┘     │    ┌──────────────────┐
   * ┌─────────────┐     └───>│ [val: 0]         │ (0x100)
   * │ tail: 0x100 │ ────────>│ [next: null]     │
   * └─────────────┘          └──────────────────┘
   *
   * After tail.next = new ListNode(5):
   * ┌─────────────┐
   * │ dummy: 0x100│ ────┐
   * └─────────────┘     │    ┌──────────────────┐
   * ┌─────────────┐     └───>│ [val: 0]         │ (0x100)
   * │ tail: 0x100 │ ────────>│ [next: 0x200] ───┼──┐
   * └─────────────┘          └──────────────────┘  │
   *                                                   │
   *                          ┌──────────────────┐   │
   *                          │ [val: 5]         │<─┘ (0x200)
   *                          │ [next: null]     │
   *                          └──────────────────┘
   *
   * Notice: dummy.next bhi 0x200 ko point kar raha hai!
   * ```
   *
   * ─────────────────────────────────────────────────────────────────────
   * 📌 Concept 3: Reassigning vs Modifying
   * ─────────────────────────────────────────────────────────────────────
   *
   * Ye BOHOT important difference hai! Carefully observe:
   *
   * ```typescript
   * let tail = dummy;
   *
   * // CASE 1: Modifying (dummy bhi change hoga)
   * tail.next = someNode;  // ✅ Modifies the object itself
   *
   * // CASE 2: Reassigning (dummy NAHI change hoga)
   * tail = someOtherNode;  // ⚠️ Only changes what tail points to!
   * ```
   *
   * Example with both:
   * ```typescript
   * const dummy = new ListNode(0);
   * let tail = dummy;
   *
   * tail.next = new ListNode(1);  // Modify: dummy affected ✅
   * console.log(dummy.next.val);  // Output: 1
   *
   * tail = tail.next;  // Reassign: dummy NOT affected
   * console.log(tail.val);        // Output: 1 (tail moved)
   * console.log(dummy.val);       // Output: 0 (dummy same)
   * ```
   *
   * Memory Diagram:
   * ```
   * After tail.next = new ListNode(1):
   * ┌─────────────┐
   * │ dummy: 0x100│ ────┐
   * └─────────────┘     │    ┌──────────────────┐
   * ┌─────────────┐     └───>│ [val: 0]         │ (0x100)
   * │ tail: 0x100 │ ────────>│ [next: 0x101] ───┼──┐
   * └─────────────┘          └──────────────────┘ │
   *                                                  │
   *                          ┌──────────────────┐  │
   *                          │ [val: 1]         │<─┘ (0x101)
   *                          │ [next: null]     │
   *                          └──────────────────┘
   *
   * After tail = tail.next:
   * ┌─────────────┐
   * │ dummy: 0x100│ ────────>┌──────────────────┐
   * └─────────────┘          │ [val: 0]          │ (0x100)
   *                          │ [next: 0x101] ───┼─────┐
   * ┌─────────────┐          └──────────────────┘   │
   * │ tail: 0x101 │ ────────────────────────────────┘
   * └─────────────┘          ┌──────────────────┐
   *                          │ [val: 1]         │ (0x101)
   *                          │ [next: null]     │
   *                          └──────────────────┘
   *
   * 🔑 Key: Now tail and dummy point to DIFFERENT nodes!
   * ```
   *
   * ═══════════════════════════════════════════════════════════════════════
   * 🎯 COMPLETE DRY RUN: First Iteration (Size = 1)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Input: 4 → 2 → 1 → 3
   * Goal: Merge adjacent pairs of size 1
   *
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │ INITIAL STATE (Before size=1 pass)                                  │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * List:  0 → 4 → 2 → 1 → 3 → null
   *        ↑   ↑
   *      dummy head
   *
   * Variables:
   * - dummy: points to node 0 (address: 0x100)
   * - tail: points to node 0 (address: 0x100) [SAME as dummy]
   * - current: points to node 4 (address: 0x101)
   *
   * Memory:
   * ```
   * 0x100: [val:0, next:0x101]  ← dummy, tail point here
   * 0x101: [val:4, next:0x102]  ← current points here
   * 0x102: [val:2, next:0x103]
   * 0x103: [val:1, next:0x104]
   * 0x104: [val:3, next:null]
   * ```
   *
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │ STEP 1: First Merge (4 and 2)                                       │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * 1a. Extract left and right:
   * ```
   * left = current               // node 4 (0x101)
   * right = split(left, 1)       // node 2 (0x102)
   * current = split(right, 1)    // node 1 (0x103)
   * ```
   *
   * After splits, connections are broken:
   * ```
   * Separate chains:
   * Chain 1: 0 → 4 → null       (dummy connected to isolated node 4)
   * Chain 2: 2 → null           (isolated node 2)
   * Chain 3: 1 → 3 → null       (current points here)
   * ```
   *
   * Memory after splits:
   * ```
   * 0x100: [val:0, next:0x101]  ← dummy, tail
   * 0x101: [val:4, next:null]   ← left (DISCONNECTED!)
   * 0x102: [val:2, next:null]   ← right (DISCONNECTED!)
   * 0x103: [val:1, next:0x104]  ← current points here
   * 0x104: [val:3, next:null]
   * ```
   *
   * 🔑 Critical: split() function ne connections tod diye!
   * - node 4.next = null
   * - node 2.next = null
   * - Ab ye isolated pieces hain jo merge karna hai
   *
   * 1b. Call merge(left=4, right=2, tail=node_0):
   * ```
   * Inside merge():
   * - current = tail (node 0 at 0x100)
   * - Compare: 4 vs 2
   *   - 2 is smaller
   *   - current.next = node 2  [Modifies 0x100's next!]
   *   - current = node 2       [Reassigns current variable]
   * - Only left (node 4) remains
   *   - current.next = node 4  [Modifies 0x102's next!]
   *   - current = node 4       [Reassigns current variable]
   * - Find tail: current already at last node (node 4)
   * - Return node 4 (0x101)
   * ```
   *
   * Memory after merge:
   * ```
   * 0x100: [val:0, next:0x102]  ← dummy still points here
   * 0x101: [val:4, next:null]   ← returned as new tail
   * 0x102: [val:2, next:0x101]  ← connected to node 4!
   * 0x103: [val:1, next:0x104]  ← current points here
   * 0x104: [val:3, next:null]
   * ```
   *
   * Reconstructed chains:
   * ```
   * Main list:  0 → 2 → 4 → null    (dummy ke through accessible)
   * Remaining:  1 → 3 → null        (current points here)
   * ```
   *
   * 1c. Call merge(left=4, right=2, tail=node_0):
   *
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │ 🔥 CRITICAL: merge() Function Ki Detailed Working                   │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * merge() function 3 parameters leta hai:
   * - l1 = node 4 (0x101) - first sorted list
   * - l2 = node 2 (0x102) - second sorted list
   * - tail = node 0 (0x100) - existing sorted portion ka end
   *
   * Step-by-Step Execution Inside merge():
   * ───────────────────────────────────────
   *
   * Initial State:
   * ```
   * let current = tail  // current = node 0 (0x100)
   * l1 = node 4 (0x101)
   * l2 = node 2 (0x102)
   * ```
   *
   * Memory Before Merge:
   * ```
   * 0x100: [val:0, next:0x101]  ← current points here
   * 0x101: [val:4, next:null]   ← l1 points here
   * 0x102: [val:2, next:null]   ← l2 points here
   * ```
   *
   * ─────────────────────────────────────────────────────────────────────
   * ITERATION 1: Compare l1.val (4) vs l2.val (2)
   * ─────────────────────────────────────────────────────────────────────
   *
   * Comparison: 4 vs 2
   * - 2 is smaller! ✅
   * - Action: Attach node 2 to current
   *
   * Code Executed:
   * ```typescript
   * current.next = l2;  // MODIFY: node 0's next = node 2 (0x102)
   * l2 = l2.next;       // REASSIGN: l2 = null
   * current = current.next;  // REASSIGN: current = node 2 (0x102)
   * ```
   *
   * Memory After Iteration 1:
   * ```
   * 0x100: [val:0, next:0x102]  ← node 0's next MODIFIED to 0x102!
   * 0x101: [val:4, next:null]   ← l1 still here
   * 0x102: [val:2, next:null]   ← current now points here
   * ```
   *
   * Visual After Iteration 1:
   * ```
   * node 0 ──> node 2 ──> null
   *            ↑
   *          current
   *
   * l1 = node 4 (still available)
   * l2 = null (exhausted)
   * ```
   *
   * 🔑 Critical Insight:
   * - `current.next = l2` ne node 0 ka next pointer CHANGE kar diya!
   * - Ye PERMANENT modification hai memory mein
   * - dummy variable bhi is change ko dekh sakta hai (same object!)
   *
   * ─────────────────────────────────────────────────────────────────────
   * WHILE LOOP EXIT: l2 is null
   * ─────────────────────────────────────────────────────────────────────
   *
   * Check: while (l1 !== null && l2 !== null)
   * - l1 = node 4 (not null)
   * - l2 = null ❌
   * - Loop exits!
   *
   * ─────────────────────────────────────────────────────────────────────
   * ATTACH REMAINING: l1 still has nodes
   * ─────────────────────────────────────────────────────────────────────
   *
   * Code Executed:
   * ```typescript
   * if (l1 !== null) {
   *   current.next = l1;  // Attach remaining l1
   * }
   * ```
   *
   * Action: current.next = node 4
   * - current = node 2 (0x102)
   * - current.next = node 4 (0x101)
   *
   * Memory After Attaching:
   * ```
   * 0x100: [val:0, next:0x102]
   * 0x101: [val:4, next:null]
   * 0x102: [val:2, next:0x101]  ← MODIFIED! Now points to node 4
   * ```
   *
   * Chain Formed:
   * ```
   * 0 → 2 → 4 → null
   * ```
   *
   * ─────────────────────────────────────────────────────────────────────
   * FIND NEW TAIL: Last node ko dhundo
   * ─────────────────────────────────────────────────────────────────────
   *
   * Current State: current = node 2 (0x102)
   *
   * Code Executed:
   * ```typescript
   * while (current.next !== null) {
   *   current = current.next;
   * }
   * ```
   *
   * Iteration:
   * - current.next = node 4 (not null)
   * - current = node 4 (0x101)
   * - current.next = null
   * - Loop exits!
   *
   * Final: current = node 4 (0x101) ← This is the last node!
   *
   * ─────────────────────────────────────────────────────────────────────
   * RETURN NEW TAIL
   * ─────────────────────────────────────────────────────────────────────
   *
   * ```typescript
   * return current;  // Returns node 4 (0x101)
   * ```
   *
   * ═════════════════════════════════════════════════════════════════════
   * Back to Main Function:
   * ═════════════════════════════════════════════════════════════════════
   *
   * 1d. Update tail:
   * ```typescript
   * tail = merge(...)  // Returns node 4 (0x101)
   * ```
   *
   * Now State Update:
   * - dummy: 0x100 (pointing to node 0) [UNCHANGED]
   * - tail: 0x101 (pointing to node 4) [UPDATED - DIFFERENT from dummy!]
   * - current: 0x103 (pointing to node 1)
   *
   * Full List After First Merge:
   * ```
   * dummy ──────> [0] ──> [2] ──> [4] ──> null
   *                                ↑
   *                               tail
   * ```
   *
   * 🔑 KEY INSIGHTS:
   *
   * 1️⃣ **merge() function returns the LAST node of merged portion**
   *    - Not the head!
   *    - Ye important hai kyunki next merge isi se continue hoga
   *
   * 2️⃣ **tail variable ka purpose:**
   *    - Track karta hai ki sorted portion ka LAST node kaun hai
   *    - Next merge isi node se start hoga (attach at tail.next)
   *
   * 3️⃣ **dummy variable ka purpose:**
   *    - ALWAYS puri list ka head track karta hai
   *    - Kabhi move nahi hota!
   *    - Final answer: dummy.next
   *
   * 4️⃣ **Modifications happen through references:**
   *    - Jab merge() mein current.next modify karte hain
   *    - Wo actual memory location modify hota hai
   *    - dummy ke through bhi wo modification visible hai
   *    - Kyunki dummy aur current SAME nodes ko point karte hain (different positions)
   *
   * 5️⃣ **Why tail and dummy are DIFFERENT after merge:**
   *    - dummy: Points to node 0 (START of list)
   *    - tail: Points to node 4 (END of merged portion)
   *    - But they are CONNECTED through .next pointers!
   *
   * Visual Summary:
   * ```
   * Variables:              Linked List in Memory:
   *
   * dummy (0x100) ────────> [0] ──> [2] ──> [4] ──> null
   *                                           ↑
   * tail (0x101) ───────────────────────────┘
   *
   * current (0x103) ──────> [1] ──> [3] ──> null (remaining to merge)
   * ```
   *
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │ STEP 2: Second Merge (1 and 3)                                      │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * Ab while loop continue hota hai kyunki current !== null (node 1 hai)
   *
   * 2a. Extract left and right:
   * ```
   * left = current               // node 1 (0x103)
   * right = split(left, 1)       // node 3 (0x104)
   * current = split(right, 1)    // null (no more nodes!)
   * ```
   *
   * After splits:
   * ```
   * Chain 1: 0 → 2 → 4 → null   (already merged)
   * Chain 2: 1 → null           (left)
   * Chain 3: 3 → null           (right)
   * ```
   *
   * 2b. Call merge(left=1, right=3, tail=node_4):
   * ```
   * Inside merge():
   * - current = tail (node 4 at 0x101)
   * - Compare: 1 vs 3
   *   - 1 is smaller
   *   - current.next = node 1  [Connects node 4 to node 1!]
   *   - current = node 1       [Reassigns]
   * - Only right (node 3) remains
   *   - current.next = node 3  [Connects node 1 to node 3!]
   *   - current = node 3       [Reassigns]
   * - Find tail: current already at last node (node 3)
   * - Return node 3 (0x104)
   * ```
   *
   * Memory after second merge:
   * ```
   * 0x100: [val:0, next:0x102]  ← dummy
   * 0x101: [val:4, next:0x103]  ← now connected to node 1!
   * 0x102: [val:2, next:0x101]
   * 0x103: [val:1, next:0x104]
   * 0x104: [val:3, next:null]   ← new tail
   * ```
   *
   * Full chain:
   * ```
   * dummy ──> 0 → 2 → 4 → 1 → 3 → null
   *                           ↑
   *                          tail
   * ```
   *
   * 2c. Update tail and current:
   * ```
   * tail = merge(...)  // Returns node 3 (0x104)
   * current = null     // While loop will exit
   * ```
   *
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │ END OF SIZE=1 PASS                                                   │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * Final state after size=1 pass:
   * ```
   * List: 0 → 2 → 4 → 1 → 3 → null
   *       ↑               ↑
   *     dummy            tail
   * ```
   *
   * Notice:
   * - Pairs are sorted: (2,4) sorted, (1,3) sorted
   * - But full list NOT sorted yet!
   * - Next pass (size=2) will merge (2,4) with (1,3)
   *
   * ═══════════════════════════════════════════════════════════════════════
   * 🎓 KEY LEARNINGS
   * ═══════════════════════════════════════════════════════════════════════
   *
   * 1️⃣ **tail variable ka role:**
   *    - Ye track karta hai ki current sorted portion ka LAST node kaun hai
   *    - Next merge isi se start hoga (attach here)
   *    - Har merge ke baad, tail naye last node pe move ho jata hai
   *
   * 2️⃣ **dummy variable ka role:**
   *    - Ye ALWAYS puri list ka head maintain karta hai
   *    - Final answer mein dummy.next return karenge
   *    - dummy kabhi move nahi hota!
   *
   * 3️⃣ **Pointer modifications:**
   *    - Jab `current.next = someNode` likhte hain:
   *      → Actual node object ka next pointer change hota hai
   *      → Ye permanent modification hai
   *      → dummy ke through bhi dikhai dega!
   *    - Jab `current = someNode` likhte hain:
   *      → Sirf variable reassign hota hai
   *      → Actual nodes unchanged
   *      → dummy unaffected
   *
   * 4️⃣ **Why printLinkedList(tail) shows partial list?**
   *    - tail ek specific node ko point karta hai (last merged node)
   *    - Print function us node se START karke print karta hai
   *    - Us node ke BAAD jo bhi hai wo print hoga
   *    - Isliye partial list dikhta hai!
   *
   * 5️⃣ **How dummy stays connected?**
   *    - Hum tail ke through modifications karte hain
   *    - But ye modifications actual memory mein hote hain
   *    - dummy.next bhi un modified nodes ko point karta hai
   *    - Isliye dummy ke through FULL list accessible rehti hai!
   *
   * ═══════════════════════════════════════════════════════════════════════
   * 💡 MENTAL MODEL
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Linked list ko railway track ki tarah socho:
   *
   * ```
   * dummy = Station ka entrance gate (fixed position)
   * tail = Construction worker (moves forward)
   * current = Pointer to next section to build
   * ```
   *
   * Process:
   * 1. Worker (tail) khade hain entrance gate pe (dummy)
   * 2. Next 2 sections (left, right) leke aate hain
   * 3. Unhe sort karke worker ki current position se attach karte hain
   * 4. Worker last attached section pe move ho jata hai
   * 5. Next sections leke repeat
   * 6. End mein entrance gate se full sorted track accessible hai!
   *
   * ```
   * Initial:
   * [Dummy] ──┐
   *           ├──> [4] → [2] → [1] → [3]
   *        [Tail]
   *
   * After merge(4,2):
   * [Dummy] ──> [2] ──> [4] ──┐
   *                          [Tail]
   *
   * After merge(1,3):
   * [Dummy] ──> [2] ──> [4] ──> [1] ──> [3] ──┐
   *                                          [Tail]
   * ```
   *
   * 🎯 Ab aap samajh gaye ho ki tail kaise move karta hai aur dummy
   * kaise full list maintain karta hai! Practice karte raho! 💪
   */
}

// Run the tests
SortListOptimal.runTests();