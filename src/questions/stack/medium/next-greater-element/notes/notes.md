# Next Greater Element - Notes

## 1. Problem Samjho

Array diya hai.

Har element ke liye right side me pehla strictly greater element find karna hai.

```txt
arr = [1, 3, 2, 4]
answer = [3, 4, 4, -1]
```

Meaning:

| index | value | right side | answer |
|---:|---:|---|---:|
| 0 | 1 | `[3, 2, 4]` | 3 |
| 1 | 3 | `[2, 4]` | 4 |
| 2 | 2 | `[4]` | 4 |
| 3 | 4 | `[]` | -1 |

Important:

```txt
Equal value greater nahi hoti.
Greater means strictly greater.
```

This problem is linear, not circular.

---

## 2. Brute Force

Brute force me har index ke liye right side scan karte hain.

```txt
for each i:
  for each j from i + 1 to n - 1:
    if arr[j] > arr[i]:
      answer[i] = arr[j]
      stop
```

Example:

```txt
arr = [1, 3, 2, 4]
```

| i | arr[i] | right scan | first greater |
|---:|---:|---|---:|
| 0 | 1 | `3` | 3 |
| 1 | 3 | `2, 4` | 4 |
| 2 | 2 | `4` | 4 |
| 3 | 4 | empty | -1 |

Complexity:

```txt
Time: O(n^2)
Space: O(1) extra
```

Problem:

```txt
Same right side elements baar-baar scan hote hain.
```

---

## 3. Key Insight

Left to right traverse karte waqt current value previous pending values ka answer ban sakti hai.

Example:

```txt
arr = [6, 8, 0, 1, 3]
```

Jab `8` par aate hain:

```txt
6 wait kar raha tha.
8, 6 se bada hai.
So 8 is answer for 6.
```

Jab `1` par aate hain:

```txt
0 wait kar raha tha.
1, 0 se bada hai.
So 1 is answer for 0.
```

So stack ka mental model:

```txt
Stack = unresolved indices ki waiting list
```

Current value puchti hai:

```txt
Main stack top wale pending index ka answer ban sakti hoon kya?
```

---

## 4. Why This Technique Works

Stack top latest unresolved index hota hai.

Agar current value stack top value se badi hai:

```txt
current index, stack top index ke right side me hai
current value, stack top value se strictly greater hai
```

So current value us stack top ka next greater hai.

Pop kyun?

```txt
Us index ka answer mil gaya.
Ab usko wait karne ki zarurat nahi.
```

While loop kyun?

```txt
Ek current value multiple pending smaller values ka answer ban sakti hai.
```

Example:

```txt
arr = [1, 3, 2, 4]

Jab 4 aata hai:
  2 ka answer 4
  3 ka answer 4
```

Push kyun?

```txt
Current index ka answer abhi future me milega.
Isliye current index ko waiting list me daalte hain.
```

---

## 5. Variables

| Variable | Meaning |
|---|---|
| `arr` | input array |
| `result` | final answer array, default `-1` |
| `waitingIndices` | stack of indices whose NGE is not found yet |
| `currentIndex` | current index while traversing left to right |
| `currentValue` | `arr[currentIndex]` |
| `resolvedIndex` | stack se popped index jiska answer mil gaya |

Why `result` starts with `-1`?

```txt
Jo indices end tak unresolved rahenge, unka answer -1 hi hota hai.
Default -1 se unhe separately update karne ki zarurat nahi.
```

Why stack stores indices?

```txt
Comparison ke liye: arr[index]
Answer update ke liye: result[index]
```

---

## 6. Mental Model

Think of stack as a queue of students waiting for help, but LIFO style.

```txt
Each index says:
  "Mera next greater abhi tak nahi mila."

Current value says:
  "Main dekhungi ki main top wale waiting index ka answer hoon ya nahi."
```

Stack notation:

```txt
[1:8, 3:1]
```

Meaning:

```txt
index 1 value 8 is waiting
index 3 value 1 is waiting
top = rightmost item = 3:1
```

---

## 7. Boundary Cases

| Case | Example | Output | Why |
|---|---|---|---|
| empty array | `[]` | `[]` | no elements |
| single element | `[5]` | `[-1]` | no right side |
| strictly increasing | `[1, 2, 3]` | `[2, 3, -1]` | next element is greater |
| strictly decreasing | `[3, 2, 1]` | `[-1, -1, -1]` | no greater on right |
| all equal | `[2, 2, 2]` | `[-1, -1, -1]` | equal is not greater |
| duplicates with greater | `[2, 2, 3]` | `[3, 3, -1]` | 3 resolves both 2s |

---

## 8. Conditions

Main condition:

```txt
currentValue > arr[waitingIndices[waitingIndices.length - 1]]
```

Problem language:

```txt
Current value stack top wale pending index ki value se badi hai.
So current value uska next greater answer ban sakti hai.
```

Why strict `>`?

```txt
Problem strictly greater maangta hai.
Equal value answer nahi hoti.
```

Why `waitingIndices.length > 0`?

```txt
Stack empty ho toh top access nahi kar sakte.
Aur koi pending index bhi nahi hai resolve karne ke liye.
```

---

## 9. Adjustment Logic

Algorithm:

```txt
result = array filled with -1
waitingIndices = []

for currentIndex from 0 to n - 1:
  currentValue = arr[currentIndex]

  while stack not empty and currentValue > arr[stack top]:
    resolvedIndex = pop stack
    result[resolvedIndex] = currentValue

  push currentIndex
```

Why pop before push?

```txt
Current value old pending indices ka answer ban sakti hai.
Pehle old pending work resolve karo.
Phir current index ko future ke liye wait karwao.
```

Why unresolved indices remain in stack?

```txt
Unhe abhi tak right side me greater value nahi mili.
Loop ke end tak bhi nahi mili toh result default -1 rahega.
```

---

## 10. Answer Formula

There is no mathematical formula here.

Answer update rule:

```txt
result[resolvedIndex] = currentValue
```

Meaning:

```txt
Current value resolvedIndex ke right side me pehli strictly greater value hai.
```

Default rule:

```txt
result[index] remains -1
```

Meaning:

```txt
Is index ke right side me koi strictly greater value nahi mili.
```

---

## 11. Full Dry Run

Example:

```txt
arr = [6, 8, 0, 1, 3]
result = [-1, -1, -1, -1, -1]
stack = []
```

Stack notation:

```txt
[index:value]
```

Dry run:

| i | current | stack before | action | stack after | result after |
|---:|---:|---|---|---|---|
| 0 | 6 | `[]` | stack empty, push `0:6` | `[0:6]` | `[-1, -1, -1, -1, -1]` |
| 1 | 8 | `[0:6]` | `8 > 6`, pop `0`, `result[0]=8`, push `1:8` | `[1:8]` | `[8, -1, -1, -1, -1]` |
| 2 | 0 | `[1:8]` | `0 > 8` false, push `2:0` | `[1:8, 2:0]` | `[8, -1, -1, -1, -1]` |
| 3 | 1 | `[1:8, 2:0]` | `1 > 0`, pop `2`, `result[2]=1`; `1 > 8` false; push `3:1` | `[1:8, 3:1]` | `[8, -1, 1, -1, -1]` |
| 4 | 3 | `[1:8, 3:1]` | `3 > 1`, pop `3`, `result[3]=3`; `3 > 8` false; push `4:3` | `[1:8, 4:3]` | `[8, -1, 1, 3, -1]` |

Loop end:

| stack left | Meaning |
|---|---|
| `[1:8, 4:3]` | index 1 and index 4 never found a greater value on right |

Final:

```txt
[8, -1, 1, 3, -1]
```

---

## 12. Quick Reference

Core idea:

```txt
Stack = unresolved indices ki waiting list.
Current value checks whether it can resolve stack top.
```

Template:

```txt
result = fill -1
stack = []

for i from 0 to n - 1:
  while stack not empty and arr[i] > arr[stack top]:
    index = pop stack
    result[index] = arr[i]

  push i
```

Remember:

```txt
Pop means answer mil gaya.
Push means answer abhi future me milega.
Equal value greater nahi hoti.
Linear NGE me modulo ya second pass nahi hota.
```
