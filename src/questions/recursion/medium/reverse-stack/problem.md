# Reverse a Stack using Recursion

**Difficulty**: Medium
**Topics**: Stack, Recursion, Backtracking
**Source**: Coding Practice

---

## Problem Statement

[reverse-stack](https://www.geeksforgeeks.org/reverse-a-stack-using-recursion/)

You are given a stack of integers. Your task is to **reverse the stack using recursion only**.

**Constraints**:
- You can only use recursion (no loops allowed!)
- You can use standard stack operations: `push()`, `pop()`, `peek()`, `isEmpty()`
- No extra data structures allowed (except the recursion call stack)
- Your solution must modify the input stack **in-place**

**What does "reverse" mean?**
- Bottom element becomes top element
- Top element becomes bottom element
- All elements flip their positions

---

### Examples:

**Example 1:**
```
Input: stack = [4, 1, 3, 2]
Output: [2, 3, 1, 4]

Visualization:
Before:        After:
  2 ← top       4 ← top
  3             1
  1             3
  4 ← bottom    2 ← bottom

Array representation:
[4, 1, 3, 2] → [2, 3, 1, 4]
 ↑        ↑     ↑        ↑
bottom   top   bottom   top
```

**Example 2:**
```
Input: stack = [10, 20, -5, 7, 15]
Output: [15, 7, -5, 20, 10]

Visualization:
Before:          After:
  15 ← top        10 ← top
   7               20
  -5              -5
  20               7
  10 ← bottom     15 ← bottom
```

**Example 3:**
```
Input: stack = [5]
Output: [5]
Explanation: Single element - already reversed
```

**Example 4:**
```
Input: stack = []
Output: []
Explanation: Empty stack is already reversed
```

---

## Intuition (Soch)

### The Challenge

How do you reverse a stack WITHOUT loops and WITHOUT extra arrays?

**Answer**: Use **TWO recursive functions** working together!

### The Key Insight

```
To reverse a stack:
  1. Remove the BOTTOM element (hold in recursion)
  2. Recursively reverse the remaining stack
  3. Insert the removed element at the TOP
```

**Why this works:**

Original: `[4, 1, 3, 2]` (4 at bottom, 2 at top)

Step 1: Remove bottom (4)
- Stack: `[1, 3, 2]`
- Held: 4

Step 2: Reverse `[1, 3, 2]` recursively
- This continues until we reverse to: `[2, 3, 1]`

Step 3: Insert 4 at top
- Stack: `[2, 3, 1, 4]` ✓
- Now 4 is at top (was at bottom!)

### Visual Pattern

```
Original Stack:
  2 ← top      }
  3            } These need to move down
  1            }
  4 ← bottom   } This needs to move to top

After Reverse:
  4 ← top      ← Was at bottom!
  1            ← Was in middle
  3            ← Was in middle
  2 ← bottom   ← Was at top!

Complete flip!
```

---

## Approach: Two Recursive Functions

### Function 1: `reverseStack(stack)`

**Purpose**: Reverse the entire stack

**Algorithm**:
```
reverseStack(stack):
    // BASE CASE: Empty stack is already reversed
    if stack is empty:
        return

    // RECURSIVE CASE:
    // 1. Remove top element (hold in recursion stack)
    top = stack.pop()

    // 2. Recursively reverse the remaining stack
    reverseStack(stack)  // Now stack is reversed!

    // 3. Insert top element at the BOTTOM of reversed stack
    insertAtBottom(stack, top)
```

**Time Complexity**: O(n²)
- Reversing n elements: T(n) = T(n-1) + O(n)
- Inserting at bottom: O(n) each time
- Total: O(n²)

**Space Complexity**: O(n)
- Recursion depth: O(n)

---

### Function 2: `insertAtBottom(stack, element)`

**Purpose**: Insert an element at the BOTTOM of the stack

**Algorithm**:
```
insertAtBottom(stack, element):
    // BASE CASE: Stack is empty
    if stack is empty:
        stack.push(element)
        return

    // RECURSIVE CASE: Stack has elements
    // We need to temporarily remove all elements above bottom
    // 1. Remove top element
    top = stack.pop()

    // 2. Insert element at bottom of remaining stack
    insertAtBottom(stack, element)

    // 3. Put the top back
    stack.push(top)
```

**Time Complexity**: O(n)
- Worst case: traverse entire stack to reach bottom

**Space Complexity**: O(n)
- Recursion depth

---

## Complete Dry Run

**Input**: `stack = [4, 1, 3, 2]`

**Array Convention**:
```
[4, 1, 3, 2]
 ↑        ↑
bottom   top

Stack visualization:
  2 ← top (last element, index 3)
  3
  1
  4 ← bottom (first element, index 0)
```

### Phase 1: Recursive Expansion (Removing elements)

```
┌──────────────────────────────────────────────────────────┐
│ CALL 1: reverseStack([4, 1, 3, 2])                      │
├──────────────────────────────────────────────────────────┤
│ Not empty                                                │
│ pop() → removes 2 (top)                                  │
│ Stack: [4, 1, 3]                                        │
│ Held: 2                                                  │
│ Recursive call: reverseStack([4, 1, 3])                │
│                                                          │
│   ┌────────────────────────────────────────────────────┐ │
│   │ CALL 2: reverseStack([4, 1, 3])                   │ │
│   ├────────────────────────────────────────────────────┤ │
│   │ Not empty                                          │ │
│   │ pop() → removes 3                                  │ │
│   │ Stack: [4, 1]                                     │ │
│   │ Held: 3                                            │ │
│   │ Recursive call: reverseStack([4, 1])             │ │
│   │                                                    │ │
│   │   ┌──────────────────────────────────────────────┐ │ │
│   │   │ CALL 3: reverseStack([4, 1])                │ │ │
│   │   ├──────────────────────────────────────────────┤ │ │
│   │   │ Not empty                                    │ │ │
│   │   │ pop() → removes 1                            │ │ │
│   │   │ Stack: [4]                                  │ │ │
│   │   │ Held: 1                                      │ │ │
│   │   │ Recursive call: reverseStack([4])          │ │ │
│   │   │                                              │ │ │
│   │   │   ┌────────────────────────────────────────┐ │ │ │
│   │   │   │ CALL 4: reverseStack([4])             │ │ │ │
│   │   │   ├────────────────────────────────────────┤ │ │ │
│   │   │   │ Not empty                              │ │ │ │
│   │   │   │ pop() → removes 4                      │ │ │ │
│   │   │   │ Stack: []                             │ │ │ │
│   │   │   │ Held: 4                                │ │ │ │
│   │   │   │ Recursive call: reverseStack([])     │ │ │ │
│   │   │   │                                        │ │ │ │
│   │   │   │   ┌──────────────────────────────────┐ │ │ │ │
│   │   │   │   │ CALL 5: reverseStack([])        │ │ │ │ │
│   │   │   │   ├──────────────────────────────────┤ │ │ │ │
│   │   │   │   │ Empty stack!                     │ │ │ │ │
│   │   │   │   │ BASE CASE: Return                │ │ │ │ │
│   │   │   │   └──────────────────────────────────┘ │ │ │ │
```

### Phase 2: Unwinding (Inserting at bottom)

```
│   │   │   │   │                                  │ │ │ │
│   │   │   │   Back in CALL 4:                    │ │ │ │
│   │   │   │   Stack after reverse: []            │ │ │ │
│   │   │   │   insertAtBottom([], 4)             │ │ │ │
│   │   │   │     Empty → push(4)                  │ │ │ │
│   │   │   │     Stack: [4]                       │ │ │ │
│   │   │   │            ↑                          │ │ │ │
│   │   │   │        bottom/top                     │ │ │ │
│   │   │   │   Return                              │ │ │ │
│   │   │   └────────────────────────────────────────┘ │ │ │
│   │   │                                              │ │ │
│   │   │   Back in CALL 3:                            │ │ │
│   │   │   Stack after reverse: [4]                   │ │ │
│   │   │   insertAtBottom([4], 1)                    │ │ │
│   │   │     Not empty                                │ │ │
│   │   │     pop() → removes 4 → Stack: []           │ │ │
│   │   │     insertAtBottom([], 1)                   │ │ │
│   │   │       Empty → push(1)                        │ │ │
│   │   │       Stack: [1]                             │ │ │
│   │   │     push(4) back                             │ │ │
│   │   │     Stack: [1, 4]                            │ │ │
│   │   │            ↑   ↑                              │ │ │
│   │   │        bottom top                             │ │ │
│   │   │   Return                                      │ │ │
│   │   └──────────────────────────────────────────────┘ │ │
│   │                                                    │ │
│   │   Back in CALL 2:                                  │ │
│   │   Stack after reverse: [1, 4]                      │ │
│   │   insertAtBottom([1, 4], 3)                       │ │
│   │     Not empty                                      │ │
│   │     pop() → removes 4 → Stack: [1]                │ │
│   │     insertAtBottom([1], 3)                        │ │
│   │       Not empty                                    │ │
│   │       pop() → removes 1 → Stack: []               │ │
│   │       insertAtBottom([], 3)                       │ │
│   │         Empty → push(3)                            │ │
│   │         Stack: [3]                                 │ │
│   │       push(1) back                                 │ │
│   │       Stack: [3, 1]                                │ │
│   │     push(4) back                                   │ │
│   │     Stack: [3, 1, 4]                               │ │
│   │            ↑      ↑                                 │ │
│   │        bottom   top                                 │ │
│   │   Return                                            │ │
│   └────────────────────────────────────────────────────┘ │
│                                                          │
│   Back in CALL 1:                                        │
│   Stack after reverse: [3, 1, 4]                         │
│   insertAtBottom([3, 1, 4], 2)                          │
│     Not empty                                            │
│     pop() → removes 4 → Stack: [3, 1]                   │
│     insertAtBottom([3, 1], 2)                           │
│       Not empty                                          │
│       pop() → removes 1 → Stack: [3]                    │
│       insertAtBottom([3], 2)                            │
│         Not empty                                        │
│         pop() → removes 3 → Stack: []                   │
│         insertAtBottom([], 2)                           │
│           Empty → push(2)                                │
│           Stack: [2]                                     │
│         push(3) back                                     │
│         Stack: [2, 3]                                    │
│       push(1) back                                       │
│       Stack: [2, 3, 1]                                   │
│     push(4) back                                         │
│     Stack: [2, 3, 1, 4]                                  │
│            ↑         ↑                                    │
│        bottom      top                                    │
│   Return                                                  │
└──────────────────────────────────────────────────────────┘
```

### Final Result

```
Original: [4, 1, 3, 2]
          ↑        ↑
       bottom    top

Reversed: [2, 3, 1, 4]
          ↑        ↑
       bottom    top

Visualization:
Before:       After:
  2 ← top      4 ← top   (was at bottom)
  3            1
  1            3
  4 ← bottom   2 ← bottom (was at top)

Completely reversed! ✓
```

---

## Detailed Example: insertAtBottom()

**Insert 2 at bottom of [3, 1, 4]:**

```
Initial:
  Stack: [3, 1, 4]
          ↑     ↑
       bottom  top
  Element: 2

Step 1: Not empty, so pop top
  pop() → removes 4
  Stack: [3, 1]
  Held: 4
  Recursive call: insertAtBottom([3, 1], 2)

    Step 2: Not empty, so pop top
      pop() → removes 1
      Stack: [3]
      Held: 1
      Recursive call: insertAtBottom([3], 2)

        Step 3: Not empty, so pop top
          pop() → removes 3
          Stack: []
          Held: 3
          Recursive call: insertAtBottom([], 2)

            Step 4: BASE CASE - Empty!
              push(2)
              Stack: [2]
              Return

          Step 3 return: push(3) back
            Stack: [2, 3]
            Return

      Step 2 return: push(1) back
        Stack: [2, 3, 1]
        Return

  Step 1 return: push(4) back
    Stack: [2, 3, 1, 4]
    Return

Final: [2, 3, 1, 4]
       ↑         ↑
    bottom     top

Element 2 is now at the bottom! ✓
```

---

## Time & Space Complexity

**Time Complexity: O(n²)**
- `reverseStack()`: Called n times (once for each element)
- `insertAtBottom()`: O(n) for each call
- Total: O(n) × O(n) = O(n²)

**Detailed breakdown:**
```
For stack of size n:
  Call 1: insertAtBottom takes n steps
  Call 2: insertAtBottom takes n-1 steps
  Call 3: insertAtBottom takes n-2 steps
  ...
  Call n: insertAtBottom takes 1 step

Total: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)
```

**Space Complexity: O(n)**
- Recursion depth: O(n)
- `reverseStack()` goes n levels deep
- Each level holds one element

---

## Edge Cases

### 1. Empty Stack
```
Input: []
Output: []
Explanation: Empty stack is already reversed (base case)
```

### 2. Single Element
```
Input: [5]
Output: [5]
Explanation: Single element stack is already reversed
```

### 3. Two Elements
```
Input: [1, 2]
       ↑   ↑
    bottom top

Output: [2, 1]
        ↑   ↑
     bottom top

Verification: Bottom and top swapped ✓
```

### 4. All Same Elements
```
Input: [7, 7, 7, 7]
Output: [7, 7, 7, 7]
Explanation: Order doesn't matter, but algorithm still works
```

### 5. Negative Numbers
```
Input: [-5, 10, -3, 2]
Output: [2, -3, 10, -5]
Explanation: Algorithm works with any integers
```

---

## Comparison: Reverse Stack vs Sort Stack

| Aspect | Reverse Stack | Sort Stack |
|--------|---------------|------------|
| **Goal** | Flip order completely | Sort in ascending order |
| **Helper Function** | `insertAtBottom()` | `insertSorted()` |
| **Pattern** | Always insert at bottom | Insert at correct position |
| **Complexity** | O(n²) | O(n²) |
| **Base Case** | Empty stack | Empty stack |
| **Difficulty** | Medium | Medium |
| **Similarity** | Both use combiner pattern with 2 functions |

**Key Difference:**
```
Reverse Stack:
  - Insert removed element at BOTTOM
  - Simple: always goes to bottom
  - No comparison needed

Sort Stack:
  - Insert removed element at CORRECT POSITION
  - Complex: needs comparison with existing elements
  - Maintains sorted order
```

---

## Why This is a Medium Problem

**Challenges**:
1. **Two recursive functions**: `reverseStack()` and `insertAtBottom()`
2. **Combiner pattern**: Work happens during unwinding
3. **Nested recursion**: Both functions call recursively
4. **Abstract thinking**: Must visualize recursion stack behavior
5. **In-place modification**: Can't use extra data structures

**Key Skills Tested**:
- Deep recursion understanding
- Call stack visualization
- Helper function design
- Backtracking concepts

---

## Common Mistakes to Avoid

❌ **Using loops** - Problem requires recursion only
❌ **Using extra arrays** - Only recursion stack allowed
❌ **Confusing insertAtBottom with push** - They're different!
❌ **Not handling empty stack** - Base case is crucial
❌ **Forgetting to push back** - After recursive insert, must restore elements

✅ **Two recursive functions** - Main + helper
✅ **Clear base cases** - Empty stack
✅ **Proper unwinding** - Work during return phase
✅ **Consistent convention** - Know where top/bottom is

---

## Interview Tips

**What to say to interviewer:**

*"This is similar to sorting a stack with recursion. The key insight is to use TWO recursive functions: one to reverse the stack by removing elements, and a helper to insert each element at the bottom. The algorithm removes all elements using the call stack as temporary storage, then inserts them back at the bottom one by one, effectively reversing the order."*

**Follow-up Questions:**

**Q: Can you do this iteratively?**
A: Yes, but it would require an extra stack to hold elements temporarily. The recursive solution is more elegant as it uses the call stack implicitly.

**Q: What if the stack is very large?**
A: Risk of stack overflow with deep recursion (O(n) depth). In production, might use iterative approach with explicit auxiliary stack or increase stack size limits.

**Q: How is this different from sorting a stack?**
A: Reverse always inserts at bottom (simpler), while sort inserts at correct position based on comparison (more complex). Both are O(n²) but reverse is conceptually easier.

**Q: Can you optimize the time complexity?**
A: Not with this approach. The O(n²) comes from inserting at bottom n times. Any reversal requires touching all n elements, and insertion at bottom requires O(n) operations.

---

## Connection to Divide & Conquer

This problem demonstrates the **Combiner Pattern**:
- **Divide**: Remove top element
- **Conquer**: Reverse remaining stack (recursive call)
- **Combine**: Insert element at bottom ← Work happens here!

The beauty is that the recursion call stack holds all elements while we work on smaller subproblems!

---

Ready to see the implementation? 🤔
