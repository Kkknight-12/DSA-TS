/**
 * PROBLEM: Sort Characters By Frequency (Brute Force Approach)
 *
 * PURPOSE: Given a string, sort it in decreasing order based on
 * the frequency of characters. Characters with higher frequency
 * should appear first, and same characters must be grouped together.
 *
 * APPROACH: Brute Force with Sorting
 * 1. Count frequency of each character using Hash Map
 * 2. Convert frequency map to array of [char, freq] pairs
 * 3. Sort array by frequency in descending order
 * 4. Build result string by repeating each character
 *
 * TIME COMPLEXITY: O(n + k log k) where n = string length, k = unique chars
 * SPACE COMPLEXITY: O(n) for frequency map and result
 */

function frequencySort(s: string): string {
  // STEP 1: Frequency count karo using Hash Map
  // Map<character, count> structure use kar rahe hain
  const freqMap = new Map<string, number>();

  // String ko iterate karo aur har character ka count increment karo
  // Time: O(n) - har character ko ek baar dekh rahe hain
  for (const char of s) {
    // Agar character pehle se map mein hai, to count++ karo
    // Warna 0 se start karo aur 1 add karo
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }

  // STEP 2: Map ko array mein convert karo taaki sort kar sakein
  // Array.from() ya spread operator se Map ko array bana rahe hain
  // Format: [['e', 2], ['t', 1], ['r', 1]]
  const freqArray: [string, number][] = Array.from(freqMap.entries());

  // STEP 3: Array ko frequency ke basis pe sort karo (descending order)
  // Custom comparator use kar rahe hain
  // b[1] - a[1] matlab higher frequency pehle aayegi
  // Time: O(k log k) where k = unique characters
  freqArray.sort((a, b) => {
    // a[1] = first pair ki frequency
    // b[1] = second pair ki frequency
    // Descending order ke liye: b - a
    return b[1] - a[1];
  });

  // STEP 4: Final result string build karo
  // Har character ko uski frequency times repeat karke add karo
  let result = '';

  // Sorted array ko traverse karo
  // Time: O(n) - total n characters add ho rahe hain
  for (const [char, freq] of freqArray) {
    // repeat() method: character ko freq times repeat kar deta hai
    // Example: 'e'.repeat(2) = "ee"
    result += char.repeat(freq);
  }

  // Final sorted string return karo
  return result;
}

// Alternative Implementation (More Readable but Same Logic)
function frequencySortAlternative(s: string): string {
  // Frequency map banao
  const freqMap: { [key: string]: number } = {};

  // Count karo
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  // Object ko array mein convert karo
  const entries = Object.entries(freqMap);

  // Sort karo descending order mein
  entries.sort((a, b) => b[1] - a[1]);

  // Result build karo using reduce (functional approach)
  return entries.reduce((result, [char, freq]) => {
    return result + char.repeat(freq);
  }, '');
}