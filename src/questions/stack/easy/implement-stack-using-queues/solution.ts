/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PROBLEM: Implement Stack using Queues (One Queue - Rotation)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Challenge: Convert FIFO (Queue) to LIFO (Stack) behavior
 * Constraint: Use only queue operations
 *
 * Solution: Use rotation trick to keep latest element at front!
 */

namespace StackUsingQueueRotation {
  /**
   * Simple Queue Implementation (Helper)
   *
   * WHY needed?
   * - We need a queue to implement stack
   * - TypeScript doesn't have built-in Queue
   * - This provides basic queue operations
   */
  class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
      this.items.push(item);
    }

    dequeue(): T | undefined {
      return this.items.shift();
    }

    peek(): T | undefined {
      return this.items[0];
    }

    size(): number {
      return this.items.length;
    }

    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }

  /**
   * MyStack Class - One Queue with Rotation
   *
   * KEY INSIGHT: Use rotation to maintain stack order
   *
   * Strategy:
   * 1. After adding element, rotate queue
   * 2. Rotation brings new element to front
   * 3. Queue maintains: [top, ..., bottom]
   *
   * Visual:
   * Before push(3): queue = [2, 1]
   * After push(3): queue = [3, 2, 1]  ← 3 at front!
   *                         ↑ top of stack
   */
  class MyStack {
    private queue: Queue<number>;

    /**
     * Constructor - Initialize empty stack
     *
     * WHY only one queue?
     * - Space optimization!
     * - Rotation trick eliminates need for second queue
     */
    constructor() {
      this.queue = new Queue<number>();
    }

    /**
     * PUSH: Add element to top of stack
     *
     * @param x - Element to push
     *
     * HOW IT WORKS (The Rotation Trick):
     * 1. Remember current size (n)
     * 2. Enqueue new element at back
     * 3. Rotate: Dequeue and enqueue first n elements
     *    - This moves new element to front!
     *
     * WHY O(n)?
     * - Need to rotate n elements
     * - Each rotation is one dequeue + enqueue
     *
     * EXAMPLE:
     * Before: queue = [2, 1] (size = 2)
     *                  ↑front
     *
     * push(3):
     * Step 1: size = 2
     * Step 2: enqueue(3)
     *         queue = [2, 1, 3]
     *
     * Step 3: Rotate 2 times
     *   Rotation 1: dequeue 2, enqueue 2
     *         queue = [1, 3, 2]
     *
     *   Rotation 2: dequeue 1, enqueue 1
     *         queue = [3, 2, 1]
     *                  ↑ 3 is now at front!
     *
     * Result: Latest element (3) is at front ✓
     */
    push(x: number): void {
      // Step 1: Remember size BEFORE adding new element
      // WHY: We need to know how many elements to rotate
      // If size = 2, we rotate 2 times to bring new element to front
      const n = this.queue.size();

      // Step 2: Add new element to back of queue
      // WHY: Standard queue operation (enqueue at back)
      this.queue.enqueue(x);

      // Step 3: ROTATION - Bring new element to front
      // WHY: After n rotations, newest element will be at front
      //
      // HOW rotation works:
      // - Take front element out (dequeue)
      // - Put it at back (enqueue)
      // - Repeat n times
      //
      // EXAMPLE with [2, 1] and adding 3:
      // After enqueue: [2, 1, 3]
      // Rotate 1: [1, 3, 2] (moved 2 to back)
      // Rotate 2: [3, 2, 1] (moved 1 to back)
      // Result: 3 is at front! ✓
      for (let i = 0; i < n; i++) {
        // Dequeue from front and immediately enqueue to back
        // This effectively moves element from front to back
        const frontElement = this.queue.dequeue()!;
        this.queue.enqueue(frontElement);
      }

      // Result: Queue is now [x, ...older elements]
      // Stack top is at queue front!
    }

    /**
     * POP: Remove and return top element
     *
     * @returns Top element of stack
     * @throws Error if stack is empty
     *
     * HOW IT WORKS:
     * - Since rotation keeps top at front, just dequeue!
     * - No rotation needed
     *
     * WHY O(1)?
     * - Simple queue dequeue operation
     * - Top element is already at front
     *
     * EXAMPLE:
     * queue = [3, 2, 1]
     *         ↑ top
     * pop() → dequeue() → returns 3
     * queue = [2, 1]
     *         ↑ new top
     */
    pop(): number {
      // EDGE CASE: Empty stack
      // WHY: Prevent returning undefined
      if (this.empty()) {
        throw new Error("Stack Underflow: Cannot pop from empty stack");
      }

      // Simply dequeue from front
      // WHY: Rotation ensures top is at front
      // No need to search or transfer elements!
      return this.queue.dequeue()!;
    }

    /**
     * TOP: View top element without removing
     *
     * @returns Top element of stack
     * @throws Error if stack is empty
     *
     * HOW IT WORKS:
     * - Top element is at front of queue
     * - Just peek without removing
     *
     * WHY O(1)?
     * - Simple queue peek operation
     *
     * EXAMPLE:
     * queue = [3, 2, 1]
     *         ↑ top
     * top() → peek() → returns 3 (no removal)
     * queue = [3, 2, 1] (unchanged)
     */
    top(): number {
      // EDGE CASE: Empty stack
      if (this.empty()) {
        throw new Error("Stack is empty: Cannot view top");
      }

      // Simply peek at front
      // WHY: Top is at front due to rotation
      return this.queue.peek()!;
    }

    /**
     * EMPTY: Check if stack has no elements
     *
     * @returns true if empty, false otherwise
     *
     * HOW IT WORKS:
     * - Check if queue is empty
     *
     * WHY O(1)?
     * - Simple queue isEmpty check
     */
    empty(): boolean {
      return this.queue.isEmpty();
    }

    /**
     * SIZE: Get number of elements (Helper method)
     *
     * @returns Number of elements in stack
     *
     * WHY useful?
     * - Debugging and testing
     */
    size(): number {
      return this.queue.size();
    }

    /**
     * DISPLAY: Print stack contents (Helper for visualization)
     */
    display(): void {
      if (this.empty()) {
        console.log("Stack: [] (empty)");
        return;
      }

      // Access queue items for display
      // Note: This is just for visualization
      const items = (this.queue as any).items;
      console.log("Stack (top → bottom):", items.join(" → "));
      console.log("                       ↑ TOP (at queue front)");
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Example: From problem
   * ["MyStack", "push", "push", "top", "pop", "empty"]
   * [[], [1], [2], [], [], []]
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * INITIAL STATE
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * stack = new MyStack()
   * queue: []
   *
   * Visual:
   * ┌─────────┐
   * │  EMPTY  │
   * └─────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 1: push(1)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * queue: []
   *
   * Step 1: size = 0 (remember size before adding)
   *
   * Step 2: enqueue(1)
   * queue: [1]
   *
   * Step 3: Rotate 0 times (no existing elements)
   * - Loop: for i from 0 to -1 (doesn't execute)
   *
   * After:
   * queue: [1]
   *         ↑ front (top of stack)
   *
   * Visual:
   * ┌─────────┐
   * │    1    │ ← TOP
   * └─────────┘
   *
   * WHY no rotation?
   * - No existing elements to rotate
   * - First element is naturally at front
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 2: push(2)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * queue: [1]
   *
   * Step 1: size = 1 (one existing element)
   *
   * Step 2: enqueue(2)
   * queue: [1, 2]
   *         ↑front  ↑back
   *
   * Step 3: Rotate 1 time
   * WHY 1 time? Because there was 1 element before adding
   *
   * Rotation 1:
   *   Current queue: [1, 2]
   *   Action: dequeue() → gets 1
   *           enqueue(1) → adds 1 to back
   *   Result: [2, 1]
   *           ↑front  ↑back
   *
   * After:
   * queue: [2, 1]
   *         ↑ front (top of stack)
   *
   * Visual:
   * ┌─────────┐
   * │    2    │ ← TOP (newest)
   * ├─────────┤
   * │    1    │
   * └─────────┘
   *
   * WHY this works?
   * - After rotation, newest element (2) is at front
   * - Older element (1) moved to back
   * - Stack order achieved: [top → bottom] = [2 → 1]
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 3: top()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Current State:
   * queue: [2, 1]
   *
   * Action:
   * 1. Check empty() → false
   * 2. Return queue.peek()
   *    = queue[0]
   *    = 2
   *
   * After:
   * queue: [2, 1]  ← NO CHANGE (peek doesn't remove)
   * Returns: 2
   *
   * Visual:
   * ┌─────────┐
   * │    2    │ ← TOP (just peeked)
   * ├─────────┤
   * │    1    │
   * └─────────┘
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 4: pop()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * queue: [2, 1]
   *
   * Action:
   * 1. Check empty() → false
   * 2. queue.dequeue()
   *    - Removes first element (2)
   *    - Returns 2
   *
   * After:
   * queue: [1]
   *         ↑ front (new top)
   * Returns: 2
   *
   * Visual:
   * ┌─────────┐
   * │    1    │ ← TOP (after removing 2)
   * └─────────┘
   *
   * WHY simple?
   * - No rotation needed for pop
   * - Top is already at front
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 5: empty()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Current State:
   * queue: [1]
   *
   * Action: queue.isEmpty()
   *         → queue.length === 0
   *         → 1 === 0
   *         → false
   *
   * Returns: false
   *
   * WHY false?
   * - Stack still has 1 element
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * DETAILED EXAMPLE: push(1), push(2), push(3)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Starting empty: queue = []
   *
   * ───────────────────────────────────────────────────────────────────────────
   * push(1):
   * ───────────────────────────────────────────────────────────────────────────
   * size = 0
   * enqueue(1): [1]
   * rotate 0 times
   * Result: [1]
   *
   * ───────────────────────────────────────────────────────────────────────────
   * push(2):
   * ───────────────────────────────────────────────────────────────────────────
   * size = 1
   * enqueue(2): [1, 2]
   * rotate 1 time:
   *   [1, 2] → dequeue 1, enqueue 1 → [2, 1]
   * Result: [2, 1]
   *          ↑ 2 is at front
   *
   * ───────────────────────────────────────────────────────────────────────────
   * push(3):
   * ───────────────────────────────────────────────────────────────────────────
   * size = 2
   * enqueue(3): [2, 1, 3]
   * rotate 2 times:
   *
   *   Round 1: [2, 1, 3]
   *            dequeue 2, enqueue 2
   *            → [1, 3, 2]
   *
   *   Round 2: [1, 3, 2]
   *            dequeue 1, enqueue 1
   *            → [3, 2, 1]
   *
   * Result: [3, 2, 1]
   *          ↑ 3 is at front
   *
   * Stack representation:
   * ┌─────────┐
   * │    3    │ ← TOP
   * ├─────────┤
   * │    2    │
   * ├─────────┤
   * │    1    │ ← BOTTOM
   * └─────────┘
   *
   * Queue state: [3, 2, 1]
   *               ↑front   ↑back
   *
   * ───────────────────────────────────────────────────────────────────────────
   * pop() three times:
   * ───────────────────────────────────────────────────────────────────────────
   * pop() → dequeue → 3, queue = [2, 1]
   * pop() → dequeue → 2, queue = [1]
   * pop() → dequeue → 1, queue = []
   *
   * Perfect LIFO behavior! ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * WHY ROTATION WORKS - Mathematical Proof
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Initial queue with n elements: [a₁, a₂, ..., aₙ]
   *
   * After enqueue(x): [a₁, a₂, ..., aₙ, x]
   *
   * After n rotations:
   *   Rotation 1: [a₂, a₃, ..., aₙ, x, a₁]
   *   Rotation 2: [a₃, a₄, ..., aₙ, x, a₁, a₂]
   *   ...
   *   Rotation n: [x, a₁, a₂, ..., aₙ]
   *
   * Result: x is at front! ✓
   *
   * General pattern:
   * - After k rotations, first k elements move to back
   * - After n rotations, all n elements moved to back
   * - New element (x) is now at front
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * 1. Pop from empty stack:
   *    queue: []
   *    pop() → throws Error "Stack Underflow"
   *    WHY? No elements to pop
   *
   * 2. Top on empty stack:
   *    queue: []
   *    top() → throws Error "Stack is empty"
   *    WHY? No element to view
   *
   * 3. Single element:
   *    push(5) → queue: [5] (no rotation needed)
   *    pop() → returns 5, queue: []
   *
   * 4. Multiple push-pop:
   *    push(1), push(2), push(3) → queue: [3, 2, 1]
   *    pop() → 3 (LIFO ✓)
   *    pop() → 2
   *    pop() → 1
   *    Order: Last pushed (3) is first popped
   *
   * 5. Alternating operations:
   *    push(1) → [1]
   *    push(2) → [2, 1]
   *    pop() → 2, queue: [1]
   *    push(3) → enqueue(3): [1, 3]
   *              rotate 1: [3, 1]
   *    top() → 3
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Time Complexity:
   * - push(x):  O(n) - Rotate n elements
   * - pop():    O(1) - Simple dequeue
   * - top():    O(1) - Simple peek
   * - empty():  O(1) - Check isEmpty
   *
   * Detailed push analysis:
   * - enqueue: O(1)
   * - rotation loop: n iterations × O(1) per iteration = O(n)
   * - Total: O(1) + O(n) = O(n)
   *
   * Space Complexity: O(n)
   * - Single queue storing n elements
   * - Most space-efficient (only 1 queue!)
   * - No extra data structures needed
   *
   * Comparison with two-queue approach:
   * - Time: Same (both have O(n) operation)
   * - Space: Better! (1 queue vs 2 queues)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   */

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * TEST CASES
   * ═══════════════════════════════════════════════════════════════════════════
   */
  export function runTests(): void {
    console.log("🧪 Testing Stack using Queue - One Queue Rotation\n");
    console.log("═".repeat(70));

    // ─────────────────────────────────────────────────────────────────────────
    // Test 1: Basic operations (Example from problem)
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\nTest 1: Basic push, top, pop operations");
    console.log("─".repeat(70));
    const stack1 = new MyStack();
    stack1.push(1);
    stack1.push(2);
    console.log("After push(1), push(2):");
    stack1.display();

    const top1 = stack1.top();
    console.log(`\ntop() = ${top1}`);
    console.log(`Expected: 2`);
    console.log(top1 === 2 ? "✓ PASS" : "✗ FAIL");

    const pop1 = stack1.pop();
    console.log(`\npop() = ${pop1}`);
    console.log("After pop():");
    stack1.display();
    console.log(`Expected: 2, stack should have [1]`);
    console.log(pop1 === 2 ? "✓ PASS" : "✗ FAIL");

    const empty1 = stack1.empty();
    console.log(`\nempty() = ${empty1}`);
    console.log(`Expected: false`);
    console.log(empty1 === false ? "✓ PASS" : "✗ FAIL");

    // ─────────────────────────────────────────────────────────────────────────
    // Test 2: Empty stack operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 2: Empty stack behavior");
    console.log("─".repeat(70));
    const stack2 = new MyStack();
    console.log("New empty stack:");
    stack2.display();

    const empty2 = stack2.empty();
    console.log(`empty() = ${empty2}`);
    console.log(`Expected: true`);
    console.log(empty2 === true ? "✓ PASS" : "✗ FAIL");

    // ─────────────────────────────────────────────────────────────────────────
    // Test 3: LIFO verification
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 3: LIFO behavior verification");
    console.log("─".repeat(70));
    const stack3 = new MyStack();
    const pushSeq = [10, 20, 30, 40, 50];
    console.log(`Pushing: ${pushSeq.join(", ")}`);
    pushSeq.forEach((val) => stack3.push(val));
    stack3.display();

    const popSeq: number[] = [];
    console.log("\nPopping all elements:");
    while (!stack3.empty()) {
      const val = stack3.pop();
      popSeq.push(val);
      console.log(`  Popped: ${val}`);
    }

    console.log(`\nPop sequence: ${popSeq.join(", ")}`);
    console.log(`Expected: 50, 40, 30, 20, 10 (reverse of push)`);
    const expectedPop = [50, 40, 30, 20, 10];
    const isLIFO = popSeq.every((val, idx) => val === expectedPop[idx]);
    console.log(isLIFO ? "✓ PASS - LIFO verified" : "✗ FAIL");

    // ─────────────────────────────────────────────────────────────────────────
    // Test 4: Rotation verification
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 4: Rotation brings latest to front");
    console.log("─".repeat(70));
    const stack4 = new MyStack();
    console.log("push(1):");
    stack4.push(1);
    stack4.display();

    console.log("\npush(2):");
    stack4.push(2);
    stack4.display();

    console.log("\npush(3):");
    stack4.push(3);
    stack4.display();

    const top4 = stack4.top();
    console.log(`\ntop() = ${top4} (should be 3, the latest)`);
    console.log(top4 === 3 ? "✓ PASS" : "✗ FAIL");

    // ─────────────────────────────────────────────────────────────────────────
    // Test 5: Top doesn't modify stack
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 5: top() should not modify stack");
    console.log("─".repeat(70));
    const stack5 = new MyStack();
    stack5.push(100);
    stack5.push(200);
    console.log("After push(100), push(200):");
    stack5.display();

    const top5a = stack5.top();
    const size5a = stack5.size();
    const top5b = stack5.top();
    const size5b = stack5.size();

    console.log(`\nCalled top() twice:`);
    console.log(`  1st: ${top5a}, size: ${size5a}`);
    console.log(`  2nd: ${top5b}, size: ${size5b}`);
    console.log(`Expected: Both return 200, size stays 2`);

    console.log(
      top5a === 200 && top5b === 200 && size5a === 2 && size5b === 2
        ? "✓ PASS"
        : "✗ FAIL"
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Test 6: Alternating operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 6: Alternating push and pop operations");
    console.log("─".repeat(70));
    const stack6 = new MyStack();
    console.log("push(1) → pop() → push(2) → push(3) → pop()");

    stack6.push(1);
    const p1 = stack6.pop(); // Should get 1
    stack6.push(2);
    stack6.push(3);
    const p2 = stack6.pop(); // Should get 3

    console.log(`Results: popped ${p1}, then popped ${p2}`);
    console.log(`Expected: 1, 3`);
    console.log(`Remaining: ${stack6.top()} (should be 2)`);
    console.log(
      p1 === 1 && p2 === 3 && stack6.top() === 2 ? "✓ PASS" : "✗ FAIL"
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Test 7: Large number of operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 7: Large number of operations");
    console.log("─".repeat(70));
    const stack7 = new MyStack();
    const n = 100;
    console.log(`Pushing ${n} elements (1 to ${n})...`);
    for (let i = 1; i <= n; i++) {
      stack7.push(i);
    }
    console.log(`Size: ${stack7.size()}`);
    console.log(`Top element: ${stack7.top()}`);

    let correct7 = true;
    for (let i = n; i >= 1; i--) {
      const val = stack7.pop();
      if (val !== i) {
        console.log(`✗ Expected ${i}, got ${val}`);
        correct7 = false;
        break;
      }
    }

    console.log(`After popping all: empty() = ${stack7.empty()}`);
    console.log(correct7 && stack7.empty() ? "✓ PASS" : "✗ FAIL");

    // ─────────────────────────────────────────────────────────────────────────
    // Test 8: Error handling - pop from empty
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 8: Error handling - pop from empty stack");
    console.log("─".repeat(70));
    const stack8 = new MyStack();
    try {
      stack8.pop();
      console.log("✗ FAIL - Should have thrown error");
    } catch (error) {
      console.log(`Caught error: ${(error as Error).message}`);
      console.log("✓ PASS - Correctly throws error");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Test 9: Error handling - top on empty
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 9: Error handling - top on empty stack");
    console.log("─".repeat(70));
    const stack9 = new MyStack();
    try {
      stack9.top();
      console.log("✗ FAIL - Should have thrown error");
    } catch (error) {
      console.log(`Caught error: ${(error as Error).message}`);
      console.log("✓ PASS - Correctly throws error");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Test 10: Single element operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("\nTest 10: Single element operations");
    console.log("─".repeat(70));
    const stack10 = new MyStack();
    stack10.push(42);
    console.log("After push(42):");
    stack10.display();

    const top10 = stack10.top();
    console.log(`top() = ${top10} (expected: 42)`);

    const pop10 = stack10.pop();
    console.log(`pop() = ${pop10} (expected: 42)`);

    const empty10 = stack10.empty();
    console.log(`empty() = ${empty10} (expected: true)`);

    console.log(
      top10 === 42 && pop10 === 42 && empty10 === true ? "✓ PASS" : "✗ FAIL"
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Summary
    // ─────────────────────────────────────────────────────────────────────────
    console.log("\n" + "═".repeat(70));
    console.log("All tests completed! ✓");
    console.log("═".repeat(70));
    console.log("\nRotation technique successfully converts FIFO to LIFO!");
    console.log("Space-optimized: Uses only ONE queue! 🎯");
  }
}

// Execute tests
StackUsingQueueRotation.runTests();