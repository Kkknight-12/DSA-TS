# Generate Binary Strings - Notes

## 1. Problem Samjho

Ek number `n` diya hai.

Length `n` ki saari binary strings generate karni hain.

Binary string:

```txt
sirf 0 aur 1 se bani string
```

Example:

```txt
n = 2
answer = ["00", "01", "10", "11"]
```

Har position par 2 choices hoti hain.

```txt
position value = 0
position value = 1
```

---

## 2. Brute Force

Ek way hai numbers use karna.

For `n = 3`, numbers `0` to `7`:

| number | binary padded to length 3 |
|---:|---|
| 0 | `000` |
| 1 | `001` |
| 2 | `010` |
| 3 | `011` |
| 4 | `100` |
| 5 | `101` |
| 6 | `110` |
| 7 | `111` |

This works, but recursion is cleaner for learning choices.

Why?

```txt
Problem itself asks:
At each position, choose 0 or 1.
```

Recursion directly represents this choice process.

---

## 3. Key Insight

Length `n` string ko ek baar me nahi banana.

Use partial string:

```txt
current = ""
```

Then keep choosing:

```txt
current + "0"
current + "1"
```

For `n = 2`:

```txt
                         ""
                    /          \
                 "0"            "1"
              /      \        /      \
           "00"     "01"   "10"     "11"
```

Leaf nodes complete answers hain.

---

## 4. Why This Technique Works

Har binary string length `n` ki hoti hai.

Har position exactly ek choice leti hai:

```txt
0 or 1
```

Recursion ek position fill karti hai, phir next position ke liye same problem repeat hota hai.

Base case:

```txt
current.length === n
```

Meaning:

```txt
All positions filled.
String complete.
Add to result.
```

Recursive case:

```txt
current.length < n
```

Meaning:

```txt
Abhi position fill karni baaki hai.
Try 0 branch and 1 branch.
```

Why no explicit pop/backtrack?

```txt
current + "0" new string banata hai.
Original current mutate nahi hota.
So manual pop needed nahi hai.
```

---

## 5. Variables

| Variable | Meaning |
|---|---|
| `n` / `targetLength` | final string length |
| `result` | complete binary strings |
| `current` | partial string built so far |
| `current.length` | kitni positions fill ho chuki hain |

State meaning:

```txt
current = "01"
n = 3
```

Means:

```txt
2 positions fill ho chuki hain.
1 position baaki hai.
```

---

## 6. Mental Model

Think of this as filling blanks.

For `n = 3`:

```txt
_ _ _
```

At each blank:

```txt
put 0
put 1
```

Tree-node meaning:

```txt
Node "10"
```

Means:

```txt
first position = 1
second position = 0
third position still pending
```

Children:

```txt
"100"
"101"
```

---

## 7. Boundary Cases

| Case | Output | Why |
|---|---|---|
| `n = 0` | `[""]` | one empty string of length 0 exists |
| `n = 1` | `["0", "1"]` | one position, two choices |
| `n = 2` | `["00", "01", "10", "11"]` | two positions, four choices |
| large n | `2^n` strings | output itself grows exponentially |

Constraints usually start from `n = 1`, but the recursion naturally handles `n = 0`.

---

## 8. Conditions

Base condition:

```txt
current.length === targetLength
```

Problem language:

```txt
Partial string ab complete answer ban chuki hai.
```

Recursive continuation:

```txt
current.length < targetLength
```

Problem language:

```txt
Abhi more positions fill karni hain.
```

Choice order:

```txt
first current + "0"
then current + "1"
```

Problem language:

```txt
0 branch pehle explore karne se lexicographic order maintain hota hai.
```

---

## 9. Adjustment Logic

Algorithm:

```txt
result = []

build(current):
  if current.length === n:
    result.push(current)
    return

  build(current + "0")
  build(current + "1")
```

Return flow:

```txt
When "00" base case complete hota hai,
control parent "0" par wapas aata hai.
Parent ka next line run hota hai:
build("01")
```

This is why both branches get explored.

---

## 10. Answer Formula

Total strings:

```txt
2^n
```

Why?

```txt
Each position has 2 choices.
n positions exist.
So 2 * 2 * ... n times = 2^n.
```

Total output characters:

```txt
n * 2^n
```

Why?

```txt
2^n strings
each length n
```

Time:

```txt
O(n * 2^n)
```

Space excluding output:

```txt
O(n)
```

Why?

```txt
Maximum recursion depth n hoti hai.
```

---

## 11. Full Dry Run

Example:

```txt
n = 3
```

Full recursion tree in the preferred reference style:

```txt
root  (current="", result=[])
│
├── choose '0' -> build("0")  ALLOWED
│   Reason: current length 0 hai, target 3 hai.
│   │
│   │   (current="0", result=[])
│   │   ├── choose '0' -> build("00")  ALLOWED
│   │   │   │
│   │   │   │   (current="00", result=[])
│   │   │   │   ├── choose '0' -> build("000")  ALLOWED
│   │   │   │   │   BASE CASE -> push "000"
│   │   │   │   │   result=["000"]
│   │   │   │   │   return to current="00"
│   │   │   │   │
│   │   │   │   └── choose '1' -> build("001")  ALLOWED
│   │   │   │       BASE CASE -> push "001"
│   │   │   │       result=["000", "001"]
│   │   │   │       return to current="00"
│   │   │   │
│   │   │   │   both branches done for current="00"
│   │   │   │   return to current="0"
│   │   │
│   │   └── choose '1' -> build("01")  ALLOWED
│   │       Reason: current="0" ka 0-branch complete ho gaya.
│   │       │
│   │       │   (current="01", result=["000", "001"])
│   │       │   ├── choose '0' -> build("010")  ALLOWED
│   │       │   │   BASE CASE -> push "010"
│   │       │   │   result=["000", "001", "010"]
│   │       │   │   return to current="01"
│   │       │   │
│   │       │   └── choose '1' -> build("011")  ALLOWED
│   │       │       BASE CASE -> push "011"
│   │       │       result=["000", "001", "010", "011"]
│   │       │       return to current="01"
│   │       │
│   │       │   both branches done for current="01"
│   │       │   return to current="0"
│   │
│   │   both branches done for current="0"
│   │   return to root current=""
│
└── choose '1' -> build("1")  ALLOWED
    Reason: root ka 0-subtree complete ho gaya.
    │
    │   (current="1", result=["000", "001", "010", "011"])
    │   ├── choose '0' -> build("10")  ALLOWED
    │   │   │
    │   │   │   (current="10", result=["000", "001", "010", "011"])
    │   │   │   ├── choose '0' -> build("100")  ALLOWED
    │   │   │   │   BASE CASE -> push "100"
    │   │   │   │   result=["000", "001", "010", "011", "100"]
    │   │   │   │   return to current="10"
    │   │   │   │
    │   │   │   └── choose '1' -> build("101")  ALLOWED
    │   │   │       BASE CASE -> push "101"
    │   │   │       result=["000", "001", "010", "011", "100", "101"]
    │   │   │       return to current="10"
    │   │   │
    │   │   │   both branches done for current="10"
    │   │   │   return to current="1"
    │   │
    │   └── choose '1' -> build("11")  ALLOWED
    │       │
    │       │   (current="11", result=["000", "001", "010", "011", "100", "101"])
    │       │   ├── choose '0' -> build("110")  ALLOWED
    │       │   │   BASE CASE -> push "110"
    │       │   │   result=["000", "001", "010", "011", "100", "101", "110"]
    │       │   │   return to current="11"
    │       │   │
    │       │   └── choose '1' -> build("111")  ALLOWED
    │       │       BASE CASE -> push "111"
    │       │       result=["000", "001", "010", "011", "100", "101", "110", "111"]
    │       │       return to current="11"
    │       │
    │       │   both branches done for current="11"
    │       │   return to current="1"
    │
    │   both branches done for current="1"
    │   return to root current=""

root ke dono branches complete.
final result=["000", "001", "010", "011", "100", "101", "110", "111"]
```

Execution table:

| step | call / return | result after |
|---:|---|---|
| 1 | `build("")`, choose `0` | `[]` |
| 2 | `build("0")`, choose `0` | `[]` |
| 3 | `build("00")`, choose `0` | `[]` |
| 4 | `build("000")`, base add | `["000"]` |
| 5 | return to `"00"`, choose `1` | `["000"]` |
| 6 | `build("001")`, base add | `["000", "001"]` |
| 7 | return to `"0"`, choose `1` | `["000", "001"]` |
| 8 | `build("01")`, choose `0` | `["000", "001"]` |
| 9 | `build("010")`, base add | `["000", "001", "010"]` |
| 10 | return to `"01"`, choose `1` | `["000", "001", "010"]` |
| 11 | `build("011")`, base add | `["000", "001", "010", "011"]` |
| 12 | return to `""`, choose `1` | `["000", "001", "010", "011"]` |
| 13 | `build("1")`, explore `10`, `11` subtree | `["000", "001", "010", "011"]` |
| 14 | add `100`, `101`, `110`, `111` in order | `["000", "001", "010", "011", "100", "101", "110", "111"]` |

Call-frame snapshot for first branch:

```txt
+---------------------------+
| build("")                 |
| choose 0 -> build("0")    |
+---------------------------+
              |
              v
+---------------------------+
| build("0")                |
| choose 0 -> build("00")   |
+---------------------------+
              |
              v
+---------------------------+
| build("00")               |
| choose 0 -> build("000")  |
+---------------------------+
              |
              v
+---------------------------+
| build("000")              |
| base case                 |
| result.push("000")        |
| return to build("00")     |
+---------------------------+
```

After returning to `build("00")`, the next line runs:

```txt
build("001")
```

This return-to-parent behavior is the heart of recursion dry run.

---

## 12. Quick Reference

Template:

```txt
function build(current):
  if current.length === n:
    result.push(current)
    return

  build(current + "0")
  build(current + "1")
```

Memory lines:

```txt
Node = partial string.
Branch = choose next character.
Leaf = complete binary string.
0 branch first = ascending order.
Return means parent continues with its next branch.
```
