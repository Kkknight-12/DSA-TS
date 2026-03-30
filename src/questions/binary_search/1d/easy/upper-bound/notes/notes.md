# Upper Bound — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array hai. Ek target x diya hai.
**Upper Bound dhundho** = pehla index jahan `arr[i] > x` ho (strictly greater).

```
arr = [1, 3, 5, 5, 7, 9],  x = 5

idx:   0   1   2   3   4   5
val:   1   3   5   5   7   9

Kaunsa pehla element STRICTLY > 5 hai?
  1 > 5? NO
  3 > 5? NO
  5 > 5? NO  ← equal, count nahi hoga!
  5 > 5? NO
  7 > 5? YES ← PEHLA!

Answer = index 4
```

**Agar koi element > x nahi:**
```
arr = [1, 3, 5],  x = 5
Koi bhi element > 5 nahi → Answer = n = 3 (array length)
```

---

## STEP 2: Lower Bound vs Upper Bound — Fark Samjho

Sirf ek word ka fark hai — lekin result alag hota hai:

```
Lower Bound → arr[i] >= x  (greater than OR EQUAL)
Upper Bound → arr[i] >  x  (STRICTLY greater, equal nahi)
```

Example side by side:
```
arr = [1, 3, 5, 5, 7, 9],  x = 5

idx:    0    1    2    3    4    5
val:    1    3    5    5    7    9

LB (>=5):  ✗    ✗    ✓    ✓    ✓    ✓   → LB = index 2
UB ( >5):  ✗    ✗    ✗    ✗    ✓    ✓   → UB = index 4
```

Visual:
```
[1,  3,  5,  5,  7,  9]
         ↑       ↑
       LB=2      UB=4
        |←── 5s ──→|
```

**UB - LB = count of x in array**
```
4 - 2 = 2  → 5 appears exactly 2 times ✓
```

Yeh trick bahut useful hai!

---

## STEP 3: Monotonic Property

Array sorted hai. Pattern banta hai:

```
arr = [1, 3, 5, 5, 7, 9],  x = 5

idx:    0    1    2    3    4    5
val:    1    3    5    5    7    9
> 5?:   ✗    ✗    ✗    ✗    ✓    ✓
                            ↑
                     first ✓ = ANSWER
```

`[✗, ✗, ..., ✓, ✓]` → **first ✓ dhundho** = Binary Search!

---

## STEP 4: Algorithm — Lower Bound se Sirf Ek Line Alag

```
Lower Bound:          Upper Bound:
arr[mid] >= x?        arr[mid] > x?
  YES → right=mid       YES → right=mid
  NO  → left=mid+1      NO  → left=mid+1
```

Literally sirf `>=` ko `>` karo — baaki sab same!

```
while (left < right):
  mid = floor((left + right) / 2)
  arr[mid] > x?           ← only change from lower bound
    YES → right = mid
    NO  → left = mid + 1
return left
```

---

## FULL DRY RUN — arr=[1,3,5,5,7,9], x=5

```
left=0, right=6 (n=6)
```

| Iter | left | right | mid | arr[mid] | >5? | Action  |
|------|------|-------|-----|----------|-----|---------|
| 1 | 0 | 6 | 3 | 5 | ✗ | left=4  |
| 2 | 4 | 6 | 5 | 9 | ✓ | right=5 |
| 3 | 4 | 5 | 4 | 7 | ✓ | right=4 |

left=4 === right=4 → return 4 ✅

```
Array:  1   3   5   5   7   9
idx:    0   1   2   3   4   5

Search space:
[0 ──────────── 6]
[4 ──────────── 6]    arr[3]=5 not > 5, go right
[4 ──── 5]            arr[5]=9 > 5, go left
[4 == 4] → done!      arr[4]=7 > 5, go left → done

Answer = index 4 → arr[4] = 7 ✅
```

---

## STEP 5: Integer Trick — UB = LB(x+1)

Integers ke liye:
```
"first index > x" = "first index >= x+1"

upperBound(x) = lowerBound(x + 1)
```

Example:
```
arr=[1,3,5,5,7,9], x=5

upperBound(5)  → first index where arr[i] > 5   → index 4
lowerBound(6)  → first index where arr[i] >= 6  → index 4 ✓ same!
```

**Yeh trick sirf integers ke liye kaam karta hai.** Floats mein x+1 galat hoga.

---

## STEP 6: Upper Bound Ka Use Kahan Hota Hai?

```
Count of x in sorted array:
  count = upperBound(x) - lowerBound(x)

Last occurrence of x:
  upperBound(x) - 1  (agar exist karta hai)

Insert position (keep duplicates after):
  upperBound(x)  → insert x ke saare copies ke baad
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
Upper Bound = first index i where arr[i] > x (strictly)

Lower Bound = first index i where arr[i] >= x

1. left=0, right=n  ← n, NOT n-1!

2. while (left < right):
   mid = floor((left + right) / 2)
   arr[mid] > x?              ← strictly greater (>), not >=
     YES → right = mid
     NO  → left = mid + 1

3. return left

REMEMBER:
  LB = >=    UB = >
  UB - LB = count of x in array
  UB(x) = LB(x+1) for integers
```