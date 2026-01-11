# Prefix to Postfix Conversion

## 📋 Problem Statement

Humein ek **Prefix Expression** (e.g., `+ab`) diya gaya hai. Humein ise **Postfix Expression** (e.g., `ab+`) mein convert karna hai.

**Definitions:**
*   **Prefix:** Operator pehle (Pre). Example: `* + a b c` -> `(a+b)*c`
*   **Postfix:** Operator baad mein (Post). Example: `a b + c *` -> `(a+b)*c`

**Examples:**
*   **Input:** `+ab`
*   **Output:** `ab+`

*   **Input:** `*+ab-cd`
*   **Output:** `ab+cd-*`

---

## 🔴 Critical Understanding

### Logic: Why Right-to-Left? ⬅️
Prefix expression ka structure hota hai: `Operator Operand1 Operand2`.
Agar hum **Right-to-Left** scan karein:
1.  Pehle `Operand2` milega.
2.  Phir `Operand1` milega.
3.  Phir `Operator` milega.

Jaise hi Operator mile, humare paas stack mein dono operands already honge!
Bas unhein **Postfix order** (`Operand1 + Operand2 + Operator`) mein jodna hai aur wapas stack mein daalna hai.

**Comparison with Infix:**
*   Prefix to Infix mein hum `(` + `op1` + `op` + `op2` + `)` karte the.
*   Yahan hum `op1` + `op2` + `op` karenge.
*   Logic bilkul same hai, bas string combining ka format alag hai.

---

## 🔧 Prerequisites

### 1. Stack Data Structure
Operands aur partial postfix strings store karne ke liye.

---

## 💡 Approaches

### Approach 1: Stack Method (Right-to-Left Scan) - Optimal ✅

**Intuition (Soch):**
Expression: `*+ab-cd`
Scan Right to Left:
1. `d` -> Push `d`
2. `c` -> Push `c`
3. `-` -> Pop `c`, `d`. Combine `cd-`. Push `cd-`
4. `b` -> Push `b`
5. `a` -> Push `a`
6. `+` -> Pop `a`, `b`. Combine `ab+`. Push `ab+`
7. `*` -> Pop `ab+`, `cd-`. Combine `ab+cd-*`. Push `ab+cd-*`

**Complexity:**
*   **Time:** O(N)
*   **Space:** O(N)

---

## 🔬 Detailed Solution: Stack Approach

### Dry Run Table

**Expression:** `* + a b - c d`
**Scan Direction:** Right to Left (`<-`)

| Step | Char | Stack (Top is Right) | Action |
| :--- | :--- | :--- | :--- |
| 1 | `d` | `['d']` | Push Operand |
| 2 | `c` | `['d', 'c']` | Push Operand |
| 3 | `-` | `['cd-']` | Pop `c`, `d`. Combine `c`+`d`+`-`. Push. |
| 4 | `b` | `['cd-', 'b']` | Push Operand |
| 5 | `a` | `['cd-', 'b', 'a']` | Push Operand |
| 6 | `+` | `['cd-', 'ab+']` | Pop `a`, `b`. Combine `a`+`b`+`+`. Push. |
| 7 | `*` | `['ab+cd-*']` | Pop `ab+`, `cd-`. Combine. Push. |

### Complexity Analysis

*   **Time Complexity: O(N)**
    *   Single scan. Har element max 1 push/pop.
*   **Space Complexity: O(N)**
    *   Stack aur Strings ki length input proportional hai.

## 🎯 Interview Tips

*   **Q:** "Prefix to Postfix bina Infix mein convert kiye kaise karoge?"
    *   **A:** "Yahi direct method hai! Hum direct `op1 + op2 + operator` construct karte hain."
*   **Q:** "Left-to-Right scan se kar sakte hain?"
    *   **A:** "Kar sakte hain (Recursion use karke), lekin wo Stack approach se zyada complex aur less intuitive hota hai."

---