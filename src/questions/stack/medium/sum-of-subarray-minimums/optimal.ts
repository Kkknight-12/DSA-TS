/**
 * 907. Sum of Subarray Minimums - OPTIMAL SOLUTION
 *
 * Visualizer -> https://gemini.google.com/app/83115fb503bc83d5
 *
 * Approach: Monotonic Stack + Contribution Technique
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * KEY INSIGHT:
 * Instead of generating all subarrays, we ask:
 * "For each element, in HOW MANY subarrays is it the minimum?"
 *
 * Contribution of arr[i] = arr[i] × (count of subarrays where it's minimum)
 * Total answer = Sum of all contributions
 */

namespace SumOfSubarrayMinimumsOptimal {
  const MOD = 1_000_000_007;

  /**
   * Main function to calculate sum of subarray minimums
   *
   * STRATEGY:
   * 1. For each element, find the "range" where it's the minimum
   * 2. Range is defined by:
   *    - PLE (Previous Less Element) - left boundary
   *    - NLE (Next Less Element) - right boundary
   * 3. Count subarrays = (i - PLE) × (NLE - i)
   * 4. Contribution = arr[i] × count
   */
  export function sumSubarrayMins(arr: number[]): number {
    const n = arr.length;

    // Edge Case: Empty array
    // WHY: No subarrays to process
    if (n === 0) return 0;

    // Edge Case: Single element
    // WHY: Only one subarray [arr[0]], minimum is arr[0]
    // EXAMPLE: arr = [5] → answer = 5
    if (n === 1) return arr[0] % MOD;

    // Step 1: Find Previous Less Element (PLE) for each index
    // WHY: PLE defines the left boundary where arr[i] is minimum
    // EXAMPLE: arr = [3,1,2,4], for arr[2]=2, PLE is at index 1 (value 1)
    const ple = findPreviousLessElement(arr);

    // Step 2: Find Next Less Element (NLE) for each index
    // WHY: NLE defines the right boundary where arr[i] is minimum
    // EXAMPLE: arr = [3,1,2,4], for arr[1]=1, NLE is n=4 (no smaller to right)
    const nle = findNextLessElement(arr);

    // Step 3: Calculate contribution of each element
    // WHY: Each element contributes to multiple subarrays
    let totalSum = 0;

    for (let i = 0; i < n; i++) {
      // Calculate how many positions we can start the subarray from (to the left of i)
      // WHY: We can start from any index after PLE up to i (inclusive)
      // EXAMPLE: If PLE = -1 and i = 2, leftCount = 2 - (-1) = 3
      //          Means we can start from index 0, 1, or 2
      const leftCount = i - ple[i];

      // Calculate how many positions we can end the subarray at (to the right of i)
      // WHY: We can end at i or any index before NLE
      // EXAMPLE: If NLE = 4 and i = 1, rightCount = 4 - 1 = 3
      //          Means we can end at index 1, 2, or 3
      const rightCount = nle[i] - i;

      // Total subarrays where arr[i] is minimum
      // WHY: For each left starting position, we can choose any right ending position
      // FORMULA: leftCount × rightCount
      // EXAMPLE: leftCount=2, rightCount=3 → 2×3 = 6 subarrays
      const subarrayCount = leftCount * rightCount;

      // Contribution of arr[i] to the total sum
      // WHY: arr[i] is the minimum in 'subarrayCount' subarrays
      // EXAMPLE: arr[i]=5, subarrayCount=6 → contribution = 5×6 = 30
      const contribution = (arr[i] * subarrayCount) % MOD;

      // Add to total (with modulo to prevent overflow)
      // WHY: We need to return answer modulo 10^9 + 7
      totalSum = (totalSum + contribution) % MOD;
    }

    return totalSum;
  }

  /**
   * Find Previous Less Element (PLE) index for each element
   *
   * CONCEPT:
   * For each arr[i], find the closest index j (j < i) where arr[j] < arr[i]
   * If no such element exists, PLE = -1
   *
   * WHY MONOTONIC STACK?
   * - We maintain elements in increasing order
   * - When we see a smaller element, we pop larger ones (they're useless now)
   * - Stack top always gives us the previous less element
   *
   * IMPORTANT - DUPLICATES HANDLING:
   * We use STRICTLY LESS (<) here to avoid double counting
   */
  function findPreviousLessElement(arr: number[]): number[] {
    const n = arr.length;
    const ple: number[] = new Array(n);
    const stack: number[] = []; // Stores INDICES (monotonic increasing by value)

    // Traverse LEFT to RIGHT
    // WHY: We're looking for "previous" less element, so go forward
    for (let i = 0; i < n; i++) {
      // Pop elements that are >= current
      // WHY: We need STRICTLY LESS for PLE (< not <=)
      //      This handles duplicates - if arr[j] == arr[i], we don't consider j as PLE
      // EXAMPLE: arr = [2, 2], for i=1, we pop index 0 because arr[0]=2 is not < arr[1]=2
      while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
        stack.pop();
      }

      // If stack is empty, no previous less element
      // WHY: All elements to the left are >= arr[i]
      // EXAMPLE: arr = [3,1,2], for arr[0]=3, stack is empty → PLE = -1
      if (stack.length === 0) {
        ple[i] = -1;
      } else {
        // Stack top is the closest smaller element to the left
        // WHY: Stack maintains increasing order, so top is the immediate smaller
        // EXAMPLE: arr = [3,1,2], for arr[2]=2, stack has [1], PLE = index 1
        ple[i] = stack[stack.length - 1];
      }

      // Push current index to stack
      // WHY: This might be PLE for future elements
      stack.push(i);
    }

    return ple;
  }

  /**
   * Find Next Less Element (NLE) index for each element
   *
   * CONCEPT:
   * For each arr[i], find the closest index j (j > i) where arr[j] < arr[i]
   * If no such element exists, NLE = n
   *
   * IMPORTANT - DUPLICATES HANDLING:
   * We use LESS THAN OR EQUAL (<=) here
   * This ensures when arr[i] == arr[j], only one of them counts the subarray
   * Combined with PLE using <, we avoid double counting
   */
  function findNextLessElement(arr: number[]): number[] {
    const n = arr.length;
    const nle: number[] = new Array(n);
    const stack: number[] = []; // Stores INDICES (monotonic increasing by value)

    // Traverse RIGHT to LEFT
    // WHY: We're looking for "next" less element, so go backward
    for (let i = n - 1; i >= 0; i--) {
      // Pop elements that are > current
      // WHY: We use LESS THAN OR EQUAL (<=) for NLE
      //      If arr[j] == arr[i], we consider j as NLE (different from PLE!)
      // EXAMPLE: arr = [2, 2], for i=0, we DON'T pop index 1 because arr[1]=2 is not > arr[0]=2
      //          So NLE[0] = 1, meaning the duplicate at index 1 acts as boundary
      while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
        stack.pop();
      }

      // If stack is empty, no next less element
      // WHY: All elements to the right are > arr[i]
      // EXAMPLE: arr = [3,1,2,4], for arr[3]=4, stack is empty → NLE = 4 (n)
      if (stack.length === 0) {
        nle[i] = n;
      } else {
        // Stack top is the closest smaller element to the right
        // WHY: Stack maintains increasing order, so top is the immediate smaller/equal
        // EXAMPLE: arr = [3,1,2,4], for arr[2]=2, stack has [3], NLE = index 3... wait no
        //          Actually for arr[2]=2, all to right are > 2, so NLE = 4
        nle[i] = stack[stack.length - 1];
      }

      // Push current index to stack
      // WHY: This might be NLE for future elements (going backward)
      stack.push(i);
    }

    return nle;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Example Input: arr = [3, 1, 2, 4]
   *                      0  1  2  3
   *
   * Expected Output: 17
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * PHASE 1: FIND PREVIOUS LESS ELEMENT (PLE)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Goal: For each element, find closest smaller element to the LEFT
   * Method: Monotonic increasing stack, traverse LEFT → RIGHT
   * Condition: Pop if stack.top() >= current (STRICTLY LESS)
   *
   * Initial State:
   * arr    = [3, 1, 2, 4]
   * index  =  0  1  2  3
   * ple    = [?, ?, ?, ?]
   * stack  = []
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 1: i=0, arr[0]=3
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 3
   *
   *   Stack state: []
   *
   *   Pop while stack.top() >= 3?
   *   → Stack empty, nothing to pop
   *
   *   Stack empty? YES
   *   → ple[0] = -1 (no smaller element to left)
   *
   *   Push index 0 to stack
   *
   *   After:
   *   ple   = [-1, ?, ?, ?]
   *   stack = [0]  ← represents value 3
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 2: i=1, arr[1]=1
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 1
   *
   *   Stack state: [0] (value 3)
   *
   *   Pop while stack.top() >= 1?
   *   → arr[0]=3 >= 1? YES, pop index 0
   *   → Stack now empty
   *
   *   Stack empty? YES
   *   → ple[1] = -1 (no smaller element to left, we popped the 3)
   *
   *   Push index 1 to stack
   *
   *   After:
   *   ple   = [-1, -1, ?, ?]
   *   stack = [1]  ← represents value 1
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 3: i=2, arr[2]=2
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 2
   *
   *   Stack state: [1] (value 1)
   *
   *   Pop while stack.top() >= 2?
   *   → arr[1]=1 >= 2? NO, don't pop
   *
   *   Stack empty? NO
   *   → ple[2] = stack.top() = 1 (element at index 1, value 1, is smaller)
   *
   *   Push index 2 to stack
   *
   *   After:
   *   ple   = [-1, -1, 1, ?]
   *   stack = [1, 2]  ← represents values [1, 2] (increasing)
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 4: i=3, arr[3]=4
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 4
   *
   *   Stack state: [1, 2] (values [1, 2])
   *
   *   Pop while stack.top() >= 4?
   *   → arr[2]=2 >= 4? NO, don't pop
   *
   *   Stack empty? NO
   *   → ple[3] = stack.top() = 2 (element at index 2, value 2, is smaller)
   *
   *   Push index 3 to stack
   *
   *   After:
   *   ple   = [-1, -1, 1, 2]
   *   stack = [1, 2, 3]  ← represents values [1, 2, 4] (increasing)
   *
   * Result after Phase 1:
   * ple = [-1, -1, 1, 2]
   *
   * Meaning:
   * - arr[0]=3: No previous less element
   * - arr[1]=1: No previous less element
   * - arr[2]=2: Previous less element at index 1 (value 1)
   * - arr[3]=4: Previous less element at index 2 (value 2)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * PHASE 2: FIND NEXT LESS ELEMENT (NLE)
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Goal: For each element, find closest smaller/equal element to the RIGHT
   * Method: Monotonic increasing stack, traverse RIGHT → LEFT
   * Condition: Pop if stack.top() > current (LESS THAN OR EQUAL)
   *
   * Initial State:
   * arr    = [3, 1, 2, 4]
   * index  =  0  1  2  3
   * nle    = [?, ?, ?, ?]
   * stack  = []
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 1: i=3, arr[3]=4
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 4
   *
   *   Stack state: []
   *
   *   Pop while stack.top() > 4?
   *   → Stack empty, nothing to pop
   *
   *   Stack empty? YES
   *   → nle[3] = n = 4 (no smaller element to right)
   *
   *   Push index 3 to stack
   *
   *   After:
   *   nle   = [?, ?, ?, 4]
   *   stack = [3]  ← represents value 4
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 2: i=2, arr[2]=2
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 2
   *
   *   Stack state: [3] (value 4)
   *
   *   Pop while stack.top() > 2?
   *   → arr[3]=4 > 2? YES, pop index 3
   *   → Stack now empty
   *
   *   Stack empty? YES
   *   → nle[2] = n = 4 (no smaller element to right, we popped the 4)
   *
   *   Push index 2 to stack
   *
   *   After:
   *   nle   = [?, ?, 4, 4]
   *   stack = [2]  ← represents value 2
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 3: i=1, arr[1]=1
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 1
   *
   *   Stack state: [2] (value 2)
   *
   *   Pop while stack.top() > 1?
   *   → arr[2]=2 > 1? YES, pop index 2
   *   → Stack now empty
   *
   *   Stack empty? YES
   *   → nle[1] = n = 4 (no smaller element to right)
   *
   *   Push index 1 to stack
   *
   *   After:
   *   nle   = [?, 4, 4, 4]
   *   stack = [1]  ← represents value 1
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * Iteration 4: i=0, arr[0]=3
   * ───────────────────────────────────────────────────────────────────────────────
   *   Current element: 3
   *
   *   Stack state: [1] (value 1)
   *
   *   Pop while stack.top() > 3?
   *   → arr[1]=1 > 3? NO, don't pop
   *
   *   Stack empty? NO
   *   → nle[0] = stack.top() = 1 (element at index 1, value 1, is smaller)
   *
   *   Push index 0 to stack
   *
   *   After:
   *   nle   = [1, 4, 4, 4]
   *   stack = [1, 0]  ← represents values [1, 3] (going backward!)
   *
   * Result after Phase 2:
   * nle = [1, 4, 4, 4]
   *
   * Meaning:
   * - arr[0]=3: Next less element at index 1 (value 1)
   * - arr[1]=1: No next less element (goes till end)
   * - arr[2]=2: No next less element (goes till end)
   * - arr[3]=4: No next less element (goes till end)
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * PHASE 3: CALCULATE CONTRIBUTIONS
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Formula for each element i:
   *   leftCount  = i - ple[i]     (how many positions to start subarray from)
   *   rightCount = nle[i] - i     (how many positions to end subarray at)
   *   subarrayCount = leftCount × rightCount
   *   contribution = arr[i] × subarrayCount
   *
   * Current state:
   * arr = [3, 1, 2, 4]
   * ple = [-1, -1, 1, 2]
   * nle = [1, 4, 4, 4]
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i=0, arr[0]=3
   * ───────────────────────────────────────────────────────────────────────────────
   *   ple[0] = -1, nle[0] = 1
   *
   *   leftCount = 0 - (-1) = 1
   *   Meaning: Subarray can START from index 0 only (1 choice)
   *
   *   rightCount = 1 - 0 = 1
   *   Meaning: Subarray can END at index 0 only (1 choice)
   *   Why? Because at index 1, there's value 1 which is smaller than 3
   *
   *   subarrayCount = 1 × 1 = 1
   *
   *   Which subarrays?
   *   - [3]  ← starts at 0, ends at 0
   *
   *   contribution = 3 × 1 = 3
   *
   *   totalSum = 0 + 3 = 3
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i=1, arr[1]=1
   * ───────────────────────────────────────────────────────────────────────────────
   *   ple[1] = -1, nle[1] = 4
   *
   *   leftCount = 1 - (-1) = 2
   *   Meaning: Subarray can START from index 0 or 1 (2 choices)
   *
   *   rightCount = 4 - 1 = 3
   *   Meaning: Subarray can END at index 1, 2, or 3 (3 choices)
   *
   *   subarrayCount = 2 × 3 = 6
   *
   *   Which subarrays?
   *   Start at 0, end at 1: [3,1]     ← min = 1 ✓
   *   Start at 0, end at 2: [3,1,2]   ← min = 1 ✓
   *   Start at 0, end at 3: [3,1,2,4] ← min = 1 ✓
   *   Start at 1, end at 1: [1]       ← min = 1 ✓
   *   Start at 1, end at 2: [1,2]     ← min = 1 ✓
   *   Start at 1, end at 3: [1,2,4]   ← min = 1 ✓
   *
   *   contribution = 1 × 6 = 6
   *
   *   totalSum = 3 + 6 = 9
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i=2, arr[2]=2
   * ───────────────────────────────────────────────────────────────────────────────
   *   ple[2] = 1, nle[2] = 4
   *
   *   leftCount = 2 - 1 = 1
   *   Meaning: Subarray can START from index 2 only (1 choice)
   *   Why? Because at index 1, there's value 1 which is smaller than 2
   *
   *   rightCount = 4 - 2 = 2
   *   Meaning: Subarray can END at index 2 or 3 (2 choices)
   *
   *   subarrayCount = 1 × 2 = 2
   *
   *   Which subarrays?
   *   - [2]    ← starts at 2, ends at 2, min = 2 ✓
   *   - [2,4]  ← starts at 2, ends at 3, min = 2 ✓
   *
   *   contribution = 2 × 2 = 4
   *
   *   totalSum = 9 + 4 = 13
   *
   * ───────────────────────────────────────────────────────────────────────────────
   * i=3, arr[3]=4
   * ───────────────────────────────────────────────────────────────────────────────
   *   ple[3] = 2, nle[3] = 4
   *
   *   leftCount = 3 - 2 = 1
   *   Meaning: Subarray can START from index 3 only (1 choice)
   *   Why? Because at index 2, there's value 2 which is smaller than 4
   *
   *   rightCount = 4 - 3 = 1
   *   Meaning: Subarray can END at index 3 only (1 choice)
   *
   *   subarrayCount = 1 × 1 = 1
   *
   *   Which subarrays?
   *   - [4]  ← starts at 3, ends at 3, min = 4 ✓
   *
   *   contribution = 4 × 1 = 4
   *
   *   totalSum = 13 + 4 = 17 ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * FINAL ANSWER: 17
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * Verification - All Subarrays and Their Minimums:
   *
   * Length 1:
   *   [3]       → min = 3  ✓ (arr[0] contribution)
   *   [1]       → min = 1  ✓ (arr[1] contribution)
   *   [2]       → min = 2  ✓ (arr[2] contribution)
   *   [4]       → min = 4  ✓ (arr[3] contribution)
   *
   * Length 2:
   *   [3,1]     → min = 1  ✓ (arr[1] contribution)
   *   [1,2]     → min = 1  ✓ (arr[1] contribution)
   *   [2,4]     → min = 2  ✓ (arr[2] contribution)
   *
   * Length 3:
   *   [3,1,2]   → min = 1  ✓ (arr[1] contribution)
   *   [1,2,4]   → min = 1  ✓ (arr[1] contribution)
   *
   * Length 4:
   *   [3,1,2,4] → min = 1  ✓ (arr[1] contribution)
   *
   * Sum = 3 + 1 + 2 + 4 + 1 + 1 + 2 + 1 + 1 + 1 = 17 ✓
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════════════════════════
   *
   * 1. Single element: arr = [5]
   *    - Only subarray: [5], min = 5
   *    - Answer: 5
   *
   * 2. All same values: arr = [2, 2, 2]
   *    - Must handle duplicates correctly using < and <=
   *    - Subarrays: [2], [2], [2], [2,2], [2,2], [2,2,2]
   *    - Sum: 2+2+2+2+2+2 = 12
   *
   * 3. Increasing order: arr = [1, 2, 3]
   *    - Each element is minimum only in subarrays starting from it
   *    - [1]: contributes 1×6 = 6 (all 6 subarrays)
   *    - [2]: contributes 2×2 = 4 ([2], [2,3])
   *    - [3]: contributes 3×1 = 3 ([3])
   *    - Sum: 6 + 4 + 3 = 13
   *
   * 4. Decreasing order: arr = [3, 2, 1]
   *    - Each element is minimum only in subarrays ending at it
   *    - [3]: contributes 3×1 = 3 ([3])
   *    - [2]: contributes 2×2 = 4 ([2], [3,2])
   *    - [1]: contributes 1×6 = 6 (all subarrays ending at index 2)
   *    - Sum: 3 + 4 + 6 = 13
   *
   * 5. Large values: arr = [30000]
   *    - Single element, returns 30000 % MOD = 30000
   *
   * ═══════════════════════════════════════════════════════════════════════════════
   */

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log(
      '🧪 Testing Sum of Subarray Minimums - OPTIMAL (Monotonic Stack)\n'
    );

    const tests: Array<{
      arr: number[];
      expected: number;
      description: string;
    }> = [
      {
        arr: [3, 1, 2, 4],
        expected: 17,
        description: 'Example 1 - Mixed values',
      },
      {
        arr: [11, 81, 94, 43, 3],
        expected: 444,
        description: 'Example 2 - Larger array',
      },
      {
        arr: [5],
        expected: 5,
        description: 'Edge Case - Single element',
      },
      {
        arr: [1, 2, 3, 4],
        expected: 20,
        description: 'Increasing order - First element dominates',
      },
      {
        arr: [4, 3, 2, 1],
        expected: 20,
        description: 'Decreasing order - Last element dominates',
      },
      {
        arr: [2, 2, 2],
        expected: 12,
        description: 'Edge Case - All same values (duplicate handling)',
      },
      {
        arr: [1, 7, 5, 2, 4, 3, 9],
        expected: 73,
        description: 'Complex - Multiple peaks and valleys',
      },
      {
        arr: [71, 55, 82, 55],
        expected: 593,
        description: 'Duplicates in middle',
      },
      {
        arr: [1],
        expected: 1,
        description: 'Minimal input - Single element 1',
      },
      {
        arr: [30000, 30000],
        expected: 90000,
        description: 'Edge Case - Maximum values with duplicates',
      },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
      const result = sumSubarrayMins(test.arr);
      const status = result === test.expected ? '✅ PASS' : '❌ FAIL';

      if (result === test.expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Description: ${test.description}`);
      console.log(`  Input:       [${test.arr.join(', ')}]`);
      console.log(`  Expected:    ${test.expected}`);
      console.log(`  Got:         ${result}`);
      console.log();
    });

    console.log('═══════════════════════════════════════════════════════');
    console.log(`Total Tests: ${tests.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log('═══════════════════════════════════════════════════════\n');

    if (failed === 0) {
      console.log('🎉 All tests passed! Contribution Technique mastered! 🚀\n');
    }
  }
}

// Execute tests
SumOfSubarrayMinimumsOptimal.runTests();