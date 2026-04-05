# 3 Sum — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek integer array diya hai.
Humein saare **unique triplets** `[a, b, c]` dhoondhne hain jahan:

```txt
a + b + c = 0
```

Important baatein:
- Triplet ke 3 alag indices honge
- Output me value-combinations unique honi chahiye
- Triplet ke andar order matter nahi karta

```txt
[-1, 0, 1]
[0, -1, 1]
[1, 0, -1]
```

Yeh teeno same triplet hain.

Example:

```txt
nums = [-1, 0, 1, 2, -1, -4]

Valid triplets:
[-1, -1, 2]
[-1, 0, 1]
```

Answer:

```txt
[[-1, -1, 2], [-1, 0, 1]]
```

---

## STEP 2: Brute Force

Sabse seedha soch:
- Ek number `i` choose karo
- Doosra `j`
- Teesra `k`
- Agar sum `0` ho, triplet le lo

```txt
for i = 0 to n-1
  for j = i+1 to n-1
    for k = j+1 to n-1
      check nums[i] + nums[j] + nums[k]
```

Problem:
- Same values different indices se aa sakti hain
- Isliye duplicate triplets remove karne padte hain

Brute-force implementation me aam taur pe:
- found triplet ko sort karte hain
- phir Set me daalte hain

Example:

```txt
nums = [-1, 0, 1, 2, -1, -4]

i=0, j=1, k=2  -> [-1, 0, 1]
i=1, j=2, k=4  -> [0, 1, -1]  -> same values, bas order alag
```

Time complexity:
- 3 loops chal rahe hain
- roughly har triplet try hota hai
- isliye `O(n^3)`

Plain language me:
- `n = 100` ho toh triplets bahut jaldi explode karte hain
- answer 2 ho ya 20 ho, brute force ko almost sab combinations dekhne padte hain

---

## STEP 3: Key Insight

Yahan actual shift yeh hai:

```txt
a + b + c = 0
```

Agar pehla number fix kar diya:

```txt
b + c = -a
```

Matlab:
- `3-sum` ko hum `2-sum` me reduce kar sakte hain
- Har fixed `a` ke liye humein remaining array me ek pair dhoondhna hai

Pehle array sort kar lete hain:

```txt
nums = [-1, 0, 1, 2, -1, -4]
sort -> [-4, -1, -1, 0, 1, 2]
```

Ab maan lo `i = 1`, yani first number `-1` fix kar diya.

```txt
b + c = -(-1) = 1
```

Ab problem ban gaya:
- remaining part me do numbers dhoondho jinka sum `1` ho

```txt
[-4, -1, -1, 0, 1, 2]
      i   L        R
```

Yahi core insight hai:
- ek number fix karo
- remaining part ko sorted `2-sum` ki tarah solve karo

---

## STEP 4: Why This Technique Works

Sorted array me values left se right badhti hain.

Maan lo current pair-window yeh hai:

```txt
[-1, -1, 0, 1, 2]
 L               R
```

Aur humein pair sum `2` chahiye.

| `left` value | `right` value | pair sum | target | Decision | Kyun |
|---:|---:|---:|---:|---|---|
| -1 | 2 | 1 | 2 | `left++` | sum chhota hai |
| -1 | 2 | 1 | 2 | `left++` | ab bhi chhota hai |
| 0 | 2 | 2 | 2 | pair mil gaya | target hit |

Ab important logic:

- Jab current `left` aur current `right` ke saath bhi sum chhota hai,
  toh current `left` ko kisi aur chhote `right` ke saath try karna bekaar hai.
  Kyunki `right` ko left ki taraf laoge toh value aur chhoti ho jayegi.

- Isi tarah agar sum bada hota,
  toh current `right` ko kisi aur bade `left` ke saath try karna bekaar hota.
  Kyunki `left` ko right ki taraf badhane se value aur badi ho jayegi.

Isliye:
- `sum < target` -> `left++`
- `sum > target` -> `right--`

Ye random pointer movement nahi hai.
Ye sorted order ki wajah se forced movement hai.

Ek aur strong sentence:

```txt
sum chhota ho toh current left exhaust
sum bada ho toh current right exhaust
```

Isi wajah se two pointers yahan correct kaam karte hain.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `i` | triplet ka first element |
| `left` | second element dhoondhne wala pointer |
| `right` | third element dhoondhne wala pointer |
| `sum` | `nums[i] + nums[left] + nums[right]` |
| `result` | saare unique triplets |

Ek aur useful conceptual variable hai:

| Conceptual Variable | Meaning |
|---|---|
| `target` | `-nums[i]`, yani `left + right` ko itna hona chahiye |

Code direct full `sum` use kare ya `target` use kare, dono same baat bol rahe hain.

```txt
nums[i] + nums[left] + nums[right] = 0
```

Aur

```txt
nums[left] + nums[right] = -nums[i]
```

Dono equivalent hain.

---

## STEP 6: Mental Model

Is problem ko aise socho:

```txt
Har i ke liye ek shrinking pair-window chal rahi hai.
```

Visual:

```txt
[-4, -1, -1, 0, 1, 2]
      i   L           R
```

- `i` fix hai
- `[left ... right]` current search window hai
- Har step me ya toh ek `left` value exhaust hoti hai
- ya ek `right` value exhaust hoti hai

Matlab hum random search nahi kar rahe.
Hum impossible combinations ko systematically cut kar rahe hain.

Ek aur strong mental model:

```txt
current pair = current boundary pair
```

Yani hum hamesha current window ka outermost pair check karte hain.

- Agar yeh pair too small hai -> left boundary weak hai -> `left++`
- Agar yeh pair too big hai -> right boundary heavy hai -> `right--`
- Agar exact mil gaya -> triplet add karo, duplicate values skip karo, next distinct pair pe jao

`3-sum` ko yaad rakhne ka best sentence:

```txt
Fix one number, baaki window me sorted 2-sum chalao.
```

---

## STEP 7: Boundary Cases

### Case 1: 3 se kam elements

```txt
nums = [1, 2]
```

Triplet ban hi nahi sakta.
Answer `[]`.

### Case 2: All zeros

```txt
nums = [0, 0, 0, 0]
```

Valid unique answer sirf ek hai:

```txt
[[0, 0, 0]]
```

Duplicate zeros ki wajah se same triplet baar baar mil sakta tha,
isliye duplicate skipping important hai.

### Case 3: Sab positive

Sorted array me agar current `i` bhi positive hai, toh aage saare numbers bhi positive honge.

```txt
[1, 2, 3, 4]
```

3 positive numbers ka sum `0` nahi ban sakta.

### Case 4: Sab negative

```txt
[-5, -4, -3, -2]
```

3 negative numbers ka sum `0` nahi ban sakta.

### Case 5: Current `i` ke saath bhi answer impossible

Sorted array me do quick checks useful hote hain:

- current `i` ke saath smallest possible sum bhi `0` se bada hai
  -> aage break kar do

- current `i` ke saath largest possible sum bhi `0` se chhota hai
  -> bas is `i` ko skip kar do

Example:

```txt
nums = [-4, -1, -1, 0, 1, 2]
i = 3, nums[i] = 0

smallest possible sum from here:
0 + 1 + 2 = 3
```

Ab yahan se sum sirf aur bada hoga.
Toh break.

---

## STEP 8: Conditions

### Condition 1: duplicate `i` skip

```ts
if (i > 0 && nums[i] === nums[i - 1]) continue;
```

Meaning:
- same first value already previous iteration me process ho chuki
- same value ko dobara first element banaoge toh duplicate triplets banenge

Important nuance:
- unique output chahiye
- is sorted two-pointer implementation me duplicate `i` skip karke hum Set ke bina uniqueness maintain karte hain

### Condition 2: current `i` too large

```ts
if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;
```

Meaning:
- current `i` ke saath sabse chhota possible triplet bhi already positive hai
- aage numbers aur bade honge
- isliye answer future me bhi nahi milega

### Condition 3: current `i` too small

```ts
if (nums[i] + nums[n - 2] + nums[n - 1] < 0) continue;
```

Meaning:
- current `i` ke saath sabse bada possible triplet bhi abhi negative hai
- is `i` se kuch nahi milega
- next `i` try karo

### Condition 4: `sum < 0`

```ts
left++;
```

Meaning:
- total chhota hai
- humein bigger number chahiye
- sorted array me bigger value right side pe milegi

### Condition 5: `sum > 0`

```ts
right--;
```

Meaning:
- total bada hai
- humein smaller number chahiye
- sorted array me smaller value left side pe milegi

### Condition 6: `sum === 0`

```ts
result.push([nums[i], nums[left], nums[right]]);
```

Meaning:
- valid triplet mil gaya
- ab duplicates skip karo
- phir next distinct pair dhoondho

---

## STEP 9: Adjustment Logic

Ye section sabse important hai, kyunki yahin se implementation obvious lagne lagta hai.

### 1. Duplicate `i` kyun skip karte hain

```txt
nums = [-1, -1, 0, 1, 2]
```

Agar `i=0` pe `-1` ko first number banake saare pairs dekh liye,
toh `i=1` pe same `-1` ko first number banane se wohi value-combinations dobara aayenge.

Isliye:

```txt
same first value -> same triplet family -> skip
```

### 2. Found hone ke baad duplicate `left` / `right` kyun skip karte hain

Example:

```txt
nums = [-2, 0, 0, 0, 2, 2]
         i  L        R
```

Current triplet:

```txt
-2 + 0 + 2 = 0
```

Mil gaya `[-2, 0, 2]`.

Agar ab turant sirf ek step inward jao,
toh next `left` bhi `0` ho sakta hai aur next `right` bhi `2` ho sakta hai.
Phir wahi triplet dobara banega.

Isliye found hone ke baad pehle same values skip karte hain.

| Current value | Next same value ka risk | Action |
|---|---|---|
| `nums[left] = 0` | same `0` se wahi triplet | duplicate `left` values skip |
| `nums[right] = 2` | same `2` se wahi triplet | duplicate `right` values skip |

### 3. Found hone ke baad dono pointers move kyun karte hain

Yahan sahi mental model:

- current value-combination ka kaam khatam
- triplet result me add ho chuka
- duplicate values skip bhi ho gayi
- ab next distinct pair try karna hai

Isliye:

```txt
left++
right--
```

Real baat yeh hai ki current pair exhaust ho chuka hai.

### 4. Window kaise shrink hoti hai

Har iteration me 3 possibilities:

| Situation | Window se kya remove hota hai | Next move |
|---|---|---|
| `sum < 0` | current `left` value useless hai | `left++` |
| `sum > 0` | current `right` value useless hai | `right--` |
| `sum === 0` | current pair consume ho gaya | duplicate skip, then both move |

Yani har step me window chhoti hoti hai.
Isliye inner loop linear rehta hai.

---

## STEP 10: Answer Formula

Is problem me closed-form formula nahi hai.
Yahan "answer formula" ka matlab answer build karne ka repeatable pattern hai.

### Algorithm

1. Array sort karo
2. `i` ko first element ki tarah loop karo
3. Agar current `i` previous `i` jaisa hai, skip karo
4. Early break / early continue checks lagao
5. `left = i + 1`, `right = n - 1`
6. Jab tak `left < right`:
   - `sum = nums[i] + nums[left] + nums[right]`
   - `sum < 0` -> `left++`
   - `sum > 0` -> `right--`
   - `sum === 0` -> triplet add karo, duplicate `left` skip karo, duplicate `right` skip karo, phir both move karo

### Why complexity `O(n^2)` hai

- Sorting ek baar hota hai -> `O(n log n)`
- Outer loop lagbhag `n` baar chalta hai
- Har fixed `i` ke liye `left` aur `right` sirf andar ki taraf move karte hain
- Inner loop me same pair dobara revisit nahi hota
- Isliye per `i` total pointer movement `O(n)` hai

Total:

```txt
O(n) outer loop * O(n) pointer sweep = O(n^2)
```

Sorting ka `O(n log n)` isse chhota hai, isliye final time `O(n^2)`.

### Space complexity

- Extra HashSet use nahi ho raha
- Sort in-place maana gaya hai
- Result array ko usually complexity me alag count karte hain

So extra space:

```txt
O(1)
```

### Approach comparison

| Approach | Idea | Time | Extra Space |
|---|---|---:|---:|
| Brute Force | 3 loops + Set | `O(n^3)` | depends on unique triplets |
| Better | fix `i`, inner HashSet | `O(n^2)` | `O(n)` |
| Optimal | sort + two pointers | `O(n^2)` | `O(1)` |

---

## STEP 11: Full Dry Run

### Example 1

```txt
nums = [-1, 0, 1, 2, -1, -4]
sorted = [-4, -1, -1, 0, 1, 2]
```

#### `i = 0`, `nums[i] = -4`

| Check | Result |
|---|---|
| `nums[i] + nums[n - 2] + nums[n - 1] = -4 + 1 + 2` | `-1 < 0` |
| Decision | current `i` too small, so `continue` |

#### `i = 1`, `nums[i] = -1`

| `left` | `right` | Values | Sum | Action | Result so far |
|---:|---:|---|---:|---|---|
| 2 | 5 | `(-1, -1, 2)` | 0 | triplet mila, add karo | `[[-1, -1, 2]]` |
| 2 | 5 | duplicate check | - | next left `0` hai, next right `1` hai -> no duplicate | `[[-1, -1, 2]]` |
| 3 | 4 | `(-1, 0, 1)` | 0 | triplet mila, add karo | `[[-1, -1, 2], [-1, 0, 1]]` |

Ab `left = 4`, `right = 3`.
Window khatam.

#### `i = 2`, `nums[i] = -1`

| Check | Result |
|---|---|
| `nums[2] === nums[1]` | yes -> duplicate `i`, skip |

#### `i = 3`, `nums[i] = 0`

| Check | Result |
|---|---|
| `nums[i] + nums[i + 1] + nums[i + 2] = 0 + 1 + 2` | `3 > 0` |
| Decision | current `i` already too large, so `break` |

Final answer:

```txt
[[-1, -1, 2], [-1, 0, 1]]
```

### Example 2

```txt
nums = [0, 0, 0, 0]
sorted = [0, 0, 0, 0]
```

#### `i = 0`, `nums[i] = 0`

| `left` | `right` | Values | Sum | Action | Result so far |
|---:|---:|---|---:|---|---|
| 1 | 3 | `(0, 0, 0)` | 0 | triplet mila, add karo | `[[0, 0, 0]]` |
| 1 | 3 | duplicate check | - | duplicate left zeros skip, duplicate right zeros skip | `[[0, 0, 0]]` |

Skip ke baad pointers cross kar jaate hain.
Inner loop khatam.

#### `i = 1`

| Check | Result |
|---|---|
| `nums[1] === nums[0]` | yes -> skip |

Final answer:

```txt
[[0, 0, 0]]
```

---

## STEP 12: Quick Reference

```txt
CORE IDEA
Sort karo.
Ek number fix karo.
Baaki part me 2-sum chalao.

MENTAL MODEL
Har i ke liye left-right window shrink hoti hai.
sum < 0  -> current left exhaust
sum > 0  -> current right exhaust
sum = 0  -> triplet add, duplicates skip, next distinct pair

DUPLICATES
duplicate i skip
duplicate left skip after found
duplicate right skip after found

EARLY CHECKS
smallest possible sum > 0 -> break
largest possible sum < 0  -> continue

COMPLEXITY
Brute  -> O(n^3)
Better -> O(n^2), O(n)
Optimal -> O(n^2), O(1)

ONE-LINE MEMORY
3-sum = sorted array me repeated 2-sum
```
