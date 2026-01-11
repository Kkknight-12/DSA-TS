# Pow(x, n)

**Difficulty**: Medium
**Topics**: Math, Recursion, Divide & Conquer
**LeetCode**: [Pow(x, n)](https://leetcode.com/problems/powx-n/)

---

## Problem Statement

Implement `pow(x, n)`, which calculates x raised to the power n (i.e., x^n).

### Examples:

**Example 1:**
```
Input: x = 2.00000, n = 10
Output: 1024.00000
Explanation: 2^10 = 1024
```

**Example 2:**
```
Input: x = 2.10000, n = 3
Output: 9.26100
Explanation: 2.1^3 = 2.1 × 2.1 × 2.1 = 9.261
```

**Example 3:**
```
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^(-2) = 1/(2^2) = 1/4 = 0.25
```

**Example 4:**
```
Input: x = 1.00000, n = -2147483648
Output: 1.00000
Explanation: 1 raised to any power is 1
```

### Constraints:
- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31 - 1` (n can be very large!)
- `n` is an integer
- Either `x ≠ 0` or `n > 0`
- `-10^4 <= x^n <= 10^4`

---

## Approach 1: Brute Force (Iterative Multiplication)

**Prerequisites (Agar Koi Chahiye):**
- **Basic loops**: Understanding of for/while loops
- **Why needed**: Simple iteration to multiply x repeatedly

**Intuition (Soch):**

Sabse simple approach - x ko n baar multiply karo!

```
2^5 = 2 × 2 × 2 × 2 × 2
```

**Algorithm:**
1. Handle negative exponent: If n < 0, calculate x^(-n) and return 1/result
2. Initialize result = 1
3. Loop n times: result = result × x
4. Return result

**Visual Example**: x = 2, n = 5
```
Iteration 1: result = 1 × 2 = 2
Iteration 2: result = 2 × 2 = 4
Iteration 3: result = 4 × 2 = 8
Iteration 4: result = 8 × 2 = 16
Iteration 5: result = 16 × 2 = 32 ✓
```

**Time Complexity**: O(n)
- Loop runs n times
- Each iteration: one multiplication (O(1))
- For n = 2^31 - 1 → 2 billion multiplications! 😱

**Space Complexity**: O(1)
- Only using one variable (result)

**The Problem:**
```
For n = 1,000,000,000:
  → 1 billion multiplications!
  → Takes several seconds!

We need something MUCH faster!
```

---

## Approach 2: Optimal (Binary Exponentiation - Divide & Conquer)

**Prerequisites (Agar Koi Chahiye):**
- **Divide & Conquer**: Breaking problem into smaller subproblems
- **Recursion basics**: Base case, recursive case
- **Why needed**: This problem has optimal substructure - x^n can be computed from x^(n/2)

**Intuition (Soch):**

**Key Insight**: Hum x ko n baar multiply karne ki jagah, exponent ko half karte jao!

```
Instead of: 2^8 = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2  (8 multiplications)

Smart way: 2^8 = (2^4) × (2^4)
           2^4 = (2^2) × (2^2)
           2^2 = 2 × 2

Only 3 multiplications! 🎉
```

**The Pattern**:
```
If n is EVEN:
  x^n = (x^(n/2)) × (x^(n/2))
  Example: 2^8 = (2^4) × (2^4)

If n is ODD:
  x^n = (x^(n/2)) × (x^(n/2)) × x
  Example: 2^9 = (2^4) × (2^4) × 2
```

**Visual Breakdown**: Calculate 2^10

```
                    2^10
                     |
                 (Split n/2)
                     |
              ┌──────┴──────┐
              |             |
            2^5           2^5
             |             (Reuse result!)
         (Split n/2)
             |
      ┌──────┴──────┐
      |             |
    2^2           2^2 × 2 (odd!)
     |             (Reuse result!)
  (Split n/2)
     |
  ┌──┴──┐
  |     |
 2^1   2^1
  |     (Base case: 2^1 = 2)
 2^0 × 2
  |
  1

Working backwards:
  2^1 = 2
  2^2 = 2^1 × 2^1 = 2 × 2 = 4
  2^5 = 2^2 × 2^2 × 2 = 4 × 4 × 2 = 32
  2^10 = 2^5 × 2^5 = 32 × 32 = 1024 ✓

Only 4 multiplications instead of 10!
```

**Recursion Tree Depth**:
```
n = 10 → 5 → 2 → 1 → 0
5 levels = log₂(10) ≈ 3.3

For n = 1,000,000,000:
  → log₂(1,000,000,000) ≈ 30 multiplications!
  → From 1 billion to 30! 🚀
```

**Handling Negative Exponents**:
```
x^(-n) = 1 / (x^n)

Example: 2^(-3) = 1 / (2^3) = 1/8 = 0.125

Strategy:
  If n < 0:
    Calculate x^(|n|) using binary exponentiation
    Return 1 / result
```

**Algorithm:**

```
Power(x, n):
    // Base case (ONLY ONE!)
    if n == 0:
        return 1                    // Anything^0 = 1
                                    // Note: n=1 will naturally compute via recursion

    // Handle negative exponent
    if n < 0:
        x = 1 / x                   // Convert to positive
        n = -n
        // Edge case: n might be -2147483648 (minimum int)
        // -(-2147483648) overflows! Handle separately

    // Divide: Calculate half power
    halfPower = Power(x, n / 2)     // Recursive call

    // Combine: Square the result
    if n is even:
        return halfPower × halfPower
    else:
        return halfPower × halfPower × x
```

**Dry Run**: x = 2, n = 10

```
═══════════════════════════════════════════════════════════
Call 1: Power(2, 10)
═══════════════════════════════════════════════════════════
n = 10 (even)
halfPower = Power(2, 5)  → Need to calculate

    ═══════════════════════════════════════════════════════
    Call 2: Power(2, 5)
    ═══════════════════════════════════════════════════════
    n = 5 (odd)
    halfPower = Power(2, 2)  → Need to calculate

        ═══════════════════════════════════════════════════
        Call 3: Power(2, 2)
        ═══════════════════════════════════════════════════
        n = 2 (even)
        halfPower = Power(2, 1)  → Need to calculate

            ═══════════════════════════════════════════════
            Call 4: Power(2, 1)
            ═══════════════════════════════════════════════
            n = 1 (odd)
            halfPower = Power(2, 0)  → Need to calculate

                ═══════════════════════════════════════════
                Call 5: Power(2, 0)
                ═══════════════════════════════════════════
                n = 0 → Base case!
                Return: 1
                ═══════════════════════════════════════════

            halfPower = 1
            n is odd → return 1 × 1 × 2 = 2
            Return: 2
            ═══════════════════════════════════════════════

        halfPower = 2
        n is even → return 2 × 2 = 4
        Return: 4
        ═══════════════════════════════════════════════════

    halfPower = 4
    n is odd → return 4 × 4 × 2 = 32
    Return: 32
    ═══════════════════════════════════════════════════════

halfPower = 32
n is even → return 32 × 32 = 1024
Return: 1024 ✓
═══════════════════════════════════════════════════════════

Final Result: 1024
```

**Time Complexity**: O(log n)
- Each recursion halves n
- Depth of recursion = log₂(n)
- Each level: O(1) work (one multiplication)
- Total: O(log n)

**Space Complexity**: O(log n)
- Recursion stack depth = log₂(n)
- Each call: O(1) space

**Comparison**:

For n = 1,000,000,000:
```
Brute Force: 1,000,000,000 multiplications
Optimal:     ~30 multiplications

33 MILLION times faster! 🚀
```

---

## Edge Cases to Handle

### 1. **Negative Exponent**
```
Input: x = 2, n = -2
Output: 0.25

Strategy: Calculate 2^2 = 4, return 1/4 = 0.25
```

### 2. **Zero Exponent**
```
Input: x = 5, n = 0
Output: 1.0

Rule: Any number^0 = 1
```

### 3. **Exponent = 1**
```
Input: x = 3.5, n = 1
Output: 3.5

Rule: Any number^1 = itself
Note: Not a base case! Computed via: Power(x, 1) → halfPower = Power(x, 0) = 1
                                                → return 1 × 1 × x = x ✓
```

### 4. **Minimum Integer (Overflow Risk)**
```
Input: x = 2, n = -2147483648

Problem: -(-2147483648) = 2147483648 (doesn't fit in 32-bit int!)

Solution:
  x = 1/x = 0.5
  n = 2147483648 (use long or handle carefully)
  Calculate (0.5)^2147483648
```

### 5. **x = 1 (Optimization)**
```
Input: x = 1, n = anything
Output: 1.0

1 raised to any power is 1
```

### 6. **x = -1 (Sign Handling)**
```
Input: x = -1, n = 10
Output: 1.0  (even exponent → positive)

Input: x = -1, n = 11
Output: -1.0 (odd exponent → negative)
```

### 7. **Very Large Result**
```
Input: x = 2, n = 30
Output: 1073741824

Ensure result fits in constraints (-10^4 to 10^4)
```

---

## Approach Comparison

| Aspect | Brute Force | Optimal (Binary Exp) |
|--------|-------------|---------------------|
| **Prerequisites** | Basic loops | Divide & Conquer, Recursion |
| **Approach** | Multiply x repeatedly | Halve exponent recursively |
| **Time Complexity** | O(n) | O(log n) |
| **Space Complexity** | O(1) | O(log n) stack |
| **For n = 1,000,000** | 1 million ops | ~20 ops |
| **Handles negatives** | Yes | Yes (with 1/x conversion) |
| **Interview Expected** | No | Yes ✓ |
| **Production Use** | Never | Always |

---

## Which Approach to Use?

**Use Brute Force when:**
- Never in real scenarios! 😅

**Use Binary Exponentiation when:**
- ✅ Any practical implementation (always better!)
- ✅ Large exponents (the advantage is huge)
- ✅ Interview questions (expected solution)
- ✅ Production code

**Recommendation**: Always use **Binary Exponentiation (O(log n))** - it's one of the most elegant examples of Divide & Conquer!

---

## Interview Tips

### What to Say to Interviewer:

*"This is a classic Divide & Conquer problem. Instead of multiplying x repeatedly n times, I can use binary exponentiation to reduce the time complexity from O(n) to O(log n). The key insight is that x^n = (x^(n/2))^2 for even n, and x^n = (x^(n/2))^2 × x for odd n. I'll also need to handle the negative exponent case by computing x^(|n|) and returning 1/result."*

### Common Follow-up Questions:

**Q: Can you do this iteratively instead of recursively?**
A: Yes! We can use a loop and bit manipulation to check if current bit is set, squaring x at each step. This saves stack space.

**Q: What about the integer overflow for n = -2147483648?**
A: Convert to long first, or handle as special case: convert x to 1/x and work with positive exponent.

**Q: How does this relate to Divide & Conquer?**
A: We divide the exponent by 2 (divide), recursively solve for smaller exponent (conquer), and combine by squaring or multiplying (combine). Classic D&C pattern!

### Mistakes to Avoid:

❌ **Using O(n) loop for large n** (TLE - Time Limit Exceeded)
❌ **Not handling negative exponents** (wrong answer)
❌ **Integer overflow when negating -2147483648** (runtime error)
❌ **Not handling n = 0** (edge case)
❌ **Recomputing x^(n/2) twice** (inefficient - should store in variable)

### Bonus Points:

✅ Mention this is binary exponentiation / fast exponentiation
✅ Explain the O(log n) complexity clearly with example
✅ Handle integer overflow edge case
✅ Mention iterative solution exists (more space-efficient)

---

Which approach would you like to see implemented? 🤔

1. **Brute Force** - For comparison (not recommended)
2. **Optimal (Recursive Binary Exponentiation)** - Classic solution
3. **Optimal (Iterative Binary Exponentiation)** - Space-optimized version

Or should I implement all three for complete understanding?
