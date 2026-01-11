function mergeSort(arr: number[]): number[] {
  console.log('arr', arr);
  // Base case: if array has 1 or 0 elements, it's already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle point to divide array into two halves
  const middle = Math.floor(arr.length / 2);
  console.log('middle', middle);

  // Divide array into left and right halves
  const leftHalf = arr.slice(0, middle);
  const rightHalf = arr.slice(middle);

  // Recursively sort both halves
  // This will keep dividing until we reach arrays of size 1
  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge(left: number[], right: number[]): number[] {
  console.log('left', left);
  console.log('right', right);
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both arrays and add smaller one to result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from left array (if any)
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from right array (if any)
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  console.log('result', result);

  return result;
}

console.log(mergeSort([64, 34, 25, 12])); // [12, 25, 34, 64]
