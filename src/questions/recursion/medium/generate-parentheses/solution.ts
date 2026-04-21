/**
 * GENERATE PARENTHESES - RECURSION + BACKTRACKING
 * =================================================
 *
 * PROBLEM:
 * `n` pairs of parentheses diye hain.
 * Saare valid / well-formed combinations generate karne hain.
 *
 * Example:
 *   n = 2
 *   answer = ["(())", "()()"]
 *
 * VALIDITY RULE:
 *   Kisi bhi prefix me close brackets, open brackets se zyada nahi ho sakte.
 *
 * INTUITION (Soch):
 * -----------------
 * Har step par 2 possible choices hain:
 *
 *   1. '(' add karo
 *   2. ')' add karo
 *
 * But choice condition ke saath allowed hoti hai:
 *
 *   '(' allowed when openCount < n
 *   ')' allowed when closeCount < openCount
 *
 * Why `closeCount < openCount`?
 *   Closing bracket tabhi valid hai jab usko close karne ke liye
 *   koi unmatched opening bracket pehle se present ho.
 *
 * TIME: O(Catalan(n) * n)
 *   - Catalan(n) valid combinations hoti hain
 *   - each combination length 2n hoti hai
 *
 * SPACE: O(n) recursion depth, excluding output
 * OUTPUT SPACE: O(Catalan(n) * n)
 */

namespace GenerateParenthesesRecursion {
  function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    buildParentheses('', 0, 0, n, result);

    return result;
  }

  function buildParentheses(
    current: string,
    openCount: number,
    closeCount: number,
    totalPairs: number,
    result: string[]
  ): void {
    if (openCount === totalPairs && closeCount === totalPairs) {
      // Dono counters target tak pahunch gaye.
      // Current string balanced and complete hai, so answer me store karo.
      result.push(current);
      return;
    }

    if (openCount < totalPairs) {
      // Abhi opening bracket quota bacha hai.
      // '(' add karna safe hai because it never breaks prefix validity.
      buildParentheses(
        current + '(',
        openCount + 1,
        closeCount,
        totalPairs,
        result
      );
    }

    if (closeCount < openCount) {
      // Closing tabhi allowed hai jab koi unmatched '(' pehle se available ho.
      // Is condition ke bina invalid prefix like ')' ya '())' ban sakta hai.
      buildParentheses(
        current + ')',
        openCount,
        closeCount + 1,
        totalPairs,
        result
      );
    }
  }

  /**
   * ==========================================================
   * DRY RUN - DECISION TREE + NESTED CALL FRAMES
   * ==========================================================
   *
   * Example:
   * n = 2
   *
   * Expected:
   * ["(())", "()()"]
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * Each node stores:
   *   current string
   *   openCount
   *   closeCount
   *
   *                             "" (0,0)
   *                              |
   *                     add '(' allowed
   *                              |
   *                          "(" (1,0)
   *                        /           \
   *           add '(' allowed           add ')' allowed
   *                    /                 \
   *               "((" (2,0)             "()" (1,1)
   *                   |                    |
   *           add ')' allowed       add '(' allowed
   *                   |                    |
   *               "(()" (2,1)          "()(" (2,1)
   *                   |                    |
   *           add ')' allowed       add ')' allowed
   *                   |                    |
   *               "(())" (2,2)        "()()" (2,2)
   *                   add                 add
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: generateParenthesis(2)
   * - result = []
   * - Start: buildParentheses("", 0, 0, 2, result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: buildParentheses("", 0, 0, 2, result)                        │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ current = ""                                                         │
   * │ openCount = 0, closeCount = 0, totalPairs = 2                       │
   * │ Base case? 0==2 AND 0==2 -> Nahi                                    │
   * │                                                                      │
   * │ Try '(': openCount < totalPairs? 0 < 2 -> Haan                      │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: buildParentheses("(", 1, 0, 2, result)             │     │
   * │   ├────────────────────────────────────────────────────────────┤     │
   * │   │ current = "("                                              │     │
   * │   │ openCount = 1, closeCount = 0, totalPairs = 2             │     │
   * │   │ Base case? 1==2 AND 0==2 -> Nahi                          │     │
   * │   │                                                            │     │
   * │   │ Try '(': openCount < totalPairs? 1 < 2 -> Haan            │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: buildParentheses("((", 2, 0, 2, result)  │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ current = "(("                                   │     │     │
   * │   │   │ openCount = 2, closeCount = 0, totalPairs = 2    │     │     │
   * │   │   │ Base case? 2==2 AND 0==2 -> Nahi                 │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Try '(': 2 < 2 -> Nahi                           │     │     │
   * │   │   │ Reason: Saare opening brackets use ho gaye.      │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Try ')': closeCount < openCount? 0 < 2 -> Haan   │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │   ┌────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 4: buildParentheses("(()",        │     │     │     │
   * │   │   │   │         2, 1, 2, result)               │     │     │     │
   * │   │   │   ├────────────────────────────────────────┤     │     │     │
   * │   │   │   │ current = "(()"                        │     │     │     │
   * │   │   │   │ openCount = 2, closeCount = 1          │     │     │     │
   * │   │   │   │ Base case? 2==2 AND 1==2 -> Nahi       │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │ Try '(': 2 < 2 -> Nahi                 │     │     │     │
   * │   │   │   │ Try ')': 1 < 2 -> Haan                 │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │   ┌──────────────────────────────┐     │     │     │     │
   * │   │   │   │   │ CALL 5: buildParentheses(    │     │     │     │     │
   * │   │   │   │   │         "(())", 2, 2, 2)     │     │     │     │     │
   * │   │   │   │   ├──────────────────────────────┤     │     │     │     │
   * │   │   │   │   │ current = "(())"             │     │     │     │     │
   * │   │   │   │   │ openCount = 2, closeCount = 2│     │     │     │     │
   * │   │   │   │   │ Base case? 2==2 AND 2==2     │     │     │     │     │
   * │   │   │   │   │ -> Haan, BASE CASE           │     │     │     │     │
   * │   │   │   │   │                              │     │     │     │     │
   * │   │   │   │   │ result.push("(())")          │     │     │     │     │
   * │   │   │   │   │ result = ["(())"]            │     │     │     │     │
   * │   │   │   │   │ Return                       │     │     │     │     │
   * │   │   │   │   └──────────────────────────────┘     │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │ Return                                 │     │     │     │
   * │   │   │   └────────────────────────────────────────┘     │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Return                                           │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ Try ')': closeCount < openCount? 0 < 1 -> Haan            │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 6: buildParentheses("()", 1, 1, 2, result)  │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ current = "()"                                   │     │     │
   * │   │   │ openCount = 1, closeCount = 1                    │     │     │
   * │   │   │ Base case? 1==2 AND 1==2 -> Nahi                 │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Try '(': openCount < totalPairs? 1 < 2 -> Haan   │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │   ┌────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 7: buildParentheses("()(",        │     │     │     │
   * │   │   │   │         2, 1, 2, result)               │     │     │     │
   * │   │   │   ├────────────────────────────────────────┤     │     │     │
   * │   │   │   │ current = "()("                        │     │     │     │
   * │   │   │   │ openCount = 2, closeCount = 1          │     │     │     │
   * │   │   │   │ Base case? 2==2 AND 1==2 -> Nahi       │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │ Try '(': 2 < 2 -> Nahi                 │     │     │     │
   * │   │   │   │ Try ')': 1 < 2 -> Haan                 │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │   ┌──────────────────────────────┐     │     │     │     │
   * │   │   │   │   │ CALL 8: buildParentheses(    │     │     │     │     │
   * │   │   │   │   │         "()()", 2, 2, 2)     │     │     │     │     │
   * │   │   │   │   ├──────────────────────────────┤     │     │     │     │
   * │   │   │   │   │ current = "()()"             │     │     │     │     │
   * │   │   │   │   │ openCount = 2, closeCount = 2│     │     │     │     │
   * │   │   │   │   │ Base case? 2==2 AND 2==2     │     │     │     │     │
   * │   │   │   │   │ -> Haan, BASE CASE           │     │     │     │     │
   * │   │   │   │   │                              │     │     │     │     │
   * │   │   │   │   │ result.push("()()")          │     │     │     │     │
   * │   │   │   │   │ result = ["(())", "()()"]    │     │     │     │     │
   * │   │   │   │   │ Return                       │     │     │     │     │
   * │   │   │   │   └──────────────────────────────┘     │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │ Return                                 │     │     │     │
   * │   │   │   └────────────────────────────────────────┘     │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Try ')': closeCount < openCount? 1 < 1 -> Nahi   │     │     │
   * │   │   │ Reason: close already open ke equal hai.         │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Return                                           │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ Return                                                     │     │
   * │   └────────────────────────────────────────────────────────────┘     │
   * │                                                                      │
   * │ Try ')': closeCount < openCount? 0 < 0 -> Nahi                      │
   * │ Reason: Empty string me closing bracket add nahi kar sakte.         │
   * │                                                                      │
   * │ Return                                                               │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final result:
   *   ["(())", "()()"]
   *
   * ==========================================================
   * WHY THE CONDITIONS WORK
   * ==========================================================
   *
   * openCount < totalPairs:
   *   Iska meaning hai opening quota abhi bacha hai.
   *
   * closeCount < openCount:
   *   Iska meaning hai koi unmatched '(' already available hai.
   *   Sirf tab ')' add karna valid hai.
   *
   * If closeCount === openCount:
   *   Abhi ')' add karenge toh prefix invalid ho jayega.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. n = 0:
   *    [""]
   *
   * 2. n = 1:
   *    ["()"]
   *
   * 3. n = 2:
   *    ["(())", "()()"]
   *
   * 4. n = 3:
   *    ["((()))", "(()())", "(())()", "()(())", "()()()"]
   */

  function isValidParentheses(value: string): boolean {
    let balance = 0;

    for (const char of value) {
      if (char === '(') {
        balance++;
      } else {
        balance--;
      }

      if (balance < 0) {
        return false;
      }
    }

    return balance === 0;
  }

  function catalanNumber(n: number): number {
    const dp = new Array<number>(n + 1).fill(0);
    dp[0] = 1;

    for (let pairs = 1; pairs <= n; pairs++) {
      for (let leftPairs = 0; leftPairs < pairs; leftPairs++) {
        const rightPairs = pairs - 1 - leftPairs;
        dp[pairs] += dp[leftPairs] * dp[rightPairs];
      }
    }

    return dp[n];
  }

  export function runTests(): void {
    console.log('Testing Generate Parentheses - Recursion\n');

    const tests: Array<{
      n: number;
      expected?: string[];
      expectedCount?: number;
      description: string;
    }> = [
      {
        n: 0,
        expected: [''],
        description: 'Zero pairs returns one empty string',
      },
      {
        n: 1,
        expected: ['()'],
        description: 'Single pair',
      },
      {
        n: 2,
        expected: ['(())', '()()'],
        description: 'Two pairs',
      },
      {
        n: 3,
        expected: ['((()))', '(()())', '(())()', '()(())', '()()()'],
        description: 'Three pairs exact order',
      },
      {
        n: 4,
        expectedCount: 14,
        description: 'Four pairs Catalan count and validity',
      },
      {
        n: 5,
        expectedCount: 42,
        description: 'Five pairs Catalan count and validity',
      },
    ];

    let passed = 0;

    tests.forEach(({ n, expected, expectedCount, description }, index) => {
      const result = generateParenthesis(n);
      const exactMatch = expected
        ? JSON.stringify(result) === JSON.stringify(expected)
        : true;
      const countMatch =
        expectedCount !== undefined ? result.length === expectedCount : true;
      const catalanMatch = result.length === catalanNumber(n);
      const allValid = result.every(isValidParentheses);
      const noDuplicates = new Set(result).size === result.length;
      const pass =
        exactMatch && countMatch && catalanMatch && allValid && noDuplicates;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  n=${n}`);
      console.log(`  Got count: ${result.length}`);
      console.log(`  Catalan count: ${catalanNumber(n)}`);

      if (expected) {
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(result)}`);
      }

      console.log(
        `  Checks -> exact/count=${exactMatch && countMatch}, valid=${allValid}, unique=${noDuplicates} -> ${
          pass ? 'PASS' : 'FAIL'
        }`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

GenerateParenthesesRecursion.runTests();