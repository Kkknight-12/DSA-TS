# Odd Even Linked List

**Difficulty:** Medium
**Topic:** Linked List, Two Pointers
**LeetCode:** #328

---

## 📋 Problem Statement

Ek singly linked list diya gaya hai. Sabhi **odd index** ke nodes ko ek saath group karo, phir **even index** ke nodes ko group karo, aur reordered list return karo.

**Important:**
- **Index** ke basis pe group karna hai, **value** ke basis pe nahi!
- First node (index 0) = odd position
- Second node (index 1) = even position
- And so on...

**Constraints:**
- Both groups ke andar relative order same rehna chahiye
- **O(n) time** aur **O(1) space** mein solve karna hai

### Examples

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]

Explanation:
Original indices:
  1    2    3    4    5
  ↓    ↓    ↓    ↓    ↓
 odd  even odd  even odd

Grouping:
  Odd indices: 1, 3, 5 (maintain order)
  Even indices: 2, 4 (maintain order)

Result: [1,3,5,2,4]
```

**Visual:**
```
Before:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
  idx 0        idx 1        idx 2        idx 3        idx 4
   ODD         EVEN         ODD          EVEN         ODD

After:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │ ●──┼──→│ 2 │ ●──┼──→│ 4 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
 Odd group                              Even group
```

**Example 2:**
```
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]

Explanation:
Indices:       0  1  2  3  4  5  6
Values:        2  1  3  5  6  4  7
Position:     odd even odd even odd even odd

Odd indices (0,2,4,6): 2, 3, 6, 7
Even indices (1,3,5): 1, 5, 4

Result: [2,3,6,7,1,5,4]
```

### Constraints

- Number of nodes: `[0, 10^4]`
- Node values: `-10^6 <= Node.val <= 10^6`

### Requirements

**Must solve in:**
- **Time:** O(n) - linear time
- **Space:** O(1) - constant extra space (only pointers allowed)

---

## 🎯 Problem Understanding

### Critical Point: INDEX vs VALUE

**❌ Common Confusion:**
"Odd Even List" sounds like separating odd VALUES from even VALUES

**✅ Actual Requirement:**
Separate nodes based on their **POSITION/INDEX** in the list!

### Example to Clear Confusion

```
Input: [2, 4, 6, 8, 10]
       All EVEN values, but...

Indices:  0   1   2   3   4
Position: odd even odd even odd

Output: [2, 6, 10, 4, 8]
        ↑   ↑   ↑   ↑  ↑
       odd odd odd even even

NOT: [4,8,10,2,6] (that would be value-based sorting!)
```

### What We're Doing

**Step 1:** Identify positions
```
Original: [1, 2, 3, 4, 5]
           ↓  ↓  ↓  ↓  ↓
Position: 0  1  2  3  4
Type:    odd even odd even odd
```

**Step 2:** Group by position
```
Odd group:  1 → 3 → 5
Even group: 2 → 4
```

**Step 3:** Connect: Odd group → Even group
```
Result: 1 → 3 → 5 → 2 → 4 → null
```

### Key Requirements

1. **Maintain Relative Order:**
   - If odd nodes were 1→3→5, they stay 1→3→5 (not 5→3→1)
   - If even nodes were 2→4, they stay 2→4

2. **In-place Rearrangement:**
   - Can't create new nodes (modify existing links only)
   - O(1) extra space means only pointers, no arrays

3. **Single Pass:**
   - O(n) time means traverse list only once (or twice max)

---

## 🔧 Prerequisites

### 1. Understanding Linked List Traversal

```typescript
function traverse(head: ListNode | null): void {
  let current = head;
  let index = 0;

  while (current !== null) {
    console.log(`Index ${index}: Value ${current.val}`);
    current = current.next;
    index++;
  }
}
```

### 2. Pointer Manipulation

You need to be comfortable with:
- Changing `next` pointers
- Maintaining multiple pointers simultaneously
- Connecting two separate lists

### 3. Odd/Even Index Pattern

```typescript
// Checking if index is odd or even
if (index % 2 === 0) {
  // ODD position (0-indexed)
  // 0, 2, 4, 6...
} else {
  // EVEN position (0-indexed)
  // 1, 3, 5, 7...
}
```

**Note:** In 0-indexed:
- Index 0 = 1st position = ODD
- Index 1 = 2nd position = EVEN
- Index 2 = 3rd position = ODD
- And so on...

---

## 💡 Approaches

### Approach 1: Brute Force (Arrays)

**Soch (Intuition):**

"List ko traverse karo, odd aur even index ke nodes ko alag-alag arrays mein store karo, phir dono arrays se naya list banao!"

**Algorithm:**

1. Do arrays banao: `oddNodes[]` aur `evenNodes[]`
2. List traverse karo:
   - Index even hai (0, 2, 4...)? → oddNodes mein push karo
   - Index odd hai (1, 3, 5...)? → evenNodes mein push karo
3. Naya list banao:
   - Pehle oddNodes se nodes
   - Phir evenNodes se nodes

**Visual Example:**
```
Input: [1,2,3,4,5]

Step 1: Separate by index
  oddNodes = [1, 3, 5]  (indices 0, 2, 4)
  evenNodes = [2, 4]    (indices 1, 3)

Step 2: Rebuild list
  1 → 3 → 5 → 2 → 4 → null
```

**Complexity:**
- **Time:** O(n) - traverse once + rebuild once
- **Space:** O(n) - two arrays store n nodes

**Pros:**
- ✅ Simple to understand
- ✅ Easy to implement
- ✅ Clear separation of concerns

**Cons:**
- ❌ O(n) space - violates constraint!
- ❌ Creates new nodes (not in-place)
- ❌ Doesn't satisfy the problem requirement

---

### Approach 2: Optimal (Two Pointers - Odd/Even Lists)

**Soch (Intuition):**

"Do separate lists banao - ek odd positions ke liye, ek even positions ke liye. Traverse karte waqt pointers ko alternate karke move karo. End mein dono lists ko connect kar do!"

**Key Insight:**

Instead of storing in arrays, **rearrange the next pointers** while traversing:
- Odd pointer: 1 → 3 → 5
- Even pointer: 2 → 4
- Finally: Connect odd list's tail to even list's head

**Algorithm:**

**Setup:**
1. odd = head (first node)
2. even = head.next (second node)
3. evenHead = even (save even list's head for later connection)

**Traverse and Separate:**
4. While even and even.next exist:
   - odd.next = even.next (skip even node)
   - odd = odd.next (move odd pointer)
   - even.next = odd.next (skip odd node)
   - even = even.next (move even pointer)

**Connect:**
5. odd.next = evenHead (connect odd list to even list)

**Visual Explanation:**

```
Original: 1 → 2 → 3 → 4 → 5 → null

Setup:
  odd = 1
  even = 2
  evenHead = 2 (saved)

Iteration 1:
  odd.next = 3 (skip 2)
  odd = 3
  even.next = 4 (skip 3)
  even = 4

State:
  Odd list:  1 → 3
  Even list: 2 → 4

Iteration 2:
  odd.next = 5 (skip 4)
  odd = 5
  even.next = null (no more nodes)
  even = null

State:
  Odd list:  1 → 3 → 5
  Even list: 2 → 4

Final Connection:
  odd.next = evenHead
  Result: 1 → 3 → 5 → 2 → 4 → null ✅
```

**Step-by-Step Visualization:**

```
Initial:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 4 │ ●──┼──→│ 5 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
  ↑            ↑
 odd          even
            evenHead

After odd.next = even.next:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ...│   │ 4 │ ●──┼──→│ 5 │null│
└───┴─┬──┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
      │                       ↑
      └───────────────────────┘
      (1 now points to 3, skipping 2)

After even.next = odd.next:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ...│   │ 3 │ ●──┼──→│ 4 │ ...│   │ 5 │null│
└───┴─┬──┘   └───┴─┬──┘   └───┴────┘   └───┴────┘   └───┴────┘
      │            │                       ↑
      │            └───────────────────────┘
      └─────────────→ (1→3)   (2→4)

Final Connection (odd.next = evenHead):
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 3 │ ●──┼──→│ 5 │ ●──┼──→│ 2 │ ●──┼──→│ 4 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘
```

**Complexity:**
- **Time:** O(n) - single pass through list
- **Space:** O(1) - only 3 pointers (odd, even, evenHead) ✅

**Pros:**
- ✅ O(1) space - satisfies constraint! ⭐
- ✅ In-place rearrangement
- ✅ Single pass
- ✅ Optimal solution

**Cons:**
- ❌ Slightly tricky pointer manipulation
- ❌ Need to be careful with even.next checks

---

## 📊 Approach Comparison

| Aspect | Brute Force (Arrays) | Optimal (Two Pointers) |
|--------|---------------------|------------------------|
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | O(n) | **O(1)** ✅ |
| **In-place** | No | Yes |
| **Ease of Understanding** | Easy | Medium |
| **Satisfies Constraints** | ❌ No | ✅ Yes |
| **Interview Preference** | Not acceptable | **Excellent** ⭐ |

**Clear Winner:** Optimal (Two Pointers) approach!

---

## 🎓 Which Approach to Use?

### In Interviews:

**Only mention the optimal approach** (unless asked for alternatives)

The problem explicitly requires O(1) space, so brute force isn't acceptable here. Go straight to the two-pointer solution!

**What to say:**
```
"Problem O(1) space constraint de raha hai, toh main two-pointer approach use karunga.
Main do separate lists banaunga - odd aur even positions ke liye - aur traverse karte
waqt pointers ko alternate karunga. End mein dono lists ko connect kar dunga."
```

### For Practice:

1. **Understand the pattern first:**
   - Draw the list
   - Mark odd/even positions
   - See how pointers should move

2. **Code the solution:**
   - Handle edge cases (empty, single node)
   - Implement pointer alternation
   - Connect the lists

3. **Test thoroughly:**
   - Odd length lists
   - Even length lists
   - Single/two nodes

---

## 🔍 Key Insights

### 1. Why Pointer Alternation Works

**Pattern:**
```
Start:     1 → 2 → 3 → 4 → 5 → null
           odd even odd even odd

Step 1: odd.next = even.next
        1 ─────→ 3 (skip 2)

Step 2: even.next = odd.next
        2 ─────→ 4 (skip 3)

Result: Two separate lists formed!
```

### 2. Why We Need evenHead

```
Initial:
  even = node(2)
  evenHead = node(2)  // SAVE THIS!

After processing:
  odd list: 1 → 3 → 5
  even = null (moved to end)

To connect: odd.next = evenHead (not even!)
```

Without `evenHead`, we lose reference to the start of even list!

### 3. Loop Condition: Why `even && even.next`?

```typescript
while (even !== null && even.next !== null)
```

**Why check both?**

- `even !== null`: Even pointer hasn't reached end
- `even.next !== null`: Next odd node exists

**Example - Even length:**
```
[1,2,3,4]

Last iteration:
  odd = 3
  even = 4
  even.next = null ✅ STOP!

If we only checked even !== null:
  even.next = odd.next would access null.next → CRASH!
```

**Example - Odd length:**
```
[1,2,3,4,5]

Last iteration:
  odd = 5
  even = 4
  even.next = 5 (exists)

Process:
  odd.next = even.next = null
  even.next = odd.next = null

Next check:
  even = null ✅ STOP!
```

### 4. Relative Order Preservation

The algorithm naturally maintains order because:
- We traverse left to right
- Odd pointer always picks next odd (in order)
- Even pointer always picks next even (in order)
- No sorting or swapping needed!

---

## 🚨 Edge Cases

### 1. Empty List
```
Input: null
Output: null

No nodes to rearrange
```

### 2. Single Node
```
Input: [1]
Output: [1]

Only one node = odd position
No even nodes to separate
```

### 3. Two Nodes
```
Input: [1,2]
Output: [1,2]

Odd: [1]
Even: [2]
Result: [1,2] (already in correct order!)
```

### 4. Three Nodes
```
Input: [1,2,3]
Output: [1,3,2]

Odd: [1,3]
Even: [2]
Result: [1,3,2]
```

### 5. Four Nodes (Even Length)
```
Input: [1,2,3,4]
Output: [1,3,2,4]

Odd: [1,3]
Even: [2,4]
```

### 6. Five Nodes (Odd Length)
```
Input: [1,2,3,4,5]
Output: [1,3,5,2,4]

Odd: [1,3,5]
Even: [2,4]
```

### 7. All Same Values
```
Input: [5,5,5,5,5]
Output: [5,5,5,5,5]

Position-based, not value-based!
Odd indices: [5,5,5]
Even indices: [5,5]
Result: [5,5,5,5,5]
```

---

## ⚠️ Common Mistakes

### Mistake 1: Confusing Value with Index

```typescript
❌ WRONG: Separating by node VALUE
if (node.val % 2 === 0) {
  // even value
} else {
  // odd value
}

Problem: [2,4,6,8] all even values but need to separate by position!

✅ CORRECT: Separating by INDEX
// Track index or use pointer alternation
// Position 0 = odd, position 1 = even, etc.
```

### Mistake 2: Losing evenHead Reference

```typescript
❌ WRONG:
let odd = head;
let even = head.next;
// ... processing ...
odd.next = even;  // even has moved! Lost reference!

✅ CORRECT:
let odd = head;
let even = head.next;
let evenHead = even;  // SAVE IT!
// ... processing ...
odd.next = evenHead;  // Use saved reference
```

### Mistake 3: Wrong Loop Condition

```typescript
❌ WRONG:
while (odd !== null && even !== null) {
  odd.next = even.next;  // Can be null
  even.next = odd.next;  // Can be null
}

Problem: May try to access null.next

✅ CORRECT:
while (even !== null && even.next !== null) {
  odd.next = even.next;  // Safe: even.next exists
  odd = odd.next;
  even.next = odd.next;  // Safe: can be null
  even = even.next;
}
```

### Mistake 4: Not Moving Pointers

```typescript
❌ WRONG:
while (even !== null && even.next !== null) {
  odd.next = even.next;
  even.next = odd.next;
  // Forgot to move odd and even!
}

Problem: Infinite loop!

✅ CORRECT:
while (even !== null && even.next !== null) {
  odd.next = even.next;
  odd = odd.next;        // MOVE odd
  even.next = odd.next;
  even = even.next;      // MOVE even
}
```

### Mistake 5: Incorrect Final Connection

```typescript
❌ WRONG:
odd.next = even;  // even is now null or at wrong position!

✅ CORRECT:
odd.next = evenHead;  // Connect to START of even list
```

---

## 🎯 Interview Tips

### What to Say to Interviewer

**Initial Response:**
```
"Problem samajh mein aa gaya. Hume nodes ko unke INDEX ke basis pe
rearrange karna hai (value ke basis pe nahi).

Main two-pointer approach use karunga:
1. Do separate lists banaunga - odd aur even positions ke liye
2. Ek hi pass mein dono lists ko build karunga (pointer alternation se)
3. End mein odd list ki tail ko even list ke head se connect kar dunga

Time: O(n), Space: O(1) - constraint satisfy hoti hai."
```

**During Explanation:**
```
"Main teen pointers use karunga:
- odd: Odd positions ke nodes ko link karega
- even: Even positions ke nodes ko link karega
- evenHead: Even list ka head save karega (final connection ke liye)

Loop mein:
- odd.next = even.next (skip even node)
- even.next = odd.next (skip odd node)
- Dono pointers aage move karo

Loop condition 'even && even.next' isliye hai kyunki even
hamesha odd se ek position aage hota hai."
```

### Common Follow-up Questions

**Q1: Even aur odd length mein koi difference hai handling mein?**

**A:** "Nahi, algorithm naturally handle kar leta hai. Loop condition 'even && even.next' automatically dono cases handle kar leti hai. Even length mein even.next null ho jata hai, odd length mein even khud null ho jata hai."

**Q2: Kya hum ek hi pointer se nahi kar sakte?**

**A:** "Nahi, kyunki hume simultaneously do lists build karne hain. Ek pointer se hum ek list hi build kar sakte hain ek time pe."

**Q3: Space complexity detail mein explain karo.**

**A:** "Hum sirf 3 extra pointers use kar rahe hain (odd, even, evenHead) jo input size se independent hain. Koi array ya extra data structure nahi use kar rahe, aur recursion bhi nahi hai. Isliye O(1) space hai."

**Q4: Agar original list preserve karni ho toh?**

**A:** "Tab hume new nodes create karke copy banana padega, jo O(n) space lega. But problem explicitly in-place modification allow kar rahi hai aur O(1) space constraint de rahi hai, toh current approach correct hai."

**Q5: Dry run karo [1,2,3,4] pe.**

**A:**
```
Initial: 1→2→3→4
  odd=1, even=2, evenHead=2

Iter 1:
  odd.next = 3 (1→3)
  odd = 3
  even.next = 4 (2→4)
  even = 4

Iter 2:
  odd.next = null (3→null)
  odd = odd.next would fail, but...
  even.next = null? NO! Loop stops

Final:
  odd.next = evenHead
  Result: 1→3→2→4 ✅
```

### Red Flags to Avoid

❌ Don't separate by node values (odd/even numbers)
❌ Don't use extra arrays (violates O(1) space)
❌ Don't forget to save evenHead before modifying
❌ Don't forget to check both even && even.next
❌ Don't forget to move pointers in loop

### Bonus Points

⭐ Draw the pointer movements on a diagram
⭐ Explain why loop condition is even && even.next
⭐ Mention how relative order is preserved
⭐ Handle edge cases in code (null, single node)
⭐ Clean, readable code with clear variable names

---

## 📝 Practice Tips

### Step 1: Visualize on Paper

Draw the list and manually mark:
- Odd position nodes
- Even position nodes
- How pointers should move

### Step 2: Code Without Looking

Try to implement from memory, focusing on:
- Saving evenHead
- Proper loop condition
- Moving both pointers

### Step 3: Test Edge Cases

- Empty list
- Single node
- Two nodes
- Even length (4 nodes)
- Odd length (5 nodes)

### Step 4: Dry Run

Pick a 4-5 node example and trace through:
- Each pointer assignment
- Where pointers are after each iteration
- Final connection

---

## 🔗 Related Problems

**Similar Patterns:**
1. **Split Linked List in Parts** - Similar grouping logic
2. **Partition List** - Separate based on value comparison
3. **Swap Nodes in Pairs** - Pointer alternation
4. **Reverse Nodes in k-Group** - Group manipulation

**Must Solve Before:**
1. **Reverse Linked List** - Basic pointer manipulation
2. **Middle of Linked List** - Slow-fast pointers
3. **Merge Two Sorted Lists** - Combining lists

**Practice Progression:**
1. Start with Reverse Linked List (easier)
2. Then solve Swap Nodes in Pairs (similar pattern)
3. Then solve this problem (Odd Even List)
4. Finally try Reverse Nodes in k-Group (hardest)

---

## 🎓 Key Takeaways

1. **Index vs Value:**
   - Separate by POSITION/INDEX, not node values
   - First node (index 0) = odd position

2. **Two-Pointer Technique:**
   - Build two separate lists simultaneously
   - Alternate pointer movements (odd→even→odd)
   - Save evenHead for final connection

3. **Loop Condition:**
   - `while (even && even.next)`
   - Naturally handles both even and odd length
   - Prevents null pointer access

4. **Space Optimization:**
   - Only 3 pointers needed
   - In-place link manipulation
   - O(1) space achieved ✅

5. **Relative Order:**
   - No sorting needed
   - Left-to-right traversal preserves order
   - Just re-link, don't rearrange

**Remember:** This problem tests your understanding of pointer manipulation and in-place list rearrangement. Master the two-pointer pattern! 🚀

---

## 🤔 Which Solution Do You Want to See?

Aap konsa solution dekhna chahte hain?

1. **Brute Force** - Array approach (O(n) space - doesn't satisfy constraint)
2. **Optimal** - Two-pointer approach (O(1) space - required solution) ⭐

Bataiye, main aapke liye konsa code likhun?

**Note:** Problem explicitly requires O(1) space, so optimal solution is the only acceptable answer for interviews!