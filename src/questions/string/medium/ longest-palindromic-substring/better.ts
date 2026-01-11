/**
 * EXPAND AROUND CENTER APPROACH - Longest Palindromic Substring
 *
 * Purpose: Find the longest palindromic substring efficiently by treating
 *          each position as a potential center and expanding outward
 *
 * Key Insight:
 * - Instead of generating all substrings, we expand from each center
 * - Palindromes are symmetric around their center
 * - We check both odd and even length palindromes
 *
 * Algorithm:
 * 1. Iterate through each index as a potential center
 * 2. For each center, expand in both directions (odd & even cases)
 * 3. Stop expanding when characters don't match or boundaries reached
 * 4. Track the longest palindrome found
 *
 * Time Complexity: O(n²) - Much better than brute force
 * Space Complexity: O(1) - Only using variables
 *
 * @param s - Input string
 * @returns Longest palindromic substring
 */
function longestPalindromeExpandCenter(s: string): string {
  /**
   * EDGE CASE HANDLING:
   * Agar string empty hai ya sirf 1 character hai,
   * toh directly return kar do kyunki:
   * - Empty string → empty return
   * - Single char → always palindrome
   */
  if (s.length < 2) {
    return s;
  }

  /**
   * TRACKING VARIABLES:
   * In variables mein sabse lamba palindrome track karenge
   *
   * startIndex: Longest palindrome ka starting position
   * maxLength: Longest palindrome ki length
   *
   * WHY separate start and length?
   * Kyunki end mein substring(start, start+length) se result nikalna hai
   */
  let startIndex: number = 0;
  let maxLength: number = 1; // Minimum 1 (single character)

  /**
   * MAIN LOOP:
   * Har index ko potential center maan kar expand karenge
   *
   * WHY loop 0 to n-1?
   * Har position palindrome ka center ho sakta hai
   *
   * i represents: Current position ko center maan rahe hain
   */
  for (let i = 0; i < s.length; i++) {
    /**
     * CASE 1: ODD LENGTH PALINDROME
     * ────────────────────────────────────────────────────
     * Center: Single character at position i
     *
     * Example: "aba"
     *           ↑ (center at index 1)
     *
     * expandAroundCenter(i, i) means:
     * - Start with s[i] as center
     * - Expand left and right from there
     *
     * Returns: Length of longest odd-length palindrome from center i
     */
    const oddLength: number = expandAroundCenter(s, i, i);

    /**
     * CASE 2: EVEN LENGTH PALINDROME
     * ────────────────────────────────────────────────────
     * Center: Two adjacent characters at positions i and i+1
     *
     * Example: "abba"
     *           ↑↑ (center at index 1,2)
     *
     * expandAroundCenter(i, i+1) means:
     * - Start with s[i] and s[i+1] as center
     * - Expand left and right from there
     *
     * WHY i+1?
     * Kyunki even length mein 2 characters center banate hain
     *
     * Returns: Length of longest even-length palindrome from center (i, i+1)
     */
    const evenLength: number = expandAroundCenter(s, i, i + 1);

    /**
     * FIND MAXIMUM:
     * Dono lengths mein se jo bada ho, use consider karo
     *
     * Example:
     * At index 1 in "babad":
     *   oddLength = 3 ("bab")
     *   evenLength = 0 ("ab" not palindrome)
     *   currentMax = Math.max(3, 0) = 3
     */
    const currentMaxLength: number = Math.max(oddLength, evenLength);

    /**
     * UPDATE TRACKING VARIABLES:
     * Agar current palindrome sabse bada hai, toh update karo
     *
     * WHY this condition?
     * Sirf update karo jab better result mile
     */
    if (currentMaxLength > maxLength) {
      maxLength = currentMaxLength;

      /**
       * CALCULATE START INDEX:
       * ────────────────────────────────────────────────────
       * Ye part thoda tricky hai! Dhyan se samjho:
       *
       * Formula: startIndex = i - Math.floor((maxLength - 1) / 2)
       *
       * WHY this formula?
       *
       * Case 1 - ODD length palindrome "bab" (length 3):
       *   Center at i=1
       *   Start = 1 - Math.floor((3-1)/2) = 1 - 1 = 0 ✓
       *
       * Case 2 - EVEN length palindrome "abba" (length 4):
       *   Center at i=1 (left of two centers)
       *   Start = 1 - Math.floor((4-1)/2) = 1 - 1 = 0 ✓
       *
       * General logic:
       * - Palindrome center se equally expand hota hai
       * - Toh center se (length-1)/2 steps back jao
       * - Floor isliye ki even length mein decimal avoid kare
       */
      startIndex = i - Math.floor((maxLength - 1) / 2);

      // Optional debug log (production mein remove karna)
      // console.log(`Found at center ${i}: length=${maxLength}, start=${startIndex}`);
    }
  }

  /**
   * EXTRACT AND RETURN RESULT:
   * ────────────────────────────────────────────────────
   * substring(start, end) method use karke result nikalo
   *
   * Parameters:
   * - start: startIndex (inclusive)
   * - end: startIndex + maxLength (exclusive)
   *
   * Example:
   * s = "babad", startIndex = 0, maxLength = 3
   * s.substring(0, 3) = "bab" ✓
   */
  return s.substring(startIndex, startIndex + maxLength);
}

/**
 * HELPER FUNCTION: Expand Around Center
 * ────────────────────────────────────────────────────
 * Purpose: Given a center (left, right), expand outward as long as
 *          characters match and form a palindrome
 *
 * @param s - Original string
 * @param left - Left boundary of center
 * @param right - Right boundary of center
 * @returns Length of the palindrome found
 *
 * Time Complexity: O(n) in worst case (when entire string is palindrome)
 * Space Complexity: O(1)
 *
 * How it works:
 * 1. Start with given center (left, right)
 * 2. Check if characters at left and right match
 * 3. If yes, expand: left--, right++
 * 4. If no, stop and return length
 * 5. Also stop if boundaries exceeded
 */
function expandAroundCenter(s: string, left: number, right: number): number {
  /**
   * EXPANSION LOOP:
   * ────────────────────────────────────────────────────
   * Continue jab tak:
   * 1. left >= 0 (left boundary ke andar)
   * 2. right < s.length (right boundary ke andar)
   * 3. s[left] === s[right] (characters match ho rahe hain)
   *
   * WHY all three conditions together with AND (&&)?
   * Kyunki teen mein se koi ek bhi fail ho toh expansion stop honi chahiye
   *
   * Visual example expanding "aba":
   *
   * Step 0: left=1, right=1
   *         b [a] b
   *            ↑
   *         s[1] = 'a' → Valid center
   *
   * Step 1: left=0, right=2
   *        [b] a [b]
   *         ↑     ↑
   *         s[0]='b' === s[2]='b' ✓ Continue!
   *
   * Step 2: left=-1, right=3
   *         OUT OF BOUNDS → STOP!
   */
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    /**
     * EXPAND:
     * Characters match kar rahe hain aur boundaries ke andar hain
     * Toh aage expand karo
     *
     * left--: Move left pointer leftward
     * right++: Move right pointer rightward
     */
    left--;
    right--;
  }

  /**
   * CALCULATE LENGTH:
   * ────────────────────────────────────────────────────
   * Loop exit ke baad left aur right pointers kahan honge?
   *
   * Example: Palindrome "bab" found
   *
   * During loop:
   *   b a b
   *   ↑   ↑
   *   0   2  → Characters match, expand
   *
   * After loop (stopped):
   *  ? b a b ?
   *    ↑   ↑
   *   -1   3  → Out of bounds or mismatch
   *
   * Actual palindrome: indices 0 to 2
   *
   * Length = right - left - 1
   *        = 3 - (-1) - 1
   *        = 3 ✓
   *
   * WHY -1?
   * Kyunki loop mein last expansion ke baad:
   * - left ek extra peeche chala gaya
   * - right ek extra aage chala gaya
   * Toh actual length = right - left - 1
   *
   * Alternative thinking:
   * Valid range: [left+1, right-1]
   * Length = (right-1) - (left+1) + 1 = right - left - 1
   */
  return right - left - 1;
}

// ============================================
// USAGE EXAMPLES & TEST CASES
// ============================================

console.log('═══════════════════════════════════════════════');
console.log('       EXPAND AROUND CENTER - TEST CASES        ');
console.log('═══════════════════════════════════════════════\n');

// Test Case 1: Odd length palindrome
console.log("Test 1: Input = 'babad'");
console.log('Output:', longestPalindromeExpandCenter('babad'));
console.log("Expected: 'bab' or 'aba'\n");

// Test Case 2: Even length palindrome
console.log("Test 2: Input = 'cbbd'");
console.log('Output:', longestPalindromeExpandCenter('cbbd'));
console.log("Expected: 'bb'\n");

// Test Case 3: Single character
console.log("Test 3: Input = 'a'");
console.log('Output:', longestPalindromeExpandCenter('a'));
console.log("Expected: 'a'\n");

// Test Case 4: All same characters
console.log("Test 4: Input = 'aaaa'");
console.log('Output:', longestPalindromeExpandCenter('aaaa'));
console.log("Expected: 'aaaa'\n");

// Test Case 5: No palindrome > 1
console.log("Test 5: Input = 'abcde'");
console.log('Output:', longestPalindromeExpandCenter('abcde'));
console.log("Expected: 'a' (any single char)\n");

// Test Case 6: Entire string is palindrome
console.log("Test 6: Input = 'racecar'");
console.log('Output:', longestPalindromeExpandCenter('racecar'));
console.log("Expected: 'racecar'\n");

// Test Case 7: Multiple palindromes
console.log("Test 7: Input = 'bananas'");
console.log('Output:', longestPalindromeExpandCenter('bananas'));
console.log("Expected: 'anana'\n");

console.log('═══════════════════════════════════════════════');