/**
 * Roman to Integer - Brute Force Approach
 *
 * Purpose: Convert a Roman numeral string to its integer equivalent
 * by checking two-character special cases first, then single characters
 *
 * Approach: Linear traversal with look-ahead checking
 * - Check if current + next forms a special subtraction case
 * - If yes, add that special value and skip 2 positions
 * - If no, add current character value and skip 1 position
 */

function romanToInt_brute(s: string): number {
  // Step 1: Create a mapping for all Roman symbols to their integer values
  // Ye hashmap har symbol ki value store karta hai
  const romanMap: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Step 2: Create a mapping for special two-character subtraction cases
  // Ye 6 special cases hain jahan subtraction hota hai
  const specialCases: { [key: string]: number } = {
    IV: 4, // 5 - 1 = 4
    IX: 9, // 10 - 1 = 9
    XL: 40, // 50 - 10 = 40
    XC: 90, // 100 - 10 = 90
    CD: 400, // 500 - 100 = 400
    CM: 900, // 1000 - 100 = 900
  };

  // Step 3: Initialize result variable to store final integer value
  let result = 0;

  // Step 4: Initialize index pointer for string traversal
  // Hum manual index control kar rahe hain kyunki kabhi 1, kabhi 2 positions jump karenge
  let i = 0;

  // Step 5: Traverse the string till the end
  while (i < s.length) {
    // Step 6: Check if we can look ahead (i.e., not at the last character)
    // Agar next character exist karta hai toh two-character check kar sakte hain
    if (i + 1 < s.length) {
      // Extract current two characters as a potential special case
      const twoChar = s[i] + s[i + 1];

      // Step 7: Check if these two characters form a special subtraction case
      // Agar special case hai (IV, IX, XL, XC, CD, CM mein se koi)
      if (specialCases[twoChar]) {
        // Add the special case value to result
        // Special value add karo (like CM = 900)
        result += specialCases[twoChar];

        // Skip both characters since we processed them together
        // 2 positions aage jump karo kyunki dono characters process ho gaye
        i += 2;

        // Continue to next iteration
        continue;
      }
    }

    // Step 8: If no special case found, process single character
    // Agar special case nahi mila ya last character hai, toh single character process karo
    result += romanMap[s[i]];

    // Move to next character
    // Ek position aage badho
    i += 1;
  }

  // Step 9: Return the final computed integer value
  return result;
}

// Test cases for verification
console.log(romanToInt_brute('III')); // Output: 3
console.log(romanToInt_brute('LVIII')); // Output: 58
console.log(romanToInt_brute('MCMXCIV')); // Output: 1994