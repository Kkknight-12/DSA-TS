/**
 * ═══════════════════════════════════════════════════════════
 * TRAPPING RAIN WATER — BETTER
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Har bar ki height di hui hai.
 * Return karo total trapped rain water.
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Brute force me same leftMax aur rightMax baar-baar calculate ho rahe the.
 *
 * Better idea:
 *   leftMax[i]  = 0..i tak tallest bar, current bar included
 *   rightMax[i] = i..n-1 tak tallest bar, current bar included
 *
 * Current bar include karne ka fayda:
 *   min(leftMax[i], rightMax[i]) >= height[i]
 * so trapped water negative nahi banega.
 *
 * Once ye 2 arrays mil gaye,
 * har index ka water O(1) me nikal jayega.
 *
 * TIME:  O(n)
 * SPACE: O(n)
 */

namespace TrappingRainWaterBetter {
  function trap(height: number[]): number {
    const n = height.length;
    if (n < 3) return 0;

    const leftMax = new Array<number>(n);
    const rightMax = new Array<number>(n);

    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
      // current left boundary = previous best ya current bar.
      // WHY: leftMax[i] should mean max in the inclusive range `0..i`.
      leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      // current right boundary = next best ya current bar.
      // WHY: rightMax[i] should mean max in the inclusive range `i..n-1`.
      rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let totalWater = 0;

    for (let i = 1; i < n - 1; i++) {
      const waterLevel = Math.min(leftMax[i], rightMax[i]);
      totalWater += waterLevel - height[i];
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
   * ═══════════════════════════════════════════════════════════
   * PASS 1: BUILD leftMax
   * ═══════════════════════════════════════════════════════════
   *
   * Start:
   *   leftMax = [_, _, _, _, _, _]
   *   leftMax[0] = 4
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=1: leftMax[1] = max(leftMax[0], height[1])            │
   * │                  = max(4, 2) = 4                        │
   * │ leftMax = [4, 4, _, _, _, _]                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=2: leftMax[2] = max(4, 0) = 4                         │
   * │ leftMax = [4, 4, 4, _, _, _]                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=3: leftMax[3] = max(4, 3) = 4                         │
   * │ leftMax = [4, 4, 4, 4, _, _]                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=4: leftMax[4] = max(4, 2) = 4                         │
   * │ leftMax = [4, 4, 4, 4, 4, _]                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=5: leftMax[5] = max(4, 5) = 5                         │
   * │ leftMax = [4, 4, 4, 4, 4, 5]                            │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * PASS 2: BUILD rightMax
   * ═══════════════════════════════════════════════════════════
   *
   * Start:
   *   rightMax = [_, _, _, _, _, _]
   *   rightMax[5] = 5
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=4: rightMax[4] = max(rightMax[5], height[4])          │
   * │                   = max(5, 2) = 5                       │
   * │ rightMax = [_, _, _, _, 5, 5]                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=3: rightMax[3] = max(5, 3) = 5                        │
   * │ rightMax = [_, _, _, 5, 5, 5]                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=2: rightMax[2] = max(5, 0) = 5                        │
   * │ rightMax = [_, _, 5, 5, 5, 5]                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=1: rightMax[1] = max(5, 2) = 5                        │
   * │ rightMax = [_, 5, 5, 5, 5, 5]                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=0: rightMax[0] = max(5, 4) = 5                        │
   * │ rightMax = [5, 5, 5, 5, 5, 5]                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * PASS 3: CALCULATE WATER
   * ═══════════════════════════════════════════════════════════
   *
   * i=1:
   *   waterLevel = min(4, 5) = 4
   *   trapped = 4 - 2 = 2
   *   total = 2
   *
   * i=2:
   *   waterLevel = min(4, 5) = 4
   *   trapped = 4 - 0 = 4
   *   total = 6
   *
   * i=3:
   *   waterLevel = min(4, 5) = 4
   *   trapped = 4 - 3 = 1
   *   total = 7
   *
   * i=4:
   *   waterLevel = min(4, 5) = 4
   *   trapped = 4 - 2 = 2
   *   total = 9
   *
   * Final answer:
   *   9
   *
   * EDGE CASES:
   * 1. n < 3 -> 0
   * 2. flat surface -> 0
   * 3. increasing / decreasing -> 0
   */

  export function runTests(): void {
    console.log("🧪 Testing Trapping Rain Water — BETTER\n");

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

TrappingRainWaterBetter.runTests();
