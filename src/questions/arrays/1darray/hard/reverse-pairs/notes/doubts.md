# Reverse Pairs - Doubts

## optimal.ts Doubts

## Doubt 1: `mergeSortAndCount` recursion, counting, and merge ka full flow

### Question

```txt
I am not able to understand optimal.ts.

Main confusion:
- recursion ka flow
- base case ke baad parent kaise resume hota hai
- countCrossPairs kab call hota hai
- merge kab hota hai
- leftPairs, rightPairs, crossPairs kya hain
- return me teeno add kyun hote hain
- node tree me merge kaise dikh raha hai
```

### Step 1: Code ko pehle 5 lines me samjho

`mergeSortAndCount(nums, left, right)` ek segment solve karta hai.

Example:

```txt
mergeSortAndCount(nums, 0, 4)
```

means:

```txt
nums[0..4] ke andar reverse pairs count karo
aur return hone se pehle nums[0..4] ko sorted bana do
```

So this function has two jobs:

```txt
Job 1: count reverse pairs
Job 2: current segment ko sorted bana kar parent ko dena
```

Code flow:

```ts
if (left >= right) return 0;

const mid = Math.floor(left + (right - left) / 2);

const leftPairs = mergeSortAndCount(nums, left, mid);
const rightPairs = mergeSortAndCount(nums, mid + 1, right);

const crossPairs = countCrossPairs(nums, left, mid, right);

merge(nums, left, mid, right);

return leftPairs + rightPairs + crossPairs;
```

Natural language:

```txt
1. Agar single element hai, return 0.
2. Current segment ko left half and right half me split karo.
3. Left half solve karo.
4. Right half solve karo.
5. Ab dono halves sorted hain, cross pairs count karo.
6. Dono sorted halves ko merge karo.
7. Total count return karo.
```

---

### Step 2: `leftPairs`, `rightPairs`, `crossPairs` kya hain?

Current segment:

```txt
[ left half ][ right half ]
```

Any reverse pair inside this segment can only be in one of these 3 categories:

```txt
1. pair completely inside left half
2. pair completely inside right half
3. pair going from left half to right half
```

So:

```txt
leftPairs  = left half ke andar ke reverse pairs
rightPairs = right half ke andar ke reverse pairs
crossPairs = left half se right half tak ke reverse pairs
```

That is why return is:

```ts
return leftPairs + rightPairs + crossPairs;
```

Example with:

```txt
nums = [2, 4, 3, 5, 1]
```

Root split:

```txt
left half  = [2, 4, 3]
right half = [5, 1]
```

For full array:

```txt
leftPairs  = pairs inside [2, 4, 3]
rightPairs = pairs inside [5, 1]
crossPairs = pairs where first value is from [2, 4, 3]
             and second value is from [5, 1]
```

Final answer:

```txt
leftPairs + rightPairs + crossPairs
```

---

### Step 3: `mid` pass kyun nahi hota?

`mid` recursive function ka parameter nahi hai.
`mid` current frame ke andar banta hai.

Example:

```txt
mergeSortAndCount(nums, 0, 4)

left = 0
right = 4
mid = 2
```

Now current frame creates two child calls:

```txt
left child  = mergeSortAndCount(nums, 0, 2)
right child = mergeSortAndCount(nums, 3, 4)
```

Notice:

```txt
mid directly pass nahi hua.
mid se child ranges ban gaye.
```

But same frame later `mid` pass karta hai:

```ts
countCrossPairs(nums, left, mid, right);
merge(nums, left, mid, right);
```

Why?

Because `countCrossPairs` and `merge` ko boundary chahiye:

```txt
left half  = nums[left..mid]
right half = nums[mid+1..right]
```

So memory line:

```txt
mergeSortAndCount needs only left and right.
countCrossPairs and merge need left, mid, right.
```

---

### Step 4: Visual node tree with execution numbers

Input:

```txt
nums = [2, 4, 3, 5, 1]
```

Tree below shows actual recursive calls and return-time work.

Each node is:

```txt
mergeSortAndCount(nums, left, right)
```

Important numbering rule:

```txt
④, ⑤, ⑦, ⑩, ⑪ are base-case returns.
⑥, ⑧, ⑫, ⑬ are not new recursive calls.
They are "resume" steps where parent does:
  countCrossPairs
  merge
  return
```

```txt
                                      mergeSortAndCount(nums,0,4) ①
                                      segment [2,4,3,5,1], mid=2
                                    /                                  \
                                   /                                    \
              mergeSortAndCount(nums,0,2) ②                         mergeSortAndCount(nums,3,4) ⑨
              segment [2,4,3], mid=1                                segment [5,1], mid=3
                    /                  \                                   /                  \
                   /                    \                                 /                    \
 mergeSortAndCount(nums,0,1) ③     mergeSortAndCount(nums,2,2) ⑦   mergeSortAndCount(nums,3,3) ⑩  mergeSortAndCount(nums,4,4) ⑪
 segment [2,4], mid=0              segment [3] BASE                 segment [5] BASE             segment [1] BASE
        /              \
       /                \
mergeSortAndCount(nums,0,0) ④  mergeSortAndCount(nums,1,1) ⑤
segment [2] BASE             segment [4] BASE

Return-time work:

④ + ⑤ done -> ⑥ node ③ resumes, countCrossPairs, merge [2]+[4], return 0
③ + ⑦ done -> ⑧ node ② resumes, countCrossPairs, merge [2,4]+[3], return 0
⑩ + ⑪ done -> ⑫ node ⑨ resumes, countCrossPairs, merge [5]+[1], return 1
② + ⑨ done -> ⑬ node ① resumes, countCrossPairs, merge [2,3,4]+[1,5], return 3
```

Important:

```txt
BASE means:
left >= right
return 0
```

But tree sirf split nahi dikhata.
Ab return flow samjho.

---

### Step 5: Same tree, but now showing count and merge while returning

Recursion tree down jaata hai first.
Merge and count return aate time hote hain.

So missing ⑥ and ⑧ ka meaning:

```txt
⑥ = node ③ ka resume step
     after ④ and ⑤ return
     countCrossPairs(nums,0,0,1)
     merge(nums,0,0,1)
     return 0

⑧ = node ② ka resume step
     after ③ and ⑦ return
     countCrossPairs(nums,0,1,2)
     merge(nums,0,1,2)
     return 0
```

```txt
                                      mergeSortAndCount(nums,0,4) ①
                                      waits for leftPairs and rightPairs
                                    /                                  \
                                   /                                    \
              mergeSortAndCount(nums,0,2) ②                         mergeSortAndCount(nums,3,4) ⑨
              waits for leftPairs/rightPairs                         waits for leftPairs/rightPairs
                    /                  \                                   /                  \
                   /                    \                                 /                    \
 mergeSortAndCount(nums,0,1) ③     mergeSortAndCount(nums,2,2) ⑦   mergeSortAndCount(nums,3,3) ⑩  mergeSortAndCount(nums,4,4) ⑪
 waits for children                return 0                         return 0                    return 0
        /              \
       /                \
mergeSortAndCount(nums,0,0) ④  mergeSortAndCount(nums,1,1) ⑤
return 0                     return 0

Then return-time steps:

⑥: node ③ resumes -> countCrossPairs + merge + return
⑧: node ② resumes -> countCrossPairs + merge + return
⑫: node ⑨ resumes -> countCrossPairs + merge + return
⑬: node ① resumes -> countCrossPairs + merge + final return
```

Now return actions:

```txt
After ④ and ⑤ return:

⑥: node ③ resumes:
  leftPairs = 0
  rightPairs = 0
  countCrossPairs(nums,0,0,1) -> 0
  merge(nums,0,0,1) -> merge [2] and [4] -> [2,4]
  return 0

After ③ and ⑦ return:

⑧: node ② resumes:
  leftPairs = 0
  rightPairs = 0
  countCrossPairs(nums,0,1,2) -> 0
  merge(nums,0,1,2) -> merge [2,4] and [3] -> [2,3,4]
  return 0

After ⑩ and ⑪ return:

⑫: node ⑨ resumes:
  leftPairs = 0
  rightPairs = 0
  countCrossPairs(nums,3,3,4) -> 1
  merge(nums,3,3,4) -> merge [5] and [1] -> [1,5]
  return 1

After ② and ⑨ return:

⑬: node ① resumes:
  leftPairs = 0
  rightPairs = 1
  countCrossPairs(nums,0,2,4) -> 2
  merge(nums,0,2,4) -> merge [2,3,4] and [1,5] -> [1,2,3,4,5]
  return 0 + 1 + 2 = 3
```

Final answer:

```txt
3
```

---

### Step 6: What does “parent paused” mean?

Take this node:

```txt
mergeSortAndCount(nums,0,2) ②
```

Inside node ②:

```txt
left = 0
right = 2
mid = 1
```

Code reaches:

```ts
const leftPairs = mergeSortAndCount(nums, left, mid);
```

With actual values:

```ts
const leftPairs = mergeSortAndCount(nums, 0, 1);
```

Now node ② cannot move to `rightPairs` yet.
It waits for node ③ to finish.

That waiting is called “paused”.

Call stack:

```txt
② mergeSortAndCount(nums,0,2)
  waiting at line:
  const leftPairs = mergeSortAndCount(nums,0,1)

    ③ mergeSortAndCount(nums,0,1)
      does its full work
      returns 0
```

Then node ② resumes:

```txt
leftPairs = 0
```

Now node ② goes to next line:

```ts
const rightPairs = mergeSortAndCount(nums, mid + 1, right);
```

Actual:

```ts
const rightPairs = mergeSortAndCount(nums, 2, 2);
```

Node ② waits again.

After node ⑦ returns:

```txt
rightPairs = 0
```

Now node ② has both values:

```txt
leftPairs = 0
rightPairs = 0
```

Now and only now node ② calls:

```ts
const crossPairs = countCrossPairs(nums, 0, 1, 2);
merge(nums, 0, 1, 2);
return leftPairs + rightPairs + crossPairs;
```

So:

```txt
Paused = parent frame is waiting for child frame to return.
Resume = child returned, parent continues from next line.
```

---

### Step 7: How array changes after merges

Start:

```txt
nums = [2, 4, 3, 5, 1]
```

Return-time merges:

```txt
③ merge(nums,0,0,1)
  merge [2] and [4]
  nums = [2, 4, 3, 5, 1]

② merge(nums,0,1,2)
  merge [2,4] and [3]
  nums = [2, 3, 4, 5, 1]

⑨ merge(nums,3,3,4)
  merge [5] and [1]
  nums = [2, 3, 4, 1, 5]

① merge(nums,0,2,4)
  merge [2,3,4] and [1,5]
  nums = [1, 2, 3, 4, 5]
```

Important:

```txt
Sorted array final answer nahi hai.
Sorting helper work hai.
Sorted halves ki wajah se countCrossPairs fast hota hai.
```

---

### Step 8: Final `countCrossPairs(nums,0,2,4)` slowly

Before final count:

```txt
nums = [2, 3, 4, 1, 5]

left = 0
mid = 2
right = 4
```

So:

```txt
left half  = nums[0..2] = [2, 3, 4]
right half = nums[3..4] = [1, 5]
```

Code:

```ts
let count = 0;
let rightPointer = mid + 1;
```

Actual:

```txt
count = 0
rightPointer = 3
```

Now loop over left half.

#### leftPointer = 0

```txt
nums[leftPointer] = 2
nums[rightPointer] = 1
```

Check:

```txt
2 > 2 * 1
2 > 2
false
```

So rightPointer does not move.

Add:

```txt
rightPointer - (mid + 1)
= 3 - 3
= 0
```

Meaning:

```txt
No right values crossed.
No valid pair for 2.
```

#### leftPointer = 1

```txt
nums[leftPointer] = 3
nums[rightPointer] = 1
```

Check:

```txt
3 > 2 * 1
3 > 2
true
```

Move:

```txt
rightPointer++ -> 4
```

Now:

```txt
nums[rightPointer] = 5
```

Check:

```txt
3 > 2 * 5
3 > 10
false
```

Stop.

Add:

```txt
rightPointer - (mid + 1)
= 4 - 3
= 1
```

Meaning:

```txt
rightPointer crossed index 3.
Index 3 value is 1.
So 1 is valid with 3.
```

#### leftPointer = 2

```txt
nums[leftPointer] = 4
rightPointer = 4
nums[rightPointer] = 5
```

Check:

```txt
4 > 2 * 5
4 > 10
false
```

Add:

```txt
rightPointer - (mid + 1)
= 4 - 3
= 1
```

Why `1` again?

Because rightPointer already crossed value `1`.
And left half is sorted:

```txt
4 >= 3
```

If `1` was valid for `3`,
then `1` is also valid for `4`.

So:

```txt
crossPairs = 0 + 1 + 1 = 2
```

---

### Final memory

```txt
mergeSortAndCount(nums,left,right)

If base:
  return 0

Else:
  solve left child  -> leftPairs
  solve right child -> rightPairs
  count across      -> crossPairs
  merge segment     -> sorted segment for parent
  return leftPairs + rightPairs + crossPairs
```

Most important:

```txt
countCrossPairs happens in the parent frame,
after both child frames return.
```

---

## Doubt 2: If `[5,1]` is counted inside `countCrossPairs`, why do we need `rightPairs`?

### Question

```txt
You said inside [5,1]:

5 > 2 * 1
5 > 2
true

But this check nums[leftPointer] > 2 * nums[rightPointer]
is inside countCrossPairs.

So crossPairs will have that return value.
Why do we need leftPairs and rightPairs?
```

### Explanation

The key point:

```txt
countCrossPairs is called many times.
Each call counts only across that frame's own split.
```

So yes:

```txt
[5,1] is counted inside countCrossPairs.
```

But it is counted inside this child frame:

```txt
mergeSortAndCount(nums,3,4)
```

For this child frame:

```txt
left = 3
right = 4
mid = 3

left half  = [5]
right half = [1]
```

This child frame calls:

```txt
countCrossPairs(nums,3,3,4)
```

That call checks:

```txt
5 > 2 * 1
5 > 2
true
```

So for this child frame:

```txt
leftPairs = 0
rightPairs = 0
crossPairs = 1

return leftPairs + rightPairs + crossPairs
return 0 + 0 + 1
return 1
```

That returned `1` goes back to the root frame as:

```txt
rightPairs = 1
```

Now look at the root frame:

```txt
mergeSortAndCount(nums,0,4)
```

At root level, after child frames return:

```txt
left half  = [2,3,4]
right half = [1,5]
```

Root calls:

```txt
countCrossPairs(nums,0,2,4)
```

This root `countCrossPairs` only counts pairs where:

```txt
i comes from root left half  [2,3,4]
j comes from root right half [1,5]
```

So root `countCrossPairs` counts:

```txt
3 > 2 * 1 -> true
4 > 2 * 1 -> true
```

Root `crossPairs` becomes:

```txt
2
```

But root `countCrossPairs` does not count `[5,1]`.

Why?

Because `[5,1]` was completely inside root's right half.
That pair belonged to the child frame:

```txt
mergeSortAndCount(nums,3,4)
```

So root needs:

```txt
rightPairs = 1
crossPairs = 2
```

Final root return:

```txt
leftPairs + rightPairs + crossPairs
= 0 + 1 + 2
= 3
```

### Frame-wise memory

```txt
Child frame mergeSortAndCount(nums,3,4):
  countCrossPairs counts [5] vs [1]
  returns 1

Root frame mergeSortAndCount(nums,0,4):
  receives that 1 as rightPairs
  countCrossPairs only counts [2,3,4] vs [1,5]
  returns rightPairs + root crossPairs
```

### Short version

```txt
Every countCrossPairs call counts only across its own frame's split.

[5,1] is counted by child frame countCrossPairs.
Root receives that count as rightPairs.

Root crossPairs counts only root-left-half vs root-right-half.
```
