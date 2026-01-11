/**
 * https://gemini.google.com/gem/9013c4cd97d5/a8d82d1642f2a5dc
 *
 * https://gemini.google.com/gem/9013c4cd97d5/5a06723361259b84
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * WORD BREAK - RECURSION + MEMOIZATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Problem: Given a string s and a dictionary of words, return true if s can
 *          be segmented into a space-separated sequence of dictionary words.
 *
 * Pattern: Recursion + Memoization (Top-Down Dynamic Programming)
 *
 * Approach:
 * - Try every word in dictionary at current position
 * - If word matches, recursively check remaining string
 * - Cache results to avoid redundant computation
 * - Return true if any segmentation works
 *
 * Time Complexity: O(n² × m)
 * - n = string length
 * - m = average word length
 * - n positions × n recursive calls × m string comparison
 *
 * Space Complexity: O(n)
 * - Memoization map: O(n) entries
 * - Recursion depth: O(n)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace WordBreakMemoization {
  /**
   * Main function: Check if string can be segmented using dictionary words
   *
   * @param s - Input string to segment
   * @param wordDict - Array of valid words
   * @returns true if s can be completely segmented, false otherwise
   */
  function wordBreak(s: string, wordDict: string[]): boolean {
    // Edge Case: Empty string
    // WHY: Empty string is always breakable (base case)
    if (s.length === 0) return true;

    // Edge Case: Empty dictionary
    // WHY: Cannot break any string without words
    // EXAMPLE: s = "a", wordDict = [] → false
    if (wordDict.length === 0) return false;

    // Step 1: Create memoization map
    // WHY: Cache results for each starting index to avoid recomputation
    // KEY: starting index in string
    // VALUE: boolean (can we break s[index...end]?)
    // EXAMPLE: memo[4] = true means s[4...end] can be broken
    const memo = new Map<number, boolean>();

    // Step 2: Convert array to Set for O(1) lookup
    // WHY: Checking if word exists will be done many times
    // OPTIMIZATION: Set.has() is O(1) vs Array.includes() is O(n)
    const wordSet = new Set<string>(wordDict);

    // Step 3: Start recursion from index 0
    return canBreak(s, wordSet, 0, memo);
  }

  /**
   * Helper function: Recursively check if string from 'start' can be broken
   *
   * @param s - Input string
   * @param wordSet - Set of valid words (for O(1) lookup)
   * @param start - Current starting index in string
   * @param memo - Memoization map
   * @returns true if s[start...end] can be segmented
   */
  function canBreak(
    s: string,
    wordSet: Set<string>,
    start: number,
    memo: Map<number, boolean>
  ): boolean {
    // BASE CASE 1: Reached end of string
    // WHY: Successfully segmented entire string
    // EXAMPLE: s = "leet", after matching "leet", start = 4 = length → success!
    if (start === s.length) {
      return true;
    }

    // MEMOIZATION CHECK: Already computed this subproblem?
    // WHY: Avoid recomputing same starting index multiple times
    // EXAMPLE: Both "leet"+"code" and "lee"+"t"+"code" reach index 4
    //          Second time, use cached result!
    if (memo.has(start)) {
      return memo.get(start)!;
    }

    // RECURSIVE CASE: Try all possible words starting from current position
    // WHY: Need to explore all possible segmentations

    // Try every possible end position from current start
    // EXAMPLE: If start=0, try end=1,2,3,...,length
    //          This creates substrings: s[0:1], s[0:2], s[0:3], etc.
    for (let end = start + 1; end <= s.length; end++) {
      // Extract substring from start to end
      // EXAMPLE: s = "leetcode", start=0, end=4 → word = "leet"
      const word = s.substring(start, end);

      // Check 1: Is this substring a valid dictionary word?
      // WHY: Can only use words that exist in dictionary
      // OPTIMIZATION: O(1) check using Set
      if (wordSet.has(word)) {
        // Check 2: Can we break the remaining string?
        // WHY: Need to ensure REST of string can also be segmented
        // RECURSIVE CALL: Move start to end (after current word)
        // EXAMPLE: After "leet" (0-4), check from index 4 onwards
        if (canBreak(s, wordSet, end, memo)) {
          // SUCCESS! Found valid segmentation
          // Cache TRUE result before returning
          memo.set(start, true);
          return true;
        }
        // If remaining can't be broken, try next word (continue loop)
      }
    }

    // No valid word found from this starting position
    // Cache FALSE result (IMPORTANT: cache negative results too!)
    // WHY: Prevents recomputing failures
    memo.set(start, false);
    return false;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input:
   * s = "leetcode"
   * wordDict = ["leet", "code"]
   * wordSet = {"leet", "code"}
   *
   * Initial State:
   * s = "leetcode" (length 8)
   * start = 0
   * memo = {}
   *
   * ═══════════════════════════════════════════════════════════════════════
   * MAIN CALL: canBreak(s, wordSet, 0, memo)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * CALL 1: canBreak("leetcode", wordSet, 0, memo)
   * ────────────────────────────────────────────────────────────────────
   * start = 0
   * Checks:
   *   start === s.length? 0 === 8? NO
   *   memo.has(0)? NO (first call)
   *
   * Try all end positions from start+1 to length:
   *
   * Loop iteration: end = 1
   *   word = s.substring(0, 1) = "l"
   *   wordSet.has("l")? NO → skip
   *
   * Loop iteration: end = 2
   *   word = s.substring(0, 2) = "le"
   *   wordSet.has("le")? NO → skip
   *
   * Loop iteration: end = 3
   *   word = s.substring(0, 3) = "lee"
   *   wordSet.has("lee")? NO → skip
   *
   * Loop iteration: end = 4
   *   word = s.substring(0, 4) = "leet"
   *   wordSet.has("leet")? YES ✓
   *   → Now check if remaining can be broken
   *   → Call canBreak(s, wordSet, 4, memo)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ RECURSIVE CALL:                                                 │
   * │ From: canBreak(start=0)                                         │
   * │ To: canBreak(start=4)                                           │
   * │ Reason: Found "leet" at position 0-4                           │
   * │ Remaining string: "code" (index 4 onwards)                     │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * CALL 2: canBreak("leetcode", wordSet, 4, memo)
   * ────────────────────────────────────────────────────────────────────
   * start = 4
   * Checks:
   *   start === s.length? 4 === 8? NO
   *   memo.has(4)? NO
   *
   * Try all end positions from start+1 to length:
   *
   * Loop iteration: end = 5
   *   word = s.substring(4, 5) = "c"
   *   wordSet.has("c")? NO → skip
   *
   * Loop iteration: end = 6
   *   word = s.substring(4, 6) = "co"
   *   wordSet.has("co")? NO → skip
   *
   * Loop iteration: end = 7
   *   word = s.substring(4, 7) = "cod"
   *   wordSet.has("cod")? NO → skip
   *
   * Loop iteration: end = 8
   *   word = s.substring(4, 8) = "code"
   *   wordSet.has("code")? YES ✓
   *   → Now check if remaining can be broken
   *   → Call canBreak(s, wordSet, 8, memo)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ RECURSIVE CALL:                                                 │
   * │ From: canBreak(start=4)                                         │
   * │ To: canBreak(start=8)                                           │
   * │ Reason: Found "code" at position 4-8                           │
   * │ Remaining string: "" (empty)                                    │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * CALL 3: canBreak("leetcode", wordSet, 8, memo)
   * ────────────────────────────────────────────────────────────────────
   * start = 8
   * Checks:
   *   start === s.length? 8 === 8? YES! ✓
   *   → BASE CASE: Reached end of string
   *   → return true
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ BASE CASE HIT!                                                  │
   * │ Successfully segmented entire string                            │
   * │ Path: "leet" + "code" ✓                                        │
   * │ Returning: true                                                 │
   * └─────────────────────────────────────────────────────────────────┘
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * BACKTRACKING PHASE (UNWINDING RECURSION)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * BACK TO CALL 2: canBreak(start=4)
   * ────────────────────────────────────────────────────────────────────
   * Received: true from canBreak(start=8)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ CONTROL FLOW:                                                   │
   * │ We're in: for loop trying different end positions              │
   * │ Current: end = 8, word = "code"                                │
   * │ canBreak(8) returned: true ✓                                   │
   * │ Action: Cache result and return                                 │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Action:
   *   memo.set(4, true)  // Cache: s[4...8] can be broken
   *   return true
   *
   * memo state: { 4: true }
   *
   *
   * BACK TO CALL 1: canBreak(start=0)
   * ────────────────────────────────────────────────────────────────────
   * Received: true from canBreak(start=4)
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │ CONTROL FLOW:                                                   │
   * │ We're in: for loop trying different end positions              │
   * │ Current: end = 4, word = "leet"                                │
   * │ canBreak(4) returned: true ✓                                   │
   * │ Action: Cache result and return                                 │
   * │ No need to try remaining end positions (5,6,7,8)               │
   * │ Early termination!                                              │
   * └─────────────────────────────────────────────────────────────────┘
   *
   * Action:
   *   memo.set(0, true)  // Cache: s[0...8] can be broken
   *   return true
   *
   * Final memo state: { 0: true, 4: true }
   * Final Result: true ✓
   *
   * Segmentation Found: "leet" + "code"
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EXAMPLE 2: FAILURE CASE (With Memoization Benefits)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Input:
   * s = "catsandog"
   * wordDict = ["cats", "dog", "sand", "and", "cat"]
   *
   * Key Execution Points:
   *
   * CALL 1: canBreak(0)
   *   Try "cat" (0-3): ✓ in dict
   *     CALL 2: canBreak(3)
   *       Try "san" (3-6): ❌ not in dict
   *       Try "sand" (3-7): ✓ in dict
   *         CALL 3: canBreak(7)
   *           Try "o" (7-8): ❌ not in dict
   *           Try "og" (7-9): ❌ not in dict
   *           No valid word
   *           memo.set(7, false)
   *           return false
   *
   *       ┌───────────────────────────────────────────────────────────┐
   *       │ CONTROL FLOW - AFTER canBreak(7) RETURNS false:          │
   *       │                                                           │
   *       │ Back in: canBreak(3)                                      │
   *       │ Loop continues: try next end position                     │
   *       │ Try "sando" (3-8): ❌ not in dict                        │
   *       │ Try "sandog" (3-9): ❌ not in dict                       │
   *       │ All attempts failed                                       │
   *       │ memo.set(3, false)                                        │
   *       │ return false                                              │
   *       └───────────────────────────────────────────────────────────┘
   *
   *   Try "cats" (0-4): ✓ in dict
   *     CALL 4: canBreak(4)
   *       Try "and" (4-7): ✓ in dict
   *         CALL 5: canBreak(7)
   *           ┌───────────────────────────────────────────────────┐
   *           │ MEMOIZATION HIT!                                  │
   *           │ memo.has(7)? YES!                                 │
   *           │ memo.get(7) = false                               │
   *           │ Return cached result: false                       │
   *           │ → Skip recomputation! ✓                          │
   *           └───────────────────────────────────────────────────┘
   *         return false (from memo)
   *       Continue trying other words...
   *       All fail, memo.set(4, false)
   *       return false
   *
   * Final Result: false
   *
   * Memo Benefits:
   *   Without memo: Would recompute canBreak(7) multiple times
   *   With memo: Computed once, reused multiple times ✓
   *
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════
   *
   * 1. Empty String:
   *    s = "", wordDict = ["a"]
   *    → start === s.length → true (base case)
   *
   * 2. Empty Dictionary:
   *    s = "a", wordDict = []
   *    → Early exit: return false
   *
   * 3. Word Reuse:
   *    s = "aaaa", wordDict = ["a", "aa"]
   *    canBreak(0): "a" ✓ → canBreak(1)
   *    canBreak(1): "a" ✓ → canBreak(2)
   *    canBreak(2): "aa" ✓ → canBreak(4) → true ✓
   *    Path: "a" + "a" + "aa"
   *
   * 4. Multiple Paths (Memoization Saves Work):
   *    s = "abcd", wordDict = ["a", "abc", "b", "cd"]
   *
   *    Path 1: "a" + try remaining "bcd"
   *      canBreak(1) → try "b" → canBreak(2)
   *        canBreak(2) → try "cd" → canBreak(4) → true ✓
   *        memo[2] = true
   *
   *    Path 2: "abc" + try remaining "d"
   *      canBreak(3) → no valid word → false
   *      But we might revisit canBreak(2) from different path
   *        → Use memo[2] = true ✓
   *
   * 5. No Valid Segmentation:
   *    s = "ab", wordDict = ["a"]
   *    canBreak(0): "a" ✓ → canBreak(1)
   *    canBreak(1): no "b" in dict → false
   *    memo[1] = false
   *    memo[0] = false
   *    return false
   *
   */

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Run comprehensive test cases
   */
  export function runTests(): void {
    console.log('🧪 Testing Word Break - Recursion + Memoization\n');

    // Test 1: Basic example - single segmentation
    console.log('Test 1: Basic example');
    const s1 = 'leetcode';
    const wordDict1 = ['leet', 'code'];
    const result1 = wordBreak(s1, wordDict1);
    console.log(`String: "${s1}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict1)}`);
    console.log(`Result: ${result1}`);
    console.log(`Expected: true ("leet" + "code")`);
    console.log(`✓ ${result1 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 2: Word reuse allowed
    console.log('Test 2: Word reuse');
    const s2 = 'applepenapple';
    const wordDict2 = ['apple', 'pen'];
    const result2 = wordBreak(s2, wordDict2);
    console.log(`String: "${s2}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict2)}`);
    console.log(`Result: ${result2}`);
    console.log(`Expected: true ("apple" + "pen" + "apple")`);
    console.log(`✓ ${result2 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 3: No valid segmentation
    console.log('Test 3: No valid segmentation');
    const s3 = 'catsandog';
    const wordDict3 = ['cats', 'dog', 'sand', 'and', 'cat'];
    const result3 = wordBreak(s3, wordDict3);
    console.log(`String: "${s3}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict3)}`);
    console.log(`Result: ${result3}`);
    console.log(`Expected: false ("og" cannot be formed)`);
    console.log(`✓ ${result3 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 4: Empty string
    console.log('Test 4: Empty string');
    const s4 = '';
    const wordDict4 = ['a', 'b'];
    const result4 = wordBreak(s4, wordDict4);
    console.log(`String: "${s4}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict4)}`);
    console.log(`Result: ${result4}`);
    console.log(`Expected: true (empty string always breakable)`);
    console.log(`✓ ${result4 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 5: Single character match
    console.log('Test 5: Single character');
    const s5 = 'a';
    const wordDict5 = ['a'];
    const result5 = wordBreak(s5, wordDict5);
    console.log(`String: "${s5}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict5)}`);
    console.log(`Result: ${result5}`);
    console.log(`Expected: true`);
    console.log(`✓ ${result5 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 6: Repeated character with reuse
    console.log('Test 6: Repeated characters');
    const s6 = 'aaaaaaa';
    const wordDict6 = ['aaaa', 'aaa'];
    const result6 = wordBreak(s6, wordDict6);
    console.log(`String: "${s6}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict6)}`);
    console.log(`Result: ${result6}`);
    console.log(`Expected: true ("aaaa" + "aaa" = 7 chars)`);
    console.log(`✓ ${result6 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 7: Multiple valid paths
    console.log('Test 7: Multiple valid segmentations');
    const s7 = 'catsanddog';
    const wordDict7 = ['cat', 'cats', 'and', 'sand', 'dog'];
    const result7 = wordBreak(s7, wordDict7);
    console.log(`String: "${s7}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict7)}`);
    console.log(`Result: ${result7}`);
    console.log(`Expected: true ("cats" + "and" + "dog")`);
    console.log(`✓ ${result7 === true ? 'PASS' : 'FAIL'}\n`);

    // Test 8: Empty dictionary
    console.log('Test 8: Empty dictionary');
    const s8 = 'a';
    const wordDict8: string[] = [];
    const result8 = wordBreak(s8, wordDict8);
    console.log(`String: "${s8}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict8)}`);
    console.log(`Result: ${result8}`);
    console.log(`Expected: false (no words available)`);
    console.log(`✓ ${result8 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 9: Word exists but can't complete
    console.log('Test 9: Partial match fails');
    const s9 = 'aaab';
    const wordDict9 = ['a', 'aa'];
    const result9 = wordBreak(s9, wordDict9);
    console.log(`String: "${s9}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict9)}`);
    console.log(`Result: ${result9}`);
    console.log(`Expected: false (can't form "b")`);
    console.log(`✓ ${result9 === false ? 'PASS' : 'FAIL'}\n`);

    // Test 10: Long overlapping possibilities
    console.log('Test 10: Complex segmentation');
    const s10 = 'abcd';
    const wordDict10 = ['a', 'abc', 'b', 'cd'];
    const result10 = wordBreak(s10, wordDict10);
    console.log(`String: "${s10}"`);
    console.log(`Dictionary: ${JSON.stringify(wordDict10)}`);
    console.log(`Result: ${result10}`);
    console.log(
      `Expected: true ("a" + "b" + "cd" or "abc" + "d" if "d" exists)`
    );
    console.log(`Note: "abc" + needs "d" but "a" + "b" + "cd" works!`);
    console.log(`✓ ${result10 === true ? 'PASS' : 'FAIL'}\n`);

    console.log('═══════════════════════════════════════');
    console.log('All tests completed! ✓');
    console.log('═══════════════════════════════════════');
  }
}

// Execute tests
WordBreakMemoization.runTests();