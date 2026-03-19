/* 

 0  1  2  3  4  5  6 
[4, 5, 6, 7, 0, 1, 2] 

---------------------------
while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;  // Min in right half (exclude mid)
    else right = mid;                           // Min in left half (include mid)
}
1
[5, 6, 7, 0, 1, 2, 4] 
[0, 1, 2, 3, 4, 5, 6]

2
[6, 7, 0, 1, 2, 4, 5] 
[0, 1, 2, 3, 4, 5, 6]

3
[7, 0, 1, 2, 4, 5, 6] 
[0, 1, 2, 3, 4, 5, 6]

4
[0, 1, 2, 4, 5, 6, 7] 
[0, 1, 2, 3, 4, 5, 6]

5
[1, 2, 4, 5, 6, 7, 0] 
[0, 1, 2, 3, 4, 5, 6]

6
[2, 4, 5, 6, 7, 0, 1] 
[0, 1, 2, 3, 4, 5, 6]

*/

/**
 * Finds the minimum element in a rotated sorted array using binary search
 * @param nums - The rotated sorted array
 * @returns The minimum element in the array
 */
function findMin(nums: number[]): number {
  // Edge case: if array has only one element, return it
  if (nums.length === 1) {
    return nums[0];
  }

  // Edge case: if array is sorted (not rotated), return first element
  if (nums[0] < nums[nums.length - 1]) {
    return nums[0];
  }

  // Initialize pointers for binary search
  let left = 0;
  let right = nums.length - 1;

  // Binary search loop
  while (left < right) {
    // Calculate middle index
    let mid = Math.floor((left + right) / 2);

    // Key decision: if middle element is greater than rightmost element,
    // minimum must be in the right half (including mid+1)
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    }
    // Otherwise, minimum must be in the left half (including mid)
    else {
      right = mid;
    }
  }

  // At this point, left and right converge to the same index,
  // which is the minimum element index
  return nums[left];
}

// Test cases
console.log(findMin([3, 4, 5, 1, 2])); // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
