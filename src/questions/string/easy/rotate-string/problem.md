# Rotate String

Given two strings `s` and `goal`, return `true` if `goal` can be obtained by rotating `s`.
Otherwise, return `false`.

Examples:

```txt
s = "abcde", goal = "cdeab" -> true
s = "abcde", goal = "abced" -> false
s = "",      goal = ""      -> true
```

Important:

- rotation preserves character order
- rotation only changes the starting point
- lengths must be equal
- if lengths differ, answer is immediately `false`

---

## Approach 1: Brute Force - Generate Every Rotation

**Prerequisites (Agar Koi Chahiye):**
- String slicing

**Intuition (Soch):**

Har possible start index se rotation banao.
Agar koi rotation `goal` ke equal ho gayi, answer `true`.

Example:

```txt
s = "abcde"
```

All rotations:

```txt
abcde
bcdea
cdeab
deabc
eabcd
```

`goal = "cdeab"` inme present hai,
so answer `true`.

**How it works:**

1. Length mismatch ho toh `false`
2. Har index `i` ko possible rotation start mano
3. Rotation banao:
   `s.slice(i) + s.slice(0, i)`
4. Agar rotation `goal` ke equal hai, `true`
5. Sab rotations fail ho jayein, `false`

**Time Complexity:** `O(n^2)`
**Space Complexity:** `O(n)`

**Why slow:**

`n` rotations banti hain,
aur har rotation banane/compare karne me `O(n)` lag sakta hai.

---

## Approach 2: Optimal For Practice - Double String Trick

**Prerequisites (Agar Koi Chahiye):**
- Substring search idea

**Intuition (Soch):**

Rotation ka matlab:

```txt
s ka kuch suffix front me aa gaya
aur prefix end me chala gaya
```

Agar hum `s + s` banate hain,
toh `s` ki saari rotations uske andar continuous substring ke roop me milti hain.

Example:

```txt
s = "abcde"
s + s = "abcdeabcde"
```

`"cdeab"` is doubled string ke andar present hai.

**How it works:**

1. Length mismatch ho toh `false`
2. Return `(s + s).includes(goal)`

**Time Complexity:** library-dependent substring search
**Space Complexity:** `O(n)`

Practical note:

In interviews and LeetCode-style usage,
ye sabse clean solution maana jata hai.
JavaScript engine ka `includes` internally optimized ho sakta hai,
but algorithmic guarantee explain karni ho toh KMP version zyada explicit hai.

---

## Approach 3: Optimal-KMP - Explicit Linear Substring Search

**Prerequisites (Agar Koi Chahiye):**
- KMP prefix table / LPS array
- Concept note: `src/basics/algorithm/searching/string/KMP/notes.md`

**Intuition (Soch):**

Double string trick same rahega:

```txt
goal should appear inside s + s
```

But instead of relying on built-in `includes`,
hum KMP se substring search karenge.

KMP ka benefit:

```txt
matched characters ko uselessly repeat compare nahi karte
```

**How it works:**

1. Length mismatch ho toh `false`
2. `text = s + s`
3. `pattern = goal`
4. `pattern` ka LPS table build karo
5. KMP search se check karo pattern text me present hai ya nahi

**Time Complexity:** `O(n)`
**Space Complexity:** `O(n)`

**Why this is algorithmically explicit:**

KMP substring search ka worst-case time `O(n)` hota hai.
So agar built-in `includes` par rely nahi karna,
ye strict algorithmic version hai.

---

## Comparison Table

| Approach | Time | Space | Prerequisites | Main Idea |
|---|---:|---:|---|---|
| Brute Force | `O(n^2)` | `O(n)` | string slicing | all rotations generate karo |
| Double String | library-dependent | `O(n)` | substring search | `goal` ko `s+s` me search karo |
| Optimal-KMP | `O(n)` | `O(n)` | KMP / LPS | `s+s` me goal ko KMP se search karo |

---

## Learning Order

Pehle rotation manually dekho:

```txt
abcde -> cdeab
```

Phir brute force soch:

```txt
saari rotations generate karke compare kar sakte hain
```

Phir key insight:

```txt
s+s ke andar saari rotations continuous substring ke form me hoti hain
```

Phir algorithmic strict version:

```txt
same substring search ko KMP se karo
```

Most important memory line:

```txt
goal is a rotation of s iff lengths are equal and goal appears inside s + s.
```
