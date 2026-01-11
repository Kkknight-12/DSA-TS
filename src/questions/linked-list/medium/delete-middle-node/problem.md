# Delete the Middle Node of a Linked List

**Difficulty:** Medium
**Topic:** Linked List, Two Pointers, Fast & Slow Pointers

---

## Problem Statement

You are given the `head` of a linked list. **Delete the middle node**, and return the head of the modified linked list.

The **middle node** of a linked list of size `n` is the **⌊n / 2⌋th node from the start** using **0-based indexing**, where ⌊x⌋ denotes the largest integer less than or equal to x (floor function).

---

## Examples

### Example 1:
```
Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]

Explanation:
n = 7
Middle position = ⌊7/2⌋ = ⌊3.5⌋ = 3 (0-based)

Positions: 0  1  2  3  4  5  6
Values:   [1, 3, 4, 7, 1, 2, 6]
                    ↑
                 Middle (remove this)

Result: [1, 3, 4, 1, 2, 6]
```

### Example 2:
```
Input: head = [1,2,3,4]
Output: [1,2,4]

Explanation:
n = 4
Middle position = ⌊4/2⌋ = 2 (0-based)

Positions: 0  1  2  3
Values:   [1, 2, 3, 4]
                ↑
             Middle (remove this)

Result: [1, 2, 4]
```

### Example 3:
```
Input: head = [2,1]
Output: [2]

Explanation:
n = 2
Middle position = ⌊2/2⌋ = 1 (0-based)

Positions: 0  1
Values:   [2, 1]
              ↑
           Middle (remove this)

Result: [2]
```

---

## Constraints

- The number of nodes in the list is in the range `[1, 10^5]`
- `1 <= Node.val <= 10^5`

---

## 🔴 CRITICAL UNDERSTANDING: Middle Position

### Formula: Middle = ⌊n / 2⌋ (0-based indexing)

```
n = 1: ⌊1/2⌋ = 0 → Position 0 (only node)
n = 2: ⌊2/2⌋ = 1 → Position 1 (2nd node)
n = 3: ⌊3/2⌋ = 1 → Position 1 (2nd node)
n = 4: ⌊4/2⌋ = 2 → Position 2 (3rd node)
n = 5: ⌊5/2⌋ = 2 → Position 2 (3rd node)
n = 6: ⌊6/2⌋ = 3 → Position 3 (4th node)
n = 7: ⌊7/2⌋ = 3 → Position 3 (4th node)
```

### Pattern:
- **Odd length (n):** Middle is exactly at center
  - n=1: position 0 (center)
  - n=3: position 1 (center)
  - n=5: position 2 (center)

- **Even length (n):** Middle is the first of the two center nodes
  - n=2: position 1 (second of two)
  - n=4: position 2 (second of four)
  - n=6: position 3 (second of six)

### Visual Examples:

```
n=1: [A]        → Remove position 0 → []
      ↑

n=2: [A, B]     → Remove position 1 → [A]
         ↑

n=3: [A, B, C]  → Remove position 1 → [A, C]
         ↑

n=4: [A, B, C, D] → Remove position 2 → [A, B, D]
            ↑

n=5: [A, B, C, D, E] → Remove position 2 → [A, B, D, E]
            ↑
```

---

## Key Insights

### Insight 1: We Need Node BEFORE Middle

To remove a node, we need reference to the node BEFORE it:

```
To remove middle node C:
A → B → C → D → E

Need:
1. Access node B (before middle)
2. Set B.next = C.next (which is D)
3. Result: A → B → D → E
```

**Important:** We need to position our pointer at the node BEFORE middle, not AT middle!

### Insight 2: Fast & Slow Pointer Pattern

**Classic Pattern:**
- Slow pointer moves 1 step
- Fast pointer moves 2 steps
- When fast reaches end, slow is at middle!

**But for this problem:**
- We need slow to be at node BEFORE middle
- Solution: Start fast ahead, or use dummy node!

### Insight 3: Edge Case - Single Node

```
Input: [1], n = 1
Middle: position 0
Result: [] (empty list)

Special handling needed:
- Can't have "node before middle" when only 1 node
- Must return null
```

---

## Approaches

### 1. Brute Force (Two-Pass)

**Strategy:**
1. First pass: Count total nodes (n)
2. Calculate middle position: mid = n / 2
3. Calculate position before middle: mid - 1
4. Second pass: Navigate to position (mid - 1)
5. Remove middle node

**Time:** O(n) - two passes
**Space:** O(1)

**Pros:**
- Simple and intuitive
- Easy to understand

**Cons:**
- Requires two passes
- Special case for single node

---

### 2. Optimal (Fast & Slow Pointers - One Pass)

**Strategy:**
1. Use dummy node (handles edge cases)
2. Use slow (1 step) and fast (2 steps) pointers
3. Start both at dummy
4. Move fast one extra step initially OR
5. Loop while fast has 2 more nodes to go
6. slow will be at node BEFORE middle
7. Remove middle node

**Time:** O(n) - single pass!
**Space:** O(1)

**Pros:**
- Single pass through list
- Elegant solution
- Handles all edge cases with dummy node

**Cons:**
- Slightly more complex to understand initially

---

## Visual Explanation: Fast & Slow Pointers

### Example: [1, 2, 3, 4, 5] (n=5, middle at position 2)

```
Initial (with dummy):
dummy → 1 → 2 → 3 → 4 → 5 → null
  ↑
slow, fast (both at dummy)

After Iteration 1:
dummy → 1 → 2 → 3 → 4 → 5 → null
        ↑   ↑
      slow  fast

After Iteration 2:
dummy → 1 → 2 → 3 → 4 → 5 → null
            ↑       ↑
          slow     fast

Stop! Loop check before iteration 3:
fast.next = node(5) ✓
fast.next.next = null ✗
Exit loop!

slow is at position 1 (node 2)
slow.next is middle (node 3, position 2)
Remove: slow.next = slow.next.next

Result: 1 → 2 → 4 → 5
```

**Key:** slow ends up at node BEFORE middle! Perfect for removal!

---

## Edge Cases to Consider

### 1. Single node (n = 1)
```
Input: [1]
Middle: position 0
Output: []

Special: Only node is middle, list becomes empty
```

### 2. Two nodes (n = 2)
```
Input: [1, 2]
Middle: position 1
Output: [1]

Remove second node
```

### 3. Three nodes (n = 3)
```
Input: [1, 2, 3]
Middle: position 1
Output: [1, 3]

Remove middle node
```

### 4. Even length (n = 4)
```
Input: [1, 2, 3, 4]
Middle: position 2
Output: [1, 2, 4]

Remove second of the two center nodes
```

### 5. Odd length (n = 5)
```
Input: [1, 2, 3, 4, 5]
Middle: position 2
Output: [1, 2, 4, 5]

Remove exact center node
```

---

## Fast & Slow Pointer Mechanics

### Why does slow end at node BEFORE middle?

**The Math:**
- slow moves n/2 times
- fast moves n times (2 steps each)
- When fast reaches end, slow has moved n/2 steps

**With dummy node:**
- slow starts at dummy (position -1)
- After n/2 moves, slow is at position (n/2 - 1)
- Position (n/2 - 1) is exactly before middle position (n/2)!

**Example with n=5:**
```
Middle position = 5/2 = 2
slow starts at: -1 (dummy)
slow moves: 2 times
slow ends at: -1 + 2 = 1 (position 1)
Position 1 is before position 2! ✅
```

---

## Common Mistakes

### Mistake 1: Slow ends AT middle, not BEFORE
```
❌ WRONG: slow is at middle node
Can't remove node from itself!

✅ CORRECT: slow is at node BEFORE middle
Can do slow.next = slow.next.next
```

### Mistake 2: Wrong loop condition
```
❌ WRONG: while (fast && fast.next)
slow might end at middle, not before

✅ CORRECT: while (fast.next && fast.next.next)
OR start fast one step ahead
```

### Mistake 3: Not handling single node
```
❌ WRONG: No special case for n=1
Might crash or return wrong result

✅ CORRECT: Check if only one node, return null
```

### Mistake 4: Not using dummy node
```
❌ WRONG: Start pointers at head
Edge cases become messy

✅ CORRECT: Use dummy node
Handles all cases uniformly
```

---

## Interview Tips

1. **Clarify:** Confirm 0-based indexing and floor division
2. **Formula:** Mention middle = ⌊n/2⌋
3. **Approaches:** Discuss both two-pass and one-pass
4. **Optimize:** Implement fast/slow pointer solution
5. **Edge Cases:** Single node, two nodes, even/odd lengths
6. **Dummy Node:** Explain why it simplifies code
7. **Dry Run:** Walk through with n=5 example

**Key Point:** Explain why slow ends at node BEFORE middle!

---

## Complexity Comparison

| Approach | Time | Space | Passes | Edge Cases |
|----------|------|-------|--------|------------|
| Brute Force (Two-Pass) | O(n) | O(1) | 2 | Manual |
| Optimal (Fast/Slow) | O(n) | O(1) | 1 ✅ | Auto with dummy ✅ |

**Both are O(n) time, but one-pass is more elegant!**

---

## Related Problems

- Middle of Linked List (find, not delete)
- Remove Nth Node From End (similar two-pointer pattern)
- Delete Node in Linked List
- Palindrome Linked List (uses fast/slow to find middle)

---

## Key Takeaway

The **fast and slow pointer technique** is perfect for finding the middle of a linked list in one pass!

**The pattern:**
1. Slow moves 1 step, fast moves 2 steps
2. When fast reaches end, slow is at middle
3. To get node BEFORE middle: start with dummy OR adjust loop condition

This pattern appears frequently in linked list problems!

---

## Problem Variations

**This problem:** Delete middle node
**Variation 1:** Return middle node (don't delete)
**Variation 2:** Return second middle for even length
**Variation 3:** Delete all nodes after middle

Understanding the core fast/slow pattern helps solve all variations!