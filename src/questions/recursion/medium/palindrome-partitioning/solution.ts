/**
 * https://gemini.google.com/gem/9013c4cd97d5/dba2b79204a982b3
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * LEETCODE - PALINDROME PARTITIONING (Medium)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Problem: Given a string s, partition s such that every substring of the
 *          partition is a palindrome. Return all possible palindrome
 *          partitioning of s.
 *
 * Example:
 *   Input: s = "aab"
 *   Output: [["a","a","b"],["aa","b"]]
 *
 * Approach: Backtracking with Palindrome Checking
 * Time Complexity: O(n × 2^n)
 * Space Complexity: O(n) - recursion depth
 *
 * Key Points:
 * - Try all possible substrings at each position
 * - Check if substring is palindrome (two pointers)
 * - Only recurse if palindrome
 * - Base case: reached end of string
 * - Backtrack to explore other partitions
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace PalindromePartitioningBacktracking {
  /**
   * Main function to find all palindrome partitions
   * @param s - Input string
   * @returns All possible palindrome partitions
   */
  function partition(s: string): string[][] {
    // STEP 1: Initialize result array
    const result: string[][] = [];

    // STEP 2: Initialize current partition array
    const current: string[] = [];

    // STEP 3: Start backtracking from index 0
    // WHY: We process string from left to right
    backtrack(0, current, s, result);

    // STEP 4: Return all valid partitions
    return result;
  }

  /**
   * Recursive backtracking function
   *
   * @param start - Starting index in string
   * @param current - Current partition being built
   * @param s - Input string
   * @param result - All valid partitions collected
   *
   * Pattern: Try all substrings from start, recurse if palindrome
   */
  function backtrack(
    start: number,
    current: string[],
    s: string,
    result: string[][]
  ): void {
    // BASE CASE: Reached end of string
    // WHY: We've successfully partitioned entire string
    // EXAMPLE: s = "aab", start = 3 (length)
    //          current = ["a", "a", "b"] or ["aa", "b"]
    //          All substrings are palindromes! Valid partition ✓
    if (start === s.length) {
      result.push([...current]); // Copy array to avoid reference issues
      return; // Stop this path
    }

    // RECURSIVE CASE: Try all possible substrings from start
    // WHY: We want to explore all partition possibilities
    // EXAMPLE: start = 0, s = "aab"
    //          Try: "a" (i=0), "aa" (i=1), "aab" (i=2)
    for (let i = start; i < s.length; i++) {
      // STEP 1: Extract substring from start to i+1
      // WHY: substring(start, end) - end is exclusive
      // EXAMPLE: s = "aab", start = 0, i = 0
      //          substring(0, 1) = "a"
      //
      //          start = 0, i = 1
      //          substring(0, 2) = "aa"
      const substring = s.substring(start, i + 1);

      // STEP 2: Check if substring is palindrome
      // WHY: Only palindrome substrings are valid in partition
      // EXAMPLE: "a" → palindrome ✓
      //          "aa" → palindrome ✓
      //          "ab" → NOT palindrome ❌
      if (isPalindrome(substring)) {
        // PICK: Add palindrome to current partition
        // WHY: This is a valid choice
        // EXAMPLE: current = [] → add "a" → current = ["a"]
        current.push(substring);

        // RECURSE: Process remaining string
        // WHY: After taking substring [start...i], next part starts at i+1
        // EXAMPLE: Took "a" (0 to 0), next start from index 1
        //          Remaining string: "ab"
        backtrack(i + 1, current, s, result);

        // BACKTRACK: Remove substring to try other possibilities
        // WHY: We need to restore state to try next substring
        // EXAMPLE: After exploring ["a", ...] paths,
        //          remove "a" to try ["aa", ...]
        //          current = ["a"] → pop() → current = []
        current.pop();
      }
      // If not palindrome, skip this substring (don't recurse)
    }
  }

  /**
   * Helper function to check if string is palindrome
   * Uses two-pointer technique
   *
   * @param str - String to check
   * @returns true if palindrome, false otherwise
   */
  function isPalindrome(str: string): boolean {
    // STEP 1: Initialize two pointers
    // WHY: Compare characters from both ends moving inward
    let left = 0;
    let right = str.length - 1;

    // STEP 2: Compare characters while pointers don't cross
    // WHY: Palindrome has same characters from both ends
    // EXAMPLE: "aba"
    //          left=0:'a', right=2:'a' → match ✓
    //          left=1:'b', right=1:'b' → match ✓ (same position)
    //          → Palindrome!
    while (left < right) {
      // If characters don't match, NOT palindrome
      // EXAMPLE: "ab"
      //          left=0:'a', right=1:'b' → don't match ❌
      if (str[left] !== str[right]) {
        return false;
      }

      // Move pointers inward
      // WHY: Check next pair of characters
      left++;
      right--;
    }

    // All characters matched! It's a palindrome
    // EXAMPLE: "a" → single char, always palindrome
    //          "aa" → both 'a', palindrome
    //          "aba" → all checks passed, palindrome
    return true;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input: s = "aab"
   *
   * ═══════════════════════════════════════════════════════════════════════
   * INITIAL SETUP
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Input: s = "aab"
   * Length: 3
   *
   * Variables:
   * - result = []
   * - current = []
   * - start = 0
   *
   * Start: backtrack(0, [], "aab", result)
   *
   * ═══════════════════════════════════════════════════════════════════════
   * CALL 1: backtrack(start=0, current=[])
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Base case? start === s.length? 0 === 3? NO
   *
   * Loop from i=0 to 2 (try all substrings from index 0)
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=0: Try substring s[0:1] = "a"
   * ├────────────────────────────────────────────────────────────────────
   * │ substring = s.substring(0, 1) = "a"
   * │
   * │ isPalindrome("a")?
   * │   left=0, right=0
   * │   left < right? 0 < 0? NO
   * │   Return true ✓
   * │
   * │ Palindrome! ✓ Proceed with this choice
   * │
   * │ current.push("a") → current = ["a"]
   * │
   * │ Recurse: backtrack(1, ["a"], "aab", result)
   * │   ↓
   * │   ┌────────────────────────────────────────────────────────────────
   * │   │ CALL 2: backtrack(start=1, current=["a"])
   * │   ├────────────────────────────────────────────────────────────────
   * │   │ Base case? 1 === 3? NO
   * │   │
   * │   │ Loop from i=1 to 2 (try substrings from index 1)
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=1: Try substring s[1:2] = "a"
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ substring = s.substring(1, 2) = "a"
   * │   │ │
   * │   │ │ isPalindrome("a")? YES ✓
   * │   │ │
   * │   │ │ current.push("a") → current = ["a", "a"]
   * │   │ │
   * │   │ │ Recurse: backtrack(2, ["a","a"], "aab", result)
   * │   │ │   ↓
   * │   │ │   ┌──────────────────────────────────────────────────
   * │   │ │   │ CALL 3: backtrack(start=2, current=["a","a"])
   * │   │ │   ├──────────────────────────────────────────────────
   * │   │ │   │ Base case? 2 === 3? NO
   * │   │ │   │
   * │   │ │   │ Loop from i=2 to 2 (only one substring)
   * │   │ │   │
   * │   │ │   │ ┌── i=2: Try s[2:3] = "b" ──────────┐
   * │   │ │   │ │ substring = "b"                    │
   * │   │ │   │ │                                    │
   * │   │ │   │ │ isPalindrome("b")? YES ✓          │
   * │   │ │   │ │                                    │
   * │   │ │   │ │ current.push("b")                 │
   * │   │ │   │ │ → current = ["a","a","b"]         │
   * │   │ │   │ │                                    │
   * │   │ │   │ │ Recurse: backtrack(3,["a","a","b"])│
   * │   │ │   │ │   ↓                                │
   * │   │ │   │ │   CALL 4: backtrack(3,["a","a","b"])
   * │   │ │   │ │   Base case? 3 === 3? YES! ✓      │
   * │   │ │   │ │                                    │
   * │   │ │   │ │   We reached end of string!       │
   * │   │ │   │ │   All substrings are palindromes! │
   * │   │ │   │ │                                    │
   * │   │ │   │ │   result.push(["a","a","b"])      │
   * │   │ │   │ │   result = [["a","a","b"]]  ✓    │
   * │   │ │   │ │                                    │
   * │   │ │   │ │   return                           │
   * │   │ │   │ │                                    │
   * │   │ │   │ │ ┌─────────────────────────────────────────────┐
   * │   │ │   │ │ │ CONTROL FLOW AFTER RETURN:                  │
   * │   │ │   │ │ │ Returns to CALL 3                           │
   * │   │ │   │ │ │ Where were we? After backtrack() call       │
   * │   │ │   │ │ │ Next line: current.pop()                    │
   * │   │ │   │ │ └─────────────────────────────────────────────┘
   * │   │ │   │ │                                    │
   * │   │ │   │ │ Back to CALL 3                     │
   * │   │ │   │ │ current.pop() → ["a","a"]         │
   * │   │ │   │ │ (Backtracking: removed "b")       │
   * │   │ │   │ │                                    │
   * │   │ │   │ │ ┌─────────────────────────────────────────────┐
   * │   │ │   │ │ │ LOOP CONTINUATION:                          │
   * │   │ │   │ │ │ We're in: for (let i=2; i<3; i++)          │
   * │   │ │   │ │ │ Current i=2, next would be i=3              │
   * │   │ │   │ │ │ Check: i<3? 3<3? NO                        │
   * │   │ │   │ │ │ → Loop ends, no more iterations             │
   * │   │ │   │ │ │ → Function returns to CALL 2                │
   * │   │ │   │ │ └─────────────────────────────────────────────┘
   * │   │ │   │ └────────────────────────────────────┘
   * │   │ │   │
   * │   │ │   │ Returns to CALL 2
   * │   │ │   │ Next line after backtrack() call: current.pop()
   * │   │ │   └──────────────────────────────────────────────────
   * │   │ │
   * │   │ │ Back to CALL 2
   * │   │ │ current.pop() → current = ["a"]
   * │   │ │ (Backtracking: removed "a")
   * │   │ │
   * │   │ │ ┌─────────────────────────────────────────────┐
   * │   │ │ │ LOOP CONTINUATION:                          │
   * │   │ │ │ We're in: for (let i=1; i<3; i++)          │
   * │   │ │ │ Just finished i=1, continue to i=2          │
   * │   │ │ │ Check: i<3? 2<3? YES → Continue loop        │
   * │   │ │ └─────────────────────────────────────────────┘
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=2: Try substring s[1:3] = "ab"
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ substring = s.substring(1, 3) = "ab"
   * │   │ │
   * │   │ │ isPalindrome("ab")?
   * │   │ │   left=0:'a', right=1:'b'
   * │   │ │   'a' !== 'b' → false ❌
   * │   │ │
   * │   │ │ NOT palindrome! ❌
   * │   │ │ SKIP! (Don't add to partition, don't recurse)
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ Loop done, return to CALL 1
   * │   └────────────────────────────────────────────────────────────────
   * │
   * │ Back to CALL 1
   * │ current.pop() → current = []
   * │ (Removed "a" to try next substring)
   * └────────────────────────────────────────────────────────────────────
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=1: Try substring s[0:2] = "aa"
   * ├────────────────────────────────────────────────────────────────────
   * │ substring = s.substring(0, 2) = "aa"
   * │
   * │ isPalindrome("aa")?
   * │   left=0:'a', right=1:'a'
   * │   'a' === 'a' ✓
   * │   left=1, right=0
   * │   left < right? 1 < 0? NO
   * │   Return true ✓
   * │
   * │ Palindrome! ✓
   * │
   * │ current.push("aa") → current = ["aa"]
   * │
   * │ Recurse: backtrack(2, ["aa"], "aab", result)
   * │   ↓
   * │   ┌────────────────────────────────────────────────────────────────
   * │   │ CALL 5: backtrack(start=2, current=["aa"])
   * │   ├────────────────────────────────────────────────────────────────
   * │   │ Base case? 2 === 3? NO
   * │   │
   * │   │ Loop from i=2 to 2
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=2: Try s[2:3] = "b"
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ substring = "b"
   * │   │ │
   * │   │ │ isPalindrome("b")? YES ✓
   * │   │ │
   * │   │ │ current.push("b") → current = ["aa","b"]
   * │   │ │
   * │   │ │ Recurse: backtrack(3, ["aa","b"], "aab", result)
   * │   │ │   ↓
   * │   │ │   CALL 6: backtrack(start=3, current=["aa","b"])
   * │   │ │   Base case? 3 === 3? YES! ✓
   * │   │ │
   * │   │ │   Reached end! Valid partition!
   * │   │ │
   * │   │ │   result.push(["aa","b"])
   * │   │ │   result = [["a","a","b"], ["aa","b"]]  ✓
   * │   │ │
   * │   │ │   return
   * │   │ │
   * │   │ │ Back to CALL 5
   * │   │ │ current.pop() → ["aa"]
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ Loop done, return to CALL 1
   * │   └────────────────────────────────────────────────────────────────
   * │
   * │ Back to CALL 1
   * │ current.pop() → current = []
   * └────────────────────────────────────────────────────────────────────
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=2: Try substring s[0:3] = "aab"
   * ├────────────────────────────────────────────────────────────────────
   * │ substring = s.substring(0, 3) = "aab"
   * │
   * │ isPalindrome("aab")?
   * │   left=0:'a', right=2:'b'
   * │   'a' !== 'b' → false ❌
   * │
   * │ NOT palindrome! ❌
   * │ SKIP! (Don't add, don't recurse)
   * └────────────────────────────────────────────────────────────────────
   *
   * Loop done, return to main
   *
   * ═══════════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═══════════════════════════════════════════════════════════════════════
   *
   * result = [["a","a","b"], ["aa","b"]]
   *
   * Total: 2 valid palindrome partitions
   *
   * Visualization of all paths explored:
   *
   *                      backtrack(0, [])
   *                     /       |        \
   *                  "a"✓     "aa"✓     "aab"❌
   *                   /          |
   *          backtrack(1,[a])  backtrack(2,[aa])
   *            /      \           |
   *         "a"✓    "ab"❌      "b"✓
   *          /                    |
   *  backtrack(2,[a,a])    backtrack(3,[aa,b])
   *        |                      |
   *      "b"✓                 Complete! ✓
   *        |                 ["aa","b"]
   * backtrack(3,[a,a,b])
   *        |
   *    Complete! ✓
   *   ["a","a","b"]
   *
   * Key Observations:
   * ✓ We tried all possible substrings at each position
   * ✓ Only palindrome substrings were added to partition
   * ✓ Backtracking allowed exploring all paths
   * ✓ Base case (start === length) identified valid partitions
   * ✓ Non-palindrome substrings were skipped
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Case 1: Single character
   *   Input: "a"
   *   Only one partition: ["a"]
   *   Output: [["a"]]
   *
   * Case 2: All same characters
   *   Input: "aaa"
   *   All substrings are palindromes!
   *   Partitions:
   *   - ["a","a","a"]
   *   - ["a","aa"]
   *   - ["aa","a"]
   *   - ["aaa"]
   *   Output: [["a","a","a"], ["a","aa"], ["aa","a"], ["aaa"]]
   *
   * Case 3: No multi-char palindromes
   *   Input: "abc"
   *   No substring > 1 is palindrome
   *   Only partition: ["a","b","c"]
   *   Output: [["a","b","c"]]
   *
   * Case 4: Full string is palindrome
   *   Input: "aba"
   *   Can take whole or split
   *   Output: [["a","b","a"], ["aba"]]
   */

  /**
   * Test runner with comprehensive test cases
   */
  export function runTests(): void {
    console.log('🧪 Testing Palindrome Partitioning - Backtracking\n');

    // Test Case 1: Basic example from problem
    console.log('Test 1: Basic example "aab"');
    const test1 = partition('aab');
    console.log('Input: "aab"');
    console.log('Output:', test1);
    console.log('Expected: [["a","a","b"],["aa","b"]]');
    console.log('Result:', test1.length === 2 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 2: Single character
    console.log('Test 2: Single character "a"');
    const test2 = partition('a');
    console.log('Input: "a"');
    console.log('Output:', test2);
    console.log('Expected: [["a"]]');
    console.log('Result:', test2.length === 1 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 3: All same characters
    console.log('Test 3: All same characters "aaa"');
    const test3 = partition('aaa');
    console.log('Input: "aaa"');
    console.log('Output:', test3);
    console.log('Expected: [["a","a","a"],["a","aa"],["aa","a"],["aaa"]]');
    console.log('Result:', test3.length === 4 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 4: No multi-char palindromes
    console.log('Test 4: No multi-char palindromes "abc"');
    const test4 = partition('abc');
    console.log('Input: "abc"');
    console.log('Output:', test4);
    console.log('Expected: [["a","b","c"]]');
    console.log('Result:', test4.length === 1 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 5: Entire string is palindrome
    console.log('Test 5: Entire string palindrome "aba"');
    const test5 = partition('aba');
    console.log('Input: "aba"');
    console.log('Output:', test5);
    console.log('Expected: [["a","b","a"],["aba"]]');
    console.log('Result:', test5.length === 2 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 6: Two characters same
    console.log('Test 6: Two same chars "aa"');
    const test6 = partition('aa');
    console.log('Input: "aa"');
    console.log('Output:', test6);
    console.log('Expected: [["a","a"],["aa"]]');
    console.log('Result:', test6.length === 2 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 7: Longer palindrome
    console.log('Test 7: Longer string "racecar"');
    const test7 = partition('racecar');
    console.log('Input: "racecar"');
    console.log('Output length:', test7.length);
    console.log('Expected: Multiple partitions including full palindrome');
    console.log(
      'Result:',
      test7.some((p) => p.length === 1 && p[0] === 'racecar')
        ? '✅ PASS'
        : '❌ FAIL'
    );
    console.log();

    // Test Case 8: Multiple palindromes
    console.log('Test 8: Multiple palindromes "aabb"');
    const test8 = partition('aabb');
    console.log('Input: "aabb"');
    console.log('Output:', test8);
    console.log(
      'Expected: [["a","a","b","b"],["a","a","bb"],["aa","b","b"],["aa","bb"]]'
    );
    console.log('Result:', test8.length === 4 ? '✅ PASS' : '❌ FAIL');
    console.log();

    // Test Case 9: Complex case
    console.log('Test 9: Complex "abcba"');
    const test9 = partition('abcba');
    console.log('Input: "abcba"');
    console.log('Output length:', test9.length);
    console.log('Expected: Contains full palindrome and split versions');
    console.log(
      'Result:',
      test9.some((p) => p.length === 1 && p[0] === 'abcba')
        ? '✅ PASS'
        : '❌ FAIL'
    );
    console.log();

    // Test Case 10: Four characters
    console.log('Test 10: Four chars "aaaa"');
    const test10 = partition('aaaa');
    console.log('Input: "aaaa"');
    console.log('Output length:', test10.length);
    console.log('Expected: Many partitions (all substrings are palindromes)');
    console.log('Result:', test10.length >= 5 ? '✅ PASS' : '❌ FAIL');
    console.log();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('✨ All tests completed!');
    console.log('═══════════════════════════════════════════════════════════');
  }
}

// Execute all tests
PalindromePartitioningBacktracking.runTests();