/**
 * Function to find the first and last position of a target element in a sorted array
 * @param nums Sorted array of integers
 * @param target Target element to find
 * @returns Array containing the first and last position of target, or [-1, -1] if not found
 */
function searchRange(nums: number[], target: number): number[] {
  // Initialize result array with default values
  const result: number[] = [-1, -1];

  // Edge case: empty array
  if (nums.length === 0) {
    return result;
  }

  // Binary search to find the first position
  let left = 0;
  let right = nums.length - 1;

  // First position (leftmost occurrence)
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      // Even if we found the target, we continue searching in the left half
      // to find the first occurrence
      right = mid - 1;
    } else if (nums[mid] < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
  }

  // After the loop, 'left' points to the potential first occurrence
  // Check if it's valid (within bounds and equal to target)
  if (left < nums.length && nums[left] === target) {
    result[0] = left;
  } else {
    // Target not found
    return result;
  }

  // Reset pointers for second binary search
  left = 0;
  right = nums.length - 1;

  // Last position (rightmost occurrence)
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      // Even if we found the target, we continue searching in the right half
      // to find the last occurrence
      left = mid + 1;
    } else if (nums[mid] < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
  }

  // After the loop, 'right' points to the potential last occurrence
  result[1] = right;

  return result;
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]
