# Intersection of Two Linked Lists

## 📋 Problem Statement

**Difficulty:** Easy
**Source:** LeetCode

[intersection-of-two-linked-lists-leet-code](https://leetcode.com/problems/intersection-of-two-linked-lists/)

Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.

**Samajhne ke liye (Understanding):**
- Do linked lists diye hain (Two linked lists are given)
- Humein wo node dhoondhna hai jahan pe dono lists intersect karte hain (We need to find the node where both lists intersect)
- Intersection ka matlab hai SAME NODE REFERENCE, not same value (Intersection means SAME NODE REFERENCE, value same hona zaroori nahi)
- Agar intersection nahi hai toh `null` return karna hai (If no intersection, return null)

**Important Points:**
- Lists must retain their original structure (Koi modification nahi)
- Intersection is based on reference, NOT value (Node ka address same hona chahiye, value nahi)
- Test cases ensure no cycles exist (Koi cycle nahi hai linked list mein)

**Constraints:**
- 1 <= m, n <= 3 * 10^4 (m = length of listA, n = length of listB)
- 1 <= Node.val <= 10^5
- 0 <= skipA <= m, 0 <= skipB <= n

---

## 💡 Approaches

### Approach 1: Brute Force (Nested Loop)

**Intuition (Soch):**

Sabse simple approach yeh hai ki listA ke har node ko listB ke saath compare karo (The simplest approach is to compare each node of listA with listB).

- ListA ka ek node lo (Take one node from listA)
- Puri listB traverse karo aur check karo ki kya ye same node hai (Traverse entire listB and check if it's the same node)
- Agar match mil gaya toh return kar do, warna aage badho (If match found, return it, otherwise move forward)

**Algorithm:**

1. ListA ke head se start karo (Start from head of listA)
2. Current node ko listB ke saath compare karne ke liye:
   - ListB ko start se end tak traverse karo (Traverse listB from start to end)
   - Agar koi node match ho jaye (same reference), toh return kar do (If any node matches, return it)
3. Agar koi match nahi mila toh listA mein aage badho (If no match, move forward in listA)
4. Agar end tak koi intersection nahi mila toh `null` return karo (If no intersection found till end, return null)

**Time Complexity:** O(m × n)
- Har node of listA ke liye, puri listB traverse karni padti hai (For each node of listA, we traverse entire listB)
- m = length of listA, n = length of listB

**Space Complexity:** O(1)
- Koi extra space nahi use kar rahe (No extra space used)

**Drawback:**
- Bahut slow hai for large lists (Very slow for large lists)

---

### Approach 2: Better (Hashing / HashSet)

**Intuition (Soch):**

Agar hum listA ke saare nodes ko kisi HashSet mein store kar lein, toh listB traverse karte waqt hum O(1) time mein check kar sakte hain ki kya ye node listA mein bhi hai (If we store all nodes of listA in a HashSet, we can check in O(1) time while traversing listB whether this node is also in listA).

**Algorithm:**

1. Ek HashSet banao (Create a HashSet)
2. ListA ko traverse karo aur har node ko HashSet mein store karo (Traverse listA and store each node in HashSet)
3. ListB ko traverse karo:
   - Har node ko check karo ki kya ye HashSet mein exist karta hai (Check if each node exists in HashSet)
   - Agar exist karta hai, toh ye intersection node hai - return kar do (If exists, this is the intersection node - return it)
4. Agar koi match nahi mila toh `null` return karo (If no match found, return null)

**Time Complexity:** O(m + n)
- ListA traverse karne mein O(m) (Traversing listA takes O(m))
- ListB traverse karne mein O(n) (Traversing listB takes O(n))
- HashSet lookup O(1) hai (HashSet lookup is O(1))

**Space Complexity:** O(m)
- HashSet mein m nodes store ho rahe hain (HashSet stores m nodes)

**Advantage:**
- Brute force se bahut faster (Much faster than brute force)

**Drawback:**
- Extra O(m) space use ho raha hai (Using extra O(m) space)

---

### Approach 3: Optimal (Two Pointer - Length Difference Method)

**Intuition (Soch):**

Agar dono lists ki length same hoti, toh hum dono ko saath-saath move karke intersection dhoodh sakte the. Lekin lengths different hain, toh problem ye hai ki ek list mein zyada nodes hain.

**Key Insight:** Agar hum longer list ke pointer ko pehle (difference) steps aage move kar dein, toh phir dono pointers same distance pe honge intersection se (If we move the pointer of the longer list ahead by the difference in lengths, then both pointers will be at the same distance from the intersection).

**Visual Example:**
```
ListA: 4 → 1 → 8 → 4 → 5  (length = 5)
ListB:      5 → 6 → 1 → 8 → 4 → 5  (length = 6)

Difference = 6 - 5 = 1
Move listB pointer 1 step ahead:

ListA:      4 → 1 → 8 → 4 → 5
ListB:          6 → 1 → 8 → 4 → 5

Now both are at same distance from intersection (node 8)
```

**Algorithm:**

1. Dono lists ki length calculate karo: lenA aur lenB (Calculate lengths of both lists)
2. Difference nikalo: diff = |lenA - lenB| (Find difference)
3. Longer list ke pointer ko `diff` steps aage move karo (Move pointer of longer list ahead by diff steps)
4. Ab dono pointers ko saath-saath move karo jab tak:
   - Dono same node pe nahi aa jate (ya dono null ho jate) (Both reach same node or both become null)
5. Return the intersection node (or null)

**Time Complexity:** O(m + n)
- Length calculate karne mein O(m + n) (Calculating lengths takes O(m + n))
- Dono lists traverse karne mein O(m + n) max (Traversing both lists takes O(m + n) max)

**Space Complexity:** O(1)
- Sirf pointers use ho rahe hain, koi extra space nahi (Only using pointers, no extra space)

**This is the OPTIMAL solution!** ✅

---

### Approach 4: Optimal Alternative (Two Pointer - Switch Method)

**Intuition (Soch):**

Ye approach bahut clever hai! Agar dono pointers ko traverse karte waqt, jab ek end pe pahunche toh usse doosri list ke head pe bhej dein, toh eventually dono pointers same distance travel karenge aur intersection pe mil jayenge (If both pointers, when reaching the end, are sent to the other list's head, eventually both will travel the same distance and meet at intersection).

**Why this works:**
```
ListA length = m, ListB length = n
Intersection se pehle A mein = a nodes
Intersection se pehle B mein = b nodes
Intersection ke baad (common part) = c nodes

So: m = a + c, n = b + c

Pointer pA: travels a + c (listA) + b (listB) = a + b + c
Pointer pB: travels b + c (listB) + a (listA) = a + b + c

Dono same distance travel karte hain! (Both travel same distance!)
```

**Algorithm:**

1. Do pointers banao: pA = headA, pB = headB (Create two pointers)
2. Jab tak dono equal nahi ho jate: (While both are not equal)
   - Agar pA null ho gaya → pA = headB (If pA becomes null, move to headB)
   - Warna pA = pA.next (Otherwise move forward)
   - Agar pB null ho gaya → pB = headA (If pB becomes null, move to headA)
   - Warna pB = pB.next (Otherwise move forward)
3. Return pA (or pB, dono same honge) (Return pA or pB, both will be same)

**Time Complexity:** O(m + n)
- Dono pointers max m + n distance travel karte hain (Both pointers travel max m + n distance)

**Space Complexity:** O(1)
- Sirf do pointers use ho rahe hain (Only using two pointers)

**This is also OPTIMAL!** ✅

**Advantage over Approach 3:**
- Length calculate karne ki zaroorat nahi (No need to calculate lengths)
- Code bahut clean aur short hai (Code is very clean and short)

---

## 📊 Comparison Table

| Approach | Time Complexity | Space Complexity | Difficulty | Interview Preference |
|----------|----------------|------------------|------------|---------------------|
| Brute Force (Nested Loop) | O(m × n) | O(1) | Easy | ❌ Too slow |
| Better (Hashing) | O(m + n) | O(m) | Medium | ⚠️ Not optimal space |
| Optimal (Length Difference) | O(m + n) | O(1) | Medium | ✅ Good |
| Optimal (Switch Pointers) | O(m + n) | O(1) | Medium-Hard | ✅ Best (Most elegant) |

---

## 🤔 Which Solution Do You Want to See?

Batao kaunsa solution implement karna hai (Tell me which solution to implement):
- **brute** - Brute Force (Nested Loop)
- **better** - Better (Hashing / HashSet)
- **optimal** - Optimal (Length Difference Method)
- **optimal-switch** - Optimal Alternative (Switch Pointers Method)

**Recommendation:** Start with **optimal-switch** as it's the most elegant and commonly asked in interviews!

---

## ✅ Implemented Solutions

### 1. Brute Force (Nested Loop) - `brute-force.ts`

**Approach:** Nested loop comparison - ListA ke har node ko ListB ke har node se compare karo

**Key Points:**
- Simple aur straightforward implementation
- Reference-based comparison (=== operator)
- No extra space needed
- Slow for large lists

**Files:**
- Implementation: `brute-force.ts`
- Namespace: `IntersectionBruteForce`
- Test cases: 7 comprehensive test cases covering all edge cases

**When to use:**
- Small lists (m, n < 100)
- Understanding the problem
- Interview warm-up question

---

### 2. Better (Hashing / HashSet) - `better.ts`

**Approach:** Store listA nodes in HashSet, then check listB nodes for intersection

**Key Points:**
- Two-phase approach: Build HashSet → Check intersection
- HashSet stores node references (not values)
- O(1) lookup time using HashSet.has()
- Much faster than brute force (500x for large lists!)
- Trade-off: Uses extra O(m) space

**Algorithm:**
1. **Phase 1:** Traverse listA and add all nodes to HashSet
2. **Phase 2:** Traverse listB and check if each node exists in HashSet
3. First match found → Return intersection node

**Performance Comparison:**
- Small lists (m=5, n=6): 9 operations vs 30 (Brute Force) → 3.3x faster
- Large lists (m=1000, n=1000): 2,000 operations vs 1,000,000 → 500x faster! 🚀

**Files:**
- Implementation: `better.ts`
- Namespace: `IntersectionBetter`
- Test cases: 8 test cases including performance test

**When to use:**
- Large lists where performance matters
- When O(m) extra space is acceptable
- Good balance between time and space
- Interview follow-up: "Can you optimize brute force?"

---

### 3. Optimal (Two Pointer - Length Difference Method) - `optimal.ts`

**Approach:** Calculate lengths, align pointers by moving longer list ahead, then move both together

**Key Points:**
- Three-phase approach: Calculate lengths → Align pointers → Find intersection
- Move longer list's pointer ahead by `diff` steps
- After alignment, both pointers are SAME distance from end
- No extra space needed - only uses pointers!
- Same time complexity as HashSet but O(1) space 🏆

**Algorithm:**
1. **Phase 1:** Calculate length of both lists (lenA, lenB)
2. **Phase 2:** Find difference: `diff = |lenA - lenB|`
3. **Phase 3:** Move longer list's pointer ahead by `diff` steps
4. **Phase 4:** Move both pointers together until they meet (or both become null)

**Why it works:**
```
ListA: a nodes + c common nodes (length = a + c)
ListB: b nodes + c common nodes (length = b + c)

After moving longer pointer by |a - b|:
→ Both pointers are at same distance from intersection
→ Moving together guarantees they meet at intersection!
```

**Complexity Comparison:**
```
Better (HashSet):  Time O(m+n), Space O(m)
Optimal (This):    Time O(m+n), Space O(1) ✅

Winner: This approach - Same time, ZERO extra space! 🏆
```

**Files:**
- Implementation: `optimal.ts`
- Namespace: `IntersectionOptimal`
- Test cases: 9 test cases including edge cases with different length lists

**When to use:**
- **BEST for interviews!** Shows deep understanding
- When space optimization is critical
- Follow-up: "Can you do it without extra space?"
- Production code where memory is constrained

---

### 4. Optimal Alternative (Two Pointer - Switch Method) - `optimal-switch.ts`

**Approach:** Two pointers that switch to the other list when reaching end - MOST ELEGANT! 🌟

**Key Points:**
- **Single-loop approach** - No length calculation needed!
- When pointer reaches end → Switch to other list's head
- Both pointers travel SAME total distance
- Meet at intersection (or both become null if no intersection)
- Minimal code - only 2-3 lines of logic!

**Algorithm:**
```
pA = headA, pB = headB
while (pA !== pB):
  pA = pA === null ? headB : pA.next
  pB = pB === null ? headA : pB.next
return pA
```

**Why it works - The Magic:**
```
ListA: a nodes + c common (length = a + c)
ListB: b nodes + c common (length = b + c)

pA travels: (a + c) + b = a + b + c
pB travels: (b + c) + a = a + b + c

Both travel SAME distance! 🎯
Meet at intersection after switching!
```

**Example Path:**
```
ListA = [4,1,8,4,5], ListB = [5,6,1,8,4,5]

pA: 4→1→8→4→5→null→5→6→1→8  (9 steps to node 8)
pB: 5→6→1→8→4→5→null→4→1→8  (9 steps to node 8)

Both meet at node 8! ✅
```

**Complexity:**
```
Time:  O(m + n) - Each pointer travels at most m + n
Space: O(1)     - Only 2 pointers used

Same as Length Diff, but CLEANER code! 🎨
```

**Files:**
- Implementation: `optimal-switch.ts`
- Namespace: `IntersectionOptimalSwitch`
- Test cases: 10 test cases including all edge cases

**When to use:**
- 🏆 **MOST ELEGANT solution for interviews!**
- When you want to impress with clean, minimal code
- No need to calculate lengths or track differences
- Follow-up: "Can you make the code even cleaner?"
- **Recommended:** This is the BEST approach to learn and use! 🌟

**Why this is BEST:**
1. ✅ Shortest code (easy to remember)
2. ✅ No length calculation needed
3. ✅ Same O(m+n) time, O(1) space
4. ✅ Handles all edge cases automatically
5. ✅ Most elegant and beautiful algorithm! 🎨