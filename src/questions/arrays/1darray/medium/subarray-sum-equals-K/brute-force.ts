function subarraySum_Bruteforce(nums: number[], k: number): number {
  let count = 0;

  // Outer loop for start point
  for (let start = 0; start < nums.length; start++) {
    let sum = 0;

    // Inner loop for end point
    for (let end = start; end < nums.length; end++) {
      sum += nums[end]; // Add current element to sum

      // If sum equals k, increment count
      if (sum === k) {
        count++;
      }
    }
  }

  return count;
}
