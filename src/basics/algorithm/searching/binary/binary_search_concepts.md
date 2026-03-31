# Binary Search — Complete Concepts Guide
(Kisi bhi Binary Search problem ke liye generic reference)

Bottom-up style: pehle simulate karo, concept khud emerge hoga.

---

## Table of Contents
1. [Binary Search Kya Hai?](#1-binary-search-kya-hai)
2. [Monotonic Property — BS ka prerequisite](#2-monotonic-property)
3. [Pattern 1 — Exact Match](#3-pattern-1--exact-match-while-left--right)
4. [Pattern 2 — Boundary/Optimization](#4-pattern-2--boundaryoptimization-while-left--right)
5. [WHY right = mid (not mid-1) in Pattern 2](#5-why-right--mid-not-mid-1-in-pattern-2)
6. [WHY return left at convergence](#6-why-return-left-at-convergence)
7. [mid Calculation — Lower vs Upper Mid](#7-mid-calculation--lower-vs-upper-mid)
8. [Stable Reference — WHY arr[right] not arr[left]](#8-stable-reference--why-arrright-not-arrleft)
9. [Pattern Selection — Kaunsa Pattern Use Karo?](#9-pattern-selection--kaunsa-pattern-use-karo)
10. [Common Mistakes](#10-common-mistakes)

---

## 1. Binary Search Kya Hai?

Pehle simulate karo — phir concept samjho.

**Problem:** `arr=[1,3,5,7,9,11,13,15]`, `target=11`, dhundho

### Linear Search (naive)
```
Check 1 → 3 → 5 → 7 → 9 → 11 ← found! 6 steps
n=10^6 hota? 10^6 steps → TLE
```

### Binary Search (smart)

> "Array sorted hai → har baar HALF eliminate kar sakte hain!"

```
Step 1:
  [1, 3, 5, 7, 9, 11, 13, 15]
   L              M           R
  arr[M]=7 < 11 → left half useless! sab <= 7, target 11 > 7

Step 2:
  [_, _, _, _, 9, 11, 13, 15]
               L   M       R
  arr[M]=13 > 11 → right half useless!

Step 3:
  [_, _, _, _, 9, 11, _, _]
               L  M
               L  R
  arr[M]=9 < 11 → left=M+1

Step 4:
  arr[L]=11 === target → found! 4 steps ✅
```

`n=10^6` hota? `log2(10^6) ≈ 20` steps → fast!

**Key Idea:**
Har step mein search space **HALF** hoti hai → O(log n).
Yeh sirf tab possible hai jab array sorted ho (ya monotonic property ho).

---

## 2. Monotonic Property

Binary search sirf tab kaam karta hai jab:

> "Koi ek point hota hai jiske pehle sab ek type (✗) aur baad mein sab doosre type (✓) hote hain."

### Example 1: Sorted array mein lower bound

```
arr=[1,3,5,7,9], x=6

Sawaal: "arr[i] >= 6 hai?"

idx:  0    1    2    3    4
val:  1    3    5    7    9
>=6?  ✗    ✗    ✗    ✓    ✓
                     ↑
              first ✓ = ANSWER

Pattern: [✗,✗,✗,...,✓,✓,✓] ← monotonic!
```

### Example 2: Answer space mein (on-answer problems)

```
Problem: "Min speed pe kya k hours mein kaam ho sakta hai?"

speed:  1    2    3    4    5    6    ...
valid:  ✗    ✗    ✗    ✓    ✓    ✓   ...
                        ↑
                 first ✓ = min valid speed
```

Array sorted nahi hai, lekin **answer space** sorted hai! Same technique.

### When Binary Search Works

| ✅ Works | ❌ Doesn't Work |
|---------|----------------|
| Sorted array mein search | Unsorted array |
| Boundary dhundna `[✗✗✓✓]` | Non-monotonic conditions |
| Minimize/maximize with feasibility check | |
| Any monotonic function pe search | |

---

## 3. Pattern 1 — Exact Match (while left <= right)

**Kab use karo:** Exact element dhundna hai, ya `-1` return karna hai.

### Simulation — target found

```
arr=[2,5,8,12,16,23], target=23

Iter 1: left=0, right=5, mid=2 → arr[2]=8 < 23 → left=3
Iter 2: left=3, right=5, mid=4 → arr[4]=16 < 23 → left=5
Iter 3: left=5, right=5, mid=5 → arr[5]=23 === 23 → return 5 ✅
```

### Simulation — target NOT found

```
arr=[2,5,8,12,16,23], target=10

Iter 1: left=0, right=5, mid=2 → arr[2]=8 < 10 → left=3
Iter 2: left=3, right=5, mid=4 → arr[4]=16 > 10 → right=3
Iter 3: left=3, right=3, mid=3 → arr[3]=12 > 10 → right=2

left=3 > right=2 → LOOP EXITS
return -1 ✅
```

**WHY `left <= right`?**
Jab `left === right`, ek element baki hai — usse bhi check karna zaroori hai.
`left > right` hone pe saari possibilities khatam → not found.

### Template

```
left = 0, right = n-1
while (left <= right):
  mid = floor((left + right) / 2)
  if arr[mid] === target: return mid
  if arr[mid] < target:   left  = mid + 1
  else:                   right = mid - 1
return -1
```

### Pattern 1 can also find boundaries — with result saving

Pattern 1 sirf exact match ke liye nahi hai. Boundary problems (lower bound, first occurrence)
bhi Pattern 1 se solve ho sakti hain — bas `result` variable mein valid answer save karo.

```
// Lower bound using Pattern 1 style
left = 0, right = n-1, result = n   ← default "not found" = n

while (left <= right):
  mid = floor((left + right) / 2)
  arr[mid] >= x?
    result = mid        ← valid answer save karo
    right = mid - 1     ← aur left mein aur chota dhundho
  else:
    left = mid + 1

return result
```

Simulation — arr=[1,3,5,7,9], x=6:
```
Iter 1: mid=2, arr[2]=5 >= 6? NO  → left=3
Iter 2: mid=3, arr[3]=7 >= 6? YES → result=3, right=2
left=3 > right=2 → EXIT
return result=3 ✅
```

**Yeh valid hai — galat nahi hai!**

Pattern 1 vs Pattern 2 for boundary problems:
```
Pattern 1 style           Pattern 2 style
─────────────────         ─────────────────
result = n                (no extra variable)
while (left <= right)     while (left < right)
  valid? →                  valid? →
    result = mid              right = mid
    right = mid - 1         invalid? →
  invalid? →                  left = mid + 1
    left = mid + 1        return left
return result
```

Dono correct hain. Pattern 2 preferred hai kyunki:
- Extra `result` variable nahi chahiye
- `left` khud converge karke answer ban jaata hai
- Cleaner aur less code

**Lekin agar Pattern 1 style se likha toh koi problem nahi — sirf verbose hai.**

---

## 4. Pattern 2 — Boundary/Optimization (while left < right)

**Kab use karo:** First valid dhundna, minimize/maximize karna, answer guaranteed exist karta hai.

### WHY `left < right` (not `<=`)

Pattern 2 mein loop **tab exit karta hai jab `left === right`**.
Us waqt dono same index pe = answer.

Agar `left <= right` likhein:
```
left=5, right=5, mid=5
Condition true → right = mid = 5
left=5, right=5 → SAME STATE! Infinite loop ♾️
```

Isliye: `left < right` — jab dono same ho jaayein, stop karo.

### Simulation — lower bound (first index where arr[i] >= 6)

```
arr=[1,3,5,7,9], x=6
left=0, right=5 (n=5)

Iter 1: left=0, right=5, mid=2 → arr[2]=5 >= 6? NO  → left=3
Iter 2: left=3, right=5, mid=4 → arr[4]=9 >= 6? YES → right=4
Iter 3: left=3, right=4, mid=3 → arr[3]=7 >= 6? YES → right=3

left=3 === right=3 → EXIT
return 3 ✅  (arr[3]=7, first element >= 6)
```

### Template

```
left = 0, right = n   ← (n for "not found" case, n-1 for index search)
while (left < right):
  mid = floor((left + right) / 2)
  isValid(mid)?
    YES → right = mid      ← mid could be answer, keep it
    NO  → left  = mid + 1  ← mid definitely wrong, skip it
return left
```

---

## 5. WHY right = mid (NOT mid-1) in Pattern 2

Sabse common confusion. Simulate karte hain dono cases:

**Problem:** `arr=[1,3,5,7,9]`, find first index where `arr[i] >= 6`
**Expected answer:** index 3 (arr[3]=7)

### Case A: right = mid-1, result save kiye bina (WRONG)

```
Iter 1: left=0, right=4, mid=2 → arr[2]=5 >= 6? NO  → left=3
Iter 2: left=3, right=4, mid=3 → arr[3]=7 >= 6? YES → right = mid-1 = 2

left=3, right=2 → left > right → LOOP EXITS
return ??? → answer 3 GAYA! ❌
```

Jab `arr[mid]=7` valid tha, humne usse skip kar diya (`right=mid-1`) bina save kiye.
Lekin 7 hi answer tha — miss ho gaya.

### Case A Fixed: right = mid-1, WITH result saving (VALID — Pattern 1 style)

```
result = 5 (n, default)

Iter 1: left=0, right=4, mid=2 → arr[2]=5 >= 6? NO  → left=3
Iter 2: left=3, right=4, mid=3 → arr[3]=7 >= 6? YES → result=3, right=2

left=3 > right=2 → EXIT
return result=3 ✅
```

**Yeh kaam karta hai!** `right = mid-1` tabhi safe hai jab valid answer `result` mein save kar lo.
Yeh Pattern 1 style hai — verbose hai lekin galat nahi.

### Case B: right = mid (CORRECT — Pattern 2 style)

```
Iter 1: left=0, right=5, mid=2 → arr[2]=5 >= 6? NO  → left=3
Iter 2: left=3, right=5, mid=4 → arr[4]=9 >= 6? YES → right=4 ← 4 range mein hai
Iter 3: left=3, right=4, mid=3 → arr[3]=7 >= 6? YES → right=3 ← 3 range mein hai

left=3 === right=3 → EXIT
return 3 ✅
```

### Rule

```
"Kya mid ab bhi answer ban sakta hai?"
  YES → mat chhodo → right = mid
  NO  → chhod do  → left = mid + 1
```

---

## 6. WHY return left at Convergence

Pattern 2 loop `left === right` pe exit karta hai. Kyun woh index = answer?

### Simulate window shrinking

```
[✗, ✗, ✗, ✓, ✓, ✓]
 L              R

Iter 1: mid is ✓ → right=mid
[✗, ✗, ✗, ✓, ✓]
 L        R

Iter 2: mid is ✗ → left=mid+1
[_, _, _, ✓, ✓]
          L  R

Iter 3: mid is ✓ → right=mid
[_, _, _, ✓]
          L
          R

left === right → EXIT
```

Notice:
- `left` hamesha invalid side mein ya boundary pe tha
- `right` hamesha valid side mein ya boundary pe tha
- Jab dono milte hain → woh **first valid index** hota hai

**WHY left return karo, right nahi?**
Loop exit pe `left === right` — dono same hain. Koi bhi return karo, same answer.
Convention: `return left`.

### What `left` represents at exit

| Problem | left at exit |
|---------|-------------|
| Lower bound | first index where `arr[i] >= x` |
| Upper bound | first index where `arr[i] > x` |
| Search insert | index where target fits |
| Find min rotated | index of minimum element |
| BS on answer | minimum valid answer value |

**Sab cases mein:** `left` = "first index/value jahan condition true hoti hai"

---

## 7. mid Calculation — Lower vs Upper Mid

Galat choose karo → infinite loop.

### Lower Mid (default)
```
mid = floor((left + right) / 2)

left=2, right=3 → mid = floor(5/2) = 2  ← left ki taraf jhukta hai
```

### Upper Mid
```
mid = floor((left + right + 1) / 2)

left=2, right=3 → mid = floor(6/2) = 3  ← right ki taraf jhukta hai
```

### Kab problem hoti hai — simulate karo

**Problem:** `left=2, right=3`. Condition true hone pe `left = mid` karo.

```
With LOWER mid:
  mid = floor((2+3)/2) = 2
  Condition true → left = mid = 2
  left=2, right=3 → SAME STATE! Infinite loop ♾️

With UPPER mid:
  mid = floor((2+3+1)/2) = 3
  Condition true → left = mid = 3
  left=3, right=3 → EXIT ✅
```

### Simple Rule

| Update | Mid to use |
|--------|-----------|
| `left = mid + 1` | Lower mid (default) ✅ |
| `right = mid` | Lower mid (default) ✅ |
| `left = mid` | **UPPER MID ZAROORI!** ⚠️ |
| `right = mid - 1` | Lower mid (Pattern 1 style) ✅ |

**Jab bhi `left = mid` likhna pade → upper mid use karo.**

### WHY yeh asymmetry hai?

Lower mid left ki taraf jhukta hai.
`left = mid` (lower) → left kabhi nahi badh sakta → stuck → infinite loop.

Upper mid right ki taraf jhukta hai.
`left = mid` (upper) → left right ki taraf badhta hai → eventually exits.

---

## 8. Stable Reference — WHY arr[right] (not arr[left])

Kuch problems mein `arr[mid]` ko kisi anchor se compare karte hain.
`arr[right]` reliable hai. `arr[left]` nahi. Kyun?

### Concrete example: Find minimum in rotated sorted array

```
arr = [4, 5, 6, 7, 0, 1, 2]
       ←── big ──→ ← small →
                   ↑
              minimum yahan hai
```

Hume pata karna hai: "mid kis side (big ya small) pe hai?"

### arr[right] as anchor — WHY STABLE

`arr[right]` sirf tab badlata hai jab `right = mid` karte hain.
Aur tab bhi `arr[right] = arr[mid]` — ek value jo hum **already check kar chuke hain**.

```
left=0, right=6: arr[right]=arr[6]=2 ← pata hai yeh small half mein hai

Iter 1: mid=3, arr[3]=7 > arr[right]=2 → mid big half mein → left=4
left=4, right=6: arr[right]=arr[6]=2 ← SAME value, still reliable ✓

Iter 2: mid=5, arr[5]=1 > arr[right]=2? NO → right=5
left=4, right=5: arr[right]=arr[5]=1 ← changed to arr[mid], already checked ✓

Iter 3: mid=4, arr[4]=0 > arr[right]=1? NO → right=4
left=4 === right=4 → return 4 ✅
```

### arr[left] as anchor — WHY UNSTABLE

`arr[left]` tab badlata hai jab `left = mid + 1` karte hain.
Naya `arr[left] = arr[mid+1]` — ek value jo hum **abhi tak CHECK NAHI ki!**

```
left=0, right=6: arr[left]=arr[0]=4 ← big half mein hai

Iter 1: mid=3, arr[3]=7 < arr[left]=4? NO → left=4
left=4, right=6: arr[left]=arr[4]=0 ← JUMPED to minimum itself!
                                        Ab comparison galat ho jaayegi.

Iter 2: mid=5, arr[5]=1 < arr[left]=0? NO → left=6
left=6 === right=6 → return 6
arr[6]=2 → WRONG! ❌  (answer index 4 tha)
```

### General Rule

```
arr[mid] vs arr[right] → ✅ Safe
  right sirf checked values pe move karta hai.

arr[mid] vs arr[left]  → ⚠️ Risky
  left = mid+1 pe arr[left] unchecked value ban jaata hai.

arr[mid] vs arr[0] or arr[n-1] → ✅ Safe (agar fixed rahein)
  Fixed endpoints kabhi nahi badlate.
```

---

## 9. Pattern Selection — Kaunsa Pattern Use Karo?

### Question 1: Exact element dhundh rahe ho?

> "Kya main ek specific value dhundh raha hun,
>  aur agar na mile toh -1 return karna hai?"

**YES →** Pattern 1 (`while left <= right`, `right = mid-1`, return `-1` if not found)

**NO →** Question 2 pe jao

### Question 2: MINIMIZE ya MAXIMIZE?

**MINIMIZE** (first valid, smallest valid value):
```
Pattern 2, right = mid (lower mid ok)
[✗✗✗✓✓✓] → find first ✓
return left
```

**MAXIMIZE** (last valid, largest valid value):
```
Pattern 2, left = mid (UPPER MID ZAROORI!)
[✓✓✓✗✗✗] → find last ✓
return left
```

### Summary

```
Exact match + possible -1?
└─► Pattern 1: while(left<=right), right=mid-1, return -1 if not found

Find FIRST valid (minimize)?
└─► Pattern 2: while(left<right), right=mid, lower mid, return left

Find LAST valid (maximize)?
└─► Pattern 2: while(left<right), left=mid, UPPER MID!, return left
```

### Problem Examples

| Pattern | Problems |
|---------|---------|
| Pattern 1 | Classic binary search, search in rotated array, find square root |
| Pattern 2 (minimize) | Lower/upper bound, search insert, find min rotated, Koko bananas, book allocation, ship capacity |
| Pattern 2 (maximize) | Aggressive cows, last occurrence |

---

## 10. Common Mistakes

### Mistake 1: Infinite loop — `left = mid` with lower mid

```
❌ mid = floor((left + right) / 2)    // lower mid
   if (valid) left = mid              // left kabhi nahi badhega!

✅ mid = floor((left + right + 1) / 2) // upper mid
   if (valid) left = mid               // ab left badhega ✓
```

### Mistake 2: Answer chhoot gaya — `right = mid-1` in Pattern 2

```
❌ if (isValid(mid)) right = mid - 1  // valid answer skip ho gaya!
✅ if (isValid(mid)) right = mid      // valid answer range mein rakho
```

### Mistake 3: Wrong right boundary

```
// Insertion/lower bound → answer n bhi ho sakta hai
❌ right = arr.length - 1   // n pe insert nahi ho sakta
✅ right = arr.length       // n valid answer hai

// Actual INDEX dhundh rahe ho (min in rotated)?
✅ right = arr.length - 1   // n-1 last valid index hai
```

### Mistake 4: Pattern 1 loop + Pattern 2 logic mix

```
❌ while (left <= right) {
     if (valid) right = mid  // left===right pe: right=mid → infinite loop!
   }

Mix mat karo. Pattern pehle decide karo, phir consistent raho.
```

### Mistake 5: Unstable anchor comparison

```
❌ arr[mid] vs arr[left]   // left = mid+1 pe arr[left] unchecked ho jaata hai
✅ arr[mid] vs arr[right]  // right sirf checked values pe move karta hai
```

### Mistake 6: Wrong return in Pattern 1

```
❌ return left    // Pattern 1 mein loop exit pe left = right+1 hota hai
✅ return result  // jo tune loop ke andar save kiya tha

// (Exception: agar answer guaranteed exist karta hai)
```
