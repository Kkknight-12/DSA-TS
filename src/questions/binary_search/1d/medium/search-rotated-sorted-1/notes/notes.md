# Search in Rotated Sorted Array (No Duplicates) — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek sorted array hai jise kisi unknown point pe **rotate** kar diya gaya.
Array mein **koi duplicates nahi** hain.
Target ka index dhundho, nahi mila toh `-1`.

```
Original: [0, 1, 2, 4, 5, 6, 7]
Rotated:  [4, 5, 6, 7, 0, 1, 2]   ← 4 jagah se rotate hua

idx:   0   1   2   3   4   5   6
val:   4   5   6   7   0   1   2
                       ↑
                   rotation point

target=0 → return 4
target=3 → return -1
```

**Rotation kya hoti hai?**
```
[1, 2, 3, 4, 5]  → rotate 2 times →  [3, 4, 5, 1, 2]
 ↑              first k elements                  ↑
 start          jaake end mein aa jaate          end
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: left to right, target dhundho.

```
nums = [4, 5, 6, 7, 0, 1, 2],  target = 0

idx=0: 4==0? NO
idx=1: 5==0? NO
...
idx=4: 0==0? YES → return 4
```

**Problem:** O(n) — array 10^6 ka ho toh TLE. Binary search se O(log n) chahiye.
Lekin normal binary search kaise? Array sorted nahi lag raha!

---

## STEP 3: Key Insight — EK HALF HAMESHA SORTED HOGA!

Yeh insight samajhna zaroori hai — poori solution isi pe based hai.

**Simulate karo:**
```
nums = [4, 5, 6, 7, 0, 1, 2]
                 ↑
              mid=3  (nums[3]=7)

Left window  [left..mid]   = [4, 5, 6, 7]     ← sorted! (no break inside)
Right window [mid..right]  = [7, 0, 1, 2]     ← break hai! (7→0 jump inside)
```

**Kisi doosre mid pe:**
```
nums = [4, 5, 6, 7, 0, 1, 2]
                    ↑
                mid=4  (nums[4]=0)

Left window  [left..mid]   = [4, 5, 6, 7, 0]  ← break hai! (7→0 jump inside)
Right window [mid..right]  = [0, 1, 2]         ← sorted! (no break inside)
```

**Note:** "Break hai" ka matlab hai us **window ke andar** 7→0 wala jump hai.
`mid` element (boundary) dono windows mein shared hota hai — yeh theek hai.

**WHY ek half HAMESHA sorted hoga?**
Rotation sirf **EK break point** create karta hai (jahan bada number ke baad chota aata hai).
Mid ya toh break ke left mein hai, ya right mein.
Jis side mein break **nahi**, woh side sorted hai.

```
Rotation creates ONE break:
[4, 5, 6, 7, | 0, 1, 2]
             ↑
           break point

Mid left of break  → right half sorted (break is in left)
Mid right of break → left half sorted  (break is in right)
```

---

## STEP 4: Kaunsa Half Sorted Hai — Kaise Pata Karein?

**Compare `nums[left]` with `nums[mid]`:**

```
Case A: nums[left] <= nums[mid]
  Left half is sorted.
  Kyun? Left se mid tak koi break nahi hai
        (agar hota toh nums[left] > nums[mid] hota)

  [4, 5, 6, 7, 0, 1, 2]
   ↑        ↑
  left=0   mid=3
  4 <= 7? YES → [4,5,6,7] sorted ✓

Case B: nums[left] > nums[mid]
  Right half is sorted.
  Kyun? Break left mein hai, toh mid se right tak sab sorted

  [6, 7, 0, 1, 2, 4, 5]
   ↑        ↑
  left=0    mid=3
  6 > 1? YES → [1,2,4,5] sorted ✓
```

---

## STEP 5: Core Variables

```
left  = 0      → search space ka left boundary
right = n-1    → search space ka right boundary
mid   = (left+right)/2
```

**WHY Pattern 1 (left <= right)?**
Hame exact match chahiye → Pattern 1 perfect hai:
- nums[mid] === target → return mid
- Target nahi mila → return -1

---

## STEP 6: WHY Check Target in Sorted Half?

Yeh sabse important "why" hai — bina samjhe algorithm yaad nahi rahega.

**Sorted half mein check karte hain kyunki wahan EXACT range pata hai.**

```
Left half sorted: [4, 5, 6, 7]
  → Hum GUARANTEE kar sakte hain: sab elements 4 aur 7 ke beech hain
  → target = 0?  4 <= 0 <= 7? NO → target yahan nahi hai → go right ✓
  → target = 5?  4 <= 5 <= 7? YES → target yahan hai → go left ✓

Left half unsorted: [4, 5, 6, 7, 0]
  → Range? Min=0, Max=7 — lekin monotone nahi hai!
  → target = 3?  0 <= 3 <= 7? YES — lekin 3 actually yahan HAI NAHI!
  → Yeh check unreliable hai ✗
```

**Isliye hamesha sorted half mein check karo:**
- Sorted half → range reliable → ek simple `<=` check se pata chal jaata hai
- Unsorted half → range unreliable → range check se galat answer aa sakta hai
- Agar target sorted half mein **nahi** hai → **zaroor** unsorted half mein hai (elimination!)

---

## STEP 7: Algorithm — Sorted Half Mein Target Check

```
while (left <= right):
  mid = floor((left+right)/2)
  nums[mid] == target? → return mid   ← exact match

  nums[left] <= nums[mid]?
    YES → LEFT HALF SORTED
    Is target in [nums[left], nums[mid])?
      YES → right = mid-1  ← target left mein
      NO  → left = mid+1   ← target NOT left mein → zaroor right mein

    NO → RIGHT HALF SORTED
    Is target in (nums[mid], nums[right]]?
      YES → left = mid+1   ← target right mein
      NO  → right = mid-1  ← target left mein

return -1  ← not found
```

**WHY `nums[left] <= target < nums[mid]` (strict `<` on right side)?**

Loop ke top pe hum pehle hi `nums[mid] == target` check kar chuke hain.
Matlab jab hum range check tak pahunchte hain, tab hum GUARANTEE kar sakte hain ki `nums[mid] != target`.

Isliye `target < nums[mid]` (strict) safe hai — `nums[mid]` ko miss karne ka darr nahi.
Aur jab hum `right = mid-1` ya `left = mid+1` karte hain, mid ko skip karna theek hai.
Target mid pe nahi tha (already confirmed), toh mid+1 ya mid-1 se aage badhna safe hai.

---

## FULL DRY RUN — nums=[4,5,6,7,0,1,2], target=0

```
idx:    0   1   2   3   4   5   6
val:    4   5   6   7   0   1   2
                        ↑ target
```

| Iter | left | right | mid | nums[mid] | ==target? | nums[left]<=nums[mid]? | Decision | Action |
|------|------|-------|-----|-----------|-----------|------------------------|----------|--------|
| 1 | 0 | 6 | 3 | 7 | NO | 4<=7 YES → LEFT sorted | 4<=0<7? NO | left=4 |
| 2 | 4 | 6 | 5 | 1 | NO | 0<=1 YES → LEFT sorted | 0<=0<1? YES | right=4 |
| 3 | 4 | 4 | 4 | 0 | YES ✅ | — | return 4 | |

**Answer = 4 ✅**

---

### Second Dry Run — target not found, nums=[4,5,6,7,0,1,2], target=3

| Iter | left | right | mid | nums[mid] | ==3? | Sorted half | In range? | Action |
|------|------|-------|-----|-----------|------|-------------|-----------|--------|
| 1 | 0 | 6 | 3 | 7 | NO | LEFT (4<=7) | 4<=3<7? NO | left=4 |
| 2 | 4 | 6 | 5 | 1 | NO | LEFT (0<=1) | 0<=3<1? NO | left=6 |
| 3 | 6 | 6 | 6 | 2 | NO | LEFT (2<=2) | 2<=3<2? NO | left=7 |

left=7 > right=6 → **return -1 ✅**

---

## STEP 8: Edge Cases

```
Case 1: No rotation
  nums=[1,2,3,4,5], target=3
  Every mid: left half sorted, normal binary search works → 2

Case 2: Single element
  nums=[5], target=5 → 0
  nums=[5], target=3 → -1

Case 3: Target at rotation boundary
  nums=[4,5,6,7,0,1,2], target=4 → 0  (leftmost)
  nums=[4,5,6,7,0,1,2], target=2 → 6  (rightmost)

Case 4: Two elements
  nums=[3,1], target=1 → 1
  mid=0, nums[0]=3==1? NO
  nums[0]=3 <= nums[0]=3? YES → LEFT sorted
  3<=1<3? NO → left=1
  left=right=1, nums[1]=1==1? YES → return 1 ✅
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
KEY INSIGHT:
  Mid se kato → EK HALF HAMESHA SORTED HOGA
  nums[left] <= nums[mid] → LEFT sorted
  nums[left] >  nums[mid] → RIGHT sorted

ALGORITHM:
  while (left <= right):
    mid = (left+right)/2
    nums[mid] == target? → return mid

    LEFT sorted (nums[left] <= nums[mid]):
      nums[left] <= target < nums[mid]?
        YES → right = mid-1
        NO  → left = mid+1

    RIGHT sorted:
      nums[mid] < target <= nums[right]?
        YES → left = mid+1
        NO  → right = mid-1

  return -1

WHY CHECK SORTED HALF:
  Sorted half ki range reliable hoti hai → simple <= check kaam karta hai
  Unsorted half ki range unreliable → range check se galat answer aa sakta hai
  Target sorted half mein nahi → ZAROOR other half mein hai (elimination)

REMEMBER:
  LB condition:  nums[left] <= nums[mid]  (equal for single element case)
  Left range:    [nums[left], nums[mid])  open right (already checked mid)
  Right range:   (nums[mid], nums[right]] open left  (already checked mid)
```