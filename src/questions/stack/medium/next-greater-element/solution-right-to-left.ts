/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PROBLEM: Next Greater Element (Monotonic Stack)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Find the next greater element for each element in array.
 * Next Greater Element = First element to the right that is greater.
 *
 * Pattern: Monotonic Stack (Very Important Interview Pattern!)
 */

namespace NextGreaterElementMonotonicStack {
  /**
   * Main function - Find Next Greater Elements
   *
   * @param arr - Input array
   * @returns Array where result[i] = NGE of arr[i]
   *
   * APPROACH: Monotonic Decreasing Stack (Right to Left)
   *
   * KEY INSIGHT:
   * - Process array from RIGHT to LEFT
   * - Stack maintains potential NGE candidates in DECREASING order
   * - For each element, pop smaller elements (they're useless)
   * - Stack top is the nearest greater element
   *
   * WHY RIGHT to LEFT?
   * - When at position i, all elements to right are already processed
   * - Stack has potential NGE candidates for position i
   * - We can answer NGE[i] immediately
   *
   * EXAMPLE:
   * arr = [1, 3, 2, 4]
   *
   * i=3 (4): stack=[] → NGE=-1, push 4
   * i=2 (2): stack=[4], top=4>2 → NGE=4, push 2
   * i=1 (3): stack=[4,2], 2<3 pop, 4>3 → NGE=4, push 3
   * i=0 (1): stack=[4,3], top=3>1 → NGE=3, push 1
   *
   * Result: [3, 4, 4, -1]
   */
  function nextGreaterElements(arr: number[]): number[] {
    const n = arr.length;
    const result: number[] = new Array(n);
    const stack: number[] = []; // Monotonic decreasing stack

    // ═════════════════════════════════════════════════════════════════════
    // PROCESS RIGHT TO LEFT
    // ═════════════════════════════════════════════════════════════════════
    // WHY: Build NGE answers as we go
    // Stack contains potential NGE candidates
    for (let i = n - 1; i >= 0; i--) {
      // ───────────────────────────────────────────────────────────────────
      // STEP 1: Pop smaller or equal elements from stack
      // ───────────────────────────────────────────────────────────────────
      // WHY: Elements smaller than current can NEVER be NGE for left elements
      //
      // REASON: Current element "shadows" them
      // Example: If current=5 and stack has [3, 7]
      //          Top=3 < 5 → Elements on left will see 5 first, not 3
      //          → 3 is useless → POP it!
      //
      // INVARIANT: After this loop, stack is in decreasing order
      //            (or empty if no greater element exists)
      while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
        stack.pop();
      }

      // ───────────────────────────────────────────────────────────────────
      // STEP 2: Find NGE from stack
      // ───────────────────────────────────────────────────────────────────
      // WHY: Stack top is the NEAREST greater element
      //
      // CASES:
      // 1. Stack empty: No greater element to right → NGE = -1
      // 2. Stack not empty: Top is first greater element → NGE = stack.top()
      //
      // WHY stack top is NEAREST?
      // - Stack is in decreasing order (larger elements at bottom)
      // - Top is smallest among all greater elements
      // - Top is also closest (added most recently from right)
      if (stack.length === 0) {
        result[i] = -1; // No greater element found
      } else {
        result[i] = stack[stack.length - 1]; // Stack top is NGE
      }

      // ───────────────────────────────────────────────────────────────────
      // STEP 3: Push current element
      // ───────────────────────────────────────────────────────────────────
      // WHY: Current element is a potential NGE for elements on left
      //
      // INVARIANT MAINTAINED:
      // - After push, stack remains in decreasing order
      // - Because we already popped all elements <= current
      // - New element becomes the smallest (at top)
      stack.push(arr[i]);
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Example: arr = [6, 8, 0, 1, 3]
   *
   * We'll trace through each step showing:
   * - Current element and index
   * - Stack state before/after
   * - Pop operations
   * - NGE determination
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * INITIAL STATE
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * arr = [6, 8, 0, 1, 3]
   * result = [_, _, _, _, _]
   * stack = []
   *
   * Processing direction: RIGHT → LEFT (i=4 → i=0)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * ITERATION 1: i=4, arr[4]=3
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * stack = []
   * arr[4] = 3
   *
   * Step 1: Pop smaller elements
   * - while stack not empty AND top <= 3
   * - Stack is empty → skip
   *
   * Step 2: Find NGE
   * - Stack is empty
   * - result[4] = -1 (no greater element to right)
   *
   * Step 3: Push current
   * - stack.push(3)
   *
   * After:
   * stack = [3]
   *         ↑ top
   * result = [_, _, _, _, -1]
   *
   * Visual:
   * Array: [6, 8, 0, 1, 3]
   *                      ↑ processed
   * Stack: [3] (decreasing from bottom to top)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * ITERATION 2: i=3, arr[3]=1
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * stack = [3]
   * arr[3] = 1
   *
   * Step 1: Pop smaller elements
   * - while stack not empty AND top <= 1
   * - top = 3 > 1 → Stop (don't pop)
   *
   * Step 2: Find NGE
   * - Stack not empty
   * - result[3] = stack.top() = 3 ✓
   *
   * Step 3: Push current
   * - stack.push(1)
   *
   * After:
   * stack = [3, 1]
   *         ↑  ↑ top
   *      bottom
   * result = [_, _, _, 3, -1]
   *
   * Visual:
   * Array: [6, 8, 0, 1, 3]
   *                   ↑    ↑
   *            processed   NGE=3
   *
   * Stack: [3, 1] (decreasing: 3 > 1 ✓)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * ITERATION 3: i=2, arr[2]=0
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * stack = [3, 1]
   * arr[2] = 0
   *
   * Step 1: Pop smaller elements
   * - while stack not empty AND top <= 0
   * - top = 1 > 0 → Stop
   *
   * Step 2: Find NGE
   * - Stack not empty
   * - result[2] = stack.top() = 1 ✓
   *
   * Step 3: Push current
   * - stack.push(0)
   *
   * After:
   * stack = [3, 1, 0]
   *         ↑     ↑ top
   * result = [_, _, 1, 3, -1]
   *
   * Visual:
   * Array: [6, 8, 0, 1, 3]
   *                ↑  ↑
   *         processed  NGE=1
   *
   * Stack: [3, 1, 0] (decreasing: 3 > 1 > 0 ✓)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * ITERATION 4: i=1, arr[1]=8 (IMPORTANT - Multiple Pops!)
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * stack = [3, 1, 0]
   * arr[1] = 8
   *
   * Step 1: Pop smaller elements (CRITICAL STEP)
   * - while stack not empty AND top <= 8
   *
   *   Pop 1: top = 0 <= 8? YES
   *   - stack.pop() → 0 removed
   *   - stack = [3, 1]
   *
   *   Pop 2: top = 1 <= 8? YES
   *   - stack.pop() → 1 removed
   *   - stack = [3]
   *
   *   Pop 3: top = 3 <= 8? YES
   *   - stack.pop() → 3 removed
   *   - stack = []
   *
   *   Pop 4: stack empty → STOP
   *
   * WHY pop all these?
   * - 8 is bigger than all of them (0, 1, 3)
   * - Elements on left will see 8 first
   * - 0, 1, 3 can never be NGE for left elements
   * - They're "shadowed" by 8!
   *
   * Step 2: Find NGE
   * - Stack is empty
   * - result[1] = -1 (no greater element to right)
   *
   * Step 3: Push current
   * - stack.push(8)
   *
   * After:
   * stack = [8]
   *         ↑ top
   * result = [_, -1, 1, 3, -1]
   *
   * Visual:
   * Array: [6, 8, 0, 1, 3]
   *            ↑
   *      processed, NGE=-1 (largest so far)
   *
   * Stack: [8] (only 8 remains - largest element)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * ITERATION 5: i=0, arr[0]=6
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Before:
   * stack = [8]
   * arr[0] = 6
   *
   * Step 1: Pop smaller elements
   * - while stack not empty AND top <= 6
   * - top = 8 > 6 → Stop (don't pop)
   *
   * Step 2: Find NGE
   * - Stack not empty
   * - result[0] = stack.top() = 8 ✓
   *
   * Step 3: Push current
   * - stack.push(6)
   *
   * After:
   * stack = [8, 6]
   *         ↑  ↑ top
   * result = [8, -1, 1, 3, -1]
   *
   * Visual:
   * Array: [6, 8, 0, 1, 3]
   *         ↑  ↑
   *  processed  NGE=8
   *
   * Stack: [8, 6] (decreasing: 8 > 6 ✓)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * result = [8, -1, 1, 3, -1]
   *
   * Verification:
   * - arr[0]=6 → NGE=8 ✓ (next greater to right)
   * - arr[1]=8 → NGE=-1 ✓ (no greater element)
   * - arr[2]=0 → NGE=1 ✓ (next greater to right)
   * - arr[3]=1 → NGE=3 ✓ (next greater to right)
   * - arr[4]=3 → NGE=-1 ✓ (last element)
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * KEY OBSERVATIONS
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * 1. Stack Monotonicity:
   *    - Stack always maintains decreasing order
   *    - After each push, bottom → top is large → small
   *
   * 2. Pop Behavior:
   *    - Small elements get popped when larger element arrives
   *    - This is O(n) total, not O(n²):
   *      * Each element pushed once
   *      * Each element popped at most once
   *      * Total operations = 2n = O(n)
   *
   * 3. Stack Top Property:
   *    - Stack top is always the NEAREST greater element
   *    - Elements below are LARGER but FARTHER
   *    - Example: stack = [8, 6]
   *      * 8 is larger but farther from left elements
   *      * 6 is smaller but nearer
   *      * For left elements, 6 would be checked first
   *
   * 4. Why Right to Left:
   *    - Builds NGE answers incrementally
   *    - When at position i, all positions > i are solved
   *    - Stack has potential NGE candidates for position i
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * 1. Strictly Decreasing Array:
   *    arr = [5, 4, 3, 2, 1]
   *    - No element has greater element to right
   *    - result = [-1, -1, -1, -1, -1]
   *    - Stack grows to [5, 4, 3, 2, 1]
   *    - No pops happen!
   *
   * 2. Strictly Increasing Array:
   *    arr = [1, 2, 3, 4, 5]
   *    - Each element's NGE is next element
   *    - result = [2, 3, 4, 5, -1]
   *    - Many pops happen (all previous smaller elements)
   *
   * 3. Single Element:
   *    arr = [5]
   *    - result = [-1]
   *    - No element to right
   *
   * 4. Two Elements:
   *    arr = [3, 5]
   *    - result = [5, -1]
   *
   *    arr = [5, 3]
   *    - result = [-1, -1]
   *
   * 5. All Same Elements:
   *    arr = [3, 3, 3, 3]
   *    - result = [-1, -1, -1, -1]
   *    - Equal elements are popped (stack.top() <= arr[i])
   *
   * ═══════════════════════════════════════════════════════════════════════════
   * COMPLEXITY ANALYSIS
   * ═══════════════════════════════════════════════════════════════════════════
   *
   * Time Complexity: O(n)
   *
   * Detailed Analysis:
   * - Main loop: n iterations
   * - While loop (pop): Looks like O(n) per iteration = O(n²)?
   *   NO! Amortized analysis:
   *   * Each element is pushed ONCE
   *   * Each element is popped AT MOST ONCE
   *   * Total pushes = n
   *   * Total pops = at most n
   *   * Total operations = 2n = O(n)
   *
   * Example trace:
   * arr = [1, 2, 3, 4, 5]
   * - Push count: 5
   * - Pop count: 4 (1 popped when 2 comes, 2 popped when 3 comes, etc.)
   * - Total: 9 operations for 5 elements
   *
   * Space Complexity: O(n)
   *
   * Why?
   * - Stack can hold at most n elements
   * - Worst case: Strictly decreasing array
   *   * No pops happen
   *   * All n elements remain in stack
   * - Result array: O(n) but required for output
   *
   * ═══════════════════════════════════════════════════════════════════════════
   */

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * TEST CASES
   * ═══════════════════════════════════════════════════════════════════════════
   */
  export function runTests(): void {
    console.log('🧪 Testing Next Greater Element - Monotonic Stack\n');
    console.log('═'.repeat(70));

    // ─────────────────────────────────────────────────────────────────────────
    // Test 1: Example 1 from problem
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\nTest 1: Basic example [1, 3, 2, 4]');
    console.log('─'.repeat(70));
    const arr1 = [1, 3, 2, 4];
    const result1 = nextGreaterElements(arr1);
    console.log(`Input:  [${arr1.join(', ')}]`);
    console.log(`Output: [${result1.join(', ')}]`);
    console.log(`Expected: [3, 4, 4, -1]`);

    const expected1 = [3, 4, 4, -1];
    const pass1 = result1.every((val, idx) => val === expected1[idx]);
    console.log(pass1 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 2: Example 2 from problem
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 2: Mixed elements [6, 8, 0, 1, 3]');
    console.log('─'.repeat(70));
    const arr2 = [6, 8, 0, 1, 3];
    const result2 = nextGreaterElements(arr2);
    console.log(`Input:  [${arr2.join(', ')}]`);
    console.log(`Output: [${result2.join(', ')}]`);
    console.log(`Expected: [8, -1, 1, 3, -1]`);

    const expected2 = [8, -1, 1, 3, -1];
    const pass2 = result2.every((val, idx) => val === expected2[idx]);
    console.log(pass2 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 3: Strictly decreasing array
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 3: Strictly decreasing [5, 4, 3, 2, 1]');
    console.log('─'.repeat(70));
    const arr3 = [5, 4, 3, 2, 1];
    const result3 = nextGreaterElements(arr3);
    console.log(`Input:  [${arr3.join(', ')}]`);
    console.log(`Output: [${result3.join(', ')}]`);
    console.log(`Expected: [-1, -1, -1, -1, -1] (no NGE for any element)`);

    const expected3 = [-1, -1, -1, -1, -1];
    const pass3 = result3.every((val, idx) => val === expected3[idx]);
    console.log(pass3 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 4: Strictly increasing array
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 4: Strictly increasing [1, 2, 3, 4, 5]');
    console.log('─'.repeat(70));
    const arr4 = [1, 2, 3, 4, 5];
    const result4 = nextGreaterElements(arr4);
    console.log(`Input:  [${arr4.join(', ')}]`);
    console.log(`Output: [${result4.join(', ')}]`);
    console.log(`Expected: [2, 3, 4, 5, -1] (NGE is next element)`);

    const expected4 = [2, 3, 4, 5, -1];
    const pass4 = result4.every((val, idx) => val === expected4[idx]);
    console.log(pass4 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 5: Single element
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 5: Single element [42]');
    console.log('─'.repeat(70));
    const arr5 = [42];
    const result5 = nextGreaterElements(arr5);
    console.log(`Input:  [${arr5.join(', ')}]`);
    console.log(`Output: [${result5.join(', ')}]`);
    console.log(`Expected: [-1]`);

    console.log(result5[0] === -1 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 6: Two elements (ascending)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 6: Two elements ascending [3, 5]');
    console.log('─'.repeat(70));
    const arr6 = [3, 5];
    const result6 = nextGreaterElements(arr6);
    console.log(`Input:  [${arr6.join(', ')}]`);
    console.log(`Output: [${result6.join(', ')}]`);
    console.log(`Expected: [5, -1]`);

    console.log(result6[0] === 5 && result6[1] === -1 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 7: Two elements (descending)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 7: Two elements descending [5, 3]');
    console.log('─'.repeat(70));
    const arr7 = [5, 3];
    const result7 = nextGreaterElements(arr7);
    console.log(`Input:  [${arr7.join(', ')}]`);
    console.log(`Output: [${result7.join(', ')}]`);
    console.log(`Expected: [-1, -1]`);

    console.log(result7[0] === -1 && result7[1] === -1 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 8: All same elements
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 8: All same elements [7, 7, 7, 7]');
    console.log('─'.repeat(70));
    const arr8 = [7, 7, 7, 7];
    const result8 = nextGreaterElements(arr8);
    console.log(`Input:  [${arr8.join(', ')}]`);
    console.log(`Output: [${result8.join(', ')}]`);
    console.log(`Expected: [-1, -1, -1, -1] (equal elements have no NGE)`);

    const expected8 = [-1, -1, -1, -1];
    const pass8 = result8.every((val, idx) => val === expected8[idx]);
    console.log(pass8 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 9: Complex pattern
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 9: Complex pattern [2, 1, 2, 4, 3]');
    console.log('─'.repeat(70));
    const arr9 = [2, 1, 2, 4, 3];
    const result9 = nextGreaterElements(arr9);
    console.log(`Input:  [${arr9.join(', ')}]`);
    console.log(`Output: [${result9.join(', ')}]`);
    console.log(`Expected: [4, 2, 4, -1, -1]`);

    const expected9 = [4, 2, 4, -1, -1];
    const pass9 = result9.every((val, idx) => val === expected9[idx]);
    console.log(pass9 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Test 10: Large values
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('\nTest 10: Large values');
    console.log('─'.repeat(70));
    const arr10 = [1000000000, 999999999, 1000000001];
    const result10 = nextGreaterElements(arr10);
    console.log(`Input:  [${arr10.join(', ')}]`);
    console.log(`Output: [${result10.join(', ')}]`);
    console.log(`Expected: [1000000001, 1000000001, -1]`);

    const expected10 = [1000000001, 1000000001, -1];
    const pass10 = result10.every((val, idx) => val === expected10[idx]);
    console.log(pass10 ? '✓ PASS' : '✗ FAIL');

    // ─────────────────────────────────────────────────────────────────────────
    // Summary
    // ─────────────────────────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(70));
    console.log('All tests completed! ✓');
    console.log('═'.repeat(70));
    console.log('\nMonotonic Stack Pattern demonstrated successfully!');
    console.log('Time: O(n), Space: O(n) 🎯');
  }
}

// Execute tests
NextGreaterElementMonotonicStack.runTests();