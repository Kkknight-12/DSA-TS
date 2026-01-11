# Palindrome Linked List

**Difficulty:** Easy
**Topic:** Linked List, Two Pointers, Fast-Slow Pointers, Reverse Linked List
**LeetCode:** #234

---

## 📋 Problem Statement

Ek singly linked list diya gaya hai. Check karo ki ye list **palindrome** hai ya nahi. Palindrome matlab aage se ya peeche se padhne pe same ho.

**Return:** `true` agar palindrome hai, `false` agar nahi hai.

### Examples

**Example 1:**
```
Input: head = [1,2,2,1]
Output: true

Visual:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘

Forward:  1 → 2 → 2 → 1
Backward: 1 → 2 → 2 → 1
Same! ✅ Palindrome
```

**Example 2:**
```
Input: head = [1,2]
Output: false

Visual:
┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │null│
└───┴────┘   └───┴────┘

Forward:  1 → 2
Backward: 2 → 1
Different! ❌ Not Palindrome
```

**Example 3:**
```
Input: head = [1]
Output: true

Visual:
┌───┬────┐
│ 1 │null│
└───┴────┘

Single element is always palindrome ✅
```

**Example 4:**
```
Input: head = [1,2,3,2,1]
Output: true

Visual:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●──┼──→│ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 1 │null│
└───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘   └───┴────┘

Forward:  1 → 2 → 3 → 2 → 1
Backward: 1 → 2 → 3 → 2 → 1
Same! ✅ Palindrome (odd length)
```

### Constraints

- Number of nodes: `[1, 10^5]`
- Node values: `0 <= Node.val <= 9`

### Follow-up

**Can you solve it in O(n) time and O(1) space?** ⭐

---

## 🎯 Problem Understanding

**Palindrome kya hai?**

Palindrome wo hota hai jo aage se aur peeche se same padhein:
- Array example: `[1,2,3,2,1]` - palindrome ✅
- Array example: `[1,2,3,4,5]` - not palindrome ❌
- String example: `"racecar"` - palindrome ✅
- String example: `"hello"` - not palindrome ❌

**Linked List mein challenge:**

Array mein toh easily peeche se padh sakte hain (`arr[i]` and `arr[n-1-i]`), but linked list mein:
- ❌ Peeche se traverse nahi kar sakte (no backward pointers in singly linked list)
- ❌ Index access nahi hai
- ✅ Sirf aage se hi traverse kar sakte hain

**Toh kaise check karein?**

Teen main approaches hain:
1. List ko array mein copy kar lo (easy but O(n) space)
2. Second half ko reverse kar lo aur compare karo (O(1) space!)
3. Recursion use kar lo (but O(n) call stack)

---

## 🔧 Prerequisites

### 1. Palindrome Concept

**Array mein palindrome check:**
```javascript
function isPalindrome(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```

**Two pointer technique:** Dono ends se start karo aur middle tak aao

### 2. Finding Middle of Linked List

Slow-Fast pointer technique:
```javascript
function findMiddle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;        // 1 step
    fast = fast.next.next;   // 2 steps
  }

  return slow; // Middle node
}
```

### 3. Reversing a Linked List

```javascript
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev; // New head
}
```

**Ye teeno concepts combine karke optimal solution banaenge!**

---

## 💡 Approaches

### Approach 1: Brute Force (Array Copy)

**Soch (Intuition):**

"Agar linked list ko array mein copy kar dein, toh array mein palindrome check karna easy hai!"

**Algorithm:**

1. Ek array banao
2. Linked list traverse karo aur sare values array mein daal do
3. Array pe two-pointer palindrome check karo
   - left = 0, right = array.length - 1
   - Dono ko compare karo, agar different → false
   - Dono ko move karo towards middle
4. Agar sab match ho gaye → true

**Visual Example:**
```
List: 1 → 2 → 2 → 1

Step 1: Copy to array
array = [1, 2, 2, 1]

Step 2: Two pointer check
left = 0 (value = 1), right = 3 (value = 1) → 1 === 1 ✅
left = 1 (value = 2), right = 2 (value = 2) → 2 === 2 ✅
left >= right, stop

Result: true ✅
```

**Complexity:**
- **Time:** O(n) - list traverse + array check
- **Space:** O(n) - array mein n elements store kiye

**Pros:**
- ✅ Simple and easy to understand
- ✅ Original list ko modify nahi karna padta
- ✅ Easy to code

**Cons:**
- ❌ O(n) space complexity
- ❌ Follow-up satisfy nahi hoti (O(1) space chahiye)
- ❌ Extra memory usage

---

### Approach 2: Optimal (Reverse Second Half)

**Soch (Intuition):**

"Agar list ka second half reverse kar dein, toh first half aur reversed second half ko compare kar sakte hain!"

**Key Insight:**

Palindrome mein first half aur second half mirror image hote hain:
```
Original: 1 → 2 → 3 → 2 → 1
          ↓         ↓
      First Half  Second Half
        1 → 2      3 → 2 → 1

Agar second half reverse kar dein:
Second Half Reversed: 1 → 2 → 3

Ab compare karo:
First:  1 → 2 → (3 middle ignore kar sakte hain)
Second: 1 → 2 → 3

1 === 1 ✅
2 === 2 ✅
Palindrome! ✅
```

**Algorithm:**

**Phase 1: Find Middle (Slow-Fast Pointers)**
1. Slow aur Fast dono head se start
2. Slow 1 step, Fast 2 steps
3. Jab fast end pe pahunche, slow middle pe hoga

**Phase 2: Reverse Second Half**
1. Middle se aage wali list ko reverse kar do
2. Ab second half reversed hai

**Phase 3: Compare Both Halves**
1. Ek pointer first half pe (head)
2. Dusra pointer reversed second half pe
3. Dono ko compare karo step by step
4. Agar koi mismatch → false
5. Sab match → true

**Phase 4 (Optional): Restore List**
1. Second half ko wapas reverse kar do
2. Original list restore (agar chahiye toh)

**Visual Example:**
```
Input: 1 → 2 → 2 → 1

Phase 1: Find Middle
  slow moves: 1 → 2 → 2 (stops here)
  fast moves: 1 → 2 → null
  Middle = 2 (second occurrence)

Phase 2: Reverse from middle
  Before: 1 → 2 → 2 → 1
  After:  1 → 2    1 → 2
          ↑ first  ↑ second (reversed)

Phase 3: Compare
  p1 = 1, p2 = 1 → 1 === 1 ✅
  p1 = 2, p2 = 2 → 2 === 2 ✅
  p2 reached null, stop

  Result: true ✅

Phase 4 (Optional): Restore
  Reverse second half again
  Final: 1 → 2 → 2 → 1 (original restored)
```

**Detailed Walkthrough - Even Length:**
```
List: [1,2,3,3,2,1]

Step 1: Find Middle
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 1 │ → │ 2 │ → │ 3 │ → │ 3 │ → │ 2 │ → │ 1 │
└───┘   └───┘   └───┘   └───┘   └───┘   └───┘
                          ↑
                        slow (middle)

Step 2: Reverse Second Half (from slow)
Before: 3 → 2 → 1 → null
After:  1 → 2 → 3 → null

Step 3: Compare
First Half:  1 → 2 → 3
Second Half: 1 → 2 → 3

Compare step by step:
  1 === 1 ✅
  2 === 2 ✅
  3 === 3 ✅

Result: Palindrome! ✅
```

**Detailed Walkthrough - Odd Length:**
```
List: [1,2,3,2,1]

Step 1: Find Middle
┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
│ 1 │ → │ 2 │ → │ 3 │ → │ 2 │ → │ 1 │
└───┘   └───┘   └───┘   └───┘   └───┘
                  ↑
                slow (middle element)

Step 2: Reverse Second Half (from slow.next)
Before: 2 → 1 → null
After:  1 → 2 → null

Step 3: Compare (middle ko ignore karo)
First Half:  1 → 2
Second Half: 1 → 2

Compare:
  1 === 1 ✅
  2 === 2 ✅

Result: Palindrome! ✅

Note: Middle element (3) ko compare nahi karna,
kyunki odd length mein middle apne aap match hota hai
```

**Complexity:**
- **Time:** O(n)
  - Find middle: O(n/2)
  - Reverse second half: O(n/2)
  - Compare: O(n/2)
  - Total: O(n)
- **Space:** O(1) - only pointers used! ✅

**Pros:**
- ✅ O(1) space - Follow-up satisfied! ⭐
- ✅ Optimal solution
- ✅ Interview favorite

**Cons:**
- ❌ List ko temporarily modify karta hai
- ❌ Thoda complex logic
- ❌ Restore karna optional (but good practice)

---

### Approach 3: Recursion (For Learning)

**Soch (Intuition):**

"Recursion se end tak jao, phir wapas aate waqt compare karo!"

**Not optimal for this problem** (O(n) call stack space), but good for understanding recursion.

**Algorithm:**

1. Recursive function banao jo list ka first aur last node compare kare
2. Base case: Agar list empty ya single node → true
3. Recursive case: First aur last compare karo, baaki recursively check karo

**Complexity:**
- **Time:** O(n)
- **Space:** O(n) - recursion call stack

**Why not preferred:**
- ❌ O(n) space (call stack)
- ❌ Follow-up requirement satisfy nahi hoti
- ✅ But good for learning recursion concepts

---

## 📊 Approach Comparison

| Aspect | Brute Force (Array) | Optimal (Reverse Half) | Recursion |
|--------|---------------------|------------------------|-----------|
| **Time Complexity** | O(n) | O(n) | O(n) |
| **Space Complexity** | O(n) | **O(1)** ✅ | O(n) |
| **Ease of Understanding** | Easy | Medium | Hard |
| **Code Complexity** | Simple | Moderate | Complex |
| **Modifies List** | No | Yes (temporarily) | No |
| **Interview Preference** | Good | **Excellent** ⭐ | Not recommended |
| **Follow-up Satisfied** | ❌ No | ✅ Yes | ❌ No |

**Winner:** Optimal (Reverse Second Half) approach for interviews! 🏆

---

## 🎯 Which Approach to Use When?

### In Interviews:
**Always mention BOTH approaches!**

1. **Start with Brute Force:**
   - "Pehli approach simple hai - list ko array mein copy karke check kar sakte hain"
   - Shows you can solve the problem

2. **Then optimize:**
   - "Lekin follow-up O(1) space maang raha hai"
   - "Main second half ko reverse karke O(1) space mein solve kar sakta hoon"
   - Shows optimization skills

### For Production:
**Depends on requirements:**
- List modify nahi honi chahiye → Brute Force (Array)
- Space constraint hai → Optimal (Reverse Half)
- List badi hai aur memory limited hai → Optimal

### For Learning:
**Learn in this order:**
1. Brute Force (understand palindrome concept)
2. Optimal (master slow-fast pointers + reversal)
3. Recursion (optional, for recursion practice)

---

## 🔍 Key Insights

### 1. Middle Node for Even vs Odd Length

**Even Length:** `[1,2,3,3,2,1]`
```
Slow stops at: 2nd occurrence of 3
               (start of second half)
```

**Odd Length:** `[1,2,3,2,1]`
```
Slow stops at: middle element (3)
We reverse from slow.next
Middle element ko ignore karo comparison mein
```

**Why this works?**
- Even length: Compare n/2 elements from each half
- Odd length: Compare n/2 elements (middle automatically matches itself)

### 2. Why Reverse Second Half (Not First)?

**Could we reverse first half?** Yes, but:
- Second half reverse karna easier (we already have middle node)
- Restoration bhi easier
- Code cleaner rehta hai

### 3. Do We Need to Restore?

**It depends:**

✅ **Restore if:**
- Problem says "don't modify list"
- List ka reuse hoga
- Good practice for interviews

❌ **Don't restore if:**
- Performance critical
- Problem explicitly allows modification
- One-time check hai

Most interviews mein restore karna shows good coding practice! ⭐

---

## 🚨 Edge Cases

### 1. Single Node
```
Input: [1]
Output: true

Single element is always palindrome
```

### 2. Two Nodes - Palindrome
```
Input: [1,1]
Output: true

First: 1
Second: 1 (reversed)
Match! ✅
```

### 3. Two Nodes - Not Palindrome
```
Input: [1,2]
Output: false

First: 1
Second: 2 (reversed = 2)
No match! ❌
```

### 4. All Same Values
```
Input: [5,5,5,5,5]
Output: true

All elements same = automatically palindrome
```

### 5. Long Palindrome (Even)
```
Input: [1,2,3,4,4,3,2,1]
Output: true

Perfect mirror!
```

### 6. Long Palindrome (Odd)
```
Input: [1,2,3,4,3,2,1]
Output: true

Middle = 4, ignore it
Rest forms palindrome
```

### 7. Almost Palindrome
```
Input: [1,2,3,2,2]
Output: false

First half: 1,2
Second half (reversed): 2,2
Mismatch at position 2!
```

---

## ⚠️ Common Mistakes

### Mistake 1: Not Handling Odd Length Correctly

```typescript
❌ WRONG: Including middle in comparison
// For [1,2,3,2,1]
// Comparing: 1,2,3 with 1,2,3 after reversal
// This won't work correctly!

✅ CORRECT: Start comparing from slow.next for odd length
// For [1,2,3,2,1]
// Slow at 3 (middle)
// Reverse from slow.next: 2,1 becomes 1,2
// Compare first half (1,2) with reversed (1,2)
```

### Mistake 2: Wrong Middle Node for Even Length

```typescript
❌ WRONG:
while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}
// For [1,2,3,4], slow stops at 2 (want 3)

✅ CORRECT: For this problem, current slow position is fine
// We reverse from slow onwards
// For [1,2,3,4]: reverse 3,4 to get 4,3
// Compare 1,2 with 4,3
```

### Mistake 3: Not Checking for null in Reversal

```typescript
❌ WRONG:
let prev = null;
let current = head;
while (current !== null) {
  let next = current.next;
  current.next = prev;
  prev = current;
  current = next;
}
// Forgetting to check if head is null initially

✅ CORRECT:
if (head === null) return null;
// Then do reversal
```

### Mistake 4: Forgetting to Restore List

```typescript
❌ BAD PRACTICE (if problem requires no modification):
// Just compare and return
// List remains modified!

✅ GOOD PRACTICE:
// After comparison, reverse second half again
// Restore original list structure
```

### Mistake 5: Comparing Entire List After Reversal

```typescript
❌ WRONG:
// Reverse entire list and compare with original
// This requires O(n) space to store original!

✅ CORRECT:
// Reverse only second half
// Compare first half with reversed second half
// O(1) space!
```

---

## 🎯 Interview Tips

### What to Say to Interviewer

**Initial Response:**
```
"Palindrome linked list check karna hai. Main do approaches batata hoon:

1. Brute Force: List ko array mein copy karke palindrome check - O(n) space
2. Optimal: Second half reverse karke compare - O(1) space ✅

Follow-up O(1) space maang raha hai, toh main optimal approach use karunga."
```

**During Explanation:**
```
"Optimal approach teen phases mein kaam karti hai:

Phase 1: Slow-fast pointers se middle dhundhte hain
Phase 2: Middle se second half ko reverse karte hain
Phase 3: First half aur reversed second half ko compare karte hain

Agar chahiye toh Phase 4 mein list restore bhi kar sakte hain."
```

### Common Follow-up Questions

**Q1: Even aur odd length mein difference kya hai?**

**A:** "Odd length mein slow middle element pe stop hota hai jo comparison mein include nahi hota (kyunki middle apne aap se match karega). Even length mein slow second half ke start pe hota hai, toh puri second half reverse hoti hai."

**Q2: Kya original list restore karna zaroori hai?**

**A:** "Depends on problem requirement. Agar problem kehti hai 'don't modify', toh restore karna padega. Warna optional hai, but good practice hai restore karna."

**Q3: Time complexity detail mein explain karo.**

**A:**
```
Phase 1 (Find middle): O(n/2) - slow goes n/2 steps
Phase 2 (Reverse): O(n/2) - reverse n/2 nodes
Phase 3 (Compare): O(n/2) - compare n/2 pairs
Phase 4 (Restore): O(n/2) - optional

Total: O(n/2 + n/2 + n/2) = O(n)
```

**Q4: Space complexity kaise O(1) hai agar pointers use kar rahe hain?**

**A:** "Hum constant number of pointers use kar rahe hain (prev, current, slow, fast, p1, p2) jo input size se independent hain. Extra data structure (array, stack, etc.) use nahi kar rahe, isliye O(1) space."

**Q5: Kya recursion se bhi kar sakte hain?**

**A:** "Haan kar sakte hain, but recursion mein O(n) call stack space lagta hai jo follow-up requirement violate karta hai. Isliye iterative approach better hai."

### Red Flags to Avoid

❌ Don't say "Main directly code likhta hoon" - explain approach first
❌ Don't forget to mention both brute force and optimal
❌ Don't ignore edge cases (single node, two nodes)
❌ Don't forget to explain why O(1) space is achieved
❌ Don't modify list without mentioning restoration

### Bonus Points

⭐ Draw diagrams while explaining
⭐ Mention time/space complexity upfront
⭐ Discuss trade-offs (modification vs extra space)
⭐ Show restoration even if not required
⭐ Handle edge cases in code

---

## 📝 Practice Tips

### Step 1: Master Prerequisites
- Practice finding middle of linked list
- Practice reversing linked list
- Practice two-pointer technique

### Step 2: Solve Brute Force First
- Understand why array approach works
- Get comfortable with two-pointer palindrome check

### Step 3: Understand the Insight
- Why reversing second half works
- How to handle even vs odd length
- When to stop comparison

### Step 4: Code Optimal Solution
- Write all three phases clearly
- Add restoration phase
- Test with different lengths

### Step 5: Test Edge Cases
- Single node
- Two nodes (palindrome and non-palindrome)
- Even length palindrome
- Odd length palindrome
- Non-palindrome cases

---

## 🔗 Related Problems

**Must Solve Before:**
1. **Reverse Linked List** - Core prerequisite
2. **Middle of Linked List** - Finding middle technique
3. **Merge Two Sorted Lists** - Pointer manipulation

**Solve After:**
1. **Reverse Linked List II** - Reverse a portion
2. **Reorder List** - Similar reverse second half technique
3. **Valid Palindrome** - String palindrome (easier)
4. **Palindrome Number** - Number palindrome

**Same Technique:**
1. **Reorder List** - Uses slow-fast + reversal
2. **Intersection of Two Linked Lists** - Two pointer technique

---

## 🎓 Key Takeaways

1. **Three Valid Approaches:**
   - Brute Force (Array): O(n) space, simple
   - Optimal (Reverse Half): O(1) space, elegant ⭐
   - Recursion: O(n) space, learning purpose

2. **Optimal Solution Phases:**
   - Find middle (slow-fast pointers)
   - Reverse second half
   - Compare both halves
   - Restore (optional)

3. **Even vs Odd Handling:**
   - Even: Compare all nodes
   - Odd: Ignore middle node

4. **Space Optimization:**
   - Don't copy to array
   - Reverse in-place
   - Use only pointers

5. **Interview Strategy:**
   - Always mention both approaches
   - Explain why O(1) is better
   - Show restoration technique

**Remember:** This problem combines multiple linked list techniques - slow-fast pointers, reversal, and comparison. Master each individually first! 🚀

---

## 🤔 Which Solution Do You Want to See?

Aap konsa solution dekhna chahte hain?

1. **Brute Force** - Array approach (simple, O(n) space)
2. **Optimal** - Reverse second half (O(1) space, interview favorite) ⭐
3. **Both** - Dono solutions with complete code

Bataiye, main aapke liye konsa code likhun?
