/**
 * TWO SUM - HASHMAP (OPTIMAL)
 * ===========================
 *
 * INTUITION (Soch):
 * ─────────────────
 * Brute force mein hum har element ke liye poora array scan karte hain → O(n²)
 *
 * Smart observation:
 * Agar mujhe nums[i] = 3 mila aur target = 9 hai,
 * toh mujhe sirf 9 - 3 = 6 dhundhna hai!
 *
 * Toh jaise jaise hum traverse karte hain:
 * - Pehle check karo: "kya mera complement pehle dekha gaya?"
 * - Agar haan → answer mil gaya!
 * - Agar nahi → current number ko map mein store karo future ke liye
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  nums = [2, 7, 11, 15], target = 9                       │
 * │                                                          │
 * │  i=0: num=2, need=7 → map mein nahi → store {2:0}       │
 * │  i=1: num=7, need=2 → map mein HAI at index 0 → [0,1] ✅│
 * │                                                          │
 * │  Ek hi pass mein answer!                                 │
 * └──────────────────────────────────────────────────────────┘
 *
 * ALGORITHM:
 * ──────────
 * 1. Ek Map banao: number → index
 * 2. Har element ke liye:
 *    a. complement = target - nums[i] nikalo
 *    b. Agar complement map mein hai → return [map.get(complement), i]
 *    c. Warna nums[i] ko map mein daalo
 * 3. [] return karo (problem guarantees solution exists)
 *
 * TIME COMPLEXITY: O(n)
 *   - Sirf ek baar array traverse karte hain
 *   - Map lookup/insert: O(1) average
 *
 * SPACE COMPLEXITY: O(n)
 *   - Worst case: Map mein saare elements store ho jaate hain
 *   - Example: [1,2,3,4], target=100 → no pair, sab store hoga
 */

namespace TwoSumOptimal {
  /**
   * Finds indices of two numbers that add up to target
   *
   * @param nums - Input array of integers
   * @param target - Target sum
   * @returns Indices [i, j] such that nums[i] + nums[j] === target
   */
  function twoSum(nums: number[], target: number): number[] {
    // Map stores: number → uska index
    // WHY Map: O(1) lookup, brute force O(n) search se zyada fast
    const map = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
      // Complement = woh number jo current number ke saath target banaye
      // EXAMPLE: target=9, nums[i]=3 → complement=6
      const complement = target - nums[i];

      if (map.has(complement)) {
        // Complement pehle dekha ja chuka hai!
        // map.get(complement) = complement ka index, i = current index
        return [map.get(complement)!, i];
      }

      // Complement nahi mila abhi tak → current number store karo
      // WHY: Future elements ke liye yeh complement ban sakta hai
      map.set(nums[i], i);
    }

    // Problem guarantees exactly one solution, yahan kabhi nahi pahunchenge
    return [];
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: nums = [2, 7, 11, 15], target = 9
   *
   * Initial State:
   *   map = {}
   *
   * ═══════════════════════════════════════════════════════════
   * TRAVERSAL
   * ═══════════════════════════════════════════════════════════
   *
   * i=0: nums[0] = 2
   * ┌─────────────────────────────────────────┐
   * │ complement = 9 - 2 = 7                  │
   * │ map.has(7)? NO                          │
   * │ map.set(2, 0)                           │
   * │ map = { 2→0 }                           │
   * └─────────────────────────────────────────┘
   *
   * i=1: nums[1] = 7
   * ┌─────────────────────────────────────────┐
   * │ complement = 9 - 7 = 2                  │
   * │ map.has(2)? YES → index = 0             │
   * │ return [0, 1] ✅                        │
   * └─────────────────────────────────────────┘
   *
   * ───────────────────────────────────────────
   * Example 2: nums = [3, 2, 4], target = 6
   *
   * i=0: num=3, complement=3 → map.has(3)? NO → map={3:0}
   * i=1: num=2, complement=4 → map.has(4)? NO → map={3:0, 2:1}
   * i=2: num=4, complement=2 → map.has(2)? YES at index 1
   *   return [1, 2] ✅
   *
   * ───────────────────────────────────────────
   * Example 3: nums = [3, 3], target = 6
   *
   * i=0: num=3, complement=3 → map.has(3)? NO → map={3:0}
   * i=1: num=3, complement=3 → map.has(3)? YES at index 0
   *   return [0, 1] ✅
   *   (Note: Same value, different indices — works correctly!)
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Duplicate values [3,3], target=6:
   *    → Correctly returns [0,1] because we check BEFORE storing
   *
   * 2. Negative numbers [-1,-2,-3,-4,-5], target=-8:
   *    → complement = -8 - (-3) = -5
   *    → Works exactly the same way
   *
   * 3. Answer at start [1,2,3], target=3:
   *    → i=0: store 1
   *    → i=1: complement=1, found! return [0,1]
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Two Sum - HASHMAP (OPTIMAL)\n");

    const testCases: {
      nums: number[];
      target: number;
      expected: number[];
      description: string;
    }[] = [
      // Basic examples
      {
        nums: [2, 7, 11, 15],
        target: 9,
        expected: [0, 1],
        description: "Example 1: Classic case",
      },
      {
        nums: [3, 2, 4],
        target: 6,
        expected: [1, 2],
        description: "Example 2: Answer not at start",
      },
      {
        nums: [3, 3],
        target: 6,
        expected: [0, 1],
        description: "Example 3: Duplicate values",
      },

      // Edge cases
      {
        nums: [1, 2],
        target: 3,
        expected: [0, 1],
        description: "Two element array",
      },
      {
        nums: [0, 4, 3, 0],
        target: 0,
        expected: [0, 3],
        description: "Target = 0 with zeros",
      },
      {
        nums: [-1, -2, -3, -4, -5],
        target: -8,
        expected: [2, 4],
        description: "All negative numbers",
      },
      {
        nums: [-3, 4, 3, 90],
        target: 0,
        expected: [0, 2],
        description: "Mixed negative and positive",
      },

      // Answer at different positions
      {
        nums: [1, 2, 3, 4, 5],
        target: 9,
        expected: [3, 4],
        description: "Answer at end",
      },
      {
        nums: [5, 75, 25],
        target: 100,
        expected: [1, 2],
        description: "Larger numbers",
      },
      {
        nums: [1, 5, 3, 2, 4],
        target: 7,
        expected: [1, 3],
        description: "Answer in middle",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { nums, target, expected, description } of testCases) {
      const result = twoSum(nums, target);
      // Sort both to compare (order within pair doesn't matter for validation)
      const isCorrect =
        result[0] === expected[0] && result[1] === expected[1];
      const status = isCorrect ? "✅" : "❌";

      if (isCorrect) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   nums = [${nums}], target = ${target}`);
        console.log(`   Output: [${result}]\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   nums = [${nums}], target = ${target}`);
        console.log(`   Expected: [${expected}], Got: [${result}]\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

// Run tests
TwoSumOptimal.runTests();