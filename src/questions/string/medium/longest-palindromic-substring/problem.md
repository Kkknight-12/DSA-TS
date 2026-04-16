# Longest Palindromic Substring

## Problem

String `s` diya hai.
Return karo `s` ke andar ka longest substring jo palindrome ho.

Palindrome ka matlab:

```txt
left se right same
right se left same
```

Example:

```txt
s = "babad"
answer = "bab"
```

`"aba"` bhi valid answer hai, kyunki same maximum length ka palindrome hai.

Another example:

```txt
s = "cbbd"
answer = "bb"
```

## Important Words

Substring continuous hota hai.

```txt
"babad"

"bab" -> substring
"bad" -> substring
"bb"  -> not substring, because characters continuous nahi hain
```

Subsequence continuous hona zaruri nahi hota.
But this problem substring ka hai, so continuity mandatory hai.

## Approach 1: Brute Force

Har possible substring generate karo.
Har substring ko palindrome check karo.
Longest valid substring return karo.

Soch:

```txt
try every continuous piece
keep the biggest piece that reads same both ways
```

Prerequisite:

```txt
two pointer palindrome check
```

## Approach 2: Better - Expand Around Center

Palindrome center se grow hota hai.

Odd length palindrome:

```txt
"bab"
  ^
one character center
```

Even length palindrome:

```txt
"bb"
 ^^
gap between two equal characters is center
```

Har index ko center maan kar left/right expand karo.
Longest expansion track karo.

Prerequisite:

```txt
two pointer expansion
```

## Approach 3: Optimal - Manacher's Algorithm

Manacher's Algorithm center expansion ko optimize karta hai.
Ye previously found palindrome ka mirror information reuse karta hai.

Main ideas:

```txt
1. string transform karo so odd/even palindrome ek jaise behave kare
2. radius array banao
3. current center ke mirror se minimum guaranteed radius reuse karo
4. sirf boundary ke bahar actual expansion karo
```

Prerequisite:

```txt
palindrome center expansion
mirror property
radius array thinking
```

Ye advanced optimal approach hai.
Interview me usually expand-around-center enough hota hai unless specifically linear time expected ho.

## Complexity Comparison

| Approach | Idea | Time | Space | Prerequisite |
|---|---|---:|---:|---|
| Brute force | Generate substrings and check palindrome | O(n^3) | O(1) | two pointers |
| Better | Expand around every possible center | O(n^2) | O(1) | center expansion |
| Optimal | Manacher mirror reuse | O(n) | O(n) | transformed string + radius array |

## Core Insight

Palindrome ka strongest visual signal center symmetry hai.

Short memory:

```txt
longest palindrome = biggest center expansion
```

Manacher version ka short memory:

```txt
if current index is inside a known palindrome,
mirror index can give a safe starting radius
```
