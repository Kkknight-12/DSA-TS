function majorityElement(nums: number[]): number {
  // Create a Map to store frequency of elements
  const frequencyMap = new Map<number, number>();

  // Calculate the majority threshold (n/2)
  const majorityThreshold = Math.floor(nums.length / 2);

  // Count frequency of each element
  for (const num of nums) {
    // Get current frequency (default 0) and add 1
    const currentFreq = (frequencyMap.get(num) || 0) + 1;
    frequencyMap.set(num, currentFreq);

    // If we find element with frequency > n/2, return it
    if (currentFreq > majorityThreshold) {
      return num;
    }
  }

  // This line won't be reached as we're guaranteed a majority element exists
  return nums[0];
}
