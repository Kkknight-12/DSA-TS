# Rotate List - Doubts

## 1. `const effectiveRotations = k % length;` ka exact meaning kya hai?

Question:

```ts
const effectiveRotations = k % length;
```

Ye kyun karte hain?
Aur ye actual rotation ko kaise simplify karta hai?

Answer:

Linked list ki length agar `n` hai,
toh:

```txt
n right rotations ke baad list wapas same position par aa jati hai
```

Matlab full cycle complete ho gayi.

So:

```txt
sirf leftover rotations hi actual kaam karti hain
```

Isi leftover ko bolte hain:

```txt
effective rotations
```

Formula:

```txt
effectiveRotations = k % length
```

### Small visual

Take:

```txt
1 -> 2 -> 3 -> 4 -> 5
length = 5
```

#### If `k = 1`

```txt
5 -> 1 -> 2 -> 3 -> 4
```

#### If `k = 2`

```txt
4 -> 5 -> 1 -> 2 -> 3
```

#### If `k = 5`

```txt
1 -> 2 -> 3 -> 4 -> 5
```

Back to original.

#### If `k = 6`

```txt
same as k = 1
because 6 = 5 + 1
```

#### If `k = 7`

```txt
same as k = 2
because 7 = 5 + 2
```

So:

```txt
7 % 5 = 2
```

Isliye:

```txt
k = 7
```

ko hum safely:

```txt
effectiveRotations = 2
```

me reduce kar sakte hain.

### Memory line

```txt
full cycles ignore karo
remainder hi actual rotation hai
```

---

## 2. `const stepsToNewTail = length - effectiveRotations - 1;` ka exact meaning kya hai?

Question:

```ts
const stepsToNewTail = length - effectiveRotations - 1;
```

Ye formula kaise aaya?
`-1` kyu hai?

Answer:

Right rotate by `effectiveRotations` ka matlab:

```txt
last effectiveRotations nodes ko front me lana
```

So old list me new head se pehle kitne nodes bachenge?

```txt
length - effectiveRotations
```

Ye count batata hai:

```txt
new head se pehle total nodes kitne hain
```

But hume `newHead` nahi chahiye,
hume usse just pehle wala node chahiye:

```txt
newTail
```

Isliye:

```txt
newTail position = (length - effectiveRotations) - 1
```

That is:

```txt
stepsToNewTail = length - effectiveRotations - 1
```

### Visual example

Take:

```txt
1 -> 2 -> 3 -> 4 -> 5
effectiveRotations = 2
length = 5
```

Hum jaante hain last 2 nodes front me aayenge:

```txt
[1 -> 2 -> 3] [4 -> 5]
```

So final answer:

```txt
4 -> 5 -> 1 -> 2 -> 3
```

Yahan:

```txt
newHead = 4
newTail = 3
```

Ab count dekho:

```txt
length - effectiveRotations = 5 - 2 = 3
```

Matlab:

```txt
newHead se pehle 3 nodes hain
1, 2, 3
```

So unka last node:

```txt
3
```

newTail hoga.

0-indexed position me:

```txt
index:  0   1   2   3   4
node:   1   2   3   4   5
```

`3` ka index:

```txt
2
```

And formula:

```txt
5 - 2 - 1 = 2
```

Exactly same.

### Memory line

```txt
newHead se pehle jitne nodes hain
unke last node par land karo
```

---

## 3. Full dry run: `1 -> 2 -> 3 -> 4 -> 5`, `k = 7`

Main yahan dono formulas ko ek hi example me connect kar raha hoon.

### Step 0: Initial list

```txt
head
 |
 v
1 -> 2 -> 3 -> 4 -> 5 -> null
```

Node links:

| Node | Points to |
|---|---|
| `1` | `2` |
| `2` | `3` |
| `3` | `4` |
| `4` | `5` |
| `5` | `null` |

---

## 4. Step 1: Find `length` and `tail`

Traverse karte hain:

| Step | Current node | `length` |
|---|---|---:|
| start | `1` | 1 |
| move | `2` | 2 |
| move | `3` | 3 |
| move | `4` | 4 |
| move | `5` | 5 |

So:

```txt
length = 5
tail = 5
```

Visual:

```txt
head                      tail
 |                         |
 v                         v
1 -> 2 -> 3 -> 4 -> 5 -> null
```

---

## 5. Step 2: Find `effectiveRotations`

Given:

```txt
k = 7
length = 5
```

Formula:

```txt
effectiveRotations = k % length
                   = 7 % 5
                   = 2
```

Meaning:

```txt
7 right rotations same hain 2 right rotations ke
```

So actual problem ab ban gaya:

```txt
rotate right by 2
```

---

## 6. Step 3: Find `stepsToNewTail`

Formula:

```txt
stepsToNewTail = length - effectiveRotations - 1
               = 5 - 2 - 1
               = 2
```

Meaning:

```txt
head se 2 steps move karke newTail par land karna hai
```

Check visually:

```txt
index:  0   1   2   3   4
node:   1   2   3   4   5
                 ^
              newTail
```

So:

```txt
newTail = 3
newHead = 4
```

---

## 7. Step 4: Make the list circular

Code:

```ts
tail.next = head;
```

Before:

```txt
1 -> 2 -> 3 -> 4 -> 5 -> null
```

After `5.next = 1`:

```txt
1 -> 2 -> 3 -> 4 -> 5
^                   |
|___________________|
```

Node links now:

| Node | Points to |
|---|---|
| `1` | `2` |
| `2` | `3` |
| `3` | `4` |
| `4` | `5` |
| `5` | `1` |

Why useful?

```txt
ab tail ko head se manually reconnect karne ka separate kaam nahi raha
list already circular ban gayi
```

---

## 8. Step 5: Move to `newTail`

Start:

```txt
newTail = head = 1
stepsToNewTail = 2
```

### Move 0

```txt
newTail = 1
```

Visual:

```txt
1 -> 2 -> 3 -> 4 -> 5
^                   |
|___________________|
```

### Move 1

```txt
newTail = newTail.next = 2
```

Visual:

```txt
1 -> 2 -> 3 -> 4 -> 5
     ^              |
     |______________|
```

### Move 2

```txt
newTail = newTail.next = 3
```

Visual:

```txt
1 -> 2 -> 3 -> 4 -> 5
          ^         |
          |_________|
```

Stop.

So:

```txt
newTail = 3
newHead = newTail.next = 4
```

---

## 9. Step 6: Break the circle

At this moment:

```txt
newTail = 3
newHead = 4
```

Current circular structure:

```txt
1 -> 2 -> 3 -> 4 -> 5
^                   |
|___________________|
```

We know:

```txt
3.next = 4
```

Ab circle todna hai:

```ts
newTail.next = null;
```

So:

```txt
3.next = null
```

After break:

```txt
4 -> 5 -> 1 -> 2 -> 3 -> null
```

Node links now:

| Node | Points to |
|---|---|
| `4` | `5` |
| `5` | `1` |
| `1` | `2` |
| `2` | `3` |
| `3` | `null` |

This is the final rotated list.

---

## 10. Full picture in one view

### Original

```txt
1 -> 2 -> 3 -> 4 -> 5 -> null
```

### Reduce rotations

```txt
k = 7
effectiveRotations = 7 % 5 = 2
```

### Find break logic

```txt
stepsToNewTail = 5 - 2 - 1 = 2
```

### Make circular

```txt
1 -> 2 -> 3 -> 4 -> 5
^                   |
|___________________|
```

### Land on `newTail = 3`

```txt
1 -> 2 -> 3 -> 4 -> 5
          ^
```

### `newHead = 4`

```txt
1 -> 2 -> 3 -> 4 -> 5
               ^
```

### Break

```txt
4 -> 5 -> 1 -> 2 -> 3 -> null
```

---

## 11. Short memory lines

For modulo:

```txt
full cycles ignore karo
remainder hi actual rotation hai
```

For new tail:

```txt
new head se pehle jitne nodes hain
unke last node par land karo
```

For whole optimal solution:

```txt
count length
reduce k
make circle
find new tail
break circle
```
