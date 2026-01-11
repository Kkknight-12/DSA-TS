/**
 * Roman to Integer - Optimal Approach (Right to Left Traversal)
 *
 * Purpose: Convert Roman numeral string to integer using the most elegant approach
 *
 * Core Insight: Roman numerals follow a pattern where values generally decrease
 * from left to right. When traversing RIGHT to LEFT:
 * - If current value >= previous value → Normal case, ADD it
 * - If current value < previous value → Subtraction case, SUBTRACT it
 *
 * This automatically handles all special cases (IV, IX, XL, XC, CD, CM)
 * without needing explicit checks or special mappings!
 *
 * Time: O(n), Space: O(1) - Most optimal solution
 */

function romanToInt_optimal(s: string): number {
  // Step 1: Create mapping for Roman symbols to their integer values
  // Ye hashmap sirf ek baar define karna hai aur sab cases handle ho jayenge
  const romanMap: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Step 2: Initialize result accumulator
  // Ye variable final answer store karega
  let result = 0;

  // Step 3: Initialize previous value tracker
  // Ye variable track karega ki right side mein kya value thi
  // Initially 0 set karte hain kyunki rightmost character ke right mein kuch nahi
  let prevValue = 0;

  // Step 4: Traverse string from RIGHT to LEFT (reverse direction)
  // Ye loop string ke end se start ki taraf chalega
  // i = s.length - 1 se start karke i = 0 tak jayega
  for (let i = s.length - 1; i >= 0; i--) {
    // Step 5: Get current character's integer value from map
    // Current position ki Roman symbol ki value nikalo
    const currentValue = romanMap[s[i]];

    // Step 6: Apply the comparison rule with previous value
    // Ye hai core logic - yahi magic hai is approach ka!

    if (currentValue >= prevValue) {
      // CASE 1: Current value badi ya equal hai previous value se
      // Matlab ye normal addition case hai
      // Example:
      //   - V(5) → I(1): 5 >= 1, so ADD
      //   - X(10) → I(1): 10 >= 1, so ADD
      //   - M(1000) → C(100): 1000 >= 100, so ADD

      result += currentValue;

      // Kyun add kar rahe hain?
      // Roman numerals normally left se right bade se chote hote hain
      // Right to left traverse karne pe, agar current >= previous
      // Matlab normal pattern follow ho raha hai (bada → chota)
    } else {
      // CASE 2: Current value choti hai previous value se
      // Matlab ye subtraction case hai!
      // Example:
      //   - I(1) → V(5): 1 < 5, so SUBTRACT
      //   - X(10) → C(100): 10 < 100, so SUBTRACT
      //   - C(100) → M(1000): 100 < 1000, so SUBTRACT

      result -= currentValue;

      // Kyun subtract kar rahe hain?
      // Agar right to left traverse karte waqt chota value pehle aaye
      // Matlab original string mein wo BADE value se PEHLE tha
      // Aur Roman rule kehta hai: chota bade se pehle = subtraction!
      // Example: IV mein I(1) V(5) se pehle hai, toh 5-1=4
    }

    // Step 7: Update previous value for next iteration
    // Current value ko previous bana do, kyunki next iteration mein
    // ye "previous" (right wala) ban jayega
    prevValue = currentValue;
  }

  // Step 8: Return the accumulated result
  return result;
}

// Alternative: Ultra-compact version (Same logic, ek-liner comparison)
function romanToIntCompact(s: string): number {
  const map: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prev = 0;

  // Right to left traverse with ternary operator
  for (let i = s.length - 1; i >= 0; i--) {
    const curr = map[s[i]];
    // Agar current >= previous toh add, else subtract
    result += curr >= prev ? curr : -curr;
    prev = curr;
  }

  return result;
}

// Test cases to verify correctness
console.log(romanToInt_optimal('III')); // Output: 3
console.log(romanToInt_optimal('LVIII')); // Output: 58
console.log(romanToInt_optimal('MCMXCIV')); // Output: 1994
console.log(romanToInt_optimal('IV')); // Output: 4
console.log(romanToInt_optimal('IX')); // Output: 9
console.log(romanToInt_optimal('XL')); // Output: 40
console.log(romanToInt_optimal('CDXLIV')); // Output: 444