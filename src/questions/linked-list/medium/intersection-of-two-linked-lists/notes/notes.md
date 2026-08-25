# Intersection of Two Linked Lists - Notes

## 1. Problem Samjho

Do linked lists diye gaye hain.
Hume first shared node dhoondhna hai.

Most important line:

```txt
intersection value same hone se nahi hota
intersection same node reference hone se hota hai
```

Example:

```txt
ListA: 4 -> 1 -> 8 -> 4 -> 5
ListB: 5 -> 6 -> 1 -> 8 -> 4 -> 5
```

Yahan answer `8` isliye hai kyunki:

```txt
8 se aage wali tail dono lists me actually shared hai
```

---

## 2. Brute Force Soch

Sabse seedha idea:

```txt
listA ke har node ko listB ke har node ke saath compare karo
```

Agar kisi bhi point par:

```txt
nodeA === nodeB
```

mil gaya,
toh wahi intersection hai.

Ye samajhne ke liye achha hai,
lekin efficient nahi.

---

## 3. Better Soch

Brute force me repetition bahut tha.
Same comparison baar-baar ho raha tha.

Toh better idea:

```txt
listA ke saare node references set me store karo
phir listB scan karte waqt dekh lo current node set me hai ya nahi
```

Important:

```txt
set values nahi, references store karta hai
```

So same value wali alag node galat answer nahi degi.

---

## 4. Key Insight for Optimal Approaches

Intersection ke baad wali tail shared hoti hai.
Matlab agar kisi tarah dono pointers ko:

```txt
same remaining distance from shared tail
```

mil jaye,
toh parallel movement se answer mil jayega.

Ye 2 tareekon se hota hai:

```txt
1. lengths nikaal kar longer list align karo
2. switch pointers so both travel equal total distance
```

---

## 5. Variables

### Brute force

| Variable | Meaning |
|---|---|
| `currentA` | listA ka outer-loop candidate |
| `currentB` | listB ka inner-loop candidate |

### Better

| Variable | Meaning |
|---|---|
| `seenNodes` | listA ke saare node references ka set |
| `currentA` | set build karne ke liye listA traversal pointer |
| `currentB` | listB scan karne ke liye pointer |

### Optimal length alignment

| Variable | Meaning |
|---|---|
| `lengthA` | listA ki total length |
| `lengthB` | listB ki total length |
| `difference` | dono lengths ka absolute difference |
| `currentA` | aligned traversal pointer for listA |
| `currentB` | aligned traversal pointer for listB |

### Optimal switch

| Variable | Meaning |
|---|---|
| `pointerA` | pehle listA, phir listB traverse karne wala pointer |
| `pointerB` | pehle listB, phir listA traverse karne wala pointer |

---

## 6. Mental Model

Is problem ko “same value dhoondo” ki tarah mat socho.
Isko “same tail ko kaunse point se dono share karne lagte hain” ki tarah socho.

Visual:

```txt
listA private part -> shared tail
listB private part -> shared tail
```

Agar private parts different length ke hain,
toh pehle unka gap handle karna hoga.

---

## 7. Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| no intersection | `[2,6,4]` and `[1,5]` | `null` | koi shared node reference hi nahi |
| same head | both heads same node | head | intersection first node se hi start hota hai |
| one list empty | `null` and `[1,2]` | `null` | shared node possible hi nahi |
| same values, different nodes | `[1,2,3]` and `[1,2,3]` | `null` | values same hain, references alag |
| shared single tail node | `[a...]` and `[b...]` both end at `30` | node `30` | only last node shared hai |

---

## 8. Conditions

### `headA === null || headB === null`

Meaning:

```txt
kam se kam ek list exist hi nahi karti
```

Action:

```txt
answer null
```

### `currentA === currentB`

Meaning:

```txt
dono pointers same actual node par aa gaye
```

Yahi correct intersection condition hai.

### `pointerA = pointerA === null ? headB : pointerA.next`

Meaning:

```txt
agar pointerA ne apni first list finish kar li
toh ab use doosri list ka private prefix cover karna hai
```

---

## 9. Dry Run - Better Approach

Example:

```txt
ListA: 4 -> 1 -> 8 -> 4 -> 5
ListB: 5 -> 6 -> 1 -> 8 -> 4 -> 5
```

### Phase 1: set build karo

| Step | `currentA` | Action | Set state |
|---|---|---|---|
| 1 | `4A` | add | `{4A}` |
| 2 | `1A` | add | `{4A, 1A}` |
| 3 | `8` | add | `{4A, 1A, 8}` |
| 4 | `4` | add | `{4A, 1A, 8, 4}` |
| 5 | `5` | add | `{4A, 1A, 8, 4, 5}` |

### Phase 2: listB scan karo

| Step | `currentB` | `seenNodes.has(currentB)` | Result |
|---|---|---|---|
| 1 | `5B` | no | move ahead |
| 2 | `6B` | no | move ahead |
| 3 | `1B` | no | same value but different node |
| 4 | `8` | yes | return shared node |

---

## 10. Dry Run - Optimal Length Alignment

Same example:

```txt
lengthA = 5
lengthB = 6
difference = 1
```

Since listB longer hai:

```txt
currentB ko 1 step aage move karo
```

Aligned state:

```txt
currentA: 4 -> 1 -> 8 -> 4 -> 5
currentB: 6 -> 1 -> 8 -> 4 -> 5
```

Parallel scan:

| Step | `currentA` | `currentB` | Match? |
|---|---|---|---|
| 1 | `4` | `6` | no |
| 2 | `1A` | `1B` | no, value same but node different |
| 3 | `8` | `8` | yes |

Return shared node `8`.

---

## 11. Dry Run - Optimal Switch Method

Let:

```txt
listA private length = a
listB private length = b
shared tail length = c
```

Then:

```txt
listA total = a + c
listB total = b + c
```

Pointer travel table:

| Pointer | First pass | After switch | Total before meet |
|---|---|---|---|
| `pointerA` | `a + c` | `b` | `a + b + c` |
| `pointerB` | `b + c` | `a` | `a + b + c` |

So both cover equal total distance.

Practical flow:

| Round | `pointerA` | `pointerB` |
|---|---|---|
| start | `4` | `5` |
| 1 | `1` | `6` |
| 2 | `8` | `1` |
| 3 | `4` | `8` |
| ... | continue | continue |
| after switches | aligned by total distance | aligned by total distance |
| final | `8` | `8` |

If no intersection:

```txt
dono final me null par milte hain
```

---

## 12. Complexity and Final Takeaway

| Approach | Time | Space |
|---|---:|---:|
| Brute Force | O(m * n) | O(1) |
| Better Set | O(m + n) | O(m) |
| Optimal Length Alignment | O(m + n) | O(1) |
| Optimal Switch | O(m + n) | O(1) |

Best memory line:

```txt
intersection = same reference
not same value
```

Best intuition line:

```txt
shared tail tak dono pointers ko equal remaining distance par lao
```

Interview preference:

```txt
optimal-switch sabse elegant hai
optimal length-alignment sabse direct explainable hai
```
