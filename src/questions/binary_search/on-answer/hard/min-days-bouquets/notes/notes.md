# Minimum Days to Make M Bouquets — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek garden hai jisme n flowers hain. Har flower ek specific din bloom karta hai.

```
bloomDay = [1, 10, 3, 10, 2]
Index:       0   1  2   3  4

Flower 0 → day 1 pe bloom karega
Flower 1 → day 10 pe bloom karega
Flower 2 → day 3 pe bloom karega
Flower 3 → day 10 pe bloom karega
Flower 4 → day 2 pe bloom karega
```

**Tumhe kya karna hai?**

m bouquets banana hai. Har bouquet ke liye **k ADJACENT (side-by-side) bloomed flowers** chahiye.

Adjacent ka matlab: agar k=2 hai toh flower[0]+flower[1] adjacent hain,
ya flower[1]+flower[2] adjacent hain — lekin flower[0]+flower[2] adjacent NAHI hain (flower[1] beech mein hai).

**Question: Minimum kitne din wait karo?**

```
Example: bloomDay=[1,10,3,10,2], m=3, k=1
→ Need 3 bouquets, each needs 1 flower

Day 1: [✓, ✗, ✗, ✗, ✗] → 1 bouquet → NOT ENOUGH
Day 2: [✓, ✗, ✗, ✗, ✓] → 2 bouquets → NOT ENOUGH
Day 3: [✓, ✗, ✓, ✗, ✓] → 3 bouquets → YES! Answer = 3
```

---

## STEP 2: Brute Force Kyun Slow Hai

Linear scan: minDay se maxDay tak har din check karo.

```
minDay = min(bloomDay) = 1
maxDay = max(bloomDay) = 10

Try day 1 → check → fail
Try day 2 → check → fail
Try day 3 → check → success → return 3
```

**Problem:** Agar bloomDay = [1, 1000000000] toh 10^9 iterations!
Way too slow for large inputs.

---

## STEP 3: Key Insight — Monotonic Property

**Observation:** Zyada din wait karo → zyada flowers bloom honge → easier to make bouquets.

```
Day 1:  [✓, ✗, ✗, ✗, ✗]  → 1 bouquet  ✗
Day 2:  [✓, ✗, ✗, ✗, ✓]  → 2 bouquets ✗
Day 3:  [✓, ✗, ✓, ✗, ✓]  → 3 bouquets ✓
Day 5:  [✓, ✗, ✓, ✗, ✓]  → 3 bouquets ✓
Day 10: [✓, ✓, ✓, ✓, ✓]  → 5 bouquets ✓
```

Pattern: [✗, ✗, ✓, ✓, ✓, ✓, ✓]
          1   2   3   4   5 ... 10

Ek baar ✓ aaya toh aage hamesha ✓ rahega — yeh MONOTONIC hai!

**Iska matlab: Binary Search use kar sakte hain!**

Hum target dhundh rahe hain: pehla din jahan ✓ aaye.

---

## STEP 4: Search Space — Left aur Right Kyun?

```
left  = min(bloomDay)
right = max(bloomDay)
```

**WHY left = min(bloomDay)?**
Is din se pehle koi bhi flower bloom nahi karta. Toh is se pehle koi bouquet banana impossible hai. Answer is se pehle ho hi nahi sakta.

**WHY right = max(bloomDay)?**
Is din tak saari flowers bloom kar chuki hain. Agar m*k ≤ n hai (edge case check pass hua), toh is din tak answer guaranteed milega.

---

## STEP 5: canMakeBouquets Helper — Greedy Logic

Yeh function batata hai: "Day D tak, kya m bouquets ban sakte hain?"

```
bloomDay = [1, 10, 3, 10, 2],  day=3,  k=1

Traverse left to right:
   Flower 0: bloom=1 ≤ 3 ✓ → consecutive count=1 = k=1 → BOUQUET! count=0
   Flower 1: bloom=10 > 3 ✗ → chain breaks → count=0
   Flower 2: bloom=3 ≤ 3 ✓ → count=1=k → BOUQUET! count=0
   Flower 3: bloom=10 > 3 ✗ → chain breaks → count=0
   Flower 4: bloom=2 ≤ 3 ✓ → count=1=k → BOUQUET! count=0

Total bouquets = 3 = m ✅ → return true
```

**WHY greedy works?**

Flowers sirf left-to-right hi use ho sakte hain (adjacent constraint).
Agar hum koi chain greedily complete karte hain (jaise hi k consecutive milte hain), toh hum optimal use kar rahe hain — is se better koi arrangement nahi hogi.

**Key rules:**
- Bloom nahi hui flower → chain TOOT gayi → count = 0 (reset)
- count = k → ek bouquet ready → count = 0 (start fresh for next bouquet)

---

## STEP 6: Binary Search — Kaise Kaam Karta Hai

Yeh normal binary search hai — sirf hum kisi array element ko nahi, **correct day** ko dhundh rahe hain.

```
left=1, right=10

mid = (1+10)/2 = 5
canMakeBouquets(5)? → TRUE
→ 5 valid hai, lekin chota ho sakta hai → result=5, right=4

mid = (1+4)/2 = 2
canMakeBouquets(2)? → FALSE
→ 2 pe nahi hota, zyada din chahiye → left=3

mid = (3+4)/2 = 3
canMakeBouquets(3)? → TRUE
→ 3 valid hai, chota try karo → result=3, right=2

left=3 > right=2 → EXIT
return result=3 ✅
```

**Adjustment logic:**

| canMakeBouquets(mid) | Matlab | Action |
|----------------------|--------|--------|
| TRUE | mid pe ho sakta hai, chota try karo | result=mid, right=mid-1 |
| FALSE | mid pe nahi hota, zyada din chahiye | left=mid+1 |

---

## STEP 7: Edge Case — m*k > n

```
if (m * k > n) return -1
```

**WHY?**

Har bouquet ko k flowers chahiye. m bouquets ke liye total m*k flowers chahiye.
Agar garden mein n flowers hain aur m*k > n → physically possible hi nahi!

Yeh check **pehle** karo — binary search se pehle — otherwise wrong answer aayega.

---

## FULL DRY RUN

```
bloomDay = [1, 10, 3, 10, 2],  m=3,  k=1

STEP 1: Edge check: 3*1=3 ≤ 5 ✓
STEP 2: left=1, right=10, result=-1
```

### Binary Search:

```
Iteration 1: left=1, right=10, mid=5
   Bloomed by day 5: [1✓, 10✗, 3✓, 10✗, 2✓]
   Scan: bouquet at [0], bouquet at [2], bouquet at [4] → 3 bouquets = m ✓
   → result=5, right=4

Iteration 2: left=1, right=4, mid=2
   Bloomed by day 2: [1✓, 10✗, 3✗, 10✗, 2✓]
   Scan: bouquet at [0], bouquet at [4] → 2 bouquets < 3 ✗
   → left=3

Iteration 3: left=3, right=4, mid=3
   Bloomed by day 3: [1✓, 10✗, 3✓, 10✗, 2✓]
   Scan: bouquet at [0], bouquet at [2], bouquet at [4] → 3 bouquets = m ✓
   → result=3, right=2

left=3 > right=2 → EXIT
return 3 ✅
```

Search space narrowing:
```
[1 ─────────────── 10]
[1 ──── 4]              day 5 valid, go left
[3 ──── 4]              day 2 invalid, go right
[3 === 3] → result=3    day 3 valid, go left → done!
```

---

## ADJACENT FLOWERS EXAMPLE (k=2)

```
bloomDay = [7,7,7,7,12,7,7],  m=2,  k=2

Day 7: [7✓, 7✓, 7✓, 7✓, 12✗, 7✓, 7✓]
   i=0: count=1
   i=1: count=2=k → BOUQUET! count=0
   i=2: count=1
   i=3: count=2=k → BOUQUET! bouquets=2=m → return true ✓
   → result=7

Day 6: No flower blooms (all bloom on day 7+)
   → 0 bouquets → false → left=7

left=7 > right=6 → EXIT
return 7 ✅
```

---

## Brute Force vs Optimal Comparison

```
Input: bloomDay=[1..10^9], m, k

Brute Force: Try every day → 10^9 iterations × n = too slow!
Optimal:     Binary search → log(10^9) ≈ 30 iterations × n = fast!
```

| | Brute Force | Optimal |
|--|-------------|---------|
| Time | O((max-min) × n) | O(n × log(max-min)) |
| Space | O(1) | O(1) |
| When to use | Small range of days | Always preferred |

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
1. if (m*k > n) return -1           ← impossible check

2. left = min(bloomDay)             ← earliest possible answer
   right = max(bloomDay)            ← latest possible answer

3. Binary search:
   mid = (left+right)/2
   canMakeBouquets(mid)?
     YES → result=mid, right=mid-1  ← try smaller
     NO  → left=mid+1               ← need more days

4. canMakeBouquets(day):
   count=0, bouquets=0
   for each flower:
     bloom ≤ day → count++
       count==k  → bouquets++, count=0
     bloom > day → count=0          ← chain breaks!
   return bouquets >= m

5. return result
```
