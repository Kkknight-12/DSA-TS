# Subarrays with K Different Integers

## Problem Statement

Given an integer array `nums` and an integer `k`, return the number of **good subarrays** of nums.

A **good subarray** is a contiguous subarray that contains **exactly k distinct integers**.

## Examples

### Example 1:
```
Input: nums = [1, 2, 1, 2, 3], k = 2
Output: 7
Explanation: The 7 subarrays with exactly 2 different integers are:
[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
```

### Example 2:
```
Input: nums = [1, 2, 1, 3, 4], k = 3
Output: 3
Explanation: The 3 subarrays with exactly 3 different integers are:
[1,2,1,3], [2,1,3], [1,3,4]
```

### Example 3:
```
Input: nums = [1, 1, 1, 1], k = 1
Output: 10
Explanation: All subarrays have exactly 1 distinct integer.
4 + 3 + 2 + 1 = 10 subarrays
```

## Constraints
- `1 <= nums.length <= 2 * 10^4`
- `1 <= nums[i], k <= nums.length`

---

## Key Observation - "EXACTLY K" is TRICKY!

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  THE PROBLEM WITH "EXACTLY K":                                             │
│                                                                            │
│  With standard sliding window:                                             │
│  - We can easily count "AT MOST K" distinct                                │
│  - We can easily count "AT LEAST K" distinct                               │
│  - But "EXACTLY K"? Window can become INVALID from BOTH sides!             │
│                                                                            │
│  Example: nums = [1,2,1,2,3], k = 2                                        │
│                                                                            │
│  Window [1,2,1,2] has 2 distinct ✅                                        │
│  Window [1,2,1,2,3] has 3 distinct ❌ (too many)                           │
│  Window [1] has 1 distinct ❌ (too few)                                    │
│                                                                            │
│  Standard sliding window doesn't handle "exactly" well!                    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## THE BRILLIANT TRICK: Exactly K = AtMost(K) - AtMost(K-1)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │   EXACTLY K distinct = AT MOST K distinct - AT MOST (K-1) distinct  │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  WHY DOES THIS WORK?                                                       │
│                                                                            │
│  atMost(K) counts subarrays with: 1, 2, 3, ..., K distinct                │
│  atMost(K-1) counts subarrays with: 1, 2, 3, ..., K-1 distinct            │
│                                                                            │
│  Subtracting removes all subarrays with ≤ K-1 distinct                    │
│  What remains? ONLY subarrays with EXACTLY K distinct!                    │
│                                                                            │
│  Visual (Venn Diagram):                                                    │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                        atMost(K)                                    │  │
│  │  ┌──────────────────────────────────────┐                          │  │
│  │  │           atMost(K-1)                │  ┌────────────────────┐  │  │
│  │  │                                      │  │   EXACTLY K        │  │  │
│  │  │  distinct: 1, 2, 3, ..., K-1         │  │   (what remains!)  │  │  │
│  │  │                                      │  │                    │  │  │
│  │  └──────────────────────────────────────┘  └────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Visual Proof with Example

```
nums = [1, 2, 1, 2, 3], k = 2

═══════════════════════════════════════════════════════════════════════════════
STEP 1: Count subarrays with AT MOST 2 distinct
═══════════════════════════════════════════════════════════════════════════════

All valid subarrays (1 or 2 distinct):
[1], [2], [1], [2], [3]                           → 5 (single elements)
[1,2], [2,1], [1,2], [2,3]                        → 4 (pairs)
[1,2,1], [2,1,2]                                   → 2 (triplets with 2 distinct)
[1,2,1,2]                                          → 1 (length 4 with 2 distinct)

Total atMost(2) = 5 + 4 + 2 + 1 = 12

═══════════════════════════════════════════════════════════════════════════════
STEP 2: Count subarrays with AT MOST 1 distinct
═══════════════════════════════════════════════════════════════════════════════

All valid subarrays (only 1 distinct):
[1], [2], [1], [2], [3]                           → 5 (single elements)

Total atMost(1) = 5

═══════════════════════════════════════════════════════════════════════════════
STEP 3: EXACTLY 2 = atMost(2) - atMost(1)
═══════════════════════════════════════════════════════════════════════════════

exactly(2) = 12 - 5 = 7 ✅

The 7 subarrays: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
```

---

## Approaches

### Approach 1: Brute Force

**Intuition (Soch):**
- Check ALL possible subarrays
- Count distinct elements in each
- If distinct == k, increment count

**Time Complexity:** O(n²) or O(n³)
**Space Complexity:** O(n) for storing distinct elements

---

### Approach 2: Sliding Window with AtMost Trick (Optimal)

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  We already know how to count "AT MOST K distinct" from previous problem!  │
│                                                                            │
│  Just reuse that function:                                                 │
│                                                                            │
│  function atMostK(nums, k):                                                │
│    // Sliding window: count subarrays with ≤ k distinct                   │
│    // For each right, count += (right - left + 1)                         │
│                                                                            │
│  function exactlyK(nums, k):                                               │
│    return atMostK(nums, k) - atMostK(nums, k-1)                           │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Algorithm:**
1. Implement `atMostK(nums, k)` using sliding window
2. Return `atMostK(nums, k) - atMostK(nums, k-1)`

**Time Complexity:** O(n) - two passes of O(n) each
**Space Complexity:** O(k) - hashmap with at most k+1 elements

---

## How atMostK Works (Review)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  for each right position:                                                  │
│    1. Add nums[right] to frequency map                                     │
│    2. While (map.size > k): shrink from left                              │
│    3. count += (right - left + 1)                                         │
│                                                                            │
│  WHY (right - left + 1)?                                                  │
│  ──────────────────────                                                   │
│  All subarrays ENDING at 'right' with distinct ≤ k:                       │
│  [left..right], [left+1..right], ..., [right..right]                      │
│  That's (right - left + 1) subarrays!                                     │
│                                                                            │
│  Example: nums = [1,2,1], k = 2, right = 2                                │
│  Window: [1,2,1] (indices 0-2), left = 0                                  │
│  Subarrays ending at index 2:                                             │
│  - [1,2,1] (start=0)                                                      │
│  - [2,1] (start=1)                                                        │
│  - [1] (start=2)                                                          │
│  count += 3 = (2 - 0 + 1)                                                 │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Complexity Comparison

| Approach | Time | Space | Difficulty |
|----------|------|-------|------------|
| Brute Force | O(n²) | O(n) | Easy |
| Sliding Window + AtMost Trick | O(n) | O(k) | Medium-Hard |

---

## Dry Run - Example 1

```
nums = [1, 2, 1, 2, 3], k = 2

═══════════════════════════════════════════════════════════════════════════════
CALL 1: atMostK(nums, 2)
═══════════════════════════════════════════════════════════════════════════════

left=0, count=0, map={}

right=0: nums[0]=1
  map={1:1}, size=1 ≤ 2 ✅
  count += 0-0+1 = 1
  Subarrays: [1]

right=1: nums[1]=2
  map={1:1, 2:1}, size=2 ≤ 2 ✅
  count += 1-0+1 = 2 → total=3
  Subarrays: [1,2], [2]

right=2: nums[2]=1
  map={1:2, 2:1}, size=2 ≤ 2 ✅
  count += 2-0+1 = 3 → total=6
  Subarrays: [1,2,1], [2,1], [1]

right=3: nums[3]=2
  map={1:2, 2:2}, size=2 ≤ 2 ✅
  count += 3-0+1 = 4 → total=10
  Subarrays: [1,2,1,2], [2,1,2], [1,2], [2]

right=4: nums[4]=3
  map={1:2, 2:2, 3:1}, size=3 > 2 ❌

  SHRINK:
  left=0: remove 1 → map={1:1, 2:2, 3:1}, size=3, left=1
  left=1: remove 2 → map={1:1, 2:1, 3:1}, size=3, left=2
  left=2: remove 1 → map={2:1, 3:1}, size=2 ≤ 2 ✅, left=3

  count += 4-3+1 = 2 → total=12
  Subarrays: [2,3], [3]

atMostK(nums, 2) = 12

═══════════════════════════════════════════════════════════════════════════════
CALL 2: atMostK(nums, 1)
═══════════════════════════════════════════════════════════════════════════════

left=0, count=0, map={}

right=0: nums[0]=1
  map={1:1}, size=1 ≤ 1 ✅
  count += 1 → total=1

right=1: nums[1]=2
  map={1:1, 2:1}, size=2 > 1 ❌
  SHRINK: remove 1 → map={2:1}, left=1
  count += 1 → total=2

right=2: nums[2]=1
  map={2:1, 1:1}, size=2 > 1 ❌
  SHRINK: remove 2 → map={1:1}, left=2
  count += 1 → total=3

right=3: nums[3]=2
  map={1:1, 2:1}, size=2 > 1 ❌
  SHRINK: remove 1 → map={2:1}, left=3
  count += 1 → total=4

right=4: nums[4]=3
  map={2:1, 3:1}, size=2 > 1 ❌
  SHRINK: remove 2 → map={3:1}, left=4
  count += 1 → total=5

atMostK(nums, 1) = 5

═══════════════════════════════════════════════════════════════════════════════
FINAL: exactlyK(2) = atMostK(2) - atMostK(1) = 12 - 5 = 7 ✅
═══════════════════════════════════════════════════════════════════════════════
```

---

## Key Insights

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  1. "EXACTLY K" TRICK:                                                     │
│     exactly(K) = atMost(K) - atMost(K-1)                                  │
│     This pattern applies to many problems!                                 │
│                                                                            │
│  2. WHY IT WORKS:                                                          │
│     - atMost(K) includes all subarrays with 1,2,...,K distinct            │
│     - atMost(K-1) includes all subarrays with 1,2,...,K-1 distinct        │
│     - Subtracting leaves ONLY those with exactly K distinct               │
│                                                                            │
│  3. REUSABLE PATTERN:                                                      │
│     Same trick used in:                                                    │
│     - Binary Subarrays with Sum (exactly K ones)                          │
│     - Count Nice Subarrays (exactly K odd numbers)                        │
│     - This problem (exactly K distinct)                                   │
│                                                                            │
│  4. TIME COMPLEXITY:                                                       │
│     Two O(n) passes = O(n) total                                          │
│     Each element visited at most 4 times (2 passes × 2 pointers)          │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Interview Tips

**What to say:**
> "Counting exactly K distinct is tricky with standard sliding window. But I can use the identity: exactly(K) = atMost(K) - atMost(K-1). This converts the problem to two easier sliding window problems that count subarrays with at most K distinct elements."

**Follow-up Questions:**
1. **"Why can't we use standard sliding window for exactly K?"**
   - Window can become invalid from both sides (too many OR too few distinct)
   - Hard to track all valid windows efficiently

2. **"Can you do it in one pass?"**
   - Yes, but more complex (need to track "prefix" count differently)
   - Two-pass solution is cleaner and same time complexity

---

## Which approach do you want to see?

1. **Brute Force** - O(n²) time, O(n) space
2. **Sliding Window + AtMost Trick** - O(n) time, O(k) space (RECOMMENDED!)