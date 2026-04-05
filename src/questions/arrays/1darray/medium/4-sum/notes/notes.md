# 4 Sum — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek integer array `nums` diya hai aur ek `target` diya hai.
Humein saare **unique quadruplets** dhoondhne hain jahan:

```txt
a + b + c + d = target
```

Important baatein:
- 4 alag indices honge
- output me duplicate value-combinations nahi aani chahiye
- quadruplet ke andar order matter nahi karta

Example:

```txt
nums   = [1, 0, -1, 0, -2, 2]
target = 0

Valid answers:
[-2, -1, 1, 2]
[-2, 0, 0, 2]
[-1, 0, 0, 1]
```

Answer:

```txt
[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

Yahan 2 cheezein saath me handle karni hain:
- sum exactly `target` ho
- duplicates na aayein

---

## STEP 2: Brute Force

Sabse seedha approach:
- pehla number choose karo
- doosra number choose karo
- teesra number choose karo
- chautha number choose karo
- sum check karo

```txt
for i
  for j
    for k
      for l
        check nums[i] + nums[j] + nums[k] + nums[l]
```

Problem:
- 4 loops bahut heavy hain
- duplicate quadruplets bhi mil sakte hain

Example:

```txt
[1, 0, -1, 0, -2, 2]
```

Same values alag index combinations se mil sakti hain.
Isliye brute force me usually:
- quadruplet sort karte hain
- Set me daalte hain

Time complexity:

```txt
O(n^4)
```

Plain language me:
- `n = 100` ho toh combinations bahut jaldi explode karte hain
- even agar answer bahut chhota ho, loops ko phir bhi bahut zyada work karna padta hai

---

## STEP 3: Key Insight

Actual shift yeh hai:

```txt
a + b + c + d = target
```

Agar `a` aur `b` fix kar diye, toh:

```txt
c + d = target - (a + b)
```

Yani 4-sum ko hum aise dekh sakte hain:

```txt
Fix 2 numbers
Baaki problem = 2-sum
```

Yehi poora breakthrough hai.

Example:

```txt
nums   = [1, 0, -1, 0, -2, 2]
target = 0
sort -> [-2, -1, 0, 0, 1, 2]
```

Maan lo:

```txt
i = -2
j = 0
```

Ab bacha:

```txt
left + right = 0 - (-2 + 0) = 2
```

Toh ab remaining part me do numbers dhoondhne hain jinka sum `2` ho.

Yani:

```txt
4-sum  ->  fix 2  ->  remaining 2-sum
```

---

## STEP 4: Why This Technique Works

Sorted array me pair search karna easy hota hai.

Maan lo current situation:

```txt
[-2, 0, 0, 1, 2]
      j  L     R
```

Aur remaining target `2` hai.

| `left` value | `right` value | pair sum | needed | Decision | Kyun |
|---:|---:|---:|---:|---|---|
| 0 | 2 | 2 | 2 | pair mil gaya | exact hit |

Ab ek aur example:

```txt
[-1, 0, 0, 1, 2]
     j  L     R
```

Remaining target `1` hai.

| `left` value | `right` value | pair sum | needed | Decision | Kyun |
|---:|---:|---:|---:|---|---|
| 0 | 2 | 2 | 1 | `right--` | sum bada hai |
| 0 | 1 | 1 | 1 | pair mil gaya | exact hit |

Yahan rule same hai jo sorted 2-sum me hota hai:

- pair sum chhota ho -> `left++`
- pair sum bada ho -> `right--`

Kyun?

- `left` ko right ki taraf badhaoge -> value badi hogi
- `right` ko left ki taraf laoge -> value chhoti hogi

Toh once `i` aur `j` fix ho gaye,
inner problem bilkul sorted 2-sum ban jaati hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `i` | first number |
| `j` | second number |
| `left` | third number pointer |
| `right` | fourth number pointer |
| `currentSum` | `nums[i] + nums[j] + nums[left] + nums[right]` |
| `result` | saare unique quadruplets |

Ek conceptual variable aur soch sakte ho:

| Conceptual Variable | Meaning |
|---|---|
| `remainingTarget` | `target - (nums[i] + nums[j])` |

Code chahe full `currentSum` compare kare
ya `left + right` ko `remainingTarget` se compare kare,
dono same baat hain.

```txt
nums[i] + nums[j] + nums[left] + nums[right] = target
```

aur

```txt
nums[left] + nums[right] = target - (nums[i] + nums[j])
```

Equivalent hain.

---

## STEP 6: Mental Model

Is problem ko aise socho:

```txt
Outer layer: i choose karo
Second layer: j choose karo
Inner layer: left-right window shrink karo
```

Visual:

```txt
[-2, -1, 0, 0, 1, 2]
  i   j  L        R
```

Yani 3 layers ki thinking:

1. `i` ek answer family choose karta hai
2. `j` us family ke andar sub-family choose karta hai
3. `left-right` remaining exact pair dhoondhte hain

Inner window ke liye strong mental model:

```txt
current pair = current boundary pair
```

Agar boundary pair ke saath:
- sum chhota hai -> current `left` weak hai
- sum bada hai -> current `right` heavy hai
- sum exact hai -> current pair consume ho gaya

Aur kyunki array sorted hai,
ye movement guess nahi hai, forced movement hai.

Short memory line:

```txt
4-sum = do numbers fix karo, baaki sorted 2-sum chalao
```

---

## STEP 7: Boundary Cases

### Case 1: 4 se kam elements

```txt
nums = [1, 2, 3]
```

Quadruplet possible hi nahi.
Answer `[]`.

### Case 2: All same values

```txt
nums = [2, 2, 2, 2, 2]
target = 8
```

Valid unique answer sirf ek:

```txt
[[2, 2, 2, 2]]
```

Duplicate skipping yahan critical hai.

### Case 3: All zeros

```txt
nums = [0, 0, 0, 0, 0]
target = 0
```

Again answer sirf ek:

```txt
[[0, 0, 0, 0]]
```

### Case 4: Current `i` se hi answer impossible

Sorted array me:

- current `i` ke saath smallest possible 4-sum bhi target se bada ho
  -> break

- current `i` ke saath largest possible 4-sum bhi target se chhota ho
  -> continue

Example:

```txt
nums   = [-2, -1, 0, 0, 1, 2]
target = 0
i = -2
largest with i = -2 + 0 + 1 + 2 = 1
```

Yahan possible hai, so continue searching.

But agar:

```txt
i = -10
largest with i bhi negative hi rahe
```

Toh current `i` hopeless hai.

### Case 5: Current `j` se answer impossible

`i` fix hone ke baad `j` ke liye bhi same idea lagta hai:

- current `j` ke saath smallest possible sum target se bada ho
  -> current `j` loop me break

- current `j` ke saath largest possible sum target se chhota ho
  -> current `j` skip

---

## STEP 8: Conditions

### Condition 1: duplicate `i` skip

```ts
if (i > 0 && nums[i] === nums[i - 1]) continue;
```

Meaning:
- same first value already process ho chuki
- dobara same `i` value se same quadruplet families aayengi

### Condition 2: `smallestWithI > target`

```ts
const smallestWithI = nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3];
if (smallestWithI > target) break;
```

Meaning:
- current `i` ke saath sabse chhota possible sum bhi already target se bada hai
- aage `i` aur bade honge
- toh future me bhi answer nahi milega

### Condition 3: `largestWithI < target`

```ts
const largestWithI = nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1];
if (largestWithI < target) continue;
```

Meaning:
- current `i` ke saath sabse bada possible sum bhi target se chhota hai
- current `i` bahut chhota hai
- next `i` try karo

### Condition 4: duplicate `j` skip

```ts
if (j > i + 1 && nums[j] === nums[j - 1]) continue;
```

Meaning:
- same second value already process ho chuki
- same `i` ke andar same `j` value se duplicate quadruplets milengi

### Condition 5: `smallestWithIJ > target`

```ts
const smallestWithIJ = nums[i] + nums[j] + nums[j + 1] + nums[j + 2];
if (smallestWithIJ > target) break;
```

Meaning:
- current `i` aur `j` ke saath sabse chhota possible total bhi bada hai
- is `j` ke baad aur bade values hi aayenge
- so current `j` loop me break

### Condition 6: `largestWithIJ < target`

```ts
const largestWithIJ = nums[i] + nums[j] + nums[n - 2] + nums[n - 1];
if (largestWithIJ < target) continue;
```

Meaning:
- current `i` aur `j` ke saath sabse bada possible total bhi chhota hai
- is `j` se kuch nahi milega
- next `j` try karo

### Condition 7: `currentSum < target`

```ts
left++;
```

Meaning:
- total chhota hai
- bigger number chahiye
- sorted array me bigger value right side pe milegi

### Condition 8: `currentSum > target`

```ts
right--;
```

Meaning:
- total bada hai
- smaller number chahiye
- sorted array me smaller value left side pe milegi

### Condition 9: `currentSum === target`

```ts
result.push([nums[i], nums[j], nums[left], nums[right]]);
```

Meaning:
- valid quadruplet mil gaya
- ab duplicates skip karo
- phir next distinct pair try karo

---

## STEP 9: Adjustment Logic

Yeh section implementation ko actually obvious banata hai.

### 1. Duplicate `i` kyun skip hota hai

```txt
nums = [-2, -2, -1, 0, 1, 2]
```

Agar pehla `-2` first number banake search kar liya,
toh doosra `-2` ko first number banake wahi family dobara milegi.

Isliye:

```txt
same first value -> same outer family -> skip
```

### 2. Duplicate `j` kyun skip hota hai

Same `i` ke andar agar `j` same value hai,
toh remaining `left-right` search bhi wohi value family produce karegi.

Isliye:

```txt
same i + same j value -> same sub-family -> skip
```

### 3. Found hone ke baad duplicate `left/right` kyun skip karte hain

Example:

```txt
nums = [-2, 0, 0, 0, 2, 2]
```

Agar current answer `[-2, 0, 0, 2]` mil gaya,
toh next `left` bhi `0` ho sakta hai aur next `right` bhi `2` ho sakta hai.
Phir same answer dobara ban jayega.

Isliye found hone ke baad pehle duplicate values skip karte hain.

| Current value | Duplicate ka risk | Action |
|---|---|---|
| `nums[left] = 0` | same `0` se same quadruplet | duplicate left skip |
| `nums[right] = 2` | same `2` se same quadruplet | duplicate right skip |

### 4. Found hone ke baad dono pointers move kyun karte hain

Sahi mental model:

- current boundary pair ka kaam khatam
- quadruplet result me add ho gaya
- duplicate values skip bhi ho gayi
- ab next distinct pair try karna hai

Isliye:

```txt
left++
right--
```

Main point optimization nahi hai.
Main point hai: current pair exhaust ho chuka hai.

### 5. `break` aur `continue` kyun alag hain

| Situation | Action | Kyun |
|---|---|---|
| smallest possible sum already bada | `break` | aage aur bade hi milenge |
| largest possible sum bhi chhota | `continue` | current fixed choice hopeless hai, next bigger choice try karo |

Yeh `i` level pe bhi lagta hai aur `j` level pe bhi.

---

## STEP 10: Answer Formula

Is problem me closed-form formula nahi hai.
Yahan "answer formula" ka matlab answer build karne ka repeatable pattern hai.

### Algorithm

1. Array sort karo
2. `i` loop chalao
3. Duplicate `i` skip karo
4. `i` ke liye min/max pruning checks lagao
5. `j` loop chalao
6. Duplicate `j` skip karo
7. `j` ke liye min/max pruning checks lagao
8. `left = j + 1`, `right = n - 1`
9. Jab tak `left < right`:
   - `currentSum < target` -> `left++`
   - `currentSum > target` -> `right--`
   - `currentSum === target` -> answer add karo, duplicate `left/right` skip karo, phir both move karo

### Why complexity `O(n^3)` hai

- Sorting ek baar hota hai -> `O(n log n)`
- `i` loop roughly `O(n)`
- Har `i` ke andar `j` loop roughly `O(n)`
- Har fixed `(i, j)` ke liye `left-right` sweep linear hota hai -> `O(n)`

Total:

```txt
O(n) * O(n) * O(n) = O(n^3)
```

Sorting ka `O(n log n)` isse chhota hai,
isliye final time `O(n^3)` hi rahega.

### Space complexity

- Extra HashSet nahi use ho raha
- sort in-place maana gaya hai
- result array ko usually alag count karte hain

So extra space:

```txt
O(1)
```

### Approach comparison

| Approach | Idea | Time | Extra Space |
|---|---|---:|---:|
| Brute Force | 4 loops + Set | `O(n^4)` | depends on unique quadruplets |
| Better | fix 2, then HashSet pair search | `O(n^3)` | `O(n)` |
| Optimal | sort + fix 2 + two pointers | `O(n^3)` | `O(1)` |

---

## STEP 11: Full Dry Run

### Example

```txt
nums   = [1, 0, -1, 0, -2, 2]
target = 0
sorted = [-2, -1, 0, 0, 1, 2]
```

### `i = 0`, `nums[i] = -2`

#### `j = 1`, `nums[j] = -1`

| `left` | `right` | Values | `currentSum` | Action | Result so far |
|---:|---:|---|---:|---|---|
| 2 | 5 | `(-2, -1, 0, 2)` | -1 | sum chhota, `left++` | `[]` |
| 3 | 5 | `(-2, -1, 0, 2)` | -1 | sum chhota, `left++` | `[]` |
| 4 | 5 | `(-2, -1, 1, 2)` | 0 | FOUND | `[[-2, -1, 1, 2]]` |

Ab `left = 5`, `right = 4`.
Current `j` done.

#### `j = 2`, `nums[j] = 0`

| `left` | `right` | Values | `currentSum` | Action | Result so far |
|---:|---:|---|---:|---|---|
| 3 | 5 | `(-2, 0, 0, 2)` | 0 | FOUND | `[[-2, -1, 1, 2], [-2, 0, 0, 2]]` |

Ab pointers cross ho gaye.

#### `j = 3`

| Check | Result |
|---|---|
| `nums[3] === nums[2]` | yes -> duplicate `j`, skip |

### `i = 1`, `nums[i] = -1`

#### `j = 2`, `nums[j] = 0`

| `left` | `right` | Values | `currentSum` | Action | Result so far |
|---:|---:|---|---:|---|---|
| 3 | 5 | `(-1, 0, 0, 2)` | 1 | sum bada, `right--` | `[[-2, -1, 1, 2], [-2, 0, 0, 2]]` |
| 3 | 4 | `(-1, 0, 0, 1)` | 0 | FOUND | `[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]` |

### `i = 2`, `nums[i] = 0`

| Check | Result |
|---|---|
| smallest possible sum `0 + 0 + 1 + 2` | `3 > 0` |
| Decision | break |

Final answer:

```txt
[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

---

## STEP 12: Quick Reference

```txt
CORE IDEA
4-sum ko direct mat socho.
Do numbers fix karo.
Baaki problem sorted 2-sum ban jaati hai.

MENTAL MODEL
i chooses outer family
j chooses sub-family
left-right remaining pair dhoondhte hain

DUPLICATES
duplicate i skip
duplicate j skip
found hone ke baad duplicate left skip
found hone ke baad duplicate right skip

PRUNING
smallest possible sum > target -> break
largest possible sum < target  -> continue

COMPLEXITY
Brute  -> O(n^4)
Better -> O(n^3), O(n)
Optimal -> O(n^3), O(1)

ONE-LINE MEMORY
4-sum = fix 2 numbers + run sorted 2-sum
```
