/**
 * Brute Force Solution: Remove Outermost Parentheses
 * Approach: First find all primitive parts, then remove outer brackets
 * Time: O(n), Space: O(n)
 */
function removeOuterParentheses_brute_force(s: string): string {
  // Step 1: Find all primitive parts
  const primitiveParts: string[] = [];
  let counter = 0;
  let start = 0;

  // Iterate through string to identify primitive decomposition
  for (let i = 0; i < s.length; i++) {
    // Opening bracket mile to counter increase karo
    if (s[i] === '(') {
      counter++;
    }
    // Closing bracket mile to counter decrease karo
    else if (s[i] === ')') {
      counter--;
    }

    // Jab counter 0 ho jaye, ek primitive part complete
    if (counter === 0) {
      // Extract the primitive part from start to current position
      const primitiveString = s.substring(start, i + 1);
      primitiveParts.push(primitiveString);

      // Next primitive part ki starting position set karo
      start = i + 1;
    }
  }

  // Step 2: Remove outer parentheses from each primitive part
  let result = '';

  for (const part of primitiveParts) {
    // Edge case: Single "()" ka inner part empty hoga
    if (part.length === 2) {
      // "()" se outer remove karne pe "" bach jayega
      continue; // Skip empty parts
    }

    // Remove first character (opening outer bracket)
    // Remove last character (closing outer bracket)
    // substring(1, length-1) gives us inner content
    const innerPart = part.substring(1, part.length - 1);
    result += innerPart;
  }

  return result;
}

removeOuterParentheses_brute_force('(()())(())(()(()))');