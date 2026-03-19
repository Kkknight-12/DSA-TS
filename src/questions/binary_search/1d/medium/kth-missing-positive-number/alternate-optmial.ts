// Alternative implementation with more detailed comments
function findKthPositiveDetailed(arr: number[], k: number): number {
  const n = arr.length;

  // Helper function to calculate missing count till index i
  const getMissingCount = (index: number): number => {
    return arr[index] - (index + 1);
  };

  // Edge case: All k missing numbers are before arr[0]
  if (getMissingCount(0) >= k) {
    return k;
  }

  let left = 0;
  let right = n - 1;

  // Binary search for the boundary
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentMissing = getMissingCount(mid);

    if (currentMissing < k) {
      // Need more missing numbers, go right
      left = mid + 1;
    } else {
      // Too many missing numbers, go left
      right = mid - 1;
    }
  }

  // Calculate the answer
  // right is the last index where missing count < k
  const missingTillRight = getMissingCount(right);
  const remainingToFind = k - missingTillRight;

  return arr[right] + remainingToFind;
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