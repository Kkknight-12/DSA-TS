# Infix to Postfix Conversion

## 📋 Problem Statement

[gpt](https://chatgpt.com/g/g-p-690b183fda608191a882804e321568e5-dsa/c/69359a28-1a40-8333-85d3-8123112ae25e)

Humein ek **Infix Expression** diya gaya hai (jo hum maths mein normally use karte hain, e.g., `a + b`). Humein ise **Postfix Expression** (Reverse Polish Notation) mein convert karna hai (e.g., `ab+`).

**Examples:**
*   **Infix:** `(p + q) * (m - n)`
*   **Postfix:** `pq+mn-*`

*   **Infix:** `a + b * c`
*   **Postfix:** `abc*+` (Kyunki `*` pehle hoga `+` se)

---

## 🔴 Critical Understanding

### Why do we need Postfix? 🤔

Computers ko `a + b * c` samajhne mein dikkat hoti hai.
*   Agar wo left-to-right padhega, toh pehle `a + b` kar dega, jo galat hai (BODMAS rule).
*   Correct order: Pehle `b * c`, phir result mein `a` add karo.
*   **Postfix (`abc*+`)** mein koi ambiguity nahi hoti. Operators apne operands ke turant baad aate hain. Brackets ki zaroorat nahi padti!

### The Challenge: Operator Precedence
Humein yeh dhyan rakhna hai ki kaunsa operator "taqatwar" (higher precedence) hai.
*   `^` (Power) sabse strong.
*   `*`, `/` usse kam strong.
*   `+`, `-` sabse weak.
*   Agar strong operator baad mein aata hai, toh weak wale ko wait karna padega. Isliye **Stack** ki zaroorat padti hai!

---

## 🔧 Prerequisites

Is problem ko solve karne ke liye aapko yeh pata hona chahiye:

### 1. Stack Data Structure
Temporary storage ke liye, operators ko hold karne ke liye jab tak unka time na aaye.

### 2. Operator Precedence & Associativity
*   **Precedence:** Kis order mein solve hoga (`^` > `*/` > `+-`).
*   **Associativity:** Agar same taqat ke operators saath aayein toh?
    *   `+`, `-`, `*`, `/`: **Left to Right** (`a - b - c` -> `(a-b) - c`)
    *   `^`: **Right to Left** (`2^3^2` -> `2^(3^2)`)

---

## 💡 Approaches

### Approach 1: Manual Method (Human Way - Brackets)

**Intuition:**
Har operation ko brackets mein daalo aur phir operator ko bracket ke bahar right side phenk do.

**Example:** `a + b * c`
1. Precedence ke hisaab se brackets lagao: `(a + (b * c))`
2. Inner bracket ka operator bahar: `(a + (bc*))`
3. Outer bracket ka operator bahar: `(a (bc*) +)`
4. Brackets hatao: `abc*+`

**Cons:** Yeh code mein implement karna mushkil hai.

---

### Approach 2: Stack Method (Standard Algorithm) - Optimal ✅

**Intuition:**
Hum expression ko left-to-right scan karenge.
*   **Operands (a, b, 1, 2):** Seedha result mein daal do.
*   **Operators (+, *, ^):** Inhein Stack mein wait karao.
    *   Agar naya operator purane wale se **strong** hai, toh push kar do.
    *   Agar naya operator **weak** hai, toh stack se strong walon ko pop karke result mein daalo (kyunki wo pehle execute hone chahiye the).
*   **Brackets `(`:** Push karo.
*   **Brackets `)`:** Jab tak `(` na mile, sab pop karo.

**Algorithm:**
1. Stack initialize karo.
2. Character by character scan karo:
   *   Operand? -> Add to Result.
   *   `(` ? -> Push to Stack.
   *   `)` ? -> Pop until `(` is found.
   *   Operator? ->
       *   Jab tak stack top ki precedence >= current operator, Pop karo.
       *   Current operator ko Push karo.
3. End mein stack mein jo bacha hai, sab pop karo.

**Complexity:**
*   **Time:** O(N) (Har character max ek baar push aur pop hota hai)
*   **Space:** O(N) (Stack size)

---

## 📊 Comparison Table

| Feature | Stack Approach |
| :--- | :--- |
| **Time Complexity** | O(N) |
| **Space Complexity** | O(N) |
| **Parsing Type** | Single Pass (Linear) |
| **Usage** | Compilers, Calculators |

---

## 🔬 Detailed Solution: Stack Approach

### Dry Run Table

**Expression:** `a + b * c`

| Step | Scanned Char | Stack (Top at Right) | Result String | Action |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `a` | `[]` | `a` | Operand -> Print |
| 2 | `+` | `[+]` | `a` | Stack empty -> Push |
| 3 | `b` | `[+]` | `ab` | Operand -> Print |
| 4 | `*` | `[+, *]` | `ab` | `*` > `+` -> Push |
| 5 | `c` | `[+, *]` | `abc` | Operand -> Print |
| 6 | `End` | `[+]` | `abc*` | Pop `*` |
| 7 | `End` | `[]` | `abc*+` | Pop `+` |

### Complexity Analysis

*   **Time Complexity: O(N)**
    *   Hum puri string ko ek baar scan karte hain.
    *   Har character stack mein max 1 baar push aur 1 baar pop hota hai.
    *   Linear time.
*   **Space Complexity: O(N)**
    *   Worst case mein (e.g., `a+b+c+d...`) saare operators stack mein ho sakte hain.

## 🎯 Interview Tips

*   **Q:** "Associativity ka kya scene hai?"
    *   **A:** "`^` (Power) operator Right Associative hota hai. Matlab `a^b^c` equals `a^(b^c)`. Is case mein agar stack top `^` hai aur current bhi `^` hai, toh hum pop nahi karte, balki push karte hain."
*   **Q:** "Prefix expression kya hota hai?"
    *   **A:** "Prefix (`+ab`) mein operator pehle aata hai. Same logic use hota hai bas string reverse karke scan karte hain."

---