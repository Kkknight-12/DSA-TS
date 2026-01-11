/**
 * Function to find the single element in a sorted array
 * @param nums - Sorted array with all elements appearing twice except one
 * @return The single element that appears only once
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function singleNonDuplicate(nums: number[]): number {
  // Edge cases
  if (nums.length === 1) {
    return nums[0]; // If array has only one element, return it
  }

  // Initialize pointers for binary search
  let left = 0;
  let right = nums.length - 1;

  // Binary search loop
  while (left < right) {
    // Calculate middle index
    let mid = Math.floor((left + right) / 2);

    // Make sure mid is even for easier pattern checking
    if (mid % 2 === 1) {
      mid--;
    }

    // Check if the pattern is as expected (pairs at even-odd indices)
    if (nums[mid] === nums[mid + 1]) {
      // Pattern is normal here, so single element is on the right
      left = mid + 2;
    } else {
      // Pattern is disrupted, so single element is on the left or at mid
      right = mid;
    }
  }

  // At this point, left === right, return the element
  return nums[left];
}
