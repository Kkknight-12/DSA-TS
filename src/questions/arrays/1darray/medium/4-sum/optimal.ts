function fourSum(nums: number[], target: number): number[][] {
  // Sort array to handle duplicates and enable two pointers
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const n = nums.length;

  // Fix first number with i
  for (let i = 0; i < n - 3; i++) {
    // Skip duplicates for first number
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Fix second number with j
    for (let j = i + 1; j < n - 2; j++) {
      // Skip duplicates for second number
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      // Use two pointers for remaining two numbers
      let left = j + 1; // third number pointer
      let right = n - 1; // fourth number pointer

      while (left < right) {
        // Calculate current sum of all four numbers
        const currentSum = nums[i] + nums[j] + nums[left] + nums[right];

        if (currentSum === target) {
          // Found a valid quadruplet
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          // Skip duplicates for third number
          while (left < right && nums[left] === nums[left + 1]) left++;
          // Skip duplicates for fourth number
          while (left < right && nums[right] === nums[right - 1]) right--;

          // Move pointers
          left++;
          right--;
        }
        // If sum is less, increment left to get larger sum
        else if (currentSum < target) {
          left++;
        }
        // If sum is more, decrement right to get smaller sum
        else {
          right--;
        }
      }
    }
  }

  return result;
}
