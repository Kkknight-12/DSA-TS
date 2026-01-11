# Prefix to Infix Conversion

## 📋 Problem Statement

Humein ek **Prefix Expression** (Polish Notation) diya gaya hai jahan operators operands se pehle aate hain (e.g., `+ab`). Humein ise **Infix Expression** mein convert karna hai, wo bhi **Fully Parenthesized** (e.g., `(a+b)`).

**Examples:**
*   **Input:** `+ab`
*   **Output:** `(a+b)`

*   **Input:** `*+ab-cd`
*   **Output:** `((a+b)*(c-d))`

---

## 🔴 Critical Understanding

### Why Reverse Scan? 🤔

Prefix expressions `Operator -> Operand1 -> Operand2` follow karte hain.
*   Agar hum left-to-right scan karein, toh humein pehle operator milega `+`, lekin humein pata nahi ki iske operands kaun hain jab tak hum aage na chalein.
*   **Reverse Scan (Right-to-Left)** karne par humein pehle **operands** milenge (e.g., `b`, `a`).
*   Jaise hi operator `+` milega, humein pata hoga ki abhi-abhi humne jo do operands dekhe hain (`a`, `b`), ye unpar apply hoga!
*   Isliye, **Stack** mein operands store karte jao, aur operator aate hi pop karke combine kar do.

### The Algorithm Logic
1.  Expression ko **Ulta (Right to Left)** padho.
2.  Operand (`a`, `b`) mile -> **Stack mein push karo**.
3.  Operator (`+`) mile -> Stack se **top 2 elements pop karo** (`op1`, `op2`).
4.  Unhe combine karo: `(` + `op1` + `operator` + `op2` + `)`
5.  Result wapas stack mein push kar do.

---

## 🔧 Prerequisites

### 1. Stack Data Structure
Operands (aur beech mein bane partial expressions) ko hold karne ke liye.

### 2. String Concatenation
Strings ko jod kar naya expression banane ke liye.

---

## 💡 Approaches

### Approach 1: Stack Method (Right-to-Left Scan) - Optimal ✅

**Intuition (Soch):**
Prefix: `*+ab-cd`
Scan from Right:
1. `d` -> Push
2. `c` -> Push
3. `-` -> Pop `c`, `d`. Combine `(c-d)`. Push back.
4. `b` -> Push
5. `a` -> Push
6. `+` -> Pop `a`, `b`. Combine `(a+b)`. Push back.
7. `*` -> Pop `(a+b)`, `(c-d)`. Combine `((a+b)*(c-d))`. Push back.

**Complexity:**
*   **Time:** O(N) (Linear scan)
*   **Space:** O(N) (Stack space)

---

## 🔬 Detailed Solution: Stack Approach

### Dry Run Table

**Expression:** `* + a b - c d`
**Scan Direction:** Right to Left (`<-`)

| Step | Char | Stack (Top is Right) | Action |
| :--- | :--- | :--- | :--- |
| 1 | `d` | `['d']` | Push Operand |
| 2 | `c` | `['d', 'c']` | Push Operand |
| 3 | `-` | `['(c-d)']` | Pop `c`, `d`. Combine `(c-d)`. Push. |
| 4 | `b` | `['(c-d)', 'b']` | Push Operand |
| 5 | `a` | `['(c-d)', 'b', 'a']` | Push Operand |
| 6 | `+` | `['(c-d)', '(a+b)']` | Pop `a`, `b`. Combine `(a+b)`. Push. |
| 7 | `*` | `['((a+b)*(c-d))']` | Pop `(a+b)`, `(c-d)`. Combine. Push. |

### Complexity Analysis

*   **Time Complexity: O(N)**
    *   Humein puri string ko ek baar scan karte hain.
    *   Har character stack mein max 1 baar push aur 1 baar pop hota hai.
*   **Space Complexity: O(N)**
    *   Stack mein intermediate strings store hoti hain.
    *   Result string build karne mein bhi space lagta hai.

## 🎯 Interview Tips

*   **Q:** "Prefix aur Postfix conversion mein kya difference hai?"
    *   **A:**
        *   **Prefix to Infix:** Right-to-Left Scan. Op1 = Top, Op2 = Next Top.
        *   **Postfix to Infix:** Left-to-Right Scan. Op2 = Top, Op1 = Next Top. (Order matters!)
*   **Q:** "Valid prefix expression kaise check karein?"
    *   **A:** "Agar end mein stack mein **exactly 1 element** bacha hai, toh valid hai. Agar >1 ya empty hai, toh invalid."

---