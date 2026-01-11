# Reverse Nodes in k-Group

## 📋 Problem Statement

**Difficulty:** Hard
**Source:** LeetCode

[reverse-nodes-leet-code](https://leetcode.com/problems/reverse-nodes-in-k-group/)

Given the head of a linked list, reverse the nodes of the list **k at a time**, and return the modified list.

**k** is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k, then left-out nodes in the end should **remain as it is**.

You may **not alter the values** in the list's nodes, only nodes themselves may be changed.

**Samajhne ke liye (Understanding):**
- Linked list diye gaye hai, isko **k nodes ke groups** mein reverse karna hai
- Agar end mein k se kam nodes bache, toh unhe as-is chhodna hai (reverse nahi karna)
- **Important:** Node values change nahi kar sakte, sirf pointers change kar sakte hain
- Example: [1,2,3,4,5], k=2 → [2,1,4,3,5]
  - First group (1,2) → reversed to (2,1)
  - Second group (3,4) → reversed to (4,3)
  - Last node (5) → remains as is (only 1 node left, less than k)

**Constraints:**
- 1 <= k <= n <= 5000
- 0 <= Node.val <= 1000
- n = number of nodes in the list

**Follow-up:** Can you solve it in **O(1) extra space**?

---

## 💡 Approaches

### Approach 1: Brute Force (Using Array)

**Intuition (Soch):**

Sabse simple approach: Pehle saare nodes ko ek array mein store karo, phir k-size ke groups mein reverse karo, aur phir wapas linked list bana do.

Lekin ye approach zyada space use karega (O(n)) aur problem mein clearly likha hai ki O(1) space mein solve karna hai. Isliye ye optimal nahi hai.

**Algorithm:**
1. Saare nodes ko array mein store karo
2. Array ko k-size groups mein reverse karo
3. Array se wapas linked list banao

**Time Complexity:** O(n)
**Space Complexity:** O(n) - Array storage
**Drawback:** Extra space use ho raha hai, optimal nahi hai

---

### Approach 2: Optimal (In-place Reversal with Pointer Manipulation)

**Intuition (Soch):**

Real solution yeh hai ki hum **in-place reversal** karein - bina extra space use kiye, sirf pointers ko manipulate karke.

**Key Insight:**
Ye problem teen chhote problems ka combination hai:
1. **Check karo** ki aage k nodes hain ya nahi
2. Agar hain, toh us **group ko reverse** karo (standard linked list reversal)
3. **Connect** karo reversed group ko previous aur next groups ke saath

**Visual Example:**

```
Input: 1 → 2 → 3 → 4 → 5 → null, k = 2

Step-by-step breakdown:

Initial:
  1 → 2 → 3 → 4 → 5 → null
  ↑
  head

Group 1: [1, 2]
--------------
Before reversal:
  1 → 2 → 3 → 4 → 5 → null
  ↑   ↑
  1   2

Reverse [1, 2]:
  2 → 1 → 3 → 4 → 5 → null
  ↑       ↑
  new     next group
  head    starts here

Group 2: [3, 4]
--------------
Before reversal:
  2 → 1 → 3 → 4 → 5 → null
          ↑   ↑
          3   4

Reverse [3, 4] and connect:
  2 → 1 → 4 → 3 → 5 → null
      ↑       ↑   ↑
      prev    rev next

Group 3: [5]
-----------
Only 1 node left, k=2, so don't reverse
Leave as is

Final Result:
  2 → 1 → 4 → 3 → 5 → null
```

**Detailed Visual Example with k=3:**

```
Input: 1 → 2 → 3 → 4 → 5 → null, k = 3

Initial state:
  1 → 2 → 3 → 4 → 5 → null
  ↑
  head

Step 1: Check if we have k=3 nodes
  Count: 1, 2, 3 ✅ (We have 3 nodes)

Step 2: Reverse first k=3 nodes [1, 2, 3]

Before:
  1 → 2 → 3 → 4 → 5 → null

During reversal (like standard LL reversal):
  Iteration 1: null ← 1   2 → 3 → 4 → 5
  Iteration 2: null ← 1 ← 2   3 → 4 → 5
  Iteration 3: null ← 1 ← 2 ← 3   4 → 5

After:
  3 → 2 → 1 → 4 → 5 → null
  ↑           ↑
  new head    tail of reversed group

Step 3: Move to next group, check if we have k=3 nodes
  Starting from 4: 4, 5 (only 2 nodes)
  2 < 3, so DON'T reverse ❌
  Leave as is

Final Result:
  3 → 2 → 1 → 4 → 5 → null
```

**Algorithm:**

```
Main Function: reverseKGroup(head, k)
1. Use dummy node (makes handling edge cases easier)
2. Initialize pointers:
   - prevGroupTail = dummy (tracks tail of previous reversed group)

3. Loop while there are nodes:
   a. Check if k nodes are available ahead
      - If NO: break (remaining nodes stay as is)
      - If YES: continue to reversal

   b. Reverse current k-group:
      - Store groupStart and groupEnd
      - Reverse the k nodes (standard reversal)
      - groupStart becomes tail, groupEnd becomes head after reversal

   c. Connect reversed group:
      - prevGroupTail.next = new head of reversed group
      - tail of reversed group.next = next group's start

   d. Update pointers:
      - prevGroupTail = tail of current reversed group
      - Move to next group

4. Return dummy.next

Helper Function: reverseLinkedList(start, end)
1. Standard linked list reversal for nodes from start to end
2. Return new head (which was end before reversal)
```

**Key Points:**
1. **Dummy Node:** Makes it easier to handle the first group (no special case needed)
2. **Check Count:** Before reversing, verify k nodes exist
3. **Standard Reversal:** Use standard LL reversal logic for each group
4. **Connection:** After reversing, connect to previous and next parts carefully

**Time Complexity:** O(n)
- Har node ko exactly ek baar visit karte hain
- Reversal operation O(k) hai, aur n/k groups hain
- Total: O(k × n/k) = O(n)

**Space Complexity:** O(1)
- Sirf pointers use kar rahe hain (prev, curr, next)
- Koi extra data structure nahi (no array, no recursion stack if iterative)
- **This satisfies the follow-up requirement!** ✅

---

## 🔍 Detailed Example Walkthrough

**Example:** head = [1,2,3,4,5], k = 2

```
Initial Setup:
  dummy → 1 → 2 → 3 → 4 → 5 → null
  ↑
  prevGroupTail

═══════════════════════════════════════════════════════════
GROUP 1: Nodes [1, 2]
═══════════════════════════════════════════════════════════

Step 1: Check if 2 nodes available
  Current: 1
  Count: 1, 2 ✅ (2 nodes found)

Step 2: Mark group boundaries
  groupStart = 1
  groupEnd = 2

Step 3: Reverse [1, 2]
  Before: 1 → 2 → 3
  After:  2 → 1 → 3

  New head of group: 2
  New tail of group: 1

Step 4: Connect to previous and next
  prevGroupTail (dummy).next = 2
  groupTail (1).next = 3

  Result: dummy → 2 → 1 → 3 → 4 → 5 → null

Step 5: Update pointers
  prevGroupTail = 1 (tail of reversed group)
  current = 3 (start of next group)

═══════════════════════════════════════════════════════════
GROUP 2: Nodes [3, 4]
═══════════════════════════════════════════════════════════

Step 1: Check if 2 nodes available
  Current: 3
  Count: 3, 4 ✅ (2 nodes found)

Step 2: Mark group boundaries
  groupStart = 3
  groupEnd = 4

Step 3: Reverse [3, 4]
  Before: 3 → 4 → 5
  After:  4 → 3 → 5

  New head of group: 4
  New tail of group: 3

Step 4: Connect to previous and next
  prevGroupTail (1).next = 4
  groupTail (3).next = 5

  Result: dummy → 2 → 1 → 4 → 3 → 5 → null

Step 5: Update pointers
  prevGroupTail = 3 (tail of reversed group)
  current = 5 (start of next group)

═══════════════════════════════════════════════════════════
GROUP 3: Nodes [5]
═══════════════════════════════════════════════════════════

Step 1: Check if 2 nodes available
  Current: 5
  Count: 5 (only 1 node, need 2)
  1 < 2 ❌ (Not enough nodes)

Step 2: STOP - Don't reverse, leave as is

Final Result:
  dummy → 2 → 1 → 4 → 3 → 5 → null

  Return dummy.next = 2 → 1 → 4 → 3 → 5 → null ✅
```

---

## 🎯 Edge Cases to Consider

### Edge Case 1: k = 1 (No reversal needed)
```
Input: [1,2,3,4,5], k = 1
Output: [1,2,3,4,5]

Explanation: Each group has 1 node, reversing single node = no change
```

### Edge Case 2: k = n (Reverse entire list)
```
Input: [1,2,3,4,5], k = 5
Output: [5,4,3,2,1]

Explanation: One group of 5 nodes, reverse the entire list
```

### Edge Case 3: Empty list
```
Input: null, k = 2
Output: null

Explanation: No nodes to reverse
```

### Edge Case 4: Single node
```
Input: [1], k = 1
Output: [1]

Explanation: Single node, k=1, no change
```

### Edge Case 5: k larger than list (but within constraints)
```
Input: [1,2], k = 3
Output: [1,2]

Explanation: Only 2 nodes, need 3 for reversal, leave as is
```

### Edge Case 6: Exact multiple of k
```
Input: [1,2,3,4], k = 2
Output: [2,1,4,3]

Explanation: Perfect groups, all reversed
```

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Difficulty | Interview Preference |
|----------|----------------|------------------|------------|---------------------|
| Brute Force (Array) | O(n) | O(n) | Easy | ❌ Not optimal space |
| Optimal (In-place) | O(n) | O(1) | Hard | ✅ Best - Satisfies follow-up! |

---

## 📌 Summary

| Aspect | Details |
|--------|---------|
| **Core Technique** | In-place reversal with pointer manipulation |
| **Key Challenge** | Connecting reversed groups properly |
| **Time Complexity** | O(n) - Single pass |
| **Space Complexity** | O(1) - Only pointers |
| **Critical Steps** | 1. Check k nodes exist<br>2. Reverse group<br>3. Connect to prev/next |
| **Edge Cases** | k=1, k=n, remaining < k, empty list |

---

## 🤔 Which Solution Do You Want to See?

This problem has one **optimal approach** (in-place reversal):

**Solution: In-place Reversal with Pointer Manipulation**
- O(1) space - satisfies follow-up requirement
- Complete implementation with detailed dry run
- All edge cases covered
- Test cases included

Batao kya main implementation create karu? (Tell me, should I create the implementation?)

---

## ✅ Implemented Solutions

### 1. Brute Force (Using Array) - `brute-force.ts`

**Approach:** Convert list to array → Reverse k-sized groups → Rebuild list

**Intuition:**
- Avoid linked list complexity by using array
- Array reversal is much simpler (just swap elements)
- After reversing groups in array, rebuild the linked list

**Algorithm Flow:**
1. **Phase 1:** Convert linked list to array of nodes
2. **Phase 2:** Reverse k-sized groups in array using two-pointer
3. **Phase 3:** Rebuild linked list by updating next pointers
4. **Phase 4:** Return new head

**How Groups are Reversed:**
```
Array: [1, 2, 3, 4, 5], k = 2

Group 1 (indices 0-1):
  Before: [1, 2, 3, 4, 5]
  After:  [2, 1, 3, 4, 5]

Group 2 (indices 2-3):
  Before: [2, 1, 3, 4, 5]
  After:  [2, 1, 4, 3, 5]

Remaining (index 4): Leave as is
```

**Comprehensive Dry Run:**
- Complete 3-phase visualization for [1,2,3,4,5], k=2
- Shows array conversion process
- Two-pointer reversal technique for each group
- Linked list reconstruction from array
- 3 detailed edge cases:
  - k=3: [1,2,3,4,5] → [3,2,1,4,5]
  - k=1: No reversal (early return)
  - k=n: Reverse entire list

**7 Test Cases:**
1. ✅ [1,2,3,4,5], k=2 → [2,1,4,3,5] (Example 1)
2. ✅ [1,2,3,4,5], k=3 → [3,2,1,4,5] (Example 2)
3. ✅ [1,2,3,4,5], k=1 → [1,2,3,4,5] (No reversal)
4. ✅ [1,2,3,4,5], k=5 → [5,4,3,2,1] (Reverse entire)
5. ✅ [1], k=1 → [1] (Single node)
6. ✅ [1,2,3,4], k=2 → [2,1,4,3] (Exact multiple)
7. ✅ [1,2], k=3 → [1,2] (k > remaining)

**Files:**
- Implementation: `brute-force.ts`
- Namespace: `ReverseKGroupBruteForce`
- Helper functions: createList(), listToArray(), printList()

**Why This is NOT Optimal:**
- ❌ Uses O(n) extra space for array storage
- ❌ Follow-up asks for O(1) space
- ❌ Not utilizing linked list structure properly
- ✅ BUT: Easy to understand and implement!

**When to use:**
- Good starting point to explain thought process
- Shows you can solve the problem
- Interview warm-up before optimal solution
- Small lists where memory is not a concern

---

### 2. Optimal (In-place Reversal with Pointer Manipulation) - `optimal.ts`

**Approach:** Three sub-problems: Check k nodes → Reverse group → Connect groups

**Intuition:**
Ye problem teen chhote problems ka combination hai:
1. **Check:** Aage k nodes hain? (Count ahead)
2. **Reverse:** Agar hain, toh reverse karo (Standard LL reversal)
3. **Connect:** Reversed group ko previous aur next se connect karo

**Visual Example:**
```
Input: 1 → 2 → 3 → 4 → 5, k=2

Group 1: Check [1,2] ✅ → Reverse
  Before: 1 → 2 → 3 → 4 → 5
  After:  2 → 1 → 3 → 4 → 5
          ↑   ↑   ↑
        head tail next

Group 2: Check [3,4] ✅ → Reverse
  Before: 2 → 1 → 3 → 4 → 5
  After:  2 → 1 → 4 → 3 → 5

Group 3: Check [5] ❌ → Only 1 node, leave as is

Final: [2,1,4,3,5] ✅
```

**Algorithm Flow:**
1. **Setup:** Create dummy node, prevGroupEnd = dummy
2. **Loop** while nodes exist:
   - **Count k nodes:** If less than k, break
   - **Save pointers:** groupStart, groupEnd, nextGroupStart
   - **Reverse group:** Standard linked list reversal
   - **Connect:**
     - prevGroupEnd.next = groupEnd (new head)
     - groupStart.next = nextGroupStart
   - **Update:** Move prevGroupEnd and current forward
3. **Return:** dummy.next

**Key Technique - Dummy Node:**
```
Without dummy: Special case for first group
With dummy:    Uniform handling for all groups

dummy → 1 → 2 → 3 → 4 → 5
↑       ↑
prev    current

After reversing [1,2]:
dummy → 2 → 1 → 3 → 4 → 5
        ↑   ↑   ↑
      new  old  next
```

**Comprehensive Dry Run:**
- Complete 2-group visualization for [1,2,3,4,5], k=2
- Shows pointer movements during reversal:
  - Inside reverseLinkedList: prev, curr, next tracking
  - Connection step with exact pointer updates
- 3 detailed edge cases:
  - k=3: [1,2,3,4,5] → [3,2,1,4,5]
  - k=1: Early return, no reversal
  - k=n: Reverse entire list

**8 Test Cases:**
1. ✅ [1,2,3,4,5], k=2 → [2,1,4,3,5] (Example 1)
2. ✅ [1,2,3,4,5], k=3 → [3,2,1,4,5] (Example 2)
3. ✅ [1,2,3,4,5], k=1 → [1,2,3,4,5] (No reversal)
4. ✅ [1,2,3,4,5], k=5 → [5,4,3,2,1] (Reverse entire)
5. ✅ [1], k=1 → [1] (Single node)
6. ✅ [1,2,3,4], k=2 → [2,1,4,3] (Exact multiple)
7. ✅ [1,2], k=3 → [1,2] (k > remaining)
8. ✅ [1,2,3,4,5,6,7,8,9], k=3 → [3,2,1,6,5,4,9,8,7] (Multiple groups)

**Files:**
- Implementation: `optimal.ts`
- Namespace: `ReverseKGroupOptimal`
- Helper: reverseLinkedList(start, end)

**Why This is OPTIMAL:**
1. ✅ O(1) space - **Satisfies follow-up requirement!** 🏆
2. ✅ O(n) time - Each node visited once
3. ✅ In-place manipulation - No extra structures
4. ✅ Handles all edge cases naturally
5. ✅ Scalable to very large lists

**Space Complexity Breakdown:**
```
Variables used:
- dummy: 1 node
- prevGroupEnd, current: 2 pointers
- checker, count: 2 variables
- groupStart, groupEnd, nextGroupStart: 3 pointers
- Inside reverseLinkedList: 4 pointers

Total: O(1) - Constant space! ✅
```

**Interview Tips:**
- Draw diagrams showing pointer movements
- Explain why dummy node simplifies code
- Walk through one complete group reversal
- Highlight O(1) space achievement
- Discuss connection step carefully (critical!)