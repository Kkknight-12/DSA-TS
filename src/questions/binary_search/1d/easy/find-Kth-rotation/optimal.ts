/**
 * FIND K-TH ROTATION - BINARY SEARCH
 * =====================================
 *
 * PROBLEM:
 * Ek sorted array ko k times rotate kiya gaya hai.
 * Woh k dhundho — kitni baar rotate hua?
 *
 * Rotation matlab: pehla element end mein chala jaata hai.
 *
 *   Original:  [1, 2, 3, 4, 5]
 *   k=1:       [5, 1, 2, 3, 4]   ← 5 end se front pe aaya
 *   k=2:       [4, 5, 1, 2, 3]
 *   k=3:       [3, 4, 5, 1, 2]
 *   k=4:       [2, 3, 4, 5, 1]
 *   k=5:       [1, 2, 3, 4, 5]   ← full circle = original
 *
 * Example:
 *   arr = [4, 5, 6, 7, 0, 1, 2]
 *   Answer = 4  (4 rotations kiye)
 *
 * 💡 KEY INSIGHT: k = index of minimum element
 * ───────────────────────────────────────────────
 * Kyun? Simulate karo:
 *
 *   Original: [0, 1, 2, 4, 5, 6, 7]
 *              ↑
 *           minimum at index 0, k=0 rotations
 *
 *   After 1 rotation: [7, 0, 1, 2, 4, 5, 6]
 *                          ↑
 *                      minimum at index 1, k=1 ✓
 *
 *   After 4 rotations: [4, 5, 6, 7, 0, 1, 2]
 *                                   ↑
 *                               minimum at index 4, k=4 ✓
 *
 * Jab array k baar rotate hota hai:
 *   - Minimum element (original index 0) index k pe chala jaata hai
 *   - Isliye minimum ka index = k
 *
 * Toh problem reduce ho gayi: **minimum element ka index dhundho!**
 *
 * INTUITION (Soch):
 * ─────────────────
 * Rotated sorted array mein ek "break point" hota hai:
 *
 *   arr = [4, 5, 6, 7, 0, 1, 2]
 *                      ↑
 *                  break point (yahan sequence girta hai)
 *
 * Left side of break: sorted, bade values
 * Right side of break: sorted, chhote values
 *
 * arr[mid] > arr[right] → mid left side pe hai (bada part) → minimum right mein
 * arr[mid] ≤ arr[right] → mid right side pe hai (chota part) → minimum left mein ya mid pe
 *
 * ALGORITHM:
 * ──────────
 * 1. Edge case: arr[0] < arr[n-1] → array not rotated → return 0
 * 2. left=0, right=n-1
 * 3. While left < right:
 *    a. mid = (left+right)/2
 *    b. arr[mid] > arr[right]? → left=mid+1   (minimum in right half)
 *    c. else                   → right=mid    (minimum in left half or at mid)
 * 4. return left  (= index of minimum = k)
 *
 * TIME:  O(log n)
 * SPACE: O(1)
 *
 * @param arr - Rotated sorted array of distinct elements
 * @returns Number of rotations k
 */

namespace FindKthRotationOptimal {
  function findKthRotation(arr: number[]): number {
    const n = arr.length;

    // Edge case: array not rotated (or rotated n times = full circle)
    // WHY: Agar arr[0] < arr[n-1] → sorted order intact → 0 rotations
    if (arr[0] < arr[n - 1]) return 0;

    let left = 0;
    let right = n - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] > arr[right]) {
        // mid left (larger) half mein hai → minimum right mein hai
        left = mid + 1;
      } else {
        // mid right (smaller) half mein hai → minimum left mein ya mid pe hi hai
        right = mid;
      }
    }

    // left = index of minimum element = number of rotations
    return left;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example: arr=[4,5,6,7,0,1,2]
   * n=7, left=0, right=6
   *
   * Array visualization:
   *   idx:  0   1   2   3   4   5   6
   *   val:  4   5   6   7   0   1   2
   *                         ↑
   *                    minimum = 0
   *                    index = 4 → k = 4
   *
   * Break point:
   *   [4, 5, 6, 7 | 0, 1, 2]
   *    ←── big ──→ ←─ small─→
   *
   * ═══════════════════════════════════════════════════════════
   * BINARY SEARCH ITERATIONS
   * ═══════════════════════════════════════════════════════════
   *
   * Iteration 1:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=0, right=6, mid=3                                   │
   * │ arr[3]=7 > arr[6]=2? YES                                 │
   * │ mid is in the big (left) half → minimum is to the right  │
   * │ → left=4                                                 │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 2:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=4, right=6, mid=5                                   │
   * │ arr[5]=1 > arr[6]=2? NO                                  │
   * │ mid is in the small (right) half → minimum at mid or left│
   * │ → right=5                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Iteration 3:
   * ┌──────────────────────────────────────────────────────────┐
   * │ left=4, right=5, mid=4                                   │
   * │ arr[4]=0 > arr[5]=1? NO                                  │
   * │ → right=4                                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * left=4 === right=4 → EXIT
   * return 4 ✅
   *
   * Verification: arr[4]=0 is minimum. 4 rotations done ✓
   *
   * Search space narrowing:
   *   [0 ────────── 6]
   *   [4 ────────── 6]    arr[3]=7 > arr[6]=2, minimum right mein
   *   [4 ──── 5]          arr[5]=1 ≤ arr[6]=2, minimum left ya mid
   *   [4 == 4] → done!    arr[4]=0 ≤ arr[5]=1, minimum left ya mid
   *
   * ═══════════════════════════════════════════════════════════
   * WHY arr[mid] vs arr[right]? (not arr[mid] vs arr[left])
   * ═══════════════════════════════════════════════════════════
   *
   * arr[right] always reliable reference point:
   *   - Right side ka last element fixed rehta hai iteration ke dौरान
   *   - arr[left] reliable nahi — jab left=mid+1 hota hai, arr[left] change ho jaata hai
   *
   * arr[mid] > arr[right]:
   *   arr=[4,5,6,7,0,1,2], mid=3: arr[3]=7 > arr[6]=2
   *   Matlab mid left (big) half mein hai → break point right mein
   *
   * arr[mid] ≤ arr[right]:
   *   arr=[4,5,6,7,0,1,2], mid=5: arr[5]=1 ≤ arr[6]=2
   *   Matlab mid right (small) half mein hai → break point mid ya left mein
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. No rotation: arr=[1,2,3,4,5]
   *    arr[0]=1 < arr[4]=5 → return 0 ✓
   *
   * 2. Rotated once: arr=[5,1,2,3,4]
   *    Minimum = 1 at index 1 → return 1 ✓
   *
   * 3. Rotated n-1 times: arr=[2,3,4,5,1]
   *    Minimum = 1 at index 4 → return 4 ✓
   *
   * 4. Single element: arr=[5]
   *    arr[0] not < arr[0] → return 0 ✓
   *
   * 5. Two elements rotated: arr=[2,1]
   *    Minimum = 1 at index 1 → return 1 ✓
   */

  // ═══════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing Find Kth Rotation - BINARY SEARCH\n");

    const testCases: {
      arr: number[];
      expected: number;
      description: string;
    }[] = [
      {
        arr: [4, 5, 6, 7, 0, 1, 2],
        expected: 4,
        description: "Classic: minimum 0 at index 4 → k=4",
      },
      {
        arr: [1, 2, 3, 4, 5],
        expected: 0,
        description: "Not rotated: arr[0] < arr[n-1] → k=0",
      },
      {
        arr: [5, 1, 2, 3, 4],
        expected: 1,
        description: "Rotated once: minimum 1 at index 1 → k=1",
      },
      {
        arr: [2, 3, 4, 5, 1],
        expected: 4,
        description: "Rotated n-1 times: minimum 1 at index 4 → k=4",
      },
      {
        arr: [3, 4, 5, 1, 2],
        expected: 3,
        description: "Rotated 3 times: minimum 1 at index 3",
      },
      {
        arr: [2, 1],
        expected: 1,
        description: "Two elements rotated: minimum 1 at index 1",
      },
      {
        arr: [1, 2],
        expected: 0,
        description: "Two elements not rotated: k=0",
      },
      {
        arr: [5],
        expected: 0,
        description: "Single element: k=0",
      },
      {
        arr: [7, 8, 9, 1, 2, 3, 4],
        expected: 3,
        description: "Minimum 1 at index 3 → k=3",
      },
      {
        arr: [11, 13, 15, 17, 2, 5, 7],
        expected: 4,
        description: "Minimum 2 at index 4 → k=4",
      },
    ];

    let passed = 0;
    let failed = 0;

    for (const { arr, expected, description } of testCases) {
      const result = findKthRotation([...arr]);
      const status = result === expected ? "✅" : "❌";

      if (result === expected) {
        passed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}]`);
        console.log(`   Output: ${result}\n`);
      } else {
        failed++;
        console.log(`${status} ${description}`);
        console.log(`   arr=[${arr}]`);
        console.log(`   Expected: ${expected}, Got: ${result}\n`);
      }
    }

    console.log("═".repeat(60));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
  }
}

FindKthRotationOptimal.runTests();
