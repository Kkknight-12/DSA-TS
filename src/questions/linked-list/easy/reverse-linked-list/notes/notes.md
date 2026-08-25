# Reverse Linked List - Notes

## 1. Problem Samjho

Hume singly linked list ka head diya hai.
Task hai poori linked list ko reverse karna.

Original:

```txt
1 -> 2 -> 3 -> 4 -> null
```

Reversed:

```txt
4 -> 3 -> 2 -> 1 -> null
```

Important baat:

```txt
sirf values reverse dikhna enough nahi
actual next links ki direction reverse honi chahiye
```

---

## 2. Brute Force

Brute force idea:

```txt
saare original nodes ko array me store karo
phir array ko backward read karke next pointers dobara jod do
```

Example:

```txt
nodes = [node(1), node(2), node(3), node(4)]
```

Backward relink:

```txt
node(4).next = node(3)
node(3).next = node(2)
node(2).next = node(1)
node(1).next = null
```

Yeh simple hai, but extra array use karta hai.

---

## 3. Key Insight

Optimal solution ka core idea bahut small hai:

```txt
har node ka next pointer ulta karte chalo
```

Lekin issue ye hai:

```txt
current.next ko reverse karne se pehle
aage wali list ka address bachana padega
```

Isliye 3 pointers chahiye:

```txt
prev
current
nextNode
```

---

## 4. Why This Technique Works

Suppose current state ye hai:

```txt
prev <- current -> nextNode -> ...
```

Reversal me hume chahiye:

```txt
current -> prev
```

Lekin `current.next = prev` karte hi original `nextNode` ka path toot jayega.

So safe sequence hamesha:

```txt
1. nextNode = current.next
2. current.next = prev
3. prev = current
4. current = nextNode
```

Is order me:

```txt
na reversed part toot ta hai
na remaining original part kho jata hai
```

Recursion bhi same logic ka doosra form hai.
Wahan reverse work deepest call se unwind hote waqt hota hai.

---

## 5. Variables

### Iterative solution

| Variable | Meaning |
|---|---|
| `prev` | reversed part ka current head |
| `current` | jis node ko abhi process kar rahe hain |
| `nextNode` | original forward direction ka backup |

### Brute force solution

| Variable | Meaning |
|---|---|
| `nodes` | original order me stored node references |
| `newHead` | reversed list ka head, yani original last node |
| `index` | array ko backward traverse karne ke liye |

### Recursive solution

| Variable | Meaning |
|---|---|
| `head` | current recursion frame ka node |
| `newHead` | fully reversed sublist ka head |

Short memory:

```txt
iterative = links reverse while moving forward
recursion = baaki list reverse karao, phir current attach karo
```

---

## 6. Mental Model

Iterative version ko do parts me socho:

```txt
left side = already reversed
right side = still original
```

Example mid-state:

```txt
3 -> 2 -> 1 -> null      4 -> 5 -> null
^ reversed part          ^ remaining original part
```

Recursion version ko stack ke roop me socho:

```txt
call deep jaati hai last node tak
phir wapas aate hue arrows reverse hote hain
```

---

## 7. Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Empty list | `[]` | `[]` | reverse karne ko kuch nahi |
| Single node | `[7]` | `[7]` | ek hi node head bhi hai tail bhi |
| Two nodes | `[1,2]` | `[2,1]` | simplest real reversal |
| Multiple nodes | `[1,2,3,4,5]` | `[5,4,3,2,1]` | general case |
| Negative values | `[-3,-2,-1]` | `[-1,-2,-3]` | values sign se logic change nahi hota |

---

## 8. Conditions

### `head === null || head.next === null`

Meaning:

```txt
list empty hai ya already length 1 hai
```

Action:

```txt
same head return karo
```

Why:

```txt
reverse ka visible effect tabhi aata hai jab kam se kam 2 nodes hon
```

### `while (current !== null)`

Meaning:

```txt
abhi bhi koi original node baaki hai jiska link reverse karna hai
```

Loop stop:

```txt
current null -> saare nodes process ho gaye
```

### `head.next.next = head` in recursion

Meaning:

```txt
current node ke original next node se
ab wapas current node ki taraf arrow banao
```

Why needed:

```txt
yehi actual reverse connection banata hai
```

### `head.next = null` in recursion

Meaning:

```txt
current node ka purana forward link tod do
```

Why needed:

```txt
agar purana link nahi toda toh cycle ban sakti hai
```

---

## 9. Step-by-Step Dry Run

### Iterative dry run

Input:

```txt
1 -> 2 -> 3 -> 4 -> null
```

| Iteration | `prev` before | `current` before | `nextNode` backup | Link reversed to | `prev` after | `current` after |
|---:|---|---|---|---|---|---|
| 1 | `null` | `1` | `2` | `1 -> null` | `1` | `2` |
| 2 | `1 -> null` | `2` | `3` | `2 -> 1` | `2 -> 1` | `3` |
| 3 | `2 -> 1` | `3` | `4` | `3 -> 2` | `3 -> 2 -> 1` | `4` |
| 4 | `3 -> 2 -> 1` | `4` | `null` | `4 -> 3` | `4 -> 3 -> 2 -> 1` | `null` |

Final:

```txt
prev = 4 -> 3 -> 2 -> 1 -> null
```

### Brute force dry run

Input:

```txt
1 -> 2 -> 3 -> 4 -> null
```

Store phase:

| Visit order | Current node | `nodes` array |
|---:|---|---|
| 1 | `1` | `[1]` |
| 2 | `2` | `[1, 2]` |
| 3 | `3` | `[1, 2, 3]` |
| 4 | `4` | `[1, 2, 3, 4]` |

Relink phase:

| Backward index | Action | Partial result |
|---:|---|---|
| 3 | `4.next = 3` | `4 -> 3` |
| 2 | `3.next = 2` | `4 -> 3 -> 2` |
| 1 | `2.next = 1` | `4 -> 3 -> 2 -> 1` |
| tail fix | `1.next = null` | `4 -> 3 -> 2 -> 1 -> null` |

### Recursive dry run

Input:

```txt
1 -> 2 -> 3 -> null
```

Call path:

```txt
reverse(1) -> reverse(2) -> reverse(3)
```

Unwind table:

| Returning frame | `newHead` already is | Reverse action | Result after action |
|---|---|---|---|
| `head = 3` | `3` | base case, no change | `3 -> null` |
| `head = 2` | `3` | `3.next = 2`, `2.next = null` | `3 -> 2 -> null` |
| `head = 1` | `3` | `2.next = 1`, `1.next = null` | `3 -> 2 -> 1 -> null` |

---

## 10. Correctness

### Iterative

Invariant:

```txt
`prev` hamesha reversed prefix ko represent karta hai
`current` hamesha next unprocessed node ko represent karta hai
```

Har iteration me:

```txt
ek node original side se nikal kar reversed side me add hota hai
```

Jab `current = null` ho jata hai:

```txt
saare nodes reversed side me aa chuke hote hain
```

So `prev` final reversed head hota hai.

### Recursive

Recursive hypothesis:

```txt
reverseList(head.next) correctly smaller sublist ko reverse karta hai
```

Then current frame:

```txt
current node ko us reversed sublist ke end me attach kar deta hai
```

So poori list bhi correctly reverse hoti hai.

---

## 11. Complexity

| Approach | Time | Space | Reason |
|---|---:|---:|---|
| Brute force | O(n) | O(n) | array stores all nodes |
| Optimal iterative | O(n) | O(1) | only three pointers |
| Recursion | O(n) | O(n) | call stack depth `n` |

Interview preference:

```txt
optimal iterative > recursion > brute force
```

Kyunki iterative:

```txt
simple bhi hai aur O(1) extra space bhi use karta hai
```

---

## 12. Final Takeaway

Reverse linked list ka one-line essence:

```txt
har node ka arrow ulta karo, bina aage ka path khoye
```

Yaad rakhne ka shortest version:

```txt
nextNode bachao
link reverse karo
prev aage badhao
current aage badhao
```

Aur recursion version me:

```txt
last node new head banta hai
baaki unwind hote hue uske peeche judte jaate hain
```

