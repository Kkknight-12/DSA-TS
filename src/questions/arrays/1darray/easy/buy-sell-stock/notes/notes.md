# Best Time to Buy and Sell Stock — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Har day ka stock price diya hai.
Sirf ek baar buy aur ek baar sell kar sakte hain.
Buy pehle hoga, sell baad me hoga.

Hume maximum possible profit nikaalna hai.

Examples:

```txt
prices = [7, 1, 5, 3, 6, 4]
answer = 5

Buy at 1
Sell at 6
Profit = 6 - 1 = 5
```

```txt
prices = [7, 6, 4, 3, 1]
answer = 0
```

Dhyan do:

- buy aur sell same day pe useful nahi hai
- sell hamesha buy ke baad hi hoga
- loss ko profit nahi maante, isliye minimum answer `0` ho sakta hai

---

## STEP 2: Brute Force Kyun Slow Hai

Sabse seedha idea:

- har day ko buy day maan lo
- uske baad ke sab days ko sell day maan lo
- har pair ka profit nikalo
- maximum le lo

Example:

```txt
prices = [7, 1, 5, 3]

buy at 7 -> sell at 1, 5, 3
buy at 1 -> sell at 5, 3
buy at 5 -> sell at 3
```

Yeh `O(n^2)` hai, kyunki har day ke liye baaki saare future days check kar rahe ho.

Lekin actually har day pe hume sirf ek hi baat chahiye:

```txt
aaj se pehle sabse sasta buy day kaunsa tha?
```

---

## STEP 3: Key Insight — Sell Aaj Karo, Buy Best Past Day Se

Pehle formula mat socho.
Pehle ek concrete example simulate karo.

```txt
prices = [7, 1, 5, 3, 6, 4]
```

Day by day socho:

### Day 0: price = 7

Abhi buy hi kar sakte ho.
Sell ka future nahi dekha.

### Day 1: price = 1

Ab tak ka cheapest price:

```txt
minPrice = 1
```

### Day 2: price = 5

Agar aaj sell karein, best buy kaunsa hoga?

```txt
past minimum = 1
profit = 5 - 1 = 4
```

### Day 4: price = 6

Again agar aaj sell karein:

```txt
past minimum = 1
profit = 6 - 1 = 5
```

Soch:

Har day pe hume bas 2 cheezein maintain karni hain:

- ab tak ka minimum buy price
- ab tak ka best profit

Yahi optimal ka core idea hai.

---

## STEP 4: Why This Technique Work Karti Hai

Question:

Koi bhi fixed sell day lo.
Us sell day ke liye best buy kaunsi hogi?

Answer:

```txt
us sell day se pehle jo minimum price aayi ho
```

Kyun?

Profit formula:

```txt
profit = sellPrice - buyPrice
```

Sell fixed hai, toh profit tab maximum hoga jab buyPrice minimum hogi.

Isliye:

- hume har future sell day ke liye poora past revisit nahi karna
- bas ek running minimum maintain karna hai

Yeh hi brute force ko one-pass solution me convert karta hai.

---

## STEP 5: Variables Samjho

```txt
minPrice   -> ab tak ka sabse chhota price
bestProfit -> ab tak ka maximum profit
currentProfit -> agar aaj sell karein toh profit
```

Example:

```txt
prices = [7, 1, 5]
```

Start:

```txt
minPrice = 7
bestProfit = 0
```

Day 1 pe:

```txt
price = 1
currentProfit = 1 - 7 = -6
bestProfit = 0
minPrice = 1
```

Day 2 pe:

```txt
price = 5
currentProfit = 5 - 1 = 4
bestProfit = 4
```

---

## STEP 6: Mental Model — Running Minimum + Running Best Answer

Yeh problem ko aise yaad rakho:

```txt
Main har day ko potential sell day maan raha hoon.
```

Aur har sell day ke liye pooch raha hoon:

```txt
agar aaj sell karun, toh mujhe sabse sasta buy day past me kaunsa mila tha?
```

Toh complete mental model:

```txt
1. past ka minimum price track karo
2. aaj us minimum pe buy karke sell profit nikalo
3. best profit update karo
```

Yehi reason hai ki loop me:

- current profit nikalte hain
- best profit update karte hain
- phir future ke liye minimum price update karte hain

---

## STEP 7: Boundary / Edge Cases

**Case 1: Single day**

```txt
[5]
```

Buy aur sell dono possible nahi.
Answer `0`.

**Case 2: Strictly decreasing**

```txt
[7, 6, 4, 3, 1]
```

Har possible sell loss hi dega.
Answer `0`.

**Case 3: Strictly increasing**

```txt
[1, 2, 3, 4, 5]
```

Best buy first day, best sell last day.
Answer `4`.

**Case 4: New lower price beech me aaye**

```txt
[5, 4, 10]
```

Pehle `5` min tha.
Phir `4` aur better buy ban gaya.

---

## STEP 8: Conditions Ka Meaning

Is solution me 2 main updates hoti hain:

### Condition 1: Current profit better hai?

```txt
currentProfit = currentPrice - minPrice
```

Agar yeh pehle wale best se zyada hai:

```txt
bestProfit = max(bestProfit, currentProfit)
```

Meaning:

- aaj sell karna ab tak ka best deal hai

### Condition 2: Kya naya minimum mila?

```txt
minPrice = min(minPrice, currentPrice)
```

Meaning:

- future ke liye aur better buy day mil gaya

Dhyan do:

`bestProfit` aur `minPrice` dono alag roles play kar rahe hain:

- `minPrice` future ko better banata hai
- `bestProfit` past ka best answer store karta hai

---

## STEP 9: Adjustment Logic

Har day pe actual kaam kya ho raha hai?

### Step A: Aaj sell karne ka profit nikaalo

```txt
currentProfit = currentPrice - minPrice
```

Yeh pooch raha hai:

```txt
agar cheapest past day pe buy kiya hota,
aur aaj sell karte,
toh profit kitna hota?
```

### Step B: Best answer update karo

```txt
bestProfit = max(bestProfit, currentProfit)
```

### Step C: Future ke liye cheaper buy dekh lo

```txt
minPrice = min(minPrice, currentPrice)
```

Important design choice:

Is problem ko suffix maximum se bhi solve kar sakte ho:

- right se left jao
- future ka maximum sell price track karo
- har day pe profit = maxSell - currentPrice

Woh bhi valid hai.
Current version cleaner hai kyunki:

- real-world order follow karta hai
- buy past me, sell present/future me
- easier to visualize

---

## STEP 10: Answer Formula

Yahan final formula koi fixed math expression nahi hai.
Answer ek running maximum hai:

```txt
bestProfit = max(bestProfit, currentPrice - minPrice)
```

Loop end pe:

```txt
return bestProfit
```

Kyun?

Kyunki har day ko ek potential sell day maana gaya.
Aur har day ka best possible buy already `minPrice` me encoded tha.

Toh poori traversal ke baad:

```txt
bestProfit = sabhi valid buy-sell pairs ka maximum profit
```

---

## STEP 11: Full Dry Run

### prices = [7, 1, 5, 3, 6, 4]

```txt
idx:    0  1  2  3  4  5
price:  7  1  5  3  6  4
```

Start:

```txt
minPrice = 7
bestProfit = 0
```

| Day | price | minPrice before | currentProfit = price - minPrice | bestProfit after | minPrice after |
|-----|-------|-----------------|----------------------------------|------------------|----------------|
| 1 | 1 | 7 | -6 | 0 | 1 |
| 2 | 5 | 1 | 4 | 4 | 1 |
| 3 | 3 | 1 | 2 | 4 | 1 |
| 4 | 6 | 1 | 5 | 5 | 1 |
| 5 | 4 | 1 | 3 | 5 | 1 |

Loop end:

```txt
bestProfit = 5
```

Answer = **5 ✅**

---

### prices = [7, 6, 4, 3, 1]

```txt
idx:    0  1  2  3  4
price:  7  6  4  3  1
```

Start:

```txt
minPrice = 7
bestProfit = 0
```

| Day | price | minPrice before | currentProfit = price - minPrice | bestProfit after | minPrice after |
|-----|-------|-----------------|----------------------------------|------------------|----------------|
| 1 | 6 | 7 | -1 | 0 | 6 |
| 2 | 4 | 6 | -2 | 0 | 4 |
| 3 | 3 | 4 | -1 | 0 | 3 |
| 4 | 1 | 3 | -2 | 0 | 1 |

Loop end:

```txt
bestProfit = 0
```

Answer = **0 ✅**

---

## STEP 12: Quick Reference

```txt
CORE IDEA:
  Har day ko potential sell day samjho.

MENTAL MODEL:
  Aaj sell karo.
  Best buy wahi hoga jo ab tak ka minimum price hai.

VARIABLES:
  minPrice   = past ka sabse sasta buy
  bestProfit = ab tak ka best answer

UPDATES:
  currentProfit = currentPrice - minPrice
  bestProfit = max(bestProfit, currentProfit)
  minPrice = min(minPrice, currentPrice)

WHY IT WORKS:
  Fixed sell day ke liye best buy hamesha minimum past price hoti hai.

ALTERNATIVE:
  suffix max sell price wala approach bhi valid hai.
  Current version zyada natural hai.

COMPLEXITY:
  Time:  O(n)
  Space: O(1)
```
