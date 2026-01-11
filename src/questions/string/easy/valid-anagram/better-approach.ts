/**
 * BETTER APPROACH: Check Anagrams using Frequency Count
 *
 * Approach: Use a HashMap to count character frequencies
 * - First pass: Increment count for string 1
 * - Second pass: Decrement count for string 2
 * - Final check: All counts should be 0
 *
 * Time Complexity: O(n) where n = length of string
 * Space Complexity: O(k) where k = number of unique characters
 *
 * @param s1 - First string
 * @param s2 - Second string
 * @returns boolean - true if anagrams, false otherwise
 */
function areAnagramsFrequencyBasic(s1: string, s2: string): boolean {
  console.log(`\n🔍 Checking: "${s1}" and "${s2}"`);

  // STEP 1: Edge Case - Length Check
  // Agar lengths different hain toh anagram possible hi nahi
  // Kyunki anagram mein same characters (same count) hone chahiye
  if (s1.length !== s2.length) {
    console.log("❌ Lengths don't match!");
    console.log(`   "${s1}" has ${s1.length} chars`);
    console.log(`   "${s2}" has ${s2.length} chars`);
    return false;
  }

  // STEP 2: Convert to Lowercase
  // Case insensitive comparison ke liye
  // "Cat" aur "act" ko same treat karna hai
  const str1 = s1.toLowerCase();
  const str2 = s2.toLowerCase();

  console.log(`📝 After lowercase: "${str1}" and "${str2}"`);

  // STEP 3: Create Frequency Map (Hash Table)
  // Ye object har character ki count store karega
  // Example: { 'a': 2, 'b': 1, 'c': 3 }
  const frequencyMap: { [key: string]: number } = {};

  console.log('\n📊 Building frequency map from first string...');

  // STEP 4: Traverse First String and Build Frequency Map
  // Har character ke liye count increment karo
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];

    // Agar character pehle se map mein hai, toh count increment karo
    // Agar nahi hai, toh 0 se start karo aur phir 1 kar do
    if (frequencyMap[char]) {
      frequencyMap[char]++; // Existing count ko badhao
    } else {
      frequencyMap[char] = 1; // Naya character, count = 1 se start
    }

    console.log(`   '${char}' → count: ${frequencyMap[char]}`);
  }

  console.log('\n🗺️ Frequency Map after first string:');
  console.log(frequencyMap);

  console.log('\n🔄 Processing second string...');

  // STEP 5: Traverse Second String and Decrement Counts
  // Har character ke liye count decrement karo
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];

    // Agar character map mein exist hi nahi karta
    // Matlab ye character first string mein nahi tha
    // Directly false return karo
    if (!frequencyMap[char]) {
      console.log(`   ❌ '${char}' not found in map or count is 0!`);
      return false;
    }

    // Character exist karta hai, toh count decrement karo
    frequencyMap[char]--;
    console.log(`   '${char}' → count: ${frequencyMap[char]}`);

    // Agar count negative ho gaya
    // Matlab second string mein ye character zyada baar aaya
    // Directly false return karo
    if (frequencyMap[char] < 0) {
      console.log(`   ❌ '${char}' count became negative!`);
      return false;
    }
  }

  console.log('\n🗺️ Frequency Map after second string:');
  console.log(frequencyMap);

  // STEP 6: Final Check - All Counts Should Be 0
  // Agar sab characters ki count exactly 0 hai
  // Matlab dono strings mein same characters, same frequency
  console.log('\n✅ Checking if all counts are 0...');

  for (const char in frequencyMap) {
    if (frequencyMap[char] !== 0) {
      console.log(`   ❌ '${char}' has count ${frequencyMap[char]}, not 0!`);
      return false;
    }
  }

  console.log('   ✅ All counts are 0!');
  return true;
}

// ----------------------------------------------------------------------

// Advanced Optimization: Array Instead of HashMap

/**
 * SPACE OPTIMIZED: Using Fixed Array for English Letters
 *
 * Instead of HashMap, use array of size 26
 * Only works for lowercase English letters (a-z)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed array of 26
 */
function areAnagramsArrayOptimized(s1: string, s2: string): boolean {
  // Length check
  if (s1.length !== s2.length) return false;

  // Lowercase conversion
  const str1 = s1.toLowerCase();
  const str2 = s2.toLowerCase();

  // Fixed size array for 26 letters (a-z)
  // Index 0 = 'a', Index 1 = 'b', ..., Index 25 = 'z'
  const charCount: number[] = new Array(26).fill(0);

  // Helper: Convert character to array index
  // 'a' → 0, 'b' → 1, ..., 'z' → 25
  const getIndex = (char: string): number => {
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
  };

  // Build frequency
  for (const char of str1) {
    const index = getIndex(char);
    charCount[index]++;
  }

  // Verify
  for (const char of str2) {
    const index = getIndex(char);

    if (charCount[index] === 0) {
      return false; // Character not found or count exhausted
    }

    charCount[index]--;
  }

  // All counts should be 0
  return charCount.every((count) => count === 0);
}

// Example usage:
console.log(areAnagramsArrayOptimized('cat', 'act')); // true
console.log(areAnagramsArrayOptimized('rules', 'lesrt')); // false