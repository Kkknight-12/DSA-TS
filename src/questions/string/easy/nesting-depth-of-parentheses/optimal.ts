/**
 * MAXIMUM NESTING DEPTH OF PARENTHESES - OPTIMAL
 * ==============================================
 *
 * PROBLEM:
 * Valid parentheses string `s` diya hai.
 * Hume maximum nesting depth return karni hai.
 *
 * String me digits aur operators bhi ho sakte hain,
 * but depth ko sirf parentheses affect karte hain.
 *
 * Examples:
 *   "(1+(2*3)+((8)/4))+1" -> 3
 *   "(1)+((2))+(((3)))"   -> 3
 *   "1+(2*3)/(2-1)"       -> 1
 *   "1"                   -> 0
 *
 * INTUITION (Soch):
 * ─────────────────
 * Depth ka real meaning hai:
 *
 *   abhi kitne open parentheses active hain?
 *
 * Jab `(` milta hai:
 *   ek naya level open hota hai
 *   so current depth +1 ho jaati hai
 *
 * Jab `)` milta hai:
 *   current level close hota hai
 *   so current depth -1 ho jaati hai
 *
 * Hume final active count nahi chahiye.
 * Hume traversal ke dauran jo highest active count aaya, woh chahiye.
 *
 * Visual:
 *
 *   s = "(1+(2*3)+((8)/4))+1"
 *
 *   char:   (   (   )   (   (   )   )   )
 *   depth:  1   2   1   2   3   2   1   0
 *
 *   Maximum depth = 3
 *
 * TIME:  O(n)
 *   - string ek baar left se right scan hoti hai
 *   - har character par constant work hota hai
 *
 * SPACE: O(1)
 *   - bas do counters use ho rahe hain
 */

namespace MaximumNestingDepthOptimal {
  function maxDepth(s: string): number {
    let currentDepth = 0;
    let maximumDepth = 0;

    for (let i = 0; i < s.length; i++) {
      const currentChar = s[i];

      if (currentChar === '(') {
        currentDepth++;

        // Jaise hi new level open hua, wahi current active depth hai.
        // Isi moment par max compare karna natural hai.
        maximumDepth = Math.max(maximumDepth, currentDepth);
      } else if (currentChar === ')') {
        // Valid parentheses string diya hai,
        // so closing bracket ek existing open level ko close karega.
        currentDepth--;
      }

      // Digits, spaces, operators depth ko affect nahi karte.
    }

    return maximumDepth;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - FULL CODE FLOW
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * s = "(1+(2*3)+((8)/4))+1"
   *
   * Start:
   *   currentDepth = 0
   *   maximumDepth = 0
   *
   * ═══════════════════════════════════════════════════════════
   * i = 0, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Opening bracket mila                                     │
   * │ currentDepth++ -> 1                                      │
   * │ maximumDepth = max(0, 1) -> 1                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 1, currentChar = '1'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Digit hai                                                │
   * │ Ignore                                                   │
   * │ currentDepth = 1, maximumDepth = 1                       │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 2, currentChar = '+'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Operator hai                                             │
   * │ Ignore                                                   │
   * │ currentDepth = 1, maximumDepth = 1                       │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 3, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ New nested level open hua                                │
   * │ currentDepth++ -> 2                                      │
   * │ maximumDepth = max(1, 2) -> 2                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 4..6 -> '2*3'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Ye non-parenthesis characters hain                       │
   * │ currentDepth same rehti hai -> 2                         │
   * │ maximumDepth same rehti hai -> 2                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 7, currentChar = ')'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Ek level close hua                                       │
   * │ currentDepth-- -> 1                                      │
   * │ maximumDepth still 2                                     │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 8, currentChar = '+'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Ignore                                                   │
   * │ currentDepth = 1, maximumDepth = 2                       │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 9, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ currentDepth++ -> 2                                      │
   * │ maximumDepth = max(2, 2) -> 2                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * i = 10, currentChar = '('
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Aur ek nested level open hua                             │
   * │ currentDepth++ -> 3                                      │
   * │ maximumDepth = max(2, 3) -> 3                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * Remaining flow:
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ '8', '/', '4' -> ignore                                  │
   * │ ')' -> currentDepth 3 se 2                               │
   * │ ')' -> currentDepth 2 se 1                               │
   * │ ')' -> currentDepth 1 se 0                               │
   * │ maximumDepth kabhi 3 se bada nahi gaya                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = 3
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. No parentheses:
   *    "1" -> 0
   *
   * 2. Flat pairs only:
   *    "()()" -> 1
   *
   * 3. Deep nesting:
   *    "((()))" -> 3
   *
   * 4. Mixed with digits/operators:
   *    "(1+(2*3)/(2-1))" -> 2
   *
   * 5. Empty string:
   *    "" -> 0
   */

  export function runTests(): void {
    console.log('Testing Maximum Nesting Depth of Parentheses - OPTIMAL\n');

    const tests: Array<{
      s: string;
      expected: number;
      description: string;
    }> = [
      {
        s: '(1+(2*3)+((8)/4))+1',
        expected: 3,
        description: 'Example with nested arithmetic expression',
      },
      {
        s: '(1)+((2))+(((3)))',
        expected: 3,
        description: 'Increasing nesting across separate groups',
      },
      {
        s: '1+(2*3)/(2-1)',
        expected: 1,
        description: 'Only one active level at any time',
      },
      {
        s: '1',
        expected: 0,
        description: 'No parentheses means zero depth',
      },
      {
        s: '',
        expected: 0,
        description: 'Empty string',
      },
      {
        s: '()()',
        expected: 1,
        description: 'Multiple flat pairs',
      },
      {
        s: '((()))',
        expected: 3,
        description: 'Pure nested parentheses',
      },
      {
        s: '()(())((()()))',
        expected: 3,
        description: 'Mixed flat and nested groups',
      },
      {
        s: '((1)+((2))+(((3))))',
        expected: 4,
        description: 'Whole expression wrapped by one extra outer pair',
      },
    ];

    let passed = 0;

    tests.forEach(({ s, expected, description }, index) => {
      const result = maxDepth(s);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  s="${s}"`);
      console.log(
        `  Expected: ${expected} | Got: ${result} -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

MaximumNestingDepthOptimal.runTests();
