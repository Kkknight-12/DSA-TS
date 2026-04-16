# Longest Palindromic Substring - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

String `s` diya hai.
Hume `s` ke andar ka longest palindromic substring return karna hai.

Palindrome ka matlab:

```txt
left se right same
right se left same
```

Substring ka matlab:

```txt
characters continuous hone chahiye
```

Example:

```txt
s = "babad"
```

Valid palindromic substrings:

| Substring | Palindrome? |
|---|---:|
| `"b"` | true |
| `"a"` | true |
| `"bab"` | true |
| `"aba"` | true |
| `"babad"` | false |

Longest length `3` hai.
So answer `"bab"` ya `"aba"` dono valid hain.

Repo tests deterministic output ke liye `"bab"` expect karte hain.

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
har possible substring banao
har substring check karo palindrome hai ya nahi
longest palindrome remember karo
```

Example:

```txt
s = "babad"
```

Length descending order me try karo:

| Length | Substrings checked | Result |
|---:|---|---|
| 5 | `"babad"` | not palindrome |
| 4 | `"baba"`, `"abad"` | not palindrome |
| 3 | `"bab"` | palindrome |

Jab length `3` par `"bab"` mil gaya,
toh answer final hai.

Kyun?

Kyunki length `5` and `4` already fail ho chuki hain.
Length descending me first palindrome longest hota hai.

Time:

```txt
O(n^3)
```

Reason:

```txt
O(n^2) substrings
each palindrome check O(n)
```

---

## STEP 3: Key Insight

Palindrome ka sabse important property:

```txt
center ke around symmetry
```

Example odd length:

```txt
b a b
  ^
center = a
```

Example even length:

```txt
b b
^ ^
center = gap between two b's
```

So every palindrome has a center.

Instead of every substring try karna,
hum every center try kar sakte hain.

---

## STEP 4: Why This Technique Works

Palindrome ko center se grow karo.

Example:

```txt
s = "cbbd"
```

Center between index `1` and `2`:

```txt
c b b d
  ^ ^
```

Expansion:

| left | right | Compare | Meaning |
|---:|---:|---|---|
| 1 | 2 | `b == b` | valid palindrome `"bb"` |
| 0 | 3 | `c != d` | expansion stops |

Last valid range:

```txt
[1, 2] = "bb"
```

This works because palindrome me outer pair match hona zaruri hai.
Jab outer pair match karta hai, tab answer next inner/outer state par depend karta hai.
Center expansion usi symmetry ko directly simulate karta hai.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `s` | input string |
| `left` | current palindrome candidate ka left boundary |
| `right` | current palindrome candidate ka right boundary |
| `center` | current index being treated as palindrome center |
| `bestStart` | best palindrome ka start index |
| `bestEnd` | best palindrome ka end index |
| `odd` | one-character center expansion result |
| `even` | two-character/gap center expansion result |
| `transformed` | Manacher ke liye `#` inserted string |
| `radius[i]` | transformed center `i` se palindrome kitna expand hota hai |
| `rightBoundary` | rightmost known palindrome ka right edge |
| `mirror` | current index ka reflected index around known center |

Short memory:

```txt
better = expand around every center
optimal = reuse mirror radius before expanding
```

---

## STEP 6: Mental Model

String ko mirror ki tarah dekho.

For each center, question ye hai:

```txt
kya left side and right side same image bana rahe hain?
```

Example:

```txt
b a b
|   |
same pair
```

If pair match:

```txt
mirror thoda aur bahar tak grow kar sakta hai
```

If pair mismatch:

```txt
mirror yahin break ho gaya
```

Manacher mental model:

```txt
agar main already ek bade mirror ke andar hoon,
toh opposite side ka mirror mujhe batata hai
ki minimum kitna area already safe hai
```

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Empty string | `""` | `""` | no characters |
| Single character | `"a"` | `"a"` | one char is palindrome |
| Odd palindrome | `"babad"` | `"bab"` | center is one char |
| Even palindrome | `"cbbd"` | `"bb"` | center is between two chars |
| Whole string palindrome | `"racecar"` | `"racecar"` | full symmetry |
| All same characters | `"aaaa"` | `"aaaa"` | every expansion matches |
| No long palindrome | `"abcde"` | `"a"` | only single chars work |

---

## STEP 8: Conditions

Palindrome check condition:

```txt
s[left] === s[right]
```

Meaning:

```txt
current outer pair mirror-symmetric hai
```

Expansion continues only while:

```txt
left >= 0
right < s.length
s[left] === s[right]
```

Meaning:

```txt
both pointers valid range me hain
and outer pair still matching hai
```

Best update condition:

```txt
currentLength > bestLength
```

Meaning:

```txt
naya palindrome previous best se strictly longer hai
```

Tie me update nahi karte.
Isse earlier palindrome stable rehta hai.

---

## STEP 9: Adjustment Logic

Center expansion:

```txt
match mila -> left--, right++
```

Why?

```txt
current outer pair valid hai
ab bigger palindrome check karne ke liye one step bahar jana padega
```

Loop stop hone ke baad:

```txt
valid start = left + 1
valid end   = right - 1
```

Why?

```txt
left and right stop state par invalid pair ya boundary ke bahar hote hain
last valid palindrome ek step andar tha
```

Manacher adjustment:

```txt
if i < rightBoundary:
  radius[i] = min(radius[mirror], rightBoundary - i)
```

Why?

```txt
mirror radius known hai
but current palindrome rightBoundary ke bahar guaranteed nahi hai
so safe radius boundary tak limited hota hai
```

---

## STEP 10: Answer Formula

Brute force:

```txt
first palindrome found while checking lengths from n down to 1
```

Better:

```txt
for every center:
  odd expansion
  even expansion
  update best range if longer

answer = s.slice(bestStart, bestEnd + 1)
```

Optimal Manacher:

```txt
start = floor((bestCenter - bestLength) / 2)
answer = s.slice(start, start + bestLength)
```

Why divide by `2`?

Transformed string me original characters 2-step spacing par hote hain:

```txt
original:    b   a   b
transformed: # b # a # b #
indexes:     0 1 2 3 4 5 6
```

So transformed index ko original index me map karne ke liye `/ 2` use hota hai.

---

## STEP 11: Full Dry Run

### Better Approach Dry Run

Example:

```txt
s = "cbbd"
```

Initial:

```txt
best = "c"
bestStart = 0
bestEnd = 0
```

| Center | Odd expansion | Even expansion | Best after center |
|---:|---|---|---|
| 0 | `"c"` | empty because `c != b` | `"c"` |
| 1 | `"b"` | `"bb"` because `b == b` | `"bb"` |
| 2 | `"b"` | empty because `b != d` | `"bb"` |
| 3 | `"d"` | empty at boundary | `"bb"` |

Detailed important expansion:

| left | right | Compare | Action |
|---:|---:|---|---|
| 1 | 2 | `b == b` | expand outward |
| 0 | 3 | `c != d` | stop |

Stop state:

```txt
left = 0
right = 3
```

Last valid range:

```txt
left + 1 = 1
right - 1 = 2
```

So:

```txt
s.slice(1, 3) = "bb"
```

Final answer:

```txt
"bb"
```

### Manacher Dry Run

Example:

```txt
s = "babad"
transformed = "#b#a#b#a#d#"
```

Important indexes:

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| Char | # | b | # | a | # | b | # | a | # | d | # |

Key iterations:

| i | char | Mirror reuse | Expansion result | center/rightBoundary | Best |
|---:|---|---|---|---|---|
| 1 | b | none | radius `1`, palindrome `"b"` | center `1`, right `2` | `"b"` |
| 3 | a | none | radius `3`, palindrome `"bab"` | center `3`, right `6` | `"bab"` |
| 4 | # | mirror `2`, safe radius `0` | no bigger palindrome | center `3`, right `6` | `"bab"` |
| 5 | b | mirror `1`, safe radius `1` | expands to radius `3`, palindrome `"aba"` | center `5`, right `8` | `"bab"` |

At `i = 5`, `"aba"` ties length `3`.
We update only when strictly longer, so earlier `"bab"` remains answer.

Final:

```txt
bestCenter = 3
bestLength = 3

start = floor((3 - 3) / 2)
      = 0

answer = s.slice(0, 3)
       = "bab"
```

---

## STEP 12: Quick Reference

Brute:

```txt
try every substring
palindrome check with two pointers
```

Better:

```txt
for each center:
  expand odd
  expand even
  keep longest
```

Optimal:

```txt
transform with #
build radius array
reuse mirror radius inside right boundary
expand only when needed
```

Most important line:

```txt
palindrome grows from center
```

Manacher one-line memory:

```txt
mirror gives safe radius, expansion verifies beyond boundary
```
