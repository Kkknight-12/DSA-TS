# 239. Sliding Window Maximum

**Difficulty:** Hard
**Topics:** Sliding Window, Monotonic Deque, Queue, Array
**LeetCode Link:** [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

---

## Problem Statement (Simple Language Mein)

Tumhe ek array `nums` diya hai aur ek window size `k` diya hai. Window left se right move karti hai, ek position at a time.

**Task:** Har window position pe maximum element find karo.

---

## Examples:

### Example 1:
```
Input: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

Window slides from left to right:

Window Position                Max
─────────────────             ─────
[1   3  -1] -3   5   3   6   7    3
 1  [3  -1  -3]  5   3   6   7    3
 1   3 [-1  -3   5]  3   6   7    5
 1   3  -1 [-3   5   3]  6   7    5
 1   3  -1  -3  [5   3   6]  7    6
 1   3  -1  -3   5  [3   6   7]   7

Output: [3, 3, 5, 5, 6, 7]
```

### Example 2:
```
Input: nums = [1], k = 1

Only one element, one window:
[1]  →  Max = 1

Output: [1]
```

### Example 3:
```
Input: nums = [9, 11], k = 2

[9  11]  →  Max = 11

Output: [11]
```

### Example 4:
```
Input: nums = [4, 3, 2, 1], k = 2

Window Position       Max
─────────────────    ─────
[4   3]  2   1         4
 4  [3   2]  1         3
 4   3  [2   1]        2

Output: [4, 3, 2]
```

---

## Constraints:
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

---

## Key Insight! 🔑

**Brute Force Problem:**
For each window, scan all k elements to find max → O(n × k)

**Optimal Observation:**
```
Window: [1, 3, -1], next element: -3

Current max = 3
New element -3 < 3

Do we need to rescan? NO!
Max is still 3 (just check if max is still in window)
```

**But what if max slides out of window?**
```
Window: [3, -1, -3], sliding to [-1, -3, 5]

3 slides out! Now we need the NEXT maximum.
If we kept track of "potential maximums" in order, we'd know!
```

**Solution: Monotonic Decreasing Deque!**
- Keep elements in DECREASING order
- Front of deque = current maximum
- Remove elements that slide out of window
- Remove smaller elements when larger comes (they'll never be max)

---

## Prerequisites

- **Deque (Double-ended Queue)** - Add/remove from both ends in O(1)
- **Monotonic Stack/Queue concept**
- Sliding Window technique

---

## Understanding the Algorithm (Step by Step)

### Question 1: Why Deque (not Stack)?

**Stack vs Deque:**
```
Stack:  Add/Remove from ONE end only (top)
        [1, 2, 3] ← push/pop here only

Deque:  Add/Remove from BOTH ends
        shift ← [1, 2, 3] → push
        (front)            (back)
```

**Why we need BOTH ends?**
```
We need to:
1. Remove from BACK: When new element is LARGER (pop)
2. Remove from FRONT: When element goes OUT of window (shift)

Stack can't remove from front!
```

---

### Question 2: What is `i - k + 1`?

**This is the LEFT BOUNDARY of current window!**

```
Window size k = 3
Current position i = 4

Window contains indices: [i-k+1, i] = [4-3+1, 4] = [2, 3, 4]

Visual:
  Index:   0    1    2    3    4
  nums:   [1,   3,  -1,  -3,   5]
                └─────────────┘
                  Window [2,3,4]

Left boundary = i - k + 1 = 2
```

**Why check `deque[0] < i - k + 1`?**
```
If front of deque has index LESS than left boundary,
that element is OUTSIDE the window!

Example:
  i = 4, k = 3
  Window: [2, 3, 4]

  If deque[0] = 1 (index 1)
  Is 1 < 2? YES! Index 1 is OUTSIDE window!
  Must remove it with shift()
```

---

### Question 3: Why shift() and pop()?

**shift() - Remove OLD elements (out of window)**
```
Window slides right, old elements fall out:

  Before:  [3, -1, -3]  (indices 1,2,3)
  After:   [-1, -3, 5]  (indices 2,3,4)

  Index 1 is now OUTSIDE! Remove it.
```

**pop() - Remove USELESS elements**
```
KEY INSIGHT:
If a LARGER element comes, smaller elements before it
will NEVER be the maximum!

Example:
  Deque has: [3, -1, -3]  (values)
  New element: 5

  -3 < 5? YES! -3 will never be max. Remove it.
  -1 < 5? YES! -1 will never be max. Remove it.
  3 < 5? YES! 3 will never be max. Remove it.

  Deque becomes: [5]
```

**Why smaller elements are useless?**
```
Window: [-1, -3, 5]

Think about it:
- 5 is in the window
- -1 and -3 are also in the window
- As long as 5 is in window, -1 and -3 can NEVER be maximum!

So why keep them? Remove them!
```

---

### Complete Walkthrough Example

```
nums = [1, 3, -1, -3, 5], k = 3
Deque stores INDICES (to check window bounds)

═══════════════════════════════════════════════════════════════
i = 0, nums[0] = 1
═══════════════════════════════════════════════════════════════
Window not complete yet (need k=3 elements)

Deque: [] → push 0 → [0]
       (indices)     values: [1]

═══════════════════════════════════════════════════════════════
i = 1, nums[1] = 3
═══════════════════════════════════════════════════════════════
Window not complete yet

Deque: [0]
       values: [1]

Q: Is 3 > 1?  YES!
   1 will NEVER be max as long as 3 is in window.
   pop() → remove index 0

Deque: [] → push 1 → [1]
                     values: [3]

═══════════════════════════════════════════════════════════════
i = 2, nums[2] = -1
═══════════════════════════════════════════════════════════════
Window is NOW complete! [0,1,2]

Deque: [1]
       values: [3]

Q: Is -1 > 3?  NO!
   Keep 3, just add -1 after it.

   WHY keep -1?
   Because when 3 slides out of window,
   -1 might become the maximum!

Deque: [1] → push 2 → [1, 2]
                      values: [3, -1]

Window [1,3,-1]: max = nums[deque[0]] = nums[1] = 3 ✓

═══════════════════════════════════════════════════════════════
i = 3, nums[3] = -3
═══════════════════════════════════════════════════════════════
Window bounds: [3-3+1, 3] = [1, 3]

Deque: [1, 2]

Q: Is front (index 1) out of window?
   Is 1 < 1? NO! Index 1 is still valid.

Q: Is -3 > -1?  NO!
   Keep -1, add -3 after it.

Deque: [1, 2, 3]
       values: [3, -1, -3]

Window [3,-1,-3]: max = nums[1] = 3 ✓

═══════════════════════════════════════════════════════════════
i = 4, nums[4] = 5
═══════════════════════════════════════════════════════════════
Window bounds: [4-3+1, 4] = [2, 4]

Deque: [1, 2, 3]

Q: Is front (index 1) out of window?
   Is 1 < 2? YES! Index 1 is OUTSIDE!
   shift() → remove index 1

Deque: [2, 3]

Q: Is 5 > -3?  YES! pop() index 3
Q: Is 5 > -1?  YES! pop() index 2

Deque: [] → push 4 → [4]
                     values: [5]

Window [-1,-3,5]: max = nums[4] = 5 ✓

═══════════════════════════════════════════════════════════════
Result: [3, 3, 5]
═══════════════════════════════════════════════════════════════
```

---

### Operations Summary

| Operation | When | Why |
|-----------|------|-----|
| `shift()` | Front index < i-k+1 | Element is OUT of window |
| `pop()` | Back value < new value | Smaller = will never be max |
| `push()` | Always | New element might be future max |
| `deque[0]` | Read result | Front is always the current max |

---

### Visual Memory Aid

```
Deque maintains "backup maximums" in decreasing order:

    [5, 3, 2, 1]
     ↑
   FRONT = Current Maximum

If 5 slides out → 3 becomes max (backup ready!)
If 5 slides out and 3 slides out → 2 becomes max

We always have the next maximum ready!
```

---

## Approach 1: Brute Force

### Intuition:
For each window position, scan all k elements to find maximum.

### Algorithm:
```
result = []
for i from 0 to n-k:
    window = nums[i : i+k]
    result.push(max(window))
return result
```

### Complexity:
- **Time:** O(n × k) - For each window, scan k elements
- **Space:** O(1) - excluding output array

**Result:** ❌ TLE for large inputs (n = 10^5, k = 10^4)

---

## Approach 2: Optimal (Monotonic Decreasing Deque)

### Intuition:

**Key Observations:**

1. **Smaller elements before larger are useless:**
   ```
   Window: [1, 3, ...]

   1 will NEVER be the max as long as 3 is in the window.
   We can discard 1!
   ```

2. **Keep elements in decreasing order:**
   ```
   Deque: [5, 3, 2]

   If 5 slides out → 3 becomes max
   If 3 slides out → 2 becomes max

   We have "backup maximums" ready!
   ```

3. **Remove elements outside window:**
   ```
   Window of size 3 at position i=5
   Valid indices: 3, 4, 5

   If deque front has index < 3, remove it!
   ```

### Visual Example:

```
nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

We'll store INDICES in deque (to check if element is in window)
Deque maintains: indices whose values are in DECREASING order

i=0, num=1:
  Deque: []
  1 > nothing, push 0
  Deque: [0]  (values: [1])
  Window not complete yet

i=1, num=3:
  Deque: [0]
  3 > nums[0]=1, pop 0
  Deque: []
  Push 1
  Deque: [1]  (values: [3])
  Window not complete yet

i=2, num=-1:
  Deque: [1]
  -1 < nums[1]=3, just push 2
  Deque: [1, 2]  (values: [3, -1])
  Window complete! Front = index 1, max = 3 ✓
  Result: [3]

i=3, num=-3:
  Check front: index 1 >= i-k+1 = 1? YES, keep it
  Deque: [1, 2]
  -3 < nums[2]=-1, just push 3
  Deque: [1, 2, 3]  (values: [3, -1, -3])
  Front = index 1, max = 3 ✓
  Result: [3, 3]

i=4, num=5:
  Check front: index 1 >= i-k+1 = 2? NO! Remove front
  Deque: [2, 3]
  5 > nums[3]=-3, pop 3
  5 > nums[2]=-1, pop 2
  Deque: []
  Push 4
  Deque: [4]  (values: [5])
  Front = index 4, max = 5 ✓
  Result: [3, 3, 5]

i=5, num=3:
  Check front: index 4 >= i-k+1 = 3? YES, keep it
  Deque: [4]
  3 < nums[4]=5, just push 5
  Deque: [4, 5]  (values: [5, 3])
  Front = index 4, max = 5 ✓
  Result: [3, 3, 5, 5]

i=6, num=6:
  Check front: index 4 >= i-k+1 = 4? YES, keep it
  Deque: [4, 5]
  6 > nums[5]=3, pop 5
  6 > nums[4]=5, pop 4
  Deque: []
  Push 6
  Deque: [6]  (values: [6])
  Front = index 6, max = 6 ✓
  Result: [3, 3, 5, 5, 6]

i=7, num=7:
  Check front: index 6 >= i-k+1 = 5? YES, keep it
  Deque: [6]
  7 > nums[6]=6, pop 6
  Deque: []
  Push 7
  Deque: [7]  (values: [7])
  Front = index 7, max = 7 ✓
  Result: [3, 3, 5, 5, 6, 7]

Final Output: [3, 3, 5, 5, 6, 7] ✓
```

### Why Monotonic DECREASING?

```
We want MAXIMUM, so largest should be at front.

Deque: [5, 3, 2] (decreasing order)
        ↑
      Front = Maximum

If we used increasing order:
Deque: [2, 3, 5]
        ↑
      Front = Minimum (wrong!)
```

### Why Store INDICES, Not Values?

```
We need to check if the maximum is still within the window!

Window of size 3 at i=5:
  Valid indices: 3, 4, 5

If front of deque has index 2, it's OUT of window!
We must remove it, even if it's the largest value.
```

### Algorithm:

```typescript
function maxSlidingWindow(nums: number[], k: number): number[] {
    const deque: number[] = [];  // stores indices
    const result: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }

        // Remove smaller elements (they'll never be max)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        // Add current index
        deque.push(i);

        // Record max for complete windows
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}
```

### Complexity:

**Time Complexity:** O(n)
- Each element is pushed once and popped at most once
- Total operations: O(2n) = O(n)

**Space Complexity:** O(k)
- Deque stores at most k indices

---

## Why Each Element is Processed Once?

```
Think about it:

- Each element enters deque exactly ONCE (push)
- Each element leaves deque at most ONCE (pop or shift)

Even though we have while loops inside for loop:
- Total pushes across all iterations = n
- Total pops across all iterations ≤ n
- Total shifts across all iterations ≤ n

Total operations = O(n), not O(n × k)!
```

---

## Deque Operations Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Operation         │  When                   │  Why          │
├─────────────────────────────────────────────────────────────┤
│  shift (remove     │  Front index is out    │  Element no   │
│  from front)       │  of window             │  longer valid │
├─────────────────────────────────────────────────────────────┤
│  pop (remove       │  Back element < new    │  It will      │
│  from back)        │  element               │  never be max │
├─────────────────────────────────────────────────────────────┤
│  push (add to      │  Always                │  New element  │
│  back)             │                        │  might be max │
├─────────────────────────────────────────────────────────────┤
│  Read front        │  Window is complete    │  Front is     │
│  (deque[0])        │  (i >= k-1)           │  current max  │
└─────────────────────────────────────────────────────────────┘
```

---

## Edge Cases

1. **k = 1:** Each element is its own window → return nums itself
2. **k = n:** Single window → return [max(nums)]
3. **All same elements:** Every window has same max
4. **Strictly decreasing:** [5,4,3,2,1], k=3 → [5,4,3]
5. **Strictly increasing:** [1,2,3,4,5], k=3 → [3,4,5]

---

## Comparison Table

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Brute Force** | O(n × k) | O(1) | TLE for large k |
| **Monotonic Deque** | O(n) | O(k) | Optimal! |

---

## Related Problems:

- **84. Largest Rectangle in Histogram** (Hard) - Similar monotonic stack
- **739. Daily Temperatures** (Medium) - Monotonic stack
- **862. Shortest Subarray with Sum at Least K** (Hard) - Monotonic deque
- **1438. Longest Continuous Subarray With Absolute Diff** (Medium) - Two deques

---

**Konsa approach dekhna hai? Brute Force ya Optimal (Monotonic Deque)?** 🎯