function triplet_better(nums: number[]): number[][] {
  let ans: number[][] = [];
  const n = nums.length;

  // Sort the array first to handle duplicates better
  nums.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    // Skip duplicates for i to avoid duplicate triplets
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Create a hashset for each iteration of i
    const hashSet = new Set<number>();

    for (let j = i + 1; j < n; j++) {
      // Calculate the value we need to find
      // arr[i] + arr[j] + arr[k] = 0
      // arr[k] = -(arr[i] + arr[j])
      const thirdVal = -(nums[i] + nums[j]);

      // If we found this value in our hashset, we found a triplet
      if (hashSet.has(thirdVal)) {
        ans.push([nums[i], nums[j], thirdVal]);
      }

      // Add current number to hashset
      hashSet.add(nums[j]);
    }
  }

  // Remove duplicates using Set
  const uniqueTriplets = new Set(ans.map((triplet) => JSON.stringify(triplet)));
  return Array.from(uniqueTriplets).map((triplet) => JSON.parse(triplet));
}

let arr_3sum_better = [-1, 0, 1, 2, -1, -4];

let ans3_sum_better = triplet_better(arr_3sum_better);
for (let it of ans3_sum_better) {
  process.stdout.write('[');
  for (let i of it) {
    process.stdout.write(i + ' ');
  }
  process.stdout.write('] ');
}
console.log();
