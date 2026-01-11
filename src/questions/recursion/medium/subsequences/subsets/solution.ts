/**
 * SUBSETS (POWER SET)
 *
 * Problem: Integer array diya gaya hai (unique elements), sabhi possible subsets return karo.
 *
 * Approach: Backtracking (Include/Exclude Pattern)
 * - Har element ke liye 2 choices hain:
 *   1. Include - Element ko current subset mein add karo
 *   2. Exclude - Element ko skip karo
 * - Recursively saare elements process karo
 * - Jab saare elements process ho jayein, current subset result mein add karo
 * - IMPORTANT: Include karne ke baad backtrack karo (pop karo)
 *
 * Time Complexity: O(n × 2^n)
 * - Total subsets: 2^n
 * - Har subset ko copy karne mein: O(n) worst case
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n)
 * - Current array: O(n)
 * - Output space: O(n × 2^n) (ye usually count nahi karte)
 */

/**
 * Main function: Saare possible subsets generate karo
 *
 * @param nums - Array of unique integers
 * @returns Saare subsets (power set)
 *
 * Algorithm:
 * 1. Empty result array initialize karo
 * 2. Empty current subset aur index=0 se start karo
 * 3. Har element pe decide karo: include karu ya skip
 * 4. Jab saare elements process ho jayein, subset add karo
 */
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  // Index 0 aur empty current subset se start karo
  generate(nums, 0, [], result);

  return result;
}

/**
 * Helper function: Recursively subsets generate karo
 *
 * @param nums - Original array
 * @param index - Current position (which element we're deciding on)
 * @param current - Current subset being built
 * @param result - Sabhi subsets store karne ke liye
 *
 * Decision Tree Example (nums=[1,2]):
 *
 *                    index=0, []
 *                    /         \
 *            Include 1         Skip 1
 *                /                 \
 *          index=1, [1]        index=1, []
 *            /      \            /      \
 *        Inc 2    Skip 2     Inc 2    Skip 2
 *          /         \          /         \
 *      [1,2]        [1]       [2]        []
 *       ✓            ✓         ✓          ✓
 */
function generate(
  nums: number[],
  index: number,
  current: number[],
  result: number[][]
): void {
  // BASE CASE: Saare elements process ho gaye
  // Ab current subset ko result mein add karo
  if (index === nums.length) {
    // IMPORTANT: Array ka COPY add karo, reference nahi!
    // [...current] spread operator se copy banta hai
    result.push([...current]);
    return;
  }

  // RECURSIVE CASE 1: Current element ko INCLUDE karo
  // WHY: Ye path explore karne ke liye jisme current element hai
  current.push(nums[index]);
  generate(nums, index + 1, current, result);

  // BACKTRACK: Undo karo taaki skip path explore kar sakein
  // WHY: current array ko original state mein wapas lana hai
  current.pop();

  // RECURSIVE CASE 2: Current element ko SKIP karo
  // WHY: Ye path explore karne ke liye jisme current element nahi hai
  generate(nums, index + 1, current, result);
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * DRY RUN: subsets([1,2])
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Initial Call: subsets([1,2])
 * - result = []
 * - Start: generate([1,2], 0, [], result)
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ CALL 1: generate([1,2], 0, [], result)                              │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ nums = [1,2], index = 0, current = []                               │
 * │ Base case? 0 === 2 → Nahi                                           │
 * │                                                                      │
 * │ CHOICE 1: Include nums[0] = 1                                       │
 * │   current.push(1) → current = [1]                                   │
 * │   ┌────────────────────────────────────────────────────────────┐   │
 * │   │ CALL 2: generate([1,2], 1, [1], result)                   │   │
 * │   ├────────────────────────────────────────────────────────────┤   │
 * │   │ nums = [1,2], index = 1, current = [1]                    │   │
 * │   │ Base case? 1 === 2 → Nahi                                 │   │
 * │   │                                                            │   │
 * │   │ CHOICE 1: Include nums[1] = 2                             │   │
 * │   │   current.push(2) → current = [1,2]                       │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 3: generate([1,2], 2, [1,2], result)       │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ nums = [1,2], index = 2, current = [1,2]        │   │   │
 * │   │   │ Base case? 2 === 2 → Haan! ✓                   │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ result.push([...current])                       │   │   │
 * │   │   │ result.push([1,2])  ← Copy add hua              │   │   │
 * │   │   │ result = [[1,2]]                                │   │   │
 * │   │   │ Return                                           │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │                                                            │   │
 * │   │ Wapas CALL 2 mein                                         │   │
 * │   │ BACKTRACK: current.pop() → current = [1]                  │   │
 * │   │            ^                                               │   │
 * │   │            └─ Ye ZAROORI hai! Undo karo                  │   │
 * │   │                                                            │   │
 * │   │ CHOICE 2: Skip nums[1] = 2                                │   │
 * │   │   current = [1] (koi change nahi)                         │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 4: generate([1,2], 2, [1], result)         │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ nums = [1,2], index = 2, current = [1]          │   │   │
 * │   │   │ Base case? 2 === 2 → Haan! ✓                   │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ result.push([...current])                       │   │   │
 * │   │   │ result.push([1])  ← Copy add hua                │   │   │
 * │   │   │ result = [[1,2], [1]]                           │   │   │
 * │   │   │ Return                                           │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │ Return                                                     │   │
 * │   └────────────────────────────────────────────────────────────┘   │
 * │                                                                      │
 * │ Wapas CALL 1 mein                                                   │
 * │ BACKTRACK: current.pop() → current = []                             │
 * │            ^                                                         │
 * │            └─ 1 ko remove kiya, ab skip path explore karo          │
 * │                                                                      │
 * │ CHOICE 2: Skip nums[0] = 1                                          │
 * │   current = [] (koi change nahi)                                    │
 * │   ┌────────────────────────────────────────────────────────────┐   │
 * │   │ CALL 5: generate([1,2], 1, [], result)                    │   │
 * │   ├────────────────────────────────────────────────────────────┤   │
 * │   │ nums = [1,2], index = 1, current = []                     │   │
 * │   │ Base case? 1 === 2 → Nahi                                 │   │
 * │   │                                                            │   │
 * │   │ CHOICE 1: Include nums[1] = 2                             │   │
 * │   │   current.push(2) → current = [2]                         │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 6: generate([1,2], 2, [2], result)         │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ nums = [1,2], index = 2, current = [2]          │   │   │
 * │   │   │ Base case? 2 === 2 → Haan! ✓                   │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ result.push([...current])                       │   │   │
 * │   │   │ result.push([2])  ← Copy add hua                │   │   │
 * │   │   │ result = [[1,2], [1], [2]]                      │   │   │
 * │   │   │ Return                                           │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │                                                            │   │
 * │   │ Wapas CALL 5 mein                                         │   │
 * │   │ BACKTRACK: current.pop() → current = []                   │   │
 * │   │                                                            │   │
 * │   │ CHOICE 2: Skip nums[1] = 2                                │   │
 * │   │   current = [] (koi change nahi)                          │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 7: generate([1,2], 2, [], result)          │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ nums = [1,2], index = 2, current = []           │   │   │
 * │   │   │ Base case? 2 === 2 → Haan! ✓                   │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ result.push([...current])                       │   │   │
 * │   │   │ result.push([])  ← Empty subset!                │   │   │
 * │   │   │ result = [[1,2], [1], [2], []]                  │   │   │
 * │   │   │ Return                                           │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │ Return                                                     │   │
 * │   └────────────────────────────────────────────────────────────┘   │
 * │ Return                                                               │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Final Result: [[1,2], [1], [2], []]
 *
 * Verification:
 * ✓ Total subsets = 2^2 = 4
 * ✓ Empty subset [] included
 * ✓ Saare combinations present: [1,2], [1], [2], []
 * ✓ Koi duplicates nahi
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * BACKTRACKING KA IMPORTANCE
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Backtracking kyun zaroori hai? Isko samajhne ke liye example dekhte hain:
 *
 * AGAR BACKTRACKING NAHI HOTA:
 * ────────────────────────────────────────
 * current = []
 * current.push(1) → [1]
 *   current.push(2) → [1,2]
 *     Add to result → [[1,2]] ✓
 *   Return
 *   // current abhi bhi [1,2] hai! ✗
 *   // Skip 2 path explore karna hai
 *   // Lekin current mein already 2 hai!
 *   Add to result → [[1,2], [1,2]] ✗✗ DUPLICATE!
 *
 * WITH BACKTRACKING:
 * ────────────────────────────────────────
 * current = []
 * current.push(1) → [1]
 *   current.push(2) → [1,2]
 *     Add to result → [[1,2]] ✓
 *   Return
 *   current.pop()    → [1]  ← BACKTRACK! Undo kiya
 *   // Ab current = [1] hai, perfect!
 *   // Skip 2 path explore karo
 *   Add to result → [[1,2], [1]] ✓ CORRECT!
 *
 * Visual Flow:
 * ────────────────────────────────────────
 *        []
 *        ↓ push(1)
 *       [1]
 *        ↓ push(2)
 *      [1,2] ← Include 2 path, add to result
 *        ↓ pop()  ← BACKTRACK!
 *       [1]  ← Wapas original state
 *        ↓ skip 2
 *       [1]  ← Skip 2 path, add to result
 *        ↓ pop()  ← BACKTRACK!
 *       []   ← Wapas original state
 *        ↓ skip 1
 *       []   ← Ab skip 1 path explore karo
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * REFERENCE VS COPY (VERY IMPORTANT!)
 * ═══════════════════════════════════════════════════════════════════════
 *
 * WRONG WAY (Reference add karna):
 * ────────────────────────────────────────
 * result.push(current);  // ✗ Reference add hua
 *
 * Kya hoga:
 *   1. current = [1,2], result = [[1,2]]
 *   2. current.pop() → current = [1]
 *   3. Lekin result[0] bhi [1] ho jayega! ✗
 *   4. Kyunki same array ka reference hai
 *
 * Result: [[], [], [], []]  ✗✗ Sab empty!
 *
 * CORRECT WAY (Copy add karna):
 * ────────────────────────────────────────
 * result.push([...current]);  // ✓ Copy add hua
 *
 * Kya hoga:
 *   1. current = [1,2], result = [[1,2]] (copy add hua)
 *   2. current.pop() → current = [1]
 *   3. result[0] abhi bhi [1,2] hai ✓
 *   4. Kyunki alag array ka copy hai
 *
 * Result: [[1,2], [1], [2], []]  ✓✓ PERFECT!
 *
 * Three ways to copy:
 *   1. [...current]           ← Spread operator (modern, clean)
 *   2. current.slice()        ← Array method
 *   3. Array.from(current)    ← Conversion method
 */

// ═══════════════════════════════════════════════════════════════════════
// TEST CASES
// ═══════════════════════════════════════════════════════════════════════

console.log("Test 1: nums = [1,2,3]");
const result1 = subsets([1, 2, 3]);
console.log("Expected: 8 subsets (2^3)");
console.log("Got:     ", result1.length, "subsets");
console.log("Subsets: ", result1);
console.log();

console.log("Test 2: nums = [0]");
const result2 = subsets([0]);
console.log("Expected: 2 subsets (2^1)");
console.log("Got:     ", result2.length, "subsets");
console.log("Subsets: ", result2);
console.log();

console.log("Test 3: nums = [1,2]");
const result3 = subsets([1, 2]);
console.log("Expected: 4 subsets (2^2)");
console.log("Got:     ", result3.length, "subsets");
console.log("Subsets: ", result3);
console.log();

console.log("Test 4: nums = [5,6,7,8]");
const result4 = subsets([5, 6, 7, 8]);
console.log("Expected: 16 subsets (2^4)");
console.log("Got:     ", result4.length, "subsets");
console.log("Pehle 5: ", result4.slice(0, 5));
console.log("Last 3:  ", result4.slice(-3));
console.log();

console.log("Test 5: Negative numbers [-1, 0, 1]");
const result5 = subsets([-1, 0, 1]);
console.log("Expected: 8 subsets (2^3)");
console.log("Got:     ", result5.length, "subsets");
console.log("Subsets: ", result5);
console.log();

// ═══════════════════════════════════════════════════════════════════════
// VERIFICATION HELPER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Verify karo ki generated subsets sahi hain
 */
function verifyResults(nums: number[], results: number[][]): void {
  console.log(`\n═══ nums=[${nums}] ke liye Verification ═══`);

  // Check 1: Correct count (2^n)
  const expectedCount = Math.pow(2, nums.length);
  const countOk = results.length === expectedCount;
  console.log(
    `✓ Count: ${results.length} (expected: ${expectedCount} = 2^${nums.length}) ${
      countOk ? "✓" : "✗"
    }`
  );

  // Check 2: Empty subset included hai
  const hasEmptySubset = results.some((subset) => subset.length === 0);
  console.log(`✓ Empty subset [] present: ${hasEmptySubset ? "✓" : "✗"}`);

  // Check 3: Full subset included hai
  const hasFullSubset = results.some((subset) => subset.length === nums.length);
  console.log(
    `✓ Full subset [${nums}] present: ${hasFullSubset ? "✓" : "✗"}`
  );

  // Check 4: Koi duplicates nahi
  const stringified = results.map((subset) => JSON.stringify(subset.sort()));
  const uniqueCount = new Set(stringified).size;
  const noDuplicates = uniqueCount === results.length;
  console.log(`✓ Koi duplicates nahi: ${noDuplicates ? "✓" : "✗"}`);

  // Check 5: Sabhi subsets valid hain (elements nums mein se hain)
  let allValid = true;
  for (const subset of results) {
    for (const element of subset) {
      if (!nums.includes(element)) {
        console.log(`  ✗ Invalid element ${element} in subset [${subset}]`);
        allValid = false;
      }
    }
  }
  console.log(`✓ Sabhi subsets valid hain: ${allValid ? "✓" : "✗"}`);

  const allPassed = countOk && hasEmptySubset && hasFullSubset && noDuplicates && allValid;
  console.log(
    `\n${allPassed ? "✅ SAARE CHECKS PASS HO GAYE!" : "❌ KOI CHECKS FAIL HO GAYE"}`
  );
}

// Verification run karo
verifyResults([1, 2, 3], subsets([1, 2, 3]));
verifyResults([0], subsets([0]));
verifyResults([1, 2], subsets([1, 2]));
verifyResults([-1, 0, 1], subsets([-1, 0, 1]));

export { subsets };