/**
 * @param {number[]} piles - Array of banana piles
 * @param {number} h - Hours before guards return
 * @return {number} - Minimum eating speed
 */
function minEatingSpeed_brute(piles: number[], h: number): number {
  // Find maximum pile to set our upper bound
  const maxPile = Math.max(...piles);

  // Try each possible eating speed from 1 to maxPile
  for (let speed = 1; speed <= maxPile; speed++) {
    // Check if current speed allows eating all bananas in h hours
    let totalHours = 0;

    // Calculate hours needed for each pile at current speed
    for (let pile of piles) {
      // Math.ceil because partial hours count as full hours
      totalHours += Math.ceil(pile / speed);
    }

    // If total hours <= h, we found our answer
    if (totalHours <= h) {
      return speed;
    }
  }

  // This line should never be reached given the constraints
  return maxPile;
}

console.log(minEatingSpeed_brute([3, 6, 7, 11], 8)); // Expected: 4

/* 
  when speed = 4
  for pile 1: 3/4 = 0.75 hours (rounded up to 1 hour)
  for pile 2: 6/4 = 1.5 hours (rounded up to 2 hours)
  for pile 3: 7/4 = 1.75 hours (rounded up to 2 hours)
  for pile 4: 11/4 = 2.75 hours (rounded up to 3 hours)
  Total hours = 1 + 2 + 2 + 3 = 8 hours
*/
