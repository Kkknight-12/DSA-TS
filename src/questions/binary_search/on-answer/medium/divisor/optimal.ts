/**
 * Find the smallest divisor such that the sum of ceiling division results is <= threshold
 * @param nums Array of integers
 * @param threshold Target threshold
 * @returns Smallest valid divisor
 */
function smallestDivisor(nums: number[], threshold: number): number {
  // Binary search boundaries
  let left = 1; // Minimum possible divisor
  let right = Math.max(...nums); // Maximum needed divisor

  // Binary search to find smallest valid divisor
  while (left <= right) {
    // Calculate middle point
    const mid = Math.floor((left + right) / 2);

    // Check if this divisor is valid
    if (isValidDivisor(nums, mid, threshold)) {
      // This divisor works, but we need smallest one
      // so keep searching in left half
      right = mid - 1;
    } else {
      // This divisor is too small, search in right half
      left = mid + 1;
    }
  }

  // After binary search completes, left will be the smallest valid divisor
  return left;
}

/**
 * Check if given divisor produces sum <= threshold
 * @param nums Array of integers
 * @param divisor Current divisor to check
 * @param threshold Target threshold
 * @returns true if divisor is valid, false otherwise
 */
function isValidDivisor(
  nums: number[],
  divisor: number,
  threshold: number
): boolean {
  let sum = 0;

  // Calculate sum of ceiling divisions
  for (const num of nums) {
    // Use Math.ceil for rounding up as required
    sum += Math.ceil(num / divisor);

    // Early termination if sum already exceeds threshold
    if (sum > threshold) {
      return false;
    }
  }

  // If we reach here, sum is <= threshold
  return true;
}

// Test examples
console.log(smallestDivisor([1, 2, 5, 9], 6)); // Output: 5
console.log(smallestDivisor([44, 22, 33, 11, 1], 5)); // Output: 44
