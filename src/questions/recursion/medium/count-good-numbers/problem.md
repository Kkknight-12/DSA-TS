# Count Good Numbers

**Difficulty**: Medium
**Topics**: Math, Recursion, Binary Exponentiation, Modular Arithmetic
**LeetCode**: [Count Good Numbers](https://leetcode.com/problems/count-good-numbers/)

---

## Problem Statement

A digit string is **good** if the digits (0-indexed) at **even indices** are **even** and the digits at **odd indices** are **prime** (2, 3, 5, or 7).

- **Even digits**: 0, 2, 4, 6, 8 (5 choices)
- **Prime digits**: 2, 3, 5, 7 (4 choices)

**Example:**
- `"2582"` is good:
  - Index 0: 2 (even) ✓
  - Index 1: 5 (prime) ✓
  - Index 2: 8 (even) ✓
  - Index 3: 2 (prime) ✓

- `"3245"` is NOT good:
  - Index 0: 3 (NOT even) ✗

Given an integer `n`, return the **total number of good digit strings of length n**. Since the answer may be large, return it **modulo 10^9 + 7**.

A digit string is a string consisting of digits 0 through 9 that may contain leading zeros.

---

### Examples:

**Example 1:**
```
Input: n = 1
Output: 5
Explanation: Good numbers of length 1 are "0", "2", "4", "6", "8"
```

**Example 2:**
```
Input: n = 4
Output: 400
Explanation:
  Even indices (0, 2): 5 choices each → 5^2 = 25
  Odd indices (1, 3): 4 choices each → 4^2 = 16
  Total: 25 × 16 = 400
```

**Example 3:**
```
Input: n = 50
Output: 564908303
Explanation: Result after modulo 10^9 + 7
```

---

### Constraints:
- `1 <= n <= 10^15` (Very large! Must use O(log n) solution)

---

## Intuition (Soch)

### Step 1: Understand the Pattern

For a string of length n with indices [0, 1, 2, 3, ..., n-1]:

```
Index:    0    1    2    3    4    5    6    7
Type:   EVEN  ODD  EVEN  ODD  EVEN  ODD  EVEN  ODD
Choices:  5    4    5    4    5    4    5    4
```

**Key Observation:** Each position is independent!
- Position at even index: 5 choices
- Position at odd index: 4 choices

**Total combinations = 5^(even positions) × 4^(odd positions)**

### Step 2: Count Even and Odd Positions

For a string of length n:

```
n = 1:  [0]           → 1 even, 0 odd
n = 2:  [0, 1]        → 1 even, 1 odd
n = 3:  [0, 1, 2]     → 2 even, 1 odd
n = 4:  [0, 1, 2, 3]  → 2 even, 2 odd
n = 5:  [0, 1, 2, 3, 4] → 3 even, 2 odd
```

**Pattern:**
```
evenCount = ⌈n/2⌉ = (n + 1) / 2  (ceiling division)
oddCount  = ⌊n/2⌋ = n / 2        (floor division)
```

### Step 3: Calculate the Answer

```
Answer = 5^evenCount × 4^oddCount mod (10^9 + 7)
```

**Example: n = 4**
```
evenCount = (4 + 1) / 2 = 2  (ceiling)
oddCount  = 4 / 2 = 2        (floor)

Answer = 5^2 × 4^2
       = 25 × 16
       = 400 ✓
```

---

## Why Binary Exponentiation is REQUIRED

### The Problem with Brute Force

For n = 10^15:
```
evenCount ≈ 5 × 10^14
oddCount  ≈ 5 × 10^14

Brute force: Loop 5 × 10^14 times → IMPOSSIBLE!
```

### Binary Exponentiation to the Rescue!

```
Time Complexity: O(log n)
For n = 10^15: log₂(10^15) ≈ 50 operations
From 5 × 10^14 to 50 operations! 🚀
```

**This is exactly the pow(x, n) problem we just solved!**

---

## Approach: Binary Exponentiation with Modular Arithmetic

**Prerequisites:**
- Binary Exponentiation (from Pow(x, n) problem)
- Modular arithmetic: (a × b) % m = ((a % m) × (b % m)) % m

**Algorithm:**

```
countGoodNumbers(n):
    MOD = 10^9 + 7

    // Count positions
    evenCount = (n + 1) / 2  // Ceiling division
    oddCount = n / 2         // Floor division

    // Calculate powers using Binary Exponentiation
    evenPower = pow(5, evenCount, MOD)  // 5^evenCount mod MOD
    oddPower = pow(4, oddCount, MOD)    // 4^oddCount mod MOD

    // Multiply and return
    return (evenPower × oddPower) % MOD

pow(base, exp, mod):
    // Binary Exponentiation with Modular Arithmetic
    if exp == 0:
        return 1

    result = 1
    base = base % mod

    while exp > 0:
        if exp % 2 == 1:
            result = (result × base) % mod

        base = (base × base) % mod
        exp = exp / 2

    return result
```

---

## Detailed Example: n = 4

**Step 1: Count Positions**
```
n = 4
Indices: [0, 1, 2, 3]
Even indices: 0, 2 → evenCount = 2
Odd indices: 1, 3 → oddCount = 2
```

**Step 2: Calculate Powers**
```
evenPower = pow(5, 2, 10^9 + 7)
          = 5^2 % (10^9 + 7)
          = 25

oddPower = pow(4, 2, 10^9 + 7)
         = 4^2 % (10^9 + 7)
         = 16
```

**Step 3: Multiply**
```
result = (25 × 16) % (10^9 + 7)
       = 400 % (10^9 + 7)
       = 400 ✓
```

---

## Detailed Example: n = 50

**Step 1: Count Positions**
```
n = 50
evenCount = (50 + 1) / 2 = 25  (ceiling)
oddCount = 50 / 2 = 25         (floor)
```

**Step 2: Calculate Powers**
```
evenPower = pow(5, 25, 10^9 + 7)
          = 5^25 % (10^9 + 7)
          = 298023223476 % (10^9 + 7)
          = ... (calculated via binary exp)

oddPower = pow(4, 25, 10^9 + 7)
         = 4^25 % (10^9 + 7)
         = ... (calculated via binary exp)
```

**Step 3: Multiply with Mod**
```
result = (evenPower × oddPower) % (10^9 + 7)
       = 564908303 ✓
```

---

## Why Modular Arithmetic?

### Problem: Overflow

Without modulo:
```
5^(5×10^14) is astronomically large!
Cannot fit in any data type
```

### Solution: Apply Modulo at Each Step

**Modular Properties:**
```
(a × b) % m = ((a % m) × (b % m)) % m
(a^b) % m can be computed by applying % m at each multiplication
```

**Example:**
```
Calculate 5^4 % 13:

Without modulo:
  5^4 = 625
  625 % 13 = 1

With modulo at each step:
  5^1 = 5
  5^2 = (5 × 5) % 13 = 25 % 13 = 12
  5^4 = (12 × 12) % 13 = 144 % 13 = 1 ✓

Same result, but numbers stay small!
```

---

## Edge Cases

### 1. n = 1 (Single digit)
```
evenCount = (1 + 1) / 2 = 1
oddCount = 1 / 2 = 0

Answer = 5^1 × 4^0 = 5 × 1 = 5 ✓
Good numbers: "0", "2", "4", "6", "8"
```

### 2. n = 2 (Two digits)
```
evenCount = (2 + 1) / 2 = 1
oddCount = 2 / 2 = 1

Answer = 5^1 × 4^1 = 5 × 4 = 20 ✓
```

### 3. n = 10^15 (Maximum constraint)
```
evenCount ≈ 5 × 10^14
oddCount ≈ 5 × 10^14

Binary Exponentiation: ~50 operations
Brute Force: Impossible!
```

---

## Time & Space Complexity

**Time Complexity: O(log n)**
- Counting positions: O(1)
- Binary exponentiation for 5^evenCount: O(log evenCount) = O(log n)
- Binary exponentiation for 4^oddCount: O(log oddCount) = O(log n)
- Total: O(log n)

**Space Complexity: O(1)**
- Iterative binary exponentiation uses constant space
- Only storing a few variables

---

## Common Mistakes to Avoid

❌ **Using simple loop for exponentiation** → TLE for large n
❌ **Not applying modulo at each step** → Integer overflow
❌ **Wrong count of even/odd positions** → Wrong answer
❌ **Forgetting to mod the final multiplication** → Overflow
❌ **Using (n+1)/2 without proper integer division** → Off-by-one errors

✅ **Use Binary Exponentiation with modulo**
✅ **Apply % MOD at every multiplication**
✅ **Correctly calculate evenCount and oddCount**
✅ **Handle n = 1 edge case**

---

## Interview Tips

**What to say to interviewer:**

*"This is a combinatorics problem that requires Binary Exponentiation. The key insight is that each position is independent: even indices have 5 choices, odd indices have 4 choices. The answer is 5^evenCount × 4^oddCount. Since n can be up to 10^15, I must use O(log n) Binary Exponentiation with modular arithmetic to avoid overflow and TLE."*

**Follow-up Questions:**

**Q: Why can't we use simple loop for exponentiation?**
A: For n = 10^15, we'd need ~5×10^14 iterations, which is impossible within time limits. Binary exponentiation reduces this to ~50 operations.

**Q: Why apply modulo at each step?**
A: Without modulo, intermediate results would overflow. Modular arithmetic ensures numbers stay small while maintaining correctness.

**Q: What if they ask for iterative vs recursive binary exponentiation?**
A: Iterative is better here - O(1) space vs O(log n) space, and avoids stack overflow for very large n.

---

## Connection to Previous Learning

This problem beautifully combines:
1. **Binary Exponentiation** (from Pow(x, n))
2. **Modular Arithmetic** (new concept)
3. **Combinatorics** (counting principle)

It's a perfect real-world application of the algorithm we just learned! 🎯
