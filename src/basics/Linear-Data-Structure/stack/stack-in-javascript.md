# Stack In JavaScript

JavaScript me stack banane ka most common way:

```javascript
const stack = [];
```

But important baat:

```txt
Array khud stack nahi hota.
Hum array ko stack ki tarah use karte hain.
```

Stack rule:

```txt
Last In, First Out
```

JavaScript array ka end is rule ke liye perfect hota hai.

---

## 1. Array End As Stack Top

```txt
stack = [10, 20, 30]
                  ^
                 top
```

Top means:

```txt
Yahin new value add hogi.
Yahin se value remove hogi.
```

JavaScript methods:

```javascript
const stack = [];

stack.push(10); // [10]
stack.push(20); // [10, 20]
stack.push(30); // [10, 20, 30]

const removed = stack.pop(); // 30

console.log(stack); // [10, 20]
```

Why this works:

```txt
push() array ke end me add karta hai.
pop() array ke end se remove karta hai.

So array ka end stack ka top ban jaata hai.
```

---

## 2. Why End, Not Start?

Array ke end par add/remove karna usually efficient hota hai.

| Stack operation | Use this | Why |
|---|---|---|
| push | `arr.push(x)` | end me add, usually no shifting |
| pop | `arr.pop()` | end se remove, usually no shifting |
| peek | `arr[arr.length - 1]` | last value read |

Avoid using array start as stack top:

| Method | Problem |
|---|---|
| `unshift(x)` | start me add karta hai, existing elements shift ho sakte hain |
| `shift()` | start se remove karta hai, existing elements shift ho sakte hain |

Preferred:

```txt
Stack top = array end
```

Not preferred:

```txt
Stack top = array start
```

---

## 3. Push, Pop, Peek

```javascript
const stack = [];

stack.push("A");
stack.push("B");
stack.push("C");

console.log(stack); // ["A", "B", "C"]
```

Visual:

```txt
["A", "B", "C"]
            ^
           top
```

Peek:

```javascript
const top = stack[stack.length - 1];

console.log(top);   // "C"
console.log(stack); // ["A", "B", "C"]
```

Pop:

```javascript
const removed = stack.pop();

console.log(removed); // "C"
console.log(stack);   // ["A", "B"]
```

Difference:

```txt
peek = sirf dekho
pop  = dekho + remove karo
```

---

## 4. Empty Stack Check

Empty stack par `pop()`:

```javascript
const stack = [];

console.log(stack.pop()); // undefined
```

JavaScript error nahi deta, but DSA logic me `undefined` dangerous ho sakta hai.

Example issue:

```javascript
const stack = [];
const top = stack[stack.length - 1]; // undefined

console.log(5 > top); // false, but logic unclear
```

So check:

```javascript
if (stack.length === 0) {
  console.log("Stack is empty");
}
```

---

## 5. Simple Stack Helpers

```javascript
const stack = [];

function push(value) {
  stack.push(value);
}

function pop() {
  if (stack.length === 0) {
    throw new Error("Cannot pop from empty stack");
  }

  return stack.pop();
}

function peek() {
  if (stack.length === 0) {
    throw new Error("Cannot peek from empty stack");
  }

  return stack[stack.length - 1];
}

function isEmpty() {
  return stack.length === 0;
}

function size() {
  return stack.length;
}
```

In DSA files, direct array usage is also common:

```javascript
stack.push(value);
stack.pop();
stack[stack.length - 1];
stack.length === 0;
```

---

## 6. Custom Stack Class

Class abstraction tab useful hai jab stack operations ko clean API deni ho.

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Cannot pop from empty stack");
    }

    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Cannot peek from empty stack");
    }

    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const stack = new Stack();

stack.push(10);
stack.push(20);

console.log(stack.peek()); // 20
console.log(stack.pop());  // 20
console.log(stack.size()); // 1
```

Benefit:

```txt
Internal array direct expose nahi hoti.
User sirf stack methods ke through kaam karta hai.
```

---

## 7. TypeScript Generic Stack

```typescript
class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(value: T): void {
    this.items.push(value);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Cannot pop from empty stack");
    }

    return this.items.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Cannot peek from empty stack");
    }

    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const numbers = new Stack<number>();
numbers.push(10);
numbers.push(20);

console.log(numbers.peek()); // 20
```

Why `<T>`?

```txt
Same Stack class number, string, object, kisi bhi type ke saath use ho sakti hai.
```

---

## 8. Stack Of Indices

DSA me stack me values ke bajay indices store karna common hai.

```javascript
const nums = [8, 4, 6];
const stack = [];

stack.push(0); // nums[0] = 8
stack.push(1); // nums[1] = 4
```

Why index?

```txt
Index se value bhi milti hai.
Index se answer array bhi update hota hai.
```

```javascript
const topIndex = stack[stack.length - 1];
const topValue = nums[topIndex];

console.log(topIndex); // 1
console.log(topValue); // 4
```

When duplicates exist, index avoids confusion:

```txt
nums = [2, 2, 3]

Value 2 do jagah hai.
Index tells exactly which 2 is waiting.
```

---

## 9. Array Circular Kaise Banta Hai?

Short answer:

```txt
Array circular nahi banta.
Index circular banta hai.
```

Normal array:

```javascript
const nums = [10, 20, 30];
```

Normal indexing:

```txt
0 -> 1 -> 2 -> stop
```

Circular indexing:

```txt
0 -> 1 -> 2 -> 0 -> 1 -> 2 -> ...
```

We simulate this with modulo:

```javascript
const nums = [10, 20, 30];
const n = nums.length;

for (let i = 0; i < 6; i++) {
  const index = i % n;
  console.log(index, nums[index]);
}
```

Output meaning:

```txt
i = 0 -> index = 0 -> 10
i = 1 -> index = 1 -> 20
i = 2 -> index = 2 -> 30
i = 3 -> index = 0 -> 10
i = 4 -> index = 1 -> 20
i = 5 -> index = 2 -> 30
```

Modulo keeps index inside valid range:

```txt
index = i % n
```

---

## 10. Why Modulo?

Array valid indices:

```txt
0 to n - 1
```

But circular traversal me virtual index badhta rehta hai:

```txt
0, 1, 2, 3, 4, 5, 6, ...
```

Modulo maps virtual index back to real index.

If `n = 3`:

| virtual i | i % 3 | real index |
|---:|---:|---:|
| 0 | 0 | 0 |
| 1 | 1 | 1 |
| 2 | 2 | 2 |
| 3 | 0 | 0 |
| 4 | 1 | 1 |
| 5 | 2 | 2 |
| 6 | 0 | 0 |

Mental model:

```txt
Modulo wraps index back to start.
```

---

## 11. Next And Previous In Circular Array

Next index:

```javascript
const nextIndex = (currentIndex + 1) % n;
```

Example:

```txt
n = 3

current = 0 -> next = 1
current = 1 -> next = 2
current = 2 -> next = 0
```

Previous index:

```javascript
const previousIndex = (currentIndex - 1 + n) % n;
```

Why `+ n`?

```txt
JavaScript me -1 % 3 negative result de sakta hai.
+ n karke value positive range me le aate hain.
```

Example:

```txt
n = 3

current = 0 -> previous = (0 - 1 + 3) % 3 = 2
current = 1 -> previous = (1 - 1 + 3) % 3 = 0
current = 2 -> previous = (2 - 1 + 3) % 3 = 1
```

---

## 12. Why Traverse Two Times?

Circular array problem me end wale elements ko start wale elements bhi right side me mil sakte hain.

Example:

```javascript
const nums = [5, 1, 3];
```

For value `3` at index `2`:

```txt
Normal right side:
  nothing

Circular right side:
  index 0 value 5
  index 1 value 1
```

So one pass:

```txt
0 -> 1 -> 2
```

does not give wrap-around chance.

Two passes:

```txt
0 -> 1 -> 2 -> 0 -> 1 -> 2
```

gives one full wrap-around view.

Code:

```javascript
const nums = [5, 1, 3];
const n = nums.length;

for (let i = 0; i < 2 * n; i++) {
  const index = i % n;
  console.log(nums[index]);
}
```

Why only `2 * n`?

```txt
One pass = original positions.
Second pass = wrap-around positions.

After one extra full cycle, every other element has already been seen.
No need for infinite circular traversal.
```

---

## 13. Stack With Circular Traversal

Important distinction:

```txt
Stack circular nahi hota.
Input array circularly traverse hota hai.
```

The stack is still normal:

```javascript
const stack = [];

stack.push(0);
stack.pop();
```

Circular part is only here:

```javascript
const index = i % n;
```

Generic skeleton:

```javascript
function circularStackPattern(nums) {
  const n = nums.length;
  const stack = [];

  for (let i = 0; i < 2 * n; i++) {
    const index = i % n;

    // Use nums[index] as the current circular value.
    // Use stack top as the latest pending item.

    if (i < n) {
      stack.push(index);
    }
  }
}
```

Why `if (i < n)`?

```txt
First pass me original indices stack me enter karte hain.
Second pass only old pending indices ko wrap-around chance deta hai.
Duplicate indices push karne se same work repeat ho sakta hai.
```

---

## 14. Generic Monotonic Stack Skeleton

This skeleton is not tied to one problem.

```javascript
function monotonicPattern(nums) {
  const answer = new Array(nums.length).fill(-1);
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    while (
      stack.length > 0 &&
      currentSolvesWaitingTop(nums, i, stack[stack.length - 1])
    ) {
      const waitingIndex = stack.pop();
      answer[waitingIndex] = nums[i];
    }

    stack.push(i);
  }

  return answer;
}
```

The problem-specific part is:

```javascript
currentSolvesWaitingTop(nums, i, waitingIndex)
```

For next greater:

```javascript
nums[i] > nums[waitingIndex]
```

For next smaller:

```javascript
nums[i] < nums[waitingIndex]
```

For histogram or stock span, condition and answer formula change, but stack idea remains same:

```txt
Stack stores pending/useful candidates.
Current value decides whether stack top is still useful.
```

---

## 15. Common Mistakes

| Mistake | Why it hurts |
|---|---|
| using `shift()` / `unshift()` for stack | array start operations may shift elements |
| using `stack[stack.length]` for peek | last valid index is `length - 1` |
| skipping empty check | `undefined` can silently break comparisons |
| saying array is circular | array is linear; modulo simulates circular access |
| saying stack is circular | usually input traversal is circular, stack remains normal |
| pushing duplicate indices in second pass | same pending work can repeat unnecessarily |
| storing values when indices are needed | duplicates and answer updates become harder |

---

## 16. Quick Reference

Stack:

```javascript
const stack = [];

stack.push(value);
const removed = stack.pop();
const top = stack[stack.length - 1];
const empty = stack.length === 0;
const size = stack.length;
```

Circular access:

```javascript
const index = i % nums.length;
const nextIndex = (index + 1) % nums.length;
const previousIndex = (index - 1 + nums.length) % nums.length;
```

Two-pass circular traversal:

```javascript
for (let i = 0; i < 2 * nums.length; i++) {
  const index = i % nums.length;
}
```

Short memory lines:

```txt
Array as stack = use end as top with push/pop.
Circular array = simulate using modulo, do not physically change array.
Two passes = original pass + one wrap-around pass.
Stack remains normal; traversal becomes circular.
```
