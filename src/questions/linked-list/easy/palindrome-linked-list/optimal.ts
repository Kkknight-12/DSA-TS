/**
 * Palindrome Linked List - Optimal Approach
 *
 * Problem: Check if a singly linked list is a palindrome.
 *
 * Approach: Find middle, reverse second half, compare both halves
 *
 * Time Complexity: O(n) - traverse list to find middle + reverse + compare
 * Space Complexity: O(1) - only pointers used ✅ Follow-up satisfied!
 *
 * Where n = number of nodes in linked list
 */

namespace PalindromeLinkedListOptimal {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Main function: Check if linked list is palindrome using O(1) space
   *
   * Strategy: Three Phases
   * Phase 1: Find middle of list (slow-fast pointer technique)
   * Phase 2: Reverse second half of list
   * Phase 3: Compare first half with reversed second half
   * Phase 4: (Optional) Restore list to original state
   */
  function isPalindrome(head: ListNode | null): boolean {
    // EDGE CASE 1: Empty list or single node
    // Both are considered palindromes
    if (head === null || head.next === null) {
      return true;
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 1: FIND MIDDLE OF LIST (Slow-Fast Pointer Technique)
    // ═══════════════════════════════════════════════════════════════

    // WHY: We need to know where second half starts
    // Slow pointer moves 1 step, Fast pointer moves 2 steps
    // When fast reaches end, slow will be at middle

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // Move slow 1 step and fast 2 steps until fast reaches end
    // WHY fast.next check: Fast takes 2 steps, so check both fast and fast.next
    while (fast !== null && fast.next !== null) {
      slow = slow!.next; // Slow moves 1 step
      fast = fast.next.next; // Fast moves 2 steps
    }

    // After loop:
    // - For EVEN length: slow is at START of second half
    // - For ODD length: slow is at MIDDLE element (skip it for comparison)

    // ═══════════════════════════════════════════════════════════════
    // PHASE 2: REVERSE SECOND HALF OF LIST
    // ═══════════════════════════════════════════════════════════════

    // WHY: We need to traverse second half backward to compare with first half
    // Since singly linked list can't go backward, we reverse it!

    // Start reversing from slow (second half start)
    let prev: ListNode | null = null;
    let current: ListNode | null = slow;

    // Standard linked list reversal
    while (current !== null) {
      // STEP 1: Save next node (before we break the link)
      const nextNode: ListNode | null = current.next;

      // STEP 2: Reverse the link (point backward)
      current.next = prev;

      // STEP 3: Move prev forward
      prev = current;

      // STEP 4: Move current forward using saved next
      current = nextNode;
    }

    // After reversal: prev points to new head of reversed second half

    // ═══════════════════════════════════════════════════════════════
    // PHASE 3: COMPARE FIRST HALF WITH REVERSED SECOND HALF
    // ═══════════════════════════════════════════════════════════════

    // WHY: If palindrome, both halves should match
    // For odd length, we automatically ignore middle (it's not in second half)

    let firstHalf: ListNode | null = head; // Start of first half
    let secondHalf: ListNode | null = prev; // Start of reversed second half

    // Compare node by node
    // WHY check only secondHalf: Second half is smaller or equal in length
    while (secondHalf !== null) {
      // CHECK: Do values match?
      if (firstHalf!.val !== secondHalf.val) {
        // Mismatch found! Not a palindrome
        // Note: We should restore list here (Phase 4) before returning
        // But for simplicity, we return false directly
        return false;
      }

      // Values match, move both pointers forward
      firstHalf = firstHalf!.next;
      secondHalf = secondHalf.next;
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 4 (OPTIONAL): RESTORE LIST TO ORIGINAL STATE
    // ═══════════════════════════════════════════════════════════════

    // WHY: Good practice to not modify input
    // If problem says "don't modify list", this is required
    // We need to reverse second half again to restore

    // Note: Implementing restoration is good practice but not always required
    // For interview, mention that you would restore if needed

    // If we reached here, all comparisons passed
    // List is a palindrome!
    return true;
  }

  /**
   * Enhanced version with restoration
   * This version properly restores the list after checking
   */
  // function isPalindromeWithRestore(head: ListNode | null): boolean {
  //   if (head === null || head.next === null) {
  //     return true;
  //   }
  //
  //   // PHASE 1: Find middle
  //   let slow: ListNode | null = head;
  //   let fast: ListNode | null = head;
  //
  //   while (fast !== null && fast.next !== null) {
  //     slow = slow!.next;
  //     fast = fast.next.next;
  //   }
  //
  //   // PHASE 2: Reverse second half
  //   let prev: ListNode | null = null;
  //   let current: ListNode | null = slow;
  //
  //   while (current !== null) {
  //     const nextNode = current.next;
  //     current.next = prev;
  //     prev = current;
  //     current = nextNode;
  //   }
  //
  //   // Save reference to reversed second half head for restoration
  //   const secondHalfHead = prev;
  //
  //   // PHASE 3: Compare
  //   let firstHalf: ListNode | null = head;
  //   let secondHalf: ListNode | null = prev;
  //   let isPalin = true; // Assume palindrome, prove otherwise
  //
  //   while (secondHalf !== null) {
  //     if (firstHalf!.val !== secondHalf.val) {
  //       isPalin = false;
  //       break; // Found mismatch
  //     }
  //     firstHalf = firstHalf!.next;
  //     secondHalf = secondHalf.next;
  //   }
  //
  //   // PHASE 4: Restore (reverse second half again)
  //   prev = null;
  //   current = secondHalfHead;
  //
  //   while (current !== null) {
  //     const nextNode = current.next;
  //     current.next = prev;
  //     prev = current;
  //     current = nextNode;
  //   }
  //
  //   // Note: In production, you'd reconnect the halves properly
  //   // For this problem, we just return the result
  //
  //   return isPalin;
  // }

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Input: [1, 2, 2, 1] (Even length palindrome)
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *    ↑
   *   head
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 1: FIND MIDDLE (Slow-Fast Pointers)
   * ═════════════════════════════════════════════════════════════════
   *
   * Initial:
   *   slow = head (node 1)
   *   fast = head (node 1)
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 1:
   * ─────────────────────────────────────────────────────────────────
   * Before move:
   *   slow at: 1
   *   fast at: 1
   *
   * Check: fast !== null && fast.next !== null?
   *   true && true? YES
   *
   * Move:
   *   slow = slow.next → moves to 2 (first occurrence)
   *   fast = fast.next.next → moves to 2 (second occurrence)
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                 ↑              ↑
   *               slow           fast
   *
   * ─────────────────────────────────────────────────────────────────
   * Iteration 2:
   * ─────────────────────────────────────────────────────────────────
   * Before move:
   *   slow at: 2 (first occurrence)
   *   fast at: 2 (second occurrence)
   *
   * Check: fast !== null && fast.next !== null?
   *   true && true? YES
   *
   * Move:
   *   slow = slow.next → moves to 2 (second occurrence)
   *   fast = fast.next.next → moves to null
   *
   * Visual:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *                              ↑              ↑
   *                            slow          fast=null
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check:
   * ─────────────────────────────────────────────────────────────────
   * Check: fast !== null && fast.next !== null?
   *   null !== null? NO!
   *
   * Loop ends. slow is at node with value 2 (second occurrence)
   * This is the START of second half!
   *
   * Result: Middle found at second 2
   * First half: 1 → 2 (first occurrence)
   * Second half: 2 (second occurrence) → 1
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 2: REVERSE SECOND HALF
   * ═════════════════════════════════════════════════════════════════
   *
   * Starting point: slow = node(2) second occurrence
   *
   * Initial:
   *   prev = null
   *   current = slow (node with value 2, second occurrence)
   *
   * List state before reversal:
   * First half (unchanged): 1 → 2
   * Second half (to reverse): 2 → 1 → null
   *
   * ─────────────────────────────────────────────────────────────────
   * Reversal Iteration 1: Processing node(2) second occurrence
   * ─────────────────────────────────────────────────────────────────
   * current = node(2) second occurrence
   * prev = null
   *
   * Step 1: nextNode = current.next = node(1)
   * Step 2: current.next = prev → node(2).next = null
   * Step 3: prev = current → prev = node(2)
   * Step 4: current = nextNode → current = node(1)
   *
   * State after iteration 1:
   *   Reversed so far: 2 → null
   *   Remaining: 1 → null
   *
   * ─────────────────────────────────────────────────────────────────
   * Reversal Iteration 2: Processing node(1)
   * ─────────────────────────────────────────────────────────────────
   * current = node(1)
   * prev = node(2)
   *
   * Step 1: nextNode = current.next = null
   * Step 2: current.next = prev → node(1).next = node(2)
   * Step 3: prev = current → prev = node(1)
   * Step 4: current = nextNode → current = null
   *
   * State after iteration 2:
   *   Reversed second half: 1 → 2 → null
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check:
   * ─────────────────────────────────────────────────────────────────
   * current === null? YES!
   * Loop ends
   *
   * Final state:
   *   prev = node(1) ← This is the head of reversed second half!
   *
   * Complete state:
   *   First half (original): 1 → 2
   *   Second half (reversed): 1 → 2 → null
   *
   * Visual:
   * First Half:        Second Half (Reversed):
   * ┌───┬────┐   ┌───┬────┐       ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2  │ ...│       │ 1 │ ●──┼──→│ 2 │null │
   * └───┴────┘   └───┴────┘       └───┴────┘   └───┴────┘
   *    ↑                              ↑
   *  head                           prev
   *
   * ═════════════════════════════════════════════════════════════════
   * PHASE 3: COMPARE BOTH HALVES
   * ═════════════════════════════════════════════════════════════════
   *
   * Setup:
   *   firstHalf = head = node(1) first occurrence
   *   secondHalf = prev = node(1) second occurrence
   *
   * ─────────────────────────────────────────────────────────────────
   * Comparison 1:
   * ─────────────────────────────────────────────────────────────────
   * firstHalf at: 1 (first occurrence)
   * secondHalf at: 1 (second occurrence)
   *
   * Check: firstHalf.val === secondHalf.val?
   *   1 === 1? YES! ✅
   *
   * Move both pointers:
   *   firstHalf = firstHalf.next → node(2) first occurrence
   *   secondHalf = secondHalf.next → node(2) second occurrence
   *
   * Visual:
   * First:  1 → 2
   *         ↑
   *        matched
   *
   * Second: 1 → 2
   *         ↑
   *        matched
   *
   * ─────────────────────────────────────────────────────────────────
   * Comparison 2:
   * ─────────────────────────────────────────────────────────────────
   * firstHalf at: 2 (first occurrence)
   * secondHalf at: 2 (second occurrence)
   *
   * Check: firstHalf.val === secondHalf.val?
   *   2 === 2? YES! ✅
   *
   * Move both pointers:
   *   firstHalf = firstHalf.next → some node or null
   *   secondHalf = secondHalf.next → null
   *
   * Visual:
   * First:  1 → 2 →
   *             ↑
   *           matched
   *
   * Second: 1 → 2 → null
   *             ↑
   *           matched
   *
   * ─────────────────────────────────────────────────────────────────
   * Loop Check:
   * ─────────────────────────────────────────────────────────────────
   * Check: secondHalf !== null?
   *   null !== null? NO!
   *
   * Loop ends
   *
   * ═════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═════════════════════════════════════════════════════════════════
   *
   * All comparisons passed!
   * No mismatches found
   *
   * Return: true ✅
   * The list [1, 2, 2, 1] is a PALINDROME!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - ODD LENGTH EXAMPLE
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Input: [1, 2, 3, 2, 1] (Odd length palindrome)
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *
   * PHASE 1: Find Middle
   * After slow-fast: slow stops at node(3) - the MIDDLE element
   *
   * PHASE 2: Reverse Second Half
   * Second half starts from slow = node(3)
   * Reverse: 3 → 2 → 1 becomes 1 → 2 → 3
   *
   * PHASE 3: Compare
   * First half: 1 → 2 → (stops before 3)
   * Second half: 1 → 2 → 3 (but we only compare first 2)
   *
   * Comparisons:
   *   1 === 1 ✅
   *   2 === 2 ✅
   *   (3 is middle, automatically ignored)
   *
   * Result: true ✅ PALINDROME!
   *
   * Key Point: For odd length, middle element is automatically
   * excluded from comparison because second half is smaller!
   */

  /**
   * ════════════════════════════════════════════════════════════════
   * DRY RUN - NOT PALINDROME EXAMPLE
   * ════════════════════════════════════════════════════════════════
   *
   * Example: Input: [1, 2, 3] (Not palindrome)
   *
   * Initial List:
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │null│
   * └───┴────┘   └───┴────┘   └───┴────┘
   *
   * PHASE 1: Find Middle
   * slow stops at: node(2)
   *
   * PHASE 2: Reverse Second Half
   * Second half: 2 → 3 becomes 3 → 2
   *
   * PHASE 3: Compare
   * First half: 1 → (from head)
   * Second half: 3 → 2 (reversed)
   *
   * Comparison 1:
   *   firstHalf.val = 1
   *   secondHalf.val = 3
   *   1 === 3? NO! ❌
   *
   * Mismatch found immediately!
   *
   * Return: false ❌ NOT PALINDROME!
   */

  /**
   * ================================
   * ITERATION TABLE - EVEN LENGTH [1,2,2,1]
   * ================================
   */
  /*
   * PHASE 1: FIND MIDDLE
   * | Iteration | slow position | fast position | Condition met? | Action       |
   * |-----------|---------------|---------------|----------------|--------------|
   * | Initial   | 1             | 1             | -              | Setup        |
   * | 1         | 1             | 1             | Yes            | Move both    |
   * | After 1   | 2 (1st)       | 2 (2nd)       | -              | -            |
   * | 2         | 2 (1st)       | 2 (2nd)       | Yes            | Move both    |
   * | After 2   | 2 (2nd)       | null          | -              | -            |
   * | Check     | 2 (2nd)       | null          | No (fast=null) | Stop         |
   *
   * Result: slow at node(2) second occurrence = start of second half
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * PHASE 2: REVERSE SECOND HALF [2,1]
   * | Iteration | current | prev | nextNode | Action          | Result     |
   * |-----------|---------|------|----------|-----------------|------------|
   * | 1         | 2       | null | 1        | Reverse link    | 2→null     |
   * | 2         | 1       | 2    | null     | Reverse link    | 1→2→null   |
   * | Check     | null    | 1    | -        | Stop            | Done       |
   *
   * Result: prev = head of reversed half = node(1) second occurrence
   *
   * ─────────────────────────────────────────────────────────────────
   *
   * PHASE 3: COMPARE
   * | Comparison | firstHalf | secondHalf | first.val | second.val | Match? |
   * |------------|-----------|------------|-----------|------------|--------|
   * | 1          | 1 (1st)   | 1 (2nd)    | 1         | 1          | ✅ Yes |
   * | 2          | 2 (1st)   | 2 (2nd)    | 2         | 2          | ✅ Yes |
   * | Check      | ...       | null       | -         | -          | Stop   |
   *
   * Result: true (all matched)
   */

  /**
   * ================================
   * EDGE CASES
   * ================================
   */

  /**
   * EDGE CASE 1: Empty list
   * Input: null
   *
   * Check: head === null? YES
   * Return: true (immediately from first check)
   */

  /**
   * EDGE CASE 2: Single node
   * Input: [1]
   *
   * ┌───┬────┐
   * │ 1 │null│
   * └───┴────┘
   *
   * Check: head.next === null? YES
   * Return: true (immediately from first check)
   *
   * Why palindrome? Single element reads same forward/backward
   */

  /**
   * EDGE CASE 3: Two nodes - palindrome
   * Input: [1, 1]
   *
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 1 │null│
   * └───┴────┘   └───┴────┘
   *
   * Phase 1: slow stops at second node(1)
   * Phase 2: Reverse [1] → still [1]
   * Phase 3: Compare first(1) with second(1) → 1===1 ✅
   *
   * Return: true
   */

  /**
   * EDGE CASE 4: Two nodes - not palindrome
   * Input: [1, 2]
   *
   * ┌───┬────┐   ┌───┬────┐
   * │ 1 │ ●──┼──→│ 2 │null│
   * └───┴────┘   └───┴────┘
   *
   * Phase 1: slow stops at node(2)
   * Phase 2: Reverse [2] → still [2]
   * Phase 3: Compare first(1) with second(2) → 1===2? NO ❌
   *
   * Return: false
   */

  /**
   * EDGE CASE 5: All same values
   * Input: [5, 5, 5, 5]
   *
   * ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
   * │ 5 │ ●──┼──→│ 5  │ ●──┼──→│ 5 │ ●──┼──→│ 5  │null│
   * └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
   *
   * Phase 1: slow at 3rd node(5)
   * Phase 2: Reverse second half
   * Phase 3: All comparisons: 5===5 always ✅
   *
   * Return: true (all same = automatic palindrome)
   */

  /**
   * EDGE CASE 6: Long even palindrome
   * Input: [1,2,3,4,4,3,2,1]
   *
   * First half: 1,2,3,4
   * Second half reversed: 1,2,3,4
   * All match ✅
   *
   * Return: true
   */

  /**
   * EDGE CASE 7: Long odd palindrome
   * Input: [1,2,3,4,5,4,3,2,1]
   *
   * Middle: 5 (automatically ignored)
   * First half: 1,2,3,4
   * Second half reversed: 1,2,3,4
   * All match ✅
   *
   * Return: true
   */

  /**
   * ================================
   * WHY THIS APPROACH WORKS
   * ================================
   *
   * Key Insights:
   *
   * 1. Palindrome Definition:
   *    - First half = Mirror of second half
   *    - [1,2,3,2,1] → first[1,2] mirrors second[2,1]
   *
   * 2. Singly Linked List Challenge:
   *    - Can't traverse backward
   *    - Solution: Reverse second half to "simulate" backward traversal
   *
   * 3. Finding Middle:
   *    - Slow-fast pointers automatically find middle
   *    - Even length: slow at start of second half
   *    - Odd length: slow at middle element (which we skip)
   *
   * 4. O(1) Space Achievement:
   *    - No extra array
   *    - Only pointers used
   *    - In-place reversal
   *
   * 5. Even vs Odd Handling:
   *    - Even: Compare all nodes from both halves
   *    - Odd: Second half is smaller (middle excluded automatically)
   *
   * Visual Proof:
   *
   * Original: 1 → 2 → 3 → 2 → 1
   *
   * After finding middle and reversing:
   * First:  1 → 2 → [3]
   * Second: 1 → 2 → 3 (reversed from 3→2→1)
   *
   * Compare: 1==1 ✅, 2==2 ✅
   * Middle 3 not compared (second half has only 2 nodes after middle)
   *
   * Result: Palindrome! ✅
   */

  /**
   * ================================
   * COMPLEXITY ANALYSIS
   * ================================
   *
   * Time Complexity: O(n)
   * - Phase 1 (Find middle): O(n/2) - slow goes n/2 steps
   * - Phase 2 (Reverse): O(n/2) - reverse n/2 nodes
   * - Phase 3 (Compare): O(n/2) - compare n/2 pairs
   * - Total: O(n/2 + n/2 + n/2) = O(3n/2) = O(n)
   *
   * Space Complexity: O(1) ✅
   * - prev, current, slow, fast, firstHalf, secondHalf: 6 pointers
   * - All are constant space (don't grow with input)
   * - No arrays, no recursion (no call stack)
   * - Total: O(1) - Follow-up satisfied!
   *
   * Comparison with Brute Force:
   * | Metric | Brute Force | Optimal |
   * |--------|-------------|---------|
   * | Time   | O(n)        | O(n)    |
   * | Space  | O(n)        | O(1) ✅ |
   */

  /**
   * ================================
   * PROS AND CONS
   * ================================
   *
   * ✅ Advantages:
   * 1. O(1) space - Follow-up requirement satisfied! ⭐
   * 2. No extra data structures needed
   * 3. Optimal solution for interviews
   * 4. Shows mastery of:
   *    - Slow-fast pointer technique
   *    - Linked list reversal
   *    - Two-pointer comparison
   *
   * ❌ Disadvantages:
   * 1. Temporarily modifies the list
   * 2. More complex than array approach
   * 3. Need to implement reversal correctly
   * 4. Requires understanding of multiple techniques
   * 5. Should restore list (Phase 4) for production
   *
   * When to use:
   * - ✅ Interview asks for O(1) space
   * - ✅ Space is constrained
   * - ✅ Want to show optimal thinking
   * - ❌ Need simplest solution (use brute force)
   * - ❌ List must never be modified (use brute force)
   */

  /**
   * ================================
   * COMMON MISTAKES
   * ================================
   */

  /**
   * MISTAKE 1: Not handling even vs odd correctly
   *
   * ❌ WRONG: Trying to skip middle manually for odd
   * if (isOddLength) {
   *   slow = slow.next;  // Manually skip middle
   * }
   *
   * Problem: This complicates code and isn't needed!
   *
   * ✅ CORRECT: Natural handling
   * // Just reverse from slow
   * // For odd: second half is smaller (middle excluded)
   * // For even: second half is exact mirror
   * // Comparison loop naturally handles both!
   */

  /**
   * MISTAKE 2: Wrong reversal (losing reference)
   *
   * ❌ WRONG:
   * while (current !== null) {
   *   current.next = prev;  // Forgot to save next!
   *   prev = current;
   *   current = current.next;  // This is now prev! Lost reference!
   * }
   *
   * Problem: Lost reference to rest of list
   *
   * ✅ CORRECT:
   * while (current !== null) {
   *   const nextNode = current.next;  // Save first!
   *   current.next = prev;
   *   prev = current;
   *   current = nextNode;  // Use saved reference
   * }
   */

  /**
   * MISTAKE 3: Comparing wrong lengths
   *
   * ❌ WRONG:
   * while (firstHalf !== null && secondHalf !== null) {
   *   // Compare...
   * }
   *
   * Problem: For odd length, firstHalf is longer!
   * You'll try to compare beyond what you should
   *
   * ✅ CORRECT:
   * while (secondHalf !== null) {  // Check only secondHalf
   *   // Compare...
   * }
   * // Second half is always smaller or equal
   */

  /**
   * MISTAKE 4: Not finding middle correctly
   *
   * ❌ WRONG:
   * while (fast.next !== null) {  // Missing fast !== null check
   *   slow = slow.next;
   *   fast = fast.next.next;  // Can crash if fast is null!
   * }
   *
   * Problem: If list has even length, fast becomes null
   * Then fast.next crashes!
   *
   * ✅ CORRECT:
   * while (fast !== null && fast.next !== null) {
   *   slow = slow.next;
   *   fast = fast.next.next;  // Safe now
   * }
   */

  /**
   * MISTAKE 5: Forgetting to restore list
   *
   * ❌ BAD PRACTICE (in production):
   * // Just return result without restoring
   * return isPalindrome;
   *
   * Problem: List remains modified!
   * Next operation on list will see reversed second half
   *
   * ✅ GOOD PRACTICE:
   * // Reverse second half again to restore
   * // Then return result
   * // (See isPalindromeWithRestore function)
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('=== Palindrome Linked List - Optimal (O(1) Space) ===\n');

    // Helper function to create linked list from array
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

    // Helper function to print list
    // function printList(head: ListNode | null): string {
    //   if (head === null) return '[]';
    //
    //   const values: number[] = [];
    //   let current: ListNode | null = head;
    //
    //   while (current !== null) {
    //     values.push(current.val);
    //     current = current.next;
    //   }
    //
    //   return `[${values.join(',')}]`;
    // }

    // Test 1: Even length palindrome
    console.log('Test 1: Even length palindrome');
    console.log('Input: [1,2,2,1]');
    const list1 = createList([1, 2, 2, 1]);
    const result1 = isPalindrome(list1);
    console.log('Expected: true');
    console.log('Got:', result1);
    console.log('Test Pass:', result1 === true);
    console.log('---\n');

    // Test 2: Not palindrome
    console.log('Test 2: Not palindrome');
    console.log('Input: [1,2]');
    const list2 = createList([1, 2]);
    const result2 = isPalindrome(list2);
    console.log('Expected: false');
    console.log('Got:', result2);
    console.log('Test Pass:', result2 === false);
    console.log('---\n');

    // Test 3: Single node
    console.log('Test 3: Single node');
    console.log('Input: [1]');
    const list3 = createList([1]);
    const result3 = isPalindrome(list3);
    console.log('Expected: true');
    console.log('Got:', result3);
    console.log('Test Pass:', result3 === true);
    console.log('---\n');

    // Test 4: Empty list
    console.log('Test 4: Empty list');
    console.log('Input: []');
    const list4 = createList([]);
    const result4 = isPalindrome(list4);
    console.log('Expected: true');
    console.log('Got:', result4);
    console.log('Test Pass:', result4 === true);
    console.log('---\n');

    // Test 5: Odd length palindrome
    console.log('Test 5: Odd length palindrome');
    console.log('Input: [1,2,3,2,1]');
    const list5 = createList([1, 2, 3, 2, 1]);
    const result5 = isPalindrome(list5);
    console.log('Expected: true');
    console.log('Got:', result5);
    console.log('Test Pass:', result5 === true);
    console.log('---\n');

    // Test 6: All same values
    console.log('Test 6: All same values');
    console.log('Input: [5,5,5,5]');
    const list6 = createList([5, 5, 5, 5]);
    const result6 = isPalindrome(list6);
    console.log('Expected: true');
    console.log('Got:', result6);
    console.log('Test Pass:', result6 === true);
    console.log('---\n');

    // Test 7: Two nodes palindrome
    console.log('Test 7: Two nodes palindrome');
    console.log('Input: [1,1]');
    const list7 = createList([1, 1]);
    const result7 = isPalindrome(list7);
    console.log('Expected: true');
    console.log('Got:', result7);
    console.log('Test Pass:', result7 === true);
    console.log('---\n');

    // Test 8: Long even palindrome
    console.log('Test 8: Long even palindrome');
    console.log('Input: [1,2,3,4,4,3,2,1]');
    const list8 = createList([1, 2, 3, 4, 4, 3, 2, 1]);
    const result8 = isPalindrome(list8);
    console.log('Expected: true');
    console.log('Got:', result8);
    console.log('Test Pass:', result8 === true);
    console.log('---\n');

    // Test 9: Long odd palindrome
    console.log('Test 9: Long odd palindrome');
    console.log('Input: [1,2,3,4,5,4,3,2,1]');
    const list9 = createList([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    const result9 = isPalindrome(list9);
    console.log('Expected: true');
    console.log('Got:', result9);
    console.log('Test Pass:', result9 === true);
    console.log('---\n');

    // Test 10: Not palindrome (long)
    console.log('Test 10: Not palindrome (long)');
    console.log('Input: [1,2,3,4,5]');
    const list10 = createList([1, 2, 3, 4, 5]);
    const result10 = isPalindrome(list10);
    console.log('Expected: false');
    console.log('Got:', result10);
    console.log('Test Pass:', result10 === false);
    console.log('---\n');

    // Test 11: Not palindrome (almost)
    console.log('Test 11: Almost palindrome');
    console.log('Input: [1,2,4,2,1]');
    const list11 = createList([1, 2, 4, 2, 1]);
    const result11 = isPalindrome(list11);
    console.log('Expected: false');
    console.log('Got:', result11);
    console.log('Test Pass:', result11 === false);
    console.log('---\n');

    console.log('✅ All tests completed!');
    console.log('\n💡 This solution uses O(1) space - Follow-up satisfied!');
  }
}

// Run the tests
PalindromeLinkedListOptimal.runTests();