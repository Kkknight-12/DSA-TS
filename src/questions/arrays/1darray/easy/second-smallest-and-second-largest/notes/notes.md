# Second Smallest and Second Largest - Notes

## 1. Problem Samjho

Array ke do answers find karne hain:

```txt
second smallest distinct value
second largest distinct value
```

Example:

```txt
arr = [1, 2, 4, 7, 7, 5]
```

Sorted view:

```txt
[1, 2, 4, 5, 7, 7]
```

Distinct order:

```txt
[1, 2, 4, 5, 7]
```

So:

```txt
second smallest = 2
second largest  = 5
```

Dhyan do:

```txt
duplicate 7 ko second largest nahi bolenge
```

---

## 2. Brute Force

Sabse visible approach sorting hai.

Pehle sorted copy banao:

```txt
[1, 2, 4, 5, 7, 7]
```

Then:

```txt
left side se smallest duplicate skip karo
right side se largest duplicate skip karo
```

Left se first different value `2` hai.
Right se pehla `7` duplicate hai; uske baad `5` milta hai.

Sorting understanding easy banati hai,
but `O(n log n)` time aur copied array ke liye `O(n)` space leti hai.

---

## 3. Key Insight

Ab sorting hata kar ek element ko manually classify karo.

Second smallest candidate ko satisfy karna hai:

```txt
smallest < candidate < current secondSmallest
```

Second largest candidate ko satisfy karna hai:

```txt
current secondLargest < candidate < largest
```

Yahi strict boundaries duplicates ko ignore karti hain.

One-pass ka strongest observation:

```txt
new smallest aaya -> old smallest second smallest ban sakta hai
new largest aaya  -> old largest second largest ban sakta hai
```

---

## 4. Why This Technique Works

Suppose current state:

```txt
smallest = 2
secondSmallest = 5
```

Ab new value `1` aayi.

Order becomes:

```txt
1 < 2 < 5
```

So:

```txt
smallest = 1
old smallest 2 -> secondSmallest
```

Same idea largest side par:

```txt
largest = 7
secondLargest = 5
new value = 10
```

Order:

```txt
5 < 7 < 10
```

So old largest `7` new second largest ban jata hai.

---

## 5. Variables

| Variable | Meaning |
|---|---|
| `smallest` | ab tak ki smallest distinct value |
| `secondSmallest` | smallest ke baad closest larger distinct value |
| `largest` | ab tak ki largest distinct value |
| `secondLargest` | largest ke baad closest smaller distinct value |
| `value` | current array element being processed |

Sentinels:

```txt
smallest / secondSmallest = Infinity
largest / secondLargest  = -Infinity
```

Sentinel ka meaning:

```txt
abhi valid candidate mila nahi hai
```

---

## 6. Mental Model

Four slots imagine karo:

```txt
SMALLEST SIDE                 LARGEST SIDE

[smallest] [secondSmallest]   [secondLargest] [largest]
```

Valid order:

```txt
smallest < secondSmallest <= ... <= secondLargest < largest
```

Har new value ko dono sides par independently test karna hai.

Why independently?

```txt
same value smallest-side state aur largest-side state
dono ko affect kar sakti hai
```

---

## 7. Boundary Cases

| Case | Input | Answer | Why |
|---|---|---|---|
| empty | `[]` | `-1, -1` | koi value nahi |
| one element | `[1]` | `-1, -1` | second distinct position nahi |
| all equal | `[7,7,7]` | `-1, -1` | sirf one distinct value |
| two distinct | `[1,2]` | `2, 1` | dono values opposite second positions leti hain |
| duplicate extremes | `[1,1,3,3,2]` | `2, 2` | duplicate min/max ignored |

---

## 8. Conditions

### New smallest

```txt
value < smallest
```

Meaning:

```txt
current smallest ko second position par shift karna hai
```

### Better second smallest

```txt
value > smallest && value < secondSmallest
```

Meaning:

```txt
value smallest ka duplicate nahi hai
aur existing second candidate se closer hai
```

### New largest

```txt
value > largest
```

Meaning:

```txt
current largest ko second position par shift karna hai
```

### Better second largest

```txt
value < largest && value > secondLargest
```

Meaning:

```txt
value largest ka duplicate nahi hai
aur existing second candidate se closer hai
```

---

## 9. Adjustment Logic

### New smallest arrives

Before:

```txt
smallest = 2
secondSmallest = 5
```

Current value:

```txt
1
```

Adjustment order:

```txt
secondSmallest = smallest  -> 2
smallest = value           -> 1
```

Old smallest ko pehle save karna important hai.

### New largest arrives

Before:

```txt
largest = 7
secondLargest = 5
```

Current value:

```txt
10
```

Adjustment:

```txt
secondLargest = largest -> 7
largest = value         -> 10
```

---

## 10. Answer Formula

Valid candidate mil gaya toh tracked value return karo.

Sentinel unchanged hai toh:

```txt
secondSmallest === Infinity  -> -1
secondLargest === -Infinity -> -1
```

Result object:

```txt
{
  secondSmallest,
  secondLargest
}
```

---

## 11. Full Dry Run

Input:

```txt
[1, 2, 4, 7, 7, 5]
```

Initial state:

```txt
smallest       = Infinity
secondSmallest = Infinity
largest        = -Infinity
secondLargest  = -Infinity
```

| Iteration | `value` | Smallest-side action | Largest-side action | State after iteration |
|---:|---:|---|---|---|
| 1 | 1 | new smallest; old `Inf` shifts | new largest; old `-Inf` shifts | `small=1, secondSmall=Inf, large=1, secondLarge=-Inf` |
| 2 | 2 | `1 < 2 < Inf`, so secondSmall=2 | new largest=2, old largest 1 shifts | `1, 2, 2, 1` |
| 3 | 4 | no change | new largest=4, old 2 shifts | `1, 2, 4, 2` |
| 4 | 7 | no change | new largest=7, old 4 shifts | `1, 2, 7, 4` |
| 5 | 7 | no change | duplicate largest; strict `<` fails | `1, 2, 7, 4` |
| 6 | 5 | no change | `4 < 5 < 7`, so secondLargest=5 | `1, 2, 7, 5` |

Final:

```txt
secondSmallest = 2
secondLargest  = 5
```

---

## 12. Quick Reference

Brute force:

```txt
sort copy
skip duplicate extremes
```

Better:

```txt
pass 1 -> smallest, largest
pass 2 -> second candidates
```

Optimal:

```txt
one pass
four tracked states
strict inequalities ignore duplicates
```

Complexity:

| Approach | Time | Space |
|---|---:|---:|
| Brute Force | O(n log n) | O(n) |
| Better | O(n) | O(1) |
| Optimal | O(n) | O(1) |

Best memory line:

```txt
new extreme arrives
old extreme shifts to second place
```

