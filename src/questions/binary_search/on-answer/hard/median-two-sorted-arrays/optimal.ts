// https://www.notion.so/Median-of-Two-Sorted-Arrays-of-different-sizes-19fa26808968806faf6aea7c858432d1

/**
 * Find median of two sorted arrays using Binary Search
 * Time Complexity: O(log(min(m, n)))
 * Space Complexity: O(1)
 *
 * Core Idea: Instead of merging arrays, we find the perfect partition
 * that divides both arrays into left and right halves such that:
 * - All elements in left half <= All elements in right half
 * - Both halves have equal (or differ by 1) number of elements
 */
function findMedianSortedArrays(arr1: number[], arr2: number[]): number {
  // Step 1: Ensure arr1 is the smaller array for optimization
  // Binary search on smaller array reduces time complexity
  let n1 = arr1.length;
  let n2 = arr2.length;

  // Agar arr1 bada hai, to swap kar do arrays ko
  // Kyunki hum smaller array pe binary search karenge (less iterations)
  if (n1 > n2) {
    return findMedianSortedArrays(arr2, arr1);
  }

  // Step 2: Calculate total length and left half size
  const totalLength = n1 + n2;

  // Left half mein kitne elements honge?
  // +1 karne se odd case mein extra element left mein jayega
  // Example: 9 elements total → left half = 5, right half = 4
  const leftHalfSize = Math.floor((totalLength + 1) / 2);

  // Step 3: Binary search setup on arr1
  // low = minimum elements we can take from arr1 (0)
  // high = maximum elements we can take from arr1 (all n1 elements)
  let low = 0;
  let high = n1;

  // Step 4: Binary search loop - finding the perfect partition
  while (low <= high) {
    // mid1 = kitne elements arr1 se lenge left half mein
    const partitionArr1 = Math.floor((low + high) / 2);

    // mid2 = kitne elements arr2 se lenge left half mein
    // Total left half - arr1 contribution = arr2 contribution
    const partitionArr2 = leftHalfSize - partitionArr1;

    // Step 5: Find boundary elements for validation
    // l1 = largest element in left partition from arr1
    // l2 = largest element in left partition from arr2
    // r1 = smallest element in right partition from arr1
    // r2 = smallest element in right partition from arr2

    // Initialize with extreme values to handle edge cases
    // Jab koi partition empty ho (0 elements from an array)
    let leftMax1 = Number.MIN_SAFE_INTEGER; // arr1 left partition ka max
    let leftMax2 = Number.MIN_SAFE_INTEGER; // arr2 left partition ka max
    let rightMin1 = Number.MAX_SAFE_INTEGER; // arr1 right partition ka min
    let rightMin2 = Number.MAX_SAFE_INTEGER; // arr2 right partition ka min

    // Get actual values if partitions exist
    // Check karo ki partition valid hai (index out of bounds na ho)

    // Agar arr1 ka right partition exists (partition < n1)
    if (partitionArr1 < n1) {
      rightMin1 = arr1[partitionArr1]; // Right partition starts at partitionArr1
    }

    // Agar arr2 ka right partition exists (partition < n2)
    if (partitionArr2 < n2) {
      rightMin2 = arr2[partitionArr2]; // Right partition starts at partitionArr2
    }

    // Agar arr1 ka left partition exists (at least 1 element)
    if (partitionArr1 > 0) {
      leftMax1 = arr1[partitionArr1 - 1]; // Last element of left partition
    }

    // Agar arr2 ka left partition exists (at least 1 element)
    if (partitionArr2 > 0) {
      leftMax2 = arr2[partitionArr2 - 1]; // Last element of left partition
    }

    // Step 6: Check if we found the valid partition
    // Valid partition condition:
    // Left partition ke saare elements <= Right partition ke saare elements
    if (leftMax1 <= rightMin2 && leftMax2 <= rightMin1) {
      // Perfect partition mil gaya! Ab median calculate karo

      // Odd number of total elements
      if (totalLength % 2 === 1) {
        // Median = left half ka maximum element
        // Kyunki left half mein ek extra element hai
        return Math.max(leftMax1, leftMax2);
      }
      // Even number of total elements
      else {
        // Median = (left half ka max + right half ka min) / 2
        // Ye do middle elements ka average hai
        const leftMax = Math.max(leftMax1, leftMax2);
        const rightMin = Math.min(rightMin1, rightMin2);
        return (leftMax + rightMin) / 2;
      }
    }
    // Step 7: Adjust binary search based on invalid partition
    else if (leftMax1 > rightMin2) {
      // arr1 se zyada elements le liye left half mein
      // arr1 ka left partition bada ho gaya
      // Solution: arr1 se kam elements lo (move left)
      high = partitionArr1 - 1;
    } else {
      // leftMax2 > rightMin1 ka case
      // arr2 se zyada elements le liye left half mein
      // Solution: arr1 se zyada elements lo (move right)
      low = partitionArr1 + 1;
    }
  }

  // This should never execute if input arrays are valid
  // Safety return for TypeScript compilation
  return 0;
}

// Test the function with examples
function runTests_findMedianSortedArrays(): void {
  // Test Case 1: Different sized arrays (odd total)
  const arr1 = [1, 4, 7, 10, 12];
  const arr2 = [2, 3, 6, 15];
  console.log('Test 1 - Arrays:', arr1, 'and', arr2);
  console.log('Median:', findMedianSortedArrays(arr1, arr2));
  console.log('Expected: 6\n');

  // Test Case 2: Even total elements
  const arr3 = [1, 3];
  const arr4 = [2, 4];
  console.log('Test 2 - Arrays:', arr3, 'and', arr4);
  console.log('Median:', findMedianSortedArrays(arr3, arr4));
  console.log('Expected: 2.5\n');

  // Test Case 3: One empty array
  const arr5: number[] = [];
  const arr6 = [1];
  console.log('Test 3 - Arrays:', arr5, 'and', arr6);
  console.log('Median:', findMedianSortedArrays(arr5, arr6));
  console.log('Expected: 1\n');
}

// Run the tests
runTests_findMedianSortedArrays();