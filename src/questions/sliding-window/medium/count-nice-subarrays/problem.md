# Count Number of Nice Subarrays

## Problem Statement

Given an array of integers `nums` and an integer `k`. A continuous subarray is called **nice** if there are exactly `k` odd numbers in it.

Return the number of nice sub-arrays.

## Examples

### Example 1:
```
Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
```

### Example 2:
```
Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There are no odd numbers in the array.
```

### Example 3:
```
Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16
```

## Constraints
- `1 <= nums.length <= 50000`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

---

## Key Observation - YEH PROBLEM PEHLE DEKHI HAI!

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  This is EXACTLY the same as "Binary Subarrays With Sum"!                  │
│                                                                            │
│  Binary Subarrays With Sum:                                                │
│  - Count subarrays where sum of 1s = goal                                  │
│  - Array has only 0s and 1s                                                │
│                                                                            │
│  Count Nice Subarrays:                                                     │
│  - Count subarrays where count of odd numbers = k                          │
│  - Array has any integers                                                  │
│                                                                            │
│  TRICK: Convert any number to:                                             │
│  - 1 if odd (num % 2 === 1)                                                │
│  - 0 if even (num % 2 === 0)                                               │
│                                                                            │
│  Now it's the same problem!                                                │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Visual Transformation:

```
Original: [2, 2, 2, 1, 2, 2, 1, 2, 2, 2]
           ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
Binary:   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0]

Now count subarrays where sum = k = 2
Same as Binary Subarrays With Sum!
```

---

## Approaches

### Approach 1: Brute Force

**Intuition (Soch):**
- Check ALL possible subarrays
- For each subarray, count odd numbers
- If count === k, increment result

**Algorithm:**
1. For each starting position `i`
2. For each ending position `j` (from `i` to end)
3. Count odd numbers in subarray `[i...j]`
4. If count === k, increment result
5. If count > k, break (optimization)

**Time Complexity:** O(n²)
**Space Complexity:** O(1)

---

### Approach 2: Sliding Window with "At Most K" Trick

**Prerequisites (Agar Koi Chahiye):**
- "At Most K" counting pattern from Binary Subarrays With Sum
- Understanding why "Exactly K" is hard for sliding window

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  exactly(k) = atMost(k) - atMost(k-1)                          │
│                                                                │
│  Subarrays with EXACTLY k odd numbers =                        │
│    Subarrays with AT MOST k odd numbers                        │
│  - Subarrays with AT MOST (k-1) odd numbers                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Algorithm:**
1. Create helper function `atMost(k)`:
   - Sliding window counting subarrays with ≤ k odd numbers
   - For each position, count += right - left + 1
2. Return `atMost(k) - atMost(k-1)`

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

### Approach 3: Prefix Sum + HashMap

**Prerequisites (Agar Koi Chahiye):**
- Prefix Sum concept
- Two Sum pattern with HashMap

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  Instead of tracking sum, track "count of odd numbers so far"  │
│                                                                │
│  prefixOddCount[j] - prefixOddCount[i-1] = k                   │
│  means subarray [i...j] has exactly k odd numbers              │
│                                                                │
│  Rearranging: prefixOddCount[i-1] = prefixOddCount[j] - k      │
│                                   = current - k                 │
│                                   = target                      │
│                                                                │
│  Same Two Sum pattern!                                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Algorithm:**
1. Initialize HashMap with {0: 1} (for subarrays starting at index 0)
2. Track running count of odd numbers (prefixOddCount)
3. For each position:
   - Update prefixOddCount: `+= (nums[i] % 2)`
   - Look for target = prefixOddCount - k in HashMap
   - Add HashMap[target] to result
   - Update HashMap with current prefixOddCount

**Time Complexity:** O(n)
**Space Complexity:** O(n)

---

## Complexity Comparison

| Approach | Time | Space | Prerequisites | When to Use |
|----------|------|-------|---------------|-------------|
| Brute Force | O(n²) | O(1) | None | Understanding, small input |
| Sliding Window (At Most K) | O(n) | O(1) | At Most K trick | Optimal for non-negative arrays |
| Prefix Sum + HashMap | O(n) | O(n) | Prefix Sum, Two Sum | Works for any array |

---

## Dry Run - Example 3

```
nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2], k = 2
Index:  0  1  2  3  4  5  6  7  8  9

Step 1: Convert to binary (is odd?)
Binary: [0, 0, 0, 1, 0, 0, 1, 0, 0, 0]

Step 2: Find subarrays with exactly 2 ones (odd numbers)

The odd numbers are at indices 3 and 6.

For a valid subarray:
- Must include both odd numbers at index 3 and 6
- Can extend left into even numbers (0, 1, 2)
- Can extend right into even numbers (7, 8, 9)

Left choices: Start at 0, 1, 2, or 3 → 4 choices
Right choices: End at 6, 7, 8, or 9 → 4 choices

Total = 4 × 4 = 16 subarrays ✅
```

---

## Key Insights

```
┌────────────────────────────────────────────────────────────────┐
│  1. TRANSFORMATION IS KEY                                      │
│     - Any number → 1 if odd, 0 if even                         │
│     - Count odd = Sum of transformed array                     │
│                                                                │
│  2. SAME PATTERNS APPLY                                        │
│     - At Most K trick works exactly the same                   │
│     - Prefix Sum works exactly the same                        │
│                                                                │
│  3. NO ACTUAL CONVERSION NEEDED                                │
│     - Just use (num % 2) or (num & 1) to check odd             │
│     - Don't create new array, check inline                     │
│                                                                │
│  4. PATTERN RECOGNITION                                        │
│     - "Count subarrays with exactly K of something"            │
│     - Always think: Can I reduce to Binary Subarrays problem?  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Interview Tips

**What to say:**
> "This problem is essentially the same as 'Binary Subarrays With Sum'. We can transform the array by treating odd numbers as 1 and even numbers as 0. Then we need to count subarrays with exactly k ones."

**Follow-up Questions:**
1. **"What if we need exactly k even numbers?"**
   - Same approach, just swap: even → 1, odd → 0

2. **"Can you do it without creating a new array?"**
   - Yes! Just use `num % 2` or `num & 1` inline

3. **"What about negative numbers?"**
   - For sliding window: Still works (odd/even check works for negatives)
   - For prefix sum: Still works

---

## Which approach do you want to see?

1. **Brute Force** - O(n²) time, O(1) space
2. **Sliding Window (At Most K)** - O(n) time, O(1) space (RECOMMENDED)
3. **Prefix Sum + HashMap** - O(n) time, O(n) space