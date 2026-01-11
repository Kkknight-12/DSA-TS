# Linked List Cycle II

**Difficulty:** Medium
**Topic:** Linked List, Two Pointers, Floyd's Algorithm
**LeetCode:** #142

---

## 📋 Problem Statement

Ek linked list diya gaya hai. Agar list mein cycle hai (matlab tail ka next pointer kisi previous node ko point karta hai), toh **cycle jahan se shuru hoti hai us node ko return karo**. Agar cycle nahi hai, toh `null` return karo.

**Important:** List ko modify nahi karna hai (read-only operation).

### Examples

**Example 1:**
```
Input: head = [3,2,0,-4], pos = 1
Output: Node at index 1 (value = 2)

Visual:
┌───┬────┐   ┌───┬────┐   ┌───┬────┐   ┌───┬────┐
│ 3 │ ●──┼──→│ 2 │ ●──┼──→│ 0 │ ●──┼──→│-4 │ ●  │
└───┴────┘   └───┴────┘   └───┴────┘   └───┴─┬──┘
                  ↑                              │
                  └──────────────────────────────┘

Explanation: Tail (-4) points back to node 2, so cycle starts at node 2.
```

**Example 2:**
```
Input: head = [1,2], pos = 0
Output: Node at index 0 (value = 1)

Visual:
┌───┬────┐   ┌───┬────┐
│ 1 │ ●──┼──→│ 2 │ ●  │
└───┴────┘   └───┴─┬──┘
     ↑              │
     └──────────────┘

Explanation: All nodes are in cycle, cycle starts at head.
```

**Example 3:**
```
Input: head = [1], pos = -1
Output: null

Visual:
┌───┬────┐
│ 1 │null│
└───┴────┘

Explanation: No cycle exists.
```

### Constraints

- Number of nodes: `[0, 10^4]`
- Node values: `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a valid index (used internally for testing, not passed as parameter)

### Key Points

1. **Return the NODE reference**, not the index or value
2. If no cycle exists, return `null`
3. Do not modify the list
4. **Follow-up:** Can you solve it using O(1) space? ⭐

---

## 🎯 Problem Understanding

**Kya samajhna hai:**

1. **Cycle kya hai?**
   - Jab list ke end se ek node wapas kisi previous node ko point kare
   - Infinite loop ban jata hai

2. **Kya chahiye?**
   - Wo node chahiye jahan se cycle START hoti hai
   - Start node = jis node pe tail ka next point karta hai

3. **Example se samjho:**
   ```
   List: 1 → 2 → 3 → 4 → 5
                ↑           ↓
                └───────────┘

   Yahan node 3 pe cycle start hoti hai (node 5 ka next = node 3)
   Answer: Return node 3
   ```

---

## 🔧 Prerequisites

### 1. Linked List Basics

Linked list ek data structure hai jahan har node do cheezon ka combination hota hai:
- **Data/Value**: Node ki value
- **Next Pointer**: Agle node ka reference

```typescript
class ListNode {
  val: number;
  next: ListNode | null;
}
```

### 2. Two Pointer Technique

Do pointers use karte hain jo alag-alag speed se move karte hain:
- **Slow pointer**: 1 step at a time
- **Fast pointer**: 2 steps at a time

**Why useful for cycles?**
- Agar cycle hai, toh fast eventually slow ko overtake karega
- Dono meet karenge cycle ke andar
- Agar cycle nahi hai, fast null pe pahunch jayega

### 3. Floyd's Cycle Detection (Tortoise and Hare)

Famous algorithm for detecting cycles:
- Slow (tortoise) aur Fast (hare) dono head se start
- Slow 1 step, Fast 2 steps
- Agar milte hain = cycle exists!
- Agar fast null pe pahunche = no cycle

---

## 💡 Approaches

### Approach 1: Brute Force (HashSet)

**Soch (Intuition):**

Sabse simple idea: "Har node ko yaad rakh lo. Agar koi node dobara mile, wahi cycle start hai!"

**Algorithm:**

1. Ek Set banao jo visited nodes ko store kare
2. List ko traverse karo node by node
3. Har node check karo:
   - Agar pehle se Set mein hai → yahi cycle start! Return kar do
   - Nahi hai → Set mein add kar do
4. Agar null mil gaya → no cycle, return null

**Visual Example:**
```
List: 3 → 2 → 0 → -4 → (back to 2)

Step 1: Visit 3 → Set: {3}
Step 2: Visit 2 → Set: {3, 2}
Step 3: Visit 0 → Set: {3, 2, 0}
Step 4: Visit -4 → Set: {3, 2, 0, -4}
Step 5: Visit 2 → Already in Set! ✅ Return node 2
```

**Complexity:**
- **Time:** O(n) - har node ko ek baar visit karte hain
- **Space:** O(n) - worst case sare nodes Set mein store ho sakte hain

**Pros:**
- ✅ Simple to understand
- ✅ Easy to implement
- ✅ Guaranteed to work

**Cons:**
- ❌ O(n) space complexity
- ❌ Follow-up requirement satisfy nahi hoti (O(1) space chahiye)

---

### Approach 2: Optimal (Floyd's Cycle Detection Algorithm)

**Soch (Intuition):**

Mathematical insight use karte hain! Do phases:

**Phase 1:** Cycle exists ya nahi? (Slow-Fast pointers)
**Phase 2:** Cycle start kahan hai? (Mathematical formula)

**The Magic Formula:**

Jab slow aur fast milte hain cycle ke andar:
- Agar ek pointer **head** se 1 step at a time chale
- Aur dusra pointer **meeting point** se 1 step at a time chale
- Dono **cycle start** pe milenge! 🎯

**Why?** Mathematical proof:
```
L = distance from head to cycle start
C = cycle length
k = distance from cycle start to meeting point

When they meet:
  Slow traveled: L + k
  Fast traveled: L + k + nC (n complete cycles)

Since Fast is 2x speed:
  2(L + k) = L + k + nC
  L = nC - k

This means: Distance from HEAD to cycle start =
            Distance from MEETING POINT to cycle start
```

**Algorithm:**

**Phase 1: Detect Cycle**
1. Slow aur Fast dono head se start
2. Slow 1 step, Fast 2 steps
3. Agar milte hain → cycle exists!
4. Agar fast null pe pahunche → no cycle

**Phase 2: Find Cycle Start**
1. ptr1 = head
2. ptr2 = meeting point
3. Dono ko 1-1 step se chalao
4. Jahan milenge = cycle start! ✅

**Visual Example:**
```
List: 3 → 2 → 0 → -4 → (back to 2)

Phase 1: Detect cycle
  Initial: slow = 3, fast = 3
  Iter 1:  slow = 2, fast = 0
  Iter 2:  slow = 0, fast = 2
  Iter 3:  slow = -4, fast = -4 ✅ Meet at -4!

Phase 2: Find start
  ptr1 = head = 3
  ptr2 = meeting = -4

  Move both 1 step:
    ptr1 = 2, ptr2 = 2 ✅ Meet at 2!

  Return: node 2 (cycle start)
```

**Complexity:**
- **Time:** O(n) - worst case har node ko 2 baar visit karte hain
- **Space:** O(1) - sirf 2-4 pointers use kiye! ✅

**Pros:**
- ✅ O(1) space - Follow-up satisfied! ⭐
- ✅ Elegant mathematical solution
- ✅ No extra data structures
- ✅ Interview favorite

**Cons:**
- ❌ Harder to understand initially
- ❌ Requires mathematical proof knowledge
- ❌ Two phases can be confusing

---

## 📊 Approach Comparison

| Aspect | Brute Force (HashSet) | Optimal (Floyd's Algorithm) |
|--------|----------------------|---------------------------|
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | O(n) | **O(1)** ✅ |
| **Ease of Understanding** | Easy | Medium |
| **Code Complexity** | Simple | Moderate |
| **Interview Preference** | Good | **Excellent** ⭐ |
| **Follow-up Satisfied** | ❌ No | ✅ Yes |
| **When to Use** | Quick solution, clarity needed | Optimal solution, space-constrained |

**Key Insight:**

- Both are O(n) time, but space makes the difference!
- Brute Force: Trade space for simplicity
- Optimal: Use math to achieve O(1) space

---

## 🎓 Which Approach Should You Learn?

### For Interviews:
**Learn BOTH!**

1. **Start with Brute Force** in interview:
   - "Pehle main brute force approach batata hoon using HashSet..."
   - Shows you can solve the problem

2. **Then optimize to Floyd's**:
   - "Ab main isko O(1) space mein optimize kar sakta hoon..."
   - Shows you understand optimization

### For Understanding:
**Brute Force first**, then Floyd's

- Brute Force builds intuition
- Floyd's builds mathematical thinking

### For Production:
**Depends on constraints**

- Small lists, clarity needed → Brute Force
- Large lists, memory constraint → Floyd's
- Interview setting → Always Floyd's! ⭐

---

## 🧮 Mathematical Deep Dive (Floyd's Algorithm)

### The Proof Everyone Asks About

**Setup:**
```
Head ────────→ Cycle Start ────────→ Meeting Point
      (L steps)      ↑       (k steps)       ↓
                     │                       │
                     └───────────────────────┘
                          (C - k steps back)
```

**Variables:**
- L = distance from head to cycle start
- C = cycle length (total)
- k = distance from cycle start to meeting point

**When slow and fast meet:**

Slow has traveled: `L + k`
Fast has traveled: `L + k + nC` (where n = complete cycles)

**Since fast is 2x speed:**
```
2 × (L + k) = L + k + nC
2L + 2k = L + k + nC
L + k = nC
L = nC - k
```

**What does this mean?**

L = nC - k means:
- Starting from HEAD and traveling L steps → reach cycle start
- Starting from MEETING POINT and traveling L steps → also reach cycle start!

**Because:**
- From meeting point, travel nC - k steps
- This is (n-1) complete cycles + (C - k) steps
- C - k takes you from meeting point back to cycle start!

**Therefore:** Both pointers meet at cycle start! 🎯

---

## 🚨 Edge Cases to Handle

### 1. Empty List
```
Input: null
Output: null
```

### 2. Single Node, No Cycle
```
1 → null
Output: null
```

### 3. Single Node with Self-Loop
```
1 ⟲ (points to itself)
Output: node 1
```

### 4. Two Nodes Forming Cycle
```
1 ⇄ 2 (both point to each other)
Output: node 1 (cycle starts at head)
```

### 5. All Nodes in Cycle
```
1 → 2 → 3 → 4 → (back to 1)
Output: node 1 (L = 0)
```

### 6. Long List, Small Cycle at End
```
1 → 2 → 3 → 4 → 5 → 6 → 7
                ↑       ↓
                └───────┘
Output: node 5
```

### 7. Duplicate Values
```
1 → 2 → 2 → 3 → (back to 2nd node with value 2)
Output: 2nd node (not 1st!) - We return reference, not value
```

---

## ⚠️ Common Mistakes

### Mistake 1: Storing Values Instead of References
```typescript
❌ WRONG:
const visited = new Set<number>();
visited.add(current.val);  // Storing value!

Problem: Two nodes with same value will be confused

✅ CORRECT:
const visited = new Set<ListNode>();
visited.add(current);  // Storing node reference
```

### Mistake 2: Not Checking fast.next in Loop
```typescript
❌ WRONG:
while (fast !== null) {
  slow = slow.next;
  fast = fast.next.next;  // Crash if fast.next is null!
}

✅ CORRECT:
while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;  // Safe
}
```

### Mistake 3: Returning Meeting Point Instead of Cycle Start
```typescript
❌ WRONG:
if (slow === fast) {
  return slow;  // This is meeting point, not cycle start!
}

✅ CORRECT:
if (slow === fast) {
  // Phase 2: Find actual cycle start
  let ptr1 = head;
  let ptr2 = slow;
  while (ptr1 !== ptr2) {
    ptr1 = ptr1.next;
    ptr2 = ptr2.next;
  }
  return ptr1;  // Cycle start
}
```

### Mistake 4: Different Speeds in Phase 2
```typescript
❌ WRONG:
while (ptr1 !== ptr2) {
  ptr1 = ptr1.next;
  ptr2 = ptr2.next.next;  // Wrong speed!
}

✅ CORRECT:
while (ptr1 !== ptr2) {
  ptr1 = ptr1.next;
  ptr2 = ptr2.next;  // Both 1 step
}
```

---

## 🎯 Interview Tips

### What to Say to Interviewer

**Initial Response:**
```
"Maine problem samjha. Ek linked list hai jismein cycle ho sakta hai.
Mujhe cycle ka start node return karna hai.

Main do approaches discuss karna chahunga:
1. Brute force using HashSet - O(n) space
2. Optimal using Floyd's Algorithm - O(1) space

Kaunsa approach chahiye?"
```

**During Explanation:**
```
"Floyd's algorithm do phases mein kaam karta hai:
- Phase 1: Cycle detect karo (slow-fast pointers)
- Phase 2: Cycle start dhundo (mathematical approach)

Mathematical insight yeh hai ki head se cycle start tak ka distance,
meeting point se cycle start tak ke distance ke equal hota hai."
```

### Common Follow-up Questions

**Q1: Why does Floyd's algorithm always detect a cycle?**

**A:** "Kyunki cycle ke andar dono pointers relative speed 1 se move karte hain. Fast 2 steps leta hai, slow 1 step, toh har iteration mein distance 1 se kam hota hai. Eventually distance 0 ho jayega aur mil jayenge!"

**Q2: Can fast and slow miss each other?**

**A:** "Nahi! Kyunki relative speed exactly 1 hai. Agar fast 3x speed se chalta toh miss ho sakta tha, but 2x perfect hai."

**Q3: What if cycle starts at head (L = 0)?**

**A:** "Tab bhi algorithm work karega! Phase 2 mein ptr1 head pe hoga jo cycle start bhi hai, aur ptr2 meeting point se chalkar cycle start pe aayega. Dono wahan milenge."

**Q4: Time complexity detail?**

**A:** "Phase 1: Worst case O(n) - sare nodes visit karte hain ek baar. Phase 2: Maximum O(n) - head se cycle start tak. Total: O(n) + O(n) = O(n)."

### Red Flags to Avoid

❌ Don't jump to code without explaining approach
❌ Don't forget to mention edge cases (empty list, no cycle)
❌ Don't say "I'll use Floyd's" without explaining WHY it works
❌ Don't confuse meeting point with cycle start

### Bonus Points

⭐ Mention both approaches and their trade-offs
⭐ Explain the mathematical proof clearly
⭐ Draw diagrams while explaining
⭐ Discuss edge cases proactively
⭐ Mention that HashSet approach is O(n) space but simpler

---

## 📝 Practice Tips

### Step 1: Master Brute Force First
- Understand why Set stores node references
- Practice with different examples
- Get comfortable with the logic

### Step 2: Learn Floyd's Detection (Phase 1)
- Practice slow-fast pointer movement
- Understand why they meet in cycle
- Trace through examples manually

### Step 3: Understand the Math (Phase 2)
- Work through L = nC - k derivation
- Draw diagrams for different scenarios
- Convince yourself why both pointers meet at start

### Step 4: Code Both Solutions
- Write brute force from memory
- Write Floyd's from memory
- Compare and understand differences

### Step 5: Test Edge Cases
- Empty list
- Single node (with and without cycle)
- All nodes in cycle
- Large lists

---

## 🔗 Related Problems

**Similar Concepts:**
1. **Linked List Cycle I** - Just detect if cycle exists (easier)
2. **Find Duplicate Number** - Uses same Floyd's algorithm concept
3. **Happy Number** - Cycle detection in sequence
4. **Intersection of Two Linked Lists** - Two pointer technique

**Practice Progression:**
1. Start with Linked List Cycle I (easier)
2. Then solve this problem (Cycle II)
3. Then try Find Duplicate Number (applies same concept)

---

## 🎓 Key Takeaways

1. **Two Valid Approaches:**
   - Brute Force (HashSet): O(n) space, simple
   - Optimal (Floyd's): O(1) space, elegant

2. **Floyd's Algorithm Magic:**
   - Phase 1: Detect cycle (slow-fast meet)
   - Phase 2: Find start (mathematical insight)

3. **Mathematical Insight:**
   - L = nC - k
   - Distance from head = Distance from meeting point

4. **Interview Strategy:**
   - Mention both approaches
   - Explain why optimal is better
   - Show mathematical understanding

5. **Space vs Simplicity:**
   - HashSet: Simple but O(n) space
   - Floyd's: Complex but O(1) space

**Remember:** Floyd's algorithm shows deep understanding. Master it for interviews! 🚀

---

## 📚 Implementation Files

- **`brute-force.ts`** - HashSet approach with complete dry run
- **`optimal.ts`** - Floyd's algorithm with mathematical proof

Both files contain:
- Complete working code with namespace
- Detailed comments on every line
- Multiple test cases
- Edge case handling
- Visual ASCII diagrams
- Complexity analysis
