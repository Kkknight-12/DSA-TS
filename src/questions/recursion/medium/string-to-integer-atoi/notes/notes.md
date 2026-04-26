# String To Integer (atoi) - Notes

## 1. Problem Samjho

Hume ek string ko integer me convert karna hai.

But pure string ko blindly number nahi banana.

Rules follow karne hain:

```txt
leading spaces ignore
optional sign read
continuous digits read
first non-digit par stop
32-bit signed range me clamp
```

Range:

```txt
INT_MIN = -2147483648
INT_MAX =  2147483647
```

Example:

```txt
"   -042" -> -42
"1337c0d3" -> 1337
"words 123" -> 0
```

---

## 2. Brute Force

Brute force soch:

```txt
string ko trim karo
sign alag karo
digit prefix manually collect karo
phir number banao
```

Problem recursion context me:

```txt
ye mostly iterative / loop-heavy soch hai
```

Hum recursion practice kar rahe hain,
toh same parsing rules ko recursive calls me todna better hai.

---

## 3. Key Insight

`atoi` parsing ko 3 phases me socha ja sakta hai:

| phase | job |
|---|---|
| 1 | leading spaces skip karo |
| 2 | optional sign read karo |
| 3 | digits ko number me build karo |

Recursion ke liye best insight:

```txt
Har recursive call next index ko handle karegi.
```

Yahan tree-like branching nahi hai.
Yeh more like ek recursive chain hai.

---

## 4. Why This Technique Works

Number build karne ka standard rule:

```txt
newNumber = oldNumber * 10 + digit
```

Example:

```txt
"507"

start = 0
read '5' -> 0 * 10 + 5 = 5
read '0' -> 5 * 10 + 0 = 50
read '7' -> 50 * 10 + 7 = 507
```

Recursion exactly isi left-to-right building ko express karti hai.

Har frame bolta hai:

```txt
main current index process karta hoon
phir next index tum process karo
```

---

## 5. Variables

| variable | meaning |
|---|---|
| `firstMeaningfulIndex` | leading spaces ke baad pehla useful index |
| `sign` | final number positive hai ya negative |
| `digitStartIndex` | jahan se actual digits start hongi |
| `currentNumber` | ab tak parsed unsigned magnitude |
| `digit` | current character ki numeric value |

State example:

```txt
s = "   -042"
sign = -1
index = 5
currentNumber = 0
```

Meaning:

```txt
spaces skip ho chuke hain
negative sign read ho chuka hai
ab s[5] par current digit process karni hai
ab tak magnitude 0 hai
```

---

## 6. Mental Model

Is problem ko ek pipeline ki tarah dekho:

```txt
spaces skip -> sign read -> digits build -> stop
```

For:

```txt
"   -042"
```

State flow:

```txt
skipLeadingSpaces(0) -> 3
sign = -1
digitStartIndex = 4
readDigits(4, -1, 0)
```

Recursive chain:

```txt
readDigits(index=4, currentNumber=0)
  -> read '0' -> nextNumber = 0
readDigits(index=5, currentNumber=0)
  -> read '4' -> nextNumber = 4
readDigits(index=6, currentNumber=4)
  -> read '2' -> nextNumber = 42
readDigits(index=7, currentNumber=42)
  -> stop, apply sign -> -42
```

---

## 7. Boundary Cases

| case | example | answer | why |
|---|---|---|---|
| empty string | `""` | `0` | parse karne ko kuch nahi |
| only spaces | `"   "` | `0` | meaningful character mila hi nahi |
| only sign | `"+"` | `0` | sign ke baad digit nahi |
| invalid start | `"words 123"` | `0` | first meaningful char digit/sign valid parse start nahi karta |
| stop at non-digit | `"4193 with words"` | `4193` | first non-digit par parsing stop |
| positive overflow | `"2147483648"` | `2147483647` | clamp to INT_MAX |
| negative overflow | `"-2147483649"` | `-2147483648` | clamp to INT_MIN |

---

## 8. Conditions

### `firstMeaningfulIndex === s.length`

Meaning:

```txt
spaces skip karte-karte string khatam ho gayi
```

Action:

```txt
return 0
```

### `digitStartIndex === s.length || !isDigit(s[digitStartIndex])`

Meaning:

```txt
optional sign ke baad digit mila hi nahi
```

Action:

```txt
valid number start nahi hua, return 0
```

### `index === s.length || !isDigit(s[index])`

Meaning:

```txt
digit reading phase khatam
```

Action:

```txt
currentNumber par sign apply karke return karo
```

### `currentNumber > 214748364`

Meaning:

```txt
next digit append karte hi boundary cross ho jayegi
```

Action:

```txt
clamped value return karo
```

### `currentNumber === 214748364`

Meaning:

```txt
ab decision last digit par depend karta hai
```

Rules:

| sign | max allowed last digit |
|---|---|
| positive | `7` |
| negative | `8` |

---

## 9. Adjustment Logic

Yahan pointer adjustment nahi, index adjustment hai.

### `skipLeadingSpaces` me

| step | index move | why |
|---|---|---|
| current char space | `index + 1` | leading spaces ignore karni hain |
| first non-space mila | stop | meaningful parsing yahin se shuru hogi |

### `readDigits` me

| step | index move | why |
|---|---|---|
| current char digit | `index + 1` | current digit consume ho gayi |
| current char non-digit | stop | atoi yahin terminate hota hai |

### Number adjustment

| formula | meaning |
|---|---|
| `currentNumber * 10 + digit` | old number me new digit append karna |

---

## 10. Answer Formula

Yahan direct numeric answer formula nahi hai.

Important building formula:

```txt
nextNumber = currentNumber * 10 + digit
```

Overflow cutoff:

```txt
MAX_PREFIX = 214748364
```

Reason:

```txt
INT_MAX = 2147483647
INT_MIN = -2147483648
```

So:

```txt
prefix 214748364 tak safe compare point hai
uske baad last digit sign-specific hoti hai
```

Complexity:

```txt
Time  = O(n)
Space = O(n)
```

---

## 11. Full Dry Run

Example:

```txt
s = "   -042"
```

### Phase 1 - Skip Spaces

| call | index | char | action | return |
|---|---|---|---|---|
| 1 | 0 | `' '` | ignore, recurse to 1 | `3` |
| 2 | 1 | `' '` | ignore, recurse to 2 | `3` |
| 3 | 2 | `' '` | ignore, recurse to 3 | `3` |
| 4 | 3 | `'-'` | first non-space found | `3` |

So:

```txt
firstMeaningfulIndex = 3
```

### Phase 2 - Sign

| position | char | action |
|---|---|---|
| 3 | `'-'` | `sign = -1`, `digitStartIndex = 4` |

### Phase 3 - Read Digits

| call | index | char | currentNumber before | digit | nextNumber | action |
|---|---|---|---|---|---|---|
| 1 | 4 | `'0'` | `0` | `0` | `0` | recurse to index 5 |
| 2 | 5 | `'4'` | `0` | `4` | `4` | recurse to index 6 |
| 3 | 6 | `'2'` | `4` | `2` | `42` | recurse to index 7 |
| 4 | 7 | end | `42` | - | - | stop, apply sign |

Final:

```txt
sign = -1
currentNumber = 42
answer = -42
```

### Overflow Example

Input:

```txt
"2147483648"
```

Critical step:

| currentNumber | digit | sign | check | result |
|---|---|---|---|---|
| `214748364` | `8` | `+1` | positive last digit `7` se bada | return `INT_MAX` |

So answer:

```txt
2147483647
```

---

## 12. Quick Reference

| point | summary |
|---|---|
| parsing order | spaces -> sign -> digits |
| stop rule | first non-digit after digit phase |
| number build | `currentNumber * 10 + digit` |
| positive limit | `2147483647` |
| negative limit | `-2147483648` |
| cutoff prefix | `214748364` |
| time | `O(n)` |
| space | `O(n)` |
