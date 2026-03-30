# Split Array Largest Sum — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

nums array hai. Isko exactly k contiguous subarrays mein split karna hai.
Goal: minimize karo — maximum sum jo kisi ek subarray ka hoga.

```
nums = [7, 2, 5, 10, 8],  k = 2

Option A: [7, 2, 5] | [10, 8]    → sums = 14, 18 → max = 18 ✓
Option B: [7, 2, 5, 10] | [8]    → sums = 24,  8 → max = 24 ✗
Option C: [7] | [2, 5, 10, 8]    → sums =  7, 25 → max = 25 ✗

Answer = 18
```

**WHY minimize max?**
Tum chahte ho ki koi bhi subarray bahut bada na ho — balanced split chahiye.

---

## STEP 2: Yeh Book Allocation Jaisi Hai! (VERY IMPORTANT)

Yeh ek naya problem nahi hai — tune yeh pehle do baar solve kiya hai!

```
Book Allocation:
  Students ko books do (contiguous)
  Minimize: max PAGES kisi ek student ke paas

Painter Partition:
  Painters ko boards do (contiguous)
  Minimize: max TIME kisi ek painter ko lagega

Split Array:
  k parts mein split karo (contiguous)
  Minimize: max SUM kisi ek part ka
```

**Algorithm EXACTLY same hai!** Sirf names alag hain:

| Book Allocation | Painter Partition | Split Array  |
|-----------------|-------------------|--------------|
| pages           | board lengths     | nums values  |
| students (m)    | painters (k)      | parts (k)    |
| max pages       | max time          | max sum      |
| isPossible()    | canPaint()        | canSplit()   |

Agar koi ek samajh aa gayi → teeno samajh aa gayi!

---

## STEP 3: Brute Force Kyun Slow Hai

Linear scan: har possible "max sum" try karo.

```
left  = max(nums) = 10  → minimum possible max sum
right = sum(nums) = 32  → maximum possible max sum

Try maxSum=10, 11, 12, ... 18 → return 18
```

**Problem:** Values bade hote hain → bahut zyada iterations → TLE.

---

## STEP 4: Key Insight — Monotonic Property

Simulate karte hain: agar max sum = S ho toh kya k parts mein split ho sakta hai?

```
S=15: [7,2,5]=14, next [10] → [10,8]=18>15 → [10] then [8] → 3 parts > k=2 ✗
S=17: [7,2,5]=14, next [10] → [10,8]=18>17 → [10] then [8] → 3 parts > k=2 ✗
S=18: [7,2,5]=14, next [10] → [10,8]=18 ≤18 → 2 parts ≤ k=2 ✓
S=21: 2 parts ✓
```

Pattern dikhta hai:
```
S:     10   14   15   16   17   18   20  ...  32
valid:  ✗    ✗    ✗    ✗    ✗    ✓    ✓  ...   ✓
```

`[✗, ✗, ✗, ..., ✓, ✓, ✓]` → **first ✓ dhundho** = Binary Search!

Zyada sum → ek part mein zyada elements → kam parts chahiye → easier ✓
Kam sum  → ek part mein kam elements  → zyada parts chahiye → harder ✗

---

## STEP 5: Search Space — left aur right kyun?

```
left  = max(nums)
right = sum(nums)
```

**WHY left = max(nums)?**
Simulate karo: nums=[7,2,5,10,8], max=10.

Agar S=9:
```
num=10 aaya → 10 > 9 → koi bhi subarray mein fit nahi hoga!
```
Toh S < max(nums) kabhi possible hi nahi. Isliye left = max(nums).

**WHY right = sum(nums)?**
Agar k=1 → ek subarray sab elements le lega → sum = total sum.
Yeh worst case hai. Answer sum se zyada kabhi nahi hoga.

---

## STEP 6: canSplit Helper — Greedy Simulation

**Sawaal:** "Kya max sum = S rakhte hue k parts mein split ho sakta hai?"

Greedy approach — current part mein elements daalo jab tak S cross na ho:

```
nums=[7,2,5,10,8], S=18, k=2

Part 1 shuru:
  num=7:  0+7=7   ≤ 18 → le lo, sum=7
  num=2:  7+2=9   ≤ 18 → le lo, sum=9
  num=5:  9+5=14  ≤ 18 → le lo, sum=14
  num=10: 14+10=24 > 18 → S cross! Next part.

Part 2:
  num=10: 0+10=10 ≤ 18 → le lo, sum=10
  num=8:  10+8=18 ≤ 18 → le lo, sum=18

Total parts used = 2 ≤ k=2 → TRUE ✓
```

**WHY greedy works?**
Pehle part ko jitna zyada de sako do — isse baaki parts ka load kam hoga.
Greedy always optimal hai yahan kyunki subarrays contiguous hain.

---

## FULL DRY RUN — nums=[7,2,5,10,8], k=2

```
left=10, right=32
```

| Iter | left | right | mid | canSplit? | Action  |
|------|------|-------|-----|-----------|---------|
| 1 | 10 | 32 | 21 | [7,2,5]=14 \| [10,8]=18 → 2≤2 ✓ | right=21 |
| 2 | 10 | 21 | 15 | [7,2,5]=14, [10,8]=18>15 → 3>2 ✗ | left=16 |
| 3 | 16 | 21 | 18 | [7,2,5]=14 \| [10,8]=18 → 2≤2 ✓ | right=18 |
| 4 | 16 | 18 | 17 | [7,2,5]=14, [10,8]=18>17 → 3>2 ✗ | left=18 |

left=18 === right=18 → return 18 ✅

```
Search space:
[10 ──────────────── 32]
[10 ──────── 21]           S=21 valid, go left
[16 ──────── 21]           S=15 invalid, go right
[16 ──── 18]               S=18 valid, go left
[18 == 18] → answer!       S=17 invalid, go right → done
```

**Final split:**
```
Part 1: [7, 2, 5] = 14
Part 2: [10, 8]   = 18 ← maximum
Answer  = 18 ✅
```

---

## STEP 7: WHY Pattern 2 (left < right)?

Yeh MINIMIZE problem hai → Pattern 2 use hota hai:
```
while (left < right):
  mid = floor((left + right) / 2)
  canSplit(mid)? → right = mid      ← valid hai, chota try karo
  else           → left = mid + 1   ← invalid, bada chahiye
return left
```

**WHY right = mid (not mid-1)?**
Jab canSplit(mid) = TRUE → mid valid answer HO SAKTA HAI.
mid-1 kiya toh woh valid answer miss ho jayega.
mid ko candidate rakhte hain, aur chota dhundhte hain.

---

## STEP 8: Yeh Teen Problems Ek Hi Hain

```
Book Allocation → Painter Partition → Split Array
       ↓                  ↓                ↓
   Same code!         Same code!       Same code!
```

Jab bhi dekho:
- "Contiguous assign karo"
- "Minimize max karo"
- "k groups mein split karo"

→ Yeh teen mein se ek hai. SAME algorithm lagao!

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
1. left = max(nums), right = sum(nums)

2. while (left < right):
   mid = floor((left + right) / 2)
   canSplit(mid)?
     YES → right = mid     ← valid, try smaller
     NO  → left = mid + 1  ← invalid, need bigger sum

3. canSplit(maxSum):
   subarrays=1, cur=0
   for each num:
     cur + num ≤ maxSum? → cur += num
     else → subarrays++, cur = num
     subarrays > k? → return false
   return true

4. return left

REMEMBER: Same as Book Allocation and Painter Partition!
```
