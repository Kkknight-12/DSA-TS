/**
 * Prefix to Infix Conversion
 * ==========================================
 *
 * Problem: Convert Prefix expression (e.g., "*+ab-cd") to Infix ("((a+b)*(c-d))")
 *
 * Intuition (Soch):
 * ----------------
 * Prefix mein Operator pehle aata hai: `+ a b`
 * Infix mein Operator beech mein aata hai: `(a + b)`
 *
 * Challenge ye hai ki jab hum left-to-right jaate hain, operator `+` milte hi humein
 * pata nahi hota ki operands kya hain (wo aage hain).
 *
 * Solution: **Right-to-Left Scan!** ⬅️
 * Agar hum piche se start karein: `b`, phir `a`, phir `+`.
 * 1. Operands (`b`, `a`) ko Stack mein daalte jao.
 * 2. Jaise hi Operator (`+`) mile, Stack se do log nikalo (`a`, `b`).
 * 3. Unhe `(` + `a` + `+` + `b` + `)` form mein jod do.
 * 4. Result wapas Stack mein daal do (kyunki ye kisi aur ka operand ban sakta hai).
 *
 * Visual Example: `* + a b c` (Wait, valid prefix: `*+abc` is `(a+b)*c`)
 * Let's take: `*+ab-cd`
 * Scan Right -> Left:
 * 1. `d` -> Stack: [d]
 * 2. `c` -> Stack: [d, c]
 * 3. `-` -> Pop c, d. Make `(c-d)`. Stack: [(c-d)]
 * 4. `b` -> Stack: [(c-d), b]
 * 5. `a` -> Stack: [(c-d), b, a]
 * 6. `+` -> Pop a, b. Make `(a+b)`. Stack: [(c-d), (a+b)]
 * 7. `*` -> Pop (a+b), (c-d). Make `((a+b)*(c-d))`. Stack: [((a+b)*(c-d))]
 *
 * Algorithm:
 * ----------
 * 1. Initialize Stack.
 * 2. Loop from i = Length-1 down to 0 (Right to Left).
 * 3. If Character is Operand: Push to Stack.
 * 4. If Character is Operator:
 *    - Pop op1 (Top)
 *    - Pop op2 (Next Top)
 *    - String = `(` + op1 + Operator + op2 + `)`
 *    - Push String to Stack.
 * 5. Final Stack Top is the answer.
 */

namespace PrefixToInfix {
  /**
   * Checks if character is an operator
   */
  function isOperator(c: string): boolean {
    return c === '+' || c === '-' || c === '*' || c === '/' || c === '^';
  }

  /**
   * Main Conversion Function
   */
  function prefixToInfix(expression: string): string {
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
      
      // LOGIC: Operator mila matlab iske operands stack mein ready hain
      if (isOperator(char)) {
        // Validation check (Optional but good)
        if (stack.length < 2) {
            throw new Error("Invalid Prefix Expression");
        }

        // Pop operands
        // WHY: Stack LIFO hai. Jo last push hua wo op1 (Left operand) hoga
        // kyunki hum right-to-left scan kar rahe hain.
        // Wait... Right-to-Left scan mein:
        // Input: + a b
        // Stack: [b, a] (Top is a)
        // Pop 1: a (Left Operand)
        // Pop 2: b (Right Operand)
        // Correct order: op1 + char + op2
        const op1 = stack.pop()!;
        const op2 = stack.pop()!;

        // Combine
        const subExp = `(${op1}${char}${op2})`;

        // Push back result
        stack.push(subExp);
      } 
      
      // ═══════════════════════════════════════════════════════════
      // STEP 4: Handle Operand
      // ═══════════════════════════════════════════════════════════
      else {
        // Operand hai toh bas store karo
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
    console.log('🧪 Testing Prefix to Infix Conversion\n');

    // Test Case 1: Simple
    const input1 = "+ab";
    console.log(`Test 1: ${input1}`);
    console.log(`Expected: (a+b)`);
    console.log(`Got:      ${prefixToInfix(input1)}`);
    console.log(prefixToInfix(input1) === "(a+b)" ? "✅ PASS" : "❌ FAIL");
    console.log('---\n');

    // Test Case 2: Complex
    const input2 = "*+ab-cd";
    console.log(`Test 2: ${input2}`);
    console.log(`Expected: ((a+b)*(c-d))`);
    console.log(`Got:      ${prefixToInfix(input2)}`);
    console.log(prefixToInfix(input2) === "((a+b)*(c-d))" ? "✅ PASS" : "❌ FAIL");
    console.log('---\n');

    // Test Case 3: Nested
    const input3 = "*-A/BC-/AKL";
    // Explanation:
    // /BC -> (B/C)
    // -A/BC -> (A-(B/C))
    // /AK -> (A/K)
    // -/AKL -> ((A/K)-L)
    // *... -> ((A-(B/C))*((A/K)-L))
    console.log(`Test 3: ${input3}`);
    console.log(`Expected: ((A-(B/C))*((A/K)-L))`);
    console.log(`Got:      ${prefixToInfix(input3)}`);
    console.log(prefixToInfix(input3) === "((A-(B/C))*((A/K)-L))" ? "✅ PASS" : "❌ FAIL");
    console.log('---\n');
  }
}

// Run tests
PrefixToInfix.runTests();

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
 * │ 1. Scan 'd' (Operand)                                               │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Push 'd'
 * - Stack: ['d']
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 2. Scan 'c' (Operand)                                               │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Push 'c'
 * - Stack: ['d', 'c']  ← Top is 'c'
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 3. Scan '-' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Pop two operands
 *   - op1 = Pop() = 'c'
 *   - op2 = Pop() = 'd'
 * - Combine: '(' + c + '-' + d + ')' = "(c-d)"
 * - Push "(c-d)"
 *
 * Stack: ["(c-d)"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 4. Scan 'b' (Operand)                                               │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Push 'b'
 * - Stack: ["(c-d)", 'b']
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 5. Scan 'a' (Operand)                                               │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Push 'a'
 * - Stack: ["(c-d)", 'b', 'a'] ← Top is 'a'
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 6. Scan '+' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Pop two operands
 *   - op1 = Pop() = 'a'
 *   - op2 = Pop() = 'b'
 * - Combine: '(' + a + '+' + b + ')' = "(a+b)"
 * - Push "(a+b)"
 *
 * Stack: ["(c-d)", "(a+b)"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 7. Scan '*' (Operator)                                              │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Action: Pop two operands
 *   - op1 = Pop() = "(a+b)"
 *   - op2 = Pop() = "(c-d)"
 * - Combine: '(' + "(a+b)" + '*' + "(c-d)" + ')'
 *   = "((a+b)*(c-d))"
 * - Push result
 *
 * Stack: ["((a+b)*(c-d))"]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ FINAL RESULT                                                        │
 * └─────────────────────────────────────────────────────────────────────┘
 * Pop Top: "((a+b)*(c-d))"
 *
 * ═════════════════════════════════════════════════════════════════
 * KEY LOGIC CHECK
 * ═════════════════════════════════════════════════════════════════
 * Why op1 is Top?
 * - Stack: [..., op2, op1] ← Top
 * - Since we scan Right-to-Left, 'op1' (left operand) appears later in scan
 *   so it is pushed LAST (Top of Stack).
 * - Correct Order: op1 + operator + op2
 */
