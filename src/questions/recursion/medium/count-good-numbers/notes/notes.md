# Count Good Numbers - Notes

## 1. Problem Samjho

Length `n` ka digit string good tab hota hai jab:

| index type | allowed digits | choices |
|---|---|---:|
| even index | `0,2,4,6,8` | `5` |
| odd index | `2,3,5,7` | `4` |

Question:

```txt
Length n ke total good strings kitne hain?
```

Leading zero allowed hai.

Answer bahut bada ho sakta hai, so:

```txt
mod 10^9 + 7
```

return karna hai.

---

## 2. Brute Force

Brute force thought:

```txt
Length n ke saare digit strings generate karo.
Har string ko check karo.
```

Problem:

```txt
Total strings = 10^n
```

If:

```txt
n = 50
```

Then:

```txt
10^50 strings
```

which is impossible.

So string generation galat direction hai.

---

## 3. Key Insight

Each position independent hai.

Even index par:

```txt
5 choices
```

Odd index par:

```txt
4 choices
```

So:

```txt
Total = 5^(evenCount) * 4^(oddCount)
```

Ab problem string generation se counting problem ban gayi.

---

## 4. Why This Technique Works

Independent choice rule:

```txt
If one slot has a choices
and another slot has b choices,
then total ways = a * b
```

Example:

For `n = 4`:

| index | type | choices |
|---:|---|---:|
| `0` | even | `5` |
| `1` | odd | `4` |
| `2` | even | `5` |
| `3` | odd | `4` |

So:

```txt
total = 5 * 4 * 5 * 4 = 5^2 * 4^2
```

That is why formula works.

---

## 5. Variables

| variable | meaning |
|---|---|
| `n` | total string length |
| `evenCount` | even index positions kitni hain |
| `oddCount` | odd index positions kitni hain |
| `MOD` | modulo value `10^9 + 7` |
| `base` | fast power me current choice count (`5` ya `4`) |
| `exponent` | power kitni baar lagani hai |
| `halfPower` | `base^(floor(exponent/2)) mod MOD` |

State example:

```txt
n = 5
evenCount = 3
oddCount = 2
```

Meaning:

```txt
3 even slots hain -> 5^3
2 odd slots hain -> 4^2
```

---

## 6. Mental Model

Pehle slots count karo:

For `n = 5`:

```txt
index:   0 1 2 3 4
type:    E O E O E
```

So:

```txt
evenCount = 3
oddCount = 2
```

Then:

```txt
answer = 5^3 * 4^2
```

The hard part is not the formula.
The hard part is:

```txt
Huge powers ka calculation
```

Because `n` up to `10^15` ho sakta hai.

That is where fast power comes in.

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| smallest valid length | `n = 1` | `5` | only index 0, which is even |
| one even + one odd | `n = 2` | `20` | `5 * 4` |
| odd length | `n = 5` | `2000` | extra slot even side ko milta hai |
| huge length | `n = 10^15` | modulo answer | formula same, only power huge hai |
| zero length extra math case | `n = 0` | `1` | empty string ek way hota hai |

---

## 8. Conditions

### `evenCount = ceil(n / 2)`

Meaning:

```txt
0-based indexing me extra slot agar bachta hai toh even side ko milta hai
```

Example:

```txt
n = 5
even indices: 0,2,4 -> 3
```

### `oddCount = floor(n / 2)`

Meaning:

```txt
Odd slots hamesha even slots ke equal ya ek kam honge
```

### `exponent === 0`

Fast power base case:

```txt
base^0 = 1
```

### `exponent % 2 === 0`

Meaning:

```txt
power ko do equal halves me split kar sakte hain
```

Example:

```txt
5^6 = 5^3 * 5^3
```

### `exponent % 2 === 1`

Meaning:

```txt
two equal halves ke baad ek extra base bachta hai
```

Example:

```txt
5^7 = 5^3 * 5^3 * 5
```

---

## 9. Adjustment Logic

At the top level:

| step | action | why |
|---:|---|---|
| `1` | count even positions | 5-choice slots find karne hain |
| `2` | count odd positions | 4-choice slots find karne hain |
| `3` | compute `5^evenCount` | even slots ke total ways |
| `4` | compute `4^oddCount` | odd slots ke total ways |
| `5` | multiply under modulo | final answer |

Inside fast power:

| step | action | why |
|---:|---|---|
| `1` | check exponent 0 | recursion stop point |
| `2` | compute half power | repeated work reuse karna |
| `3` | square half power | exponent ke do halves combine karna |
| `4` | odd exponent me extra base multiply | one leftover base cover karna |

Algorithm:

```txt
1. evenCount aur oddCount nikaalo.
2. Fast power se 5^evenCount mod MOD nikaalo.
3. Fast power se 4^oddCount mod MOD nikaalo.
4. Dono ko multiply karke mod lo.
5. Fast power me exponent half karte jao until exponent zero.
```

---

## 10. Answer Formula

For any `n`:

```txt
answer = (5^evenCount * 4^oddCount) % MOD
```

Where:

```txt
evenCount = ceil(n / 2)
oddCount = floor(n / 2)
```

Fast power relation:

```txt
base^exponent
```

If exponent even:

```txt
base^exponent = halfPower * halfPower
```

If exponent odd:

```txt
base^exponent = halfPower * halfPower * base
```

All multiplications modulo me hoti hain:

```txt
(a * b) % MOD
```

---

## 11. Full Dry Run

Input:

```txt
n = 4
```

### Part A: Count slot types

| index | type | choices |
|---:|---|---:|
| `0` | even | `5` |
| `1` | odd | `4` |
| `2` | even | `5` |
| `3` | odd | `4` |

So:

| value | result |
|---|---:|
| `evenCount` | `2` |
| `oddCount` | `2` |

Formula becomes:

```txt
answer = 5^2 * 4^2
```

### Part B: Dry run of `modPow(5, 2)`

Call side:

| call | exponent | halfExponent | next call |
|---:|---:|---:|---|
| `1` | `2` | `1` | `modPow(5,1)` |
| `2` | `1` | `0` | `modPow(5,0)` |
| `3` | `0` | - | base case returns `1` |

Return side:

| return from | exponent type | calculation | return value |
|---|---|---|---:|
| `5^0` | base | `1` | `1` |
| `5^1` | odd | `1 * 1 * 5` | `5` |
| `5^2` | even | `5 * 5` | `25` |

So:

```txt
modPow(5,2) = 25
```

### Part C: Dry run of `modPow(4, 2)`

| return from | exponent type | calculation | return value |
|---|---|---|---:|
| `4^0` | base | `1` | `1` |
| `4^1` | odd | `1 * 1 * 4` | `4` |
| `4^2` | even | `4 * 4` | `16` |

So:

```txt
modPow(4,2) = 16
```

### Part D: Final multiplication

| value | result |
|---|---:|
| `evenWays` | `25` |
| `oddWays` | `16` |
| final | `(25 * 16) % MOD = 400` |

Answer:

```txt
400
```

---

## 12. Quick Reference

Pattern:

```txt
Count positions first.
Compute powers second.
```

Counts:

```txt
evenCount = ceil(n / 2)
oddCount = floor(n / 2)
```

Formula:

```txt
answer = (5^evenCount * 4^oddCount) % MOD
```

Fast power:

```txt
if exponent === 0:
  return 1

halfPower = modPow(base, floor(exponent / 2))
squared = halfPower * halfPower

if exponent even:
  return squared
else:
  return squared * base
```

Memory line:

```txt
This is counting first, fast power second.
```
