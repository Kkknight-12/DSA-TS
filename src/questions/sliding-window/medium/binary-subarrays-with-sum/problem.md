# Binary Subarrays With Sum

## Problem Statement

Given a binary array `nums` and an integer `goal`, return the **number of non-empty subarrays** with a sum equal to `goal`.

A subarray is a contiguous part of the array.

**Example 1:**
```
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are:
  [1,0,1,0,1]  → indices 0-2: [1,0,1] = sum 2
  [1,0,1,0,1]  → indices 0-3: [1,0,1,0] = sum 2
  [1,0,1,0,1]  → indices 2-4: [1,0,1] = sum 2
  [1,0,1,0,1]  → indices 1-3: [0,1,0,1] = sum 2
```

**Example 2:**
```
Input: nums = [0,0,0,0,0], goal = 0
Output: 15
Explanation: All 15 possible subarrays have sum 0.
  Subarrays: [0], [0], [0], [0], [0],       → 5 single elements
             [0,0], [0,0], [0,0], [0,0],    → 4 pairs
             [0,0,0], [0,0,0], [0,0,0],     → 3 triplets
             [0,0,0,0], [0,0,0,0],          → 2 quadruplets
             [0,0,0,0,0]                    → 1 full array
             Total = 5 + 4 + 3 + 2 + 1 = 15
```

**Constraints:**
- `1 <= nums.length <= 3 * 10^4`
- `nums[i]` is either `0` or `1`
- `0 <= goal <= nums.length`

---

## 🧠 Problem Samajhte Hain (Understanding)

### Ye Problem Different Hai!

Previous sliding window problems mein humne dekha:
- **Longest** subarray with some constraint
- Find **one** answer (max length)

But is problem mein:
- **Count** kitne subarrays have exact sum
- **Exactly** equal, not "at most"

### Real-Life Analogy

Imagine you have a row of light switches (0 = OFF, 1 = ON):
```
Switches: [ON, OFF, ON, OFF, ON]
          [1,  0,   1,  0,   1]
```

Question: Kitne contiguous sections mein **exactly 2 lights ON** hain?

```
Section 1: [ON, OFF, ON]       → indices 0-2: 2 lights ON ✅
Section 2: [ON, OFF, ON, OFF]  → indices 0-3: 2 lights ON ✅
Section 3: [OFF, ON, OFF, ON]  → indices 1-4: 2 lights ON ✅
Section 4: [ON, OFF, ON]       → indices 2-4: 2 lights ON ✅

Answer: 4 sections
```

### 🔑 Key Challenge: "Exactly K" is Hard!

```
┌─────────────────────────────────────────────────────────────┐
│  NORMAL SLIDING WINDOW: "At Most K" → Easy!                 │
│                                                             │
│  • Expand right                                             │
│  • If constraint violated (> K), shrink left                │
│  • Count or track maximum                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  THIS PROBLEM: "Exactly K" → Tricky!                        │
│                                                             │
│  • Can't directly use sliding window                        │
│  • Need a clever trick!                                     │
│                                                             │
│  TRICK: exactly(K) = atMost(K) - atMost(K-1)               │
│                                                             │
│  WHY? "Exactly K" = "At most K" minus "At most K-1"         │
│       Because atMost(K) includes K, K-1, K-2, ...           │
│       And atMost(K-1) includes K-1, K-2, ...                │
│       Subtracting removes everything except exactly K!      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visual Explanation of the Trick

```
atMost(2) counts subarrays with sum: 0, 1, 2
atMost(1) counts subarrays with sum: 0, 1

exactly(2) = atMost(2) - atMost(1)
           = (0,1,2) - (0,1)
           = 2 only! ✅

┌─────────────────────────────────────────────────────────────┐
│  Example: nums = [1,0,1], goal = 2                          │
│                                                             │
│  atMost(2): All subarrays with sum ≤ 2                      │
│    [1] → 1 ✅                                               │
│    [1,0] → 1 ✅                                             │
│    [1,0,1] → 2 ✅                                           │
│    [0] → 0 ✅                                               │
│    [0,1] → 1 ✅                                             │
│    [1] → 1 ✅                                               │
│    Total: 6 subarrays                                       │
│                                                             │
│  atMost(1): All subarrays with sum ≤ 1                      │
│    [1] → 1 ✅                                               │
│    [1,0] → 1 ✅                                             │
│    [1,0,1] → 2 ❌ (excluded)                                │
│    [0] → 0 ✅                                               │
│    [0,1] → 1 ✅                                             │
│    [1] → 1 ✅                                               │
│    Total: 5 subarrays                                       │
│                                                             │
│  exactly(2) = 6 - 5 = 1 subarray ([1,0,1])                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤔 Deep Dive: WHY "At Most K" Trick? (Zaroori Samjho!)

### The Core Problem: Why Can't We Directly Find "Exactly K"?

Let's try to use normal sliding window for "exactly goal":

```
nums = [1, 0, 1, 0, 1], goal = 2

When window has sum = 2:
  [1, 0, 1] → sum = 2 ✅

Now what?
  - Should we EXPAND? Maybe [1, 0, 1, 0] also has sum = 2 (adding 0)
  - Should we SHRINK? Maybe [0, 1] has sum = 1 (removing 1)

WE DON'T KNOW WHEN TO STOP!
```

### The Zeros Problem (Sabse Bada Issue!)

```
nums = [0, 0, 1, 0, 0], goal = 1

ALL these subarrays have sum = 1:
  [1]             ← single element
  [0, 1]          ← 1 leading zero
  [0, 0, 1]       ← 2 leading zeros
  [1, 0]          ← 1 trailing zero
  [1, 0, 0]       ← 2 trailing zeros
  [0, 1, 0]       ← both sides
  [0, 0, 1, 0]    ← both sides
  [0, 1, 0, 0]    ← both sides
  [0, 0, 1, 0, 0] ← entire array

Total = 9 subarrays with sum exactly 1!

With sliding window for "exactly goal":
  - When we find sum = goal, we count 1
  - But we're missing all the other valid subarrays!
  - Zeros don't change sum, so many windows can have same sum
```

### The Fundamental Issue

```
┌────────────────────────────────────────────────────────────┐
│  SLIDING WINDOW FOR "EXACTLY K" DOESN'T WORK BECAUSE:     │
│                                                            │
│  1. When sum < goal: We must EXPAND (clear decision)       │
│  2. When sum > goal: We must SHRINK (clear decision)       │
│  3. When sum = goal: ??? AMBIGUOUS!                        │
│     - Should we expand? (might find more valid windows)    │
│     - Should we shrink? (might find more valid windows)    │
│     - Both could work!                                     │
│                                                            │
│  We can't decide the direction when sum = goal!            │
└────────────────────────────────────────────────────────────┘
```

### Why "At Most K" Works Perfectly

```
┌────────────────────────────────────────────────────────────┐
│  SLIDING WINDOW FOR "AT MOST K" ALWAYS HAS CLEAR DECISION: │
│                                                            │
│  1. When sum <= k: EXPAND (window is valid, try bigger)    │
│  2. When sum > k: SHRINK (window is invalid, make smaller) │
│                                                            │
│  NO AMBIGUITY! We always know what to do!                  │
└────────────────────────────────────────────────────────────┘
```

### The Counting Magic

When window `[left, right]` is valid (sum <= k):

```
Window: [left ... right] has sum <= k

ALL these subarrays are also valid:
  [left, left+1, ..., right]   ← full window
  [left+1, left+2, ..., right] ← remove left element
  [left+2, left+3, ..., right] ← remove more from left
  ...
  [right]                      ← just the last element

WHY? Removing elements from left can only DECREASE sum!
     If sum <= k, smaller sum is also <= k!

Count = right - left + 1
```

### Visual Proof of Subtraction

```
goal = 2

atMost(2) includes subarrays with sum:
  ┌─────────────────────────────────────┐
  │  sum=0  │  sum=1  │  sum=2          │
  │  ████   │  ████   │  ████           │
  └─────────────────────────────────────┘

atMost(1) includes subarrays with sum:
  ┌─────────────────────────────────────┐
  │  sum=0  │  sum=1  │                 │
  │  ████   │  ████   │                 │
  └─────────────────────────────────────┘

atMost(2) - atMost(1) =
  ┌─────────────────────────────────────┐
  │         │         │  sum=2          │
  │         │         │  ████           │  ← Only sum=2!
  └─────────────────────────────────────┘
```

### Concrete Example

```
nums = [1, 0, 1], goal = 2

═══════════════════════════════════════════════════════════
atMost(2): All subarrays with sum <= 2
═══════════════════════════════════════════════════════════

[1]       sum=1 ✅
[1,0]     sum=1 ✅
[1,0,1]   sum=2 ✅
[0]       sum=0 ✅
[0,1]     sum=1 ✅
[1]       sum=1 ✅

Total = 6 subarrays

═══════════════════════════════════════════════════════════
atMost(1): All subarrays with sum <= 1
═══════════════════════════════════════════════════════════

[1]       sum=1 ✅
[1,0]     sum=1 ✅
[1,0,1]   sum=2 ❌ (excluded!)
[0]       sum=0 ✅
[0,1]     sum=1 ✅
[1]       sum=1 ✅

Total = 5 subarrays

═══════════════════════════════════════════════════════════
exactly(2) = atMost(2) - atMost(1) = 6 - 5 = 1
═══════════════════════════════════════════════════════════

The 1 subarray: [1,0,1] with sum = 2 ✅
```

### Why Not Just Check "Equal to Goal" Directly?

The problem is **counting leading and trailing zeros**:

```
nums = [0, 0, 0, 1, 0, 0], goal = 1

For the '1' at index 3:
  - 3 leading zeros (indices 0, 1, 2)
  - 2 trailing zeros (indices 4, 5)

Valid subarrays = (leading + 1) × (trailing + 1) = 4 × 3 = 12

This requires EXTRA LOGIC to count zeros on both sides!

With atMost trick:
  - Just slide window, count (right - left + 1) each time
  - Subtraction handles zeros automatically!
  - No extra tracking needed!
```

### Summary: Why At Most Trick?

```
┌────────────────────────────────────────────────────────────┐
│  PROBLEM: "Exactly K" has ambiguous window direction       │
│           (expand or shrink when sum = goal?)              │
│                                                            │
│  SOLUTION: Convert to "At Most K" which is unambiguous     │
│            (always expand when valid, shrink when invalid) │
│                                                            │
│  WHY IT WORKS:                                              │
│  1. atMost(K) is easy to compute with sliding window       │
│  2. Counting formula (right-left+1) works perfectly        │
│  3. Subtraction isolates exactly K                         │
│                                                            │
│  FORMULA:                                                   │
│  exactly(K) = atMost(K) - atMost(K-1)                      │
│                                                            │
│  This pattern works for ALL "exactly K" problems!          │
└────────────────────────────────────────────────────────────┘
```

---

## 📊 Approaches Overview

| Approach | Time | Space | Technique |
|----------|------|-------|-----------|
| Brute Force | O(n²) | O(1) | Check all subarrays |
| Prefix Sum + HashMap | O(n) | O(n) | Track prefix sums |
| Sliding Window (At Most Trick) | O(n) | O(1) | atMost(K) - atMost(K-1) |

---

## Approach 1: Brute Force

### Intuition (Soch)

Simple approach: Check every possible subarray
1. For each starting position i
2. Extend to each ending position j
3. Track sum as we go
4. If sum == goal, increment count
5. If sum > goal, break (optimization for binary array)

### Pseudo Code

```
function bruteForce(nums, goal):
    count = 0

    for i = 0 to n-1:
        sum = 0

        for j = i to n-1:
            sum += nums[j]

            if sum == goal:
                count++
            else if sum > goal:
                break  // Can't get back to goal (only 0s and 1s)

    return count
```

### Time Complexity: O(n²)

---

## Approach 2: Prefix Sum + HashMap

### Prerequisites
- **Prefix Sum**: Running sum from index 0 to current index
- **HashMap**: To count occurrences of each prefix sum

### Intuition (Soch)

```
┌─────────────────────────────────────────────────────────────┐
│  KEY INSIGHT:                                               │
│                                                             │
│  If prefixSum[j] - prefixSum[i-1] = goal                   │
│  Then subarray [i...j] has sum = goal                       │
│                                                             │
│  So for each position j:                                    │
│  - Current prefix sum = prefixSum[j]                        │
│  - We need prefixSum[i-1] = prefixSum[j] - goal            │
│  - Count how many such i-1 positions exist                  │
│                                                             │
│  HashMap stores: prefixSum → count of occurrences           │
└─────────────────────────────────────────────────────────────┘
```

### Visual Example

```
nums = [1, 0, 1, 0, 1], goal = 2

Index:       0   1   2   3   4
nums:       [1,  0,  1,  0,  1]
prefixSum:   1   1   2   2   3

At index 4 (prefixSum = 3):
  Need: 3 - 2 = 1
  How many times did prefixSum = 1 occur before? → 2 times (index 0, 1)
  So 2 subarrays ending at index 4 have sum = 2

HashMap tracks count of each prefix sum as we go.
```

### Pseudo Code

```
function prefixSumApproach(nums, goal):
    count = 0
    prefixSum = 0
    map = {0: 1}  // Empty subarray has sum 0

    for num in nums:
        prefixSum += num

        // How many subarrays ending here have sum = goal?
        target = prefixSum - goal
        count += map.get(target, 0)

        // Add current prefix sum to map
        map[prefixSum] = map.get(prefixSum, 0) + 1

    return count
```

### Time & Space: O(n), O(n)

---

## Approach 3: Sliding Window (At Most K Trick) ⭐

### Prerequisites
- **Sliding Window Pattern**: Two pointers technique
- **At Most K Pattern**: Finding subarrays with constraint ≤ K

### Intuition (Soch)

```
┌─────────────────────────────────────────────────────────────┐
│  THE MAGIC TRICK:                                           │
│                                                             │
│  exactly(goal) = atMost(goal) - atMost(goal - 1)           │
│                                                             │
│  Step 1: Count subarrays with sum ≤ goal                   │
│  Step 2: Count subarrays with sum ≤ goal-1                 │
│  Step 3: Subtract to get exactly goal                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### How "At Most K" Counting Works

```
┌─────────────────────────────────────────────────────────────┐
│  For each valid window ending at 'right':                   │
│                                                             │
│  Number of subarrays = right - left + 1                     │
│                                                             │
│  WHY? Each subarray starting from any index in [left,right] │
│       and ending at 'right' is valid!                       │
│                                                             │
│  Example: Window [left=1, right=4]                          │
│    Valid subarrays ending at right=4:                       │
│    - [1...4] (length 4)                                     │
│    - [2...4] (length 3)                                     │
│    - [3...4] (length 2)                                     │
│    - [4...4] (length 1)                                     │
│    Total = 4 = right - left + 1 = 4 - 1 + 1                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visual Dry Run

```
nums = [1, 0, 1, 0, 1], goal = 2

═══════════════════════════════════════════════════════════════
STEP 1: atMost(2) - Count subarrays with sum ≤ 2
═══════════════════════════════════════════════════════════════

right=0: nums[0]=1, sum=1, valid (1≤2)
  window: [1], left=0, right=0
  subarrays ending at right=0: 0-0+1 = 1
  count = 1

right=1: nums[1]=0, sum=1, valid (1≤2)
  window: [1,0], left=0, right=1
  subarrays ending at right=1: 1-0+1 = 2
  count = 1+2 = 3

right=2: nums[2]=1, sum=2, valid (2≤2)
  window: [1,0,1], left=0, right=2
  subarrays ending at right=2: 2-0+1 = 3
  count = 3+3 = 6

right=3: nums[3]=0, sum=2, valid (2≤2)
  window: [1,0,1,0], left=0, right=3
  subarrays ending at right=3: 3-0+1 = 4
  count = 6+4 = 10

right=4: nums[4]=1, sum=3 > 2! Must shrink!
  shrink: remove nums[0]=1, sum=2, left=1
  window: [0,1,0,1], left=1, right=4
  subarrays ending at right=4: 4-1+1 = 4
  count = 10+4 = 14

atMost(2) = 14

═══════════════════════════════════════════════════════════════
STEP 2: atMost(1) - Count subarrays with sum ≤ 1
═══════════════════════════════════════════════════════════════

right=0: sum=1 ≤ 1 ✅, count += 1 → count=1
right=1: sum=1 ≤ 1 ✅, count += 2 → count=3
right=2: sum=2 > 1! shrink until sum≤1
  remove nums[0]=1, sum=1, left=1
  but wait, sum still = 1? No, let me recalculate...

  Actually: [0,1] from index 1-2 has sum=1
  window: [0,1], left=1, right=2
  subarrays: 2-1+1 = 2
  count = 3+2 = 5

right=3: [0,1,0] sum=1 ≤ 1 ✅
  subarrays: 3-1+1 = 3
  count = 5+3 = 8

right=4: [0,1,0,1] sum=2 > 1! shrink!
  remove nums[1]=0, sum=2, left=2, still > 1
  remove nums[2]=1, sum=1, left=3, now ≤ 1 ✅
  window: [0,1], left=3, right=4
  subarrays: 4-3+1 = 2
  count = 8+2 = 10

atMost(1) = 10

═══════════════════════════════════════════════════════════════
STEP 3: Calculate exactly(2)
═══════════════════════════════════════════════════════════════

exactly(2) = atMost(2) - atMost(1) = 14 - 10 = 4 ✅
```

### Algorithm

```
function slidingWindow(nums, goal):
    // exactly(goal) = atMost(goal) - atMost(goal-1)
    return atMost(nums, goal) - atMost(nums, goal - 1)

function atMost(nums, k):
    if k < 0:
        return 0  // No valid subarrays

    count = 0
    sum = 0
    left = 0

    for right = 0 to n-1:
        sum += nums[right]

        // Shrink while sum > k
        while sum > k:
            sum -= nums[left]
            left++

        // All subarrays ending at right with sum ≤ k
        count += right - left + 1

    return count
```

### Time & Space Complexity

**Time: O(n)**
- Two passes through array (one for each atMost call)
- Each element visited at most twice per pass (once by right, once by left)
- Total: O(n) + O(n) = O(n)

**Space: O(1)**
- Only using a few variables
- No extra data structures

---

## 🔄 Pattern Recognition

```
┌─────────────────────────────────────────────────────────────┐
│  "EXACTLY K" PATTERN                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  When problem asks for EXACTLY K:                           │
│                                                             │
│  exactly(K) = atMost(K) - atMost(K-1)                      │
│                                                             │
│  Similar Problems:                                          │
│  • Subarrays with K Different Integers                      │
│  • Count Number of Nice Subarrays                           │
│  • Binary Subarrays With Sum (this problem)                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  "AT MOST K" COUNTING:                                      │
│                                                             │
│  For each valid window [left, right]:                       │
│    count += right - left + 1                                │
│                                                             │
│  This counts ALL valid subarrays ending at 'right'          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🆚 Approach Comparison

```
┌──────────────────┬─────────────┬─────────────┬────────────────────────┐
│    Approach      │    Time     │    Space    │         Notes          │
├──────────────────┼─────────────┼─────────────┼────────────────────────┤
│ Brute Force      │   O(n²)     │    O(1)     │ Simple, intuitive      │
│ Prefix Sum+Map   │   O(n)      │    O(n)     │ Works for any array    │
│ Sliding Window   │   O(n)      │    O(1)     │ Best! But tricky       │
└──────────────────┴─────────────┴─────────────┴────────────────────────┘

Sliding Window wins because:
✅ O(n) time
✅ O(1) space
✅ Works perfectly for binary arrays
```

---

## 🎤 Interview Tips

### What to Say to Interviewer

1. **Recognize the challenge:**
   - "This asks for exactly K, which is tricky for sliding window"
   - "I'll use the atMost trick: exactly(K) = atMost(K) - atMost(K-1)"

2. **Explain the counting:**
   - "For each valid window, I count subarrays ending at right"
   - "That's (right - left + 1) subarrays"

3. **Edge cases to mention:**
   - "goal = 0: Need to handle atMost(-1) which returns 0"
   - "All zeros: Many valid subarrays"
   - "All ones: Limited valid subarrays"

### Common Follow-up Questions

**Q: Why use atMost(K) - atMost(K-1)?**
A: Because sliding window naturally finds "at most K". To get "exactly K", we subtract the "at most K-1" count, removing all subarrays with sum < K.

**Q: Can we use normal sliding window directly?**
A: Not easily. Normal sliding window tracks longest/shortest, not counts. The "at most" trick is the standard approach for counting exact matches.

**Q: What if the array isn't binary?**
A: For non-binary arrays with positive numbers, prefix sum + HashMap is better. Sliding window's atMost trick still works but needs careful handling.

---

## Edge Cases

1. **goal = 0:** Need special handling - atMost(-1) should return 0
2. **All zeros:** Answer = n*(n+1)/2 (all subarrays valid)
3. **All ones:** Answer depends on n and goal
4. **Single element:** Check if nums[0] == goal
5. **goal > n:** Answer = 0 (impossible)

---

## Which Solution Do You Want to See?

1. **Brute Force** - O(n²) - Good for understanding
2. **Prefix Sum + HashMap** - O(n), O(n) - Works for any array
3. **Sliding Window (At Most Trick)** - O(n), O(1) - Optimal for binary

Let me know! 🚀