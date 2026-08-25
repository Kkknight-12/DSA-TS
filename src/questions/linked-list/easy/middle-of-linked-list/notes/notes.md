# Middle of Linked List - Notes

## 1. Problem Samjho

Linked list ka `head` diya hai.
Middle node return karna hai.

Return value node hota hai, sirf value nahi.
Isliye agar middle node `3` hai in:

```txt
1 -> 2 -> 3 -> 4 -> 5 -> null
```

Then returned linked list suffix:

```txt
3 -> 4 -> 5 -> null
```

Even length me second middle chahiye:

```txt
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
          first  second
```

Answer:

```txt
4 -> 5 -> 6 -> null
```

---

## 2. Brute Force

Linked list me direct indexing nahi hoti.
So brute force 2 passes use karta hai:

```txt
Pass 1: total nodes count karo
Pass 2: head se middle index tak jao
```

Middle index:

```txt
middleIndex = Math.floor(totalNodes / 2)
```

Why:

| Total nodes | Indices | Required middle index |
|---:|---|---:|
| 1 | `0` | 0 |
| 2 | `0, 1` | 1 |
| 5 | `0, 1, 2, 3, 4` | 2 |
| 6 | `0, 1, 2, 3, 4, 5` | 3 |

---

## 3. Key Insight

Optimal solution me count karne ki zaroorat nahi.

Do pointers rakho:

```txt
slow -> 1 step at a time
fast -> 2 steps at a time
```

Jab `fast` end tak pahunchta hai:

```txt
slow ne half distance travel kiya hota hai
```

So `slow` middle par hota hai.

---

## 4. Why This Technique Works

Suppose list length `n` hai.

Every iteration:

```txt
slow moves 1 node
fast moves 2 nodes
```

If fast roughly `n` nodes travel karta hai, slow roughly `n / 2` nodes travel karta hai.

Middle bhi wahi hota hai:

```txt
half distance from head
```

Even length me second middle isliye milta hai kyunki loop condition:

```ts
fast !== null && fast.next !== null
```

Fast ke paas jab tak next node available hai, slow ek aur step move karega.
Ye final extra slow move even case me slow ko first middle se second middle par le aata hai.

---

## 5. Variables

| Variable | Meaning |
|---|---|
| `head` | linked list ka first node |
| `current` | brute force traversal pointer |
| `totalNodes` | list me total nodes count |
| `middleIndex` | head se kitne steps chalna hai |
| `slow` | current middle candidate |
| `fast` | end detect karne wala double-speed pointer |

Short memory:

```txt
slow = answer candidate
fast = end checker
```

---

## 6. Mental Model

Race track socho.

```txt
fast runner double speed se bhaag raha hai
slow runner normal speed se bhaag raha hai
```

Jab fast runner finish line tak pahunchta hai:

```txt
slow runner track ke middle par hota hai
```

Linked list me finish line:

```txt
fast === null
ya
fast.next === null
```

---

## 7. Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Empty list | `[]` | `null` | koi node nahi |
| Single node | `[10]` | `[10]` | same node middle hai |
| Two nodes | `[7, 9]` | `[9]` | second middle chahiye |
| Odd length | `[1,2,3,4,5]` | `[3,4,5]` | exact center |
| Even length | `[1,2,3,4,5,6]` | `[4,5,6]` | second middle |

---

## 8. Conditions

### `head === null`

Meaning:

```txt
list empty hai
```

Action:

```txt
return null
```

### `fast !== null && fast.next !== null`

Meaning:

```txt
fast pointer abhi safe 2-step move kar sakta hai
```

Why both checks:

| Check | Why needed |
|---|---|
| `fast !== null` | fast list ke bahar na ho |
| `fast.next !== null` | fast ke paas next node ho, taaki 2-step jump safe rahe |

Loop stop:

```txt
fast null -> even length end crossed
fast.next null -> odd length last node reached
```

---

## 9. Step-by-Step Dry Run

Input:

```txt
head = [1, 2, 3, 4, 5, 6]
```

Initial:

```txt
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
S/F
```

| Iteration | Before slow | Before fast | Condition | After slow | After fast |
|---:|---:|---:|---|---:|---|
| 1 | 1 | 1 | fast and fast.next exist | 2 | 3 |
| 2 | 2 | 3 | fast and fast.next exist | 3 | 5 |
| 3 | 3 | 5 | fast and fast.next exist | 4 | null |

Stop:

```txt
fast === null
```

Answer:

```txt
slow = 4
return 4 -> 5 -> 6 -> null
```

Pointer view:

| Stage | Linked list view |
|---|---|
| Start | `1(S/F) -> 2 -> 3 -> 4 -> 5 -> 6 -> null` |
| After 1 | `1 -> 2(S) -> 3(F) -> 4 -> 5 -> 6 -> null` |
| After 2 | `1 -> 2 -> 3(S) -> 4 -> 5(F) -> 6 -> null` |
| After 3 | `1 -> 2 -> 3 -> 4(S) -> 5 -> 6 -> null(F)` |

---

## 10. Correctness

Fast pointer slow se double speed par move karta hai.

Har iteration ke baad:

```txt
fast distance = 2 * slow distance
```

Jab fast list ka end reach/cross karta hai:

```txt
slow distance = half of list distance
```

Odd length:

```txt
slow exact center par rukta hai
```

Even length:

```txt
slow second middle par rukta hai
```

Therefore algorithm required middle node return karta hai.

---

## 11. Complexity

| Approach | Time | Space | Reason |
|---|---:|---:|---|
| Brute force | O(n) | O(1) | two passes, no extra collection |
| Optimal | O(n) | O(1) | one pass, only two pointers |

Important:

```txt
Brute force ka time O(n) hi hai,
but optimal one-pass hai, so interview me preferred hai.
```

---

## 12. Final Takeaway

Middle of linked list ka best mental model:

```txt
slow answer candidate hai
fast end detector hai
```

If fast moves twice as quickly:

```txt
fast end par -> slow middle par
```

Even length me loop condition naturally second middle return karwati hai.

