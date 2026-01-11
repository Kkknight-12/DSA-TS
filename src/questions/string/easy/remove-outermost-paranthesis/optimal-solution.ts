// https://www.notion.so/Remove-Outermost-Parentheses-280a2680896880619995f5862728e5ea

/**
 * Optimal Solution: Single Counter Approach
 * Most elegant solution with minimal space usage
 * Time: O(n), Space: O(1) excluding result string
 */
function removeOuterParentheses_optimal(s: string): string {
  // Counter tracks nesting depth (kinte levels deep hain hum)
  let counter = 0;

  // Result string build karne ke liye
  let result = '';

  // Single pass through the string
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === '(') {
      // CRITICAL: Check BEFORE incrementing
      // Agar counter > 0, matlab ye inner opening bracket hai
      if (counter > 0) {
        result += char; // Add inner bracket to result
      }
      // Ab counter increment karo (depth increase)
      counter++;
    } else {
      // char === ')'
      // CRITICAL: Decrement FIRST, then check
      // Pehle depth decrease karo
      counter--;
      // Agar counter still > 0, matlab ye inner closing bracket tha
      if (counter > 0) {
        result += char; // Add inner bracket to result
      }
    }
  }

  return result;
}

/**
 * Alternative Optimal: More explicit version for clarity
 * Same logic but with clearer variable names
 */
function removeOuterParenthesesExplicit(s: string): string {
  let depth = 0; // Current nesting depth
  let result = '';

  for (const bracket of s) {
    if (bracket === '(') {
      // Opening bracket rules:
      // - depth 0: Outer opening (primitive start) → Skip
      // - depth > 0: Inner opening → Include
      if (depth > 0) {
        result += bracket;
      }
      depth++; // Go one level deeper
    } else {
      // Closing bracket rules:
      // - depth 1: Outer closing (primitive end) → Skip
      // - depth > 1: Inner closing → Include
      depth--; // Come one level up
      if (depth > 0) {
        result += bracket;
      }
    }
  }

  return result;
}

/**
 * Ultra-Compact Version (for showing off 😎)
 * Same logic in minimal lines
 */
function removeOuterParenthesesCompact(s: string): string {
  let c = 0,
    result = '';
  for (const ch of s) {
    // Ternary operators for compact code
    if (ch === '(') c++ > 1 && (result += ch);
    else --c > 0 && (result += ch);
  }
  return result;
}

/**
 * Visualization Helper: Shows counter changes step-by-step
 */
function visualizeOptimalApproach(s: string): void {
  console.log('Input String:', s);
  console.log('\nOptimal Counter Approach Visualization:');
  console.log('='.repeat(60));

  let counter = 0;
  let result = '';

  console.log(
    'Format: Index | Char | Counter Before | Action | Counter After | Result'
  );
  console.log('-'.repeat(60));

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const counterBefore = counter;
    let action = '';

    if (char === '(') {
      if (counter > 0) {
        result += char;
        action = 'INNER (add)';
      } else {
        action = 'OUTER (skip)';
      }
      counter++;
    } else {
      counter--;
      if (counter > 0) {
        result += char;
        action = 'INNER (add)';
      } else {
        action = 'OUTER (skip)';
      }
    }

    console.log(
      `${i.toString().padStart(5)} | '${char}'  | ${counterBefore.toString().padStart(14)} | ${action.padEnd(12)} | ${counter.toString().padStart(13)} | "${result}"`
    );
  }

  console.log('='.repeat(60));
  console.log('Final Result:', result);
}

/**
 * Test function with multiple examples
 */
function testOptimalSolution(): void {
  const testCases = [
    '(()())(())', // Expected: "()()()"
    '(()())(())(()(()))', // Expected: "()()()()(())"
    '()()', // Expected: ""
    '((()()))', // Expected: "(()())"
  ];

  console.log('Testing Optimal Solution:');
  console.log('-'.repeat(40));

  testCases.forEach((test) => {
    const result = removeOuterParentheses_optimal(test);
    console.log(`Input:  "${test}"`);
    console.log(`Output: "${result}"`);
    console.log();
  });
}