function twoSum(nums: number[], target: number): number[] {
  // Create a Map to store number->index mapping
  let map = new Map();

  // Iterate through array once
  for (let i = 0; i < nums.length; i++) {
    // Calculate the complement needed to reach target
    let complement = target - nums[i];

    // If complement exists in map, we found our pair
    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    // Store current number and its index
    map.set(nums[i], i);
  }

  // Handle case where no solution exists (though problem guarantees one exists)
  return [];
}
