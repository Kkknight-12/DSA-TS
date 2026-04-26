# Sort Stack - Notes

## 1. Problem Samjho

Hume ek stack sort karna hai using recursion only.

Array form me stack ko aise treat kar rahe hain:

```txt
[4, 1, 3, 2]
 ^        ^
bottom   top
```

Sorted stack ka meaning:

```txt
smallest bottom par
largest top par
```

So sorted result:

```txt
[1, 2, 3, 4]
 ^        ^
bottom   top
```

Restriction:

```txt
loop nahi
extra stack nahi
extra array nahi
sirf recursion + stack operations
```

---

## 2. Brute Force

Brute force idea:

```txt
stack ke elements ko kisi temporary array me nikalo
sort karo
phir wapas stack me daal do
```

Problem:

```txt
extra data structure use ho raha hai
jo allowed nahi hai
```

Dusra brute idea:

```txt
bar-bar correct position find karne ke liye loop chalao
```

Problem:

```txt
problem recursion-only demand karti hai
```

So recursion hi search + temporary storage dono ka kaam karegi.

---

## 3. Key Insight

Stack me sirf top directly accessible hota hai.

Isliye sorting ko do recursive parts me todte hain:

| function | role |
|---|---|
| `sortStack` | top hata kar remaining stack sort karta hai |
| `insertSorted` | removed value ko sorted stack me sahi jagah insert karta hai |

High-level flow:

```txt
top pop karo
rest sort karo
removed top ko correct sorted position par wapas daalo
```

---

## 4. Why This Technique Works

Maan lo recursion ne hume already yeh de diya:

```txt
remaining stack sorted hai
```

Example:

```txt
sorted remaining stack = [1, 3, 4]
removed value = 2
```

Ab hume bas `2` ko sahi jagah rakhna hai.

`insertSorted` karega:

```txt
2 < 4 -> 4 hatao
2 < 3 -> 3 hatao
2 >= 1 -> 1 ke upar 2 rakho
phir 3 aur 4 wapas rakho
```

Result:

```txt
[1, 2, 3, 4]
```

So har frame ka contract:

```txt
smaller stack ko sort karo
current removed top ko sorted stack me insert karo
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `stack` | current stack state |
| `topElement` | `sortStack` frame ka popped top |
| `valueToInsert` | helper ko sorted stack me place karni wali value |
| `currentTop` | helper ke time stack ka abhi ka visible top |
| `removedTop` | helper ne temporarily hataya hua bada element |

State example:

```txt
stack = [1, 3, 4]
valueToInsert = 2
currentTop = 4
```

Meaning:

```txt
current stack already sorted hai
2 ko 4 ke neeche place karna padega
```

---

## 6. Mental Model

Is problem ko do phases me samjho:

### Phase 1: Expansion

```txt
top elements remove hote jayenge
stack smaller hoti jayegi
```

For `[4, 1, 3, 2]`:

```txt
[4, 1, 3, 2]
[4, 1, 3]
[4, 1]
[4]
```

### Phase 2: Unwinding

Ab actual sorting dikhna start hoti hai:

```txt
insert 1 into [4]     -> [1, 4]
insert 3 into [1, 4]  -> [1, 3, 4]
insert 2 into [1,3,4] -> [1, 2, 3, 4]
```

Recursion tree:

```txt
sortStack([4,1,3,2])
│
├── pop 2
│   sortStack([4,1,3])
│   │
│   ├── pop 3
│   │   sortStack([4,1])
│   │   │
│   │   ├── pop 1
│   │   │   sortStack([4])
│   │   │   └── base case
│   │   └── insert 1 -> [1,4]
│   └── insert 3 -> [1,3,4]
└── insert 2 -> [1,2,3,4]
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty stack | `[]` | `[]` | already sorted |
| one element | `[5]` | `[5]` | no reordering needed |
| two unsorted | `[2,1]` | `[1,2]` | helper sahi position par daal dega |
| duplicates | `[7,7,7]` | `[7,7,7]` | `<=` comparison duplicates ko handle karta hai |
| negatives | `[-5,10,-3,2]` | `[-5,-3,2,10]` | comparison sign-independent hai |

---

## 8. Conditions

### `stack.length <= 1`

Meaning:

```txt
empty ya single-element stack hai
```

Action:

```txt
already sorted, return
```

### `stack.length === 0` inside helper

Meaning:

```txt
helper bottom-most possible insertion point tak pahunch gaya
```

Action:

```txt
value ko push karo
```

### `currentTop <= valueToInsert`

Meaning:

```txt
valueToInsert ko currentTop ke upar rakhne se ascending order nahi tootega
```

Example:

```txt
stack = [1, 3]
valueToInsert = 4
```

Because:

```txt
3 <= 4
```

So:

```txt
[1, 3, 4]
```

sorted hi rahega.

---

## 9. Adjustment Logic

Yahan pointer movement nahi hai, but stack adjustment hai.

### `sortStack` me adjustment

| step | stack state | why |
|---|---|---|
| pop top | stack smaller hoti hai | smaller subproblem banana hai |
| recurse | smaller stack sort hoti hai | sorted guarantee build hoti hai |
| insertSorted | removed top correct jagah aata hai | full sorted stack build hoti hai |

### `insertSorted` me adjustment

| step | stack state | why |
|---|---|---|
| compare with top | decide hota hai aur neeche jaana hai ya nahi | correct insertion position find karni hai |
| pop bigger top | temporary blocker hat raha hai | value ko neeche place karna hai |
| recurse deeper | smaller stack me same problem solve hoti hai | correct spot milti hai |
| push removedTop back | bigger elements top side restore hote hain | sorted order maintain hota hai |

---

## 10. Answer Formula

Direct numeric formula nahi hai.

Important recurrence:

```txt
T(n) = T(n - 1) + O(n)
```

Why?

```txt
sortStack ek top hata kar size n - 1 wali problem solve karta hai
insertSorted worst case O(n) time leta hai
```

So:

```txt
T(n) = O(n^2)
```

Space:

```txt
O(n)
```

because recursion depth stack size ke proportional hoti hai.

---

## 11. Full Dry Run

Example:

```txt
stack = [4, 1, 3, 2]
```

### Expansion Table

| call | current stack before pop | popped top | remaining stack after pop |
|---|---|---|---|
| 1 | `[4, 1, 3, 2]` | `2` | `[4, 1, 3]` |
| 2 | `[4, 1, 3]` | `3` | `[4, 1]` |
| 3 | `[4, 1]` | `1` | `[4]` |
| 4 | `[4]` | base case | return |

### Unwinding Table

| returning frame | sorted stack before insertion | value inserted | stack after insertion |
|---|---|---|---|
| call 3 | `[4]` | `1` | `[1, 4]` |
| call 2 | `[1, 4]` | `3` | `[1, 3, 4]` |
| call 1 | `[1, 3, 4]` | `2` | `[1, 2, 3, 4]` |

### Helper Detail For `insertSorted([1, 3, 4], 2)`

| step | stack | action | reason |
|---|---|---|---|
| 1 | `[1, 3, 4]` | compare top `4` with `2` | `4` bigger hai, neeche jaana padega |
| 2 | `[1, 3]` | pop `4` | temporary blocker hata |
| 3 | `[1, 3]` | compare top `3` with `2` | `3` bhi bigger hai |
| 4 | `[1]` | pop `3` | aur neeche jao |
| 5 | `[1]` | compare top `1` with `2` | `1 <= 2`, yahi correct spot hai |
| 6 | `[1, 2]` | push `2` | inserted |
| 7 | `[1, 2, 3]` | push back `3` | restore |
| 8 | `[1, 2, 3, 4]` | push back `4` | restore |

Final:

```txt
[4, 1, 3, 2] -> [1, 2, 3, 4]
```

---

## 12. Quick Reference

| point | summary |
|---|---|
| top position | array ka last index |
| bottom position | array ka index `0` |
| main trick | top hatao, rest sort karo, removed top ko sorted order me wapas daalo |
| helper trick | agar top bada hai toh hatao, deeper recurse karo, phir wapas rakho |
| sorted order | bottom se top ascending |
| time | `O(n^2)` |
| space | `O(n)` |
