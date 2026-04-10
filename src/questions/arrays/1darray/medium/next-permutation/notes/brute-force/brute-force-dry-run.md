# Next Permutation — Brute Force Deep Dry Run
## Recursion + Duplicate Handling Complete Walkthrough

---

## The Code We Are Walking Through

```typescript
function generatePermutations(): void {
  // LINE A: base case — path full ho gayi, ek permutation complete
  if (path.length === sortedValues.length) {
    permutations.push([...path]);
    return;
  }

  // LINE B: har available index try karo
  for (let i = 0; i < sortedValues.length; i++) {

    // LINE C: already use me hai, skip
    if (used[i]) continue;

    // LINE D: duplicate skip condition
    if (i > 0 && sortedValues[i] === sortedValues[i - 1] && !used[i - 1]) {
      continue;
    }

    // LINE E: choose
    used[i] = true;
    path.push(sortedValues[i]);

    // LINE F: recurse
    generatePermutations();

    // LINE G: unchoose (backtrack)
    path.pop();
    used[i] = false;
  }
}
```

---

## Part 1: Simple Case — nums = [1, 2, 3]

No duplicates. Samajhna easy hoga.

```
sortedValues = [1, 2, 3]
used         = [F, F, F]
path         = []
permutations = []
```

---

### Full Tree

```
root  (path=[], used=[F,F,F])
│
├── i=0 → choose 1  ✅ ALLOWED
│   No duplicate issue here because all values are distinct.
│   LINE E: used=[T,F,F], path=[1]
│   LINE F: recurse
│   │
│   │   (path=[1], used=[T,F,F])
│   │   ├── i=0 → SKIP
│   │   │   Reason: used[0]=T, current branch me 1 already hai.
│   │   │
│   │   ├── i=1 → choose 2  ✅ ALLOWED
│   │   │   LINE E: used=[T,T,F], path=[1,2]
│   │   │   LINE F: recurse
│   │   │   │
│   │   │   │   (path=[1,2], used=[T,T,F])
│   │   │   │   ├── i=0 → SKIP
│   │   │   │   ├── i=1 → SKIP
│   │   │   │   └── i=2 → choose 3  ✅ ALLOWED
│   │   │   │       LINE E: used=[T,T,T], path=[1,2,3]
│   │   │   │       LINE A: BASE CASE → push [1,2,3]
│   │   │   │       LINE G: backtrack → path=[1,2], used=[T,T,F]
│   │   │   │
│   │   │   loop ends in [1,2] frame
│   │   │   LINE G: backtrack → path=[1], used=[T,F,F]
│   │   │
│   │   └── i=2 → choose 3  ✅ ALLOWED
│   │       LINE E: used=[T,F,T], path=[1,3]
│   │       LINE F: recurse
│   │       │
│   │       │   (path=[1,3], used=[T,F,T])
│   │       │   ├── i=0 → SKIP
│   │       │   ├── i=1 → choose 2  ✅ ALLOWED
│   │       │   │   LINE E: used=[T,T,T], path=[1,3,2]
│   │       │   │   LINE A: BASE CASE → push [1,3,2]
│   │       │   │   LINE G: backtrack → path=[1,3], used=[T,F,T]
│   │       │   └── i=2 → SKIP
│   │       │
│   │       loop ends in [1,3] frame
│   │       LINE G: backtrack → path=[1], used=[T,F,F]
│   │
│   loop ends in [1] frame
│   LINE G: backtrack → path=[], used=[F,F,F]
│
├── i=1 → choose 2  ✅ ALLOWED
│   LINE E: used=[F,T,F], path=[2]
│   LINE F: recurse
│   │
│   │   (path=[2], used=[F,T,F])
│   │   ├── i=0 → choose 1  ✅ ALLOWED
│   │   │   LINE E: used=[T,T,F], path=[2,1]
│   │   │   LINE F: recurse
│   │   │   │
│   │   │   │   (path=[2,1], used=[T,T,F])
│   │   │   │   ├── i=0 → SKIP
│   │   │   │   ├── i=1 → SKIP
│   │   │   │   └── i=2 → choose 3  ✅ ALLOWED
│   │   │   │       LINE E: used=[T,T,T], path=[2,1,3]
│   │   │   │       LINE A: BASE CASE → push [2,1,3]
│   │   │   │       LINE G: backtrack → path=[2,1], used=[T,T,F]
│   │   │   │
│   │   │   loop ends in [2,1] frame
│   │   │   LINE G: backtrack → path=[2], used=[F,T,F]
│   │   │
│   │   ├── i=1 → SKIP
│   │   └── i=2 → choose 3  ✅ ALLOWED
│   │       LINE E: used=[F,T,T], path=[2,3]
│   │       LINE F: recurse
│   │       │
│   │       │   (path=[2,3], used=[F,T,T])
│   │       │   ├── i=0 → choose 1  ✅ ALLOWED
│   │       │   │   LINE E: used=[T,T,T], path=[2,3,1]
│   │       │   │   LINE A: BASE CASE → push [2,3,1]
│   │       │   │   LINE G: backtrack → path=[2,3], used=[F,T,T]
│   │       │   ├── i=1 → SKIP
│   │       │   └── i=2 → SKIP
│   │       │
│   │       loop ends in [2,3] frame
│   │       LINE G: backtrack → path=[2], used=[F,T,F]
│   │
│   loop ends in [2] frame
│   LINE G: backtrack → path=[], used=[F,F,F]
│
└── i=2 → choose 3  ✅ ALLOWED
    LINE E: used=[F,F,T], path=[3]
    LINE F: recurse
    │
    │   (path=[3], used=[F,F,T])
    │   ├── i=0 → choose 1  ✅ ALLOWED
    │   │   LINE E: used=[T,F,T], path=[3,1]
    │   │   LINE F: recurse
    │   │   │
    │   │   │   (path=[3,1], used=[T,F,T])
    │   │   │   ├── i=0 → SKIP
    │   │   │   ├── i=1 → choose 2  ✅ ALLOWED
    │   │   │   │   LINE E: used=[T,T,T], path=[3,1,2]
    │   │   │   │   LINE A: BASE CASE → push [3,1,2]
    │   │   │   │   LINE G: backtrack → path=[3,1], used=[T,F,T]
    │   │   │   └── i=2 → SKIP
    │   │   │
    │   │   loop ends in [3,1] frame
    │   │   LINE G: backtrack → path=[3], used=[F,F,T]
    │   │
    │   ├── i=1 → choose 2  ✅ ALLOWED
    │   │   LINE E: used=[F,T,T], path=[3,2]
    │   │   LINE F: recurse
    │   │   │
    │   │   │   (path=[3,2], used=[F,T,T])
    │   │   │   ├── i=0 → choose 1  ✅ ALLOWED
    │   │   │   │   LINE E: used=[T,T,T], path=[3,2,1]
    │   │   │   │   LINE A: BASE CASE → push [3,2,1]
    │   │   │   │   LINE G: backtrack → path=[3,2], used=[F,T,T]
    │   │   │   ├── i=1 → SKIP
    │   │   │   └── i=2 → SKIP
    │   │   │
    │   │   loop ends in [3,2] frame
    │   │   LINE G: backtrack → path=[3], used=[F,F,T]
    │   │
    │   └── i=2 → SKIP
    │
    loop ends in [3] frame
    LINE G: backtrack → path=[], used=[F,F,F]

Final permutations (in order):
[1,2,3]  [1,3,2]  [2,1,3]  [2,3,1]  [3,1,2]  [3,2,1]
```

---

### Key Recursion Insight

Yahan ek important cheez samjho:

```
generatePermutations() CALL karte ho →
  woh apna kaam karta hai →
  return karta hai →
  execution LINE G pe aati hai (path.pop, used=false)
  PHIR loop ka next iteration (i++) chalta hai
```

Matlab:
```
LINE F ke baad LINE G hamesha chalta hai.
LINE G recursion ke side effects ko UNDO karta hai.
Isliye isse "backtrack" kehte hain.
```

---

## Part 2: Duplicates — nums = [1, 1, 5]

Yahan asli challenge hai.

```
sortedValues = [1a, 1b, 5]   ← same value, different indices
               idx0  idx1  idx2
used         = [F,   F,   F]
path         = []
permutations = []
```

Note: `1a` aur `1b` dono ki value `1` hai. Index alag hai bas.

---

### Detailed Node Expansion — [1a] Branch

Yeh branch ko zoom in karte hain step by step:

```
root  (path=[], used=[F,F,F])
│
└── i=0 → choose 1a  ✅ ALLOWED
    LINE D check:
      i > 0 → FALSE
    So duplicate condition yahan lag hi nahi sakti.
    LINE E: used=[T,F,F], path=[1a]
    LINE F: recurse
    │
    │   (path=[1a], used=[T,F,F])
    │   ├── i=0 → SKIP
    │   │   Reason: used[0]=T, 1a current path me already hai.
    │   │
    │   ├── i=1 → choose 1b  ✅ ALLOWED
    │   │   LINE D check:
    │   │     i > 0                              → true
    │   │     sortedValues[1] === sortedValues[0] → 1 === 1 → true
    │   │     !used[0]                           → !T → FALSE
    │   │   Overall: TRUE AND TRUE AND FALSE → FALSE
    │   │   Meaning:
    │   │     first 1 (1a) already path me hai,
    │   │     so second 1 ko lena duplicate nahi hai.
    │   │
    │   │   LINE E: used=[T,T,F], path=[1a,1b]
    │   │   LINE F: recurse
    │   │   │
    │   │   │   (path=[1a,1b], used=[T,T,F])
    │   │   │   ├── i=0 → SKIP
    │   │   │   ├── i=1 → SKIP
    │   │   │   └── i=2 → choose 5  ✅ ALLOWED
    │   │   │       LINE E: used=[T,T,T], path=[1a,1b,5]
    │   │   │       LINE A: BASE CASE → push [1,1,5]
    │   │   │       LINE G: backtrack → path=[1a,1b], used=[T,T,F]
    │   │   │
    │   │   loop ends in [1a,1b] frame
    │   │   LINE G: backtrack → path=[1a], used=[T,F,F]
    │   │
    │   └── i=2 → choose 5  ✅ ALLOWED
    │       LINE D check:
    │         sortedValues[2] === sortedValues[1] → 5 === 1 → FALSE
    │       So duplicate condition yahan bhi FALSE hi rahegi.
    │
    │       LINE E: used=[T,F,T], path=[1a,5]
    │       LINE F: recurse
    │       │
    │       │   (path=[1a,5], used=[T,F,T])
    │       │   ├── i=0 → SKIP
    │       │   ├── i=1 → choose 1b  ✅ ALLOWED
    │       │   │   LINE D check:
    │       │   │     i > 0                              → true
    │       │   │     sortedValues[1] === sortedValues[0] → 1 === 1 → true
    │       │   │     !used[0]                           → !T → FALSE
    │       │   │   Overall FALSE → NOT skipped
    │       │   │   Reason:
    │       │   │     1a already path me hai, so 1b yahan valid hai.
    │       │   │
    │       │   │   LINE E: used=[T,T,T], path=[1a,5,1b]
    │       │   │   LINE A: BASE CASE → push [1,5,1]
    │       │   │   LINE G: backtrack → path=[1a,5], used=[T,F,T]
    │       │   └── i=2 → SKIP
    │       │
    │       loop ends in [1a,5] frame
    │       LINE G: backtrack → path=[1a], used=[T,F,F]
    │
    loop ends in [1a] frame
    LINE G: backtrack → path=[], used=[F,F,F]

After this zoomed branch finishes, root par ye hoga:
  i=1 → SKIP because duplicate condition TRUE ho jayegi
  i=2 → choose 5 and remaining permutation [5,1,1] banegi
```

---

### Duplicate Skip Condition Kab Lagti Hai

```typescript
// LINE D
if (i > 0 && sortedValues[i] === sortedValues[i - 1] && !used[i - 1]) {
  continue;
}
```

Plain words me:

```
SKIP karo agar:
  main pehla element nahi hoon (i > 0)
  AND mere se pehle wala element same value ka hai
  AND woh pehle wala element abhi FREE hai (used nahi)

"Pehla same value wala free hai matlab woh is level pe
 already apni branch bana chuka aur backtrack ho gaya.
 Main dobara banaunga toh exact copy banega."
```

---

### Full Tree with [1, 1, 5]

```
root  (path=[], used=[F,F,F])
│
├── i=0 → choose 1a  ✅ ALLOWED
│   LINE D check: i=0, condition needs i>0 → FALSE → skip condition
│   LINE E: used=[T,F,F], path=[1]
│   LINE F: recurse
│   │
│   │   (path=[1], used=[T,F,F])
│   │   │
│   │   ├── i=0 → LINE C: used[0]=T → SKIP
│   │   │
│   │   ├── i=1 → choose 1b  ✅ ALLOWED
│   │   │   LINE D check:
│   │   │     i > 0                          → true
│   │   │     sortedValues[1] === sortedValues[0] → 1 === 1 → true
│   │   │     !used[0]                       → !T → FALSE
│   │   │   Condition overall: true AND true AND FALSE → FALSE
│   │   │   → NOT skipped → allowed!
│   │   │
│   │   │   Why allowed?
│   │   │   "used[0]=T matlab 1a abhi path me hai.
│   │   │    1b alag branch me hai (1a pehle, 1b baad).
│   │   │    Yeh duplicate nahi, yeh valid combination hai."
│   │   │
│   │   │   LINE E: used=[T,T,F], path=[1,1]
│   │   │   LINE F: recurse
│   │   │   │
│   │   │   │   (path=[1,1], used=[T,T,F])
│   │   │   │   ├── i=0 → skip (used)
│   │   │   │   ├── i=1 → skip (used)
│   │   │   │   └── i=2 → choose 5
│   │   │   │       LINE E: path=[1,1,5]
│   │   │   │       LINE F: recurse
│   │   │   │       LINE A: BASE CASE → permutations.push([1,1,5]) ✅
│   │   │   │       return
│   │   │   │       LINE G: path=[1,1], used=[T,T,F]
│   │   │   │       loop ends
│   │   │   │   return
│   │   │   │
│   │   │   LINE G: path=[1], used=[T,F,F]
│   │   │
│   │   └── i=2 → choose 5  ✅ ALLOWED
│   │       LINE D check:
│   │         i > 0                          → true
│   │         sortedValues[2] === sortedValues[1] → 5 === 1 → FALSE
│   │       Condition overall: FALSE → not skipped → allowed!
│   │
│   │       LINE E: used=[T,F,T], path=[1,5]
│   │       LINE F: recurse
│   │       │
│   │       │   (path=[1,5], used=[T,F,T])
│   │       │   ├── i=0 → skip (used)
│   │       │   │
│   │       │   ├── i=1 → choose 1b  ✅ ALLOWED
│   │       │   │   LINE D check:
│   │       │   │     i > 0                          → true
│   │       │   │     sortedValues[1] === sortedValues[0] → 1 === 1 → true
│   │       │   │     !used[0]                       → !T → FALSE
│   │       │   │   Condition → FALSE → allowed!
│   │       │   │
│   │       │   │   LINE E: path=[1,5,1], used=[T,T,T]
│   │       │   │   LINE F: recurse
│   │       │   │   LINE A: BASE CASE → permutations.push([1,5,1]) ✅
│   │       │   │   return
│   │       │   │   LINE G: path=[1,5], used=[T,F,T]
│   │       │   │
│   │       │   └── i=2 → skip (used)
│   │       │   loop ends
│   │       │   return
│   │       │
│   │       LINE G: path=[1], used=[T,F,F]
│   │
│   loop ends
│   return
│
│   LINE G: path=[], used=[F,F,F]
│
├── i=1 → choose 1b  ❌ SKIPPED
│   LINE D check:
│     i > 0                          → true
│     sortedValues[1] === sortedValues[0] → 1 === 1 → true
│     !used[0]                       → !F → TRUE
│   Condition: true AND true AND true → TRUE → SKIP!
│
│   Why skipped?
│   "used[0]=F matlab 1a abhi path me nahi hai.
│    Woh is level pe pehle try ho chuka aur backtrack ho gaya.
│    Ab 1b se same branches dobara banenge → duplicates.
│    Isliye skip."
│
│   Agar allowed hota, yeh generate hota:
│   [1b, 1a, 5] = [1, 1, 5]  ← already hai!
│   [1b, 5, 1a] = [1, 5, 1]  ← already hai!
│
└── i=2 → choose 5  ✅ ALLOWED
    LINE D check:
      sortedValues[2] === sortedValues[1] → 5 === 1 → FALSE
    Condition → FALSE → allowed!

    LINE E: used=[F,F,T], path=[5]
    LINE F: recurse
    │
    │   (path=[5], used=[F,F,T])
    │   │
    │   ├── i=0 → choose 1a  ✅ ALLOWED
    │   │   LINE D: i=0 → condition needs i>0 → FALSE → allowed
    │   │
    │   │   LINE E: used=[T,F,T], path=[5,1]
    │   │   LINE F: recurse
    │   │   │
    │   │   │   (path=[5,1], used=[T,F,T])
    │   │   │   ├── i=0 → skip (used)
    │   │   │   │
    │   │   │   ├── i=1 → choose 1b  ✅ ALLOWED
    │   │   │   │   LINE D:
    │   │   │   │     !used[0] → !T → FALSE → allowed!
    │   │   │   │
    │   │   │   │   LINE E: path=[5,1,1], used=[T,T,T]
    │   │   │   │   LINE F: recurse
    │   │   │   │   LINE A: BASE CASE → permutations.push([5,1,1]) ✅
    │   │   │   │   return
    │   │   │   │   LINE G: path=[5,1], used=[T,F,T]
    │   │   │   │
    │   │   │   └── i=2 → skip (used)
    │   │   │   loop ends
    │   │   │   return
    │   │   │
    │   │   LINE G: path=[5], used=[F,F,T]
    │   │
    │   └── i=1 → choose 1b  ❌ SKIPPED
    │       LINE D:
    │         i > 0                          → true
    │         sortedValues[1] === sortedValues[0] → 1 === 1 → true
    │         !used[0]                       → !F → TRUE
    │       Condition → TRUE → SKIP!
    │
    │       Agar allowed hota:
    │       [5, 1b, 1a] = [5, 1, 1]  ← already hai!
    │
    loop ends
    return

    LINE G: path=[], used=[F,F,F]

Final permutations (lexicographic order, no duplicates):
[1,1,5]   [1,5,1]   [5,1,1]
```

---

### Node Tree — Sequence of Execution

Numbers ① ② ③ ... show karte hain ki DFS order me recursion pehle kis branch me gaya.
`❌` = duplicate condition ki wajah se skip hua node.
`✅` = base case, permutation complete.

```
                              [] ①
                    ②/          |❌          \⑦
                 [1a]         [1b]❌         [5]
              ③/    \⑤                   ⑧/    \❌
          [1a,1b]  [1a,5]             [5,1a]  [5,1b]❌
             |④       |⑥                |⑨
         [1a,1b,5] [1a,5,1b]        [5,1a,1b]
             |✅        |✅               |✅
          [1,1,5]   [1,5,1]          [5,1,1]
          PERM ①    PERM ②           PERM ③
```

**Sequence ka matlab:**

| Step | Action | Code Line |
|------|--------|-----------|
| ① | Root call, path=[] | generatePermutations() pehli baar |
| ② | i=0: 1a choose → path=[1a] | LINE E + LINE F |
| ③ | Inside [1a], i=1: 1b choose → path=[1a,1b] | LINE E + LINE F |
| ④ | Inside [1a,1b], i=2: 5 choose → path=[1a,1b,5] → PERM① | LINE A |
| ⑤ | Backtrack to [1a], then i=2: 5 choose → path=[1a,5] | LINE E + LINE F |
| ⑥ | Inside [1a,5], i=1: 1b choose → path=[1a,5,1b] → PERM② | LINE A |
| ⑦ | Backtrack to root, i=1 skips, then i=2: 5 choose → path=[5] | LINE D, then LINE E + LINE F |
| ⑧ | Inside [5], i=0: 1a choose → path=[5,1a] | LINE E + LINE F |
| ⑨ | Inside [5,1a], i=1: 1b choose → path=[5,1a,1b] → PERM③ | LINE A |

---

### Backtrack Arrows — Wapas Kaise Aate Hain

```
GOING DOWN (choose):
  [] ──②──▶ [1a] ──③──▶ [1a,1b] ──④──▶ [1a,1b,5] ✅ PERM①
                                              │
                                         return (LINE A)
                                              │
COMING BACK (backtrack LINE G):               ▼
  [] ◀── [1a] ◀── [1a,1b] ◀──────────── path.pop() x2

Then:
  [1a] ──⑤──▶ [1a,5] ──⑥──▶ [1a,5,1b] ✅ PERM②
                                  │
                             return (LINE A)
                                  │
COMING BACK:                      ▼
  [] ◀── [1a] ◀──────────── path.pop() x2

Then:
  [] skips [1b] ❌ (duplicate check)
  [] ──⑦──▶ [5] ──⑧──▶ [5,1a] ──⑨──▶ [5,1a,1b] ✅ PERM③
```

---

## Part 3: Backtracking Ka Core Pattern

```typescript
// Yeh 3 lines ek saath kaam karti hain
used[i] = true;          // LINE E: choose (mark as used)
path.push(sortedValues[i]);

generatePermutations();  // LINE F: explore (recursive call)

path.pop();              // LINE G: unchoose (undo)
used[i] = false;
```

Ise aise socho:

```
Choose → Explore → Unchoose
  E         F          G
```

**Choose**: "Main is element ko path me daal raha hoon"

**Explore**: "Ab baki elements se baaki positions fill karo"
  - Yeh recursive call complete hoti hai
  - Baaki saari branches explore ho jaati hain
  - Phir return hota hai

**Unchoose**: "Woh choice undo karo, taaki doosri choices try ho sakein"

```
Agar unchoose na karo:
  path = [1] explore karo
  → [1,2,3] ✅
  path.pop() NAHI kiya
  path abhi bhi [1,2,3] hai
  i=1: path.push(2) → path = [1,2,3,2] ← WRONG!
```

---

## Part 4: Recursion Control Flow — Critical

Yeh confusion ka main point hai: **"return ke baad kya hota hai?"**

```
generatePermutations()  ← CALL A (root)
  i=0: choose 1
    generatePermutations()  ← CALL B
      i=1: choose 2
        generatePermutations()  ← CALL C
          BASE CASE: push [1,2,3]
          return  ← CALL C ends
        ← execution yahan wapas aati hai (CALL B me, LINE G)
        path.pop()
        used[1]=false
        ← loop continues: i=2
      i=2: choose 3
        generatePermutations()  ← CALL D
          BASE CASE: push [1,3,2]
          return ← CALL D ends
        ← execution yahan (CALL B, LINE G)
        path.pop()
        used[2]=false
        ← loop ends (i=3)
      return ← CALL B ends
    ← execution yahan (CALL A, LINE G)
    path.pop()
    used[0]=false
    ← loop continues: i=1
  i=1: choose 2
    ...
```

**Golden rule:**

```
Jab bhi generatePermutations() return karta hai,
execution wapas us jagah aati hai
jahan se call kiya tha (LINE F ke baad).

LINE F ke baad hamesha LINE G hai.
LINE G ke baad loop ka next iteration (i++) hai.
```

---

## Part 5: Duplicate Condition — Ek Table Me

```
Input: [1a, 1b, 5]

Condition: i > 0 AND same_value AND !used[i-1]
```

| Situation | used[i-1] | !used[i-1] | Condition | Decision | Reason |
|---|---|---|---|---|---|
| Root level, i=1 (1b) | F | T | TRUE | SKIP | 1a free hai, same branch dobara banega |
| Inside [1a, ?], i=1 (1b) | T | F | FALSE | ALLOW | 1a path me hai, yeh alag combo hai |
| Inside [5, ?], i=1 (1b) | F | T | TRUE | SKIP | 1a free hai, same branch dobara banega |
| Inside [5, 1a, ?], i=1 (1b) | T | F | FALSE | ALLOW | 1a path me hai, valid |

---

## Quick Summary

```
Recursion ka flow:
  choose → recurse → unchoose
  (E)       (F)       (G)

Backtrack kab?
  Jab recursive call return kare → LINE G immediately

Duplicate skip kab?
  Same value, same level, pehla already free (backtrack ho chuka)
  Matlab: !used[i-1] = true

Duplicate allow kab?
  Pehla same value path me hai (used[i-1] = true)
  Yeh genuinely alag combination hai
```