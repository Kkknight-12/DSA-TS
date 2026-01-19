# Longest Substring with At Most K Distinct Characters

## Problem Statement

Given a string `s` and an integer `k`, find the length of the **longest substring** with **at most k distinct characters**.

## Examples

### Example 1:
```
Input: s = "aababbcaacc", k = 2
Output: 6
Explanation: The longest substring with at most 2 distinct characters is "aababb".
             It contains only 'a' and 'b'.
```

### Example 2:
```
Input: s = "abcddefg", k = 3
Output: 4
Explanation: The longest substring with at most 3 distinct characters is "bcdd".
             It contains 'b', 'c', and 'd'.
```

### Example 3:
```
Input: s = "eceba", k = 2
Output: 3
Explanation: "ece" is the longest substring with at most 2 distinct characters.
```

### Example 4:
```
Input: s = "aaaa", k = 1
Output: 4
Explanation: Entire string has only 1 distinct character.
```

## Constraints
- `1 <= s.length <= 10^5`
- `s` consists of English letters
- `1 <= k <= 26`

---

## Key Observation

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  "AT MOST k distinct" = We can have 1, 2, 3, ..., or k distinct chars      │
│                                                                            │
│  This is a CLASSIC sliding window pattern:                                 │
│  - Expand window (move right) to include more characters                   │
│  - If distinct count EXCEEDS k, shrink window (move left)                  │
│  - Track MAXIMUM valid window length                                       │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  Visual: s = "aababbcaacc", k = 2                                   │  │
│  │                                                                     │  │
│  │  "a"       → 1 distinct ✅ (≤2)                                     │  │
│  │  "aa"      → 1 distinct ✅                                          │  │
│  │  "aab"     → 2 distinct ✅                                          │  │
│  │  "aaba"    → 2 distinct ✅                                          │  │
│  │  "aabab"   → 2 distinct ✅                                          │  │
│  │  "aababb"  → 2 distinct ✅ (length 6)                               │  │
│  │  "aababbc" → 3 distinct ❌ (>2) → need to shrink!                   │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Approaches

### Approach 1: Brute Force

**Intuition (Soch):**
- Check ALL possible substrings
- For each substring, count distinct characters
- If distinct ≤ k, update max length

**Algorithm:**
1. For each starting index `i`
2. For each ending index `j` (from `i` to end)
3. Track distinct characters in s[i..j]
4. If distinct ≤ k, update maxLength

**Time Complexity:** O(n²) with optimization, O(n³) naive
**Space Complexity:** O(1) or O(26) for character set

---

### Approach 2: Sliding Window with HashMap (Optimal)

**Intuition (Soch):**
```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  SLIDING WINDOW PATTERN for "At Most K":                                   │
│                                                                            │
│  1. Expand RIGHT pointer to grow window                                    │
│  2. Add s[right] to frequency map                                          │
│  3. While (distinct count > k):                                            │
│     - Remove s[left] from map (decrement count)                            │
│     - If count becomes 0, remove key (distinct--)                          │
│     - Move left pointer forward                                            │
│  4. Update maxLength = max(maxLength, right - left + 1)                    │
│                                                                            │
│  KEY: Map size = number of distinct characters in current window           │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

**Visual Example:**
```
s = "aababbcaacc", k = 2

right=0: 'a' → map={a:1}         size=1 ≤ 2 ✅  window="a"      len=1
right=1: 'a' → map={a:2}         size=1 ≤ 2 ✅  window="aa"     len=2
right=2: 'b' → map={a:2,b:1}     size=2 ≤ 2 ✅  window="aab"    len=3
right=3: 'a' → map={a:3,b:1}     size=2 ≤ 2 ✅  window="aaba"   len=4
right=4: 'b' → map={a:3,b:2}     size=2 ≤ 2 ✅  window="aabab"  len=5
right=5: 'b' → map={a:3,b:3}     size=2 ≤ 2 ✅  window="aababb" len=6 ⭐
right=6: 'c' → map={a:3,b:3,c:1} size=3 > 2 ❌

  Shrink from left:
  left=0: remove 'a' → map={a:2,b:3,c:1} size=3 > 2, continue
  left=1: remove 'a' → map={a:1,b:3,c:1} size=3 > 2, continue
  left=2: remove 'b' → map={a:1,b:2,c:1} size=3 > 2, continue
  left=3: remove 'a' → map={b:2,c:1}     size=2 ≤ 2 ✅ STOP

  window = "bbc", len = 3

... continue

Maximum length found = 6 ("aababb")
```

**Algorithm:**
1. Use HashMap to track character frequencies
2. Expand right, add to map
3. While map.size > k, shrink from left
4. Update maxLength after each valid window

**Time Complexity:** O(n) - each character visited at most twice
**Space Complexity:** O(k) - map stores at most k+1 characters

---

## Complexity Comparison

| Approach | Time | Space | Difficulty |
|----------|------|-------|------------|
| Brute Force | O(n²) | O(26) | Easy |
| Sliding Window + HashMap | O(n) | O(k) | Medium |

---

## Dry Run - Example 1

```
s = "aababbcaacc", k = 2

Initial: left = 0, maxLen = 0, map = {}

════════════════════════════════════════════════════════════════════════════════
Step-by-step:
════════════════════════════════════════════════════════════════════════════════

right=0: char='a'
  map = {a:1}, size=1 ≤ 2 ✅
  maxLen = max(0, 0-0+1) = 1
  window: [a]ababbcaacc

right=1: char='a'
  map = {a:2}, size=1 ≤ 2 ✅
  maxLen = max(1, 1-0+1) = 2
  window: [aa]babbcaacc

right=2: char='b'
  map = {a:2, b:1}, size=2 ≤ 2 ✅
  maxLen = max(2, 2-0+1) = 3
  window: [aab]abbcaacc

right=3: char='a'
  map = {a:3, b:1}, size=2 ≤ 2 ✅
  maxLen = max(3, 3-0+1) = 4
  window: [aaba]bbcaacc

right=4: char='b'
  map = {a:3, b:2}, size=2 ≤ 2 ✅
  maxLen = max(4, 4-0+1) = 5
  window: [aabab]bcaacc

right=5: char='b'
  map = {a:3, b:3}, size=2 ≤ 2 ✅
  maxLen = max(5, 5-0+1) = 6 ⭐
  window: [aababb]caacc

right=6: char='c'
  map = {a:3, b:3, c:1}, size=3 > 2 ❌

  SHRINK:
  left=0: remove 'a' → map={a:2, b:3, c:1}, size=3, left=1
  left=1: remove 'a' → map={a:1, b:3, c:1}, size=3, left=2
  left=2: remove 'b' → map={a:1, b:2, c:1}, size=3, left=3
  left=3: remove 'a' → a count=0, delete 'a'
          map={b:2, c:1}, size=2 ≤ 2 ✅ STOP, left=4

  maxLen = max(6, 6-4+1) = max(6, 3) = 6
  window: aaba[bbc]aacc

right=7: char='a'
  map = {b:2, c:1, a:1}, size=3 > 2 ❌

  SHRINK:
  left=4: remove 'b' → map={b:1, c:1, a:1}, size=3, left=5
  left=5: remove 'b' → b count=0, delete 'b'
          map={c:1, a:1}, size=2 ≤ 2 ✅ STOP, left=6

  maxLen = max(6, 7-6+1) = 6
  window: aababb[ca]acc

... continue similarly

════════════════════════════════════════════════════════════════════════════════
RESULT: maxLen = 6 (substring "aababb")
════════════════════════════════════════════════════════════════════════════════
```

---

## Key Insights

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  1. SLIDING WINDOW for "At Most K":                                        │
│     - Expand until INVALID (distinct > k)                                  │
│     - Shrink until VALID again (distinct ≤ k)                              │
│     - Track maximum valid window                                           │
│                                                                            │
│  2. MAP SIZE = DISTINCT COUNT:                                             │
│     - Add character: map[char]++                                           │
│     - Remove character: map[char]--, if 0 then delete                      │
│     - map.size = current distinct characters                               │
│                                                                            │
│  3. PATTERN RECOGNITION:                                                   │
│     - "At most K distinct" → Sliding Window + HashMap                      │
│     - Similar to: "Longest Substring Without Repeating Characters"         │
│     - Similar to: "Minimum Window Substring"                               │
│                                                                            │
│  4. WHY O(n)?                                                              │
│     - Each character added once (right pointer)                            │
│     - Each character removed at most once (left pointer)                   │
│     - Total: 2n operations = O(n)                                          │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Related Problems

1. **Longest Substring Without Repeating Characters** - k = "all unique"
2. **Longest Repeating Character Replacement** - variation
3. **Minimum Window Substring** - find smallest window containing pattern
4. **Fruits into Baskets** - same problem with different story!

---

## Interview Tips

**What to say:**
> "This is a classic sliding window problem. I'll maintain a window with at most k distinct characters using a hashmap to track frequencies. When distinct count exceeds k, I'll shrink the window from the left until valid again."

**Follow-up Questions:**
1. **"What if k = 0?"** → Empty string, return 0
2. **"What if string has less than k distinct chars?"** → Entire string is valid
3. **"Can you do it with array instead of hashmap?"** → Yes, use int[26] for lowercase letters

---

## Which approach do you want to see?

1. **Brute Force** - O(n²) time, O(26) space
2. **Sliding Window + HashMap** - O(n) time, O(k) space (RECOMMENDED!)