```
generatePermutations()                    path = []
├── i=0: Choose 1                         path = [1]
│   ├── generatePermutations()
│   │   ├── i=0: Skip (1 used)
│   │   ├── i=1: Choose 2                 path = [1, 2]
│   │   │   ├── generatePermutations()
│   │   │   │   ├── i=0: Skip (1 used)
│   │   │   │   ├── i=1: Skip (2 used)
│   │   │   │   └── i=2: Choose 3         path = [1, 2, 3] ✓ SAVE!
│   │   │   │       └── Backtrack → path = [1, 2], used[2]=false
│   │   │   └── Backtrack → path = [1], used[1]=false
│   │   ├── i=2: Choose 3                 path = [1, 3]
│   │   │   ├── generatePermutations()
│   │   │   │   ├── i=0: Skip (1 used)
│   │   │   │   ├── i=1: Choose 2         path = [1, 3, 2] ✓ SAVE!
│   │   │   │   │   └── Backtrack → path = [1, 3], used[1]=false
│   │   │   │   └── i=2: Skip (3 used)
│   │   │   └── Backtrack → path = [1], used[2]=false
│   └── Backtrack → path = [], used[0]=false
├── i=1: Choose 2                         path = [2]
│   ├── generatePermutations()
│   │   ├── i=0: Choose 1                 path = [2, 1]
│   │   │   ├── generatePermutations()
│   │   │   │   ├── i=0: Skip (1 used)
│   │   │   │   ├── i=1: Skip (2 used)
│   │   │   │   └── i=2: Choose 3         path = [2, 1, 3] ✓ SAVE!
│   │   │   │       └── Backtrack → path = [2, 1], used[2]=false
│   │   │   └── Backtrack → path = [2], used[0]=false
│   │   ├── i=1: Skip (2 used)
│   │   ├── i=2: Choose 3                 path = [2, 3]
│   │   │   ├── generatePermutations()
│   │   │   │   ├── i=0: Choose 1         path = [2, 3, 1] ✓ SAVE!
│   │   │   │   │   └── Backtrack → path = [2, 3], used[0]=false
│   │   │   │   ├── i=1: Skip (2 used)
│   │   │   │   └── i=2: Skip (3 used)
│   │   │   └── Backtrack → path = [2], used[2]=false
│   └── Backtrack → path = [], used[1]=false
└── i=2: Choose 3                         path = [3]
    ├── generatePermutations()
    │   ├── i=0: Choose 1                 path = [3, 1]
    │   │   ├── generatePermutations()
    │   │   │   ├── i=0: Skip (1 used)
    │   │   │   ├── i=1: Choose 2         path = [3, 1, 2] ✓ SAVE!
    │   │   │   │   └── Backtrack → path = [3, 1], used[1]=false
    │   │   │   └── i=2: Skip (3 used)
    │   │   └── Backtrack → path = [3], used[0]=false
    │   ├── i=1: Choose 2                 path = [3, 2]
    │   │   ├── generatePermutations()
    │   │   │   ├── i=0: Choose 1         path = [3, 2, 1] ✓ SAVE!
    │   │   │   │   └── Backtrack → path = [3, 2], used[0]=false
    │   │   │   ├── i=1: Skip (2 used)
    │   │   │   └── i=2: Skip (3 used)
    │   │   └── Backtrack → path = [3], used[1]=false
    │   └── i=2: Skip (3 used)
    └── Backtrack → path = [], used[2]=false
```


## COMPLETE Step-by-Step Execution Table

| Step | Current Frame | Action | `path` | `used` | What just happened |
|------|---------------|--------|--------|--------|--------------------|
| 1 | Root `[]` | Choose `i=0` -> push `1` | `[1]` | `[T, F, F]` | Start branch beginning with `1` |
| 2 | `[1]` | Skip `i=0` | `[1]` | `[T, F, F]` | `used[0]` is already true |
| 3 | `[1]` | Choose `i=1` -> push `2` | `[1, 2]` | `[T, T, F]` | Enter `[1, 2, ...]` |
| 4 | `[1, 2]` | Skip `i=0` | `[1, 2]` | `[T, T, F]` | `1` already used |
| 5 | `[1, 2]` | Skip `i=1` | `[1, 2]` | `[T, T, F]` | `2` already used |
| 6 | `[1, 2]` | Choose `i=2` -> push `3` | `[1, 2, 3]` | `[T, T, T]` | ✅ Base case: save `[1,2,3]` |
| 7 | Return to `[1, 2]` | Backtrack `i=2` | `[1, 2]` | `[T, T, F]` | Undo only the current frame's choice |
| 8 | Return to `[1]` | Backtrack `i=1` | `[1]` | `[T, F, F]` | `[1,2]` branch finished |
| 9 | `[1]` | Choose `i=2` -> push `3` | `[1, 3]` | `[T, F, T]` | Enter `[1, 3, ...]` |
| 10 | `[1, 3]` | Skip `i=0` | `[1, 3]` | `[T, F, T]` | `1` already used |
| 11 | `[1, 3]` | Choose `i=1` -> push `2` | `[1, 3, 2]` | `[T, T, T]` | ✅ Base case: save `[1,3,2]` |
| 12 | Return to `[1, 3]` | Backtrack `i=1` | `[1, 3]` | `[T, F, T]` | Undo choice `2` |
| 13 | `[1, 3]` | Skip `i=2` | `[1, 3]` | `[T, F, T]` | `3` already used |
| 14 | Return to `[1]` | Backtrack `i=2` | `[1]` | `[T, F, F]` | `[1,3]` branch finished |
| 15 | Return to Root `[]` | Backtrack `i=0` | `[]` | `[F, F, F]` | Branch starting with `1` finished |
| 16 | Root `[]` | Choose `i=1` -> push `2` | `[2]` | `[F, T, F]` | Start branch beginning with `2` |
| 17 | `[2]` | Choose `i=0` -> push `1` | `[2, 1]` | `[T, T, F]` | Enter `[2, 1, ...]` |
| 18 | `[2, 1]` | Skip `i=0` | `[2, 1]` | `[T, T, F]` | `1` already used |
| 19 | `[2, 1]` | Skip `i=1` | `[2, 1]` | `[T, T, F]` | `2` already used |
| 20 | `[2, 1]` | Choose `i=2` -> push `3` | `[2, 1, 3]` | `[T, T, T]` | ✅ Base case: save `[2,1,3]` |
| 21 | Return to `[2, 1]` | Backtrack `i=2` | `[2, 1]` | `[T, T, F]` | Undo choice `3` |
| 22 | Return to `[2]` | Backtrack `i=0` | `[2]` | `[F, T, F]` | `[2,1]` branch finished |
| 23 | `[2]` | Skip `i=1` | `[2]` | `[F, T, F]` | `2` already used |
| 24 | `[2]` | Choose `i=2` -> push `3` | `[2, 3]` | `[F, T, T]` | Enter `[2, 3, ...]` |
| 25 | `[2, 3]` | Choose `i=0` -> push `1` | `[2, 3, 1]` | `[T, T, T]` | ✅ Base case: save `[2,3,1]` |
| 26 | Return to `[2, 3]` | Backtrack `i=0` | `[2, 3]` | `[F, T, T]` | Undo choice `1` |
| 27 | `[2, 3]` | Skip `i=1` | `[2, 3]` | `[F, T, T]` | `2` already used |
| 28 | `[2, 3]` | Skip `i=2` | `[2, 3]` | `[F, T, T]` | `3` already used |
| 29 | Return to `[2]` | Backtrack `i=2` | `[2]` | `[F, T, F]` | `[2,3]` branch finished |
| 30 | Return to Root `[]` | Backtrack `i=1` | `[]` | `[F, F, F]` | Branch starting with `2` finished |
| 31 | Root `[]` | Choose `i=2` -> push `3` | `[3]` | `[F, F, T]` | Start branch beginning with `3` |
| 32 | `[3]` | Choose `i=0` -> push `1` | `[3, 1]` | `[T, F, T]` | Enter `[3, 1, ...]` |
| 33 | `[3, 1]` | Skip `i=0` | `[3, 1]` | `[T, F, T]` | `1` already used |
| 34 | `[3, 1]` | Choose `i=1` -> push `2` | `[3, 1, 2]` | `[T, T, T]` | ✅ Base case: save `[3,1,2]` |
| 35 | Return to `[3, 1]` | Backtrack `i=1` | `[3, 1]` | `[T, F, T]` | Undo choice `2` |
| 36 | `[3, 1]` | Skip `i=2` | `[3, 1]` | `[T, F, T]` | `3` already used |
| 37 | Return to `[3]` | Backtrack `i=0` | `[3]` | `[F, F, T]` | `[3,1]` branch finished |
| 38 | `[3]` | Choose `i=1` -> push `2` | `[3, 2]` | `[F, T, T]` | Enter `[3, 2, ...]` |
| 39 | `[3, 2]` | Choose `i=0` -> push `1` | `[3, 2, 1]` | `[T, T, T]` | ✅ Base case: save `[3,2,1]` |
| 40 | Return to `[3, 2]` | Backtrack `i=0` | `[3, 2]` | `[F, T, T]` | Undo choice `1` |
| 41 | `[3, 2]` | Skip `i=1` | `[3, 2]` | `[F, T, T]` | `2` already used |
| 42 | `[3, 2]` | Skip `i=2` | `[3, 2]` | `[F, T, T]` | `3` already used |
| 43 | Return to `[3]` | Backtrack `i=1` | `[3]` | `[F, F, T]` | `[3,2]` branch finished |
| 44 | `[3]` | Skip `i=2` | `[3]` | `[F, F, T]` | `3` already used |
| 45 | Return to Root `[]` | Backtrack `i=2` | `[]` | `[F, F, F]` | Branch starting with `3` finished |
| 46 | Root `[]` | Loop ends | `[]` | `[F, F, F]` | All permutations generated |