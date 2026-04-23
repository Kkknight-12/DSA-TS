# Pow(x, n)

## Problem Samjho

`x` aur integer `n` diya hai.

Hume calculate karna hai:

```txt
x^n
```

Meaning:

```txt
2^5 = 2 * 2 * 2 * 2 * 2 = 32
```

Negative exponent bhi aa sakta hai:

```txt
2^-3 = 1 / 2^3 = 1 / 8 = 0.125
```

---

## Examples

### Example 1

```txt
Input: x = 2.00000, n = 10
Output: 1024.00000
```

Explanation:

```txt
2^10 = 1024
```

### Example 2

```txt
Input: x = 2.10000, n = 3
Output: 9.26100
```

Explanation:

```txt
2.1^3 = 2.1 * 2.1 * 2.1 = 9.261
```

### Example 3

```txt
Input: x = 2.00000, n = -2
Output: 0.25000
```

Explanation:

```txt
2^-2 = 1 / 2^2 = 1 / 4 = 0.25
```

---

## Constraints

```txt
-100.0 < x < 100.0
-2^31 <= n <= 2^31 - 1
n is an integer
Either x != 0 OR n > 0
-10^4 <= x^n <= 10^4
```

Important:

```txt
n bahut bada ho sakta hai.
So O(n) multiplication practical nahi hai.
```

---

## Approach 1: Brute Force

### Prerequisites

| concept | why needed |
|---|---|
| Loop | `x` ko repeatedly multiply karna hai |
| Negative exponent | `x^-n = 1 / x^n` samajhna hai |

### Intuition

Sabse direct soch:

```txt
x^n means x ko n times multiply karo.
```

Example:

```txt
2^5
= 1 * 2 * 2 * 2 * 2 * 2
= 32
```

Negative exponent ke liye:

```txt
2^-3 = (1/2)^3
```

### Limitation

If:

```txt
n = 1,000,000,000
```

Then loop runs:

```txt
1,000,000,000 times
```

So brute force conceptually simple hai, but large input ke liye slow.

---

## Approach 2: Optimal Recursive Binary Exponentiation

### Prerequisites

| concept | why needed |
|---|---|
| Recursion | same power problem ko smaller exponent par solve karna hai |
| Divide and conquer | exponent ko half karna hai |
| Even / odd exponent | odd exponent me ek extra `x` bachta hai |

### Key Insight

Instead of multiplying `x` again and again:

```txt
2^10 = 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2
```

We can split exponent:

```txt
2^10 = 2^5 * 2^5
```

Now calculate `2^5` once, then square it.

Even exponent:

```txt
x^10 = x^5 * x^5
```

Odd exponent:

```txt
x^9 = x^4 * x^4 * x
```

Why extra `x`?

```txt
9 = 4 + 4 + 1
```

### Mental Model

```txt
2^10
  needs 2^5
    needs 2^2
      needs 2^1
        needs 2^0
```

Return side:

```txt
2^0 = 1
2^1 = 1 * 1 * 2 = 2
2^2 = 2 * 2 = 4
2^5 = 4 * 4 * 2 = 32
2^10 = 32 * 32 = 1024
```

This is why time becomes:

```txt
O(log n)
```

---

## Approach 3: Optimal Iterative Binary Exponentiation

### Prerequisites

| concept | why needed |
|---|---|
| Binary representation | exponent ko powers of 2 ke sum ke form me read karna hai |
| Loop | recursion stack avoid karna hai |
| Even / odd check | current bit include karni hai ya skip, ye decide hota hai |

### Key Insight

Every exponent can be written as sum of powers of 2.

Example:

```txt
10 = 8 + 2
```

So:

```txt
x^10 = x^(8 + 2)
     = x^8 * x^2
```

Iterative binary exponentiation me:

```txt
base:   x^1 -> x^2 -> x^4 -> x^8
result: only needed powers multiply karta hai
```

If current exponent is odd:

```txt
current base answer ka part hai
```

If current exponent is even:

```txt
current base answer ka part nahi hai
```

Then:

```txt
base = base * base
exponent = floor(exponent / 2)
```

---

## Approach Comparison

| approach | idea | time | space | practical? |
|---|---|---:|---:|---|
| Brute force | multiply `x` exactly `|n|` times | O(\|n\|) | O(1) | no for large `n` |
| Recursive binary exponentiation | compute half power, then square | O(log \|n\|) | O(log \|n\|) | yes |
| Iterative binary exponentiation | process exponent bits with loop | O(log \|n\|) | O(1) | best practical |

---

## Which File Teaches What?

| file | purpose |
|---|---|
| `brute-force.ts` | basic multiplication and negative exponent conversion |
| `optimal-recursive.ts` | divide-and-conquer recursion mental model |
| `optimal-iterative.ts` | binary exponentiation without recursion stack |
| `notes/notes.md` | complete bottom-up explanation and dry runs |

---

## Important Edge Cases

| case | expected behavior |
|---|---|
| `n = 0` | answer is `1` |
| `n < 0` | compute reciprocal |
| `x = 1` | answer always `1` |
| `x = -1` | answer depends on even/odd exponent |
| `n` very large | brute force too slow; binary exponentiation needed |
| `n = -2147483648` | JavaScript number can safely hold `2147483648`; in fixed-width integer languages use long |

---

## Final Recommendation

For interviews and real use:

```txt
Use binary exponentiation.
```

If recursion is allowed:

```txt
recursive version is easier to explain.
```

If space optimization is preferred:

```txt
iterative version is best because it uses O(1) extra space.
```
