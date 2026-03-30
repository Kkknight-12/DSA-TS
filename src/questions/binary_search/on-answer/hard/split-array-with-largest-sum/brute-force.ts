/**
 * SPLIT ARRAY LARGEST SUM - BRUTE FORCE (LINEAR SCAN)
 * =====================================================
 *
 * PROBLEM:
 * nums array hai aur k diya hai.
 * Array ko exactly k contiguous subarrays mein split karo.
 * Minimize karo: maximum sum jo kisi ek subarray ka hoga.
 *
 * Example:
 *   nums = [7, 2, 5, 10, 8],  k = 2
 *
 *   Option A: [7,2,5] | [10,8]   → sums = 14, 18  → max = 18 ✓
 *   Option B: [7,2,5,10] | [8]   → sums = 24,  8  → max = 24 ✗
 *   Option C: [7] | [2,5,10,8]   → sums =  7, 25  → max = 25 ✗
 *
 *   Answer = 18
 *
 * 💡 YEH BOOK ALLOCATION AUR PAINTER PARTITION JAISI HAI!
 * ─────────────────────────────────────────────────────────
 * Book Allocation:   students ko books do   → minimize max pages
 * Painter Partition: painters ko boards do  → minimize max time
 * Split Array:       k parts mein split karo → minimize max sum
 *
 * Algorithm EXACTLY same hai — sirf theme alag hai!
 *
 * INTUITION (Soch):
 * ─────────────────
 * Search space: possible "max sum" values = [max(nums) .. sum(nums)]
 *
 * left  = max(nums)  → WHY: Sabse bada element akela ek subarray mein hoga minimum case mein.
 *                           Is se kam max sum impossible — woh element kisi subarray mein toh hoga.
 * right = sum(nums)  → WHY: k=1 ho toh ek subarray mein sab elements → sum = total sum.
 *
 * Brute force: har possible max sum try karo left se right tak.
 * Pehla max sum jis pe k subarrays mein split ho jaaye → woh answer hai!
 *
 * countSubarrays helper (Greedy):
 * Greedy assignment — current subarray mein elements daalo jab tak max sum cross na ho.
 * Cross hone pe next subarray. Count karo kitne subarrays lage.
 *
 * TIME:  O((sum - max) × n) — linear scan × greedy check
 * SPACE: O(1)
 *
 * @param nums - Array of non-negative integers
 * @param k - Number of subarrays to split into
 * @returns Minimized largest sum of any subarray
 */

namespace SplitArrayBruteForce {
  /**
   * Greedy helper: given maxSum limit, kitne subarrays lagte hain?
   */
  function countSubarrays(nums: number[], maxSum: number): number {
    let count = 1;        // Pehle subarray se shuru
    let currentSum = 0;   // Current subarray ka sum

    for (const num of nums) {
      if (currentSum + num <= maxSum) {
        // Current subarray mein yeh element le sakte hain
        currentSum += num;
      } else {
        // Nahi le sakte → next subarray shuru karo
        count++;
        currentSum = num;
      }
    }

    return count;
  }

  function splitArray(nums: number[], k: number): number {
    // Search space: max(nums) to sum(nums)
    const left = Math.max(...nums);
    const right = nums.reduce((sum, n) => sum + n, 0);

    // Har possible max sum try karo — pehla valid = answer
    for (let maxSum = left; maxSum <= right; maxSum++) {
      if (countSubarrays(nums, maxSum) <= k) {
        return maxSum;
      }
    }

    return right; // Should never reach here
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: nums=[7,2,5,10,8], k=2
   * left = max(7,2,5,10,8) = 10
   * right = 7+2+5+10+8 = 32
   *
   * ═══════════════════════════════════════════════════════════
   * LINEAR SCAN
   * ═══════════════════════════════════════════════════════════
   *
   * maxSum=10:
   * ┌──────────────────────────────────────────────────────────┐
   * │ countSubarrays(10)?                                      │
   * │   num=7:  0+7=7   ≤ 10 → cur=7                          │
   * │   num=2:  7+2=9   ≤ 10 → cur=9                          │
   * │   num=5:  9+5=14  > 10 → count=2, cur=5                 │
   * │   num=10: 5+10=15 > 10 → count=3, cur=10                │
   * │   num=8:  10+8=18 > 10 → count=4, cur=8                 │
   * │   count=4 > k=2 → NOT OK                                 │
   * └──────────────────────────────────────────────────────────┘
   * ... (same for 11..17)
   *
   * maxSum=18:
   * ┌──────────────────────────────────────────────────────────┐
   * │ countSubarrays(18)?                                      │
   * │   num=7:  0+7=7   ≤ 18 → cur=7                          │
   * │   num=2:  7+2=9   ≤ 18 → cur=9                          │
   * │   num=5:  9+5=14  ≤ 18 → cur=14                         │
   * │   num=10: 14+10=24 > 18 → count=2, cur=10               │
   * │   num=8:  10+8=18 ≤ 18 → cur=18                         │
   * │   count=2 ≤ k=2 → TRUE ✅                                │
   * │                                                          │
   * │   Subarray 1: [7, 2, 5] = 14                            │
   * │   Subarray 2: [10, 8]   = 18                            │
   * │   Max sum    = 18 ✅                                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * return 18 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. k = n: Har element apna subarray → max sum = max(nums)
   *    left=max, countSubarrays(max)=1 element per part? nahi...
   *    Actually: left=max, any element ≤ max fits alone → n subarrays ≤ k → return max ✓
   *
   * 2. k = 1: Ek hi subarray → sum = total sum
   *    Only right works → return sum ✓
   *
   * 3. All same: [5,5,5,5], k=2
   *    [5,5] | [5,5] = 10 → answer=10 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Split Array Largest Sum - BRUTE FORCE\n");

    const testCases: {
      nums: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      {
        nums: [7, 2, 5, 10, 8], k: 2,
        expected: 18,
        description: "Classic: [7,2,5]|[10,8] → max=18",
      },
      {
        nums: [1, 2, 3, 4, 5], k: 2,
        expected: 9,
        description: "[1,2,3,4]|[5]? = 10,5 or [1,2,3]|[4,5] = 6,9 → max=9",
      },
      {
        nums: [1, 2, 3, 4, 5], k: 5,
        expected: 5,
        description: "k=n: each element own subarray → max=5",
      },
      {
        nums: [1, 2, 3, 4, 5], k: 1,
        expected: 15,
        description: "k=1: one subarray → sum=15",
      },
      {
        nums: [5, 5, 5, 5], k: 2,
        expected: 10,
        description: "Equal elements: [5,5]|[5,5] → max=10",
      },
      {
        nums: [10], k: 1,
        expected: 10,
        description: "Single element → 10",
      },
      {
        nums: [1, 4, 4], k: 3,
        expected: 4,
        description: "k=n: each alone → max=4",
      },
      {
        nums: [2, 3, 1, 1, 1, 1, 1], k: 5,
        expected: 3,
        description: "[2]|[3]|[1,1,1]|[1]|[1] → max=3",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { nums, k, expected, description } of testCases) {
      const result = splitArray([...nums], k);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   nums=[${nums}], k=${k}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   nums=[${nums}], k=${k}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

SplitArrayBruteForce.runTests();
