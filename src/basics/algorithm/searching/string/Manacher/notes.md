## Notion Link
[Notion notes for Manacher Algorithm](https://www.notion.so/Manacher-28da2680896880c2ab9fd3985f2ccefc)

---
We'll break down **Manacher's Algorithm** step-by-step, using simple language and analogies.

Let's start with the big picture.

### The Problem: Finding the Longest Palindromic Substring

Imagine you have a string and you want to find the longest palindrome (a word or phrase that reads the same forwards and backwards) hidden inside it.

- **Text:** `"babad"`
- **Goal:** Find the longest palindromic substring

The answer could be `"bab"` or `"aba"` (both are length 3).

---

### Step 1: The "Naive" or "Simple" Approach

Before we understand the cleverness of Manacher's algorithm, let's see how simpler approaches would work.

**Approach 1: Brute Force (O(n³))**

Check every substring to see if it's a palindrome.

**Approach 2: Expand Around Center (O(n²))**

For each position, treat it as the center of a potential palindrome and expand outward.

**How Expand Around Center works:**

```
Text: "babad"

Center at index 0 ('b'):
  Expand: can't go left
  Result: "b" (length 1)

Center at index 1 ('a'):
  Expand: 'b' on left, 'b' on right → match!
  Expand more: can't, different characters
  Result: "bab" (length 3)

Center at index 2 ('b'):
  Expand: 'a' on left, 'a' on right → match!
  Expand more: 'b' on left, 'd' on right → mismatch!
  Result: "aba" (length 3)
```

**The Problem with Expand Around Center:**

1. You have to expand from *every* position
2. You also need to check for *even-length* palindromes separately (center between characters)
3. You're doing redundant work - if you already found a palindrome, you might be re-checking parts of it

Manacher's goal is to **avoid this redundant expansion**. It's smarter about using previously computed information.

---

### Step 2: The Challenge - Even vs Odd Length Palindromes

This is a tricky aspect of palindrome problems:

- **Odd length:** `"aba"` - has a clear center character ('b')
- **Even length:** `"abba"` - has no single center character (center is between the two 'b's)

This means you typically need to handle these two cases separately, making the code complex.

Manacher's algorithm has a brilliant trick to solve this!

---

### Step 3: The Manacher "Aha!" Moment

**The core idea: Transform the string to make ALL palindromes odd-length!**

How? By inserting a special character (like `#`) between every character.

**Transformation:**

```
Original:  b  a  b  a  d
           ↓  ↓  ↓  ↓  ↓
Modified:  # b # a # b # a # d #
```

**Why does this work?**

- Odd palindrome `"aba"` → `"#a#b#a#"` (still odd, length 7)
- Even palindrome `"abba"` → `"#a#b#b#a#"` (now odd, length 9)

Now every palindrome has a clear center, and we can use a single, uniform approach!

---

### Step 4: The Magic Tool - Reusing Previous Information

This is the heart of Manacher's algorithm. Just like KMP uses the LPS array to avoid re-scanning the text, Manacher's uses previously found palindromes to avoid re-expanding.

**Key Variables:**

- `P[i]` = The **radius** of the palindrome centered at position `i` in the modified string
- `C` = The **center** of the palindrome that reaches farthest to the right
- `R` = The **right boundary** of that palindrome (`R = C + P[C]`)
  - **Why this formula?** A palindrome centered at `C` with radius `P[C]` extends `P[C]` positions to the left and `P[C]` positions to the right
  - So the rightmost position it covers is `C + P[C]`
  - **Example:** If `C = 5` and `P[5] = 3`, the palindrome spans from index 2 to index 8
    - Left boundary: `5 - 3 = 2`
    - Right boundary: `5 + 3 = 8` (this is `R`)
  - **Note:** When updating R in the code, we use `R = i + P[i]` and `C = i`, which maintains the relationship `R = C + P[C]`

**The clever part:**

When we're at position `i`, if `i` is within the boundary `R` of a previously found palindrome centered at `C`, we can use **symmetry**!

```
        L           C           R
        |-----------|-----------|
                mirror i
```

Position `i` has a **mirror** position on the left side of `C`. If we already know the palindrome radius at the mirror position, we can use it as a starting point for position `i`!

**Mirror formula:**

```
mirror = 2*C - i
```

**Why?** Because `C` is exactly in the middle, so the distance from `C` to `mirror` equals the distance from `C` to `i`.

**Starting radius formula:**

```
P[i] = (i < R) ? min(R - i, P[mirror]) : 0
```

**Why min(R - i, P[mirror])?**

1. `P[mirror]` tells us the palindrome radius at the mirror position
2. But we can only *guarantee* symmetry up to the boundary `R`
3. `R - i` is the remaining distance to the boundary
4. We take the **minimum** because that's the guaranteed part
5. After that, we try to expand further

---

### Step 5: Putting It All Together - The Manacher Search

Let's trace through the algorithm with an example.

**Text:** `"babad"`

**Step 1: Transform**

```
Original:  b  a  b  a  d
Modified:  # b # a # b # a # d #
Index:     0 1 2 3 4 5 6 7 8 9 10
```

**Step 2: Initialize**

```
P[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // radius array
C = 0    // center of rightmost palindrome
R = 0    // right boundary
```

**Step 3: Iterate**

We'll trace the most illustrative iterations here to understand the key concepts (i=1, i=3, i=5). These demonstrate the core mechanics: initial expansion, large palindrome discovery, and the mirror optimization. For a complete step-by-step walkthrough of all 11 iterations, see the Dry Run table below.

**Key iterations:**

**i = 1 (character 'b'):**
- `i >= R`, so start from `P[1] = 0`
- Expand: left='#', right='#' → match! `P[1] = 1`
- Expand: out of bounds
- Update: `C = 1`, `R = 2`

**i = 3 (character 'a'):**
- `i > R`, so start from `P[3] = 0`
- Expand: left='#', right='#' → match! `P[3] = 1`
- Expand: left='b', right='b' → match! `P[3] = 2`
- Expand: left='#', right='#' → match! `P[3] = 3`
- Expand: out of bounds
- Update: `C = 3`, `R = 6`
- **Found palindrome `"#b#a#b#"` → original `"bab"`**

**i = 5 (character 'b'):**
- `i < R` (5 < 6), so use mirror!
- `mirror = 2*3 - 5 = 1`
- `P[5] = min(R - i, P[mirror]) = min(6-5, 1) = 1`
- Expand from radius 1: left='a', right='a' → match! `P[5] = 2`
- Expand: left='#', right='#' → match! `P[5] = 3`
- Expand: left='b', right='d' → mismatch! Stop.
- Update: `C = 5`, `R = 8`
- **Found palindrome `"#a#b#a#"` → original `"aba"`**

**Final P array:**

```
Modified:  # b # a # b # a # d #
Index:     0 1 2 3 4 5 6 7 8 9 10
P[]:       0 1 0 3 0 3 0 2 0 1 0
               ↑     ↑
              "bab" "aba"
```

**Step 4: Find the Answer**

Find the maximum value in `P[]`:
- `max(P) = 3` at indices 3 and 5

**Step 5: Convert Back to Original String**

For index `centerIndex` with radius `maxLen`:

```
start = (centerIndex - maxLen) / 2
length = maxLen
```

For index 3: `start = (3 - 3) / 2 = 0`, `length = 3` → `"bab"`

For index 5: `start = (5 - 3) / 2 = 1`, `length = 3` → `"aba"`

Notice how the text pointer `i` **never moves backward** and we **minimize redundant expansions** by using the mirror property. This is why Manacher's is so efficient!

---

### Summary and Analogy

- **Expand Around Center:** Like checking every single house on a street to see if it has a mirror-image garden. You walk to each house and look left and right from scratch.
- **Manacher's Approach:** Like a smart surveyor who marks houses with special flags. When you reach a new house, you look back and think, "Hmm, I'm within a known symmetrical zone. The house across the midpoint had a 5-meter garden. I can start by assuming I have at least that much, then check if there's more." You save time by using what you already measured.

### Complexity

- **Time Complexity:** **O(n)**, where n is the length of the original string. Even though there's a `while` loop for expansion inside the main loop, each character can only be examined a constant number of times across the entire algorithm due to the right boundary `R` always moving forward.
- **Space Complexity:** **O(n)**, to store the transformed string and the `P[]` array.

This is a huge improvement over Expand Around Center (O(n²)) and Brute Force (O(n³)).

---

We'll implement Manacher's algorithm in TypeScript. The logic is identical for JavaScript.

### The Code

Manacher's algorithm has these main parts:

1. **Transform the string:** Add `#` between characters
2. **Compute palindrome radii:** Build the `P[]` array using the mirror property
3. **Extract the result:** Convert back to the original string

Here is the complete, commented code:

```tsx
/**
 * Implements Manacher's Algorithm to find the longest palindromic substring.
 * @param s The input string.
 * @returns The longest palindromic substring.
 */
function longestPalindrome(s: string): string {
    if (s.length === 0) return "";
    if (s.length === 1) return s;

    // Step 1: Transform the string
    // Insert '#' between characters to make all palindromes odd-length
    const modifiedString = "#" + s.split("").join("#") + "#";
    const n = modifiedString.length;

    // Step 2: Initialize variables
    const P: number[] = new Array(n).fill(0); // P[i] = radius of palindrome at i
    let C = 0; // Center of the palindrome with the rightmost boundary
    let R = 0; // Right boundary of the palindrome centered at C

    let maxLen = 0; // Maximum palindrome radius found
    let centerIndex = 0; // Center index of the longest palindrome

    // Step 3: Iterate through the modified string
    for (let i = 0; i < n; i++) {
        // Step 3a: Use mirror property if i is within R
        if (i < R) {
            const mirror = 2 * C - i; // Mirror position of i with respect to C
            // P[i] is at least the minimum of:
            // - P[mirror]: the radius at the mirror position
            // - R - i: remaining distance to the right boundary
            P[i] = Math.min(R - i, P[mirror]);
        }
        // If i >= R, we start from 0 (which is already the default)

        // Step 3b: Try to expand the palindrome centered at i
        // We start from P[i] + 1 (the next potential matching pair)
        while (
            i + P[i] + 1 < n && // Right side within bounds
            i - P[i] - 1 >= 0 && // Left side within bounds
            modifiedString[i + P[i] + 1] === modifiedString[i - P[i] - 1] // Characters match
        ) {
            P[i]++;
        }

        // Step 3c: Update C and R if the current palindrome extends beyond R
        if (i + P[i] > R) {
            C = i;
            R = i + P[i];
        }

        // Step 3d: Track the maximum palindrome found
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }

    // Step 4: Convert back to the original string
    // In the modified string, a palindrome of radius r centered at index c
    // corresponds to a substring of length r in the original string
    // starting at position (c - r) / 2
    const start = Math.floor((centerIndex - maxLen) / 2);
    const length = maxLen;

    return s.substring(start, start + length);
}

// --- Example Usage ---
const text = "babad";
const result = longestPalindrome(text);

console.log(`Text: ${text}`);
console.log(`Longest Palindromic Substring: ${result}`);
// Expected Output: "bab" or "aba"

const text2 = "cbbd";
const result2 = longestPalindrome(text2);
console.log(`\nText: ${text2}`);
console.log(`Longest Palindromic Substring: ${result2}`);
// Expected Output: "bb"
```

---

### Code Explanation

### String Transformation

```tsx
const modifiedString = "#" + s.split("").join("#") + "#";
```

- **Purpose:** Convert `"babad"` → `"#b#a#b#a#d#"`
- This makes all palindromes odd-length, so we have a uniform approach
- `split("")` breaks the string into characters, `join("#")` inserts `#` between them

### Main Loop: Computing P[i]

```tsx
for (let i = 0; i < n; i++) {
```

For each position in the modified string, we compute the palindrome radius.

### Using the Mirror Property

```tsx
if (i < R) {
    const mirror = 2 * C - i;
    P[i] = Math.min(R - i, P[mirror]);
}
```

- **Condition:** If `i` is within the current rightmost palindrome boundary `R`
- **Mirror:** Find the mirror position of `i` with respect to center `C`
- **Optimization:** Use `P[mirror]` as a starting point, but cap it at `R - i` (the guaranteed symmetrical part)
- This avoids redundant character comparisons!

### Expanding the Palindrome

```tsx
while (
    i + P[i] + 1 < n &&
    i - P[i] - 1 >= 0 &&
    modifiedString[i + P[i] + 1] === modifiedString[i - P[i] - 1]
) {
    P[i]++;
}
```

- Start expanding from `P[i] + 1` (the next character pair)
- Check boundaries and character matches
- Increment the radius `P[i]` for each successful expansion

### Updating C and R

```tsx
if (i + P[i] > R) {
    C = i;
    R = i + P[i];
}
```

- If the current palindrome extends beyond the previous `R`, update the center and boundary
- This ensures we always track the palindrome that reaches farthest right

### Tracking the Maximum

```tsx
if (P[i] > maxLen) {
    maxLen = P[i];
    centerIndex = i;
}
```

- Keep track of the longest palindrome found so far

### Converting Back to Original String

```tsx
const start = Math.floor((centerIndex - maxLen) / 2);
const length = maxLen;
return s.substring(start, start + length);
```

- The modified string has `#` characters at even indices
- A palindrome of radius `r` at index `c` in the modified string corresponds to:
  - Start position in original: `(c - r) / 2`
  - Length in original: `r`

---

### Dry Run

Let's trace the algorithm with our example.

- **Text:** `"babad"`
- **Modified:** `"#b#a#b#a#d#"`
- **Length:** `11`

| i | char | C | R | i<R? | mirror | P[mir] | P[i] init | Expand | P[i] final | New C | New R | maxLen | center | Explanation |
|---|------|---|---|------|--------|--------|-----------|--------|------------|-------|-------|--------|--------|-------------|
| 0 | # | 0 | 0 | NO | - | - | 0 | No | 0 | 0 | 0 | 0 | 0 | Boundary, can't expand left |
| 1 | b | 0 | 0 | NO | - | - | 0 | '#'='#' ✓ | 1 | 1 | 2 | 1 | 1 | Found "#b#", radius 1 |
| 2 | # | 1 | 2 | YES | 0 | 0 | 0 | 'b'≠'a' ✗ | 0 | 1 | 2 | 1 | 1 | Mirror helped, no expand |
| 3 | a | 1 | 2 | NO | - | - | 0 | '#'='#' ✓, 'b'='b' ✓, '#'='#' ✓ | 3 | 3 | 6 | 3 | 3 | Found "#b#a#b#", radius 3 |
| 4 | # | 3 | 6 | YES | 2 | 0 | 0 | 'a'≠'b' ✗ | 0 | 3 | 6 | 3 | 3 | Mirror = 0, no expand |
| 5 | b | 3 | 6 | YES | 1 | 1 | 1 | 'a'='a' ✓, '#'='#' ✓, 'b'≠'d' ✗ | 3 | 5 | 8 | 3 | 5 | Mirror gave us head start! |
| 6 | # | 5 | 8 | YES | 4 | 0 | 0 | 'b'≠'a' ✗ | 0 | 5 | 8 | 3 | 5 | Mirror = 0, no expand |
| 7 | a | 5 | 8 | YES | 3 | 3 | 1 | '#'='#' ✓, 'b'≠'d' ✗ | 2 | 5 | 8 | 3 | 5 | Capped at R-i=1, expanded by 1 |
| 8 | # | 5 | 8 | YES | 2 | 0 | 0 | 'a'≠'d' ✗ | 0 | 5 | 8 | 3 | 5 | Mirror = 0, no expand |
| 9 | d | 5 | 8 | NO | - | - | 0 | '#'='#' ✓ | 1 | 9 | 10 | 3 | 5 | Found "#d#", radius 1 |
| 10 | # | 9 | 10 | YES | 8 | 0 | 0 | No | 0 | 9 | 10 | 3 | 5 | Boundary, can't expand right |

**Final Results:**

```
Modified:  # b # a # b # a # d #
Index:     0 1 2 3 4 5 6 7 8 9 10
P[]:       0 1 0 3 0 3 0 2 0 1 0
```

**Longest palindrome:**
- `centerIndex = 5`, `maxLen = 3`
- OR `centerIndex = 3`, `maxLen = 3` (both valid)

**For centerIndex = 5:**
- `start = (5 - 3) / 2 = 1`
- `length = 3`
- Result: `s.substring(1, 4) = "aba"`

**For centerIndex = 3:**
- `start = (3 - 3) / 2 = 0`
- `length = 3`
- Result: `s.substring(0, 3) = "bab"`

Both are correct answers!

---

# Doubts

```jsx
Q1: Why do we use Math.min(R - i, P[mirror])?

A: Great question! This is the core optimization of Manacher's algorithm.

When we're at position i and i < R (meaning i is inside a known palindrome),
we know that the region from C to R is palindromic.

The mirror position reflects the properties of i:
- P[mirror] tells us the palindrome radius at the mirror
- BUT we can only guarantee symmetry up to the boundary R

Example:
        L       mirror    C         i        R
        |----------|------|---------|--------|
        [   P[m]=5  ]      [    ?    ]

If P[mirror] = 5, but R - i = 2, we can only guarantee 2 characters match
by symmetry. Beyond R, we don't know anything yet, so we need to expand.

That's why we take: min(R - i, P[mirror])
```

```jsx
Q2: How is the time complexity O(n)?

A: Excellent question! At first glance, it looks like O(n²) because of the
while loop inside the for loop.

The key insight: Each character in the modified string is examined at most TWICE.

Why?
1. The outer loop touches each position once
2. The inner while loop expands the radius
3. BUT, the right boundary R only moves forward (never backward)
4. Each expansion increases R
5. Once a character is beyond R, it's never re-examined for that palindrome

Amortized Analysis:
- n iterations of the outer loop
- Total expansions across ALL iterations ≤ n
- Total operations = O(n) + O(n) = O(n)

This is similar to how two pointers work in other linear algorithms!
```

```jsx
Q3: Why the formula (centerIndex - maxLen) / 2 for finding the start?

A: Let's derive this step by step.

Modified string structure:
- Positions 0, 2, 4, 6, ... are '#'
- Positions 1, 3, 5, 7, ... are actual characters

Mapping from modified index to original index:
- Modified index 1 ('b') → Original index 0
- Modified index 3 ('a') → Original index 1
- Modified index 5 ('b') → Original index 2
- General formula: original_index = modified_index / 2 (integer division)

For a palindrome centered at 'centerIndex' with radius 'maxLen':
- The palindrome spans from (centerIndex - maxLen) to (centerIndex + maxLen)
- Start position in modified: centerIndex - maxLen
- Convert to original: (centerIndex - maxLen) / 2
- Length in original: maxLen (the '#' characters don't change the count)

Example:
Modified: # b # a # b # a # d #
Index:    0 1 2 3 4 5 6 7 8 9 10

If centerIndex = 5, maxLen = 3:
- Modified range: 5-3=2 to 5+3=8 → "#a#b#a#"
- Original start: 2/2 = 1
- Original length: 3
- Result: "aba" ✓
```

I hope this detailed explanation helps you understand the intuition and mechanics behind Manacher's algorithm! It's a brilliant optimization that uses symmetry to achieve linear time complexity.

---

## Additional Resources

For a visual explanation of Manacher's Algorithm, check out this excellent video tutorial:

**Video Tutorial:** [Manacher's Algorithm Explained](https://www.youtube.com/watch?v=nbTSfrEfo6M)

This video provides a great visual walkthrough of the algorithm and complements the written explanation above.