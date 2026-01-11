// // Complete Binary Search Patterns Guide
//
// /*
// Yes, there are mainly 2 CORE patterns, but with some variations:
// */
//
// // ===================================
// // CORE PATTERN 1: Exact Match Search
// // ===================================
// function pattern1_exactMatch(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left <= right) {
//         const mid = Math.floor((left + right) / 2);
//
//         if (arr[mid] === target) return mid;
//         else if (arr[mid] < target) left = mid + 1;
//         else right = mid - 1;
//     }
//
//     return -1;  // Not found
// }
//
// // =====================================
// // CORE PATTERN 2: Find Optimal Value
// // =====================================
// function pattern2_findOptimal(arr: number[], isValid: (x: number) => boolean): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left < right) {
//         const mid = Math.floor((left + right) / 2);
//
//         if (isValid(mid)) {
//             right = mid;  // Keep mid as candidate
//         } else {
//             left = mid + 1;
//         }
//     }
//
//     return left;  // Minimum valid value
// }
//
// // =========================================
// // VARIATION 1: Find Maximum Valid Value
// // =========================================
// function findMaximumValid(arr: number[], isValid: (x: number) => boolean): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left < right) {
//         // IMPORTANT: Use upper mid to avoid infinite loop
//         const mid = Math.floor((left + right + 1) / 2);
//
//         if (isValid(mid)) {
//             left = mid;  // Keep mid and search higher
//         } else {
//             right = mid - 1;
//         }
//     }
//
//     return left;  // Maximum valid value
// }
//
// // ==========================================
// // VARIATION 2: Find First/Last Occurrence
// // ==========================================
// function findFirstOccurrence(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left < right) {
//         const mid = Math.floor((left + right) / 2);
//
//         if (arr[mid] < target) {
//             left = mid + 1;
//         } else {
//             right = mid;  // Could be answer, keep searching left
//         }
//     }
//
//     return arr[left] === target ? left : -1;
// }
//
// function findLastOccurrence(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left < right) {
//         const mid = Math.floor((left + right + 1) / 2);  // Upper mid!
//
//         if (arr[mid] <= target) {
//             left = mid;  // Could be answer, keep searching right
//         } else {
//             right = mid - 1;
//         }
//     }
//
//     return arr[left] === target ? left : -1;
// }
//
// // ======================================
// // VARIATION 3: Search in Rotated Array
// // ======================================
// function searchRotated(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left <= right) {  // Pattern 1 for exact match
//         const mid = Math.floor((left + right) / 2);
//
//         if (arr[mid] === target) return mid;
//
//         // Check which half is sorted
//         if (arr[left] <= arr[mid]) {
//             // Left half is sorted
//             if (target >= arr[left] && target < arr[mid]) {
//                 right = mid - 1;
//             } else {
//                 left = mid + 1;
//             }
//         } else {
//             // Right half is sorted
//             if (target > arr[mid] && target <= arr[right]) {
//                 left = mid + 1;
//             } else {
//                 right = mid - 1;
//             }
//         }
//     }
//
//     return -1;
// }
//
// // ===============================
// // SUMMARY: The Patterns You Need
// // ===============================
//
// /*
// THE 2 CORE PATTERNS cover 90% of problems:
// -------------------------------------------
//
// 1. EXACT MATCH (left <= right, right = mid - 1)
//    - Classic binary search
//    - Find element in array
//    - Can return -1 if not found
//
// 2. FIND OPTIMAL (left < right, right = mid)
//    - Minimum valid value
//    - Maximum valid value (with upper mid)
//    - First/Last occurrence
//    - Insertion position
//
// SPECIAL CASES that modify the patterns:
// ----------------------------------------
// - Finding maximum: Use upper mid = (left + right + 1) / 2
// - Rotated arrays: Check which half is sorted
// - Multiple occurrences: Use Pattern 2 variants
//
// KEY INSIGHT:
// ------------
// Pattern 1: "Is this THE answer?" → Exact equality check
// Pattern 2: "Is this A valid answer?" → Range/condition check
//
// WHICH PATTERN FOR COMMON PROBLEMS:
// -----------------------------------
// • Binary Search → Pattern 1
// • Search Insert Position → Pattern 2
// • First Bad Version → Pattern 2
// • Sqrt(x) → Pattern 2
// • Koko Eating Bananas → Pattern 2
// • Split Array Largest Sum → Pattern 2
// • Find Peak Element → Pattern 1
// • Search in Rotated Array → Pattern 1
// • Find Min in Rotated Array → Pattern 2
// */
//
// // DECISION FLOWCHART
// function chooseBinarySearchPattern(problem: string): string {
//     const decision = `
//     Is the problem asking for:
//
//     1. Exact element? → Pattern 1 (left <= right)
//     2. Optimal value (min/max)? → Pattern 2 (left < right)
//     3. First/Last occurrence? → Pattern 2 variant
//     4. Insertion position? → Pattern 2
//     5. Return -1 if not found? → Pattern 1
//     6. Answer always exists? → Pattern 2
//     `;
//
//     return decision;
// }
//
// console.log("Master these 2 patterns and their variations!");
// console.log("90% of binary search problems use one of these!");