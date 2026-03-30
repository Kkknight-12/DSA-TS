# Median of Two Sorted Arrays — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Do sorted arrays diye hain. Dono ko milake jo ek sorted array banta,
uska **median** nikalna hai — bina actually merge kiye.

```
arr1 = [2, 3, 6]
arr2 = [1, 4, 5]

Agar merge karte: [1, 2, 3, 4, 5, 6]
Median = (3 + 4) / 2 = 3.5
```

**Median kya hota hai?**
- Sorted array ko do EQUAL halves mein divide karo
- Left half ke sab elements ≤ Right half ke sab elements
- Odd total: exactly ek middle element = median
- Even total: do middle elements ka average = median

```
[1, 2, 3, 4, 5, 6]
        ↑↑
    ye do middle = 3 aur 4
    median = (3+4)/2 = 3.5
```

---

## STEP 2: Brute Force Kyun Kaam Karta Hai (Par Slow Hai)

Seedha approach: dono arrays ko merge karo, middle element lo.

```
arr1 = [2, 3, 6]   arr2 = [1, 4, 5]
Merge → [1, 2, 3, 4, 5, 6]
Median = 3.5 ✅
```

**Problem:**
- Time: O(m+n) — poori merged array banana padti hai
- Space: O(m+n) — merged array store karni padti hai

**Kya hum BINA MERGE KIYE median nikaal sakte hain? → YES!**

---

## STEP 3: The Key Insight — Median = Perfect Partition

Median ka asli matlab yeh hai:

> Array ko do halves mein divide karo jahan:
> 1. Dono halves mein roughly equal elements hain
> 2. Left half ka max ≤ Right half ka min

Agar yeh partition mil jaaye, toh median automatically pata chal jaata hai!

**Now the big idea:**

Hum yeh partition DONO arrays pe simultaneously dhundh sakte hain.

```
arr1: [  left_part1  |  right_part1  ]
arr2: [  left_part2  |  right_part2  ]
       ↑─────────────↑─────────────↑
          Combined       Combined
          LEFT HALF      RIGHT HALF
```

Agar hum sahi jagah partition karein toh:
- Combined left half = left_part1 + left_part2
- Combined right half = right_part1 + right_part2
- Left ka max ≤ Right ka min → ye hi median dega!

**Yeh approach O(log n) time aur O(1) space mein kaam karta hai!**

---

## STEP 4: leftHalfSize — Left Mein Kitne Elements Chahiye?

Total elements = m + n

```
Total = 6 (even) → Left half = 3, Right half = 3
Total = 9 (odd)  → Left half = 5, Right half = 4  ← odd mein left extra
```

Formula:
```
leftHalfSize = floor((m + n + 1) / 2)
```

**WHY +1?**
- Even: (6+1)/2 = 3.5 → floor = 3 ✓ (correct)
- Odd:  (9+1)/2 = 5   → floor = 5 ✓ (extra element in left — that IS the median!)

Yeh formula even aur odd dono cases handle karta hai automatically.

---

## STEP 5: p1 aur p2 — The Partition Points

```
p1 = arr1 se kitne elements LEFT half mein jaayenge
p2 = arr2 se kitne elements LEFT half mein jaayenge
```

p2 is automatic — agar arr1 se p1 elements liye, baaki left mein arr2 se aayenge:
```
p2 = leftHalfSize - p1
```

**p1 ki possible range: 0 to n1**

```
arr1 = [2, 3, 6]   (n1 = 3)

p1 = 0 → arr1: [     | 2, 3, 6]  ← nothing from arr1 in left
p1 = 1 → arr1: [2    | 3, 6  ]  ← 1 element from arr1 in left
p1 = 2 → arr1: [2, 3 | 6    ]  ← 2 elements from arr1 in left
p1 = 3 → arr1: [2, 3, 6 |   ]  ← everything from arr1 in left
```

Jab p1 bada hota hai → arr1 se zyada elements left mein, arr2 se kam.
Jab p1 chota hota hai → arr1 se kam elements left mein, arr2 se zyada.

---

## STEP 6: p1 IS the Binary Search Mid (MOST IMPORTANT!)

Yahan ka confusion yeh hota hai: "Binary search kahan hai? Kya search kar rahe hain?"

**Normal binary search mein:**
```
low = 0, high = n
mid = (low + high) / 2   ← koi TARGET ELEMENT dhundh rahe hain
agar target mile → return
agar nahi mila → low ya high adjust karo
```

**Yahan ke binary search mein:**
```
low = 0, high = n1
p1 = (low + high) / 2   ← CORRECT PARTITION POINT dhundh rahe hain
agar valid partition mili → return median
agar nahi mili → low ya high adjust karo
```

> **p1 hi mid hai. Hum binary search use karke sahi p1 dhundh rahe hain.**

low aur high p1 ki RANGE define karte hain.
Jab hum low ya high change karte hain → next iteration mein naya p1 milta hai.
Yeh bilkul normal binary search jaisa hai — bas target alag hai.

---

## STEP 7: Boundary Elements — Kya Check Karein?

Partition ke baad 4 important values hain:

```
arr1: [ ... leftMax1 | rightMin1 ... ]
arr2: [ ... leftMax2 | rightMin2 ... ]
```

- `leftMax1`  = arr1 ke left part ka sabse bada element  → `arr1[p1 - 1]`
- `leftMax2`  = arr2 ke left part ka sabse bada element  → `arr2[p2 - 1]`
- `rightMin1` = arr1 ke right part ka sabse chota element → `arr1[p1]`
- `rightMin2` = arr2 ke right part ka sabse chota element → `arr2[p2]`

**Edge case — empty partition:**

Agar p1 = 0 → arr1 ka left part empty hai → `leftMax1 = -Infinity`

WHY -Infinity? Kyunki empty left part ka koi constraint nahi hona chahiye.
`-Infinity ≤ kuch bhi` → hamesha true → koi false fail nahi hoga empty part ke wajah se.

Agar p1 = n1 → arr1 ka right part empty hai → `rightMin1 = +Infinity`

WHY +Infinity? Kyunki empty right part ka koi constraint nahi hona chahiye.
`kuch bhi ≤ +Infinity` → hamesha true.

---

## STEP 8: Valid Partition Check — Kya Condition Chahiye?

Partition valid hai agar:
```
leftMax1 ≤ rightMin2   AND   leftMax2 ≤ rightMin1
```

**WHY yeh do conditions?**

Hum chahte hain ki combined left half ke sab elements ≤ combined right half ke sab elements.

```
Combined left  = {left_part1} ∪ {left_part2}
Combined right = {right_part1} ∪ {right_part2}
```

Kyunki dono arrays already sorted hain, hume sirf BOUNDARY check karna hai:

```
leftMax1 ≤ rightMin1   → Already guaranteed! (arr1 sorted hai)
leftMax2 ≤ rightMin2   → Already guaranteed! (arr2 sorted hai)

leftMax1 ≤ rightMin2   → arr1 ka left ≤ arr2 ka right ← CHECK KARNA PADEGA
leftMax2 ≤ rightMin1   → arr2 ka left ≤ arr1 ka right ← CHECK KARNA PADEGA
```

Sirf yeh 2 cross-checks karne padte hain!

---

## STEP 9: Adjustment Logic — Galat Partition Pe Kya Karein?

### Case 1: `leftMax1 > rightMin2` (FAIL)

```
arr1: [ 2, 8 | 10 ]    leftMax1 = 8
arr2: [ 1    |  3, 7]  rightMin2 = 3

8 > 3 ✗
```

**Problem:** arr1 ke left mein ek BADA element aa gaya jo arr2 ke right wale se bhi bada hai.
Matlab arr1 se ZYADA elements left mein le liye — p1 bada hai.

**Fix:** arr1 se KAM elements lo → `high = p1 - 1`

WHY `high = p1 - 1`?
- p1 = (low + high) / 2
- high ko p1 se neeche karo → next p1 = (low + smaller_high) / 2 → CHOTA p1
- Chota p1 = arr1 se fewer elements left mein

---

### Case 2: `leftMax2 > rightMin1` (FAIL)

```
arr1: [ 2    |  3, 6 ]   rightMin1 = 3
arr2: [ 1, 4 |  5   ]   leftMax2  = 4

4 > 3 ✗
```

**Problem:** arr2 ke left mein ek BADA element hai jo arr1 ke right wale se bhi bada hai.
Matlab arr2 se ZYADA elements left mein hain — p2 bada hai.
p2 bada hai = p1 chota hai (yaad karo: p2 = leftHalfSize - p1).

**Fix:** arr1 se ZYADA elements lo (taaki arr2 se automatically kam ho) → `low = p1 + 1`

WHY `low = p1 + 1`?
- low ko p1 se upar karo → next p1 = (bigger_low + high) / 2 → BADA p1
- Bada p1 = arr1 se more elements left mein = arr2 se fewer (p2 = leftHalfSize - p1 → p2 chota)

---

### Summary Table

| Check Fails | Kya Galat Hai | Fix | p1 Next |
|-------------|---------------|-----|---------|
| `leftMax1 > rightMin2` | arr1 left too big | `high = p1 - 1` | p1 ↓ smaller |
| `leftMax2 > rightMin1` | arr2 left too big (= arr1 left too small) | `low = p1 + 1` | p1 ↑ bigger |
| Both pass ✓ | Valid partition! | Calculate median | Done |

---

## STEP 10: Median Nikalo — Valid Partition Mili!

```
leftMax  = max(leftMax1, leftMax2)    ← combined left ka biggest
rightMin = min(rightMin1, rightMin2)  ← combined right ka smallest
```

```
Even total: median = (leftMax + rightMin) / 2
            (do middle elements ka average)

Odd total:  median = leftMax
            (left mein ek extra element hai — woh hi median hai)
```

**WHY leftMax for odd?**
Odd mein `leftHalfSize = (total+1)/2` → left mein right se 1 zyada element.
Woh extra element sabse bada left element hai = `leftMax` = median.

---

## STEP 11: WHY Smaller Array Pe Search?

Binary search ki iterations = `log(high - low)` = `log(n1)`

Agar hum always smaller array pe search karein → `log(min(m,n))` iterations.
Isliye: agar `n1 > n2` → arrays swap karo, phir search karo.

---

## FULL DRY RUN (Tera Notebook Example)

```
arr1 = [2, 3, 6]   n1=3
arr2 = [1, 4, 5]   n2=3
total = 6,  leftHalfSize = floor((6+1)/2) = 3
low=0, high=3
```

### Iteration 1

```
p1 = floor((0+3)/2) = 1
p2 = 3 - 1 = 2

arr1: [ 2  |  3, 6 ]
arr2: [ 1, 4  |  5 ]

leftMax1  = arr1[p1-1] = arr1[0] = 2
leftMax2  = arr2[p2-1] = arr2[1] = 4
rightMin1 = arr1[p1]   = arr1[1] = 3
rightMin2 = arr2[p2]   = arr2[2] = 5

Check 1: leftMax1 ≤ rightMin2?  2 ≤ 5? ✓
Check 2: leftMax2 ≤ rightMin1?  4 ≤ 3? ✗  ← FAIL!

leftMax2 > rightMin1 → arr2 left too big → arr1 se zyada lo
→ low = p1 + 1 = 2
```

### Iteration 2

```
p1 = floor((2+3)/2) = 2
p2 = 3 - 2 = 1

arr1: [ 2, 3  |  6 ]
arr2: [ 1     |  4, 5 ]

leftMax1  = arr1[p1-1] = arr1[1] = 3
leftMax2  = arr2[p2-1] = arr2[0] = 1
rightMin1 = arr1[p1]   = arr1[2] = 6
rightMin2 = arr2[p2]   = arr2[1] = 4

Check 1: leftMax1 ≤ rightMin2?  3 ≤ 4? ✓
Check 2: leftMax2 ≤ rightMin1?  1 ≤ 6? ✓  ← VALID! 🎉

leftMax  = max(3, 1) = 3
rightMin = min(6, 4) = 4
total=6 (even) → median = (3 + 4) / 2 = 3.5 ✅
```

---

## Time aur Space Complexity

```
Time:  O(log(min(m, n)))
       Binary search on smaller array

Space: O(1)
       Sirf kuch variables — koi extra array nahi!

Compare with brute force:
  Brute:   O(m+n) time,   O(m+n) space
  Optimal: O(log(min))    O(1) space   ← winner!
```

---

## Quick Reference (Jab Bhool Jao Toh Yahan Dekho)

```
1. leftHalfSize = floor((m+n+1)/2)
2. Binary search on arr1: p1 = (low+high)/2
3. p2 = leftHalfSize - p1  (automatic)
4. leftMax1  = p1>0  ? arr1[p1-1] : -Infinity
   leftMax2  = p2>0  ? arr2[p2-1] : -Infinity
   rightMin1 = p1<n1 ? arr1[p1]   : +Infinity
   rightMin2 = p2<n2 ? arr2[p2]   : +Infinity
5. if leftMax1>rightMin2 → high = p1-1  (arr1 se kam lo)
   if leftMax2>rightMin1 → low  = p1+1  (arr1 se zyada lo)
   else → VALID!
6. odd:  return max(leftMax1, leftMax2)
   even: return (max(leftMax1,leftMax2) + min(rightMin1,rightMin2)) / 2
```
