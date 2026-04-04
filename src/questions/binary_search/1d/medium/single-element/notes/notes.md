# Single Element in a Sorted Array — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Sorted array diya hai.
Har element exactly 2 baar aata hai.
Sirf ek element aisa hai jo sirf 1 baar aata hai.
Hume wahi single element dhoondhna hai.

Examples:

```txt
[1, 1, 2, 3, 3, 4, 4, 8, 8]
        ↑
     single = 2

[3, 3, 7, 7, 10, 11, 11]
             ↑
          single = 10
```

Dhyan do:

- array sorted hai
- single element ka value chahiye, index nahi
- pairs complete hain, bas ek jagah pattern tootega

---

## STEP 2: Brute Force Kyun Slow Hai

Sabse seedha idea:

- har element check karo
- previous aur next se compare karo
- jo kisi ke saath pair na banaye, wahi answer

Example:

```txt
[1, 1, 2, 3, 3]

1 paired
1 paired
2 single
```

Yeh `O(n)` hai.

Kaam sahi karta hai, lekin sorted array hone ki wajah se hum binary search se `O(log n)` me answer nikaal sakte hain.

---

## STEP 3: Key Insight — Pair Pattern Dekho

Pehle perfect pair array dekho:

```txt
[1, 1, 2, 2, 3, 3, 4, 4]
 0  1  2  3  4  5  6  7
```

Yahan har pair even index se start ho raha hai:

```txt
(0,1), (2,3), (4,5), (6,7)
```

Ab single element beech me daal do:

```txt
[1, 1, 2, 3, 3, 4, 4, 8, 8]
 0  1  2  3  4  5  6  7  8
```

Single = `2` at index `2`

Single ke LEFT me pattern normal hai:

```txt
(0,1)
```

Single ke RIGHT me sab pair 1 step shift ho gaye:

```txt
(3,4), (5,6), (7,8)
```

Soch:

- single se pehle pairs even index se start hote hain
- single ke baad pairs odd index se start hote hain

Yahi pattern break binary search se dhoondhna hai.

---

## STEP 4: Why Binary Search Yahan Work Karta Hai

Normal binary search sorted values pe chalti hai.
Yahan hum direct value order use nahi kar rahe.

Yahan binary search kis cheez pe chal rahi hai?

```txt
pair pattern pe
```

Har step pe hum yeh check karte hain:

```txt
is point tak pair pattern normal hai?
```

Agar normal hai, single right me hai.
Agar normal nahi hai, single left me ya yahin hai.

Binary search ke liye bas itna enough hota hai:

```txt
ek comparison se half eliminate ho jaye
```

Yahan woh comparison hai:

```txt
nums[mid] vs nums[mid + 1]
```

Lekin isse pehle ek chhota sa adjustment karna padta hai:
`mid` ko even banana.

---

## STEP 5: Variables Samjho

```txt
left  -> current search window ka start
right -> current search window ka end
mid   -> beech ka index
```

Dhyan do:

- `left`, `right`, `mid` values nahi, pointers hain
- `left = mid + 2` ka matlab current pair ko skip karke right me jaana
- `right = mid` ka matlab `mid` ko search window me include rakhna

Small example:

```txt
nums  = [1, 1, 2, 3, 3]
idx     0  1  2  3  4

left = 0
right = 4
mid = 2
```

Agar `nums[mid] !== nums[mid+1]` hai:

```txt
2 !== 3
```

toh pattern yahin break hua.
Isliye `right = mid`.

---

## STEP 6: Mental Model — Mid Ko Even Kyun Banate Hain

Yehi sabse important part hai.

Agar mid even hai, to natural pair shape hoti hai:

```txt
(mid, mid+1)
```

Example:

```txt
idx:   0  1  2  3  4  5
nums: [1, 1, 2, 2, 3, 3]

mid = 2
pair = (2,3)
```

Yeh clean comparison hai.

Lekin agar mid odd hua:

```txt
mid = 3
```

to real pair `(2,3)` hai, na ki `(3,4)`.

Isliye odd mid ko even banate hain:

```txt
if (mid % 2 === 1) mid--
```

Ab har baar pair ko ek hi shape me dekh sakte hain:

```txt
(mid, mid+1)
```

Yeh constraint nahi, design choice hai.

Alternative version bhi hota hai:

```txt
partnerIndex = mid ^ 1
```

Woh bhi valid hai.
Current even-normalization version bas zyada visual hai.

---

## STEP 7: Boundary / Edge Cases

**Case 1: Single element only**

```txt
[7]
```

Wahi answer hai.

**Case 2: Single at start**

```txt
[2, 3, 3, 4, 4]
```

Pattern start se hi shifted milega.

**Case 3: Single at end**

```txt
[1, 1, 2, 2, 9]
```

Poora pair pattern normal rahega, answer end me milega.

**Case 4: Single in exact middle**

```txt
[1, 1, 2, 3, 3]
        ↑
```

Break exactly single pe hoga.

**Case 5: Search window bahut chhoti ho jaye**

```txt
left == right
```

Toh wahi single ka index hai.

---

## STEP 8: Conditions Ka Meaning

Ab pattern observation ko exact conditions me likhte hain.

Pehle:

```txt
if (mid odd hai) -> mid--
```

Ab `mid` even hai.
Toh pair compare karo:

### Condition 1

```txt
nums[mid] === nums[mid + 1]
```

Meaning:

- current pair sahi hai
- is point tak pair pattern normal hai
- single is pair ke RIGHT me hai

### Condition 2

```txt
nums[mid] !== nums[mid + 1]
```

Meaning:

- pair pattern yahin break hua
- single LEFT me ya `mid` pe hai

Dhyan do:

- equality yahan good sign hai
- inequality yahan break sign hai

---

## STEP 9: Adjustment Logic

### Jab `nums[mid] === nums[mid + 1]`

Simulation se dekha:

- pair pattern normal hai
- `mid` aur `mid+1` dono paired hain
- single inke right me hi hoga

Isliye:

```txt
left = mid + 2
```

`mid` aur `mid+1` dono ko safely skip kar diya.

### Jab `nums[mid] !== nums[mid + 1]`

Simulation se dekha:

- pattern yahin toot gaya
- single `mid` pe ho sakta hai
- ya left side me ho sakta hai

Isliye:

```txt
right = mid
```

Dhyan do:

```txt
right = mid - 1
```

nahi kar sakte, kyunki `mid` khud single ho sakta hai.

---

## STEP 10: Answer Formula / Final Algorithm

Ab poori baat naturally nikal kar aati hai:

```ts
left = 0
right = n - 1

while (left < right) {
  mid = floor((left + right) / 2)

  if (mid odd hai) {
    mid--
  }

  if (nums[mid] === nums[mid + 1]) {
    left = mid + 2
  } else {
    right = mid
  }
}

return nums[left]
```

Kyun `return nums[left]`?

Kyunki loop tab rukta hai jab:

```txt
left == right
```

Aur us point pe search window ek hi index ka reh gaya hota hai.
Wahi single element ka index hai.

---

## STEP 11: Full Dry Run

### nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]

```txt
idx:   0   1   2   3   4   5   6   7   8
val:   1   1   2   3   3   4   4   8   8
                ↑
             single
```

| Iter | left | right | raw mid | adjusted mid | nums[mid] | nums[mid+1] | Pair OK? | Action |
|------|------|-------|---------|--------------|-----------|-------------|----------|--------|
| 1 | 0 | 8 | 4 | 4 | 3 | 4 | NO | right = 4 |
| 2 | 0 | 4 | 2 | 2 | 2 | 3 | NO | right = 2 |
| 3 | 0 | 2 | 1 | 0 | 1 | 1 | YES | left = 2 |

left=2 === right=2 → **return nums[2] = 2 ✅**

---

### nums = [3, 3, 7, 7, 10, 11, 11]

```txt
idx:   0   1   2   3   4   5   6
val:   3   3   7   7   10  11  11
                        ↑
                     single
```

| Iter | left | right | raw mid | adjusted mid | nums[mid] | nums[mid+1] | Pair OK? | Action |
|------|------|-------|---------|--------------|-----------|-------------|----------|--------|
| 1 | 0 | 6 | 3 | 2 | 7 | 7 | YES | left = 4 |
| 2 | 4 | 6 | 5 | 4 | 10 | 11 | NO | right = 4 |

left=4 === right=4 → **return nums[4] = 10 ✅**

---

## STEP 12: Quick Reference

```txt
CORE IDEA:
  Single element pair pattern ko break karta hai.

PATTERN:
  single se pehle  -> pairs even index se start
  single ke baad   -> pairs odd index se start

MENTAL MODEL:
  mid ko even banao
  phir (mid, mid+1) pair check karo

CONDITIONS:
  nums[mid] === nums[mid+1] -> single RIGHT me
  nums[mid] !== nums[mid+1] -> single LEFT me ya mid pe

UPDATES:
  pair ok    -> left = mid + 2
  pair break -> right = mid

WHY right = mid?
  Kyunki mid khud single ho sakta hai.

WHY left = mid + 2?
  Kyunki mid aur mid+1 dono paired hain.

ALTERNATIVE:
  mid ^ 1 partner trick bhi valid hai.
  Even-normalization version zyada visual hai.

COMPLEXITY:
  Time:  O(log n)
  Space: O(1)
```
