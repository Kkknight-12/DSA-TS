# Sort Colors — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Array `nums` diya hai.
Isme sirf 3 values hoti hain:

- `0`
- `1`
- `2`

Hume array ko in-place sort karna hai.

Color meaning:

- `0` = red
- `1` = white
- `2` = blue

Example:

```txt
nums = [2, 0, 2, 1, 1, 0]
```

Answer:

```txt
[0, 0, 1, 1, 2, 2]
```

Important:

- built-in sort ka general logic yahan overkill hai
- values sirf 3 types ki hain

---

## STEP 2: Brute Force

Sabse simple idea:

```txt
array ko sort kar do
```

Ye correct hai.
Lekin problem ka special structure waste ho raha hai.

Kyuki hume already pata hai:

```txt
values sirf 0, 1, 2 hain
```

Toh normal comparison sort use karna smartest approach nahi hai.

---

## STEP 3: Key Insight

Real insight ye hai:

```txt
hume poori array ko "sort" nahi karna
hume bas 0s ko left, 1s ko middle, 2s ko right bhejna hai
```

Soch ko change karo:

sorting as comparisons

se

sorting as regions

Example target picture:

```txt
[0, 0, 0, 1, 1, 1, 2, 2, 2]
```

Matlab final answer me 3 blocks honge:

```txt
0s block | 1s block | 2s block
```

---

## STEP 4: Why This Technique Works

Hum array ko 4 regions me divide karke chalte hain:

```txt
[0 ... low-1]    -> already 0
[low ... mid-1]  -> already 1
[mid ... high]   -> unknown
[high+1 ... n-1] -> already 2
```

Most important region:

```txt
[mid ... high] = unknown
```

Kaam sirf itna hai:
unknown region ko dheere dheere consume karte jao.

Har step par `nums[mid]` ko inspect karo:

### Case 1: `nums[mid] = 0`

Isko left side ke 0-region me bhejna chahiye.

### Case 2: `nums[mid] = 1`

Ye middle region ki correct value hai.
Isko wahi rehne do.

### Case 3: `nums[mid] = 2`

Isko right side ke 2-region me bhejna chahiye.

Isliye 3 pointers enough hain:

- `low`
- `mid`
- `high`

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `low` | next position where a `0` should go |
| `mid` | current element being inspected from unknown region |
| `high` | next position where a `2` should go from right side |

Short mental memory:

```txt
low  -> 0s ka boundary
mid  -> unknown ka scanner
high -> 2s ka boundary
```

---

## STEP 6: Mental Model

`mid` ko scanner samjho.

Woh unknown region me ghoom raha hai.

Aur:

- `low` bol raha hai: "agar 0 mile toh yahan daalna"
- `high` bol raha hai: "agar 2 mile toh yahan daalna"

Visual:

```txt
0-zone | 1-zone | unknown | 2-zone
       low      mid      high
```

Dhyan do:

`mid` ka kaam sirf current unknown element inspect karna hai.

---

## STEP 7: Boundary Cases

1. Single element

```txt
[0] -> [0]
[1] -> [1]
[2] -> [2]
```

2. Already sorted

```txt
[0,0,1,1,2,2]
```

3. Reverse-ish mixed order

```txt
[2,2,1,1,0,0]
```

4. All same value

```txt
[1,1,1]
```

5. Small mixed case

```txt
[2,0,1] -> [0,1,2]
```

---

## STEP 8: Conditions

### Condition 1: `nums[mid] === 0`

Meaning:

```txt
current unknown element left block ka hai
```

Action:

- `low` ke saath swap
- `low++`
- `mid++`

Why both move?

Kyuki:
- `low` par ab correct `0` aa gaya
- current `mid` bhi process ho gaya

### Condition 2: `nums[mid] === 1`

Meaning:

```txt
current element already middle block ki correct value hai
```

Action:

- `mid++`

Why only `mid`?

Kuch swap karne ki zarurat nahi.

### Condition 3: `nums[mid] === 2`

Meaning:

```txt
current unknown element right block ka hai
```

Action:

- `high` ke saath swap
- `high--`

But:

```txt
mid ko aage mat badhao
```

Why?

Kyuki right side se jo naya element `mid` par aaya hai,
woh abhi unknown hai.

Usko dobara inspect karna padega.

---

## STEP 9: Adjustment Logic

Yeh section sabse important hai.

### Why `0` case me `mid++` kar sakte hain?

Because after swap:

- `low` par correct `0` aa gaya
- jo old `low` value `mid` par aayi,
  woh 1-region se hi aayi hogi

So current `mid` safely done hai.

### Why `2` case me `mid++` nahi karte?

Example:

```txt
nums = [2, 0, 1]
low=0, mid=0, high=2
```

Swap `nums[mid]` with `nums[high]`:

```txt
[1, 0, 2]
```

Ab `mid=0` par `1` aaya hai.
Agar hum `mid++` kar dete bina inspect kiye,
toh current new value properly process hi nahi hoti.

Isliye:

```txt
2 case -> high move karo, mid same rakho
```

---

## STEP 10: Answer Formula

Is problem me koi numeric formula nahi hai.
Yahan answer ek final state hai.

Loop stop kab hota hai?

```txt
when mid > high
```

Iska real meaning:

```txt
unknown region empty ho gaya
```

Aur kyunki baaki 3 regions already maintained the:

```txt
left = 0s
middle = 1s
right = 2s
```

toh poori array sorted hai.

Short memory line:

```txt
mid > high means no unknown elements left
```

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [2, 0, 2, 1, 1, 0]
```

Start:

```txt
low = 0
mid = 0
high = 5
```

| Iteration | `low` | `mid` | `high` | `nums[mid]` | Action | Array After |
|---|---:|---:|---:|---:|---|---|
| 1 | 0 | 0 | 5 | 2 | swap `mid` and `high`, `high--` | `[0,0,2,1,1,2]` |
| 2 | 0 | 0 | 4 | 0 | swap `low` and `mid`, `low++`, `mid++` | `[0,0,2,1,1,2]` |
| 3 | 1 | 1 | 4 | 0 | swap `low` and `mid`, `low++`, `mid++` | `[0,0,2,1,1,2]` |
| 4 | 2 | 2 | 4 | 2 | swap `mid` and `high`, `high--` | `[0,0,1,1,2,2]` |
| 5 | 2 | 2 | 3 | 1 | `mid++` | `[0,0,1,1,2,2]` |
| 6 | 2 | 3 | 3 | 1 | `mid++` | `[0,0,1,1,2,2]` |

Ab:

```txt
mid = 4
high = 3
```

So:

```txt
mid > high
```

Meaning:

```txt
unknown region khatam
```

Final answer:

```txt
[0,0,1,1,2,2]
```

---

## STEP 12: Quick Reference

### Regions

```txt
[0 ... low-1]    -> 0s
[low ... mid-1]  -> 1s
[mid ... high]   -> unknown
[high+1 ... n-1] -> 2s
```

### Rules

```txt
if nums[mid] == 0:
  swap(low, mid)
  low++
  mid++

if nums[mid] == 1:
  mid++

if nums[mid] == 2:
  swap(mid, high)
  high--
  mid same
```

### Most important memory

```txt
2 case me mid ko mat badhao
kyunki naya nums[mid] abhi unknown hai
```
