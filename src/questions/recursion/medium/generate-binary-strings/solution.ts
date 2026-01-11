/**
 * GENERATE ALL BINARY STRINGS
 *
 * Problem: Integer n diya gaya hai, length n ki saari binary strings generate karni hain ascending order mein.
 *
 * Approach: Recursive Backtracking
 * - Har position pe humein 2 choices hain: '0' append karo ya '1' append karo
 * - String ko character by character recursively build karte hain
 * - Jab length n tak pahunch jaye, result mein add kar do
 * - Ascending order ke liye pehle '0' try karo phir '1'
 *
 * Time Complexity: O(n × 2^n)
 * - 2^n strings generate karni hain
 * - Har string build karne mein O(n) operations
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n) stack frames
 * - Output array count nahi kar rahe (jo O(n × 2^n) hai)
 */

/**
 * Main function: Length n ki saari binary strings generate karo
 *
 * @param n - Binary strings ki length
 * @returns Saari binary strings ascending order mein
 *
 * Algorithm:
 * 1. Empty result array initialize karo
 * 2. Empty string ke saath recursive generation start karo
 * 3. Har step pe, do paths mein branch karo: '0' append karo ya '1'
 * 4. Jab string length n ke equal ho jaye, result mein add karo
 * 5. Lexicographic order ke liye hamesha pehle '0' try karo phir '1'
 */
function generateBinaryStrings(n: number): string[] {
  const result: string[] = [];

  // Empty string se recursive generation start karo
  generate('', n, result);

  return result;
}

/**
 * Helper function: Binary strings ko recursively build karo
 *
 * @param current - Current string jo build ho rahi hai
 * @param n - Target length
 * @param result - Complete strings store karne ke liye array
 *
 * Decision Tree Example (n=2):
 *
 *                 ""
 *               /    \
 *            "0"      "1"
 *           /  \      /  \
 *        "00" "01"  "10" "11"
 *         ✓    ✓     ✓    ✓
 *
 * Order: ["00", "01", "10", "11"] (ascending)
 */
function generate(current: string, n: number, result: string[]): void {
  // BASE CASE: String complete ho gayi (length n ke equal)
  if (current.length === n) {
    result.push(current);
    return;
  }

  // RECURSIVE CASE: String ko character by character build karo

  // Choice 1: '0' append karo (ascending order ke liye pehle ye try karo)
  generate(current + '0', n, result);

  // Choice 2: '1' append karo
  generate(current + '1', n, result);
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * DRY RUN: generateBinaryStrings(2)
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Initial Call: generateBinaryStrings(2)
 * - result = []
 * - Start: generate("", 2, result)
 *
 * ┌────────────────────────────────────────────────────────────────────┐
 * │ CALL 1: generate("", 2, result)                                    │
 * ├────────────────────────────────────────────────────────────────────┤
 * │ current = ""                                                       │
 * │ current.length = 0, n = 2                                         │
 * │ 0 !== 2 → Base case nahi, recursion continue karo                │
 * │                                                                    │
 * │ Choice 1: Pehle '0' try karo (ascending order ke liye)           │
 * │   ┌──────────────────────────────────────────────────────────┐   │
 * │   │ CALL 2: generate("0", 2, result)                         │   │
 * │   ├──────────────────────────────────────────────────────────┤   │
 * │   │ current = "0"                                            │   │
 * │   │ current.length = 1, n = 2                               │   │
 * │   │ 1 !== 2 → Base case nahi, recursion continue karo      │   │
 * │   │                                                          │   │
 * │   │ Choice 1: Pehle '0' try karo                            │   │
 * │   │   ┌────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 3: generate("00", 2, result)              │   │   │
 * │   │   ├────────────────────────────────────────────────┤   │   │
 * │   │   │ current = "00"                                 │   │   │
 * │   │   │ current.length = 2, n = 2                     │   │   │
 * │   │   │ 2 === 2 → BASE CASE MIL GAYA! ✓               │   │   │
 * │   │   │                                                │   │   │
 * │   │   │ Action: result.push("00")                     │   │   │
 * │   │   │ result = ["00"]                                │   │   │
 * │   │   │ Return karo                                    │   │   │
 * │   │   └────────────────────────────────────────────────┘   │   │
 * │   │                                                          │   │
 * │   │ Wapas CALL 2 mein                                       │   │
 * │   │                                                          │   │
 * │   │ Choice 2: Ab '1' try karo                               │   │
 * │   │   ┌────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 4: generate("01", 2, result)              │   │   │
 * │   │   ├────────────────────────────────────────────────┤   │   │
 * │   │   │ current = "01"                                 │   │   │
 * │   │   │ current.length = 2, n = 2                     │   │   │
 * │   │   │ 2 === 2 → BASE CASE MIL GAYA! ✓               │   │   │
 * │   │   │                                                │   │   │
 * │   │   │ Action: result.push("01")                     │   │   │
 * │   │   │ result = ["00", "01"]                          │   │   │
 * │   │   │ Return karo                                    │   │   │
 * │   │   └────────────────────────────────────────────────┘   │   │
 * │   │                                                          │   │
 * │   │ "0" ke liye saare choices explore ho gaye, return      │   │
 * │   └──────────────────────────────────────────────────────────┘   │
 * │                                                                    │
 * │ Wapas CALL 1 mein                                                 │
 * │                                                                    │
 * │ Choice 2: Ab '1' try karo                                         │
 * │   ┌──────────────────────────────────────────────────────────┐   │
 * │   │ CALL 5: generate("1", 2, result)                         │   │
 * │   ├──────────────────────────────────────────────────────────┤   │
 * │   │ current = "1"                                            │   │
 * │   │ current.length = 1, n = 2                               │   │
 * │   │ 1 !== 2 → Base case nahi, recursion continue karo      │   │
 * │   │                                                          │   │
 * │   │ Choice 1: Pehle '0' try karo                            │   │
 * │   │   ┌────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 6: generate("10", 2, result)              │   │   │
 * │   │   ├────────────────────────────────────────────────┤   │   │
 * │   │   │ current = "10"                                 │   │   │
 * │   │   │ current.length = 2, n = 2                     │   │   │
 * │   │   │ 2 === 2 → BASE CASE MIL GAYA! ✓               │   │   │
 * │   │   │                                                │   │   │
 * │   │   │ Action: result.push("10")                     │   │   │
 * │   │   │ result = ["00", "01", "10"]                    │   │   │
 * │   │   │ Return karo                                    │   │   │
 * │   │   └────────────────────────────────────────────────┘   │   │
 * │   │                                                          │   │
 * │   │ Wapas CALL 5 mein                                       │   │
 * │   │                                                          │   │
 * │   │ Choice 2: Ab '1' try karo                               │   │
 * │   │   ┌────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 7: generate("11", 2, result)              │   │   │
 * │   │   ├────────────────────────────────────────────────┤   │   │
 * │   │   │ current = "11"                                 │   │   │
 * │   │   │ current.length = 2, n = 2                     │   │   │
 * │   │   │ 2 === 2 → BASE CASE MIL GAYA! ✓               │   │   │
 * │   │   │                                                │   │   │
 * │   │   │ Action: result.push("11")                     │   │   │
 * │   │   │ result = ["00", "01", "10", "11"]              │   │   │
 * │   │   │ Return karo                                    │   │   │
 * │   │   └────────────────────────────────────────────────┘   │   │
 * │   │                                                          │   │
 * │   │ "1" ke liye saare choices explore ho gaye, return      │   │
 * │   └──────────────────────────────────────────────────────────┘   │
 * │                                                                    │
 * │ "" ke liye saare choices explore ho gaye, return                 │
 * └────────────────────────────────────────────────────────────────────┘
 *
 * Final Result: ["00", "01", "10", "11"]
 *
 * Verification:
 * ✓ Saari strings ki length 2 hai
 * ✓ Total count = 2^2 = 4
 * ✓ Order ascending hai (lexicographic)
 * ✓ Koi duplicates nahi
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * ASCENDING ORDER KYUN AATA HAI
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Key Principle: Har recursive call mein hamesha '0' ko '1' se PEHLE try karo
 *
 * Isse depth-first search ban jata hai jo hamesha "chhota" branch (0) ko
 * "bade" branch (1) se pehle explore karta hai.
 *
 * Visual Comparison:
 *
 * Humara Order (0 pehle):        Galat Order (1 pehle):
 *        ""                           ""
 *      ↙    ↘                       ↙    ↘
 *    "0"     "1"                  "1"     "0"
 *   ↙  ↘    ↙  ↘                ↙  ↘    ↙  ↘
 * "00" "01" "10" "11"          "11" "10" "01" "00"
 *  ↑    ↑    ↑    ↑            ↑    ↑    ↑    ↑
 * 1st  2nd  3rd  4th          1st  2nd  3rd  4th
 *
 * Result: Ascending ✓         Result: Descending ✗
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * RECURSION CALL COUNT ANALYSIS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * n=2 ke liye:
 * - Level 0 (length 0): 1 call   ("" → 2 mein split hota hai)
 * - Level 1 (length 1): 2 calls  ("0", "1" → har ek 2 mein split)
 * - Level 2 (length 2): 4 calls  ("00", "01", "10", "11" → base case)
 *
 * Total calls: 1 + 2 + 4 = 7 = (2^3 - 1) = (2^(n+1) - 1)
 * Base case hits: 4 = 2^2 = 2^n
 *
 * General n ke liye:
 * - Total recursive calls: 2^(n+1) - 1
 * - Base case hits (strings generated): 2^n
 *
 * Example n=3 ke liye:
 * - Total calls: 2^4 - 1 = 15
 * - Strings generated: 2^3 = 8
 * - Internal nodes (non-base calls): 15 - 8 = 7
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * VISUALIZATION: COMPLETE RECURSION TREE (n=3)
 * ═══════════════════════════════════════════════════════════════════════
 *
 *                               "" (Level 0)
 *                             /    \
 *                          "0"      "1" (Level 1)
 *                         /   \     /   \
 *                      "00"  "01" "10"  "11" (Level 2)
 *                      / \    / \   / \   / \
 *                   "000" "001" ... ... "110" "111" (Level 3)
 *                    ✓     ✓              ✓     ✓
 *
 * Result Order:
 * 1. "000"  ← Sabse left path (hamesha 0 choose karo)
 * 2. "001"  ← Ek level backtrack, 1 try karo
 * 3. "010"  ← Do level backtrack, 1 try karo, phir 0
 * 4. "011"  ← Ek level backtrack, 1 try karo
 * 5. "100"  ← Poora backtrack, 1 try, phir 0, phir 0
 * 6. "101"  ← Ek level backtrack, 1 try karo
 * 7. "110"  ← Do level backtrack, 1 try, phir 0
 * 8. "111"  ← Ek level backtrack, 1 try karo
 *
 * Ye Depth-First Search (DFS) hai left-first exploration ke saath!
 */

// ═══════════════════════════════════════════════════════════════════════
// TEST CASES
// ═══════════════════════════════════════════════════════════════════════

console.log('Test 1: n = 2');
console.log("Expected: ['00', '01', '10', '11']");
console.log('Got:     ', generateBinaryStrings(2));
console.log();

console.log('Test 2: n = 1');
console.log("Expected: ['0', '1']");
console.log('Got:     ', generateBinaryStrings(1));
console.log();

console.log('Test 3: n = 3');
console.log(
  "Expected: ['000', '001', '010', '011', '100', '101', '110', '111']"
);
console.log('Got:     ', generateBinaryStrings(3));
console.log();

console.log('Test 4: n = 4 (pehli 5 strings)');
const result4 = generateBinaryStrings(4);
console.log("Expected: ['0000', '0001', '0010', '0011', '0100', ...]");
console.log('Got:     ', result4.slice(0, 5), '...');
console.log('Total strings:', result4.length, '(expected: 16)');
console.log();

console.log('Test 5: n = 5 ke liye count verify karo');
const result5 = generateBinaryStrings(5);
console.log('Expected count: 2^5 = 32');
console.log('Got count:     ', result5.length);
console.log('Pehli 3:       ', result5.slice(0, 3));
console.log('Last 3:        ', result5.slice(-3));
console.log();

// ═══════════════════════════════════════════════════════════════════════
// VERIFICATION HELPER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Verify karo ki generated strings saari requirements meet karti hain
 */
function verifyResults(n: number, results: string[]): void {
  console.log(`\n═══ n=${n} ke liye Verification ═══`);

  // Check 1: Correct count
  const expectedCount = Math.pow(2, n);
  const countOk = results.length === expectedCount;
  console.log(
    `✓ Count: ${results.length} (expected: ${expectedCount}) ${countOk ? '✓' : '✗'}`
  );

  // Check 2: Saari strings ki length n hai
  const allCorrectLength = results.every((s) => s.length === n);
  console.log(
    `✓ Saari strings ki length ${n} hai: ${allCorrectLength ? '✓' : '✗'}`
  );

  // Check 3: Saari strings mein sirf '0' aur '1' hai
  const allBinary = results.every((s) => /^[01]+$/.test(s));
  console.log(`✓ Saari binary strings hain: ${allBinary ? '✓' : '✗'}`);

  // Check 4: Ascending order (lexicographic)
  let isAscending = true;
  for (let i = 1; i < results.length; i++) {
    if (results[i] <= results[i - 1]) {
      isAscending = false;
      break;
    }
  }
  console.log(`✓ Ascending order: ${isAscending ? '✓' : '✗'}`);

  // Check 5: Koi duplicates nahi
  const uniqueCount = new Set(results).size;
  const noDuplicates = uniqueCount === results.length;
  console.log(`✓ Koi duplicates nahi: ${noDuplicates ? '✓' : '✗'}`);

  const allPassed =
    countOk && allCorrectLength && allBinary && isAscending && noDuplicates;
  console.log(
    `\n${allPassed ? '✅ SAARE CHECKS PASS HO GAYE!' : '❌ KOI CHECKS FAIL HO GAYE'}`
  );
}

// Verification run karo
verifyResults(3, generateBinaryStrings(3));
verifyResults(4, generateBinaryStrings(4));

export { generateBinaryStrings };