/**
 * Function to find square root of a number using Binary Search
 * @param n - The number for which we need to find square root
 * @returns The square root of n (floor value if n is not a perfect square)
 */
function findSquareRoot(n: number): number {
  // Handle edge cases
  if (n === 0 || n === 1) {
    return n;
  }

  // Initialize binary search boundaries
  let left = 1;
  let right = n;
  let result = 0; // This will store our answer

  // Continue binary search until the boundaries cross
  while (left <= right) {
    // Find the middle element
    const mid = Math.floor(left + (right - left) / 2);

    // Check if mid*mid is equal to n (perfect square)
    if (mid * mid === n) {
      return mid; // Found exact square root
    }

    // If mid*mid is less than n, move to right half
    // Also update result as potential floor value
    if (mid * mid < n) {
      left = mid + 1;
      result = mid; // Store mid as potential answer
    }
    // If mid*mid is greater than n, move to left half
    else {
      right = mid - 1;
    }
  }

  // Return the floor value of square root
  return result;
}
