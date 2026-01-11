# Fruit Into Baskets

## Problem Statement

You have a row of fruit trees represented by an integer array `fruits`, where `fruits[i]` is the type of fruit the `i`th tree produces.

**Rules:**
- You have **2 baskets**
- Each basket can hold only **one type** of fruit (unlimited quantity)
- Start at any tree, pick one fruit from each tree moving right
- Stop when you reach a fruit that doesn't fit in either basket

**Return:** Maximum number of fruits you can pick.

**Example 1:**
```
Input: fruits = [1, 2, 1]
Output: 3
Explanation: Pick all 3 fruits.
  - Basket 1: Type 1 (from tree 0 and 2)
  - Basket 2: Type 2 (from tree 1)
```

**Example 2:**
```
Input: fruits = [1, 2, 3, 2, 2]
Output: 4
Explanation: Start from tree 1.
  - Basket 1: Type 2 (from tree 1, 3, 4)
  - Basket 2: Type 3 (from tree 2)
  Total: 4 fruits
```

**Example 3:**
```
Input: fruits = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]
Output: 5
Explanation: Start from tree 3.
  - Trees: [1, 2, 1, 1, 2] = 5 fruits (types 1 and 2)
```

**Constraints:**
- `1 <= fruits.length <= 10^5`
- `0 <= fruits[i] < fruits.length`

---

## 🧠 Problem Samajhte Hain (Understanding)

### Real-Life Analogy

Imagine you're walking through an orchard with 2 baskets:
- Basket 1: Can only hold apples 🍎
- Basket 2: Can only hold oranges 🍊

Once you put a fruit type in a basket, that basket is "locked" to that type.

```
Trees: 🍎 🍊 🍎 🍇 🍇 🍊

Walk 1: Start at tree 0
  Pick 🍎 → Basket 1 = {🍎}
  Pick 🍊 → Basket 2 = {🍊}
  Pick 🍎 → Basket 1 ✅
  Pick 🍇 → No basket available! STOP
  Total: 3 fruits

Walk 2: Start at tree 3
  Pick 🍇 → Basket 1 = {🍇}
  Pick 🍇 → Basket 1 ✅
  Pick 🍊 → Basket 2 = {🍊}
  Total: 3 fruits

Best: 3 fruits
```

### 🔑 Key Insight: Reframe the Problem!

```
┌─────────────────────────────────────────────────────────────┐
│  ORIGINAL: "Pick fruits with 2 baskets"                     │
│                                                             │
│  REFRAME:  "Find longest subarray with AT MOST 2 distinct   │
│             element types"                                  │
│                                                             │
│  WHY? 2 baskets = 2 types allowed in our window!            │
└─────────────────────────────────────────────────────────────┘
```

This is exactly like:
- **Max Consecutive Ones III**: Longest subarray with at most k zeros
- **Longest Substring with K Distinct Characters**: Longest substring with at most k unique chars

---

## 📊 Approaches Overview

| Approach | Time | Space | Technique |
|----------|------|-------|-----------|
| Brute Force | O(n²) | O(1) | Check all subarrays |
| Sliding Window + HashMap | O(n) | O(1) | Track fruit types in window |

Note: Space is O(1) because we have at most 3 distinct types in HashMap at any time.

---

## Approach 1: Brute Force

### Intuition (Soch)

Check every possible starting position:
1. For each start, keep picking fruits
2. Stop when we encounter a 3rd type
3. Track maximum fruits collected

### Pseudo Code

```
function bruteForce(fruits):
    maxFruits = 0

    for i = 0 to n-1:
        basket = new Set()

        for j = i to n-1:
            basket.add(fruits[j])

            if basket.size <= 2:
                maxFruits = max(maxFruits, j - i + 1)
            else:
                break  // 3rd type found, can't continue

    return maxFruits
```

### Time Complexity: O(n²)

---

## Approach 2: Sliding Window + HashMap (Optimal)

### Prerequisites

- **Sliding Window Technique**: Two pointers maintaining a "window"
- **HashMap**: Track count of each fruit type in window

### Intuition (Soch)

**Pattern Recognition:**
```
Max Consecutive Ones III:  "Longest subarray with at most k ZEROS"
Fruit Into Baskets:        "Longest subarray with at most 2 TYPES"

Same pattern! Just different constraint.
```

**Sliding Window Logic:**
1. **Expand** window by moving `right` pointer
2. Add fruit type to HashMap (track count)
3. If types > 2, **shrink** window from left until valid
4. Track maximum window size

### Why HashMap?

```
We need to track:
1. How many DISTINCT types are in window? → map.size
2. When shrinking, should we remove a type completely? → map.get(type) === 0

HashMap: { fruitType → count }

Example window: [1, 2, 1, 2, 1]
HashMap: { 1: 3, 2: 2 }
map.size = 2 → Valid! (≤2 types)
```

### Visual Dry Run

```
fruits = [1, 2, 3, 2, 2], k = 2 baskets
          0  1  2  3  4

Initial: left = 0, maxLen = 0, map = {}

═══════════════════════════════════════════════════════════
right = 0, fruits[0] = 1
  EXPAND: map = {1: 1}
  Types: 1 (map.size = 1) ≤ 2 ✅
  maxLen = max(0, 0-0+1) = 1

  Window: [1] 2 3 2 2
           L
           R

═══════════════════════════════════════════════════════════
right = 1, fruits[1] = 2
  EXPAND: map = {1: 1, 2: 1}
  Types: 2 ≤ 2 ✅
  maxLen = max(1, 1-0+1) = 2

  Window: [1 2] 3 2 2
           L R

═══════════════════════════════════════════════════════════
right = 2, fruits[2] = 3
  EXPAND: map = {1: 1, 2: 1, 3: 1}
  Types: 3 > 2 ❌ Must shrink!

  SHRINK:
    Remove fruits[left=0] = 1
    map[1] = 1 - 1 = 0 → delete from map
    map = {2: 1, 3: 1}
    left = 1
    Types: 2 ≤ 2 ✅ Stop shrinking

  maxLen = max(2, 2-1+1) = 2

  Window: 1 [2 3] 2 2
             L R

═══════════════════════════════════════════════════════════
right = 3, fruits[3] = 2
  EXPAND: map = {2: 2, 3: 1}
  Types: 2 ≤ 2 ✅
  maxLen = max(2, 3-1+1) = 3

  Window: 1 [2 3 2] 2
             L   R

═══════════════════════════════════════════════════════════
right = 4, fruits[4] = 2
  EXPAND: map = {2: 3, 3: 1}
  Types: 2 ≤ 2 ✅
  maxLen = max(3, 4-1+1) = 4 ⭐

  Window: 1 [2 3 2 2]
             L     R

═══════════════════════════════════════════════════════════
DONE! Answer: 4

Best window: [2, 3, 2, 2] = 4 fruits of 2 types
```

### Algorithm

```
function totalFruit(fruits):
    map = new HashMap()  // fruitType → count
    left = 0
    maxLength = 0

    for right = 0 to n-1:
        // EXPAND: Add current fruit to map
        map[fruits[right]]++

        // SHRINK: While more than 2 types
        while map.size > 2:
            map[fruits[left]]--
            if map[fruits[left]] == 0:
                delete map[fruits[left]]
            left++

        // UPDATE: Track maximum window
        maxLength = max(maxLength, right - left + 1)

    return maxLength
```

### Time & Space Complexity

**Time: O(n)**
- Each element visited at most twice (once by right, once by left)

**Space: O(1)**
- HashMap has at most 3 entries at any time
- We shrink as soon as we have 3 types

---

## 🔄 Pattern: "At Most K Distinct Elements"

```
┌─────────────────────────────────────────────────────────────┐
│  PATTERN: Longest Subarray with At Most K Distinct          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  for right = 0 to n-1:                                      │
│      Add element to HashMap (increment count)               │
│                                                             │
│      while map.size > K:                                    │
│          Remove element from left (decrement count)         │
│          If count becomes 0, delete from map                │
│          left++                                             │
│                                                             │
│      maxLength = max(maxLength, right - left + 1)           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Similar Problems:                                          │
│  • Longest Substring with K Distinct Characters             │
│  • Fruit Into Baskets (K = 2)                               │
│  • Subarrays with K Different Integers                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎤 Interview Tips

### What to Say to Interviewer

1. **Recognize the pattern:**
   - "This is finding the longest subarray with at most 2 distinct types"
   - "Classic sliding window with HashMap to track types"

2. **Explain approach:**
   - "I'll use sliding window - expand right, shrink when >2 types"
   - "HashMap tracks count of each type in current window"

3. **Edge cases to mention:**
   - "What if all fruits are same type? Answer is entire array"
   - "What if array length is 1 or 2? Always valid"

### Common Follow-up Questions

**Q: What if we have K baskets instead of 2?**
A: Same algorithm! Just check `map.size > K` instead of `map.size > 2`.

**Q: What if we need to return the actual subarray?**
A: Track `startIndex` when updating `maxLength`. Return `fruits.slice(startIndex, startIndex + maxLength)`.

---

## Which Solution Do You Want to See?

1. **Brute Force** - O(n²) - Good for understanding
2. **Sliding Window + HashMap** - O(n) - Optimal solution

Let me know! 🚀