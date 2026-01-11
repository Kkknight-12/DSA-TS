// Function to find elements appearing more than n/3 times
function majorityElement_better(nums: number[]): number[] {
  const n = nums.length;
  const threshold = Math.floor(n / 3);
  const countMap = new Map<number, number>();
  const result: number[] = [];

  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  for (const [num, count] of countMap) {
    console.log(num, count);
    if (count > threshold) {
      result.push(num);
    }
  }

  return result;
}

const nums_better = [3, 2, 3];
console.log(majorityElement_better(nums_better)); // [3]
