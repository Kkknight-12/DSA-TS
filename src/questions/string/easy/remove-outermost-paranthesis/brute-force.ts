/**
 * REMOVE OUTERMOST PARENTHESES - BRUTE FORCE
 * ==========================================
 *
 * PROBLEM:
 * Valid parentheses string `s` diya hai.
 * Ye ek ya multiple primitive parts ka concatenation ho sakta hai.
 *
 * Hume har primitive ka outermost `(` aur `)` remove karke
 * final string return karni hai.
 *
 * Examples:
 *   "(()())(())"         -> "()()()"
 *   "(()())(())(()(()))" -> "()()()()(())"
 *   "()()"               -> ""
 *
 * PRIMITIVE ka matlab:
 *   valid parentheses string
 *   jise do non-empty valid parts me split nahi kar sakte
 *
 * INTUITION (Soch):
 * ─────────────────
 * Is approach me problem ko do phases me solve karte hain:
 *
 *   Phase 1: string ko primitive parts me tod do
 *   Phase 2: har primitive ka first aur last bracket hata do
 *
 * Example:
 *
 *   s = "(()())(())"
 *
 *   Primitive parts:
 *   "(()())" + "(())"
 *
 *   After removing outer brackets:
 *   "()()" + "()"
 *
 *   Final answer:
 *   "()()()"
 *
 * TIME:  O(n)
 *   - primitive boundaries find karne me one pass
 *   - har primitive ko strip/join karne me overall again O(n)
 *
 * SPACE: O(n)
 *   - primitive parts aur final result ke liye extra storage lagta hai
 *
 * Why repo me isse brute force bol rahe hain?
 *   Kyunki ye direct decomposition-style solution hai:
 *   pehle pieces banao, phir unhe separately process karo.
 */

namespace RemoveOutermostParenthesesBruteForce {
  function removeOuterParentheses(s: string): string {
    const primitiveParts: string[] = [];
    let currentDepth = 0;
    let primitiveStart = 0;

    // Jab bhi currentDepth 0 par wapas aata hai,
    // ek complete primitive part mil gaya.
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        currentDepth++;
      } else {
        currentDepth--;
      }

      if (currentDepth === 0) {
        primitiveParts.push(s.slice(primitiveStart, i + 1));
        primitiveStart = i + 1;
      }
    }

    let result = '';

    for (const primitive of primitiveParts) {
      // Outer opening aur outer closing remove karo.
      // Agar primitive "()" hai, toh inner part empty string banega.
      result += primitive.slice(1, primitive.length - 1);
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - TWO PHASE FLOW
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "(()())(())(()(()))"
   *
   * ═══════════════════════════════════════════════════════════
   * PHASE 1: Primitive parts find karo
   * ═══════════════════════════════════════════════════════════
   *
   * Start:
   *   currentDepth = 0
   *   primitiveStart = 0
   *   primitiveParts = []
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=0, '(' -> currentDepth = 1                            │
   * │ i=1, '(' -> currentDepth = 2                            │
   * │ i=2, ')' -> currentDepth = 1                            │
   * │ i=3, '(' -> currentDepth = 2                            │
   * │ i=4, ')' -> currentDepth = 1                            │
   * │ i=5, ')' -> currentDepth = 0                            │
   * │ Depth 0 means primitive complete                        │
   * │ primitive = s[0..5] = "(()())"                          │
   * │ primitiveParts = ["(()())"]                             │
   * │ primitiveStart = 6                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=6, '(' -> currentDepth = 1                            │
   * │ i=7, '(' -> currentDepth = 2                            │
   * │ i=8, ')' -> currentDepth = 1                            │
   * │ i=9, ')' -> currentDepth = 0                            │
   * │ primitive = s[6..9] = "(())"                            │
   * │ primitiveParts = ["(()())", "(())"]                     │
   * │ primitiveStart = 10                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=10, '(' -> currentDepth = 1                           │
   * │ i=11, '(' -> currentDepth = 2                           │
   * │ i=12, ')' -> currentDepth = 1                           │
   * │ i=13, '(' -> currentDepth = 2                           │
   * │ i=14, '(' -> currentDepth = 3                           │
   * │ i=15, ')' -> currentDepth = 2                           │
   * │ i=16, ')' -> currentDepth = 1                           │
   * │ i=17, ')' -> currentDepth = 0                           │
   * │ primitive = s[10..17] = "(()(()))"                      │
   * │ primitiveParts = ["(()())", "(())", "(()(()))"]         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * PHASE 2: Har primitive ka outer remove karo
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "(()())"    -> slice(1, len-1) -> "()()"                │
   * │ "(())"      -> slice(1, len-1) -> "()"                  │
   * │ "(()(()))"  -> slice(1, len-1) -> "()(())"              │
   * └──────────────────────────────────────────────────────────┘
   *
   * Join:
   *
   *   "()()" + "()" + "()(())"
   *   = "()()()()(())"
   *
   * Final answer = "()()()()(())"
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single primitive:
   *    "(())" -> "()"
   *
   * 2. Primitive of length 2:
   *    "()" -> ""
   *
   * 3. Multiple flat primitives:
   *    "()()" -> ""
   *
   * 4. Deep nesting:
   *    "((()))" -> "(())"
   */

  export function runTests(): void {
    console.log('Testing Remove Outermost Parentheses - BRUTE FORCE\n');

    const tests: Array<{
      s: string;
      expected: string;
      description: string;
    }> = [
      {
        s: '(()())(())',
        expected: '()()()',
        description: 'Two primitive parts',
      },
      {
        s: '(()())(())(()(()))',
        expected: '()()()()(())',
        description: 'Three primitives with nested third part',
      },
      {
        s: '()()',
        expected: '',
        description: 'Flat primitives of length two',
      },
      {
        s: '((()))',
        expected: '(())',
        description: 'Single deeply nested primitive',
      },
      {
        s: '(())(())',
        expected: '()()',
        description: 'Two medium-sized primitives',
      },
      {
        s: '(()(()))',
        expected: '()(())',
        description: 'Single primitive with nested branch',
      },
      {
        s: '()',
        expected: '',
        description: 'Shortest valid primitive',
      },
    ];

    let passed = 0;

    tests.forEach(({ s, expected, description }, index) => {
      const result = removeOuterParentheses(s);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  s="${s}"`);
      console.log(
        `  Expected: "${expected}" | Got: "${result}" -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

RemoveOutermostParenthesesBruteForce.runTests();
