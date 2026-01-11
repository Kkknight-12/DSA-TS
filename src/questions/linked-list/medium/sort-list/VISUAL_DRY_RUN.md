# Sort List - Visual Dry Run (Bottom-Up Merge Sort)

**Problem:** Sort a linked list in ascending order
**Approach:** Iterative Merge Sort (Bottom-Up)
**Input Example:** 4 → 2 → 1 → 3

---

## 🎯 Main Loop - Iterative Sort (Merge Sort)

**Initial Setup:**
```
Input:  4 → 2 → 1 → 3 → null
Goal:   1 → 2 → 3 → 4 → null
```

---

## Step 1: Calculate Length

```
Size = 1  (length ko linked list traverse karke nikalo)
```

**Loop:**
```
current → 4 → 2 → 1 → 3
count = 0

Iteration 1: count++  → count = 1
Iteration 2: count++  → count = 2
Iteration 3: count++  → count = 3
Iteration 4: count++  → count = 4

length = 4
```

---

## Step 2: Create Dummy Node

```
dummy → [0|o→] → [4|o→] → [2|o→] → [1|o→] → [3|o→] → null
↑
points to node 0
```

**Why dummy?**
- Easy to track list ka head
- Final answer: dummy.next

---

## Step 3: Main Loop (Size = 1)

```
┌────────────────────────────────────────┐
│ Size = 1                               │
│ Goal: Merge every 2 adjacent singles   │
└────────────────────────────────────────┘
```

### Initial State:
```
dummy → [0|o→] → [4|o→] → [2|o→] → [1|o→] → [3|o→] → null
↑
tail, dummy
        ↑
      current
```

**Variables:**
```
┌──────────────────────┐
│ size    = 1          │
│ tail    = dummy (0)  │
│ current = 4          │
└──────────────────────┘
```

---

## Step 3.1: While Loop (Till current is not null)

### Iteration 3.1.1: First Pair (4, 2)

#### Sub-step 3.1.1.a: Extract left and right

**Step 1:** `left ← current`
```
left ← 4

left → [4|o→] → [2|o→] → [1|o→] → [3|o→]
```

**Step 2:** `right ← split(left, size)`
```
Call: split(left=4, size=1)

Inside split():

  head → [4|o→] → [2|o→] → [1|o→] → [3|o→]

  Loop: for (i=1; i < size && head.next !== null; i++)
        for (i=1; i < 1 && ...; i++)

  Check condition: i < size?
                   1 < 1?
                   NO! ✗

  loop exit (0 iterations, head stays at [4])

  After loop:
    head → [4|o→] → [2|o→] → [1|o→] → [3|o→]
           ↑
        (didn't move!)

  secondPart ← head.next
  secondPart → [2|o→] → [1|o→] → [3|o→]

  Break connection: head.next = null

  Now:
    head       → [4|o→] → null
    secondPart → [2|o→] → [1|o→] → [3|o→]

  return secondPart

After split:
  left  → [4|o→] → null      (isolated!)
  right → [2|o→] → [1|o→] → [3|o→]
```

**Step 3:** `current ← split(right, size)`
```
Call: split(right=2, size=1)

Inside split():

  head → [2|o→] → [1|o→] → [3|o→]

  Loop: for (i=1; i < size && head.next !== null; i++)
        for (i=1; i < 1 && ...; i++)

  Check condition: i < size?
                   1 < 1?
                   NO! ✗

  loop exit (0 iterations, head stays at [2])

  After loop:
    head → [2|o→] → [1|o→] → [3|o→]
           ↑
        (didn't move!)

  secondPart ← head.next
  secondPart → [1|o→] → [3|o→]

  Break connection: head.next = null

  Now:
    head       → [2|o→] → null
    secondPart → [1|o→] → [3|o→]

  return secondPart

After split:
  left    → [4|o→] → null    (isolated!)
  right   → [2|o→] → null    (isolated!)
  current → [1|o→] → [3|o→]  (remaining)
```

**Visual After Splits:**
```
Before Splits:
dummy → [0|o→] → [4|o→] → [2|o→] → [1|o→] → [3|o→]

After Splits (connections broken):
Chain 1: [0|o→] → [4|o→] → null  (dummy still connected to 4)
         ↑
       tail

Chain 2: [2|o→] → null            (isolated)

Chain 3: [1|o→] → [3|o→]          (remaining)
         ↑
      current
```

**Variables Now:**
```
┌────────────────────────────┐
│ left    = [4] → null          │
│ right   = [2] → null          │
│ current = [1] → [3]           │
│ tail    = [0]                 │
└────────────────────────────┘
```

---

#### Sub-step 3.1.1.b: Call merge(left, right, tail)

```
Call: merge(l1=4, l2=2, tail=0)
```

**Inside merge() function:**

**Step 1:** Initialize
```
current ← tail

current → [0|o→] → [4|o→] (old connection, will be updated)
l1      → [4|o→] → null
l2      → [2|o→] → null
```

---

**Step 2:** While loop (till l1 and l2 are not null)

**Iteration 1:**

Check condition: `(l1 !== null && l2 !== null)`
```
l1 = [4] → not null ✓
l2 = [2] → not null ✓
Enter loop!
```

Compare: `l1.val vs l2.val`
```
4 vs 2
2 is smaller! ✓
```

Attach smaller (l2):
```
current.next ← l2

Before:
current → [0|o→] → old stuff

After:
current → [0|o→] → [2|o→] → null
                    ↑
                 (attached!)
```

Move l2 forward:
```
l2 ← l2.next

Before: l2 → [2|o→] → null
After:  l2 = null (moved to next, which is null)
```

Move current forward:
```
current ← current.next

Before: current → [0|o→] → [2|o→]
After:  current → [2|o→]
                  ↑
               (moved here)
```

**State after iteration 1:**
```
┌─────────────────────────────┐
│ l1      = [4] → null           │
│ l2      = null (exhausted)     │
│ current = [2]                  │
└─────────────────────────────┘

Chain so far:
[0|o→] → [2|o→] → null
```

---

**Iteration 2:**

Check condition: `(l1 !== null && l2 !== null)`
```
l1 = [4] → not null ✓
l2 = null → null ✗
Exit loop!
```

---

**Step 3:** Attach remaining nodes

Check: `if (l1 !== null)`
```
l1 = [4] → not null ✓
Attach remaining l1
```

Attach:
```
current.next ← l1

Before:
current → [2|o→] → null
l1      → [4|o→] → null

After:
current → [2|o→] → [4|o→] → null
                    ↑
                 (attached!)
```

**Chain after attaching:**
```
[0|o→] → [2|o→] → [4|o→] → null
```

---

**Step 4:** Find new tail (last node)

Loop till current.next is not null:
```
Initial: current → [2|o→] → [4|o→] → null

Iteration 1:
  Check: current.next !== null?
  Check: [4] !== null? → Yes ✓
  Move: current ← current.next
  Now: current → [4|o→] → null

Iteration 2:
  Check: current.next !== null?
  Check: null !== null? → No ✗
  Exit loop!

Final: current → [4|o→] → null (this is the last node!)
```

---

**Step 5:** Return new tail

```
return current  (returns node 4)
```

**Back to main function:**
```
tail ← merge(...) returns node 4

tail → [4|o→] → null
```

---

#### Visual Summary After First Merge:

**Before merge:**
```
dummy → [0|o→] → old connections
left  → [4|o→] → null
right → [2|o→] → null
```

**After merge:**
```
dummy → [0|o→] → [2|o→] → [4|o→] → null
                          ↑
                        tail

Remaining:
current → [1|o→] → [3|o→]
```

**Variables:**
```
┌────────────────────────────┐
│ dummy   → [0] → [2] → [4]  │
│ tail    → [4]              │
│ current → [1] → [3]        │
└────────────────────────────┘
```

---

### Iteration 3.1.2: Second Pair (1, 3)

**Current state:**
```
current → [1|o→] → [3|o→]
current is NOT null → Continue loop!
```

#### Sub-step 3.1.2.a: Extract left and right

**Step 1:** `left ← current`
```
left ← [1|o→] → [3|o→]
```

**Step 2:** `right ← split(left, size=1)`
```
Call: split(left=1, size=1)

Inside split():

  head → [1|o→] → [3|o→]

  Loop: for (i=1; i < size && head.next !== null; i++)
        for (i=1; i < 1 && ...; i++)

  Check condition: i < size?
                   1 < 1?
                   NO! ✗

  loop exit (0 iterations, head stays at [1])

  After loop:
    head → [1|o→] → [3|o→]
           ↑
        (didn't move!)

  secondPart ← head.next
  secondPart → [3|o→]

  Break connection: head.next = null

  Now:
    head       → [1|o→] → null
    secondPart → [3|o→]

  return secondPart

After:
  left  → [1|o→] → null
  right → [3|o→]
```

**Step 3:** `current ← split(right, size=1)`
```
Call: split(right=3, size=1)

Inside split():

  head → [3|o→] → null

  Loop: for (i=1; i < size && head.next !== null; i++)
        for (i=1; i < 1 && ...; i++)

  Check condition: i < size?
                   1 < 1?
                   NO! ✗

  loop exit (0 iterations, head stays at [3])

  After loop:
    head → [3|o→] → null
           ↑
        (didn't move!)

  secondPart ← head.next
  secondPart = null (3.next is null)

  return secondPart (returns null)

After:
  left    → [1|o→] → null
  right   → [3|o→] → null
  current = null (no more nodes!)
```

**Variables:**
```
┌────────────────────────────┐
│ left    = [1] → null       │
│ right   = [3] → null       │
│ current = null             │
│ tail    = [4]              │
└────────────────────────────┘
```

---

#### Sub-step 3.1.2.b: Call merge(left, right, tail)

```
Call: merge(l1=1, l2=3, tail=4)
```

**Inside merge():**

**Step 1:** Initialize
```
current ← tail

current → [4|o→] → null
l1      → [1|o→] → null
l2      → [3|o→] → null
```

---

**Step 2:** While loop

**Iteration 1:**

Check: `(l1 !== null && l2 !== null)`
```
l1 = [1] ✓
l2 = [3] ✓
Enter loop!
```

Compare: `1 vs 3`
```
1 is smaller! ✓
```

Attach l1:
```
current.next ← l1

Before: current → [4|o→] → null
After:  current → [4|o→] → [1|o→] → null
                           ↑
                       (attached!)
```

Move l1:
```
l1 ← l1.next
l1 = null
```

Move current:
```
current ← current.next
current → [1|o→]
```

---

**Iteration 2:**

Check: `(l1 !== null && l2 !== null)`
```
l1 = null ✗
l2 = [3] ✓
Exit loop!
```

---

**Step 3:** Attach remaining

```
l2 = [3] → not null
current.next ← l2

current → [1|o→] → [3|o→] → null
```

**Chain so far:**
```
[0|o→] → [2|o→] → [4|o→] → [1|o→] → [3|o→] → null
```

---

**Step 4:** Find tail

```
current → [1|o→] → [3|o→] → null

Loop:
  Move to [3]
  current → [3|o→] → null

current.next = null → Stop!
```

**Step 5:** Return
```
return current (node 3)
```

**Back to main:**
```
tail ← node 3
```

---

### End of While Loop (current = null)

**Check:** `current !== null?`
```
current = null ✗
Exit while loop!
```

---

## After Size=1 Pass:

**Final state:**
```
dummy → [0|o→] → [2|o→] → [4|o→] → [1|o→] → [3|o→] → null
        ↑                                            ↑
      head                                         tail
```

**Notice:**
- Pairs are sorted: (2,4) sorted ✓, (1,3) sorted ✓
- But full list NOT sorted yet!
- Next pass will merge (2,4) with (1,3)

---

## Step 4: Main Loop (Size = 2)

```
┌────────────────────────────────────────┐
│ Size = 2 (doubled from 1)              │
│ Goal: Merge pairs of size 2            │
└────────────────────────────────────────┘
```

### Initial State:
```
dummy → [0|o→] → [2|o→] → [4|o→] → [1|o→] → [3|o→] → null
↑
tail, dummy
        ↑
      current
```

**Variables:**
```
┌──────────────────────┐
│ size    = 2          │
│ tail    = dummy (0)  │
│ current = 2          │
└──────────────────────┘
```

---

### Iteration 4.1: Merge ([2,4] with [1,3])

#### Sub-step 4.1.a: Extract sublists

**Step 1:** `left ← current`
```
left → [2|o→] → [4|o→] → [1|o→] → [3|o→]
```

**Step 2:** `right ← split(left, size=2)`
```
Call: split(left=2, size=2)

Inside split():

  head → [2|o→] → [4|o→] → [1|o→] → [3|o→]

  Loop: for (i=1; i < size && head.next !== null; i++)
        for (i=1; i < 2 && ...; i++)

  Iteration 1:
    Check condition: i < size?
                     1 < 2?
                     YES ✓

    Inside loop: head = head.next
    head → [4|o→] → [1|o→] → [3|o→]

    Increment: i++ (i becomes 2)

  Iteration 2:
    Check condition: i < size?
                     2 < 2?
                     NO! ✗

  loop exit (1 iteration completed, head now at [4])

  After loop:
    head → [4|o→] → [1|o→] → [3|o→]
           ↑
        (moved 1 step forward!)

  secondPart ← head.next
  secondPart → [1|o→] → [3|o→]

  Break connection: head.next = null

  Now:
    head       → [4|o→] → null  (but [2] still points to [4])
    secondPart → [1|o→] → [3|o→]

  return secondPart

After:
  left  → [2|o→] → [4|o→] → null
  right → [1|o→] → [3|o→]  (isolated!)
```

**Step 3:** `current ← split(right, size=2)`
```
Call: split(right=1, size=2)

Inside split():

  head → [1|o→] → [3|o→] → null

  Loop: for (i=1; i < size && head.next !== null; i++)
        for (i=1; i < 2 && ...; i++)

  Iteration 1:
    Check condition: i < size?
                     1 < 2?
                     YES ✓

    Inside loop: head = head.next
    head → [3|o→] → null

    Increment: i++ (i becomes 2)

  Iteration 2:
    Check condition: i < size?
                     2 < 2?
                     NO! ✗

  loop exit (1 iteration completed, head now at [3])

  After loop:
    head → [3|o→] → null
           ↑
        (moved 1 step forward!)

  secondPart ← head.next
  secondPart = null (3.next is null)

  return secondPart (returns null)

After:
  left    → [2|o→] → [4|o→] → null
  right   → [1|o→] → [3|o→] → null
  current = null
```

**Variables:**
```
┌──────────────────────────────┐
│ left    = [2] → [4] → null   │
│ right   = [1] → [3] → null   │
│ current = null               │
│ tail    = [0]                │
└──────────────────────────────┘
```

---

#### Sub-step 4.1.b: Merge sublists

```
Call: merge(l1=[2,4], l2=[1,3], tail=0)
```

**Inside merge():**

```
current ← tail (node 0)
l1      → [2|o→] → [4|o→] → null
l2      → [1|o→] → [3|o→] → null
```

---

**Iteration 1:** Compare 2 vs 1
```
1 is smaller!
current.next ← l2 (node 1)
l2 ← l2.next (node 3)
current ← current.next (node 1)

Chain: [0] → [1]
```

**Iteration 2:** Compare 2 vs 3
```
2 is smaller!
current.next ← l1 (node 2)
l1 ← l1.next (node 4)
current ← current.next (node 2)

Chain: [0] → [1] → [2]
```

**Iteration 3:** Compare 4 vs 3
```
3 is smaller!
current.next ← l2 (node 3)
l2 ← l2.next (null)
current ← current.next (node 3)

Chain: [0] → [1] → [2] → [3]
```

**Exit loop** (l2 = null)

**Attach remaining:**
```
l1 = [4] → not null
current.next ← l1

Chain: [0] → [1] → [2] → [3] → [4] → null
```

**Find tail:**
```
current at [3]
Move to [4]
current at [4] → [4].next = null
Return: node 4
```

**Back to main:**
```
tail ← node 4
```

---

### Check loop condition:

```
current = null ✗
Exit while loop!
```

---

## Step 5: Check Main Loop Condition

```
size = 2
length = 4

Check: size < length?
Check: 2 < 4? → Yes ✓

size *= 2
size = 4
```

---

## Step 6: Main Loop (Size = 4)

```
Check: size < length?
Check: 4 < 4? → No ✗

Exit main loop!
```

---

## Step 7: Return Result

```
return dummy.next

dummy.next → [1|o→] → [2|o→] → [3|o→] → [4|o→] → null
```

**Final sorted list:**
```
1 → 2 → 3 → 4 ✓
```

---

## 📊 Summary Table

| Pass | Size | Input         | Operations     | Output        |
|------|------|---------------|----------------|---------------|
| 0    | -    | [4,2,1,3]     | -              | [4,2,1,3]     |
| 1    | 1    | [4,2,1,3]     | merge(4,2)     | [2,4,1,3]     |
|      |      |               | merge(1,3)     |               |
| 2    | 2    | [2,4,1,3]     | merge([2,4],[1,3]) | [1,2,3,4] ✓   |
| 3    | 4    | Exit loop     | -              | -             |

**Total passes:** 2 = log₂(4) ✓

---

## 🔑 Key Concepts

### 1. split() function:
- Takes a list and size
- Breaks connection after 'size' nodes
- Returns second part
- Used to divide list into sublists

### 2. merge() function:
- Takes two sorted lists and tail
- Compares and attaches smaller nodes
- Returns new tail (last merged node)
- Builds sorted list incrementally

### 3. Bottom-up approach:
- Start with size=1 (singles)
- Merge adjacent pairs
- Double size each pass
- Continue till size >= length

### 4. Pointer management:
- `tail`: tracks end of sorted portion
- `current`: tracks start of unsorted portion
- `dummy`: always points to list head

---

**Complexity:**
- Time: O(n log n) - log n passes, each O(n) work
- Space: O(1) - only pointers, no recursion! ⭐

---

**This is the optimal solution for sorting linked lists!** 🎯