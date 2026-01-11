function longestEqualSubarray_optimal(nums: number[], k: number): number {
  // Map each number to array of its indices
  const indexMap = new Map<number, number[]>();

  // Build the index map
  nums.forEach((num, i) => {
    if (!indexMap.has(num)) {
      indexMap.set(num, []);
    }
    indexMap.get(num)!.push(i);
  });

  let maxLen = 0;

  // Check each unique number
  indexMap.forEach((indices) => {
    let left = 0;
    let currentMax = 0;

    // Slide window over indices
    for (let right = 0; right < indices.length; right++) {
      // Check if gaps in current window exceed k
      while (indices[right] - indices[left] - (right - left) > k) {
        left++;
      }
      currentMax = Math.max(currentMax, right - left + 1);
    }
    maxLen = Math.max(maxLen, currentMax);
  });

  return maxLen;
}

console.log(longestEqualSubarray_optimal([1, 3, 2, 3, 1, 3], 3)); // 3
console.log(longestEqualSubarray_optimal([1, 1, 2, 2, 1, 1], 2)); // 4

/* 

        0, 1, 2, 3, 4, 5
nums = [1, 3, 2, 3, 1, 3], k = 3
For 3's indices [1,3,5]:
Span: 5-1 = 4
Elements: 3
Gaps = 4-2 = 2 (within k=3)

Take indices [1,3,5] (positions of number 3):
CopyArray:     [1, 3, 2, 3, 1, 3]
Index:          0  1  2  3  4  5
Formula breakdown: (indices[right] - indices[left] - (right - left))

indices[right] - indices[left] = total span

For [1,3,5]: 5-1 = 4 positions

(right - left) = number of 3's - 1

For [1,3,5]: 2-0 = 2 positions

The difference = gaps to fill

4-2 = 2 elements need to be deleted

*/
