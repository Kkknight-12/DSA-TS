function rearrangeArray_better(nums: number[]): number[] {
  // Create a result array of the same size as input
  const result: number[] = new Array(nums.length);

  // Initialize two pointers:
  // evenIndex for positive numbers (will be placed at 0, 2, 4, ...)
  // oddIndex for negative numbers (will be placed at 1, 3, 5, ...)
  let evenIndex: number = 0; // For positive numbers
  let oddIndex: number = 1; // For negative numbers

  // Single pass through the array
  for (let num of nums) {
    if (num > 0) {
      // Place positive number at even index and move to next even position
      result[evenIndex] = num;
      evenIndex += 2;
    } else {
      // Place negative number at odd index and move to next odd position
      result[oddIndex] = num;
      oddIndex += 2;
    }
  }

  return result;
}

console.log(rearrangeArray_better([3, 1, -2, -5, 2, -4]));
