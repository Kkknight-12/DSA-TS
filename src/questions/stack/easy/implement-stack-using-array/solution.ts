/**
 * https://gemini.google.com/gem/d7b41321a3f1/b5a184919e89dcfa
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * PROBLEM: Implement Stack using Array (Dynamic Array Approach)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Stack: Last-In-First-Out (LIFO) data structure
 * Operations: push, pop, top, isEmpty
 *
 * Real-world analogy: Stack of plates
 * - New plate goes on TOP
 * - Remove plate from TOP only
 * - Can only see TOP plate
 */

namespace StackArrayDynamic {
  /**
   * ArrayStack Class - Dynamic Array Implementation
   *
   * KEY INSIGHT: Array ka end = Stack ka top
   *
   * Why dynamic array?
   * - TypeScript arrays automatically resize
   * - No manual capacity management needed
   * - push() and pop() are O(1) operations
   */
  class ArrayStack {
    private items: number[];

    /**
     * Constructor - Initialize empty stack
     *
     * WHY private array?
     * - Encapsulation: Users can't directly modify internal array
     * - Only allow modifications through push/pop methods
     */
    constructor() {
      this.items = [];
    }

    /**
     * PUSH: Add element to top of stack
     *
     * @param x - Element to push onto stack
     *
     * HOW IT WORKS:
     * 1. Use JavaScript's push() to add to end of array
     * 2. Array's end becomes new top of stack
     *
     * WHY O(1)?
     * - Array.push() appends to end in constant time (amortized)
     * - No need to shift other elements
     *
     * EXAMPLE:
     * Stack: [5, 10] → push(15) → [5, 10, 15]
     *                                      ↑ new top
     */
    push(x: number): void {
      this.items.push(x);
    }

    /**
     * POP: Remove and return top element
     *
     * @returns The top element of stack
     * @throws Error if stack is empty
     *
     * HOW IT WORKS:
     * 1. Check if stack is empty (safety check)
     * 2. Use Array.pop() to remove and return last element
     *
     * WHY O(1)?
     * - Array.pop() removes from end in constant time
     * - No need to shift other elements
     *
     * EXAMPLE:
     * Stack: [5, 10, 15] → pop() → returns 15, Stack: [5, 10]
     *                 ↑ removed
     */
    pop(): number {
      // EDGE CASE: Empty stack
      // WHY check? Prevent undefined return value
      if (this.isEmpty()) {
        throw new Error('Stack Underflow: Cannot pop from empty stack');
      }

      // pop() returns the removed element
      // TypeScript knows it's not undefined because of isEmpty check
      return this.items.pop()!;
    }

    /**
     * TOP/PEEK: View top element without removing
     *
     * @returns The top element of stack
     * @throws Error if stack is empty
     *
     * HOW IT WORKS:
     * 1. Check if stack is empty
     * 2. Return last element using array[length - 1]
     * 3. DO NOT modify the array
     *
     * WHY length - 1?
     * - Arrays are 0-indexed
     * - Last element is at index (length - 1)
     *
     * EXAMPLE:
     * Stack: [5, 10, 15] → top() → returns 15, Stack unchanged
     *                   ↑ peek at this
     */
    top(): number {
      // EDGE CASE: Empty stack
      if (this.isEmpty()) {
        throw new Error('Stack is empty: Cannot view top element');
      }

      // Return last element WITHOUT removing it
      return this.items[this.items.length - 1];
    }

    /**
     * ISEMPTY: Check if stack has no elements
     *
     * @returns true if empty, false otherwise
     *
     * HOW IT WORKS:
     * - Simply check if array length is 0
     *
     * WHY O(1)?
     * - Array.length is a property, not computed each time
     * - Direct memory access
     *
     * EXAMPLE:
     * Stack: [] → isEmpty() → true
     * Stack: [5] → isEmpty() → false
     */
    isEmpty(): boolean {
      return this.items.length === 0;
    }

    /**
     * SIZE: Get number of elements in stack (Helper method)
     *
     * @returns Number of elements
     *
     * WHY useful?
     * - Debugging
     * - Capacity planning
     * - Test validation
     */
    size(): number {
      return this.items.length;
    }

    /**
     * DISPLAY: Print stack contents (Helper for visualization)
     *
     * WHY useful?
     * - Debugging during development
     * - Understanding stack state
     */
    display(): void {
      if (this.isEmpty()) {
        console.log('Stack: [] (empty)');
        return;
      }

      console.log('Stack (bottom → top):', this.items.join(' → '));
      console.log(
        '                       ',
        ' '.repeat(this.items.length * 4) + '↑ TOP'
      );
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Example: Sequence of operations from Example 1
   * ["ArrayStack", "push", "push", "top", "pop", "isEmpty"]
   * [[], [5], [10], [], [], []]
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * INITIAL STATE
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * stack = new ArrayStack()
   * items: []
   * size: 0
   *
   * Visual:
   * ┌─────────┐
   * │  EMPTY  │
   * └─────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 1: push(5)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: []
   *
   * Action: items.push(5)
   * - Adds 5 to end of array
   *
   * After:
   * items: [5]
   *         ↑ top (index 0)
   * size: 1
   *
   * Visual:
   * ┌─────────┐
   * │    5    │ ← TOP
   * └─────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 2: push(10)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: [5]
   *
   * Action: items.push(10)
   * - Adds 10 to end of array
   *
   * After:
   * items: [5, 10]
   *             ↑ top (index 1)
   * size: 2
   *
   * Visual:
   * ┌─────────┐
   * │   10    │ ← TOP (last added)
   * ├─────────┤
   * │    5    │ ← BOTTOM (first added)
   * └─────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 3: top()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: [5, 10]
   *
   * Action:
   * 1. Check isEmpty() → false (length = 2)
   * 2. Return items[items.length - 1]
   *    = items[2 - 1]
   *    = items[1]
   *    = 10
   *
   * After:
   * items: [5, 10]  ← NO CHANGE (peek operation)
   * Returns: 10
   *
   * Visual:
   * ┌─────────┐
   * │   10    │ ← TOP (just viewed, not removed)
   * ├─────────┤
   * │    5    │
   * └─────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 4: pop()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: [5, 10]
   *
   * Action:
   * 1. Check isEmpty() → false
   * 2. items.pop()
   *    - Removes last element (10)
   *    - Returns 10
   *
   * After:
   * items: [5]
   *         ↑ new top
   * size: 1
   * Returns: 10
   *
   * Visual:
   * ┌─────────┐
   * │    5    │ ← TOP (became top after pop)
   * └─────────┘
   *
   * (10 was removed ✓)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 5: isEmpty()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Current State:
   * items: [5]
   * size: 1
   *
   * Action: items.length === 0
   *         → 1 === 0
   *         → false
   *
   * Returns: false
   *
   * WHY false?
   * - Stack still has 1 element (5)
   * - Not empty!
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * FINAL STATE
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * items: [5]
   * size: 1
   * isEmpty: false
   *
   * Visual:
   * ┌─────────┐
   * │    5    │ ← TOP
   * └─────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * 1. Pop from empty stack:
   *    items: []
   *    pop() → throws Error "Stack Underflow"
   *    WHY? Cannot remove from empty stack
   *
   * 2. Top on empty stack:
   *    items: []
   *    top() → throws Error "Stack is empty"
   *    WHY? No element to view
   *
   * 3. Single element push-pop:
   *    push(5) → [5]
   *    pop() → [] (returns 5)
   *    isEmpty() → true
   *
   * 4. Multiple push, then multiple pop:
   *    push(1), push(2), push(3) → [1, 2, 3]
   *    pop() → returns 3, stack: [1, 2]
   *    pop() → returns 2, stack: [1]
   *    pop() → returns 1, stack: []
   *    WHY LIFO? Last pushed (3) is first popped
   *
   * 5. Top doesn't modify stack:
   *    push(10) → [10]
   *    top() → returns 10, stack: [10] (unchanged)
   *    top() → returns 10, stack: [10] (still unchanged)
   *    Can call top() multiple times without changing stack
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * COMPLEXITY SUMMARY
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Time Complexity:
   * - push(x):    O(1) - Amortized constant time to append to array
   * - pop():      O(1) - Constant time to remove from end
   * - top():      O(1) - Direct array access
   * - isEmpty():  O(1) - Length property check
   *
   * Space Complexity: O(n)
   * - Where n = number of elements in stack
   * - Array stores all n elements
   * - No additional data structures needed
   *
   * ═══════════════════════════════════════════════════════════════════════════
   */

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * TEST CASES
   * ═══════════════════════════════════════════════════════════════════════════
   */
  export function runTests(): void {
    console.log('🧪 Testing Stack Implementation - Dynamic Array\n');
    console.log('═'.repeat(60));

    // ─────────────────────────────────────────────────────────────────────────
    // Test 1: Basic operations (Example 1)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\nTest 1: Basic push, top, pop operations');
    console.log('─'.repeat(60));
    const stack1 = new ArrayStack();
    stack1.push(5);
    stack1.push(10);
    console.log('After push(5), push(10):');
    stack1.display();

    const top1 = stack1.top();
    console.log(`top() = ${top1}`);
    console.log(`Expected: 10`);
    console.log(top1 === 10 ? '✓ PASS' : '✗ FAIL');

    const pop1 = stack1.pop();
    console.log(`\npop() = ${pop1}`);
    console.log('After pop():');
    stack1.display();
    console.log(`Expected: 10, stack should have [5]`);
    console.log(pop1 === 10 && !stack1.isEmpty() ? '✓ PASS' : '✗ FAIL');

    const isEmpty1 = stack1.isEmpty();
    console.log(`\nisEmpty() = ${isEmpty1}`);
    console.log(`Expected: false`);
    console.log(isEmpty1 === false ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 2: Empty stack operations (Example 2)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 2: Empty stack behavior');
    console.log('─'.repeat(60));
    const stack2 = new ArrayStack();
    console.log('New empty stack:');
    stack2.display();

    const isEmpty2a = stack2.isEmpty();
    console.log(`isEmpty() = ${isEmpty2a}`);
    console.log(`Expected: true`);
    console.log(isEmpty2a === true ? '✓ PASS' : '✗ FAIL');

    stack2.push(1);
    console.log('\nAfter push(1):');
    stack2.display();

    const pop2 = stack2.pop();
    console.log(`pop() = ${pop2}`);
    console.log('After pop():');
    stack2.display();

    const isEmpty2b = stack2.isEmpty();
    console.log(`isEmpty() = ${isEmpty2b}`);
    console.log(`Expected: true`);
    console.log(isEmpty2b === true && pop2 === 1 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 3: Single element
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 3: Single element operations');
    console.log('─'.repeat(60));
    const stack3 = new ArrayStack();
    stack3.push(42);
    console.log('After push(42):');
    stack3.display();

    const top3 = stack3.top();
    const size3 = stack3.size();
    console.log(`top() = ${top3}, size() = ${size3}`);
    console.log(`Expected: top=42, size=1`);
    console.log(top3 === 42 && size3 === 1 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 4: Multiple elements - LIFO verification
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 4: LIFO behavior verification');
    console.log('─'.repeat(60));
    const stack4 = new ArrayStack();
    const pushSequence = [10, 20, 30, 40, 50];
    console.log(`Pushing: ${pushSequence.join(', ')}`);
    pushSequence.forEach((val) => stack4.push(val));
    stack4.display();

    const popSequence: number[] = [];
    console.log('\nPopping all elements:');
    while (!stack4.isEmpty()) {
      const val = stack4.pop();
      popSequence.push(val);
      console.log(`  Popped: ${val}`);
    }

    console.log(`\nPop sequence: ${popSequence.join(', ')}`);
    console.log(`Expected: 50, 40, 30, 20, 10 (reverse of push)`);
    const expectedPop = [50, 40, 30, 20, 10];
    const isLIFO = popSequence.every((val, idx) => val === expectedPop[idx]);
    console.log(isLIFO ? '✓ PASS - LIFO verified' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 5: Top doesn't modify stack
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 5: top() should not modify stack');
    console.log('─'.repeat(60));
    const stack5 = new ArrayStack();
    stack5.push(100);
    stack5.push(200);
    console.log('After push(100), push(200):');
    stack5.display();

    const top5a = stack5.top();
    const size5a = stack5.size();
    const top5b = stack5.top();
    const size5b = stack5.size();
    const top5c = stack5.top();
    const size5c = stack5.size();

    console.log(`\nCalled top() three times:`);
    console.log(`  1st: ${top5a}, size: ${size5a}`);
    console.log(`  2nd: ${top5b}, size: ${size5b}`);
    console.log(`  3rd: ${top5c}, size: ${size5c}`);
    console.log(`Expected: All return 200, size stays 2`);

    const allSame =
      top5a === 200 &&
      top5b === 200 &&
      top5c === 200 &&
      size5a === 2 &&
      size5b === 2 &&
      size5c === 2;
    console.log(allSame ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 6: Large number of operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 6: Large number of operations');
    console.log('─'.repeat(60));
    const stack6 = new ArrayStack();
    const n = 1000;
    console.log(`Pushing ${n} elements (1 to ${n})...`);
    for (let i = 1; i <= n; i++) {
      stack6.push(i);
    }
    console.log(`Size after pushing: ${stack6.size()}`);
    console.log(`Top element: ${stack6.top()}`);
    console.log(`Expected: size=${n}, top=${n}`);

    let allCorrect = true;
    for (let i = n; i >= 1; i--) {
      const popped = stack6.pop();
      if (popped !== i) {
        allCorrect = false;
        console.log(`✗ Expected ${i}, got ${popped}`);
        break;
      }
    }

    console.log(`After popping all: isEmpty() = ${stack6.isEmpty()}`);
    console.log(allCorrect && stack6.isEmpty() ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 7: Alternating push-pop
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 7: Alternating push and pop operations');
    console.log('─'.repeat(60));
    const stack7 = new ArrayStack();
    console.log('push(1) → pop() → push(2) → push(3) → pop() → pop()');

    stack7.push(1);
    const p1 = stack7.pop(); // Should get 1
    stack7.push(2);
    stack7.push(3);
    const p2 = stack7.pop(); // Should get 3
    const p3 = stack7.pop(); // Should get 2

    console.log(`Results: ${p1}, ${p3}, ${p2}`);
    console.log(`Expected: 1, 3, 2`);
    console.log(`isEmpty: ${stack7.isEmpty()}`);
    console.log(
      p1 === 1 && p2 === 3 && p3 === 2 && stack7.isEmpty() ? '✓ PASS' : '✗ FAIL'
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Test 8: Error handling - pop from empty
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 8: Error handling - pop from empty stack');
    console.log('─'.repeat(60));
    const stack8 = new ArrayStack();
    try {
      stack8.pop();
      console.log('✗ FAIL - Should have thrown error');
    } catch (error) {
      console.log(`Caught error: ${(error as Error).message}`);
      console.log('✓ PASS - Correctly throws error');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Test 9: Error handling - top on empty
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 9: Error handling - top on empty stack');
    console.log('─'.repeat(60));
    const stack9 = new ArrayStack();
    try {
      stack9.top();
      console.log('✗ FAIL - Should have thrown error');
    } catch (error) {
      console.log(`Caught error: ${(error as Error).message}`);
      console.log('✓ PASS - Correctly throws error');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Test 10: Extreme values
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('\nTest 10: Extreme values');
    console.log('─'.repeat(60));
    const stack10 = new ArrayStack();
    const minVal = -1000000000;
    const maxVal = 1000000000;
    stack10.push(minVal);
    stack10.push(0);
    stack10.push(maxVal);

    console.log('Pushed: min (-10^9), 0, max (10^9)');
    stack10.display();

    const t10a = stack10.pop();
    const t10b = stack10.pop();
    const t10c = stack10.pop();

    console.log(`Popped in order: ${t10a}, ${t10b}, ${t10c}`);
    console.log(`Expected: ${maxVal}, 0, ${minVal}`);
    console.log(
      t10a === maxVal && t10b === 0 && t10c === minVal ? '✓ PASS' : '✗ FAIL'
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Summary
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log('All tests completed! ✓');
    console.log('═'.repeat(60));
  }
}

// Execute tests
StackArrayDynamic.runTests();