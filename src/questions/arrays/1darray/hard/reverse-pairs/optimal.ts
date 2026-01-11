function reversePairs(nums: number[]): number {
  // Helper function to perform merge sort and count reverse pairs
  function mergeSortAndCount(
    nums: number[],
    left: number,
    right: number
  ): number {
    if (left >= right) return 0; // Base case: no pairs in a single element

    const mid = Math.floor((left + right) / 2);
    // console.log(`mid-> ${mid}, left->  ${left}, right-> ${right}`);
    console.log('');

    // Recursively count reverse pairs in the left and right halves
    let count =
      mergeSortAndCount(nums, left, mid) +
      mergeSortAndCount(nums, mid + 1, right);
    console.log('count', count);

    // Count reverse pairs across the two halves
    let i = left; // Pointer for the left half
    let j = mid + 1; // Pointer for the right half
    console.log('i', i);
    console.log('j', j);

    while (i <= mid) {
      console.log('nums[i]', nums[i]);
      console.log('nums[j]', nums[j]);
      while (j <= right && nums[i] > 2 * nums[j]) {
        j++;
      }
      count += j - (mid + 1); // Add the number of valid pairs for nums[i]
      i++;
    }

    // Merge the two sorted halves
    const sorted = [];
    i = left;
    j = mid + 1;

    while (i <= mid && j <= right) {
      if (nums[i] <= nums[j]) {
        console.log('i < j');
        sorted.push(nums[i]);
        i++;
      } else {
        sorted.push(nums[j]);
        j++;
      }
    }

    // Add remaining elements from the left half
    while (i <= mid) {
      sorted.push(nums[i]);
      i++;
    }

    // Add remaining elements from the right half
    while (j <= right) {
      sorted.push(nums[j]);
      j++;
    }

    // Copy the sorted array back to the original array
    for (let k = left; k <= right; k++) {
      nums[k] = sorted[k - left];
    }

    console.log('sorted ', sorted);
    console.log('nums ', nums);
    console.log();
    return count;
  }

  return mergeSortAndCount(nums, 0, nums.length - 1);
}

// Example usage:
console.log(reversePairs([1, 3, 2, 3, 1])); // Output: 2
console.log(reversePairs([2, 4, 3, 5, 1])); // Output: 3
