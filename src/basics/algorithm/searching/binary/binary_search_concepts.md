# Binary Search - Foundations

Bottom-up guide. Pehle examples dekho, phir pattern khud emerge hoga.

---

## 1. Binary Search ka real idea

Binary search ka matlab sirf "sorted array me target dhundhna" nahi hai.

Real idea yeh hai:

```txt
Search window ke andar kuch candidates bache hote hain.
Har step pe hum decide karte hain:

"mid answer ho sakta hai ya definitely nahi?"
```

Jo part definitely answer nahi ho sakta, usse hata do.

### Exact search me yeh kaise dikhta hai?

```txt
arr = [1, 3, 5, 7, 9, 11], target = 9

Before:
L               M               R
[1, 3, 5, 7, 9, 11]

mid = 5
5 < 9
```

Ab important point:

```txt
mid aur uske left wale sab 9 se chhote hain.
Toh unme answer ho hi nahi sakta.
```

After:

```txt
                L       M       R
                [7, 9, 11]
```

Window chhoti ho gayi.
Answer agar exist karta hai, toh ab isi new window me hoga.

### Boundary search me yeh kaise dikhta hai?

```txt
arr = [1, 3, 5, 7, 9], x = 6

Question:
  first index jahan arr[i] >= 6

idx:   0   1   2   3   4
val:   1   3   5   7   9
cond:  F   F   F   T   T
```

Yahan binary search ka kaam hai:

```txt
first T dhundhna
```

Agar `mid` pe `F` aaya:

```txt
toh mid aur uske left wale sab reject
```

Agar `mid` pe `T` aaya:

```txt
toh mid answer ho sakta hai
=> usse range me rakho
```

### Answer-space search me bhi same idea

```txt
Question:
  minimum ship capacity kya ho jo D days me kaam kar de?

capacity: 10  11  12  13  14  15  16
valid?     F   F   F   F   F   T   T
```

Yahan array indices nahi, possible answers search ho rahe hain.

But thinking same hai:

```txt
mid valid hai?
  haan -> smaller valid dhundho
  nahi -> bigger answer chahiye
```

### One visual memory map

```txt
EXACT SEARCH
value:   1   3   5   7   9  11
target:                  9
work:    compare arr[mid] with target

BOUNDARY SEARCH
cond:    F   F   F   T   T   T
goal:                first T

ANSWER-SPACE SEARCH
value:  10  11  12  13  14  15  16
valid:   F   F   F   F   F   T   T
goal:                        first valid
```

Dhyan do:

- Exact search me hum value dhundh rahe hote hain
- Boundary search me condition flip point dhundh rahe hote hain
- Answer-space search me valid answer value dhundh rahe hote hain

Core binary-search thinking teeno me same hai:

```txt
half eliminate karo, but proof ke saath
```

---

## 2. Binary Search tab kaam kab karta hai?

Binary search tab kaam karta hai jab search space me monotonic behavior ho.

Simple language:

```txt
Kisi point ke baad behavior flip hota hai,
aur phir wapas reverse nahi hota.
```

Typical shapes:

```txt
F F F T T T    -> first true dhundho
T T T F F F    -> last true dhundho
increasing     -> exact value search
decreasing     -> exact value search ka ulta version
```

### Sorted array kyun kaam karta hai?

Example:

```txt
arr = [1, 3, 5, 7, 9, 11], target = 9

mid = 5
5 < 9
```

Sorted hone ki wajah se hum confidently bol sakte hain:

```txt
mid ke left jo bhi hai, sab <= 5 hi honge
```

Toh:

```txt
left half definitely reject
```

Yeh confidence sorted order deta hai.

### Boundary problems me monotonicity kaise dikhti hai?

```txt
arr = [1, 3, 5, 7, 9], x = 6

cond: arr[i] >= 6 ?

F F F T T
```

Yahan flip once hua.
Isliye binary search possible hai.

### Answer-space me monotonicity kaise dikhti hai?

```txt
capacity: 10  11  12  13  14  15  16
valid?     F   F   F   F   F   T   T
```

Jab 15 valid ho gaya, toh 16 bhi valid hoga.
17 bhi valid hoga.
18 bhi valid hoga.

Toh once true, always true.

### Kab binary search fail karega?

Suppose condition aisi ho:

```txt
F T F T T
```

Ab problem dekho.

If `mid` pe `F` mila, kya left side pura reject kar sakte ho?

```txt
Nahi
```

Kyunki uske left me `T` ho sakta hai.

If `mid` pe `T` mila, kya right side pura reject kar sakte ho?

```txt
Nahi
```

Kyunki right me phir se `F` aa raha ho sakta hai.

Matlab:

```txt
half elimination safe hi nahi hai
```

### Important correction

Sorted array ek common case hai, lekin binary search ka prerequisite "sorted array" nahi hai.

Better statement:

```txt
Binary search ko monotonic search space chahiye.
```

That search space can be:

- array indices
- possible answer values
- partitions
- slope direction

### Quick failure visual

```txt
WORKS:
F F F T T T
mid pe jo mila, us basis pe ek half reject kar sakte ho

DOES NOT WORK:
F T F T T
mid pe jo mila, us basis pe safe half rejection possible nahi
```

---

## 3. Sabse pehle yeh decide karo: search kis cheez par ho raha hai?

Binary search start karne se pehle yeh sawal pucho:

```txt
Main exactly kis space par binary search kar raha hoon?
```

Yahi sawal kaafi confusion hata deta hai.

### A. Index space

```txt
0 ... n-1
```

Use when:

- exact element search
- lower bound / upper bound
- rotated array
- peak element
- kth missing ka index-boundary version

Mental model:

```txt
Main positions pe search kar raha hoon.
Har position pe ek condition evaluate ho rahi hai.
```

Example:

```txt
arr = [1, 3, 5, 7, 9], x = 6

index:  0   1   2   3   4
cond :  F   F   F   T   T
```

Yahan search indices par ho raha hai.

### B. Answer space

```txt
minPossible ... maxPossible
```

Use when:

- capacity
- speed
- days
- distance
- pages

Mental model:

```txt
Main possible answer values pe search kar raha hoon.
```

Example:

```txt
capacity: 10  11  12  13  14  15
valid?     F   F   F   F   F   T
```

Yahan hum array indices pe nahi, answer values pe search kar rahe hain.

### C. Partition space

```txt
0 ... n1
```

Use when:

- median of two sorted arrays

Mental model:

```txt
Main yeh search kar raha hoon:
smaller array se kitne elements left partition me jayenge?
```

Yeh answer-space search nahi hai.
Yeh partition search hai.

### D. Direction / slope signal

Peak element jaisi problems me search space index hi hota hai, but signal slope ka hota hai.

Example:

```txt
nums[mid] < nums[mid + 1] ?
```

Is question se hum decide karte hain:

```txt
peak right me hai ya left/mid me
```

### Search-space visual

```txt
INDEX SPACE
0   1   2   3   4   5
^ search over positions

ANSWER SPACE
10  11  12  13  14  15
^ search over possible answers

PARTITION SPACE
0   1   2   3
^ smaller array se kitne elements left partition me jayenge
```

### Recognition questions

Problem dekhte hi yeh pucho:

1. Kya main exact value/index dhundh raha hoon?
2. Kya condition indices par flip ho rahi hai?
3. Kya possible answer values par flip ho rahi hai?
4. Kya main partition size search kar raha hoon?
5. Kya main slope se direction infer kar raha hoon?

Jis sawal ka answer "haan" ho, wahi category pick karo.

---

## 4. Pattern 1 - Exact search

Use when:

```txt
Mujhe exact element chahiye.
Na mile toh -1 bhi ho sakta hai.
```

### Invariant

```txt
Agar target exist karta hai,
toh woh current [left, right] ke andar hai.
```

### Template

```txt
left = 0
right = n - 1

while (left <= right):
  mid = floor((left + right) / 2)

  if arr[mid] == target:
    return mid

  if arr[mid] < target:
    left = mid + 1
  else:
    right = mid - 1

return -1
```

### WHY `left <= right`?

Jab `left === right`, tab bhi ek candidate baki hai.
Usse check karna zaroori hai.

Loop exit tab hota hai jab:

```txt
left > right
```

Matlab:

```txt
ab koi candidate bacha hi nahi
```

### Before/after window samjho

```txt
arr = [1, 3, 5, 7, 9, 11], target = 9

Before:
L               M               R
[1, 3, 5, 7, 9, 11]

arr[mid] = 5 < 9
=> M aur uske left wale reject

After:
                L       M       R
                [7, 9, 11]
```

Aur agar `arr[mid] > target` hota:

```txt
Before:
L               M               R
[1, 3, 5, 7, 9, 11]

arr[mid] = 11 > 9
=> M aur uske right wale reject

After:
L       M       R
[1, 3, 5, 7, 9]
```

### Not-found case ka matlab

Example:

```txt
arr = [2, 5, 8, 12, 16], target = 10
```

Window shrink hote hote ek point pe:

```txt
right < left
```

Yeh binary search ki language me bolta hai:

```txt
target ke liye koi valid candidate nahi bacha
```

Isliye `-1`.

### Boundary problems bhi Pattern 1 se ho sakte hain

Example: lower bound with `result`.

```txt
valid mila?
  result save karo
  aur aur chhota valid dhundhne ke liye left side me jao
```

Yahan `right = mid - 1` safe hai because:

```txt
mid ko pehle hi result me save kar diya
```

Matlab:

```txt
mid ko next window se hata diya,
but answer ko memory me rakh liya
```

Yeh verbose hai, galat nahi.

### Exact-search memory hook

```txt
compare directly with target
mid mil gaya? return
warna ek half reject
```

---

## 5. Pattern 2 - First true / first valid

Use when:

```txt
Mujhe first index ya first value chahiye jahan condition true ho.
```

Typical examples:

- lower bound
- upper bound
- search insert position
- minimum in rotated sorted array
- minimum valid answer in answer-space problems

### Mental picture

```txt
F F F T T T
      ^
   answer
```

### Invariant

```txt
Answer current [left, right] ke andar hai.
```

### Template

```txt
while (left < right):
  mid = floor((left + right) / 2)   // lower mid

  if mid answer ho sakta hai:
    right = mid
  else:
    left = mid + 1

return left
```

### WHY `right = mid`?

Agar `mid` valid hai aur hume first valid chahiye, toh:

```txt
mid khud answer ho sakta hai
```

Isliye usse discard nahi kar sakte.

Window language me:

```txt
next range me M ko rakhna padega
```

### WHY `left = mid + 1`?

Agar `mid` invalid hai, toh:

```txt
mid definitely answer nahi hai
aur uske left wale bhi answer nahi ho sakte
```

Window language me:

```txt
next range M ke baad start hogi
```

### Concrete dry logic

```txt
arr = [1, 3, 5, 7, 9], x = 6
cond: arr[i] >= 6

index:  0   1   2   3   4
cond :  F   F   F   T   T
```

Initial:

```txt
L               M               R
0               2               4
cond[M] = F
```

Because `mid` false hai:

```txt
M aur uske left wale reject
```

After:

```txt
                L       M       R
                3       3       4
```

Next:

```txt
mid = 3
cond[M] = T
```

Ab:

```txt
M answer ho sakta hai
=> keep M
=> right = mid
```

After:

```txt
L
3
R
3
```

Answer = 3.

### WHY `return left`?

Loop tab rukta hai jab:

```txt
left === right
```

Aur invariant ke hisaab se answer usi window me hai.
Window size 1 bachi, toh wahi answer.

Exit pe `left` aur `right` same hote hain.
Convention se `left` return karte hain.

### Shrinking-window visual

```txt
cond:   F   F   F   T   T   T
        L               R

mid is T
=> keep mid
=> right = mid

cond:   F   F   F   T
                    R
                    L

mid is F
=> discard mid
=> left = mid + 1

cond:           T
                L
                R
```

### Pattern-2 memory hook

```txt
First true chahiye?
True mila -> keep mid
False mila -> skip mid
```

---

## 6. Pattern 3 - Last true / last valid

Use when:

```txt
Mujhe last index ya largest value chahiye jahan condition true ho.
```

Typical examples:

- aggressive cows
- maximum valid distance
- floor
- last occurrence

Mental picture:

```txt
T T T F F F
    ^
 answer
```

Yahan bhi do clean styles hain.

### Style A - Result-saving

```txt
while (left <= right):
  mid = floor((left + right) / 2)

  if valid(mid):
    result = mid
    left = mid + 1
  else:
    right = mid - 1

return result
```

Reason:

```txt
valid mid mila
=> possible answer mil gaya
=> store karo
=> aur right side me aur bada valid dhundho
```

### Result-saving style ka window view

```txt
T T T F F F
L       M       R

mid = T
=> result = mid
=> next window starts after M
```

Yahan `mid` next range se nikal gaya, but answer memory me bach gaya.

### Style B - Pure convergence

```txt
while (left < right):
  mid = floor((left + right + 1) / 2)   // upper mid

  if valid(mid):
    left = mid
  else:
    right = mid - 1

return left
```

Yahan `result` variable nahi hai.

Reason:

```txt
valid mid mila
=> mid last true ho sakta hai
=> keep mid inside window
=> left = mid
```

### WHY upper mid?

Suppose:

```txt
left = 2, right = 3
```

Agar lower mid loge:

```txt
mid = 2
valid => left = mid = 2
```

State same reh gayi.
Progress hi nahi hui.

Upper mid:

```txt
mid = 3
valid => left = 3
```

Ab progress hui.

### Same thing as window movement

```txt
Before:
L   R
2   3

LOWER MID:
M = 2
valid => left = 2
window unchanged

UPPER MID:
M = 3
valid => left = 3
window shrinks
```

### Rule

```txt
left = mid   likh rahe ho?
=> upper mid chahiye
```

### Lower mid vs upper mid visual

```txt
left = 2, right = 3

LOWER MID:
2 3
^
mid = 2
valid -> left = 2
same state

UPPER MID:
2 3
  ^
mid = 3
valid -> left = 3
progress
```

### Pattern-3 memory hook

```txt
Last true chahiye?
True mila -> right side me aur bada valid dekh
False mila -> mid aur right reject
```

---

## 7. `right = n` kab aur `right = n - 1` kab?

Yeh bahut important hai.

Boundary choose karne se pehle yeh pucho:

```txt
Kya answer n ho sakta hai?
```

### Case A - Answer `n` ho sakta hai

Example: lower bound / search insert

```txt
arr = [1, 3, 5], x = 10

Correct answer = 3
```

Kyun?

```txt
10 array ke sab elements se bada hai.
Toh insert position end pe hogi.
```

Matlab:

```txt
n bhi valid answer hai
```

Isliye search space me `n` ko include karna padega.

Use:

```txt
left = 0
right = n
```

### Agar galti se `right = n - 1` liya toh?

```txt
arr = [1, 3, 5], x = 10
index space only 0..2
```

Problem:

```txt
true condition kabhi milegi hi nahi
```

Because:

```txt
arr[0] >= 10 ? F
arr[1] >= 10 ? F
arr[2] >= 10 ? F
```

Lekin actual answer 3 hai.

If 3 search space me hi nahi hai, binary search correct answer tak pahunch hi nahi sakta.

### Case B - Answer actual index hi hona chahiye

Example: minimum in rotated sorted array

```txt
arr = [4, 5, 1, 2]
```

Answer:

```txt
0, 1, 2, 3 me se koi ek index
```

Yahan `n = 4` answer ho hi nahi sakta, because:

```txt
arr[4] exist hi nahi karta
```

Use:

```txt
left = 0
right = n - 1
```

### Partition search me `n1` kyun valid hai?

Median partition me hum search karte hain:

```txt
smaller array se kitne elements left partition me lenge
```

Yeh count 0 bhi ho sakta hai.
Yeh count `n1` bhi ho sakta hai.

So search space:

```txt
0 ... n1
```

### Rule

| Problem | Right boundary |
|---|---|
| Lower bound / upper bound / insert position | `n` possible |
| Exact index search | `n - 1` |
| Rotated min | `n - 1` |
| Peak element | `n - 1` |
| Partition search on smaller array | `n1` |

### Boundary visual

```txt
LOWER BOUND / INSERT POSITION
arr = [1, 3, 5], x = 10

index:  0   1   2   3
value:  1   3   5  insert-here
                    ^
                    n is valid answer

ROTATED MIN
arr = [4, 5, 1, 2]

index:  0   1   2   3
answer must be one of these real indices only
```

### Memory hook

```txt
Search space me wahi values rakho jo actual answer ban sakti hain.
```

---

## 8. Mid ko include karna hai ya exclude?

Yeh binary search ka sabse core decision hai.

Question:

```txt
Kya mid abhi bhi answer ban sakta hai?
```

### Case 1: `mid` can still be answer

Matlab:

```txt
M ko next range ke andar hi rakhna hai.
```

Examples:

- first true search me `mid` valid nikla
- minimum in rotated array me `mid` minimum ho sakta hai
- peak problem me `mid` peak ho sakta hai

Typical updates:

```txt
first true   -> right = mid
last true    -> left = mid
peak         -> right = mid
rotated min  -> right = mid
```

Visual:

```txt
Before:
L       M       R
[-------|-------]

After:
L       M
[-------]
```

Yahan:

```txt
right = mid
```

Dhyan do:

- `M` next window me ab bhi present hai
- isliye bolte hain: include mid

Another include case:

```txt
Before:
L       M       R
[-------|-------]

After:
        M       R
        [-------]
```

Yahan:

```txt
left = mid
```

Isme bhi `M` next window me present hai.

So "include" ka actual meaning:

```txt
new range still contains M
```

### Case 2: `mid` definitely answer nahi hai

Matlab:

```txt
M ko range se hata do.
```

Examples:

- first true search me `mid` invalid nikla
- exact search me `arr[mid] < target` ya `arr[mid] > target`
- last true search me `mid` invalid nikla

Typical updates:

```txt
invalid mid in first true -> left = mid + 1
invalid mid in last true  -> right = mid - 1
exact search unequal case -> one side discard
```

Visual:

```txt
Before:
L       M       R
[-------|-------]

After:
        L       R
        [-------]
```

Yahan:

```txt
left = mid + 1
```

Dhyan do:

- new window `M` ke baad start ho rahi hai
- `M` khatam ho gaya
- isliye bolte hain: exclude mid

Dusra exclude case:

```txt
Before:
L       M       R
[-------|-------]

After:
L       R
[-------]
```

Yahan:

```txt
right = mid - 1
```

Again:

- `M` next window me nahi hai

So "exclude" ka actual meaning:

```txt
new range does NOT contain M
```

### Short memory hook

```txt
include mid  -> right = mid   OR left = mid
exclude mid  -> left = mid+1  OR right = mid-1
```

### Sabse important question

Har binary search step pe bas yeh pucho:

```txt
Kya M abhi bhi answer ho sakta hai?
```

- Agar haan -> M ko rakho
- Agar nahi -> M ko hata do

---

## 9. Rotated array me do alag patterns hote hain

Rotated array problems ko ek rule se yaad mat karo.
Do common sub-patterns hote hain.

### A. Target search in rotated array

Question:

```txt
Kaunsi half sorted hai?
Target us sorted half ke range me aata hai ya nahi?
```

Example:

```txt
nums = [4, 5, 6, 7, 0, 1, 2], target = 1
```

Suppose:

```txt
left = 0, right = 6, mid = 3
nums[mid] = 7
```

Check:

```txt
nums[left] <= nums[mid]
4 <= 7
```

Matlab:

```txt
left half sorted hai
```

Ab next question:

```txt
Kya target 4 aur 7 ke beech aata hai?
```

For `target = 1`, answer:

```txt
Nahi
```

Toh sorted half ko reject kar do.

After:

```txt
left = mid + 1
window -> [0, 1, 2]
```

Yahan `nums[left]` use karna bilkul normal hai.
Koi problem nahi.

### B. Minimum in rotated array

Question:

```txt
mid pivot ke kis side me hai?
```

Example:

```txt
nums = [4, 5, 6, 7, 0, 1, 2]
```

Suppose:

```txt
left = 0, right = 6, mid = 3
nums[mid] = 7
nums[right] = 2
```

Compare:

```txt
7 > 2
```

Matlab:

```txt
mid big-half me hai
minimum right side me hai
```

So:

```txt
left = mid + 1
```

Next window:

```txt
[0, 1, 2]
```

Ab suppose:

```txt
left = 4, right = 6, mid = 5
nums[mid] = 1
nums[right] = 2
```

Compare:

```txt
1 > 2 ? no
```

Matlab:

```txt
minimum mid ya left side me hai
```

So:

```txt
right = mid
```

### Is problem me `nums[right]` cleaner kyun hai?

Is specific invariant me:

```txt
nums[mid] > nums[right]
=> minimum right side me

nums[mid] <= nums[right]
=> minimum mid ya left side me
```

Yeh signal clean hai.

### Important correction

Yeh mat yaad karo:

```txt
arr[right] safe, arr[left] wrong
```

Sahi version:

```txt
Find minimum in rotated array ke is specific invariant me,
nums[right] cleaner anchor hai.
nums[left] bhi use ho sakta hai, but then logic alag hota hai.
```

Examples of valid alternatives:

- sorted-window check: `if nums[left] < nums[right]`
- fixed anchor compare with `nums[0]`

So this is:

```txt
design choice + invariant choice
```

not universal truth.

### Rotated-array visual

```txt
ROTATED ARRAY
[4, 5, 6, 7, 0, 1, 2]
 big half      small half

TARGET SEARCH QUESTION
"Kaunsi half sorted hai?"

MINIMUM SEARCH QUESTION
"mid pivot ke kis side me hai?"
```

### Memory hook

```txt
Rotated target search:
  sorted half identify karo

Rotated minimum:
  pivot side identify karo
```

---

## 10. Peak element bhi binary search hai, but sorted-array search nahi

Peak problem me hum monotonic values nahi, monotonic direction use karte hain.

Question:

```txt
mid ke right slope upar ja rahi hai ya neeche?
```

### Case A: slope up

```txt
nums[mid] < nums[mid + 1]
```

Example:

```txt
nums = [1, 3, 5, 7, 6]
mid = 5
mid+1 = 7
```

Matlab:

```txt
window is point pe ascending hai
```

Ab important reasoning:

```txt
agar slope upar ja rahi hai,
toh right side me kahin na kahin peak milega
```

Kyun?

Do possibilities:

1. Sequence chadhti rahe till end
2. Sequence baad me kabhi neeche aaye

Case 1:

```txt
end element peak ban jaayega
```

Case 2:

```txt
jahan upar se neeche aayegi, wahi turning point peak hoga
```

Dono cases me:

```txt
peak right side me guaranteed hai
```

So:

```txt
left = mid + 1
```

### Case B: slope down

```txt
nums[mid] > nums[mid + 1]
```

Example:

```txt
nums = [1, 3, 7, 5, 2]
mid = 7
mid+1 = 5
```

Matlab:

```txt
descent start ho chuka hai
```

Toh peak:

```txt
mid par ho sakta hai
ya left side me ho sakta hai
```

Isliye:

```txt
right = mid
```

### Template

```txt
while (left < right):
  mid = floor((left + right) / 2)

  if nums[mid] < nums[mid + 1]:
    left = mid + 1
  else:
    right = mid

return left
```

### Slope visual

```txt
Case A: slope up
1   3   5   7   6
        M  M+1
        5 < 7
        peak right me

Case B: slope down
1   3   7   5   2
        M  M+1
        7 > 5
        peak mid ya left me
```

### Memory hook

```txt
Slope up?  peak right me guaranteed
Slope down? peak mid ya left me guaranteed
```

---

## 11. K-th missing positive - isko kaise socho

Natural model:

```txt
index boundary search
```

### missingCount(i) aata kahan se hai?

If koi number missing na hota, then:

```txt
index 0 pe value 1 hoti
index 1 pe value 2 hoti
index 2 pe value 3 hoti
...
index i pe value i + 1 hoti
```

Actual array me agar value usse badi hai, toh beech me kuch missing hai.

So:

```txt
missingCount(i) = actual - expected
                = arr[i] - (i + 1)
```

### Example

```txt
arr = [2, 3, 4, 7, 11]

idx 0 -> actual 2, expected 1 -> missing = 1
idx 1 -> actual 3, expected 2 -> missing = 1
idx 2 -> actual 4, expected 3 -> missing = 1
idx 3 -> actual 7, expected 4 -> missing = 3
idx 4 -> actual 11, expected 5 -> missing = 6
```

So:

```txt
missingCount = [1, 1, 1, 3, 6]
```

Yeh monotonic hai.
Isi wajah se binary search possible hai.

### If `k = 5`, binary search kya dhundhta hai?

Hume first index chahiye jahan:

```txt
missingCount(i) >= 5
```

That is:

```txt
1, 1, 1, 3, 6
            ^
     first index where missing count reached 5 or more
```

So this becomes first-true boundary search.

### Loop end pe `left` kya hota hai?

```txt
left = first index jahan missingCount >= k
```

Matlab answer `arr[left]` se pehle aata hai.

Aur `left` ka ek useful meaning hai:

```txt
answer se pehle left array elements present hain
```

### `left + k` kyun?

If `left = 4`, iska matlab:

```txt
answer se pehle 4 array elements present hain
```

Aur hume `k = 5`th missing chahiye.

Toh answer tak total count hoga:

```txt
present + missing
= left + k
```

So:

```txt
answer = left + k
```

Equivalent form:

```txt
answer = k + right + 1
```

Dono same hain.
`left + k` usually cleaner memory hook hota hai.

### Counting-strip visual

```txt
arr = [2, 3, 4, 7, 11], k = 5

value :   1  2  3  4  5  6  7  8  9 10 11
status:   M  P  P  P  M  M  P  M  M  M  P

P = present in array
M = missing

5th missing = 9
```

### Important classification

Yeh usually:

```txt
index-boundary binary search
```

ke roop me sochna best hota hai, not primary BS-on-answer.

### Memory hook

```txt
actual - expected = missing count
first index jahan missingCount >= k
answer = left + k
```

---

## 12. Median of two sorted arrays - yeh answer-space search nahi hai

Is problem me hum "answer value" search nahi kar rahe.

Hum search kar rahe hain:

```txt
smaller array se kitne elements left partition me jayenge
```

That is partition search.

### Real goal kya hai?

Arrays ko aise cut karna hai ki:

```txt
left partition me total half elements ho
aur
left partition ke sab elements <= right partition ke sab elements ho
```

### Concrete example

```txt
arr1 = [1, 3, 8]
arr2 = [7, 9, 10, 11]

total = 7
left side me 4 elements chahiye
```

Search space:

```txt
p1 = arr1 se kitne elements left me lenge
p1 can be 0..3
```

Then:

```txt
p2 = 4 - p1
```

Automatically.

### Partition ka matlab visual me

Suppose:

```txt
p1 = 2
p2 = 2
```

Then:

```txt
arr1 = [1, 3 | 8]
arr2 = [7, 9 | 10, 11]

left partition  = [1, 3, 7, 9]
right partition = [8, 10, 11]
```

Ab check:

```txt
maxLeft1 = 3
minRight1 = 8
maxLeft2 = 9
minRight2 = 10
```

For correct partition, hume chahiye:

```txt
maxLeft1 <= minRight2
maxLeft2 <= minRight1
```

Yahan:

```txt
3 <= 10   yes
9 <= 8    no
```

Problem kya hua?

```txt
arr1 se left side me humne too few liye
```

Kyun?

Because `arr2` ka left side abhi bahut bada ho gaya.
`9` abhi bhi `8` se bada hai aur wrong side me baitha hua hai.

So:

```txt
p1 ko badhao
=> low = p1 + 1
```

### Dusra broken case

Suppose:

```txt
p1 = 3
p2 = 1

arr1 = [1, 3, 8 | ]
arr2 = [7 | 9, 10, 11]
```

Check:

```txt
maxLeft1 = 8
minRight2 = 9
maxLeft2 = 7
minRight1 = +infinity
```

Actually yeh partition valid hai.

Median for odd total:

```txt
max(maxLeft1, maxLeft2) = max(8, 7) = 8
```

Answer = 8.

### Wrong-on-the-other-side case kaise dikhega?

Suppose:

```txt
arr1 = [10, 12]
arr2 = [1, 2, 3, 4, 5]
```

If `p1 = 2`, then:

```txt
arr1 = [10, 12 | ]
arr2 = [1, 2 | 3, 4, 5]
```

Check:

```txt
maxLeft1 = 12
minRight2 = 3
```

Yeh bol raha hai:

```txt
arr1 se left side me bahut zyada le liya
```

So:

```txt
p1 ko kam karo
=> high = p1 - 1
```

### Real movement rule

```txt
maxLeft1 > minRight2
=> arr1 se too many liye
=> left move in search space

maxLeft2 > minRight1
=> arr1 se too few liye
=> right move in search space
```

### Search space

```txt
0 ... n1
```

### Condition

```txt
maxLeft1 <= minRight2
maxLeft2 <= minRight1
```

### Why smaller array pe search?

Kyunki partition count wahi vary karna easy hota hai.
Range chhoti hoti hai.
Aur `p2 = requiredLeft - p1` clean rehta hai.

### Partition visual

```txt
GOOD PARTITION
[left side] | [right side]
all left <= all right

TOO MANY FROM arr1
maxLeft1 too big
=> move p1 left

TOO FEW FROM arr1
maxLeft2 too big for minRight1
=> move p1 right
```

### Important classification

This is:

```txt
partition search
```

Not:

```txt
answer-value search
```

### Memory hook

```txt
Main median value search nahi kar raha.
Main correct cut search kar raha hoon.
```

---

## 13. Pattern selection - quick mental map

Binary search dekh ke immediately template mat chuno.
Pehle yeh diagnostic questions pucho.

### Question 1

```txt
Kya mujhe exact target chahiye?
```

Agar haan:

```txt
Pattern 1
while (left <= right)
```

Reason:

```txt
mid milte hi return karna hai
```

### Question 2

```txt
Kya condition false se true flip ho rahi hai?
```

Agar haan, aur first true chahiye:

```txt
Pattern 2
while (left < right)
right = mid when mid still can be answer
```

### Question 3

```txt
Kya condition true se false flip ho rahi hai?
```

Agar haan, aur last true chahiye:

```txt
Pattern 3
result-saving
OR convergence with upper mid
```

### Question 4

```txt
Kya search possible answer values pe ho raha hai?
```

Agar haan:

```txt
binary search on answer
```

But phir bhi andar ka pattern usually Pattern 2 ya Pattern 3 hi hota hai:

- minimize -> first true
- maximize -> last true

### Question 5

```txt
Kya search partition count pe ho raha hai?
```

Agar haan:

```txt
partition search
```

Typical example:

- median of two sorted arrays

### Question 6

```txt
Kya search slope direction se chal raha hai?
```

Agar haan:

```txt
peak-element style
```

### Decision-tree visual

```txt
Exact target?
├─ YES -> Pattern 1
│        while (left <= right)
│
└─ NO
   First true / minimum valid?
   ├─ YES -> Pattern 2
   │        while (left < right)
   │        right = mid
   │
   └─ NO
      Last true / maximum valid?
      ├─ YES -> Pattern 3
      │        result-saving
      │        OR upper-mid convergence
      │
      └─ Specialized:
               rotated search / peak / partition
```

### Short selection rule

```txt
target search?
boundary search?
answer-value search?
partition search?
slope search?
```

Jis question ka answer clear hoga, template bhi clear ho jayega.

---

## 14. Common mistakes

### Mistake 1

```txt
Pattern 1 ka loop
Pattern 2 ka update
```

Example:

```txt
while (left <= right):
  if valid(mid):
    right = mid
```

Why dangerous?

```txt
left == right pe state same reh sakti hai
=> infinite loop
```

### Mistake 2

`left = mid` with lower mid.

Why dangerous?

```txt
small window me mid left hi banega
=> left move nahi karega
=> stuck
```

Fix:

```txt
upper mid use karo
```

### Mistake 3

`right = n - 1` even when answer `n` ho sakta hai.

Typical casualty:

- lower bound
- insert position

Why dangerous?

```txt
actual answer search space ke bahar chala gaya
```

### Mistake 4

Mid ko discard kar diya jab woh answer ho sakta tha.

Example:

```txt
first true search me valid mid mila
aur tumne right = mid - 1 kar diya
```

Problem:

```txt
mid khud first true ho sakta tha
tumne usse hata diya
```

Question yaad rakho:

```txt
Can mid still be the answer?
```

### Mistake 5

Har non-exact binary search ko BS-on-answer bol dena.

Wrong grouping creates weak memory.

Better grouping:

- exact search
- boundary search
- answer-space search
- partition search
- slope-based search

### Mistake 6

Ek implementation choice ko universal law samajh lena.

Examples:

- `nums[right]` vs `nums[left]`
- result-saving vs convergence
- `left + k` vs `k + right + 1`

Question yeh hona chahiye:

```txt
Is this a constraint or just a cleaner design choice?
```

### Mistake 7

Template yaad kar liya, invariant yaad nahi rakha.

Problem:

```txt
code yaad rahega
lekin new problem aate hi confusion hoga
```

Better approach:

```txt
loop se pehle invariant bolo:
"answer current kis window me guaranteed hai?"
```

### Mistake 8

Before window aur after window ko imagine nahi karna.

Problem:

```txt
updates mechanical lagte hain
```

Better:

Har update pe socho:

```txt
Before kya tha?
After kya bacha?
mid next range me hai ya nahi?
```

---

## 15. Quick memory card

Yeh section intentionally condensed hai.
Full depth upar wali sections me hai.

```txt
Binary search = monotonic search space + half elimination

Exact search:
  while (left <= right)

First true / minimum valid:
  while (left < right)
  valid -> right = mid
  invalid -> left = mid + 1

Last true / maximum valid:
  result-saving style
  OR
  while (left < right) with upper mid
  valid -> left = mid
  invalid -> right = mid - 1

If mid can still be answer:
  keep mid

If mid definitely cannot be answer:
  discard mid

If answer can be n:
  include n in search space

Rotated target search != rotated minimum logic
Kth missing = index-boundary search
Median of two sorted arrays = partition search
```
