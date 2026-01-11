# Remove Nth Node From End of List

**Difficulty:** Medium
**Topic:** Linked List, Two Pointers

---

## Problem Statement

Given the `head` of a linked list, **remove the nth node from the END of the list** and return its head.

---

## Examples

### Example 1:
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Visualization:
Before: 1 → 2 → 3 → 4 → 5
                    ↑
                Remove 2nd from end (node 4)

After:  1 → 2 → 3 → 5
```

### Example 2:
```
Input: head = [1], n = 1
Output: []

Explanation: Only one node, remove it, list becomes empty
```

### Example 3:
```
Input: head = [1,2], n = 1
Output: [1]

Explanation: Remove last node
```

---

## Constraints

- The number of nodes in the list is `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`
- **n is always valid** (n will never be greater than list length)

---

## 🔴 CRITICAL CLARIFICATION

### From END, Not Beginning!

```
List: [1, 2, 3, 4, 5], n = 2

❌ WRONG: Remove 2nd from BEGINNING
Result: [1, 3, 4, 5] (removed node 2)

✅ CORRECT: Remove 2nd from END
Result: [1, 2, 3, 5] (removed node 4)
```

### Counting from End:

```
List: 1 → 2 → 3 → 4 → 5
      ↑   ↑   ↑   ↑   ↑
      5th 4th 3rd 2nd 1st from end
```

### Position Mapping:

If list has 5 nodes:
- 1st from end = 5th from beginning (last node)
- 2nd from end = 4th from beginning
- 3rd from end = 3rd from beginning (middle)
- 4th from end = 2nd from beginning
- 5th from end = 1st from beginning (head)

**Formula:**
```
Position from beginning = (Total nodes - n + 1)
```

---

## Key Insights

### Insight 1: Two-Pass vs One-Pass

**Two-Pass Approach:**
1. First pass: Count total nodes (L)
2. Second pass: Go to position (L - n) and remove next node
- Simple to understand
- Time: O(2n) = O(n)

**One-Pass Approach (Optimal):**
1. Use two pointers separated by n nodes
2. When first reaches end, second is at correct position
- More clever
- Time: O(n) - single pass!
- Answers the follow-up question!

### Insight 2: Dummy Node Pattern

**Problem:** What if we need to remove the HEAD?

Example: [1, 2, 3], n = 3 (remove 3rd from end = head)

Without dummy: Need special case to change head
With dummy: Treat head removal same as any other node!

**Dummy node makes code cleaner and handles edge cases automatically!**

### Insight 3: We Need Node BEFORE the Target

To remove a node, we need reference to the node BEFORE it:

```
Want to remove node B:
A → B → C

Need to:
1. Access node A (the previous node)
2. Set A.next = B.next (which is C)
3. Now: A → C (B is removed)
```

---

## Approaches

### 1. Brute Force (Two-Pass)

**Strategy:**
1. First pass: Count total nodes (L)
2. Calculate position from start: `pos = L - n`
3. Second pass: Traverse to position `pos - 1` (node before target)
4. Remove target node

**Time:** O(2n) = O(n)
**Space:** O(1)

**Pros:**
- Simple and intuitive
- Easy to understand

**Cons:**
- Requires two passes
- Doesn't answer the follow-up

---

### 2. Optimal (Two Pointers - One Pass)

**Strategy:**
1. Use dummy node (handles head removal edge case)
2. Use two pointers: `fast` and `slow`
3. Move `fast` pointer n steps ahead
4. Move both pointers together until `fast` reaches end
5. `slow` will be at node BEFORE the target
6. Remove target node: `slow.next = slow.next.next`

**Key Insight:**
- Maintain gap of n nodes between pointers
- When fast reaches end, slow is at the right position!

**Time:** O(n) - single pass! ✅
**Space:** O(1)

**Pros:**
- Single pass (answers follow-up!)
- Handles all edge cases cleanly with dummy node
- Optimal solution

**Cons:**
- Slightly more complex to understand initially

---

## Edge Cases to Consider

### 1. Remove the head (n = length)
```
Input: [1, 2, 3], n = 3
Output: [2, 3]

Explanation: 3rd from end is the head (1)
```

### 2. Remove the tail (n = 1)
```
Input: [1, 2, 3], n = 1
Output: [1, 2]

Explanation: 1st from end is the tail (3)
```

### 3. Single node (n = 1)
```
Input: [1], n = 1
Output: []

Explanation: Remove only node, list becomes empty
```

### 4. Two nodes, remove head (n = 2)
```
Input: [1, 2], n = 2
Output: [2]
```

### 5. Two nodes, remove tail (n = 1)
```
Input: [1, 2], n = 1
Output: [1]
```

---

## Visual Explanation: Two Pointer Approach

```
Goal: Remove 2nd from end in [1,2,3,4,5]

Step 1: Create dummy, set fast and slow to dummy
dummy → 1 → 2 → 3 → 4 → 5 → null
  ↑
fast, slow

Step 2: Move fast n (2) steps ahead
dummy → 1 → 2 → 3 → 4 → 5 → null
  ↑           ↑
slow        fast

Step 3: Move both until fast reaches end
dummy → 1 → 2 → 3 → 4 → 5 → null
              ↑           ↑
            slow        fast

Step 4: slow is at node BEFORE target!
Remove: slow.next = slow.next.next

dummy → 1 → 2 → 3 → 5 → null
              ↑
            slow (node 3)

Result: [1, 2, 3, 5] ✅
```

**Why it works:**
- Gap between pointers = n
- When fast reaches end, slow is n nodes behind
- slow is exactly at the node BEFORE the target!

---

## Common Mistakes

### Mistake 1: Off-by-one errors
```
❌ WRONG: slow.next is the target, but didn't position correctly
✅ CORRECT: slow should be at node BEFORE target
```

### Mistake 2: Not using dummy node
```
❌ WRONG: Special case for removing head gets messy
✅ CORRECT: Dummy node handles all cases uniformly
```

### Mistake 3: Wrong pointer gap
```
❌ WRONG: Move fast (n-1) steps
✅ CORRECT: Move fast exactly n steps
```

### Mistake 4: Not handling null properly
```
❌ WRONG: Not checking if fast reaches null
✅ CORRECT: Loop while fast.next is not null
```

---

## Interview Tips

1. **Clarify:** Confirm it's from the END, not beginning
2. **Ask:** Is n always valid? (Yes, per constraints)
3. **Start:** Mention both approaches (two-pass and one-pass)
4. **Optimize:** Implement one-pass to answer follow-up
5. **Edge Cases:** Discuss removing head, tail, single node
6. **Dummy Node:** Explain why it simplifies edge cases
7. **Dry Run:** Walk through example with pointers

**Most Important:** Explain WHY the two-pointer gap works!

---

## Complexity Comparison

| Approach | Time | Space | Passes | Edge Cases |
|----------|------|-------|--------|------------|
| Brute Force (Two-Pass) | O(n) | O(1) | 2 | Manual |
| Optimal (Two Pointers) | O(n) | O(1) | 1 ✅ | Auto with dummy ✅ |

**Both are O(n) time, but one-pass is more elegant and answers the follow-up!**

---

## Related Problems

- Find Nth Node From End (similar concept)
- Delete Node in Linked List
- Remove Linked List Elements
- Middle of Linked List (two pointers)

---

## Key Takeaway

The **two-pointer technique with a fixed gap** is powerful for problems involving "nth from end" in a single pass!

The pattern:
1. Create gap of n between pointers
2. Move both together
3. When first reaches end, second is at target position

This pattern appears in many linked list problems!
