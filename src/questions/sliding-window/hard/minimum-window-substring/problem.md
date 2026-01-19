# Minimum Window Substring

## Problem Statement

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window.

If there is no such substring, return the empty string `""`.

**Note:** The answer is always unique.

## Examples

### Example 1:
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

### Example 2:
```
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
```

### Example 3:
```
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
```

## Constraints
- `1 <= m, n <= 10^5`
- `s` and `t` consist of uppercase and lowercase English letters

---

## Key Observation

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  THIS IS THE "FIND MINIMUM VALID WINDOW" PATTERN!                          │
│                                                                            │
│  Classic Sliding Window with TWO conditions:                               │
│  1. EXPAND (right++) until window is VALID (contains all chars of t)       │
│  2. SHRINK (left++) while window remains VALID (to find minimum)          │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  Visual: s = "ADOBECODEBANC", t = "ABC"                             │  │
│  │                                                                     │  │
│  │  Step 1: EXPAND until valid                                         │  │
│  │  [ADOBEC] → has A, B, C ✅ (length 6)                               │  │
│  │                                                                     │  │
│  │  Step 2: SHRINK while still valid                                   │  │
│  │  [DOBEC] → missing A ❌ → stop shrinking                            │  │
│  │                                                                     │  │
│  │  Step 3: Continue EXPAND, then SHRINK again...                      │  │
│  │  Eventually find [BANC] → length 4 ⭐                               │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## The Tricky Part: How to Check "Window Contains All of t"?

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  NAIVE WAY: Compare two hashmaps every time → O(26) or O(52) per check    │
│                                                                            │
│  SMART WAY: Use a "formed" counter!                                        │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  t = "ABC"                                                          │  │
│  │  required = {A:1, B:1, C:1}  → 3 unique characters needed           │  │
│  │                                                                     │  │
│  │  formed = 0  (how many chars have ENOUGH count in window)           │  │
│  │                                                                     │  │
│  │  When window has:                                                   │  │
│  │  - A:1 → A is satisfied → formed = 1                               │  │
│  │  - B:1 → B is satisfied → formed = 2                               │  │
│  │  - C:1 → C is satisfied → formed = 3                               │  │
│  │                                                                     │  │
│  │  When formed == required.size → WINDOW IS VALID! ✅                 │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  This way: O(1) to check validity instead of O(26)!                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Approaches

### Approach 1: Brute Force

**Intuition (Soch):**
- Try ALL possible substrings of `s`
- Check if each substring contains all characters of `t`
- Track minimum length valid substring

**Algorithm:**
1. For each starting index `i` in `s`
2. For each ending index `j` (from `i` to end)
3. Check if `s[i..j]` contains all chars of `t`
4. If valid and smaller than current min, update answer

**Time Complexity:** O(m² × n) - m² substrings, n to check each
**Space Complexity:** O(m + n) for frequency maps

---

### Approach 2: Sliding Window with Two Pointers (Optimal)

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  TWO PHASES ALTERNATING:                                                   │
│                                                                            │
│  PHASE 1 - EXPAND (find a valid window):                                   │
│    Move RIGHT pointer until window contains all chars of t                 │
│                                                                            │
│  PHASE 2 - SHRINK (minimize the window):                                   │
│    Move LEFT pointer while window still valid                              │
│    Update answer if current window is smaller                              │
│                                                                            │
│  Repeat until right reaches end of string                                  │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  s = "ADOBECODEBANC", t = "ABC"                                     │  │
│  │                                                                     │  │
│  │  EXPAND:  [A]DOBECODEBANC     → need B, C                          │  │
│  │  EXPAND:  [AD]OBECODEBANC    → need B, C                           │  │
│  │  EXPAND:  [ADO]BECODEBANC   → need B, C                            │  │
│  │  EXPAND:  [ADOB]ECODEBANC  → need C                                │  │
│  │  EXPAND:  [ADOBE]CODEBANC → need C                                 │  │
│  │  EXPAND:  [ADOBEC]ODEBANC → VALID! ✅ (len=6)                      │  │
│  │                                                                     │  │
│  │  SHRINK:  A[DOBEC]ODEBANC → missing A ❌ STOP                      │  │
│  │                                                                     │  │
│  │  EXPAND:  A[DOBECO]DEBANC → still missing A                        │  │
│  │  ...continue...                                                     │  │
│  │                                                                     │  │
│  │  Eventually: ADOBECODE[BANC] → VALID! (len=4) ⭐                   │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Algorithm:**
1. Create frequency map `required` for string `t`
2. Initialize `windowCounts` map for current window
3. Use `formed` counter (chars with required frequency met)
4. Expand RIGHT until `formed == required.size`
5. Shrink LEFT while `formed == required.size`, update min
6. Return minimum window found

**Time Complexity:** O(m + n) - each char visited at most twice
**Space Complexity:** O(m + n) - for frequency maps

---

## Complexity Comparison

| Approach | Time | Space | Difficulty |
|----------|------|-------|------------|
| Brute Force | O(m² × n) | O(m + n) | Easy |
| Sliding Window | O(m + n) | O(m + n) | Medium-Hard |

---

## Visual Dry Run - Example 1

```
s = "ADOBECODEBANC", t = "ABC"
required = {A:1, B:1, C:1}, requiredSize = 3

═══════════════════════════════════════════════════════════════════════════════
PHASE: EXPAND until valid
═══════════════════════════════════════════════════════════════════════════════

left=0, right=0: s[0]='A'
  windowCounts = {A:1}
  A: 1 >= 1 ✅ → formed = 1
  formed(1) < required(3) → keep expanding

left=0, right=1: s[1]='D'
  windowCounts = {A:1, D:1}
  D not in required → formed stays 1
  formed(1) < required(3) → keep expanding

left=0, right=2: s[2]='O'
  windowCounts = {A:1, D:1, O:1}
  formed = 1 → keep expanding

left=0, right=3: s[3]='B'
  windowCounts = {A:1, D:1, O:1, B:1}
  B: 1 >= 1 ✅ → formed = 2
  formed(2) < required(3) → keep expanding

left=0, right=4: s[4]='E'
  windowCounts = {A:1, D:1, O:1, B:1, E:1}
  formed = 2 → keep expanding

left=0, right=5: s[5]='C'
  windowCounts = {A:1, D:1, O:1, B:1, E:1, C:1}
  C: 1 >= 1 ✅ → formed = 3
  formed(3) == required(3) → VALID WINDOW! ✅

  Current window: "ADOBEC" (indices 0-5, length 6)
  Update answer: start=0, length=6

═══════════════════════════════════════════════════════════════════════════════
PHASE: SHRINK while valid
═══════════════════════════════════════════════════════════════════════════════

left=0→1: Remove s[0]='A'
  windowCounts = {A:0, D:1, O:1, B:1, E:1, C:1}
  A: 0 < 1 ❌ → formed = 2
  formed(2) < required(3) → INVALID → stop shrinking

═══════════════════════════════════════════════════════════════════════════════
PHASE: EXPAND again
═══════════════════════════════════════════════════════════════════════════════

left=1, right=6: s[6]='O'
  formed = 2 → keep expanding

left=1, right=7: s[7]='D'
  formed = 2 → keep expanding

left=1, right=8: s[8]='E'
  formed = 2 → keep expanding

left=1, right=9: s[9]='B'
  windowCounts[B] = 2
  formed stays 2 (B was already satisfied)

left=1, right=10: s[10]='A'
  windowCounts[A] = 1
  A: 1 >= 1 ✅ → formed = 3
  VALID WINDOW! ✅

  Current window: "DOBECODEBA" (indices 1-10, length 10)
  10 > 6, so don't update answer

═══════════════════════════════════════════════════════════════════════════════
PHASE: SHRINK while valid
═══════════════════════════════════════════════════════════════════════════════

left=1→2: Remove s[1]='D'
  D not in required → formed stays 3
  Still valid! Window: "OBECODEBA" (length 9)

left=2→3: Remove s[2]='O'
  O not in required → formed stays 3
  Still valid! Window: "BECODEBA" (length 8)

left=3→4: Remove s[3]='B'
  windowCounts[B] = 1, still >= 1 → formed stays 3
  Still valid! Window: "ECODEBA" (length 7)

left=4→5: Remove s[4]='E'
  E not in required → formed stays 3
  Still valid! Window: "CODEBA" (length 6)
  6 == 6, don't update (not smaller)

left=5→6: Remove s[5]='C'
  windowCounts[C] = 0, now < 1 → formed = 2
  INVALID → stop shrinking

═══════════════════════════════════════════════════════════════════════════════
Continue EXPAND...
═══════════════════════════════════════════════════════════════════════════════

left=6, right=11: s[11]='N'
  formed = 2 → keep expanding

left=6, right=12: s[12]='C'
  windowCounts[C] = 1
  C: 1 >= 1 ✅ → formed = 3
  VALID WINDOW! ✅

  Current window: "ODEBANC" (indices 6-12, length 7)
  7 > 6, don't update

═══════════════════════════════════════════════════════════════════════════════
PHASE: SHRINK while valid
═══════════════════════════════════════════════════════════════════════════════

left=6→7: Remove s[6]='O'
  formed stays 3
  Window: "DEBANC" (length 6), don't update

left=7→8: Remove s[7]='D'
  formed stays 3
  Window: "EBANC" (length 5)
  5 < 6 → UPDATE! start=8, length=5

left=8→9: Remove s[8]='E'
  formed stays 3
  Window: "BANC" (length 4)
  4 < 5 → UPDATE! start=9, length=4

left=9→10: Remove s[9]='B'
  windowCounts[B] = 0, now < 1 → formed = 2
  INVALID → stop shrinking

═══════════════════════════════════════════════════════════════════════════════
right has reached end of string
═══════════════════════════════════════════════════════════════════════════════

RESULT: s.substring(9, 9+4) = "BANC" ✅
```

---

## Key Insights

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  1. EXPAND-SHRINK PATTERN:                                                 │
│     - Expand RIGHT until window is VALID                                   │
│     - Shrink LEFT while window stays VALID (to minimize)                   │
│     - This ensures we find ALL valid windows and track minimum            │
│                                                                            │
│  2. "FORMED" COUNTER TRICK:                                                │
│     - Instead of comparing maps every time O(26)                          │
│     - Track how many UNIQUE chars have met their required count           │
│     - When formed == required.size → window is valid O(1)                 │
│                                                                            │
│  3. WHY O(m + n)?                                                          │
│     - Building required map: O(n)                                         │
│     - Each char in s visited at most TWICE:                               │
│       - Once when right expands                                           │
│       - Once when left shrinks                                            │
│     - Total: O(m + n)                                                     │
│                                                                            │
│  4. SIMILAR PROBLEMS:                                                      │
│     - Longest Substring with At Most K Distinct (expand-shrink)           │
│     - Substring with Concatenation of All Words                           │
│     - Find All Anagrams in a String                                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Interview Tips

**What to say:**
> "This is a classic sliding window problem. I'll use two pointers - expand right until window contains all chars of t, then shrink left to minimize while still valid. I'll use a 'formed' counter to check validity in O(1) instead of comparing hashmaps."

**Follow-up Questions:**

1. **"Why not just check if all chars present?"**
   - Need to handle DUPLICATES in t (e.g., t="aa" needs TWO a's)
   - Frequency map handles this

2. **"Can you do it with array instead of hashmap?"**
   - Yes! Use int[128] for ASCII characters
   - Slightly faster due to no hashing overhead

3. **"What if multiple minimum windows exist?"**
   - Problem guarantees unique answer
   - If not, we'd return the first one found (leftmost)

---

## Which approach do you want to see?

1. **Brute Force** - O(m² × n) time
2. **Sliding Window with Formed Counter** - O(m + n) time (RECOMMENDED!)