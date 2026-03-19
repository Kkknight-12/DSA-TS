/**
 * Function to find minimum days to make m bouquets with k adjacent flowers each
 * Using binary search approach for optimization
 * @param bloomDay - Array containing bloom days of each flower
 * @param m - Number of bouquets needed
 * @param k - Number of adjacent flowers required per bouquet
 * @returns Minimum number of days or -1 if impossible
 */
function minDays_optimal(bloomDay: number[], m: number, k: number): number {
  const n = bloomDay.length;

  // Edge case: if total flowers required (m*k) > available flowers (n), return -1
  if (m * k > n) {
    return -1;
  }

  // Find minimum and maximum bloom days for binary search boundaries
  let minDay = Number.MAX_SAFE_INTEGER;
  let maxDay = Number.MIN_SAFE_INTEGER;

  for (let day of bloomDay) {
    minDay = Math.min(minDay, day);
    maxDay = Math.max(maxDay, day);
  }

  // Binary search implementation
  let left = minDay;
  let right = maxDay;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    // Check if we can make m bouquets by day 'mid'
    if (canMakeBouquets_optimal(bloomDay, mid, m, k)) {
      // If yes, try to find a smaller day (look to the left)
      right = mid - 1;
    } else {
      // If no, we need more days (look to the right)
      left = mid + 1;
    }
  }

  // After binary search, 'left' will be the smallest day where we can make m bouquets
  // If 'left' exceeds maxDay, it means it's impossible
  return left <= maxDay ? left : -1;
}

/**
 * Helper function to check if we can make m bouquets on a given day
 * @param bloomDay - Array containing bloom days of each flower
 * @param day - Current day we are checking
 * @param m - Number of bouquets needed
 * @param k - Number of adjacent flowers required per bouquet
 * @returns Boolean indicating if m bouquets can be made
 */
function canMakeBouquets_optimal(
  bloomDay: number[],
  day: number,
  m: number,
  k: number
): boolean {
  let bouquets = 0; // Count of bouquets made so far
  let flowers = 0; // Count of adjacent flowers available

  // Iterate through each flower
  for (let i = 0; i < bloomDay.length; i++) {
    // If flower has bloomed by the current day
    if (bloomDay[i] <= day) {
      flowers++; // Increment adjacent flowers count

      // If we have k adjacent flowers, we can make a bouquet
      if (flowers === k) {
        bouquets++; // Made one bouquet
        flowers = 0; // Reset adjacent flowers count
      }
    } else {
      // If current flower hasn't bloomed, adjacent chain breaks
      flowers = 0;
    }

    // Early return if we've made m bouquets
    if (bouquets === m) {
      return true;
    }
  }

  // Return whether we were able to make m bouquets
  return bouquets >= m;
}
