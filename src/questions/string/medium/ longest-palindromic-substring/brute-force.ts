// https://www.notion.so/Longest-Palindromic-Substring-28ba2680896880808e82c212034ac055

/**
 * BRUTE FORCE APPROACH - Longest Palindromic Substring
 *
 * Purpose: Find the longest substring that reads same forwards and backwards
 *
 * Algorithm:
 * 1. Generate all possible substrings using two nested loops
 * 2. Check each substring if it's a palindrome using helper function
 * 3. Track the longest palindrome found so far
 * 4. Return the result
 *
 * Time Complexity: O(n³) - Very slow for large inputs
 * Space Complexity: O(1) - Only using variables, no extra data structures
 */

function longestPalindromeBruteForce(s: string): string {
  // Edge case: Agar string khali hai ya single character hai
  // Toh directly return kar do, kyunki single char hamesha palindrome hai
  if (s.length <= 1) {
    return s;
  }

  // Variables to track the longest palindrome found
  let maxLength: number = 1; // Minimum length 1 ho sakti hai (single char)
  let startIndex: number = 0; // Starting position of longest palindrome

  const n: number = s.length; // String ki total length

  /**
   * OUTER LOOP: Starting index of substring
   * Har possible starting position se check karenge
   * i represents: Substring kahan se shuru hoga
   */
  for (let i = 0; i < n; i++) {
    /**
     * INNER LOOP: Ending index of substring
     * Current starting position se lekar end tak har substring check karenge
     * j represents: Substring kahan tak jayega
     *
     * WHY j = i?
     * Kyunki substring khud se hi start ho sakta hai (single character)
     */
    for (let j = i; j < n; j++) {
      /**
       * Current substring ki length calculate karo
       * Example: i=0, j=2 means "bab" → length = 2-0+1 = 3
       */
      const currentLength: number = j - i + 1;

      /**
       * OPTIMIZATION CHECK:
       * Agar current length already maxLength se chhoti ya equal hai,
       * aur humne pehle se ek palindrome dhundh liya hai,
       * toh palindrome check karne ki zarurat nahi
       *
       * WHY? Time bachane ke liye - agar better result mil hi nahi sakta
       */
      if (currentLength <= maxLength && maxLength > 1) {
        continue; // Skip this iteration
      }

      /**
       * CHECK: Current substring palindrome hai ya nahi?
       * Helper function call karenge jo two-pointer technique use karta hai
       */
      if (isPalindrome(s, i, j)) {
        /**
         * PALINDROME MILA!
         * Ab check karo: Ye current max se bada hai ya nahi?
         */
        if (currentLength > maxLength) {
          maxLength = currentLength; // Update maximum length
          startIndex = i; // Update starting position

          // Debug log (optional - production mein remove karna)
          // console.log(`Found palindrome: "${s.substring(i, j + 1)}" at [${i}, ${j}]`);
        }
      }
    }
  }

  /**
   * FINAL RESULT:
   * Starting index se length ke according substring extract karo
   * Example: startIndex=0, maxLength=3 → s.substring(0, 3) = "bab"
   */
  return s.substring(startIndex, startIndex + maxLength);
}

/**
 * HELPER FUNCTION: Check if substring is palindrome
 *
 * Purpose: Given starting and ending indices, check if that substring
 *          reads same from both directions
 *
 * @param s - Original string
 * @param left - Starting index of substring
 * @param right - Ending index of substring
 * @returns true if palindrome, false otherwise
 *
 * Time Complexity: O(n) - Worst case puri substring traverse karni padegi
 */
function isPalindrome(s: string, left: number, right: number): boolean {
  /**
   * TWO POINTER TECHNIQUE:
   * Left pointer aage badhao, Right pointer peeche lao
   * Jab tak dono meet nahi ho jate, compare karte raho
   *
   * Visual:
   * "babad"
   *  ↑   ↑     left=0, right=4 → 'b' != 'd' → FALSE
   *
   * "aba"
   *  ↑ ↑       left=0, right=2 → 'a' == 'a' ✓
   *   ↑        left=1, right=1 → 'b' == 'b' ✓
   *  left > right → TRUE
   */
  while (left < right) {
    // Agar kisi bhi position par characters match nahi kare
    // Toh ye palindrome nahi hai
    if (s[left] !== s[right]) {
      return false; // Early exit - time bachao!
    }

    // Pointers ko center ki taraf move karo
    left++; // Aage badho
    right--; // Peeche aao
  }

  /**
   * Agar loop successfully complete ho gaya
   * Matlab sab characters match kar gaye
   * Toh ye palindrome hai!
   */
  return true;
}

// ============================================
// USAGE EXAMPLES WITH TEST CASES
// ============================================

// Test Case 1: Odd length palindrome
console.log(longestPalindromeBruteForce('babad')); // Output: "bab" or "aba"

// Test Case 2: Even length palindrome
console.log(longestPalindromeBruteForce('cbbd')); // Output: "bb"

// Test Case 3: Single character
console.log(longestPalindromeBruteForce('a')); // Output: "a"

// Test Case 4: All same characters
console.log(longestPalindromeBruteForce('aaaa')); // Output: "aaaa"

// Test Case 5: No palindrome > 1
console.log(longestPalindromeBruteForce('abcde')); // Output: "a" (or any single char)