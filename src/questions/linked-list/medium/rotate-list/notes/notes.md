# Rotate List - Notes

## 1. Problem Samjho

Linked list ko right side me `k` positions rotate karna hai.

Right rotation ka matlab:

```txt
last ke kuch nodes ko front me le aana
```

Example:

```txt
1 -> 2 -> 3 -> 4 -> 5
k = 2

answer:
4 -> 5 -> 1 -> 2 -> 3
```

---

## 2. Brute Force Soch

Sabse direct idea:

```txt
ek baar me ek right rotation karo
aur is process ko repeat karo
```

Ek single right rotation me:

```txt
last node new head ban jata hai
second-last new tail ban jata hai
```

Ye samajhne ke liye easy hai,
lekin repeated traversal ki wajah se slow hai.

---

## 3. Brute Force Ka Hidden Improvement

Even brute force me bhi ye sochna zaroori hai:

```txt
n rotations ke baad list wapas same ho jati hai
```

So:

```txt
effective rotations = k % length
```

Ye modulo lagane se brute-force approach practical rehti hai,
warna bahut bade `k` ke case me bekaar repeated work hota.

---

## 4. Key Insight for Optimal

Right rotate by `k` means:

```txt
last k nodes front me aayenge
```

Equivalent way:

```txt
head side ke first (n - k) nodes peeche chale jayenge
```

So new tail wo node hoga jiske baad:

```txt
effectiveRotations nodes bachte hain
```

---

## 5. Variables

### Brute Force

| Variable | Meaning |
|---|---|
| `length` | total nodes count |
| `effectiveRotations` | actual useful rotations after modulo |
| `secondLast` | current rotation me new tail banne wala node |
| `last` | current rotation me new head banne wala old tail |

### Optimal

| Variable | Meaning |
|---|---|
| `length` | total nodes count |
| `tail` | original last node |
| `effectiveRotations` | `k % length` |
| `stepsToNewTail` | head se kitne steps chal kar new tail tak pahunchna hai |
| `newTail` | break point se just pehle wala node |
| `newHead` | rotation ke baad naya head |

---

## 6. Mental Model

Optimal solution ko aise socho:

```txt
list ko temporary circle bana do
phir sahi jagah se kaat do
```

Visual:

```txt
1 -> 2 -> 3 -> 4 -> 5
^                   |
|___________________|
```

Ab agar right rotate by 2 chahiye,
toh answer tab milega jab:

```txt
3 aur 4 ke beech circle todo
```

---

## 7. Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| empty list | `[]` | `[]` | rotate karne ko kuch nahi |
| single node | `[7], k=100` | `[7]` | same node hi head rahega |
| `k = 0` | `[1,2,3]` | same | no rotation |
| `k % n = 0` | `[9,8,7], k=3` | same | full cycle |
| `k > n` | `[0,1,2], k=4` | `[2,0,1]` | modulo reduce karta hai |

---

## 8. Conditions

### `effectiveRotations === 0`

Meaning:

```txt
ya toh k 0 tha
ya k full cycles me collapse ho gaya
```

Action:

```txt
same head return
```

### `stepsToNewTail = length - effectiveRotations - 1`

Meaning:

```txt
0-indexed position of the node after which circle todni hai
```

Why `-1`?

```txt
because hume new head nahi, usse pehle wala new tail chahiye
```

### `tail.next = head`

Meaning:

```txt
list ko temporary circular bana rahe hain
```

Why:

```txt
taaki tail se head tak reconnect manually alag se sochna na pade
```

---

## 9. Dry Run - Brute Force

Input:

```txt
1 -> 2 -> 3 -> 4 -> 5
k = 2
```

### Preparation

| Step | Value |
|---|---|
| `length` | `5` |
| `effectiveRotations` | `2 % 5 = 2` |

### Rotation 1

| State | Value |
|---|---|
| `secondLast` | `4` |
| `last` | `5` |
| action 1 | `5.next = 1` |
| action 2 | `4.next = null` |
| result | `5 -> 1 -> 2 -> 3 -> 4` |

### Rotation 2

| State | Value |
|---|---|
| `secondLast` | `3` |
| `last` | `4` |
| action 1 | `4.next = 5` |
| action 2 | `3.next = null` |
| result | `4 -> 5 -> 1 -> 2 -> 3` |

---

## 10. Dry Run - Optimal

Same input:

```txt
1 -> 2 -> 3 -> 4 -> 5
k = 2
```

### Step 1: length and tail

| Variable | Value |
|---|---|
| `length` | `5` |
| `tail` | `5` |

### Step 2: effective rotations

| Variable | Value |
|---|---|
| `effectiveRotations` | `2 % 5 = 2` |
| `stepsToNewTail` | `5 - 2 - 1 = 2` |

### Step 3: make circular

```txt
1 -> 2 -> 3 -> 4 -> 5
^                   |
|___________________|
```

### Step 4: reach new tail

Start from head:

| Move count | Node |
|---|---|
| start | `1` |
| 1 | `2` |
| 2 | `3` |

So:

```txt
newTail = 3
newHead = 4
```

### Step 5: break

```txt
3.next = null
```

Final:

```txt
4 -> 5 -> 1 -> 2 -> 3
```

---

## 11. Why Optimal Works

Modulo part:

```txt
k % n hi actual useful rotations hoti hain
```

Circle part:

```txt
once list circular ho gayi
toh bas sahi break point chahiye
```

Break point part:

```txt
right rotate by r means
new head se pehle exactly n-r nodes hone chahiye
```

So:

```txt
new tail = node at index (n-r-1)
```

---

## 12. Complexity and Final Takeaway

| Approach | Time | Space |
|---|---:|---:|
| Brute Force | O(n * (k % n)) | O(1) |
| Optimal | O(n) | O(1) |

Best memory lines:

```txt
right rotate by k
= keep last k nodes in front
```

```txt
effective rotations = k % n
```

```txt
make circle
find new tail
break circle
```
