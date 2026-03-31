# Lower Bound — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array hai. Ek target x diya hai.
**Lower Bound dhundho** = pehla index jahan `arr[i] >= x` ho.

```
arr = [1, 3, 5, 7, 9, 11],  x = 6

idx:   0   1   2   3   4   5
val:   1   3   5   7   9  11

Kaunsa pehla element >= 6 hai?
  1 >= 6? NO
  3 >= 6? NO
  5 >= 6? NO
  7 >= 6? YES ← PEHLA!

Answer = index 3
```

**Agar koi element >= x nahi:**
```
arr = [1, 3, 5],  x = 10
Koi bhi element >= 10 nahi → Answer = n = 3 (array length)
```

---

## STEP 2: Lower Bound Ka Use Kahan Hota Hai?

Lower bound ek building block hai — bahut saare problems isi pe based hain:

```
Upper Bound         → first index where arr[i] > x
                      = lower_bound(x+1)

Search Insert Pos   → lower_bound(x) hi hai!
                      (pehli jagah jahan x fit hoga)

First Occurrence    → lower_bound(x), phir check arr[ans] == x?

Count of x in arr   → upper_bound(x) - lower_bound(x)
```

Ek baar lower bound samajh aaya → baaki sab easy ho jaate hain.

---

## STEP 3: Brute Force Kyun Slow Hai

Linear scan: left to right, pehla element >= x dhundho.

```
arr = [1, 3, 5, 7, 9, 11],  x = 6

Check idx=0: 1 >= 6? NO
Check idx=1: 3 >= 6? NO
Check idx=2: 5 >= 6? NO
Check idx=3: 7 >= 6? YES → return 3
```

**Problem:** n = 10^6 hota hai → 10^6 iterations → TLE.

---

## STEP 4: Key Insight — Monotonic Property

Array sorted hai. Toh ek interesting pattern banta hai:

```
arr = [1, 3, 5, 7, 9, 11],  x = 6

idx:    0    1    2    3    4    5
val:    1    3    5    7    9   11
>=6?:   ✗    ✗    ✗    ✓    ✓    ✓
```

Pattern dikhta hai:
```
[✗, ✗, ✗, ..., ✓, ✓, ✓]
```

**WHY yeh pattern guaranteed hai?**
Array sorted hai → agar arr[i] >= x, toh arr[i+1] bhi >= x (kyunki arr[i+1] >= arr[i]).
Isliye ek baar ✓ mila → baaki sab ✓ hi honge.

`[✗, ✗, ..., ✓, ✓]` → **first ✓ dhundho** = Binary Search!

---

## STEP 5: Core Variables — left, right, mid kya hain?

```
left  = 0    → search space ka left boundary (definitely invalid se shuru)
right = n    → search space ka right boundary (n = "not found" case)
mid   = (left+right)/2  → current candidate index
```

Loop khatam hone pe `left === right` — dono same index pe converge.

**WHY return left?**
Jab loop khatam hota hai, `left` aur `right` dono us pehle valid index pe hote hain jahan `arr[i] >= x`.
`left` return karna = woh first valid index return karna = lower bound return karna.

---

## STEP 6: Binary Search Pattern — "Find First Valid"

**Sawaal:** "arr[mid] >= x hai?"

```
YES (✓) → mid valid answer ho sakta hai.
           Par koi chota index bhi valid ho sakta hai.
           Isliye → right = mid  (mid mat chhodo, left explore karo)

NO  (✗) → mid aur sab left side bhi invalid hai.
           Isliye → left = mid + 1
```

Yeh Pattern 2 hai:
```
while (left < right):
  mid = floor((left + right) / 2)
  arr[mid] >= x? → right = mid
  else           → left = mid + 1
return left
```

Loop khatam hone pe `left === right` = first valid index (ya n agar koi nahi).

---

## STEP 6: WHY right = n (not n-1)?

Yeh important hai — galti mat karo!

```
arr = [1, 3, 5],  x = 10
```

Agar `right = n-1 = 2` rakha:
```
Iteration 1: left=0, right=2, mid=1
  arr[1]=3 >= 10? NO → left=2

Iteration 2: left=2, right=2 → EXIT
  return 2  ← WRONG! arr[2]=5, not >= 10
```

Agar `right = n = 3` rakha:
```
Iteration 1: left=0, right=3, mid=1
  arr[1]=3 >= 10? NO → left=2

Iteration 2: left=2, right=3, mid=2
  arr[2]=5 >= 10? NO → left=3

left=3 === right=3 → EXIT
return 3  ← CORRECT! n means "not found"
```

**Rule: right = n kyunki n khud ek valid answer hai (not found case).**

---

## FULL DRY RUN — arr=[1,3,5,7,9,11], x=6

```
left=0, right=6 (n=6)
```

| Iter | left | right | mid | arr[mid] | >=6? | Action  |
|------|------|-------|-----|----------|------|---------|
| 1 | 0 | 6 | 3 | 7 | ✓ | right=3 |
| 2 | 0 | 3 | 1 | 3 | ✗ | left=2  |
| 3 | 2 | 3 | 2 | 5 | ✗ | left=3  |

left=3 === right=3 → return 3 ✅

```
Array:  1   3   5   7   9  11
idx:    0   1   2   3   4   5

Search space:
[0 ──────── 6]
[0 ──── 3]        arr[3]=7 >= 6 ✓, go left
[2 ──── 3]        arr[1]=3 < 6 ✗, go right
[3 == 3] → done!  arr[2]=5 < 6 ✗, go right

Answer = index 3 → arr[3] = 7 ✅
```

---

## STEP 7: Common Confusion — Lower Bound vs Floor

Yeh alag hain! Confuse mat ho:

```
Lower Bound → FIRST index where arr[i] >= x
              (chota end se pehla valid)

Floor       → LAST index where arr[i] <= x
              (x se chota ya barabar, sabse bada)
```

Example: arr=[1,3,5,7], x=6
```
Lower Bound = index 3  (arr[3]=7, first element >= 6)
Floor       = index 2  (arr[2]=5, last element <= 6)
```

Yeh alag algorithms hain — ek hi mat mano!

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
Lower Bound = first index i where arr[i] >= x

1. left=0, right=n  ← n, NOT n-1!

2. while (left < right):
   mid = floor((left + right) / 2)
   arr[mid] >= x?
     YES → right = mid     ← valid, try finding earlier
     NO  → left = mid + 1  ← invalid, go right

3. return left
   left = n means "not found" (no element >= x)

PATTERN: [✗,✗,...,✓,✓] → find first ✓ = Pattern 2
```
