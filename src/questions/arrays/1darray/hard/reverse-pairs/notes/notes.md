# Reverse Pairs - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Array `nums` diya hai.
Hume count karna hai kitne pairs `(i, j)` exist karte hain such that:

```txt
i < j
nums[i] > 2 * nums[j]
```

Example:

```txt
nums = [1, 3, 2, 3, 1]
```

Check valid pairs:

```txt
(1, 4): nums[1] = 3, nums[4] = 1
        3 > 2 * 1 -> true

(3, 4): nums[3] = 3, nums[4] = 1
        3 > 2 * 1 -> true
```

Answer:

```txt
2
```

Important detail:

```txt
nums[i] > nums[j]
```

enough nahi hai.
Condition stricter hai:

```txt
nums[i] > 2 * nums[j]
```

---

## Prerequisites

Optimal solution samajhne ke liye ye concepts pehle clear hone chahiye:

| Concept | Kyun chahiye |
|---|---|
| Merge Sort | Array ko recursively split karke sorted halves banane ke liye |
| Two pointers on sorted arrays | Sorted left/right halves ke cross pairs fast count karne ke liye |

Brute force ke liye koi special prerequisite nahi hai.
Lekin optimal approach directly Merge Sort ke structure par depend karti hai.

---

## STEP 2: Brute Force

Sabse direct thought:

```txt
har i ke liye
  har j > i ke liye
    check nums[i] > 2 * nums[j]
```

Example:

```txt
nums = [1, 3, 2, 3, 1]
```

| `i` | `nums[i]` | `j` values checked | Valid reverse pairs |
|---:|---:|---|---|
| 0 | 1 | 3, 2, 3, 1 | none |
| 1 | 3 | 2, 3, 1 | `(1, 4)` |
| 2 | 2 | 3, 1 | none because `2 > 2 * 1` is false |
| 3 | 3 | 1 | `(3, 4)` |
| 4 | 1 | none | none |

Answer:

```txt
2
```

Brute force correct hai,
but slow hai.

Why slow?

For each index, hum uske baad ke almost saare elements check kar rahe hain.

```txt
n elements -> roughly n * n pair checks
```

So time:

```txt
O(n^2)
```

---

## STEP 3: Key Insight

Condition:

```txt
nums[i] > 2 * nums[j]
```

Brute force me problem ye hai:

```txt
har nums[i] ke liye right side ke elements individually check ho rahe hain
```

But agar right side sorted ho,
toh hum ek-ek pair manually check nahi karenge.

Example:

```txt
left value = 4
right sorted half = [1, 5]
```

Check:

```txt
4 > 2 * 1 -> true
4 > 2 * 5 -> false
```

Since right half sorted hai,
`1` ke baad larger values aayengi.
Jaise hi condition false hoti hai,
uske baad ke right values bhi false honge for same left value.

This is where merge sort helps.

Merge sort naturally gives:

```txt
sorted left half
sorted right half
```

Then cross pairs fast count ho sakte hain.

---

## STEP 4: Why Merge Sort Works

Merge sort ka normal kaam:

```txt
array split karo
left sort karo
right sort karo
merge karo
```

Reverse pairs ke liye hum extra counting add karte hain.

Har segment me pairs 3 types ke ho sakte hain:

```txt
1. left half ke andar
2. right half ke andar
3. left half se right half ke beech
```

Visual:

```txt
[ left half ][ right half ]
      i            j
```

Recursive calls:

- left half ke andar wale pairs count kar deti hain
- right half ke andar wale pairs count kar deti hain

Current call ka kaam:

```txt
left half vs right half ke cross pairs count karna
```

Important:

Cross pairs count karte time:

```txt
i left half me hota hai
j right half me hota hai
```

So automatically:

```txt
i < j
```

because left half original segment me right half se pehle aata hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `left` | current segment ka start index |
| `right` | current segment ka end index |
| `mid` | segment split point |
| `leftPointer` | sorted left half me current index |
| `rightPointer` | sorted right half me current index |
| `leftPairs` | left half ke andar reverse pairs |
| `rightPairs` | right half ke andar reverse pairs |
| `crossPairs` | left half vs right half reverse pairs |
| `sorted` | merge ke time temporary sorted array |

Short memory:

```txt
leftPairs + rightPairs + crossPairs = total pairs for current segment
```

---

## STEP 6: Mental Model

Soch:

```txt
Main array ko tod raha hoon,
phir chhote sorted pieces se answer bana raha hoon.
```

For each segment:

```txt
[left..right]
```

we do:

```txt
1. left part solve
2. right part solve
3. cross pairs count
4. merge sorted
```

Why count before merge?

Before merge:

```txt
[ sorted left half ][ sorted right half ]
```

Yahan hume clearly pata hai:

```txt
i left half se hai
j right half se hai
```

After merge:

```txt
[ fully sorted segment ]
```

Values mix ho jaati hain.
Left/right identity clear nahi rehti.

So:

```txt
cross pairs merge se pehle count karo
then merge karo
```

---

## STEP 7: Boundary Cases

1. Empty array

```txt
[] -> 0
```

2. Single element

```txt
[1] -> 0
```

3. Increasing array

```txt
[1,2,3,4,5] -> 0
```

4. Decreasing array

```txt
[5,4,3,2,1] -> 4
```

5. Same values

```txt
[1,1,1,1] -> 0
```

6. Negative values

```txt
[-5,-5] -> 1
```

Why?

```txt
-5 > 2 * -5
-5 > -10
true
```

So negative values ko normal numeric comparison se hi handle karna hai.

---

## STEP 8: Conditions

### Base condition

```txt
if (left >= right) return 0
```

Why?

Single element segment me pair nahi ban sakta.
Pair ke liye 2 indices chahiye.

### Reverse pair condition

```txt
nums[leftPointer] > 2 * nums[rightPointer]
```

Why `2 * nums[rightPointer]`?

Because problem exactly ye condition ask karta hai.

### Cross count loop

```txt
while (
  rightPointer <= right &&
  nums[leftPointer] > 2 * nums[rightPointer]
)
```

Meaning:

```txt
current left value ke liye right half ke kitne starting values valid hain?
```

Right half sorted hai.
So valid values ek continuous prefix banate hain.

Example:

```txt
left value = 4
right half = [1, 5]
```

| right value | Check | Result |
|---:|---|---|
| 1 | `4 > 2 * 1` -> `4 > 2` | true |
| 5 | `4 > 2 * 5` -> `4 > 10` | false |

Valid prefix:

```txt
[1]
```

---

## STEP 9: Adjustment Logic

### Why `rightPointer++`?

When condition is true:

```txt
nums[leftPointer] > 2 * nums[rightPointer]
```

that current right value is valid.

So we move:

```txt
rightPointer++
```

to check whether next right value is also valid.

### Why count is `rightPointer - (mid + 1)`?

Derive slowly.

Right half starts at:

```txt
mid + 1
```

Suppose:

```txt
mid + 1 = 3
rightPointer = 4
```

This means valid right indices are:

```txt
3 to rightPointer - 1
3 to 3
```

Count:

```txt
4 - 3 = 1
```

So:

```txt
number of valid right values = rightPointer - (mid + 1)
```

### Why `rightPointer` does not reset

This is the most important part.

Suppose:

```txt
left half  = [2, 3, 4]
right half = [1, 5]
```

For `left value = 3`:

```txt
3 > 2 * 1 -> true
3 > 2 * 5 -> false
```

So valid right values:

```txt
[1]
```

Now move to next left value:

```txt
left value = 4
```

Since left half sorted hai:

```txt
4 >= 3
```

Jo right values `3` ke liye valid the,
woh `4` ke liye bhi valid rahenge.

So `rightPointer` ko wapas start par reset karne ki zarurat nahi.

This saves time.

Instead of repeatedly checking same right values,
rightPointer only moves forward.

---

## STEP 10: Answer Formula

For each segment:

```txt
total pairs =
  pairs in left half
+ pairs in right half
+ cross pairs between left and right
```

In code:

```txt
return leftPairs + rightPairs + crossPairs
```

Cross pairs are counted as:

```txt
for each leftPointer:
  move rightPointer while reverse pair condition is true
  add rightPointer - (mid + 1)
```

Why this is enough:

- left half sorted hai
- right half sorted hai
- rightPointer never moves backward
- each valid right prefix is counted in one shot

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [2, 4, 3, 5, 1]
```

Expected answer:

```txt
3
```

Valid pairs:

```txt
(4, 1)
(3, 1)
(5, 1)
```

### Recursive split and merge summary

| Step | Segment | Work | Count returned | Segment after merge |
|---:|---|---|---:|---|
| 1 | `[2]` | single element | 0 | `[2]` |
| 2 | `[4]` | single element | 0 | `[4]` |
| 3 | `[2,4]` | cross count `[2]` vs `[4]` | 0 | `[2,4]` |
| 4 | `[3]` | single element | 0 | `[3]` |
| 5 | `[2,4,3]` | cross count `[2,4]` vs `[3]` | 0 | `[2,3,4]` |
| 6 | `[5]` | single element | 0 | `[5]` |
| 7 | `[1]` | single element | 0 | `[1]` |
| 8 | `[5,1]` | cross count `[5]` vs `[1]` | 1 | `[1,5]` |
| 9 | `[2,4,3,5,1]` | cross count `[2,3,4]` vs `[1,5]` | 2 | `[1,2,3,4,5]` |

Total:

```txt
0 + 1 + 2 = 3
```

### Final cross count in detail

At final level:

```txt
left sorted half  = [2, 3, 4]
right sorted half = [1, 5]
```

Here:

```txt
mid + 1 = start of right half
rightPointer starts at index 3
nums[rightPointer] = 1
```

| Iteration | `leftPointer` value | `rightPointer` start index/value | Checks | `rightPointer` end index/value | Added count | Why |
|---:|---:|---|---|---|---:|---|
| 1 | 2 | index `3`, value `1` | `2 > 2*1` -> false | index `3`, value `1` | 0 | no right value valid |
| 2 | 3 | index `3`, value `1` | `3 > 2*1` -> true, then index `4`, value `5`: `3 > 2*5` -> false | index `4`, value `5` | 1 | only value `1` valid |
| 3 | 4 | index `4`, value `5` | `4 > 2*5` -> false | index `4`, value `5` | 1 | previous valid value `1` is still counted |

Important:

In iteration 3, we still add `1`.

Why?

Because `rightPointer` had already crossed value `1`.
That means value `1` is valid for previous left value `3`.
Since next left value `4` is bigger,
`1` is definitely valid for `4` also.

That is why `rightPointer` does not reset.

Final:

```txt
right half internal pairs = 1
final cross pairs         = 2
answer                    = 3
```

---

## STEP 12: Quick Reference

### Reverse pair condition

```txt
i < j
nums[i] > 2 * nums[j]
```

### Merge sort idea

```txt
left half solve
right half solve
cross pairs count
merge sorted
```

### Cross count

```txt
while nums[leftPointer] > 2 * nums[rightPointer]:
  rightPointer++

count += rightPointer - (mid + 1)
```

### Most important memory

```txt
Count cross pairs before merge.
Do not reset rightPointer because both halves are sorted.
```
