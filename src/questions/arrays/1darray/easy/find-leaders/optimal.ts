/**
 * ═══════════════════════════════════════════════════════════
 * FIND LEADERS IN AN ARRAY — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array me leader woh element hota hai jo apne RIGHT ke saare elements se
 * bada ya equal ho.
 *
 * NOTE:
 * Yeh file common Striver / GFG-style definition use karti hai:
 *   nums[i] >= all elements to the right
 *
 * Agar kisi platform pe strict `>` chahiye,
 * toh comparison me `>=` ko `>` se replace kar do.
 *
 * EXAMPLES:
 *   [16, 17, 4, 3, 5, 2]   → [17, 5, 2]
 *   [10, 4, 2, 4, 1]       → [10, 4, 4, 1]
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Leader ko define kaise karte hain?
 *
 *   "Mere right side me mujhse bada koi hai ya nahi?"
 *
 * Isliye left se right jaana natural nahi hai,
 * kyunki current element ke liye poora future dekhna padega.
 *
 * Right se left aao:
 *
 *   [16, 17, 4, 3, 5, 2]
 *                     ↑ start from here
 *
 * Rightmost element ke right me kuch nahi hota,
 * isliye woh automatically leader hota hai.
 *
 * Ab right se left chalte hue bas ek cheez maintain karo:
 *
 *   maxFromRight = ab tak right side ka sabse bada element
 *
 * Agar current element >= maxFromRight hai,
 * toh current element bhi leader hai.
 *
 * Example:
 *   [16, 17, 4, 3, 5, 2]
 *
 *   start:
 *     maxFromRight = -∞
 *
 *   2 >= -∞  → leader
 *   5 >= 2   → leader
 *   3 >= 5   → no
 *   4 >= 5   → no
 *   17 >= 5  → leader
 *   16 >= 17 → no
 *
 * Leaders reverse traversal me milte hain: [2, 5, 17]
 * Final answer original order me chahiye: [17, 5, 2]
 *
 * TIME:  O(n)
 * SPACE: O(n)  (answer array)
 */

namespace FindLeadersOptimal {

  function findLeaders(arr: number[]): number[] {
    const leaders: number[] = [];
    let maxFromRight = Number.NEGATIVE_INFINITY;

    // Right se left aao, kyunki leader ka decision right side pe depend karta hai.
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] >= maxFromRight) {
        leaders.push(arr[i]);
        maxFromRight = arr[i];
      }
    }

    // Leaders reverse order me collect hue hain, isliye original order me laao.
    return leaders.reverse();
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Standard case ─────────────────────────────
   * arr = [16, 17, 4, 3, 5, 2]
   *
   * idx:   0   1   2   3   4   5
   * val:  16  17   4   3   5   2
   *
   * Start:
   *   maxFromRight = -∞
   *   leaders = []
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=5, arr[i]=2                                            │
   * │ 2 >= -∞ ? YES → leader                                   │
   * │ leaders = [2]                                             │
   * │ maxFromRight = 2                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=4, arr[i]=5                                            │
   * │ 5 >= 2 ? YES → leader                                    │
   * │ leaders = [2, 5]                                          │
   * │ maxFromRight = 5                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=3, arr[i]=3                                            │
   * │ 3 >= 5 ? NO                                               │
   * │ leaders = [2, 5]                                          │
   * │ maxFromRight = 5                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=2, arr[i]=4                                            │
   * │ 4 >= 5 ? NO                                               │
   * │ leaders = [2, 5]                                          │
   * │ maxFromRight = 5                                          │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=1, arr[i]=17                                           │
   * │ 17 >= 5 ? YES → leader                                   │
   * │ leaders = [2, 5, 17]                                      │
   * │ maxFromRight = 17                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ i=0, arr[i]=16                                           │
   * │ 16 >= 17 ? NO                                             │
   * │ leaders = [2, 5, 17]                                      │
   * │ maxFromRight = 17                                         │
   * └──────────────────────────────────────────────────────────┘
   *
   * Reverse karo:
   *   [2, 5, 17] → [17, 5, 2] ✅
   *
   * ── Example 2: Equal values ──────────────────────────────
   * arr = [10, 4, 2, 4, 1]
   *
   * Right se left:
   *   1  -> leader
   *   4  -> leader
   *   2  -> no
   *   4  -> leader (because 4 >= 4)
   *   10 -> leader
   *
   * Reverse:
   *   [1, 4, 4, 10] → [10, 4, 4, 1] ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single element: [5]
   *    Right me kuch nahi → [5]
   *
   * 2. Strictly decreasing: [5,4,3,2]
   *    Har element leader → [5,4,3,2]
   *
   * 3. Strictly increasing: [1,2,3,4]
   *    Sirf last element leader → [4]
   *
   * 4. Negative values: [-3,-2,-2,-5]
   *    -2 aur -2 leaders ho sakte hain, isliye -∞ se start karna safe hai
   */

  export function runTests(): void {
    console.log('🧪 Testing Find Leaders in an Array — OPTIMAL\n');

    const tests: Array<{ arr: number[]; expected: number[] }> = [
      { arr: [16, 17, 4, 3, 5, 2], expected: [17, 5, 2] },
      { arr: [10, 4, 2, 4, 1], expected: [10, 4, 4, 1] },
      { arr: [30, 10, 10, 5], expected: [30, 10, 10, 5] },
      { arr: [5], expected: [5] },
      { arr: [5, 4, 3, 2], expected: [5, 4, 3, 2] },
      { arr: [1, 2, 3, 4], expected: [4] },
      { arr: [-3, -2, -2, -5], expected: [-2, -2, -5] },
      { arr: [7, 7, 7], expected: [7, 7, 7] },
      { arr: [9, 1, 8, 2, 7], expected: [9, 8, 7] },
      { arr: [1, 3, 2, 5, 4], expected: [5, 4] },
    ];

    tests.forEach(({ arr, expected }, i) => {
      const result = findLeaders(arr);
      const pass = JSON.stringify(result) === JSON.stringify(expected);

      console.log(`Test ${i + 1}: arr=[${arr}]`);
      console.log(`  Expected: [${expected}] | Got: [${result}] → ${pass ? '✅' : '❌'}`);
    });
  }
}

FindLeadersOptimal.runTests();
