/**
 * COUNT ALL SUBSEQUENCES WITH SUM K
 *
 * Problem: Array mein se kitne subsequences hain jinka sum exactly K ke equal hai?
 *
 * Approach: Recursion (Pick/Not Pick Pattern)
 * - Har element pe 2 choices: Pick karo (sum mein add) ya Skip karo
 * - Sum track karo recursively
 * - Base case: Saare elements process ho gaye
 *   - Agar sum == K → return 1 (found one valid!)
 *   - Agar sum != K → return 0 (invalid)
 * - Total count = pickCount + notPickCount
 *
 * Time Complexity: O(2^n)
 * - Har element ke liye 2 choices
 * - Total paths: 2^n
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n)
 * - Koi extra array nahi (sirf count return)
 */

/**
 * Main function: Count subsequences with sum = K
 *
 * @param nums - Array of integers
 * @param k - Target sum
 * @returns Count of subsequences with sum = K
 *
 * Algorithm:
 * 1. Start recursion from index 0, sum 0
 * 2. Har element pe decide: pick ya not pick
 * 3. Pick: sum mein add karo
 * 4. Not Pick: sum same rakho
 * 5. Base case: Agar sum == K, return 1, else return 0
 * 6. Merge counts from both paths
 */
function countSubsequencesWithSumK(nums: number[], k: number): number {
  // Index 0 aur sum 0 se start karo
  return count(0, 0, nums, k);
}

/**
 * Helper function: Recursively count subsequences
 *
 * @param index - Current position in array
 * @param currentSum - Sum of elements picked so far
 * @param nums - Original array
 * @param k - Target sum
 * @returns Count of valid subsequences from this point
 *
 * Decision Tree Example (nums=[4,5,1], k=10):
 *
 *                    count(0, 0)
 *                    /          \
 *              Pick 4            Not Pick 4
 *                 /                  \
 *          count(1, 4)           count(1, 0)
 *            /      \              /      \
 *        Pick 5   Skip 5       Pick 5   Skip 5
 *          /         \           /         \
 *    count(2,9)  count(2,4)  count(2,5)  count(2,0)
 *      /    \      /    \      /    \      /    \
 *   Pick1 Skip1 Pick1 Skip1 Pick1 Skip1 Pick1 Skip1
 *     |     |     |     |     |     |     |     |
 *   (3,10)(3,9)(3,5)(3,4)(3,6)(3,5)(3,1)(3,0)
 *    ✓1    ✗0   ✗0   ✗0   ✗0   ✗0   ✗0   ✗0
 *
 * Result: 1 (only [4,5,1])
 */
function count(
  index: number,
  currentSum: number,
  nums: number[],
  k: number
): number {
  // BASE CASE: Saare elements process ho gaye
  if (index === nums.length) {
    // Agar sum exactly K ke equal hai, toh 1 valid subsequence mila
    // WHY: Ye ek valid subsequence hai jo hum count kar rahe hain
    if (currentSum === k) {
      return 1; // Found one!
    }
    // Otherwise, ye invalid subsequence hai
    return 0; // Not valid
  }

  // RECURSIVE CASE 1: Pick current element
  // WHY: Ye path explore karte hain jisme current element include hai
  // Sum mein nums[index] add karo
  const pickCount = count(index + 1, currentSum + nums[index], nums, k);

  // RECURSIVE CASE 2: Not Pick current element
  // WHY: Ye path explore karte hain jisme current element skip hai
  // Sum same rehta hai
  const notPickCount = count(index + 1, currentSum, nums, k);

  // Total count: Dono paths se aane wali counts ka sum
  // WHY: Pick path se kitne + Not Pick path se kitne = total kitne
  return pickCount + notPickCount;
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * DRY RUN: countSubsequencesWithSumK([4, 5, 1], 10)
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Initial Call: countSubsequencesWithSumK([4, 5, 1], 10)
 * - Start: count(0, 0, [4,5,1], 10)
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ CALL 1: count(0, 0, [4,5,1], 10)                                    │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ index = 0, currentSum = 0, k = 10                                   │
 * │ Base case? 0 === 3 → Nahi                                           │
 * │                                                                      │
 * │ CHOICE 1: Pick nums[0] = 4                                          │
 * │   ┌────────────────────────────────────────────────────────────┐   │
 * │   │ CALL 2: count(1, 4, [4,5,1], 10)                          │   │
 * │   ├────────────────────────────────────────────────────────────┤   │
 * │   │ index = 1, currentSum = 4, k = 10                         │   │
 * │   │ Base case? 1 === 3 → Nahi                                 │   │
 * │   │                                                            │   │
 * │   │ CHOICE 1: Pick nums[1] = 5                                │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 3: count(2, 9, [4,5,1], 10)                │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ index = 2, currentSum = 9, k = 10               │   │   │
 * │   │   │ Base case? 2 === 3 → Nahi                       │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ CHOICE 1: Pick nums[2] = 1                      │   │   │
 * │   │   │   ┌────────────────────────────────────────┐   │   │   │
 * │   │   │   │ CALL 4: count(3, 10, [4,5,1], 10)     │   │   │   │
 * │   │   │   ├────────────────────────────────────────┤   │   │   │
 * │   │   │   │ index = 3, currentSum = 10, k = 10    │   │   │   │
 * │   │   │   │ Base case? 3 === 3 → Haan! ✓          │   │   │   │
 * │   │   │   │ currentSum === k? 10 === 10 → Haan! ✓ │   │   │   │
 * │   │   │   │ Return 1                               │   │   │   │
 * │   │   │   │ ← Found: [4, 5, 1]                    │   │   │   │
 * │   │   │   └────────────────────────────────────────┘   │   │   │
 * │   │   │   pickCount = 1                                 │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ CHOICE 2: Not Pick nums[2] = 1                  │   │   │
 * │   │   │   ┌────────────────────────────────────────┐   │   │   │
 * │   │   │   │ CALL 5: count(3, 9, [4,5,1], 10)      │   │   │   │
 * │   │   │   ├────────────────────────────────────────┤   │   │   │
 * │   │   │   │ index = 3, currentSum = 9, k = 10     │   │   │   │
 * │   │   │   │ Base case? 3 === 3 → Haan! ✓          │   │   │   │
 * │   │   │   │ currentSum === k? 9 === 10 → Nahi ✗   │   │   │   │
 * │   │   │   │ Return 0                               │   │   │   │
 * │   │   │   │ ← Invalid: [4, 5] sum=9               │   │   │   │
 * │   │   │   └────────────────────────────────────────┘   │   │   │
 * │   │   │   notPickCount = 0                              │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Return: pickCount + notPickCount = 1 + 0 = 1   │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │   pickCount (from Pick 5) = 1                             │   │
 * │   │                                                            │   │
 * │   │ CHOICE 2: Not Pick nums[1] = 5                            │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 6: count(2, 4, [4,5,1], 10)                │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ index = 2, currentSum = 4, k = 10               │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Pick 1: count(3, 5, ...) → 5 != 10 → return 0   │   │   │
 * │   │   │   ← Invalid: [4, 1] sum=5                       │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Skip 1: count(3, 4, ...) → 4 != 10 → return 0   │   │   │
 * │   │   │   ← Invalid: [4] sum=4                          │   │   │
 * │   │   │                                                  │   │   │
 * │   │   │ Return: 0 + 0 = 0                                │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │   notPickCount (from Skip 5) = 0                          │   │
 * │   │                                                            │   │
 * │   │ Return: pickCount + notPickCount = 1 + 0 = 1              │   │
 * │   └────────────────────────────────────────────────────────────┘   │
 * │   pickCount (from Pick 4) = 1                                      │
 * │                                                                      │
 * │ CHOICE 2: Not Pick nums[0] = 4                                     │
 * │   ┌────────────────────────────────────────────────────────────┐   │
 * │   │ CALL 7: count(1, 0, [4,5,1], 10)                          │   │
 * │   ├────────────────────────────────────────────────────────────┤   │
 * │   │ index = 1, currentSum = 0, k = 10                         │   │
 * │   │                                                            │   │
 * │   │ Pick 5:                                                    │   │
 * │   │   count(2, 5, ...)                                         │   │
 * │   │     Pick 1: count(3, 6, ...) → 6 != 10 → return 0         │   │
 * │   │       ← Invalid: [5, 1] sum=6                              │   │
 * │   │     Skip 1: count(3, 5, ...) → 5 != 10 → return 0         │   │
 * │   │       ← Invalid: [5] sum=5                                 │   │
 * │   │   Returns: 0 + 0 = 0                                       │   │
 * │   │                                                            │   │
 * │   │ Skip 5:                                                    │   │
 * │   │   count(2, 0, ...)                                         │   │
 * │   │     Pick 1: count(3, 1, ...) → 1 != 10 → return 0         │   │
 * │   │       ← Invalid: [1] sum=1                                 │   │
 * │   │     Skip 1: count(3, 0, ...) → 0 != 10 → return 0         │   │
 * │   │       ← Invalid: [] sum=0 (empty)                          │   │
 * │   │   Returns: 0 + 0 = 0                                       │   │
 * │   │                                                            │   │
 * │   │ Return: 0 + 0 = 0                                          │   │
 * │   └────────────────────────────────────────────────────────────┘   │
 * │   notPickCount (from Skip 4) = 0                                   │
 * │                                                                      │
 * │ Return: pickCount + notPickCount = 1 + 0 = 1                       │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Final Result: 1
 *
 * Valid subsequence found: [4, 5, 1] with sum = 10
 *
 * Count Propagation (bottom-up):
 * ────────────────────────────────
 * Leaf nodes:    1, 0, 0, 0, 0, 0, 0, 0
 * Level 2:       1+0=1, 0+0=0, 0+0=0, 0+0=0
 * Level 1:       1+0=1, 0+0=0
 * Level 0:       1+0=1 ← Final answer!
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * KEY DIFFERENCE: COUNT vs GENERATE
 * ═══════════════════════════════════════════════════════════════════════
 *
 * GENERATE ALL SUBSETS (humne pehle kiya):
 * ──────────────────────────────────────────
 * function generate(index, current, result) {
 *   if (index === n) {
 *     result.push([...current]);  ← Store karo
 *     return;
 *   }
 *   current.push(nums[index]);
 *   generate(index + 1, current, result);
 *   current.pop();  ← Backtrack
 *   generate(index + 1, current, result);
 * }
 *
 * COUNT WITH SUM K (ye problem):
 * ──────────────────────────────────────────
 * function count(index, sum, k): number {
 *   if (index === n) {
 *     return sum === k ? 1 : 0;  ← Return count
 *   }
 *   const pick = count(index + 1, sum + nums[index], k);
 *   const notPick = count(index + 1, sum, k);
 *   return pick + notPick;  ← Merge counts
 * }
 *
 * Differences:
 * ────────────────────────────────────────────
 * | Feature          | Generate      | Count         |
 * |------------------|---------------|---------------|
 * | Return type      | void          | number        |
 * | Store data?      | Haan (array)  | Nahi          |
 * | Backtracking?    | Haan (pop)    | Nahi zaroori  |
 * | Base case        | Push to array | Return 1 or 0 |
 * | Merge logic      | N/A           | Add counts    |
 * | Space for result | O(2^n × n)    | O(1)          |
 */

// ═══════════════════════════════════════════════════════════════════════
// TEST CASES
// ═══════════════════════════════════════════════════════════════════════

console.log("Test 1: nums = [4, 9, 2, 5, 1], k = 10");
const result1 = countSubsequencesWithSumK([4, 9, 2, 5, 1], 10);
console.log("Expected: 2");
console.log("Got:     ", result1);
console.log("Valid subsequences: [9,1], [4,5,1]");
console.log();

console.log("Test 2: nums = [4, 2, 10, 5, 1, 3], k = 5");
const result2 = countSubsequencesWithSumK([4, 2, 10, 5, 1, 3], 5);
console.log("Expected: 3");
console.log("Got:     ", result2);
console.log("Valid subsequences: [4,1], [2,3], [5]");
console.log();

console.log("Test 3: nums = [1, 2, 3], k = 6");
const result3 = countSubsequencesWithSumK([1, 2, 3], 6);
console.log("Expected: 1");
console.log("Got:     ", result3);
console.log("Valid subsequences: [1,2,3]");
console.log();

console.log("Test 4: nums = [1, 1, 1], k = 2");
const result4 = countSubsequencesWithSumK([1, 1, 1], 2);
console.log("Expected: 3");
console.log("Got:     ", result4);
console.log("Valid subsequences: [1,1] at different index pairs");
console.log();

console.log("Test 5: nums = [1, 2, 3], k = 10 (no valid)");
const result5 = countSubsequencesWithSumK([1, 2, 3], 10);
console.log("Expected: 0");
console.log("Got:     ", result5);
console.log();

console.log("Test 6: nums = [5], k = 5 (single element)");
const result6 = countSubsequencesWithSumK([5], 5);
console.log("Expected: 1");
console.log("Got:     ", result6);
console.log();

console.log("Test 7: nums = [2, 3, 5], k = 10 (all needed)");
const result7 = countSubsequencesWithSumK([2, 3, 5], 10);
console.log("Expected: 1");
console.log("Got:     ", result7);
console.log("Valid subsequences: [2,3,5]");
console.log();

// ═══════════════════════════════════════════════════════════════════════
// VERIFICATION HELPER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Verify karo ki count sahi hai (exhaustive check for small arrays)
 */
function verifyByBruteForce(nums: number[], k: number): void {
  console.log(`\n═══ nums=[${nums}], k=${k} ke liye Verification ═══`);

  // Generate all subsequences using bitmask
  const n = nums.length;
  let count = 0;
  const validSubsequences: number[][] = [];

  // 0 se 2^n-1 tak har number ek subset represent karta hai
  for (let mask = 1; mask < 1 << n; mask++) {
    // mask = 0 skip (empty subset)
    const subsequence: number[] = [];
    let sum = 0;

    for (let i = 0; i < n; i++) {
      // Agar i-th bit set hai, toh nums[i] include karo
      if (mask & (1 << i)) {
        subsequence.push(nums[i]);
        sum += nums[i];
      }
    }

    if (sum === k) {
      count++;
      validSubsequences.push(subsequence);
    }
  }

  const ourResult = countSubsequencesWithSumK(nums, k);
  const isCorrect = ourResult === count;

  console.log(`✓ Our count: ${ourResult}`);
  console.log(`✓ Expected count: ${count}`);
  console.log(`✓ Match: ${isCorrect ? "✓" : "✗"}`);

  if (validSubsequences.length <= 10) {
    console.log(`✓ Valid subsequences:`);
    validSubsequences.forEach((sub) => console.log(`  [${sub}]`));
  }

  console.log(`\n${isCorrect ? "✅ VERIFICATION PASS!" : "❌ VERIFICATION FAIL!"}`);
}

// Run verifications
verifyByBruteForce([4, 9, 2, 5, 1], 10);
verifyByBruteForce([4, 2, 10, 5, 1, 3], 5);
verifyByBruteForce([1, 1, 1], 2);
verifyByBruteForce([1, 2, 3], 10);

export { countSubsequencesWithSumK };