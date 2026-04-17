# Next Greater Element II - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Circular array `nums` diya hai.
Har element ke liye next greater element find karna hai.

Next greater element:

```txt
current index ke baad clockwise direction me
pehla element jo current value se strictly greater ho
```

Circular ka matlab:

```txt
last index ke baad search index 0 se continue ho sakti hai
```

Example:

```txt
nums = [1, 2, 1]
```

| Index | Value | Next greater |
|---:|---:|---:|
| 0 | 1 | 2 |
| 1 | 2 | -1 |
| 2 | 1 | 2 |

Answer:

```txt
[2, -1, 2]
```

---

## STEP 2: Brute Force

Har index ke liye circularly next elements scan karo.

Example:

```txt
nums = [1, 2, 1]
```

For index `2`, value `1`:

```txt
next index after 2 circularly = 0
nums[0] = 1, not greater
next index = 1
nums[1] = 2, greater
answer[2] = 2
```

Modulo use hota hai:

```txt
nextIndex = (i + distance) % n
```

Time:

```txt
O(n^2)
```

Kyunki har element ke liye up to `n - 1` elements check ho sakte hain.

---

## STEP 3: Key Insight

Har element ko future me koi bigger value chahiye.

So stack ko waiting list bana do.

Stack me store honge:

```txt
indices whose next greater is not found yet
```

Jab current value stack top value se badi hoti hai:

```txt
current value stack top index ka answer hai
```

Because current value left-to-right traversal me us unresolved index ke baad aa rahi hai.

---

## STEP 4: Why This Technique Works

Stack unresolved smaller elements ko hold karta hai.

Example:

```txt
nums = [2, 1, 2, 4, 3]
```

When current value `4` par aate hain:

```txt
waiting stack has indices for values 2 and 2
```

`4` dono se greater hai.
So `4` un dono ka next greater ban jata hai.

Why pop?

```txt
answer mil gaya
ab woh index waiting list me nahi rehna chahiye
```

Why circular second pass?

```txt
last side ke elements ko start side me bigger value mil sakti hai
```

But second pass me push nahi karte:

```txt
hume same original indices duplicate nahi karne
sirf pending indices resolve karne hain
```

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `nums` | circular input array |
| `n` | array length |
| `result` | answer array, initially all `-1` |
| `waitingIndices` | stack of unresolved indices |
| `step` | virtual index from `0` to `2*n - 1` |
| `currentIndex` | real index, `step % n` |
| `currentValue` | `nums[currentIndex]` |
| `resolvedIndex` | popped index whose NGE just got found |

Short memory:

```txt
stack = waiting list of indices
currentValue = possible answer for waiting indices
```

---

## STEP 6: Mental Model

Imagine line me log khade hain.
Har person apne right side me pehle taller person ko dhundh raha hai.

Stack:

```txt
people still waiting for a taller person
```

Jab ek taller person aata hai:

```txt
woh chhote waiting people ka answer ban jata hai
```

Circular array:

```txt
line ek circle hai
last person ke baad first person aa sakta hai
```

So one extra pass gives circular visibility.

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Empty array | `[]` | `[]` | no elements |
| Single element | `[5]` | `[-1]` | no other element |
| All equal | `[2,2,2]` | `[-1,-1,-1]` | equal is not greater |
| Strictly decreasing | `[5,4,3,2,1]` | `[-1,5,5,5,5]` | circular max helps others |
| Circular needed | `[1,2,1]` | `[2,-1,2]` | last `1` finds `2` after wrap |
| Duplicates | `[5,7,1,7,6,0]` | `[7,-1,7,-1,7,5]` | equal `7` not greater |

---

## STEP 8: Conditions

Resolve condition:

```ts
currentValue > nums[waitingIndices[top]]
```

Meaning:

```txt
current value waiting top index ka next greater ban sakta hai
```

Strictly greater:

```txt
equal value answer nahi hoti
```

Push condition:

```ts
if (step < n)
```

Meaning:

```txt
sirf first pass me original indices stack me add karo
```

Circular index:

```ts
currentIndex = step % n
```

Meaning:

```txt
step n ke baad wapas 0,1,2... indexes simulate karega
```

---

## STEP 9: Adjustment Logic

When current value resolves stack top:

```txt
resolvedIndex = stack.pop()
result[resolvedIndex] = currentValue
```

Why?

```txt
resolvedIndex ko answer mil gaya
ab woh wait nahi karega
```

When current value cannot resolve top:

```txt
while loop stop
```

Why?

```txt
stack top value current se greater/equal hai
current uska answer nahi ban sakta
```

When first pass:

```txt
stack.push(currentIndex)
```

Why?

```txt
current index bhi future greater value ka wait karega
```

---

## STEP 10: Answer Formula

Main loop:

```txt
for step = 0 to 2*n - 1:
  currentIndex = step % n
  while currentValue > nums[stackTop]:
    result[poppedIndex] = currentValue
  if step < n:
    push currentIndex
```

Default answer:

```txt
-1
```

Kyunki agar koi greater value kabhi nahi mili,
answer `-1` hi rahega.

---

## STEP 11: Full Dry Run

Example:

```txt
nums = [2, 1, 2, 4, 3]
```

Start:

```txt
result = [-1, -1, -1, -1, -1]
stack = []
```

### First Pass

| step | currentIndex | currentValue | Stack before | Action | Result |
|---:|---:|---:|---|---|---|
| 0 | 0 | 2 | `[]` | push `0` | `[-1,-1,-1,-1,-1]` |
| 1 | 1 | 1 | `[0]` | `1 > 2` false, push `1` | `[-1,-1,-1,-1,-1]` |
| 2 | 2 | 2 | `[0,1]` | `2 > 1`, pop `1`, result[1]=2; `2 > 2` false; push `2` | `[-1,2,-1,-1,-1]` |
| 3 | 3 | 4 | `[0,2]` | pop `2`, result[2]=4; pop `0`, result[0]=4; push `3` | `[4,2,4,-1,-1]` |
| 4 | 4 | 3 | `[3]` | `3 > 4` false, push `4` | `[4,2,4,-1,-1]` |

After first pass:

```txt
stack = [3, 4]
```

Meaning:

```txt
index 3 value 4 still waiting
index 4 value 3 still waiting
```

### Second Pass

Second pass me push nahi hota.

| step | currentIndex | currentValue | Stack before | Action | Result |
|---:|---:|---:|---|---|---|
| 5 | 0 | 2 | `[3,4]` | `2 > 3` false | `[4,2,4,-1,-1]` |
| 6 | 1 | 1 | `[3,4]` | `1 > 3` false | `[4,2,4,-1,-1]` |
| 7 | 2 | 2 | `[3,4]` | `2 > 3` false | `[4,2,4,-1,-1]` |
| 8 | 3 | 4 | `[3,4]` | `4 > 3`, pop `4`, result[4]=4; `4 > 4` false | `[4,2,4,-1,4]` |
| 9 | 4 | 3 | `[3]` | `3 > 4` false | `[4,2,4,-1,4]` |

Final:

```txt
[4, 2, 4, -1, 4]
```

Index `3` value `4` remains `-1` because no strictly greater value exists.

---

## STEP 12: Quick Reference

Core idea:

```txt
stack = unresolved indices
```

Circular trick:

```txt
run loop 2*n times
currentIndex = step % n
```

Push rule:

```txt
push only when step < n
```

Resolve rule:

```txt
while currentValue > nums[stackTop]:
  result[stackTop] = currentValue
```

Most important memory:

```txt
second pass gives circular chance, not duplicate waiting entries
```
