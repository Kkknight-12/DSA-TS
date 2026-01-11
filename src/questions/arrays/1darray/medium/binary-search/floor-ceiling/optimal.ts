/**
 * Find floor and ceiling of x in sorted array a
 *
 * @param a - Sorted array of integers
 * @param n - Size of array
 * @param x - Target value
 * @returns - Array containing [floor, ceiling]
 */
function findFloorCeiling(a: number[], n: number, x: number): number[] {
  // Initialize floor and ceiling values
  let floor = -1; // Default value when no floor exists
  let ceiling = -1; // Default value when no ceiling exists

  // Binary search implementation
  let left = 0;
  let right = n - 1;

  // Binary search for floor value
  while (left <= right) {
    // Find middle index
    const mid = Math.floor(left + (right - left) / 2);

    if (a[mid] === x) {
      // If x matches mid element, it's both floor and ceiling
      return [x, x];
    } else if (a[mid] < x) {
      // If mid element is less than x, it could be floor
      // Update floor and search in right half
      floor = a[mid];
      left = mid + 1;
    } else {
      // If mid element is greater than x, it could be ceiling
      // Update ceiling (if not set yet or found better) and search in left half
      if (ceiling === -1 || a[mid] < ceiling) {
        ceiling = a[mid];
      }
      right = mid - 1;
    }
  }

  // For ceiling, check if we didn't find it in the first pass
  if (ceiling === -1) {
    // Second pass to find ceiling, this is only needed if
    // we didn't find x in the array and didn't update ceiling
    left = 0;
    right = n - 1;

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);

      if (a[mid] >= x) {
        // Update ceiling and search in left half
        ceiling = a[mid];
        right = mid - 1;
      } else {
        // Search in right half
        left = mid + 1;
      }
    }
  }

  return [floor, ceiling];
}

// Alternative approach using separate binary searches
function findFloorCeilingOptimal(a: number[], n: number, x: number): number[] {
  // Function to find floor using binary search
  const findFloor = (arr: number[], target: number): number => {
    let left = 0;
    let right = n - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);

      if (arr[mid] <= target) {
        // Potential floor value, update result and search right
        result = arr[mid];
        left = mid + 1;
      } else {
        // Search in left half
        right = mid - 1;
      }
    }

    return result;
  };

  // Function to find ceiling using binary search
  const findCeiling = (arr: number[], target: number): number => {
    let left = 0;
    let right = n - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);

      if (arr[mid] >= target) {
        // Potential ceiling value, update result and search left
        result = arr[mid];
        right = mid - 1;
      } else {
        // Search in right half
        left = mid + 1;
      }
    }

    return result;
  };

  // Find floor and ceiling
  const floor = findFloor(a, x);
  const ceiling = findCeiling(a, x);

  return [floor, ceiling];
}

// Example usage
const array = [3, 4, 7, 8, 8, 10];
const target = 5;
console.log(
  `Floor and ceiling of ${target} are:`,
  findFloorCeilingOptimal(array, array.length, target)
);
