/**
 * Function to find the index of target in a sorted array
 * or the index where it would be if inserted in order
 * @param {number[]} nums - Sorted array of distinct integers
 * @param {number} target - Target value to search
 * @return {number} - Index of target or insertion position
 */
function searchInsert(nums: number[], target: number): number {
  // Initialize left and right pointers
  let left: number = 0;
  let right: number = nums.length - 1;

  // Binary search loop
  while (left <= right) {
    // Calculate mid index
    const mid: number = Math.floor((left + right) / 2);

    // Case 1: Target found
    if (nums[mid] === target) {
      return mid;
    }
    // Case 2: Target is greater than mid element
    else if (nums[mid] < target) {
      left = mid + 1; // Search in right half
    }
    // Case 3: Target is less than mid element
    else {
      right = mid - 1; // Search in left half
    }
  }

  // If we exit the loop, 'left' is the insertion position
  return left;
}
