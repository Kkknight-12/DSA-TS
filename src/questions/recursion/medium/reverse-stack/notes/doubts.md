# Reverse Stack - Doubts

## 1. `insertAtBottom` ko kaunsa stack milta hai?

Question:

```txt
Jab `reverseStack` ke andar `insertAtBottom(stack, topElement)` call hota hai,
toh kya helper ko woh stack milta hai jo current frame start hote time tha?

Ya helper ko woh updated stack milta hai jo deeper recursion aur previous
`insertAtBottom` calls ke baad bana hai?
```

Answer:

```txt
Helper ko current updated stack milta hai.
```

Important idea:

```txt
`stack` same array object hota hai,
but uski values / contents recursion ke dauran mutate hote rehte hain.
```

So:

| cheez | kya preserve hota hai |
|---|---|
| `topElement` | current frame ka old popped value |
| `stack` | deeper recursive calls ke baad wala updated current stack |

---

### `CALL 3: reverseStack([4, 1])` example

Frame start:

```txt
stack = [4, 1]
```

Step 1:

```txt
pop() -> topElement = 1
stack becomes [4]
```

Step 2:

```txt
reverseStack([4]) call hota hai
```

Ab important baat:

```txt
CALL 3 turant `insertAtBottom([4], 1)` nahi chalata.
Pehle deeper call poora finish hota hai.
```

Deeper call `reverseStack([4])` kya karega?

```txt
pop 4
reverseStack([])
insertAtBottom([], 4)
result stack = [4]
```

Ab jab control `CALL 3` par wapas aata hai:

```txt
topElement ab bhi 1 hai
but `stack` current updated state me hai
```

Yahan current updated state:

```txt
stack = [4]
```

So actual call:

```txt
insertAtBottom([4], 1)
```

not:

```txt
insertAtBottom([4, 1], 1)
```

and not:

```txt
CALL 3 ke shuru hone wali old snapshot stack
```

---

### Short mental model

Har frame me:

```txt
1. topElement old value save karta hai
2. stack deeper recursion ke baad update hota rehta hai
3. helper ko wahi updated current stack milta hai
```

Example full unwind:

```txt
CALL 4 inserts 4 -> stack becomes [4]
CALL 3 inserts 1 into updated [4] -> [1, 4]
CALL 2 inserts 3 into updated [1, 4] -> [3, 1, 4]
CALL 1 inserts 2 into updated [3, 1, 4] -> [2, 3, 1, 4]
```

So exact conclusion:

```txt
`insertAtBottom` ko woh stack milta hai jo deeper recursion ke return ke baad
current mutated state me hota hai, na ki current frame ki old starting state.
```
