# Reverse Words in a String - Complete Notes
# (2 Mahine Baad Bhi Samajh Aaye!)

---

## STEP 1: Problem Samjho

String `s` diya hai.
Hume words ka order reverse karna hai.

Rules:

```txt
leading spaces remove
trailing spaces remove
multiple spaces between words -> single space
word ke characters same order me rehne chahiye
```

Example:

```txt
s = "  hello   world  "
answer = "world hello"
```

Dhyan do:

```txt
"hello" word ke characters same hain
"world" word ke characters same hain
sirf word order reverse hua
```

Wrong output:

```txt
"dlrow olleh"
```

Kyunki ye characters reverse kar raha hai, word order nahi.

---

## STEP 2: Brute Force

JavaScript built-ins se direct flow:

```txt
split -> filter -> reverse -> join
```

Example:

```txt
s = "  hello   world  "
```

| Step | Result |
|---|---|
| split by space | `["", "", "hello", "", "", "world", "", ""]` |
| remove empty strings | `["hello", "world"]` |
| reverse words | `["world", "hello"]` |
| join with space | `"world hello"` |

Time:

```txt
O(n)
```

Space:

```txt
O(n)
```

This is clean and practical in JavaScript.

---

## STEP 3: Key Insight

Answer me last word first aata hai.

So:

```txt
right side se words read karo
```

Example:

```txt
"  hello   world  "
```

Right se:

```txt
world -> first output word
hello -> second output word
```

This naturally gives:

```txt
"world hello"
```

---

## STEP 4: Why This Technique Works

Word order reverse karna hai.
String ke right side ka last word answer ke left side me aata hai.

So right-to-left scanning exactly answer order me words discover karta hai.

Example:

```txt
original:  hello   world
answer:    world   hello
```

Right-to-left parsing:

| Discovered word | Output position |
|---|---|
| `world` | first |
| `hello` | second |

Spaces skip karte hain because spaces words nahi hain.
Final output me hum khud exactly one space insert karte hain using `join(' ')`.

---

## STEP 5: Variables

| Variable | Meaning |
|---|---|
| `s` | original input string |
| `parts` | brute force me split result |
| `words` | valid words without empty strings |
| `index` | better approach me right-to-left pointer |
| `wordEnd` | current word ka inclusive last character index |
| `wordStart` | current word ka first character index |
| `chars` | optimal concept me mutable character array |
| `left` | reverse range ka left pointer |
| `right` | reverse range ka right pointer |
| `wordStart` | reverse-each-word phase me current word start |

Short memory:

```txt
index = scanner
wordEnd = saved right boundary
wordStart = space ke baad wala first char
```

---

## STEP 6: Mental Model

Socho input ek shelf hai jisme words boxes hain:

```txt
[hello] [world]
```

Hume boxes ka order reverse karna hai:

```txt
[world] [hello]
```

Box ke andar letters ko reverse nahi karna.

Right-to-left method:

```txt
shelf ke right se box uthao
answer me left se rakhte jao
```

In-place concept:

```txt
pehle puri shelf reverse karo
phir har box ke andar letters sahi direction me reverse karo
```

---

## STEP 7: Boundary Cases

| Case | Example | Answer | Why |
|---|---|---|---|
| Normal sentence | `"the sky is blue"` | `"blue is sky the"` | words reverse |
| Leading/trailing spaces | `"  hello world  "` | `"world hello"` | outside spaces removed |
| Multiple middle spaces | `"a good   example"` | `"example good a"` | spaces normalize |
| Single word | `"single"` | `"single"` | order same |
| Only spaces | `"   "` | `""` | no words |
| Empty string | `""` | `""` | no words |

---

## STEP 8: Conditions

Right-to-left space skip:

```ts
while (index >= 0 && s[index] === ' ')
```

Meaning:

```txt
current character word ka part nahi hai
next real word tak left move karo
```

Boundary check:

```ts
if (index < 0) break
```

Meaning:

```txt
string me ab koi word nahi bacha
```

Word scan:

```ts
while (index >= 0 && s[index] !== ' ')
```

Meaning:

```txt
current word ke characters consume karo
jab tak word start ke pehle space na mil jaye
```

---

## STEP 9: Adjustment Logic

Better approach:

```txt
skip spaces -> index--
save wordEnd
consume word -> index--
wordStart = index + 1
word = substring(wordStart, wordEnd + 1)
```

Why `wordEnd + 1`?

```txt
substring ka second argument exclusive hota hai
wordEnd current word ka inclusive last index hai
```

Optimal concept:

```txt
reverse whole array
reverse each word range
```

Why?

```txt
whole reverse fixes word order
word reverse fixes letters inside each word
```

---

## STEP 10: Answer Formula

Brute force:

```txt
s.split(' ')
 .filter(non-empty)
 .reverse()
 .join(' ')
```

Better:

```txt
words extracted from right to left
answer = words.join(' ')
```

Optimal concept:

```txt
normalize spaces
reverse entire char array
reverse every word range
answer = chars.join('')
```

Short answer:

```txt
last word becomes first word
```

---

## STEP 11: Full Dry Run

Example:

```txt
s = "  hello   world  "
```

### Better Approach Dry Run

Index map:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| char | space | space | h | e | l | l | o | space | space | space | w | o | r | l | d | space | space |

Start:

```txt
index = 16
words = []
```

| Step | Action | index/result |
|---:|---|---|
| 1 | skip trailing spaces | `index` moves `16 -> 15 -> 14` |
| 2 | save `wordEnd` | `wordEnd = 14` |
| 3 | consume word chars | `index` moves `14 -> 9` |
| 4 | compute `wordStart` | `wordStart = 10` |
| 5 | extract word | `substring(10, 15) = "world"` |
| 6 | push word | `words = ["world"]` |
| 7 | skip middle spaces | `index` moves `9 -> 8 -> 7 -> 6` |
| 8 | save `wordEnd` | `wordEnd = 6` |
| 9 | consume word chars | `index` moves `6 -> 1` |
| 10 | compute `wordStart` | `wordStart = 2` |
| 11 | extract word | `substring(2, 7) = "hello"` |
| 12 | push word | `words = ["world", "hello"]` |
| 13 | skip leading spaces | `index` moves `1 -> 0 -> -1` |

Final:

```txt
words.join(' ') = "world hello"
```

### Optimal Concept Dry Run

Normalize:

| Phase | String |
|---|---|
| input | `"  hello   world  "` |
| normalized | `"hello world"` |

Reverse whole:

| Before | After |
|---|---|
| `"hello world"` | `"dlrow olleh"` |

Reverse each word:

| Word range | Before | After |
|---|---|---|
| first word | `"dlrow"` | `"world"` |
| second word | `"olleh"` | `"hello"` |

Final:

```txt
"world hello"
```

---

## STEP 12: Quick Reference

Brute:

```txt
split -> filter -> reverse -> join
```

Better:

```txt
scan right to left
skip spaces
extract word
push word
join with single space
```

Optimal concept:

```txt
normalize spaces
reverse whole
reverse each word
```

Most important memory:

```txt
words reverse hote hain, characters nahi
```

JavaScript caveat:

```txt
strings immutable hain, so true O(1) in-place solution JS me possible nahi
```
