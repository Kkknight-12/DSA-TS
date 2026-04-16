/**
 * REMOVE OUTERMOST PARENTHESES - OPTIMAL
 * ======================================
 *
 * PROBLEM:
 * Valid parentheses string `s` diya hai.
 * Hume har primitive part ke outermost parentheses remove karke
 * final string return karni hai.
 *
 * Examples:
 *   "(()())(())"         -> "()()()"
 *   "(()())(())(()(()))" -> "()()()()(())"
 *   "()()"               -> ""
 *
 * INTUITION (Soch):
 * ─────────────────
 * Stack version me actual stored brackets important nahi the.
 * Hume bas current nesting depth chahiye thi.
 *
 * So:
 *   depth counter hi enough hai
 *
 * Opening bracket `'('` ke liye:
 *   agar current depth already > 0 hai,
 *   toh ye outer nahi, inner opening hai -> keep karo
 *
 * Closing bracket `')'` ke liye:
 *   pehle depth ghatao
 *   agar decrement ke baad bhi depth > 0 bachi,
 *   toh ye inner closing tha -> keep karo
 *
 * Most important state transitions:
 *
 *   depth 0 -> 1  means outer opening
 *   depth 1 -> 0  means outer closing
 *
 * In dono ko skip karna hai.
 *
 * Visual:
 *
 *   primitive = "(()())"
 *
 *   char:   ( ( ) ( ) )
 *   depth:  1 2 1 2 1 0
 *
 *   transitions:
 *   0->1 skip
 *   2->1 keep
 *   1->0 skip
 *
 * TIME:  O(n)
 *   - string ek baar traverse hoti hai
 *
 * SPACE: O(1) extra
 *   - result ke alawa bas depth counter use ho raha hai
 */

namespace RemoveOutermostParenthesesOptimal {
  function removeOuterParentheses(s: string): string {
    let currentDepth = 0;
    let result = '';

    for (let i = 0; i < s.length; i++) {
      const currentChar = s[i];

      if (currentChar === '(') {
        // Agar currentDepth 0 hai, toh ye primitive ka outer opening hai.
        // Use result me include nahi karna.
        if (currentDepth > 0) {
          result += currentChar;
        }

        currentDepth++;
      } else {
        // currentChar === ')'
        // Pehle depth kam karo, kyunki ye bracket ek level close kar raha hai.
        currentDepth--;

        // Agar decrement ke baad bhi currentDepth > 0 hai,
        // toh ye inner closing bracket tha.
        if (currentDepth > 0) {
          result += currentChar;
        }
      }
    }

    return result;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - DEPTH COUNTER FLOW
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "(()())"
   *
   * Start:
   *   currentDepth = 0
   *   result = ""
   *
   * ═══════════════════════════════════════════════════════════
   * i = 0, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentDepth = 0                                         │
   * │ depth > 0 ? no                                           │
   * │ so ye outer opening hai -> skip                          │
   * │ currentDepth++ -> 1                                      │
   * │ result = ""                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 1, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentDepth = 1                                         │
   * │ depth > 0 ? yes                                          │
   * │ inner opening hai -> result += "("                       │
   * │ currentDepth++ -> 2                                      │
   * │ result = "("                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 2, currentChar = ')'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentDepth-- : 2 -> 1                                  │
   * │ currentDepth > 0 ? yes                                   │
   * │ inner closing hai -> result += ")"                       │
   * │ result = "()"                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 3, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentDepth = 1                                         │
   * │ depth > 0 ? yes                                          │
   * │ result += "("                                            │
   * │ currentDepth++ -> 2                                      │
   * │ result = "()("                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 4, currentChar = ')'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentDepth-- : 2 -> 1                                  │
   * │ currentDepth > 0 ? yes                                   │
   * │ result += ")"                                            │
   * │ result = "()()"                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 5, currentChar = ')'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentDepth-- : 1 -> 0                                  │
   * │ currentDepth > 0 ? no                                    │
   * │ outer closing hai -> skip                                │
   * │ result = "()()"                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = "()()"
   *
   * For full input:
   *   "(()())(())(()(()))"
   *
   * Same rules repeatedly apply primitive by primitive,
   * and final answer becomes:
   *
   *   "()()()()(())"
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Shortest primitive:
   *    "()" -> ""
   *
   * 2. Flat primitives:
   *    "()()" -> ""
   *
   * 3. Deep nesting:
   *    "((()))" -> "(())"
   *
   * 4. Mixed nesting:
   *    "(()(()))" -> "()(())"
   */

  export function runTests(): void {
    console.log('Testing Remove Outermost Parentheses - OPTIMAL\n');

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

RemoveOutermostParenthesesOptimal.runTests();
