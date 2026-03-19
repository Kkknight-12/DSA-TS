// https://www.notion.so/Gas-station-problem-1cba268089688032a0b2e9b69313dbc4?pvs=23

/**
 * Minimize Maximum Distance Between Gas Stations
 * Approach: Binary Search on Answer
 * Time: O(n * log(maxGap))
 * Space: O(1)
 */

class GasStationOptimizer {
  /**
   * Main function to find minimum possible maximum distance
   * @param stations - sorted array of gas station positions
   * @param k - number of new stations to add
   * @returns minimum possible maximum distance
   */
  static minimizeMaxDistance(stations: number[], k: number): number {
    const n = stations.length;

    // Edge case: agar sirf ek station hai
    if (n === 1) return 0;

    // Step 1: Binary search ki range define karo
    let low = 0; // minimum possible distance
    let high = 0; // maximum gap in original array

    // Sabse bada gap find karo original array mein
    for (let i = 1; i < n; i++) {
      high = Math.max(high, stations[i] - stations[i - 1]);
    }

    // Binary search precision ke liye (10^-6 accuracy chahiye)
    const EPSILON = 1e-6;

    // Step 2: Binary Search on answer
    while (high - low > EPSILON) {
      // Mid point nikalo (potential answer)
      const mid = low + (high - low) / 2;

      // Check: kya mid distance possible hai k stations ke saath?
      if (this.canPlaceStations(stations, k, mid)) {
        // Agar possible hai, try karo aur chhota distance
        high = mid;
      } else {
        // Agar possible nahi hai, distance badhana padega
        low = mid;
      }
    }

    // Final answer with required precision
    return high;
  }

  /**
   * Helper function: Check if we can place k stations with max distance = maxDist
   * @param stations - original gas stations array
   * @param k - stations to place
   * @param maxDist - maximum allowed distance between consecutive stations
   * @returns true if possible, false otherwise
   */
  private static canPlaceStations(
    stations: number[],
    k: number,
    maxDist: number
  ): boolean {
    // Total stations required count karo
    let requiredStations = 0;
    const n = stations.length;

    // Har consecutive pair ke beech check karo
    for (let i = 1; i < n; i++) {
      // Current gap between two consecutive stations
      const gap = stations[i] - stations[i - 1];

      // Kitne stations chahiye is gap ko maxDist ya kam karne ke liye?
      // Formula: floor(gap / maxDist) - but we need stations in between
      // So actual formula: floor(gap / maxDist) gives us sections
      // Stations needed = sections - 1 (as we already have 2 endpoints)

      // Mathematical calculation:
      // If gap = 6 and maxDist = 2, we need gap/maxDist = 3 sections
      // Which means 2 new stations in between
      const stationsNeeded = Math.floor(gap / maxDist);

      // Agar gap exactly divisible hai, to 1 kam station chahiye
      // Example: gap=6, maxDist=2 → 6/2=3 sections → 2 stations needed
      // But agar gap=6, maxDist=3 → 6/3=2 sections → 1 station needed
      if (gap % maxDist === 0) {
        requiredStations += stationsNeeded - 1;
      } else {
        requiredStations += stationsNeeded;
      }

      // Early termination: agar already k se zyada ho gaye
      if (requiredStations > k) {
        return false;
      }
    }

    // Check: kya required stations k ya usse kam hain?
    return requiredStations <= k;
  }
}

// Test the solution
function runTests(): void {
  // Test Case 1
  const stations1 = [1, 2, 3, 4, 5];
  const k1 = 4;
  console.log(`Test 1: stations = [${stations1}], k = ${k1}`);
  console.log(
    `Result: ${GasStationOptimizer.minimizeMaxDistance(stations1, k1)}`
  );
  // Expected: 0.5

  // Test Case 2
  const stations2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const k2 = 1;
  console.log(`\nTest 2: stations = [${stations2}], k = ${k2}`);
  console.log(
    `Result: ${GasStationOptimizer.minimizeMaxDistance(stations2, k2)}`
  );
  // Expected: 1

  // Test Case 3: Large gap
  const stations3 = [1, 7];
  const k3 = 2;
  console.log(`\nTest 3: stations = [${stations3}], k = ${k3}`);
  console.log(
    `Result: ${GasStationOptimizer.minimizeMaxDistance(stations3, k3)}`
  );
  // Expected: 2
}

// Run tests
runTests();