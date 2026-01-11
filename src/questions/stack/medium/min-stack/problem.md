# Min Stack (Sabse Chota Element)

## 📋 Problem Statement

Humein ek aisa **Stack** design karna hai jo standard operations (`push`, `pop`, `top`) ke saath-saath **minimum element** (`getMin`) bhi efficiently retrieve kar sake.

**Requirement:**
Saare operations (`push`, `pop`, `top`, `getMin`) ka time complexity **O(1)** (constant time) hona chahiye.

**Example:**
```text
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output:
[null,null,null,null,-3,null,0,-2]
```

**Explanation:**
1. Push -2 -> Stack: [-2], Min: -2
2. Push 0  -> Stack: [-2, 0], Min: -2
3. Push -3 -> Stack: [-2, 0, -3], Min: -3
4. getMin() -> Returns -3
5. pop()    -> Removes -3. Stack: [-2, 0], Min: -2
6. top()    -> Returns 0
7. getMin() -> Returns -2

---

## 🔴 Critical Understanding

### The Core Challenge: O(1) Time vs Finding Minimum

**Normal Stack Behavior:**
*   `push` aur `pop` O(1) hote hain.
*   Lekin agar humein stack mein se minimum dhoondna ho, toh humein **har element check karna padega**.
*   Standard approach: Iterate entire stack -> **O(N)** Time.

**Why O(1) is Tricky?**
*   Humein minimum *turant* chahiye.
*   Agar hum sirf ek variable `minVal` maintain karein, toh jab minimum element **pop** ho jayega, toh humein **second minimum** kaise milega?
*   **Example:**
    *   Push 5, Min=5
    *   Push 2, Min=2
    *   Pop 2 -> Ab Min wapas 5 hona chahiye.
    *   Lekin agar humne 5 kahin save nahi kiya, toh hum lost hain!

**Key Insight:**
*   Humein sirf *current* minimum nahi, balki **minimums ki history** chahiye.
*   Jitne elements stack mein hain, utne hi past minimums bhi yaad rakhne padenge.

---

## 🔧 Prerequisites

Before solving this, you should understand:

### 1. Stack Data Structure
Stack **LIFO** (Last In First Out) principle par kaam karta hai. Jo element sabse last mein aata hai, wo sabse pehle jaata hai.

### 2. Space-Time Tradeoff
Kabhi kabhi speed (Time) badhane ke liye humein extra memory (Space) use karni padti hai.

---

## 💡 Approaches

### Approach 1: Brute Force (Iterate Every Time)

**Prerequisites:** Basic Loop knowledge.

**Intuition (Soch):**
Jab bhi `getMin()` maanga jaye, pure stack ko traverse karke sabse chota number dhoond lo.

**Algorithm:**
1. `push`, `pop`, `top` normal stack ki tarah karo.
2. `getMin` ke liye stack ke start se end tak loop lagao.

**Complexity:**
*   Time: **O(N)** for `getMin` (Too slow!)
*   Space: **O(1)**

**Pros:** ❌ Easy to implement.
**Cons:** ❌ O(1) requirement fail karta hai.

---

### Approach 2: Two Stacks (Auxiliary Stack) - Optimal 1

**Prerequisites:** Stack Logic.

**Intuition (Soch):**
Agar hum ek aur stack (`minStack`) rakhein jo sirf "ab tak ka minimum" store kare?
*   Jab naya value `val` aaye, toh dekho kya wo `minStack.top()` se chota hai?
*   Agar haan, toh usse `minStack` mein bhi daal do.

**Algorithm:**
1. **Push(x):** Main stack mein daalo. Agar `x <= minStack.top()`, toh `minStack` mein bhi daalo.
2. **Pop():** Main stack se nikalo. Agar `poppedValue == minStack.top()`, toh `minStack` se bhi nikalo.
3. **GetMin():** `minStack.top()` return karo.

**Complexity:**
*   Time: **O(1)** (All operations)
*   Space: **O(N)** (Worst case, agar saare elements descending order mein hon)

**Pros:** ✅ Simple logic to explain.
**Cons:** ❌ Extra space use hota hai.

---

### Approach 3: Single Stack with Pairs - Optimal 2

**Prerequisites:** Objects/Pairs.

**Intuition (Soch):**
Do alag stack kyun maintain karein? Har element ke saath hi uska "us waqt ka minimum" store kar lete hain.
Stack mein numbers nahi, balki `{val, minVal}` pair store karenge.

**Visual:**
`[-2, -2]` -> `[0, -2]` -> `[-3, -3]`

**Algorithm:**
1. **Push(x):** Naya min calculate karo: `Math.min(x, currentTop.min)`. Pair `{x, newMin}` push karo.
2. **Pop():** Pair remove karo.
3. **GetMin():** Top pair ka `min` part return karo.

**Complexity:**
*   Time: **O(1)**
*   Space: **O(N)** (Har element ke saath extra info)

**Comparison Table:**

| Approach | Time (getMin) | Space | Prerequisites | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Brute Force | O(N) | O(1) | Loops | Too slow |
| **Two Stacks** | **O(1)** | **O(N)** | Stack | Interview Recommended (Clean Logic) |
| **Pairs** | **O(1)** | **O(N)** | Objects | Implementation Easy (One Array) |

---

## 🔬 Detailed Solution: Single Stack with Pairs

Humne **Approach 3 (Single Stack with Pairs)** choose kiya hai kyunki ye implementation mein clean hai.

### Why this approach works?
Stack ka nature **LIFO** (Last In First Out) hai. Jab hum ek element `X` push karte hain, us waqt tak ka minimum `M` hume pata hota hai. Jab tak `X` stack mein hai, tab tak minimum ya toh `M` rahega ya `X` se bhi chota koi naya element jo `X` ke baad aaya ho.

Isliye, har element ke saath uska "personal minimum" store karna safe hai. Jab `X` pop hoga, toh hum automatically purani state mein aa jayenge.

### Dry Run Visualization

**Input:** `push(-2)`, `push(0)`, `push(-3)`, `getMin()`, `pop()`, `top()`, `getMin()`

| Step | Operation | Value | Previous Min | New Min | Stack State `[{val, min}]` | Output |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `push(-2)` | -2 | Empty | -2 | `[{-2, -2}]` | - |
| 2 | `push(0)` | 0 | -2 | -2 | `[{-2, -2}, {0, -2}]` | - |
| 3 | `push(-3)` | -3 | -2 | -3 | `[{-2, -2}, {0, -2}, {-3, -3}]` | - |
| 4 | `getMin()` | - | - | - | Unchanged | **-3** |
| 5 | `pop()` | - | - | - | `[{-2, -2}, {0, -2}]` | - |
| 6 | `top()` | - | - | - | Unchanged | **0** |
| 7 | `getMin()` | - | - | - | Unchanged | **-2** |

### Complexity Analysis

*   **Time Complexity: O(1)**
    *   Humein sirf stack ke top element ko dekhna hai (`arr[length-1]`). Array indexing constant time hai.
    *   Push aur Pop bhi array ke end pe O(1) hote hain.
*   **Space Complexity: O(N)**
    *   Agar `N` elements hain, toh hum `N` pairs store kar rahe hain.
    *   Total `2N` integers store ho rahe hain.

## 🎯 Interview Tips

*   **Agar Interviewer puche:** "Kya bina extra space ke kar sakte hain (O(1) space)?"
    *   **Answer:** "Haan, ek mathematical trick hai `2*val - min` store karne ki, lekin wo sirf numbers ke range overflow hone ka risk rakhti hai. Interview mein Pairs ya Two Stacks approach zyada safe aur clean maani jaati hai."
*   **Follow-up:** "Kya ye generic types ke liye chalega?"
    *   **Answer:** "Pairs approach kisi bhi comparable type (Strings, Custom Objects) ke liye chalega jahan `<` aur `>` defined hon."

---
