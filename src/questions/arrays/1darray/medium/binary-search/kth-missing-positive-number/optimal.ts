// https://www.notion.so/1-D-Array-basics-and-Questions-ca951440079a4a32b662c41a6aeb2f52?p=1b2a2680896880628bf3cbdac68f7344&pm=s

// arr = [2,3,4,7,11]
// index - actual-value    -  current-value  - missing-value
//         [ index + 1]
// 0     | 1               | 2               | 2 - 1 => 1
// 1     | 2               | 3               | 3 - 2 => 1
// 2     | 3               | 4               | 4 - 3 => 1
// 3     | 4               | 7               | 7 - 4 => 3
// 4     | 5               | 11              | 11 - 5 => 6

//                   1, 2, 3, 4, 5, 6,
// Missing numbers: [1, 5, 6, 8, 9, 10]
// we want to find 5th missing number -> 9

/**
 * Purpose: Find the kth missing positive number from a sorted array using Binary Search
 * Time Complexity: O(log n) - Binary search on array indices
 * Space Complexity: O(1) - Only using constant extra space
 *
 * Key Insight: Missing numbers till index i = arr[i] - (i + 1)
 * We binary search to find the boundary where missing count becomes >= k
 */

function findKthPositive(arr: number[], k: number): number {
  // Edge case: Agar sabse pehle hi k missing numbers hain
  // arr[0] - 1 gives missing numbers before first element
  if (k <= arr[0] - 1) {
    return k;
  }

  // Binary search setup
  let left = 0; // Left pointer - start of array
  let right = arr.length - 1; // Right pointer - end of array

  // Binary search to find the position where missing count >= k
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Calculate missing numbers till arr[mid]
    // Formula: arr[mid] - (mid + 1)
    // Why? Expected value at index mid = mid + 1
    // Actual value = arr[mid]
    // Missing = actual - expected
    const missingCount = arr[mid] - (mid + 1);

    if (missingCount < k) {
      // Current position mein enough missing numbers nahi hain
      // Right side mein jao (more missing numbers)
      left = mid + 1;
    } else {
      // Current position mein k ya usse zyada missing numbers hain
      // Left side mein potential better answer ho sakta hai
      right = mid - 1;
    }
  }

  // After binary search:
  // 'right' points to the largest index where missing count < k
  // 'left' points to the smallest index where missing count >= k

  // Formula to calculate kth missing number:
  // arr[right] + (k - missing_count_till_right)
  // missing_count_till_right = arr[right] - (right + 1)
  // Simplifying: arr[right] + k - arr[right] + right + 1 = k + right + 1

  return k + right + 1;
}

// Test cases
console.log('Test Case 1:');
console.log('Input: arr = [2,3,4,7,11], k = 5');
console.log('Output:', findKthPositive([2, 3, 4, 7, 11], 5)); // Expected: 9

console.log('\nTest Case 2:');
console.log('Input: arr = [1,2,3,4], k = 2');
console.log('Output:', findKthPositive([1, 2, 3, 4], 2)); // Expected: 6

console.log('\nTest Case 3:');
console.log('Input: arr = [2], k = 1');
console.log('Output:', findKthPositive([2], 1)); // Expected: 1