/**
 * Function to find floor and ceiling of a given number in an array
 * @param arr - The input array of integers
 * @param x - The number for which we need to find floor and ceiling
 * @returns An array containing [floor, ceiling]
 */
function findFloorAndCeiling(arr: number[], x: number): number[] {
  // Initialize floor and ceiling with -1
  let floor = -1;
  let ceiling = -1;

  // Traverse through the array
  for (let i = 0; i < arr.length; i++) {
    // Check if current element can be floor
    // Current element should be <= x and > current floor
    if (arr[i] <= x && arr[i] > floor) {
      floor = arr[i];
    }

    // Check if current element can be ceiling
    // Current element should be >= x and (ceiling is not set OR current element < current ceiling)
    if (arr[i] >= x && (ceiling === -1 || arr[i] < ceiling)) {
      ceiling = arr[i];
    }
  }

  // Return the floor and ceiling values
  return [floor, ceiling];
}
