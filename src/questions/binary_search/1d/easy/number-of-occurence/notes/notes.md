# Number of Occurrences — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array mein target kitni baar aata hai?

```
arr = [1, 1, 2, 2, 2, 2, 3],  target = 2

idx:   0   1   2   3   4   5   6
val:   1   1   2   2   2   2   3
                ↑               ↑
           first 2           last 2+1

2 aata hai at indices 2, 3, 4, 5 → count = 4
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: array traverse karo, target ke saare occurrences count karo.

```
arr = [1, 1, 2, 2, 2, 2, 3],  target = 2

count = 0
idx=0: 1 == 2? NO
idx=1: 1 == 2? NO
idx=2: 2 == 2? YES → count=1
idx=3: 2 == 2? YES → count=2
idx=4: 2 == 2? YES → count=3
idx=5: 2 == 2? YES → count=4
idx=6: 3 == 2? NO
return 4 ✓
```

**Problem:** O(n) — n = 10^6 → TLE. Array sorted hai toh UB-LB trick se O(log n) ho sakta hai.

---

## STEP 3: Key Insight — count = upperBound - lowerBound

Tune upper bound ke notes mein yeh trick padhI thi:

```
count of x = upperBound(x) - lowerBound(x)
```

Ab use karo!

```
arr = [1, 1, 2, 2, 2, 2, 3],  target = 2

lowerBound(2) = first index where arr[i] >= 2 = index 2
upperBound(2) = first index where arr[i] >  2 = index 6

count = UB - LB = 6 - 2 = 4 ✓
```

Visual:
```
[1,  1,  2,  2,  2,  2,  3]
         ↑               ↑
       LB=2            UB=6
        |←── 4 twos ───→|
```

---

## STEP 4: Core Variables

```
lb  = lowerBound(target) → first index where arr[i] >= target
ub  = upperBound(target) → first index where arr[i] >  target
```

**WHY ub - lb = count?**
`lb` = target shuru hone ki jagah (inclusive)
`ub` = target khatam hone ke baad ki jagah (exclusive)
Unke beech ke indices sab target hain → count = ub - lb

---

## STEP 5: Full Dry Run

### lowerBound(2): first index where arr[i] >= 2

```
left=0, right=7
>=2?  ✗   ✗   ✓   ✓   ✓   ✓   ✓
              ↑
         first ✓ = index 2
```

| Iter | left | right | mid | arr[mid] | >=2? | Action  |
|------|------|-------|-----|----------|------|---------|
| 1 | 0 | 7 | 3 | 2 | ✓ | right=3 |
| 2 | 0 | 3 | 1 | 1 | ✗ | left=2  |
| 3 | 2 | 3 | 2 | 2 | ✓ | right=2 |

**lb = 2**, arr[2]=2 == target → target exists ✓

---

### upperBound(2): first index where arr[i] > 2

```
left=0, right=7
> 2?  ✗   ✗   ✗   ✗   ✗   ✗   ✓
                                ↑
                           first ✓ = index 6
```

| Iter | left | right | mid | arr[mid] | >2? | Action |
|------|------|-------|-----|----------|-----|--------|
| 1 | 0 | 7 | 3 | 2 | ✗ | left=4 |
| 2 | 4 | 7 | 5 | 2 | ✗ | left=6 |
| 3 | 6 | 7 | 6 | 3 | ✓ | right=6 |

**ub = 6**

---

### count = ub - lb = 6 - 2 = 4 ✅

---

## STEP 4: Target Not Found Cases

```
Case 1: lb == n (target > all elements)
  arr=[1,2,3], target=5
  lb=3 (=n) → no element >= 5 → return 0

Case 2: arr[lb] != target (target missing, lb points to next element)
  arr=[1,3,5], target=2
  lb=1, arr[1]=3 ≠ 2 → target not there → return 0
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
count of target = upperBound(target) - lowerBound(target)

Steps:
1. lb = lowerBound(target)   → first index where arr[i] >= target
2. lb == n OR arr[lb] != target? → return 0  (not found)
3. ub = upperBound(target)   → first index where arr[i] > target
4. return ub - lb

REMEMBER:
  LB → where target starts (inclusive)
  UB → where target ends   (exclusive)
  UB - LB = count

Yeh teen problems ek saath yaad rakho:
  Lower Bound  → arr[i] >= x  → first occurrence ki jagah
  Upper Bound  → arr[i] > x   → last occurrence ke baad ki jagah
  Count        → UB - LB
```
