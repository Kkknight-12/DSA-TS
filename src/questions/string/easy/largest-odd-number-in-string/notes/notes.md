# Largest Odd Number in String - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Ek numeric string `num` di hai.
Hume aisi substring return karni hai jo:

```txt
1. odd ho
2. value me sabse badi ho
```

Example:

```txt
num = "123456"
```

Possible odd substrings me se ek answer hai:

```txt
"12345"
```

Kyun?

```txt
last digit = 5
5 odd hai
```

Important:

- substring continuous hoti hai
- odd/even decide karne ke liye bas last digit dekhni hoti hai
- hume largest value chahiye, sirf longest length nahi

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
har possible substring banao
agar uska last digit odd hai
toh usse answer candidate maan lo
```

Example:

```txt
num = "52"
```

| `start` | `end` | substring | last digit odd? | valid candidate? |
|---:|---:|---|---|---|
| 0 | 0 | `"5"` | yes | yes |
| 0 | 1 | `"52"` | no | no |
| 1 | 1 | `"2"` | no | no |

Final answer:

```txt
"5"
```

Brute force sahi hai,
but slow hai.

Reason:

```txt
O(n^2) substrings
aur substring banana / compare karna bhi O(n) tak ja sakta hai
```

So total:

```txt
O(n^3)
```

---

## STEP 3: Key Insight

Odd number ka asli rule bahut simple hai:

```txt
last digit odd hona chahiye
```

Ab maan lo koi valid odd substring hai:

```txt
num[l..r]
```

Agar `num[r]` odd hai,
toh same `r` ke saath ye bhi valid hoga:

```txt
num[0..r]
```

Aur ye usually bada hoga,
kyunki isme left side ke more significant digits bhi aa gaye.

Example:

```txt
num = "35427"
```

Odd substring:

```txt
"5427"
```

Same end index ke saath prefix:

```txt
"35427"
```

Clearly:

```txt
"35427" > "5427"
```

So fixed odd ending ke liye,
best candidate prefix hi hota hai.

---

## STEP 4: Why This Technique Works

Suppose rightmost odd digit index `r` par hai.

Then:

```txt
num[0..r]
```

odd bhi hoga and best bhi hoga.

Why?

1. Odd hone ke liye bas `num[r]` odd hona chahiye
2. `r` ke right me saare digits even hain, isliye un tak extend nahi kar sakte
3. Same `r` ke saath prefix sabse bada candidate hota hai

Isliye hume ye nahi dekhna:

```txt
kaunsa start best hai
```

Hume sirf ye dekhna hai:

```txt
rightmost odd digit kahan hai
```

Dhyan do:

agar left me extra digits `0` hon,
toh value same bhi reh sakti hai instead of strictly larger.
Tab bhi prefix ek valid maximum-valued answer hota hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `i` | current index while scanning from right |
| `num[i]` | current digit |
| `isOddDigit(num[i])` | current digit odd hai ya nahi |
| `num.slice(0, i + 1)` | current answer prefix |

Short memory:

```txt
right se pehla odd digit milte hi answer mil gaya
```

---

## STEP 6: Mental Model

Soch:

```txt
main answer ko right boundary se dhoond raha hoon
```

Kyuki:

```txt
odd/even ka decision end digit karta hai
```

Visual:

```txt
num = "123456"

idx:    0  1  2  3  4  5
digit:  1  2  3  4  5  6
                      ^
                 yahan se scan start
```

Right se left move karte hue:

- even digit mila -> answer yahan end nahi ho sakta
- odd digit mila -> isi tak ka prefix answer hai

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Last digit already odd | `"35427"` | `"35427"` | whole string odd hai |
| No odd digit | `"4206"` | `""` | koi valid odd ending hi nahi |
| Single odd digit | `"7"` | `"7"` | wahi answer hai |
| Single even digit | `"8"` | `""` | odd substring possible nahi |
| Odd digit before trailing evens | `"123456"` | `"12345"` | rightmost odd digit `5` hai |

---

## STEP 8: Conditions

Main condition:

```txt
digit odd hai?
```

Code level par:

```txt
digit % 2 === 1
```

If true:

```txt
return num.slice(0, i + 1)
```

If false:

```txt
left move karo
```

---

## STEP 9: Adjustment Logic

Scan direction:

```txt
right -> left
```

Adjustment rule:

| Current digit | Kya karo | Kyun |
|---|---|---|
| even | `i--` | odd answer yahan end nahi ho sakta |
| odd | prefix return karo | same end ke saath prefix best candidate hai |

Is problem me shrink / expand jaisa complex logic nahi hai.
Bas right boundary dhoondhni hai.

---

## STEP 10: Answer Formula

Answer ko aise yaad rakho:

```txt
answer = prefix ending at rightmost odd digit
```

Agar rightmost odd digit index `r` hai:

```txt
answer = num.slice(0, r + 1)
```

Agar koi odd digit hi nahi mila:

```txt
answer = ""
```

---

## STEP 11: Full Dry Run

Example:

```txt
num = "123456"
```

Initial view:

```txt
idx:    0  1  2  3  4  5
digit:  1  2  3  4  5  6
```

Right-to-left scan:

| Step | `i` | `num[i]` | odd? | Action | Answer so far |
|---:|---:|---|---|---|---|
| 1 | 5 | `"6"` | no | left move karo | none |
| 2 | 4 | `"5"` | yes | `num.slice(0, 5)` return | `"12345"` |

Final answer:

```txt
"12345"
```

Second example:

```txt
num = "4206"
```

| Step | `i` | `num[i]` | odd? | Action |
|---:|---:|---|---|---|
| 1 | 3 | `"6"` | no | left move |
| 2 | 2 | `"0"` | no | left move |
| 3 | 1 | `"2"` | no | left move |
| 4 | 0 | `"4"` | no | left move |

Odd digit mila hi nahi.

Final answer:

```txt
""
```

---

## STEP 12: Quick Reference

```txt
Odd number => last digit odd

Largest odd substring ke liye:
same odd ending ke saath prefix best hota hai

So:
right se left scan karo
pehla odd digit milte hi prefix return karo

No odd digit => ""
```
