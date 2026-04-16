# Maximum Nesting Depth of Parentheses - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Valid parentheses string `s` diya hai.
Hume maximum nesting depth return karni hai.

Depth ka matlab:

```txt
ek point par kitne parentheses levels ek saath open hain
```

Example:

```txt
s = "(1+(2*3)+((8)/4))+1"
```

Agar hum sirf parentheses dekhein:

```txt
( ( ) ( ( ) ) )
```

Inme sabse zyada ek time par:

```txt
3 open levels
```

So answer:

```txt
3
```

Important:

- input valid parentheses string hai
- digits aur operators depth ko affect nahi karte
- sirf `(` aur `)` important hain

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
har index tak ka prefix lo
us prefix me current open depth count karo
max track karo
```

Example:

```txt
s = "((()))"
```

| Prefix | Current depth at end |
|---|---:|
| `"("` | 1 |
| `"(("` | 2 |
| `"((("` | 3 |
| `"((()"` | 2 |
| `"((())"` | 1 |
| `"((()))"` | 0 |

Maximum depth:

```txt
3
```

Brute force ka issue:

har position ke liye prefix dubara scan karna padta hai.

So time:

```txt
O(n^2)
```

---

## STEP 3: Key Insight

Actual question ye nahi hai:

```txt
kitne total '(' hain?
```

Actual question ye hai:

```txt
traversal ke dauran current active open levels ka maximum kya tha?
```

Ek `(` aata hai:

```txt
depth +1
```

Ek `)` aata hai:

```txt
depth -1
```

So hume poora structure ya stack values store nahi karni.
Sirf active levels count karne hain.

---

## STEP 4: Why This Technique Works

Suppose hum string left se right traverse kar rahe hain.

At any point:

```txt
currentDepth = abhi tak jitne '(' open hue
               minus
               jitne ')' close hue
```

Ye value exactly batati hai:

```txt
abhi kitne nested levels active hain
```

Aur jab koi naya `(` milta hai,
tab ek new level start hota hai.
Isi moment par maximum depth update karni chahiye.

Why opening bracket par hi max update karte hain?

Kyunki:

```txt
new depth exactly '(' milne ke baad banti hai
```

Closing bracket par max update karne ki need nahi,
kyunki `)` depth ko badhata nahi, ghataata hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `currentDepth` | abhi kitne levels open hain |
| `maximumDepth` | ab tak ka highest depth |
| `currentChar` | current character being processed |

Short memory:

```txt
currentDepth = live active levels
maximumDepth = live levels ka highest peak
```

---

## STEP 6: Mental Model

Soch:

```txt
main parentheses ko floors ki tarah dekh raha hoon
```

Visual:

```txt
s = "((()))"

char:   (  (  (  )  )  )
depth:  1  2  3  2  1  0
```

Yahan peak depth:

```txt
3
```

Ek aur example:

```txt
s = "()()"

char:   (  )  (  )
depth:  1  0  1  0
```

Peak:

```txt
1
```

So total pairs zyada hone ka matlab zyada depth nahi hota.
Depth peak se decide hoti hai.

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---:|---|
| No parentheses | `"1"` | 0 | koi level open hi nahi hota |
| Empty string | `""` | 0 | traverse karne ko kuch nahi |
| Flat pairs | `"()()"` | 1 | ek time par bas ek level active |
| Pure nesting | `"((()))"` | 3 | levels one inside another |
| Mixed expression | `"(1+(2*3)/(2-1))"` | 2 | digits/operators ignored |

---

## STEP 8: Conditions

Main conditions:

```txt
currentChar === '('
currentChar === ')'
```

If `(`:

```txt
currentDepth++
maximumDepth = max(maximumDepth, currentDepth)
```

If `)`:

```txt
currentDepth--
```

Else:

```txt
ignore
```

---

## STEP 9: Adjustment Logic

Yahan adjustment bahut simple hai:

| Character type | Kya karo | Kyun |
|---|---|---|
| `(` | `currentDepth` badhao | new nested level open hua |
| `)` | `currentDepth` ghatao | current level close hua |
| other | kuch mat karo | depth parentheses se hi change hoti hai |

Important:

```txt
max update sirf '(' ke baad meaningful hai
```

Kyunki wahi point hai jahan peak ban sakti hai.

---

## STEP 10: Answer Formula

Answer ko aise yaad rakho:

```txt
maximum nesting depth
= traversal ke dauran currentDepth ka maximum value
```

Mathematical form me:

```txt
currentDepth:
  '(' par +1
  ')' par -1

answer = max(currentDepth over full traversal)
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "(1+(2*3)+((8)/4))+1"
```

Start:

```txt
currentDepth = 0
maximumDepth = 0
```

| Index | Character | Action | `currentDepth` | `maximumDepth` |
|---:|---|---|---:|---:|
| 0 | `(` | open level | 1 | 1 |
| 1 | `1` | ignore | 1 | 1 |
| 2 | `+` | ignore | 1 | 1 |
| 3 | `(` | open level | 2 | 2 |
| 4 | `2` | ignore | 2 | 2 |
| 5 | `*` | ignore | 2 | 2 |
| 6 | `3` | ignore | 2 | 2 |
| 7 | `)` | close level | 1 | 2 |
| 8 | `+` | ignore | 1 | 2 |
| 9 | `(` | open level | 2 | 2 |
| 10 | `(` | open level | 3 | 3 |
| 11 | `8` | ignore | 3 | 3 |
| 12 | `)` | close level | 2 | 3 |
| 13 | `/` | ignore | 2 | 3 |
| 14 | `4` | ignore | 2 | 3 |
| 15 | `)` | close level | 1 | 3 |
| 16 | `)` | close level | 0 | 3 |
| 17 | `+` | ignore | 0 | 3 |
| 18 | `1` | ignore | 0 | 3 |

Final answer:

```txt
3
```

Second quick example:

```txt
s = "1"
```

| Index | Character | Action | `currentDepth` | `maximumDepth` |
|---:|---|---|---:|---:|
| 0 | `1` | ignore | 0 | 0 |

Answer:

```txt
0
```

---

## STEP 12: Quick Reference

```txt
Depth = abhi kitne open parentheses active hain

'(' => currentDepth++
')' => currentDepth--
other => ignore

Har '(' ke baad:
maximumDepth = max(maximumDepth, currentDepth)

Final answer:
traversal ke dauran currentDepth ka maximum value
```
