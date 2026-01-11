# Rotate List

## 📋 Problem Statement

**Difficulty:** Medium
**Source:** LeetCode

[rotate-list-leet-code](https://leetcode.com/problems/rotate-list/)

Given the head of a linked list, rotate the list to the **right** by **k** places.

**Samajhne ke liye (Understanding):**
- Linked list ko right side mein k places rotate karna hai
- Right rotation ka matlab: Last k nodes ko front mein le aao
- Example: [1,2,3,4,5], k=2
  - Last 2 nodes [4,5] ko front mein le aao
  - Result: [4,5,1,2,3]

**Important Points:**
- k can be larger than list length (handle with modulo!)
- Empty list → return null
- k = 0 or k = length → no rotation needed

**Constraints:**
- 0 <= Number of nodes <= 500
- -100 <= Node.val <= 100
- 0 <= k <= 2 × 10^9 (k can be VERY large!)

---

## 💡 Approaches

### Approach 1: Brute Force (Rotate One by One)

**Intuition (Soch):**

Sabse simple approach: Ek baar mein ek rotation karo, isse k baar repeat karo.

Ek rotation ka matlab:
- Last node ko front mein le aao
- Remaining list uske peeche rahegi

**Visual Example:**
```
Input: [1,2,3,4,5], k = 2

Rotation 1: Move last node (5) to front
  Before: 1 → 2 → 3 → 4 → 5 → null
  After:  5 → 1 → 2 → 3 → 4 → null

Rotation 2: Move last node (4) to front
  Before: 5 → 1 → 2 → 3 → 4 → null
  After:  4 → 5 → 1 → 2 → 3 → null

Result: [4,5,1,2,3] ✅
```

**Algorithm:**
1. Repeat k times:
   - Find second-to-last node
   - Move last node to front
2. Return new head

**Time Complexity:** O(k × n)
- Har rotation mein puri list traverse karni padti hai: O(n)
- k rotations: O(k × n)
- Agar k = n, toh O(n²) 😱

**Space Complexity:** O(1)

**Drawback:**
- Bahut slow for large k
- k can be 2×10^9, aur n can be 500 → 10^12 operations! 😱

---

### Approach 2: Optimal (Make Circular, Then Break)

**Intuition (Soch):**

Smart approach! Ek clever observation:
- Agar list ki length n hai, toh k rotations = k % n effective rotations
- Example: length=5, k=7 → 7%5 = 2 rotations (same as k=2)

**Key Insight:**
Right rotation by k = Left rotation by (n - k)

Visual understanding:
```
[1,2,3,4,5], k = 2 (rotate right by 2)
= Take last 2 nodes [4,5] and move to front
= [4,5,1,2,3]

Alternative view:
= Break after (n-k)th node
= Break after (5-2) = 3rd node
= [1,2,3] | [4,5]
= Reconnect: [4,5] → [1,2,3]
```

**Smart Technique:**
1. Make the list circular (connect tail to head)
2. Find the new breaking point (after n-k nodes)
3. Break the circle at that point

**Visual Example:**
```
Input: [1,2,3,4,5], k = 2

Step 1: Calculate effective rotations
  length = 5
  k = 2
  effective k = 2 % 5 = 2

Step 2: Find breaking point
  Need to break after (n - k) = 5 - 2 = 3 nodes
  Breaking point: After node 3

Step 3: Make circular
  1 → 2 → 3 → 4 → 5 → (back to 1)
  └─────────────────┘

Step 4: Navigate to breaking point (node 3)
  1 → 2 → 3 → 4 → 5 → 1
          ↑
      Break here

Step 5: Break the circle
  newHead = 4
  3.next = null

Result: 4 → 5 → 1 → 2 → 3 → null ✅
```

**Algorithm:**

```
1. Handle edge cases:
   - If head is null or k = 0: return head
   - If single node: return head

2. Calculate length and find tail:
   - Traverse list to get length
   - Keep reference to tail node

3. Calculate effective rotations:
   - k = k % length
   - If k = 0: return head (no rotation needed)

4. Make list circular:
   - tail.next = head

5. Find new tail position:
   - New tail will be at position (length - k - 1)
   - Traverse to that position

6. Break the circle:
   - newHead = newTail.next
   - newTail.next = null

7. Return newHead
```

**Detailed Steps:**
```
Example: [1,2,3,4,5], k = 2

Step 1: Calculate length
  length = 5
  tail = node 5

Step 2: Effective k
  k = 2 % 5 = 2
  (Not 0, so rotation needed)

Step 3: Make circular
  5.next = 1
  1 → 2 → 3 → 4 → 5 → 1 (circular)

Step 4: Find new tail
  New tail position = length - k - 1 = 5 - 2 - 1 = 2
  So new tail = node at index 2 = node 3

  Navigate from head:
  Start: node 1
  Step 1: node 2
  Step 2: node 3 ← NEW TAIL

Step 5: Break circle
  newHead = newTail.next = 3.next = 4
  newTail.next = null → 3.next = null

Step 6: Result
  4 → 5 → 1 → 2 → 3 → null ✅
```

**Time Complexity:** O(n)
- Calculate length: O(n)
- Navigate to breaking point: O(n) worst case
- Total: O(n)

**Space Complexity:** O(1)
- Only using pointers

**Why This is OPTIMAL:**
- Single pass to find length
- Single pass to find breaking point
- No matter how large k is, we use k % n
- O(n) time, O(1) space ✅

---

## 🎯 Detailed Example Walkthrough

**Example 1:** head = [1,2,3,4,5], k = 2

```
Initial:
  1 → 2 → 3 → 4 → 5 → null
  ↑               ↑
  head            tail

Step 1: Calculate length and find tail
  length = 5
  tail = 5

Step 2: Calculate effective k
  k = 2 % 5 = 2

Step 3: Make circular
  5.next = 1
  Circle: 1 → 2 → 3 → 4 → 5 → 1

Step 4: Find new tail
  Position = length - k - 1 = 5 - 2 - 1 = 2
  Navigate 2 steps from head:
    Start: 1
    Step 1: 2
    Step 2: 3 ← NEW TAIL

Step 5: Break circle
  newHead = 3.next = 4
  3.next = null

Result: 4 → 5 → 1 → 2 → 3 → null ✅
```

**Example 2:** head = [0,1,2], k = 4

```
Initial:
  0 → 1 → 2 → null

Step 1: Calculate length
  length = 3
  tail = 2

Step 2: Calculate effective k
  k = 4 % 3 = 1
  (Only 1 rotation needed, not 4!)

Step 3: Make circular
  2.next = 0
  Circle: 0 → 1 → 2 → 0

Step 4: Find new tail
  Position = length - k - 1 = 3 - 1 - 1 = 1
  Navigate 1 step from head:
    Start: 0
    Step 1: 1 ← NEW TAIL

Step 5: Break circle
  newHead = 1.next = 2
  1.next = null

Result: 2 → 0 → 1 → null ✅
```

---

## 🔍 Edge Cases to Consider

### Edge Case 1: Empty list
```
Input: null, k = 5
Output: null

No nodes to rotate
```

### Edge Case 2: Single node
```
Input: [1], k = 100
Output: [1]

Single node, rotation doesn't change anything
```

### Edge Case 3: k = 0
```
Input: [1,2,3], k = 0
Output: [1,2,3]

No rotation needed
```

### Edge Case 4: k = length
```
Input: [1,2,3,4,5], k = 5
Output: [1,2,3,4,5]

k % length = 5 % 5 = 0
Full rotation brings back to original
```

### Edge Case 5: k > length
```
Input: [1,2,3], k = 10
Output: [1,2,3]

k % length = 10 % 3 = 1
Rotate right by 1: [3,1,2]

Wait, let me recalculate:
k = 10, length = 3
Effective k = 10 % 3 = 1
Right rotation by 1: Last 1 node to front
[1,2,3] → [3,1,2] ✅
```

### Edge Case 6: k is VERY large (2×10^9)
```
Input: [1,2,3,4,5], k = 2000000002
Output: ?

length = 5
Effective k = 2000000002 % 5 = 2
Same as k = 2 → [4,5,1,2,3] ✅

This is why modulo is CRITICAL!
```

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Difficulty | Interview Preference |
|----------|----------------|------------------|------------|---------------------|
| Brute Force (One by One) | O(k × n) | O(1) | Easy | ❌ Too slow for large k |
| Optimal (Circular) | O(n) | O(1) | Medium | ✅ Best approach! |

---

## 📌 Summary

| Aspect | Details |
|--------|---------|
| **Core Technique** | Make circular → Find break point → Break circle |
| **Key Insight** | Right rotate k = Break after (n - k) nodes |
| **Critical Step** | k = k % length (handles k > n) |
| **Time Complexity** | O(n) - Two passes max |
| **Space Complexity** | O(1) - Only pointers |
| **Edge Cases** | Empty, single node, k=0, k>=n |

---

## 🤔 Which Solution Do You Want to See?

**Recommendation:** Go directly to the **optimal solution** (circular approach):
- O(n) time, O(1) space
- Handles all edge cases including very large k
- Clean and elegant algorithm

Batao kaunsa solution dekhna hai? (Tell me which solution to see?)
- **brute** - Brute Force (rotate one by one)
- **optimal** - Optimal (Make circular, then break)

---

## ✅ Implemented Solutions

### 1. Brute Force (Rotate One by One) - `brute-force.ts`

**Approach:** Perform one rotation at a time, repeat k times

**Intuition:**
Ek rotation kaise hota hai?
- Last node ko dhoodho (Find last node)
- Last node ko front mein le aao (Move to front)
- Second-to-last ka next = null karo (Break link)
- Isse k baar repeat karo!

**Visual Example (Single Rotation):**
```
Before: 1 → 2 → 3 → 4 → 5 → null
                ↑       ↑
          second-to   last
             last

Action:
- 5.next = 1 (connect last to head)
- 4.next = null (break old link)
- head = 5 (update head)

After: 5 → 1 → 2 → 3 → 4 → null
```

**Algorithm Flow:**
1. Handle edge cases (empty, single node, k=0)
2. Repeat k times:
   - Find second-to-last and last nodes
   - Move last node to front
   - Update head
3. Return head

**Helper Function: rotateOnce()**
- Traverses list to find second-to-last and last
- Performs pointer manipulation for one rotation
- Returns new head

**Comprehensive Dry Run:**
- Complete 2-rotation walkthrough for [1,2,3,4,5], k=2
- Shows traversal in each rotation to find last node
- Pointer movements: last.next = head, secondToLast.next = null
- 3 edge cases with quick verification

**Time Complexity Analysis:**
```
k=2, n=5: 2 rotations × 4 traversals = 8 operations
k=5, n=5: 5 rotations × 4 traversals = 20 operations
  → Result is same as input! Wasted work! 😱

k=1000, n=5: 1000 rotations × 4 traversals = 4000 operations
  → Effective k = 1000 % 5 = 0 (NO rotation needed!)
  → But did 4000 operations! 😱😱

k=2×10^9, n=5: 2 billion rotations
  → Would take hours/days! 😱😱😱
```

**7 Test Cases:**
1. ✅ [1,2,3,4,5], k=2 → [4,5,1,2,3] (Example 1)
2. ✅ [0,1,2], k=4 → [2,0,1] (Example 2, k > n but no optimization)
3. ✅ [1,2,3], k=0 → [1,2,3] (No rotation)
4. ✅ [1], k=100 → [1] (Single node)
5. ✅ null, k=5 → null (Empty list)
6. ✅ [1,2,3,4,5], k=5 → [1,2,3,4,5] (Full rotation, back to original)
7. ✅ [1,2], k=1 → [2,1] (Two nodes)

**Files:**
- Implementation: `brute-force.ts`
- Namespace: `RotateListBruteForce`
- Helper: rotateOnce(head)

**Why This is NOT Optimal:**
- ❌ O(k × n) time - Very slow for large k
- ❌ Doesn't use k % length optimization
- ❌ Repeats work unnecessarily when k > n
- ❌ k can be 2×10^9 → Impractical!
- ✅ BUT: Easy to understand and implement

**Key Learning:**
This approach demonstrates importance of:
1. Mathematical optimization (k % n)
2. Avoiding redundant work
3. Understanding constraints (k can be huge!)

**When to use:**
- Good for explaining the problem
- Shows basic approach before optimization
- Small k values only (k < 100)

---

### 2. Optimal (Make Circular, Then Break) - `optimal.ts`

**Approach:** Make list circular, find break point using k % n, then break the circle

**Intuition:**
Smart observation hai: Right rotation by k = Break list after (n - k) nodes
- Agar hum list ko circular bana dein, phir sahi jagah pe break karein, toh ek hi pass mein solve!
- Mathematical optimization: k rotations = (k % n) rotations
- Example: length=5, k=7 → 7%5 = 2 (same as k=2)

**Visual Example:**
```
Input: [1,2,3,4,5], k = 2

Step 1: Calculate effective k
  length = 5, k = 2 % 5 = 2

Step 2: Make circular
  1 → 2 → 3 → 4 → 5 → (back to 1)
  └─────────────────┘

Step 3: Find new tail (at position length - k - 1 = 2)
  Navigate to node 3

Step 4: Break circle
  newHead = 4, 3.next = null

Result: 4 → 5 → 1 → 2 → 3 → null ✅
```

**Algorithm Flow:**
1. Handle edge cases (empty, single node, k=0)
2. Calculate length and find tail
3. Calculate effective k using modulo: `k = k % length`
4. If k = 0, return head (no rotation needed)
5. Make list circular: `tail.next = head`
6. Navigate to new tail position: `length - k - 1`
7. Break circle: `newHead = newTail.next`, `newTail.next = null`
8. Return newHead

**Key Function: rotateRight()**
- Uses k % length to avoid unnecessary rotations
- Makes list circular temporarily
- Finds breaking point using formula
- Breaks circle to form final result

**Comprehensive Dry Run:**
- Complete walkthrough for [1,2,3,4,5], k=2
- Shows length calculation with 4 iterations
- Modulo optimization: k = 2 % 5 = 2
- Circular list creation: 5.next = 1
- Navigation to new tail at position 2 (node 3)
- Circle breaking: newHead = 4, 3.next = null
- Example 2: [0,1,2], k=4 → k%3 = 1 (only 1 rotation!)
- Edge case: k=2×10^9 → k%5 = 2 (handles extreme k!)

**Time Complexity Analysis:**
```
Example: [1,2,3,4,5], k = 2×10^9

Without modulo:
  Time: O(k × n) = 2×10^9 × 4 operations
  Would take: Hours/Days! 😱

With modulo:
  Calculate k % n: 2×10^9 % 5 = 2
  Time: O(n) = ~10 operations
  Takes: Milliseconds ⚡
  800 million times faster! 🚀
```

**9 Test Cases:**
1. ✅ [1,2,3,4,5], k=2 → [4,5,1,2,3] (Example 1)
2. ✅ [0,1,2], k=4 → [2,0,1] (Example 2, k > n with optimization)
3. ✅ [1,2,3], k=0 → [1,2,3] (No rotation)
4. ✅ [1], k=100 → [1] (Single node)
5. ✅ null, k=5 → null (Empty list)
6. ✅ [1,2,3,4,5], k=5 → [1,2,3,4,5] (k = length, k%5 = 0)
7. ✅ [1,2], k=1 → [2,1] (Two nodes)
8. ✅ [1,2,3], k=1000 → [3,1,2] (k >> length, k%3 = 1)
9. ✅ [1,2,3,4,5], k=2×10^9 → [4,5,1,2,3] (Extreme k with performance timing!)

**Files:**
- Implementation: `optimal.ts`
- Namespace: `RotateListOptimal`
- Key optimization: k % length before any rotation

**Why This is OPTIMAL:**
- ✅ O(n) time - Independent of k size!
- ✅ O(1) space - Only pointers used
- ✅ Uses k % n mathematical optimization
- ✅ Handles ANY k (even 2×10^9) efficiently
- ✅ Single pass for length calculation
- ✅ Single pass to find breaking point
- ✅ Elegant circular list technique

**Key Learning:**
This approach demonstrates:
1. Mathematical optimization is crucial (k % n)
2. Understanding constraints matters (k can be 2×10^9)
3. Circular list is a powerful technique
4. O(n) is achievable regardless of k

**When to use:**
- ✅ Interview favorite - shows mathematical thinking
- ✅ Production code - handles all edge cases efficiently
- ✅ ANY value of k - even extreme values
- ✅ Best time complexity: O(n)

---

## 🏆 Final Recommendation

**Use the Optimal Solution (optimal.ts):**
- O(n) time complexity regardless of k
- O(1) space complexity
- Handles all edge cases including k = 2×10^9
- Clean, elegant algorithm using circular list technique
- Interview-ready with complete dry run and explanation

The key insight: **k % length** transforms this from a potentially O(k×n) problem into an O(n) problem! 🚀