/**
 * Painter's Partition Problem - Optimal Solution using Binary Search
 * Goal: Minimize the maximum time taken by any painter
 */

function findMinTime(boards: number[], k: number): number {
  // Edge case: agar painters zyada hain boards se
  if (k > boards.length) {
    k = boards.length; // har painter ko max 1 board hi milega
  }

  // Binary search ka range setup
  let left = Math.max(...boards); // Minimum possible time (sabse bada board)
  let right = boards.reduce((a, b) => a + b, 0); // Maximum possible time (sum of all)

  // Binary search on answer space
  while (left < right) {
    // Mid calculate karo (potential answer)
    const mid = Math.floor((left + right) / 2);

    // Check: kya 'mid' time mein k painters se kaam ho sakta hai?
    if (canPaintInTime(boards, mid, k)) {
      // Agar ho sakta hai, try smaller time
      right = mid; // mid could be our answer, isliye mid - 1 nahi kiya
    } else {
      // Agar nahi ho sakta, we need more time
      left = mid + 1;
    }
  }

  return left; // Final answer
}

/**
 * Helper function: Check if we can paint all boards within given time
 * using at most k painters
 */
function canPaintInTime(boards: number[], maxTime: number, k: number): boolean {
  let paintersUsed = 1; // Start with first painter
  let currentPainterWork = 0; // Current painter ka total work

  // Har board ko allocate karo
  for (let i = 0; i < boards.length; i++) {
    // ✅ CORRECT LOOP
    // Single board hi zyada bada hai given time se
    if (boards[i] > maxTime) {
      return false; // Impossible case
    }

    // Check: kya current painter ye board le sakta hai?
    if (currentPainterWork + boards[i] > maxTime) {
      // Nahi le sakta, next painter ko dedo
      paintersUsed++;
      currentPainterWork = boards[i]; // New painter starts with this board

      // Check: kya painters limit exceed ho gayi?
      if (paintersUsed > k) {
        return false; // Zyada painters lag rahe hain
      }
    } else {
      // Current painter handle kar sakta hai
      currentPainterWork += boards[i];
    }
  }

  return true; // Sab boards paint ho gaye within k painters
}

console.log(findMinTime([5, 5, 5, 5], 2));