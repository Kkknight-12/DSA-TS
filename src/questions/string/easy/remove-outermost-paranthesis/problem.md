# Remove Outermost Parentheses

Given a valid parentheses string `s`, remove the outermost parentheses of every primitive part and return the final string.

Examples:

```txt
"(()())(())"           -> "()()()"
"(()())(())(()(()))"   -> "()()()()(())"
"()()"                 -> ""
```

Important:

- string valid parentheses string hai
- input ek ya multiple primitive parts ka concatenation ho sakta hai
- primitive part matlab:
  - valid parentheses string
  - jise do non-empty valid parts me split nahi kar sakte
- hume har primitive ka first `(` aur matching last `)` remove karna hai

---

## Approach 1: Brute Force - Primitive Parts Alag Banao, Phir Strip Karo

**Prerequisites (Agar Koi Chahiye):**
- Primitive decomposition ka basic idea

**Intuition (Soch):**

Pehle string ko primitive parts me tod do.

Example:

```txt
"(()())(())"
```

Primitive breakdown:

```txt
"(()())" + "(())"
```

Ab har primitive ka outermost pair remove karo:

```txt
"(()())" -> "()()"
"(())"   -> "()"
```

Final answer:

```txt
"()()()"
```

**How it works:**

1. Left se right traverse karo
2. Balance / depth counter use karke primitive boundaries find karo
3. Har primitive substring store karo
4. Har stored primitive ka first aur last character remove karo
5. Sab inner parts join karke answer return karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why brute force even though `O(n)` hai:**

Ye direct decomposition-style solution hai.
Problem ko do phases me solve karta hai:

```txt
pehle break karo
phir process karo
```

So asymptotically fast hai,
but extra storage aur extra pass use karta hai.

---

## Approach 2: Better - Stack Based Single Pass

**Prerequisites (Agar Koi Chahiye):**
- Stack basics

**Intuition (Soch):**

Stack ka size batata hai ki abhi kitne levels open hain.

Rule:

- `(` aaya aur stack empty tha -> outer opening, skip
- `(` aaya aur stack empty nahi tha -> inner opening, keep
- `)` aaya aur pop ke pehle stack size `1` tha -> outer closing, skip
- otherwise `)` inner closing hai, keep

**How it works:**

1. String traverse karo
2. `(` mile:
   - stack empty ho toh skip
   - otherwise result me add karo
   - phir push karo
3. `)` mile:
   - agar stack size `1` hai toh outer closing hai, skip
   - otherwise result me add karo
   - phir pop karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why better:**

Primitive strings alag store nahi karni padti.
Single pass me answer build ho jata hai.

---

## Approach 3: Optimal - Counter Based Single Pass

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Stack ki exact values important nahi hain.
Hume bas current depth chahiye.

Opening bracket ke liye:

```txt
agar current depth > 0 hai
toh ye inner '(' hai
```

Closing bracket ke liye:

```txt
decrement ke baad bhi depth > 0 bachi
toh ye inner ')' tha
```

**How it works:**

1. `depth = 0`
2. `(` mile:
   - agar `depth > 0`, result me add karo
   - phir `depth++`
3. `)` mile:
   - pehle `depth--`
   - agar `depth > 0`, result me add karo
4. Final result return karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)` extra

**Why optimal:**

Single pass bhi hai,
and stack bhi nahi chahiye.
Bas active nesting depth ka count enough hai.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Main Idea |
|---|---:|---:|---|---|
| Brute Force | `O(n)` | `O(n)` | primitive idea | pehle primitives banao, phir outer remove karo |
| Better | `O(n)` | `O(n)` | stack basics | stack size se outer vs inner decide karo |
| Optimal | `O(n)` | `O(1)` extra | none | depth counter se directly keep/skip decide karo |

---

## Learning Order

Pehle primitive ka meaning pakdo:

```txt
balance jab 0 par wapas aata hai,
ek primitive part complete hota hai
```

Phir brute force soch:

```txt
primitive pieces banao
har piece ka outer remove karo
```

Phir stack wali soch:

```txt
current nesting level se outer bracket identify kar sakte hain
```

Phir optimal jump:

```txt
stack ki values nahi,
sirf depth count important hai
```

Most important memory line:

```txt
Primitive ke outer brackets wahi hote hain jo depth 0 -> 1 aur 1 -> 0 transition par aate hain.
```
