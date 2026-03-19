// https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=number-of-occurrence

/**
 * Finds the first occurrence of target in a sorted array
 * @param arr - The sorted array to search in
 * @param target - The value to find
 * @returns The index of the first occurrence, or -1 if not found
 */
function findFirstOccurrence(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1; // Default result if target is not found

  while (left <= right) {
    // Calculate middle index to avoid overflow
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      // Found a match, but need to check if it's the first occurrence
      result = mid; // Update the potential result

      // Continue searching in the left half to find the first occurrence
      right = mid - 1;
    } else if (arr[mid] < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
  }

  return result;
}

/**
 * Finds the last occurrence of target in a sorted array
 * @param arr - The sorted array to search in
 * @param target - The value to find
 * @returns The index of the last occurrence, or -1 if not found
 */
function findLastOccurrence(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1; // Default result if target is not found

  while (left <= right) {
    // Calculate middle index to avoid overflow
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      // Found a match, but need to check if it's the last occurrence
      result = mid; // Update the potential result

      // Continue searching in the right half to find the last occurrence
      left = mid + 1;
    } else if (arr[mid] < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
  }

  return result;
}

/**
 * Counts the number of occurrences of target in a sorted array
 * @param arr - The sorted array to search in
 * @param target - The value to count
 * @returns The number of occurrences of target in the array
 */
function countOccurrences(arr: number[], target: number): number {
  // Find the first and last occurrences
  const firstIndex = findFirstOccurrence(arr, target);

  // If the target is not in the array, return 0
  if (firstIndex === -1) {
    return 0;
  }

  // Find the last occurrence
  const lastIndex = findLastOccurrence(arr, target);

  // Calculate the count
  const count = lastIndex - firstIndex + 1;

  return count;
}

// Test cases
console.log(countOccurrences([1, 1, 2, 2, 2, 2, 3], 2)); // Expected output: 4
console.log(countOccurrences([1, 1, 2, 2, 2, 2, 3], 4)); // Expected output: 0
console.log(countOccurrences([8, 9, 10, 12, 12, 12], 12)); // Expected output: 3
