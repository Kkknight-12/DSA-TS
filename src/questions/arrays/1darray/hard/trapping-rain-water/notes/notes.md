# Trapping Rain Water — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Array `height` diya hai.
Har element ek bar ki height hai.
Har bar ki width `1` hai.

Rain ke baad bars ke beech kitna paani rukega,
uska total return karna hai.

Example:

```txt
height = [4, 2, 0, 3, 2, 5]
```

Visual (`# = bar`, `. = empty`):

```txt
L5 | . . . . . #
L4 | # . . . . #
L3 | # . . # . #
L2 | # # . # # #
L1 | # # . # # #
     4 2 0 3 2 5
```

Water after rain (`~ = trapped water`):

```txt
L5 | . . . . . #
L4 | # ~ ~ ~ ~ #
L3 | # ~ ~ # ~ #
L2 | # # ~ # # #
L1 | # # ~ # # #
     4 2 0 3 2 5
```

Answer:

```txt
9
```

---

## STEP 2: Brute Force

Har index `i` par socho:

```txt
is bar ke upar maximum kitna paani ruk sakta hai?
```

Uske liye hume chahiye:

- `0..i` tak tallest wall, current bar included
- `i..n-1` tak tallest wall, current bar included

Current bar ko include karna important hai.
Maan lo current height `3` hai.
Toh `leftMax` aur `rightMax` dono at least `3` honge,
because current bar dono ranges me included hai.

Iska benefit:

```txt
min(leftMax, rightMax) - height[i]
```

negative nahi banega.

Then:

```txt
water level at i = min(leftMax, rightMax)
water trapped at i = water level - height[i]
```

So brute force:

1. Har index ke liye left scan karo
2. Har index ke liye right scan karo
3. Water add karo

Correct hai,
but slow hai because same maxima baar-baar recompute ho rahe hain.

---

## STEP 3: Key Insight

Pehle ek index par manually socho.

Example:

```txt
height = [4, 2, 0, 3, 2, 5]
index i = 2
height[i] = 0
```

`i = 2` ke liye:

```txt
left range  = [4, 2, 0]       -> leftMax = 4
right range = [0, 3, 2, 5]    -> rightMax = 5
```

Paani ka level taller wall `5` tak nahi ja sakta,
kyunki left wall `4` par overflow ho jayega.

So water level:

```txt
min(4, 5) = 4
```

Current bar height `0` hai,
so trapped water:

```txt
4 - 0 = 4
```

Yahi pattern formula ban jata hai:

```txt
waterAtI = min(leftMax, rightMax) - height[i]
```

Why `min`?

Because paani taller wall se decide nahi hota.
Paani chhoti wall ke upar se overflow ho jayega.

Isliye effective boundary hamesha:

```txt
smaller side
```

Ab optimization chain:

1. Brute force:
   har index pe maxima fresh scan karo
2. Better:
   leftMax[] aur rightMax[] precompute kar lo
3. Optimal:
   arrays bhi mat banao, 2 pointers se smaller boundary side process karo

---

## STEP 4: Why This Technique Works

Suppose current index `i` par:

```txt
leftMax = 0..i tak tallest wall
rightMax = i..n-1 tak tallest wall
```

Water level kitna ho sakta hai?

### Case 1: `leftMax < rightMax`

Example:

```txt
left wall  = 4
right wall = 7
current    = 1
```

Then water level:

```txt
min(4,7) = 4
```

Right wall kitni bhi badi ho,
uska koi fayda nahi beyond 4.

### Case 2: `rightMax < leftMax`

Then water level:

```txt
min(leftMax, rightMax) = rightMax
```

So:

```txt
smaller boundary hi paani ka actual limit hai
```

This is the full reason behind all 3 approaches.

---

## STEP 5: Variables

### Better approach

| Variable | Meaning |
|---|---|
| `leftMax[i]` | `0..i` tak tallest wall |
| `rightMax[i]` | `i..n-1` tak tallest wall |
| `totalWater` | total trapped water |

### Optimal approach

| Variable | Meaning |
|---|---|
| `left` | current left pointer |
| `right` | current right pointer |
| `leftMax` | ab tak left side ki tallest wall |
| `rightMax` | ab tak right side ki tallest wall |
| `totalWater` | final answer |

Short memory:

```txt
leftMax / rightMax are moving boundaries
```

---

## STEP 6: Mental Model

Array ko valley terrain samjho.

Water har jagah nahi rukta.
Sirf wahan rukta hai jahan:

```txt
left me wall
and right me wall
```

Visual:

```txt
wall      gap      wall
 4         0        5
```

Yahan gap ke upar paani ruk sakta hai.

Lekin:

```txt
water level = smaller wall
```

Soch:

```txt
the shorter side is the real bottleneck
```

---

## STEP 7: Boundary Cases

1. Empty array

```txt
[] -> 0
```

2. Single bar

```txt
[5] -> 0
```

3. Two bars

```txt
[2,1] -> 0
```

4. Strictly increasing

```txt
[1,2,3,4,5] -> 0
```

5. Strictly decreasing

```txt
[5,4,3,2,1] -> 0
```

6. Single valley

```txt
[3,0,3] -> 3
```

---

## STEP 8: Conditions

### Better approach condition

At every index:

```txt
waterAtI = min(leftMax[i], rightMax[i]) - height[i]
```

Because:
- `leftMax[i]` tells best boundary from `0..i`
- `rightMax[i]` tells best boundary from `i..n-1`
- smaller one controls final water level

### Optimal approach key condition

```txt
if (leftMax <= rightMax)
```

then process left side.

Why?

Because `rightMax` already `leftMax` jitna ya usse bada hai.

Matlab:

```txt
right side par enough wall mil chuki hai
```

So current `left` index ke liye right boundary ka doubt khatam.
Final bottleneck left side ka `leftMax` hi banega.

Isliye current `left` ka water:

```txt
leftMax - height[left]
```

safely add kar sakte hain.

Else:

```txt
rightMax < leftMax
```

toh right side safely process kar sakte hain.

Kyunki ab left side par enough wall mil chuki hai,
and current `right` index ka bottleneck `rightMax` hai.

---

## STEP 9: Adjustment Logic

### Better approach

No pointer adjustment logic.
Bas arrays build karo aur final pass me answer nikalo.

### Optimal approach

Yahan real adjustment hai:

#### If `leftMax <= rightMax`

```txt
left side process karo
left++
```

Why move left?

Because current left index ka water fully decide ho gaya.
Ab next left index dekhna hai.

#### Else

```txt
right side process karo
right--
```

Why move right?

Because current right index ka water fully decide ho gaya.

Most important thing:

```txt
smaller max side hi move hoti hai
```

because wahi side safe hai.

---

## STEP 10: Answer Formula

Base formula har approach me same hai:

```txt
waterAtI = min(left boundary, right boundary) - height[i]
```

Total answer:

```txt
sum of waterAtI over all indices
```

Optimal approach me koi new formula invent nahi hota.
Bas same formula ko smarter way me compute karte hain.

---

## STEP 11: Full Dry Run

Example:

```txt
height = [4, 2, 0, 3, 2, 5]
```

Start:

```txt
left = 0
right = 5
leftMax = 0
rightMax = 0
totalWater = 0
```

| Iteration | `left` | `right` | `leftMax` after update | `rightMax` after update | Which side safe? | Water added | `totalWater` |
|---|---:|---:|---:|---:|---|---:|---:|
| 1 | 0 | 5 | 4 | 5 | left (`4 <= 5`) | `4 - 4 = 0` | 0 |
| 2 | 1 | 5 | 4 | 5 | left | `4 - 2 = 2` | 2 |
| 3 | 2 | 5 | 4 | 5 | left | `4 - 0 = 4` | 6 |
| 4 | 3 | 5 | 4 | 5 | left | `4 - 3 = 1` | 7 |
| 5 | 4 | 5 | 4 | 5 | left | `4 - 2 = 2` | 9 |
| 6 | 5 | 5 | 5 | 5 | left | `5 - 5 = 0` | 9 |

After iteration 6:

```txt
left becomes 6
right is 5
```

Loop stops because:

```txt
left > right
```

Final answer:

```txt
9
```

### Small dry run that shows the `right--` branch

Upar wale example me har baar left side process hui,
isliye `else` branch visible nahi hui.
Right branch samajhne ke liye chhota example dekho:

```txt
height = [5, 2, 1, 2, 1]
```

Start:

```txt
left = 0
right = 4
leftMax = 0
rightMax = 0
totalWater = 0
```

| Iteration | `left` | `right` | `leftMax` after update | `rightMax` after update | Condition | Action | Water added | `totalWater` |
|---|---:|---:|---:|---:|---|---|---:|---:|
| 1 | 0 | 4 | 5 | 1 | `5 <= 1` false | process right, `right--` | `1 - 1 = 0` | 0 |
| 2 | 0 | 3 | 5 | 2 | `5 <= 2` false | process right, `right--` | `2 - 2 = 0` | 0 |
| 3 | 0 | 2 | 5 | 2 | `5 <= 2` false | process right, `right--` | `2 - 1 = 1` | 1 |
| 4 | 0 | 1 | 5 | 2 | `5 <= 2` false | process right, `right--` | `2 - 2 = 0` | 1 |
| 5 | 0 | 0 | 5 | 5 | `5 <= 5` true | process left, `left++` | `5 - 5 = 0` | 1 |

Dhyan do:

```txt
rightMax < leftMax
```

tha, so right side safe thi.
Left side par already `rightMax` se badi wall available thi.
Current right index ka final bottleneck `rightMax` hi tha.

---

## STEP 12: Quick Reference

### Core formula

```txt
waterAtI = min(leftMax, rightMax) - height[i]
```

### Better approach

```txt
precompute leftMax[]
precompute rightMax[]
then sum water
```

### Optimal approach

```txt
update leftMax and rightMax
smaller max side process karo
same side pointer move karo
```

### Most important memory

```txt
the smaller boundary is the bottleneck
```
