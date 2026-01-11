/**
 * GENERATE PARENTHESES
 *
 * Problem: n pairs of parentheses diye hain, saare valid (well-formed) combinations generate karo.
 *
 * Approach: Constrained Backtracking
 * - Har step pe do choices hain: '(' add karo ya ')' add karo
 * - Lekin constraints check karke hi add kar sakte ho:
 *   1. '(' tabhi add karo jab open < n (limit se kam ho)
 *   2. ')' tabhi add karo jab close < open (validity ke liye)
 * - Jab dono counters n ke equal ho jayein, valid combination mil gayi
 *
 * Time Complexity: O(4^n / √n)
 * - Ye Catalan Number hai: C(n) ≈ 4^n / √n
 * - n=3 ke liye: 5 combinations
 * - n=8 ke liye: 1430 combinations
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(2n) = O(n)
 * - Har level pe ek character add hota hai, total 2n characters
 */

/**
 * Main function: n pairs ke liye saare valid parentheses combinations generate karo
 *
 * @param n - Parentheses pairs ki count
 * @returns Saari valid combinations
 *
 * Algorithm:
 * 1. Empty result array initialize karo
 * 2. Empty string, open=0, close=0 ke saath recursive generation start karo
 * 3. Har step pe constraints check karke '(' ya ')' add karo
 * 4. Jab open==n aur close==n, toh valid combination ready hai
 */
function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  // Empty string aur counters 0 se start karo
  generate("", 0, 0, n, result);

  return result;
}

/**
 * Helper function: Valid parentheses recursively build karo
 *
 * @param current - Current string jo build ho rahi hai
 * @param open - Kitne opening brackets '(' use ho chuke
 * @param close - Kitne closing brackets ')' use ho chuke
 * @param n - Total pairs
 * @param result - Valid combinations store karne ke liye
 *
 * Decision Tree Example (n=2):
 *
 *                  "" (0,0)
 *                    |
 *                  "(" (1,0)
 *                 /         \
 *             "((" (2,0)   "()" (1,1)
 *               |            |
 *            "(()" (2,1)   "()(" (2,1)
 *               |            |
 *            "(())" (2,2)  "()()" (2,2)
 *               ✓            ✓
 */
function generate(
  current: string,
  open: number,
  close: number,
  n: number,
  result: string[]
): void {
  // BASE CASE: Dono counters n ke equal ho gaye
  // Matlab saare opening aur closing brackets use ho gaye
  if (open === n && close === n) {
    result.push(current);
    return;
  }

  // RECURSIVE CASE 1: Try adding '(' agar allowed hai
  // Condition: open < n (abhi tak n se kam opening use hui hain)
  if (open < n) {
    generate(current + "(", open + 1, close, n, result);
  }

  // RECURSIVE CASE 2: Try adding ')' agar allowed hai
  // Condition: close < open (closing opening se kam ho, validity ensure karta hai)
  if (close < open) {
    generate(current + ")", open, close + 1, n, result);
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * DRY RUN: generateParenthesis(2)
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Initial Call: generateParenthesis(2)
 * - result = []
 * - Start: generate("", 0, 0, 2, result)
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ CALL 1: generate("", 0, 0, 2, result)                                │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ current = ""                                                         │
 * │ open = 0, close = 0, n = 2                                          │
 * │ Base case? 0==2 AND 0==2 → Nahi                                     │
 * │                                                                      │
 * │ Try '(': open < n? 0 < 2 → Haan! ✓                                 │
 * │   ┌────────────────────────────────────────────────────────────┐   │
 * │   │ CALL 2: generate("(", 1, 0, 2, result)                     │   │
 * │   ├────────────────────────────────────────────────────────────┤   │
 * │   │ current = "("                                              │   │
 * │   │ open = 1, close = 0, n = 2                                │   │
 * │   │ Base case? 1==2 AND 0==2 → Nahi                           │   │
 * │   │                                                            │   │
 * │   │ Try '(': open < n? 1 < 2 → Haan! ✓                       │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 3: generate("((", 2, 0, 2, result)          │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ current = "(("                                   │   │   │
 * │   │   │ open = 2, close = 0, n = 2                      │   │   │
 * │   │   │ Base case? 2==2 AND 0==2 → Nahi                 │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Try '(': 2 < 2 → Nahi ✗                        │   │   │
 * │   │   │ (Saare opening brackets use ho gaye!)          │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Try ')': close < open? 0 < 2 → Haan! ✓        │   │   │
 * │   │   │   ┌────────────────────────────────────────┐   │   │   │
 * │   │   │   │ CALL 4: generate("(()", 2, 1, 2)       │   │   │   │
 * │   │   │   ├────────────────────────────────────────┤   │   │   │
 * │   │   │   │ current = "(()"                        │   │   │   │
 * │   │   │   │ open = 2, close = 1, n = 2            │   │   │   │
 * │   │   │   │ Base case? 2==2 AND 1==2 → Nahi       │   │   │   │
 * │   │   │   │                                        │   │   │   │
 * │   │   │   │ Try '(': 2 < 2 → Nahi ✗              │   │   │   │
 * │   │   │   │ Try ')': 1 < 2 → Haan! ✓             │   │   │   │
 * │   │   │   │   ┌──────────────────────────────┐   │   │   │   │
 * │   │   │   │   │ CALL 5: generate("(())",     │   │   │   │   │
 * │   │   │   │   │         2, 2, 2)             │   │   │   │   │
 * │   │   │   │   ├──────────────────────────────┤   │   │   │   │
 * │   │   │   │   │ current = "(())"             │   │   │   │   │
 * │   │   │   │   │ open = 2, close = 2, n = 2  │   │   │   │   │
 * │   │   │   │   │ Base case? 2==2 AND 2==2    │   │   │   │   │
 * │   │   │   │   │ → Haan! BASE CASE! ✓        │   │   │   │   │
 * │   │   │   │   │                              │   │   │   │   │
 * │   │   │   │   │ result.push("(())")          │   │   │   │   │
 * │   │   │   │   │ result = ["(())"]            │   │   │   │   │
 * │   │   │   │   │ Return                       │   │   │   │   │
 * │   │   │   │   └──────────────────────────────┘   │   │   │   │
 * │   │   │   │ Return                                 │   │   │   │
 * │   │   │   └────────────────────────────────────────┘   │   │   │
 * │   │   │ Return                                          │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │                                                            │   │
 * │   │ Try ')': close < open? 0 < 1 → Haan! ✓                  │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 6: generate("()", 1, 1, 2, result)          │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ current = "()"                                   │   │   │
 * │   │   │ open = 1, close = 1, n = 2                      │   │   │
 * │   │   │ Base case? 1==2 AND 1==2 → Nahi                 │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Try '(': 1 < 2 → Haan! ✓                       │   │   │
 * │   │   │   ┌────────────────────────────────────────┐   │   │   │
 * │   │   │   │ CALL 7: generate("()(", 2, 1, 2)       │   │   │   │
 * │   │   │   ├────────────────────────────────────────┤   │   │   │
 * │   │   │   │ current = "()("                        │   │   │   │
 * │   │   │   │ open = 2, close = 1, n = 2            │   │   │   │
 * │   │   │   │ Base case? 2==2 AND 1==2 → Nahi       │   │   │   │
 * │   │   │   │                                        │   │   │   │
 * │   │   │   │ Try '(': 2 < 2 → Nahi ✗              │   │   │   │
 * │   │   │   │ Try ')': 1 < 2 → Haan! ✓             │   │   │   │
 * │   │   │   │   ┌──────────────────────────────┐   │   │   │   │
 * │   │   │   │   │ CALL 8: generate("()()",     │   │   │   │   │
 * │   │   │   │   │         2, 2, 2)             │   │   │   │   │
 * │   │   │   │   ├──────────────────────────────┤   │   │   │   │
 * │   │   │   │   │ current = "()()"             │   │   │   │   │
 * │   │   │   │   │ open = 2, close = 2, n = 2  │   │   │   │   │
 * │   │   │   │   │ Base case? 2==2 AND 2==2    │   │   │   │   │
 * │   │   │   │   │ → Haan! BASE CASE! ✓        │   │   │   │   │
 * │   │   │   │   │                              │   │   │   │   │
 * │   │   │   │   │ result.push("()()")          │   │   │   │   │
 * │   │   │   │   │ result = ["(())","()()"]     │   │   │   │   │
 * │   │   │   │   │ Return                       │   │   │   │   │
 * │   │   │   │   └──────────────────────────────┘   │   │   │   │
 * │   │   │   │ Return                                 │   │   │   │
 * │   │   │   └────────────────────────────────────────┘   │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Try ')': 1 < 1 → Nahi ✗                        │   │   │
 * │   │   │ (close already open ke equal hai)               │   │   │
 * │   │   │ Return                                           │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │ Return                                                     │   │
 * │   └────────────────────────────────────────────────────────────┘   │
 * │                                                                      │
 * │ Try ')': close < open? 0 < 0 → Nahi ✗                              │
 * │ (Empty string mein closing bracket add nahi kar sakte)              │
 * │ Return                                                               │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Final Result: ["(())", "()()"]
 *
 * Verification:
 * ✓ Total combinations = Catalan(2) = 2
 * ✓ Dono valid hain
 * ✓ "(())" - nested style
 * ✓ "()()" - sequential style
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * CONSTRAINTS KAISE KAAM KARTE HAIN
 * ═══════════════════════════════════════════════════════════════════════
 *
 * CONSTRAINT 1: open < n
 * -------------------------
 * Matlab: Opening bracket '(' tabhi add karo jab abhi tak n se kam use hui hon.
 *
 * Example (n=2):
 *   "(("  → open=2 (limit reached, aur '(' nahi add kar sakte)
 *   "(((" → Invalid! open > n
 *
 * CONSTRAINT 2: close < open
 * ---------------------------
 * Matlab: Closing bracket ')' tabhi add karo jab closing count opening se kam ho.
 *
 * YE VALIDITY ENSURE KARTA HAI!
 *
 * Example:
 *   "("   → open=1, close=0 → Can add ')'? 0<1 ✓
 *   "()"  → open=1, close=1 → Can add ')'? 1<1 ✗
 *
 * Invalid case (agar constraint nahi hota):
 *   "())" → open=1, close=2 → close > open ✗ INVALID!
 *
 * Visual:
 *        (  )  )  ← Invalid (agar ye ban jata)
 * open:  1  1  1
 * close: 0  1  2  ← close > open ✗
 *
 *        (  (  )  ← Valid
 * open:  1  2  2
 * close: 0  0  1  ← close < open ✓
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * CATALAN NUMBER CONNECTION
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Ye problem Catalan Number sequence follow karta hai!
 *
 * Formula: C(n) = (2n)! / ((n+1)! × n!)
 *
 * n | Valid Combinations | Catalan C(n)
 * --|-------------------|-------------
 * 1 |         1         |      1
 * 2 |         2         |      2
 * 3 |         5         |      5
 * 4 |        14         |     14
 * 5 |        42         |     42
 * 6 |       132         |    132
 * 7 |       429         |    429
 * 8 |      1430         |   1430
 *
 * n=3 ke saare 5 combinations:
 * 1. "((()))"
 * 2. "(()())"
 * 3. "(())()"
 * 4. "()(())"
 * 5. "()()()"
 *
 * Recursive formula:
 * C(0) = 1
 * C(n) = C(0)×C(n-1) + C(1)×C(n-2) + ... + C(n-1)×C(0)
 *
 * Other Catalan problems:
 * - Unique Binary Search Trees with n nodes
 * - Ways to triangulate a polygon with n+2 sides
 * - Number of different ways to multiply n+1 matrices
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * VISUALIZATION: COMPLETE RECURSION TREE (n=3)
 * ═══════════════════════════════════════════════════════════════════════
 *
 *                            "" (0,0)
 *                              |
 *                           "(" (1,0)
 *                          /          \
 *                    "((" (2,0)      "()" (1,1)
 *                      /              /        \
 *               "(((" (3,0)     "()(" (2,1)  "()()" (2,2)
 *                     |              |             |
 *                "(()" (3,1)   "()(()" (3,1)    ...
 *                     |              |
 *                "((()))" (3,2)  "()(()" (3,2)
 *                     |              |
 *                "((()))" (3,3)  "()(())" (3,3)
 *                     ✓              ✓
 *
 * Sab milake 5 valid combinations generate hongi (Catalan C(3) = 5)
 */

// ═══════════════════════════════════════════════════════════════════════
// TEST CASES
// ═══════════════════════════════════════════════════════════════════════

console.log("Test 1: n = 1");
console.log("Expected: ['()']");
console.log("Got:     ", generateParenthesis(1));
console.log();

console.log("Test 2: n = 2");
console.log("Expected: ['(())', '()()']");
console.log("Got:     ", generateParenthesis(2));
console.log();

console.log("Test 3: n = 3");
console.log("Expected: ['((()))', '(()())', '(())()', '()(())', '()()()']");
console.log("Got:     ", generateParenthesis(3));
console.log();

console.log("Test 4: n = 4");
const result4 = generateParenthesis(4);
console.log("Expected count: 14 (Catalan number C(4))");
console.log("Got count:     ", result4.length);
console.log("Pehli 3:       ", result4.slice(0, 3));
console.log("Last 3:        ", result4.slice(-3));
console.log();

console.log("Test 5: n = 5");
const result5 = generateParenthesis(5);
console.log("Expected count: 42 (Catalan number C(5))");
console.log("Got count:     ", result5.length);
console.log();

// ═══════════════════════════════════════════════════════════════════════
// VERIFICATION HELPER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Verify karo ki generated parentheses valid hain
 */
function verifyResults(n: number, results: string[]): void {
  console.log(`\n═══ n=${n} ke liye Verification ═══`);

  // Catalan number calculate karo
  const catalan = calculateCatalan(n);
  const countOk = results.length === catalan;
  console.log(
    `✓ Count: ${results.length} (expected: ${catalan} - Catalan C(${n})) ${
      countOk ? "✓" : "✗"
    }`
  );

  // Saari strings ki length 2*n honi chahiye
  const allCorrectLength = results.every((s) => s.length === 2 * n);
  console.log(`✓ Saari strings ki length ${2 * n} hai: ${allCorrectLength ? "✓" : "✗"}`);

  // Sabhi strings valid honi chahiye
  let allValid = true;
  for (const s of results) {
    if (!isValidParentheses(s)) {
      console.log(`  ✗ Invalid: ${s}`);
      allValid = false;
    }
  }
  console.log(`✓ Sabhi strings valid hain: ${allValid ? "✓" : "✗"}`);

  // Koi duplicates nahi hone chahiye
  const uniqueCount = new Set(results).size;
  const noDuplicates = uniqueCount === results.length;
  console.log(`✓ Koi duplicates nahi: ${noDuplicates ? "✓" : "✗"}`);

  const allPassed = countOk && allCorrectLength && allValid && noDuplicates;
  console.log(
    `\n${allPassed ? "✅ SAARE CHECKS PASS HO GAYE!" : "❌ KOI CHECKS FAIL HO GAYE"}`
  );
}

/**
 * Check karo ki ek string valid parentheses hai ya nahi
 */
function isValidParentheses(s: string): boolean {
  let count = 0;
  for (const char of s) {
    if (char === "(") {
      count++;
    } else if (char === ")") {
      count--;
      // Agar kabhi bhi count negative ho jaye, invalid hai
      if (count < 0) return false;
    }
  }
  // End mein count 0 hona chahiye (balanced)
  return count === 0;
}

/**
 * Calculate Catalan number C(n)
 * Formula: C(n) = (2n)! / ((n+1)! × n!)
 */
function calculateCatalan(n: number): number {
  if (n <= 1) return 1;

  // Using dynamic programming approach
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // C(n) = C(0)*C(n-1) + C(1)*C(n-2) + ... + C(n-1)*C(0)
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - 1 - j];
    }
  }

  return dp[n];
}

// Verification run karo
verifyResults(1, generateParenthesis(1));
verifyResults(2, generateParenthesis(2));
verifyResults(3, generateParenthesis(3));
verifyResults(4, generateParenthesis(4));

export { generateParenthesis };
