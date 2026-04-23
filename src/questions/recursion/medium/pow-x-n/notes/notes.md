# Pow(x, n) - Notes

## 1. Problem Samjho

`x` aur `n` diya hai.

Hume calculate karna hai:

```txt
x^n
```

Example:

```txt
x = 2
n = 5
```

Meaning:

```txt
2^5 = 2 * 2 * 2 * 2 * 2 = 32
```

Negative exponent bhi possible hai:

```txt
2^-3 = 1 / 2^3 = 1 / 8 = 0.125
```

So problem sirf multiplication nahi hai.
Hume negative exponent aur large `n` dono handle karne hain.

---

## 2. Brute Force

Direct meaning:

```txt
x^n = x ko n times multiply karo
```

For positive `n`:

| step | result |
|---:|---:|
| start | `1` |
| multiply 1 copy of `2` | `2` |
| multiply 2 copies of `2` | `4` |
| multiply 3 copies of `2` | `8` |
| multiply 4 copies of `2` | `16` |
| multiply 5 copies of `2` | `32` |

For negative `n`:

```txt
x^-n = (1/x)^n
```

Example:

```txt
2^-3 = (1/2)^3 = 0.5^3 = 0.125
```

Problem:

```txt
n can be very large.
```

If:

```txt
n = 1,000,000,000
```

Then brute force does:

```txt
1,000,000,000 multiplications
```

So brute force is too slow.

---

## 3. Key Insight

Power me repeated work hide hota hai.

Instead of:

```txt
2^10 = 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2
```

Think:

```txt
2^10 = 2^5 * 2^5
```

If `2^5` ek baar calculate ho gaya, then `2^10` uska square hai.

Even exponent:

```txt
x^10 = x^5 * x^5
```

Odd exponent:

```txt
x^5 = x^2 * x^2 * x
```

Why extra `x`?

```txt
5 = 2 + 2 + 1
```

This is the full trick behind binary exponentiation.

---

## 4. Why This Technique Works

Exponent ko half karna valid hai because powers add during multiplication.

Rule:

```txt
x^a * x^b = x^(a + b)
```

For even:

```txt
x^10
= x^(5 + 5)
= x^5 * x^5
```

For odd:

```txt
x^5
= x^(2 + 2 + 1)
= x^2 * x^2 * x
```

So every recursive step:

```txt
same problem ko smaller exponent par solve karta hai
```

And every loop step:

```txt
current power ko include/skip karke exponent ka ek bit consume karta hai
```

---

## 5. Variables

### Brute Force

| variable | meaning |
|---|---|
| `base` | multiplication ke liye current base |
| `exponent` | positive count, kitni baar multiply karna hai |
| `result` | ab tak ka built power |
| `count` | ab tak base ki kitni copies result me aa chuki hain |

### Recursive Binary Exponentiation

| variable | meaning |
|---|---|
| `base` | original `x` |
| `exponent` | current positive exponent |
| `halfExponent` | `floor(exponent / 2)` |
| `halfPower` | `base^halfExponent` |

### Iterative Binary Exponentiation

| variable | meaning |
|---|---|
| `result` | selected powers ka product |
| `base` | current power: `x^1`, `x^2`, `x^4`, `x^8`, ... |
| `exponent` | remaining exponent bits to process |

---

## 6. Mental Model

### Recursive Mental Model

```txt
2^10
  needs 2^5
    needs 2^2
      needs 2^1
        needs 2^0
```

Return side:

| returning from | calculation | result |
|---|---|---:|
| `2^0` | base case | `1` |
| `2^1` | `1 * 1 * 2` | `2` |
| `2^2` | `2 * 2` | `4` |
| `2^5` | `4 * 4 * 2` | `32` |
| `2^10` | `32 * 32` | `1024` |

### Iterative Mental Model

Build these powers:

```txt
x^1, x^2, x^4, x^8, x^16 ...
```

Pick only the powers needed by exponent.

Example:

```txt
10 = 8 + 2
```

So:

```txt
x^10 = x^8 * x^2
```

---

## 7. Boundary Cases

| case | answer / behavior |
|---|---|
| `n = 0` | return `1` |
| `n = 1` | return `x` |
| `n < 0` | compute reciprocal |
| `x = 1` | answer always `1` |
| `x = -1`, even `n` | answer `1` |
| `x = -1`, odd `n` | answer `-1` |
| large `n` | brute force too slow, use binary exponentiation |
| `n = -2147483648` | JavaScript `number` can hold `2147483648`; fixed-width languages need `long` |

---

## 8. Conditions

### `n === 0`

Means:

```txt
No copy of x needs to be multiplied.
```

Answer:

```txt
1
```

### `n < 0`

Means:

```txt
x^n is reciprocal of x^abs(n)
```

Example:

```txt
2^-3 = 1 / 2^3
```

### `exponent % 2 === 0`

Means:

```txt
exponent can split into two equal halves
```

Example:

```txt
10 = 5 + 5
```

### `exponent % 2 === 1`

Means:

```txt
two equal halves ke baad one extra base bachta hai
```

Example:

```txt
5 = 2 + 2 + 1
```

---

## 9. Adjustment Logic

### Brute Force

If exponent negative:

| before | after |
|---|---|
| `x = 2`, `n = -3` | `base = 0.5`, `exponent = 3` |

Now simply multiply `0.5` three times.

### Recursive

At each frame:

| exponent | halfExponent | combine |
|---:|---:|---|
| `10` | `5` | `half * half` |
| `5` | `2` | `half * half * base` |
| `2` | `1` | `half * half` |
| `1` | `0` | `half * half * base` |

### Iterative

At each loop:

| action | why |
|---|---|
| if exponent odd, multiply result by base | current power is needed |
| square base | next bit represents double power |
| halve exponent | current bit has been consumed |

---

## 10. Answer Formula

### Brute Force

```txt
result = base multiplied exponent times
```

### Recursive Binary Exponentiation

```txt
if exponent is even:
  x^exponent = halfPower * halfPower

if exponent is odd:
  x^exponent = halfPower * halfPower * x
```

Where:

```txt
halfPower = x^floor(exponent / 2)
```

### Iterative Binary Exponentiation

Invariant:

```txt
result * base^exponent = original x^abs(n)
```

When loop ends:

```txt
exponent = 0
```

So:

```txt
result * base^0 = result
```

That result is the positive power.

If original `n` was negative:

```txt
answer = 1 / result
```

---

## 11. Full Dry Run

### Brute Force Dry Run: `x = 2`, `n = 5`

| count | operation | result meaning |
|---:|---|---|
| start | `result = 1` | no copy multiplied yet |
| `1` | `1 * 2 = 2` | `2^1` |
| `2` | `2 * 2 = 4` | `2^2` |
| `3` | `4 * 2 = 8` | `2^3` |
| `4` | `8 * 2 = 16` | `2^4` |
| `5` | `16 * 2 = 32` | `2^5` |

Answer:

```txt
32
```

### Recursive Dry Run: `x = 2`, `n = 10`

Call side:

| call | exponent | halfExponent | next call |
|---:|---:|---:|---|
| `1` | `10` | `5` | `powerPositive(2, 5)` |
| `2` | `5` | `2` | `powerPositive(2, 2)` |
| `3` | `2` | `1` | `powerPositive(2, 1)` |
| `4` | `1` | `0` | `powerPositive(2, 0)` |
| `5` | `0` | - | base case returns `1` |

Return side:

| return from | exponent type | calculation | return value |
|---|---|---|---:|
| `2^0` | base | `1` | `1` |
| `2^1` | odd | `1 * 1 * 2` | `2` |
| `2^2` | even | `2 * 2` | `4` |
| `2^5` | odd | `4 * 4 * 2` | `32` |
| `2^10` | even | `32 * 32` | `1024` |

### Iterative Dry Run: `x = 2`, `n = 10`

Initial:

```txt
result = 1
base = 2
exponent = 10
```

| step | exponent | odd? | result after check | base after square | exponent after halve |
|---:|---:|---|---:|---:|---:|
| `1` | `10` | no | `1` | `4` | `5` |
| `2` | `5` | yes | `4` | `16` | `2` |
| `3` | `2` | no | `4` | `256` | `1` |
| `4` | `1` | yes | `1024` | `65536` | `0` |

Loop stops because:

```txt
exponent = 0
```

Answer:

```txt
1024
```

### Negative Exponent Dry Run: `x = 2`, `n = -3`

| step | value |
|---|---|
| original | `2^-3` |
| positive power | `2^3 = 8` |
| reciprocal | `1 / 8 = 0.125` |

Answer:

```txt
0.125
```

---

## 12. Quick Reference

Brute force:

```txt
Multiply x repeatedly |n| times.
Time: O(|n|)
Space: O(1)
```

Recursive optimal:

```txt
halfPower = x^floor(n / 2)

if n even:
  answer = halfPower * halfPower

if n odd:
  answer = halfPower * halfPower * x

Time: O(log |n|)
Space: O(log |n|)
```

Iterative optimal:

```txt
while exponent > 0:
  if exponent is odd:
    result *= base

  base *= base
  exponent = floor(exponent / 2)

Time: O(log |n|)
Space: O(1)
```

Final interview answer:

```txt
Use binary exponentiation.
Recursive is easier to explain.
Iterative is more space efficient.
```
