we'll break down the **Knuth-Morris-Pratt (KMP) algorithm** step-by-step, using simple language and analogies.

Let's start with the big picture.

### The Problem: Finding a Needle in a Haystack

Imagine you have a large block of text (the "haystack") and you want to find if a smaller word or phrase (the "needle") exists inside it.

- **Text (Haystack):** `ABABDABACDABABCABAB`
- **Pattern (Needle):** `ABABC`

Our goal is to find the starting index of the pattern within the text. In this case, the pattern `ABABC` starts at index 10.

---

### Step 1: The "Naive" or "Simple" Approach

Before we understand the cleverness of KMP, let's see how a simple-minded approach would work. This is called the **Naive String Matching Algorithm**.

**How it works:**
You take the pattern and slide it over the text, one character at a time. At each position, you compare the pattern to the text character by character.

Let's try it:

**Text:** `A B A B D A B A C D A B A B C A B A B`**Pattern:** `A B A B C`

1. **Position 0:**
    - Text: `A B A B D...`
    - Pattern: `A B A B C`
    - Compare: A-A (match), B-B (match), A-A (match), B-B (match), **D-C (mismatch!)**
    - Result: Mismatch at the 5th character. What do we do now? The naive algorithm says, "Okay, let's shift the pattern by one position and start over."
2. **Position 1:**
    - Text: `B A B D A...`
    - Pattern: `A B A B C`
    - Compare: **B-A (mismatch!)**
    - Result: Mismatch at the very first character. Shift again.
3. **Position 2:**
    - Text: `A B D A B...`
    - Pattern: `A B A B C`
    - Compare: A-A (match), B-B (match), **D-A (mismatch!)**
    - Result: Mismatch at the 3rd character. Shift again.

...and so on.

**The Problem with the Naive Approach:**
Look closely at Step 1. We matched `ABAB` and then failed at `D`. When we shift the pattern to Position 2, we start comparing `A` with `A` again. But we *already know* from the previous step that the `A` at text index 2 matches the `A` at pattern index 0. We are re-doing work!

KMP's main goal is to **avoid this re-comparison**. It's smarter about how it shifts the pattern after a mismatch.

---

### Step 2: The KMP "Aha!" Moment

The core idea of KMP is this: **When a mismatch occurs, we already have some information about the characters we've just seen. We can use this information to decide how far to shift the pattern, without having to move the text pointer backward.**

Let's go back to our failure point in Step 1:

- Text: `...A B A B **D**...`
- Pattern: `...A B A B **C**`

We matched `ABAB` and then found a mismatch (`D` vs `C`). The naive algorithm would shift the pattern one to the right.

The KMP algorithm asks: "Based on the part of the pattern that *did* match (`ABAB`), what's the best way to shift the pattern so we don't have to re-check characters in the text?"

To answer this, we need to analyze the **pattern itself**.

---

### Step 3: The Magic Tool - The LPS Array

This is the heart of the KMP algorithm. LPS stands for **Longest Proper Prefix which is also a Suffix**. Let's break that down.

- **Prefix:** Any starting part of a string. For "ABAB", prefixes are "A", "AB", "ABA".
- **Suffix:** Any ending part of a string. For "ABAB", suffixes are "B", "AB", "BAB".
- **Proper:** A prefix or suffix that is *not* the entire string itself.

So, for each part of our pattern, we want to find the longest prefix that is also a suffix.

Let's build the LPS array for our pattern `PATTERN = "ABABC"`.

| Index (i) | Character | Substring (P[0...i]) | Prefixes | Suffixes | Longest Proper Prefix that is also a Suffix | LPS[i] |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | A | "A" | "" | "" | "" | **0** |
| 1 | B | "AB" | "A" | "B" | "" | **0** |
| 2 | A | "ABA" | "A", "AB" | "A", "BA" | "A" | **1** |
| 3 | B | "ABAB" | "A", "AB", "ABA" | "B", "AB", "BAB" | "AB" | **2** |
| 4 | C | "ABABC" | "A", "AB", "ABA", "ABAB" | "C", "BC", "ABC", "BABC" | "" | **0** |

So, the LPS array for `ABABC` is `[0, 0, 1, 2, 0]`.

**What does this LPS array *mean*?**

`LPS[i]` tells you: "If a mismatch happens at index `i+1` of the pattern, you know that the first `LPS[i]` characters of the pattern are a perfect match for the last `LPS[i]` characters you just compared. So, you can align the pattern with itself and continue from there."

---

### Step 4: Putting It All Together - The KMP Search

Now we use the LPS array to guide our search. We'll use two pointers:

- `i`: for the `TEXT`
- `j`: for the `PATTERN`

**Text:** `A B A B D A B A C D A B A B C A B A B`

**Pattern:** `A B A B C`

**LPS:** `[0, 0, 1, 2, 0]`

**Let's run the algorithm:**

1. `i=0, j=0`: `TEXT[0]` ('A') == `PATTERN[0]` ('A'). **Match!** Increment both. `i=1, j=1`.
2. `i=1, j=1`: `TEXT[1]` ('B') == `PATTERN[1]` ('B'). **Match!** Increment both. `i=2, j=2`.
3. `i=2, j=2`: `TEXT[2]` ('A') == `PATTERN[2]` ('A'). **Match!** Increment both. `i=3, j=3`.
4. `i=3, j=3`: `TEXT[3]` ('B') == `PATTERN[3]` ('B'). **Match!** Increment both. `i=4, j=4`.
5. `i=4, j=4`: `TEXT[4]` ('D') != `PATTERN[4]` ('C'). **MISMATCH!**
    - **This is the key step.** The naive algorithm would shift `j` to 0 and `i` to 1.
    - KMP says: "We were at `j=4`. Let's look at `LPS[j-1]`, which is `LPS[3]`. The value is **2**."
    - This means the prefix of length 2 (`"AB"`) is also a suffix of the matched part (`"ABAB"`).
    - So, we don't need to go all the way back to the start of the pattern. We can just set `j = 2` and continue. We *do not* change `i`.
    - Now, `i=4, j=2`.
6. `i=4, j=2`: `TEXT[4]` ('D') != `PATTERN[2]` ('A'). **MISMATCH!**
    - We are at `j=2`. Let's look at `LPS[j-1]`, which is `LPS[1]`. The value is **0**.
    - This means there's no prefix that is also a suffix. We have to start from the beginning of the pattern.
    - Set `j = 0`. `i` remains 4.
    - Now, `i=4, j=0`.
7. `i=4, j=0`: `TEXT[4]` ('D') != `PATTERN[0]` ('A'). **MISMATCH!**
    - Since `j` is already 0, we can't use the LPS array. We have no choice but to move forward in the text.

    - Increment `i`. `i=5, j=0`.
8. `i=5, j=0`: `TEXT[5]` ('A') == `PATTERN[0]` ('A'). **Match!** Increment both. `i=6, j=1`.
9. ...and so on.

The algorithm continues this process. Notice that the text pointer `i` **never moves backward**. This is why KMP is so efficient. It only ever moves forward, and the pattern pointer `j` jumps around intelligently based on the pre-computed LPS array.

Eventually, it will reach this state:

- `i=14`, `j=4`: `TEXT[14]` ('C') == `PATTERN[4]` ('C'). **Match!** Increment both. `i=15, j=5`.
- Now `j` is equal to the length of the pattern (5). **We found a match!** The pattern starts at index `i - j` = `15 - 5` = **10**.

---

### Summary and Analogy

- **Naive Approach:** Like a person reading a book. When they find a sentence that doesn't make sense, they go back to the very beginning of the chapter and start reading again. Very inefficient.
- **KMP Approach:** Like a smart reader. When they find a sentence that doesn't make sense, they think, "Hmm, the last few words I read were 'the cat sat'. The next word 'barked' doesn't fit. But I know 'the cat sat' is a common phrase. Maybe the next sentence starts with 'sat on the...'" They use their knowledge of what they just read to jump to a more logical place, without re-reading the whole chapter. The LPS array is this "knowledge".

### Complexity

- **Time Complexity:** **O(N + M)**, where N is the length of the text and M is the length of the pattern. This is because we first compute the LPS array in O(M) time, and then we scan the text in O(N) time. The text pointer never moves backward.
- **Space Complexity:** **O(M)**, to store the LPS array.

This is a huge improvement over the Naive approach, which has a worst-case time complexity of O(N*M).

I hope this detailed explanation helps you understand the intuition and mechanics behind the KMP algorithm! It's a classic for a reason, and understanding it is a great step in your DSA journey.

---

```jsx
detailed commented code ( typescript or javascript ), explanation, 
and dry run for same
```

Of course! Let's translate the concepts we discussed into code and then walk through it.

We'll implement KMP in TypeScript. The logic is identical for JavaScript.

### The Code

The KMP algorithm is broken into two main parts:

1. **Pre-processing the Pattern:** Creating the LPS (Longest Prefix Suffix) array.
2. **Searching:** Using the LPS array to efficiently search for the pattern in the text.

Here is the complete, commented code.

```tsx
/**
 * Computes the LPS (Longest Prefix Suffix) array for a given pattern.
 * LPS[i] stores the length of the longest proper prefix of pattern[0...i]
 * which is also a suffix of pattern[0...i].
 * @param pattern The pattern string.
 * @returns The LPS array.
 */
function computeLPSArray(pattern: string): number[] {
    const lps: number[] = new Array(pattern.length).fill(0);
    let length = 0; // length of the previous longest prefix suffix
    let i = 1;

    // The loop calculates lps[i] for i from 1 to pattern.length - 1
    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            // If characters match, we can extend the current prefix-suffix
            length++;
            lps[i] = length;
            i++;
        } else {
            // Mismatch after length matches
            if (length !== 0) {
                // This is the tricky part. We don't decrement i.
                // We set length to the previous longest prefix-suffix.
                // This is like "falling back" in the pattern itself.
                length = lps[length - 1];
                // Note: we do NOT increment i here.
            } else {
                // If length is 0, it means there's no proper prefix-suffix.
                // So, lps[i] is 0, and we move to the next character.
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

/**
 * Implements the Knuth-Morris-Pratt (KMP) string searching algorithm.
 * @param text The text to search within.
 * @param pattern The pattern to search for.
 * @returns The starting index of the first occurrence of the pattern in the text, or -1 if not found.
 */
function kmpSearch(text: string, pattern: string): number {
    const m = pattern.length;
    const n = text.length;

    // Edge cases
    if (m === 0) return 0;
    if (n === 0 || m > n) return -1;

    // Step 1: Pre-process the pattern to get the LPS array
    const lps = computeLPSArray(pattern);

    // Step 2: Start the search
    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < n) {
        if (pattern[j] === text[i]) {
            // Case 1: Characters match
            i++;
            j++;
        }

        if (j === m) {
            // Case 2: Pattern found!
            // The pattern is fully matched. Return the starting index.
            return i - j;
        } else if (i < n && pattern[j] !== text[i]) {
            // Case 3: Mismatch after j matches
            if (j !== 0) {
                // This is the KMP magic!
                // Instead of moving 'i' back, we use the LPS array to
                // shift the pattern. We move 'j' to the position of the
                // last known prefix-suffix.
                j = lps[j - 1];
            } else {
                // If j is 0, it means the mismatch happened at the first
                // character of the pattern. We have no choice but to move
                // the text pointer 'i' forward.
                i++;
            }
        }
    }

    // Pattern not found
    return -1;
}

// --- Example Usage ---
const text = "ABABDABACDABABCABAB";
const pattern = "ABABC";
const foundIndex = kmpSearch(text, pattern);

console.log(`Text:    ${text}`);
console.log(`Pattern: ${pattern}`);
if (foundIndex !== -1) {
    console.log(`Pattern found at index: ${foundIndex}`);
} else {
    console.log("Pattern not found.");
}
// Expected Output: Pattern found at index: 10

```

---

### Code Explanation

### `computeLPSArray(pattern)`

- **Purpose:** This function's only job is to analyze the `pattern` and build the LPS array. It does this by comparing the pattern with itself.
- `lps`: An array initialized with zeros, which will store our results.
- `length`: This variable keeps track of the length of the *current* longest prefix-suffix. It's also the index we are comparing against.
- `i`: This is our main iterator, moving from the second character (`i=1`) to the end of the pattern.
- **`if (pattern[i] === pattern[length])`**: If the characters match, it means we've found a longer prefix-suffix. We increment `length`, store it in `lps[i]`, and move `i` forward.
- **`else` (mismatch)**: This is the clever part.
    - If `length` is not `0`, it means we had a partial match. We don't want to start from scratch. We "fall back" by setting `length = lps[length - 1]`. This effectively moves our comparison pointer back to the end of the *previous* known prefix-suffix. We do *not* increment `i` because we need to re-compare `pattern[i]` with this new `pattern[length]`.
    - If `length` is `0`, there was no prefix-suffix to fall back to. So, `lps[i]` is `0`, and we simply move on by incrementing `i`.

[running the LPS dry run](https://www.notion.so/running-the-LPS-dry-run-285a26808968803e8d8eca78785404d1?pvs=21)

### `kmpSearch(text, pattern)`

- **Purpose:** This function uses the pre-computed `lps` array to find the pattern in the text.
- `i`: Pointer for the `text`. It only ever moves forward.
- `j`: Pointer for the `pattern`. It can jump forward or backward based on matches and the LPS array.
- **`if (pattern[j] === text[i])`**: The simplest case. Characters match, so we advance both pointers.
- **`if (j === m)`**: This is our success condition. If `j` reaches the length of the pattern, it means we've successfully matched the entire pattern. The starting index is `i - j`.
- **`else if (pattern[j] !== text[i])`**: This is the mismatch case.
    - **`if (j !== 0)`**: This is the core of KMP's efficiency. We had a partial match (`j` characters). Instead of resetting `j` to `0` and moving `i` back, we consult our LPS array. `j = lps[j - 1]` tells us to shift the pattern so that the longest proper prefix-suffix of the matched part now lines up with the text. The text pointer `i` stays put.
    - **`else`**: If `j` is `0`, the mismatch happened on the very first character of the pattern. There's no "smart" shift we can do, so we just give up on this position and move the text pointer `i` forward.


---

### Dry Run

Let's trace the `kmpSearch` function with our example.

- **Text:** `T = "ABABDABACDABABCABAB"`
- **Pattern:** `P = "ABABC"`
- **LPS Array:** `lps = [0, 0, 1, 2, 0]`
- **Pointers:** `i = 0` (for text), `j = 0` (for pattern)

| Step | i | j | T[i] | P[j] | Comparison | Action | Next i | Next j | Explanation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | A | A | Match | `i++`, `j++` | 1 | 1 | Characters match. |
| 2 | 1 | 1 | B | B | Match | `i++`, `j++` | 2 | 2 | Characters match. |
| 3 | 2 | 2 | A | A | Match | `i++`, `j++` | 3 | 3 | Characters match. |
| 4 | 3 | 3 | B | B | Match | `i++`, `j++` | 4 | 4 | Characters match. |
| 5 | 4 | 4 | D | C | Mismatch | `j > 0`, so `j = lps[4-1] = lps[3] = 2` | 4 | 2 | **KMP Magic!** Mismatch after 4 matches. We don't move `i`. We use LPS to shift the pattern. `j` jumps from 4 to 2. |
| 6 | 4 | 2 | D | A | Mismatch | `j > 0`, so `j = lps[2-1] = lps[1] = 0` | 4 | 0 | Mismatch again. We fall back further. `j` jumps from 2 to 0. |
| 7 | 4 | 0 | D | A | Mismatch | `j === 0`, so `i++` | 5 | 0 | Mismatch at the start of the pattern. We can't fall back, so we advance the text pointer `i`. |
| 8 | 5 | 0 | A | A | Match | `i++`, `j++` | 6 | 1 | Characters match. |
| 9 | 6 | 1 | B | B | Match | `i++`, `j++` | 7 | 2 | Characters match. |
| 10 | 7 | 2 | A | A | Match | `i++`, `j++` | 8 | 3 | Characters match. |
| 11 | 8 | 3 | C | B | Mismatch | `j > 0`, so `j = lps[3-1] = lps[2] = 1` | 8 | 1 | Mismatch. We fall back. `j` jumps from 3 to 1. |
| 12 | 8 | 1 | C | B | Mismatch | `j > 0`, so `j = lps[1-1] = lps[0] = 0` | 8 | 0 | Mismatch again. We fall back to the start. `j` jumps from 1 to 0. |
| 13 | 8 | 0 | C | A | Mismatch | `j === 0`, so `i++` | 9 | 0 | Mismatch at the start. Advance `i`. |
| 14 | 9 | 0 | D | A | Mismatch | `j === 0`, so `i++` | 10 | 0 | Mismatch at the start. Advance `i`. |
| 15 | 10 | 0 | A | A | Match | `i++`, `j++` | 11 | 1 | Characters match. |
| 16 | 11 | 1 | B | B | Match | `i++`, `j++` | 12 | 2 | Characters match. |
| 17 | 12 | 2 | A | A | Match | `i++`, `j++` | 13 | 3 | Characters match. |
| 18 | 13 | 3 | B | B | Match | `i++`, `j++` | 14 | 4 | Characters match. |
| 19 | 14 | 4 | C | C | Match | `i++`, `j++` | 15 | 5 | Characters match. |
| 20 | 15 | 5 | - | - | `j === m` | **Return `i - j`** | - | - | **Success!** `j` (5) equals pattern length (5). The pattern is found. Return `15 - 5 = 10`. |

The algorithm stops and returns `10`. Notice how the text pointer `i` only ever increased, never decreased. This is the key to its linear time complexity.

---

# Doubts

```jsx
excellent explanation, just small doubt here in creating lsp array

let i = 1;

// The loop calculates lps[i] for i from 1 to pattern.length - 1
while (i < pattern.length) {
if (pattern[i] === pattern[length]) {

i want to know why we we start loop from index 1, why not from index 0.
 why do we use pattern.length we should be using pattern.length - 1
```

Excellent question! This gets to the heart of how the LPS array is built and shows you're thinking critically about the code's mechanics. Let's break down both of your points.

---

### 1. Why does the loop start from `i = 1`?

This is because the value of `lps[0]` is **always 0**, and we don't need a loop to figure it out.

Let's recall the definition: `lps[i]` is the length of the longest **proper** prefix of `pattern[0...i]` which is also a suffix.

- A **proper** prefix is a prefix that is not equal to the entire string itself.
- Let's look at the very first character of the pattern, which is `pattern[0]`.
- The substring is just `pattern[0...0]`.
- What are the proper prefixes of a single character? There are none, except the empty string `""`.
- What are the proper suffixes of a single character? There are none, except the empty string `""`.
- The longest proper prefix that is also a suffix is the empty string, which has a length of **0**.

So, `lps[0]` is a base case that is always 0. We can initialize it directly:

```tsx
const lps: number[] = new Array(pattern.length).fill(0);
// lps[0] is now 0.

```

Since we already know the answer for index 0, the first value we actually need to *calculate* is for the second character, which is at index `i = 1`. Starting the loop at `i = 1` is therefore the most efficient approach.

---

### 2. Why is the loop condition `i < pattern.length` and not `i < pattern.length - 1`?

This is a classic and very important detail about loop conditions. The goal of the loop is to calculate the LPS value for **every character** in the pattern, from the second one (`i=1`) to the very last one.

Let's use our example pattern `P = "ABABC"`.

- `pattern.length` is 5.
- The valid indices are `0, 1, 2, 3, 4`.
- We need to calculate `lps[1]`, `lps[2]`, `lps[3]`, and `lps[4]`.

Now let's analyze the two loop conditions:

### Correct Condition: `while (i < pattern.length)`

- This translates to `while (i < 5)`.
- The loop will run for `i = 1, 2, 3, 4`.
- When `i` becomes 5, the condition `5 < 5` is false, and the loop terminates.
- **Result:** We successfully calculated `lps[1]`, `lps[2]`, `lps[3]`, and `lps[4]`. This is exactly what we want.

### Incorrect Condition: `while (i < pattern.length - 1)`

- This translates to `while (i < 5 - 1)`, which is `while (i < 4)`.
- The loop will run for `i = 1, 2, 3`.
- When `i` becomes 4, the condition `4 < 4` is false, and the loop terminates.
- **Result:** We calculated `lps[1]`, `lps[2]`, and `lps[3]`, but we **never calculated `lps[4]`**. Our LPS array would be incomplete.

The value `lps[4]` is crucial. If the search algorithm matches the first 4 characters of the pattern (`"ABAB"`) and then mismatches at the 5th character (`C`), it will look up `lps[4-1]` (i.e., `lps[3]`). But what if it matched all 5 characters and needed to find the next occurrence? The full LPS array is essential for all possible scenarios in the search phase.

In programming, the standard way to iterate through all indices of an array of size `N` is `for (let i = 0; i < N; i++)`. Our `while` loop follows the exact same logic, just starting from `i = 1` instead of `0`.

### Summary Table

| Question | The "Why" | Analogy |
| --- | --- | --- |
| **Start at `i = 1`?** | `lps[0]` is a known base case (always 0). We start calculating from the first unknown value. | You don't need to ask a calculator what 1+0 is; you just know it's 1. You start using the calculator for the first *hard* problem. |
| **Condition `i < length`?** | This ensures the loop runs for all indices up to and including the last one (`length - 1`). Using `length - 1` would stop one step too early. | If a building has 5 floors (0 to 4), you need to press the button for floor 4. The condition `floor < 5` gets you there. The condition `floor < 4` would stop you at floor 3. |

It's these small details that truly solidify understanding. Keep asking these great questions