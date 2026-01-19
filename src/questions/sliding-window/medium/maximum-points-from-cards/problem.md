# Maximum Points You Can Obtain from Cards

## Problem Statement

Given N cards arranged in a row, each card has an associated score denoted by the `cardScore` array. Choose exactly `k` cards. In each step, a card can be chosen either from the **beginning** or the **end** of the row. The score is the sum of the scores of the chosen cards.

Find the **maximum score** you can obtain.

## Examples

### Example 1:
```
Input: cardScore = [1, 2, 3, 4, 5, 6], k = 3
Output: 15
Explanation: Choosing the rightmost cards will maximize your total score.
Optimal cards: 4, 5, 6 (all from right)
Score = 4 + 5 + 6 = 15
```

### Example 2:
```
Input: cardScore = [5, 4, 1, 8, 7, 1, 3], k = 3
Output: 12
Explanation:
- Step 1: Choose card from beginning (5)
- Step 2: Choose card from beginning again (4)
- Step 3: Choose card from end (3)
Score = 5 + 4 + 3 = 12
```

### Example 3:
```
Input: cardScore = [9, 7, 7, 9, 7, 7, 9], k = 7
Output: 55
Explanation: All cards must be taken (k = n)
Score = 9 + 7 + 7 + 9 + 7 + 7 + 9 = 55
```

### Example 4:
```
Input: cardScore = [100, 40, 17, 9, 73, 75], k = 3
Output: 248
Explanation: Take 100 from left, then 75 and 73 from right
Score = 100 + 75 + 73 = 248
```

## Constraints
- `1 <= cardScore.length <= 10^5`
- `1 <= cardScore[i] <= 10^4`
- `1 <= k <= cardScore.length`

---

## Key Observation - REVERSE THINKING!

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  DIRECT APPROACH (Hard):                                                   │
│  - Pick k cards from left OR right                                         │
│  - Many combinations to consider!                                          │
│  - Example: k=3 → (0L,3R), (1L,2R), (2L,1R), (3L,0R)                       │
│                                                                            │
│  REVERSE THINKING (Brilliant!):                                            │
│  - Instead of picking k cards, think about LEAVING (n-k) cards!            │
│  - The cards we LEAVE must form a CONTIGUOUS subarray in the middle!       │
│  - Why? Because we can only pick from ends!                                │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  [1, 2, 3, 4, 5, 6]    k=3, n=6, leave (n-k)=3 cards                │  │
│  │                                                                     │  │
│  │  If we pick: [1, 2, _, _, _, 6]  (2 left, 1 right)                 │  │
│  │  We leave:   [_, _, 3, 4, 5, _]  (contiguous middle!)              │  │
│  │                                                                     │  │
│  │  If we pick: [_, _, _, 4, 5, 6]  (0 left, 3 right)                 │  │
│  │  We leave:   [1, 2, 3, _, _, _]  (contiguous start!)               │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  KEY INSIGHT:                                                              │
│  - Maximize SUM of picked cards = Total SUM - SUM of left cards            │
│  - To MAXIMIZE picked = MINIMIZE unpicked (the middle window)!             │
│  - Find minimum sum subarray of size (n-k)!                                │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Visual Proof:

```
Cards:    [5, 4, 1, 8, 7, 1, 3]     n=7, k=3
           ↑  ↑              ↑
          pick pick       pick

We LEAVE a window of size (n-k) = 4 in the middle:

Option 1: Leave [4, 1, 8, 7] → Pick [5] + [1, 3] = 5+1+3 = 9
Option 2: Leave [1, 8, 7, 1] → Pick [5, 4] + [3] = 5+4+3 = 12 ✅
Option 3: Leave [8, 7, 1, 3] → Pick [5, 4, 1] = 10
Option 4: Leave [5, 4, 1, 8] → Pick [7, 1, 3] = 11

Total sum = 29
Best: Total - min(leave window) = 29 - 17 = 12 ✅
```

---

## Approaches

### Approach 1: Brute Force (Recursion)

**Intuition (Soch):**
- At each step, we have 2 choices: pick from left or pick from right
- Try all combinations using recursion
- Track maximum sum achieved

**Algorithm:**
1. Use recursion with parameters: left index, right index, remaining picks
2. Base case: remaining = 0, return 0
3. Try both options: pick left or pick right
4. Return max of both choices

**Time Complexity:** O(2^k) - exponential, TLE for large k
**Space Complexity:** O(k) - recursion stack

---

### Approach 2: Sliding Window on Two Ends (Simulation)

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  If we pick k cards total, possible splits:                                │
│  - 0 from left, k from right                                               │
│  - 1 from left, (k-1) from right                                           │
│  - 2 from left, (k-2) from right                                           │
│  - ...                                                                     │
│  - k from left, 0 from right                                               │
│                                                                            │
│  Only (k+1) combinations! Much better than 2^k!                            │
│                                                                            │
│  Algorithm:                                                                │
│  1. Start with all k cards from right (rightSum)                           │
│  2. Gradually shift: remove one from right, add one from left              │
│  3. Track maximum sum at each step                                         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Visual:**
```
cardScore = [5, 4, 1, 8, 7, 1, 3]    k = 3

Step 0: 0 left, 3 right → [_, _, _, _, 7, 1, 3] = 11
Step 1: 1 left, 2 right → [5, _, _, _, _, 1, 3] = 9
Step 2: 2 left, 1 right → [5, 4, _, _, _, _, 3] = 12 ✅
Step 3: 3 left, 0 right → [5, 4, 1, _, _, _, _] = 10

Maximum = 12
```

**Time Complexity:** O(k)
**Space Complexity:** O(1)

---

### Approach 3: Sliding Window - Minimum Middle Window (Reverse Thinking)

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  REVERSE THINKING (Most Elegant!)                                          │
│                                                                            │
│  Instead of maximizing k picked cards:                                     │
│  → Minimize (n-k) unpicked cards in the middle!                            │
│                                                                            │
│  max(picked) = totalSum - min(unpicked window of size n-k)                 │
│                                                                            │
│  Standard sliding window for minimum sum!                                  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Algorithm:**
1. Calculate total sum of all cards
2. Window size = n - k (cards we leave)
3. Find minimum sum window of size (n - k)
4. Answer = totalSum - minWindowSum

**Special Case:** If k = n, window size = 0, answer = totalSum

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Complexity Comparison

| Approach | Time | Space | Difficulty | Notes |
|----------|------|-------|------------|-------|
| Brute Force (Recursion) | O(2^k) | O(k) | Easy | TLE |
| Two-End Simulation | O(k) | O(1) | Medium | Direct approach |
| Min Window (Reverse) | O(n) | O(1) | Medium | Most elegant! |

**Note:** Approach 2 is O(k) and Approach 3 is O(n). When k is small, Approach 2 is faster. When k is close to n, they're similar. Both are optimal!

---

## Dry Run - Example 2

```
cardScore = [5, 4, 1, 8, 7, 1, 3]    k = 3, n = 7

═══════════════════════════════════════════════════════════════════════════════
APPROACH 2: Two-End Simulation
═══════════════════════════════════════════════════════════════════════════════

Step 0: Take 0 from left, 3 from right
        Indices: [_, _, _, _, 4, 5, 6]
        Sum = 7 + 1 + 3 = 11
        maxScore = 11

Step 1: Take 1 from left, 2 from right
        Remove cardScore[4]=7 from right
        Add cardScore[0]=5 from left
        Sum = 11 - 7 + 5 = 9
        maxScore = max(11, 9) = 11

Step 2: Take 2 from left, 1 from right
        Remove cardScore[5]=1 from right
        Add cardScore[1]=4 from left
        Sum = 9 - 1 + 4 = 12
        maxScore = max(11, 12) = 12 ✅

Step 3: Take 3 from left, 0 from right
        Remove cardScore[6]=3 from right
        Add cardScore[2]=1 from left
        Sum = 12 - 3 + 1 = 10
        maxScore = max(12, 10) = 12

Result: 12

═══════════════════════════════════════════════════════════════════════════════
APPROACH 3: Minimum Window (Reverse Thinking)
═══════════════════════════════════════════════════════════════════════════════

totalSum = 5 + 4 + 1 + 8 + 7 + 1 + 3 = 29
windowSize = n - k = 7 - 3 = 4

Find minimum sum window of size 4:

Window [0..3]: [5, 4, 1, 8] = 18
Window [1..4]: [4, 1, 8, 7] = 20
Window [2..5]: [1, 8, 7, 1] = 17 ← minimum!
Window [3..6]: [8, 7, 1, 3] = 19

minWindowSum = 17

Result = totalSum - minWindowSum = 29 - 17 = 12 ✅
```

---

## Key Insights

```
┌────────────────────────────────────────────────────────────────────────────┐
│  1. REVERSE THINKING:                                                      │
│     Can't pick from middle → middle forms contiguous unpicked window       │
│     Maximize picked = Total - Minimize unpicked                            │
│                                                                            │
│  2. TWO APPROACHES, BOTH OPTIMAL:                                          │
│     - Simulate: Try all (k+1) left-right splits                            │
│     - Reverse: Find min sum window of size (n-k)                           │
│                                                                            │
│  3. EDGE CASE:                                                             │
│     If k = n, take all cards → answer = sum of all                         │
│                                                                            │
│  4. PATTERN RECOGNITION:                                                   │
│     "Pick from ends" → "Leave contiguous middle"                           │
│     This pattern appears in many problems!                                 │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Interview Tips

**What to say:**
> "Since we can only pick from the ends, the cards we DON'T pick must form a contiguous subarray in the middle. So instead of maximizing picked cards, I can minimize the unpicked middle window. This converts to a standard sliding window problem!"

**Follow-up Questions:**
1. **"What if we could pick from any position?"**
   - Sort and pick top k cards, O(n log n)

2. **"What if there's a cost to pick from left vs right?"**
   - Dynamic Programming approach needed

3. **"What's the time complexity comparison?"**
   - Two-End: O(k), Reverse: O(n)
   - Both are optimal, choice depends on k vs n relationship

---

## Which approach do you want to see?

1. **Brute Force (Recursion)** - O(2^k) time, O(k) space
2. **Two-End Simulation** - O(k) time, O(1) space
3. **Minimum Window (Reverse Thinking)** - O(n) time, O(1) space (RECOMMENDED!)