/**
 * Roman to Integer - Better Approach (Look Ahead Comparison)
 *
 * Purpose: Convert Roman numeral to integer by comparing adjacent characters
 *
 * Key Insight: In Roman numerals, if a smaller value appears before a larger value,
 * it means subtraction (like IV = 4, IX = 9). Otherwise, we add values.
 *
 * Approach: Single pass, left-to-right with value comparison
 * - Compare current symbol value with next symbol value
 * - If current < next → Subtract (subtraction rule)
 * - If current >= next → Add (normal addition)
 *
 * Time: O(n), Space: O(1)
 */

function romanToInt(s: string): number {
  // Step 1: Create value mapping for all Roman symbols
  // Ye hashmap har Roman symbol ko uski integer value se map karta hai
  const romanMap: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Step 2: Initialize result to accumulate the final integer value
  let result = 0;

  // Step 3: Traverse string from left to right
  // Har character ko process karenge aur next character se compare karenge
  for (let i = 0; i < s.length; i++) {
    // Get the integer value of current Roman symbol
    // Current character ki value nikalo
    const currentValue = romanMap[s[i]];

    // Step 4: Check if there's a next character to compare with
    // Agar next character exist karta hai toh comparison possible hai
    if (i + 1 < s.length) {
      // Get the integer value of next Roman symbol
      // Next character ki value nikalo
      const nextValue = romanMap[s[i + 1]];

      // Step 5: Apply the comparison rule
      // Roman numeral rule: smaller before larger means subtraction

      if (currentValue < nextValue) {
        // SUBTRACTION CASE
        // Jab current value choti hai next value se, matlab subtraction hoga
        // Example: I(1) before V(5) in "IV" means 5-1=4
        // Toh current value ko SUBTRACT karo result se
        result -= currentValue;
      } else {
        // ADDITION CASE
        // Jab current value badi ya equal hai next value se
        // Example: X(10) before I(1) in "XI" means 10+1=11
        // Toh current value ko ADD karo result mein
        result += currentValue;
      }
    } else {
      // Step 6: Last character handling
      // Agar last character hai (no next character to compare)
      // Toh simply add kar do, kyunki compare karne ke liye koi nahi hai
      result += currentValue;
    }
  }

  // Step 7: Return the final computed integer
  return result;
}

// Alternative cleaner version with ternary operator
function romanToIntCleaner(s: string): number {
  const romanMap: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = romanMap[s[i]];
    const next = romanMap[s[i + 1]];

    // Agar next exist karta hai AUR current < next, toh subtract
    // Otherwise add (includes last character case jahan next undefined hoga)
    result += next && current < next ? -current : current;
  }

  return result;
}

// Test cases
console.log(romanToInt('III')); // Output: 3
console.log(romanToInt('LVIII')); // Output: 58
console.log(romanToInt('MCMXCIV')); // Output: 1994
console.log(romanToInt('IV')); // Output: 4
console.log(romanToInt('IX')); // Output: 9