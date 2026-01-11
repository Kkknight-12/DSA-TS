/**
 * https://gemini.google.com/gem/d7b41321a3f1/d221ce231af1a6b4
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * PROBLEM: Implement Queue using Array (Two Pointers Approach)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Queue: First-In-First-Out (FIFO) data structure
 * Operations: push (enqueue), pop (dequeue), peek, isEmpty
 *
 * Real-world analogy: Line at ticket counter
 * - New person joins at REAR (end of line)
 * - First person leaves from FRONT (start of line)
 * - First come, first served!
 */

namespace QueueArrayTwoPointers {
  /**
   * ArrayQueue Class - Two Pointers Implementation
   *
   * KEY INSIGHT: Use two pointers instead of shifting array
   *
   * Why two pointers?
   * - Avoid O(n) shifting operation
   * - front pointer: tracks first element
   * - rear pointer: tracks last element
   * - All operations become O(1)!
   *
   * Visual:
   * Array: [_, _, 5, 10, 15, _, _]
   *              ↑       ↑
   *            front   rear
   */
  class ArrayQueue {
    private items: number[];
    private front: number; // Index of first element
    private rear: number; // Index of last element

    /**
     * Constructor - Initialize empty queue
     *
     * WHY front = 0, rear = -1?
     * - front = 0: Ready to dequeue from index 0 (when elements exist)
     * - rear = -1: Indicates empty queue (no elements yet)
     * - First push will set rear = 0
     *
     * INVARIANT: Queue is empty when front > rear
     */
    constructor() {
      this.items = [];
      this.front = 0;
      this.rear = -1;
    }

    /**
     * PUSH (Enqueue): Add element to rear of queue
     *
     * @param x - Element to add
     *
     * HOW IT WORKS:
     * 1. Increment rear pointer
     * 2. Place element at rear position
     *
     * WHY O(1)?
     * - Just increment pointer and assign value
     * - No shifting or reallocation
     *
     * EXAMPLE:
     * Queue: [5, 10] (front=0, rear=1)
     * push(15)
     * → rear becomes 2
     * → items[2] = 15
     * → Queue: [5, 10, 15] (front=0, rear=2)
     *           ↑        ↑
     *         front    rear
     */
    push(x: number): void {
      // Step 1: Increment rear pointer
      // WHY: Points to next available position
      this.rear++;

      // Step 2: Place element at rear position
      // WHY: Add to end of queue
      // Note: Array automatically grows in JavaScript/TypeScript
      this.items[this.rear] = x;
    }

    /**
     * POP (Dequeue): Remove and return front element
     *
     * @returns The front element
     * @throws Error if queue is empty
     *
     * HOW IT WORKS:
     * 1. Check if empty
     * 2. Get element at front
     * 3. Increment front pointer
     * 4. OPTIMIZATION: Reset if queue becomes empty
     *
     * WHY O(1)?
     * - No shifting needed!
     * - Just move front pointer forward
     * - Element still in array but logically removed
     *
     * EXAMPLE:
     * Queue: [5, 10, 15] (front=0, rear=2)
     * pop()
     * → element = items[0] = 5
     * → front becomes 1
     * → Queue logically: [10, 15] (front=1, rear=2)
     *   Array physically: [5, 10, 15] ← 5 still there but ignored
     *                          ↑   ↑
     *                       front  rear
     */
    pop(): number {
      // EDGE CASE: Empty queue
      // WHY check? Prevent returning undefined
      if (this.isEmpty()) {
        throw new Error('Queue Underflow: Cannot dequeue from empty queue');
      }

      // Step 1: Get element at front
      // WHY: This is the element to return (first in line)
      const element = this.items[this.front];

      // Step 2: Move front pointer forward
      // WHY: Logically remove element from queue
      // The old element is still in array but we ignore it
      this.front++;

      // ─────────────────────────────────────────────────────────────────────
      // OPTIMIZATION: Reset when queue becomes empty
      // ─────────────────────────────────────────────────────────────────────
      // WHY?
      // - After many operations, front and rear move far right
      // - Space before front is wasted
      // - When empty, reset to reuse array from beginning
      //
      // EXAMPLE:
      // Array: [X, X, X, X, X, _, _, _]
      //                        ↑
      //                   front=5, rear=4
      // front > rear means empty!
      // Reset: front=0, rear=-1 to reuse array
      if (this.front > this.rear) {
        this.front = 0;
        this.rear = -1;
      }

      return element;
    }

    /**
     * PEEK: View front element without removing
     *
     * @returns The front element
     * @throws Error if queue is empty
     *
     * HOW IT WORKS:
     * 1. Check if empty
     * 2. Return element at front index
     * 3. DO NOT modify pointers
     *
     * WHY O(1)?
     * - Direct array access using front pointer
     * - No iteration needed
     *
     * EXAMPLE:
     * Queue: [5, 10, 15] (front=0, rear=2)
     * peek()
     * → returns items[0] = 5
     * → Queue unchanged: [5, 10, 15] (front=0, rear=2)
     */
    peek(): number {
      // EDGE CASE: Empty queue
      if (this.isEmpty()) {
        throw new Error('Queue is empty: Cannot peek');
      }

      // Return element at front WITHOUT removing it
      // WHY: Just viewing, not dequeuing
      return this.items[this.front];
    }

    /**
     * ISEMPTY: Check if queue has no elements
     *
     * @returns true if empty, false otherwise
     *
     * HOW IT WORKS:
     * - Compare front and rear pointers
     * - If front > rear, queue is empty
     *
     * WHY front > rear means empty?
     * - Initially: front=0, rear=-1 (empty) ✓
     * - After dequeue all: front moves past rear ✓
     * - After reset: front=0, rear=-1 (empty) ✓
     *
     * WHY O(1)?
     * - Simple pointer comparison
     *
     * EXAMPLES:
     * - front=0, rear=-1: Empty (0 > -1) ✓
     * - front=5, rear=4: Empty (5 > 4) ✓
     * - front=0, rear=0: Not empty (has 1 element) ✓
     * - front=2, rear=5: Not empty (has 4 elements) ✓
     */
    isEmpty(): boolean {
      return this.front > this.rear;
    }

    /**
     * SIZE: Get number of elements in queue (Helper method)
     *
     * @returns Number of elements
     *
     * HOW IT WORKS:
     * - If empty: return 0
     * - Otherwise: rear - front + 1
     *
     * WHY rear - front + 1?
     * - front=2, rear=5: elements at indices 2,3,4,5 = 4 elements
     * - Formula: 5 - 2 + 1 = 4 ✓
     *
     * EXAMPLES:
     * - front=0, rear=-1: size = 0 (empty)
     * - front=0, rear=0: size = 0-0+1 = 1
     * - front=2, rear=5: size = 5-2+1 = 4
     */
    size(): number {
      if (this.isEmpty()) {
        return 0;
      }
      return this.rear - this.front + 1;
    }

    /**
     * DISPLAY: Print queue contents (Helper for visualization)
     *
     * WHY useful?
     * - Debugging during development
     * - Understanding queue state
     * - Shows both logical and physical state
     */
    display(): void {
      if (this.isEmpty()) {
        console.log('Queue: [] (empty)');
        return;
      }

      const queueElements: number[] = [];
      for (let i = this.front; i <= this.rear; i++) {
        queueElements.push(this.items[i]);
      }

      console.log('Queue (front → rear):', queueElements.join(' → '));
      console.log(
        `                      ${'   '.repeat(queueElements.length - 1)}↑ REAR`
      );
      console.log(`Pointers: front=${this.front}, rear=${this.rear}`);
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Example: Sequence from Example 1
   * ["ArrayQueue", "push", "push", "peek", "pop", "isEmpty"]
   * [[], [5], [10], [], [], []]
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * INITIAL STATE
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * queue = new ArrayQueue()
   * items: []
   * front: 0
   * rear: -1
   *
   * Visual:
   * ┌─────────┐
   * │  EMPTY  │
   * └─────────┘
   * front=0, rear=-1
   * isEmpty: front > rear? 0 > -1? Yes ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 1: push(5)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: []
   * front: 0, rear: -1
   *
   * Action:
   * 1. rear++ → rear = 0
   * 2. items[0] = 5
   *
   * After:
   * items: [5]
   * front: 0, rear: 0
   *
   * Visual:
   * ┌─────────┐
   * │    5    │ ← FRONT & REAR (only element)
   * └─────────┘
   * Indices: [0]
   *
   * Size: rear - front + 1 = 0 - 0 + 1 = 1 ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 2: push(10)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: [5]
   * front: 0, rear: 0
   *
   * Action:
   * 1. rear++ → rear = 1
   * 2. items[1] = 10
   *
   * After:
   * items: [5, 10]
   * front: 0, rear: 1
   *
   * Visual:
   * ┌─────────┬─────────┐
   * │    5    │   10    │
   * └─────────┴─────────┘
   *      ↑          ↑
   *   FRONT      REAR
   * Indices: [0, 1]
   *
   * Size: 1 - 0 + 1 = 2 ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 3: peek()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Current State:
   * items: [5, 10]
   * front: 0, rear: 1
   *
   * Action:
   * 1. Check isEmpty() → false
   * 2. Return items[front] = items[0] = 5
   *
   * After:
   * items: [5, 10]  ← NO CHANGE (peek doesn't remove)
   * front: 0, rear: 1  ← Pointers unchanged
   * Returns: 5
   *
   * Visual:
   * ┌─────────┬─────────┐
   * │    5    │   10    │ ← Just peeked at 5
   * └─────────┴─────────┘
   *      ↑          ↑
   *   FRONT      REAR
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 4: pop()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: [5, 10]
   * front: 0, rear: 1
   *
   * Action:
   * 1. Check isEmpty() → false
   * 2. element = items[front] = items[0] = 5
   * 3. front++ → front = 1
   * 4. Check if empty (front > rear)? 1 > 1? No
   * 5. No reset needed
   *
   * After:
   * items: [5, 10]  ← Physically unchanged
   * front: 1, rear: 1  ← Front moved forward
   * Returns: 5
   *
   * Logical view:
   * ┌─────────┐
   * │   10    │ ← Only this is logically in queue
   * └─────────┘
   *      ↑
   *  FRONT & REAR
   *
   * Physical array:
   * [5, 10]  ← 5 is still there but ignored
   *     ↑
   *  front=1, rear=1
   *
   * Size: 1 - 1 + 1 = 1 ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * OPERATION 5: isEmpty()
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Current State:
   * front: 1, rear: 1
   *
   * Action: front > rear?
   *         1 > 1?
   *         No, false
   *
   * Returns: false
   *
   * WHY false?
   * - Queue still has 1 element (10 at index 1)
   * - front === rear means 1 element
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * BONUS: What happens if we pop() again?
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * items: [5, 10]
   * front: 1, rear: 1
   *
   * Action:
   * 1. element = items[1] = 10
   * 2. front++ → front = 2
   * 3. Check if empty: front > rear? 2 > 1? YES! ✓
   * 4. RESET: front = 0, rear = -1
   *
   * After:
   * items: [5, 10]  ← Still in memory
   * front: 0, rear: -1  ← RESET!
   * Returns: 10
   *
   * WHY reset?
   * - Queue is now empty
   * - Resetting allows array reuse from beginning
   * - Next push will use index 0 again
   * - Prevents array from growing indefinitely
   *
   * Visual:
   * ┌─────────┐
   * │  EMPTY  │
   * └─────────┘
   * front=0, rear=-1 (ready for reuse)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * DETAILED EXAMPLE: Multiple Operations with Reset
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Operation sequence: push(1), push(2), push(3), pop(), pop(), pop()
   *
   * 1. push(1): front=0, rear=0
   *    Array: [1]
   *
   * 2. push(2): front=0, rear=1
   *    Array: [1, 2]
   *
   * 3. push(3): front=0, rear=2
   *    Array: [1, 2, 3]
   *           ↑        ↑
   *         front    rear
   *
   * 4. pop() → returns 1: front=1, rear=2
   *    Array: [1, 2, 3]
   *              ↑     ↑
   *            front rear
   *    Logical: [2, 3]
   *
   * 5. pop() → returns 2: front=2, rear=2
   *    Array: [1, 2, 3]
   *                 ↑
   *            front=rear
   *    Logical: [3]
   *
   * 6. pop() → returns 3: front=3, rear=2
   *    Array: [1, 2, 3]
   *    front > rear (3 > 2) → EMPTY!
   *    RESET: front=0, rear=-1
   *
   * 7. Now if we push(4):
   *    rear++ → rear=0
   *    Array: [4, 2, 3]  ← Overwrites index 0!
   *           ↑
   *         front=0, rear=0
   *
   * This is how space is reused! ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * 1. Pop from empty queue:
   *    front=0, rear=-1
   *    pop() → throws Error "Queue Underflow"
   *    WHY? front > rear means no elements
   *
   * 2. Peek on empty queue:
   *    front=0, rear=-1
   *    peek() → throws Error "Queue is empty"
   *    WHY? No element to view
   *
   * 3. Single element push-pop:
   *    push(5) → front=0, rear=0
   *    pop() → front=1, rear=0 → front > rear → RESET
   *    Result: front=0, rear=-1 (empty)
   *
   * 4. Multiple push, then multiple pop:
   *    push(1), push(2), push(3) → [1,2,3], front=0, rear=2
   *    pop() → returns 1, front=1
   *    pop() → returns 2, front=2
   *    pop() → returns 3, front=3 > rear=2 → RESET
   *    WHY FIFO? First pushed (1) is first popped ✓
   *
   * 5. Peek doesn't modify queue:
   *    push(10) → [10], front=0, rear=0
   *    peek() → returns 10, pointers unchanged
   *    peek() → returns 10 again, still unchanged
   *    Can call peek() multiple times safely ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * COMPLEXITY SUMMARY
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Time Complexity:
   * - push(x):    O(1) - Increment pointer, assign value
   * - pop():      O(1) - Get value, increment pointer, possible reset
   * - peek():     O(1) - Direct array access
   * - isEmpty():  O(1) - Pointer comparison
   * - size():     O(1) - Arithmetic calculation
   *
   * Space Complexity: O(n)
   * - Where n = number of elements currently in queue
   * - Array stores elements from index front to rear
   * - Old elements before front waste space until reset
   * - Reset optimization reclaims space when empty
   *
   * Space usage pattern:
   * - Best case: O(k) where k = max elements at any time
   * - Worst case: O(n) where n = total elements ever added (before reset)
   * - Reset brings it back to best case
   *
   * ═══════════════════════════════════════════════════════════════════════════
   */

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * TEST CASES
   * ═══════════════════════════════════════════════════════════════════════════
   */
  export function runTests(): void {
    console.log('🧪 Testing Queue Implementation - Two Pointers\n');
    console.log('═'.repeat(70));

    // ─────────────────────────────────────────────────────────────────────────
    // Test 1: Basic operations (Example 1)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\nTest 1: Basic push, peek, pop operations');
    console.log('─'.repeat(70));
    const queue1 = new ArrayQueue();
    queue1.push(5);
    queue1.push(10);
    console.log('After push(5), push(10):');
    queue1.display();

    const peek1 = queue1.peek();
    console.log(`\npeek() = ${peek1}`);
    console.log(`Expected: 5`);
    console.log(peek1 === 5 ? '✓ PASS' : '✗ FAIL');

    const pop1 = queue1.pop();
    console.log(`\npop() = ${pop1}`);
    console.log('After pop():');
    queue1.display();
    console.log(`Expected: 5, queue should have [10]`);
    console.log(pop1 === 5 ? '✓ PASS' : '✗ FAIL');

    const isEmpty1 = queue1.isEmpty();
    console.log(`\nisEmpty() = ${isEmpty1}`);
    console.log(`Expected: false`);
    console.log(isEmpty1 === false ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 2: Empty queue operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 2: Empty queue behavior');
    console.log('─'.repeat(70));
    const queue2 = new ArrayQueue();
    console.log('New empty queue:');
    queue2.display();

    const isEmpty2a = queue2.isEmpty();
    console.log(`isEmpty() = ${isEmpty2a}`);
    console.log(`Expected: true`);
    console.log(isEmpty2a === true ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 3: FIFO verification
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 3: FIFO behavior verification');
    console.log('─'.repeat(70));
    const queue3 = new ArrayQueue();
    const pushSeq = [10, 20, 30, 40, 50];
    console.log(`Pushing: ${pushSeq.join(', ')}`);
    pushSeq.forEach((val) => queue3.push(val));
    queue3.display();

    const popSeq: number[] = [];
    console.log('\nPopping all elements:');
    while (!queue3.isEmpty()) {
      const val = queue3.pop();
      popSeq.push(val);
      console.log(`  Popped: ${val}`);
    }

    console.log(`\nPop sequence: ${popSeq.join(', ')}`);
    console.log(`Expected: 10, 20, 30, 40, 50 (same as push order)`);
    const isFIFO = popSeq.every((val, idx) => val === pushSeq[idx]);
    console.log(isFIFO ? '✓ PASS - FIFO verified' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 4: Reset optimization verification
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 4: Reset optimization after emptying queue');
    console.log('─'.repeat(70));
    const queue4 = new ArrayQueue();
    console.log('Push 3 elements, pop all, then push again:');
    queue4.push(1);
    queue4.push(2);
    queue4.push(3);
    console.log('After 3 pushes:');
    queue4.display();

    queue4.pop();
    queue4.pop();
    queue4.pop();
    console.log('\nAfter 3 pops (should be empty and reset):');
    queue4.display();
    console.log(`isEmpty: ${queue4.isEmpty()}`);

    queue4.push(100);
    console.log('\nAfter push(100) - should reuse index 0:');
    queue4.display();
    console.log(queue4.peek() === 100 ? '✓ PASS - Reset working' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 5: Peek doesn't modify queue
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 5: peek() should not modify queue');
    console.log('─'.repeat(70));
    const queue5 = new ArrayQueue();
    queue5.push(100);
    queue5.push(200);
    console.log('After push(100), push(200):');
    queue5.display();

    const peek5a = queue5.peek();
    const size5a = queue5.size();
    const peek5b = queue5.peek();
    const size5b = queue5.size();
    const peek5c = queue5.peek();
    const size5c = queue5.size();

    console.log(`\nCalled peek() three times:`);
    console.log(`  1st: ${peek5a}, size: ${size5a}`);
    console.log(`  2nd: ${peek5b}, size: ${size5b}`);
    console.log(`  3rd: ${peek5c}, size: ${size5c}`);
    console.log(`Expected: All return 100, size stays 2`);

    const allSame =
      peek5a === 100 &&
      peek5b === 100 &&
      peek5c === 100 &&
      size5a === 2 &&
      size5b === 2 &&
      size5c === 2;
    console.log(allSame ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 6: Large number of operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 6: Large number of operations');
    console.log('─'.repeat(70));
    const queue6 = new ArrayQueue();
    const n = 1000;
    console.log(`Enqueueing ${n} elements...`);
    for (let i = 1; i <= n; i++) {
      queue6.push(i);
    }
    console.log(`Size: ${queue6.size()}`);
    console.log(`Front element: ${queue6.peek()}`);

    let correct6 = true;
    for (let i = 1; i <= n; i++) {
      const val = queue6.pop();
      if (val !== i) {
        console.log(`✗ Expected ${i}, got ${val}`);
        correct6 = false;
        break;
      }
    }

    console.log(`After dequeuing all: isEmpty() = ${queue6.isEmpty()}`);
    console.log(correct6 && queue6.isEmpty() ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 7: Alternating operations
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 7: Alternating push and pop operations');
    console.log('─'.repeat(70));
    const queue7 = new ArrayQueue();
    console.log('push(1) → pop() → push(2) → push(3) → pop() → peek()');

    queue7.push(1);
    const p1 = queue7.pop(); // Should get 1
    queue7.push(2);
    queue7.push(3);
    const p2 = queue7.pop(); // Should get 2
    const peek7 = queue7.peek(); // Should see 3

    console.log(`Results: popped ${p1}, popped ${p2}, peeked ${peek7}`);
    console.log(`Expected: 1, 2, 3`);
    console.log(p1 === 1 && p2 === 2 && peek7 === 3 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 8: Error handling - pop from empty
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 8: Error handling - pop from empty queue');
    console.log('─'.repeat(70));
    const queue8 = new ArrayQueue();
    try {
      queue8.pop();
      console.log('✗ FAIL - Should have thrown error');
    } catch (error) {
      console.log(`Caught error: ${(error as Error).message}`);
      console.log('✓ PASS - Correctly throws error');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Test 9: Error handling - peek on empty
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 9: Error handling - peek on empty queue');
    console.log('─'.repeat(70));
    const queue9 = new ArrayQueue();
    try {
      queue9.peek();
      console.log('✗ FAIL - Should have thrown error');
    } catch (error) {
      console.log(`Caught error: ${(error as Error).message}`);
      console.log('✓ PASS - Correctly throws error');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Test 10: Size accuracy
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 10: Size tracking accuracy');
    console.log('─'.repeat(70));
    const queue10 = new ArrayQueue();
    console.log('Operations: push 3, pop 1, push 2, pop 2');

    console.log(`Initial size: ${queue10.size()} (expected: 0)`);
    queue10.push(1);
    queue10.push(2);
    queue10.push(3);
    console.log(`After 3 pushes: ${queue10.size()} (expected: 3)`);

    queue10.pop();
    console.log(`After 1 pop: ${queue10.size()} (expected: 2)`);

    queue10.push(4);
    queue10.push(5);
    console.log(`After 2 more pushes: ${queue10.size()} (expected: 4)`);

    queue10.pop();
    queue10.pop();
    console.log(`After 2 pops: ${queue10.size()} (expected: 2)`);

    const finalSize = queue10.size();
    console.log(finalSize === 2 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Summary
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('All tests completed! ✓');
    console.log('═'.repeat(70));
  }
}

// Execute tests
QueueArrayTwoPointers.runTests();