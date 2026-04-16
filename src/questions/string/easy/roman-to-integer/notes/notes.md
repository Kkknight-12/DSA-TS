# Roman to Integer - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Roman numeral string `s` diya hai.
Hume usko integer me convert karna hai.

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

Normally Roman numerals bade se chhote order me likhe jaate hain:

```txt
VIII = 5 + 1 + 1 + 1 = 8
```

But special subtraction cases bhi hote hain:

```txt
IV = 4
IX = 9
XL = 40
XC = 90
CD = 400
CM = 900
```

So core rule:

```txt
agar chhota symbol bade symbol se pehle aaye,
toh chhota subtract hota hai
```

Example:

```txt
MCMXCIV
```

Answer:

```txt
1994
```

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
6 special subtraction pairs explicitly yaad rakh lo
```

Fir string me dekhte chalo:

```txt
current + next milkar special pair bana rahe hain ya nahi
```

Example:

```txt
s = "MCMXCIV"
```

Brute force tokenization:

| Position | Token | Value |
|---:|---|---:|
| 0 | `M` | 1000 |
| 1 | `CM` | 900 |
| 3 | `XC` | 90 |
| 5 | `IV` | 4 |

Total:

```txt
1000 + 900 + 90 + 4 = 1994
```

Ye sahi hai,
but thoda rule-listing style solution hai.

---

## STEP 3: Key Insight

Actually special pairs alag se list karna mandatory nahi hai.

Real pattern ye hai:

```txt
current value < next value  -> subtract
current value >= next value -> add
```

Example:

```txt
IV
I = 1, V = 5
1 < 5
so I subtract hoga
```

Another example:

```txt
VI
V = 5, I = 1
5 > 1
so V add hoga
```

Iska matlab:

```txt
special pairs sirf examples hain
core rule comparison hai
```

---

## STEP 4: Why This Technique Works

Roman numeral me subtraction tab hoti hai
jab current symbol apne right wale symbol se chhota ho.

So left-to-right approach me:

```txt
current vs next compare karke
current ko add ya subtract decide kar sakte hain
```

Aur right-to-left approach me:

```txt
current vs previousRightValue compare karke
same decision le sakte hain
```

Example:

```txt
MCMXCIV
```

Right to left:

| Current symbol | Value | Compare with right-side value | Action |
|---|---:|---|---|
| `V` | 5 | right me kuch nahi | add |
| `I` | 1 | `5` | subtract |
| `C` | 100 | `1` | add |
| `X` | 10 | `100` | subtract |
| `M` | 1000 | `10` | add |
| `C` | 100 | `1000` | subtract |
| `M` | 1000 | `100` | add |

Isliye optimal approach clean lagti hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `currentValue` | current Roman symbol ki value |
| `nextValue` | left-to-right better approach me next symbol ki value |
| `previousRightValue` | right-to-left optimal approach me right side ka reference value |
| `result` | final accumulated integer answer |

Short memory:

```txt
result = running total
comparison decides add ya subtract
```

---

## STEP 6: Mental Model

Soch:

```txt
Roman numeral solve karte waqt
har symbol ka kaam do me se ek hai:

1. ya toh wo khud add hoga
2. ya wo kisi bade symbol ke pehle aake subtract hoga
```

Visual:

```txt
M C M X C I V
| | | | | | |
+ - + - + - +
```

Yahan:

- `C` before `M` -> subtract
- `X` before `C` -> subtract
- `I` before `V` -> subtract

Baaki add.

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---:|---|
| Only additions | `III` | 3 | koi subtractive pair nahi |
| Single subtraction pair | `IV` | 4 | `I < V` |
| Mixed addition/subtraction | `MCMXCIV` | 1994 | multiple subtractive spots |
| Large additive start | `LVIII` | 58 | `L + V + I + I + I` |
| Two subtraction pairs | `XLIX` | 49 | `XL` and `IX` |

---

## STEP 8: Conditions

Better approach ka main condition:

```txt
currentValue < nextValue
```

If true:

```txt
current subtract hoga
```

Else:

```txt
current add hoga
```

Optimal approach ka main condition:

```txt
currentValue < previousRightValue
```

If true:

```txt
subtract
```

Else:

```txt
add
```

---

## STEP 9: Adjustment Logic

### Brute Force

```txt
special pair mila -> 2 steps jump
warna 1 step jump
```

### Better

```txt
current vs next compare
current ko add/subtract karo
phir next iteration me move karo
```

### Optimal

```txt
right se left aao
current vs previousRightValue compare karo
phir previousRightValue update karo
```

Dhyan do:

optimal me actual next character dekhne ki need nahi.
Sirf right side ka effective reference enough hai.

---

## STEP 10: Answer Formula

Is problem ka memory formula:

```txt
smaller before larger => subtract
otherwise add
```

Better form:

```txt
if current < next:
  result -= current
else:
  result += current
```

Optimal form:

```txt
if current < previousRightValue:
  result -= current
else:
  result += current
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "MCMXCIV"
```

### Better approach dry run

| Index | Symbol | Current value | Next value | Action | Result |
|---:|---|---:|---:|---|---:|
| 0 | `M` | 1000 | 100 | add | 1000 |
| 1 | `C` | 100 | 1000 | subtract | 900 |
| 2 | `M` | 1000 | 10 | add | 1900 |
| 3 | `X` | 10 | 100 | subtract | 1890 |
| 4 | `C` | 100 | 1 | add | 1990 |
| 5 | `I` | 1 | 5 | subtract | 1989 |
| 6 | `V` | 5 | 0 | add | 1994 |

Final answer:

```txt
1994
```

### Optimal approach dry run

| Index | Symbol | Current value | `previousRightValue` before | Action | Result | `previousRightValue` after |
|---:|---|---:|---:|---|---:|---:|
| 6 | `V` | 5 | 0 | add | 5 | 5 |
| 5 | `I` | 1 | 5 | subtract | 4 | 1 |
| 4 | `C` | 100 | 1 | add | 104 | 100 |
| 3 | `X` | 10 | 100 | subtract | 94 | 10 |
| 2 | `M` | 1000 | 10 | add | 1094 | 1000 |
| 1 | `C` | 100 | 1000 | subtract | 994 | 100 |
| 0 | `M` | 1000 | 100 | add | 1994 | 1000 |

Final answer:

```txt
1994
```

---

## STEP 12: Quick Reference

```txt
Roman numeral core rule:
smaller before larger => subtract

Brute force:
special pairs explicitly list karo

Better:
current vs next compare karo

Optimal:
right to left jao
current vs previousRightValue compare karo

Answer:
add/subtract contributions ka total
```
