# Postfix to Prefix Conversion

## 📋 Problem Statement

Humein ek **Postfix Expression** (e.g., `ab+`) diya gaya hai. Humein ise **Prefix Expression** (e.g., `+ab`) mein convert karna hai.

**Example 1:**
*   Input: `ab+`
*   Output: `+ab`

**Example 2:**
*   Input: `abc*+d-`
*   Output: `-+a*bcd`

---

## 🔴 Critical Understanding

### Logic: Left-to-Right Scan ➡️
Postfix expression ka structure hota hai: `Operand1 Operand2 Operator`.
Isliye hum **Left-to-Right** scan karenge (Standard Postfix Evaluation jaisa).

1.  **Operands (`a`, `b`)**: Mile toh **Stack mein Push** karo.
2.  **Operator (`+`)**: Mile toh Stack se **Top 2 elements Pop** karo.
    *   Top element = `Operand2` (Right operand)
    *   Next Top element = `Operand1` (Left operand)
    *   Prefix banao: `Operator + Operand1 + Operand2`
    *   Result wapas Push karo.

**Difference from Prefix-to-Postfix:**
*   Wahan hum Right-to-Left scan karte the.
*   Yahan hum Left-to-Right scan karte hain.
*   Operands ka order Pop karte waqt dhyan rakhna padta hai (`op2` pehle niklega, phir `op1`).

---

## 🔧 Prerequisites

### 1. Stack Data Structure
To hold operands and partial prefix expressions.

---

## 💡 Approaches

### Approach 1: Stack Method (Left-to-Right Scan) - Optimal ✅

**Intuition (Soch):**
Expression: `abc*+`
Scan Left to Right:
1. `a` -> Stack: [a]
2. `b` -> Stack: [a, b]
3. `c` -> Stack: [a, b, c]
4. `*` -> Pop `c`, `b`. Combine `*bc`. Stack: [a, *bc]
5. `+` -> Pop `*bc`, `a`. Combine `+a*bc`. Stack: [+a*bc]

**Complexity:**
*   **Time:** O(N)
*   **Space:** O(N)

---

## 🔬 Detailed Solution: Stack Approach

### Dry Run Table

**Expression:** `a b c * + d -`
**Scan Direction:** Left to Right (`->`)

| Step | Char | Stack (Top is Right) | Action |
| :--- | :--- | :--- | :--- |
| 1 | `a` | `['a']` | Push Operand |
| 2 | `b` | `['a', 'b']` | Push Operand |
| 3 | `c` | `['a', 'b', 'c']` | Push Operand |
| 4 | `*` | `['a', '*bc']` | Pop `c`, `b`. Combine `*`+`b`+`c`. Push. |
| 5 | `+` | `['+a*bc']` | Pop `*bc`, `a`. Combine `+`+`a`+`*bc`. Push. |
| 6 | `d` | `['+a*bc', 'd']` | Push Operand |
| 7 | `-` | `['-+a*bcd']` | Pop `d`, `+a*bc`. Combine `-`+... Push. |

### Complexity Analysis

*   **Time Complexity: O(N)**
    *   Single scan. Har element max 1 push/pop.
*   **Space Complexity: O(N)**
    *   Stack aur Strings ki length input proportional hai.

## 🎯 Interview Tips

*   **Q:** "Postfix aur Prefix conversion mein main difference kya hai?"
    *   **A:** "Scan direction! Postfix ke liye Left-to-Right, Prefix ke liye Right-to-Left scan best rehta hai. Isse logic simple rehta hai."

---