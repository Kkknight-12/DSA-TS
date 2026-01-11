namespace MinStackPairs {
  /**
   * Stack Item Structure
   * Har element ke saath hum us point tak ka minimum bhi store karenge.
   */
  interface StackItem {
    val: number;
    minSoFar: number;
  }

  /**
   * MIN STACK - PAIRS APPROACH (OPTIMAL)
   * ====================================
   *
   * Intuition (Soch):
   * ----------------
   * Normal stack mein humein purane elements ka pata nahi hota.
   * Agar hum har element ke saath ek "choti diary" (metadata) chipka dein jo bataye:
   * "Jab main stack mein aaya tha, tab sabse chota element kaun tha?",
   * toh humein baar-baar pura stack check nahi karna padega.
   *
   * Key Insight: 💡
   * Stack LIFO hai. Jab top element hateg (pop), toh uske neeche wala element
   * wahi purani state (aur wahi purana minimum) hold kar raha hoga.
   *
   * Visual Example:
   * ----------------
   * Push(5):  Stack -> [ {val: 5, min: 5} ]
   * Push(2):  Stack -> [ {val: 5, min: 5}, {val: 2, min: 2} ]
   * Push(8):  Stack -> [ {val: 5, min: 5}, {val: 2, min: 2}, {val: 8, min: 2} ]
   *
   * Notice: 8 push kiya, par min abhi bhi 2 hai.
   *
   * Algorithm:
   * ----------
   * 1. Push:
   *    - Agar stack empty hai, toh `val` hi min hai.
   *    - Nahi toh, `Math.min(val, currentTop.min)` naya min hoga.
   *    - `{val, newMin}` object push karo.
   * 2. Pop:
   *    - Simply array se last object hata do.
   * 3. Top/GetMin:
   *    - Last object ka properties access kar lo.
   *
   * Time Complexity: O(1)
   * - Har operation direct index access ya push/pop hai.
   *
   * Space Complexity: O(N)
   * - Har element ke liye extra object create kar rahe hain.
   */
  export class MinStack {
    // Array to store our pairs
    private stack: StackItem[];

    constructor() {
      // Initialize empty stack
      // WHY: To ensure we start with a clean state
      this.stack = [];
    }

    /**
     * Pushes value onto stack with calculated minimum
     * @param val - The number to push
     */
    push(val: number): void {
      // ═══════════════════════════════════════════════════════════
      // STEP 1: Handle Empty Stack
      // ═══════════════════════════════════════════════════════════
      
      // Check if stack is empty
      // WHY: The first element is always the minimum of the stack so far
      if (this.stack.length === 0) {
        this.stack.push({ val: val, minSoFar: val });
        return;
      }

      // ═══════════════════════════════════════════════════════════
      // STEP 2: Calculate New Minimum
      // ═══════════════════════════════════════════════════════════

      // Retrieve the current minimum from the top element
      // WHY: We need to compare the incoming value with the existing minimum
      const previousMin = this.stack[this.stack.length - 1].minSoFar;

      // Calculate new minimum
      // LOGIC: New Min is smaller of (New Value, Old Min)
      // EXAMPLE: If old min is 5 and new val is 2, new min becomes 2
      const currentMin = Math.min(val, previousMin);

      // ═══════════════════════════════════════════════════════════
      // STEP 3: Push Pair to Stack
      // ═══════════════════════════════════════════════════════════

      // Push the pair {value, currentMin}
      // WHY: Storing history (snapshot) so we don't need to recalculate later
      this.stack.push({ val: val, minSoFar: currentMin });
    }

    /**
     * Removes the top element
     */
    pop(): void {
      // Edge Case: Stack is empty
      // WHY: Cannot pop from empty stack
      if (this.stack.length === 0) return;

      // Step 1: Remove the last element
      // WHY: This removes both the value AND the minimum state associated with it
      this.stack.pop();
    }

    /**
     * Returns the top element's value
     */
    top(): number {
      // Edge Case: Check empty
      if (this.stack.length === 0) {
        throw new Error('Stack is empty');
      }
      // Return only the value part
      return this.stack[this.stack.length - 1].val;
    }

    /**
     * Returns the minimum element in constant time
     */
    getMin(): number {
      // Edge Case: Check empty
      if (this.stack.length === 0) {
        throw new Error('Stack is empty');
      }
      // Return the pre-calculated minimum
      return this.stack[this.stack.length - 1].minSoFar;
    }
  }

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('🧪 Testing Min Stack - [Pairs Approach]\n');

    const minStack = new MinStack();

    // Test 1: Basic Push and GetMin
    console.log('Test 1: Push -2, 0, -3');
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    console.log('GetMin (Expected -3):', minStack.getMin());
    console.log('✅ Pass:', minStack.getMin() === -3, '\n');

    // Test 2: Pop and restore previous min
    console.log('Test 2: Pop');
    minStack.pop(); // Removes -3
    console.log('Top (Expected 0):', minStack.top());
    console.log('GetMin (Expected -2):', minStack.getMin());
    console.log(
      '✅ Pass:',
      minStack.top() === 0 && minStack.getMin() === -2,
      '\n'
    );

    // Test 3: Push duplicate minimums
    console.log('Test 3: Push duplicate -2');
    minStack.push(-2); // Stack: [-2, 0, -2]
    console.log('GetMin (Expected -2):', minStack.getMin());
    minStack.pop(); // Remove duplicate -2
    console.log('GetMin after pop (Expected -2):', minStack.getMin());
    console.log('✅ Pass:', minStack.getMin() === -2, '\n');

    // Test 4: Ascending Order Input
    console.log('Test 4: Push 1, 2, 3');
    const ms2 = new MinStack();
    ms2.push(1);
    ms2.push(2);
    ms2.push(3);
    console.log('GetMin (Expected 1):', ms2.getMin());
    console.log('✅ Pass:', ms2.getMin() === 1, '\n');

    // Test 5: Descending Order Input
    console.log('Test 5: Push 3, 2, 1');
    const ms3 = new MinStack();
    ms3.push(3);
    ms3.push(2);
    ms3.push(1);
    console.log('GetMin (Expected 1):', ms3.getMin());
    ms3.pop(); // Remove 1
    console.log('GetMin after pop (Expected 2):', ms3.getMin());
    console.log('✅ Pass:', ms3.getMin() === 2, '\n');

    // Test 6: Single Element
    console.log('Test 6: Single Element 100');
    const ms4 = new MinStack();
    ms4.push(100);
    console.log('Top:', ms4.top(), 'Min:', ms4.getMin());
    console.log('✅ Pass:', ms4.top() === 100 && ms4.getMin() === 100, '\n');

    // Test 7: Large Negative Numbers
    console.log('Test 7: Large Negative');
    const ms5 = new MinStack();
    ms5.push(-10000);
    ms5.push(5);
    console.log('Min (Expected -10000):', ms5.getMin());
    console.log('✅ Pass:', ms5.getMin() === -10000, '\n');
  }
}

// Execute tests
MinStackPairs.runTests();

/**
 * ════════════════════════════════════════════════════════════════
 * DRY RUN - COMPLETE VISUALIZATION
 * ════════════════════════════════════════════════════════════════
 *
 * Example Input: ["push", -2], ["push", 0], ["push", -3], "getMin", "pop", "top", "getMin"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ INITIAL STATE                                                       │
 * └─────────────────────────────────────────────────────────────────────┘
 * Stack: []
 *
 * ═════════════════════════════════════════════════════════════════
 * OPERATIONS WALKTHROUGH
 * ═════════════════════════════════════════════════════════════════
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 1. Push(-2)                                                         │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Stack Empty? YES.
 * - Action: Push {val: -2, minSoFar: -2}
 *
 * Stack State:
 * ┌──────────────┐
 * │ { -2, -2 }   │ ← Top
 * └──────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 2. Push(0)                                                          │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Previous Min: -2
 * - Comparison: Math.min(0, -2) = -2
 * - Action: Push {val: 0, minSoFar: -2}
 *
 * Stack State:
 * ┌──────────────┐
 * │ {  0, -2 }   │ ← Top (Val: 0, Min: -2)
 * ├──────────────┤
 * │ { -2, -2 }   │
 * └──────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 3. Push(-3)                                                         │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Previous Min: -2
 * - Comparison: Math.min(-3, -2) = -3
 * - Action: Push {val: -3, minSoFar: -3}
 *
 * Stack State:
 * ┌──────────────┐
 * │ { -3, -3 }   │ ← Top (Val: -3, Min: -3)
 * ├──────────────┤
 * │ {  0, -2 }   │
 * ├──────────────┤
 * │ { -2, -2 }   │
 * └──────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 4. getMin()                                                         │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Access Top: { -3, -3 }
 * - Return minSoFar: -3
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 5. pop()                                                            │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Remove top element
 * - Removed: { -3, -3 }
 *
 * Stack State:
 * ┌──────────────┐
 * │ {  0, -2 }   │ ← New Top (Notice Min is back to -2!)
 * ├──────────────┤
 * │ { -2, -2 }   │
 * └──────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 6. top()                                                            │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Access Top: { 0, -2 }
 * - Return val: 0
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 7. getMin()                                                         │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Access Top: { 0, -2 }
 * - Return minSoFar: -2
 *
 * ═════════════════════════════════════════════════════════════════
 * EDGE CASES & INSIGHTS
 * ═════════════════════════════════════════════════════════════════
 *
 * 1. Duplicate Minimums:
 *    If we push another -2: Stack -> [..., {-2, -2}, {-2, -2}]
 *    Pop one, the other remains. Safe!
 *
 * 2. Ascending Order (5, 6, 7):
 *    Stack: [{5,5}, {6,5}, {7,5}]
 *    Min stays 5 until 5 is popped.
 *
 * 3. Why this works?
 *    The "minSoFar" captures the state of the stack *at that moment*.
 *    When we pop, we travel back in time to the previous state! 🕰️
 */
