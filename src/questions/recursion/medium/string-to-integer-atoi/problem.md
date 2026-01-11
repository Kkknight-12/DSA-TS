# String to Integer (atoi)

**Difficulty**: Medium
**Topics**: String, Recursion, Parsing
**LeetCode**: [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

---

## Problem Statement

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function).

### Algorithm Steps:

1. **Whitespace**: Ignore any leading whitespace (" ")
2. **Signedness**: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present
3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of string is reached. If no digits were read, then result is 0
4. **Rounding**: If the integer is out of the 32-bit signed integer range [-2³¹, 2³¹ - 1], then clamp the integer to remain in range

### Examples:

**Example 1:**
```
Input: s = "42"
Output: 42
Explanation: No whitespace, no sign, read "42"
```

**Example 2:**
```
Input: s = "   -042"
Output: -42
Explanation: Skip whitespace, negative sign, read "042" (leading zeros ignored)
```

**Example 3:**
```
Input: s = "1337c0d3"
Output: 1337
Explanation: Read "1337", stop at 'c' (non-digit)
```

**Example 4:**
```
Input: s = "0-1"
Output: 0
Explanation: Read "0", stop at '-' (non-digit after starting)
```

**Example 5:**
```
Input: s = "words and 987"
Output: 0
Explanation: First character 'w' is non-digit, no conversion possible
```

**Example 6:**
```
Input: s = "-91283472332"
Output: -2147483648
Explanation: Number is less than -2³¹, clamp to -2147483648
```

### Constraints:
- `0 <= s.length <= 200`
- `s` consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'

---

## Approach 1: Recursive Solution

**Prerequisites (Agar Koi Chahiye):**
- **Recursion basics**: Understanding base case, recursive case, and call stack
- **Why needed**: Since we're practicing recursion, we'll solve this problem recursively even though iterative is more natural

**Intuition (Soch):**

String parsing ko recursively kaise karenge? Simple!

**Key Insight**: Har recursion call ek character process karegi:
1. Whitespace characters? Recursively skip karo
2. Sign character (+/-)? Store karo aur next character par recursive call
3. Digit character? Result ko build karte jao recursively
4. Non-digit? Stop (base case)

**Recursive Structure:**
```
myAtoi(s):
  1. Skip whitespace recursively
  2. Handle sign
  3. Recursively build number digit-by-digit
  4. Check overflow at each step
```

**Visual Example**: `"  -042"`

```
Call 1: myAtoi("  -042", index=0)
        Character = ' ' (whitespace)
        Action: Skip, call myAtoi(index=1)
        ↓

Call 2: myAtoi("  -042", index=1)
        Character = ' ' (whitespace)
        Action: Skip, call myAtoi(index=2)
        ↓

Call 3: myAtoi("  -042", index=2)
        Character = '-' (sign)
        Action: Store sign=-1, call myAtoi(index=3)
        ↓

Call 4: myAtoi("  -042", index=3)
        Character = '0' (digit)
        Action: result = 0, call myAtoi(index=4)
        ↓

Call 5: myAtoi("  -042", index=4)
        Character = '4' (digit)
        Action: result = 0*10 + 4 = 4, call myAtoi(index=5)
        ↓

Call 6: myAtoi("  -042", index=5)
        Character = '2' (digit)
        Action: result = 4*10 + 2 = 42, call myAtoi(index=6)
        ↓

Call 7: myAtoi("  -042", index=6)
        index >= length (base case)
        Return: 42

Unwind with sign: 42 * (-1) = -42 ✓
```

**Algorithm:**
1. **Base case**: If index reaches end of string, return accumulated result
2. **Recursive case for whitespace**: If current char is space, recursively process next index
3. **Recursive case for sign**: If +/-, store sign and recursively process next index
4. **Recursive case for digits**: If digit, add to result and recursively process next index
5. **Base case for non-digit**: Return accumulated result

**Time Complexity**: O(n) - each character processed once
**Space Complexity**: O(n) - recursion call stack depth

**Edge Cases:**
- Leading whitespaces: `"   42"` → 42
- Multiple signs: `"+-42"` → 0 (second sign is non-digit)
- Overflow: `"91283472332"` → 2147483647
- Underflow: `"-91283472332"` → -2147483648
- No digits: `"words"` → 0
- Leading zeros: `"00042"` → 42

---

## Approach 2: Iterative Solution (More Natural)

**Prerequisites (Agar Koi Chahiye):**
- **String parsing**: Understanding how to iterate through strings
- **Integer overflow detection**: Checking before multiplying to prevent overflow
- **Why needed**: This is the standard approach for string-to-integer conversion

**Intuition (Soch):**

String parsing is naturally iterative! Hum ek-ek character read karte jao:

1. **Whitespace skip**: Loop chalaao jab tak space milta rahe
2. **Sign detection**: Ek baar check karo +/- hai kya
3. **Digit extraction**: Loop mein digits read karo and number build karo
4. **Overflow handling**: Har step par check karo overflow ho raha hai kya

**Key Insight**: Loop mein clearly 3 phases hain:
- Phase 1: Whitespace skip (while loop)
- Phase 2: Sign check (if condition)
- Phase 3: Digit processing (while loop)

**Visual Example**: `"  -042"`

```
String: "  -042"
Index:   0123456

Phase 1: Skip whitespace
  i=0: ' ' → skip
  i=1: ' ' → skip
  i=2: '-' → not space, exit loop

Phase 2: Sign detection
  i=2: '-' → sign = -1, i++

Phase 3: Digit processing
  i=3: '0' → result = 0*10 + 0 = 0
  i=4: '4' → result = 0*10 + 4 = 4
  i=5: '2' → result = 4*10 + 2 = 42
  i=6: end → exit loop

Final: 42 * (-1) = -42 ✓
```

**Algorithm:**
1. Initialize `result = 0`, `sign = 1`, `i = 0`
2. Skip leading whitespace: `while (s[i] == ' ') i++`
3. Check for sign: `if (s[i] == '-' or '+') { sign = ...; i++; }`
4. Process digits:
   ```
   while (i < n && isDigit(s[i])):
     digit = s[i] - '0'
     // Check overflow before multiplying
     if (result > INT_MAX/10 || (result == INT_MAX/10 && digit > 7)):
       return sign == 1 ? INT_MAX : INT_MIN
     result = result * 10 + digit
     i++
   ```
5. Return `result * sign`

**Overflow Detection**:
```
INT_MAX = 2147483647 = 2^31 - 1
INT_MIN = -2147483648 = -2^31

Before doing: result = result * 10 + digit

Check:
  if result > INT_MAX / 10:           // 214748364
    → overflow will happen

  if result == INT_MAX / 10 && digit > 7:
    → result*10 + digit > 2147483647
    → overflow!
```

**Time Complexity**: O(n) - single pass through string
**Space Complexity**: O(1) - only using constant extra space

**Edge Cases:** (Same as recursive)

---

## Comparison Table

| Aspect | Recursive | Iterative |
|--------|-----------|-----------|
| **Prerequisites** | Recursion basics | String parsing, overflow detection |
| **Approach** | Multiple recursive calls | Single loop |
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | O(n) - call stack | O(1) - constant space |
| **Readability** | Complex state management | Clear sequential logic |
| **Performance** | Slower (function call overhead) | Faster (no call stack) |
| **Stack Overflow Risk** | Yes (for very long strings) | No |
| **Practical Use** | Educational/recursion practice | Industry standard |
| **Code Length** | Longer (helper functions) | Shorter (single function) |

---

## Which Approach to Use?

**Use Recursive approach when:**
- Practicing recursion concepts
- Educational purposes
- Problem explicitly requires recursion

**Use Iterative approach when:**
- Production code
- Performance matters
- String length could be large
- Industry interviews (expected solution)

**Recommendation**: In real interviews, use **Iterative approach**. It's simpler, more efficient, and expected.

---

## Edge Cases to Handle

1. **Empty string**: `""` → 0
2. **Only whitespace**: `"   "` → 0
3. **Only sign**: `"+"` → 0
4. **Leading zeros**: `"00042"` → 42
5. **Overflow positive**: `"2147483648"` → 2147483647
6. **Overflow negative**: `"-2147483649"` → -2147483648
7. **Sign after digit**: `"0-1"` → 0
8. **Multiple signs**: `"+-12"` → 0
9. **Letters before digits**: `"words 987"` → 0
10. **Mixed characters**: `"4193 with words"` → 4193

---

## Key Points to Remember

1. **Whitespace**: Only LEADING whitespace is ignored
2. **Sign**: Can appear only once, immediately after whitespace
3. **Digits**: Stop reading at FIRST non-digit character
4. **Leading zeros**: Ignored in result but count as valid digits
5. **Overflow**: Must check BEFORE multiplication to avoid overflow
6. **No digits read**: Return 0

---

## Interview Tips

### What to say to interviewer:

"This is a string parsing problem with specific rules. I'll break it into phases:
1. Skip whitespace
2. Handle optional sign
3. Process digits with overflow checking
4. Return clamped result

For overflow, I'll check before multiplying to avoid integer overflow."

### Common follow-up questions:

**Q: Why check overflow before multiplication?**
A: If we multiply first, we might overflow during calculation. By checking beforehand, we can return early.

**Q: Can there be whitespace in the middle?**
A: No, we stop at the first non-digit after starting digit processing.

**Q: What about floating point numbers?**
A: This problem ignores decimal points - "3.14" returns 3.

### Mistakes to avoid:

❌ Not handling leading whitespace
❌ Allowing multiple signs
❌ Continuing after first non-digit
❌ Overflow detection after multiplication (too late!)
❌ Not clamping to INT_MIN/INT_MAX

---

Which approach would you like to see implemented first? 🤔

1. **Recursive** - For recursion practice
2. **Iterative** - Industry standard approach
