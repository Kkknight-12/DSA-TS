// Add case insensitivity
function isAnagramOptimal(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  // Convert to lowercase first
  s = s.toLowerCase();
  t = t.toLowerCase();

  const freq: number[] = new Array(26).fill(0);
  const pivot = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - pivot]++;
    freq[t.charCodeAt(i) - pivot]--;
  }

  return freq.every((x) => x === 0);
}

/**
 * ⭐ OPTIMAL SOLUTION #2: Single Pass Approach
 *
 * Dono strings ko simultaneously process karte hain
 * String 1 se increment, String 2 se decrement - ek hi loop mein
 *
 * Time Complexity: O(n) - single loop
 * Space Complexity: O(1) - fixed array of 26
 *
 * Advantage: Slightly faster as only one loop
 * Disadvantage: Can't do early termination during building phase
 *
 * @param s1 - First string
 * @param s2 - Second string
 * @returns boolean - true if anagrams
 */
function areAnagramsSinglePass(s1: string, s2: string): boolean {
  // Length check - mandatory
  if (s1.length !== s2.length) {
    return false;
  }

  // Case insensitive
  const str1 = s1.toLowerCase();
  const str2 = s2.toLowerCase();

  // Fixed array for character counts
  const charCount: number[] = new Array(26).fill(0);

  // Helper function
  const getIndex = (char: string): number => {
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
  };

  console.log(`\n🔍 Single Pass Processing: "${str1}" and "${str2}"\n`);

  // SINGLE LOOP: Dono strings ko simultaneously process karo
  // String 1 ka character → increment
  // String 2 ka character → decrement
  for (let i = 0; i < str1.length; i++) {
    // String 1 character processing
    const char1 = str1[i];
    const index1 = getIndex(char1);
    charCount[index1]++; // Increment for first string

    // String 2 character processing
    const char2 = str2[i];
    const index2 = getIndex(char2);
    charCount[index2]--; // Decrement for second string

    console.log(`  Position ${i}:`);
    console.log(`    '${char1}' (s1) → index ${index1} → +1`);
    console.log(`    '${char2}' (s2) → index ${index2} → -1`);
  }

  console.log('\n📊 Final frequency array:');
  console.log(charCount);

  // Final check: Sab 0 hone chahiye
  // Agar increment aur decrement perfectly balance hue hain
  // Matlab sab characters ki frequency same thi
  const result = charCount.every((count) => count === 0);

  console.log(`\n✅ Result: ${result ? 'ANAGRAM' : 'NOT ANAGRAM'}`);
  return result;
}