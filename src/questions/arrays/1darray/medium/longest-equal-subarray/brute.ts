function longestEqualSubarray_brute(nums: number[], k: number): number {
  let maxLen = 1; // Track maximum length found

  // Loop through all possible starting points
  for (let i = 0; i < nums.length; i++) {
    // Map to store frequency of each number in current window
    const freq = new Map<number, number>();
    let maxFreq = 0; // Most frequent element count

    // Extend window to end
    for (let j = i; j < nums.length; j++) {
      // Update frequency
      freq.set(nums[j], (freq.get(nums[j]) || 0) + 1);
      maxFreq = Math.max(maxFreq, freq.get(nums[j])!);

      // Calculate elements to delete
      let windowSize = j - i + 1;
      console.log(`i-j, ${i}-${j}`);
      console.log(`windowSize: ${windowSize}`);
      console.log(`maxFreq: ${maxFreq}`);
      let deletionsNeeded = windowSize - maxFreq;
      console.log(`deletionsNeeded: ${deletionsNeeded}`);
      for (const [key, value] of freq) {
        console.log(`Key: ${key}, Value: ${value}`);
      }
      console.log();

      // Update maxLen if valid window found
      if (deletionsNeeded <= k) {
        maxLen = Math.max(maxLen, maxFreq);
      }
    }
  }

  return maxLen;
}
