# Next Permutation — Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Hume array ko in-place next lexicographically greater permutation me convert karna hai.

Simple words me:

```txt
current arrangement se just next bada arrangement chahiye
```

Agar current arrangement already sabse bada hai,
toh smallest arrangement me wrap karna hai.

Example:

```txt
[1,2,3]
[1,3,2]
[2,1,3]
[2,3,1]
[3,1,2]
[3,2,1]
```

Agar current:

```txt
[1,3,2]
```

toh next:

```txt
[2,1,3]
```

---

## STEP 2: Brute Force

Sabse seedhi soch:
- saari unique permutations generate karo
- unhe lexicographic order me rakho
- current permutation ka index find karo
- uske next wali permutation use karo

Example:

```txt
nums = [1,2,3]
```

Saari permutations:

```txt
[1,2,3]
[1,3,2]
[2,1,3]
[2,3,1]
[3,1,2]
[3,2,1]
```

Current `[1,2,3]` hai,
toh next `[1,3,2]` hogi.

Correct hai,
but obviously bahut heavy hai.

---

## STEP 3: Key Insight

Sabse important observation:

```txt
right side ka descending suffix already largest arrangement hota hai
```

Example:

```txt
[1, 3, 2]
```

Right side `[3,2]` descending hai.

Is descending suffix ke andar rehkar
current arrangement se next larger permutation nahi ban sakti.

Kyun?

Kyunki descending order already us suffix ka maximum arrangement hota hai.

So next larger permutation lane ke liye
hume uske left me kuch change karna padega.

Yehi pivot idea hai.

---

## STEP 4: Why This Technique Works

Chalo slowly derive karte hain.

### Part 1: Pivot right se hi kyun dhoondte hain?

Hume "just next" permutation chahiye.
Isliye change sabse right possible jagah par karna chahiye.

Example:

```txt
[1, 3, 2]
```

Right se dekho:

```txt
3, 2  -> descending
1, 3  -> yahan increase possible hai
```

So pivot = index of `1`

### Part 2: Pivot ke right me rightmost greater hi kyun choose karte hain?

Suffix descending hai.

Example:

```txt
pivot value = 1
suffix = [3,2]
```

Pivot se bade values:

```txt
3, 2
```

Hume just next larger arrangement chahiye,
toh pivot ko jitna chhota possible larger value mile, utna better.

Descending suffix me rightmost greater element hi
just-bigger element hota hai.

Yahan:

```txt
rightmost greater than 1 = 2
```

### Part 3: Swap ke baad suffix reverse kyun?

Swap ke baad pivot position par minimum required increase aa gaya.
Ab right side ko smallest possible banana hai,
taaki overall permutation just next rahe.

Swap ke time tak suffix descending hota hai.
Descending array ka smallest arrangement kya hota hai?

```txt
usko reverse kar do
```

So:

```txt
swap for minimal increase
reverse suffix for minimal tail
```

Yahi final answer deta hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `pivot` | right se first index jahan `nums[pivot] < nums[pivot+1]` |
| `successor` | suffix me rightmost element jo pivot value se bada hai |
| `left`, `right` | reverse ke time suffix reverse karne ke pointers |

Important:
- pivot ke right ka part non-increasing suffix hota hai
- successor pivot se just-bigger replacement hota hai

---

## STEP 6: Mental Model

Is problem ko aise socho:

```txt
Array ek dictionary word ki tarah hai.
Hume next dictionary word chahiye.
```

Process:

1. right side ka maximum block identify karo
2. pehle possible place par thoda sa increase karo
3. baaki tail ko minimum bana do

Short memory line:

```txt
find pivot
swap with just bigger
reverse suffix
```

---

## STEP 7: Boundary Cases

1. Single element
   same array

2. Already largest permutation
   `[3,2,1] -> [1,2,3]`

3. Duplicates
   `[1,1,5] -> [1,5,1]`

4. Already smallest
   `[1,2,3] -> [1,3,2]`

---

## STEP 8: Conditions

### Condition 1: `while (pivot >= 0 && nums[pivot] >= nums[pivot + 1])`

Ye right se descending suffix find kar raha hai.

Jab tak:

```txt
nums[pivot] >= nums[pivot + 1]
```

suffix non-increasing hai.

### Condition 2: `if (pivot >= 0)`

Pivot mila hai.
Matlab current array largest permutation nahi hai.

### Condition 3: `while (nums[successor] <= nums[pivot])`

Right se pehla aisa element dhoondo jo pivot value se bada ho.

### Condition 4: `reverse(nums, pivot + 1, nums.length - 1)`

Suffix ko smallest possible order me lana hai.

If pivot `-1` hai,
toh ye whole array reverse kar dega.

---

## STEP 9: Adjustment Logic

Exact flow:

1. pivot dhoondo
2. agar pivot mila:
   - successor dhoondo
   - swap karo
3. suffix reverse karo

Order important hai.

Agar reverse pehle kar diya,
toh pivot logic hi toot jayega.

---

## STEP 10: Answer Formula

Yahan koi math formula nahi hai.

Answer rule simple hai:

```txt
minimum possible increase at pivot
+ minimum possible suffix
```

Operational form:

```txt
swap pivot with just-bigger successor
reverse suffix
```

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [1, 3, 2]
```

### Find Pivot

Right se start:

| Step | pivot | nums[pivot] | nums[pivot+1] | Condition `nums[pivot] >= nums[pivot+1]` | Action |
|---:|---:|---:|---:|---|---|
| 1 | 1 | 3 | 2 | Yes | `pivot--` |
| 2 | 0 | 1 | 3 | No | stop |

So:

```txt
pivot = 0
pivot value = 1
suffix = [3,2]
```

### Find Successor

Start from right:

| Step | successor | nums[successor] | Check `nums[successor] <= nums[pivot]` | Action |
|---:|---:|---:|---|---|
| 1 | 2 | 2 | `2 <= 1` -> No | stop |

So:

```txt
successor = 2
successor value = 2
```

### Swap

Before:

```txt
[1,3,2]
```

After swap pivot and successor:

```txt
[2,3,1]
```

### Reverse Suffix

Reverse from `pivot + 1 = 1` to end:

Current suffix:

```txt
[3,1]
```

After reverse:

```txt
[1,3]
```

Final array:

```txt
[2,1,3]
```

---

## STEP 12: Quick Reference

```txt
Goal:
Current arrangement se just next larger permutation

Brute force:
Saari permutations banao
current dhoondo
next copy karo

Optimal:
1. find pivot from right
2. find rightmost greater successor
3. swap
4. reverse suffix

If no pivot:
reverse whole array

Why reverse suffix?
Minimum possible tail chahiye
```
