# Maximum Subarray — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek integer array `nums` diya hai.
Hume contiguous subarray ka maximum possible sum return karna hai.

Important:
- subarray contiguous honi chahiye
- actual subarray return nahi karni
- sirf uska sum return karna hai

Example:

```txt
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
```

Best contiguous subarray:

```txt
[4, -1, 2, 1]
```

Sum:

```txt
4 + (-1) + 2 + 1 = 6
```

So answer:

```txt
6
```

---

## STEP 2: Brute Force

Sabse seedha approach:
- har possible start index try karo
- us start se har possible end index tak window extend karo
- running sum maintain karo
- maximum sum track karte jao

Example:

```txt
nums = [4, -1, 2]
```

Possible windows:

```txt
[4]         -> 4
[4, -1]     -> 3
[4, -1, 2]  -> 5
[-1]        -> -1
[-1, 2]     -> 1
[2]         -> 2
```

Maximum:

```txt
5
```

Brute force correct hai,
but efficient nahi.

---

## STEP 3: Key Insight

Sabse important observation:

```txt
agar current running sum negative ho gayi,
toh usko future ke saath jodna harmful hai
```

Example:

```txt
currentSum = -5
next num = 4
```

Do options:

```txt
carry karo   -> -5 + 4 = -1
fresh start  -> 4
```

Fresh start clearly better hai.

Yani:

```txt
negative running sum = dead weight
```

Isko future me carry nahi karna chahiye.

---

## STEP 4: Why This Technique Works

Maan lo current index pe hum do choices dekh rahe hain:

### Choice 1: previous subarray continue karo

```txt
previous running sum + current number
```

### Choice 2: current index se nayi subarray start karo

```txt
just current number
```

Real question:

```txt
previous running sum useful hai ya harmful?
```

Agar previous running sum positive ya zero hai,
toh usko carry karna helpful hai.

Agar previous running sum negative hai,
toh usko carry karne se current answer sirf aur chhota hoga.

Isliye Kadane ka logic:

```txt
negative carry ko discard karo
```

Ye implementation thoda different syntax me wahi kaam kar rahi hai:

1. current number add karo
2. max answer update karo
3. agar running sum negative ho jaye, reset to 0

Matlab:

```txt
future ke liye clean slate
```

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `currentSum` | current running window ka sum |
| `maxSum` | ab tak ka global best answer |
| `i` | current traversal index |

Important:
- `currentSum` exact final answer nahi hai
- `maxSum` final answer banega

---

## STEP 6: Mental Model

`currentSum` ko current journey ka carry-over samjho.

Har next number pe:

- agar carry positive hai -> useful ho sakta hai
- agar carry negative hai -> next journey ko neeche kheench raha hai

Visual:

```txt
positive carry  -> boost
negative carry  -> baggage
```

Short memory line:

```txt
positive carry rakho
negative carry chhodo
```

---

## STEP 7: Boundary Cases

1. Single positive
   `[5] -> 5`

2. Single negative
   `[-5] -> -5`

3. All negative
   `[-8, -3, -6] -> -3`

4. All positive
   `[1, 2, 3] -> 6`

5. Zeros
   `[0, 0, 0] -> 0`

6. Empty array
   Safe handling me `0` return kar sakte hain

---

## STEP 8: Conditions

### Condition 1: `currentSum += nums[i]`

Current element ko running window me include kar rahe hain.

### Condition 2: `maxSum = Math.max(maxSum, currentSum)`

Global answer ko immediately update karna zaruri hai.

Ye reset se pehle kyun aata hai?

Example:

```txt
nums = [-2, -1]
```

First iteration:

```txt
currentSum = -2
```

Agar update se pehle reset kar dete:

```txt
currentSum = 0
```

toh `-2` capture hi nahi hota.

All-negative array me answer koi negative number hi hota hai,
isliye:

```txt
update first, reset later
```

### Condition 3: `if (currentSum < 0) currentSum = 0`

Negative running sum future ko hurt karegi,
so usko carry nahi karte.

---

## STEP 9: Adjustment Logic

Har iteration me exact flow:

1. current number add karo
2. global best update karo
3. check karo running sum negative hui ya nahi
4. negative hui toh reset karo

Is order ko yaad rakhna important hai.

Wrong order confusion create kar sakta hai,
especially all-negative arrays me.

---

## STEP 10: Answer Formula

Yahan koi complex formula nahi hai.

Final answer simple hai:

```txt
maxSum
```

Kyunki `maxSum` har iteration ke baad
ab tak ka best contiguous subarray sum store kar raha hai.

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [-2, 1, -3, 4, -1, 2, 1]
```

Initial state:

```txt
currentSum = 0
maxSum = -Infinity
```

| i | nums[i] | currentSum Before | currentSum After Add | maxSum After Update | Reset? | currentSum Final |
|---:|---:|---:|---:|---:|---|---:|
| 0 | -2 | 0 | -2 | -2 | yes -> reset to 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | no | 1 |
| 2 | -3 | 1 | -2 | 1 | yes -> reset to 0 | 0 |
| 3 | 4 | 0 | 4 | 4 | no | 4 |
| 4 | -1 | 4 | 3 | 4 | no | 3 |
| 5 | 2 | 3 | 5 | 5 | no | 5 |
| 6 | 1 | 5 | 6 | 6 | no | 6 |

Final answer:

```txt
6
```

Winning subarray:

```txt
[4, -1, 2, 1]
```

---

## STEP 12: Quick Reference

```txt
Goal:
Maximum contiguous subarray sum

Brute force:
Har start-end window ka running sum try karo

Key insight:
Negative running sum future ke liye harmful hai

Kadane rule:
current number add karo
maxSum update karo
negative ho toh reset karo

Important order:
update first
reset later

Final answer:
maxSum
```
