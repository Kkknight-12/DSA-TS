# Longest Repeating Character Replacement

## Problem Statement

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation **at most k times**.

Return the length of the **longest substring** containing the same letter you can get after performing the above operations.

**Example 1:**
```
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
             "ABAB" → "BBBB" or "AAAA"
```

**Example 2:**
```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B'.
             "AABABBA" → "AABBBBA"
             The substring "BBBB" has length 4.
```

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only uppercase English letters
- `0 <= k <= s.length`

---

## 🧠 Problem Samajhte Hain (Understanding)

### Real-Life Analogy

Imagine you have a string of colored beads:
- You want the LONGEST stretch of SAME colored beads
- You can REPAINT at most `k` beads to any color
- Which beads should you repaint?

```
Beads: 🔴🔵🔴🔵  (ABAB), k = 2

Option 1: Repaint both 🔵 to 🔴
          🔴🔴🔴🔴 = 4 same colored beads!

Option 2: Repaint both 🔴 to 🔵
          🔵🔵🔵🔵 = 4 same colored beads!

Answer: 4
```

### 🔑 Key Insight: The Magic Formula!

```
┌─────────────────────────────────────────────────────────────┐
│                    THE KEY INSIGHT                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  For any window to be valid:                                │
│                                                             │
│  Characters to change = WindowSize - MaxFreqChar            │
│                                                             │
│  If (WindowSize - MaxFreqChar) <= k → VALID window!         │
│                                                             │
│  WHY? We keep the most frequent char and change the rest.   │
│       If "rest" count <= k, we can make all chars same!     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visual Example:

```
Window: "AABAB" (size = 5)

Character counts: A=3, B=2
MaxFreqChar = 'A' with count 3

Characters to change = WindowSize - MaxFreqCount
                     = 5 - 3
                     = 2

If k >= 2: We can change 2 B's to A's → "AAAAA" ✅
If k < 2:  Can't make all same ❌

┌─────────────────────────────────────────────────────────────┐
│  FORMULA: (windowSize - maxFreqCount) <= k                  │
│                                                             │
│  This tells us: "Can we make this window all same chars?"   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Approaches Overview

| Approach | Time | Space | Technique |
|----------|------|-------|-----------|
| Brute Force | O(n² × 26) | O(26) | Check all substrings |
| Sliding Window | O(n) | O(26) | Expand/Shrink with maxFreq |

---

## Approach 1: Brute Force

### Intuition (Soch)

Check every possible substring:
1. For each start position
2. Extend to each end position
3. Count character frequencies
4. Check if `windowSize - maxFreq <= k`
5. Track maximum valid window

### Pseudo Code

```
function bruteForce(s, k):
    maxLength = 0

    for i = 0 to n-1:
        charCount = new Map()
        maxFreq = 0

        for j = i to n-1:
            charCount[s[j]]++
            maxFreq = max(maxFreq, charCount[s[j]])

            windowSize = j - i + 1
            charsToChange = windowSize - maxFreq

            if charsToChange <= k:
                maxLength = max(maxLength, windowSize)

    return maxLength
```

### Time Complexity: O(n²)

---

## Approach 2: Sliding Window (Optimal)

### Prerequisites

- **Sliding Window Technique**: Two pointers maintaining a "window"
- **HashMap/Array**: Track character frequencies in window

### Intuition (Soch)

**Reframe the problem:**
```
Original:  "Find longest substring where we can change ≤k chars
            to make all same"

Reframed:  "Find longest window where (windowSize - maxFreqCount) ≤ k"
```

**Sliding Window Logic:**
1. **Expand** window by moving `right` pointer
2. Track character frequencies and `maxFreq`
3. If `(windowSize - maxFreq) > k`, **shrink** from left
4. Track maximum window size

### The MaxFreq Optimization Question

```
┌─────────────────────────────────────────────────────────────┐
│  IMPORTANT QUESTION:                                        │
│                                                             │
│  When we shrink window, should we recalculate maxFreq?      │
│                                                             │
│  ANSWER: NO! We don't need to!                              │
│                                                             │
│  WHY?                                                       │
│  • We only care about finding LONGER windows                │
│  • maxFreq only matters when it helps us get longer window  │
│  • If maxFreq decreases, we won't find longer window anyway │
│  • So we can keep maxFreq as "max ever seen"                │
│                                                             │
│  This is a clever optimization that keeps time O(n)!        │
└─────────────────────────────────────────────────────────────┘
```

### Visual Dry Run

```
s = "AABABBA", k = 1
     0123456

Initial: left = 0, maxFreq = 0, maxLength = 0, charCount = {}

═══════════════════════════════════════════════════════════
right = 0, char = 'A'
  EXPAND: charCount = {A: 1}
  maxFreq = max(0, 1) = 1
  windowSize = 0 - 0 + 1 = 1
  charsToChange = 1 - 1 = 0 ≤ k(1) ✅
  maxLength = max(0, 1) = 1

  Window: [A]ABABBA
           L
           R

═══════════════════════════════════════════════════════════
right = 1, char = 'A'
  EXPAND: charCount = {A: 2}
  maxFreq = max(1, 2) = 2
  windowSize = 2
  charsToChange = 2 - 2 = 0 ≤ 1 ✅
  maxLength = max(1, 2) = 2

  Window: [AA]BABBA
           L R

═══════════════════════════════════════════════════════════
right = 2, char = 'B'
  EXPAND: charCount = {A: 2, B: 1}
  maxFreq = max(2, 1) = 2
  windowSize = 3
  charsToChange = 3 - 2 = 1 ≤ 1 ✅
  maxLength = max(2, 3) = 3

  Window: [AAB]ABBA
           L  R

═══════════════════════════════════════════════════════════
right = 3, char = 'A'
  EXPAND: charCount = {A: 3, B: 1}
  maxFreq = max(2, 3) = 3
  windowSize = 4
  charsToChange = 4 - 3 = 1 ≤ 1 ✅
  maxLength = max(3, 4) = 4 ⭐

  Window: [AABA]BBA
           L   R

═══════════════════════════════════════════════════════════
right = 4, char = 'B'
  EXPAND: charCount = {A: 3, B: 2}
  maxFreq = max(3, 2) = 3
  windowSize = 5
  charsToChange = 5 - 3 = 2 > 1 ❌ Must shrink!

  SHRINK:
    Remove s[left=0] = 'A': charCount = {A: 2, B: 2}
    left = 1
    windowSize = 4
    charsToChange = 4 - 3 = 1 ≤ 1 ✅

    Note: maxFreq stays 3 (we don't recalculate!)

  maxLength = max(4, 4) = 4

  Window: A[ABAB]BA
            L   R

═══════════════════════════════════════════════════════════
right = 5, char = 'B'
  EXPAND: charCount = {A: 2, B: 3}
  maxFreq = max(3, 3) = 3
  windowSize = 5
  charsToChange = 5 - 3 = 2 > 1 ❌ Must shrink!

  SHRINK:
    Remove s[left=1] = 'A': charCount = {A: 1, B: 3}
    left = 2
    windowSize = 4
    charsToChange = 4 - 3 = 1 ≤ 1 ✅

  maxLength = max(4, 4) = 4

  Window: AA[BABB]A
             L   R

═══════════════════════════════════════════════════════════
right = 6, char = 'A'
  EXPAND: charCount = {A: 2, B: 3}
  maxFreq = max(3, 2) = 3
  windowSize = 5
  charsToChange = 5 - 3 = 2 > 1 ❌ Must shrink!

  SHRINK:
    Remove s[left=2] = 'B': charCount = {A: 2, B: 2}
    left = 3
    windowSize = 4
    charsToChange = 4 - 3 = 1 ≤ 1 ✅

  maxLength = max(4, 4) = 4

  Window: AAB[ABBA]
              L   R

═══════════════════════════════════════════════════════════
DONE! Answer: 4

Best window: "AABA" or "ABAB" or "BABB" or "ABBA" = 4 chars
After replacement: "AAAA" or "BBBB" etc.
```

### Algorithm

```
function characterReplacement(s, k):
    charCount = new Array(26).fill(0)  // or Map
    left = 0
    maxFreq = 0
    maxLength = 0

    for right = 0 to n-1:
        // EXPAND: Add current char
        charCount[s[right]]++
        maxFreq = max(maxFreq, charCount[s[right]])

        // SHRINK: While window is invalid
        while (right - left + 1) - maxFreq > k:
            charCount[s[left]]--
            left++

        // UPDATE: Track maximum window
        maxLength = max(maxLength, right - left + 1)

    return maxLength
```

### Time & Space Complexity

**Time: O(n)**
- Each character visited at most twice (once by right, once by left)

**Space: O(26) = O(1)**
- Fixed size array for 26 uppercase letters

---

## 🔄 Pattern Recognition

```
┌─────────────────────────────────────────────────────────────┐
│  SLIDING WINDOW PROBLEMS COMPARISON                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Max Consecutive Ones III:                                  │
│    Constraint: zeros in window ≤ k                          │
│    Track: count of zeros                                    │
│                                                             │
│  Fruit Into Baskets:                                        │
│    Constraint: distinct types ≤ 2                           │
│    Track: count of each type (HashMap)                      │
│                                                             │
│  Longest Repeating Char Replacement:                        │
│    Constraint: (windowSize - maxFreq) ≤ k                   │
│    Track: count of each char + maxFreq                      │
│                                                             │
│  ALL follow same pattern:                                   │
│    EXPAND → Check constraint → SHRINK if needed → UPDATE    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎤 Interview Tips

### What to Say to Interviewer

1. **Explain the insight:**
   - "For any window, we keep the most frequent character unchanged"
   - "We change all OTHER characters to match the most frequent"
   - "So chars to change = windowSize - maxFreqCount"

2. **Explain validity:**
   - "Window is valid if chars to change ≤ k"
   - "I'll slide the window, shrinking when invalid"

3. **Explain maxFreq optimization:**
   - "I don't recalculate maxFreq when shrinking"
   - "Because we only care about finding LONGER windows"
   - "If maxFreq decreases, we won't get a longer valid window anyway"

### Common Follow-up Questions

**Q: Why don't you recalculate maxFreq when shrinking?**
A: We want the LONGEST window. If actual maxFreq decreases, we definitely won't find a longer window. By keeping maxFreq as "max ever seen", we might keep a window that's "theoretically invalid" but same size as our best. We never update maxLength unless we find something longer.

**Q: What if k = 0?**
A: Find the longest substring of repeating characters (no replacements allowed). Same algorithm works!

**Q: What if string has all same characters?**
A: Answer is the entire string length. No replacements needed.

---

## Which Solution Do You Want to See?

1. **Brute Force** - O(n²) - Good for understanding
2. **Sliding Window** - O(n) - Optimal solution

Let me know! 🚀