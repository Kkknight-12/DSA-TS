# String to Integer (atoi) - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

String `s` ko 32-bit signed integer me convert karna hai.

But normal conversion nahi.
Specific parser rules follow karne hain:

```txt
leading spaces ignore
optional sign read
digits read
first non-digit par stop
overflow/underflow clamp
```

Examples:

| Input | Output | Why |
|---|---:|---|
| `"42"` | `42` | direct digits |
| `"   -42"` | `-42` | leading spaces ignored |
| `"4193 with words"` | `4193` | stop at space after digits |
| `"words and 987"` | `0` | first meaningful char digit/sign nahi |
| `"-91283472332"` | `-2147483648` | underflow clamp |

Range:

```txt
INT_MIN = -2147483648
INT_MAX =  2147483647
```

---

## STEP 2: Brute Force

Manual phases:

```txt
1. index ko start par rakho
2. spaces skip karo
3. sign detect karo
4. digit by digit result build karo
5. overflow check karo
6. final sign apply karo
```

Example:

```txt
s = "   -42"
```

| Phase | State |
|---|---|
| skip spaces | index moves to `-` |
| read sign | sign = `-1` |
| read `4` | result = `4` |
| read `2` | result = `42` |
| apply sign | `-42` |

Time:

```txt
O(n)
```

Space:

```txt
O(1)
```

---

## STEP 3: Key Insight

Atoi ek parser hai.

Parser ka order fixed hota hai:

```txt
spaces -> sign -> digits -> stop
```

Is order ke bahar kuch mila, toh parsing stop/return hoti hai.

Examples:

| Input | Parsing behavior | Output |
|---|---|---:|
| `"  -42"` | spaces, sign, digits | `-42` |
| `"42-10"` | digits, then stop at `-` | `42` |
| `"+-12"` | sign `+`, then non-digit `-` | `0` |
| `"+ 12"` | sign `+`, then space non-digit | `0` |

---

## STEP 4: Why This Technique Works

Number digit by digit build hota hai:

```txt
result = result * 10 + digit
```

Why `* 10`?

Because decimal system me new digit right side add karne ke liye old number one place left shift hota hai.

Example:

```txt
result = 12
digit = 3

new result = 12 * 10 + 3
           = 123
```

Overflow check pehle karna zaruri hai:

```txt
before result = result * 10 + digit
```

Kyunki agar operation ke baad check karoge,
toh invalid number already ban chuka hoga.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `s` | input string |
| `index` | current character position |
| `sign` | `1` for positive, `-1` for negative |
| `result` | unsigned number being built |
| `digit` | current numeric digit |
| `INT_MAX` | max allowed positive value |
| `INT_MIN` | min allowed negative value |
| `MAX_DIV_10` | `214748364`, overflow prefix boundary |
| `lastAllowedDigit` | `7` for positive, `8` for negative |

Short memory:

```txt
result stores absolute value
sign applies at the end
```

---

## STEP 6: Mental Model

Socho string ek queue hai.
Parser left se right walk karta hai.

Parser ke gates:

```txt
Gate 1: spaces allowed
Gate 2: one optional sign allowed
Gate 3: digits allowed
Gate 4: anything else stops parsing
```

Once digit parsing starts:

```txt
space bhi stop karega
letter bhi stop karega
symbol bhi stop karega
```

Example:

```txt
"   +0 123"
```

Parser reads:

```txt
spaces -> + -> 0 -> stop at space
```

Output:

```txt
0
```

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---:|---|
| Empty string | `""` | `0` | no digits |
| Only spaces | `"   "` | `0` | no meaningful char |
| Sign only | `"+"` | `0` | sign without digits |
| Invalid signs | `"+-12"` | `0` | second sign is non-digit |
| Starts with words | `"words 987"` | `0` | first meaningful char invalid |
| Digits then words | `"4193 with words"` | `4193` | stop after digits |
| Positive overflow | `"2147483648"` | `2147483647` | clamp |
| Negative underflow | `"-2147483649"` | `-2147483648` | clamp |
| Exact min | `"-2147483648"` | `-2147483648` | allowed |

---

## STEP 8: Conditions

Skip leading spaces:

```ts
while (index < s.length && s[index] === ' ')
```

Meaning:

```txt
abhi number start nahi hua
spaces ignore kar sakte hain
```

Sign detection:

```ts
s[index] === '+' || s[index] === '-'
```

Meaning:

```txt
first meaningful token sign ho sakta hai
```

Digit parsing:

```ts
char >= '0' && char <= '9'
```

Meaning:

```txt
current character number ka part hai
```

Overflow prefix:

```ts
result > MAX_DIV_10
```

Meaning:

```txt
next *10 operation definitely boundary cross karega
```

Boundary last digit:

```ts
result === MAX_DIV_10 && digit > lastAllowedDigit
```

Meaning:

```txt
prefix boundary par hai
ab current digit decide karega overflow hoga ya nahi
```

---

## STEP 9: Adjustment Logic

When space skipped:

```txt
index++
```

Why?

```txt
space consumed nahi, ignored hai
next meaningful char find karna hai
```

When sign found:

```txt
sign = +1 or -1
index++
```

Why?

```txt
sign token parse ho gaya
digits next character se start honge
```

When digit found:

```txt
result = result * 10 + digit
index++
```

Why?

```txt
digit number me append ho gaya
next char parse karna hai
```

When non-digit found:

```txt
break
```

Why?

```txt
atoi rules ke according parsing yahin stop hoti hai
```

---

## STEP 10: Answer Formula

Digit append:

```txt
result = result * 10 + digit
```

Overflow guard:

```txt
if result > 214748364 -> clamp

if result == 214748364:
  positive: digit > 7 -> clamp INT_MAX
  negative: digit > 8 -> clamp INT_MIN
```

Final:

```txt
answer = result * sign
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "   -42 with words"
```

Initial:

```txt
index = 0
sign = 1
result = 0
```

| Step | Character | Action | State |
|---:|---|---|---|
| 1 | space | skip | `index = 1` |
| 2 | space | skip | `index = 2` |
| 3 | space | skip | `index = 3` |
| 4 | `-` | sign found | `sign = -1`, `index = 4` |
| 5 | `4` | digit append | `result = 4`, `index = 5` |
| 6 | `2` | digit append | `result = 42`, `index = 6` |
| 7 | space | non-digit stop | loop ends |

Final:

```txt
answer = result * sign
       = 42 * -1
       = -42
```

Overflow dry run:

```txt
s = "2147483648"
```

| Parsed so far | Next digit | Check | Result |
|---:|---:|---|---|
| `214748364` | `8` | positive last allowed digit is `7` | clamp to `2147483647` |

Underflow dry run:

```txt
s = "-2147483648"
```

| Parsed so far | Next digit | Check | Result |
|---:|---:|---|---|
| `214748364` | `8` | negative last allowed digit is `8` | allowed |

Final:

```txt
-2147483648
```

---

## STEP 12: Quick Reference

Parser order:

```txt
spaces -> sign -> digits -> stop
```

Digit append:

```txt
result = result * 10 + digit
```

Clamp range:

```txt
[-2147483648, 2147483647]
```

Overflow memory:

```txt
positive last digit allowed = 7
negative last digit allowed = 8
```

Most important line:

```txt
check overflow before result * 10 + digit
```
