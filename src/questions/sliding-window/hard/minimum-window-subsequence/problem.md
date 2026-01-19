# Minimum Window Subsequence

## Problem Statement

Given strings `s1` and `s2`, return the **minimum contiguous substring** part of `s1`, so that `s2` is a **subsequence** of the part.

If there is no such window in `s1` that covers all characters in `s2`, return the empty string `""`.

If there are multiple such minimum-length windows, return the one with the **left-most starting index**.

## Examples

### Example 1:
```
Input: s1 = "abcdebdde", s2 = "bde"
Output: "bcde"
Explanation:
- "bcde" is the answer because it occurs before "bdde" which has the same length.
- "deb" is NOT valid because elements of s2 must occur IN ORDER.
```

### Example 2:
```
Input: s1 = "jmeqsiwvaovvnbstl", s2 = "u"
Output: ""
Explanation: 'u' doesn't exist in s1.
```

### Example 3:
```
Input: s1 = "fhhjkeejkdjjs", s2 = "jkj"
Output: "jkdj"
Explanation:
- "jkeej" (indices 3-7) works but length = 5
- "jkdj" (indices 7-10) works and length = 4 ⭐
```

## Constraints
- `1 <= s1.length <= 2 * 10^4`
- `1 <= s2.length <= 100`
- `s1` and `s2` consist of lowercase English letters

---

## Key Difference from "Minimum Window Substring"

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  MINIMUM WINDOW SUBSTRING:                                                 │
│  - Need all chars of t PRESENT in window                                   │
│  - ORDER DOESN'T MATTER                                                    │
│  - Example: s="ADOBEC", t="ABC" → Valid (A,B,C are present)               │
│                                                                            │
│  MINIMUM WINDOW SUBSEQUENCE:                                               │
│  - Need s2 as a SUBSEQUENCE of window                                      │
│  - ORDER MATTERS!                                                          │
│  - Example: s1="abcdebdde", s2="bde"                                      │
│    - "bcde" → b...d...e in order ✅                                       │
│    - "deb" → d,e,b NOT in order ❌                                        │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  SUBSEQUENCE = Characters appear in SAME ORDER (not contiguous)    │  │
│  │                                                                     │  │
│  │  "ace" is subsequence of "abcde"                                   │  │
│  │       a b c d e                                                     │  │
│  │       ↑   ↑   ↑                                                     │  │
│  │       a   c   e  ✅                                                 │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Approaches

### Approach 1: Brute Force

**Intuition (Soch):**
- Har possible starting position try karo
- Wahan se s2 ka subsequence dhundho (forward scan)
- Minimum window track karo

**Algorithm:**
1. For each starting index `i` in s1
2. Try to match s2 as subsequence starting from `i`
3. If found, record window length
4. Return minimum window

**Time Complexity:** O(m × n) - m starting positions, n to find subsequence
**Space Complexity:** O(1)

---

### Approach 2: Two Pointer - Forward & Backward (Optimal)

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  KEY INSIGHT: Forward finds A window, Backward MINIMIZES it!              │
│                                                                            │
│  PHASE 1 - FORWARD SCAN:                                                   │
│  ────────────────────────                                                  │
│  Find the END of a valid window where s2 is subsequence                   │
│                                                                            │
│  s1 = "abcdebdde", s2 = "bde"                                             │
│                                                                            │
│  a b c d e b d d e                                                         │
│    ↑   ↑ ↑                                                                 │
│    b   d e  → Found! Window ends at index 4                               │
│                                                                            │
│  PHASE 2 - BACKWARD SCAN:                                                  │
│  ─────────────────────────                                                 │
│  From the END, go backward to find the CLOSEST start!                     │
│                                                                            │
│  a b c d e ← Start from here, match s2 backward (e→d→b)                   │
│    ↑   ↑ ↑                                                                 │
│    b   d e  → Start at index 1, window = "bcde" (length 4)                │
│                                                                            │
│  WHY BACKWARD?                                                             │
│  Forward finds ANY valid window ending at a position                      │
│  Backward finds the SHORTEST window ending at that position!              │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Algorithm:**
1. Use pointer `i` for s1, `j` for s2
2. **FORWARD**: Move both when match, only `i` when no match
3. When `j` completes s2, we found a window ending at `i`
4. **BACKWARD**: From `i`, go backward matching s2 in reverse
5. This gives us the minimum window ending at `i`
6. Continue forward from next position after start
7. Track minimum across all windows

**Time Complexity:** O(m × n) worst case, but much better in practice
**Space Complexity:** O(1)

---

### Approach 3: Dynamic Programming

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  dp[i][j] = Starting index in s1 where we can match s2[0..j]              │
│             ending at or before s1[i]                                      │
│                                                                            │
│  For each position in s1:                                                  │
│  - If s1[i] == s2[j], we extend previous match                            │
│  - Track where each match STARTS                                          │
│                                                                            │
│  When j reaches end of s2:                                                 │
│  - We have a valid window from dp[i][n-1] to i                            │
│  - Track minimum                                                           │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n), can be optimized to O(n)

---

## Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Brute Force | O(m × n) | O(1) | Simple but slow |
| Two Pointer (Forward-Backward) | O(m × n) | O(1) | Fast in practice |
| Dynamic Programming | O(m × n) | O(n) | More complex |

---

## Visual Dry Run - Example 1

```
s1 = "abcdebdde", s2 = "bde"

═══════════════════════════════════════════════════════════════════════════════
FORWARD SCAN #1: Find first window
═══════════════════════════════════════════════════════════════════════════════

s1: a  b  c  d  e  b  d  d  e
    0  1  2  3  4  5  6  7  8
s2: b  d  e
    0  1  2

i=0: s1[0]='a' != s2[0]='b' → i++
i=1: s1[1]='b' == s2[0]='b' → i++, j++
i=2: s1[2]='c' != s2[1]='d' → i++
i=3: s1[3]='d' == s2[1]='d' → i++, j++
i=4: s1[4]='e' == s2[2]='e' → i++, j++

j=3 (completed s2!) → Window ends at i=4

═══════════════════════════════════════════════════════════════════════════════
BACKWARD SCAN #1: Minimize window ending at 4
═══════════════════════════════════════════════════════════════════════════════

Start from i=4, match s2 backward (e→d→b)

i=4: s1[4]='e' == s2[2]='e' → i--, j--
i=3: s1[3]='d' == s2[1]='d' → i--, j--
i=2: s1[2]='c' != s2[0]='b' → i--
i=1: s1[1]='b' == s2[0]='b' → DONE!

Window: s1[1..4] = "bcde", length = 4
minWindow = [4, 1, 4]

═══════════════════════════════════════════════════════════════════════════════
FORWARD SCAN #2: Continue from i=2 (after start)
═══════════════════════════════════════════════════════════════════════════════

Reset j=0, continue from i=2

i=2: s1[2]='c' != s2[0]='b' → i++
i=3: s1[3]='d' != s2[0]='b' → i++
i=4: s1[4]='e' != s2[0]='b' → i++
i=5: s1[5]='b' == s2[0]='b' → i++, j++
i=6: s1[6]='d' == s2[1]='d' → i++, j++
i=7: s1[7]='d' != s2[2]='e' → i++
i=8: s1[8]='e' == s2[2]='e' → i++, j++

j=3 (completed s2!) → Window ends at i=8

═══════════════════════════════════════════════════════════════════════════════
BACKWARD SCAN #2: Minimize window ending at 8
═══════════════════════════════════════════════════════════════════════════════

Start from i=8, match s2 backward (e→d→b)

i=8: s1[8]='e' == s2[2]='e' → i--, j--
i=7: s1[7]='d' == s2[1]='d' → i--, j--
i=6: s1[6]='d' != s2[0]='b' → i--
i=5: s1[5]='b' == s2[0]='b' → DONE!

Window: s1[5..8] = "bdde", length = 4
4 == 4 but start=5 > start=1, so don't update (we want leftmost)

═══════════════════════════════════════════════════════════════════════════════
Continue... i=9 > len, DONE!
═══════════════════════════════════════════════════════════════════════════════

RESULT: s1.substring(1, 5) = "bcde" ✅
```

---

## Key Insights

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  1. FORWARD-BACKWARD TRICK:                                                │
│     - Forward: Find ANY valid window (end position)                        │
│     - Backward: Find MINIMUM window ending there (start position)         │
│     - This is better than checking all starting positions!                │
│                                                                            │
│  2. WHY BACKWARD WORKS:                                                    │
│     - Going backward from end, we find the CLOSEST matching start        │
│     - This automatically gives minimum window for that end               │
│                                                                            │
│  3. CONTINUE FROM start+1:                                                 │
│     - After finding a window, continue from start+1                       │
│     - NOT from end+1! We might miss overlapping better windows            │
│                                                                            │
│  4. SUBSEQUENCE vs SUBSTRING:                                              │
│     - Subsequence: chars in order, can skip                               │
│     - Substring: contiguous, no skipping                                  │
│     - This problem: find minimum SUBSTRING containing SUBSEQUENCE         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Interview Tips

**What to say:**
> "This problem asks for minimum substring containing a subsequence. I'll use a two-pointer approach with forward and backward scans. Forward finds where a valid window ends, then backward finds the closest start to minimize that window."

**Follow-up Questions:**

1. **"Why not just forward scan?"**
   - Forward gives us A window, but not the minimum ending at that position
   - Example: "abbb" with pattern "ab" - forward finds "abbb", backward finds "ab"

2. **"What's the difference from Minimum Window Substring?"**
   - Substring: any order, just need all chars present
   - Subsequence: ORDER MATTERS, chars must appear in sequence

3. **"Can you optimize further?"**
   - Use DP with preprocessing for next occurrence of each char
   - Time stays O(m×n) but better constants

---

## Which approach do you want to see?

1. **Brute Force** - O(m × n) simple forward scan
2. **Two Pointer Forward-Backward** - O(m × n) optimal (RECOMMENDED!)
3. **Dynamic Programming** - O(m × n) with state tracking