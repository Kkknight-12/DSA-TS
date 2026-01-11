# Copy List with Random Pointer

**Difficulty:** Medium
**Source:** LeetCode #138
**Topics:** Linked List, Hash Table, Deep Copy

---

## 📋 Problem Statement

[copy-list-with-random-pointer-leet-code](https://leetcode.com/problems/copy-list-with-random-pointer/description/)

A linked list of length `n` is given such that each node contains an **additional random pointer**, which could point to **any node** in the list, or **null**.

Construct a **deep copy** of the list. The deep copy should consist of exactly `n` **brand new nodes**, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to **new nodes** in the copied list such that the pointers in the original list and copied list represent the **same list state**.

**Important:** None of the pointers in the new list should point to nodes in the original list.

**Samajhne ke liye (Understanding):**
- Har node mein **2 pointers** hain:
  1. `next` - Normal linked list ka next pointer
  2. `random` - Kisi bhi node ko point kar sakta hai (ya null)
- Tumhe **deep copy** banana hai (completely new nodes)
- Copy mein bhi same connections hone chahiye

**Visual Understanding:**
```
Original List:
┌───┬───┬───┐   ┌───┬───┬───┐   ┌───┬───┬───┐
│ 7 │ N │ R │ → │13 │ N │ R │ → │11 │ N │ R │ → null
└───┴─│─┴─│─┘   └───┴─│─┴─│─┘   └───┴─│─┴─│─┘
      │   │           │   │           │   │
      │   null        │   └───────────┘   │
      │               └───────────────────┘
      next            random

Deep Copy (completely NEW nodes):
┌───┬───┬───┐   ┌───┬───┬───┐   ┌───┬───┬───┐
│ 7'│ N │ R │ → │13'│ N │ R │ → │11'│ N │ R │ → null
└───┴─│─┴─│─┘   └───┴─│─┴─│─┘   └───┴─│─┴─│─┘
      │   │           │   │           │   │
      │   null        │   └───────────┘   │
      │               └───────────────────┘

IMPORTANT: 7' ≠ 7 (different nodes, same value!)
```

### Example 1:
```
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Explanation:
Node 0: val=7,  random=null
Node 1: val=13, random=Node 0
Node 2: val=11, random=Node 4
Node 3: val=10, random=Node 2
Node 4: val=1,  random=Node 0

Visual:
          ┌───┐
          ↓   │
7 → 13 → 11 → 10 → 1 → null
↑↑   │   │         ↑    
│└───     ─────────┘    
└──────────────────┘
```

### Example 2:
```
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Node 0: val=1, random=Node 1
Node 1: val=2, random=Node 1 (points to itself!)

Visual:
    ┌┐
    │↓
1 → 2 → null
│   ↑
└───┘
```

### Example 3:
```
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]

Visual:
        ┌───┐
        │   ↓
3 → 3 → 3 → null
```

### Constraints:
- `0 <= n <= 1000`
- `-10⁴ <= Node.val <= 10⁴`
- `Node.random` is `null` or pointing to a node in the linked list

---

## 💡 Core Challenge

**Main Problem:**

Agar sirf `next` pointer hota, toh deep copy easy hai:
```typescript
// Simple copy (if only next existed)
while (original !== null) {
  newNode = new Node(original.val)
  // Connect next
  // Move forward
}
```

**But `random` pointer creates complexity:**
```
Problem: Random pointer kisi bhi node ko point kar sakta hai!

Original:  A → B → C → D
           ↓       ↑
           └───────┘

Copy:      A'→ B'→ C'→ D'
           ↓       ↑
           └───────┘

Question: When creating A', how do we know which NEW node
          A's random should point to?

At the time of creating A', we might not have created C' yet! 😱
```

**Core Challenge:**
- Need to maintain **mapping** between old nodes and new nodes
- Old node's random → New node's random

---

## 💡 Approaches

### Approach 1: HashMap (Two Pass)

**Intuition (Soch):**

Agar hum ek **mapping** bana lein: Old Node → New Node

Toh random pointers ko easily set kar sakte hain!

**Key Idea:**
```
Pass 1: Create all new nodes and store mapping
  HashMap: old node → new node

Pass 2: Set next and random pointers using HashMap
  newNode.next = map[oldNode.next]
  newNode.random = map[oldNode.random]
```

**Visual Example:**
```
Original: 7 → 13 → 11
          ↓    ↓
          null  7

Step 1: Create nodes and mapping
HashMap:
  7  → 7'
  13 → 13'
  11 → 11'

Step 2: Set pointers
7'.next = HashMap[7.next] = HashMap[13] = 13' ✓
7'.random = HashMap[7.random] = HashMap[null] = null ✓

13'.next = HashMap[13.next] = HashMap[11] = 11' ✓
13'.random = HashMap[13.random] = HashMap[7] = 7' ✓

11'.next = HashMap[11.next] = null ✓
11'.random = null ✓
```

**Algorithm:**
```
1. Create HashMap: old node → new node

2. Pass 1 - Create all new nodes:
   current = head
   while current !== null:
     newNode = new Node(current.val)
     map[current] = newNode
     current = current.next

3. Pass 2 - Set pointers:
   current = head
   while current !== null:
     newNode = map[current]
     newNode.next = map[current.next]
     newNode.random = map[current.random]
     current = current.next

4. Return map[head]
```

**Time Complexity:** O(n)
- Pass 1: O(n) - create all nodes
- Pass 2: O(n) - set all pointers
- Total: O(2n) = O(n)

**Space Complexity:** O(n)
- HashMap stores n entries
- n new nodes (copy)

**Pros:**
- ✅ Easy to understand
- ✅ Straightforward implementation
- ✅ Clear separation of concerns

**Cons:**
- ❌ Uses O(n) extra space for HashMap
- ❌ Two passes through list

---

### Approach 2: Optimal (Interweaving / Weaving)

**Intuition (Soch):**

Kya hum HashMap ke **bina** mapping maintain kar sakte hain?

**Genius Idea:** 💡

Agar hum **new nodes** ko **original list mein hi** insert kar dein?

```
Original: A → B → C

After Weaving: A → A' → B → B' → C → C'

Now: A' is ALWAYS right after A!
     B' is ALWAYS right after B!

Mapping: oldNode.next = newNode! ✅
```

**This eliminates need for HashMap!** 🚀

**Visual Example:**
```
Original List:
7 → 13 → 11
↓    ↓
null  7

Step 1: Interweave new nodes
7 → 7' → 13 → 13' → 11 → 11'

Step 2: Set random pointers
For 7':
  7.random = null → 7'.random = null

For 13':
  13.random = 7 → 7'.random = 7.next = 7' ✓

For 11':
  11.random = null → 11'.random = null

Step 3: Separate lists
Original: 7 → 13 → 11
Copy:     7' → 13' → 11'
```

**Algorithm:**
```
STEP 1: Interweave - Insert new nodes after originals
  A → B → C
  becomes
  A → A' → B → B' → C → C'

STEP 2: Set random pointers
  For each original node:
    if original.random !== null:
      newNode.random = original.random.next
    else:
      newNode.random = null

STEP 3: Separate lists
  Restore original list
  Extract copied list
```

**Detailed Steps:**
```
Step 1: Interweave
  current = head
  while current !== null:
    newNode = new Node(current.val)
    newNode.next = current.next
    current.next = newNode
    current = newNode.next

Step 2: Set random pointers
  current = head
  while current !== null:
    if current.random !== null:
      current.next.random = current.random.next
    current = current.next.next (skip copy node)

Step 3: Separate
  current = head
  copyHead = head.next
  copyCurrent = copyHead

  while current !== null:
    current.next = current.next.next
    if copyCurrent.next !== null:
      copyCurrent.next = copyCurrent.next.next
    current = current.next
    copyCurrent = copyCurrent.next

  return copyHead
```

**Time Complexity:** O(n)
- Step 1: O(n) - interweave
- Step 2: O(n) - set random
- Step 3: O(n) - separate
- Total: O(3n) = O(n)

**Space Complexity:** O(1)
- No HashMap needed!
- Only creating new nodes (which is required anyway)
- No extra space for mapping! ✅

**Pros:**
- ✅ O(1) extra space (no HashMap!)
- ✅ Clever and elegant
- ✅ Interview impressive!

**Cons:**
- ❌ More complex logic
- ❌ Temporarily modifies original list
- ❌ Need to carefully restore original list

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Passes | Interview Score |
|----------|----------------|------------------|--------|-----------------|
| **HashMap (Two Pass)** | O(n) | O(n) | 2 | ⭐⭐⭐⭐ Good |
| **Optimal (Interweaving)** | O(n) | O(1) | 3 | ⭐⭐⭐⭐⭐ Best |

**Which is better?**
- Agar **easy to understand** chahiye → HashMap
- Agar **space optimize** karna hai → Interweaving
- Agar **interview mein impress** karna hai → Interweaving (best!)

---

## 🎯 Detailed Example Walkthrough

**Input:** `[[7,null],[13,0],[11,4],[10,2],[1,0]]`

### HashMap Approach:

```
Step 1: Create HashMap
  Map: {
    Node(7) → Node'(7)
    Node(13) → Node'(13)
    Node(11) → Node'(11)
    Node(10) → Node'(10)
    Node(1) → Node'(1)
  }

Step 2: Set pointers
  Node'(7).next = Map[Node(13)] = Node'(13) ✓
  Node'(7).random = Map[null] = null ✓

  Node'(13).next = Map[Node(11)] = Node'(11) ✓
  Node'(13).random = Map[Node(7)] = Node'(7) ✓

  ... and so on
```

### Interweaving Approach:

```
Step 1: Interweave
  Original: 7 → 13 → 11 → 10 → 1
  After:    7 → 7' → 13 → 13' → 11 → 11' → 10 → 10' → 1 → 1'

Step 2: Set random pointers
  7.random = null → 7'.random = null
  13.random = 7 → 13'.random = 7.next = 7' ✓
  11.random = 1 → 11'.random = 1.next = 1' ✓
  10.random = 11 → 10'.random = 11.next = 11' ✓
  1.random = 7 → 1'.random = 7.next = 7' ✓

Step 3: Separate
  Original: 7 → 13 → 11 → 10 → 1
  Copy:     7' → 13' → 11' → 10' → 1'
```

---

## 🔍 Edge Cases

### Edge Case 1: Empty list
```
Input: null
Output: null

No nodes to copy
```

### Edge Case 2: Single node
```
Input: [[1,null]]
Output: [[1,null]]

One node with no random pointer
```

### Edge Case 3: Single node with self-loop
```
Input: [[1,0]]
Output: [[1,0]]

    ┌───┐
    │   ↓
    1 → null

Node points to itself!
```

### Edge Case 4: All random pointers null
```
Input: [[1,null],[2,null],[3,null]]
Output: [[1,null],[2,null],[3,null]]

No random connections (like normal linked list)
```

### Edge Case 5: Chain of random pointers
```
Input: [[1,1],[2,2],[3,0]]

1 → 2 → 3
│   │   │
└───┼───┘
    └───┘

Each node points to next node via random
```

---

## 🤔 Which Solution Do You Want to See?

**Recommendation:** Start with **HashMap approach** for understanding, then learn **Interweaving** for interviews!

1. **HashMap (Two Pass)** - Easy to understand, O(n) space
2. **Optimal (Interweaving)** - Clever solution, O(1) space ⭐

Batao kaunsa solution dekhna hai? 🚀