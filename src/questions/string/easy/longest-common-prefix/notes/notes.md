# Longest Common Prefix - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

Array `strs` diya hai.
Hume aisa prefix return karna hai jo:

```txt
1. sabhi strings ke start me ho
2. sabse lamba ho
```

Example:

```txt
strs = ["flower", "flow", "flight"]
```

Check:

```txt
"f"  -> common
"fl" -> common
"flo" -> common nahi
```

So answer:

```txt
"fl"
```

Important:

- prefix hamesha start se hota hai
- substring jaisa kahin se bhi start nahi hota
- first mismatch ke baad prefix aage extend nahi ho sakta

---

## STEP 2: Brute Force

Sabse direct soch:

```txt
first string ke saare prefixes try karo
longest se shortest
```

Example:

```txt
first string = "flower"
possible prefixes:
"flower", "flowe", "flow", "flo", "fl", "f"
```

Har prefix ke liye check karo:

```txt
kya sab strings isse start hoti hain?
```

| Candidate prefix | `"flower"` | `"flow"` | `"flight"` | Result |
|---|---|---|---|---|
| `"flower"` | yes | no | - | fail |
| `"flowe"` | yes | no | - | fail |
| `"flow"` | yes | yes | no | fail |
| `"flo"` | yes | yes | no | fail |
| `"fl"` | yes | yes | yes | answer |

Brute force sahi hai,
but repeated checking zyada hoti hai.

---

## STEP 3: Key Insight

Common prefix ko samajhne ka sabse useful observation:

```txt
common prefix kabhi bhi shortest string se bada nahi ho sakta
```

Why?

Agar shortest string ki length `4` hai,
toh answer `5` length ka ho hi nahi sakta.

Example:

```txt
["flower", "flow", "flight"]
```

Yahan shortest string:

```txt
"flow"
```

So prefix maximum itna hi lamba ho sakta hai:

```txt
f l o w
```

Ab hume bas ye dekhna hai:

```txt
shortest string ke har index par
kya sab strings me same character hai?
```

---

## STEP 4: Why This Technique Works

Suppose shortest string hai:

```txt
shortest = "flow"
```

Ab hum left se right compare karte hain.

Jab tak har position par sab strings me same character milta hai,
tab tak prefix grow hota rahega.

Jaise hi mismatch mil gaya:

```txt
index i par mismatch
```

toh answer hoga:

```txt
0 se i-1 tak ka part
```

Why exactly?

Kyunki prefix continuous hota hai.
Agar index `i` par hi match toot gaya,
toh uske baad ka character answer me aa hi nahi sakta.

Important note:

Horizontal scan bhi valid `O(S)` approach hai.
Yahan shortest-string vertical scan choose kiya gaya hai because:

- upper bound clear milta hai
- mismatch position direct samajh aati hai
- mental model simple hai

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `shortestString` | jis string se hum positions check kar rahe hain |
| `charIndex` | current character position |
| `expectedChar` | shortest string ka current character |
| `stringIndex` | kaunsi string compare ho rahi hai |

Short memory:

```txt
shortest string = ruler
baaki strings us ruler ke against measure hoti hain
```

---

## STEP 6: Mental Model

Soch:

```txt
main prefix ko build nahi kar raha
main mismatch point dhoond raha hoon
```

Visual:

```txt
strs = ["flower", "flow", "flight"]

index:    0 1 2 3
flow   -> f l o w
flower -> f l o ...
flight -> f l i ...
```

Observe:

- index `0` same
- index `1` same
- index `2` par `o` vs `i` mismatch

So answer:

```txt
"fl"
```

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Empty array | `[]` | `""` | compare karne ke liye string hi nahi |
| Single string | `["alone"]` | `"alone"` | wahi common prefix hai |
| No common prefix | `["dog", "racecar", "car"]` | `""` | first character par hi mismatch |
| Empty string present | `["", "abc"]` | `""` | shortest string empty hai |
| Whole shortest string common | `["inter", "internet", "internal"]` | `"inter"` | shortest string complete match ho gayi |

---

## STEP 8: Conditions

Main condition:

```txt
current position par sab strings me same character hai?
```

Code level par:

```txt
strs[stringIndex][charIndex] === expectedChar
```

If true for all strings:

```txt
next index check karo
```

If false for even one string:

```txt
return shortestString.slice(0, charIndex)
```

---

## STEP 9: Adjustment Logic

Is problem me sliding window jaisa expand/shrink nahi hai.
Yahan adjustment simple hai:

| Situation | Kya karo | Kyun |
|---|---|---|
| current index par sab same | `charIndex` aage badhao | prefix abhi tak valid hai |
| current index par mismatch | turant return karo | isi point ke baad prefix extend nahi ho sakta |
| shortest string khatam ho gayi | shortest string return karo | usse lamba prefix possible nahi |

Yeh problem "largest valid range" se zyada
"first invalid point" wali problem hai.

---

## STEP 10: Answer Formula

Answer ko aise yaad rakho:

```txt
longest common prefix = shortest string ka woh prefix
jo first mismatch se pehle tak same rahe
```

If mismatch at index `i`:

```txt
answer = shortestString.slice(0, i)
```

If no mismatch till end of shortest string:

```txt
answer = shortestString
```

---

## STEP 11: Full Dry Run

Example:

```txt
strs = ["flower", "flow", "flight"]
```

Step 1: shortest string find karo

| Compared strings | Current shortest |
|---|---|
| start with `"flower"` | `"flower"` |
| compare with `"flow"` | `"flow"` |
| compare with `"flight"` | `"flow"` |

So:

```txt
shortestString = "flow"
```

Step 2: character-by-character verify karo

| `charIndex` | `expectedChar` | `"flower"` | `"flow"` | `"flight"` | Result |
|---:|---|---|---|---|---|
| 0 | `f` | `f` | `f` | `f` | all match |
| 1 | `l` | `l` | `l` | `l` | all match |
| 2 | `o` | `o` | `o` | `i` | mismatch |

Mismatch `charIndex = 2` par mila.

So answer:

```txt
shortestString.slice(0, 2) = "fl"
```

Second example:

```txt
strs = ["dog", "racecar", "car"]
```

Shortest string ho sakti hai:

```txt
"dog" ya "car"
```

Index `0` par hi mismatch:

| String | character at index `0` |
|---|---|
| `"dog"` | `d` |
| `"racecar"` | `r` |
| `"car"` | `c` |

So answer:

```txt
""
```

---

## STEP 12: Quick Reference

```txt
Prefix = start se aane wala part

Common prefix shortest string se bada nahi ho sakta

So:
1. shortest string dhundo
2. uske characters left se right check karo
3. first mismatch par stop karo
4. mismatch se pehle tak ka part answer hai

No mismatch till end of shortest string:
answer = shortest string
```
