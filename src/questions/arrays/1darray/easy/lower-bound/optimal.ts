/**
 * Function to find the floor of k in a sorted array
 * @param arr - The sorted array
 * @param n - Size of the array
 * @param k - The number whose floor we need to find
 * @returns - The index of the floor element or -1 if not found
 */
function findFloor(arr: number[], n: number, k: number): number {
  // Traverse the array from right to left
  for (let i = n - 1; i >= 0; i--) {
    // If current element is less than or equal to k, return its index
    if (arr[i] <= k) {
      return i;
    }
  }

  // If no element is less than or equal to k, return -1
  return -1;
}
