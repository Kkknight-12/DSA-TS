/**
 * Reverse a Stack using Recursion
 * =================================
 *
 * Problem: Reverse a stack in-place using ONLY recursion
 *          (no loops, no extra arrays)
 *
 * Approach: Two Recursive Functions
 * 1. reverseStack(): Removes top, reverses rest, inserts at bottom
 * 2. insertAtBottom(): Inserts element at the bottom of stack
 *
 * Time Complexity: O(n²)
 * - Reversing n elements with O(n) insertion each
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n)
 *
 * Key Pattern: COMBINER
 * - Work happens during UNWINDING phase
 * - Recursion stack acts as temporary storage
 */

namespace ReverseStack {
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
   * Reverse a stack in-place using recursion
   *
   * @param stack - Stack to reverse (modified in-place)
   *
   * @complexity
   * Time: O(n²) - For each element, insertAtBottom takes O(n)
   * Space: O(n) - Recursion stack depth
   *
   * Algorithm:
   * 1. BASE CASE: Empty stack is already reversed
   * 2. RECURSIVE CASE:
   *    a) Pop top element
   *    b) Recursively reverse remaining stack
   *    c) Insert popped element at bottom
   *
   * Pattern: COMBINER (work during unwinding)
   */
  function reverseStack(stack: Stack<number>): void {
    // ═══════════════════════════════════════════════════════════
    // BASE CASE: Empty stack
    // ═══════════════════════════════════════════════════════════
    // WHY: Empty stack is already reversed
    // EXAMPLE: [] → reversed is [] ✓
    if (stack.isEmpty()) {
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // STEP 1: Remove top element
    // ═══════════════════════════════════════════════════════════
    // WHY: Hold it in recursion stack while we reverse the rest
    //
    // EXAMPLE: [4, 1, 3, 2]
    //          Pop 2 (top) → Stack: [4, 1, 3]
    //          2 is held in this function's local variable
    const top = stack.pop()!;

    // ═══════════════════════════════════════════════════════════
    // STEP 2: Recursively reverse the remaining stack
    // ═══════════════════════════════════════════════════════════
    // DIVIDE: Split into smaller problem (stack without top)
    // CONQUER: Recursively solve (reverse remaining stack)
    //
    // This goes deep until stack is empty
    reverseStack(stack);
    // At this point, `stack` is now REVERSED!

    // ═══════════════════════════════════════════════════════════
    // STEP 3: Insert the element at the BOTTOM
    // ═══════════════════════════════════════════════════════════
    // COMBINE: Insert `top` at bottom of reversed stack
    // WHY: To reverse, what was at top should go to bottom
    //
    // EXAMPLE: If reversed stack = [3, 1, 4] and top = 2
    //          insertAtBottom will place 2 at bottom
    //          Result: [2, 3, 1, 4] (2 now at bottom!)
    insertAtBottom(stack, top);
  }

  /**
   * Insert an element at the BOTTOM of the stack
   *
   * @param stack - Stack to insert into
   * @param element - Element to insert at bottom
   *
   * @complexity
   * Time: O(n) - Worst case traverse entire stack
   * Space: O(n) - Recursion depth in worst case
   *
   * Algorithm:
   * 1. BASE CASE: Stack empty → push element
   * 2. RECURSIVE CASE: Stack has elements
   *    a) Pop top element (temporarily)
   *    b) Recursively insert element at bottom
   *    c) Push top back (restore)
   */
  function insertAtBottom(stack: Stack<number>, element: number): void {
    // ═══════════════════════════════════════════════════════════
    // BASE CASE: Stack is empty
    // ═══════════════════════════════════════════════════════════
    // WHY: If empty, this IS the bottom - just push!
    // EXAMPLE: Insert 5 into [] → [5]
    if (stack.isEmpty()) {
      stack.push(element);
      return;
    }

    // ═══════════════════════════════════════════════════════════
    // RECURSIVE CASE: Stack has elements
    // ═══════════════════════════════════════════════════════════
    // STRATEGY: Remove top, insert at bottom recursively, restore top
    //
    // EXAMPLE: Insert 2 at bottom of [3, 1, 4]
    //   1. Pop 4 (top)
    //   2. insertAtBottom([3, 1], 2) recursively
    //   3. Push 4 back
    //
    // This continues until we reach empty stack (bottom)

    // STEP 1: Remove top element (temporarily)
    const top = stack.pop()!;

    // STEP 2: Recursively insert element at bottom of remaining stack
    insertAtBottom(stack, element);

    // STEP 3: Restore the top element
    // Now that element is at bottom, put top back on top
    stack.push(top);
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ARRAY CONVENTION (VERY IMPORTANT!)
   * ═══════════════════════════════════════════════════════════
   * Array: [4, 1, 3, 2]
   *         ↑        ↑
   *      index 0  last index
   *      BOTTOM     TOP
   *
   * Stack visualization:
   *   2 ← TOP (last element, index 3)
   *   3
   *   1
   *   4 ← BOTTOM (first element, index 0)
   *
   * Operations:
   *   push(10) → adds to END → [4, 1, 3, 2, 10]
   *   pop() → removes from END → removes 2 → [4, 1, 3]
   *   peek() → returns last element → 2
   *
   * ═══════════════════════════════════════════════════════════
   *
   * Example: Reverse [4, 1, 3, 2]
   *
   * Initial Stack: [4, 1, 3, 2]
   *                 ↑        ↑
   *              bottom    top
   *
   * Goal: [2, 3, 1, 4] (completely reversed)
   *        ↑        ↑
   *     bottom    top
   *
   * ───────────────────────────────────────────────────────────
   * PHASE 1: RECURSIVE EXPANSION (Popping all elements)
   * ───────────────────────────────────────────────────────────
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ CALL 1: reverseStack([4, 1, 3, 2])                      │
   * ├──────────────────────────────────────────────────────────┤
   * │ Not empty                                                │
   * │ pop() removes 2 (top, last element)                      │
   * │ Stack: [4, 1, 3]                                        │
   * │ Held: 2                                                  │
   * │ Recursive call: reverseStack([4, 1, 3])                │
   * │                                                          │
   * │   ┌────────────────────────────────────────────────────┐ │
   * │   │ CALL 2: reverseStack([4, 1, 3])                   │ │
   * │   ├────────────────────────────────────────────────────┤ │
   * │   │ Not empty                                          │ │
   * │   │ pop() removes 3                                    │ │
   * │   │ Stack: [4, 1]                                     │ │
   * │   │ Held: 3                                            │ │
   * │   │ Recursive call: reverseStack([4, 1])             │ │
   * │   │                                                    │ │
   * │   │   ┌──────────────────────────────────────────────┐ │ │
   * │   │   │ CALL 3: reverseStack([4, 1])                │ │ │
   * │   │   ├──────────────────────────────────────────────┤ │ │
   * │   │   │ Not empty                                    │ │ │
   * │   │   │ pop() removes 1                              │ │ │
   * │   │   │ Stack: [4]                                  │ │ │
   * │   │   │ Held: 1                                      │ │ │
   * │   │   │ Recursive call: reverseStack([4])          │ │ │
   * │   │   │                                              │ │ │
   * │   │   │   ┌────────────────────────────────────────┐ │ │ │
   * │   │   │   │ CALL 4: reverseStack([4])             │ │ │ │
   * │   │   │   ├────────────────────────────────────────┤ │ │ │
   * │   │   │   │ Not empty                              │ │ │ │
   * │   │   │   │ pop() removes 4                        │ │ │ │
   * │   │   │   │ Stack: []                             │ │ │ │
   * │   │   │   │ Held: 4                                │ │ │ │
   * │   │   │   │ Recursive call: reverseStack([])     │ │ │ │
   * │   │   │   │                                        │ │ │ │
   * │   │   │   │   ┌──────────────────────────────────┐ │ │ │ │
   * │   │   │   │   │ CALL 5: reverseStack([])        │ │ │ │ │
   * │   │   │   │   ├──────────────────────────────────┤ │ │ │ │
   * │   │   │   │   │ Empty stack!                     │ │ │ │ │
   * │   │   │   │   │ BASE CASE: Return                │ │ │ │ │
   * │   │   │   │   └──────────────────────────────────┘ │ │ │ │
   *
   * ───────────────────────────────────────────────────────────
   * PHASE 2: UNWINDING (Inserting at bottom)
   * ───────────────────────────────────────────────────────────
   *
   * │   │   │   │   │                                  │ │ │ │
   * │   │   │   │   Back in CALL 4:                    │ │ │ │
   * │   │   │   │   Stack after reverse: []            │ │ │ │
   * │   │   │   │   insertAtBottom([], 4)             │ │ │ │
   * │   │   │   │     Empty → push(4)                  │ │ │ │
   * │   │   │   │     Stack: [4]                       │ │ │ │
   * │   │   │   │            ↑                          │ │ │ │
   * │   │   │   │        bottom/top                     │ │ │ │
   * │   │   │   │   Return                              │ │ │ │
   * │   │   │   └────────────────────────────────────────┘ │ │ │
   * │   │   │                                              │ │ │
   * │   │   │   Back in CALL 3:                            │ │ │
   * │   │   │   Stack after reverse: [4]                   │ │ │
   * │   │   │   insertAtBottom([4], 1)                    │ │ │
   * │   │   │     Not empty                                │ │ │
   * │   │   │     pop() → removes 4 → Stack: []           │ │ │
   * │   │   │     insertAtBottom([], 1)                   │ │ │
   * │   │   │       Empty → push(1)                        │ │ │
   * │   │   │       Stack: [1]                             │ │ │
   * │   │   │     push(4) back                             │ │ │
   * │   │   │     Stack: [1, 4]                            │ │ │
   * │   │   │            ↑   ↑                              │ │ │
   * │   │   │        bottom top                             │ │ │
   * │   │   │   Return                                      │ │ │
   * │   │   └──────────────────────────────────────────────┘ │ │
   * │   │                                                    │ │
   * │   │   Back in CALL 2:                                  │ │
   * │   │   Stack after reverse: [1, 4]                      │ │
   * │   │   insertAtBottom([1, 4], 3)                       │ │
   * │   │     Not empty                                      │ │
   * │   │     pop() → removes 4 → Stack: [1]                │ │
   * │   │     insertAtBottom([1], 3)                        │ │
   * │   │       Not empty                                    │ │
   * │   │       pop() → removes 1 → Stack: []               │ │
   * │   │       insertAtBottom([], 3)                       │ │
   * │   │         Empty → push(3)                            │ │
   * │   │         Stack: [3]                                 │ │
   * │   │       push(1) back                                 │ │
   * │   │       Stack: [3, 1]                                │ │
   * │   │     push(4) back                                   │ │
   * │   │     Stack: [3, 1, 4]                               │ │
   * │   │            ↑      ↑                                 │ │
   * │   │        bottom   top                                 │ │
   * │   │   Return                                            │ │
   * │   └────────────────────────────────────────────────────┘ │
   * │                                                          │
   * │   Back in CALL 1:                                        │
   * │   Stack after reverse: [3, 1, 4]                         │
   * │   insertAtBottom([3, 1, 4], 2)                          │
   * │     Not empty                                            │
   * │     pop() → removes 4 → Stack: [3, 1]                   │
   * │     insertAtBottom([3, 1], 2)                           │
   * │       Not empty                                          │
   * │       pop() → removes 1 → Stack: [3]                    │
   * │       insertAtBottom([3], 2)                            │
   * │         Not empty                                        │
   * │         pop() → removes 3 → Stack: []                   │
   * │         insertAtBottom([], 2)                           │
   * │           Empty → push(2)                                │
   * │           Stack: [2]                                     │
   * │         push(3) back                                     │
   * │         Stack: [2, 3]                                    │
   * │       push(1) back                                       │
   * │       Stack: [2, 3, 1]                                   │
   * │     push(4) back                                         │
   * │     Stack: [2, 3, 1, 4]                                  │
   * │            ↑         ↑                                    │
   * │        bottom      top                                    │
   * │   Return                                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ───────────────────────────────────────────────────────────
   * FINAL RESULT
   * ───────────────────────────────────────────────────────────
   *
   * Original: [4, 1, 3, 2]
   * Reversed: [2, 3, 1, 4]
   *
   * Visualization:
   * Before:        After:
   *   2 ← top       4 ← top (was at bottom!)
   *   3             1
   *   1             3
   *   4 ← bottom    2 ← bottom (was at top!)
   *
   * Completely reversed! ✓
   * Bottom became top, top became bottom!
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
        const marker =
          i === arr.length - 1 ? " ← top" : i === 0 ? " ← bottom" : "";
        console.log(`  ${arr[i]}${marker}`);
      }
    }
  }

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("Testing Reverse Stack using Recursion");
    console.log("═══════════════════════════════════════════════════════════\n");

    // Test 1: Standard case
    console.log("Test 1: Standard Stack");
    console.log("  Input: [4, 1, 3, 2]");
    const stack1 = Stack.fromArray([4, 1, 3, 2]);
    visualizeStack(stack1, "  Before:");
    reverseStack(stack1);
    visualizeStack(stack1, "  After:");
    const result1 = stack1.toArray();
    const expected1 = [2, 3, 1, 4];
    console.log(
      "  Result:",
      JSON.stringify(result1) === JSON.stringify(expected1) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 2: Another example
    console.log("Test 2: Five Elements");
    console.log("  Input: [10, 20, -5, 7, 15]");
    const stack2 = Stack.fromArray([10, 20, -5, 7, 15]);
    reverseStack(stack2);
    const result2 = stack2.toArray();
    const expected2 = [15, 7, -5, 20, 10];
    console.log(
      "  Result:",
      JSON.stringify(result2) === JSON.stringify(expected2) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 3: Single element
    console.log("Test 3: Single Element");
    console.log("  Input: [5]");
    const stack3 = Stack.fromArray([5]);
    reverseStack(stack3);
    const result3 = stack3.toArray();
    const expected3 = [5];
    console.log(
      "  Result:",
      JSON.stringify(result3) === JSON.stringify(expected3) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 4: Empty stack
    console.log("Test 4: Empty Stack");
    console.log("  Input: []");
    const stack4 = Stack.fromArray([]);
    reverseStack(stack4);
    const result4 = stack4.toArray();
    const expected4: number[] = [];
    console.log(
      "  Result:",
      JSON.stringify(result4) === JSON.stringify(expected4) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 5: Two elements
    console.log("Test 5: Two Elements");
    console.log("  Input: [1, 2]");
    const stack5 = Stack.fromArray([1, 2]);
    visualizeStack(stack5, "  Before:");
    reverseStack(stack5);
    visualizeStack(stack5, "  After:");
    const result5 = stack5.toArray();
    const expected5 = [2, 1];
    console.log(
      "  Result:",
      JSON.stringify(result5) === JSON.stringify(expected5) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 6: All same elements
    console.log("Test 6: All Same Elements");
    console.log("  Input: [7, 7, 7, 7]");
    const stack6 = Stack.fromArray([7, 7, 7, 7]);
    reverseStack(stack6);
    const result6 = stack6.toArray();
    const expected6 = [7, 7, 7, 7];
    console.log(
      "  Result:",
      JSON.stringify(result6) === JSON.stringify(expected6) ? "✓ PASS" : "✗ FAIL"
    );
    console.log();

    // Test 7: Negative numbers
    console.log("Test 7: Negative Numbers");
    console.log("  Input: [-5, 10, -3, 2]");
    const stack7 = Stack.fromArray([-5, 10, -3, 2]);
    reverseStack(stack7);
    const result7 = stack7.toArray();
    const expected7 = [2, -3, 10, -5];
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
    console.log("  - Reverse n elements");
    console.log("  - Each insertAtBottom can take O(n)");
    console.log("  - Total: O(n) × O(n) = O(n²)");
    console.log("");
    console.log("Space Complexity: O(n)");
    console.log("  - Recursion depth: O(n)");
    console.log("  - Each call holds one element");
    console.log("");
    console.log("Pattern: COMBINER (work during unwinding phase)");
    console.log("Key: Recursion call stack holds elements temporarily!");
    console.log("═══════════════════════════════════════════════════════════\n");
  }
}

// Run tests
ReverseStack.runTests();
