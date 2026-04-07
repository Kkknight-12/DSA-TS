# Majority Element II — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Hume array me saare aise elements return karne hain jo:

```txt
floor(n / 3) se zyada baar aate hain
```

Important:
- answer me 0 elements bhi ho sakte hain
- answer me 1 element bhi ho sakta hai
- answer me 2 elements bhi ho sakte hain
- 2 se zyada answers possible nahi hote
- order matter nahi karta

Example:

```txt
nums = [1, 2, 3, 1, 2, 1, 2]
n = 7
threshold = floor(7 / 3) = 2
```

Counts:

```txt
1 -> 3 times
2 -> 3 times
3 -> 1 time
```

So answer:

```txt
[1, 2]
```

---

## STEP 2: Brute Force

Sabse seedhi soch:
- har element ko candidate maan lo
- poore array me us candidate ki frequency count karo
- agar count `floor(n / 3)` se zyada ho, result me daal do

Example:

```txt
nums = [3, 2, 3]
threshold = floor(3 / 3) = 1
```

Candidate `3`:

```txt
count = 2
2 > 1
```

So `3` answer hai.

Problem:

```txt
same values baar-baar recount ho sakti hain
```

Isliye brute force simple hai, but efficient nahi.

---

## STEP 3: Key Insight

Sabse important observation:

```txt
n / 3 se zyada aane wale elements maximum 2 hi ho sakte hain
```

Kyun?

Agar 3 alag values each `n/3` se zyada aayengi,
toh unka combined total `n` se zyada ho jayega.

Example:

```txt
n = 9
n / 3 = 3
```

Ab agar 3 numbers each `> 3` times aayen:

```txt
at least 4 + 4 + 4 = 12
```

But array length to sirf `9` hai.
Impossible.

Yahan se direct conclusion:

```txt
answer slots maximum 2 hi chahiye
```

Yehi optimal solution ka foundation hai.

---

## STEP 4: Why This Technique Works

Optimal Boyer-Moore version ko samajhne ke liye
sirf "2 candidates maintain karte hain" yaad karna enough nahi hai.

Real logic ye hai:

### Part 1: Sirf 2 candidate slots hi kyun?

Kyunki valid answers maximum 2 ho sakte hain.

Isliye:

```txt
candidate1, count1
candidate2, count2
```

enough hain.

### Part 2: Cancellation kaise kaam karti hai?

Maan lo current state me:

```txt
candidate1 = A
candidate2 = B
```

Aur current number `C` aaya,
jo `A` aur `B` dono se different hai.

Aur dono counts positive hain.

Tab hum:

```txt
count1--
count2--
```

karte hain.

Ye aise socho:

```txt
A ka ek support
B ka ek support
aur current outsider C
```

in teenon ko ek cancellation group ki tarah hata diya.

Yani:

```txt
3 alag values ka ek block remove kar diya
```

True majority `> n/3` wali value aise cancellations ke baad bhi
completely disappear nahi hoti.

Kyunki woh proportionally baaki values se zyada strong hoti hai.

### Part 3: Second pass mandatory kyun?

First pass ke baad jo candidates bachte hain,
woh sirf:

```txt
possible answers
```

hote hain.

Guaranteed answers nahi.

Example:

```txt
nums = [1, 2, 3, 4]
n = 4
threshold = floor(4 / 3) = 1
```

Yahan koi element `> 1` baar nahi aata.
Lekin first pass me kuch candidates phir bhi bach sakte hain.

Isliye second pass me actual frequency verify karna padta hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `candidate1` | first possible majority contender |
| `candidate2` | second possible majority contender |
| `count1` | candidate1 ka current balance |
| `count2` | candidate2 ka current balance |
| `threshold` | `floor(n / 3)` |

Important:
- `count1` aur `count2` exact frequencies nahi hain
- ye current cancellation balance hain

---

## STEP 6: Mental Model

Is problem ko aise imagine karo:

```txt
Hum election nahi, balance battle chala rahe hain.
```

Do slots available hain:

```txt
slot 1
slot 2
```

Har new number pe:

- agar woh kisi current candidate jaisa hai -> uska balance badhao
- agar koi slot empty hai -> usko naya candidate bana do
- agar dono slots filled hain aur new number alag hai -> dono balances ghata do

Short memory line:

```txt
same -> support
empty slot -> claim
third different value -> both balances cancel
```

---

## STEP 7: Boundary Cases

1. Empty array
   Answer `[]`

2. Single element
   Threshold `0` hota hai, so single element answer hai

3. Two elements
   `floor(2/3) = 0`
   dono distinct elements bhi answer ban sakte hain

4. No valid answer
   Example: `[1,2,3,4]`

5. One valid answer
   Example: `[3,2,3] -> [3]`

6. Two valid answers
   Example: `[1,2,3,1,2,1,2] -> [1,2]`

---

## STEP 8: Conditions

### Condition 1: `if (num === candidate1)`

Current number already candidate1 ko support karta hai.

So:

```txt
count1++
```

### Condition 2: `else if (num === candidate2)`

Same logic for candidate2.

### Condition 3: `else if (count1 === 0)`

Candidate1 slot empty hai.
Current number ko yahan place kar sakte hain.

### Condition 4: `else if (count2 === 0)`

Candidate2 slot empty hai.
Current number second slot claim kar sakta hai.

### Condition 5: `else { count1--; count2--; }`

Current number dono candidates se different hai
aur dono ke paas already support hai.

So current outsider ne dono existing candidates ka ek-ek support cancel kar diya.

---

## STEP 9: Adjustment Logic

Is algorithm me sabse important adjustment ye hai:

```txt
match checks pehle
empty-slot checks baad me
```

Kyun?

Agar current number already kisi candidate ke equal hai,
toh uska existing balance badhna chahiye.
Usko naya slot assignment ki tarah treat nahi karna chahiye.

Flow:

1. current number existing candidate hai kya?
2. nahi? koi slot empty hai kya?
3. nahi? toh cancellation karo

---

## STEP 10: Answer Formula

Yahan koi math formula jaisa direct expression nahi hai,
but answer rule simple hai:

```txt
final answer = verified candidates jinka count > floor(n / 3)
```

Verification ke time:

```txt
if count1 > threshold -> push candidate1
if count2 > threshold -> push candidate2
```

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [1, 2, 3, 1, 2, 1, 2]
n = 7
threshold = floor(7 / 3) = 2
```

### First Pass

Initial state:

```txt
candidate1 = 0, count1 = 0
candidate2 = 0, count2 = 0
```

| Step | num | Branch | candidate1 | count1 | candidate2 | count2 |
|---:|---:|---|---:|---:|---:|---:|
| 1 | 1 | `count1 === 0`, so candidate1 = 1 | 1 | 1 | 0 | 0 |
| 2 | 2 | `count2 === 0`, so candidate2 = 2 | 1 | 1 | 2 | 1 |
| 3 | 3 | third different value, so both counts-- | 1 | 0 | 2 | 0 |
| 4 | 1 | matches candidate1 | 1 | 1 | 2 | 0 |
| 5 | 2 | matches candidate2 | 1 | 1 | 2 | 1 |
| 6 | 1 | matches candidate1 | 1 | 2 | 2 | 1 |
| 7 | 2 | matches candidate2 | 1 | 2 | 2 | 2 |

First pass ke baad:

```txt
possible candidates = 1 and 2
```

### Second Pass

Reset:

```txt
count1 = 0
count2 = 0
```

| Step | num | Action | count1 | count2 |
|---:|---:|---|---:|---:|
| 1 | 1 | matches candidate1 | 1 | 0 |
| 2 | 2 | matches candidate2 | 1 | 1 |
| 3 | 3 | matches none | 1 | 1 |
| 4 | 1 | matches candidate1 | 2 | 1 |
| 5 | 2 | matches candidate2 | 2 | 2 |
| 6 | 1 | matches candidate1 | 3 | 2 |
| 7 | 2 | matches candidate2 | 3 | 3 |

Final verification:

```txt
count1 = 3 > 2  -> push 1
count2 = 3 > 2  -> push 2
```

Final answer:

```txt
[1, 2]
```

---

## STEP 12: Quick Reference

```txt
Goal:
All elements appearing more than floor(n/3) times

Important fact:
Maximum 2 answers possible

Brute force:
Har candidate ki full frequency count karo

Better:
Frequency map banao, threshold cross karne wale nikaalo

Optimal:
2 candidate slots + cancellation

First pass:
possible candidates

Second pass:
actual verification

Why second pass?
Candidates survive kar sakte hain even when they are not real answers
```
