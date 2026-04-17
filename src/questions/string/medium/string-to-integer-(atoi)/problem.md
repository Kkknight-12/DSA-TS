# String to Integer (atoi)

## Problem

String `s` diya hai.
Usko 32-bit signed integer me convert karna hai.

Rules:

```txt
1. Leading spaces ignore karo
2. Optional sign read karo: '+' or '-'
3. Digits read karo jab tak digit mil rahe hain
4. First non-digit par stop karo
5. Agar koi digit nahi mila, return 0
6. Answer 32-bit signed integer range me clamp karo
```

32-bit signed integer range:

```txt
INT_MIN = -2147483648
INT_MAX =  2147483647
```

Examples:

```txt
s = "42"
answer = 42

s = "   -42"
answer = -42

s = "4193 with words"
answer = 4193

s = "words and 987"
answer = 0

s = "-91283472332"
answer = -2147483648
```

## Important Parsing Order

Parsing order fixed hai:

```txt
spaces -> sign -> digits -> stop
```

Sign sirf leading spaces ke baad valid hota hai.

```txt
"   -42" -> -42
"42-10"  -> 42
"+-12"   -> 0
"  + 12" -> 0
```

## Approach 1: Brute Force - Manual Parser

Manually phases follow karo:

```txt
1. spaces skip
2. sign detect
3. digits parse
4. overflow check
5. sign apply
```

Prerequisite:

```txt
string indexing
ASCII digit conversion
integer boundaries
```

## Approach 2: Optimal - Single Pass With Pre-Overflow Guard

Same parsing rules, but cleaner state design.

Key idea:

```txt
overflow result * 10 + digit karne se pehle check karo
```

Why?

```txt
agar calculate karne ke baad check karoge,
toh overflow already ho chuka ho sakta hai
```

Prerequisite:

```txt
integer overflow guard
Math.floor(INT_MAX / 10)
last digit boundary 7/8
```

## Complexity Comparison

| Approach | Idea | Time | Space | Notes |
|---|---|---:|---:|---|
| Brute Force | Explicit parser phases | O(n) | O(1) | Easy to trace |
| Optimal | Same parser with cleaner guard constants | O(n) | O(1) | Interview-ready |

There is no better asymptotic solution than `O(n)` because input may need to be scanned until parsing stops.

## Core Insight

Atoi is not just number conversion.
It is a controlled parser.

Short memory:

```txt
skip spaces
read sign
consume digits
clamp overflow
stop at first invalid character
```
