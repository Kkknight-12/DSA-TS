# Sort a Stack using Recursion

**Difficulty**: Medium
**Topics**: Stack, Recursion, Backtracking
**Source**: GeeksforGeeks

---

## Problem Statement

[sort-stack](https://www.geeksforgeeks.org/dsa/sort-a-stack-using-recursion/)

Given a stack of integers `st[]`, sort the stack in **ascending order** using **recursion only**.

**Ascending order**: Smallest element at the **bottom**, largest element at the **top**.

**Constraints**:
- You can only use recursion (no loops allowed!)
- You can use standard stack operations: `push()`, `pop()`, `peek()`, `isEmpty()`
- No extra data structures allowed (except the recursion call stack)

---

### Examples:

**Example 1:**
```
Input: st[] = [1, 2, 3]
Output: [3, 2, 1]

Visualization:
Before:     After:
  3           1  ← bottom (smallest)
  2           2
  1  ← top    3  ← top (largest)
```

**Example 2:**
```
Input: st[] = [41, 3, 32, 2, 11]
Output: [41, 32, 11, 3, 2]

Visualization:
Before:      After:
  11           2  ← bottom (smallest)
  2            3
  32          11
  3           32
  41 ← top    41 ← top (largest)
```

**Example 3:**
```
Input: st[] = [5]
Output: [5]
Explanation: Single element is already sorted
```

**Example 4:**
```
Input: st[] = []
Output: []
Explanation: Empty stack is already sorted
```

---

## Intuition (Soch)

### The Challenge

How do you sort WITHOUT loops and WITHOUT extra arrays?

**Answer**: Use the **recursion call stack** itself as temporary storage!

### The Key Insight

```
To sort a stack:
  1. Remove the top element
  2. Sort the remaining stack (recursive call)
  3. Insert the removed element back in the correct position
```

**Visual Example**: Sort [41, 3, 32, 2, 11]

```
Step 1: Pop 11
  Stack: [41, 3, 32, 2]
  Held in recursion: 11

Step 2: Pop 2
  Stack: [41, 3, 32]
  Held in recursion: 11, 2

Step 3: Pop 32
  Stack: [41, 3]
  Held in recursion: 11, 2, 32

Step 4: Pop 3
  Stack: [41]
  Held in recursion: 11, 2, 32, 3

Step 5: Pop 41
  Stack: []
  Held in recursion: 11, 2, 32, 3, 41

BASE CASE: Empty stack is sorted!

Now UNWIND and insert each element back in sorted position:

Insert 41 into []:
  Stack: [41]

Insert 3 into [41]:
  3 < 41 → goes to bottom
  Stack: [41, 3]  (41 at top)

Insert 32 into [41, 3]:
  32 < 41 → continue
  32 > 3 → found position
  Stack: [41, 32, 3]

Insert 2 into [41, 32, 3]:
  2 < 41 → continue
  2 < 32 → continue
  2 < 3 → goes to bottom
  Stack: [41, 32, 3, 2]

Insert 11 into [41, 32, 3, 2]:
  11 < 41 → continue
  11 < 32 → continue
  11 > 3 → found position
  Stack: [41, 32, 11, 3, 2]

DONE! ✓
```

---

## Approach: Two Recursive Functions

### Function 1: `sortStack(stack)`

**Purpose**: Sort the entire stack

**Algorithm**:
```
sortStack(stack):
    // BASE CASE: Empty or single element is already sorted
    if stack is empty:
        return

    // RECURSIVE CASE:
    // 1. Remove top element (hold in recursion stack)
    top = stack.pop()

    // 2. Recursively sort the remaining stack
    sortStack(stack)  // Now stack is sorted!

    // 3. Insert top element back in correct position
    insertSorted(stack, top)
```

**Time Complexity**: O(n²)
- Sorting n elements: T(n) = T(n-1) + O(n)
- Inserting each element: O(n) in worst case
- Total: O(n²)

**Space Complexity**: O(n)
- Recursion depth: O(n)
- Each level holds one element

---

### Function 2: `insertSorted(stack, element)`

**Purpose**: Insert element into an already-sorted stack in the correct position

**Algorithm**:
```
insertSorted(stack, element):
    // BASE CASE 1: Stack is empty
    if stack is empty:
        stack.push(element)
        return

    // BASE CASE 2: Element is larger than top (belongs on top)
    if element >= stack.peek():
        stack.push(element)
        return

    // RECURSIVE CASE: Element is smaller than top
    // 1. Remove top element (it's larger, should stay above)
    top = stack.pop()

    // 2. Insert element into remaining stack
    insertSorted(stack, element)

    // 3. Put the top back
    stack.push(top)
```

**Time Complexity**: O(n)
- In worst case, traverse entire stack

**Space Complexity**: O(n)
- Recursion depth in worst case

---

## Complete Dry Run

**Input**: `st = [41, 3, 32, 2, 11]`

### Phase 1: Recursive Calls (Expansion)

```
┌──────────────────────────────────────────────────────────┐
│ CALL 1: sortStack([41, 3, 32, 2, 11])                   │
├──────────────────────────────────────────────────────────┤
│ Not empty → Pop 11                                       │
│ Stack: [41, 3, 32, 2]                                   │
│ Held: 11                                                 │
│ Recursive call: sortStack([41, 3, 32, 2])              │
│                                                          │
│   ┌────────────────────────────────────────────────────┐ │
│   │ CALL 2: sortStack([41, 3, 32, 2])                 │ │
│   ├────────────────────────────────────────────────────┤ │
│   │ Not empty → Pop 2                                  │ │
│   │ Stack: [41, 3, 32]                                │ │
│   │ Held: 2                                            │ │
│   │ Recursive call: sortStack([41, 3, 32])           │ │
│   │                                                    │ │
│   │   ┌──────────────────────────────────────────────┐ │ │
│   │   │ CALL 3: sortStack([41, 3, 32])              │ │ │
│   │   ├──────────────────────────────────────────────┤ │ │
│   │   │ Not empty → Pop 32                           │ │ │
│   │   │ Stack: [41, 3]                              │ │ │
│   │   │ Held: 32                                     │ │ │
│   │   │ Recursive call: sortStack([41, 3])         │ │ │
│   │   │                                              │ │ │
│   │   │   ┌────────────────────────────────────────┐ │ │ │
│   │   │   │ CALL 4: sortStack([41, 3])            │ │ │ │
│   │   │   ├────────────────────────────────────────┤ │ │ │
│   │   │   │ Not empty → Pop 3                      │ │ │ │
│   │   │   │ Stack: [41]                           │ │ │ │
│   │   │   │ Held: 3                                │ │ │ │
│   │   │   │ Recursive call: sortStack([41])       │ │ │ │
│   │   │   │                                        │ │ │ │
│   │   │   │   ┌──────────────────────────────────┐ │ │ │ │
│   │   │   │   │ CALL 5: sortStack([41])         │ │ │ │ │
│   │   │   │   ├──────────────────────────────────┤ │ │ │ │
│   │   │   │   │ Not empty → Pop 41               │ │ │ │ │
│   │   │   │   │ Stack: []                       │ │ │ │ │
│   │   │   │   │ Held: 41                         │ │ │ │ │
│   │   │   │   │ Recursive call: sortStack([])   │ │ │ │ │
│   │   │   │   │                                  │ │ │ │ │
│   │   │   │   │   ┌────────────────────────────┐ │ │ │ │ │
│   │   │   │   │   │ CALL 6: sortStack([])     │ │ │ │ │ │
│   │   │   │   │   ├────────────────────────────┤ │ │ │ │ │
│   │   │   │   │   │ Empty → BASE CASE!         │ │ │ │ │ │
│   │   │   │   │   │ Return immediately         │ │ │ │ │ │
│   │   │   │   │   └────────────────────────────┘ │ │ │ │ │
```

### Phase 2: Unwinding with Insertions

```
│   │   │   │   │                                  │ │ │ │ │
│   │   │   │   │ Back in CALL 5:                  │ │ │ │ │
│   │   │   │   │ insertSorted([], 41)            │ │ │ │ │
│   │   │   │   │   Stack empty → push 41          │ │ │ │ │
│   │   │   │   │   Result: [41]                   │ │ │ │ │
│   │   │   │   │ Return                           │ │ │ │ │
│   │   │   │   └──────────────────────────────────┘ │ │ │ │
│   │   │   │                                        │ │ │ │
│   │   │   │ Back in CALL 4:                        │ │ │ │
│   │   │   │ insertSorted([41], 3)                 │ │ │ │
│   │   │   │   3 < 41 → Need to go deeper          │ │ │ │
│   │   │   │   Pop 41, insert 3, push 41 back      │ │ │ │
│   │   │   │   Result: [41, 3]  (41 top, 3 bottom) │ │ │ │
│   │   │   │ Return                                 │ │ │ │
│   │   │   └────────────────────────────────────────┘ │ │ │
│   │   │                                              │ │ │
│   │   │ Back in CALL 3:                              │ │ │
│   │   │ insertSorted([41, 3], 32)                   │ │ │
│   │   │   32 < 41 → continue                         │ │ │
│   │   │   32 > 3 → found position                    │ │ │
│   │   │   Result: [41, 32, 3]                        │ │ │
│   │   │ Return                                        │ │ │
│   │   └──────────────────────────────────────────────┘ │ │
│   │                                                    │ │
│   │ Back in CALL 2:                                    │ │
│   │ insertSorted([41, 32, 3], 2)                      │ │
│   │   2 < 41 → continue                               │ │
│   │   2 < 32 → continue                               │ │
│   │   2 < 3 → goes to bottom                          │ │
│   │   Result: [41, 32, 3, 2]                          │ │
│   │ Return                                             │ │
│   └────────────────────────────────────────────────────┘ │
│                                                          │
│ Back in CALL 1:                                          │
│ insertSorted([41, 32, 3, 2], 11)                        │
│   11 < 41 → continue                                    │
│   11 < 32 → continue                                    │
│   11 > 3 → found position                               │
│   Result: [41, 32, 11, 3, 2]                            │
│ Return                                                   │
└──────────────────────────────────────────────────────────┘

Final Stack: [41, 32, 11, 3, 2]
Top to Bottom: 41 → 32 → 11 → 3 → 2 ✓
```

---

## Why This is a Medium Problem

**Challenges**:
1. **Two recursive functions**: Not just one simple recursion
2. **Combiner pattern**: Work happens during unwinding (harder to visualize)
3. **Nested recursion**: `sortStack` calls `insertSorted`, which is also recursive
4. **No intuitive base case**: Not obvious when to stop
5. **Space complexity**: Uses O(n) call stack space implicitly

**Key Skills Tested**:
- Understanding recursion deeply
- Call stack visualization
- Helper function design
- Backtracking concepts

---

## Edge Cases

### 1. Empty Stack
```
Input: []
Output: []
Explanation: Empty stack is already sorted
```

### 2. Single Element
```
Input: [5]
Output: [5]
Explanation: Single element is already sorted
```

### 3. Already Sorted (Ascending)
```
Input: [5, 4, 3, 2, 1]  (5 at top)
Output: [5, 4, 3, 2, 1]
Explanation: No changes needed
```

### 4. Already Sorted (Descending)
```
Input: [1, 2, 3, 4, 5]  (5 at top)
Output: [5, 4, 3, 2, 1]
Explanation: Complete reversal needed (worst case)
```

### 5. Duplicate Elements
```
Input: [3, 1, 3, 2, 1]
Output: [3, 3, 2, 1, 1]
Explanation: Duplicates should be kept together
```

---

## Common Mistakes to Avoid

❌ **Using loops** - Problem requires recursion only
❌ **Using extra arrays** - Only recursion stack allowed
❌ **Not handling empty stack** - Base case is crucial
❌ **Wrong insertion logic** - Must maintain sorted order
❌ **Forgetting to push back** - After recursive insert, must restore popped elements

✅ **Two recursive functions** - `sortStack` and `insertSorted`
✅ **Clear base cases** - Empty stack and element >= top
✅ **Proper unwinding** - Work happens after recursive calls
✅ **Handle duplicates** - Use >= not > for comparison

---

## Interview Tips

**What to say to interviewer:**

*"This is a classic recursion problem that uses the call stack as temporary storage. The key insight is to remove the top element, recursively sort the rest, then insert it back in the correct position. I'll need two recursive functions: one to sort the stack, and a helper to insert an element in sorted order."*

**Follow-up Questions:**

**Q: Can you do this iteratively?**
A: Yes, but it would require an extra stack for temporary storage. The recursive solution is more elegant as it uses the call stack implicitly.

**Q: What if the stack is very large?**
A: Risk of stack overflow with deep recursion. In production, might use iterative approach with explicit stack or use tail-call optimization if the language supports it.

**Q: What's the time complexity?**
A: O(n²) - for each of n elements, we might traverse the entire stack (n operations) during insertion.

**Q: Can you optimize it to O(n log n)?**
A: Not with this approach. O(n log n) would require merge sort or quicksort pattern, which needs different stack manipulation strategies.

---

## Connection to Divide & Conquer

This problem demonstrates the **Combiner Pattern**:
- **Divide**: Remove top element
- **Conquer**: Sort remaining stack
- **Combine**: Insert element back in sorted position ← Work here!

Unlike Merge Sort (which does minimal work during combine), this problem does O(n) work during the combine phase, making it O(n²) overall.

---

Which implementation would you like to see? 🤔
1. TypeScript solution with detailed comments
2. Visual step-by-step execution
3. Both!