# Copy List with Random Pointer - Notes

## 1. Problem Samjho

Hume ek linked list di hui hai jisme har node ke paas:

```txt
next
random
```

do pointers hote hain.

Task:

```txt
same structure ki deep copy banao
```

Deep copy ka matlab:

```txt
values same hon
next chain same ho
random jumps same ho
lekin saare nodes naye hon
```

Example:

```txt
original:
7 -> 13 -> 11

13.random -> 7
11.random -> 13
```

Copy me bhi:

```txt
7' -> 13' -> 11'

13'.random -> 7'
11'.random -> 13'
```

Important:

```txt
13'.random -> 7
ye galat hoga
kyunki woh original node hai, copied node nahi
```

---

## 2. Brute Force Soch Kyu Direct Nahi Chalegi

Naive soch ho sakti hai:

```txt
ek pass me new nodes banao
aur usi time next aur random bhi set kar do
```

Problem:

```txt
current original node ka random shayad aise node par ho
jiska copy abhi bana hi nahi
```

Example:

```txt
7 -> 13 -> 11
7.random -> 11
```

Jab `7` ka copy bana rahe ho,
`11'` abhi exist hi nahi karta.

Isliye hume ya toh:

```txt
old node -> new node mapping store karni padegi
```

ya:

```txt
structure ko temporarily is tarah arrange karna padega
ki mapping list ke andar hi mil jaye
```

---

## 3. Key Insight

Is problem ka real heart ye relation hai:

```txt
original node ka corresponding copied node kaise milega?
```

Do standard answers hain:

### HashMap

```txt
oldToNew[original] = copied
```

### Interweaving

```txt
original.next = copied
```

Matlab optimal approach me hum map ko memory me nahi,
list structure ke andar encode kar dete hain.

---

## 4. Why These Techniques Work

### HashMap approach

Har original node ka copied node map me store hota hai.
Isliye original ke kisi bhi outgoing pointer ko translate kar sakte hain:

```txt
original.next   -> copied.next
original.random -> copied.random
```

by doing:

```txt
oldToNew.get(original.next)
oldToNew.get(original.random)
```

### Interweaving approach

Suppose weaving ke baad:

```txt
7 -> 7' -> 13 -> 13' -> 11 -> 11'
```

Ab agar:

```txt
13.random -> 7
```

toh:

```txt
13.random.next -> 7'
```

Yahi copied target hai.

So:

```txt
13'.random = 13.random.next
```

---

## 5. Variables

### HashMap approach

| Variable | Meaning |
|---|---|
| `oldToNew` | original node se copied node ki mapping |
| `current` | jis original node ko abhi process kar rahe hain |
| `copiedNode` | `current` ka copied version |

### Optimal interweaving approach

| Variable | Meaning |
|---|---|
| `current` | current original node |
| `nextOriginal` | original chain ka अगला node backup |
| `copyNode` | `current` ke turant baad inserted copied node |
| `copiedHead` | final copied list ka head |

Short memory:

```txt
HashMap: old se new lookup
Optimal: old ke just baad new
```

### Variables ka flow kaise change hota hai?

#### HashMap

1. First pass:

```txt
current original node par hota hai
uska copy banta hai
map me relation store hota hai
```

2. Second pass:

```txt
same current original node se copiedNode nikalte hain
phir copiedNode.next aur copiedNode.random wire karte hain
```

#### Optimal

1. Weaving pass:

```txt
current = original
copyNode = current ka clone
nextOriginal backup me save hota hai
phir current -> copyNode -> nextOriginal ban jata hai
```

2. Random pass:

```txt
copyNode = current.next
copyNode.random = current.random?.next
```

3. Separation pass:

```txt
current.next original chain restore karta hai
copyNode.next copied chain build karta hai
```

---

## 6. Mental Model

Problem ko “linked list clone” mat socho.
Isko “graph of pointers” samjho jisme har node ke paas do outgoing edges hain:

```txt
next
random
```

Goal ye hai ki naye graph me:

```txt
same pattern ho
but saare nodes naye ho
```

Optimal approach ka mental picture:

```txt
before:
A -> B -> C

after weaving:
A -> A' -> B -> B' -> C -> C'
```

Ab:

```txt
original ke paas khade hoke uska copy turant mil jata hai
```

---

## 7. Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| empty list | `[]` | `[]` | copy karne ko kuch nahi |
| one node, random null | `[[5,null]]` | `[[5,null]]` | simple isolated node |
| one node, self-random | `[[9,0]]` | `[[9,0]]` | copy ka random copy par hi aana chahiye |
| duplicate values | `[[3,null],[3,0],[3,1]]` | same structure | mapping value se nahi, node identity se hoti hai |
| random forward/backward | mixed links | same pattern | random direction se algorithm par farq nahi padta |

---

## 8. Conditions

### `head === null`

Meaning:

```txt
input list empty hai
```

Action:

```txt
null return karo
```

### `current.random !== null`

Meaning:

```txt
current original node ka random actually kisi valid node ko point karta hai
```

Action:

```txt
tabhi copied random set karna meaningful hai
warna null hi rahega
```

### `copyNode.next = nextOriginal !== null ? nextOriginal.next : null`

Meaning:

```txt
copy list me current copy ke baad agla copy lagna chahiye
```

Why:

```txt
nextOriginal agla original node hai
uska copied version exactly nextOriginal.next par pada hai
```

---

## 9. Step-by-Step Dry Run

Input:

```txt
[[7, null], [13, 0], [11, 1]]
```

Meaning:

```txt
7.random  -> null
13.random -> 7
11.random -> 13
```

### 9.1 HashMap approach

#### Pass 1: copies banana

| Iteration | `current` | Action | `oldToNew` state |
|---|---|---|---|
| 1 | `7` | `7'` banao | `7 -> 7'` |
| 2 | `13` | `13'` banao | `7 -> 7'`, `13 -> 13'` |
| 3 | `11` | `11'` banao | `7 -> 7'`, `13 -> 13'`, `11 -> 11'` |

Is point par:

```txt
copies exist karti hain
par abhi unke next/random links set nahi huye
```

#### Pass 2: links set karna

| Iteration | `current` | `copiedNode.next` | `copiedNode.random` |
|---|---|---|---|
| 1 | `7` | `13'` | `null` |
| 2 | `13` | `11'` | `7'` |
| 3 | `11` | `null` | `13'` |

Final copy:

```txt
7' -> 13' -> 11'
13'.random -> 7'
11'.random -> 13'
```

### 9.2 Optimal interweaving approach

#### Phase 1: weaving

| Step | `current` | Action | List shape |
|---|---|---|---|
| 1 | `7` | `7'` ko `7` ke baad insert kiya | `7 -> 7' -> 13 -> 11` |
| 2 | `13` | `13'` ko `13` ke baad insert kiya | `7 -> 7' -> 13 -> 13' -> 11` |
| 3 | `11` | `11'` ko `11` ke baad insert kiya | `7 -> 7' -> 13 -> 13' -> 11 -> 11'` |

#### Phase 2: copied random set karna

| `current` | `copyNode` | Original random | Copied random |
|---|---|---|---|
| `7` | `7'` | `null` | `null` |
| `13` | `13'` | `7` | `7.next = 7'` |
| `11` | `11'` | `13` | `13.next = 13'` |

#### Phase 3: separate karna

Initial woven list:

```txt
7 -> 7' -> 13 -> 13' -> 11 -> 11'
```

| Step | Restored original part | Built copied part |
|---|---|---|
| after processing `7` | `7 -> 13 -> 13' -> 11 -> 11'` | `7' -> 13' -> 11 -> 11'` |
| after processing `13` | `7 -> 13 -> 11 -> 11'` | `7' -> 13' -> 11'` |
| after processing `11` | `7 -> 13 -> 11 -> null` | `7' -> 13' -> 11' -> null` |

Final answer:

```txt
original restored
copy alag nikal gayi
```

---

## 10. Correctness

### HashMap approach correct kyun hai?

Har original node ke liye ek unique copied node banaya jata hai.
Map guarantee karta hai ki:

```txt
jis original node par koi pointer jaa raha tha
uska exactly corresponding copied node mil jayega
```

So `next` aur `random` dono faithfully rebuild ho jate hain.

### Optimal approach correct kyun hai?

Weaving ke baad har original node ka copied node uske immediately baad hota hai.
Isliye:

```txt
original.random.next
```

hamesha copied random target deta hai.

Separation phase do kaam ek saath correct karta hai:

```txt
original links restore
copied links extract
```

---

## 11. Complexity

| Approach | Time | Space |
|---|---:|---:|
| HashMap | O(n) | O(n) |
| Optimal Interweaving | O(n) | O(1) auxiliary |

Note:

```txt
new copied nodes banana required output cost hai
use extra auxiliary space me count nahi karte
```

---

## 12. Final Takeaway

Is problem ka sabse important lesson ye hai:

```txt
copying structure means copying relationships, not just values
```

Yaad rakhne wala shortcut:

```txt
HashMap:
old ko dekho, new map se nikaalo

Optimal:
old ke baad new rakho, random ke liye .next use karo
```

Interview order:

```txt
pehle HashMap samjho
phir usi mapping ko list ke andar encode karke optimal solution samjho
```
