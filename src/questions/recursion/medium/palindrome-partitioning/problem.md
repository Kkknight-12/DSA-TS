# Palindrome Partitioning

## Problem Statement (Hinglish mein)

[gemini](https://gemini.google.com/gem/9013c4cd97d5/dba2b79204a982b3)

**Kya karna hai?**
- Tumhe ek string `s` diya gaya hai
- **Partition** karo string ko aise ki **har substring palindrome** ho
- Return karo **all possible palindrome partitions**
- Order matter nahi karta

**What is Partition?**
```
String: "aab"

Partition 1: ["a", "a", "b"]
  - "a" is palindrome ✓
  - "a" is palindrome ✓
  - "b" is palindrome ✓
  Valid! ✓

Partition 2: ["aa", "b"]
  - "aa" is palindrome ✓
  - "b" is palindrome ✓
  Valid! ✓

Invalid: ["aab"]
  - "aab" is NOT palindrome ❌
  Invalid! ❌
```

**Example:**
```
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Explanation:
All possible partitions:
1. "a" | "a" | "b" → all palindromes ✓
2. "a" | "ab" → "ab" not palindrome ❌
3. "aa" | "b" → all palindromes ✓
4. "aab" → not palindrome ❌

Valid: [["a","a","b"], ["aa","b"]]
```

**Key Points:**
1. **Every substring** must be a palindrome
2. **All partitions** chahiye (complete search)
3. **Minimum 1 partition** (single character always palindrome)
4. **Maximum n partitions** (each character separate)

---

## Prerequisites (Agar Koi Chahiye)

**Basic Concepts:**
- **Backtracking**: Explore all partitions, backtrack if invalid
- **Palindrome Check**: Two pointer technique or DP
- **String Slicing**: Extract substrings
- **Recursion**: Process string part by part

---

## Intuition (Soch) 🤔

### The Challenge: Find All Valid Partitions

**Example:**
```
String: "aab"
Index:  0 1 2

Start from index 0, try all possible first substrings:

Option 1: Take "a" (index 0 to 0)
  "a" | "ab"
      ↑ cut after taking "a"
  isPalindrome("a")? YES ✓
  Remaining: "ab" (index 1 to 2)

    Now from index 1, try substrings:

    Option 1a: Take "a" (index 1 to 1)
      "a" | "b"
          ↑ cut after taking "a"
      isPalindrome("a")? YES ✓
      Remaining: "b" (index 2)

        From index 2: Take "b"
        "b" (index 2 to 2)
        isPalindrome("b")? YES ✓
        Remaining: "" (reached end!)

        Complete partition: ["a", "a", "b"] ✓

    Option 1b: Take "ab" (index 1 to 2)
      "ab"
      isPalindrome("ab")? NO ❌
      Skip this branch!

Option 2: Take "aa" (index 0 to 1)
  "aa" | "b"
       ↑ cut after taking "aa"
  isPalindrome("aa")? YES ✓
  Remaining: "b" (index 2)

    From index 2: Take "b"
    "b" (index 2 to 2)
    isPalindrome("b")? YES ✓
    Remaining: "" (reached end!)

    Complete partition: ["aa", "b"] ✓

Option 3: Take "aab" (index 0 to 2)
  "aab"
  isPalindrome("aab")? NO ❌
  Skip!

Final Result: [["a","a","b"], ["aa","b"]]
```

### The Pattern: Backtracking with Palindrome Check

**At each position:**
1. **Try** all possible substrings from current position
2. **Check** if substring is palindrome
3. **If yes**: Add to partition, recurse for remaining string
4. **If no**: Skip this substring
5. **Backtrack**: Remove last added substring, try next

```
               partition(0, "aab", [])
                /          |         \
          "a"✓            "aa"✓      "aab"❌
             /               |
    partition(1,"ab",[a])  partition(2,"b",[aa])
       /        \             |
    "a"✓      "ab"❌        "b"✓
      /                       |
partition(2,"b",[a,a])   partition(3,"",[aa,b])
     |                         |
   "b"✓                     Complete!
     |                    Result: ["aa","b"]
partition(3,"",[a,a,b])
     |
 Complete!
Result: ["a","a","b"]
```

---

## Approach 1: Backtracking (Optimal)

### Prerequisites (Agar Koi Chahiye):
- **Backtracking Pattern**: Build partition incrementally
- **Palindrome Check**: Two pointer technique
- **String manipulation**: Substring extraction

### Intuition (Soch):

**Key Insight:**
```
For each position in string:
  Try all possible substrings starting from that position
  If substring is palindrome:
    Add to current partition
    Recurse for remaining string
    Backtrack (remove from partition)

Base case: Reached end of string → valid partition found!
```

### Visual Tree

```
Input: s = "aab"

                    backtrack(start=0, current=[])
                              |
                    Try substrings from index 0
                    /          |         \
              s[0:1]="a"   s[0:2]="aa"  s[0:3]="aab"
              palindrome✓  palindrome✓  NOT palindrome❌
                   /            |              \
         backtrack(1,[a])  backtrack(2,[aa])   SKIP!
                 |                |
       Try from index 1    Try from index 2
         /         \              |
    s[1:2]="a"  s[1:3]="ab"   s[2:3]="b"
    palindrome✓  NOT pal❌    palindrome✓
       /            \              |
backtrack(2,[a,a]) SKIP!    backtrack(3,[aa,b])
      |                           |
Try from index 2              start===length
      |                       Complete! ✓
  s[2:3]="b"                  result.push(["aa","b"])
  palindrome✓
      |
backtrack(3,[a,a,b])
      |
  start===length
  Complete! ✓
  result.push(["a","a","b"])

Final: [["a","a","b"], ["aa","b"]]
```

### Algorithm (Step by Step)

```
Function partition(s):
  1. result = []
  2. current = []
  3. Start backtracking: backtrack(0, current, s, result)
  4. Return result

Function backtrack(start, current, s, result):
  BASE CASE:
  if (start === s.length):
    // We've processed entire string
    // Current partition is valid
    result.push([...current])
    return

  RECURSIVE CASE:
  Loop from i = start to s.length - 1:
    // Extract substring from start to i+1
    substring = s.substring(start, i + 1)

    // Check if palindrome
    if (isPalindrome(substring)):
      // PICK: Add to partition
      current.push(substring)

      // RECURSE: Process remaining string
      backtrack(i + 1, current, s, result)

      // BACKTRACK: Remove from partition
      current.pop()

Function isPalindrome(str):
  left = 0
  right = str.length - 1

  while (left < right):
    if (str[left] !== str[right]):
      return false
    left++
    right--

  return true
```

### Why This Works?

**Complete exploration:**
```typescript
// We try every possible substring at each position
for (let i = start; i < s.length; i++) {
  const substring = s.substring(start, i + 1);
  // This tries:
  // start=0: "a", "aa", "aab"
  // start=1: "a", "ab"
  // start=2: "b"
}
```

**Only valid partitions:**
```typescript
// We only recurse if substring is palindrome
if (isPalindrome(substring)) {
  current.push(substring);
  backtrack(i + 1, current, s, result);
  current.pop();
}
```

### Complexity Analysis

**Time Complexity: O(n × 2^n)**

**Why?**
- Total partitions: 2^(n-1) in worst case
  - For string of length n, we have n-1 positions to cut
  - Each position: cut or don't cut
  - Total: 2^(n-1) ways
- For each partition: O(n) to copy to result
- Palindrome check: O(n) per substring
- Total: O(n × 2^n)

**In simple terms:**
```
For s = "aaa":
- Possible partitions:
  ["a","a","a"]
  ["a","aa"]
  ["aa","a"]
  ["aaa"]
  Total: 4 partitions

For s = "aaaa":
- More partitions (2^3 = 8 ways to partition)

Each partition needs palindrome checks
```

**Space Complexity: O(n)**

**Why?**
1. **Recursion Stack**: O(n)
   - Maximum depth = n (one character per call)
2. **Current Array**: O(n)
   - Maximum n substrings
3. **Result**: Not counted (output)

---

## Approach 2: Backtracking with DP (Optimized)

### Prerequisites (Agar Koi Chahiye):
- **Dynamic Programming**: Pre-compute palindrome checks
- **2D DP Table**: Store palindrome results

### Intuition (Soch):

**Problem with Approach 1:**
- We check same substrings multiple times
- Example: "aa" checked multiple times in "aaa"

**Solution:**
- Pre-compute all palindrome checks using DP
- Store in 2D table: `dp[i][j]` = is s[i...j] palindrome?

### Algorithm (Step by Step)

```
Function partition(s):
  1. Build DP table:
     dp[i][j] = true if s[i...j] is palindrome

  2. Use backtracking with DP lookup (O(1) palindrome check)

Function buildDP(s):
  n = s.length
  dp = 2D array [n][n]

  // Every single character is palindrome
  for i from 0 to n-1:
    dp[i][i] = true

  // Check substrings of length 2
  for i from 0 to n-2:
    dp[i][i+1] = (s[i] === s[i+1])

  // Check longer substrings
  for length from 3 to n:
    for i from 0 to n-length:
      j = i + length - 1
      dp[i][j] = (s[i] === s[j] && dp[i+1][j-1])

  return dp
```

### Complexity Analysis

**Time Complexity: O(n × 2^n)**
- DP preprocessing: O(n²)
- Backtracking: O(n × 2^n)
- Total: O(n × 2^n)

**Space Complexity: O(n²)**
- DP table: O(n²)
- Recursion: O(n)
- Total: O(n²)

---

## Comparison of Approaches

```
┌──────────────────┬────────────────┬──────────────────┬─────────────┐
│ Approach         │ Time           │ Space            │ Palindrome  │
├──────────────────┼────────────────┼──────────────────┼─────────────┤
│ Backtracking     │ O(n × 2^n)     │ O(n)             │ O(n) check  │
│ Backtrack + DP   │ O(n × 2^n)     │ O(n²)            │ O(1) lookup │
└──────────────────┴────────────────┴──────────────────┴─────────────┘
```

**Recommendation:**
- For small strings (n ≤ 16): Backtracking is fine
- For repeated palindrome checks: DP optimization better

---

## Dry Run Example

**Input:** `s = "aab"`

```
Initial: result = [], current = []

┌──────────────────────────────────────────────────────────────────┐
│ CALL 1: backtrack(start=0, current=[])                          │
├──────────────────────────────────────────────────────────────────┤
│ Base case? start === length? 0 === 3? NO                        │
│                                                                  │
│ Loop from i=0 to 2                                              │
│                                                                  │
│ ┌─ i=0: substring = s[0:1] = "a" ────────────────────┐         │
│ │ isPalindrome("a")? YES ✓                            │         │
│ │ current.push("a") → current = ["a"]                │         │
│ │ Recurse: backtrack(1, ["a"], "aab", result)       │         │
│ │   ↓                                                 │         │
│ │   ┌─────────────────────────────────────────────────┐        │
│ │   │ CALL 2: backtrack(start=1, current=["a"])      │        │
│ │   ├─────────────────────────────────────────────────┤        │
│ │   │ Base case? 1 === 3? NO                         │        │
│ │   │                                                 │        │
│ │   │ Loop from i=1 to 2                              │        │
│ │   │                                                 │        │
│ │   │ ┌─ i=1: substring = "a" ──────────┐           │        │
│ │   │ │ isPalindrome("a")? YES ✓         │           │        │
│ │   │ │ current = ["a","a"]              │           │        │
│ │   │ │ Recurse: backtrack(2, ["a","a"])│           │        │
│ │   │ │   ↓                               │           │        │
│ │   │ │   CALL 3: backtrack(2, ["a","a"])│          │        │
│ │   │ │   Base case? 2 === 3? NO         │           │        │
│ │   │ │                                   │           │        │
│ │   │ │   i=2: substring = "b"          │           │        │
│ │   │ │   isPalindrome("b")? YES ✓       │           │        │
│ │   │ │   current = ["a","a","b"]       │           │        │
│ │   │ │   Recurse: backtrack(3,["a","a","b"])       │        │
│ │   │ │     ↓                             │           │        │
│ │   │ │     CALL 4: backtrack(3,["a","a","b"])      │        │
│ │   │ │     Base case? 3 === 3? YES! ✓  │           │        │
│ │   │ │     result.push(["a","a","b"])   │           │        │
│ │   │ │     result = [["a","a","b"]] ✓  │           │        │
│ │   │ │     return                        │           │        │
│ │   │ │                                   │           │        │
│ │   │ │   current.pop() → ["a","a"]     │           │        │
│ │   │ │   return                          │           │        │
│ │   │ │                                   │           │        │
│ │   │ │ current.pop() → ["a"]            │           │        │
│ │   │ └───────────────────────────────────┘           │        │
│ │   │                                                 │        │
│ │   │ ┌─ i=2: substring = "ab" ──────────┐          │        │
│ │   │ │ isPalindrome("ab")?               │          │        │
│ │   │ │ "a" !== "b" → NO ❌              │          │        │
│ │   │ │ SKIP! (don't recurse)            │          │        │
│ │   │ └───────────────────────────────────┘          │        │
│ │   │                                                 │        │
│ │   │ Loop done, return                               │        │
│ │   └─────────────────────────────────────────────────┘        │
│ │                                                     │         │
│ │ current.pop() → []                                 │         │
│ └─────────────────────────────────────────────────────┘         │
│                                                                  │
│ ┌─ i=1: substring = s[0:2] = "aa" ───────────────────┐         │
│ │ isPalindrome("aa")?                                 │         │
│ │ "a" === "a" → YES ✓                                │         │
│ │ current.push("aa") → current = ["aa"]              │         │
│ │ Recurse: backtrack(2, ["aa"], "aab", result)      │         │
│ │   ↓                                                 │         │
│ │   CALL 5: backtrack(start=2, current=["aa"])       │         │
│ │   Base case? 2 === 3? NO                           │         │
│ │                                                     │         │
│ │   i=2: substring = "b"                             │         │
│ │   isPalindrome("b")? YES ✓                         │         │
│ │   current = ["aa","b"]                             │         │
│ │   Recurse: backtrack(3, ["aa","b"])                │         │
│ │     ↓                                               │         │
│ │     CALL 6: backtrack(3, ["aa","b"])               │         │
│ │     Base case? 3 === 3? YES! ✓                    │         │
│ │     result.push(["aa","b"])                        │         │
│ │     result = [["a","a","b"], ["aa","b"]] ✓        │         │
│ │     return                                          │         │
│ │                                                     │         │
│ │   current.pop() → ["aa"]                           │         │
│ │   return                                            │         │
│ │                                                     │         │
│ │ current.pop() → []                                 │         │
│ └─────────────────────────────────────────────────────┘         │
│                                                                  │
│ ┌─ i=2: substring = s[0:3] = "aab" ──────────────────┐         │
│ │ isPalindrome("aab")?                                │         │
│ │ left=0:'a', right=2:'b'                            │         │
│ │ "a" !== "b" → NO ❌                                │         │
│ │ SKIP! (don't recurse)                              │         │
│ └─────────────────────────────────────────────────────┘         │
│                                                                  │
│ Loop done, return                                               │
└──────────────────────────────────────────────────────────────────┘

Final Result: [["a","a","b"], ["aa","b"]]
Total: 2 valid partitions
```

---

## Edge Cases

```typescript
// 1. Single character
s = "a"
Output: [["a"]]
Reason: Only one way to partition

// 2. All same characters (palindrome)
s = "aaa"
Output: [["a","a","a"], ["a","aa"], ["aa","a"], ["aaa"]]
Reason: All substrings are palindromes!

// 3. No palindrome substrings > 1
s = "abc"
Output: [["a","b","c"]]
Reason: No multi-character palindromes

// 4. Entire string is palindrome
s = "aba"
Output: [["a","b","a"], ["aba"]]
Reason: Can take whole or split

// 5. Multiple palindromes
s = "aabb"
Output: [["a","a","b","b"], ["a","a","bb"], ["aa","b","b"], ["aa","bb"]]
Reason: Multiple valid partitions
```

---

## Common Mistakes (Galtiyan)

### ❌ Mistake 1: Wrong substring extraction

```typescript
// WRONG!
const substring = s.substring(start, i); // Missing +1!
// This gives wrong substring
```

✅ **Correct:**
```typescript
const substring = s.substring(start, i + 1);
// substring(start, end) - end is exclusive
```

### ❌ Mistake 2: Not copying current array

```typescript
// WRONG!
if (start === s.length) {
  result.push(current); // Reference issue!
}
// Later modifications affect this!
```

✅ **Correct:**
```typescript
if (start === s.length) {
  result.push([...current]); // Copy array
}
```

### ❌ Mistake 3: Forgetting to backtrack

```typescript
// WRONG!
if (isPalindrome(substring)) {
  current.push(substring);
  backtrack(i + 1, current, s, result);
  // Missing pop()!
}
```

✅ **Correct:**
```typescript
if (isPalindrome(substring)) {
  current.push(substring);
  backtrack(i + 1, current, s, result);
  current.pop(); // Backtrack!
}
```

---

## Interview Tips 💡

### Clarification Questions

1. **"Can the string be empty?"**
   → No, constraints say 1 ≤ s.length

2. **"Are there special characters?"**
   → No, only lowercase English letters

3. **"Does order matter in result?"**
   → No, any order is fine

4. **"What's the maximum string length?"**
   → 16 (small enough for backtracking)

### Approach Explanation

```
"I'll use backtracking to explore all partitions:

1. At each position, try all possible substrings
2. Check if substring is palindrome (two pointers)
3. If yes, add to partition and recurse for rest
4. Base case: reached end → valid partition
5. Backtrack to try other partitions

Time: O(n × 2^n) - 2^n partitions, O(n) each
Space: O(n) - recursion depth

For optimization, can use DP to pre-compute palindromes."
```

### Follow-up Questions

**Q1:** "How would you optimize palindrome checking?"
**A1:** "Pre-compute using DP. Build 2D table where dp[i][j] = is s[i...j] palindrome. Takes O(n²) space but O(1) lookup."

**Q2:** "What if we only want the minimum cuts?"
**A2:** "That's Palindrome Partitioning II - different problem using DP to find minimum cuts needed."

**Q3:** "Can you do this iteratively?"
**A3:** "Possible using stack to simulate recursion, but recursive solution is cleaner and more intuitive."

---

## Summary

**Problem Type**: Backtracking with Substring Exploration

**Core Pattern**:
```typescript
function backtrack(start, current, s, result) {
  // Base case: reached end
  if (start === s.length) {
    result.push([...current]);
    return;
  }

  // Try all substrings from start
  for (let i = start; i < s.length; i++) {
    const substring = s.substring(start, i + 1);

    if (isPalindrome(substring)) {
      current.push(substring);
      backtrack(i + 1, current, s, result);
      current.pop();
    }
  }
}

function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++; right--;
  }
  return true;
}
```

**Key Points:**
- Try all possible partitions at each position
- Only recurse if substring is palindrome
- Backtrack to explore other options
- Base case: reached end of string

**Complexity:**
- Time: O(n × 2^n)
- Space: O(n) or O(n²) with DP

**Next Steps**: Ready for solution.ts! 🚀

Kaunsa approach implement karein? Backtracking (simple) ya Backtracking + DP (optimized)?