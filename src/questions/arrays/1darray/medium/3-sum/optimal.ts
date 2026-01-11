function threeSum(nums: number[]): number[][] {
  // Edge case: if array length is less than 3, no triplets possible
  if (nums.length < 3) return [];

  // Sort array to handle duplicates and use two pointer technique
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  // Fix first number of triplet
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for first number
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Two pointers technique
    let left = i + 1; // pointer just after i
    let right = nums.length - 1; // pointer at end

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        // Found a triplet
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left pointer
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for right pointer
        while (left < right && nums[right] === nums[right - 1]) right--;

        // Move both pointers
        left++;
        right--;
      } else if (sum < 0) {
        // Sum too small, increase left pointer
        left++;
      } else {
        // Sum too large, decrease right pointer
        right--;
      }
    }
  }

  return result;
}
