// // When to Use Each Binary Search Pattern
//
// /*
// Pattern 1: while (left <= right) with right = mid - 1
// Pattern 2: while (left < right) with right = mid
//
// NO, you can't always use Pattern 2. Here's when to use each:
// */
//
// // ========================================
// // PATTERN 1: Use for EXACT MATCH searches
// // ========================================
//
// // Example 1: Classic binary search - find if element exists
// function findElement(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left <= right) {  // Pattern 1
//         const mid = Math.floor((left + right) / 2);
//
//         if (arr[mid] === target) {
//             return mid;  // Found it!
//         } else if (arr[mid] < target) {
//             left = mid + 1;
//         } else {
//             right = mid - 1;  // Exclude mid completely
//         }
//     }
//
//     return -1;  // Not found
// }
//
// // Why Pattern 2 DOESN'T work here:
// function brokenFindElement(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left < right) {  // Pattern 2 - WRONG for exact match!
//         const mid = Math.floor((left + right) / 2);
//
//         if (arr[mid] === target) {
//             return mid;  // This works but...
//         } else if (arr[mid] < target) {
//             left = mid + 1;
//         } else {
//             right = mid;  // Problem: infinite loop if target doesn't exist!
//         }
//     }
//
//     // How do we know if element exists or not?
//     // Pattern 2 assumes answer always exists!
//     return left;  // This might not be the target!
// }
//
// // ==========================================
// // PATTERN 2: Use for OPTIMIZATION problems
// // ==========================================
//
// // Example 2: Find minimum capacity needed (answer always exists)
// function findMinimumCapacity(weights: number[], days: number): number {
//     let left = Math.max(...weights);  // Minimum possible
//     let right = weights.reduce((a, b) => a + b, 0);  // Maximum possible
//
//     while (left < right) {  // Pattern 2 - PERFECT for this!
//         const mid = Math.floor((left + right) / 2);
//
//         if (canShipInDays(weights, mid, days)) {
//             right = mid;  // Keep mid as candidate
//         } else {
//             left = mid + 1;
//         }
//     }
//
//     return left;  // Guaranteed to be minimum valid answer
// }
//
// function canShipInDays(weights: number[], capacity: number, days: number): boolean {
//     // Implementation details...
//     return true; // Simplified
// }
//
// // ===============================
// // WHEN TO USE EACH PATTERN
// // ===============================
//
// /*
// USE PATTERN 1 (left <= right, right = mid - 1):
// ------------------------------------------------
// ✓ Finding exact element in array
// ✓ Searching for specific value
// ✓ When you need to return -1 if not found
// ✓ Problems like:
//   - Classic binary search
//   - Search in rotated array (finding exact element)
//   - Find peak element (exact position)
//
// USE PATTERN 2 (left < right, right = mid):
// ------------------------------------------
// ✓ Finding minimum valid value
// ✓ Finding maximum valid value
// ✓ Finding insertion position
// ✓ Optimization problems where answer exists
// ✓ Problems like:
//   - Split Array Largest Sum
//   - Koko Eating Bananas
//   - Capacity to Ship Packages
//   - Minimum Days to Make Bouquets
//   - Search Insert Position
// */
//
// // QUICK DECISION GUIDE
// function whichPatternToUse() {
//     const question = {
//         "Does answer always exist?": {
//             "YES": "Consider Pattern 2",
//             "NO": "Use Pattern 1"
//         },
//         "Are you finding exact match?": {
//             "YES": "Use Pattern 1",
//             "NO": "Consider Pattern 2"
//         },
//         "Need to return -1 if not found?": {
//             "YES": "Use Pattern 1",
//             "NO": "Consider Pattern 2"
//         },
//         "Finding min/max valid value?": {
//             "YES": "Use Pattern 2",
//             "NO": "Consider Pattern 1"
//         }
//     };
//
//     return question;
// }
//
// // EXAMPLES OF EACH TYPE
//
// // Pattern 1 Example: Find number in array
// console.log("Pattern 1 - Exact match:");
// console.log(findElement([1, 3, 5, 7, 9], 5));  // Returns 2 (index)
// console.log(findElement([1, 3, 5, 7, 9], 4));  // Returns -1 (not found)
//
// // Pattern 2 Example: Find insertion position
// function searchInsert(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length;  // Note: length, not length-1
//
//     while (left < right) {
//         const mid = Math.floor((left + right) / 2);
//         if (arr[mid] < target) {
//             left = mid + 1;
//         } else {
//             right = mid;
//         }
//     }
//
//     return left;  // Always returns valid position
// }
//
// console.log("\nPattern 2 - Insertion position:");
// console.log(searchInsert([1, 3, 5, 7], 4));  // Returns 2 (insert at index 2)
// console.log(searchInsert([1, 3, 5, 7], 8));  // Returns 4 (insert at end)
//
// /*
// SUMMARY:
// --------
// Pattern 1: For FINDING things that might not exist
// Pattern 2: For OPTIMIZING when answer must exist
//
// You CAN'T always use Pattern 2 because:
// - It assumes answer exists in range
// - It can't differentiate between "found" and "not found"
// - It's designed for convergence to a valid answer, not exact matching
// */