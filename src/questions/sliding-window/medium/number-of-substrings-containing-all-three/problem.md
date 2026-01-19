# Number of Substrings Containing All Three Characters

## Problem Statement

Given a string `s` consisting only of characters `'a'`, `'b'`, and `'c'`.

Find the number of substrings that contain **at least one occurrence** of all these characters `'a'`, `'b'`, and `'c'`.

## Examples

### Example 1:
```
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of 'a', 'b', 'c' are:
"abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc", "abc"
```

### Example 2:
```
Input: s = "aaacb"
Output: 3
Explanation: The substrings are "aaacb", "aacb", "acb"
```

### Example 3:
```
Input: s = "abc"
Output: 1
Explanation: Only "abc" contains all three characters
```

## Constraints
- `3 <= s.length <= 5 * 10^4`
- `s` only consists of `'a'`, `'b'`, or `'c'` characters

---

## Key Observation - "AT LEAST" is Different!

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  Previous problems: "exactly K" → used atMost(k) - atMost(k-1)             │
│                                                                            │
│  This problem: "at least one of each" → SIMPLER!                           │
│                                                                            │
│  KEY INSIGHT:                                                              │
│  Once we have a valid substring (contains a, b, c),                        │
│  ALL extensions to the right are ALSO valid!                               │
│                                                                            │
│  Example: s = "abcabc"                                                     │
│           If "abc" is valid, then "abca", "abcab", "abcabc" are ALL valid  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Visual:

```
s = "a b c a b c"
     0 1 2 3 4 5

Starting at index 0:
  - "ab" → missing 'c' ❌
  - "abc" → has all three ✅ (index 2 is minimum valid end)
  - "abca" → still has all three ✅
  - "abcab" → still has all three ✅
  - "abcabc" → still has all three ✅

Once we reach index 2 (first valid), ALL substrings ending at 2,3,4,5 are valid!
Count from index 0 = (n - 2) = 6 - 2 = 4 substrings
```

---

## Approaches

### Approach 1: Brute Force

**Intuition (Soch):**
- Check ALL possible substrings
- For each substring, check if it contains 'a', 'b', and 'c'

**Algorithm:**
1. For each starting position `i`
2. For each ending position `j` (from `i` to end)
3. Track count of 'a', 'b', 'c' in current substring
4. If all three are present, increment count

**Time Complexity:** O(n²)
**Space Complexity:** O(1)

---

### Approach 2: Sliding Window - Count from Left

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  For each starting position i:                                 │
│  - Find the SMALLEST j such that s[i..j] contains all 3 chars  │
│  - Then ALL substrings s[i..j], s[i..j+1], ..., s[i..n-1]      │
│    are valid!                                                  │
│                                                                │
│  Count of valid substrings starting at i = (n - j)             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Algorithm:**
1. Use two pointers: `left` and `right`
2. Expand `right` until window contains all 3 characters
3. For each valid window, count = `n - right` (all extensions are valid)
4. Shrink `left` and repeat

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

### Approach 3: Using Last Index Array (Most Elegant!)

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  For each position i, track the LAST occurrence of 'a','b','c' │
│                                                                │
│  If lastIndex = [la, lb, lc]                                   │
│  The minimum of these = earliest position where we have all 3  │
│                                                                │
│  All substrings starting from 0 to min(lastIndex) and ending   │
│  at current position i are valid!                              │
│                                                                │
│  Count at position i = min(la, lb, lc) + 1                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Visual Example:**
```
s = "a b c a b c"
     0 1 2 3 4 5

i=0: 'a' → lastIndex = [0, -1, -1]
     min = -1, count += 0

i=1: 'b' → lastIndex = [0, 1, -1]
     min = -1, count += 0

i=2: 'c' → lastIndex = [0, 1, 2]
     min = 0, count += (0 + 1) = 1
     Valid: "abc" (starting at 0)

i=3: 'a' → lastIndex = [3, 1, 2]
     min = 1, count += (1 + 1) = 2
     Valid: "abca" (start 0), "bca" (start 1)

i=4: 'b' → lastIndex = [3, 4, 2]
     min = 2, count += (2 + 1) = 3
     Valid: "abcab" (start 0), "bcab" (start 1), "cab" (start 2)

i=5: 'c' → lastIndex = [3, 4, 5]
     min = 3, count += (3 + 1) = 4
     Valid: "abcabc", "bcabc", "cabc", "abc" (starts 0,1,2,3)

Total = 1 + 2 + 3 + 4 = 10 ✅
```

**Algorithm:**
1. Initialize `lastIndex = [-1, -1, -1]` for 'a', 'b', 'c'
2. For each position `i`:
   - Update lastIndex for current character
   - `minIndex = min(lastIndex[0], lastIndex[1], lastIndex[2])`
   - `count += minIndex + 1`

**Time Complexity:** O(n)
**Space Complexity:** O(1) - just 3 variables

---

## Complexity Comparison

| Approach | Time | Space | Difficulty |
|----------|------|-------|------------|
| Brute Force | O(n²) | O(1) | Easy |
| Sliding Window | O(n) | O(1) | Medium |
| Last Index Array | O(n) | O(1) | Easy (Most Elegant!) |

---

## Dry Run - Example 1

```
s = "abcba", n = 5

Using Last Index Array approach:

i=0: s[0]='a' → lastIndex = [0, -1, -1]
     min(-1) → count += 0

i=1: s[1]='b' → lastIndex = [0, 1, -1]
     min(-1) → count += 0

i=2: s[2]='c' → lastIndex = [0, 1, 2]
     min(0,1,2) = 0 → count += 1
     Substring: "abc"

i=3: s[3]='b' → lastIndex = [0, 3, 2]
     min(0,3,2) = 0 → count += 1
     Substring: "abcb"

i=4: s[4]='a' → lastIndex = [4, 3, 2]
     min(4,3,2) = 2 → count += 3
     Substrings: "abcba", "bcba", "cba"

Total = 0 + 0 + 1 + 1 + 3 = 5 ✅
```

---

## Key Insights

```
┌────────────────────────────────────────────────────────────────┐
│  1. "AT LEAST" = Once valid, all extensions are valid          │
│                                                                │
│  2. For ending position j:                                     │
│     - Valid starting positions are 0 to min(lastIndex)         │
│     - Count = min(lastIndex) + 1                               │
│                                                                │
│  3. Last Index approach is most elegant:                       │
│     - No need for explicit sliding window                      │
│     - Just track last occurrence of each character             │
│     - Single pass, O(1) space                                  │
│                                                                │
│  4. This pattern applies to:                                   │
│     - "Substrings containing all characters of pattern"        │
│     - "Substrings with at least K distinct characters"         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Interview Tips

**What to say:**
> "Since we need 'at least' one of each character, once we have a valid window, all extensions are also valid. I can track the last occurrence of each character and for each position, count how many valid starting points exist."

**Follow-up Questions:**
1. **"What if we need at least K of each character?"**
   - Use frequency array and check if all frequencies >= K

2. **"What if there are more than 3 characters?"**
   - Extend lastIndex array to 26 (for lowercase) or use HashMap

3. **"Can you do it with actual sliding window?"**
   - Yes! Find minimum valid window, then count extensions

---

## Which approach do you want to see?

1. **Brute Force** - O(n²) time, O(1) space
2. **Sliding Window** - O(n) time, O(1) space
3. **Last Index Array** - O(n) time, O(1) space (RECOMMENDED - Most Elegant!)