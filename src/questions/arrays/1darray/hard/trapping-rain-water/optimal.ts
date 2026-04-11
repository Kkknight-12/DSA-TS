/**
 * ═══════════════════════════════════════════════════════════
 * TRAPPING RAIN WATER — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Return total trapped water for the elevation map `height`.
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Water at any index still depends on:
 *
 *   min(left boundary, right boundary) - current height
 *
 * Better approach me hum leftMax[] aur rightMax[] arrays bana rahe the.
 * Optimal me same logic ko 2 pointers ke saath chala dete hain.
 *
 * Core observation:
 *
 *   if leftMax <= rightMax
 *   then left side ka water fully decide ho chuka hai
 *
 * Why?
 *   kyunki `rightMax` already `leftMax` jitna ya usse bada hai.
 *   Current left index ke liye right side par enough wall mil chuki hai,
 *   so final bottleneck leftMax hi rahega.
 *
 * Same way:
 *
 *   if rightMax < leftMax
 *   then right side ka water fully decide ho chuka hai
 *
 * So har step par:
 *   smaller max side process karo
 *
 * TIME:  O(n)
 * SPACE: O(1)
 */

namespace TrappingRainWaterOptimal {
  function trap(height: number[]): number {
    const n = height.length;
    if (n < 3) return 0;

    let left = 0;
    let right = n - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    while (left <= right) {
      // Dono sides ka best seen boundary update karte chalo.
      leftMax = Math.max(leftMax, height[left]);
      rightMax = Math.max(rightMax, height[right]);

      if (leftMax <= rightMax) {
        // Smaller boundary left side par hai.
        // WHY: right side par already leftMax jitni boundary mil chuki hai,
        // so current left index ka final water leftMax se hi decide hoga.
        totalWater += leftMax - height[left];
        left++;
      } else {
        // Smaller boundary right side par hai.
        // WHY: left side par already rightMax jitni boundary mil chuki hai,
        // so current right index ka final water rightMax se hi decide hoga.
        totalWater += rightMax - height[right];
        right--;
      }
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
   *   left = 0
   *   right = 5
   *   leftMax = 0
   *   rightMax = 0
   *   totalWater = 0
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 1
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=5                                         │
   * │ leftMax = max(0, height[0]=4) = 4                       │
   * │ rightMax = max(0, height[5]=5) = 5                      │
   * │                                                          │
   * │ leftMax <= rightMax ? 4 <= 5 -> YES                     │
   * │ process left side                                        │
   * │ water add = leftMax - height[left] = 4 - 4 = 0          │
   * │ totalWater = 0                                           │
   * │ left++ -> 1                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 2
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=1, right=5                                         │
   * │ leftMax = max(4, 2) = 4                                 │
   * │ rightMax = max(5, 5) = 5                                │
   * │                                                          │
   * │ 4 <= 5 -> process left                                  │
   * │ water add = 4 - 2 = 2                                   │
   * │ totalWater = 2                                           │
   * │ left++ -> 2                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 3
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=2, right=5                                         │
   * │ leftMax = max(4, 0) = 4                                 │
   * │ rightMax = max(5, 5) = 5                                │
   * │                                                          │
   * │ 4 <= 5 -> process left                                  │
   * │ water add = 4 - 0 = 4                                   │
   * │ totalWater = 6                                           │
   * │ left++ -> 3                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 4
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=3, right=5                                         │
   * │ leftMax = max(4, 3) = 4                                 │
   * │ rightMax = max(5, 5) = 5                                │
   * │                                                          │
   * │ 4 <= 5 -> process left                                  │
   * │ water add = 4 - 3 = 1                                   │
   * │ totalWater = 7                                           │
   * │ left++ -> 4                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 5
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=4, right=5                                         │
   * │ leftMax = max(4, 2) = 4                                 │
   * │ rightMax = max(5, 5) = 5                                │
   * │                                                          │
   * │ 4 <= 5 -> process left                                  │
   * │ water add = 4 - 2 = 2                                   │
   * │ totalWater = 9                                           │
   * │ left++ -> 5                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * ITERATION 6
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=5, right=5                                         │
   * │ leftMax = max(4, 5) = 5                                 │
   * │ rightMax = max(5, 5) = 5                                │
   * │                                                          │
   * │ 5 <= 5 -> process left                                  │
   * │ water add = 5 - 5 = 0                                   │
   * │ totalWater = 9                                           │
   * │ left++ -> 6                                              │
   * └──────────────────────────────────────────────────────────┘
   *
   * Loop stops:
   *   left = 6, right = 5
   *
   * Final answer:
   *   9
   *
   * Why this was safe:
   *   har step par smaller max side process hui
   *   so us side ka bottleneck already known tha
   *
   * EDGE CASES:
   * 1. [] -> 0
   * 2. [2,1] -> 0
   * 3. [2,0,2] -> 2
   * 4. monotonic arrays -> 0
   */

  export function runTests(): void {
    console.log("🧪 Testing Trapping Rain Water — OPTIMAL\n");

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

TrappingRainWaterOptimal.runTests();
