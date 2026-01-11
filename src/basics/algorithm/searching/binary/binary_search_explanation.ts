// // Binary Search: Understanding left < right vs left <= right
//
// function binarySearch(arr: number[], target: number): number {
//     let left = 0;
//     let right = arr.length - 1;
//
//     // Loop continues while left < right (not left <= right)
//     while (left < right) {
//         const mid = Math.floor((left + right) / 2);
//
//         if (arr[mid] < target) {
//             left = mid + 1;
//         } else {
//             right = mid;  // Note: right = mid, not mid - 1
//         }
//     }
//
//     // At this point: left === right
//     return left;  // or return right (they're the same)
// }
//
// // Let's trace through an example:
// const arr = [1, 3, 5, 7, 9];
// const target = 5;
//
// // Iteration 1:
// // left = 0, right = 4, mid = 2
// // arr[2] = 5, which is NOT less than target (5)
// // So: right = mid = 2
//
// // Iteration 2:
// // left = 0, right = 2, mid = 1
// // arr[1] = 3, which IS less than target (5)
// // So: left = mid + 1 = 2
//
// // Now: left = 2, right = 2
// // Loop exits because left < right is false
// // We return left (or right), which is 2
// // arr[2] = 5 ✓
//
// /* Key Insights:
//
// 1. Why left < right instead of left <= right?
//    - With left < right, the loop exits when left === right
//    - This guarantees we converge to a single element
//    - The final position is where the target should be (or would be inserted)
//
// 2. Why return left (and why left === right at the end)?
//    - When left < right becomes false, it means left >= right
//    - Since we only move left forward (left = mid + 1) and right backward (right = mid)
//    - They must meet at exactly one point: left === right
//    - This is the position we're looking for
//
// 3. How do left and right become equal?
//    - Even though the loop runs while left < right, the updates inside the loop
//      eventually make them equal:
//      * left = mid + 1 moves left forward
//      * right = mid moves right to current mid position
//    - Eventually they converge to the same index
//    - The loop then exits because left < right is no longer true
//
// 4. Alternative: left <= right pattern
//    - If we used while (left <= right), we'd need different update logic:
//      * right = mid - 1 (not just mid)
//    - This searches for exact matches and returns -1 if not found
//    - The left < right pattern is better for finding insertion positions
// */
//
// // Example showing convergence:
// function traceSearch(arr: number[], target: number): void {
//     let left = 0;
//     let right = arr.length - 1;
//     let iteration = 0;
//
//     console.log(`Searching for ${target} in [${arr}]`);
//
//     while (left < right) {
//         const mid = Math.floor((left + right) / 2);
//         iteration++;
//         console.log(`Iteration ${iteration}: left=${left}, right=${right}, mid=${mid}, arr[mid]=${arr[mid]}`);
//
//         if (arr[mid] < target) {
//             left = mid + 1;
//             console.log(`  arr[mid] < target, so left = ${left}`);
//         } else {
//             right = mid;
//             console.log(`  arr[mid] >= target, so right = ${right}`);
//         }
//     }
//
//     console.log(`\nFinal: left=${left}, right=${right} (they're equal!)`);
//     console.log(`Target ${target} is at index ${left} or should be inserted there`);
// }
//
// // Run examples:
// traceSearch([1, 3, 5, 7, 9], 5);   // Found at index 2
// console.log("\n---\n");
// traceSearch([1, 3, 5, 7, 9], 4);   // Should be inserted at index 2
// console.log("\n---\n");
// traceSearch([1, 3, 5, 7, 9], 10);  // Should be inserted at index 5