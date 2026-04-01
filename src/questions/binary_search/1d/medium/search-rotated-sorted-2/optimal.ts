/**
 * ═══════════════════════════════════════════════════════════
 * SEARCH IN ROTATED SORTED ARRAY II (WITH DUPLICATES) — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Rotated sorted array hai — lekin is baar DUPLICATES bhi ho sakte hain.
 * Target exist karta hai ya nahi → true/false return karo.
 * (Index nahi chahiye — sirf existence)
 *
 * EXAMPLE:
 *   nums = [2, 5, 6, 0, 0, 1, 2],  target = 0  → true
 *   nums = [2, 5, 6, 0, 0, 1, 2],  target = 3  → false
 *
 * KEY INSIGHT — Version 1 se sirf EK extra case:
 *
 * Version 1 mein: nums[left] <= nums[mid] → left half sorted (ALWAYS reliable)
 *
 * Duplicates ke saath yeh FAIL ho sakta hai:
 *   nums = [3, 1, 2, 3, 3, 3, 3],  left=0, mid=3
 *   nums[0]=3, nums[3]=3
 *   nums[left] <= nums[mid]? 3 <= 3 → YES → "left sorted" bolte hain
 *   Left half: [3, 1, 2, 3] → lekin yeh SORTED NAHI HAI! (3→1 break hai)
 *
 * Problem: Jab nums[left] == nums[mid], hum NAHI jaan sakte kaunsa half sorted hai.
 *
 * Solution: left++ karo (ek ek karke duplicates skip karo)
 *   Yeh search space ko shrink karta hai until ambiguity khatam ho.
 *
 * Worst Case: [3,3,3,3,3,1,3] — har step left++ → O(n) worst case
 * Average:    O(log n)
 *
 * TIME:  O(n) worst case, O(log n) average
 * SPACE: O(1)
 */

namespace SearchRotatedSorted2Optimal {

  function search(nums: number[], target: number): boolean {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // Exact match!
      if (nums[mid] === target) return true;

      // ─────────────────────────────────────────────────────
      // EXTRA CASE (only difference from Version 1):
      // nums[left] == nums[mid] → can't tell which half is sorted
      //
      // Example: [3, 1, 2, 3, 3, 3, 3]
      //           ↑        ↑
      //          left=0  mid=3  (both = 3)
      //
      // "Left sorted?" nums[0]=3 <= nums[3]=3? YES
      // But [3,1,2,3] has a break! → Wrong conclusion!
      //
      // Fix: skip left pointer (shrink the ambiguous side)
      // ─────────────────────────────────────────────────────
      if (nums[left] === nums[mid]) {
        left++;
        continue;
      }

      // From here: same as Version 1
      if (nums[left] < nums[mid]) {
        // LEFT HALF IS SORTED
        if (nums[left] <= target && target < nums[mid]) {
          right = mid - 1; // target in sorted left half
        } else {
          left = mid + 1;  // target must be in right half
        }
      } else {
        // RIGHT HALF IS SORTED (nums[left] > nums[mid])
        if (nums[mid] < target && target <= nums[right]) {
          left = mid + 1;  // target in sorted right half
        } else {
          right = mid - 1; // target must be in left half
        }
      }
    }

    return false;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Ambiguous case triggered ──────────────────
   * nums = [3, 1, 2, 3, 3, 3, 3],  target = 1
   *
   * idx:    0   1   2   3   4   5   6
   * val:    3   1   2   3   3   3   3
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=3 == 1? NO                                    │
   * │   nums[0]=3 == nums[3]=3? YES → AMBIGUOUS → left++      │
   * │   left=1                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=1, right=6, mid=3                          │
   * │   nums[3]=3 == 1? NO                                    │
   * │   nums[1]=1 == nums[3]=3? NO                            │
   * │   nums[1]=1 < nums[3]=3? YES → LEFT HALF SORTED         │
   * │   Left half: [1, 2, 3]  range = [1, 3)                 │
   * │   1 <= 1 < 3? YES → target in left half → right=2       │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=1, right=2, mid=1                          │
   * │   nums[1]=1 == 1? YES → return true ✅                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ── Example 2: Normal case (no ambiguity) ────────────────
   * nums = [2, 5, 6, 0, 0, 1, 2],  target = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=0 == 0? YES → return true ✅                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ── Example 3: Target not found ──────────────────────────
   * nums = [2, 5, 6, 0, 0, 1, 2],  target = 3
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 1: left=0, right=6, mid=3                          │
   * │   nums[3]=0 == 3? NO                                    │
   * │   nums[0]=2 == nums[3]=0? NO                            │
   * │   nums[0]=2 < nums[3]=0? NO → RIGHT HALF SORTED         │
   * │   Right half: [0, 1, 2]  range = (0, 2]                │
   * │   0 < 3 <= 2? NO → right = mid-1 = 2                   │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 2: left=0, right=2, mid=1                          │
   * │   nums[1]=5 == 3? NO                                    │
   * │   nums[0]=2 == nums[1]=5? NO                            │
   * │   nums[0]=2 < nums[1]=5? YES → LEFT HALF SORTED         │
   * │   Left half: [2, 5]  range = [2, 5)                    │
   * │   2 <= 3 < 5? YES → right = mid-1 = 0                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Iter 3: left=0, right=0, mid=0                          │
   * │   nums[0]=2 == 3? NO                                    │
   * │   nums[0]=2 == nums[0]=2? YES → AMBIGUOUS → left++      │
   * │   left=1                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=1 > right=0 → EXIT → return false ✅
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. All duplicates: [3,3,3,3,3], target=3 → true (found at mid immediately)
   * 2. All duplicates, not found: [3,3,3,3,3], target=1
   *    Every iter: left++ until left > right → false  (O(n) worst case)
   * 3. Single element: [1], target=1 → true | target=2 → false
   * 4. No rotation (sorted): [1,2,3,3,4], target=3 → true
   */

  export function runTests(): void {
    console.log('🧪 Testing Search Rotated Sorted 2 — OPTIMAL\n');

    const tests: Array<{ nums: number[]; target: number; expected: boolean }> = [
      { nums: [2, 5, 6, 0, 0, 1, 2], target: 0,  expected: true  }, // target exists
      { nums: [2, 5, 6, 0, 0, 1, 2], target: 3,  expected: false }, // target missing
      { nums: [3, 1, 2, 3, 3, 3, 3], target: 1,  expected: true  }, // ambiguous case triggers
      { nums: [3, 1, 2, 3, 3, 3, 3], target: 4,  expected: false }, // ambiguous + not found
      { nums: [3, 3, 3, 3, 3],       target: 3,  expected: true  }, // all duplicates, found
      { nums: [3, 3, 3, 3, 3],       target: 1,  expected: false }, // all duplicates, O(n) case
      { nums: [1],                   target: 1,  expected: true  }, // single element found
      { nums: [1],                   target: 2,  expected: false }, // single element not found
      { nums: [1, 1, 3, 1],          target: 3,  expected: true  }, // duplicates, target in right
      { nums: [1, 2, 3, 3, 4],       target: 3,  expected: true  }, // no rotation, duplicates
    ];

    tests.forEach(({ nums, target, expected }, i) => {
      const result = search(nums, target);
      const pass = result === expected;
      console.log(`Test ${i + 1}: nums=[${nums}], target=${target}`);
      console.log(`  Expected: ${expected} | Got: ${result} → ${pass ? '✅' : '❌'}`);
    });
  }
}

SearchRotatedSorted2Optimal.runTests();