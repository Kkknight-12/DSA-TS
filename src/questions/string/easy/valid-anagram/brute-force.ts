// https://www.notion.so/Anagram-286a268089688093a75cf93229894742

/**
 * BRUTE FORCE APPROACH: Check if two strings are anagrams using Sorting
 *
 * Approach: Sort both strings and compare them
 * If sorted strings are equal, then original strings are anagrams
 *
 * Time Complexity: O(n log n) - due to sorting
 * Space Complexity: O(n) - for creating new sorted strings
 *
 * @param s1 - First string
 * @param s2 - Second string
 * @returns boolean - true if anagrams, false otherwise
 */
function areAnagramsBruteForce(s1: string, s2: string): boolean {
  // STEP 1: Edge Case - Length Check
  // Agar dono strings ki length different hai, toh anagram possible hi nahi
  // Kyunki anagram mein same characters hone chahiye (count equal honi chahiye)
  if (s1.length !== s2.length) {
    console.log('❌ Lengths are different, not anagrams!');
    return false;
  }

  // STEP 2: Case Insensitive Banao
  // Dono strings ko lowercase mein convert karo
  // Taaki "Cat" aur "act" ko same treat kiya ja sake
  const str1Lower = s1.toLowerCase();
  const str2Lower = s2.toLowerCase();

  console.log(`Original strings: "${s1}" and "${s2}"`);
  console.log(`After lowercase: "${str1Lower}" and "${str2Lower}"`);

  // STEP 3: Sort Both Strings
  // JavaScript mein string directly sort nahi hoti, toh process ye hai:
  // 1. String ko array mein convert karo (split)
  // 2. Array ko sort karo
  // 3. Array ko wapas string mein convert karo (join)

  // String 1 ko sort karna:
  const sortedStr1 = str1Lower
    .split('') // String ko individual characters ke array mein convert karo
    .sort() // Array ko alphabetically sort karo (lexicographical order)
    .join(''); // Array ko wapas string mein convert karo

  // String 2 ko sort karna:
  const sortedStr2 = str2Lower
    .split('') // Same process dusri string ke liye
    .sort() // Alphabetically sort
    .join(''); // Array to string

  console.log(`After sorting: "${sortedStr1}" and "${sortedStr2}"`);

  // STEP 4: Compare Sorted Strings
  // Agar dono sorted strings exactly equal hain, toh anagram hai
  // Kyunki same characters hain (bas original mein order different tha)
  const isAnagram = sortedStr1 === sortedStr2;

  console.log(`Are they equal? ${isAnagram ? '✅ YES' : '❌ NO'}`);

  return isAnagram;
}

// ==================== HELPER FUNCTION (Optional) ====================

/**
 * Alternative implementation with explicit steps
 * Ye wala version zyada readable hai beginners ke liye
 */
function areAnagramsBruteForceVerbose(s1: string, s2: string): boolean {
  // Edge case: empty strings
  if (!s1 || !s2) {
    return false;
  }

  // Edge case: length mismatch
  if (s1.length !== s2.length) {
    return false;
  }

  // Helper function: String ko sort karne ke liye
  const sortString = (str: string): string => {
    return str
      .toLowerCase() // Case insensitive
      .split('') // String → Array
      .sort((a, b) => a.localeCompare(b)) // Alphabetically sort
      .join(''); // Array → String
  };

  // Dono strings ko sort karo
  const sorted1 = sortString(s1);
  const sorted2 = sortString(s2);

  // Compare karo
  return sorted1 === sorted2;
}

// ==================== TESTING ====================

// Test Case 1
console.log('\n🧪 Test Case 1:');
console.log("Input: 'CAT' and 'ACT'");
console.log('Output:', areAnagramsBruteForce('CAT', 'ACT'));
console.log('Expected: true\n');

// Test Case 2
console.log('🧪 Test Case 2:');
console.log("Input: 'RULES' and 'LESRT'");
console.log('Output:', areAnagramsBruteForce('RULES', 'LESRT'));
console.log('Expected: false\n');

// Test Case 3
console.log('🧪 Test Case 3:');
console.log("Input: 'listen' and 'silent'");
console.log('Output:', areAnagramsBruteForce('listen', 'silent'));
console.log('Expected: true\n');