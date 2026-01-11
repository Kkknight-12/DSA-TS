# Word Break

## Problem Statement (Hinglish mein)

[leet-code-word-break](https://leetcode.com/problems/word-break/)

[gemini-1](https://gemini.google.com/gem/9013c4cd97d5/a8d82d1642f2a5dc)

[gemini-2](https://gemini.google.com/gem/9013c4cd97d5/5a06723361259b84)

**Kya karna hai?**
- Tumhe ek **string `s`** diya gaya hai
- Ek **dictionary of words** (`wordDict`) di gayi hai
- Check karo: Kya string ko dictionary ke words se **completely segment** kar sakte ho?
- **Same word ko multiple times use kar sakte ho**
- Agar puri string break ho jaaye dictionary words se → return `true`
- Agar nahi ho paaye → return `false`

**Example:**
```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true

Explanation:
"leetcode" = "leet" + "code" ✓
Both words are in dictionary!

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true

Explanation:
"applepenapple" = "apple" + "pen" + "apple" ✓
Word "apple" used twice (reuse allowed!)

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

Explanation:
Try all combinations:
- "cat" + "sandog" ❌ ("sandog" not in dict)
- "cats" + "andog" ❌ ("andog" not in dict)
- "cat" + "sand" + "og" ❌ ("og" not in dict)
No valid segmentation exists!
```

**Key Points:**
1. **Complete Segmentation**: Puri string cover honi chahiye (no leftover characters)
2. **Dictionary Words Only**: Sirf dictionary ke words use kar sakte ho
3. **Reuse Allowed**: Same word multiple times use ho sakta hai
4. **Return Boolean**: Just true/false (not the actual segmentation)

---

## Prerequisites (Agar Koi Chahiye)

Yeh problem solve karne ke liye basic concepts:
- **Recursion**: Breaking problem into subproblems
- **Backtracking**: Try different word choices, backtrack if fails
- **Memoization**: Cache results to avoid recomputation
- **Dynamic Programming**: Bottom-up table building
- **String Operations**: Substring matching, prefix checking

---

## Intuition (Soch) 🤔

### The Challenge: String Segmentation

**Example:**
```
s = "leetcode"
wordDict = ["leet", "code", "lee", "to"]

Can we break "leetcode" completely using dictionary words?

Option 1: Take "leet" (index 0 to 3)
  "leet" | "code"
  ↑        ↑
  in dict? YES ✓
           Remaining: "code"
           Can we break "code"?
           "code" in dict? YES ✓
           Complete! Return true ✓

Option 2: Take "lee" (index 0 to 2)
  "lee" | "tcode"
  ↑       ↑
  in dict? YES ✓
          Remaining: "tcode"
          Can we break "tcode"?
          No valid segmentation ❌
          Backtrack and try other options
```

### The Pattern: Decision Tree

**Core Insight:**
```
At each position i in string:
  Try all possible words that START from position i
  For each valid word:
    Check if remaining string can be segmented
    If yes → return true
    If no → try next word
  If no word works → return false
```

**Visual Example:**
```
s = "leetcode"
dict = ["leet", "code", "lee"]

Start at index 0:
  ┌─────────────────────────────────────┐
  │ Try all words starting at index 0   │
  └─────────────────────────────────────┘
           │
    ┌──────┴──────┬──────────┐
    │             │          │
  "leet"        "lee"      "l"
  (0-3) ✓      (0-2) ✓    (not in dict) ❌
    │             │
    ↓             ↓
remaining:    remaining:
"code"        "tcode"
Can break?    Can break?
  YES ✓         NO ❌
    │
Return true!
```

**Why Recursion?**
```
wordBreak("leetcode") =
  if ("leet" in dict):
    return wordBreak("code")  → Recursive call!

wordBreak("code") =
  if ("code" in dict):
    return wordBreak("")      → Base case!

wordBreak("") = true (empty string always breakable)
```

---

## Approach 1: Recursion (Brute Force)

### Prerequisites (Agar Koi Chahiye):
- **Recursion basics**: Base case + recursive case
- **String operations**: `substring()`, `startsWith()`

### Intuition (Soch):

**Core Idea:**
```
For each position i (0 to n):
  Try every word in dictionary
  If word matches s[i...i+word.length]:
    Recursively check remaining string
    If remaining can be broken → return true
  If no word works → return false

Base case:
  If we've reached end of string → return true
```

**Example Walkthrough:**
```
s = "leetcode", dict = ["leet", "code"]

wordBreak(0):  // Start from index 0
  Try "leet": s[0:4] = "leet" ✓ matches!
    → wordBreak(4)  // Check from index 4

  wordBreak(4):  // Start from index 4
    Try "code": s[4:8] = "code" ✓ matches!
      → wordBreak(8)  // Check from index 8

    wordBreak(8):  // index 8 == length
      → return true (base case: reached end!)

  Returns: true ✓
```

### Algorithm (Step by Step):

```
Function wordBreak(s, wordDict, start):
  BASE CASE:
  if (start === s.length):
    return true  // Reached end, successful segmentation!

  RECURSIVE CASE:
  for word in wordDict:
    // Check if word matches at current position
    if (s.startsWith(word, start)):
      // Try breaking remaining string
      if (wordBreak(s, wordDict, start + word.length)):
        return true  // Found valid segmentation!

  return false  // No word works from this position
```

### Why This Works?

**Complete Exploration:**
```typescript
// We try EVERY word at EVERY position
for (const word of wordDict) {
  if (s.startsWith(word, start)) {
    // Recursively check remaining
  }
}
```

**Early Termination:**
```typescript
// As soon as we find valid segmentation, return
if (wordBreak(s, wordDict, start + word.length)) {
  return true;  // Stop searching!
}
```

### Complexity Analysis

**Time Complexity: O(2^n)**

**Why?**
- At each position, we try all words in dictionary
- Each word leads to a new recursive call
- In worst case, creates a binary tree of height n
- Total recursive calls: 2^n

**Example:**
```
s = "aaaa", dict = ["a", "aa"]

wordBreak(0):
  Try "a" → wordBreak(1)
    Try "a" → wordBreak(2)
      Try "a" → wordBreak(3)
        Try "a" → wordBreak(4) → true
      Try "aa" → wordBreak(4) → true
    Try "aa" → wordBreak(3)
      Try "a" → wordBreak(4) → true
  Try "aa" → wordBreak(2)
    Try "a" → wordBreak(3)
      Try "a" → wordBreak(4) → true
    Try "aa" → wordBreak(4) → true

Exponential branches!
```

**Space Complexity: O(n)**

**Why?**
- Recursion depth: O(n) in worst case (one character at a time)
- No additional data structures

**In simple terms:**
```
For "leetcode" (8 chars):
Worst case: Try all possible segmentations = 2^8 = 256 attempts!
```

---

## Approach 2: Recursion + Memoization (Better)

### Prerequisites (Agar Koi Chahiye):
- **Recursion**: Understanding recursive calls
- **Memoization**: Caching results to avoid recomputation
- **Hash Map/Array**: For storing computed results

### Intuition (Soch):

**Problem with Brute Force:**
```
s = "aaaa", dict = ["a", "aa"]

We compute wordBreak(2) multiple times:

Path 1: wordBreak(0) → "a" → wordBreak(1) → "a" → wordBreak(2)
Path 2: wordBreak(0) → "aa" → wordBreak(2)

wordBreak(2) computed TWICE! Redundant work!
```

**Key Insight: Overlapping Subproblems**
```
Same subproblem (starting index) solved multiple times
Solution: Cache results!

memo[i] = Can we break s[i...n]?
  - true: yes, can break
  - false: no, cannot break
  - undefined: not computed yet
```

**Optimization:**
```
Before computing wordBreak(i):
  if (memo[i] !== undefined):
    return memo[i]  // Use cached result!

After computing:
  memo[i] = result
  return result
```

### Algorithm (Step by Step):

```
Function wordBreak(s, wordDict):
  memo = new Map()  // or Array

  return helper(0)

  Function helper(start):
    BASE CASE:
    if (start === s.length):
      return true

    MEMOIZATION CHECK:
    if (memo.has(start)):
      return memo[start]  // Return cached result

    RECURSIVE CASE:
    for word in wordDict:
      if (s.startsWith(word, start)):
        if (helper(start + word.length)):
          memo[start] = true
          return true

    memo[start] = false  // Cache negative result too!
    return false
```

### Visual Example:

```
s = "leetcode", dict = ["leet", "code", "lee"]

Recursion Tree (with memoization):

wordBreak(0):
  Try "leet": ✓
    → wordBreak(4) [NOT in memo]
      Try "code": ✓
        → wordBreak(8) → true
      memo[4] = true
      return true
  memo[0] = true
  return true

If we had another path to wordBreak(4):
  → Check memo[4] = true ✓ (No recomputation!)
```

### Complexity Analysis

**Time Complexity: O(n² × m)**

**Why?**
- **n positions** in string (0 to n-1)
- Each position computed **once** (memoization)
- For each position, check **all words** in dictionary
- Each word check: O(m) where m = average word length

**Detailed:**
```
n = string length
d = dictionary size
m = average word length

Without memo: O(2^n)
With memo:
  - Unique subproblems: n
  - For each: try d words
  - Each word: O(m) to check
  Total: O(n × d × m) ≈ O(n² × m) if d ≈ n
```

**Space Complexity: O(n)**

**Why?**
- Memoization map: O(n) entries (one per index)
- Recursion stack: O(n) depth

**In simple terms:**
```
For "leetcode" (8 chars):
Brute force: 2^8 = 256 calls
With memo: 8 calls (one per index) ✓
Huge improvement!
```

---

## Approach 3: Dynamic Programming - Bottom-Up (Optimal)

### Prerequisites (Agar Koi Chahiye):
- **Dynamic Programming**: Building solutions bottom-up
- **DP Table**: Understanding state transitions
- **Iteration**: Building solution iteratively

### Intuition (Soch):

**Core Idea:**
```
Instead of recursion (top-down), build solution bottom-up!

dp[i] = Can we break s[0...i]?

Base case:
  dp[0] = true (empty string can always be broken)

Transition:
  For each position i:
    For each word in dictionary:
      If word ends at position i:
        If s[0...i-word.length] can be broken:
          Then s[0...i] can be broken!
```

**Visual Example:**
```
s = "leetcode", dict = ["leet", "code"]

Build dp array:

Index:  0  1  2  3  4  5  6  7  8
String:    l  e  e  t  c  o  d  e
dp:     T  ?  ?  ?  ?  ?  ?  ?  ?

i=1: Can we form s[0:1] = "l"?
  No word matches → dp[1] = false

i=2: Can we form s[0:2] = "le"?
  No word matches → dp[2] = false

i=3: Can we form s[0:3] = "lee"?
  No word matches → dp[3] = false

i=4: Can we form s[0:4] = "leet"?
  Try "leet": s[0:4] = "leet" ✓
    Check dp[0] = true ✓
    → dp[4] = true ✓

i=5: Can we form s[0:5] = "leetc"?
  No valid word → dp[5] = false

i=6: Can we form s[0:6] = "leetco"?
  No valid word → dp[6] = false

i=7: Can we form s[0:7] = "leetcod"?
  No valid word → dp[7] = false

i=8: Can we form s[0:8] = "leetcode"?
  Try "code": s[4:8] = "code" ✓
    Check dp[4] = true ✓
    → dp[8] = true ✓

Final: dp[8] = true → Return true!
```

### Algorithm (Step by Step):

```
Function wordBreak(s, wordDict):
  n = s.length
  dp = Array(n + 1).fill(false)
  dp[0] = true  // Base case: empty string

  // Build dp table from left to right
  for i from 1 to n:
    // Try each word in dictionary
    for word in wordDict:
      wordLen = word.length

      // Check if word can end at position i
      if (i >= wordLen):
        // Check if word matches at position [i-wordLen, i]
        if (s.substring(i - wordLen, i) === word):
          // Check if prefix can be broken
          if (dp[i - wordLen]):
            dp[i] = true
            break  // Found valid segmentation!

  return dp[n]
```

### Alternative Approach (Check All Previous Positions):

```
Function wordBreak(s, wordDict):
  n = s.length
  dp = Array(n + 1).fill(false)
  dp[0] = true
  wordSet = new Set(wordDict)  // O(1) lookup

  for i from 1 to n:
    // Try all possible split points
    for j from 0 to i-1:
      // If s[0...j] can be broken
      // AND s[j...i] is a valid word
      if (dp[j] && wordSet.has(s.substring(j, i))):
        dp[i] = true
        break

  return dp[n]
```

### DP Table Walkthrough:

```
s = "applepenapple", dict = ["apple", "pen"]

Index:  0  1  2  3  4  5  6  7  8  9  10 11 12 13
String:    a  p  p  l  e  p  e  n  a  p  p  l  e
dp:     T  F  F  F  F  T  F  F  T  F  F  F  F  T
        ↑              ↑        ↑              ↑
     empty          apple    apple+pen    apple+pen+apple

Why dp[5] = true?
  s[0:5] = "apple"
  "apple" in dict ✓
  dp[0] = true ✓
  → dp[5] = true ✓

Why dp[8] = true?
  s[5:8] = "pen"
  "pen" in dict ✓
  dp[5] = true ✓
  → dp[8] = true ✓

Why dp[13] = true?
  s[8:13] = "apple"
  "apple" in dict ✓
  dp[8] = true ✓
  → dp[13] = true ✓
```

### Complexity Analysis

**Time Complexity: O(n² × m)** or **O(n³)** depending on implementation

**Why?**
```
Outer loop: n iterations
Inner loop:
  Option 1: Check all words in dict → d iterations
            Each check: O(m) substring comparison
            Total: O(n × d × m)

  Option 2: Check all previous positions → n iterations
            Each check: O(n) substring creation/comparison
            Total: O(n × n × n) = O(n³)

With Set for O(1) lookup: O(n² × m) or O(n³)
```

**Space Complexity: O(n + d × m)**

**Why?**
- dp array: O(n)
- wordSet (if used): O(d × m) where d = dict size, m = avg word length
- Total: O(n + d × m)

**In simple terms:**
```
For "leetcode" (8 chars):
Check all positions: 8
For each position: check all previous (1+2+...+8 = 36 checks)
Much better than 2^8 = 256!
```

---

## Comparison Table

| Approach | Time | Space | Pros | Cons |
|----------|------|-------|------|------|
| **Brute Force Recursion** | O(2^n) | O(n) | Simple to understand | Too slow, exponential |
| **Recursion + Memo** | O(n² × m) | O(n) | Fast, intuitive | Recursion depth limit |
| **Dynamic Programming** | O(n² × m) | O(n + d×m) | No recursion limit, optimal | Slightly more complex |

**Legend:**
- n = string length
- d = dictionary size
- m = average word length

---

## Edge Cases

```typescript
// 1. Empty string
s = "", wordDict = ["a"]
Output: true
Reason: Empty string is always breakable (base case)

// 2. Empty dictionary
s = "a", wordDict = []
Output: false
Reason: No words to use

// 3. Single character
s = "a", wordDict = ["a"]
Output: true

// 4. Word reuse multiple times
s = "aaaa", wordDict = ["a"]
Output: true
Reason: "a" + "a" + "a" + "a" (reuse allowed!)

// 5. Word reuse but can't complete
s = "aaab", wordDict = ["a"]
Output: false
Reason: Can't form "b" from dictionary

// 6. Multiple valid segmentations
s = "catsanddog", wordDict = ["cat", "cats", "and", "sand", "dog"]
Output: true
Reason: "cats" + "and" + "dog" ✓

// 7. No valid segmentation
s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
Reason: "og" can't be formed

// 8. Long word at end
s = "aaaaaaa", wordDict = ["aaaa", "aaa"]
Output: true
Reason: "aaaa" + "aaa" ✓ (7 = 4 + 3)

// 9. Overlapping words don't help
s = "ab", wordDict = ["a", "b", "ab"]
Output: true
Reason: Direct match "ab" or "a" + "b"
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Not handling word reuse

```typescript
// WRONG!
const used = new Set();
for (const word of wordDict) {
  if (!used.has(word)) {  // Don't mark as used!
    used.add(word);
  }
}
// Problem: Can't reuse words! But problem allows it
```

✅ **Correct:**
```typescript
// Words can be used unlimited times
for (const word of wordDict) {
  // Just check if word matches, don't track usage
  if (s.startsWith(word, start)) {
    // Use it!
  }
}
```

### ❌ Mistake 2: Wrong DP transition

```typescript
// WRONG!
dp[i] = wordDict.includes(s.substring(0, i));
// Problem: Only checks if ENTIRE prefix is single word
//          Doesn't check segmentation!

// Example: s = "leetcode", dict = ["leet", "code"]
// dp[8] checks if "leetcode" in dict → false ❌
// But correct answer is true (leet + code)
```

✅ **Correct:**
```typescript
// Check if we can form s[0...i] by segmentation
for (let j = 0; j < i; j++) {
  if (dp[j] && wordDict.includes(s.substring(j, i))) {
    dp[i] = true;
    break;
  }
}
```

### ❌ Mistake 3: Not caching negative results in memoization

```typescript
// WRONG!
function helper(start) {
  if (memo.has(start)) return memo[start];

  for (const word of wordDict) {
    if (s.startsWith(word, start)) {
      if (helper(start + word.length)) {
        memo.set(start, true);
        return true;
      }
    }
  }
  // Missing: memo.set(start, false)
  return false;  // Not cached!
}
```

✅ **Correct:**
```typescript
function helper(start) {
  if (memo.has(start)) return memo[start];

  for (const word of wordDict) {
    if (s.startsWith(word, start)) {
      if (helper(start + word.length)) {
        memo.set(start, true);
        return true;
      }
    }
  }

  memo.set(start, false);  // Cache negative result too!
  return false;
}
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Can words be reused?"**
   → Yes, same word can appear multiple times

2. **"Is the string case-sensitive?"**
   → Yes, "Apple" ≠ "apple"

3. **"Can the dictionary be empty?"**
   → Yes, return false if empty

4. **"What if string is empty?"**
   → Return true (empty string is breakable)

### Approach Explanation

```
"I'll solve this using Dynamic Programming:

1. Create dp array where dp[i] = can we break s[0...i]
2. Base case: dp[0] = true (empty string)
3. For each position i:
   - Try all previous positions j
   - If dp[j] is true AND s[j...i] is in dictionary
   - Then dp[i] = true
4. Return dp[n]

Time: O(n² × m) where m is average word length
Space: O(n) for dp array

Optimization: Use Set for O(1) dictionary lookup"
```

### Follow-up Questions

**Q1:** "What if you need to return the actual segmentation, not just boolean?"

**A1:**
```typescript
// Store parent pointers in DP
const parent = Array(n + 1).fill(-1);

if (dp[j] && wordSet.has(substring)) {
  dp[i] = true;
  parent[i] = j;  // Store where we came from
}

// Reconstruct path
function reconstruct(parent, s, n) {
  const result = [];
  let i = n;
  while (i > 0) {
    const j = parent[i];
    result.unshift(s.substring(j, i));
    i = j;
  }
  return result;
}
```

**Q2:** "What if you need to return ALL possible segmentations?"

**A2:** "Use backtracking to explore all paths, similar to brute force but with memoization to cache intermediate results."

**Q3:** "How to optimize for very large strings?"

**A3:**
```
1. Use Trie for dictionary (faster prefix matching)
2. Early termination if no word starts with current prefix
3. Sliding window to check only reasonable word lengths
4. Parallel processing for independent subproblems
```

---

## Summary

**Problem Type**: String Segmentation / Dynamic Programming

**Core Pattern**:
```typescript
dp[i] = Can we break s[0...i]?

Base: dp[0] = true

Transition:
  for i from 1 to n:
    for j from 0 to i:
      if (dp[j] && s[j...i] in dict):
        dp[i] = true
```

**Key Points:**
- Words can be reused unlimited times
- Need to check ALL possible segmentations
- DP optimal: O(n²) positions to check
- Memoization works well for recursive approach
- Set lookup faster than array search

**Complexity:**
- Time: O(n² × m) or O(n³)
- Space: O(n)

**Next Steps**: Ready for solution.ts! 🚀

Kaunsa approach dekhna hai? Recursion + Memoization ya DP?