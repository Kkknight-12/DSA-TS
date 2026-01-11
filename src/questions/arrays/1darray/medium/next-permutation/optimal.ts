function nextPermutation(nums: number[]): void {
  // Step 1: Find the first decreasing element from right
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    // If we found a decreasing element
    // Step 2: Find the smallest number greater than nums[i] in the right portion
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) {
      j--;
    }

    // Step 3: Swap the numbers
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // Step 4: Reverse the right portion
  // (if i < 0, reverse entire array as it's the last permutation)
  reverse(nums, i + 1);
}

// Helper function to reverse array from start to end
function reverse(nums: number[], start: number): void {
  let left = start;
  let right = nums.length - 1;

  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}
