/**
 * Problem: Find the minimum capacity of ship that can ship all packages within 'days' days
 * @param weights - Array of package weights in their order on conveyor belt
 * @param days - Number of days to ship all packages
 * @returns - Minimum ship capacity required
 */
function shipWithinDays(weights: number[], days: number): number {
  // Define our search space for binary search
  // Minimum capacity must be at least the weight of heaviest package
  let left = Math.max(...weights);
  // Maximum capacity would be sum of all weights (ship everything in 1 day)
  let right = weights.reduce((sum, weight) => sum + weight, 0);

  // Binary search to find minimum capacity
  while (left < right) {
    // Calculate middle point
    const mid = Math.floor((left + right) / 2);

    // Check if this capacity is sufficient
    if (canShipWithCapacity(weights, mid, days)) {
      // If yes, try with a smaller capacity
      right = mid;
    } else {
      // If no, we need a larger capacity
      left = mid + 1;
    }
  }

  // Left is our answer - the minimum capacity needed
  return left;
}

/**
 * Helper function to check if all packages can be shipped within 'days' days
 * with the given ship capacity
 * @param weights - Array of package weights
 * @param capacity - Ship capacity to check
 * @param days - Number of days allowed
 * @returns - Boolean indicating if shipping is possible
 */
function canShipWithCapacity(
  weights: number[],
  capacity: number,
  days: number
): boolean {
  let daysNeeded = 1; // Start with day 1
  let currentLoad = 0; // Current weight loaded on ship

  // Go through all packages
  for (const weight of weights) {
    // If adding this package exceeds capacity, move to next day
    if (currentLoad + weight > capacity) {
      daysNeeded++;
      currentLoad = weight; // Start new day with current package
    } else {
      // Add package to current day's load
      currentLoad += weight;
    }
  }

  // Return true if we can ship within allowed days
  return daysNeeded <= days;
}

// Example usage:
// const result = shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5);
// console.log(result); // Output: 15
