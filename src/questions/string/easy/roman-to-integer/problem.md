# Roman to Integer

Given a Roman numeral string `s`, convert it to an integer.

Examples:

```txt
"III"     -> 3
"LVIII"   -> 58
"MCMXCIV" -> 1994
```

Roman symbols:

```txt
I = 1
V = 5
X = 10
L = 50
C = 100
D = 500
M = 1000
```

Important:

- normally Roman numerals bade se chhote order me likhe jaate hain
- but kuch special subtraction cases hote hain:

```txt
IV = 4
IX = 9
XL = 40
XC = 90
CD = 400
CM = 900
```

- agar chhota symbol bade symbol se pehle aaye,
  toh uska matlab subtraction hota hai

---

## Approach 1: Brute Force - Explicit Special Pairs

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Roman numeral me 6 special subtraction pairs hote hain.

So brute force idea:

```txt
current aur next character ko ek pair ke roop me check karo
agar wo special pair hai, uski direct value add karo
warna single character ki value add karo
```

**How it works:**

1. Single-character Roman map banao
2. 6 special two-character cases ka separate map banao
3. String ko left se right traverse karo
4. Har step par current + next ko special pair ke roop me check karo
5. Agar pair valid hai, special value add karke 2 positions jump karo
6. Warna single character add karke 1 position jump karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why brute force even though `O(n)` hai:**

Kyuki ye direct rule listing approach hai.
Hum subtraction rule ko derive nahi kar rahe,
hum special cases ko explicitly hardcode kar rahe hain.

---

## Approach 2: Better - Left To Right Neighbor Comparison

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Special pair alag se list karna zaruri nahi.

Bas current aur next value compare karo:

```txt
current < next  -> subtract
current >= next -> add
```

Example:

```txt
"IV"
I < V, so 1 subtract hoga
V last me add hoga
=> -1 + 5 = 4
```

**How it works:**

1. Roman symbol -> value map banao
2. Left se right traverse karo
3. Current value aur next value compare karo
4. Agar current < next hai, current subtract karo
5. Otherwise current add karo
6. Last character naturally add ho jayega

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why better:**

Explicit special-pair map ki zarurat khatam ho jaati hai.
Ab general comparison rule se saare cases handle ho jaate hain.

---

## Approach 3: Optimal - Right To Left Traversal

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Right se left traverse karte waqt har symbol ko bas right side ke previous value se compare karna hai.

Rule:

```txt
current >= prevValue -> add
current < prevValue  -> subtract
```

Example:

```txt
"MCMXCIV"
right to left:
V add
I subtract
C add
X subtract
M add
C subtract
M add
```

**How it works:**

1. Roman map banao
2. `prevValue = 0`, `result = 0`
3. String ko right se left traverse karo
4. Current value compare karo `prevValue` se
5. Agar current >= prevValue hai, add karo
6. Warna subtract karo
7. `prevValue = currentValue` update karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)`

**Why optimal:**

Logic bahut clean ho jata hai.
Look-ahead ya special pair handling ki zarurat nahi hoti.
Bas ek previous-right-value track karke kaam ho jata hai.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Main Idea |
|---|---:|---:|---|---|
| Brute Force | `O(n)` | `O(1)` | none | special subtraction pairs explicitly check karo |
| Better | `O(n)` | `O(1)` | none | current vs next compare karke add/subtract decide karo |
| Optimal | `O(n)` | `O(1)` | none | right-to-left prevValue comparison use karo |

---

## Learning Order

Pehle Roman numeral ka subtraction rule pakdo:

```txt
chhota symbol bade symbol se pehle aaye -> subtract
```

Phir brute force soch:

```txt
special pairs explicitly yaad rakh ke solve kar sakte hain
```

Phir better insight:

```txt
special pair list ke bina bhi current < next rule se kaam ho sakta hai
```

Phir optimal jump:

```txt
right to left traverse karke prevValue se hi add/subtract decide ho sakta hai
```

Most important memory line:

```txt
Roman numeral conversion me subtraction tab hoti hai jab current symbol ki value uske right wale effective symbol se chhoti ho.
```
