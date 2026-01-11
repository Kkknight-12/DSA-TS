/**
 * BRUTE FORCE SOLUTION: Reverse Words in a String
 * Purpose: String ke words ko reverse order mein arrange karna using built-in methods
 * Approach: Split → Filter → Reverse → Join
 */

function reverseWords(s: string): string {
  /**
   * Step 1: String ko spaces pe split karo
   * split(' ') - har space pe string ko todega
   * Example: "  hello   world  " → ["", "", "hello", "", "", "world", "", ""]
   *
   * Why this works: Split har space pe break karega,
   * multiple spaces ke case mein empty strings create honge
   */
  const wordsArray = s.split(' ');

  /**
   * Step 2: Empty strings ko filter out karo
   * filter(word => word) - truthy values ko rakhega, empty strings remove ho jayenge
   * Example: ["", "hello", "", "world", ""] → ["hello", "world"]
   *
   * Why this works: Empty string "" falsy value hai JavaScript mein,
   * toh filter automatically inhe remove kar dega
   */
  const filteredWords = wordsArray.filter((word) => word);
  // Alternative: wordsArray.filter(word => word.length > 0)

  /**
   * Step 3: Array ko reverse karo
   * reverse() - array ke elements ka order ulta kar deta hai
   * Example: ["hello", "world"] → ["world", "hello"]
   *
   * Note: reverse() mutates the original array,
   * lekin yahan new array pe kaam kar rahe hain toh safe hai
   */
  const reversedWords = filteredWords.reverse();

  /**
   * Step 4: Words ko single space se join karo
   * join(' ') - array elements ko single space delimiter se jodega
   * Example: ["world", "hello"] → "world hello"
   *
   * Why single space: Problem requirement ke according
   * words ke beech sirf ek space hona chahiye
   */
  const result = reversedWords.join(' ');

  return result;
}

/**
 * CLEANER ONE-LINER VERSION
 * Same logic, but chained methods for production code
 * Benefits: Concise, readable, no intermediate variables
 */
function reverseWordsOneLiner(s: string): string {
  // Chain all operations: split → filter → reverse → join
  return s
    .split(' ') // Space pe split karo
    .filter((word) => word) // Empty strings remove karo
    .reverse() // Order reverse karo
    .join(' '); // Single space se join karo
}

/**
 * ALTERNATIVE APPROACH using trim() and regex
 * More robust for different types of whitespace
 */
function reverseWordsRegex(s: string): string {
  /**
   * trim() - leading/trailing spaces remove karta hai
   * split(/\s+/) - one ya multiple whitespace pe split karta hai
   * \s+ regex pattern any whitespace character ko match karta hai
   */
  return s
    .trim() // Start/end spaces remove karo
    .split(/\s+/) // Multiple spaces pe split karo
    .reverse() // Reverse the order
    .join(' '); // Join with single space
}

// Test Cases for verification
const testCases = [
  { input: 'the sky is blue', expected: 'blue is sky the' },
  { input: '  hello world  ', expected: 'world hello' },
  { input: 'a good   example', expected: 'example good a' },
  { input: '   single   ', expected: 'single' },
  {
    input: 'multiple    spaces    between',
    expected: 'between spaces multiple',
  },
];

// Test runner function
function runTests_reverse_word(): void {
  console.log('🧪 Running Test Cases:');
  console.log('─'.repeat(50));

  testCases.forEach((testCase, index) => {
    const result = reverseWords(testCase.input);
    const passed = result === testCase.expected;

    console.log(`Test ${index + 1}: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Input:    "${testCase.input}"`);
    console.log(`Expected: "${testCase.expected}"`);
    console.log(`Got:      "${result}"`);
    console.log('─'.repeat(50));
  });
}

// Uncomment to run tests
// runTests_reverse_word();

// Export for use in other modules
// export { reverseWords, reverseWordsOneLiner, reverseWordsRegex };