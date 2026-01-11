/**
 * Maximum Nesting Depth of Parentheses
 *
 * Purpose: Valid parentheses string mein maximum nesting depth calculate karta hai
 *
 * Approach: Counter-based O(n) time, O(1) space solution
 * - Opening parenthesis '(' se depth increase hoti hai
 * - Closing parenthesis ')' se depth decrease hoti hai
 * - Har step par maximum depth track karte hain
 *
 * @param s - Valid parentheses string with digits and operators
 * @returns Maximum nesting depth
 */
function maxDepth(s: string): number {
  // Current depth track karne ke liye - kitne parentheses abhi open hain
  let currentDepth = 0;

  // Maximum depth jo abhi tak achieve hui hai
  let maxDepth = 0;

  // String ke har character ko traverse karte hain
  // Direct string access use kar rahe hain, split() ki zarurat nahi
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // Opening parenthesis '(' milne par:
    // - Ek naya level start hota hai, depth badhti hai
    if (char === '(') {
      currentDepth++;

      // Immediately check karte hain ki yeh new depth maximum hai ya nahi
      // WHY: Jaise hi depth badhti hai, waise hi check karna efficient hai
      maxDepth = Math.max(maxDepth, currentDepth);
    }

    // Closing parenthesis ')' milne par:
    // - Current level close hota hai, depth ghatti hai
    else if (char === ')') {
      currentDepth--;
    }

    // NOTE: Baaki characters (digits, operators) ko ignore karte hain
    // Kyunki wo depth ko affect nahi karte
  }

  // Final maximum depth return karte hain
  return maxDepth;
}

// Test cases
console.log(maxDepth('(1+(2*3)+((8)/4))+1')); // Output: 3
console.log(maxDepth('(1)+((2))+(((3)))')); // Output: 3
console.log(maxDepth('()(())((()()))')); // Output: 3
console.log(maxDepth('1+(2*3)/(2-1)')); // Output: 1