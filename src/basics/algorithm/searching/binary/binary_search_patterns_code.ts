/**
 * Comprehensive Binary Search Patterns - Implementation Reference
 * This file contains all major binary search patterns with detailed explanations
 */

// ============================================================================
// PATTERN 1: CLASSIC BINARY SEARCH
// ============================================================================

/**
 * Classic Binary Search - Find exact element
 * Time: O(log n), Space: O(1)
 */
function classicBinarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Element not found
}

/**
 * Find Floor Value - Largest element <= target
 */
function findFloor(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] <= target) {
      result = mid; // Potential answer
      left = mid + 1; // Look for larger valid value
    } else {
      right = mid - 1;
    }
  }

  return result;
}

/**
 * Find Ceiling Value - Smallest element >= target
 */
function findCeiling(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] >= target) {
      result = mid; // Potential answer
      right = mid - 1; // Look for smaller valid value
    } else {
      left = mid + 1;
    }
  }

  return result;
}

// ============================================================================
// PATTERN 2: FIND FIRST/LAST OCCURRENCE
// ============================================================================

/**
 * Find First and Last Position of Element in Sorted Array
 */
function searchRange(nums: number[], target: number): number[] {
  const result: number[] = [-1, -1];

  // Find first occurrence
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      right = mid - 1; // Continue searching left
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Check if target exists
  if (left >= nums.length || nums[left] !== target) {
    return result;
  }

  result[0] = left;

  // Find last occurrence
  right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      left = mid + 1; // Continue searching right
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  result[1] = right;
  return result;
}

// ============================================================================
// PATTERN 3: SEARCH IN ROTATED ARRAY
// ============================================================================

/**
 * Search in Rotated Sorted Array
 */
function searchRotated(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Check which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

/**
 * Find Minimum in Rotated Sorted Array
 */
function findMinRotated(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  // Array is not rotated
  if (nums[left] < nums[right]) {
    return nums[left];
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1; // Min is in right half
    } else {
      right = mid; // Min is at mid or left half
    }
  }

  return nums[left];
}

// ============================================================================
// PATTERN 4: BINARY SEARCH ON ANSWER SPACE
// ============================================================================

/**
 * Minimum Eating Speed (Koko eating bananas)
 */
function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);

  const canEatAll = (speed: number): boolean => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
      if (hours > h) return false;
    }
    return true;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canEatAll(mid)) {
      right = mid; // Try smaller speed
    } else {
      left = mid + 1; // Need faster speed
    }
  }

  return left;
}

/**
 * Capacity to Ship Packages Within D Days
 */
function shipWithinDays(weights: number[], days: number): number {
  let left = Math.max(...weights); // Min capacity
  let right = weights.reduce((sum, w) => sum + w, 0); // Max capacity

  const canShip = (capacity: number): boolean => {
    let daysNeeded = 1;
    let currentLoad = 0;

    for (const weight of weights) {
      if (currentLoad + weight > capacity) {
        daysNeeded++;
        currentLoad = weight;
        if (daysNeeded > days) return false;
      } else {
        currentLoad += weight;
      }
    }
    return true;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canShip(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

/**
 * Book Allocation Problem - Minimize maximum pages
 */
function allocateBooks(books: number[], students: number): number {
  if (students > books.length) return -1;

  let left = Math.max(...books);
  let right = books.reduce((sum, pages) => sum + pages, 0);

  const canAllocate = (maxPages: number): boolean => {
    let studentsNeeded = 1;
    let currentPages = 0;

    for (const pages of books) {
      if (currentPages + pages > maxPages) {
        studentsNeeded++;
        currentPages = pages;
        if (studentsNeeded > students) return false;
      } else {
        currentPages += pages;
      }
    }
    return true;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canAllocate(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

/**
 * Aggressive Cows - Maximize minimum distance
 */
function aggressiveCows(stalls: number[], cows: number): number {
  stalls.sort((a, b) => a - b);

  let left = 1;
  let right = stalls[stalls.length - 1] - stalls[0];
  let result = -1;

  const canPlace = (minDist: number): boolean => {
    let cowsPlaced = 1;
    let lastPos = stalls[0];

    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - lastPos >= minDist) {
        cowsPlaced++;
        lastPos = stalls[i];
        if (cowsPlaced === cows) return true;
      }
    }
    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canPlace(mid)) {
      result = mid;
      left = mid + 1; // Try for larger distance
    } else {
      right = mid - 1;
    }
  }

  return result;
}

// ============================================================================
// PATTERN 5: PEAK/VALLEY FINDING
// ============================================================================

/**
 * Find Peak Element - Any local maximum
 */
function findPeakElement(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1; // Peak is on right (ascending)
    } else {
      right = mid; // Peak is at mid or left
    }
  }

  return left;
}

// ============================================================================
// PATTERN 6: MATHEMATICAL BINARY SEARCH
// ============================================================================

/**
 * Square Root of a Number (Floor value)
 */
function sqrt(n: number): number {
  if (n === 0 || n === 1) return n;

  let left = 1;
  let right = n;
  let result = 0;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (mid * mid === n) {
      return mid;
    } else if (mid * mid < n) {
      left = mid + 1;
      result = mid; // Store floor value
    } else {
      right = mid - 1;
    }
  }

  return result;
}

/**
 * Nth Root of a Number
 */
function nthRoot(n: number, m: number): number {
  if (m === 1 || n === 1) return m;

  let left = 1;
  let right = m;

  // Helper to prevent overflow
  const power = (base: number, exp: number, limit: number): number => {
    let result = 1;
    for (let i = 0; i < exp; i++) {
      result *= base;
      if (result > limit) return 1; // Greater
    }
    if (result === limit) return 0; // Equal
    return -1; // Less
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = power(mid, n, m);

    if (comparison === 0) return mid;
    else if (comparison === -1) left = mid + 1;
    else right = mid - 1;
  }

  return -1; // No integer nth root exists
}

// ============================================================================
// PATTERN 7: MEDIAN OF TWO SORTED ARRAYS
// ============================================================================

/**
 * Find Median of Two Sorted Arrays
 */
function findMedianSortedArrays(arr1: number[], arr2: number[]): number {
  // Ensure arr1 is smaller
  if (arr1.length > arr2.length) {
    return findMedianSortedArrays(arr2, arr1);
  }

  const n1 = arr1.length;
  const n2 = arr2.length;
  const total = n1 + n2;
  const halfLength = Math.floor((total + 1) / 2);

  let low = 0;
  let high = n1;

  while (low <= high) {
    const partition1 = Math.floor((low + high) / 2);
    const partition2 = halfLength - partition1;

    const maxLeft1 = partition1 === 0 ? -Infinity : arr1[partition1 - 1];
    const minRight1 = partition1 === n1 ? Infinity : arr1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : arr2[partition2 - 1];
    const minRight2 = partition2 === n2 ? Infinity : arr2[partition2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if (total % 2 === 1) {
        return Math.max(maxLeft1, maxLeft2);
      } else {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      }
    } else if (maxLeft1 > minRight2) {
      high = partition1 - 1;
    } else {
      low = partition1 + 1;
    }
  }

  return 0;
}

// ============================================================================
// PATTERN 8: MISSING ELEMENTS
// ============================================================================

/**
 * K-th Missing Positive Number
 */
function findKthPositive(arr: number[], k: number): number {
  if (k <= arr[0] - 1) return k;

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const missingCount = arr[mid] - (mid + 1);

    if (missingCount < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return k + right + 1;
}

/**
 * Single Element in Sorted Pairs Array
 */
function singleNonDuplicate(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // Ensure mid is even for pattern checking
    if (mid % 2 === 1) mid--;

    if (nums[mid] === nums[mid + 1]) {
      left = mid + 2; // Pattern intact, single on right
    } else {
      right = mid; // Pattern broken, single on left or at mid
    }
  }

  return nums[left];
}

// ============================================================================
// ADDITIONAL PATTERNS
// ============================================================================

/**
 * Find Smallest Divisor Given a Threshold
 */
function smallestDivisor(nums: number[], threshold: number): number {
  let left = 1;
  let right = Math.max(...nums);

  const isValid = (divisor: number): boolean => {
    let sum = 0;
    for (const num of nums) {
      sum += Math.ceil(num / divisor);
      if (sum > threshold) return false;
    }
    return true;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (isValid(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

/**
 * Minimum Days to Make M Bouquets
 */
function minDays(bloomDay: number[], m: number, k: number): number {
  if (m * k > bloomDay.length) return -1;

  let left = Math.min(...bloomDay);
  let right = Math.max(...bloomDay);

  const canMakeBouquets = (days: number): boolean => {
    let bouquets = 0;
    let consecutive = 0;

    for (const bloom of bloomDay) {
      if (bloom <= days) {
        consecutive++;
        if (consecutive === k) {
          bouquets++;
          consecutive = 0;
          if (bouquets === m) return true;
        }
      } else {
        consecutive = 0;
      }
    }
    return false;
  };

  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canMakeBouquets(mid)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

// ============================================================================
// UTILITY FUNCTIONS AND HELPERS
// ============================================================================

/**
 * Binary Search Template with Custom Comparator
 */
function binarySearchWithComparator<T>(
  arr: T[],
  target: T,
  compareFn: (a: T, b: T) => number
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    const comparison = compareFn(arr[mid], target);

    if (comparison === 0) {
      return mid;
    } else if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

/**
 * Lower Bound - First element >= target
 */
function lowerBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

/**
 * Upper Bound - First element > target
 */
function upperBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

// ============================================================================
// TESTING AND EXAMPLES
// ============================================================================

// Example usage and testing
function runExamples(): void {
  console.log('Binary Search Patterns - Examples');
  console.log('==================================');

  // Pattern 1: Classic Binary Search
  console.log('Pattern 1: Classic Binary Search');
  console.log('Search for 7 in [1,3,5,7,9]:', classicBinarySearch([1, 3, 5, 7, 9], 7));
  console.log('Floor of 6 in [1,3,5,7,9]:', findFloor([1, 3, 5, 7, 9], 6));
  console.log('Ceiling of 6 in [1,3,5,7,9]:', findCeiling([1, 3, 5, 7, 9], 6));

  // Pattern 2: First/Last Occurrence
  console.log('\nPattern 2: First/Last Occurrence');
  console.log('Range of 8 in [5,7,7,8,8,10]:', searchRange([5, 7, 7, 8, 8, 10], 8));

  // Pattern 3: Rotated Array
  console.log('\nPattern 3: Rotated Array');
  console.log('Search 0 in [4,5,6,7,0,1,2]:', searchRotated([4, 5, 6, 7, 0, 1, 2], 0));
  console.log('Min in [3,4,5,1,2]:', findMinRotated([3, 4, 5, 1, 2]));

  // Pattern 4: Answer Space
  console.log('\nPattern 4: Binary Search on Answer');
  console.log('Min eating speed for [3,6,7,11], h=8:', minEatingSpeed([3, 6, 7, 11], 8));
  console.log('Ship capacity for [1,2,3,4,5,6,7,8,9,10], days=5:',
    shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));

  // Pattern 5: Peak Element
  console.log('\nPattern 5: Peak Element');
  console.log('Peak in [1,2,3,1]:', findPeakElement([1, 2, 3, 1]));

  // Pattern 6: Mathematical
  console.log('\nPattern 6: Mathematical');
  console.log('Square root of 8:', sqrt(8));
  console.log('3rd root of 27:', nthRoot(3, 27));

  // Pattern 7: Median
  console.log('\nPattern 7: Median of Two Arrays');
  console.log('Median of [1,3] and [2]:', findMedianSortedArrays([1, 3], [2]));

  // Pattern 8: Missing Elements
  console.log('\nPattern 8: Missing Elements');
  console.log('5th missing in [2,3,4,7,11]:', findKthPositive([2, 3, 4, 7, 11], 5));
  console.log('Single in [1,1,2,3,3,4,4,8,8]:', singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]));
}

// Export all functions for use in other modules
export {
  // Pattern 1
  classicBinarySearch,
  findFloor,
  findCeiling,
  // Pattern 2
  searchRange,
  // Pattern 3
  searchRotated,
  findMinRotated,
  // Pattern 4
  minEatingSpeed,
  shipWithinDays,
  allocateBooks,
  aggressiveCows,
  // Pattern 5
  findPeakElement,
  // Pattern 6
  sqrt,
  nthRoot,
  // Pattern 7
  findMedianSortedArrays,
  // Pattern 8
  findKthPositive,
  singleNonDuplicate,
  // Additional
  smallestDivisor,
  minDays,
  // Utilities
  binarySearchWithComparator,
  lowerBound,
  upperBound,
  // Testing
  runExamples
};