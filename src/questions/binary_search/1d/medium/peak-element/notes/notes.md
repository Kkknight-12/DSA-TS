# Peak Element — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Array diya hai. Hume koi bhi aisa index dhoondhna hai jahan element apne neighbors se bada ho.
Us index ko **peak index** bolte hain.

Peak condition:

```txt
nums[i] > nums[i - 1]
nums[i] > nums[i + 1]
```

Problem ek extra assumption deti hai:

```txt
nums[-1] = -∞
nums[n]  = -∞
```

Iska matlab:
- first element ka left neighbor imaginary `-∞` hai
- last element ka right neighbor imaginary `-∞` hai

Isliye boundary element bhi peak ho sakta hai.

Examples:

```txt
[1, 2, 3, 1]
        ↑
      peak at index 2

[1, 2, 1, 3, 5, 6, 4]
    ↑           ↑
   idx 1      idx 5

Dono valid peaks hain.
```

Dhyan do:
Hume **maximum** nahi dhoondhna.
Hume **koi bhi ek valid peak** dhoondhni hai.

---

## STEP 2: Brute Force Kyun Slow Hai

Sabse seedha way:

- har index pe jao
- left aur right neighbor check karo
- jahan dono se bada mila, wahi answer

```txt
[1, 2, 1, 3, 5, 6, 4]

idx 0 -> 1 > -∞ ? yes, 1 > 2 ? no
idx 1 -> 2 > 1  ? yes, 2 > 1 ? yes  -> peak
```

Yeh kaam karta hai.
Time complexity `O(n)` hai, kyunki worst case me poora array scan karna padega.

Lekin yahan binary search possible hai, kyunki hume full order nahi chahiye.
Bas itna chahiye ki peak kis direction me guaranteed hai.

---

## STEP 3: Key Insight — Slope Dekho

Pehle formula mat dekho.
Pehle slope simulate karo.

### Example 1: Rising slope

```txt
[1, 2, 3, 4, 3, 2]
      ... m  m+1 ...

nums[mid] = 3
nums[mid+1] = 4

3 < 4
```

Yani hum upar chadh rahe hain.

Ab do possibilities hain:

1. Array aage bhi chadhti rahe
```txt
[1, 2, 3, 4, 5]
              ↑
           last element peak
```

2. Array aage jaake neeche gire
```txt
[1, 2, 3, 4, 3, 2]
           ↑
         yahan peak
```

Dono cases me ek baat same hai:

```txt
agar nums[mid] < nums[mid+1]
toh RIGHT side me ek peak zaroor hai
```

### Example 2: Falling slope

```txt
[6, 5, 4, 3, 2]
 m  m+1

nums[mid] = 6
nums[mid+1] = 5

6 > 5
```

Yani hum neeche aa rahe hain.

Is case me:
- ya `mid` khud peak hai
- ya left side me koi peak hai

So:

```txt
agar nums[mid] > nums[mid+1]
toh LEFT side me ya mid pe peak hai
```

Yahi poora problem ka aha moment hai.

---

## STEP 4: Why Binary Search Yahan Work Karta Hai

Normal binary search me sortedness use hoti hai.
Yahan sorted array nahi hai.

Toh binary search yahan kis cheez pe chal rahi hai?

Answer:

```txt
slope direction pe
```

Hum exact peak ko directly identify nahi kar rahe.
Hum bas yeh decide kar rahe hain:

- peak guaranteed left side me hai?
- ya peak guaranteed right side me hai?

Binary search ke liye bas itna enough hota hai:

```txt
ek comparison se half eliminate ho jaye
```

Yahan woh comparison hai:

```txt
nums[mid] vs nums[mid + 1]
```

---

## STEP 5: Variables Samjho

```txt
left  -> current search window ka start
right -> current search window ka end
mid   -> beech ka index
```

Dhyan do:

- `left`, `right`, `mid` values nahi, pointers hain
- `left = mid + 1` ka matlab search window ka left boundary shift hui
- `right = mid` ka matlab mid ko window me include rakha gaya

Small example:

```txt
nums  = [1, 2, 3, 4, 3]
idx     0  1  2  3  4

left = 0
right = 4
mid = 2
```

Agar `nums[mid] < nums[mid+1]` hai:

```txt
3 < 4
```

toh:

```txt
left = mid + 1 = 3
```

New search window:

```txt
[4, 3]
```

---

## STEP 6: Mental Model — Peak Hamesha Kahin Na Kahin Hai

Yeh sabse important trust-building point hai.

Question:
Hum itna confidently kaise bol rahe hain ki kisi side me peak zaroor hogi?

Soch:

### Agar array rising hai

```txt
[1, 2, 3, 4, 5]
```

Toh last element peak hoga, kyunki:

```txt
5 > 4
5 > -∞
```

### Agar array falling hai

```txt
[9, 7, 5, 3]
```

Toh first element peak hoga, kyunki:

```txt
9 > -∞
9 > 7
```

### Agar rise ke baad fall aata hai

```txt
[1, 3, 5, 4, 2]
        ↑
      peak
```

Toh jahan rise se fall hota hai, wahi peak mil jaati hai.

So overall:

```txt
Har array me at least ek peak hoti hi hai.
```

Isliye slope dekhke half choose karna safe hai.

---

## STEP 7: Boundary / Edge Cases

**Case 1: Single element**

```txt
[5]
```

Single element dono imaginary neighbors `-∞` se bada hoga.
Isliye wahi peak hai.

**Case 2: Strictly increasing**

```txt
[1, 2, 3, 4]
```

Last element peak hoga.

**Case 3: Strictly decreasing**

```txt
[9, 7, 5, 3]
```

First element peak hoga.

**Case 4: Multiple peaks**

```txt
[1, 3, 2, 4, 1]
    ↑     ↑
   idx1  idx3
```

Dono valid peaks hain.
Question kisi bhi ek peak ka hai, isliye algorithm dono me se kisi ek pe converge kar sakta hai.

**Case 5: Two elements**

```txt
[1, 2] -> index 1 peak
[2, 1] -> index 0 peak
```

---

## STEP 8: Conditions Ka Meaning

Ab slope observation ko exact conditions me likhte hain.

### Condition 1

```txt
nums[mid] < nums[mid + 1]
```

Meaning:

- current point rising slope pe hai
- right side me chadhai chal rahi hai
- peak right side me guaranteed hai

### Condition 2

```txt
nums[mid] > nums[mid + 1]
```

Meaning:

- hum falling slope pe hain
- ya `mid` peak hai
- ya peak left side me hai

Dhyan do:
Yahan equality case nahi aata, kyunki LeetCode version me adjacent elements unequal hote hain.

---

## STEP 9: Adjustment Logic

### Jab `nums[mid] < nums[mid + 1]`

Simulation se dekha:

- right side me peak guaranteed hai
- `mid` answer nahi ho sakta

Isliye:

```txt
left = mid + 1
```

`mid` ko safely exclude kar diya.

### Jab `nums[mid] > nums[mid + 1]`

Simulation se dekha:

- `mid` khud peak ho sakta hai
- ya peak uske left me ho sakta hai

Isliye:

```txt
right = mid
```

Dhyan do:

```txt
right = mid - 1
```

nahi kar sakte, kyunki aisa karoge toh `mid` ko hata doge.
Aur `mid` khud valid peak ho sakta hai.

### `mid + 1` compare kyun?

Alternative possible hain:

- `nums[mid]` vs `nums[mid - 1]`
- dono neighbors check karna

Lekin current design cleaner hai, kyunki:

- `while (left < right)` me hamesha `mid < right`
- toh `mid + 1` hamesha valid index hai
- ek comparison se direction mil jaati hai

Yeh constraint nahi, design choice hai.
Dusre variants bhi likhe ja sakte hain.

---

## STEP 10: Answer Formula / Final Algorithm

Ab poori baat naturally nikal kar aati hai:

```ts
left = 0
right = n - 1

while (left < right) {
  mid = floor((left + right) / 2)

  if (nums[mid] < nums[mid + 1]) {
    left = mid + 1
  } else {
    right = mid
  }
}

return left
```

Kyun `return left`?

Kyunki loop tab rukta hai jab:

```txt
left == right
```

Aur us point pe search window ek hi index ka reh gaya hota hai.
Wahi index peak hai.

`return right` bhi kaam karega, kyunki end me dono equal hote hain.

---

## STEP 11: Full Dry Run

### nums = [1, 2, 1, 3, 5, 6, 4]

```
idx:   0   1   2   3   4   5   6
val:   1   2   1   3   5   6   4
                           ↑
                       one valid peak
```

Is array me 2 valid peaks hain: index 1 (value 2) aur index 5 (value 6).

| Iter | left | right | mid | nums[mid] | nums[mid+1] | Slope | Action |
|------|------|-------|-----|-----------|-------------|-------|--------|
| 1 | 0 | 6 | 3 | 3 | 5 | rising | left = 4 |
| 2 | 4 | 6 | 5 | 6 | 4 | falling | right = 5 |
| 3 | 4 | 5 | 4 | 5 | 6 | rising | left = 5 |

left=5 === right=5 → **return index 5**

```
nums[5]=6 > nums[4]=5  ✓
nums[5]=6 > nums[6]=4  ✓
```

Peak valid ✅

---

### nums = [1, 2, 3, 4]  (strictly increasing)

```
idx:   0   1   2   3
val:   1   2   3   4
                   ↑
               peak at boundary
```

| Iter | left | right | mid | nums[mid] | nums[mid+1] | Slope | Action |
|------|------|-------|-----|-----------|-------------|-------|--------|
| 1 | 0 | 3 | 1 | 2 | 3 | rising | left = 2 |
| 2 | 2 | 3 | 2 | 3 | 4 | rising | left = 3 |

left=3 === right=3 → **return index 3**

```
nums[3]=4 > nums[2]=3  ✓
nums[3]=4 > -∞         ✓
```

Peak valid ✅

---

## STEP 12: Quick Reference

```txt
CORE IDEA:
  Peak directly mat dhoondho.
  Slope dekho.

MENTAL MODEL:
  nums[mid] < nums[mid+1]  -> rising slope
  -> peak RIGHT side me guaranteed

  nums[mid] > nums[mid+1]  -> falling slope
  -> peak LEFT side me ya mid pe

UPDATES:
  rising  -> left = mid + 1
  falling -> right = mid

WHY right = mid?
  Kyunki mid khud peak ho sakta hai.

WHY left = mid + 1?
  Kyunki rising slope me peak right me guaranteed hai.
  mid answer nahi ho sakta.

EDGE IDEA:
  first aur last bhi peak ho sakte hain,
  kyunki outside neighbors imaginary -∞ hain.

ANSWER:
  loop end pe left == right
  wahi peak index hai

COMPLEXITY:
  Time:  O(log n)
  Space: O(1)
```
