# Floor and Ceiling — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array mein x diya hai. Dhundho:
- **Floor**   = largest element in arr that is `<= x`
- **Ceiling** = smallest element in arr that is `>= x`

Agar exist nahi karta → return `-1`

```
arr = [3, 4, 7, 8, 8, 10],  x = 5

idx:   0   1   2   3   4   5
val:   3   4   7   8   8  10

Floor   = 4  ← 4 <= 5 hai, aur isse bada koi element <= 5 nahi
Ceiling = 7  ← 7 >= 5 hai, aur isse chota koi element >= 5 nahi
```

Visual:
```
[3,  4,   7,  8,  8, 10]
        ↑
      x=5 yahan hota
     ↑       ↑
  floor=4  ceiling=7
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan karo, floor aur ceiling alag-alag dhundho:

```
arr = [3, 4, 7, 8, 8, 10],  x = 5

FLOOR (largest <= x):
  idx=0: 3 <= 5? YES → floor=3
  idx=1: 4 <= 5? YES → floor=4 (update, 4 > 3)
  idx=2: 7 <= 5? NO
  idx=3: 8 <= 5? NO
  ...
  floor = 4 ✓

CEILING (smallest >= x):
  idx=0: 3 >= 5? NO
  idx=1: 4 >= 5? NO
  idx=2: 7 >= 5? YES → ceiling=7
  idx=3: 8 >= 5? YES → skip (8 > 7)
  ...
  ceiling = 7 ✓
```

**Problem:** O(n) — n = 10^6 → TLE. Array sorted hai toh binary search se O(log n) possible hai.

---

## STEP 3: Key Insight — Do Alag Binary Searches

Floor aur ceiling do alag problems hain:

```
FLOOR   = LAST element where arr[i] <= x
CEILING = FIRST element where arr[i] >= x
```

**Ceiling recognize karo instantly:**
```
Ceiling = FIRST index where arr[i] >= x = LOWER BOUND!
```

Lower bound already padh chuke ho! Ceiling wahi hai — bas index nahi, value return karni hai.

**Floor:**
```
Floor = LAST element where arr[i] <= x
```
Yeh ek naya pattern hai — "find last valid":
```
arr[i] <= x?   ✓  ✓  ✓  ✗  ✗  ✗
               3  4  5  7  8  10     (x=5)
                     ↑
               LAST ✓ = floor
```

---

## STEP 4: Monotonic Property

**Floor pattern:**
```
arr = [3, 4, 7, 8, 8, 10],  x = 5

idx:    0    1    2    3    4    5
val:    3    4    7    8    8   10
<=5?:   ✓    ✓    ✗    ✗    ✗    ✗
             ↑
        last ✓ = FLOOR
```

`[✓, ✓, ..., ✗, ✗]` → **last ✓ dhundho** → Pattern 1 with result saving

**Ceiling pattern:**
```
arr = [3, 4, 7, 8, 8, 10],  x = 5

idx:    0    1    2    3    4    5
val:    3    4    7    8    8   10
>=5?:   ✗    ✗    ✓    ✓    ✓    ✓
              ↑
        first ✓ = CEILING
```

`[✗, ✗, ..., ✓, ✓]` → **first ✓ dhundho** → Pattern 2 (Lower Bound!)

---

## STEP 5: Core Variables

### findFloor (Pattern 1 with result saving):
```
left   = 0       → search space ka left boundary
right  = n-1     → n-1 kyunki "no floor" case already result=-1 se handle
result = -1      → default: no floor found
mid    = (left+right)/2  → current candidate
```

**WHY result saving?**
- "Last ✓ dhundho" ka matlab: baar baar valid answer milega, hame sabse right wala chahiye
- result mein valid answer save karo, phir aur right mein dhundho
- Loop khatam hone pe result = last valid = floor

### findCeiling (Pattern 2):
```
left  = 0        → search space ka left boundary
right = n        → n = "no ceiling" case
mid   = (left+right)/2
```

**WHY right = n (not n-1)?**
Agar koi element >= x nahi → left grow karke n tak pahunch jaayega → return -1.
Agar right = n-1 hota, toh last element check nahi ho paata correctly.

---

## STEP 6: Algorithms

### findFloor (last valid):
```
while (left <= right):
  mid = floor((left + right) / 2)
  arr[mid] <= x?
    YES → result = arr[mid]   ← valid, save it
          left = mid + 1      ← right mein aur bada dhundho
    NO  → right = mid - 1    ← invalid, left mein jao
return result
```

### findCeiling (first valid = Lower Bound):
```
while (left < right):
  mid = floor((left + right) / 2)
  arr[mid] >= x?
    YES → right = mid       ← valid, but smaller might exist on left
    NO  → left = mid + 1   ← invalid, right mein jao
return left === n ? -1 : arr[left]
```

---

## FULL DRY RUN — arr=[3,4,7,8,8,10], x=5

### findFloor (last element <= 5):

```
left=0, right=5, result=-1
<=5?  ✓   ✓   ✗   ✗   ✗   ✗
       3   4   7   8   8  10
```

| Iter | left | right | mid | arr[mid] | <=5? | result | Action  |
|------|------|-------|-----|----------|------|--------|---------|
| 1 | 0 | 5 | 2 | 7 | ✗ | -1 | right=1 |
| 2 | 0 | 1 | 0 | 3 | ✓ | 3 | left=1 |
| 3 | 1 | 1 | 1 | 4 | ✓ | 4 | left=2 |

left=2 > right=1 → EXIT
**floor = result = 4 ✅**

---

### findCeiling (first element >= 5):

```
left=0, right=6
>=5?  ✗   ✗   ✓   ✓   ✓   ✓
       3   4   7   8   8  10
```

| Iter | left | right | mid | arr[mid] | >=5? | Action  |
|------|------|-------|-----|----------|------|---------|
| 1 | 0 | 6 | 3 | 8 | ✓ | right=3 |
| 2 | 0 | 3 | 1 | 4 | ✗ | left=2 |
| 3 | 2 | 3 | 2 | 7 | ✓ | right=2 |

left=2 === right=2 → EXIT
left(2) ≠ n(6) → **ceiling = arr[2] = 7 ✅**

---

## STEP 7: Edge Cases

```
Case 1: x exists in array
  arr=[3,4,5,7,10], x=5
  Floor=5 (5 <= 5, largest such), Ceiling=5 (5 >= 5, smallest such)
  Both return 5 — makes sense!

Case 2: x smaller than all elements
  arr=[5,7,9], x=2
  Floor=-1 (koi element <= 2 nahi)
  Ceiling=5 (5 >= 2, pehla element)

Case 3: x larger than all elements
  arr=[3,5,7], x=10
  Floor=7 (7 <= 10, last element)
  Ceiling=-1 (koi element >= 10 nahi)

Case 4: Duplicates
  arr=[3,4,4,7,8], x=4
  Floor=4 (last element <= 4 = 4)
  Ceiling=4 (first element >= 4 = 4)

Case 5: Single element
  arr=[5], x=5 → [5, 5]
  arr=[5], x=3 → [-1, 5]
  arr=[5], x=7 → [5, -1]
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
Floor   = last element <= x
Ceiling = first element >= x  (= Lower Bound ki value!)

FLOOR (Pattern 1 + result saving):
  result=-1, left=0, right=n-1
  while (left <= right):
    mid = floor((left+right)/2)
    arr[mid] <= x?
      YES → result=arr[mid], left=mid+1
      NO  → right=mid-1
  return result

CEILING (Pattern 2 = Lower Bound):
  left=0, right=n    ← n, NOT n-1!
  while (left < right):
    mid = floor((left+right)/2)
    arr[mid] >= x?
      YES → right=mid
      NO  → left=mid+1
  return left===n ? -1 : arr[left]

KEY INSIGHT:
  Floor   → "find LAST valid"  → Pattern 1 + result saving
  Ceiling → "find FIRST valid" → Pattern 2 (Lower Bound!)

REMEMBER:
  Floor  → result save karo, phir right mein jao (left=mid+1)
  Ceiling → right=mid (Pattern 2), return arr[left] at end
```