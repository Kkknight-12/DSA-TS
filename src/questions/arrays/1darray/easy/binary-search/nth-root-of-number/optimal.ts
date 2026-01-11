/**
 * Function to find the nth root of m
 * @param n - The order of the root (e.g., 2 for square root)
 * @param m - The number whose root we need to find
 * @returns The nth root of m if it's an integer, -1 otherwise
 */
function findNthRoot(n: number, m: number): number {
  // Handle edge cases
  if (m === 1 || n === 1) return m;

  // Set search boundaries
  let left: number = 1;
  let right: number = m;

  // Binary search implementation
  while (left <= right) {
    // Find the middle value
    let mid: number = Math.floor((left + right) / 2);

    // Calculate mid^n using our helper function
    let powerResult = calculatePower(mid, n, m);

    // If mid^n equals m, we found our answer
    if (powerResult === 0) return mid;
    // If mid^n is less than m, search in right half
    else if (powerResult === -1) left = mid + 1;
    // If mid^n is greater than m, search in left half
    else right = mid - 1;
  }

  // If we exit the loop without returning, no integer root exists
  return -1;
}

/**
 * Helper function to calculate if mid^n is less than, equal to, or greater than m
 * Returns -1 if mid^n < m, 0 if mid^n = m, 1 if mid^n > m
 * This approach prevents overflow for large numbers
 */
function calculatePower(mid: number, n: number, m: number): number {
  // To prevent overflow, we'll check at each multiplication step
  let result: number = 1;

  for (let i = 1; i <= n; i++) {
    result *= mid;

    // If result exceeds m at any point, no need to continue
    if (result > m) return 1; // mid^n > m
  }

  // Compare final result with m
  if (result === m) return 0; // mid^n = m
  return -1; // mid^n < m
}

// Test cases
console.log(findNthRoot(2, 9)); // Expected: 3
console.log(findNthRoot(3, 9)); // Expected: -1
console.log(findNthRoot(1, 14)); // Expected: 14
