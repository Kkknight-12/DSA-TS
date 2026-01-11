/**
 * MANACHER'S ALGORITHM - Longest Palindromic Substring
 *
 * Purpose: Find the longest palindromic substring in LINEAR TIME O(n)
 *
 * Key Innovation:
 * - Reuses information from previously computed palindromes
 * - Uses mirror property of palindromes to avoid redundant expansions
 * - Transforms string to handle odd/even cases uniformly
 *
 * Algorithm Overview:
 * 1. Transform string by inserting '#' characters
 * 2. Build P array (palindrome radius at each position)
 * 3. Use mirror property to minimize expansions
 * 4. Track rightmost palindrome boundary
 * 5. Extract result from P array
 *
 * Time Complexity: O(n) - Linear! Each character processed at most twice
 * Space Complexity: O(n) - For transformed string and P array
 *
 * @param s - Input string
 * @returns Longest palindromic substring
 */
function longestPalindromeManacher(s: string): string {
  /**
   * EDGE CASE: Empty or single character
   *
   * Early return for trivial cases
   * - Empty string → empty result
   * - Single char → that char is the palindrome
   */
  if (s.length < 2) {
    return s;
  }

  /**
   * STEP 1: STRING TRANSFORMATION
   * ═══════════════════════════════════════════════════════════
   *
   * Transform original string by adding '#' characters
   *
   * Why transform?
   * 1. Unifies odd and even length palindromes
   * 2. All palindromes become odd length in transformed string
   * 3. Simplifies the algorithm logic
   *
   * Example transformations:
   * - "aba" → "#a#b#a#" (odd stays odd, but with markers)
   * - "abba" → "#a#b#b#a#" (even becomes odd)
   *
   * Implementation:
   * - Start with '#'
   * - Add each character followed by '#'
   * - Result length = 2 * original.length + 1
   */
  const transformedString = transformString(s);
  const n = transformedString.length;

  /**
   * STEP 2: INITIALIZE DATA STRUCTURES
   * ═══════════════════════════════════════════════════════════
   *
   * P[i]: Palindrome radius at position i in transformed string
   *       This tells us how far the palindrome extends from center i
   *
   * Example: "#a#b#a#"
   *          0123456
   * P[3] = 3 means palindrome extends 3 positions each side from center
   *
   * C: Center of the rightmost palindrome found so far
   *    Important for mirror property calculations
   *
   * R: Right boundary of the rightmost palindrome
   *    If current position < R, we can use mirror property
   *
   * maxLen: Length of longest palindrome found (in original string terms)
   * centerIndex: Center position of longest palindrome (in transformed string)
   */
  const P: number[] = new Array(n).fill(0); // Palindrome radius array
  let C = 0; // Center of rightmost palindrome
  let R = 0; // Right boundary of rightmost palindrome

  let maxLen = 0; // Maximum palindrome length found
  let centerIndex = 0; // Center of maximum palindrome

  /**
   * STEP 3: MAIN ALGORITHM - BUILD P ARRAY
   * ═══════════════════════════════════════════════════════════
   *
   * Process each position as a potential palindrome center
   *
   * Key Optimization: Use mirror property when possible
   * - If position is within rightmost palindrome boundary,
   *   we can use information from the mirror position
   * - This avoids redundant character comparisons
   *
   * Why start from i=1 and end at n-1?
   * - i=0 and i=n-1 are boundary '#' characters
   * - They can't expand, so we can skip or handle separately
   * - Starting from 1 simplifies logic
   */
  for (let i = 1; i < n - 1; i++) {
    /**
     * MIRROR PROPERTY APPLICATION
     * ─────────────────────────────────────────────────────
     *
     * If current position i is within right boundary R,
     * we can use the mirror position's information
     *
     * Mirror position: i' = 2*C - i
     *                     = C - (i - C)
     *                     = reflected position across center C
     *
     * Visual:
     *     L       C       R
     *     ↓       ↓       ↓
     * ...#a#b#c#b#a#...
     *      ↑ ↑   ↑ ↑
     *     i' i   ? ?
     *
     * P[i] can be at least min(P[i'], R-i)
     *
     * Why min(P[i'], R-i)?
     * 1. P[i'] tells us mirror's palindrome radius
     * 2. R-i tells us how much space until boundary
     * 3. We can only guarantee the smaller of these
     */
    if (i < R) {
      const mirror = 2 * C - i; // Mirror position of i with respect to C

      /**
       * Calculate initial P[i] using mirror
       *
       * Case Analysis:
       *
       * Case 1: P[mirror] < R - i
       *   Mirror's palindrome is completely inside L-R boundary
       *   So P[i] = P[mirror] (exact copy!)
       *   No need to expand at all! 🎯
       *
       * Case 2: P[mirror] >= R - i
       *   Mirror's palindrome extends to or beyond L
       *   We can only guarantee up to boundary: P[i] = R - i
       *   But might be able to expand beyond R!
       *
       * min() handles both cases elegantly
       */
      P[i] = Math.min(R - i, P[mirror]);
    }
    // Else: i >= R, start fresh with P[i] = 0 (already initialized)

    /**
     * EXPANSION PHASE
     * ─────────────────────────────────────────────────────
     *
     * Try to expand palindrome around center i
     *
     * Starting point:
     * - If we used mirror property: Start from P[i] (already computed part)
     * - If fresh start: Start from 0
     *
     * Expansion logic:
     * - Check characters at distance (P[i] + 1) from center
     * - Left: i - P[i] - 1
     * - Right: i + P[i] + 1
     * - If they match, increment P[i] and continue
     * - If mismatch or out of bounds, stop
     *
     * Why this works efficiently:
     * - Each character is compared at most twice across all iterations
     * - Once when first encountered as right boundary
     * - Once when encountered as left boundary
     * - This gives us O(n) total complexity! 🚀
     */
    while (
      i - P[i] - 1 >= 0 && // Left boundary check
      i + P[i] + 1 < n && // Right boundary check
      transformedString[i - P[i] - 1] === transformedString[i + P[i] + 1] // Character match
    ) {
      P[i]++; // Expand radius
    }

    /**
     * UPDATE RIGHTMOST BOUNDARY
     * ─────────────────────────────────────────────────────
     *
     * If current palindrome extends beyond R,
     * update C and R to this palindrome
     *
     * Why update?
     * - Future positions will use this as reference
     * - We always want the rightmost palindrome for mirror property
     *
     * New boundary calculation:
     * - Center: C = i
     * - Right: R = i + P[i]
     *          (center plus radius gives right boundary)
     */
    if (i + P[i] > R) {
      C = i;
      R = i + P[i];
    }

    /**
     * TRACK MAXIMUM PALINDROME
     * ─────────────────────────────────────────────────────
     *
     * If current palindrome is longest found so far, update
     *
     * Note: P[i] in transformed string equals actual length
     * in original string due to how '#' characters work out
     *
     * Example:
     * "#a#b#a#" with P[3] = 3
     * Actual palindrome: positions 0-6 in transformed = "aba" in original
     * Length in original = P[3] = 3 ✓
     */
    if (P[i] > maxLen) {
      maxLen = P[i];
      centerIndex = i;
    }
  }

  /**
   * STEP 4: EXTRACT RESULT FROM ORIGINAL STRING
   * ═══════════════════════════════════════════════════════════
   *
   * Convert transformed string indices back to original string
   *
   * Formula derivation:
   * - In transformed string: center at centerIndex, radius maxLen
   * - Start in transformed: centerIndex - maxLen
   * - Each original char maps to 2 positions in transformed (#char#)
   * - So original start = (centerIndex - maxLen) / 2
   *
   * Example:
   * Original: "aba" (indices 0,1,2)
   * Transformed: "#a#b#a#" (indices 0,1,2,3,4,5,6)
   * Mapping: orig[0]→trans[1], orig[1]→trans[3], orig[2]→trans[5]
   *
   * If centerIndex=3, maxLen=3:
   * - Transformed range: [0, 6]
   * - Original start: (3-3)/2 = 0 ✓
   * - Original length: 3 ✓
   */
  const start = Math.floor((centerIndex - maxLen) / 2);

  return s.substring(start, start + maxLen);
}

/**
 * HELPER FUNCTION: Transform String
 * ═══════════════════════════════════════════════════════════
 *
 * Purpose: Insert '#' characters to make all palindromes odd length
 *
 * Transformation:
 * - Add '#' at the beginning
 * - Add '#' after each character
 * - Result: all palindromes have odd length in transformed string
 *
 * Example:
 * "abc" → "#a#b#c#"
 * "abba" → "#a#b#b#a#"
 *
 * @param s - Original string
 * @returns Transformed string with '#' delimiters
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the new string
 */
function transformString(s: string): string {
  /**
   * BUILD TRANSFORMED STRING
   *
   * Approach: Use array for efficient concatenation
   * - Arrays are mutable and efficient for building strings
   * - Join at the end to create final string
   *
   * Alternative: Use string concatenation, but slower in JavaScript
   */
  const transformed: string[] = [];

  // Start with delimiter
  transformed.push('#');

  // Add each character followed by delimiter
  for (let i = 0; i < s.length; i++) {
    transformed.push(s[i]);
    transformed.push('#');
  }

  /**
   * Result structure:
   * Original: a b c
   * Result:   # a # b # c #
   * Indices:  0 1 2 3 4 5 6
   *
   * Properties:
   * - Length = 2n + 1
   * - Odd positions: original characters
   * - Even positions: '#' delimiters
   * - All palindromes now have odd length
   */
  return transformed.join('');
}

// ════════════════════════════════════════════════════════════
//                    TEST CASES
// ════════════════════════════════════════════════════════════

console.log('╔════════════════════════════════════════════════╗');
console.log("║     MANACHER'S ALGORITHM - TEST CASES          ║");
console.log('╚════════════════════════════════════════════════╝\n');

// Test 1: Odd length palindrome
console.log("Test 1: 'babad'");
console.log('Output:', longestPalindromeManacher('babad'));
console.log("Expected: 'bab' or 'aba'");
console.log('Transform:', transformString('babad'));
console.log('');

// Test 2: Even length palindrome
console.log("Test 2: 'cbbd'");
console.log('Output:', longestPalindromeManacher('cbbd'));
console.log("Expected: 'bb'");
console.log('Transform:', transformString('cbbd'));
console.log('');

// Test 3: Single character
console.log("Test 3: 'a'");
console.log('Output:', longestPalindromeManacher('a'));
console.log("Expected: 'a'\n");

// Test 4: All same
console.log("Test 4: 'aaaa'");
console.log('Output:', longestPalindromeManacher('aaaa'));
console.log("Expected: 'aaaa'");
console.log('Transform:', transformString('aaaa'));
console.log('');

// Test 5: Full palindrome
console.log("Test 5: 'racecar'");
console.log('Output:', longestPalindromeManacher('racecar'));
console.log("Expected: 'racecar'");
console.log('Transform:', transformString('racecar'));
console.log('');

// Test 6: No palindrome > 1
console.log("Test 6: 'abcdef'");
console.log('Output:', longestPalindromeManacher('abcdef'));
console.log("Expected: 'a' (any single char)\n");

console.log('╚════════════════════════════════════════════════╝');