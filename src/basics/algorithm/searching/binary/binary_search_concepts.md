# Binary Search — Foundations

Bottom-up guide. Pehle examples dekho, phir pattern khud emerge hoga.

---

## 1. Binary Search ka real idea

Binary search ka matlab sirf "sorted array me target dhundhna" nahi hai.

Real idea yeh hai:

```txt
Search space ko 2 hisson me baant sakte ho:

left side  -> definitely answer nahi
right side -> answer ho sakta hai
```

Har iteration me hum yeh decide karte hain:

```txt
mid answer ho sakta hai ya definitely nahi?
```

Jo half impossible hai, usse hata do.

### Example A — Exact search

```txt
arr = [1, 3, 5, 7, 9, 11], target = 9

mid = 5
5 < 9
=> mid aur uske left sab impossible
=> right half me jao
```

### Example B — Lower bound

```txt
arr = [1, 3, 5, 7, 9], x = 6

Question:
  first index jahan arr[i] >= 6

idx:   0   1   2   3   4
val:   1   3   5   7   9
cond:  F   F   F   T   T

Hume first T chahiye.
```

### Example C — Answer space

```txt
Question:
  minimum ship capacity kya ho jo D days me kaam kar de?

capacity: 10  11  12  13  14  15  16
valid?     F   F   F   F   F   T   T

Hume first T chahiye.
```

Dhyan do:

- Exact search me hum value dhundh rahe hote hain
- Lower bound me first true dhundh rahe hote hain
- Answer-space me minimum valid answer dhundh rahe hote hain

Core binary-search thinking in teeno me same hai.

---

## 2. Binary Search tab kaam kab karta hai?

Binary search tab kaam karta hai jab search space me monotonic behavior ho.

Simple language:

```txt
Kisi point ke baad behavior change hota hai,
aur phir wapas reverse nahi hota.
```

Typical shapes:

```txt
F F F T T T    -> first true dhundho
T T T F F F    -> last true dhundho
increasing     -> exact value search
decreasing     -> same idea, bas conditions ulta socho
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

---

## 3. Sabse pehle yeh decide karo: search kis cheez par ho raha hai?

Binary search start karne se pehle yeh sawal pucho:

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

### C. Partition space

```txt
smaller array se kitne elements left partition me lenge?
```

Use when:

- median of two sorted arrays

Yeh answer-space search nahi hai.
Yeh partition search hai.

---

## 4. Pattern 1 — Exact search

Use when:

```txt
Mujhe exact element chahiye.
Na mile toh -1 bhi ho sakta hai.
```

### Invariant

```txt
Agar target exist karta hai, toh woh current [left, right] ke andar hai.
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

Yani koi candidate nahi bacha.

### Boundary problems bhi Pattern 1 se ho sakte hain

Example: lower bound with `result`.

```txt
valid mila?
  result save karo
  aur aur chhota valid dhundhne ke liye left side me jao
```

Is style me:

- `right = mid - 1` safe hai
- kyunki valid answer pehle hi `result` me save kar diya

Yeh verbose hai, galat nahi.

---

## 5. Pattern 2 — First true / first valid

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

### WHY `left = mid + 1`?

Agar `mid` invalid hai, toh:

```txt
mid definitely answer nahi hai
aur uske left wale bhi answer nahi ho sakte
```

Isliye `mid` ko skip karna safe hai.

### WHY `return left`?

Loop tab rukta hai jab:

```txt
left === right
```

Aur invariant ke hisaab se answer usi window me hai.
Window size 1 bachi, toh wahi answer.

Exit pe `left` aur `right` same hote hain.
Convention se `left` return karte hain.

---

## 6. Pattern 3 — Last true / last valid

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

Iske do clean styles hain.

### Style A — Result-saving

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

Yeh simple aur practical hai.

### Style B — Pure convergence

```txt
while (left < right):
  mid = floor((left + right + 1) / 2)   // upper mid

  if valid(mid):
    left = mid
  else:
    right = mid - 1

return left
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
Infinite loop.

Upper mid:

```txt
mid = 3
valid => left = 3
```

Ab progress hui.

### Rule

```txt
left = mid   likh rahe ho?
=> upper mid chahiye
```

---

## 7. `right = n` kab aur `right = n - 1` kab?

Yeh bahut important hai.

Boundary choose karne se pehle yeh pucho:

```txt
Kya answer n ho sakta hai?
```

### Case A — Answer `n` ho sakta hai

Example: lower bound / search insert

```txt
arr = [1, 3, 5], x = 10

Answer = 3
```

Yeh valid insert position hai.
Isliye search space me `n` ko include karna padega.

Use:

```txt
left = 0
right = n
```

### Case B — Answer actual index hi hona chahiye

Example: minimum in rotated sorted array

Answer array ke kisi real index par hi hoga.

Use:

```txt
left = 0
right = n - 1
```

### Rule

| Problem | Right boundary |
|---|---|
| Lower bound / upper bound / insert position | `n` possible |
| Exact index search | `n - 1` |
| Rotated min | `n - 1` |
| Peak element | `n - 1` |
| Partition search on smaller array | `n1` |

---

## 8. Mid ko include karna hai ya exclude?

Yeh binary search ka sabse core decision hai.

Question:

```txt
Kya mid abhi bhi answer ban sakta hai?
```

### If YES

mid ko range me rakho.

Examples:

```txt
first true   -> right = mid
last true    -> left = mid
peak         -> right = mid
rotated min  -> right = mid
```

### If NO

mid ko discard karo.

Examples:

```txt
invalid mid in first true -> left = mid + 1
invalid mid in last true  -> right = mid - 1
exact search unequal case -> one side discard
```

Agar is question ka answer clear hai, update bhi clear hai.

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

Typical check:

```txt
if nums[left] <= nums[mid]:
  left half sorted
else:
  right half sorted
```

Yahan `nums[left]` use karna bilkul normal hai.
Koi problem nahi.

### B. Minimum in rotated array

Question:

```txt
mid pivot ke kis side me hai?
```

Is problem ke ek clean invariant me:

```txt
compare nums[mid] with nums[right]
```

Reason:

- `right` moving anchor hote hue bhi current invariant me stable signal deta hai
- `nums[mid] > nums[right]` means minimum right side me hai
- warna minimum `mid` ya left side me hai

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

---

## 10. Peak element bhi binary search hai, but sorted-array search nahi

Peak problem me hum monotonic values nahi, monotonic direction use karte hain.

Example:

```txt
nums = [1, 3, 5, 4, 2]

mid = 5
nums[mid] > nums[mid + 1]
=> slope neeche ja rahi hai
=> ek peak mid pe ya left side me hona hi hai
```

Agar:

```txt
nums[mid] < nums[mid + 1]
```

toh slope upar ja rahi hai, peak right side me zaroor milega.

Isliye template:

```txt
while (left < right):
  mid = floor((left + right) / 2)

  if nums[mid] < nums[mid + 1]:
    left = mid + 1
  else:
    right = mid

return left
```

---

## 11. K-th missing positive — isko kaise socho

Natural model:

```txt
index boundary search
```

Define:

```txt
missingCount(i) = arr[i] - (i + 1)
```

Yeh batata hai index `i` tak kitne positives missing ho chuke hain.

Example:

```txt
arr = [2, 3, 4, 7, 11]

idx 0 -> 2 - 1 = 1
idx 1 -> 3 - 2 = 1
idx 2 -> 4 - 3 = 1
idx 3 -> 7 - 4 = 3
idx 4 -> 11 - 5 = 6
```

If `k = 5`, hume first index chahiye jahan:

```txt
missingCount(i) >= 5
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

Isliye:

```txt
answer = left + k
```

Equivalent form:

```txt
answer = k + right + 1
```

Dono same hain.
`left + k` usually cleaner memory hook hota hai.

### Important classification

Yeh usually:

```txt
index-boundary binary search
```

ke roop me sochna best hota hai, not primary BS-on-answer.

---

## 12. Median of two sorted arrays — yeh answer-space search nahi hai

Is problem me hum "answer value" search nahi kar rahe.

Hum search kar rahe hain:

```txt
smaller array se kitne elements left partition me jayenge
```

That is partition search.

Search space:

```txt
0 ... n1
```

Condition:

```txt
maxLeft1 <= minRight2
maxLeft2 <= minRight1
```

So binary search ka principle same hai:

```txt
partition left lo ya right?
```

But category answer-space nahi hai.

---

## 13. Pattern selection — quick mental map

Question 1:

```txt
Exact target chahiye?
```

YES:

```txt
Pattern 1
while (left <= right)
```

NO:

Question 2:

```txt
First true / minimum valid chahiye?
```

YES:

```txt
Pattern 2
while (left < right)
right = mid when mid can still be answer
```

NO:

Question 3:

```txt
Last true / maximum valid chahiye?
```

YES:

```txt
Pattern 3
either result-saving
or convergence with upper mid
```

Specialized but same idea:

- rotated target search
- peak element
- partition search

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

Yeh infinite loop de sakta hai.

### Mistake 2

`left = mid` with lower mid.

Fix:

```txt
upper mid use karo
```

### Mistake 3

`right = n - 1` even when answer `n` ho sakta hai.

Typical casualty:

- lower bound
- insert position

### Mistake 4

Mid ko discard kar diya jab woh answer ho sakta tha.

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

---

## 15. Quick memory card

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
