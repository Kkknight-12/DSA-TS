# Sort List

**Difficulty:** Medium
**Topics:** Linked List, Sorting, Divide and Conquer, Merge Sort, Two Pointers

---

## 📋 Problem Statement

Aapko ek **linked list** di gayi hai. Aapko iss list ko **ascending order (chhote se bade)** mein sort karke wapas return karna hai.

**Example 1:**
```
Input:  4 → 2 → 1 → 3 → null
Output: 1 → 2 → 3 → 4 → null

Explanation: Values ko ascending order mein arrange kar diya
```

**Example 2:**
```
Input:  -1 → 5 → 3 → 4 → 0 → null
Output: -1 → 0 → 3 → 4 → 5 → null

Explanation: Negative numbers bhi sahi se sort ho jaayenge
```

**Example 3:**
```
Input:  null (empty list)
Output: null

Explanation: Agar list khali hai toh waise hi return karo
```

---

## Constraints (Shamein)

- **Nodes ki sankhya:** 0 se 50,000 tak ho sakti hai
- **Node values:** -10^5 se +10^5 tak (negative bhi allowed)
- Empty list bhi possible hai

---

## 🔴 Critical Understanding

### Linked List vs Array Sorting Mein Fark

**Array mein sorting:**
- Random access hai → kisi bhi index pe directly jaa sakte ho
- Quick Sort, Heap Sort ache kaam karti hain
- `array[i]` se kisi bhi position pe turant pahunch sakte ho

**Linked List mein sorting:**
- Sequential access hai → ek-ek karke traverse karna padta hai
- Quick Sort linked list ke liye mushkil hai (random access nahi)
- **Merge Sort sabse suitable hai linked lists ke liye!** 🎯

### Follow-up Challenge (Bonus Question)

**Question:** Kya aap list ko **O(n log n) time** aur **O(1) space** mein sort kar sakte ho?

**Challenge:**
- O(n log n) time toh theek hai (merge sort deta hai)
- Par O(1) space ka matlab **extra space use nahi karna!**
- Recursion bhi space leta hai (call stack mein)
- Toh **iterative merge sort** chahiye! 🤔

---

## 🔧 Prerequisites

Iss problem ko solve karne se pehle ye concepts samajhne zaroori hain:

### 1. Merge Sort Algorithm

**Kya hai Merge Sort?**

Merge sort ek **divide and conquer** algorithm hai. Iska kaam simple hai:
1. **Divide:** Badi problem ko choti-choti problems mein todo
2. **Conquer:** Choti problems solve karo (recursively)
3. **Combine:** Solutions ko merge karke final answer banao

**Real-world Analogy:**

Imagine karo tumhare paas 100 books hain aur tumhe alphabetically arrange karna hai:
- **Step 1:** 100 books ko 2 groups mein divide karo (50-50)
- **Step 2:** Har group ko alag se sort karo (recursively divide karte raho)
- **Step 3:** Dono sorted groups ko merge karo (alphabetically combine)

**Visual Example:**

```
Original: [4, 2, 1, 3]

Divide Phase:
           [4, 2, 1, 3]
          /            \
      [4, 2]          [1, 3]
      /    \          /    \
    [4]    [2]      [1]    [3]

Conquer Phase (Merge):
    [4]    [2]      [1]    [3]
      \    /          \    /
      [2, 4]          [1, 3]
          \            /
           [1, 2, 3, 4]
```

**Time Complexity:** O(n log n)
- Log n levels hain tree mein (har baar half karte hain)
- Har level pe n elements merge karte hain
- Total: O(n) × O(log n) = O(n log n)

---

### 2. Two Pointers (Fast & Slow)

**Middle of Linked List Kaise Nikale?**

Linked list mein array jaisa index nahi hota. Middle nikalne ke liye:

**Technique:** Fast and Slow pointers!

```
Slow → 1 step chalta hai
Fast → 2 steps chalta hai

Jab fast end pe pahunchega, slow middle pe hoga! 🎯
```

**Example:**
```
Initial: 1 → 2 → 3 → 4 → 5 → null
         ↑
      slow, fast

After 1 iteration:
         1 → 2 → 3 → 4 → 5 → null
             ↑       ↑
           slow    fast

After 2 iterations:
         1 → 2 → 3 → 4 → 5 → null
                 ↑           ↑
               slow        fast (end!)

Slow is at middle! ✅
```

---

### 3. Merging Two Sorted Lists

**Do sorted lists ko kaise merge kare?**

Ye ek basic operation hai merge sort ke liye:

```
List 1: 1 → 3 → 5
List 2: 2 → 4 → 6

Result: 1 → 2 → 3 → 4 → 5 → 6
```

**Technique:** Dummy node use karo aur dono lists ko compare karte jao:

1. Dummy node banao (placeholder)
2. List1 ka current aur List2 ka current compare karo
3. Jo chota hai use result mein daalo
4. Us list ke pointer ko aage badhao
5. Repeat until dono lists khatam ho jaaye

**Pseudocode:**
```
dummy = new Node(0)
current = dummy

while (list1 && list2):
    if (list1.val < list2.val):
        current.next = list1
        list1 = list1.next
    else:
        current.next = list2
        list2 = list2.next
    current = current.next

// Remaining nodes attach karo
current.next = list1 || list2

return dummy.next
```

---

## 💡 Approaches

### Approach 1: Brute Force (Array Use Karke)

**Intuition (Soch):**

Sabse seedha tarika - linked list ke values ko **array mein daal do**, array ko **sort karo**, phir **naya linked list banao**!

**Algorithm:**

1. **Step 1:** Linked list traverse karo aur saare values ko array mein store karo
2. **Step 2:** Array ko built-in sort function se sort karo
3. **Step 3:** Sorted array se naya linked list banao

**Visual:**
```
Input:  4 → 2 → 1 → 3 → null

Step 1: Array mein daalo
        [4, 2, 1, 3]

Step 2: Array sort karo
        [1, 2, 3, 4]

Step 3: Naya list banao
        1 → 2 → 3 → 4 → null
```

**Complexity:**

**Time Complexity:** O(n log n)
- Array mein dalne mein: O(n)
- Array sort karne mein: O(n log n) (built-in sort)
- Naya list banane mein: O(n)
- **Total:** O(n log n) ✅

**Space Complexity:** O(n)
- Array ke liye: O(n) extra space
- **Follow-up constraint violate!** ❌

**Pros:**
✅ Bahut simple aur easy to understand
✅ Code likhna fast hai
✅ Built-in sort use kar sakte ho

**Cons:**
❌ Extra O(n) space lagta hai (array ke liye)
❌ Follow-up question ka answer nahi hai
❌ Linked list ki property ka faayda nahi utha rahe

---

### Approach 2: Recursive Merge Sort

**Intuition (Soch):**

**Merge sort ko directly linked list pe apply karo!** Array ki zaroorat nahi.

Ye classic divide and conquer hai:
1. List ko **middle se tod do** (fast/slow pointer use karke)
2. Dono halves ko **recursively sort karo**
3. Dono sorted halves ko **merge karo**

**Key Insight:**

Linked list ke liye merge sort perfect hai kyunki:
- Todna easy hai (just pointers change karo)
- Merge karna easy hai (sequential operation)
- No random access needed! 🎯

**Algorithm:**

```
1. BASE CASE: Agar list khali hai ya 1 node hai, return as-is (already sorted)

2. DIVIDE:
   - Fast/slow pointer se middle find karo
   - List ko 2 halves mein divide karo

3. CONQUER:
   - Left half ko recursively sort karo
   - Right half ko recursively sort karo

4. COMBINE:
   - Dono sorted halves ko merge karo
   - Merged list return karo
```

**Visual Example:**

```
Input: 4 → 2 → 1 → 3

            [4 → 2 → 1 → 3]
           /               \
      [4 → 2]             [1 → 3]    (Divide)
      /     \             /     \
    [4]     [2]         [1]     [3]  (Base case)
      \     /             \     /
    [2 → 4]             [1 → 3]      (Merge)
           \               /
           [1 → 2 → 3 → 4]            (Final merge)
```

**Detailed Steps for [4,2,1,3]:**

```
Call 1: sortList([4,2,1,3])
  → Middle = 2
  → Left = [4,2], Right = [1,3]

  Call 2: sortList([4,2])
    → Middle = 4
    → Left = [4], Right = [2]
    → Merge([4], [2]) = [2,4]

  Call 3: sortList([1,3])
    → Middle = 1
    → Left = [1], Right = [3]
    → Merge([1], [3]) = [1,3]

  Final: Merge([2,4], [1,3]) = [1,2,3,4] ✅
```

**Complexity:**

**Time Complexity:** O(n log n)
- **Divide phase:** Middle nikalne mein O(n) time (slow/fast pointer)
- **Tree depth:** log n levels hain
- **Har level:** O(n) work (merge + divide)
- **Total:** O(n log n) ✅

**Space Complexity:** O(log n)
- **Recursion stack:** log n depth tak jaata hai
- **Not O(1)!** Follow-up violate ❌

**Pros:**
✅ No extra array needed
✅ Time complexity optimal (O(n log n))
✅ Linked list ki properties ka faayda
✅ Clean recursive solution

**Cons:**
❌ Recursion stack O(log n) space leta hai
❌ Follow-up question satisfy nahi karta
❌ Thoda complex samajhne mein

---

### Approach 3: Iterative Merge Sort (Bottom-Up) ⭐

**Intuition (Soch):**

Recursion use kiye bina merge sort karo! **Bottom-up approach** use karo.

**Key Idea:**

Top-down ki jagah bottom-up jao:
- Pehle **size 1 ke sublists** merge karo (2-2 ko)
- Phir **size 2 ke sublists** merge karo (4-4 ko)
- Phir **size 4 ke sublists** merge karo (8-8 ko)
- Continue karte jao... jab tak puri list sort na ho jaaye!

**Real-world Analogy:**

Tournament jaise socho:
1. Pehle 1v1 matches (singles)
2. Phir winners ko 2v2 groups mein (pairs)
3. Phir 4v4 groups (quads)
4. Final tak jao! 🏆

**Visual Example:**

```
Original: 4 → 2 → 1 → 3

Step 1: Size = 1 (merge pairs)
   [4] + [2] = [2,4]
   [1] + [3] = [1,3]
   Result: 2 → 4 → 1 → 3

Step 2: Size = 2 (merge quads)
   [2,4] + [1,3] = [1,2,3,4]
   Result: 1 → 2 → 3 → 4 ✅
```

**Detailed Flow:**

```
Pass 1 (size=1):
   Merge (4) and (2) → 2→4
   Merge (1) and (3) → 1→3
   List: 2→4→1→3

Pass 2 (size=2):
   Merge (2→4) and (1→3) → 1→2→3→4
   List: 1→2→3→4

Pass 3 (size=4):
   Only one group, already sorted!
   Done! ✅
```

**Algorithm:**

```
1. Calculate total length of list

2. size = 1 se start karo
   while size < length:

      a. List ko size-size ke groups mein divide karo
      b. Har do adjacent groups ko merge karo
      c. size = size * 2 (double karo)

3. Sorted list return karo
```

**Complexity:**

**Time Complexity:** O(n log n)
- **Passes:** log n passes (size doubles every time)
- **Per pass:** O(n) work (merge karne mein)
- **Total:** O(n log n) ✅

**Space Complexity:** O(1) ⭐⭐
- **No recursion!** Call stack nahi
- **Only pointers!** Constant extra space
- **Follow-up satisfied!** ✅✅

**Pros:**
✅ Time optimal: O(n log n)
✅ Space optimal: O(1) ⭐⭐
✅ Follow-up question ka perfect answer!
✅ No recursion overhead

**Cons:**
❌ Code thoda complex hai
❌ Implementation tricky (pointer manipulation)
❌ Samajhna mushkil ho sakta hai initially

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Follow-up? | Code Complexity |
|----------|----------------|------------------|------------|-----------------|
| **Brute Force (Array)** | O(n log n) | O(n) | ❌ No | Easy ✅ |
| **Recursive Merge Sort** | O(n log n) | O(log n) | ❌ No | Medium |
| **Iterative Merge Sort** | O(n log n) | O(1) ⭐ | ✅ Yes | Hard |

**When to Use What:**

- **Brute Force:** Practice ke liye, jaldi prototype banana ho
- **Recursive:** Interview mein agar O(1) space nahi maanga
- **Iterative:** Follow-up satisfy karna ho, best solution! ⭐

---

## 🔑 Key Concepts Yaad Rakho

### 1. Why Merge Sort for Linked Lists? 💡

**Quick Sort nahi kyunki:**
- Pivot choose karne mein random access chahiye
- Linked list mein random access slow hai
- Partition karna mushkil hai

**Merge Sort perfect kyunki:**
- Sequential access kafi hai
- Merge operation natural hai
- Divide karna easy (middle nikal lo)

### 2. Fast/Slow Pointer Trick 🎯

```
slow → 1 step
fast → 2 steps

Jab fast end pe, slow middle pe! ✅
```

Ye technique har middle-finding problem mein kaam aati hai!

### 3. Bottom-up vs Top-down ⚡

**Top-down (Recursive):**
- Start from full list
- Divide, divide, divide...
- Then merge back up
- Uses O(log n) stack space

**Bottom-up (Iterative):**
- Start from smallest (size 1)
- Merge, merge, merge...
- Build up to full list
- Uses O(1) space! ⭐

---

## 🤔 Which Solution Do You Want to See?

Ab aapko decide karna hai - aap konsa solution dekhna chahte hain?

### Option 1: Brute Force (Array Use Karke) 📦
**Pros:** Sabse simple, jaldi samajh aayega
**Cons:** Extra space lagta hai
**Best for:** Concept samajhne ke liye

### Option 2: Recursive Merge Sort 🔄
**Pros:** Clean code, standard approach
**Cons:** Stack space use hota hai
**Best for:** Normal interviews (jab space nahi pucha)

### Option 3: Iterative Merge Sort (Optimal) ⭐
**Pros:** O(1) space, follow-up satisfy!
**Cons:** Implementation thoda tricky
**Best for:** Advanced interviews, optimal solution

---

**Bataiye, main aapke liye konsa code likhun?** 😊

1. **Brute Force** - Array wala simple approach
2. **Recursive** - Standard merge sort
3. **Iterative** - Optimal bottom-up approach (Follow-up answer!)

Aap jo bolo, main wahi detailed code, dry run, aur explanation ke saath likhta hoon! 🚀
