// https://www.notion.so/Reverse-Words-in-a-String-281a268089688029b9b2c3ceffa86f34

/**
 * PURPOSE: Reverse words using two-pointer technique
 *
 * APPROACH: Manual Parsing (Better Approach)
 * - Traverse string from right to left
 * - Extract words as we encounter them
 * - Build result array with words in reversed order
 * - No need for split/filter, more control over parsing
 *
 * ADVANTAGES over Brute Force:
 * - Single pass through string
 * - More control over space handling
 * - Better for understanding string manipulation
 * - Interview mein coding skills show karta hai
 *
 * TIME COMPLEXITY: O(n) - single pass
 * SPACE COMPLEXITY: O(n) - for result array
 */

function reverseWords_better_sol(s: string): string {
  /**
   * INITIALIZATION
   *
   * result: Words ko reverse order mein store karenge
   * i: Current position pointer (right to left movement)
   * n: String length for boundary check
   */
  const result: string[] = [];
  let i: number = s.length - 1;

  /**
   * MAIN LOOP: String ko right to left traverse karo
   *
   * WHY right to left?
   * Kyunki hume words reverse order mein chahiye.
   * Last word pehle milega, automatically reverse ho jayega!
   *
   * Loop tab tak chale jab tak string ke start pe na pahunch jaye
   */
  while (i >= 0) {
    //                                          16
    //                                          ↓
    // [ '', '', 'hello', '', '', 'world', '', '' ]
    /**
     * STEP 1: Skip spaces
     *
     * WHY? Leading, trailing, aur multiple spaces handle karne ke liye
     *
     * Jab tak space character mil raha hai, pointer left move karo
     * s.charAt(i) current character return karta hai
     *
     * Example: "  hello" mein i=7 se start karke i=2 pe aayega
     */
    while (i >= 0 && s.charAt(i) === ' ') {
      i--; // Ek position left move karo
    }

    /**
     * BOUNDARY CHECK
     *
     * Agar i negative ho gaya, matlab string khatam ho gayi
     * Ya sirf spaces the
     *
     * Example: "   " (only spaces) - yaha loop break ho jayega
     */
    if (i < 0) {
      break; // Loop se bahar aa jao
    }

    /**
     * STEP 2: Word ka END point mark karo
     *
     * WHY? Abhi jo position pe hain, waha word ka last character hai
     * Is position ko save kar lo
     *
     * Example: "hello world"
     *                    ↑
     *                  i=10 (d ka position)
     *                  end = 10
     */
    let end: number = i;

    //                                14
    //                                 ↓
    // [ '', '', 'hello', '', '', 'world', '', '' ]
    /**
     * STEP 3: Word ka START point dhundo
     *
     * WHY? Pura word extract karne ke liye start position chahiye
     *
     * Peeche jao (left move karo) jab tak:
     * - Space na mile
     * - String start na ho jaye
     *
     * Example: "hello world"
     *           ↑     ↑
     *         start  end
     *          i=6   saved=10
     */
    while (i >= 0 && s.charAt(i) !== ' ') {
      i--; // Ek position left move karo
    }

    //                         9
    //                         ↓
    // [ '', '', 'hello', '', '', 'world', '', '' ]
    /**
     * STEP 4: Word extract karo
     *
     * Current state:
     * - i: space character pe hai (ya -1 if string start)
     * - end: word ke last character pe tha
     *
     * Word extract karne ke liye:
     * - start = i + 1 (space ke baad wala character)
     * - end = end + 1 (substring mein end exclusive hai)
     *
     * substring(start, end): start se end-1 tak characters return karta hai
     *
     * Example: s = "hello world"
     *          i = 5 (space before world)
     *          end = 10 (last char of world)
     *          word = s.substring(6, 11) = "world"
     */
    const word: string = s.substring(i + 1, end + 1);

    /**
     * STEP 5: Word ko result mein add karo
     *
     * WHY? Hum right se left ja rahe hain, toh words automatically
     * reverse order mein add ho rahe hain
     *
     * Example: First "world" add hoga, phir "hello"
     * Result: ["world", "hello"]
     */
    result.push(word);

    /**
     * NOTE: Loop continue karega
     * - i already next space pe ya usse pehle hai
     * - Next iteration mein spaces skip honge
     * - Phir next word process hoga
     */
  }

  /**
   * FINAL STEP: Words ko single space se join karo
   *
   * WHY? Result array mein sab words hain reverse order mein
   * Ab unhe single space se connect karna hai
   *
   * join(' '): Array elements ko space se jodta hai
   *
   * Example: ["world", "hello"] → "world hello"
   */
  return result.join(' ');
}

// =================== ALTERNATIVE VERSION (More Readable) ===================
/**
 * Same logic but with more descriptive variable names
 * Interview mein agar time ho toh ye style better hai
 */
function reverseWordsReadable(s: string): string {
  const words: string[] = [];
  let currentIndex: number = s.length - 1;

  while (currentIndex >= 0) {
    // Skip all spaces
    while (currentIndex >= 0 && s[currentIndex] === ' ') {
      currentIndex--;
    }

    // If we've reached the beginning, break
    if (currentIndex < 0) break;

    // Find the end of the word
    let wordEnd: number = currentIndex;

    // Find the start of the word
    while (currentIndex >= 0 && s[currentIndex] !== ' ') {
      currentIndex--;
    }

    // Extract the word (currentIndex + 1 to wordEnd + 1)
    let wordStart: number = currentIndex + 1;
    let word: string = s.substring(wordStart, wordEnd + 1);

    // Add word to result
    words.push(word);
  }

  return words.join(' ');
}

// =================== COMPACT VERSION ===================
/**
 * Interview mein agar time kam ho aur aap confident ho
 */
function reverseWordsCompact(s: string): string {
  const result: string[] = [];
  let i = s.length - 1;

  while (i >= 0) {
    while (i >= 0 && s[i] === ' ') i--;
    if (i < 0) break;

    let end = i;
    while (i >= 0 && s[i] !== ' ') i--;

    result.push(s.substring(i + 1, end + 1));
  }

  return result.join(' ');
}