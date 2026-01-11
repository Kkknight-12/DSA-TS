/**
 * https://chatgpt.com/g/g-p-690b183fda608191a882804e321568e5-dsa/c/69359a28-1a40-8333-85d3-8123112ae25e
 * Infix to Postfix Conversion
 * ==========================================
 *
 * Problem: Convert mathematical expression like "a+b" to "ab+"
 *
 * Intuition (Soch):
 * ----------------
 * Infix expressions (jaise hum likhte hain) computers ke liye confusing hote hain
 * kyunki unhe brackets aur BODMAS rules baar-baar check karne padte hain.
 *
 * Postfix (Reverse Polish Notation) mein operator humesha operands ke baad aata hai.
 * Isse computer ek hi pass mein left-to-right bina confusion ke solve kar sakta hai.
 *
 * Visual Example:
 * ---------------
 * Train Track Analogy 🚂
 * - Operands (passengers) seedha destination (Result) chale jaate hain.
 * - Operators (VIPs) Waiting Room (Stack) mein rukte hain.
 * - Rule: Ek weak VIP (low precedence) kabhi bhi strong VIP (high precedence)
 *   ke upar nahi baith sakta. Agar weak aaya, toh strong wale ko pehle nikalna padega.
 *
 * Example: a + b * c
 * 1. 'a' -> Result: "a"
 * 2. '+' -> Stack: [+]
 * 3. 'b' -> Result: "ab"
 * 4. '*' -> Stack: [+, *]  ( * strong hai, + ke upar baith sakta hai)
 * 5. 'c' -> Result: "abc"
 * 6. End -> Pop All -> Result: "abc*+"
 *
 * Algorithm:
 * ----------
 * 1. Initialize empty Stack and empty String (result).
 * 2. Scan string left to right.
 * 3. If Operand (a-z, 0-9): Add to result directly.
 * 4. If '(': Push to stack.
 * 5. If ')': Pop from stack to result until '(' is found.
 * 6. If Operator (+, -, *, /, ^):
 *    - While stack top has >= precedence than current operator:
 *      Pop stack and add to result.
 *    - Push current operator to stack.
 * 7. Pop remaining operators from stack to result.
 *
 * Time Complexity: O(N)
 * - We scan the string once. Each element is pushed and popped at most once.
 *
 * Space Complexity: O(N)
 * - Stack stores operators. Worst case O(N) operators.
 */

namespace InfixToPostfix {
  /**
   * Helper function to return precedence of operators
   * Higher number = Higher precedence (Stronger)
   */
  function getPrecedence(operator: string): number {
    switch (operator) {
      case '^':
        return 3;
      case '*':
      case '/':
        return 2;
      case '+':
      case '-':
        return 1;
      default:
        return -1; // For '(' or operands
    }
  }

  /**
   * Main conversion function
   */
  function infixToPostfix(s: string): string {
    // ═══════════════════════════════════════════════════════════
    // STEP 1: Initialization
    // ═══════════════════════════════════════════════════════════
    let result = '';
    const stack: string[] = [];

    for (let i = 0; i < s.length; i++) {
      const char = s[i];

      // ═══════════════════════════════════════════════════════════
      // STEP 2: Handle Operands (Letters/Numbers)
      // ═══════════════════════════════════════════════════════════

      // LOGIC: Operands ka order infix aur postfix mein same rehta hai.
      // Isliye inhe seedha result string mein jod do.
      if (
        (char >= 'a' && char <= 'z') ||
        (char >= 'A' && char <= 'Z') ||
        (char >= '0' && char <= '9')
      ) {
        result += char;
      }

      // ═══════════════════════════════════════════════════════════
      // STEP 3: Handle Opening Bracket '('
      // ═══════════════════════════════════════════════════════════

      // WHY: '(' ek naye "sub-expression" ki shuruwat hai.
      // Ise stack mein daal do taaki baad mein pata chale kahan rukna hai.
      else if (char === '(') {
        stack.push(char);
      }

      // ═══════════════════════════════════════════════════════════
      // STEP 4: Handle Closing Bracket ')'
      // ═══════════════════════════════════════════════════════════

      // WHY: ')' matlab sub-expression khatam.
      // Ab '(' tak ke saare operators ko pop karke result mein daalo.
      else if (char === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          result += stack.pop();
        }
        // Remove the '(' from stack
        stack.pop();
      }

      // ═══════════════════════════════════════════════════════════
      // STEP 5: Handle Operators (+, -, *, /, ^)
      // ═══════════════════════════════════════════════════════════
      else {
        // Operator Logic:
        // Hum stack mein sirf INCREASING precedence chahte hain.
        // Agar naya operator weak hai, toh strong walon ko pehle nikalna padega.
        // Example: Stack has [*], incoming is [+].
        // * execute pehle hona chahiye, isliye use pop karo.

        while (
          stack.length > 0 &&
          getPrecedence(char) <= getPrecedence(stack[stack.length - 1])
        ) {
          // Special Case: '^' is Right Associative (e.g., a^b^c -> a^(b^c))
          // Agar dono '^' hain, toh pop mat karo.
          if (char === '^' && stack[stack.length - 1] === '^') {
            break;
          }
          result += stack.pop();
        }
        stack.push(char);
      }
    }

    // ═══════════════════════════════════════════════════════════
    // STEP 6: Empty the Stack
    // ═══════════════════════════════════════════════════════════

    // WHY: Jo bhi operators bache hain, wo sab end mein lagenge
    while (stack.length > 0) {
      result += stack.pop();
    }

    return result;
  }

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log('🧪 Testing Infix to Postfix Conversion\n');

    // Test Case 1: Simple
    const input1 = 'a+b';
    console.log(`Test 1: ${input1}`);
    console.log(`Expected: ab+`);
    console.log(`Got:      ${infixToPostfix(input1)}`);
    console.log(infixToPostfix(input1) === 'ab+' ? '✅ PASS' : '❌ FAIL');
    console.log('---\n');

    // Test Case 2: Precedence
    const input2 = 'a+b*c';
    console.log(`Test 2: ${input2}`);
    console.log(`Expected: abc*+`);
    console.log(`Got:      ${infixToPostfix(input2)}`);
    console.log(infixToPostfix(input2) === 'abc*+' ? '✅ PASS' : '❌ FAIL');
    console.log('---\n');

    // Test Case 3: Brackets
    const input3 = '(a+b)*c';
    console.log(`Test 3: ${input3}`);
    console.log(`Expected: ab+c*`);
    console.log(`Got:      ${infixToPostfix(input3)}`);
    console.log(infixToPostfix(input3) === 'ab+c*' ? '✅ PASS' : '❌ FAIL');
    console.log('---\n');

    // Test Case 4: Complex
    const input4 = 'a+b*(c^d-e)^(f+g*h)-i';
    console.log(`Test 4: ${input4}`);
    console.log(`Expected: abcd^e-fgh*+^*+i-`);
    console.log(`Got:      ${infixToPostfix(input4)}`);
    console.log(
      infixToPostfix(input4) === 'abcd^e-fgh*+^*+i-' ? '✅ PASS' : '❌ FAIL'
    );
    console.log('---\n');
  }
}

// Run the tests
InfixToPostfix.runTests();

/**
 * ════════════════════════════════════════════════════════════════
 * DRY RUN - COMPLETE VISUALIZATION
 * ════════════════════════════════════════════════════════════════
 *
 * Example Input: a + b * ( c ^ d - e ) ^ ( f + g * h ) - i
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ INITIAL STATE                                                       │
 * └─────────────────────────────────────────────────────────────────────┘
 * Stack: []
 * Result: ""
 *
 * ═════════════════════════════════════════════════════════════════
 * ITERATION WALKTHROUGH
 * ═════════════════════════════════════════════════════════════════
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 1. Scan 'a', '+', 'b'                                               │
 * └─────────────────────────────────────────────────────────────────────┘
 * - 'a' → Result: "a"
 * - '+' → Stack: [+]
 * - 'b' → Result: "ab"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 2. Scan '*', '(', 'c', '^', 'd'                                     │
 * └─────────────────────────────────────────────────────────────────────┘
 * - '*' (Prec 2) > '+' (Prec 1) → Push '*'
 * - '(' → Push '('
 * - 'c' → Result: "abc"
 * - '^' → Push '^'
 * - 'd' → Result: "abcd"
 *
 * Stack State: [+, *, (, ^]
 * Result: "abcd"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 3. Scan '-' (Inside Bracket)                                        │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Incoming '-' (Prec 1) vs Top '^' (Prec 3)
 * - '^' is stronger → Pop '^'
 * - Push '-'
 *
 * Stack State: [+, *, (, -]
 * Result: "abcd^"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 4. Scan 'e', ')'                                                    │
 * └─────────────────────────────────────────────────────────────────────┘
 * - 'e' → Result: "abcd^e"
 * - ')' → Pop until '('
 *   - Pop '-' → Result: "abcd^e-"
 *   - Pop '(' (discard)
 *
 * Stack State: [+, *]
 * Result: "abcd^e-"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 5. Scan '^' (Between Brackets)                                      │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Incoming '^' (Prec 3) vs Top '*' (Prec 2)
 * - '^' is stronger → Push '^'
 *
 * Stack State: [+, *, ^]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 6. Scan '(', 'f', '+', 'g', '*', 'h'                                │
 * └─────────────────────────────────────────────────────────────────────┘
 * - '(' → Push '('
 * - 'f' → Result: "abcd^e-f"
 * - '+' → Push '+'
 * - 'g' → Result: "abcd^e-fg"
 * - '*' → Push '*'
 * - 'h' → Result: "abcd^e-fgh"
 *
 * Stack State: [+, *, ^, (, +, *]
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 7. Scan ')' (Second Bracket Close)                                  │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Pop until '('
 *   - Pop '*' → Result: "...fgh*"
 *   - Pop '+' → Result: "...fgh*+"
 *   - Pop '(' (discard)
 *
 * Stack State: [+, *, ^]
 * Result: "abcd^e-fgh*+"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 8. Scan '-' (Final Operator)                                        │
 * └─────────────────────────────────────────────────────────────────────┘
 * - Incoming '-' (Prec 1)
 * - Top '^' (Prec 3) > '-' → Pop '^'
 * - Top '*' (Prec 2) > '-' → Pop '*'
 * - Top '+' (Prec 1) == '-' → Pop '+' (Left Assoc)
 * - Push '-'
 *
 * Stack State: [-]
 * Result: "abcd^e-fgh*+^*+"
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 9. Scan 'i' and End                                                 │
 * └─────────────────────────────────────────────────────────────────────┘
 * - 'i' → Result: "...i"
 * - End of String → Pop remaining '-'
 *
 * Final Result: "abcd^e-fgh*+^*+i-"
 *
 * ═════════════════════════════════════════════════════════════════
 * KEY INSIGHTS
 * ═════════════════════════════════════════════════════════════════
 * 1. Brackets act as isolated containers.
 * 2. '^' waited in stack because it was stronger than subsequent operators.
 * 3. The final '-' caused a cascade of pops because it was weaker than everything else.
 */