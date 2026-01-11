# Longest Substring Without Repeating Characters

## Problem Statement

Given a string `s`, find the length of the **longest substring** without duplicate characters.

**Example 1:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" is the longest substring without repeating characters.
```

**Example 2:**
```
Input: s = "bbbbb"
Output: 1
Explanation: "b" is the longest, all characters are same.
```

**Example 3:**
```
Input: s = "pwwkew"
Output: 3
Explanation: "wke" is the answer. Note: "pwke" is subsequence, not substring!
```

**Constraints:**
- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces

---

## 🎯 Key Insight: Substring vs Subsequence

```
String: "pwwkew"

Substring: Continuous characters (window in string)
  ✅ "pww", "wke", "kew" - all valid substrings

Subsequence: Can skip characters (not continuous)
  ✅ "pwke" - valid subsequence but NOT substring
```

**Yeh problem SUBSTRING maang raha hai - matlab continuous characters!**

---

## 🧠 Problem Samajhte Hain (Understanding)

### Real-Life Analogy

Imagine you're typing a password with a rule:
- "No character should repeat in the password"
- You want the LONGEST such password from a given string

```
String: "abcabcbb"

Try different windows:
  "a"      → length 1, valid ✅
  "ab"     → length 2, valid ✅
  "abc"    → length 3, valid ✅
  "abca"   → length 4, INVALID ❌ ('a' repeats)

So we need to find the longest valid window!
```

---

## 📊 Approaches Overview

| Approach | Time | Space | Technique |
|----------|------|-------|-----------|
| Brute Force | O(n³) | O(min(n,m)) | Check all substrings |
| Sliding Window + Set | O(n) | O(min(n,m)) | Expand/Shrink window |
| Sliding Window + HashMap | O(n) | O(min(n,m)) | Jump optimization |

Where `m` = size of character set (26 for lowercase, 128 for ASCII)

---

## Approach 1: Brute Force

### Intuition (Soch)

Sabse simple approach:
1. Generate ALL possible substrings
2. Check each substring for duplicate characters
3. Track the longest valid one

### Visual Example

```
String: "abca"

All substrings:
Start 0: "a", "ab", "abc", "abca"
Start 1: "b", "bc", "bca"
Start 2: "c", "ca"
Start 3: "a"

Check each:
"a"    → valid, length 1
"ab"   → valid, length 2
"abc"  → valid, length 3 ⭐ BEST SO FAR
"abca" → 'a' repeats, INVALID ❌
"b"    → valid, length 1
"bc"   → valid, length 2
"bca"  → valid, length 3 ⭐ (tied)
...

Answer: 3
```

### Why O(n³)?

```
Outer loop: n starting positions      → O(n)
Inner loop: n ending positions        → O(n)
Check duplicates: scan substring      → O(n)
                                      ─────────
Total:                                  O(n³)
```

### Pseudo Code

```
function bruteForce(s):
    maxLength = 0

    for i = 0 to n-1:           // Start of substring
        for j = i to n-1:       // End of substring
            if hasAllUnique(s[i..j]):
                maxLength = max(maxLength, j - i + 1)

    return maxLength

function hasAllUnique(substring):
    set = new Set()
    for char in substring:
        if char in set:
            return false
        set.add(char)
    return true
```

---

## Approach 2: Sliding Window + Set (Optimal)

### Prerequisites

- **Sliding Window Technique**: Two pointers maintaining a "window" in array/string
- **HashSet**: O(1) lookup for checking duplicates

### Intuition (Soch)

**Key Insight:** Brute force mein problem yeh hai ki hum baar baar same characters check kar rahe hain.

**Sliding Window Idea:**
- Maintain a window `[left, right]` with all unique characters
- **Expand** window by moving `right` (add characters)
- **Shrink** window by moving `left` (remove characters) when duplicate found
- Track maximum window size

### Why Sliding Window Works?

```
String: "abcabcbb"

Instead of checking every substring separately,
we SLIDE a window:

Step 1: Window = "a"        → unique, expand
Step 2: Window = "ab"       → unique, expand
Step 3: Window = "abc"      → unique, expand (max = 3)
Step 4: Try adding 'a' → "abca" has duplicate!
        → Shrink: remove 'a' from left
        → Window = "bca"    → unique again
Step 5: Try adding 'b' → "bcab" has duplicate!
        → Shrink until valid
        ...
```

### Visual Dry Run

```
String: "abcabcbb"
         01234567

Initial: left = 0, right = 0, maxLen = 0, set = {}

─────────────────────────────────────────────────────
right = 0, char = 'a'
  'a' not in set → add 'a'
  set = {'a'}
  Window: [a]bcabcbb
          L
          R
  maxLen = max(0, 0-0+1) = 1

─────────────────────────────────────────────────────
right = 1, char = 'b'
  'b' not in set → add 'b'
  set = {'a', 'b'}
  Window: [ab]cabcbb
          L R
  maxLen = max(1, 1-0+1) = 2

─────────────────────────────────────────────────────
right = 2, char = 'c'
  'c' not in set → add 'c'
  set = {'a', 'b', 'c'}
  Window: [abc]abcbb
          L  R
  maxLen = max(2, 2-0+1) = 3 ⭐

─────────────────────────────────────────────────────
right = 3, char = 'a'
  'a' IN set! → SHRINK window

  While 'a' is in set:
    Remove s[left] = 'a' from set
    left++

  set = {'b', 'c'}
  left = 1

  Now add 'a':
  set = {'b', 'c', 'a'}
  Window: a[bca]bcbb
           L  R
  maxLen = max(3, 3-1+1) = 3

─────────────────────────────────────────────────────
right = 4, char = 'b'
  'b' IN set! → SHRINK window

  Remove s[left] = 'b' from set
  left = 2
  set = {'c', 'a'}

  Add 'b':
  set = {'c', 'a', 'b'}
  Window: ab[cab]cbb
            L  R
  maxLen = max(3, 4-2+1) = 3

─────────────────────────────────────────────────────
right = 5, char = 'c'
  'c' IN set! → SHRINK

  Remove 'c', left = 3
  set = {'a', 'b'}

  Add 'c':
  set = {'a', 'b', 'c'}
  Window: abc[abc]bb
             L  R
  maxLen = 3

─────────────────────────────────────────────────────
right = 6, char = 'b'
  'b' IN set! → SHRINK

  Remove 'a', left = 4, set = {'b', 'c'}
  'b' still in set!
  Remove 'b', left = 5, set = {'c'}

  Add 'b':
  set = {'c', 'b'}
  Window: abcab[cb]b
               L R
  maxLen = max(3, 6-5+1) = 3

─────────────────────────────────────────────────────
right = 7, char = 'b'
  'b' IN set! → SHRINK

  Remove 'c', left = 6, set = {'b'}
  'b' still in set!
  Remove 'b', left = 7, set = {}

  Add 'b':
  set = {'b'}
  Window: abcabcb[b]
                 LR
  maxLen = max(3, 7-7+1) = 3

─────────────────────────────────────────────────────
DONE! Answer: 3
```

### Algorithm

```
function lengthOfLongestSubstring(s):
    set = new Set()
    left = 0
    maxLength = 0

    for right = 0 to n-1:
        // Shrink window until no duplicate
        while s[right] in set:
            set.remove(s[left])
            left++

        // Add current character
        set.add(s[right])

        // Update max length
        maxLength = max(maxLength, right - left + 1)

    return maxLength
```

### Time & Space Complexity

**Time: O(n)**
- Each character is added to set at most once: O(n)
- Each character is removed from set at most once: O(n)
- Total: O(2n) = O(n)

**Space: O(min(n, m))**
- Set stores at most `min(n, m)` characters
- Where m = size of character set

---

## Approach 3: Sliding Window + HashMap (Jump Optimization)

### Prerequisites

- **Sliding Window Technique**: Two pointers maintaining a "window"
- **HashMap**: O(1) lookup and update

### Intuition (Soch)

**Problem with Set approach:**
When we find a duplicate, we shrink window one character at a time using while loop.

**HashMap Optimization:**
Store the INDEX of each character. When duplicate found, directly JUMP left pointer!

### 🔑 CRITICAL: Set vs HashMap - What Do They Store?

```
┌─────────────────────────────────────────────────────────────────┐
│  SET APPROACH:                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  • Stores ONLY characters currently in window                   │
│  • When shrinking, we REMOVE characters from set                │
│  • set.has(char) directly tells us if char is in window         │
│                                                                 │
│  Example: Window = "abc"                                        │
│           set = {'a', 'b', 'c'}                                 │
│           Shrink → remove 'a' → set = {'b', 'c'}                │
├─────────────────────────────────────────────────────────────────┤
│  HASHMAP APPROACH:                                              │
│  ─────────────────────────────────────────────────────────────  │
│  • Stores ALL characters ever seen with their LAST INDEX        │
│  • We NEVER remove from map!                                    │
│  • To check if char is in window: index >= left                 │
│                                                                 │
│  Example: Processed "abba", left = 2                            │
│           map = {'a': 3, 'b': 2}                                │
│           'a' at index 0? But 0 < left(2), so outside window!   │
└─────────────────────────────────────────────────────────────────┘
```

### Visual Example

```
String: "abcadef"
         0123456

Using Set (Approach 2):
  Window "abc", see 'a' at index 3
  while(set.has('a')): remove s[left], left++
  left moves: 0 → 1

Using HashMap (Approach 3):
  Window "abc", see 'a' at index 3
  'a' at index 0, is 0 >= left(0)? YES
  JUMP: left = 0 + 1 = 1 (direct jump, no loop!)

Same result, but HashMap has no while loop.
```

### Algorithm

```
function lengthOfLongestSubstring(s):
    map = new HashMap()  // char → last seen index (NEVER removed!)
    left = 0
    maxLength = 0

    for right = 0 to n-1:
        char = s[right]

        // If char seen before AND its position is in current window
        if char in map AND map[char] >= left:
            // Jump left pointer past the duplicate
            left = map[char] + 1

        // ALWAYS update character's position (even if outside window)
        map[char] = right

        // Update max length
        maxLength = max(maxLength, right - left + 1)

    return maxLength
```

### 🎯 Critical Edge Case: "abba" (Why >= left check is needed)

```
String: "abba"
         0123

HashMap stores ALL chars ever seen - so we need to check
if old occurrence is still in our window!

─────────────────────────────────────────────────────
right = 0, char = 'a'
  'a' not in map
  map = {'a': 0}, left = 0
  Window: [a]bba

─────────────────────────────────────────────────────
right = 1, char = 'b'
  'b' not in map
  map = {'a': 0, 'b': 1}, left = 0
  Window: [ab]ba

─────────────────────────────────────────────────────
right = 2, char = 'b'
  'b' in map at index 1
  Is 1 >= left(0)? YES → Duplicate in window!
  JUMP: left = 1 + 1 = 2

  map = {'a': 0, 'b': 2}  ← Note: 'a' still at index 0!
  Window: ab[b]a

─────────────────────────────────────────────────────
right = 3, char = 'a'
  'a' in map at index 0
  Is 0 >= left(2)? NO! (0 < 2)

  ┌─────────────────────────────────────────────────────────┐
  │  OLD 'a' IS OUTSIDE WINDOW!                             │
  │                                                         │
  │  String: a  b  b  a                                     │
  │  Index:  0  1  2  3                                     │
  │          ↑     └──┘                                     │
  │       old 'a'  window (left=2)                          │
  │       (index 0 < left 2, so outside!)                   │
  │                                                         │
  │  This 'a' is NOT a real duplicate for current window!   │
  │  We DON'T move left.                                    │
  └─────────────────────────────────────────────────────────┘

  Just update: map = {'a': 3, 'b': 2}
  Window: ab[ba], maxLen = 2

RESULT: 2
```

### Visual Dry Run: "abcadef"

```
String: "abcadef"
         0123456

─────────────────────────────────────────────────────
right = 0, char = 'a'
  'a' not in map
  map = {'a': 0}
  Window: [a]bcadef, maxLen = 1

─────────────────────────────────────────────────────
right = 1, char = 'b'
  'b' not in map
  map = {'a': 0, 'b': 1}
  Window: [ab]cadef, maxLen = 2

─────────────────────────────────────────────────────
right = 2, char = 'c'
  'c' not in map
  map = {'a': 0, 'b': 1, 'c': 2}
  Window: [abc]adef, maxLen = 3

─────────────────────────────────────────────────────
right = 3, char = 'a'
  'a' in map at index 0
  Is 0 >= left(0)? YES → Duplicate!
  JUMP: left = 0 + 1 = 1

  map = {'a': 3, 'b': 1, 'c': 2}
  Window: a[bca]def, maxLen = 3

  Note: 'b' and 'c' still have old indices in map,
  but we don't care - we only check >= left when we see them again

─────────────────────────────────────────────────────
right = 4, char = 'd'
  'd' not in map
  map = {'a': 3, 'b': 1, 'c': 2, 'd': 4}
  Window: a[bcad]ef, maxLen = 4 ⭐

─────────────────────────────────────────────────────
right = 5, char = 'e'
  'e' not in map
  Window: a[bcade]f, maxLen = 5 ⭐

─────────────────────────────────────────────────────
right = 6, char = 'f'
  'f' not in map
  Window: a[bcadef], maxLen = 6 ⭐

─────────────────────────────────────────────────────
DONE! Answer: 6
```

### Time & Space Complexity

**Time: O(n)**
- Single pass through string
- No while loop for shrinking

**Space: O(min(n, m))**
- Map stores at most `min(n, m)` characters
- Where m = size of character set

---

## 🎯 Comparison Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    APPROACH COMPARISON                       │
├─────────────────┬─────────────┬─────────────┬───────────────┤
│ Approach        │ Time        │ Space       │ Key Idea      │
├─────────────────┼─────────────┼─────────────┼───────────────┤
│ Brute Force     │ O(n³)       │ O(min(n,m)) │ Check all     │
│ Sliding + Set   │ O(n)        │ O(min(n,m)) │ Shrink 1 by 1 │
│ Sliding + Map   │ O(n)        │ O(min(n,m)) │ Jump directly │
└─────────────────┴─────────────┴─────────────┴───────────────┘
```

---

## 🎤 Interview Tips

### What to Say to Interviewer

1. **Start with clarification:**
   - "Is it case-sensitive? Is 'A' different from 'a'?"
   - "What characters can appear? Only lowercase, or all ASCII?"

2. **Explain approach:**
   - "I'll use sliding window - maintain a window of unique characters"
   - "Expand when possible, shrink when duplicate found"

3. **Mention optimization:**
   - "Set approach shrinks one by one, HashMap can jump directly"
   - "Both O(n), but HashMap is cleaner conceptually"

### Common Follow-up Questions

**Q: Why not just use Set always?**
A: Set requires while loop to shrink. HashMap allows direct jump.
   In practice, both are O(n), but HashMap code is often cleaner.

**Q: What if we want the actual substring, not just length?**
A: Track `start` and `end` of max window. Return `s.substring(start, end+1)`.

**Q: What about Unicode characters?**
A: HashMap handles any character naturally. Set works too.

---

## Which Solution Do You Want to See?

1. **Brute Force** - O(n³) - Good for understanding the problem
2. **Sliding Window + Set** - O(n) - Classic approach, easy to understand
3. **Sliding Window + HashMap** - O(n) - Jump optimization, interview favorite

Let me know! 🚀