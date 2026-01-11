/**
 * Search for a target value in a rotated sorted array with duplicates
 * @param nums The rotated sorted array with possible duplicates
 * @param target The value to search for
 * @returns true if target exists in nums, false otherwise
 */
function search_rotated_sorted_2(nums: number[], target: number): boolean {
  // Initialize pointers for binary search
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Calculate middle index
    let mid = Math.floor((left + right) / 2);

    // Case 1: Target found at middle
    if (nums[mid] === target) {
      return true;
    }

    // Case 2: Duplicates at left and middle - can't determine which half is sorted
    if (nums[left] === nums[mid]) {
      // Skip the leftmost element and try again
      left++;
      continue;
    }

    // Case 3: Determine which half is sorted and search accordingly
    if (nums[left] < nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        // Target is in the sorted left half
        right = mid - 1;
      } else {
        // Target is in the right half
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        // Target is in the sorted right half
        left = mid + 1;
      } else {
        // Target is in the left half
        right = mid - 1;
      }
    }
  }

  // Target not found in the array
  return false;
}
