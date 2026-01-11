/**
 * Sort a Stack using Recursion
 * ==============================
 *
 * Problem: Sort a stack in ascending order (smallest at bottom, largest at top)
 *          using ONLY recursion (no loops, no extra arrays)
 *
 * Approach: Two Recursive Functions
 * 1. sortStack(): Removes top, sorts rest, inserts back in position
 * 2. insertSorted(): Inserts element in correct position in sorted stack
 *
 * Time Complexity: O(n²)
 * - Sorting n elements with O(n) insertion each
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n)
 *
 * Key Pattern: COMBINER
 * - Work happens during UNWINDING phase
 * - Recursion stack acts as temporary storage
 */

namespace SortStack {
  /**
   * Simple Stack implementation for this problem
   */
  class Stack<T> {
    private items: T[] = [];

    push(element: T): void {
      this.items.push(element);
    }

    pop(): T | undefined {
      return this.items.pop();
    }

    peek(): T | undefined {
      return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
      return this.items.length === 0;
    }

    size(): number {
      return this.items.length;
    }

    // For visualization
    toArray(): T[] {
      return [...this.items]; // Copy for display
    }

    // Create from array (bottom to top)
    static fromArray<T>(arr: T[]): Stack<T> {
      const stack = new Stack<T>();
      for (const item of arr) {
        stack.push(item);
      }
      return stack;
    }
  }

  /**
   * Sort a stack in ascending order using recursion
   *
   * @param stack - Stack to sort (modified in-place)
   *
   * @complexity
   * Time: O(n²) - For each element, insert takes O(n)
   * Space: O(n) - Recursion stack depth
   *
   * Algorithm:
   * 1. BASE CASE: Empty stack is sorted
   * 2. RECURSIVE CASE:
   *    a) Pop top element
   *    b) Recursively sort remaining stack
   *    c) Insert popped element back in correct position
   *
   * Pattern: COMBINER (work during unwinding)
   */
  function sortStack(stack: Stack<number>): void {
    // ═══════════════════════════════════════════════════════════
    // BASE CASE: Empty stack or single element
    // ═══════════════════════════════════════════════════════════
    // WHY: Empty or single-element stack is already sorted
    // EXAMPLE: [] → sorted ✓
    //          [5] → sorted ✓
    if (stack.isEmpty()) {
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // STEP 1: Remove top element
    // ═══════════════════════════════════════════════════════════
    // WHY: We'll hold it in the recursion stack (call stack)
    //      while we sort the rest
    //
    // EXAMPLE: [41, 3, 32, 2, 11]
    //          Pop 11 → Stack: [41, 3, 32, 2]
    //          11 is held in this function's local variable
    const top = stack.pop()!;

    // ═══════════════════════════════════════════════════════════
    // STEP 2: Recursively sort the remaining stack
    // ═══════════════════════════════════════════════════════════
    // DIVIDE: Split into smaller problem (stack without top)
    // CONQUER: Recursively solve (sort remaining stack)
    //
    // RECURSION TREE: This goes deep until stack is empty
    // [41, 3, 32, 2] → [41, 3, 32] → [41, 3] → [41] → []
    sortStack(stack);
    // At this point, `stack` is now SORTED!

    // ═══════════════════════════════════════════════════════════
    // STEP 3: Insert the element back in correct position
    // ═══════════════════════════════════════════════════════════
    // COMBINE: Insert `top` into sorted stack
    // WHY: After recursion, stack is sorted, so we just need to
    //      insert our held element in the right place
    //
    // EXAMPLE: If stack = [41, 32, 3, 2] (sorted) and top = 11
    //          insertSorted will place 11 between 32 and 3
    //          Result: [41, 32, 11, 3, 2]
    insertSorted(stack, top);
  }

  /**
   * Insert an element into a sorted stack at the correct position
   *
   * @param stack - Already sorted stack (largest at top)
   * @param element - Element to insert
   *
   * @complexity
   * Time: O(n) - Worst case traverse entire stack
   * Space: O(n) - Recursion depth in worst case
   *
   * Algorithm:
   * 1. BASE CASE 1: Stack empty → push element
   * 2. BASE CASE 2: Element >= top → belongs on top, push it
   * 3. RECURSIVE CASE: Element < top
   *    a) Pop top (it's larger, should stay above)
   *    b) Recursively insert element into remaining stack
   *    c) Push top back (restore larger element on top)
   */
  function insertSorted(stack: Stack<number>, element: number): void {
    // ═══════════════════════════════════════════════════════════
    // BASE CASE 1: Stack is empty
    // ═══════════════════════════════════════════════════════════
    // WHY: No comparison needed, just push
    // EXAMPLE: Insert 5 into [] → [5]
    if (stack.isEmpty()) {
      stack.push(element);
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // BASE CASE 2: Element >= top (found correct position!)
    // ═══════════════════════════════════════════════════════════
    // WHY: In ascending order (largest at top), if element >= top,
    //      it belongs ON TOP of the stack
    //
    // EXAMPLE: Insert 50 into [41, 32, 11] where top = 41
    //          50 >= 41 → push 50 on top → [50, 41, 32, 11]
    //
    // NOTE: >= handles duplicates correctly
    //       Insert 32 into [41, 32, 11] → [41, 32, 32, 11] ✓
    const top = stack.peek()!;
    if (element >= top) {
      stack.push(element);
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // RECURSIVE CASE: Element < top (need to go deeper)
    // ═══════════════════════════════════════════════════════════
    // WHY: Element should be below current top
    // STRATEGY: Remove top, insert element recursively, restore top
    //
    // EXAMPLE: Insert 11 into [41, 32, 3]
    //   top = 41, element = 11
    //   11 < 41 → need to go deeper
    //   1. Pop 41
    //   2. insertSorted([32, 3], 11) recursively
    //   3. Push 41 back

    // STEP 1: Remove top element (temporarily)
    // It's larger than our element, so it should stay ABOVE
    stack.pop();

    // STEP 2: Recursively insert element into remaining stack
    // This continues until we find the right position
    insertSorted(stack, element);

    // STEP 3: Restore the top element
    // Now that element is inserted below, put top back on top
    stack.push(top);
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ARRAY CONVENTION (VERY IMPORTANT!)
   * ═══════════════════════════════════════════════════════════
   * Array: [41, 3, 32, 2, 11]
   *         ↑            ↑
   *      index 0     last index
   *      BOTTOM        TOP
   *
   * Stack visualization:
   *   11 ← TOP (last element, index 4)
   *    2
   *   32
   *    3
   *   41 ← BOTTOM (first element, index 0)
   *
   * Operations:
   *   push(10) → adds to END → [41, 3, 32, 2, 11, 10]
   *   pop() → removes from END → removes 11 → [41, 3, 32, 2]
   *   peek() → returns last element → 11
   *
   * ═══════════════════════════════════════════════════════════
   *
   * Example: Sort [41, 3, 32, 2, 11]
   *
   * Initial Stack: [41, 3, 32, 2, 11]
   *                 ↑              ↑
   *              bottom          top
   *
   * ───────────────────────────────────────────────────────────
   * PHASE 1: RECURSIVE EXPANSION (Popping all elements)
   * ───────────────────────────────────────────────────────────
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ CALL 1: sortStack([41, 3, 32, 2, 11])                   │
   * ├──────────────────────────────────────────────────────────┤
   * │ pop() removes 11 (last element)                          │
   * │ Stack: [41, 3, 32, 2]                                   │
   * │ Held: 11                                                 │
   * │ Recursive call →                                         │
   * │                                                          │
   * │   ┌────────────────────────────────────────────────────┐ │
   * │   │ CALL 2: sortStack([41, 3, 32, 2])                 │ │
   * │   ├────────────────────────────────────────────────────┤ │
   * │   │ pop() removes 2                                    │ │
   * │   │ Stack: [41, 3, 32]                                │ │
   * │   │ Held: 2                                            │ │
   * │   │ Recursive call →                                   │ │
   * │   │                                                    │ │
   * │   │   ┌──────────────────────────────────────────────┐ │ │
   * │   │   │ CALL 3: sortStack([41, 3, 32])              │ │ │
   * │   │   ├──────────────────────────────────────────────┤ │ │
   * │   │   │ pop() removes 32                             │ │ │
   * │   │   │ Stack: [41, 3]                              │ │ │
   * │   │   │ Held: 32                                     │ │ │
   * │   │   │ Recursive call →                             │ │ │
   * │   │   │                                              │ │ │
   * │   │   │   ┌────────────────────────────────────────┐ │ │ │
   * │   │   │   │ CALL 4: sortStack([41, 3])            │ │ │ │
   * │   │   │   ├────────────────────────────────────────┤ │ │ │
   * │   │   │   │ pop() removes 3                        │ │ │ │
   * │   │   │   │ Stack: [41]                           │ │ │ │
   * │   │   │   │ Held: 3                                │ │ │ │
   * │   │   │   │ Recursive call →                       │ │ │ │
   * │   │   │   │                                        │ │ │ │
   * │   │   │   │   ┌──────────────────────────────────┐ │ │ │ │
   * │   │   │   │   │ CALL 5: sortStack([41])         │ │ │ │ │
   * │   │   │   │   ├──────────────────────────────────┤ │ │ │ │
   * │   │   │   │   │ pop() removes 41                 │ │ │ │ │
   * │   │   │   │   │ Stack: []                       │ │ │ │ │
   * │   │   │   │   │ Held: 41                         │ │ │ │ │
   * │   │   │   │   │ Recursive call →                 │ │ │ │ │
   * │   │   │   │   │                                  │ │ │ │ │
   * │   │   │   │   │   ┌────────────────────────────┐ │ │ │ │ │
   * │   │   │   │   │   │ CALL 6: sortStack([])     │ │ │ │ │ │
   * │   │   │   │   │   ├────────────────────────────┤ │ │ │ │ │
   * │   │   │   │   │   │ Empty stack!               │ │ │ │ │ │
   * │   │   │   │   │   │ BASE CASE: Return          │ │ │ │ │ │
   * │   │   │   │   │   └────────────────────────────┘ │ │ │ │ │
   *
   * ───────────────────────────────────────────────────────────
   * PHASE 2: UNWINDING (Inserting elements back in sorted order)
   * ───────────────────────────────────────────────────────────
   *
   * │   │   │   │   │   │                                  │ │ │ │ │
   * │   │   │   │   │   Back in CALL 5:                   │ │ │ │ │
   * │   │   │   │   │   insertSorted([], 41)             │ │ │ │ │
   * │   │   │   │   │     Empty → push(41)                │ │ │ │ │
   * │   │   │   │   │     Stack: [41]                     │ │ │ │ │
   * │   │   │   │   │             ↑                        │ │ │ │ │
   * │   │   │   │   │         bottom/top                   │ │ │ │ │
   * │   │   │   │   │   Return                             │ │ │ │ │
   * │   │   │   │   └──────────────────────────────────┘ │ │ │ │
   * │   │   │   │                                        │ │ │ │
   * │   │   │   │   Back in CALL 4:                      │ │ │ │
   * │   │   │   │   insertSorted([41], 3)               │ │ │ │
   * │   │   │   │     peek() = 41 (top element)          │ │ │ │
   * │   │   │   │     3 < 41? YES → need to go below     │ │ │ │
   * │   │   │   │     pop() → removes 41 → Stack: []     │ │ │ │
   * │   │   │   │     insertSorted([], 3)               │ │ │ │
   * │   │   │   │       Empty → push(3)                  │ │ │ │
   * │   │   │   │       Stack: [3]                       │ │ │ │
   * │   │   │   │     push(41) back                      │ │ │ │
   * │   │   │   │     Stack: [3, 41]                     │ │ │ │
   * │   │   │   │            ↑   ↑                        │ │ │ │
   * │   │   │   │        bottom top                       │ │ │ │
   * │   │   │   │   Return                                │ │ │ │
   * │   │   │   └────────────────────────────────────────┘ │ │ │
   * │   │   │                                              │ │ │
   * │   │   │   Back in CALL 3:                            │ │ │
   * │   │   │   insertSorted([3, 41], 32)                 │ │ │
   * │   │   │     peek() = 41                              │ │ │
   * │   │   │     32 < 41? YES → need to go below         │ │ │
   * │   │   │     pop() → removes 41 → Stack: [3]         │ │ │
   * │   │   │     insertSorted([3], 32)                   │ │ │
   * │   │   │       peek() = 3                             │ │ │
   * │   │   │       32 < 3? NO → 32 >= 3, found position! │ │ │
   * │   │   │       push(32)                               │ │ │
   * │   │   │       Stack: [3, 32]                         │ │ │
   * │   │   │     push(41) back                            │ │ │
   * │   │   │     Stack: [3, 32, 41]                       │ │ │
   * │   │   │            ↑       ↑                          │ │ │
   * │   │   │         bottom    top                         │ │ │
   * │   │   │   Return                                      │ │ │
   * │   │   └──────────────────────────────────────────────┘ │ │
   * │   │                                                    │ │
   * │   │   Back in CALL 2:                                  │ │
   * │   │   insertSorted([3, 32, 41], 2)                    │ │
   * │   │     peek() = 41                                    │ │
   * │   │     2 < 41? YES → go deeper                        │ │
   * │   │     pop() → removes 41 → Stack: [3, 32]           │ │
   * │   │     insertSorted([3, 32], 2)                      │ │
   * │   │       peek() = 32                                  │ │
   * │   │       2 < 32? YES → go deeper                      │ │
   * │   │       pop() → removes 32 → Stack: [3]             │ │
   * │   │       insertSorted([3], 2)                        │ │
   * │   │         peek() = 3                                 │ │
   * │   │         2 < 3? YES → go deeper                     │ │
   * │   │         pop() → removes 3 → Stack: []             │ │
   * │   │         insertSorted([], 2)                       │ │
   * │   │           Empty → push(2)                          │ │
   * │   │           Stack: [2]                               │ │
   * │   │         push(3) back                               │ │
   * │   │         Stack: [2, 3]                              │ │
   * │   │       push(32) back                                │ │
   * │   │       Stack: [2, 3, 32]                            │ │
   * │   │     push(41) back                                  │ │
   * │   │     Stack: [2, 3, 32, 41]                          │ │
   * │   │            ↑           ↑                            │ │
   * │   │         bottom        top                           │ │
   * │   │   Return                                            │ │
   * │   └────────────────────────────────────────────────────┘ │
   * │                                                          │
   * │   Back in CALL 1:                                        │
   * │   insertSorted([2, 3, 32, 41], 11)                      │
   * │     peek() = 41                                          │
   * │     11 < 41? YES → go deeper                            │
   * │     pop() → removes 41 → Stack: [2, 3, 32]             │
   * │     insertSorted([2, 3, 32], 11)                       │
   * │       peek() = 32                                        │
   * │       11 < 32? YES → go deeper                          │
   * │       pop() → removes 32 → Stack: [2, 3]               │
   * │       insertSorted([2, 3], 11)                         │
   * │         peek() = 3                                       │
   * │         11 < 3? NO → 11 >= 3, found position!          │
   * │         push(11)                                         │
   * │         Stack: [2, 3, 11]                                │
   * │       push(32) back                                      │
   * │       Stack: [2, 3, 11, 32]                              │
   * │     push(41) back                                        │
   * │     Stack: [2, 3, 11, 32, 41]                            │
   * │            ↑               ↑                              │
   * │         bottom            top                             │
   * │   Return                                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ───────────────────────────────────────────────────────────
   * FINAL RESULT
   * ───────────────────────────────────────────────────────────
   *
   * Stack: [2, 3, 11, 32, 41]
   *
   * Visualization:
   *   41 ← TOP (largest)
   *   32
   *   11
   *    3
   *    2 ← BOTTOM (smallest)
   *
   * Sorted in ASCENDING order! ✓
   * (Smallest at bottom, largest at top)
   */

  // ==================== TEST CASES ====================

  /**
   * Helper: Print stack in visual format
   */
  function visualizeStack(stack: Stack<number>, label: string): void {
    const arr = stack.toArray();
    console.log(label);
    if (arr.length === 0) {
      console.log("  (empty)");
    } else {
      for (let i = arr.length - 1; i >= 0; i--) {
        const marker = i === arr.length - 1 ? " ← top" : i === 0 ? " ← bottom" : "";
        console.log(`  ${arr[i]}${marker}`);
      }
    }
  }

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("Testing Sort Stack using Recursion");
    console.log("═══════════════════════════════════════════════════════════\n");

    // Test 1: Standard unsorted stack
    console.log("Test 1: Standard Unsorted Stack");
    console.log("  Input: [41, 3, 32, 2, 11]");
    const stack1 = Stack.fromArray([41, 3, 32, 2, 11]);
    visualizeStack(stack1, "  Before:");
    sortStack(stack1);
    visualizeStack(stack1, "  After:");
    const result1 = stack1.toArray();
    const expected1 = [2, 3, 11, 32, 41]; // bottom to top, ascending
    console.log(
      "  Result:",
      JSON.stringify(result1) === JSON.stringify(expected1) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 2: Already sorted
    console.log("Test 2: Already Sorted (Ascending)");
    console.log("  Input: [1, 2, 3, 4, 5]");
    const stack2 = Stack.fromArray([1, 2, 3, 4, 5]);
    sortStack(stack2);
    const result2 = stack2.toArray();
    const expected2 = [1, 2, 3, 4, 5];
    console.log(
      "  Result:",
      JSON.stringify(result2) === JSON.stringify(expected2) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 3: Reverse sorted (worst case)
    console.log("Test 3: Reverse Sorted (Worst Case)");
    console.log("  Input: [5, 4, 3, 2, 1]");
    const stack3 = Stack.fromArray([5, 4, 3, 2, 1]);
    sortStack(stack3);
    const result3 = stack3.toArray();
    const expected3 = [1, 2, 3, 4, 5];
    console.log(
      "  Result:",
      JSON.stringify(result3) === JSON.stringify(expected3) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 4: Single element
    console.log("Test 4: Single Element");
    console.log("  Input: [42]");
    const stack4 = Stack.fromArray([42]);
    sortStack(stack4);
    const result4 = stack4.toArray();
    const expected4 = [42];
    console.log(
      "  Result:",
      JSON.stringify(result4) === JSON.stringify(expected4) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 5: Empty stack
    console.log("Test 5: Empty Stack");
    console.log("  Input: []");
    const stack5 = Stack.fromArray([]);
    sortStack(stack5);
    const result5 = stack5.toArray();
    const expected5: number[] = [];
    console.log(
      "  Result:",
      JSON.stringify(result5) === JSON.stringify(expected5) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 6: Duplicates
    console.log("Test 6: Stack with Duplicates");
    console.log("  Input: [3, 1, 3, 2, 1]");
    const stack6 = Stack.fromArray([3, 1, 3, 2, 1]);
    sortStack(stack6);
    const result6 = stack6.toArray();
    const expected6 = [1, 1, 2, 3, 3];
    console.log(
      "  Result:",
      JSON.stringify(result6) === JSON.stringify(expected6) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 7: Two elements
    console.log("Test 7: Two Elements");
    console.log("  Input: [5, 3]");
    const stack7 = Stack.fromArray([5, 3]);
    sortStack(stack7);
    const result7 = stack7.toArray();
    const expected7 = [3, 5];
    console.log(
      "  Result:",
      JSON.stringify(result7) === JSON.stringify(expected7) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Complexity Note
    console.log("═══════════════════════════════════════════════════════════");
    console.log("COMPLEXITY ANALYSIS:");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("Time Complexity: O(n²)");
    console.log("  - Sort n elements");
    console.log("  - Each insertion can take O(n) in worst case");
    console.log("  - Total: O(n) × O(n) = O(n²)");
    console.log("");
    console.log("Space Complexity: O(n)");
    console.log("  - Recursion depth: O(n)");
    console.log("  - Each call holds one element");
    console.log("");
    console.log("Pattern: COMBINER (work during unwinding phase)");
    console.log("═══════════════════════════════════════════════════════════\n");
  }
}

// Run tests
SortStack.runTests();
