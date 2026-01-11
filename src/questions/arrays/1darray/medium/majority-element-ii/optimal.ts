// Function to find elements appearing more than n/3 times
function majorityElement_optimal(nums: number[]): number[] {
  // Initialize two candidate elements and their counts
  let candidate1 = 0,
    candidate2 = 0;
  let count1 = 0,
    count2 = 0;

  // First pass: Find potential candidates
  for (const num of nums) {
    if (count1 === 0 && num !== candidate2) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0 && num !== candidate1) {
      candidate2 = num;
      count2 = 1;
    } else if (num === candidate1) {
      count1++;
    } else if (num === candidate2) {
      count2++;
    } else {
      // If different from both candidates, decrease both counts
      count1--;
      count2--;
    }
  }

  // Second pass: Count actual frequencies of candidates
  count1 = count2 = 0;
  for (const num of nums) {
    if (num === candidate1) count1++;
    else if (num === candidate2) count2++;
  }

  const result: number[] = [];
  const threshold = Math.floor(nums.length / 3);
  // Check if candidates appear more than n/3 times
  if (count1 > threshold) result.push(candidate1);
  if (count2 > threshold) result.push(candidate2);

  return result;
}

const nums_optimal = [3, 2, 3];
console.log(majorityElement_optimal(nums_optimal));
