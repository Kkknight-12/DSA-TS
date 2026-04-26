# Word Search

## Problem Samjho

Hume ek 2D board diya hai jisme characters hain.
Ek `word` diya hai.

Check karna hai:

```txt
kya ye word board me exist karta hai?
```

Word banne ka rule:

```txt
1. Consecutive letters adjacent cells se aane chahiye
2. Adjacent ka matlab sirf up, down, left, right
3. Diagonal allowed nahi hai
4. Same cell ko ek path me dobara use nahi kar sakte
```

Example:

```txt
board =
A B C E
S F C S
A D E E

word = "ABCCED"
```

Valid path:

```txt
(0,0) A
-> (0,1) B
-> (0,2) C
-> (1,2) C
-> (2,2) E
-> (2,1) D
```

So answer:

```txt
true
```

---

## Key Insight

Word kisi bhi cell se start ho sakta hai.

So first step:

```txt
har cell ko starting point maan kar try karo
```

Then each starting point se DFS + backtracking use karo.

DFS question:

```txt
kya `word[charIndex...]` current cell `(row, col)` se match ho sakta hai?
```

Backtracking ki zaroorat kyu?

```txt
same cell ko current path me dobara use nahi kar sakte
```

So:

```txt
cell ko temporary visited mark karo
4 directions try karo
return pe restore karo
```

---

## Approach

### Step 1: Try Every Cell as Start

Outer loops board ke har cell par chalengi.

Agar kisi cell se full word mil gaya:

```txt
return true
```

### Step 2: DFS for Current Path

DFS state:

```txt
dfs(row, col, charIndex)
```

Meaning:

```txt
kya current cell se `word[charIndex...]` match ho sakta hai?
```

### Step 3: Backtracking

If current cell match karta hai:

```txt
1. Cell ko visited mark karo
2. charIndex + 1 ke liye 4 directions try karo
3. Return se pehle cell ko restore karo
```

---

## Why This Works

Har DFS frame ek exact contract solve karta hai:

```txt
current cell ko current character se match karo
agar match hua toh next character ke liye neighbors explore karo
```

If:

```txt
current character hi match nahi hua
```

then:

```txt
ye path yahin fail
```

If:

```txt
last character match ho gaya
```

then:

```txt
full word mil gaya
```

Backtracking ensure karta hai:

```txt
ek failed branch dusri branch ko spoil na kare
```

---

## Complexity

Let:

```txt
m = rows
n = cols
L = word.length
```

### Time Complexity: `O(m * n * 4^L)`

Reason:

```txt
har cell se DFS start ho sakta hai
aur har DFS level par 4 directions try ho sakti hain
```

Practical me visited/mismatch checks ki wajah se pruning strong hoti hai.

### Space Complexity: `O(L)`

Reason:

```txt
recursion depth word length ke equal tak ja sakti hai
```

Visited tracking board me in-place hoti hai,
so extra visited matrix use nahi kar rahe.
