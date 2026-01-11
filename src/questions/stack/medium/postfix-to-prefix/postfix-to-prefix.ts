/**
 * Postfix to Prefix Conversion
 * ==========================================
 *
 * Problem: Convert Postfix ("abc*+") to Prefix ("+a*bc")
 *
 * Intuition (Soch):
 * ----------------
 * Postfix: Operands pehle, Operator baad mein (`a b +`)
 * Prefix: Operator pehle (`+ a b`)
 *
 * Logic:
 * 1. Aage se shuru karo (Left-to-Right).
 * 2. Operands (`a`, `b`) ko Stack mein rakho.
 * 3. Operator (`+`) aate hi Stack se do strings nikalo.
 *    - Note: Pehla pop `Right Operand` hoga, Dusra `Left Operand`.
 * 4. Nayi string banao: `Operator` + `Left` + `Right`.
 * 5. Wapas Stack mein daalo.
 *
 * Visual Example: `a b c * +`
 * Scan Left -> Right:
 * 1. `a` -> Stack: [a]
 * 2. `b` -> Stack: [a, b]
 * 3. `c` -> Stack: [a, b, c]
 * 4. `*` -> Pop c, b. Combine `*bc`. Stack: [a, *bc]
 * 5. `+` -> Pop *bc, a. Combine `+a*bc`. Stack: [+a*bc]
 *
 * Algorithm:
 * ----------
 * 1. Stack init.
 * 2. Loop i = 0 to N-1.
 * 3. If Operand: Push(char).
 * 4. If Operator:
 *    - op2 = Pop()  (Top element is always Right Operand)
 *    - op1 = Pop()  (Next element is Left Operand)
 *    - Push(char + op1 + op2)
 * 5. Return Pop().
 */

namespace PostfixToPrefix {
  /**
   * Checks if character is an operator
   */
  function isOperator(c: string): boolean {
    return c === '+' || c === '-' || c === '*' || c === '/' || c === '^';
  }

  /**
   * Main Conversion Function
   */
  function postfixToPrefix(expression: string): string {
    // ═══════════════════════════════════════════════════════════
    // STEP 1: Initialization
    // ═══════════════════════════════════════════════════════════
    const stack: string[] = [];

    // ═══════════════════════════════════════════════════════════
    // STEP 2: Scan from Left to Right
    // ═══════════════════════════════════════════════════════════
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      // ═══════════════════════════════════════════════════════════
      // STEP 3: Handle Operator
      // ═══════════════════════════════════════════════════════════

      // LOGIC: Operator mila matlab operands stack mein wait kar rahe hain
      if (isOperator(char)) {
        // Safety Check
        if (stack.length < 2) {
          throw new Error('Invalid Postfix Expression');
        }

        // Pop operands
        // WHY: Stack LIFO hai. Jo last push hua wo 'Right Operand' (op2) hai
        // Example: a b - (Stack top is b, which is on right of -)
        const op2 = stack.pop()!;
        const op1 = stack.pop()!;

        // Combine for Prefix: Operator + Left + Right
        // EXAMPLE: op1='a', op2='b', char='+' -> "+ab"
        const subExp = char + op1 + op2;

        // Push back
        stack.push(subExp);
      }

      // ═══════════════════════════════════════════════════════════
      // STEP 4: Handle Operand
      // ═══════════════════════════════════════════════════════════
      else {
        stack.push(char);
      }
    }

    // ═══════════════════════════════════════════════════════════
    // STEP 5: Final Result
    // ═══════════════════════════════════════════════════════════
    return stack.pop() || '';
  }

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('🧪 Testing Postfix to Prefix Conversion\n');

    // Test Case 1: Simple
    const input1 = 'ab+';
    console.log(`Test 1: ${input1}`);
    console.log(`Expected: +ab`);
    console.log(`Got:      ${postfixToPrefix(input1)}`);
    console.log(postfixToPrefix(input1) === '+ab' ? '✅ PASS' : '❌ FAIL');
    console.log('---\n');

    // Test Case 2: Complex
    const input2 = 'abc*+d-';
    console.log(`Test 2: ${input2}`);
    console.log(`Expected: -+a*bcd`);
    console.log(`Got:      ${postfixToPrefix(input2)}`);
    console.log(postfixToPrefix(input2) === '-+a*bcd' ? '✅ PASS' : '❌ FAIL');
    console.log('---\n');

    // Test Case 3: Nested
    const input3 = 'AB-C+DE/*';
    // AB- -> -AB
    // C+ -> +-ABC
    // DE/ -> /DE
    // * -> *+-ABC/DE
    console.log(`Test 3: ${input3}`);
    console.log(`Expected: *+-ABC/DE`);
    console.log(`Got:      ${postfixToPrefix(input3)}`);
    console.log(
      postfixToPrefix(input3) === '*+-ABC/DE' ? '✅ PASS' : '❌ FAIL'
    );
    console.log('---\n');
  }
}

// Run tests
PostfixToPrefix.runTests();

/**
 * ════════════════════════════════════════════════════════════════
 * DRY RUN - COMPLETE VISUALIZATION
 * ════════════════════════════════════════════════════════════════
 *
 * Example Input: a b c * + d -
 * Scan Direction: Left to Right (→)
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ INITIAL STATE                                                       │
 * └─────────────────────────────────────────────────────────────────────┘
 * Stack: []
 *
 * ═════════════════════════════════════════════════════════════════
 * ITERATION WALKTHROUGH
 * ═════════════════════════════════════════════════════════════════
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 1. Scan 'a', 'b', 'c' (Operands)                                    │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Push 'a', Push 'b', Push 'c'
 * - Stack: ['a', 'b', 'c'] ← Top
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 2. Scan '*' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Pop op2 = 'c' (Right)
 * - Pop op1 = 'b' (Left)
 * - Combine: '*' + 'b' + 'c' = "*bc"
 * - Push "*bc"
 *
 * Stack: ['a', "*bc"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 3. Scan '+' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Pop op2 = "*bc"
 * - Pop op1 = 'a'
 * - Combine: '+' + 'a' + "*bc" = "+a*bc"
 * - Push "+a*bc"
 *
 * Stack: ["+a*bc"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 4. Scan 'd' (Operand)                                               │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Push 'd'
 * - Stack: ["+a*bc", 'd']
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 5. Scan '-' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Pop op2 = 'd'
 * - Pop op1 = "+a*bc"
 * - Combine: '-' + "+a*bc" + 'd' = "-+a*bcd"
 * - Push Result
 *
 * Stack: ["-+a*bcd"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ FINAL RESULT                                                        │
 * └─────────────────────────────────────────────────────────────────────┘
 * Pop: "-+a*bcd"
 */