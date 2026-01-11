# Add Two Numbers

## 📋 Problem Statement

**Difficulty:** Medium
**Source:** LeetCode

[add-two-numbers-leetcode](https://leetcode.com/problems/add-two-numbers/)

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a **single digit**. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Samajhne ke liye (Understanding):**
- Do linked lists diye hain jo numbers represent karte hain (Two linked lists representing numbers)
- Digits **REVERSE ORDER** mein hain (Digits are in REVERSE ORDER)
  - Example: 342 → List mein [2, 4, 3] ke roop mein stored hai
- Har node mein ek single digit hai (0-9)
- In dono numbers ko add karna hai aur result bhi linked list ke roop mein return karna hai (Add these numbers and return result as linked list)

**Important Points:**
- Numbers reverse order mein hain (least significant digit first)
- Carry handle karna padega (Need to handle carry)
- Different lengths ke lists ho sakte hain (Lists can have different lengths)
- No leading zeros (except the number 0 itself)

**Constraints:**
- 1 <= Number of nodes <= 100
- 0 <= Node.val <= 9
- List represents a valid number without leading zeros

---

## 💡 Approaches

### Approach 1: Simulation (Iterative Addition with Carry)

**Intuition (Soch):**

Ye problem bilkul waisa hi hai jaise hum school mein addition karte the - **column by column, right to left!** (This problem is exactly like how we did addition in school - column by column, right to left!)

Lekin yahan ek twist hai - digits pehle se hi **reverse order** mein hain! Matlab list ke start se traverse karne ka matlab hai units place se start karna. (But here's a twist - digits are already in reverse order! This means traversing from the start means starting from the units place.)

**Visual Example:**
```
Number 1: 342
Number 2: 465
-----------
Sum:      807

Normal representation:   3 4 2
                       + 4 6 5
                       -------
                         8 0 7

Linked List (reverse):  2 → 4 → 3
                      + 5 → 6 → 4
                      -----------
                        7 → 0 → 8

Step by step:
Position 1: 2 + 5 = 7, carry = 0
Position 2: 4 + 6 = 10, digit = 0, carry = 1
Position 3: 3 + 4 + carry(1) = 8, carry = 0
```

**Key Insight:**
- Reverse order hone ki wajah se, hum seedha start se traverse kar sakte hain (Because of reverse order, we can traverse directly from start)
- Har position pe: `sum = val1 + val2 + carry`
- New digit: `sum % 10`
- New carry: `sum / 10`

**Algorithm:**

1. Initialize:
   - `dummyHead` = new ListNode(0) → Result list banane ke liye
   - `current` = dummyHead → Result list build karne ke liye pointer
   - `carry` = 0 → Carry track karne ke liye

2. Loop chalao jab tak dono lists khatam nahi hote ya carry bacha hai:
   ```
   while (l1 !== null || l2 !== null || carry !== 0)
   ```

3. Har iteration mein:
   - `val1` = l1 ka current value (ya 0 agar l1 null hai)
   - `val2` = l2 ka current value (ya 0 agar l2 null hai)
   - `sum` = val1 + val2 + carry
   - `digit` = sum % 10 → Ye current position ka digit hai
   - `carry` = Math.floor(sum / 10) → Next position ke liye carry
   - Nayi node banao with `digit` value
   - `current.next` ko ye nayi node point karao
   - `current`, `l1`, `l2` ko aage badhao

4. Return: `dummyHead.next` (kyunki dummyHead sirf placeholder hai)

**Time Complexity:** O(max(m, n))
- Jab tak longer list khatam nahi hoti, loop chalega
- m = length of l1, n = length of l2
- Har node ko ek baar visit karte hain

**Space Complexity:** O(max(m, n))
- Nayi linked list bana rahe hain result ke liye
- Worst case: Result ki length = max(m, n) + 1 (agar last mein carry bache)
- Example: 999 + 1 = 1000 (3 digits → 4 digits)

**Why this is OPTIMAL:**
- Single pass solution (ek hi baar traverse karna padta hai)
- No need to convert to numbers (directly linked list pe kaam kar rahe hain)
- Handles all edge cases naturally (different lengths, carry at end)

---

## 📊 Comparison of Possible Approaches

### Alternative Approach: Convert to Number, Add, Convert Back
**Why NOT use this?**
```
l1 → number1 (342)
l2 → number2 (465)
sum = 342 + 465 = 807
sum → result list [7,0,8]
```

**Problems:**
1. **Integer Overflow:** Agar numbers bahut bade hain (100 digits), toh number variable mein fit nahi honge!
   - JavaScript: Number.MAX_SAFE_INTEGER = 2^53 - 1 (only 16 digits)
   - Problem lists can have 100 nodes = 100 digits! 😱

2. **Extra Conversions:** Extra O(n) operations for conversion

3. **Not Scalable:** Real-world mein infinite precision arithmetic ke liye ye approach nahi chalega

### Why Simulation Approach is BEST:
- ✅ Works for ANY size numbers (no overflow)
- ✅ Single pass O(max(m, n))
- ✅ Natural digit-by-digit processing
- ✅ Handles carry automatically
- ✅ No extra conversions needed

---

## 🎯 Detailed Example Walkthrough

**Example:** l1 = [2,4,3], l2 = [5,6,4]

**What it means:**
- l1 represents: 342 (reversed: 2→4→3)
- l2 represents: 465 (reversed: 5→6→4)
- Sum should be: 807 (reversed: 7→0→8)

**Step-by-Step Addition:**

```
Position 1 (Units place):
  l1: 2
  l2: 5
  carry: 0
  sum = 2 + 5 + 0 = 7
  digit = 7 % 10 = 7
  carry = 7 / 10 = 0
  Result: 7 → ...

Position 2 (Tens place):
  l1: 4
  l2: 6
  carry: 0
  sum = 4 + 6 + 0 = 10
  digit = 10 % 10 = 0
  carry = 10 / 10 = 1
  Result: 7 → 0 → ...

Position 3 (Hundreds place):
  l1: 3
  l2: 4
  carry: 1
  sum = 3 + 4 + 1 = 8
  digit = 8 % 10 = 8
  carry = 8 / 10 = 0
  Result: 7 → 0 → 8 → null

Final Result: [7,0,8] representing 807 ✅
```

---

## 🔍 Edge Cases to Consider

### Edge Case 1: Different Lengths
```
l1 = [9,9,9,9,9,9,9] (9999999)
l2 = [9,9,9,9]       (9999)

9999999 + 9999 = 10009998

Result: [8,9,9,9,0,0,0,1]

Key: Continue processing jab tak l1 khatam nahi hota
```

### Edge Case 2: Carry at the End
```
l1 = [9,9,9] (999)
l2 = [1]     (1)

999 + 1 = 1000

Result: [0,0,0,1]

Key: Loop condition mein "carry !== 0" zaroori hai!
Otherwise last 1 miss ho jayega
```

### Edge Case 3: Both Lists are [0]
```
l1 = [0] (0)
l2 = [0] (0)

0 + 0 = 0

Result: [0]

Key: Simple case, no carry
```

### Edge Case 4: One List is Much Longer
```
l1 = [1,0,0,0,0,0,1] (1000001)
l2 = [5,6,4]         (465)

1000001 + 465 = 1000466

Result: [6,6,4,0,0,0,1]

Key: l2 khatam hone ke baad, l1 ko continue karo with carry
```

---

## 📌 Summary

| Aspect | Details |
|--------|---------|
| **Approach** | Simulation (Digit-by-digit addition) |
| **Time Complexity** | O(max(m, n)) - Single pass |
| **Space Complexity** | O(max(m, n)) - Result list |
| **Key Technique** | Carry handling with `sum % 10` and `Math.floor(sum / 10)` |
| **Edge Cases** | Different lengths, carry at end, zeroes |
| **Why Optimal** | Single pass, no overflow, handles any size |

---

## 🤔 Which Solution Do You Want to See?

Since this problem has essentially **one optimal approach** (simulation with carry), I'll implement:

**Solution: Simulation (Iterative Addition with Carry)**
- Complete implementation with detailed dry run
- All edge cases covered
- Test cases included

Batao kya main implementation create karu? (Tell me, should I create the implementation?)

---

## ✅ Implemented Solution

### Simulation (Iterative Addition with Carry) - `solution.ts`

**Approach:** Digit-by-digit addition with carry, just like school addition!

**Key Implementation Points:**
- **Dummy Head Technique:** Makes building result list cleaner
- **Carry Handling:** `digit = sum % 10`, `carry = Math.floor(sum / 10)`
- **Loop Condition:** `while (l1 || l2 || carry)` - Critical for carry at end!
- **Null Handling:** Treat null as 0

**Algorithm Flow:**
1. Initialize dummy head, current pointer, carry = 0
2. Loop while any list has nodes OR carry exists
3. Each iteration:
   - Get values (0 if null)
   - Calculate sum = val1 + val2 + carry
   - Extract digit and new carry
   - Create new node
   - Move pointers forward
4. Return dummyHead.next

**Comprehensive Dry Run:**
- Complete 3-iteration walkthrough for [2,4,3] + [5,6,4] = [7,0,8]
- Shows carry generation when sum = 10
- 3 detailed edge cases with complete visualization:
  - Carry at end: 999 + 1 = 1000
  - Different lengths: 9999999 + 9999
  - Both zero: 0 + 0 = 0

**7 Test Cases:**
1. ✅ 342 + 465 = 807 (Example 1)
2. ✅ 0 + 0 = 0 (Example 2)
3. ✅ 9999999 + 9999 = 10009998 (Example 3, different lengths)
4. ✅ 999 + 1 = 1000 (Carry at end)
5. ✅ 123 + 4 = 127 (Different lengths, no carry)
6. ✅ 5 + 5 = 10 (Single digit with carry)
7. ✅ 99 + 99 = 198 (Multiple carries)

**Files:**
- Implementation: `solution.ts`
- Namespace: `AddTwoNumbers`
- Helper functions: createList(), listToArray(), printList()

**Why This Solution is OPTIMAL:**
1. ✅ Single pass - O(max(m,n)) time
2. ✅ No integer overflow - works for 100+ digit numbers!
3. ✅ Direct processing - no conversions needed
4. ✅ Clean code with dummy head pattern
5. ✅ Handles all edge cases naturally