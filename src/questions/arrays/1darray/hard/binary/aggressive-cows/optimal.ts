// https://www.notion.so/Aggressive-Cows-1b2a268089688055b5ade995ba4b1b53

/**
 * Solves the Aggressive Cows problem using binary search
 * @param stalls - Array of stall positions
 * @param cows - Number of cows to place
 * @returns The largest minimum distance possible
 */
function largestMinimumDistance(stalls: number[], cows: number): number {
  // Step 1: Sort the stalls (positions)
  stalls.sort((a, b) => a - b);

  // Step 2: Setup binary search range
  let low = 1; // Minimum possible distance
  let high = stalls[stalls.length - 1] - stalls[0]; // Maximum possible distance
  let result = -1;

  // Step 3: Perform binary search on possible distances
  while (low <= high) {
    // Calculate mid (potential minimum distance)
    const mid = Math.floor((low + high) / 2);

    // Check if mid distance is possible
    if (isPossibleCowDistance(stalls, cows, mid)) {
      // If possible, save this result and try for larger distance
      result = mid;
      low = mid + 1;
    } else {
      // If not possible, try smaller distance
      high = mid - 1;
    }
  }

  return result;
}

/**
 * Checks if it's possible to place given number of cows with minimum distance
 * @param stalls - Array of sorted stall positions
 * @param cows - Number of cows to place
 * @param minDistance - Minimum distance to maintain between cows
 * @returns true if placement is possible, false otherwise
 */
function isPossibleCowDistance(
  stalls: number[],
  cows: number,
  minDistance: number
): boolean {
  // Place first cow at the first stall
  let cowsPlaced = 1;
  let lastPosition = stalls[0];

  // Try to place remaining cows
  for (let i = 1; i < stalls.length; i++) {
    // If this stall is far enough from the last placed cow
    if (stalls[i] - lastPosition >= minDistance) {
      // Place a cow here
      cowsPlaced++;
      lastPosition = stalls[i];

      // If all cows are placed, return true
      if (cowsPlaced === cows) {
        return true;
      }
    }
  }

  // If we couldn't place all cows, return false
  return false;
}

/**
 * Main function to solve test cases
 */
function solveAgressiveCows(): void {
  // Sample test case
  const stalls = [1, 2, 8, 4, 9];
  const cows = 3;

  const result = largestMinimumDistance(stalls, cows);
  console.log(`Largest minimum distance: ${result}`);
}

// Example execution
solveAgressiveCows(); // Output: Largest minimum distance: 3