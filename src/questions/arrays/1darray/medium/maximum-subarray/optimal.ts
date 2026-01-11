function maxSubArray(nums: number[]): number {
  // Initialize maxSum with the smallest possible number
  let maxSum: number = -Infinity;

  // Current sum of the subarray we're considering
  let currentSum: number = 0;

  // Iterate through each number in the array
  for (let i: number = 0; i < nums.length; i++) {
    // Add current number to our running sum
    currentSum += nums[i];

    // If currentSum is greater than maxSum, update maxSum
    // This means we've found a subarray with a larger sum
    maxSum = Math.max(maxSum, currentSum);

    // If currentSum becomes negative, reset it to 0
    // Because any future subarray would be larger without
    // including this negative sum
    if (currentSum < 0) {
      currentSum = 0;
    }
  }

  return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
