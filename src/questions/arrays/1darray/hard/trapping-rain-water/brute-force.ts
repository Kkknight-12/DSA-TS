/**
 * ═══════════════════════════════════════════════════════════
 * TRAPPING RAIN WATER — BRUTE FORCE
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * `height[i]` ek bar ki height hai.
 * Width har bar ki `1` hai.
 * Return karo kitna total water trap hoga.
 *
 * EXAMPLES:
 *   [0,1,0,2,1,0,1,3,2,1,2,1] -> 6
 *   [4,2,0,3,2,5]             -> 9
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Kisi bhi index `i` par paani tabhi ruk sakta hai
 * jab uske left aur right dono side walls hon.
 *
 * Water level kis cheez se decide hoga?
 *
 *   chhoti boundary se
 *
 * So:
 *
 *   waterAtI = min(leftMax, rightMax) - height[i]
 *
 * Here `leftMax` means max from `0..i`,
 * and `rightMax` means max from `i..n-1`.
 * Current bar ko include karte hain so water never becomes negative.
 *
 * Brute force idea:
 *   har index ke liye leftMax fresh scan karo
 *   har index ke liye rightMax fresh scan karo
 *   current water nikaal kar total me add karo
 *
 * TIME:  O(n^2)
 * SPACE: O(1)
 */

namespace TrappingRainWaterBruteForce {
  function trap(height: number[]): number {
    const n = height.length;

    // 3 se chhote array me valley ban hi nahi sakti.
    if (n < 3) return 0;

    let totalWater = 0;

    // Boundary bars par water trap nahi hota,
    // so unhe skip karna safe aur cleaner hai.
    for (let i = 1; i < n - 1; i++) {
      let leftMax = 0;
      let rightMax = 0;

      // `0..i` ka max current bar ko include karta hai.
      // WHY: current bar include karne se water level current height se
      // kabhi below nahi jayega, so negative water avoid hota hai.
      for (let j = 0; j <= i; j++) {
        leftMax = Math.max(leftMax, height[j]);
      }

      // `i..n-1` ka max bhi current bar ko include karta hai
      // for the same reason.
      for (let j = i; j < n; j++) {
        rightMax = Math.max(rightMax, height[j]);
      }

      const waterLevel = Math.min(leftMax, rightMax);
      const trappedAtCurrentIndex = waterLevel - height[i];

      totalWater += trappedAtCurrentIndex;
    }

    return totalWater;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * height = [4, 2, 0, 3, 2, 5]
   *
   * Start:
   *   totalWater = 0
   *
   * Loop runs for i = 1 to 4
   * (i=0 aur i=5 boundaries hain, unpe water trap nahi hota)
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Current height = height[1] = 2                           │
   * │                                                          │
   * │ Find leftMax:                                            │
   * │   j=0 -> max(0,4) = 4                                    │
   * │   j=1 -> max(4,2) = 4                                    │
   * │   leftMax = 4                                            │
   * │                                                          │
   * │ Find rightMax:                                           │
   * │   j=1 -> max(0,2) = 2                                    │
   * │   j=2 -> max(2,0) = 2                                    │
   * │   j=3 -> max(2,3) = 3                                    │
   * │   j=4 -> max(3,2) = 3                                    │
   * │   j=5 -> max(3,5) = 5                                    │
   * │   rightMax = 5                                           │
   * │                                                          │
   * │ waterLevel = min(4,5) = 4                                │
   * │ trapped = 4 - 2 = 2                                      │
   * │ totalWater = 0 + 2 = 2                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Current height = height[2] = 0                           │
   * │                                                          │
   * │ Find leftMax:                                            │
   * │   j=0 -> 4                                               │
   * │   j=1 -> 4                                               │
   * │   j=2 -> 4                                               │
   * │   leftMax = 4                                            │
   * │                                                          │
   * │ Find rightMax:                                           │
   * │   j=2 -> 0                                               │
   * │   j=3 -> 3                                               │
   * │   j=4 -> 3                                               │
   * │   j=5 -> 5                                               │
   * │   rightMax = 5                                           │
   * │                                                          │
   * │ waterLevel = min(4,5) = 4                                │
   * │ trapped = 4 - 0 = 4                                      │
   * │ totalWater = 2 + 4 = 6                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 3
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Current height = height[3] = 3                           │
   * │                                                          │
   * │ leftMax = max of [4,2,0,3] = 4                           │
   * │ rightMax = max of [3,2,5] = 5                            │
   * │ waterLevel = min(4,5) = 4                                │
   * │ trapped = 4 - 3 = 1                                      │
   * │ totalWater = 6 + 1 = 7                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION: i = 4
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Current height = height[4] = 2                           │
   * │                                                          │
   * │ leftMax = max of [4,2,0,3,2] = 4                         │
   * │ rightMax = max of [2,5] = 5                              │
   * │ waterLevel = min(4,5) = 4                                │
   * │ trapped = 4 - 2 = 2                                      │
   * │ totalWater = 7 + 2 = 9                                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   9
   *
   * EDGE CASES:
   * 1. [] -> 0
   * 2. [2,1] -> 0
   * 3. strictly increasing -> 0
   * 4. strictly decreasing -> 0
   */

  export function runTests(): void {
    console.log("🧪 Testing Trapping Rain Water — BRUTE FORCE\n");

    const tests: Array<{ height: number[]; expected: number }> = [
      { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expected: 6 },
      { height: [4, 2, 0, 3, 2, 5], expected: 9 },
      { height: [], expected: 0 },
      { height: [1], expected: 0 },
      { height: [2, 1], expected: 0 },
      { height: [2, 0, 2], expected: 2 },
      { height: [3, 0, 2, 0, 4], expected: 7 },
      { height: [5, 2, 1, 2, 1, 5], expected: 14 },
      { height: [5, 4, 3, 2, 1], expected: 0 },
      { height: [1, 2, 3, 4, 5], expected: 0 },
    ];

    tests.forEach(({ height, expected }, i) => {
      const result = trap(height);
      const pass = result === expected;

      console.log(`Test ${i + 1}: height=[${height}]`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got:      ${result} -> ${pass ? "✅" : "❌"}`);
    });
  }
}

TrappingRainWaterBruteForce.runTests();
