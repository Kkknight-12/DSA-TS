# Find Leaders in an Array — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Leader woh element hota hai jo apne RIGHT ke saare elements se bada ya equal ho.

Example:

```txt
arr = [16, 17, 4, 3, 5, 2]
answer = [17, 5, 2]
```

Kyun?

- `17` ke right me usse bada kuch nahi
- `5` ke right me `2` hai, aur `5 >= 2`
- `2` ke right me kuch nahi, toh woh automatically leader

Dhyan do:

- is note me common Striver / GFG-style definition use ho rahi hai:
  `current >= all elements to the right`
- agar kisi platform pe strict `>` ho, toh comparison line me bas ek operator badlega

---

## STEP 2: Brute Force Kyun Slow Hai

Sabse seedha idea:

- har element lo
- uske right ke saare elements check karo
- agar sabse bada hi nikla, toh leader

Example:

```txt
arr = [16, 17, 4, 3, 5, 2]

16 -> right me 17 hai -> not leader
17 -> right me koi bigger nahi -> leader
4  -> right me 5 hai -> not leader
```

Yeh `O(n^2)` hai, kyunki har element ke liye future ka poora scan karna pad raha hai.

---

## STEP 3: Key Insight — Right Se Left Aao

Pehle yeh socho:

Leader ka decision kis pe depend karta hai?

```txt
right side pe
```

Isliye left se right jaana natural nahi hai.
Current element ke liye future dekhna padega.

Ab right se left aake dekho:

```txt
[16, 17, 4, 3, 5, 2]
                  ↑
               start here
```

Rightmost element ke right me kuch nahi hota.
Toh woh automatically leader hai.

Ab uske left me jaate hue bas ek cheez maintain karo:

```txt
ab tak right side ka maximum
```

Agar current element us maximum se bada ya equal hai,
toh current bhi leader hai.

Yahi poora optimal idea hai.

---

## STEP 4: Why This Technique Work Karti Hai

Question:

Koi current element leader kab hota hai?

Answer:

```txt
jab current >= max element on its right
```

Toh hume poori right side yaad rakhne ki zarurat nahi.
Bas right side ka maximum yaad rakhna enough hai.

Example:

```txt
arr = [16, 17, 4, 3, 5, 2]
```

Right se left:

```txt
2 -> maxFromRight = 2
5 -> 5 >= 2  -> leader, maxFromRight = 5
3 -> 3 >= 5? no
4 -> 4 >= 5? no
17 -> 17 >= 5 -> leader, maxFromRight = 17
16 -> 16 >= 17? no
```

So current ka answer sirf ek running maximum se decide ho raha hai.

---

## STEP 5: Variables Samjho

```txt
maxFromRight -> ab tak right side ka maximum element
leaders      -> jo leaders mil gaye unka list
```

Example start:

```txt
arr = [16, 17, 4, 3, 5, 2]

maxFromRight = -∞
leaders = []
```

Dhyan do:

- `maxFromRight` ko `-∞` se start karna safe hai
- isse negative arrays bhi correct handle ho jayengi

Why not `-1`?

```txt
arr = [-3, -2, -2, -5]
```

Agar `-1` se start karoge, toh koi bhi negative leader galat skip ho sakta hai.

---

## STEP 6: Mental Model — Running Right Maximum

Yeh problem ko aise yaad rakho:

```txt
Main right se left chal raha hoon.
Jo ab tak ka sabse bada element dekha hai, wahi mera gatekeeper hai.
```

Har current element ke liye bas yeh poochna hai:

```txt
Kya main right side ke maximum ko beat kar raha hoon?
```

Agar haan:

- current leader hai
- current naya `maxFromRight` banega

Agar nahi:

- current leader nahi hai
- `maxFromRight` same rahega

Important:

Leaders right-to-left order me collect honge.
Final answer left-to-right chahiye.
Isliye end me reverse karna padega.

---

## STEP 7: Boundary / Edge Cases

**Case 1: Single element**

```txt
[5]
```

Right me kuch nahi.
Answer `[5]`.

**Case 2: Strictly decreasing**

```txt
[5, 4, 3, 2]
```

Har element ke right me chhote elements hain.
Sab leader.

**Case 3: Strictly increasing**

```txt
[1, 2, 3, 4]
```

Sirf last element leader.

**Case 4: Equal values**

```txt
[10, 4, 2, 4, 1]
```

Agar definition `>=` hai, toh dono `4` leaders honge.

**Case 5: Negative values**

```txt
[-3, -2, -2, -5]
```

`-2, -2, -5` leaders ban sakte hain.
Isliye `-∞` important hai.

---

## STEP 8: Conditions Ka Meaning

Core condition:

```txt
arr[i] >= maxFromRight
```

Meaning:

- current element right side ke sabse bade element ko beat ya match kar raha hai
- current leader hai

Toh:

```txt
leaders.push(arr[i])
maxFromRight = arr[i]
```

Otherwise:

```txt
arr[i] < maxFromRight
```

Meaning:

- right side me already ek bigger element maujood hai
- current leader nahi ho sakta

Dhyan do:

Yahan `>=` vs `>` problem-definition choice hai.
Current note `>=` wali definition follow kar rahi hai.

---

## STEP 9: Adjustment Logic

### Jab current leader hai

```txt
arr[i] >= maxFromRight
```

Tab 2 kaam hote hain:

1. `leaders` me add karo
2. `maxFromRight` update karo

Kyunki ab future left elements ke liye yahi new benchmark banega.

### Jab current leader nahi hai

```txt
arr[i] < maxFromRight
```

Tab:

- current skip hoga
- `maxFromRight` same rahega

### End me reverse kyun?

Traversal right se left hua tha.
Toh collected order aisa milega:

```txt
[2, 5, 17]
```

Lekin final answer original array order me chahiye:

```txt
[17, 5, 2]
```

Isliye:

```txt
leaders.reverse()
```

Design choice:

- `push + reverse` efficient hai
- `unshift` bhi ho sakta hai, but every time front insert costly hota hai

---

## STEP 10: Answer Formula

Yahan fixed math formula nahi hai.
Answer ek filtered list hai:

```txt
jo elements right-side maximum ko beat karte hain
```

Algorithmic form:

```txt
if arr[i] >= maxFromRight:
   leader
   update maxFromRight
```

Loop end pe:

```txt
return reverse(collectedLeaders)
```

Yahi final answer hai.

---

## STEP 11: Full Dry Run

### arr = [16, 17, 4, 3, 5, 2]

```txt
idx:   0   1   2   3   4   5
val:  16  17   4   3   5   2
```

Start:

```txt
maxFromRight = -∞
leaders = []
```

| Iter | i | arr[i] | maxFromRight before | arr[i] >= maxFromRight ? | leaders after push | maxFromRight after |
|------|---|--------|---------------------|---------------------------|--------------------|-------------------|
| 1 | 5 | 2 | -∞ | YES | [2] | 2 |
| 2 | 4 | 5 | 2 | YES | [2, 5] | 5 |
| 3 | 3 | 3 | 5 | NO | [2, 5] | 5 |
| 4 | 2 | 4 | 5 | NO | [2, 5] | 5 |
| 5 | 1 | 17 | 5 | YES | [2, 5, 17] | 17 |
| 6 | 0 | 16 | 17 | NO | [2, 5, 17] | 17 |

Collected order:

```txt
[2, 5, 17]
```

Reverse:

```txt
[17, 5, 2]
```

Answer = **[17, 5, 2] ✅**

---

### arr = [10, 4, 2, 4, 1]

```txt
idx:   0   1   2   3   4
val:  10   4   2   4   1
```

Start:

```txt
maxFromRight = -∞
leaders = []
```

| Iter | i | arr[i] | maxFromRight before | arr[i] >= maxFromRight ? | leaders after push | maxFromRight after |
|------|---|--------|---------------------|---------------------------|--------------------|-------------------|
| 1 | 4 | 1 | -∞ | YES | [1] | 1 |
| 2 | 3 | 4 | 1 | YES | [1, 4] | 4 |
| 3 | 2 | 2 | 4 | NO | [1, 4] | 4 |
| 4 | 1 | 4 | 4 | YES | [1, 4, 4] | 4 |
| 5 | 0 | 10 | 4 | YES | [1, 4, 4, 10] | 10 |

Collected order:

```txt
[1, 4, 4, 10]
```

Reverse:

```txt
[10, 4, 4, 1]
```

Answer = **[10, 4, 4, 1] ✅**

---

## STEP 12: Quick Reference

```txt
CORE IDEA:
  Leader ka decision right side pe depend karta hai.

MENTAL MODEL:
  Right se left aao.
  maxFromRight maintain karo.

CONDITION:
  arr[i] >= maxFromRight -> leader
  arr[i] <  maxFromRight -> not leader

UPDATES:
  leader mila -> push karo, maxFromRight update karo
  warna skip karo

ORDER NOTE:
  Leaders reverse traversal me collect hote hain
  isliye end me reverse karo

ALTERNATIVE:
  if strict definition ho, >= ko > se replace kar do

COMPLEXITY:
  Time:  O(n)
  Space: O(n)
```
