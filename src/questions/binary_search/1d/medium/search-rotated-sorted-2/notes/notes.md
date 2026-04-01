# Search in Rotated Sorted Array II (With Duplicates) — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Rotated sorted array hai — lekin is baar **duplicates** bhi ho sakte hain.
Target exist karta hai ya nahi → `true` / `false` return karo.

```
nums = [2, 5, 6, 0, 0, 1, 2],  target = 0  → true
nums = [2, 5, 6, 0, 0, 1, 2],  target = 3  → false
```

**Version 1 se kya fark hai?**
```
Version 1: No duplicates → index return karo
Version 2: Duplicates allowed → true/false return karo

WHY true/false and not index?
Duplicates ke saath ek value kai jagah ho sakti hai,
isliye ek specific index return karna reliable nahi hota.
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: target mile toh true, na mile toh false.

```
nums = [2, 5, 6, 0, 0, 1, 2],  target = 0

idx=0: 2==0? NO
idx=1: 5==0? NO
...
idx=3: 0==0? YES → return true
```

**Problem:** O(n) — n = 10^6 → TLE. Binary search se O(log n) chahiye.

---

## STEP 3: Key Insight — Version 1 Duplicates Se Kyun Fail Hota Hai

Version 1 mein yeh kaam karta tha:
```
nums[left] <= nums[mid] → LEFT half sorted (guaranteed)
nums[left] >  nums[mid] → RIGHT half sorted (guaranteed)
```

**Ab simulate karo duplicates ke saath:**
```
nums = [3, 1, 2, 3, 3, 3, 3],  left=0, mid=3

nums[0] = 3,  nums[3] = 3

nums[left] <= nums[mid]? → 3 <= 3 → YES
"Left half sorted" bolenge...

Left window [left..mid] = [3, 1, 2, 3]
Kya yeh sorted hai?  3 → 1 → 2 → 3  ← NAHI! Break hai (3→1)!
```

**Yeh case kyun aata hai?**
```
[3, 1, 2, 3, 3, 3, 3]
 ↑              ↑
left=0         mid=3

nums[left] == nums[mid] == 3
Dono same value hain toh hum nahi jaan sakte:
  kya left half sorted hai?  ya right half?
  Pata nahi!
```

---

## STEP 4: Fix — Ek Case Aur Add Karo

Jab `nums[left] == nums[mid]`, hum kuch nahi decide kar sakte.
**Solution:** `left++` — ek step se ambiguity door karo.

```
Iteration 1:
  left=0, mid=3: nums[0]=3 == nums[3]=3 → AMBIGUOUS
  left++  → left=1

Iteration 2:
  left=1, mid=3: nums[1]=1 != nums[3]=3 → now we can decide!
  nums[1]=1 < nums[3]=3 → LEFT half [1,2,3] sorted ✓
```

**WHY left++?**

Humara sorted-half decision ek comparison pe based hai:
```
nums[left] < nums[mid] → left sorted
nums[left] > nums[mid] → right sorted
```

Is check mein `nums[left]` reference point hai.
Jab `nums[left] == nums[mid]` hota hai, yeh reference point kaam nahi karta.

`left++` se reference point change hota hai.
Agli iteration mein nayi `nums[left]` value shayad `nums[mid]` se alag ho —
tab decision ho sakta hai.

**right-- bhi kaam karta hai.**
Agar check `nums[right]` pe based hoti:
```
nums[mid] < nums[right] → right sorted
nums[mid] > nums[right] → left sorted
nums[mid] == nums[right] → right--  ← tab right-- natural hota
```

Jo element reference hai — wahi advance karo.

**Worst case — all duplicates:**
```
nums = [3, 3, 3, 3, 3, 1, 3],  target = 1

Har iteration: nums[left] == nums[mid] → left++
O(n) iterations → O(n) worst case
```

---

## STEP 5: Monotonic Property — Version 1 + Extra Case

Version 1 ka pure pattern:
```
nums[left] <  nums[mid] → LEFT sorted
nums[left] >  nums[mid] → RIGHT sorted
```

Version 2 mein ek extra case:
```
nums[left] == nums[mid] → AMBIGUOUS → left++ → skip
```

---

## STEP 6: Core Variables

```
left  = 0      → search space ka left boundary
right = n-1    → search space ka right boundary
mid   = (left+right)/2
```

**WHY Pattern 1 (left <= right)?**
Exact match (true/false) → Pattern 1 perfect hai.
Target mila → return true. Loop khatam → return false.

**WHY boolean return aur index nahi?**
Duplicates ki wajah se same value kai jagah ho sakti hai.
Ek specific index reliable nahi hoga. Sirf existence confirm karo.

---

## STEP 7: Algorithm — Version 1 + One Extra Line

```
while (left <= right):
  mid = floor((left+right)/2)

  nums[mid] == target? → return true   ← exact match

  nums[left] == nums[mid]?             ← NEW in Version 2!
    → left++, continue                 ← skip ambiguous duplicate

  nums[left] < nums[mid]?              ← same as Version 1
    YES → LEFT HALF SORTED
    nums[left] <= target < nums[mid]?
      YES → right = mid-1
      NO  → left = mid+1

    NO → RIGHT HALF SORTED
    nums[mid] < target <= nums[right]?
      YES → left = mid+1
      NO  → right = mid-1

return false
```

**Version 1 vs Version 2 — sirf yeh fark:**
```
Version 1:                     Version 2:
                               ← ADD THIS CASE →
                               if nums[left] == nums[mid]:
                                 left++
                                 continue

if nums[left] < nums[mid]:     if nums[left] < nums[mid]:
  ...                            ...
else:                          else:
  ...                            ...
```

---

## FULL DRY RUN — Ambiguous Case

### nums=[3,1,2,3,3,3,3], target=1

```
idx:    0   1   2   3   4   5   6
val:    3   1   2   3   3   3   3
        ↑               ← target=1 at index 1
```

| Iter | left | right | mid | nums[mid] | ==target? | nums[left]==nums[mid]? | Decision | Action |
|------|------|-------|-----|-----------|-----------|------------------------|----------|--------|
| 1 | 0 | 6 | 3 | 3 | NO | 3==3 YES → AMBIGUOUS | — | left=1 |
| 2 | 1 | 6 | 3 | 3 | NO | 1==3 NO | 1<3 YES → LEFT sorted, 1≤1<3? YES | right=2 |
| 3 | 1 | 2 | 1 | 1 | YES ✅ | — | — | return true |

**return true ✅**

---

### nums=[3,3,3,3,3], target=1  (O(n) worst case)

```
val:    3   3   3   3   3
```

| Iter | left | right | mid | nums[mid] | ==1? | ==nums[left]? | Action |
|------|------|-------|-----|-----------|------|---------------|--------|
| 1 | 0 | 4 | 2 | 3 | NO | YES → AMBIGUOUS | left=1 |
| 2 | 1 | 4 | 2 | 3 | NO | YES → AMBIGUOUS | left=2 |
| 3 | 2 | 4 | 3 | 3 | NO | YES → AMBIGUOUS | left=3 |
| 4 | 3 | 4 | 3 | 3 | NO | YES → AMBIGUOUS | left=4 |
| 5 | 4 | 4 | 4 | 3 | NO | YES → AMBIGUOUS | left=5 |

left=5 > right=4 → **return false ✅** (5 iterations = O(n))

---

## STEP 8: Edge Cases

```
Case 1: All same, target found
  nums=[3,3,3,3,3], target=3
  Iter 1: nums[mid]=3==3 → return true immediately ✓

Case 2: All same, target not found
  nums=[3,3,3,3,3], target=1
  Every iter: left++ → O(n) worst case → return false

Case 3: No rotation
  nums=[1,1,2,3,3], target=2
  Works like normal binary search (no ambiguity) → true

Case 4: Duplicate at boundary
  nums=[1,3,1,1,1], target=3
  Rotation + duplicates at boundary → ambiguous case triggers
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
Version 1 se Version 2 mein sirf YEH EK CASE AATA HAI:

  if nums[left] == nums[mid]:   ← EXTRA (ambiguity)
    left++
    continue

Baaki sab same!

FULL ALGORITHM:
  while (left <= right):
    mid = (left+right)/2
    nums[mid] == target? → return true

    nums[left] == nums[mid]? → left++, continue  ← NEW

    LEFT sorted (nums[left] < nums[mid]):
      nums[left] <= target < nums[mid]?
        YES → right = mid-1
        NO  → left = mid+1

    RIGHT sorted:
      nums[mid] < target <= nums[right]?
        YES → left = mid+1
        NO  → right = mid-1

  return false

COMPLEXITY:
  Average: O(log n)
  Worst:   O(n)  — when all elements are duplicates

WHY nums[left] == nums[mid] case:
  [3,1,2,3] looks like "left sorted" (3<=3) but has a break!
  Can't decide which half is sorted → need to change reference.

WHY left++:
  Our check uses nums[left] as reference point.
  left++ → reference changes → next iter can decide.
  right-- bhi kaam karta hai (mid recalculates).
  Jo element reference hai — wahi advance karo.
```