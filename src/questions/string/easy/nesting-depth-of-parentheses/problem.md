# Maximum Nesting Depth of Parentheses

Given a valid parentheses string `s`, return its maximum nesting depth.

The string can also contain:

- digits
- operators like `+`, `-`, `*`, `/`

Only parentheses affect depth.

Examples:

```txt
"(1+(2*3)+((8)/4))+1" -> 3
"(1)+((2))+(((3)))"   -> 3
"1+(2*3)/(2-1)"       -> 1
"1"                   -> 0
```

Important:

- input valid parentheses string hai
- `(` se depth increase hoti hai
- `)` se depth decrease hoti hai
- non-parenthesis characters ko ignore karna hai

---

## Approach 1: Brute Force - Har Position Par Prefix Depth Count Karo

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Maximum depth samajhne ka sabse direct way:

```txt
har index tak ka prefix lo
us prefix me current depth count karo
max update karo
```

Matlab agar string ke kisi point par 3 open parentheses active hain,
toh us point ki depth `3` hai.

**How it works:**

1. Har index `i` ke liye `s[0..i]` consider karo
2. Us prefix me `(` aur `)` ka balance count karo
3. Jo current depth mile, usse max ke saath compare karo
4. Sab indices ke baad max return karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(1)`

**Why slow:**

Har position ke liye prefix dubara scan kar rahe hain.

---

## Approach 2: Better - Stack

**Prerequisites (Agar Koi Chahiye):**
- Stack ka basic idea

**Intuition (Soch):**

Har `(` ek new level open karta hai.
Har `)` ek level close karta hai.

Stack me har open parenthesis push karo.
Current stack size hi current depth ban jaati hai.

**How it works:**

1. String left se right traverse karo
2. `(` mile -> stack me push karo
3. `)` mile -> stack se pop karo
4. Har push ke baad stack size se max depth update karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why better:**

Single pass me answer mil jata hai,
but stack extra space leta hai.

---

## Approach 3: Optimal - Counter Based

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Actually stack me hume characters store karne ki zarurat hi nahi.

Kyun?

Kyunki hume bas ye jana hai:

```txt
abhi kitne levels open hain?
```

Ye `currentDepth` counter se track ho sakta hai.

**How it works:**

1. `currentDepth = 0`, `maxDepth = 0`
2. `(` mile -> `currentDepth++`
3. Uske baad `maxDepth` update karo
4. `)` mile -> `currentDepth--`
5. Baaki characters ignore karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

Single pass hai aur stack bhi nahi chahiye.
Bas current open levels count karne hain.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Main Idea |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(1)` | none | har position par prefix depth dubara count karo |
| Better | `O(n)` | `O(n)` | stack basics | stack size ko current depth maan lo |
| Optimal | `O(n)` | `O(1)` | none | counter se open levels track karo |

---

## Learning Order

Pehle ye pakdo:

```txt
depth = abhi kitne open parentheses active hain
```

Phir brute force soch:

```txt
har point par current depth manually count kar sakte hain
```

Phir stack wali soch:

```txt
open parentheses ko stack me rakh sakte hain
```

Phir optimal jump:

```txt
stack ki exact values important nahi
sirf count important hai
```

Most important memory line:

```txt
Maximum nesting depth = traversal ke dauran current open parentheses count ka maximum value.
```
