/**
 * https://gemini.google.com/gem/9013c4cd97d5/757b19b2ba9f1dcd
 * https://gemini.google.com/gem/9013c4cd97d5/04ee0700b203ab8c
 * https://chatgpt.com/g/g-p-690b183fda608191a882804e321568e5-dsa/c/692bd8ab-a744-8320-b97b-c3e2f9a7cb48
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EXPRESSION ADD OPERATORS - BACKTRACKING
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Problem: Given a string of digits and a target value, insert +, -, *
 *          operators to create expressions that evaluate to target.
 *
 * Pattern: Backtracking with Expression Building
 *
 * Key Challenge: Handle multiplication precedence without re-evaluating
 *
 * Approach:
 * - Try all possible number groupings (single digit, multi-digit)
 * - For each grouping, try all operators (+, -, *)
 * - Track currentValue and lastOperand for multiplication handling
 * - Avoid leading zeros in multi-digit numbers
 * - Build expression string as we backtrack
 *
 * Time Complexity: O(4^n)
 * - At each position: ~4 choices (operators + multi-digit)
 * - Heavy pruning reduces actual attempts
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n)
 * - Expression string: O(n)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace ExpressionAddOperatorsBacktracking {
  /**
   * Main function: Find all expressions that evaluate to target
   *
   * @param num - String of digits (e.g., "123")
   * @param target - Target value to reach
   * @returns Array of valid expressions as strings
   */
  function addOperators(num: string, target: number): string[] {
    // Edge Case: Empty input
    // WHY: Cannot create expression from empty string
    if (num.length === 0) return [];

    // Step 1: Initialize results array
    // WHY: Collect all valid expressions
    const results: string[] = [];

    // Step 2: Start backtracking from index 0
    // WHY: Build expression from left to right
    // PARAMETERS:
    //   index: 0 (start)
    //   expression: "" (empty initially)
    //   currentValue: 0 (no calculation yet)
    //   lastOperand: 0 (no previous operand)
    backtrack(num, target, 0, '', 0, 0, results);

    // Step 3: Return all found expressions
    return results;
  }

  /**
   * Backtracking helper: Build and evaluate expressions
   *
   * @param num - Input digit string
   * @param target - Target value
   * @param index - Current position in num
   * @param expression - Expression built so far (e.g., "1+2*3")
   * @param currentValue - Current evaluation result
   * @param lastOperand - Last number added/subtracted (for * handling)
   * @param results - Array to collect valid expressions
   *
   * KEY INSIGHT: lastOperand tracks previous number for multiplication!
   *
   * Example: "2+3*4"
   *   After "2+3": currentValue=5, lastOperand=3
   *   See *4: Need to undo +3, do 3*4, add back
   *           = 5 - 3 + 3*4 = 2 + 12 = 14
   */
  function backtrack(
    num: string,
    target: number,
    index: number,
    expression: string,
    currentValue: number,
    lastOperand: number,
    results: string[]
  ): void {
    // BASE CASE: Processed all digits
    // WHY: Expression is complete, check if it equals target
    // EXAMPLE: For "123", when index=3, we've used all digits
    if (index === num.length) {
      // Check if final evaluation matches target
      if (currentValue === target) {
        results.push(expression);
      }
      return;
    }

    // RECURSIVE CASE: Try all possible numbers from current index
    // WHY: Can use single digit or multi-digit numbers
    //
    // Example: At index 0 of "123"
    //   Try "1" (index 0 to 0)
    //   Try "12" (index 0 to 1)
    //   Try "123" (index 0 to 2)

    for (let i = index; i < num.length; i++) {
      // Step 1: Extract number from index to i
      // EXAMPLE: num="123", index=0, i=1 → numStr="12"
      const numStr = num.substring(index, i + 1);

      // Step 2: CRITICAL - Avoid leading zeros!
      // WHY: "05", "012" are invalid numbers
      // EXCEPTION: Single "0" is valid
      //
      // Example:
      //   "0" ✓ valid
      //   "05" ✗ invalid (leading zero)
      //   "50" ✓ valid (no leading zero)
      if (numStr.length > 1 && numStr[0] === '0') {
        break; // Stop trying longer numbers (all will have leading zero)
      }

      // Step 3: Convert string to number
      // WHY: Need numeric value for calculations
      const currentNum = parseInt(numStr);

      // Step 4: Handle first number (no operator before it)
      // WHY: First number has no preceding operator
      // EXAMPLE: In "123", "1" is first, no "+1" or "-1"
      if (index === 0) {
        // First number: initialize with this value
        // currentValue = currentNum
        // lastOperand = currentNum (for future * operations)
        backtrack(
          num,
          target,
          i + 1, // Move to next position
          numStr, // Expression is just this number
          currentNum, // Current value is this number
          currentNum, // Last operand is this number
          results
        );
      } else {
        // Step 5: Not first number, try all operators

        // ─────────────────────────────────────────────────────────────
        // OPERATOR 1: Addition (+)
        // ─────────────────────────────────────────────────────────────
        // Formula: currentValue + currentNum
        // lastOperand: currentNum (for future multiplication)
        //
        // Example: "2" + 3
        //   newValue = 2 + 3 = 5
        //   newLast = 3
        backtrack(
          num,
          target,
          i + 1,
          expression + '+' + numStr,
          currentValue + currentNum,
          currentNum, // Last operand is current number
          results
        );

        // ─────────────────────────────────────────────────────────────
        // OPERATOR 2: Subtraction (-)
        // ─────────────────────────────────────────────────────────────
        // Formula: currentValue - currentNum
        // lastOperand: -currentNum (NEGATIVE! Important for *)
        //
        // Example: "2" - 3
        //   newValue = 2 - 3 = -1
        //   newLast = -3 (negative!)
        //
        // Why negative? For later multiplication:
        //   If we have "2-3*4":
        //   After "2-3": value=-1, last=-3
        //   See *4: -1 - (-3) + (-3)*4 = -1 + 3 - 12 = -10 ✓
        backtrack(
          num,
          target,
          i + 1,
          expression + '-' + numStr,
          currentValue - currentNum,
          -currentNum, // CRITICAL: Negative for subtraction!
          results
        );

        // ─────────────────────────────────────────────────────────────
        // OPERATOR 3: Multiplication (*) - THE TRICKY ONE!
        // ─────────────────────────────────────────────────────────────
        //
        // Challenge: Handle precedence without re-evaluating
        //
        // Example: "2+3*4" should be 14, not 20
        //
        // Current state after "2+3":
        //   currentValue = 5
        //   lastOperand = 3
        //
        // Want: 2 + (3*4) = 2 + 12 = 14
        //
        // Formula: currentValue - lastOperand + lastOperand * currentNum
        //
        // Step by step:
        //   1. Undo last operation: 5 - 3 = 2
        //   2. Do multiplication: 3 * 4 = 12
        //   3. Add to base: 2 + 12 = 14 ✓
        //
        // New lastOperand: lastOperand * currentNum = 3 * 4 = 12
        // WHY? For potential future multiplications!
        //   If next is "*5": 14 - 12 + 12*5 = 2 + 60 = 62
        //
        // Visual:
        //   Before: [base=2] + [last=3]     = 5
        //   After:  [base=2] + [last=3*4]   = 14
        //           Undo last ↑   Apply * ↑
        //
        backtrack(
          num,
          target,
          i + 1,
          expression + '*' + numStr,
          currentValue - lastOperand + lastOperand * currentNum,
          lastOperand * currentNum, // New last operand!
          results
        );
      }
    }
    // After trying all possible numbers from current index, return
    // (implicit backtrack to previous recursive call)
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input: num = "232", target = 8
   *
   * We'll trace TWO solutions:
   * 1. "2*3+2" = 6 + 2 = 8
   * 2. "2+3*2" = 2 + 6 = 8
   *
   * ═══════════════════════════════════════════════════════════════════════
   * SOLUTION 1: "2*3+2"
   * ═══════════════════════════════════════════════════════════════════════
   *
   * CALL 1: backtrack(num, target, 0, "", 0, 0, results)
   * ────────────────────────────────────────────────────────────────────
   * index = 0
   * Check: index === num.length? 0 === 3? NO
   *
   * Try different numbers starting from index 0:
   *
   * Loop iteration: i = 0 (try "2")
   *   numStr = num.substring(0, 1) = "2"
   *   Leading zero? length=1, skip check
   *   currentNum = 2
   *
   *   First number (index === 0):
   *     → backtrack(num, target, 1, "2", 2, 2, results)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ RECURSIVE CALL:                                                 │
   * │ From: backtrack(index=0)                                        │
   * │ To: backtrack(index=1)                                          │
   * │ Expression: "2"                                                 │
   * │ Current Value: 2                                                │
   * │ Last Operand: 2                                                 │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * CALL 2: backtrack(num, target, 1, "2", 2, 2, results)
   * ────────────────────────────────────────────────────────────────────
   * index = 1
   * expression = "2"
   * currentValue = 2
   * lastOperand = 2
   *
   * Try different numbers starting from index 1:
   *
   * Loop iteration: i = 1 (try "3")
   *   numStr = num.substring(1, 2) = "3"
   *   currentNum = 3
   *
   *   Not first number, try operators:
   *
   *   TRY OPERATOR: * (multiplication)
   *     New expression: "2" + "*" + "3" = "2*3"
   *     New value: 2 - 2 + 2*3 = 0 + 6 = 6
   *     New last: 2 * 3 = 6
   *
   *     ┌───────────────────────────────────────────────────────────┐
   *     │ MULTIPLICATION CALCULATION:                               │
   *     │ Formula: currentValue - lastOperand + lastOperand * num   │
   *     │        = 2 - 2 + 2*3                                      │
   *     │        = 0 + 6                                            │
   *     │        = 6                                                │
   *     │                                                           │
   *     │ New lastOperand = 2*3 = 6                                 │
   *     │ WHY? For future multiplications!                          │
   *     └───────────────────────────────────────────────────────────┘
   *
   *     → backtrack(num, target, 2, "2*3", 6, 6, results)
   *
   *
   * CALL 3: backtrack(num, target, 2, "2*3", 6, 6, results)
   * ────────────────────────────────────────────────────────────────────
   * index = 2
   * expression = "2*3"
   * currentValue = 6
   * lastOperand = 6
   *
   * Try different numbers starting from index 2:
   *
   * Loop iteration: i = 2 (try "2")
   *   numStr = num.substring(2, 3) = "2"
   *   currentNum = 2
   *
   *   Not first number, try operators:
   *
   *   TRY OPERATOR: + (addition)
   *     New expression: "2*3" + "+" + "2" = "2*3+2"
   *     New value: 6 + 2 = 8
   *     New last: 2
   *
   *     → backtrack(num, target, 3, "2*3+2", 8, 2, results)
   *
   *
   * CALL 4: backtrack(num, target, 3, "2*3+2", 8, 2, results)
   * ────────────────────────────────────────────────────────────────────
   * index = 3
   * expression = "2*3+2"
   * currentValue = 8
   * lastOperand = 2
   *
   * Check: index === num.length? 3 === 3? YES! ✓
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ BASE CASE HIT!                                                  │
   * │ Processed all digits                                            │
   * │ Check: currentValue === target? 8 === 8? YES! ✓                │
   * │ Action: results.push("2*3+2")                                   │
   * │ Found valid expression!                                         │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * results = ["2*3+2"]
   * return
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * SOLUTION 2: "2+3*2" (Showing Multiplication Precedence)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * This demonstrates WHY the multiplication formula is needed!
   *
   * CALL 1: backtrack(num, target, 0, "", 0, 0, results)
   *   Try "2" as first number
   *   → backtrack(num, target, 1, "2", 2, 2, results)
   *
   *
   * CALL 2: backtrack(num, target, 1, "2", 2, 2, results)
   *   Try "3" with operator "+"
   *
   *   New expression: "2+3"
   *   New value: 2 + 3 = 5
   *   New last: 3
   *
   *   ┌───────────────────────────────────────────────────────────────┐
   *   │ STATE AFTER ADDITION:                                         │
   *   │ expression = "2+3"                                            │
   *   │ currentValue = 5                                              │
   *   │ lastOperand = 3  ← IMPORTANT! Remember this for *            │
   *   └───────────────────────────────────────────────────────────────┘
   *
   *   → backtrack(num, target, 2, "2+3", 5, 3, results)
   *
   *
   * CALL 3: backtrack(num, target, 2, "2+3", 5, 3, results)
   *   Try "2" with operator "*"
   *
   *   ┌───────────────────────────────────────────────────────────────┐
   *   │ MULTIPLICATION WITH PRECEDENCE HANDLING:                      │
   *   │                                                               │
   *   │ Current state:                                                │
   *   │   expression = "2+3"                                          │
   *   │   currentValue = 5  (we already did 2+3)                     │
   *   │   lastOperand = 3   (the last number we added)               │
   *   │                                                               │
   *   │ Want to add: *2                                               │
   *   │ Desired result: 2 + (3*2) = 2 + 6 = 8                        │
   *   │                                                               │
   *   │ Problem: We already added 3, getting 5                       │
   *   │ Solution: Undo the +3, then add 3*2                          │
   *   │                                                               │
   *   │ Formula: currentValue - lastOperand + lastOperand * num      │
   *   │        = 5 - 3 + 3*2                                         │
   *   │        = 2 + 6                                               │
   *   │        = 8 ✓                                                 │
   *   │                                                               │
   *   │ Visual breakdown:                                            │
   *   │   Step 1: 5 - 3 = 2        (undo the +3)                    │
   *   │   Step 2: 3 * 2 = 6        (do the multiplication)          │
   *   │   Step 3: 2 + 6 = 8        (add to base)                    │
   *   │                                                               │
   *   │ New lastOperand = 3*2 = 6                                    │
   *   │ WHY? If next operator is *, we need this value!             │
   *   └───────────────────────────────────────────────────────────────┘
   *
   *   New expression: "2+3*2"
   *   New value: 8
   *   New last: 6
   *
   *   → backtrack(num, target, 3, "2+3*2", 8, 6, results)
   *
   *
   * CALL 4: backtrack(num, target, 3, "2+3*2", 8, 6, results)
   *   index = 3
   *   Check: index === num.length? 3 === 3? YES! ✓
   *   Check: currentValue === target? 8 === 8? YES! ✓
   *
   *   results.push("2+3*2")
   *
   * results = ["2*3+2", "2+3*2"]
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EXAMPLE: LEADING ZERO HANDLING
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Input: num = "105", target = 5
   *
   * Valid expressions:
   * - "1*0+5" ✓ (uses "1", "0", "5" separately)
   * - "10-5" ✓ (uses "10" and "5")
   *
   * Invalid (avoided by our code):
   * - "1*05" ✗ ("05" has leading zero)
   * - "105-100" ✗ (can't form 100 from 105)
   *
   * How leading zero check works:
   *
   * At index 1 (after "1"):
   *   Loop i=1: numStr = "0" ✓ (single zero is valid)
   *   Loop i=2: numStr = "05" → Check: length>1 && [0]=='0'? YES!
   *             → break (don't try longer numbers)
   *
   * This prevents "05", "056", etc.
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EXAMPLE: SUBTRACTION WITH MULTIPLICATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Expression: "5-2*3"
   * Expected: 5 - (2*3) = 5 - 6 = -1
   *
   * Trace:
   * 1. Process "5": value=5, last=5
   * 2. Process "-2": value=5-2=3, last=-2 (NEGATIVE!)
   * 3. Process "*3":
   *    Formula: 3 - (-2) + (-2)*3
   *           = 3 + 2 + (-6)
   *           = 5 - 6
   *           = -1 ✓
   *
   * Why last=-2? Because we subtracted 2!
   * When multiplying: need to undo -2, then do (-2)*3 = -6
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * KEY OBSERVATIONS
   * ═══════════════════════════════════════════════════════════════════════
   *
   * 1. Multiplication Formula:
   *    currentValue - lastOperand + lastOperand * currentNum
   *    - Undoes last operation
   *    - Applies multiplication
   *    - Adds back to base value
   *
   * 2. Last Operand Tracking:
   *    - Addition: lastOperand = number (positive)
   *    - Subtraction: lastOperand = -number (negative!)
   *    - Multiplication: lastOperand = previous * number
   *
   * 3. Leading Zero Prevention:
   *    - Single "0" is valid
   *    - Multi-digit starting with "0" is invalid
   *    - Break loop when detected (all longer numbers invalid too)
   *
   * 4. First Number Special Case:
   *    - No operator before first number
   *    - Initialize both currentValue and lastOperand with it
   *
   */

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Helper: Sort expressions for consistent comparison
   */
  function sortExpressions(expressions: string[]): string[] {
    return expressions.sort();
  }

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log('🧪 Testing Expression Add Operators - Backtracking\n');

    // Test 1: Basic example with multiplication and addition
    console.log("Test 1: num='123', target=6");
    const result1 = addOperators('123', 6);
    console.log(`Solutions found: ${result1.length}`);
    result1.forEach((expr) => console.log(`  ${expr}`));
    const expected1 = ['1*2*3', '1+2+3'];
    console.log(`Expected: ${expected1.join(', ')}`);
    console.log(
      `✓ ${
        JSON.stringify(sortExpressions(result1)) ===
        JSON.stringify(sortExpressions(expected1))
          ? 'PASS'
          : 'FAIL'
      }\n`
    );

    // Test 2: Multiplication precedence
    console.log("Test 2: num='232', target=8");
    const result2 = addOperators('232', 8);
    console.log(`Solutions found: ${result2.length}`);
    result2.forEach((expr) => console.log(`  ${expr}`));
    const expected2 = ['2*3+2', '2+3*2'];
    console.log(`Expected: ${expected2.join(', ')}`);
    console.log(
      `✓ ${
        JSON.stringify(sortExpressions(result2)) ===
        JSON.stringify(sortExpressions(expected2))
          ? 'PASS'
          : 'FAIL'
      }\n`
    );

    // Test 3: No solution
    console.log("Test 3: num='3456237490', target=9191");
    const result3 = addOperators('3456237490', 9191);
    console.log(`Solutions found: ${result3.length}`);
    console.log(`Expected: 0 solutions (no valid expressions)`);
    console.log(`✓ ${result3.length === 0 ? 'PASS' : 'FAIL'}\n`);

    // Test 4: Single digit
    console.log("Test 4: num='1', target=1");
    const result4 = addOperators('1', 1);
    console.log(`Solutions found: ${result4.length}`);
    result4.forEach((expr) => console.log(`  ${expr}`));
    console.log(`Expected: ["1"]`);
    console.log(
      `✓ ${result4.length === 1 && result4[0] === '1' ? 'PASS' : 'FAIL'}\n`
    );

    // Test 5: Leading zeros
    console.log("Test 5: num='105', target=5");
    const result5 = addOperators('105', 5);
    console.log(`Solutions found: ${result5.length}`);
    result5.forEach((expr) => console.log(`  ${expr}`));
    console.log(`Expected: Includes "1*0+5" and "10-5"`);
    console.log(
      `✓ ${
        result5.includes('1*0+5') && result5.includes('10-5') ? 'PASS' : 'FAIL'
      }\n`
    );

    // Test 6: All zeros
    console.log("Test 6: num='00', target=0");
    const result6 = addOperators('00', 0);
    console.log(`Solutions found: ${result6.length}`);
    result6.forEach((expr) => console.log(`  ${expr}`));
    console.log(`Expected: ["0+0", "0-0", "0*0"]`);
    console.log(`✓ ${result6.length === 3 ? 'PASS' : 'FAIL'}\n`);

    // Test 7: Negative result
    console.log("Test 7: num='123', target=0");
    const result7 = addOperators('123', 0);
    console.log(`Solutions found: ${result7.length}`);
    result7.forEach((expr) => console.log(`  ${expr}`));
    console.log(`Expected: Includes "1*2-3+0", "1+2-3", etc.`);
    console.log(`✓ ${result7.length > 0 ? 'PASS' : 'FAIL'}\n`);

    // Test 8: Multi-digit numbers
    console.log("Test 8: num='123', target=123");
    const result8 = addOperators('123', 123);
    console.log(`Solutions found: ${result8.length}`);
    result8.forEach((expr) => console.log(`  ${expr}`));
    console.log(`Expected: Includes "123"`);
    console.log(`✓ ${result8.includes('123') ? 'PASS' : 'FAIL'}\n`);

    // Test 9: Complex multiplication chain
    console.log("Test 9: num='2147483647', target=2147483647");
    const result9 = addOperators('2147483647', 2147483647);
    console.log(`Solutions found: ${result9.length}`);
    console.log(`Expected: At least ["2147483647"]`);
    console.log(`✓ ${result9.includes('2147483647') ? 'PASS' : 'FAIL'}\n`);

    console.log('═══════════════════════════════════════');
    console.log('All tests completed! ✓');
    console.log('═══════════════════════════════════════');
  }
}

// Execute tests
ExpressionAddOperatorsBacktracking.runTests();