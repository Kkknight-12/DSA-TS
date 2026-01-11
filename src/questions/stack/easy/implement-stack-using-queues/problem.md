# Implement Stack using Queues

**Difficulty:** Easy
**Topics:** Stack, Queue, Design
**LeetCode:** #225

---

[gemini-explanation](https://gemini.google.com/gem/9013c4cd97d5/bd6e4808b77a772b)

## Problem Statement

Implement a last-in-first-out (LIFO) stack using **only two queues**. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

Implement the MyStack class:

- `void push(int x)`: Pushes element x to the top of the stack
- `int pop()`: Removes the element on the top of the stack and returns it
- `int top()`: Returns the element on the top of the stack
- `boolean empty()`: Returns true if the stack is empty, false otherwise

**Notes:**
- You must use **only standard operations of a queue**:
  - push to back
  - peek/pop from front
  - size
  - is empty
- Cannot access elements in the middle of the queue

---

## Examples

### Example 1:
```
Input:
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]

Output:
[null, null, null, 2, 2, false]

Explanation:
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return false
```

---

## Constraints

- `1 <= x <= 9`
- At most `100` calls will be made to push, pop, top, and empty
- All calls to pop and top are valid

---

## Prerequisites (Agar Koi Chahiye)

**Basic concepts needed:**
- **Queue operations**: FIFO (First In, First Out)
- **Stack operations**: LIFO (Last In, First Out)
- **Problem**: Convert FIFO to LIFO behavior

**No advanced algorithms required!**

---

## Core Challenge

**The fundamental problem:**

```
Queue: FIFO
┌───┬───┬───┐
│ 1 │ 2 │ 3 │
└───┴───┴───┘
 ↑       ↑
dequeue  enqueue

Dequeue: Gets 1 (first in)

Stack: LIFO
┌───┐
│ 3 │ ← top (last in, first out)
├───┤
│ 2 │
├───┤
│ 1 │
└───┘

Pop: Gets 3 (last in)

HOW to make queue behave like stack? 🤔
```

---

## Approach 1: Two Queues - Push O(n), Pop O(1) (Make Push Heavy)

### Intuition (Soch):

**Key idea:** Keep elements in **stack order** in queue!

**Strategy:**
- Main queue: Stores elements in LIFO order (top to bottom)
- Helper queue: Temporary storage during push

**How it works:**

```
To push new element:
1. Add new element to helper queue (it becomes new top)
2. Move ALL elements from main to helper (maintaining order)
3. Swap queues (helper becomes main)

Result: New element is now at front of main queue!
```

**Visual example:**

```
Initial: Stack is empty
main: []
helper: []

─────────────────────────────────────────────────────────────
PUSH(1):
─────────────────────────────────────────────────────────────
Step 1: Add 1 to helper
helper: [1]
main: []

Step 2: Move all from main to helper (nothing to move)
helper: [1]

Step 3: Swap (helper becomes main)
main: [1]
helper: []

─────────────────────────────────────────────────────────────
PUSH(2):
─────────────────────────────────────────────────────────────
Step 1: Add 2 to helper
helper: [2]
main: [1]

Step 2: Move all from main to helper
Move 1 → helper: [2, 1]
main: []

Step 3: Swap
main: [2, 1]  ← 2 is at front (latest element)!
helper: []

─────────────────────────────────────────────────────────────
POP():
─────────────────────────────────────────────────────────────
main: [2, 1]
      ↑ dequeue from front = 2 (correct! latest element)

Result: returns 2
main: [1]
```

**Why this works:**
- Latest element is always at front of queue
- Pop/Top just dequeue from front (O(1))
- Push does the heavy lifting (O(n))

### Algorithm:

```
class MyStack:
    main = Queue()
    helper = Queue()

function push(x):
    // Step 1: Add new element to helper
    helper.enqueue(x)

    // Step 2: Move all from main to helper
    while !main.isEmpty():
        helper.enqueue(main.dequeue())

    // Step 3: Swap queues
    temp = main
    main = helper
    helper = temp

function pop():
    if empty():
        throw error
    return main.dequeue()  // O(1) - just dequeue front

function top():
    if empty():
        throw error
    return main.peek()     // O(1) - just peek front

function empty():
    return main.isEmpty()
```

### Complexity Analysis:

**Time Complexity:**
- push(x): **O(n)** - Move all n elements during push
- pop(): O(1) - Simple dequeue
- top(): O(1) - Simple peek
- empty(): O(1) - Check if empty

**Space Complexity:** O(n)
- Two queues, but only one has elements at a time
- Total space: n elements

**Trade-off:**
- ✅ Fast pop/top operations
- ❌ Slow push operation

---

## Approach 2: Two Queues - Push O(1), Pop O(n) (Make Pop Heavy)

### Intuition (Soch):

**Key idea:** Keep elements in **queue order** (FIFO), convert on pop!

**Strategy:**
- Main queue: Stores elements in insertion order
- Helper queue: Temporary storage during pop

**How it works:**

```
To pop element:
1. Move all elements EXCEPT last from main to helper
2. The last element in main is the stack top!
3. Remove and return that element
4. Swap queues
```

**Visual example:**

```
Initial: Stack is empty
main: []
helper: []

─────────────────────────────────────────────────────────────
PUSH(1): Just add to main
─────────────────────────────────────────────────────────────
main: [1]
helper: []

─────────────────────────────────────────────────────────────
PUSH(2): Just add to main
─────────────────────────────────────────────────────────────
main: [1, 2]
helper: []

─────────────────────────────────────────────────────────────
PUSH(3): Just add to main
─────────────────────────────────────────────────────────────
main: [1, 2, 3]
helper: []

─────────────────────────────────────────────────────────────
POP(): Get last element (3)
─────────────────────────────────────────────────────────────
main: [1, 2, 3]
helper: []

Step 1: Move all except last to helper
Move 1 → helper: [1]
Move 2 → helper: [1, 2]
main: [3]  ← Only last element remains

Step 2: Dequeue last element from main
element = 3
main: []

Step 3: Swap queues
main: [1, 2]
helper: []

Returns: 3 ✓
```

**Why this works:**
- Push is simple: just enqueue (O(1))
- Pop does the work: transfers n-1 elements (O(n))
- Last element in queue = Top of stack

### Algorithm:

```
class MyStack:
    main = Queue()
    helper = Queue()

function push(x):
    main.enqueue(x)  // O(1) - simple enqueue

function pop():
    if empty():
        throw error

    // Move all except last to helper
    while main.size() > 1:
        helper.enqueue(main.dequeue())

    // Last element is stack top
    result = main.dequeue()

    // Swap queues
    temp = main
    main = helper
    helper = temp

    return result

function top():
    if empty():
        throw error

    // Same as pop but put element back
    while main.size() > 1:
        helper.enqueue(main.dequeue())

    result = main.peek()  // or dequeue and enqueue back

    helper.enqueue(main.dequeue())

    temp = main
    main = helper
    helper = temp

    return result

function empty():
    return main.isEmpty()
```

### Complexity Analysis:

**Time Complexity:**
- push(x): **O(1)** - Simple enqueue
- pop(): **O(n)** - Transfer n-1 elements
- top(): **O(n)** - Transfer all elements and restore
- empty(): O(1) - Check if empty

**Space Complexity:** O(n)
- Two queues with n total elements

**Trade-off:**
- ✅ Fast push operation
- ❌ Slow pop/top operations

---

## Approach 3: One Queue - Push O(n) (Space Optimized)

### Intuition (Soch):

**Key idea:** Use queue **rotation** trick!

**Strategy:**
- Only ONE queue needed
- After adding element, rotate queue to bring it to front

**How it works:**

```
To push new element:
1. Remember current size (n)
2. Enqueue new element at back
3. Dequeue and enqueue first n elements
   (This rotates the queue!)

Result: New element is now at front!
```

**Visual example:**

```
Initial: queue is empty
queue: []

─────────────────────────────────────────────────────────────
PUSH(1):
─────────────────────────────────────────────────────────────
size before = 0

Step 1: Enqueue 1
queue: [1]

Step 2: Rotate 0 times (no elements before)
queue: [1]

─────────────────────────────────────────────────────────────
PUSH(2):
─────────────────────────────────────────────────────────────
size before = 1

Step 1: Enqueue 2
queue: [1, 2]
       ↑front  ↑back

Step 2: Rotate 1 time
Dequeue 1, enqueue 1:
queue: [2, 1]
       ↑front ↑back
Now 2 is at front! ✓

─────────────────────────────────────────────────────────────
PUSH(3):
─────────────────────────────────────────────────────────────
size before = 2

Step 1: Enqueue 3
queue: [2, 1, 3]

Step 2: Rotate 2 times
Round 1: Dequeue 2, enqueue 2
queue: [1, 3, 2]

Round 2: Dequeue 1, enqueue 1
queue: [3, 2, 1]
       ↑front
Now 3 is at front! ✓

─────────────────────────────────────────────────────────────
POP():
─────────────────────────────────────────────────────────────
queue: [3, 2, 1]
Simply dequeue front = 3 ✓

queue: [2, 1]
```

**Why this works:**
- Rotation brings latest element to front
- Queue maintains stack order: [top, ..., bottom]
- Pop is just dequeue from front

### Algorithm:

```
class MyStack:
    queue = Queue()

function push(x):
    n = queue.size()  // Remember size before adding

    queue.enqueue(x)  // Add new element at back

    // Rotate n times to bring new element to front
    for i from 0 to n-1:
        queue.enqueue(queue.dequeue())

function pop():
    if empty():
        throw error
    return queue.dequeue()

function top():
    if empty():
        throw error
    return queue.peek()

function empty():
    return queue.isEmpty()
```

### Complexity Analysis:

**Time Complexity:**
- push(x): **O(n)** - Rotate n elements
- pop(): O(1) - Simple dequeue
- top(): O(1) - Simple peek
- empty(): O(1) - Check if empty

**Space Complexity:** O(n)
- Only ONE queue needed (space efficient!)

**Trade-off:**
- ✅ Only one queue (less space)
- ✅ Fast pop/top
- ❌ Slow push

---

## Approach Comparison

| Approach | Push | Pop | Top | Queues | Best For |
|----------|------|-----|-----|--------|----------|
| **Two Queues (Push Heavy)** | O(n) | O(1) | O(1) | 2 | Pop/top frequent |
| **Two Queues (Pop Heavy)** | O(1) | O(n) | O(n) | 2 | Push frequent |
| **One Queue (Rotation)** | O(n) | O(1) | O(1) | 1 | Space critical |

---

## Which Approach is Most Common?

**Interview favorite:** Approach 1 (Two Queues - Push O(n), Pop O(1))

**Why?**
- Most practical: Pop/top are usually more frequent than push
- Clear logic: Elements always in stack order
- Easy to explain and implement

**Bonus:** Approach 3 (One Queue) for space optimization discussion

---

## Real-world Context

**Why this problem?**
- Tests understanding of data structure properties
- Shows how to convert FIFO to LIFO
- Demonstrates trade-offs in operation costs

**In practice:**
- You would just use a stack! 😄
- This is a theoretical exercise
- Good for understanding queue/stack internals

---

## Interview Tips

**What to say:**
1. "The challenge is converting FIFO to LIFO behavior"
2. "I can make push heavy or pop heavy - which is more frequent?"
3. "I can use rotation trick with one queue to save space"

**Common follow-ups:**
- **Q: Can you do it with one queue?**
  → Yes! Use rotation technique (Approach 3)

- **Q: Which is better - O(1) push or O(1) pop?**
  → Depends on usage. Usually O(1) pop is better (stack pop is common)

- **Q: Why not just use an array?**
  → Problem requires using only queue operations (constraint)

**Mistakes to avoid:**
- ❌ Trying to access middle of queue (not allowed!)
- ❌ Forgetting to swap queues after operations
- ❌ Wrong rotation count (should be n, not n-1 or n+1)

---

## 🎯 Which approach would you like to see implemented?

1. **Approach 1: Two Queues - Push O(n)** (Most Common, Recommended)
2. **Approach 2: Two Queues - Pop O(n)** (Alternative)
3. **Approach 3: One Queue - Rotation** (Space Optimized)
4. **Multiple approaches** (For complete understanding)

Let me know and I'll create the detailed solution with comprehensive dry run! 🚀