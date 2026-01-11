// function nextPermutation_brute(nums: number[]) {
//   // Helper function to compare two arrays lexicographically
//   function compareArrays(a: number[], b: number[]): number {
//     for (let i = 0; i < a.length; i++) {
//       if (a[i] !== b[i]) return a[i] - b[i];
//     }
//     return 0;
//   }

//   // Helper function to generate all permutations
//   function generatePermutations(arr: number[]): number[][] {
//     const result: number[][] = [];

//     if (arr.length === 1) {
//       return [arr];
//     }

//     // Use Set to handle duplicates
//     const used = new Set<number>();

//     for (let i = 0; i < arr.length; i++) {
//       // Skip if we've already used this number at this position
//       if (used.has(arr[i])) continue;
//       used.add(arr[i]);

//       const currentNum = arr[i];
//       console.log('currentNum ', currentNum);
//       const remainingNums = [...arr.slice(0, i), ...arr.slice(i + 1)];
//       console.log('remainingNums ', remainingNums);

//       const remainingPermutations = generatePermutations(remainingNums);
//       console.log('remainingPermutations ', remainingPermutations);

//       for (const perm of remainingPermutations) {
//         result.push([currentNum, ...perm]);
//       }
//     }

//     console.log('result ', result);
//     return result;
//   }

//   const allPerms = generatePermutations([...nums]);

//   // Sort with proper handling of duplicates
//   allPerms.sort(compareArrays);

//   // Remove duplicates from sorted permutations
//   const uniquePerms = allPerms.filter((perm, index) => {
//     if (index === 0) return true;
//     return compareArrays(perm, allPerms[index - 1]) !== 0;
//   });

//   // Find current permutation
//   let currentIndex = -1;
//   for (let i = 0; i < uniquePerms.length; i++) {
//     if (compareArrays(uniquePerms[i], nums) === 0) {
//       currentIndex = i;
//       break;
//     }
//   }

//   // Get next permutation or first one if at end
//   const nextPerm = uniquePerms[(currentIndex + 1) % uniquePerms.length];

//   // Update original array
//   for (let i = 0; i < nums.length; i++) {
//     nums[i] = nextPerm[i];
//   }

//   return nums;
// }

// console.log(nextPermutation_brute([3, 4, 1, 2, 9, 8])); // [1, 3, 2]

// const result = [];
// const currentNum = 2;
// const remainingPermutations = [[3, 3]];
// for (const perm of remainingPermutations) {
//   console.log('perm ', perm);
//   result.push([currentNum, ...perm]);
// }

// console.log('result ', result);

// const aw = [2, 3];
// let i = 1;
// console.log([...aw.slice(0, i), ...aw.slice(i + 1)]);

// const ww = ['a', 'b', 'c', 'd'];

// console.log(ww.slice(0, 2));
// console.log(ww.slice(3));
