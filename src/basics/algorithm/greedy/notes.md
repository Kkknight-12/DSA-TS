# Greedy Approach — Complete Notes
# (Binary Search ke saath kyun use hota hai?)

---

## STEP 1: Greedy Kya Hai?

**Greedy = "Abhi jo best lagta hai, woh karo. Baad ki baad mein sochenge."**

Har step pe **locally best** (sabse faydemand) choice lo.
Global optimal ke baare mein sochne ki zaroorat nahi — local choices milake global answer dete hain.

Real life example:
```
Tum ek rickshaw mein ho. Destination tak jaana hai.
Greedy driver: Har mod pe jo road seedhi dikhti hai, woh lo.
               Future mein kya hoga — pata nahi, abhi best choice lo.
```

---

## STEP 2: Binary Search ke saath Greedy Kyun Aata Hai?

Binary search ke problems mein ek helper function hota hai:

```
"Kya X value pe kaam ho sakta hai?"
```

Is helper ke andar greedy hota hai — resources assign karo **jitna zyada current mein fit ho sake.**

**WHY greedy yahan kaam karta hai?**

Kyunki hum **feasibility check** kar rahe hain, optimization nahi.
Hume sirf jaanna hai: "Ho sakta hai ya nahi?"

Greedy optimal assignment guarantee karta hai kyunki:
- Pehle group/person/part ko jitna zyada do → baaki ke liye load kam hoga
- Isse minimum groups use honge
- Minimum groups use honge → feasibility check correct hoga

---

## STEP 3: Binary Search mein Greedy ke Examples

Tu yeh sab problems solve kar chuka hai. Ab dekh har mein greedy kaise tha:

---

### Example 1: Book Allocation
**Problem:** m students ko books do (contiguous). Max pages minimize karo.
**Helper:** "Kya maxPages limit pe m students mein distribute ho sakta hai?"

```
Greedy strategy: Current student ko books do jab tak maxPages cross na ho.
                 Cross hone pe → next student.

books=[12,34,67,90], maxPages=113

Student 1:
  book=12:  0+12=12  ≤ 113 → le lo, sum=12
  book=34:  12+34=46 ≤ 113 → le lo, sum=46
  book=67:  46+67=113 ≤ 113 → le lo, sum=113
  book=90:  113+90=203 > 113 → CROSS! Next student.

Student 2:
  book=90:  0+90=90 ≤ 113 → le lo, sum=90

Students used = 2 ≤ m=2 → TRUE ✓
```

**WHY greedy works yahan?**
Student 1 ko jitna zyada diya → student 2 ka load kam.
Isse minimum students use honge → correct feasibility check.

---

### Example 2: Painter Partition
**Problem:** k painters ko boards do (contiguous). Max time minimize karo.
**Helper:** "Kya maxTime limit pe k painters se ho sakta hai?"

```
Greedy strategy: Current painter ko boards do jab tak maxTime cross na ho.
                 Cross hone pe → next painter.

boards=[10,20,30,40], maxTime=60

Painter 1:
  board=10: 0+10=10  ≤ 60 → le lo
  board=20: 10+20=30 ≤ 60 → le lo
  board=30: 30+30=60 ≤ 60 → le lo
  board=40: 60+40=100 > 60 → CROSS! Next painter.

Painter 2:
  board=40: 0+40=40 ≤ 60 → le lo

Painters used = 2 ≤ k=2 → TRUE ✓
```

Same logic, same greedy — sirf "student → painter" aur "pages → time" alag hai.

---

### Example 3: Koko Eating Bananas
**Problem:** Koko speed=s pe kya h hours mein sab piles kha sakti hai?
**Helper:** "Kya speed s pe total hours ≤ h hoga?"

```
Greedy strategy: Har pile ke liye ceil(pile/speed) hours lo.
                 Yeh locally optimal hai — ek pile ek baar mein process karo.

piles=[3,6,7,11], speed=4, h=8

pile=3:  ceil(3/4) = 1 hour
pile=6:  ceil(6/4) = 2 hours
pile=7:  ceil(7/4) = 2 hours
pile=11: ceil(11/4) = 3 hours

Total = 1+2+2+3 = 8 ≤ h=8 → TRUE ✓
```

**Greedy decision:** Har pile independently process karo, best time nikalo.
No backtracking needed — har pile ka answer fixed hai.

---

### Example 4: Min Days to Make Bouquets
**Problem:** k consecutive flowers chahiye ek bouquet ke liye. m bouquets banana hai.
**Helper:** "Kya day=d pe m bouquets ban sakte hain?"

```
Greedy strategy: Consecutive bloomed flowers count karo.
                 Count = k? → ek bouquet ready, reset counter.
                 Bloom nahi hua? → chain break, counter reset.

bloomDay=[1,10,3,10,2], day=3, m=2, k=2

day=3: bloomed? 1≤3✓, 10≤3✗, 3≤3✓, 10≤3✗, 2≤3✓

idx: 0  1  2  3  4
     ✓  ✗  ✓  ✗  ✓

consecutive count:
  idx=0: count=1
  idx=1: ✗ → count=0 (reset)
  idx=2: count=1
  idx=3: ✗ → count=0 (reset)
  idx=4: count=1

bouquets = 0 (koi bhi count=2 nahi hua) < m=2 → FALSE ✗
```

**Greedy decision:** Jaise hi k consecutive milte hain, turant ek bouquet lo aur reset karo.
Wait mat karo — greedy pickup optimal hai.

---

### Example 5: Minimize Max Gas Station Distance
**Problem:** k new stations daao. Max distance minimize karo.
**Helper:** "Kya maxDist D rakhte hue k stations se ho sakta hai?"

```
Greedy strategy: Har gap ke liye independently stations calculate karo.
                 ceil(gap/D) - 1 stations needed.

stations=[1,7], k=2, D=2

gap = 7-1 = 6
stations needed = ceil(6/2) - 1 = 3 - 1 = 2

total needed = 2 ≤ k=2 → TRUE ✓
```

**Greedy decision:** Har gap mein optimally stations daao (equal spacing).
Ek gap ke stations doosre gap ko affect nahi karte → greedy safe hai.

---

## STEP 4: Greedy Kab Kaam Karta Hai?

Greedy tab kaam karta hai jab:

```
✅ Local optimal choice → Global optimal result
✅ Choices independent hain (ek ka doosre pe side effect nahi)
✅ "Greedy stays ahead" — greedy choice future options ko close nahi karta
```

Binary search helpers mein greedy isliye kaam karta hai:
```
Hum FEASIBILITY check kar rahe hain.
"Maximum lelo abhi" → minimum resources use honge → correct count milega.
```

---

## STEP 5: Greedy Kab Kaam NAHI Karta?

```
❌ Coin change (arbitrary denominations): [1, 3, 4], amount=6
   Greedy: 4+1+1 = 3 coins
   Optimal: 3+3   = 2 coins ← greedy fails!

❌ 0/1 Knapsack: items lete waqt greedy (highest value/weight ratio pehle)
   kaam nahi karta → DP chahiye
```

Rule: Jab future choices current choice pe depend karti hain → greedy unsafe.
      Jab choices independent hain → greedy safe.

---

## STEP 6: Binary Search + Greedy Pattern — Summary

Tune yeh pattern bar bar dekha hai:

```
Binary Search loop:
  mid = (left + right) / 2
  helperFunction(mid)?    ← GREEDY check
    YES → go left (try smaller)
    NO  → go right (need bigger)

helperFunction(limit):
  count = 1 (ya 0)
  current = 0
  for each element:
    current + element ≤ limit?
      YES → current += element   ← greedy: jitna fit ho, lo
      NO  → count++, current = element  ← next group
    count > k? → return false
  return true
```

**Yeh ek complete algorithm pattern hai:**
- Binary search → "kaun si value answer hai?" dhundhta hai
- Greedy helper → "yeh value kaam karti hai?" check karta hai

---

## Quick Reference

```
GREEDY = Har step pe locally best choice lo

Binary Search + Greedy pattern:
  Binary search → search space pe iterate karo
  Greedy helper → feasibility check karo
                  "Jitna current mein fit ho, lo. Nahi fit → next group."

Problems tune solve kiye:
  Book Allocation   → isPossible(maxPages)  — students greedily fill
  Painter Partition → canPaint(maxTime)     — painters greedily fill
  Split Array       → canSplit(maxSum)      — subarrays greedily fill
  Koko Bananas      → canFinish(speed)      — ceil formula per pile
  Min Days Bouquets → canMakeBouquets(day)  — consecutive count + reset
  Gas Station       → canPlace(maxDist)     — ceil formula per gap

Sab ek hi greedy idea: "abhi jitna best fit karo, karo."
```
