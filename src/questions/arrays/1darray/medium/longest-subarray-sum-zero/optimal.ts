function findLongestZeroSumSubarray_optimal(arr: number[]): number {
  // Map to store prefix sum and its first occurrence index
  // key: prefix sum, value: index where we first saw this sum
  const prefixSumMap = new Map<number, number>();

  let maxLength: number = 0; // To store the result
  let currentSum: number = 0; // Running sum

  // Important: Initialize map with 0 sum occurring at index -1
  // This handles the case when entire array sums to zero
  prefixSumMap.set(0, -1);

  // Traverse the array
  for (let i = 0; i < arr.length; i++) {
    // Calculate running sum
    currentSum += arr[i];

    // If this sum was seen before, we found a zero-sum subarray
    if (prefixSumMap.has(currentSum)) {
      // Update maxLength if current length is greater
      // Current length = current index - first occurrence of this sum
      maxLength = Math.max(maxLength, i - prefixSumMap.get(currentSum)!);
    } else {
      // If sum not seen before, add it to map
      prefixSumMap.set(currentSum, i);
    }
  }

  return maxLength;
}

// Test cases
console.log(findLongestZeroSumSubarray_optimal([9, -3, 3, -1, 6, -5])); // Output: 5
console.log(findLongestZeroSumSubarray_optimal([6, -2, 2, -8, 1, 7, 4, -10])); // Output: 8
