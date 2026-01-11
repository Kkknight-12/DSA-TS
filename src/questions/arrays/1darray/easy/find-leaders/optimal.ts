// Store maximum element seen so far from right
function findLeaders(arr: number[]) {
  // Initialize maximum as -1 and result array to store leaders
  let greater = -1;
  const result: number[] = [];

  // Traverse array from right to left
  for (let i = arr.length - 1; i >= 0; i--) {
    // If current element is greater than or equal to maximum
    if (arr[i] >= greater) {
      // Update maximum
      greater = arr[i];
      // Add current element to result as it's a leader
      result.push(arr[i]);
    }
  }

  return result.sort((a, b) => b - a);
}

console.log(findLeaders([16, 17, 4, 3, 5, 2])); // [17, 5, 2]
console.log(findLeaders([10, 4, 2, 4, 1])); // [10, 4, 2, 1]
console.log(findLeaders([30, 10, 10, 5])); // [30, 10, 10, 5]
