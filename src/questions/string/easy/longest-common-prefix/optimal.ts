// https://www.notion.so/Longest-Common-Prefix-281a2680896880cc9114ff64aa3ecdbe
/**
 * ═══════════════════════════════════════════════════════════════
 * APPROACH 1: SHORTEST STRING APPROACH (Simple Optimal)
 * ═══════════════════════════════════════════════════════════════
 * Purpose: Find longest common prefix by using shortest string as reference
 * Logic: Common prefix kabhi bhi shortest string se bada nahi ho sakta
 * Time Complexity: O(S) where S = sum of all characters
 * Space Complexity: O(1)
 */

function longestCommonPrefixOptimal1(strs: string[]): string {
  // Edge Case: Empty array
  if (strs.length === 0) {
    return '';
  }

  // Edge Case: Single string - wahi pura prefix hai
  if (strs.length === 1) {
    return strs[0];
  }

  // Step 1: Sabse chhoti string dhundho
  // Kyunki common prefix isse bada ho hi nahi sakta
  let shortestString: string = strs[0];
  let minLength: number = strs[0].length;

  for (let i = 1; i < strs.length; i++) {
    if (strs[i].length < minLength) {
      minLength = strs[i].length;
      shortestString = strs[i];
    }
  }

  // Step 2: Ab shortest string ko base bana ke check karte hain
  // Uske har character ko sabhi strings mein verify karenge
  for (let i = 0; i < shortestString.length; i++) {
    // Current character shortest string ka
    const currentChar: string = shortestString[i];

    // Sabhi strings mein same position par same character hai ya nahi?
    for (let j = 0; j < strs.length; j++) {
      // Agar kisi bhi string mein current position par character match nahi karta
      // Ya string ki length hi kam hai (though shortest ke baad ye nahi hona chahiye)
      if (i >= strs[j].length || strs[j][i] !== currentChar) {
        // Toh yahi tak ka prefix return karo (0 se i-1 tak)
        return shortestString.substring(0, i);
      }
    }
  }

  // Agar loop complete ho gaya matlab puri shortest string common hai
  // Toh shortest string hi answer hai
  return shortestString;
}

/**
 * ═══════════════════════════════════════════════════════════════
 * APPROACH 2: BINARY SEARCH APPROACH (TRUE OPTIMAL!)
 * ═══════════════════════════════════════════════════════════════
 * Purpose: Find longest common prefix using binary search on length
 * Logic: Agar length x ka prefix common hai, toh x-1, x-2... bhi common honge (monotonic)
 * Time Complexity: O(S * log m) where S = sum of chars, m = min string length
 * Space Complexity: O(1)
 *
 * Why Binary Search?
 * - Agar length k ka prefix common hai → sab chhote bhi common honge
 * - Agar length k ka prefix common nahi → sab bade bhi common nahi honge
 * - Ye monotonic property hai, perfect for binary search!
 */

function longestCommonPrefixOptimal2(strs: string[]): string {
  // Edge Cases
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];

  // Step 1: Minimum length find karo (binary search ki upper bound)
  // Kyunki common prefix maximum itna hi lamba ho sakta hai
  let minLength: number = Number.MAX_SAFE_INTEGER;
  for (let str of strs) {
    minLength = Math.min(minLength, str.length);
  }

  // Edge case: Agar koi string empty hai
  if (minLength === 0) {
    return '';
  }

  // Step 2: Binary search setup
  // Hum length par binary search kar rahe hain (0 se minLength tak)
  let low: number = 0;
  let high: number = minLength;

  // Step 3: Binary search loop
  // Dhundh rahe hain: Maximum length jiske liye prefix common hai
  while (low <= high) {
    // Mid point - current length jo check karni hai
    const mid: number = Math.floor((low + high) / 2);

    // Helper function call: Is length ka prefix common hai ya nahi?
    if (isCommonPrefix(strs, mid)) {
      // Agar mid length ka prefix common hai,
      // Toh maybe aur lamba bhi common ho sakta hai
      // Right half mein search karo (bada dhundho)
      low = mid + 1;
    } else {
      // Agar mid length ka prefix common nahi hai,
      // Toh isse bada toh bilkul nahi hoga
      // Left half mein search karo (chhota dhundho)
      high = mid - 1;
    }
  }

  // Step 4: Binary search complete
  // 'high' ab wo maximum length hai jiske liye prefix common hai
  // Pehli string ke first 'high' characters return karo
  // (Kyunki wo sabhi strings mein same hain - verified by isCommonPrefix)
  return strs[0].substring(0, high + 1);
}

/**
 * Helper Function: Check karta hai ki given length ka prefix sabhi strings mein same hai ya nahi
 * @param strs - Array of strings
 * @param length - Kitni length tak check karna hai
 * @returns true agar sabhi strings ke first 'length' characters same hain
 */
function isCommonPrefix(strs: string[], length: number): boolean {
  // First string ke first 'length' characters ko reference bana lo
  const prefix: string = strs[0].substring(0, length);

  // Baki sabhi strings check karo
  // Start from index 1 kyunki 0th toh reference hai
  for (let i = 1; i < strs.length; i++) {
    // Check: Kya current string bhi is prefix se start hoti hai?
    // Ya phir: Kya first 'length' characters same hain?
    if (!strs[i].startsWith(prefix)) {
      // Agar ek bhi string match nahi karti, return false
      return false;
    }
  }

  // Agar sabhi strings match kar gayi, return true
  return true;
}

/**
 * ═══════════════════════════════════════════════════════════════
 * BONUS: One-liner using reduce() (Functional Approach)
 * ═══════════════════════════════════════════════════════════════
 * Advanced JavaScript/TypeScript developers ke liye
 * Brute force ka hi logic hai but functional style mein
 */
// function longestCommonPrefixOneLiner(strs: string[]): string {
//   if (strs.length === 0) return '';
//
//   // Reduce function: Sabhi strings ko ek-ek karke process karta hai
//   // acc (accumulator) = current common prefix
//   // str = current string being processed
//   return strs.reduce((acc, str) => {
//     // Jab tak current string accumulator se start nahi hoti,
//     // accumulator ko chhota karte jao
//     while (!str.startsWith(acc)) {
//       acc = acc.slice(0, -1); // Last character remove karo
//     }
//     return acc; // Updated prefix return karo
//   });
// }