function majorityElement_bruteforce(nums: number[]): number[] {
  const n = nums.length;
  const threshold = Math.floor(n / 3); // Calculate threshold
  const result: number[] = []; // Store result elements

  // For each unique element
  for (let i = 0; i < n; i++) {
    // Skip if element already in result
    if (result.includes(nums[i])) continue;

    let count = 0; // Count frequency
    // Count occurrences
    for (let j = 0; j < n; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }

    // If count > n/3, add to result
    if (count > threshold) {
      result.push(nums[i]);
    }
  }

  return result;
}

const nums = [3, 2, 3];
console.log(majorityElement_bruteforce(nums));
