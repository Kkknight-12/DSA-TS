/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LEETCODE - LETTER COMBINATIONS OF A PHONE NUMBER (Medium)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Problem: Given a string containing digits from 2-9, return all possible
 *          letter combinations that the number could represent.
 *
 * Example:
 *   Input: digits = "23"
 *   Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * Approach: Backtracking
 * Time Complexity: O(4^n × n) where n = digits.length
 * Space Complexity: O(n) - recursion depth
 *
 * Key Points:
 * - Phone keypad mapping: 2→abc, 3→def, etc.
 * - Build combinations one digit at a time
 * - Try all letters for each digit
 * - Implicit backtracking (pass new string, don't modify)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

namespace LetterCombinationsBacktracking {
  /**
   * Phone keypad mapping
   * Jaise purane phones mein hota tha!
   */
  const phoneMap: Record<string, string> = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };

  /**
   * Main function to generate all letter combinations
   * @param digits - String of digits (2-9)
   * @returns All possible letter combinations
   */
  function letterCombinations(digits: string): string[] {
    // Edge Case: Empty string
    // WHY: No digits to process
    // EXAMPLE: digits = "" → return []
    if (digits.length === 0) {
      return [];
    }

    // STEP 1: Initialize result array
    const result: string[] = [];

    // STEP 2: Start backtracking from index 0 with empty string
    // WHY: We build combination character by character
    // EXAMPLE: Start with "" and add letters one by one
    backtrack(0, "", digits, result);

    // STEP 3: Return all combinations
    return result;
  }

  /**
   * Recursive backtracking function
   *
   * @param index - Current position in digits string
   * @param current - Current combination being built
   * @param digits - Input digits string
   * @param result - All combinations collected so far
   *
   * Pattern: Build one character at a time, explore all options
   */
  function backtrack(
    index: number,
    current: string,
    digits: string,
    result: string[]
  ): void {
    // BASE CASE: We've processed all digits
    // WHY: When index reaches digits.length, we have a complete combination
    // EXAMPLE: digits="23", index=2 means we've processed both '2' and '3'
    //          current might be "ad", "ae", "af", etc.
    if (index === digits.length) {
      result.push(current); // Add complete combination to result
      return; // Stop recursion for this path
    }

    // RECURSIVE CASE: Process current digit
    // STEP 1: Get current digit
    // EXAMPLE: If index=0 and digits="23", digit='2'
    const digit = digits[index];

    // STEP 2: Get letters for this digit from mapping
    // WHY: Each digit maps to 2-4 letters
    // EXAMPLE: digit='2' → letters="abc"
    //          digit='7' → letters="pqrs"
    const letters = phoneMap[digit];

    // STEP 3: Try each letter for current digit
    // WHY: We want all possible combinations
    // EXAMPLE: For digit='2', try 'a', then 'b', then 'c'
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];

      // PICK: Add current letter to combination
      // WHY: We're exploring this path
      // EXAMPLE: If current="a" and letter='d', new combination="ad"

      // RECURSE: Process next digit with updated combination
      // WHY: Build combination incrementally
      // IMPORTANT: We pass (current + letter), NOT modifying current
      //            This is IMPLICIT BACKTRACKING!
      //            After this call returns, current is unchanged
      //            So we can try next letter in the loop
      //
      // EXAMPLE:
      //   current = "a", letter = 'd'
      //   We call: backtrack(index + 1, "ad", digits, result)
      //   After return, current is still "a"
      //   Next iteration: letter = 'e', we call with "ae"
      backtrack(index + 1, current + letter, digits, result);

      // NO EXPLICIT BACKTRACKING NEEDED!
      // WHY? We never modified 'current'
      //      We passed 'current + letter' which creates a new string
      //      So 'current' remains unchanged for next iteration
      //
      // This is different from array backtracking where we do:
      //   array.push(element)
      //   recurse()
      //   array.pop()  ← Explicit backtrack
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Example Input: digits = "23"
   *
   * ═══════════════════════════════════════════════════════════════════════
   * INITIAL SETUP
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Input: digits = "23"
   * Phone Mapping:
   *   '2' → "abc" (3 letters)
   *   '3' → "def" (3 letters)
   *
   * Expected total combinations: 3 × 3 = 9
   *
   * Variables:
   * - result = []
   * - index = 0
   * - current = ""
   *
   * Start: backtrack(0, "", "23", result)
   *
   * ═══════════════════════════════════════════════════════════════════════
   * CALL 1: backtrack(index=0, current="")
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Base case? index === digits.length? → 0 === 2? NO
   *
   * digit = digits[0] = '2'
   * letters = phoneMap['2'] = "abc"
   *
   * Loop through letters: 'a', 'b', 'c'
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=0: letter = 'a'
   * ├────────────────────────────────────────────────────────────────────
   * │ Recurse: backtrack(1, "a", "23", result)
   * │          current + letter = "" + "a" = "a"
   * │   ↓
   * │   ┌────────────────────────────────────────────────────────────────
   * │   │ CALL 2: backtrack(index=1, current="a")
   * │   ├────────────────────────────────────────────────────────────────
   * │   │ Base case? 1 === 2? NO
   * │   │
   * │   │ digit = digits[1] = '3'
   * │   │ letters = phoneMap['3'] = "def"
   * │   │
   * │   │ Loop through letters: 'd', 'e', 'f'
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=0: letter = 'd'
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ Recurse: backtrack(2, "ad", "23", result)
   * │   │ │          current + letter = "a" + "d" = "ad"
   * │   │ │   ↓
   * │   │ │   ┌──────────────────────────────────────────────────
   * │   │ │   │ CALL 3: backtrack(index=2, current="ad")
   * │   │ │   ├──────────────────────────────────────────────────
   * │   │ │   │ Base case? 2 === 2? YES! ✓
   * │   │ │   │
   * │   │ │   │ result.push("ad")
   * │   │ │   │ result = ["ad"]  ✓
   * │   │ │   │
   * │   │ │   │ return
   * │   │ │   └──────────────────────────────────────────────────
   * │   │ │
   * │   │ │ Back to CALL 2
   * │   │ │ current is still "a" (unchanged!)
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=1: letter = 'e'
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ Recurse: backtrack(2, "ae", "23", result)
   * │   │ │          current + letter = "a" + "e" = "ae"
   * │   │ │   ↓
   * │   │ │   CALL 4: backtrack(index=2, current="ae")
   * │   │ │   Base case? 2 === 2? YES! ✓
   * │   │ │   result.push("ae")
   * │   │ │   result = ["ad", "ae"]  ✓
   * │   │ │   return
   * │   │ │
   * │   │ │ Back to CALL 2, current still "a"
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ ┌──────────────────────────────────────────────────────────
   * │   │ │ Iteration i=2: letter = 'f'
   * │   │ ├──────────────────────────────────────────────────────────
   * │   │ │ Recurse: backtrack(2, "af", "23", result)
   * │   │ │          current + letter = "a" + "f" = "af"
   * │   │ │   ↓
   * │   │ │   CALL 5: backtrack(index=2, current="af")
   * │   │ │   Base case? 2 === 2? YES! ✓
   * │   │ │   result.push("af")
   * │   │ │   result = ["ad", "ae", "af"]  ✓
   * │   │ │   return
   * │   │ │
   * │   │ │ Back to CALL 2, loop done
   * │   │ └──────────────────────────────────────────────────────────
   * │   │
   * │   │ return to CALL 1
   * │   └────────────────────────────────────────────────────────────────
   * │
   * │ Back to CALL 1
   * │ current is still "" (unchanged!)
   * └────────────────────────────────────────────────────────────────────
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=1: letter = 'b'
   * ├────────────────────────────────────────────────────────────────────
   * │ Recurse: backtrack(1, "b", "23", result)
   * │          current + letter = "" + "b" = "b"
   * │   ↓
   * │   CALL 6: backtrack(index=1, current="b")
   * │   digit = '3', letters = "def"
   * │
   * │   Loop through 'd', 'e', 'f':
   * │     backtrack(2, "bd") → result.push("bd") ✓
   * │     backtrack(2, "be") → result.push("be") ✓
   * │     backtrack(2, "bf") → result.push("bf") ✓
   * │
   * │   result = ["ad", "ae", "af", "bd", "be", "bf"]  ✓
   * │
   * │   return to CALL 1
   * └────────────────────────────────────────────────────────────────────
   *
   * ┌────────────────────────────────────────────────────────────────────
   * │ Iteration i=2: letter = 'c'
   * ├────────────────────────────────────────────────────────────────────
   * │ Recurse: backtrack(1, "c", "23", result)
   * │          current + letter = "" + "c" = "c"
   * │   ↓
   * │   CALL 7: backtrack(index=1, current="c")
   * │   digit = '3', letters = "def"
   * │
   * │   Loop through 'd', 'e', 'f':
   * │     backtrack(2, "cd") → result.push("cd") ✓
   * │     backtrack(2, "ce") → result.push("ce") ✓
   * │     backtrack(2, "cf") → result.push("cf") ✓
   * │
   * │   result = ["ad","ae","af","bd","be","bf","cd","ce","cf"]  ✓
   * │
   * │   return to CALL 1
   * └────────────────────────────────────────────────────────────────────
   *
   * Loop done, return to main function
   *
   * ═══════════════════════════════════════════════════════════════════════
   * FINAL RESULT
   * ═══════════════════════════════════════════════════════════════════════
   *
   * result = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
   *
   * Total combinations: 9 (3 × 3 as expected!)
   *
   * Visualization as Tree:
   *
   *                        ""
   *               /        |        \
   *              a         b         c       (digit '2')
   *            / | \     / | \     / | \
   *           d  e  f   d  e  f   d  e  f    (digit '3')
   *           ↓  ↓  ↓   ↓  ↓  ↓   ↓  ↓  ↓
   *          ad ae af  bd be bf  cd ce cf    (Complete!)
   *
   * Key Observations:
   * ✓ Each path from root to leaf is one combination
   * ✓ Total paths = 3 × 3 = 9
   * ✓ Depth of tree = number of digits (2)
   * ✓ Each level processes one digit
   * ✓ Branches at each level = letters for that digit
   *
   * ═══════════════════════════════════════════════════════════════════════
   * IMPLICIT BACKTRACKING EXPLANATION
   * ═══════════════════════════════════════════════════════════════════════
   *
   * WHY NO EXPLICIT BACKTRACKING?
   *
   * In array backtracking:
   *   current.push(element)    // Modify array
   *   backtrack(...)           // Recurse
   *   current.pop()            // MUST undo! (explicit backtrack)
   *
   * In string backtracking (THIS PROBLEM):
   *   backtrack(..., current + letter, ...)  // Pass NEW string
   *   // No need to undo! 'current' never changed!
   *
   * Example:
   *   current = "a"
   *   letter = 'd'
   *   backtrack(index + 1, current + letter, ...)
   *   // We pass "ad" (new string)
   *   // 'current' is still "a" after call returns!
   *
   *   Next iteration:
   *   letter = 'e'
   *   backtrack(index + 1, current + letter, ...)
   *   // We pass "ae" (another new string)
   *   // 'current' is still "a"!
   *
   * This is called IMPLICIT BACKTRACKING because:
   * - We don't modify the original 'current'
   * - We create new strings for each recursive call
   * - After return, 'current' is unchanged automatically
   *
   * ═══════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Case 1: Empty string
   *   Input: ""
   *   Output: []
   *   Why: Edge case handled at start
   *
   * Case 2: Single digit
   *   Input: "2"
   *   Output: ["a", "b", "c"]
   *   Why: Just the letters of '2'
   *
   * Case 3: Digit with 4 letters
   *   Input: "7"
   *   Output: ["p", "q", "r", "s"]
   *   Why: '7' maps to "pqrs" (4 letters)
   *
   * Case 4: Multiple same digits
   *   Input: "22"
   *   Output: ["aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"]
   *   Why: 3 × 3 = 9 combinations
   *
   * Case 5: Worst case (4 letters each)
   *   Input: "79"
   *   Output: 16 combinations
   *   Why: 4 × 4 = 16 (pqrs × wxyz)
   */

  /**
   * Test runner with comprehensive test cases
   */
  export function runTests(): void {
    console.log("🧪 Testing Letter Combinations - Backtracking\n");

    // Test Case 1: Basic example from problem
    console.log("Test 1: Basic example '23'");
    const test1 = letterCombinations("23");
    console.log("Input: '23'");
    console.log("Output:", test1);
    console.log(
      "Expected: ['ad','ae','af','bd','be','bf','cd','ce','cf']"
    );
    console.log("Result:", test1.length === 9 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 2: Empty string
    console.log("Test 2: Empty string ''");
    const test2 = letterCombinations("");
    console.log("Input: ''");
    console.log("Output:", test2);
    console.log("Expected: []");
    console.log("Result:", test2.length === 0 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 3: Single digit
    console.log("Test 3: Single digit '2'");
    const test3 = letterCombinations("2");
    console.log("Input: '2'");
    console.log("Output:", test3);
    console.log("Expected: ['a','b','c']");
    console.log(
      "Result:",
      test3.length === 3 &&
        test3.includes("a") &&
        test3.includes("b") &&
        test3.includes("c")
        ? "✅ PASS"
        : "❌ FAIL"
    );
    console.log();

    // Test Case 4: Digit with 4 letters
    console.log("Test 4: Digit with 4 letters '7'");
    const test4 = letterCombinations("7");
    console.log("Input: '7'");
    console.log("Output:", test4);
    console.log("Expected: ['p','q','r','s']");
    console.log("Result:", test4.length === 4 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 5: Two same digits
    console.log("Test 5: Two same digits '22'");
    const test5 = letterCombinations("22");
    console.log("Input: '22'");
    console.log("Output:", test5);
    console.log("Expected: 9 combinations (3 × 3)");
    console.log(
      "Result:",
      test5.length === 9 && test5.includes("aa") && test5.includes("cc")
        ? "✅ PASS"
        : "❌ FAIL"
    );
    console.log();

    // Test Case 6: Worst case (4 letters each)
    console.log("Test 6: Worst case '79'");
    const test6 = letterCombinations("79");
    console.log("Input: '79'");
    console.log("Output:", test6);
    console.log("Expected: 16 combinations (4 × 4)");
    console.log(
      "Result:",
      test6.length === 16 && test6.includes("pw") && test6.includes("sz")
        ? "✅ PASS"
        : "❌ FAIL"
    );
    console.log();

    // Test Case 7: Three digits
    console.log("Test 7: Three digits '234'");
    const test7 = letterCombinations("234");
    console.log("Input: '234'");
    console.log("Output:", test7);
    console.log("Expected: 27 combinations (3 × 3 × 3)");
    console.log(
      "Result:",
      test7.length === 27 && test7.includes("adg") && test7.includes("cfi")
        ? "✅ PASS"
        : "❌ FAIL"
    );
    console.log();

    // Test Case 8: Four digits (max)
    console.log("Test 8: Four digits '2345'");
    const test8 = letterCombinations("2345");
    console.log("Input: '2345'");
    console.log("Output length:", test8.length);
    console.log("Expected: 81 combinations (3 × 3 × 3 × 3)");
    console.log("Result:", test8.length === 81 ? "✅ PASS" : "❌ FAIL");
    console.log();

    // Test Case 9: Mix of 3 and 4 letter digits
    console.log("Test 9: Mix '27'");
    const test9 = letterCombinations("27");
    console.log("Input: '27'");
    console.log("Output:", test9);
    console.log("Expected: 12 combinations (3 × 4)");
    console.log(
      "Result:",
      test9.length === 12 && test9.includes("ap") && test9.includes("cs")
        ? "✅ PASS"
        : "❌ FAIL"
    );
    console.log();

    // Test Case 10: All 4-letter digits
    console.log("Test 10: All 4-letter digits '99'");
    const test10 = letterCombinations("99");
    console.log("Input: '99'");
    console.log("Output length:", test10.length);
    console.log("Expected: 16 combinations (4 × 4)");
    console.log(
      "Result:",
      test10.length === 16 &&
        test10.includes("ww") &&
        test10.includes("zz")
        ? "✅ PASS"
        : "❌ FAIL"
    );
    console.log();

    console.log("═══════════════════════════════════════════════════════════");
    console.log("✨ All tests completed!");
    console.log("═══════════════════════════════════════════════════════════");
  }
}

// Execute all tests
LetterCombinationsBacktracking.runTests();
