function a(nums: number[]) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid != high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
    console.log(nums);
  }

  return nums;
}

console.log(a([2, 0, 2, 1, 1, 0]));
// console.log(a([2, 0, 2, 1, 1, 0]));

/* 
low
↓
mid            high
↓               ↓
[2, 0, 2, 1, 1, 0]

when mid is neither 1 nor 0, swap mid and high
and decrement high
low
↓
mid         high
↓            ↓
[0, 0, 2, 1, 1, 2]


when mid is zero, swap low and mid
increment low and mid
    low
    ↓
   mid      high
    ↓        ↓
[0, 0, 2, 1, 1, 2]

       low
       ↓
      mid    high
       ↓     ↓
[0, 0, 2, 1, 1, 2]

when mid is 2, swap mid and high
decrement high
          mid
           ↓
          low
           ↓
         high
          ↓
[0, 0, 1, 1, 2, 2]       

 */
