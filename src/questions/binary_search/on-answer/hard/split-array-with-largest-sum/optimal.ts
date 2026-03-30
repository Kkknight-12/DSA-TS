/**
 * SPLIT ARRAY LARGEST SUM - BINARY SEARCH ON ANSWER (OPTIMAL)
 * =============================================================
 *
 * PROBLEM:
 * nums array hai aur k diya hai.
 * Array ko exactly k contiguous subarrays mein split karo.
 * Minimize karo: maximum sum jo kisi ek subarray ka hoga.
 *
 * 💡 YEH BOOK ALLOCATION AUR PAINTER PARTITION JAISI HAI!
 * ─────────────────────────────────────────────────────────
 *   Book Allocation:   students ko books do   → minimize max PAGES
 *   Painter Partition: painters ko boards do  → minimize max TIME
 *   Split Array:       k parts mein split karo → minimize max SUM
 *
 *   Same algorithm. Same pattern. Sirf theme alag hai!
 *
 * | Book Allocation | Painter Partition | Split Array     |
 * |-----------------|-------------------|-----------------|
 * | pages           | board lengths     | nums values     |
 * | students (m)    | painters (k)      | parts (k)       |
 * | max pages       | max time          | max sum         |
 * | isPossible()    | canPaint()        | canSplit()      |
 *
 * INTUITION (Soch):
 * ─────────────────
 * Zyada max sum allow karo → ek subarray mein zyada elements → kam splits chahiye → easy
 * Kam max sum allow karo   → ek subarray mein kam elements   → zyada splits chahiye → hard
 *
 * MONOTONIC pattern:
 *   maxSum: 10  12  15  18  20  ... 32
 *   valid:   ✗   ✗   ✗   ✓   ✓  ...  ✓
 *                        ↑
 *                 first ✓ = ANSWER = 18
 *
 * Binary search karo maxSum pe! MINIMIZE → Pattern 2 (left < right, right=mid).
 *
 * SEARCH SPACE:
 * ─────────────
 * left  = max(nums)   → WHY: Sabse bada element kisi ek subarray mein hoga.
 *                            Is se kam sum mein woh element fit hi nahi hoga.
 * right = sum(nums)   → WHY: k=1 ho toh ek subarray mein sab → total sum = answer.
 *
 * canSplit HELPER (Greedy):
 * ─────────────────────────
 * Given maxSum, greedily fill subarrays:
 *   Current subarray mein elements daalo jab tak total ≤ maxSum.
 *   Total cross ho → next subarray.
 *   Count subarrays needed. Agar ≤ k → possible!
 *
 * ALGORITHM:
 * ──────────
 * 1. left=max(nums), right=sum(nums)
 * 2. While left < right:
 *    a. mid = (left+right)/2
 *    b. canSplit(mid)? → right=mid    (possible, try smaller)
 *    c. else           → left=mid+1   (need bigger max sum)
 * 3. return left
 *
 * TIME:  O(n × log(sum - max))
 * SPACE: O(1)
 *
 * @param nums - Array of non-negative integers
 * @param k - Number of subarrays to split into
 * @returns Minimized largest sum of any subarray
 */

namespace SplitArrayOptimal {
  /**
   * Greedy helper: kya maxSum limit rakhte hue k subarrays mein split ho sakta hai?
   */
  function canSplit(nums: number[], k: number, maxSum: number): boolean {
    let subarrays = 1;    // Pehle subarray se shuru
    let currentSum = 0;   // Current subarray ka accumulated sum

    for (const num of nums) {
      if (currentSum + num <= maxSum) {
        // Current subarray yeh element le sakta hai
        currentSum += num;
      } else {
        // Nahi le sakta → next subarray
        subarrays++;
        currentSum = num;

        // Early exit: subarrays limit exceed ho gayi
        if (subarrays > k) return false;
      }
    }

    return true;
  }

  function splitArray(nums: number[], k: number): number {
    // Search space
    let left = Math.max(...nums);
    let right = nums.reduce((sum, n) => sum + n, 0);

    // MINIMIZE pattern: Pattern 2 (left < right, right = mid)
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (canSplit(nums, k, mid)) {
        // mid maxSum pe split ho sakta hai — try smaller
        right = mid;
      } else {
        // mid pe nahi hota — bigger maxSum chahiye
        left = mid + 1;
      }
    }

    // left === right → minimum valid maxSum
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: nums=[7,2,5,10,8], k=2
   *
   * left = max(7,2,5,10,8) = 10
   * right = 7+2+5+10+8    = 32
   *
   * Monotonic pattern:
   *   maxSum: 10  14  15  16  17  18  20 ... 32
   *   valid:   ✗   ✗   ✗   ✗   ✗   ✓   ✓ ...  ✓
   *                                   ↑
   *                              answer = 18
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=10, right=32, mid=21                                │
   * │ canSplit(maxSum=21)?                                     │
   * │   num=7:  0+7=7   ≤ 21 → cur=7                          │
   * │   num=2:  7+2=9   ≤ 21 → cur=9                          │
   * │   num=5:  9+5=14  ≤ 21 → cur=14                         │
   * │   num=10: 14+10=24 > 21 → subarrays=2, cur=10           │
   * │   num=8:  10+8=18 ≤ 21 → cur=18                         │
   * │   subarrays=2 ≤ k=2 → TRUE ✅                            │
   * │ → right=21                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=10, right=21, mid=15                                │
   * │ canSplit(maxSum=15)?                                     │
   * │   num=7:  0+7=7   ≤ 15 → cur=7                          │
   * │   num=2:  7+2=9   ≤ 15 → cur=9                          │
   * │   num=5:  9+5=14  ≤ 15 → cur=14                         │
   * │   num=10: 14+10=24 > 15 → subarrays=2, cur=10           │
   * │   num=8:  10+8=18 > 15 → subarrays=3 > k=2 → FALSE ✗   │
   * │ → left=16                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=16, right=21, mid=18                                │
   * │ canSplit(maxSum=18)?                                     │
   * │   num=7:  0+7=7   ≤ 18 → cur=7                          │
   * │   num=2:  7+2=9   ≤ 18 → cur=9                          │
   * │   num=5:  9+5=14  ≤ 18 → cur=14                         │
   * │   num=10: 14+10=24 > 18 → subarrays=2, cur=10           │
   * │   num=8:  10+8=18 ≤ 18 → cur=18                         │
   * │   subarrays=2 ≤ k=2 → TRUE ✅                            │
   * │ → right=18                                               │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 4:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=16, right=18, mid=17                                │
   * │ canSplit(maxSum=17)?                                     │
   * │   num=7:  0+7=7   ≤ 17 → cur=7                          │
   * │   num=2:  7+2=9   ≤ 17 → cur=9                          │
   * │   num=5:  9+5=14  ≤ 17 → cur=14                         │
   * │   num=10: 14+10=24 > 17 → subarrays=2, cur=10           │
   * │   num=8:  10+8=18 > 17 → subarrays=3 > k=2 → FALSE ✗   │
   * │ → left=18                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=18 === right=18 → EXIT
   * return 18 ✅
   *
   * Search space narrowing:
   *   [10 ──────────────── 32]
   *   [10 ──────── 21]          maxSum 21 valid, go left
   *   [16 ──────── 21]          maxSum 15 invalid, go right
   *   [16 ──── 18]              maxSum 18 valid, go left
   *   [18 == 18] → answer!      maxSum 17 invalid, go right → done
   *
   * Final split:
   *   Subarray 1: [7, 2, 5] → sum = 14
   *   Subarray 2: [10, 8]   → sum = 18 ← maximum
   *   Answer = 18 ✅
   *
   * ═══════════════════════════════════════════════════════════
   * COMPARISON WITH SIBLINGS
   * ═══════════════════════════════════════════════════════════
   *
   * Book Allocation            Painter Partition          Split Array
   * ─────────────────────────────────────────────────────────────────
   * arr = book pages           boards = board lengths     nums values
   * m   = students             k      = painters          k = parts
   * max pages per student      max time per painter       max sum per part
   * MINIMIZE max pages         MINIMIZE max time          MINIMIZE max sum
   * left = max(arr)            left = max(boards)         left = max(nums)
   * right = sum(arr)           right = sum(boards)        right = sum(nums)
   * isPossible(maxPages)       canPaint(maxTime)          canSplit(maxSum)
   *
   * Algorithm: IDENTICAL! 🎯
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. k ≥ n: Har element apne subarray mein → answer = max(nums)
   *    left=max, canSplit(max) true (each element ≤ max, n parts ≤ k) → return max ✓
   *
   * 2. k = 1: Ek subarray sab elements → answer = sum(nums)
   *    left keeps moving right until sum → return sum ✓
   *
   * 3. All equal [5,5,5,5], k=2: [5,5]|[5,5] → answer=10 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Split Array Largest Sum - BINARY SEARCH (OPTIMAL)\n");

    const testCases: {
      nums: number[];
      k: number;
      expected: number;
      description: string;
    }[] = [
      {
        nums: [7, 2, 5, 10, 8], k: 2,
        expected: 18,
        description: "Classic 4-iteration dry run: answer=18",
      },
      {
        nums: [1, 2, 3, 4, 5], k: 2,
        expected: 9,
        description: "[1,2,3]|[4,5] → sums=6,9 → max=9",
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
        description: "k=n=3: [1]|[4]|[4] → max=4",
      },
      {
        nums: [2, 3, 1, 1, 1, 1, 1], k: 5,
        expected: 3,
        description: "[2]|[3]|[1,1]|[1,1]|[1] → max=3",
      },
      {
        nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 3,
        expected: 21,
        description: "Sum=55, k=3: [1..6]=21 | [7,8]=15 | [9,10]=19 → max=21",
      },
      {
        nums: [100, 200, 300, 400, 500], k: 5,
        expected: 500,
        description: "k=n: each alone → max=500",
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

SplitArrayOptimal.runTests();
