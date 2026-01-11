/**
 * COMBINATION SUM II - BACKTRACKING WITH DUPLICATE SKIPPING
 *
 * Problem: Array se unique combinations find karo jo target sum banate hain
 *          Har element SIRF EK BAAR use kar sakte ho
 *          Array mein DUPLICATES ho sakte hain
 *          Result mein DUPLICATE COMBINATIONS nahi chahiye
 *
 * Approach: Backtracking with Sorting + Duplicate Skipping
 * - Sort array first (duplicates ko group karne ke liye)
 * - Pick: Element ko include karo, NEXT index pe jao (i+1, not i)
 * - Skip duplicates: Same level pe duplicate elements ko skip karo
 * - Backtrack: Undo karo to explore alternate paths
 *
 * Time Complexity: O(2^n)
 * - Worst case: Sabhi elements distinct
 * - Har element ke liye 2 choices
 * - Duplicates skip karne se actual paths kam hote hain
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n)
 * - Current array: O(n)
 * - Sorting: O(1) if in-place
 */

namespace CombinationSumII {
  /**
   * Main function: Find all unique combinations with sum = target
   *
   * @param candidates - Array of integers (may contain duplicates)
   * @param target - Target sum
   * @returns Array of all unique combinations
   *
   * Example:
   * Input: candidates = [10,1,2,7,6,1,5], target = 8
   * Output: [[1,1,6], [1,2,5], [1,7], [2,6]]
   *
   * Key Differences from Combination Sum I:
   * 1. Each element can be used ONLY ONCE (not unlimited)
   * 2. Array can have DUPLICATES
   * 3. Must avoid DUPLICATE COMBINATIONS in result
   */
  function combinationSum2(candidates: number[], target: number): number[][] {
    // EDGE CASE 1: Empty array
    // WHY: Koi candidate nahi toh koi combination nahi ban sakta
    if (candidates.length === 0) {
      return [];
    }

    // EDGE CASE 2: Target = 0
    // WHY: Sum 0 chahiye? Empty combination return karo
    if (target === 0) {
      return [[]];
    }

    // STEP 1: SORT the array (MANDATORY!)
    // WHY: Duplicates ko group karne ke liye
    //      Skip logic sirf sorted array mein kaam karega
    // EXAMPLE: [10,1,2,7,6,1,5] → [1,1,2,5,6,7,10]
    candidates.sort((a, b) => a - b);

    // Result array: Sabhi unique combinations store karenge
    const result: number[][] = [];

    // Current combination: Jo abhi explore kar rahe hain
    const current: number[] = [];

    // Start backtracking from index 0, sum 0
    backtrack(0, 0, current, candidates, target, result);

    return result;
  }

  /**
   * Recursive backtracking function with duplicate skipping
   *
   * @param start - Starting index for this recursion level
   * @param currentSum - Sum of elements picked so far
   * @param current - Current combination being built
   * @param candidates - Sorted array of candidates
   * @param target - Target sum
   * @param result - Result array to store valid combinations
   *
   * Key Difference from Combination Sum I:
   * - Loop through candidates starting from 'start'
   * - Skip duplicates at same level: if (i > start && arr[i] == arr[i-1])
   * - Move to i+1 after picking (not stay at i)
   *
   * Decision Tree for each level:
   *
   *       for i = start to n-1:
   *          /                    \
   *    i-th element           Skip i-th element
   *    (if not duplicate)     (if duplicate at same level)
   *         /                        \
   *   Pick & recurse              continue to next i
   *   with i+1
   */
  function backtrack(
    start: number,
    currentSum: number,
    current: number[],
    candidates: number[],
    target: number,
    result: number[][]
  ): void {
    // ═══════════════════════════════════════════════════════════════
    // BASE CASES
    // ═══════════════════════════════════════════════════════════════

    // BASE CASE 1: Sum mil gaya! ✓✓✓
    // WHY: Exactly target sum ban gaya, valid combination hai
    if (currentSum === target) {
      // IMPORTANT: Array ka COPY banao, reference nahi!
      result.push([...current]);
      return;
    }

    // BASE CASE 2: Sum exceed ho gaya ❌
    // WHY: Sum already target se zyada hai
    //      Aur array sorted hai, toh aage ke elements aur bhi bade honge
    //      Isliye early termination
    if (currentSum > target) {
      return; // Pruning
    }

    // ═══════════════════════════════════════════════════════════════
    // RECURSIVE CASE: Loop through candidates
    // ═══════════════════════════════════════════════════════════════

    for (let i = start; i < candidates.length; i++) {
      // CRITICAL: Skip duplicates at SAME LEVEL
      // WHY: Agar same level pe duplicate process kiya,
      //      toh duplicate combinations ban jayenge
      //
      // CONDITION: i > start && candidates[i] === candidates[i-1]
      //
      // i > start: Ensures first occurrence is NOT skipped
      // Example: [1, 1, 2], start=0
      //   i=0: i > start? 0 > 0? NO → Process ✓
      //   i=1: i > start? 1 > 0? YES, arr[1]==arr[0]? YES → SKIP ✓
      //
      // Example: [1, 1, 2], start=1 (after picking first 1)
      //   i=1: i > start? 1 > 1? NO → Process ✓ (allows [1,1,...])
      //   i=2: Process 2
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue; // Skip this duplicate
      }

      // OPTIMIZATION: Early break
      // WHY: Agar current element hi target se bada hai,
      //      toh aage ke elements (jo sorted hain) aur bhi bade honge
      //      Koi faida nahi aage check karne ka
      if (candidates[i] > target - currentSum) {
        break; // No point checking further
      }

      // STEP 1: PICK current element
      // WHY: Is element ko include kar rahe hain
      current.push(candidates[i]);

      // STEP 2: Recurse with NEXT index (i + 1)
      // WHY: Har element sirf EK BAAR use kar sakte hain
      //      Isliye i+1 pe jao, i pe nahi (unlike Sum I)
      // EXAMPLE: Agar candidates[2]=5 pick kiya,
      //          next call mein candidates[3] se start karo
      backtrack(
        i + 1, // ← NEXT index! (each element max once)
        currentSum + candidates[i],
        current,
        candidates,
        target,
        result
      );

      // STEP 3: BACKTRACK
      // WHY: Current element ko remove kar ke alternate path explore karo
      // EXAMPLE: [1,2] se [1] wapas aake [1,5] try kar sakte hain
      current.pop();
    }
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN: combinationSum2([10,1,2,7,6,1,5], 8)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Initial Call: combinationSum2([10,1,2,7,6,1,5], 8)
   * Step 1: Sort → [1,1,2,5,6,7,10]
   * Step 2: result = [], current = []
   * Step 3: backtrack(0, 0, [], [1,1,2,5,6,7,10], 8, result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ LEVEL 0: backtrack(start=0, sum=0, current=[])                      │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ Loop: i from 0 to 6                                                  │
   * │ candidates = [1, 1, 2, 5, 6, 7, 10]                                 │
   * │              ↑  ↑                                                    │
   * │         duplicates!                                                  │
   * │                                                                      │
   * │ ┌──────────────────────────────────────────────────────────────┐   │
   * │ │ i=0: candidates[0] = 1                                      │   │
   * │ ├──────────────────────────────────────────────────────────────┤   │
   * │ │ Skip check: i > start? 0 > 0? NO → Don't skip              │   │
   * │ │ Pick 1[0]                                                    │   │
   * │ │ current.push(1) → current = [1]                             │   │
   * │ │ backtrack(1, 1, [1], ...) ───────────────┐                  │   │
   * │ │                                            ↓                  │   │
   * │ │   ┌────────────────────────────────────────────────────┐   │   │
   * │ │   │ LEVEL 1: backtrack(start=1, sum=1, [1])          │   │   │
   * │ │   ├────────────────────────────────────────────────────┤   │   │
   * │ │   │ Loop: i from 1 to 6                               │   │   │
   * │ │   │                                                    │   │   │
   * │ │   │ i=1: candidates[1] = 1                           │   │   │
   * │ │   │   Skip? i > start? 1 > 1? NO → Don't skip       │   │   │
   * │ │   │   (Allows [1,1,...] combinations!)               │   │   │
   * │ │   │   Pick 1[1]                                      │   │   │
   * │ │   │   current = [1, 1]                               │   │   │
   * │ │   │   backtrack(2, 2, [1,1], ...) ──────┐           │   │   │
   * │ │   │                                       ↓           │   │   │
   * │ │   │   LEVEL 2: start=2, sum=2, [1,1]                │   │   │
   * │ │   │     i=2: Pick 2 → sum=4               │   │   │
   * │ │   │     i=3: Pick 5 → sum=7               │   │   │
   * │ │   │     i=4: Pick 6 → sum=8 ✓✓✓          │   │   │
   * │ │   │          result.push([1,1,6])         │   │   │
   * │ │   │          result = [[1,1,6]]           │   │   │
   * │ │   │     i=5: Pick 7 → sum=9 > 8 ❌       │   │   │
   * │ │   │   current.pop() → [1]  ← Backtrack! Removed 1[1] │   │   │
   * │ │   │                                                    │   │   │
   * │ │   │ i=2: candidates[2] = 2                           │   │   │
   * │ │   │   current = [1] ← From previous iteration's pop! │   │   │
   * │ │   │   Skip? i > start? 2 > 1? YES                   │   │   │
   * │ │   │   candidates[2] == candidates[1]? 2==1? NO      │   │   │
   * │ │   │   Don't skip!                                     │   │   │
   * │ │   │   Pick 2                                         │   │   │
   * │ │   │   current.push(2) → current = [1, 2]            │   │   │
   * │ │   │   backtrack(3, 3, [1,2], ...)                   │   │   │
   * │ │   │     i=3: Pick 5 → sum=8 ✓✓✓                    │   │   │
   * │ │   │          result.push([1,2,5])                    │   │   │
   * │ │   │          result = [[1,1,6], [1,2,5]]            │   │   │
   * │ │   │     i=4: Pick 6 → sum=9 > 8 ❌                  │   │   │
   * │ │   │   current.pop() → [1]                            │   │   │
   * │ │   │                                                    │   │   │
   * │ │   │ i=3: Pick 5 → current=[1,5]                     │   │   │
   * │ │   │   backtrack(4, 6, [1,5], ...)                   │   │   │
   * │ │   │     i=4: Pick 6 → sum=12 > 8 ❌                 │   │   │
   * │ │   │   current.pop() → [1]                            │   │   │
   * │ │   │                                                    │   │   │
   * │ │   │ i=4: Pick 6 → current=[1,6]                     │   │   │
   * │ │   │   backtrack(5, 7, [1,6], ...)                   │   │   │
   * │ │   │     i=5: Pick 7 → sum=14 > 8 ❌                 │   │   │
   * │ │   │   current.pop() → [1]                            │   │   │
   * │ │   │                                                    │   │   │
   * │ │   │ i=5: Pick 7                                      │   │   │
   * │ │   │   current = [1, 7]                               │   │   │
   * │ │   │   backtrack(6, 8, [1,7], ...)                   │   │   │
   * │ │   │     sum == target! ✓✓✓                          │   │   │
   * │ │   │     result.push([1,7])                           │   │   │
   * │ │   │     result = [[1,1,6], [1,2,5], [1,7]]         │   │   │
   * │ │   │   current.pop() → [1]                            │   │   │
   * │ │   │                                                    │   │   │
   * │ │   │ i=6: Pick 10 → sum=11 > 8 ❌                    │   │   │
   * │ │   └────────────────────────────────────────────────────┘   │   │
   * │ │   current.pop() → []                                       │   │
   * │ └──────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ ┌──────────────────────────────────────────────────────────────┐   │
   * │ │ i=1: candidates[1] = 1                                      │   │
   * │ ├──────────────────────────────────────────────────────────────┤   │
   * │ │ Skip check: i > start? 1 > 0? YES                           │   │
   * │ │ candidates[1] == candidates[0]? 1 == 1? YES                │   │
   * │ │ → SKIP THIS! ✓✓✓                                           │   │
   * │ │                                                              │   │
   * │ │ WHY SKIP?                                                    │   │
   * │ │ - Already explored all combinations starting with 1[0]      │   │
   * │ │ - If we process 1[1], we'll get DUPLICATE combinations      │   │
   * │ │ - Example: [1[0],2,5] vs [1[1],2,5] are SAME combination! │   │
   * │ └──────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ i=2: candidates[2] = 2                                              │
   * │   Skip? i > start? 2 > 0? YES                                      │
   * │   candidates[2] == candidates[1]? 2 == 1? NO → Don't skip         │
   * │   Pick 2                                                            │
   * │   current = [2]                                                    │
   * │   backtrack(3, 2, [2], ...)                                        │
   * │     i=3: Pick 5 → sum=7                                            │
   * │     i=4: Pick 6 → sum=8 ✓✓✓                                       │
   * │          result.push([2,6])                                         │
   * │          result = [[1,1,6], [1,2,5], [1,7], [2,6]]                │
   * │     i=5: Pick 7 → sum=9 > 8 ❌                                     │
   * │   current.pop() → []                                               │
   * │                                                                      │
   * │ i=3: Pick 5 → sum=5, no valid combinations                         │
   * │ i=4: Pick 6 → sum=6, no valid combinations                         │
   * │ i=5: Pick 7 → sum=7, no valid combinations                         │
   * │ i=6: Pick 10 → sum=10 > 8 ❌                                       │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final Result: [[1,1,6], [1,2,5], [1,7], [2,6]]
   *
   * ═══════════════════════════════════════════════════════════════════════
   * KEY OBSERVATIONS
   * ═══════════════════════════════════════════════════════════════════════
   *
   * 1. SORTING IS CRITICAL:
   *    - Original: [10,1,2,7,6,1,5]
   *    - Sorted: [1,1,2,5,6,7,10]
   *    - Duplicates (1,1) ab saath mein hain
   *    - Skip logic sirf sorted array mein kaam karega
   *
   * 2. DUPLICATE SKIPPING:
   *    - At level 0: i=1 (second 1) ko skip kiya
   *    - WHY? i > start (1 > 0) AND arr[1] == arr[0] (1 == 1)
   *    - Result: [1,2,5] appears ONCE (not twice!)
   *
   * 3. ALLOWING DUPLICATES WITHIN COMBINATION:
   *    - At level 1: i=1 (second 1) ko process kiya
   *    - WHY? i > start? 1 > 1? NO, so don't skip
   *    - Result: [1,1,6] is valid! Both 1's used
   *
   * 4. EACH ELEMENT USED ONCE:
   *    - After picking candidates[i], recurse with i+1
   *    - NOT with i (unlike Combination Sum I)
   *    - Example: After picking 1[0], next picks from index 1 onwards
   *
   * 5. PRUNING OPTIMIZATION:
   *    - if (sum > target) return early
   *    - if (candidates[i] > remaining) break
   *    - Saves many unnecessary recursive calls
   */

  /**
   * Helper: Verify that all combinations sum to target
   */
  function verifyCombinations(
    candidates: number[],
    target: number,
    result: number[][]
  ): void {
    console.log(`\n═══ Verification for target=${target} ═══`);

    if (result.length === 0) {
      console.log('✓ No combinations found');
      return;
    }

    let allValid = true;
    const seen = new Set<string>();

    for (let i = 0; i < result.length; i++) {
      const combination = result[i];
      const sum = combination.reduce((acc, val) => acc + val, 0);

      // Check sum
      if (sum !== target) {
        console.log(
          `❌ Combination ${i}: [${combination}] sum=${sum} ≠ ${target}`
        );
        allValid = false;
      }

      // Check for duplicates
      const key = combination
        .slice()
        .sort((a, b) => a - b)
        .join(',');
      if (seen.has(key)) {
        console.log(`❌ Duplicate combination: [${combination}]`);
        allValid = false;
      }
      seen.add(key);

      // Check if all elements are from candidates
      const candidatesCopy = [...candidates];
      for (const num of combination) {
        const idx = candidatesCopy.indexOf(num);
        if (idx === -1) {
          console.log(
            `❌ Combination ${i}: [${combination}] contains ${num} not in candidates`
          );
          allValid = false;
          break;
        }
        candidatesCopy.splice(idx, 1); // Remove used element
      }
    }

    if (allValid) {
      console.log(`✅ All ${result.length} combinations are VALID!`);
      console.log(`   Each sums to ${target}`);
      console.log(`   No duplicate combinations`);
      console.log(`   Each element used max once per combination`);
    } else {
      console.log('❌ Some combinations are INVALID!');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log('🧪 Testing COMBINATION SUM II - Backtracking\n');

    // Test 1: Example from problem with duplicates
    console.log('Test 1: candidates = [10,1,2,7,6,1,5], target = 8');
    const result1 = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
    console.log('Expected: [[1,1,6], [1,2,5], [1,7], [2,6]]');
    console.log('Got:     ', JSON.stringify(result1));
    console.log('Explanation: Duplicates handled, each element used once');
    console.log();

    // Test 2: Multiple duplicates
    console.log('Test 2: candidates = [2,5,2,1,2], target = 5');
    const result2 = combinationSum2([2, 5, 2, 1, 2], 5);
    console.log('Expected: [[1,2,2], [5]]');
    console.log('Got:     ', JSON.stringify(result2));
    console.log("Explanation: Multiple 2's, but unique combinations");
    console.log();

    // Test 3: No solution
    console.log('Test 3: candidates = [2,3,5], target = 1');
    const result3 = combinationSum2([2, 3, 5], 1);
    console.log('Expected: []');
    console.log('Got:     ', JSON.stringify(result3));
    console.log('Explanation: No combination possible');
    console.log();

    // Test 4: All duplicates
    console.log('Test 4: candidates = [1,1,1,1], target = 2');
    const result4 = combinationSum2([1, 1, 1, 1], 2);
    console.log('Expected: [[1,1]]');
    console.log('Got:     ', JSON.stringify(result4));
    console.log('Explanation: Only one unique combination');
    console.log();

    // Test 5: Single element matches
    console.log('Test 5: candidates = [1,2,3,4,5], target = 5');
    const result5 = combinationSum2([1, 2, 3, 4, 5], 5);
    console.log('Expected: [[1,4], [2,3], [5]]');
    console.log('Got:     ', JSON.stringify(result5));
    console.log('Explanation: Multiple valid combinations');
    console.log();

    // Test 6: All same duplicates, larger target
    console.log('Test 6: candidates = [2,2,2,2,2], target = 6');
    const result6 = combinationSum2([2, 2, 2, 2, 2], 6);
    console.log('Expected: [[2,2,2]]');
    console.log('Got:     ', JSON.stringify(result6));
    console.log("Explanation: Only one way with three 2's");
    console.log();

    // Test 7: Mix of duplicates
    console.log('Test 7: candidates = [1,1,2,2,3], target = 5');
    const result7 = combinationSum2([1, 1, 2, 2, 3], 5);
    console.log('Expected: [[1,1,3], [1,2,2], [2,3]]');
    console.log('Got:     ', JSON.stringify(result7));
    console.log('Explanation: Complex duplicate handling');
    console.log();

    // Test 8: Large numbers
    console.log(
      'Test 8: candidates = [14,6,25,9,30,20,33,34,28,30,16,12,31,9,9,12,34,16,25,32,8,7,30,12,33,20,21,29,24,17,27,34,11,17,30,6,32,21,27,17,16,8,24,12,12,28,11,33,10,32,22,13,34,18,12], target = 27'
    );
    const result8 = combinationSum2(
      [
        14, 6, 25, 9, 30, 20, 33, 34, 28, 30, 16, 12, 31, 9, 9, 12, 34, 16, 25,
        32, 8, 7, 30, 12, 33, 20, 21, 29, 24, 17, 27, 34, 11, 17, 30, 6, 32, 21,
        27, 17, 16, 8, 24, 12, 12, 28, 11, 33, 10, 32, 22, 13, 34, 18, 12,
      ],
      27
    );
    console.log('Expected: Multiple combinations');
    console.log(`Got:      ${result8.length} combinations found`);
    console.log('Explanation: Large input with many duplicates');
    console.log();

    // Run verifications
    console.log('\n' + '═'.repeat(70));
    console.log('VERIFICATION TESTS');
    console.log('═'.repeat(70));

    verifyCombinations([10, 1, 2, 7, 6, 1, 5], 8, result1);
    verifyCombinations([2, 5, 2, 1, 2], 5, result2);
    verifyCombinations([2, 3, 5], 1, result3);
    verifyCombinations([1, 1, 1, 1], 2, result4);
    verifyCombinations([1, 2, 3, 4, 5], 5, result5);
    verifyCombinations([2, 2, 2, 2, 2], 6, result6);
  }
}

// Execute tests
CombinationSumII.runTests();