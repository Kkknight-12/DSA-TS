function findLongestZeroSumSubarray_brutrforce(arr: number[]): number {
  // Initialize maxLength to store the length of longest zero-sum subarray
  let maxLength: number = 0;

  // Outer loop - starting point of subarray
  for (let i = 0; i < arr.length; i++) {
    // Initialize sum for current subarray
    let currentSum: number = 0;

    // Inner loop - ending point of subarray
    for (let j = i; j < arr.length; j++) {
      // Add current element to sum
      currentSum += arr[j];

      // If sum becomes zero, update maxLength if current length is greater
      if (currentSum === 0) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
}

// Test the function
const lzssbarr = [9, -3, 3, -1, 6, -5];
console.log(findLongestZeroSumSubarray_brutrforce(lzssbarr)); // Output: 5
