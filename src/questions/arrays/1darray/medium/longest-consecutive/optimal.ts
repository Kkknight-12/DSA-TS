function longestConsecutive(nums: number[]): number {
  // If array is empty return 0
  if (nums.length === 0) return 0;

  // Create a Set for O(1) lookup
  const numSet = new Set(nums);
  let maxLength = 0;

  // Iterate through each number
  for (const num of numSet) {
    // Check if this number can be start of sequence
    // If num-1 exists, this can't be start
    if (!numSet.has(num - 1)) {
      console.log('start ', num);
      let currentNum = num;
      let currentLength = 1;

      // Keep checking next consecutive number
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      // Update maxLength if current sequence is longer
      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // Output: 4
