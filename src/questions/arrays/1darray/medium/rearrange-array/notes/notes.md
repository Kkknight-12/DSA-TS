# Rearrange Array Elements by Sign — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek array `nums` diya hai.
Isme positives aur negatives equal count me hain.

Hume naya answer banana hai jisme:

- answer positive se start ho
- positive aur negative alternate karein
- positives ka relative order same rahe
- negatives ka relative order bhi same rahe

Example:

```txt
nums = [3, 1, -2, -5, 2, -4]
```

Positives in order:

```txt
[3, 1, 2]
```

Negatives in order:

```txt
[-2, -5, -4]
```

Answer:

```txt
[3, -2, 1, -5, 2, -4]
```

---

## STEP 2: Output Pattern Observe Karo

Final array ka pattern fixed hai:

```txt
index:   0  1  2  3  4  5
answer:  +  -  +  -  +  -
```

Matlab:

- even index -> positive
- odd index -> negative

Ye observation optimal solution ka base banega.

---

## STEP 3: Relative Order Kyu Important Hai?

Agar sirf alternating chahiye hota,
toh hum random positive-negative pair bana dete.

Lekin problem bol rahi hai:

```txt
jo positive pehle aaya, woh answer me pehle positive slot me hi jana chahiye
jo negative pehle aaya, woh answer me pehle negative slot me hi jana chahiye
```

Example:

```txt
nums = [5, 1, -2, -7]
```

Valid answer:

```txt
[5, -2, 1, -7]
```

Invalid answer:

```txt
[1, -7, 5, -2]
```

Why invalid?
- positives ka order change ho gaya
- negatives ka order bhi change ho gaya

---

## STEP 4: Brute Force Idea

Sabse seedha idea:

1. saare positives ek array me collect karo
2. saare negatives dusre array me collect karo
3. phir dono ko alternate karke answer banao

Example:

```txt
nums = [3, 1, -2, -5, 2, -4]

positives = [3, 1, 2]
negatives = [-2, -5, -4]
```

Ab interleave:

```txt
[3, -2, 1, -5, 2, -4]
```

Yeh approach bilkul natural hai.

---

## STEP 5: Brute Force Kyu Work Karta Hai?

Kyunki hum input ko left-to-right read kar rahe hain:

- har positive `push` order me `positives` me ja raha hai
- har negative `push` order me `negatives` me ja raha hai

So:

```txt
relative order automatically preserve ho jata hai
```

Phir jab hum:

```txt
positive[i], negative[i], positive[i+1], negative[i+1]
```

aise build karte hain,
toh alternating pattern bhi mil jata hai.

---

## STEP 6: Brute Force Limitation

Interesting baat:

```txt
brute force bhi O(n) hai
```

So problem yeh nahi hai ki brute slow hai.
Problem yeh hai ki brute extra helper arrays use kar raha hai:

- `positives`
- `negatives`

So question becomes:

```txt
kya hum direct final answer fill kar sakte hain?
```

Haan.

---

## STEP 7: Optimal Insight

Final answer me:

- positive always even index par jayega
- negative always odd index par jayega

Toh direct placement possible hai.

Hum 2 pointers rakhte hain:

- `positiveIndex = 0`
- `negativeIndex = 1`

Ab input ko ek hi pass me read karo:

- positive mile -> `result[positiveIndex] = num`
- negative mile -> `result[negativeIndex] = num`

Phir index ko `+2` se move karo.

---

## STEP 8: Why Direct Placement Works

Socho:

```txt
answer = [+, -, +, -, +, -]
```

Positive slots fixed hain:

```txt
0, 2, 4, ...
```

Negative slots fixed hain:

```txt
1, 3, 5, ...
```

Ab hum input ko left-to-right read kar rahe hain.

Example:

```txt
nums = [3, 1, -2, -5, 2, -4]
```

Read order:

1. first positive = `3` -> first positive slot `0`
2. second positive = `1` -> next positive slot `2`
3. first negative = `-2` -> first negative slot `1`
4. second negative = `-5` -> next negative slot `3`

Isliye:

```txt
left-to-right scan + next even/odd slot
= order preserved + alternating answer
```

---

## STEP 9: Variables

| Variable | Meaning |
|---|---|
| `result` | final answer array |
| `positiveIndex` | next even position where positive jayega |
| `negativeIndex` | next odd position where negative jayega |
| `num` | current input value |

Short memory:

```txt
positive -> even
negative -> odd
```

---

## STEP 10: Full Dry Run

Example:

```txt
nums = [3, 1, -2, -5, 2, -4]
```

Start:

```txt
result = [_, _, _, _, _, _]
positiveIndex = 0
negativeIndex = 1
```

### Iteration 1

```txt
num = 3
```

Positive hai:

```txt
result[0] = 3
result = [3, _, _, _, _, _]
positiveIndex = 2
```

### Iteration 2

```txt
num = 1
```

Positive hai:

```txt
result[2] = 1
result = [3, _, 1, _, _, _]
positiveIndex = 4
```

### Iteration 3

```txt
num = -2
```

Negative hai:

```txt
result[1] = -2
result = [3, -2, 1, _, _, _]
negativeIndex = 3
```

### Iteration 4

```txt
num = -5
```

Negative hai:

```txt
result[3] = -5
result = [3, -2, 1, -5, _, _]
negativeIndex = 5
```

### Iteration 5

```txt
num = 2
```

Positive hai:

```txt
result[4] = 2
result = [3, -2, 1, -5, 2, _]
positiveIndex = 6
```

### Iteration 6

```txt
num = -4
```

Negative hai:

```txt
result[5] = -4
result = [3, -2, 1, -5, 2, -4]
negativeIndex = 7
```

Final answer:

```txt
[3, -2, 1, -5, 2, -4]
```

---

## STEP 11: Edge Cases

1. Smallest valid input

```txt
[1, -1] -> [1, -1]
```

2. Input negative se start ho sakta hai

```txt
[-1, 1] -> [1, -1]
```

3. Already alternating

```txt
[5, -4, 3, -2] -> [5, -4, 3, -2]
```

4. Equal count guarantee important hai

Original problem me positives aur negatives equal hote hain,
isliye even/odd filling safely complete ho jati hai.

---

## STEP 12: Complexity + Final Memory

### Brute Force

- Time: `O(n)`
- Space: `O(n)` extra

Why?
- split karne me `O(n)`
- interleave karne me `O(n)`
- helper arrays banti hain

### Optimal

- Time: `O(n)`
- Space: `O(n)` for answer
- Auxiliary space excluding answer: `O(1)`

Important learning:

```txt
is problem me optimal faster nahi hai
optimal smarter placement use karta hai
```

Final memory line:

```txt
positive goes to next even slot
negative goes to next odd slot
```
