# Longest Subarray With Sum Zero — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek integer array `nums` diya hai.
Hume longest contiguous subarray ki length return karni hai jiska sum exactly `0` ho.

Important:
- subarray contiguous honi chahiye
- answer sirf length hai
- agar koi zero-sum subarray nahi mili, answer `0`

Example:

```txt
nums = [1, -1, 3, -3]
```

Poora array:

```txt
[1, -1, 3, -3]
```

iska sum:

```txt
1 + (-1) + 3 + (-3) = 0
```

toh answer:

```txt
4
```

---

## STEP 2: Brute Force

Sabse seedhi soch:
- har possible start index try karo
- usse har possible end index tak extend karo
- current window ka sum nikaalte jao

Jab bhi current sum `0` ho:
- current window valid hai
- uski length se answer update kar sakte hain

Example:

```txt
nums = [1, -1, 3, -3]
```

`left = 0` se windows:

```txt
[1]              -> sum 1
[1, -1]          -> sum 0
[1, -1, 3]       -> sum 3
[1, -1, 3, -3]   -> sum 0
```

Yahan se hume length `2` aur `4` wali valid windows milti hain.

Important:
Ye brute force `O(n^2)` hai, `O(n^3)` nahi.
Kyunki har window ka sum scratch se nahi nikaal rahe.
Har fixed `left` ke liye `right` badhate hue running sum le ja rahe hain.

---

## STEP 3: Key Insight

Actual magic prefix sum me hai.

Prefix sum ka matlab:

```txt
index i tak total sum
```

Example:

```txt
nums = [1, -1, 3, -3]
```

prefix sums:

```txt
index 0 -> 1
index 1 -> 0
index 2 -> 3
index 3 -> 0
```

Dhyan do:

```txt
prefix sum 0 do baar aaya
```

Jab same prefix sum repeat hota hai,
toh un dono points ke beech jo extra add hua,
uska net effect zero hota hai.

Yani:

```txt
same prefix sum repeat => beech wali subarray sum 0
```

---

## STEP 4: Why This Technique Works

Maan lo:

```txt
prefixSum[i] = S
prefixSum[j] = S
```

jahaan `i < j`

Toh:

```txt
prefixSum[j] - prefixSum[i] = S - S = 0
```

Aur prefix sum difference exactly kis cheez ka hota hai?

```txt
subarray (i+1 .. j) ka sum
```

So:

```txt
same prefix sum repeat hua
=> beech ki subarray ka sum 0
```

Ek aur important case:

agar kisi index `j` pe prefix sum khud `0` ho,
toh start se `j` tak ka sum zero hai.

Isi wajah se map me start me:

```txt
0 -> -1
```

store karte hain.

Why?

Kyunki agar index `j` pe current sum `0` mila,
toh length:

```txt
j - (-1) = j + 1
```

mil jaayegi.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `currentSum` | current index tak ka prefix sum |
| `prefixSumToFirstIndex` | har prefix sum pehli baar kis index pe mila |
| `maxLen` | ab tak longest zero-sum subarray ki length |
| `i` | current traversal index |

Important:
- map me har prefix sum ka first occurrence store hota hai
- latest occurrence store nahi karte

---

## STEP 6: Mental Model

Prefix sum ko checkpoint samjho.

Har index pe hum bol rahe hain:

```txt
ab tak total sum kitna bana?
```

Example:

```txt
nums        = [1, -1, 3, -3]
prefix sums = [1,  0, 3,  0]
```

Visual:

```txt
start ----(1)----> 1 ----(-1)----> 0 ----(3)----> 3 ----(-3)----> 0
```

Jab hum `0` checkpoint pe dubara aaye,
iska matlab beech ka travel net zero tha.

Short memory line:

```txt
Same prefix sum pe wapas aaye = beech ka sum zero
```

---

## STEP 7: Boundary Cases

1. Empty array
   Answer `0`

2. Single zero
   `[0] -> 1`

3. Single non-zero
   `[5] -> 0`

4. Entire array zero-sum
   `[1, -1, 3, -3] -> 4`

5. Kayi zero-sum windows
   longest choose karni hai

6. Repeated prefix sum multiple times
   first occurrence longest length degi

---

## STEP 8: Conditions

### Condition 1: `if (prefixSumToFirstIndex.has(currentSum))`

Iska matlab:

```txt
ye prefix sum pehle bhi mil chuka hai
```

So current index ke saath ek zero-sum subarray ban gayi.

Example:

```txt
prefix sum 3 pehle index 2 pe mila
phir future me same 3 dubara mila
```

Toh un dono ke beech ka sum zero hai.

---

### Condition 2: `else prefixSumToFirstIndex.set(currentSum, i)`

Iska matlab:

```txt
ye prefix sum pehli baar mila hai
```

Tabhi store karo.

Overwrite kyun nahi karte?

Kyunki hume longest length chahiye.
Same prefix sum ka earliest index hi future me sabse badi distance dega.

Example:

```txt
same sum pehle index 1 pe mila tha
baad me index 4 pe bhi mil gaya
```

Agar future me wahi sum index 10 pe phir mila:

```txt
10 - 1  = 9   <- bigger
10 - 4  = 6   <- smaller
```

So earliest occurrence preserve karna better hai.

---

### Condition 3: `prefixSumToFirstIndex.set(0, -1)`

Ye special hack nahi hai.
Ye simply yeh bol raha hai:

```txt
array start hone se pehle prefix sum 0 tha
```

So agar current index pe `currentSum = 0` ho jaye,
toh start se current index tak ka window zero-sum hai.

---

## STEP 9: Adjustment Logic

Is problem me sliding window jaisa `left++` / `right++` adjustment nahi hai.

Yahan logic ye hai:

1. current element add karo
2. current prefix sum dekho
3. agar pehle mila tha:
   length nikaalo
4. warna first occurrence store karo

Important adjustment rule:

```txt
same sum dubara mile toh map update mat karo
```

Kyunki map ka purpose latest position rakhna nahi,
earliest position rakhna hai.

---

## STEP 10: Answer Formula

Maan lo current index `i` hai,
aur same prefix sum pehli baar `firstIndex` pe mila tha.

Toh zero-sum subarray hogi:

```txt
firstIndex + 1  se  i
```

Uski length:

```txt
i - firstIndex
```

Example:

```txt
nums = [1, -1, 3, -3]
```

index `3` pe current sum `0` hai
aur map me `0 -> -1`

Toh:

```txt
length = 3 - (-1) = 4
```

Yahi poore array ki length hai.

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [1, -1, 3, -3]
```

Initial state:

```txt
currentSum = 0
maxLen = 0
map = { 0 -> -1 }
```

| i | nums[i] | currentSum Before | currentSum After | Map Has This Sum? | Action | Map After | maxLen |
|---:|---:|---:|---:|---|---|---|---:|
| 0 | 1 | 0 | 1 | No | first occurrence store karo: `1 -> 0` | `{0:-1, 1:0}` | 0 |
| 1 | -1 | 1 | 0 | Yes | `firstIndex = -1`, length `= 1 - (-1) = 2` | `{0:-1, 1:0}` | 2 |
| 2 | 3 | 0 | 3 | No | first occurrence store karo: `3 -> 2` | `{0:-1, 1:0, 3:2}` | 2 |
| 3 | -3 | 3 | 0 | Yes | `firstIndex = -1`, length `= 3 - (-1) = 4` | `{0:-1, 1:0, 3:2}` | 4 |

Final answer:

```txt
4
```

Actual longest zero-sum subarray:

```txt
[1, -1, 3, -3]
```

---

## STEP 12: Quick Reference

```txt
Goal:
Longest contiguous subarray with sum 0

Brute force:
Har left se running sum ke saath sab right try karo

Key insight:
Same prefix sum repeat => beech ka sum zero

HashMap rule:
prefix sum ka first occurrence store karo

Special initialization:
0 -> -1

Answer length:
i - firstIndex

Why first occurrence?
Earliest index longest length deta hai
```
