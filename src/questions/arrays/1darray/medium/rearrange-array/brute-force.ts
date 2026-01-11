function rearrangeArray_brute(nums: number[]): number[] {
  // Step 1: Create arrays to store positive and negative numbers separately
  // We maintain original order by using array push
  const positiveNumbers: number[] = [];
  const negativeNumbers: number[] = [];

  // Step 2: Separate positive and negative numbers while maintaining their order
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      positiveNumbers.push(nums[i]);
    } else {
      negativeNumbers.push(nums[i]);
    }
  }

  // Step 3: Create result array to store final answer
  const result: number[] = [];

  // Step 4: Interleave positive and negative numbers
  // We use a separate index for result array (resultIndex)
  let resultIndex = 0;

  // Step 5: Fill the result array by alternating between positive and negative
  for (let i = 0; i < positiveNumbers.length; i++) {
    // Place positive number at even index
    result[resultIndex] = positiveNumbers[i];
    resultIndex++;

    // Place negative number at odd index
    result[resultIndex] = negativeNumbers[i];
    resultIndex++;
  }

  return result;
}

console.log(rearrangeArray_brute([3, 1, -2, -5, 2, -4]));
