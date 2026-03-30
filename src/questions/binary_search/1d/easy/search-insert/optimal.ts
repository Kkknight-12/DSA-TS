/**
 * SEARCH INSERT POSITION - BINARY SEARCH
 * ========================================
 *
 * PROBLEM:
 * Sorted array of distinct integers hai. Target diya hai.
 * - Target array mein hai → uska index return karo
 * - Target nahi hai       → woh index return karo jahan insert hoga (sorted order maintain)
 *
 * Example:
 *   nums = [1, 3, 5, 6],  target = 5
 *   5 array mein hai at index 2 → return 2
 *
 *   nums = [1, 3, 5, 6],  target = 2
 *   2 nahi hai. 1 aur 3 ke beech jayega → return 1
 *
 *   nums = [1, 3, 5, 6],  target = 7
 *   7 nahi hai. Sab se baad → return 4 (= n)
 *
 * 💡 YEH LOWER BOUND HI HAI!
 * ────────────────────────────
 * "Pehla index jahan nums[i] >= target ho" = Lower Bound
 *
 * Case 1: target exists → nums[lb] == target → woh index hi answer hai ✓
 * Case 2: target nahi   → nums[lb] > target  → lb pe insert hoga ✓
 *
 * Dono cases mein lower bound hi return karna hai!
 *
 * INTUITION (Soch):
 * ─────────────────
 * Agar target = 2, nums = [1, 3, 5, 6]:
 *
 *   idx:  0   1   2   3
 *   val:  1   3   5   6
 *
 *   Jahan bhi 2 insert karein, sorted rehna chahiye.
 *   1 ke baad, 3 se pehle → index 1 pe insert karo.
 *
 *   Lower Bound (>= 2) → pehla element >= 2 = 3, index 1 ✓
 *
 * MONOTONIC pattern:
 *   nums = [1, 3, 5, 6],  target = 2
 *   idx:    0  1  2  3
 *
 *   >=2?:   ✗  ✓  ✓  ✓
 *              ↑
 *         first ✓ = index 1 = ANSWER
 *
 * ALGORITHM: (Pattern 2 — same as Lower Bound)
 * ─────────────────────────────────────────────
 * 1. left=0, right=n
 * 2. While left < right:
 *    a. mid = (left+right)/2
 *    b. nums[mid] >= target? → right=mid
 *    c. else                 → left=mid+1
 * 3. return left
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 *
 * @param nums - Sorted array of distinct integers
 * @param target - Value to find or insert
 * @returns Index of target, or insertion position if not found
 */

namespace SearchInsertOptimal {
  function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length;  // WHY n: agar sab se bada ho toh n pe insert hoga

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] >= target) {
        // mid pe element target se bada ya barabar → valid insertion point
        // lekin koi pehle wala bhi ho sakta hai
        right = mid;
      } else {
        // nums[mid] < target → yeh aur sab left invalid
        left = mid + 1;
      }
    }

    // left = first index where nums[i] >= target
    // = target ka index (agar exist karta hai)
    // = insertion position (agar exist nahi karta)
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ─── Case 1: Target EXISTS ────────────────────────────────
   *
   * nums=[1,3,5,6], target=5
   * left=0, right=4
   *
   * idx:  0   1   2   3
   * val:  1   3   5   6
   * >=5?  ✗   ✗   ✓   ✓   → first ✓ at index 2
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=4, mid=2                                   │
   * │ nums[2]=5 >= target=5? YES ✓                             │
   * │ → right=2                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=2, mid=1                                   │
   * │ nums[1]=3 >= target=5? NO ✗                              │
   * │ → left=2                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=2 === right=2 → return 2 ✅
   * nums[2]=5 = target → target found at index 2!
   *
   * ─── Case 2: Target NOT in array ──────────────────────────
   *
   * nums=[1,3,5,6], target=2
   * left=0, right=4
   *
   * idx:  0   1   2   3
   * val:  1   3   5   6
   * >=2?  ✗   ✓   ✓   ✓   → first ✓ at index 1
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=4, mid=2                                   │
   * │ nums[2]=5 >= target=2? YES ✓                             │
   * │ → right=2                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=2, mid=1                                   │
   * │ nums[1]=3 >= target=2? YES ✓                             │
   * │ → right=1                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=1, mid=0                                   │
   * │ nums[0]=1 >= target=2? NO ✗                              │
   * │ → left=1                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=1 === right=1 → return 1 ✅
   * Insert 2 at index 1: [1, →2←, 3, 5, 6] ✓ sorted!
   *
   * ─── Case 3: Target larger than all ───────────────────────
   *
   * nums=[1,3,5,6], target=7
   *
   * idx:  0   1   2   3
   * val:  1   3   5   6
   * >=7?  ✗   ✗   ✗   ✗   → no ✓ → left reaches n=4
   *
   * return 4 ✅  (insert at end: [1,3,5,6, →7←])
   *
   * ═══════════════════════════════════════════════════════════
   * WHY THIS IS LOWER BOUND
   * ═══════════════════════════════════════════════════════════
   *
   * Lower Bound definition: first index where arr[i] >= x
   *
   * Search Insert definition:
   *   "index of target OR index where it would be inserted"
   *
   * These are the SAME thing:
   *   If target exists at index i → arr[i] >= target (= target) → LB = i ✓
   *   If target not there → LB gives first index where arr[i] > target
   *                       → that's exactly where we'd insert target ✓
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. target < nums[0]: Insert at beginning → return 0
   *    All nums[i] >= target → right shrinks to 0 ✓
   *
   * 2. target > nums[n-1]: Insert at end → return n
   *    No nums[i] >= target → left grows to n ✓
   *
   * 3. target = nums[0]: Found at index 0 → return 0 ✓
   *
   * 4. Single element:
   *    nums=[3], target=3 → return 0 ✓
   *    nums=[3], target=1 → return 0 ✓ (insert before)
   *    nums=[3], target=5 → return 1 ✓ (insert after)
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Search Insert Position - BINARY SEARCH\n");

    const testCases: {
      nums: number[];
      target: number;
      expected: number;
      description: string;
    }[] = [
      {
        nums: [1, 3, 5, 6], target: 5,
        expected: 2,
        description: "Target exists: 5 found at index 2",
      },
      {
        nums: [1, 3, 5, 6], target: 2,
        expected: 1,
        description: "Target missing: 2 inserts between 1 and 3 → index 1",
      },
      {
        nums: [1, 3, 5, 6], target: 7,
        expected: 4,
        description: "Target > all: insert at end → index n=4",
      },
      {
        nums: [1, 3, 5, 6], target: 0,
        expected: 0,
        description: "Target < all: insert at beginning → index 0",
      },
      {
        nums: [1, 3, 5, 6], target: 1,
        expected: 0,
        description: "Target = first element: found at index 0",
      },
      {
        nums: [1, 3, 5, 6], target: 6,
        expected: 3,
        description: "Target = last element: found at index 3",
      },
      {
        nums: [1, 3, 5, 6], target: 4,
        expected: 2,
        description: "Target missing: 4 inserts between 3 and 5 → index 2",
      },
      {
        nums: [3], target: 3,
        expected: 0,
        description: "Single element, target matches → index 0",
      },
      {
        nums: [3], target: 1,
        expected: 0,
        description: "Single element, target smaller → insert before → index 0",
      },
      {
        nums: [3], target: 5,
        expected: 1,
        description: "Single element, target larger → insert after → index 1",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { nums, target, expected, description } of testCases) {
      const result = searchInsert([...nums], target);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   nums=[${nums}], target=${target}`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   nums=[${nums}], target=${target}`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

SearchInsertOptimal.runTests();
