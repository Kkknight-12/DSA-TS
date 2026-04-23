# Reverse Stack - Notes

## 1. Problem Samjho

Hume ek stack reverse karna hai using recursion only.

Array form me stack ko aise samjho:

```txt
[4, 1, 3, 2]
 ^        ^
bottom   top
```

Reverse ke baad:

```txt
[2, 3, 1, 4]
 ^        ^
bottom   top
```

Matlab:

```txt
top bottom banega
bottom top banega
```

Restriction important hai:

```txt
core logic me loop nahi
extra stack / array nahi
sirf recursion + stack operations
```

---

## 2. Brute Force

Brute force soch:

```txt
stack ke saare elements temporary array me daal do
phir reverse order me wapas push kar do
```

Problem:

```txt
Ye extra data structure use karta hai
jo problem allow nahi karti
```

Dusri brute soch:

```txt
bar-bar bottom element nikaalo aur top par daalo
```

Problem:

```txt
stack me bottom directly access hi nahi hota
sirf top se kaam kar sakte hain
```

So recursion hi temporary storage ka kaam karegi.

---

## 3. Key Insight

Important observation:

```txt
Stack me hum sirf top pop kar sakte hain.
Bottom tak pahunchne ke liye upar ke saare elements temporarily hatane padenge.
```

Isi liye do recursive functions chahiye:

| function | job |
|---|---|
| `reverseStack` | poore stack ko reverse karna |
| `insertAtBottom` | ek element ko bottom me insert karna |

High-level flow:

```txt
reverseStack:
  top hatao
  rest reverse karo
  removed top ko bottom me daalo
```

---

## 4. Why This Technique Works

Suppose stack:

```txt
[4, 1, 3, 2]
```

`reverseStack` first `2` hata deta hai.

Ab problem chhoti ho gayi:

```txt
[4, 1, 3]
```

Agar recursion guarantee de de ki:

```txt
[4, 1, 3] -> [3, 1, 4]
```

toh ab removed `2` ko bas bottom me place karna hai:

```txt
[3, 1, 4] -> [2, 3, 1, 4]
```

Yahi complete reverse hai.

So har frame ka contract:

```txt
smaller stack reverse kar do
phir current removed top ko bottom me daal do
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `stack` | current stack state |
| `topElement` | current recursion frame ka popped top |
| `valueToInsert` | jo helper ko bottom me place karna hai |

State example:

```txt
stack = [4, 1, 3]
topElement = 2
```

Meaning:

```txt
Original bigger stack se 2 remove ho chuka hai.
Ab hume smaller stack [4,1,3] ko reverse karna hai.
Uske baad 2 ko bottom me place karna hai.
```

---

## 6. Mental Model

Is problem ko do phases me socho:

### Phase 1: Expansion

```txt
top pop hote jayenge
stack chhoti hoti jayegi
```

Example:

```txt
[4, 1, 3, 2]
[4, 1, 3]
[4, 1]
[4]
[]
```

### Phase 2: Unwinding

Ab actual reverse dikhna start hota hai:

```txt
insert 4 at bottom -> [4]
insert 1 at bottom -> [1, 4]
insert 3 at bottom -> [3, 1, 4]
insert 2 at bottom -> [2, 3, 1, 4]
```

Decision tree:

```txt
reverseStack([4,1,3,2])
│
├── pop 2
│   reverseStack([4,1,3])
│   │
│   ├── pop 3
│   │   reverseStack([4,1])
│   │   │
│   │   ├── pop 1
│   │   │   reverseStack([4])
│   │   │   │
│   │   │   ├── pop 4
│   │   │   │   reverseStack([])
│   │   │   │   └── base case
│   │   │   └── insert 4 at bottom
│   │   └── insert 1 at bottom
│   └── insert 3 at bottom
└── insert 2 at bottom
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty stack | `[]` | `[]` | reverse karne ko kuch nahi |
| one element | `[5]` | `[5]` | already reversed |
| two elements | `[1,2]` | `[2,1]` | top-bottom swap ho jata hai |
| duplicate values | `[7,7,7]` | `[7,7,7]` | values same hone par order visible nahi but logic same hai |
| negative numbers | `[-5,10,-3,2]` | `[2,-3,10,-5]` | sign se logic par koi effect nahi |

---

## 8. Conditions

### `stack.length === 0`

Meaning:

```txt
current recursion frame empty stack tak pahunch gaya
```

`reverseStack` me:

```txt
ab smaller problem nahi bachi
return karo
```

`insertAtBottom` me:

```txt
yahi actual bottom position hai
value ko push kar do
```

### Why same condition do jagah par alag meaning deti hai?

Because function ka goal alag hai:

| function | empty stack ka meaning |
|---|---|
| `reverseStack` | reverse karne ko kuch nahi |
| `insertAtBottom` | bottom position mil gayi |

---

## 9. Adjustment Logic

Yahan pointer adjustment nahi hai, but stack adjustment hai.

### `reverseStack` me kya adjust hota hai?

| step | stack state | reason |
|---|---|---|
| pop top | stack chhoti hoti hai | smaller subproblem banana hai |
| recurse | remaining stack reverse hoti hai | same problem smaller size par solve hoti hai |
| insertAtBottom | removed top bottom me chala jata hai | reverse build hota hai |

### `insertAtBottom` me kya adjust hota hai?

| step | stack state | reason |
|---|---|---|
| pop top | upar ka blocker hat raha hai | bottom tak pahunchna hai |
| recurse | aur neeche ja rahe hain | empty stack tak pahunchna hai |
| push popped top back | original relative order restore hota hai | sirf inserted value bottom me nayi aati hai |

---

## 10. Answer Formula

Yahan direct numeric formula nahi hai.

Yahan important formula recurrence ka hai:

```txt
T(n) = T(n - 1) + O(n)
```

Why?

```txt
reverseStack ek element hata kar size n - 1 wali problem solve karta hai
phir insertAtBottom worst case O(n) ka kaam karta hai
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
| 4 | `[4]` | `4` | `[]` |
| 5 | `[]` | base case | return |

### Unwinding Table

| returning frame | stack before bottom insertion | value inserted at bottom | stack after insertion |
|---|---|---|---|
| call 4 | `[]` | `4` | `[4]` |
| call 3 | `[4]` | `1` | `[1, 4]` |
| call 2 | `[1, 4]` | `3` | `[3, 1, 4]` |
| call 1 | `[3, 1, 4]` | `2` | `[2, 3, 1, 4]` |

### Nested View

```txt
CALL 1: reverseStack([4,1,3,2])
  pop 2
  CALL 2: reverseStack([4,1,3])
    pop 3
    CALL 3: reverseStack([4,1])
      pop 1
      CALL 4: reverseStack([4])
        pop 4
        CALL 5: reverseStack([])
          return
        insertAtBottom([], 4) -> [4]
      insertAtBottom([4], 1) -> [1,4]
    insertAtBottom([1,4], 3) -> [3,1,4]
  insertAtBottom([3,1,4], 2) -> [2,3,1,4]
```

Final:

```txt
[4, 1, 3, 2] -> [2, 3, 1, 4]
```

---

## 12. Quick Reference

| point | summary |
|---|---|
| top position | array ka last index |
| bottom position | array ka index `0` |
| main trick | top hatao, rest reverse karo, removed top bottom me daalo |
| helper trick | empty tak jao, value push karo, removed tops restore karo |
| time | `O(n^2)` |
| space | `O(n)` |
| important phase | actual reverse unwind me visible hota hai |
