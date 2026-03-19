/**
 * Split Array Largest Sum - Binary Search Solution
 * @param nums Input array of integers
 * @param k Number of subarrays to split the array into
 * @returns Minimized largest sum of any subarray after splitting
 */
function splitArray(nums: number[], k: number): number {
  // Edge case: if k equals array length, each element is its own subarray
  // and the answer is the maximum element
  if (k === nums.length) {
    return Math.max(...nums);
  }

  // Define search space boundaries
  // Minimum possible answer is the maximum element in the array
  // (since each subarray must contain at least one element)
  let left: number = Math.max(...nums);

  // Maximum possible answer is the sum of all elements (if k=1)
  let right: number = nums.reduce((sum, num) => sum + num, 0);

  // Binary search loop to find the minimum possible maximum subarray sum
  while (left < right) {
    // Calculate middle value to test as potential answer
    const mid: number = Math.floor(left + (right - left) / 2);

    // Check if we can split the array with maximum subarray sum = mid
    if (canSplit(nums, mid, k)) {
      // If possible, try to find an even smaller answer
      right = mid;
    } else {
      // If not possible, we need a larger maximum sum
      left = mid + 1;
    }
  }

  // At the end of binary search, left = right = answer
  return left;
}

/**
 * Helper function to check if the array can be split into k or fewer subarrays
 * such that no subarray has sum greater than maxSum
 * @param nums Input array
 * @param maxSum Maximum sum allowed for any subarray
 * @param k Maximum number of subarrays allowed
 * @returns True if possible, false otherwise
 */
function canSplit(nums: number[], maxSum: number, k: number): boolean {
  // Count of subarrays needed
  let count: number = 1;
  // Current subarray sum
  let currentSum: number = 0;

  // Iterate through array elements
  for (const num of nums) {
    // If adding this element exceeds maxSum, start a new subarray
    if (currentSum + num > maxSum) {
      count++;
      currentSum = num;

      // If we need more than k subarrays, return false
      if (count > k) {
        return false;
      }
    } else {
      // Add current element to the current subarray
      currentSum += num;
    }
  }

  // If we reached here, we successfully split into k or fewer subarrays
  return true;
}

// Test examples
console.log(splitArray([7, 2, 5, 10, 8], 2)); // Output: 18
console.log(splitArray([1, 2, 3, 4, 5], 2)); // Output: 9