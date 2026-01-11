/**
 * Purpose: Find the longest common prefix among an array of strings using Horizontal Scanning approach
 * Algorithm: Compare prefix with each string one by one and shrink it until it matches
 * Time Complexity: O(S) where S is sum of all characters in all strings
 * Space Complexity: O(1) - only using constant extra space
 */

function longestCommonPrefix(strs: string[]): string {
  // Edge Case 1: Agar array empty hai, toh koi prefix nahi ho sakta
  // Return empty string kyunki koi strings hi nahi hain
  if (strs.length === 0) {
    return '';
  }

  // Edge Case 2: Agar sirf ek string hai, toh wahi poora prefix hai
  // Kyunki khud ke saath compare karne par puri string common hogi
  if (strs.length === 1) {
    return strs[0];
  }

  // Step 1: Pehli string ko prefix maan lete hain
  // Yeh humari starting point hai jisko hum gradually shrink karenge
  let prefix: string = strs[0];

  // Step 2: Baki sabhi strings ke saath ek-ek karke compare karenge
  // Index 1 se start kar rahe hain kyunki 0th index toh already prefix hai
  for (let i = 1; i < strs.length; i++) {
    // Current string ko lete hain comparison ke liye
    const currentString: string = strs[i];

    // Step 3: Jab tak current string prefix se start nahi hoti,
    // tab tak prefix ko peeche se cut karte jao
    // indexOf(prefix) !== 0 matlab prefix starting mein nahi hai
    while (currentString.indexOf(prefix) !== 0) {
      // Prefix ko ek character peeche se hatao
      // Example: "flower" → "flowe" → "flow" → "flo" → "fl"
      prefix = prefix.substring(0, prefix.length - 1);

      // Early Exit: Agar prefix empty ho gaya, matlab koi common prefix nahi
      // Aage check karne ki zarurat nahi, seedha return kar do
      if (prefix === '') {
        return '';
      }
    }

    // Yahan tak aane ka matlab current string mein prefix mil gaya
    // Ab next string check karenge
  }

  // Step 4: Loop complete hone ke baad jo prefix bacha, wahi answer hai
  // Yeh wo longest prefix hai jo sabhi strings mein common hai
  return prefix;
}

// Alternative Implementation using startsWith() method (more readable)
function longestCommonPrefixV2(strs: string[]): string {
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];

  let prefix: string = strs[0];

  for (let i = 1; i < strs.length; i++) {
    // startsWith() method use kar rahe hain - more intuitive
    // Yeh check karta hai ki string prefix se start hoti hai ya nahi
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1);

      if (prefix === '') {
        return '';
      }
    }
  }

  return prefix;
}