# First and Last Position of Element — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array mein target ka **pehla** aur **aakhri** index dhundho.
Agar target exist nahi karta → `[-1, -1]` return karo.

```
nums = [5, 7, 7, 8, 8, 10],  target = 8

idx:   0   1   2   3   4   5
val:   5   7   7   8   8  10
                   ↑   ↑
             first=3   last=4

return [3, 4]
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: left se right, pehla aur aakhri occurrence dhundho.

```
nums = [5, 7, 7, 8, 8, 10],  target = 8

first = -1, last = -1
idx=0: 5==8? NO
idx=1: 7==8? NO
idx=2: 7==8? NO
idx=3: 8==8? YES → first=-1 toh first=3, last=3
idx=4: 8==8? YES → last=4
idx=5: 10==8? NO

return [3, 4] ✓
```

**Problem:** O(n) — n = 10^6 → TLE. Array sorted hai, binary search se O(log n) ho sakta hai.

---

## STEP 3: Key Insight — LB aur UB Seedha Use Karo!

Yeh problem already solve kar chuke ho! Lower bound aur upper bound yaad hai?

```
Lower Bound of target = first index where nums[i] >= target
Upper Bound of target = first index where nums[i] > target
```

Ab socho:

```
nums = [5, 7, 7, 8, 8, 10],  target = 8

idx:    0   1   2   3   4   5
val:    5   7   7   8   8  10

LB(8) = first index where nums[i] >= 8 = index 3  ← FIRST occurrence!
UB(8) = first index where nums[i] >  8 = index 5

Last occurrence = UB - 1 = 5 - 1 = 4              ← LAST occurrence!
```

Visual:
```
[5,  7,  7,  8,  8, 10]
             ↑       ↑
           LB=3     UB=5
           |←─ 2 ─→|
         first=3  last=UB-1=4
```

**WHY ub - 1 = last?**
UB = first element STRICTLY > target. Matlab UB se ek pehle wala element target hai.
`UB - 1` = last position of target.

**Bonus:** `UB - LB = count` bhi yaad hai na? Number-of-occurrence wali problem!

---

## STEP 4: Monotonic Property

**Lower Bound (first occurrence):**
```
nums = [5, 7, 7, 8, 8, 10],  target = 8

idx:    0    1    2    3    4    5
val:    5    7    7    8    8   10
>=8?:   ✗    ✗    ✗    ✓    ✓    ✓
                       ↑
               first ✓ = FIRST occurrence
```

**Upper Bound (one past last occurrence):**
```
nums = [5, 7, 7, 8, 8, 10],  target = 8

idx:    0    1    2    3    4    5
val:    5    7    7    8    8   10
>8?:    ✗    ✗    ✗    ✗    ✗    ✓
                                 ↑
                    first ✓ = UB, so UB-1 = LAST occurrence
```

Dono `[✗,...,✓]` pattern → Pattern 2 binary search!

---

## STEP 5: Core Variables

```
lb = lowerBound(target) → first index where nums[i] >= target
ub = upperBound(target) → first index where nums[i] > target

First occurrence = lb      (if target exists)
Last  occurrence = ub - 1  (if target exists)
```

**WHY check lb === n OR nums[lb] !== target?**

```
Case 1: lb === n
  Array mein koi element >= target nahi → target nahi hai
  Example: nums=[1,2,3], target=5
  lb=3 (=n) → return [-1,-1]

Case 2: nums[lb] !== target
  lb points to first element >= target, but woh element target nahi hai
  Example: nums=[1,3,5], target=2
  lb=1, nums[1]=3 ≠ 2 → target nahi hai → return [-1,-1]
```

---

## STEP 6: Algorithm

```
1. lb = lowerBound(target)       ← first index where nums[i] >= target
2. lb === n OR nums[lb] !== target?
     YES → return [-1, -1]       ← target not found
3. ub = upperBound(target)       ← first index where nums[i] > target
4. return [lb, ub - 1]
```

### lowerBound (Pattern 2):
```
left=0, right=n
while (left < right):
  mid = floor((left+right)/2)
  nums[mid] >= target? → right=mid
  else               → left=mid+1
return left
```

### upperBound (Pattern 2):
```
left=0, right=n
while (left < right):
  mid = floor((left+right)/2)
  nums[mid] > target? → right=mid
  else              → left=mid+1
return left
```

---

## FULL DRY RUN — nums=[5,7,7,8,8,10], target=8

### lowerBound(8): first index where nums[i] >= 8

```
left=0, right=6
>=8?  ✗   ✗   ✗   ✓   ✓   ✓
      5   7   7   8   8  10
```

| Iter | left | right | mid | nums[mid] | >=8? | Action  |
|------|------|-------|-----|-----------|------|---------|
| 1 | 0 | 6 | 3 | 8 | ✓ | right=3 |
| 2 | 0 | 3 | 1 | 7 | ✗ | left=2 |
| 3 | 2 | 3 | 2 | 7 | ✗ | left=3 |

left=3 === right=3 → **lb = 3**
Check: lb(3) ≠ n(6), nums[3]=8 === target → exists ✓

---

### upperBound(8): first index where nums[i] > 8

```
left=0, right=6
>8?   ✗   ✗   ✗   ✗   ✗   ✓
      5   7   7   8   8  10
```

| Iter | left | right | mid | nums[mid] | >8? | Action  |
|------|------|-------|-----|-----------|-----|---------|
| 1 | 0 | 6 | 3 | 8 | ✗ | left=4 |
| 2 | 4 | 6 | 5 | 10 | ✓ | right=5 |
| 3 | 4 | 5 | 4 | 8 | ✗ | left=5 |

left=5 === right=5 → **ub = 5**

---

### Result: [lb, ub-1] = [3, 4] ✅

---

## STEP 7: Edge Cases

```
Case 1: Target not in array
  nums=[5,7,9], target=8
  lb=2, nums[2]=9 ≠ 8 → return [-1,-1]

Case 2: Target appears once
  nums=[5,7,8,9], target=8
  lb=2, ub=3 → [2, 2]

Case 3: All elements are target
  nums=[3,3,3,3], target=3
  lb=0, ub=4 → [0, 3]

Case 4: Empty array
  nums=[], target=5
  lb=0, 0===n(0) → return [-1,-1]

Case 5: Target at boundaries
  nums=[8,8,9,10], target=8 → [0, 1]  (start)
  nums=[5,7,8,8],  target=8 → [2, 3]  (end)
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
First = lowerBound(target)
Last  = upperBound(target) - 1

Steps:
1. lb = lowerBound(target)    ← first index where nums[i] >= target
2. lb===n OR nums[lb]!==target? → return [-1,-1]
3. ub = upperBound(target)    ← first index where nums[i] > target
4. return [lb, ub-1]

REMEMBER:
  LB = >= (first occurrence)
  UB = >  (one past last occurrence)
  UB - 1 = last occurrence
  UB - LB = count  (bonus!)

Yeh teen problems ek saath yaad rakho:
  Lower Bound          → arr[i] >= x   → first occurrence ka index
  Upper Bound          → arr[i] > x    → last occurrence ke baad ka index
  First-Last Position  → [LB, UB-1]   → seedha LB aur UB se answer!
  Number of Occurrence → UB - LB       → count bhi LB+UB se!
```