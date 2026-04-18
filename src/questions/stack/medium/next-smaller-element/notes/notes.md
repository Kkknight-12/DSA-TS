# Next Smaller Element - Notes

## 1. Problem Samjho

Array diya hai.

Har element ke liye right side me pehla strictly smaller element find karna hai.

```txt
arr = [4, 8, 5, 2, 25]
answer = [2, 5, 2, -1, -1]
```

Meaning:

| index | value | right side | answer |
|---:|---:|---|---:|
| 0 | 4 | `[8, 5, 2, 25]` | 2 |
| 1 | 8 | `[5, 2, 25]` | 5 |
| 2 | 5 | `[2, 25]` | 2 |
| 3 | 2 | `[25]` | -1 |
| 4 | 25 | `[]` | -1 |

Important:

```txt
Equal value smaller nahi hoti.
Smaller means strictly smaller.
```

This problem is linear, not circular.

---

## 2. Brute Force

Brute force me har index ke liye right side scan karte hain.

```txt
for each i:
  for each j from i + 1 to n - 1:
    if arr[j] < arr[i]:
      answer[i] = arr[j]
      stop
```

Example:

```txt
arr = [4, 8, 5, 2, 25]
```

| i | arr[i] | right scan | first smaller |
|---:|---:|---|---:|
| 0 | 4 | `8, 5, 2` | 2 |
| 1 | 8 | `5` | 5 |
| 2 | 5 | `2` | 2 |
| 3 | 2 | `25` | -1 |
| 4 | 25 | empty | -1 |

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
arr = [4, 8, 5, 2, 25]
```

Jab `5` par aate hain:

```txt
8 wait kar raha tha.
5, 8 se chota hai.
So 5 is answer for 8.
```

Jab `2` par aate hain:

```txt
5 wait kar raha tha -> 2 answer hai.
4 wait kar raha tha -> 2 answer hai.
```

So stack ka mental model:

```txt
Stack = unresolved indices ki waiting list
```

Current value puchti hai:

```txt
Main stack top wale pending index ka next smaller ban sakti hoon kya?
```

---

## 4. Why This Technique Works

Stack top latest unresolved index hota hai.

Agar current value stack top value se choti hai:

```txt
current index, stack top index ke right side me hai
current value, stack top value se strictly smaller hai
```

So current value us stack top ka next smaller hai.

Pop kyun?

```txt
Us index ka answer mil gaya.
Ab usko wait karne ki zarurat nahi.
```

While loop kyun?

```txt
Ek current value multiple pending bigger values ka answer ban sakti hai.
```

Example:

```txt
arr = [4, 8, 5, 2]

Jab 2 aata hai:
  5 ka answer 2
  4 ka answer 2
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
| `waitingIndices` | stack of indices whose NSE is not found yet |
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

Think of stack as pending work.

```txt
Each index says:
  "Mera next smaller abhi tak nahi mila."

Current value says:
  "Main dekhungi ki main top wale waiting index ka answer hoon ya nahi."
```

Stack notation:

```txt
[0:4, 2:5]
```

Meaning:

```txt
index 0 value 4 is waiting
index 2 value 5 is waiting
top = rightmost item = 2:5
```

---

## 7. Boundary Cases

| Case | Example | Output | Why |
|---|---|---|---|
| empty array | `[]` | `[]` | no elements |
| single element | `[5]` | `[-1]` | no right side |
| strictly decreasing | `[4, 3, 2]` | `[3, 2, -1]` | next element is smaller |
| strictly increasing | `[1, 2, 3]` | `[-1, -1, -1]` | no smaller on right |
| all equal | `[2, 2, 2]` | `[-1, -1, -1]` | equal is not smaller |
| duplicates with smaller | `[5, 5, 2]` | `[2, 2, -1]` | 2 resolves both 5s |

---

## 8. Conditions

Main condition:

```txt
currentValue < arr[waitingIndices[waitingIndices.length - 1]]
```

Problem language:

```txt
Current value stack top wale pending index ki value se choti hai.
So current value uska next smaller answer ban sakti hai.
```

Why strict `<`?

```txt
Problem strictly smaller maangta hai.
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

  while stack not empty and currentValue < arr[stack top]:
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
Unhe abhi tak right side me smaller value nahi mili.
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
Current value resolvedIndex ke right side me pehli strictly smaller value hai.
```

Default rule:

```txt
result[index] remains -1
```

Meaning:

```txt
Is index ke right side me koi strictly smaller value nahi mili.
```

---

## 11. Full Dry Run

Example:

```txt
arr = [4, 8, 5, 2, 25]
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
| 0 | 4 | `[]` | stack empty, push `0:4` | `[0:4]` | `[-1, -1, -1, -1, -1]` |
| 1 | 8 | `[0:4]` | `8 < 4` false, push `1:8` | `[0:4, 1:8]` | `[-1, -1, -1, -1, -1]` |
| 2 | 5 | `[0:4, 1:8]` | `5 < 8`, pop `1`, `result[1]=5`; `5 < 4` false; push `2:5` | `[0:4, 2:5]` | `[-1, 5, -1, -1, -1]` |
| 3 | 2 | `[0:4, 2:5]` | `2 < 5`, pop `2`, `result[2]=2`; `2 < 4`, pop `0`, `result[0]=2`; push `3:2` | `[3:2]` | `[2, 5, 2, -1, -1]` |
| 4 | 25 | `[3:2]` | `25 < 2` false, push `4:25` | `[3:2, 4:25]` | `[2, 5, 2, -1, -1]` |

Loop end:

| stack left | Meaning |
|---|---|
| `[3:2, 4:25]` | index 3 and index 4 never found a smaller value on right |

Final:

```txt
[2, 5, 2, -1, -1]
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
  while stack not empty and arr[i] < arr[stack top]:
    index = pop stack
    result[index] = arr[i]

  push i
```

Remember:

```txt
Pop means answer mil gaya.
Push means answer abhi future me milega.
Equal value smaller nahi hoti.
Linear NSE me modulo ya second pass nahi hota.
```
