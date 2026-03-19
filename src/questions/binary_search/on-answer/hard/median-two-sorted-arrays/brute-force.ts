/**
 * Median of Two Sorted Arrays - Brute Force Approach
 *
 * Problem: Find the median of two sorted arrays as if they were merged
 * Time Complexity: O(m + n) where m and n are lengths of arrays
 * Space Complexity: O(m + n) for the merged array
 *
 * Approach: Merge both arrays into a single sorted array, then find median
 */

function findMedianSortedArrays_brute_force() {
  // Test arrays
  let arr1 = [1, 3, 5, 7, 9]; // First sorted array
  let arr2 = [2, 4, 6, 8]; // Second sorted array
  let merged = []; // Array to store merged result

  // Two pointers to traverse both arrays
  let i = 0; // Pointer for arr1
  let j = 0; // Pointer for arr2

  // STEP 1: Merge elements while both arrays have remaining elements
  // Similar to merge step in merge sort algorithm
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      // arr1 element is smaller, add it to merged array
      merged.push(arr1[i]);
      i++;
    } else {
      // arr2 element is smaller or equal, add it to merged array
      // BUG FIX: Was arr1[right], should be arr2[j]
      merged.push(arr2[j]);
      j++;
    }
  }

  // STEP 2: Add remaining elements from arr1 (if any)
  // This happens when arr2 is exhausted first
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }

  // STEP 3: Add remaining elements from arr2 (if any)
  // This happens when arr1 is exhausted first
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  // STEP 4: Calculate median based on total number of elements
  const n = arr1.length + arr2.length;
  let median = 0;

  // Merged array at this point: [1,2,3,4,5,6,7,8,9]
  console.log('Merged array:', merged);

  if (n % 2 === 0) {
    // Even number of elements: median is average of two middle elements
    // Example: [1,2,3,4] → median = (arr[1] + arr[2])/2 = (2+3)/2 = 2.5
    // For n=4: mid indices are n/2-1=1 and n/2=2
    median = (merged[n / 2] + merged[n / 2 - 1]) / 2.0;
  } else {
    // Odd number of elements: median is the middle element
    // Example: [1,2,3,4,5] → median = arr[2] = 3
    // For n=5: mid index is floor(5/2) = 2
    median = merged[Math.floor(n / 2)];
  }

  return median;
}

// Execute and display result
console.log('Median:', findMedianSortedArrays_brute_force());
// Expected output: 5 (middle element of [1,2,3,4,5,6,7,8,9])

/**
 * NOTES:
 *
 * 1. BUG IN ORIGINAL CODE:
 *    Line 20 had: arr3.push(arr1[right])
 *    Should be: arr3.push(arr2[right]) or better arr2[j]
 *
 * 2. VARIABLE NAMING:
 *    - Using 'left' and 'right' for array pointers is confusing
 *    - Better to use 'i' and 'j' or 'ptr1' and 'ptr2'
 *
 * 3. MEDIAN CALCULATION:
 *    - Even length: average of two middle elements
 *    - Odd length: exact middle element
 *
 * 4. OPTIMIZATION:
 *    - For optimal O(log(min(m,n))) solution, use binary search
 *    - This brute force is O(m+n) but easier to understand
 */