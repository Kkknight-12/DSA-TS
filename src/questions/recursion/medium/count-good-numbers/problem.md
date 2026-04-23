# Count Good Numbers

## Problem Samjho

Length `n` ka digit string good tab hota hai jab:

| index type | allowed digits | choices |
|---|---|---:|
| even index (`0, 2, 4...`) | `0, 2, 4, 6, 8` | `5` |
| odd index (`1, 3, 5...`) | `2, 3, 5, 7` | `4` |

Hume count batana hai:

```txt
length n ke total good strings kitne hain
```

Since answer bahut bada ho sakta hai:

```txt
answer % (10^9 + 7)
```

return karna hai.

Leading zero allowed hai.

---

## Examples

### Example 1

```txt
Input: n = 1
Output: 5
```

Why?

```txt
Index 0 even hai.
Allowed digits: 0, 2, 4, 6, 8
Total = 5
```

### Example 2

```txt
Input: n = 4
Output: 400
```

Why?

```txt
Indices: 0,1,2,3
Even positions: 0,2 -> 2 positions -> 5^2
Odd positions: 1,3 -> 2 positions -> 4^2

Total = 5^2 * 4^2 = 25 * 16 = 400
```

### Example 3

```txt
Input: n = 50
Output: 564908303
```

---

## Approach 1: Brute Force Generate All Strings

### Prerequisites

| concept | why needed |
|---|---|
| String generation | saari possible digit strings imagine karni hain |
| Validation | har index check karna hai good hai ya nahi |

### Intuition

Naive thought:

```txt
Length n ke saare digit strings generate karo.
Har string ko check karo ki good hai ya nahi.
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

---

## Approach 2: Direct Counting Formula + Slow Power

### Prerequisites

| concept | why needed |
|---|---|
| Counting principle | independent positions ke choices multiply hote hain |
| Even / odd position count | kitne even slots aur kitne odd slots hain |

### Intuition

Each position independent hai.

So:

```txt
Total = 5^(even positions count) * 4^(odd positions count)
```

For length `n`:

```txt
evenCount = ceil(n / 2)
oddCount = floor(n / 2)
```

So answer:

```txt
5^evenCount * 4^oddCount
```

Issue:

```txt
Power ko simple loop se calculate karoge,
to time O(n) ho jayega.
```

But constraint:

```txt
n <= 10^15
```

So slow exponentiation impossible hai.

---

## Approach 3: Direct Counting Formula + Binary Exponentiation + Modulo

### Prerequisites

| concept | why needed |
|---|---|
| Counting principle | total ways = independent choices ka multiplication |
| Binary exponentiation | huge power ko O(log n) me calculate karna hai |
| Modular arithmetic | answer aur intermediate values safe rakhni hain |

### Key Insight

The real problem string generation nahi hai.
The real problem huge powers compute karna hai.

Count first:

```txt
evenCount = ceil(n / 2)
oddCount = floor(n / 2)
```

Then:

```txt
answer = (5^evenCount * 4^oddCount) % MOD
```

Since `evenCount` and `oddCount` huge ho sakte hain:

```txt
5^500000000000000
4^500000000000000
```

Need:

```txt
Binary exponentiation
```

which computes power in:

```txt
O(log n)
```

---

## Why Binary Exponentiation Works Here

Power pattern:

```txt
5^10 = (5^5)^2
5^5  = (5^2)^2 * 5
```

Exponent repeatedly half hota hai.

So instead of multiplying 5 ten times, hundred times, or `10^15` times:

```txt
we keep dividing exponent by 2
```

That is why complexity drops from:

```txt
O(n)
```

to:

```txt
O(log n)
```

---

## Visual Mental Model

For `n = 5`:

```txt
index:    0   1   2   3   4
type:     E   O   E   O   E
choices:  5   4   5   4   5
```

So:

```txt
evenCount = 3
oddCount = 2
```

Answer:

```txt
5^3 * 4^2
= 125 * 16
= 2000
```

The counting part is easy.
The only hard part is computing powers fast.

---

## Approach Comparison

| approach | idea | time | space | practical? |
|---|---|---:|---:|---|
| generate all strings | build every digit string | enormous | enormous | impossible |
| formula + slow power | count slots correctly, loop power | O(n) | O(1) | impossible for `10^15` |
| formula + binary exponentiation | count slots, fast power, modulo | O(log n) | O(1) or O(log n) depending on implementation | correct approach |

---

## Complexity

Time:

```txt
O(log n)
```

Why:

```txt
Two powers compute karne hain:
5^evenCount and 4^oddCount
Aur har power binary exponentiation se O(log n) me aata hai.
```

Auxiliary space:

```txt
O(1) for iterative power
O(log n) for recursive power
```

Since this problem recursion track me hai, recursive fast power version bilkul natural fit hai.

Output space:

```txt
O(1)
```

Because sirf count return karna hai, combinations store nahi karni.

---

## Final Recommendation

Use:

```txt
Count slots first.
Then compute powers with binary exponentiation under modulo.
```

Memory line:

```txt
This is not a string generation problem.
This is a counting + fast power problem.
```
