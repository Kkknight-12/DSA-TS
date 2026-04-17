# Sort Characters By Frequency

## Problem

String `s` diya hai.
Return a string jisme characters decreasing frequency order me arranged hon.

Meaning:

```txt
jo character zyada baar aaya hai,
woh output me pehle aana chahiye
```

Same character output me group ke form me aana chahiye.

Examples:

```txt
s = "tree"
answer = "eetr" or "eert"
```

`e` frequency `2` hai, `t` and `r` frequency `1` hai.
So `e` group pehle aana chahiye.
`t` and `r` same frequency ke hain, so unka relative order flexible hai.

```txt
s = "cccaaa"
answer = "cccaaa" or "aaaccc"
```

`c` and `a` dono frequency `3` hain.
Both group orders valid hain.

## Important Detail

Equal frequency characters ka order fixed nahi hota unless problem explicitly bole.

So tests ko ye check karna chahiye:

```txt
1. output me same characters same count ke saath present hain
2. character groups frequency descending order me hain
```

Not always:

```txt
output === one exact string
```

## Approach 1: Brute Force - Frequency Map + Sort

Steps:

```txt
1. character frequency count karo
2. map entries ko array me convert karo
3. frequency descending order me sort karo
4. character ko frequency times repeat karke answer banao
```

Prerequisite:

```txt
Map
sorting comparator
string repeat
```

## Approach 2: Optimal - Bucket Sort By Frequency

Frequency ki maximum value `n` ho sakti hai.

So:

```txt
bucket[frequency] = characters with that frequency
```

Then buckets ko high frequency se low frequency tak traverse karo.

Example:

```txt
s = "tree"

frequency:
t -> 1
r -> 1
e -> 2

bucket[1] = [t, r]
bucket[2] = [e]

read from high to low:
e twice, then t/r once
```

Prerequisite:

```txt
frequency map
bucket sort idea
array of arrays
```

## Complexity Comparison

| Approach | Idea | Time | Space | Best for |
|---|---|---:|---:|---|
| Brute Force | Count then sort unique chars | O(n + k log k) | O(n + k) | Simple and practical |
| Optimal | Count then bucket by frequency | O(n + k) | O(n + k) | Avoid comparison sort |

`n` = string length.
`k` = unique characters.

Since `k <= n`, optimal bucket approach is linear in terms of input size.

## Core Insight

Problem character order ka nahi, frequency order ka hai.

Short memory:

```txt
count first
then output high frequency groups first
```
