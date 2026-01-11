# Stock Span Problem

**Difficulty:** Medium
**Topics:** Stack, Monotonic Stack, Array
**Similar LeetCode:** [901. Online Stock Span](https://leetcode.com/problems/online-stock-span/)

---

## Problem Statement (Simple Language Mein)

Tumhe ek array `arr` diya hai jismein har element `arr[i]` day `i` ka stock price represent karta hai.

**Task:** Har day ke liye stock span calculate karo.

**Span Definition:**
Day `i` ka span = Maximum consecutive previous days (including current day) jahan stock price <= day `i` ka price tha.

---

## Examples:

### Example 1:
```
Input: arr = [120, 100, 60, 80, 90, 110, 115]

Day-by-day analysis:

Day 0 (price=120):
  No previous days
  Span = 1 (just itself)

Day 1 (price=100):
  100 < 120 (day 0)
  Can't go further back
  Span = 1

Day 2 (price=60):
  60 < 100 (day 1)
  Can't go further back
  Span = 1

Day 3 (price=80):
  80 > 60 (day 2) ✓
  80 < 100 (day 1) ✗
  Span = 2 (days 2, 3)

Day 4 (price=90):
  90 > 80 (day 3) ✓
  90 > 60 (day 2) ✓
  90 < 100 (day 1) ✗
  Span = 3 (days 2, 3, 4)

Day 5 (price=110):
  110 > 90 (day 4) ✓
  110 > 80 (day 3) ✓
  110 > 60 (day 2) ✓
  110 > 100 (day 1) ✓
  110 < 120 (day 0) ✗
  Span = 5 (days 1, 2, 3, 4, 5)

Day 6 (price=115):
  115 > 110 (day 5) ✓
  115 > 90 (day 4) ✓
  115 > 80 (day 3) ✓
  115 > 60 (day 2) ✓
  115 > 100 (day 1) ✓
  115 < 120 (day 0) ✗
  Span = 6 (days 1, 2, 3, 4, 5, 6)

Output: [1, 1, 1, 2, 3, 5, 6]
```

### Visual:
```
Price
  ↑
120│ ●─────────────────────────────────  (blocks all)
   │
115│                               ●
110│                         ●
100│     ●───────────────────────────  (blocks 60,80,90)
 90│                   ●
 80│             ●
 60│       ●
   └──────────────────────────────────→ Day
       0   1   2   3   4   5   6

Span:  1   1   1   2   3   5   6
```

### Example 2:
```
Input: arr = [15, 13, 12, 14, 16, 20]

Day 0 (15): No previous → Span = 1
Day 1 (13): 13 < 15 → Span = 1
Day 2 (12): 12 < 13 → Span = 1
Day 3 (14): 14 > 12, 13; 14 < 15 → Span = 3
Day 4 (16): 16 > 14, 12, 13, 15 → Span = 5
Day 5 (20): 20 > all → Span = 6

Output: [1, 1, 1, 3, 5, 6]
```

---

## Constraints:
- `1 <= n <= 10^5`
- `1 <= arr[i] <= 10^5`

---

## Key Insight! 🔑

**The span is related to Previous Greater Element (PGE)!**

```
Span[i] = i - index of PGE[i]

If no PGE exists (no larger element to left):
  Span[i] = i + 1 (all previous days + current)
```

### Why?

```
arr = [120, 100, 60, 80, 90, 110, 115]
             ↑               ↑
           PGE              i=5

For day 5 (price=110):
  PGE is day 0 (price=120)

  All days between PGE and current have price <= 110
  Span = i - PGE_index = 5 - 0 = 5 ✓
```

### Connection to Monotonic Stack:

```
┌─────────────────────────────────────────────────────────────┐
│  PGE (Previous Greater Element):                            │
│                                                             │
│  Use Monotonic DECREASING Stack                             │
│  Pop condition: stack.top <= current                        │
│  Stack top after pops = PGE                                 │
│                                                             │
│  Span = i - PGE_index                                       │
│       = i - stack.top  (if stack not empty)                 │
│       = i + 1          (if stack empty)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- **Previous Greater Element (PGE)** concept
- **Monotonic Stack** - Decreasing stack for PGE

---

## Approach 1: Brute Force

### Intuition:
For each day, look back and count consecutive days with smaller or equal prices.

### Algorithm:
```
for each day i:
    count = 1  // current day
    j = i - 1
    while j >= 0 and arr[j] <= arr[i]:
        count++
        j--
    span[i] = count
```

### Dry Run:
```
arr = [120, 100, 60, 80, 90, 110, 115]

i=0: No previous days → span[0] = 1
i=1: 100 < 120? No → span[1] = 1
i=2: 60 < 100? No → span[2] = 1
i=3: 80 > 60? Yes, count=2; 80 < 100? No → span[3] = 2
i=4: 90 > 80? Yes; 90 > 60? Yes, count=3; 90 < 100? No → span[4] = 3
i=5: 110 > 90,80,60,100? Yes, count=5; 110 < 120? No → span[5] = 5
i=6: 115 > 110,90,80,60,100? Yes, count=6; 115 < 120? No → span[6] = 6

Output: [1, 1, 1, 2, 3, 5, 6] ✓
```

### Complexity:
- **Time:** O(n²) - For each day, potentially scan all previous days
- **Space:** O(1)

**Result:** ❌ TLE for large inputs

---

## Approach 2: Optimal (Monotonic Decreasing Stack)

### Intuition:

**Key Observation:**
Span[i] = i - index of Previous Greater Element (PGE)

**Why Monotonic Decreasing Stack?**
- Stack stores indices of "potential PGE candidates"
- Pop elements with smaller or equal prices (they can't be PGE for future elements)
- Stack top = PGE for current element

### Algorithm:

```typescript
function stockSpan(arr: number[]): number[] {
    const n = arr.length;
    const span: number[] = [];
    const stack: number[] = [];  // stores indices

    for (let i = 0; i < n; i++) {
        // Pop elements with price <= current price
        // They can't be PGE for current or future elements
        while (stack.length > 0 && arr[stack[stack.length - 1]] <= arr[i]) {
            stack.pop();
        }

        // Calculate span
        if (stack.length === 0) {
            // No PGE → all previous days have smaller price
            span.push(i + 1);
        } else {
            // Stack top is PGE
            span.push(i - stack[stack.length - 1]);
        }

        // Push current index
        stack.push(i);
    }

    return span;
}
```

### Why Pop When `arr[stack.top] <= arr[i]`?

```
If stack top has smaller or equal price than current:
  - It can't be PGE for current element
  - It can't be PGE for any FUTURE element either!
    (because current element is >= and closer)

So we safely pop it.
```

### Detailed Dry Run:

```
arr = [120, 100, 60, 80, 90, 110, 115]
         0    1   2   3   4    5    6

Stack stores INDICES (to calculate span)
Stack maintains DECREASING order of prices

═══════════════════════════════════════════════════════════════
i = 0, price = 120
═══════════════════════════════════════════════════════════════
Stack: []

Pop condition: Nothing to pop (empty)

Span: Stack empty → span = i + 1 = 0 + 1 = 1

Push 0 → Stack: [0]
         prices: [120]

span = [1]

═══════════════════════════════════════════════════════════════
i = 1, price = 100
═══════════════════════════════════════════════════════════════
Stack: [0]  (prices: [120])

Pop condition: arr[0]=120 <= 100? NO
               120 > 100, don't pop

Span: Stack not empty → span = i - stack.top = 1 - 0 = 1

Push 1 → Stack: [0, 1]
         prices: [120, 100]

span = [1, 1]

═══════════════════════════════════════════════════════════════
i = 2, price = 60
═══════════════════════════════════════════════════════════════
Stack: [0, 1]  (prices: [120, 100])

Pop condition: arr[1]=100 <= 60? NO
               100 > 60, don't pop

Span: span = i - stack.top = 2 - 1 = 1

Push 2 → Stack: [0, 1, 2]
         prices: [120, 100, 60]

span = [1, 1, 1]

═══════════════════════════════════════════════════════════════
i = 3, price = 80
═══════════════════════════════════════════════════════════════
Stack: [0, 1, 2]  (prices: [120, 100, 60])

Pop condition: arr[2]=60 <= 80? YES! Pop 2
Stack: [0, 1]

Pop condition: arr[1]=100 <= 80? NO
               100 > 80, stop

Span: span = i - stack.top = 3 - 1 = 2

Push 3 → Stack: [0, 1, 3]
         prices: [120, 100, 80]

span = [1, 1, 1, 2]

═══════════════════════════════════════════════════════════════
i = 4, price = 90
═══════════════════════════════════════════════════════════════
Stack: [0, 1, 3]  (prices: [120, 100, 80])

Pop condition: arr[3]=80 <= 90? YES! Pop 3
Stack: [0, 1]

Pop condition: arr[1]=100 <= 90? NO
               100 > 90, stop

Span: span = i - stack.top = 4 - 1 = 3

Push 4 → Stack: [0, 1, 4]
         prices: [120, 100, 90]

span = [1, 1, 1, 2, 3]

═══════════════════════════════════════════════════════════════
i = 5, price = 110
═══════════════════════════════════════════════════════════════
Stack: [0, 1, 4]  (prices: [120, 100, 90])

Pop condition: arr[4]=90 <= 110? YES! Pop 4
Stack: [0, 1]

Pop condition: arr[1]=100 <= 110? YES! Pop 1
Stack: [0]

Pop condition: arr[0]=120 <= 110? NO
               120 > 110, stop

Span: span = i - stack.top = 5 - 0 = 5

Push 5 → Stack: [0, 5]
         prices: [120, 110]

span = [1, 1, 1, 2, 3, 5]

═══════════════════════════════════════════════════════════════
i = 6, price = 115
═══════════════════════════════════════════════════════════════
Stack: [0, 5]  (prices: [120, 110])

Pop condition: arr[5]=110 <= 115? YES! Pop 5
Stack: [0]

Pop condition: arr[0]=120 <= 115? NO
               120 > 115, stop

Span: span = i - stack.top = 6 - 0 = 6

Push 6 → Stack: [0, 6]
         prices: [120, 115]

span = [1, 1, 1, 2, 3, 5, 6]

═══════════════════════════════════════════════════════════════
FINAL OUTPUT: [1, 1, 1, 2, 3, 5, 6] ✓
═══════════════════════════════════════════════════════════════
```

### Why It Works (Visual):

```
Think of stack as maintaining "walls" that block the span:

Price
  ↑
120│ █─────────────────────────────────  (Wall: blocks all)
   │
115│                               ○ (span=6, blocked by 120)
110│                         ○ (span=5, blocked by 120)
100│     █ (popped when 110 came)
 90│                   ○ (span=3, blocked by 100)
 80│             ○ (span=2, blocked by 100)
 60│       ○ (span=1, blocked by 100)
   └──────────────────────────────────→ Day

Stack always has "walls" in decreasing order.
When a taller wall comes, shorter walls are useless (popped).
```

### Complexity:

**Time Complexity:** O(n)
- Each element is pushed once and popped at most once
- Total operations: O(2n) = O(n)

**Space Complexity:** O(n)
- Stack can have at most n elements

---

## Why Does This Algorithm Work?

### The Core Idea:

```
Stack maintains "walls" (potential PGE candidates) in DECREASING order.

When we process element i:
1. Pop all walls that are <= current price (they can't block current or future)
2. The remaining wall (stack top) is the PGE
3. Span = distance from PGE to current
```

### Why Popping is Safe?

**Common Doubt:**
```
arr = [120, 100, 60, 80, 50]

At i=3 (price=80): We pop 60
At i=4 (price=50): We never check 60!

Is this correct? YES!
```

**Explanation:**

```
When we pop 60 while processing 80, we're saying:
"60 can NEVER be PGE for any FUTURE element"

Why is this true?

┌─────────────────────────────────────────────────────────────┐
│ Case 1: Future element < 80                                 │
│                                                             │
│   → Blocked by 80 first!                                    │
│   → Will never even reach 60                                │
│   → Example: 50 < 80, so 50's PGE is 80, not 60            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Case 2: Future element >= 80                                │
│                                                             │
│   → Will pop 80 first                                       │
│   → Since element >= 80 > 60, would pop 60 too anyway      │
│   → 60 is irrelevant                                        │
│   → Example: 90 would pop both 80 and 60                   │
└─────────────────────────────────────────────────────────────┘

In BOTH cases, 60 is not needed for any future element!
```

### Visual Proof:

```
arr = [120, 100, 60, 80, 50]

Price
  ↑
120│ █
100│     █
 80│              █ ← This wall blocks 50
 60│         █ (behind 80, irrelevant for 50)
 50│                   ○ (span=1, blocked by 80)
   └───────────────────────→ Day
       0    1    2    3    4

For element 50:
- 50 < 80 → BLOCKED by 80!
- Can't reach 60 anyway
- PGE = 80, span = 4 - 3 = 1 ✓
```

### The Key Insight:

```
When a new "wall" (element) comes:
- All shorter walls behind it become INVISIBLE to future elements
- Future elements must pass the new wall first
- If they can pass, they would pass the shorter ones too
- If they can't pass, they stop at the new wall

So shorter walls can be safely removed (popped)!
```

### Another Example:

```
arr = [120, 100, 60, 80, 90]

At i=3 (80): pops 60
At i=4 (90): pops 80

Stack after 90: [0, 1, 4] → prices: [120, 100, 90]

For 90:
- PGE = 100 (at index 1)
- span = 4 - 1 = 3

Manual verification:
- 90 > 80 > 60, and 90 < 100
- Days with price <= 90: indices 2, 3, 4
- span = 3 ✓

Notice: We never checked 60, but answer is still correct!
Because 60 is "behind" 80, which is "behind" 90.
```

### Summary: Why Monotonic Stack Works

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Stack maintains DECREASING order of prices               │
│    → Each element is a "wall" that could block future spans │
│                                                             │
│ 2. When new element comes, pop smaller/equal walls          │
│    → They can never be PGE for current or future elements  │
│    → New element is taller AND closer to future             │
│                                                             │
│ 3. Stack top after pops = PGE (first greater to left)      │
│    → All elements between PGE and current are smaller      │
│    → Span = current index - PGE index                       │
│                                                             │
│ 4. Each element pushed once, popped at most once            │
│    → Total O(n) operations, not O(n²)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Comparison Table

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Brute Force** | O(n²) | O(1) | For each day, scan all previous |
| **Monotonic Stack** | O(n) | O(n) | Use PGE concept |

---

## Connection to Other Problems

```
┌─────────────────────────────────────────────────────────────┐
│  Stock Span = Current Index - PGE Index                     │
│                                                             │
│  Similar problems:                                          │
│  - Next Greater Element (NGE)                               │
│  - Previous Greater Element (PGE)                           │
│  - Daily Temperatures                                        │
│  - Largest Rectangle in Histogram                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Edge Cases

1. **All increasing:** [1, 2, 3, 4, 5] → [1, 2, 3, 4, 5]
2. **All decreasing:** [5, 4, 3, 2, 1] → [1, 1, 1, 1, 1]
3. **All same:** [3, 3, 3, 3] → [1, 2, 3, 4]
4. **Single element:** [10] → [1]
5. **Two elements:** [5, 10] → [1, 2]

---

## Related Problems:

- **901. Online Stock Span** (Medium) - Same problem, online version
- **739. Daily Temperatures** (Medium) - Similar monotonic stack
- **84. Largest Rectangle in Histogram** (Hard) - Uses PLE/NLE
- **503. Next Greater Element II** (Medium) - Circular array

---

**Konsa approach dekhna hai? Brute Force ya Optimal (Monotonic Stack)?** 🎯