# Reverse Linked List - Recursion Approach

## The Big Picture

Reversing a linked list recursively is one of the **best examples** to understand how recursion actually works, especially the **unwinding phase** where the magic happens!

**The Key Insight:**
- We go all the way to the **last node** (base case)
- Then we **come back**, flipping arrows one by one
- Each function call is responsible for **flipping just one arrow**

---

## The Algorithm

```typescript
function reverseList(head: ListNode | null): ListNode | null {
  // BASE CASE 1: Empty list
  if (head === null) {
    return null;
  }

  // BASE CASE 2: Single node (last node reached)
  if (head.next === null) {
    return head; // This becomes the new head
  }

  // RECURSIVE STEP 1: Reverse the rest of the list
  const newHead = reverseList(head.next);

  // RECURSIVE STEP 2: Flip the arrow (pointer reversal)
  head.next.next = head;  // Make next node point back to current
  head.next = null;       // Break forward connection

  // RECURSIVE STEP 3: Return the new head
  return newHead;
}
```

---

## Understanding the Steps

### Base Cases

**Base Case 1: Empty List**
```typescript
if (head === null) return null;
```
- If the list is empty, nothing to reverse
- Return null

**Base Case 2: Last Node (Single Node)**
```typescript
if (head.next === null) return head;
```
- When we reach the last node, it becomes the **new head** of reversed list
- This is the deepest point of recursion
- This is where unwinding starts!

### Recursive Step

**Step 1: Trust the Recursion**
```typescript
const newHead = reverseList(head.next);
```
- "I will reverse the rest of the list"
- Trust that `reverseList(head.next)` will correctly reverse everything after current node
- This keeps calling until base case is hit

**Step 2: Flip the Arrow**
```typescript
head.next.next = head;  // Make the next node point back to me
head.next = null;       // Break my forward connection
```
- `head.next.next = head`: The next node now points to current node (reverse!)
- `head.next = null`: Current node points to null (prevent cycle)

**Step 3: Return New Head**
```typescript
return newHead;
```
- The `newHead` doesn't change - it's always the last node
- We pass it back up through all recursive calls

---

## Complete Dry Run

Let's reverse: **1 → 2 → 3 → null**

### Phase 1: Going Down (Building Call Stack)

```
Initial List: 1 → 2 → 3 → null

┌─────────────────────────────────────────────────────────────┐
│ Call 1: reverseList(1)                                       │
│ - head = 1                                                   │
│ - head.next = 2 (not null)                                   │
│ - Makes recursive call: reverseList(2)                       │
│ - STATUS: WAITING for reverseList(2) to return              │
└─────────────────────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────────────────────┐
│ Call 2: reverseList(2)                                       │
│ - head = 2                                                   │
│ - head.next = 3 (not null)                                   │
│ - Makes recursive call: reverseList(3)                       │
│ - STATUS: WAITING for reverseList(3) to return              │
└─────────────────────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────────────────────┐
│ Call 3: reverseList(3)                                       │
│ - head = 3                                                   │
│ - head.next = null ✅ BASE CASE!                             │
│ - Returns: 3 (this is the new head!)                         │
│ - STATUS: RETURNS 3                                          │
└─────────────────────────────────────────────────────────────┘
```

### Call Stack at Maximum Depth

```
┌──────────────────────┐
│ reverseList(3)       │ ← Active (base case hit!)
│ head = 3             │
│ head.next = null     │
│ RETURNS: 3           │
├──────────────────────┤
│ reverseList(2)       │ ← Waiting
│ head = 2             │
│ head.next = 3        │
│ WAITING for newHead  │
├──────────────────────┤
│ reverseList(1)       │ ← Waiting (original call)
│ head = 1             │
│ head.next = 2        │
│ WAITING for newHead  │
└──────────────────────┘
```

### Phase 2: Coming Back Up (Unwinding - THE MAGIC!)

#### Unwinding Step 1: Call 2 Resumes (Processing Node 2)

```
┌──────────────────────────────────────────────────────────────────┐
│ Call 2 RESUMES: reverseList(2)                                   │
│                                                                   │
│ Current state:                                                   │
│   head = 2                                                       │
│   head.next = 3                                                  │
│   newHead = 3 (received from Call 3)                             │
│                                                                   │
│ List state:                                                      │
│   1 → 2 → 3 → null                                               │
│         ↑                                                        │
│       (we are here)                                              │
│                                                                   │
│ Now execute: head.next.next = head                               │
│   → 3.next = 2                                                   │
│                                                                   │
│ List becomes:                                                    │
│   1 → 2 ⇄ 3 → null   (bidirectional temporarily!)               │
│                                                                   │
│ Now execute: head.next = null                                    │
│   → 2.next = null                                                │
│                                                                   │
│ List becomes:                                                    │
│   1 → 2    3 → 2 → null                                          │
│                                                                   │
│ Visual:                                                          │
│   ┌───┬────┐   ┌───┬────┐                                        │
│   │ 1 │ ●──┼──→│ 2 │null│                                        │
│   └───┴────┘   └───┴────┘                                        │
│                     ↑                                            │
│                ┌───┬┴───┐                                         │
│                │ 3 │ ●──┤                                         │
│                └───┴────┘                                         │
│                                                                   │
│ Return: newHead = 3                                              │
└──────────────────────────────────────────────────────────────────┘
```

**What happened:**
1. ✅ Flipped arrow: 3 now points to 2
2. ✅ Broke connection: 2 now points to null (end of reversed list)
3. ✅ Returned: newHead = 3 (new head stays same)

#### Unwinding Step 2: Call 1 Resumes (Processing Node 1)

```
┌──────────────────────────────────────────────────────────────────┐
│ Call 1 RESUMES: reverseList(1)                                   │
│                                                                   │
│ Current state:                                                   │
│   head = 1                                                       │
│   head.next = 2                                                  │
│   newHead = 3 (received from Call 2)                             │
│                                                                   │
│ List state:                                                      │
│   1 → 2    3 → 2 → null                                          │
│   ↑                                                              │
│  (we are here)                                                   │
│                                                                   │
│ Now execute: head.next.next = head                               │
│   → 2.next = 1                                                   │
│                                                                   │
│ List becomes:                                                    │
│   1 ⇄ 2    3 → 2 (bidirectional temporarily!)                    │
│                                                                   │
│ Now execute: head.next = null                                    │
│   → 1.next = null                                                │
│                                                                   │
│ Final List:                                                      │
│   3 → 2 → 1 → null   ✅ REVERSED!                                │
│                                                                   │
│ Visual:                                                          │
│   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐                          │
│   │ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│                          │
│   └───┴────┘   └───┴────┘   └───┴────┘                          │
│      ↑                                                           │
│   newHead                                                        │
│                                                                   │
│ Return: newHead = 3                                              │
└──────────────────────────────────────────────────────────────────┘
```

**What happened:**
1. ✅ Flipped arrow: 2 now points to 1
2. ✅ Broke connection: 1 now points to null (end of reversed list)
3. ✅ Returned: newHead = 3 (final answer!)

---

## Complete Iteration Table

| Call # | Function Call | head | head.next | Base Case? | Action | newHead (after recursive call) | After head.next.next = head | After head.next = null | Returns | Call Stack State |
|--------|---------------|------|-----------|------------|--------|-------------------------------|----------------------------|------------------------|---------|------------------|
| 1 | reverseList(1) | 1 | 2 | No | Call reverseList(2) | pending | pending | pending | pending | [1] |
| 2 | reverseList(2) | 2 | 3 | No | Call reverseList(3) | pending | pending | pending | pending | [1, 2] |
| 3 | reverseList(3) | 3 | null | **Yes** | Return 3 | 3 | - | - | **3** | [1, 2, 3] → [1, 2] |
| 4 | Call 2 resumes | 2 | 3 | - | Process node 2 | 3 | 3→2 (and 2→3) | 3→2→null | **3** | [1, 2] → [1] |
| 5 | Call 1 resumes | 1 | 2 | - | Process node 1 | 3 | 3→2→1 (and 1→2) | 3→2→1→null | **3** | [1] → [] |

---

## Visualization: The Complete Journey

### Original List
```
┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │null│
└───┴────┘   └───┴────┘   └───┴────┘
   ↑
 head
```

### Call Stack Growth (Going Down)
```
reverseList(1) → calls reverseList(2)
                 ↓
            reverseList(2) → calls reverseList(3)
                             ↓
                        reverseList(3) → BASE CASE! Returns 3
```

### Call Stack Shrinking (Coming Up - Flipping Arrows!)

**After Call 3 returns (base case):**
```
Node 3 is now the newHead
┌───┬────┐
│ 3 │null│
└───┴────┘
   ↑
newHead = 3
```

**Call 2 resumes - Flip arrow between 2 and 3:**
```
Before:  2 → 3
After:   2 ← 3
         ↓
        null

┌───┬────┐   ┌───┬────┐
│ 2 │null│ ←─┤ 3 │ ●  │
└───┴────┘   └───┴────┘
                  ↑
               newHead = 3
```

**Call 1 resumes - Flip arrow between 1 and 2:**
```
Before:  1 → 2 ← 3
After:   1 ← 2 ← 3
         ↓
        null

┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │null│ ←─┤ 2 │ ●  │ ←─┤ 3 │ ●  │
└───┴────┘   └───┴────┘   └───┴────┘
                              ↑
                           newHead = 3
```

### Final Result
```
┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
└───┴────┘   └───┴────┘   └───┴────┘
   ↑
newHead (returned)

Original: 1 → 2 → 3 → null
Reversed: 3 → 2 → 1 → null ✅
```

---

## Memory State at Each Moment

### Moment 1: Call Stack Peak (Base Case Hit)
```
STACK (Top → Bottom):
┌─────────────────────────┐
│ reverseList(3)          │ ← About to return 3
│ LOCAL: head = 3         │
│        head.next = null │
│ RETURN: 3               │
├─────────────────────────┤
│ reverseList(2)          │ ← Paused
│ LOCAL: head = 2         │
│        head.next = 3    │
│ WAITING FOR: newHead    │
├─────────────────────────┤
│ reverseList(1)          │ ← Paused (original)
│ LOCAL: head = 1         │
│        head.next = 2    │
│ WAITING FOR: newHead    │
└─────────────────────────┘

List State: 1 → 2 → 3 → null (unchanged)
```

### Moment 2: Call 2 Processing (Unwinding Starts)
```
STACK:
┌─────────────────────────┐
│ reverseList(2)          │ ← Active now!
│ LOCAL: head = 2         │
│        head.next = 3    │
│        newHead = 3      │ ← Got this from Call 3
│ ACTION: Flipping arrow  │
├─────────────────────────┤
│ reverseList(1)          │ ← Still waiting
│ LOCAL: head = 1         │
│        head.next = 2    │
│ WAITING FOR: newHead    │
└─────────────────────────┘

List State:
Before flip: 1 → 2 → 3 → null
After flip:  1 → 2    3 → 2 → null
```

### Moment 3: Call 1 Processing (Final Flip)
```
STACK:
┌─────────────────────────┐
│ reverseList(1)          │ ← Active now!
│ LOCAL: head = 1         │
│        head.next = 2    │
│        newHead = 3      │ ← Got this from Call 2
│ ACTION: Flipping arrow  │
└─────────────────────────┘

List State:
Before flip: 1 → 2    3 → 2 → null
After flip:  3 → 2 → 1 → null ✅
```

### Moment 4: Done!
```
STACK: (empty)

Final Result: 3 → 2 → 1 → null
Return: 3 (new head)
```

---

## The Critical Insight: Why `head.next.next = head` Works

This is the **trickiest line** to understand:

```typescript
head.next.next = head;
```

### Breaking it Down

**When Call 2 resumes (head = 2):**

```
Current state:
  head = 2
  head.next = 3
  newHead = 3 (returned from recursive call)

List: 1 → 2 → 3 → null
           ↑
         (we are here)

What is head.next.next?
  head.next = 3
  head.next.next = 3.next = null currently

What does head.next.next = head do?
  3.next = 2

Now the list is:
  1 → 2 ⇄ 3  (bidirectional)

But we don't want bidirectional, so:
  head.next = null
  2.next = null

Final:
  1 → 2    3 → 2 → null

The arrow between 2 and 3 is now FLIPPED! ✅
```

### Why We Need `head.next = null`

Without this line, we'd have a **cycle**:

```
❌ Without head.next = null:
   1 → 2 ⇄ 3  (infinite loop!)

✅ With head.next = null:
   1 → 2    3 → 2 → null (clean break)
```

---

## Key Takeaways

### 1. **The Base Case is the New Head**
- The last node (where `next === null`) becomes the new head
- This never changes as we unwind

### 2. **Unwinding Does the Work**
- Going down: just make recursive calls (no actual work)
- Coming up: flip each arrow one by one

### 3. **Each Call Flips ONE Arrow**
- Call processing node 2: flips arrow between 2 and 3
- Call processing node 1: flips arrow between 1 and 2

### 4. **`newHead` is Passed Up Unchanged**
- Once the base case returns the new head (last node)
- Every recursive call just passes it back up
- The original caller gets it as the final answer

### 5. **Trust the Recursion**
- Don't try to trace every call in your head
- Trust that `reverseList(head.next)` reverses the rest
- Focus on: "How do I attach my node to that reversed list?"
- Answer: Flip the arrow with `head.next.next = head`

---

## Why This is Hard to Understand

**The Confusion:**
- We see `reverseList(head.next)` and think "okay, rest is reversed"
- But then we see `head.next.next = head` and think "wait, isn't `head.next` part of the reversed list now?"
- **The trick:** Yes it is! And that's exactly why we can use it to point back to us!

**The Aha Moment:**
When `reverseList(head.next)` returns:
- Everything from `head.next` onwards is **already reversed**
- But `head.next` still **points to the same node** it did before
- So we can use `head.next` to access that node and make it point back to us!

**Example:**
```
Before recursive call:  1 → 2 → 3 → null
After recursive call:   1 → 2    3 → 2 → null
                             ↑
                        head.next still points to node 2!

So head.next.next = head means:
   "Node 2, point back to me (node 1)"
```

---

## Complexity Analysis

### Time Complexity: O(n)
- Visit each node exactly once
- Each visit does O(1) work (flip one arrow)
- Total: O(n)

### Space Complexity: O(n)
- Recursive call stack goes n levels deep
- Each frame stores constant space (head, newHead)
- Total: O(n) for call stack

**Note:** The iterative three-pointer approach has O(1) space, making it more space-efficient. But the recursive approach is more elegant and helps understand recursion!

---

## Common Mistakes

### Mistake 1: Forgetting `head.next = null`
```typescript
// ❌ WRONG
head.next.next = head;
// Missing: head.next = null
return newHead;

// This creates a cycle!
```

### Mistake 2: Returning `head` Instead of `newHead`
```typescript
// ❌ WRONG
const newHead = reverseList(head.next);
head.next.next = head;
head.next = null;
return head;  // Wrong! This returns the old head

// ✅ CORRECT
return newHead;  // Return the new head from base case
```

### Mistake 3: Not Handling Base Cases
```typescript
// ❌ WRONG - Missing null check
function reverseList(head: ListNode | null): ListNode | null {
  if (head.next === null) return head;  // Crashes if head is null!
  ...
}

// ✅ CORRECT
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;  // Handle empty list first
  if (head.next === null) return head;
  ...
}
```

---

## Practice Exercise

Try tracing this yourself with: **1 → 2 → 3 → 4 → null**

Draw the call stack at each step and show:
1. What gets pushed onto the stack
2. When the base case is hit
3. How each call flips one arrow during unwinding
4. What `newHead` is at each level

If you can do this, you've mastered recursion! 🎉

---

## Summary

**The Mental Model:**
1. 🏃 Run to the end of the list (base case = last node)
2. 🔄 Come back, flipping arrows as you go
3. 🎯 The last node becomes the new head (never changes)
4. ⬆️ Each call flips one arrow and passes the new head up

**The Code Pattern:**
```typescript
// 1. Base case: return the new head
if (head.next === null) return head;

// 2. Recurse: trust it works
const newHead = reverseList(head.next);

// 3. Fix current level: flip the arrow
head.next.next = head;
head.next = null;

// 4. Pass up the new head
return newHead;
```

**Remember:** The magic happens during **unwinding**, not during the recursive calls!
