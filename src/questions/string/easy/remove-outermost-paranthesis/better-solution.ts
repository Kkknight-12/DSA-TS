/**
 * REMOVE OUTERMOST PARENTHESES - BETTER
 * =====================================
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
 * Stack ka size current nesting level jaisa behave karta hai.
 *
 * Key idea:
 *   opening bracket ke time
 *   stack empty tha -> ye outer opening hai -> skip
 *
 *   closing bracket ke time
 *   pop se pehle stack size 1 tha -> ye outer closing hai -> skip
 *
 * Baaki sab brackets inner hain, unhe result me rakhna hai.
 *
 * Visual:
 *
 *   primitive = "(()())"
 *
 *   index:   0 1 2 3 4 5
 *   char:    ( ( ) ( ) )
 *   role:    O I I I I O
 *
 *   O = outer -> skip
 *   I = inner -> keep
 *
 *   output = "()()"
 *
 * TIME:  O(n)
 *   - string ek baar traverse hoti hai
 *   - har character par push/pop/append constant time hai
 *
 * SPACE: O(n)
 *   - stack aur result storage lagta hai
 */

namespace RemoveOutermostParenthesesBetter {
  function removeOuterParentheses(s: string): string {
    const stack: string[] = [];
    const result: string[] = [];

    for (let i = 0; i < s.length; i++) {
      const currentChar = s[i];

      if (currentChar === '(') {
        // Agar stack already non-empty hai,
        // toh hum kisi primitive ke outer level ke andar hain.
        // Isliye ye inner opening bracket hai.
        if (stack.length > 0) {
          result.push(currentChar);
        }

        stack.push(currentChar);
      } else {
        // currentChar === ')'
        // Agar stack size 1 hai, toh ye closing bracket us primitive ka
        // outermost closing hoga. Isliye isse result me nahi daalte.
        if (stack.length > 1) {
          result.push(currentChar);
        }

        stack.pop();
      }
    }

    return result.join('');
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - STACK FLOW
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "(()())(())"
   *
   * Start:
   *   stack = []
   *   result = ""
   *
   * ═══════════════════════════════════════════════════════════
   * i = 0, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ stack empty hai -> ye outer opening hai                 │
   * │ result me skip                                          │
   * │ push '('                                                │
   * │ stack = ["("]                                           │
   * │ result = ""                                             │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 1, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ stack non-empty hai -> ye inner opening hai             │
   * │ result += "("                                           │
   * │ push '('                                                │
   * │ stack size = 2                                          │
   * │ result = "("                                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 2, currentChar = ')'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ pop se pehle stack size = 2                             │
   * │ so ye inner closing hai                                 │
   * │ result += ")"                                           │
   * │ pop karo                                                │
   * │ stack size = 1                                          │
   * │ result = "()"                                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 3, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ stack non-empty -> inner opening                        │
   * │ result += "("                                           │
   * │ push करो                                                │
   * │ stack size = 2                                          │
   * │ result = "()("                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 4, currentChar = ')'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ stack size > 1 -> inner closing                         │
   * │ result += ")"                                           │
   * │ pop करो                                                │
   * │ stack size = 1                                          │
   * │ result = "()()"                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 5, currentChar = ')'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ pop se pehle stack size = 1                             │
   * │ ye outer closing hai -> skip                            │
   * │ pop करो                                                │
   * │ stack = []                                              │
   * │ result = "()()"                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * First primitive se answer:
   *   "()()"
   *
   * Second primitive "(())" same rules se:
   *   "()"
   *
   * Final answer:
   *   "()()" + "()" = "()()()"
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single primitive:
   *    "((()))" -> "(())"
   *
   * 2. Only outer pairs:
   *    "()()" -> ""
   *
   * 3. Mixed nesting:
   *    "(()(()))" -> "()(())"
   */

  export function runTests(): void {
    console.log('Testing Remove Outermost Parentheses - BETTER\n');

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

RemoveOutermostParenthesesBetter.runTests();
