function subarraySum(nums: number[], k: number): number {
  // Map to store prefix sum frequencies
  const sumFreq = new Map<number, number>();

  let currentSum = 0;
  let count = 0;

  // Initialize map with 0 sum seen once
  sumFreq.set(0, 1);

  for (let i = 0; i < nums.length; i++) {
    // Calculate current prefix sum
    currentSum += nums[i];

    // If (currentSum - k) exists in map,
    // we found subarrays summing to k
    if (sumFreq.has(currentSum - k)) {
      count += sumFreq.get(currentSum - k)!;
    }

    // Update prefix sum frequency
    sumFreq.set(currentSum, (sumFreq.get(currentSum) || 0) + 1);
  }

  return count;
}
/* 
-----------------------------------------------------------------
Dry Run:
  Let's dry run with nums = [1,1,1], k = 2

-----------------------------------------------------------------
Initialize: sumFreq = {0: 1}, currentSum = 0, count = 0

-----------------------------------------------------------------
i = 0:

currentSum = 1
Check if (1-2 = -1) exists in map: No
Update map: {0: 1, 1: 1}

-----------------------------------------------------------------
i = 1:

currentSum = 2
Check if (2-2 = 0) exists in map: Yes! count += 1
Update map: {0: 1, 1: 1, 2: 1}

-----------------------------------------------------------------
i = 2:

currentSum = 3
Check if (3-2 = 1) exists in map: Yes! count += 1
Update map: {0: 1, 1: 1, 2: 1, 3: 1}

-----------------------------------------------------------------
Final count = 2
-----------------------------------------------------------------
*/