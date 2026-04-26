# Word Search - Doubts

## 1. Algorithm ka main idea kya hai?

Question:

```txt
Ye algorithm exactly kya kar raha hai?
```

Answer:

Algorithm 2 parts me kaam karta hai:

### Part 1: Starting point dhoondo

Board ka har cell possible starting point ho sakta hai.

So:

```txt
har `(row, col)` se DFS try karo
```

### Part 2: DFS se word build karo

DFS state:

```txt
dfs(row, col, charIndex)
```

Meaning:

```txt
kya current cell `(row, col)` se `word[charIndex...]` match ho sakta hai?
```

Har DFS call:

```txt
1. current cell valid hai ya nahi check karti hai
2. current cell current character se match karta hai ya nahi dekhti hai
3. agar match hua toh next character ke liye 4 directions try karti hai
```

---

## 2. Har cell se start kyu karte hain?

Question:

```txt
Kya word hamesha board[0][0] se start hota hai?
```

Answer:

```txt
Nahi.
Word kisi bhi cell se start ho sakta hai.
```

Isliye outer loops:

```txt
for every row
  for every col
    try dfs(row, col, 0)
```

Example:

```txt
board =
A B C
D E F
G H I

word = "EF"
```

Yahan word `(1,1)` se start hota hai, `(0,0)` se nahi.

So every cell ko start point try karna compulsory hai.

---

## 3. `dfs(row, col, charIndex)` ka exact meaning kya hai?

Question:

```txt
`dfs(1, 2, 3)` ka actual matlab kya hai?
```

Answer:

It means:

```txt
Kya board[1][2] se start karke `word[3...]` match ho sakta hai?
```

Yani:

```txt
current cell ko current character se match karna hai
aur agar match hua toh baaki word ko neighbors me dhoondhna hai
```

So DFS call full word nahi solve karti.
Wo bas:

```txt
remaining suffix of word
```

solve karti hai.

---

## 4. Current cell match nahi kare toh kya hota hai?

Question:

```txt
Agar board[row][col] != word[charIndex], toh?
```

Answer:

```txt
Ye path yahin fail ho jaata hai.
return false
```

Reason:

```txt
Current required character hi nahi mila,
toh is branch ko aage continue karne ka koi matlab nahi.
```

This is pruning.

---

## 5. Visited mark kyu karte hain?

Question:

```txt
board[row][col] = "#"
kyu karte hain?
```

Answer:

```txt
Same cell ko current path me dobara use karna allowed nahi hai.
```

Example:

```txt
word = "ABCB"
```

Suppose path:

```txt
A -> B -> C
```

Ab next required character phir `B` hai.

But agar wahi purana `B` current path me already use ho chuka hai,
toh usko dobara use nahi kar sakte.

Isliye:

```txt
visited mark karo
taaki DFS same path me wapas usi cell par na aaye
```

---

## 6. Backtracking me restore kyu karte hain?

Question:

```txt
board[row][col] = originalChar
wapas kyu karte hain?
```

Answer:

Because visited mark sirf:

```txt
current path ke liye temporary hota hai
```

Agar restore nahi karoge:

```txt
dusri branches aur dusre starting points bhi us cell ko permanently blocked samjhenge
```

Jo galat hoga.

Meaning:

```txt
Path fail ho ya success,
return se pehle board ko original state me lana hota hai
```

---

## 7. Hum move kaise karte hain?

Question:

```txt
Word ko dhoondhne ke liye movement ka actual flow kya hota hai?
```

Answer:

Sirf 4 directions allowed hain:

```txt
down  -> (row + 1, col)
up    -> (row - 1, col)
right -> (row, col + 1)
left  -> (row, col - 1)
```

Important:

```txt
Diagonal allowed nahi hai
```

---

## 8. Full Movement Tree - kaise word milta hai?

Example:

```txt
board =
|   Ⓐ  |   Ⓑ  |   Ⓒ   |   E    |
| (0,0) | (0,1) | (0,2)  | (0,3) |
----------------------------------   
|   S   |   F   |   Ⓒ   |   S   |
| (1,0) | (1,1) | (1,2)  | (1,3) |
----------------------------------
|   A   |   Ⓓ  |   Ⓔ   |   E   |
|(2,0)  | (2,1) | (2,2)  | (2,3) |
----------------------------------

word = "ABCCED"
```

Successful path:

```txt
(0,0) A
-> (0,1) B
-> (0,2) C
-> (1,2) C
-> (2,2) E
-> (2,1) D
```

Tree:

```txt
Start DFS from (0,0) for 'A'
│
├── current cell (0,0) = 'A' matches word[0]
│   mark visited
│
├── try DOWN  -> (1,0) = 'S'
│   need 'B'
│   mismatch -> false
│
├── try UP    -> (-1,0)
│   out of bounds -> false
│
├── try RIGHT -> (0,1) = 'B'
│   match word[1]
│   mark visited
│   │
│   ├── try DOWN  -> (1,1) = 'F'
│   │   need 'C'
│   │   mismatch -> false
│   │
│   ├── try UP    -> (-1,1)
│   │   out of bounds -> false
│   │
│   ├── try RIGHT -> (0,2) = 'C'
│   │   match word[2]
│   │   mark visited
│   │   │
│   │   ├── try DOWN -> (1,2) = 'C'
│   │   │   match word[3]
│   │   │   mark visited
│   │   │   │
│   │   │   ├── try DOWN -> (2,2) = 'E'
│   │   │   │   match word[4]
│   │   │   │   mark visited
│   │   │   │   │
│   │   │   │   ├── try DOWN  -> (3,2) out of bounds -> false
│   │   │   │   ├── try UP    -> (1,2) visited -> false
│   │   │   │   ├── try RIGHT -> (2,3) = 'E', need 'D' -> false
│   │   │   │   └── try LEFT  -> (2,1) = 'D'
│   │   │   │       match word[5]
│   │   │   │       last character matched
│   │   │   │       -> true
│   │   │   │
│   │   │   └── success bubbles up
│   │   │
│   │   └── success bubbles up
│   │
│   └── success bubbles up
│
└── exist() returns true
```

Short movement picture:

```txt
A -> B -> C
         |
         C
         |
         E -> D
```

---

## 9. Failure Tree - backtracking kaise dikhta hai?

Example:

```txt
word = "ABCB"
```

Suppose path reached:

```txt
A -> B -> C
```

Now next needed char:

```txt
B
```

But old `B` cell already visited hai.

Failure tree:

```txt
dfs at C
│
├── try DOWN  -> mismatch / invalid
├── try UP    -> visited old path
├── try RIGHT -> mismatch / invalid
└── try LEFT  -> visited 'B' cell

No direction works
-> return false
-> restore current cell
-> parent branch tries some other direction
```

This is backtracking:

```txt
branch fail hui
cell restore hua
parent dusri direction try karta hai
```

---

## 10. True aur false exactly kab return hota hai?

### `true` kab?

Jab:

```txt
current cell current character se match kare
and ye last required character ho
```

or:

```txt
koi ek direction deeper recursion me true de de
```

### `false` kab?

Jab:

```txt
1. out of bounds
2. visited cell
3. character mismatch
4. current cell se 4 directions me se koi bhi successful continuation na de
```

---

## 11. One-line summary

```txt
Word Search me har cell ko start point maan kar DFS chalti hai.
Current cell current character se match kare toh usko visited mark karke 4 directions try karte hain.
Koi direction successful ho jaye toh true, warna backtrack karke cell restore karte hain.
```