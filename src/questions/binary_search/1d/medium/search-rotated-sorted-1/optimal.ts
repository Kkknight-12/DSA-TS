/**
 * Function to search for a target value in a rotated sorted array
 * @param nums - The rotated sorted array
 * @param target - The value to search for
 * @returns The index of the target in the array, or -1 if not found
 */
function search_rotated_sorted_1(nums: number[], target: number): number {
  // Edge case: empty array
  if (nums.length === 0) return -1;

  let left = 0; // Initialize left pointer to start of array
  let right = nums.length - 1; // Initialize right pointer to end of array

  // Binary search loop
  while (left <= right) {
    // Calculate middle index to avoid integer overflow
    const mid = Math.floor(left + (right - left) / 2);

    // If we found the target, return its index
    if (nums[mid] === target) {
      return mid;
    }

    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is in the left sorted half
      if (nums[left] <= target && target < nums[mid]) {
        // Search left half
        right = mid - 1;
      } else {
        // Search right half
        left = mid + 1;
      }
    }
    // If right half is sorted
    else {
      // Check if target is in the right sorted half
      if (nums[mid] < target && target <= nums[right]) {
        // Search right half
        left = mid + 1;
      } else {
        // Search left half
        right = mid - 1;
      }
    }
  }

  // If we reach here, target is not in the array
  return -1;
}

// Example usage:
// console.log(search([4,5,6,7,0,1,2], 0)); // Output: 4
// console.log(search([4,5,6,7,0,1,2], 3)); // Output: -1
// console.log(search([1], 0)); // Output: -1
