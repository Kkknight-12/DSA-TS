# Max Consecutive Ones III

## Problem Statement

Given a binary array `nums` and an integer `k`, return the **maximum number of consecutive 1's** in the array if you can flip at most `k` 0's.

**Example 1:**
```
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
                    ↑ ↑ (flipped these two 0s)
The longest subarray of 1s is underlined.
```

**Example 2:**
```
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
                    ↑ ↑       ↑ (flipped these three 0s)
```

**Constraints:**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`
- `0 <= k <= nums.length`

---

## 🧠 Problem Samajhte Hain (Understanding)

### Real-Life Analogy

Imagine you have a row of light bulbs:
- Some are ON (1), some are OFF (0)
- You have `k` spare batteries to turn OFF bulbs ON
- Find the longest stretch of consecutive ON bulbs you can create!

```
Bulbs: 💡💡💡⚫⚫⚫💡💡💡💡⚫
       1  1  1  0  0  0  1  1  1  1  0

With k=2 batteries, we can turn ON 2 bulbs:
       💡💡💡⚫💡💡💡💡💡💡⚫
       1  1  1  0  1  1  1  1  1  1  0
              ↑  ↑
           flipped

Longest streak: 6 consecutive ON bulbs!
```

### Key Insight: Reframe the Problem!

**Don't think about "flipping 0s to 1s"**

**Think about:** Find the longest subarray with **at most k zeros**

```
Original thinking:
  "Flip at most k zeros to get max consecutive 1s"

Better thinking:
  "Find longest window containing at most k zeros"
  (Because we can flip those k zeros to 1s!)

Example: [1,1,1,0,0,0,1,1,1,1,0], k = 2

Window [1,1,1,0,0] has 2 zeros → valid (we can flip both)
Window [1,1,1,0,0,0] has 3 zeros → invalid (can only flip 2)
Window [0,0,1,1,1,1] has 2 zeros → valid, length 6 ⭐
```

---

## 📊 Approaches Overview

| Approach | Time | Space | Technique |
|----------|------|-------|-----------|
| Brute Force | O(n²) | O(1) | Check all subarrays |
| Sliding Window | O(n) | O(1) | Expand/Shrink window |

---

## Approach 1: Brute Force

### Intuition (Soch)

Check every possible subarray:
1. For each starting position
2. Expand until we have more than k zeros
3. Track the maximum valid length

### Pseudo Code

```
function bruteForce(nums, k):
    maxLength = 0

    for i = 0 to n-1:
        zeroCount = 0
        for j = i to n-1:
            if nums[j] == 0:
                zeroCount++

            if zeroCount <= k:
                maxLength = max(maxLength, j - i + 1)
            else:
                break  // Too many zeros, try next start

    return maxLength
```

### Why O(n²)?

```
Outer loop: n starting positions     → O(n)
Inner loop: up to n ending positions → O(n)
                                     ─────────
Total:                                 O(n²)
```

---

## Approach 2: Sliding Window (Optimal)

### Prerequisites

- **Sliding Window Technique**: Two pointers maintaining a "window"
- **Variable-size Window**: Window size changes based on constraint

### Intuition (Soch)

**Key Insight:** Find the longest window with at most k zeros.

**Sliding Window Logic:**
1. **Expand** window by moving `right` pointer
2. Count zeros in window
3. If zeros > k, **shrink** window from left until valid
4. Track maximum window size

### Why Sliding Window Works?

```
Array: [1,1,1,0,0,0,1,1,1,1,0], k = 2

We slide a window, keeping track of zeros inside:

Window [1,1,1]       → 0 zeros ✅, expand
Window [1,1,1,0]     → 1 zero  ✅, expand
Window [1,1,1,0,0]   → 2 zeros ✅, expand (max allowed)
Window [1,1,1,0,0,0] → 3 zeros ❌, shrink!

Shrink from left:
Window [1,1,0,0,0]   → 3 zeros ❌, shrink more
Window [1,0,0,0]     → 3 zeros ❌, shrink more
Window [0,0,0]       → 3 zeros ❌, shrink more
Window [0,0]         → 2 zeros ✅, now expand again

Continue sliding...
```

### Visual Dry Run

```
Array: [1,1,1,0,0,0,1,1,1,1,0], k = 2
Index:  0 1 2 3 4 5 6 7 8 9 10

Initial: left = 0, zeros = 0, maxLen = 0

═══════════════════════════════════════════════════════════
right = 0, nums[0] = 1
  zeros = 0 (no change, it's a 1)
  Window: [1]1,1,0,0,0,1,1,1,1,0
           L
           R
  maxLen = max(0, 0-0+1) = 1

═══════════════════════════════════════════════════════════
right = 1, nums[1] = 1
  zeros = 0
  Window: [1,1]1,0,0,0,1,1,1,1,0
           L R
  maxLen = max(1, 1-0+1) = 2

═══════════════════════════════════════════════════════════
right = 2, nums[2] = 1
  zeros = 0
  Window: [1,1,1]0,0,0,1,1,1,1,0
           L   R
  maxLen = 3

═══════════════════════════════════════════════════════════
right = 3, nums[3] = 0
  zeros = 1 (found a zero!)
  zeros(1) <= k(2) ✅ Valid
  Window: [1,1,1,0]0,0,1,1,1,1,0
           L     R
  maxLen = 4

═══════════════════════════════════════════════════════════
right = 4, nums[4] = 0
  zeros = 2
  zeros(2) <= k(2) ✅ Valid
  Window: [1,1,1,0,0]0,1,1,1,1,0
           L       R
  maxLen = 5

═══════════════════════════════════════════════════════════
right = 5, nums[5] = 0
  zeros = 3
  zeros(3) > k(2) ❌ Invalid! Must shrink

  SHRINK until valid:
    nums[left=0] = 1 → remove, left = 1
    zeros = 3, still > k ❌

    nums[left=1] = 1 → remove, left = 2
    zeros = 3, still > k ❌

    nums[left=2] = 1 → remove, left = 3
    zeros = 3, still > k ❌

    nums[left=3] = 0 → remove a ZERO! zeros = 2, left = 4
    zeros = 2, now <= k ✅

  Window: 1,1,1,0,[0,0]1,1,1,1,0
                   L R
  maxLen = max(5, 5-4+1) = 5

═══════════════════════════════════════════════════════════
right = 6, nums[6] = 1
  zeros = 2
  Window: 1,1,1,0,[0,0,1]1,1,1,0
                   L   R
  maxLen = max(5, 6-4+1) = 5

═══════════════════════════════════════════════════════════
right = 7, nums[7] = 1
  zeros = 2
  Window: 1,1,1,0,[0,0,1,1]1,1,0
                   L     R
  maxLen = max(5, 7-4+1) = 5

═══════════════════════════════════════════════════════════
right = 8, nums[8] = 1
  zeros = 2
  Window: 1,1,1,0,[0,0,1,1,1]1,0
                   L       R
  maxLen = max(5, 8-4+1) = 5

═══════════════════════════════════════════════════════════
right = 9, nums[9] = 1
  zeros = 2
  Window: 1,1,1,0,[0,0,1,1,1,1]0
                   L         R
  maxLen = max(5, 9-4+1) = 6 ⭐

═══════════════════════════════════════════════════════════
right = 10, nums[10] = 0
  zeros = 3
  zeros(3) > k(2) ❌ Invalid! Must shrink

  SHRINK:
    nums[left=4] = 0 → remove a ZERO! zeros = 2, left = 5
    zeros = 2 <= k ✅

  Window: 1,1,1,0,0,[0,1,1,1,1,0]
                     L         R
  maxLen = max(6, 10-5+1) = 6

═══════════════════════════════════════════════════════════
DONE! Answer: 6
```

### Algorithm

```
function longestOnes(nums, k):
    left = 0
    zeros = 0
    maxLength = 0

    for right = 0 to n-1:
        // Expand: Add current element
        if nums[right] == 0:
            zeros++

        // Shrink: Remove elements until valid
        while zeros > k:
            if nums[left] == 0:
                zeros--
            left++

        // Update max length
        maxLength = max(maxLength, right - left + 1)

    return maxLength
```

### Time & Space Complexity

**Time: O(n)**
- Each element is visited at most twice (once by right, once by left)
- Total: O(2n) = O(n)

**Space: O(1)**
- Only using a few variables (left, zeros, maxLength)
- No extra data structures

---

## 🔄 Pattern Recognition

This is a classic **"Variable-size Sliding Window"** problem:

```
┌─────────────────────────────────────────────────────────────┐
│  PATTERN: "Longest Subarray with Constraint"                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Expand window (move right)                              │
│  2. Update window state (count zeros, sum, etc.)            │
│  3. While constraint violated:                              │
│       - Shrink window (move left)                           │
│       - Update state                                        │
│  4. Update answer (max length)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Similar problems:
• Longest Substring Without Repeating Characters
• Max Consecutive Ones III (this one!)
• Longest Repeating Character Replacement
• Subarray Product Less Than K
```

---

## 🎯 Key Insight Summary

```
┌─────────────────────────────────────────────────────────────┐
│  DON'T THINK: "Flip k zeros to 1s"                          │
│                                                             │
│  THINK: "Find longest window with at most k zeros"          │
│                                                             │
│  WHY?                                                       │
│  • If window has ≤k zeros, we CAN flip them all to 1s       │
│  • So window length = max consecutive 1s possible           │
│  • This reframing makes sliding window natural!             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎤 Interview Tips

### What to Say to Interviewer

1. **Reframe the problem:**
   - "Instead of thinking about flipping, I'll find the longest window with at most k zeros"
   - "Because any window with ≤k zeros can be converted to all 1s"

2. **Explain approach:**
   - "I'll use sliding window - expand right, shrink left when too many zeros"
   - "Keep track of zero count in current window"

3. **Edge cases to mention:**
   - "What if k >= number of zeros? Answer is entire array"
   - "What if k = 0? Find longest consecutive 1s"
   - "What if array is all 0s? Answer is k (flip k zeros)"

### Common Follow-up Questions

**Q: What if we need to return the actual subarray, not just length?**
A: Track `startIndex` when we update `maxLength`. Return `nums.slice(startIndex, startIndex + maxLength)`.

**Q: What if k = 0?**
A: Same algorithm works! Window can have 0 zeros, so find longest sequence of 1s.

**Q: Can we solve this with prefix sum?**
A: Yes! Count zeros using prefix sum, then find longest subarray where `zeros[j] - zeros[i-1] <= k`. But sliding window is simpler and more efficient.

---

## Which Solution Do You Want to See?

1. **Brute Force** - O(n²) - Good for understanding
2. **Sliding Window** - O(n) - Optimal solution

Let me know! 🚀