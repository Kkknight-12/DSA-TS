# Painter's Partition — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

n boards hain, har board ko paint karne mein board[i] units time lagte hain.
k painters hain — sab **PARALLEL** kaam karte hain.

**2 Rules:**
1. Har painter sirf **CONTIGUOUS** (side-by-side) boards paint kar sakta hai
2. Minimize karo: **maximum time jo kisi ek painter ko lagega**

```
boards = [10, 20, 30, 40],  k = 2

Option A: Painter1 = [10, 20, 30] → 60 units
          Painter2 = [40]         → 40 units
          Max time = 60  ← ye minimum possible hai!

Option B: Painter1 = [10, 20]    → 30 units
          Painter2 = [30, 40]    → 70 units
          Max time = 70  ← worse!

Answer = 60
```

**WHY parallel?** Dono painters saath kaam karte hain, toh total time = max time of any painter, sum nahi!

---

## STEP 2: Yeh Book Allocation Jaisi Hai!

Yeh baat samajhna bahut zaroori hai:

```
Book Allocation:
  Students ko books do (contiguous)
  Minimize: max PAGES kisi ek student ke paas

Painter Partition:
  Painters ko boards do (contiguous)
  Minimize: max TIME kisi ek painter ko lagega
```

**Algorithm EXACTLY same hai!** Sirf names alag hain:

| Book Allocation | Painter Partition |
|-----------------|-------------------|
| books/pages | boards/lengths |
| students (m) | painters (k) |
| max pages | max time |
| isPossible() | canPaint() |

Agar book allocation samajh aa gayi → yeh bhi samajh aa gayi!

---

## STEP 3: Brute Force Kyun Slow Hai

Linear scan: har possible "max time" try karo.

```
left  = max(boards) = 40  → minimum possible time
right = sum(boards) = 100 → maximum possible time

Try time=40, 41, 42, ... 60 → return 60
```

**Problem:** Agar boards mein values 10^9 hain → 10^9 iterations → bahut slow!

---

## STEP 4: Key Insight — Monotonic Property

Simulate karte hain: agar max allowed time = T ho toh kya k painters se ho sakta hai?

```
T=40: Painter1=[10,20] → 30 ≤ 40 ✓, [30] → 60>40 → Painter2=[30] → 30 ≤ 40, [40]→70>40 → Painter3 → 3>2 ✗
T=55: Painter1=[10,20,30]=60>55 → [10,20]=30, Painter2=[30,40]=70>55 → Painter3 → 3>2 ✗
T=60: Painter1=[10,20,30]=60 ≤ 60, Painter2=[40]=40 ≤ 60 → 2 painters ✓
T=70: Painter1=[10,20,30]=60 ≤ 70, Painter2=[40]=40 ≤ 70 → 2 painters ✓
```

Pattern dikhta hai:
```
T:     40   50   60   70   80  ...  100
valid:  ✗    ✗    ✓    ✓    ✓  ...   ✓
```

`[✗, ✗, ✗, ..., ✓, ✓, ✓]` → **first ✓ dhundho** = Binary Search!

Zyada time → ek painter zyada boards le sakta hai → kam painters chahiye → easier ✓
Kam time  → ek painter kam boards le sakta hai  → zyada painters chahiye → harder ✗

---

## STEP 5: Search Space — left aur right kyun?

```
left  = max(boards)
right = sum(boards)
```

**WHY left = max(boards)?**
Simulate karo: boards=[10,20,30,40], max=40.

Agar T=39:
```
board=40 aaya → 40 > 39 → koi bhi painter isko paint nahi kar sakta!
```
Toh T < max(boards) kabhi possible hi nahi. Isliye left = max(boards).

**WHY right = sum(boards)?**
Agar k=1 → ek painter sab boards le lega → time = sum(boards).
Yeh worst case hai. Answer sum se zyada kabhi nahi hoga.

---

## STEP 6: canPaint Helper — Greedy Simulation

**Sawaal:** "Kya T time mein k painters se saare boards paint ho sakte hain?"

Greedy approach — current painter ko boards do jab tak T cross na ho:

```
boards=[10,20,30,40], T=60, k=2

Painter 1 shuru:
  board=10: 0+10=10 ≤ 60 → le lo, work=10
  board=20: 10+20=30 ≤ 60 → le lo, work=30
  board=30: 30+30=60 ≤ 60 → le lo, work=60
  board=40: 60+40=100 > 60 → T cross! Next painter.

Painter 2:
  board=40: 0+40=40 ≤ 60 → le lo, work=40

Total painters used = 2 ≤ k=2 → TRUE ✓
```

**WHY greedy works?**
Pehle painter ko jitna zyada de sako do — isse baaki painters ka load kam hoga.
Greedy always optimal hai yahan kyunki boards contiguous hain.

---

## FULL DRY RUN — boards=[10,20,30,40], k=2

```
left=40, right=100
```

| Iter | left | right | mid | canPaint? | Action |
|------|------|-------|-----|-----------|--------|
| 1 | 40 | 100 | 70 | [10,20,30]=60 \| [40]=40 → 2 ≤ 2 ✓ | right=70 |
| 2 | 40 | 70 | 55 | [10,20]=30, [30,40]=70>55 → 3>2 ✗ | left=56 |
| 3 | 56 | 70 | 63 | [10,20,30]=60 \| [40]=40 → 2 ≤ 2 ✓ | right=63 |
| 4 | 56 | 63 | 59 | [10,20]=30, [30,40]=70>59 → 3>2 ✗ | left=60 |
| 5 | 60 | 63 | 61 | [10,20,30]=60 \| [40]=40 → 2 ≤ 2 ✓ | right=61 |
| 6 | 60 | 61 | 60 | [10,20,30]=60 \| [40]=40 → 2 ≤ 2 ✓ | right=60 |

left=60 === right=60 → return 60 ✅

```
Search space:
[40 ──────────── 100]
[40 ───── 70]           T=70 valid, go left
[56 ───── 70]           T=55 invalid, go right
[56 ── 63]              T=63 valid, go left
[60 ── 63]              T=59 invalid, go right
[60 ─ 61]               T=61 valid, go left
[60 == 60] → answer!    T=60 valid → done
```

**Final answer:**
```
Painter 1: [10, 20, 30] = 60 units
Painter 2: [40]         = 40 units
           Both work in PARALLEL
           Total time   = max(60, 40) = 60 ✅
```

---

## STEP 7: WHY Pattern 2 (left < right)?

Yeh MINIMIZE problem hai → Pattern 2 use hota hai:
```
while (left < right):
  mid = floor((left + right) / 2)
  canPaint(mid)? → right = mid      ← valid hai, chota try karo
  else           → left = mid + 1   ← invalid, bada chahiye
return left
```

**WHY right = mid (not mid-1)?**
Jab canPaint(mid) = TRUE → mid valid answer HO SAKTA HAI.
mid-1 kiya toh woh valid answer miss ho jayega.
mid ko candidate rakhte hain, aur chota dhundhte hain.

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
1. left = max(boards), right = sum(boards)

2. while (left < right):
   mid = floor((left + right) / 2)
   canPaint(mid)?
     YES → right = mid     ← valid, try smaller
     NO  → left = mid + 1  ← invalid, need more time

3. canPaint(maxTime):
   painters=1, work=0
   for each board:
     work + board ≤ maxTime? → work += board
     else → painters++, work = board
     painters > k? → return false
   return true

4. return left

REMEMBER: Same as Book Allocation!
```
