# Subarray Sum Equals K — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek integer array `nums` aur integer `k` diya hai.
Hume count return karna hai:

```txt
kitni contiguous subarrays ka sum exactly k hai
```

Important:

- subarray contiguous honi chahiye
- answer count hai, length nahi
- array me negative values bhi ho sakti hain

Example:

```txt
nums = [1, 1, 1]
k = 2
```

Valid subarrays:

```txt
nums[0..1] = [1,1]
nums[1..2] = [1,1]
```

So answer:

```txt
2
```

---

## STEP 2: Brute Force

Sabse seedhi soch:

- har `start` index try karo
- usse har `end` index tak extend karo
- running sum maintain karo
- jab sum `k` ho, count badha do

Example:

```txt
nums = [1, 1, 1], k = 2
```

`start = 0`

```txt
[1]      -> 1
[1,1]    -> 2   ✅
[1,1,1]  -> 3
```

`start = 1`

```txt
[1]      -> 1
[1,1]    -> 2   ✅
```

`start = 2`

```txt
[1]      -> 1
```

Answer:

```txt
2
```

Brute force correct hai,
but `O(n^2)` time lagta hai.

---

## STEP 3: Key Insight

Prefix sum ka core idea use hota hai.

Prefix sum means:

```txt
start se current index tak total sum
```

Suppose current index pe prefix sum `currentSum` hai.

Agar koi purana prefix sum `oldPrefixSum` aisa mila jiske saath:

```txt
currentSum - oldPrefixSum = k
```

toh un dono ke beech wali subarray ka sum `k` hoga.

Rearrange karo:

```txt
oldPrefixSum = currentSum - k
```

So actual question har index pe ye ban jaata hai:

```txt
kya prefix sum (currentSum - k) pehle mila tha?
```

---

## STEP 4: Why This Technique Works

Maan lo:

```txt
prefix sum till index j = currentSum
prefix sum till some earlier index i = oldPrefixSum
```

Then subarray `(i+1 ... j)` ka sum hota hai:

```txt
currentSum - oldPrefixSum
```

Hume ye `k` chahiye.

So:

```txt
currentSum - oldPrefixSum = k
oldPrefixSum = currentSum - k
```

Matlab agar current index pe hume `currentSum - k` pehle mil gaya,
toh uska next index se current index tak ek valid subarray ban jaati hai.

Ek aur important baat:

Yahan sirf "ek valid subarray" nahi ho sakti.
Same needed prefix sum multiple baar mila ho sakta hai.

Isliye:

```txt
map me first index nahi
frequency store karni padti hai
```

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `currentSum` | current index tak ka prefix sum |
| `neededPrefixSum` | woh purana prefix sum jo mil jaye toh sum `k` banega |
| `prefixSumFrequency` | har prefix sum kitni baar mila hai |
| `count` | total valid subarrays count |

Most important distinction:

```txt
longest-type problems -> first occurrence useful
count-type problems   -> frequency useful
```

---

## STEP 6: Mental Model

Har index pe hum ye pooch rahe hain:

```txt
ab tak ka total currentSum hai
mujhe konsa purana total chahiye tha taaki difference k ban jaye?
```

Visual:

```txt
oldPrefixSum -----> currentSum
difference = k
```

If:

```txt
neededPrefixSum = currentSum - k
```

map me 3 baar mila,
toh current index pe 3 valid subarrays khatam ho rahi hain.

Short memory line:

```txt
count += frequency(currentSum - k)
```

---

## STEP 7: Boundary Cases

1. Empty array

```txt
[] -> 0
```

2. Single element equal to `k`

```txt
[5], k=5 -> 1
```

3. Negative numbers present

```txt
[1, -1, 0], k=0
```

4. Multiple zeros

```txt
[0, 0, 0], k=0
```

Yahan answers bahut quickly badhte hain.

5. Start se hi valid subarray

Isko `0 -> 1` initialization handle karti hai.

---

## STEP 8: Conditions

### Condition 1: `neededPrefixSum = currentSum - k`

Ye derived expression hai.

Hum aisa prefix sum dhoondh rahe hain jiske saath:

```txt
currentSum - oldPrefixSum = k
```

So:

```txt
oldPrefixSum = currentSum - k
```

### Condition 2: `if (map.has(neededPrefixSum))`

Meaning:

```txt
hume required purana prefix sum mil gaya
```

Toh valid subarray/subarrays exist karti hain.

### Condition 3: `count += frequency`

Sirf `count++` kyun nahi?

Because same needed prefix sum multiple times pehle aa chuka ho sakta hai.

Each occurrence ek alag valid starting point deti hai.

### Condition 4: current prefix sum frequency update

Current prefix sum ko future indices ke liye available banana hai.

Isliye map update karte hain after counting.

---

## STEP 9: Adjustment Logic

Yahan sliding window style left/right adjust nahi hota.

Instead adjustment logic ye hai:

```txt
har naya index currentSum ko update karta hai
aur map future ke liye prefix-sum history grow karta hai
```

Most important subtle point:

### Why `0 -> 1` initially store karte hain?

Example:

```txt
nums = [1, 1]
k = 2
```

At index `1`:

```txt
currentSum = 2
neededPrefixSum = 2 - 2 = 0
```

Agar map me `0` pehle se stored nahi hota,
toh start se current index tak wali valid subarray miss ho jaati.

So:

```txt
prefix sum 0 ko imagine karte hain before array starts
```

That is why:

```txt
map.set(0, 1)
```

---

## STEP 10: Answer Formula

Core update rule:

```txt
count += frequency(currentSum - k)
```

Why exactly?

Because:

```txt
currentSum - oldPrefixSum = k
oldPrefixSum = currentSum - k
```

Agar `currentSum - k` pehle `f` times mila tha,
toh current index pe `f` different subarrays end ho rahi hain
jinka sum `k` hai.

That is why:

```txt
count += f
```

not just `count++`

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [1, 1, 1]
k = 2
```

Start:

```txt
currentSum = 0
count = 0
map = {0: 1}
```

| Iteration | `nums[i]` | `currentSum` | `neededPrefixSum = currentSum - k` | Map Has Needed? | Count Change | Map After |
|---|---:|---:|---:|---|---:|---|
| 0 | 1 | 1 | -1 | no | `+0` | `{0:1, 1:1}` |
| 1 | 1 | 2 | 0 | yes, freq = 1 | `+1` | `{0:1, 1:1, 2:1}` |
| 2 | 1 | 3 | 1 | yes, freq = 1 | `+1` | `{0:1, 1:1, 2:1, 3:1}` |

Step-by-step meaning:

### At `i = 1`

```txt
currentSum = 2
neededPrefixSum = 0
```

`0` map me 1 baar mila hai.

So:

```txt
count += 1
```

Meaning:

```txt
subarray [1,1] from index 0..1
```

### At `i = 2`

```txt
currentSum = 3
neededPrefixSum = 1
```

`1` map me 1 baar mila hai.

So:

```txt
count += 1
```

Meaning:

```txt
subarray [1,1] from index 1..2
```

Final answer:

```txt
2
```

---

## STEP 12: Quick Reference

### Core Identity

```txt
currentSum - oldPrefixSum = k
oldPrefixSum = currentSum - k
```

### What map stores

```txt
prefix sum -> frequency
```

### Update rule

```txt
count += frequency(currentSum - k)
```

### Most important memory

```txt
count problem hai
isliye first index nahi, frequency store karo
```
