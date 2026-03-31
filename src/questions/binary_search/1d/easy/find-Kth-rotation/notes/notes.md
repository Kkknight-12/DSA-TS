# Find K-th Rotation — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array ko k baar rotate kiya gaya hai. Woh k dhundho.

**Rotation = pehla element end mein chala jaata hai:**
```
Original: [1, 2, 3, 4, 5]
k=1:      [5, 1, 2, 3, 4]
k=2:      [4, 5, 1, 2, 3]
k=3:      [3, 4, 5, 1, 2]
k=4:      [2, 3, 4, 5, 1]
k=5:      [1, 2, 3, 4, 5]  ← full circle = original
```

Example:
```
arr = [4, 5, 6, 7, 0, 1, 2]
Answer = 4
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: array traverse karo, pehla element dhundho jo apne next se chota ho — wahi break point hai. Uska index + 1 = k.

```
arr = [4, 5, 6, 7, 0, 1, 2]

idx=0: 4 < 5? no
idx=1: 5 < 6? no
idx=2: 6 < 7? no
idx=3: 7 < 0? YES! → break point at idx=3 → k = 3+1 = 4 ✓
```

**Problem:** n = 10^6 → 10^6 iterations → slow.
Array sorted hai toh binary search se O(log n) mein ho sakta hai.

---

## STEP 3: Key Insight — k = Index of Minimum Element

Simulate karo:

```
Original: [0, 1, 2, 4, 5, 6, 7]
           ↑
     minimum at index 0 → k = 0

After 1 rotation: [7, 0, 1, 2, 4, 5, 6]
                      ↑
                  minimum at index 1 → k = 1 ✓

After 4 rotations: [4, 5, 6, 7, 0, 1, 2]
                               ↑
                           minimum at index 4 → k = 4 ✓
```

**WHY?**
Har rotation mein minimum element ek step aage badhta hai (index 0 → 1 → 2 → ...).
k rotations ke baad minimum index k pe hoga.

**Toh problem simple ho gayi: minimum element ka index dhundho!**

---

## STEP 4: Rotated Array ki Structure

Rotated sorted array mein hamesha ek "break point" hota hai:

```
arr = [4, 5, 6, 7, 0, 1, 2]
       ←── big ──→ ← small →
                   ↑
              break point (yahan value girta hai)
```

Left side: sorted, large values (original array ka end)
Right side: sorted, small values (original array ka beginning)

Minimum hamesha break point pe hota hai (small side ka pehla element).

---

## STEP 5: Core Variables — left, right, mid kya hain?

```
left  = 0      → search space ka left boundary
right = n-1    → search space ka right boundary
                  (WHY n-1 not n? Hum actual index dhundh rahe hain, n valid index nahi)
mid   = (left+right)/2  → current candidate index
```

Loop khatam hone pe `left === right` — dono same index pe converge ho jaate hain.
Woh index minimum element ka index hai = answer (k).

**WHY return left?**
Jab loop khatam hota hai, `left` aur `right` dono minimum element ke index pe hote hain.
`left` return karna = minimum ka index return karna = k return karna.

---

## STEP 6: Binary Search — arr[mid] vs arr[right]

**Sawaal:** "Mid kis side pe hai?"

```
arr[mid] > arr[right]?
  YES → mid LEFT (big) half mein hai → minimum RIGHT mein → left = mid + 1
  NO  → mid RIGHT (small) half mein hai → minimum LEFT mein ya MID pe → right = mid
```

**WHY arr[right] use karte hain, arr[left] nahi?**
`arr[right]` stable reference hai — woh har iteration mein reliable hota hai.
`arr[left]` badal jaata hai jab `left = mid + 1` karte hain — toh stable nahi.

---

## STEP 7: Edge Case — Not Rotated

```
arr = [1, 2, 3, 4, 5]
arr[0]=1 < arr[n-1]=5 → Array sorted hai → k = 0
```

**WHY yeh check zaroori hai?**
Agar array sorted hai toh binary search usse rotated maanta hai aur galat answer deta hai.
Pehle hi check kar lo aur 0 return karo.

---

## FULL DRY RUN — arr=[4,5,6,7,0,1,2]

```
left=0, right=6

idx:  0   1   2   3   4   5   6
val:  4   5   6   7   0   1   2
                      ↑
                 minimum = 0, index = 4
```

| Iter | left | right | mid | arr[mid] | arr[right] | mid > right? | Action  |
|------|------|-------|-----|----------|------------|--------------|---------|
| 1 | 0 | 6 | 3 | 7 | 2 | ✓ | left=4  |
| 2 | 4 | 6 | 5 | 1 | 2 | ✗ | right=5 |
| 3 | 4 | 5 | 4 | 0 | 1 | ✗ | right=4 |

left=4 === right=4 → return 4 ✅

```
[4, 5, 6, 7 | 0, 1, 2]
[0 ──────────── 6]
[4 ──────────── 6]   arr[3]=7 > arr[6]=2, min right mein
[4 ──── 5]           arr[5]=1 ≤ arr[6]=2, min left ya mid
[4 == 4] → done!     arr[4]=0 ≤ arr[5]=1, min left ya mid
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
k = index of minimum element in rotated sorted array

WHY: k rotations ke baad minimum index 0 se k pe shift ho jaata hai

1. arr[0] < arr[n-1]? → NOT rotated → return 0

2. left=0, right=n-1   ← n-1 (not n) — actual index chahiye

3. while (left < right):
   mid = floor((left + right) / 2)
   arr[mid] > arr[right]?
     YES → left = mid + 1   ← min in right half
     NO  → right = mid      ← min in left half or at mid

4. return left   ← left == right == index of minimum == k

REMEMBER:
  Break point pe minimum hota hai
  arr[mid] vs arr[right] compare karo (arr[left] nahi!)
  right = n-1 (not n) — ek aur baar check karo before writing
```
