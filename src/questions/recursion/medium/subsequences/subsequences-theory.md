# Subsequences - Complete Theory aur Patterns

**Topics**: Recursion, Backtracking, Dynamic Programming
**Source**: Take You Forward (Striver)

---

## Subsequences Kya Hain?

**Subsequence** ek sequence hai jo original sequence se derive hota hai kuch elements ko delete karke, **lekin bache hue elements ka order change nahi hota**.

**Important:**
- Elements **consecutive** (side-by-side) hone zaroori nahi
- Order **maintain** karna zaroori hai
- Empty subsequence bhi valid hai

### Example:

String `"abc"` ke subsequences:

```
Original: "abc"

Subsequences (sabhi possible):
  ""      - empty (sab delete kar diye)
  "a"     - b aur c delete
  "b"     - a aur c delete
  "c"     - a aur b delete
  "ab"    - c delete
  "ac"    - b delete
  "bc"    - a delete
  "abc"   - kuch delete nahi kiya

Total: 8 subsequences (including empty)
       7 subsequences (excluding empty)
```

### Visual Representation:

```
       "abc"
      /     \
   "abc"   "ab"  (c skip kiya)
   /   \   /  \
"abc" "ab" "ab" "a" (b skip kiya)
  |    |    |    |
"abc" "ab" "ac" "a" "bc" "b" "c" "" (a skip kiya)
```

---

## Total Subsequences Formula

**Array/String of length `n` ke liye:**

```
Total subsequences = 2^n
```

**Including empty:**  2^n
**Excluding empty:** 2^n - 1

### Kyun 2^n?

Har element ke liye **2 choices** hain:
1. **Pick** (Include) - Element ko le lo
2. **Not Pick** (Exclude) - Element ko skip karo

```
Element 1: 2 choices (pick/not pick)
Element 2: 2 choices (pick/not pick)
Element 3: 2 choices (pick/not pick)
...
Element n: 2 choices (pick/not pick)

Total = 2 × 2 × 2 × ... (n times) = 2^n
```

### Example:

```
String "ab" (length = 2)
Total = 2^2 = 4

       ""
      /  \
    a     ""  (a not pick)
   / \    / \
 "ab" "a" "b" ""

Subsequences: ["ab", "a", "b", ""]  ✓ 4 total
```

---

## Subsequence vs Substring

Ye dono different concepts hain!

| Feature | Subsequence | Substring |
|---------|------------|-----------|
| **Definition** | Elements ko skip kar sakte ho, order maintain | Elements **consecutive** (continuous) hone chahiye |
| **Order** | Maintain karna zaroori hai | Naturally maintained (continuous hai) |
| **Total count** | 2^n | n(n+1)/2 |
| **Example (from "abcde")** | "ace" ✓ (b,d skip kiye) | "abc" ✓ (continuous) |
| | "aec" ✗ (order change hua) | "acd" ✗ (not continuous) |

### Visual Example: "abc"

**Subsequences (2^3 = 8):**
```
"abc", "ab", "ac", "bc", "a", "b", "c", ""
```

**Substrings (3×4/2 = 6):**
```
"abc", "ab", "bc", "a", "b", "c"
```

**Notice:**
- `"ac"` subsequence hai ✓, lekin substring nahi ✗
- Empty `""` subsequence hai ✓, lekin usually substring count mein nahi ✗

### Detailed Comparison:

```
String: "abcde"

Subsequence "ace":
  a b c d e
  ↓   ↓   ↓
  a   c   e  ✓ Valid (order maintained, elements skipped)

Substring "bcd":
  a b c d e
    ↓ ↓ ↓
    b c d  ✓ Valid (continuous)

Invalid subsequence "aec":
  a b c d e
  ↓     ↓ ↓
  a     e c  ✗ Invalid (e pehle, c baad mein - order change!)

Invalid substring "ace":
  a b c d e
  ↓   ↓   ↓
  a   c   e  ✗ Invalid (not continuous, b aur d missing)
```

---

## Recursive Structure: "Pick or Not Pick" Pattern

Ye **fundamental pattern** hai subsequences generate karne ka!

### Template:

```
function generateSubsequences(index, current, arr, n):
    // BASE CASE: Saare elements process ho gaye
    if index == n:
        print/store current
        return

    // RECURSIVE CASE 1: Pick current element
    current.add(arr[index])
    generateSubsequences(index + 1, current, arr, n)
    current.removeLast()  // Backtrack

    // RECURSIVE CASE 2: Not Pick current element
    generateSubsequences(index + 1, current, arr, n)
```

### Example: Generate subsequences of [1,2]

```
                    index=0, current=[]
                          |
              ┌───────────┴───────────┐
              │                       │
         Pick 1                   Not Pick 1
              │                       │
       index=1, [1]            index=1, []
              |                       |
        ┌─────┴─────┐           ┌─────┴─────┐
        │           │           │           │
    Pick 2      Not Pick 2  Pick 2      Not Pick 2
        │           │           │           │
    index=2     index=2     index=2     index=2
    [1,2]       [1]         [2]         []
      ✓          ✓           ✓           ✓

Subsequences: [[1,2], [1], [2], []]
```

### Code Example (TypeScript):

```typescript
function generateSubsequences(
  index: number,
  current: number[],
  arr: number[],
  result: number[][]
): void {
  // BASE CASE
  if (index === arr.length) {
    result.push([...current]); // Copy add karo
    return;
  }

  // PICK current element
  current.push(arr[index]);
  generateSubsequences(index + 1, current, arr, result);
  current.pop(); // Backtrack

  // NOT PICK current element
  generateSubsequences(index + 1, current, arr, result);
}
```

---

## Patterns aur Problems Based on Subsequences

### 1. **Generate All Subsequences**

**Problem:** Array/String ke sabhi subsequences generate karo

**Approach:** Pick/Not Pick pattern (upar bataya)

**Example:**
```
Input: [1,2,3]
Output: [[1,2,3], [1,2], [1,3], [1], [2,3], [2], [3], []]
```

**Time:** O(2^n × n) - 2^n subsequences, har ek copy O(n)
**Space:** O(n) - recursion depth

**Humne solve kiya:** ✅ **Subsets problem**

---

### 2. **Count Subsequences with Specific Property**

**Problem:** Kitne subsequences hain jinka sum = target?

**Approach:** Pick/Not Pick, lekin count maintain karo

**Example:**
```
Input: arr = [1,2,1], target = 2
Output: 2

Subsequences with sum 2:
  [2]     → sum = 2 ✓
  [1,1]   → sum = 2 ✓

Total: 2 subsequences
```

**Code Pattern:**
```typescript
function countSubsequences(index: number, sum: number, target: number): number {
  if (index === n) {
    return sum === target ? 1 : 0;
  }

  // Pick
  const pick = countSubsequences(index + 1, sum + arr[index], target);

  // Not Pick
  const notPick = countSubsequences(index + 1, sum, target);

  return pick + notPick;
}
```

---

### 3. **Print Subsequences with Sum = K**

**Problem:** Sabhi subsequences print karo jinka sum = K

**Example:**
```
Input: arr = [1,2,1], K = 2
Output: [[2], [1,1]]
```

**Code Pattern:**
```typescript
function printSubsequences(
  index: number,
  current: number[],
  sum: number,
  K: number
): void {
  if (index === arr.length) {
    if (sum === K) {
      print(current);
    }
    return;
  }

  // Pick
  current.push(arr[index]);
  printSubsequences(index + 1, current, sum + arr[index], K);
  current.pop();

  // Not Pick
  printSubsequences(index + 1, current, sum, K);
}
```

---

### 4. **Longest Increasing Subsequence (LIS)**

**Problem:** Longest subsequence find karo jisme elements increasing order mein hon

**Example:**
```
Input: [10,9,2,5,3,7,101,18]
Output: 4

LIS: [2,3,7,101] (length = 4)
Other LIS: [2,5,7,101] (length = 4)
```

**Approach:** Dynamic Programming (recursion se optimize)

**Time:** O(n²) basic DP, O(n log n) optimized

---

### 5. **Subsequences with K Elements**

**Problem:** Sirf K elements wale subsequences generate karo

**Example:**
```
Input: arr = [1,2,3], K = 2
Output: [[1,2], [1,3], [2,3]]
```

**Approach:** Pick/Not Pick with count parameter

```typescript
function generateKSubsequences(
  index: number,
  current: number[],
  count: number,
  K: number
): void {
  // BASE CASE
  if (count === K) {
    result.push([...current]);
    return; // Aur elements nahi chahiye
  }

  if (index === arr.length) {
    return; // Elements khatam but K nahi hua
  }

  // Pick (agar abhi bhi K tak pahunchne ka chance hai)
  if (arr.length - index >= K - count) {
    current.push(arr[index]);
    generateKSubsequences(index + 1, current, count + 1, K);
    current.pop();
  }

  // Not Pick
  generateKSubsequences(index + 1, current, count, K);
}
```

---

## Problems Humne Already Solve Kiye

### 1. ✅ **Subsets (Power Set)**
```
File: src/questions/recursion/medium/subsets/
Pattern: Pick/Not Pick
Input: [1,2,3]
Output: All 2^3 = 8 subsets
```

### 2. ✅ **Generate Binary Strings**
```
File: src/questions/recursion/medium/generate-binary-strings/
Pattern: Include '0' or '1' at each position
Input: n = 3
Output: All 2^3 = 8 binary strings
```

### 3. ✅ **Generate Parentheses**
```
File: src/questions/recursion/medium/generate-parentheses/
Pattern: Pick/Not Pick with constraints
Input: n = 3
Output: 5 valid combinations (Catalan number)
```

**Notice:** Sabhi mein **Pick/Not Pick** pattern hai! 🎯

---

## Use Cases in Problem Solving

### 1. **Subset Sum Problems**
```
Given: Array aur target sum
Find: Kya koi subset hai jiska sum = target?

Pattern: Pick/Not Pick with sum tracking
```

### 2. **Count Subsequences with Given Sum**
```
Given: Array aur target sum
Find: Kitne subsequences ka sum = target?

Pattern: Pick/Not Pick with count return
```

### 3. **Dynamic Programming on Subsequences**

**Classic DP problems:**
- **LIS** (Longest Increasing Subsequence)
- **LCS** (Longest Common Subsequence)
- **Count Palindromic Subsequences**
- **Edit Distance**

**Pattern:** Build DP table, reference previous states

### 4. **Bitmasking Based Optimizations**

**Idea:** Har subsequence ko binary number se represent karo

```
Array: [1,2,3]
Subsequence [1,3]:
  Bit representation: 101
  Bit 0 set → include arr[0] = 1
  Bit 1 not set → skip arr[1] = 2
  Bit 2 set → include arr[2] = 3

Code:
for (let mask = 0; mask < (1 << n); mask++) {
  let subsequence = [];
  for (let i = 0; i < n; i++) {
    if (mask & (1 << i)) {
      subsequence.push(arr[i]);
    }
  }
  // Process subsequence
}
```

**Time:** O(2^n × n) - same as recursion, but iterative

---

## Time & Space Complexity

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| **Generate All Subsequences** | O(2^n × n) | O(n) | 2^n subsequences, har ek O(n) copy |
| **Check for Specific Sum** | O(2^n) | O(n) | Sirf check karna hai, store nahi |
| **Count Subsequences** | O(2^n) | O(n) | Count return karte hain |
| **LIS (Basic DP)** | O(n²) | O(n) | DP table |
| **LIS (Optimized)** | O(n log n) | O(n) | Binary search use karke |
| **Bitmasking Approach** | O(2^n × n) | O(1) | Iterative, extra space nahi |

### Important Notes:

**Exponential Complexity:**
- Generating all subsequences: **O(2^n)** - exponential hai!
- **Small n** ke liye hi practical (usually n ≤ 20)
- n = 20 → 2^20 = 1,048,576 subsequences (manageable)
- n = 30 → 2^30 = 1,073,741,824 subsequences (bahut zyada!)

**Space Complexity:**
- Recursion depth: **O(n)** (maximum n calls stack pe)
- Current array: **O(n)** (maximum n elements)
- Output storage: **O(2^n × n)** (ye usually count nahi karte)

---

## Common Patterns Summary

### Pattern 1: Generate All
```typescript
function generate(index, current) {
  if (index === n) {
    result.push([...current]);
    return;
  }

  current.push(arr[index]);  // Pick
  generate(index + 1, current);
  current.pop();              // Backtrack

  generate(index + 1, current); // Not Pick
}
```

### Pattern 2: Count with Condition
```typescript
function count(index, sum, target): number {
  if (index === n) {
    return sum === target ? 1 : 0;
  }

  const pick = count(index + 1, sum + arr[index], target);
  const notPick = count(index + 1, sum, target);

  return pick + notPick;
}
```

### Pattern 3: Print with Condition
```typescript
function print(index, current, sum, target) {
  if (index === n) {
    if (sum === target) {
      console.log(current);
    }
    return;
  }

  current.push(arr[index]);
  print(index + 1, current, sum + arr[index], target);
  current.pop();

  print(index + 1, current, sum, target);
}
```

### Pattern 4: First/Any Valid Subsequence
```typescript
function findFirst(index, current, sum, target): boolean {
  if (index === n) {
    if (sum === target) {
      console.log(current);
      return true; // Found! Stop exploring
    }
    return false;
  }

  // Pick
  current.push(arr[index]);
  if (findFirst(index + 1, current, sum + arr[index], target)) {
    return true; // Found in this path
  }
  current.pop();

  // Not Pick
  return findFirst(index + 1, current, sum, target);
}
```

---

## Interview Tips

### What to Say:

*"Subsequences generate karne ke liye main Pick/Not Pick pattern use karunga. Har element ke liye 2 choices hain - use include karu ya skip karu. Order maintain rakhna zaroori hai. Base case tab hit hogi jab saare elements process ho jayein. Backtracking zaroori hai taaki dono paths (pick aur not pick) explore kar sakein. Time complexity exponential hogi O(2^n) kyunki total 2^n subsequences possible hain."*

### Common Follow-ups:

**Q: Subsequence aur substring mein difference?**
A: Subsequence mein elements skip kar sakte hain but order maintain. Substring continuous hona chahiye. Total subsequences = 2^n, substrings = n(n+1)/2.

**Q: Space optimize kar sakte ho?**
A: Recursion depth toh O(n) hi rahega. Agar sirf count chahiye (store nahi), toh O(n) space sufficient hai. Output space O(2^n) hai jo avoid nahi kar sakte.

**Q: Kya iteratively kar sakte ho?**
A: Haan, bitmasking use karke. 0 se 2^n-1 tak loop, har bit check karo. Time same O(2^n × n), lekin iterative hai.

**Q: n bahut bada ho toh?**
A: Exponential complexity ki wajah se n ≤ 20 practical hai. Bade n ke liye DP ya greedy approach sochna padega (LIS jaise problems).

---

## Key Takeaways

1. **Subsequence = Pick/Not Pick Pattern**
   - Har element ke liye decision: include ya skip
   - Order hamesha maintain

2. **Total Count = 2^n**
   - Including empty subsequence
   - Exponential growth

3. **Subsequence ≠ Substring**
   - Subsequence: skip allowed, order maintained
   - Substring: continuous, no skipping

4. **Backtracking Zaroori**
   - Pick kiya → explore → pop() → not pick explore

5. **Practical Limit: n ≤ 20**
   - Exponential complexity
   - Bade n ke liye optimize approaches

6. **Common Problems:**
   - Subset Sum
   - Count with condition
   - LIS/LCS (DP)
   - Generate all/specific subsequences

---

## Related Problems to Practice

1. **Subset Sum** - Kya sum = target possible hai?
2. **Partition Equal Subset Sum** - Array ko 2 equal sum parts mein divide
3. **Count Subsequences with Sum K** - Kitne subsequences ka sum = K?
4. **Longest Increasing Subsequence** - Classic DP
5. **Longest Common Subsequence** - Two arrays compare
6. **Print All Subsequences** - Generate karo
7. **Combination Sum** - Repetition allowed variation
8. **Palindromic Subsequences** - Count/find palindromes

**Pattern:** Sabhi mein Pick/Not Pick base pattern hai, bas conditions aur return values different hain! 🎯

---

## Conclusion

**Subsequences** recursion aur backtracking ki foundation hai. **Pick/Not Pick** pattern samajh liya toh bahut saare problems solve ho jayenge!

**Remember:**
- Order maintain → Subsequence
- 2^n possible → Exponential
- Backtracking → Explore both paths
- Small n only → Practical limit

Happy Learning! 🚀