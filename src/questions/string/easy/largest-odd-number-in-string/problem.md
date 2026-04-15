# Largest Odd Number in String

Given a numeric string `num`, return the largest-valued odd substring.

If no odd substring exists, return `""`.

Examples:

```txt
"52"     -> "5"
"4206"   -> ""
"35427"  -> "35427"
"123456" -> "12345"
```

Important:

- substring means continuous part of the string
- odd number ka decision sirf last digit se hota hai
- answer longest substring nahi hai by rule
- answer largest numeric value wali odd substring hai

---

## Approach 1: Brute Force

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Sab possible substrings generate karo.

Har substring ke liye:

```txt
last digit odd hai?
```

Agar odd hai, toh wo valid candidate hai.
Phir sab valid candidates me largest numeric value choose karo.

**How it works:**

1. `start` ko `0..n-1` tak chalao
2. `end` ko `start..n-1` tak chalao
3. `num[start..end]` substring banao
4. Agar last digit odd hai, candidate compare karo
5. Sabse bada odd candidate return karo

**Time Complexity:** `O(n^3)`
**Space Complexity:** `O(n)`

**Why slow:**

`O(n^2)` substrings bante hain.
Aur substring banana / compare karna bhi `O(n)` tak ja sakta hai.

---

## Approach 2: Better - Odd Ending Prefix Candidates

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Brute force me hum har possible start bhi try kar rahe the.
Lekin agar fixed end index par digit odd hai,
toh us end ke liye best substring usually prefix hi hota hai:

```txt
num[0..end]
```

So har odd-ending position ke liye bas prefix candidate check karo.

**How it works:**

1. Left se right scan karo
2. Jab bhi current digit odd mile:
3. `num.slice(0, i + 1)` ko candidate banao
4. Latest odd prefix ko best update karo

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(n)`

**Why better but not optimal:**

Substrings bahut kam check ho rahi hain,
but har odd digit par prefix slice banana pad raha hai.

---

## Approach 3: Optimal - Rightmost Odd Digit

**Prerequisites (Agar Koi Chahiye):**
- Koi special prerequisite nahi

**Intuition (Soch):**

Odd number ka rule:

```txt
last digit odd hona chahiye
```

Agar right se left scan karte hue pehla odd digit mil gaya,
toh us index tak ka full prefix sabse bada valid answer hai.

```txt
answer = num[0..rightmostOdd]
```

**How it works:**

1. String ko right se left scan karo
2. Pehla odd digit milte hi `num.slice(0, i + 1)` return karo
3. Agar koi odd digit na mile, `""` return karo

**Time Complexity:** `O(n)`
**Space Complexity:** `O(1)` extra

**Why optimal:**

Bas ek backward scan lagta hai.
No nested loops, no candidate comparison.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Main Idea |
|---|---:|---:|---|---|
| Brute Force | `O(n^3)` | `O(n)` | none | har substring try karo |
| Better | `O(n^2)` | `O(n)` | none | sirf odd-ending prefixes check karo |
| Optimal | `O(n)` | `O(1)` extra | none | rightmost odd digit tak ka prefix return karo |

---

## Learning Order

Pehle odd number ka basic rule pakdo:

```txt
last digit odd -> whole number odd
```

Phir ye observe karo:

```txt
same odd ending ke saath prefix sabse bada candidate hota hai
```

Phir optimal jump samajh aata hai:

```txt
right se pehla odd digit milte hi answer ready
```

Most important memory line:

```txt
Largest odd substring = prefix ending at the rightmost odd digit.
```
