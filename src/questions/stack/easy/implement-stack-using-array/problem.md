# Implement Stack using Array

**Difficulty:** Easy
**Topics:** Stack, Array, Design
**Curriculum Reference:** Problem #331

---

[gemini-explanation](https://gemini.google.com/gem/d7b41321a3f1/b5a184919e89dcfa)

## Problem Statement

Implement a Last-In-First-Out (LIFO) stack using an array. The implemented stack should support the following operations: push, pop, peek, and isEmpty.

Implement the ArrayStack class:

- `void push(int x)`: Pushes element x onto the stack
- `int pop()`: Removes and returns the top element of the stack
- `int top()`: Returns the top element of the stack without removing it
- `boolean isEmpty()`: Returns true if the stack is empty, false otherwise

---

## Examples

### Example 1:
```
Input:
["ArrayStack", "push", "push", "top", "pop", "isEmpty"]
[[], [5], [10], [], [], []]

Output: [null, null, null, 10, 10, false]

Explanation:
ArrayStack stack = new ArrayStack();
- stack.push(5);
- stack.push(10);
- stack.top(); // returns 10
- stack.pop(); // returns 10
- stack.isEmpty(); // returns false
```

### Example 2:
```
Input:
["ArrayStack", "isEmpty", "push", "pop", "isEmpty"]
[[], [], [1], [], []]

Output: [null, true, null, 1, true]

Explanation:
ArrayStack stack = new ArrayStack();
- stack.isEmpty(); // returns true (empty stack)
- stack.push(1);
- stack.pop(); // returns 1
- stack.isEmpty(); // returns true (empty again)
```

---

## Constraints

- `1 <= x <= 10^9`
- At most `10^4` calls will be made to push, pop, top, and isEmpty
- All calls to pop and top are valid (stack will not be empty)

---

## Prerequisites (Agar Koi Chahiye)

**Koi special prerequisite nahi hai!** Ye sabse basic stack implementation hai.

**Basic concepts you should know:**
- **Array indexing**: 0-based indexing
- **LIFO principle**: Last In, First Out (jo last mein gaya, woh pehle niklega)

---

## Approach 1: Dynamic Array Implementation (Most Common)

**Intuition (Soch):**

Stack ko samajhne ka sabse asan tarika - **plate ki stack** socho!

```
Plates stacked on table:
┌─────────┐
│ Plate 3 │ ← Top (last added, first removed)
├─────────┤
│ Plate 2 │
├─────────┤
│ Plate 1 │ ← Bottom (first added, last removed)
└─────────┘
```

**Key insights:**
1. **Array ki end = Stack ka top**: Hum array ke end ko top maanenge
2. **Push = Array mein add karo**: Element array ke end mein add hoga
3. **Pop = Last element remove karo**: Array se last element nikalo
4. **Top = Last element dekho**: Bina remove kiye, last element dekho

**Why this works:**
- TypeScript/JavaScript arrays are **dynamic** (automatically grow/shrink)
- `array.push()` adds to end: O(1) amortized
- `array.pop()` removes from end: O(1)
- `array[array.length - 1]` gets last element: O(1)

**Visual representation:**

```
Operations on array []:

push(5):
┌───┐
│ 5 │ ← top (index 0)
└───┘

push(10):
┌───┬────┐
│ 5 │ 10 │ ← top (index 1)
└───┴────┘

push(15):
┌───┬────┬────┐
│ 5 │ 10 │ 15 │ ← top (index 2)
└───┴────┴────┘

top(): returns 15 (no change to array)

pop(): returns 15
┌───┬────┐
│ 5 │ 10 │ ← top (index 1)
└───┴────┘

pop(): returns 10
┌───┐
│ 5 │ ← top (index 0)
└───┘

isEmpty(): returns false (still has 1 element)
```

**Algorithm:**

```
1. Initialize empty array and top index = -1 (or track using array.length)

2. PUSH operation:
   - Add element to end of array
   - Increment top pointer (or rely on array.length)

3. POP operation:
   - Check if empty (throw error if yes)
   - Remove and return last element
   - Decrement top pointer

4. TOP/PEEK operation:
   - Check if empty (throw error if yes)
   - Return last element WITHOUT removing

5. ISEMPTY operation:
   - Return true if array.length === 0
```

**Time Complexity:** O(1) for all operations

**Why?**
- `push()`: Array add at end is O(1) amortized
- `pop()`: Array remove from end is O(1)
- `top()`: Direct array access is O(1)
- `isEmpty()`: Length check is O(1)

**Space Complexity:** O(n)

**Why?**
- Array stores n elements
- No extra space needed

---

## Approach 2: Fixed-Size Array with Capacity (Interview Variant)

**Intuition (Soch):**

Real-world mein kabhi kabhi **fixed capacity** hota hai - jaise limited memory available ho.

```
Stack with capacity 5:

Empty:
[_, _, _, _, _]
 ↑
top = -1

After push(10), push(20), push(30):
[10, 20, 30, _, _]
          ↑
       top = 2

Full (capacity reached):
[10, 20, 30, 40, 50]
                 ↑
              top = 4
```

**Key differences from Approach 1:**
1. **Fixed capacity**: Array size fixed at initialization
2. **Overflow check**: Push fails if stack is full
3. **Top pointer**: Explicitly track current top index

**Additional operation:**
- `isFull()`: Check if stack reached capacity

**Algorithm:**

```
1. Initialize array of fixed size (capacity)
2. Set top = -1 (no elements)

3. PUSH operation:
   - Check if full (top === capacity - 1)
   - If full, throw error "Stack Overflow"
   - Increment top
   - Set array[top] = element

4. POP operation:
   - Check if empty (top === -1)
   - If empty, throw error "Stack Underflow"
   - Get element at array[top]
   - Decrement top
   - Return element

5. ISFULL operation:
   - Return top === capacity - 1
```

**Time Complexity:** O(1) for all operations

**Space Complexity:** O(capacity)
- Fixed size array allocated upfront

---

## Approach Comparison

| Approach | Time (All Ops) | Space | Pros | Cons | Use Case |
|----------|---------------|-------|------|------|----------|
| **Dynamic Array** | O(1) | O(n) | • Simple<br>• No overflow<br>• Auto-resize | • Potential memory waste<br>• Resize cost (rare) | Most common, default choice |
| **Fixed-Size Array** | O(1) | O(capacity) | • Predictable memory<br>• No resize overhead | • Overflow possible<br>• Wasted space if underutilized | Embedded systems, memory-constrained |

---

## Edge Cases to Consider

1. **Empty stack operations:**
   - `pop()` on empty stack → Error/null
   - `top()` on empty stack → Error/null

2. **Single element:**
   - Push, pop, isEmpty sequence

3. **Full stack (Fixed-size only):**
   - Push on full stack → Overflow error

4. **Multiple push-pop cycles:**
   - Verify top pointer updates correctly

5. **Peek without modification:**
   - `top()` should NOT change stack

---

## Which Approach Should You Implement?

**For this problem, I recommend Approach 1 (Dynamic Array)** because:
- ✅ Most practical in modern languages
- ✅ No overflow handling needed
- ✅ Cleaner code
- ✅ Standard in JavaScript/TypeScript

**Approach 2 (Fixed-Size)** is good to know for:
- Embedded systems interviews
- Memory-constrained environments
- Understanding overflow/underflow concepts

---

## 🎯 Which approach would you like to see implemented?

1. **Approach 1: Dynamic Array** (Recommended)
2. **Approach 2: Fixed-Size Array** (Interview Variant)
3. **Both** (For complete understanding)

Let me know and I'll create the detailed solution with comprehensive dry run and test cases! 🚀