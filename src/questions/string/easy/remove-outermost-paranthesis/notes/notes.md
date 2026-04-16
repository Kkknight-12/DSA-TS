# Remove Outermost Parentheses - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Valid parentheses string `s` diya hai.
Ye ek ya multiple primitive parts ka concatenation ho sakta hai.

Hume har primitive ka outermost pair remove karna hai.

Example:

```txt
s = "(()())(())"
```

Primitive parts:

```txt
"(()())" + "(())"
```

Har primitive se outer remove karo:

```txt
"(()())" -> "()()"
"(())"   -> "()"
```

Final answer:

```txt
"()()()"
```

Important:

- primitive part valid parentheses string hota hai
- aur use do non-empty valid parts me split nahi kar sakte
- outermost matlab:
  - primitive ka first `(`
  - aur uska matching last `)`

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
pehle primitives identify karo
phir har primitive ka first aur last bracket hata do
```

Example:

```txt
s = "(()())(())(()(()))"
```

Primitive breakdown:

| Scan result | Primitive |
|---|---|
| first complete primitive | `"(()())"` |
| second complete primitive | `"(())"` |
| third complete primitive | `"(()(()))"` |

Ab strip karo:

| Primitive | Outermost remove karne ke baad |
|---|---|
| `"(()())"` | `"()()"` |
| `"(())"` | `"()"` |
| `"(()(()))"` | `"()(())"` |

Join:

```txt
"()()" + "()" + "()(())"
= "()()()()(())"
```

Brute force yahan bhi fast hai,
but approach do-phase hai:

```txt
pehle break karo
phir process karo
```

---

## STEP 3: Key Insight

Primitive boundary kab milti hai?

Jab current balance / depth:

```txt
0 par wapas aa jata hai
```

Why?

Kyunki:

```txt
'(' -> depth +1
')' -> depth -1
```

Aur valid primitive exactly us point par khatam hota hai
jahan saare opened brackets close ho chuke hote hain.

Dusri important insight:

Outer brackets wahi hote hain jo:

```txt
depth 0 -> 1
depth 1 -> 0
```

transition par aate hain.

Baaki saare brackets inner hote hain,
aur unhe result me rakhna hai.

---

## STEP 4: Why This Technique Works

Suppose hum ek primitive dekh rahe hain:

```txt
"(()())"
```

Depth flow:

```txt
char:   ( ( ) ( ) )
depth:  1 2 1 2 1 0
```

Observe:

- first `(` ne depth `0 -> 1` ki
  - ye outer opening hai
- last `)` ne depth `1 -> 0` ki
  - ye outer closing hai

Beech ke brackets:

```txt
( ) ( )
```

Inner structure represent karte hain,
so unhe keep karna hai.

Isi wajah se optimal logic banta hai:

- `'('` ko tabhi keep karo jab usse pehle depth already > 0 ho
- `')'` ko tabhi keep karo jab decrement ke baad bhi depth > 0 bache

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `currentDepth` / `depth` | abhi current nesting level |
| `primitiveStart` | current primitive ka start index |
| `primitiveParts` | brute force me stored primitive substrings |
| `stack.length` | better approach me current depth ka stack version |
| `result` | final answer string |

Short memory:

```txt
outer brackets = primitive boundary brackets
inner brackets = result me jaane wale brackets
```

---

## STEP 6: Mental Model

Soch:

```txt
main har primitive ka outer shell nikaal raha hoon
aur inner body bacha raha hoon
```

Visual:

```txt
primitive = "(()(()))"

outer shell:
(       )

inner body:
 "()(())"
```

Aur multiple primitives ho toh:

```txt
[primitive1][primitive2][primitive3]
```

har primitive ka shell alag remove hota hai.

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Smallest primitive | `"()"` | `""` | outer remove karte hi kuch nahi bachta |
| Flat primitives | `"()()"` | `""` | dono primitives empty ban jate hain |
| Single nested primitive | `"((()))"` | `"(())"` | sirf outer shell remove hota hai |
| Mixed nesting | `"(()(()))"` | `"()(())"` | inner primitives preserve rehte hain |
| Multiple primitives | `"(()())(())"` | `"()()()"` | har primitive separately strip hota hai |

---

## STEP 8: Conditions

Optimal logic ke core conditions:

### Opening bracket

```txt
agar currentDepth > 0 hai
toh '(' inner opening hai -> keep
warna outer opening hai -> skip
```

### Closing bracket

```txt
pehle currentDepth--
agar currentDepth > 0 bachi
toh ')' inner closing hai -> keep
warna outer closing hai -> skip
```

Yahi pura decision making logic hai.

---

## STEP 9: Adjustment Logic

Traversal left se right hota hai.

| Character | Adjustment | Kyun |
|---|---|---|
| `(` | pehle check, phir `depth++` | outer vs inner opening decide karna hai current depth se |
| `)` | pehle `depth--`, phir check | close hone ke baad bachi hui depth batati hai ki ye outer tha ya inner |

This ordering bahut important hai.

Agar wrong order use kiya,
toh outer brackets galti se result me aa sakte hain.

---

## STEP 10: Answer Formula

Optimal answer rule:

```txt
Keep '(' if depth > 0 before increment
Keep ')' if depth > 0 after decrement
```

Memory form:

```txt
0 -> 1  : outer opening, skip
1 -> 0  : outer closing, skip
all middle transitions: keep
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "(()())(())"
```

Start:

```txt
currentDepth = 0
result = ""
```

| Index | Character | Action | `currentDepth` after step | `result` |
|---:|---|---|---:|---|
| 0 | `(` | outer opening, skip, then `depth++` | 1 | `""` |
| 1 | `(` | inner opening, keep, then `depth++` | 2 | `"("` |
| 2 | `)` | `depth--` then inner closing, keep | 1 | `"()"` |
| 3 | `(` | inner opening, keep, then `depth++` | 2 | `"()("` |
| 4 | `)` | `depth--` then inner closing, keep | 1 | `"()()"` |
| 5 | `)` | `depth--` to `0`, outer closing, skip | 0 | `"()()"` |
| 6 | `(` | outer opening, skip, then `depth++` | 1 | `"()()"` |
| 7 | `(` | inner opening, keep, then `depth++` | 2 | `"()()("` |
| 8 | `)` | `depth--` then inner closing, keep | 1 | `"()()()"` |
| 9 | `)` | `depth--` to `0`, outer closing, skip | 0 | `"()()()"` |

Final answer:

```txt
"()()()"
```

Second example:

```txt
s = "()()"
```

| Index | Character | Action | `currentDepth` after step | `result` |
|---:|---|---|---:|---|
| 0 | `(` | outer opening, skip | 1 | `""` |
| 1 | `)` | outer closing, skip | 0 | `""` |
| 2 | `(` | outer opening, skip | 1 | `""` |
| 3 | `)` | outer closing, skip | 0 | `""` |

Answer:

```txt
""
```

---

## STEP 12: Quick Reference

```txt
Primitive boundary tab milti hai jab depth 0 par wapas aaye

Outermost brackets:
depth 0 -> 1
depth 1 -> 0

Optimal keep/skip rule:
keep '(' if current depth already > 0
keep ')' if decrement ke baad depth > 0

Result = sab inner brackets ka concatenation
```
