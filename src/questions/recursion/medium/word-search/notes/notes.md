# Word Search - Notes

## 1. Problem Samjho

Hume ek 2D board aur ek `word` diya gaya hai.

Check karna hai:

```txt
kya board me adjacent cells use karke ye word ban sakta hai?
```

Rules:

```txt
sirf up, down, left, right move allowed
same cell current path me dobara use nahi kar sakte
diagonal allowed nahi hai
```

Example:

```txt
board =
A B C E
S F C S
A D E E

word = "ABCCED"
```

Answer:

```txt
true
```

---

## 2. Brute Force

Brute-force soch:

```txt
har cell se har possible path generate karo
phir check karo kya word milta hai
```

Problem:

```txt
bahut saare useless paths generate ho jayenge
same path me cell reuse bhi avoid karna padta hai
```

Better:

```txt
DFS + backtracking
```

Current character mismatch hote hi branch turant cut kar do.

---

## 3. Key Insight

Har DFS frame ek exact state solve karta hai:

```txt
dfs(row, col, charIndex)
```

Meaning:

```txt
kya current cell `(row, col)` se `word[charIndex...]` match ho sakta hai?
```

Important:

```txt
current cell current character se match karna chahiye
phir next character ke liye neighbors explore hote hain
```

---

## 4. Why This Technique Works

Suppose current cell match karta hai.

Then problem smaller ban jaati hai:

```txt
ab next character ko current cell ke kisi neighbor me dhoondo
```

Visited marking isliye chahiye:

```txt
same cell ko current path me dobara use nahi kar sakte
```

Backtracking isliye chahiye:

```txt
agar ek direction fail ho jaye,
toh cell ko restore karke dusri branch ko clean board state milni chahiye
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `rows` | board ki total rows |
| `cols` | board ki total columns |
| `row`, `col` | current cell |
| `charIndex` | word me current required character ka index |
| `originalChar` | visited mark karne se pehle current cell ka actual value |
| `foundWord` | kya kisi direction ne successful path diya |

State example:

```txt
row = 1
col = 2
charIndex = 3
```

Meaning:

```txt
ab hume current cell par `word[3]` match karna hai
```

---

## 6. Mental Model

Word Search ko path-building problem ki tarah dekho.

For:

```txt
word = "ABCCED"
```

State flow:

```txt
match 'A'
then neighbor me 'B'
then neighbor me 'C'
then neighbor me 'C'
then neighbor me 'E'
then neighbor me 'D'
```

Decision tree:

```txt
start at cell
│
├── down
├── up
├── right
└── left
```

Har branch tabhi continue karti hai jab current cell correct character match kare.

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty word | `""` | `true` | kuch match karna hi nahi |
| empty board | `[]` | `false` | non-empty word ke liye cells hi nahi |
| single cell match | `[['A']], "A"` | `true` | direct match |
| single cell mismatch | `[['A']], "B"` | `false` | first char hi fail |
| word longer than cells | 4-cell board, 5-letter word | `false` | no-reuse rule ke saath impossible |
| diagonal-looking match | `"AEI"` in 3x3 diagonal | `false` | diagonal allowed nahi |

---

## 8. Conditions

### Out of bounds

```txt
row < 0 || row >= rows || col < 0 || col >= cols
```

Meaning:

```txt
path board ke bahar chali gayi
```

Action:

```txt
false
```

### Visited cell

```txt
board[row][col] === "#"
```

Meaning:

```txt
ye cell current path me already use ho chuka hai
```

Action:

```txt
false
```

### Character mismatch

```txt
board[row][col] !== word[charIndex]
```

Meaning:

```txt
current cell required letter nahi de rahi
```

Action:

```txt
false
```

### Last character matched

```txt
charIndex === word.length - 1
```

Meaning:

```txt
current matched cell hi final required letter tha
```

Action:

```txt
true
```

---

## 9. Adjustment Logic

Yahan main adjustments:

| thing | adjustment | why |
|---|---|---|
| `charIndex` | `charIndex + 1` | next required character solve karna hai |
| cell state | actual char -> `"#"` | current path me reuse rokna hai |
| after return | `"#"` -> original char | sibling branches ko clean state deni hai |

Direction adjustments:

| move | new coordinates |
|---|---|
| down | `(row + 1, col)` |
| up | `(row - 1, col)` |
| right | `(row, col + 1)` |
| left | `(row, col - 1)` |

---

## 10. Answer Formula

Direct math formula nahi hai,
but DFS branching intuition important hai:

```txt
har level par 4 directions try ho sakti hain
max depth word length hoti hai
```

So worst-case:

```txt
Time = O(m * n * 4^L)
Space = O(L)
```

where:

```txt
m = rows
n = cols
L = word.length
```

---

## 11. Full Dry Run

Example:

```txt
board =
A B C E
S F C S
A D E E

word = "ABCCED"
```

### Successful Path Table

| step | cell | board char | needed char | result |
|---|---|---|---|---|
| 1 | `(0,0)` | `A` | `A` | match |
| 2 | `(0,1)` | `B` | `B` | match |
| 3 | `(0,2)` | `C` | `C` | match |
| 4 | `(1,2)` | `C` | `C` | match |
| 5 | `(2,2)` | `E` | `E` | match |
| 6 | `(2,1)` | `D` | `D` | match, success |

### Branch Pruning Table

| from state | tried move | reason for failure |
|---|---|---|
| `(0,0,'A')` | down to `(1,0)` | `S` != `B` |
| `(0,0,'A')` | up | out of bounds |
| `(0,1,'B')` | down to `(1,1)` | `F` != `C` |
| `(2,2,'E')` | up to `(1,2)` | visited cell |
| `(2,2,'E')` | right to `(2,3)` | `E` != `D` |

### Failure Example

For:

```txt
word = "ABCB"
```

Path starts:

```txt
A -> B -> C
```

Now next required letter:

```txt
B
```

But nearest `B` current path me already used ho chuka hota hai.

So:

```txt
visited check branch ko fail kar deta hai
```

This is why no-reuse rule important hai.

---

## 12. Quick Reference

| point | summary |
|---|---|
| recursion state | `(row, col, charIndex)` |
| question | can current cell match remaining word suffix? |
| visited marker | `"#"` |
| directions | up, down, left, right |
| base success | last character matched |
| backtracking | restore original character after DFS |
| time | `O(m * n * 4^L)` |
| space | `O(L)` |
