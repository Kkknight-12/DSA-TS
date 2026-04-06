# Longest Equal Subarray — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek integer array `nums` aur integer `k` diya hai.
Hum ek subarray choose kar sakte hain.
Us chosen subarray ke andar se at most `k` elements delete kar sakte hain.

Delete karne ke baad jo elements bachenge,
woh sab equal hone chahiye.

Hume longest possible equal subarray ki **length** return karni hai.

Important:
- answer original window size nahi hai
- answer delete ke baad bache equal elements ki count hai

Example:

```txt
nums = [1, 3, 2, 3, 1, 3]
k = 3
```

Ek useful window:

```txt
[3, 2, 3, 1, 3]
```

Delete:

```txt
2, 1
```

Bacha:

```txt
[3, 3, 3]
```

Answer:

```txt
3
```

---

## STEP 2: Brute Force

Sabse seedha approach:
- har possible subarray try karo
- us subarray me kaunsi value sabse zyada baar hai, woh dekho
- usko rakho, baaki delete kar do

Example:

```txt
window = [3, 2, 3, 1, 3]
```

Frequency:

```txt
3 -> 3 times
2 -> 1 time
1 -> 1 time
```

Toh best choice `3` ko rakhna hai.

Delete karne padenge:

```txt
windowSize - maxFreq = 5 - 3 = 2
```

Agar `2 <= k` hai,
toh yeh valid window hai.

Brute force me hum har window ke liye yahi logic chalate hain.

---

## STEP 3: Key Insight

Actual shift yeh hai:

```txt
Final answer me sirf ek hi value bachegi.
```

Toh problem ko aise dekh sakte hain:

```txt
Ek value choose karo.
Dekho us value ko ek saath rakhne ke liye kitne non-equal elements delete karne padenge.
```

Example:

```txt
nums = [1, 3, 2, 3, 1, 3]
```

Value `3` ke indices:

```txt
[1, 3, 5]
```

Ab agar hum first `3` se last `3` tak stretch karein:

```txt
index 1 se index 5 tak span
```

Beech me total positions:

```txt
5 - 1 = 4
```

But actual `3`s kitne hain?

```txt
3
```

Toh beech ke extra non-3 elements:

```txt
2
```

Yehi delete karne padenge.

---

## STEP 4: Why This Technique Works

Agar kisi chosen value ke indices hain:

```txt
[p1, p2, p3, ...]
```

aur hum current window le rahe hain:

```txt
indices[left] ... indices[right]
```

toh:

- total span = `indices[right] - indices[left]`
- iss span ke andar chosen value ki occurrences = `right - left + 1`

Ab delete kinhe karna padega?
Un sab positions ko jo beech me hain but chosen value nahi hain.

Formula:

```txt
deletionsNeeded = indices[right] - indices[left] - (right - left)
```

Why this works?

Kyunki:

```txt
indices[right] - indices[left]
```

ye total jumps batata hai,
aur

```txt
right - left
```

ye chosen value ke internal jumps batata hai.

Difference = gaps = non-equal elements.

Yahi actual deletions hain.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `indexMap` | har value ke indices ka map |
| `indices` | current chosen value ki index list |
| `left` | current value-list window ka start |
| `right` | current value-list window ka end |
| `maxLen` | ab tak ki best equal subarray length |

Important:
- `left/right` original array ke pointers nahi hain
- yeh current value ki **indices list** ke pointers hain

Example:

```txt
nums = [1, 3, 2, 3, 1, 3]
3 ke indices = [1, 3, 5]
```

Yahan:

```txt
left = 0  -> actual index 1
right = 2 -> actual index 5
```

---

## STEP 6: Mental Model

Is problem ko "array window" problem ki tarah directly mat dekho.
Isko "same-value positions" problem ki tarah dekho.

For one chosen value:

```txt
value = 3
indices = [1, 3, 5]
```

Ab hum in positions ko ek group me rakhna chahte hain.

Visual:

```txt
nums  = [1, 3, 2, 3, 1, 3]
index =  0  1  2  3  4  5

3 positions -> 1, 3, 5
gaps        -> 2, 4
```

In gaps pe jo non-3 elements baithe hain,
unhe delete karna padega.

So sliding window yahan actual numbers pe nahi,
same value ki positions pe chal rahi hai.

Short memory line:

```txt
Chosen value ki positions ko saath lana hai,
beech ke gaps delete karne hain.
```

---

## STEP 7: Boundary Cases

### Case 1: Empty array

```txt
[]
```

Answer `0`.

### Case 2: Single element

```txt
[7]
```

Already equal.
Answer `1`.

### Case 3: All elements same

```txt
[5, 5, 5, 5]
```

Koi deletion ki zarurat nahi.
Answer full length = `4`.

### Case 4: `k = 0`

```txt
nums = [1, 2, 1, 1]
```

Ab delete allowed nahi hain.
Toh sirf already-possible contiguous equal streak hi kaam karegi.

### Case 5: Spread-out duplicates

```txt
nums = [1, 2, 1, 2, 1]
```

Yahan `1`s hain, but unke beech gaps bhi hain.
`k` decide karega kitni ko saath rakh sakte ho.

---

## STEP 8: Conditions

### Condition 1: Empty input

```ts
if (n === 0) return 0;
```

Meaning:
- koi equal subarray possible hi nahi

### Condition 2: Brute force validity

```txt
deletionsNeeded = windowSize - maxFreq
```

Meaning:
- current window me best possible equal answer `maxFreq` hai
- baaki sab delete karne padenge

### Condition 3: Brute valid window

```txt
if (deletionsNeeded <= k)
```

Meaning:
- current window ko equal bana sakte hain

### Condition 4: Optimal gaps formula

```txt
indices[right] - indices[left] - (right - left)
```

Meaning:
- chosen value ki current positions ke beech kitne extra non-equal elements hain

### Condition 5: Window invalid in optimal

```ts
while (indices[right] - indices[left] - (right - left) > k) {
  left++;
}
```

Meaning:
- current chosen positions ko saath rakhne ke liye bahut zyada deletions chahiye
- so left ko aage badhao, window shrink karo

---

## STEP 9: Adjustment Logic

### 1. Brute force me `maxFreq` kyun?

Kyunki current window me final equal subarray banane ke liye
hume ek hi value choose karni hogi.

Best choice hamesha wohi hai jo sabse zyada baar already present hai.

Why?

```txt
most frequent ko rakho -> least deletions lagenge
```

### 2. Optimal me original array pe window kyun nahi?

Original array pe directly equal-subarray condition slippery hai,
kyunki hume exactly kis value ko preserve karna hai, woh clear nahi hota.

Lekin jab ek value choose kar li,
problem simple ho gayi:

```txt
iss value ki positions ko saath laana hai
```

So value-wise indices list much cleaner representation hai.

### 3. `left++` kyun?

When:

```txt
deletionsNeeded > k
```

matlab current span bahut wide ho gaya hai.

Chosen value ki current leftmost occurrence ko drop kar do,
window chhoti ho jaayegi,
gaps kam ho sakte hain.

### 4. Answer `right - left + 1` kyun?

Because optimal solution me current valid window
same chosen value ki kitni occurrences ko include kar rahi hai,
woh exactly:

```txt
right - left + 1
```

Aur final equal subarray me wahi values bachengi.

---

## STEP 10: Answer Formula

Is problem me closed-form formula nahi hai.
Yahan repeatable pattern important hai.

### Brute Force Algorithm

1. Har subarray try karo
2. Frequency map maintain karo
3. `maxFreq` track karo
4. `deletionsNeeded = windowSize - maxFreq`
5. Agar `<= k`, answer update karo with `maxFreq`

### Optimal Algorithm

1. Har value ke indices collect karo
2. Har indices list pe sliding window chalao
3. `deletionsNeeded = indices[right] - indices[left] - (right - left)`
4. Agar yeh `> k` ho, `left++`
5. Valid window pe `maxLen = max(maxLen, right - left + 1)`

### Why complexity `O(n)` average hai

- index map build karna linear hai
- har value ki indices list ka total size milake `n` hota hai
- har list pe `left/right` linear move karte hain
- koi pointer peeche nahi jaata

So overall total work linear hota hai.

### Approach comparison

| Approach | Idea | Time | Extra Space |
|---|---|---:|---:|
| Brute Force | all subarrays + max frequency | `O(n^2)` | `O(n)` |
| Better | index pairs per value | worst case `O(n^2)` | `O(n)` |
| Optimal | index lists + sliding window | `O(n)` average | `O(n)` |

---

## STEP 11: Full Dry Run

### Example

```txt
nums = [1, 3, 2, 3, 1, 3]
k = 3
```

Index map:

```txt
1 -> [0, 4]
3 -> [1, 3, 5]
2 -> [2]
```

For value `3`:

| `left` | `right` | actual indices | deletionsNeeded | valid? | kept count |
|---:|---:|---|---:|---|---:|
| 0 | 0 | `[1]` | `1 - 1 - 0 = 0` | yes | 1 |
| 0 | 1 | `[1, 3]` | `3 - 1 - 1 = 1` | yes | 2 |
| 0 | 2 | `[1, 3, 5]` | `5 - 1 - 2 = 2` | yes | 3 |

So value `3` gives answer `3`.

For value `1`:

| `left` | `right` | actual indices | deletionsNeeded | valid? | kept count |
|---:|---:|---|---:|---|---:|
| 0 | 0 | `[0]` | 0 | yes | 1 |
| 0 | 1 | `[0, 4]` | `4 - 0 - 1 = 3` | yes | 2 |

Best overall:

```txt
3
```

### Example 2

```txt
nums = [1, 1, 2, 2, 1, 1]
k = 2
```

For value `1`:

```txt
indices = [0, 1, 4, 5]
```

Whole window:

```txt
5 - 0 - (3 - 0) = 2
```

Valid, so all four `1`s ko rakha ja sakta hai.

Answer:

```txt
4
```

---

## STEP 12: Quick Reference

```txt
CORE IDEA
Final answer me sirf ek value bachegi.
So ek value choose karo aur dekho uski positions ko saath laane ke liye kitna delete karna padega.

BRUTE LOGIC
windowSize - maxFreq = deletionsNeeded

OPTIMAL LOGIC
indices[right] - indices[left] - (right - left) = gaps to delete

MENTAL MODEL
array pe direct kaam mat socho
same-value positions pe sliding window socho

COMPLEXITY
Brute  -> O(n^2)
Better -> worst case O(n^2)
Optimal -> O(n) average

ONE-LINE MEMORY
Keep one value, delete the gaps between its chosen occurrences
```
