# Sort a Linked List of 0s, 1s and 2s

**Difficulty:** Medium
**Accuracy:** 60.75%
**Submissions:** 278K+
**Average Time:** 30m

---

## 📋 Problem Statement
[geek-for-geek](https://www.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1)

Tumhe ek linked list di gayi hai jisme sirf **0, 1, aur 2** values hain. Tumhe is list ko sort karna hai taaki:
- Saare **0s** sab se pehle aayein (left side)
- Saare **1s** beech mein aayein (middle)
- Saare **2s** last mein aayein (right side)

**Simple words mein:** List ko rearrange karo taaki 0-1-2 ke order mein sorted ho jaye.

### Example 1:
```
Input:  1 → 2 → 2 → 1 → 2 → 0 → 2 → 2
Output: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2
```

**Explanation:**
- Pehle **1 zero** aaya
- Phir **2 ones** aaye
- Last mein **5 twos** aaye
- List sorted ho gayi! ✓

### Example 2:
```
Input:  2 → 2 → 0 → 1
Output: 0 → 1 → 2 → 2
```

**Explanation:**
- 0 pehle, 1 beech mein, 2s last mein

### Constraints:
- `1 ≤ nodes ≤ 10⁶` (bohot badi list ho sakti hai)
- `0 ≤ node.data ≤ 2` (sirf 0, 1, ya 2 values)

---

## 💡 Approaches

### Approach 1: Brute Force (Counting Method)

**Intuition (Soch):**

Sabse seedha tarika kya hai?
1. **Pehle count karo** ki kitne 0s, 1s, aur 2s hain
2. **Phir list ko dobara traverse karo** aur values ko overwrite kar do

Jaise agar:
- 1 zero hai
- 2 ones hain
- 5 twos hain

Toh pehle node ko 0 bana do, next 2 nodes ko 1 bana do, baki 5 nodes ko 2 bana do.

**Algorithm:**

```
PASS 1 (Counting):
1. Traverse karo puri list
2. Count karo: count0, count1, count2
3. Har node ko check karo aur respective counter badhao

PASS 2 (Overwriting):
4. Phir se traverse karo list
5. Pehle count0 nodes ko 0 set karo
6. Phir count1 nodes ko 1 set karo
7. Last mein count2 nodes ko 2 set karo
```

**Example Walkthrough:**

```
Input: 1 → 2 → 2 → 1 → 2 → 0 → 2 → 2

PASS 1:
Traverse: 1 (count1=1), 2 (count2=1), 2 (count2=2),
          1 (count1=2), 2 (count2=3), 0 (count0=1),
          2 (count2=4), 2 (count2=5)

Result: count0=1, count1=2, count2=5

PASS 2:
Fill 0s: 0 → ? → ? → ? → ? → ? → ? → ?  (1 node)
Fill 1s: 0 → 1 → 1 → ? → ? → ? → ? → ?  (2 nodes)
Fill 2s: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2  (5 nodes)

Output: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2 ✓
```

**Time Complexity:** O(2n) = O(n)
- **WHY?** Do baar traverse karte hain puri list
- First pass: counting (n operations)
- Second pass: overwriting (n operations)
- Total: 2n → O(n)

**Space Complexity:** O(1)
- **WHY?** Sirf 3 variables use kiye (count0, count1, count2)
- Extra space list ke size par depend nahi karta

**Pros:** ✅
- Bohot simple aur easy to understand
- Guaranteed sorted output
- Constant space

**Cons:** ❌
- Do baar traverse karna padta hai (2 passes)
- **Node values change hote hain** (original data modify hota hai)
- Agar nodes ko preserve karna ho toh problem hai

---

### Approach 2: Optimal (Three Pointer / Dummy Node Method)

**Intuition (Soch):**

Kya hum **ek hi pass mein** sort kar sakte hain aur **node values change kiye bina**?

**Key Insight:** 💡

Array mein hum **Dutch National Flag algorithm** use karte hain (3 pointers). Linked list mein similar idea hai lekin thoda different:

**3 separate chains banao:**
1. **Zero chain** - saare 0s ko yahaan attach karo
2. **One chain** - saare 1s ko yahaan attach karo
3. **Two chain** - saare 2s ko yahaan attach karo

**Phir teen chains ko connect kar do!**

```
Original: 1 → 2 → 0 → 1 → 2

Building chains:
Zero chain:  0 → null
One chain:   1 → 1 → null
Two chain:   2 → 2 → null

Final: Connect them!
0 → 1 → 1 → 2 → 2 → null ✓
```

**Algorithm:**

```
STEP 1: Create 3 dummy nodes
  - zeroHead (dummy for 0s chain)
  - oneHead (dummy for 1s chain)
  - twoHead (dummy for 2s chain)

STEP 2: Create 3 pointers
  - zero = zeroHead
  - one = oneHead
  - two = twoHead

STEP 3: Traverse original list
  For each node:
    - Agar value 0 hai → zero chain mein attach karo
    - Agar value 1 hai → one chain mein attach karo
    - Agar value 2 hai → two chain mein attach karo

STEP 4: Connect the 3 chains
  - zero chain ka end → one chain ke start se connect
  - one chain ka end → two chain ke start se connect
  - two chain ka end → null

STEP 5: Return zeroHead.next (final sorted list)
```

**Detailed Example:**

```
Input: 1 → 2 → 2 → 1 → 0

STEP 1-2: Setup
zeroHead → null   (zero points here)
oneHead → null    (one points here)
twoHead → null    (two points here)

STEP 3: Traverse and attach

Node 1 (value=1):
  one.next = node 1
  one = one.next
  oneHead → [1] → null

Node 2 (value=2):
  two.next = node 2
  two = two.next
  twoHead → [2] → null

Node 3 (value=2):
  two.next = node 2 (next one)
  two = two.next
  twoHead → [2] → [2] → null

Node 4 (value=1):
  one.next = node 1 (next one)
  one = one.next
  oneHead → [1] → [1] → null

Node 5 (value=0):
  zero.next = node 0
  zero = zero.next
  zeroHead → [0] → null

After traversal, 3 separate chains:
zeroHead → [0] → null
oneHead → [1] → [1] → null
twoHead → [2] → [2] → null

STEP 4: Connect chains
zero.next = oneHead.next  (0 connects to first 1)
one.next = twoHead.next   (last 1 connects to first 2)
two.next = null           (last 2 points to null)

Result:
zeroHead → [0] → [1] → [1] → [2] → [2] → null

STEP 5: Return zeroHead.next
Output: 0 → 1 → 1 → 2 → 2 ✓
```

**Edge Cases to Handle:**

1. **Agar koi chain empty ho?**
   - Example: Input mein koi 0 nahi hai
   - Solution: Empty chain ko skip kar do connection mein

2. **Agar sirf ek type ki values ho?**
   - Example: 2 → 2 → 2 → 2
   - Solution: Baaki chains empty rahenge, no problem

**Time Complexity:** O(n)
- **WHY?** Sirf ek baar traverse karte hain
- Har node ko ek baar visit karte hain
- Connection step O(1) hai

**Space Complexity:** O(1)
- **WHY?** Sirf 6 pointers use kiye:
  - 3 dummy heads (zeroHead, oneHead, twoHead)
  - 3 current pointers (zero, one, two)
- Extra space input size par depend nahi karta

**Pros:** ✅
- **Single pass** through list (efficient!)
- **Node values change nahi hote** (only pointers rearrange)
- Better than brute force for large lists
- Interview mein impressive lagta hai

**Cons:** ❌
- Thoda complex logic (3 chains manage karne hain)
- Edge cases handle karni padti hain (empty chains)

---

### Approach 3: Dutch National Flag (Array-Based) ⚠️

**Intuition (Soch):**

Yeh approach famous **Dutch National Flag algorithm** use karti hai, jo arrays ke liye bahut powerful hai!

**Key Idea:**
- Linked list ko **array mein convert** karo
- **3-way partitioning** apply karo (DNF algorithm)
- Sorted array se **list rebuild** karo

**Dutch National Flag Algorithm:**
```
Use 3 pointers:
- left: next position for 0
- middle: current element
- right: next position for 2

Partition: [0s | 1s | unprocessed | 2s]
```

**Visual Example:**
```
Input: 1 → 2 → 0 → 1 → 2

STEP 1: Convert to array
  [1, 2, 0, 1, 2]
   ↓  ↓  ↓  ↓  ↓
  Store node references

STEP 2: Dutch National Flag
  Initial: [1, 2, 0, 1, 2]
           L=0, M=0, R=4

  Process:
  - Found 0? Swap with left, move both
  - Found 1? Keep in middle, move middle
  - Found 2? Swap with right, move right back

  After partitioning: [0, 1, 1, 2, 2]

STEP 3: Rebuild list
  Connect: 0 → 1 → 1 → 2 → 2 → null
```

**Algorithm:**
```
1. Convert list → array of nodes
2. Apply DNF 3-way partitioning:
   while middle <= right:
     - if arr[middle] == 0: swap(left, middle), left++, middle++
     - if arr[middle] == 1: middle++
     - if arr[middle] == 2: swap(middle, right), right--
3. Rebuild list from sorted array
4. Return new head
```

**Detailed DNF Logic:**
```
Invariant during algorithm:
[0...left-1]     → All 0s ✅
[left...middle-1] → All 1s ✅
[middle...right]  → Unprocessed ⏳
[right+1...n-1]  → All 2s ✅

Example: [1, 2, 0, 1, 2]
         L=0, M=0, R=4

Step 1: arr[0]=1 → middle++ → [1, 2, 0, 1, 2] (L=0, M=1, R=4)
Step 2: arr[1]=2 → swap(1,4) → [1, 2, 0, 1, 2] (L=0, M=1, R=3)
Step 3: arr[1]=2 → swap(1,3) → [1, 1, 0, 2, 2] (L=0, M=1, R=2)
Step 4: arr[1]=1 → middle++ → [1, 1, 0, 2, 2] (L=0, M=2, R=2)
Step 5: arr[2]=0 → swap(0,2) → [0, 1, 1, 2, 2] (L=1, M=3, R=2)
Done! (M > R)
```

**Time Complexity:** O(n)
- Convert to array: O(n)
- DNF partitioning: O(n) - single pass
- Rebuild list: O(n)
- Total: O(3n) = O(n)

**Space Complexity:** O(n) ❌
- **WHY?** Array stores all n node references
- Example: 1 million nodes → 8-16 MB extra memory!
- **NOT optimal for linked lists!**

**Pros:** ✅
- Single pass through array during partitioning
- **Perfect for arrays** (LeetCode 75: Sort Colors)
- Demonstrates advanced algorithm knowledge
- Values preserved (only pointers rearranged)

**Cons:** ❌
- **O(n) extra space** - defeats linked list advantage!
- Three passes total (convert, sort, rebuild)
- More complex than three-pointer approach
- **NOT recommended for linked lists**

**When to Use:**
- ✅ **For arrays** - Perfect! O(1) space in-place sorting
- ✅ **Interview** - If asked to demonstrate DNF knowledge
- ❌ **For linked lists** - Use three-pointer approach instead!

**Key Insight:**
```
Dutch National Flag algorithm is OPTIMAL for arrays:
  - Arrays: O(n) time, O(1) space (in-place) ✅
  - Linked Lists: O(n) time, O(n) space (array conversion) ❌

For linked lists, three-pointer approach is better:
  - O(n) time, O(1) space, single pass! 🚀
```

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Passes | Modifies Values? | Interview Score |
|----------|----------------|------------------|--------|------------------|-----------------|
| **Brute Force (Counting)** | O(2n) = O(n) | O(1) | 2 | ✅ Yes | ⭐⭐⭐ Good |
| **Optimal (Three Pointers)** | O(n) | O(1) | 1 | ❌ No | ⭐⭐⭐⭐⭐ Best |
| **DNF (Array-Based)** | O(3n) = O(n) | O(n) ❌ | 3 | ❌ No | ⭐⭐ Not for Lists |

**Which is better?**
- Agar **simplicity chahiye** → Brute Force
- Agar **values preserve karni hain** → Optimal
- Agar **interview mein impress karna hai** → Optimal (best!)
- Agar **array sorting problem** hai → Dutch National Flag
- Agar **linked list sorting** hai → Three Pointers (NOT DNF!)

---

## 🎯 Related Concepts

**Similar Problems:**
- **Dutch National Flag Problem** (same concept, array mein)
- **Sort Colors** (LeetCode 75 - array version)
- **Partition List** (LeetCode 86 - similar pointer technique)

**Key Technique:**
- **Multiple dummy nodes** pattern (bohot useful technique for linked list problems)
- **Chain building and merging** (divide and conquer ka concept)

---

## 🤔 Which Solution Do You Want to See?

Aap konsa solution dekhna chahte hain? Main aapke liye **complete code with detailed comments** likhunga!

1. **Brute Force (Counting Method)**
   - Seedha approach
   - Easy to understand
   - 2 passes through list

2. **Optimal (Three Pointer Method)**
   - Best approach for interviews
   - Single pass
   - Values preserve hoti hain
   - Impressive solution!

**Bataiye, main aapke liye konsa code likhun?** 🚀

---

# Brute Force Solution - Complete Walkthrough

## 💻 Code Implementation

**File:** `brute-force.ts`

Solution TypeScript code with namespace `SortList012BruteForce` create kar diya gaya hai with detailed comments!

---

## 🎯 Dry Run with Complete Table

Chaliye **step-by-step dry run** dekhte hain with actual example!

**Input:** `1 → 2 → 2 → 1 → 2 → 0 → 2 → 2`

### Phase 1: Counting Pass (First Traversal)

| Node Position | Node Value | count0 | count1 | count2 | Action |
|---------------|------------|--------|--------|--------|--------|
| Initial       | -          | 0      | 0      | 0      | Setup counters |
| 1             | 1          | 0      | 1      | 0      | Found 1, count1++ |
| 2             | 2          | 0      | 1      | 1      | Found 2, count2++ |
| 3             | 2          | 0      | 1      | 2      | Found 2, count2++ |
| 4             | 1          | 0      | 2      | 2      | Found 1, count1++ |
| 5             | 2          | 0      | 2      | 3      | Found 2, count2++ |
| 6             | 0          | 1      | 2      | 3      | Found 0, count0++ |
| 7             | 2          | 1      | 2      | 4      | Found 2, count2++ |
| 8             | 2          | 1      | 2      | 5      | Found 2, count2++ |
| **End Pass 1** | -         | **1**  | **2**  | **5**  | Counting complete! |

**After Pass 1:**
- count0 = 1 (ek zero hai)
- count1 = 2 (do ones hain)
- count2 = 5 (paanch twos hain)

---

### Phase 2: Overwriting Pass (Second Traversal)

| Node Position | Previous Value | New Value | count0 | count1 | count2 | Phase |
|---------------|----------------|-----------|--------|--------|--------|-------|
| 1             | 1              | 0         | 0      | 2      | 5      | Filling 0s |
| 2             | 2              | 1         | 0      | 1      | 5      | Filling 1s |
| 3             | 2              | 1         | 0      | 0      | 5      | Filling 1s |
| 4             | 1              | 2         | 0      | 0      | 4      | Filling 2s |
| 5             | 2              | 2         | 0      | 0      | 3      | Filling 2s |
| 6             | 0              | 2         | 0      | 0      | 2      | Filling 2s |
| 7             | 2              | 2         | 0      | 0      | 1      | Filling 2s |
| 8             | 2              | 2         | 0      | 0      | 0      | Filling 2s |
| **End Pass 2** | -             | -         | **0**  | **0**  | **0**  | All done! |

**After Pass 2:**
```
0 → 1 → 1 → 2 → 2 → 2 → 2 → 2
```
**Sorted! ✅**

---

## 🔍 Step-by-Step Code Walkthrough

Chaliye code ko line-by-line samajhte hain:

### Step 1: Edge Case Handling
```typescript
if (head === null || head.next === null) {
  return head;
}
```
**WHY?** Agar list khali hai ya sirf ek node hai, already sorted hai!

---

### Step 2: Initialize Counters
```typescript
let count0 = 0;
let count1 = 0;
let count2 = 0;
```
**WHY?** Teen variables banaye taaki track kar sakein ki kitne 0s, 1s, aur 2s hain.

---

### Step 3: First Pass - Counting
```typescript
let current: ListNode | null = head;

while (current !== null) {
  if (current.val === 0) {
    count0++;
  } else if (current.val === 1) {
    count1++;
  } else if (current.val === 2) {
    count2++;
  }
  current = current.next;
}
```

**LOGIC:**
- Puri list ko traverse karo
- Har node ki value check karo
- Respective counter badhao
- Next node par jao

**EXAMPLE:**
```
Node: 1 → count1 = 1
Node: 2 → count2 = 1
Node: 2 → count2 = 2
...
Final: count0=1, count1=2, count2=5
```

---

### Step 4: Second Pass - Phase 1 (Fill 0s)
```typescript
current = head;

while (count0 > 0) {
  current!.val = 0;
  current = current!.next;
  count0--;
}
```

**LOGIC:**
- Pointer ko reset karo (head par vapas lao)
- Jab tak count0 > 0 hai:
  - Current node ki value ko 0 set karo
  - Next node par move karo
  - count0 ko decrease karo

**EXAMPLE:**
```
count0 = 1
First node: 1 → 0 (changed!)
count0 = 0 (done filling 0s)
```

---

### Step 5: Second Pass - Phase 2 (Fill 1s)
```typescript
while (count1 > 0) {
  current!.val = 1;
  current = current!.next;
  count1--;
}
```

**LOGIC:**
- Same process for 1s
- count1 times loop chalega
- Har node ko 1 set kar do

**EXAMPLE:**
```
count1 = 2
Second node: 2 → 1 (changed!)
Third node: 2 → 1 (changed!)
count1 = 0 (done filling 1s)
```

---

### Step 6: Second Pass - Phase 3 (Fill 2s)
```typescript
while (count2 > 0) {
  current!.val = 2;
  current = current!.next;
  count2--;
}
```

**LOGIC:**
- Remaining nodes ko 2 set kar do
- count2 times loop chalega

**EXAMPLE:**
```
count2 = 5
Remaining 5 nodes: all set to 2
count2 = 0 (done!)
```

---

### Step 7: Return Result
```typescript
return head;
```

**WHY?** List ab sorted hai, head return kar do!

---

## 📊 Visualization

Chaliye poori process ko visually dekhte hain:

```
ORIGINAL LIST:
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 1 │ → │ 2 │ → │ 2 │ → │ 1 │ → │ 2 │ → │ 0 │ → │ 2 │ → │ 2 │ → null
└───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘

PASS 1: COUNTING
═══════════════════════════════════════════════════════════════
Traverse each node and count:

Visit 1 → count1++  (count1 = 1)
Visit 2 → count2++  (count2 = 1)
Visit 2 → count2++  (count2 = 2)
Visit 1 → count1++  (count1 = 2)
Visit 2 → count2++  (count2 = 3)
Visit 0 → count0++  (count0 = 1)
Visit 2 → count2++  (count2 = 4)
Visit 2 → count2++  (count2 = 5)

COUNTS: count0=1, count1=2, count2=5 ✓

PASS 2: OVERWRITING
═══════════════════════════════════════════════════════════════

Phase 1: Fill 1 zero
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 0 │ → │ 2 │ → │ 2 │ → │ 1 │ → │ 2 │ → │ 0 │ → │ 2 │ → │ 2 │ → null
└───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘
  ↑
Changed to 0

Phase 2: Fill 2 ones
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 0 │ → │ 1 │ → │ 1 │ → │ 1 │ → │ 2 │ → │ 0 │ → │ 2 │ → │ 2 │ → null
└───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘
          ↑       ↑
      Changed to 1s

Phase 3: Fill 5 twos
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 0 │ → │ 1 │ → │ 1 │ → │ 2 │ → │ 2 │ → │ 2 │ → │ 2 │ → │ 2 │ → null
└───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘
                          ↑       ↑       ↑       ↑       ↑
                              All changed to 2s

FINAL SORTED LIST:
═══════════════════════════════════════════════════════════════
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 0 │ → │ 1 │ → │ 1 │ → │ 2 │ → │ 2 │ → │ 2 │ → │ 2 │ → │ 2 │ → null
└───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘
  ↑       ↑       ↑       ↑       ↑       ↑       ↑       ↑
  0s     1s      1s      2s      2s      2s      2s      2s

✅ All 0s first, then 1s, then 2s!
```

---

## 🚨 Edge Cases to Handle

### 1. Empty List
```typescript
Input: null
Output: null
```
**Handled by:** `if (head === null)` check

---

### 2. Single Node
```typescript
Input: 0 → null
Output: 0 → null
```
**Handled by:** `if (head.next === null)` check

---

### 3. All Same Values
```typescript
Input: 2 → 2 → 2 → 2
Counts: count0=0, count1=0, count2=4
Output: 2 → 2 → 2 → 2 (unchanged)
```
**Works!** Loops skip karte hain jab count 0 hai.

---

### 4. Already Sorted
```typescript
Input: 0 → 1 → 1 → 2 → 2
Counts: count0=1, count1=2, count2=2
Output: 0 → 1 → 1 → 2 → 2 (same)
```
**Works!** Algorithm still processes correctly.

---

### 5. Reverse Sorted
```typescript
Input: 2 → 2 → 1 → 1 → 0
Counts: count0=1, count1=2, count2=2
Output: 0 → 1 → 1 → 2 → 2
```
**Works!** Overwriting fixes the order.

---

### 6. No Zeros
```typescript
Input: 1 → 2 → 1 → 2
Counts: count0=0, count1=2, count2=2
Output: 1 → 1 → 2 → 2
```
**Works!** First while loop skip ho jata hai (count0=0).

---

## ⚠️ Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to reset `current` pointer
```typescript
// WRONG:
while (current !== null) { ... } // First pass
// current is now null!
while (count0 > 0) {
  current!.val = 0; // ERROR! current is null
}
```

**✅ Fix:**
```typescript
current = head; // Reset to head before second pass!
```

---

### ❌ Mistake 2: Not handling edge cases
```typescript
// WRONG:
function sortList(head: ListNode | null): ListNode | null {
  // Directly start counting without checking null
  let current = head;
  while (current !== null) { ... }
}
```

**✅ Fix:**
```typescript
// Check edge cases first!
if (head === null || head.next === null) {
  return head;
}
```

---

### ❌ Mistake 3: Using `current.next` without null check
```typescript
// WRONG:
while (count0 > 0) {
  current.val = 0; // What if current is null?
  current = current.next;
}
```

**✅ Fix:**
```typescript
while (count0 > 0) {
  current!.val = 0; // Use non-null assertion
  current = current!.next;
}
```

---

## 🎯 Interview Tips & What to Say

### Initial Response:
```
"Maine problem ko samjha. Yeh basically sorting problem hai jisme sirf
0, 1, aur 2 values hain. Main pehle brute force approach explain karta hoon."
```

---

### Explaining Approach:
```
"Brute force mein main do pass karunga:

PASS 1: List ko traverse karke count0, count1, count2 nikaal lunga.
        Yeh O(n) time lega.

PASS 2: Phir se traverse karke pehle saare 0s fill karunga,
        phir 1s, phir 2s. Yeh bhi O(n) time lega.

Total time complexity O(2n) = O(n) hogi aur space O(1) hai
kyunki sirf 3 variables use kar raha hoon."
```

---

### Common Follow-up Questions:

**Q1: Kya single pass mein kar sakte ho?**

**A:** "Haan! Optimal approach mein main 3 dummy nodes use karke
3 separate chains bana sakta hoon (zero chain, one chain, two chain).
Phir unhe connect kar dunga. Woh bhi O(n) time aur O(1) space hai."

---

**Q2: Agar values 0, 1, 2 ke alawa bhi ho sakti hain?**

**A:** "Agar general sorting chahiye toh merge sort use karna hoga
which takes O(n log n) time. Ya quicksort use kar sakte hain.
Lekin is problem mein sirf 3 values hain, isliye counting approach
optimal hai."

---

**Q3: Node values modify karna allowed hai?**

**A:** "Is approach mein haan, values modify ho rahi hain.
Agar values preserve karni hain (sirf pointers rearrange karni hain),
toh optimal approach use karni padegi jo 3 separate chains banati hai."

---

**Q4: Space complexity further improve kar sakte ho?**

**A:** "Is approach mein already O(1) space hai. Optimal approach
bhi O(1) space use karti hai. Hum isse improve nahi kar sakte
kyunki at least counters/pointers toh chahiye hi."

---

### Red Flags to Avoid:

❌ **Don't say:** "Main sorting algorithm use karunga"
✅ **Instead say:** "Sirf 3 values hain, isliye counting approach best hai"

❌ **Don't say:** "HashMap use kar lete hain"
✅ **Instead say:** "3 values ke liye hashmap overkill hai, simple counters enough hain"

❌ **Don't say:** "Recursion se kar sakte hain"
✅ **Instead say:** "Iterative approach better hai - O(1) space aur simple to understand"

---

### Bonus Points:

⭐ **Mention:** "Yeh Dutch National Flag problem ka variant hai"
⭐ **Mention:** "Time complexity O(2n) hai, lekin constant factor 2 hai jo negligible hai"
⭐ **Mention:** "Optimal approach bhi bata sakta hoon jo single pass mein karta hai"

---

## 🔑 Key Takeaways

### 1. Two-Pass Approach 💡
- **First pass:** Count karo (counting phase)
- **Second pass:** Values overwrite karo (filling phase)
- Simple aur straightforward logic

### 2. In-Place Sorting ⚡
- Extra space nahi chahiye (O(1))
- Original list ko hi modify karte hain
- No new nodes create karte hain

### 3. When to Use 🎯
- Jab **limited distinct values** ho (0, 1, 2)
- Jab **node values modify karna allowed** ho
- Jab **simplicity important** ho
- Interview mein **starting point** ke liye best

---

## 📝 Quick Recap

**Algorithm:**
1. ✅ Edge cases check karo
2. ✅ First pass: Count karo (count0, count1, count2)
3. ✅ Second pass:
   - Fill count0 zeros
   - Fill count1 ones
   - Fill count2 twos
4. ✅ Return head

**Complexity:**
- ⏱️ Time: O(2n) = O(n) - two passes
- 💾 Space: O(1) - only 3 counters

**Pros:**
- Simple and easy to code
- Constant space
- Guaranteed correct

**Cons:**
- Two passes (not single pass)
- Modifies node values

---

**🚀 Next:** Agar aapko single-pass solution dekhna hai jo values preserve karta hai, toh optimal approach (three pointer method) dekhte hain!

---

# Optimal Solution - Complete Walkthrough

## 💻 Code Implementation

**File:** `optimal.ts`

Solution TypeScript code with namespace `SortList012Optimal` create kar diya gaya hai with detailed comments!

**Approach:** Three Pointer / Dummy Node Method
- ✅ **Single pass** through list
- ✅ **Values preserved** (only pointers rearranged)
- ✅ **O(n) time, O(1) space**
- ✅ **Interview-recommended!** 🚀

---

## 🏆 Final Comparison

```
┌─────────────────┬──────────────┬──────────────┐
│                 │ Brute Force  │   Optimal    │
├─────────────────┼──────────────┼──────────────┤
│ Time Complexity │    O(2n)     │     O(n)     │
│ Space Complexity│    O(1)      │     O(1)     │
│ Passes Required │      2       │      1       │
│ Values Modified │     YES      │      NO      │
│ Interview Score │   ⭐⭐⭐     │  ⭐⭐⭐⭐⭐  │
│ Code Complexity │   Simple     │   Moderate   │
└─────────────────┴──────────────┴──────────────┘
```

**Recommendation:** Always use **Optimal** in interviews unless specifically asked for brute force!

---

**✨ Complete Solution Available:**
- `problem.md` - All approaches explained
- `brute-force.ts` - Two-pass counting method
- `optimal.ts` - Single-pass three pointer method ⭐
- `dutch-national-flag.ts` - Array-based DNF approach (educational)

**All files include:**
- Complete code with detailed comments
- Comprehensive dry run visualization
- Edge cases covered
- Test cases with outputs

---

# Dutch National Flag Solution - Complete Walkthrough

## 💻 Code Implementation

**File:** `dutch-national-flag.ts`

Solution TypeScript code with namespace `SortList012DutchNationalFlag` create kar diya gaya hai with detailed comments!

**Approach:** Array-Based Dutch National Flag Algorithm
- ⚠️ **O(n) space** - Converts list to array
- ✅ **O(n) time** - Three passes (convert, sort, rebuild)
- ✅ **Perfect for arrays** - LeetCode 75: Sort Colors
- ❌ **NOT optimal for linked lists** - Use three-pointer instead!

## 🎯 Key Differences

### For Arrays (LeetCode 75):
```typescript
function sortColors(nums: number[]): void {
  let left = 0, middle = 0, right = nums.length - 1;

  while (middle <= right) {
    if (nums[middle] === 0) {
      [nums[left], nums[middle]] = [nums[middle], nums[left]];
      left++; middle++;
    } else if (nums[middle] === 1) {
      middle++;
    } else {
      [nums[middle], nums[right]] = [nums[right], nums[middle]];
      right--;
    }
  }
}
```
**Array version:** O(n) time, O(1) space ✅ OPTIMAL!

### For Linked Lists:
```typescript
// THIS approach (convert to array)
function sortList(head) {
  const nodes = []; // O(n) space ❌
  // Convert list → array
  // Sort array using DNF
  // Rebuild list
}
```
**List version:** O(n) time, O(n) space ❌ NOT optimal!

**Better approach for lists:** Three-pointer dummy node method
- O(n) time, O(1) space ✅ OPTIMAL!

---

## 📚 Learning Value

**Why include this approach?**

1. **Educational:** Shows how DNF algorithm works
2. **Comparison:** Demonstrates why some algorithms are better for certain data structures
3. **Interview:** Might be asked to explain DNF, even if not using it
4. **Transferable:** Understanding DNF helps with array problems (LeetCode 75)

**Key Lesson:**
```
Algorithm optimality depends on data structure!

Dutch National Flag:
  ✅ Optimal for arrays (in-place, O(1) space)
  ❌ Not optimal for linked lists (requires array conversion)

Three-Pointer Chains:
  ❌ Not needed for arrays (DNF is simpler)
  ✅ Optimal for linked lists (leverages pointer manipulation)
```

---

## 🎓 Summary - When to Use What

| Problem Type | Data Structure | Best Approach | Time | Space |
|-------------|----------------|---------------|------|-------|
| Sort 0-1-2 | **Array** | Dutch National Flag | O(n) | O(1) ✅ |
| Sort 0-1-2 | **Linked List** | Three-Pointer Chains | O(n) | O(1) ✅ |
| Sort 0-1-2 | **List (Educational)** | DNF via Array | O(n) | O(n) ❌ |

**Final Recommendation for Interviews:**
- Linked List problem → Use `optimal.ts` (Three-pointer)
- Array problem (LeetCode 75) → Use Dutch National Flag
- Understanding both → Shows versatility! 🚀