# Kth Missing Positive Number — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Strictly increasing positive sorted array diya hai.
Hume kth missing positive number dhoondhna hai.

Example:

```txt
arr = [2, 3, 4, 7, 11]

Positive numbers:
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...

Array me present:
   2, 3, 4,    7,     11

Missing:
1, 5, 6, 8, 9, 10, ...
```

Agar:

```txt
k = 5
```

toh 5th missing number `9` hai.

Dhyan do:

- array sorted hai
- array positive hai
- hume kth missing value chahiye, index nahi

---

## STEP 2: Brute Force Kyun Slow Hai

Sabse seedha idea:

- positive numbers ko `1, 2, 3, 4...` se generate karo
- array ke saath compare karo
- jo numbers array me nahi mile, unka count badhao
- jab count `k` ho jaye, wahi answer

Example:

```txt
arr = [2,3,4,7,11], k=5

1 -> missing count = 1
2 -> present
3 -> present
4 -> present
5 -> missing count = 2
6 -> missing count = 3
7 -> present
8 -> missing count = 4
9 -> missing count = 5  -> answer
```

Yeh approach `O(answer)` ya roughly `O(n + k)` type ka ho sakta hai.

Kaam sahi karta hai, lekin binary search se `O(log n)` me solve kar sakte hain.

---

## STEP 3: Key Insight — Missing Count Formula

Pehle ideal array imagine karo:

```txt
idx:   0  1  2  3  4
ideal: 1  2  3  4  5
```

Ab actual array dekho:

```txt
idx:    0  1  2  3   4
arr:    2  3  4  7  11
```

Ab har index pe difference dekho:

```txt
idx 0:
  ideal = 1
  actual = 2
  missing till here = 1

idx 3:
  ideal = 4
  actual = 7
  missing till here = 3

idx 4:
  ideal = 5
  actual = 11
  missing till here = 6
```

So formula naturally nikalta hai:

```txt
missingCount(i) = arr[i] - (i + 1)
```

Kyun?

- index `i` pe ideal value `i+1` honi chahiye thi
- actual value agar usse aage pahunch gayi hai
- toh beech ka gap hi missing numbers ka count hai

Example:

```txt
arr[4] = 11
ideal at idx 4 = 5

11 - 5 = 6
```

Matlab `11` tak 6 positive numbers missing hain.

---

## STEP 4: Why Binary Search Yahan Work Karta Hai

Ab important pattern dekho:

```txt
missingCount = [1, 1, 1, 3, 6]
```

Yeh non-decreasing hai.
Kabhi kam nahi ho raha.

Kyun?

- array strictly increasing hai
- indices bhi aage badh rahe hain
- actual value ideal value se jitni aage niklegi, utne missing badhenge ya same rahenge

So binary search kis cheez pe chal rahi hai?

```txt
first index jahan missingCount >= k ho jaye
```

Example:

```txt
missingCount = [1, 1, 1, 3, 6]
k = 5
```

Pehla index jahan `missingCount >= 5` hua:

```txt
index 4
```

Yahi boundary binary search ka target hai.

---

## STEP 5: Variables Samjho

```txt
left  -> search window ka start
right -> search window ka end
mid   -> beech ka index
```

Aur ek derived value:

```txt
missingCount = arr[mid] - (mid + 1)
```

Dhyan do:

- `left`, `right`, `mid` values nahi, pointers hain
- `left` end me first index banega jahan missingCount `>= k` ho
- `right` end me last index banega jahan missingCount `< k` ho

Yahi reason hai ki final answer 2 alag formulas se nikal sakta hai:

- `left + k`
- `arr[right] + (k - missingTillRight)`

Dono same boundary ko use karte hain.

---

## STEP 6: Mental Model — Boundary of "Enough Missing Numbers"

Soch:

Har index pe hum yeh pooch rahe hain:

```txt
Kya yahan tak kth missing number aa chuka hai?
```

Iska exact matlab:

```txt
Kya missingCount >= k hai?
```

Example:

```txt
arr = [2, 3, 4, 7, 11]
k = 5
missingCount = [1, 1, 1, 3, 6]
```

Interpretation:

- index 0 -> abhi sirf 1 missing
- index 1 -> abhi bhi sirf 1 missing
- index 2 -> abhi bhi sirf 1 missing
- index 3 -> abhi 3 missing
- index 4 -> ab finally 6 missing

So:

```txt
index 4 se pehle kth missing complete nahi hua tha
index 4 pe ya uske pehle boundary cross ho gayi
```

Binary search exactly isi first crossing point ko dhoondh rahi hai.

---

## STEP 7: Boundary / Edge Cases

**Case 1: kth missing arr[0] se pehle ho**

```txt
arr = [5, 6, 7], k = 3
```

Missing numbers:

```txt
1, 2, 3, 4, ...
```

3rd missing `3` hi hai.

**Case 2: answer poore array ke baad ho**

```txt
arr = [1, 2, 3, 4], k = 2
```

Array ke andar missing count kabhi `2` tak pahunchta hi nahi.
Answer array ke baad milega: `6`

**Case 3: single element array**

```txt
arr = [2], k = 1
```

Answer `1`

**Case 4: boundary exact last index pe ho**

```txt
arr = [2, 3, 4, 7, 11], k = 5
```

First valid index = `4`

---

## STEP 8: Conditions Ka Meaning

Binary search me core condition hai:

```txt
missingCount < k
```

Meaning:

- abhi tak enough missing numbers nahi hue
- kth missing number right side me hai

Toh:

```txt
left = mid + 1
```

Dusri condition:

```txt
missingCount >= k
```

Meaning:

- yahan tak kth missing number aa chuka hai
- first valid boundary left side me ya yahin hai

Toh:

```txt
right = mid - 1
```

Dhyan do:

Hum exact answer value pe search nahi kar rahe.
Hum boundary pe search kar rahe hain.

---

## STEP 9: Adjustment Logic

### Jab `missingCount < k`

Example:

```txt
mid = 3
arr[3] = 7
missingCount = 7 - 4 = 3
k = 5
```

Abhi sirf 3 missing numbers mile hain.
Hume 5 chahiye.

Matlab answer abhi aage hai.

```txt
left = mid + 1
```

### Jab `missingCount >= k`

Example:

```txt
mid = 4
arr[4] = 11
missingCount = 11 - 5 = 6
k = 5
```

Yahan tak already 6 missing numbers ho chuke hain.
Matlab kth missing yahin tak ke range me aa chuka hai.

Boundary first time kab aayi, woh check karne ke liye left side me jao:

```txt
right = mid - 1
```

---

## STEP 10: Answer Formula

Binary search ke baad:

```txt
left  = first index jahan missingCount >= k
right = last index jahan missingCount < k
```

Ab answer nikalne ke 2 valid tareeke hain.

### Formula 1: `left + k`

Yeh cleaner version hai.

Kyun?

`left` ka matlab:

```txt
answer se pehle itne array elements present hain
```

Aur hume `k` missing numbers chahiye.

Toh first `left + k` positive numbers me:

- `left` present hain
- `k` missing hain

Isliye:

```txt
answer = left + k
```

### Formula 2: `arr[right] + (k - missingTillRight)`

Yeh alternate derivation hai.

Example:

```txt
right = 3
arr[right] = 7
missingTillRight = 3
k = 5
```

Ab `7` tak sirf 3 missing hue.
Hume aur 2 missing chahiye.

Toh:

```txt
answer = 7 + 2 = 9
```

Formula:

```txt
answer = arr[right] + (k - missingTillRight)
```

Dono correct hain.
`left + k` yaad rakhna easy hai.
`arr[right] + remaining` zyada visual hai.

---

## STEP 11: Full Dry Run

### arr = [2, 3, 4, 7, 11], k = 5

```txt
idx:        0   1   2   3    4
arr:        2   3   4   7   11
ideal:      1   2   3   4    5
missing:    1   1   1   3    6
```

| Iter | left | right | mid | arr[mid] | missingCount = arr[mid] - (mid+1) | missingCount < k ? | Action |
|------|------|-------|-----|----------|------------------------------------|--------------------|--------|
| 1 | 0 | 4 | 2 | 4 | 1 | YES | left = 3 |
| 2 | 3 | 4 | 3 | 7 | 3 | YES | left = 4 |
| 3 | 4 | 4 | 4 | 11 | 6 | NO | right = 3 |

Loop end:

```txt
left = 4
right = 3
```

Formula 1:

```txt
answer = left + k = 4 + 5 = 9
```

Formula 2:

```txt
missingTillRight = arr[3] - (3 + 1) = 7 - 4 = 3
remaining = 5 - 3 = 2
answer = arr[3] + 2 = 7 + 2 = 9
```

Answer = **9 ✅**

---

### arr = [1, 2, 3, 4], k = 2

```txt
idx:        0  1  2  3
arr:        1  2  3  4
ideal:      1  2  3  4
missing:    0  0  0  0
```

| Iter | left | right | mid | arr[mid] | missingCount = arr[mid] - (mid+1) | missingCount < k ? | Action |
|------|------|-------|-----|----------|------------------------------------|--------------------|--------|
| 1 | 0 | 3 | 1 | 2 | 0 | YES | left = 2 |
| 2 | 2 | 3 | 2 | 3 | 0 | YES | left = 3 |
| 3 | 3 | 3 | 3 | 4 | 0 | YES | left = 4 |

Loop end:

```txt
left = 4
right = 3
```

Formula 1:

```txt
answer = left + k = 4 + 2 = 6
```

Formula 2:

```txt
missingTillRight = arr[3] - (3 + 1) = 4 - 4 = 0
remaining = 2 - 0 = 2
answer = arr[3] + 2 = 4 + 2 = 6
```

Answer = **6 ✅**

---

## STEP 12: Quick Reference

```txt
CORE IDEA:
  index i tak kitne numbers missing hain?

FORMULA:
  missingCount(i) = arr[i] - (i + 1)

BINARY SEARCH TARGET:
  first index jahan missingCount >= k

CONDITIONS:
  missingCount < k   -> left = mid + 1
  missingCount >= k  -> right = mid - 1

FINAL ANSWER:
  answer = left + k

ALTERNATE FINAL ANSWER:
  answer = arr[right] + (k - missingTillRight)

MENTAL MODEL:
  left = first index jahan enough missing numbers mil gaye
  right = last index jahan enough missing numbers nahi mile

COMPLEXITY:
  Time:  O(log n)
  Space: O(1)
```