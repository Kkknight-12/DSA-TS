/**
 * Function to find any peak element in the array
 * @param nums The input array of integers
 * @returns The index of any peak element
 */
function findPeakElement(nums: number[]): number {
  // Set initial left and right pointers
  let left: number = 0;
  let right: number = nums.length - 1;

  // Continue until pointers meet
  while (left < right) {
    // Calculate middle index
    let mid: number = Math.floor((left + right) / 2);

    // Check if we're on an ascending slope
    if (nums[mid] < nums[mid + 1]) {
      // Peak is on the right side
      left = mid + 1;
    } else {
      // We're either at peak or on descending slope
      // So peak is at mid or to the left
      right = mid;
    }
  }

  // When left == right, we've found a peak
  return left; // or return right (they're equal)
}
