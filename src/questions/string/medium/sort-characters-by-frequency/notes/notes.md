# Sort Characters By Frequency - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

String `s` diya hai.
Characters ko frequency ke descending order me arrange karna hai.

Meaning:

```txt
jo character zyada baar aaya hai
woh output me pehle aayega
```

Example:

```txt
s = "tree"
```

Frequencies:

| Character | Frequency |
|---|---:|
| t | 1 |
| r | 1 |
| e | 2 |

`e` sabse zyada baar aaya hai.
So output:

```txt
"eetr" or "eert"
```

`t` and `r` same frequency ke hain, so unka order flexible hai.

---

## STEP 2: Brute Force

Simple approach:

```txt
count karo
unique characters ko frequency ke basis par sort karo
answer build karo
```

Example:

```txt
s = "tree"
```

| Step | State |
|---|---|
| Count | `{ t: 1, r: 1, e: 2 }` |
| Entries | `[["t",1], ["r",1], ["e",2]]` |
| Sort by frequency | `[["e",2], ["t",1], ["r",1]]` |
| Build result | `"eetr"` |

Time:

```txt
O(n + k log k)
```

Why?

```txt
n characters count hote hain
k unique characters sort hote hain
```

---

## STEP 3: Key Insight

Frequency value itself order decide kar rahi hai.

If max frequency `n` ho sakti hai,
toh hum frequency ko direct bucket index bana sakte hain.

Example:

```txt
frequency 1 -> bucket[1]
frequency 2 -> bucket[2]
frequency 3 -> bucket[3]
```

Then high frequency se low frequency tak buckets read karo.

This avoids comparison sorting.

---

## STEP 4: Why This Technique Works

Bucket sort tab useful hota hai jab possible key range known ho.

Yahan key hai:

```txt
character frequency
```

Frequency minimum:

```txt
1
```

Frequency maximum:

```txt
n
```

So buckets:

```txt
0, 1, 2, 3, ..., n
```

Example:

```txt
s = "tree"
```

| Frequency | Characters |
|---:|---|
| 1 | `t`, `r` |
| 2 | `e` |

Read from high to low:

```txt
bucket[2] -> e twice
bucket[1] -> t once, r once
```

Output:

```txt
"eetr"
```

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `s` | input string |
| `frequency` | character -> count map |
| `entries` | `[char, count]` pairs for sorting |
| `char` | current character |
| `count` | current character frequency |
| `buckets` | array where index means frequency |
| `buckets[count]` | all characters with that count |
| `resultParts` | repeated character groups before final join |

Short memory:

```txt
frequency map = counts
buckets[count] = chars with this count
```

---

## STEP 6: Mental Model

Socho characters election votes le rahe hain.

```txt
e got 2 votes
t got 1 vote
r got 1 vote
```

Highest votes wale pehle stage par aate hain.

Bucket model:

```txt
frequency buckets = winners' podium
```

```txt
bucket[3] = 3 votes wale
bucket[2] = 2 votes wale
bucket[1] = 1 vote wale
```

Answer high podium se low podium tak read hota hai.

---

## STEP 7: Boundary Cases

| Case | Example | Valid answer | Why |
|---|---|---|---|
| Empty string | `""` | `""` | no characters |
| Single char | `"a"` | `"a"` | one group |
| One char highest | `"tree"` | `"eetr"` or `"eert"` | `e` freq 2 |
| Equal top frequency | `"cccaaa"` | `"cccaaa"` or `"aaaccc"` | tie flexible |
| Case-sensitive | `"Aabb"` | `"bbAa"` style valid | `A` and `a` different |
| Digits included | `"1122a"` | `"1122a"` style valid | digits are characters |

---

## STEP 8: Conditions

Sorting comparator:

```ts
entries.sort((first, second) => second[1] - first[1])
```

Meaning:

```txt
higher frequency pehle
```

Bucket placement:

```ts
buckets[count].push(char)
```

Meaning:

```txt
current char ko uski frequency wale group me daalo
```

Bucket traversal:

```ts
for (let count = buckets.length - 1; count >= 1; count--)
```

Meaning:

```txt
highest possible frequency se lowest frequency tak output banao
```

---

## STEP 9: Adjustment Logic

Frequency count:

```txt
previousCount = frequency.get(char) ?? 0
newCount = previousCount + 1
```

Why?

```txt
har baar char milta hai, uski frequency one increase hoti hai
```

Result build:

```txt
char.repeat(count)
```

Why?

```txt
same character grouped form me count times output me aana chahiye
```

Bucket traversal high to low:

```txt
n -> 1
```

Why?

```txt
answer decreasing frequency order me chahiye
```

---

## STEP 10: Answer Formula

Brute force:

```txt
frequency map
sort entries by count descending
join char.repeat(count)
```

Optimal:

```txt
frequency map
bucket[count].push(char)
for count from n to 1:
  output char.repeat(count)
```

Validation formula:

```txt
same character counts
and group frequencies non-increasing
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "tree"
```

### Brute Force Dry Run

Count characters:

| Step | char | Frequency map |
|---:|---|---|
| 1 | t | `{ t: 1 }` |
| 2 | r | `{ t: 1, r: 1 }` |
| 3 | e | `{ t: 1, r: 1, e: 1 }` |
| 4 | e | `{ t: 1, r: 1, e: 2 }` |

Sort entries:

| Before sort | After sort |
|---|---|
| `[["t",1], ["r",1], ["e",2]]` | `[["e",2], ["t",1], ["r",1]]` |

Build result:

| Entry | Added group | Result so far |
|---|---|---|
| `["e",2]` | `"ee"` | `"ee"` |
| `["t",1]` | `"t"` | `"eet"` |
| `["r",1]` | `"r"` | `"eetr"` |

Final:

```txt
"eetr"
```

### Optimal Bucket Dry Run

Frequency map:

| Character | Count |
|---|---:|
| t | 1 |
| r | 1 |
| e | 2 |

Fill buckets:

| Bucket index | Meaning | Characters |
|---:|---|---|
| 1 | frequency 1 | `t`, `r` |
| 2 | frequency 2 | `e` |

Traverse buckets high to low:

| Count | Bucket | Output action | Result so far |
|---:|---|---|---|
| 4 | empty | skip | `""` |
| 3 | empty | skip | `""` |
| 2 | `e` | add `"ee"` | `"ee"` |
| 1 | `t`, `r` | add `"t"`, `"r"` | `"eetr"` |

Final:

```txt
"eetr"
```

Tie note:

```txt
"eert" also valid
```

because `t` and `r` both have frequency `1`.

---

## STEP 12: Quick Reference

Brute:

```txt
count -> sort unique chars -> repeat groups
```

Optimal:

```txt
count -> bucket by frequency -> read high to low
```

Most important memory:

```txt
frequency decides order
```

Tie memory:

```txt
same frequency characters can appear in any order
```
