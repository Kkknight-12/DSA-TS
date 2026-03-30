# Minimize Max Distance — Gas Stations — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek road pe n gas stations hain — sorted positions mein diye hain.

```
stations = [1, 7]
Road:  1 ─────────────────────── 7
       Gap = 6
```

Tumhe k **NEW gas stations** add karni hain — kisi bhi position pe (existing stations ke beech mein).

**Goal:** Kisi bhi do consecutive stations ke beech **maximum distance** ko **MINIMIZE** karo.

```
stations=[1,7], k=2

Option A: Add at 3 and 5
  1 ──── 3 ──── 5 ──── 7
  Gaps: [2, 2, 2]  → max = 2 ✓

Option B: Add at 2 and 4
  1 ── 2 ──── 4 ─────── 7
  Gaps: [1, 2, 3] → max = 3 ✗ (worse)

Answer = 2.0 (Option A is optimal)
```

---

## STEP 2: Brute Force — Greedy Station Placement

**Idea:** Ek ek station place karo. Har baar **sabse badi section** mein daalo.

```
stations=[1,2,3,4,5], k=4
Gaps: [1, 1, 1, 1]
howMany = [0, 0, 0, 0]  ← extra stations placed in each gap

Ek section ki current length = gap / (howMany[i] + 1)

Station 1: All sections = 1/(0+1)=1 (equal) → place in section 0
   howMany=[1,0,0,0]  → sections=[0.5, 1, 1, 1]

Station 2: Max=1 at section 1 → place there
   howMany=[1,1,0,0]  → sections=[0.5, 0.5, 1, 1]

Station 3: Max=1 at section 2 → place there
   howMany=[1,1,1,0]  → sections=[0.5, 0.5, 0.5, 1]

Station 4: Max=1 at section 3 → place there
   howMany=[1,1,1,1]  → sections=[0.5, 0.5, 0.5, 0.5]

Max distance = 0.5 ✅
```

**WHY greedy works?**
Sabse badi section ko todna sabse zyada faayda deta hai.
Ek choti section ko todne se max distance kam nahi hoga.

**Problem:** Agar k=10^9 → 10^9 iterations → too slow!

---

## STEP 3: Key Insight — This Answer is a FLOAT!

Pehle yeh samjho: Yeh problem BAAKI problems se alag hai.

| Problem | Answer type | Search on |
|---------|-------------|-----------|
| Book Allocation | Integer (pages) | Integer binary search |
| Koko Eating | Integer (speed) | Integer binary search |
| **Gas Station** | **Float (distance)** | **Floating point binary search** |

Distance 2.5, 0.333..., 1.75 jaise float values ho sakti hain.

---

## STEP 4: Monotonic Property — Binary Search Kyun?

Agar maximum allowed distance = D ho toh:

```
D bada → har gap mein kam stations chahiye → easier → possible
D chota → har gap mein zyada stations chahiye → harder → impossible
```

```
D:    0.5  1.0  1.5  2.0  2.5  3.0 ...
valid:  ✗    ✗    ✗    ✓    ✓    ✓ ...
                       ↑
               minimum valid D = ANSWER
```

Pattern: `[✗, ✗, ✗, ..., ✓, ✓, ✓]` → find first ✓ = Binary Search!

---

## STEP 5: Kitne Stations Chahiye? (Simulation Se Samjho)

**Sawaal:** Gap = 12 hai ([1, 13] ke beech). Agar max allowed distance D = 3 hai, toh kitne stations add karni padenge?

Simulate karte hain — ek ek station try karo:

```
gap = 12,  D = 3 (max allowed section size)

0 stations → 1 section of 12      → 12 > 3 ✗
              |──────── 12 ────────|

1 station  → 2 sections of 6 each → 6 > 3 ✗
              |──── 6 ────|──── 6 ────|
                    *

2 stations → 3 sections of 4 each → 4 > 3 ✗
              |── 4 ──|── 4 ──|── 4 ──|
                   *       *

3 stations → 4 sections of 3 each → 3 = D ✓ WORKS!
              |─ 3 ─|─ 3 ─|─ 3 ─|─ 3 ─|
                  *      *      *
```

**Pattern jo dikha:**

```
stations:  0    1    2    3
sections:  1    2    3    4
size:      12   6    4    3
```

Jab 3 stations daale → 4 sections ban gayi → size = 12/4 = 3 ≤ D ✓

Pattern: `stations + 1 = sections`  →  `sections = stations + 1`

Ab ulta socho — hume sections PEHLE pata hoti hain D se:
```
gap=12, D=3:
  Kitni sections chahiye? → 12/3 = 4 sections
  Kitne stations?         → 4 - 1 = 3 stations
```

**Jab gap evenly divide nahi hota:**

```
gap = 13,  D = 3

13/3 = 4.33... sections → 4.33 sections possible nahi hain!
5 sections try karo → 13/5 = 2.6 ≤ 3 ✓
4 sections try karo → 13/4 = 3.25 > 3 ✗

Toh 5 sections chahiye → 5 - 1 = 4 stations

Shortcut: 4.33 ko upar round karo → ceil(4.33) = 5 sections
```

**Isliye formula bana:**
```
sections needed = ceil(gap / D)
stations needed = sections - 1 = ceil(gap / D) - 1
```

Yeh formula tune khud simulate karke discover kiya — `stations + 1 = sections` wala pattern!

**Cross-check with brute force formula:**
```
Brute force:  section size = gap / (stations + 1)   [stations → size]
Optimal:      stations = ceil(gap / D) - 1           [size → stations]

Same relationship, ek forward ek backward!
Brute: "2 stations daale, size kya hogi?" → 12/3 = 4
Optimal: "size ≤ 3 chahiye, kitne stations?" → ceil(12/3)-1 = 3
```

---

## STEP 6: Search Space — low aur high kyun?

```
low  = 0
high = max gap in original array
```

**WHY low = 0?**
D=0 matlab stations same position pe → impossible. Yeh lower bound hai.
Binary search yahan se shuru karta hai.

**WHY high = max gap?**
Agar hum koi station na daale toh max gap = original max gap.
Answer is se zyada kabhi nahi hoga (hum stations ADD kar rahe hain, gap bada nahi ho sakta).

---

## STEP 7: Floating Point Binary Search — Kaise Kaam Karta Hai

Integer BS mein: `while (low <= high)` — integers compare karte hain.
Float BS mein: `while (high - low > EPSILON)` — precision check karte hain.

```
EPSILON = 1e-6  (0.000001)
```

**WHY EPSILON?**
Float numbers kabhi EXACTLY converge nahi karte (infinite decimals).
Jab tak `high - low` bahut chota na ho jaaye — tab tak chalao.
1e-6 = problem ki required precision.

```
Integer BS mid:
  mid = Math.floor((low + high) / 2)  ← integer

Float BS mid:
  mid = (low + high) / 2              ← float (no floor!)

Adjustment:
  canPlace(mid)? → high = mid    (not mid-1! — float mein mid-1 galat hoga)
  else           → low  = mid    (not mid+1!)
```

---

## FULL DRY RUN — stations=[1,7], k=2

```
Gap = 6, low=0, high=6
Expected: 2.0
```

| Iter | low | high | mid | canPlace(mid)? | Action |
|------|-----|------|-----|----------------|--------|
| 1 | 0 | 6 | 3.0 | ceil(6/3)-1=1 ≤ 2 ✓ | high=3.0 |
| 2 | 0 | 3.0 | 1.5 | ceil(6/1.5)-1=3 > 2 ✗ | low=1.5 |
| 3 | 1.5 | 3.0 | 2.25 | ceil(6/2.25)-1=2 ≤ 2 ✓ | high=2.25 |
| 4 | 1.5 | 2.25 | 1.875 | ceil(6/1.875)-1=3 > 2 ✗ | low=1.875 |
| 5 | 1.875 | 2.25 | 2.0625 | ceil(6/2.0625)-1=2 ≤ 2 ✓ | high=2.0625 |
| ... | ... | ... | ... | ... | → converges to 2.0 |

After ~50 iterations: `high ≈ 2.000000` ✅

**Verification at D=2.0:**
```
stations=[1,7], gap=6
ceil(6/2)-1 = 2 stations placed: at 3 and 5
1 ── 3 ── 5 ── 7  → gaps [2, 2, 2] → max=2.0 ✓
```

---

## STEP 8: Brute Force vs Optimal

| | Brute Force | Optimal |
|--|-------------|---------|
| Time | O(k × n) | O(n × log(maxGap/ε)) |
| Space | O(n) — howMany array | O(1) |
| For k=10^9 | 10^9 × n = too slow! | ~50 × n = fast ✓ |

---

## Common Confusion — Float vs Integer BS

```
Integer BS:
  while (low <= high)
  mid = Math.floor((low+high)/2)
  if valid → result=mid, high=mid-1   ← -1 to avoid infinite loop
  else     → low=mid+1

Float BS:
  while (high-low > EPSILON)
  mid = (low+high)/2                  ← no floor!
  if valid → high=mid                 ← no -1! (float mein -1 se converge nahi hoga)
  else     → low=mid                  ← no +1!
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
1. low=0, high=max(gaps)

2. while (high - low > 1e-6):
   mid = (low + high) / 2
   canPlace(mid)?
     YES → high = mid    ← try smaller distance
     NO  → low  = mid    ← need larger distance

3. canPlace(D):
   total = 0
   for each gap:
     total += Math.ceil(gap / D) - 1
   return total ≤ k

4. return high

KEY FORMULA: stationsNeeded per gap = ceil(gap / D) - 1
```
