/**
 * Prefix to Postfix Conversion
 * ==========================================
 *
 * Problem: Convert Prefix ("*+ab-cd") to Postfix ("ab+cd-*")
 *
 * Intuition (Soch):
 * ----------------
 * Prefix: Operator First (`+ a b`)
 * Postfix: Operator Last (`a b +`)
 *
 * Logic same hai "Prefix to Infix" jaisa:
 * 1. Piche se shuru karo (Right-to-Left).
 * 2. Operands (`a`, `b`) ko Stack mein rakho.
 * 3. Operator (`+`) aate hi Stack se do strings nikalo (`op1`, `op2`).
 * 4. Nayi string banao: `op1` + `op2` + `Operator`.
 * 5. Wapas Stack mein daalo.
 *
 * Visual Example:
 * Input: `* + a b c` (Note: `*+abc` means `(a+b)*c` -> `ab+c*`)
 * Scan Right <- Left:
 * 1. `c` -> Stack: [c]
 * 2. `b` -> Stack: [c, b]
 * 3. `a` -> Stack: [c, b, a]
 * 4. `+` -> Pop a, b. Combine `ab+`. Stack: [c, ab+]
 * 5. `*` -> Pop ab+, c. Combine `ab+c*`. Stack: [ab+c*]
 *
 * Algorithm:
 * ----------
 * 1. Stack init.
 * 2. Loop i = N-1 to 0.
 * 3. If Operand: Push(char).
 * 4. If Operator:
 *    - op1 = Pop()
 *    - op2 = Pop()
 *    - Push(op1 + op2 + char)
 * 5. Return Pop().
 */

namespace PrefixToPostfix {
  /**
   * Checks if character is an operator
   */
  function isOperator(c: string): boolean {
    return c === '+' || c === '-' || c === '*' || c === '/' || c === '^';
  }

  /**
   * Main Conversion Function
   */
  function prefixToPostfix(expression: string): string {
    // ═══════════════════════════════════════════════════════════
    // STEP 1: Initialization
    // ═══════════════════════════════════════════════════════════
    const stack: string[] = [];
    const n = expression.length;

    // ═══════════════════════════════════════════════════════════
    // STEP 2: Scan from Right to Left
    // ═══════════════════════════════════════════════════════════
    for (let i = n - 1; i >= 0; i--) {
      const char = expression[i];

      // ═══════════════════════════════════════════════════════════
      // STEP 3: Handle Operator
      // ═══════════════════════════════════════════════════════════
      
      // LOGIC: Operator mila matlab operands already stack mein hain
      if (isOperator(char)) {
        // Safety Check
        if (stack.length < 2) {
             throw new Error("Invalid Prefix Expression");
        }

        // Pop operands
        // WHY: Right-to-Left scan mein top element 'Left Operand' hota hai
        const op1 = stack.pop()!;
        const op2 = stack.pop()!;

        // Combine for Postfix: Left + Right + Operator
        // EXAMPLE: op1='a', op2='b', char='+' -> "ab+"
        const subExp = op1 + op2 + char;

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
    return stack.pop() || "";
  }

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('🧪 Testing Prefix to Postfix Conversion\n');

    // Test Case 1: Simple
    const input1 = "+ab";
    console.log(`Test 1: ${input1}`);
    console.log(`Expected: ab+`);
    console.log(`Got:      ${prefixToPostfix(input1)}`);
    console.log(prefixToPostfix(input1) === "ab+" ? "✅ PASS" : "❌ FAIL");
    console.log('---\n');

    // Test Case 2: Complex
    const input2 = "*+ab-cd";
    console.log(`Test 2: ${input2}`);
    console.log(`Expected: ab+cd-*`);
    console.log(`Got:      ${prefixToPostfix(input2)}`);
    console.log(prefixToPostfix(input2) === "ab+cd-*" ? "✅ PASS" : "❌ FAIL");
    console.log('---\n');

    // Test Case 3: Nested
    const input3 = "/-ab+cd"; 
    // Logic: -ab -> ab-
    // +cd -> cd+
    // / (ab-) (cd+) -> ab-cd+/
    console.log(`Test 3: ${input3}`);
    console.log(`Expected: ab-cd+/`);
    console.log(`Got:      ${prefixToPostfix(input3)}`);
    console.log(prefixToPostfix(input3) === "ab-cd+/" ? "✅ PASS" : "❌ FAIL");
    console.log('---\n');
  }
}

// Run tests
PrefixToPostfix.runTests();

/**
 * ════════════════════════════════════════════════════════════════
 * DRY RUN - COMPLETE VISUALIZATION
 * ════════════════════════════════════════════════════════════════
 *
 * Example Input: * + a b - c d
 * Scan Direction: Right to Left (←)
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
 * │ 1. Scan 'd', 'c' (Operands)                                         │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Push 'd', Push 'c'
 * - Stack: ['d', 'c'] ← Top
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 2. Scan '-' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Pop op1 = 'c'
 * - Pop op2 = 'd'
 * - Combine: 'c' + 'd' + '-' = "cd-"
 * - Push "cd-"
 *
 * Stack: ["cd-"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 3. Scan 'b', 'a' (Operands)                                         │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Push 'b', Push 'a'
 * - Stack: ["cd-", 'b', 'a'] ← Top
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 4. Scan '+' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Pop op1 = 'a'
 * - Pop op2 = 'b'
 * - Combine: 'a' + 'b' + '+' = "ab+"
 * - Push "ab+"
 *
 * Stack: ["cd-", "ab+"] ← Top is "ab+"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 5. Scan '*' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Pop op1 = "ab+"
 * - Pop op2 = "cd-"
 * - Combine: "ab+" + "cd-" + '*' = "ab+cd-*"
 * - Push Result
 *
 * Stack: ["ab+cd-*"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ FINAL RESULT                                                        │
 * └─────────────────────────────────────────────────────────────────────┘
 * Pop: "ab+cd-*"
 */
