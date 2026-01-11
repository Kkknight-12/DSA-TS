# Next Greater Element (NGE)

**Difficulty:** Medium
**Topics:** Stack, Monotonic Stack, Array
**Pattern:** Monotonic Stack (Very Important!)

---

## Problem Statement

Given an array `arr` of size `n` containing elements, find the **next greater element** for each element in the array in the order of their appearance.

The **next greater element** of an element in the array is the **nearest element on the right** that is **greater** than the current element.

If there does not exist a next greater element for the current element, then the next greater element for that element is `-1`.

---

## Examples

### Example 1:
```
Input: arr = [1, 3, 2, 4]
Output: [3, 4, 4, -1]

Explanation:
- NGE of 1 → 3 (first greater element to right)
- NGE of 3 → 4 (first greater element to right)
- NGE of 2 → 4 (first greater element to right)
- NGE of 4 → -1 (no greater element to right)
```

**Visual:**
```
arr = [1, 3, 2, 4]
       ↓  ↓  ↓  ↓
NGE = [3, 4, 4, -1]

1 → looks right → finds 3 ✓
3 → looks right → skips 2 → finds 4 ✓
2 → looks right → finds 4 ✓
4 → looks right → nothing → -1
```

### Example 2:
```
Input: arr = [6, 8, 0, 1, 3]
Output: [8, -1, 1, 3, -1]

Explanation:
- NGE of 6 → 8
- NGE of 8 → -1 (no greater element)
- NGE of 0 → 1
- NGE of 1 → 3
- NGE of 3 → -1
```

### Example 3:
```
Input: arr = [4, 3, 2, 1]
Output: [-1, -1, -1, -1]

Explanation:
Strictly decreasing array - no element has a greater element to its right!
```

### Example 4:
```
Input: arr = [1, 2, 3, 4]
Output: [2, 3, 4, -1]

Explanation:
Strictly increasing array - each element's NGE is the next element!
```

---

## Constraints

- `1 <= arr.length <= 10^5`
- `0 <= arr[i] <= 10^9`

---

## Prerequisites (Agar Koi Chahiye)

**For Optimal Solution:**
- **Monotonic Stack**: Stack that maintains elements in sorted order (increasing/decreasing)
- **Stack operations**: push, pop, peek

**Why Monotonic Stack?**
- When finding "next greater/smaller", monotonic stack is the go-to pattern
- Maintains elements waiting for their answer
- Processes each element exactly once

---

## Approach 1: Brute Force - O(n²)

### Intuition (Soch):

**Simple approach:** Har element ke liye, right side scan karo aur pehla bada element dhundo!

```
For each element at index i:
  Scan from i+1 to end
  Find first element > arr[i]
  If found → that's NGE
  If not found → -1
```

**Visual example:**

```
arr = [1, 3, 2, 4]

For i=0 (element=1):
  Check index 1: arr[1]=3 > 1? YES! NGE[0] = 3 ✓

For i=1 (element=3):
  Check index 2: arr[2]=2 > 3? NO
  Check index 3: arr[3]=4 > 3? YES! NGE[1] = 4 ✓

For i=2 (element=2):
  Check index 3: arr[3]=4 > 2? YES! NGE[2] = 4 ✓

For i=3 (element=4):
  No more elements → NGE[3] = -1
```

### Complexity Analysis:

**Time Complexity:** O(n²)
- Outer loop: n iterations
- Inner loop: Up to n iterations for each
- Worst case (decreasing array): n × n comparisons

**Space Complexity:** O(1)
- Only using result array (required for output)
- No extra data structures

---

## Approach 2: Monotonic Stack (Right to Left) - O(n) ⭐

### Intuition (Soch):

**Key insight:** Hum **right se left** traverse karenge aur stack mein **values** rakhenge!

**Why right to left?**
- Jab hum kisi element par hain, uske right ke saare elements already processed hain
- Stack mein woh elements hain jo future elements ke NGE ban sakte hain

**What's in the stack?**
- Stack maintains elements in **decreasing order** (from bottom to top)
- Elements jo abhi tak kisi ka NGE nahi bane (potential candidates)

**Monotonic Decreasing Stack:**
```
Bottom → Top: Large → Small

Stack: [8, 5, 3]
        ↑     ↑
      bottom  top

Property: stack[i] > stack[i+1] for all i
```

**Visual example:**

```
arr = [1, 3, 2, 4]

Process RIGHT to LEFT:

Step 1: i=3, element=4
  Stack: []
  No element in stack → NGE = -1
  Push 4: Stack = [4]

Step 2: i=2, element=2
  Stack: [4]
  Top=4 > 2 → NGE = 4 ✓
  Push 2: Stack = [4, 2]

Step 3: i=1, element=3
  Stack: [4, 2]
  Top=2 < 3 → Pop 2 (useless, 3 is bigger)
  Top=4 > 3 → NGE = 4 ✓
  Push 3: Stack = [4, 3]

Step 4: i=0, element=1
  Stack: [4, 3]
  Top=3 > 1 → NGE = 3 ✓
  Push 1: Stack = [4, 3, 1]

Result: [3, 4, 4, -1]
```

**Why pop smaller elements?**

```
If current element = 5 and stack top = 3:
- 3 can NEVER be NGE for any element on the left
- Because 5 is between them and 5 > 3
- So 3 is useless → POP it!

Current element "shadows" smaller elements
```

### Step-by-step Dry Run:

```
arr = [6, 8, 0, 1, 3]

═══════════════════════════════════════════════════════════════════════
i=4, element=3
═══════════════════════════════════════════════════════════════════════
Stack: []
Pop while top <= 3? Stack empty, skip
Stack empty → result[4] = -1
Push 3 → Stack: [3]

═══════════════════════════════════════════════════════════════════════
i=3, element=1
═══════════════════════════════════════════════════════════════════════
Stack: [3]
Pop while top <= 1? top=3 > 1, stop
Stack not empty → result[3] = 3 ✓
Push 1 → Stack: [3, 1]

═══════════════════════════════════════════════════════════════════════
i=2, element=0
═══════════════════════════════════════════════════════════════════════
Stack: [3, 1]
Pop while top <= 0? top=1 > 0, stop
Stack not empty → result[2] = 1 ✓
Push 0 → Stack: [3, 1, 0]

═══════════════════════════════════════════════════════════════════════
i=1, element=8
═══════════════════════════════════════════════════════════════════════
Stack: [3, 1, 0]
Pop while top <= 8?
  top=0 <= 8 → Pop 0
  top=1 <= 8 → Pop 1
  top=3 <= 8 → Pop 3
  Stack empty, stop
Stack empty → result[1] = -1
Push 8 → Stack: [8]

═══════════════════════════════════════════════════════════════════════
i=0, element=6
═══════════════════════════════════════════════════════════════════════
Stack: [8]
Pop while top <= 6? top=8 > 6, stop
Stack not empty → result[0] = 8 ✓
Push 6 → Stack: [8, 6]

═══════════════════════════════════════════════════════════════════════
FINAL RESULT: [8, -1, 1, 3, -1]
═══════════════════════════════════════════════════════════════════════
```

### Complexity Analysis:

**Time Complexity:** O(n)
- Each element is pushed once: O(n)
- Each element is popped at most once: O(n)
- Total: O(n) + O(n) = O(n)

**Space Complexity:** O(n)
- Stack can hold at most n elements

**Implementation:** See `solution-right-to-left.ts`

---

## Approach 3: Monotonic Stack (Left to Right with Indices) - O(n) ⭐⭐ (More Natural!)

### Intuition (Soch):

**Key insight:** Hum **left se right** traverse karenge aur stack mein **indices** rakhenge!

**Why left to right?**
- Natural reading order (more intuitive)
- We process elements as we encounter them
- Stack maintains "waiting list" of elements looking for their NGE

**What's in the stack?**
- Stack stores **INDICES** of elements (not values!)
- These are elements whose NGE hasn't been found yet
- When we find a larger element, we resolve pending elements

**Visual example:**

```
arr = [1, 3, 2, 4]

Process LEFT to RIGHT:

Step 1: i=0, element=1
  Stack: []
  No previous elements waiting
  Push index 0: Stack = [0]
  (Element at index 0 is waiting for NGE)

Step 2: i=1, element=3
  Stack: [0]
  Is 3 > arr[0]=1? YES!
  → 3 is NGE for element at index 0
  → result[0] = 3 ✓
  → Pop 0: Stack = []
  Push index 1: Stack = [1]
  (Element at index 1 is waiting)

Step 3: i=2, element=2
  Stack: [1]
  Is 2 > arr[1]=3? NO
  → 2 can't be NGE for 3
  Push index 2: Stack = [1, 2]
  (Both elements at indices 1,2 are waiting)

Step 4: i=3, element=4
  Stack: [1, 2]
  Is 4 > arr[2]=2? YES!
  → 4 is NGE for element at index 2
  → result[2] = 4 ✓
  → Pop 2: Stack = [1]

  Is 4 > arr[1]=3? YES!
  → 4 is NGE for element at index 1
  → result[1] = 4 ✓
  → Pop 1: Stack = []

  Push index 3: Stack = [3]
  (Element at index 3 is waiting)

End of loop: Stack = [3]
- Index 3 still in stack → No NGE found
- result[3] = -1 (default)

Result: [3, 4, 4, -1]
```

**Why store indices instead of values?**

```
If we store values:
- Stack: [3, 2]
- When we find 4, which index to update?
- We'd lose track of positions!

If we store indices:
- Stack: [1, 2] (indices of values 3, 2)
- When we find 4:
  → Pop 2, set result[2] = 4
  → Pop 1, set result[1] = 4
- Perfect! We know exactly where to update!
```

### Step-by-step Dry Run:

```
arr = [6, 8, 0, 1, 3]
result = [-1, -1, -1, -1, -1] (default)

═══════════════════════════════════════════════════════════════════════
i=0, arr[0]=6
═══════════════════════════════════════════════════════════════════════
Stack: []
No pending elements
Push 0 → Stack: [0]

═══════════════════════════════════════════════════════════════════════
i=1, arr[1]=8
═══════════════════════════════════════════════════════════════════════
Stack: [0]
8 > arr[0]=6? YES!
→ Pop 0, set result[0] = 8 ✓
Stack: []
Push 1 → Stack: [1]

═══════════════════════════════════════════════════════════════════════
i=2, arr[2]=0
═══════════════════════════════════════════════════════════════════════
Stack: [1]
0 > arr[1]=8? NO
Push 2 → Stack: [1, 2]

═══════════════════════════════════════════════════════════════════════
i=3, arr[3]=1
═══════════════════════════════════════════════════════════════════════
Stack: [1, 2]
1 > arr[2]=0? YES!
→ Pop 2, set result[2] = 1 ✓
Stack: [1]

1 > arr[1]=8? NO
Push 3 → Stack: [1, 3]

═══════════════════════════════════════════════════════════════════════
i=4, arr[4]=3
═══════════════════════════════════════════════════════════════════════
Stack: [1, 3]
3 > arr[3]=1? YES!
→ Pop 3, set result[3] = 3 ✓
Stack: [1]

3 > arr[1]=8? NO
Push 4 → Stack: [1, 4]

═══════════════════════════════════════════════════════════════════════
Loop ends
═══════════════════════════════════════════════════════════════════════
Stack: [1, 4] (indices still waiting)
These elements never found NGE → result stays -1

FINAL RESULT: [8, -1, 1, 3, -1]
═══════════════════════════════════════════════════════════════════════
```

**Key Advantage - "Lazy" Resolution:**

```
Right to Left (Approach 2):
- Determines NGE when processing element
- Proactive: "What is my NGE?"

Left to Right (Approach 3):
- Determines NGE when NGE is found
- Reactive: "I am NGE for whom?"
- More natural flow of discovery!

Example with [1, 3, 2, 4]:

Right to Left:
i=3 (4): "My NGE? None (-1)"
i=2 (2): "My NGE? It's 4"
i=1 (3): "My NGE? It's 4"
i=0 (1): "My NGE? It's 3"

Left to Right:
i=0 (1): "Waiting for NGE..."
i=1 (3): "I am NGE for 1! Now I wait..."
i=2 (2): "Can't help anyone, I wait..."
i=3 (4): "I am NGE for 2! I am NGE for 3!"
```

### Complexity Analysis:

**Time Complexity:** O(n)
- Each element is pushed once: O(n)
- Each element is popped at most once: O(n)
- Total: O(n) + O(n) = O(n)

**Space Complexity:** O(n)
- Stack can hold at most n indices

**Implementation:** See `solution-left-to-right.ts`

---

## Approach Comparison

| Approach | Time | Space | Direction | Stack Stores | Best For |
|----------|------|-------|-----------|--------------|----------|
| **Brute Force** | O(n²) | O(1) | Left→Right | - | Understanding |
| **Monotonic Stack (R→L)** | O(n) | O(n) | **Right→Left** | **Values** | Cleaner code |
| **Monotonic Stack (L→R)** | O(n) | O(n) | **Left→Right** | **Indices** | **More intuitive** ⭐ |

**Which to use?**
- **Left to Right (Approach 3):** More natural, easier to understand during interviews
- **Right to Left (Approach 2):** Slightly cleaner implementation, determines answer immediately

---

## Variations of this Problem

1. **Next Greater Element I** (LeetCode 496): Find NGE in different arrays
2. **Next Greater Element II** (LeetCode 503): Circular array
3. **Next Smaller Element**: Same logic, but find smaller
4. **Previous Greater Element**: Process left to right
5. **Stock Span Problem**: Days since price was higher

---

## Interview Tips

**What to say:**
1. "I can solve this using monotonic stack in O(n)"
2. "I can do it left-to-right with indices or right-to-left with values"
3. "Left-to-right is more intuitive - we discover NGEs as we go"

**Which approach to code in interview?**
- **Recommend: Left to Right (Approach 3)**
  - More natural thought process
  - Easier to explain
  - "I find larger elements and resolve waiting elements"

**Common mistakes:**
- ❌ Forgetting to initialize result array with -1
- ❌ Storing values instead of indices (in L→R approach)
- ❌ Wrong comparison direction (should be `current > arr[stack.top()]`)

---

## Summary

Both monotonic stack approaches are **equally optimal** (O(n) time and space). The key difference is:

**Approach 2 (Right to Left):**
- Processes elements in reverse
- Stack stores potential NGE candidates (values)
- Determines each element's NGE immediately

**Approach 3 (Left to Right):**
- Processes elements naturally (left to right)
- Stack stores elements waiting for NGE (indices)
- Resolves NGEs when larger element is found

**Both solutions are provided:**
- `solution-right-to-left.ts` - Approach 2
- `solution-left-to-right.ts` - Approach 3

Choose based on what feels more natural to you! 🚀
