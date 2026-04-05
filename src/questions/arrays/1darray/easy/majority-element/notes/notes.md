# Majority Element - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Array me hume woh element return karna hai jo:

```txt
n / 2 se zyada baar aata hai
```

Yaani majority element.

Problem guarantee:

- majority element hamesha exist karta hai

Example:

```txt
nums = [2, 2, 1, 1, 1, 2, 2]
length = 7
threshold = floor(7 / 2) = 3

2 comes 4 times
4 > 3
answer = 2
```

Dhyan do:

- equal to `n/2` enough nahi hai
- strictly greater than `n/2` chahiye
- answer guaranteed hai, isliye "not found" case worry nahi karna

---

## STEP 2: Brute Force Kyun Slow Hai

Sabse seedha idea:

- har element ko candidate maan lo
- poore array me uski frequency count karo
- jo `n/2` se zyada aaye, return kar do

Example:

```txt
nums = [2, 2, 1, 1, 1, 2, 2]

candidate 2 -> full array me count karo
candidate 2 -> phir se full array me count karo
candidate 1 -> phir se full array me count karo
```

Problem:

```txt
same values ko baar-baar recount kar rahe ho
```

Time complexity:

```txt
O(n^2)
```

Kyunki har element ke liye phir se almost poora array scan ho raha hai.

Better approach:

```txt
Map me counts store karo
```

Lekin optimal ke liye aur deeper observation chahiye.

---

## STEP 3: Key Insight

Pehle formula mat socho.
Pehle cancellation simulate karo.

```txt
nums = [2, 2, 1, 1, 1, 2, 2]
```

Different values ko pair-cancel karke dekho:

```txt
2 with 1 -> cancel
2 with 1 -> cancel
1 with 2 -> cancel
```

Ab kya bacha?

```txt
2
```

Yahan se real idea nikalta hai:

```txt
majority element itna zyada hota hai ki
baaki sab elements milkar bhi usko completely cancel nahi kar sakte
```

Isliye hume exact frequency har step pe store karna zaruri nahi.

Hume sirf yeh track karna hai:

- abhi kaun candidate chal raha hai
- us candidate ka current balance kitna hai

Yehi Boyer-Moore ka base hai.

---

## STEP 4: Why This Technique Work Karti Hai

Real question:

```txt
different values ko cancel karne se majority kaise bach jaati hai?
```

Suppose:

```txt
majority element = M
count(M) = 6
baaki sab mila kar = 4
```

Agar har non-majority element ko ek `M` ke saath cancel kar do:

```txt
M M M M M M
X X Y Z W
```

Cancellation ke baad:

```txt
M M
```

Majority isliye bachegi kyunki:

```txt
count(M) > total of all non-M elements
```

Boyer-Moore isi cancellation ko one-pass way me simulate karta hai.

`count` ka actual meaning:

```txt
current candidate ka net balance
```

Yeh exact frequency nahi hai.
Yeh bas yeh batata hai:

```txt
ab tak ke processed part me current candidate kitna ahead hai
after cancellations
```

---

## STEP 5: Variables Samjho

```txt
candidate -> abhi kis value ko majority contender maan rahe hain
count     -> current candidate ka net balance
```

Start:

```txt
candidate = 0
count = 0
```

Jab:

```txt
count == 0
```

iska matlab:

```txt
previous candidate ka balance khatam ho gaya
```

Toh ab current number new candidate ban sakta hai.

Example:

```txt
nums = [2, 2, 1]
```

First `2`:

```txt
count == 0 -> candidate = 2
same as candidate -> count = 1
```

Second `2`:

```txt
same as candidate -> count = 2
```

Then `1`:

```txt
different -> count = 1
```

---

## STEP 6: Mental Model

Is problem ko aise yaad rakho:

```txt
Main array me election chala raha hoon.
```

`candidate` current leading value hai.
`count` uska lead hai.

Har next number pe:

- agar same candidate milta hai -> lead badh jaati hai
- agar different value milti hai -> ek lead cancel ho jaati hai

Jab lead zero ho jaaye:

```txt
ab tak ka pura contest tie ho gaya
```

Ab agla number naya leader ban sakta hai.

Soch:

```txt
same -> support
different -> cancel
zero balance -> fresh start
```

---

## STEP 7: Boundary Cases

**Case 1: Single element**

```txt
[5]
```

First element hi candidate banega.
Answer `5`.

**Case 2: All same values**

```txt
[7, 7, 7, 7]
```

Candidate kabhi change hi nahi hoga.
Count bas badhta rahega.

**Case 3: Majority appears late**

```txt
[1, 2, 2, 3, 2, 2, 2]
```

Early candidates cancel ho sakte hain.
Final majority phir bhi end me candidate ban sakti hai.

**Case 4: Negative values**

```txt
[-1, -1, -1, 2, 3]
```

Comparison same tarah se kaam karega.

---

## STEP 8: Conditions Samjho

Loop ke andar teen cheezein important hain.

### Condition 1: `count == 0`

Matlab:

```txt
previous balance fully cancel ho chuka hai
```

Toh:

```txt
candidate = current number
```

### Condition 2: `num === candidate`

Matlab:

```txt
current candidate ko ek aur support mila
```

Toh:

```txt
count++
```

### Condition 3: `num !== candidate`

Matlab:

```txt
candidate ke against ek vote mila
```

Toh:

```txt
count--
```

Short memory hook:

```txt
count zero -> new candidate
same       -> plus one
different  -> minus one
```

---

## STEP 9: Adjustment Logic

Yeh step sabse important hai:

`count` exact frequency nahi hai.

It means:

```txt
processed prefix me current candidate kitna ahead hai
after pair cancellation
```

Example:

```txt
prefix = [2, 2, 1, 1]
```

Cancellation:

```txt
2 with 1 -> cancel
2 with 1 -> cancel
```

Everything cancel ho gaya.
Isliye:

```txt
count = 0
```

Ab next number se fresh candidate choose kar sakte ho.

Dhyan do:

```txt
candidate change hona galat nahi hai
```

Kyunki old candidate ka lead already neutralize ho chuka hota hai.

---

## STEP 10: Answer Formula

End me:

```txt
candidate
```

hi answer hota hai.

Kyun?

Kyunki problem guarantee karti hai ki majority element exist karta hai.

Is guarantee ki wajah se:

```txt
true majority kabhi permanently lose nahi hogi
```

Woh cancellations ke baad bhi final candidate ban kar bachegi.

Alternative situation:

Agar majority guaranteed na hoti, toh:

1. Boyer-Moore se candidate nikaalte
2. second pass me us candidate ki actual frequency verify karte

So:

```txt
verification pass = constraint of problem statement
not requirement of algorithm in every version
```

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [2, 2, 1, 1, 1, 2, 2]
```

Start:

```txt
candidate = 0
count = 0
```

| Iteration | num | `count == 0`? | Candidate after reset | Compare with candidate | Count after update | Soch |
|---|---:|---|---:|---|---:|---|
| 1 | 2 | Yes | 2 | same | 1 | Naya candidate bana, support mila |
| 2 | 2 | No | 2 | same | 2 | Candidate ka balance aur strong |
| 3 | 1 | No | 2 | different | 1 | Ek `2` aur ek `1` cancel |
| 4 | 1 | No | 2 | different | 0 | Candidate ka pura balance khatam |
| 5 | 1 | Yes | 1 | same | 1 | Fresh start, `1` naya candidate |
| 6 | 2 | No | 1 | different | 0 | `1` aur `2` cancel |
| 7 | 2 | Yes | 2 | same | 1 | Fresh start, `2` candidate bana |

End:

```txt
candidate = 2
answer = 2
```

Ek aur short example:

```txt
nums = [3, 3, 4]
```

| Iteration | num | `count == 0`? | Candidate after reset | Compare with candidate | Count after update | Soch |
|---|---:|---|---:|---|---:|---|
| 1 | 3 | Yes | 3 | same | 1 | Start with 3 |
| 2 | 3 | No | 3 | same | 2 | 3 aur strong |
| 3 | 4 | No | 3 | different | 1 | Ek 3 aur 4 cancel |

End:

```txt
candidate = 3
answer = 3
```

---

## STEP 12: Quick Reference

```txt
Brute:
har value ka full count -> O(n^2)

Better:
Map me counts store karo -> O(n) time, O(n) space

Optimal:
pair cancellation socho
candidate + count maintain karo
same -> count++
different -> count--
count zero -> new candidate
end ka candidate hi answer
```

One-line memory hook:

```txt
majority element sabko cancel karke bhi bachta hai
```
