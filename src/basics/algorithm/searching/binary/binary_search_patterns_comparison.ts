// // Binary Search: Two Common Patterns Explained
//
// /*
// Pattern 1: left <= right with right = mid - 1
// Pattern 2: left < right with right = mid
//
// The KEY DIFFERENCE is what happens when we find a valid answer:
// */
//
// // Let's trace through a concrete example to see the difference
// // Problem: Find the minimum valid capacity to ship packages
// // Array: [1, 2, 3, 4, 5], k = 2 (split into 2 subarrays)
//
// function pattern1_leftLessEqualRight() {
//   const nums = [1, 2, 3, 4, 5];
//   const k = 2;
//
//   let left = 5; // max element
//   let right = 15; // sum of all
//   let answer = -1; // NEED to track answer separately!
//
//   console.log('Pattern 1: while (left <= right) with right = mid - 1');
//   console.log('Initial: left=5, right=15');
//
//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
//     console.log(`\n  Checking mid=${mid}`);
//
//     // Simulate canSplit - let's say 8 is valid
//     if (mid >= 8) {
//       // This simulates canSplit returning true
//       answer = mid; // MUST save the answer!
//       right = mid - 1;
//       console.log(`  ✓ Valid! Save answer=${mid}, right=${mid - 1}`);
//     } else {
//       left = mid + 1;
//       console.log(`  ✗ Invalid! left=${mid + 1}`);
//     }
//
//     console.log(`  Now: left=${left}, right=${right}, saved answer=${answer}`);
//   }
//
//   console.log(`\nFinal: left=${left}, right=${right}`);
//   console.log(`MUST return saved answer: ${answer}`);
//   return answer;
// }
//
// function pattern2_leftLessRight() {
//   const nums = [1, 2, 3, 4, 5];
//   const k = 2;
//
//   let left = 5; // max element
//   let right = 15; // sum of all
//
//   console.log('\nPattern 2: while (left < right) with right = mid');
//   console.log('Initial: left=5, right=15');
//
//   while (left < right) {
//     const mid = Math.floor((left + right) / 2);
//     console.log(`\n  Checking mid=${mid}`);
//
//     // Simulate canSplit - let's say 8 is valid
//     if (mid >= 8) {
//       // This simulates canSplit returning true
//       right = mid; // Keep mid as a candidate!
//       console.log(`  ✓ Valid! right=${mid} (keeping mid as candidate)`);
//     } else {
//       left = mid + 1;
//       console.log(`  ✗ Invalid! left=${mid + 1}`);
//     }
//
//     console.log(`  Now: left=${left}, right=${right}`);
//   }
//
//   console.log(`\nFinal: left=${left}, right=${right} (they're equal!)`);
//   console.log(`Can return left or right: ${left}`);
//   return left;
// }
//
// // Run both patterns
// pattern1_leftLessEqualRight();
// console.log('\n' + '='.repeat(50) + '\n');
// pattern2_leftLessRight();
//
// /*
// KEY DIFFERENCES SUMMARIZED:
// ===========================
//
// Pattern 1: left <= right, right = mid - 1
// ------------------------------------------
// ✗ Problem: When valid, we EXCLUDE mid (right = mid - 1)
// ✗ Problem: Might overshoot and lose the answer
// ✓ Solution: Must save answer in separate variable
// ✗ More complex: Need to track answer variable
// ✗ Risk: Forgetting to save answer leads to bugs
//
// Pattern 2: left < right, right = mid
// -------------------------------------
// ✓ Better: When valid, we KEEP mid (right = mid)
// ✓ Better: Never lose a valid answer
// ✓ Simple: No need for separate answer variable
// ✓ Clean: Just return left (or right) at the end
// ✓ Safe: Answer is guaranteed to be at left position
//
// WHY Pattern 2 is PREFERRED for "find minimum valid" problems:
// --------------------------------------------------------------
// 1. Simpler code (no answer variable needed)
// 2. Less error-prone (can't forget to save answer)
// 3. Guaranteed convergence to the exact answer
// 4. The loop naturally finds the MINIMUM valid value
// */
//
// // Visual Example: Finding minimum valid value
// function visualExample() {
//   console.log('\n' + '='.repeat(50));
//   console.log('VISUAL: Finding minimum valid value >= 8');
//   console.log('Range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]');
//   console.log('                              ^ answer is here');
//
//   console.log('\nPattern 1 risks:');
//   console.log('- If we find 8 is valid, we set right = 7');
//   console.log('- Now our search space is [left, 7] - we LOST 8!');
//   console.log("- That's why we MUST save answer = 8 first");
//
//   console.log('\nPattern 2 advantage:');
//   console.log('- If we find 8 is valid, we set right = 8');
//   console.log('- Our search space is [left, 8] - we KEEP 8!');
//   console.log('- No need to save separately, 8 stays in our range');
// }
//
// visualExample();
//
// /*
// WHEN TO USE EACH PATTERN:
// =========================
//
// Use Pattern 1 (left <= right):
// - Finding exact match that might not exist
// - Need to return -1 if not found
// - Classic binary search for specific value
//
// Use Pattern 2 (left < right):  <-- BETTER for optimization problems!
// - Finding minimum valid value
// - Finding maximum valid value
// - Finding insertion position
// - Problems where answer always exists
// - "Split Array Largest Sum" type problems
// */