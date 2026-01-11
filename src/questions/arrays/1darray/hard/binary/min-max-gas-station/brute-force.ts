function minimiseMaxDistance(arr: number[], k: number) {
  const n = arr.length; //size of array.
  const howMany = new Array(n - 1).fill(0);
  console.log('howMany ', howMany);
  // howMany -> [ 0, 0, 0, 0 ]
  // k -> 4

  //Pick and place k gas stations:
  for (let gasStations = 1; gasStations <= k; gasStations++) {
    //Find the maximum section and insert the gas station:
    let maxSection = -1;
    let maxInd = -1;

    for (let i = 0; i < n - 1; i++) {
      const diff = arr[i + 1] - arr[i];
      const sectionLength = diff / (howMany[i] + 1);
      if (sectionLength > maxSection) {
        maxSection = sectionLength;
        maxInd = i;
      }
    }

    //insert the current gas station:
    howMany[maxInd]++;
  }

  //Find the maximum distance i.e. the answer:
  let maxAns = -1;

  for (let i = 0; i < n - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    const sectionLength = diff / (howMany[i] + 1);
    maxAns = Math.max(maxAns, sectionLength);
  }

  return maxAns;
}

const arr = [1, 2, 3, 4, 5];
const _k = 4;
const _ans = minimiseMaxDistance(arr, _k);
console.log('The answer is:', _ans);