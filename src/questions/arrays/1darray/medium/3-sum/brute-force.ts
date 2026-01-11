function triplet_bruteforce(n: number, arr: number[]) {
  // let st = new Set();
  let ans = [];

  // check all possible triplets:
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (arr[i] + arr[j] + arr[k] === 0) {
          let temp = [arr[i], arr[j], arr[k]];
          temp.sort((a, b) => a - b);
          ans.push(temp);
        }
      }
    }
  }

  //store the set in the answer:
  let set = new Set(ans.map((a) => JSON.stringify(a)));
  ans = Array.from(set).map((a) => JSON.parse(a));
  return ans;
}

let arr_3sum_b = [-1, 0, 1, 2, -1, -4];

let ans3_sum_brute = triplet_bruteforce(arr_3sum_b.length, arr_3sum_b);
for (let it of ans3_sum_brute) {
  process.stdout.write('[');
  for (let i of it) {
    process.stdout.write(i + ' ');
  }
  process.stdout.write('] ');
}
console.log();
