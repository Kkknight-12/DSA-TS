/**
 * Better Solution: Using Stack to track bracket levels
 * Approach: Stack helps identify which brackets are outer vs inner
 * Time: O(n), Space: O(n) for stack
 */
function removeOuterParentheses(s: string): string {
  // Stack will store indices of opening brackets
  const stack: number[] = [];

  // Result string banane ke liye array use karenge (efficient string concatenation)
  const result: string[] = [];

  // Iterate through each character in the string
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === '(') {
      // IMPORTANT: Check stack BEFORE pushing
      // Agar stack empty hai, ye outer opening bracket hai
      if (stack.length === 0) {
        // Outer opening bracket - skip it (don't add to result)
        // But still push to stack to track nesting level
        stack.push(i);
      } else {
        // Inner opening bracket - add to result
        result.push(char);
        stack.push(i);
      }
    } else if (char === ')') {
      // IMPORTANT: Check stack size BEFORE popping
      // Agar stack mein sirf 1 element hai, ye outer closing bracket hai
      if (stack.length === 1) {
        // Outer closing bracket - skip it (don't add to result)
        stack.pop();
      } else {
        // Inner closing bracket - add to result
        result.push(char);
        stack.pop();
      }
    }
  }

  // Join array to create final string
  return result.join('');
}

/**
 * Alternative Stack Solution - Using boolean markers
 * This approach explicitly marks outer brackets
 */
function removeOuterParenthesesAlternative(s: string): string {
  const stack: number[] = [];
  // Boolean array to mark which positions are outer brackets
  const isOuter: boolean[] = new Array(s.length).fill(false);

  // First pass: Mark outer brackets
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      // Opening bracket
      if (stack.length === 0) {
        // This is start of a primitive part
        isOuter[i] = true; // Mark as outer
      }
      stack.push(i);
    } else {
      // Closing bracket
      if (stack.length === 1) {
        // This closes a primitive part
        isOuter[i] = true; // Mark as outer
      }
      stack.pop();
    }
  }

  // Second pass: Build result by skipping marked positions
  let result = '';
  for (let i = 0; i < s.length; i++) {
    // Include character only if it's not marked as outer
    if (!isOuter[i]) {
      result += s[i];
    }
  }

  return result;
}