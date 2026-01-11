function minEatingSpeed(piles: number[], h: number): number {
  // Set the search boundaries
  let left = 1; // Minimum possible speed
  let right = Math.max(...piles); // Maximum possible speed (can finish any pile in 1 hour)

  // Function to check if Koko can eat all bananas within h hours at speed k
  const canEatAllBananas = (speed: number): boolean => {
    let totalHours = 0;

    // Calculate total hours needed to eat all piles at given speed
    for (const pile of piles) {
      // Use Math.ceil because partial hours count as full hours
      totalHours += Math.ceil(pile / speed);

      // Early termination if hours already exceed h
      if (totalHours > h) {
        return false;
      }
    }

    return totalHours <= h;
  };

  // Binary search to find the minimum valid speed
  let result = right; // Default to maximum speed

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canEatAllBananas(mid)) {
      // This speed works, try smaller speeds
      result = mid; // Update current best result
      right = mid - 1; // Look in left half
    } else {
      // This speed is too slow, try larger speeds
      left = mid + 1; // Look in right half
    }
  }

  return result;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8)); // Expected: 4
