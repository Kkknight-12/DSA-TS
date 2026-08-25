# Add Two Numbers - Notes

## 1. Problem Samjho

Do linked lists diye hain.
Har linked list ek number represent karti hai.

Important twist:

```txt
digits reverse order me stored hain
```

Example:

```txt
[2, 4, 3] means 342
[5, 6, 4] means 465
```

Task:

```txt
342 + 465 = 807
answer reverse order me [7, 0, 8]
```

---

## 2. Brute Force Soch Kyu Nahi Chalegi

Ek naive idea ho sakta hai:

```txt
linked list ko number me convert karo
sum lo
phir number ko linked list me convert karo
```

Problem:

```txt
input lists bahut badi ho sakti hain
number conversion overflow kara sakta hai
```

Isliye safest approach:

```txt
digit by digit addition directly linked list par hi karo
```

---

## 3. Key Insight

Ye bilkul school addition jaisa hai.

Normal school addition me hum:

```txt
right to left add karte hain
```

Yahan reverse order already diya hua hai.
So linked list ke head par hi:

```txt
units place mil jata hai
```

Isliye:

```txt
left-to-right traversal hi right-to-left addition simulate kar deta hai
```

---

## 4. Why This Technique Works

Har decimal position par bas 3 cheezein matter karti hain:

```txt
current digit from l1
current digit from l2
carry from previous position
```

Formula:

```txt
sum = digit1 + digit2 + carry
digitToStore = sum % 10
carry = Math.floor(sum / 10)
```

Why this works:

| Sum | Stored digit | New carry |
|---:|---:|---:|
| 7 | 7 | 0 |
| 10 | 0 | 1 |
| 15 | 5 | 1 |
| 18 | 8 | 1 |

Matlab:

```txt
ones place current result me store hoti hai
tens place next iteration ke liye carry ban jati hai
```

---

## 5. Variables

| Variable | Meaning |
|---|---|
| `l1` | first number ke current digit wala pointer |
| `l2` | second number ke current digit wala pointer |
| `dummyHead` | result list build karne ke liye placeholder node |
| `current` | result list ke last built node ka pointer |
| `carry` | previous position se aaya unresolved tens part |
| `digit1` | current iteration me `l1` ka digit, ya 0 if `l1` null |
| `digit2` | current iteration me `l2` ka digit, ya 0 if `l2` null |
| `sum` | `digit1 + digit2 + carry` |
| `digitToStore` | current result node me store hone wala digit |

Short memory:

```txt
digit1 + digit2 + carry
store ones place
carry tens place
```

### Variables ka flow kaise chalta hai?

Har iteration me:

1. `digit1` aur `digit2` nikaalte hain

```txt
agar list khatam ho chuki ho toh us side ko 0 treat karte hain
```

2. `sum` calculate hota hai

3. `digitToStore = sum % 10`

4. `carry = Math.floor(sum / 10)`

5. New result node append hoti hai

6. `current`, `l1`, `l2` aage move karte hain

Visual line:

```txt
[l1 digit] + [l2 digit] + [carry] -> [digitToStore] + [next carry]
```

---

## 6. Mental Model

Isko do numbers add karne ki jagah do streams samjho:

```txt
l1 ek digit de raha hai
l2 ek digit de raha hai
carry teesra hidden input hai
```

Result list bhi waise hi step by step grow karti hai.

Dummy head ka role:

```txt
first result node ke liye special case avoid hota hai
```

So instead of:

```txt
if first node then do something special
```

we simply do:

```txt
current.next = new node
current = current.next
```

---

## 7. Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| both zero | `[0] + [0]` | `[0]` | simple no-carry case |
| final carry | `[9,9,9] + [1]` | `[0,0,0,1]` | last carry extra node banati hai |
| different lengths | `[9,9,9,9,9,9,9] + [9,9,9,9]` | `[8,9,9,9,0,0,0,1]` | shorter list ko 0 treat karte hain |
| carry in middle | `[5] + [5]` | `[0,1]` | first digit 10 banata hai |
| one long list | `[1,0,0,0,0,0,1] + [5,6,4]` | `[6,6,4,0,0,0,1]` | one side null hone ke baad bhi loop continue karta hai |

---

## 8. Conditions

### `while (l1 !== null || l2 !== null || carry !== 0)`

Meaning:

```txt
jab tak kisi bhi side se kaam bacha hai, loop continue karo
```

Why all 3 checks needed:

| Check | Why |
|---|---|
| `l1 !== null` | first number ke digits abhi bache hain |
| `l2 !== null` | second number ke digits abhi bache hain |
| `carry !== 0` | even if both lists ended, final carry abhi add karni baaki ho sakti hai |

### `l1 !== null ? l1.val : 0`

Meaning:

```txt
agar current list khatam ho gayi hai
toh us side ka digit 0 maana jayega
```

Ye different-length lists ko naturally handle karta hai.

---

## 9. Step-by-Step Dry Run

Input:

```txt
l1 = [2, 4, 3]
l2 = [5, 6, 4]
```

Meaning:

```txt
l1 = 342
l2 = 465
answer = 807
result list = [7, 0, 8]
```

Initial state:

```txt
dummyHead -> null
current = dummyHead
carry = 0
l1 points to 2
l2 points to 5
```

### Iteration table

| Iteration | `digit1` | `digit2` | `carry` before | `sum` | `digitToStore` | `carry` after | Result list after append |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 2 | 5 | 0 | 7 | 7 | 0 | `dummy -> 7` |
| 2 | 4 | 6 | 0 | 10 | 0 | 1 | `dummy -> 7 -> 0` |
| 3 | 3 | 4 | 1 | 8 | 8 | 0 | `dummy -> 7 -> 0 -> 8` |

### Iteration 1

Before:

```txt
l1 = 2 -> 4 -> 3
l2 = 5 -> 6 -> 4
carry = 0
```

Calculation:

```txt
sum = 2 + 5 + 0 = 7
digitToStore = 7
carry = 0
```

After append:

```txt
dummyHead -> 7
current = 7
l1 moves to 4
l2 moves to 6
```

### Iteration 2

Before:

```txt
l1 = 4 -> 3
l2 = 6 -> 4
carry = 0
```

Calculation:

```txt
sum = 4 + 6 + 0 = 10
digitToStore = 0
carry = 1
```

After append:

```txt
dummyHead -> 7 -> 0
current = 0
l1 moves to 3
l2 moves to 4
```

### Iteration 3

Before:

```txt
l1 = 3
l2 = 4
carry = 1
```

Calculation:

```txt
sum = 3 + 4 + 1 = 8
digitToStore = 8
carry = 0
```

After append:

```txt
dummyHead -> 7 -> 0 -> 8
current = 8
l1 = null
l2 = null
```

Loop stop:

```txt
l1 null
l2 null
carry = 0
```

Final answer:

```txt
dummyHead.next = 7 -> 0 -> 8 -> null
```

---

## 10. Correctness

Har iteration ek decimal position ko solve karta hai.

At that position:

```txt
digit1 + digit2 + old carry
```

se exact local sum milta hai.

`digitToStore` ones place ko result me daal deta hai,
aur `carry` remaining tens part ko next position ke liye preserve kar deta hai.

Kyuki linked lists reverse order me hain:

```txt
head se tail tak traverse karna hi units se higher places ki taraf jaana hai
```

So algorithm exactly school addition ko simulate karta hai,
and isliye final linked list correct sum represent karti hai.

---

## 11. Complexity

| Aspect | Complexity | Reason |
|---|---:|---|
| Time | O(max(m, n)) | longer list jitni iterations chalti hain, kabhi kabhi ek extra carry iteration |
| Output space | O(max(m, n)) | result list utni hi length ki hogi |
| Auxiliary extra space | O(1) | sirf pointers aur `carry` |

---

## 12. Final Takeaway

Is problem ka one-line essence:

```txt
reverse-order linked list ko school addition jaisa treat karo
```

Shortest memory version:

```txt
sum = digit1 + digit2 + carry
digit = sum % 10
carry = floor(sum / 10)
append digit
```

Aur sabse important condition:

```txt
loop me `carry !== 0` ko kabhi mat bhoolo
```

Wahi final extra node bachata hai.
