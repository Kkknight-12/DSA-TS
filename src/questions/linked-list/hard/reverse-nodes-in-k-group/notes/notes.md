# Reverse Nodes in k-Group - Notes

## 1. Problem Samjho

Hume singly linked list aur integer `k` diya hai.
List ko `k` size ke groups me reverse karna hai.

Important rule:

```txt
sirf complete groups reverse honge
incomplete last group same rahega
```

Example:

```txt
1 -> 2 -> 3 -> 4 -> 5, k = 2
```

Groups:

```txt
[1,2] [3,4] [5]
```

Answer:

```txt
2 -> 1 -> 4 -> 3 -> 5
```

---

## 2. Brute Force

Brute force idea:

```txt
saare original nodes ko array me store karo
har complete k-sized block ko array me reverse karo
phir array order ke hisaab se linked list dobara jod do
```

Example:

```txt
nodes = [1, 2, 3, 4, 5], k = 2
```

Block reversal:

```txt
[1,2] -> [2,1]
[3,4] -> [4,3]
[5] stays same
```

Final array:

```txt
[2, 1, 4, 3, 5]
```

Yeh simple hai, but O(n) extra space leta hai.

---

## 3. Key Insight

Optimal solution me hume ek full group ko reverse karne se pehle do cheezein pata honi chahiye:

```txt
group kahaan start hota hai
group kahaan khatam hota hai
```

Isliye 3 pointers bahut important hain:

```txt
groupPrev
kthNode
groupNext
```

Meaning:

```txt
groupPrev = current group ke just pehle wala node
kthNode   = current group ka last node
groupNext = current group ke turant baad wala node
```

Ye 3 boundaries mil gayi toh current block safely reverse ho sakta hai.

---

## 4. Why This Technique Works

Suppose current block:

```txt
1 -> 2 -> 3 -> 4 -> 5
     current group
     [2,3]
```

Yahan:

```txt
groupPrev = 1
kthNode = 3
groupNext = 4
```

Reverse karte waqt hum:

```txt
prev = groupNext
current = groupPrev.next
```

se start karte hain.

Why?

Kyuki jab current group ka original first node tail banega,
toh usko final me `groupNext` se hi connect hona hai.

So if:

```txt
prev = groupNext
```

then reversal ke dauraan tail connection automatic banne lagta hai.

Example:

```txt
2.next = 4
3.next = 2
```

Result:

```txt
3 -> 2 -> 4
```

Matlab:

```txt
group reverse bhi ho gaya
next part se link bhi sahi ban gaya
```

---

## 5. Variables

| Variable | Meaning |
|---|---|
| `dummy` | fake node before head, first group handling easy banata hai |
| `groupPrev` | current group ke just pehle wala node |
| `kthNode` | current group ka k-th / last node |
| `groupNext` | current group ke baad ka first node |
| `originalGroupStart` | reversal se pehle current group ka first node, jo baad me tail banega |
| `prev` | reversed portion ka current front during reversal |
| `current` | jis node ko abhi reverse kar rahe hain |
| `nextNode` | current ke original next ka backup |

Short memory:

```txt
groupPrev se kthNode dhoondo
kthNode mila toh group reverse karo
original start tail banega
```

### Variables ka flow kaise chalta hai?

Har iteration me ye order almost same hota hai:

1. `groupPrev`

```txt
ye current group ke just pehle wala anchor hota hai
```

2. `kthNode = getKthNode(groupPrev, k)`

```txt
ye check karta hai ki complete k-group exist karta hai ya nahi
```

3. `groupNext = kthNode.next`

```txt
ye current group ke turant baad wala node hota hai
```

4. `originalGroupStart = groupPrev.next`

```txt
ye current group ka original first node hota hai
reverse ke baad yehi tail banega
```

5. Reversal start:

```txt
prev = groupNext
current = originalGroupStart
```

6. Reversal finish:

```txt
groupPrev.next = kthNode
groupPrev = originalGroupStart
```

Meaning:

```txt
kthNode new head ban gaya
originalGroupStart new tail ban gaya
aur wahi agle round ka new groupPrev banega
```

### Visual memory line

```txt
[groupPrev] -> [originalGroupStart ... kthNode] -> [groupNext]
```

After reversal:

```txt
[groupPrev] -> [kthNode ... originalGroupStart] -> [groupNext]
```

---

## 6. Mental Model

Problem ko poori list reverse ki tarah mat socho.
Isko repeated mini-reversals ki tarah socho.

Every round:

```txt
prefix processed hai
middle me ek k-sized block hai
suffix abhi untouched hai
```

Visual:

```txt
processed part -> current block -> remaining part
```

Dummy node ka role:

```txt
first block ke pehle bhi ek "previous node" mil jata hai
```

Isse first group ke liye special case ki zaroorat nahi padti.

---

## 7. Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| `k = 1` | `[1,2,3]` | same | har group already size 1 hai |
| `k > length` | `[1,2], k=5` | same | ek bhi complete group nahi |
| exact multiple | `[1,2,3,4,5,6], k=3` | `[3,2,1,6,5,4]` | saare groups complete hain |
| last incomplete block | `[1,2,3,4,5], k=3` | `[3,2,1,4,5]` | `[4,5]` incomplete hai |
| empty list | `[]` | `[]` | process karne ko kuch nahi |

---

## 8. Conditions

### `head === null || k <= 1`

Meaning:

```txt
ya toh list empty hai
ya reversal ka actual effect zero hai
```

Action:

```txt
same head return karo
```

### `getKthNode(groupPrev, k) === null`

Meaning:

```txt
current position se complete k nodes exist nahi karte
```

Action:

```txt
loop stop karo
remaining nodes same rehne do
```

### `while (current !== groupNext)`

Meaning:

```txt
sirf current group ke andar ke nodes reverse karne hain
groupNext tak pahunchte hi stop karna hai
```

This condition ensures:

```txt
group ke bahar ki list accidentally reverse nahi hogi
```

---

## 9. Step-by-Step Dry Run

Input:

```txt
head = [1, 2, 3, 4, 5]
k = 3
```

Initial:

```txt
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
groupPrev = dummy
```

### Variable Legend for this dry run

| Variable | Purpose |
|---|---|
| `groupPrev` | node before current group |
| `kthNode` | current group ka last node |
| `groupNext` | current group ke baad ka first node |
| `originalGroupStart` | current group ka first node, jo reverse ke baad tail banega |
| `prev` | reversed portion ka front |
| `current` | current node being processed |

### Iteration 1: Process group `[1, 2, 3]`

#### Step 1: Loop start state

```txt
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
   ^
groupPrev = dummy
```

Variables:

```txt
groupPrev = dummy
kthNode = not found yet
groupNext = not found yet
originalGroupStart = not found yet
```

#### Step 2: Find `kthNode = getKthNode(groupPrev, 3)`

Start:

```txt
current = dummy
k = 3
```

Helper movement:

| Move | Current after move | Remaining `k` |
|---:|---|---:|
| 1 | `1` | 2 |
| 2 | `2` | 1 |
| 3 | `3` | 0 |

Result:

```txt
kthNode = 3
```

Picture:

```txt
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
   ^              ^
groupPrev       kthNode
```

#### Step 3: Set `groupNext`

```txt
groupNext = kthNode.next = 4
```

Picture:

```txt
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
   ^              ^    ^
groupPrev       kthNode groupNext
```

#### Step 4: Set `originalGroupStart`

```txt
originalGroupStart = groupPrev.next = 1
```

Current group:

```txt
dummy -> [1 -> 2 -> 3] -> 4 -> 5 -> null
   ^       ^       ^      ^
groupPrev start   end   groupNext
```

Variables now:

```txt
groupPrev = dummy
kthNode = 3
groupNext = 4
originalGroupStart = 1
```

#### Step 5: Reversal setup

```txt
prev = groupNext = 4
current = 1
```

Why:

```txt
current group ka tail final me 4 se connect hona chahiye
isliye prev ko 4 se start karte hain
```

#### Step 6: Inner reversal loop

Before loop:

```txt
prev = 4
current = 1
groupNext = 4
```

Iteration table:

| Iteration | `current` before | `nextNode` backup | Reverse action | `prev` after | `current` after |
|---:|---|---|---|---|---|
| 1 | `1` | `2` | `1.next = 4` | `1` | `2` |
| 2 | `2` | `3` | `2.next = 1` | `2` | `3` |
| 3 | `3` | `4` | `3.next = 2` | `3` | `4` |

Loop stop:

```txt
current === groupNext
```

Ab reversed group ready hai:

```txt
3 -> 2 -> 1 -> 4 -> 5 -> null
```

Important observation:

```txt
originalGroupStart = 1
ab tail ban chuka hai
aur already groupNext = 4 ko point kar raha hai
```

#### Step 7: Reconnect previous part

```txt
groupPrev.next = kthNode
dummy.next = 3
```

List becomes:

```txt
dummy -> 3 -> 2 -> 1 -> 4 -> 5 -> null
```

#### Step 8: Move `groupPrev` for next iteration

```txt
groupPrev = originalGroupStart = 1
```

Why:

```txt
1 current reversed block ka tail hai
agle group ke just pehle wahi node aayega
```

State after Iteration 1:

```txt
dummy -> 3 -> 2 -> 1 -> 4 -> 5 -> null
               ^
            groupPrev
```

### Iteration 2: Try next group from `groupPrev = 1`

#### Step 1: Find `kthNode = getKthNode(groupPrev, 3)`

```txt
Start:
current = 1
k = 3
```

Helper movement:

| Move | Current after move | Remaining `k` |
|---:|---|---:|
| 1 | `4` | 2 |
| 2 | `5` | 1 |
| 3 | `null` | 0 |

Result:

```txt
kthNode = null
```

Meaning:

```txt
current position se complete 3-node group exist nahi karta
```

So:

```txt
[4, 5] incomplete block hai
reverse nahi karenge
loop break
```

### Final answer

```txt
3 -> 2 -> 1 -> 4 -> 5 -> null
```

---

## 10. Correctness

Har iteration ke start par:

```txt
`groupPrev.next` current unprocessed block ke first node ko point karta hai
```

If `kthNode` mil jata hai:

```txt
current block complete hai aur reverse hone ke eligible hai
```

Reversal loop ke baad:

```txt
block ke saare arrows ulat chuke hote hain
aur original first node tail ban chuka hota hai
```

Reconnect steps ensure:

```txt
processed prefix + reversed current block + untouched suffix
```

correctly jod diye jayein.

If `kthNode` nahi milta:

```txt
block incomplete hai
problem ke rule ke hisaab se usko same chhod dena hai
```

So algorithm exactly wahi output banata hai jo problem maangta hai.

---

## 11. Complexity

| Approach | Time | Space | Reason |
|---|---:|---:|---|
| Brute force | O(n) | O(n) | array me saare node references store hote hain |
| Optimal | O(n) | O(1) | in-place pointer manipulation |

Why optimal time O(n):

```txt
har node bounded number of times visit hota hai
group detection aur reversal dono total milkar linear hi rehte hain
```

---

## 12. Final Takeaway

Is problem ka real heart ye hai:

```txt
reverse karne se pehle group boundaries pakdo
```

Memory shortcut:

```txt
groupPrev dhoondo
kthNode check karo
groupNext save karo
prev = groupNext se reverse chalao
phir reconnect karo
```

Aur sabse useful intuition:

```txt
ye poori list reverse problem nahi hai
ye repeated fixed-size mini-reversals ka problem hai
```
