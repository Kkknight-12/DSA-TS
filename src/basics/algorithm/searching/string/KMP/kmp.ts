// https://www.notion.so/KMP-Searching-Algorithm-1a6a2680896880798b17c8273e78be4d

/**
 * Computes the LPS (Longest Prefix Suffix) array for a given pattern.
 * LPS[i] stores the length of the longest proper prefix of pattern[0...i]
 * which is also a suffix of pattern[0...i].
 * @param pattern The pattern string.
 * @returns The LPS array.
 */
function computeLPSArray(pattern: string): number[] {
  const lps: number[] = new Array(pattern.length).fill(0);
  let length = 0; // length of the previous longest prefix suffix
  let i = 1;

  // The loop calculates lps[i] for i from 1 to pattern.length - 1
  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      // If characters match, we can extend the current prefix-suffix
      length++;
      lps[i] = length;
      i++;
    } else {
      // Mismatch after length matches
      if (length !== 0) {
        // This is the tricky part. We don't decrement i.
        // We set length to the previous longest prefix-suffix.
        // This is like "falling back" in the pattern itself.
        length = lps[length - 1];
        // Note: we do NOT increment i here.
      } else {
        // If length is 0, it means there's no proper prefix-suffix.
        // So, lps[i] is 0, and we move to the next character.
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

/**
 * Implements the Knuth-Morris-Pratt (KMP) string searching algorithm.
 * @param text The text to search within.
 * @param pattern The pattern to search for.
 * @returns The starting index of the first occurrence of the pattern in the text, or -1 if not found.
 */
function kmpSearch(text: string, pattern: string): number {
  const m = pattern.length;
  const n = text.length;

  // Edge cases
  if (m === 0) return 0;
  if (n === 0 || m > n) return -1;

  // Step 1: Pre-process the pattern to get the LPS array
  const lps = computeLPSArray(pattern);

  // Step 2: Start the search
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < n) {
    if (pattern[j] === text[i]) {
      // Case 1: Characters match
      i++;
      j++;
    }

    if (j === m) {
      // Case 2: Pattern found!
      // The pattern is fully matched. Return the starting index.
      return i - j;
    } else if (i < n && pattern[j] !== text[i]) {
      // Case 3: Mismatch after j matches
      if (j !== 0) {
        // This is the KMP magic!
        // Instead of moving 'i' back, we use the LPS array to
        // shift the pattern. We move 'j' to the position of the
        // last known prefix-suffix.
        j = lps[j - 1];
      } else {
        // If j is 0, it means the mismatch happened at the first
        // character of the pattern. We have no choice but to move
        // the text pointer 'i' forward.
        i++;
      }
    }
  }

  // Pattern not found
  return -1;
}

function kmp() {
  // --- Example Usage ---
  const text = 'ABABDABACDABABCABAB';
  const pattern = 'ABABC';
  const foundIndex = kmpSearch(text, pattern);

  console.log(`Text:    ${text}`);
  console.log(`Pattern: ${pattern}`);
  if (foundIndex !== -1) {
    console.log(`Pattern found at index: ${foundIndex}`);
  } else {
    console.log('Pattern not found.');
  }
  // Expected Output: Pattern found at index: 10
}