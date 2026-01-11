function findKthRotation(arr: number[]): number {
  // Edge case: if array is not rotated or rotated n times
  if (arr[0] < arr[arr.length - 1]) {
    return 0; // Not rotated at all
  }

  let left = 0;
  let right = arr.length - 1;

  // Binary search to find the pivot point (smallest element)
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // If mid element is greater than rightmost element,
    // the pivot must be in the right half
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    }
    // Otherwise, the pivot is in the left half or at mid
    else {
      right = mid;
    }
  }

  // When left == right, we've found the pivot point
  // The index of the smallest element is the number of rotations
  return left;
}
