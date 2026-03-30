# Koko Eating Bananas — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Koko ek monkey hai. Uske paas n piles of bananas hain. Guards h hours mein 
wapas aayenge.

```
piles = [3, 6, 7, 11]
Index:    0  1  2   3
h = 8 hours
```

**Koko kaise khaati hai?**

- Har ghante mein ek pile se zyada se zyada **k bananas** kha sakti hai
- Agar pile mein k se **kam** bananas hain → poori pile kha leti hai aur us ghante **RUK JAATI HAI**
  (bacha hua time next pile ke liye use NAHI hota!)
- Agle ghante mein next pile

```
Example: pile=7, speed=4

Hour 1: [🍌🍌🍌🍌] khaye, 3 bache
Hour 2: [🍌🍌🍌] khaye, pile khatam — remaining time WASTED

Total = 2 hours = ceil(7/4) = ceil(1.75) = 2
```

**Goal:** Minimum speed k nikalo jisme h ghanton mein saari bananas kha sake.

---

## STEP 2: Hours Formula — ceil(pile/speed)

Yeh samajhna bahut important hai.

```
pile=11, speed=4:
  11 / 4 = 2.75
  ceil(2.75) = 3 hours

WHY ceil?
  Hour 1: 4 khaaye, 7 bacha
  Hour 2: 4 khaaye, 3 bacha
  Hour 3: 3 khaaye, DONE (partial hour still counts as full hour)
  Total = 3 = ceil(11/4) ✓
```

**Total hours at speed k = sum of ceil(pile/k) for every pile**

```
piles=[3,6,7,11], speed=4:
  ceil(3/4)  = ceil(0.75) = 1
  ceil(6/4)  = ceil(1.5)  = 2
  ceil(7/4)  = ceil(1.75) = 2
  ceil(11/4) = ceil(2.75) = 3
  Total = 1+2+2+3 = 8 hours ≤ h=8 ✓ → speed 4 works!
```

---

## STEP 3: Brute Force — Kyun Slow Hai

Linear scan: speed 1 se max(piles) tak har speed check karo.

```
speed=1: total=27 > 8 ✗
speed=2: total=15 > 8 ✗
speed=3: total=10 > 8 ✗
speed=4: total=8  ≤ 8 ✓ → return 4
```

**Problem:** Agar piles=[10^9], toh 10^9 iterations → bahut slow!

---

## STEP 4: Key Insight — Monotonic Property

**Observation:** Speed badhao → total hours kam honge → easier to finish.

```
speed:    1   2   3   4   5   6  ... 11
hours:   27  15  10   8   7   6  ...  4

valid?    ✗   ✗   ✗   ✓   ✓   ✓  ...  ✓
```

Pattern: [✗, ✗, ✗, ✓, ✓, ✓, ✓, ✓]
                     ↑
              first ✓ = ANSWER (minimum valid speed)

**Yeh MONOTONIC hai → Binary Search use karo!**

Brute force: O(maxPile × n) — 10^9 × n iterations for large piles!
Optimal:     O(log(maxPile) × n) — sirf ~30 iterations!

---

## STEP 5: Search Space — Left aur Right Kyun?

```
left  = 1
right = max(piles)
```

**WHY left = 1?**
Speed 0 possible nahi (kuch toh khaana padega). Minimum meaningful speed = 1.

**WHY right = max(piles)?**
Is speed pe har pile maximum 1 ghante mein khatam hoti hai.
Total hours = n (number of piles) ≤ h (guaranteed by problem constraints).
Is se zyada speed ki zaroorat hi nahi — faster speed sirf wasted hours badhayegi.

---

## STEP 6: Binary Search — Correct Speed Dhundho

Normal BS mein hum array element dhundh te hain.
Yahan hum **correct speed** dhundh rahe hain — wahi role hai mid ka.

```
left=1, right=11 (for piles=[3,6,7,11], h=8)

mid = (1+11)/2 = 6
canFinish(speed=6)?
  1+1+2+2 = 6 ≤ 8 → TRUE
  → valid hai, chota try karo → result=6, right=5

mid = (1+5)/2 = 3
canFinish(speed=3)?
  1+2+3+4 = 10 > 8 → FALSE
  → bahut slow, speed badhao → left=4

mid = (4+5)/2 = 4
canFinish(speed=4)?
  1+2+2+3 = 8 ≤ 8 → TRUE
  → valid, chota try karo → result=4, right=3

left=4 > right=3 → EXIT
return 4 ✅
```

**Adjustment logic:**

| canFinish(mid) | Matlab | Action |
|----------------|--------|--------|
| TRUE | Is speed pe ho sakta hai, chota try karo | result=mid, right=mid-1 |
| FALSE | Bahut slow, speed badhani padegi | left=mid+1 |

---

## STEP 7: Hour-by-Hour Verification (speed=4)

```
piles = [3, 6, 7, 11], speed=4

Hour 1: Pile[0](3)  → eat 3 → DONE       ← ceil(3/4)=1 hour
Hour 2: Pile[1](6)  → eat 4, 2 left
Hour 3: Pile[1](2)  → eat 2 → DONE       ← ceil(6/4)=2 hours
Hour 4: Pile[2](7)  → eat 4, 3 left
Hour 5: Pile[2](3)  → eat 3 → DONE       ← ceil(7/4)=2 hours
Hour 6: Pile[3](11) → eat 4, 7 left
Hour 7: Pile[3](7)  → eat 4, 3 left
Hour 8: Pile[3](3)  → eat 3 → DONE       ← ceil(11/4)=3 hours

Total = 1+2+2+3 = 8 hours = h ✅ (exactly fits!)
```

---

## FULL DRY RUN — Search Space Narrowing

```
piles=[3,6,7,11], h=8
left=1, right=11, result=11

[1 ─────────────── 11]
   mid=6, total=6 ≤ 8 ✓ → result=6, right=5

[1 ───── 5]
   mid=3, total=10 > 8 ✗ → left=4

[4 ── 5]
   mid=4, total=8 ≤ 8 ✓ → result=4, right=3

left=4 > right=3 → EXIT → return 4 ✅
```

---

## Common Confusion — WHY right = max(piles) not sum(piles)?

```
Galat soch: "Sum tak toh speed ho sakti hai"
Sahi soch:  Speed se zyada se zyada 1 pile 1 ghante mein khatam hoti hai.
            max(piles) speed pe har pile = 1 ghanta → total = n ghante.
            n ≤ h hamesha (problem constraint).
            Is se zyada speed useless hai — n ghante se kam nahi ho sakta
            (n piles hain, minimum n ghante toh lagenge).
```

---

## Brute Force vs Optimal

| | Brute Force | Optimal |
|--|-------------|---------|
| Time | O(maxPile × n) | O(n × log(maxPile)) |
| Space | O(1) | O(1) |
| For maxPile=10^9, n=10^4 | 10^13 ops 🐢 | 30 × 10^4 = 3×10^5 ops ⚡ |

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
1. left=1, right=max(piles), result=right

2. Binary search:
   mid = (left+right)/2
   canFinish(mid)?
     YES → result=mid, right=mid-1  ← try smaller speed
     NO  → left=mid+1               ← need more speed

3. canFinish(speed, h):
   total = sum of ceil(pile/speed) for each pile
   return total ≤ h

4. return result
```

**KEY FORMULA:** `hours for one pile = ceil(pile / speed) = Math.ceil(pile / speed)`