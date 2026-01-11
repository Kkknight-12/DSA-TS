/**
 * COMBINATION SUM - BACKTRACKING WITH UNLIMITED REPETITION
 *
 * Problem: Array se aise combinations find karo jo target sum banate hain
 *          Same element ko UNLIMITED times use kar sakte ho!
 *
 * Approach: Backtracking with Pick/Skip Pattern
 * - Pick: Element ko include karo, SAME index pe raho (unlimited repetition)
 * - Skip: Element ko skip karo, NEXT index pe jao (ab ye element nahi lenge)
 * - Backtrack: Undo karo to explore alternate paths
 *
 * Time Complexity: O(2^t) where t = target/min_element
 * - Worst case: Sabse chhota element repeatedly pick karna
 * - Example: [1], target=10 → depth=10, combinations ≈ 2^10
 *
 * Space Complexity: O(target/min)
 * - Recursion depth: O(target/min)
 * - Current array: O(target/min)
 */

namespace CombinationSum {
  /**
   * Main function: Find all combinations that sum to target
   *
   * @param candidates - Array of distinct positive integers
   * @param target - Target sum
   * @returns Array of all unique combinations
   *
   * Example:
   * Input: candidates = [2,3,6,7], target = 7
   * Output: [[2,2,3], [7]]
   *
   * Explanation:
   * - 2 ko 2 baar pick kiya, phir 3 pick kiya → 2+2+3=7 ✓
   * - 7 ko directly pick kiya → 7=7 ✓
   */
  function combinationSum(candidates: number[], target: number): number[][] {
    // EDGE CASE 1: Empty array
    // WHY: Koi candidate nahi toh koi combination nahi ban sakta
    if (candidates.length === 0) {
      return [];
    }

    // EDGE CASE 2: Target = 0
    // WHY: Sum 0 chahiye? Empty combination return karo
    // NOTE: Problem constraints say target >= 1, but good to handle
    if (target === 0) {
      return [[]];
    }

    // Result array: Sabhi valid combinations store karenge
    const result: number[][] = [];

    // Current combination: Jo abhi explore kar rahe hain
    const current: number[] = [];

    // Start backtracking from index 0, sum 0
    backtrack(0, 0, current, candidates, target, result);

    return result;
  }

  /**
   * Recursive backtracking function
   *
   * @param index - Current position in candidates array
   * @param currentSum - Sum of elements picked so far
   * @param current - Current combination being built
   * @param candidates - Original array
   * @param target - Target sum
   * @param result - Result array to store valid combinations
   *
   * Decision Tree for each call:
   *
   *          backtrack(index, sum)
   *          /                    \
   *     PICK element           SKIP element
   *     (stay at index)        (move to index+1)
   *         /                        \
   *   backtrack(index, ...)    backtrack(index+1, ...)
   *
   * Key Insight:
   * - PICK: index same → element ko dobara pick kar sakte ho
   * - SKIP: index aage → is element ko ab kabhi nahi lenge
   */
  function backtrack(
    index: number,
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
      // WHY: current array modify hoti rahegi backtracking mein
      //      Reference store kiya toh result mein wrong values aayenge
      result.push([...current]);
      return; // Is path se aage nahi jana
    }

    // BASE CASE 2: Sum exceed ho gaya ❌
    // WHY: Sum already target se zyada hai
    //      Aur candidates positive hain, toh aage sum aur badhega
    //      Isliye ye path invalid hai (PRUNING optimization!)
    if (currentSum > target) {
      return; // Early termination
    }

    // BASE CASE 3: Saare candidates process ho gaye
    // WHY: Array khatam ho gaya, aur sum != target
    //      Matlab is path se valid combination nahi mila
    if (index === candidates.length) {
      return; // No more elements to explore
    }

    // ═══════════════════════════════════════════════════════════════
    // RECURSIVE CASES
    // ═══════════════════════════════════════════════════════════════

    // CHOICE 1: PICK current element (UNLIMITED REPETITION!)
    // WHY: Element ko include karte hain current combination mein
    // NOTE: Index SAME rahega, matlab dobara pick kar sakte hain

    // Step 1: Current mein element add karo
    current.push(candidates[index]);

    // Step 2: Recurse with SAME index
    // WHY: Same index → is element ko dobara pick kar sakte hain
    // Sum update: currentSum + element
    backtrack(
      index, // ← SAME index! (Unlimited repetition ka secret!)
      currentSum + candidates[index],
      current,
      candidates,
      target,
      result
    );

    // Step 3: BACKTRACK - Element remove karo
    // WHY: Explore karne ke baad undo karo taaki dusra path try kar saken
    // Example: [2,2] se [2] bana ke [2,3] explore kar sakte hain
    current.pop();

    // CHOICE 2: SKIP current element
    // WHY: Is element ko include nahi karna, next element try karo
    // NOTE: Index AAGE badh jayega, matlab ab ye element kabhi nahi lenge

    // Recurse with NEXT index
    // WHY: Next index → is element ko chhod diya, ab aage dekho
    // Sum same: current ko skip kiya toh sum nahi badha
    backtrack(
      index + 1, // ← NEXT index! (Skip kar rahe hain)
      currentSum, // Sum same rahega
      current,
      candidates,
      target,
      result
    );

    // NOTE: Yahan backtrack nahi karna kyunki current modify nahi kiya
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════
   * DRY RUN: combinationSum([2, 3, 5], 8)
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Initial Call: combinationSum([2,3,5], 8)
   * - result = []
   * - current = []
   * - backtrack(0, 0, [], [2,3,5], 8, result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: backtrack(0, 0, [], [2,3,5], 8, result)                     │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ index = 0 (element = 2)                                              │
   * │ currentSum = 0, target = 8                                           │
   * │ current = []                                                         │
   * │                                                                      │
   * │ Base checks:                                                         │
   * │   sum == target? → 0 == 8 → NO                                      │
   * │   sum > target? → 0 > 8 → NO                                        │
   * │   index >= length? → 0 >= 3 → NO                                    │
   * │                                                                      │
   * │ ┌──────────────────────────────────────────────────────────────┐   │
   * │ │ CHOICE 1: PICK element 2                                    │   │
   * │ ├──────────────────────────────────────────────────────────────┤   │
   * │ │ current.push(2) → current = [2]                             │   │
   * │ │ backtrack(0, 2, [2], ...) ← index SAME! ─────────┐          │   │
   * │ │                                                    ↓          │   │
   * │ │   ┌────────────────────────────────────────────────────────┐│   │
   * │ │   │ CALL 2: backtrack(0, 2, [2], [2,3,5], 8, result)      ││   │
   * │ │   │ index = 0, sum = 2, current = [2]                     ││   │
   * │ │   │                                                         ││   │
   * │ │   │ CHOICE 1: PICK 2 (again!)                             ││   │
   * │ │   │   current.push(2) → [2,2]                             ││   │
   * │ │   │   backtrack(0, 4, [2,2], ...) ────────┐               ││   │
   * │ │   │                                         ↓               ││   │
   * │ │   │   ┌───────────────────────────────────────────────┐   ││   │
   * │ │   │   │ CALL 3: backtrack(0, 4, [2,2], ...)          │   ││   │
   * │ │   │   │ sum = 4, current = [2,2]                     │   ││   │
   * │ │   │   │                                               │   ││   │
   * │ │   │   │ CHOICE 1: PICK 2 (third time!)               │   ││   │
   * │ │   │   │   current.push(2) → [2,2,2]                  │   ││   │
   * │ │   │   │   backtrack(0, 6, [2,2,2], ...) ────┐        │   ││   │
   * │ │   │   │                                      ↓        │   ││   │
   * │ │   │   │   CALL 4: backtrack(0, 6, [2,2,2], ...)      │   ││   │
   * │ │   │   │   sum = 6, current = [2,2,2]                 │   ││   │
   * │ │   │   │                                               │   ││   │
   * │ │   │   │   CHOICE 1: PICK 2 (fourth time!)            │   ││   │
   * │ │   │   │     current.push(2) → [2,2,2,2]              │   ││   │
   * │ │   │   │     backtrack(0, 8, [2,2,2,2], ...)          │   ││   │
   * │ │   │   │       sum == target! ✓✓✓                     │   ││   │
   * │ │   │   │       result.push([2,2,2,2])                 │   ││   │
   * │ │   │   │       return                                  │   ││   │
   * │ │   │   │     current.pop() → [2,2,2] (BACKTRACK)      │   ││   │
   * │ │   │   │                                               │   ││   │
   * │ │   │   │   CHOICE 2: SKIP 2 (move to index 1)         │   ││   │
   * │ │   │   │     backtrack(1, 6, [2,2,2], ...)            │   ││   │
   * │ │   │   │       PICK 3: sum=9 > 8 → return ❌          │   ││   │
   * │ │   │   │       (pruning!)                              │   ││   │
   * │ │   │   │     return                                    │   ││   │
   * │ │   │   │                                               │   ││   │
   * │ │   │   │   current.pop() → [2,2] (BACKTRACK)          │   ││   │
   * │ │   │   │                                               │   ││   │
   * │ │   │   │ CHOICE 2: SKIP 2 (move to index 1)           │   ││   │
   * │ │   │   │   current = [2,2]                             │   ││   │
   * │ │   │   │   backtrack(1, 4, [2,2], ...) ────┐          │   ││   │
   * │ │   │   │                                    ↓          │   ││   │
   * │ │   │   │   CALL: backtrack(1, 4, [2,2], ...)          │   ││   │
   * │ │   │   │   index = 1 (element = 3), sum = 4           │   ││   │
   * │ │   │   │                                               │   ││   │
   * │ │   │   │   CHOICE 1: PICK 3                           │   ││   │
   * │ │   │   │     current.push(3) → [2,2,3]                │   ││   │
   * │ │   │   │     backtrack(1, 7, [2,2,3], ...)            │   ││   │
   * │ │   │   │       PICK 3: sum=10 > 8 → return ❌         │   ││   │
   * │ │   │   │       SKIP 3: backtrack(2, 7, [2,2,3], ...)  │   ││   │
   * │ │   │   │         PICK 5: sum=12 > 8 → return ❌       │   ││   │
   * │ │   │   │         SKIP 5: index=3 → return             │   ││   │
   * │ │   │   │     current.pop() → [2,2] (BACKTRACK)        │   ││   │
   * │ │   │   │                                               │   ││   │
   * │ │   │   │   CHOICE 2: SKIP 3 (move to index 2)         │   ││   │
   * │ │   │   │     backtrack(2, 4, [2,2], ...)              │   ││   │
   * │ │   │   │       PICK 5: sum=9 > 8 → return ❌          │   ││   │
   * │ │   │   │       SKIP 5: index=3 → return               │   ││   │
   * │ │   │   └───────────────────────────────────────────────┘   ││   │
   * │ │   │                                                         ││   │
   * │ │   │   current.pop() → [2] (BACKTRACK)                      ││   │
   * │ │   │                                                         ││   │
   * │ │   │ CHOICE 2: SKIP 2 (move to index 1)                     ││   │
   * │ │   │   current = [2]                                         ││   │
   * │ │   │   backtrack(1, 2, [2], ...) ──────────┐                ││   │
   * │ │   │                                         ↓                ││   │
   * │ │   │   CALL: backtrack(1, 2, [2], ...)                      ││   │
   * │ │   │   index = 1 (element = 3), sum = 2                     ││   │
   * │ │   │                                                         ││   │
   * │ │   │   CHOICE 1: PICK 3                                     ││   │
   * │ │   │     current.push(3) → [2,3]                            ││   │
   * │ │   │     backtrack(1, 5, [2,3], ...)                        ││   │
   * │ │   │       CHOICE 1: PICK 3                                 ││   │
   * │ │   │         current.push(3) → [2,3,3]                      ││   │
   * │ │   │         backtrack(1, 8, [2,3,3], ...)                  ││   │
   * │ │   │           sum == target! ✓✓✓                           ││   │
   * │ │   │           result.push([2,3,3])                          ││   │
   * │ │   │           return                                        ││   │
   * │ │   │         current.pop() → [2,3] (BACKTRACK)              ││   │
   * │ │   │                                                         ││   │
   * │ │   │       CHOICE 2: SKIP 3                                 ││   │
   * │ │   │         backtrack(2, 5, [2,3], ...)                    ││   │
   * │ │   │           PICK 5: sum=10 > 8 → return ❌               ││   │
   * │ │   │           SKIP 5: index=3 → return                     ││   │
   * │ │   │     current.pop() → [2] (BACKTRACK)                    ││   │
   * │ │   │                                                         ││   │
   * │ │   │   CHOICE 2: SKIP 3                                     ││   │
   * │ │   │     backtrack(2, 2, [2], ...)                          ││   │
   * │ │   │       (continues exploring [2,5] paths...)             ││   │
   * │ │   └────────────────────────────────────────────────────────┘│   │
   * │ │                                                              │   │
   * │ │   current.pop() → [] (BACKTRACK)                            │   │
   * │ └──────────────────────────────────────────────────────────────┘   │
   * │                                                                      │
   * │ ┌──────────────────────────────────────────────────────────────┐   │
   * │ │ CHOICE 2: SKIP element 2 (move to index 1)                 │   │
   * │ ├──────────────────────────────────────────────────────────────┤   │
   * │ │ current = [] (unchanged)                                    │   │
   * │ │ backtrack(1, 0, [], ...) ────────────────┐                  │   │
   * │ │                                            ↓                  │   │
   * │ │   CALL: backtrack(1, 0, [], [2,3,5], 8, result)            │   │
   * │ │   index = 1 (element = 3), sum = 0                         │   │
   * │ │                                                              │   │
   * │ │   CHOICE 1: PICK 3                                          │   │
   * │ │     current.push(3) → [3]                                   │   │
   * │ │     backtrack(1, 3, [3], ...)                               │   │
   * │ │       (explores [3,3], [3,3,3], [3,5] paths...)             │   │
   * │ │       Will find: [3,5] with sum=8 ✓✓✓                      │   │
   * │ │     current.pop() → []                                      │   │
   * │ │                                                              │   │
   * │ │   CHOICE 2: SKIP 3                                          │   │
   * │ │     backtrack(2, 0, [], ...)                                │   │
   * │ │       (explores paths starting with 5...)                   │   │
   * │ └──────────────────────────────────────────────────────────────┘   │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final Result: result = [[2,2,2,2], [2,3,3], [3,5]]
   *
   * ═══════════════════════════════════════════════════════════════════════
   * KEY OBSERVATIONS FROM DRY RUN
   * ═══════════════════════════════════════════════════════════════════════
   *
   * 1. UNLIMITED REPETITION:
   *    - Element 2 ko 4 baar pick kiya → [2,2,2,2]
   *    - Element 3 ko 2 baar pick kiya → [2,3,3] aur [3,3] (jo invalid tha)
   *    - Ye possible hai kyunki PICK mein index SAME rahta hai
   *
   * 2. NO DUPLICATES:
   *    - [2,3,3] mila but [3,2,3] ya [3,3,2] NAHI mila
   *    - WHY? Kyunki hum left→right process karte hain
   *    - Agar 2 ko skip kiya (index 1 pe gaye), toh wapas 2 nahi lenge
   *
   * 3. BACKTRACKING IS CRUCIAL:
   *    - [2,2] bana → explored
   *    - pop() kiya → [2] wapas aaya
   *    - Ab [2,3] explore kar sakte hain
   *    - Agar pop() nahi karte toh current = [2,2,3] ho jata galat!
   *
   * 4. PRUNING OPTIMIZATION:
   *    - sum > target → turant return
   *    - Example: sum=9 when target=8 → no point continuing
   *    - Saves many recursive calls!
   *
   * 5. ARRAY COPY IS IMPORTANT:
   *    - result.push([...current]) ← Spread operator
   *    - Agar result.push(current) karte toh reference copy hota
   *    - Baad mein current modify hoga toh result mein bhi change!
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
      console.log("✓ No combinations found (as expected if no solution exists)");
      return;
    }

    let allValid = true;

    for (let i = 0; i < result.length; i++) {
      const combination = result[i];
      const sum = combination.reduce((acc, val) => acc + val, 0);

      if (sum !== target) {
        console.log(
          `❌ Combination ${i}: [${combination}] sum=${sum} ≠ ${target}`
        );
        allValid = false;
      } else {
        // Check if all elements are from candidates
        const allFromCandidates = combination.every((val) =>
          candidates.includes(val)
        );
        if (!allFromCandidates) {
          console.log(
            `❌ Combination ${i}: [${combination}] contains elements not in candidates`
          );
          allValid = false;
        }
      }
    }

    if (allValid) {
      console.log(`✅ All ${result.length} combinations are VALID!`);
      console.log(`   Each sums to ${target}`);
      console.log(`   All elements from candidates`);
    } else {
      console.log("❌ Some combinations are INVALID!");
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEST CASES
  // ═══════════════════════════════════════════════════════════════════════

  export function runTests(): void {
    console.log("🧪 Testing COMBINATION SUM - Backtracking\n");

    // Test 1: Example from problem
    console.log("Test 1: candidates = [2,3,6,7], target = 7");
    const result1 = combinationSum([2, 3, 6, 7], 7);
    console.log("Expected: [[2,2,3], [7]]");
    console.log("Got:     ", JSON.stringify(result1));
    console.log("Explanation: 2+2+3=7 aur 7=7");
    console.log();

    // Test 2: Example from problem
    console.log("Test 2: candidates = [2,3,5], target = 8");
    const result2 = combinationSum([2, 3, 5], 8);
    console.log("Expected: [[2,2,2,2], [2,3,3], [3,5]]");
    console.log("Got:     ", JSON.stringify(result2));
    console.log("Explanation: Multiple combinations possible");
    console.log();

    // Test 3: No solution
    console.log("Test 3: candidates = [2], target = 1");
    const result3 = combinationSum([2], 1);
    console.log("Expected: []");
    console.log("Got:     ", JSON.stringify(result3));
    console.log("Explanation: 2 se 1 nahi ban sakta");
    console.log();

    // Test 4: Single element exact match
    console.log("Test 4: candidates = [7], target = 7");
    const result4 = combinationSum([7], 7);
    console.log("Expected: [[7]]");
    console.log("Got:     ", JSON.stringify(result4));
    console.log("Explanation: Direct match");
    console.log();

    // Test 5: Single element multiple times
    console.log("Test 5: candidates = [3], target = 12");
    const result5 = combinationSum([3], 12);
    console.log("Expected: [[3,3,3,3]]");
    console.log("Got:     ", JSON.stringify(result5));
    console.log("Explanation: 3 ko 4 baar use karo");
    console.log();

    // Test 6: Multiple valid paths
    console.log("Test 6: candidates = [2,5], target = 10");
    const result6 = combinationSum([2, 5], 10);
    console.log(
      "Expected: [[2,2,2,2,2], [5,5]] (order may vary)"
    );
    console.log("Got:     ", JSON.stringify(result6));
    console.log("Explanation: 5 twos ya 2 fives");
    console.log();

    // Test 7: Larger example
    console.log("Test 7: candidates = [1,2,3], target = 4");
    const result7 = combinationSum([1, 2, 3], 4);
    console.log("Expected: Multiple combinations");
    console.log("Got:     ", JSON.stringify(result7));
    console.log(
      "Explanation: [1,1,1,1], [1,1,2], [1,3], [2,2] sab valid hain"
    );
    console.log();

    // Test 8: Edge case - minimum target
    console.log("Test 8: candidates = [2,3,5], target = 2");
    const result8 = combinationSum([2, 3, 5], 2);
    console.log("Expected: [[2]]");
    console.log("Got:     ", JSON.stringify(result8));
    console.log("Explanation: Sirf 2 hi minimum hai jo target match karta");
    console.log();

    // Run verifications
    console.log("\n" + "═".repeat(70));
    console.log("VERIFICATION TESTS");
    console.log("═".repeat(70));

    verifyCombinations([2, 3, 6, 7], 7, result1);
    verifyCombinations([2, 3, 5], 8, result2);
    verifyCombinations([2], 1, result3);
    verifyCombinations([7], 7, result4);
    verifyCombinations([3], 12, result5);
    verifyCombinations([2, 5], 10, result6);
  }
}

// Execute tests
CombinationSum.runTests();