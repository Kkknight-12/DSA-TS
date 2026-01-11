# Flatten a Linked List

**Difficulty:** Medium
**Source:** GeeksforGeeks
**Topics:** Linked List, Merge Sort, Recursion, Two Pointers

---

## 📋 Problem Statement

**Link:** [Flatten a Linked List - GeeksforGeeks](https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1)

Ek special linked list di gayi hai jisme har node mein **2 pointers** hain:
1. **`next`** → Horizontal direction mein next node ko point karta hai
2. **`bottom`** → Vertical direction mein ek sub-list ko point karta hai

**Key Points:**
- Har **vertical sub-list sorted** hai (ascending order)
- **Horizontal main list bhi sorted** hai (ascending order)
- Tumhe **flatten** karna hai - saare nodes ko **single level** mein laana hai using `bottom` pointers
- **Final result bhi sorted** hona chahiye (ascending order)

**Visual Understanding:**

```
Original Structure (2D):

        ↓ represents bottom pointer
        → represents next pointer

5 → 10 → 19 → 28
↓    ↓    ↓    ↓
7    20   22   40
↓         ↓    ↓
8         45   45
↓
30

Flattened Structure (1D using bottom pointers):

5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40 → 45 → null
(All connected via bottom pointers)
```

**Samajhne ke liye (Understanding):**
- Yeh 2D linked list hai - horizontal aur vertical dono directions
- Har vertical chain already sorted hai
- Horizontal chain bhi sorted hai
- Hume sabko ek single sorted chain mein convert karna hai

---

### Example 1:

**Input:**
```
5 → 10 → 19 → 28
↓    ↓    ↓    ↓
7    20   22   40
↓              ↓
8              45
↓
30
```

**Output:**
```
5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 40 → 45
```

**Explanation:**
- Starting from 5, we merge all vertical and horizontal chains
- Final list is completely sorted
- All nodes connected using `bottom` pointers

---

### Example 2:

**Input:**
```
5 → 10 → 19 → 28
↓    ↓    ↓    ↓
7    20   22   50
↓
8
↓
30
```

**Output:**
```
5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30 → 50
```

---

### Constraints:
- `0 <= number of nodes <= 50`
- `1 <= node.data <= 10^3`
- Each vertical sub-list is sorted in ascending order
- Horizontal list is sorted in ascending order

---

## 🔧 Core Challenge

**Main Problem:**

Agar sirf ek list hoti, toh simple traversal kar sakte:
```typescript
// Simple case - only one vertical list
while (current !== null) {
  current = current.bottom;
}
```

**But multiple sorted lists creates complexity:**
```
Problem: Multiple sorted vertical chains ko merge karna hai!

List 1:  5 → 7 → 8 → 30
List 2:  10 → 20
List 3:  19 → 22
List 4:  28

Question: Inhe efficiently merge kaise karein?
```

**Core Challenge:**
- Need to maintain **sorted order** while flattening
- Multiple sorted lists ko merge karna hai efficiently
- `next` aur `bottom` pointers ko properly handle karna hai

---

## 💡 Approaches

### Approach 1: Brute Force (Collect & Sort)

**Prerequisites (Agar Koi Chahiye):**
- **Basic Array Operations**: Values ko collect karna aur sort karna
- **Why needed**: Hum saare values ko array mein store karke sort karenge

**Intuition (Soch):**

Sabse seedha tarika: Saare nodes ki values collect kar lo, sort kar lo, phir nayi sorted list bana lo!

```
Step 1: Collect all values
[5, 7, 8, 30, 10, 20, 19, 22, 28]

Step 2: Sort the array
[5, 7, 8, 10, 19, 20, 22, 28, 30]

Step 3: Create new linked list from sorted array
5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 30
```

**Algorithm:**
1. Traverse the entire 2D structure (horizontal and vertical)
2. Collect all node values in an array
3. Sort the array
4. Create a new linked list from sorted array using `bottom` pointers
5. Return the head of new list

**Time Complexity:** O(N log N)
- Collecting all values: O(N) where N = total nodes
- Sorting: O(N log N)
- Creating new list: O(N)
- **Total: O(N log N)**

**Space Complexity:** O(N)
- Array to store all values: O(N)
- Not optimal for space!

**Pros:**
✅ Very simple to understand and implement
✅ Easy to code
✅ No complex pointer manipulation

**Cons:**
❌ Uses O(N) extra space
❌ Not utilizing the fact that lists are already sorted
❌ Creates completely new nodes (or reuses with extra space)

---

### Approach 2: Better (Iterative Merge)

**Prerequisites (Agar Koi Chahiye):**
- **Merge Two Sorted Lists**: Do sorted linked lists ko merge karne ka algorithm
- **Why needed**: Hum ek-ek karke saari vertical lists ko merge karenge

**Intuition (Soch):**

Agar lists **already sorted** hain, toh **merge** operation use kar sakte hain!

**Key Insight:** 💡
Similar to merging K sorted arrays - merge them one by one!

```
Step 1: Take first two vertical lists
List1: 5 → 7 → 8 → 30
List2: 10 → 20

Merge them:
Result: 5 → 7 → 8 → 10 → 20 → 30

Step 2: Merge result with third list
Current: 5 → 7 → 8 → 10 → 20 → 30
List3: 19 → 22

Merge them:
Result: 5 → 7 → 8 → 10 → 19 → 20 → 22 → 30

Step 3: Continue for all lists...
```

**Algorithm:**
1. Start from the leftmost vertical list (first head)
2. Merge it with the next vertical list (head.next)
3. Continue merging result with next list until all lists are merged
4. Use standard "merge two sorted lists" logic for each merge
5. Return the final merged list

**Helper Function Needed:**
```typescript
function mergeTwoLists(a: Node, b: Node): Node {
  // Merge two sorted lists using bottom pointers
  // Similar to "Merge Two Sorted Lists" problem
}
```

**Time Complexity:** O(N * K)
- K = number of vertical lists (horizontal nodes)
- For each merge, we process O(N/K) nodes
- Merging first two: O(N/K + N/K) = O(2N/K)
- Merging with third: O(2N/K + N/K) = O(3N/K)
- ...
- Total: O(N + N + N + ... K times) = O(N * K)
- **Not optimal when K is large!**

**Space Complexity:** O(1)
- Only using pointers for merging
- No extra space for storing values ✅
- In-place merging

**Pros:**
✅ No extra space for storing values
✅ Utilizes the sorted property
✅ In-place merging

**Cons:**
❌ O(N * K) time - not optimal when K is large
❌ Repeated traversals of merged lists

---

### Approach 3: Optimal (Recursive Merge / Divide & Conquer)

**Prerequisites (Agar Koi Chahiye):**
- **Merge Two Sorted Lists**: Core operation for merging
- **Recursion**: Understanding of recursive calls and base cases
- **Divide and Conquer**: Breaking problem into smaller subproblems
- **Why needed**: Hum recursively lists ko merge karenge, similar to merge sort

**Intuition (Soch):**

**Genius Observation:** 💡

Instead of merging lists one by one (L1 + L2, then result + L3, then result + L4...),
Use **Divide & Conquer** like Merge Sort!

```
Problem: Merge 4 vertical lists

Approach 1 (Better - Sequential):
Step 1: L1 + L2 = Result1
Step 2: Result1 + L3 = Result2
Step 3: Result2 + L4 = Final
Time: O(N * K) ❌

Approach 2 (Optimal - Divide & Conquer):
                All Lists [L1, L2, L3, L4]
                        /              \
            [L1, L2]                   [L3, L4]
              /   \                      /   \
            L1     L2                  L3     L4
              \   /                      \   /
            Merge(L1,L2)              Merge(L3,L4)
                    \                    /
                      \                /
                     Merge(Result1, Result2)
                            |
                         Final Result

Time: O(N * log K) ✅ Much better!
```

**Why This is Better:**

Sequential Merge:
- First merge touches: N/K + N/K = 2N/K nodes
- Second merge touches: 2N/K + N/K = 3N/K nodes
- Third merge touches: 3N/K + N/K = 4N/K nodes
- Total work: O(K * N)

Divide & Conquer:
- Each level processes all N nodes
- Number of levels: log K (like merge sort)
- Total work: O(N * log K) ✅

**Algorithm:**

**Recursive Approach:**
```
function flatten(head):
  Base case: If head is null or head.next is null
    return head (single list or empty)

  Recursive case:
    1. Recursively flatten head.next (flatten all lists to the right)
    2. Merge current list (head) with flattened result
    3. Return merged result

function mergeTwoLists(a, b):
  Base cases:
    - If a is null, return b
    - If b is null, return a

  Recursive merge:
    - If a.data < b.data:
        a.bottom = mergeTwoLists(a.bottom, b)
        return a
    - Else:
        b.bottom = mergeTwoLists(a, b.bottom)
        return b
```

**Visual Example:**

```
Recursive Flatten:

flatten(5 → 10 → 19 → 28)
    |
    flatten(10 → 19 → 28)
        |
        flatten(19 → 28)
            |
            flatten(28)
                |
                return 28's vertical list
            merge(19's list, result)
        merge(10's list, result)
    merge(5's list, result)

Each merge operation merges two sorted lists!
```

**Time Complexity:** O(N log K)
- N = total number of nodes
- K = number of vertical lists (horizontal nodes)
- Recursion depth: O(K) - we process K horizontal nodes
- But each level does less work due to divide and conquer
- Total: O(N log K) ✅

**Space Complexity:** O(K)
- Recursion stack space: O(K) for K horizontal nodes
- No extra space for storing values
- Much better than brute force!

**Pros:**
✅ Optimal time complexity: O(N log K)
✅ Utilizes sorted property efficiently
✅ Elegant recursive solution
✅ Similar to merge sort approach
✅ No extra space for data storage

**Cons:**
❌ Requires understanding of recursion
❌ Stack space O(K) for recursive calls
❌ Might be tricky to understand for beginners

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Prerequisites | When to Use | Interview Score |
|----------|----------------|------------------|---------------|-------------|-----------------|
| **Brute Force (Collect & Sort)** | O(N log N) | O(N) | Array operations, Sorting | When simplicity is priority | ⭐⭐⭐ |
| **Better (Iterative Merge)** | O(N * K) | O(1) | Merge two sorted lists | When K is small | ⭐⭐⭐⭐ |
| **Optimal (Recursive Merge)** | O(N log K) | O(K) | Merge two lists, Recursion, Divide & Conquer | Best for interviews | ⭐⭐⭐⭐⭐ |

Where:
- **N** = Total number of nodes
- **K** = Number of vertical lists (horizontal nodes)

**Which is Better?**
- Agar **easy solution** chahiye → Brute Force
- Agar **space optimize** karna hai → Better Approach
- Agar **time optimize** karna hai → Optimal (Recursive) ⭐ **Best!**
- Agar **interview mein impress** karna hai → Optimal (Recursive)

---

## 🎯 Key Insights

### 1. Two-Pointer Structure
```
next pointer:    → Horizontal direction
bottom pointer:  ↓ Vertical direction

Result uses only bottom pointers!
```

### 2. Already Sorted Property
- Har vertical list sorted hai
- Horizontal list bhi sorted hai
- **This is KEY!** - Merge operation ko utilize karo

### 3. Similar Problems
- **Merge K Sorted Lists**: Same concept, different structure
- **Merge Sort**: Divide and conquer approach
- **Merge Two Sorted Lists**: Core operation used here

### 4. Merge Two Sorted Lists (Core Operation)
```
List1: 5 → 7 → 10
List2: 8 → 12

Result: 5 → 7 → 8 → 10 → 12

Logic: Compare heads, pick smaller, move pointer
```

---

## 🔍 Edge Cases

### 1. Empty List
```
Input: null
Output: null
```

### 2. Single Vertical List
```
Input: 5 → 7 → 10
Output: 5 → 7 → 10
(Already flattened)
```

### 3. Single Node
```
Input: 5
Output: 5
```

### 4. No Bottom Pointers
```
Input: 5 → 10 → 15
      (no bottom chains)
Output: 5 → 10 → 15
```

### 5. All Same Values
```
Input: 5 → 5 → 5
       ↓   ↓   ↓
       5   5   5

Output: 5 → 5 → 5 → 5 → 5 → 5
```

---

## 🤔 Which Solution Do You Want to See?

Aap konsa solution dekhna chahte hain?

1. **Brute Force (Collect & Sort)** - Sabse seedha approach (easy to understand)
2. **Better (Iterative Merge)** - Space-efficient approach with O(1) extra space
3. **Optimal (Recursive Merge)** - Best time complexity O(N log K) - Interview recommended! ⭐

Bataiye, main aapke liye konsa code likhun? 🚀

**Recommendation:** Start with **Brute Force** to understand the problem, then learn **Optimal (Recursive)** for interviews!
