/**
 * OPTIMAL SOLUTION - BUCKET SORT APPROACH
 *
 * WHY OPTIMAL?
 * - Eliminates sorting step completely
 * - Uses frequency as direct index (counting sort principle)
 * - Achieves linear time complexity O(n)
 * - No comparison operations needed
 *
 * KEY INSIGHT:
 * Since max frequency of any character = string length (n),
 * we can create n+1 buckets where bucket[i] stores all
 * characters with frequency i. Then traverse from high to low.
 *
 * TIME COMPLEXITY: O(n) - True linear time! 🚀
 * SPACE COMPLEXITY: O(n) - For buckets array
 *
 * BEST FOR: Interviews, production code, large inputs
 */

function frequencySortOptimal(s: string): string {
  // Edge case: Empty or single character
  if (s.length <= 1) return s;

  const n = s.length;

  // ============================================
  // STEP 1: Build Frequency Map
  // ============================================
  // Count karo har character kitni baar aaya hai
  // Time: O(n) - string ko ek baar traverse karna
  const frequencyMap = new Map<string, number>();

  for (const char of s) {
    // Current frequency get karo (ya 0 if doesn't exist)
    // Then increment karo
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }

  // ============================================
  // STEP 2: Create Buckets Array
  // ============================================
  // buckets[i] will store all characters with frequency i
  // Size = n+1 because frequency can be from 0 to n
  // Time: O(n) - array initialization
  // Space: O(n) - array of size n+1

  const buckets: string[][] = Array.from(
    { length: n + 1 }, // Create array of size n+1
    () => [] // Initialize each bucket as empty array
  );

  // Alternative way to create buckets (same result):
  // const buckets: string[][] = new Array(n + 1).fill(null).map(() => []);

  // ============================================
  // STEP 3: Fill Buckets
  // ============================================
  // Har character ko uski frequency wale bucket mein daalo
  // Time: O(k) where k = unique characters (k <= n)

  for (const [char, freq] of frequencyMap.entries()) {
    // Character ko uski frequency wale bucket mein push karo
    // Example: agar 'e' ki frequency 2 hai, to buckets[2].push('e')
    buckets[freq].push(char);
  }

  // ============================================
  // STEP 4: Build Result String
  // ============================================
  // Buckets ko REVERSE order mein traverse karo
  // Kyunki high frequency wale pehle chahiye
  // Time: O(n) - total n characters process honge

  const result: string[] = [];

  // Start from highest possible frequency (n) down to 1
  // Bucket[0] skip kar sakte hain (frequency 0 means character doesn't exist)
  for (let freq = n; freq >= 1; freq--) {
    // Agar current frequency ka bucket empty hai, skip karo
    if (buckets[freq].length === 0) continue;

    // Is frequency pe jitne bhi characters hain, sabko process karo
    for (const char of buckets[freq]) {
      // Character ko freq times repeat karo aur result mein add karo
      // Example: 'e' with freq=2 → "ee"
      // repeat() method: Efficiently duplicates the character
      result.push(char.repeat(freq));
    }
  }

  // Join all parts into final string
  // join('') combines array elements into single string
  return result.join('');
}

/**
 * ALTERNATIVE IMPLEMENTATION: Using plain array instead of Map
 *
 * If we know character set is limited (like ASCII),
 * we can use array for even better performance
 */
function frequencySortOptimalArray(s: string): string {
  if (s.length <= 1) return s;

  const n = s.length;

  // For ASCII characters (256 possible values)
  // Using array is faster than Map for small character sets
  const frequencyArray = new Array(256).fill(0);

  // Count frequencies using character codes
  for (let i = 0; i < n; i++) {
    const charCode = s.charCodeAt(i);
    frequencyArray[charCode]++;
  }

  // Create buckets
  const buckets: number[][] = Array.from({ length: n + 1 }, () => []);

  // Fill buckets with character codes
  for (let charCode = 0; charCode < 256; charCode++) {
    const freq = frequencyArray[charCode];
    if (freq > 0) {
      buckets[freq].push(charCode);
    }
  }

  // Build result
  const result: string[] = [];
  for (let freq = n; freq >= 1; freq--) {
    for (const charCode of buckets[freq]) {
      result.push(String.fromCharCode(charCode).repeat(freq));
    }
  }

  return result.join('');
}

/**
 * COMPACT VERSION: Same logic, less code
 * Good for interviews when time is limited
 */
function frequencySortCompact(s: string): string {
  if (s.length <= 1) return s;

  // Step 1: Count frequencies
  const freqMap = new Map<string, number>();
  for (const c of s) freqMap.set(c, (freqMap.get(c) || 0) + 1);

  // Step 2 & 3: Create and fill buckets
  const buckets: string[][] = Array(s.length + 1)
    .fill(null)
    .map(() => []);
  for (const [char, freq] of freqMap) buckets[freq].push(char);

  // Step 4: Build result
  let result = '';
  for (let i = s.length; i > 0; i--) {
    for (const char of buckets[i]) {
      result += char.repeat(i);
    }
  }

  return result;
}