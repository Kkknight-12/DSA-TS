# 402. Remove K Digits

**Difficulty:** Medium
**Topics:** Stack, Monotonic Stack, Greedy, String
**LeetCode Link:** [402. Remove K Digits](https://leetcode.com/problems/remove-k-digits/)

---

## Problem Statement (Simple Language Mein)

Tumhe ek string `nums` diya hai jo ek non-negative integer represent karta hai, aur ek integer `k` diya hai.

**Task:** `k` digits remove karke smallest possible number banao.

**Note:** Result mein leading zeros nahi hone chahiye (except "0" itself).

---

## Examples:

### Example 1:
```
Input: nums = "1432219", k = 3
Output: "1219"

Explanation:
Original: 1 4 3 2 2 1 9
          ↑ ↑   ↑
Remove:   4, 3, and 2 (first occurrence)

Result: 1219 (smallest possible)
```

### Example 2:
```
Input: nums = "10200", k = 1
Output: "200"

Explanation:
Remove the leading 1, result is 0200
After removing leading zeros: 200
```

### Example 3:
```
Input: nums = "10", k = 2
Output: "0"

Explanation:
Remove both digits, result is empty
Return "0" for empty result
```

### Example 4 (from problem):
```
Input: nums = "541892", k = 2
Output: "1892"

Explanation:
Remove 5 and 4 (they are larger than digits after them)
Result: 1892
```

### Example 5 (from problem):
```
Input: nums = "1002991", k = 3
Output: "21"

Explanation:
Remove 1(leading), 9, 9
Result: 0021 → 21 (after removing leading zeros)
```

---

## Constraints:
- `1 <= k <= nums.length <= 10^5`
- `nums` consists of only digits
- `nums` does not have any leading zeros except for the zero itself

---

## Key Insight! 🔑

**Greedy Observation:**

Chhota number banane ke liye:
1. **Leftmost digits matter more!** (higher place value)
2. If a digit is **larger than the next digit**, remove it!

```
Example: "541892"

5 > 4? YES → Remove 5 → "41892"
4 > 1? YES → Remove 4 → "1892"

Now k=0, stop.
Result: "1892"
```

**Why Monotonic Stack?**

- We want digits in **increasing order** (as much as possible)
- When we see a smaller digit, we pop larger digits before it
- This is exactly what a **monotonic increasing stack** does!

---

## Approach 1: Brute Force (Generate All Combinations)

### Intuition:
Generate all possible numbers after removing k digits, find the minimum.

### Algorithm:
```
Generate all C(n, n-k) combinations of remaining digits
Convert each to number
Return minimum
```

### Complexity:
- **Time:** O(C(n, n-k) × n) - Exponential!
- **Space:** O(n)

**Result:** ❌ TLE for large inputs

---

## Approach 2: Optimal (Monotonic Increasing Stack)

### Intuition:

**Core Idea:**
- Traverse digits left to right
- Maintain a stack with digits in **increasing order**
- When current digit is **smaller** than stack top, pop (if k > 0)
- This ensures smaller digits come first!

### Visual Example:

```
nums = "1432219", k = 3

Step by step:

i=0, digit='1':
  Stack: []
  1 goes in → Stack: [1]
  k = 3

i=1, digit='4':
  Stack top = 1, current = 4
  4 > 1? No need to pop (increasing is good)
  Push 4 → Stack: [1, 4]
  k = 3

i=2, digit='3':
  Stack top = 4, current = 3
  3 < 4? YES! Pop 4 (larger digit before smaller)
  k = 3 - 1 = 2
  Stack: [1]
  Stack top = 1, current = 3
  3 > 1? No need to pop
  Push 3 → Stack: [1, 3]

i=3, digit='2':
  Stack top = 3, current = 2
  2 < 3? YES! Pop 3
  k = 2 - 1 = 1
  Stack: [1]
  Stack top = 1, current = 2
  2 > 1? No need to pop
  Push 2 → Stack: [1, 2]

i=4, digit='2':
  Stack top = 2, current = 2
  2 < 2? NO (equal)
  Push 2 → Stack: [1, 2, 2]

i=5, digit='1':
  Stack top = 2, current = 1
  1 < 2? YES! Pop 2
  k = 1 - 1 = 0
  Stack: [1, 2]
  k = 0, no more pops allowed
  Push 1 → Stack: [1, 2, 1]

i=6, digit='9':
  k = 0, just push
  Push 9 → Stack: [1, 2, 1, 9]

Result: "1219" ✓
```

### Algorithm:

```typescript
function removeKdigits(nums: string, k: number): string {
    const stack: string[] = [];

    for (const digit of nums) {
        // Pop larger digits (greedy: smaller digits should come first)
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }

    // If k > 0, remove from end (already sorted, so remove largest)
    while (k > 0) {
        stack.pop();
        k--;
    }

    // Remove leading zeros
    let result = stack.join('').replace(/^0+/, '');

    // Handle empty result
    return result === '' ? '0' : result;
}
```

### Edge Cases:

1. **k >= nums.length:** Return "0"
2. **All same digits:** "1111", k=2 → Remove from end → "11"
3. **Already sorted ascending:** "12345", k=2 → Remove from end → "123"
4. **Leading zeros after removal:** "10200", k=1 → "0200" → "200"
5. **Result becomes empty:** "10", k=2 → "" → "0"

### Dry Run: "541892", k=2

```
┌─────────────────────────────────────────────────────────────┐
│  i  │ digit │ Stack Before │ Action          │ Stack After │ k │
├─────────────────────────────────────────────────────────────┤
│  0  │  '5'  │ []           │ push 5          │ [5]         │ 2 │
│  1  │  '4'  │ [5]          │ 4<5, pop 5      │ []          │ 1 │
│     │       │ []           │ push 4          │ [4]         │ 1 │
│  2  │  '1'  │ [4]          │ 1<4, pop 4      │ []          │ 0 │
│     │       │ []           │ push 1          │ [1]         │ 0 │
│  3  │  '8'  │ [1]          │ k=0, push 8     │ [1,8]       │ 0 │
│  4  │  '9'  │ [1,8]        │ k=0, push 9     │ [1,8,9]     │ 0 │
│  5  │  '2'  │ [1,8,9]      │ k=0, push 2     │ [1,8,9,2]   │ 0 │
└─────────────────────────────────────────────────────────────┘

Final Stack: [1, 8, 9, 2]
Result: "1892" ✓
```

### Dry Run: "10200", k=1

```
┌─────────────────────────────────────────────────────────────┐
│  i  │ digit │ Stack Before │ Action          │ Stack After │ k │
├─────────────────────────────────────────────────────────────┤
│  0  │  '1'  │ []           │ push 1          │ [1]         │ 1 │
│  1  │  '0'  │ [1]          │ 0<1, pop 1      │ []          │ 0 │
│     │       │ []           │ push 0          │ [0]         │ 0 │
│  2  │  '2'  │ [0]          │ k=0, push 2     │ [0,2]       │ 0 │
│  3  │  '0'  │ [0,2]        │ k=0, push 0     │ [0,2,0]     │ 0 │
│  4  │  '0'  │ [0,2,0]      │ k=0, push 0     │ [0,2,0,0]   │ 0 │
└─────────────────────────────────────────────────────────────┘

Stack result: "0200"
After removing leading zeros: "200" ✓
```

### Dry Run: "1002991", k=3

```
┌─────────────────────────────────────────────────────────────┐
│  i  │ digit │ Stack Before │ Action          │ Stack After │ k │
├─────────────────────────────────────────────────────────────┤
│  0  │  '1'  │ []           │ push 1          │ [1]         │ 3 │
│  1  │  '0'  │ [1]          │ 0<1, pop 1      │ []          │ 2 │
│     │       │ []           │ push 0          │ [0]         │ 2 │
│  2  │  '0'  │ [0]          │ 0=0, push       │ [0,0]       │ 2 │
│  3  │  '2'  │ [0,0]        │ 2>0, push       │ [0,0,2]     │ 2 │
│  4  │  '9'  │ [0,0,2]      │ 9>2, push       │ [0,0,2,9]   │ 2 │
│  5  │  '9'  │ [0,0,2,9]    │ 9=9, push       │ [0,0,2,9,9] │ 2 │
│  6  │  '1'  │ [0,0,2,9,9]  │ 1<9, pop 9      │ [0,0,2,9]   │ 1 │
│     │       │ [0,0,2,9]    │ 1<9, pop 9      │ [0,0,2]     │ 0 │
│     │       │ [0,0,2]      │ k=0, push 1     │ [0,0,2,1]   │ 0 │
└─────────────────────────────────────────────────────────────┘

Stack result: "0021"
After removing leading zeros: "21" ✓
```

### Complexity Analysis:

**Time Complexity:** O(n)
- Each digit is pushed once and popped at most once
- Total operations: O(2n) = O(n)

**Space Complexity:** O(n)
- Stack can hold at most n digits

---

## Why Monotonic Stack Works Here?

```
Think of it this way:

For smallest number, we want:
  - Smaller digits on the LEFT (higher place value)
  - Larger digits on the RIGHT

Monotonic INCREASING stack ensures:
  - When a smaller digit comes, it removes larger digits before it
  - This pushes smaller digits to the left!

Example: "541"
  Stack: [5]
  See 4: 4 < 5, pop 5 → [4]
  See 1: 1 < 4, pop 4 → [1]

  Result: "1" (smallest possible with k=2)
```

---

## Common Mistakes:

1. **Forgetting to handle remaining k:**
   ```
   "12345", k = 2
   Stack never pops (already ascending)
   After loop: k = 2 still!
   Must pop 2 from end → "123"
   ```

2. **Forgetting to remove leading zeros:**
   ```
   "10200", k = 1 → "0200" → Must become "200"
   ```

3. **Forgetting empty result case:**
   ```
   "10", k = 2 → "" → Must return "0"
   ```

---

## Comparison with Other Stack Problems:

| Problem | Stack Type | Pop Condition | Purpose |
|---------|-----------|---------------|---------|
| **Remove K Digits** | Monotonic Increasing | stack.top > current | Smallest number |
| **Sum of Subarray Minimums** | Monotonic Increasing | stack.top >= current | Find PLE/NLE |
| **Next Greater Element** | Monotonic Decreasing | stack.top < current | Find NGE |
| **Largest Rectangle** | Monotonic Increasing | stack.top >= current | Find boundaries |

---

## Related Problems:

- **321. Create Maximum Number** (Hard) - Similar but maximize
- **316. Remove Duplicate Letters** (Medium) - Similar greedy stack
- **1673. Find Most Competitive Subsequence** (Medium) - Very similar!

---

**Ready to code the Optimal solution?** 🎯