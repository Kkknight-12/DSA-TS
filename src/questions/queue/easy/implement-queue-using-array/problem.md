# Implement Queue using Array

**Difficulty:** Easy
**Topics:** Queue, Array, Design

---

[gemini-explanation](https://gemini.google.com/gem/d7b41321a3f1/d221ce231af1a6b4)

## Problem Statement

Implement a First-In-First-Out (FIFO) queue using an array. The implemented queue should support the following operations: push, pop, peek, and isEmpty.

Implement the ArrayQueue class:

- `void push(int x)`: Adds element x to the end of the queue
- `int pop()`: Removes and returns the front element of the queue
- `int peek()`: Returns the front element of the queue without removing it
- `boolean isEmpty()`: Returns true if the queue is empty, false otherwise

---

## Examples

### Example 1:
```
Input:
["ArrayQueue", "push", "push", "peek", "pop", "isEmpty"]
[[], [5], [10], [], [], []]

Output: [null, null, null, 5, 5, false]

Explanation:
ArrayQueue queue = new ArrayQueue();
- queue.push(5);
- queue.push(10);
- queue.peek(); // returns 5
- queue.pop(); // returns 5
- queue.isEmpty(); // returns false
```

### Example 2:
```
Input:
["ArrayQueue", "isEmpty"]
[[], []]

Output: [null, true]

Explanation:
ArrayQueue queue = new ArrayQueue();
- queue.isEmpty(); // returns true
```

---

## Constraints

- `1 <= x <= 10^9`
- At most `10^4` calls will be made to push, pop, peek, and isEmpty
- All calls to pop and peek are valid (queue will not be empty)

---

## Prerequisites (Agar Koi Chahiye)

**Koi special prerequisite nahi hai!** Basic queue implementation hai.

**Basic concepts you should know:**
- **Array indexing**: 0-based indexing
- **FIFO principle**: First In, First Out (jo pehle gaya, woh pehle niklega)

---

## Approach 1: Simple Array with shift() (Naive)

**Intuition (Soch):**

Queue ko samajhne ka sabse asan tarika - **Line mein khade log** (like at ticket counter)!

```
People in line:
┌────────┬────────┬────────┐
│Person 1│Person 2│Person 3│
└────────┴────────┴────────┘
    ↑                    ↑
  FRONT              REAR
  (dequeue)        (enqueue)

First person in line is first to get ticket!
```

**Key insights:**
1. **Push = Add to end**: New element array ke end mein
2. **Pop = Remove from front**: Array.shift() se pehla element nikalo
3. **Peek = View front**: Array[0] dekho

**Why this works:**
- Array maintains insertion order
- shift() removes first element
- push() adds to end

**Visual representation:**

```
Operations on array []:

push(5):
┌───┐
│ 5 │
└───┘
 ↑front/rear

push(10):
┌───┬────┐
│ 5 │ 10 │
└───┴────┘
 ↑       ↑
front   rear

push(15):
┌───┬────┬────┐
│ 5 │ 10 │ 15 │
└───┴────┴────┘
 ↑            ↑
front        rear

peek(): returns 5 (no change)

pop(): returns 5, removes from front
shift() moves all elements left!
┌────┬────┐
│ 10 │ 15 │  ← All shifted!
└────┴────┘
 ↑        ↑
front    rear
```

**Algorithm:**

```
1. Initialize empty array

2. PUSH operation:
   - Add element to end: array.push(x)
   - O(1) time

3. POP operation:
   - Remove first element: array.shift()
   - O(n) time - ALL elements shift left!
   - Return removed element

4. PEEK operation:
   - Return array[0]
   - O(1) time

5. ISEMPTY operation:
   - Return array.length === 0
   - O(1) time
```

**Time Complexity:**
- push(): O(1) - Add to end
- pop(): **O(n)** - shift() moves all elements
- peek(): O(1) - Direct access
- isEmpty(): O(1) - Length check

**Space Complexity:** O(n)

**Problem with this approach:**
- ❌ pop() is O(n) - Very slow!
- ❌ Every dequeue shifts entire array
- ❌ Not suitable for large queues

**When to use:**
- Only for very small queues
- When dequeue is rare

---

## Approach 2: Two Pointers (Front and Rear) - Recommended ⭐

**Intuition (Soch):**

**Problem with Approach 1:** Har baar pop() mein saare elements shift karne padte hain.

**Better idea:** Array ko shift mat karo, bas **pointers** move karo!

```
Use two pointers:
- front: Points to first element (dequeue position)
- rear: Points to last element (enqueue position)

Array: [_, _, 5, 10, 15, _, _, _]
             ↑       ↑
           front   rear

When dequeue:
- Return array[front]
- Increment front++
- NO shifting needed! ✓
```

**Visual representation:**

```
Initial: front = 0, rear = -1
Array: [_, _, _, _, _]
        ↑
     front
     rear = -1 (empty)

push(5): rear++, array[rear] = 5
Array: [5, _, _, _, _]
        ↑  ↑
      front rear

push(10): rear++, array[rear] = 10
Array: [5, 10, _, _, _]
        ↑      ↑
      front   rear

push(15): rear++, array[rear] = 15
Array: [5, 10, 15, _, _]
        ↑          ↑
      front       rear

pop(): Returns array[front], front++
Array: [5, 10, 15, _, _]  (5 still there but front moved)
           ↑       ↑
         front    rear
Returns: 5

pop(): Returns array[front], front++
Array: [5, 10, 15, _, _]  (both 5,10 ignored)
               ↑       ↑
             front    rear
Returns: 10
```

**Key insight - Wasted space problem:**

```
After many operations:
Array: [X, X, X, X, X, 15, 20, 25]
                       ↑        ↑
                     front     rear

Space before front is wasted! 😞

Solution: Reset when queue becomes empty
When front > rear:
  - Queue is empty
  - Reset: front = 0, rear = -1
  - Reuse array from beginning! ✓
```

**Algorithm:**

```
class ArrayQueue:
    items = []
    front = 0
    rear = -1

function push(x):
    rear++
    items[rear] = x

function pop():
    if isEmpty():
        throw error

    element = items[front]
    front++

    // OPTIMIZATION: Reset when empty
    if front > rear:
        front = 0
        rear = -1

    return element

function peek():
    if isEmpty():
        throw error
    return items[front]

function isEmpty():
    return front > rear
```

**Time Complexity:**
- push(): O(1) - Increment rear, add element
- pop(): O(1) - Return front, increment front
- peek(): O(1) - Direct access
- isEmpty(): O(1) - Compare pointers

**Space Complexity:** O(n)
- Array grows dynamically
- Reset optimization reuses space

**Pros:**
- ✅ All operations O(1)
- ✅ Simple to implement
- ✅ No shifting needed

**Cons:**
- ❌ Array grows indefinitely (until reset)
- ❌ Memory not freed immediately

---

## Approach 3: Circular Queue (Fixed Size, Space Efficient)

**Intuition (Soch):**

**Problem with Approach 2:** Array keeps growing, space pehle wasted ho jati hai.

**Better idea:** Treat array as **circular** - wrap around to beginning!

```
Circular array with capacity 5:

Normal view:
[0, 1, 2, 3, 4]

Circular view (imagine bent into circle):
    0
  4   1
  3   2

When rear reaches end, wrap to beginning!
```

**Visual representation:**

```
Capacity = 5

Initial: front = 0, rear = 0, size = 0
[_, _, _, _, _]
 ↑
front/rear

push(5): rear = (0+1) % 5 = 1
[5, _, _, _, _]
 ↑  ↑
 f  r

push(10): rear = (1+1) % 5 = 2
[5, 10, _, _, _]
 ↑      ↑
 f      r

push(15): rear = (2+1) % 5 = 3
[5, 10, 15, _, _]
 ↑          ↑
 f          r

pop(): front = (0+1) % 5 = 1, size--
[5, 10, 15, _, _]
    ↑       ↑
    f       r
Returns: 5

push(20): rear = (3+1) % 5 = 4
[5, 10, 15, 20, _]
    ↑           ↑
    f           r

push(25): rear = (4+1) % 5 = 0 (WRAP AROUND!)
[25, 10, 15, 20, _]  ← Wrapped to index 0!
     ↑           ↑
     f           r (actually at 0)

This is circular! ⭕
```

**Key formulas:**

```
Enqueue (push):
- rear = (rear + 1) % capacity
- array[rear] = element

Dequeue (pop):
- element = array[front]
- front = (front + 1) % capacity

Full check:
- size === capacity

Empty check:
- size === 0
```

**Algorithm:**

```
class CircularQueue:
    items = Array(capacity)
    front = 0
    rear = 0
    size = 0
    capacity = n

function push(x):
    if size === capacity:
        throw "Queue Overflow"

    items[rear] = x
    rear = (rear + 1) % capacity
    size++

function pop():
    if isEmpty():
        throw "Queue Underflow"

    element = items[front]
    front = (front + 1) % capacity
    size--
    return element

function peek():
    if isEmpty():
        throw error
    return items[front]

function isEmpty():
    return size === 0

function isFull():
    return size === capacity
```

**Time Complexity:**
- push(): O(1) - If not full
- pop(): O(1) - Direct access
- peek(): O(1) - Direct access
- isEmpty(): O(1) - Size check

**Space Complexity:** O(capacity)
- Fixed size array
- Space efficient!

**Pros:**
- ✅ All operations O(1)
- ✅ Fixed memory usage
- ✅ Space efficient (no wasted space)
- ✅ Real-world applicable (buffers, ring buffers)

**Cons:**
- ❌ Fixed capacity (overflow possible)
- ❌ Need to track size separately

---

## Approach Comparison

| Approach | Push | Pop | Peek | Space | Pros | Cons |
|----------|------|-----|------|-------|------|------|
| **Simple shift()** | O(1) | **O(n)** | O(1) | O(n) | • Simple | • Slow pop<br>• Shifts entire array |
| **Two Pointers** | O(1) | O(1) | O(1) | O(n) | • Fast operations<br>• Simple | • Array grows<br>• Space wasted |
| **Circular Queue** | O(1) | O(1) | O(1) | O(capacity) | • Space efficient<br>• Fixed memory<br>• Real-world use | • Fixed size<br>• Overflow possible |

---

## Edge Cases to Consider

1. **Empty queue operations:**
   - `pop()` on empty → Error
   - `peek()` on empty → Error

2. **Single element:**
   - Push, pop, isEmpty sequence

3. **Full queue (Circular only):**
   - Push on full → Overflow error

4. **Wrap around (Circular only):**
   - Rear wraps to beginning
   - Front wraps to beginning

5. **Multiple push-pop cycles:**
   - Verify pointers update correctly

6. **Reset optimization (Two Pointers):**
   - When queue empty, reset pointers

---

## Real-world Use Cases

**Queues are everywhere:**
1. **Task scheduling**: Process tasks in order
2. **Print queue**: Documents printed in order
3. **BFS traversal**: Level-order tree traversal
4. **Request handling**: Server processes requests
5. **Circular buffers**: Audio/video streaming
6. **Message queues**: Kafka, RabbitMQ

---

## Interview Tips

**What to say:**
1. "Queue follows FIFO - First In, First Out"
2. "I can use shift() but it's O(n). Better to use two pointers for O(1)"
3. "For fixed capacity, circular queue is most space-efficient"
4. "The modulo operation handles wrap-around in circular queue"

**Common follow-ups:**
- **Q: Why not use shift()?**
  → It's O(n) because all elements shift left. Two pointers give O(1).

- **Q: How to make it space-efficient?**
  → Use circular queue with fixed capacity

- **Q: What if we need dynamic size?**
  → Two pointers with reset optimization (Approach 2)

- **Q: Real-world example?**
  → Circular buffers in audio streaming, OS scheduling

**Mistakes to avoid:**
- ❌ Using shift() thinking it's O(1)
- ❌ Forgetting to check empty before pop/peek
- ❌ Wrong modulo calculation in circular queue
- ❌ Not handling wrap-around in circular queue

---

## Which Approach Should You Implement?

**For interviews:**
- Start with **Approach 2** (Two Pointers) - Standard and optimal
- If asked about space optimization → Discuss **Approach 3** (Circular)
- Mention **Approach 1** as naive (but don't implement)

**Recommended: Approach 2 (Two Pointers)** - Best for dynamic size, O(1) operations!

**Alternative: Approach 3 (Circular)** - If fixed capacity mentioned or space-critical

---

## 🎯 Which approach would you like to see implemented?

1. **Approach 2: Two Pointers** (Recommended - Dynamic, O(1) operations)
2. **Approach 3: Circular Queue** (Space efficient, fixed size)
3. **Both approaches** (For complete understanding)

Let me know and I'll create the detailed solution with comprehensive dry run! 🚀