/**
 * ═══════════════════════════════════════════════════════════════════
 * THEORETICAL IN-PLACE SOLUTION
 * ═══════════════════════════════════════════════════════════════════
 *
 * PURPOSE: Reverse words using O(1) extra space
 *
 * IMPORTANT NOTE:
 * JavaScript/TypeScript mein strings IMMUTABLE hain, matlab:
 * - String characters ko directly change nahi kar sakte
 * - Har operation nayi string banata hai
 *
 * Ye solution theoretical hai - languages like C++, Java (char array)
 * mein kaam karta hai jaha strings mutable hote hain.
 *
 * APPROACH:
 * 1. Clean extra spaces → single space between words
 * 2. Reverse entire string → words ulte order mein but ulte text
 * 3. Reverse each word individually → text readable but order reversed
 *
 * TIME: O(n)
 * SPACE: O(1) in mutable languages, O(n) in JavaScript
 */

function reverseWordsInPlace(s: string): string {
  /**
   * STEP 0: Pre-processing - Clean spaces
   *
   * WHY? Extra spaces remove karni hain
   * Trim() leading/trailing spaces remove karta hai
   * Split by space and filter empty strings
   * Join with single space
   *
   * NOTE: Ye step O(n) space use karta hai JS mein
   * Lekin concept samajhne ke liye zaroori hai
   */
  let cleaned: string = s.trim().split(/\s+/).join(' ');

  // Convert to array (kyunki JS mein strings immutable hain)
  // Mutable languages mein ye step nahi chahiye
  let chars: string[] = cleaned.split('');
  let n: number = chars.length;

  /**
   * ═══════════════════════════════════════════════════════════════
   * PHASE 1: REVERSE ENTIRE STRING
   * ═══════════════════════════════════════════════════════════════
   *
   * LOGIC: Two-pointer technique
   * - Left pointer: 0 (start)
   * - Right pointer: n-1 (end)
   * - Swap characters at both pointers
   * - Move pointers toward center
   * - Stop jab pointers cross kar jaye
   *
   * EXAMPLE:
   * "hello world" → "dlrow olleh"
   *  ↑         ↑     ↑         ↑
   * left     right  left     right
   */
  reverseRange(chars, 0, n - 1);

  /**
   * ═══════════════════════════════════════════════════════════════
   * PHASE 2: REVERSE EACH WORD INDIVIDUALLY
   * ═══════════════════════════════════════════════════════════════
   *
   * LOGIC:
   * - String ko traverse karo left to right
   * - Har word ka start aur end find karo
   * - Us word ke characters ko reverse karo
   *
   * EXAMPLE:
   * "dlrow olleh" → "world hello"
   *  └───┘ └───┘     └───┘ └───┘
   *  reverse each    readable!
   */
  let start: number = 0;

  for (let end = 0; end <= n; end++) {
    /**
     * Word ka end detect karo:
     * - Space mil gaya, ya
     * - String khatam ho gayi
     *
     * WHY end <= n? Kyunki last word ke baad space nahi hota
     */
    if (end === n || chars[end] === ' ') {
      /**
       * Word boundaries mil gaye:
       * - start: word ka pehla character
       * - end - 1: word ka last character (space se pehle)
       *
       * Ab is word ko reverse karo
       */
      reverseRange(chars, start, end - 1);

      /**
       * Next word ke liye prepare karo
       * - start ko space ke baad wale character pe set karo
       */
      start = end + 1;
    }
  }

  /**
   * FINAL STEP: Array ko wapas string mein convert karo
   * Join with empty string (no separator)
   */
  return chars.join('');
}

/**
 * ═══════════════════════════════════════════════════════════════════
 * HELPER FUNCTION: Reverse characters in a range
 * ═══════════════════════════════════════════════════════════════════
 *
 * PURPOSE: Given start aur end indices, un ke beech ke characters
 *          ko reverse kar do
 *
 * TECHNIQUE: Two-pointer swap
 *
 * @param chars - Character array (mutable)
 * @param left - Start index (inclusive)
 * @param right - End index (inclusive)
 *
 * EXAMPLE:
 * Input:  ['h','e','l','l','o'], left=0, right=4
 * Output: ['o','l','l','e','h']
 *
 * PROCESS:
 * Step 1: Swap chars[0] ↔ chars[4] → ['o','e','l','l','h']
 * Step 2: Swap chars[1] ↔ chars[3] → ['o','l','l','e','h']
 * Step 3: left >= right, stop
 */
function reverseRange(chars: string[], left: number, right: number): void {
  /**
   * Two-pointer approach:
   * - Left se start karo
   * - Right se start karo
   * - Jab tak left < right:
   *   1. Swap karo
   *   2. Pointers ko center ki taraf move karo
   */
  while (left < right) {
    /**
     * Swap characters using destructuring
     * JavaScript ka elegant way
     *
     * Traditional way:
     * let temp = chars[left];
     * chars[left] = chars[right];
     * chars[right] = temp;
     */
    [chars[left], chars[right]] = [chars[right], chars[left]];

    /**
     * Move pointers toward center
     * Left aage badho, Right peeche aao
     */
    left++;
    right--;
  }

  /**
   * Loop khatam:
   * - left >= right (pointers cross kar gaye)
   * - Range reverse ho gayi
   */
}

const __a = ' example      good a . ';
let cleaned = __a.trim().split(/\s+/);

console.log('cleaned ', cleaned);