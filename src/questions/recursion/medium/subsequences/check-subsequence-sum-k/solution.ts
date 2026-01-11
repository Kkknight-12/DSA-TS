/**
 * CHECK IF THERE EXISTS A SUBSEQUENCE WITH SUM K
 *
 * Problem: Array mein koi subsequence hai ya nahi jiska sum exactly K ho?
 *
 * Approach: Pure Recursion (Pick/Not Pick with Early Return)
 * - Har element pe 2 choices: Pick karo ya Skip karo
 * - Sum track karo recursively
 * - IMPORTANT: Jaise hi sum == K mila, turant return true!
 * - Agar pick path se true mila, not pick explore nahi karna
 * - Only boolean return (true/false), subsequences store nahi
 *
 * Time Complexity: O(2^n) worst case
 * - Best case: O(log n) - jaldi mil gaya
 * - Worst case: O(2^n) - koi valid nahi ya last mein mila
 *
 * Space Complexity: O(n)
 * - Recursion depth: O(n)
 * - Koi extra array nahi
 */

/**
 * Main function: Check if subsequence with sum K exists
 *
 * @param arr - Array of positive integers
 * @param k - Target sum
 * @returns true if exists, false otherwise
 *
 * Algorithm:
 * 1. Start recursion from index 0, sum 0
 * 2. Har element pe decide: pick ya not pick
 * 3. Pick: sum mein add karo, recurse
 * 4. Agar pick se true mila → turant return true (early return!)
 * 5. Not Pick: sum same, recurse (only if pick returned false)
 * 6. Base case: sum == k → return true
 */
function checkSubsequenceSum(arr: number[], k: number): boolean {
  // EDGE CASE: k=0 means empty subsequence, jo hum count nahi karte
  // WHY: Empty subsequence ka sum 0 hota hai, but problem mein
  //      at least ek element pick karna zaroori hai
  if (k === 0) {
    return false; // Empty subsequence not allowed
  }

  // Index 0 aur sum 0 se start karo
  return check(0, 0, arr, k);
}

/**
 * Helper function: Recursively check for subsequence
 *
 * @param index - Current position in array
 * @param currentSum - Sum of elements picked so far
 * @param arr - Original array
 * @param k - Target sum
 * @returns true if valid subsequence found from this point
 *
 * Decision Tree Example (arr=[1,2,5], k=3):
 *
 *                    check(0, 0)
 *                    /          \
 *              Pick 1            Not Pick 1
 *                 /                  \
 *          check(1, 1)           check(1, 0)
 *            /      \              /      \
 *        Pick 2   Skip 2       Pick 2   Skip 2
 *          /         \           /         \
 *    check(2,3)  check(2,1)  check(2,2)  check(2,0)
 *       ✓
 *    sum==3!
 *    return true
 *    (बाकी paths explore नहीं होंगे - early return!)
 *
 * Result: true (found [1,2])
 */
function check(
  index: number,
  currentSum: number,
  arr: number[],
  k: number
): boolean {
  // BASE CASE 1: Sum mil gaya! ✓
  // WHY: Ye sabse important check hai
  // Jaise hi sum == k, turant return true
  if (currentSum === k) {
    return true; // Found! Aage check nahi karna
  }

  // BASE CASE 2: Saare elements process ho gaye, sum nahi mila
  // WHY: Array khatam ho gaya but sum != k
  if (index === arr.length) {
    return false; // No valid subsequence found
  }

  // OPTIMIZATION: Pruning (agar sabhi elements positive hain)
  // WHY: Agar sum already k se zyada, toh aage elements add karke
  //      sum aur bhi bada hoga, kabhi k nahi ban sakta
  // NOTE: Ye optimization sirf positive elements ke liye valid hai
  if (currentSum > k) {
    return false; // Sum already exceeded, no point continuing
  }

  // RECURSIVE CASE 1: Pick current element
  // WHY: Ye path explore karte hain jisme current element include hai
  // Sum mein arr[index] add karo
  const pickResult = check(index + 1, currentSum + arr[index], arr, k);

  // EARLY RETURN: Agar pick path se true mila
  // WHY: Ek valid mil gaya toh bas! Aage check nahi karna
  // Ye optimization bahut powerful hai
  if (pickResult) {
    return true; // Found in pick path! 🎯
  }

  // RECURSIVE CASE 2: Not Pick current element
  // WHY: Sirf tab explore jab pick path se false aaya
  // Sum same rehta hai
  // Agar ye bhi false dega, toh final false return hoga
  return check(index + 1, currentSum, arr, k);
}

/**
 * ═══════════════════════════════════════════════════════════════════════
 * DRY RUN: checkSubsequenceSum([1, 2, 5], 3)
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Initial Call: checkSubsequenceSum([1, 2, 5], 3)
 * - Start: check(0, 0, [1,2,5], 3)
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ CALL 1: check(0, 0, [1,2,5], 3)                                     │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ index = 0, currentSum = 0, k = 3                                    │
 * │ Base case 1? sum == k? 0 == 3 → Nahi                               │
 * │ Base case 2? index == 3? 0 == 3 → Nahi                             │
 * │ Pruning? sum > k? 0 > 3 → Nahi                                      │
 * │                                                                      │
 * │ CHOICE 1: Pick arr[0] = 1                                          │
 * │   pickResult = check(1, 1, [1,2,5], 3)                             │
 * │   ┌────────────────────────────────────────────────────────────┐   │
 * │   │ CALL 2: check(1, 1, [1,2,5], 3)                          │   │
 * │   ├────────────────────────────────────────────────────────────┤   │
 * │   │ index = 1, currentSum = 1, k = 3                         │   │
 * │   │ Base case 1? 1 == 3 → Nahi                               │   │
 * │   │ Base case 2? 1 == 3 → Nahi                               │   │
 * │   │ Pruning? 1 > 3 → Nahi                                     │   │
 * │   │                                                            │   │
 * │   │ CHOICE 1: Pick arr[1] = 2                                │   │
 * │   │   pickResult = check(2, 3, [1,2,5], 3)                   │   │
 * │   │   ┌──────────────────────────────────────────────────┐   │   │
 * │   │   │ CALL 3: check(2, 3, [1,2,5], 3)                │   │   │
 * │   │   ├──────────────────────────────────────────────────┤   │   │
 * │   │   │ index = 2, currentSum = 3, k = 3               │   │   │
 * │   │   │ Base case 1? 3 == 3 → HAAN! ✓✓✓               │   │   │
 * │   │   │                                                │   │   │
 * │   │   │ RETURN TRUE                                    │   │   │
 * │   │   │ ← Found: [1, 2] with sum = 3                 │   │   │
 * │   │   └──────────────────────────────────────────────────┘   │   │
 * │   │   pickResult = true                                       │   │
 * │   │                                                            │   │
 * │   │ if (pickResult) → if (true) → HAAN!                       │   │
 * │   │ RETURN TRUE ← EARLY RETURN!                               │   │
 * │   │                                                            │   │
 * │   │ NOT PICK path execute nahi hoga kyunki early return      │   │
 * │   └────────────────────────────────────────────────────────────┘   │
 * │   pickResult = true                                                │
 * │                                                                      │
 * │ if (pickResult) → if (true) → HAAN!                                │
 * │ RETURN TRUE ← EARLY RETURN!                                        │
 * │                                                                      │
 * │ NOT PICK path execute nahi hoga                                    │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Final Result: true
 *
 * Valid subsequence found: [1, 2] with sum = 3
 *
 * Call Statistics:
 * ────────────────
 * Total calls made: 3
 * Calls avoided due to early return: 5
 * Efficiency gain: 62.5% fewer calls!
 *
 * Paths NOT explored (thanks to early return):
 *   - check(2, 1) - Skip 2 from [1]
 *   - check(1, 0) - Skip 1 from []
 *   - All sub-paths from above
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * EARLY RETURN का POWER
 * ═══════════════════════════════════════════════════════════════════════
 *
 * WITHOUT EARLY RETURN (hypothetical):
 * ──────────────────────────────────────
 * function check(...): boolean {
 *   ...
 *   const pick = check(...);
 *   const notPick = check(...);
 *   return pick || notPick;  // Dono explore honge!
 * }
 *
 * Calls for [1,2,5], k=3:
 *   Total: 2^3 = 8 leaf nodes + internal = 15 calls
 *
 * WITH EARLY RETURN (our approach):
 * ──────────────────────────────────────
 * function check(...): boolean {
 *   ...
 *   const pick = check(...);
 *   if (pick) return true;  // Mil gaya? Ruk jao!
 *   return check(...);      // Nahi mila? Tab dusra try
 * }
 *
 * Calls for [1,2,5], k=3:
 *   Total: 3 calls (found early!)
 *
 * Performance Improvement:
 *   Without: 15 calls
 *   With: 3 calls
 *   Improvement: 80% faster! 🚀
 *
 *
 * ═══════════════════════════════════════════════════════════════════════
 * COMPARISON: COUNT vs CHECK
 * ═══════════════════════════════════════════════════════════════════════
 *
 * COUNT SUBSEQUENCES (previous problem):
 * ──────────────────────────────────────
 * function count(index, sum, k): number {
 *   if (index === n) {
 *     return sum === k ? 1 : 0;
 *   }
 *   const pick = count(index + 1, sum + arr[index], k);
 *   const notPick = count(index + 1, sum, k);
 *   return pick + notPick;  // Sabhi paths explore
 * }
 *
 * CHECK EXISTS (this problem):
 * ──────────────────────────────────────
 * function check(index, sum, k): boolean {
 *   if (sum === k) return true;  // Early check!
 *   if (index === n) return false;
 *   if (check(index + 1, sum + arr[index], k)) {
 *     return true;  // Early return!
 *   }
 *   return check(index + 1, sum, k);
 * }
 *
 * Key Differences:
 * ────────────────────────────────────────────────────────────────
 * | Feature          | Count         | Check               |
 * |------------------|---------------|---------------------|
 * | Return type      | number        | boolean             |
 * | Explore all?     | Haan (zaroori)| Nahi (early return) |
 * | Base case order  | End first     | Success first       |
 * | Optimization     | Less scope    | Early return!       |
 * | Performance      | Always 2^n    | Best: log n         |
 * ────────────────────────────────────────────────────────────────
 */

// ═══════════════════════════════════════════════════════════════════════
// TEST CASES
// ═══════════════════════════════════════════════════════════════════════

console.log("Test 1: arr = [10, 1, 2, 7, 6, 1, 5], k = 8");
const result1 = checkSubsequenceSum([10, 1, 2, 7, 6, 1, 5], 8);
console.log("Expected: true");
console.log("Got:     ", result1);
console.log("Valid subsequences: [2,6], [1,7], [1,1,6]");
console.log();

console.log("Test 2: arr = [2, 3, 5, 7, 9], k = 100");
const result2 = checkSubsequenceSum([2, 3, 5, 7, 9], 100);
console.log("Expected: false");
console.log("Got:     ", result2);
console.log("Max sum = 26, impossible to reach 100");
console.log();

console.log("Test 3: arr = [1, 2, 3], k = 6");
const result3 = checkSubsequenceSum([1, 2, 3], 6);
console.log("Expected: true");
console.log("Got:     ", result3);
console.log("Valid subsequence: [1,2,3]");
console.log();

console.log("Test 4: arr = [5, 10, 15], k = 8");
const result4 = checkSubsequenceSum([5, 10, 15], 8);
console.log("Expected: false");
console.log("Got:     ", result4);
console.log("Possible sums: 5,10,15,20,25,30 - 8 not possible");
console.log();

console.log("Test 5: arr = [1, 1, 1, 1], k = 2");
const result5 = checkSubsequenceSum([1, 1, 1, 1], 2);
console.log("Expected: true");
console.log("Got:     ", result5);
console.log("Valid subsequence: [1,1]");
console.log();

console.log("Test 6: arr = [5], k = 5");
const result6 = checkSubsequenceSum([5], 5);
console.log("Expected: true");
console.log("Got:     ", result6);
console.log("Valid subsequence: [5]");
console.log();

console.log("Test 7: arr = [1, 2, 3], k = 0");
const result7 = checkSubsequenceSum([1, 2, 3], 0);
console.log("Expected: false");
console.log("Got:     ", result7);
console.log("No subsequence (empty not counted)");
console.log();

// ═══════════════════════════════════════════════════════════════════════
// VERIFICATION HELPER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Verify karo by generating all subsequences (brute force)
 */
function verifyByBruteForce(arr: number[], k: number): void {
  console.log(`\n═══ arr=[${arr}], k=${k} ke liye Verification ═══`);

  // Generate all subsequences using bitmask
  const n = arr.length;
  let foundAny = false;
  const validSubsequences: number[][] = [];

  // 1 se 2^n-1 tak (0 skip = empty)
  for (let mask = 1; mask < 1 << n; mask++) {
    const subsequence: number[] = [];
    let sum = 0;

    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        subsequence.push(arr[i]);
        sum += arr[i];
      }
    }

    if (sum === k) {
      foundAny = true;
      validSubsequences.push(subsequence);
    }
  }

  const ourResult = checkSubsequenceSum(arr, k);
  const isCorrect = ourResult === foundAny;

  console.log(`✓ Our answer: ${ourResult}`);
  console.log(`✓ Expected: ${foundAny}`);
  console.log(`✓ Match: ${isCorrect ? "✓" : "✗"}`);

  if (foundAny && validSubsequences.length <= 10) {
    console.log(`✓ Valid subsequences found:`);
    validSubsequences.forEach((sub) => console.log(`  [${sub}]`));
  } else if (foundAny) {
    console.log(`✓ Total valid subsequences: ${validSubsequences.length}`);
    console.log(`  First 3: ${validSubsequences.slice(0, 3).map((s) => `[${s}]`).join(", ")}`);
  }

  console.log(`\n${isCorrect ? "✅ VERIFICATION PASS!" : "❌ VERIFICATION FAIL!"}`);
}

// Run verifications
verifyByBruteForce([10, 1, 2, 7, 6, 1, 5], 8);
verifyByBruteForce([2, 3, 5, 7, 9], 100);
verifyByBruteForce([1, 2, 3], 6);
verifyByBruteForce([5, 10, 15], 8);
verifyByBruteForce([1, 1, 1, 1], 2);
verifyByBruteForce([1, 2, 3], 0); // Edge case: k=0

export { checkSubsequenceSum };